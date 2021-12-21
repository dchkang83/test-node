process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';

if (process.env.NODE_ENV == 'production') {
  console.log("Production Mode");
} else if (process.env.NODE_ENV == 'development') {
  console.log("Development Mode");
}

import path from 'path' // to serve public dir, path는 core node module이라 install not required
import express from 'express'
import sockjs from 'sockjs'
import fs from 'fs'
import chalk from 'chalk'
import * as http from 'http';
import https from 'https'
import cors from 'cors'


import config from './config/config.js'
import log from './lib/log.js'
import utils from './lib/utils.js'
import chatEvents from './lib/chat-events.js'

import routers from './routes/index.js'

const app = express()
const PORT = process.env.PORT || config.port
let server;
// const publicDirectoryPath = path.join(__dirname, '../public')


cors
// 모든도메인 허용
app.use(cors());
// 특정도메인 허용
let corsOptions = {
  origin: 'http://ezp.cafe24test.com',
  credentials: true
}
app.use(cors(corsOptions));

// const corsOptions = {
//   origin: "*",
//   optionsSuccessStatus: 200,
//   credentials: true
// };
// app.use(cors(corsOptions));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://ezp.cafe24test.com");
//   // res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
//   next();
// });


// ROUTERS
app.use('/', routers.index);



if (config.ssl.use === false) {
  console.log('no ssl')

  // import * as http from 'http'
  // const http = require('http');
  server = http.createServer(app);
} else {
  console.log('ssl')

  const opt = {
    key: fs.readFileSync(config.ssl.key),
    cert: fs.readFileSync(config.ssl.cert)
  };
  server = https.createServer(opt, app);
}

// server.listen(port);
server.listen(PORT, '0.0.0.0', () => {
  console.log(`server on port ${PORT}!`);
})

// event section
server.on('listening', (args) => {
  console.log(`server listening ${PORT}`);
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('start', 'Listening at ' + bind);
});
server.on('error', (error) => {
  console.log('server error', error);
});



var sockjs_server = sockjs.createServer();
sockjs_server.installHandlers(server,
  {
    prefix: '/socket.io',
    log: function () { }
  }
);





// sockjs_server.on('connection', function (conn) {
//   console.log('connection');

//   conn.on('data', function (message) {
//     console.log('DATA', message);
//     conn.write(message);
//   });

//   conn.on('close', function () {
//     console.log('CLOSE');
//   });
// });


/* Logic */
sockjs_server.on('connection', chatEvents.connection);





