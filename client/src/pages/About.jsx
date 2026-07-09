import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import api from '../utils/api';

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get('/about');
        setAbout(res.data);
      } catch (err) {
        console.error('Failed to fetch about info');
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h1>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        {/* Profile & Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {about?.profilePhoto && (
              <img
                src={about.profilePhoto}
                alt={about.name}
                className="w-32 h-32 rounded-full object-cover"
              />
            )}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {about?.name}
              </h2>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                {about?.tagline}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {about?.bio}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {about?.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Experience</h3>
          <div className="space-y-6">
            {about?.experience?.map((exp, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {exp.role}
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {exp.period}
                  </span>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {exp.company}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center gap-6"
        >
          {about?.socialLinks?.github && (
            <a
              href={about.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FiGithub size={24} />
            </a>
          )}
          {about?.socialLinks?.linkedin && (
            <a
              href={about.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FiLinkedin size={24} />
            </a>
          )}
          {about?.socialLinks?.twitter && (
            <a
              href={about.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FiTwitter size={24} />
            </a>
          )}
          {about?.socialLinks?.email && (
            <a
              href={`mailto:${about.socialLinks.email}`}
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FiMail size={24} />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
