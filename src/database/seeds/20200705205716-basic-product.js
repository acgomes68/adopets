module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'products',
            [
                {
                    name: 'Mouse',
                    price: 3.9,
                    inventory: 10,
                    category_id: 1,
                    created_at: new Date(),
                },
                {
                    name: 'Keyboard',
                    price: 4.35,
                    inventory: 7,
                    category_id: 1,
                    created_at: new Date(),
                },
                {
                    name: 'Monitor',
                    price: 12.53,
                    inventory: 3,
                    category_id: 1,
                    created_at: new Date(),
                },
                {
                    name: 'MS Windows 10 Professional',
                    price: 1.27,
                    inventory: 22,
                    category_id: 2,
                    created_at: new Date(),
                },
                {
                    name: 'MS Office 2010',
                    price: 6.19,
                    inventory: 17,
                    category_id: 2,
                    created_at: new Date(),
                },
                {
                    name: 'Apple iPhone XS Max',
                    price: 479.46,
                    inventory: 4,
                    category_id: 3,
                    created_at: new Date(),
                },
                {
                    name: 'Samsung S10 Plus',
                    price: 312.75,
                    inventory: 8,
                    category_id: 3,
                    created_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
