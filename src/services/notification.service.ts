import { v4 as uuidv4 } from 'uuid';
import { Producer } from 'kafkajs';
import kafka from '../config/kafka';
import { logger } from '../config/logger';
import { OrderTracking } from 'types/order-tracking';

export default class NotificationService {
  private producer: Producer;

  constructor() {
    this.producer = kafka.producer();
  }

  private async connectProducer(): Promise<void> {
    try {
      await this.producer.connect();
      logger.info('Kafka producer connected successfully.');
    } catch (error) {
      logger.error('Failed to connect Kafka producer:', error);
      process.exit(1);
    }
  }

  public async notify(updatedCarrier: OrderTracking): Promise<void> {
    const topic = process.env.KAFKA_TOPIC;
    if (!topic) {
      throw new Error('Kafka needs a topic');
    }
    try {
      await this.connectProducer();
      await this.producer.send({
        topic,
        messages: [
          {
            key: uuidv4(),
            value: JSON.stringify(updatedCarrier),
          },
        ],
      });
      this.producer.disconnect();
      logger.info(`Message successfully sent to topic ${topic}: ${JSON.stringify(updatedCarrier)}`);
    } catch (error) {
      logger.error(`Failed to send message to topic ${topic}:`, error);
    }
  }
}
