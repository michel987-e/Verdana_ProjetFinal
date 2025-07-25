import { Kafka } from 'kafkajs';
import axios from 'axios'

const kafka = new Kafka({
    clientId: 'recommendation-service',
    brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'botanist-group' });

export const runConsumer = async (recommendationService) => {    
    await consumer.connect();
    console.log('[Kafka] Recommendation connected');

    await consumer.subscribe({ topic: 'sensor-data', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const payload = message.value?.toString();

            try {
                const data = JSON.parse(payload || '{}');
                console.log('data parsed : ', data)

                // Probleme requete api flower
                const flowerRes = await axios.get(`http://flower:80/flower/${data.flower_id}`);
                const flower = flowerRes.data;

                const userId = flower.user_id
                const userToken = await recommendationService.findOne(userId)
                const token = userToken.token
                console.log('token : ', token)
                if (token) {
                    console.log('Sending push notification to token:', token);
                    await recommendationService.sendPushNotif(token);
                }
            } catch (err) {
                console.log('[Recommendation] Error while parsing :', err);
            }
        },
    });
};
