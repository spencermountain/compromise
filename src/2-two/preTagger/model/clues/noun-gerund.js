import merge from './_lib.js'
import tagWords from '../_lib.js'
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
    ...tagWords('are were be no without', Ger),
    //are you playing
    ...tagWords('you we they he she', Ger),
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
export default merge(gerund, noun, misc)
