var express = require('express');
var router = express.Router();
const Upcycler = require('../../models/upcyclers');
const Product=require('../../models/products')

const authCheckUpcycler=(req,res,next)=>{
  if(!req.user || req.user.userType !== "upcycler") res.redirect("/") 
  else next()
}

router.get('/*',authCheckUpcycler,(req,res,next)=>{
  res.redirect("upcycler/profile")
})


router.get('/profile', (req, res) =>{
    Upcycler.findById(req.user.id,(err, user)=>{
      if (err) res.send(err)
       else res.render('upcycler/profile', {user});
    });

});


router.get('/createItem',(req,res)=>{
  Upcycler.find({},(err, user)=>{
      if (err) res.send("error")
      else res.render('Products/createProduct', {user});
  })
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


router.post("/product/:id",(req,res)=>{
  const {name,imageUrl, description,weight,size}=req.body
  const update={
    name,
    imageUrl,
     description,
     weight,
     size
  }
  Product.findByIdAndUpdate(req.params.id, update, (err) => {
      if (err){ return next(err); }
      res.redirect('/products/product');
    });
})


router.get('/logout',(req,res)=>{
  req.logOut()
  res.redirect('/')
})

module.exports = router;