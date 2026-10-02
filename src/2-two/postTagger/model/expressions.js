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
  // said [sorry]
  // left-right: { match: '(say|says|said) [sorry]', group: 0, tag: 'Expression', reason: 'say-sorry' },
  // ok,
  // left-right: { match: '^ok', tag: 'Expression', reason: 'ok-expr' },
  // alright
  // left-right: { match: '^alright', tag: 'Expression', reason: 'alright-expr' },
  // shoot
  // left-right: { match: '^shoot$', tag: 'Expression', reason: 'shoot-expr' },
  // shoot,
  { match: '^(shoot && @hasComma)', tag: 'Expression', reason: 'shoot-comma-expr' },
  // hell
  // left-right: { match: '^hell', tag: 'Expression', reason: 'hell-expr' },
  // anyways
  // left-right: { match: '^anyways', tag: 'Expression', reason: 'anyways-expr' },
  // say,
  { match: '^(say && @hasComma)', tag: 'Expression', reason: 'say-expr' },
  // like, hello
  { match: '^(like && @hasComma)', tag: 'Expression', reason: 'like-expr' },
  // [dude] we should
  // left-right: { match: '^[(dude|man|girl)] #Pronoun', group: 0, tag: 'Expression', reason: 'dude-i' },
]