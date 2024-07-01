import express from "express";
import {
    getBiotaLauts,
    getBiotaLautById,
    createBiotaLaut,
    updateBiotaLaut,
    deleteBiotaLaut
} from "../controllers/CrudBiotaLautController.js";

const router = express.Router();

router.get('/biota-lauts', getBiotaLauts);
router.get('/biota-lauts/:id', getBiotaLautById);
router.post('/biota-lauts', createBiotaLaut);
router.put('/biota-lauts/:id', updateBiotaLaut);
router.delete('/biota-lauts/:id', deleteBiotaLaut);

export default router;