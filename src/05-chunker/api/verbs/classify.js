export default [
  // he walks',
  { name: 'present-simple', match: '^#PresentTense$', tense: 'present' },
  // he walked',
  { name: 'past-simple', match: '^#PastTense$', tense: 'past' },
  // he will walk
  { name: 'future-simple', match: '^will #Infinitive$', tense: 'future' },

  // === simple progressive tenses===
  // he is walking
  { name: 'present-progressive', match: '^(is|are|am) #Gerund$', tense: 'present', progressive: true },
  // he was walking
  { name: 'past-progressive', match: '^was #Gerund$', tense: 'past', progressive: true },
  // he will be
  { name: 'future-progressive', match: '^will be #Gerund$', tense: 'future', progressive: true },

  // === perfect tenses===
  // he has walked
  { name: 'present-perfect', match: '^(has|have) #PastTense$', tense: 'past', complete: true },
  // he had walked
  { name: 'past-perfect', match: '^had #PastTense$', tense: 'past', complete: true },
  // he will have
  { name: 'future-perfect', match: '^will have #PastTense$', tense: 'future', complete: true },

  // === progressive-perfect tenses===
  // he has been
  {
    name: 'present-perfect-progressive',
    match: '^has been #Gerund$',
    tense: 'past',
    progressive: true,
  },
  // he had been
  { name: 'past-perfect-progressive', match: '^had been #Gerund$', tense: 'past', progressive: true },
  // will have been
  {
    name: 'future-perfect-progressive',
    match: '^will have been #Gerund$',
    tense: 'future',
    progressive: true,
  },

  // ==== Auxiliary ===
  // used to walk
  { name: 'aux-used-to', match: '^used to #Infinitive$', tense: 'past', complete: true },
  // going to drink
  { name: 'aux-go', match: '(is|are|am|was) going to (#Infinitive|#PresentTense)', tense: 'future' },

  // === past-tense ===
  // were walked, had been walked
  // { name: 'passive-voice', match: '^were #PastTense$', '^had been #PastTense$',  tense: 'past', voice:'passive' } ,

  // === auxiliary verbs ===
  // he can walk
  // { name: 'modal-infinitive', match: '^can #Infinitive$', '^must #Infinitive$', '^should #Infinitive$', } ,
  // {
  //   name: 'modal-past',
  //   match: '^must have #PastTense$', '^should have #PastTense$', '^could have #PastTense$',
  //    tense: 'past' ,
  // },
  { name: 'want-infinitive', match: '^(want|wants|wanted) to #Infinitive$' },
]

// missing:
//  - 'has been elected'
//  - 'would have been elected'

//  - 'was elected'
//  - 'are elected'
//  - 'is elected'

//  - 'could elect'
//  - 'shall elect'
//  - 'can elect'
//  - 'did elect'
