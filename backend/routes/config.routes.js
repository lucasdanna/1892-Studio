const express = require('express');
const router = express.Router();
const Config = require('../models/Config');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    let config = await Config.findOne();
    if (!config) {
      config = new Config();
      await config.save();
    }
    res.json(config);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.put('/', auth, async (req, res) => {
  try {
    const { emailDestination, socials, about, theme } = req.body;
    let config = await Config.findOne();
    if (config) {
      if (emailDestination) config.emailDestination = emailDestination;
      if (socials) config.socials = socials;
      if (about) config.about = about;
      if (theme) config.theme = theme;
      await config.save();
    } else {
      config = new Config({ emailDestination, socials, about, theme });
      await config.save();
    }
    res.json(config);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
