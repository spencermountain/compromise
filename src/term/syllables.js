//chop a string into pronounced syllables
'use strict';

//suffix fixes
function postprocess(arr) {
  //trim whitespace
  arr = arr.map(function(w) {
    return w.trim();
  });
  arr = arr.filter(function(w) {
    return w !== '';
  });
  // if (arr.length > 2) {
  //   return arr;
  // }
  const ones = [
    /^[^aeiou]?ion/,
    /^[^aeiou]?ised/,
    /^[^aeiou]?iled/
  ];
  const l = arr.length;
  if (l > 1) {
    const suffix = arr[l - 2] + arr[l - 1];
    for (let i = 0; i < ones.length; i++) {
      if (suffix.match(ones[i])) {
        arr[l - 2] = arr[l - 2] + arr[l - 1];
        arr.pop();
      }
    }
  }
  return arr;
}

const syllables = function(str) {
  let all = [];

  //method is nested because it's called recursively
  const doer = function(w) {
    const vow = /[aeiouy]$/;
    const chars = w.split('');
    let before = '';
    let after = '';
    let current = '';
    for (let i = 0; i < chars.length; i++) {
      before = chars.slice(0, i).join('');
      current = chars[i];
      after = chars.slice(i + 1, chars.length).join('');
      let candidate = before + chars[i];

      //it's a consonant that comes after a vowel
      if (before.match(vow) && !current.match(vow)) {
        if (after.match(/^e[sm]/)) {
          candidate += 'e';
          after = after.replace(/^e/, '');
        }
        all.push(candidate);
        return doer(after);
      }
      //unblended vowels ('noisy' vowel combinations)
      if (candidate.match(/(eo|eu|ia|oa|ua|ui)$/i)) { //'io' is noisy, not in 'ion'
        all.push(before);
        all.push(current);
        return doer(after); //recursion
      }
    }
    //if still running, end last syllable
    if (str.match(/[aiouy]/) || str.match(/ee$/)) { //allow silent trailing e
      all.push(w);
    } else {
      all[all.length - 1] = (all[all.length - 1] || '') + str; //append it to the last one
    }
  };

  str.split(/\s\-/).forEach(function(s) {
    doer(s);
  });
  all = postprocess(all);

  //for words like 'tree' and 'free'
  if (all.length === 0) {
    all = [str];
  }
  //filter blanks
  all = all.filter(function(s) {
    return s !== '' && s !== null && s !== undefined;
  });

  return all;
};

// console.log(syllables('civilised'));

module.exports = syllables;
