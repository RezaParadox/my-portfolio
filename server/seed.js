import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import About from "./models/About.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio",
    );
    console.log("MongoDB connected for seeding");

    // Create admin user
    const existingUser = await User.findOne({ username: "admin" });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        username: "admin",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Admin user created (username: admin, password: admin123)");
    } else {
      console.log("Admin user already exists");
    }

    // Create default about info
    const existingAbout = await About.findOne();
    if (!existingAbout) {
      await About.create({
        name: "Your Name",
        tagline: "Full Stack Developer",
        bio: "Passionate about creating beautiful web experiences.",
        skills: ["React", "Node.js", "MongoDB", "TypeScript"],
        experience: [],
        profilePhoto: "",
        socialLinks: {
          github: "https://github.com/yourusername",
          linkedin: "https://linkedin.com/in/yourusername",
          twitter: "https://twitter.com/yourusername",
          email: "your.email@example.com",
        },
      });
      console.log("Default about info created");
    } else {
      console.log("About info already exists");
    }

    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seed();
