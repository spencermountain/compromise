import splice from './_splice.js'
import apostropheD from './apostrophe-d.js'
import apostropheS from './apostrophe-s.js'
import apostropheT from './apostrophe-t.js'
import french from './french.js'
import numberRange from './number-range.js'
import isPossessive from './isPossessive.js'

const byApostrophe = /'/
const numDash = /^[0-9][^-–—]*[-–—].*?[0-9]/

const reTag = function (terms, i, world, view) {
  const preTagger = world.compute.preTagger
  // just re-tag neighbourhood
  let start = i < 2 ? 0 : i - 2
  let slice = terms.slice(start, i + 3)
  slice = [slice]

  let tmp = view.update(view.pointer)
  tmp.document = slice
  tmp.compute('index')
  preTagger(slice, world)
}


const byEnd = {
  // ain't
  t: (terms, i) => apostropheT(terms, i),
  // how'd
  d: (terms, i) => apostropheD(terms, i),
  // bob's
  s: (terms, i, world) => {
    // [bob's house] vs [bob's cool]
    if (isPossessive(terms, i)) {
      world.methods.one.setTag([terms[i]], 'Possessive', world)
    } else {
      return apostropheS(terms, i)
    }
  },
}

const byStart = {
  // j'aime
  j: (terms, i) => french.preJ(terms, i),
  // l'amour
  l: (terms, i) => french.preL(terms, i),
  // d'amerique
  d: (terms, i) => french.preD(terms, i),
}

// pull-apart known contractions from model
const byList = function (list, term, before, after) {
  for (let i = 0; i < list.length; i += 1) {
    let o = list[i]
    // look for word-word match (cannot-> [can, not])
    if (o.word === term.normal) {
      return o.out
    }
    // look for after-match ('re -> [_, are])
    else if (after !== null && after === o.after) {
      return [before].concat(o.out)
    }
    // look for before-match (l' -> [le, _])
    else if (before !== null && before === o.before) {
      return [o.out, after] //typeof o.out === 'string' ? [o.out, after] : o.out(terms, i)
    }
  }
  return null
}


//really easy ones
const contractions = (document = [], world, view) => {
  const { model, methods } = world
  let list = model.two.contractions || []
  document.forEach((terms, n) => {
    // loop through terms backwards
    for (let i = terms.length - 1; i >= 0; i -= 1) {
      let before = null
      let after = null
      if (byApostrophe.test(terms[i].normal) === true) {
        let split = terms[i].normal.split(byApostrophe)
        before = split[0]
        after = split[1]
      }

      let hint = []
      // any known-ones, like 'dunno'?
      let words = byList(list, terms[i], before, after)
      // ['foo', 's']
      if (!words && byEnd.hasOwnProperty(after)) {
        words = byEnd[after](terms, i, world)
      }
      // ['j', 'aime']
      if (!words && byStart.hasOwnProperty(before)) {
        words = byStart[before](terms, i)
      }
      // actually insert the new terms
      if (words) {
        splice(document, [n, i], words, hint)
        reTag(terms, i, world, view)
        continue
      }
      // '44-2'
      if (numDash.test(terms[i].normal)) {
        words = numberRange(terms, i)
        if (words) {
          hint = ['Value', 'Conjunction', 'Value']
          splice(document, [n, i], words, hint)
          methods.one.setTag(terms, 'NumberRange', world)
          reTag(terms, i, world, view)
        }
      }
    }
  })
}
export default contractions
