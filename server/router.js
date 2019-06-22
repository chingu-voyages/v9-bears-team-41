const router = require('express').Router();
const { getRedisClient } = require('./redis-client');

router.get('/', (req, res) => {
    res.send('helloooooo');
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`id: ${id}`);
});

const redisClient = getRedisClient();

redisClient.quit();

module.exports = router;
