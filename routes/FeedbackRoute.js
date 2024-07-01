import express from 'express';
import {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback
} from '../controllers/FeedbackController.js';

const router = express.Router();

router.post('/feedback', createFeedback);
router.get('/feedback', getAllFeedback);
router.get('/feedback/:id', getFeedbackById);
router.put('/feedback/:id', updateFeedback);
router.delete('/feedback/:id', deleteFeedback);

export default router;