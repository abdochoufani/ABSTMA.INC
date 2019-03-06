const mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
const saltRounds = 10;


const recyclerSchema = new mongoose.Schema({
  fullName :String,
  firstName: String,
  lastName: String,
  userName:{ type: String, required: true },
  googleId:String,
  facebookId:String,
  companyName: String,
  address: {
    street: {type:String, default:"Not set"},
    city: {type:String,lowercase: true, trim: true , default:"Not set"},
    country: {type:String,lowercase: true, trim: true, default:"Not set"}
  },
  gender:String,
  imageUrl: String,
  createdAt: {type: Date, default: Date.now},
  //one user (recycler) can buy many products
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

recyclerSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds), null);
};

// checking if password is valid
recyclerSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

const Recycler = mongoose.model('Recycler', recyclerSchema);

module.exports = Recycler;