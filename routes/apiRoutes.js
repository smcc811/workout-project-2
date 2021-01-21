const express = require("express");
//const { model } = require("mongoose");
const router = require("express").Router();
const Workout = require("../models/workouts");
// post api/workouts
router.post("/api/workout", (req, res) => {
  Workout.create({})
    .then((foundWorkout) => {
      res.json(foundWorkout);
      console.log("working");
      console.log(foundWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Put
router.put("/api/workout/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then((foundWorkout) => {
      res.json(foundWorkout);
      console.log(foundWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
// router.get("/api/workouts/:id", (req, res) => {
//   Workout.find().then((foundWorkout) => {
//     res.json(foundWorkout);
//     console.log(foundWorkout);
//     console.log("made it to the get api I am testing");
//   });
// });

router.get("/api/workout", (req, res) => {
  Workout.aggregate([
    { $addFields: { totalDuration: { $sum: "$exercises.duration" } } },
  ]).then((foundWorkout) => {
    res.json(foundWorkout);
    console.log(foundWorkout);
  });
});

router.get("/api/workout/range", (req, res) => {
  console.log("made it to api range");
  Workout.aggregate([
    { $addFields: { totalDuration: { $sum: "$exercises.duration" } } },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((foundWorkout) => {
      res.json(foundWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//POST
// router.post("/api/workouts", (req, res) => {
//   console.log("working-2");
// });

module.exports = router;
