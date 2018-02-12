function parseIngredients(rawText) {
  console.log(rawText);
  var array = rawText.split(', ');
  return array;
}

class Scan {
  constructor(rawText) {
    console.log('Scan');
    // this.rawText = rawText;
    this.ingredients = parseIngredients(rawText);
  }
};

module.exports = Scan;