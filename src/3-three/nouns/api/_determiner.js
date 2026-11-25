import { keepTags as keep } from '../../_lib.js'

const forms = {
  singular: { these: 'this', those: 'that' },
  plural: { this: 'these', that: 'those' },
}

// 'these dogs' <-> 'this dog'
const fixDeterminer = function (phrase, form) {
  const words = Object.keys(forms[form]).join('|')
  let det = phrase.match(`^(${words})`)
  // it may sit just outside of our match
  if (!det.found) {
    det = phrase.before(`(${words})$`)
  }
  if (det.found) {
    det.replaceWith(forms[form][det.text('normal')], keep)
  }
}
export default fixDeterminer
