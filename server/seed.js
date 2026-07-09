const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const About = require('./models/About');
require('dotenv').config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('MongoDB connected for seeding');

    // Create admin user
    const existingUser = await User.findOne({ username: 'admin' });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        password: hashedPassword
      });
      console.log('Admin user created (username: admin, password: admin123)');
    } else {
      console.log('Admin user already exists');
    }

    // Create default about info
    const existingAbout = await About.findOne();
    if (!existingAbout) {
      await About.create({
        name: 'Your Name',
        tagline: 'Full Stack Developer',
        bio: 'I am a passionate full-stack developer with expertise in building modern web applications. I love creating elegant solutions to complex problems and am always eager to learn new technologies.',
        skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'Express.js', 'PostgreSQL', 'Git'],
        experience: [
          {
            role: 'Senior Developer',
            company: 'Tech Company',
            period: '2022 - Present',
            description: 'Leading development of enterprise web applications.'
          },
          {
            role: 'Full Stack Developer',
            company: 'Startup Inc',
            period: '2020 - 2022',
            description: 'Built and maintained multiple client projects.'
          }
        ],
        profilePhoto: '',
        socialLinks: {
          github: 'https://github.com/yourusername',
          linkedin: 'https://linkedin.com/in/yourusername',
          twitter: 'https://twitter.com/yourusername',
          email: 'your.email@example.com'
        }
      });
      console.log('Default about info created');
    } else {
      console.log('About info already exists');
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seed();
