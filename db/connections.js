
// Connect to database
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: '#Spring2016',
      database: 'elections'
    },
    console.log('Connected to the elections database.')
  );

  module.exports = db;