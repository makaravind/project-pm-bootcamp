const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new mongoose.Schema({
  from: String,
  to: String,
  message: String,
  type: String,
  created: {type: Date, default: Date.now},
});

ChatSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Chat', ChatSchema);
