const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");
const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "lightbnb",
});

// pool.query(`SELECT title FROM properties LIMIT 10;`).then((response) => {
//   console.log(response);
// });
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const queryString = `SELECT users.name FROM users WHERE users.email = $1`;

  return pool
    .query(queryString, [email])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const queryString = `SELECT users.name FROM users WHERE users.id = $1`;
  pool
    .query(queryString, [id])
    .then((res) => {
      console.log(res.rows);
      res.rows[0];
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
  const queryString = `INSERT INTO user (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *`;
  const values = [`${user.name}, ${user.email}, ${user.password}`];
  pool
    .query(queryString, values)
    .then((res) => {
      res.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return getAllProperties(null, 2);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

let queryString = `SELECT * FROM properties LIMIT $1`;
const getAllProperties = (options, limit = 10) => {
  return pool
    .query(queryString, [limit])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
