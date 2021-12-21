import url from 'url'
import chalk from 'chalk'
import { v4, v5 } from 'uuid'

import constants from './constants.js'
import log from './log.js'
import utils from './utils.js'
import chatUtils from './chat-utils.js'


const chatEvents = {
  connection: (socket) => {
    log('socket', chalk.underline(socket.id) + ': connected (' + socket.headers['x-forwarded-for'] + ')');
    
    const params = url.parse(socket.url, true).query;
    log('info', `seller_no : ${params.seller_no}`)
    

    // socket.write(JSON.stringify({ type: 'server', info: 'clients', clients: users }));
    // socket.write(JSON.stringify({ type: 'server', info: 'user', client: users[uid] }));
    socket.on('data', (message) => {

      console.log('###########################')
      console.log('ORIGINAL message : ', message)

      const params = JSON.parse(message)

      log('info', `type : ${params.type}`)
      switch (params.type) {
        case constants.CONNECT:
          const channel_id = chatUtils.join(socket, params)
          console.log('server', `channel_id : ${channel_id}`)

          break;
        case constants.SEND:
          // TODO. 작업중
          chatUtils.send(socket, params)
          
          break;
        case constants.TYPING:
          
          break;
      }
    });

    socket.on('close', () => {
      if (chatUtils.clients.hasOwnProperty(socket.id) === true) {
        log('socket', `${chalk.underline(socket.id)} : disconnected ( ${chatUtils.clients[socket.id].ip} )`);
        chatUtils.close(socket)
      }
    });
  }
}

export default chatEvents