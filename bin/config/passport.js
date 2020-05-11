const User = require('../../models/User');
const LocalStrategy = require('passport-local').Strategy;
const nodemailer = require('nodemailer');
const crypto = require("crypto");
const nodemailerSendgrid = require('nodemailer-sendgrid');
const { SENDGRID_API_KEY } = require('./config');
const transport = nodemailer.createTransport(nodemailerSendgrid({
  apiKey: SENDGRID_API_KEY
}));

module.exports = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    })
  });

  passport.use('local.register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, username, password, done) {
    let contact = req.body.contact;
    let email = req.body.email;
    // console.log(email);
    // console.log(req.body.email);
    User.findOne({ 'email': email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, { message: "Email already Exist" })
      }

      const token = crypto.randomBytes(25).toString("hex");  //verification token
      
      newUser = new User();
      newUser.token = token;
      newUser.username = username;
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      newUser.contact = contact;


      newUser.save((err, user) => {
        if (err) {
          return done(err);
        }
        // console.log(newUser);
        req.session.user = newUser;
        let URL =  "http://localhost:3000/?id=" + token;
        transport.sendMail({
          from: `thirumalai.yadav17@siesgst.ac.in`,
          to: email,
          subject: `Mail check`,
          html: `
                  <h1>NIC</h1>
                  <p>Thiru Registered link : `+ URL + `
                  </p>
                  `
        });
        return done(null, newUser);
      })
    })

  }))


  //login
  passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, username, password, done) {
    // console.log("thiru", req);
    User.findOne({ 'username': username },function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "No User Found" });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Wrong Password" });
      }
      return done(null, user);
    })
  }));

}