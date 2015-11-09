(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//these are common word shortenings used in the lexicon and sentence segmentation methods
//there are all nouns, or at the least, belong beside one.
'use strict';
const honourifics = require('./honourifics'); //stored seperately, for 'noun.is_person()'

//common abbreviations
let main = [
  'arc', 'al', 'exp', 'rd', 'st', 'dist', 'mt', 'fy', 'pd', 'pl', 'plz', 'tce', 'llb', 'md', 'bl', 'ma', 'ba', 'lit',
  'ex', 'eg', 'ie', 'circa', 'ca', 'cca', 'vs', 'etc', 'esp', 'ft', 'bc', 'ad'
];

//person titles like 'jr', (stored seperately)
main = main.concat(honourifics);

//org main
let orgs = [
  'dept', 'univ', 'assn', 'bros', 'inc', 'ltd', 'co', 'corp',
  //proper nouns with exclamation marks
  'yahoo', 'joomla', 'jeopardy'
];
main = main.concat(orgs);

//place main
let places = [
  'ala', 'ariz', 'ark', 'cal', 'calif', 'col', 'colo', 'conn', 'del', 'fed', 'fla', 'fl', 'ga', 'ida', 'ind', 'ia', 'la', 'kan', 'kans', 'ken', 'ky', 'la', 'md', 'mich', 'minn', 'mont', 'neb', 'nebr', 'nev', 'okla', 'penna', 'penn', 'pa', 'dak', 'tenn', 'tex', 'ut', 'vt', 'va', 'wash', 'wis', 'wisc', 'wy', 'wyo', 'usafa', 'alta', 'ont', 'que', 'sask', 'yuk',
  'ave', 'blvd', 'cl', 'ct', 'cres', 'hwy'
];
main = main.concat(places);

//date abbrevs.
//these are added seperately because they are not nouns
let dates = ['jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'sept', 'sep'];
main = main.concat(dates);

module.exports = {
  abbreviations: main,
  dates: dates,
  orgs: orgs,
  places: places
};

},{"./honourifics":7}],2:[function(require,module,exports){
//adjectives that either aren't covered by rules, or have superlative/comparative forms
//this list is the seed, from which various forms are conjugated
module.exports = [
  'aberrant',
  'ablaze',
  'able',
  'aboard',
  'above',
  'abrupt',
  'absent',
  'absolute',
  'absorbing',
  'abstract',
  'abundant',
  'accurate',
  'actual',
  'acute',
  'cute',
  'adept',
  'adequate',
  'adult',
  'advanced',
  'adverse',
  'afraid',
  'against',
  'agonizing',
  'ahead',
  'alarming',
  'alcoholic',
  'all',
  'aloof',
  'amazing',
  'antiquated',
  'apparent',
  'appetizing',
  'appropriate',
  'apt',
  'arab',
  'arbitrary',
  'arrogant',
  'artificial',
  'asleep',
  'astonishing',
  'authentic',
  'average',
  'awake',
  'aware',
  'awkward',
  'back',
  'backwards',
  'bad',
  'bald',
  'bankrupt',
  'barren',
  'bawdy',
  'behind',
  'beloved',
  'beneficial',
  'bent',
  'best',
  'better',
  'beyond',
  'bizarre',
  'bland',
  'blank',
  'blind',
  'blond',
  'bloody',
  'bogus',
  'bold',
  'bottom',
  'bouncy',
  'brilliant',
  'brisk',
  'broken',
  'burly',
  'busy',
  'cagey',
  'calming',
  'careful',
  'caring',
  'certain',
  'cheesy',
  'chief',
  'chilly',
  'civil',
  'clever',
  'closed',
  'cloudy',
  'colonial',
  'colossal',
  'commercial',
  'common',
  'complete',
  'complex',
  'concerned',
  'concrete',
  'congruent',
  'constant',
  'contemporary',
  'contrary',
  'cooing',
  'correct',
  'corrupt',
  'costly',
  'covert',
  'cowardly',
  'cozy',
  'cramped',
  'craven',
  'crazed',
  'crisp',
  'crowded',
  'crucial',
  'cuddly',
  'daily',
  'damaged',
  'damaging',
  'danish',
  'dapper',
  'dashing',
  'deadpan',
  'deaf',
  'deeply',
  'defiant',
  'degenerate',
  'deliberate',
  'delicate',
  'delightful',
  'dense',
  'deranged',
  'desperate',
  'detailed',
  'determined',
  'devout',
  'didactic',
  'difficult',
  'dire',
  'discreet',
  'diseased',
  'disgruntled',
  'dishonest',
  'disorderly',
  'distant',
  'distressed',
  'diverse',
  'divine',
  'dominant',
  'done',
  'double',
  'doubtful',
  'downtown',
  'dreary',
  'due',
  'dumb',
  'earthly',
  'east',
  'eastern',
  'easygoing',
  'eerie',
  'elaborate',
  'elderly',
  'elegant',
  'elite',
  'eminent',
  'encouraging',
  'entire',
  'erect',
  'essential',
  'ethereal',
  'everyday',
  'evil',
  'exact',
  'excess',
  'expected',
  'expert',
  'extra',
  'extravagant',
  'exuberant',
  'exultant',
  'fabled',
  'fake',
  'false',
  'fancy',
  'far',
  'far-reaching',
  'faulty',
  'faux',
  'favorite',
  'female',
  'feminine',
  'fertile',
  'fierce ',
  'financial',
  'finite',
  'first',
  'fit',
  'fixed',
  'flagrant',
  'fluent',
  'foamy',
  'foolish',
  'foregoing',
  'foreign',
  'former',
  'fortunate',
  'foul',
  'frantic',
  'freezing',
  'frequent',
  'fretful',
  'friendly',
  'friendly',
  'fun',
  'furry',
  'future',
  'gainful',
  'gaudy',
  'gay',
  'generic',
  'genuine',
  'ghastly',
  'ghostly',
  'giant',
  'giddy',
  'gigantic',
  'gleaming',
  'global',
  'gloomy',
  'gold',
  'gone',
  'good',
  'goofy',
  'graceful',
  'grateful',
  'gratis',
  'gray',
  'grey',
  'grisly',
  'groovy',
  'gross',
  'guarded',
  'half',
  'hallowed',
  'handy',
  'hanging',
  'harrowing',
  'hateful',
  'heady',
  'heavenly',
  'hefty',
  'hellish',
  'helpful',
  'hesitant',
  'highfalutin',
  'hilly',
  'hispanic',
  'homely',
  'honest',
  'hooked',
  'horrific',
  'hostile',
  'hourly',
  'huge',
  'humble',
  'humdrum',
  'humid',
  'hurried',
  'hurt',
  'icy',
  'ideal',
  'ignorant',
  'ill',
  'illegal',
  'immediate',
  'immense',
  'imminent',
  'impartial',
  'imperfect',
  'imported',
  'improper',
  'inadequate',
  'inappropriate',
  'inbred',
  'incorrect',
  'indirect',
  'indoor',
  'influential',
  'initial',
  'innate',
  'inner',
  'insane',
  'insecure',
  'inside',
  'instant',
  'intact',
  'intense',
  'intermediate',
  'intimate',
  'intoxicated',
  'irate',
  'irrelevant',
  'jagged',
  'jolly',
  'juicy',
  'junior',
  'justified',
  'juvenile',
  'kaput',
  'kindly',
  'knowing',
  'labored',
  'languid',
  'last',
  'latter',
  'lax',
  'learned',
  'left',
  'left-wing',
  'legal',
  'legendary',
  'legitimate',
  'less',
  'lethal',
  'level',
  'lewd',
  'likely',
  'limited',
  'literal',
  'literate',
  'lively',
  'living',
  'lofty',
  'lonely',
  'longing',
  'lousy',
  'loutish',
  'lovely',
  'loving',
  'lowly',
  'loyal',
  'luxuriant',
  'lying',
  'macabre',
  'madly',
  'magenta',
  'main',
  'major',
  'makeshift',
  'male',
  'malignant',
  'mammoth',
  'many',
  'masculine',
  'measly',
  'meaty',
  'medium',
  'melancholy',
  'menacing',
  'mere',
  'middle',
  'mild',
  'miniature',
  'minor',
  'miscreant',
  'mixed',
  'mobile',
  'moderate',
  'moldy',
  'monthly',
  'moody',
  'moot',
  'most',
  'multiple',
  'mute',
  'naive',
  'naked',
  'nearby',
  'necessary',
  'neighborly',
  'next',
  'nightly',
  'nimble',
  'noble',
  'nonchalant',
  'nondescript',
  'nonstop',
  'north',
  'northern',
  'nosy',
  'nuanced',
  'obeisant',
  'obese',
  'obscene',
  'obscure',
  'observant',
  'obsolete',
  'offbeat',
  'official',
  'oily',
  'ok',
  'okay',
  'ongoing',
  'only',
  'open',
  'opposite',
  'organic',
  'other',
  'outdoor',
  'outer',
  'outgoing',
  'outside',
  'oval',
  'over',
  'overall',
  'overnight',
  'overt',
  'overweight',
  'overwrought',
  'painful',
  'paralleled',
  'part-time',
  'partial',
  'past',
  'peaceful',
  'perfect',
  'permanent',
  'perplexing',
  'perverse',
  'petite',
  'phony',
  'picayune',
  'placid',
  'plant',
  'pleasant',
  'polite',
  'populist',
  'potential',
  'precise',
  'pregnant',
  'premature',
  'premium',
  'present',
  'pricey',
  'prickly',
  'primary',
  'prime',
  'prior',
  'pristine',
  'private',
  'pro',
  'probable',
  'profound',
  'profuse',
  'prominent',
  'proper',
  'public',
  'pumped',
  'puny',
  'quack',
  'quaint',
  'quickest',
  'rabid',
  'racial',
  'racist',
  'ragged',
  'random',
  'ready',
  'real',
  'rear',
  'rebel',
  'recondite',
  'redundant',
  'refreshing',
  'relevant',
  'reluctant',
  'remote',
  'republican',
  'resistant',
  'resolute',
  'resonant',
  'retarded',
  'right',
  'right-wing',
  'rightful',
  'ritzy',
  'rival',
  'robust',
  'romantic',
  'roomy',
  'rosy',
  'rough',
  'routine',
  'royal',
  'sacred',
  'saintly',
  'salty',
  'same',
  'savvy',
  'scary',
  'scathing',
  'scientific',
  'screeching',
  'second',
  'secondary',
  'secret',
  'secure',
  'sedate',
  'seemly',
  'self-loathing',
  'selfish',
  'senior',
  'separate',
  'serene',
  'severe',
  'sexy',
  'shady',
  'shameful',
  'sheer',
  'shiny',
  'shocking',
  'shut',
  'shy',
  'sick',
  'significant',
  'silly',
  'sincere',
  'single',
  'skinny',
  'sleek',
  'slender',
  'slick',
  'slight',
  'slimy',
  'sly',
  'smelly',
  'smug',
  'snobbish',
  'social',
  'sole',
  'solemn',
  'somber',
  'soothing',
  'sophisticated',
  'sordid',
  'sorry',
  'south',
  'southern',
  'soviet',
  'spare',
  'special',
  'specific',
  'spicy',
  'spirited',
  'splendid',
  'sprightly',
  'squeamish',
  'standard',
  'standing',
  'stark',
  'steadfast',
  'steady',
  'stereotyped',
  'stern',
  'still',
  'straightforward',
  'striped',
  'stupid',
  'sturdy',
  'stylish',
  'subdued',
  'subsequent',
  'substantial',
  'subtle',
  'sudden',
  'super',
  'superb',
  'superficial',
  'superior',
  'supreme',
  'sure',
  'surprising',
  'surreal',
  'symbolic',
  'taboo',
  'talented',
  'tan',
  'tasteful',
  'tawdry',
  'teenage',
  'telling',
  'temporary',
  'terrific',
  'tested',
  'thoughtful',
  'tidy',
  'timely',
  'tiny',
  'together',
  'top',
  'torpid',
  'tranquil',
  'trendy',
  'trite',
  'troubled',
  'twin',
  'ugly',
  'ultimate',
  'ultra',
  'unappealing',
  'unassuming',
  'unauthorized',
  'unbecoming',
  'unconvincing',
  'undecided',
  'under',
  'underground',
  'understood',
  'unending',
  'uneven',
  'unexpected',
  'unfair',
  'universal',
  'unknown',
  'unlikely',
  'unprecedented',
  'unpublished',
  'unrecognized',
  'unregulated',
  'unrelated',
  'unruly',
  'unsightly',
  'unsupervised',
  'unsuspecting',
  'untidy',
  'unwieldy',
  'unwritten',
  'upbeat',
  'upcoming',
  'upper',
  'uppity',
  'upscale',
  'upset',
  'upstairs',
  'uptight',
  'urban',
  'used',
  'useful',
  'usual',
  'utter',
  'uttermost',
  'vacant',
  'vagabond',
  'vain',
  'vanilla',
  'various',
  'vengeful',
  'verdant',
  'vexing',
  'vibrant',
  'violet',
  'volatile',
  'wanting',
  'warped',
  'wary',
  'wasteful',
  'weary',
  'weekly',
  'welcome',
  'western',
  'whole',
  'wholesale',
  'wicked',
  'widespread',
  'wily',
  'wiry',
  'wistful',
  'womanly',
  'wooden',
  'woozy',
  'wound',
  'wrong',
  'wry',
  'yearly',
  'zany'
];

},{}],3:[function(require,module,exports){
//these are adjectives that can become comparative + superlative with out "most/more"
//its a whitelist for conjugation
//this data is shared between comparative/superlative methods
module.exports = [
  'absurd',
  'aggressive',
  'alert',
  'alive',
  'awesome',
  'beautiful',
  'big',
  'bitter',
  'black',
  'blue',
  'bored',
  'boring',
  'brash',
  'brave',
  'brief',
  'bright',
  'broad',
  'brown',
  'calm',
  'charming',
  'cheap',
  'clean',
  'cold',
  'cool',
  'cruel',
  'cute',
  'damp',
  'deep',
  'dear',
  'dead',
  'dark',
  'dirty',
  'drunk',
  'dull',
  'eager',
  'efficient',
  'even',
  'faint',
  'fair',
  'fanc',
  'fast',
  'fat',
  'feeble',
  'few',
  'fierce',
  'fine',
  'flat',
  'forgetful',
  'frail',
  'full',
  'gentle',
  'glib',
  'great',
  'green',
  'gruesome',
  'handsome',
  'hard',
  'harsh',
  'high',
  'hollow',
  'hot',
  'impolite',
  'innocent',
  'keen',
  'kind',
  'lame',
  'lean',
  'light',
  'little',
  'loose',
  'long',
  'loud',
  'low',
  'lush',
  'macho',
  'mean',
  'meek',
  'mellow',
  'mundane',
  'near',
  'neat',
  'new',
  'nice',
  'normal',
  'odd',
  'old',
  'pale',
  'pink',
  'plain',
  'poor',
  'proud',
  'purple',
  'quick',
  'rare',
  'rapid',
  'red',
  'rich',
  'ripe',
  'rotten',
  'round',
  'rude',
  'sad',
  'safe',
  'scarce',
  'scared',
  'shallow',
  'sharp',
  'short',
  'shrill',
  'simple',
  'slim',
  'slow',
  'small',
  'smart',
  'smooth',
  'soft',
  'sore',
  'sour',
  'square',
  'stale',
  'steep',
  'stiff',
  'straight',
  'strange',
  'strong',
  'sweet',
  'swift',
  'tall',
  'tame',
  'tart',
  'tender',
  'tense',
  'thick',
  'thin',
  'tight',
  'tough',
  'vague',
  'vast',
  'vulgar',
  'warm',
  'weak',
  'wet',
  'white',
  'wide',
  'wild',
  'wise',
  'young',
  'yellow',
  'easy',
  'narrow',
  'late',
  'early',
  'soon',
  'close',
  'empty',
  'dry',
  'windy',
  'noisy',
  'thirsty',
  'hungry',
  'fresh',
  'quiet',
  'clear',
  'heavy',
  'happy',
  'funny',
  'lucky',
  'pretty',
  'important',
  'interesting',
  'attractive',
  'dangerous',
  'intellegent',
  'pure',
  'orange',
  'large',
  'firm',
  'grand',
  'formal',
  'raw',
  'weird',
  'glad',
  'mad',
  'strict',
  'tired',
  'solid',
  'extreme',
  'mature',
  'true',
  'free',
  'curly',
  'angry'
].reduce(function(h, s) {
  h[s] = 'Adjective';
  return h;
}, {});

},{}],4:[function(require,module,exports){
//terms that are "CD", a 'value' term
module.exports = [
  //months
  'january',
  'february',
  // "march",
  'april',
  // "may",
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
  'jan',
  'feb',
  'mar',
  'apr',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
  'sept',
  'sep',
  //days
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
  'mon',
  'tues',
  'wed',
  'thurs',
  'fri',
  'sat',
  'sun'
];

},{}],5:[function(require,module,exports){
//adjectival forms of place names, as adjectives.
module.exports = [
  'afghan',
  'albanian',
  'algerian',
  'argentine',
  'armenian',
  'australian',
  'aussie',
  'austrian',
  'bangladeshi',
  'belgian',
  'bolivian',
  'bosnian',
  'brazilian',
  'bulgarian',
  'cambodian',
  'canadian',
  'chilean',
  'chinese',
  'colombian',
  'croat',
  'cuban',
  'czech',
  'dominican',
  'egyptian',
  'british',
  'estonian',
  'ethiopian',
  'finnish',
  'french',
  'gambian',
  'georgian',
  'german',
  'greek',
  'haitian',
  'hungarian',
  'indian',
  'indonesian',
  'iranian',
  'iraqi',
  'irish',
  'israeli',
  'italian',
  'jamaican',
  'japanese',
  'jordanian',
  'kenyan',
  'korean',
  'kuwaiti',
  'latvian',
  'lebanese',
  'liberian',
  'libyan',
  'lithuanian',
  'macedonian',
  'malaysian',
  'mexican',
  'mongolian',
  'moroccan',
  'dutch',
  'nicaraguan',
  'nigerian',
  'norwegian',
  'omani',
  'pakistani',
  'palestinian',
  'filipino',
  'polish',
  'portuguese',
  'qatari',
  'romanian',
  'russian',
  'rwandan',
  'samoan',
  'saudi',
  'scottish',
  'senegalese',
  'serbian',
  'singaporean',
  'slovak',
  'somali',
  'sudanese',
  'swedish',
  'swiss',
  'syrian',
  'taiwanese',
  'thai',
  'tunisian',
  'ugandan',
  'ukrainian',
  'american',
  'hindi',
  'spanish',
  'venezuelan',
  'vietnamese',
  'welsh',
  'african',
  'european',
  'asian',
  'californian',
];

},{}],6:[function(require,module,exports){
// common first-names in compressed form.
//from http://www.ssa.gov/oact/babynames/limits.html  and http://www.servicealberta.gov.ab.ca/pdf/vs/2001_Boys.pdf
//not sure what regional/cultural/demographic bias this has. Probably a lot.
// 73% of people are represented in the top 1000 names
//used to reduce redundant named-entities in longer text. (don't spot the same person twice.)
//used to identify gender for coreference resolution
'use strict';
const main = [];

//an ad-hoc prefix encoding for names. 2ms decompression of names
const male_names = {
  'will': 'iam,ie,ard,is,iams',
  'fred': ',erick,die,rick,dy',
  'marc': 'us,,o,os,el',
  'darr': 'ell,yl,en,el,in',
  'fran': 'k,cis,cisco,klin,kie',
  'terr': 'y,ance,ence,ell',
  'rand': 'y,all,olph,al',
  'brad': 'ley,,ford,y',
  'jeff': 'rey,,ery,ry',
  'john': ',ny,nie,athan',
  'greg': 'ory,,g,orio',
  'mar': 'k,tin,vin,io,shall,ty,lon,lin',
  'car': 'l,los,lton,roll,y,ey',
  'ken': 'neth,,t,ny,dall,drick',
  'har': 'old,ry,vey,ley,lan,rison',
  'ste': 'ven,phen,ve,wart,phan,rling',
  'jer': 'ry,emy,ome,emiah,maine,ald',
  'mic': 'hael,heal,ah,key,hel',
  'dar': 'yl,in,nell,win,ius',
  'dan': 'iel,ny,,e',
  'wil': 'bur,son,bert,fred,fredo',
  'ric': 'hard,ky,ardo,k,key',
  'cli': 'fford,nton,fton,nt,ff',
  'cla': 'rence,ude,yton,rk,y',
  'ben': 'jamin,,nie,ny,ito',
  'rod': 'ney,erick,olfo,ger,',
  'rob': 'ert,erto,bie,',
  'gar': 'y,ry,rett,land',
  'sam': 'uel,,my,mie',
  'and': 'rew,re,y,res',
  'jos': 'eph,e,hua,h',
  'joe': ',l,y,sph',
  'leo': 'nard,n,,nardo',
  'tom': ',my,as,mie',
  'bry': 'an,ant,ce,on',
  'ant': 'hony,onio,oine,on',
  'jac': 'k,ob,kson',
  'cha': 'rles,d,rlie,se',
  'sha': 'wn,ne,un',
  'bre': 'nt,tt,ndan,t',
  'jes': 'se,us,s',
  'al': 'bert,an,len,fred,exander,ex,vin,lan,fredo,berto,ejandro,fonso,ton,,onzo,i,varo',
  'ro': 'nald,ger,y,nnie,land,n,ss,osevelt,gelio,lando,man,cky,yce,scoe,ry',
  'de': 'nnis,rek,an,rrick,lbert,vin,wey,xter,wayne,metrius,nis,smond',
  'ja': 'mes,son,y,red,vier,ke,sper,mal,rrod',
  'el': 'mer,lis,bert,ias,ijah,don,i,ton,liot,liott,vin,wood',
  'ma': 'tthew,nuel,urice,thew,x,tt,lcolm,ck,son',
  'do': 'nald,uglas,n,nnie,ug,minic,yle,mingo,minick',
  'er': 'ic,nest,ik,nesto,ick,vin,nie,win',
  'ra': 'ymond,lph,y,mon,fael,ul,miro,phael',
  'ed': 'ward,win,die,gar,uardo,,mund,mond',
  'co': 'rey,ry,dy,lin,nrad,rnelius',
  'le': 'roy,wis,ster,land,vi',
  'lo': 'uis,nnie,renzo,ren,well,uie,u,gan',
  'da': 'vid,le,ve,mon,llas,mian,mien',
  'jo': 'nathan,n,rge,rdan,nathon,aquin',
  'ru': 'ssell,ben,dolph,dy,fus,ssel,sty',
  'ke': 'vin,ith,lvin,rmit',
  'ar': 'thur,nold,mando,turo,chie,mand',
  're': 'ginald,x,ynaldo,uben,ggie',
  'ge': 'orge,rald,ne,rard,offrey,rardo',
  'la': 'rry,wrence,nce,urence,mar,mont',
  'mo': 'rris,ses,nte,ises,nty',
  'ju': 'an,stin,lio,lian,lius,nior',
  'pe': 'ter,dro,rry,te,rcy',
  'tr': 'avis,oy,evor,ent',
  'he': 'nry,rbert,rman,ctor,ath',
  'no': 'rman,el,ah,lan,rbert',
  'em': 'anuel,il,ilio,mett,manuel',
  'wa': 'lter,yne,rren,llace,de',
  'mi': 'ke,guel,lton,tchell,les',
  'sa': 'lvador,lvatore,ntiago,ul,ntos',
  'ch': 'ristopher,ris,ester,ristian,uck',
  'pa': 'ul,trick,blo,t',
  'st': 'anley,uart,an',
  'hu': 'gh,bert,go,mberto',
  'br': 'ian,uce,andon,ain',
  'vi': 'ctor,ncent,rgil,cente',
  'ca': 'lvin,meron,leb',
  'gu': 'y,illermo,stavo',
  'lu': 'is,ther,ke,cas',
  'gr': 'ant,ady,over,aham',
  'ne': 'il,lson,al,d',
  't': 'homas,imothy,odd,ony,heodore,im,yler,ed,yrone,aylor,erence,immy,oby,eddy,yson',
  's': 'cott,ean,idney,ergio,eth,pencer,herman,ylvester,imon,heldon,cotty,olomon',
  'r': 'yan',
  'n': 'icholas,athan,athaniel,ick,icolas',
  'a': 'dam,aron,drian,ustin,ngelo,braham,mos,bel,gustin,ugust,dolfo',
  'b': 'illy,obby,arry,ernard,ill,ob,yron,lake,ert,oyd,illie,laine,art,uddy,urton',
  'e': 'ugene,arl,verett,nrique,van,arnest,frain,than,steban',
  'h': 'oward,omer,orace,ans,al',
  'p': 'hillip,hilip,reston,hil,ierre',
  'c': 'raig,urtis,lyde,ecil,esar,edric,leveland,urt',
  'j': 'immy,im,immie',
  'g': 'lenn,ordon,len,ilbert,abriel,ilberto',
  'm': 'elvin,yron,erle,urray',
  'k': 'yle,arl,urt,irk,ristopher',
  'o': 'scar,tis,liver,rlando,mar,wen,rville,tto',
  'l': 'loyd,yle,ionel',
  'f': 'loyd,ernando,elix,elipe,orrest,abian,idel',
  'w': 'esley,endell,m,oodrow,inston',
  'd': 'ustin,uane,wayne,wight,rew,ylan',
  'z': 'achary',
  'v': 'ernon,an,ance',
  'i': 'an,van,saac,ra,rving,smael,gnacio,rvin',
  'q': 'uentin,uinton',
  'x': 'avier'
};
const female_names = {
  'mari': 'a,e,lyn,an,anne,na,ssa,bel,sa,sol,tza',
  'kris': 'ten,tin,tina,ti,tine,ty,ta,tie',
  'jean': 'ette,ne,nette,nie,ine,nine',
  'chri': 'stine,stina,sty,stie,sta,sti',
  'marg': 'aret,ie,arita,uerite,ret,o',
  'ange': 'la,lica,lina,lia,line',
  'fran': 'ces,cine,cisca',
  'kath': 'leen,erine,y,ryn,arine',
  'sher': 'ry,ri,yl,i,rie',
  'caro': 'l,lyn,line,le,lina',
  'dian': 'e,a,ne,na',
  'jenn': 'ifer,ie,y,a',
  'luci': 'lle,a,nda,le',
  'kell': 'y,i,ey,ie',
  'rosa': ',lie,lind',
  'jani': 'ce,e,s,ne',
  'stac': 'y,ey,ie,i',
  'shel': 'ly,ley,ia',
  'laur': 'a,en,ie,el',
  'trac': 'y,ey,i,ie',
  'jane': 't,,lle,tte',
  'bett': 'y,ie,e,ye',
  'rose': 'mary,marie,tta',
  'joan': ',ne,n,na',
  'mar': 'y,tha,jorie,cia,lene,sha,yann,cella,ta,la,cy,tina',
  'lor': 'i,raine,etta,a,ena,ene,na,ie',
  'sha': 'ron,nnon,ri,wna,nna,na,una',
  'dor': 'othy,is,a,een,thy,othea',
  'cla': 'ra,udia,ire,rice,udette',
  'eli': 'zabeth,sa,sabeth,se,za',
  'kar': 'en,la,a,i,in',
  'tam': 'my,ara,i,mie,ika',
  'ann': 'a,,e,ie,ette',
  'car': 'men,rie,la,a,mela',
  'mel': 'issa,anie,inda',
  'ali': 'ce,cia,son,sha,sa',
  'bri': 'ttany,dget,ttney,dgette',
  'lyn': 'n,da,ne,ette',
  'del': 'ores,la,ia,oris',
  'ter': 'esa,ri,i',
  'son': 'ia,ya,ja,dra',
  'deb': 'orah,ra,bie,ora',
  'jac': 'queline,kie,quelyn,lyn',
  'lat': 'oya,asha,onya,isha',
  'che': 'ryl,lsea,ri,rie',
  'vic': 'toria,ki,kie,ky',
  'sus': 'an,ie,anne,ana',
  'rob': 'erta,yn',
  'est': 'her,elle,ella,er',
  'lea': 'h,,nne,nn',
  'lil': 'lian,lie,a,y',
  'ma': 'ureen,ttie,xine,bel,e,deline,ggie,mie,ble,ndy,ude,yra,nuela,vis,gdalena,tilda',
  'jo': 'yce,sephine,,di,dy,hanna,sefina,sie,celyn,lene,ni,die',
  'be': 'verly,rtha,atrice,rnice,th,ssie,cky,linda,ulah,rnadette,thany,tsy,atriz',
  'ca': 'therine,thy,ssandra,ndace,ndice,mille,itlin,ssie,thleen,llie',
  'le': 'slie,na,ona,ticia,igh,la,nora,ola,sley,ila',
  'el': 'aine,len,eanor,sie,la,ena,oise,vira,sa,va,ma',
  'sa': 'ndra,rah,ra,lly,mantha,brina,ndy,die,llie',
  'mi': 'chelle,ldred,chele,nnie,riam,sty,ndy,randa,llie',
  'co': 'nnie,lleen,nstance,urtney,ra,rinne,nsuelo,rnelia',
  'ju': 'lie,dith,dy,lia,anita,ana,stine',
  'da': 'wn,nielle,rlene,na,isy,rla,phne',
  're': 'becca,nee,na,bekah,ba',
  'al': 'ma,lison,berta,exandra,yssa,ta',
  'ra': 'chel,mona,chael,quel,chelle',
  'an': 'drea,ita,a,gie,toinette,tonia',
  'ge': 'raldine,rtrude,orgia,nevieve,orgina',
  'de': 'nise,anna,siree,na,ana,e',
  'ja': 'smine,na,yne',
  'lu': 'cy,z,la,pe,ella,isa',
  'je': 'ssica,nifer,well,ri',
  'ad': 'a,rienne,die,ele,riana,eline',
  'pa': 'tricia,mela,ula,uline,tsy,m,tty,ulette,tti,trice,trica,ige',
  'ke': 'ndra,rri,isha,ri',
  'mo': 'nica,lly,nique,na,llie',
  'lo': 'uise,is,la',
  'he': 'len,ather,idi,nrietta,lene,lena',
  'me': 'gan,rcedes,redith,ghan,agan',
  'wi': 'lma,lla,nnie',
  'ga': 'il,yle,briela,brielle,le',
  'er': 'in,ica,ika,ma,nestine',
  'ce': 'cilia,lia,celia,leste,cile',
  'ka': 'tie,y,trina,yla,te',
  'ol': 'ga,ivia,lie,a',
  'li': 'nda,sa,ndsay,ndsey,zzie',
  'na': 'ncy,talie,omi,tasha,dine',
  'la': 'verne,na,donna,ra',
  'vi': 'rginia,vian,ola',
  'ha': 'rriet,nnah',
  'pe': 'ggy,arl,nny,tra',
  'br': 'enda,andi,ooke',
  'ki': 'mberly,m,mberley,rsten',
  'au': 'drey,tumn,dra',
  'bo': 'nnie,bbie,nita,bbi',
  'do': 'nna,lores,lly,minique',
  'gl': 'oria,adys,enda,enna',
  'tr': 'icia,ina,isha,udy',
  'ta': 'ra,nya,sha,bitha',
  'ro': 'sie,xanne,chelle,nda',
  'am': 'y,anda,ber,elia',
  'fa': 'ye,nnie,y',
  'ni': 'cole,na,chole,kki',
  've': 'ronica,ra,lma,rna',
  'gr': 'ace,etchen,aciela,acie',
  'b': 'arbara,lanca,arbra,ianca',
  'r': 'uth,ita,honda',
  's': 'hirley,tephanie,ylvia,heila,uzanne,ue,tella,ophia,ilvia,ophie,tefanie,heena,ummer,elma,ocorro,ybil,imone',
  'c': 'ynthia,rystal,indy,harlene,ristina,leo',
  'e': 'velyn,mily,dna,dith,thel,mma,va,ileen,unice,ula,ssie,ffie,tta,ugenia',
  'a': 'shley,pril,gnes,rlene,imee,bigail,ida,bby,ileen',
  't': 'heresa,ina,iffany,helma,onya,oni,herese,onia',
  'i': 'rene,da,rma,sabel,nez,ngrid,va,mogene,sabelle',
  'w': 'anda,endy,hitney',
  'p': 'hyllis,riscilla,olly',
  'n': 'orma,ellie,ora,ettie,ell',
  'f': 'lorence,elicia,lora,reda,ern,rieda',
  'v': 'alerie,anessa',
  'j': 'ill,illian',
  'y': 'vonne,olanda,vette',
  'g': 'ina,wendolyn,wen,oldie',
  'l': 'ydia',
  'm': 'yrtle,yra,uriel,yrna',
  'h': 'ilda',
  'o': 'pal,ra,felia',
  'k': 'rystal',
  'd': 'ixie,ina',
  'u': 'rsula'
};
const ambiguous = [
  'casey',
  'jamie',
  'lee',
  'jaime',
  'jessie',
  'morgan',
  'rene',
  'robin',
  'devon',
  'kerry',
  'alexis',
  'guadalupe',
  'blair',
  'kasey',
  'jean',
  'marion',
  'aubrey',
  'shelby',
  'jan',
  'shea',
  'jade',
  'kenyatta',
  'kelsey',
  'shay',
  'lashawn',
  'trinity',
  'regan',
  'jammie',
  'cassidy',
  'cheyenne',
  'reagan',
  'shiloh',
  'marlo',
  'andra',
  'devan',
  'rosario',
  'lee'
];

//add data into the main obj
//males
let keys = Object.keys(male_names);
let l = keys.length;
for (let i = 0; i < l; i++) {
  const arr = male_names[keys[i]].split(',');
  for (let i2 = 0; i2 < arr.length; i2++) {
    main[keys[i] + arr[i2]] = 'm';
  }
}

//females
keys = Object.keys(female_names);
l = keys.length;
for (let i = 0; i < l; i++) {
  const arr = female_names[keys[i]].split(',');
  for (let i2 = 0; i2 < arr.length; i2++) {
    main[keys[i] + arr[i2]] = 'f';
  }
}
//unisex names
l = ambiguous.length;
for (let i = 0; i < l; i += 1) {
  main[ambiguous[i]] = 'a';
}
// console.log(firstnames['spencer'])
// console.log(firstnames['jill'])
// console.log(firstnames['sue'])
// console.log(firstnames['jan'])
// console.log(JSON.stringify(Object.keys(firstnames).length, null, 2));

module.exports = main;

},{}],7:[function(require,module,exports){
//these are common person titles used in the lexicon and sentence segmentation methods
//they are also used to identify that a noun is a person
module.exports = [
  //honourifics
  'jr',
  'mr',
  'mrs',
  'ms',
  'dr',
  'prof',
  'sr',
  'sen',
  'corp',
  'rep',
  'gov',
  'atty',
  'supt',
  'det',
  'rev',
  'col',
  'gen',
  'lt',
  'cmdr',
  'adm',
  'capt',
  'sgt',
  'cpl',
  'maj',
  'miss',
  'misses',
  'mister',
  'sir',
  'esq',
  'mstr',
  'phd',
  'adj',
  'adv',
  'asst',
  'bldg',
  'brig',
  'comdr',
  'hon',
  'messrs',
  'mlle',
  'mme',
  'op',
  'ord',
  'pvt',
  'reps',
  'res',
  'sens',
  'sfc',
  'surg',
];

},{}],8:[function(require,module,exports){
//nouns with irregular plural/singular forms
//used in noun.inflect, and also in the lexicon.
//compressed with '_' to reduce some redundancy.
'use strict';
let main = [
  ['child', '_ren'],
  ['person', 'people'],
  ['leaf', 'leaves'],
  ['database', '_s'],
  ['quiz', '_zes'],
  ['child', '_ren'],
  ['stomach', '_s'],
  ['sex', '_es'],
  ['move', '_s'],
  ['shoe', '_s'],
  ['goose', 'geese'],
  ['phenomenon', 'phenomena'],
  ['barracks', '_'],
  ['deer', '_'],
  ['syllabus', 'syllabi'],
  ['index', 'indices'],
  ['appendix', 'appendices'],
  ['criterion', 'criteria'],
  ['man', 'men'],
  ['sex', '_es'],
  ['rodeo', '_s'],
  ['epoch', '_s'],
  ['zero', '_s'],
  ['avocado', '_s'],
  ['halo', '_s'],
  ['tornado', '_s'],
  ['tuxedo', '_s'],
  ['sombrero', '_s'],
  ['addendum', 'addenda'],
  ['alga', '_e'],
  ['alumna', '_e'],
  ['alumnus', 'alumni'],
  ['bacillus', 'bacilli'],
  ['cactus', 'cacti'],
  ['beau', '_x'],
  ['château', '_x'],
  ['chateau', '_x'],
  ['tableau', '_x'],
  ['corpus', 'corpora'],
  ['curriculum', 'curricula'],
  ['echo', '_es'],
  ['embargo', '_es'],
  ['foot', 'feet'],
  ['genus', 'genera'],
  ['hippopotamus', 'hippopotami'],
  ['larva', '_e'],
  ['libretto', 'libretti'],
  ['loaf', 'loaves'],
  ['matrix', 'matrices'],
  ['memorandum', 'memoranda'],
  ['mosquito', '_es'],
  ['opus', 'opera'],
  ['ovum', 'ova'],
  ['ox', '_en'],
  ['radius', 'radii'],
  ['referendum', 'referenda'],
  ['thief', 'thieves'],
  ['tooth', 'teeth']
];

main = main.map(function(a) {
  a[1] = a[1].replace('_', a[0]);
  return a;
});

module.exports = main;

},{}],9:[function(require,module,exports){
'use strict';

const misc = {

  'etc': 'FW', //foreign words
  'ie': 'FW',

  'there': 'NN',

  'better': 'JJR',
  'earlier': 'JJR',

  'has': 'VB',
  'more': 'RB',

  'sounds': 'VBZ'
};

const compact = {
  //conjunctions
  'CC': [
    'yet',
    'therefore',
    'or',
    'while',
    'nor',
    'whether',
    'though',
    'because',
    'but',
    'for',
    'and',
    'if',
    'however',
    'before',
    'although',
    'how',
    'plus',
    'versus',
    'not'
  ],

  'VBD': [
    'where\'d',
    'when\'d',
    'how\'d',
    'what\'d',
    'said',
    'had',
    'been',
    'began',
    'came',
    'did',
    'meant',
    'went'
  ],

  'VBN': [
    'given',
    'known',
    'shown',
    'seen',
    'born',
  ],

  'VBG': [
    'going',
    'being',
    'according',
    'resulting',
    'developing',
    'staining'
  ],

  //copula
  'CP': [
    'is',
    'will be',
    'are',
    'was',
    'were',
    'am',
    'isn\'t',
    'ain\'t',
    'aren\'t'
  ],

  //determiners
  'DT': [
    'this',
    'any',
    'enough',
    'each',
    'whatever',
    'every',
    'which',
    'these',
    'another',
    'plenty',
    'whichever',
    'neither',
    'an',
    'a',
    'least',
    'own',
    'few',
    'both',
    'those',
    'the',
    'that',
    'various',
    'what',
    'either',
    'much',
    'some',
    'else',
    'no',
    //some other languages (what could go wrong?)
    'la',
    'le',
    'les',
    'des',
    'de',
    'du',
    'el'
  ],

  //prepositions
  'IN': [
    'until',
    'onto',
    'of',
    'into',
    'out',
    'except',
    'across',
    'by',
    'between',
    'at',
    'down',
    'as',
    'from',
    'around',
    'with',
    'among',
    'upon',
    'amid',
    'to',
    'along',
    'since',
    'about',
    'off',
    'on',
    'within',
    'in',
    'during',
    'per',
    'without',
    'throughout',
    'through',
    'than',
    'via',
    'up',
    'unlike',
    'despite',
    'below',
    'unless',
    'towards',
    'besides',
    'after',
    'whereas',
    '\'o',
    'amidst',
    'amongst',
    'apropos',
    'atop',
    'barring',
    'chez',
    'circa',
    'mid',
    'midst',
    'notwithstanding',
    'qua',
    'sans',
    'vis-a-vis',
    'thru',
    'till',
    'versus',
    'without',
    'w/o',
    'o\'',
    'a\'',
  ],

  //modal verbs
  'MD': [
    'can',
    'may',
    'could',
    'might',
    'will',
    'ought to',
    'would',
    'must',
    'shall',
    'should',
    'ought',
    'shouldn\'t',
    'wouldn\'t',
    'couldn\'t',
    'mustn\'t',
    'shan\'t',
    'shant',
    'lets', //arguable
    'who\'d',
    'let\'s'
  ],

  //posessive pronouns
  'PP': [
    'mine',
    'something',
    'none',
    'anything',
    'anyone',
    'theirs',
    'himself',
    'ours',
    'his',
    'my',
    'their',
    'yours',
    'your',
    'our',
    'its',
    'nothing',
    'herself',
    'hers',
    'themselves',
    'everything',
    'myself',
    'itself',
    'her', //this one is pretty ambiguous
    'who',
    'whom',
    'whose'
  ],

  //personal pronouns (nouns)
  'PRP': [
    'it',
    'they',
    'i',
    'them',
    'you',
    'she',
    'me',
    'he',
    'him',
    'ourselves',
    'us',
    'we',
    'thou',
    'il',
    'elle',
    'yourself',
    '\'em'
  ],

  //some manual adverbs (the rest are generated)
  'RB': [
    'now',
    'again',
    'already',
    'soon',
    'directly',
    'toward',
    'forever',
    'apart',
    'instead',
    'yes',
    'alone',
    'ago',
    'indeed',
    'ever',
    'quite',
    'perhaps',
    'where',
    'then',
    'here',
    'thus',
    'very',
    'often',
    'once',
    'never',
    'why',
    'when',
    'away',
    'always',
    'sometimes',
    'also',
    'maybe',
    'so',
    'just',
    'well',
    'several',
    'such',
    'randomly',
    'too',
    'rather',
    'abroad',
    'almost',
    'anyway',
    'twice',
    'aside',
    'moreover',
    'anymore',
    'newly',
    'damn',
    'somewhat',
    'somehow',
    'meanwhile',
    'hence',
    'further',
    'furthermore'
  ],

  //interjections
  'UH': [
    'uhh',
    'uh-oh',
    'ugh',
    'sheesh',
    'eww',
    'pff',
    'voila',
    'oy',
    'eep',
    'hurrah',
    'yuck',
    'ow',
    'duh',
    'oh',
    'hmm',
    'yeah',
    'whoa',
    'ooh',
    'whee',
    'ah',
    'bah',
    'gah',
    'yaa',
    'phew',
    'gee',
    'ahem',
    'eek',
    'meh',
    'yahoo',
    'oops',
    'd\'oh',
    'psst',
    'argh',
    'grr',
    'nah',
    'shhh',
    'whew',
    'mmm',
    'yay',
    'uh-huh',
    'boo',
    'wow',
    'nope'
  ],

  //nouns that shouldnt be seen as a verb
  'NN': [
    'president',
    'dollar',
    'student',
    'patent',
    'funding',
    'morning',
    'banking',
    'ceiling',
    'energy',
    'secretary',
    'purpose',
    'friends',
    'event'
  ]
};
//unpack the compact terms into the misc lexicon..
const keys = Object.keys(compact);
for (let i = 0; i < keys.length; i++) {
  const arr = compact[keys[i]];
  for (let i2 = 0; i2 < arr.length; i2++) {
    misc[arr[i2]] = keys[i];
  }
}
// console.log(misc.a);
module.exports = misc;

},{}],10:[function(require,module,exports){
//common terms that are multi-word, but one part-of-speech
//these should not include phrasal verbs, like 'looked out'. These are handled elsewhere.
module.exports = {
  'of course': 'RB',
  'at least': 'RB',
  'no longer': 'RB',
  'sort of': 'RB',
  'at first': 'RB',
  'once again': 'RB',
  'once more': 'RB',
  'up to': 'RB',
  'by now': 'RB',
  'all but': 'RB',
  'just about': 'RB',
  'on board': 'JJ',
  'a lot': 'RB',
  'by far': 'RB',
  'at best': 'RB',
  'at large': 'RB',
  'for good': 'RB',
  'vice versa': 'JJ',
  'en route': 'JJ',
  'for sure': 'RB',
  'upside down': 'JJ',
  'at most': 'RB',
  'per se': 'RB',
  'at worst': 'RB',
  'upwards of': 'RB',
  'en masse': 'RB',
  'point blank': 'RB',
  'up front': 'JJ',
  'in situ': 'JJ',
  'in vitro': 'JJ',
  'ad hoc': 'JJ',
  'de facto': 'JJ',
  'ad infinitum': 'JJ',
  'ad nauseam': 'RB',
  'for keeps': 'JJ',
  'a priori': 'FW',
  'et cetera': 'FW',
  'off guard': 'JJ',
  'spot on': 'JJ',
  'ipso facto': 'JJ',
  'not withstanding': 'RB',
  'de jure': 'RB',
  'a la': 'IN',
  'ad hominem': 'NN',
  'par excellence': 'RB',
  'de trop': 'RB',
  'a posteriori': 'RB',
  'fed up': 'JJ',
  'brand new': 'JJ',
  'old fashioned': 'JJ',
  'bona fide': 'JJ',
  'well off': 'JJ',
  'far off': 'JJ',
  'straight forward': 'JJ',
  'hard up': 'JJ',
  'sui generis': 'JJ',
  'en suite': 'JJ',
  'avant garde': 'JJ',
  'sans serif': 'JJ',
  'gung ho': 'JJ',
  'super duper': 'JJ',
  'new york': 'NN',
  'new england': 'NN',
  'new hampshire': 'NN',
  'new delhi': 'NN',
  'new jersey': 'NN',
  'new mexico': 'NN',
  'united states': 'NN',
  'united kingdom': 'NN',
  'great britain': 'NN',
  'head start': 'NN'
};

},{}],11:[function(require,module,exports){
module.exports = [
  //numbers
  'minus',
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
  'hundred',
  'thousand',
  'million',
  'billion',
  'trillion',
  'quadrillion',
  'quintillion',
  'sextillion',
  'septillion',
  'octillion',
  'nonillion',
  'decillion'
];

},{}],12:[function(require,module,exports){
'use strict';
//just a few named-organisations
//no acronyms needed. no product/brand pollution.
let organisations = [
  'google',
  'microsoft',
  'walmart',
  'exxonmobil',
  'glencore',
  'samsung',
  'chevron',
  'at&t',
  'verizon',
  'costco',
  'nestlé',
  '7-eleven',
  'adidas',
  'nike',
  'acer',
  'mcdonalds',
  'mcdonald\'s',
  'comcast',
  'compaq',
  'craigslist',
  'cisco',
  'disney',
  'coca cola',
  'dupont',
  'ebay',
  'facebook',
  'fedex',
  'kmart',
  'kodak',
  'monsanto',
  'myspace',
  'netflix',
  'sony',
  'telus',
  'twitter',
  'usps',
  'ubs',
  'ups',
  'walgreens',
  'youtube',
  'yahoo!',
  'yamaha'
];

let suffixes = [
  'center',
  'centre',
  'memorial',
  'school',
  'university',
  'bank',
  'college',
  'house',
  'foundation',
  'department',
  'institute',
  'club',
  'co',
  'sons'
];

module.exports = {
  suffixes: suffixes,
  organisations: organisations
};

},{}],13:[function(require,module,exports){
//phrasal verbs are two words that really mean one verb.
//'beef up' is one verb, and not some direction of beefing.
//by @spencermountain, 2015 mit
//many credits to http://www.allmyphrasalverbs.com/
'use strict';
const verb_conjugate = require('../term/verb/conjugate/conjugate.js');

//start the list with some randoms
let main = [
  'be onto',
  'fall behind',
  'fall through',
  'fool with',
  'get across',
  'get along',
  'get at',
  'give way',
  'hear from',
  'hear of',
  'lash into',
  'make do',
  'run across',
  'set upon',
  'take aback',
  'keep from'
];

//if there's a phrasal verb "keep on", there's often a "keep off"
const opposites = {
  'away': 'back',
  'in': 'out',
  'on': 'off',
  'over': 'under',
  'together': 'apart',
  'up': 'down'
};

//forms that have in/out symmetry
const symmetric = {
  'away': 'blow,bounce,bring,call,come,cut,drop,fire,get,give,go,keep,pass,put,run,send,shoot,switch,take,tie,throw',
  'in': 'bang,barge,bash,beat,block,book,box,break,bring,burn,butt,carve,cash,check,come,cross,drop,fall,fence,fill,give,grow,hand,hang,head,jack,keep,leave,let,lock,log,move,opt,pack,peel,pull,put,rain,reach,ring,rub,send,set,settle,shut,sign,smash,snow,strike,take,try,turn,type,warm,wave,wean,wear,wheel',
  'on': 'add,call,carry,catch,count,feed,get,give,go,grind,head,hold,keep,lay,log,pass,pop,power,put,send,show,snap,switch,take,tell,try,turn,wait',
  'over': 'come,go,look,read,run,talk',
  'together': 'come,pull,put',
  'up': 'add,back,beat,bend,blow,boil,bottle,break,bring,buckle,bundle,call,carve,clean,cut,dress,fill,flag,fold,get,give,grind,grow,hang,hold,keep,let,load,lock,look,man,mark,melt,move,pack,pin,pipe,plump,pop,power,pull,put,rub,scale,scrape,send,set,settle,shake,show,sit,slow,smash,square,stand,strike,take,tear,tie,turn,use,wash,wind',
};
Object.keys(symmetric).forEach(function(k) {
  symmetric[k].split(',').forEach(function(s) {
    //add the given form
    main.push(s + ' ' + k);
    //add its opposite form
    main.push(s + ' ' + opposites[k]);
  });
});

//forms that don't have in/out symmetry
const asymmetric = {
  'about': 'bring,fool,gad,go,root',
  'after': 'go,look,take',
  'ahead': 'get,go,press',
  'along': 'bring,move',
  'apart': 'fall,take',
  'around': 'ask,boss,bring,call,come,fool,get,horse,joke,lie,mess,play',
  'away': 'back,carry,file,frighten,hide,wash',
  'back': 'fall,fight,hit,hold,look,pay,stand,think',
  'by': 'drop,get,go,stop,swear,swing,tick,zip',
  'down': 'bog,calm,fall,hand,hunker,jot,knock,lie,narrow,note,pat,pour,run,tone,trickle,wear',
  'for': 'fend,file,gun,hanker,root,shoot',
  'forth': 'bring,come',
  'forward': 'come,look',
  'in': 'cave,chip,hone,jump,key,pencil,plug,rein,shade,sleep,stop,suck,tie,trade,tuck,usher,weigh,zero',
  'into': 'look,run',
  'it': 'go,have',
  'off': 'auction,be,beat,blast,block,brush,burn,buzz,cast,cool,drop,end,face,fall,fend,frighten,goof,jack,kick,knock,laugh,level,live,make,mouth,nod,pair,pay,peel,read,reel,ring,rip,round,sail,shave,shoot,sleep,slice,split,square,stave,stop,storm,strike,tear,tee,tick,tip,top,walk,work,write',
  'on': 'bank,bargain,egg,frown,hit,latch,pile,prattle,press,spring,spur,tack,urge,yammer',
  'out': 'act,ask,back,bail,bear,black,blank,bleed,blow,blurt,branch,buy,cancel,cut,eat,edge,farm,figure,find,fill,find,fish,fizzle,flake,flame,flare,flesh,flip,geek,get,help,hide,hold,iron,knock,lash,level,listen,lose,luck,make,max,miss,nerd,pan,pass,pick,pig,point,print,psych,rat,read,rent,root,rule,run,scout,see,sell,shout,single,sit,smoke,sort,spell,splash,stamp,start,storm,straighten,suss,time,tire,top,trip,trot,wash,watch,weird,whip,wimp,wipe,work,zone,zonk',
  'over': 'bend,bubble,do,fall,get,gloss,hold,keel,mull,pore,sleep,spill,think,tide,tip',
  'round': 'get,go',
  'through': 'go,run',
  'to': 'keep,see',
  'up': 'act,beef,board,bone,boot,brighten,build,buy,catch,cheer,cook,end,eye,face,fatten,feel,fess,finish,fire,firm,flame,flare,free,freeze,freshen,fry,fuel,gang,gear,goof,hack,ham,heat,hit,hole,hush,jazz,juice,lap,light,lighten,line,link,listen,live,loosen,make,mash,measure,mess,mix,mock,mop,muddle,open,own,pair,patch,pick,prop,psych,read,rough,rustle,save,shack,sign,size,slice,slip,snap,sober,spark,split,spruce,stack,start,stay,stir,stitch,straighten,string,suck,suit,sum,team,tee,think,tidy,tighten,toss,trade,trip,type,vacuum,wait,wake,warm,weigh,whip,wire,wise,word,write,zip',
};
Object.keys(asymmetric).forEach(function(k) {
  asymmetric[k].split(',').forEach(function(s) {
    main.push(s + ' ' + k);
  });
});

//at his point all verbs are infinitive. lets make this explicit.
main = main.reduce(function(h, s) {
  h[s] = 'VBP';
  return h;
}, {});

//conjugate every phrasal verb. takes ~30ms
const tags = {
  present: 'VB',
  past: 'VBD',
  future: 'VBF',
  gerund: 'VBG',
  infinitive: 'VBP',
};
const cache = {}; //cache individual verbs to speed it up
let split, verb, particle, phrasal;
Object.keys(main).forEach(function(s) {
  split = s.split(' ');
  verb = split[0];
  particle = split[1];
  if (cache[verb] === undefined) {
    cache[verb] = verb_conjugate(verb);
  }
  Object.keys(cache[verb]).forEach(function(k) {
    phrasal = cache[verb][k] + ' ' + particle;
    if (tags[k]) {
      main[phrasal] = tags[k];
    }
  });
});

// console.log(main["wiring up"] === "VBG")
module.exports = main;

},{"../term/verb/conjugate/conjugate.js":62}],14:[function(require,module,exports){
'use strict';

let countries = [
  'china',
  'india',
  'america',
  'united states',
  'usa',
  'u.s.a.',
  'ussr',
  'united states of america',
  'indonesia',
  'brazil',
  'pakistan',
  'nigeria',
  'bangladesh',
  'russia',
  'japan',
  'mexico',
  'philippines',
  'vietnam',
  'ethiopia',
  'egypt',
  'germany',
  'iran',
  'turkey',
  'dr congo',
  'thailand',
  'france',
  'united kingdom',
  'italy',
  'myanmar',
  'south africa',
  'south korea',
  'colombia',
  'spain',
  'ukraine',
  'tanzania',
  'kenya',
  'argentina',
  'algeria',
  'poland',
  'sudan',
  'uganda',
  'canada',
  'iraq',
  'morocco',
  'peru',
  'uzbekistan',
  'saudi arabia',
  'malaysia',
  'venezuela',
  'nepal',
  'afghanistan',
  'yemen',
  'north korea',
  'ghana',
  'mozambique',
  'taiwan',
  'australia',
  'syria',
  'madagascar',
  'angola',
  'cameroon',
  'sri lanka',
  'romania',
  'burkina faso',
  'niger',
  'kazakhstan',
  'netherlands',
  'chile',
  'malawi',
  'ecuador',
  'guatemala',
  'côte d\'ivoire',
  'mali',
  'cambodia',
  'senegal',
  'zambia',
  'zimbabwe',
  'chad',
  'south sudan',
  'belgium',
  'cuba',
  'tunisia',
  'guinea',
  'greece',
  'rwanda',
  'czech republic',
  'somalia',
  'portugal',
  'haiti',
  'benin',
  'burundi',
  'bolivia',
  'hungary',
  'sweden',
  'belarus',
  'dominican republic',
  'azerbaijan',
  'honduras',
  'austria',
  'united arab emirates',
  'israel',
  'switzerland',
  'tajikistan',
  'bulgaria',
  'serbia',
  'papua new guinea',
  'paraguay',
  'laos',
  'jordan',
  'el salvador',
  'eritrea',
  'libya',
  'togo',
  'sierra leone',
  'nicaragua',
  'kyrgyzstan',
  'denmark',
  'finland',
  'slovakia',
  'turkmenistan',
  'norway',
  'lebanon',
  'costa rica',
  'central african republic',
  'republic of ireland',
  'new zealand',
  'georgia',
  'congo-brazzaville',
  'palestine',
  'liberia',
  'croatia',
  'oman',
  'bosnia and herzegovina',
  'kuwait',
  'moldova',
  'mauritania',
  'panama',
  'uruguay',
  'armenia',
  'lithuania',
  'albania',
  'mongolia',
  'jamaica',
  'namibia',
  'lesotho',
  'qatar',
  'macedonia',
  'slovenia',
  'botswana',
  'latvia',
  'gambia',
  'guinea-bissau',
  'gabon',
  'equatorial guinea',
  'trinidad-tobago',
  'estonia',
  'mauritius',
  'swaziland',
  'bahrain',
  'timor-leste',
  'djibouti',
  'cyprus',
  'fiji',
  'guyana',
  'comoros',
  'bhutan',
  'solomon islands',
  'luxembourg',
  'suriname',
  'cape verde',
  'malta',
  'bahamas',
  'iceland'
];

let cities = [
  'shanghai',
  'beijing',
  'guangzhou',
  'tianjin',
  'shenzhen',
  'mumbai',
  'new delhi',
  'chennai',
  'bangalore',
  'ahmedabad',
  'new york',
  'los angeles',
  'chicago',
  'houston',
  'philadelphia',
  'phoenix',
  'jakarta',
  'rio de janeiro',
  'salvador',
  'brasília',
  'curitiba',
  'karachi',
  'dhaka',
  'chittagong',
  'moscow',
  'saint petersburg',
  'yekaterinburg',
  'tokyo',
  'yokohama',
  'osaka',
  'nagoya',
  'sapporo',
  'kobe',
  'mexico',
  'guadalajara',
  'puebla',
  'manila',
  'cebu',
  'ho chi minh',
  'hanoi',
  'cairo',
  'alexandria',
  'giza',
  'berlin',
  'hamburg',
  'munich',
  'cologne',
  'frankfurt',
  'stuttgart',
  'tehran',
  'karaj',
  'istanbul',
  'ankara',
  'i̇zmir',
  'bursa',
  'bangkok',
  'chiang mai',
  'paris',
  'marseille',
  'lyon',
  'toulouse',
  'nice',
  'nantes',
  'london',
  'birmingham',
  'manchester',
  'liverpool',
  'rome',
  'milan',
  'naples',
  'turin',
  'palermo',
  'genoa',
  'yangon',
  'mandalay',
  'cape town',
  'port elizabeth',
  'pretoria',
  'durban',
  'seoul',
  'busan',
  'incheon',
  'daegu',
  'daejeon',
  'bogotá',
  'medellín',
  'barranquilla',
  'madrid',
  'barcelona',
  'valencia',
  'seville',
  'zaragoza',
  'kiev',
  'kharkiv',
  'odessa',
  'dnipropetrovsk',
  'lviv',
  'buenos aires',
  'rosario',
  'la plata',
  'warsaw',
  'kraków',
  'łódź',
  'wrocław',
  'poznań',
  'gdańsk',
  'kampala',
  'toronto',
  'vancouver',
  'calgary',
  'ottawa',
  'edmonton',
  'fes',
  'tangier',
  'lima',
  'kuala lumpur',
  'caracas',
  'kabul',
  'sana\'a',
  'pyongyang',
  'new taipei',
  'kaohsiung',
  'taichung',
  'taipei',
  'tainan',
  'sydney',
  'melbourne',
  'brisbane',
  'perth',
  'damascus',
  'homs',
  'colombo',
  'kandy',
  'bucharest',
  'timișoara',
  'iași',
  'cluj-napoca',
  'constanța',
  'craiova',
  'hauts-bassins region',
  'nord region',
  'almaty',
  'amsterdam',
  'the hague',
  'rotterdam',
  'utrecht',
  'eindhoven',
  'tilburg',
  'santiago',
  'quito',
  'guatemala',
  'abidjan',
  'phnom penh',
  'dakar',
  'antwerp',
  'ghent',
  'charleroi',
  'liège',
  'brussels',
  'havana',
  'tunis',
  'athens',
  'thessaloniki',
  'piraeus',
  'patras',
  'heraklion',
  'prague',
  'brno',
  'pilsen',
  'lisbon',
  'porto',
  'budapest',
  'miskolc',
  'stockholm',
  'gothenburg',
  'malmö',
  'västerås',
  'minsk',
  'baku',
  'tegucigalpa',
  'vienna',
  'graz',
  'linz',
  'salzburg',
  'innsbruck',
  'abu dhabi',
  'tel aviv',
  'haifa',
  'ashdod',
  'petah tikva',
  'zürich',
  'geneva',
  'basel',
  'lausanne',
  'bern',
  'winterthur',
  'dushanbe',
  'sofia',
  'varna',
  'burgas',
  'belgrade',
  'niš',
  'amman',
  'aqaba',
  'san salvador',
  'copenhagen',
  'aarhus',
  'aalborg',
  'helsinki',
  'espoo',
  'tampere',
  'vantaa',
  'turku',
  'bratislava',
  'košice',
  'ashgabat',
  'oslo',
  'bergen',
  'trondheim',
  'beirut',
  'san josé',
  'dublin',
  'cork',
  'auckland',
  'christchurch',
  'wellington',
  'hamilton',
  'dunedin',
  'tbilisi',
  'zagreb',
  'split',
  'banja luka',
  'kuwait',
  'chișinău',
  'panama',
  'montevideo',
  'yerevan',
  'vilnius',
  'kaunas',
  'klaipėda',
  'tirana',
  'ulan bator',
  'doha',
  'skopje',
  'ljubljana',
  'maribor',
  'riga',
  'daugavpils',
  'tallinn',
  'tartu',
  'nicosia',
  'limassol',
  'luxembourg',
  'reykjavik',
  'kópavogur'
];

module.exports = {
  countries: countries,
  cities: cities,
};

},{}],15:[function(require,module,exports){
//common nouns that have no plural form. These are suprisingly rare
//used in noun.inflect(), and added as nouns in lexicon
module.exports = [
  'aircraft',
  'bass',
  'bison',
  'fowl',
  'halibut',
  'moose',
  'salmon',
  'spacecraft',
  'tuna',
  'trout',
  'advice',
  'information',
  'knowledge',
  'trouble',
  'enjoyment',
  'fun',
  'recreation',
  'relaxation',
  'meat',
  'rice',
  'bread',
  'cake',
  'coffee',
  'ice',
  'water',
  'oil',
  'grass',
  'hair',
  'fruit',
  'wildlife',
  'equipment',
  'machinery',
  'furniture',
  'mail',
  'luggage',
  'jewelry',
  'clothing',
  'money',
  'mathematics',
  'economics',
  'physics',
  'civics',
  'ethics',
  'gymnastics',
  'mumps',
  'measles',
  'news',
  'tennis',
  'baggage',
  'currency',
  'soap',
  'toothpaste',
  'food',
  'sugar',
  'butter',
  'flour',
  'research',
  'leather',
  'wool',
  'wood',
  'coal',
  'weather',
  'homework',
  'cotton',
  'silk',
  'patience',
  'impatience',
  'vinegar',
  'art',
  'beef',
  'blood',
  'cash',
  'chaos',
  'cheese',
  'chewing',
  'conduct',
  'confusion',
  'education',
  'electricity',
  'entertainment',
  'fiction',
  'forgiveness',
  'gold',
  'gossip',
  'ground',
  'happiness',
  'history',
  'honey',
  'hospitality',
  'importance',
  'justice',
  'laughter',
  'leisure',
  'lightning',
  'literature',
  'luck',
  'melancholy',
  'milk',
  'mist',
  'music',
  'noise',
  'oxygen',
  'paper',
  'pay',
  'peace',
  'peanut',
  'pepper',
  'petrol',
  'plastic',
  'pork',
  'power',
  'pressure',
  'rain',
  'recognition',
  'sadness',
  'safety',
  'salt',
  'sand',
  'scenery',
  'shopping',
  'silver',
  'snow',
  'softness',
  'space',
  'speed',
  'steam',
  'sunshine',
  'tea',
  'thunder',
  'time',
  'traffic',
  'trousers',
  'violence',
  'warmth',
  'wine',
  'steel',
  'soccer',
  'hockey',
  'golf',
  'fish',
  'gum',
  'liquid',
  'series',
  'sheep',
  'species',
  'fahrenheit',
  'celcius',
  'kelvin',
  'hertz'
];

},{}],16:[function(require,module,exports){
'use strict';

const types = [
  'infinitive',
  'gerund',
  'past',
  'present',
  'actor',
  'future'
];

//list of verb irregular verb forms, compacted to save space. ('_' -> infinitive )
const compact = [
  [
    'arise',
    'arising',
    'arose',
    '_s',
    '_r'
  ],
  [
    'babysit',
    '_ting',
    'babysat',
    '_s',
    '_ter'
  ],
  [
    'be',
    '_ing',
    'was',
    'is',
    ''
  ],
  [
    'beat',
    '_ing',
    '_',
    '_s',
    '_er'
  ],
  [
    'become',
    'becoming',
    'became',
    '_s',
    '_r'
  ],
  [
    'bend',
    '_ing',
    'bent',
    '_s',
    '_er'
  ],
  [
    'begin',
    '_ning',
    'began',
    '_s',
    '_ner'
  ],
  [
    'bet',
    '_ting',
    '_',
    '_s',
    '_ter'
  ],
  [
    'bind',
    '_ing',
    'bound',
    '_s',
    '_er'
  ],
  [
    'bite',
    'biting',
    'bit',
    '_s',
    '_r'
  ],
  [
    'bleed',
    '_ing',
    'bled',
    '_s',
    '_er'
  ],
  [
    'blow',
    '_ing',
    'blew',
    '_s',
    '_er'
  ],
  [
    'break',
    '_ing',
    'broke',
    '_s',
    '_er'
  ],
  [
    'breed',
    '_ing',
    'bred',
    '_s',
    '_er'
  ],
  [
    'bring',
    '_ing',
    'brought',
    '_s',
    '_er'
  ],
  [
    'broadcast',
    '_ing',
    '_',
    '_s',
    '_er'
  ],
  [
    'build',
    '_ing',
    'built',
    '_s',
    '_er'
  ],
  [
    'buy',
    '_ing',
    'bought',
    '_s',
    '_er'
  ],
  [
    'catch',
    '_ing',
    'caught',
    '_es',
    '_er'
  ],
  [
    'choose',
    'choosing',
    'chose',
    '_s',
    '_r'
  ],
  [
    'come',
    'coming',
    'came',
    '_s',
    '_r'
  ],
  [
    'cost',
    '_ing',
    '_',
    '_s',
    '_er'
  ],
  [
    'cut',
    '_ting',
    '_',
    '_s',
    '_ter'
  ],
  [
    'deal',
    '_ing',
    '_t',
    '_s',
    '_er'
  ],
  [
    'dig',
    '_ging',
    'dug',
    '_s',
    '_ger'
  ],
  [
    'do',
    '_ing',
    'did',
    '_es',
    '_er'
  ],
  [
    'draw',
    '_ing',
    'drew',
    '_s',
    '_er'
  ],
  [
    'drink',
    '_ing',
    'drank',
    '_s',
    '_er'
  ],
  [
    'drive',
    'driving',
    'drove',
    '_s',
    '_r'
  ],
  [
    'eat',
    '_ing',
    'ate',
    '_s',
    '_er'
  ],
  [
    'fall',
    '_ing',
    'fell',
    '_s',
    '_er'
  ],
  [
    'feed',
    '_ing',
    'fed',
    '_s',
    '_er'
  ],
  [
    'feel',
    '_ing',
    'felt',
    '_s',
    '_er'
  ],
  [
    'fight',
    '_ing',
    'fought',
    '_s',
    '_er'
  ],
  [
    'find',
    '_ing',
    'found',
    '_s',
    '_er'
  ],
  [
    'fly',
    '_ing',
    'flew',
    '_s',
    'flier'
  ],
  [
    'forbid',
    '_ing',
    'forbade',
    '_s',

  ],
  [
    'forget',
    '_ing',
    'forgot',
    '_s',
    '_er'
  ],
  [
    'forgive',
    'forgiving',
    'forgave',
    '_s',
    '_r'
  ],
  [
    'freeze',
    'freezing',
    'froze',
    '_s',
    '_r'
  ],
  [
    'get',
    '_ting',
    'got',
    '_s',
    '_ter'
  ],
  [
    'give',
    'giving',
    'gave',
    '_s',
    '_r'
  ],
  [
    'go',
    '_ing',
    'went',
    '_es',
    '_er'
  ],
  [
    'grow',
    '_ing',
    'grew',
    '_s',
    '_er'
  ],
  [
    'hang',
    '_ing',
    'hung',
    '_s',
    '_er'
  ],
  [
    'have',
    'having',
    'had',
    'has',

  ],
  [
    'hear',
    '_ing',
    '_d',
    '_s',
    '_er'
  ],
  [
    'hide',
    'hiding',
    'hid',
    '_s',
    '_r'
  ],
  [
    'hit',
    '_ting',
    '_',
    '_s',
    '_ter'
  ],
  [
    'hold',
    '_ing',
    'held',
    '_s',
    '_er'
  ],
  [
    'hurt',
    '_ing',
    '_',
    '_s',
    '_er'
  ],
  [
    'know',
    '_ing',
    'knew',
    '_s',
    '_er'
  ],
  [
    'relay',
    '_ing',
    '_ed',
    '_s',
    '_er'
  ],
  [
    'lay',
    '_ing',
    'laid',
    '_s',
    '_er'
  ],
  [
    'lead',
    '_ing',
    'led',
    '_s',
    '_er'
  ],
  [
    'leave',
    'leaving',
    'left',
    '_s',
    '_r'
  ],
  [
    'lend',
    '_ing',
    'lent',
    '_s',
    '_er'
  ],
  [
    'let',
    '_ting',
    '_',
    '_s',
    '_ter'
  ],
  [
    'lie',
    'lying',
    'lay',
    '_s',
    '_r'
  ],
  [
    'light',
    '_ing',
    'lit',
    '_s',
    '_er'
  ],
  [
    'lose',
    'losing',
    'lost',
    '_s',
    '_r'
  ],
  [
    'make',
    'making',
    'made',
    '_s',
    '_r'
  ],
  [
    'mean',
    '_ing',
    '_t',
    '_s',
    '_er'
  ],
  [
    'meet',
    '_ing',
    'met',
    '_s',
    '_er'
  ],
  [
    'pay',
    '_ing',
    'paid',
    '_s',
    '_er'
  ],
  [
    'put',
    '_ting',
    '_',
    '_s',
    '_ter'
  ],
  [
    'quit',
    '_ting',
    '_',
    '_s',
    '_ter'
  ],
  [
    'read',
    '_ing',
    '_',
    '_s',
    '_er'
  ],
  [
    'ride',
    'riding',
    'rode',
    '_s',
    '_r'
  ],
  [
    'ring',
    '_ing',
    'rang',
    '_s',
    '_er'
  ],
  [
    'rise',
    'rising',
    'rose',
    '_s',
    '_r'
  ],
  [
    'run',
    '_ning',
    'ran',
    '_s',
    '_ner'
  ],
  [
    'say',
    '_ing',
    'said',
    '_s',

  ],
  [
    'see',
    '_ing',
    'saw',
    '_s',
    '_r'
  ],
  [
    'sell',
    '_ing',
    'sold',
    '_s',
    '_er'
  ],
  [
    'send',
    '_ing',
    'sent',
    '_s',
    '_er'
  ],
  [
    'set',
    '_ting',
    '_',
    '_s',
    '_ter'
  ],
  [
    'shake',
    'shaking',
    'shook',
    '_s',
    '_r'
  ],
  [
    'shine',
    'shining',
    'shone',
    '_s',
    '_r'
  ],
  [
    'shoot',
    '_ing',
    'shot',
    '_s',
    '_er'
  ],
  [
    'show',
    '_ing',
    '_ed',
    '_s',
    '_er'
  ],
  [
    'shut',
    '_ting',
    '_',
    '_s',
    '_ter'
  ],
  [
    'sing',
    '_ing',
    'sang',
    '_s',
    '_er'
  ],
  [
    'sink',
    '_ing',
    'sank',
    '_s',
    '_er'
  ],
  [
    'sit',
    '_ting',
    'sat',
    '_s',
    '_ter'
  ],
  [
    'slide',
    'sliding',
    'slid',
    '_s',
    '_r'
  ],
  [
    'speak',
    '_ing',
    'spoke',
    '_s',
    '_er'
  ],
  [
    'spend',
    '_ing',
    'spent',
    '_s',
    '_er'
  ],
  [
    'spin',
    '_ning',
    'spun',
    '_s',
    '_ner'
  ],
  [
    'spread',
    '_ing',
    '_',
    '_s',
    '_er'
  ],
  [
    'stand',
    '_ing',
    'stood',
    '_s',
    '_er'
  ],
  [
    'steal',
    '_ing',
    'stole',
    '_s',
    '_er'
  ],
  [
    'stick',
    '_ing',
    'stuck',
    '_s',
    '_er'
  ],
  [
    'sting',
    '_ing',
    'stung',
    '_s',
    '_er'
  ],
  [
    'strike',
    'striking',
    'struck',
    '_s',
    '_r'
  ],
  [
    'swear',
    '_ing',
    'swore',
    '_s',
    '_er'
  ],
  [
    'swim',
    '_ing',
    'swam',
    '_s',
    '_mer'
  ],
  [
    'swing',
    '_ing',
    'swung',
    '_s',
    '_er'
  ],
  [
    'take',
    'taking',
    'took',
    '_s',
    '_r'
  ],
  [
    'teach',
    '_ing',
    'taught',
    '_s',
    '_er'
  ],
  [
    'tear',
    '_ing',
    'tore',
    '_s',
    '_er'
  ],
  [
    'tell',
    '_ing',
    'told',
    '_s',
    '_er'
  ],
  [
    'think',
    '_ing',
    'thought',
    '_s',
    '_er'
  ],
  [
    'throw',
    '_ing',
    'threw',
    '_s',
    '_er'
  ],
  [
    'understand',
    '_ing',
    'understood',
    '_s',

  ],
  [
    'wake',
    'waking',
    'woke',
    '_s',
    '_r'
  ],
  [
    'wear',
    '_ing',
    'wore',
    '_s',
    '_er'
  ],
  [
    'win',
    '_ning',
    'won',
    '_s',
    '_ner'
  ],
  [
    'withdraw',
    '_ing',
    'withdrew',
    '_s',
    '_er'
  ],
  [
    'write',
    'writing',
    'wrote',
    '_s',
    '_r'
  ],
  [
    'tie',
    'tying',
    '_d',
    '_s',
    '_r'
  ],
  [
    'obey',
    '_ing',
    '_ed',
    '_s',
    '_er'
  ],
  [
    'ski',
    '_ing',
    '_ied',
    '_s',
    '_er'
  ],
  [
    'boil',
    '_ing',
    '_ed',
    '_s',
    '_er'
  ],
  [
    'miss',
    '_ing',
    '_ed',
    '_',
    '_er'
  ],
  [
    'act',
    '_ing',
    '_ed',
    '_s',
    '_or'
  ],
  [
    'compete',
    'competing',
    '_d',
    '_s',
    'competitor'
  ],
  [
    'being',
    'are',
    'were',
    'are',

  ],
  [
    'imply',
    '_ing',
    'implied',
    'implies',
    'implier'
  ],
  [
    'ice',
    'icing',
    '_d',
    '_s',
    '_r'
  ],
  [
    'develop',
    '_ing',
    '_',
    '_s',
    '_er'
  ],
  [
    'wait',
    '_ing',
    '_ed',
    '_s',
    '_er'
  ],
  [
    'aim',
    '_ing',
    '_ed',
    '_s',
    '_er'
  ],
  [
    'spill',
    '_ing',
    'spilt',
    '_s',
    '_er'
  ],
  [
    'drop',
    '_ping',
    '_ped',
    '_s',
    '_per'
  ],
  [
    'head',
    '_ing',
    '_ed',
    '_s',
    '_er'
  ],
  [
    'log',
    '_ging',
    '_ged',
    '_s',
    '_ger'
  ],
  [
    'rub',
    '_bing',
    '_bed',
    '_s',
    '_ber'
  ],
  [
    'smash',
    '_ing',
    '_ed',
    '_es',
    '_er'
  ],
  [
    'add',
    '_ing',
    '_ed',
    '_s',
    '_er'
  ],
  [
    'word',
    '_ing',
    '_ed',
    '_s',
    '_er'
  ],
  [
    'suit',
    '_ing',
    '_ed',
    '_s',
    '_er'
  ],
  [
    'be',
    'am',
    'was',
    'am',
    ''
  ],
  [
    'load',
    '_ing',
    '_ed',
    '_s',
    '_er'
  ]
];
//expand compact version out
module.exports = compact.map(function(arr) {
  const obj = {};
  for (let i = 0; i < arr.length; i++) {
    obj[types[i]] = arr[i].replace(/_/, arr[0]);
  }
  return obj;
});

// console.log(JSON.stringify(module.exports, null, 2));

},{}],17:[function(require,module,exports){
//most-frequent non-irregular verbs, to be conjugated for the lexicon
//this list is the seed, from which various forms are conjugated
module.exports = [
  'collapse',
  'stake',
  'forsee',
  'suck',
  'answer',
  'argue',
  'tend',
  'examine',
  'depend',
  'form',
  'figure',
  'mind',
  'surround',
  'suspect',
  'reflect',
  'wonder',
  'hope',
  'end',
  'thank',
  'file',
  'regard',
  'report',
  'imagine',
  'consider',
  'ensure',
  'cause',
  'work',
  'enter',
  'stop',
  'defeat',
  'surge',
  'launch',
  'turn',
  'like',
  'control',
  'relate',
  'remember',
  'join',
  'listen',
  'train',
  'spring',
  'enjoy',
  'fail',
  'recognize',
  'obtain',
  'learn',
  'fill',
  'announce',
  'prevent',
  'achieve',
  'realize',
  'involve',
  'remove',
  'aid',
  'visit',
  'test',
  'prepare',
  'ask',
  'carry',
  'suppose',
  'determine',
  'raise',
  'love',
  'use',
  'pull',
  'improve',
  'contain',
  'offer',
  'talk',
  'pick',
  'care',
  'express',
  'remain',
  'operate',
  'close',
  'add',
  'mention',
  'support',
  'decide',
  'walk',
  'vary',
  'demand',
  'describe',
  'agree',
  'happen',
  'allow',
  'suffer',
  'study',
  'press',
  'watch',
  'seem',
  'occur',
  'contribute',
  'claim',
  'compare',
  'apply',
  'direct',
  'discuss',
  'indicate',
  'require',
  'change',
  'fix',
  'reach',
  'prove',
  'expect',
  'exist',
  'play',
  'permit',
  'kill',
  'charge',
  'increase',
  'believe',
  'create',
  'continue',
  'live',
  'help',
  'represent',
  'edit',
  'serve',
  'appear',
  'cover',
  'maintain',
  'start',
  'stay',
  'move',
  'extend',
  'design',
  'supply',
  'suggest',
  'want',
  'approach',
  'call',
  'include',
  'try',
  'receive',
  'save',
  'discover',
  'marry',
  'need',
  'establish',
  'keep',
  'assume',
  'attend',
  'unite',
  'explain',
  'publish',
  'accept',
  'settle',
  'reduce',
  'do',
  'look',
  'interact',
  'concern',
  'labor',
  'return',
  'select',
  'die',
  'provide',
  'seek',
  'wish',
  'finish',
  'follow',
  'disagree',
  'produce',
  'attack',
  'attempt',
  'brake',
  'brush',
  'burn',
  'bang',
  'bomb',
  'budget',
  'comfort',
  'cook',
  'copy',
  'cough',
  'crush',
  'cry',
  'check',
  'claw',
  'clip',
  'combine',
  'damage',
  'desire',
  'doubt',
  'drain',
  'dance',
  'decrease',
  'defect',
  'deposit',
  'drift',
  'dip',
  'dive',
  'divorce',
  'dream',
  'exchange',
  'envy',
  'exert',
  'exercise',
  'export',
  'fold',
  'flood',
  'focus',
  'forecast',
  'fracture',
  'grip',
  'guide',
  'guard',
  'guarantee',
  'guess',
  'hate',
  'heat',
  'handle',
  'hire',
  'host',
  'hunt',
  'hurry',
  'import',
  'judge',
  'jump',
  'jam',
  'kick',
  'kiss',
  'knock',
  'laugh',
  'lift',
  'lock',
  'lecture',
  'link',
  'load',
  'loan',
  'lump',
  'melt',
  'message',
  'murder',
  'neglect',
  'overlap',
  'overtake',
  'overuse',
  'print',
  'protest',
  'pump',
  'push',
  'post',
  'progress',
  'promise',
  'purchase',
  'regret',
  'request',
  'reward',
  'roll',
  'rub',
  'rent',
  'repair',
  'sail',
  'scale',
  'screw',
  'shock',
  'sleep',
  'slip',
  'smash',
  'smell',
  'smoke',
  'sneeze',
  'snow',
  'surprise',
  'scratch',
  'search',
  'share',
  'shave',
  'spit',
  'splash',
  'stain',
  'stress',
  'switch',
  'taste',
  'touch',
  'trade',
  'trick',
  'twist',
  'trap',
  'travel',
  'tune',
  'undergo',
  'undo',
  'uplift',
  'vote',
  'wash',
  'wave',
  'whistle',
  'wreck',
  'yawn',
  'betray',
  'restrict',
  'perform',
  'worry',
  'point',
  'activate',
  'fear',
  'plan',
  'note',
  'face',
  'predict',
  'differ',
  'deserve',
  'torture',
  'recall',
  'count',
  'admit',
  'insist',
  'lack',
  'pass',
  'belong',
  'complain',
  'constitute',
  'rely',
  'refuse',
  'range',
  'cite',
  'flash',
  'arrive',
  'reveal',
  'consist',
  'observe',
  'notice',
  'trust',
  'display',
  'view',
  'stare',
  'acknowledge',
  'owe',
  'gaze',
  'treat',
  'account',
  'gather',
  'address',
  'confirm',
  'estimate',
  'manage',
  'participate',
  'sneak',
  'drop',
  'mirror',
  'experience',
  'strive',
  'arch',
  'dislike',
  'favor',
  'earn',
  'emphasize',
  'match',
  'question',
  'emerge',
  'encourage',
  'matter',
  'name',
  'head',
  'line',
  'slam',
  'list',
  'warn',
  'ignore',
  'resemble',
  'feature',
  'place',
  'reverse',
  'accuse',
  'spoil',
  'retain',
  'survive',
  'praise',
  'function',
  'please',
  'date',
  'remind',
  'deliver',
  'echo',
  'engage',
  'deny',
  'yield',
  'center',
  'gain',
  'anticipate',
  'reason',
  'side',
  'thrive',
  'defy',
  'dodge',
  'enable',
  'applaud',
  'bear',
  'persist',
  'pose',
  'reject',
  'attract',
  'await',
  'inhibit',
  'declare',
  'process',
  'risk',
  'urge',
  'value',
  'block',
  'confront',
  'credit',
  'cross',
  'amuse',
  'dare',
  'resent',
  'smile',
  'gloss',
  'threaten',
  'collect',
  'depict',
  'dismiss',
  'submit',
  'benefit',
  'step',
  'deem',
  'limit',
  'sense',
  'issue',
  'embody',
  'force',
  'govern',
  'replace',
  'bother',
  'cater',
  'adopt',
  'empower',
  'outweigh',
  'alter',
  'enrich',
  'influence',
  'prohibit',
  'pursue',
  'warrant',
  'convey',
  'approve',
  'reserve',
  'rest',
  'strain',
  'wander',
  'adjust',
  'dress',
  'market',
  'mingle',
  'disapprove',
  'evaluate',
  'flow',
  'inhabit',
  'pop',
  'rule',
  'depart',
  'roam',
  'assert',
  'disappear',
  'envision',
  'pause',
  'afford',
  'challenge',
  'grab',
  'grumble',
  'house',
  'portray',
  'revel',
  'base',
  'conduct',
  'review',
  'stem',
  'crave',
  'mark',
  'store',
  'target',
  'unlock',
  'weigh',
  'resist',
  'drag',
  'pour',
  'reckon',
  'assign',
  'cling',
  'rank',
  'attach',
  'decline',
  'destroy',
  'interfere',
  'paint',
  'skip',
  'sprinkle',
  'wither',
  'allege',
  'retire',
  'score',
  'monitor',
  'expand',
  'honor',
  'pack',
  'assist',
  'float',
  'appeal',
  'stretch',
  'undermine',
  'assemble',
  'boast',
  'bounce',
  'grasp',
  'install',
  'borrow',
  'crack',
  'elect',
  'shout',
  'contrast',
  'overcome',
  'relax',
  'relent',
  'strengthen',
  'conform',
  'dump',
  'pile',
  'scare',
  'relive',
  'resort',
  'rush',
  'boost',
  'cease',
  'command',
  'excel',
  'plug',
  'plunge',
  'proclaim',
  'discourage',
  'endure',
  'ruin',
  'stumble',
  'abandon',
  'cheat',
  'convince',
  'merge',
  'convert',
  'harm',
  'multiply',
  'overwhelm',
  'chew',
  'invent',
  'bury',
  'wipe',
  'added',
  'took',
  'define',
  'goes',
  'measure',
  'enhance',
  'distinguish',
  'avoid',
  //contractions
  'don\'t',
  'won\'t',
  'what\'s' //somewhat ambiguous (what does|what are)
];

},{}],18:[function(require,module,exports){
'use strict';
exports.pluck = function(arr, str) {
  arr = arr || [];
  return arr.map(function(o) {
    return o[str];
  });
};

exports.flatten = function(arr) {
  let all = [];
  arr.forEach(function(a) {
    all = all.concat(a);
  });
  return all;
};

exports.sameArr = function(arr, arrB) {
  if (typeof arr !== typeof arrB || arr.length !== arrB.length) {
    return null;
  }
  for(let i = 0; i < arr.length; i++) {
    if (arr[i] !== arrB[i]) {
      return false;
    }
  }
  return true;
};

exports.compact = function(arr) {
  return arr.filter(function(a) {
    if (a === undefined || a === null) {
      return false;
    }
    return true;
  });
};

//string utilities
exports.endsWith = function(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

exports.titlecase = function(str) {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

},{}],19:[function(require,module,exports){
'use strict';
const Term = require('./term/term.js');
const Text = require('./text/text.js');
const Verb = require('./term/verb/verb.js');
const Adjective = require('./term/adjective/adjective.js');
const Adverb = require('./term/adverb/adverb.js');

const Noun = require('./term/noun/noun.js');
const Value = require('./term/noun/value/value.js');
const Person = require('./term/noun/person/person.js');
const Place = require('./term/noun/place/place.js');
const _Date = require('./term/noun/date/date.js');
const Organisation = require('./term/noun/organisation/organisation.js');

const Lexicon = require('./lexicon.js');

//function returns a text object if there's a param, otherwise
const API = function(str) {
  this.Term = function(s) {
    return new Term(s);
  };
  this.Verb = function(s) {
    return new Verb(s);
  };
  this.Adverb = function(s) {
    return new Adverb(s);
  };
  this.Adjective = function(s) {
    return new Adjective(s);
  };
  this.Text = function(s) {
    return new Text(s);
  };

  this.Noun = function(s) {
    return new Noun(s);
  };
  this.Person = function(s) {
    return new Person(s);
  };
  this.Date = function(s) {
    return new _Date(s);
  };
  this.Value = function(s) {
    return new Value(s);
  };
  this.Place = function(s) {
    return new Place(s);
  };
  this.Organisation = function(s) {
    return new Organisation(s);
  };
  this.Lexicon = Lexicon;
  if (str) {
    return new Text(str);
  }
};

let nlp = new API;
if (typeof window === 'object') {
  window.nlp = nlp;
}
module.exports = nlp;

// let n = nlp.Text('The pen blew up');
let n = nlp.Verb('sufferer').negate();
console.log(n);

},{"./lexicon.js":20,"./term/adjective/adjective.js":28,"./term/adverb/adverb.js":33,"./term/noun/date/date.js":38,"./term/noun/noun.js":43,"./term/noun/organisation/organisation.js":45,"./term/noun/person/person.js":49,"./term/noun/place/place.js":51,"./term/noun/value/value.js":59,"./term/term.js":61,"./term/verb/verb.js":68,"./text/text.js":71}],20:[function(require,module,exports){
//the lexicon is a big hash of words to pos tags
//it's built by conjugating and inflecting a small seed of terms
'use strict';
const fns = require('./fns.js');
const verb_conjugate = require('./term/verb/conjugate/conjugate.js');
const to_comparative = require('./term/adjective/to_comparative.js');
const to_superlative = require('./term/adjective/to_superlative.js');
const grand_mapping = require('./sentence/pos/pos.js').tag_mapping;

const lexicon = {};

const addObj = function(obj) {
  const keys = Object.keys(obj);
  const l = keys.length;
  for (let i = 0; i < l; i++) {
    lexicon[keys[i]] = obj[keys[i]];
  }
};

const addArr = function(arr, tag) {
  const l = arr.length;
  for (let i = 0; i < l; i++) {
    lexicon[arr[i]] = tag;
  }
};

//conjugate all verbs.
const verbMap = {
  infinitive: 'Infinitive',
  present: 'PresentTense',
  past: 'PastTense',
  present: 'PresentTense',
  gerund: 'Gerund',
  actor: 'Actor',
  future: 'FutureTense',
  pluperfect: 'PluperfectTense',
  perfect: 'PerfectTense',

  PerfectTense: 'PerfectTense',
  PluperfectTense: 'PluperfectTense',
  FutureTense: 'FutureTense',
  PastTense: 'PastTense',
  PresentTense: 'PresentTense',
};
const verbs = require('./data/verbs.js');
for (let i = 0; i < verbs.length; i++) {
  const o = verb_conjugate(verbs[i]);
  Object.keys(o).forEach(function(k) {
    if (k && o[k] && verbMap[k]) {
      lexicon[o[k]] = verbMap[k];
    }
  });
}
//irregular verbs
require('./data/verb_irregulars.js').forEach(function(o) {
  Object.keys(o).forEach(function(k) {
    if (k && o[k]) {
      lexicon[o[k]] = verbMap[k];
    }
  });
});

let orgs = require('./data/organisations.js');
addArr(orgs.organisations, 'Noun');
addArr(orgs.suffixes, 'Noun');

let places = require('./data/places.js');
addArr(places.countries, 'Place');
addArr(places.cities, 'Place');

require('./data/adjectives.js').forEach(function(s) {
  lexicon[s] = 'Adjective';
  lexicon[to_comparative(s)] = 'Comparative';
  lexicon[to_superlative(s)] = 'Superlative';
});
addObj(require('./data/convertables.js'));

addArr(require('./data/abbreviations.js').abbreviations, 'Abbreviation');
addArr(require('./data/demonyms.js'), 'Adjective');
addArr(require('./data/honourifics.js'), 'Honourific');
addArr(require('./data/uncountables.js'), 'Noun');
addArr(require('./data/dates.js'), 'Date');
addArr(require('./data/numbers.js'), 'Value');
//a little fancy
addArr(Object.keys(require('./data/firstnames.js')), 'Person');
//add irregular nouns
const irregNouns = require('./data/irregular_nouns.js');
addArr(fns.pluck(irregNouns, 0), 'Noun');
addArr(fns.pluck(irregNouns, 1), 'Plural');

addObj(require('./data/misc.js'));
addObj(require('./data/multiples.js'));
addObj(require('./data/phrasal_verbs.js'));

//just in case
delete lexicon[false];
delete lexicon[true];
delete lexicon[undefined];
delete lexicon[null];
delete lexicon[''];

//use 'Noun', not 'NN'
Object.keys(lexicon).forEach(function(k) {
  if (!grand_mapping[lexicon[k]]) {
    // console.log(lexicon[k]);
  }
  lexicon[k] = grand_mapping[lexicon[k]] || lexicon[k];
});


// console.log(Object.keys(lexicon).length)
// console.log(lexicon)

// console.log(lexicon['once again'] === 'RB');
// console.log(lexicon['seven'] === 'Value');
// console.log(lexicon['sleep'] === 'VBP');
// console.log(lexicon['slept'] === 'VBD');
// console.log(lexicon['sleeping'] === 'VBG');
// console.log(lexicon['canadian'] === 'JJ');
// console.log(lexicon['july'] === 'Value');
// console.log(lexicon[null] === undefined);
// console.log(lexicon['dr'] === 'NNAB');
// console.log(lexicon['sounds'] === 'VBZ');
// console.log(lexicon['look after'] === 'VBP');
// console.log(lexicon['tony'] === 'Noun');
// console.log(lexicon['loaf'] === 'Noun');
// console.log(lexicon['loaves'] === 'NNS');
// console.log(lexicon['he'] === 'PRP');
// console.log(lexicon['canada'] === 'Noun');
// console.log(lexicon['is']);

module.exports = lexicon;

},{"./data/abbreviations.js":1,"./data/adjectives.js":2,"./data/convertables.js":3,"./data/dates.js":4,"./data/demonyms.js":5,"./data/firstnames.js":6,"./data/honourifics.js":7,"./data/irregular_nouns.js":8,"./data/misc.js":9,"./data/multiples.js":10,"./data/numbers.js":11,"./data/organisations.js":12,"./data/phrasal_verbs.js":13,"./data/places.js":14,"./data/uncountables.js":15,"./data/verb_irregulars.js":16,"./data/verbs.js":17,"./fns.js":18,"./sentence/pos/pos.js":24,"./term/adjective/to_comparative.js":30,"./term/adjective/to_superlative.js":32,"./term/verb/conjugate/conjugate.js":62}],21:[function(require,module,exports){
//add a 'quiet' token for contractions so we can represent their grammar
//some contractions need detailed POS tense info, to resolve the is/was/has part
'use strict';
const pos = require('../../sentence/pos/pos.js');

const easy_contractions = {
  'i\'d': ['i', 'would'],
  'she\'d': ['she', 'would'],
  'he\'d': ['he', 'would'],
  'they\'d': ['they', 'would'],
  'we\'d': ['we', 'would'],
  'i\'ll': ['i', 'will'],
  'she\'ll': ['she', 'will'],
  'he\'ll': ['he', 'will'],
  'they\'ll': ['they', 'will'],
  'we\'ll': ['we', 'will'],
  'i\'ve': ['i', 'have'],
  'they\'ve': ['they', 'have'],
  'we\'ve': ['we', 'have'],
  'should\'ve': ['should', 'have'],
  'would\'ve': ['would', 'have'],
  'could\'ve': ['could', 'have'],
  'must\'ve': ['must', 'have'],
  'i\'m': ['i', 'am'],
  'we\'re': ['we', 'are'],
  'they\'re': ['they', 'are'],
  'cannot': ['can', 'not']
};
let ambiguous = {
  'he\'s': 'he',
  'she\'s': 'she',
  'it\'s': 'it',
  'who\'s': 'who',
  'what\'s': 'what',
  'where\'s': 'where',
  'when\'s': 'when',
  'why\'s': 'why',
  'how\'s': 'how'
};


//take remaining sentence after contraction and decide which verb fits best [is/was/has]
let chooseVerb = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    //he's nice
    if (terms[i].pos['Adjective']) {
      return 'is';
    }
    //he's followed
    if (terms[i].tag === 'PastTense') {
      return 'has';
    }
    //he's following
    if (terms[i].tag === 'Gerund') {
      return 'is';
    }
  }
  return 'is';
};

const easy_ones = function(terms) {
  for (let i = 0; i < terms.length; i++) {
    const t = terms[i];
    if (easy_contractions[t.normal]) {
      let pronoun = easy_contractions[t.normal][0];
      let verb = easy_contractions[t.normal][1];
      let new_terms = [new pos.Term(pronoun), new pos.Verb(verb)];
      const fixup = [].concat(
        terms.slice(0, i),
        new_terms,
        terms.slice(i + 1, terms.length)
      );
      return easy_ones(fixup); //recursive
    }
  }
  return terms;
};

const hard_ones = function(terms) {
  for (let i = 0; i < terms.length; i++) {
    const t = terms[i];
    if (ambiguous[t.normal]) {
      let pronoun = ambiguous[t.normal];
      let verb = chooseVerb(terms.slice(i, terms.length)); //send the rest of the sentence over
      let new_terms = [new pos.Term(pronoun), new pos.Verb(verb)];
      const fixup = [].concat(
        terms.slice(0, i),
        new_terms,
        terms.slice(i + 1, terms.length)
      );
      return hard_ones(fixup); //recursive
    }
  }
  return terms;
};


module.exports = {
  easy_ones,
  hard_ones
};

},{"../../sentence/pos/pos.js":24}],22:[function(require,module,exports){
//fancy combining/chunking of terms
'use strict';
const pos = require('./pos');

const shouldLumpThree = function(a, b, c) {
  if (!a || !b || !c) {
    return false;
  }
  const lump_rules = [
    {
      condition: (a.pos.Noun && b.text === '&' && c.pos.Noun), //John & Joe's
      result: 'Person',
    },
    {
      condition: (a.pos.Noun && b.text === 'N' && c.pos.Noun), //John N Joe's
      result: 'Person',
    },
    {
      condition: (a.pos.Date && b.normal === 'the' && c.pos.Value), //June the 5th
      result: 'Person',
    },
    {
      condition: (a.is_capital() && b.normal === 'of' && c.is_capital()), //President of Mexico
      result: 'Noun',
    },
    {
      condition: (a.text.match(/^["']/) && !b.text.match(/["']/) && c.match(/["']$/)), //three-word quote
      result: 'Noun',
    },
    {
      condition: (a.normal === 'will' && b.normal === 'have' && b.pos.Verb), //will have walk
      result: 'FutureTense',
    },
  ];
  for(let i = 0; i < lump_rules.length; i++) {
    if (lump_rules[i].condition) {
      return lump_rules[i].result;
    }
  }
  return false;
};

const shouldLumpTwo = function(a, b) {
  if (!a || !b) {
    return false;
  }
  const lump_rules = [
    {
      condition: (a.pos.Person && b.pos.Honourific || a.pos.Honourific && b.pos.Person), //"John sr."
      result: 'Person',
    },
    {
      condition: (a.pos.Honourific && b.is_capital()), //'Dr. John
      result: 'Person',
    },
    {
      condition: (a.pos.Person && b.is_capital()), //'Person, Capital -> Person'
      result: 'Person',
    },
    {
      condition: (a.pos.Date && b.pos.Value), //June 4
      result: 'Date',
    },
    {
      condition: (a.pos.Value && b.pos.Noun), //5 books
      result: 'Value',
    },
    {
      condition: (a.is_capital() && b.pos['Organisation'] || b.is_capital() && a.pos['Organisation']), //Canada Inc
      result: 'Organisation',
    },
    {
      condition: (a.text.match(/^["']/) && b.text.match(/["']$/)), //two-word quote
      result: 'Noun',
    },
    {
      condition: (a.normal === 'will' && b.pos.Verb), //will walk (perfect)
      result: 'PerfectTense',
    },
    {
      condition: (a.normal.match(/^will ha(ve|d)$/) && b.pos.Verb), //will have walked (pluperfect)
      result: 'PluperfectTense',
    },
  ];
  for(let i = 0; i < lump_rules.length; i++) {
    if (lump_rules[i].condition) {
      return lump_rules[i].result;
    }
  }
  return false;
};


const fancy_lumping = function(terms) {
  for(let i = 1; i < terms.length; i++) {
    let a = terms[i - 1];
    let b = terms[i];
    let c = terms[i + 1];

    // rules for lumping two terms
    let tag = shouldLumpTwo(a, b);
    if (tag !== false) {
      let Cl = pos.classMapping[tag] || pos.Term;
      terms[i] = new Cl(a.text + ' ' + b.text, tag);
      terms[i].reason = 'lumped(' + terms[i].reason + ')';
      terms[i - 1] = null;
      continue;
    }

    // rules for lumpting three terms
    if (c) {
      tag = shouldLumpThree(a, b, c);
      if (tag !== false) {
        let Cl = pos.classMapping[tag] || pos.Term;
        terms[i - 1] = new Cl([a.text, b.text, c.text].join(' '), tag);
        terms[i - 1].reason = 'lumped(' + terms[i].reason + ')';
        terms[i] = null;
        terms[i + 1] = null;
        continue;
      }
    }

  }
  //remove killed terms
  terms = terms.filter(function(t) {
    return t !== null;
  });
  return terms;
};


module.exports = fancy_lumping;

},{"./pos":24}],23:[function(require,module,exports){
module.exports = [
  {
    'before': ['Determiner', '?'],
    'after': ['Determiner', 'Noun']
  },
  {
    'before': ['Determiner', 'Adjective', 'Verb'],
    'after': ['Noun', 'Noun', 'Noun']
  },
  {
    'before': ['Determiner', 'Adverb', 'Adjective', '?'],
    'after': ['Determiner', 'Adverb', 'Adjective', 'Noun'],
  },
  {
    'before': ['Unknown', 'Determiner', 'Noun'],
    'after': ['Verb', 'Determiner', 'Noun'],
  },
  //posessive hints
  {
    'before': ['Posessive', 'Unknown'],
    'after': ['Posessive', 'Noun'],
  },
  {
    'before': ['Posessive', 'Verb'],
    'after': ['Posessive', 'Noun'],
  },
  {
    'before': ['Unknown', 'Posessive', 'Noun'],
    'after': ['Verb', 'Posessive', 'Noun'],
  },
  //copula hints
  {
    'before': ['Copula', 'Unknown'],
    'after': ['Copula', 'Adjective'], // not sure
  },
  {
    'before': ['Copula', 'Adverb', '?'],
    'after': ['Copula', 'Adverb', 'Adjective'], // not sure
  },
  //preposition hints
  {
    'before': ['Unknown', 'Preposition'],
    'after': ['Verb', 'Preposition'],
  },
  //conjunction hints, like lists (a little sloppy)
  {
    'before': ['Adverb', 'Conjunction', 'Adverb'],
    'after': ['Adverb', 'Adverb', 'Adverb'],
  },
  {
    'before': ['Verb', 'Conjunction', 'Verb'],
    'after': ['Verb', 'Verb', 'Verb'],
  },
  {
    'before': ['Noun', 'Conjunction', 'Noun'],
    'after': ['Noun', 'Noun', 'Noun'],
  },
  {
    'before': ['Adjective', 'Conjunction', 'Adjective'],
    'after': ['Adjective', 'Adjective', 'Adjective'],
  },
  {
    'before': ['Unknown', 'Conjunction', 'Verb'],
    'after': ['Verb', 'Conjunction', 'Verb'],
  },
  {
    'before': ['Verb', 'Conjunction', 'Unknown'],
    'after': ['Verb', 'Conjunction', 'Verb'],
  },
  //adverb hints
  {
    'before': ['Noun', 'Adverb', 'Noun'],
    'after': ['Noun', 'Adverb', 'Verb'],
  },
  //pronoun hints
  {
    'before': ['Unknown', 'Pronoun'],
    'after': ['Verb', 'Pronoun'],
  },
  //modal hints
  {
    'before': ['Modal', 'Unknown'],
    'after': ['Modal', 'Verb'],
  },
  {
    'before': ['Modal', 'Adverb', '?'],
    'after': ['Modal', 'Adverb', 'Verb'],
  },
  //ambiguous dates (march/may)
  {
    'before': ['Modal', 'Value'],
    'after': ['Modal', 'Verb'],
  },
  {
    'before': ['Adverb', 'Value'],
    'after': ['Adverb', 'Verb'],
  }
];

},{}],24:[function(require,module,exports){

const Term = require('../../term/term.js');

const Verb = require('../../term/verb/verb.js');
const Adverb = require('../../term/adverb/adverb.js');
const Adjective = require('../../term/adjective/adjective.js');

const Noun = require('../../term/noun/noun.js');
const Person = require('../../term/noun/person/person.js');
const Place = require('../../term/noun/place/place.js');
const Organisation = require('../../term/noun/organisation/organisation.js');
const Value = require('../../term/noun/value/value.js');
const _Date = require('../../term/noun/date/date.js');


const tag_mapping = {
  //nouns
  'NNA': 'Acronym',
  'NNS': 'Plural',
  'NN': 'Noun',
  'NNO': 'Posessive',
  'CD': 'Value',
  // 'NNP': 'Noun',
  // 'NNPA': 'Noun',
  // 'NNAB': 'Noun',
  // 'NNPS': 'Noun',
  // 'NNG': 'Noun',
  // 'CD': 'Noun',
  // 'NU': 'Noun',
  // 'DA': 'Noun',

  //glue
  'PP': 'Posessive',
  'PRP': 'Pronoun',
  'UH': 'Expression', //interjection
  'FW': 'Expression', //foreign-word
  'DT': 'Determiner',
  'CC': 'Conjunction',
  'IN': 'Preposition',

  //verbs
  'VB': 'Verb',
  'VBD': 'PastTense',
  'VBF': 'FutureTense',
  'VBP': 'Infinitive',
  'VBZ': 'PresentTense',
  'VBG': 'Gerund',
  'VBN': 'Verb',
  'CP': 'Copula',
  'MD': 'Modal',
  'JJ': 'Adjective',
  'JJR': 'Comparative',
  'JJS': 'Superlative',
  'RB': 'Adverb',
};

const classMapping = {
  'Noun': Noun,
  'Honourific': Noun,
  'Acronym': Noun,
  'Plural': Noun,
  'Pronoun': Noun,
  'Actor': Noun,
  'Abbreviation': Noun,

  'Verb': Verb,
  'PresentTense': Verb,
  'FutureTense': Verb,
  'PastTense': Verb,
  'PresentTense': Verb,
  'Infinitive': Verb,
  'PerfectTense': Verb,
  'PluperfectTense': Verb,
  'Gerund': Verb,
  'Copula': Verb,
  'Modal': Verb,

  'Comparative': Adjective,
  'Superlative': Adjective,
  'Adjective': Adjective,

  'Determiner': Term,
  'Preposition': Term,
  'Expression': Term,
  'Conjunction': Term,
  'Posessive': Term,

  'Adverb': Adverb,
  'Value': Value,
  'Place': Place,
  'Person': Person,
  'Organisation': Organisation,
  'Date': _Date,
};

module.exports = {
  tag_mapping,
  classMapping,
  Term,
  'Date': _Date,
  Value,
  Verb,
  Person,
  Place,
  Organisation,
  Adjective,
  Adverb,
  Noun,
};

},{"../../term/adjective/adjective.js":28,"../../term/adverb/adverb.js":33,"../../term/noun/date/date.js":38,"../../term/noun/noun.js":43,"../../term/noun/organisation/organisation.js":45,"../../term/noun/person/person.js":49,"../../term/noun/place/place.js":51,"../../term/noun/value/value.js":59,"../../term/term.js":61,"../../term/verb/verb.js":68}],25:[function(require,module,exports){
//part-of-speech tagging
'use strict';
const contractions = require('./contractions');
const lexicon = require('../../lexicon.js');
const word_rules = require('./word_rules');
const grammar_rules = require('./grammar_rules');
const fancy_lumping = require('./fancy_lumping');
const fns = require('../../fns');
const pos = require('./pos');

//swap the Term object with a proper Pos class
const assign = function(t, tag, reason) {
  let P = pos.classMapping[tag] || pos.Term;
  t = new P(t.text, tag);
  t.reason = reason;
  return t;
};

//consult lexicon for this known-word
const lexicon_pass = function(terms) {
  return terms.map(function(t) {
    //check lexicon straight-up
    if (lexicon[t.normal] !== undefined) {
      return assign(t, lexicon[t.normal], 'lexicon_pass');
    }
    //try to match it without a prefix - eg. outworked -> worked
    if (t.normal.match(/^(over|under|out|-|un|re|en).{4}/)) {
      const attempt = t.normal.replace(/^(over|under|out|.*?-|un|re|en)/, '');
      return assign(t, lexicon[attempt], 'lexicon_prefix');
    }
    //match 'twenty-eight'
    if (t.normal.match(/-/)) {
      let sides = t.normal.split('-');
      if (lexicon[sides[0]]) {
        return assign(t, lexicon[sides[0]], 'lexicon_dash');
      }
      if (lexicon[sides[1]]) {
        return assign(t, lexicon[sides[1]], 'lexicon_dash');
      }
    }
    return t;
  });
};

//set POS for capitalised words
const capital_signals = function(terms) {
  //first words need careful rules
  if (terms[0].is_acronym()) {
    terms[0] = assign(terms[0], 'Noun', 'acronym');
  }
  //non-first-word capitals are nouns
  for (let i = 1; i < terms.length; i++) {
    if (terms[i].is_capital() || terms[i].is_acronym()) {
      terms[i] = assign(terms[i], 'Noun', 'capital_signal');
    }
  }
  return terms;
};

//regex hints for words/suffixes
const word_rules_pass = function(terms) {
  for (let i = 0; i < terms.length; i++) {
    if (terms[i].tag !== '?') {
      continue;
    }
    for (let o = 0; o < word_rules.length; o++) {
      if (terms[i].normal.length > 4 && terms[i].normal.match(word_rules[o].reg)) {
        terms[i] = assign(terms[i], word_rules[o].pos, 'rules_pass_' + o);
        break;
      }
    }
  }
  return terms;
};

//turn [noun, noun..] into [noun..]
const chunk_neighbours = function(terms) {
  let new_terms = [];
  let last = null;
  for(let i = 0; i < terms.length; i++) {
    let t = terms[i];
    if (last !== null && t.tag === last) {
      new_terms[new_terms.length - 1].text += ' ' + t.text;
      new_terms[new_terms.length - 1].normalize();
    } else {
      new_terms.push(t);
    }
    last = t.tag;
  }
  return new_terms;
};


//hints from the sentence grammar
const grammar_rules_pass = function(s) {
  let tags = s.tags();
  for(let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
    for(let o = 0; o < grammar_rules.length; o++) {
      let rule = grammar_rules[o];
      //does this rule match
      if (fns.sameArr(rule.before, tags.slice(i, i + rule.before.length))) {
        //change before/after for each term
        for(let c = 0; c < rule.before.length; c++) {
          s.terms[i + c] = assign(s.terms[i + c], rule.after[c], 'grammar_rule ' + c);
        }
      }
    }
  }
  return s.terms;
};

const noun_fallback = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    if (terms[i].tag === '?' && terms[i].normal.match(/[a-z]/)) {
      terms[i] = assign(terms[i], 'Noun', 'fallback');
    }
  }
  return terms;
};

//turn nouns into person/place
const specific_pos = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    let t = terms[i];
    if (t instanceof pos.Noun) {
      if (t.is_person()) {
        terms[i] = assign(t, 'Person');
      } else if (t.is_place()) {
        terms[i] = assign(t, 'Place');
      } else if (t.is_value()) {
        terms[i] = assign(t, 'Value');
      } else if (t.is_date()) {
        terms[i] = assign(t, 'Date');
      } else if (t.is_organisation()) {
        terms[i] = assign(t, 'Organisation');
      }
    }
  }
  return terms;
};

const tagger = function(s) {
  //word-level rules
  s.terms = capital_signals(s.terms);
  s.terms = contractions.easy_ones(s.terms);
  s.terms = lexicon_pass(s.terms);
  s.terms = word_rules_pass(s.terms);
  //repeat these steps a couple times, to wiggle-out the grammar
  for(let i = 0; i < 2; i++) {
    s.terms = grammar_rules_pass(s);
    s.terms = chunk_neighbours(s.terms);
    s.terms = noun_fallback(s.terms);
    s.terms = specific_pos(s.terms);
    s.terms = contractions.hard_ones(s.terms);
    s.terms = fancy_lumping(s.terms);
  }
  return s.terms;
};

module.exports = tagger;

},{"../../fns":18,"../../lexicon.js":20,"./contractions":21,"./fancy_lumping":22,"./grammar_rules":23,"./pos":24,"./word_rules":26}],26:[function(require,module,exports){
const tag_mapping = require('./pos.js').tag_mapping;
//regex patterns and parts of speech],
module.exports = [
  ['.[cts]hy$', 'JJ'],
  ['.[st]ty$', 'JJ'],
  ['.[lnr]ize$', 'VB'],
  ['.[gk]y$', 'JJ'],
  ['.fies$', 'VB'],
  ['.some$', 'JJ'],
  ['.[nrtumcd]al$', 'JJ'],
  ['.que$', 'JJ'],
  ['.[tnl]ary$', 'JJ'],
  ['.[di]est$', 'JJS'],
  ['^(un|de|re)\\-[a-z]..', 'VB'],
  ['.lar$', 'JJ'],
  ['[bszmp]{2}y', 'JJ'],
  ['.zes$', 'VB'],
  ['.[icldtgrv]ent$', 'JJ'],
  ['.[rln]ates$', 'VBZ'],
  ['.[oe]ry$', 'JJ'],
  ['[rdntkdhs]ly$', 'RB'],
  ['.[lsrnpb]ian$', 'JJ'],
  ['.[^aeiou]ial$', 'JJ'],
  ['.[^aeiou]eal$', 'JJ'],
  ['.[vrl]id$', 'JJ'],
  ['.[ilk]er$', 'JJR'],
  ['.ike$', 'JJ'],
  ['.ends$', 'VB'],
  ['.wards$', 'RB'],
  ['.rmy$', 'JJ'],
  ['.rol$', 'NN'],
  ['.tors$', 'NN'],
  ['.azy$', 'JJ'],
  ['.where$', 'RB'],
  ['.ify$', 'VB'],
  ['.bound$', 'JJ'],
  ['.ens$', 'VB'],
  ['.oid$', 'JJ'],
  ['.vice$', 'NN'],
  ['.rough$', 'JJ'],
  ['.mum$', 'JJ'],
  ['.teen(th)?$', 'CD'],
  ['.oses$', 'VB'],
  ['.ishes$', 'VB'],
  ['.ects$', 'VB'],
  ['.tieth$', 'CD'],
  ['.ices$', 'NN'],
  ['.bles$', 'VB'],
  ['.pose$', 'VB'],
  ['.ions$', 'NN'],
  ['.ean$', 'JJ'],
  ['.[ia]sed$', 'JJ'],
  ['.tized$', 'VB'],
  ['.llen$', 'JJ'],
  ['.fore$', 'RB'],
  ['.ances$', 'NN'],
  ['.gate$', 'VB'],
  ['.nes$', 'VB'],
  ['.less$', 'RB'],
  ['.ried$', 'JJ'],
  ['.gone$', 'JJ'],
  ['.made$', 'JJ'],
  ['.[pdltrkvyns]ing$', 'JJ'],
  ['.tions$', 'NN'],
  ['.tures$', 'NN'],
  ['.ous$', 'JJ'],
  ['.ports$', 'NN'],
  ['. so$', 'RB'],
  ['.ints$', 'NN'],
  ['.[gt]led$', 'JJ'],
  ['[aeiou].*ist$', 'JJ'],
  ['.lked$', 'VB'],
  ['.fully$', 'RB'],
  ['.*ould$', 'MD'],
  ['^-?[0-9]+(.[0-9]+)?$', 'CD'],
  ['[a-z]*\\-[a-z]*\\-', 'JJ'],
  ['[a-z]\'s$', 'NNO'],
  ['.\'n$', 'VB'],
  ['.\'re$', 'CP'],
  ['.\'ll$', 'MD'],
  ['.\'t$', 'VB'],
  ['.tches$', 'VB'],
  ['^https?\:?\/\/[a-z0-9]', 'NN'], //the colon is removed in normalisation
  ['^www\.[a-z0-9]', 'NN'],
  ['.ize$', 'VB'],
  ['.[^aeiou]ise$', 'VB'],
  ['.[aeiou]te$', 'VB'],
  ['.ea$', 'NN'],
  ['[aeiou][pns]er$', 'NN'],
  ['.ia$', 'NN'],
  ['.sis$', 'NN'],
  ['.[aeiou]na$', 'NN'],
  ['.[^aeiou]ity$', 'NN'],
  ['.[^aeiou]ium$', 'NN'],
  ['.[^aeiou][ei]al$', 'JJ'],
  ['.ffy$', 'JJ'],
  ['.[^aeiou]ic$', 'JJ'],
  ['.(gg|bb|zz)ly$', 'JJ'],
  ['.[aeiou]my$', 'JJ'],
  ['.[aeiou]ble$', 'JJ'],
  ['.[^aeiou]ful$', 'JJ'],
  ['.[^aeiou]ish$', 'JJ'],
  ['.[^aeiou]ica$', 'NN'],
  ['[aeiou][^aeiou]is$', 'NN'],
  ['[^aeiou]ard$', 'NN'],
  ['[^aeiou]ism$', 'NN'],
  ['.[^aeiou]ity$', 'NN'],
  ['.[^aeiou]ium$', 'NN'],
  ['.[lstrn]us$', 'NN'],
  ['..ic$', 'JJ'],
  ['[aeiou][^aeiou]id$', 'JJ'],
  ['.[^aeiou]ish$', 'JJ'],
  ['.[^aeiou]ive$', 'JJ'],
  ['[ea]{2}zy$', 'JJ'],
].map(function(a) {
  return {
    reg: new RegExp(a[0], 'i'),
    pos: tag_mapping[a[1]]
  };
});

},{"./pos.js":24}],27:[function(require,module,exports){
'use strict';
const Term = require('../term/term.js');
const fns = require('../fns.js');
const tagger = require('./pos/tagger.js');
const pos = require('./pos/pos.js');

//a sentence is an array of Term objects, along with their various methods
class Sentence {

  constructor(str) {
    this.str = str || '';
    const terms = str.split(' ');
    this.terms = terms.map(function(s, i) {
      const info = {
        index: i
      };
      return new Term(s, info);
    });
    this.terms = tagger(this);
  }

  //Sentence methods:

  //the ending punctuation
  terminator() {
    const allowed = ['.', '?', '!'];
    const punct = this.str.slice(-1) || '';
    if (allowed.indexOf(punct) !== -1) {
      return punct;
    }
    return '.';
  }

  //part-of-speech assign each term
  tag() {
    this.terms = tagger(this);
    return this.terms;
  }

  //is it a question/statement
  sentence_type() {
    const char = this.terminator();
    const types = {
      '?': 'interrogative',
      '!': 'exclamative',
      '.': 'declarative',
    };
    return types[char] || 'declarative';
  }

  to_past() {
    this.terms.forEach(function(t) {
      if (t instanceof pos.Verb) {
        t.to_past();
      }
    });
  }
  to_present() {
    this.terms.forEach(function(t) {
      if (t instanceof pos.Verb) {
        t.to_present();
      }
    });
  }
  to_future() {
    this.terms.forEach(function(t) {
      if (t instanceof pos.Verb) {
        t.to_future();
      }
    });
  }

  //map over Term methods
  normalized() {
    return fns.pluck(this.terms, 'normal').join(' ');
  }
  text() {
    return fns.pluck(this.terms, 'text').join(' ');
  }
  tags() {
    return fns.pluck(this.terms, 'tag');
  }
  //mining
  people() {
    return this.terms.filter(function(t) {
      return t.pos['Person'];
    });
  }
  places() {
    return this.terms.filter(function(t) {
      return t.pos['Place'];
    });
  }
  dates() {
    return this.terms.filter(function(t) {
      return t.pos['Date'];
    });
  }
  organisations() {
    return this.terms.filter(function(t) {
      return t.pos['Organisation'];
    });
  }
  values() {
    return this.terms.filter(function(t) {
      return t.pos['Value'];
    });
  }
}

module.exports = Sentence;

},{"../fns.js":18,"../term/term.js":61,"./pos/pos.js":24,"./pos/tagger.js":25}],28:[function(require,module,exports){
'use strict';
const Term = require('../term.js');

const to_comparative = require('./to_comparative');
const to_superlative = require('./to_superlative');
const adj_to_adv = require('./to_adverb');
const adj_to_noun = require('./to_noun');

class Adjective extends Term {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Adjective'] = true;
  }

  to_comparative() {
    return to_comparative(this.normal);
  }
  to_superlative() {
    return to_superlative(this.normal);
  }
  to_noun() {
    return adj_to_noun(this.normal);
  }
  to_adverb() {
    return adj_to_adv(this.normal);
  }
  conjugate() {
    return {
      comparative: to_comparative(this.normal),
      superlative: to_superlative(this.normal),
      adverb: adj_to_adv(this.normal),
      noun: adj_to_noun(this.normal)
    };
  }

}

// let t = new Adjective("quick")
// console.log(t.conjugate())

module.exports = Adjective;

},{"../term.js":61,"./to_adverb":29,"./to_comparative":30,"./to_noun":31,"./to_superlative":32}],29:[function(require,module,exports){
//turn 'quick' into 'quickly'
'use strict';
const adj_to_adv = function(str) {
  const irregulars = {
    'idle': 'idly',
    'public': 'publicly',
    'vague': 'vaguely',
    'day': 'daily',
    'icy': 'icily',
    'single': 'singly',
    'female': 'womanly',
    'male': 'manly',
    'simple': 'simply',
    'whole': 'wholly',
    'special': 'especially',
    'straight': 'straight',
    'wrong': 'wrong',
    'fast': 'fast',
    'hard': 'hard',
    'late': 'late',
    'early': 'early',
    'well': 'well',
    'best': 'best',
    'latter': 'latter',
    'bad': 'badly'
  };

  const dont = {
    'foreign': 1,
    'black': 1,
    'modern': 1,
    'next': 1,
    'difficult': 1,
    'degenerate': 1,
    'young': 1,
    'awake': 1,
    'back': 1,
    'blue': 1,
    'brown': 1,
    'orange': 1,
    'complex': 1,
    'cool': 1,
    'dirty': 1,
    'done': 1,
    'empty': 1,
    'fat': 1,
    'fertile': 1,
    'frozen': 1,
    'gold': 1,
    'grey': 1,
    'gray': 1,
    'green': 1,
    'medium': 1,
    'parallel': 1,
    'outdoor': 1,
    'unknown': 1,
    'undersized': 1,
    'used': 1,
    'welcome': 1,
    'yellow': 1,
    'white': 1,
    'fixed': 1,
    'mixed': 1,
    'super': 1,
    'guilty': 1,
    'tiny': 1,
    'able': 1,
    'unable': 1,
    'same': 1,
    'adult': 1
  };

  const transforms = [{
    reg: /al$/i,
    repl: 'ally'
  }, {
    reg: /ly$/i,
    repl: 'ly'
  }, {
    reg: /(.{3})y$/i,
    repl: '$1ily'
  }, {
    reg: /que$/i,
    repl: 'quely'
  }, {
    reg: /ue$/i,
    repl: 'uly'
  }, {
    reg: /ic$/i,
    repl: 'ically'
  }, {
    reg: /ble$/i,
    repl: 'bly'
  }, {
    reg: /l$/i,
    repl: 'ly'
  }];

  const not_matches = [
    /airs$/,
    /ll$/,
    /ee.$/,
    /ile$/
  ];

  if (dont[str]) {
    return null;
  }
  if (irregulars[str]) {
    return irregulars[str];
  }
  if (str.length <= 3) {
    return null;
  }
  for (let i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return null;
    }
  }
  for (let i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }
  return str + 'ly';
};
// console.log(adj_to_adv('direct'))

module.exports = adj_to_adv;

},{}],30:[function(require,module,exports){
//turn 'quick' into 'quickly'
'use strict';
const convertables = require('../../data/convertables.js');

const to_comparative = function(str) {
  const irregulars = {
    'grey': 'greyer',
    'gray': 'grayer',
    'green': 'greener',
    'yellow': 'yellower',
    'red': 'redder',
    'good': 'better',
    'well': 'better',
    'bad': 'worse',
    'sad': 'sadder'
  };

  const dont = {
    'overweight': 1,
    'main': 1,
    'nearby': 1,
    'asleep': 1,
    'weekly': 1,
    'secret': 1,
    'certain': 1
  };

  const transforms = [{
    reg: /y$/i,
    repl: 'ier'
  }, {
    reg: /([aeiou])t$/i,
    repl: '$1tter'
  }, {
    reg: /([aeou])de$/i,
    repl: '$1der'
  }, {
    reg: /nge$/i,
    repl: 'nger'
  }];

  const matches = [
    /ght$/,
    /nge$/,
    /ough$/,
    /ain$/,
    /uel$/,
    /[au]ll$/,
    /ow$/,
    /old$/,
    /oud$/,
    /e[ae]p$/
  ];

  const not_matches = [
    /ary$/,
    /ous$/
  ];

  if (dont.hasOwnProperty(str)) {
    return null;
  }

  for (let i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }

  if (convertables.hasOwnProperty(str)) {
    if (str.match(/e$/)) {
      return str + 'r';
    }
    return str + 'er';
  }

  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }

  for (let i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return 'more ' + str;
    }
  }

  for (let i = 0; i < matches.length; i++) {
    if (str.match(matches[i])) {
      return str + 'er';
    }
  }
  return 'more ' + str;
};

