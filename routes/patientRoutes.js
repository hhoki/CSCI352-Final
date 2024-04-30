const express = require("express");
const patientControllers = require("../controllers/patientControllers");
const router = express.Router();

// Route for getting all patients and creating a new patient
router.route("/")
    .get(patientControllers.getAllPatients)
    .post(patientControllers.createNewPatient);

// Route for deleting a patient by ID
router.delete("/:id", patientControllers.deletePatientById);

// Route for updating a patient by ID
router.patch("/:id", patientControllers.updatePatientById);

// Route for getting a patient by ID
router.get("/:id", patientControllers.getPatientById);



module.exports = router;