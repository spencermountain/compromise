export default [
  // he walks',
  { name: 'present-simple', match: '^#PresentTense$', props: { tense: 'present' } },
  // he walked',
  { name: 'past-simple', match: '^#PastTense$', props: { tense: 'past' } },
  // he will walk
  { name: 'future-simple', match: '^will #Infinitive$', props: { tense: 'future' } },

  // === simple progressive tenses===
  // he is walking
  { name: 'present-progressive', match: '^(is|are|am) #Gerund$', props: { tense: 'present', progressive: true } },
  // he was walking
  { name: 'past-progressive', match: '^was #Gerund$', props: { tense: 'past', progressive: true } },
  // he will be
  { name: 'future-progressive', match: '^will be #Gerund$', props: { tense: 'future', progressive: true } },

  // === perfect tenses===
  // he has walked
  { name: 'present-perfect', match: '^(has|have) #PastTense$', props: { tense: 'past', complete: true } },
  // he had walked
  { name: 'past-perfect', match: '^had #PastTense$', props: { tense: 'past', complete: true } },
  // he will have
  { name: 'future-perfect', match: '^will have #PastTense$', props: { tense: 'future', complete: true } },

  // === progressive-perfect tenses===
  // he has been
  {
    name: 'present-perfect-progressive',
    match: '^has been #Gerund$',
    props: { tense: 'past', progressive: true },
  },
  // he had been
  { name: 'past-perfect-progressive', match: '^had been #Gerund$', props: { tense: 'past', progressive: true } },
  // will have been
  {
    name: 'future-perfect-progressive',
    match: '^will have been #Gerund$',
    props: { tense: 'future', progressive: true },
  },

  // ==== Auxiliary ===
  // used to walk
  { name: 'aux-used-to', match: '^used to #Infinitive$', props: { tense: 'past', complete: true } },
  // going to drink
  { name: 'aux-go', match: '(is|are|am|was) going to (#Infinitive|#PresentTense)', props: { tense: 'future' } },

  // === past-tense ===
  // were walked, had been walked
  // { name: 'passive-voice', match: '^were #PastTense$', '^had been #PastTense$', props: { tense: 'past', voice:'passive' } },

  // === auxiliary verbs ===
  // he can walk
  // { name: 'modal-infinitive', match: '^can #Infinitive$', '^must #Infinitive$', '^should #Infinitive$', props: {} },
  // {
  //   name: 'modal-past',
  //   match: '^must have #PastTense$', '^should have #PastTense$', '^could have #PastTense$',
  //   props: { tense: 'past' },
  // },
  { name: 'want-infinitive', match: '^(want|wants|wanted) to #Infinitive$', props: {} },
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
