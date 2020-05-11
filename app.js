const express = require('express');
const initRoutes = require('./routes/index');
const initDatabase = require('./bin/config/database');
const initMiddleware = require('./bin/config/middleware');
const createError = require('http-errors');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let onlineMembers = {

}
io.on('connection', socket => {

  socket.on('onlineMember', (name, id) => {
    console.log(name, id, "APP");
    onlineMembers[socket.id] = {
      name,
      id
    };
    console.log(onlineMembers);

    io.emit('memberData', onlineMembers);
    // socket.emit('memberData', onlineMembers);

  });




  socket.on('disconnect', () => {
    console.log(onlineMembers);
    delete onlineMembers[socket.id];
    console.log('del', onlineMembers);
    io.emit('memberData', onlineMembers);

  })

});

initDatabase();

initMiddleware(app);

initRoutes(app);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


server.listen(3010);
module.exports = app;
