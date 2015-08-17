//chop a string into pronounced syllables

//suffix fixes
function postprocess(arr: string[]): string[] {
  //trim whitespace
  arr = arr.map((w: string) => {
    return w.trim()
  })
  if (arr.length > 2) {
    return arr
  }
  var ones = [
    /^[^aeiou]?ion/,
    /^[^aeiou]?ised/,
    /^[^aeiou]?iled/
  ]
  var l: number = arr.length
  if (l > 1) {
    var suffix: string = arr[l - 2] + arr[l - 1];
    for (var i = 0; i < ones.length; i++) {
      if (suffix.match(ones[i])) {
        arr[l - 2] = arr[l - 2] + arr[l - 1];
        arr.pop();
      }
    }
  }
  return arr
}

var getSyllables = function(str: string): string[] {
  var all: string[] = []

  var doer = function(w: string): void {
    var vow = /[aeiouy]$/
    var chars: string[] = w.split('')
    var before: string = "";
    var after: string = "";
    var current: string = "";
    for (var i = 0; i < chars.length; i++) {
      before = chars.slice(0, i).join('')
      current = chars[i]
      after = chars.slice(i + 1, chars.length).join('')
      var candidate = before + chars[i]

      //rules for syllables-

      //it's a consonant that comes after a vowel
      if (before.match(vow) && !current.match(vow)) {
        if (after.match(/^e[sm]/)) {
          candidate += "e"
          after = after.replace(/^e/, '')
        }
        all.push(candidate)
        return doer(after)
      }
      //unblended vowels ('noisy' vowel combinations)
      if (candidate.match(/(eo|eu|ia|oa|ua|ui)$/i)) { //'io' is noisy, not in 'ion'
        all.push(before)
        all.push(current)
        return doer(after)
      }
    }
    //if still running, end last syllable
    if (str.match(/[aiouy]/) || str.match(/ee$/)) { //allow silent trailing e
      all.push(w)
    } else {
      all[all.length - 1] = (all[all.length - 1] || '') + str; //append it to the last one
    }
  }

  str.split(/\s\-/).forEach(function(s) {
    doer(s)
  })
  all = postprocess(all)

  //for words like 'tree' and 'free'
  if (all.length === 0) {
    all = [str]
  }
  //filter blanks
  all = all.filter(function(s) {
    return s != ""
  })

  return all
}

// export = getSyllables;
// console.log(syllables("suddenly").length === 3)
// console.log(syllables("tree"))

//broken
// console.log(syllables("birchtree"))
export = getSyllables