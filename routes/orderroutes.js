const mongoose = require('mongoose');
const passport = require("passport");
const User = mongoose.model('User');
const Order = mongoose.model('Order');

const requireAuth = passport.authenticate(["jwt"], { session: false });

module.exports = app => {
  app.post('/api/order',requireAuth, (req,res) => {

    Order.create(req.body, function(err, createdorder){
      if(err){
        console.log('order.create',err);
      } else {
        User.findById(req.user.id, function(err, founduser){
          if(err){
            console.log('user.find', err);
          } else {
            founduser.orders.push(createdorder);
            founduser.save();
            res.send('success');
          }
        })
      }
    })

  });

  app.get('/api/order',requireAuth, (req,res) => {
    User.findById(req.user.id).populate('orders').exec(function(err, founduser){
      if(err){
        console.log("user.find", err);
      } else {
        res.send(founduser.orders);
      }
    })
  });



  app.post('/api/saveaddress', requireAuth, (req,res)=> {
    User.findById(req.user.id, async function(err, founduser){
      if(err){
        console.log(err);
      } else {
        founduser.address.push(req.body);
        await founduser.save();
        res.send('success');
      }
    })
  });


  app.post('/api/deleteaddress',requireAuth, (req,res)=> {
    User.findById(req.user.id, async function(err,founduser){
      founduser.address.forEach(async function(add){
        
        if(add.id == req.body.id){
          founduser.address.splice(founduser.address.indexOf(add), 1);
          await founduser.save();

        }
      });

      res.send('success');
    })
  })



  app.get('/api/address', requireAuth, (req,res)=> {
    User.findById(req.user.id, function(err,founduser){
      res.send(founduser.address);
    })
  })
}
