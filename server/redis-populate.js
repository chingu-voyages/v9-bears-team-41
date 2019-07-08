const redis = require('redis');
const { getRedisClient } = require('./redis-client');
const fs = require('fs');
const { storagePath } = require('./config');

function populateRedis() {
    const redisClient = getRedisClient();
    fs.readdirSync(`${storagePath}/`).forEach(file => {
        const fileNameWithoutExtension = file.split('.')[0];
        const filePath = `${storagePath}/${file}`;
        redisClient.set(fileNameWithoutExtension, filePath, redis.print);
    });
}

module.exports = {
    populateRedis
}