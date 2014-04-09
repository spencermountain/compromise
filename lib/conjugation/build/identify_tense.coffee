require('dirtyjs')
data=require("./data").data
data=data.map (d)->
  delete d.past_participle
  d

testit = (reg, prop)->
  has= data.filter (d)-> d[prop].match(reg)
  console.log "#{has.length} correct ones #{has.length/data.length}%"
  console.log has.map(prop)
  console.log "=============="

  rest= data.map (d)->
    delete d[prop]
    d
  bads= []
  rest.forEach (d)->
    Object.keys(d).forEach (k)->
      if d[k].match(reg) #&& k=="infinitive"
        console.log d[k]
        bads.push(k)
  console.log bads.topk()
  # all= all.flatten()
  # all= all.filter (d)-> d.match(reg)
  # console.log "#{all.length} false positive"

# testit(/[aeiou].*?ing$/, 'gerund')
# 8437 correct ones 0.9934063346285176%
# 6 false positive
# [ 'upspring',
#   'hamstring',
#   'unstring',
#   'restring',
#   'upswing',
#   'unsling' ]

# testit(/..[^e]ed$/, 'past')
# testit(/[rl]ew$/, 'past')

suffix_patterns= (wants_arr, nots_arr, size=3)->
  patterns=(arr)->
    arr.topkp().filter((p)->p.percent>=0.6).reduce((h,a)->
      h[a.value]=a.count
      h
    ,{})
  suffixes=(arr)->
    arr.map (a)->a.substr(a.length-size, a.length)
  wants= patterns(suffixes(wants_arr))
  nots= patterns(suffixes(nots_arr))
  best= Object.keys(wants).map (p)->
    {
      suffix:p,
      hits:wants[p]
      false_positives:nots[p]||0
      # delta:(wants[p] - (nots[p]||0)).toFixed(2)
    }
  best= best.sort (a,b)->b.hits-a.hits
  best.map (b)->
    b.examples= wants_arr.filter((w)-> w.substr(w.length-size, w.length)==b.suffix).slice(0,4)
    b.exceptions= nots_arr.filter (w)-> w.substr(w.length-size, w.length)==b.suffix
    b

obj= {}
types= ["infinitive", "present", "gerund","past"]
types.each (k)->
  wants= data.map(k)
  nots= data.map((d)->
    delete d[k]
    Object.values(d)
    ).flatten()
  obj[k]=suffix_patterns(wants, nots, 3)

console.log(JSON.stringify(obj, null, 2));
# console.log data.filter((d)-> d.past_participle != d.past).map (d)-> [d.past, d.past_participle]



