const { MONGO_DB_URI } = require('./config');
const mongoose = require('mongoose');

const initDatabase = () => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }

<<<<<<< HEAD
  mongoose.connect(MONGO_DB_URI, options);
=======

  mongoose.connect(process.env.MONGO_DB_DEV_URI, options);

>>>>>>> cd47dcbf056f78847c225122faefc7c7804a21de

  let connection = mongoose.connection;


  connection.on('connected', () => {
    console.log("Connected successfully to Database");
  });

  connection.on('error', (err) => {
    console.log("Database Error : ", err);
  });

  connection.on('disconnected', () => {
    console.log("Database is disconnected, check your connections");
  });
}

module.exports = initDatabase;
