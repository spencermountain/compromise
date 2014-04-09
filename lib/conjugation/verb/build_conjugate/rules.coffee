exports.rules= [

    {
        reg: /([a[tg]|i[zn]])e$/i,
        repl:{
            present:"$1es",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'angulate, stipulate, orientate',
        exceptions: [
            "ate",
            "overate"
        ],
        power: 804,
        tense: 'infinitive'
    }, {
        reg: /(i[zn])e$/i,
        repl:{
            present:"$1es",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'regularize, prize, deodorize',
        exceptions: [],
        power: 535,
        tense: 'infinitive'
    }, {
        reg: /ify$/i,
        repl:{
            present:"ifies",
            gerund:"ifying",
            past:"ified",
        },
        examples: 'unify, classify, glorify',
        exceptions: [],
        power: 128,
        tense: 'infinitive'
    }, {
        reg: /([td])er$/i,
        repl:{
            present:"$1s",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'sputter, fritter, charter',
        exceptions: [],
        power: 123,
        tense: 'infinitive'
    }, {
        reg: /(ur)e$/i,
        repl:{
            present:"$1s",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'conjure, rupture, endure',
        exceptions: [],
        power: 78,
        tense: 'infinitive'
    }, {
        reg: /([bd])le$/i,
        repl:{
            present:"$1es",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'shamble, warble, grabble',
        exceptions: [],
        power: 69,
        tense: 'infinitive'
    }, {
        reg: /(ish)$/i,
        repl:{
            present:"$1es",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'relish, wish, brandish',
        exceptions: [],
        power: 62,
        tense: 'infinitive'
    }, {
        reg: /(nc)e$/i,
        repl:{
            present:"$1es",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'denounce, discountenance, freelance',
        exceptions: [],
        power: 61,
        tense: 'infinitive'
    }, {
        reg: /(tch)$/i,
        repl:{
            present:"$1es",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'patch, splotch, snatch',
        exceptions: [],
        power: 61,
        tense: 'infinitive'
    }, {
        reg: /(gl)e$/i,
        repl:{
            present:"$1es",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'tingle, intermingle, ogle',
        exceptions: [],
        power: 59,
        tense: 'infinitive'
    }, {
        reg: /(end)$/i,
        repl:{
            present:"$1s",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'upend, mend, extend',
        exceptions: [],
        power: 58,
        tense: 'infinitive'
    }, {
        reg: /(ess)$/i,
        repl:{
            present:"$1es",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'address, dispossess, stress',
        exceptions: [],
        power: 56,
        tense: 'infinitive'
    }, {
        reg: /(ise)$/i,
        repl:{
            present:"$1es",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'mortise, disguise, circumcise',
        exceptions: [],
        power: 56,
        tense: 'infinitive'
    }, {
        reg: /(ion)$/i,
        repl:{
            present:"$1s",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'caution, aircondition, cushion',
        exceptions: [],
        power: 55,
        tense: 'infinitive'
    }, {
        reg: /(e[nc]t)$/i,
        repl:{
            present:"$1s",
            gerund:"$1ing",
            past:"$1ed",
        },
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
        reg: /([tzlshicgrvdnkmu])es$/i,
        repl:{
            infinitive:"$1e",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'convolutes, angulates, stipulates',
        exceptions: [],
        power: 923,
        tense: 'present'
    }, {
        reg: /(n[dtk])s$/i,
        repl:{
            infinitive:"$1",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'wants, squints, garments',
        exceptions: [],
        power: 153,
        tense: 'present'
    }, {
        reg: /(c[kt])s$/i,
        repl:{
            infinitive:"$1",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'rucks, understocks, hoicks',
        exceptions: [],
        power: 138,
        tense: 'present'
    }, {
        reg: /([eo])ns$/i,
        repl:{
            infinitive:"$1n",
            gerund:"$1ning",
            past:"$1ned",
        },
        examples: 'disburdens, lengthens, sweetens',
        exceptions: [],
        power: 123,
        tense: 'present'
    }, {
        reg: /([eirs])ts$/i,
        repl:{
            infinitive:"$1t",
            gerund:"$1tting",
            past:"$1tted",
        },
        examples: 'outwits, revisits, knits',
        exceptions: [],
        power: 105,
        tense: 'present'
    }, {
        reg: /(ll)s$/i,
        repl:{
            infinitive:"$1",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'culls, tolls, shalls',
        exceptions: [],
        power: 92,
        tense: 'present'
    }, {
        reg: /(i[nl])s$/i,
        repl:{
            infinitive:"$1",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'fins, replevins, disdains',
        exceptions: [],
        power: 90,
        tense: 'present'
    }, {
        reg: /(er)s$/i,
        repl:{
            infinitive:"$1",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'shutters, inters, powers',
        exceptions: [],
        power: 88,
        tense: 'present'
    },  {
        reg: /(el)s$/i,
        repl:{
            infinitive:"$1",
            gerund:"$1ling",
            past:"$1led",
        },
        examples: 'swivels, rebels, travels',
        exceptions: [],
        power: 88,
        tense: 'present'
    }, {
        reg: /(o[wp])s$/i,
        repl:{
            infinitive:"$1",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'yellows, vows, wheelbarrows',
        exceptions: [],
        power: 79,
        tense: 'present'
    }, {
        reg: /(a[ytrl])s$/i,
        repl:{
            infinitive:"$1",
            gerund:"$1ing",
            past:"$1ed",
        },
        examples: 'relays, allays, outlays',
        exceptions: [],
        power: 72,
        tense: 'present'
    },










    {
        reg: /([aeiou].*?)ing$/i,
        repl:{
            infinitive:"$1",
            present:"$1s",
            past:"$1e",
        }
        examples: 'convoluting, fawning, fouling',
        exceptions: [],
        power: 8475,
        tense: 'gerund'
    },









    {
        reg: /(.[pigmcvwbyfkt])ed$/i,
        repl:{
            infinitive:"$1e",
            present:"$1es",
            gerund:"$1ing",
        }
        examples: 'convoluted, outwitted, angulated',
        exceptions: [],
        power: 1854,
        tense: 'past'
    }, {
        reg: /([rl])ew$/i
        repl:{
            infinitive:"$1ow",
            present:"$1ows",
            gerund:"$1owing",
        }
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