require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const app = express(); // Use a lowercase 'a' for the instance

// Set view engine
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static("public"));

// Define routes
app.get("/", (req, res) => {
  res.redirect("/HomePage");
});

app.get("/HomePage", (req, res) => {
  res.render("index"); // Ensure "index.ejs" exists in your views directory
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render("Error"); // Ensure "Error.ejs" exists in your views directory
});

// Get port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
