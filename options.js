export default {
    currency: {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '€ EUR',
                        callback_data: 'EUR'
                    },
                    {
                        text: '$ USD',
                        callback_data: 'USD'
                    },
                    {
                        text: '₽ RUB',
                        callback_data: 'RUB'
                    },
                    {
                        text: '₿ BTC',
                        callback_data: 'BTC'
                    }
                ]
            ]
        }
    }
}