// console.log(to_comparative("great"))

module.exports = to_comparative;

},{"../../data/convertables.js":3}],31:[function(require,module,exports){
//convert cute to cuteness
'use strict';
const to_noun = function(w) {
  const irregulars = {
    'clean': 'cleanliness',
    'naivety': 'naivety'
  };
  if (!w) {
    return '';
  }
  if (irregulars.hasOwnProperty(w)) {
    return irregulars[w];
  }
  if (w.match(' ')) {
    return w;
  }
  if (w.match(/w$/)) {
    return w;
  }
  const transforms = [{
    'reg': /y$/,
    'repl': 'iness'
  }, {
    'reg': /le$/,
    'repl': 'ility'
  }, {
    'reg': /ial$/,
    'repl': 'y'
  }, {
    'reg': /al$/,
    'repl': 'ality'
  }, {
    'reg': /ting$/,
    'repl': 'ting'
  }, {
    'reg': /ring$/,
    'repl': 'ring'
  }, {
    'reg': /bing$/,
    'repl': 'bingness'
  }, {
    'reg': /sing$/,
    'repl': 'se'
  }, {
    'reg': /ing$/,
    'repl': 'ment'
  }, {
    'reg': /ess$/,
    'repl': 'essness'
  }, {
    'reg': /ous$/,
    'repl': 'ousness'
  }];

  for (let i = 0; i < transforms.length; i++) {
    if (w.match(transforms[i].reg)) {
      return w.replace(transforms[i].reg, transforms[i].repl);
    }
  }

  if (w.match(/s$/)) {
    return w;
  }
  return w + 'ness';
};

// console.log(to_noun("great"))

module.exports = to_noun;

},{}],32:[function(require,module,exports){
//turn 'quick' into 'quickest'
'use strict';
const convertables = require('../../data/convertables.js');

const to_superlative = function(str) {
  const irregulars = {
    'nice': 'nicest',
    'late': 'latest',
    'hard': 'hardest',
    'inner': 'innermost',
    'outer': 'outermost',
    'far': 'furthest',
    'worse': 'worst',
    'bad': 'worst',
    'good': 'best'
  };

  const dont = {
    'overweight': 1,
    'ready': 1
  };

  const transforms = [{
    'reg': /y$/i,
    'repl': 'iest'
  }, {
    'reg': /([aeiou])t$/i,
    'repl': '$1ttest'
  }, {
    'reg': /([aeou])de$/i,
    'repl': '$1dest'
  }, {
    'reg': /nge$/i,
    'repl': 'ngest'
  }];

  const matches = [
    /ght$/,
    /nge$/,
    /ough$/,
    /ain$/,
    /uel$/,
    /[au]ll$/,
    /ow$/,
    /oud$/,
    /...p$/
  ];

  const not_matches = [
    /ary$/
  ];

  const generic_transformation = function(s) {
    if (s.match(/e$/)) {
      return s + 'st';
    }
    return s + 'est';
  };

  for (let i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }

  if (convertables.hasOwnProperty(str)) {
    return generic_transformation(str);
  }

  if (dont.hasOwnProperty(str)) {
    return 'most ' + str;
  }

  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  for (let i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return 'most ' + str;
    }
  }

  for (let i = 0; i < matches.length; i++) {
    if (str.match(matches[i])) {
      return generic_transformation(str);
    }
  }
  return 'most ' + str;
};

// console.log(to_superlative("great"))

module.exports = to_superlative;

},{"../../data/convertables.js":3}],33:[function(require,module,exports){
'use strict';
const Term = require('../term.js');
const to_adjective = require('./to_adjective.js');

class Adverb extends Term {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Adverb'] = true;
  }
  to_adjective() {
    return to_adjective(this.normal);
  }
}

// let t = new Adverb("quickly")
// console.log(t.to_adjective())

module.exports = Adverb;

},{"../term.js":61,"./to_adjective.js":34}],34:[function(require,module,exports){
//turns 'quickly' into 'quick'
'use strict';
const to_adjective = function(str) {
  const irregulars = {
    'idly': 'idle',
    'sporadically': 'sporadic',
    'basically': 'basic',
    'grammatically': 'grammatical',
    'alphabetically': 'alphabetical',
    'economically': 'economical',
    'conically': 'conical',
    'politically': 'political',
    'vertically': 'vertical',
    'practically': 'practical',
    'theoretically': 'theoretical',
    'critically': 'critical',
    'fantastically': 'fantastic',
    'mystically': 'mystical',
    'pornographically': 'pornographic',
    'fully': 'full',
    'jolly': 'jolly',
    'wholly': 'whole'
  };
  const transforms = [{
    'reg': /bly$/i,
    'repl': 'ble'
  }, {
    'reg': /gically$/i,
    'repl': 'gical'
  }, {
    'reg': /([rsdh])ically$/i,
    'repl': '$1ical'
  }, {
    'reg': /ically$/i,
    'repl': 'ic'
  }, {
    'reg': /uly$/i,
    'repl': 'ue'
  }, {
    'reg': /ily$/i,
    'repl': 'y'
  }, {
    'reg': /(.{3})ly$/i,
    'repl': '$1'
  }];
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  for (let i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }
  return str;
};

// console.log(to_adjective('quickly') === 'quick')
// console.log(to_adjective('marvelously') === 'marvelous')
module.exports = to_adjective;

},{}],35:[function(require,module,exports){
// convert british spellings into american ones
// built with patterns+exceptions from https://en.wikipedia.org/wiki/British_spelling
'use strict';

const patterns = [
  // ise -> ize
  {
    reg: /([^aeiou][iy])s(e|ed|es|ing)?$/,
    repl: '$1z$2'
  },
  // our -> or
  {
    reg: /(..)our(ly|y|ite)?$/,
    repl: '$1or$2'
  },
  // re -> er
  {
    reg: /([^cdnv])re(s)?$/,
    repl: '$1er$2'
  },
  // xion -> tion
  {
    reg: /([aeiou])xion([ed])?$/,
    repl: '$1tion$2'
  },
  //logue -> log
  {
    reg: /logue/,
    repl: 'log'
  },
  // ae -> e
  {
    reg: /([o|a])e/,
    repl: 'e'
  },
  //eing -> ing
  {
    reg: /e(ing|able)$/,
    repl: '$1'
  },
  // illful -> ilful
  {
    reg: /([aeiou]+[^aeiou]+[aeiou]+)ll(ful|ment|est|ing|or|er|ed)$/, //must be second-syllable
    repl: '$1l$2'
  },
  {
    reg: /sation$/,
    repl: 'zation'
  },
  {
    reg: /isable$/,
    repl: 'izable'
  },
  {
    reg: /iliser$/,
    repl: 'ilizer'
  },
  {
    reg: /singly$/,
    repl: 'zingly'
  },
  {
    reg: /iniser$/,
    repl: 'inizer'
  },
  {
    reg: /uring$/,
    repl: 'oring'
  },
  {
    reg: /niser$/,
    repl: 'nizer'
  },
  {
    reg: /ising$/,
    repl: 'izer'
  },
  {
    reg: /fence/,
    repl: 'fense'
  },
  {
    reg: /(l|t|d)iser/,
    repl: '$1izer'
  },
  {
    reg: /euvre/,
    repl: 'euver'
  },
  {
    reg: /gramme/,
    repl: 'gram'
  },
  {
    reg: /outre/,
    repl: 'outer'
  },
  {
    reg: /isement/,
    repl: 'izement'
  },
  {
    reg: /anaes/,
    repl: 'anes'
  },
  {
    reg: /armour/,
    repl: 'armor'
  },
  {
    reg: /honour/,
    repl: 'honor'
  },
  {
    reg: /baulk/,
    repl: 'balk'
  },
  {
    reg: /behaviour/,
    repl: 'behavior'
  },
  {
    reg: /behove/,
    repl: 'behoove'
  },
  {
    reg: /labour/,
    repl: 'labor'
  },
  {
    reg: /biass/,
    repl: 'bias'
  },
  {
    reg: /alyser$/,
    repl: 'alyzer'
  },

  {
    reg: /centre/,
    repl: 'center'
  },
  {
    reg: /cheque/,
    repl: 'check'
  },
  {
    reg: /colour/,
    repl: 'color'
  },
  {
    reg: /^cosi/,
    repl: 'cozi'
  },
  {
    reg: /defence/,
    repl: 'defense'
  },
  {
    reg: /draught/,
    repl: 'draft'
  },
  {
    reg: /duell/,
    repl: 'duel'
  },
  {
    reg: /vour/,
    repl: 'vor'
  },
  {
    reg: /fibre/,
    repl: 'fiber'
  },
  {
    reg: /fillet/,
    repl: 'filet'
  },
  {
    reg: /fulfil/,
    repl: 'fulfill'
  },
  {
    reg: /gaol/,
    repl: 'jail'
  },
  {
    reg: /gauge/,
    repl: 'gage'
  },
  {
    reg: /grey/,
    repl: 'gray'
  },
  {
    reg: /licence/,
    repl: 'license'
  },
  {
    reg: /manoeuvre/,
    repl: 'maneuver'
  },
  {
    reg: /marvellous/,
    repl: 'marvelous'
  },
  {
    reg: /mould/,
    repl: 'mold'
  },
  {
    reg: /neighbour/,
    repl: 'neighbor'
  },
  {
    reg: /plough/,
    repl: 'plow'
  },
  {
    reg: /practise/,
    repl: 'practice'
  },
  {
    reg: /rumour/,
    repl: 'rumor'
  },
  {
    reg: /savour/,
    repl: 'savor'
  },
  {
    reg: /tranquill/,
    repl: 'tranquil'
  },
  {
    reg: /triall/,
    repl: 'trial'
  },
  {
    reg: /sceptic/,
    repl: 'skeptic'
  },
  {
    reg: /sulph/,
    repl: 'sulf'
  },
  {
    reg: /syphon/,
    repl: 'siphon'
  },
  {
    reg: /tonne/,
    repl: 'ton'
  },
  {
    reg: /anaesthetis/,
    repl: 'anesthetiz'
  },
];

const americanize = function(str) {
  for (let i = 0; i < patterns.length; i++) {
    if (str.match(patterns[i].reg)) {
      return str.replace(patterns[i].reg, patterns[i].repl);
    }
  }

  return str;
};

// console.log(americanize("synthesise") === "synthesize")
// console.log(americanize("synthesised") === "synthesized")

module.exports = americanize;

},{}],36:[function(require,module,exports){
// convert american spellings into british ones
// built with patterns+exceptions from https://en.wikipedia.org/wiki/British_spelling
// (some patterns are only safe to do in one direction)
'use strict';

const patterns = [
  // ise -> ize
  {
    reg: /([^aeiou][iy])z(e|ed|es|ing|er)?$/,
    repl: '$1s$2'
  },
  // our -> or
  {
    reg: /(..)our(ly|y|ite)?$/,
    repl: '$1or$2'
  },
  // re -> er
  {
    reg: /([^cdnv])re(s)?$/,
    repl: '$1er$2'
  },
  // xion -> tion
  {
    reg: /([aeiou])xion([ed])?$/,
    repl: '$1tion$2'
  },
  //logue -> log
  {
    reg: /logue$/,
    repl: 'log'
  },
  // ae -> e
  {
    reg: /([o|a])e/,
    repl: 'e'
  },
  //eing -> ing
  {
    reg: /e(ing|able)$/,
    repl: '$1'
  },
  // illful -> ilful
  {
    reg: /([aeiou]+[^aeiou]+[aeiou]+)ll(ful|ment|est|ing|or|er|ed)$/, //must be second-syllable
    repl: '$1l$2'
  },
  {
    reg: /ization/,
    repl: 'isation'
  },
  {
    reg: /izable/,
    repl: 'isable'
  },
  {
    reg: /orabl/,
    repl: 'ourabl'
  },
  {
    reg: /zingly/,
    repl: 'singly'
  },
  {
    reg: /ilizer/,
    repl: 'iliser'
  },
  {
    reg: /pedic/,
    repl: 'paedic'
  },
  {
    reg: /anesthes/,
    repl: 'anaesthes'
  },
  {
    reg: /ar(b|m|d)or/,
    repl: 'ar$1our'
  },
  {
    reg: /balk/,
    repl: 'baulk'
  },
  {
    reg: /behavior/,
    repl: 'behaviour'
  },
  {
    reg: /behove/,
    repl: 'behoove'
  },
  {
    reg: /canceled/,
    repl: 'cancelled'
  },
  {
    reg: /catalog/,
    repl: 'catalogue'
  },
  {
    reg: /meter/,
    repl: 'metre'
  },
  {
    reg: /center/,
    repl: 'centre'
  },
  {
    reg: /clamor/,
    repl: 'clamour'
  },
  {
    reg: /color/,
    repl: 'colour'
  },
  {
    reg: /defense/,
    repl: 'defence'
  },
  {
    reg: /endeavor/,
    repl: 'endeavour'
  },
  {
    reg: /favor/,
    repl: 'favour'
  },
  {
    reg: /flavor/,
    repl: 'flavour'
  },
  {
    reg: /filet/,
    repl: 'fillet'
  },
  {
    reg: /jail/,
    repl: 'gaol'
  },
  {
    reg: /gray/,
    repl: 'grey'
  },
  {
    reg: /^hematol/,
    repl: 'haematol'
  },
  {
    reg: /^hemo/,
    repl: 'haemo'
  },
  {
    reg: /^install/,
    repl: 'instal'
  },
  {
    reg: /mold/,
    repl: 'mould'
  },
  {
    reg: /neighbor/,
    repl: 'neighbour'
  },
  {
    reg: /odor/,
    repl: 'odour'
  },
  {
    reg: /^pedo/,
    repl: 'paedo'
  },
  {
    reg: /^pedia/,
    repl: 'paedia'
  },
  {
    reg: /^parlor/,
    repl: 'parlour'
  },
  {
    reg: /plow/,
    repl: 'plough'
  },
  {
    reg: /skeptic/,
    repl: 'sceptic'
  },
  {
    reg: /rumor/,
    repl: 'rumour'
  },
  {
    reg: /practice/,
    repl: 'practise'
  },
  {
    reg: /maneuver/,
    repl: 'manoeuvre'
  },
  {
    reg: /level(ed|er|ing)?$/,
    repl: 'levell$1'
  },
  {
    reg: /travel(ed|er|ing)?$/,
    repl: 'travell$1'
  },
  {
    reg: /tranquil/,
    repl: 'tranquill'
  },
  {
    reg: /tranquilize/,
    repl: 'tranquillise'
  },
  {
    reg: /vigor/,
    repl: 'vigour'
  },
  {
    reg: /fiber/,
    repl: 'fibre'
  },
  {
    reg: /drafts/,
    repl: 'draughts'
  },
  {
    reg: /disk/,
    repl: 'disc'
  },
  {
    reg: /uel(er|est|ed)/,
    repl: 'uell$1'
  },
  {
    reg: /cozi(er|est|es|ly)/,
    repl: 'cosi$1'
  },
  {
    reg: /colorize/,
    repl: 'colourise'
  },
  {
    reg: /honor/,
    repl: 'honour'
  },
  {
    reg: /abor(ed|ing)/,
    repl: 'abour$1'
  },
  {
    reg: /pedal(ed|ing)/,
    repl: 'pedall$1'
  },
  {
    reg: /shovel(ed|ing|er)/,
    repl: 'shovell$1'
  },
  {
    reg: /al(ed|ing|er)/,
    repl: 'all$1'
  },
  {
    reg: /el(ed|ing|er)/,
    repl: 'ell$1'
  },
  {
    reg: /ol(ed|ing|er)/,
    repl: 'oll$1'
  },
  {
    reg: /avor(ed|ing|er)/,
    repl: 'avour$1'
  },
  {
    reg: /anesth/,
    repl: 'anaesth'
  },
  {
    reg: /behoove/,
    repl: 'behove'
  },
  {
    reg: /sulfur/,
    repl: 'sulphur'
  },

];

const britishize = function(str) {
  for (let i = 0; i < patterns.length; i++) {
    if (str.match(patterns[i].reg)) {
      return str.replace(patterns[i].reg, patterns[i].repl);
    }
  }
  return str;
};

// console.log(britishize("synthesize") === "synthesise")
// console.log(britishize("synthesized") === "synthesised")

module.exports = britishize;

},{}],37:[function(require,module,exports){
'use strict';

//chooses an indefinite aricle 'a/an' for a word
const irregulars = {
  'hour': 'an',
  'heir': 'an',
  'heirloom': 'an',
  'honest': 'an',
  'honour': 'an',
  'honor': 'an',
  'uber': 'an' //german u
};


const is_acronym = function(s) {
  //no periods
  if (s.length <= 5 && s.match(/^[A-Z]*$/)) {
    return true;
  }
  //with periods
  if (s.length >= 4 && s.match(/^([A-Z]\.)*$/)) {
    return true;
  }
  return false;
};


const indefinite_article = function(str) {
  if (!str) {
    return null;
  }
  //pronounced letters of acronyms that get a 'an'
  const an_acronyms = {
    A: true,
    E: true,
    F: true,
    H: true,
    I: true,
    L: true,
    M: true,
    N: true,
    O: true,
    R: true,
    S: true,
    X: true
  };
  //'a' regexes
  const a_regexs = [
    /^onc?e/i, //'wu' sound of 'o'
    /^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
    /^eul/i
  ];

  //begin business time
  ////////////////////
  //explicit irregular forms
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  //spelled-out acronyms
  if (is_acronym(str) && an_acronyms.hasOwnProperty(str.substr(0, 1))) {
    return 'an';
  }
  //'a' regexes
  for (let i = 0; i < a_regexs.length; i++) {
    if (str.match(a_regexs[i])) {
      return 'a';
    }
  }
  //basic vowel-startings
  if (str.match(/^[aeiou]/i)) {
    return 'an';
  }
  return 'a';
};

// console.log(indefinite_article("wolf") === "a")
module.exports = indefinite_article;

},{}],38:[function(require,module,exports){
'use strict';
const Noun = require('../noun.js');
const parse = require('./parse.js');

class Date extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Date'] = true;
    this.date = null;
    this.parse();
  }

  parse() {
    let dates = parse(this.text) || [];
    if (dates.length) {
      this.date = dates[0].Date;
    }
  }

}

