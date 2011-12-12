
//    recieve message from server

function receiveMessage (data) {
  var parts = data.msg.split(' ');
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].search('http://') != -1) {
      parts[i] = '<a target="_blank" href="' + parts[i] + '">' + parts[i] + '</a>';
    }
  }
  data.msg = parts.join(' ');
  $('<p title="' + data.timestamp + '"><span style="color:' + data.color + ';font-weight:bold">' + data.sender + '</span>: ' + data.msg + '</p>').hide().prependTo("#chat").slideDown("fast");
}


//    send message to server

function sendMessage () {
  event.preventDefault();
  socket.emit('msg', { 'color': $('#color').val(), 'sender': $('#name').val(), 'msg': $('#msg').val() });
  $('#msg').val('');
};


//    listeners 'n' stuff

$('document').ready(function() {
  $('#color').focus();
  $('#send').click(sendMessage);
});
var socket = io.connect('http://shiny-linux.local');
socket.on('msg', receiveMessage);


//    notifies user of connection status

socket.on('connect', function () {
  $('#status').html('connected');
  $('#status').css('color', '#0f0');
});
socket.on('disconnect', function () {
  $('#status').html('disconnected');
  $('#status').css('color', '#f00');
});
socket.on('reconnecting', function () {
  $('#status').html('reconnecting...');
  $('#status').css('color', '#fff');
});
