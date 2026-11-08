import { email, explicitUrl, bareUrl } from '../../../../1-one/tokenize/methods/web.js'
import { Email, Url, Timezone, Last, Expr, Vb, Unit, SlashedTerm } from '../../tagSet/_lib.js'

export default [
  [email, Email],
  [explicitUrl, Url, 'http..'],
  [bareUrl, Url, '.com'],

  // timezones
  [/^[PMCE]ST$/i, Timezone],

  //names
  [/^ma?c'[a-z]{3}/, Last, "mc'neil"],
  [/^o'(?!clock)[a-z]{3}/, Last, "o'connor"],
  [/^ma?cd[aeiou][a-z]{3}/, Last],

  //slang things
  [/^(lol)+[sz]$/, Expr],
  [/^wo{2,}a*h?$/, Expr],
  [/^(hee?){2,}h?$/, Expr],
  [/^(un|de|re)-[a-z\u00C0-\u00FF]{2}/, Vb],

  // m/h
  [/^(m|k|cm|km)\/(s|h|hr)$/, Unit],
  // μg/g
  [/^(ug|ng|mg)\/(l|m3|ft3)$/, Unit],

  // love/hate
  [/[^:/]\/\p{Letter}/u, SlashedTerm],
]
