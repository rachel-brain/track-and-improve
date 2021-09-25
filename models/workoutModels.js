const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    dateCreated: {
        type: Date,
        default: Date.now
    },

    exercises: [{
        workoutclass: {
            type: String,
            trim: true,
            required: "Class of Workout is Required"
        },

        workoutname: {
            type: String,
            trim: true,
            required: "Name of Workout is Required"
        },

        duration: {
            type: Number,
            allowNull: false
        },

        weight: {
            type: Number,
            allowNull: false
        },

        reps: {
            type: Number,
            allowNull: false
        },

        sets: {
            type: Number,
            allowNull: false
        },

        distance: {
            type: Number,
            allowNull: false
        },
    }],

    lastUpdated: Date,
});

// setWorkoutFullname: sets the current workout's `workoutFullname` property to the `workoutname` appended to the `workoutclass`
WorkoutSchema.methods.setWorkoutFullname = function () {
    this.workoutFullname = `${this.workoutclass} : ${this.workoutname}`;
    return this.workoutFullname;
};

// lastUpdatedDate: sets the current Workout's `lastUpdated` property to Date.now()
WorkoutSchema.methods.lastUpdatedDate = function () {
    this.lastUpdated = Date.now();
    return this.lastUpdated;
};

const Workout = mongoose.model("Workout", WorkoutSchema);

// Export the Workout model
module.exports = Workout;