import Majalah from "../models/MajalahModel.js";
import upload from '../config/multer.js';
import path from 'path';
import fs from 'fs';

export const getMajalahs = async (req, res) => {
    try {
        const majalahs = await Majalah.findAll();
        res.status(200).json(majalahs);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getMajalahById = async (req, res) => {
    try {
        const majalah = await Majalah.findOne({
            where: {
                id: req.params.id
            }
        });
        if (majalah) {
            res.status(200).json(majalah);
        } else {
            res.status(404).json({ msg: "Majalah not found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const createMajalah = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }
        const { title, description } = req.body;
        const image = req.file.filename; // Mengambil nama file yang diunggah dari request

        try {
            await Majalah.create({
                title,
                description,
                image // Menyimpan nama file gambar ke dalam database
            });
            res.status(201).json({ msg: "Majalah Created" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
};

export const updateMajalah = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }
        const { title, description } = req.body;
        let newImage;
        if (req.file) {
            newImage = req.file.filename;
        }

        try {
            const majalah = await Majalah.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (majalah) {
                // Hapus gambar lama jika ada gambar baru
                if (newImage && majalah.image) {
                    fs.unlinkSync(path.join('C:/uploads', majalah.image));
                }

                await Majalah.update({
                    title,
                    description,
                    image: newImage ? newImage : majalah.image
                }, {
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).json({ msg: "Majalah Updated" });
            } else {
                res.status(404).json({ msg: "Majalah not found" });
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
};

export const deleteMajalah = async (req, res) => {
    try {
        const majalah = await Majalah.findOne({
            where: {
                id: req.params.id
            }
        });
        if (majalah) {
            // Hapus gambar dari direktori
            if (majalah.image) {
                fs.unlinkSync(path.join('C:/uploads', majalah.image));
            }
            await Majalah.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ msg: "Majalah Deleted" });
        } else {
            res.status(404).json({ msg: "Majalah not found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};