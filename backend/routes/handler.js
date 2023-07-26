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
    res.json(newItem);
});

router.put('/', async (req, res) => {
    const { _id, newText } = req.body;
    const toDoItem = await Item.findByIdAndUpdate(_id, {newText} )
    res.json(toDoItem);
});

router.delete('/', async (req, res) => {
    const { deleteItemId } = req.body;
    const toDoItem = await Item.findByIdAndRemove(deleteItemId);
    res.status(204).json(toDoItem);
});


module.exports = router;