import merge from './_lib.js'
import person from './_person.js'
import verb from './_verb.js'
import noun from './_noun.js'

// 'rob the store'   -  'rob lowe'
// can be a noun too - 'losing hope'
export default merge(noun, person, verb)
