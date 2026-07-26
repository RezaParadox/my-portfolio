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
        streamUpload(file.buffer, "project/images", "image"),
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
      description,
      image,
      images,
      techTags,
      liveUrl,
      githubUrl,
      featured,
    } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    let parsedTechTags = [];
    if (typeof techTags === "string") {
      try {
        parsedTechTags = JSON.parse(techTags);
      } catch {
        parsedTechTags = techTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
      }
    } else if (Array.isArray(techTags)) {
      parsedTechTags = techTags;
    }

    const isFeatured =
      featured === "true" ||
      featured === true ||
      featured === 1 ||
      featured === "1";

    if (isFeatured) {
      await Project.updateMany({}, { featured: false });
    }

    const newProject = await Project.create({
      title,
      description,
      image: image || "",
      images: Array.isArray(images) ? images : images ? [images] : [],
      techTags: parsedTechTags,
      liveUrl: liveUrl || "",
      githubUrl: githubUrl || "",
      featured: isFeatured,
    });

    res.status(201).json({
      success: true,
      data: newProject,
      message: "Project created successfully",
    });
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update project (auth required)
export const updateProject = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      images,
      techTags,
      liveUrl,
      githubUrl,
      featured,
    } = req.body;

    let parsedTechTags = [];
    if (typeof techTags === "string") {
      try {
        parsedTechTags = JSON.parse(techTags);
      } catch {
        parsedTechTags = techTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
      }
    } else if (Array.isArray(techTags)) {
      parsedTechTags = techTags;
    }

    const isFeatured =
      featured === "true" ||
      featured === true ||
      featured === 1 ||
      featured === "1";

    if (isFeatured) {
      await Project.updateMany({}, { featured: false });
    }

    const updatedData = {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(image !== undefined && { image }),
      ...(images !== undefined && {
        images: Array.isArray(images) ? images : images ? [images] : [],
      }),
      ...(techTags !== undefined && { techTags: parsedTechTags }),
      ...(liveUrl !== undefined && { liveUrl }),
      ...(githubUrl !== undefined && { githubUrl }),
      ...(featured !== undefined && { featured: isFeatured }),
    };

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );
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
