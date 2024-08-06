require('dotenv').config();
const express = require('express');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static("Public"))

// Set view engine
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
  res.redirect('/HomePage');
});

app.get('/HomePage', (req, res) => {
  res.render('index'); // Ensure 'index.ejs' exists in your views directory
});



// Get port from environment variables or default to 3000


// Start the server
app.listen((process.env.pp),()=>{console.log(`Porting To ${process.env.pp}`);});
