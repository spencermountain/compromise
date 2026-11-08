import merge from './_lib.js'
import tagWords from '../_lib.js'
import adj from './_adj.js'
import gerund from './_gerund.js'
import tags from '../../tagSet/aliases.js'

const { VBG: g, JJ: jj } = tags

// rallying the troops
// her rallying cry
const misc = {
  beforeTags: {
    // Copula: jj,
    Imperative: g, //recommend living in
    Infinitive: jj, //say charming things
    // PresentTense: g,
    Plural: g, //kids cutting
  },

  afterTags: {
    Noun: jj, //shocking ignorance
    // Plural: jj, //shocking lies
  },

  beforeWords: {
    is: jj,
    are: g, //is overflowing: JJ, are overflowing : VB ??
    was: jj,
    of: jj, //of varying
    ...tagWords('suggest suggests suggested recommend recommends recommended', g),
    ...tagWords('imagine imagines imagined consider considered considering', g),
    ...tagWords('resist resists resisted avoid avoided avoiding', g),
    except: jj,
    accept: jj,
    ...tagWords('assess explore fear fears appreciate question help embrace', g),
    with: jj, //filled with daring
  },

  afterWords: {
    to: g,
    not: g, //trying not to car
    the: g, //sweeping the country
  },
}
export default merge(adj, gerund, misc)
