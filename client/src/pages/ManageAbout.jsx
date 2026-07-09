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
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">About Info</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your bio, skills, and experience</p>
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
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Basic Info</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={about.name}
                  onChange={(e) => setAbout({ ...about, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={about.tagline}
                  onChange={(e) => setAbout({ ...about, tagline: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  value={about.bio}
                  onChange={(e) => setAbout({ ...about, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Profile Photo URL
                </label>
                <input
                  type="text"
                  value={about.profilePhoto}
                  onChange={(e) => setAbout({ ...about, profilePhoto: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Skills</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
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
                  className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-gray-500 hover:text-red-500"
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
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Experience</h2>
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
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-500">Experience {index + 1}</span>
                    <button
                      onClick={() => removeExperience(index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(index, 'role', e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      placeholder="Role"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      placeholder="Company"
                    />
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => updateExperience(index, 'period', e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      placeholder="Period (e.g., 2020 - 2022)"
                    />
                    <input
                      type="text"
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
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
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Social Links</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GitHub
                </label>
                <input
                  type="text"
                  value={about.socialLinks?.github || ''}
                  onChange={(e) => setAbout({
                    ...about,
                    socialLinks: { ...about.socialLinks, github: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  LinkedIn
                </label>
                <input
                  type="text"
                  value={about.socialLinks?.linkedin || ''}
                  onChange={(e) => setAbout({
                    ...about,
                    socialLinks: { ...about.socialLinks, linkedin: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Twitter
                </label>
                <input
                  type="text"
                  value={about.socialLinks?.twitter || ''}
                  onChange={(e) => setAbout({
                    ...about,
                    socialLinks: { ...about.socialLinks, twitter: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="text"
                  value={about.socialLinks?.email || ''}
                  onChange={(e) => setAbout({
                    ...about,
                    socialLinks: { ...about.socialLinks, email: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
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
