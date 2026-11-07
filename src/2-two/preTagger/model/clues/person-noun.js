import merge from './_lib.js'
import { Inf } from '../../tagSet/_lib.js'
import person from './_person.js'
import noun from './_noun.js'

// 'babbling brook' vs 'Brooke Shields'
export default merge(noun, person, { beforeWords: { i: Inf, we: Inf } })
