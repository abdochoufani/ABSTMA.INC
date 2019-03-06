var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};


socketApi.io = io;


io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
});


io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        debugger
            console.log(msg)
            io.sockets.emit('chat message', msg);
    });
  });


module.exports = socketApi;
