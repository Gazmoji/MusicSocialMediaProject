const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: String,
  profilePicture: String,
  description: String,
  Artist1: String,
  Artist2: String,
  Artist3: String,
  Spotify: String,
  SoundCloud: String,
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
