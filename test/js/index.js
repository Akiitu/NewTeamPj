//var server = require('ws').Server;
//var s = new server ({port: 5001});

var http = require('http').createServer(handler);
var html = require('fs').readFileSync('../index.html');

function handler(request, response) {
	response.writeHead(200,{'Content-Type': 'text/html'});
	response.end(html);
}

http.listen(3000);

var io = require('socket.io')(http);

io.on('connection', function(socket){

	socket.on('chat', function(msg){
		io.emit('chat', msg);
	});
});

/*s.on('connection', function(ws){

	ws.on('message', function(message) {
		s.clients.forEach(function(client){
			client.send(message + ' : ' + new Date());
		});
	});

	ws.on('close', function(){
		console.log('I lost a client');
	});

});*/