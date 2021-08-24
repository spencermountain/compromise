export default [
  // he walks',
  { name: 'present-simple', match: '^#PresentTense$', tense: 'PresentTense' },
  // he walked',
  { name: 'past-simple', match: '^#PastTense$', tense: 'PastTense' },
  // he will walk
  { name: 'future-simple', match: '^will #Infinitive$', tense: 'FutureTense' },

  // === simple progressive tenses===
  // he is walking
  { name: 'present-progressive', match: '^(is|are|am) #Gerund$', tense: 'PresentTense', progressive: true },
  // he was walking
  { name: 'past-progressive', match: '^was #Gerund$', tense: 'PastTense', progressive: true },
  // he will be
  { name: 'future-progressive', match: '^will be #Gerund$', tense: 'FutureTense', progressive: true },

  // === perfect tenses===
  // he has walked
  { name: 'present-perfect', match: '^(has|have) #PastTense$', tense: 'PastTense', complete: true },
  // he had walked
  { name: 'past-perfect', match: '^had #PastTense$', tense: 'PastTense', complete: true },
  // he will have
  { name: 'future-perfect', match: '^will have #PastTense$', tense: 'FutureTense', complete: true },

  // === progressive-perfect tenses===
  // he has been
  {
    name: 'present-perfect-progressive',
    match: '^has been #Gerund$',
    tense: 'PastTense',
    progressive: true,
  },
  // he had been
  { name: 'past-perfect-progressive', match: '^had been #Gerund$', tense: 'PastTense', progressive: true },
  // will have been
  {
    name: 'future-perfect-progressive',
    match: '^will have been #Gerund$',
    tense: 'FutureTense',
    progressive: true,
  },

  // ==== Passive ===
  // got walked
  { name: 'passive-past', match: 'got #PastTense', tense: 'PastTense', passive: true },
  // were walked
  { name: 'passive-plural', match: '^were #PastTense', tense: 'PastTense', passive: true },
  // had been walked
  { name: 'passive-progressive', match: '^had been #PastTense', tense: 'PastTense', passive: true },

  // ==== Auxiliary ===
  // going to drink
  { name: 'aux-go', match: '(is|are|am|was) going to (#Infinitive|#PresentTense)', tense: 'FutureTense' },
  // he did walk
  { name: 'aux-do', match: '^did #Infinitive$', tense: 'PastTense', plural: false },
  { name: 'aux-does', match: '^does #Infinitive$', tense: 'PresentTense', plural: true, complete: false },
  // used to walk
  { name: 'aux-used-to', match: '^used to #Infinitive$', tense: 'PastTense', complete: true },
  // === modals ===
  // he can walk
  { name: 'modal-infinitive', match: '^(can|must|should|shall) #Infinitive$' },
  // he could have walked
  { name: 'modal-past', match: '^(could|must|should|shall) have #PastTense$', tense: 'PastTense' },
  //
  // { name: 'want-infinitive', match: '^(want|wants|wanted) to #Infinitive$' },
]

// missing:
//  - 'has been elected'
//  - 'would have been elected'

//  - 'was elected'
//  - 'are elected'
//  - 'is elected'

//  - 'did elect'
