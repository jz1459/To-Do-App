require('dotenv/config');
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routesHandler = require("./routes/handler")
app.use('/', routesHandler);

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