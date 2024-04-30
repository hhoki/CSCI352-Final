const db = require("../config/db");

class HygieneTask {
  constructor(bathing, bathing_time, dental, dental_time, hair, hair_time, nail, nail_time, patient_id) {
    this.bathing = bathing;
    this.bathing_time = bathing_time;
    this.dental = dental;
    this.dental_time = dental_time;
    this.hair = hair;
    this.hair_time = hair_time;
    this.nail = nail;
    this.nail_time = nail_time;
    this.patient_id = patient_id;
  }

  async save() {
    try {
      const sql = `
        INSERT INTO hygiene_tasks (
          bathing,
          bathing_time,
          dental,
          dental_time,
          hair,
          hair_time,
          nail,
          nail_time,
          patient_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const [result] = await db.execute(sql, [
        this.bathing,
        this.bathing_time,
        this.dental,
        this.dental_time,
        this.hair,
        this.hair_time,
        this.nail,
        this.nail_time,
        this.patient_id
      ]);
      return result.insertId; // Return the ID of the inserted record
    } catch (error) {
      console.error("Error saving hygiene task:", error);
      throw error;
    }
  }

  static async findAll() {
    try {
      const sql = "SELECT * FROM hygiene_tasks";
      const [rows] = await db.execute(sql);
      return rows;
    } catch (error) {
      console.error("Error fetching all hygiene tasks:", error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const sql = "SELECT * FROM hygiene_tasks WHERE id = ?";
      const [rows] = await db.execute(sql, [id]);
      return rows;
    } catch (error) {
      console.error(`Error fetching hygiene task with ID ${id}:`, error);
      throw error;
    }
  }

  static async updateById(id, bathing, bathing_time, dental, dental_time, hair, hair_time, nail, nail_time, patient_id) {
    try {
      const sql = `
        UPDATE hygiene_tasks
        SET 
          bathing = ?, 
          bathing_time = ?, 
          dental = ?, 
          dental_time = ?, 
          hair = ?, 
          hair_time = ?, 
          nail = ?, 
          nail_time = ?, 
          patient_id = ?
        WHERE id = ?
      `;
      const [result] = await db.execute(sql, [
        bathing,
        bathing_time,
        dental,
        dental_time,
        hair,
        hair_time,
        nail,
        nail_time,
        patient_id,
        id
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error updating hygiene task with ID ${id}:`, error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      const sql = "DELETE FROM hygiene_tasks WHERE id = ?";
      const [result] = await db.execute(sql, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error deleting hygiene task with ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = HygieneTask;