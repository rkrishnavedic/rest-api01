const express = require('express');
const joi = require('joi');
const monk = require('monk');

const mongodbURL = 'mongodb+srv://crudUser:curd123@cluster0.y5rgf.mongodb.net/blogDB?retryWrites=true&w=majority';

const db = monk(mongodbURL);
// console.log(db);

// db.then(()=>{
//     console.log('db connected!');
// }).catch(error=>{
//     console.log(error.message);
// })

const schema = joi.object({
  title: joi.string().trim().required(),
  author: joi.string().trim().required(),
  body: joi.string().trim().required(),
  tags: joi.string().trim(),
});

const faqs = db.get('blogs');
db.then(() => {
  console.log('db connected!');
}).catch((err) => console.log(err));

const router = express.Router();

// read all
router.get('/', async (_req, res) => {
  try {
    const items = await faqs.find({});
    // console.log(items)
    res.json(items);
  } catch (error) {
    res.json(error);
  }
});

// read one
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await faqs.findOne({
      id,
    });

    if (!item) {
      res.json({ id: 'nan' });
    } else {
      res.json(item);
    }
  } catch (error) {
    res.json(error);
  }
});

// create one
router.post('/', async (req, res) => {
  try {
    const value = await schema.validateAsync(req.body);

    const inserted = await faqs.insert(value);
    // console.log(inserted);

    res.json(inserted);
  } catch (error) {
    res.json(error);
  }
});

// update one
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await faqs.findOne({
      id,
    });
    const value = await schema.validateAsync(req.body);
    if (!item) {
      res.json({ id: 'nan' });

      await faqs.update(
        {
          id,
        },
        {
          $set: value,
        }
      );
      // console.log(inserted);

      res.json(value);
    } else {
      res.json({ id: 'nan' });
    }
  } catch (error) {
    res.json(error);
  }
});

// delete one
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await faqs.remove({ id });
    res.json({
      message: 'Success!',
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
