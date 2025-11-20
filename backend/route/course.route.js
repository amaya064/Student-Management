import express from 'express';
import { 
  registerCourse, 
  getCourses, 
  getCourseById, 
  updateCourse, 
  deleteCourse 
} from '../controller/course.controller.js';

const router = express.Router();

// Course routes
router.post('/register', registerCourse);
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;