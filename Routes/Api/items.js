const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Item = require('../../Schemas/Item');

//routes for our application
router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    //saves item passed in the database
    newItem.save().then(item => res.json(item));
});

router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});


//function(req, res) == (req, res) => ~~ arrow syntax
module.exports = router;
