import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String, default: "" },
  bio: { type: String, default: "" },
  skills: [{ type: String }],
  experience: [
    {
      role: String,
      company: String,
      period: String,
      description: String,
    },
  ],
  profilePhoto: { type: String, default: "" },
  socialLinks: {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    email: { type: String, default: "" },
  },
});

export default mongoose.model("About", aboutSchema);