module.exports = Date;

},{"../noun.js":43,"./parse.js":40}],39:[function(require,module,exports){

'use strict';

const dates = require('../../../data/dates');

const is_date = function(str) {
  let day_reg = '(\\b' + dates.join('\\b|\\b') + '\\b)';
  day_reg = new RegExp(day_reg, 'i');
  const times_reg = /1?[0-9]:[0-9]{2}/;
  if (str.match(day_reg) || str.match(times_reg)) {
    return true;
  }
  return false;
};

module.exports = is_date;

// console.log(is_date('january fifth, 2015'));

},{"../../../data/dates":4}],40:[function(require,module,exports){
// require('sugar-date');
//
// // var data = require("./old/lexdates").dates;
// // console.log("Dates", data);
//
// var rules = {
//   // http://rubular.com/r/VUd4LJzIG4
//   range: /(?:\b|^)(?:between|from)(.*)(?:\sand(?= ) |or\s)(.*)|(?:\b|^)(?:between|from)?(.*)(?:(?:\sto\s)|(?:\-\s))(.+)/i,
//   multi: /(?: |^)(?:and(?= ) |or(?= ) )|(?: ?\& ?)|(?: ?, ?)(?=\d)/i,
//   multiburst: {
//     at: /(.+)\sat\s(.+)/, // {location} at {time}
//     at2: /(.+)?\s?((tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun)\sat\s.+)|at\s(.+)/i,
//     on: /(.+)\son\s(.+)/, // {event} on {date} or {action} on {date} at {time}
//     days: /(tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun)/i
//   },
//   months: /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec),?/ig,
//   short: [
//     {
//       // [ 'month', 'day', 'year' ]
//       matches: /(?:([1-9]|0[1-9]|1[0-2])\s?(?:\-|\/)+\s?(3[0-1]|[12][0-9]|0?[1-9])\s?(?:\-|\/)+\s?(?:([0-9]{1,4})+)?)/
//     },
//     {
//       // [ 'day', 'month', 'year' ]
//       matches: /(?:(3[0-1]|[12][0-9]|0?[1-9])\s?(?:\.|\/)+\s?([1-9]|0[1-9]|1[0-2])\s?(?:\.|\/)+\s?(?:([0-9]{1,4})+)?)/,
//     }
//   ]
// };
//
// // Shorthand for date functions
// var _methods = {
//   day: 'UTCDate',
//   month: 'UTCMonth',
//   year: 'UTCFullYear',
//   weekDay: 'UTCDay',
//   // Time
//   hours: 'UTCHours',
//   minutes: 'UTCMinutes',
//   seconds: 'UTCSeconds'
// };
//
// // Helpers
// var stringCheck = function (input) {
//   return (typeof input === 'string' && input.trim() !== '');
// };
//
// var hyphenatedDates = function(str, recover) {
//   var i;
//   for (i = 0; i < 2; i++) {
//     var rule = rules.short[i].matches;
//     var r = (recover) ? new RegExp(rule.source.replace(/\D\-/g, '/'), 'g') : new RegExp(rule.source, 'g');
//     var find = (recover) ? /\//g : /\-/g;
//     var repl = (recover) ? '-' : '/', a;
//
//     while ((a = r.exec(str)) !== null) {
//       str = str.replace(a[0], a[0].replace(find, repl));
//     }
//   }
//   return str;
// };
//
// function get(D, t) {
//   var method = ['get', _methods[t]].join('');
//   return (D && method)
//     ? D[method]() + ((t === 'month') ? 1 : 0)
//     : false;
// }
//
// function blank(nowD, text) {
//
//   if (!nowD) {
//     return {
//       text: text.trim(),
//       day: false,
//       month: false,
//       year: false,
//       weekDay: false,
//       hours: false,
//       minutes: false,
//       seconds: false
//     };
//   }
//
//   if (!nowD.isValid()) {
//     return null;
//   }
//
//   return {
//     text: text.trim(),
//     day: get(nowD, 'day'),
//     month: get(nowD, 'month'),
//     year: get(nowD, 'year'),
//     weekDay: get(nowD, 'weekDay'),
//     hours: get(nowD, 'hours'),
//     minutes: get(nowD, 'minutes'),
//     seconds: get(nowD, 'seconds'),
//     Date: nowD || {},
//     to: false
//   };
// }
//
// var parseInput = function(input) {
//
//   var ranges = input.split(rules.range).filter(stringCheck);
//   var dates = [];
//
//
//   if (ranges.length === 1) {
//     // One big chunk with a date
//     var part = ranges[0];
//     var parts = part.split(rules.multi).filter(stringCheck);
//
//     // Map parts
//     dates = parts.map(function(item) {
//       var innerpart1 = item.split(rules.multiburst.on).filter(stringCheck);
//       var innerpart2 = item.split(rules.multiburst.at2).filter(stringCheck);
//
//       if (innerpart1.length === 2) {
//         // first with on
//         item = innerpart1[1];
//       } else if (innerpart2.length >= 2) {
//         // Try at expression
//         if (innerpart2.length === 3) {
//           // lets meet sunday at 3pm
//           // lobby at 3pm
//           item = innerpart2[1];
//
//         } else if (innerpart2.length === 2) {
//           if (rules.multiburst.days.test(innerpart2[1])) {
//             // We just use item...
//             // ie: today at TIME
//           } else {
//             // In this case, we just want the part after 'at' which should be a time component
//             // lobby at 3pm
//             item = innerpart2[1];
//           }
//         } else {
//           console.log('We need to test this...', innerpart2);
//         }
//       }
//
//       var td = Date.create(item);
//       if (td.isValid()) {
//         return blank(Date.future(item), item);
//       } else {
//
//         // Last attempt, lets peel it back one token at a time.
//         var tok = item.split(' ');
//         for (var i = 0; i < tok.length; i++) {
//           var na = tok.slice(i);
//           var revisedInput = na.join(' ');
//           var td = Date.create(revisedInput);
//           if (td.isValid()) {
//             return blank(Date.future(revisedInput), revisedInput);
//           }
//         }
//       }
//     });
//
//   } else if (ranges.length === 2) {
//     // Range date
//     var d1 = Date.create(ranges[0]);
//     var d2 = Date.create(ranges[1]);
//     if (d1.isValid() && d2.isValid()) {
//       dates[0] = blank(d1, ranges[0]);
//       dates[0].to = blank(d2, ranges[1]);
//     }
//   }
//
//   return dates;
// };
//
// var extractDates = function(input) {
//   input = stripCommas(hyphenatedDates(input));
//   var results = parseInput(input);
//   return cleanArray(results);
// };
//
// var stripCommas = function (str) {
//   return str.replace(/,/g, '');
// };
//
// var cleanArray = function (actual) {
//   var newArray = new Array();
//   for(var i = 0; i < actual.length; i++) {
//     if (actual[i]) {
//       newArray.push(actual[i]);
//     }
//   }
//   return newArray;
// };

// console.log(extractDates("i will get the tagger in tip-top shape this week"));

// module.exports = extractDates;
module.exports = function() {};

},{}],41:[function(require,module,exports){
'use strict';
const irregulars = require('../../data/irregular_nouns');

//similar to plural/singularize rules, but not the same
const plural_indicators = [
  /(^v)ies$/i,
  /ises$/i,
  /ives$/i,
  /(antenn|formul|nebul|vertebr|vit)ae$/i,
  /(octop|vir|radi|nucle|fung|cact|stimul)i$/i,
  /(buffal|tomat|tornad)oes$/i,
  /(analy|ba|diagno|parenthe|progno|synop|the)ses$/i,
  /(vert|ind|cort)ices$/i,
  /(matr|append)ices$/i,
  /(x|ch|ss|sh|s|z|o)es$/i,
  /men$/i,
  /news$/i,
  /.tia$/i,
  /(^f)ves$/i,
  /(lr)ves$/i,
  /(^aeiouy|qu)ies$/i,
  /(m|l)ice$/i,
  /(cris|ax|test)es$/i,
  /(alias|status)es$/i,
  /ics$/i
];

//similar to plural/singularize rules, but not the same
const singular_indicators = [
  /(ax|test)is$/i,
  /(octop|vir|radi|nucle|fung|cact|stimul)us$/i,
  /(octop|vir)i$/i,
  /(rl)f$/i,
  /(alias|status)$/i,
  /(bu)s$/i,
  /(al|ad|at|er|et|ed|ad)o$/i,
  /(ti)um$/i,
  /(ti)a$/i,
  /sis$/i,
  /(?:(^f)fe|(lr)f)$/i,
  /hive$/i,
  /(^aeiouy|qu)y$/i,
  /(x|ch|ss|sh|z)$/i,
  /(matr|vert|ind|cort)(ix|ex)$/i,
  /(m|l)ouse$/i,
  /(m|l)ice$/i,
  /(antenn|formul|nebul|vertebr|vit)a$/i,
  /.sis$/i,
  /^(?!talis|.*hu)(.*)man$/i
];

const is_plural = function(str) {
  str = (str || '').toLowerCase();
  //handle 'mayors of chicago'
  const preposition = str.match(/([a-z]*) (of|in|by|for) [a-z]/);
  if (preposition && preposition[1]) {
    str = preposition[1];
  }
  // if it's a known irregular case
  for (let i = 0; i < irregulars.length; i++) {
    if (irregulars[i][1] === str) {
      return true;
    }
    if (irregulars[i][0] === str) {
      return false;
    }
  }
  for (let i = 0; i < plural_indicators.length; i++) {
    if (str.match(plural_indicators[i])) {
      return true;
    }
  }
  for (let i = 0; i < singular_indicators.length; i++) {
    if (str.match(singular_indicators[i])) {
      return false;
    }
  }
  // some 'looks pretty plural' rules
  if (str.match(/s$/) && !str.match(/ss$/) && str.length > 3) { //needs some lovin'
    return true;
  }
  return false;
};

// console.log(is_plural('octopus') === false)
// console.log(is_plural('octopi') === true)
// console.log(is_plural('eyebrow') === false)
// console.log(is_plural('eyebrows') === true)
// console.log(is_plural('child') === false)
// console.log(is_plural('children') === true)

module.exports = is_plural;

},{"../../data/irregular_nouns":8}],42:[function(require,module,exports){
//uncountables are words that shouldn't ever inflect, for metaphysical reasons, like 'peace'
'use strict';
const uncountable_arr = require('../../data/uncountables.js');

const uncountable = uncountable_arr.reduce(function(h, a) {
  h[a] = true;
  return h;
}, {});

const is_uncountable = function(str) {
  if (uncountable[str]) {
    return true;
  }
  return false;
};
// console.log(is_uncountable("peace") === true)
// console.log(is_uncountable("dog") === false)
module.exports = is_uncountable;

},{"../../data/uncountables.js":15}],43:[function(require,module,exports){
'use strict';
const Term = require('../term.js');
const article = require('./article.js');
const is_plural = require('./is_plural.js');
const is_place = require('./place/is_place.js');
const is_person = require('./person/is_person.js');
const pronoun = require('./pronoun.js');
const is_value = require('./value/is_value.js');
const is_date = require('./date/is_date.js');
const is_organisation = require('./organisation/is_organisation.js');
const singularize = require('./singularize.js');
const pluralize = require('./pluralize.js');
const is_uncountable = require('./is_uncountable.js');

class Noun extends Term {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Noun'] = true;
    if (tag) {
      this.pos[tag] = true;
    }
  }
  //noun methods
  article() {
    return article(this.normal);
  }
  pronoun() {
    if (this.is_organisation() || this.is_place() || this.is_value()) {
      return 'it';
    }
    return pronoun(this.normal);
  }

  is_plural() {
    return is_plural(this.normal);
  }
  is_uncountable() {
    return is_uncountable(this.normal);
  }
  pluralize() {
    return pluralize(this.normal);
  }
  singularize() {
    return singularize(this.normal);
  }
  //sub-classes
  is_person() {
    return is_person(this.normal);
  }
  is_organisation() {
    return is_organisation(this.normal, this.text);
  }
  is_date() {
    return is_date(this.normal);
  }
  is_value() {
    return is_value(this.normal);
  }
  is_place() {
    return is_place(this.normal);
  }

}

module.exports = Noun;

// let t = new Noun('John');
// console.log(t.pronoun());

},{"../term.js":61,"./article.js":37,"./date/is_date.js":39,"./is_plural.js":41,"./is_uncountable.js":42,"./organisation/is_organisation.js":44,"./person/is_person.js":47,"./place/is_place.js":50,"./pluralize.js":52,"./pronoun.js":53,"./singularize.js":54,"./value/is_value.js":55}],44:[function(require,module,exports){
'use strict';
const firstnames = require('../../../data/firstnames');
const abbreviations = require('../../../data/abbreviations');
const org_data = require('../../../data/organisations');

//words like 'co' and ltd
let org_suffix = abbreviations.orgs.reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});
org_data.suffixes.forEach(function(s) { //a few more
  org_suffix[s] = true;
});

