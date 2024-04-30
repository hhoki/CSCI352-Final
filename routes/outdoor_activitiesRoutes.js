const express = require("express");
const outdoor_activitiesControllers = require("../controllers/outdoor_activitiesControllers");
const router = express.Router();

// @route GET && POST - /outdoor_activitiess/
router
  .route("/")
  .get(outdoor_activitiesControllers.getAllOutdoorTasks)
  .post(outdoor_activitiesControllers.createNewOutdoorTask);

router.route("/delete/:id").delete(outdoor_activitiesControllers.deleteOutdoorTaskById);
router.route("/patch/:id").patch(outdoor_activitiesControllers.updateOutdoorTaskById);
router.route("/:id").get(outdoor_activitiesControllers.getOutdoorTaskById);

module.exports = router;