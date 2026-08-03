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
  FiUser,
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
  FaDocker,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiShadcnui,
  SiTailwindcss,
  SiPnpm,
  SiNextdotjs,
  SiMysql,
} from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";

import { HiOutlineLocationMarker } from "react-icons/hi";
import { GiSkills } from "react-icons/gi";
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
  { name: "Docker", icon: FaDocker },
  { name: "PostgreSQL", icon: BiLogoPostgresql },
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
        className='relative z-10 '
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

import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

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

  const featuredProjects = projects.slice(0, 9);

  const handleSeeAllProjects = () => {
    navigate("/projects");
  };

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
              <TypingText text={t("home.welcome")} />
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
              {t("home.intro")}
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
              {t("home.intro2")}
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
              {t("home.btnexplore")}
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
              {t("home.btndescover")}
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
              {t("home.title-1")}
            </h2>

            <div className='w-30 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6' />
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {[
              {
                title: t("home.subTitle-1"),
                desc: t("home.description-1"),
              },
              {
                title: t("home.subTitle-2"),
                desc: t("home.description-2"),
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

      {/* About Me Section ---------------------------------------------- */}
      <section id='about' className='relative z-10 py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          {/* Image Container with Glass3D */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='relative'
          >
            <div className='glass3d aspect-square rounded-3xl overflow-hidden p-2'>
              <img
                src='/my-pic.png'
                alt={about?.name || "Reza Paradox"}
                className='w-full h-full object-cover rounded-2xl'
              />
              <div
                className='absolute inset-0 pointer-events-none rounded-2xl'
                style={{
                  background: `linear-gradient(to top, rgba(0,0,0,0.4), transparent)`,
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
              {t("home.title-2")}
            </h2>

            <div className='space-y-4 mb-8'>
              <p
                className='leading-relaxed font-bold text-lg'
                style={{ color: "var(--section-text)" }}
              >
                {t("home.description-3")}
              </p>
            </div>

            {/* --- PERSONAL INFO GRID (RESUME STYLE) --- */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10'>
              <div className='flex items-center gap-3'>
                <FiUser className='text-purple-400' />
                <span className='text-sm font-medium text-gray-400 mr-2'>
                  {t("home.name")} :
                </span>
                <span className='font-medium'>{t("home.name_label")}</span>
              </div>

              <div className='flex items-center gap-3'>
                <FiMail className='text-purple-400' />
                <span className='text-sm font-medium text-gray-400 mr-2'>
                  {t("home.email")} :
                </span>
                <a
                  href='mailto:rhparadox4@gmail.com'
                  className='font-medium  hover:text-purple-400 transition-colors'
                >
                  rhparadox4@gmail.com
                </a>
              </div>

              <div className='flex items-center gap-3'>
                <HiOutlineLocationMarker className='text-purple-400' />

                <span className='text-sm font-medium text-gray-400 mr-2'>
                  {t("home.location")} :
                </span>
                <span className='font-medium'>{t("home.location_label")}</span>
              </div>

              <div className='flex items-center gap-3'>
                <GiSkills className='text-purple-400' />
                <span className='text-sm font-medium text-gray-400 mr-2'>
                  {t("home.skill-level")}:
                </span>
                <span className='text-sm font-medium '>
                  {t("home.skill-level-label")}
                </span>
              </div>
            </div>

            {/* Stats with Glass3D subtle background */}
            <div className=' flex flex-wrap items-center justify-between border border-purple-500/50   gap-6 mb-8 p-6 rounded-2xl'>
              <div className='text-center flex-1'>
                <span className='text-3xl font-bold text-purple-400'>3+</span>
                <p
                  className='text-xs uppercase tracking-tighter mt-1'
                  style={{ color: "var(--section-text-muted)" }}
                >
                  {t("home.experience")}
                </p>
              </div>
              <div className='w-px h-10 bg-white/10 hidden sm:block'></div>
              <div className='text-center flex-1'>
                <span className='text-3xl font-bold text-purple-400'>50+</span>
                <p
                  className='text-xs uppercase tracking-tighter mt-1'
                  style={{ color: "var(--section-text-muted)" }}
                >
                  {t("home.projects")}
                </p>
              </div>
              <div className='w-px h-10 bg-white/10 hidden sm:block'></div>
              <div className='text-center flex-1'>
                <span className='text-3xl font-bold text-purple-400'>100%</span>
                <p
                  className='text-xs uppercase tracking-tighter mt-1'
                  style={{ color: "var(--section-text-muted)" }}
                >
                  {t("home.satisfaction")}
                </p>
              </div>
            </div>

            {/* download cv*/}
            <div className='flex items-center gap-6'>
              <a
                href='/My-CV.pdf'
                download
                className='px-6 py-2 border border-purple-500/50 rounded-full text-sm font-bold hover:bg-purple-500/10 transition-all'
              >
                {t("home.download")}
              </a>
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
              {t("home.title-3")}
            </h2>

            <div className='w-35 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6' />
          </motion.div>

          <div className='grid grid-cols-4 gap-4'>
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section ---------------------------------------------- */}
      <div
        id='projects'
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:px-6 lg:px-14 py-20 mx-5'
      >
        <div className='col-span-full text-center mb-8'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-3xl sm:text-4xl font-bold mb-4 uppercase'
            style={{ color: "var(--section-heading)" }}
          >
            {t("home.title-4")}
          </motion.h2>
          <div className='w-45 md:w-95 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6' />
        </div>

        {featuredProjects.map((project, index) => (
          <Link
            to={`/projects/${project._id}`}
            key={project._id}
            className='group block no-underline ' // group allows us to animate children on hover
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className='h-full rounded-2xl overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2'
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "0 10px 30px -15px rgba(0,0,0,0.3)",
              }}
            >
              {/* Image Container */}
              <div className='relative h-48 overflow-hidden '>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                ) : (
                  <div className='w-full h-full bg-gray-800 flex items-center justify-center'>
                    <span className='text-gray-500'>No Image</span>
                  </div>
                )}
                {/* Overlay gradient on hover */}
                <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </div>

              {/* Content */}
              <div className='p-6'>
                <h3
                  className='text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors'
                  style={{ color: "var(--foreground)" }}
                >
                  {project.title}
                </h3>
                <p
                  className='text-sm mb-4 line-clamp-2 leading-relaxed'
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {project.description}
                </p>

                <div className='flex flex-wrap gap-2 mt-auto'>
                  {(Array.isArray(project.techTags)
                    ? project.techTags
                    : typeof project.techTags === "string"
                      ? project.techTags
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean)
                      : []
                  )
                    .slice(0, 3)
                    .map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className='px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider'
                        style={{
                          background: "rgba(168, 85, 247, 0.1)",
                          color: "var(--purple-400)",
                          border: "1px solid rgba(168, 85, 247, 0.2)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
