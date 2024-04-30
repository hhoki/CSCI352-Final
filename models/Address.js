const db = require("../config/db");

class Address {
  constructor(useType, type, line, city, state, postalcode, country, period_start, period_end) {
    this.useType = useType;
    this.type = type;
    this.line = line;
    this.city = city;
    this.state = state;
    this.postalcode = postalcode;
    this.country = country;
    this.period_start = period_start;
    this.period_end = period_end;
  }

  async save() {
    try {
      const sql = `
        INSERT INTO address(
          useType, type, line, city, state, postalcode, country, period_start, period_end
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [this.useType, this.type, this.line, this.city, this.state, this.postalcode, this.country, this.period_start, this.period_end];
      
      const [result] = await db.execute(sql, values);
      return result.insertId;
    } catch (error) {
      throw new Error(`Error saving address: ${error.message}`);
    }
  }

  static async findAll() {
    try {
      const sql = "SELECT * FROM address";
      const [rows] = await db.execute(sql);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching all addresses: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const sql = "SELECT * FROM address WHERE address_id = ?";
      const [rows] = await db.execute(sql, [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error fetching address by id: ${error.message}`);
    }
  }

  static async deleteById(id) {
    const tableName = 'address';
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

  async update() {
    try {
      const sql = `
        UPDATE address
        SET useType = ?,
            type = ?,
            line = ?,
            city = ?,
            state = ?,
            postalcode = ?,
            country = ?,
            period_start = ?,
            period_end = ?
        WHERE address_id = ?
      `;
      const values = [this.useType, this.type, this.line, this.city, this.state, this.postalcode, this.country, this.period_start, this.period_end, this.id];
      
      await db.execute(sql, values);
    } catch (error) {
      throw new Error(`Error updating address: ${error.message}`);
    }
  }

  static async findPatientsByAddressId(addressId) {
    try {
      const sql = "SELECT * FROM patient WHERE address = ?";
      const [rows] = await db.execute(sql, [addressId]);
      return rows;
    } catch (error) {
      throw new Error(`Error finding patients by address id: ${error.message}`);
    }
  }

  static async updatePatientsAddressId(addressId, newAddressId) {
    try {
      const sql = "UPDATE patient SET address = ? WHERE address = ?";
      await db.execute(sql, [newAddressId, addressId]);
    } catch (error) {
      throw new Error(`Error updating patients address id: ${error.message}`);
    }
  }

  static async reindexTable() {
    const tableName = 'address'; 
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

module.exports = Address;