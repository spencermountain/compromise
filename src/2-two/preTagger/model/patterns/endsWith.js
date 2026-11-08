import tags from '../../tagSet/aliases.js'
import { Date, Comp, Sup } from '../../tagSet/_lib.js'

const {
  JJ: Adj, Inf, Pres, Sing, VBD: Past, Expression: Exp, Actor,
  V: Verb, NN: Noun, Last
} = tags
//regex suffix patterns and their most common parts of speech,
//built using wordnet, by spencer kelly.
//this mapping shrinks-down the uglified build

export default {
  a: [
    [/.[aeiou]na$/, Noun],
    [/.[oau][wvl]ska$/, Last],
    [/.[^aeiou]ica$/, Sing],
    [/^([hyj]a+)+$/, Exp], //hahah
  ],
  d: [
    //==-ed==
    //double-consonant
    [/[aeiou](pp|ll|ss|ff|gg|tt|rr|bb|nn|mm)ed$/, Past],
    //double-vowel
    [/.[aeo]{2}[bdgmnprvz]ed$/, Past],
    //-hed
    [/.[aeiou][sg]hed$/, Past],
    //-rd
    [/.[aeiou]red$/, Past],
    [/.[aeiou]r?ried$/, Past],
    // ard
    [/[^aeiou]ard$/, Sing],
    // id
    [/[aeiou][^aeiou]id$/, Adj],
    [/.[vrl]id$/, Adj],

    // ===== -ed ======
    //-led
    [/..led$/, Past],
    //-sed
    [/.[iao]sed$/, Past],
    [/[aeiou]n?[cs]ed$/, Past],
    //-med
    [/[aeiou][rl]?[mnf]ed$/, Past],
    //-ked
    [/[aeiou][ns]?c?ked$/, Past],
    //-gned
    [/[aeiou]gned$/, Past],
    //-ged
    [/[aeiou][nl]?ged$/, Past],
    //-ted
    [/.[tdbwxyz]ed$/, Past],
    [/[^aeiou][aeiou][tvx]ed$/, Past],
    //-ied
    [/.[cdflmnprstv]ied$/, Past],
  ],
  e: [
    [/.[^aeiou]ise$/, Inf],
    [/.[aeiou]te$/, Inf],
    [/.[^aeiou][ai]ble$/, Adj],
    [/.[^aeiou]eable$/, Adj],
    [/.[ts]ive$/, Adj],
    [/[a-z]-like$/, Adj],
  ],
  h: [
    [/.[^aeiouf]ish$/, Adj],
    [/.v[iy]ch$/, Last],
    [/^ug?h+$/, Exp],
    [/^uh[ -]?oh$/, Exp],
  ],
  i: [[/.[oau][wvl]ski$/, Last, 'polish-male']],
  k: [
    [/^(k){2}$/, Exp], //kkkk
  ],
  l: [
    [/.[gl]ial$/, Adj],
    [/.[nrtumcd]al$/, Adj],
    [/.[^aeiou][ei]al$/, Adj],
  ],
  m: [
    [/.[^aeiou]ium$/, Sing],
    [/[^aeiou]ism$/, Sing],
    [/^[hu]m+$/, Exp],
    [/^\d+ ?[ap]m$/, Date],
  ],
  n: [
  ],
  o: [
    [/^no+$/, Exp],
    [/^(yo)+$/, Exp],
    [/^wo{2,}[pt]?$/, Exp], //woo
  ],
  r: [
    [/.[bdfklmst]ler$/, 'Noun'],
    [/[aeiou][pns]er$/, Sing],
    [/[^i]fer$/, Inf],
    [/.[^aeiou][ao]pher$/, Actor],
    [/.[lk]er$/, 'Noun'],
    [/.ier$/, Comp],
  ],
  t: [
    [/.[di]est$/, Sup],
    [/.[icldtgrv]ent$/, Adj],
    [/[aeiou][^aeiou\r\n\u2028\u2029]*ist$/, Adj],
    [/^[a-z]et$/, Verb],
  ],
  s: [
    [/.[^aeiou]ises$/, Pres],
    [/.[rln]ates$/, Pres],
    [/.[^z]ens$/, Verb],
    [/.[lstrn]us$/, Sing],
    [/.(ok|wak)es$/, Pres],
    [/[aeiou][^aeiou]is$/, Sing],
    [/[a-z]'s$/, Noun],
    [/^yes+$/, Exp], //yessss
  ],
  y: [
    [/.[cts]hy$/, Adj],
    [/.[st]ty$/, Adj],
    [/.[tnl]ary$/, Adj],
    [/.[oe]ry$/, Sing],
    [/.[gk]y$/, Adj],
    [/[bszmp]{2}y$/, Adj],
    [/.[ai]my$/, Adj],
    [/[ea]{2}zy$/, Adj],
    [/.[^aeiou]ity$/, Sing],
  ],
}
