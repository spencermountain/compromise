const starts_with_single_vowel_combos = /^(eu)/i
const joining_consonant_vowel = /^[^aeiou]e([^d]|$)/
const cvcv_same_consonant = /^([^aeiouy])[aeiouy]\1[aeiouy]/
const cvcv_same_vowel = /^[^aeiouy]([aeiouy])[^aeiouy]\1/
const cvcv_known_consonants = /^([tg][aeiouy]){2}/
const only_one_or_more_c = /^[^aeiouy]+$/

const ends_with_vowel = /[aeiouy]$/
const starts_with_consonant_vowel = /^[^aeiouy]h?[aeiouy]/

const ones = [
  /^[^aeiou]?ion/,
  /^[^aeiou]?ised/,
  /^[^aeiou]?iled/,

  // -ing, -ent
  /[aeiou]n[gt]$/,

  // -ate, -age
  /\wa[gt]e$/,
]

//suffix fixes
const postprocess = function (arr) {
  //trim whitespace
  arr = arr.map(function (w) {
    return w.trim()
  })
  arr = arr.filter(function (w) {
    return w !== ''
  })
  // if (arr.length > 2) {
  //   return arr;
  // }
  let l = arr.length
  if (l > 1) {
    let suffix = arr[l - 2] + arr[l - 1]
    for (let i = 0; i < ones.length; i++) {
      if (suffix.match(ones[i])) {
        arr[l - 2] = arr[l - 2] + arr[l - 1]
        arr.pop()
      }
    }
  }

  // since the open syllable detection is overzealous,
  // sometimes need to rejoin incorrect splits
  if (arr.length > 1) {
    let first_is_open =
      (arr[0].length === 1 || arr[0].match(starts_with_consonant_vowel)) &&
      arr[0].match(ends_with_vowel)
    let second_is_joining = arr[1].match(joining_consonant_vowel)

    if (first_is_open && second_is_joining) {
      let possible_combination = arr[0] + arr[1]
      let probably_separate_syllables =
        possible_combination.match(cvcv_same_consonant) ||
        possible_combination.match(cvcv_same_vowel) ||
        possible_combination.match(cvcv_known_consonants)

      if (!probably_separate_syllables) {
        arr[0] = arr[0] + arr[1]
        arr.splice(1, 1)
      }
    }
  }

  if (arr.length > 1) {
    let second_to_last_is_open =
      arr[arr.length - 2].match(starts_with_consonant_vowel) &&
      arr[arr.length - 2].match(ends_with_vowel)
    let last_is_joining =
      arr[arr.length - 1].match(joining_consonant_vowel) &&
      ones.every(re => !arr[arr.length - 1].match(re))

    if (second_to_last_is_open && last_is_joining) {
      let possible_combination = arr[arr.length - 2] + arr[arr.length - 1]
      let probably_separate_syllables =
        possible_combination.match(cvcv_same_consonant) ||
        possible_combination.match(cvcv_same_vowel) ||
        possible_combination.match(cvcv_known_consonants)

      if (!probably_separate_syllables) {
        arr[arr.length - 2] = arr[arr.length - 2] + arr[arr.length - 1]
        arr.splice(arr.length - 1, 1)
      }
    }
  }

  if (arr.length > 1) {
    let single = arr[0] + arr[1]
    if (single.match(starts_with_single_vowel_combos)) {
      arr[0] = single
      arr.splice(1, 1)
    }
  }

  if (arr.length > 1) {
    if (arr[arr.length - 1].match(only_one_or_more_c)) {
      arr[arr.length - 2] = arr[arr.length - 2] + arr[arr.length - 1]
      arr.splice(arr.length - 1, 1)
    }
  }

  return arr
}
export default postprocess
