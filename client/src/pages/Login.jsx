import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { loginSchema } from '../schemas/auth';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, user } = useAuth();
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

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const loginResult = await login(formData.email, formData.password);
    if (loginResult.success) {
      navigate('/');
    } else {
      setError(loginResult.message);
    }
    setLoading(false);
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
          className='relative rounded-2xl p-px bg-linear-to-br from-purple-500 via-violet-500 to-fuchsia-500'
          style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.2), 0 10px 40px rgba(139, 92, 246, 0.1)' }}
        >
          <div className='rounded-2xl p-8 transition-colors duration-300' style={{ background: "var(--card)" }}>
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold mb-2' style={{ color: "var(--foreground)" }}>Admin Login</h1>
              <p className='text-sm' style={{ color: "var(--muted-foreground)" }}>
                Sign in to manage your portfolio
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

            <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='space-y-2'>
                <Label
                  htmlFor='email'
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Email
                </Label>
                <div className='relative'>
                  <FiMail
                    className='absolute left-3 top-1/2 -translate-y-1/2'
                    size={18}
                    style={{ color: "var(--muted-foreground)" }}
                  />
                  <Input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='admin@example.com'
                    className={`pl-10 h-11 transition-colors duration-300 ${
                      errors.email
                        ? "border-red-500/50 focus-visible:ring-red-500/30"
                        : ""
                    }`}
                    style={{
                      background: "var(--secondary)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                </div>
                {errors.email && (
                  <p className='text-red-400 text-xs mt-1'>{errors.email}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password' style={{ color: "var(--muted-foreground)" }}>
                  Password
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
                    className={`pl-10 pr-10 h-11 transition-colors duration-300 ${
                      errors.password
                        ? "border-red-500/50 focus-visible:ring-red-500/30"
                        : ""
                    }`}
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
                {errors.password && (
                  <p className='text-red-400 text-xs mt-1'>
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                type='submit'
                disabled={loading}
                className='w-full h-11 bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-medium rounded-xl transition-all duration-200'
              >
                {loading ? (
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white' />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className='mt-6 text-center'>
              <p className='text-sm' style={{ color: "var(--muted-foreground)" }}>
                Don't have an account?{' '}
                <Link to='/register' className='text-purple-400 hover:text-purple-300 font-medium'>
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
