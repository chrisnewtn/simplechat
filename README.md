# Simple Chat

I wanted to see how quickly I could code a chat server with sockets. I've never used node.js before and this took me about 2 hours to figure out completely. 

Obvously it's still far from perfect, but it gives you some idea as to how parts of socket.io, node and express work I suppose.


## How to run

cd into the directory and type:

`node app.js`

accessible @ localhost:3000


## Note

If you want to get this running with clients connecting from other hosts you will need to change

`var socket = io.connect('http://localhost');`

in public/javascripts/script.js to the address of your server. There's probably an easy way I could code around this, but what the hell.
