require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const app = express();

// Middleware
app.use(cors()); // Use cors middleware
app.use(express.static('Public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
  res.redirect('/HomePage');
});

app.get('/HomePage', (req, res) => {
  res.render('index'); // Ensure 'index.ejs' exists in your views directory
});

// Email handling starts
app.post('/contactform', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'hotmail', // or your email service provider
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Your email address
    subject: subject,
    text: `Message from: ${name}\n\n${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'There was an error sending your message.' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'OK' });
    }
  });
});
// Email handling ends

// Catch-all route for undefined routes
app.get('*', (req, res) => {
  res.redirect('/HomePage');
});

// Start the server
app.listen(process.env.pp, () => {
  console.log(`Server running on port ${process.env.pp}`);
});
