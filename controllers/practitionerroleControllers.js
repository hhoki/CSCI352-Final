const PractitionerRole = require("../models/PractitionerRole");

exports.getAllPractitionerRoles = async (req, res, next) => {
  try {
    const [practitioner_roles, _] = await PractitionerRole.findAll();

    res.status(200).json({ count: practitioner_roles.length, practitioner_roles });
  } catch (error) {
    next(error);
  }
};

exports.createNewPractitionerRole = async (req, res, next) => {
  try {
    let { active, period_start, period_end, code, codedefinition, language, specialty} = req.body;
    let practitioner_role = new PractitionerRole(active, period_start, period_end, code, codedefinition, language, specialty);

    practitioner_role = await practitioner_role.save();

    res.status(201).json({ message: "PractitionerRole created" });
  } catch (error) {
    next(error);
  }
};

exports.getPractitionerRoleById = async (req, res, next) => {
  try {
    let PractitionerRoleId = req.params.id;

    let [practitioner_role, _] = await PractitionerRole.findById(PractitionerRoleId);

    res.status(200).json({ practitioner_role: practitioner_role[0] });
  } catch (error) {
    next(error);
  }
};

exports.updatePractitionerRoleById = async (req, res, next) => {
    try {
      let PractitionerRoleId = req.params.id;
  
      let [practitioner_role, _] = await PractitionerRole.updateById(PractitionerRoleId);
  
      res.status(200).json({ practitioner_role: practitioner_role[0] });
    } catch (error) {
      next(error);
    }
  };

  exports.deletePractitionerRoleById = async (req, res, next) => {
    try {
      let PractitionerRoleId = req.params.id;
  
      let [practitioner_role, _] = await PractitionerRole.deleteById(PractitionerRoleId);
  
      res.status(200).json({ practitioner_role: practitioner_role[0] });
    } catch (error) {
      next(error);
    }
  };