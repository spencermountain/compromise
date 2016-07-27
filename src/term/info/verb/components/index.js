'use strict';
//turn a verb like 'will step up' to root,particle,etc.

const strip_particle = (str) => {
  //for phrasal verbs ('look out'), conjugate look, then append 'out'
  const phrasal_reg = new RegExp('^(.*?) (in|out|on|off|behind|way|with|of|away|across|ahead|back|over|under|together|apart|up|upon|aback|down|about|before|after|around|to|forth|round|through|along|onto)$', 'i');
  if (str.match(phrasal_reg)) {
    const split = str.match(phrasal_reg, '');
    return {
      phrasal: split[1],
      particle: split[2]
    }
  }
  return null
}

//look-around at neighbouring words to see if this verb is negated
const findNegation = (t) => {
  const negations = {
    not: true,
    no: true
  }
  //look at the few words before
  let before = t.info('before')
  for (let i = 0; i < before.length; i++) {
    if (negations[before[i].normal] || negations[before[i].silent_term]) {
      return before[i].normal
    }
    if (before[i].pos.Verb || before[i].pos.Adverb) {
      continue
    }
    break
  }
  //look at the next word after
  let after = t.info('after')
  if (after[0] && after[0].normal === 'not') {
    return after[0].normal
  }
  return null
}

//look-around at neighbouring words to see if this verb is negated
const findAuxillaries = (t) => {
  //auxillaries
  const aux = {
    will: true,
    was: true,
    have: true,
    had: true
  }
  let found = []
  //look at the 3 words before
  let before = t.info('before')
  for (let i = 0; i < before.length; i++) {
    if (before[i].pos.Modal || aux[before[i].normal] || aux[before[i].silent_term]) {
      found.unshift(before[i].normal) //(before terms are reversed)
      continue
    }
    if (before[i].normal === 'not') {
      continue
    }
    break
  }
  if (found.length === 0) {
    return null
  }
  return found
}

const components = function(t) {
  let all = {
    auxillaries: null,
    negation: null,
    root: null,
    particle: null
  }
  if (t.pos.PhrasalVerb) {
    let parts = strip_particle(t.normal)
    if (parts) {
      all.root = parts.phrasal
      all.particle = parts.particle
    }
  }
  //find the 'not' or 'no'
  all.negation = findNegation(t)
  //find the 'will have had...' infront of the verb
  all.auxillaries = findAuxillaries(t)
  return all
}

module.exports = components
