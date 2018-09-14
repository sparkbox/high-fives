const Handlebars = require('handlebars');
const moment = require('moment');

// I guess all custom helpers can live in this file until it gets too big
// ¯\_(ツ)_/¯

const numberToGeneralNumberOfTimes = (number) => {
  // This converts a number like "373" into a phrase
  // like "hundeds of times". This is to put less focus
  // on actual numbers, and just give a general idea of
  // how many times a post was viewed.

  if (number < 199) return "dozens of times"
  if (number < 1999) return "hundreds of times"
  return "thousands of times"
}

const fromNow = (time) => {
  return moment(time).fromNow()
}

const randomExclamation = () => {
  const exclamations = [
    '#thoughtleader',
    'Amazing.',
    'Awesome!',
    'Bada bing bada boom!',
    'Daaaaang.',
    'Dope.',
    'Excellent.',
    'Golly!',
    'High five!',
    'Holy guacamole!',
    'Holy moly!',
    'Holy cannoli!',
    'Impressive!',
    'Incredible.',
    'What a legend.',
    'Nice!',
    'Nifty!',
    'Noooice!',
    'Not too shabby!',
    'Score!',
    'Spectacular!',
    'Splendid!',
    'Sweet!',
    'We\'re all so proud!',
    'What a champ.',
    'Wow. Just wow.',
    'Wowza!',
    'Yeehaw!',
    'Aw yiss.',
    'Yaaaasss!',
  ];

  return exclamations[Math.floor(Math.random() * exclamations.length)];

}

module.exports = {
  numberToGeneralNumberOfTimes,
  randomExclamation,
  fromNow,
}
