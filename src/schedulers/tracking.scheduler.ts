import schedule from 'node-schedule';
import { logger } from '../config/logger';
import CarriersApiService from '../services/carriers-api.service';
import { OrderTrackingRepository } from '../repositories/order-tracking.repository';
import NotificationService from '../services/notification.service';

export class TrackingScheduler {
  private carriersApiService: CarriersApiService;
  private orderTrackingRepository: OrderTrackingRepository;
  private notificationService: NotificationService;

  constructor() {
    this.carriersApiService = new CarriersApiService();
    this.orderTrackingRepository = new OrderTrackingRepository();
    this.notificationService = new NotificationService();
  }

  private async run(): Promise<void> {
    logger.info('Getting all order trackings');
    const carriers = await this.orderTrackingRepository.getAllOrderTracking();

    for (const carrier of carriers) {
      logger.info(`Starting update of order events for carrier ${carrier.trackingCode}`);

      try {
        const trackingData = await this.carriersApiService.getTrackingInfo(carrier.trackingCode);

        await this.orderTrackingRepository.updateTracking(carrier.trackingCode, trackingData);

        // await this.notificationService.notify(trackingData);

        logger.info(`Successfully updated order events for carrier ${carrier.trackingCode}`);
      } catch (error) {
        logger.error(
          `Failed to update order events for carrier ${carrier.trackingCode}: ${error.message}`
        );
      }
    }
  }

  public static start(): void {
    const scheduler = new TrackingScheduler();
    schedule.scheduleJob('*/5 * * * *', async () => {
      logger.info('Running tracking scheduler');
      await scheduler.run();
    });
  }
}
