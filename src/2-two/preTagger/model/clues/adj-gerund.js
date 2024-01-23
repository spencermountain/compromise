import adj from './_adj.js'
import gerund from './_gerund.js'

// rallying the troops
// her rallying cry
const clue = {
  beforeTags: Object.assign({}, adj.beforeTags, gerund.beforeTags, {
    // Copula: 'Adjective',
    Imperative: 'Gerund', //recommend living in
    Infinitive: 'Adjective', //say charming things
    // PresentTense: 'Gerund',
    Plural: 'Gerund', //kids cutting
  }),

  afterTags: Object.assign({}, adj.afterTags, gerund.afterTags, {
    Noun: 'Adjective', //shocking ignorance
    // Plural: 'Adjective', //shocking lies
  }),

  beforeWords: Object.assign({}, adj.beforeWords, gerund.beforeWords, {
    is: 'Adjective',
    are: 'Gerund', //is overflowing: JJ, are overflowing : VB ??
    was: 'Adjective',
    of: 'Adjective', //of varying
    suggest: 'Gerund',
    suggests: 'Gerund',
    suggested: 'Gerund',

    recommend: 'Gerund',
    recommends: 'Gerund',
    recommended: 'Gerund',

    imagine: 'Gerund',
    imagines: 'Gerund',
    imagined: 'Gerund',

    consider: 'Gerund',
    considered: 'Gerund',
    considering: 'Gerund',

    avoid: 'Gerund',
    avoided: 'Gerund',
    avoiding: 'Gerund',

    face: 'Adjective',
    faces: 'Adjective',
    faced: 'Adjective',
    look: 'Adjective',
    looks: 'Adjective',
    reveal: 'Adjective',
    reveals: 'Adjective',
    revealed: 'Adjective',
    except: 'Adjective',
    assess: 'Gerund',
    accept: 'Adjective',
    explore: 'Gerund',
    fear: 'Gerund',
    fears: 'Gerund',
    appreciate: 'Gerund',
    question: 'Gerund',
    help: 'Gerund',
    embrace: 'Gerund',
  }),

  afterWords: Object.assign({}, adj.afterWords, gerund.afterWords, {
    to: 'Gerund',
    not: 'Gerund', //trying not to car
    the: 'Gerund', //sweeping the country
  }),
}
// console.log(clue)
export default clue
