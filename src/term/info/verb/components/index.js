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

//parse-out common verb prefixes, for conjugation
const strip_prefix = function(str) {
  let match = str.match(/^(over|under|re|anti|full|cross)([- ])?([^aeiou][a-z]*)/i);
  if (match) {
    return {
      prefix: match[1] + (match[2] || ''),
      root: match[3]
    }
  }
  return {
    root: str
  }
};

const components = function(t) {
  let all = {
    auxillaries: null,
    negation: null,
    prefix: null,
    root: null,
    particle: null
  }
  if (t.pos.PhrasalVerb) {
    let parts = strip_particle(t.normal)
    if (parts) {
      all.root = parts.phrasal
      all.particle = parts.particle
    }
  } else {
    all.root = t.normal
  }
  //find the 'not' or 'no'
  all.negation = t.info('Negation')
  //find the 'will have had...' infront of the verb
  all.auxillaries = t.info('Auxillaries')
  //strp prefixes
  let parts = strip_prefix(all.root || '')
  all.root = parts.root
  all.prefix = parts.prefix
  return all
}

module.exports = components
