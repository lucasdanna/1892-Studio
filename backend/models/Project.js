const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  year: { type: String, required: true },
  link: { type: String, default: '' },
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Project', ProjectSchema);
