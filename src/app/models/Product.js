// import Sequelize, { Model } from 'sequelize';

const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                description: Sequelize.STRING,
                price: Sequelize.FLOAT,
                inventory: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'category',
        });
    }
}

// export default Product;
module.exports = Product;
