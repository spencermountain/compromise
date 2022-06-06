import parseBlocks from './01-parseBlocks.js'
import parseToken from './02-parseToken.js'
import splitHyphens from './03-splitHyphens.js'
import postProcess from './04-postProcess.js'

/** parse a match-syntax string into json */
const syntax = function (input, opts = {}) {
  // fail-fast
  if (input === null || input === undefined || input === '') {
    return []
  }
  if (typeof input === 'number') {
    input = String(input) //go for it?
  }
  let tokens = parseBlocks(input)
  //turn them into objects
  tokens = tokens.map(str => parseToken(str, opts))
  // '~re-do~'
  tokens = splitHyphens(tokens, opts)
  //clean up anything weird
  tokens = postProcess(tokens, opts)
  // console.log(tokens)
  return tokens
}
export default syntax
