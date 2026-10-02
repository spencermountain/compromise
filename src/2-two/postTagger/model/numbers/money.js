export default [
  // $5 and $6
  { match: '#Money and #Money #Currency?', tag: 'Money', reason: 'money-and' },
  // 6 dollars [and] 5 cents
  { match: '#Value #Currency [and] #Value (cents|ore|centavos|sens)', group: 0, tag: 'Money', reason: 'and-5-cents' },
  // 5 rand
  { match: '#Value (mark|rand|won|rub|ore)', tag: '#Money #Currency', reason: '4-mark' },
  // a pound
  { match: 'a pound', tag: '#Money #Unit', reason: 'a-pound' },
  // 3 pounds
  { match: '#Value (pound|pounds)', tag: '#Money #Unit', reason: '4-pounds' },
]
