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
    if (!file) {
        const error = new Error('No file uploaded!');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(`File with filename: ${file.filename} saved!`);
});

const redisClient = getRedisClient();

redisClient.quit();

module.exports = router;
