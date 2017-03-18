var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var math = require('math-expression-evaluator');
var tools = require('./messages.js');

// var messages = [];

app.get('/', function(req, res){
  res.send('This page was reached in error!');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('equation', function(eq) {
    console.log('client submitted: ' + eq)
  });
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('get-all', function(x) {
    console.log('client requested all');
    io.emit('give-all', tools.addCalc(math.eval(x)));
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
