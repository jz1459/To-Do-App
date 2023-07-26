const express = require('express');
const router = express.Router();

const Item = require("../models/Schemas");
// const Item = Schemas.Item;

router.get('/', async (req, res) => {
    // try {
    //     const items = await Item.find({});
    //     res.send(items);
    // } catch (error) {
    //     console.log(error);
    // }
    const items = await Item.find({});
    res.send(items);
});

router.post('/', async (req, res) => {
    const { itemName } = req.body;
    const newToDo = new Item({
        name: itemName
    });

    const newItem = await newToDo.save();
    const items = await Item.find({});
    res.send(items);
    // res.json(newItem);
});

router.put('/', async (req, res) => {
    const { _id, toDoName } = req.body;
    const toDoItem = await Item.findByIdAndUpdate(_id, { name : toDoName } )
    // res.json(toDoItem);
    const items = await Item.find({});
    res.send(items);
});

router.delete('/', async (req, res) => {
    // console.log( req.body );
    const { _id } = req.body;
    // console.log(_id);
    const toDoItem = await Item.findByIdAndRemove(_id);
    // res.status(204).json(toDoItem);
    const items = await Item.find({});
    res.send(items);
});


module.exports = router;