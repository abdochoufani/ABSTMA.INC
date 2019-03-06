const mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
const saltRounds = 10;

const upcyclerSchema = new mongoose.Schema({
  fullName: String,
  firstName: String,
  lastName: String,
  userName: { type: String, required: true },
  email: String,   
  companyName: String,
  address: {
    street: String,
    city: String,
    country: String
  },
  imageUrl: String,
  googleId: String,
  description: String,
  website: String,
  description: String,
  createdAt: {type: Date, default: Date.now},
  //one upcycler can produce many products
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

upcyclerSchema.statics.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds), null);
};

// checking if password is valid
upcyclerSchema.statics.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};


const Upcycler = mongoose.model('Upcycler', upcyclerSchema);

module.exports = Upcycler;