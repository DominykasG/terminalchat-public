const { Socket } = require('dgram')
const { futimesSync } = require('fs')

const cors = require('cors')
var corsOptions = {
    origin: 'http://localhost:3000'
}
const app = require('express')()
app.use(cors(corsOptions))
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:3000"
    }
  })
let users = []
io.on('connection', socket => {
    socket.on('sendmessage', ({username, message, color, roomid}) =>{
        io.in(roomid).emit('receivedmessage', {username, message, color})
        console.log(username, message, color, roomid)
    })
    socket.on('connected', ({username, roomid, currentroomid}) =>{
        socket.leave(currentroomid)
        socket.to(currentroomid).emit('userdisconnected', {username, roomid: currentroomid})
        socket.join(roomid)
        socket.to(roomid).emit('userconnected', {username, roomid})
        console.log('Connection', roomid, username)
    })
    socket.on('disconnected', ({username, currentroomid, roomid}) =>{
        socket.to(currentroomid).emit('userdisconnected', {username, roomid: currentroomid})
        socket.leave(currentroomid)
        socket.join(roomid)
        console.log(roomid)
    })
    socket.on('who', ({currentroomid}) =>{
        users = []
        io.in(currentroomid).emit('whoareyou', {currentroomid})
    })
    socket.on('sendusername', ({username, currentroomid}) =>{
        users.push(username)
        if(currentroomid != undefined)
        {
            if(users.length == io.sockets.adapter.rooms.get(currentroomid.currentroomid).size)
            {
                socket.emit('who', {users, currentroomid: currentroomid.currentroomid})
            }
        }

    })
})

http.listen(process.env.PORT || 4000, function(){
    console.log('listening port 4000')
})