import adj from './_adj.js'
import gerund from './_gerund.js'
import tags from '../../tagSet/aliases.js'

const { VBG: g, JJ: jj } = tags

// rallying the troops
// her rallying cry
const clue = {
  beforeTags: {
    ...adj.beforeTags,
    ...gerund.beforeTags,
    // Copula: jj,
    Imperative: g, //recommend living in
    Infinitive: jj, //say charming things
    // PresentTense: g,
    Plural: g, //kids cutting
  },

  afterTags: {
    ...adj.afterTags,
    ...gerund.afterTags,
    Noun: jj, //shocking ignorance
    // Plural: jj, //shocking lies
  },

  beforeWords: {
    ...adj.beforeWords,
    ...gerund.beforeWords,
    is: jj,
    are: g, //is overflowing: JJ, are overflowing : VB ??
    was: jj,
    of: jj, //of varying
    suggest: g,
    suggests: g,
    suggested: g,

    recommend: g,
    recommends: g,
    recommended: g,

    imagine: g,
    imagines: g,
    imagined: g,

    consider: g,
    considered: g,
    considering: g,

    resist: g,
    resists: g,
    resisted: g,

    avoid: g,
    avoided: g,
    avoiding: g,

    except: jj,
    accept: jj,
    assess: g,
    explore: g,
    fear: g,
    fears: g,
    appreciate: g,
    question: g,
    help: g,
    embrace: g,
    with: jj, //filled with daring
  },

  afterWords: {
    ...adj.afterWords,
    ...gerund.afterWords,
    to: g,
    not: g, //trying not to car
    the: g, //sweeping the country
  },
}
// console.log(clue)
export default clue
