const router = require("express").Router();
const Workoutschema = require("../models/workoutschema.js");
const mongodb = require("mongodb");

router.get("/api/workouts", (req, res) => {
	Workoutschema.aggregate([
		{
			$addFields: {
				totalDuration: { $sum: "$exercises.duration" }
			}
		},
		{
			$sort: { "day": 1 }
		}
	])
		.then(dbWorkout => {
			console.log(dbWorkout);
			res.json(dbWorkout);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});
router.get("/api/workouts/range", (req, res) => {
	Workoutschema.aggregate([
		{
			$addFields: {
				totalDuration: { $sum: "$exercises.duration" }
			}
		},
		{
			$sort: { "day": -1 }
		},
		{
			$limit: 7
		}
	])
		.then(dbWorkout => {
			console.log(dbWorkout);
			res.json(dbWorkout);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.put("/api/workouts/:id", (req, res) => {
	Workoutschema.updateOne(
		{
			_id: mongodb.ObjectId(req.params.id)
		},
		{
			$push: { $exercises: req.body }
		}
	)
		.then(dbWorkout => {
			console.log(dbWorkout);
			res.json(dbWorkout);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.post("/api/workouts", (req, res) => {
	Workoutschema.create(req.body)
		.then(dbWorkout => {
			console.log(dbWorkout);
			res.json(dbWorkout);
		})
		.catch(err => {
			res.status(400).json(err);
		});
})




module.exports = router;