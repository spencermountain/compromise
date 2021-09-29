import tokenize from './tokenize.js'

const parseTerm = txt => {
  // cleanup any punctuation as whitespace
  let { str, pre, post } = tokenize(txt)
  const parsed = {
    text: str,
    pre: pre,
    post: post,
    tags: new Set(),
  }
  return parsed
}
export default parseTerm
