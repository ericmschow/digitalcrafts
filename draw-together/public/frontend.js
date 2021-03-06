var server = io();
var username = 'default';

// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'canvas-container', { preload: preload, create: create, update: update, render: render });
// game.state.add('main', mainState);
// game.state.start('main');

// var circles = []
// function preload() {
// }

// function p(pointer) {
//   //console.log(pointer.event);
//   circle = new Phaser.Circle(pointer.x, pointer.y, 60)
//   circles.push({circle: circle, color: '#00DDDD'})
// }

// function create() {
//   game.stage.backgroundColor = '#FFFFFF';
//
//   // game.input.addMoveCallback(p, this);
//
// }
//
// function update() {
// }
//
// function render() {
//   if (game.input.activePointer.isDown){
//     circle = {circle: game.input.activePointer.circle, color: color};
//     console.log(color)
//     circles.push(circle)
//   }
// y
//
//   circles.forEach(function(circle) {
//     game.debug.geom(circle.circle, circle.color)
//   })
// };

server.on('connect', function(s, list) {
  console.log('connected');
  username = 'Anon_'+(server.id)[0]+(server.id)[1]+(server.id)[2]
  document.getElementById("label_name").innerHTML = username;
  //console.log(username)
  var url = new URL(location.href);
  room = url.searchParams.get('room') || 'main-room';
  server.emit('join-room', room, username);

  //update_online_users(list);

});

server.on('chat-msg', function(msg){
  var chat = document.getElementById('chat-box');
  //chat.insertAdjacentHTML('beforeend', '\n' + msg);
  //console.log(msg);
  //chat.appendChild(msg.toString());
  var line = $('<li><span class="username">' + msg.user + ': </span>' + msg.msg + '</li>').hide()
  $('#chat-box').append(line);
  line.show('fast');
  if ($('#chat-box li').length > 35){
    var old = $('#chat-box li:first')
    old.hide('fast');
    old.remove();
  }
  $("#chat-box").scrollTop($("#chat-box")[0].scrollHeight);
});

server.on('nick-change-success', function(new_name, list){
  username = new_name;
  document.getElementById("label_name").innerHTML = username;
  document.getElementById('nickfield').value = ''
  //update_online_users(list);
})
server.on('draw-to-client', function(past, current, color){
  server_flag = true;
  draw(past, current, color, server_flag)
});

server.on('draw-to-client-touch', function(current, color){
  server_flag = true;
  draw_touch(current, color, server_flag)
});

// CHAT FUNCTIONS

function change_username(event){
  var char = event.which || event.keyCode;
  if (char == '13' || event.type == 'click') {
    var new_username = document.getElementById('nickfield').value;
    let old_username = username
    //console.log('Username change called')
    server.emit('nick-change', server.id, old_username, new_username)
  }
}

function send_message(event) {
  //console.log(document.cookie)
  var char = event.which || event.keyCode;
  if (char == '13' || event.type == 'click') {
    var msg = document.getElementById('message');
    //server.emit('incoming', msg.value);
    server.emit('incoming', {room: room, msg: msg.value, user: username})
    msg.value = '';
  }
}

function update_online_users(online_list) {
  console.log(online_list)
  var list_element = document.getElementById('online-users');
  for (i = 0; i < online_list.length; i++){
    // updating online users

    var user = $('<li>'+ online_list[i].id + '</li>')//.hide()
    $('#online-users').append(user);
  //  user.show('fast');
  }
};

// DRAWING FUNCTIONS
var canvas;
var canvasjq;
var ctx;
var past;
var current;
var touched_points = new Array;
var color = 'blue';
var size = 9 //default button 3 * 3 since function change_size is not called yet

function change_color(input){
  color = input;
};

function change_size(input){
  size = 3 * input
}

function draw (past, current, color_in, server_flag) {
  color = color_in
  ctx.lineWidth=size;
  ctx.beginPath();
  ctx.moveTo(past[0], past[1]);
  ctx.strokeStyle = color;
  ctx.quadraticCurveTo(
    past[0], past[1],
    current[0], current[1]
  );
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.ellipse(past[0], past[1], size/2, size/2, 0, 0, 2*Math.PI, false);
  ctx.ellipse(current[0], current[1], size/2, size/2, 0, 0, 2*Math.PI, false);
  ctx.fill();
  ctx.closePath();
  // line = new Phaser.Line(past[0], past[1], current[0], current[1])

  if (!server_flag){
    server.emit('draw-to-server', room, past, current, color)}
};

function draw_touch (current, color_in, server_flag) {
  color = color_in;
  ctx.beginPath();
  ctx.fillStyle = color;
  console.log(touched_points)
  point = touched_points.shift();
  point2 = touched_points[0];
  console.log(point, point2)
  ctx.ellipse(current[0], current[1], size/2, size/2, 0, 0, 2*Math.PI, false);
  ctx.fill();
  ctx.lineWidth=size;
  ctx.beginPath();
  ctx.moveTo(point[0], point[1]);
  ctx.strokeStyle = color;
  ctx.quadraticCurveTo(
    point[0], point[1],
    point2[0], point2[1]
  );
  ctx.stroke();
  ctx.closePath();
  // line = new Phaser.Line(past[0], past[1], current[0], current[1])

  if (!server_flag){
    server.emit('draw-to-server-touch', room, current, color)}
};

$(document).ready(function(){
  canvas = document.querySelector('canvas');
  canvasjq = $('canvas');
  ctx = canvas.getContext('2d');
  mouse_down = false;

  var rect = canvas.getBoundingClientRect();




  var h = canvasjq.height();
  var w = canvasjq.width();

  canvasjq.attr('height', h);
  canvasjq.attr('width', w);



  canvas.addEventListener('mousedown', function(event){
    mouse_down = true;
  });

  canvas.addEventListener('touchstart', function(event){
    current = [(event.touches[0].clientX - rect.left), (event.touches[0].clientY - rect.top)];
    touched_points.push(current)
  })

  canvas.addEventListener('mouseup', function(event){
    mouse_down = false;
    past = [];
  });

  canvas.addEventListener('touchend', function(event){
    touched_points = []

  });

  canvas.addEventListener('mousemove', function(event){
    if (mouse_down) {
    //  console.log(event.offsetX, event.offsetY, event);
      current = [event.offsetX, event.offsetY];
      if (past) {
        server_flag = false;
        draw(past, current, color);
      }
      past = [event.offsetX, event.offsetY];
    }
  });

  canvas.addEventListener('touchmove', function(event){
    current = [(event.touches[0].clientX - rect.left), (event.touches[0].clientY - rect.top)];
    server_flag = false;
    touched_points.push(current)
    draw_touch(current, color);
  });
});
