
var upcycler= $('.upcycler-username').text();

$(function () {
    var socket = io.connect();
    socket.emit('join',{userName:upcycler})
    $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#messages').append(`<li> ${msg} </li>`);
    });
  });

  