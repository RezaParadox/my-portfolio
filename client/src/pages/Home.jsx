import { useState, useEffect, useRef, useCallback } from "react";
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
import DotGrid from "../components/DotGrid";
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

const FloatingDots = ({ isHovered }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (dotsRef.current.length === 0) {
      for (let i = 0; i < 12; i++) {
        dotsRef.current.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    }

    const draw = () => {
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      dotsRef.current.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > w) dot.vx *= -1;
        if (dot.y < 0 || dot.y > h) dot.vy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${isHovered ? dot.alpha + 0.3 : dot.alpha})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHovered]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    />
  );
};

const SkillCard = ({ skill, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const Icon = skill.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='relative overflow-hidden rounded-2xl p-6 cursor-pointer flex flex-col items-center justify-center gap-3 transition-all duration-300'
      style={{
        background: "var(--card-skill-bg)",
        border: `1px solid ${isHovered ? "var(--card-skill-border-hover)" : "var(--card-skill-border)"}`,
        boxShadow: isHovered ? "var(--card-skill-shadow-hover)" : "none",
      }}
    >
      <FloatingDots isHovered={isHovered} />

      {isHovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
      )}

      <Icon
        size={40}
        className='relative z-10'
        style={{ color: "var(--card-skill-icon)" }}
      />
      <span
        className='text-sm font-medium relative z-10'
        style={{ color: "var(--card-skill-text)" }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
};

const TypingText = ({ text, speed = 120 }) => {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <span>
      {displayed}
      <span style={{ opacity: showCursor ? 1 : 0, transition: "opacity 0.1s" }}>
        |
      </span>
    </span>
  );
};

const ServiceCard = ({ title, desc, delay = 0 }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='relative overflow-hidden rounded-2xl p-8 cursor-pointer transition-all duration-300'
      style={{
        background: "var(--card-service-bg)",
        border: `1px solid ${isHovered ? "var(--card-service-border-hover)" : "var(--card-service-border)"}`,
        boxShadow: isHovered ? "var(--card-service-shadow-hover)" : "none",
      }}
    >
      <FloatingDots isHovered={isHovered} />

      {isHovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
      )}

      <h3
        className='text-2xl font-bold mb-4 relative z-10'
        style={{ color: "var(--card-service-title)" }}
      >
        {title}
      </h3>
      <p
        className='relative z-10'
        style={{ color: "var(--card-service-text)" }}
      >
        {desc}
      </p>
    </motion.div>
  );
};

