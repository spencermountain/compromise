//rules for turning a verb into infinitive form
let rules = {
  Participle: [
    {
      reg: /own$/i,
      to: 'ow',
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
      reg: /(..)(p|d|t|g){2}ing$/i,
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
      reg: /([tbckg]l)ing$/i, //dp
      to: '$1e',
    },
    {
      //cing : bouncing, denouncing
      reg: /(c|s)ing$/i, //dp
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
      reg: /(ued)$/i,
      to: 'ue',
    },
    {
      reg: /a([^aeiouy])ed$/i,
      to: 'a$1e',
    },
    {
      reg: /([aeiou]zz)ed$/i,
      to: '$1',
    },
    {
      reg: /(e|i)lled$/i,
      to: '$1ll',
    },
    {
      reg: /(.)(sh|ch)ed$/i,
      to: '$1$2',
    },
    {
      reg: /(tl|gl)ed$/i,
      to: '$1e',
    },
    {
      reg: /(um?pt?)ed$/i,
      to: '$1',
    },
    {
      reg: /(ss)ed$/i,
      to: '$1',
    },
    {
      reg: /pped$/i,
      to: 'p',
    },
    {
      reg: /tted$/i,
      to: 't',
    },
    {
      reg: /(..)gged$/i,
      to: '$1g',
    },
    {
      reg: /(..)lked$/i,
      to: '$1lk',
    },
    {
      reg: /([^aeiouy][aeiou])ked$/i,
      to: '$1ke',
    },
    {
      reg: /(.[aeiou])led$/i,
      to: '$1l',
    },
    {
      reg: /(..)(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$/i,
      to: '$1$2',
    },
    {
      reg: /(.ut)ed$/i,
      to: '$1e',
    },
    {
      reg: /(.pt)ed$/i,
      to: '$1',
    },
    {
      reg: /(us)ed$/i,
      to: '$1e',
    },
    {
      reg: /(dd)ed$/i,
      to: '$1',
    },
    {
      reg: /(..[^aeiouy])ed$/i,
      to: '$1e',
    },
    {
      reg: /(..)ied$/i,
      to: '$1y',
    },
    {
      reg: /(.o)ed$/i,
      to: '$1o',
    },
    {
      reg: /(..i)ed$/i,
      to: '$1',
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
      reg: /([rl])ew$/i,
      to: '$1ow',
    },
    {
      reg: /([pl])t$/i,
      to: '$1t',
    },
  ],
}
module.exports = rules
