import express from 'express';
import upload from '../utils/multer.js';
import { createProject } from '../controllers/projectController.js';

const router = express.Router();

router.post('/projects', upload.single('image'), createProject);

export default router;