const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connections')

const mysql = require('mysql2'); //connecting to the MySQl datbase ny importing mysql12 package that we installed with node moduels.

//Express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//querying the database to test the connection
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
  });

// Default response for any other request (Not Found) catchall route
app.use((req, res) => {
    res.status(404).end();
  });

//function that starts the express.js server on the port 3001
app.listen(PORT ,() =>{
    console.log(`Server running on port ${PORT}`)
})
