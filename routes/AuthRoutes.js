import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ msg: 'Admin not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Wrong password' });

    const token = jwt.sign({ id: user.id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

export default router;