const csrf = require("csurf");
const Profile = require('../models/Profile');
const User = require('../models/User');


module.exports.home = (req, res) => {
  let csrfToken = req.csrfToken();
  // console.log(req.param('id'))


  //verification if first time login
  if (req.query.id) {
    User.updateOne({ 'token': req.query.id }, { $set: { verification: 1 } }, function (err) {
      if (err) {
        return done(err);
      }
      let verified = "1";
      res.render('pages/index', { csrfToken, verified });

    });
  } else {
    let verified = "0";
    res.render('pages/index', { csrfToken, verified });
  }
}

module.exports.register = (req, res) => {
  let csrfToken = req.csrfToken();

  res.render('pages/signup', { csrfToken });
}

module.exports.profile = (req, res) => {
  let csrfToken = req.csrfToken();

  res.render('pages/profile', {
    csrfToken: csrfToken
  });
}

module.exports.saveProfile = (req, res) => {
  // console.log(req.session.user);
  // console.log(req.body);
  // console.log(req.body.optradio2);
  // console.log(typeof req.body.optradio2);
  //Saving req.body objects to profile
  let userProfile = new Profile({
    userId: req.session.user._id,
    fullName: req.body.sfname,
    instituteName: req.body.insname,
    instituteAddress: req.body.insaddress,
    instituteContact: req.body.phone,
    studentPermanentAddress: req.body.inssaddress,
    studentContact: req.body.telphone,
    caste: req.body.optradio1,
    degree: req.body.optradio2,
    firstSem: req.body.Ist,
    secondSem: req.body.IInd,
    thirdSem: req.body.IIIrd,
    fourthSem: req.body.IVth,
    fifthSem: req.body.Vth,
    sixthSem: req.body.VIth,
    seventhSem: req.body.VIIth,
    eighthSem: req.body.VIIIth,
    courseStatus: req.body.optradio3,
    traineeSemester: req.body.optradio4,
    projectDuration: req.body.projectDuration,
    projectStartDate: req.body.projectStartDate,
  });

  userProfile.save((err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
  })
  // res.send("Successfully Saved");
  res.render('pages/profile', { csrfToken });
}

module.exports.student_dash = (req, res) => {
  let csrfToken = req.csrfToken();
  let userId = req.session.passport.user;
  if (!userId) {
    res.redirect('/profile');
  }

  User.findById(userId, function (err, user) {
    console.log(user);
    res.render('pages/student_dash', { csrfToken, user });
  })
}

module.exports.notify = (req, res) => {
  let csrfToken = req.csrfToken();

  res.render('pages/notify', { csrfToken });
}

module.exports.admin_dash = (req, res) => {
  let csrfToken = req.csrfToken();

  res.render('pages/admin_dash', { csrfToken });
}