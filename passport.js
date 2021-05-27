const passport = require("passport");
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require("./config/keys.js");
const jwtstrat = require("passport-jwt").Strategy;
const extractjwt = require("passport-jwt").ExtractJwt;

const googleStrat = require("passport-google-oauth20");



// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
//
// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => done(null, user));
// });
passport.use(
  new googleStrat(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googlesecret,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshtoken, profile, done) => {
      
      const founduser = await User.findOne({ googleid: profile.id });
      if (founduser) {
        done(null, founduser);
      } else {
        const user = await new User({ googleid: profile.id, name : profile.displayName }).save();
        done(null, user);
      }
    }
  )
);

const jwtoptions = {
  jwtFromRequest: extractjwt.fromHeader("authorization"),
  secretOrKey: keys.jwtsecret
};

const jwtLogin = new jwtstrat(jwtoptions, function(payload, done) {
  User.findById(payload.sub, (err, user) => {
    if (err) {
      console.log(1);
      return done(err, false);
    }

    if (user) {
      console.log(2);

      return done(null, user);
    }
    console.log(3);

    return done(null, false);
  });
});

passport.use(jwtLogin);
