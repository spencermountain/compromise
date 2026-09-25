export default [
  // holy shit
  { match: 'holy (shit|fuck|hell)', hook: 'holy', tag: 'Expression', reason: 'swears-expression' },
  // well..
  { match: '^[well] !#Adjective?', hook: 'well', group: 0, tag: 'Expression', reason: 'well-' },
  // so
  { match: '^[so] !#Adjective?', hook: 'so', group: 0, tag: 'Expression', reason: 'well-' },
  // okay
  { match: '^[okay] !#Adjective?', hook: 'okay', group: 0, tag: 'Expression', reason: 'well-' },
  // now
  { match: '^[now] !#Adjective?', hook: 'now', group: 0, tag: 'Expression', reason: 'well-' },
  // come on
  { match: '^come on', hook: 'come', tag: 'Expression', reason: 'come-on' },
  // said sorry
  { match: '(say|says|said) [sorry]', hook: 'sorry', group: 0, tag: 'Expression', reason: 'say-sorry' },
  // ok,
  { match: '^ok', hook: 'ok', tag: 'Expression', reason: 'ok-' },
  // alright
  { match: '^alright', hook: 'alright', tag: 'Expression', reason: 'ok-' },
  // shoot
  { match: '^shoot', hook: 'shoot', tag: 'Expression', reason: 'ok-' },
  // hell
  { match: '^hell', hook: 'hell', tag: 'Expression', reason: 'ok-' },
  // anyways
  { match: '^anyways', hook: 'anyways', tag: 'Expression', reason: 'ok-' },
  // say,
  { match: '^(say && @hasComma)', hook: 'say', tag: 'Expression', reason: 'say-' },
  // like, hello
  { match: '^(like && @hasComma)', hook: 'like', tag: 'Expression', reason: 'like-' },
  // dude we should
  { match: '^[(dude|man|girl)] #Pronoun', hook: '#Pronoun', group: 0, tag: 'Expression', reason: 'dude-i' },
]