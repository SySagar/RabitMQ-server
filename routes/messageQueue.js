import express from 'express';
import subscribeMessage from '../controllers/subscriberController.js';
import publishMessage from '../controllers/publisherController.js';
import getAllMessages from '../controllers/getAllMessagesController.js';

const router = express.Router()

router.get("/",getAllMessages );
router.post("/publish",publishMessage );
router.get("/subscribe",subscribeMessage );

export default router;