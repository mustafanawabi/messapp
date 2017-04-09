function isPalindrome(text) {
  let loText = text.toLowerCase().trim().replace(/[~!#$%^&*-., ]/g,'');
  let length = loText.length;

  for (let i = 0; i < Math.ceil(length / 2); i++) {
    if (loText[i] != loText[length - 1 - i]) {
     return false;
    }
  }

  return true;
}

module.exports = isPalindrome;
