import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_CONNECTION_STRING],
  retry: {
    retries: Number(process.env.KAFKA_RETRIES) || 5,
  },
});

export default kafka;
