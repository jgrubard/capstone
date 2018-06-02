const express = require('express');
const app = express();
const { conn } = require('./db');
const path = require('path');
const socketio = require('socket.io');
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`I'm listening on port ${port}.`));
const io = socketio(server);
const webAppSockets = {};
const mobileSockets = {};
require('dotenv').config();

app.use(require('body-parser').json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/api', require('./routes'));

conn.sync();

io.on('connection', socket => {
  socket.on('mobileOnline', userId => {
    mobileSockets[userId] = socket.id;
  });
  socket.on('webAppOnline', userId => {
    webAppSockets[userId] = socket.id;
    console.log(webAppSockets);
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(err);
});

module.exports = {
  io,
  webAppSockets,
  mobileSockets
}
