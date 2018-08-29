// copy/pasted from https://stackoverflow.com/a/6274398
// modified to be non-destructive
function shuffle(array) {
  const newArray = [...array]

  let counter = newArray.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = newArray[counter];
    newArray[counter] = newArray[index];
    newArray[index] = temp;
  }

  return newArray;
}

module.exports = shuffle
