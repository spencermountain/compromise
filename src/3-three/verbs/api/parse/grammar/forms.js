import expandTags from '../../../../../2-two/postTagger/model/_lib.js'

const present = { tense: 'PresentTense' }
const conditional = { conditional: true }
const future = { tense: 'FutureTense' }
const prog = { progressive: true }
const past = { tense: 'PastTense' }
const complete = { complete: true, progressive: false }
const passive = { passive: true }
const plural = { plural: true }
const singular = { plural: false }

const getData = function (tags) {
  const data = {}
  tags.forEach(o => {
    Object.assign(data, o)
  })
  return data
}

const verbForms = {
  // === Simple ===
  'imperative': [
    // walk!
    ['#Imp', []],
  ],

  'want-infinitive': [
    ['^(want|wants|wanted) to #Inf$', [present]],
    ['^wanted to #Inf$', [past]],
    ['^will want to #Inf$', [future]],
  ],

  'gerund-phrase': [
    // started looking
    ['^#Past #Ger$', [past]],
    // starts looking
    ['^#Pres #Ger$', [present]],
    // start looking
    ['^#Inf #Ger$', [present]],
    // will start looking
    ['^will #Inf #Ger$', [future]],
    // have started looking
    ['^have #Past #Ger$', [past]],
    // will have started looking
    ['^will have #Past #Ger$', [past]],
  ],

  'simple-present': [
    // he walks',
    ['^#Pres$', [present]],
    // we walk
    ['^#Inf$', [present]],
  ],
  'simple-past': [
    // he walked',
    ['^#Past$', [past]],
  ],
  'simple-future': [
    // he will walk
    ['^will #Adv? #Inf', [future]],
  ],

  // === Progressive ===
  'present-progressive': [
    // he is walking
    ['^(is|are|am) #Ger$', [present, prog]],
  ],
  'past-progressive': [
    // he was walking
    ['^(was|were) #Ger$', [past, prog]],
  ],
  'future-progressive': [
    // he will be
    ['^will be #Ger$', [future, prog]],
  ],

  // === Perfect ===
  'present-perfect': [
    // he has walked
    ['^(has|have) #Past$', [past, complete]], //past?
  ],
  'past-perfect': [
    // he had walked
    ['^had #Past$', [past, complete]],
    // had been to see
    ['^had #Past to #Inf', [past, complete]],
  ],
  'future-perfect': [
    // he will have
    ['^will have #Past$', [future, complete]],
  ],

  // === Progressive-perfect ===
  'present-perfect-progressive': [
    ['^(has|have) been going to be #Ger$', [past, prog]],
    // he has been walking
    ['^(has|have) been #Ger$', [past, prog]], //present?
  ],
  'past-perfect-progressive': [
    // he had been
    ['^had been #Ger$', [past, prog]],
  ],
  'future-perfect-progressive': [
    // will have been
    ['^will have been #Ger$', [future, prog]],
  ],

  // ==== Passive ===
  'passive-past': [
    ['^(was|were) being? (#Past|#VBN)$', [past, passive]],
    ['^had been being? (#Past|#VBN)$', [past, passive]],
    // got walked, was walked, were walked
    ['(got|were|was) #Pass', [past, passive]],
    // was being walked
    ['^(was|were) being #Pass', [past, passive]],
    // had been walked
    ['^had been #Pass', [past, passive]],
  ],
  'passive-present': [
    ['^(is|are|am) being? (#Past|#VBN)$', [present, passive]],
    ['^(has|have) been being? (#Past|#VBN)$', [present, passive]],
    // is walked, are stolen
    ['^(is|are|am) #Pass', [present, passive]],
    // is being walked
    ['^(is|are|am) being #Pass', [present, passive]],
    // has/have been cleaned
    ['^(has|have) been #Pass', [present, passive]],
  ],
  'passive-future': [
    ['^will have been being? (#Past|#VBN)$', [future, passive, conditional]],
    ['^will be being? (#Past|#VBN)$', [future, passive, conditional]],
    // will have been walked
    ['will have been #Pass', [future, passive, conditional]],
    // will be cleaned
    ['will be being? #Pass', [future, passive, conditional]],
  ],

  // === Conditional ===
  'present-conditional': [
    // would be walked
    ['^#Mod be #Past$', [present, conditional, passive]],
  ],
  'past-conditional': [
    // would have been walked
    ['^#Mod have been #Past$', [past, conditional, passive]],
  ],

  // ==== Auxiliary ===
  'auxiliary-future': [
    ['^(is|are|am|was|were) going to be #Ger$', [future, prog]],
    // going to drink
    ['(is|are|am|was|were) going to (#Inf|#Pres)', [future]],
  ],
  'auxiliary-past': [
    // he did walk
    ['^did #Inf$', [past, singular]],
    // used to walk
    ['^used to #Inf$', [past, complete]],
  ],
  'auxiliary-present': [
    // we do walk
    ['^(does|do) #Inf$', [present, complete, plural]],
  ],

  // === modals ===
  'modal-perfect-progressive': [
    ['^#Mod have been #Ger$', [past, prog]],
  ],
  'modal-past': [
    // he could have walked
    ['^#Mod have #Past$', [past]],
  ],
  'modal-infinitive': [
    // he can walk
    ['^#Mod #Inf$', []],
  ],

  'infinitive': [
    // walk
    ['^#Inf$', []],
  ],
}

const list = []
Object.keys(verbForms).map(k => {
  verbForms[k].forEach(a => {
    list.push({
      name: k,
      match: expandTags(a[0]),
      data: getData(a[1]),
    })
  })
})

export default list
