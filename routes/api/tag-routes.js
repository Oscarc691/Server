const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.use('/api/tags', (req, res) => {
  console.log('Tags path used');
});

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{model: Product}]
    });
    if (!tags) {
      res.status(404).json({message: 'No tags found! try seeding the database.'})
      return
    }
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const requestedTag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!requestedTag) {
      res.status(404).json('No tag with this id found! Please try again.')
      return
    }
    res.status(200).json(requestedTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    if (!newTag) {
      res.status(400).json({message: 'Please provide an id and name for the tag you wish to create.'})
      return
    }
    res.status(200).json(newTag)
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updatedTag) {
      res.status(400).json({message: 'Please provide an id and updated name for the tag you wish you update.'})
      return
    }
    res.status(200).json(updatedTag)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedTag) {
      res.status(400).json({message: 'Please provide an id for the tag you wish to delete.'})
      return
    }
    res.status(200).json(deletedTag)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
