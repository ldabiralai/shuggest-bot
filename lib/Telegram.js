import RestClient from './RestClient';

class Telegram {
  handleUpdate(req, callback) {
    const id = req.body.message.chat.id || "";
    const message = req.body.message.text || "";
    
    if(message.includes('/start')) {
      instance.sendMessage(id, "ShuggestBot started", function() {
        console.log(req.body.message);
        callback(204); 
      });
    } else {
      callback(204);
    }
  }
  handleNotification(shuggestion, callback) {
    const message = `New Shuggestion on shuggest.com!\n\n${shuggestion.fromfbname.split(" ")[0]} just shuggested something to ${shuggestion.fbname.split(" ")[0]} - ${shuggestion.url}`;
    instance.sendMessage(process.env.CHAT_ID, message, function(success) {
      if(!success)
        callback(500);
      else 
        callback(200);
    });
  }
  getMe(callback) {
    RestClient.get('getMe', function (res) {
      callback(res);
    });
  }
  sendMessage(id, message, callback) {
      RestClient.post('sendMessage', {chat_id: id, text: message}, callback)
  }
}

const instance = new Telegram();
export default instance;