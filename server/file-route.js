const router = require('express').Router();
const { upload } = require('./storage');
const redis = require('redis');
const { getRedisClient } = require('./redis-client');
const { serverUrl } = require('./config');

function makeInternalError() {
    const error = new Error('Internal Server Error!');
    error.httpStatusCode = 500;
    return error;
}

router.get('/count', (req, res) => {
    res.json('helloooooo');
});

router.get('/all', (req, res) => {
    const redisClient = getRedisClient();
    redisClient.keysAsync('*')
        .then(keys => {
            const keysJson = JSON.stringify(keys);
            res.json( {names: keysJson} );
        })
        .catch(error => {
            console.error(error);
            const responseError = makeInternalError();
            return res.json(responseError);
        });
});

router.get('/:filename', (req, res) => {
    const filename = req.params.filename;

    const redisClient = getRedisClient();
    redisClient.getAsync(filename)
        .then(value => {
            console.log(`value: ${value}`);
            console.log(`File: ${filename} exist!`);
            redisClient.quit();
            const url = `${serverUrl}/${filename}.md`
            res.json({ url: url });
        })
        .catch(error => {
            console.error(error);
            const responseError = makeInternalError();
            return res.json(responseError);
        });
});

router.post('/', upload.single('file'), (req, res) => {
    const file = req.file;
    const originalFileName = file.originalname;
    if (!file) {
        const error = new Error('No file uploaded!');
        error.httpStatusCode = 400;
        console.error(error);
        return res.json(error);
    }

    const fileNameWithoutExtension = file.originalname.split('.')[0];
    const filePath = file.path;
    const redisClient = getRedisClient();
    redisClient.set(fileNameWithoutExtension, filePath, redis.print);
    redisClient.quit();

    res.json( {status: `"${originalFileName} saved!"`} );
});

router.post('/search', (req, res) => {
    const searchString = req.body.searchString;
    const redisClient = getRedisClient();
    redisClient.keysAsync('*')
        .then(keys => {
            const matchingKeys = keys.filter(value => value.includes(searchString));
            res.json(matchingKeys);
        })
        .catch(error => {
            console.error(error);
            const responseError = makeInternalError();
            return res.json(responseError);
        });
});

module.exports = router;
