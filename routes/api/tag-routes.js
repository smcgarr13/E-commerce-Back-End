const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// GET all tags, including associated product data
router.get('/', async (req, res) => {
  try {
  // find all tags
  const tagsData = await Tag.findAll({
  // be sure to include its associated Product data
  include: [
    {
      model: Product,
      through: ProductTag,
      as: 'products',
    },
  ],
});
res.status(200).json(tagsData);
} catch (err) {
res.status(500).json(err);
}
});

// GET a single tag by ID, including associated product data
router.get('/:id', async (req, res) => {
  try {
  // find a single tag by its `id`
  const tagData = await Tag.findByPk(req.params.id, {
  // be sure to include its associated Product data
  include: [
    {
      model: Product,
      through: ProductTag,
      as: 'products',
    },
  ],
});
if (!tagData) {
  res.status(404).json({ message: 'No tag found with this id!' });
  return;
}
res.status(200).json(tagData);
} catch (err) {
res.status(500).json(err);
}
});

// POST a new tag
router.post('/', async (req, res) => {
  try {
  // create a new tag
  const tagData = await Tag.create(req.body);
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});

// PUT (update) a tag by ID
router.put('/:id', async (req, res) => {
  try {
  // update a tag's name by its `id` value
  const tagData = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  if (!tagData[0]) {
    res.status(404).json({ message: 'No tag found with this id!' });
    return;
  }
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});

// DELETE a tag by ID
router.delete('/:id', async (req, res) => {
  try {
  // delete on tag by its `id` value
  const tagData = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!tagData) {
    res.status(404).json({ message: 'No tag found with this id!' });
    return;
  }
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
