
//必要なモジュールを読み込む
var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');

//HTTPサーバを生成する
var server = http.createServer(function(req, res) {
	res.writeHead(200,{'Content-Type': 'text/html'});
	process.chdir('..');
	res.end(fs.readFileSync(process.cwd() + '\\index.html', 'utf-8'));
	process.chdir(__dirname);

	console.log('コンソールだよ : \\index.html');

}).listen(3000); //ポート競合の場合は値を変更

//HTTPサーバにソケットを紐付ける(WebSocket有効化)
var io = socketio.listen(server);

//connectionイベント・データを受信する
io.sockets.on('connection', function(socket) {

	//client_to_serverイベント・データを受信する
	socket.on('client_to_server', function(data) {

		//server_to_clientイベントデータを送信する
		io.sockets.emit('server_to_client', {value : data.value});
	});
});

