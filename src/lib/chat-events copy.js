import log from './log.js'
import utils from './utils.js'
import chalk from 'chalk'
import { v4, v5 } from 'uuid';

/* Variables */
var lastTime = [];
var rateLimit = [];
var currentTime = [];
var rateInterval = [];

var clients = [];
var users = {};
var bans = [];
var uid = 1;

const chatEvents = {
  connection: (conn) => {

    // console.log(conn)
    console.log('conn.id : ', conn.id)
    
    // log('info', v5('https://www.google.com', v5.URL));
    // log('info', v4());

    log('socket', chalk.underline(conn.id) + ': connected (' + conn.headers['x-forwarded-for'] + ')');
    rateLimit[conn.id] = 1;
    lastTime[conn.id] = Date.now();
    currentTime[conn.id] = Date.now();

    clients[conn.id] = {
      id: uid,
      un: null,
      ip: conn.headers['x-forwarded-for'],
      role: 0,
      con: conn,
      warn: 0
    };

    users[uid] = {
      id: uid,
      oldun: null,
      un: null,
      role: 0
    };

    for (i in bans) {
      if (bans[i][0] == clients[conn.id].ip) {
        if (Date.now() - bans[i][1] < bans[i][2]) {
          conn.write(JSON.stringify({ type: 'server', info: 'rejected', reason: 'banned', time: bans[i][2] }));
          return conn.close();
        } else {
          bans.splice(i);
        }
      }
    }

    conn.write(JSON.stringify({ type: 'server', info: 'clients', clients: users }));
    conn.write(JSON.stringify({ type: 'server', info: 'user', client: users[uid] }));
    conn.on('data', function (message) {
      console.log('data onon : ', message)



      currentTime[conn.id] = Date.now();
      rateInterval[conn.id] = (currentTime[conn.id] - lastTime[conn.id]) / 1000;
      lastTime[conn.id] = currentTime[conn.id];
      rateLimit[conn.id] += rateInterval[conn.id];

      if (rateLimit[conn.id] > 1) {
        rateLimit[conn.id] = 1;
      }

      if (rateLimit[conn.id] < 1 && JSON.parse(message).type != 'delete' && JSON.parse(message).type != 'typing' && JSON.parse(message).type != 'ping') {
        clients[conn.id].warn++;

        if (clients[conn.id].warn < 6) {
          return conn.write(JSON.stringify({ type: 'server', info: 'spam', warn: clients[conn.id].warn }));
        } else {
          bans.push([clients[conn.id].ip, Date.now(), 5 * 1000 * 60]);
          utils.sendToAll(clients, { type: 'ban', extra: clients[conn.id].un, message: 'Server banned ' + clients[conn.id].un + ' from the server for 5 minutes for spamming the servers' });

          return conn.close();
        }
      } else {
        try {
          var data = JSON.parse(message);

          if (data.type == 'ping') {
            return false;
          }

          if (data.type == 'typing') {
            return utils.sendToAll(clients, { type: 'typing', typing: data.typing, user: clients[conn.id].un });
          }

          if (data.type == 'delete' && clients[conn.id].role > 0) {
            utils.sendToAll(clients, { type: 'server', info: 'delete', mid: data.message });
          }

          if (data.type == 'update') {
            return updateUser(conn.id, data.user);
          }

          if (data.message.length > 768) {
            data.message = data.message.substring(0, 768);
            message = JSON.stringify(data);
          }

          if (data.type == 'pm') log('message', chalk.underline(clients[conn.id].un) + ' to ' + chalk.underline(data.extra) + ': ' + data.message);
          else log('message', '[' + data.type.charAt(0).toUpperCase() + data.type.substring(1) + '] ' + chalk.underline(clients[conn.id].un) + ': ' + data.message);

          handleSocket(clients[conn.id], message);
        } catch (err) {
          return log('error', err);
        }

        rateLimit[conn.id] -= 1;
      }
    });

    conn.on('close', function () {
      log('socket', chalk.underline(conn.id) + ': disconnected (' + clients[conn.id].ip + ')');
      utils.sendToAll(clients, { type: 'typing', typing: false, user: clients[conn.id].un });
      utils.sendToAll(clients, { type: 'server', info: 'disconnection', user: users[clients[conn.id].id] });
      delete users[clients[conn.id].id];
      delete clients[conn.id];
    });
  }
}

export default chatEvents