const router = require('express').Router();
const { upload } = require('./storage');
const redis = require('redis');
const { getRedisClient } = require('./redis-client');
const { serverUrl } = require('./config');

router.get('/all', (req, res) => {
    const redisClient = getRedisClient();
    redisClient.keysAsync('*')
        .then(keys => {
            redisClient.quit();
            const keysJson = JSON.stringify(keys);
            res.json( {names: keysJson} );
        })
        .catch(error => {
            redisClient.quit();
            console.error(error);
            return res.status(500).send(error);
        });
});

router.get('/:filename', (req, res) => {
    const fileName = req.params.filename;

    const redisClient = getRedisClient();
    redisClient.getAsync(fileName)
        .then(originalFileName => {
            console.log(`Original file name: ${originalFileName}`);
            if (originalFileName === null) {
                const errorMessage = `${fileName} doesn't exit!`;
                console.error(errorMessage);
                return res.status(404).send(errorMessage);
            }
            redisClient.quit();
            const url = `${serverUrl}/${originalFileName}`
            return res.json({ url: url });
        })
        .catch(error => {
            redisClient.quit();
            console.error(error);
            return res.status(500).send(error);
        });
});

router.post('/', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        const errorMessage = 'No file uploaded!';
        console.error(errorMessage);
        return res.status(400).send(errorMessage);
    }

    const fileOriginalName = file.originalname;
    const fileNameWithoutExtension = fileOriginalName.split('.')[0];
    const filePath = file.path;
    console.log(`File saved at path: ${filePath}`);
    const redisClient = getRedisClient();
    redisClient.set(fileNameWithoutExtension, fileOriginalName, redis.print);
    redisClient.quit();

    res.json( {saved: 1} );
});

router.post('/search', (req, res) => {
    const searchString = req.body.searchString;
    const redisClient = getRedisClient();
    redisClient.keysAsync('*')
        .then(keys => {
            redisClient.quit();
            const matchingKeys = keys.filter(value => value.toLowerCase().includes(searchString.toLowerCase()));
            const matchingKeysJson = JSON.stringify(matchingKeys);
            res.json({ names: matchingKeysJson });
        })
        .catch(error => {
            redisClient.quit();
            console.error(error);
            return res.status(500).send(error);
        });
});

module.exports = router;
