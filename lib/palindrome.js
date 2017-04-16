/**
 * Palindrome - takes an input and determines if it's a palindrome
 *
 * @param  {string}   input - the text to check
 * @return {boolean}  true if text is a palindrome, false otherwise
 */
function palindrome(input) {
  // set the text to lowercase, remove trailing spaces, remove all special chars
  let text = input.toLowerCase().trim().replace(/[~!#$%^&*?"'-.,;’“” ]/g, '');
  let length = text.length;

  // grab the first and last chars of the text, compare and move inward
  // if the chars keep matching until the midpoint of the text then return true
  // we stop at the midpoint, continuing will repeat matching the same chars
  for (let i = 0; i < Math.ceil(length / 2); i++) {
    if (text[i] != text[length - 1 - i]) {
     return false;
    }
  }

  return true;
}

module.exports = palindrome;