//named orgs like google and nestle
let org_names = org_data.organisations.reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

const is_organisation = function(str, text) {
  text = text || '';
  //some known organisations, like microsoft
  if (org_names[str]) {
    return true;
  }
  //no period acronyms
  if (text.length <= 5 && text.match(/^[A-Z][A-Z]+$/) !== null) {
    return true;
  }
  //period acronyms
  if (text.length >= 4 && text.match(/^([A-Z]\.)*$/) !== null) {
    return true;
  }
  // eg 'Smith & Co'
  if (str.match(/ & /)) {
    return true;
  }
  // Girlscouts of Canada
  if (str.match(/..s of /)) {
    return true;
  }
  // eg pets.com
  if (str.match(/[a-z]{3}\.(com|net|org|biz)/)) { //not a perfect url regex, but a "org.com"
    return true;
  }
  let words = str.split(' ');
  let last = words[words.length - 1];
  if (org_suffix[last]) {
    return true;
  }

  return false;
};

module.exports = is_organisation;

// console.log(is_organisation('Captain of Jamaica'));

},{"../../../data/abbreviations":1,"../../../data/firstnames":6,"../../../data/organisations":12}],45:[function(require,module,exports){
'use strict';
const Noun = require('../noun.js');

class Organisation extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Organisation'] = true;

  }
}

