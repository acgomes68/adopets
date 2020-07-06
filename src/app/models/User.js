// import Sequelize, { Model } from 'sequelize';
// import bcrypt from 'bcryptjs';

const Sequelize = require('sequelize');
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );

        this.addHook('beforeSave', async user => {
            user.password_hash = user.password
                ? await bcrypt.hash(user.password, 8)
                : '';
        });

        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

// export default User;
module.exports = User;
