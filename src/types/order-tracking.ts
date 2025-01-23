import { Document } from 'mongoose';

type TrackingEvent = {
  timestamp: Date;
  status: string;
  location: string;
};

export type OrderTracking = {
  trackingCode: string;
  carrier: string;
  events: TrackingEvent[];
};

export type OrderTrackingDocument = OrderTracking & Document;
