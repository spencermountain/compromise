//a list of exceptions to the verb rules
const irregular_verbs = {
  take: {
    perfect: 'have taken',
    pluperfect: 'had taken',
    future_perfect: 'will have taken'
  },
  free: {
    gerund: 'freeing',
    actor: ''
  },
  arise: {
    past: 'arose',
    participle: 'arisen'
  },
  babysit: {
    past: 'babysat',
    actor: 'babysitter'
  },
  be: { // this is crazy-hard and shouldn't be here
    past: 'was',
    present: 'is',
    future: 'will be',
    perfect: 'have been',
    pluperfect: 'had been',
    future_perfect: 'will have been',
    actor: '',
    gerund: 'am'
  },
  is: {
    past: 'was',
    present: 'is',
    future: 'will be',
    perfect: 'have been',
    pluperfect: 'had been',
    future_perfect: 'will have been',
    actor: '',
    gerund: 'being'
  },
  beat: {
    gerund: 'beating',
    actor: 'beater'
  },
  begin: {
    gerund: 'beginning',
    past: 'began'
  },
  bet: {
    actor: 'better'
  },
  bind: {
    past: 'bound'
  },
  bite: {
    gerund: 'biting',
    past: 'bit'
  },
  bleed: {
    past: 'bled'
  },
  break: {
    past: 'broke'
  },
  breed: {
    past: 'bred'
  },
  bring: {
    past: 'brought'
  },
  broadcast: {
    past: 'broadcast'
  },
  build: {
    past: 'built'
  },
  buy: {
    past: 'bought'
  },
  catch: {
    past: 'caught'
  },
  choose: {
    gerund: 'choosing',
    past: 'chose'
  },
  cost: {
    past: 'cost'
  },
  deal: {
    past: 'dealt'
  },
  die: {
    past: 'died',
    gerund: 'dying',
  },
  dig: {
    gerund: 'digging',
    past: 'dug'
  },
  do: {
    past: 'did',
    present: 'does'
  },
  draw: {
    past: 'drew'
  },
  drink: {
    past: 'drank'
  },
  drive: {
    gerund: 'driving',
    past: 'drove'
  },
  eat: {
    gerund: 'eating',
    past: 'ate',
    actor: 'eater'
  },
  fall: {
    past: 'fell'
  },
  feed: {
    past: 'fed'
  },
  feel: {
    past: 'felt',
    actor: 'feeler'
  },
  fight: {
    past: 'fought'
  },
  find: {
    past: 'found'
  },
  fly: {
    past: 'flew'
  },
  forbid: {
    past: 'forbade'
  },
  forget: {
    gerund: 'forgeting',
    past: 'forgot'
  },
  forgive: {
    gerund: 'forgiving',
    past: 'forgave'
  },
  freeze: {
    gerund: 'freezing',
    past: 'froze'
  },
  get: {
    past: 'got'
  },
  give: {
    gerund: 'giving',
    past: 'gave'
  },
  go: {
    past: 'went',
    present: 'goes'
  },
  hang: {
    past: 'hung'
  },
  have: {
    gerund: 'having',
    past: 'had',
    present: 'has'
  },
  hear: {
    past: 'heard'
  },
  hide: {
    past: 'hid'
  },
  hold: {
    past: 'held'
  },
  hurt: {
    past: 'hurt'
  },
  lay: {
    past: 'laid'
  },
  lead: {
    past: 'led'
  },
  leave: {
    past: 'left'
  },
  lie: {
    gerund: 'lying',
    past: 'lay'
  },
  light: {
    past: 'lit'
  },
  lose: {
    gerund: 'losing',
    past: 'lost'
  },
  make: {
    past: 'made'
  },
  mean: {
    past: 'meant'
  },
  meet: {
    gerund: 'meeting',
    past: 'met',
    actor: 'meeter'
  },
  pay: {
    past: 'paid'
  },
  read: {
    past: 'read'
  },
  ring: {
    past: 'rang'
  },
  rise: {
    past: 'rose'
  },
  run: {
    gerund: 'running',
    past: 'ran'
  },
  say: {
    past: 'said'
  },
  see: {
    past: 'saw'
  },
  sell: {
    past: 'sold'
  },
  shine: {
    past: 'shone'
  },
  shoot: {
    past: 'shot'
  },
  show: {
    past: 'showed'
  },
  sing: {
    past: 'sang'
  },
  sink: {
    past: 'sank',
    pluperfect: 'had sunk'
  },
  sit: {
    past: 'sat'
  },
  slide: {
    past: 'slid'
  },
  speak: {
    past: 'spoke'
  },
  spin: {
    gerund: 'spinning',
    past: 'spun'
  },
  spread: {
    past: 'spread'
  },
  stand: {
    past: 'stood'
  },
  steal: {
    past: 'stole',
    actor: 'stealer'
  },
  stick: {
    past: 'stuck'
  },
  sting: {
    past: 'stung'
  },
  strike: {
    gerund: 'striking',
    past: 'struck'
  },
  swear: {
    past: 'swore'
  },
  swim: {
    past: 'swam'
  },
  swing: {
    past: 'swung'
  },
  teach: {
    past: 'taught',
    present: 'teaches'
  },
  tear: {
    past: 'tore'
  },
  tell: {
    past: 'told'
  },
  think: {
    past: 'thought'
  },
  understand: {
    past: 'understood'
  },
  wake: {
    past: 'woke'
  },
  wear: {
    past: 'wore'
  },
  win: {
    gerund: 'winning',
    past: 'won'
  },
  withdraw: {
    past: 'withdrew'
  },
  write: {
    gerund: 'writing',
    past: 'wrote'
  },
  tie: {
    gerund: 'tying',
    past: 'tied'
  },
  ski: {
    past: 'skiied'
  },
  boil: {
    actor: 'boiler'
  },
  miss: {
    present: 'miss'
  },
  act: {
    actor: 'actor'
  },
  compete: {
    gerund: 'competing',
    past: 'competed',
    actor: 'competitor'
  },
  being: {
    gerund: 'are',
    past: 'were',
    present: 'are'
  },
  imply: {
    past: 'implied',
    present: 'implies'
  },
  ice: {
    gerund: 'icing',
    past: 'iced'
  },
  develop: {
    past: 'developed',
    actor: 'developer'
  },
  wait: {
    gerund: 'waiting',
    past: 'waited',
    actor: 'waiter'
  },
  aim: {
    actor: 'aimer'
  },
  spill: {
    past: 'spilt'
  },
  drop: {
    gerund: 'dropping',
    past: 'dropped'
  },
  log: {
    gerund: 'logging',
    past: 'logged'
  },
  rub: {
    gerund: 'rubbing',
    past: 'rubbed'
  },
  smash: {
    present: 'smashes'
  },
  suit: {
    gerund: 'suiting',
    past: 'suited',
    actor: 'suiter'
  }
};
module.exports = irregular_verbs;
