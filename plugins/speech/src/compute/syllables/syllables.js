//chop a string into pronounced syllables
import postProcess from './postProcess.js'

const all_spaces = / +/g
const ends_with_vowel = /[aeiouy]$/
const starts_with_consonant_vowel = /^[^aeiouy]h?[aeiouy]/
const starts_with_e_then_specials = /^e[sm]/
const starts_with_e = /^e/
const ends_with_noisy_vowel_combos = /(eo|eu|ia|oa|ua|ui)$/i
const aiouy = /[aiouy]/
const ends_with_ee = /ee$/
// const whitespace_dash = /\s\-/

//method is nested because it's called recursively
const doWord = function (w) {
  let all = []
  let chars = w.split('')
  let before = ''
  let after = ''
  let current = ''
  for (let i = 0; i < chars.length; i++) {
    before = chars.slice(0, i).join('')
    current = chars[i]
    after = chars.slice(i + 1, chars.length).join('')
    let candidate = before + chars[i]

    //it's a consonant that comes after a vowel
    if (before.match(ends_with_vowel) && !current.match(ends_with_vowel)) {
      if (after.match(starts_with_e_then_specials)) {
        candidate += 'e'
        after = after.replace(starts_with_e, '')
      }
      all.push(candidate)
      return all.concat(doWord(after))
    }

    //unblended vowels ('noisy' vowel combinations)
    if (candidate.match(ends_with_noisy_vowel_combos)) {
      //'io' is noisy, not in 'ion'
      all.push(before)
      all.push(current)
      return all.concat(doWord(after)) //recursion
    }

    // if candidate is followed by a CV, assume consecutive open syllables
    if (candidate.match(ends_with_vowel) && after.match(starts_with_consonant_vowel)) {
      all.push(candidate)
      return all.concat(doWord(after))
    }
  }
  //if still running, end last syllable
  if (w.match(aiouy) || w.match(ends_with_ee)) {
    //allow silent trailing e
    all.push(w)
  } else if (w) {
    let last = all.length - 1
    if (last < 0) {
      last = 0
    }
    all[last] = (all[last] || '') + w //append it to the last one
  }
  return all
}

let syllables = function (str) {
  let all = []
  if (!str) {
    return all
  }
  str = str.replace(/[.,?]/g, '')
  str.split(all_spaces).map(s => {
    all = all.concat(doWord(s))
  })

  // str.split(whitespace_dash).forEach(doWord)
  all = postProcess(all)

  //for words like 'tree' and 'free'
  if (all.length === 0) {
    all = [str]
  }
  //filter blanks
  all = all.filter(s => s)

  return all
}

// console.log(syllables('civilised'))

export default syllables
