// import Sequelize from 'sequelize';

// import User from '../app/models/User';
// import Product from '../app/models/Product';
// import Category from '../app/models/Category';

// import databaseConfig from '../config/database';

const Sequelize = require('sequelize');
const User = require('../app/models/User');
const Product = require('../app/models/Product');
const Category = require('../app/models/Category');
const databaseConfig = require('../config/database');

const models = [User, Product, Category];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

// export default new Database();

module.exports = new Database();
