const mongoose = require('mongoose');

const {Schema} = mongoose;

const orderschema = new Schema ({
  cart : [
    {
      code : Number,
      quantity : Number
    }
  ],
  
  customcart : [
    {
      description : String,
      quantity : Number,
      price : Number
    }
  ],
  price : Number,
  address : {
    address : String,
    city : String,
    state : String,
    pincode : Number,
    phone : Number
  }
});

mongoose.model('Order', orderschema);
