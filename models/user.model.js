const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");

const db = require("../data/databse");

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }

  async signup() {
    const hashedPassowrd = await bcrypt.hash(this.password, 12);

    const result = await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassowrd,
      name: this.name,
      address: this.address,
    });
  }

  static findById(userId) {
    const uid = new mongodb.ObjectId(userId);

    return db
      .getDb()
      .collection("users")
      .findOne({ _id: uid }, { projection: { password: 0 } });
  }

  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    }
    return false;
  }
  comparePassword(hashedPassowrd) {
    return bcrypt.compare(this.password, hashedPassowrd);
  }
}

module.exports = User;
