import nlp from './src/three.js'

let misc = [
  "time",  // Verb
  "level",  // Verb
  "cost",  // Verb
  "question",  // Verb
  "type",  // Verb
  "factor",  // Infinitive
  "rule",  // Verb
  "billion",  // Multiple
  "reason",  // Verb
  "today",  // Date
  "man",  // Infinitive
  "trend",  // Verb
  "hand",  // Verb
  "crop",  // Verb
  "phone",  // Verb
  "profile",  // Infinitive
  "kind",  // Adjective
  "side",  // Verb
  "premium",  // Adjective
  "discipline",  // Infinitive
  "rat",  // Verb
  "dividend",  // Verb
  "athlete",  // Infinitive
  "m",  // Expression
  "milk",  // Verb
  "trip",  // Verb
  "skin",  // Infinitive
  "thousand",  // Multiple
  "thanks",  // PresentTense
  "shock",  // Verb
  "array",  // Infinitive
  "defect",  // Verb
  "thought",  // PastTense
  "hundred",  // Multiple
  "bottle",  // Verb
  "juice",  // Verb
  "mouth",  // Verb
  "scholar",  // Adjective
  "bit",  // PastTense
  "synergy",  // Adjective
  "allergy",  // Adjective
  "whale",  // Infinitive
  "grid",  // Adjective
  "breakthrough",  // Adjective
  "eleven",  // TextValue
  "fun",  // Adjective
  "lipid",  // Adjective
  "telescope",  // Infinitive
  "monkey",  // Infinitive
  "indices",  // Verb
  "stipend",  // Verb
  "accused",  // PastTense
  "communiqué",  // Adjective
  "tone",  // Verb
  "fourteen",  // TextValue
  "traps",  // Verb
  "shot",  // PastTense
  "forty",  // TextValue
  "disincentive",  // Adjective
  "motive",  // Adjective
  "biopsy",  // Adjective
  "keynote",  // Infinitive
  "stays",  // Verb
  "caucus",  // Infinitive
  "gamete",  // Infinitive
  "tribute",  // Verb
  "plenty",  // Determiner
  "handful",  // Adjective
  "fringe",  // Adjective
  "seabed",  // PastTense
  "headline",  // Infinitive
  "autopsy",  // Adjective
  "clergy",  // Adjective
  "clearer",  // Comparative
  "nous",  // Adjective
  "stranger",  // Comparative
  "trough",  // Adjective
  "capsular",  // Adjective
  "handheld",  // PastTense
  "chromatid",  // Adjective
  "résumé",  // Verb
  "creosote",  // Infinitive
  "gelatin",  // Gerund
  "spoke",  // PastTense
  "banknote",  // Infinitive
  "crucible",  // Adjective
  "gluten",  // Participle
  "prostitute",  // Infinitive
  "premises",  // PresentTense
  "thinner",  // Comparative
  "bout",  // Preposition
  "misc",  // Abbreviation
  "reformer",  // Adjective
  "anecdote",  // Infinitive
  "five",  // TextValue
  "antifreeze",  // Infinitive
  "lethargy",  // Adjective
  "ninety",  // TextValue
  "necropsy",  // Adjective
  "valueadded",  // PastTense
  "metallurgy",  // Adjective
  "spat",  // PastTense
  "antidote",  // Infinitive
  "overcoat",  // Infinitive
  "vanilla",  // Adjective
  "trimmer",  // Comparative
  "exogamy",  // Adjective
  "seventy",  // TextValue
  "biotin",  // Gerund
  "eyelid",  // Adjective
  "eighty",  // TextValue
  "jute",  // Infinitive
  "isoniazid",  // Adjective
  "jetty",  // Adjective
  "goodbye",  // Expression
  "phospholipid",  // Adjective
  "amends",  // Verb
  "tungsten",  // Participle
  "chose",  // PastTense
  "début",  // Infinitive
  "disrepute",  // Infinitive
  "twenty",  // TextValue
  "sixty",  // TextValue
  "uncompetitive",  // Adjective
  "eight",  // TextValue
  "videotaped",  // PastTense
  "somatotropin",  // Gerund
  "antihypertensive",  // Adjective
  "chromatin",  // Gerund
  "narcolepsy",  // Adjective
  "couscous",  // Adjective
  "exemplar",  // Adjective
  "seedbed",  // PastTense
  "teens",  // Verb
  "escolar",  // Adjective
  "ferritin",  // Gerund
  "erythropoietin",  // Gerund
  "headphones",  // PresentTense
  "gonadotropin",  // Gerund
  "moped",  // PastTense
  "exposé",  // Infinitive
  "aramid",  // Adjective
  "flute",  // Infinitive
  "enroute",  // Infinitive
  "thirty",  // TextValue
  "breakeven",  // Participle
  "cellar",  // Adjective
  "fifty",  // TextValue
  "spirochete",  // Infinitive
  "zygote",  // Infinitive
  "maté",  // Infinitive
  "overbroad",  // Adjective
  "crossbones",  // PresentTense
  "billionth",  // Multiple
  "coyote",  // Infinitive
  "mummy",  // Adjective
  "greed",  // PastTense
  "chitin",  // Gerund
  "hotbed",  // PastTense
  "two",  // TextValue
  "unlit",  // PastTense
  "spermatid",  // Adjective
  "passthrough",  // Adjective
  "somatostatin",  // Gerund
  "platen",  // Participle
  "honors",  // Verb
  "reconvene",  // Infinitive
  "pâté",  // Infinitive
  "pinniped",  // PastTense
  "yearend",  // Verb
  "lupin",  // Gerund
  "burglar",  // Adjective
  "mandible",  // Adjective
  "trillion",  // Multiple
  "tummy",  // Adjective
  "lit",  // PastTense
  "chrysanthemum",  // Adjective
  "underlay",  // PastTense
  "puppy",  // Adjective
  "sweepstakes",  // PresentTense
  "riverbed",  // PastTense
  "came",  // PastTense
  "psyllid",  // Adjective
  "autoroute",  // Infinitive
  "headnote",  // Infinitive
  "lat",  // Abbreviation
  "featherbed",  // PastTense
  "avens",  // Verb
  "pairs",  // Verb
  "effigy",  // Adjective
  "generalist",  // Adjective
  "pastoralist",  // Adjective
  "naturalist",  // Adjective
]

