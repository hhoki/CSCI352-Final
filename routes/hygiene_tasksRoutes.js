const express = require("express");
const router = express.Router();
const hygieneTaskControllers = require("../controllers/hygiene_tasksControllers");

// Routes for hygiene tasks
router.get("/", hygieneTaskControllers.getAllHygieneTasks);
router.post("/", hygieneTaskControllers.createHygieneTask);
router.get("/:id", hygieneTaskControllers.getHygieneTaskById);
router.patch("/:id", hygieneTaskControllers.updateHygieneTaskById);
router.delete("/:id", hygieneTaskControllers.deleteHygieneTaskById);

module.exports = router;