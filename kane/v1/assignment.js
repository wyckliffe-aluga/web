const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
    const url = req.url 
    const method = req.method

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title> Create User </title></head>');
        res.write('<body><h1>Hello welcome to listserve here are some users</h1></body>');
        res.write('<body><ul><li>John Doe</li><li>Jane Doe</li><li>Mary Doe</li></ul></body>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username" id="username"><button type="submit">Create</button></form></body');
        res.write('</html>');
        return res.end();
    }
    
    if (url === '/create-user' && method === 'POST') {
        const body = []; 
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        });
        return req.on('end', () => {   
            const parsedBody = Buffer.concat(body).toString(); 
            const user = parsedBody.split('=')[1];
            fs.writeFile('user.txt', user, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                console.log(user);
                return res.end();
            });
        });
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Hello</title></head>');
    res.write('<body><h1>Hello from listserve!</h1></body>');
    res.write('</html>');
    res.end();

});

server.listen(3000);