const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
  try {
    // find all products
    const products = await Product.findAll({
      // include its associated Category and Tag data
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
        {
          model: Tag,
          attributes: ["id", "tag_name"],
          through: ProductTag,
          as: "tags",
        },
      ],
    });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one product
router.get("/:id", async (req, res) => {
  try {
    // find a single product by its `id`
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      // include its associated Category and Tag data
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
        {
          model: Tag,
          attributes: ["id", "tag_name"],
          through: ProductTag,
          as: "tags",
        },
      ],
    });
    if (!product) {
      res.status(404).json({ message: "No product found with this id" });
      return;
    }
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {

  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});


// delete product
router.delete('/:id', async (req, res) => {
  try {
    // find the product to be deleted
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    // delete the product
    await Product.destroy({ where: { id: req.params.id } });

    res.json({ message: 'Product successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;


