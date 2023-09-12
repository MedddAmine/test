const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const userSchema = Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = model('User', userSchema);

module.exports = User;