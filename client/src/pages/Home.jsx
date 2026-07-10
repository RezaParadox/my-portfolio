import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';
import Lightfall from '../components/Lightfall';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <Lightfall
          colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
          backgroundColor="#0A0A2E"
          speed={0.5}
          streakCount={3}
          streakWidth={1}
          streakLength={1}
          glow={1}
          density={0.6}
          twinkle={1}
          zoom={3}
          backgroundGlow={0.5}
          opacity={1}
          mouseInteraction={true}
          mouseStrength={0.5}
          mouseRadius={1}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Welcome to my website
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl sm:text-2xl text-gray-300 mb-8">
              We are an agency that builds brands and creates solutions for companies looking to grow
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-purple-400 mb-3">Collaboration</h3>
                <p className="text-gray-300">
                  We work closely with our clients to understand their vision and bring it to life through creative collaboration.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-purple-400 mb-3">Our approach</h3>
                <p className="text-gray-300">
                  We combine strategic thinking with technical expertise to deliver innovative solutions that drive results.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Explore
              <FiArrowRight />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-medium rounded-lg transition-colors"
            >
              Discover More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What are you working on? Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What are you working on?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Collaboration</h3>
              <p className="text-gray-300">
                We partner with businesses to create tailored solutions that align with their goals and vision. Our collaborative approach ensures every project is a success.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Our approach</h3>
              <p className="text-gray-300">
                We use agile methodologies and modern technologies to deliver high-quality products efficiently. Our process is transparent, iterative, and focused on results.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">My skills</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git'].map((skill, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Projects I've created</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'E-Commerce Platform', description: 'Full-stack e-commerce solution with React and Node.js', tech: ['React', 'Node.js', 'MongoDB'] },
              { title: 'Task Management App', description: 'Collaborative project management tool with real-time updates', tech: ['React', 'Firebase', 'Tailwind'] },
              { title: 'Portfolio Website', description: 'Modern portfolio with admin dashboard and CMS', tech: ['React', 'Express', 'MongoDB'] },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Get in touch</h2>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <FiMail size={20} />
                Contact Me
              </Link>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-medium rounded-lg transition-colors"
              >
                My Resume
              </a>
            </div>

            <div className="flex justify-center gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiGithub size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiLinkedin size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiInstagram size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;