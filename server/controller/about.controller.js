import About from "../models/About.js";

export const aboutMe = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({
        name: "Your Name",
        tagline: "Full Stack Developer",
        bio: "Passionate about creating beautiful web experiences.",
        skills: ["React", "Node.js", "MongoDB", "TypeScript"],
        experience: [],
        socialLinks: {},
      });
    }
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateAboutMe = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About(req.body);
    } else {
      Object.assign(about, req.body);
    }
    await about.save();
    res.json(about);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
