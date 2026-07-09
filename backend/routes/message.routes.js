const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Config = require('../models/Config');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');

// Create message (public)
router.post('/', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const message = await newMessage.save();

    // Intentar enviar email
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const config = await Config.findOne();
        const destination = config ? config.emailDestination : 'admin@1892studio.com';

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: destination,
          subject: `Nuevo mensaje de ${message.name} - 1892 STUDIO`,
          text: `Has recibido un nuevo mensaje desde el portafolio.\n\nNombre: ${message.name}\nEmail: ${message.email}\n\nMensaje:\n${message.message}`
        };

        // Quitamos el await para que no bloquee la respuesta si el puerto SMTP está bloqueado
        transporter.sendMail(mailOptions).then(() => {
          console.log('Email sent successfully');
        }).catch((emailErr) => {
          console.error('Error sending email (probablemente bloqueado por Render Free Tier):', emailErr.message);
        });
      } else {
        console.log('Nodemailer credentials not set, email not sent.');
      }
    } catch (emailErr) {
      console.error('Error sending email:', emailErr);
    }

    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get all messages (admin)
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete message
router.delete('/:id', auth, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Message removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
