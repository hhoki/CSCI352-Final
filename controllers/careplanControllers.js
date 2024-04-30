const Careplan = require("../models/Careplan");

exports.getAllCareplans = async (req, res, next) => {
  try {
    const careplans = await Careplan.findAll();
    res.status(200).json({ count: careplans.length, careplans });
  } catch (error) {
    next(error);
  }
};

exports.createCareplan = async (req, res, next) => {
  try {
    const { status, intent, title, description, period_start, period_end, created_date, subject_id, activity_id } = req.body;
    const careplan = new Careplan(status, intent, title, description, period_start, period_end, created_date, subject_id, activity_id);
    await careplan.save();
    res.status(201).json({ message: "Careplan created" });
  } catch (error) {
    next(error);
  }
};

exports.getCareplanById = async (req, res, next) => {
  try {
    const careplanId = req.params.id;
    const careplan = await Careplan.findById(careplanId);
    res.status(200).json({ careplan });
  } catch (error) {
    next(error);
  }
};

exports.updateCareplanById = async (req, res, next) => {
  try {
    const careplanId = req.params.id;
    const { status, intent, title, description, period_start, period_end, created_date, subject_id, activity_id } = req.body;
    await Careplan.updateById(careplanId, status, intent, title, description, period_start, period_end, created_date, subject_id, activity_id);
    res.status(200).json({ message: "Careplan updated" });
  } catch (error) {
    next(error);
  }
};

exports.deleteCareplanById = async (req, res, next) => {
  const careplanId = req.params.id;

  try {
    // Check if the careplan exists
    const [careplan] = await Careplan.findById(careplanId);
    if (!careplan) {
      return res.status(404).json({ message: "Careplan not found" });
    }

    // Proceed with deletion (cascading delete will handle dependent records)
    await Careplan.deleteById(careplanId);
    res.status(200).json({ message: "Careplan deleted" });
  } catch (error) {
    next(error);
  }
};