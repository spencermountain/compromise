import { hasBreak, isCapital, isUpperCase } from './_lib.js'
import { hasAny, toSet } from '../../_lib.js'
import { never, afterVerb, beforePossessive } from './_words.js'
import { Prop, Pron, Uncountable, Date, Sing, Mod, Cop, Past, Pres, Conj, Pers, Actor, Poss, QW, Det, Vb, Inf, Ger, NN, Plur, Adj, Adv, Ord, NounGerund, AdjNoun, NounVerb } from '../../preTagger/tagSet/_lib.js'

// things that are done, and not owned - Mom's cooked dinner, John's parked here
const bareObject = toSet('dinner lunch breakfast supper work school college home here there')
const adjLike = toSet('too also enough about')
const nounLike = toSet('is are did were could should must had have')
// "is was" or "has was" can't happen, so a copula means the 's is possessive
const copulas = toSet('is are was were am')
// past words that don't describe a thing - the team's made progress
const lightVerbs = toSet('made had done did took taken gave given saw seen went came said')

// one countable thing can't be the object of 'is making' or 'has made' - so it is owned
const isOneThing = t => {
  // not 'watching TV'
  const isWord = Boolean(t) && !bareObject.has(t.normal) && !isUpperCase(t)
  return isWord && t.tags.has(Sing) && !hasAny(t, Prop, Pron, Uncountable, Date)
}

// is there a verb for this phrase to be the subject of? - Toronto's housing market [set] a record
const hasPredicate = (terms, n) => {
  for (let k = n; k < terms.length; k += 1) {
    const t = terms[k]
    // or a thing 'of' something - Dynegy's planned acquisition [of] Enron
    if (hasAny(t, Mod, Cop, Past, Pres) || (k === n && t.normal === 'of')) {
      return true
    }
    // a new clause - John's played football [and] won
    if (hasAny(t, Conj, Pron) || hasBreak(t)) {
      return false
    }
  }
  return false
}

