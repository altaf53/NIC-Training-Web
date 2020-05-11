const express = require("express");
const userController = require('../controllers/userController');
const router = express.Router();
const passport = require('passport');
const csrf = require("csurf");
const csrfProtection = csrf();
const path = require('path');

router.use(csrfProtection);





router.get('/student_dash', userController.student_dash);

router.post('/file\/synopsis|srs|sdd|uml|testing$/', (req, res) => {
  let dataType = req.url.split('/')[2];

  let file = req.files[dataType];

  file.name = `${dataType}-${req.session.passport.user}${path.parse(file.name).ext}`;

  file.mv(`./public/data/${dataType}/${file.name}`, async (err) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: "File cannot be saved..."
      })
    }
    res.status(200).json({
      success: true,
      message: "files has been successfully saved",
      fileUri: file.name
    })
  })
})

router.get('/', userController.home);

router.post('/login', passport.authenticate('local.signin'), function (req, res) {
  res.redirect('/profile');
})

router.get('/register', userController.register);

router.post('/register', passport.authenticate('local.register', {
  successRedirect: '/',
  failureRedirect: '/register',
  failureFlash: true
}))

router.get('/profile', isLoggedIn, userController.profile);


router.post('/profile', isLoggedIn, userController.saveProfile)
router.get('/notify', isLoggedIn, userController.notify);

router.get('/admin_dash', isLoggedIn, userController.admin_dash);


router.get('/logout', isLoggedIn, function (req, res, next) {
  req.logout();
  res.redirect('/');
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
}



module.exports = router;