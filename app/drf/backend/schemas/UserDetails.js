const mongoose = require("mongoose");

const userDetailSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  attributes: {
    strength: {
      type: Number,
      default: 0,
    },
    intelligence: {
      type: Number,
      default: 0,
    },
    agility: {
      type: Number,
      default: 0,
    },
    endurance: {
      type: Number,
      default: 0,
    },
    charisma: {
      type: Number,
      default: 0,
    },
    wisdom: {
      type: Number,
      default: 0,
    },
  },
  totalPoints: {
    type: Number,
    default: 300,
  },
});

const User = mongoose.model("User", userDetailSchema);

module.exports = User;
