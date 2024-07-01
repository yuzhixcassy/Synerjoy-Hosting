import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './config/Database.js';
import UserRoute from './routes/UserRoute.js';
import AuthRoute from './routes/AuthRoutes.js';
import feedbackRoutes from './routes/FeedbackRoute.js';
import majalahRoutes from './routes/MajalahRoute.js';
import biotaLautRoutes from './routes/BiotaLautRoute.js'; // Import route untuk "Biota Laut"
import { verifyToken } from './middleware/AuthMiddleware.js';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/uploads', express.static('C:/uploads')); // Serve uploaded files statically

// Rute
app.use(UserRoute);
app.use(AuthRoute);
app.use('/api', feedbackRoutes);
app.use('/api', majalahRoutes);
app.use('/api', biotaLautRoutes); // Gunakan route untuk "Biota Laut"

// Gunakan middleware verifyToken pada rute yang memerlukan autentikasi
app.use('/protected-route', verifyToken, (req, res) => {
  res.json({ msg: 'This is a protected route', user: req.userId, role: req.userRole });
});

// Koneksi ke database dan sinkronisasi model
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

(async () => {
    await db.sync();
})();

// Jalankan server
app.listen(port, () => console.log(`Server running on port ${port}`));