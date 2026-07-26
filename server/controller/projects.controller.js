import Project from "../models/Project.js";
import { streamUpload } from "../utils/cloudinary.js";
import { editorMediaUpload } from "../middleware/uploadMiddleware.js";

// Upload project images to Cloudinary
export const uploadProjectImages = [
  editorMediaUpload.array("images", 20),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }
      const uploadPromises = req.files.map((file) =>
        streamUpload(file.buffer, "project/images", "image")
      );
      const results = await Promise.all(uploadPromises);
      const urls = results.map((result) => result.secure_url);
      res.json({ urls });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
];

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single project
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create project (auth required)

export const createProject = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      category,
      isSpecial,
      isFeatured: featuredFlag,
      hashtags,
    } = req.body;
    let imageUrl = "";
    let coverUrl = "";

    // Upload image to Cloudinary if provided
    if (req.file) {
      try {
        if (process.env.CLOUDINARY_API_KEY) {
          const result = await streamUpload(req.file.buffer, "project/posts");
          imageUrl = result.secure_url;
          coverUrl = result.secure_url;
        } else {
          console.warn("Cloudinary not configured; skipping image upload.");
        }
      } catch (uploadErr) {
        console.error("Image upload error:", uploadErr);
        return res.status(500).json({
          success: false,
          message: uploadErr.message || "Image upload failed",
        });
      }
    }

    // Calculate read time
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    // Parse hashtags
    let parsedHashtags = [];
    const rawHashtags = hashtags || req.body["hashtags[]"];

    if (rawHashtags) {
      try {
        if (Array.isArray(rawHashtags)) {
          parsedHashtags = rawHashtags;
        } else if (typeof rawHashtags === "string") {
          try {
            parsedHashtags = JSON.parse(rawHashtags);
          } catch (parseError) {
            parsedHashtags = [rawHashtags];
          }
        }

        parsedHashtags = parsedHashtags
          .filter((tag) => typeof tag === "string" && tag.trim())
          .map((tag) => tag.trim().replace(/^#/, ""));
      } catch (e) {
        parsedHashtags = [];
      }
    }

    // If this project is marked special, make it the featured project
    const isFeatured =
      featuredFlag === "true" ||
      featuredFlag === true ||
      isSpecial === "true" ||
      isSpecial === true;
    if (isFeatured) {
      await Project.updateMany({}, { isFeatured: false });
    }

    // Create new project
    const newProject = await Project.create({
      title,
      content,
      excerpt: excerpt || "",
      category,
      hashtags: parsedHashtags,
      image: imageUrl,
      cover: coverUrl,
      author: req.user.id,
      isSpecial: isFeatured,
      isFeatured,
      readTime: `${readTime} min read`,
    });

    res.status(201).json({
      success: true,
      data: newProject,
      message: "Project created successfully",
    });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update project (auth required)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete project (auth required)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
