'use strict';
//regex suffix patterns and their most common parts of speech,
//built using wordnet, by spencer kelly.

//the order here matters.
module.exports = [
  ['^[0-9]+ ?(am|pm)$', 'Date'],
  ['[0-9](st|nd|rd|r?th)$', 'Ordinal'], //like 5th
  ['([0-9])([a-z]{1,2})$', 'Cardinal'], //like 5kg
  ['^[0-9,\.]+$', 'Cardinal'], //like 5
  ['^[a-z]et$', 'Verb'],
  ['cede$', 'Infinitive'],
  ['.[cts]hy$', 'Adjective'],
  ['.[st]ty$', 'Adjective'],
  ['.[lnr]ize$', 'Infinitive'],
  ['.[gk]y$', 'Adjective'],
  ['.fies$', 'PresentTense'],
  ['ities$', 'Plural'],
  ['.some$', 'Adjective'],
  ['.[nrtumcd]al$', 'Adjective'],
  ['.que$', 'Adjective'],
  ['.[tnl]ary$', 'Adjective'],
  ['.[di]est$', 'Superlative'],
  ['^(un|de|re)\\-[a-z]..', 'Verb'],
  ['.lar$', 'Adjective'],
  ['[bszmp]{2}y', 'Adjective'],
  ['.zes$', 'PresentTense'],
  ['.[icldtgrv]ent$', 'Adjective'],
  ['.[rln]ates$', 'PresentTense'],
  ['.[oe]ry$', 'Singular'],
  ['[rdntkbhs]ly$', 'Adverb'],
  ['.[lsrnpb]ian$', 'Adjective'],
  ['.[^aeiou]ial$', 'Adjective'],
  ['.[^aeiou]eal$', 'Adjective'],
  ['.[vrl]id$', 'Adjective'],
  ['.[ilk]er$', 'Comparative'],
  ['.ike$', 'Adjective'],
  ['.ends?$', 'Verb'],
  ['.wards$', 'Adverb'],
  ['.rmy$', 'Adjective'],
  ['.rol$', 'Singular'],
  ['.tors$', 'Noun'],
  ['.azy$', 'Adjective'],
  ['.where$', 'Adverb'],
  ['.ify$', 'Infinitive'],
  ['.bound$', 'Adjective'],
  ['.[^z]ens$', 'Verb'],
  ['.oid$', 'Adjective'],
  ['.vice$', 'Singular'],
  ['.rough$', 'Adjective'],
  ['.mum$', 'Adjective'],
  ['.teen(th)?$', 'Value'],
  ['.oses$', 'PresentTense'],
  ['.ishes$', 'PresentTense'],
  ['.ects$', 'PresentTense'],
  ['.tieth$', 'Ordinal'],
  ['.ices$', 'Plural'],
  ['.tage$', 'Infinitive'],
  ['.ions$', 'Plural'],
  ['.tion$', 'Singular'],
  ['.ean$', 'Adjective'],
  ['.[ia]sed$', 'Adjective'],
  ['.urned', 'PastTense'],
  ['.tized$', 'PastTense'],
  ['.[aeiou][td]ed', 'PastTense'],
  ['.llen$', 'Adjective'],
  ['.fore$', 'Adverb'],
  ['.ances$', 'Plural'],
  ['.gate$', 'Infinitive'],
  ['.nes$', 'PresentTense'],
  ['.less$', 'Adverb'],
  ['.ried$', 'Adjective'],
  ['.gone$', 'Adjective'],
  ['.made$', 'Adjective'],
  ['.ing$', 'Gerund'], //likely to be converted to adjective after lexicon pass
  ['.tures$', 'Plural'],
  ['.ous$', 'Adjective'],
  ['.ports$', 'Plural'],
  ['. so$', 'Adverb'],
  ['.ints$', 'Plural'],
  ['.[gt]led$', 'Adjective'],
  ['.lked$', 'PastTense'],
  ['.fully$', 'Adverb'],
  ['.*ould$', 'Modal'],
  ['^[\-\+]?[0-9]+(\.[0-9]+)?$', 'NumericValue'],
  ['[a-z]*\\-[a-z]*\\-', 'Adjective'],
  ['[a-z]\'s$', 'Noun'],
  ['.\'n$', 'Verb'],
  ['.\'re$', 'Copula'],
  ['.\'ll$', 'Modal'],
  ['.\'t$', 'Verb'],
  ['.tches$', 'PresentTense'],
  ['^https?\:?\/\/[a-z0-9]', 'Url'], //the colon is removed in normalisation
  ['^www\.[a-z0-9]', 'Url'],
  ['.ize$', 'Infinitive'],
  ['.[^aeiou]ise$', 'Infinitive'],
  ['.[aeiou]te$', 'Infinitive'],
  ['.ea$', 'Singular'],
  ['[aeiou][pns]er$', 'Singular'],
  ['.ia$', 'Noun'],
  ['.sis$', 'Singular'],
  ['.[aeiou]na$', 'Noun'],
  ['.[^aeiou]ity$', 'Singular'],
  ['.[^aeiou]ium$', 'Singular'],
  ['.[^aeiou][ei]al$', 'Adjective'],
  ['.ffy$', 'Adjective'],
  ['.[^aeiou]ic$', 'Adjective'],
  ['.(gg|bb|zz)ly$', 'Adjective'],
  ['.[aeiou]my$', 'Adjective'],
  ['.[^aeiou][ai]ble$', 'Adjective'],
  ['.[^aeiou]eable$', 'Adjective'],
  ['.[^aeiou]ful$', 'Adjective'],
  ['.[^aeiou]ish$', 'Adjective'],
  ['.[^aeiou]ica$', 'Singular'],
  ['[aeiou][^aeiou]is$', 'Singular'],
  ['[^aeiou]ard$', 'Singular'],
  ['[^aeiou]ism$', 'Singular'],
  ['.[^aeiou]ity$', 'Singular'],
  ['.[^aeiou]ium$', 'Singular'],
  ['.[lstrn]us$', 'Singular'],
  ['..ic$', 'Adjective'],
  ['[aeiou][^aeiou]id$', 'Adjective'],
  ['.[^aeiou]ish$', 'Adjective'],
  ['.[^aeiou]ive$', 'Adjective'],
  ['[ea]{2}zy$', 'Adjective'],
  ['[^aeiou]ician$', 'Actor'],
  ['.keeper$', 'Actor'],
  ['.logist$', 'Actor'],
  ['..ier$', 'Actor'],
  ['.ettes$', 'Plural'],
  ['.ette$', 'Singular'],
  ['.[^aeiou][ao]pher$', 'Actor'],
  ['.tive$', 'Actor'],
  ['[aeiou].*ist$', 'Adjective'],
  ['[^i]fer$', 'Infinitive'],
  ['(bb|tt|gg|pp|ll)..?$', 'Verb'], //rubbed
  ['[aeiou]c?ked$', 'PastTense'], //hooked
  ['(eastern|central|mountain|pacific)( standard)? time', 'Time'], //PST, eastern time.  Todo:(only American right now)
  //slang things
  ['^um+$', 'Expression'], //ummmm
  ['^([hyj]a)+$', 'Expression'], //hahah
  ['^(k)+$', 'Expression'], //kkkk
  ['^(yo)+$', 'Expression'], //yoyo
  ['^yes+$', 'Expression'], //yessss
  ['^no+$', 'Expression'], //noooo
  ['^lol[sz]$', 'Expression'], //lol
  ['^woo+[pt]?$', 'Expression'], //woo
  ['^ug?h+$', 'Expression'], //uhh
  ['^uh[ -]?oh$', 'Expression'], //uhoh

  //lastname patterns
  //https://en.wikipedia.org/wiki/List_of_family_name_affixes
  //macdonell
  ['^ma?cd[aeiou]', 'LastName'],
  //icelandic/swedish
  ['.sdottir$', 'LastName'], //female
  ['.sson$', 'LastName'], //male
  //polish
  ['.[oau][wvl]ski$', 'LastName'], //male
  ['.[oau][wvl]ska$', 'LastName'], //female
  ['.czyk$', 'LastName'], //male
  ['.marek$', 'LastName'], //male
  //east-europe Hasanov, etc
  ['.[^aeiou][ai][kln]ov$', 'LastName'], //
  ['..chuk$', 'LastName'], //
  ['..enko$', 'LastName'], //
  ['.v[iy]ch$', 'LastName'], //
  //greek
  ['.opoulos$', 'LastName'], //
  ['.akis$', 'LastName'], //
  //lithuania
  ['.auskas$', 'LastName'],
  //norway
  ['.nss?en$', 'LastName']

].map(function (a) {
  return {
    reg: new RegExp(a[0]),
    tag: a[1],
    str: a[0]
  };
});
