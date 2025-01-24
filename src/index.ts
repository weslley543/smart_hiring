import dotenv from 'dotenv';

import MongooseHelper from './config/database';
import { logger } from './config/logger';
import { TrackingScheduler } from './schedulers/tracking.scheduler';
// import NotificationConsumer from './consumers/notification.consumer';

dotenv.config();

const mongooseHelper = MongooseHelper.getInstance();

mongooseHelper
  .connect(process.env.DB_URI)
  .then(async () => {
    const app = (await import('./app')).default;
    const defaultPort = process.env.SERVER_PORT || 3000;

    app.listen(defaultPort, () => {
      logger.info(`Server is running in port ${defaultPort}`);
    });

    logger.info('Starting Tracking Scheduler...');
    TrackingScheduler.start();

    // logger.info('Starting notification cosumer');
    // const notificationConsumer = new NotificationConsumer();
    // await notificationConsumer.consume();
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error);
  });
