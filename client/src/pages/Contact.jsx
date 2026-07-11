import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";
import api from "../utils/api";
import { contactSchema } from "../schemas/contact";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    const result = contactSchema.safeParse(formData);
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
      await api.post("/contact", formData);
      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Failed to send message",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Glassmorphism background orbs */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl' />
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400/15 dark:bg-emerald-400/5 rounded-full blur-3xl' />
      </div>

      <div className='max-w-2xl mx-auto mt-11'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h1 className='text-4xl font-bold text-white mb-4'>Get In Touch</h1>
          <div className='w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6' />
          <p className='text-gray-300'>
            Have a question or want to work together? Send me a message!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className='backdrop-blur-xl bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl p-8'
        >
          {status.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-xl backdrop-blur-md flex items-center gap-3 text-sm ${
                status.type === "success"
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                  : "bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300"
              }`}
            >
              {status.type === "success" ? (
                <FiCheck size={18} />
              ) : (
                <FiAlertCircle size={18} />
              )}
              {status.message}
            </motion.div>
          )}

          <div className='space-y-5'>
            <div className='space-y-2'>
              <Label htmlFor='name' className='text-gray-200'>
                Name
              </Label>
              <Input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Your name'
                className={`h-11 bg-white/30 dark:bg-white/5 border-white/30 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-blue-500/30 ${
                  errors.name
                    ? "border-red-500/50 focus-visible:ring-red-500/30"
                    : ""
                }`}
              />
              {errors.name && (
                <p className='text-red-500 dark:text-red-400 text-xs mt-1'>
                  {errors.name}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email' className='text-gray-200'>
                Email
              </Label>
              <Input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='your.email@example.com'
                className={`h-11 bg-white/30 dark:bg-white/5 border-white/30 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-blue-500/30 ${
                  errors.email
                    ? "border-red-500/50 focus-visible:ring-red-500/30"
                    : ""
                }`}
              />
              {errors.email && (
                <p className='text-red-500 dark:text-red-400 text-xs mt-1'>
                  {errors.email}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='message' className='text-gray-200'>
                Message
              </Label>
              <Textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder='Your message...'
                className={`bg-white/30 dark:bg-white/5 border-white/30 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-blue-500/30 resize-none ${
                  errors.message
                    ? "border-red-500/50 focus-visible:ring-red-500/30"
                    : ""
                }`}
              />
              {errors.message && (
                <p className='text-red-500 dark:text-red-400 text-xs mt-1'>
                  {errors.message}
                </p>
              )}
            </div>

            <Button
              type='submit'
              disabled={loading}
              className='w-full h-11  bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer hover:scale-x-100 text-white font-medium rounded-xl transition-all duration-200 backdrop-blur-sm gap-2'
            >
              {loading ? (
                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white' />
              ) : (
                <>
                  Send Message
                  <FiSend size={16} />
                </>
              )}
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
