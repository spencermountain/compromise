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
    ['#Imperative', []],
  ],

  'want-infinitive': [
    ['^(want|wants|wanted) to #Infinitive$', [present]],
    ['^wanted to #Infinitive$', [past]],
    ['^will want to #Infinitive$', [future]],
  ],

  'gerund-phrase': [
    // started looking
    ['^#PastTense #Gerund$', [past]],
    // starts looking
    ['^#PresentTense #Gerund$', [present]],
    // start looking
    ['^#Infinitive #Gerund$', [present]],
    // will start looking
    ['^will #Infinitive #Gerund$', [future]],
    // have started looking
    ['^have #PastTense #Gerund$', [past]],
    // will have started looking
    ['^will have #PastTense #Gerund$', [past]],
  ],

  'simple-present': [
    // he walks',
    ['^#PresentTense$', [present]],
    // we walk
    ['^#Infinitive$', [present]],
  ],
  'simple-past': [
    // he walked',
    ['^#PastTense$', [past]],
  ],
  'simple-future': [
    // he will walk
    ['^will #Adverb? #Infinitive', [future]],
  ],

  // === Progressive ===
  'present-progressive': [
    // he is walking
    ['^(is|are|am) #Gerund$', [present, prog]],
  ],
  'past-progressive': [
    // he was walking
    ['^(was|were) #Gerund$', [past, prog]],
  ],
  'future-progressive': [
    // he will be
    ['^will be #Gerund$', [future, prog]],
  ],

  // === Perfect ===
  'present-perfect': [
    // he has walked
    ['^(has|have) #PastTense$', [past, complete]], //past?
  ],
  'past-perfect': [
    // he had walked
    ['^had #PastTense$', [past, complete]],
    // had been to see
    ['^had #PastTense to #Infinitive', [past, complete]],
  ],
  'future-perfect': [
    // he will have
    ['^will have #PastTense$', [future, complete]],
  ],

  // === Progressive-perfect ===
  'present-perfect-progressive': [
    ['^(has|have) been going to be #Gerund$', [past, prog]],
    // he has been walking
    ['^(has|have) been #Gerund$', [past, prog]], //present?
  ],
  'past-perfect-progressive': [
    // he had been
    ['^had been #Gerund$', [past, prog]],
  ],
  'future-perfect-progressive': [
    // will have been
    ['^will have been #Gerund$', [future, prog]],
  ],

  // ==== Passive ===
  'passive-past': [
    ['^(was|were) being? (#PastTense|#Participle)$', [past, passive]],
    ['^(had|have) been being? (#PastTense|#Participle)$', [past, passive]],
    // got walked, was walked, were walked
    ['(got|were|was) #Passive', [past, passive]],
    // was being walked
    ['^(was|were) being #Passive', [past, passive]],
    // had been walked, have been eaten
    ['^(had|have) been #Passive', [past, passive]],
  ],
  'passive-present': [
    ['^(is|are|am) being? (#PastTense|#Participle)$', [present, passive]],
    ['^has been being? (#PastTense|#Participle)$', [present, passive]],
    // is walked, are stolen
    ['^(is|are|am) #Passive', [present, passive]],
    // is being walked
    ['^(is|are|am) being #Passive', [present, passive]],
    // has been cleaned
    ['^has been #Passive', [present, passive]],
  ],
  'passive-future': [
    ['^will have been being? (#PastTense|#Participle)$', [future, passive, conditional]],
    ['^will be being? (#PastTense|#Participle)$', [future, passive, conditional]],
    // will have been walked
    ['will have been #Passive', [future, passive, conditional]],
    // will be cleaned
    ['will be being? #Passive', [future, passive, conditional]],
  ],

  // === Conditional ===
  'present-conditional': [
    // would be walked
    ['^#Modal be #PastTense$', [present, conditional, passive]],
  ],
  'past-conditional': [
    // would have been walked
    ['^#Modal have been #PastTense$', [past, conditional, passive]],
  ],

  // ==== Auxiliary ===
  'auxiliary-future': [
    ['^(is|are|am|was|were) going to be #Gerund$', [future, prog]],
    // going to drink
    ['(is|are|am|was) going to (#Infinitive|#PresentTense)', [future]],
  ],
  'auxiliary-past': [
    // he did walk
    ['^did #Infinitive$', [past, singular]],
    // used to walk
    ['^used to #Infinitive$', [past, complete]],
  ],
  'auxiliary-present': [
    // we do walk
    ['^(does|do) #Infinitive$', [present, complete, plural]],
  ],

  // === modals ===
  'modal-past': [
    // he could have walked
    ['^(could|must|should|shall) have #PastTense$', [past]],
  ],
  'modal-infinitive': [
    // he can walk
    ['^#Modal #Infinitive$', []],
  ],

  'infinitive': [
    // walk
    ['^#Infinitive$', []],
  ],
}

const list = []
Object.keys(verbForms).map(k => {
  verbForms[k].forEach(a => {
    list.push({
      name: k,
      match: a[0],
      data: getData(a[1]),
    })
  })
})

export default list
