import { email, explicitUrl, bareUrl } from '../../../../1-one/tokenize/methods/web.js'

export default [
  [email, 'Email'],
  [explicitUrl, 'Url', 'http..'],
  [bareUrl, 'Url', '.com'],

  // timezones
  [/^[PMCE]ST$/i, 'Timezone', 'EST'],

  //names
  [/^ma?c'[a-z]{3}/, 'LastName', "mc'neil"],
  [/^o'[a-z]{3}/, 'LastName', "o'connor"],
  [/^ma?cd[aeiou][a-z]{3}/, 'LastName', 'mcdonald'],

  //slang things
  [/^(lol)+[sz]$/, 'Expression', 'lol'],
  [/^wo{2,}a*h?$/, 'Expression', 'wooah'],
  [/^(hee?){2,}h?$/, 'Expression', 'hehe'],
  [/^(un|de|re)-[a-z\u00C0-\u00FF]{2}/, 'Verb', 'un-vite'],

  // m/h
  [/^(m|k|cm|km)\/(s|h|hr)$/, 'Unit', '5 k/m'],
  // μg/g
  [/^(ug|ng|mg)\/(l|m3|ft3)$/, 'Unit', 'ug/L'],

  // love/hate
  [/[^:/]\/\p{Letter}/u, 'SlashedTerm', 'love/hate'],
]
