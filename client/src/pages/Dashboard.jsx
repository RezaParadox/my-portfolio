import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiFolder,
  FiUser,
  FiMessageSquare,
  FiArrowUpRight,
  FiActivity,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";
import api from "../utils/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // ── Safe array extractor ──────────────────────────────────
  const extractArray = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.projects)) return data.projects;
    if (Array.isArray(data?.messages)) return data.messages;
    return [];
  };

  // ── Fetch Stats ───────────────────────────────────────────
  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check token first
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      console.log("Token found:", token.substring(0, 20) + "...");

      // Use allSettled so ONE failure doesn't break everything
      const [projectsResult, messagesResult] = await Promise.allSettled([
        api.get("/projects"),
        api.get("/users/messages"), // ← we'll verify this path below
      ]);

      // ── Log raw results for debugging ──
      console.log("Projects result:", projectsResult);
      console.log("Messages result:", messagesResult);

      // ── Extract projects ──
      let projects = [];
      if (projectsResult.status === "fulfilled") {
        projects = extractArray(projectsResult.value.data);
        console.log("Projects count:", projects.length);
      } else {
        console.error(
          "Projects failed:",
          projectsResult.reason?.response?.status,
          projectsResult.reason?.response?.data,
        );
      }

      // ── Extract messages ──
      let messages = [];
      if (messagesResult.status === "fulfilled") {
        messages = extractArray(messagesResult.value.data);
        console.log("Messages count:", messages.length);
      } else {
        const status = messagesResult.reason?.response?.status;
        const data = messagesResult.reason?.response?.data;
        console.error("Messages failed:", status, data);

        // Don't block the whole dashboard for messages
        // Just show 0 and warn
        if (status === 403) {
          console.warn(
            "403 on messages — check route path and auth middleware",
          );
        }
      }

      setStats({
        projects: projects.length,
        messages: messages.length,
        unreadMessages: messages.filter((m) => !m.read).length,
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // ── Live Clock ────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // ── Cards ─────────────────────────────────────────────────
  const cards = [
    {
      title: "Projects",
      count: stats.projects,
      icon: FiFolder,
      link: "/admin/projects",
      description: "Total projects",
      accent: "#6366f1",
      accentBg: "rgba(99, 102, 241, 0.08)",
    },
    {
      title: "Messages",
      count: stats.messages,
      icon: FiMessageSquare,
      link: "/admin/messages",
      description: "Total received",
      accent: "#10b981",
      accentBg: "rgba(16, 185, 129, 0.08)",
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : null,
    },
  ];

  // ── Loading ───────────────────────────────────────────────
  if (loading) {
    return (
      <div
        className='min-h-screen flex items-center justify-center'
        style={{ background: "var(--background)" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='flex flex-col items-center gap-4'
        >
          <div className='relative w-10 h-10'>
            <div
              className='absolute inset-0 rounded-full border-2'
              style={{
                borderColor: "var(--muted-foreground)",
                opacity: 0.2,
              }}
            />
            <motion.div
              className='absolute inset-0 rounded-full border-2 border-transparent'
              style={{ borderTopColor: "#6366f1" }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
          <p
            className='text-sm tracking-widest uppercase'
            style={{ color: "var(--muted-foreground)" }}
          >
            Loading
          </p>
        </motion.div>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────
  if (error) {
    return (
      <div
        className='min-h-screen flex items-center justify-center px-4'
        style={{ background: "var(--background)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex flex-col items-center gap-4 text-center max-w-sm'
        >
          <div
            className='w-12 h-12 rounded-2xl flex items-center justify-center'
            style={{ background: "rgba(239,68,68,0.1)" }}
          >
            <FiAlertCircle size={22} style={{ color: "#ef4444" }} />
          </div>
          <div>
            <p
              className='font-semibold mb-1'
              style={{ color: "var(--foreground)" }}
            >
              Something went wrong
            </p>
            <p className='text-sm' style={{ color: "var(--muted-foreground)" }}>
              {error}
            </p>
          </div>
          <div className='flex gap-3'>
            <button
              onClick={fetchStats}
              className='flex items-center gap-2 px-4 py-2 text-sm
                         rounded-xl font-medium hover:opacity-80 transition-opacity'
              style={{
                background: "rgba(99,102,241,0.12)",
                color: "#6366f1",
              }}
            >
              <FiRefreshCw size={14} />
              Retry
            </button>
            <Link
              to='/login'
              className='flex items-center gap-2 px-4 py-2 text-sm
                         rounded-xl font-medium hover:opacity-80 transition-opacity'
              style={{
                background: "rgba(239,68,68,0.1)",
                color: "#ef4444",
              }}
            >
              Login again
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Main ──────────────────────────────────────────────────
  return (
    <section
      className='min-h-screen px-4 sm:px-6 lg:px-8 py-12'
      style={{ background: "var(--background)" }}
    >
      <div className='max-w-5xl mx-auto space-y-10'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'
        >
          <div>
            <p
              className='text-sm font-medium tracking-widest uppercase mb-1'
              style={{ color: "#6366f1" }}
            >
              {greeting()}
            </p>
            <h1
              className='text-3xl font-semibold tracking-tight'
              style={{ color: "var(--foreground)" }}
            >
              Dashboard
            </h1>
            <p
              className='mt-1 text-sm'
              style={{ color: "var(--muted-foreground)" }}
            >
              Here's what's happening with your portfolio.
            </p>
          </div>

          {/* Clock */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='flex items-center gap-2 self-start sm:self-auto
                       px-4 py-2 rounded-full text-sm font-mono'
            style={{
              background: "var(--card)",
              color: "var(--muted-foreground)",
              border: "1px solid var(--border, rgba(255,255,255,0.08))",
            }}
          >
            <FiActivity size={13} style={{ color: "#10b981" }} />
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.hr
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            border: "none",
            borderTop: "1px solid var(--border, rgba(255,255,255,0.07))",
            transformOrigin: "left",
          }}
        />

        {/* Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <Link
                to={card.link}
                className='group relative flex flex-col justify-between
                           rounded-2xl p-5 h-44 overflow-hidden transition-all duration-300'
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border, rgba(255,255,255,0.07))",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                }}
              >
                {/* Glow */}
                <div
                  className='absolute inset-0 opacity-0 group-hover:opacity-100
                             transition-opacity duration-300 rounded-2xl pointer-events-none'
                  style={{
                    background: `radial-gradient(ellipse at top left,
                      ${card.accentBg}, transparent 70%)`,
                  }}
                />

                {/* Top */}
                <div className='relative flex items-start justify-between'>
                  <div
                    className='w-10 h-10 rounded-xl flex items-center justify-center'
                    style={{ background: card.accentBg }}
                  >
                    <card.icon size={18} style={{ color: card.accent }} />
                  </div>
                  <div className='flex items-center gap-2'>
                    {card.badge && (
                      <span
                        className='px-2 py-0.5 text-xs font-semibold rounded-full'
                        style={{
                          background: "rgba(239,68,68,0.12)",
                          color: "#ef4444",
                        }}
                      >
                        {card.badge} new
                      </span>
                    )}
                    <FiArrowUpRight
                      size={16}
                      className='opacity-0 group-hover:opacity-100
                                 transition-opacity duration-200'
                      style={{ color: "var(--muted-foreground)" }}
                    />
                  </div>
                </div>

                {/* Bottom */}
                <div className='relative'>
                  <p
                    className='text-xs font-medium uppercase tracking-widest mb-1'
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {card.description}
                  </p>
                  <div className='flex items-end justify-between'>
                    <h3
                      className='text-2xl font-bold tracking-tight'
                      style={{ color: "var(--foreground)" }}
                    >
                      {card.count !== null ? card.count : card.title}
                    </h3>
                    <div
                      className='h-0.5 w-0 group-hover:w-8 transition-all
                                 duration-300 rounded-full mb-1'
                      style={{ background: card.accent }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className='rounded-2xl p-5'
          style={{
            background: "var(--card)",
            border: "1px solid var(--border, rgba(255,255,255,0.07))",
          }}
        >
          <p
            className='text-xs uppercase tracking-widest font-medium mb-4'
            style={{ color: "var(--muted-foreground)" }}
          >
            Quick Overview
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {[
              {
                dot: stats.unreadMessages > 0 ? "#ef4444" : "#10b981",
                label: "Unread messages",
                value:
                  stats.unreadMessages > 0
                    ? `${stats.unreadMessages} pending`
                    : "All caught up",
              },
              {
                dot: "#6366f1",
                label: "Published projects",
                value: `${stats.projects} total`,
              },
              {
                dot: "#f59e0b",
                label: "Today",
                value: currentTime.toLocaleDateString([], {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                }),
              },
            ].map((item) => (
              <div key={item.label} className='flex items-center gap-3'>
                <div
                  className='w-2 h-2 rounded-full shrink-0'
                  style={{ background: item.dot }}
                />
                <div>
                  <p
                    className='text-xs'
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className='text-sm font-semibold'
                    style={{ color: "var(--foreground)" }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;
