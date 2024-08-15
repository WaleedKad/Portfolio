require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); 
const app = express();

// Middleware
app.use(cors()); 
app.use(express.static('Public'));
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

// Set view engine
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
  res.redirect('/HomePage');
});

app.get('/HomePage', (req, res) => {
  res.render('index'); 
});

// Email handling starts
app.post('/contactform', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Debugging: Log the incoming form data
  console.log('Received data:', req.body);

  if (!name || !email || !subject || !message) {
    return res.send('Please fill out all fields.');
  }

  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: `Message from: ${name}\nEmail: ${email}\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.send('There was an error sending your message.');
    } else {
      console.log('Email sent:', info.response);
      return res.send('OK');
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
