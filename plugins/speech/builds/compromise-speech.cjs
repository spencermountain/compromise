(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseSpeech = factory());
})(this, (function () { 'use strict';

  //individual manipulations of the text
  const transformations = {
    dedup: (s) => {
      return s.replace(/([^c])\1/g, '$1')
    },
    dropInitialLetters: (s) => {
      if (s.match(/^(kn|gn|pn|ae|wr)/)) {
        return s.substring(1, s.length - 1)
      }
      return s
    },
    dropBafterMAtEnd: (s) => {
      return s.replace(/mb$/, 'm')
    },
    cchange: (s) => {
      s = s.replace(/([^s]|^)(c)(h)/g, '$1x$3').trim();
      s = s.replace(/cia/g, 'xia');
      s = s.replace(/c([iey])/g, 's$1');
      return s.replace(/c/g, 'k')
    },
    dchange: (s) => {
      s = s.replace(/d(ge|gy|gi)/g, 'j$1');
      return s.replace(/d/g, 't')
    },
    dropG: (s) => {
      // Drop 'G' if followed by 'H' and 'H' is not at the end or before a vowel. 
      s = s.replace(/gh(^$|[^aeiou])/g, 'h$1');//eslint-disable-line
      // Drop 'G' if followed by 'N' or 'NED' and is at the end.
      return s.replace(/g(n|ned)$/g, '$1')
    },
    changeG: (s) => {
      s = s.replace(/gh/g, 'f');
      s = s.replace(/([^g]|^)(g)([iey])/g, '$1j$3');
      s = s.replace(/gg/g, 'g');
      return s.replace(/g/g, 'k')
    },
    dropH: (s) => {
      return s.replace(/([aeiou])h([^aeiou]|$)/g, '$1$2')
    },
    changeCK: (s) => {
      return s.replace(/ck/g, 'k')
    },
    changePH: (s) => {
      return s.replace(/ph/g, 'f')
    },
    changeQ: (s) => {
      return s.replace(/q/g, 'k')
    },
    changeS: (s) => {
      return s.replace(/s(h|io|ia)/g, 'x$1')
    },
    changeT: (s) => {
      s = s.replace(/t(ia[^n]|io)/g, 'x$1');
      // return s.replace(/th/, '0')
      return s
    },
    dropT: (s) => {
      return s.replace(/tch/g, 'ch')
    },
    changeV: (s) => {
      return s.replace(/v/g, 'f')
    },
    changeWH: (s) => {
      return s.replace(/^wh/, 'w')
    },
    dropW: (s) => {
      return s.replace(/w([^aeiou]|$)/g, '$1')
    },
    changeX: (s) => {
      s = s.replace(/^x/, 's');
      return s.replace(/x/g, 'ks')
    },
    dropY: (s) => {
      return s.replace(/y([^aeiou]|$)/g, '$1')
    },
    changeZ: (s) => {
      return s.replace(/z/, 's')
    },
    dropVowels: (s) => {
      return s //.charAt(0) + s.substr(1, s.length).replace(/[aeiou]/g, '');
    },
  };
  var m = transformations;

  //a js version of the metaphone (#1) algorithm

  const metaphone = function (s) {
    s = m.dedup(s);
    s = m.dropInitialLetters(s);
    s = m.dropBafterMAtEnd(s);
    s = m.changeCK(s);
    s = m.cchange(s);
    s = m.dchange(s);
    s = m.dropG(s);
    s = m.changeG(s);
    s = m.dropH(s);
    s = m.changePH(s);
    s = m.changeQ(s);
    s = m.changeS(s);
    s = m.changeX(s);
    s = m.changeT(s);
    s = m.dropT(s);
    s = m.changeV(s);
    s = m.changeWH(s);
    s = m.dropW(s);
    s = m.dropY(s);
    s = m.changeZ(s);
    s = m.dropVowels(s);
    return s.trim()
  };

  var metaphone$1 = metaphone;

  const soundsLike = function (view) {
    view.docs.forEach(terms => {
      terms.forEach(term => {
        term.soundsLike = metaphone$1(term.normal || term.text);
      });
    });
  };

  var soundsLike$1 = soundsLike;

  const starts_with_single_vowel_combos = /^(eu)/i;
  const joining_consonant_vowel = /^[^aeiou]e([^d]|$)/;
  const cvcv_same_consonant = /^([^aeiouy])[aeiouy]\1[aeiouy]/;
  const cvcv_same_vowel = /^[^aeiouy]([aeiouy])[^aeiouy]\1/;
  const cvcv_known_consonants = /^([tg][aeiouy]){2}/;
  const only_one_or_more_c = /^[^aeiouy]+$/;

  const ends_with_vowel$1 = /[aeiouy]$/;
  const starts_with_consonant_vowel$1 = /^[^aeiouy]h?[aeiouy]/;

  const ones = [
    /^[^aeiou]?ion/,
    /^[^aeiou]?ised/,
    /^[^aeiou]?iled/,

    // -ing, -ent
    /[aeiou]n[gt]$/,

    // -ate, -age
    /\wa[gt]e$/,
  ];

  //suffix fixes
  const postprocess = function (arr) {
    //trim whitespace
    arr = arr.map(function (w) {
      return w.trim()
    });
    arr = arr.filter(function (w) {
      return w !== ''
    });
    // if (arr.length > 2) {
    //   return arr;
    // }
    let l = arr.length;
    if (l > 1) {
      let suffix = arr[l - 2] + arr[l - 1];
      for (let i = 0; i < ones.length; i++) {
        if (suffix.match(ones[i])) {
          arr[l - 2] = arr[l - 2] + arr[l - 1];
          arr.pop();
        }
      }
    }

    // since the open syllable detection is overzealous,
    // sometimes need to rejoin incorrect splits
    if (arr.length > 1) {
      let first_is_open =
        (arr[0].length === 1 || arr[0].match(starts_with_consonant_vowel$1)) &&
        arr[0].match(ends_with_vowel$1);
      let second_is_joining = arr[1].match(joining_consonant_vowel);

      if (first_is_open && second_is_joining) {
        let possible_combination = arr[0] + arr[1];
        let probably_separate_syllables =
          possible_combination.match(cvcv_same_consonant) ||
          possible_combination.match(cvcv_same_vowel) ||
          possible_combination.match(cvcv_known_consonants);

        if (!probably_separate_syllables) {
          arr[0] = arr[0] + arr[1];
          arr.splice(1, 1);
        }
      }
    }

    if (arr.length > 1) {
      let second_to_last_is_open =
        arr[arr.length - 2].match(starts_with_consonant_vowel$1) &&
        arr[arr.length - 2].match(ends_with_vowel$1);
      let last_is_joining =
        arr[arr.length - 1].match(joining_consonant_vowel) &&
        ones.every(re => !arr[arr.length - 1].match(re));

      if (second_to_last_is_open && last_is_joining) {
        let possible_combination = arr[arr.length - 2] + arr[arr.length - 1];
        let probably_separate_syllables =
          possible_combination.match(cvcv_same_consonant) ||
          possible_combination.match(cvcv_same_vowel) ||
          possible_combination.match(cvcv_known_consonants);

        if (!probably_separate_syllables) {
          arr[arr.length - 2] = arr[arr.length - 2] + arr[arr.length - 1];
          arr.splice(arr.length - 1, 1);
        }
      }
    }

    if (arr.length > 1) {
      let single = arr[0] + arr[1];
      if (single.match(starts_with_single_vowel_combos)) {
        arr[0] = single;
        arr.splice(1, 1);
      }
    }

    if (arr.length > 1) {
      if (arr[arr.length - 1].match(only_one_or_more_c)) {
        arr[arr.length - 2] = arr[arr.length - 2] + arr[arr.length - 1];
        arr.splice(arr.length - 1, 1);
      }
    }

    return arr
  };
  var postProcess = postprocess;

  //chop a string into pronounced syllables

  const all_spaces = / +/g;
  const ends_with_vowel = /[aeiouy]$/;
  const starts_with_consonant_vowel = /^[^aeiouy]h?[aeiouy]/;
  const starts_with_e_then_specials = /^e[sm]/;
  const starts_with_e = /^e/;
  const ends_with_noisy_vowel_combos = /(eo|eu|ia|oa|ua|ui)$/i;
  const aiouy = /[aiouy]/;
  const ends_with_ee = /ee$/;
  // const whitespace_dash = /\s\-/

  //method is nested because it's called recursively
  const doWord = function (w) {
    let all = [];
    let chars = w.split('');
    let before = '';
    let after = '';
    let current = '';
    for (let i = 0; i < chars.length; i++) {
      before = chars.slice(0, i).join('');
      current = chars[i];
      after = chars.slice(i + 1, chars.length).join('');
      let candidate = before + chars[i];

      //it's a consonant that comes after a vowel
      if (before.match(ends_with_vowel) && !current.match(ends_with_vowel)) {
        if (after.match(starts_with_e_then_specials)) {
          candidate += 'e';
          after = after.replace(starts_with_e, '');
        }
        all.push(candidate);
        return all.concat(doWord(after))
      }

      //unblended vowels ('noisy' vowel combinations)
      if (candidate.match(ends_with_noisy_vowel_combos)) {
        //'io' is noisy, not in 'ion'
        all.push(before);
        all.push(current);
        return all.concat(doWord(after)) //recursion
      }

      // if candidate is followed by a CV, assume consecutive open syllables
      if (candidate.match(ends_with_vowel) && after.match(starts_with_consonant_vowel)) {
        all.push(candidate);
        return all.concat(doWord(after))
      }
    }
    //if still running, end last syllable
    if (w.match(aiouy) || w.match(ends_with_ee)) {
      //allow silent trailing e
      all.push(w);
    } else if (w) {
      let last = all.length - 1;
      if (last < 0) {
        last = 0;
      }
      all[last] = (all[last] || '') + w; //append it to the last one
    }
    return all
  };

  let syllables$2 = function (str) {
    let all = [];
    if (!str) {
      return all
    }
    str = str.replace(/[.,?]/g, '');
    str.split(all_spaces).map(s => {
      all = all.concat(doWord(s));
    });

    // str.split(whitespace_dash).forEach(doWord)
    all = postProcess(all);

    //for words like 'tree' and 'free'
    if (all.length === 0) {
      all = [str];
    }
    //filter blanks
    all = all.filter(s => s);

    return all
  };

  // console.log(syllables('civilised'))

  var getSyllables = syllables$2;

  // const defaultObj = { normal: true, text: true, terms: false }

  const syllables = function (view) {
    view.docs.forEach(terms => {
      terms.forEach(term => {
        term.syllables = getSyllables(term.normal || term.text);
      });
    });
  };

  var syllables$1 = syllables;

  var compute = {
    soundsLike: soundsLike$1,
    syllables: syllables$1
  };

  const api = function (View) {
    /** */
    View.prototype.syllables = function () {
      this.compute('syllables');
      let all = [];
      this.docs.forEach(terms => {
        let some = [];
        terms.forEach(term => {
          some = some.concat(term.syllables);
        });
        if (some.length > 0) {
          all.push(some);
        }
      });
      return all
    };
    /** */
    View.prototype.soundsLike = function () {
      this.compute('soundsLike');
      let all = [];
      this.docs.forEach(terms => {
        let some = [];
        terms.forEach(term => {
          some = some.concat(term.soundsLike);
        });
        if (some.length > 0) {
          all.push(some);
        }
      });
      return all
    };
  };
  var api$1 = api;

  var plugin = {
    api: api$1,
    compute
  };

  return plugin;

}));
