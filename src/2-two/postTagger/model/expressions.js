export default [
  // holy shit
  { match: 'holy (shit|fuck|hell)', tag: 'Expression', reason: 'swears-expr' },
  // [well]..
  { match: '^[well] !#Adjective?', group: 0, tag: 'Expression', reason: 'well-expr' },
  // [so]
  { match: '^[so] !#Adjective?', group: 0, tag: 'Expression', reason: 'so-expr' },
  // [okay]
  { match: '^[okay] !#Adjective?', group: 0, tag: 'Expression', reason: 'okay-expr' },
  // [now]
  { match: '^[now] !#Adjective?', group: 0, tag: 'Expression', reason: 'now-expr' },
  // come on
  { match: '^come on', tag: 'Expression', reason: 'come-on' },
  // shoot,
  { match: '^(shoot && @hasComma)', tag: 'Expression', reason: 'shoot-comma-expr' },
  // say,
  { match: '^(say && @hasComma)', tag: 'Expression', reason: 'say-expr' },
  // like, hello
  { match: '^(like && @hasComma)', tag: 'Expression', reason: 'like-expr' },
]