import { Kafka, Partitioners } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'sensor-service',
    brokers: ['kafka:9092'],
});

export const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
});

export const connectProducer = async () => {
    await producer.connect();
    console.log('[Kafka] Sensor connected');
};