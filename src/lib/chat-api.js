import * as http from 'http'

import log from './log.js'
import constants from './constants.js'

const chatApi = {
  test111: {
    
  },
  send : () => {
    try {
      var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "ezp-service-id": "ezp-node",
        "ezp-current-timestamp": "1639494000",
        "ezp-signature": "1a066fe7c7eade79b712810bb970e7f1" // DEV
      };

      var options = {
        host: 'ezp.cafe24test.com',
        port: 80,
        path: '/api/v2/chat/send',
        method: 'POST',
        headers: headers
      };

      var data = {
        aaa: 'aaa111'
      };

      var req = http.request(options, function(res) {
        res.setEncoding("utf8");

        // console.log('STATUS: ' + res.statusCode);
        // console.log(res)

        res.on('data', function(data) {          
          console.log(JSON.parse(data));
        });
      });
    
      req.on('error', function(e) {
        console.log("ERROR:");
        console.log(e);
      });
    
      req.write(JSON.stringify(data));
      req.end();




    } catch(err) {
      return log('error', err);
    }
  }
}

export default chatApi