const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    verified: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
);

const Users = mongoose.model('users', userSchema);
module.exports = Users;