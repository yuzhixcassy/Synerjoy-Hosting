import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser, logoutUser, getUserProfile } from "../controllers/UserController.js";
import { verifyToken, isAdmin } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/users', verifyToken, isAdmin, getUsers);
router.get('/users/:id', verifyToken, isAdmin, getUserById);
router.post('/users', createUser);
router.put('/users/:id', verifyToken, isAdmin, updateUser);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);
router.post('/login', loginUser);
router.post('/logout', verifyToken, logoutUser);
router.get('/profile', verifyToken, getUserProfile);

export default router;