const HygieneTask = require("../models/HygieneTask");

exports.getAllHygieneTasks = async (req, res, next) => {
  try {
    const hygieneTasks = await HygieneTask.findAll();
    res.status(200).json({ count: hygieneTasks.length, hygieneTasks });
  } catch (error) {
    next(error);
  }
};

exports.createHygieneTask = async (req, res, next) => {
  try {
    const { bathing, bathing_time, dental, dental_time, hair, hair_time, nail, nail_time, patient_id } = req.body;
    const hygieneTask = new HygieneTask(bathing, bathing_time, dental, dental_time, hair, hair_time, nail, nail_time, patient_id);
    const newHygieneTaskId = await hygieneTask.save();
    res.status(201).json({ message: "Hygiene task created", id: newHygieneTaskId });
  } catch (error) {
    next(error);
  }
};

exports.getHygieneTaskById = async (req, res, next) => {
  try {
    const hygieneTaskId = req.params.id;
    const hygieneTask = await HygieneTask.findById(hygieneTaskId);
    res.status(200).json({ hygieneTask });
  } catch (error) {
    next(error);
  }
};

exports.updateHygieneTaskById = async (req, res, next) => {
  try {
    const hygieneTaskId = req.params.id;
    const { bathing, bathing_time, dental, dental_time, hair, hair_time, nail, nail_time, patient_id } = req.body;
    const updated = await HygieneTask.updateById(hygieneTaskId, bathing, bathing_time, dental, dental_time, hair, hair_time, nail, nail_time, patient_id);
    if (updated) {
      res.status(200).json({ message: "Hygiene task updated" });
    } else {
      res.status(404).json({ message: "Hygiene task not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteHygieneTaskById = async (req, res, next) => {
  try {
    const hygieneTaskId = req.params.id;
    const deleted = await HygieneTask.deleteById(hygieneTaskId);
    if (deleted) {
      res.status(200).json({ message: "Hygiene task deleted" });
    } else {
      res.status(404).json({ message: "Hygiene task not found" });
    }
  } catch (error) {
    next(error);
  }
};