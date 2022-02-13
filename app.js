import { botToken } from './config.js'
import TelegramBot from 'node-telegram-bot-api'

const bot = new TelegramBot(botToken, {polling: true})

main()
function main() {
    bot.on('message', msg => {
        const chatId = msg.chat.id
        const text = msg.text

        if (text === '/info') {
            bot.sendMessage(chatId, 'Раздел с информацией о боте')
        }
        else if (text.includes(':')) {
            const split = text.split(':')
            const word = split[0].trim()
            const transl = split[1].trim()

            if (word === '') {
                bot.sendMessage(chatId, 'Слово не может быть пустым')
            }
            else if (transl === '') {
                bot.sendMessage(chatId, 'Перевод не может быть пустым')
            }
            else {
                bot.sendMessage(chatId, `Слово: ${word};\nПеревод: ${transl}`)
            }

            console.log(split)
        }
        // else {
        //     const word = text
        //     bot.sendMessage(chatId, `Теперь отправьте перевода слова ${word}`)
        // }
    })
}

// var sqlite3 = require('sqlite3').verbose();
// import sqlite3 from 'sqlite3'
// const db = new sqlite3.Database('db.sqlite3');

// db.serialize(function() {
// //   db.run("CREATE TABLE lorem (info TEXT)");

//   const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (let i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });

// db.close();

// import options from './options.js'
// // Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//     // 'msg' is the received Message from Telegram
//     // 'match' is the result of executing the regexp above on the text content
//     // of the message
  
//     const chatId = msg.chat.id;
//     const resp = match[1]; // the captured "whatever"
  
//     // send back the matched "whatever" to the chat
//     bot.sendMessage(chatId, resp, options.currency)
// });

// bot.on('callback_query', async msg => {
//     const chatId = msg.message.chat.id
//     const data = msg.data

//     console.log(data)
//     bot.sendMessage(chatId, `Вы выбрали - ${data}`)
// })