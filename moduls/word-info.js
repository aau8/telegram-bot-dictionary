// Информация о слове (перевод, часть речи, транскрипция и т.д)
import { apiKeys } from '../config.js'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

import fetch from "node-fetch"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function getInfoWord(word) {
    return await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${apiKeys.yDict}&lang=en-ru&text=${word}`)
        .then(data => data.json())
        .then(json => {
            const elem = json.def[0]

            return {
                word: elem.text,
                translate: elem.tr[0].text,
                pos: elem.pos,
                tr: elem.ts,
                example: elem.tr[0].ex.slice(0, 3).map(e => {
                    return {
                        text: e.text,
                        tr: e.tr[0].text
                    }
                })
            }
        })
        .catch(err => {
            if (err) { throw err }
        })
}