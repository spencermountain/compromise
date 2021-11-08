//rules for turning a verb into infinitive form
let rules = {
  Participle: [
    {
      reg: /own$/i,
      to: 'ow',
    },
    {
      reg: /aken$/i,//overtaken
      to: 'ake',
    },
    {
      reg: /(.)un([g|k])$/i,
      to: '$1in$2',
    },
  ],
  Actor: [
    {
      reg: /(er)er$/i,
      to: '$1',
    },
  ],
  PresentTense: [
    {
      reg: /(..)(ies)$/i,
      to: '$1y',
    },
    {
      reg: /(tch|sh)es$/i,
      to: '$1',
    },
    {
      reg: /(ss|zz)es$/i,
      to: '$1',
    },
    {
      reg: /([tzlshicgrvdnkmu])es$/i,
      to: '$1e',
    },
    {
      reg: /(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$/i,
      to: '$1',
    },
    {
      reg: /(ow)s$/i,
      to: '$1',
    },
    {
      reg: /(op)s$/i,
      to: '$1',
    },
    {
      reg: /([eirs])ts$/i,
      to: '$1t',
    },
    {
      reg: /(ll)s$/i,
      to: '$1',
    },
    {
      reg: /(el)s$/i,
      to: '$1',
    },
    {
      reg: /(ip)es$/i,
      to: '$1e',
    },
    {
      reg: /ss$/i,
      to: 'ss',
    },
    {
      reg: /s$/i,
      to: '',
    },
  ],
  Gerund: [
    {
      //popping -> pop
      reg: /(..)([pdtg]){2}ing$/i,
      to: '$1$2',
    },
    {
      //fuzzing -> fuzz
      reg: /(ll|ss|zz)ing$/i,
      to: '$1',
    },
    {
      reg: /([^aeiou])ying$/i,
      to: '$1y',
    },
    {
      reg: /([^ae]i.)ing$/i,
      to: '$1e',
    },
    {
      //eating, reading
      reg: /(ea[dklnrtv])ing$/i,
      to: '$1',
    },
    {
      //washing -> wash
      reg: /(ch|sh)ing$/i,
      to: '$1',
    },
    //soft-e forms:
    {
      //z : hazing (not buzzing)
      reg: /(z)ing$/i,
      to: '$1e',
    },
    {
      //a : baking, undulating
      reg: /(a[gdkvtc])ing$/i,
      to: '$1e',
    },
    {
      //u : conjuring, tubing
      reg: /(u[rtcbn])ing$/i,
      to: '$1e',
    },
    {
      //o : forboding, poking, hoping, boring (not hooping)
      reg: /([^o]o[bdknprv])ing$/i,
      to: '$1e',
    },
    {
      //ling : tingling, wrinkling, circling, scrambling, bustling
      reg: /([tbckg]l)ing$/i,
      to: '$1e',
    },
    {
      //cing : bouncing, denouncing
      reg: /(.[c|s])ing$/i,
      to: '$1e',
    },
    // {
    //   //soft-e :
    //   reg: /([ua]s|[dr]g|z|o[rlsp]|cre)ing$/i,
    //   to: '$1e',
    // },
    {
      //fallback
      reg: /(..)ing$/i,
      to: '$1',
    },
  ],
  PastTense: [
    {
      reg: /([rl])ew$/i,//threw
      to: '$1ow',
    },
    {
      reg: /(ow)n$/i,//flown
      to: '$1',
    },
    {
      reg: /orn$/i,//worn
      to: 'ear',
    },
    {
      reg: /eld$/i,//withheld
      to: 'old',
    },
    {
      reg: /([pl])t$/i,
      to: '$1t',
    },

    // ====  -ed  ====

    // misc-ed
    {
      reg: /ea(rn|l|m)ed$/i,
      to: 'ea$1',
    },
    {
      reg: /(um?pt?)ed$/i,
      to: '$1',
    },
    // misc no e endings
    {
      reg: /(..)(h|w|ion|n[dt]|ai.|all|int|ld|en|oo.|er|ou.|ght|rm|lm|rl|x|bt|rb)ed$/i,
      to: '$1$2',
    },
    // doubled consonants
    {
      reg: /(..)(p|s|b|d){2}ed$/i,// eslint-disable-line
      to: '$1$2', //robbed -> rob
    },
    // -ded
    {
      reg: /uaded$/i,//pursuaded
      to: 'uade',
    },
    {
      reg: /(.[aeiou]{2}d)ed$/i,//downloaded
      to: '$1',
    },
    {
      reg: /(.[rnd]d)ed$/i,//forwarded, ended
      to: '$1',
    },
    // -fed
    {
      reg: /fed$/i,
      to: 'f',
    },
    // -med
    {
      reg: /mmed$/i, //jammed
      to: 'm',
    },
    {
      reg: /([aeiou]{2}m)ed$/i, //doomed
      to: '$1',
    },
    {
      reg: /([aeiou]me)d$/i, //welcomed
      to: '$1',
    },
    {
      reg: /med$/i, //doomed
      to: 'm',
    },
    // -led
    {
      reg: /([vpnd])elled$/i, //one-l
      to: '$1el',
    },
    {
      reg: /([aeiou])lled$/i, //two-l's
      to: '$1ll',
    },
    {
      reg: /(tl|gl)ed$/i,
      to: '$1e',
    },
    {
      reg: /([aeiou]{2})led$/i,//sailed
      to: '$1l',
    },
    {
      reg: /(.[iou])led$/i, //ruled, piled
      to: '$1le',
    },
    {
      reg: /(.[ae])led$/i, //wheeled, totaled
      to: '$1l',
    },
    // -ged
    {
      reg: /(..)gged$/i,
      to: '$1g',
    },
    // -ked
    {
      reg: /(..)lked$/i,
      to: '$1lk',
    },
    {
      reg: /([^aeiouy][aeiou])ked$/i,
      to: '$1ke',
    },
    // -ned
    {
      reg: /([lfw]in)ed$/i, // lined, entwined
      to: '$1e',
    },
    {
      reg: /([aeiou][gr]n)ed$/i, // designed, turned
      to: '$1',
    },
    {
      reg: /([aeiou]n)ed$/i, // rained
      to: '$1',
    },
    // -hed
    {
      reg: /(.)(sh|ch)ed$/i,
      to: '$1$2',
    },
    // -ped
    {
      reg: /pped$/i,
      to: 'p',
    },
    // -red
    {
      reg: /(.rr)ed$/i,
      to: '$1',
    },
    {
      reg: /(.[aeiou]{2}r)ed$/i,//appeared
      to: '$1',
    },
    {
      reg: /(.[aeiou]r)ed$/i,//admired
      to: '$1e',
    },
    // -sed
    {
      reg: /(ss)ed$/i,
      to: '$1',
    },
    {
      reg: /(us)ed$/i,
      to: '$1e',
    },
    // -ted
    {
      reg: /iated$/i,//satiated
      to: 'iate',
    },
    {
      reg: /tted$/i,//admitted
      to: 't',
    },
    {
      reg: /(.[aeiou]{2})ted$/i, //rooted/boated/greeted/suited
      to: '$1t',
    },
    {
      reg: /([pfmdb][ie]t)ed$/i,//trumpeted/limited
      to: '$1',
    },
    {
      reg: /asted$/i,//wasted, tasted
      to: 'aste',
    },
    {
      reg: /(.[aeiou]t)ed$/i, //created, voted, attributed
      to: '$1e',
    },
    {
      reg: /(.[pfrsc]t)ed$/i,//drifted
      to: '$1',
    },
    // -zed
    {
      reg: /([aeiou]zz)ed$/i,
      to: '$1',
    },
    // -yed
    {
      reg: /([aeiou]y)ed$/i,
      to: '$1',
    },

    // vowel-ed
    {
      reg: /ued$/i,
      to: 'ue',
    },
    {
      reg: /(^.ie)d$/i,//lied
      to: '$1',
    },
    {
      reg: /(.o)ed$/i,//echoed, vetoed
      to: '$1',
    },
    {
      reg: /(..)ied$/i,
      to: '$1y',
    },
    {
      reg: /(..i)ed$/i,
      to: '$1',
    },

    // fallbacks
    {
      reg: /a([^aeiouy])ed$/i,
      to: 'a$1e',
    },
    {
      reg: /(.a[^aeiou])ed$/i,
      to: '$1',
    },
    {
      //owed, aced
      reg: /([aeiou][^aeiou])ed$/i,
      to: '$1e',
    },
    {
      reg: /(..[^aeiouy])ed$/i,
      to: '$1e',
    },


  ],
}
export default rules
