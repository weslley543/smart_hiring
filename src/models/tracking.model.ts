import mongoose from 'mongoose';

const TrackingEventSchema = new mongoose.Schema(
  {
    timestamp: { type: Date, required: true },
    status: { type: String, required: true },
  },
  {
    toJSON: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform: (_: any, ret: any): any => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform: (_: any, ret: any): any => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const OrderTrackingSchema = new mongoose.Schema(
  {
    trackingCode: { type: String, required: true, unique: true },
    carrier: { type: String, required: true },
    events: [TrackingEventSchema],
  },
  {
    toJSON: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform: (_: any, ret: any): any => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform: (_: any, ret: any): any => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const OrderTrackingModel = mongoose.model('OrderTracking', OrderTrackingSchema);
