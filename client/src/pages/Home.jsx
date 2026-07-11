import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiMail,
} from "react-icons/fi";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaNpm,
  FaGithub,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiShadcnui,
  SiTailwindcss,
  SiPnpm,
  SiNextdotjs,
} from "react-icons/si";
import Lightfall from "../components/Lightfall";
import api from "../utils/api";

const skills = [
  { name: "HTML", icon: FaHtml5 },
  { name: "CSS", icon: FaCss3Alt },
  { name: "JavaScript", icon: FaJs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: FaReact },
  { name: "TailwindCSS", icon: SiTailwindcss },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Shadcn", icon: SiShadcnui },
  { name: "Node.js", icon: FaNodeJs },
  { name: "MongoDB", icon: SiMongodb },
  { name: "npm", icon: FaNpm },
  { name: "pnpm", icon: SiPnpm },
  { name: "GitHub", icon: FaGithub },
  { name: "Git", icon: FaGitAlt },
];

const Home = () => {
  const [about, setAbout] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get('/about');
        setAbout(res.data);
      } catch (err) {
        console.error('Failed to fetch about info');
      }
    };
    fetchAbout();
  }, []);

  const scrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='relative min-h-screen'>
      {/* Background Animation ---------------------------------------------- */}
      <div className='absolute inset-0'>
        <Lightfall
          colors={["#A6C8FF", "#5227FF", "#FF9FFC"]}
          backgroundColor='#0A0A2E'
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

      {/* Hero Section  ---------------------------------------------- */}
      <section className='relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className='text-4xl sm:text-6xl font-bold text-white mb-6'>
              Welcome to my website
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className='text-xl sm:text-2xl text-gray-300 mb-4'>
              Here we are going to turn beautiful dreams into reality together
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className='text-lg text-gray-400 mb-8 max-w-2xl mx-auto'>
              If you are looking for someone who can create a fast and powerful
              modern site that uses modern tools and technologies. You have come
              to the right place
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='flex flex-col sm:flex-row gap-4 justify-center'
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              onClick={() => scrollTo('#projects')}
              className='inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors duration-150'
            >
              Explore
              <FiArrowRight />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              onClick={() => scrollTo('#about')}
              className='inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-150'
            >
              Discover More
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className='relative z-10 py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-16'
          >
            <h2 className='text-3xl sm:text-4xl font-bold text-white mb-4'>
              What I Do
            </h2>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8'
            >
              <h3 className='text-2xl font-bold text-white mb-4'>
                Frontend Development
              </h3>
              <p className='text-gray-300'>
                Building responsive, performant user interfaces with React,
                Next.js, and modern CSS frameworks. I focus on creating seamless
                user experiences with clean, maintainable code.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8'
            >
              <h3 className='text-2xl font-bold text-white mb-4'>
                Backend Development
              </h3>
              <p className='text-gray-300'>
                Designing scalable server architectures with Node.js and MongoDB.
                I build robust APIs and databases that power modern web
                applications.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Me Section  ---------------------------------------------- */}
      <section id='about' className='relative z-10 py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='relative'
          >
            <div className='aspect-square bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10'>
              <img
                src='/my-pic.png'
                alt={about?.name || 'Developer'}
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none' />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className='text-3xl sm:text-4xl font-bold text-white mb-6'>
              About Me
            </h2>
            <div className='space-y-4 mb-8'>
              <p className='text-gray-300 leading-relaxed'>
                {about?.bio || "I'm a passionate full-stack developer with a love for creating elegant, efficient, and user-friendly web applications. With expertise in modern technologies like React, Node.js, and cloud services, I transform complex problems into simple, beautiful, and intuitive solutions."}
              </p>
              <p className='text-gray-400 leading-relaxed'>
                {about?.tagline || "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community."}
              </p>
            </div>

            {/* Stats */}
            <div className='flex items-center gap-6 mb-8'>
              <div className='text-center'>
                <span className='text-3xl font-bold text-blue-400'>3+</span>
                <p className='text-sm text-gray-400'>Years Experience</p>
              </div>
              <div className='w-px h-12 bg-gray-600'></div>
              <div className='text-center'>
                <span className='text-3xl font-bold text-blue-400'>50+</span>
                <p className='text-sm text-gray-400'>Projects Completed</p>
              </div>
              <div className='w-px h-12 bg-gray-600'></div>
              <div className='text-center'>
                <span className='text-3xl font-bold text-blue-400'>100%</span>
                <p className='text-sm text-gray-400'>Client Satisfaction</p>
              </div>
            </div>

            {/* Social Links */}
            <div className='flex gap-4'>
              {about?.socialLinks?.github && (
                <a href={about.socialLinks.github} target='_blank' rel='noopener noreferrer' className='text-gray-400 hover:text-white transition-colors'>
                  <FiGithub size={24} />
                </a>
              )}
              {about?.socialLinks?.linkedin && (
                <a href={about.socialLinks.linkedin} target='_blank' rel='noopener noreferrer' className='text-gray-400 hover:text-white transition-colors'>
                  <FiLinkedin size={24} />
                </a>
              )}
              {about?.socialLinks?.twitter && (
                <a href={about.socialLinks.twitter} target='_blank' rel='noopener noreferrer' className='text-gray-400 hover:text-white transition-colors'>
                  <FiTwitter size={24} />
                </a>
              )}
              {about?.socialLinks?.email && (
                <a href={`mailto:${about.socialLinks.email}`} className='text-gray-400 hover:text-white transition-colors'>
                  <FiMail size={24} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section  ---------------------------------------------- */}
      <section className='relative z-10 py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'
          >
            <h2 className='text-3xl sm:text-4xl font-bold text-white mb-4'>
              My skills
            </h2>
          </motion.div>

          <div className='grid grid-cols-4 gap-4'>
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.08,
                    transition: { duration: 0.15 }
                  }}
                  className='relative overflow-hidden rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 hover:bg-white/15 cursor-pointer flex flex-col items-center justify-center gap-3'
                >
                  <Icon size={40} className='text-gray-400 relative z-10' />
                  <span className='text-sm font-medium text-white relative z-10'>
                    {skill.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section ---------------------------------------------- */}
      <section id='projects' className='relative z-10 py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'
          >
            <h2 className='text-3xl sm:text-4xl font-bold text-white mb-4'>
              Projects I've created
            </h2>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              {
                title: "E-Commerce Platform",
                description:
                  "Full-stack e-commerce solution with React and Node.js",
                tech: ["React", "Node.js", "MongoDB"],
                color: "from-blue-500/30 to-purple-500/30",
              },
              {
                title: "Task Management App",
                description:
                  "Collaborative project management tool with real-time updates",
                tech: ["React", "Firebase", "Tailwind"],
                color: "from-emerald-500/30 to-cyan-500/30",
              },
              {
                title: "Portfolio Website",
                description: "Modern portfolio with admin dashboard and CMS",
                tech: ["React", "Express", "MongoDB"],
                color: "from-purple-500/30 to-pink-500/30",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.15 }
                }}
                className='bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/15 cursor-pointer flex flex-col'
              >
                <div className={`relative w-full h-48 bg-gradient-to-br ${project.color}`}>
                  <div className="absolute inset-0 shadow-[inset_0_-20px_30px_rgba(88,28,135,0.6)] pointer-events-none" />
                </div>
                <div className='p-5 flex flex-col gap-3'>
                  <div className='flex flex-wrap gap-1.5'>
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className='px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[11px] rounded-full'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className='w-full h-px bg-white/10' />
                  <div>
                    <h3 className='text-lg font-bold text-white mb-1'>
                      {project.title}
                    </h3>
                    <p className='text-gray-300 text-sm line-clamp-2'>
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section ----------------------------------------------*/}
      <section className='relative z-10 py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center'
          >
            <h2 className='text-3xl sm:text-4xl font-bold text-white mb-8'>
              Get in touch
            </h2>

            <div className='flex flex-col sm:flex-row justify-center gap-6 mb-12'>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}>
                <Link
                  to='/contact'
                  className='inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors duration-150'
                >
                  <FiMail size={20} />
                  Contact Me
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}>
                <a
                  href='#'
                  className='inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-150'
                >
                  My Resume
                </a>
              </motion.div>
            </div>

            <div className='flex justify-center gap-6'>
              <a
                href='https://github.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <FiGithub size={24} />
              </a>
              <a
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <FiLinkedin size={24} />
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <FiTwitter size={24} />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-white transition-colors'
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
