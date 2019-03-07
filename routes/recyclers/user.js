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
    .then( upcycler => {                                      //
      debugger                                                // 
      res.render('allUpcyclers', {upcycler})                  //
    })                                                        //
    .catch( err => {                                          //
      res.status(404).send('No upcyclers found');             //
      console.log(`Error ${err}`);                            //
    })                                                        //
  })                                                          //
//============================================================

//Route  --> /recycler/product
//===========================================================================
router.get('/product', (req, res) => {                                      //
  let id = req.query.UpcyclerId                                             //
  Product.find({upcycler: mongoose.Types.ObjectId(id)}, (err, product)=>{   //
    debugger                                                                //
    if (err) console.log(`Error occurred: ${err}`)                          //
    res.status(200).render('upcyclerProducts', {product})                   //
  })                                                                        //
})                                                                          //
//============================================================================


// Route --> /recycler/edit/:id===============================================
router.get('/edit/:id', (req, res) =>{
  Recycler.findById(req.params.id, (err, recycler) => {
    if (err) console.log(`Error occured: ${err}`)
    else {
      res.render('editRecycler', {recycler: recycler})
    }
  })
})

router.post('/edit/:id', (req, res) =>{
  let edited = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    companyName: req.body.companyName,
    email: req.body.email, 
    country: req.body.country,
    city: req.body.city, 
    street: req.body.street,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  }
  Recycler.findByIdAndUpdate(req.params.id, edited, (err) => {
    if (err){ return next(err); }
    res.redirect('/recycler/profile')
  })
})
//=======================================================================


  router.get("/logout",(req,res)=>{
    req.session.destroy();
    req.logout();
		res.redirect('/');
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
