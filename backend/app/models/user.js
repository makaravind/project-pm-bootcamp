const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  id: String,
  displayName: String,
  name: {
    familyName: String,
    givenName: String
  },
  email: String,
  imageUrl: String,
  profileUrl: String,
  provider: String,
  industry: String,
  location: String,
  numConnections: Number,
  // exprience: Number // calculate from positions field
  providerData: Schema.Types.Mixed,
  lastUpdated: {type: Date, default: Date.now},
});

UserSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('User', UserSchema);
