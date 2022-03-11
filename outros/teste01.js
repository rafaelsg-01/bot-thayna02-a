// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('./node_modules/venom-bot');
venom
  .create({
    session: 'wpp1', //name of session
    multidevice: true, // for version not multidevice use false.(default: true)
	browserArgs: ['--user-agent']
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });
function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}