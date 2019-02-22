const mongoose = require('mongoose');
const ChatModel = mongoose.model('Chat');

const connections = [];
const registeredUsers = [];

var socket = {


  setSocket: function (io) {
    io.on('connection', function (socket) {
      // if(connections.find(c => c.id === socket.id)) {
      //   console.log('user already connected... ', socket.id);
      //   return;
      // }
      // connections.push(socket);
      // console.log('user connected... %s', connections.length);

      // disconnct
      // socket.on('disconnect', function (data) {
      //   connections.splice(connections.indexOf(socket), 1);
      //   console.log('disconnected user... %s', connections.length);
      // });

      // send message
      socket.on('send message', function (data) {
        const recipient = registeredUsers.find(e => e.userID === data.to);
        const chat = new ChatModel({
          from: socket.userID,
          to: data.to,
          message: data.message,
          type: data.type || 'normal'
        });
        chat.save((err, data) => {
          if(!err) {
            if(recipient) {
              recipient.socket.broadcast.emit('new message', data);
            }
          } else {
            console.error('error saving message', err);
          }
        });
      });

      // register user
      socket.on('new user', function (data) {
        socket.userID = data.userID;
        if(registeredUsers.find(ru => ru.userID === socket.userID)) {
          console.log('user is already registered, ', socket.userID);
          return;
        }
        registeredUsers.push({userID: socket.userID, socket});
        console.log('user registered ', registeredUsers.length);
      });
    });
  },
  init: function (io) {
/*    io.on('connection', function (socket) {
      socket.on('testConnection', function (data) {
        socket.broadcast.emit('testConnectionServer', data);
      })
    });*/
  },
  send: function (instance, data) {
    socketObj.emit(instance, data);
  }
};

module.exports = socket;
