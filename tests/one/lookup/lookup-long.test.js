import test from 'tape'
import nlp from '../_lib.js'
import text from './_text.js'
const here = '[one/lookup-long] '

let arr = [
  `Toronto Aeros`,
  `Toronto Arenas`,
  `Toronto Aura Lee`,
  `Toronto 228th Battalion (NHA)`,
  `Toronto Blueshirts`,
  `Toronto Jr. Canadiens`,
  `Dixie Beehives (2005–11)`,
  `East York Lyndhursts`,
  `Toronto Granites`,
  `Toronto Knob Hill Farms`,
  `Toronto Lions`,
  `Toronto Maple Leafs`,
  `Toronto Marlboros`,
  `Toronto Marlies`,
  `Mimico Monarchs`,
  `Toronto Native Sons`,
  `Niagara-on-the-Lake Predators`,
  `North York Rangers`,
  `North York Rangers (1967–1984)`,
  `Toronto Ontarios`,
  `Toronto Professional Hockey Club`,
  `Toronto Ravinas`,
  `Toronto Roadrunners`,
  `Royal York Royals`,
  `Toronto St. Patricks`,
  `Toronto Shamrocks`,
  `St. Michael's Buzzers`,
  `Toronto Tecumsehs`,
  `Toronto Toros`,
  `Toronto Attack`,
  `Toronto Furies`,
  `Toronto Jr. Aeros`,
  `Toronto Neil McNeil Maroons`,
  `Toronto Patriots`,
  `Toronto Six`,
  `Toronto St. Michael's Majors`,
  `Toronto Varsity Blues men's ice hockey`,
  `Torontos`,
  `Toronto Wellingtons`,
  `West Toronto Nationals`,
  `Toronto Young Rangers`,
]


test('lookup-long', function (t) {
  let trie = nlp.compile(arr)
  let doc = nlp(text)
  // doc.lookup(trie).debug()
  t.end()
})