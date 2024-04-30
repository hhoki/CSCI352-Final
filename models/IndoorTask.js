const db = require("../config/db");

class Indoor_activities {
  constructor(cards, chess, dancing, timespentcards, timespentchess, timespentdancing, patient_id) {
    this.cards = cards;
    this.chess = chess;
    this.dancing = dancing;
    this.timespentcards = timespentcards;
    this.timespentchess = timespentchess;
    this.timespentdancing = timespentdancing;
    this.patient_id = patient_id;
  }

  async save() {
    try {
      const sql = `
        INSERT INTO indoor_activities(
          cards,
          chess,
          dancing,
          timespentcards,
          timespentchess,
          timespentdancing,
          patient_id
        )
        VALUES(?, ?, ?, ?, ?, ?, ?)
      `;
      const result = await db.execute(sql, [
        this.cards,
        this.chess,
        this.dancing,
        this.timespentcards,
        this.timespentchess,
        this.timespentdancing,
        this.patient_id
      ]);
      return result[0].insertId;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const sql = "SELECT * FROM indoor_activities;";
      const result = await db.execute(sql);
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const sql = `SELECT * FROM indoor_activities WHERE id = ?;`;
      const result = await db.execute(sql, [id]);
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      const sql = `DELETE FROM indoor_activities WHERE id = ?;`;
      const result = await db.execute(sql, [id]);
      return result[0].affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
  
  static async updateById(id, cards, chess, dancing, timespentcards, timespentchess, timespentdancing, patient_id) {
    try {
      const sql = `
        UPDATE indoor_activities 
        SET cards = ?, chess = ?, dancing = ?, timespentcards = ?, timespentchess = ?,
            timespentdancing = ?, patient_id = ?
        WHERE id = ?;
      `;
      const result = await db.execute(sql, [
        cards, 
        chess, 
        dancing, 
        timespentcards, 
        timespentchess, 
        timespentdancing, 
        patient_id, 
        id
      ]);
      return result[0].affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Indoor_activities;