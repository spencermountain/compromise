export default [
  // $5 and $6
  { match: '#Money and #Money #Currency?', hook: 'and', tag: 'Money', reason: 'money-and-money' },
  // 6 dollars [and] 5 cents
  { match: '#Value #Currency [and] #Value (cents|ore|centavos|sens)', hook: 'and', group: 0, tag: 'Money', reason: 'and-5-cents' },
  // 5 rand
  { match: '#Value (mark|rand|won|rub|ore)', hook: '#Value', tag: '#Money #Currency', reason: '4-mark' },
  // a pound
  { match: 'a pound', hook: 'pound', tag: '#Money #Unit', reason: 'a-pound' },
  // 3 pounds
  { match: '#Value (pound|pounds)', hook: '#Value', tag: '#Money #Unit', reason: '4-pounds' },
]
