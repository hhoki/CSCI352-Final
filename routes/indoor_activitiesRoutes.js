const express = require("express");
const indoorActivitiesController = require("../controllers/indoor_activitiesControllers");
const router = express.Router();

router.get("/", indoorActivitiesController.getAllIndoorActivities);
router.post("/", indoorActivitiesController.createIndoorActivity);
router.get("/:id", indoorActivitiesController.getIndoorActivityById);
router.patch("/:id", indoorActivitiesController.updateIndoorActivityById);
router.delete("/:id", indoorActivitiesController.deleteIndoorActivityById);

module.exports = router;