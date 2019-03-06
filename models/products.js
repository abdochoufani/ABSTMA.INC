const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  weight: Number,
  size: String,
  createdAt: {type: Date, default: Date.now},
  //one Product can be bought by many recycler
  recycler: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recycler'
  }],
  //one Product is only procuded by one specific upcycler
  upcycler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Upcycler'
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;