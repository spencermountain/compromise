// Inspect the trailing run once, including when punctuation occurs internally.
const trimPunctuation = (str, punctuation) => {
  let end = str.length
  while (end > 0 && punctuation.test(str[end - 1])) end--
  return str.slice(0, end)
}

/** some basic operations on a string to reduce noise */
const clean = function (str) {
  str = str || ''
  str = str.toLowerCase()
  str = str.trim()
  const original = str
  //punctuation
  str = trimPunctuation(str, /[,;.!?]/)
  //coerce Unicode ellipses
  str = str.replace(/\u2026/g, '...')
  //en-dash
  str = str.replace(/\u2013/g, '-')
  //strip leading & trailing grammatical punctuation
  if (/^[:;]/.test(str) === false) {
    str = trimPunctuation(str, /[",.!:;?)]/)
    str = str.replace(/^['"(]+/g, '')
  }
  // remove zero-width characters
  str = str.replace(/[\u200B-\u200D\uFEFF]/g, '')
  //do this again..
  str = str.trim()
  //oh shucks,
  if (str === '') {
    str = original
  }
  //no-commas in numbers
  str = str.replace(/([0-9]),([0-9])/g, '$1$2')
  return str
}
export default clean
