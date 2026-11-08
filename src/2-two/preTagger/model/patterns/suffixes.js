import { Last, Sing, NN, Adj, Adv, Vb, Past, Mod, Cop, Inf, Ger, Pres, Participle, Place, Plur, Actor, Ord, Prop, Val } from '../../tagSet/_lib.js'
//just a foolish lookup of known suffixes, by tag
const byTag = {
  [Last]: "ov ez ev sen vic nen ova akis chuk czyk enko sson marek auskas opoulos sdottir",
  [Sing]: "ea rol sis ogy oid ian ield iend ette iary wner tion ique vice lier fier gent lite site rite mite bite mate date ndal vent note cide ence holic phite osome tment ndent scent rient dient parent cedent ionary cklist",
  [NN]: "ia eer ger ber ton tage tors dorf esty ology archy pathy opoly embly phate worth",
  [Adj]: "ic azy ffy lar mum nny ous que ful bal mned gone less llen made some tive wide iant nary ghty uent ggly bbly zzly bound rough iable borne gnant inant igent atory",
  [Adv]: "ly fore fully wards where",
  [Vb]: "'n 't end ends",
  [Past]: "oed ued xed ped eld amed aped ched lked rked reed nded cted dged wned tized urned eased",
  [Mod]: "'ll ould",
  [Cop]: "'re",
  [Inf]: "ify ize ibe ect ict ign oze cede gate ruct vide ract duce pose eive lyze lyse ounce",
  [Ger]: "ing",
  [Pres]: "zes ects fies poses ishes tches",
  [Participle]: "ken ven ten",
  [Place]: "pur bury wych dale folk vale abad sham wick burgh mouth ceter ville hurst stead endon brook shire ridge brooke brough cester ington cliffe ingham chester borough",
  [Plur]: "ices ints ines ions ners pers lers ians ances ettes ities ports tures",
  [Actor]: "tist pist rist mist yist vist ists uist gist erer elist onist anist alist olist icist maker keeper logist worker master writer logists",
  [Ord]: "tieth",
  [Prop]: "field",
  [Val]: "teenth",
}

// index them by length - 'ful' lives in suffixes[3]
const suffixes = [null, null, {}, {}, {}, {}, {}, {}]
Object.keys(byTag).forEach(tag => {
  byTag[tag].split(' ').forEach(suffix => {
    suffixes[suffix.length][suffix] = tag
  })
})
// the only suffix with a space
suffixes[3][' so'] = Adv
export default suffixes
