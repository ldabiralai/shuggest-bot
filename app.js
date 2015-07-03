import babel from 'babel/register';
import express from 'express';
import Telegram from './lib/Telegram';
import bodyparser from 'body-parser';

const app = express();

app.use(bodyparser.json());

app.get('/', (_, res) => {
  res.send('OK');
});

app.get('/me', (_, res) => {
  Telegram.getMe(function(me) {
    res.send(me)
  });
});

app.post('/hook', (req, res) => {
  console.log("ARGH. SOMETHING'S HIT ME");
  Telegram.handleUpdate(req, function (status) {
    res.status(status).send();
  });
});

app.post('/', (req, res) => {
  const shuggest = req.body;
  Telegram.handleNotification(shuggest, function(status) {
    res.status(status).send();
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('listening..');
});