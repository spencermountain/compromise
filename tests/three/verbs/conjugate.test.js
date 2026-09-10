import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-conjugate] '

const arr = [
  {
    Infinitive: 'allow',
    PresentTense: 'allows',
    Gerund: 'allowing',
    PastTense: 'allowed',
  },
  {
    Infinitive: 'vow',
    PresentTense: 'vows',
    Gerund: 'vowing',
    PastTense: 'vowed',
  },
  {
    Infinitive: 'grow',
    PresentTense: 'grows',
    Gerund: 'growing',
    PastTense: 'grew',
  },
  {
    Infinitive: 'overthrow',
    PresentTense: 'overthrows',
    Gerund: 'overthrowing',
    PastTense: 'overthrew',
  },
  {
    Infinitive: 'guide',
    PresentTense: 'guides',
    Gerund: 'guiding',
    PastTense: 'guided',
  },
  {
    Infinitive: 'swallow',
    PresentTense: 'swallows',
    Gerund: 'swallowing',
    PastTense: 'swallowed',
  },
  {
    Infinitive: 'convolute',
    PresentTense: 'convolutes',
    Gerund: 'convoluting',
    PastTense: 'convoluted',
  },
  {
    PresentTense: 'presents',
    Gerund: 'presenting',
    PastTense: 'presented',
    Infinitive: 'present',
  },
  {
    PresentTense: 'angulates',
    Gerund: 'angulating',
    PastTense: 'angulated',
    Infinitive: 'angulate',
  },
  {
    PresentTense: 'conjures',
    Gerund: 'conjuring',
    PastTense: 'conjured',
    Infinitive: 'conjure',
  },
  {
    PresentTense: 'denounces',
    Gerund: 'denouncing',
    PastTense: 'denounced',
    Infinitive: 'denounce',
  },
  {
    PresentTense: 'watches',
    Gerund: 'watching',
    PastTense: 'watched',
    Infinitive: 'watch',
  },
  {
    PresentTense: 'tingles',
    Gerund: 'tingling',
    PastTense: 'tingled',
    Infinitive: 'tingle',
  },
  {
    PresentTense: 'mortises',
    Gerund: 'mortising',
    PastTense: 'mortised',
    Infinitive: 'mortise',
  },
  {
    PresentTense: 'disguises',
    Gerund: 'disguising',
    PastTense: 'disguised',
    Infinitive: 'disguise',
  },
  {
    Infinitive: 'effect',
    Gerund: 'effecting',
    PastTense: 'effected',
    PresentTense: 'effects',
  },
  {
    Infinitive: 'want',
    Gerund: 'wanting',
    PastTense: 'wanted',
    PresentTense: 'wants',
  },
  {
    Infinitive: 'power',
    Gerund: 'powering',
    PastTense: 'powered',
    PresentTense: 'powers',
  },
  {
    Infinitive: 'overcompensate',
    PresentTense: 'overcompensates',
    PastTense: 'overcompensated',
    Gerund: 'overcompensating',
  },
  {
    Infinitive: 'ice',
    PresentTense: 'ices',
    PastTense: 'iced',
    Gerund: 'icing',
  },
  {
    Infinitive: 'buy',
    PresentTense: 'buys',
    PastTense: 'bought',
    Gerund: 'buying',
  },
  {
    Infinitive: 'flower',
    PresentTense: 'flowers',
    PastTense: 'flowered',
    Gerund: 'flowering',
  },
  {
    Infinitive: 'rage',
    PresentTense: 'rages',
    PastTense: 'raged',
    Gerund: 'raging',
  },
  {
    Infinitive: 'drive',
    PresentTense: 'drives',
    PastTense: 'drove',
    Gerund: 'driving',
  },
  {
    Infinitive: 'foul',
    PresentTense: 'fouls',
    PastTense: 'fouled',
    Gerund: 'fouling',
  },
  {
    Infinitive: 'overthrow',
    PresentTense: 'overthrows',
    Gerund: 'overthrowing',
    PastTense: 'overthrew',
  },
  {
    Infinitive: 'aim',
    PresentTense: 'aims',
    PastTense: 'aimed',
    Gerund: 'aiming',
  },
  {
    PresentTense: 'unifies',
    Gerund: 'unifying',
    PastTense: 'unified',
    Infinitive: 'unify',
  },
  // {
  //   PresentTense: 'addresses',
  //   Gerund: 'addressing',
  //   PastTense: 'addressed',
  //   Infinitive: 'address',
  // },
  {
    Infinitive: 'bumble',
    PresentTense: 'bumbles',
    PastTense: 'bumbled',
    Gerund: 'bumbling',
  },
  {
    Infinitive: 'snipe',
    PresentTense: 'snipes',
    PastTense: 'sniped',
    Gerund: 'sniping',
  },
  {
    PresentTense: 'relishes',
    Gerund: 'relishing',
    PastTense: 'relished',
    Infinitive: 'relish',
  },
  {
    Infinitive: 'lengthen',
    Gerund: 'lengthening',
    PastTense: 'lengthened',
    PresentTense: 'lengthens',
  },
  {
    Infinitive: 'farm',
    PresentTense: 'farms',
    PastTense: 'farmed',
    Gerund: 'farming',
  },
  {
    Infinitive: 'develop',
    PresentTense: 'develops',
    PastTense: 'developed',
    Gerund: 'developing',
  },
  {
    Infinitive: 'study',
    PresentTense: 'studies',
    PastTense: 'studied',
    Gerund: 'studying',
  },
  {
    Infinitive: 'criticise',
    PresentTense: 'criticises',
    PastTense: 'criticised',
    Gerund: 'criticising',
  },
  {
    Infinitive: 'speak',
    PresentTense: 'speaks',
    PastTense: 'spoke',
    Gerund: 'speaking',
  },
  {
    Infinitive: 'fuzz',
    PresentTense: 'fuzzes',
    PastTense: 'fuzzed',
    Gerund: 'fuzzing',
  },
  {
    Infinitive: 'invest',
    PresentTense: 'invests',
    PastTense: 'invested',
    Gerund: 'investing',
  },
  {
    Infinitive: 'shed',
    PresentTense: 'sheds',
    PastTense: 'shed',
    Gerund: 'shedding',
  },
  {
    Infinitive: 'ace',
    PresentTense: 'aces',
    PastTense: 'aced',
    Gerund: 'acing',
  },
  {
    Infinitive: 'egg',
    PresentTense: 'eggs',
    PastTense: 'egged',
    Gerund: 'egging',
  },
  {
    Infinitive: 'sit in',
    PresentTense: 'sits in',
    PastTense: 'sat in',
    Gerund: 'sitting in',
  },
  {
    Infinitive: 'walk',
    PresentTense: 'walks',
    PastTense: 'walked',
    Gerund: 'walking',
  },
  {
    Infinitive: 'jump',
    PresentTense: 'jumps',
    PastTense: 'jumped',
    Gerund: 'jumping',
  },
  {
    Infinitive: 'laugh',
    PresentTense: 'laughs',
    PastTense: 'laughed',
    Gerund: 'laughing',
  },
  {
    Infinitive: 'listen',
    PresentTense: 'listens',
    PastTense: 'listened',
    Gerund: 'listening',
  },
  {
    Infinitive: 'hope',
    PresentTense: 'hopes',
    PastTense: 'hoped',
    Gerund: 'hoping',
  },
  {
    Infinitive: 'bake',
    PresentTense: 'bakes',
    PastTense: 'baked',
    Gerund: 'baking',
  },
  {
    Infinitive: 'smile',
    PresentTense: 'smiles',
    PastTense: 'smiled',
    Gerund: 'smiling',
  },
  {
    Infinitive: 'dance',
    PresentTense: 'dances',
    PastTense: 'danced',
    Gerund: 'dancing',
  },
  {
    Infinitive: 'carry',
    PresentTense: 'carries',
    PastTense: 'carried',
    Gerund: 'carrying',
  },
  {
    Infinitive: 'try',
    PresentTense: 'tries',
    PastTense: 'tried',
    Gerund: 'trying',
  },
  {
    Infinitive: 'worry',
    PresentTense: 'worries',
    PastTense: 'worried',
    Gerund: 'worrying',
  },
  {
    Infinitive: 'hurry',
    PresentTense: 'hurries',
    PastTense: 'hurried',
    Gerund: 'hurrying',
  },
  {
    Infinitive: 'play',
    PresentTense: 'plays',
    PastTense: 'played',
    Gerund: 'playing',
  },
  {
    Infinitive: 'enjoy',
    PresentTense: 'enjoys',
    PastTense: 'enjoyed',
    Gerund: 'enjoying',
  },
  {
    Infinitive: 'obey',
    PresentTense: 'obeys',
    PastTense: 'obeyed',
    Gerund: 'obeying',
  },
  {
    Infinitive: 'wash',
    PresentTense: 'washes',
    PastTense: 'washed',
    Gerund: 'washing',
  },
  {
    Infinitive: 'kiss',
    PresentTense: 'kisses',
    PastTense: 'kissed',
    Gerund: 'kissing',
  },
  {
    Infinitive: 'fix',
    PresentTense: 'fixes',
    PastTense: 'fixed',
    Gerund: 'fixing',
  },
  {
    Infinitive: 'stop',
    PresentTense: 'stops',
    PastTense: 'stopped',
    Gerund: 'stopping',
  },
  {
    Infinitive: 'plan',
    PresentTense: 'plans',
    PastTense: 'planned',
    Gerund: 'planning',
  },
  {
    Infinitive: 'rub',
    PresentTense: 'rubs',
    PastTense: 'rubbed',
    Gerund: 'rubbing',
  },
  {
    Infinitive: 'admit',
    PresentTense: 'admits',
    PastTense: 'admitted',
    Gerund: 'admitting',
  },
  {
    Infinitive: 'prefer',
    PresentTense: 'prefers',
    PastTense: 'preferred',
    Gerund: 'preferring',
  },
  {
    Infinitive: 'go',
    PresentTense: 'goes',
    PastTense: 'went',
    Gerund: 'going',
  },
  {
    Infinitive: 'eat',
    PresentTense: 'eats',
    PastTense: 'ate',
    Gerund: 'eating',
  },
  {
    Infinitive: 'write',
    PresentTense: 'writes',
    PastTense: 'wrote',
    Gerund: 'writing',
  },
  {
    Infinitive: 'bring',
    PresentTense: 'brings',
    PastTense: 'brought',
    Gerund: 'bringing',
  },
  {
    Infinitive: 'catch',
    PresentTense: 'catches',
    PastTense: 'caught',
    Gerund: 'catching',
  },
  {
    Infinitive: 'choose',
    PresentTense: 'chooses',
    PastTense: 'chose',
    Gerund: 'choosing',
  },
  {
    Infinitive: 'teach',
    PresentTense: 'teaches',
    PastTense: 'taught',
    Gerund: 'teaching',
  },
  {
    Infinitive: 'run',
    PresentTense: 'runs',
    PastTense: 'ran',
    Gerund: 'running',
  },
  {
    Infinitive: 'swim',
    PresentTense: 'swims',
    PastTense: 'swam',
    Gerund: 'swimming',
  },
  {
    Infinitive: 'begin',
    PresentTense: 'begins',
    PastTense: 'began',
    Gerund: 'beginning',
  },
  {
    Infinitive: 'forget',
    PresentTense: 'forgets',
    PastTense: 'forgot',
    Gerund: 'forgetting',
  },
  {
    Infinitive: 'take',
    PresentTense: 'takes',
    PastTense: 'took',
    Gerund: 'taking',
  },
  {
    Infinitive: 'give',
    PresentTense: 'gives',
    PastTense: 'gave',
    Gerund: 'giving',
  },
  {
    Infinitive: 'feel',
    PresentTense: 'feels',
    PastTense: 'felt',
    Gerund: 'feeling',
  },
  {
    Infinitive: 'sleep',
    PresentTense: 'sleeps',
    PastTense: 'slept',
    Gerund: 'sleeping',
  },
  {
    Infinitive: 'cut',
    PresentTense: 'cuts',
    PastTense: 'cut',
    Gerund: 'cutting',
  },
  {
    Infinitive: 'put',
    PresentTense: 'puts',
    PastTense: 'put',
    Gerund: 'putting',
  },
  {
    Infinitive: 'read',
    PresentTense: 'reads',
    PastTense: 'read',
    Gerund: 'reading',
  },
  {
    Infinitive: 'take off',
    PresentTense: 'takes off',
    PastTense: 'took off',
    Gerund: 'taking off',
  },
  {
    Infinitive: 'give up',
    PresentTense: 'gives up',
    PastTense: 'gave up',
    Gerund: 'giving up',
  },
  {
    Infinitive: 'bring back',
    PresentTense: 'brings back',
    PastTense: 'brought back',
    Gerund: 'bringing back',
  },
  {
    Infinitive: 'carry on',
    PresentTense: 'carries on',
    PastTense: 'carried on',
    Gerund: 'carrying on',
  },

]
test('conjugation:', function (t) {
  const test_conjugation = function (inf, o, form, original) {
    const msg = 'from ' + original + ' to ' + form + ':  [' + o[original] + '] -> [' + inf[form] + ']'
    t.equal(inf[form], o[form], here + msg)
  }

  arr.forEach(function (o) {
    const forms = ['Infinitive', 'PastTense', 'PresentTense']//'Gerund'
    for (let i = 0; i < forms.length; i++) {
      const from = forms[i]
      const inf = nlp(o[from]).tag('Verb').verbs().conjugate()[0] || {}
      test_conjugation(inf, o, 'Infinitive', from)
      test_conjugation(inf, o, 'PastTense', from)
      test_conjugation(inf, o, 'PresentTense', from)
      // test_conjugation(inf, o, 'Gerund', from)
    }
  })
  t.end()
})