let sty = [
  "majesty",  // Adjective
  "honesty",  // Adjective
  "dishonesty",  // Adjective
  "dynasty",  // Adjective
]

let ogy = [
  "analogy",  // Adjective
  "pedagogy",  // Adjective
  "genealogy",  // Adjective
  "trilogy",  // Adjective
  "mineralogy",  // Adjective
]


let ome = [
  "chromosome",  // Adjective
  "microsome",  // Adjective
  "ribosome",  // Adjective
  "lysosome",  // Adjective
]

let age = [
  "stage",  // Infinitive
  "percentage",  // Infinitive
  "shortage",  // Infinitive
  "voltage",  // Infinitive
  "postage",  // Infinitive
  "footage",  // Infinitive
  "pilotage",  // Infinitive
  "wastage",  // Infinitive
  "hostage",  // Infinitive
  "vantage",  // Infinitive
  "frontage",  // Infinitive
  "parentage",  // Infinitive
  "montage",  // Infinitive
  "cartage",  // Infinitive
]

let que = [
  "cheque",  // Adjective
  "plaque",  // Adjective
  "torque",  // Adjective
  "mosque",  // Adjective
  "marque",  // Adjective
  "cirque",  // Adjective
  "macaque",  // Adjective
  "baroque",  // Adjective
  "technique",  // Adjective
  "pratique",  // Adjective
  "physique",  // Adjective
  "boutique",  // Adjective
  "communique",  // Adjective
  "clique",  // Adjective
]

