const http = require('http')
const requestHandler  = require('./request-handler')

const server = http.createServer(requestHandler)

server.listen(3000, ()=>{
    console.log('Server to port 3000')
})

