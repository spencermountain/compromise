import fastTag from '../_fastTag.js'
import looksPlural from '../../../methods/looksPlural.js'
import getTense from '../../../methods/transform/verbs/getTense/index.js'
import debug from '../../../../../API/debug/debug.js'
import { hasAny } from '../../../../_lib.js'
import { Acronym, Abbr, Prop, Uncountable, Poss, Pron, NN, Plur, Sing, Vb, Inf, Ger, Pres } from '../../../tagSet/_lib.js'
// tags that are neither plural or singular
const uncountable = [
  Acronym,
  Abbr,
  Prop,
  Uncountable,
  Poss,
  Pron,
  'Activity',
  'Honorific',
  'Month',
]
// try to guess if each noun is a plural/singular
const setPluralSingular = function (term) {
  if (!term.tags.has(NN) || hasAny(term, Plur, Sing, ...uncountable)) {
    return
  }
  if (looksPlural(term.normal)) {
    fastTag(term, Plur, '3-plural-guess')
  } else {
    fastTag(term, Sing, '3-singular-guess')
  }
}

// try to guess the tense of a naked verb
const setTense = function (term) {
  const tags = term.tags
  if (tags.has(Vb) && tags.size === 1) {
    const guess = getTense(term.normal)
    if (guess) {
      fastTag(term, guess, '3-verb-tense-guess')
      if (guess === Inf || guess === Ger) {
        fastTag(term, Pres, '3-verb-tense-guess')
      }
    }
  }
}

//add deduced parent tags to our terms
const fillTags = function (terms, i, model) {
  const term = terms[i]
  if (term.frozen === true) {
    return
  }
  // Visit only the original tags, without copying the Set.
  let remaining = term.tags.size
  for (const tag of term.tags) {
    if (remaining === 0) {
      break
    }
    remaining -= 1
    const parents = model.one.tagSet[tag]?.parents
    if (parents) {
      if (debug.tags) {
        fastTag(term, parents, ` -inferred by #${tag}`)
      } else {
        for (let k = 0; k < parents.length; k += 1) {
          if (!term.tags.has(parents[k])) {
            term.tags.add(parents[k])
          }
        }
      }
    }
  }
  // turn 'Noun' into Plural/Singular
  setPluralSingular(term)
  // turn 'Verb' into Present/PastTense
  setTense(term, model)
}
export default fillTags
