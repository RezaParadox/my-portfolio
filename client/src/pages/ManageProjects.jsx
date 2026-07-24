import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload, FiImage } from 'react-icons/fi';
import api from '../utils/api';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    images: [],
    techTags: [],
    tagInput: '',
    liveUrl: '',
    githubUrl: '',
    featured: false
  });
  const [uploading, setUploading] = useState(false);
  const coverInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image || '',
        images: project.images || [],
        techTags: project.techTags || [],
        tagInput: '',
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        featured: project.featured || false
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        images: [],
        techTags: [],
        tagInput: '',
        liveUrl: '',
        githubUrl: '',
        featured: false
      });
    }
    setShowModal(true);
  };

  const handleUploadCover = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('images', file);
      const res = await api.post('/projects/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, image: res.data.urls[0] }));
    } catch (err) {
      console.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleUploadGallery = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const fd = new FormData();
      files.forEach(f => fd.append('images', f));
      const res = await api.post('/projects/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, images: [...prev.images, ...res.data.urls] }));
    } catch (err) {
      console.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tag = formData.tagInput.trim();
      if (tag && !formData.techTags.includes(tag)) {
        setFormData(prev => ({ ...prev, techTags: [...prev.techTags, tag], tagInput: '' }));
      }
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({ ...prev, techTags: prev.techTags.filter(t => t !== tag) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        images: formData.images,
        techTags: formData.techTags,
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl,
        featured: formData.featured
      };

      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, payload);
      } else {
        await api.post('/projects', payload);
      }
      setShowModal(false);
      fetchProjects();
    } catch (err) {
      console.error('Failed to save project');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error('Failed to delete project');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Projects</h1>
            <p style={{ color: "var(--muted-foreground)" }}>Manage your portfolio projects</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <FiPlus size={20} />
            Add Project
          </button>
        </motion.div>

        {projects.length === 0 ? (
          <div className="text-center py-12 rounded-2xl" style={{ background: "var(--card)" }}>
            <p style={{ color: "var(--muted-foreground)" }}>No projects yet. Click "Add Project" to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl shadow-lg overflow-hidden"
                style={{ background: "var(--card)" }}
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--foreground)" }}>
                    {project.title}
                  </h3>
                  <p className="text-sm mb-4 line-clamp-2" style={{ color: "var(--muted-foreground)" }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techTags?.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm transition-colors"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      <FiEdit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-500 hover:text-red-600 transition-colors"
                    >
                      <FiTrash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              style={{ background: "var(--card)" }}
            >
              <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: "var(--border)" }}>
                <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                  {editingProject ? 'Edit Project' : 'Add Project'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  style={{ color: "var(--muted-foreground)" }}
                  className="hover:opacity-80"
                >
                  <FiX size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                    style={{ background: "var(--secondary)", borderColor: "var(--border)", color: "var(--foreground)" }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    style={{ background: "var(--secondary)", borderColor: "var(--border)", color: "var(--foreground)" }}
                  />
                </div>

                {/* Cover Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>Cover Image</label>
                  <div
                    onClick={() => coverInputRef.current?.click()}
                    className="w-full px-4 py-8 rounded-lg border-2 border-dashed cursor-pointer flex flex-col items-center gap-2 transition-colors hover:border-blue-500"
                    style={{ borderColor: "var(--border)", background: "var(--secondary)" }}
                  >
                    {formData.image ? (
                      <img src={formData.image} alt="Cover" className="w-32 h-20 object-cover rounded-lg" />
                    ) : (
                      <>
                        <FiUpload size={24} style={{ color: "var(--muted-foreground)" }} />
                        <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                          {uploading ? 'Uploading...' : 'Click to upload cover image'}
                        </span>
                      </>
                    )}
                  </div>
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUploadCover}
                    className="hidden"
                  />
                </div>

                {/* Gallery Images Upload */}
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>Gallery Images</label>
                  <div
                    onClick={() => galleryInputRef.current?.click()}
                    className="w-full px-4 py-6 rounded-lg border-2 border-dashed cursor-pointer flex flex-col items-center gap-2 transition-colors hover:border-blue-500"
                    style={{ borderColor: "var(--border)", background: "var(--secondary)" }}
                  >
                    <FiImage size={24} style={{ color: "var(--muted-foreground)" }} />
                    <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                      {uploading ? 'Uploading...' : 'Click to upload gallery images'}
                    </span>
                  </div>
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleUploadGallery}
                    className="hidden"
                  />
                  {formData.images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img src={img} alt="" className="w-20 h-16 object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FiX size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tech Tags */}
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>Tech Tags</label>
                  <div
                    className="w-full px-4 py-2 rounded-lg border flex flex-wrap gap-2 min-h-[42px] items-center"
                    style={{ background: "var(--secondary)", borderColor: "var(--border)" }}
                  >
                    {formData.techTags.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-600 dark:text-purple-300 text-xs rounded-full"
                      >
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                          <FiX size={12} />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={formData.tagInput}
                      onChange={(e) => setFormData({ ...formData, tagInput: e.target.value })}
                      onKeyDown={handleTagKeyDown}
                      placeholder={formData.techTags.length === 0 ? "Type a tag and press Enter" : ""}
                      className="flex-1 min-w-[120px] bg-transparent outline-none text-sm"
                      style={{ color: "var(--foreground)" }}
                    />
                  </div>
                </div>

                {/* URLs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>Live URL</label>
                    <input
                      type="text"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                      style={{ background: "var(--secondary)", borderColor: "var(--border)", color: "var(--foreground)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>GitHub URL</label>
                    <input
                      type="text"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                      style={{ background: "var(--secondary)", borderColor: "var(--border)", color: "var(--foreground)" }}
                    />
                  </div>
                </div>

                {/* Featured */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="featured" className="text-sm" style={{ color: "var(--foreground)" }}>
                    Featured project
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg transition-colors"
                    style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
                  >
                    {uploading ? 'Uploading...' : editingProject ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageProjects;
