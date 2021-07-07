const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
const users={};

io.on('connection', socket =>{
    socket.on('new-user-joined',user=>{
        users[socket.id]=user;
        socket.broadcast.emit('user-joined',user);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{'message': message,'name':users[socket.id] })
    });

    socket.on('disconnect',()=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})