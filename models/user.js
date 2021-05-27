const mongoose = require("mongoose");

const { Schema } = mongoose;

const userschema = new Schema({
  googleid: String,
  name: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ],
  address : [ {
    address : String,
    state : String,
    city : String,
    pincode : Number,
    phone : Number
    } ]
});

mongoose.model("User", userschema);
