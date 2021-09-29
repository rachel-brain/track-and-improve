const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now()
    },

    exercises: [{
        workoutclass: {
            type: String,
            enum: ["Resistance", "Cardio"],
            required: "Class of Workout is Required"
        },

        workoutname: {
            type: String,
            enum: ["Bicep Curl", "Lateral Pull", "Push Press", "Running", "Bench Press", "Quad Press", "Military Press"],
            required: "Name of Workout is Required"
        },

        duration: {
            type: Number,
            allowNull: false
        },

        weight: {
            type: Number,
            allowNull: false,
            default: 50
        },

        reps: {
            type: Number,
            allowNull: false,
            default: 8
        },

        sets: {
            type: Number,
            allowNull: false,
            default: 4
        },

        distance: {
            type: Number,
            allowNull: false,
            default: 2
        },
    }],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

// Export the Workout model
module.exports = Workout;