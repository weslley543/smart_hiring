import { BadRequestError, ConflictError } from '../errors';
import { OrderTrackingRepository } from '../repositories/order-tracking.repository';
import { OrderTracking } from '../types/order-tracking';
import CarriersApiService from './carriers-api.service';

export default class SaveCarrierService {
  private orderTrackingRepository: OrderTrackingRepository;
  private carriersApiService: CarriersApiService;
  constructor() {
    this.orderTrackingRepository = new OrderTrackingRepository();
    this.carriersApiService = new CarriersApiService();
  }

  async execute(trackingCode: string): Promise<OrderTracking> {
    const tracking = await this.orderTrackingRepository.getByTrackingCode(trackingCode);

    if (tracking) {
      throw new ConflictError('Tracking already registred!');
    }

    const carriers = await this.carriersApiService.getTrackingInfo(trackingCode);

    if (!carriers) {
      throw new BadRequestError('Error to get carrier data');
    }

    const newOrderTracking = await this.orderTrackingRepository.add(carriers);

    return newOrderTracking;
  }
}
