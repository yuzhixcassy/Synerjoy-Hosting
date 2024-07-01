import express from "express";
import {
    getMajalahs,
    getMajalahById,
    createMajalah,
    updateMajalah,
    deleteMajalah
} from "../controllers/CrudMajalahController.js";

const router = express.Router();

router.get('/majalahs', getMajalahs);
router.get('/majalahs/:id', getMajalahById);
router.post('/majalahs', createMajalah);
router.put('/majalahs/:id', updateMajalah);
router.delete('/majalahs/:id', deleteMajalah);

export default router;