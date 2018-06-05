require('./config/db');
const config = require('./config/config');
const app = require('./config/express');
const socket = require('socket.io');
var user = {};

if (!module.parent) {
  // listen on port config.port
  var server = app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });

  const io = socket(server);

  io.on('connection', (socketCon) => {
    console.log(`Connection has been established: ${socketCon} `); // eslint-disable-line no-console
    console.log(socketCon.handshake.query);
    let device = socketCon.handshake.query.device;
    let location = socketCon.handshake.query.location;

    //check whether device for that location exists.
    var found = false;
    if (!(location in user)) {
      user[location] = [{
        id: socketCon.id,
        device: device,
        location: location
      }];
    } else {
      if (user[location]) {
        // check if it as same device
        let sameDev = -1;

        let l = user[location];
        for (let i = 0; i < l.length; i++) {
          if (l[i].device == device) {
            sameDev = i;
            break;
          }
        }

        if (sameDev === -1) {
          user[location].push({
            id: socketCon.id,
            device: device,
            location: location
          })
        } else if (sameDev > -1) {
          var d = user[location][sameDev];
          if (d) {
            user[location][sameDev].id = socketCon.id;
          }
        }

      }
    }
    console.log(JSON.stringify(user));
    socketCon.on('disconnect', () => {
      console.log("Socket got disconnected");
    });

    socketCon.on('customer-scanned', function (data) {
      console.log("IN customer-scanned");
      console.log(data);
      console.log(typeof(data));
      let location = data.location;
      var socs = user[location];
      console.log(socs);
      // if(socs.length >1){
        for(let j=0;j<socs.length;j++){
          if(socs[j].device == 'TV'){
            console.log("Got Socket");
            let socid = socs[j].id;
            console.log(socs[j]);
            console.log(socid);
            if(socid){
              io.sockets.connected[socid].emit('display-scanned',data);
              //socketCon.broadcast.to(socid).emit(data);
              // io.to(socid).emit('display-scanned',data);
            }
            break;
          }
        // }
      }
      
  
    });
  });
}

module.exports = app;
