const Telegraf = require('telegraf');
require('dotenv').config();

const {
  MAIN_BOT_ID,
  BOT_TOKEN
} = process.env;

const bot = new Telegraf(BOT_TOKEN);

const helpMsg = `
 Choose the command
 /start - start the bot
 /help - show help info
 /echo - echo your message
`;

bot.use((ctx, next) => {
  console.log(ctx);
  next()
});

bot.command('help', (ctx) => {
  console.log(ctx)
  ctx.telegram.sendMessage(MAIN_BOT_ID, 'здарова ёпт')
});

bot.command('echo', (ctx) => {
  const inputToArray = ctx.message.text.split(' ');
  console.log(inputToArray)
  let message = '';

  if (inputToArray.length === 1) {
    ctx.reply('Nothin happend')
  } else {
    message = inputToArray.slice(1).join(' ');
  }

  ctx.reply(message)

});


bot.launch();
