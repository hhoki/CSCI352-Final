const db = require("../config/db");

class Activity {
  constructor(performedActivity, progress, progress_time, patient_id, hygienetasks, indoor_activities, outdoor_activities) {
    this.performedActivity = performedActivity;
    this.progress = progress;
    this.progress_time = progress_time;
    this.patient_id = patient_id;
    this.hygienetasks = hygienetasks;
    this.indoor_activities = indoor_activities;
    this.outdoor_activities = outdoor_activities;
  }

  async save() {
    try {
      const sql = `
        INSERT INTO activity(
          performedActivity,
          progress,
          progress_time,
          patient_id,
          hygienetasks,
          indoor_activities,
          outdoor_activities
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [this.performedActivity, this.progress, this.progress_time, this.patient_id, this.hygienetasks, this.indoor_activities, this.outdoor_activities];
      
      const [result] = await db.execute(sql, values);
      return result.insertId;
    } catch (error) {
      throw new Error(`Error saving activity: ${error.message}`);
    }
  }

  static async findAll() {
    try {
      const sql = "SELECT * FROM activity";
      const [rows] = await db.execute(sql);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching all activities: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const sql = "SELECT * FROM activity WHERE id = ?";
      const [rows] = await db.execute(sql, [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error fetching activity by id: ${error.message}`);
    }
  }

  async update() {
    try {
      const sql = `
        UPDATE activity
        SET performedActivity = ?,
            progress = ?,
            progress_time = ?,
            patient_id = ?,
            hygienetasks = ?,
            indoor_activities = ?,
            outdoor_activities = ?
        WHERE id = ?
      `;
      const values = [this.performedActivity, this.progress, this.progress_time, this.patient_id, this.hygienetasks, this.indoor_activities, this.outdoor_activities, this.id];
      
      await db.execute(sql, values);
    } catch (error) {
      throw new Error(`Error updating activity: ${error.message}`);
    }
  }

  static async deleteById(id) {
    const tableName = 'activity';
    const careplanTableName = 'careplan';
    try {
      // Delete the row
      const deleteQuery = `DELETE FROM ${tableName} WHERE id = ?`;
      const deleteCareplanQuery = `DELETE FROM ${careplanTableName} WHERE activity = ?`;

      await db.execute(deleteCareplanQuery, [id]);
      await db.execute(deleteQuery, [id]);

      // Re-index the table
      await this.reindexTable();

      console.log(`Deleted row with ID ${id} from ${tableName} table`);
    } catch (error) {
      console.error(`Error deleting row with ID ${id} from ${tableName} table:`, error);
    }
  }

  static async reindexTable() {
    const tableName = 'activity'; 
    try {
      // Get all rows from the table sorted by ID
      const query = `SELECT * FROM ${tableName} ORDER BY id`;
      const [rows] = await db.execute(query);

      // Update IDs sequentially starting from 1
      let index = 1;
      for (const row of rows) {
        const updateQuery = `UPDATE ${tableName} SET id = ? WHERE id = ?`;
        await db.execute(updateQuery, [index, row.id]);
        index++;
      }

      console.log(`Re-indexing ${tableName} table completed successfully`);
    } catch (error) {
      console.error(`Error re-indexing ${tableName} table:`, error);
    }
  }

}

module.exports = Activity;