// (step 5 of the 's decision - the list is in ./index.js)
// the sure cases arrive already tagged, from preTagger/compute/tagger/3rd-pass/00-possessive.js
const isPossessive = (terms, i) => {
  const term = terms[i]
  // a person can do things - John's played football
  const isPerson = hasAny(term, Pers, Actor)
  // these can't be possessive
  if (never.has(term.machine || term.normal)) {
    return false
  }
  // the preTagger found the easy ones - Kathy's and Mary's, the world's largest, baby's first steps
  if (term.tags.has(Poss)) {
    return true
  }
  // who's
  if (term.tags.has(QW)) {
    return false
  }
  // some pronouns are never possessive
  if (term.normal === `he's` || term.normal === `she's`) {
    return false
  }
  //if end of sentence, it is possessive - "was spencer's"
  const nextTerm = terms[i + 1]
  if (!nextTerm) {
    return true
  }
  // "it's a life" vs "run it's business"
  if (term.normal === `it's`) {
    if (nextTerm.tags.has('#NN')) {
      return true
    }
    return false
  }
  // a question already has its verb - Is Wendy's still open?
  if (i > 0 && i < 3 && terms[0].tags.has(Cop)) {
    return true
  }
  if (afterVerb.has(nextTerm.normal)) {
    return false
  }
  // a title - Verne's The Mysterious Island
  if (nextTerm.tags.has(Det) && isCapital(nextTerm)) {
    return true
  }
  // "of Enron's", "on Time magazine's" - a backstop for names tagged after the preTagger's possessive pass
  const isName = t => term.tags.has(Prop) && t?.tags.has(Prop) === true && !hasBreak(t)
  let n = i - 1
  if (isName(terms[n])) {
    n -= 1
  }
  if (isName(terms[n])) {
    n -= 1
  }
  // "of the region's", "about her sister's"
  const lead = terms[n]
  if (lead && terms[n - 1] && (lead.tags.has(Det) || (lead.tags.has(Poss) && lead.tags.has(Pron)))) {
    n -= 1
  }
  if (terms[n] && beforePossessive.has(terms[n].normal)) {
    return true
  }
  // the sun's setting vs the artist's painting
  // gerund = is,  noun = possessive
  // (we are doing some dupe-work of the switch classifier here)
  if (nextTerm.switch === NounGerund) {
    const next2 = terms[i + 2]
    // the artist's painting.
    if (!next2) {
      return hasAny(term, Actor, Prop)
    }
    // the artist's painting is.., Enron's rating would.., the IMF's managing director
    const isVerb = hasAny(next2, Cop, Mod, Past)
    if (isVerb || (isOneThing(next2) && hasPredicate(terms, i + 3))) {
      return true
    }
    // the cat's sleeping on ..
    return false
  }
  //a gerund suggests 'is walking'
  if (nextTerm.tags.has(Vb)) {
    // 'leonard's was closed'
    if (copulas.has(nextTerm.normal)) {
      return true
    }
    //fix 'jamie's bite'
    if (nextTerm.tags.has(Inf)) {
      return true
    }
    //'jamaica's growing' - but Toronto's housing market
    if (nextTerm.tags.has(Ger)) {
      return isOneThing(terms[i + 2]) && hasPredicate(terms, i + 3)
    }
    //fix 'spencer's runs'
    if (nextTerm.tags.has(Pres)) {
      return true
    }
    // a describing word, then a thing - Fiona's planned attack, Bush's proposed risky plans
    const two = terms[i + 2]
    const three = terms[i + 3]
    if (two && nextTerm.tags.has(Past) && !lightVerbs.has(nextTerm.normal)) {
      // but not Mom's cooked dinner, Mary's visited Paris, John's finished today
      const isThing = two.tags.has(NN) && !hasAny(two, Prop, Pron, Date)
      // Mom's baked cookies. - a sentence with no other verb needs the 's to be one
      const needsVerb = i === 0 && two.tags.has(Plur) && !terms.some((t, k) => k !== 1 && t.tags.has(Vb))
      // John's played football, the company's raised money - but John's finished product sold well
      const isMass = two.tags.has(Uncountable) && !(three && three.tags.has(NN))
      const canOwn = hasPredicate(terms, i + 3) || (!isPerson && !isMass)
      if (isThing && !bareObject.has(two.normal) && !needsVerb && canOwn) {
        return true
      }
      if (three && two.tags.has(Adj) && three.tags.has(NN) && !three.tags.has(Pron)) {
        return true
      }
    }
    return false
  }

  // john's nuts
  if (nextTerm.switch === AdjNoun) {
    const twoTerm = terms[i + 2]
    if (!twoTerm) {
      return false //adj
    }
    // john's nuts were..
    if (nounLike.has(twoTerm.normal)) {
      return true
    }
    // john's nuts about..
    if (adjLike.has(twoTerm.normal)) {
      return false //adj
    }
  }
  //spencer's house
  if (nextTerm.tags.has(NN)) {
    const nextStr = nextTerm.machine || nextTerm.normal
    // 'spencer's here'
    if (nextStr === 'here' || nextStr === 'there' || nextStr === 'everywhere') {
      return false
    }
    // the chair's his - but not Hamlet's mother's, which is a singular or plural noun
    const isNoun = hasAny(nextTerm, Sing, Plur)
    if (nextTerm.tags.has(Poss) && !isNoun) {
      return false
    }
    // the captain's John, my name's Dave - but not TV's John Wayne, or mama's angel
    const isNamed = term.tags.has(Actor) || term.machine === 'name'
    if (isNamed && nextTerm.tags.has(Pers) && nextTerm.tags.has(Prop) && !terms[i + 2]) {
      return false
    }
    return true
  }

  // spencer's tired
  const isAdv = nextTerm.tags.has(Adv)
  if (nextTerm.tags.has(Adj) || isAdv) {
    // John's busy writing
    const two = terms[i + 2]
    if (nextTerm.normal === 'busy' && two && (two.tags.has(Ger) || two.switch === NounGerund)) {
      return false
    }
    // skip ahead - rocket's big red nozzle, China's most trusted paper
    const isMore = k => {
      const t = terms[k]
      const after = terms[k + 1]
      // big [red] nozzle, original [first] name
      if (hasAny(t, Adj, Ord)) {
        return true
      }
      if (!after) {
        return false
      }
      // financial [and] economic crisis
      if (['and', 'or', '&'].includes(t.normal)) {
        return after.tags.has(Adj)
      }
      // lower [borrowing] costs helped - but time's just [playing] tricks
      if (t.tags.has(Ger)) {
        return after.tags.has(NN) && hasPredicate(terms, k + 2)
      }
      // highly [specialized] tissue
      const isPast = t.tags.has(Past) && !lightVerbs.has(t.normal)
      return isAdv && isPast && isOneThing(after) && (!isPerson || hasPredicate(terms, k + 2))
    }
    let o = i + 2
    while (o < i + 4 && terms[o] && isMore(o)) {
      o += 1
    }
    const twoTerm = terms[o]
    //the rocket's red
    if (!twoTerm) {
      return false
    }
    // an adverb, then a word that isn't describing - but not Germany's only hope
    if (isAdv && o === i + 2 && nextTerm.normal !== 'only') {
      // the pond's still water was cold - but the car's still here, John's still king
      const three = terms[o + 1]
      return isOneThing(twoTerm) && Boolean(three) && hasAny(three, Mod, Cop, Past)
    }
    // John's only human
    if (nextTerm.normal === 'only' && twoTerm.normal === 'human') {
      return false
    }
    // America's poor climbed, our nation's elderly would - but Mama's messy isn't she
    const isVerb = hasAny(twoTerm, Mod, Past, Cop) || twoTerm.normal === 'have'
    if (!isAdv && o === i + 2 && isVerb && !twoTerm.implicit) {
      return true
    }
    // rocket's red nozzle - but not John's still here
    if (twoTerm.tags.has(NN) && !twoTerm.tags.has(Pron) && twoTerm.normal !== 'here' && twoTerm.normal !== 'there') {
      //project's behind schedule
      const str = nextTerm.normal
      if (str === 'above' || str === 'below' || str === 'behind') {
        return false
      }
      return true
    }
    // rocket's red glare
    if (twoTerm.switch === NounVerb) {
      return true
    }
    //othwerwise, an adjective suggests 'is good'
    return false
  }
  // otherwise not possessive
  return false
}
export default isPossessive
