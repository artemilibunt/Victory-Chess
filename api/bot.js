// api/bot.js - Код для Vercel Serverless
module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(200).send('Бот Victory Chess активен');
    }

    const { message } = req.body;
    if (!message || !message.text) return res.status(200).send('OK');

    const chatId = message.chat.id;
    const text = message.text;

    // Ссылка на ваше Mini App (получена в BotFather)
    const BOT_USERNAME = 'victorychessbot'; // замените на username вашего бота
    const MINI_APP_URL = `t.me/victorychessbot/Victorychess`;
    const BOT_TOKEN = "8851048148:AAEFFqCrQetr0RmrQnpsOv3B90oXj7kWYd8";

    const textParts = text.split(' ');

    let replyText = "Привет! Добро пожаловать в **Victory Chess**.\n\nНажми кнопку ниже, чтобы запустить игру.";
    let buttonText = "♟️ Начать игру (Victory Chess)";
    let webAppUrl = MINI_APP_URL;

    // Если друг зашел по инвайт-ссылке
    if (textParts.length > 1 && textParts[1].startsWith('room_')) {
        const roomParam = textParts[1];
        const roomId = roomParam.replace('room_', '');
        replyText = `🎯 Вы получили приглашение в матч по **Victory Chess**!\nКод комнаты: ${roomId}\n\nНажмите кнопку ниже, чтобы принять вызов и играть за Черных!`;
        buttonText = "⚔️ Принять вызов";
        webAppUrl = `${MINI_APP_URL}?startapp=${roomParam}`;
    }

    // Отправка ответа в Telegram
    const responseBody = {
        chat_id: chatId,
        text: replyText,
        parse_mode: "Markdown",
        reply_markup: {
            inline_keyboard: [[
                { text: buttonText, web_app: { url: webAppUrl } }
            ]]
        }
    };

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responseBody)
    });

    return res.status(200).send('OK');
};
