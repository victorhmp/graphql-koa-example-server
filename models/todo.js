const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: 'untitled'
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  owner: {
    type: String,
    required: true,
  }
});
const Model = mongoose.model('Todo', todoSchema);

module.exports = Model;