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
    // const carriers = await this.orderTrackingRepository.getAllOrderTracking();
    const carriers = [];
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
    logger.info('All orders finished!!');
  }

  public static start(): void {
    const scheduler = new TrackingScheduler();
    logger.info('Running tracking scheduler');
    schedule.scheduleJob('*/1 * * * *', async () => {
      await scheduler.run();
    });
  }
}
