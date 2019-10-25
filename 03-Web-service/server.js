var	http = require('http'),
	url = require('url'),
	server = http.createServer();

server.on('request', function (req, res) {
	/*First we analyse the request*/
	console.log("--Incomming Request--");
	/*Above String will be displayed on console when we send
	a request into server using broser API or something*/
	var incommingUrl = url.parse(req.url, true);
	/*url.parse() is the method in Node url package to catch
	the url requesting by reciewer. 
	Parameters:
		1: the url included in request
		2: the boolean value refer to convert the quiries in
		   the requesting URL into a JavaScript object. default
		   value is false and we have to pass "true" if we want
	*/
	console.log(incommingUrl);

	/*Then we consider the response according to the request*/
	//res.writeHead(200, {'Content-Type': 'text/plain'});
	/*Above content type could be 
		text/json
		text/html
		text/xml
	etc..*/
	//res.end('Hello World...!');

	if(incommingUrl.path === "/hello"){
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Hello World...!');
	} else if(incommingUrl.path === "/goodbye"){
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Goodbaye World...!');
	} else {
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.end('Resource not found on this server...!');
	}
});

server.listen(9000);