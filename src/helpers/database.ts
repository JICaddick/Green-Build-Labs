import mariadb from "mariadb";
require('dotenv').config();
// a pool is a bunch of connections or something that defines a connection to the database. It's a pool of connections.
// connectionlimit of 5 means no more than 5 symultaneous connections to the database at any given time.
// this file gives us a single place in our app where we handle db connectivity. We can now load pool wherever we need it.
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5
});

pool.getConnection().then((connection) => {
  if (connection) connection.release();
}) .catch((err) => {
  if(err){
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
  }
})

export { pool }