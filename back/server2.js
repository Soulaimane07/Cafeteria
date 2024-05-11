const http = require('http')
const app = require('./app2')

const port = process.env.PORT || 3005

const server = http.createServer(app)

server.listen(port, function(error){
    if(error){
        console.log('Error', error);
    } else {
        console.log("Server Mongo is runing on Port", port);
        console.log(`Local url: http://localhost:${port}`);
    }
})