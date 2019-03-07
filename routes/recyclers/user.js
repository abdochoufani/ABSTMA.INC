const router=require('express').Router()
const Product=require("../../models/products")
const Recycler=require("../../models/recyclers")
const Upcycler = require('../../models/upcyclers')


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
//============================================================//


 


  router.get("/logout",(req,res)=>{
<<<<<<< HEAD
    req.session.destroy()
=======
    req.session.destroy();
>>>>>>> 56a277932931bff06e088f466aac6a035cea2097
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

  module.exports=router
