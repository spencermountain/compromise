import { Adv } from '../../preTagger/tagSet/_lib.js'

const object = '(#Det|#Poss)? #Adj+? #NN+'
const time = '(daily|weekly|monthly|overnight|together|early|late)'
const place = '(here|upstairs|downstairs|outdoors|inside|outside|nearby)'
const tail = '(#Date|#Adv)+?$'

const rules = [
  // waters the roses [daily]; worked [together] yesterday → Adverb
  ...['', object].map(between => [`(#V && !#Cop && !be && !been && !being) ${between} [${time}] ${tail}`, Adv, 0]),
  // carried the laundry [upstairs]; fresh towels [upstairs] → Adverb
  ...['', object].map(between => [`${between ? '#V' : '(#V && !#Cop)'} ${between} [${place}] ${tail}`, Adv, 0]),
  // walked [home]; works [downtown] (but visited downtown) → Adverb
  [
    '(go|goes|went|walk|walked|walks|work|works|worked|come|came|comes|going|walking|working|coming) [(home|downtown)] (together|#Date|#Adv)+?$',
    Adv, 0,
  ],
  // chauffeur the guests [home]; leave home purchases as nouns → Adverb
  ...[
    '#Pron',
    object,
  ].map(between => [
    `(chauffeur|chauffeurs|chauffeured|chauffeuring|drive|drives|drove|driven|driving|escort|escorts|escorted|escorting) ${between} [home] ${tail}`,
    Adv, 0,
  ]),
  // boss everyone [around], with a separated object → Adverb
  [`(boss|bosses|bossed|bossing) ${object} [around] ${tail}`, Adv, 0],
  // come here [now] → Adverb
  ['here [now]$', Adv, 0],
]

export default rules
