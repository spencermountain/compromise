import { doAndBlock } from './logic/and-or.js'
import makeBlock from './_block.js'

// '(foo && #Noun)' - require all matches on the term
export default makeBlock(doAndBlock)
