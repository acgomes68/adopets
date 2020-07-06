const app = require('./app');

require('dotenv').config({
    path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const { APP_HOST, APP_PORT } = process.env;

app.listen(APP_PORT, APP_HOST);