let ent = [
  "respondent",  // Adjective
  "extent",  // Adjective
  "ingredient",  // Adjective
  "intent",  // Adjective
  "incident",  // Adjective
  "talent",  // Adjective
  "coefficient",  // Adjective
  "reagent",  // Adjective
  "rodent",  // Adjective
  "precedent",  // Adjective
  "outpatient",  // Adjective
  "quotient",  // Adjective
  "excipient",  // Adjective
  "inpatient",  // Adjective
  "grandparent",  // Adjective
  "advent",  // Adjective
  "superintendent",  // Adjective
  "deterrent",  // Adjective
  "descent",  // Adjective
  "detergent",  // Adjective
  "micronutrient",  // Adjective
  "correspondent",  // Adjective
  "discontent",  // Adjective
  "macronutrient",  // Adjective
  "referent",  // Adjective
  "bioequivalent",  // Adjective
  "ascent",  // Adjective
  "stepparent",  // Adjective
  "decedent",  // Adjective
  "portent",  // Adjective
  "convent",  // Adjective
  "descendent",  // Adjective
]

let ique = [
]

let al = [
  "accrual",  // Adjective
  "mammal",  // Adjective
  "cereal",  // Adjective
  "scandal",  // Adjective
  "decal",  // Adjective
  "paraprofessional",  // Adjective
  "ordeal",  // Adjective
  "urinal",  // Adjective
  "sandal",  // Adjective
]
let ial = [
  "material",  // Adjective
  "denial",  // Adjective
  "burial",  // Adjective
  "biomaterial",  // Adjective
  "antibacterial",  // Adjective
  "noncommercial",  // Adjective
  "multinomial",  // Adjective

]

let ral = [
  "referral",  // Adjective
  "deferral",  // Adjective
  "multicultural",  // Adjective
  "chloral",  // Adjective
  "numeral",  // Adjective
  "mural",  // Adjective
  "infrastructural",  // Adjective
  "conferral",  // Adjective
  "secretarygeneral",  // Adjective
]
let tal = [
  "transmittal",  // Adjective
  "rebuttal",  // Adjective
  "acquittal",  // Adjective
  "petal",  // Adjective
  "phenobarbital",  // Adjective
  "recital",  // Adjective
  "nonfatal",  // Adjective
  "pedestal",  // Adjective
  "committal",  // Adjective
  "acetal",  // Adjective
]

let oid = [
  "steroid",  // Adjective
  "corticosteroid",  // Adjective
  "toxoid",  // Adjective
  "alkaloid",  // Adjective
  "asteroid",  // Adjective
  "solenoid",  // Adjective
  "carotenoid",  // Adjective
  "hemorrhoid",  // Adjective
  "centroid",  // Adjective
]

let rchy = [
  "hierarchy",  // Adjective
  "monarchy",  // Adjective
  "anarchy",  // Adjective
  "patriarchy",  // Adjective
]

let fer = [
  "golfer",  // Infinitive
  "surfer",  // Infinitive
  "staffer",  // Infinitive
  "sniffer",  // Infinitive
  "chafer",  // Infinitive
]
let ary = [
  "salary",  // Adjective
  "vocabulary",  // Adjective
  "dignitary",  // Adjective
  "notary",  // Adjective
  "missionary",  // Adjective
  "mandatary",  // Adjective
  "burglary",  // Adjective
  "granary",  // Adjective
  "functionary",  // Adjective
  "prothonotary",  // Adjective
]

let athy = [
  "neuropathy",  // Adjective
  "empathy",  // Adjective
  "sympathy",  // Adjective
  "apathy",  // Adjective
  "homeopathy",  // Adjective
  "naturopathy",  // Adjective
  "lymphadenopathy",  // Adjective
  "osteopathy",  // Adjective
  "psychopathy",  // Adjective
]

let ish = [
  "hashish",  // Adjective
  "yiddish",  // Adjective
  "horseradish",  // Adjective
]

let ise = [
  "expertise",  // Infinitive
  "premise",  // Infinitive
  "merchandise",  // Verb
  "demise",  // Infinitive
  "sunrise",  // Infinitive
  "anise",  // Infinitive
  "treatise",  // Infinitive
]

let ly = [
  "poly",  // Adverb
  "acromegaly",  // Adverb
  "whitefly",  // Adverb
  "sawfly",  // Adverb
  "oligopoly",  // Adverb
  "disassembly",  // Adverb
  "subassembly",  // Adverb
  "panoply",  // Adverb
  "duopoly",  // Adverb
  "blackfly",  // Adverb
  "firefly",  // Adverb
]

