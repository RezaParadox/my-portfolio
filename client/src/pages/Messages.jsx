import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiTrash2, FiArrowLeft, FiCopy, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/users/messages');
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/users/messages/${id}/read`);
      setMessages(messages.map(m => m._id === id ? { ...m, read: true } : m));
    } catch (err) {
      console.error('Failed to mark as read');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/users/messages/${id}`);
        setMessages(messages.filter(m => m._id !== id));
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
        }
      } catch (err) {
        console.error('Failed to delete message');
      }
    }
  };

  const openMessage = (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsRead(message._id);
    }
  };

  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert(`Email: ${email}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 mb-4"
            style={{ color: "var(--muted-foreground)" }}
          >
            <FiArrowLeft size={16} />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Messages</h1>
          <p style={{ color: "var(--muted-foreground)" }}>
            {messages.length} message{messages.length !== 1 ? 's' : ''} •{' '}
            {messages.filter(m => !m.read).length} unread
          </p>
        </motion.div>

        {messages.length === 0 ? (
          <div className="text-center py-12 rounded-2xl" style={{ background: "var(--card)" }}>
            <FiMail className="mx-auto mb-4" style={{ color: "var(--muted-foreground)" }} size={48} />
            <p style={{ color: "var(--muted-foreground)" }}>No messages yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Message List */}
            <div className="lg:col-span-1 space-y-3">
              {messages.map((message, index) => (
                <motion.div
                  key={message._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => openMessage(message)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                    selectedMessage?._id === message._id
                      ? 'border-blue-500'
                      : 'border-transparent'
                  }`}
                  style={{
                    background: selectedMessage?._id === message._id ? "var(--secondary)" : "var(--card)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${message.read ? '' : 'text-blue-500'}`} style={{ color: message.read ? "var(--muted-foreground)" : undefined }}>
                      <FiMail size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-medium truncate" style={{ color: "var(--foreground)" }}>
                          {message.name}
                        </h3>
                        <span className="text-xs whitespace-nowrap" style={{ color: "var(--muted-foreground)" }}>
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm truncate mt-1" style={{ color: "var(--muted-foreground)" }}>
                        {message.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl shadow-lg p-6"
                  style={{ background: "var(--card)" }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
                        {selectedMessage.name}
                      </h2>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                    <button
                      onClick={() => handleDelete(selectedMessage._id)}
                      className="p-2 hover:text-red-500 transition-colors"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                  <div className="text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap" style={{ color: "var(--foreground)" }}>
                      {selectedMessage.message}
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t flex gap-3" style={{ borderColor: "var(--border)" }}>
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: Your message on my portfolio`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <FiMail size={18} />
                      Reply via Email
                    </a>
                    <button
                      onClick={() => copyEmail(selectedMessage.email)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                    >
                      {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
                      {copied ? 'Copied!' : 'Copy Email'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center rounded-2xl shadow-lg" style={{ background: "var(--card)" }}>
                  <p style={{ color: "var(--muted-foreground)" }}>Select a message to view</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Messages;
