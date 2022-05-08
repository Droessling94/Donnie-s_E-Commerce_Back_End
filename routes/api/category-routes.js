const router = require('express').Router();
const res = require('express/lib/response');
const { Category, Product, ProductTag } = require('../../models');
const { findCreateFind } = require('../../models/Category');

//**API/CATEGORIES ROUTE ENDPOINT**//


//========GETS ALL CATEGORYS========//
router.get('/', async (req, res) => {
  try {
    const categorydata = await Category.findAll();
    res.status(200).json(categorydata)
  } catch (err) {
    res.status(500).json(err);
  }
});

//========GETS CATEGORY BY ID AND SHOWS ALL PRODUCTS IN CATEGORY========//
router.get('/:id', async (req, res) => {
  try {
    const categorydata = await Category.findByPk(req.params.id, {include: Product,});
    res.status(200).json(categorydata)
  } catch (err) {
    res.status(500).json(err);
  }
});

//========POSTS NEW DATA========//
router.post('/', async (req, res) => {
  try {
    const categorydata = await Category.create(req.body);
    res.status(200).json(categorydata);
  } catch (err) {
    res.status(400).json(err);
  }
});

//========UPDATES A CATEGORY BY ID========//
router.put('/:id', async (req, res) => {
  try{
  const categorydata = await Category.update({
    category_name: req.body.category_name
  },
    {
      where:
      {
        id: req.params.id,
      },
    }
  );
  res.status(200).json(categorydata);
  }catch(err){
    res.status(400).json(err);
  }
});



//========DELETES A CATEGORY========//
router.delete('/:id', async (req, res) => {
  try {
    //--CATEGROYDATA SHOULD COME OUT TO THE DELETED ITEM--//
    const categorydata = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    //--CATCHING INCASE NO ID IS FOUND, ALSO WORK FOR IF NOT DESTROYED--//
    if (!categorydata) {
      res.status(404).json({ message: 'No Matching Category' });
      return;
    }
    res.status(200).json(categorydata);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

