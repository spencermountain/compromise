import splice from './_splice.js'
import apostropheD from './apostrophe-d.js'
import apostropheS from './apostrophe-s.js'
import apostropheT from './apostrophe-t.js'
import french from './french.js'
import numberRange from './number-range.js'

const byApostrophe = /'/
const numDash = /^[0-9].*?[-–—].*?[0-9]/i

const reTag = function (terms, world) {
  const preTagger = world.compute.preTagger
  preTagger([terms], world)
}

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

//really easy ones
const contractions = (document = [], world) => {
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
          words = isArray(o.out) ? o.out : o.out(terms, i)
        }
        // look for after-match ('re -> [_, are])
        if (after !== null && after === o.after) {
          words = typeof o.out === 'string' ? [before, o.out] : o.out(terms, i)
        }
        // look for before-match (l' -> [le, _])
        if (before !== null && before === o.before) {
          words = typeof o.out === 'string' ? [o.out, after] : o.out(terms, i)
        }
        // spencer's
        if (after === 's') {
          words = apostropheS(terms, i)
        }
        // ain't
        if (after === 't') {
          words = apostropheT(terms, i)
        }
        // how'd
        if (after === 'd') {
          words = apostropheD(terms, i)
        }
        // j'aime
        if (before === 'j') {
          words = french.preJ(terms, i)
          hint = ['Pronoun', 'Verb']
        }
        // l'amour
        if (before === 'l') {
          words = french.preL(terms, i)
          hint = ['Determiner', 'Noun']
        }
        // d'amerique
        if (before === 'd') {
          words = french.preD(terms, i)
          hint = ['Preposition', 'Noun']
        }
        // actually insert the new terms
        if (words) {
          splice(document, [n, i], words, hint)
          reTag(terms, world)
          return true
        }
        // '44-2'
        if (numDash.test(terms[i].normal)) {
          words = numberRange(terms, i)
          if (words) {
            hint = ['Value', 'Conjunction', 'Value']
            splice(document, [n, i], words, hint)
            methods.one.setTag(terms, 'NumberRange', model.two.tags)
            reTag(terms, world)
            return true
          }
        }
        return false
      })
    }
  })
}
export default contractions
