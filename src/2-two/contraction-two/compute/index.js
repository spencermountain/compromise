import splice from './_splice.js'
import apostropheS from './apostrophe-s.js'
import apostropheD from './apostrophe-d.js'
import apostropheT from './apostrophe-t.js'
import isPossessive from './isPossessive.js'
import wannaNoun from './wanna.js'
import thereAre from './there-are.js'
import contractionDebug from '../../../API/debug/contractions-debug.js'
import { hasApostrophe } from './_lib.js'
import { isDecade } from './_words.js'
import { setTag } from '../../preTagger/compute/tagger/_lib.js'
import { Year, Poss } from '../../preTagger/tagSet/_lib.js'

// the debug reason for every tag this pass sets
const reason = '2-contraction'

// poor-mans reindexing of this sentence only
const reIndex = function (terms) {
  terms.forEach((t, i) => {
    if (t.index) {
      t.index[1] = i
    }
  })
}

// run tagger on our new implicit terms
const reTag = function (terms, view, start, len) {
  const tmp = view.update()
  tmp.document = [terms]
  // offer to re-tag neighbours, too
  let end = start + len
  if (start > 0) {
    start -= 1
  }
  if (terms[end]) {
    end += 1
  }
  tmp.ptrs = [[0, start, end]]
  tmp.compute(['freeze', 'lexicon', 'preTagger', 'unfreeze'])
  // don't for a reindex of the whole document
  reIndex(terms)
}

// What 's means (possessive, is, has, us) is decided in steps, in run order:
//   1. 1-one/contraction-one/model/contractions.js        fixed forms - that's, let's
//   2. 2-two/preTagger/model/regex/regex-text.js          plural owners - flanders'
//   3. 2-two/preTagger/compute/tagger/2nd-pass/05-year.js  years - 2020's election
//   4. 2-two/preTagger/compute/tagger/3rd-pass/00-possessive.js  the sure cases, from lexicon tags
//   5. ./isPossessive.js                                   the full possessive decision
//   6. ./apostrophe-s.js                                   is vs has, once it is a verb
// Steps 4 and 5 share their word lists, in ./_words.js.
// A wrong call invents a verb, so change them together. Each file points back to this list.
const byEnd = {
  // how'd
  d: apostropheD,
  // we ain't
  t: apostropheT,
  // bob's
  s: (terms, i, world) => {
    // [the 1990's] is a decade - neither an owner, nor 'is'
    if (isDecade(terms[i])) {
      return null
    }
    // [bob's house] vs [bob's cool]
    if (isPossessive(terms, i)) {
      contractionDebug(terms[i])
      // [2020's election] stays a number - setTag would remove it, for being a noun
      if (terms[i].tags.has(Year)) {
        terms[i].tags.add(Poss)
        return null
      }
      return setTag([terms[i]], Poss, world, reason)
    }
    return apostropheS(terms, i)
  },
}

const toDocs = function (words, view, term) {
  contractionDebug(term, words)
  const doc = view.fromText(words.join(' '))
  doc.compute('id')
  return doc.docs[0]
}

//really easy ones
const contractionTwo = view => {
  const { world, document } = view
  // each sentence
  document.forEach((terms, n) => {
    // loop through terms backwards
    for (let i = terms.length - 1; i >= 0; i -= 1) {
      if (wannaNoun(terms, i)) {
        contractionDebug(terms[i], ['want'])
        reIndex(terms)
        continue
      }
      if (thereAre(terms, i)) {
        contractionDebug(terms[i], ['there', 'are'])
        continue
      }
      // is it already a contraction
      if (terms[i].implicit) {
        continue
      }
      let after = null
      if (hasApostrophe.test(terms[i].normal)) {
        after = terms[i].normal.split(hasApostrophe)[1]
      } else if (terms[i].normal === 'aint') {
        after = 't'
      }
      let words = null
      // any known-ones, like 'dunno'?
      if (Object.hasOwn(byEnd, after)) {
        words = byEnd[after](terms, i, world)
      }
      // actually insert the new terms
      if (words) {
        const isYear = terms[i].tags.has(Year)
        words = toDocs(words, view, terms[i])
        splice(document, [n, i], words)
        reTag(document[n], view, i, words.length)
        // [twenty twenty-six's] over - it may only be a year as a whole
        if (isYear) {
          setTag([document[n][i]], Year, world, reason)
        }
        continue
      }
    }
  })
}
export default { contractionTwo }
