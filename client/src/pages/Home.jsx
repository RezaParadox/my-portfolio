import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaNpm, FaGithub, FaGitAlt } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiShadcnui, SiTailwindcss, SiPnpm } from 'react-icons/si';
import Lightfall from '../components/Lightfall';

const skills = [
  { name: 'HTML', icon: FaHtml5 },
  { name: 'CSS', icon: FaCss3Alt },
  { name: 'JavaScript', icon: FaJs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'React', icon: FaReact },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Shadcn', icon: SiShadcnui },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'npm', icon: FaNpm },
  { name: 'pnpm', icon: SiPnpm },
  { name: 'GitHub', icon: FaGithub },
  { name: 'Git', icon: FaGitAlt },
];

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
            <p className="text-xl sm:text-2xl text-gray-300 mb-4">
              Here we are going to turn beautiful dreams into reality together
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              If you are looking for someone who can create a fast and powerful modern site that uses modern tools and technologies. You have come to the right place
            </p>
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

      {/* Skills Section - Magic Bento Style */}
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

          <div className="grid grid-cols-4 gap-4">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
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
                  className="relative overflow-hidden rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-3"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-purple-500/10 via-transparent to-purple-500/5 pointer-events-none" />

                  <Icon size={40} className="text-gray-400 relative z-10" />
                  <span className="text-sm font-medium text-white relative z-10">
                    {skill.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
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