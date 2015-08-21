//these are common word shortenings used in the lexicon and sentence segmentation methods
//there are all nouns, or at the least, belong beside one.

//stored seperately, for 'noun.is_person()'
import honourifics = require("./honourifics")

const abbr = [
//common abbreviations
  "arc", "al", "ave", "blvd", "cl", "ct", "cres", "exp", "rd", "st", "dist", "mt", "fy", "hwy", "pd", "pl", "plz", "tce", "llb", "md", "bl", "ma", "ba", "lit",
//place main - states
  "ala", "ariz", "ark", "cal", "calif", "col", "colo", "conn", "del", "fed", "fla", "fl", "ga", "ida", "ind", "ia", "la", "kan", "kans", "ken", "ky", "la", "md", "mich", "minn", "mont", "neb", "nebr", "nev", "okla", "penna", "penn", "pa", "dak", "tenn", "tex", "ut", "vt", "va", "wash", "wis", "wisc", "wy", "wyo", "usafa", "alta",
//place main - provinces ISO 3166-2:CA
  "ab", "bc", "mb", "nb", "nl", "ns", "nt", "nu", "on", "pe", "qc", "sk", "yt", "ont", "que", "sask", "yuk"
//org main
  "dept", "univ", "assn", "bros", "inc", "ltd", "co", "corp",
//proper nouns with exclamation marks
  "yahoo", "joomla", "jeopardy"
]
//person titles like 'jr', (stored seperately)
abbr = abbr.concat(honourifics)

module.exports = abbr;
