const io = require('socket.io')(8800, {
  cors: {
    origin: "http://localhost:5173",
  }
});

let activeUsers = [];
io.on("connection", (socket) => {
  console.log('Connected:');

  socket.on('new_user', (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id
      });
    }
    io.emit('get_users', activeUsers);
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit('get_users', activeUsers);
  });

  socket.on('typing',(data)=>{
    socket.broadcast.emit('typin_status',{...data,status:data})
    })

    socket.on('stop_typing',()=>{
        socket.broadcast.emit('typin_status_stop',{status:false})
    })

  socket.on('sendMessage', (data) => {
    const { resiverId } = data; // Assuming you have a 'message' property
    const user = activeUsers.find((user) => user.userId === resiverId);
    if (user) {
      io.to(user.socketId).emit('recieve-message',{...data,created_at:new Date(),isRead:false});
    } else {
      console.log(`User ${resiverId} not found`);
    }
  });
});
