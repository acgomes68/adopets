import * as Yup from 'yup';
import Product from '../models/Product';
import Category from '../models/Category';

class ProductController {
    async index(req, res) {
        try {
            const plans = await Product.findAll({
                include: [
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['name'],
                    },
                ],
            });
            return res.json(plans);
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async show(req, res) {
        const { id } = req.params;
        try {
            const plan = await Product.findByPk(id, {
                include: [
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['name'],
                    },
                ],
            });

            if (!plan) {
                return res.status(400).json({ error: 'Product not found' });
            }

            return res.json(plan);
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        try {
            const { id, title, duration, price } = await Product.create(
                req.body
            );

            return res.json({
                id,
                title,
                duration,
                price,
            });
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const schema = Yup.object().shape({
            title: Yup.string(),
            duration: Yup.number(),
            price: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { title } = req.body;

        try {
            const plan = await Product.findByPk(id);

            if (!plan) {
                return res.status(400).json({ error: 'Product not found' });
            }

            if (title !== plan.title) {
                const planExists = await Product.findOne({ where: { title } });

                if (planExists) {
                    return res
                        .status(400)
                        .json({ error: 'Product already exists' });
                }
            }

            const { duration, price } = await plan.update(req.body);

            return res.json({
                id,
                title,
                duration,
                price,
            });
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const plan = await Product.findByPk(id);
            if (!plan) {
                return res.status(400).json({ error: 'Product not found' });
            }
            await plan.destroy();
            return res.json(plan);
        } catch (error) {
            return res.status(502).json({ error });
        }
    }
}

export default new ProductController();
