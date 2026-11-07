import textValue from '../toText/index.js'
import { ordinal } from '../../_words.js'

/**
 * convert a javascript number to 'twentieth' format
 * */
const textOrdinal = obj => {
  const words = textValue(obj).split(' ')
  //convert the last number to an ordinal
  words[words.length - 1] = ordinal(words[words.length - 1])
  return words.join(' ')
}

export default textOrdinal
