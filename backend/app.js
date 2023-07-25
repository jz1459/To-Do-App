require('dotenv/config');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const _ = require("lodash");
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// DB Connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
.then ( () => {
        console.group("DB Connected!");
})
.catch ( (err) => {
    console.log(err);
});


const Schemas = require('./models/Schemas.js');
const Item = Schemas.Item;
const List = Schemas.List;

async function getItems() {
    const items = await Item.find({});
    return items;
}

app.get('/', function (req, res) {
    getItems().then(function (foundItems) {
        res.render("list", { listTitle: "Today", newItems: foundItems });
    });
});

app.post("/", function (req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        name: itemName
    });

    async function findList() {
        const foundList = await List.findOne({ name: listName });
        if (foundList) {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        }
    };

    if (listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        findList();
    }
});

app.post("/delete", function (req, res) {
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

app.get('/work', function (req, res) {
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

app.get('/school', function (req, res) {
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

const port = process.env.PORT || 4000;

app.listen(port, function () {
    console.log(`Server started on port ${port}.`);
});