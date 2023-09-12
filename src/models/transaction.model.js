const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const transactionSchema = Schema(
  {
    deposit: {
      type: Number,
      required: true,
    },
    withdrew: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },

    postBy: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;