import express from 'express';
import { deleteUser, getAllUsers } from '../controller/employee.controller.js';

const router = express.Router();

// Route to get all users
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);


export default router;
