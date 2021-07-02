//regex suffix patterns and their most common parts of speech,
//built using wordnet, by spencer kelly.
//this mapping shrinks-down the uglified build
const Adj = 'Adjective'
const Inf = 'Infinitive'
const Pres = 'PresentTense'
const Sing = 'Singular'
const Past = 'PastTense'
const Adverb = 'Adverb'
const Exp = 'Expression'
const Actor = 'Actor'
const Verb = 'Verb'
const Noun = 'Noun'
const Last = 'LastName'

export default {
  a: [
    [/.[aeiou]na$/, Noun],
    [/.[oau][wvl]ska$/, Last],
    [/.[^aeiou]ica$/, Sing],
    [/^([hyj]a)+$/, Exp], //hahah
  ],
  c: [[/.[^aeiou]ic$/, Adj]],
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
    //-led
    [/.[bcdgtr]led$/, Past],
    [/.[aoui]f?led$/, Past],
    //-sed
    [/.[iao]sed$/, Past],
    [/[aeiou]n?[cs]ed$/, Past],
    //-med
    [/[aeiou][rl]?[mnf]ed$/, Past],
    //-ked
    [/[aeiou][ns]?c?ked$/, Past],
    //-ged
    [/[aeiou][nl]?ged$/, Past],
    //-ted
    [/.[tdbwxz]ed$/, Past],
    [/[^aeiou][aeiou][tvx]ed$/, Past],
    //-ied
    [/.[cdlmnprstv]ied$/, Past],
    [/[^aeiou]ard$/, Sing],
    [/[aeiou][^aeiou]id$/, Adj],
    [/.[vrl]id$/, Adj],
  ],
  e: [
    [/.[lnr]ize$/, Inf],
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
    [/[a-z]-ish$/, Adj], //cartoon-ish
  ],
  i: [
    [/.[oau][wvl]ski$/, Last], //polish (male)
  ],
  k: [
    [/^(k){2}$/, Exp], //kkkk
  ],
  l: [
    [/.[gl]ial$/, Adj],
    [/.[^aeiou]ful$/, Adj],
    [/.[nrtumcd]al$/, Adj],
    [/.[^aeiou][ei]al$/, Adj],
  ],
  m: [
    [/.[^aeiou]ium$/, Sing],
    [/[^aeiou]ism$/, Sing],
    [/^h*u*m+$/, Exp],
    [/^\d+ ?[ap]m$/, 'Date'],
  ],
  n: [
    [/.[lsrnpb]ian$/, Adj],
    [/[^aeiou]ician$/, Actor],
    [/[aeiou][ktrp]in$/, 'Gerund'], // 'cookin', 'hootin'
  ],
  o: [
    [/^no+$/, Exp],
    [/^(yo)+$/, Exp],
    [/^woo+[pt]?$/, Exp], //woo
  ],
  r: [
    [/.[bdfklmst]ler$/, 'Noun'],
    [/[aeiou][pns]er$/, Sing],
    [/[^i]fer$/, Inf],
    [/.[^aeiou][ao]pher$/, Actor],
    [/.[lk]er$/, 'Noun'],
    [/.ier$/, 'Comparative'],
  ],
  t: [
    [/.[di]est$/, 'Superlative'],
    [/.[icldtgrv]ent$/, Adj],
    [/[aeiou].*ist$/, Adj],
    [/^[a-z]et$/, Verb],
  ],
  s: [
    [/.[^aeiou]ises$/, Pres],
    [/.[rln]ates$/, Pres],
    [/.[^z]ens$/, Verb],
    [/.[lstrn]us$/, Sing],
    [/.[aeiou]sks$/, Pres],
    [/.[aeiou]kes$/, Pres],
    [/[aeiou][^aeiou]is$/, Sing],
    [/[a-z]'s$/, Noun],
    [/^yes+$/, Exp], //yessss
  ],
  v: [
    [/.[^aeiou][ai][kln]ov$/, Last], //east-europe
  ],
  y: [
    [/.[cts]hy$/, Adj],
    [/.[st]ty$/, Adj],
    [/.[tnl]ary$/, Adj],
    [/.[oe]ry$/, Sing],
    [/[rdntkbhs]ly$/, Adverb],
    [/.(gg|bb|zz)ly$/, Adj],
    [/...lly$/, Adverb],
    [/.[gk]y$/, Adj],
    [/[bszmp]{2}y$/, Adj],
    [/.[ai]my$/, Adj],
    [/[ea]{2}zy$/, Adj],
    [/.[^aeiou]ity$/, Sing],
  ],
}
