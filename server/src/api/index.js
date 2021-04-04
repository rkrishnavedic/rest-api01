const express = require('express');

const emojis = require('./emojis');
const faqs = require('./faqs.js');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('get request!');
  res.json({
    message: 'API - says Namaste!'
  });
});

router.use('/emojis', emojis);
router.use('/faqs', faqs);

module.exports = router;
