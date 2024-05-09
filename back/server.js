const http = require('http')
const app = require('./app')
const sql = require('mssql');
const config = require('./connection');

const port = process.env.PORT || 3005

const server = http.createServer(app)







sql.connect(config).then(() => {
    server.listen(port, function(error){
        if(error){
            console.error('Error', error);
        } else {
            console.log('Connected to SQL Server');
            console.log("Server is runing on Port", port);
            console.log(`Local url: http://localhost:${port}`);
            console.log();
        }
    })
}).catch(err => {
    console.error('Error connecting to SQL Server:', err);
});
