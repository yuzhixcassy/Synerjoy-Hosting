import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export const getUsers = async(req, res) => {
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createUser = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ msg: "Email already exists" });
        }
        const hashedPassword = bcrypt.hashSync(password, 8);
        await User.create({ name, email, password: hashedPassword, role: 'admin' });
        res.status(201).json({msg: "Admin Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUser = async(req, res) => {
    const { password } = req.body;
    let updatedData = { ...req.body };
    if (password) {
        updatedData.password = bcrypt.hashSync(password, 8);
    }
    try {
        await User.update(updatedData, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Admin Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async(req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Admin Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export const loginUser = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: "Admin not found" });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ msg: "Invalid password" });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.log(error.message);
    }
}

export const logoutUser = async(req, res) => {
    res.status(200).json({ msg: "Logged out" });
}

export const getUserProfile = async(req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.userId
            },
            attributes: ['id', 'name', 'email', 'role']
        });
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
}