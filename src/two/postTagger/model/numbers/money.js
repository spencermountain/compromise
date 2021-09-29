export default [
  { match: '#Money and #Money #Currency?', tag: 'Money', reason: 'money-and-money' },

  // // $5.032 is invalid money
  // doc
  //   .match('#Money')
  //   .not('#TextValue')
  //   .match('/\\.[0-9]{3}$/')
  //   .unTag('#Money', 'three-decimal money')

  // cleanup currency false-positives
  // { match: '#Currency #Verb', ifNo: '#Value', unTag: 'Currency', reason: 'no-currency' },
  // 6 dollars and 5 cents
  { match: '#Value #Currency [and] #Value (cents|ore|centavos|sens)', group: 0, tag: 'money', reason: 'and-5-cents' },
  // maybe currencies
  { match: '#Value (mark|rand|won|rub|ore)', tag: '#Money #Currency', reason: '4 mark' },
]

//   {match:'', tag:'',reason:''},
//   {match:'', tag:'',reason:''},
//   {match:'', tag:'',reason:''},