module.exports = Organisation;

},{"../noun.js":43}],46:[function(require,module,exports){
'use strict';
const firstnames = require('../../../data/firstnames');
const parse_name = require('./parse_name.js');

const gender = function(normal) {
  if (normal === 'he') {
    return 'Male';
  }
  if (normal === 'she') {
    return 'Female';
  }
  let o = parse_name(normal);
  let firstName = o.firstName;
  if (!firstName) {
    return null;
  }
  if (firstnames[firstName] === 'm') {
    return 'Male';
  }
  if (firstnames[firstName] === 'f') {
    return 'Female';
  }
  //male honourifics
  if (normal.match(/\b(mr|mister|sr|jr)\b/i)) {
    return 'Male';
  }
  //female honourifics
  if (normal.match(/^(mrs|miss|ms|misses|mme|mlle)\.? /i)) {
    return 'Female';
  }
  //statistical guesses
  if (firstName.match(/.(i|ee|[a|e]y|a)$/i)) { //this is almost-always true
    return 'Female';
  }
  if (firstName.match(/[ou]$/i)) { //if it ends in a 'oh or uh', male
    return 'Male';
  }
  if (firstName.match(/(nn|ll|tt)/i)) { //if it has double-consonants, female
    return 'Female';
  }
  return null;
};
module.exports = gender;

// console.log(gender('john', 'john') === 'Male');
// console.log(gender('jane smith', 'jane') === 'Female');

},{"../../../data/firstnames":6,"./parse_name.js":48}],47:[function(require,module,exports){
'use strict';
const firstnames = require('../../../data/firstnames');
let honourifics = require('../../../data/honourifics').reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

let whitelist = {
  'he': true,
  'she': true,
  'i': true,
  'you': true,
};

const is_person = function(str) {
  if (whitelist[str] || firstnames[str]) {
    return true;
  }
  let words = str.split(' ');
  if (words.length > 1) {
    let first = words[0];
    if (honourifics[first] || firstnames[first]) {
      return true;
    }
  }
  return false;
};

module.exports = is_person;

// console.log(is_person('Illi Danza'));

},{"../../../data/firstnames":6,"../../../data/honourifics":7}],48:[function(require,module,exports){
'use strict';
const firstnames = require('../../../data/firstnames');
const honourifics = require('../../../data/honourifics').reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

const parse_name = function(str) {

  let words = str.split(' ');
  let o = {
    honourific: null,
    firstName: null,
    middleName: null,
    lastName: null,
  };

  //first-word honourific
  if (honourifics[words[0]]) {
    o.honourific = words[0];
    words = words.slice(1, words.length);
  }
  //last-word honourific
  if (honourifics[words[words.length - 1]]) {
    o.honourific = words[words.length - 1];
    words = words.slice(0, words.length - 1);
  }
  //see if the first word is now a known first-name
  if (firstnames[words[0]]) {
    o.firstName = words[0];
    words = words.slice(1, words.length);
  } else {
    //ambiguous one-word name
    if (words.length === 1) {
      return o;
    }
    //looks like an unknown first-name
    o.firstName = words[0];
    words = words.slice(1, words.length);
  }
  //assume the remaining is '[middle..] [last]'
  if (words[words.length - 1]) {
    o.lastName = words[words.length - 1];
    words = words.slice(0, words.length - 1);
  }
  o.middleName = words.join(' ');
  return o;
};

module.exports = parse_name;

// console.log(parse_name('john smith'));

},{"../../../data/firstnames":6,"../../../data/honourifics":7}],49:[function(require,module,exports){
// not all cultures use the firstname-lastname practice. this does make some assumptions.
'use strict';
const Noun = require('../noun.js');
const guess_gender = require('./gender.js');
const parse_name = require('./parse_name.js');

const honourifics = require('../../../data/honourifics').reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

class Person extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Person'] = true;
    this.honourific = null;
    this.firstName = null;
    this.middleName = null;
    this.lastName = null;
    this.parse();
  }

  //turn a multi-word string into [first, middle, last, honourific]
  parse() {
    let o = parse_name(this.normal);
    this.honourific = o.honourific;
    this.firstName = o.firstName;
    this.middleName = o.middleName;
    this.lastName = o.lastName;
  }

  gender() {
    return guess_gender(this.normal);
  }

}

