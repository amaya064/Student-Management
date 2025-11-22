import express from 'express';
import {
  addMarks,
  calculateCAMarks,
  getStudentMarks,
  getAllMarks
} from '../controller/mark.controller.js';

const router = express.Router();

// Add marks for a student
router.post('/', addMarks);

// Calculate CA marks for a student for specific academic year
router.get('/calculate-ca/:studentId/:academicYear', calculateCAMarks);

// Get marks for a specific student
router.get('/student/:studentId', getStudentMarks);

// Get all marks (admin view)
router.get('/', getAllMarks);

export default router;