const Home = () => {
  const [about, setAbout] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects");
      }
    };
    fetchProjects();
  }, []);

  const scrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className='relative min-h-screen'>
      {/* Background Animation ---------------------------------------------- */}
      <div className='absolute inset-0'>
        <DotGrid
          dotSize={2.2}
          dotSpacing={28}
          inactiveColor='rgba(168, 85, 247, 0.25)'
          activeColor='#EC4899'
          gradientWidth={400}
          loopDuration={3}
          mouseRadius={120}
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
            <h1
              className='text-4xl sm:text-6xl font-bold mb-6 lg:mt-20 uppercase'
              style={{ color: "var(--section-heading)" }}
            >
              <TypingText text='Welcome to my website' />
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p
              className='text-xl sm:text-2xl mb-4 uppercase shimmer-text font-bold'
              style={{ color: "var(--section-text)" }}
            >
              Here we are going to turn beautiful dreams into reality together
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p
              className='text-lg mb-8 max-w-2xl mx-auto shimmer-text uppercase font-bold'
              style={{ color: "var(--section-text-muted)" }}
            >
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
              onClick={() => scrollTo("#projects")}
              className='inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors duration-150 lg:mt-20'
            >
              Explore
              <FiArrowRight />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              onClick={() => scrollTo("#about")}
              className='inline-flex items-center justify-center gap-2 px-8 py-4 font-medium rounded-lg transition-colors duration-150 max-h-15 lg:mt-20'
              style={{
                border: "1px solid var(--section-stats-border)",
                color: "var(--section-text)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--section-heading)";
                e.currentTarget.style.color = "var(--section-heading)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--section-stats-border)";
                e.currentTarget.style.color = "var(--section-text)";
              }}
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
            <h2
              className='text-3xl sm:text-4xl font-bold mb-4 uppercase'
              style={{ color: "var(--section-heading)" }}
            >
              What I Do
            </h2>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {[
              {
                title: "Frontend Development",
                desc: "Building responsive, performant user interfaces with React, Next.js, and modern CSS frameworks. I focus on creating seamless user experiences with clean, maintainable code.",
              },
              {
                title: "Backend Development",
                desc: "Designing scalable server architectures with Node.js and MongoDB. I build robust APIs and databases that power modern web applications.",
              },
            ].map((item, i) => (
              <ServiceCard
                key={i}
                title={item.title}
                desc={item.desc}
                delay={0.2 + i * 0.2}
              />
            ))}
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
            <div
              className='aspect-square backdrop-blur-xl rounded-2xl overflow-hidden'
              style={{
                background: "var(--section-about-bg)",
                border: "1px solid var(--section-about-border)",
              }}
            >
              <img
                src='/my-pic.png'
                alt={about?.name || "Developer"}
                className='w-full h-full object-cover'
              />
              <div
                className='absolute inset-0 pointer-events-none'
                style={{
                  background: `linear-gradient(to top, var(--section-about-overlay), transparent)`,
                }}
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2
              className='text-3xl sm:text-4xl font-bold uppercase mb-6'
              style={{ color: "var(--section-heading)" }}
            >
              About Me
            </h2>
            <div className='space-y-4 mb-8'>
              <p
                className='leading-relaxed font-bold'
                style={{ color: "var(--section-text)" }}
              >
                {about?.bio ||
                  "I'm a passionate full-stack developer with a love for creating elegant, efficient, and user-friendly web applications. With expertise in modern technologies like React, Node.js, and cloud services, I transform complex problems into simple, beautiful, and intuitive solutions."}
              </p>
              <p
                className='leading-relaxed font-bold'
                style={{ color: "var(--section-text-muted)" }}
              >
                {about?.tagline ||
                  "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community."}
              </p>
            </div>

            {/* Stats */}
            <div className='flex items-center gap-6 mb-8'>
              <div className='text-center'>
                <span className='text-3xl font-bold text-purple-400'>3+</span>
                <p
                  className='text-sm'
                  style={{ color: "var(--section-text-muted)" }}
                >
                  Years Experience
                </p>
              </div>
              <div
                className='w-px h-12'
                style={{ background: "var(--section-stats-border)" }}
              ></div>
              <div className='text-center'>
                <span className='text-3xl font-bold text-purple-400'>50+</span>
                <p
                  className='text-sm'
                  style={{ color: "var(--section-text-muted)" }}
                >
                  Projects Completed
                </p>
              </div>
              <div
                className='w-px h-12'
                style={{ background: "var(--section-stats-border)" }}
              ></div>
              <div className='text-center'>
                <span className='text-3xl font-bold text-purple-400'>100%</span>
                <p
                  className='text-sm'
                  style={{ color: "var(--section-text-muted)" }}
                >
                  Client Satisfaction
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className='flex gap-4'>
              {about?.socialLinks?.github && (
                <a
                  href={about.socialLinks.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-white transition-colors'
                  style={{ color: "var(--section-text-muted)" }}
                >
                  <FiGithub size={24} />
                </a>
              )}
              {about?.socialLinks?.linkedin && (
                <a
                  href={about.socialLinks.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-white transition-colors'
                  style={{ color: "var(--section-text-muted)" }}
                >
                  <FiLinkedin size={24} />
                </a>
              )}
              {about?.socialLinks?.twitter && (
                <a
                  href={about.socialLinks.twitter}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-white transition-colors'
                  style={{ color: "var(--section-text-muted)" }}
                >
                  <FiTwitter size={24} />
                </a>
              )}
              {about?.socialLinks?.email && (
                <a
                  href={`mailto:${about.socialLinks.email}`}
                  className='hover:text-white transition-colors'
                  style={{ color: "var(--section-text-muted)" }}
                >
                  <FiMail size={24} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section  ---------------------------------------------- */}
      <section className='relative z-10 py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'
          >
            <h2
              className='text-3xl sm:text-4xl font-bold mb-4 uppercase'
              style={{ color: "var(--section-heading)" }}
            >
              My skills
            </h2>
          </motion.div>

          <div className='grid grid-cols-4 gap-4'>
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section ---------------------------------------------- */}
      <section
        id='projects'
        className='relative z-10 py-20 px-4 sm:px-6 lg:px-8'
      >
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'
          >
            <h2
              className='text-3xl sm:text-4xl font-bold mb-4 uppercase'
              style={{ color: "var(--section-heading)" }}
            >
              Projects I've created
            </h2>
          </motion.div>

          {projects.length === 0 ? (
            <p
              className='text-center'
              style={{ color: "var(--section-text-muted)" }}
            >
              No projects yet.
            </p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.15 },
                  }}
                >
                <Link
                  to={`/projects/${project._id}`}
                  className='backdrop-blur-xl rounded-2xl overflow-hidden cursor-pointer flex flex-col transition-colors duration-300 block'
                  style={{
                    background: "var(--card-project-bg)",
                    border: "1px solid var(--card-project-border)",
                  }}
                >
                  {project.image && (
                    <div className='relative w-full h-48 overflow-hidden'>
                      <img
                        src={project.image}
                        alt={project.title}
                        className='w-full h-full object-cover'
                      />
                      <div className='absolute inset-0 shadow-[inset_0_-20px_30px_rgba(88,28,135,0.6)] pointer-events-none' />
                    </div>
                  )}
                  <div className='p-5 flex flex-col gap-3'>
                    <div className='flex flex-wrap gap-1.5'>
                      {(Array.isArray(project.techTags) ? project.techTags : typeof project.techTags === 'string' ? project.techTags.split(',').map(t => t.trim()).filter(Boolean) : []).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className='px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[11px] rounded-full'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div
                      className='w-full h-px'
                      style={{ background: "var(--footer-divider)" }}
                    />
                    <div>
                      <h3
                        className='text-lg font-bold mb-1'
                        style={{ color: "var(--card-project-text)" }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className='text-sm line-clamp-2'
                        style={{ color: "var(--card-project-desc)" }}
                      >
                        {project.description}
                      </p>
                    </div>
                  </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
