const { db, seedDB } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')
const ws = require('ws');

let sockets = [];

const init = async () => {

  try {
    if(process.env.SEED === 'true'){
      await seedDB();
    }
    else {
      await db.sync()
    }
    const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))

    const socketServer = new ws.Server({ server });
    socketServer.on('connection', (socket, req) => {
      console.log('received a connection from', req.socket.remoteAddress);
      sockets.push(socket);
      console.log(sockets.length, 'connections so far');
 
      socket.on('close', (socket) => {
        sockets = sockets.filter((s) => s !== socket);
      });

      socket.on('message', (msg) => {
        console.log('received msg from client - broadcasting to all:', msg)
//        sockets.forEach(c => c != socket && c.send((msg))) // send msg to other clients only
        sockets.forEach(c => c.send((msg))) // send msg to all clients including the sender
      });
})

  } catch (ex) {
    console.log(ex)
  }
}

init()