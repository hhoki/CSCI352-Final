const db = require("../config/db");

class PractitionerRole {
  constructor(active, period_start, period_end, code, codedefinition, language, specialty) {
    this.active = active;
    this.period_start = period_start;
    this.period_end = period_end;
    this.code = code;
    this.codedefinition = codedefinition;
    this.language= language;
    this.specialty = specialty;
  }

  save() {
    let sql = `
    INSERT INTO practitionerrole(
      active,
      period_start,
      period_end,
      code,
      codedefinition,
      language,
      specialty
    )
    VALUES(
      '${this.active}',
      '${this.period_start}',
      '${this.period_end}',
      '${this.code}',
      '${this.codedefinition}',
      '${this.language}',
      '${this.specialty}'
    )
    `;

    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM practitionerrole;";

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM practitionerrole WHERE id = ${id};`;

    return db.execute(sql);
  }

  static updateById(id, active, code, period_end, period_start, codedefinition, language) {
    let sql = `UPDATE practitionerrole SET active = ${active}, period_start= ${period_start}, period_end = ${period_end},  code = ${code}, code_definition = ${codedefinition}, language = ${language} WHERE id = ${id};`;

    return db.execute(sql);
  }

  static deleteById(id) {
    let sql = `DELETE FROM practitionerrole WHERE id = ${id};`;

    return db.execute(sql);
  }
}

module.exports = PractitionerRole;