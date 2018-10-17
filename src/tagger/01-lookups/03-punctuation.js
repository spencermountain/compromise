const titleCase = /^[A-Z][a-z']/;
const romanNum = /^[IVXCM]+$/;

const oneLetters = {
  a: true,
  i: true,
  //internet-slang
  u: true,
  r: true,
  c: true,
  k: true
};

//
const checkPunctuation = function(terms, world) {
  terms.forEach((t, i) => {
    let str = t.text;
    //check titlecase (helpful)
    if (titleCase.test(str) === true) {
      t.tag('TitleCase', world, 'punct-rule');
    }
    //check hyphenation
    if (t.postText.indexOf('-') !== -1 && terms[i + 1] && terms[i + 1].preText === '') {
      t.tag('Hyphenated', world, 'has-hyphen');
    }
    //check one-letter acronyms like 'john E rockefeller'
    if (str.length === 1 && terms[i + 1] && /[A-Z]/.test(str) && !oneLetters[str.toLowerCase()]) {
      t.tag('Acronym', world, 'one-letter-acronym');
    }
    //roman numerals (not so clever right now)
    if (t.text.length > 1 && romanNum.test(t.text) === true && t.canBe('RomanNumeral')) {
      t.tag('RomanNumeral', 'is-roman-numeral');
    }
    //'100+'
    if (/[0-9]\+$/.test(t.text) === true) {
      t.tag('NumericValue', world, 'number-plus');
    }
  });
};
module.exports = checkPunctuation;
