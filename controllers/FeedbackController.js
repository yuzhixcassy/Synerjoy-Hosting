import Feedback from "../models/Feedback.js";

// Create new feedback
export const createFeedback = async (req, res) => {
    const { name, email, phone, text } = req.body;
    try {
        const newFeedback = await Feedback.create({ name, email, phone, text });
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(500).json({ error: 'Error creating feedback' });
    }
};

// Get all feedback
export const getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.findAll();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching feedback' });
    }
};

// Get feedback by ID
export const getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findOne({ where: { id: req.params.id } });
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching feedback' });
    }
};

// Update feedback by ID
export const updateFeedback = async (req, res) => {
    const { name, email, phone, text } = req.body;
    try {
        const feedback = await Feedback.findOne({ where: { id: req.params.id } });
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        await Feedback.update({ name, email, phone, text }, { where: { id: req.params.id } });
        res.status(200).json({ msg: 'Feedback updated successfully' });
    } catch (error) {
        res.status (500).json({ error: 'Error updating feedback' });
    }
};

// Delete feedback by ID
export const deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findOne({ where: { id: req.params.id } });
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        await Feedback.destroy({ where: { id: req.params.id } });
        res.status(200).json({ msg: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting feedback' });
    }
};