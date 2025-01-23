import express from 'express';
import TrackingController from '../controllers/tracking.controller';

const router = express.Router();
const trackingController = new TrackingController();

router.get('/tracking/:trackingCode', trackingController.getTracking);

export default router;
