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
  experience: Number,
  lookingExperience: Number,
  providerData: Schema.Types.Mixed,
  likes: [new Schema({userId: String, created: {type: Date, default: Date.now}})],
  dislikes: [new Schema({userId: String, created: {type: Date, default: Date.now}})],
  matches: [new Schema({userId: String, created: {type: Date, default: Date.now}})],
  businessType: String,
  lookingBusinessType: String,
  lastUpdated: {type: Date, default: Date.now},
});

UserSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('User', UserSchema);
