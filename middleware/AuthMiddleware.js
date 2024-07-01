import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ msg: "No token provided" });
    
    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).json({ msg: "Failed to authenticate token" });
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
}

export const isAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ msg: "Require Admin Role" });
    }
    next();
}
