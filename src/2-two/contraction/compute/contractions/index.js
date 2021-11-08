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

  let tmp = view.clone()
  tmp.document = slice
  tmp.compute('index', 'tagger') //this should probably be smarter
  // tmp.compute(world.hooks)
  // console.log(world.hooks)

  preTagger(slice, world)
}

// const isArray = function (arr) {
//   return Object.prototype.toString.call(arr) === '[object Array]'
// }

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
      list.some(o => {
        let words = null
        let hint = []
        // look for word-word match (cannot-> [can, not])
        if (o.word === terms[i].normal) {
          words = o.out //isArray(o.out) ? o.out : o.out(terms, i)
        }
        // look for after-match ('re -> [_, are])
        else if (after !== null && after === o.after) {
          words = [before].concat(o.out)
        }
        // look for before-match (l' -> [le, _])
        else if (before !== null && before === o.before) {
          words = [o.out, after] //typeof o.out === 'string' ? [o.out, after] : o.out(terms, i)
        }
        // bob's
        else if (after === 's') {
          // [bob's house] vs [bob's cool]
          if (isPossessive(terms, i)) {
            methods.one.setTag([terms[i]], 'Possessive', world)
          } else {
            words = apostropheS(terms, i)
          }
        }
        // ain't
        else if (after === 't') {
          words = apostropheT(terms, i)
        }
        // how'd
        else if (after === 'd') {
          words = apostropheD(terms, i)
        }
        // j'aime
        else if (before === 'j') {
          words = french.preJ(terms, i)
          hint = ['Pronoun', 'Verb']
        }
        // l'amour
        else if (before === 'l') {
          words = french.preL(terms, i)
          hint = ['Determiner', 'Noun']
        }
        // d'amerique
        else if (before === 'd') {
          words = french.preD(terms, i)
          hint = ['Preposition', 'Noun']
        }
        // actually insert the new terms
        if (words) {
          splice(document, [n, i], words, hint)
          reTag(terms, i, world, view)
          return true
        }
        // '44-2'
        if (numDash.test(terms[i].normal)) {
          words = numberRange(terms, i)
          if (words) {
            hint = ['Value', 'Conjunction', 'Value']
            splice(document, [n, i], words, hint)
            methods.one.setTag(terms, 'NumberRange', world)
            reTag(terms, i, world, view)
            return true
          }
        }
        return false
      })
    }
  })
}
export default contractions