let rin = [
  "warfarin",  // Gerund
  "aspirin",  // Gerund
  "heparin",  // Gerund
  "nitroglycerin",  // Gerund
  "saccharin",  // Gerund
  "cephalosporin",  // Gerund
  "glycerin",  // Gerund
  "mandarin",  // Gerund
  "stearin",  // Gerund
  "bacterin",  // Gerund
  "coumarin",  // Gerund
]

let ing = [
  "living",  // Adjective
  "closing",  // Adjective
  "healing",  // Adjective
  "freezing",  // Adjective
  "swelling",  // Adjective
  "cheating",  // Adjective
  "blinding",  // Adjective
  "twisting",  // Adjective
]

let ian = [
  "veterinarian",  // Adjective
  "librarian",  // Adjective
  "historian",  // Adjective
  "calgarian",  // Adjective
  "rotarian",  // Adjective
  "communitarian",  // Adjective
  "valerian",  // Adjective
]

// ier
let ier = [
  "supplier",  // Comparative
  "identifier",  // Comparative
  "multiplier",  // Comparative
  "financier",  // Comparative
  "outlier",  // Comparative
  "photocopier",  // Comparative
  "dossier",  // Comparative
  "qualifier",  // Comparative
  "modifier",  // Comparative
  "pacifier",  // Comparative
  "humidifier",  // Comparative
  "amplifier",  // Comparative
  "verifier",  // Comparative
  "cashier",  // Comparative
  "notifier",  // Comparative
  "atelier",  // Comparative
  "copier",  // Comparative
  "skier",  // Comparative
  "purifier",  // Comparative
  "emulsifier",  // Comparative
  "drier",  // Comparative
  "certifier",  // Comparative
  "métier",  // Comparative
  "occupier",  // Comparative
  "cahier",  // Comparative
  "intensifier",  // Comparative
  "grenadier",  // Comparative
  "dehumidifier",  // Comparative
  "classifier",  // Comparative
  "clarifier",  // Comparative
  "plier",  // Comparative
  "magnifier",  // Comparative
  "hotelier",  // Comparative
  "gasifier",  // Comparative
  "haulier",  // Comparative
  "rectifier",  // Comparative
  "flier",  // Comparative
  "osier",  // Comparative
  "scarifier",  // Comparative
  "telecopier",  // Comparative
]

// -ist
let ist = [
  "pharmacist",  // Adjective
  "checklist",  // Adjective
  "dentist",  // Adjective
  "psychiatrist",  // Adjective
  "reservist",  // Adjective
  "panelist",  // Adjective
  "physiotherapist",  // Adjective
  "finalist",  // Adjective
  "chemist",  // Adjective
  "nutritionist",  // Adjective
  "antagonist",  // Adjective
  "waist",  // Adjective
  "protectionist",  // Adjective
  "lobbyist",  // Adjective
  "physicist",  // Adjective
  "optometrist",  // Adjective
  "agonist",  // Adjective
  "environmentalist",  // Adjective
  "geneticist",  // Adjective
  "archivist",  // Adjective
  "panellist",  // Adjective
  "ethicist",  // Adjective
  "jurist",  // Adjective
  "theorist",  // Adjective
  "hygienist",  // Adjective
  "monopolist",  // Adjective
  "conservationist",  // Adjective
  "separatist",  // Adjective
  "buddhist",  // Adjective
  "lyricist",  // Adjective
  "herbalist",  // Adjective
  "podiatrist",  // Adjective
  "colonist",  // Adjective
  "columnist",  // Adjective
  "humanist",  // Adjective
  "motorist",  // Adjective
  "agronomist",  // Adjective
  "loyalist",  // Adjective
  "biochemist",  // Adjective
  "internist",  // Adjective
  "anaesthetist",  // Adjective
  "linguist",  // Adjective
  "strategist",  // Adjective
  "novelist",  // Adjective
  "publicist",  // Adjective
  "synthesist",  // Adjective
  "optimist",  // Adjective
  "elitist",  // Adjective
  "florist",  // Adjective
  "reductionist",  // Adjective
  "allergist",  // Adjective
  "protagonist",  // Adjective
  "chartist",  // Adjective
  "machinist",  // Adjective
  "philanthropist",  // Adjective
  "orthodontist",  // Adjective
  "taxidermist",  // Adjective
  "pianist",  // Adjective
  "hairstylist",  // Adjective
  "medalist",  // Adjective
  "backlist",  // Adjective
  "soloist",  // Adjective
  "acupuncturist",  // Adjective
  "cartoonist",  // Adjective
  "collectivist",  // Adjective
  "botanist",  // Adjective
  "canoeist",  // Adjective
  "hobbyist",  // Adjective
  "bicyclist",  // Adjective
  "diarist",  // Adjective
  "integrationist",  // Adjective
  "tobacconist",  // Adjective
  "druggist",  // Adjective
  "individualist",  // Adjective
  "internationalist",  // Adjective
  "chiropodist",  // Adjective
  "geophysicist",  // Adjective
  "parachutist",  // Adjective
  "secessionist",  // Adjective
  "dramatist",  // Adjective
  "specialist",  // Adjective
  "industrialist",  // Adjective
  "generalist",
  "naturalist"
]

