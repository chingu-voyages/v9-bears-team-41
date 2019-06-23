const router = require('express').Router();
const { upload } = require('./storage');
const redis = require('redis');
const { getRedisClient } = require('./redis-client');

router.get('/count', (req, res) => {
    res.send('helloooooo');
});

router.get('/:filename', (req, res) => {
    const filename = req.params.filename;

    const redisClient = getRedisClient();
    redisClient.getAsync(filename)
        .then(value => {
            console.log(`value: ${value}`);
            const filePath = value.toString();
            redisClient.quit();
            res.send(`{"url": "${filePath}"}`)
        })
        .catch(error => {
            console.error(error);
            const responseError = new Error('Internal Server Error!');
            responseError.httpStatusCode = 500;
            return res.send(responseError);
        });
});

router.post('/', upload.single('file'), (req, res) => {
    const file = req.file;
    const originalFileName = file.originalname;
    if (!file) {
        const error = new Error('No file uploaded!');
        error.httpStatusCode = 400;
        console.error(error);
        return res.send(error);
    }

    const fileNameWithoutExtension = file.originalname.split('.')[0];
    const filePath = file.path;
    const redisClient = getRedisClient();
    redisClient.set(fileNameWithoutExtension, filePath, redis.print);
    redisClient.quit();

    res.send(`{"status": "${originalFileName} saved!"}`);
});

module.exports = router;
