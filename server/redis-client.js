const redis = require('redis');
const { promisify } = require('util');

const redisHost = process.env.REDIS_HOST;

function getRedisClient() {
    const client = redis.createClient({ host: redisHost });

    client.on('connect', () => console.log('Redis client connected!'));
    client.on('ready', () => console.log('Redis client ready!'));
    client.on('error', error => {
        console.error('Error:', error);
        client.quit();
    });
    client.on('end', () => console.log('Redis client connection closed!'));

    client.getAsync = promisify(client.get);
    client.keysAsync = promisify(client.keys);

    return client;
}

module.exports = {
    getRedisClient
};
