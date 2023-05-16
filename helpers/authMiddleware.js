const bcrypt = require('bcrypt');
const pool = require('../helpers/database');

const authenticateUser = async (req, res, next) => {
  try {
// Extract user credentials from the request
const { id, password } = req.body;

// Fetch the user's password from the database
const sqlGetUser = 'SELECT id, password FROM users WHERE id=?';
const rows = await pool.query(sqlGetUser, [id]);

// Check if the user exists
if (rows.length === 0) {
  return res.status(401).send('User not found');
}

// Compare the provided password with the stored password
const encryptedPassword = rows[0].password;
const isValid = await bcrypt.compare(password, encryptedPassword);
if (!isValid) {
  return res.status(401).send('Invalid password');
}

// Attach the user ID to the request object for future use
req.id = id;
// Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { authenticateUser };