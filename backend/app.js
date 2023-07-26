require('dotenv/config');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routesHandler = require("./routes/handler")
app.use('/', routesHandler);
// const Item = require("./models/Schemas");

// app.get('/', async (req, res) => {
//     // try {
//     //     const items = await Item.find({});
//     //     res.send(items);
//     // } catch (error) {
//     //     console.log(error);
//     // }
//     const items = await Item.find({});
//     res.send(items);
// });

// app.delete('/', async (req, res) => {
//     // console.log( req.body );
//     const { _id } = req.body;
//     console.log(_id);
//     const toDoItem = await Item.findByIdAndRemove(_id);
//     // res.status(204).json(toDoItem);
//     const items = await Item.find({});
//     res.send(items);
// });
// app.delete('/',  function(req, res) {
//     // console.log( req.body );
//     const { _id } = req.body;

//     console.log('id ---> ', _id);

//     Item
//         .findByIdAndDelete(_id)
//         .then(() => res.set(201).send("Deleted Successfully..."))
//         .catch((err) => console.log(err));
  
//     // const items = await Item.find({});
//     // res.send(items);
// });

// DB Connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
.then ( () => {
        console.group("DB Connected!");
})
.catch ( (err) => {
    console.log(err);
});

const port = process.env.PORT || 4000;

app.listen(port, function () {
    console.log(`Server started on port ${port}.`);
});