import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFolder, FiUser, FiMessageSquare } from 'react-icons/fi';
import api from '../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({ projects: 0, messages: 0, unreadMessages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, messagesRes] = await Promise.all([
          api.get('/projects'),
          api.get('/messages')
        ]);
        setStats({
          projects: projectsRes.data.length,
          messages: messagesRes.data.length,
          unreadMessages: messagesRes.data.filter(m => !m.read).length
        });
      } catch (err) {
        console.error('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Projects',
      count: stats.projects,
      icon: FiFolder,
      link: '/admin/projects',
      color: 'bg-blue-500'
    },
    {
      title: 'Messages',
      count: stats.messages,
      icon: FiMessageSquare,
      link: '/admin/messages',
      color: 'bg-green-500',
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : null
    },
    {
      title: 'About Info',
      count: null,
      icon: FiUser,
      link: '/admin/about',
      color: 'bg-purple-500'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your portfolio content</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={card.link}
                className="block bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${card.color}`}>
                    <card.icon className="text-white" size={24} />
                  </div>
                  {card.badge && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      {card.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {card.count !== null ? card.count : '—'}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
