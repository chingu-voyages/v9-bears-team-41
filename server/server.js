const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({extended: 'false'}));
app.use(bodyParser.json());
app.use(cors());

const port = 3001;

const fileRoute = require('./file-route.js');

app.use('/file', fileRoute);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
