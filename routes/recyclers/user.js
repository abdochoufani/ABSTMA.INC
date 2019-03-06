const router=require('express').Router()
const Product=require("../../models/products")
const Recycler=require("../../models/recyclers")


router.get('/*',(req,res,next)=>{
  debugger
   if(!req.user || req.user.userType !== "recycler") res.redirect("/") 
   else next()
})


  router.get('/profile',(req,res)=>{
    debugger    
       res.render("recycler/profile", {recycler:req.user})
  })



  router.get("/logout",(req,res)=>{
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
      res.render('Products/product.hbs', {product: product})
    }).catch(err =>{
      res.status(404).send('No products availabe');
      console.log(`Error occured: ${err}`);
    })
  });

  module.exports=router
