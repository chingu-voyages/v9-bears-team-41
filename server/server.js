const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const port = 3001;

const router = require('./router.js');

app.use('/', router);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
