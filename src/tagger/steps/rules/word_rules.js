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
const byLast = {
  a: [
    [/.[aeiou]na$/, Noun],
    [/.[oau][wvl]ska$/, Last], //polish (female)
    [/.[^aeiou]ica$/, Sing],
    [/^([hyj]a)+$/, Exp], //hahah
  ],
  d: [
    [/.[ia]sed$/, Adj],
    [/.[gt]led$/, Adj],
    [/.[aeiou][td]ed$/, Past],
    [/[^aeiou]ard$/, Sing],
    [/[aeiou][^aeiou]id$/, Adj],
    [/[aeiou]c?ked$/, Past], //hooked
    [/.[vrl]id$/, Adj],
  ],
  e: [
    [/.[lnr]ize$/, Inf],
    [/.[^aeiou]ise$/, Inf],
    [/.[aeiou]te$/, Inf],
    [/.[^aeiou][ai]ble$/, Adj],
    [/.[^aeiou]eable$/, Adj],
    [/.[^aeiou]ive$/, Adj],
  ],
  h: [
    [/[0-9](st|nd|rd|r?th)$/, 'Ordinal'], //like 5th
    [/.[^aeiouf]ish$/, Adj],
    [/.v[iy]ch$/, Last], //east-europe
    [/^ug?h+$/, Exp], //uhh
    [/^uh[ -]?oh$/, Exp], //uhoh
  ],
  k: [
    [/^(k)+$/, Exp], //kkkk
  ],
  l: [
    [/.[nrtumcd]al$/, Adj],
    [/.[^aeiou]ial$/, Adj],
    [/.[^aeiou]eal$/, Adj],
    [/.[^aeiou][ei]al$/, Adj],
    [/.[^aeiou]ful$/, Adj],
  ],
  m: [
    [/.[^aeiou]ium$/, Sing],
    [/[^aeiou]ism$/, Sing],
    [/.[^aeiou]ium$/, Sing],
    [/^mmm+$/, Exp], //mmmm
    [/^[hu]m+$/, Exp], //ummmm    
    [/^[0-9]+ ?(am|pm)$/, 'Date'],
  ],
  n: [
    [/.[lsrnpb]ian$/, Adj],
    [/[^aeiou]ician$/, Actor],
  ],
  o: [
    [/^no+$/, Exp], //noooo
    [/^(yo)+$/, Exp], //yoyo
    [/^woo+[pt]?$/, Exp], //woo
  ],
  r: [
    [/..ier$/, Actor],
    [/.[ilk]er$/, 'Comparative'],
    [/[aeiou][pns]er$/, Sing],
    [/[^i]fer$/, Inf],
    [/.[^aeiou][ao]pher$/, Actor],
  ],
  t: [
    [/.[di]est$/, 'Superlative'],
    [/.[icldtgrv]ent$/, Adj],
    [/[aeiou].*ist$/, Adj],
    [/^[a-z]et$/, Verb],
  ],
  s: [
    [/.[rln]ates$/, Pres],
    [/.[^z]ens$/, Verb],
    [/.[lstrn]us$/, Sing],
    [/[aeiou][^aeiou]is$/, Sing],
    [/[a-z]\'s$/, Noun],
    [/^yes+$/, Exp], //yessss
  ],
  y: [
    [/.[cts]hy$/, Adj],
    [/.[st]ty$/, Adj],
    [/.[gk]y$/, Adj],
    [/.[tnl]ary$/, Adj],
    [/.[oe]ry$/, Sing],
    [/[rdntkbhs]ly$/, Adverb],
    [/[bszmp]{2}y$/, Adj],
    [/.(gg|bb|zz)ly$/, Adj],
    [/.[aeiou]my$/, Adj],
    [/.[^aeiou]ity$/, Sing],
    [/[ea]{2}zy$/, Adj],
    [/.[^aeiou]ity$/, Sing],
  ],
};

const misc = [
  //slang things
  [/^(lol)+[sz]$/, Exp], //lol
  [/^ma?cd[aeiou]/, Last], //macdonell - Last patterns https://en.wikipedia.org/wiki/List_of_family_name_affixes

  //starting-ones
  [/^[0-9,\.]+$/, 'Cardinal'], //like 5
  [/^(un|de|re)\\-[a-z]../, Verb],
  [/^[\-\+]?[0-9]+(\.[0-9]+)?$/, 'NumericValue'],
  [/^https?\:?\/\/[a-z0-9]/, 'Url'], //the colon is removed in normalisation
  [/^www\.[a-z0-9]/, 'Url'],

  //ending-ones
  [/([0-9])([a-z]{1,2})$/, 'Cardinal'], //like 5kg
  [/(over|under)[a-z]{2,}$/, Adj],

  [/.[^aeiou]ic$/, Adj],
  [/.[oau][wvl]ski$/, Last], //polish (male)
  [/.[^aeiou][ai][kln]ov$/, Last], //east-europe

  //middle (anywhere)
  [/[a-z]*\\-[a-z]*\\-/, Adj],

];
module.exports = {
  misc: misc,
  bylast: byLast
};
