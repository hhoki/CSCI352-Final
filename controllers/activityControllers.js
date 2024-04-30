const Activity = require("../models/Activity");

exports.getAllActivities = async (req, res, next) => {
  try {
    const activities = await Activity.findAll();
    res.status(200).json({ count: activities.length, activities });
  } catch (error) {
    next(error);
  }
};

exports.createActivity = async (req, res, next) => {
  try {
    const { performedActivity, progress, progress_time, patient_id, hygienetasks, indoor_activities, outdoor_activities } = req.body;
    const activity = new Activity(performedActivity, progress, progress_time, patient_id, hygienetasks, indoor_activities, outdoor_activities);
    await activity.save();
    res.status(201).json({ message: "Activity created" });
  } catch (error) {
    next(error);
  }
};

exports.getActivityById = async (req, res, next) => {
  try {
    const activityId = req.params.id;
    const activity = await Activity.findById(activityId);
    res.status(200).json({ activity });
  } catch (error) {
    next(error);
  }
};

exports.updateActivityById = async (req, res, next) => {
  try {
    const activityId = req.params.id;
    const { performedActivity, progress, progress_time, patient_id, hygienetasks, indoor_activities, outdoor_activities } = req.body;
    const activity = new Activity(performedActivity, progress, progress_time, patient_id, hygienetasks, indoor_activities, outdoor_activities);
    activity.id = activityId;
    await activity.update();
    res.status(200).json({ message: "Activity updated" });
  } catch (error) {
    next(error);
  }
};

exports.deleteActivityById = async (req, res, next) => {
  try {
    const activityId = req.params.id;
    await Activity.deleteById(activityId);
    res.status(200).json({ message: "Activity deleted" });
  } catch (error) {
    next(error);
  }
};