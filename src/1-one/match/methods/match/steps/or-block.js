import { doOrBlock } from './logic/and-or.js'
import makeBlock from './_block.js'

// '(a|b)' - match any choice on the term
export default makeBlock(doOrBlock)
