const {NAME_OF_GAME} = require('./constants');

let mark = false;
let field = null;

const setClick = (val) => {
  return `click${val}`
};

const setMark = () => {
  mark = !mark;
  return mark ? 'x' : 'o';
};

const changeName = (val, ctx) => {
  field = field.map((i) => {
    return i.map(j => {
      if(j.callback_data === val) {
        if (j.text.includes('x') || j.text.includes('o')) {
          ctx.answerCbQuery('this field filled', true);
          return j;
        }
        return {
          text: setMark(),
          callback_data: j.callback_data,
        };
      } else {
        return j;
      }
    })
  })
};

const createField = () => {
  let counter = 0;
  return Array(3)
    .fill(0)
    .map(item => {
      return Array(3)
        .fill(0)
        .map(item => {
          counter++;
          return {
            text: ' ',
            callback_data: setClick(counter),
          };
        });
    });
};

field = createField();

const createActions = (bot) => {
  for (let i = 1; i < 9; i++) {
    bot.action(setClick(i), ctx => {
      ctx.deleteMessage();
      const val = ctx.update.callback_query.data;
      changeName(val, ctx);
      sendMessage(ctx);
    });
  }
};

const sendMessage = (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, NAME_OF_GAME, {
    reply_markup: {
      inline_keyboard: field,
    },
  });
};

module.exports = {
  createActions,
  sendMessage,
};
