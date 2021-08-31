const forms = [
  // he walks',
  { name: 'simple-present', match: '^#PresentTense$', tense: 'PresentTense' },
  // he walked',
  { name: 'simple-past', match: '^#PastTense$', tense: 'PastTense' },
  // he will walk
  { name: 'simple-future', match: '^will #Infinitive$', tense: 'FutureTense' },

  // === progressive tenses===
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
    match: '^(has|have) been #Gerund$',
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
  // got walked, was walked, were walked
  { name: 'passive-past', match: '(got|were|was) (#PastTense|#Participle)', tense: 'PastTense', passive: true },
  // is walked, are stolen
  { name: 'passive-present', match: '^(is|are) (#PastTense|#Participle)', tense: 'PresentTense', passive: true },
  // had been walked, have been eaten
  { name: 'passive-past', match: '^(had|have) been (#PastTense|#Participle)', tense: 'PastTense', passive: true },
  // has been cleaned
  { name: 'passive-present', match: '^has been (#PastTense|#Participle)', tense: 'PresentTense', passive: true },

  // will have been walked
  {
    name: 'passive-future',
    match: 'will have been (#PastTense|#Participle)',
    passive: true,
    conditional: true,
    tense: 'FutureTense',
  },

  // === Conditional tenses===
  { name: 'present-conditional', match: 'would be #PastTense', conditional: true, tense: 'PresentTense' },
  { name: 'past-conditional', match: 'would have been #PastTense', conditional: true, tense: 'PastTense' },

  // { name: '', match: '', conditional: true },

  // ==== Auxiliary ===
  // going to drink
  // { name: 'aux-go', match: '(is|are|am|was) going to (#Infinitive|#PresentTense)', tense: 'FutureTense' },
  // he did walk
  // { name: 'aux-do', match: '^did #Infinitive$', tense: 'PastTense', plural: false },
  // { name: 'aux-does', match: '^does #Infinitive$', tense: 'PresentTense', plural: true, complete: false },
  // used to walk
  // { name: 'aux-used-to', match: '^used to #Infinitive$', tense: 'PastTense', complete: true },
  // === modals ===
  // he can walk
  // { name: 'modal-infinitive', match: '^(can|must|should|shall) #Infinitive$' },
  // he could have walked
  // { name: 'modal-past', match: '^(could|must|should|shall) have #PastTense$', tense: 'PastTense' },
  // { name: 'want-infinitive', match: '^(want|wants|wanted) to #Infinitive$' },
]
// do longest ones first
forms.reverse()

export default forms
// missing:
//  - 'has been elected'
//  - 'would have been elected'

//  - 'was elected'
//  - 'are elected'
//  - 'is elected'

//  - 'did elect'
