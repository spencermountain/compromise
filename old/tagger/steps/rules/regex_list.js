'use strict';
//regex suffix patterns and their most common parts of speech,
//built using wordnet, by spencer kelly.
//this mapping shrinks-down the uglified build
const Adj = 'Adjective';
const Inf = 'Infinitive';
const Pres = 'PresentTense';
const Sing = 'Singular';
const Past = 'PastTense';
const Adverb = 'Adverb';
const Exp = 'Expression';
const Actor = 'Actor';
const Verb = 'Verb';
const Noun = 'Noun';
const Last = 'LastName';
//the order here matters.

//regexes indexed by mandated last-character
module.exports = {
  a: [
    [/.[aeiou]na$/, Noun],
    [/.[oau][wvl]ska$/, Last], //polish (female)
    [/.[^aeiou]ica$/, Sing],
    [/^([hyj]a)+$/, Exp] //hahah
  ],
  c: [
    [/.[^aeiou]ic$/, Adj]
  ],
  d: [
    [/.[ia]sed$/, Adj],
    [/.[gt]led$/, Adj],
    [/.[aeiou][td]ed$/, Past],
    [/.[^aeiou]led$/, Past], //rumbled
    [/[^aeiou]ard$/, Sing],
    [/[aeiou][^aeiou]id$/, Adj],
    [/[aeiou]c?ked$/, Past], //hooked
    [/[^aeiou][aeiou][tvx]ed$/, Past], //boxed
    [/.[vrl]id$/, Adj]
  ],
  e: [
    [/.[lnr]ize$/, Inf],
    [/.[^aeiou]ise$/, Inf],
    [/.[aeiou]te$/, Inf],
    [/.[^aeiou][ai]ble$/, Adj],
    [/.[^aeiou]eable$/, Adj],
    [/.[^aeiou]ive$/, Adj]
  ],
  h: [
    [/.[^aeiouf]ish$/, Adj],
    [/.v[iy]ch$/, Last], //east-europe
    [/^ug?h+$/, Exp], //uhh
    [/^uh[ -]?oh$/, Exp] //uhoh
  ],
  i: [
    [/.[oau][wvl]ski$/, Last] //polish (male)
  ],
  k: [
    [/^(k)+$/, Exp] //kkkk
  ],
  l: [
    [/.[gl]ial$/, Adj],
    [/.[^aeiou]ful$/, Adj],
    [/.[nrtumcd]al$/, Adj],
    [/.[^aeiou][ei]al$/, Adj]
  ],
  m: [
    [/.[^aeiou]ium$/, Sing],
    [/[^aeiou]ism$/, Sing],
    [/^h*u*m+$/, Exp], //mmmmmmm / ummmm / huuuuuummmmmm
    [/^\d+ ?[ap]m$/, 'Date']
  ],
  n: [
    [/.[lsrnpb]ian$/, Adj],
    [/[^aeiou]ician$/, Actor]
  ],
  o: [
    [/^no+$/, Exp], //noooo
    [/^(yo)+$/, Exp], //yoyo
    [/^woo+[pt]?$/, Exp] //woo
  ],
  r: [
    [/.[ilk]er$/, 'Comparative'],
    [/[aeiou][pns]er$/, Sing],
    [/[^i]fer$/, Inf],
    [/.[^aeiou][ao]pher$/, Actor]
  ],
  t: [
    [/.[di]est$/, 'Superlative'],
    [/.[icldtgrv]ent$/, Adj],
    [/[aeiou].*ist$/, Adj],
    [/^[a-z]et$/, Verb]
  ],
  s: [
    [/.[rln]ates$/, Pres],
    [/.[^z]ens$/, Verb],
    [/.[lstrn]us$/, Sing],
    [/[aeiou][^aeiou]is$/, Sing],
    [/[a-z]\'s$/, Noun],
    [/^yes+$/, Exp] //yessss
  ],
  v: [
    [/.[^aeiou][ai][kln]ov$/, Last] //east-europe
  ],
  y: [
    [/.[cts]hy$/, Adj],
    [/.[st]ty$/, Adj],
    [/.[gk]y$/, Adj],
    [/.[tnl]ary$/, Adj],
    [/.[oe]ry$/, Sing],
    [/[rdntkbhs]ly$/, Adverb],
    [/...lly$/, Adverb],
    [/[bszmp]{2}y$/, Adj],
    [/.(gg|bb|zz)ly$/, Adj],
    [/.[aeiou]my$/, Adj],
    [/[ea]{2}zy$/, Adj],
    [/.[^aeiou]ity$/, Sing]
  ]
};
