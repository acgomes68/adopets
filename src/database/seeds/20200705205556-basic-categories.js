module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'categories',
            [
                {
                    name: 'Peripherics',
                    created_at: new Date(),
                },
                {
                    name: 'Softwares',
                    created_at: new Date(),
                },
                {
                    name: 'Cell Phones',
                    created_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
