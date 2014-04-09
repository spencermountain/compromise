exports.data= [

    {
        reg: /a[tg]e$/i,
        examples: 'angulate, stipulate, orientate',
        exceptions: [
            "ate",
            "overate"
        ],
        power: 804,
        tense: 'infinitive'
    }, {
        reg: /i[zn]e$/i,
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
        reg: /[td]er$/i,
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
        reg: /[bd]le$/i,
        examples: 'shamble, warble, grabble',
        exceptions: [],
        power: 69,
        tense: 'infinitive'
    }, {
        reg: /ish$/i,
        examples: 'relish, wish, brandish',
        exceptions: [],
        power: 62,
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
        reg: /e[nc]t$/i,
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
    }, {
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
    }, {
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
    }, {
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
        reg: /.[pigmcvwbyfk]ed$/i,
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
        tense: "past"
    }
]