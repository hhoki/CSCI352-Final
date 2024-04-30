const db = require("../config/db");

class Practitioner {
  constructor(active, useType, family, given, prefix, suffix, gender, birthDate, language, address_id) {
    this.active = active;
    this.useType = useType;
    this.family = family;
    this.given = given;
    this.prefix = prefix;
    this.suffix = suffix;
    this.gender = gender;
    this.birthDate = birthDate;
    this.language = language;
    this.address_id = address_id;
  }

  save() {
    let sql = `
    INSERT INTO practitioner(
      active,
      useType,
      family,
      given,
      prefix,
      suffix,
      gender,
      birthDate,
      language,
      address_id
    )
    VALUES(
      '${this.active}',
      '${this.useType}',
      '${this.family}',
      '${this.given}',
      '${this.prefix}',
      '${this.suffix}',
      '${this.gender}',
      '${this.birthDate}',
      '${this.language}',
      '${this.address_id}'
    )
    `;

    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM practitioner;";

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM practitioner WHERE id = ${id};`;

    return db.execute(sql);
  }

  static deleteById(id) {
    let sql = `DELETE FROM practitioner WHERE id = ${id};`;

    return db.execute(sql);
  }
  
  static updateById(id, active, useType, family, given, prefix, suffix, gender, birthDate, language, address_id) {
    let sql = `UPDATE practitioner SET active = ${active}, useType = ${useType}, family = ${family}, given = ${given}, prefix = ${prefix}, suffix = ${suffix},
              gender = ${gender}, birthDate = ${birthDate}, language = ${language}, address_id = ${address_id} WHERE id = ${id};`;

    return db.execute(sql);
  }
}

module.exports = Practitioner;