var express = require('express');
var router = express.Router();
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
   res.render('products/createProduct', {user:req.user});
})

router.post("/product/:id",(req,res)=>{
  debugger
  var upcycler = mongoose.Types.ObjectId(req.user);
  const {name,imageUrl, description,weight,size}=req.body
  const update={
    name,
    imageUrl,
     description,
     weight,
     size,
     upcycler
  }
  Product.findByIdAndUpdate(req.params.id, update, (err) => {
      if (err){ return next(err); }
      res.redirect('/products/product');
    });
})

// Route --> /upcycler/edit/:id
router.get('/edit/:id', (req, res) =>{
  Upcycler.findById(req.params.id, (err, upcycler) => {
    if (err) console.log(`Error occured: ${err}`)
    else {
      res.render('editUpcycler', {user: upcycler})
    }
  })
})

router.post('/edit/:id', (req, res) =>{
  let edited = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email, 
    companyName: req.body.companyName,
    address:{country: req.body.country,
             city: req.body.city, 
             street: req.body.street},
    imageUrl: req.body.imageUrl,
    description: req.body.description
  }
  Upcycler.findByIdAndUpdate(req.params.id, edited, (err) => {
    if (err){ return next(err); }
    res.redirect('/upcycler/profile')
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


module.exports = router;