var express = require('express');
var router = express.Router();
const Product = require('../models/products');
const Upcycler  = require('../models/upcyclers');
const mongoose = require('mongoose');

//Create a temporary route /products to show all products created by an Upcycler



//GET Route to /product
router.get('/',(req, res)=>{
  Product.find({}).populate('upcycler')
  .then( product => {
    res.render('products/product.hbs', {product: product})
  }).catch(err =>{
    res.status(404).send('No products availabe');
    console.log(`Error occured: ${err}`);
  })
});



// /products
router.post('/', (req,res)=>{
  const {name,imageUrl, description,weight,size}=req.body;
  var upcycler = mongoose.Types.ObjectId(req.body.upcycler);
  const newProduct= new Product({
      name,
      description,
      imageUrl,
      upcycler,
      weight,
      size,
  })
  newProduct.save()
      .then(()=>{
          res.redirect('/products')
      })
})



router.get("/product/:id", (req, res)=> {
  if(req.params.id){
      Product.findOne({_id:req.params.id}).populate('upcycler').exec((err, product)=>{
          debugger
          if(err) console.log(err)
          else  res.render('products/singleProductPage', {product})
      })
  }
  else {
    res.redirect("/")
  }
})





module.exports = router;