module.exports = Person;

// let p = new Person('John Smith');
// console.log(p.gender());

},{"../../../data/honourifics":7,"../noun.js":43,"./gender.js":46,"./parse_name.js":48}],50:[function(require,module,exports){
'use strict';

const places = require('../../../data/places');
const abbreviations = require('../../../data/abbreviations');

//add Country names
let isPlace = places.countries.reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});
//add City names
places.cities.forEach(function(s) {
  isPlace[s] = true;
});
//add place abbreviations names
abbreviations.places.forEach(function(s) {
  isPlace[s] = true;
});

//these are signals too
let placeSignals = [
  'west',
  'east',
  'nort',
  'south',
  'western',
  'eastern',
  'nortern',
  'southern',
  'city',
  'town',
  'county',
  'state',
  'province',
].reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

const is_place = function(str) {
  let words = str.split();
  for(let i = 0; i < words.length; i++) {
    if (isPlace[words[i]]) {
      return true;
    }
    if (placeSignals[words[i]] && !placeSignals[str]) {
      return true;
    }
  }

  return false;
};

module.exports = is_place;

},{"../../../data/abbreviations":1,"../../../data/places":14}],51:[function(require,module,exports){
'use strict';
const Noun = require('../noun.js');

const Place = class Place extends Noun {
constructor(str, tag) {
  super(str);
  this.tag = tag;
  this.pos['Place'] = true;
}
};

module.exports = Place;

},{"../noun.js":43}],52:[function(require,module,exports){
'use strict';
const is_uncountable = require('./is_uncountable.js');
const irregulars = require('../../data/irregular_nouns.js');
const is_plural = require('./is_plural.js');
const fns = require('../../fns.js');

const pluralize_rules = [
  [/(ax|test)is$/i, '$1es'],
  [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i'],
  [/(octop|vir)i$/i, '$1i'],
  [/([rl])f$/i, '$1ves'],
  [/(alias|status)$/i, '$1es'],
  [/(bu)s$/i, '$1ses'],
  [/(al|ad|at|er|et|ed|ad)o$/i, '$1oes'],
  [/([ti])um$/i, '$1a'],
  [/([ti])a$/i, '$1a'],
  [/sis$/i, 'ses'],
  [/(?:([^f])fe|([lr])f)$/i, '$1ves'],
  [/(hive)$/i, '$1s'],
  [/([^aeiouy]|qu)y$/i, '$1ies'],
  [/(x|ch|ss|sh|s|z)$/i, '$1es'],
  [/(matr|vert|ind|cort)(ix|ex)$/i, '$1ices'],
  [/([m|l])ouse$/i, '$1ice'],
  [/([m|l])ice$/i, '$1ice'],
  [/^(ox)$/i, '$1en'],
  [/^(oxen)$/i, '$1'],
  [/(quiz)$/i, '$1zes'],
  [/(antenn|formul|nebul|vertebr|vit)a$/i, '$1ae'],
  [/(sis)$/i, 'ses'],
  [/^(?!talis|.*hu)(.*)man$/i, '$1men'],
  [/(.*)/i, '$1s']
].map(function(a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});


const pluralize = function(str) {
  const low = str.toLowerCase();
  //uncountable
  if (is_uncountable(low)) { //uncountables shouldn't ever inflect
    return str;
  }
  //is it already plural?
  if (is_plural(low) === true) {
    return str;
  }
  //irregular
  const found = irregulars.filter(function(r) {
    return r[0] === low;
  });
  if (found[0]) {
    if (fns.titlecase(low) === str) { //handle capitalisation properly
      return fns.titlecase(found[0][1]);
    }
    return found[0][1];

  }
  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    const first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];
    if (first) {
      const better_first = pluralize(first);
      return better_first + str.replace(first, '');
    }
  }
  //regular
  for (let i = 0; i < pluralize_rules.length; i++) {
    if (str.match(pluralize_rules[i].reg)) {
      return str.replace(pluralize_rules[i].reg, pluralize_rules[i].repl);
    }
  }
};
// console.log(pluralize('gas') === "gases")
// console.log(pluralize('narrative') === "narratives")
// console.log(pluralize('video') === "videos")
// console.log(pluralize('photo') === "photos")
// console.log(pluralize('stomach') === "stomachs")
// console.log(pluralize('database') === "databases")
// console.log(pluralize('kiss') === "kisses")
// console.log(pluralize('towns') === "towns")
// console.log(pluralize('peace') === "peace")
// console.log(pluralize('mayor of chicago') === "mayors of chicago")
module.exports = pluralize;

},{"../../data/irregular_nouns.js":8,"../../fns.js":18,"./is_plural.js":41,"./is_uncountable.js":42}],53:[function(require,module,exports){
'use strict';
const is_person = require('./person/is_person.js');
const is_plural = require('./is_plural.js');
const gender = require('./person/gender.js');

const pronoun = function(str) {
  if (is_person(str)) {
    let g = gender(str);
    if (g === 'Male') {
      return 'he';
    } else if (g === 'Female') {
      return 'she';
    }
    return 'they'; //singular they
  }
  //non-person, like 'microwaves'
  if (is_plural(str)) {
    return 'they';
  }
  return 'it';
};

module.exports = pronoun;

// console.log(pronoun('Illi Danza'));

},{"./is_plural.js":41,"./person/gender.js":46,"./person/is_person.js":47}],54:[function(require,module,exports){
'use strict';
const is_uncountable = require('./is_uncountable.js');
const irregulars = require('../../data/irregular_nouns.js');
const is_plural = require('./is_plural.js');
const fns = require('../../fns.js');

const singularize_rules = [
  [/([^v])ies$/i, '$1y'],
  [/ises$/i, 'isis'],
  [/ives$/i, 'ife'],
  [/(antenn|formul|nebul|vertebr|vit)ae$/i, '$1a'],
  [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, '$1us'],
  [/(buffal|tomat|tornad)(oes)$/i, '$1o'],
  [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1sis'],
  [/(vert|ind|cort)(ices)$/i, '$1ex'],
  [/(matr|append)(ices)$/i, '$1ix'],
  [/(x|ch|ss|sh|s|z|o)es$/i, '$1'],
  [/men$/i, 'man'],
  [/(n)ews$/i, '$1ews'],
  [/([ti])a$/i, '$1um'],
  [/([^f])ves$/i, '$1fe'],
  [/([lr])ves$/i, '$1f'],
  [/([^aeiouy]|qu)ies$/i, '$1y'],
  [/(s)eries$/i, '$1eries'],
  [/(m)ovies$/i, '$1ovie'],
  [/([m|l])ice$/i, '$1ouse'],
  [/(cris|ax|test)es$/i, '$1is'],
  [/(alias|status)es$/i, '$1'],
  [/(ss)$/i, '$1'],
  [/(ics)$/i, '$1'],
  [/s$/i, '']
].map(function(a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

const singularize = function(str) {
  const low = str.toLowerCase();
  //uncountable
  if (is_uncountable(low)) {
    return str;
  }
  //is it already singular?
  if (is_plural(low) === false) {
    return str;
  }
  //irregular
  const found = irregulars.filter(function(r) {
    return r[1] === low;
  });
  if (found[0]) {
    if (fns.titlecase(low) === str) { //handle capitalisation properly
      return fns.titlecase(found[0][0]);
    }
    return found[0][0];
  }
  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    const first = str.match(/^([a-z]*) (of|in|by|for) [a-z]/);
    if (first && first[1]) {
      const better_first = singularize(first[1]);
      return better_first + str.replace(first[1], '');
    }
  }
  //regular
  for (let i = 0; i < singularize_rules.length; i++) {
    if (str.match(singularize_rules[i].reg)) {
      return str.replace(singularize_rules[i].reg, singularize_rules[i].repl);
    }
  }
  return str;
};

// console.log(singularize('gases') === "gas")
// console.log(singularize('kisses') === "kiss")
// console.log(singularize('kiss') === "kiss")
// console.log(singularize('children') === "child")
// console.log(singularize('peace') === "peace")
// console.log(singularize('child') === "child")
// console.log(singularize('mayors of chicago') === "mayor of chicago")

module.exports = singularize;

},{"../../data/irregular_nouns.js":8,"../../fns.js":18,"./is_plural.js":41,"./is_uncountable.js":42}],55:[function(require,module,exports){
'use strict';

const numbers = require('../../../data/numbers');
const nums = require('./numbers');
const is_date = require('../date/is_date');

const is_value = function(str) {
  let words = str.split(' ');
  //'january 5' is not a value
  if (is_date(str)) {
    return false;
  }
  for(let i = 0; i < words.length; i++) {
    let w = words[i];
    if (nums.ones[w] || nums.teens[w] || nums.tens[w] || nums.multiples[w] || nums.prefixes[w]) {
      return true;
    }
    if (parseFloat(w)) {
      return true;
    }
  }
  return false;
};

module.exports = is_value;

},{"../../../data/numbers":11,"../date/is_date":39,"./numbers":56}],56:[function(require,module,exports){
const ones = {
  'a': 1,
  'zero': 0,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
  'first': 1,
  'second': 2,
  'third': 3,
  'fourth': 4,
  'fifth': 5,
  'sixth': 6,
  'seventh': 7,
  'eighth': 8,
  'ninth': 9
};
const teens = {
  'ten': 10,
  'eleven': 11,
  'twelve': 12,
  'thirteen': 13,
  'fourteen': 14,
  'fifteen': 15,
  'sixteen': 16,
  'seventeen': 17,
  'eighteen': 18,
  'nineteen': 19,
  'eleventh': 11,
  'twelfth': 12,
  'thirteenth': 13,
  'fourteenth': 14,
  'fifteenth': 15,
  'sixteenth': 16,
  'seventeenth': 17,
  'eighteenth': 18,
  'nineteenth': 19
};
const tens = {
  'twenty': 20,
  'thirty': 30,
  'forty': 40,
  'fifty': 50,
  'sixty': 60,
  'seventy': 70,
  'eighty': 80,
  'ninety': 90,
  'twentieth': 20,
  'thirtieth': 30,
  'fourtieth': 40,
  'fiftieth': 50,
  'sixtieth': 60,
  'seventieth': 70,
  'eightieth': 80,
  'ninetieth': 90
};
const multiples = {
  'hundred': 100,
  'grand': 1000,
  'thousand': 1000,
  'million': 1000000,
  'billion': 1000000000,
  'trillion': 1000000000000,
  'quadrillion': 1000000000000000,
  'quintillion': 1000000000000000000,
  'sextillion': 1000000000000000000000,
  'septillion': 1000000000000000000000000,
  'octillion': 1000000000000000000000000000,
  'nonillion': 1000000000000000000000000000000,
  'decillion': 1000000000000000000000000000000000
};

//used for the units
const prefixes = {
  'yotta': 1,
  'zeta': 1,
  'peta': 1,
  'tera': 1,
  'giga': 1,
  'mega': 1,
  'kilo': 1,
  'hecto': 1,
  'deca': 1,
  'centi': 1,
  'centa': 1,
  'milli': 1,
  'micro': 1,
  'nano': 1,
  'pico': 1,
  'femto': 1,
  'atto': 1,
  'zepto': 1,
  'yokto': 1,

  'square': 1,
  'cubic': 1,
  'quartic': 1,
};

module.exports = {
  ones,
  teens,
  tens,
  multiples,
  prefixes,
};

},{}],57:[function(require,module,exports){
// converts spoken numbers into integers  "fifty seven point eight" -> 57.8
//
// Spoken numbers take the following format
// [sixty five] (thousand) [sixty five] (hundred) [sixty five]
// aka: [one/teen/ten] (multiple) [one/teen/ten] (multiple) ...
// combile the [one/teen/ten]s as 'current_sum', then multiply it by its following multiple
// multiple not repeat

'use strict';
const nums = require('./numbers.js');
const units = require('./units.js');

//these sets of numbers each have different rules
//[tenth, hundreth, thousandth..] are ambiguous because they could be ordinal like fifth, or decimal like one-one-hundredth, so are ignored
// let decimal_multiple={'tenth':0.1, 'hundredth':0.01, 'thousandth':0.001, 'millionth':0.000001,'billionth':0.000000001};

const to_number = function(s) {
  if (s === null) {
    return null;
  }
  s = s.trim();
  //remember these concerns for possible errors
  let ones_done = false;
  let teens_done = false;
  let tens_done = false;
  const multiple_done = {};
  let total = 0;
  let global_multiplier = 1;
  //pretty-printed numbers
  s = s.replace(/, ?/g, '');
  //parse-out currency
  s = s.replace(/[$£€]/, '');
  //try to finish-fast
  if (s.match(/[0-9]\.[0-9]/) && parseFloat(s) === s) {
    return parseFloat(s);
  }
  if (parseInt(s, 10) === s) {
    return parseInt(s, 10);
  }
  //try to die fast. (phone numbers or times)
  if (s.match(/[0-9][\-:][0-9]/)) {
    return null;
  }
  //support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
  const mults = [{
    reg: /^(minus|negative)[\s\-]/i,
    mult: -1
  }, {
    reg: /^(a\s)?half[\s\-](of\s)?/i,
    mult: 0.5
  }, {
    reg: /^(a\s)?quarter[\s\-]/i,
    mult: 0.25
  }];
  for (let i = 0; i < mults.length; i++) {
    if (s.match(mults[i].reg)) {
      global_multiplier = mults[i].mult;
      s = s.replace(mults[i].reg, '');
      break;
    }
  }

  //do each word in turn..
  const words = s.toString().split(/[\s\-]+/);
  let w, x;
  let current_sum = 0;
  let local_multiplier = 1;
  let decimal_mode = false;
  for (let i = 0; i < words.length; i++) {
    w = words[i];

    //skip 'and' eg. five hundred and twelve
    if (w === 'and') {
      continue;
    }

    //..we're doing decimals now
    if (w === 'point' || w === 'decimal') {
      if (decimal_mode) {
        return null;
      } //two point one point six
      decimal_mode = true;
      total += current_sum;
      current_sum = 0;
      ones_done = false;
      local_multiplier = 0.1;
      continue;
    }

    //handle special rules following a decimal
    if (decimal_mode) {
      x = null;
      //allow consecutive ones in decimals eg. 'two point zero five nine'
      if (nums.ones[w] !== undefined) {
        x = nums.ones[w];
      }
      if (nums.teens[w] !== undefined) {
        x = nums.teens[w];
      }
      if (parseInt(w, 10) === w) {
        x = parseInt(w, 10);
      }
      if (!x) {
        return null;
      }
      if (x < 10) {
        total += x * local_multiplier;
        local_multiplier = local_multiplier * 0.1; // next number is next decimal place
        current_sum = 0;
        continue;
      }
      //two-digit decimals eg. 'two point sixteen'
      if (x < 100) {
        total += x * (local_multiplier * 0.1);
        local_multiplier = local_multiplier * 0.01; // next number is next decimal place
        current_sum = 0;
        continue;
      }
    }

    //if it's already an actual number
    if (w.match(/^[0-9]\.[0-9]$/)) {
      current_sum += parseFloat(w);
      continue;
    }
    if (parseInt(w, 10) === w) {
      current_sum += parseInt(w, 10);
      continue;
    }

    //ones rules
    if (nums.ones[w] !== undefined) {
      if (ones_done) {
        return null;
      } // eg. five seven
      if (teens_done) {
        return null;
      } // eg. five seventeen
      ones_done = true;
      current_sum += nums.ones[w];
      continue;
    }
    //teens rules
    if (nums.teens[w]) {
      if (ones_done) {
        return null;
      } // eg. five seventeen
      if (teens_done) {
        return null;
      } // eg. fifteen seventeen
      if (tens_done) {
        return null;
      } // eg. sixty fifteen
      teens_done = true;
      current_sum += nums.teens[w];
      continue;
    }
    //tens rules
    if (nums.tens[w]) {
      if (ones_done) {
        return null;
      } // eg. five seventy
      if (teens_done) {
        return null;
      } // eg. fiveteen seventy
      if (tens_done) {
        return null;
      } // eg. twenty seventy
      tens_done = true;
      current_sum += nums.tens[w];
      continue;
    }
    //multiple rules
    if (nums.multiples[w]) {
      if (multiple_done[w]) {
        return null;
      } // eg. five hundred six hundred
      multiple_done[w] = true;
      //reset our concerns. allow 'five hundred five'
      ones_done = false;
      teens_done = false;
      tens_done = false;
      //case of 'hundred million', (2 consecutive multipliers)
      if (current_sum === 0) {
        total = total || 1; //dont ever multiply by 0
        total *= nums.multiples[w];
      } else {
        current_sum *= nums.multiples[w];
        total += current_sum;
      }
      current_sum = 0;
      continue;
    }
    //if word is not a known thing now, die
    return null;
  }
  if (current_sum) {
    total += (current_sum || 1) * local_multiplier;
  }
  //combine with global multiplier, like 'minus' or 'half'
  total = total * global_multiplier;

  return total;
};

// console.log(to_number('five hundred'));
// console.log(to_number("a hundred"))
// console.log(to_number("four point seven seven"))

//kick it into module
module.exports = to_number;

},{"./numbers.js":56,"./units.js":58}],58:[function(require,module,exports){
const units = {
  'Temperature': {
    '°C': 'Celsius',
    '°F': 'Fahrenheit',
    'K': 'Kelvin',
    '°Ré': 'Reaumur',
    '°N': 'Newton',
    '°Ra': 'Rankine',
  },
  'Volume': {
    'm³': 'cubic meter',
    'dm³': 'cubic decimeter',
    'cm³': 'cubic centimeter',
    'l': 'liter',
    'dl': 'deciliter',
    'cl': 'centiliter',
    'ml': 'milliliter',
    'in³': 'cubic inch',
    'ft³': 'cubic foot',
    'yd³': 'cubic yard',
    'gal': 'gallon',
    'bbl': 'petroleum barrel',
    'pt': 'pint',
  },
  'Distance': {
    'km': 'kilometer',
    'm': 'meter',
    'dm': 'decimeter',
    'cm': 'centimeter',
    'mm': 'millimeter',
    'mi': 'mile',
    'in': 'inch',
    'ft': 'foot',
    'feet': 'foot',
    'yd': 'yard',
  },
  'Weight': {
    't': 'tonne',
    'kg': 'kilogram',
    'hg': 'hectogram',
    'g': 'gram',
    'dg': 'decigram',
    'cg': 'centigram',
    'mg': 'milligram',
    'µg': 'microgram',
    'carat': 'carat',
    'grain': 'grain',
    'oz': 'ounce',
    'lb': 'pound',
    'ton': 'tonne',
    'st': 'stone',
  },
  'Area': {
    'km²': 'square kilometer',
    'm²': 'square meter',
    'dm²': 'square decimeter',
    'cm²': 'square centimeter',
    'mm²': 'square millimeter',
    'ha': 'hectare',
    'ca': 'centiare',
    'mile²': 'square mile',
    'in²': 'square inch',
    'yd²': 'square yard',
    'ft²': 'square foot',
    'acre': 'acre',
  },
  'Frequency': {
    'Hz': 'hertz'
  },
  'Speed': {
    'km/h': 'kilometer per hour',
    'kmph': 'kilometer per hour',
    'mps': 'meter per second',
    'm/s': 'meter per second',
    'mph': 'mile per hour',
    'mi/h': 'mile per hour',
    'knot': 'knot',
  },
  'Data': {
    'b': 'bit',
    'B': 'byte',
    'KB': 'kilobyte',
    'Kb': 'kilobyte',
    'MB': 'megabyte',
    'Mb': 'megabyte',
    'GB': 'gigabyte',
    'Gb': 'gigabyte',
    'TB': 'terabyte',
    'Tb': 'terabyte',
    'PB': 'petabyte',
    'Pb': 'petabyte',
    'EB': 'exabyte',
    'Eb': 'exabyte',
    'ZB': 'zettabyte',
    'Zb': 'zettabyte',
    'YB': 'yottabyte',
    'Yb': 'yottabyte',
  },
  'Energy': {
    'J': 'joule',
    'Pa': 'pascal',
    'bar': 'bar',
    'W': 'watt',
    'N': 'newton',
    'Wb': 'weber',
    'T': 'tesla',
    'H': 'henry',
    'C': 'coulomb',
    'V': 'volt',
    'F': 'farad',
    'S': 'siemens',
    'O': 'ohm',
    'lx': 'lux',
    'lm': 'lumen'
  },
  'Time': {
    'year': 'year',
    'week': 'week',
    'day': 'day',
    'h': 'hour',
    'min': 'minute',
    's': 'second',
    'ms': 'millisecond',
    'µs': 'microsecond',
    'nanosecond': 'nanosecond',
    'picosecond': 'picosecond',
    'femtosecond': 'femtosecond',
    'attosecond': 'attosecond'
  },
  'Money': {
    'dollar': 'currency',
    'cent': 'currency',
    'penny': 'currency',
    'dime': 'currency',
    'dinar': 'currency',
    'euro': 'currency',
    'EU': 'currency',
    'lira': 'currency',
    'pound': 'currency',
    'GBP': 'currency',
    'pence': 'currency',
    'peso': 'currency',
    'sterling': 'currency',
    'rand': 'currency',
    'rouble': 'currency',
    'shekel': 'currency',
    'yen': 'currency',
    'yuan': 'currency',
    'franc': 'currency',
    'rupee': 'currency',
    'shilling': 'currency',
    'won': 'currency',
    'krona': 'currency',
    'dirham': 'currency',
    '€': 'currency',
    '$': 'currency',
    '¥': 'currency',
    '£': 'currency',
    'real': 'currency',
    'USD': 'currency',
    'AUD': 'currency',
    'CAD': 'currency',
    'BRL': 'currency',
    'EUR': 'currency',
    'CNY': 'currency',
    'EGP': 'currency',
    'MXN': 'currency'
  }
};

module.exports = Object.keys(units).reduce(function(h, k) {
  Object.keys(units[k]).forEach(function(u) {
    h[u] = {
      name: units[k][u],
      category: k
    };
    h[units[k][u]] = {
      name: units[k][u],
      category: k
    };
  });
  return h;
}, {});

},{}],59:[function(require,module,exports){
'use strict';
const Noun = require('../noun.js');
const to_number = require('./to_number.js');
const units = require('./units.js');
const nums = require('./numbers.js');

class Value extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Value'] = true;
    this.number = null;
    this.unit = null;
    this.unit_name = null;
    this.measurement = null;
    this.parse();
  }

  is_unit(s) {
    if (units[s]) {
      return true;
    }
    s = s.toLowerCase();
    if (nums.prefixes[s]) {
      return true;
    }
    //try singular version
    s = s.replace(/s$/); //ew
    if (units[s]) {
      return true;
    }

    return false;
  }

  parse() {
    let words = this.normal.split(' ');
    let numbers = '';
    let unit = '';
    for(let i = 0; i < words.length; i++) {
      let w = words[i];
      if (nums.ones[w] || nums.teens[w] || nums.tens[w] || nums.multiples[w]) {
        numbers += ' ' + w;
      } else if (this.is_unit(w)) { //optional units come after the number
        this.unit = w;
        if (units[w]) {
          this.measurement = units[w].category;
          this.unit_name = units[w].name;
        }
      }
    }
    this.number = to_number(numbers);
  }

}

module.exports = Value;

},{"../noun.js":43,"./numbers.js":56,"./to_number.js":57,"./units.js":58}],60:[function(require,module,exports){
//chop a string into pronounced syllables
'use strict';

//suffix fixes
function postprocess(arr) {
  //trim whitespace
  arr = arr.map(function(w) {
    return w.trim();
  });
  if (arr.length > 2) {
    return arr;
  }
  const ones = [
    /^[^aeiou]?ion/,
    /^[^aeiou]?ised/,
    /^[^aeiou]?iled/
  ];
  const l = arr.length;
  if (l > 1) {
    const suffix = arr[l - 2] + arr[l - 1];
    for (let i = 0; i < ones.length; i++) {
      if (suffix.match(ones[i])) {
        arr[l - 2] = arr[l - 2] + arr[l - 1];
        arr.pop();
      }
    }
  }
  return arr;
}

const syllables = function(str) {
  let all = [];

  //method is nested because it's called recursively
  const doer = function(w) {
    const vow = /[aeiouy]$/;
    const chars = w.split('');
    let before = '';
    let after = '';
    let current = '';
    for (let i = 0; i < chars.length; i++) {
      before = chars.slice(0, i).join('');
      current = chars[i];
      after = chars.slice(i + 1, chars.length).join('');
      let candidate = before + chars[i];

      //it's a consonant that comes after a vowel
      if (before.match(vow) && !current.match(vow)) {
        if (after.match(/^e[sm]/)) {
          candidate += 'e';
          after = after.replace(/^e/, '');
        }
        all.push(candidate);
        return doer(after);
      }
      //unblended vowels ('noisy' vowel combinations)
      if (candidate.match(/(eo|eu|ia|oa|ua|ui)$/i)) { //'io' is noisy, not in 'ion'
        all.push(before);
        all.push(current);
        return doer(after); //recursion
      }
    }
    //if still running, end last syllable
    if (str.match(/[aiouy]/) || str.match(/ee$/)) { //allow silent trailing e
      all.push(w);
    } else {
      all[all.length - 1] = (all[all.length - 1] || '') + str; //append it to the last one
    }
  };

  str.split(/\s\-/).forEach(function(s) {
    doer(s);
  });
  all = postprocess(all);

  //for words like 'tree' and 'free'
  if (all.length === 0) {
    all = [str];
  }
  //filter blanks
  all = all.filter(function(s) {
    return s !== '' && s !== null && s !== undefined;
  });

  return all;
};

// console.log(syllables("suddenly"))

module.exports = syllables;

},{}],61:[function(require,module,exports){
'use strict';
const syllables = require('./syllables');
const americanize = require('./americanize');
const britishize = require('./britishize');

class Term {
  constructor(str, tag) {
    this.changeTo(str);
    this.reason = '';
    let types = {
      Determiner: 'Determiner',
      Conjunction: 'Conjunction',
      Preposition: 'Preposition',
      Posessive: 'Posessive',
    };
    this.pos = {};
    this.tag = types[tag] || '?';
  }

  changeTo(str) {
    str = str || '';
    this.text = str.trim();
    this.normal = '';
    this.normalize();
  }

  //Term methods..
  is_capital() {
    if (this.text.match(/[A-Z][a-z]/)) { //tranditional capital
      return true;
    }
    return false;
  }
  is_acronym() {
    if (this.text.match(/([A-Z]\.)+[A-Z]?$/)) {
      return true;
    }
    return false;
  }

  normalize() {
    let str = this.text || '';
    str = str.toLowerCase();
    str = str.replace(/[,\.!:;\?\(\)]/, '');
    str = str.replace(/’/g, '\'');
    str = str.replace(/"/g, '');
    // coerce single curly quotes
    str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, '\'');
    // coerce double curly quotes
    str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '"');
    if (!str.match(/[a-z0-9]/i)) {
      return '';
    }
    this.normal = str;
    return this.normal;
  }
  americanize() {
    return americanize(this.normal);
  }
  britishize() {
    return britishize(this.normal);
  }
  syllables() {
    return syllables(this.normal);
  }
}

// let t = new Term("synthesise")
// console.log(t.isVerb())

module.exports = Term;

},{"./americanize":35,"./britishize":36,"./syllables":60}],62:[function(require,module,exports){
//turn a verb into its other grammatical forms.
'use strict';
const verb_to_actor = require('./to_actor');
const verb_irregulars = require('../../../data/verb_irregulars');
const verb_rules = require('./verb_rules');
const predict = require('./predict_form.js');

//fallback to this transformation if it has an unknown prefix
const fallback = function(w) {
  if (!w) {
    return {};
  }
  let infinitive;
  if (w.length > 4) {
    infinitive = w.replace(/ed$/, '');
  } else {
    infinitive = w.replace(/d$/, '');
  }
  let present, past, gerund, actor;
  if (w.match(/[^aeiou]$/)) {
    gerund = w + 'ing';
    past = w + 'ed';
    if (w.match(/ss$/)) {
      present = w + 'es'; //'passes'
    } else {
      present = w + 's';
    }
    actor = verb_to_actor(infinitive);
  } else {
    gerund = w.replace(/[aeiou]$/, 'ing');
    past = w.replace(/[aeiou]$/, 'ed');
    present = w.replace(/[aeiou]$/, 'es');
    actor = verb_to_actor(infinitive);
  }
  return {
    infinitive: infinitive,
    present: present,
    past: past,
    gerund: gerund,
    actor: actor,
    future: 'will ' + infinitive,
    perfect: 'have ' + past,
    pluperfect: 'had ' + past,
    future_perfect: 'will have ' + past,
  };
};

//make sure object has all forms
const fufill = function(obj, prefix) {
  if (!obj.infinitive) {
    return obj;
  }
  if (!obj.gerund) {
    obj.gerund = obj.infinitive + 'ing';
  }
  if (!obj.actor) {
    obj.actor = verb_to_actor(obj.infinitive);
  }
  if (!obj.present) {
    obj.present = obj.infinitive + 's';
  }
  if (!obj.past) {
    obj.past = obj.infinitive + 'ed';
  }
  //add the prefix to all forms, if it exists
  if (prefix) {
    Object.keys(obj).forEach(function(k) {
      obj[k] = prefix + obj[k];
    });
  }
  //future is 'will'+infinitive
  if (!obj.future) {
    obj.future = 'will ' + obj.infinitive;
  }
  //perfect is 'have'+past-tense
  if (!obj.perfect) {
    obj.perfect = 'have ' + obj.past;
  }
  //pluperfect is 'had'+past-tense
  if (!obj.pluperfect) {
    obj.pluperfect = 'had ' + obj.past;
  }
  //future perfect is 'will have'+past-tense
  if (!obj.future_perfect) {
    obj.future_perfect = 'will have ' + obj.past;
  }
  return obj;
};

const conjugate = function(w) {
  if (w === undefined) {
    return {};
  }

  //for phrasal verbs ('look out'), conjugate look, then append 'out'
  const phrasal_reg = new RegExp('^(.*?) (in|out|on|off|behind|way|with|of|do|away|across|ahead|back|over|under|together|apart|up|upon|aback|down|about|before|after|around|to|forth|round|through|along|onto)$', 'i');
  if (w.match(' ') && w.match(phrasal_reg)) {
    const split = w.match(phrasal_reg, '');
    const phrasal_verb = split[1];
    const particle = split[2];
    const result = conjugate(phrasal_verb); //recursive
    // delete result['actor'];
    Object.keys(result).forEach(function(k) {
      if (result[k]) {
        result[k] += ' ' + particle;
      }
    });
    return result;
  }

  //for pluperfect ('had tried') remove 'had' and call it past-tense
  if (w.match(/^had [a-z]/i)) {
    w = w.replace(/^had /i, '');
  }
  //for perfect ('have tried') remove 'have' and call it past-tense
  if (w.match(/^have [a-z]/i)) {
    w = w.replace(/^have /i, '');
  }

  //for future perfect ('will have tried') remove 'will have' and call it past-tense
  if (w.match(/^will have [a-z]/i)) {
    w = w.replace(/^will have /i, '');
  }

  //chop it if it's future-tense
  w = w.replace(/^will /i, '');
  //un-prefix the verb, and add it in later
  const prefix = (w.match(/^(over|under|re|anti|full)\-?/i) || [])[0];
  const verb = w.replace(/^(over|under|re|anti|full)\-?/i, '');
  //check irregulars
  let obj = {};
  let l = verb_irregulars.length;
  for (let i = 0; i < l; i++) {
    const x = verb_irregulars[i];
    if (verb === x.present || verb === x.gerund || verb === x.past || verb === x.infinitive) {
      obj = JSON.parse(JSON.stringify(verb_irregulars[i])); // object 'clone' hack, to avoid mem leak
      return fufill(obj, prefix);
    }
  }
  //guess the tense, so we know which transormation to make
  const predicted = predict(w) || 'infinitive';

  //check against suffix rules
  l = verb_rules[predicted].length;
  for (let i = 0; i < l; i++) {
    const r = verb_rules[predicted][i];
    if (w.match(r.reg)) {
      obj[predicted] = w;
      const keys = Object.keys(r.repl);
      for (let o = 0; o < keys.length; o++) {
        if (keys[o] === predicted) {
          obj[keys[o]] = w;
        } else {
          obj[keys[o]] = w.replace(r.reg, r.repl[keys[o]]);
        }
      }
      return fufill(obj);
    }
  }

  //produce a generic transformation
  return fallback(w);
};
module.exports = conjugate;

// console.log(conjugate("walking"))
// console.log(conjugate("overtook"))
// console.log(conjugate("watch out"))
// console.log(conjugate("watch"))
// console.log(conjugate("smash"))
// console.log(conjugate("word"))
// // broken
// console.log(conjugate("read"))
// console.log(conjugate("free"))
// console.log(conjugate("flesh"))
// console.log(conjugate("branch"))
// console.log(conjugate("spred"))
// console.log(conjugate("bog"))
// console.log(conjugate("nod"))
// console.log(conjugate("had tried"))
// console.log(conjugate("have tried"))

},{"../../../data/verb_irregulars":16,"./predict_form.js":63,"./to_actor":65,"./verb_rules":66}],63:[function(require,module,exports){
'use strict';
//this method is used to predict which current conjugation a verb is

//this method is the slowest in the whole library, basically TODO:whaaa
const suffix_rules = require('./suffix_rules');
const fns = require('../../../fns.js');

const predict = function(w) {

  if (w.match(/will ha(ve|d) [a-z]{2}/)) {
    return 'future_perfect';
  }
  if (w.match(/will [a-z]{2}/)) {
    return 'future';
  }
  if (w.match(/had [a-z]{2}/)) {
    return 'pluperfect';
  }
  if (w.match(/have [a-z]{2}/)) {
    return 'perfect';
  }
  if (w.match(/..erer$/)) {
    return 'actor';
  }

  const arr = Object.keys(suffix_rules);
  for (let i = 0; i < arr.length; i++) {
    if (fns.endsWith(w, arr[i])) {
      return suffix_rules[arr[i]];
    }
  }
  return 'infinitive';
};

module.exports = predict;

},{"../../../fns.js":18,"./suffix_rules":64}],64:[function(require,module,exports){
'use strict';
//generated from test data
const compact = {
  'gerund': [
    'ing'
  ],
  'infinitive': [
    'ate',
    'ize',
    'tion',
    'rify',
    'ress',
    'ify',
    'age',
    'nce',
    'ect',
    'ise',
    'ine',
    'ish',
    'ace',
    'ash',
    'ure',
    'tch',
    'end',
    'ack',
    'and',
    'ute',
    'ade',
    'ock',
    'ite',
    'ase',
    'ose',
    'use',
    'ive',
    'int',
    'nge',
    'lay',
    'est',
    'ain',
    'ant',
    'eed',
    'er',
    'le'
  ],
  'past': [
    'ed',
    'lt',
    'nt',
    'pt',
    'ew',
    'ld'
  ],
  'present': [
    'rks',
    'cks',
    'nks',
    'ngs',
    'mps',
    'tes',
    'zes',
    'ers',
    'les',
    'acks',
    'ends',
    'ands',
    'ocks',
    'lays',
    'eads',
    'lls',
    'els',
    'ils',
    'ows',
    'nds',
    'ays',
    'ams',
    'ars',
    'ops',
    'ffs',
    'als',
    'urs',
    'lds',
    'ews',
    'ips',
    'es',
    'ts',
    'ns',
    's'
  ]
};
const suffix_rules = {};
const keys = Object.keys(compact);
const l = keys.length;
let l2;

for (let i = 0; i < l; i++) {
  l2 = compact[keys[i]].length;
  for (let o = 0; o < l2; o++) {
    suffix_rules[compact[keys[i]][o]] = keys[i];
  }
}
module.exports = suffix_rules;

},{}],65:[function(require,module,exports){
//somone who does this present-tense verb
//turn 'walk' into 'walker'
'use strict';
const actor = function(str) {
  str = str || '';
  const irregulars = {
    'tie': 'tier',
    'dream': 'dreamer',
    'sail': 'sailer',
    'run': 'runner',
    'rub': 'rubber',
    'begin': 'beginner',
    'win': 'winner',
    'claim': 'claimant',
    'deal': 'dealer',
    'spin': 'spinner'
  };
  const dont = {
    'aid': 1,
    'fail': 1,
    'appear': 1,
    'happen': 1,
    'seem': 1,
    'try': 1,
    'say': 1,
    'marry': 1,
    'be': 1,
    'forbid': 1,
    'understand': 1,
    'bet': 1
  };
  const transforms = [{
    'reg': /e$/i,
    'repl': 'er'
  }, {
    'reg': /([aeiou])([mlgp])$/i,
    'repl': '$1$2$2er'
  }, {
    'reg': /([rlf])y$/i,
    'repl': '$1ier'
  }, {
    'reg': /^(.?.[aeiou])t$/i,
    'repl': '$1tter'
  }];

  if (dont.hasOwnProperty(str)) {
    return null;
  }
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  for (let i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }
  return str + 'er';
};

// console.log(verb_to_actor('set'))
// console.log(verb_to_actor('sweep'))
// console.log(verb_to_actor('watch'))
module.exports = actor;

},{}],66:[function(require,module,exports){
// regex rules for each part of speech that convert it to all other parts of speech.
// used in combination with the generic 'fallback' method
'use strict';
let verb_rules = {
  'actor': [
    [
      '(er)er$',
      {
        'in': '$1',
        'pr': '$1s',
        'g': '$1ing',
        'pa': '$1ed'
      }
    ],
  ],
  'infinitive': [
    [
      '(eed)$',
      {
        'pr': '$1s',
        'g': '$1ing',
        'pa': '$1ed',
        'do': '$1er'
      }
    ],
    [
      '(e)(ep)$',
      {
        'pr': '$1$2s',
        'g': '$1$2ing',
        'pa': '$1pt',
        'do': '$1$2er'
      }
    ],
    [
      '(a[tg]|i[zn]|ur|nc|gl|is)e$',
      {
        'pr': '$1es',
        'g': '$1ing',
        'pa': '$1ed'
      }
    ],
    [
      '([i|f|rr])y$',
      {
        'pr': '$1ies',
        'g': '$1ying',
        'pa': '$1ied'
      }
    ],
    [
      '([td]er)$',
      {
        'pr': '$1s',
        'g': '$1ing',
        'pa': '$1ed'
      }
    ],
    [
      '([bd]l)e$',
      {
        'pr': '$1es',
        'g': '$1ing',
        'pa': '$1ed'
      }
    ],
    [
      '(ish|tch|ess)$',
      {
        'pr': '$1es',
        'g': '$1ing',
        'pa': '$1ed'
      }
    ],
    [
      '(ion|end|e[nc]t)$',
      {
        'pr': '$1s',
        'g': '$1ing',
        'pa': '$1ed'
      }
    ],
    [
      '(om)e$',
      {
        'pr': '$1es',
        'g': '$1ing',
        'pa': 'ame'
      }
    ],
    [
      '([aeiu])([pt])$',
      {
        'pr': '$1$2s',
        'g': '$1$2$2ing',
        'pa': '$1$2'
      }
    ],
    [
      '(er)$',
      {
        'pr': '$1s',
        'g': '$1ing',
        'pa': '$1ed'
      }
    ],
    [
      '(en)$',
      {
        'pr': '$1s',
        'g': '$1ing',
        'pa': '$1ed'
      }
    ]
  ],
  'present': [
    [
      '(ies)$',
      {
        'in': 'y',
        'g': 'ying',
        'pa': 'ied'
      }
    ],
    [
      '(tch|sh)es$',
      {
        'in': '$1',
        'g': '$1ing',
        'pa': '$1ed'
      }
    ],
    [
      '(ss)es$',
      {
        'in': '$1',
        'g': '$1ing',
        'pa': '$1ed'
      }
    ],
    [
      '([tzlshicgrvdnkmu])es$',
      {
        'in': '$1e',
        'g': '$1ing',
        'pa': '$1ed'
      }
    ],
    [
      '(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$',
      {
        'in': '$1',
        'g': '$1ing',
        'pa': '$1ed'
      }
    ],
    [
      '(ow)s$',
      {
        'in': '$1',
        'g': '$1ing',
        'pa': 'ew'
      }
    ],
    [
      '(op)s$',
      {
        'in': '$1',
        'g': '$1ping',
        'pa': '$1ped'
      }
    ],
    [
      '([eirs])ts$',
      {
        'in': '$1t',
        'g': '$1tting',
        'pa': '$1tted'
      }
    ],
    [
      '(ll)s$',
      {
        'in': '$1',
        'g': '$1ing',
        'pa': '$1ed'
      }
    ],
    [
      '(el)s$',
      {
        'in': '$1',
        'g': '$1ling',
        'pa': '$1led'
      }
    ],
    [
      '(ip)es$',
      {
        'in': '$1e',
        'g': '$1ing',
        'pa': '$1ed'
      }
    ],
    [
      'ss$',
      {
        'in': 'ss',
        'g': 'ssing',
        'pa': 'ssed'
      }
    ],
    [
      's$',
      {
        'in': '',
        'g': 'ing',
        'pa': 'ed'
      }
    ]
  ],
  'gerund': [
    [
      'pping$',
      {
        'in': 'p',
        'pr': 'ps',
        'pa': 'pped'
      }
    ],
    [
      'lling$',
      {
        'in': 'll',
        'pr': 'lls',
        'pa': 'lled'
      }
    ],
    [
      'tting$',
      {
        'in': 't',
        'pr': 'ts',
        'pa': 't'
      }
    ],
    [
      'ssing$',
      {
        'in': 'ss',
        'pr': 'sses',
        'pa': 'ssed'
      }
    ],
    [
      'gging$',
      {
        'in': 'g',
        'pr': 'gs',
        'pa': 'gged'
      }
    ],
    [
      '([^aeiou])ying$',
      {
        'in': '$1y',
        'pr': '$1ies',
        'pa': '$1ied',
        'do': '$1ier'
      }
    ],
    [
      '(i.)ing$',
      {
        'in': '$1e',
        'pr': '$1es',
        'pa': '$1ed'
      }
    ],
    [
      '(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$',
      {
        'in': '$1e',
        'pr': '$1es',
        'pa': '$1ed'
      }
    ],
    [
      '(ch|sh)ing$',
      {
        'in': '$1',
        'pr': '$1es',
        'pa': '$1ed'
      }
    ],
    [
      '(..)ing$',
      {
        'in': '$1',
        'pr': '$1s',
        'pa': '$1ed'
      }
    ]
  ],
  'past': [
    [
      '(ued)$',
      {
        'pr': 'ues',
        'g': 'uing',
        'pa': 'ued',
        'do': 'uer'
      }
    ],
    [
      '(e|i)lled$',
      {
        'pr': '$1lls',
        'g': '$1lling',
        'pa': '$1lled',
        'do': '$1ller'
      }
    ],
    [
      '(sh|ch)ed$',
      {
        'in': '$1',
        'pr': '$1es',
        'g': '$1ing',
        'do': '$1er'
      }
    ],
    [
      '(tl|gl)ed$',
      {
        'in': '$1e',
        'pr': '$1es',
        'g': '$1ing',
        'do': '$1er'
      }
    ],
    [
      '(ss)ed$',
      {
        'in': '$1',
        'pr': '$1es',
        'g': '$1ing',
        'do': '$1er'
      }
    ],
    [
      'pped$',
      {
        'in': 'p',
        'pr': 'ps',
        'g': 'pping',
        'do': 'pper'
      }
    ],
    [
      'tted$',
      {
        'in': 't',
        'pr': 'ts',
        'g': 'tting',
        'do': 'tter'
      }
    ],
    [
      'gged$',
      {
        'in': 'g',
        'pr': 'gs',
        'g': 'gging',
        'do': 'gger'
      }
    ],
    [
      '(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$',
      {
        'in': '$1',
        'pr': '$1s',
        'g': '$1ing',
        'do': '$1er'
      }
    ],
    [
      '(..[^aeiou])ed$',
      {
        'in': '$1e',
        'pr': '$1es',
        'g': '$1ing',
        'do': '$1er'
      }
    ],
    [
      'ied$',
      {
        'in': 'y',
        'pr': 'ies',
        'g': 'ying',
        'do': 'ier'
      }
    ],
    [
      '(.o)ed$',
      {
        'in': '$1o',
        'pr': '$1os',
        'g': '$1oing',
        'do': '$1oer'
      }
    ],
    [
      '(.i)ed$',
      {
        'in': '$1',
        'pr': '$1s',
        'g': '$1ing',
        'do': '$1er'
      }
    ],
    [
      '([rl])ew$',
      {
        'in': '$1ow',
        'pr': '$1ows',
        'g': '$1owing'
      }
    ],
    [
      '([pl])t$',
      {
        'in': '$1t',
        'pr': '$1ts',
        'g': '$1ting'
      }
    ]
  ]
};
//unpack compressed form
verb_rules = Object.keys(verb_rules).reduce(function(h, k) {
  h[k] = verb_rules[k].map(function(a) {
    const obj = {
      reg: new RegExp(a[0], 'i'),
      repl: {
        infinitive: a[1]['in'],
        present: a[1]['pr'],
        past: a[1]['pa'],
        gerund: a[1]['g']
      }
    };
    if (a[1]['do']) {
      obj.repl.actor = a[1]['do'];
    }
    return obj;
  });
  return h;
}, {});

module.exports = verb_rules;
// console.log(JSON.stringify(verb_rules, null, 2));

},{}],67:[function(require,module,exports){
'use strict';
//recieves a verb object, and returns a negated string
//sort out don't/didn't/doesn't/won't
const negate = function(v, form) {

  let exceptions = {
    'is': 'isn\'t',
    'are': 'aren\'t',
    'was': 'wasn\'t',
    'will': 'won\'t',
    'had': 'hadn\'t',
    //modals
    'did': 'didn\'t',
    'would': 'wouldn\'t',
    'could': 'couldn\'t',
    'should': 'shouldn\'t',
    'can': 'can\'t',
    'must': 'mustn\'t',
    'have': 'hasn\'t',
    'does': 'doesn\'t',
    //un-negate?
    'didn\'t': 'did',
    'doesn\'t': 'does',
    'wouldn\'t': 'would',
    'couldn\'t': 'could',
    'shouldn\'t': 'should',
    'can\'t': 'can',
    'won\'t': 'will',
    'mustn\'t': 'must',
    'shan\'t': 'shall',
    'shant': 'shall',
    'not': '',
    'don\'t': '',
  };
  //hard-coded exceptions
  if (exceptions[v.normal]) {
    return exceptions[v.normal];
  }

  //multiple-word verbs, like 'have walked'
  let words = v.normal.split(' ');
  if (words.length > 1 && exceptions[words[0]]) {
    return exceptions[words[0]] + ' ' + words.slice(1, words.length).join(' ');
  }
  form = form || v.conjugation();
  //walked -> didn't walk
  if (form === 'PastTense') {
    return 'didn\'t ' + v.conjugate()['infinitive'];
  }
  //walks -> doesn't walk
  if (form === 'PresentTense') {
    return 'doesn\'t ' + v.conjugate()['infinitive'];
  }
  //walking -> not walking
  if (form === 'Gerund') {
    return 'not ' + v.text;
  }
  //walker -> non-walker ?
  if (form === 'Actor') {
    return 'non-' + v.text;
  }
  //walk -> not walk ?
  if (form === 'Infinitive') {
    return 'not ' + v.text;
  }

  return v.text;

};

module.exports = negate;

},{}],68:[function(require,module,exports){
'use strict';
const Term = require('../term.js');
const conjugate = require('./conjugate/conjugate.js');
const predict_form = require('./conjugate/predict_form.js');
const negate = require('./negate.js');

const verbTags = {
  infinitive: 'Infinitive',
  present: 'PresentTense',
  past: 'PastTense',
  gerund: 'Gerund',
  actor: 'Actor',
  future: 'FutureTense',
  pluperfect: 'PluperfectTense',
  perfect: 'PerfectTense',

  PerfectTense: 'PerfectTense',
  PluperfectTense: 'PluperfectTense',
  FutureTense: 'FutureTense',
  PastTense: 'PastTense',
  PresentTense: 'PresentTense',
};

class Verb extends Term {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Verb'] = true;
    this.conjugations = {}; //cached conjugations
    //if we've been told which
    if (tag && verbTags[tag]) {
      this.pos[tag] = true;
      this.conjugations[tag] = this.normal;
    }
  }


  //retrieve a specific form
  conjugation() {
    //check cached conjugations
    this.conjugations = this.conjugate();
    let keys = Object.keys(this.conjugations);
    for(let i = 0; i < keys.length; i++) {
      if (this.conjugations[keys[i]] === this.normal) {
        return verbTags[keys[i]];
      }
    }
    return verbTags[predict(this.normal)];
  }

  conjugate() {
    this.conjugations = conjugate(this.normal);
    return this.conjugations;
  }
  to_past() {
    let tense = 'past';
    if (!this.conjugations[tense]) {
      this.conjugate(this.normal);
    }
    this.tag = verbTags[tense];
    this.changeTo(this.conjugations[tense]);
    return this.conjugations[tense];
  }
  to_present() {
    let tense = 'present';
    if (!this.conjugations[tense]) {
      this.conjugate(this.normal);
    }
    this.tag = verbTags[tense];
    this.changeTo(this.conjugations[tense]);
    return this.conjugations[tense];
  }
  to_future() {
    let tense = 'future';
    if (!this.conjugations[tense]) {
      this.conjugate(this.normal);
    }
    this.tag = verbTags[tense];
    this.changeTo(this.conjugations[tense]);
    return this.conjugations[tense];
  }


  //is this verb negative already?
  isNegative() {
    const str = this.normal;
    if (str.match(/(n't|\bnot\b)/)) {
      return true;
    }
    return false;
  }

  negate(form) {
    if (this.isNegative()) {
      return this.text;
    }
    this.changeTo(negate(this, form));
    return this.text;

  }

}

// let v = new Verb("walk", "asdf")
// console.log(v.form())

module.exports = Verb;

},{"../term.js":61,"./conjugate/conjugate.js":62,"./conjugate/predict_form.js":63,"./negate.js":67}],69:[function(require,module,exports){
'use strict';
//split a string into all possible parts
const fns = require('../fns.js');

//n-gram takes a list of pre-cleaned terms, and makes no assumptions
const ngram = function(terms, options) {
  options = options || {};
  const min_count = options.min_count || 1; // minimum hit-count
  const max_size = options.max_size || 5; // maximum gram count
  const keys = [null];
  let results = [];
  //prepare the keys object
  for (let i = 1; i <= max_size; i++) {
    keys.push({});
  }
  // Create a hash for counting..
  const textlen = terms.length;
  for (let i = 0; i < textlen; i++) {
    let s = terms[i];
    keys[1][s] = (keys[1][s] || 0) + 1;
    for (let j = 2; j <= max_size; j++) {
      if (i + j <= textlen) {
        s += ' ' + terms[i + j - 1];
        keys[j][s] = (keys[j][s] || 0) + 1;
      } else {
        break;
      }
    }
  }
  // map the hash to an array for sorting
  for (let k = 1; k < max_size; k++) {
    results[k] = [];
    const key = keys[k];
    const words = Object.keys(keys[k]);
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (key[word] >= min_count) {
        results[k].push({
          'word': word,
          'count': key[word],
          'size': k
        });
      }
    }
  }
  //post-process + sort
  results = fns.compact(results);
  results = results.map(function(r) {
    r = r.sort(function(a, b) {
      return b.count - a.count;
    });
    return r;
  });
  return results;
};

// console.log(ngram("hi dr nick! dr nick!".split(" ")))

module.exports = ngram;

},{"../fns.js":18}],70:[function(require,module,exports){
//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2015 MIT
'use strict';
let abbreviations = require('../data/abbreviations').abbreviations;

const sentence_parser = function(text) {
  const sentences = [];
  //first do a greedy-split..
  const chunks = text.split(/(\S.+?[.\?!])(?=\s+|$|")/g);

  //detection of non-sentence chunks
  const abbrev_reg = new RegExp('\\b(' + abbreviations.join('|') + ')[.!?] ?$', 'i');
  const acronym_reg = new RegExp('[ |\.][A-Z]\.?$', 'i');
  const elipses_reg = new RegExp('\\.\\.\\.*$');

  //loop through these chunks, and join the non-sentence chunks back together..
  const chunks_length = chunks.length;
  for (let i = 0; i < chunks_length; i++) {
    if (chunks[i]) {
      //trim whitespace
      chunks[i] = chunks[i].replace(/^\s+|\s+$/g, '');
      //should this chunk be combined with the next one?
      if (chunks[i + 1] && chunks[i].match(abbrev_reg) || chunks[i].match(acronym_reg) || chunks[i].match(elipses_reg)) {
        chunks[i + 1] = ((chunks[i] || '') + ' ' + (chunks[i + 1] || '')).replace(/ +/g, ' ');
      } else if (chunks[i] && chunks[i].length > 0) { //this chunk is a proper sentence..
        sentences.push(chunks[i]);
        chunks[i] = '';
      }
    }
  }
  //if we never got a sentence, return the given text
  if (sentences.length === 0) {
    return [text];
  }

  return sentences;
};

module.exports = sentence_parser;

},{"../data/abbreviations":1}],71:[function(require,module,exports){
'use strict';
const sentence_parser = require('./sentence_parser.js');
const Sentence = require('../sentence/sentence.js');
const ngram = require('./ngram.js');
const fns = require('../fns.js');

//a text object is a series of sentences, along with the generic methods for transforming them
class Text {
  constructor(str) {
    this.str = str || '';
    this.sentences = sentence_parser(str).map(function(s) {
      return new Sentence(s);
    });
  }

  //Text methods
  ngram(options) {
    let terms = this.terms();
    terms = terms.map(function(t) {
      return t.normal;
    });
    return ngram(terms, options);
  }

  //map over sentence methods
  text() {
    const arr = this.sentences.map(function(s) {
      return s.text();
    });
    return fns.flatten(arr).join(' ');
  }
  terms() {
    const arr = this.sentences.map(function(s) {
      return s.terms;
    });
    return fns.flatten(arr);
  }
  normalised() {
    const arr = this.sentences.map(function(s) {
      return s.normalized();
    });
    return fns.flatten(arr).join(' ');
  }
  tags() {
    return this.sentences.map(function(s) {
      return s.tags();
    });
  }
  to_past() {
    return this.sentences.map(function(s) {
      return s.to_past();
    });
  }
  to_present() {
    return this.sentences.map(function(s) {
      return s.to_present();
    });
  }
  to_future() {
    return this.sentences.map(function(s) {
      return s.to_future();
    });
  }
  //mining
  people() {
    let arr = [];
    for(let i = 0; i < this.sentences.length; i++) {
      arr = arr.concat(this.sentences[i].people());
    }
    return arr;
  }
  places() {
    let arr = [];
    for(let i = 0; i < this.sentences.length; i++) {
      arr = arr.concat(this.sentences[i].places());
    }
    return arr;
  }
  organisations() {
    let arr = [];
    for(let i = 0; i < this.sentences.length; i++) {
      arr = arr.concat(this.sentences[i].organisations());
    }
    return arr;
  }
  dates() {
    let arr = [];
    for(let i = 0; i < this.sentences.length; i++) {
      arr = arr.concat(this.sentences[i].dates());
    }
    return arr;
  }
  values() {
    let arr = [];
    for(let i = 0; i < this.sentences.length; i++) {
      arr = arr.concat(this.sentences[i].values());
    }
    return arr;
  }
}

module.exports = Text;

},{"../fns.js":18,"../sentence/sentence.js":27,"./ngram.js":69,"./sentence_parser.js":70}]},{},[19]);
