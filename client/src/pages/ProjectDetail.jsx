import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiExternalLink, FiGithub } from "react-icons/fi";
import api from "../utils/api";
import ThumbnailScroll from "../components/ThumbnailScroll";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        setError("Project not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 dark:text-gray-400 text-lg">{error}</p>
        <Link
          to="/projects"
          className="flex items-center gap-2 text-purple-500 hover:text-purple-400 transition-colors"
        >
          <FiArrowLeft size={18} />
          Back to Projects
        </Link>
      </div>
    );
  }

  const allImages = [
    ...(project.image ? [project.image] : []),
    ...(Array.isArray(project.images) ? project.images : [])
  ];
  const tags = Array.isArray(project.techTags)
    ? project.techTags
    : typeof project.techTags === 'string'
      ? project.techTags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--background)" }}>
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors mb-8"
          >
            <FiArrowLeft size={16} />
            Back to Projects
          </Link>
        </motion.div>

        {/* Cover Image */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl mb-8"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 shadow-[inset_0_-40px_60px_rgba(0,0,0,0.4)] pointer-events-none" />
          </motion.div>
        )}

        {/* Title + Tech Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Links */}
          <div className="flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl transition-colors"
              >
                <FiExternalLink size={16} />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white text-sm font-medium rounded-xl transition-colors"
              >
                <FiGithub size={16} />
                Source Code
              </a>
            )}
          </div>
        </motion.div>

        {/* Thumbnail Gallery */}
        {allImages.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <ThumbnailScroll images={allImages} />
          </motion.div>
        )}

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative rounded-2xl p-px bg-linear-to-br from-purple-500 via-violet-500 to-fuchsia-500"
          style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.2), 0 10px 40px rgba(139, 92, 246, 0.1)' }}
        >
          <div className="rounded-2xl p-8 transition-colors duration-300" style={{ background: "var(--card)" }}>
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--foreground)" }}>
              About this project
            </h2>
            <div className="w-12 h-1 bg-purple-500 rounded-full mb-6" />
            <p className="leading-relaxed whitespace-pre-wrap" style={{ color: "var(--muted-foreground)" }}>
              {project.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetail;
