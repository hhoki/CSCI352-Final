const db = require("../config/db");

class Careplan {
  constructor(status, intent, title, description, period_start, period_end, created_date, subject_id, activity_id) {
    this.status = status;
    this.intent = intent;
    this.title = title;
    this.description = description;
    this.period_start = period_start;
    this.period_end = period_end;
    this.created_date = created_date;
    this.subject_id = subject_id;
    this.activity_id = activity_id;
  }

  save() {
    let sql = `
      INSERT INTO careplan(
        status, intent, title, description, period_start, period_end, created_date, subject_id, activity
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return db.execute(sql, [
      this.status,
      this.intent,
      this.title,
      this.description,
      this.period_start,
      this.period_end,
      this.created_date,
      this.subject_id,
      this.activity_id
    ]);
  }

  static findAll() {
    let sql = "SELECT * FROM careplan;";
    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM careplan WHERE id = ?;`;
    return db.execute(sql, [id]);
  }

  static async deleteById(id) {
    const tableName = 'careplan';
    try {
      // Delete the row
      const deleteQuery = `DELETE FROM ${tableName} WHERE id = ?`;
      await db.execute(deleteQuery, [id]);

      // Re-index the table
      await this.reindexTable();

      console.log(`Deleted row with ID ${id} from ${tableName} table`);
    } catch (error) {
      console.error(`Error deleting row with ID ${id} from ${tableName} table:`, error);
    }
  }

  static updateById(id, status, intent, title, description, period_start, period_end, created_date, subject_id, activity_id) {
    let sql = `
      UPDATE careplan 
      SET status = ?, intent = ?, title = ?, description = ?, 
          period_start = ?, period_end = ?, created_date = ?, 
          subject_id = ?, activity = ? 
      WHERE id = ?;
    `;
    return db.execute(sql, [status, intent, title, description, period_start, period_end, created_date, subject_id, activity_id, id]);
  }

  static async reindexTable() {
    const tableName = 'careplan'; 
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

module.exports = Careplan;