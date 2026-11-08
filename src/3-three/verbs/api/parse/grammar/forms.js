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

// the grammar form names used by the conjugators
const Imperative = 'imperative'
const WantInf = 'want-infinitive'
const GerPhrase = 'gerund-phrase'
const SimplePres = 'simple-present'
const SimplePast = 'simple-past'
const SimpleFut = 'simple-future'
const PresCond = 'present-conditional'
const PastCond = 'past-conditional'
const AuxFut = 'auxiliary-future'
const AuxPast = 'auxiliary-past'
const AuxPres = 'auxiliary-present'
const ModalPast = 'modal-past'
const ModalInf = 'modal-infinitive'
const ModalPerfProg = 'modal-perfect-progressive'
const PassivePast = 'passive-past'
const InfForm = 'infinitive'

const verbForms = {
  // === Simple ===
  [Imperative]: [
    // walk!
    ['#Imp', ''],
  ],

  [WantInf]: [
    ['^(want|wants|wanted) to #Inf$', 'p'],
    ['^wanted to #Inf$', 'P'],
    ['^will want to #Inf$', 'f'],
  ],

  [GerPhrase]: [
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

  [SimplePres]: [
    // he walks',
    ['^#Pres$', 'p'],
    // we walk
    ['^#Inf$', 'p'],
  ],
  [SimplePast]: [
    // he walked',
    ['^#Past$', 'P'],
  ],
  [SimpleFut]: [
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
  [PassivePast]: [
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
  [PresCond]: [
    // would be walked
    ['^#Mod be #Past$', 'pdv'],
  ],
  [PastCond]: [
    // would have been walked
    ['^#Mod have been #Past$', 'Pdv'],
  ],

  // ==== Auxiliary ===
  [AuxFut]: [
    ['^(is|are|am|was|were) going to be #Ger$', 'fg'],
    // going to drink
    ['(is|are|am|was|were) going to (#Inf|#Pres)', 'f'],
  ],
  [AuxPast]: [
    // he did walk
    ['^did #Inf$', 'Ps'],
    // used to walk
    ['^used to #Inf$', 'Pc'],
  ],
  [AuxPres]: [
    // we do walk
    ['^(does|do) #Inf$', 'pcl'],
  ],

  // === modals ===
  [ModalPerfProg]: [
    ['^#Mod have been #Ger$', 'Pg'],
  ],
  [ModalPast]: [
    // he could have walked
    ['^#Mod have #Past$', 'P'],
  ],
  [ModalInf]: [
    // he can walk
    ['^#Mod #Inf$', ''],
  ],

  [InfForm]: [
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

export { Imperative, WantInf, GerPhrase, SimplePres, SimplePast, SimpleFut, PresCond, PastCond, AuxFut, AuxPast, AuxPres, ModalPast, ModalInf, ModalPerfProg, PassivePast, InfForm }
export default list
