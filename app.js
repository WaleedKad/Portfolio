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

  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: `Message from: ${name}\n\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.send('There was an error sending your message.');
    } else {
      console.log('Email sent:', info.response);
      res.send('OK');
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
