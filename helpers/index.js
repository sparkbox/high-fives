const Handlebars = require('handlebars');
const templates = require('../message-templates');

// I guess all custom helpers can live in this file until it gets too big
// ¯\_(ツ)_/¯

function eachWithUniqueTemplateIndex(collection, options) {
  // This loops through a given collection, and adds a unique, random index
  // referencing a template. This is used to make sure no templates are repeated
  // within a collection.

  if (collection.length > templates.length) {
    throw new Error(`There aren't enough templates to give unique template indices for each item. There are ${collection.length} items in the collection, but only ${templates.lenth} templates.`);
  }

  const pickedNumbers = [];

  const ret = collection.map((item) => {
    const modifiedItem = Handlebars.createFrame(item)

    let pickedNumber =  Math.floor(Math.random()*templates.length);

    // Sorry for using a while loop
    while(pickedNumbers.indexOf(pickedNumber) > -1) {
      pickedNumber =  Math.floor(Math.random()*templates.length);
    }

    modifiedItem.templateIndex = pickedNumber;

    // Store the picked number, so we don't pick it again
    pickedNumbers.push(pickedNumber);

    return options.fn(modifiedItem);
  }).join('');

  return ret;
}

function getRandomTemplate(options) {
  Handlebars.registerHelper({
    firstName: () => this.name.split(' ')[0],
    heShe: () => this.heShePronoun,
    hisHer: () => this.hisHerPronoun,
    articleLink: () => {
      return new Handlebars.SafeString(
        `<a href="${this.article.url}">${this.article.title}</a>`
      );
    }
  });

  const rawRandomTemplate = templates[Math.floor(Math.random()*templates.length)];
  const randomTemplate = Handlebars.compile(rawRandomTemplate);

  return randomTemplate(this);
}

function getTemplate(index, options) {
}

function prettyNum(number, options) {
  // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = {
  getRandomTemplate,
  eachWithUniqueTemplateIndex,
  prettyNum
}
