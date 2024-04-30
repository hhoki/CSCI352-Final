const Indoor_activities = require("../models/IndoorTask");

exports.getAllIndoorActivities = async (req, res, next) => {
  try {
    const indoorActivities = await Indoor_activities.findAll();
    res.status(200).json({ count: indoorActivities.length, indoorActivities });
  } catch (error) {
    next(error);
  }
};

exports.createIndoorActivity = async (req, res, next) => {
  try {
    const {
      cards,
      chess,
      dancing,
      timespentcards,
      timespentchess,
      timespentdancing,
      patient_id
    } = req.body;

    const newIndoorActivity = new Indoor_activities(
      cards,
      chess,
      dancing,
      timespentcards,
      timespentchess,
      timespentdancing,
      patient_id
    );

    const indoorActivityId = await newIndoorActivity.save();

    res.status(201).json({ message: "Indoor activity created", id: indoorActivityId });
  } catch (error) {
    next(error);
  }
};

exports.getIndoorActivityById = async (req, res, next) => {
  try {
    const indoorActivityId = req.params.id;
    const indoorActivity = await Indoor_activities.findById(indoorActivityId);
    res.status(200).json({ indoorActivity });
  } catch (error) {
    next(error);
  }
};

exports.updateIndoorActivityById = async (req, res, next) => {
  try {
    const indoorActivityId = req.params.id;
    const {
      cards,
      chess,
      dancing,
      timespentcards,
      timespentchess,
      timespentdancing,
      patient_id
    } = req.body;

    const isUpdated = await Indoor_activities.updateById(
      indoorActivityId,
      cards,
      chess,
      dancing,
      timespentcards,
      timespentchess,
      timespentdancing,
      patient_id
    );

    if (isUpdated) {
      res.status(200).json({ message: "Indoor activity updated" });
    } else {
      res.status(404).json({ message: "Indoor activity not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteIndoorActivityById = async (req, res, next) => {
  try {
    const indoorActivityId = req.params.id;
    const isDeleted = await Indoor_activities.deleteById(indoorActivityId);
    if (isDeleted) {
      res.status(200).json({ message: "Indoor activity deleted" });
    } else {
      res.status(404).json({ message: "Indoor activity not found" });
    }
  } catch (error) {
    next(error);
  }
};