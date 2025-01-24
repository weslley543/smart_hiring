import { OrderTrackingModel } from '../models/tracking.model';
import { TrackingStatus } from '../enums/enum-tracking-status';
import { OrderTracking, OrderTrackingDocument } from '../types/order-tracking';

export class OrderTrackingRepository {
  async add(tracking: OrderTracking): Promise<OrderTrackingDocument> {
    return OrderTrackingModel.create(tracking);
  }

  async getByTrackingCode(trackingCode: string): Promise<OrderTrackingDocument | null> {
    return OrderTrackingModel.findOne({ trackingCode });
  }

  async getAllOrderTracking(): Promise<OrderTrackingDocument[]> {
    return OrderTrackingModel.find({
      events: {
        $not: {
          $elemMatch: {
            status: TrackingStatus.DELIVERY_COMPLETED,
          },
        },
      },
    });
  }

  async updateTracking(
    trackingCode: string,
    tracking: OrderTracking
  ): Promise<OrderTrackingDocument | null> {
    return OrderTrackingModel.findOneAndUpdate({ trackingCode }, tracking, {
      new: true,
      runValidators: true,
    });
  }
}
