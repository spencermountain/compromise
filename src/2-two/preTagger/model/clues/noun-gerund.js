import { Ger } from '../../tagSet/_lib.js'
import noun from './_noun.js'
import gerund from './_gerund.js'

// 'operating the crane', or 'operating room'
const misc = {
  beforeTags: {
    Copula: Ger,
    PastTense: Ger,
    PresentTense: Ger,
    Infinitive: Ger,
  },
  afterTags: {
    Value: Ger, //maintaining 500
  },
  beforeWords: {
    are: Ger,
    were: Ger,
    be: Ger,
    no: Ger,
    without: Ger,
    //are you playing
    you: Ger,
    we: Ger,
    they: Ger,
    he: Ger,
    she: Ger,
    //stop us playing
    us: Ger,
    them: Ger,
  },
  afterWords: {
    // offering the
    the: Ger,
    this: Ger,
    that: Ger,
    //got me thinking
    me: Ger,
    us: Ger,
    them: Ger,
  },
}
const clue = {
  beforeTags: { ...gerund.beforeTags, ...noun.beforeTags, ...misc.beforeTags },
  afterTags: { ...gerund.afterTags, ...noun.afterTags, ...misc.afterTags },
  beforeWords: { ...gerund.beforeWords, ...noun.beforeWords, ...misc.beforeWords },
  afterWords: { ...gerund.afterWords, ...noun.afterWords, ...misc.afterWords },
}
export default clue
