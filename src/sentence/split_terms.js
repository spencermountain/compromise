'use strict';
//an initial, naiive split of words based on spaces

const split_terms = function(str) {
  let result = [];
  //start with a naiive split
  const words = str.split(/(\S+)/);
  if (words[0] === '') {
    words.shift();
  }
  for (let i = 0; i < words.length; i++) {
    if (!words[i] || !words[i].match(/\S/i)) {
      continue;
    }
    result.push({
      text: words[i],
      before: words[i - 1] || null,
      after: words[i + 1] || null,
    });
    //don't use them twice
    words[i - 1] = null;
    words[i + 1] = null;
  }
  return result
}

module.exports = split_terms
// console.log(split_terms('john is nice'))
// console.log(split_terms('  john   is   nice '))
// console.log(split_terms("  john\tis \n  nice "))