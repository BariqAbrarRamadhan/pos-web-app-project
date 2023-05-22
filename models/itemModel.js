const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Items = mongoose.model('items', itemSchema);
module.exports = Items;