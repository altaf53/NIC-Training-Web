const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('../../models/User');
const { MONGO_DB_URI, SECRET_SESSION } = require('./config');
const flash = require('connect-flash');
const passport = require('passport');
const fileUpload = require('express-fileupload');

require('./passport')(passport);

const initMiddleware = (app) => {
  console.log("Middleware");

  // view engine setup
  app.set('views', path.join(__dirname, '../../views'));
  app.set('view engine', 'ejs');

  app.use(express.static(path.join(__dirname, '../../public')));
  console.log(path.join(__dirname, '../../public'));

  const store = new MongoDBStore({
    store: MONGO_DB_URI
  });




  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store: store
  }));

  app.use(flash());
  app.use(fileUpload({ limits: { fileSize: 2 * 1024 * 1024 } }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(async (req, res, next) => {
    res.locals.req = req;
    // if (req.session.passport) {
    //   res.locals.user = await User.findById({ _id: req.session.passport.user });
    //   console.log("locla", res.locals.user)

    // }
    app.locals.session = req.session;
    next();

  });
};

module.exports = initMiddleware;