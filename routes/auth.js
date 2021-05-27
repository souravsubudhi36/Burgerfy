const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model('User');
const servicepassport = require("../passport");
const jwt = require("jwt-simple");
const keys = require("../config/keys");
const path = require('path');



const requireAuth = passport.authenticate(["jwt"], { session: false });


function createtoken(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.jwtsecret);
}

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {session:false, scope: ["profile", "email"] })
  );


  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {session:false}),
    (req, res) => {

      res.render('authenticated.ejs', {token : createtoken(req.user)})
    }
  );



  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get('/auth/getuser', requireAuth, (req,res)=> {
    res.send(req.user);
  })
};
