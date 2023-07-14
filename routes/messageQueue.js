import express from 'express';
import subscribeMessage from '../controllers/subscriberController.js';
import publishMessage from '../controllers/publisherController.js';
import getBasicMessage from '../controllers/getAllMessagesController.js';

const router = express.Router()

router.get("/",getBasicMessage );
router.post("/publish",publishMessage );
router.get("/subscribe",subscribeMessage );

export default router;