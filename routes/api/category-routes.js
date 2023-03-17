const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
  // find all categories
  const categories = await Category.findAll({
  // be sure to include its associated Products
  include: [{ model: Product }]
  });
res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category = await Category.findByPk(req.params.id, {
    include: [{ model: Product }]
  });

  if (!category) {
    res.status(404).json({ message: 'No category found with this id!' });
    return;
  }

  res.json(category);
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  try {
  const { category_name } = req.body;

  if (!category_name) {
    res.status(400).json({ message: 'Category name cannot be null!' });
    return;
  }

  const category = await Category.create({
    category_name // shorthand syntax for category_name: category_name
  });

    res.status(201).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
  // update a category by its `id` value
  const category = await Category.findByPk(req.params.id);

  if (!category) {
    res.status(404).json({ message: 'No category found with this id!' });
    return;
    }

    await category.update(req.body);
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
  // delete a category by its `id` value
  const category = await Category.findByPk(req.params.id);

    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    await category.destroy();
    res.json({ message: 'Category deleted successfully!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
