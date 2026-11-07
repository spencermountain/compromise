import expandTags from '../../../../../2-two/postTagger/model/_lib.js'
import { Pres, Fut, Past } from '../../../../../2-two/preTagger/tagSet/_lib.js'

// one letter per grammar flag, joined into a code like 'Pv' (past passive)
const flags = {
  p: { tense: Pres },
  d: { conditional: true },
  f: { tense: Fut },
  g: { progressive: true },
  P: { tense: Past },
  c: { complete: true, progressive: false },
  v: { passive: true },
  l: { plural: true },
  s: { plural: false },
}

const verbForms = {
  // === Simple ===
  'imperative': [
    // walk!
    ['#Imp', ''],
  ],

  'want-infinitive': [
    ['^(want|wants|wanted) to #Inf$', 'p'],
    ['^wanted to #Inf$', 'P'],
    ['^will want to #Inf$', 'f'],
  ],

  'gerund-phrase': [
    // started looking
    ['^#Past #Ger$', 'P'],
    // starts looking
    ['^#Pres #Ger$', 'p'],
    // start looking
    ['^#Inf #Ger$', 'p'],
    // will start looking
    ['^will #Inf #Ger$', 'f'],
    // have started looking
    ['^have #Past #Ger$', 'P'],
    // will have started looking
    ['^will have #Past #Ger$', 'P'],
  ],

  'simple-present': [
    // he walks',
    ['^#Pres$', 'p'],
    // we walk
    ['^#Inf$', 'p'],
  ],
  'simple-past': [
    // he walked',
    ['^#Past$', 'P'],
  ],
  'simple-future': [
    // he will walk
    ['^will #Adv? #Inf', 'f'],
  ],

  // === Progressive ===
  'present-progressive': [
    // he is walking
    ['^(is|are|am) #Ger$', 'pg'],
  ],
  'past-progressive': [
    // he was walking
    ['^(was|were) #Ger$', 'Pg'],
  ],
  'future-progressive': [
    // he will be
    ['^will be #Ger$', 'fg'],
  ],

  // === Perfect ===
  'present-perfect': [
    // he has walked
    ['^(has|have) #Past$', 'Pc'], //past?
  ],
  'past-perfect': [
    // he had walked
    ['^had #Past$', 'Pc'],
    // had been to see
    ['^had #Past to #Inf', 'Pc'],
  ],
  'future-perfect': [
    // he will have
    ['^will have #Past$', 'fc'],
  ],

  // === Progressive-perfect ===
  'present-perfect-progressive': [
    ['^(has|have) been going to be #Ger$', 'Pg'],
    // he has been walking
    ['^(has|have) been #Ger$', 'Pg'], //present?
  ],
  'past-perfect-progressive': [
    // he had been
    ['^had been #Ger$', 'Pg'],
  ],
  'future-perfect-progressive': [
    // will have been
    ['^will have been #Ger$', 'fg'],
  ],

  // ==== Passive ===
  'passive-past': [
    ['^(was|were) being? (#Past|#VBN)$', 'Pv'],
    ['^had been being? (#Past|#VBN)$', 'Pv'],
    // got walked, was walked, were walked
    ['(got|were|was) #Pass', 'Pv'],
    // was being walked
    ['^(was|were) being #Pass', 'Pv'],
    // had been walked
    ['^had been #Pass', 'Pv'],
  ],
  'passive-present': [
    ['^(is|are|am) being? (#Past|#VBN)$', 'pv'],
    ['^(has|have) been being? (#Past|#VBN)$', 'pv'],
    // is walked, are stolen
    ['^(is|are|am) #Pass', 'pv'],
    // is being walked
    ['^(is|are|am) being #Pass', 'pv'],
    // has/have been cleaned
    ['^(has|have) been #Pass', 'pv'],
  ],
  'passive-future': [
    ['^will have been being? (#Past|#VBN)$', 'fvd'],
    ['^will be being? (#Past|#VBN)$', 'fvd'],
    // will have been walked
    ['will have been #Pass', 'fvd'],
    // will be cleaned
    ['will be being? #Pass', 'fvd'],
  ],

  // === Conditional ===
  'present-conditional': [
    // would be walked
    ['^#Mod be #Past$', 'pdv'],
  ],
  'past-conditional': [
    // would have been walked
    ['^#Mod have been #Past$', 'Pdv'],
  ],

  // ==== Auxiliary ===
  'auxiliary-future': [
    ['^(is|are|am|was|were) going to be #Ger$', 'fg'],
    // going to drink
    ['(is|are|am|was|were) going to (#Inf|#Pres)', 'f'],
  ],
  'auxiliary-past': [
    // he did walk
    ['^did #Inf$', 'Ps'],
    // used to walk
    ['^used to #Inf$', 'Pc'],
  ],
  'auxiliary-present': [
    // we do walk
    ['^(does|do) #Inf$', 'pcl'],
  ],

  // === modals ===
  'modal-perfect-progressive': [
    ['^#Mod have been #Ger$', 'Pg'],
  ],
  'modal-past': [
    // he could have walked
    ['^#Mod have #Past$', 'P'],
  ],
  'modal-infinitive': [
    // he can walk
    ['^#Mod #Inf$', ''],
  ],

  'infinitive': [
    // walk
    ['^#Inf$', ''],
  ],
}

const list = []
Object.keys(verbForms).map(k => {
  verbForms[k].forEach(a => {
    list.push({
      name: k,
      match: expandTags(a[0]),
      data: Object.assign({}, ...[...a[1]].map(c => flags[c])),
    })
  })
})

export default list
