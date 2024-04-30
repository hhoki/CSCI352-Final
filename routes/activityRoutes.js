const express = require("express");
const activityControllers = require("../controllers/activityControllers");
const router = express.Router();

router
  .route("/")
  .get(activityControllers.getAllActivities)
  .post(activityControllers.createActivity);

router
  .route("/:id")
  .get(activityControllers.getActivityById)
  .patch(activityControllers.updateActivityById)
  .delete(activityControllers.deleteActivityById);

module.exports = router;