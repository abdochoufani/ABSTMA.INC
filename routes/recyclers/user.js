const router=require('express').Router()
const Product=require("../../models/products")
const Recycler=require("../../models/recyclers")
const Upcycler = require('../../models/upcyclers')
const mongoose = require('mongoose');

router.get('/*',(req,res,next)=>{
  debugger
   if(!req.user || req.user.userType !== "recycler") res.redirect("/") 
   else next()
})


  router.get('/profile',(req,res)=>{
    debugger    
       res.render("recycler/profile", {recycler:req.user})
  })

//Route to display all Upcyclers==============================//
// Route --> /recycler/allUpcyclers                           //
  router.get('/allUpcyclers', (req, res) =>{                  // 
    Upcycler.find({}).populate('products')                    //
    .then( upcyclers => {                                      //
      debugger                                                // 
      res.render('allUpcyclers', {upcyclers})                  //
    })                                                        //
    .catch( err => {                                          //
      res.status(404).send('No upcyclers found');             //
      console.log(`Error ${err}`);                            //
    })                                                        //
  })                                                          //
//============================================================


//Route  --> /recycler/product
router.get('/product', (req, res) => {
  let id = req.query.UpcyclerId
  Product.find({upcycler: mongoose.Types.ObjectId(id)}, (err, product)=>{
    debugger
    res.status(200).render('upcyclerProducts', {product})
  })
})
 




  router.get("/product/:id", (req, res)=> {
    if(req.params.id){
        Product.findOne({_id:req.params.id}).populate('upcycler').exec((err, product)=>{
            debugger
            if(err) console.log(err)
            else  res.render('Products/singleProductPage', {product})
        })
    }
    else {
      res.redirect("/")
    }
  })



  router.get('/products',(req, res)=>{
    Product.find({}).populate('upcycler')
    .then( product => {
      res.render('products/product.hbs', {product: product})
    }).catch(err =>{
      res.status(404).send('No products availabe')
      console.log(`Error occured: ${err}`)
    })
  });



  module.exports = router

