// checks if a given text is a palindrome and returns a boolean value
function palindrome(text) {
  // set the text to lowercase, remove trailing spaces and remove all special characters (e.g. !&-,.)
  let loText = text.toLowerCase().trim().replace(/[~!#$%^&*?"'-.,;’“” ]/g,'');
  let length = loText.length;

  // grab the first and last characters of the text, if they are same then continue to move inward
  // if the characters keep matching until the midpoint of the text then it is a palindrome
  // note: we stop at the midpoint since continuing further will just repeat matching the same characters
  for (let i = 0; i < Math.ceil(length / 2); i++) {
    if (loText[i] != loText[length - 1 - i]) {
     return false;
    }
  }

  return true;
}

module.exports = palindrome;
