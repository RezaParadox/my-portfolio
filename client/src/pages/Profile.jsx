import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiSave, FiArrowLeft, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

const Profile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/users/me');
        setFormData((prev) => ({ ...prev, username: res.data.username }));
      } catch {
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password && formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const updates = { username: formData.username };
      if (formData.password) {
        updates.password = formData.password;
      }

      const res = await axios.put('/api/users/me', updates);
      setUser((prev) => ({ ...prev, username: res.data.username }));
      setFormData((prev) => ({ ...prev, password: '', confirmPassword: '' }));
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='min-h-screen mt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/15 dark:bg-cyan-400/5 rounded-full blur-3xl' />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className='w-full max-w-md'
      >
        <div className='backdrop-blur-xl bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl p-8'>
          <div className='text-center mb-8'>
            <div className='w-14 h-14 mx-auto mb-4 rounded-xl backdrop-blur-md bg-white/20 dark:bg-white/10 border border-white/20 dark:border-white/10 flex items-center justify-center'>
              <FiUser className='text-purple-500 dark:text-purple-400' size={24} />
            </div>
            <h1 className='text-3xl font-bold text-white mb-2'>My Profile</h1>
            <p className='text-gray-600 dark:text-gray-300 text-sm'>
              Update your account information
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='mb-6 p-4 rounded-xl backdrop-blur-md bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 flex items-center gap-3 text-sm'
            >
              <FiAlertCircle size={18} />
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='mb-6 p-4 rounded-xl backdrop-blur-md bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-300 flex items-center gap-3 text-sm'
            >
              <FiCheckCircle size={18} />
              {success}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='space-y-2'>
              <Label htmlFor='username' className='text-gray-700 dark:text-gray-200'>
                Username
              </Label>
              <div className='relative'>
                <FiUser
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500'
                  size={18}
                />
                <Input
                  type='text'
                  id='username'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  placeholder='Your username'
                  className='pl-10 h-11 bg-white/30 dark:bg-white/5 border-white/30 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-purple-500/30'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password' className='text-gray-700 dark:text-gray-200'>
                New Password <span className='text-gray-400 text-xs'>(leave blank to keep current)</span>
              </Label>
              <div className='relative'>
                <FiLock
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500'
                  size={18}
                />
                <Input
                  type='password'
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='••••••••'
                  className='pl-10 h-11 bg-white/30 dark:bg-white/5 border-white/30 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-purple-500/30'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='confirmPassword' className='text-gray-700 dark:text-gray-200'>
                Confirm New Password
              </Label>
              <div className='relative'>
                <FiLock
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500'
                  size={18}
                />
                <Input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder='••••••••'
                  className='pl-10 h-11 bg-white/30 dark:bg-white/5 border-white/30 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-purple-500/30'
                />
              </div>
            </div>

            <Button
              type='submit'
              disabled={loading}
              className='w-full h-11 bg-purple-500 hover:bg-purple-600 cursor-pointer text-white font-medium rounded-xl transition-all duration-200 backdrop-blur-sm'
            >
              {loading ? (
                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white' />
              ) : (
                <span className='flex items-center justify-center gap-2'>
                  <FiSave size={16} />
                  Save Changes
                </span>
              )}
            </Button>
          </form>

          <div className='mt-6 text-center'>
            <button
              onClick={() => navigate(-1)}
              className='text-gray-400 hover:text-gray-300 text-sm inline-flex items-center gap-2'
            >
              <FiArrowLeft size={14} />
              Go back
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Profile;
