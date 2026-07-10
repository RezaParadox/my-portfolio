import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaNpm, FaGithub, FaGitAlt } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiShadcnui, SiTailwindcss, SiPnpm } from 'react-icons/si';
import api from '../utils/api';

const skills = [
  { name: 'HTML', icon: FaHtml5, size: 'large' },
  { name: 'CSS', icon: FaCss3Alt, size: 'normal' },
  { name: 'JavaScript', icon: FaJs, size: 'normal' },
  { name: 'TypeScript', icon: SiTypescript, size: 'normal' },
  { name: 'React', icon: FaReact, size: 'large' },
  { name: 'Tailwind', icon: SiTailwindcss, size: 'normal' },
  { name: 'Shadcn', icon: SiShadcnui, size: 'normal' },
  { name: 'Node.js', icon: FaNodeJs, size: 'normal' },
  { name: 'MongoDB', icon: SiMongodb, size: 'normal' },
  { name: 'npm', icon: FaNpm, size: 'normal' },
  { name: 'pnpm', icon: SiPnpm, size: 'normal' },
  { name: 'GitHub', icon: FaGithub, size: 'large' },
  { name: 'Git', icon: FaGitAlt, size: 'normal' },
];

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
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">about me</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative">
              <img
                src="/my-pic.png"
                alt="Developer at work"
                className="w-full h-full object-cover"
              />
              {/* Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Text Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {about?.name || "About Me"}
            </h2>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8">
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  {about?.bio || "I'm a passionate full-stack developer with a love for creating elegant, efficient, and user-friendly web applications. With expertise in modern technologies like React, Node.js, and cloud services, I transform complex problems into simple, beautiful, and intuitive solutions."}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {about?.tagline || "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in continuous learning and staying updated with the latest industry trends."}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div className="text-center">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3+</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Years Experience</p>
                </div>
                <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">50+</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Projects Completed</p>
                </div>
                <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">100%</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Client Satisfaction</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills - Magic Bento Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">my skills</h3>
          <div className="grid grid-cols-4 gap-4">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              const isLarge = skill.size === 'large';
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)'
                  }}
                  className={`
                    relative overflow-hidden rounded-2xl p-6
                    bg-white/70 dark:bg-white/5
                    backdrop-blur-xl
                    border border-gray-200 dark:border-white/10
                    hover:border-purple-500/50
                    transition-all duration-300 cursor-pointer
                    flex flex-col items-center justify-center gap-3
                    ${isLarge ? 'row-span-2 col-span-1' : ''}
                  `}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-purple-500/10 via-transparent to-purple-500/5 pointer-events-none" />
                  
                  <Icon 
                    size={isLarge ? 48 : 36} 
                    className="text-gray-500 dark:text-gray-400 relative z-10" 
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 relative z-10">
                    {skill.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Experience */}
        {about?.experience?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Experience</h3>
            <div className="space-y-6">
              {about.experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6"
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
        )}

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center gap-6 mt-20"
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