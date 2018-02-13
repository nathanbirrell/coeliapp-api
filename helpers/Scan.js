const WORDS_TO_CUT = [
  'ingredients: ',
  'ingredients',
];

function findIngredientsIndex(rawText) {
  const text = rawText.toLowerCase();
  return text.indexOf('ingredients');
}

function parseIngredients(rawText, ingredientsIndex) {
  let cleanText = rawText;

  // Cut preceding text (before the word "ingredients")
  cleanText.slice(ingredientsIndex);

  // Replace newlines with space
  cleanText = cleanText.replace(/\n/g, ' ');

  // Replace multiple consecutive spaces with single space
  cleanText = cleanText.replace(/\s+/g, ' ');

  // Cut out useless words
  WORDS_TO_CUT.forEach((word) => {
    cleanText = cleanText.replace(new RegExp(word, 'ig'), '');
  });

  // TODO: trim between brackets - or do we need that percentage?

  // Trim whitespace at start/end
  cleanText = cleanText.trim();

  // Split into comma-delimited array
  const ingredientsArray = cleanText.split(', ');

  // TODO: trim final array item from full-stop to string.length

  // TODO: trim each item in array?
  // TODO: Trim full-stops `cleanText.replace(/\./, '');`

  return ingredientsArray
}

class Scan {
  constructor(rawText) {
    // this.rawText = rawText;
    this.ingredients = [];
    this.foundIngredients = false;

    const ingredientsIndex = findIngredientsIndex(rawText);

    console.log(ingredientsIndex);

    if (ingredientsIndex > -1) {
      this.foundIngredients = true;
      this.ingredients = parseIngredients(rawText, ingredientsIndex);
    }
  }
};

module.exports = Scan;