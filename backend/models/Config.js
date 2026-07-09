const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
  emailDestination: { type: String, default: 'admin@1892studio.com' },
  socials: {
    instagram: { type: String, default: '#' },
    twitter: { type: String, default: '#' },
    linkedin: { type: String, default: '#' }
  },
  about: {
    text: { type: String, default: 'Somos un estudio creativo enfocado en maximizar experiencias web.' },
    imageBase64: { type: String, default: '' }
  },
  theme: {
    bgColor: { type: String, default: '#0B2416' },
    textColor: { type: String, default: '#FFD700' }
  }
});

module.exports = mongoose.model('Config', ConfigSchema);
