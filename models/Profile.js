const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const profileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  instituteName: {
    type: String,
    required: true
  },
  instituteAddress: {
    type: String,
    required: true
  },
  instituteContact: {
    type: String,
    required: true
  },
  studentPermanentAddress: {
    type: String,
    required: true
  },
  studentContact: {
    type: String,
    required: true
  },
  caste: {
    type: String,
    enum: ['ST', 'SC', 'OBC', 'GENERAL', 'OTHERS']
  },
  degree: {
    type: String,
    required: true
  },
  firstSem: {
    type: String,
    required: true
  },
  secondSem: {
    type: String,
    required: true
  },
  thirdSem: {
    type: String,
    required: true
  },
  fourthSem: {
    type: String,
    required: true
  },
  fifthSem: {
    type: String,
    required: true
  },
  sixthSem: {
    type: String,
    required: true
  },
  seventhSem: {
    type: String,
    required: true
  },
  eighthSem: {
    type: String,
    required: true
  },
  courseStatus: {
    type: String,
    // enum: ['ft', 'pt', 'cp'],
    required: true

  },
  traineeSemester: {
    type: String,
    // enum: ['January', 'July'],
    required: true

  },
  projectDuration: {
    type: String,
    required: true
  },
  projectStartDate: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Profile', profileSchema);