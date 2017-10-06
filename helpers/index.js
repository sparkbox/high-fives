// I guess all custom helpers can live in this file until it gets too big
// ¯\_(ツ)_/¯

function foo() {
  return "Look! A custom helper";
}

function bar(options) {
  // Here's an example of how you do a block helper, for when you
  // inevitably forget how to do a block helper

  return `START BLOCK
  ${options.fn(this)}
  END BLOCK`;
}

function addToContext(options) {
  const newContext = Object.assign({}, this, { thing: 'IT WORKS' });

  return options.fn(newContext);
}

module.exports = {
  foo: foo,
  bar: bar,
  addToContext: addToContext,
}
