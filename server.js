require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const express = require("express");
const app = express();

// Middleware
app.use(express.json()); // parse json bodies in the request object

app.use("/careplan", require("./routes/careplanRoutes"));
app.use("/address", require("./routes/addressRoutes"));
app.use("/activity", require("./routes/activityRoutes"));
app.use("/hygiene_tasks", require("./routes/hygiene_tasksRoutes"));
app.use("/outdoor_activities", require("./routes/outdoor_activitiesRoutes"));
app.use("/indoor_activities", require("./routes/indoor_activitiesRoutes"));
app.use("/patient", require("./routes/patientRoutes"));
app.use("/practitioner", require("./routes/practitionerRoutes"));
app.use("/practitionerrole", require("./routes/practitionerroleRoutes"));


// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went rely wrong",
  });
});

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));