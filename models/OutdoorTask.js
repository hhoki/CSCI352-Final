const db = require("../config/db");

class Outdoor_activities {
  constructor(gardening, walking, bird_watching, timespentgardening, timespentwalking, timespentbird_watching, patient_id) {
    this.gardening = gardening;
    this.walking = walking;
    this.bird_watching = bird_watching;
    this.timespentgardening = timespentgardening;
    this.timespentwalking = timespentwalking;
    this.timespentbird_watching = timespentbird_watching;
    this.patient_id = patient_id;
  }

  save() {
    let sql = `
    INSERT INTO outdoor_activities(
      gardening,
      walking,
      bird_watching,
      timespentgardening,
      timespentwalking,
      timespentbird_watching,
      patient_id
    )
    VALUES(
      '${this.gardening}',
      '${this.walking}',
      '${this.bird_watching}',
      '${this.timespentgardening}',
      '${this.timespentwalking}',
      '${this.timespentbird_watching}',
      '${this.patient_id}'
    )
    `;

    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM outdoor_activities;";

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM outdoor_activities WHERE id = ${id};`;

    return db.execute(sql);
  }

  static deleteById(id) {
    let sql = `DELETE FROM outdoor_activities WHERE id = ${id};`;

    return db.execute(sql);
  }
  
  static updateById(id, gardening, walking, bird_watching, timespentgardening, timespentwalking, timespentbird_watching, patient_id) {
    let sql = `UPDATE outdoor_activities SET gardening = ${gardening}, walking = ${walking}, bird_watching = ${bird_watching}, timespentgardening = ${timespentgardening}, timespentwalking = ${timespentwalking},
              timespentbird_watching = ${timespentbird_watching}, patient_id = ${patient_id} WHERE id = ${id};`;

    return db.execute(sql);
  }
}

module.exports = Outdoor_activities;