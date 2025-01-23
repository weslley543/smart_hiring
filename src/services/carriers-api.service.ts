import axios from 'axios';
import { OrderTracking } from '../types/order-tracking';

export default class CarriersApiService {
  async getTrackingInfo(trackingCode: string): Promise<any> {
    // const { data } = axios.get(
    //   `http://api.carriers.com.br/client/Carriers/Tracking/${trackingCode}`
    // );
    // return data;
  }
}
