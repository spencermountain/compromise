export default [
  // holy shit
  { match: 'holy (shit|fuck|hell)', hook: 'holy', tag: 'Expression', reason: 'swears-expression' },
  // [well]..
  { match: '^[well] !#Adjective?', hook: 'well', group: 0, tag: 'Expression', reason: 'well-expression' },
  // [so]
  { match: '^[so] !#Adjective?', hook: 'so', group: 0, tag: 'Expression', reason: 'so-expression' },
  // [okay]
  { match: '^[okay] !#Adjective?', hook: 'okay', group: 0, tag: 'Expression', reason: 'okay-expression' },
  // [now]
  { match: '^[now] !#Adjective?', hook: 'now', group: 0, tag: 'Expression', reason: 'now-expression' },
  // come on
  { match: '^come on', hook: 'come', tag: 'Expression', reason: 'come-on' },
  // said [sorry]
  { match: '(say|says|said) [sorry]', hook: 'sorry', group: 0, tag: 'Expression', reason: 'say-sorry' },
  // ok,
  { match: '^ok', hook: 'ok', tag: 'Expression', reason: 'ok-expression' },
  // alright
  { match: '^alright', hook: 'alright', tag: 'Expression', reason: 'alright-expression' },
  // shoot
  { match: '^shoot$', hook: 'shoot', tag: 'Expression', reason: 'shoot-expression' },
  // shoot,
  { match: '^(shoot && @hasComma)', hook: 'shoot', tag: 'Expression', reason: 'shoot-comma-expression' },
  // hell
  { match: '^hell', hook: 'hell', tag: 'Expression', reason: 'hell-expression' },
  // anyways
  { match: '^anyways', hook: 'anyways', tag: 'Expression', reason: 'anyways-expression' },
  // say,
  { match: '^(say && @hasComma)', hook: 'say', tag: 'Expression', reason: 'say-expression' },
  // like, hello
  { match: '^(like && @hasComma)', hook: 'like', tag: 'Expression', reason: 'like-expression' },
  // [dude] we should
  { match: '^[(dude|man|girl)] #Pronoun', hook: '#Pronoun', group: 0, tag: 'Expression', reason: 'dude-i' },
]