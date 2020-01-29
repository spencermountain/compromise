/* compromise-syllables 0.0.4 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.compromiseSyllables = factory());
}(this, (function () { 'use strict';

  var starts_with_single_vowel_combos = /^(eu)/i;
  var joining_consonant_vowel = /^[^aeiou][e]([^d]|$)/;
  var cvcv_same_consonant = /^([^aeiouy])[aeiouy]\1[aeiouy]/;
  var cvcv_same_vowel = /^[^aeiouy]([aeiouy])[^aeiouy]\1/;
  var cvcv_known_consonants = /^([tg][aeiouy]){2}/;
  var only_one_or_more_c = /^[^aeiouy]+$/;
  var ends_with_vowel = /[aeiouy]$/;
  var starts_with_consonant_vowel = /^[^aeiouy][h]?[aeiouy]/;
  var ones = [/^[^aeiou]?ion/, /^[^aeiou]?ised/, /^[^aeiou]?iled/, // -ing, -ent
  /[aeiou][n][gt]$/, // -ate, -age
  /\wa[gt]e$/]; //suffix fixes

  var postprocess = function postprocess(arr) {
    //trim whitespace
    arr = arr.map(function (w) {
      return w.trim();
    });
    arr = arr.filter(function (w) {
      return w !== '';
    }); // if (arr.length > 2) {
    //   return arr;
    // }

    var l = arr.length;

    if (l > 1) {
      var suffix = arr[l - 2] + arr[l - 1];

      for (var i = 0; i < ones.length; i++) {
        if (suffix.match(ones[i])) {
          arr[l - 2] = arr[l - 2] + arr[l - 1];
          arr.pop();
        }
      }
    } // since the open syllable detection is overzealous,
    // sometimes need to rejoin incorrect splits


    if (arr.length > 1) {
      var first_is_open = (arr[0].length === 1 || arr[0].match(starts_with_consonant_vowel)) && arr[0].match(ends_with_vowel);
      var second_is_joining = arr[1].match(joining_consonant_vowel);

      if (first_is_open && second_is_joining) {
        var possible_combination = arr[0] + arr[1];
        var probably_separate_syllables = possible_combination.match(cvcv_same_consonant) || possible_combination.match(cvcv_same_vowel) || possible_combination.match(cvcv_known_consonants);

        if (!probably_separate_syllables) {
          arr[0] = arr[0] + arr[1];
          arr.splice(1, 1);
        }
      }
    }

    if (arr.length > 1) {
      var second_to_last_is_open = arr[arr.length - 2].match(starts_with_consonant_vowel) && arr[arr.length - 2].match(ends_with_vowel);
      var last_is_joining = arr[arr.length - 1].match(joining_consonant_vowel) && ones.every(function (re) {
        return !arr[arr.length - 1].match(re);
      });

      if (second_to_last_is_open && last_is_joining) {
        var _possible_combination = arr[arr.length - 2] + arr[arr.length - 1];

        var _probably_separate_syllables = _possible_combination.match(cvcv_same_consonant) || _possible_combination.match(cvcv_same_vowel) || _possible_combination.match(cvcv_known_consonants);

        if (!_probably_separate_syllables) {
          arr[arr.length - 2] = arr[arr.length - 2] + arr[arr.length - 1];
          arr.splice(arr.length - 1, 1);
        }
      }
    }

    if (arr.length > 1) {
      var single = arr[0] + arr[1];

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

    return arr;
  };

  var postProcess = postprocess;

  var all_spaces = / +/g;
  var ends_with_vowel$1 = /[aeiouy]$/;
  var starts_with_consonant_vowel$1 = /^[^aeiouy][h]?[aeiouy]/;
  var starts_with_e_then_specials = /^e[sm]/;
  var starts_with_e = /^e/;
  var ends_with_noisy_vowel_combos = /(eo|eu|ia|oa|ua|ui)$/i;
  var aiouy = /[aiouy]/;
  var ends_with_ee = /ee$/; // const whitespace_dash = /\s\-/
  //method is nested because it's called recursively

  var doWord = function doWord(w) {
    var all = [];
    var chars = w.split('');
    var before = '';
    var after = '';
    var current = '';

    for (var i = 0; i < chars.length; i++) {
      before = chars.slice(0, i).join('');
      current = chars[i];
      after = chars.slice(i + 1, chars.length).join('');
      var candidate = before + chars[i]; //it's a consonant that comes after a vowel

      if (before.match(ends_with_vowel$1) && !current.match(ends_with_vowel$1)) {
        if (after.match(starts_with_e_then_specials)) {
          candidate += 'e';
          after = after.replace(starts_with_e, '');
        }

        all.push(candidate);
        return all.concat(doWord(after));
      } //unblended vowels ('noisy' vowel combinations)


      if (candidate.match(ends_with_noisy_vowel_combos)) {
        //'io' is noisy, not in 'ion'
        all.push(before);
        all.push(current);
        return all.concat(doWord(after)); //recursion
      } // if candidate is followed by a CV, assume consecutive open syllables


      if (candidate.match(ends_with_vowel$1) && after.match(starts_with_consonant_vowel$1)) {
        all.push(candidate);
        return all.concat(doWord(after));
      }
    } //if still running, end last syllable


    if (w.match(aiouy) || w.match(ends_with_ee)) {
      //allow silent trailing e
      all.push(w);
    } else if (w) {
      var last = all.length - 1;

      if (last < 0) {
        last = 0;
      }

      all[last] = (all[last] || '') + w; //append it to the last one
    }

    return all;
  };

  var syllables = function syllables(str) {
    var all = [];

    if (!str) {
      return all;
    }

    str = str.replace(/[.,?]/g, '');
    str.split(all_spaces).map(function (s) {
      all = all.concat(doWord(s));
    }); // str.split(whitespace_dash).forEach(doWord)

    all = postProcess(all); //for words like 'tree' and 'free'

    if (all.length === 0) {
      all = [str];
    } //filter blanks


    all = all.filter(function (s) {
      return s;
    });
    return all;
  }; // console.log(syllables('civilised'))


  var syllables_1 = syllables;

  var defaultObj = {
    normal: true,
    text: true,
    terms: false
  };

  var addMethod = function addMethod(Doc) {
    /** split each term by typical pronounciation */
    Doc.prototype.syllables = function (obj) {
      var n = null;

      if (typeof obj === 'number') {
        n = obj;
        obj = {};
      }

      var data = this.json(obj || defaultObj); //add syllable data to each phrase

      data = data.map(function (o) {
        o.syllables = syllables_1(o.normal || o.text);
        return o;
      });

      if (typeof n === 'number') {
        data = data[n];
      }

      return data;
    };

    return Doc;
  };

  var src = addMethod;

  return src;

})));
//# sourceMappingURL=compromise-syllables.js.map
