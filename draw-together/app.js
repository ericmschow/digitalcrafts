var express = require('express');
var app = express();
var morgan = require('morgan');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/static', express.static('public'));
app.use(morgan('dev'));

app.set('view engine', 'hbs');

app.get('/', function(request, response) {
  context = {title: 'Draw Your Heart Out'}
  response.render('chat.hbs', context)
});

class Users {
  constructor (){
    this.names = new Object;
  }
}

users = new Users();

// websocket block
io.on('connection', function(client){
  console.log('Connection established with ', client.id);
  //client.send(client.id);
  client.on('disconnect', function() {
    console.log('Connection broken; client disconnected.')
  });

//  client.on('incoming', function(msg) {
//    io.emit('chat-msg', msg)
//  })

  client.on('join-room', function(room, username){
    client.join(room, function() {
      //console.log(client.rooms);
      let msg = {msg: '**new user '+ username +' joined**', user: 'SERVER'}
      io.to(room).emit('chat-msg', msg);
      users.names.id = username;
    });
    client.on('incoming', function(msg){
      io.to(msg.room).emit('chat-msg', msg);
    });
  });

  client.on('nick-change', function(id, old_username, new_username){
    console.log(id); console.log(old_username); console.log(new_username);
    if (new_username.toLowerCase() == 'server') {
      let msg = {msg: 'Sorry, you cannot impersonate the server.', user: 'SERVER'};
      client.emit('chat-msg', msg);
    }
    else if (new_username.replace(/\s+/g, '') === ''){
      let msg = {msg: 'Sorry, you must enter a name.', user: 'SERVER'};
      client.emit('chat-msg', msg);
    }
    else if (new_username.replace(/\s+/g, '') === 'Null') { // TODO add unique user enforcement
      let msg = {msg: 'Sorry, you must exist.', user: 'SERVER'};
      client.emit('chat-msg', msg);
    }
    else {
      users.names.id = new_username;
      let msg = {msg: old_username + ' has changed names to ' + new_username, user: 'SERVER'}
      io.emit('chat-msg', msg);
      client.emit('nick-change-success', new_username, users.names)
    }
  })

  client.on('draw-to-server', function(past, current, color){
    io.emit('draw-to-client', past, current, color)
  })
});

http.listen(8000, function() {
  console.log('Listening on port 8000')
});
