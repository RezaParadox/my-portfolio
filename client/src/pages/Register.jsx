import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiUser, FiMail, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';
import { registerSchema } from '../schemas/auth';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/users/send-otp', { email: formData.email });
      navigate('/verify-otp', {
        state: {
          email: formData.email,
          username: formData.username,
          password: formData.password,
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send verification code');
    }
    setLoading(false);
  };

  return (
    <section className='min-h-screen mt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Glassmorphism background orbs */}
      <div className='absolute inset-0 -z-10 py-10' >
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
        {/* Glass card */}
        <div className='backdrop-blur-xl bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl p-8'>
          <div className='text-center mb-8'>
            <div className='w-14 h-14 mx-auto mb-4 rounded-xl backdrop-blur-md bg-white/20 dark:bg-white/10 border border-white/20 dark:border-white/10 flex items-center justify-center'>
              <FiCheckCircle className='text-purple-500 dark:text-purple-400' size={24} />
            </div>
            <h1 className='text-3xl font-bold text-white mb-2'>Create Account</h1>
            <p className='text-gray-600 dark:text-gray-300 text-sm'>
              Register a new admin account
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

          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='space-y-2'>
              <Label
                htmlFor='username'
                className='text-gray-700 dark:text-gray-200'
              >
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
                  placeholder='admin'
                  className={`pl-10 h-11 bg-white/30 dark:bg-white/5 border-white/30 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-purple-500/30 ${
                    errors.username
                      ? "border-red-500/50 focus-visible:ring-red-500/30"
                      : ""
                  }`}
                />
              </div>
              {errors.username && (
                <p className='text-red-500 dark:text-red-400 text-xs mt-1'>
                  {errors.username}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='email'
                className='text-gray-700 dark:text-gray-200'
              >
                Email
              </Label>
              <div className='relative'>
                <FiMail
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500'
                  size={18}
                />
                <Input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='admin@example.com'
                  className={`pl-10 h-11 bg-white/30 dark:bg-white/5 border-white/30 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-purple-500/30 ${
                    errors.email
                      ? "border-red-500/50 focus-visible:ring-red-500/30"
                      : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className='text-red-500 dark:text-red-400 text-xs mt-1'>
                  {errors.email}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='password'
                className='text-gray-700 dark:text-gray-200'
              >
                Password
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
                  className={`pl-10 h-11 bg-white/30 dark:bg-white/5 border-white/30 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-purple-500/30 ${
                    errors.password
                      ? "border-red-500/50 focus-visible:ring-red-500/30"
                      : ""
                  }`}
                />
              </div>
              {errors.password && (
                <p className='text-red-500 dark:text-red-400 text-xs mt-1'>
                  {errors.password}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='confirmPassword'
                className='text-gray-700 dark:text-gray-200'
              >
                Confirm Password
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
                  className={`pl-10 h-11 bg-white/30 dark:bg-white/5 border-white/30 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-purple-500/30 ${
                    errors.confirmPassword
                      ? "border-red-500/50 focus-visible:ring-red-500/30"
                      : ""
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className='text-red-500 dark:text-red-400 text-xs mt-1'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type='submit'
              disabled={loading}
              className='w-full h-11 bg-purple-500 hover:bg-purple-600 cursor-pointer text-white font-medium rounded-xl transition-all duration-200 backdrop-blur-sm'
            >
              {loading ? (
                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white' />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>
              Already have an account?{' '}
              <Link to='/login' className='text-purple-500 hover:text-purple-600 font-medium'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Register;
