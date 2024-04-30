const db = require("../config/db");

class Patient {
  constructor(active, useType, family, given, prefix, suffix, gender, birthDate, maritalStatus, language, address) {
    this.active = active;
    this.useType = useType;
    this.family = family;
    this.given = given;
    this.prefix = prefix;
    this.suffix = suffix;
    this.gender = gender;
    this.birthDate = birthDate;
    this.maritalStatus = maritalStatus;
    this.language = language;
    this.address = address;
  }

  async save() {
    try {
      const sql = `
        INSERT INTO patient(
          active, useType, family, given, prefix, suffix, gender, birthDate, maritalStatus, language, address
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [this.active, this.useType, this.family, this.given, this.prefix, this.suffix, this.gender, this.birthDate, this.maritalStatus, this.language, this.address];

      const [result] = await db.execute(sql, values);
      return result.insertId;
    } catch (error) {
      throw new Error(`Error saving patient: ${error.message}`);
    }
  }

  static async findAll() {
    try {
      const sql = "SELECT * FROM patient";
      const [rows] = await db.execute(sql);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching all patients: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const sql = "SELECT * FROM patient WHERE id = ?";
      const [rows] = await db.execute(sql, [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error fetching patient by id: ${error.message}`);
    }
  }

  async update() {
    try {
      const sql = `
        UPDATE patient
        SET active = ?, useType = ?, family = ?, given = ?, prefix = ?, suffix = ?, gender = ?, birthDate = ?, maritalStatus = ?, language = ?, address = ?
        WHERE id = ?
      `;
  
      // Check each property before using it in the SQL query
      const values = [
        this.active,
        this.useType,
        this.family,
        this.given,
        this.prefix,
        this.suffix,
        this.gender,
        this.birthDate,
        this.maritalStatus,
        this.language,
        this.address,
        this.id
      ];
  
      // Replace undefined values with null
      const sanitizedValues = values.map(value => (value === undefined ? null : value));
  
      await db.execute(sql, sanitizedValues);
    } catch (error) {
      throw new Error(`Error updating patient: ${error.message}`);
    }
  }

  static async deleteById(id) {
    const tableName = 'patient';
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

  static async reindexTable() {
    const tableName = 'patient'; 
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

module.exports = Patient;