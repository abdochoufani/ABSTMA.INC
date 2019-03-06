var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const saltRounds = 10;
const Upcycler = require('../../models/upcyclers');
const Product=require('../../models/products')



router.get('/*',(req,res,next)=>{
  if(!req.user || req.user.userType !== "upcycler") res.redirect("/") 
  else next()
})


router.get('/profile', (req, res) =>{
    res.render('upcycler/profile', {user:req.user});
    });


router.get('/createItem',(req,res)=>{
   res.render('Products/createProduct', {user:req.user});
})

router.post("/product/:id",(req,res)=>{
  const {name,imageUrl, description,weight,size}=req.body
  const update={
    name,
    imageUrl,
     description,
     weight,
     size,
     upcycler:req.user._id
  }
  Product.findByIdAndUpdate(req.params.id, update, (err) => {
      if (err){ return next(err); }
      res.redirect('/products/product');
    });
})



router.post("/product/:id/delete",(req,res)=>{
  Product.findByIdAndDelete(req.params.id, (err)=>{
      if(err) console.log(err)
       else res.redirect("/")
  })
})

router.get("/product/:id/edit",(req,res)=>{
  Product.findById(req.params.id,(err,product)=>{
      if (err) res.render("error", {err})
       else {  
              if(err) console.log(err)
              else res.render("Products/editProduct", {product})
      }
  })
})




router.get('/logout',(req,res)=>{
  req.logOut()
  res.redirect('/')
})

module.exports = router;