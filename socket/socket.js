var express = require('express');
var app = express();
var morgan = require('morgan');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/static', express.static('public'));
app.use(morgan('dev'));

app.set('view engine', 'hbs');

app.get('/', function(request, response) {
  context = {title: 'Chat App'}
  response.render('chat.hbs', context)
});

// websocket block
io.on('connection', function(client){
  console.log('Connection established');

  client.on('disconnect', function() {
    console.log('Connection broken; client disconnected.')
  });

//  client.on('incoming', function(msg) {
//    io.emit('chat-msg', msg)
//  })

  client.on('join-room', function(room){
    client.join(room, function() {
      console.log(client.rooms);
      io.to(room).emit('chat-msg', '**new user joined**');
    });
    client.on('incoming', function(msg){
      io.to(msg.room).emit('chat-msg', msg.msg);
    });
  });
});

http.listen(8000, function() {
  console.log('Listening on port 8000')
});
