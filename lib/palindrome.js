/**
 * palindrome - check if a given text is a palindrome
 *
 * @param  {string} text  the text to check
 * @return {boolean}      true if text is a palindrome, false otherwise
 */
function palindrome(text) {
  // set the text to lowercase, remove trailing spaces, remove all special chars
  let loText = text.toLowerCase().trim().replace(/[~!#$%^&*?"'-.,;’“” ]/g, '');
  let length = loText.length;

  // grab the first and last chars of the text, compare and move inward
  // if the chars keep matching until the midpoint of the text then return true
  // we stop at the midpoint, continuing will repeat matching the same chars
  for (let i = 0; i < Math.ceil(length / 2); i++) {
    if (loText[i] != loText[length - 1 - i]) {
     return false;
    }
  }

  return true;
}

module.exports = palindrome;
