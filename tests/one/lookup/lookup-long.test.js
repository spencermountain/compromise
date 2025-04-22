import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/lookup-long] '

const text = `The Toronto Marlborough Athletic Club, commonly known as the Toronto Marlboros, was founded in 1903. It operated junior ice hockey and senior ice hockey teams in the Ontario Hockey Association and later the Ontario Hockey League. The Marlboros were a farm team to the Toronto Maple Leafs and one of the dominant junior teams in history, winning seven Memorial Cup championships. The senior team competed for the Stanley Cup in 1904, and won the Allan Cup in 1950.
Their heritage has been perpetuated by the Toronto Marlboros Hockey Club, which operates several minor ice hockey teams in the Greater Toronto Hockey League; and the Toronto Marlies of the American Hockey League.
The Toronto Marlborough Athletic Club was founded in Toronto, Ontario in 1903 by a group of Toronto sportsmen. It was named after the Duke of Marlborough. A hockey program was started in 1904. The team was commonly known as the Marlboros or Marlies and was also nicknamed the Dukes.
The senior ice hockey team played in the Ontario Hockey Association and won the J. Ross Robertson Cup in 1904, 1905, 1941, 1949 and 1950.
The senior team competed for, but lost, the Stanley Cup in 1904 against the Ottawa Silver Seven. The club was thrust onto the national scene in 1927 when Conn Smythe bought the Toronto Marlboros to be the farm team for his other recently acquired National Hockey League team, the Toronto Maple Leafs. From 1927 to 1989 the Marlboros and Maple Leafs shared common ownership, first under the Smythe family and later under Harold Ballard. Upon the death of Conn Smythe, his son Stafford Smythe inherited the teams, and later sold a portion of both clubs to Harold Ballard. Ballard became sole owner of both teams upon the passing of Stafford Smythe.
The Marlboros served as a farm team for the Maple Leafs for 40 years until direct NHL sponsorship of junior teams ended in 1967 when the NHL made the Entry Draft universal; however, the two clubs continued to remain affiliated under a common ownership until 1989. During this time the Marlboros sent over 180 players to the NHL, including six future Hockey Hall of Fame inductees. The two teams often played double headers on Saturdays, with the junior games in the afternoon and the NHL games in the evening.
The original Hot Stove Club was formed at Maple Leaf Gardens on May 28, 1937, for the purpose of raising funds to support the Marlborough Hockey Club. The Hot Stove Club was given a permanent bar & lounge at Maple Leaf Gardens in 1963. From 1929 to 1975 the Marlboros won the national junior championship seven times.
Marlboro players from the Memorial Cups in the 1950s and 1960s jumped directly to the Maple Leafs, helping them win the Stanley Cup four times in the 1960s. Former NHL stars stayed in the organization to help coach in the junior ranks. Turk Broda and George Armstrong both coached the Marlboros to Memorial Cup victories.
Stafford Smythe organized the Metro Junior A League in 1961 as a rival league to the OHA, with the Marlboros as its charter member. After the league folded in 1963, the Toronto Neil McNeil Maroons were amalgamated into the Marlboros along with prospect players signed to the Toronto Maple Leafs, along with their coach Jim Gregory.
The Marlboros returned to prominence again in 1973, coached by former Toronto Maple Leafs captain George Armstrong. Armstrong's team in 1973 lost only seven games all season, and two years later he coached the Marlboros to their seventh national title in 1975.
The team began to decline in the standings in the late 1970s which continued through the 1980s. Many people felt that Harold Ballard's penny-pinching ways helped contribute to the demise of Canada's most successful junior team. In October 1988, with the team losing hundreds of thousands of dollars a year, Maple Leaf Gardens Limited reached an agreement to sell the Toronto Marlboros for a reported $500,000, severing their ties with the Maple Leafs. The Leafs retained the rights to the Marlies name. The OHL team moved to Hamilton for the 1989-90 season, becoming the Dukes of Hamilton. They were not financially successful in Hamilton, though, and after only two seasons the Dukes became the Guelph Storm.
The Toronto Marlboros won the Memorial Cup seven times, more than any other team in the Cup's history. The Marlies also won 10 OHA championships in 17 final appearances.
`

const arr = [
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
  const trie = nlp.buildTrie(arr)
  const doc = nlp(text)
  const res = doc.lookup(trie)
  t.equal(res.length, 11, here + 'found all')

  let m = res.if('maple leafs')
  t.equal(m.length, 4, here + 'found 4 leafs')

  m = res.if('maroons')
  t.equal(m.length, 1, here + 'found 1 maroon')

  t.end()
})