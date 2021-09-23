// REWORK THIS STARTER CODE ...  NEXT STEPS CONNECT TO EXPRESS
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const Workout = require("./workoutModel.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static("public"));

// Connecting mongo db (or through ATLAS?)
const uri = process.env.MONGODB_URI

mongoose.connect(uri || "mongodb://localhost/workoutdb", {
    useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("mongoose connection established successfully")
});

// ADD MORE CONNECTIONS HERE!!!
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