discovered_rules = [{
        reg: /ate$/i,
        examples: 'angulate, stipulate, orientate',
        exceptions: [
            "ate",
            "overate"
        ],
        power: 804,
        tense: 'infinitive'
    }, {
        reg: /ize$/i,
        examples: 'regularize, prize, deodorize',
        exceptions: [],
        power: 535,
        tense: 'infinitive'
    }, {
        reg: /ify$/i,
        examples: 'unify, classify, glorify',
        exceptions: [],
        power: 128,
        tense: 'infinitive'
    }, {
        reg: /ter$/i,
        examples: 'sputter, fritter, charter',
        exceptions: [],
        power: 123,
        tense: 'infinitive'
    }, {
        reg: /ure$/i,
        examples: 'conjure, rupture, endure',
        exceptions: [],
        power: 78,
        tense: 'infinitive'
    }, {
        reg: /ble$/i,
        examples: 'shamble, warble, grabble',
        exceptions: [],
        power: 69,
        tense: 'infinitive'
    }, {
        reg: /dle$/i,
        examples: 'straddle, waddle, spindle',
        exceptions: [],
        power: 68,
        tense: 'infinitive'
    }, {
        reg: /ine$/i,
        examples: 'chine, machine, wine',
        exceptions: [],
        power: 65,
        tense: 'infinitive'
    }, {
        reg: /ish$/i,
        examples: 'relish, wish, brandish',
        exceptions: [],
        power: 62,
        tense: 'infinitive'
    }, {
        reg: /ect$/i,
        examples: 'transect, project, object',
        exceptions: [],
        power: 61,
        tense: 'infinitive'
    }, {
        reg: /nce$/i,
        examples: 'denounce, discountenance, freelance',
        exceptions: [],
        power: 61,
        tense: 'infinitive'
    }, {
        reg: /tch$/i,
        examples: 'patch, splotch, snatch',
        exceptions: [],
        power: 61,
        tense: 'infinitive'
    }, {
        reg: /gle$/i,
        examples: 'tingle, intermingle, ogle',
        exceptions: [],
        power: 59,
        tense: 'infinitive'
    }, {
        reg: /age$/i,
        examples: 'damage, stagemanage, encourage',
        exceptions: [],
        power: 58,
        tense: 'infinitive'
    }, {
        reg: /end$/i,
        examples: 'upend, mend, extend',
        exceptions: [],
        power: 58,
        tense: 'infinitive'
    }, {
        reg: /ess$/i,
        examples: 'address, dispossess, stress',
        exceptions: [],
        power: 56,
        tense: 'infinitive'
    }, {
        reg: /ise$/i,
        examples: 'mortise, disguise, circumcise',
        exceptions: [],
        power: 56,
        tense: 'infinitive'
    }, {
        reg: /ion$/i,
        examples: 'caution, aircondition, cushion',
        exceptions: [],
        power: 55,
        tense: 'infinitive'
    }, {
        reg: /der$/i,
        examples: 'thunder, supercalender, pander',
        exceptions: [],
        power: 53,
        tense: 'infinitive'
    }, {
        reg: /ent$/i,
        examples: 'garment, re-present, regiment',
        exceptions: [
            "sent",
            "bent",
            "overspent",
            "misspent",
            "went",
            "kent",
            "outwent",
            "forwent",
            "spent",
            "pent",
            "lent",
            "underwent",
            "rent",
            "unbent",
            "shent"
        ],
        power: 51,
        tense: 'infinitive'
    },



    {
        reg: /[tzlshicgrvdnkmu]es$/i,
        examples: 'convolutes, angulates, stipulates',
        exceptions: [],
        power: 923,
        tense: 'present'
    }, {
        reg: /n[dtk]s$/i,
        examples: 'wants, squints, garments',
        exceptions: [],
        power: 153,
        tense: 'present'
    }, {
        reg: /c[kt]s$/i,
        examples: 'rucks, understocks, hoicks',
        exceptions: [],
        power: 138,
        tense: 'present'
    },  {
        reg: /[eo]ns$/i,
        examples: 'disburdens, lengthens, sweetens',
        exceptions: [],
        power: 123,
        tense: 'present'
    }, {
        reg: /[eirs]ts$/i,
        examples: 'outwits, revisits, knits',
        exceptions: [],
        power: 105,
        tense: 'present'
    },  {
        reg: /lls$/i,
        examples: 'culls, tolls, shalls',
        exceptions: [],
        power: 92,
        tense: 'present'
    }, {
        reg: /i[nl]s$/i,
        examples: 'fins, replevins, disdains',
        exceptions: [],
        power: 90,
        tense: 'present'
    }, {
        reg: /e[lr]s$/i,
        examples: 'swivels, rebels, travels',
        exceptions: [],
        power: 88,
        tense: 'present'
    }, {
        reg: /o[wp]s$/i,
        examples: 'yellows, vows, wheelbarrows',
        exceptions: [],
        power: 79,
        tense: 'present'
    },  {
        reg: /a[ytrl]s$/i,
        examples: 'relays, allays, outlays',
        exceptions: [],
        power: 72,
        tense: 'present'
    },



    {
        reg: /[aeiou].*?ing$/i,
        examples: 'convoluting, fawning, fouling',
        exceptions: [],
        power: 8475,
        tense: 'gerund'
    },


    {
        reg: /.[pigmcvwbyf]ed$/i,
        examples: 'convoluted, outwitted, angulated',
        exceptions: [],
        power: 1854,
        tense: 'past'
    }, {
        reg: /[rl]ew$/i
        example: "overthrew"
        exceptions: [
            "brew",
            "crew",
            "screw",
            "unscrew",
        ]
        pos: "past"
    }
]
