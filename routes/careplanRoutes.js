const express = require("express");
const careplanControllers = require("../controllers/careplanControllers");
const router = express.Router();

router.get("/", careplanControllers.getAllCareplans);
router.post("/", careplanControllers.createCareplan);
router.get("/:id", careplanControllers.getCareplanById);
router.patch("/:id", careplanControllers.updateCareplanById);
router.delete("/:id", careplanControllers.deleteCareplanById);

module.exports = router;