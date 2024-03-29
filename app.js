
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express.createServer()
  , io = require('socket.io').listen(app)
  , censorMessages = true

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

io.sockets.on('connection', function (socket) {

  // When a message is recieved
  socket.on('msg', function (data) {
    data.timestamp = new Date();
    if (censorMessages) data.msg = censor(data.msg);
    socket.emit('msg', data);
    socket.broadcast.emit('msg', data);
  });
});

function censor(msg) {
  var swears = {
    // lol a source file with naughty words
    'shit':'ship',
    'crap':'crop',
    'fuck':'funk',
    //ings
    'shitting':'shipping',
    'fucking':'funking',
    //ers
    'fucker':'funker',
    'sucker':'socker',
    //ys
    'crappy':'croppy'
  };
  
  var parts = msg.split(' ');
  for (var i = 0; i < parts.length; i++) {
    if (swears[parts[i]] != undefined) {
      parts[i] = swears[parts[i]];
    }
  }
  return parts.join(' ');
}
