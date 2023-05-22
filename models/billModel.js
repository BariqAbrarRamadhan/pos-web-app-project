const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
    totalAmount: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      required: true
    },
    cartItems: {
      type: Array,
      required: true
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const bills = mongoose.model('bills', billSchema);
module.exports = bills;