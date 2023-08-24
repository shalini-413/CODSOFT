const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the static files (e.g., HTML, CSS, JS)
app.use(express.static(__dirname + '/public'));

// POST route to handle the form submission
app.post('/sendEmail', (req, res) => {
  const { name, email, message } = req.body;

  // Configure the transporter with your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'YourEmailService', // e.g., 'Gmail', 'Outlook', etc.
    auth: {
      user: 'your_email@example.com', // Your email address
      pass: 'your_email_password', // Your email password or an app password if using Gmail
    },
  });

  // Email options
  const mailOptions = {
    from: 'your_email@example.com', // Sender's email address
    to: 'recipient@example.com', // Recipient's email address
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending the email.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully.');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
