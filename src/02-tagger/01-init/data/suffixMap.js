//just a foolish lookup of known suffixes
const Adj = 'Adjective'
const Inf = 'Infinitive'
const Pres = 'PresentTense'
const Sing = 'Singular'
const Past = 'PastTense'
const Avb = 'Adverb'
const Plrl = 'Plural'
const Actor = 'Actor'
const Vb = 'Verb'
const Noun = 'Noun'
const Last = 'LastName'
const Modal = 'Modal'
const Place = 'Place'

// find any issues - https://observablehq.com/@spencermountain/suffix-word-lookup
module.exports = [
  null, //0
  null, //1
  {
    //2-letter
    ea: Sing,
    ia: Noun,
    ic: Adj,
    ly: Avb,
    "'n": Vb,
    "'t": Vb,
  },
  {
    //3-letter
    oed: Past,
    ued: Past,
    xed: Past,
    ' so': Avb,
    "'ll": Modal,
    "'re": 'Copula',
    azy: Adj,
    eer: Noun,
    end: Vb,
    ped: Past,
    ffy: Adj,
    ify: Inf,
    ing: 'Gerund', //likely to be converted to Adj after lexicon pass
    ize: Inf,
    lar: Adj,
    mum: Adj,
    nes: Pres,
    nny: Adj,
    oid: Adj,
    ous: Adj,
    que: Adj,
    rol: Sing,
    sis: Sing,
    zes: Pres,
  },
  {
    //4-letter
    amed: Past,
    aped: Past,
    ched: Past,
    lked: Past,
    nded: Past,
    cted: Past,
    dged: Past,

    akis: Last, //greek
    cede: Inf,
    chuk: Last, //east-europe
    czyk: Last, //polish (male)
    ects: Pres,
    ends: Vb,
    enko: Last, //east-europe
    ette: Sing,
    fies: Pres,
    fore: Avb,
    gate: Inf,
    gone: Adj,
    ices: Plrl,
    ints: Plrl,
    ines: Plrl,
    ions: Plrl,
    less: Avb,
    llen: Adj,
    made: Adj,
    nsen: Last, //norway
    oses: Pres,
    ould: Modal,
    some: Adj,
    sson: Last, //swedish male
    tage: Inf,
    teen: 'Value',
    tion: Sing,
    tive: Adj,
    tors: Noun,
    vice: Sing,
  },
  {
    //5-letter
    tized: Past,
    urned: Past,
    eased: Past,

    ances: Plrl,
    bound: Adj,
    ettes: Plrl,
    fully: Avb,
    ishes: Pres,
    ities: Plrl,
    marek: Last, //polish (male)
    nssen: Last, //norway
    ology: Noun,
    ports: Plrl,
    rough: Adj,
    tches: Pres,
    tieth: 'Ordinal',
    tures: Plrl,
    wards: Avb,
    where: Avb,
  },
  {
    //6-letter
    auskas: Last, //lithuania
    keeper: Actor,
    logist: Actor,
    teenth: 'Value',
  },
  {
    //7-letter
    opoulos: Last, //greek
    borough: Place, //Hillsborough
    sdottir: Last, //swedish female
  },
]
