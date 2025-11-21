// signup.route.js
import express from 'express';
import { getEmployeeDetailsByEmail, getUserCount, registerStudent, signin, signup, updateUserProfile } from '../controller/signup.controller.js';

const router = express.Router();

router.post("/", signup);
router.post("/signin", signin);
router.get('/profile/:email', getEmployeeDetailsByEmail); 
router.put('/profile/:email', updateUserProfile);
router.get("/count", getUserCount);
router.put('/profile/:email', updateUserProfile);
router.post("/student", registerStudent);

export default router;
