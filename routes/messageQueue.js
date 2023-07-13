import express from 'express';
import subscribeMessage from '../controllers/subscriberController.js';
import publishMessage from '../controllers/publisherController.js';

const router = express.Router()

router.get("/subscribe",subscribeMessage );
router.post("/publish",publishMessage );

export default router;