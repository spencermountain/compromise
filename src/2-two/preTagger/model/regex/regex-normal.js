import { email, explicitUrl, bareUrl } from '../../../../1-one/tokenize/methods/web.js'
import { Email, Url, Timezone, Last, Expr, Vb, Unit, SlashedTerm } from '../../tagSet/_lib.js'

export default [
  [email, Email],
  [explicitUrl, Url, 'http..'],
  [bareUrl, Url, '.com'],

  // timezones
  [/^[PMCE]ST$/i, Timezone, 'EST'],

  //names
  [/^ma?c'[a-z]{3}/, Last, "mc'neil"],
  [/^o'(?!clock)[a-z]{3}/, Last, "o'connor"],
  [/^ma?cd[aeiou][a-z]{3}/, Last, 'mcdonald'],

  //slang things
  [/^(lol)+[sz]$/, Expr, 'lol'],
  [/^wo{2,}a*h?$/, Expr, 'wooah'],
  [/^(hee?){2,}h?$/, Expr, 'hehe'],
  [/^(un|de|re)-[a-z\u00C0-\u00FF]{2}/, Vb, 'un-vite'],

  // m/h
  [/^(m|k|cm|km)\/(s|h|hr)$/, Unit, '5 k/m'],
  // μg/g
  [/^(ug|ng|mg)\/(l|m3|ft3)$/, Unit, 'ug/L'],

  // love/hate
  [/[^:/]\/\p{Letter}/u, SlashedTerm, 'love/hate'],
]
