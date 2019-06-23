const router = require('express').Router();
const { upload } = require('./storage');
const { getRedisClient } = require('./redis-client');

router.get('/count', (req, res) => {
    res.send('helloooooo');
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`id: ${id}`);
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
    res.send(`{"status": "${originalFileName} saved!"}`);
});

const redisClient = getRedisClient();

redisClient.quit();

module.exports = router;
