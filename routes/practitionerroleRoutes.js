const express = require("express");
const practitionerroleControllers = require("../controllers/practitionerroleControllers");
const router = express.Router();

// @route GET && POST - /practitionerroles/
router
  .route("/")
  .get(practitionerroleControllers.getAllPractitionerRoles)
  .post(practitionerroleControllers.createNewPractitionerRole);

router.route("/delete/:id").delete(practitionerroleControllers.deletePractitionerRoleById);
router.route("/patch/:id").patch(practitionerroleControllers.updatePractitionerRoleById);
router.route("/:id").get(practitionerroleControllers.getPractitionerRoleById);

module.exports = router;