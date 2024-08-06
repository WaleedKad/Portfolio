const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

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
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
