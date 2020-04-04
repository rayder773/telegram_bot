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

createActions(bot);

bot.launch();
