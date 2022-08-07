const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connections')

const mysql = require('mysql2'); //connecting to the MySQl datbase ny importing mysql12 package that we installed with node moduels.
const { application } = require('express');

const inputCheck = require('./u-develop-it/utils/inputCheck');

//Express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


// Get all candidates usuing GET route
app.get('/api/candidate', (req, res) => { //('api/candidates') is the endpoint in the bowser 
    const sql = `SELECT * FROM candidates`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'you got em all',
        data: rows
      });
    });
  });


// GET a single candidate using GET route
app.get('/api/candidate/:id', (req, res) =>{
    const sql = `SELECT * FROM candidates WHERE id =?`;
    const params = [req.params.id]; // able to specify what candidate we want by adding the id in the browser. 

    db.query(sql, params ,(err, row) => {
        if (err) {
            res.status(400).json({error: err.message})
            return;
        }
        res.json({
            message: "Sucesss Baby!!",
            data: row
        });
    });
});

// Delete a candidate using DELETE route
app.delete('/api/candidate/:id', (req, res)=>{
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql ,params, (err, result) =>{
        if (err){
            res.statusMessage(400).json({error: res.message});
        } else if (!result.affectedRows){
            res.json({
                message: "Candidate not found...idk"
            })
        } else {
            res.json({
                message: 'Candidate had been Deleted :(',
                change: result.affectedRows,
                id: req.params.id
            });
        }
    });
});



//Create a candidate using POST route 
app.post('/api/candidate' , ({ body }, res) => {
    const errors = inputCheck(body , 'first_name', 'last_name', 'industry_connected');
        if (errors){
        res.status(400).json({error: errors});
     return;
    }

const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
const params = [body.first_name, body.last_name, body.industry_connected];

db.query(sql, params, (err, result) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success!!!! yuh',
    data: body
  });

});

});


// Default response for any other request (Not Found) catchall route
app.use((req, res) => {
    res.status(404).end();
  });

//function that starts the express.js server on the port 3001
app.listen(PORT ,() =>{
    console.log(`Server running on port ${PORT}`)
})
