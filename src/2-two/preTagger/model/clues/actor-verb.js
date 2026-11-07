import merge from './_lib.js'
import noun from './_noun.js'
import verb from './_verb.js'
// 'the pilot' vs 'pilot the plane'
export default merge(verb, noun)
