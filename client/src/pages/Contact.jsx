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
      await api.post("/users/contact", formData);
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
    <section
      className='min-h-screen py-24 my-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300'
      style={{ background: "var(--background)" }}
    >
      {/* Background orbs */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl' />
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl' />
      </div>

      <div className='max-w-2xl mx-auto mt-11'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h1 className='text-4xl font-bold mb-4' style={{ color: "var(--section-heading)" }}>Get In Touch</h1>
          <div className='w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6' />
          <p style={{ color: "var(--section-text-muted)" }}>
            Have a question or want to work together? Send me a message!
          </p>
        </motion.div>

        {/* Card with purple gradient border + shadow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='relative rounded-2xl p-[1px] bg-gradient-to-br from-purple-500 via-violet-500 to-fuchsia-500'
          style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.2), 0 10px 40px rgba(139, 92, 246, 0.1)' }}
        >
          <div className='rounded-2xl p-8 transition-colors duration-300' style={{ background: "var(--card)" }}>
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm ${
                  status.type === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                    : "bg-red-500/10 border border-red-500/20 text-red-400"
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

            <form onSubmit={handleSubmit} className='space-y-5'>
              <div className='space-y-2'>
                <Label htmlFor='name' style={{ color: "var(--muted-foreground)" }}>
                  Name
                </Label>
                <Input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Your name'
                  className={`h-11 transition-colors duration-300 ${
                    errors.name
                      ? "border-red-500/50 focus-visible:ring-red-500/30"
                      : ""
                  }`}
                  style={{
                    background: "var(--secondary)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                />
                {errors.name && (
                  <p className='text-red-400 text-xs mt-1'>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email' style={{ color: "var(--muted-foreground)" }}>
                  Email
                </Label>
                <Input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='your.email@example.com'
                  className={`h-11 transition-colors duration-300 ${
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
                {errors.email && (
                  <p className='text-red-400 text-xs mt-1'>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='message' style={{ color: "var(--muted-foreground)" }}>
                  Message
                </Label>
                <Textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder='Your message...'
                  className={`transition-colors duration-300 resize-none ${
                    errors.message
                      ? "border-red-500/50 focus-visible:ring-red-500/30"
                      : ""
                  }`}
                  style={{
                    background: "var(--secondary)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                />
                {errors.message && (
                  <p className='text-red-400 text-xs mt-1'>
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type='submit'
                disabled={loading}
                className='w-full h-11 bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-medium rounded-xl transition-all duration-200 gap-2'
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
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
