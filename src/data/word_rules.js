//regex patterns and parts of speech
var word_rules = [
  {
    "reg": /.[cts]hy$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[st]ty$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[lnr]ize$/i,
    "pos": "VB"
  },
  {
    "reg": /.[gk]y$/i,
    "pos": "JJ"
  },
  {
    "reg": /.fies$/i,
    "pos": "VB"
  },
  {
    "reg": /.some$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[nrtumcd]al$/i,
    "pos": "JJ"
  },
  {
    "reg": /.que$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[tnl]ary$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[di]est$/i,
    "pos": "JJS"
  },
  {
    "reg": /^(un|de|re)\\-[a-z]../i,
    "pos": "VB"
  },
  {
    "reg": /.lar$/i,
    "pos": "JJ"
  },
  {
    "reg": /[bszmp]{2}y/i,
    "pos": "JJ"
  },
  {
    "reg": /.zes$/i,
    "pos": "VB"
  },
  {
    "reg": /.[icldtgrv]ent$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[rln]ates$/i,
    "pos": "VBZ"
  },
  {
    "reg": /.[oe]ry$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[rdntk]ly$/i,
    "pos": "RB"
  },
  {
    "reg": /.[lsrnpb]ian$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[lnt]ial$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[vrl]id$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[ilk]er$/i,
    "pos": "JJR"
  },
  {
    "reg": /.ike$/i,
    "pos": "JJ"
  },
  {
    "reg": /.ends$/i,
    "pos": "VB"
  },
  {
    "reg": /.wards$/i,
    "pos": "RB"
  },
  {
    "reg": /.rmy$/i,
    "pos": "JJ"
  },
  {
    "reg": /.rol$/i,
    "pos": "NN"
  },
  {
    "reg": /.tors$/i,
    "pos": "NN"
  },
  {
    "reg": /.azy$/i,
    "pos": "JJ"
  },
  {
    "reg": /.where$/i,
    "pos": "RB"
  },
  {
    "reg": /.ify$/i,
    "pos": "VB"
  },
  {
    "reg": /.bound$/i,
    "pos": "JJ"
  },
  {
    "reg": /.ens$/i,
    "pos": "VB"
  },
  {
    "reg": /.oid$/i,
    "pos": "JJ"
  },
  {
    "reg": /.vice$/i,
    "pos": "NN"
  },
  {
    "reg": /.rough$/i,
    "pos": "JJ"
  },
  {
    "reg": /.mum$/i,
    "pos": "JJ"
  },
  {
    "reg": /.teen(th)?$/i,
    "pos": "CD"
  },
  {
    "reg": /.oses$/i,
    "pos": "VB"
  },
  {
    "reg": /.ishes$/i,
    "pos": "VB"
  },
  {
    "reg": /.ects$/i,
    "pos": "VB"
  },
  {
    "reg": /.tieth$/i,
    "pos": "CD"
  },
  {
    "reg": /.ices$/i,
    "pos": "NN"
  },
  {
    "reg": /.bles$/i,
    "pos": "VB"
  },
  {
    "reg": /.pose$/i,
    "pos": "VB"
  },
  {
    "reg": /.ions$/i,
    "pos": "NN"
  },
  {
    "reg": /.ean$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[ia]sed$/i,
    "pos": "JJ"
  },
  {
    "reg": /.tized$/i,
    "pos": "VB"
  },
  {
    "reg": /.llen$/i,
    "pos": "JJ"
  },
  {
    "reg": /.fore$/i,
    "pos": "RB"
  },
  {
    "reg": /.ances$/i,
    "pos": "NN"
  },
  {
    "reg": /.gate$/i,
    "pos": "VB"
  },
  {
    "reg": /.nes$/i,
    "pos": "VB"
  },
  {
    "reg": /.less$/i,
    "pos": "RB"
  },
  {
    "reg": /.ried$/i,
    "pos": "JJ"
  },
  {
    "reg": /.gone$/i,
    "pos": "JJ"
  },
  {
    "reg": /.made$/i,
    "pos": "JJ"
  },
  {
    "reg": /.[pdltrkvyns]ing$/i,
    "pos": "JJ"
  },
  {
    "reg": /.tions$/i,
    "pos": "NN"
  },
  {
    "reg": /.tures$/i,
    "pos": "NN"
  },
  {
    "reg": /.ous$/i,
    "pos": "JJ"
  },
  {
    "reg": /.ports$/i,
    "pos": "NN"
  },
  {
    "reg": /. so$/i,
    "pos": "RB"
  },
  {
    "reg": /.ints$/i,
    "pos": "NN"
  },
  {
    "reg": /.[gt]led$/i,
    "pos": "JJ"
  },
  {
    "reg": /[aeiou].*ist$/i,
    "pos": "JJ"
  },
  {
    "reg": /.lked$/i,
    "pos": "VB"
  },
  {
    "reg": /.fully$/i,
    "pos": "RB"
  },
  {
    "reg": /.*ould$/i,
    "pos": "MD"
  },
  {
    "reg": /^-?[0-9]+(.[0-9]+)?$/,
    "pos": "CD"
  },
  {
    "reg": /[a-z]*\\-[a-z]*\\-/,
    "pos": "JJ"
  },
  {
    "reg": /[a-z]'s$/i,
    "pos": "NNO"
  },
  {
    "reg": /.'n$/i,
    "pos": "VB"
  },
  {
    "reg": /.'re$/i,
    "pos": "CP"
  },
  {
    "reg": /.'ll$/i,
    "pos": "MD"
  },
  {
    "reg": /.'t$/i,
    "pos": "VB"
  },
  {
    "reg": /.tches$/i,
    "pos": "VB"
  },
  {
    "reg": /^https?:\/\//i,
    "pos": "CD"
  },
  {
    "reg": /^www\.[a-z0-9]/i,
    "pos": "CD"
  }
]

if (typeof module !== "undefined" && module.exports) {
  module.exports = word_rules;
}
