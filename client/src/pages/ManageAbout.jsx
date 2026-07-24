import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';
import api from '../utils/api';

const ManageAbout = () => {
  const [about, setAbout] = useState({
    name: '',
    tagline: '',
    bio: '',
    skills: [],
    experience: [],
    profilePhoto: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      email: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    fetchAbout();
  }, []);

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

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      await api.put('/about', about);
      setMessage({ type: 'success', text: 'About info updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update about info' });
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setAbout({ ...about, skills: [...about.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    setAbout({ ...about, skills: about.skills.filter((_, i) => i !== index) });
  };

  const addExperience = () => {
    setAbout({
      ...about,
      experience: [...about.experience, { role: '', company: '', period: '', description: '' }]
    });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...about.experience];
    updated[index][field] = value;
    setAbout({ ...about, experience: updated });
  };

  const removeExperience = (index) => {
    setAbout({ ...about, experience: about.experience.filter((_, i) => i !== index) });
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
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: "var(--foreground)" }}>About Info</h1>
            <p style={{ color: "var(--muted-foreground)" }}>Manage your bio, skills, and experience</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
          >
            <FiSave size={20} />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </motion.div>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-8">
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl shadow-lg p-6"
            style={{ background: "var(--card)" }}
          >
            <h2 className="text-xl font-bold mb-6" style={{ color: "var(--foreground)" }}>Basic Info</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
                  Name
                </label>
                <input
                  type="text"
                  value={about.name}
                  onChange={(e) => setAbout({ ...about, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  style={{ background: "var(--secondary)", borderColor: "var(--border)", color: "var(--foreground)" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
                  Tagline
                </label>
                <input
                  type="text"
                  value={about.tagline}
                  onChange={(e) => setAbout({ ...about, tagline: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  style={{ background: "var(--secondary)", borderColor: "var(--border)", color: "var(--foreground)" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
                  Bio
                </label>
                <textarea
                  value={about.bio}
                  onChange={(e) => setAbout({ ...about, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  style={{ background: "var(--secondary)", borderColor: "var(--border)", color: "var(--foreground)" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
                  Profile Photo URL
                </label>
                <input
                  type="text"
                  value={about.profilePhoto}
                  onChange={(e) => setAbout({ ...about, profilePhoto: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  style={{ background: "var(--secondary)", borderColor: "var(--border)", color: "var(--foreground)" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl shadow-lg p-6"
            style={{ background: "var(--card)" }}
          >
            <h2 className="text-xl font-bold mb-6" style={{ color: "var(--foreground)" }}>Skills</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                style={{ background: "var(--secondary)", borderColor: "var(--border)", color: "var(--foreground)" }}
                placeholder="Add a skill"
              />
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <FiPlus size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((skill, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                  style={{ background: "var(--secondary)", color: "var(--foreground)" }}
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(index)}
                    className="hover:text-red-500"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl shadow-lg p-6"
            style={{ background: "var(--card)" }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Experience</h2>
              <button
                onClick={addExperience}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                <FiPlus size={16} />
                Add
              </button>
            </div>
            <div className="space-y-4">
              {about.experience.map((exp, index) => (
                <div key={index} className="p-4 rounded-xl" style={{ background: "var(--secondary)" }}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>Experience {index + 1}</span>
                    <button
                      onClick={() => removeExperience(index)}
                      className="hover:text-red-500"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(index, 'role', e.target.value)}
                      className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}
                      placeholder="Role"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}
                      placeholder="Company"
                    />
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => updateExperience(index, 'period', e.target.value)}
                      className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}
                      placeholder="Period (e.g., 2020 - 2022)"
                    />
                    <input
                      type="text"
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}
                      placeholder="Description"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-2xl shadow-lg p-6"
            style={{ background: "var(--card)" }}
          >
            <h2 className="text-xl font-bold mb-6" style={{ color: "var(--foreground)" }}>Social Links</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
                  GitHub
                </label>
                <input
                  type="text"
                  value={about.socialLinks?.github || ''}
                  onChange={(e) => setAbout({
                    ...about,
                    socialLinks: { ...about.socialLinks, github: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  style={{ background: "var(--secondary)", borderColor: "var(--border)", color: "var(--foreground)" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
                  LinkedIn
                </label>
                <input
                  type="text"
                  value={about.socialLinks?.linkedin || ''}
                  onChange={(e) => setAbout({
                    ...about,
                    socialLinks: { ...about.socialLinks, linkedin: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  style={{ background: "var(--secondary)", borderColor: "var(--border)", color: "var(--foreground)" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
                  Twitter
                </label>
                <input
                  type="text"
                  value={about.socialLinks?.twitter || ''}
                  onChange={(e) => setAbout({
                    ...about,
                    socialLinks: { ...about.socialLinks, twitter: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  style={{ background: "var(--secondary)", borderColor: "var(--border)", color: "var(--foreground)" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
                  Email
                </label>
                <input
                  type="text"
                  value={about.socialLinks?.email || ''}
                  onChange={(e) => setAbout({
                    ...about,
                    socialLinks: { ...about.socialLinks, email: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  style={{ background: "var(--secondary)", borderColor: "var(--border)", color: "var(--foreground)" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ManageAbout;
