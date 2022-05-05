const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

//**API/TAG ROUTE ENDPOINT**//

//========GETS ALL TAGS AND SHOWS ASSOCIATED PRODUCTS========//
router.get('/', async (req, res) => {
  try {
    //--I BELIEVE ITS OK TO PUT CATEGROY,TAG ON INCLUDE. MIGHT THROW AN ERR--//
    const tagdata = await Tag.findAll({include: Product});
    res.status(200).json(tagdata)
  } catch (err) {
    res.status(500).json(err);
  }
});

//========GETS TAG BY ID AND SHOWS ALL PRODUCTS ASSOCIATED========//
router.get('/:id', async (req, res) => {
  try {
    const tagdata = await Tag.findByPk(req.params.id, {include: Product});
    res.status(200).json(tagdata)
  } catch (err) {
    res.status(500).json(err);
  }
});

//========POSTS NEW DATA========//
router.post('/', async (req, res) => {
  try {
    const tagdata = await Tag.create(req.body);
    res.status(200).json(tagdata);
  } catch (err) {
    res.status(400).json(err);
  }
});


//========UPDATES A TAG BY ID========//
router.put('/:id', async (req, res) => {
  try{
  const tagdata = await Tag.update({
    tag_name: req.body.tag_name
  },
    {
      where:
      {
        id: req.params.id,
      },
    }
  );
  res.status(200).json(tagdata);
  }catch(err){
    res.status(400).json(err);
  }
});

//========DELETES A CATEGORY========//
router.delete('/:id', async (req, res) => {
  try {
    //--CATEGROYDATA SHOULD COME OUT TO THE DELETED ITEM--//
    const tagdata = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    //--CATCHING INCASE NO ID IS FOUND, ALSO WORK FOR IF NOT DESTROYED--//
    if (!tagdata) {
      res.status(404).json({ message: 'No Matching Tag' });
      return;
    }
    res.status(200).json(tagdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
