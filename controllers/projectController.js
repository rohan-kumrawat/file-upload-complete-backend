import Project from '../models/Project.js';
import cloudinary from '../config/cloudinary.js';

export const createProject = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    // Upload to Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const cloudinaryResponse = await cloudinary.uploader.upload(dataURI, {
      folder: 'projects',
      resource_type: 'auto'
    });

    // Create Project
    const project = await Project.create({
      title: req.body.title,
      clientName: req.body.clientName,
      date: req.body.date,
      description: req.body.description,
      imageUrl: cloudinaryResponse.secure_url
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};