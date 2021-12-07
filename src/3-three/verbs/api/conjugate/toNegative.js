import { doDoes, toInf } from './lib.js'


// do/does not walk 
const doesNot = function (vb, parsed) {
  let does = doDoes(vb, parsed)
  vb.prepend(does + ' not')
  return vb
}

//vaguely, turn 'he is cool' into 'he is not cool'
const forms = {


  // he walks' -> 'he does not walk'
  'simple-present': (vb, parsed) => {
    // he walk
    vb = toInf(vb, parsed)
    // does not 
    vb = doesNot(vb, parsed)
    return vb
  },
  // 'he walked' -> 'he did not walk'
  'simple-past': (vb, parsed) => {
    // he walk
    vb = toInf(vb, parsed)
    // did not walk
    vb.prepend('did not')
    return vb
  },

  // walk! -> 'do not walk'
  'imperative': (vb, parsed) => {
    vb.prepend('do not')
    return vb
  },
  // walk -> does not walk
  'infinitive': (vb, parsed) => {
    return doesNot(vb, parsed)
  },

  'passive-past': (vb, parsed) => {
    // got walked -> did not get walked
    if (vb.has('got')) {
      vb.replace('got', 'get')
      vb.prepend('did not')
      return vb
    }
    // was walked, were walked
    // was being walked
    // had been walked, have been eaten
    let m = vb.match('(was|were|had|have)')
    if (m.found) {
      m.append('not')
    }
    return vb
  },
  'auxiliary-past': (vb, parsed) => {
    // used to walk
    if (vb.has('used')) {
      vb.prepend('did not')
      return vb
    }
    // he did walk
    let m = vb.match('(did|does|do)')
    if (m.found) {
      m.append('not')
    }
    return vb
  },

  // wants to walk
  'want-infinitive': (vb, parsed) => {
    // does not 
    vb = doesNot(vb, parsed)
    // want
    vb = vb.replace('wants', 'want')
    return vb
  },

  /*
    // ============

    'simple-future': (vb, parsed) => {
      // he will walk
      return vb
    },
  
  
    // === Progressive ===
    'present-progressive': (vb, parsed) => {
      // he is walking
      return vb
    },
    'past-progressive': (vb, parsed) => {
      // he was walking
      return vb
    },
    'future-progressive': (vb, parsed) => {
      // he will be
      return vb
    },
  
    // === Perfect ===
    'present-perfect': (vb, parsed) => {
      // he has walked
      return vb
    },
    'past-perfect': (vb, parsed) => {
      // he had walked
      return vb
    },
    'future-perfect': (vb, parsed) => {
      // he will have
      return vb
    },
  
    // === Progressive-perfect ===
    'present-perfect-progressive': (vb, parsed) => {
      // he has been walking
      return vb
    },
    'past-perfect-progressive': (vb, parsed) => {
      // he had been
      return vb
    },
    'future-perfect-progressive': (vb, parsed) => {
      // will have been
      return vb
    },
  
  
    'passive-present': (vb, parsed) => {
      // is walked, are stolen
      // is being walked
      // has been cleaned
      return vb
    },
    'passive-future': (vb, parsed) => {
      // will have been walked
      // will be cleaned
      return vb
    },
  
    // === Conditional ===
    'present-conditional': (vb, parsed) => {
      // would be walked
      return vb
    },
    'past-conditional': (vb, parsed) => {
      // would have been walked
      return vb
    },
  
    // ==== Auxiliary ===
    'auxiliary-future': (vb, parsed) => {
      // going to drink
      return vb
    },
  
    'auxiliary-present': (vb, parsed) => {
      // we do walk
      return vb
    },
  
    // === modals ===
    'modal-past': (vb, parsed) => {
      // he could have walked
      return vb
    },
    'modal-infinitive': (vb, parsed) => {
      // he can walk
      return vb
    },*/
}
const toNegative = function (vb, parsed, form) {
  if (vb.has('#Negative')) {
    return vb
  }
  if (forms.hasOwnProperty(form)) {
    vb = forms[form](vb, parsed)
    vb.fullSentence().compute(['lexicon', 'preTagger', 'chunks'])
    return vb
  }

  // 'not be'
  let m = vb.matchOne('be')
  if (m.found) {
    m.prepend('not')
    return vb.sentence().compute('lexicon')
  }
  // is not
  m = vb.matchOne('(is|was|am|are|will|were)')
  if (m.found) {
    m.append('not')
    return vb.sentence().compute('lexicon')
  }
  // 'would not'
  m = vb.matchOne('(will|had|have|has|did|does|do|#Modal)')
  if (m.found) {
    m.append('not')
    return vb.sentence().compute('lexicon')
  }
  // do nothing i guess?
  return vb
}
export default toNegative