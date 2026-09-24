export default [
  { match: '#Money and #Money #Currency?', hook: 'and', tag: 'Money', reason: 'money-and-money' },
  // 6 dollars and 5 cents
  { match: '#Value #Currency [and] #Value (cents|ore|centavos|sens)', hook: 'and', group: 0, tag: 'Money', reason: 'and-5-cents' },
  // maybe currencies
  { match: '#Value (mark|rand|won|rub|ore)', hook: '#Value', tag: '#Money #Currency', reason: '4-mark' },
  // 3 pounds
  { match: 'a pound', hook: 'pound', tag: '#Money #Unit', reason: 'a-pound' },
  { match: '#Value (pound|pounds)', hook: '#Value', tag: '#Money #Unit', reason: '4-pounds' },
]
