const express = require("express");
const practitionerControllers = require("../controllers/practitionerControllers");
const router = express.Router();

// @route GET && POST - /practitioner/
router
  .route("/")
  .get(practitionerControllers.getAllPractitioners)
  .post(practitionerControllers.createNewPractitioner);

router.route("/delete/:id").delete(practitionerControllers.deletePractitionerById);
router.route("/patch/:id").patch(practitionerControllers.updatePractitionerById);
router.route("/:id").get(practitionerControllers.getPractitionerById);

module.exports = router;