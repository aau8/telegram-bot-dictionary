// Картинка для слова
import { apiKeys } from '../config.js'
import { createClient } from 'pexels'
    
export async function getPhoto(word) {
    const client = createClient(apiKeys.pixels)
    return client.photos.search({ query: word, per_page: 1 })
        .then(data => {
            return {
                id: data.photos[0].id,
                avg_color: data.photos[0].avg_color,
                url: {
                    original: data.photos[0].src.original,
                    medium: data.photos[0].src.original + '?auto=compress&cs=tinysrgb&fit=crop&h=400&w=560'
                },
                alt: data.photos[0].alt
            }
        })
        .catch(err => { if (err) throw err })
}

// Генерирует ссылку на изображение с указанными размерами
function sizePhotoWord(url, width, height) {
    return `${url}?auto=compress&cs=tinysrgb&fit=crop&h=${height}&w=${width}`
}