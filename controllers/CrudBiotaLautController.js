import BiotaLaut from "../models/BiotaLautModel.js";
import upload from '../config/multer.js';
import path from 'path';
import fs from 'fs';

export const getBiotaLauts = async (req, res) => {
    try {
        const biotaLauts = await BiotaLaut.findAll();
        res.status(200).json(biotaLauts);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getBiotaLautById = async (req, res) => {
    try {
        const biotaLaut = await BiotaLaut.findOne({
            where: {
                id: req.params.id
            }
        });
        if (biotaLaut) {
            res.status(200).json(biotaLaut);
        } else {
            res.status(404).json({ msg: "Biota Laut not found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const createBiotaLaut = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }
        const { name, weight, food, size, depth, description, fun_fact } = req.body;
        const image = req.file.filename; // Mengambil nama file yang diunggah dari request

        try {
            await BiotaLaut.create({
                name,
                image,
                weight,
                food,
                size,
                depth,
                description,
                fun_fact
            });
            res.status(201).json({ msg: "Biota Laut Created" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
};

export const updateBiotaLaut = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }
        const { name, weight, food, size, depth, description, fun_fact } = req.body;
        let newImage;
        if (req.file) {
            newImage = req.file.filename;
        }

        try {
            const biotaLaut = await BiotaLaut.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (biotaLaut) {
                // Hapus gambar lama jika ada gambar baru
                if (newImage && biotaLaut.image) {
                    fs.unlinkSync(path.join('C:/uploads', biotaLaut.image));
                }

                await BiotaLaut.update({
                    name,
                    image: newImage ? newImage : biotaLaut.image,
                    weight,
                    food,
                    size,
                    depth,
                    description,
                    fun_fact
                }, {
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).json({ msg: "Biota Laut Updated" });
            } else {
                res.status(404).json({ msg: "Biota Laut not found" });
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
};

export const deleteBiotaLaut = async (req, res) => {
    try {
        const biotaLaut = await BiotaLaut.findOne({
            where: {
                id: req.params.id
            }
        });
        if (biotaLaut) {
            // Hapus gambar dari direktori
            if (biotaLaut.image) {
                fs.unlinkSync(path.join('C:/uploads', biotaLaut.image));
            }
            await BiotaLaut.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ msg: "Biota Laut Deleted" });
        } else {
            res.status(404).json({ msg: "Biota Laut not found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};