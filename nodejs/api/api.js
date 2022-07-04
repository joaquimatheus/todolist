const path = require('path');
const fs = require('fs');

require('../../dotenv');

const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origins', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') { return res.end(); }

    res.end()
});

server.listen({
    host: 'localhost',
    port: process.env.HTTP_SERVER_PORT
}, () =>  {
    console.log(`server is running =) in ${process.env.API_PORT} `)
})
