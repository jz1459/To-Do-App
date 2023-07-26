const express = require('express');
const router = express.Router();

const Item = require("../models/Schemas");

router.get('/', async (req, res) => {
    const items = await Item.find({});
    res.send(items);
});

router.post('/', async (req, res) => {
    const { itemName } = req.body;
    const newToDo = new Item({
        name: itemName
    });

    await newToDo.save();
    const items = await Item.find({});
    res.send(items);
});

router.put('/', async (req, res) => {
    const { _id, toDoName } = req.body;
    await Item.findByIdAndUpdate(_id, { name : toDoName } )
    const items = await Item.find({});
    res.send(items);
});

router.delete('/', async (req, res) => {
    const { _id } = req.body;
    await Item.findByIdAndRemove(_id);
    const items = await Item.find({});
    res.send(items);
});


module.exports = router;