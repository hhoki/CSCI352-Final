const Patient = require("../models/Patient");



exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.findAll(); // Use the findAll method from the Patient model

    res.status(200).json({ count: patients.length, patients });
  } catch (error) {
    next(error);
  }
};

exports.createNewPatient = async (req, res, next) => {
  try {
    const {
      active,
      useType,
      family,
      given,
      prefix,
      suffix,
      gender,
      birthDate,
      maritalStatus,
      language,
      address
    } = req.body;

    // Create a new patient instance
    const patient = new Patient(
      active,
      useType,
      family,
      given,
      prefix,
      suffix,
      gender,
      birthDate,
      maritalStatus,
      language,
      address
    );

    // Save the patient to the database
    await patient.save();

    res.status(201).json({ message: "Patient created" });
  } catch (error) {
    next(error);
  }
};

exports.getPatientById = async (req, res, next) => {
  try {
    const patientId = req.params.id;

    // Find a patient by ID
    const patient = await Patient.findById(patientId);

    res.status(200).json({ patient: patient });
  } catch (error) {
    next(error);
  }
};

exports.updatePatientById = async (req, res, next) => {
  try {
    const patientId = req.params.id;
    const {
      active,
      useType,
      family,
      given,
      prefix,
      suffix,
      gender,
      birthDate,
      maritalStatus,
      language,
      address
    } = req.body;

    // Update the patient by ID
    const patientToUpdate = new Patient(
      active,
      useType,
      family,
      given,
      prefix,
      suffix,
      gender,
      birthDate,
      maritalStatus,
      language,
      address
    );
    
    patientToUpdate.id = patientId; // Set the ID of the patient

    await patientToUpdate.update(); // Update the patient in the database

    res.status(200).json({ message: "Patient updated" });
  } catch (error) {
    next(error);
  }
};

exports.deletePatientById = async (req, res, next) => {
  try {
    const patientId = req.params.id;

    // Delete the patient by ID
    await Patient.deleteById(patientId);

    res.status(200).json({ message: "Patient deleted" });
  } catch (error) {
    next(error);
  }
};