import * as Yup from 'yup';
import Category from '../models/Category';

class CategoryController {
    async index(req, res) {
        try {
            const students = await Category.findAll();
            return res.json(students);
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async show(req, res) {
        const { id } = req.params;
        try {
            const student = await Category.findByPk(id);
            if (!student) {
                return res.status(400).json({ error: 'Category not found' });
            }
            return res.json(student);
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.number().required(),
            weight: Yup.number().required(),
            height: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        try {
            const studentExists = await Category.findOne({
                where: { email: req.body.email },
            });

            if (studentExists) {
                return res
                    .status(400)
                    .json({ error: 'Category already exists' });
            }

            const {
                id,
                name,
                email,
                age,
                weight,
                height,
            } = await Category.create(req.body);

            return res.json({
                id,
                name,
                email,
                age,
                weight,
                height,
            });
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            age: Yup.number(),
            weight: Yup.number(),
            height: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { email } = req.body;

        try {
            const student = await Category.findByPk(id);

            if (!student) {
                return res.status(400).json({ error: 'Category not found' });
            }

            if (email !== student.email) {
                const studentExists = await Category.findOne({
                    where: { email },
                });

                if (studentExists) {
                    return res
                        .status(400)
                        .json({ error: 'Category already exists' });
                }
            }

            const { name, age, weight, height } = await student.update(
                req.body
            );

            return res.json({
                id,
                name,
                email,
                age,
                weight,
                height,
            });
        } catch (error) {
            return res.status(502).json({ error });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const student = await Category.findByPk(id);
            if (!student) {
                return res.status(400).json({ error: 'Category not found' });
            }
            await student.destroy();
            return res.json(student);
        } catch (error) {
            return res.status(502).json({ error });
        }
    }
}

export default new CategoryController();