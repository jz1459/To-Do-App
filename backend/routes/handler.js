const express = require('express');
const router = express.Router();
const _ = require("lodash");

const Schemas = require("../models/Schemas");
const Item = Schemas.Item;
const List = Schemas.List;


async function getItems() {
    const items = await Item.find({});
    return items;
}

router.get('/', async (req, res) => {
    getItems().then(function (foundItems) {
        res.send(foundItems);
        // res.send(JSON.stringify(foundItems));
    });

    // const foundItems = await Item.find({}).then({
    //     res.send(foundItems)
    // });

    // const todayList = await Item.find({})((err, todayData) => {
    //     if (err) throw err;
    //     if (todayData) {
    //         // res.json({listTitle: "Today", newItems: todayData})
    //         res.send(JSON.stringify(todayData));
    //     } else {
    //         res.end();
    //     }
    // });
    // getItems().then(function (foundItems) {
    //     res.render("list", { listTitle: "Today", newItems: foundItems });
    // });
});

router.post("/", async (req, res) => {
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        name: itemName
    });

    async function findList() {
        const foundList = await List.findOne({ name: listName }).exec((err, foundData) => {
            if (foundData) {
            foundData.items.push(item);
            foundData.save();
            res.redirect("/" + listName); //use lodash to turn this into lowercase
        }
        });
        
    };

    if (listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        findList();
    }
});

router.post("/delete", function (req, res) {
    const deleteItemId = req.body.checkbox;
    const listName = req.body.listName;

    async function deleteToday() {
        await Item.findByIdAndRemove(deleteItemId);
    };
    async function deleteList() {
        await List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: deleteItemId } } });
    };

    if (listName === "Today") {
        deleteToday();
        res.redirect("/");
    } else {
        deleteList();
        res.redirect("/" + listName);
    }
});

router.get('/work', function (req, res) {
    async function findList() {
        const foundList = await List.findOne({ name: "Work" });
        if (!foundList) {
            const list = new List({
                name: "Work"
            });
            list.save();
            res.redirect("/work");
        } else {
            res.render("list", { listTitle: "Work", newItems: foundList.items });
        }
    };
    findList();
});

router.get('/school', function (req, res) {
    async function findList() {
        const foundList = await List.findOne({ name: "School" });
        if (!foundList) {
            const list = new List({
                name: "School"
            });
            list.save();
            res.redirect("/school");
        } else {
            res.render("list", { listTitle: "School", newItems: foundList.items });
        }
    };
    findList();
});

module.exports = router;