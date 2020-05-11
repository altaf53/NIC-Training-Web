const { MONGO_DB_URI } = require('./config');
const mongoose = require('mongoose');

const initDatabase = () => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }

  mongoose.connect(MONGO_DB_URI, options);

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
