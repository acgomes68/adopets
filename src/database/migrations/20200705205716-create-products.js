module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('products', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            inventory: {
                type: Sequelize.INTEGER,
                allowNull: false,
                default: 0,
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        }),

    down: queryInterface => queryInterface.dropTable('products'),
};
