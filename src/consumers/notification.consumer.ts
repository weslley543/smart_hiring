import { logger } from '../config/logger';
import kafka from '../config/kafka';
import { Consumer, EachMessagePayload } from 'kafkajs';

export default class NotificationConsumer {
  private consumer: Consumer;

  constructor() {
    const groupId = process.env.KAFKA_GROUP_ID;
    if (!groupId) {
      throw new Error('Kafka needs a group a groupId');
    }
    this.consumer = kafka.consumer({ groupId });
  }

  private async connectConsumer(): Promise<void> {
    try {
      this.consumer.connect();
    } catch (error) {
      logger.error('Failed to connect consumer');
    }
  }

  private async subscribe(): Promise<void> {
    const topic = process.env.KAFKA_TOPIC;
    if (!topic) {
      logger.error('Failed to connect consumer');
      throw new Error('Kafka topic must be seted');
    }
    try {
      this.consumer.subscribe({ topic: topic, fromBeginning: true });
    } catch (error) {
      logger.error('Failed to connect consumer');
    }
  }

  async consume(): Promise<void> {
    await this.connectConsumer();
    await this.subscribe();

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        const key = message.key ? message.key.toString() : 'No key';
        const value = message.value ? message.value.toString() : 'No value';
        const offset = message.offset;

        logger.info(`Message received: topic=${topic}, partition=${partition}, offset=${offset}`);
        logger.info(`Key: ${key}, Value: ${value}`);

        try {
          const eventData = JSON.parse(value);

          logger.info('Processed event:', eventData);
        } catch (error) {
          logger.error('Failed to process message:', error);
        }
      },
    });
  }
}
