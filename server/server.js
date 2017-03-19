var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var tools = require('./messages.js');

// var messages = [];

app.get('/', function(req, res){
  res.send('This page was reached in error!');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('equation', function(exp) {
    console.log('client submitted: ' + exp);
    var result = tools.evaluate(exp);
    if (result === 'err') {
      socket.emit('invalid expression', exp);
    } else {
      io.emit('update', tools.addCalc(exp, result));
    }
  });

  socket.on('get all', function(x) {
    socket.emit('return all', tools.getCalculations());
  });

  socket.on('disconnect', function() {
    console.log('User Disconnected');
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
