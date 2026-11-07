import { setTag, isTitleWord } from '../_lib.js'
import { hasAny, toSet } from '../../../../_lib.js'
import { Org, Poss, Prop, Place } from '../../../tagSet/_lib.js'
const isPossessive = /'s$/

// words that can fit inside a place
const placeCont = toSet('athletic city community eastern federal financial great historic historical local memorial municipal national northern provincial southern state western spring pine sunset view oak maple spruce cedar willow')
// center of...
const noBefore = toSet('center centre way range bar bridge field pit')

const isPlace = function (term, i, yelling) {
  if (!term) {
    return false
  }
  if (hasAny(term, Org, Poss) || isPossessive.test(term.normal)) {
    return false
  }
  if (hasAny(term, Prop, Place)) {
    return true
  }
  // allow anything titlecased to be a place
  return isTitleWord(term, i, yelling)
}

const tagOrgs = function (terms, i, world, yelling) {
  const placeWords = world.model.two.placeWords
  const term = terms[i]
  const str = term.machine || term.normal

  // 'river', delta, street, etc
  if (placeWords[str] === true) {
    //loop backward - 'Foo River ...'
    for (let n = i - 1; n >= 0; n -= 1) {
      // 'municipal ...'
      if (placeCont.has(terms[n].normal)) {
        continue
      }
      if (isPlace(terms[n], n, yelling)) {
        setTag(terms.slice(n, i + 1), Place, world, '3-[place-of-foo]')
        continue
      }
      break
    }
    //loop forward - 'River of Foo...'
    // 'center of x'
    if (noBefore.has(str)) {
      return false
    }
    for (let n = i + 1; n < terms.length; n += 1) {
      if (isPlace(terms[n], n, yelling)) {
        setTag(terms.slice(i, n + 1), Place, world, '3-[foo-place]')
        return true
      }
      // 'municipal ...'
      if (terms[n].normal === 'of' || placeCont.has(terms[n].normal)) {
        continue
      }
      break
    }
  }
  return null
}
export default tagOrgs
