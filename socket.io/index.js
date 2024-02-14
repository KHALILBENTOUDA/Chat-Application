const io = require('socket.io')(8800,{
  cors: {
    origin: ["http://localhost:5173", "https://matcha-api-szde.onrender.com"],
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

  socket.on('sendMessage', (data) => {
    const { resiverId } = data; // Assuming you have a 'message' property
    const user = activeUsers.find((user) => user.userId === resiverId);


    if (user) {
      io.to(user.socketId).emit('recieve-message',{...data,isRead:false,created_at:new Date()});

    } else {
      console.log(`User ${resiverId} not found`);
    }
  });
});
