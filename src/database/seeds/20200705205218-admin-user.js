const bcrypt = require('bcryptjs');

module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'users',
            [
                {
                    name: 'Administrator',
                    email: 'admin@adopets.com',
                    password_hash: bcrypt.hashSync('123456', 8),
                    created_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
