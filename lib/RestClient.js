import request from 'request';

const _url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/`

class RestClient {
  get(info, callback) {
    request.get(_url + info).on('response', function(res) {
      callback(res);
    });
  }
  post(info, data, callback) {
    request({
      url: _url + info,
      method: 'POST',
      formData: data
    }).on('response', function(res) {
      callback(res.statusCode == 200 ? true : false); 
    });
  }
}

export default new RestClient()