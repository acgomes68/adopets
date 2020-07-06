// import * as Yup from 'yup';
// import Category from '../models/Category';

const Yup = require('yup');
const Category = require('../models/Category');

class CategoryController {
    async index(req, res) {
        try {
            const categories = await Category.findAll();
            return res.json(categories);
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async show(req, res) {
        const { id } = req.params;
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(400).json({ error: 'Category not found' });
            }
            return res.json(category);
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        try {
            const hasItem = await Category.findOne({
                where: { name: req.body.name },
            });

            if (hasItem) {
                return res
                    .status(400)
                    .json({ error: 'Category already exists' });
            }

            const { id, name } = await Category.create(req.body);

            return res.json({
                id,
                name,
            });
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const strName = req.body.name;

        try {
            const category = await Category.findByPk(id);

            if (!category) {
                return res.status(400).json({ error: 'Category not found' });
            }

            if (strName !== category.name) {
                const hasItem = await Category.findOne({
                    where: { strName },
                });

                if (hasItem) {
                    return res
                        .status(400)
                        .json({ error: 'Category already exists' });
                }
            }

            const { name } = await category.update(req.body);

            return res.json({
                id,
                name,
            });
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(400).json({ error: 'Category not found' });
            }
            await category.destroy();
            return res.json(category);
        } catch (error) {
            return res.status(502).json({ error });
        }
    }
}

// export default new CategoryController();

module.exports = new CategoryController();
