import { KafkaMessage, Producer } from 'kafkajs';
import kafka from '../config/kafka';
import { logger } from '../config/logger';

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

  public async notify(message: KafkaMessage): Promise<void> {
    const topic = process.env.KAFKA_TOPIC;
    if (!topic) {
      throw new Error('Kafka needs a topic');
    }
    try {
      await this.connectProducer();
      await this.producer.send({
        topic,
        messages: [message],
      });
      logger.info(`Message successfully sent to topic ${topic}: ${JSON.stringify(message)}`);
    } catch (error) {
      logger.error(`Failed to send message to topic ${topic}:`, error);
    }
  }
}
