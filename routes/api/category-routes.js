const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.use('/api/categories', (req, res) => {
  console.log('Categories path used');
});

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll( {
      include: { model: Product }
    });
    if (!categories) {
      res.status(404).json({message: "No categories found! Try seeding the database."});
      return;
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const requestedCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!requestedCategory) {
      res.status(404).json({message: 'No category with this id exists, please try again.'});
    }
    res.status(200).json(requestedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    if (!req.body) {
      res.status(400).json({message: 'Please provide information to create the new category.'})
      return
    }
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(
      req.body, {
        where: {
        id: req.params.id
      }
    }
    );
    if (!req.body) {
      res.status(400).json({message: 'Please provide an id for the category you wish to update.'})
      return
    }
    res.status(200).json(updatedCategory)
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!req.body) {
      res.status(400).json({message: 'Please provide an id for the category you wish to delete.'});
    }
    res.status(200).json(deletedCategory)
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
