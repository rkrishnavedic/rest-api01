const express = require('express');
const Joi = require('joi');
const monk = require('monk');

const mongodbURL = "mongodb+srv://crudUser:curd123@cluster0.y5rgf.mongodb.net/blogDB?retryWrites=true&w=majority";

const db = monk(mongodbURL);
console.log(db);

// db.then(()=>{
//     console.log('db connected!');
// }).catch(error=>{
//     console.log(error.message);
// })

const schema = Joi.object({
    title: Joi.string().trim().required(),
    author: Joi.string().trim().required(),
    body:Joi.string().trim().required(),
    tags:Joi.string().trim(),
})

const faqs = db.get('blogs');


const router = express.Router();


// read all 
router.get('/', async (req, res)=>{

    console.log('get request...')

    try {

        const items = await faqs.find({});
        //console.log(items)
        res.json(items);
        
    } catch (error) {
        next(error);
    }

})

// read one
router.get('/:id', (req, res)=>{
    res.json({
        message: 'read one',
    })
})

// create one
router.post('/', async (req, res)=>{
    try {

        console.log(req.body);
        const value = await schema.validateAsync(req.body);

        const inserted = await faqs.insert(value);
        //console.log(inserted);

        res.json(inserted);
        
    } catch (error) {
        next(error)
    }
})

// update one
router.put('/:id', (req, res)=>{
    res.json({
        message: 'update one',
    })
})

// delete one
router.delete('/:id', (req, res)=>{
    res.json({
        message: 'delete one',
    })
})

module.exports = router;