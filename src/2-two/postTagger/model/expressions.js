export default [
  // holy shit
  { match: 'holy (shit|fuck|hell)', tag: 'Expression', reason: 'swears-expression' },
  // [well]..
  { match: '^[well] !#Adjective?', group: 0, tag: 'Expression', reason: 'well-expression' },
  // [so]
  { match: '^[so] !#Adjective?', group: 0, tag: 'Expression', reason: 'so-expression' },
  // [okay]
  { match: '^[okay] !#Adjective?', group: 0, tag: 'Expression', reason: 'okay-expression' },
  // [now]
  { match: '^[now] !#Adjective?', group: 0, tag: 'Expression', reason: 'now-expression' },
  // come on
  { match: '^come on', tag: 'Expression', reason: 'come-on' },
  // said [sorry]
  { match: '(say|says|said) [sorry]', group: 0, tag: 'Expression', reason: 'say-sorry' },
  // ok,
  { match: '^ok', tag: 'Expression', reason: 'ok-expression' },
  // alright
  { match: '^alright', tag: 'Expression', reason: 'alright-expression' },
  // shoot
  { match: '^shoot$', tag: 'Expression', reason: 'shoot-expression' },
  // shoot,
  { match: '^(shoot && @hasComma)', tag: 'Expression', reason: 'shoot-comma-expression' },
  // hell
  { match: '^hell', tag: 'Expression', reason: 'hell-expression' },
  // anyways
  { match: '^anyways', tag: 'Expression', reason: 'anyways-expression' },
  // say,
  { match: '^(say && @hasComma)', tag: 'Expression', reason: 'say-expression' },
  // like, hello
  { match: '^(like && @hasComma)', tag: 'Expression', reason: 'like-expression' },
  // [dude] we should
  { match: '^[(dude|man|girl)] #Pronoun', group: 0, tag: 'Expression', reason: 'dude-i' },
]