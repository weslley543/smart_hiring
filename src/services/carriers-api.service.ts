import axios from 'axios';
import { OrderTracking } from '../types/order-tracking';
import { carrierApiTransform } from '../transformers/carrier-api-response-transform';

export default class CarriersApiService {
  async getTrackingInfo(trackingCode: string): Promise<OrderTracking> {
    const { data } = await axios.get(
      `http://api.carriers.com.br/client/Carriers/Tracking/${trackingCode}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      }
    );
    return carrierApiTransform(data);
  }
}
