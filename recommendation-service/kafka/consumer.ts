import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'recommendation-service',
    brokers: ['kafka:9092'], // host dans Docker
});

const consumer = kafka.consumer({ groupId: 'botanist-group' });

export const runConsumer = async () => {
    await consumer.connect();
    console.log('[Kafka] Recommendation connected');

    await consumer.subscribe({ topic: 'sensor-data', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const payload = message.value?.toString();

            try {
                const data = JSON.parse(payload || '{}');
                console.log('data parsed : ', data)
            } catch (err) {
                console.log('[Recommendation] Error while parsing :', err);
            }
        },
    });
};
