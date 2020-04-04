const Telegraf = require('telegraf');
require('dotenv').config();

const { createActions, sendMessage } = require('./utils');

const {
  MAIN_BOT_ID,
  BOT_TOKEN
} = process.env;

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  sendMessage(ctx);
});

bot.command('test', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, 'test', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'qwerty',
            callback_data: 'push'
          }
        ]
      ],
    },
  });
});

bot.action('push', ctx => {
  const id = ctx.update.callback_query.id;
  ctx.answerCbQuery('some test', true)
})

createActions(bot);

bot.launch();
