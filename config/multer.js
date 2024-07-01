import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Buat folder penyimpanan jika belum ada
const uploadDirectory = 'C:/uploads';
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory); // Tentukan lokasi penyimpanan di luar proyek
    },
    filename: function (req, file, cb) {
        // Menyimpan file dengan nama unik
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Fungsi filter untuk memeriksa tipe file
const fileFilter = (req, file, cb) => {
    // Menerima file jika merupakan gambar JPEG atau PNG
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // Tolak file jika bukan gambar JPEG atau PNG
        cb(new Error('Only JPEG/PNG images are allowed'), false);
    }
};

// Inisialisasi upload multer dengan konfigurasi
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

export default upload;