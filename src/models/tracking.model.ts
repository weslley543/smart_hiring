import mongoose from 'mongoose';

const TrackingEventSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  status: { type: String, required: true },
  location: { type: String, required: true },
});

const OrderTrackingSchema = new mongoose.Schema({
  trackingCode: { type: String, required: true, unique: true },
  carrier: { type: String, required: true },
  events: [TrackingEventSchema],
});

export const OrderTrackingModel = mongoose.model('OrderTracking', OrderTrackingSchema);
