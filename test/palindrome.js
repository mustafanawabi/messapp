let assert = require('chai').assert;
let palindrome = require('../lib/palindrome');

describe('palindromes', function() {
  describe('simple palindromes', function() {
    let texts = ['', ' ', 'anna', 'murdrum', 'Redder', 'My gym'];

    for (let text of texts) {
      it(text + ' is a palindrome', function() {
        assert.isTrue(palindrome(text));
      });
    }
  });

  describe('hard palindromes', function() {
    let texts = [
      'Are we not drawn onward, we few, drawn onward to new era?',
      'A man, a plan, a cat, a ham, a yak, a yam, a hat, a canal-Panama!',
      'Name no side in Eden, I’m mad! A maid I am, Adam mine; denied is one man.',
      'Are we not pure? “No sir!” Panama’s moody Noriega brags. “It is garbage!” Irony dooms a man; a prisoner up to new era.',
      'No, it never propagates if I set a "gap" or prevention.'
    ];

    for (let text of texts) {
      it(text + ' is a palindrome', function() {
        assert.isTrue(palindrome(text));
      });
    }
  });

  describe('not palindromes', function() {
    let texts = [
      'annan',
      'yoabzaoy',
      'Name no side in Eden, I’m not mad! A maid I am, Adam mine; denied is one man.',
      'No, it never propagates I did not set a "gap" or prevention.'
    ];

    for (let text of texts) {
      it(text + ' is not a palindrome', function() {
        assert.isNotTrue(palindrome(text));
      });
    }
  });
});
