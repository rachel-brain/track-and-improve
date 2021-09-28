// Global dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Connect to Port
const PORT = process.env.PORT || 3001;

// Create Express app
const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Set static files to public folder
app.use(express.static("public"));

// Connect to Mongoose
const uri = process.env.MONGODB_URI

let db = mongoose.connect(uri || "mongodb://localhost/workoutdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongoose connection established successfully")
});

// Set routes
const Workout = require("./models/workoutModels.js");
const router = require("./routes/api.js");

app.use(router);
require("./routes/html.js")(app);

app.post("/submit", ({
    body
}, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

module.exports = db;