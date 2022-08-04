const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//get route
app.get('/', (req, res) => {
    res.json({
    message: "hello evan"
    });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

//function that starts the express.js server on the port 3001
app.listen(PORT ,() =>{
    console.log(`Server running on port ${PORT}`)
})
