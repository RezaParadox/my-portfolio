import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import axios from 'axios';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { email, fullName, password } = location.state || {};

  useEffect(() => {
    if (!email || !fullName || !password) {
      navigate('/register');
      return;
    }

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, email, fullName, password, navigate]);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
    setOtp(newOtp.slice(0, 6));
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/users/verify-otp', { email, otp: otpString });

      const res = await axios.post('/api/users/register', { username: fullName, email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);

      setSuccess('Account created successfully!');
      setTimeout(() => navigate('/admin'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError('');
    try {
      await axios.post('/api/users/send-otp', { email });
      setCountdown(60);
      setSuccess('New code sent to your email');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend code');
    } finally {
      setResendLoading(false);
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
                <FiMail className='text-purple-400' size={24} />
              </div>
              <h1 className='text-3xl font-bold mb-2' style={{ color: "var(--foreground)" }}>Verify Email</h1>
              <p className='text-sm' style={{ color: "var(--muted-foreground)" }}>
                Enter the 6-digit code sent to
              </p>
              <p className='text-purple-400 font-medium text-sm mt-1'>{email}</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center'
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center'
              >
                {success}
              </motion.div>
            )}

            <form onSubmit={handleVerify} className='space-y-6'>
              <div className='flex justify-center gap-3'>
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type='text'
                    inputMode='numeric'
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className='w-12 h-14 text-center text-xl font-bold transition-colors duration-300'
                    style={{
                      background: "var(--secondary)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                ))}
              </div>

              <Button
                type='submit'
                disabled={loading}
                className='w-full h-11 bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-medium rounded-xl transition-all duration-200'
              >
                {loading ? (
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white' />
                ) : (
                  'Verify & Create Account'
                )}
              </Button>
            </form>

            <div className='mt-6 text-center space-y-3'>
              <button
                onClick={handleResend}
                disabled={countdown > 0 || resendLoading}
                className='text-purple-400 hover:text-purple-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2'
              >
                <FiRefreshCw size={14} className={resendLoading ? 'animate-spin' : ''} />
                {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend code'}
              </button>

              <div>
                <Link
                  to='/register'
                  className='text-sm inline-flex items-center gap-2 hover:opacity-80'
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <FiArrowLeft size={14} />
                  Back to register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default VerifyOTP;
