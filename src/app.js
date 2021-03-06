// import express from 'express';
// import Youch from 'youch';
// import 'express-async-errors';

// import routes from './routes';

// import './database';

const express = require('express');
const Youch = require('youch');
const routes = require('./routes');

require('express-async-errors');
require('./database');

require('dotenv').config({
    path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }

    exceptionHandler() {
        this.server.use(async (err, req, res, next) => {
            const { NODE_ENV } = process.env;
            if (NODE_ENV === 'development') {
                const errors = await new Youch(err, req).toJSON();
                return res.status(500).json(errors);
            }
            return res.status(500).json({ error: 'Internal server error' });
        });
    }
}

// export default new App().server;
module.exports = new App().server;
