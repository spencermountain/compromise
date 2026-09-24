export default [

  //swear-words as non-expression POS
  { match: 'holy (shit|fuck|hell)', hook: 'holy', tag: 'Expression', reason: 'swears-expression' },
  // well..
  { match: '^[well] !#Adjective?', hook: 'well', group: 0, tag: 'Expression', reason: 'well-' },
  { match: '^[so] !#Adjective?', hook: 'so', group: 0, tag: 'Expression', reason: 'well-' },
  { match: '^[okay] !#Adjective?', hook: 'okay', group: 0, tag: 'Expression', reason: 'well-' },
  { match: '^[now] !#Adjective?', hook: 'now', group: 0, tag: 'Expression', reason: 'well-' },
  // well..
  { match: '^come on', hook: 'come', tag: 'Expression', reason: 'come-on' },
  // sorry
  { match: '(say|says|said) [sorry]', hook: 'sorry', group: 0, tag: 'Expression', reason: 'say-sorry' },
  // ok,
  { match: '^ok', hook: 'ok', tag: 'Expression', reason: 'ok-' },
  { match: '^alright', hook: 'alright', tag: 'Expression', reason: 'ok-' },
  { match: '^shoot', hook: 'shoot', tag: 'Expression', reason: 'ok-' },
  { match: '^hell', hook: 'hell', tag: 'Expression', reason: 'ok-' },
  { match: '^anyways', hook: 'anyways', tag: 'Expression', reason: 'ok-' },
  // c'mon marge..
  // { match: '^[come on] #Noun', group: 0, tag: 'Expression', reason: 'come-on' },
  // say,
  { match: '^(say && @hasComma)', hook: 'say', tag: 'Expression', reason: 'say-' },
  { match: '^(like && @hasComma)', hook: 'like', tag: 'Expression', reason: 'like-' },
  // dude we should
  { match: '^[(dude|man|girl)] #Pronoun', hook: '#Pronoun', group: 0, tag: 'Expression', reason: 'dude-i' },
]