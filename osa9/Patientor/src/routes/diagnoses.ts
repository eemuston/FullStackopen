import express from 'express';
const router = express.Router();
import diagnosisService from '../services/diagnosisService';

router.get('/', (_req, res) => {
    res.send(diagnosisService.getDiagnoses());
});

export default router;