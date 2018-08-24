const Handlebars = require('handlebars');

// I guess all custom helpers can live in this file until it gets too big
// ¯\_(ツ)_/¯

const prettyNum = (number, options) => {
  // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    'Holy guacamole.',
    'Holy moly.',
    'Impressive!',
    'Incredible.',
    'Nice!',
    'Nifty!',
    'Nooice!',
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
    'Yes!',
  ];

  return exclamations[Math.floor(Math.random() * exclamations.length)];

}

module.exports = {
  prettyNum,
  randomExclamation,
}
