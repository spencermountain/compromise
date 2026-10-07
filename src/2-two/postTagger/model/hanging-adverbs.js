const object = '(#Det|#Poss)? #Adj+? #NN+'
const time = '(daily|weekly|monthly|overnight|together|early|late)'
const place = '(here|upstairs|downstairs|outdoors|inside|outside|nearby)'
const tail = '(#Date|#Adv)+?$'

const rules = [
  // waters the roses [daily]; worked [together] yesterday
  ...['', object].map(between => ({
    m: `(#V && !#Cop && !be && !been && !being) ${between} [${time}] ${tail}`,
    g: 0, t: 'Adv', r: 'hanging-time',
  })),
  // carried the laundry [upstairs]; fresh towels [upstairs]
  ...['', object].map(between => ({
    m: `${between ? '#V' : '(#V && !#Cop)'} ${between} [${place}] ${tail}`,
    g: 0, t: 'Adv', r: 'hanging-place',
  })),
  // walked [home]; works [downtown] (but visited downtown)
  {
    m: '(go|goes|went|walk|walked|walks|work|works|worked|come|came|comes|going|walking|working|coming) [(home|downtown)] (together|#Date|#Adv)+?$',
    g: 0, t: 'Adv', r: 'direction-adverb',
  },
  // chauffeur the guests [home]; leave home purchases as nouns
  ...['#Pron', object].map(between => ({
    m: `(chauffeur|chauffeurs|chauffeured|chauffeuring|drive|drives|drove|driven|driving|escort|escorts|escorted|escorting) ${between} [home] ${tail}`,
    g: 0, t: 'Adv', r: 'transport-home',
  })),
  // boss everyone [around], with a separated object
  {
    m: `(boss|bosses|bossed|bossing) ${object} [around] ${tail}`,
    g: 0, t: 'Adv', r: 'boss-around',
  },
  // come here [now]
  { m: 'here [now]$', g: 0, t: 'Adv', r: 'here-now' },
]

export default rules
