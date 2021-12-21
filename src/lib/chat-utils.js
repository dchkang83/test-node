import * as http from 'http'

import constants from './constants.js'
import log from './log.js'
import chatApi from './chat-api.js'

const chatUtils = {
  channels: {
    // 'buyer0-seller0': {
    //   'sockets': []
    // },
    // 'buyer1-seller1': {
    //   'sockets': []
    // }
  },
  clients: [
  ],
  join : (socket, params) => {
    const {buyer_no, seller_no, user_type} = params
    const channel_id = `${buyer_no}-${seller_no}`
    
    // log('info', `buyer_no : ${buyer_no}`)
    // log('info', `seller_no : ${seller_no}`)
    // log('info', `channel_id : ${channel_id}`)
    // log('info', `socket : ${socket}`)
    // log('info', `FIRST chatUtils.channels : ${JSON.stringify(chatUtils.channels)}`)

    log('info', `socket.id : ${socket.id}`)

    console.log(Object.keys(chatUtils.channels))
    
    if (Object.keys(chatUtils.channels).includes(channel_id) === true) {
      // 기존 채널
      let channelSockets = chatUtils.channels[channel_id].sockets
      if (Object.keys(channelSockets).includes(socket.id) === false) {
        channelSockets[socket.id] = socket
      }
    } else {
      // 신규 채널
      chatUtils.channels[channel_id] = {sockets: []}
      chatUtils.channels[channel_id].sockets[socket.id] = socket
    }
    
    log('info', `LAST chatUtils.channels : ${chatUtils.channels}`)
    console.log(chatUtils.channels)
    // log('info', JSON.stringify(chatUtils.channels))


    chatUtils.clients[socket.id] = {
      channel_id: channel_id,
      user_type: user_type,
      buyer_no: buyer_no,
      seller_no: seller_no,
      socket: socket,
      ip: socket.headers['x-forwarded-for']
    }
    
    return channel_id
  },
  send: (socket, params) => {    
    // TODO. API 호출 (데이터 전송)
    // chatApi.send()

    

    // 전체 전송
    chatUtils.sendAll(socket, params)
  },
  close: (socket) => {
    const channel_id = chatUtils.clients[socket.id].channel_id

    // 채널 소켓 삭제
    delete chatUtils.channels[channel_id].sockets[socket.id]

    // 클라이언트 삭제
    delete chatUtils.clients[socket.id]

  },



  
  sendAll: (socket, params) => {
    const this_client = chatUtils.clients[socket.id]
    const channel_id = this_client.channel_id

    log('info', `channel_id : ${channel_id} / message: ${params['message']}`)

    const sockets = chatUtils.channels[channel_id].sockets



    for(const key in sockets) {
      // if(clients[client].role > 1 && (data.info === 'connection' || data.info === 'disconnection')) {
      //     data.user.ip = module.exports.getUserByID(clients, data.user.id).ip;
      // } else if(data.user) {
      //     delete data.user.ip;
      // }

      // clients[client].con.write(JSON.stringify(data));

      // socket.con.write(JSON.stringify(params));

      // console.log('key : ', key)
      // console.log('testSockets[key] : ', testSockets[key])
      let socket_client = chatUtils.clients[key]

      console.log(`this_client.user_type : ${this_client.user_type} // socket_client.user_type : ${socket_client.user_type}`)
      console.log(`this_client.buyer_no : ${this_client.buyer_no} // socket_client.buyer_no : ${socket_client.buyer_no}`)


      // if (socket.id !== key) {
        // 자기자신은 제외하고
        // console.log('go : ', key)
        // sockets[key].write(JSON.stringify(params));

        if (this_client.user_type === socket_client.user_type && this_client.buyer_no === socket_client.buyer_no) {
          console.log('같아!!!')
          sockets[key].write(JSON.stringify({
            type:'server',
            info:'message',
            method: 'send',
            message:params['message']
          }));
        } else {
          sockets[key].write(JSON.stringify({
            type:'server',
            info:'message',
            method: 'receive',
            message:params['message']
          }));
  
        }



      // }
    }
  }
}

export default chatUtils