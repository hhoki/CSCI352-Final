const Practitioner = require("../models/Practitioner");

exports.getAllPractitioners = async (req, res, next) => {
  try {
    const [practitioners, _] = await Practitioner.findAll();

    res.status(200).json({ count: practitioners.length, practitioners });
  } catch (error) {
    next(error);
  }
};

exports.createNewPractitioner = async (req, res, next) => {
  try {
    let {active, useType, family, given, prefix, suffix, gender, birthDate, language, address_id} = req.body;
    let practitioner = new Practitioner(active, useType, family, given, prefix, suffix, gender, birthDate, language, address_id);

    practitioner = await practitioner.save();

    res.status(201).json({ message: "Practitioner created" });
  } catch (error) {
    next(error);
  }
};

exports.getPractitionerById = async (req, res, next) => {
  try {
    let PractitionerId = req.params.id;

    let [practitioner, _] = await Practitioner.findById(PractitionerId);

    res.status(200).json({ practitioner: practitioner[0] });
  } catch (error) {
    next(error);
  }
};

exports.updatePractitionerById = async (req, res, next) => {
    try {
      let PractitionerId = req.params.id;
  
      let [practitioner, _] = await Practitioner.updateById(PractitionerId);
  
      res.status(200).json({ practitioner: practitioner[0] });
    } catch (error) {
      next(error);
    }
  };

  exports.deletePractitionerById = async (req, res, next) => {
    try {
      let PractitionerId = req.params.id;
  
      let [practitioner, _] = await Practitioner.deleteById(PractitionerId);
  
      res.status(200).json({ practitioner: practitioner[0] });
    } catch (error) {
      next(error);
    }
  };