let able = [
  "vegetable",  // Adjective
  "timetable",  // Adjective
  "inflatable",  // Adjective
  "turntable",  // Adjective
  "syllable",  // Adjective
]
// -ite
let ite = [
  "website",  // Infinitive
  "metabolite",  // Infinitive
  "spite",  // Verb
  "parasite",  // Infinitive
  "respite",  // Infinitive
  "appetite",  // Infinitive
  "mite",  // Infinitive
  "plebiscite",  // Infinitive
  "nitrite",  // Infinitive
  "hypochlorite",  // Infinitive
  "chlorite",  // Infinitive
  "sulphite",  // Infinitive
  "graphite",  // Infinitive
  "campsite",  // Infinitive
  "vermiculite",  // Infinitive
  "dolomite",  // Infinitive
  "selenite",  // Infinitive
  "frostbite",  // Infinitive
  "rite",  // Infinitive
  "crocidolite",  // Infinitive
  "magnesite",  // Infinitive
  "bauxite",  // Infinitive
  "activite",  // Infinitive
  "arsenite",  // Infinitive
  "meteorite",  // Infinitive
  "bentonite",  // Infinitive
  "lignite",  // Infinitive
  "dynamite",  // Infinitive
  "ammonite",  // Infinitive
  "phosphite",  // Infinitive
  "urbanite",  // Infinitive
  "cristobalite",  // Infinitive
  "termite",  // Infinitive
  "gibbsite",  // Infinitive
  "malachite",  // Infinitive
  "pyrite",  // Infinitive
  "dendrite",  // Infinitive
  "cryolite",  // Infinitive
  "bisulfite",  // Infinitive
  "perquisite",  // Infinitive
  "trophozoite",  // Infinitive
  "sporozoite",  // Infinitive
  "perlite",  // Infinitive
  "quartzite",  // Infinitive
  "ferrite",  // Infinitive
  "chromite",  // Infinitive
  "halite",  // Infinitive
  "barite",  // Infinitive
  "tremolite",  // Infinitive
  "sylvite",  // Infinitive
  "cerussite",  // Infinitive
  "opportunite",  // Infinitive
]

