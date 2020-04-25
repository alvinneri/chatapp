const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const router = require('./router');
const cors = require('cors');
const Message = require('./models/messageModels');

const app = express();
// const server = http.createServer(app);
const io = socketio(app);

const {addUsers, removeUser ,getUser} = require('./users');

// Serving react
const path =require('path')

const db = `mongodb+srv://Alvin:${'Binbai13'}@testcluster1-74rc4.mongodb.net/ChatApp?retryWrites=true&w=majority`

mongoose.connect(db, {useCreateIndex: true, useNewUrlParser: true , useUnifiedTopology: true});
const connection = mongoose.connection
connection.once('open', ()=>{console.log(`Mongodb is connected`)})

app.use(cors());
app.use(express.json());

// Using Socket Io
io.on('connection', (socket)=>{
   
    socket.on('login',({username} , callback) => {
        
        const {user} = addUsers({id: socket.id,username: username });

        socket.emit('message', {user:'admin', message: `${user.username} welcome to the chatroom`});
        socket.broadcast.to('chatroom').emit('message', {user:'admin',message: `${username} has joined the chatroom`});

        socket.join('chatroom');
        
    })

    socket.on('sendMessage', (message, callback) => {
        
        const user = getUser(socket.id);
        
        // Save messages to DB
        const messagedb = new Message ({
            username: user.username,
            message: message
        })
        messagedb.save();
        // 
        
        io.to('chatroom').emit('message',{user: user.username, message: message});

        callback();
    });


    socket.on('disconnect', ()=>{
     const user = removeUser(socket.id);
     
    });
});

app.use(router);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "client", "build")))
   
    
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

}

app.listen(PORT, ()=> { console.log(`Server has started on port ${PORT}`);
});