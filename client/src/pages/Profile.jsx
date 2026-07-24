import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiSave, FiArrowLeft, FiAlertCircle, FiCheckCircle, FiEye, FiEyeOff } from 'react-icons/fi';
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <section
      className='min-h-screen my-16 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300'
      style={{ background: "var(--background)" }}
    >
      {/* Background orbs */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl' />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className='w-full max-w-md'
      >
        {/* Card with purple gradient border + shadow */}
        <div
          className='relative rounded-2xl p-[1px] bg-gradient-to-br from-purple-500 via-violet-500 to-fuchsia-500'
          style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.2), 0 10px 40px rgba(139, 92, 246, 0.1)' }}
        >
          <div className='rounded-2xl p-8 transition-colors duration-300' style={{ background: "var(--card)" }}>
            <div className='text-center mb-8'>
              <div className='w-14 h-14 mx-auto mb-4 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center'>
                <FiUser className='text-purple-400' size={24} />
              </div>
              <h1 className='text-3xl font-bold mb-2' style={{ color: "var(--foreground)" }}>My Profile</h1>
              <p className='text-sm' style={{ color: "var(--muted-foreground)" }}>
                Update your account information
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3 text-sm'
              >
                <FiAlertCircle size={18} />
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3 text-sm'
              >
                <FiCheckCircle size={18} />
                {success}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className='space-y-5'>
              <div className='space-y-2'>
                <Label htmlFor='username' style={{ color: "var(--muted-foreground)" }}>
                  Username
                </Label>
                <div className='relative'>
                  <FiUser
                    className='absolute left-3 top-1/2 -translate-y-1/2'
                    size={18}
                    style={{ color: "var(--muted-foreground)" }}
                  />
                  <Input
                    type='text'
                    id='username'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    placeholder='Your username'
                    className='pl-10 h-11 transition-colors duration-300'
                    style={{
                      background: "var(--secondary)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password' style={{ color: "var(--muted-foreground)" }}>
                  New Password <span style={{ color: "var(--muted-foreground)", opacity: 0.7 }} className='text-xs'>(leave blank to keep current)</span>
                </Label>
                <div className='relative'>
                  <FiLock
                    className='absolute left-3 top-1/2 -translate-y-1/2'
                    size={18}
                    style={{ color: "var(--muted-foreground)" }}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='••••••••'
                    className='pl-10 pr-10 h-11 transition-colors duration-300'
                    style={{
                      background: "var(--secondary)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 transition-colors'
                    style={{ color: "var(--muted-foreground)" }}
                    tabIndex={-1}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='confirmPassword' style={{ color: "var(--muted-foreground)" }}>
                  Confirm New Password
                </Label>
                <div className='relative'>
                  <FiLock
                    className='absolute left-3 top-1/2 -translate-y-1/2'
                    size={18}
                    style={{ color: "var(--muted-foreground)" }}
                  />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id='confirmPassword'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder='••••••••'
                    className='pl-10 pr-10 h-11 transition-colors duration-300'
                    style={{
                      background: "var(--secondary)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 transition-colors'
                    style={{ color: "var(--muted-foreground)" }}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              <Button
                type='submit'
                disabled={loading}
                className='w-full h-11 bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-medium rounded-xl transition-all duration-200'
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
                className='text-sm inline-flex items-center gap-2 hover:opacity-80'
                style={{ color: "var(--muted-foreground)" }}
              >
                <FiArrowLeft size={14} />
                Go back
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Profile;
