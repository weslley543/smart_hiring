import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'tracking-service',
  brokers: ['localhost:9092'],
  retry: {
    retries: 5,
  },
});

export default kafka;