// -ic
let ic = [
  "characteristic",  // Adjective
  "topic",  // Adjective
  "statistic",  // Adjective
  "ethic",  // Adjective
  "fabric",  // Adjective
  "informatic",  // Adjective
  "garlic",  // Adjective
  "tactic",  // Adjective
  "critic",  // Adjective
  "physic",  // Adjective
  "bioethic",  // Adjective
  "rhetoric",  // Adjective
  "telematic",  // Adjective
  "picnic",  // Adjective
  "anthelmintic",  // Adjective
  "epic",  // Adjective
  "colic",  // Adjective
  "workaholic",  // Adjective
  "biomechanic",  // Adjective
  "asiapacific",  // Adjective
  "piezoelectric",  // Adjective
  "tunic",  // Adjective
  "mastic",  // Adjective
  "cynic",  // Adjective
  "medic",  // Adjective
  "syndic",  // Adjective
  "cleric",  // Adjective
]
// -ate
let ate = [
  "rate",  // Verb
  "climate",  // Infinitive
  "candidate",  // Infinitive
  "certificate",  // Infinitive
  "rebate",  // Infinitive
  "template",  // Infinitive
  "inmate",  // Infinitive
  "sulphate",  // Infinitive
  "phosphate",  // Infinitive
  "prostate",  // Infinitive
  "nitrate",  // Infinitive
  "acetate",  // Infinitive
  "substrate",  // Infinitive
  "consulate",  // Infinitive
  "carbohydrate",  // Infinitive
  "hydrate",  // Infinitive
  "sulfate",  // Infinitive
  "bromate",  // Infinitive
  "doctorate",  // Infinitive
  "primate",  // Infinitive
  "citrate",  // Infinitive
  "xanthate",  // Infinitive
  "electorate",  // Infinitive
  "conglomerate",  // Infinitive
  "frigate",  // Infinitive
  "neonate",  // Infinitive
  "nameplate",  // Infinitive
  "chlorate",  // Infinitive
  "bicarbonate",  // Infinitive
  "monohydrate",  // Infinitive
  "silicate",  // Infinitive
  "baccalaureate",  // Infinitive
  "benzoate",  // Infinitive
  "distillate",  // Infinitive
  "salicylate",  // Infinitive
  "methacrylate",  // Infinitive
  "palate",  // Infinitive
  "glutamate",  // Infinitive
  "perchlorate",  // Infinitive
  "condensate",  // Infinitive
  "carbamate",  // Infinitive
  "succinate",  // Infinitive
  "stearate",  // Infinitive
  "oxalate",  // Infinitive
  "homogenate",  // Infinitive
  "tartrate",  // Infinitive
  "methotrexate",  // Infinitive
  "propionate",  // Infinitive
  "maleate",  // Infinitive
  "orthophosphate",  // Infinitive
  "barbiturate",  // Infinitive
  "chromate",  // Infinitive
  "malate",  // Infinitive
  "classmate",  // Infinitive
  "laureate",  // Infinitive
  "filtrate",  // Infinitive
  "palmitate",  // Infinitive
  "permanganate",  // Infinitive
  "arsenate",  // Infinitive
  "sultanate",  // Infinitive
  "hydrolysate",  // Infinitive
  "formate",  // Infinitive
  "thiosulphate",  // Infinitive
  "carboxylate",  // Infinitive
  "isocyanate",  // Infinitive
  "alginate",  // Infinitive
  "intercorporate",  // Infinitive
  "teammate",  // Infinitive
  "roommate",  // Infinitive
  "superphosphate",  // Infinitive
  "flowrate",  // Infinitive
  "dichromate",  // Infinitive
  "oleate",  // Infinitive
  "tailgate",  // Infinitive
  "dimenhydrinate",  // Infinitive
  "birthrate",  // Infinitive
  "hemihydrate",  // Infinitive
  "butyrate",  // Infinitive
  "spate",  // Infinitive
  "hexahydrate",  // Infinitive
  "ungulate",  // Infinitive
  "muriate",  // Infinitive
  "borosilicate",  // Infinitive
  "microclimate",  // Infinitive
  "iodate",  // Infinitive
  "multistate",  // Infinitive
  "thiocyanate",  // Infinitive
  "birthdate",  // Infinitive
  "phosphorothioate",  // Infinitive
  "selenate",  // Infinitive
  "bitartrate",  // Infinitive
  "trihydrate",  // Infinitive
  "pyrophosphate",  // Infinitive
  "pectate",  // Infinitive
  "schoolmate",  // Infinitive
  "licentiate",  // Infinitive
  "aluminate",  // Infinitive
  "floodgate",  // Infinitive
  "cyanate",  // Infinitive
  "emirate",  // Infinitive
  "climate",  // Infinitive
]

let pos = '#Noun'
arr.forEach(txt => {
  let doc = nlp(txt)
  if (!doc.has(pos)) {
    let tags = doc.json({ tagRank: true })[0].terms[0].tags
    console.log(`"${w}",  //`, tags[0])
  }
})