const OutdoorTask = require("../models/OutdoorTask");

exports.getAllOutdoorTasks = async (req, res, next) => {
  try {
    const [outdoor_tasks, _] = await OutdoorTask.findAll();

    res.status(200).json({ count: outdoor_tasks.length, outdoor_tasks });
  } catch (error) {
    next(error);
  }
};

exports.createNewOutdoorTask = async (req, res, next) => {
  try {
    let {gardening, walking, bird_watching, timespentgardening, timespentwalking, timespentbird_watching, patient_id} = req.body;
    let outdoor_task = new OutdoorTask(gardening, walking, bird_watching, timespentgardening, timespentwalking, timespentbird_watching, patient_id);

    outdoor_task = await outdoor_task.save();

    res.status(201).json({ message: "OutdoorTask created" });
  } catch (error) {
    next(error);
  }
};

exports.getOutdoorTaskById = async (req, res, next) => {
  try {
    let OutdoorTaskId = req.params.id;

    let [outdoor_task, _] = await OutdoorTask.findById(OutdoorTaskId);

    res.status(200).json({ outdoor_task: outdoor_task[0] });
  } catch (error) {
    next(error);
  }
};

exports.updateOutdoorTaskById = async (req, res, next) => {
    try {
      let OutdoorTaskId = req.params.id;
  
      let [outdoor_task, _] = await OutdoorTask.updateById(OutdoorTaskId);
  
      res.status(200).json({ outdoor_task: outdoor_task[0] });
    } catch (error) {
      next(error);
    }
  };

  exports.deleteOutdoorTaskById = async (req, res, next) => {
    try {
      let OutdoorTaskId = req.params.id;
  
      let [outdoor_task, _] = await OutdoorTask.deleteById(OutdoorTaskId);
  
      res.status(200).json({ outdoor_task: outdoor_task[0] });
    } catch (error) {
      next(error);
    }
  };