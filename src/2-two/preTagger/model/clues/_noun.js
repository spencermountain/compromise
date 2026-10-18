import tagWords from '../_lib.js'
import tags from '../../tagSet/aliases.js'

const { Sing: n } = tags
export default {
  beforeTags: {
    Determiner: n, //the date
    Possessive: n, //his date
    Acronym: n, //u.s. state
    // ProperNoun:n,
    Noun: n, //nasa funding
    Adjective: n, //whole bottles
    // Verb:true, //save storm victims
    PresentTense: n, //loves hiking
    Gerund: n, //uplifting victims
    PastTense: n, //saved storm victims
    Infinitive: n, //profess love
    Date: n, //9pm show
    Ordinal: n, //first date
    Demonym: n, //dutch map
  },
  afterTags: {
    Value: n, //date nine  -?
    Modal: n, //date would
    Copula: n, //fear is
    PresentTense: n, //babysitting sucks
    PastTense: n, //babysitting sucked
    // Noun:n, //talking therapy, planning process
    Demonym: n, //american touch
    Actor: n, //dance therapist
  },
  // ownTags: { ProperNoun: n },
  beforeWords: {
    the: n, //the brands
    with: n, //with cakes
    without: n, //
    // was:n, //was time  -- was working
    // is:n, //
    // of power; for rats; any rats; all tips; on time
    ...tagWords('of for any all on', n),
    // thing-ish verbs
    // cut spending; cut spending; increase funding
    ...tagWords('cut cuts increase decrease raise drop', n),
    // give: n,//give parents
    // minus laughing; more than age; about claims
    ...tagWords('save saved saves make makes made minus plus than another versus neither about', n),
    // strong adjectives
    // no worries; more details; one flood; let fear; her boots
    ...tagWords(
      'favorite best daily weekly linear binary mobile lexical technical computer scientific ' +
      'security government popular formal no more one let her his their our',
      n
    ),
    // us: n, //served us drinks
    sheer: n,

    ...tagWords(
      'monthly yearly current previous upcoming last next main initial final beginning end top ' +
      'bottom future past major minor side central peripheral public private',
      n
    ),
  },
  afterWords: tagWords(
    // date of birth (preposition); parents can; service-wise
    // they: n,//snakes they
    'of system aid method utility tool reform therapy philosophy room authority says said wants ' +
      'wanted is did do can wise', n,
  ),
}
