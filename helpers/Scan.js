const WORDS_TO_CUT = [
  'ingredients',
  'ingredients:',
];

function parseIngredients(rawText) {
  let cleanText = '';
  // Replace newlines with space
  cleanText = rawText.replace(/\n/g, ' ');
  // Replace multiple consecutive spaces with single space
  cleanText = cleanText.replace(/\s+/g, ' ');
  // Cut out useless words
  WORDS_TO_CUT.forEach((word) => {
    cleanText = cleanText.replace(new RegExp(word, 'ig'), '');
  });
  // Trim whitespace at start/end
  cleanText = cleanText.trim();
  // Split into comma-delimited array
  var array = cleanText.split(', ');
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