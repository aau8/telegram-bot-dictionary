import { botToken } from './config.js'
import TelegramBot from 'node-telegram-bot-api'
import sqlite3 from 'sqlite3'

const bot = new TelegramBot(botToken, {polling: true})

main()
function main() {
    bot.onText(/[a-zA-Z\s]+:|-[а-яА-Я\s]+/, async (msg, match) => {
        const chatId = msg.chat.id
        const text = msg.text

        const split = text.split(/:|-/)
        const word = split[0].trim()
        const transl = split[1].trim()
        const date = new Date().getTime()

        if (word === '') {
            bot.sendMessage(chatId, 'Слово не может быть пустым')
        }
        else if (transl === '') {
            bot.sendMessage(chatId, 'Перевод не может быть пустым')
        }
        else {
            bot.sendMessage(chatId, `Слово: ${word}\nПеревод: ${transl}`)
        }

        const db = new sqlite3.Database('./dictionary.db')

        db.serialize(e => { 

            db.run('INSERT INTO words(word, translate, date) VALUES (?,?,?)', [word, transl, date], err => {
                if (err) {
                    throw err 
                }
            })
        })

        db.close()
    })

    bot.on('message', msg => {
        const chatId = msg.chat.id
        const text = msg.text

        if (text === '/info') {
            bot.sendMessage(chatId, 'Раздел с информацией о боте')
        }
        else if (text === '/list') {

            const db = new sqlite3.Database('./dictionary.db')

            db.all('SELECT word, translate FROM words', (err, arr) => {
                const string = arr.map(elem => `${elem.word} - ${elem.translate}`).join('\n')
                
                bot.sendMessage(chatId, string)
            })

            db.close()
        }
    })
    const word = { 
        origin: '', 
        translate: '',
    }

    // bot.onText(/[а-я]+/, async (msg, match) => {

        
    //     const resp = match[1];  // полученный от пользователя id
    //     word.origin = msg.text

    //     // bot.sendPoll(msg.chat.id, 'Is Telegram great?', ['Sure', 'Of course'])
    //     /*
    //      Тут он ищет id по базе
    //   */
    //     // Отправляем ответ пользователю
    //     // console.log(msg)
    //     // async () => {}

    //     // bot.sendMessage(msg.chat.id, 'Какой перевод?'); // Таким же образом можно пересылать текст в чат с другим пользователем
    
    //     // bot.onText(/[a-z]+/, (msg, match) => {
    //     //     word.translate = msg.text

    //     //     bot.sendMessage(msg.chat.id, `Перевод записан: ${word.origin} -> ${word.translate}`); // Таким же образом можно пересылать текст в чат с другим пользователем
         
    //     //     console.log(word)
    //     // })
    //     // Promise.then(fun => {
    //     // })

    //     // await new Promise((res, rej) => {
    //     //     setTimeout(console.log('Hello, world'), 3000)
            
    //     // })
    // });
}