(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nlp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports={
  "author": "Spencer Kelly <spencermountain@gmail.com> (http://spencermounta.in)",
  "name": "compromise",
  "description": "natural language processing in the browser",
  "version": "7.0.11",
  "main": "./builds/compromise.js",
  "repository": {
    "type": "git",
    "url": "git://github.com/nlp-compromise/compromise.git"
  },
  "scripts": {
    "test": "node ./scripts/test.js",
    "browsertest": "node ./scripts/browserTest.js",
    "build": "node ./scripts/build.js",
    "demo": "node ./scripts/demo.js",
    "watch": "node ./scripts/watch.js",
    "filesize": "node ./scripts/filesize.js",
    "coverage": "node ./scripts/coverage.js"
  },
  "files": [
    "builds/"
  ],
  "dependencies": {},
  "devDependencies": {
    "babel-preset-es2015": "6.9.0",
    "babel-preset-stage-2": "^6.11.0",
    "babelify": "7.3.0",
    "babili": "0.0.11",
    "browserify": "13.0.1",
    "chalk": "^1.1.3",
    "codacy-coverage": "^2.0.0",
    "derequire": "^2.0.3",
    "eslint": "^3.1.1",
    "gaze": "^1.1.1",
    "http-server": "0.9.0",
    "nlp-corpus": "latest",
    "nyc": "^8.4.0",
    "shelljs": "^0.7.2",
    "tap-min": "^1.1.0",
    "tap-spec": "4.1.1",
    "tape": "4.6.0",
    "uglify-js": "2.7.0"
  },
  "license": "MIT"
}

},{}],2:[function(_dereq_,module,exports){
//adjectives that either aren't covered by rules, or have superlative/comparative forms
//this list is the seed, from which various forms are conjugated
'use strict';
const fns = _dereq_('../fns');

//suffix-index adjectives
//  {cial:'cru,spe'} -> 'crucial', 'special'
let compressed = {
  going: 'easy,fore,on,out',
  ight: 'overn,overwe,r,sl,upt',
  ated: 'antiqu,intoxic,sophistic,unregul,unrel',
  rant: 'aber,exube,flag,igno,vib',
  wing: 'harro,kno,left-,right-',
  ted: 'expec,impor,limi,spiri,talen,tes,unexpec,unpreceden',
  ish: 'dan,fool,hell,lout,self,snobb,squeam,styl',
  ary: 'dre,legend,necess,prim,sc,second,w,we',
  ite: 'el,favor,fin,oppos,pet,pol,recond,tr',
  ely: 'hom,lik,liv,lon,lov,tim,unlik',
  tly: 'cos,ghas,ghos,nigh,sain,sprigh,unsigh',
  dly: 'cowar,cud,frien,frien,kin,ma',
  ble: 'a,dou,hum,nim,no,proba',
  rly: 'bu,disorde,elde,hou,neighbo,yea',
  ped: 'cram,pum,stereoty,stri,war',
  sed: 'clo,disea,distres,unsupervi,u',
  lly: 'chi,hi,jo,si,sme',
  per: 'dap,impro,pro,su,up',
  ile: 'fert,host,juven,mob,volat',
  led: 'detai,disgrunt,fab,paralle,troub',
  ast: 'e,l,p,steadf',
  ent: 'abs,appar,b,pres',
  ged: 'dama,deran,jag,rag',
  ded: 'crow,guar,retar,undeci',
  est: 'b,dishon,hon,quick',
  ial: 'colon,impart,init,part',
  ter: 'bet,lat,ou,ut',
  ond: 'bey,bl,vagab',
  ady: 'he,re,sh,ste',
  eal: 'ether,id,r,surr',
  ard: 'abo,awkw,stand,straightforw',
  ior: 'jun,pr,sen,super',
  ale: 'fem,m,upsc,wholes',
  ed: 'advanc,belov,craz,determin,hallow,hook,inbr,justifi,nak,nuanc,sacr,subdu,unauthoriz,unrecogniz,wick',
  ly: 'dai,earth,gris,heaven,low,meas,month,oi,prick,seem,s,ug,unru,week,wi,woman',
  al: 'actu,coloss,glob,illeg,leg,leth,liter,loy,ov,riv,roy,univers,usu',
  dy: 'baw,bloo,clou,gau,gid,han,mol,moo,stur,ti,tren,unti,unwiel',
  se: 'adver,den,diver,fal,immen,inten,obe,perver,preci,profu',
  er: 'clev,form,inn,oth,ov,she,slend,somb,togeth,und',
  id: 'afra,hum,langu,plac,rab,sord,splend,stup,torp',
  re: 'awa,bizar,di,enti,macab,me,seve,since,spa',
  en: 'barr,brok,crav,op,sudd,unev,unwritt,wood',
  ic: 'alcohol,didact,gener,hispan,organ,publ,symbol',
  ny: 'ma,pho,pu,shi,skin,ti,za',
  st: 'again,mo,populi,raci,robu,uttermo',
  ne: 'do,go,insa,obsce,picayu,sere',
  nd: 'behi,bla,bli,profou,undergrou,wou',
  le: 'multip,sing,so,subt,who',
  pt: 'abru,ade,a,bankru,corru,nondescri',
  ty: 'faul,hef,lof,mea,sal,uppi',
  sy: 'bu,chee,lou,no,ro',
  ct: 'abstra,exa,imperfe,inta,perfe',
  in: 'certa,highfalut,ma,tw,va',
  et: 'discre,secr,sovi,ups,viol',
  me: 'part-ti,pri,sa,supre,welco',
  cy: 'boun,fan,i,jui,spi',
  ry: 'fur,sor,tawd,wi,w',
  te: 'comple,concre,obsole,remo',
  ld: 'ba,bo,go,mi',
  an: 'deadp,republic,t,urb',
  ll: 'a,i,overa,sti',
  ay: 'everyd,g,gr,ok',
  or: 'indo,maj,min,outdo',
  my: 'foa,gloo,roo,sli',
  ck: 'ba,qua,si,sli',
  rt: 'cove,expe,hu,ove',
  ul: 'fo,gainf,helpf,painf'
};

let arr = [
  'ablaze',
  'above',
  'adult',
  'ahead',
  'aloof',
  'arab',
  'asleep',
  'average',
  'backwards',
  'bad',
  'blank',
  'bogus',
  'bottom',
  'brisk',
  'cagey',
  'chief',
  'civil',
  'common',
  'complex',
  'cozy',
  'crisp',
  'devout',
  'difficult',
  'due',
  'dumb',
  'eerie',
  'evil',
  'excess',
  'extra',
  'fake',
  'far',
  'faux',
  'fierce ',
  'final',
  'fit',
  'foreign',
  'fun',
  'good',
  'goofy',
  'gratis',
  'grey',
  'groovy',
  'gross',
  'half',
  'huge',
  'humdrum',
  'inside',
  'kaput',
  'left',
  'level',
  'lewd',
  'magenta',
  'makeshift',
  'mammoth',
  'medium',
  'modern',
  'moot',
  'naive',
  'nearby',
  'next',
  'nonstop',
  'north',
  'notable',
  'offbeat',
  'ok',
  'online',
  'offline',
  'outside',
  'overwrought',
  'premium',
  'pricey',
  'pro',
  'quaint',
  'random',
  'rear',
  'rebel',
  'ritzy',
  'savvy',
  'sexy',
  'shut',
  'shy',
  'sleek',
  'smug',
  'solemn',
  'south',
  'stark',
  'superb',
  'taboo',
  'teenage',
  'top',
  'tranquil',
  'true',
  'ultra',
  'understood',
  'unfair',
  'unknown',
  'upbeat',
  'upstairs',
  'vanilla',
  'various',
  'widespread',
  'woozy',
  'wrong'
];

module.exports = fns.uncompress_suffixes(arr, compressed);

},{"../fns":7}],3:[function(_dereq_,module,exports){
'use strict';
const fns = _dereq_('../fns');
//these are adjectives that can become comparative + superlative with out "most/more"
//its a whitelist for conjugation
//this data is shared between comparative/superlative methods

let compressed = {
  erate: 'degen,delib,desp,lit,mod',
  icial: 'artif,benef,off,superf',
  ntial: 'esse,influe,pote,substa',
  teful: 'gra,ha,tas,was',
  stant: 'con,di,in,resi',
  hing: 'astonis,das,far-reac,refres,scat,screec,self-loat,soot',
  eful: 'car,grac,peac,sham,us,veng',
  ming: 'alar,cal,glea,unassu,unbeco,upco',
  cial: 'commer,cru,finan,ra,so,spe',
  ure: 'insec,miniat,obsc,premat,sec,s',
  uent: 'congr,fl,freq,subseq',
  rate: 'accu,elabo,i,sepa',
  ific: 'horr,scient,spec,terr',
  rary: 'arbit,contempo,cont,tempo',
  ntic: 'authe,fra,giga,roma',
  nant: 'domi,malig,preg,reso',
  nent: 'emi,immi,perma,promi',
  iant: 'brill,def,g,luxur',
  ging: 'dama,encoura,han,lon',
  iate: 'appropr,immed,inappropr,intermed',
  rect: 'cor,e,incor,indi',
  zing: 'agoni,ama,appeti,free',
  ine: 'div,femin,genu,mascul,prist,rout',
  ute: 'absol,ac,c,m,resol',
  ern: 'east,north,south,st,west',
  tful: 'deligh,doub,fre,righ,though,wis',
  ant: 'abund,arrog,eleg,extravag,exult,hesit,irrelev,miscre,nonchal,obeis,observ,pl,pleas,redund,relev,reluct,signific,vac,verd',
  ing: 'absorb,car,coo,liv,lov,ly,menac,perplex,shock,stand,surpris,tell,unappeal,unconvinc,unend,unsuspect,vex,want',
  ate: 'adequ,delic,fortun,inadequ,inn,intim,legitim,priv,sed,ultim',
};
let arr = [
  'absurd',
  'aggressive',
  'alert',
  'alive',
  'angry',
  'attractive',
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
  'brown',
  'calm',
  'charming',
  'cheap',
  'check',
  'clean',
  'clear',
  'close',
  'cold',
  'cool',
  'cruel',
  'curly',
  'cute',
  'dangerous',
  'dear',
  'dirty',
  'drunk',
  'dry',
  'dull',
  'eager',
  'early',
  'easy',
  'efficient',
  'empty',
  'even',
  'extreme',
  'faint',
  'fair',
  'fanc',
  'feeble',
  'few',
  'fierce',
  'fine',
  'firm',
  'forgetful',
  'formal',
  'frail',
  'free',
  'full',
  'funny',
  'gentle',
  'glad',
  'glib',
  'glad',
  'grand',
  'green',
  'gruesome',
  'handsome',
  'happy',
  'harsh',
  'heavy',
  'high',
  'hollow',
  'hot',
  'hungry',
  'impolite',
  'important',
  'innocent',
  'intellegent',
  'interesting',
  'keen',
  'kind',
  'lame',
  'large',
  'late',
  'lean',
  'little',
  'long',
  'loud',
  'low',
  'lucky',
  'lush',
  'macho',
  'mature',
  'mean',
  'meek',
  'mellow',
  'mundane',
  'narrow',
  'near',
  'neat',
  'new',
  'nice',
  'noisy',
  'normal',
  'odd',
  'old',
  'orange',
  'pale',
  'pink',
  'plain',
  'poor',
  'proud',
  'pure',
  'purple',
  'rapid',
  'rare',
  'raw',
  'rich',
  'rotten',
  'round',
  'rude',
  'safe',
  'scarce',
  'scared',
  'shallow',
  'shrill',
  'simple',
  'slim',
  'slow',
  'small',
  'smooth',
  'solid',
  'soon',
  'sore',
  'sour',
  'square',
  'stale',
  'steep',
  'strange',
  'strict',
  'strong',
  'swift',
  'tall',
  'tame',
  'tart',
  'tender',
  'tense',
  'thin',
  'thirsty',
  'tired',
  'true',
  'vague',
  'vast',
  'vulgar',
  'warm',
  'weird',
  'wet',
  'wild',
  'windy',
  'wise',
  'yellow',
  'young'
];

module.exports = fns.uncompress_suffixes(arr, compressed);

},{"../fns":7}],4:[function(_dereq_,module,exports){
//adjectives that become verbs with +'en' (short->shorten)

//ones that also become superlative/comparative (short -> shortest)
module.exports = [
  'bright',
  'broad',
  'coarse',
  'damp',
  'dark',
  'dead',
  'deaf',
  'deep',
  'fast',
  'fat',
  'flat',
  'fresh',
  'great',
  'hard',
  'light',
  'loose',
  'mad',
  'moist',
  'quick',
  'quiet',
  'red',
  'ripe',
  'rough',
  'sad',
  'sharp',
  'short',
  'sick',
  'smart',
  'soft',
  'stiff',
  'straight',
  'sweet',
  'thick',
  'tight',
  'tough',
  'weak',
  'white',
  'wide',
];

},{}],5:[function(_dereq_,module,exports){
'use strict';
//terms that are 'Date' term
let months = [
  'january',
  'february',
  // "march",  //ambig
  'april',
  // "may",   //ambig
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
  'sep'
];

let days = [
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
//add plural eg.'mondays'
for (let i = 0; i <= 6; i++) {
  days.push(days[i] + 's');
}

let durations = [
  'millisecond',
  // 'second',
  'minute',
  'hour',
  'day',
  'week',
  'month',
  'year',
  'decade'
];
//add their plurals
let len = durations.length;
for (let i = 0; i < len; i++) {
  durations.push(durations[i]);
  durations.push(durations[i] + 's');
}
durations.push('century');
durations.push('centuries');
durations.push('seconds');

let relative = [
  'yesterday',
  'today',
  'tomorrow',
  // 'week',
  'weekend',
  'tonight'
];

module.exports = {
  days: days,
  months: months,
  durations: durations,
  relative: relative
};

},{}],6:[function(_dereq_,module,exports){
module.exports = [
  'all hallows eve',
  'all saints day',
  'all sts day',
  'april fools',
  'armistice day',
  'australia day',
  'bastille day',
  'boxing day',
  'canada day',
  'christmas',
  'christmas eve',
  'cinco de mayo',
  'emancipation day',
  'groundhog day',
  'halloween',
  '16 de septiembre',
  'dieciseis de septiembre',
  'grito de dolores',
  'all hallows eve',
  'day of the dead',
  'dia de muertos',
  'harvey milk day',
  'inauguration day',
  'independence day',
  'independents day',
  'juneteenth',
  'labour day',
  'national freedom day',
  'national nurses day',
  'new years',
  'new years eve',
  'purple heart day',
  'rememberance day',
  'rosa parks day',
  'saint andrews day',
  'saint patricks day',
  'saint stephens day',
  'saint valentines day',
  'st andrews day',
  'st patricks day',
  'st stephens day',
  'st valentines day ',
  'valentines day',
  'veterans day',
  'victoria day',
  'womens equality day',
  'xmas',
  // Fixed religious and cultural holidays
  // Catholic + Christian
  'epiphany',
  'orthodox christmas day',
  'orthodox new year',
  'assumption of mary',
  'all saints day',
  'all souls day',
  'feast of the immaculate conception',
  'feast of our lady of guadalupe',

  // Kwanzaa
  'kwanzaa',

  // Pagan / metal 🤘
  'imbolc',
  'beltaine',
  'lughnassadh',
  'samhain',
  'martin luther king day',
  'mlk day',
  'presidents day',
  'mardi gras',
  'tax day',
  'commonwealth day',
  'mothers day',
  'memorial day',
  'fathers day',
  'columbus day',
  'indigenous peoples day',
  'canadian thanksgiving',
  'election day',
  'thanksgiving',
  't-day',
  'turkey day',
  'black friday',
  'cyber monday',

  // Astronomical religious and cultural holidays
  // Catholic + Christian
  'ash wednesday',
  'palm sunday',
  'maundy thursday',
  'good friday',
  'holy saturday',
  'easter',
  'easter sunday',
  'easter monday',
  'orthodox good friday',
  'orthodox holy saturday',
  'orthodox easter',
  'orthodox easter monday',
  'ascension day',
  'pentecost',
  'whitsunday',
  'whit sunday',
  'whit monday',
  'trinity sunday',
  'corpus christi',
  'advent',

  // Jewish
  'tu bishvat',
  'tu bshevat',
  'purim',
  'passover',
  'yom hashoah',
  'lag baomer',
  'shavuot',
  'tisha bav',
  'rosh hashana',
  'yom kippur',
  'sukkot',
  'shmini atzeret',
  'simchat torah',
  'chanukah',
  'hanukkah',

  // Muslim
  'isra and miraj',
  'lailat al-qadr',
  'eid al-fitr',
  'id al-Fitr',
  'eid ul-Fitr',
  'ramadan',
  'eid al-adha',
  'muharram',
  'the prophets birthday',

  // Pagan / metal 🤘
  'ostara',
  'march equinox',
  'vernal equinox',
  'litha',
  'june solistice',
  'summer solistice',
  'mabon',
  'september equinox',
  'autumnal equinox',
  'yule',
  'december solstice',
  'winter solstice',

  // Additional important holidays
  'chinese new year',
  'diwali',
];

},{}],7:[function(_dereq_,module,exports){
'use strict';


//shallow-merge an object
exports.extendObj = (o, o2) => {
  Object.keys(o2).forEach((k) => {
    o[k] = o2[k];
  });
  return o;
};


//uncompress data in the adhoc compressed form {'ly':'kind,quick'}
exports.uncompress_suffixes = function(list, obj) {
  let keys = Object.keys(obj);
  let l = keys.length;
  for (let i = 0; i < l; i++) {
    const arr = obj[keys[i]].split(',');
    for (let i2 = 0; i2 < arr.length; i2++) {
      list.push(arr[i2] + keys[i]);
    }
  }
  return list;
};
//uncompress data in the adhoc compressed form {'over':'blown,kill'}
exports.uncompress_prefixes = function(list, obj) {
  let keys = Object.keys(obj);
  let l = keys.length;
  for (let i = 0; i < l; i++) {
    const arr = obj[keys[i]].split(',');
    for (let i2 = 0; i2 < arr.length; i2++) {
      list.push(keys[i] + arr[i2]);
    }
  }
  return list;
};

},{}],8:[function(_dereq_,module,exports){
'use strict';
//the data is all variously compressed and sorted
//this is just a helper file for the main file paths..
module.exports = {
  'firstnames': _dereq_('./people/firstnames'),
  'lastnames': _dereq_('./people/lastnames'),
  'notable_people': _dereq_('./people/notable'),
  'titles': _dereq_('./people/titles'),

  'currencies': _dereq_('./values/currencies'),
  'numbers': _dereq_('./values/numbers'),
  'ordinalMap': _dereq_('./values/ordinalMap'),
  'units': _dereq_('./values/units'),

  'dates': _dereq_('./dates/dates'),
  'holidays': _dereq_('./dates/holidays'),

  'professions': _dereq_('./nouns/professions'),
  'abbreviations': _dereq_('./nouns/abbreviations'),
  'demonyms': _dereq_('./nouns/demonyms'),
  'irregular_plurals': _dereq_('./nouns/irregular_plurals'),
  'places': _dereq_('./nouns/places'),
  'uncountables': _dereq_('./nouns/uncountables'),
  'nouns': _dereq_('./nouns/nouns'),

  'organizations': _dereq_('./organizations/organizations'),
  'sportsTeams': _dereq_('./organizations/sportsTeams'),
  'bands': _dereq_('./organizations/bands'),
  'orgWords': _dereq_('./organizations/orgWords'),

  'adjectives': _dereq_('./adjectives/adjectives'),
  'superlatives': _dereq_('./adjectives/superlatives'),
  'verbConverts': _dereq_('./adjectives/verbConverts'),

  'irregular_verbs': _dereq_('./verbs/irregular_verbs'),
  'verbs': _dereq_('./verbs/verbs'),

  'misc': _dereq_('./misc/misc'),
};

},{"./adjectives/adjectives":2,"./adjectives/superlatives":3,"./adjectives/verbConverts":4,"./dates/dates":5,"./dates/holidays":6,"./misc/misc":13,"./nouns/abbreviations":15,"./nouns/demonyms":16,"./nouns/irregular_plurals":17,"./nouns/nouns":18,"./nouns/places":19,"./nouns/professions":20,"./nouns/uncountables":21,"./organizations/bands":22,"./organizations/orgWords":23,"./organizations/organizations":24,"./organizations/sportsTeams":25,"./people/firstnames":28,"./people/lastnames":29,"./people/notable":31,"./people/titles":32,"./values/currencies":33,"./values/numbers":34,"./values/ordinalMap":35,"./values/units":36,"./verbs/irregular_verbs":37,"./verbs/verbs":39}],9:[function(_dereq_,module,exports){
'use strict';
//a lexicon is a giant object of known words and their assumed pos-tag.
//the way we make it rn is a bit of a mess.
const data = _dereq_('./index');
const fns = _dereq_('./fns');
const toPlural = _dereq_('../result/subset/nouns/methods/pluralize');
const adj = _dereq_('../result/subset/adjectives/methods/index');
const toAdjective = _dereq_('../result/subset/verbs/methods/toAdjective');
const fastConjugate = _dereq_('../result/subset/verbs/methods/conjugate/faster');
let lexicon = {};
// console.time('lexicon');

const addObj = (o) => {
  fns.extendObj(lexicon, o);
};
const addArr = (arr, tag) => {
  const l = arr.length;
  for (let i = 0; i < l; i++) {
    lexicon[arr[i]] = tag;
  }
};

//let a rip
addArr(data.uncountables, 'Noun');
let units = data.units.words.filter((s) => s.length > 1);
addArr(units, 'Unit');
addArr(data.dates.durations, 'Duration');

addObj(data.abbreviations);
//number-words are well-structured
let obj = data.numbers.ordinal;
addArr(Object.keys(obj.ones), 'Ordinal');
addArr(Object.keys(obj.teens), 'Ordinal');
addArr(Object.keys(obj.tens), 'Ordinal');
addArr(Object.keys(obj.multiples), 'Ordinal');
obj = data.numbers.cardinal;
addArr(Object.keys(obj.ones), 'Cardinal');
addArr(Object.keys(obj.teens), 'Cardinal');
addArr(Object.keys(obj.tens), 'Cardinal');
addArr(Object.keys(obj.multiples), 'Cardinal');
addArr(Object.keys(data.numbers.prefixes), 'Cardinal');
//singular/plural
addArr(Object.keys(data.irregular_plurals.toPlural), 'Singular');
addArr(Object.keys(data.irregular_plurals.toSingle), 'Plural');

//dates are well-structured
addArr(data.dates.days, 'WeekDay');
addArr(data.dates.months, 'Month');
addArr(data.dates.relative, 'RelativeDay');
addArr(data.holidays, 'Holiday');

addArr(data.professions, 'Actor'); //?
addArr(data.demonyms, 'Demonym');
addArr(data.sportsTeams, 'SportsTeam');
addArr(data.bands, 'Organization');
addArr(data.orgWords, 'Noun');

//irregular verbs
Object.keys(data.irregular_verbs).forEach((inf) => {
  lexicon[inf] = 'Infinitive';
  let conj = data.irregular_verbs[inf];
  Object.keys(conj).forEach((k2) => {
    if (conj[k2]) {
      lexicon[conj[k2]] = k2;
    }
  });
  let o = fastConjugate(inf);
  Object.keys(o).forEach((k) => {
    if (o[k] && !lexicon[o[k]]) {
      lexicon[o[k]] = k;
    }
  });
});

//conjugate verblist
data.verbs.forEach((v) => {
  let o = fastConjugate(v);
  Object.keys(o).forEach((k) => {
    if (o[k] && !lexicon[o[k]]) {
      lexicon[o[k]] = k;
    }
  });
  lexicon[toAdjective(v)] = 'Adjective';
});

//conjugate adjectives
data.superlatives.forEach((a) => {
  lexicon[adj.toNoun(a)] = 'Noun';
  lexicon[adj.toAdverb(a)] = 'Adverb';
  lexicon[adj.toSuperlative(a)] = 'Superlative';
  lexicon[adj.toComparative(a)] = 'Comparative';
});

//even more expressive adjectives
data.verbConverts.forEach((a) => {
  lexicon[adj.toNoun(a)] = 'Noun';
  lexicon[adj.toAdverb(a)] = 'Adverb';
  lexicon[adj.toSuperlative(a)] = 'Superlative';
  lexicon[adj.toComparative(a)] = 'Comparative';

  const v = adj.toVerb(a);
  lexicon[v] = 'Verb';
  //now conjugate it
  let o = fastConjugate(v);
  Object.keys(o).forEach((k) => {
    if (o[k] && !lexicon[o[k]]) {
      lexicon[o[k]] = k;
    }
  });
});

//inflect nouns
data.nouns.forEach((n) => {
  lexicon[n] = 'Singular';
  let plural = toPlural(n);
  lexicon[plural] = 'Plural';
});

//let a rip.
addObj(data.firstnames);
addArr(data.notable_people.female, 'FemaleName');
addArr(data.notable_people.male, 'MaleName');
addArr(data.titles, 'Singular');
addArr(data.lastnames, 'LastName');
addArr(data.places.airports, 'Place');
addArr(data.places.cities, 'City');
addArr(data.places.countries, 'Country');
addArr(data.organizations, 'Organization');
addArr(data.adjectives, 'Adjective');
addArr(data.verbConverts, 'Adjective');
addArr(data.superlatives, 'Adjective');
addArr(data.currencies, 'Currency');
//these ad-hoc manual ones have priority
addObj(data.misc);


//for safety (these are sneaky)
delete lexicon[''];
delete lexicon[' '];
delete lexicon[null];
module.exports = lexicon;

// console.log(lexicon['make']);
// console.log(fastConjugate('make'));
// let t = new Term('shake');
// t.tag.Verb = true;
// console.timeEnd('lexicon');
// console.log(Object.keys(lexicon).length);

},{"../result/subset/adjectives/methods/index":61,"../result/subset/nouns/methods/pluralize":98,"../result/subset/verbs/methods/conjugate/faster":136,"../result/subset/verbs/methods/toAdjective":147,"./fns":7,"./index":8}],10:[function(_dereq_,module,exports){
module.exports = [
  // 'now',
  'a lot',
  'a posteriori',
  'abroad',
  'ad nauseam',
  'again',
  'all but',
  'all that',
  'almost',
  'alone',
  'already',
  'also',
  'always',
  'anymore',
  'anyway',
  'apart',
  'aside',
  'at best',
  'at large',
  'at least',
  'at most',
  'at worst',
  'away',
  'by far',
  'by now',
  'damn',
  'de jure',
  'de trop',
  'directly',
  'en masse',
  'ever',
  'for example',
  'for good',
  'for sure',
  'forever',
  'further',
  'furthermore',
  'hence',
  'indeed',
  'instead',
  'just',
  'just about',
  'kinda',
  'maybe',
  'meanwhile',
  'more',
  'moreover',
  'newly',
  'no longer',
  'not withstanding',
  'of course',
  'often',
  'once',
  'once again',
  'once more',
  'only',
  'par excellence',
  'per se',
  'perhaps',
  'point blank',
  'quite',
  'randomly',
  'rather',
  'really',
  'several',
  'so',
  'somehow',
  'sometimes',
  'somewhat',
  'soon',
  'sort of',
  'such',
  'then',
  'thus',
  'too',
  'totally',
  'toward',
  'twice',
  'up to',
  'upwards of',
  'very',
  'way',
  'well',
  'yes',
  'yep',
];

},{}],11:[function(_dereq_,module,exports){
module.exports = [
  'this',
  'any',
  'enough',
  'each',
  'whatever',
  'every',
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
  'either',
  'much',
  'some',
  'else',
  //some other languages (what could go wrong?)
  'la',
  'le',
  'les',
  'des',
  'de',
  'du',
  'el'
];

},{}],12:[function(_dereq_,module,exports){
module.exports = [
  'uh',
  'uhh',
  'uh huh',
  'uh-oh',
  'please',
  'plz',
  'ugh',
  'sheesh',
  'eww',
  'pff',
  'voila',
  'oy',
  'hi',
  'hello',
  'bye',
  'goodbye',
  'hey',
  'hai',
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
  'ooo',
  'yay',
  'uh-huh',
  'boo',
  'wow',
  'nope',
  'haha',
  'hahaha',
  'lol',
  'lols',
  'lmao',
  'lmfao',
  'ya',
  'hee',
  'ohh',
  'eh',
  'yup',
  'wtf',
  'wtaf',
  'et cetera',
  'fuck',
  'shit',
  'damn',
  'dang',
  'damnit',
  'dammit',
  'hell',
  'a la',
];

},{}],13:[function(_dereq_,module,exports){
'use strict';

const misc = {
  'here': 'Noun',
  'better': 'Comparative',
  'earlier': 'Superlative',
  'make sure': 'Verb',
  'keep tabs': 'Verb',
  'gonna': 'Verb',
  'cannot': 'Verb',
  'has': 'Verb',
  'sounds': 'PresentTense',
  //special case for took/taken
  'taken': 'PastTense',
  'msg': 'Verb', //slang
  'a few': 'Value', //different than 'few people'
  'years old': 'Unit', //special case
  'not': 'Negative',
  'non': 'Negative',
  'never': 'Negative',
  'no': 'Negative',
  'no doubt': 'Noun',
  'not only': 'Adverb',
  'how\'s': 'QuestionWord' //not conjunction
};

const compact = {
  Adjective: [
    'so called', //?
    'on board',
    'vice versa',
    'en route',
    'upside down',
    'up front',
    'in front',
    'in situ',
    'in vitro',
    'ad hoc',
    'de facto',
    'ad infinitum',
    'for keeps',
    'a priori',
    'off guard',
    'spot on',
    'ipso facto',
    'fed up',
    'brand new',
    'old fashioned',
    'bona fide',
    'well off',
    'far off',
    'straight forward',
    'hard up',
    'sui generis',
    'en suite',
    'avant garde',
    'sans serif',
    'gung ho',
    'super duper',
    'bourgeois'
  ],

  Verb: [
    'lengthen',
    'heighten',
    'worsen',
    'lessen',
    'awaken',
    'frighten',
    'threaten',
    'hasten',
    'strengthen',
    'given',
    //misc
    'known',
    'shown',
    'seen',
    'born'
  ],

  Place: [
    'new england',
    'new hampshire',
    'new jersey',
    'new mexico',
    'united states',
    'united kingdom',
    'great britain',
    'great lakes',
    'pacific ocean',
    'atlantic ocean',
    'indian ocean',
    'arctic ocean',
    'antarctic ocean',
    'everglades',
  ],
  //conjunctions
  'Conjunction': [
    'yet',
    'therefore',
    'or',
    'while',
    'nor',
    'whether',
    'though',
    'tho',
    'because',
    'cuz',
    'but',
    'for',
    'and',
    'however',
    'before',
    'although',
    'how',
    'plus',
    'versus',
    'otherwise',
  // 'not'
  ],
  Time: [
    //date
    'noon',
    'midnight',
    'now',
    'morning',
    'evening',
    'afternoon',
    'night',
    'breakfast time',
    'lunchtime',
    'dinnertime',
    'ago',
    'sometime',
    'eod',
    'oclock',
  ],
  Date: [
    //end of day, end of month
    'eom',
    'standard time',
    'daylight time',
  ],
  'Condition': [
    'if',
    'unless',
    'notwithstanding'
  ],

  'PastTense': [
    'said',
    'had',
    'been',
    'began',
    'came',
    'did',
    'meant',
    'went'
  ],


  'Gerund': [
    'going',
    'being',
    'according',
    'resulting',
    'developing',
    'staining'
  ],

  'Copula': [
    'is',
    'are',
    'was',
    'were',
    'am'
  ],

  //determiners
  'Determiner': _dereq_('./determiners'),

  //prepositions
  'Preposition': _dereq_('./prepositions'),

  //modal verbs
  'Modal': [
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
    'shant',
    'lets', //arguable
  ],

  //Possessive pronouns
  'Possessive': [
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
    'herself',
    'hers',
    'themselves',
    'myself',
    'her', //this one is check ambiguous
  ],

  //personal pronouns (nouns)
  'Pronoun': [
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
    '\'em',
    'he\'s',
    'she\'s'
  ],
  //questions are awkward pos. are clarified in question_pass
  'QuestionWord': [
    'where',
    'why',
    'when',
    'who',
    'whom',
    'whose',
    'what',
    'which'
  ],
  //some manual adverbs (the rest are generated)
  'Adverb': _dereq_('./adverbs'),

  //interjections, expressions
  'Expression': _dereq_('./expressions'),

  //family-terms are people
  Person: [
    'father',
    'mother',
    'mom',
    'dad',
    'mommy',
    'daddy',
    'sister',
    'brother',
    'aunt',
    'uncle',
    'grandfather',
    'grandmother',
    'cousin',
    'stepfather',
    'stepmother',
    'boy',
    'girl',
    'man',
    'woman',
    'guy',
    'dude',
    'bro',
    'gentleman',
    'someone'
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
module.exports = misc;

},{"./adverbs":10,"./determiners":11,"./expressions":12,"./prepositions":14}],14:[function(_dereq_,module,exports){
module.exports = [
  '\'o',
  'a\'',
  'about',
  'across',
  'after',
  'along',
  'amid',
  'amidst',
  'among',
  'amongst',
  'apropos',
  'around',
  'as',
  'as long as',
  'at',
  'atop',
  'barring',
  'below',
  'besides',
  'between',
  'by',
  'chez',
  'circa',
  'despite',
  'down',
  'during',
  'except',
  'from',
  'in',
  'into',
  // 'just like',
  'mid',
  'midst',
  'notwithstanding',
  'o\'',
  'of',
  'off',
  'on',
  'onto',
  'out',
  'per',
  'qua',
  'sans',
  'since',
  'so that',
  'than',
  'through',
  'throughout',
  'thru',
  'till',
  'to',
  'towards',
  'unlike',
  'until',
  'up',
  'upon',
  'versus',
  'via',
  'vis-a-vis',
  'w/o',
  'whereas',
  'with',
  'within',
  'without',
  '-' //june - july
];

},{}],15:[function(_dereq_,module,exports){
//these are common word shortenings used in the lexicon and sentence segmentation methods
//there are all nouns,or at the least, belong beside one.
'use strict';

//common abbreviations
let compact = {
  Noun: [
    'arc',
    'al',
    'exp',
    'fy',
    'pd',
    'pl',
    'plz',
    'tce',
    'bl',
    'ma',
    'ba',
    'lit',
    'ex',
    'eg',
    'ie',
    'ca',
    'cca',
    'vs',
    'etc',
    'esp',
    'ft',
    //these are too ambiguous
    'bc',
    'ad',
    'md',
    'corp',
    'col'
  ],
  Organization: [
    'dept',
    'univ',
    'assn',
    'bros',
    'inc',
    'ltd',
    'co',
    //proper nouns with exclamation marks
    'yahoo',
    'joomla',
    'jeopardy'
  ],

  Place: [
    'rd',
    'st',
    'dist',
    'mt',
    'ave',
    'blvd',
    'cl',
    'ct',
    'cres',
    'hwy',
    //states
    'ariz',
    'cal',
    'calif',
    'colo',
    'conn',
    'fla',
    'fl',
    'ga',
    'ida',
    'ia',
    'kan',
    'kans',

    'minn',
    'neb',
    'nebr',
    'okla',
    'penna',
    'penn',
    'pa',
    'dak',
    'tenn',
    'tex',
    'ut',
    'vt',
    'va',
    'wis',
    'wisc',
    'wy',
    'wyo',
    'usafa',
    'alta',
    'ont',
    'que',
    'sask'
  ],

  Date: [
    'jan',
    'feb',
    'mar',
    'apr',
    'jun',
    'jul',
    'aug',
    'sep',
    'sept',
    'oct',
    'nov',
    'dec',
    'circa'
  ],

  //Honorifics
  Honorific: [
    'adj',
    'adm',
    'adv',
    'asst',
    'atty',
    'bldg',
    'brig',
    'capt',
    'cmdr',
    'comdr',
    'cpl',
    'det',
    'dr',
    'esq',
    'gen',
    'gov',
    'hon',
    'jr',
    'llb',
    'lt',
    'maj',
    'messrs',
    'mister',
    'mlle',
    'mme',
    'mr',
    'mrs',
    'ms',
    'mstr',
    'op',
    'ord',
    'phd',
    'prof',
    'pvt',
    'rep',
    'reps',
    'res',
    'rev',
    'sen',
    'sens',
    'sfc',
    'sgt',
    'sir',
    'sr',
    'supt',
    'surg'
  //miss
  //misses
  ]

};

//unpack the compact terms into the misc lexicon..
let abbreviations = {};
const keys = Object.keys(compact);
for (let i = 0; i < keys.length; i++) {
  const arr = compact[keys[i]];
  for (let i2 = 0; i2 < arr.length; i2++) {
    abbreviations[arr[i2]] = keys[i];
  }
}
module.exports = abbreviations;

},{}],16:[function(_dereq_,module,exports){
//adjectival forms of place names, as adjectives.
module.exports = [
  'afghan',
  'albanian',
  'algerian',
  'angolan',
  'argentine',
  'armenian',
  'australian',
  'aussie',
  'austrian',
  'bangladeshi',
  'basque', // of Basque Country
  'belarusian',
  'belgian',
  'bolivian',
  'bosnian',
  'brazilian',
  'bulgarian',
  'cambodian',
  'cameroonian',
  'canadian',
  'chadian',
  'chilean',
  'chinese',
  'colombian',
  'congolese',
  'croatian',
  'cuban',
  'czech',
  'dominican',
  'danish',
  'egyptian',
  'british',
  'estonian',
  'ethiopian',
  'ecuadorian',
  'finnish',
  'french',
  'gambian',
  'georgian',
  'german',
  'greek',
  'ghanaian',
  'guatemalan',
  'haitian',
  'hungarian',
  'honduran',
  'icelandic',
  'indian',
  'indonesian',
  'iranian',
  'iraqi',
  'irish',
  'israeli',
  'italian',
  'ivorian',  // of Ivory Coast
  'jamaican',
  'japanese',
  'jordanian',
  'kazakh',
  'kenyan',
  'korean',
  'kuwaiti',
  'lao',    // of Laos
  'latvian',
  'lebanese',
  'liberian',
  'libyan',
  'lithuanian',
  'namibian',
  'malagasy', // of Madagascar
  'macedonian',
  'malaysian',
  'mexican',
  'mongolian',
  'moroccan',
  'dutch',
  'nicaraguan',
  'nigerian', // of Nigeria
  'nigerien', // of Niger
  'norwegian',
  'omani',
  'panamanian',
  'paraguayan',
  'pakistani',
  'palestinian',
  'peruvian',
  'philippine',
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
  'somalian',
  'sudanese',
  'swedish',
  'swiss',
  'syrian',
  'taiwanese',
  'trinidadian',
  'thai',
  'tunisian',
  'turkmen',
  'ugandan',
  'ukrainian',
  'american',
  'hindi',
  'spanish',
  'venezuelan',
  'vietnamese',
  'welsh',
  'zambian',
  'zimbabwean',
  'english',
  'african',
  'european',
  'asian',
  'californian',
];

},{}],17:[function(_dereq_,module,exports){
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
//decompress it
main = main.map(function(a) {
  a[1] = a[1].replace('_', a[0]);
  return a;
});
//build-out two mappings
const toSingle = main.reduce((h, a) => {
  h[a[1]] = a[0];
  return h;
}, {});
const toPlural = main.reduce((h, a) => {
  h[a[0]] = a[1];
  return h;
}, {});

module.exports = {
  toSingle: toSingle,
  toPlural: toPlural
};

},{}],18:[function(_dereq_,module,exports){
//most nouns do not nead to be listed
//for whatever reasons, these look like not-nouns
//so make sure they become nouns
module.exports = [
  //double-consonant rule
  'egg',
  'bottle',
  'cottage',
  'kitty',
  'doggy',

  'ad hominem',
  'banking',
  'body',
  'breakfast',
  'ceiling',
  'city',
  'credit card',
  'death',
  'dinner',
  'door',
  'economy',
  'energy',
  'event',
  'everything',
  'example',
  'fl oz',
  'friend',
  'funding',
  'god',
  'glacier',
  'canary',
  'grand slam',
  'head start',
  'home',
  'house',
  'lunch',
  'nothing',
  'number',
  'others',
  'part',
  'patent',
  'problem',
  'purpose',
  'room',
  'student',
  'stuff',
  'super bowl',
  'system',
  'there',
  'thing',
  'things',
  'tragedy',
  'us dollar',
  'world',
  'world series'
];

},{}],19:[function(_dereq_,module,exports){
'use strict';
const fns = _dereq_('../fns');

//uncompressed country names
let countries = [
  'andorra',
  'antarctica',
  'antigua and barbuda',
  'aruba',
  'bahamas',
  'bangladesh',
  'barbados',
  'belgium',
  'belize',
  'bermuda',
  'bonaire',
  'brazil',
  'brunei',
  'burkina faso',
  'burundi',
  'burma',
  'cape verde',
  // 'chad',
  'chile',
  'comoros',
  'congo-brazzaville',
  'cuba',
  'curacao',
  'cote d\'ivoire',
  'denmark',
  'djibouti',
  'dominica',
  'east timor',
  'ecuador',
  'egypt',
  'el salvador',
  'fiji',
  'france',
  'french guiana',
  'germany',
  'gibraltar',
  'greece',
  'grenada',
  'guam',
  'guinea-bissau',
  'guadeloupe',
  'guernsey',
  'haiti',
  'honduras',
  'hungary',
  'hong kong',
  'isle of man',
  'iraq',
  'israel',
  'ivory coast',
  'italy',
  'jamaica',
  'jersey',
  'kenya',
  'kiribati',
  'kosovo',
  'kuwait',
  'laos',
  'lesotho',
  'libya',
  'luxembourg',
  'macao',
  'malawi',
  'mali',
  'malta',
  'martinique',
  'mayotte',
  'moldova',
  'mozambique',
  'montserrat',
  'montenegro',
  'nauru',
  'niue',
  'netherlands',
  'nicaragua',
  'niger',
  'palau',
  'panama',
  'peru',
  'samoa',
  'san marino',
  'saint helena',
  'sint maarten',
  'singapore',
  'sri lanka',
  'suriname',
  'sweden',
  'timor-leste',
  'trinidad and tobago',
  'tonga',
  'tokelau',
  'turkey',
  'tuvalu',
  'u.s.a.',
  'united kingdom',
  'u.k.',
  'usa',
  'ussr',
  'vanuatu',
  'vietnam',
  'vatican city',
  'wales',
  'wallis and futuna',
  'yemen',
  'zimbabwe'
];
let compressed_countries = {
  sland: 'christmas i,norfolk i,bouvet i',
  slands: 'british virgin i,u.s. virgin i,turks and caicos i,pitcairn i,northern mariana i,marshall i,cayman i,faroe i,falkland i,cook i,cocos i,keeling i,solomon i',
  istan: 'pak,uzbek,afghan,tajik,turkmen',
  ublic: 'czech rep,dominican rep,central african rep',
  uinea: 'g,papua new g,equatorial g',
  land: 'thai,po,switzer,fin,republic of ire,ire,new zea,swazi,ice,eng,scot,green',
  ania: 'tanz,rom,maurit,lithu,alb',
  rica: 'ame,united states of ame,south af,costa ',
  mbia: 'colo,za,ga',
  eria: 'nig,alg,lib',
  nia: 'arme,macedo,slove,esto',
  sia: 'indone,rus,malay,tuni',
  ina: 'ch,argent,bosnia and herzegov',
  tan: 'kazakhs,kyrgyzs,bhu',
  ana: 'gh,botsw,guy',
  bia: 'saudi ara,ser,nami',
  lia: 'austra,soma,mongo',
  rea: 'south ko,north ko,erit',
  dan: 'su,south su,jor',
  ria: 'sy,aust,bulga',
  co: 'mexi,mona,puerto ri,moroc',
  ia: 'ind,ethiop,cambod,boliv,slovak,georg,croat,latv,saint luc,micrones,french polynes,czech',
  an: 'jap,ir,taiw,azerbaij,om',
  da: 'ugan,cana,rwan',
  us: 'belar,mauriti,cypr',
  al: 'nep,seneg,portug',
  in: 'spa,ben,bahra,saint mart,liechtenste',
  go: 'dr con,to,trinidad-toba',
  la: 'anguil,venezue,ango,guatema',
  es: 'united stat,philippin,united arab emirat,seychell,maldiv',
  on: 'camero,leban,gab',
  ar: 'myanm,madagasc,qat',
  ay: 'paragu,norw,urugu',
  ne: 'ukrai,sierra leo,palesti'
};
countries = fns.uncompress_suffixes(countries, compressed_countries);

/////uncomressed cities
let cities = [
  'aalborg',
  'abu dhabi',
  'ahmedabad',
  'almaty',
  'antwerp',
  'aqaba',
  'ashdod',
  'ashgabat',
  'athens',
  'auckland',
  'bogota',
  'brussels',
  'calgary',
  'cape town',
  'cebu',
  'curitiba',
  'doha',
  'dushanbe',
  'frankfurt',
  'genoa',
  'ghent',
  'giza',
  'graz',
  'guangzhou',
  'haifa',
  'hanoi',
  'helsinki',
  'ho chi minh',
  'homs',
  'i̇zmir',
  'jakarta',
  'kiev',
  'kingston',
  'klaipeda',
  'kobe',
  'kosice',
  'krakow',
  'la plata',
  'luxembourg',
  'medellín',
  'mexico',
  'miskolc',
  'montevideo',
  'montreal',
  'moscow',
  'nagoya',
  'nis',
  'odessa',
  'oslo',
  'ottawa',
  'palermo',
  'paris',
  'perth',
  'phnom penh',
  'phoenix',
  'port elizabeth',
  'poznan',
  'prague',
  'reykjavik',
  'riga',
  'rome',
  'rosario',
  'seville',
  'skopje',
  'stockholm',
  'stuttgart',
  'sydney',
  'tbilisi',
  'tegucigalpa',
  'the hague',
  'thessaloniki',
  'tokyo',
  'toulouse',
  'trondheim',
  'tunis',
  'turku',
  'utrecht',
  'warsaw',
  'winnipeg',
  'wroclaw',
  'zagreb',
];

let suffix_compressed_cities = {
  burg: 'saint peters,yekaterin,ham,til,gothen,salz',
  ton: 'hous,edmon,welling,hamil',
  ion: 'herakl',
  ana: 'hav,tir',
  ara: 'guadalaj,ank,timiso',
  an: 'tehr,mil,durb,bus,tain,abidj,amm,yerev',
  ia: 'philadelph,brasil,alexandr,pretor,valenc',
  on: 'ly,lond,yang,inche,daeje,lisb',
  en: 'shenzh,eindhov,pils,copenhag,berg',
  ng: 'beiji,chittago,pyongya,kaohsiu,taichu',
  in: 'tianj,berl,tur,dubl,duned',
  es: 'los angel,nant,napl,buenos air,f',
  la: 'pueb,mani,barranquil,kampa,guatema',
  or: 'salvad,san salvad,ulan bat,marib',
  us: 'damasc,pirae,aarh,vilni',
  as: 'carac,patr,burg,kaun',
  va: 'craio,petah tik,gene,bratisla',
  ai: 'shangh,mumb,chenn,chiang m',
  ne: 'colog,melbour,brisba,lausan',
  er: 'manchest,vancouv,tangi',
  ka: 'dha,osa,banja lu',
  ro: 'rio de janei,sappo,cai',
  am: 'birmingh,amsterd,rotterd',
  ur: 'kuala lump,winterth,kopavog',
  ch: 'muni,zuri,christchur',
  na: 'barcelo,vien,var',
  ma: 'yokoha,li',
  ul: 'istanb,seo,kab',
  to: 'toron,qui,por',
  iv: 'khark,lv,tel av',
  sk: 'gdan,min'
};

cities = fns.uncompress_suffixes(cities, suffix_compressed_cities);

let prefix_compressed_cities = {
  'new ': 'delhi,york,taipei',
  san: 'a\'a,tiago, jose',
  ta: 'ipei,mpere,llinn,rtu',
  ba: 'ngalore,ngkok,ku,sel',
  li: 'verpool,ege,nz,massol',
  ma: 'rseille,ndalay,drid,lmo',
  be: 'rn,lgrade,irut',
  ka: 'rachi,raj,ndy',
  da: 'egu,kar,ugavpils',
  ch: 'icago',
  co: 'lombo,nstanta,rk',
  bu: 'rsa,charest,dapest'
};
cities = fns.uncompress_prefixes(cities, prefix_compressed_cities);

//some of the busiest airports in the world from
//https://www.world-airport-codes.com/world-top-30-airports.html
let airports = [
  'atl',
  'pek',
  'lhr',
  'hnd',
  'ord',
  'lax',
  'cdg',
  'dfw',
  'cgk',
  'dxb',
  'fra',
  'hkg',
  'den',
  'bkk',
  'ams',
  'jfk',
  'ist',
  'sfo',
  'clt',
  'las',
  'phx',
  'iax',
  'kul',
  'mia',
  'icn',
  'muc',
  'syd',
  'fco',
  'mco',
  'bcn',
  'yyz',
  'lgw',
  'phl',
];

module.exports = {
  countries: countries,
  cities: cities,
  airports: airports
};

},{"../fns":7}],20:[function(_dereq_,module,exports){
//professions 'lawyer' that aren't covered by verb.to_actor()

module.exports = [
  'accountant',
  'administrator',
  'advisor',
  'agent',
  'architect',
  'artist',
  'assistant',
  'attendant',
  'bricklayer',
  'butcher',
  'carpenter',
  'clerk',
  'deputy',
  'dietician',
  'engineer',
  'farmer',
  'firefighter',
  'fireman',
  'gardener',
  'getor',
  'hairdresser',
  'housekeeper',
  'instructor',
  'journalist',
  'lawyer',
  'mechanic',
  'minister',
  'musician',
  'nurse',
  'officer',
  'operator',
  'photographer',
  'plumber',
  'policeman',
  'politician',
  'practitioner',
  'president',
  'programmer',
  'psychologist',
  'receptionist',
  'researcher',
  'roofer',
  'sailor',
  'scientist',
  'secretary',
  'security guard',
  'soldier',
  'supervisor',
  'surgeon',
  'technician',
  'therapist'
];

},{}],21:[function(_dereq_,module,exports){
//common nouns that have no plural form. These are suprisingly rare
//used in noun.inflect(), and added as nouns in lexicon
module.exports = [
  'advice',
  'aircraft',
  'art',
  'baggage',
  'bass',
  'beef',
  'bison',
  'blood',
  'bread',
  'butter',
  'cake',
  'cash',
  'celcius',
  'chaos',
  'cheese',
  'chewing',
  'civics',
  'clothing',
  'coal',
  'coffee',
  'conduct',
  'confusion',
  'cotton',
  'currency',
  'economics',
  'education',
  'electricity',
  'enjoyment',
  'entertainment',
  'equipment',
  'ethics',
  'everybody',
  'everyone',
  'fahrenheit',
  'fiction',
  'fish',
  'flour',
  'food',
  'forgiveness',
  'fowl',
  'fruit',
  'fun',
  'furniture',
  'gold',
  'golf',
  'gossip',
  'grass',
  'ground',
  'gum',
  'gymnastics',
  'hair',
  'halibut',
  'happiness',
  'hertz',
  'history',
  'hockey',
  'homework',
  'honey',
  'hospitality',
  'ice',
  'impatience',
  'importance',
  'information',
  'itself',
  'jewelry',
  'justice',
  'kelvin',
  'knowledge',
  'laughter',
  'leather',
  'leisure',
  'lightning',
  'liquid',
  'literature',
  'luck',
  'luggage',
  'machinery',
  'mail',
  'mathematics',
  'measles',
  'meat',
  'milk',
  'mist',
  'money',
  'moose',
  'mumps',
  'music',
  'news',
  'noise',
  'oil',
  'oxygen',
  'paper',
  'patience',
  'peace',
  'peanut',
  'pepper',
  'petrol',
  'physics',
  'plastic',
  'pork',
  'power',
  'pressure',
  'progress',
  'rain',
  'recognition',
  'recreation',
  'relaxation',
  'research',
  'rice',
  'sadness',
  'safety',
  'salmon',
  'salt',
  'sand',
  'scenery',
  'series',
  'sheep',
  'shopping',
  'silk',
  'silver',
  'snow',
  'soap',
  'soccer',
  'softness',
  'space',
  'spacecraft',
  'species',
  'speed',
  'steam',
  'steel',
  'sugar',
  'sunshine',
  'tea',
  'tennis',
  'thunder',
  'time',
  'toothpaste',
  'traffic',
  'trouble',
  'trousers',
  'trout',
  'tuna',
  'vinegar',
  'violence',
  'warmth',
  'water',
  'weather',
  'wildlife',
  'wine',
  'wood',
  'wool'
];

},{}],22:[function(_dereq_,module,exports){
module.exports = [
  'abba',
  'ac/dc',
  'aerosmith',
  'bee gees',
  'coldplay',
  'creedence clearwater revival',
  'def leppard',
  'depeche mode',
  'destiny\'s child',
  'duran duran',
  'fleetwood mac',
  'green day',
  'guns n roses',
  'joy division',
  'metallica',
  'moody blues',
  'motley crue',
  'new kids on the block',
  'pink floyd',
  'r.e.m.',
  'radiohead',
  'red hot chili peppers',
  'sex pistols',
  'soundgarden',
  'spice girls',
  'the beach boys',
  'the beatles',
  'the black eyed peas',
  'the byrds',
  'the carpenters',
  'the guess who',
  'the hollies',
  'the rolling stones',
  'the smashing pumpkins',
  'the supremes',
  'the who',
  'thin lizzy',
  'u2',
  'van halen'
];

},{}],23:[function(_dereq_,module,exports){
//nouns that also signal the title of an unknown organization
//todo remove/normalize plural forms
module.exports = [
  'administration',
  'agence',
  'agences',
  'agencies',
  'agency',
  'aircraft',
  'airlines',
  'airways',
  'army',
  'assoc',
  'associates',
  'association',
  'assurance',
  'authority',
  'autorite',
  'aviation',
  'bank',
  'banque',
  'board',
  'boys',
  'brands',
  'brewery',
  'brotherhood',
  'brothers',
  'building society',
  'bureau',
  'cafe',
  'caisse',
  'capital',
  'care',
  'cathedral',
  'center',
  'central bank',
  'centre',
  'chemicals',
  'choir',
  'chronicle',
  'church',
  'circus',
  'clinic',
  'clinique',
  'club',
  'co',
  'coalition',
  'coffee',
  'collective',
  'college',
  'commission',
  'committee',
  'communications',
  'community',
  'company',
  'comprehensive',
  'computers',
  'confederation',
  'conference',
  'conseil',
  'consulting',
  'containers',
  'corporation',
  'corps',
  'council',
  'crew',
  'daily news',
  'data',
  'departement',
  'department',
  'department store',
  'departments',
  'design',
  'development',
  'directorate',
  'division',
  'drilling',
  'education',
  'eglise',
  'electric',
  'electricity',
  'energy',
  'ensemble',
  'enterprise',
  'enterprises',
  'entertainment',
  'estate',
  'etat',
  'evening news',
  'faculty',
  'federation',
  'financial',
  'fm',
  'foundation',
  'fund',
  'gas',
  'gazette',
  'girls',
  'government',
  'group',
  'guild',
  'health authority',
  'herald',
  'holdings',
  'hospital',
  'hotel',
  'hotels',
  'inc',
  'industries',
  'institut',
  'institute',
  'institute of technology',
  'institutes',
  'insurance',
  'international',
  'interstate',
  'investment',
  'investments',
  'investors',
  'journal',
  'laboratory',
  'labs',
  // 'law',
  'liberation army',
  'limited',
  'local authority',
  'local health authority',
  'machines',
  'magazine',
  'management',
  'marine',
  'marketing',
  'markets',
  'media',
  'memorial',
  'mercantile exchange',
  'ministere',
  'ministry',
  'military',
  'mobile',
  'motor',
  'motors',
  'musee',
  'museum',
  // 'network',
  'news',
  'news service',
  'observatory',
  'office',
  'oil',
  'optical',
  'orchestra',
  'organization',
  'partners',
  'partnership',
  // 'party',
  'people\'s party',
  'petrol',
  'petroleum',
  'pharmacare',
  'pharmaceutical',
  'pharmaceuticals',
  'pizza',
  'plc',
  'police',
  'polytechnic',
  'post',
  'power',
  'press',
  'productions',
  'quartet',
  'radio',
  'regional authority',
  'regional health authority',
  'reserve',
  'resources',
  'restaurant',
  'restaurants',
  'savings',
  'school',
  'securities',
  'service',
  'services',
  'social club',
  'societe',
  'society',
  'sons',
  'standard',
  'state police',
  'state university',
  'stock exchange',
  'subcommittee',
  'syndicat',
  'systems',
  'telecommunications',
  'telegraph',
  'television',
  'times',
  'tribunal',
  'tv',
  'union',
  'university',
  'utilities',
  'workers'
];

},{}],24:[function(_dereq_,module,exports){
'use strict';
//just a few named-organizations
//no acronyms needed. no product/brand pollution.
module.exports = [
  '20th century fox',
  '3m',
  '7-eleven',
  'abc',
  'academy of sciences',
  'acer',
  'activision',
  'adidas',
  'aig',
  'al jazeera',
  'al qaeda',
  'alcatel-lucent',
  'alcatel',
  'altair',
  'amc',
  'amd',
  'american express',
  'amt',
  'amtrak',
  'anheuser-busch',
  'aol',
  'apple computers',
  'applebee\'s',
  'arby\'s',
  'argos',
  'armco',
  'ashland oil',
  'associated press',
  'at&t',
  'avis',
  'avon',
  'ayer',
  'banana republic',
  'basf',
  'baskin robbins',
  'baxter',
  'bayer',
  'bbc',
  'bechtel',
  'ben & jerry\'s',
  'berkshire hathaway',
  'bf goodrich',
  'bfgoodrich',
  'black & decker',
  'blockbuster video',
  'bloomingdale',
  'blue cross',
  'bmw',
  'bni',
  'boeing',
  'bombardier',
  'boston globe',
  'boston pizza',
  'bp',
  'cadbury',
  'carl\'s jr',
  'cbc',
  'chevron',
  'chevy',
  'chick fil-a',
  'china daily',
  'cia',
  'cisco systems',
  'cisco',
  'citigroup',
  'cnn',
  'coca cola',
  'colgate',
  'comcast',
  'compaq',
  'coors',
  'costco',
  'craigslist',
  'daimler',
  'dea',
  'dell',
  'der spiegel',
  'disney',
  'doj',
  'dow jones',
  'dunkin donuts',
  'dupont',
  'ebay',
  'esa',
  'eu',
  'exxon mobil',
  'exxonmobil',
  'facebook',
  'fannie mae',
  'fbi',
  'fda',
  'fedex',
  'fiat',
  'financial times',
  'firestone',
  'ford',
  'frito-lay',
  'g8',
  'general electric',
  'general motors',
  'ghq',
  'glaxo smith kline',
  'glencore',
  'goldman sachs',
  'goodyear',
  'google',
  'gucci',
  'h & m',
  'hasbro',
  'hewlett-packard',
  'hitachi',
  'hizbollah',
  'home depot',
  'honda',
  'hsbc',
  'hyundai',
  'ibm',
  'ihop',
  'ing',
  'intel',
  'interpol',
  'itv',
  'jiffy lube',
  'johnson & johnson',
  'jpmorgan chase',
  'jpmorgan',
  'jsa',
  'katv',
  'kfc',
  'kkk',
  'kmart',
  'kodak',
  'l\'oreal',
  'la presse',
  'la-z-boy',
  'lenovo',
  'lexis',
  'lexmark',
  'lg',
  'little caesars',
  'mac\'s milk',
  'mattel',
  'mazda',
  'mcdonald\'s',
  'mcdonalds',
  'medicaid',
  'medicare',
  'mercedes-benz',
  'mercedes',
  'microsoft',
  'mitas',
  'mitsubishi',
  'mlb',
  'mobil',
  'monsanto',
  'motel 6',
  'motorola',
  'mtv',
  'myspace',
  'nandos',
  'nascar',
  'nasdaq',
  'national academy of sciences',
  'nato',
  'natwest',
  'nba',
  'nbc',
  'nestle',
  'nestlé',
  'netflix',
  'new york times',
  'newsweek',
  'nfl',
  'nhl',
  'nhs',
  'nike',
  'nintendo',
  'nissan',
  'nokia',
  'notre dame',
  'novartis',
  'nsa',
  'nwa',
  'old navy',
  'opec',
  'orange julius',
  'oxfam',
  'pan am',
  'panasonic',
  'panda express',
  'pbs',
  'pepsico',
  'petrobras',
  'petrochina',
  'petronas',
  'peugeot',
  'pfizer',
  'philip morris',
  'pizza hut',
  'premier oil',
  'procter & gamble',
  'prudential',
  'quantas',
  'quizno\'s',
  'rbc',
  'rbs',
  're/max',
  'readers digest',
  'red bull',
  'red cross',
  'red lobster',
  'revlon',
  'royal bank',
  'royal dutch shell',
  'ryanair',
  'safeway',
  'sainsbury\'s',
  'samsung',
  'sears',
  'siemens',
  'sony',
  'starbucks',
  'statoil',
  'subaru',
  't mobile',
  'taco bell',
  'td bank',
  'telefonica',
  'telus',
  'tesco',
  'tesla motors',
  'tgi fridays',
  'the daily mail',
  'tim hortons',
  'tmz',
  'toshiba',
  'toyota',
  'toys r us',
  'twitter',
  'ubs',
  'unesco',
  'unilever',
  'united nations',
  'ups',
  'usa today',
  'usps',
  'verizon',
  'vh1',
  'visa',
  'vodafone',
  'volkswagen',
  'volvo',
  'wal-mart',
  'walgreens',
  'wall street journal',
  'walmart',
  'warner bros',
  'wells fargo',
  'westfield',
  'westinghouse',
  'world trade organization',
  'yahoo!',
  'yamaha',
  'ymca',
  'youtube',
  'ywca',
];

},{}],25:[function(_dereq_,module,exports){
module.exports = [
  //mlb
  'washington nationals',
  'toronto blue jays',
  'texas rangers',
  'tampa bay rays',
  'st. louis cardinals',
  'seattle mariners',
  'san francisco giants',
  'san diego padres',
  'pittsburgh pirates',
  'philadelphia phillies',
  'oakland athletics',
  'new york yankees',
  'new york mets',
  'minnesota twins',
  'milwaukee brewers',
  'miami marlins',
  'los angeles dodgers',
  'kansas city royals',
  'houston astros',
  'detroit tigers',
  'colorado rockies',
  'cleveland indians',
  'cincinnati reds',
  'chicago white sox',
  'chicago cubs',
  'boston red sox',
  'baltimore orioles',
  'atlanta braves',
  'arizona diamondbacks',
  'diamondbacks',
  'braves',
  'orioles',
  'white sox',
  'astros',
  'royals',
  'dodgers',
  'marlins',
  'brewers',
  'mets',
  'yankees',
  'phillies',
  'padres',
  'giants',
  'mariners',
  'cardinals',
  'blue jays',

  //nba
  'boston celtics',
  'brooklyn nets',
  'new york knicks',
  'philadelphia 76ers',
  'toronto raptors',
  'chicago bulls',
  'cleveland cavaliers',
  'detroit pistons',
  'indiana pacers',
  'milwaukee bucks',
  'atlanta hawks',
  'charlotte hornets',
  'miami heat',
  'orlando magic',
  'washington wizards',
  'dallas mavericks',
  'houston rockets',
  'memphis grizzlies',
  'new orleans pelicans',
  'san antonio spurs',
  'denver nuggets',
  'minnesota timberwolves',
  'portland trail blazers',
  'oklahoma city thunder',
  'utah jazz',
  'golden state warriors',
  'los angeles clippers',
  'los angeles lakers',
  'phoenix suns',
  'sacramento kings',
  '76ers',
  'knicks',
  'mavericks',
  'lakers',
  'celtics',

  //nfl
  'buffalo bills',
  'miami dolphins',
  'new england patriots',
  'new york jets',
  'baltimore ravens',
  'cincinnati bengals',
  'cleveland browns',
  'pittsburgh steelers',
  'houston texans',
  'indianapolis colts',
  'jacksonville jaguars',
  'tennessee titans',
  'denver broncos',
  'kansas city chiefs',
  'oakland raiders',
  'san diego chargers',
  'dallas cowboys',
  'new york giants',
  'philadelphia eagles',
  'washington redskins',
  'chicago bears',
  'detroit lions',
  'green bay packers',
  'minnesota vikings',
  'atlanta falcons',
  'carolina panthers',
  'new orleans saints',
  'tampa bay buccaneers',
  'arizona cardinals',
  'st. louis rams',
  'san francisco 49ers',
  'seattle seahawks',

  //mls
  'chicago fire',
  'columbus crew sc',
  'd.c. united',
  'montreal impact',
  'new england revolution',
  'new york city fc',
  'new york red bulls',
  'philadelphia union',
  'colorado rapids',
  'fc dallas',
  'houston dynamo',
  'la galaxy',
  'portland timbers',
  'real salt lake',
  'san jose earthquakes',
  'seattle sounders',
  'sporting kansas city',
  'vancouver whitecaps',
  'atlanta united',
  'minnesota united',
  //premier league soccer (mostly city+fc)
  'blackburn rovers',
  'leicester city',
  'manchester city',
  'manchester united',
  'aston villa',
  'cardiff city',
  'newcastle united',
  'queens park rangers',
  'sheffield united',
  'stoke city',
  'tottenham hotspur',
  'west ham united',
];

},{}],26:[function(_dereq_,module,exports){

//names commonly used in either gender
module.exports = [
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
  'lee',
  'mel'
];

},{}],27:[function(_dereq_,module,exports){
'use strict';
const fns = _dereq_('../fns');
//names with a distinctive signal that they identify as a female, internationally

//compressed by frequent suffixes
//comprssed with
//https://github.com/nlp-compromise/thumb/blob/master/src/compress/compress.js
const compressed = {
  stine: 'chri,erne,ju,kri',
  rlene: 'a,cha,da,ma',
  eline: 'ad,ang,jacqu,mad',
  nette: 'an,antoi,jean,ly',
  elia: 'ad,am,ang,cec,c,corn,d,of,sh',
  anne: ',di,je,jo,le,mari,rox,sus,suz',
  elle: 'dani,est,gabri,isab,jan,mich,rach,roch',
  ella: 'd,est,isab,lu,marc,st',
  rina: 'kata,kat,ma,sab,t',
  icia: 'al,fel,let,patr,tr',
  ette: 'bernad,b,claud,paul,yv',
  leen: 'ai,cath,col,ei,kath',
  ndra: 'alexa,cassa,ke,sa,so',
  elma: ',s,th,v',
  anda: 'am,mir,w,yol',
  etta: ',henri,lor,ros',
  isha: 'al,ke,lat,tr',
  tina: 'cris,mar,,valen',
  inda: 'bel,l,luc,mel',
  arla: 'c,d,k,m',
  lena: 'e,je,,magda',
  ine: 'carol,cather,cel,ela,franc,gerald,jan,jasm,jeann,joseph,kathar,kather,lorra,max,nad,paul',
  ice: 'al,beatr,bern,cand,clar,eun,jan,patr',
  ela: 'andj,ang,carm,gabri,graci,l,manu,pam',
  ara: 'barb,c,cl,k,l,tam,t,z',
  ora: 'c,d,fl,isid,len,l,n,teod',
  ina: 'am,catal,d,georg,g,josef,n',
  ita: 'an,arp,bon,juan,kav,margar,r',
  nna: 'dea,do,gle,je,joha,lado,sha',
  lyn: 'caro,eve,gwendo,jac,jacque,joce,mari',
  ica: 'angel,er,jess,mil,mon,patr,veron',
  ene: 'adri,hel,imog,ir,jol,lor',
  ana: 'adri,d,jov,ju,l,sus',
  nda: 'bre,gle,ly,rho,ro',
  nia: 'anto,euge,so,to,virgi',
  ley: 'ash,kel,kimber,les,shir',
  sha: 'lata,mar,nata,ta',
  ian: 'jill,lill,mar,viv',
  isa: 'al,el,l,lu',
  ann: ',jo,le,mary',
  ise: 'den,el,elo,lou',
  ida: 'a,,rach,sa',
  nya: 'lato,so,ta,to',
  ssa: 'aly,mari,meli,vane',
  tha: 'ber,mar,saman,tabi',
  ia: 'cecil,claud,cynth,dam,georg,glor,jul,luc,lyd,marc,mar,nad,oliv,silv,sof,soph,sylv,victor',
  la: 'eu,kay,lei,leo,li,lo,pau,priscil,shei,ursu,vio,wil',
  na: 'de,ed,leo,lor,mo,myr,ramo,re,shau,shaw,shee,ver',
  le: 'ade,camil,caro,ceci,ga,gay,lucil,mab,myrt,nicho,nico',
  en: 'carm,dore,ell,gretch,gw,hel,kar,kirst,krist,laur,maure',
  ra: 'aud,barb,deb,elvi,javie,lau,may,my,pet,ve',
  ma: 'al,em,er,fati,ir,kari,nai,nor,wil',
  el: 'eth,isab,laur,mab,marib,muri,racha,rach,raqu',
  ta: 'alber,al,chris,ek,kris,mandakran,mar,rober',
  ey: 'audr,brittn,courtn,linds,stac,trac,whitn',
  ri: 'je,kanyakuma,ka,ker,sha,she,ter',
  ne: 'corin,daph,ja,laver,lyn,simo,yvon',
  th: 'be,edi,elisabe,elizabe,judi,meredi,ru',
  ah: 'aish,beul,debor,hann,le,rebek,sar',
  is: 'delor,dor,jan,lo,mav,phyll',
  da: 'a,fre,frie,hil,matil,priyamva',
  ce: 'canda,constan,floren,gra,joy',
  es: 'agn,delor,dolor,franc,merced',
  er: 'amb,est,esth,heath,jennif',
  et: 'bridg,harri,jan,margar,margr',
  ca: 'bian,blan,francis,rebec',
  ja: 'an,khadi,mari,son',
  sa: 'el,ro,tere,there',
  ee: 'aim,d,desir,ren',
  va: 'a,el,e,i',
  in: 'caitl,er,kar,krist',
  on: 'alis,man,shann,shar',
  an: 'meag,meg,megh,sus'
};

let list = [
  'abigail',
  'aicha',
  'alya',
  'andrea',
  'annika',
  'beatriz',
  'bettye',
  'brandi',
  'brooke',
  'carol',
  'celeste',
  'chelsea',
  'cheryl',
  'chloe',
  'claire',
  'cleo',
  'constanza',
  'consuelo',
  'crystal',
  'dominique',
  'dorothea',
  'eleanor',
  'eliza',
  'erika',
  'fay',
  'faye',
  'fern',
  'gail',
  'genevieve',
  'gertrude',
  'gladys',
  'heidi',
  'ingrid',
  'jade',
  'jill',
  'jo',
  'jodie',
  'joni',
  'kate',
  'katie',
  'kathryn',
  'kay',
  'kim',
  'krystal',
  'latoya',
  'laxmi',
  'leigh',
  'lindsay',
  'lupe',
  'lynn',
  'mae',
  'malika',
  'margo',
  'marguerite',
  'marisol',
  'maritza',
  'maude',
  'maya',
  'mildred',
  'miriam',
  'monique',
  'mrignayani',
  'naomi',
  'nell',
  'nikki',
  'olga',
  'paige',
  'pam',
  'parvati',
  'pearl',
  'reba',
  'robyn',
  'rosalind',
  'shania',
  'sheryl',
  'sue',
  'sybil',
  'tami',
  'tamika',
  'therese',
  'toni',
  'gisele'
];
list = fns.uncompress_suffixes(list, compressed);

for (let i = 0; i < list.length; i++) {
  let str = list[i];
  if (str.match(/[^ea]y$/)) {
    list.push(str.replace(/y$/, 'i'));
  }
  if (str.match(/ll/)) {
    list.push(str.replace(/ll/, 'l'));
  }
  if (str.match(/nn/)) {
    list.push(str.replace(/nn/, 'n'));
  }
  if (str.match(/ah/)) {
    list.push(str.replace(/ah/, 'a'));
  }
  if (str.match(/t$/)) {
    list.push(str.replace(/t$/, 'tte'));
  }
  if (str.match(/ey$/)) {
    list.push(str.replace(/ey$/, 'y'));
  }
  if (str.match(/ie$/)) {
    list.push(str.replace(/ie$/, 'y'));
  }
  if (str.match(/ne$/)) {
    list.push(str.replace(/ne$/, 'na'));
  }
  if (str.match(/ss/)) {
    list.push(str.replace(/ss/, 's'));
  }
  if (str.match(/rr/)) {
    list.push(str.replace(/rr/, 'r'));
  }
}
const no_change = [
  'amy',
  'becky',
  'betty',
  'beverly',
  'cathy',
  'dolly',
  'dorothy',
  'hilary',
  'hillary',
  'kimberly',
  'rosemary',
  'sally',
  'shelly',
  'trudy',
  'tammy',
  'wendy',
  'ruby',
  'susi'
];
list = list.concat(no_change);
module.exports = list;

},{"../fns":7}],28:[function(_dereq_,module,exports){
// common first-names in compressed form.
// from http://www.ssa.gov/oact/babynames/limits.html  and http://www.servicealberta.gov.ab.ca/pdf/vs/2001_Boys.pdf
// not sure what regional/cultural/demographic bias this has. Probably a lot.
// 73% of people are represented in the top 1000 names

// used to reduce redundant named-entities in longer text. (don't spot the same person twice.)
// used to identify gender for coreference resolution
'use strict';
let male = _dereq_('./male');
let female = _dereq_('./female');
let ambiguous = _dereq_('./ambiguous');
const names = {};

for (let i = 0; i < male.length; i++) {
  names[male[i]] = 'MaleName';
}
for (let i = 0; i < female.length; i++) {
  names[female[i]] = 'FemaleName';
}
//ambiguous/unisex names
for (let i = 0; i < ambiguous.length; i += 1) {
  names[ambiguous[i]] = 'FirstName';
}
// console.log(names['spencer']);
module.exports = names;

},{"./ambiguous":26,"./female":27,"./male":30}],29:[function(_dereq_,module,exports){
//a random copy+paste job from around the internet
//(dont mean to step on any toes)
//some countries have a higher lastname-signal than others
//this list is further augmented by some regexps, over in ./data/punct_rules.js
// https://en.wikipedia.org/wiki/List_of_most_common_surnames_in_Europe
module.exports = [
  'lee',
  'li',
  'zhang',
  'wang',
  'nguyen',
  'garcia',
  'gonzalez',
  'hernandez',
  'smirnov',
  'muller',
  'wong',
  'cheung',
  'liu',
  'lau',
  'chen',
  'chan',
  'yang',
  'yeung',
  'huang',
  'zhao',
  'chiu',
  'wu',
  'zhou',
  'chow',
  'xu',
  'tsui',
  'zhu',
  'hu',
  'guo',
  'gao',
  'kwok',
  'luo',
  'devi',
  'singh',
  'kumar',
  'das',
  'kaur',
  'sato',
  'suzuki',
  'takahashi',
  'tanaka',
  'watanabe',
  'ito',
  'yamamoto',
  'nakamura',
  'kobayashi',
  'kato',
  'yoshida',
  'yamada',
  'sasaki',
  'yamaguchi',
  'saito',
  'matsumoto',
  'inoue',
  'kimura',
  'hayashi',
  'shimizu',
  'yamazaki',
  'ikeda',
  'hashimoto',
  'yamashita',
  'ishikawa',
  'nakajima',
  'maeda',
  'fujita',
  'ogawa',
  'harris',
  'thompson',
  'martinez',
  'robinson',
  'rodriguez',
  'walker',
  'wright',
  'lopez',
  'carter',
  'perez',
  'roberts',
  'turner',
  'phillips',
  'parker',
  'evans',
  'edwards',
  'collins',
  'sanchez',
  'morris',
  'rogers',
  'bailey',
  'rivera',
  'cooper',
  'richardson',
  'cox',
  'torres',
  'peterson',
  'ramirez',
  'brooks',
  'sanders',
  'bennett',
  'barnes',
  'henderson',
  'coleman',
  'jenkins',
  'perry',
  'powell',
  'patterson',
  'hughes',
  'flores',
  'simmons',
  'foster',
  'bryant',
  'hayes',
  'smith',
  'jones',
  'williams',
  'miller',
  'taylor',
  'wilson',
  'davis',
  'clark',
  'hall',
  'thomas',
  'moore',
  'anderson',
  'allen',
  'lewis',
  'jackson',
  'adams',
  'tryniski',
  'campbell',
  'gruber',
  'huber',
  'bauer',
  'wagner',
  'pichler',
  'steiner',
  'mammadov',
  'aliyev',
  'hasanov',
  'ivanou',
  'ivanov',
  'kazlov',
  'peeters',
  'janssens',
  'dimitrov',
  'horvat',
  'neilson',
  'jensen',
  'hansen',
  'pedersen',
  'andersen',
  'christensen',
  'larsen',
  'vassiljev',
  'petrov',
  'kuznetsov',
  'mihhailov',
  'pavlov',
  'semjonov',
  'andrejev',
  'aleksejev',
  'johansson',
  'nyman',
  'lindholm',
  'karlsson',
  'andersson',
  'dubois',
  'durand',
  'leroy',
  'moreau',
  'lefebvre',
  'lefevre',
  'roux',
  'fournier',
  'mercier',
  'schmidt',
  'schneider',
  'fischer',
  'meyer',
  'weber',
  'schulz',
  'becker',
  'hoffmann',
  'kovacs',
  'szabo',
  'toth',
  'nagy',
  'byrne',
  'murray',
  'sullivan',
  'rossi',
  'russo',
  'esposito',
  'ricci',
  'marino',
  'klein',
  'nowak',
  'silva',
  'santos',
  'fernandez',
  'ruiz',
  'jimenez',
  'alvarez',
  'moreno',
  'muñoz',
  'alonso',
  'gutierrez',
  'romero',
  'navarro',
  'dominguez',
  'gil',
  'vazquez',
  'serrano',
  'ramos',
  'blanco',
  'sanz',
  'castro',
  'suarez',
  'ortega',
  'rubio',
  'molina',
  'delgado',
  'morales',
  'ortiz',
  'marin',
  'iglesias',
  'boyko',
  'davies',
  'clarke',
  'johnson',
  'oliveira',
  'sosa',
  'rojas',
  'munoz',
  'diaz',
  'gomez',
  'xiao',
  'tian',
  'bahk',
  'pahk',
  'chung',
  'jung',
  'joung',
  'chong',
  'cheong',
  'choung',
  'choi',
  'che',
  'choy',
  'chwe',
  'yeun',
  'yun',
  'jhang',
  'chang',
  'cheon',
  'kwon',
  'soung',
  'bhang',
  'bahng',
  'pahng',
  'phang',
  'kahn',
  'tran',
  'pham',
  'huynh',
  'hoang',
  'phan',
  'patel',
  //these are famous ones
  'mozart',
  'bach',
  'beethoven',
  'nixon',
  'vivaldi',
  'obama',
  'reagan',
  'lenin',
  'stalin',
  'hitler',
  'mussolini',
  'kennedy',
  'lincoln',
  'gandhi',
  'thatcher',
  'orwell',
  'darwin',
  'einstein',
  'picasso',
  'edison',
  'roosevelt',
  'tolstoy',
  'hemingway',
  'hitchcock',
  'messi',
  'beckham',
  'cohen',
]

// let obj = {}
// module.exports.forEach((str) => {
//   if (obj[str]) {
//     console.log(str)
//   }
//   obj[str] = true
// })

},{}],30:[function(_dereq_,module,exports){
'use strict';
const fns = _dereq_('../fns');
//names with a distinctive signal that they identify as a male, internationally

//the unique/uncompressed names..
let arr = [
  'abu',
  'adolfo',
  'anthony',
  'arthur',
  'billy',
  'bobby',
  'bob',
  'buddy', //ergh
  'bradford',
  'bret',
  'caleb',
  'clifford',
  'craig',
  'derek',
  'doug',
  'dwight',
  'eli',
  'elliot',
  'enrique',
  'felipe',
  'felix',
  'francisco',
  'frank',
  'george',
  'glenn',
  'greg',
  'gregg',
  'hans',
  'hugh',
  'ira',
  'isaac',
  'kermit',
  'leo',
  'levi',
  'lorenzo',
  'percy',
  'philip',
  'phillip',
  'regis',
  'rex',
  'ricky',
  'shaun',
  'shaquille',
  'shawn',
  'steve',
  'timothy',
  'ty',
  'wilbur',
  'williams',
  'woodrow',
  'wolfgang',
  'youssef',
  'mahmoud',
  'mustafa',
  'hamza',
  'tareq',
  'ali',
  'beshoi',
  'mark',
  'habib',
  'moussa',
  'adama',
  'osama',
  'abdoulaye',
  'modibo',
  'mustapha',
  'aziz',
  'mateo',
  'santino',
  'davi',
  'jacob',
  'vicente',
  'alonso',
  'maximiliano',
  'jose',
  'jeronimo',
  'joshua',
  'ajani',
  'amir',
  'arnav',
  'suraj',
  'bruno',
  'yousouf',
  'wei',
  'hao',
  'yi',
  'lei',
  'aarav',
  'reyansh',
  'arjun',
  'abulfazl',
  'reza',
  'kathem',
  'ori',
  'yosef',
  'itai',
  'moshe',
  'ichika',
  'itsuki',
  'tatsuki',
  'asahi',
  'haruki',
  'tomoharu',
  'yuuma',
  'taichi',
  'saqib',
  'abubakr',
  'ergi',
  'marc',
  'eric',
  'enzo',
  'pol',
  'alex',
  'marti',
  'jakob',
  'paul',
  'leevi',
  'aputsiaq',
  'inunnguaq',
  'inuk',
  'francesco',
  'andrea',
  'mattia',
  'matteo',
  'tommaso',
  'nikola',
  'ilija',
  'marko',
  'luka',
  'antoni',
  'jakub',
  'franciszek',
  'filip',
  'stanislaw',
  'mikolaj',
  'yusuf',
  'berat',
  'emir',
  'ahmet',
  'mehmet',
  'leroy',
  'roy',
  'troy',
  'floyd',
  'lloyd',
  'carl',
  'earl',
  'karl',
  'raul',
  'saul',
  'earnest',
  'ernest',
  'forrest',
  'arnold',
  'harold',
  'andrew',
  'mathew',
  'matthew',
  'elliott',
  'matt',
  'scott',
  'marty',
  'monty',
  'scotty',
  'clay',
  'jay',
  'murray',
  'monte',
  'pete',
  'elwood',
  'jarrod',
  'claude',
  'clyde',
  'wade',
  'alfredo',
  'reynaldo',
  'wilfredo',
  'clark',
  'kirk',
  'chase',
  'jesse',
  'cedric',
  'dominic',
  'josh',
  'rocky',
  'rodolfo',
  'roosevelt',
  'roscoe',
  'ross',
  'jeff',
  'jeremy',
  'jerome',
  'jess',
  'toby',
  'todd',
  'tom',
  'tony',
  'darryl',
  'daryl',
  'dave',
  'joe',
  'john',
  'jorge',
  'malcolm',
  'marco',
  'max',
  'alfonso',
  'alonzo',
  'guillermo',
  'gustavo'
];



//compressed by frequent suffixes
//comprssed with
//https://github.com/nlp-compromise/thumb/blob/master/src/compress/compress.js
let suffix_compressed = {
  'rence': 'cla,lau,law,te,ter',
  'lbert': 'a,de,e,gi,wi',
  'berto': 'al,gil,hum,ro',
  'ustin': 'ag,j,a,d',
  'rick': 'e,frede,rode,der,fred,kend,pat,',
  'ardo': 'bern,leon,ricc,edu,ger,ric',
  'lvin': 'e,ke,me,a,ca',
  'nnie': 'do,lo,ro,be,joh',
  'bert': ',her,hu,nor,ro',
  'than': 'e,na,johna,jona',
  'ando': 'arm,fern,orl,rol',
  'land': 'cleve,gar,le,ro',
  'arry': 'b,g,h,l',
  'lton': 'a,car,e,mi',
  'ian': 'sebast,j,,maximil,krist,adr,br,christ,dam,fab,jul',
  'ton': 'an,clin,quin,bur,clay,clif,pres,wins',
  'ter': 'car,pe,ches,les,sylves,dex,wal',
  'ard': 'bern,edw,ger,how,leon,rich,will',
  'ell': 'darn,darr,low,mitch,russ,terr,wend',
  'son': 'jack,ma,harri,ja,nel,ty,wil',
  'aan': 'ish,arm,viv,ay,vih,nom',
  'ron': 'a,aa,by,came,my,',
  'lan': 'mi,a,al,dy,har,no',
  'man': 'abdulrah,us,her,nor,sher,ro',
  'mon': 'ra,szy,da,si,solo',
  'uel': 'mig,sam,eman,emman,man',
  'don': 'bran,,el,gor,shel',
  'med': 'moha,muha,ah,moham,muham',
  'ald': 'don,regin,ron,ger,jer',
  'vin': 'er,ir,mar,de,ke',
  'rey': 'ca,co,geoff,jeff',
  'ett': 'br,ever,garr,emm',
  'ael': 'raf,ism,mich,raph',
  'mmy': 'ji,sa,ti,to',
  'las': 'nico,dal,doug,nicho',
  'red': 'alf,f,wilf,ja',
  'nny': 'be,da,joh,ke',
  'ius': 'cornel,dar,demetr,jul',
  'ley': 'brad,har,stan,wes',
  'mar': 'o,ou,am,la',
  'iel': 'gabr,dan,ar,nathan',
  'ane': 'souleym,d,du,sh',
  'ent': 'br,k,tr,vinc',
  'an': 'hass,ju,log,ary,roh,has,eit,yonat,ro,zor,drag,dej,stef,iv,emirh,ev,brend,d,jord,bry,de,esteb,ry,se,st,steph',
  'er': 'ik,javi,alexand,oliv,aleksand,om,christoph,kristoph,luth,elm,grov,hom,jasp,rodg,rog,spenc,tyl,xavi',
  'en': 'jayd,jad,aid,dev,eym,b,reub,rub,darr,lor,warr,all,dami,gl,k,ow,steph,stev',
  'in': 'yass,husse,benjam,mart,joaqu,hosse,col,frankl,marl,darw,edw,erw,dar,darr,efra,quent',
  'ie': 'j,jimm,samm,tomm,bill,charl,will,ern,arch,edd,frank,fredd,lou,regg,robb',
  'is': 'alex,lu,lou,math,chr,curt,den,denn,ell,franc,lew,morr,ot,trav,will',
  'el': 'abd,ang,no,jo,ro,ab,darr,fid,lion,marc,mich,russ',
  'ry': 'jer,per,ter,co,grego,ro,ga,zacha,hen,jeffe,jeff',
  'ce': 'lan,terran,van,bru,bry,hora,mauri,roy,walla',
  'ne': 'deway,dway,way,antoi,blai,jermai,euge,ge,tyro',
  'to': 'mina,yuu,haru,haruhi,haya,beni,ernes,ot',
  'or': 'heit,vict,ig,hect,juni,salvad,tayl,trev',
  'as': 'mati,tom,luc,thom,luk,tobi,jon,eli',
  'io': 'anton,emil,jul,rogel,gregor,ignac,mar,serg',
  'le': 'gabrie,doy,ky,ly,da,mer,orvil',
  'al': 'bil,,h,jam,miche,ne,rand',
  'dy': 'fred,ted,an,bra,co,gra,ru',
  'ad': 'muhamm,mohamm,moham,mur,br,ch,conr',
  'ey': 'dew,harv,jo,mick,rick,rodn,sidn',
  'am': 'li,willi,no,ad,abrah,grah,s',
  'ah': 'abdall,no,elij,jeremi,abdull,mic',
  'on': 'bry,j,jonath,le,marl,vern',
  'il': 'ne,nikh,cec,em,ph,virg',
  'im': 'j,t,ibrah,kar,hal,sel',
  'go': 'santia,thia,die,rodri,domin,hu',
  'ar': 'ces,hyd,aleksand,pet,edg,osc',
  'os': 'kiroll,carl,mil,am,marc,sant',
  'ro': 'ped,alejand,alessand,alva,artu,rami',
  'nd': 'arma,edmu,desmo,edmo,raymo',
  'ck': 'ja,chu,domini,ma,ni',
  'ta': 'hina,haru,sou,ara,kana',
  'ou': 'l,mamad,mahamad,sek,ry',
  'ph': 'ral,randol,rudol,jose,joes',
  'ik': 'er,adv,mal,min,sal',
  'rt': 'cu,ku,ba,stewa,stua',
  'us': 'mathe,jes,marc,ruf',
  'lo': 'ange,pab,abdul,nii',
  'es': 'jam,andr,charl,mos',
  'id': 'rach,dav,zah,shah',
  'nt': 'brya,cli,gra,lamo',
  're': 'and,pier,salvato,theodo',
  'ng': 'irvi,sterli,fe,yo',
  'ed': 'khal,,n,t',
  'ke': 'bla,ja,lu,mi',
  'th': 'hea,kei,kenne,se',
  'll': 'carro,kenda,marsha,randa',
  'di': 'fa,meh,mah,jor'
};
arr = fns.uncompress_suffixes(arr, suffix_compressed);

module.exports = arr;

// console.log(JSON.stringify(arr, null, 2))

},{"../fns":7}],31:[function(_dereq_,module,exports){
//notable people with names that aren't caught by the ordinary person-name rules
exports.male = [
  'messiaen',
  'saddam hussain',
  'virgin mary',
  'van gogh',
  'mitt romney',
  'barack obama',
  'kanye west',
  'mubarek',
  'lebron james',
  'emeril lagasse',
  'rush limbaugh',
  'carson palmer',
  'ray romano',
  'ronaldinho',
  'valentino rossi',
  'rod stewart',
  'kiefer sutherland',
  'denzel washington',
  'dick wolf',
  'tiger woods',
  'adolf hitler',
  'hulk hogan',
  'ashton kutcher',
  'kobe bryant',
  'cardinal wolsey',
  'slobodan milosevic',
];

exports.female = [
  'jk rowling',
  'oprah winfrey',
  'reese witherspoon',
  'tyra banks',
  'halle berry',
  'paris hilton',
  'scarlett johansson',
];

},{}],32:[function(_dereq_,module,exports){
//extend to person-names if infront of a name - 'Professor Frink'
module.exports = [
  'lord',
  'lady',
  'king',
  'queen',
  'prince',
  'princess',
  'dutchess',
  'president',
  'excellency',
  'professor',
  'chancellor',
  'father',
  'pastor',
  'brother',
  'sister',
  'doctor',
  'captain',
  'commander',
  'general',
  'lieutenant',
  'reverend',
  'rabbi',
  'ayatullah',
  'councillor',
  'secretary',
  'sultan',
  'mayor',
  'congressman',
  'congresswoman',
// 'his honorable',
// 'her honorable',
// 'the honorable',
];

},{}],33:[function(_dereq_,module,exports){
'use strict';
//some most-common iso-codes (most are too ambiguous)
const shortForms = [
  'usd',
  'cad',
  'aud',
  'gbp',
  'krw',
  'inr',
  'hkd',
  'dkk',
  'cny',
  'xaf',
  'xof',
  'eur',
  'jpy',
  //currency symbols
  '€',
  '$',
  '¥',
  '£',
  'лв',
  '₡',
  'kn',
  'kr',
  '¢',
  'Ft',
  'Rp',
  '﷼',
  '₭',
  'ден',
  '₨',
  'zł',
  'lei',
  'руб',
  '฿',
];

//some common, unambiguous currency names
let longForms = [
  'denar',
  'dobra',
  'forint',
  'kwanza',
  'kyat',
  'lempira',
  'pound sterling',
  'riel',
  'yen',
  'zloty',
  //colloquial currency names
  'dollar',
  'cent',
  'penny',
  'dime',
  'dinar',
  'euro',
  'lira',
  'pound',
  'pence',
  'peso',
  'baht',
  'sterling',
  'rouble',
  'shekel',
  'sheqel',
  'yuan',
  'franc',
  'rupee',
  'shilling',
  'krona',
  'dirham',
  'bitcoin'
];
const irregularPlurals = {
  yen: 'yen',
  baht: 'baht',
  riel: 'riel',
  penny: 'pennies',
};

//add plural forms - 'euros'
let l = longForms.length;
for(let i = 0; i < l; i++) {
  if (irregularPlurals[longForms[i]]) {
    longForms.push(irregularPlurals[longForms[i]]);
  } else {
    longForms.push(longForms[i] + 's');
  }
}

module.exports = shortForms.concat(longForms);

},{}],34:[function(_dereq_,module,exports){
const cardinal = {
  ones: {
    // 'a': 1,
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
  },
  teens: {
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19
  },
  tens: {
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90
  },
  multiples: {
    'hundred': 1e2,
    'thousand': 1e3,
    'grand': 1e3,
    'million': 1e6,
    'billion': 1e9,
    'trillion': 1e12,
    'quadrillion': 1e15,
    'quintillion': 1e18,
    'sextillion': 1e21,
    'septillion': 1e24
  }
};

const ordinal = {
  ones: {
    'zeroth': 0,
    'first': 1,
    'second': 2,
    'third': 3,
    'fourth': 4,
    'fifth': 5,
    'sixth': 6,
    'seventh': 7,
    'eighth': 8,
    'ninth': 9
  },
  teens: {
    'tenth': 10,
    'eleventh': 11,
    'twelfth': 12,
    'thirteenth': 13,
    'fourteenth': 14,
    'fifteenth': 15,
    'sixteenth': 16,
    'seventeenth': 17,
    'eighteenth': 18,
    'nineteenth': 19
  },
  tens: {
    'twentieth': 20,
    'thirtieth': 30,
    'fourtieth': 40,
    'fiftieth': 50,
    'sixtieth': 60,
    'seventieth': 70,
    'eightieth': 80,
    'ninetieth': 90
  },
  multiples: {
    'hundredth': 1e2,
    'thousandth': 1e3,
    'millionth': 1e6,
    'billionth': 1e9,
    'trillionth': 1e12,
    'quadrillionth': 1e15,
    'quintillionth': 1e18,
    'sextillionth': 1e21,
    'septillionth': 1e24
  }
};


//used for the units
const prefixes = {
  'yotta': 1,
  'zetta': 1,
  'exa': 1,
  'peta': 1,
  'tera': 1,
  'giga': 1,
  'mega': 1,
  'kilo': 1,
  'hecto': 1,
  'deka': 1,
  'deci': 1,
  'centi': 1,
  'milli': 1,
  'micro': 1,
  'nano': 1,
  'pico': 1,
  'femto': 1,
  'atto': 1,
  'zepto': 1,
  'yocto': 1,

  'square': 1,
  'cubic': 1,
  'quartic': 1
};

module.exports = {
  cardinal: cardinal,
  ordinal: ordinal,
  prefixes: prefixes
};

},{}],35:[function(_dereq_,module,exports){
'use strict';
//create an easy mapping between ordinal-cardinal
const numbers = _dereq_('./numbers');
let toOrdinal = {};
let toCardinal = {};
Object.keys(numbers.ordinal).forEach((k) => {
  let ordinal = Object.keys(numbers.ordinal[k]);
  let cardinal = Object.keys(numbers.cardinal[k]);
  for (let i = 0; i < ordinal.length; i++) {
    toOrdinal[cardinal[i]] = ordinal[i];
    toCardinal[ordinal[i]] = cardinal[i];
  }
});
module.exports = {
  toOrdinal: toOrdinal,
  toCardinal: toCardinal
};

},{"./numbers":34}],36:[function(_dereq_,module,exports){
'use strict';

const units = {
  'Temperature': {
    '°c': 'Celsius',
    '°f': 'Fahrenheit',
    'k': 'Kelvin',
    '°re': 'Reaumur',
    '°n': 'Newton',
    '°ra': 'Rankine'
  },
  'Volume': {
    'm³': 'cubic meter',
    'm3': 'cubic meter',
    'dm³': 'cubic decimeter',
    'dm3': 'cubic decimeter',
    'cm³': 'cubic centimeter',
    'cm3': 'cubic centimeter',
    'l': 'liter',
    'dl': 'deciliter',
    'cl': 'centiliter',
    'ml': 'milliliter',
    'in³': 'cubic inch',
    'in3': 'cubic inch',
    'ft³': 'cubic foot',
    'ft3': 'cubic foot',
    'yd³': 'cubic yard',
    'yd3': 'cubic yard',
    'gal': 'gallon',
    'bbl': 'petroleum barrel',
    'pt': 'pint',
    'qt': 'quart',
    'tbl': 'tablespoon',
    'tsp': 'teaspoon',
    'tbsp': 'tablespoon',
    'cup': 'cup',
    'fl oz': 'fluid ounce'
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
    'yd': 'yard'
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
    'ton': 'tonne'
  },
  'Area': {
    'km²': 'square kilometer',
    'km2': 'square kilometer',
    'm²': 'square meter',
    'm2': 'square meter',
    'dm²': 'square decimeter',
    'dm2': 'square decimeter',
    'cm²': 'square centimeter',
    'cm2': 'square centimeter',
    'mm²': 'square millimeter',
    'mm2': 'square millimeter',
    'ha': 'hectare',
    'mile²': 'square mile',
    'mile2': 'square mile',
    'in²': 'square inch',
    'in2': 'square inch',
    'yd²': 'square yard',
    'yd2': 'square yard',
    'ft²': 'square foot',
    'sq ft': 'square feet',
    'ft2': 'square foot',
    'acre': 'acre'
  },
  'Frequency': {
    'hz': 'hertz'
  },
  'Speed': {
    'km/h': 'kilometer per hour',
    'kmph': 'kilometer per hour',
    'mps': 'meter per second',
    'm/s': 'meter per second',
    'mph': 'mile per hour',
    'mi/h': 'mile per hour',
    'knot': 'knot'
  },
  'Data': {
    'b': 'byte',
    'kb': 'kilobyte',
    'mb': 'megabyte',
    'gb': 'gigabyte',
    'tb': 'terabyte',
    'pt': 'petabyte',
    'eb': 'exabyte',
    'zb': 'zettabyte',
    'yb': 'yottabyte'
  },
  'Energy': {
    'j': 'joule',
    'pa': 'pascal',
    'w': 'watt',
    'n': 'newton',
    'wb': 'weber',
    'h': 'henry',
    'c': 'coulomb',
    'v': 'volt',
    'f': 'farad',
    's': 'siemens',
    'o': 'ohm',
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
  }
};

//prepare a list of them, for the lexicon
let words = {};
Object.keys(units).forEach((k) => {
  Object.keys(units[k]).forEach((shorter) => {
    if (shorter.length > 1) {
      words[shorter] = true;
    }
    let longer = units[k][shorter];
    words[longer] = true;
    words[longer + 's'] = true;
  });
});
words = Object.keys(words);

module.exports = {
  words: words,
  units: units
};

},{}],37:[function(_dereq_,module,exports){
//a list of exceptions to the verb rules
'use strict';
const participles = _dereq_('./participles');

const irregular = {
  take: {
    PerfectTense: 'have taken',
    pluPerfectTense: 'had taken',
    FuturePerfect: 'will have taken'
  },
  can: {
    Gerund: '',
    PresentTense: 'can',
    PastTense: 'could',
    FutureTense: 'can',
    PerfectTense: 'could',
    pluPerfectTense: 'could',
    FuturePerfect: 'can',
    Actor: ''
  },
  free: {
    Gerund: 'freeing',
    Actor: ''
  },
  arise: {
    PastTense: 'arose',
    Participle: 'arisen'
  },
  babysit: {
    PastTense: 'babysat',
    Actor: 'babysitter'
  },
  be: { // this is crazy-hard and shouldn't be here
    PastTense: 'was',
    Participle: 'been',
    PresentTense: 'is',
    // FutureTense: 'will be',
    Actor: '',
    Gerund: 'am'
  },
  // will: {
  //   PastTense: 'will',
  // },
  is: {
    PastTense: 'was',
    PresentTense: 'is',
    // FutureTense: 'will be',
    // PerfectTense: 'have been',
    // pluPerfectTense: 'had been',
    // FuturePerfect: 'will have been',
    Actor: '',
    Gerund: 'being'
  },
  beat: {
    Gerund: 'beating',
    Actor: 'beater',
    Participle: 'beaten'
  },
  begin: {
    Gerund: 'beginning',
    PastTense: 'began'
  },
  ban: {
    PastTense: 'banned',
    Gerund: 'banning',
    Actor: ''
  },
  bet: {
    Actor: 'better'
  },
  bind: {
    PastTense: 'bound'
  },
  bite: {
    Gerund: 'biting',
    PastTense: 'bit'
  },
  bleed: {
    PastTense: 'bled'
  },
  break: {
    PastTense: 'broke'
  },
  breed: {
    PastTense: 'bred'
  },
  bring: {
    PastTense: 'brought'
  },
  broadcast: {
    PastTense: 'broadcast'
  },
  build: {
    PastTense: 'built'
  },
  buy: {
    PastTense: 'bought'
  },
  catch: {
    PastTense: 'caught'
  },
  choose: {
    Gerund: 'choosing',
    PastTense: 'chose'
  },
  cost: {
    PastTense: 'cost'
  },
  deal: {
    PastTense: 'dealt'
  },
  die: {
    PastTense: 'died',
    Gerund: 'dying',
  },
  dig: {
    Gerund: 'digging',
    PastTense: 'dug'
  },
  do: {
    PastTense: 'did',
    PresentTense: 'does'
  },
  draw: {
    PastTense: 'drew'
  },
  drink: {
    PastTense: 'drank',
    Participle: 'drunk'
  },
  drive: {
    Gerund: 'driving',
    PastTense: 'drove'
  },
  eat: {
    Gerund: 'eating',
    PastTense: 'ate',
    Actor: 'eater',
    Participle: 'eaten'
  },
  fall: {
    PastTense: 'fell'
  },
  feed: {
    PastTense: 'fed'
  },
  feel: {
    PastTense: 'felt',
    Actor: 'feeler'
  },
  fight: {
    PastTense: 'fought'
  },
  find: {
    PastTense: 'found'
  },
  fly: {
    PastTense: 'flew',
    Participle: 'flown'
  },
  blow: {
    PastTense: 'blew',
    Participle: 'blown'
  },
  forbid: {
    PastTense: 'forbade'
  },
  forget: {
    Gerund: 'forgeting',
    PastTense: 'forgot'
  },
  forgive: {
    Gerund: 'forgiving',
    PastTense: 'forgave'
  },
  freeze: {
    Gerund: 'freezing',
    PastTense: 'froze'
  },
  get: {
    PastTense: 'got'
  },
  give: {
    Gerund: 'giving',
    PastTense: 'gave'
  },
  go: {
    PastTense: 'went',
    PresentTense: 'goes'
  },
  hang: {
    PastTense: 'hung'
  },
  have: {
    Gerund: 'having',
    PastTense: 'had',
    PresentTense: 'has'
  },
  hear: {
    PastTense: 'heard'
  },
  hide: {
    PastTense: 'hid'
  },
  hold: {
    PastTense: 'held'
  },
  hurt: {
    PastTense: 'hurt'
  },
  lay: {
    PastTense: 'laid'
  },
  lead: {
    PastTense: 'led'
  },
  leave: {
    PastTense: 'left'
  },
  lie: {
    Gerund: 'lying',
    PastTense: 'lay'
  },
  light: {
    PastTense: 'lit'
  },
  lose: {
    Gerund: 'losing',
    PastTense: 'lost'
  },
  make: {
    PastTense: 'made'
  },
  mean: {
    PastTense: 'meant'
  },
  meet: {
    Gerund: 'meeting',
    PastTense: 'met',
    Actor: 'meeter'
  },
  pay: {
    PastTense: 'paid'
  },
  read: {
    PastTense: 'read'
  },
  ring: {
    PastTense: 'rang'
  },
  rise: {
    PastTense: 'rose',
    Gerund: 'rising',
    pluPerfectTense: 'had risen',
    FuturePerfect: 'will have risen'
  },
  run: {
    Gerund: 'running',
    PastTense: 'ran'
  },
  say: {
    PastTense: 'said'
  },
  see: {
    PastTense: 'saw'
  },
  sell: {
    PastTense: 'sold'
  },
  shine: {
    PastTense: 'shone'
  },
  shoot: {
    PastTense: 'shot'
  },
  show: {
    PastTense: 'showed'
  },
  sing: {
    PastTense: 'sang',
    Participle: 'sung'
  },
  sink: {
    PastTense: 'sank',
    pluPerfectTense: 'had sunk'
  },
  sit: {
    PastTense: 'sat'
  },
  slide: {
    PastTense: 'slid'
  },
  speak: {
    PastTense: 'spoke',
    PerfectTense: 'have spoken',
    pluPerfectTense: 'had spoken',
    FuturePerfect: 'will have spoken'
  },
  spin: {
    Gerund: 'spinning',
    PastTense: 'spun'
  },
  spread: {
    PastTense: 'spread'
  },
  stand: {
    PastTense: 'stood'
  },
  steal: {
    PastTense: 'stole',
    Actor: 'stealer'
  },
  stick: {
    PastTense: 'stuck'
  },
  sting: {
    PastTense: 'stung'
  },
  stream: {
    Actor: 'streamer'
  },
  strike: {
    Gerund: 'striking',
    PastTense: 'struck'
  },
  swear: {
    PastTense: 'swore'
  },
  swim: {
    PastTense: 'swam'
  },
  swing: {
    PastTense: 'swung'
  },
  teach: {
    PastTense: 'taught',
    PresentTense: 'teaches'
  },
  tear: {
    PastTense: 'tore'
  },
  tell: {
    PastTense: 'told'
  },
  think: {
    PastTense: 'thought'
  },
  understand: {
    PastTense: 'understood'
  },
  wake: {
    PastTense: 'woke'
  },
  wear: {
    PastTense: 'wore'
  },
  win: {
    Gerund: 'winning',
    PastTense: 'won'
  },
  withdraw: {
    PastTense: 'withdrew'
  },
  write: {
    Gerund: 'writing',
    PastTense: 'wrote',
    Participle: 'written'
  },
  tie: {
    Gerund: 'tying',
    PastTense: 'tied'
  },
  ski: {
    PastTense: 'skiied'
  },
  boil: {
    Actor: 'boiler'
  },
  miss: {
    PresentTense: 'miss'
  },
  act: {
    Actor: 'actor'
  },
  compete: {
    Gerund: 'competing',
    PastTense: 'competed',
    Actor: 'competitor'
  },
  being: {
    Gerund: 'are',
    PastTense: 'were',
    PresentTense: 'are'
  },
  imply: {
    PastTense: 'implied',
    PresentTense: 'implies'
  },
  ice: {
    Gerund: 'icing',
    PastTense: 'iced'
  },
  develop: {
    PastTense: 'developed',
    Actor: 'developer',
    Gerund: 'developing'
  },
  wait: {
    Gerund: 'waiting',
    PastTense: 'waited',
    Actor: 'waiter'
  },
  aim: {
    Actor: 'aimer'
  },
  spill: {
    PastTense: 'spilt'
  },
  drop: {
    Gerund: 'dropping',
    PastTense: 'dropped'
  },
  log: {
    Gerund: 'logging',
    PastTense: 'logged'
  },
  rub: {
    Gerund: 'rubbing',
    PastTense: 'rubbed'
  },
  smash: {
    PresentTense: 'smashes'
  },
  suit: {
    Gerund: 'suiting',
    PastTense: 'suited',
    Actor: 'suiter'
  }
};
Object.keys(participles).forEach((inf) => {
  if (irregular[inf]) {
    irregular[inf].Participle = participles[inf];
  } else {
    irregular[inf] = {
      Participle: participles[inf]
    };
  }
});
module.exports = irregular;

},{"./participles":38}],38:[function(_dereq_,module,exports){
//particples are a bit like past-tense, but used differently
//map the infinitive to its irregular-participle
module.exports = {
  'become': 'become',
  'begin': 'begun',
  'bend': 'bent',
  'bet': 'bet',
  'bite': 'bitten',
  'bleed': 'bled',
  'brake': 'broken',
  'bring': 'brought',
  'build': 'built',
  'burn': 'burned',
  'burst': 'burst',
  'buy': 'bought',
  'catch': 'caught',
  'choose': 'chosen',
  'cling': 'clung',
  'come': 'come',
  'creep': 'crept',
  'cut': 'cut',
  'deal': 'dealt',
  'dig': 'dug',
  'dive': 'dived',
  'do': 'done',
  'draw': 'drawn',
  'dream': 'dreamt',
  'drive': 'driven',
  'eat': 'eaten',
  'fall': 'fallen',
  'feed': 'fed',
  'fight': 'fought',
  'flee': 'fled',
  'fling': 'flung',
  'forget': 'forgotten',
  'forgive': 'forgiven',
  'freeze': 'frozen',
  'got': 'gotten',
  'give': 'given',
  'go': 'gone',
  'grow': 'grown',
  'hang': 'hung',
  'have': 'had',
  'hear': 'heard',
  'hide': 'hidden',
  'hit': 'hit',
  'hold': 'held',
  'hurt': 'hurt',
  'keep': 'kept',
  'kneel': 'knelt',
  'know': 'known',
  'lay': 'laid',
  'lead': 'led',
  'leap': 'leapt',
  'leave': 'left',
  'lend': 'lent',
  'light': 'lit',
  'loose': 'lost',
  'make': 'made',
  'mean': 'meant',
  'meet': 'met',
  'pay': 'paid',
  'prove': 'proven',
  'put': 'put',
  'quit': 'quit',
  'read': 'read',
  'ride': 'ridden',
  'ring': 'rung',
  'rise': 'risen',
  'run': 'run',
  'say': 'said',
  'see': 'seen',
  'seek': 'sought',
  'sell': 'sold',
  'send': 'sent',
  'set': 'set',
  'sew': 'sewn',
  'shake': 'shaken',
  'shave': 'shaved',
  'shine': 'shone',
  'shoot': 'shot',
  'shut': 'shut',
  'seat': 'sat',
  'slay': 'slain',
  'sleep': 'slept',
  'slide': 'slid',
  'sneak': 'snuck',
  'speak': 'spoken',
  'speed': 'sped',
  'spend': 'spent',
  'spill': 'spilled',
  'spin': 'spun',
  'spit': 'spat',
  'split': 'split',
  'spring': 'sprung',
  'stink': 'stunk',
  'strew': 'strewn',
  'sware': 'sworn',
  'sweep': 'swept',
  'thrive': 'thrived',
  'throw': 'thrown',
  'undergo': 'undergone',
  'upset': 'upset',
  'weave': 'woven',
  'weep': 'wept',
  'wind': 'wound',
  'wring': 'wrung'
};

},{}],39:[function(_dereq_,module,exports){
//most-frequent non-irregular verbs, in infinitive form, to be conjugated for the lexicon
//this list is the seed, from which various forms are conjugated
'use strict';
const fns = _dereq_('../fns');

//suffix-index adjectives
//  {cial:'cru,spe'} -> 'crucial', 'special'

//suffix-index adjectives
//  {cial:'cru,spe'} -> 'crucial', 'special'
let compressed = {
  prove: ',im,ap,disap',
  serve: ',de,ob,re',
  ress: 'exp,p,prog,st,add,d',
  lect: 'ref,se,neg,col,e',
  sist: 'in,con,per,re,as',
  tain: 'ob,con,main,s,re',
  mble: 'rese,gru,asse,stu',
  ture: 'frac,lec,tor,fea',
  port: 're,sup,ex,im',
  ate: 'rel,oper,indic,cre,h,activ,estim,particip,d,anticip,evalu',
  use: ',ca,over,ref,acc,am,pa',
  ive: 'l,rece,d,arr,str,surv,thr,rel',
  are: 'prep,c,comp,sh,st,decl,d,sc',
  ine: 'exam,imag,determ,comb,l,decl,underm,def',
  nce: 'annou,da,experie,influe,bou,convi,enha',
  ain: 'tr,rem,expl,dr,compl,g,str',
  ent: 'prev,repres,r,res,rel,inv',
  age: 'dam,mess,man,encour,eng,discour',
  rge: 'su,cha,eme,u,me',
  ise: 'ra,exerc,prom,surpr,pra',
  ect: 'susp,dir,exp,def,rej',
  ter: 'en,mat,cen,ca,al',
  end: ',t,dep,ext,att',
  est: 't,sugg,prot,requ,r',
  ock: 'kn,l,sh,bl,unl',
  nge: 'cha,excha,ra,challe,plu',
  ase: 'incre,decre,purch,b,ce',
  ish: 'establ,publ,w,fin,distingu',
  mit: 'per,ad,sub,li',
  ure: 'fig,ens,end,meas',
  der: 'won,consi,mur,wan',
  ave: 's,sh,w,cr',
  ire: 'requ,des,h,ret',
  tch: 'scra,swi,ma,stre',
  ack: 'att,l,p,cr',
  ion: 'ment,quest,funct,envis',
  ump: 'j,l,p,d',
  ide: 'dec,prov,gu,s',
  ush: 'br,cr,p,r',
  eat: 'def,h,tr,ch',
  ash: 'sm,spl,w,fl',
  rry: 'ca,ma,hu,wo',
  ear: 'app,f,b,disapp',
  er: 'answ,rememb,off,suff,cov,discov,diff,gath,deliv,both,empow,with',
  le: 'fi,sett,hand,sca,whist,enab,smi,ming,ru,sprink,pi',
  st: 'exi,foreca,ho,po,twi,tru,li,adju,boa,contra,boo',
  it: 'vis,ed,depos,sp,awa,inhib,cred,benef,prohib,inhab',
  nt: 'wa,hu,pri,poi,cou,accou,confro,warra,pai',
  ch: 'laun,rea,approa,sear,tou,ar,enri,atta',
  ss: 'discu,gue,ki,pa,proce,cro,glo,dismi',
  ll: 'fi,pu,ki,ca,ro,sme,reca,insta',
  rn: 'tu,lea,conce,retu,bu,ea,wa,gove',
  ce: 'redu,produ,divor,noti,for,repla',
  te: 'contribu,uni,tas,vo,no,constitu,ci',
  rt: 'sta,comfo,exe,depa,asse,reso,conve',
  ck: 'su,pi,che,ki,tri,wre',
  ct: 'intera,restri,predi,attra,depi,condu',
  ke: 'sta,li,bra,overta,smo,disli',
  se: 'collap,suppo,clo,rever,po,sen',
  nd: 'mi,surrou,dema,remi,expa,comma',
  ve: 'achie,invol,remo,lo,belie,mo',
  rm: 'fo,perfo,confi,confo,ha',
  or: 'lab,mirr,fav,monit,hon',
  ue: 'arg,contin,val,iss,purs',
  ow: 'all,foll,sn,fl,borr',
  ay: 'pl,st,betr,displ,portr',
  ze: 'recogni,reali,snee,ga,emphasi',
  ip: 'cl,d,gr,sl,sk',
  re: 'igno,sto,interfe,sco',
  ng: 'spri,ba,belo,cli',
  ew: 'scr,vi,revi,ch',
  gh: 'cou,lau,outwei,wei',
  ly: 'app,supp,re,multip',
  ge: 'jud,acknowled,dod,alle',
  en: 'list,happ,threat,strength',
  ee: 'fors,agr,disagr,guarant',
  et: 'budg,regr,mark,targ',
  rd: 'rega,gua,rewa,affo',
  am: 'dre,j,sl,ro',
  ry: 'va,t,c,bu'
};
let arr = [
  'abandon',
  'accept',
  'add',
  'added',
  'adopt',
  'aid',
  'appeal',
  'applaud',
  'archive',
  'ask',
  'assign',
  'associate',
  'assume',
  'attempt',
  'avoid',
  'ban',
  'become',
  'bomb',
  'cancel',
  'claim',
  'claw',
  'come',
  'control',
  'convey',
  'cook',
  'copy',
  'cut',
  'deem',
  'defy',
  'deny',
  'describe',
  'design',
  'destroy',
  'die',
  'divide',
  'do',
  'doubt',
  'drag',
  'drift',
  'drop',
  'echo',
  'embody',
  'enjoy',
  'envy',
  'excel',
  'fall',
  'fail',
  'fix',
  'float',
  'flood',
  'focus',
  'fold',
  'get',
  'goes',
  'grab',
  'grasp',
  'grow',
  'happen',
  'head',
  'help',
  'hold fast',
  'hope',
  'include',
  'instruct',
  'invest',
  'join',
  'keep',
  'know',
  'learn',
  'let',
  'lift',
  'link',
  'load',
  'loan',
  'look',
  'make due',
  'mark',
  'melt',
  'minus',
  'multiply',
  'name',
  'need',
  'occur',
  'overcome',
  'overlap',
  'overwhelm',
  'owe',
  'pay',
  'plan',
  'plug',
  'plus',
  'pop',
  'pour',
  'proclaim',
  'put',
  'rank',
  'reason',
  'reckon',
  'relax',
  'repair',
  'reply',
  'reveal',
  'revel',
  'risk',
  'rub',
  'ruin',
  'sail',
  'seek',
  'seem',
  'send',
  'set',
  'shout',
  'sleep',
  'sneak',
  'sort',
  'spoil',
  'stem',
  'step',
  'stop',
  'study',
  'take',
  'talk',
  'thank',
  'took',
  'trade',
  'transfer',
  'trap',
  'travel',
  'tune',
  'undergo',
  'undo',
  'uplift',
  'walk',
  'watch',
  'win',
  'wipe',
  'work',
  'yawn',
  'yield'
];

module.exports = fns.uncompress_suffixes(arr, compressed);

},{"../fns":7}],40:[function(_dereq_,module,exports){
'use strict';
const tagColors = _dereq_('./tags/colors');

// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const c = {
  reset: '\x1b[0m',
  red : '\x1b[31m',
  green : '\x1b[32m',
  yellow : '\x1b[33m',
  blue : '\x1b[34m',
  magenta : '\x1b[35m',
  cyan : '\x1b[36m',
  black: '\x1b[30m'
};
//dont use colors on client-side
if (typeof module === 'undefined') {
  Object.keys(c).forEach((k) => {
    c[k] = '';
  });
}

// typeof obj == "function" also works
// but not in older browsers. :-/
exports.isFunction = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
};

//coerce any input into a string
exports.ensureString = (input) => {
  if (typeof input === 'string') {
    return input;
  } else if (typeof input === 'number') {
    return '' + input;
  }
  return '';
};
//coerce any input into a string
exports.ensureObject = (input) => {
  if (typeof input !== 'object') {
    return {};
  }
  if (input === null || input instanceof Array) {
    return {};
  }
  return input;
};
//string utilities
exports.endsWith = function (str, suffix) {
  if (str && str.substr(-suffix.length) === suffix) {
    return true;
  }
  return false;
};

exports.startsWith = function (str, prefix) {
  if (str && prefix) {
    if (str.substr(0, prefix.length) === prefix) {
      return true;
    }
  }
  return false;
};

exports.titleCase = (str) => {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

//turn a nested array into one array
exports.flatten = function (arr) {
  let all = [];
  arr.forEach(function (a) {
    all = all.concat(a);
  });
  return all;
};

//shallow-clone an object
exports.copy = (o) => {
  let o2 = {};
  o = exports.ensureObject(o);
  Object.keys(o).forEach((k) => {
    o2[k] = o[k];
  });
  return o2;
};

//shallow-merge an object
exports.extend = (o, o2) => {
  if (!o) {
    return o2;
  }
  if (!o2) {
    return o;
  }
  Object.keys(o2).forEach((k) => {
    o[k] = o2[k];
  });
  return o;
};

//colorization
exports.green = function(str) {
  return c.green + str + c.reset;
};
exports.red = function(str) {
  return c.red + str + c.reset;
};
exports.blue = function(str) {
  return c.blue + str + c.reset;
};
exports.magenta = function(str) {
  return c.magenta + str + c.reset;
};
exports.cyan = function(str) {
  return c.cyan + str + c.reset;
};
exports.yellow = function(str) {
  return c.yellow + str + c.reset;
};
exports.black = function(str) {
  return c.black + str + c.reset;
};
exports.printTag = function(tag) {
  if (tagColors[tag]) {
    return exports[tagColors[tag]](tag);
  }
  return tag;
};
exports.printTerm = function(t) {
  let tags = Object.keys(t.tag);
  for(let i = 0; i < tags.length; i++) {
    if (tagColors[tags[i]]) {
      let color = tagColors[tags[i]];
      return exports[color](t.plaintext);
    }
  }
  return c.reset + t.plaintext + c.reset;
};

exports.rightPad = function (str, width, char) {
  char = char || ' ';
  str = str.toString();
  while (str.length < width) {
    str += char;
  }
  return str;
};

exports.leftPad = function (str, width, char) {
  char = char || ' ';
  str = str.toString();
  while (str.length < width) {
    str += char;
  }
  return str;
};

},{"./tags/colors":153}],41:[function(_dereq_,module,exports){
(function (global){
'use strict';
const buildResult = _dereq_('./result/build');
const pkg = _dereq_('../package.json');
const log = _dereq_('./log');

//the main thing
const nlp = function (str, lexicon, tagSet) {
  return buildResult(str, lexicon, tagSet);
};

//this is handy
nlp.version = pkg.version;

//so handy at times
nlp.lexicon = function() {
  return _dereq_('./data/lexicon');
};

//also this is much handy
nlp.verbose = function(str) {
  log.enable(str);
};

//and then all-the-exports...
if (typeof self !== 'undefined') {
  self.nlp = nlp; // Web Worker
} else if (typeof window !== 'undefined') {
  window.nlp = nlp; // Browser
} else if (typeof global !== 'undefined') {
  global.nlp = nlp; // NodeJS
}
//don't forget amd!
if (typeof define === 'function' && define.amd) {
  define(nlp);
}
//then for some reason, do this too!
if (typeof module !== 'undefined') {
  module.exports = nlp;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../package.json":1,"./data/lexicon":9,"./log":42,"./result/build":43}],42:[function(_dereq_,module,exports){
'use strict';
const fns = _dereq_('../fns');
let enable = false;

module.exports = {
  enable: (str) => {
    enable = str || true;
  },
  here: (path) => {
    if (enable === true || enable === path) {
      console.log('  ' + (path));
    }
  },
  tell: (str, path) => {
    if (enable === true || enable === path) {
      if (typeof str === 'object') {
        str = JSON.stringify(str);
      }
      str = '    ' + (str);
      console.log(str);
    }
  },
  tagAs: (t, pos, reason) => {
    if (enable === true || enable === 'tagger') {
      let title = t.normal || '[' + t.silent_term + ']';
      title = fns.yellow(title);
      title = fns.leftPad('\'' + title + '\'', 20);
      title += '  ->   ' + fns.printTag(pos);
      title = fns.leftPad(title, 54);
      console.log('       ' + title + '(' + fns.cyan(reason || '') + ')');
    }
  },
  match: (t, reason) => {
    console.log('       ' + ('-match-') + '  \'' + (t.normal) + '\'  -  ' + reason);
  },
  noMatch(t) {
    console.log('               ' + ('-die \'' + t.normal + '\''));
  }
};

},{"../fns":40}],43:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('./index');
const tokenize = _dereq_('./tokenize');
const Terms = _dereq_('./paths').Terms;
const normalize = _dereq_('../term/methods/normalize/normalize').normalize;
const tagArr = _dereq_('../tags');


//basically really dirty and stupid.
const normalizeLex = function(lex) {
  lex = lex || {};
  return Object.keys(lex).reduce((h, k) => {
    //add natural form
    h[k] = lex[k];
    let normal = normalize(k);
    if (k !== normal) {
      //add it too
      h[normal] = lex[k];
    }
    return h;
  }, {});
};

const extendTags = function(newTags) {
  console.log(newTags);
  console.log(tagArr);
};

//build a new pos-tagged Result obj from a string
const fromString = (str, lexicon, tagSet) => {
  let sentences = tokenize(str);
  //make sure lexicon obeys standards
  lexicon = normalizeLex(lexicon);
  let list = sentences.map((s) => Terms.fromString(s, lexicon));
  //extend tagset for this ref
  if (tagSet) {
    extendTags(tagSet);
  }

  let r = new Text(list, lexicon, null, tagSet);
  //give each ts a ref to the result
  r.list.forEach((ts) => {
    ts.refText = r;
  });
  return r;
};
module.exports = fromString;

},{"../tags":155,"../term/methods/normalize/normalize":162,"./index":44,"./paths":56,"./tokenize":152}],44:[function(_dereq_,module,exports){
'use strict';
//a Text is an array of termLists
class Text {
  constructor(arr, lexicon, reference, tagSet) {
    this.list = arr || [];
    this.reference = reference;
    this.tagSet = tagSet;
  }
  //getter/setters
  /** did it find anything? */
  get found() {
    return this.list.length > 0;
  }
  /** how many Texts are there?*/
  get length() {
    return this.list.length;
  }
  get isA() {
    return 'Text';
  }
  get parent() {
    return this.reference || this;
  }
  set parent(r) {
    this.reference = r;
    return this;
  }
  all() {
    return this.parent;
  }
  index() {
    return this.list.map((ts) => ts.index());
  }
  data() {
    return this.list.map((ts) => {
      return {
        normal: ts.out('normal'),
        text: ts.out('text')
      };
    });
  }
  debug(opts) {
    return out(this, 'debug', opts);
  }
  get whitespace() {
    return {
      before: (str) => {
        this.list.forEach((ts) => {
          ts.whitespace.before(str);
        });
        return this;
      },
      after: (str) => {
        this.list.forEach((ts) => {
          ts.whitespace.after(str);
        });
        return this;
      }
    };
  }
}

module.exports = Text;
Text = _dereq_('./methods/array')(Text);
Text = _dereq_('./methods/loops')(Text);
Text = _dereq_('./methods/match')(Text);
Text = _dereq_('./methods/out')(Text);
Text = _dereq_('./methods/sort')(Text);
Text = _dereq_('./methods/split')(Text);
Text = _dereq_('./methods/tag')(Text);
Text = _dereq_('./methods/normalize')(Text);

const subset = {
  acronyms: _dereq_('./subset/acronyms'),
  adjectives: _dereq_('./subset/adjectives'),
  adverbs: _dereq_('./subset/adverbs'),
  clauses: _dereq_('./subset/clauses'),
  contractions: _dereq_('./subset/contractions'),
  dates: _dereq_('./subset/dates'),
  hashTags: _dereq_('./subset/hashTags'),
  nouns: _dereq_('./subset/nouns'),
  organizations: _dereq_('./subset/organizations'),
  people: _dereq_('./subset/people'),
  phoneNumbers: _dereq_('./subset/phoneNumbers'),
  places: _dereq_('./subset/places'),
  questions: _dereq_('./subset/sentences/questions'),
  quotations: _dereq_('./subset/quotations'),
  sentences: _dereq_('./subset/sentences'),
  statements: _dereq_('./subset/sentences/statements'),
  terms: _dereq_('./subset/terms'),
  topics: _dereq_('./subset/topics'),
  urls: _dereq_('./subset/urls'),
  values: _dereq_('./subset/values'),
  verbs: _dereq_('./subset/verbs'),
  ngrams: _dereq_('./subset/ngrams'),
  startGrams: _dereq_('./subset/ngrams/startGrams'),
  endGrams: _dereq_('./subset/ngrams/endGrams'),
};
//term subsets
Object.keys(subset).forEach((k) => {
  Text.prototype[k] = function (num, arg) {
    let sub = subset[k];
    let m = sub.find(this, num, arg);
    return new subset[k](m.list, this.lexicon, this.parent);
  };
});

},{"./methods/array":45,"./methods/loops":46,"./methods/match":47,"./methods/normalize":48,"./methods/out":49,"./methods/sort":52,"./methods/split":54,"./methods/tag":55,"./subset/acronyms":57,"./subset/adjectives":59,"./subset/adverbs":67,"./subset/clauses":69,"./subset/contractions":73,"./subset/dates":75,"./subset/hashTags":85,"./subset/ngrams":89,"./subset/ngrams/endGrams":86,"./subset/ngrams/startGrams":90,"./subset/nouns":92,"./subset/organizations":101,"./subset/people":103,"./subset/phoneNumbers":105,"./subset/places":106,"./subset/quotations":108,"./subset/sentences":109,"./subset/sentences/questions":110,"./subset/sentences/statements":113,"./subset/terms":115,"./subset/topics":117,"./subset/urls":118,"./subset/values":119,"./subset/verbs":132}],45:[function(_dereq_,module,exports){
'use strict';
const Terms = _dereq_('../../terms');

const genericMethods = (Text) => {

  const methods = {

    /**copy data properly so later transformations will have no effect*/
    clone: function () {
      let list = this.list.map((ts) => {
        return ts.clone();
      });
      // this.parent.list = this.parent.list.map((ts) => {
      //   return ts.clone();
      // });
      // return this;
      return new Text(list); //this.lexicon, this.parent
    },

    /** get the nth term of each result*/
    term: function (n) {
      let list = this.list.map((ts) => {
        let arr = [];
        let el = ts.terms[n];
        if (el) {
          arr = [el];
        }
        return new Terms(arr, this.lexicon, this.refText, this.refTerms);
      });
      return new Text(list, this.lexicon, this.parent);
    },
    firstTerm: function () {
      return this.match('^.');
    },
    lastTerm: function () {
      return this.match('.$');
    },



    /** use only the nth result*/
    get: function (n) {
      //return an empty result
      if ((!n && n !== 0) || !this.list[n]) {
        return new Text([], this.lexicon, this.parent);
      }
      let ts = this.list[n];
      return new Text([ts], this.lexicon, this.parent);
    },
    /**use only the first result */
    first: function (n) {
      if (!n && n !== 0) {
        return this.get(0);
      }
      return new Text(this.list.slice(0, n), this.lexicon, this.parent);
    },
    /**use only the last result */
    last: function (n) {
      if (!n && n !== 0) {
        return this.get(this.list.length - 1);
      }
      let end = this.list.length;
      let start = end - n;
      return new Text(this.list.slice(start, end), this.lexicon, this.parent);
    },


    concat: function() {
      //any number of params
      for(let i = 0; i < arguments.length; i++) {
        let p = arguments[i];
        if (typeof p === 'object') {
          //Text()
          if (p.isA === 'Text' && p.list) {
            this.list = this.list.concat(p.list);
          }
          //Terms()
          if (p.isA === 'Terms') {
            this.list.push(p);
          }
        }
      }
      return this;
    },
    /** make it into one sentence/termlist */
    flatten: function () {
      let terms = [];
      this.list.forEach((ts) => {
        terms = terms.concat(ts.terms);
      });
      //dont create an empty ts
      if (!terms.length) {
        return new Text(null, this.lexicon, this.parent);
      }
      let ts = new Terms(terms, this.lexicon, this, null);
      return new Text([ts], this.lexicon, this.parent);
    },

  };

  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = genericMethods;

},{"../../terms":175}],46:[function(_dereq_,module,exports){
'use strict';
//this methods are simply loops around each termList object.
let foreach = [
  'toTitleCase',
  'toUpperCase',
  'toLowerCase',
  'toCamelCase',

  'hyphenate',
  'dehyphenate',

  'insertBefore',
  'insertAfter',
  'insertAt',

  'replace',
  'replaceWith',

  'delete',

// 'tag',
// 'unTag',
];

const addMethods = (Text) => {

  foreach.forEach((k) => {
    let myFn = function () {
      let args = arguments;
      this.list.forEach((ts) => {
        ts[k].apply(ts, args);
      });
      return this;
    };
    Text.prototype[k] = myFn;
  });
  return Text;
};

module.exports = addMethods;

},{}],47:[function(_dereq_,module,exports){
'use strict';
const splitMethods = (Text) => {

  const methods = {

    /** do a regex-like search through terms and return a subset */
    match: function (reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        //an array of arrays
        let matches = ts.match(reg, verbose);
        matches.list.forEach((ms) => {
          list.push(ms);
        });
      });
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

    not: function(reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        let found = ts.not(reg, verbose);
        list = list.concat(found.list);
      });
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

    /** find the first result */
    // matchOne: function (reg, verbose) {
    //   for (let i = 0; i < this.list.length; i++) {
    //     let ms = this.list[i].match(reg, verbose);
    //     if (ms && ms.length) {
    //       let parent = this.parent || this;
    //       return new Text(ms, parent);
    //     }
    //   }
    //   return null;
    // },

    /** true/false if it countains atleast one match*/
    // has: function (reg, verbose) {
    //   for (let i = 0; i < this.list.length; i++) {
    //     let ms = this.list[i].match(reg, verbose);
    //     if (ms && ms.length) {
    //       return true;
    //     }
    //   }
    //   return false;
    // },

    if: function (reg, verbose) {
      let list = [];
      for(let i = 0; i < this.list.length; i++) {
        let m = this.list[i].match(reg, verbose);
        if (m.found) {
          list.push(this.list[i]);
        }
      }
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

    ifNo: function (reg, verbose) {
      let list = [];
      for(let i = 0; i < this.list.length; i++) {
        let m = this.list[i].match(reg, verbose);
        if (!m.found) {
          list.push(this.list[i]);
        }
      }
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

    /** return terms after this match */
    // after: function (reg) {
    //   let after = reg + ' *';
    //   return this.match(after).not(reg);
    // },
    //
    // /** return terms before this match */
    // before: function (reg) {
    //   let before = '* ' + reg;
    //   return this.match(before).not(reg);
    // },

  };
  //alias 'and'
  methods.and = methods.match;

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = splitMethods;

},{}],48:[function(_dereq_,module,exports){
'use strict';
//
const defaultMethods = {
  whitespace: true,
  case: true,
  numbers: true,
  punctuation: true,
  unicode: true,
  contractions: true
};

const methods = {

  /** make only one space between each word */
  whitespace: (r) => {
    r.terms().list.forEach((ts, i) => {
      let t = ts.terms[0];
      if (i > 0) {
        t.whitespace.before = ' ';
      }
      t.whitespace.after = '';
    });
    return r;
  },

  /** make first-word titlecase, and people, places titlecase */
  case: (r) => {
    r.terms().list.forEach((ts, i) => {
      let t = ts.terms[0];
      if (i === 0 || t.tag.Person || t.tag.Place || t.tag.Organization) {
        ts.toTitleCase();
      } else {
        ts.toLowerCase();
      }
    });
    return r;
  },

  /** turn 'five' to 5, and 'fifth' to 5th*/
  numbers: (r) => {
    return r.values().toNumber();
  },

  /** remove commas, semicolons - but keep sentence-ending punctuation*/
  punctuation: (r) => {
    r.terms().list.forEach((ts, i) => {
      let t = ts.terms[0];
      if (i < ts.terms.length - 1) {
        t.text = t.killPunctuation();
      }
    });
    return r;
  },

  contractions: (r) => {
    return r.contractions().expand();
  }
};

const addMethods = (Text) => {
  Text.prototype.normalize = function(obj) {
    obj = obj || defaultMethods;
    //do each type of normalization
    Object.keys(obj).forEach((fn) => {
      if (methods[fn]) {
        methods[fn](this);
      }
    });
  };
  return Text;
};
module.exports = addMethods;

},{}],49:[function(_dereq_,module,exports){
'use strict';
const topk = _dereq_('./topk');
const offset = _dereq_('./offset');

const methods = {
  text: (r) => {
    return r.list.reduce((str, ts) => {
      str += ts.out('text');
      return str;
    }, '');
  },
  normal: (r) => {
    return r.list.map((ts) => {
      let str = ts.out('normal');
      let last = ts.last();
      if (last) {
        let punct = last.endPunctuation();
        if (punct === '.' || punct === '!' || punct === '?') {
          str += punct;
        }
      }
      return str;
    }).join(' ');
  },
  /** output where in the original output string they are*/
  offsets: (r) => {
    return offset(r);
  },
  grid: (r) => {
    return r.list.reduce((str, ts) => {
      str += ts.out('grid');
      return str;
    }, '');
  },
  color: (r) => {
    return r.list.reduce((str, ts) => {
      str += ts.out('color');
      return str;
    }, '');
  },
  array: (r) => {
    return r.list.reduce((arr, ts) => {
      arr.push(ts.out('normal'));
      return arr;
    }, []);
  },
  json: (r) => {
    return r.list.reduce((arr, ts) => {
      let terms = ts.terms.map((t) => {
        return {
          text: t.text,
          normal: t.normal,
          tags: t.tag
        };
      });
      arr.push(terms);
      return arr;
    }, []);
  },
  html: (r) => {
    let html = r.list.reduce((str, ts) => {
      let sentence = ts.terms.reduce((sen, t) => {
        sen += '\n    ' + t.methods.html();
        return sen;
      }, '');
      return str += '\n  <span>' + sentence + '\n  </span>';
    }, '');
    return '<span> ' + html + '\n</span>';
  },
  terms: (r) => {
    let arr = [];
    r.list.forEach((ts) => {
      ts.terms.forEach((t) => {
        arr.push({
          text: t.text,
          normal: t.normal,
          tags: Object.keys(t.tag)
        });
      });
    });
    return arr;
  },
  debug: (r) => {
    console.log('====');
    r.list.forEach((ts) => {
      console.log('   --');
      ts.debug();
    });
    return r;
  },
  topk: (r) => {
    return topk(r);
  }
};
methods.plaintext = methods.text;
methods.normalized = methods.normal;
methods.colors = methods.color;
methods.tags = methods.terms;
methods.offset = methods.offsets;

const addMethods = (Text) => {
  Text.prototype.out = function(fn) {
    if (methods[fn]) {
      return methods[fn](this);
    }
    return methods.text(this);
  };
  Text.prototype.debug = function() {
    return methods.debug(this);
  };
  return Text;
};


module.exports = addMethods;

},{"./offset":50,"./topk":51}],50:[function(_dereq_,module,exports){
'use strict';
/** say where in the original output string they are found*/

const findOffset = (parent, term) => {
  let sum = 0;
  for(let i = 0; i < parent.list.length; i++) {
    for(let o = 0; o < parent.list[i].terms.length; o++) {
      let t = parent.list[i].terms[o];
      if (t.uid === term.uid) {
        return sum;
      } else {
        sum += t.whitespace.before.length + t._text.length + t.whitespace.after.length;
      }
    }
  }
  return null;
};

//map over all-dem-results
const allOffset = (r) => {
  let parent = r.all();
  return r.list.map((ts) => {
    return {
      text: ts.out('text'),
      normal: ts.out('normal'),
      offset: findOffset(parent, ts.terms[0]),
      length: ts.out('text').length
    };
  });
};
module.exports = allOffset;

},{}],51:[function(_dereq_,module,exports){
'use strict';
//
const topk = function (r, n) {
  //count occurance
  let count = {};
  r.list.forEach((ts) => {
    let str = ts.out('normal');
    count[str] = count[str] || 0;
    count[str] += 1;
  });
  //turn into an array
  let all = [];
  Object.keys(count).forEach((k) => {
    all.push({
      normal: k,
      count: count[k],
    });
  });
  //add percentage
  all.forEach((o) => {
    o.percent = parseFloat(((o.count / r.list.length) * 100).toFixed(2));
  });
  //sort by freq
  all = all.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    }
    return 1;
  });
  if (n) {
    all = all.splice(0, n);
  }
  return all;
};

module.exports = topk;

},{}],52:[function(_dereq_,module,exports){
'use strict';
const sorter = _dereq_('./methods');

const addMethods = (Text) => {

  const fns = {

    /**reorder result.list alphabetically */
    sort: function (method) {
      method = method.toLowerCase();
      if (!method || method === 'alpha' || method === 'alphabetical') {
        return sorter.alpha(this, Text);
      }
      if (method === 'chron' || method === 'chronological') {
        return sorter.chron(this, Text);
      }
      if (method === 'length') {
        return sorter.lengthFn(this, Text);
      }
      if (method === 'wordcount') {
        return sorter.wordCount(this, Text);
      }
      return this;
    },

    /**reverse the order of result.list */
    reverse: function () {
      this.list = this.list.reverse();
      return this;
    },

    unique: function () {
      let obj = {};
      this.list = this.list.filter((ts) => {
        let str = ts.out('root');
        if (obj[str]) {
          return false;
        }
        obj[str] = true;
        return true;
      });
      return this;
    }
  };
  //hook them into result.proto
  Object.keys(fns).forEach((k) => {
    Text.prototype[k] = fns[k];
  });
  return Text;
};

module.exports = addMethods;

},{"./methods":53}],53:[function(_dereq_,module,exports){
'use strict';

//perform sort on pre-computed values
const sortEm = function(arr) {
  arr = arr.sort((a, b) => {
    if (a.index > b.index) {
      return 1;
    }
    if (a.index === b.index) {
      return 0;
    }
    return -1;
  });
  //return ts objects
  return arr.map((o) => o.ts);
};

//alphabetical sorting of a termlist array
exports.alpha = function(r) {
  r.list.sort((a, b) => {
    //#1 performance speedup
    if (a === b) {
      return 0;
    }
    //#2 performance speedup
    if (a.terms[0] && b.terms[0]) {
      if (a.terms[0].normal > b.terms[0].normal) {
        return 1;
      }
      if (a.terms[0].normal < b.terms[0].normal) {
        return -1;
      }
    }
    //regular compare
    if (a.out('normal') > b.out('normal')) {
      return 1;
    }
    return -1;
  });
  return r;
};

//the order they were recieved (chronological~)
exports.chron = function(r) {
  //pre-compute indexes
  let tmp = r.list.map((ts) => {
    return {
      ts: ts,
      index: ts.termIndex()
    };
  });
  r.list = sortEm(tmp);
  return r;
};

//shortest matches first
exports.lengthFn = function(r) {
  //pre-compute indexes
  let tmp = r.list.map((ts) => {
    return {
      ts: ts,
      index: ts.chars()
    };
  });
  r.list = sortEm(tmp).reverse();
  return r;
};

//count the number of terms in each match
exports.wordCount = function(r) {
  //pre-compute indexes
  let tmp = r.list.map((ts) => {
    return {
      ts: ts,
      index: ts.length
    };
  });
  r.list = sortEm(tmp);
  return r;
};

},{}],54:[function(_dereq_,module,exports){
'use strict';

const splitMethods = (Text) => {

  const methods = {
    /** turn result into two seperate results */
    splitAfter: function(reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        ts.splitAfter(reg, verbose).forEach((mts) => {
          list.push(mts);
        });
      });
      this.list = list;
      return this;
    },
    /** turn result into two seperate results */
    splitBefore: function(reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        ts.splitBefore(reg, verbose).forEach((mts) => {
          list.push(mts);
        });
      });
      this.list = list;
      return this;
    },
    /** turn result into two seperate results */
    splitOn: function(reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        ts.splitOn(reg, verbose).forEach((mts) => {
          list.push(mts);
        });
      });
      this.list = list;
      return this;
    },
  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = splitMethods;

},{}],55:[function(_dereq_,module,exports){
'use strict';

const splitMethods = (Text) => {

  const methods = {

    /**tag all the terms in this result as something */
    tag: function (tag, reason) {
      this.list.forEach((ts) => {
        ts.tagAs(tag, reason, this.tagSet);
      });
      return this;
    },
    /**remove a tag in all the terms in this result (that had it) */
    unTag: function (tag, reason) {
      this.list.forEach((ts) => {
        ts.unTag(tag, reason, this.tagSet);
      });
      return this;
    },

    /** see if these terms can become this tag*/
    canBe: function (tag) {
      this.list.forEach((ts) => {
        ts.terms = ts.terms.filter((t) => {
          return t.canBe(tag, this.tagSet);
        });
      });
      return this;
    },

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = splitMethods;

},{}],56:[function(_dereq_,module,exports){
module.exports = {
  fns: _dereq_('../fns'),
  log: _dereq_('../log'),
  data: _dereq_('../data'),
  Terms: _dereq_('../terms'),
  tags: _dereq_('../tags'),
};

},{"../data":8,"../fns":40,"../log":42,"../tags":155,"../terms":175}],57:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');

class Acronyms extends Text {
  data() {
    return this.terms().list.map((ts) => {
      let t = ts.terms[0];
      let parsed = t.text.toUpperCase().replace(/\./g).split('');
      return {
        periods: parsed.join('.'),
        normal: parsed.join(''),
        text: t.text
      };
    });
  }
  static find(r, n) {
    r = r.match('#Acronym');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Acronyms;

},{"../../index":44}],58:[function(_dereq_,module,exports){
'use strict';
const Terms = _dereq_('../../paths').Terms;
const methods = _dereq_('./methods');

class Adjective extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
  }
  data() {
    const str = this.out('normal');
    return {
      comparative: methods.toComparative(str),
      superlative: methods.toSuperlative(str),
      adverbForm: methods.toAdverb(str),
      nounForm: methods.toNoun(str),
      verbForm: methods.toVerb(str),
      normal: str,
      text: this.out('text')
    };

  }
}
module.exports = Adjective;

},{"../../paths":56,"./methods":61}],59:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');
const Adjective = _dereq_('./adjective');

class Adjectives extends Text {
  data() {
    return this.list.map((ts) => {
      return ts.data();
    });
  }
  static find(r, n) {
    r = r.match('#Adjective');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    r.list = r.list.map((ts) => {
      return new Adjective(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return r;
  }
}

module.exports = Adjectives;

},{"../../index":44,"./adjective":58}],60:[function(_dereq_,module,exports){
'use strict';
//an obj of adjectives that can be converted to superlative + comparative, via the lexicon data
const data = _dereq_('../../../../data');

const convertables = {};
data.superlatives.forEach((a) => {
  convertables[a] = true;
});
data.verbConverts.forEach((a) => {
  convertables[a] = true;
});
module.exports = convertables;

},{"../../../../data":8}],61:[function(_dereq_,module,exports){
'use strict';
module.exports = {
  toNoun: _dereq_('./toNoun'),
  toSuperlative: _dereq_('./toSuperlative'),
  toComparative: _dereq_('./toComparative'),
  toAdverb: _dereq_('./toAdverb'),
  toVerb: _dereq_('./toVerb')
};

},{"./toAdverb":62,"./toComparative":63,"./toNoun":64,"./toSuperlative":65,"./toVerb":66}],62:[function(_dereq_,module,exports){
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
    'good': 'well',
    'little': 'little',
    'long': 'long',
    'low': 'low',
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

},{}],63:[function(_dereq_,module,exports){
//turn 'quick' into 'quickly'
'use strict';
const convertables = _dereq_('./convertable');

const irregulars = {
  'grey': 'greyer',
  'gray': 'grayer',
  'green': 'greener',
  'yellow': 'yellower',
  'red': 'redder',
  'good': 'better',
  'well': 'better',
  'bad': 'worse',
  'sad': 'sadder',
  'big': 'bigger'
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

const to_comparative = function(str) {
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

  if (convertables[str] !== undefined) {
    if (str.match(/e$/)) {
      return str + 'r';
    }
    return str + 'er';
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

// console.log(to_comparative('big'));

module.exports = to_comparative;

},{"./convertable":60}],64:[function(_dereq_,module,exports){
'use strict';
//convert 'cute' to 'cuteness'

const to_noun = function(w) {
  const irregulars = {
    'clean': 'cleanliness',
    'naivety': 'naivety',
    hurt: 'hurt'
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

},{}],65:[function(_dereq_,module,exports){
//turn 'quick' into 'quickest'
'use strict';
const convertables = _dereq_('./convertable');

const irregulars = {
  'nice': 'nicest',
  'late': 'latest',
  'hard': 'hardest',
  'inner': 'innermost',
  'outer': 'outermost',
  'far': 'furthest',
  'worse': 'worst',
  'bad': 'worst',
  'good': 'best',
  'big': 'biggest'
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


const to_superlative = function(str) {
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
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

  for (let i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return 'most ' + str;
    }
  }

  for (let i = 0; i < matches.length; i++) {
    if (str.match(matches[i])) {
      if (irregulars.hasOwnProperty(str)) {
        return irregulars[str];
      }
      return generic_transformation(str);
    }
  }
  return 'most ' + str;
};

// console.log(to_superlative("great"))

module.exports = to_superlative;

},{"./convertable":60}],66:[function(_dereq_,module,exports){
'use strict';
const data = _dereq_('../../../../data');
//turn an adjective like 'soft' into a verb like 'soften'

const irregulars = {
  red: 'redden',
  sad: 'sadden',
  fat: 'fatten'
};

const convertable = data.verbConverts.reduce((h, str) => {
  h[str] = true;
  return h;
}, {});


const toVerb = (str) => {
  //don't do words like 'green' -> 'greenen'
  if (!convertable[str]) {
    return str;
  }
  //irregulars
  if (irregulars[str]) {
    return irregulars[str];
  }
  if (str.match(/e$/)) {
    return str + 'n';
  }
  return str + 'en';
};
module.exports = toVerb;

},{"../../../../data":8}],67:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');
const toAdjective = _dereq_('./toAdjective');

class Adverbs extends Text {
  data() {
    return this.terms().list.map((ts) => {
      let t = ts.terms[0];
      return {
        adjectiveForm: toAdjective(t.normal),
        normal: t.normal,
        text: t.text
      };
    });
  }
  static find(r, n) {
    r = r.match('#Adverb+');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Adverbs;

},{"../../index":44,"./toAdjective":68}],68:[function(_dereq_,module,exports){
//turns 'quickly' into 'quick'
'use strict';
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

const toAdjective = function(str) {
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

// console.log(toAdjective('quickly') === 'quick')
// console.log(toAdjective('marvelously') === 'marvelous')
module.exports = toAdjective;

},{}],69:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');

class Clauses extends Text {
  static find(r, n) {
    r = r.splitAfter('#ClauseEnd');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Clauses;

},{"../../index":44}],70:[function(_dereq_,module,exports){
'use strict';

//the plumbing to turn two words into a contraction
const combine = (a, b) => {
  b.whitespace.after = a.whitespace.after;
  a.whitespace.after = '';
  b.whitespace.before = '';
  a.silent_term = a.text;
  b.silent_term = b.text;
  b.text = '';
  a.tagAs('Contraction', 'new-contraction');
  b.tagAs('Contraction', 'new-contraction');
};

const contract = function(ts) {
  if (ts.expanded === false || ts.match('#Contraction').found) {
    return ts;
  }
  //he is -> he's
  ts.match('(#Noun|#QuestionWord) is').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'s';
    ls.contracted = true;
  });
  //he did -> he'd
  ts.match('#PronNoun did').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'d';
    ls.contracted = true;
  });
  //how do -> how'd
  ts.match('#QuestionWord (did|do)').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'d';
    ls.contracted = true;
  });

  //he would -> he'd
  ts.match('#Noun (could|would)').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'d';
    ls.contracted = true;
  });
  //they are -> they're
  ts.match('(they|we|you) are').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'re';
    ls.contracted = true;
  });
  //i am -> i'm
  ts.match('i am').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'m';
    ls.contracted = true;
  });
  //they will -> they'll
  ts.match('(#Noun|#QuestionWord) will').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'ll';
    ls.contracted = true;
  });
  //they have -> they've
  ts.match('(they|we|you|i) have').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'ve';
    ls.contracted = true;
  });
  //is not -> isn't
  ts.match('(#Copula|#Modal|do) not').list.forEach((ls) => {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += 'n\'t';
    ls.contracted = true;
  });
  return ts;
};

module.exports = contract;

},{}],71:[function(_dereq_,module,exports){
'use strict';
const Terms = _dereq_('../../paths').Terms;
const contract = _dereq_('./contract');

const expand = function(ts) {
  if (ts.contracted === false) {
    return ts;
  }
  ts.terms.forEach((t) => {
    if (t.silent_term) {
      //this term also needs a space now too
      if (!t.text) {
        t.whitespace.before = ' ';
      }
      t._text = t.silent_term;
      t.normalize();
      t.silent_term = null;
      t.unTag('Contraction', 'expanded');
    }
  });
  return ts;
};

class Contraction extends Terms {
  data() {
    return {
      text: this.out('text'),
      normal: this.out('normal'),
      isContracted: !!this.contracted
    };
  }
  expand() {
    return expand(this);
  }
  contract() {
    return contract(this);
  }
}
module.exports = Contraction;

},{"../../paths":56,"./contract":70}],72:[function(_dereq_,module,exports){
'use strict';
//find contractable, expanded-contractions
const find = (r) => {
  let remain = r.not('#Contraction');
  let m = remain.match('(#Noun|#QuestionWord) (#Copula|did|do|have|had|could|would|will)');
  m.concat(remain.match('(they|we|you|i) have'));
  m.concat(remain.match('i am'));
  m.concat(remain.match('(#Copula|#Modal|do) not'));
  m.list.forEach((ts) => {
    ts.expanded = true;
  });
  return m;
};
module.exports = find;

},{}],73:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');
const Contraction = _dereq_('./contraction');
const findPossible = _dereq_('./findPossible');

class Contractions extends Text {
  data() {
    return this.list.map(ts => ts.data());
  }
  contract() {
    this.list.forEach((ts) => ts.contract());
    return this;
  }
  expand() {
    this.list.forEach((ts) => ts.expand());
    return this;
  }
  contracted() {
    this.list = this.list.filter((ts) => {
      return ts.contracted;
    });
    return this;
  }
  expanded() {
    this.list = this.list.filter((ts) => {
      return !ts.contracted;
    });
    return this;
  }
  static find(r, n) {
    //find currently-contracted
    let found = r.match('#Contraction #Contraction #Contraction?');
    found.list = found.list.map((ts) => {
      let c = new Contraction(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      c.contracted = true;
      return c;
    });
    //find currently-expanded
    let expanded = findPossible(r);
    expanded.list.forEach((ts) => {
      let c = new Contraction(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      c.contracted = false;
      found.list.push(c);
    });
    found.sort('chronological');
    //get nth element
    if (typeof n === 'number') {
      found = found.get(n);
    }
    return found;
  }
}

module.exports = Contractions;

},{"../../index":44,"./contraction":71,"./findPossible":72}],74:[function(_dereq_,module,exports){
'use strict';
const Terms = _dereq_('../../paths').Terms;
const parsePunt = _dereq_('./parsePunt');
const parseSection = _dereq_('./parseSection');
const parseRelative = _dereq_('./parseRelative');
const parseDate = _dereq_('./parseDate');

class Date extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.month = this.match('#Month');
  }

  data() {
    let obj = {};
    //parsing order matters..
    //[two days before] [the start of] [this] [thursday]
    obj.punt = parsePunt(this); //two days before
    obj.section = parseSection(this); //the start of
    obj.relative = parseRelative(this); //this
    obj.date = parseDate(this); //thursday
    return obj;
  }
}
module.exports = Date;

},{"../../paths":56,"./parseDate":78,"./parsePunt":79,"./parseRelative":80,"./parseSection":81}],75:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');
const Date = _dereq_('./date');
const weekdays = _dereq_('./weekday');
const months = _dereq_('./month');

class Dates extends Text {
  data() {
    return this.list.map((ts) => ts.data());
  }
  toShortForm() {
    this.match('#Month').terms().list.forEach((ts) => {
      let t = ts.terms[0];
      months.toShortForm(t);
    });
    this.match('#WeekDay').terms().list.forEach((ts) => {
      let t = ts.terms[0];
      weekdays.toShortForm(t);
    });
    return this;
  }
  toLongForm() {
    this.match('#Month').terms().list.forEach((ts) => {
      let t = ts.terms[0];
      months.toLongForm(t);
    });
    this.match('#WeekDay').terms().list.forEach((ts) => {
      let t = ts.terms[0];
      weekdays.toLongForm(t);
    });
    return this;
  }
  static find(r, n) {
    let dates = r.match('#Date+');
    if (typeof n === 'number') {
      dates = dates.get(n);
    }
    dates.list = dates.list.map((ts) => {
      return new Date(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return dates;
  }
}

module.exports = Dates;

},{"../../index":44,"./date":74,"./month":77,"./weekday":84}],76:[function(_dereq_,module,exports){
//follow the javascript scheme
//january is 0
exports.longMonths = {
  'january': 0,
  'february': 1,
  'march': 2,
  'april': 3,
  'may': 4,
  'june': 5,
  'july': 6,
  'august': 7,
  'september': 8,
  'october': 9,
  'november': 10,
  'december': 11,
};
exports.shortMonths = {
  'jan': 0,
  'feb': 1,
  'febr': 1,
  'mar': 2,
  'apr': 3,
  'may': 4,
  'jun': 5,
  'jul': 6,
  'aug': 7,
  'sep': 8,
  'sept': 8,
  'oct': 9,
  'nov': 10,
  'dec': 11,
};

},{}],77:[function(_dereq_,module,exports){
'use strict';
const data = _dereq_('./data');
const shortMonths = data.shortMonths;
const longMonths = data.longMonths;

module.exports = {
  index: function (t) {
    if (t.tag.Month) {
      if (longMonths[t.normal] !== undefined) {
        return longMonths[t.normal];
      }
      if (shortMonths[t.normal] !== undefined) {
        return shortMonths[t.normal];
      }
    }
    return null;
  },
  toShortForm: function (t) {
    if (t.tag.Month !== undefined) {
      if (longMonths[t.normal] !== undefined) {
        let shorten = Object.keys(shortMonths);
        t.text = shorten[longMonths[t.normal]];
      }
    }
    t.dirty = true;
    return t;
  },
  toLongForm: function (t) {
    if (t.tag.Month !== undefined) {
      if (shortMonths[t.normal] !== undefined) {
        let longer = Object.keys(longMonths);
        t.text = longer[shortMonths[t.normal]];
      }
    }
    t.dirty = true;
    return t;
  }

};

},{"./data":76}],78:[function(_dereq_,module,exports){
'use strict';
const parseTime = _dereq_('./parseTime');
const weekdays = _dereq_('./weekday');
const months = _dereq_('./month');
//
const isDate = (num) => {
  if (num && num < 31 && num > 0) {
    return true;
  }
  return false;
};

//please change in one thousand years
const isYear = (num) => {
  if (num && num > 1000 && num < 3000) {
    return true;
  }
  return false;
};

//
const parseDate = (r) => {
  let result = {
    month: null,
    date: null,
    weekday: null,
    year: null,
    knownDate: null,
    timeOfDay: null,
  };
  let m = r.match('(#Holiday|today|tomorrow|yesterday)');
  if (m.found) {
    result.knownDate = m.out('normal');
  }
  m = r.match('#Month');
  if (m.found) {
    result.month = months.index(m.list[0].terms[0]);
  }
  m = r.match('#WeekDay');
  if (m.found) {
    result.weekday = weekdays.index(m.list[0].terms[0]);
  }
  m = r.match('#Time');
  if (m.found) {
    result.timeOfDay = parseTime(r);
    r.not('#Time'); //unsure
  }

  //january fifth 1992
  m = r.match('#Month #Value #Year');
  if (m.found) {
    let numbers = m.values().numbers();
    if (isDate(numbers[0])) {
      result.date = numbers[0];
    }
    let year = parseInt(r.match('#Year').out('normal'), 10);
    if (isYear(year)) {
      result.year = year;
    }
  }
  if (!m.found) {
    //january fifth,  january 1992
    m = r.match('#Month #Value');
    if (m.found) {
      let numbers = m.values().numbers();
      let num = numbers[0];
      if (isDate(num)) {
        result.date = num;
      }
    }
    //january 1992
    m = r.match('#Month #Year');
    if (m.found) {
      let num = parseInt(r.match('#Year').out('normal'), 10);
      if (isYear(num)) {
        result.year = num;
      }
    }
  }

  //fifth of january
  m = r.match('#Value of #Month');
  if (m.found) {
    let num = m.values().numbers()[0];
    if (isDate(num)) {
      result.date = num;
    }
  }
  return result;
};
module.exports = parseDate;

},{"./month":77,"./parseTime":82,"./weekday":84}],79:[function(_dereq_,module,exports){
'use strict';
//parse '5 days before', 'three weeks after'..
const durations = {
  year: true,
  quarter: true,
  month: true,
  week: true,
  weekend: true,
  day: true,
  hour: true,
};

const parsePunt = (r) => {
  let direction = null;
  let duration = {};
  //two days after
  let m = r.match('#Value #Duration (from|after|following)');
  if (m.found) {
    direction = 'forward';
  } else {
    //two days before
    m = r.match('#Value #Duration (before)');
    if (m.found) {
      direction = 'backward';
    }
  }
  //interpret 'value + duration'
  if (m.found) {
    r.match('#Value #Duration').list.forEach((ts) => {
      let num = ts.match('*').values().data()[0] || {};
      num = num.number;
      if (num || num === 0) {
        let str = ts.match('#Duration').nouns().toSingular().out('normal');
        if (durations[str]) {
          duration[str] = num;
        }
      }
    });
  }
  return {
    direction: direction,
    duration: duration
  };
};
module.exports = parsePunt;

},{}],80:[function(_dereq_,module,exports){
'use strict';
//
const relatives = {
  this: 'this',
  next: 'next',
  last: 'last',
  upcoming: 'next',
};
const parseRelative = (r) => {
  let known = '(' + Object.keys(relatives).join('|') + ')';
  let m = r.match(`${known}+`).lastTerm();
  if (m.found) {
    let str = m.match(known).out('normal');
    return relatives[str];
  }
  return null;
};
module.exports = parseRelative;

},{}],81:[function(_dereq_,module,exports){
'use strict';
//
const sections = {
  start: 'start',
  end: 'end',
  middle: 'middle',
  beginning: 'start',
  ending: 'end',
  midpoint: 'middle',
  midst: 'middle',
};
const parseSection = (r) => {
  let known = '(' + Object.keys(sections).join('|') + ')';
  let m = r.match(`the? ${known} of`);
  if (m.found) {
    let str = m.match(known).out('normal');
    return sections[str];
  }
  return null;
};
module.exports = parseSection;

},{}],82:[function(_dereq_,module,exports){
'use strict';
//
const isHour = (num) => {
  if (num && num > 0 && num < 25) {
    return true;
  }
  return false;
};
const isMinute = (num) => {
  if (num && num > 0 && num < 60) {
    return true;
  }
  return false;
};


const parseTime = (r) => {
  let result = {
    logic: null,
    hour: null,
    minute: null,
    second: null,
    timezone: null
  };

  let logic = r.match('(by|before|for|during|at|until|after) #Time').firstTerm();
  if (logic.found) {
    result.logic = logic.out('normal');
  }

  let time = r.match('#Time');
  time.terms().list.forEach((ts) => {
    let t = ts.terms[0];
    //3pm
    let m = t.text.match(/([12]?[0-9]) ?(am|pm)/i);
    if (m) {
      result.hour = parseInt(m[1], 10);
      if (m[2] === 'pm') {
        result.hour += 12;
      }
      if (!isHour(result.hour)) {
        result.hour = null;
      }
    }
    //3:15
    m = t.text.match(/([12]?[0-9]):([0-9][0-9]) ?(am|pm)?/i);
    if (m) {
      result.hour = parseInt(m[1], 10);
      result.minute = parseInt(m[2], 10);
      if (!isMinute(result.minute)) {
        result.minute = null;
      }
      if (m[3] === 'pm') {
        result.hour += 12;
      }
      if (!isHour(result.hour)) {
        result.hour = null;
      }
    }
  });
  return result;
};
module.exports = parseTime;

},{}],83:[function(_dereq_,module,exports){
//follow the javascript scheme
//sunday is 0
exports.longDays = {
  'sunday': 0,
  'monday': 1,
  'tuesday': 2,
  'wednesday': 3,
  'thursday': 4,
  'friday': 5,
  'saturday': 6,
}
exports.shortDays = {
  'sun': 0,
  'mon': 1,
  'tues': 2,
  'wed': 3,
  'thurs': 4,
  'fri': 5,
  'sat': 6,
}

},{}],84:[function(_dereq_,module,exports){
'use strict';
const data = _dereq_('./data');
const shortDays = data.shortDays;
const longDays = data.longDays;

module.exports = {
  index: function (t) {
    if (t.tag.WeekDay) {
      if (longDays[t.normal] !== undefined) {
        return longDays[t.normal];
      }
      if (shortDays[t.normal] !== undefined) {
        return shortDays[t.normal];
      }
    }
    return null;
  },
  toShortForm: function (t) {
    if (t.tag.WeekDay) {
      if (longDays[t.normal] !== undefined) {
        let shorten = Object.keys(shortDays);
        t.text = shorten[longDays[t.normal]];
      }
    }
    return t;
  },
  toLongForm: function (t) {
    if (t.tag.WeekDay) {
      if (shortDays[t.normal] !== undefined) {
        let longer = Object.keys(longDays);
        t.text = longer[shortDays[t.normal]];
      }
    }
    return t;
  }
};

},{"./data":83}],85:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');

class HashTags extends Text {
  data() {
    return this.terms().list.map((ts) => {
      let t = ts.terms[0];
      return {
        text: t.text
      };
    });
  }
  static find(r, n) {
    r = r.match('#HashTag');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = HashTags;

},{"../../index":44}],86:[function(_dereq_,module,exports){
'use strict';
const Ngrams = _dereq_('./index');
const getGrams = _dereq_('./getGrams');

//like an n-gram, but only the endings of matches
class EndGrams extends Ngrams {

  static find(r, n, size) {
    let opts = {
      size: [1, 2, 3, 4],
      edge: 'end'
    };
    //only look for bigrams, for example
    if (size) {
      opts.size = [size];
    }
    //fetch them
    let arr = getGrams(r, opts);
    r = new EndGrams(arr);
    //default sort
    r.sort();
    //grab top one, or something
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = EndGrams;

},{"./getGrams":87,"./index":89}],87:[function(_dereq_,module,exports){
'use strict';
const Gram = _dereq_('./gram');

//do all grams of one size, on one termList
const getGrams = function(fts, n) {
  let terms = fts.terms;
  if (terms.length < n) {
    return [];
  }
  let arr = [];
  for(let i = 0; i < terms.length - n + 1; i++) {
    let gram = new Gram(terms.slice(i, i + n));
    arr.push(gram);
  }
  return arr;
};

//left-sided grams
const startGram = function(fts, n) {
  let terms = fts.terms;
  if (terms.length < n) {
    return [];
  }
  let arr = [
    new Gram(terms.slice(0, n)),
  ];
  return arr;
};

//right-sided grams
const endGram = function(fts, n) {
  let terms = fts.terms;
  if (terms.length < n) {
    return [];
  }
  let arr = [
    new Gram(terms.slice(terms.length - n, terms.length))
  ];
  return arr;
};

//ngrams are consecutive terms of a specific size
const buildGrams = function(r, options) {
  options = options || {};
  options.size = options.size || [1, 2, 3];
  if (typeof options.size === 'number') {
    options.size = [options.size];
  }
  let obj = {};
  //collect and count all grams
  options.size.forEach((size) => {
    r.list.forEach((ts) => {
      let grams = [];
      if (options.edge === 'start') {
        grams = startGram(ts, size);
      } else if (options.edge === 'end') {
        grams = endGram(ts, size);
      } else {
        grams = getGrams(ts, size);
      }
      grams.forEach((g) => {
        if (obj[g.key]) {
          obj[g.key].inc();
        } else {
          obj[g.key] = g;
        }
      });
    });
  });

  //flatten to an array
  let arr = Object.keys(obj).map((k) => obj[k]);
  return arr;
};

module.exports = buildGrams;

},{"./gram":88}],88:[function(_dereq_,module,exports){
'use strict';
const Terms = _dereq_('../../paths').Terms;

//this is one-or-more terms together, sorted by frequency
class Gram extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    //string to sort/uniq by
    this.key = this.out('normal');
    //bigram/trigram/etc
    this.size = arr.length;
    //number of occurances
    this.count = 1;
  }
  inc() {
    this.count += 1;
  }
}
module.exports = Gram;

},{"../../paths":56}],89:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');
const getGrams = _dereq_('./getGrams');

class Ngrams extends Text {
  data() {
    return this.list.map((ts) => {
      return {
        normal: ts.out('normal'),
        count: ts.count,
        size: ts.size
      };
    });
  }
  unigrams() {
    this.list = this.list.filter((g) => g.size === 1);
    return this;
  }
  bigrams() {
    this.list = this.list.filter((g) => g.size === 2);
    return this;
  }
  trigrams() {
    this.list = this.list.filter((g) => g.size === 3);
    return this;
  }

  //default sort the ngrams
  sort() {
    this.list = this.list.sort((a, b) => {
      if (a.count > b.count) {
        return -1;
      }
      //(tie-braker)
      if (a.count === b.count && (a.size > b.size || a.key.length > b.key.length)) {
        return -1;
      }
      return 1;
    });
    return this;
  }

  static find(r, n, size) {
    let opts = {
      size: [1, 2, 3, 4]
    };
    //only look for bigrams, for example
    if (size) {
      opts.size = [size];
    }
    //fetch them
    let arr = getGrams(r, opts);
    r = new Ngrams(arr);
    //default sort
    r.sort();
    //grab top one, or something
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Ngrams;

},{"../../index":44,"./getGrams":87}],90:[function(_dereq_,module,exports){
'use strict';
const Ngrams = _dereq_('./index');
const getGrams = _dereq_('./getGrams');

//like an n-gram, but only the startings of matches
class StartGrams extends Ngrams {

  static find(r, n, size) {
    let opts = {
      size: [1, 2, 3, 4],
      edge: 'start'
    };
    //only look for bigrams, for example
    if (size) {
      opts.size = [size];
    }
    //fetch them
    let arr = getGrams(r, opts);
    r = new StartGrams(arr);
    //default sort
    r.sort();
    //grab top one, or something
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = StartGrams;

},{"./getGrams":87,"./index":89}],91:[function(_dereq_,module,exports){
'use strict';
const uncountables = _dereq_('../../../data').uncountables;

//certain words can't be plural, like 'peace'
const hasPlural = function (t) {
  //end quick
  if (!t.tag.Noun) {
    return false;
  }
  if (t.tag.Plural) {
    return true;
  }
  //is it potentially plural?
  const noPlural = [
    'Pronoun',
    'Place',
    'Value',
    'Person',
    'Month',
    'WeekDay',
    'RelativeDay',
    'Holiday',
  ];
  for (let i = 0; i < noPlural.length; i++) {
    if (t.tag[noPlural[i]]) {
      return false;
    }
  }
  //terms known as un-inflectable, like 'peace'
  for (let i = 0; i < uncountables.length; i++) {
    if (t.normal === uncountables[i]) {
      return false;
    }
  }
  return true;
};

module.exports = hasPlural;

},{"../../../data":8}],92:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');
const Noun = _dereq_('./noun');

class Nouns extends Text {
  isPlural() {
    return this.list.map((ts) => ts.isPlural());
  }
  hasPlural() {
    return this.list.map((ts) => ts.hasPlural());
  }
  toPlural() {
    this.list.forEach((ts) => ts.toPlural());
    return this;
  }
  toSingular() {
    this.list.forEach((ts) => ts.toSingular());
    return this;
  }
  data() {
    return this.list.map((ts) => ts.data());
  }
  static find(r, n) {
    r = r.clauses();
    r = r.match('#Noun+');
    r = r.not('#Pronoun');
    r = r.not('(#Month|#WeekDay)'); //allow Durations, Holidays
    if (typeof n === 'number') {
      r = r.get(n);
    }
    r.list = r.list.map((ts) => {
      return new Noun(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return r;
  }
}
module.exports = Nouns;

},{"../../index":44,"./noun":100}],93:[function(_dereq_,module,exports){
'use strict';
const irregulars = _dereq_('../../../data').irregular_plurals;
const rules = _dereq_('./methods/data/indicators');

const knownPlural = {
  i: false,
  he: false,
  she: false,
  we: true,
  they: true,
};

//is it potentially plural?
const noPlural = [
  'Place',
  'Value',
  'Person',
  'Month',
  'WeekDay',
  'RelativeDay',
  'Holiday',
];
//first, try to guess based on existing tags
const couldEvenBePlural = (t) => {
  for (let i = 0; i < noPlural.length; i++) {
    if (t.tag[noPlural[i]]) {
      return false;
    }
  }
  return true;
};

const isPlural = function (t) {
  let str = t.normal;

  //whitelist a few easy ones
  if (knownPlural[str] !== undefined) {
    return knownPlural[str];
  }
  //inspect the existing tags to see if a plural is valid
  if (!couldEvenBePlural(t)) {
    return false;
  }
  //handle 'mayors of chicago'
  const preposition = str.match(/([a-z]*) (of|in|by|for) [a-z]/);
  if (preposition && preposition[1]) {
    str = preposition[1];
  }
  // if it's a known irregular case
  if (irregulars.toSingle[str]) {
    return true;
  }
  if (irregulars.toPlural[str]) {
    return false;
  }
  //check the suffix-type rules for indications
  for (let i = 0; i < rules.plural_indicators.length; i++) {
    if (str.match(rules.plural_indicators[i])) {
      return true;
    }
  }
  for (let i = 0; i < rules.singular_indicators.length; i++) {
    if (str.match(rules.singular_indicators[i])) {
      return false;
    }
  }
  // a fallback 'looks check plural' rule..
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
// console.log(is_plural('days') === true)

module.exports = isPlural;

},{"../../../data":8,"./methods/data/indicators":95}],94:[function(_dereq_,module,exports){
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
//pronounced letters of acronyms that get a 'an'
const an_acronyms = {
  a: true,
  e: true,
  f: true,
  h: true,
  i: true,
  l: true,
  m: true,
  n: true,
  o: true,
  r: true,
  s: true,
  x: true
};
//'a' regexes
const a_regexs = [
  /^onc?e/i, //'wu' sound of 'o'
  /^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
  /^eul/i
];

const makeArticle = function(t) {
  let str = t.normal;

  //explicit irregular forms
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  //spelled-out acronyms
  let firstLetter = str.substr(0, 1);
  if (t.isAcronym() && an_acronyms.hasOwnProperty(firstLetter)) {
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

module.exports = makeArticle;

},{}],95:[function(_dereq_,module,exports){
'use strict';
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
module.exports = {
  singular_indicators: singular_indicators,
  plural_indicators: plural_indicators
}

},{}],96:[function(_dereq_,module,exports){
//patterns for turning 'bus' to 'buses'
module.exports = [
  [/(ax|test)is$/i, '$1es'],
  [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i'],
  [/(octop|vir)i$/i, '$1i'],
  [/(kn|l|w)ife$/i, '$1ives'],
  [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)f$/i, '$1ves'],
  [/^(dwar|handkerchie|hoo|scar|whar)f$/i, '$1ves'],
  [/(alias|status)$/i, '$1es'],
  [/(bu)s$/i, '$1ses'],
  [/(al|ad|at|er|et|ed|ad)o$/i, '$1oes'],
  [/([ti])um$/i, '$1a'],
  [/([ti])a$/i, '$1a'],
  [/sis$/i, 'ses'],
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

},{}],97:[function(_dereq_,module,exports){
//patterns for turning 'dwarves' to 'dwarf'
module.exports = [
  [/([^v])ies$/i, '$1y'],
  [/ises$/i, 'isis'],
  [/(kn|[^o]l|w)ives$/i, '$1ife'],
  [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)ves$/i, '$1f'],
  [/^(dwar|handkerchie|hoo|scar|whar)ves$/i, '$1f'],
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

},{}],98:[function(_dereq_,module,exports){
'use strict';
const irregulars = _dereq_('../../../../data').irregular_plurals.toPlural;
const pluralRules = _dereq_('./data/pluralRules');

//turn 'shoe' into 'shoes'
const pluralize = function(str) {
  //irregular
  if (irregulars[str]) {
    return irregulars[str];
  }

  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    const first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];
    if (first) {
      const better_first = pluralize(first); //recursive
      return better_first + str.replace(first, '');
    }
  }

  //regular rule-based inflector
  for (let i = 0; i < pluralRules.length; i++) {
    if (str.match(pluralRules[i].reg)) {
      return str.replace(pluralRules[i].reg, pluralRules[i].repl);
    }
  }
  return null;
};

module.exports = pluralize;

},{"../../../../data":8,"./data/pluralRules":96}],99:[function(_dereq_,module,exports){
'use strict';
const irregulars = _dereq_('../../../../data').irregular_plurals.toSingle;
const singleRules = _dereq_('./data/singleRules');

//turn 'shoes' into 'shoe'
const toSingle = function (str) {
  //irregular
  if (irregulars[str]) {
    return irregulars[str];
  }
  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    const first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];
    if (first) {
      const better_first = toSingle(first); //recursive
      return better_first + str.replace(first, '');
    }
  }

  //regular rule-based inflector
  for (let i = 0; i < singleRules.length; i++) {
    if (str.match(singleRules[i].reg)) {
      return str.replace(singleRules[i].reg, singleRules[i].repl);
    }
  }
  return null;
};

// console.log(toSingle('gases') === 'gas')
module.exports = toSingle;
// console.log(toSingle('days'))

},{"../../../../data":8,"./data/singleRules":97}],100:[function(_dereq_,module,exports){
'use strict';
const Terms = _dereq_('../../paths').Terms;
const hasPlural = _dereq_('./hasPlural');
const isPlural = _dereq_('./isPlural');
const makeArticle = _dereq_('./makeArticle');
const pluralize = _dereq_('./methods/pluralize');
const singularize = _dereq_('./methods/singularize');

class Noun extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.t = this.terms[0];
  }
  article() {
    let t = this.t;
    return makeArticle(t);
  }
  isPlural() {
    let t = this.t;
    return isPlural(t);
  }
  hasPlural() {
    let t = this.t;
    return hasPlural(t);
  }
  toPlural() {
    let t = this.t;
    if (hasPlural(t) && !isPlural(t)) {
      t.text = pluralize(t.text);
      t.unTag('Plural', 'toPlural');
      t.tagAs('Singular', 'toPlural');
    }
    return this;
  }
  toSingular() {
    let t = this.t;
    if (isPlural(t)) {
      t.text = singularize(t.text);
      t.unTag('Plural', 'toSingular');
      t.tagAs('Singular', 'toSingular');
    }
    return this;
  }
  data() {
    return {
      article: this.article(),
      singular: this.toSingular().out('normal'),
      plural: this.toPlural().out('normal'),
    };
  }
}
module.exports = Noun;

},{"../../paths":56,"./hasPlural":91,"./isPlural":93,"./makeArticle":94,"./methods/pluralize":98,"./methods/singularize":99}],101:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');

class Organizations extends Text {
  data() {
    return this.list.map((ts) => {
      return {
        text: ts.out('text'),
        normal: ts.out('normal'),
      };
    });
  }
  static find(r, n) {
    r = r.splitAfter('#Comma');
    r = r.match('#Organization+');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Organizations;

},{"../../index":44}],102:[function(_dereq_,module,exports){
'use strict';
const log = _dereq_('../../paths').log
  // make a statistical assumption about the gender of the person based on their given name
  // used for pronoun resolution only.
  // not intended for classification, or discrimination of people.
const gender = function (firstName) {
  if (!firstName) {
    return null;
  }
  //statistical guesses
  if (firstName.match(/.(i|ee|[a|e]y|a)$/i)) { //this is almost-always true
    log.tell('Female-name suffix')
    return 'Female';
  }
  if (firstName.match(/[ou]$/i)) { //if it ends in a 'oh or uh', male
    log.tell('Male-name suffix')
    return 'Male';
  }
  if (firstName.match(/(nn|ll|tt)/i)) { //if it has double-consonants, female
    log.tell('Female-name consonant-doubling')
    return 'Female';
  }
  // name not recognized, or recognized as of indeterminate gender
  return null;
};
module.exports = gender;

},{"../../paths":56}],103:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');
const Person = _dereq_('./person');
//this is used for pronoun and honorifics, and not intented for more-than grammatical use (see #117)

class People extends Text {
  data() {
    return this.list.map((ts) => ts.data());
  }
  pronoun() {
    return this.list.map((ts) => ts.pronoun());
  }
  static find(r, n) {
    let people = r.clauses();
    people = people.match('#Person+');
    if (typeof n === 'number') {
      people = people.get(n);
    }
    people.list = people.list.map((ts) => {
      return new Person(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return people;
  }
}

module.exports = People;

},{"../../index":44,"./person":104}],104:[function(_dereq_,module,exports){
'use strict';
const Terms = _dereq_('../../paths').Terms;
const guessGender = _dereq_('./guessGender');
const log = _dereq_('../../paths').log;

class Person extends Terms {
  data() {
    return {
      text: this.out('text'),
      normal: this.out('normal'),
      firstName: this.firstName.out('normal'),
      middleName: this.middleName.out('normal'),
      lastName: this.lastName.out('normal'),
      genderGuess: this.guessGender(),
      pronoun: this.pronoun(),
      honorifics: this.honorifics.out('array')
    };
  }
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.firstName = this.match('#FirstName+');
    this.middleName = this.match('#Acronym+');
    this.honorifics = this.match('#Honorific');
    this.lastName = this.match('#LastName+');
    //assume first-last
    if (!this.firstName && this.length === 2) {
      let m = this.not('(#Acronym|#Honorific)');
      this.firstName = m.first();
      this.lastName = m.last();
    } else {
      // this.lastName = this.match('#Person').list[0];
    }
    return this;
  }
  guessGender() {
    //try known honorifics
    if (this.honorifics.match('(mr|mister|sr|sir|jr)').found) {
      log.tell('known male honorific');
      return 'Male';
    }
    if (this.honorifics.match('(mrs|miss|ms|misses|mme|mlle)').found) {
      log.tell('known female honorific');
      return 'Female';
    }
    //try known first-names
    if (this.firstName.match('#MaleName').found) {
      log.tell('known male name');
      return 'Male';
    }
    if (this.firstName.match('#FemaleName').found) {
      log.tell('known female name');
      return 'Female';
    }
    //look-for regex clues
    return guessGender(this.firstName.out('normal'));
  }
  pronoun() {
    let g = this.guessGender();
    if (g === 'Male') {
      return 'he';
    }
    if (g === 'Female') {
      return 'she';
    }
    return 'they';
  }
  root() {
    let first = this.firstName.out('root');
    let last = this.lastName.out('root');
    if (first && last) {
      return first + ' ' + last;
    }
    return last || first || this.out('root');
  }
}
module.exports = Person;

},{"../../paths":56,"./guessGender":102}],105:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');

class PhoneNumbers extends Text {
  data() {
    return this.terms().list.map((ts) => {
      let t = ts.terms[0];
      return {
        text: t.text
      };
    });
  }
  static find(r) {
    r = r.splitAfter('#Comma');
    r = r.match('#PhoneNumber+');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = PhoneNumbers;

},{"../../index":44}],106:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');
const Place = _dereq_('./place');

class Places extends Text {
  data() {
    return this.list.map((ts) => {
      return {
        text: ts.out('text'),
        normal: ts.out('normal'),
      };
    });
  }
  static find(r, n) {
    r = r.splitAfter('#Comma');
    r = r.match('#Place+');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    r.list = r.list.map((ts) => {
      return new Place(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return r;
  }
}

module.exports = Places;

},{"../../index":44,"./place":107}],107:[function(_dereq_,module,exports){
'use strict';
const Terms = _dereq_('../../paths').Terms;

class Place extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.city = this.match('#City');
    this.country = this.match('#Country');
  }
  get isA() {
    return 'Place';
  }
  root() {
    return this.city.out('root');
  }
}
module.exports = Place;

},{"../../paths":56}],108:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');

class Quotations extends Text {
  data() {
    return this.list.map((t) => {
      return {
        text: t.out(),
        normal: t.out('normal'),
      };
    });
  }
  static find(r, n) {
    r = r.match('#Quotation+');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Quotations;

},{"../../index":44}],109:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');
const Sentence = _dereq_('./sentence');

class Sentences extends Text {
  constructor(arr, lexicon, reference) {
    super(arr, lexicon, reference);
  }
  data() {
    return this.list.map((ts) => {
      return ts.data();
    });
  }
  /** conjugate the main/first verb*/
  toPastTense() {
    this.list = this.list.map((ts) => {
      ts = ts.toPastTense();
      return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return this;
  }
  toPresentTense() {
    this.list = this.list.map((ts) => {
      ts = ts.toPresentTense();
      return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return this;
  }
  toFutureTense() {
    this.list = this.list.map((ts) => {
      ts = ts.toFutureTense();
      return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return this;
  }
  /** negative/positive */
  toNegative() {
    this.list = this.list.map((ts) => {
      ts = ts.toNegative();
      return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return this;
  }
  toPositive() {
    this.list = this.list.map((ts) => {
      ts = ts.toPositive();
      return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return this;
  }

  /** look for 'was _ by' patterns */
  isPassive() {
    this.list = this.list.filter((ts) => {
      return ts.isPassive();
    });
    return this;
  }
  /** add a word to the start */
  prepend(str) {
    this.list = this.list.map((ts) => {
      return ts.prepend(str);
    });
    return this;
  }
  /** add a word to the end */
  append(str) {
    this.list = this.list.map((ts) => {
      return ts.append(str);
    });
    return this;
  }

  /** convert between question/statement/exclamation*/
  toExclamation() {
    this.list.forEach((ts) => {
      ts.setPunctuation('!');
    });
    return this;
  }
  toQuestion() {
    this.list.forEach((ts) => {
      ts.setPunctuation('?');
    });
    return this;
  }
  toStatement() {
    this.list.forEach((ts) => {
      ts.setPunctuation('.');
    });
    return this;
  }
  static find(r, n) {
    r = r.all();
    if (typeof n === 'number') {
      r = r.get(n);
    }
    r.list = r.list.map((ts) => {
      return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    // return new Text(r.list, r.lexicon, r.reference);
    return r;
  }
}

module.exports = Sentences;

},{"../../index":44,"./sentence":111}],110:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../index');

class Questions extends Text {
  static find(r, n) {
    r = r.all();
    if (typeof n === 'number') {
      r = r.get(n);
    }
    let list = r.list.filter((ts) => {
      return ts.last().endPunctuation() === '?';
    });
    return new Text(list, this.lexicon, this.parent);
  }
}

module.exports = Questions;

},{"../index":109}],111:[function(_dereq_,module,exports){
'use strict';
const Terms = _dereq_('../../paths').Terms;
const toNegative = _dereq_('./toNegative');
const Verb = _dereq_('../verbs/verb');
const insert = _dereq_('./smartInsert');

class Sentence extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
  }
  data() {
    return {
      text: this.out('text'),
      normal: this.out('normal')
    };
  }
  /** inflect the main/first noun*/
  toSingular() {
    let nouns = this.match('#Noun').match('!#Pronoun').firstTerm();
    nouns.things().toSingular();
    return this;
  }
  toPlural() {
    let nouns = this.match('#Noun').match('!#Pronoun').firstTerm();
    nouns.things().toPlural();
    return this;
  }

  //returns a Term object
  mainVerb() {
    let terms = this.match('(#Adverb|#Auxillary|#Verb|#Negative|#Particle)+').if('#Verb'); //this should be (much) smarter
    if (terms.found) {
      terms = terms.list[0].terms;
      return new Verb(terms, this.lexicon, this.refText, this.refTerms);
    }
    return null;
  }

  /** sentence tense conversion**/
  toPastTense() {
    let verb = this.mainVerb();
    if (verb) {
      //this is really ugly..
      let start = verb.out('normal');
      verb.toPastTense();
      // console.log(verb.parentTerms.out() + '!');
      let end = verb.out('normal');
      let r = this.parentTerms.replace(start, end);
      return r;
    }
    return this;
  }
  toPresentTense() {
    let verb = this.mainVerb();
    if (verb) {
      let start = verb.out('normal');
      verb.toPresentTense();
      let end = verb.out('normal');
      return this.parentTerms.replace(start, end);
    }
    return this;
  }
  toFutureTense() {
    let verb = this.mainVerb();
    if (verb) {
      let start = verb.out('normal');
      verb.toFutureTense();
      let end = verb.out('normal');
      return this.parentTerms.replace(start, end);
    }
    return this;
  }

  /** negation **/
  isNegative() {
    return this.match('#Negative').list.length === 1;
  }
  /** negate the main/first copula*/
  toNegative() {
    if (this.isNegative()) {
      return this;
    }
    return toNegative(this);
  }
  toPositive() {
    this.match('#Negative').first().delete();
    return this;
  }
  append(str) {
    return insert.append(this, str);
  }
  prepend(str) {
    return insert.prepend(this, str);
  }

  setPunctuation(punct) {
    let last = this.terms[this.terms.length - 1];
    last.setPunctuation(punct);
  }
  getPunctuation() {
    let last = this.terms[this.terms.length - 1];
    return last.getPunctuation();
  }
  /** look for 'was _ by' patterns */
  isPassive() {
    //haha
    return this.match('was #Adverb? #PastTense #Adverb? by').found;
  }
}
module.exports = Sentence;

},{"../../paths":56,"../verbs/verb":151,"./smartInsert":112,"./toNegative":114}],112:[function(_dereq_,module,exports){
'use strict';

//sticking words at the start sentence-sensitive
const prepend = (ts, str) => {
  let firstTerm = ts.terms[0];
  ts.insertAt(0, str);
  //handle titlecase of first-word
  if (firstTerm.text.match(/^[A-Z]/)) {
    //is it titlecased because it should be?
    if (firstTerm.needsTitleCase() === false) {
      firstTerm.toLowerCase();
    }
    let newTerm = ts.terms[0];
    newTerm.toTitleCase();
  }
  return ts;
};

//sticking words on end sentence-sensitive
const append = (ts, str) => {
  let endTerm = ts.terms[ts.terms.length - 1];
  //move the sentence punctuation to the end
  let punct = endTerm.endPunctuation();
  if (punct) {
    endTerm.killPunctuation();
  }
  ts.insertAt(ts.terms.length, str);
  let newTerm = ts.terms[ts.terms.length - 1];
  if (punct) {
    newTerm.text += punct;
  }
  //move over sentence-ending whitespace too
  if (endTerm.whitespace.after) {
    newTerm.whitespace.after = endTerm.whitespace.after;
    endTerm.whitespace.after = '';
  }
  return ts;
};

module.exports = {
  append: append,
  prepend: prepend
};

},{}],113:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../index');

class Statements extends Text {
  static find(r, n) {
    r = r.all();
    if (typeof n === 'number') {
      r = r.get(n);
    }
    let list = r.list.filter((ts) => {
      return ts.last().endPunctuation() !== '?';
    });
    return new Text(list, this.lexicon, this.parent);
  }
}

module.exports = Statements;

},{"../index":109}],114:[function(_dereq_,module,exports){
'use strict';

//these terms are nicer ways to negate a sentence
//ie. john always walks -> john always doesn't walk
const logicalNegate = {
  'everyone': 'no one',
  'everybody': 'nobody',
  'someone': 'no one',
  'somebody': 'nobody',
  // everything:"nothing",
  'always': 'never'
};

//different rule for i/we/they/you + infinitive
//that is, 'i walk' -> 'i don\'t walk', not 'I not walk'
const toNegative = (ts) => {
  let lg = ts.match('(everyone|everybody|someone|somebody|always)').first();
  if (lg.found && logicalNegate[lg.out('normal')]) {
    let found = lg.out('normal');
    // ts = ts.replace(found, logicalNegate[found]);
    ts = ts.match(found).replaceWith(logicalNegate[found]).list[0];
    return ts.parentTerms;
  }
  //negate the main verb of the sentence
  let vb = ts.mainVerb();
  if (vb) {
    vb.toNegative();
  }
  return ts;
};
module.exports = toNegative;

},{}],115:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');
const Term = _dereq_('./term');

class Terms extends Text {
  data() {
    return this.list.map((ts) => {
      return ts.data();
    });
  }

  static find(r, n) {
    r = r.match('.');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    r.list = r.list.map((ts) => {
      return new Term(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return r;
  }
}

module.exports = Terms;

},{"../../index":44,"./term":116}],116:[function(_dereq_,module,exports){
'use strict';
const Terms = _dereq_('../../paths').Terms;
const tagList = _dereq_('../../paths').tags;
const boringTags = {
  Auxillary: true
};

class Term extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.t = this.terms[0];
  }
  bestTag() {
    let tags = Object.keys(this.t.tag);
    tags = tags.sort(); //alphabetical, first
    //then sort by #of parent tags
    tags = tags.sort((a, b) => {
      //bury the tags we dont want
      if (boringTags[b] || !tagList[a] || !tagList[b]) {
        return -1;
      }
      if (tagList[a].parents.length > tagList[b].parents.length) {
        return -1;
      }
      return 1;
    });
    return tags[0];
  }
  data() {
    let t = this.t;
    return {
      spaceBefore: t.whitespace.before,
      text: t.text,
      spaceAfter: t.whitespace.after,
      normal: t.normal,
      implicit: t.silent_term,
      bestTag: this.bestTag(),
      tags: Object.keys(t.tag),
    };
  }
}
module.exports = Term;

},{"../../paths":56}],117:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');
// const Noun = require('./noun');

class Things extends Text {
  data() {
    return this.list.map((ts) => {
      return ts.data();
    });
  }
  static find(r, n) {
    r = r.clauses();
    //find people/places/organizations
    let yup = r.people();
    yup.concat(r.places());
    yup.concat(r.organizations());
    //return them to normal ordering
    yup.sort('chronological');
    // yup.unique() //? not sure
    if (typeof n === 'number') {
      yup = yup.get(n);
    }
    return yup;
  }
}

module.exports = Things;

},{"../../index":44}],118:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');

class Urls extends Text {
  data() {
    return this.terms().list.map((ts) => {
      let t = ts.terms[0];
      return {
        text: t.text
      };
    });
  }
  static find(r, n) {
    r = r.match('#Url');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Urls;

},{"../../index":44}],119:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');
const Value = _dereq_('./value');

class Values extends Text {
  data() {
    return this.list.map((ts) => {
      return ts.data();
    });
  }
  noDates() {
    return this.not('#Date');
  }
  /** five -> 5 */
  numbers() {
    return this.list.map((ts) => {
      return ts.number();
    });
  }
  /** five -> '5' */
  toNumber() {
    this.list = this.list.map((ts) => {
      return ts.toNumber();
    });
    return this;
  }
  /**5 -> 'five' */
  toTextValue() {
    this.list = this.list.map((ts) => {
      return ts.toTextValue();
    });
    return this;
  }
  /**5th -> 5 */
  toCardinal() {
    this.list = this.list.map((ts) => {
      return ts.toCardinal();
    });
    return this;
  }
  /**5 -> 5th */
  toOrdinal() {
    this.list = this.list.map((ts) => {
      return ts.toOrdinal();
    });
    return this;
  }
  /**5900 -> 5,900 */
  toNiceNumber() {
    this.list = this.list.map((ts) => {
      return ts.toNiceNumber();
    });
    return this;
  }
  static find(r, n) {
    r = r.match('#Value+');
    // r = r.match('#Value+ #Unit?');

    //june 21st 1992 is two seperate values
    r.splitOn('#Year');
    // r.debug();
    if (typeof n === 'number') {
      r = r.get(n);
    }
    r.list = r.list.map((ts) => {
      return new Value(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return r;
  }
}
Values.prototype.clone = function() {
  let list = this.list.map((ts) => {
    return ts.clone();
  });
  return new Values(list, this.lexicon);
};
module.exports = Values;

},{"../../index":44,"./value":131}],120:[function(_dereq_,module,exports){
'use strict';
const toNumber = _dereq_('../toNumber');

//turn a number like 5 into an ordinal like 5th
const numOrdinal = function(ts) {
  let num = toNumber(ts);
  if (!num && num !== 0) {
    return null;
  }
  //the teens are all 'th'
  let tens = num % 100;
  if (tens > 10 && tens < 20) {
    return '' + num + 'th';
  }
  //the rest of 'em
  const mapping = {
    0: 'th',
    1: 'st',
    2: 'nd',
    3: 'rd'
  };
  let str = '' + num;
  let last = str.slice(str.length - 1, str.length);
  if (mapping[last]) {
    str += mapping[last];
  } else {
    str += 'th';
  }
  return str;
};

module.exports = numOrdinal;

},{"../toNumber":126}],121:[function(_dereq_,module,exports){
module.exports = _dereq_('../../paths');

},{"../../paths":56}],122:[function(_dereq_,module,exports){
'use strict';
const toNumber = _dereq_('../toNumber');
const toText = _dereq_('../toText');
const ordinalWord = _dereq_('../../../paths').data.ordinalMap.toOrdinal;
//
const textOrdinal = (ts) => {
  let num = toNumber(ts);
  let words = toText(num);
  //convert the last number to an ordinal
  let last = words[words.length - 1];
  words[words.length - 1] = ordinalWord[last] || last;
  return words.join(' ');
};

module.exports = textOrdinal;

},{"../../../paths":56,"../toNumber":126,"../toText":130}],123:[function(_dereq_,module,exports){
'use strict';

const niceNumber = function (num) {
  if (!num && num !== 0) {
    return null;
  }
  num = '' + num;
  let x = num.split('.');
  let x1 = x[0];
  let x2 = x.length > 1 ? '.' + x[1] : '';
  let rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
};
module.exports = niceNumber;

},{}],124:[function(_dereq_,module,exports){
const p = _dereq_('../paths');
const numbers = p.data.numbers;

//setup number-word data
const ones = Object.assign({}, numbers.ordinal.ones, numbers.cardinal.ones);
const teens = Object.assign({}, numbers.ordinal.teens, numbers.cardinal.teens);
const tens = Object.assign({}, numbers.ordinal.tens, numbers.cardinal.tens);
const multiples = Object.assign({}, numbers.ordinal.multiples, numbers.cardinal.multiples);

module.exports = {
  ones: ones,
  teens: teens,
  tens: tens,
  multiples: multiples
};

},{"../paths":121}],125:[function(_dereq_,module,exports){
'use strict';

//support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
const findModifiers = (str) => {
  const mults = [{
    reg: /^(minus|negative)[\s\-]/i,
    mult: -1
  }, {
    reg: /^(a\s)?half[\s\-](of\s)?/i,
    mult: 0.5
  },
  //  {
  //   reg: /^(a\s)?quarter[\s\-]/i,
  //   mult: 0.25
  // }
  ];
  for (let i = 0; i < mults.length; i++) {
    if (str.match(mults[i].reg)) {
      return {
        amount: mults[i].mult,
        str: str.replace(mults[i].reg, '')
      };
    }
  }
  return {
    amount: 1,
    str: str
  };
};

module.exports = findModifiers;

},{}],126:[function(_dereq_,module,exports){
'use strict';
const parseNumeric = _dereq_('./parseNumeric');
const findModifiers = _dereq_('./findModifiers');
const words = _dereq_('./data');
const isValid = _dereq_('./validate');
const parseDecimals = _dereq_('./parseDecimals');
const log = _dereq_('../paths').log;
const path = 'parseNumber';

//some numbers we know
const casualForms = {
  // 'a few': 3,
  'a couple': 2,
  'a dozen': 12,
  'two dozen': 24,
  'zero': 0,
};

// a 'section' is something like 'fifty-nine thousand'
// turn a section into something we can add to - like 59000
const section_sum = (obj) => {
  // console.log(obj);
  return Object.keys(obj).reduce((sum, k) => {
    sum += obj[k];
    return sum;
  }, 0);
};

const alreadyNumber = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    if (!ts.terms[i].tag.NumericValue) {
      return false;
    }
  }
  return true;
};

//turn a string into a number
const parse = function(ts) {
  log.here('parseNumber', path);
  let str = ts.out('normal');
  //convert some known-numbers
  if (casualForms[str] !== undefined) {
    return casualForms[str];
  }
  //'a/an' is 1
  if (str === 'a' || str === 'an') {
    return 1;
  }
  //handle a string of mostly numbers
  if (alreadyNumber(ts)) {
    return parseNumeric(ts.out('normal'));
  }
  let modifier = findModifiers(str);
  str = modifier.str;
  let last_mult = null;
  let has = {};
  let sum = 0;
  let isNegative = false;
  let terms = str.split(/[ -]/);
  // console.log(terms);
  for (let i = 0; i < terms.length; i++) {
    let w = terms[i];
    // console.log(i + '  - ' + w);
    if (!w || w === 'and') {
      continue;
    }
    if (w === '-' || w === 'negative') {
      isNegative = true;
      continue;
    }
    if (w.startsWith('-')) {
      isNegative = true;
      w = w.substr(1);
    }
    //decimal mode
    if (w === 'point') {
      sum += section_sum(has);
      sum += parseDecimals(terms.slice(i + 1, terms.length));
      sum *= modifier.amount;
      return sum;
    }
    //improper fraction
    const improperFractionMatch = w.match(/^([0-9,\. ]+)\/([0-9,\. ]+)$/);
    if (improperFractionMatch) {
      log.here('fractionMath', path);
      const num = parseFloat(improperFractionMatch[1].replace(/[, ]/g, ''));
      const denom = parseFloat(improperFractionMatch[2].replace(/[, ]/g, ''));
      if (denom) {
        sum += (num / denom) || 0;
      }
      continue;
    }
    //prevent mismatched units, like 'seven eleven'
    if (!isValid(w, has)) {
      log.tell('invalid state', path);
      log.tell(has, path);
      return null;
    }
    //buildup section, collect 'has' values
    if (w.match(/^[0-9\.]+$/)) {
      has['ones'] = parseFloat(w, 10); //not technically right
    } else if (words.ones[w]) {
      has['ones'] = words.ones[w];
    } else if (words.teens[w]) {
      has['teens'] = words.teens[w];
    } else if (words.tens[w]) {
      has['tens'] = words.tens[w];
    } else if (words.multiples[w]) {
      let mult = words.multiples[w];
      //something has gone wrong : 'two hundred five hundred'
      if (mult === last_mult) {
        log.tell('invalid multiplier', path);
        return null;
      }
      //support 'hundred thousand'
      //this one is tricky..
      if (mult === 100 && terms[i + 1]) {
        // has['hundreds']=
        var w2 = terms[i + 1];
        if (words.multiples[w2]) {
          mult *= words.multiples[w2]; //hundredThousand/hundredMillion
          i += 1;
        }
      }
      //natural order of things
      //five thousand, one hundred..
      if (last_mult === null || mult < last_mult) {
        sum += (section_sum(has) || 1) * mult;
        last_mult = mult;
        has = {};
      } else {
        //maybe hundred .. thousand
        sum += section_sum(has);
        last_mult = mult;
        sum = (sum || 1) * mult;
        has = {};
      }
    }
  // console.log(w + '=-------');
  // console.log(has);
  }
  //dump the remaining has values
  sum += section_sum(has);
  //post-process add modifier
  sum *= modifier.amount;
  sum *= isNegative ? -1 : 1;
  //dont return 0, if it went straight-through
  if (sum === 0) {
    return null;
  }
  return sum;
};

module.exports = parse;

},{"../paths":121,"./data":124,"./findModifiers":125,"./parseDecimals":127,"./parseNumeric":128,"./validate":129}],127:[function(_dereq_,module,exports){
'use strict';
const words = _dereq_('./data');

//concatenate into a string with leading '0.'
const parseDecimals = function(arr) {
  let str = '0.';
  for (let i = 0; i < arr.length; i++) {
    let w = arr[i];
    if (words.ones[w]) {
      str += words.ones[w];
    } else if (words.teens[w]) {
      str += words.teens[w];
    } else if (words.tens[w]) {
      str += words.tens[w];
    } else if (w.match(/^[0-9]$/)) {
      str += w;
    } else {
      return 0;
    }
  }
  return parseFloat(str);
};

module.exports = parseDecimals;

},{"./data":124}],128:[function(_dereq_,module,exports){
'use strict';
//parse a string like "4,200.1" into Number 4200.1
const parseNumeric = (str) => {
  //remove ordinal - 'th/rd'
  str = str.replace(/1st$/, '1');
  str = str.replace(/2nd$/, '2');
  str = str.replace(/3rd$/, '3');
  str = str.replace(/([4567890])r?th$/, '$1');
  //remove prefixes
  str = str.replace(/^[$€¥£¢]/, '');
  //remove suffixes
  str = str.replace(/[%$€¥£¢]$/, '');
  //remove commas
  str = str.replace(/,/g, '');
  //split '5kg' from '5'
  str = str.replace(/([0-9])([a-z]{1,2})$/, '$1');
  return parseFloat(str);
};

module.exports = parseNumeric;

},{}],129:[function(_dereq_,module,exports){
'use strict';
const words = _dereq_('./data');

//prevent things like 'fifteen ten', and 'five sixty'
const isValid = (w, has) => {
  if (words.ones[w]) {
    if (has.ones || has.teens) {
      return false;
    }
  } else if (words.teens[w]) {
    if (has.ones || has.teens || has.tens) {
      return false;
    }
  } else if (words.tens[w]) {
    if (has.ones || has.teens || has.tens) {
      return false;
    }
  }
  return true;
};
module.exports = isValid;

},{"./data":124}],130:[function(_dereq_,module,exports){
'use strict';
// turns an integer/float into a textual number, like 'fifty-five'

//turn number into an array of magnitudes, like [[5, million], [2, hundred]]
const breakdown_magnitudes = function(num) {
  let working = num;
  let have = [];
  const sequence = [
    [1000000000, 'million'],
    [100000000, 'hundred million'],
    [1000000, 'million'],
    [100000, 'hundred thousand'],
    [1000, 'thousand'],
    [100, 'hundred'],
    [1, 'one']
  ];
  sequence.forEach((a) => {
    if (num > a[0]) {
      let howmany = Math.floor(working / a[0]);
      working -= howmany * a[0];
      if (howmany) {
        have.push({
          unit: a[1],
          count: howmany
        });
      }
    }
  });
  return have;
};

//turn numbers from 100-0 into their text
const breakdown_hundred = function(num) {
  const tens_mapping = [
    ['ninety', 90],
    ['eighty', 80],
    ['seventy', 70],
    ['sixty', 60],
    ['fifty', 50],
    ['forty', 40],
    ['thirty', 30],
    ['twenty', 20]
  ];
  const ones_mapping = [
    '',
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
    'nineteen'
  ];
  let arr = []
  for (let i = 0; i < tens_mapping.length; i++) {
    if (num >= tens_mapping[i][1]) {
      num -= tens_mapping[i][1];
      arr.push(tens_mapping[i][0])
    }
  }
  //(hopefully) we should only have 20-0 now
  if (ones_mapping[num]) {
    arr.push(ones_mapping[num])
  }
  return arr
};

/** print-out 'point eight nine'*/
const handle_decimal = (num) => {
  const names = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'
  ]
  let arr = []
  //parse it out like a string, because js math is such shit
  let decimal = ('' + num).match(/\.([0-9]+)/)
  if (!decimal || !decimal[0]) {
    return arr
  }
  arr.push('point')
  let decimals = decimal[0].split('')
  for (let i = 0; i < decimals.length; i++) {
    arr.push(names[decimals[i]])
  }
  return arr
}

/** turns an integer into a textual number */
const to_text = function(num) {
  let arr = []
  //handle negative numbers
  if (num < 0) {
    arr.push('negative')
    num = Math.abs(num);
  }
  //break-down into units, counts
  let units = breakdown_magnitudes(num);
  //build-up the string from its components
  for (let i = 0; i < units.length; i++) {
    let unit_name = units[i].unit;
    if (unit_name === 'one') {
      unit_name = '';
      //put an 'and' in here
      if (arr.length > 1) {
        arr.push('and')
      }
    }
    arr = arr.concat(breakdown_hundred(units[i].count))
    arr.push(unit_name)
  }
  //also support decimals - 'point eight'
  arr = arr.concat(handle_decimal(num))
  //remove empties
  arr = arr.filter((s) => s)
  if (arr.length === 0) {
    arr[0] = 'zero'
  }
  return arr
};

module.exports = to_text;

// console.log(to_text(-1000.8));

},{}],131:[function(_dereq_,module,exports){
'use strict';
const paths = _dereq_('../../paths');
const Terms = paths.Terms;
const parse = _dereq_('./toNumber');
const toText = _dereq_('./toText');
const toNiceNumber = _dereq_('./toNiceNumber');
const numOrdinal = _dereq_('./numOrdinal');
const textOrdinal = _dereq_('./textOrdinal');

const isOrdinal = (ts) => {
  let t = ts.terms[ts.terms.length - 1];
  if (!t) {
    return false;
  }
  return t.tag.Ordinal === true;
};
const isText = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    if (ts.terms[i].tag.TextValue) {
      return true;
    }
  }
  return false;
};
const isNumber = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (t.tag.TextValue || t.tag.NiceNumber || !t.tag.NumericValue) {
      return false;
    }
  }
  return true;
};

class Value extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.val = this.match('#Value+').list[0];
    this.unit = this.match('#Unit$').list[0];
  }
  number() {
    let num = parse(this.val);
    return num;
  }
  /** five -> '5' */
  toNumber() {
    let val = this.val;
    // this.debug();
    //is already
    if (isNumber(val)) {
      return this;
    }
    //otherwise,
    if (isOrdinal(val)) {
      let num = numOrdinal(val);
      this.replaceWith(num, 'Value');
    } else {
      let num = parse(val);
      // console.log(num);
      if (num !== null) {
        this.replaceWith('' + num, 'Value');
      }
    }
    return this;
  }
  /**5 -> 'five' */
  toTextValue() {
    let val = this.val;
    //is already
    if (isText(val)) {
      return this;
    }
    //otherwise, parse it
    if (isOrdinal(val)) {
      let str = textOrdinal(val);
      return this.replaceWith(str, 'Value');
    }
    let num = '' + parse(val);
    let str = toText(num).join(' ');
    this.replaceWith(str, 'Value');
    return this;
  }

  /**5th -> 5 */
  toCardinal() {
    let val = this.val;
    //already
    if (!isOrdinal(val)) {
      return this;
    }
    //otherwise,
    if (isText(val)) {
      let num = '' + parse(val);
      let str = toText(num).join(' ');
      return this.replaceWith(str, 'Value');
    }
    let num = '' + parse(val);
    return this.replaceWith(num, 'Value');
  }

  /**5 -> 5th */
  toOrdinal() {
    let val = this.val;
    //already
    if (isOrdinal(val)) {
      return this;
    }
    //otherwise,
    if (isText(val)) {
      let str = textOrdinal(val);
      this.replaceWith(str, 'Value');
    } else {
      //number-ordinal
      let str = numOrdinal(val);
      this.replaceWith(str, 'Value');
    }
    return this;
  }

  /**5900 -> 5,900 */
  toNiceNumber() {
    let num = parse(this);
    let str = toNiceNumber(num);
    this.replaceWith(str, 'Value');
    return this;
  }

  data() {
    let numV = this.clone().toNumber();
    let txtV = this.clone().toTextValue();
    let obj = {
      NumericValue: {
        cardinal: numV.toCardinal().out('text'),
        ordinal: numV.toOrdinal().out('text'),
        nicenumber: this.toNiceNumber().out('text'),
      },
      TextValue : {
        cardinal: txtV.toCardinal().out('text'),
        ordinal: txtV.toOrdinal().out('text'),
      },
      unit: ''
    };
    if (this.unit) {
      obj.unit = this.unit.out('text');
    }
    obj.number = this.number();
    return obj;
  }
}
Value.prototype.clone = function() {
  let terms = this.terms.map((t) => {
    return t.clone();
  });
  return new Value(terms, this.lexicon, this.refText, this.refTerms);
};
module.exports = Value;

},{"../../paths":56,"./numOrdinal":120,"./textOrdinal":122,"./toNiceNumber":123,"./toNumber":126,"./toText":130}],132:[function(_dereq_,module,exports){
'use strict';
const Text = _dereq_('../../index');
const Verb = _dereq_('./verb');

class Verbs extends Text {
  constructor(arr, lexicon, reference) {
    super(arr, lexicon, reference);
  }
  data() {
    return this.list.map((ts) => {
      return ts.data();
    });
  }
  conjugation(verbose) {
    return this.list.map((ts) => {
      return ts.conjugation(verbose);
    });
  }
  conjugate(verbose) {
    return this.list.map((ts) => {
      return ts.conjugate(verbose);
    });
  }

  /** plural/singular **/
  isPlural() {
    this.list = this.list.filter((ts) => {
      return ts.isPlural();
    });
    return this;
  }
  isSingular() {
    this.list = this.list.filter((ts) => {
      return !ts.isPlural();
    });
    return this;
  }

  /** negation **/
  isNegative() {
    this.list = this.list.filter((ts) => {
      return ts.isNegative();
    });
    return this;
  }
  isPositive() {
    this.list = this.list.filter((ts) => {
      return !ts.isNegative();
    });
    return this;
  }
  toNegative() {
    this.list = this.list.map((ts) => {
      return ts.toNegative();
    });
    return this;
  }
  toPositive() {
    this.list.forEach((ts) => {
      ts.toPositive();
    });
    return this;
  }

  /** tense **/
  toPastTense() {
    this.list.forEach((ts) => {
      ts.toPastTense();
    });
    return this;
  }
  toPresentTense() {
    this.list.forEach((ts) => {
      ts.toPresentTense();
    });
    return this;
  }
  toFutureTense() {
    this.list.forEach((ts) => {
      ts.toFutureTense();
    });
    return this;
  }
  toInfinitive() {
    this.list.forEach((ts) => {
      ts.toInfinitive();
    });
    return this;
  }
  asAdjective() {
    return this.list.map((ts) => ts.asAdjective());
  }

  static find(r, n) {
    r = r.match('(#Adverb|#Auxillary|#Verb|#Negative|#Particle)+').if('#Verb'); //this should be (much) smarter
    r = r.splitAfter('#Comma');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    r.list = r.list.map((ts) => {
      return new Verb(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return new Text(r.list, this.lexicon, this.parent);
  }
}


module.exports = Verbs;

},{"../../index":44,"./verb":151}],133:[function(_dereq_,module,exports){
'use strict';
const predict = _dereq_('./methods/predict');

//'walking' - aka progressive
const isContinuous = function(ts) {
  return ts.match('#Gerund').found;
};

//will not walk
const isNegative = function(ts) {
  let negs = ts.match('#Negative').list;
  if (negs.length === 2) {
    return false;
  }
  if (negs.length === 1) {
    return true;
  }
  return false;
};

//been walked by..
const isPassive = function(ts) {
  if (ts.match('is being #PastTense').found) {
    return true;
  }
  if (ts.match('(had|has) been #PastTense').found) {
    return true;
  }
  if (ts.match('will have been #PastTense').found) {
    return true;
  }
  return false;
};

//had walked
const isPerfect = function(ts) {
  if (ts.match('^(had|have) #PastTense')) {
    return true;
  }
  return false;
};

//should walk, could walk
const getModal = function(ts) {
  let modal = ts.match('#Modal');
  if (!modal.found) {
    return null;
  }
  return modal.out('normal');
};

//past/present/future
const getTense = function(ts) {
  //look at the preceding words
  if (ts.auxillary.found) {
    //'will'
    if (ts.match('will have #PastTense').found) {
      return 'Past';
    }
    if (ts.auxillary.match('will').found) {
      return 'Future';
    }
    //'was'
    if (ts.auxillary.match('was').found) {
      return 'Past';
    }
  }
  //look at the main verb tense
  if (ts.verb) {
    const tenses = {
      PastTense: 'Past',
      FutureTense: 'Future',
      FuturePerfect: 'Future',
    };
    let tense = predict(ts.verb); //yikes
    return tenses[tense] || 'Present';
  }
  return 'Present';
};

// const isImperative = function(ts) {};
// const isConditional = function(ts) {};

// detect signals in auxillary verbs
// 'will' -> future, 'have'->perfect, modals, negatives, adverbs
const interpret = (ts) => {
  let isNeg = isNegative(ts);
  // let aux = ts.auxillary.clone();
  // aux = aux.not('(#Negative|#Adverb)');
  let obj = {
    negative: isNeg,
    continuous: isContinuous(ts),
    passive: isPassive(ts),
    perfect: isPerfect(ts),
    modal: getModal(ts),
    tense: getTense(ts),
  };
  return obj;
};
module.exports = interpret;

},{"./methods/predict":145}],134:[function(_dereq_,module,exports){
'use strict';
const checkIrregulars = _dereq_('./irregulars');
const suffixPass = _dereq_('./suffixes');
const toActor = _dereq_('./toActor');
const toAdjective = _dereq_('./toAdjective');
const generic = _dereq_('./generic');
const predict = _dereq_('../predict');
const toInfinitive = _dereq_('../toInfinitive');
const toBe = _dereq_('./toBe');


//turn a verb into all it's forms
const conjugate = function(t, verbose) {

  //handle is/was/will-be specially
  if (t.normal === 'is' || t.normal === 'was' || t.normal === 'will') {
    return toBe();
  }

  //dont conjugate didn't
  if (t.tag.Contraction) {
    t.text = t.silent_term;
  }
  let all = {
    PastTense: null,
    PresentTense: null,
    // FutureTense: null,
    Infinitive: null,
    Gerund: null,
    Actor: null,
  // PerfectTense: null,
  // Pluperfect: null,
  };
  //first, get its current form
  let form = predict(t);
  if (form) {
    all[form] = t.normal;
  }
  if (form !== 'Infinitive') {
    all['Infinitive'] = toInfinitive(t, verbose) || '';
  }
  //check irregular forms
  const irregObj = checkIrregulars(all['Infinitive']) || {};
  Object.keys(irregObj).forEach((k) => {
    if (irregObj[k] && !all[k]) {
      all[k] = irregObj[k];
    }
  });
  //ok, send this infinitive to all conjugators
  let inf = all['Infinitive'] || t.normal;

  //check suffix rules
  const suffObj = suffixPass(inf);
  Object.keys(suffObj).forEach((k) => {
    if (suffObj[k] && !all[k]) {
      all[k] = suffObj[k];
    }
  });
  //ad-hoc each missing form
  //to Actor
  if (!all.Actor) {
    //a phrasal like 'step up' can't be an actor -'step upper'?
    // if (!t.tag.PhrasalVerb) {
    all.Actor = toActor(inf);
  // }
  }
  //add adjective, like walk->walkable
  all.Adjective = toAdjective(all.Infinitive);

  //use fallback, generic transformations
  Object.keys(all).forEach((k) => {
    if (!all[k] && generic[k]) {
      all[k] = generic[k](all);
    }
  });

  return all;
};

module.exports = conjugate;

},{"../predict":145,"../toInfinitive":148,"./generic":137,"./irregulars":139,"./suffixes":140,"./toActor":141,"./toAdjective":142,"./toBe":143}],135:[function(_dereq_,module,exports){
module.exports = [
  {
    reg: /(eave)$/i,
    repl: {
      pr: '$1s',
      pa: '$1d',
      gr: 'eaving',
      ar: '$1r'
    }
  },
  {
    reg: /(ink)$/i,
    repl: {
      pr: '$1s',
      pa: 'unk',
      gr: '$1ing',
      ar: '$1er'
    }
  },
  {
    reg: /(end)$/i,
    repl: {
      pr: '$1s',
      pa: 'ent',
      gr: '$1ing',
      ar: '$1er'
    }
  },
  {
    reg: /(ide)$/i,
    repl: {
      pr: '$1s',
      pa: 'ode',
      gr: 'iding',
      ar: 'ider'
    }
  },
  {
    reg: /(ake)$/i,
    repl: {
      pr: '$1s',
      pa: 'ook',
      gr: 'aking',
      ar: '$1r'
    }
  },
  {
    reg: /(eed)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ed',
      gr: '$1ing',
      ar: '$1er'
    }
  },

  {
    reg: /(e)(ep)$/i,
    repl: {
      pr: '$1$2s',
      pa: '$1pt',
      gr: '$1$2ing',
      ar: '$1$2er'
    }
  }, {
    reg: /(a[tg]|i[zn]|ur|nc|gl|is)e$/i,
    repl: {
      pr: '$1es',
      pa: '$1ed',
      gr: '$1ing',
      prt: '$1en'
    }
  }, {
    reg: /([i|f|rr])y$/i,
    repl: {
      pr: '$1ies',
      pa: '$1ied',
      gr: '$1ying'
    }
  }, {
    reg: /([td]er)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ed',
      gr: '$1ing'
    }
  }, {
    reg: /([bd]l)e$/i,
    repl: {
      pr: '$1es',
      pa: '$1ed',
      gr: '$1ing'
    }
  }, {
    reg: /(ish|tch|ess)$/i,
    repl: {
      pr: '$1es',
      pa: '$1ed',
      gr: '$1ing'
    }
  }, {
    reg: /(ion|end|e[nc]t)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ed',
      gr: '$1ing'
    }
  }, {
    reg: /(om)e$/i,
    repl: {
      pr: '$1es',
      pa: 'ame',
      gr: '$1ing'
    }
  }, {
    reg: /([aeiu])([pt])$/i,
    repl: {
      pr: '$1$2s',
      pa: '$1$2',
      gr: '$1$2$2ing'
    }
  }, {
    reg: /(er)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ed',
      gr: '$1ing'
    }
  }, {
    reg: /(en)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ed',
      gr: '$1ing'
    },
  },
  {
    reg: /(..)(ow)$/i,
    repl: {
      pr: '$1$2s',
      pa: '$1ew',
      gr: '$1$2ing',
      prt: '$1$2n'
    }
  },
  {
    reg: /(..)([cs]h)$/i,
    repl: {
      pr: '$1$2es',
      pa: '$1$2ed',
      gr: '$1$2ing'
    },
  },
  {
    reg: /([^aeiou][ou])(g|d)$/i,
    repl: {
      pr: '$1$2s',
      pa: '$1$2$2ed',
      gr: '$1$2$2ing'
    },
  },
  {
    reg: /([^aeiou][aeiou])(b|t|p|m)$/i,
    repl: {
      pr: '$1$2s',
      pa: '$1$2$2ed',
      gr: '$1$2$2ing'
    },
  },
  {
    reg: /([aeiou]zz)$/i,
    repl: {
      pr: '$1es',
      pa: '$1ed',
      gr: '$1ing'
    }
  }
];

},{}],136:[function(_dereq_,module,exports){
'use strict';

const checkIrregulars = _dereq_('./irregulars');
const suffixPass = _dereq_('./suffixes');
const generic = _dereq_('./generic');
//this method is the same as regular conjugate, but optimised for use in the lexicon during warm-up.
//it's way faster because it knows input is already infinitive

const want = [
  'Gerund',
  'PastTense',
  'PresentTense',
];

const fasterConjugate = (inf) => {
  let all = {
    Infinitive: inf
  };
  const irregObj = checkIrregulars(all['Infinitive']);
  if (irregObj !== null) {
    Object.keys(irregObj).forEach((k) => {
      if (irregObj[k] && !all[k]) {
        all[k] = irregObj[k];
      }
    });
  }
  //check suffix rules
  const suffObj = suffixPass(inf);
  Object.keys(suffObj).forEach((k) => {
    if (suffObj[k] && !all[k]) {
      all[k] = suffObj[k];
    }
  });
  for(let i = 0; i < want.length; i++) {
    if (!all[want[i]]) {
      all[want[i]] = generic[want[i]](all);
    }
  }
  return all;
};
module.exports = fasterConjugate;
// console.log(fasterConjugate('walk'));

},{"./generic":137,"./irregulars":139,"./suffixes":140}],137:[function(_dereq_,module,exports){
'use strict';
//non-specifc, 'hail-mary' transforms from infinitive, into other forms
const fns = _dereq_('../../../../../fns'); //jaja!

const generic = {

  Gerund: (o) => {
    let inf = o.Infinitive;
    if (fns.endsWith(inf, 'e')) {
      return inf.replace(/e$/, 'ing');
    }
    return inf + 'ing';
  },

  PresentTense: (o) => {
    let inf = o.Infinitive;
    if (fns.endsWith(inf, 's')) {
      return inf + 'es';
    }
    if (inf.match(/[bcdfghjklmnpqrstvwxz]y$/)) {
      return inf.slice(0, -1) + 'ies';
    }
    return inf + 's';
  },

  PastTense: (o) => {
    let inf = o.Infinitive;
    if (fns.endsWith(inf, 'e')) {
      return inf + 'd';
    }
    if (fns.endsWith(inf, 'ed')) {
      return inf;
    }
    if (inf.match(/[bcdfghjklmnpqrstvwxz]y$/)) {
      return inf.slice(0, -1) + 'ied';
    }
    return inf + 'ed';
  },

  // FutureTense: (o) => {
  //   return 'will ' + o.Infinitive;
  // },
  //
  // PerfectTense: (o) => {
  //   return 'have ' + (o.Participle || o.PastTense);
  // },
  //
  // Pluperfect: (o) => {
  //   if (o.PastTense) {
  //     return 'had ' + o.PastTense;
  //   }
  //   return null;
  // },
  // FuturePerfect: (o) => {
  //   if (o.PastTense) {
  //     return 'will have ' + o.PastTense;
  //   }
  //   return null;
  // }

};

module.exports = generic;

},{"../../../../../fns":40}],138:[function(_dereq_,module,exports){
'use strict';
const conjugate = _dereq_('./conjugate');
const toBe = _dereq_('./toBe');

// const generic = {
//   FutureTense: (o) => {
//     return 'will ' + o.Infinitive;
//   },
//
//   PerfectTense: (o) => {
//     return 'have ' + (o.Participle || o.PastTense);
//   },
//
//   Pluperfect: (o) => {
//     if (o.PastTense) {
//       return 'had ' + o.PastTense;
//     }
//     return null;
//   },
//   FuturePerfect: (o) => {
//     if (o.PastTense) {
//       return 'will have ' + o.PastTense;
//     }
//     return null;
//   }
// };

//conjugation using auxillaries+adverbs and stuff
const multiWord = (vb, verbose) => {
  let isNegative = vb.negative.found;
  let isPlural = false;
  //handle 'to be' verb seperately
  if (vb.verb.tag.Copula || (vb.verb.normal === 'be' && vb.auxillary.match('will').found)) {
    return toBe(isPlural, isNegative);
  }

  let obj = conjugate(vb.verb, verbose);
  //apply particles
  if (vb.particle.found) {
    Object.keys(obj).forEach((k) => {
      obj[k] = obj[k] + vb.particle.out();
    });
  }
  //apply adverbs
  if (vb.adverbs.found) {
    Object.keys(obj).forEach((k) => {
      obj[k] = obj[k] + vb.adverbs.out();
    });
  }
  //apply negative
  if (isNegative) {
    obj.PastTense = 'did not ' + obj.Infinitive;
    obj.PresentTense = 'does not ' + obj.Infinitive;
  }
  //future Tense is pretty straightforward
  if (!obj.FutureTense) {
    if (isNegative) {
      obj.FutureTense = 'will not ' + obj.Infinitive;
    } else {
      obj.FutureTense = 'will ' + obj.Infinitive;
    }
  }
  return obj;
};
module.exports = multiWord;

},{"./conjugate":134,"./toBe":143}],139:[function(_dereq_,module,exports){
'use strict';
const irregulars = _dereq_('../../../../../data').irregular_verbs;
const infArr = Object.keys(irregulars);
const forms = [
  'Participle',
  'Gerund',
  'PastTense',
  'PresentTense',
  'FuturePerfect',
  'PerfectTense',
  'Actor'
];

const checkIrregulars = function(str) {
  //fast infinitive lookup
  if (irregulars[str] !== undefined) {
    let obj = Object.assign({}, irregulars[str]);
    obj.Infinitive = str;
    return obj;
  }
  //longer check of known-verb forms
  for(let i = 0; i < infArr.length; i++) {
    for(let o = 0; o < forms.length; o++) {
      let irObj = irregulars[infArr[i]];
      if (irObj[forms[o]] === str) {
        let obj = Object.assign({}, irObj);
        obj.Infinitive = infArr[i];
        return obj;
      }
    }
  }
  return {};
};

module.exports = checkIrregulars;
// console.log(checkIrregulars('bit'));

},{"../../../../../data":8}],140:[function(_dereq_,module,exports){
'use strict';
const rules = _dereq_('./data/rules');
const mapping = {
  pr: 'PresentTense',
  pa: 'PastTense',
  gr: 'Gerund',
  prt: 'Participle',
  ar: 'Actor',
};
const keys = Object.keys(mapping);

//check suffix rules
const suffixPass = function(inf) {
  let found = {};
  for(let i = 0; i < rules.length; i++) {
    if (inf.match(rules[i].reg)) {
      let obj = rules[i].repl;
      for(let o = 0; o < keys.length; o++) {
        if (obj[keys[o]]) {
          let key = mapping[keys[o]];
          found[key] = inf.replace(rules[i].reg, obj[keys[o]]);
        }
      }
      return found;
    }
  }
  return found;
};

module.exports = suffixPass;

},{"./data/rules":135}],141:[function(_dereq_,module,exports){
'use strict';
//turn 'walk' into 'walker'
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
const rules = [{
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

const toActor = function(inf) {
  //check blacklist
  if (dont[inf]) {
    return null
  }
  //check irregulars
  if (irregulars[inf]) {
    return irregulars[inf]
  }
  //try rules
  for (let i = 0; i < rules.length; i++) {
    if (inf.match(rules[i].reg)) {
      return inf.replace(rules[i].reg, rules[i].repl)
    }
  }
  //yup,
  return inf + 'er'
}

module.exports = toActor

},{}],142:[function(_dereq_,module,exports){
'use strict';
//turn a infinitiveVerb, like "walk" into an adjective like "walkable"

const rules = [
  [/[^aeiou]y$/, 'i'], //relay - reliable
  [/([aeiou][n])$/, '$1n'], //win - winnable
];

//convert - 'convertible'
//http://grammarist.com/usage/able-ible/
//http://blog.oxforddictionaries.com/2012/10/ibles-and-ables/
const ible_suffixes = {
  collect: true,
  exhaust: true,
  convert: true,
  digest: true,
  discern: true,
  dismiss: true,
  reverse: true,
  access: true,
  collapse: true,
  express: true
};

const irregulars = {
  eat: 'edible',
  hear: 'audible',
  see: 'visible',
  defend: 'defensible',
  write: 'legible',
  move: 'movable',
  divide: 'divisible',
  perceive: 'perceptible'
};

//takes an infitive verb, and returns an adjective form
const toAdjective = function(str) {
  if (irregulars[str]) {
    return irregulars[str];
  }
  for(let i = 0; i < rules.length; i++) {
    if (str.match(rules[i][0])) {
      str = str.replace(rules[i][0], rules[i][1]);
    }
  }
  let adj = str + 'able';
  if (ible_suffixes[str]) {
    adj = str + 'ible';
  }
  return adj;
};

module.exports = toAdjective;
// console.log(toAdjective('buy'));

},{}],143:[function(_dereq_,module,exports){
'use strict';
//too many special cases for is/was/will be
const toBe = (isPlural, isNegative) => {
  let obj = {
    PastTense: 'was',
    PresentTense: 'is',
    FutureTense: 'will be',
    Infinitive: 'is',
    Gerund: 'being',
    Actor: '',
    PerfectTense: 'been',
    Pluperfect: 'been',
  };
  if (isPlural) {
    obj.PastTense = 'were';
    obj.PresentTense = 'are';
    obj.Infinitive = 'are';
  }
  if (isNegative) {
    obj.PastTense += ' not';
    obj.PresentTense += ' not';
    obj.FutureTense = 'will not be';
    obj.Infinitive += ' not';
    obj.PerfectTense = 'not ' + obj.PerfectTense;
    obj.Pluperfect = 'not ' + obj.Pluperfect;
  }
  return obj;
};
module.exports = toBe;

},{}],144:[function(_dereq_,module,exports){
'use strict';
//sometimes you can tell if a verb is plural/singular, just by the verb
// i am / we were
//othertimes you need its noun 'we walk' vs 'i walk'
const isPlural = (vb) => {
  if (vb.match('(are|were|does)').found) {
    return true;
  }
  if (vb.match('(is|am|do|was)').found) {
    return false;
  }
  //consider its prior noun
  let noun = vb.getNoun();
  if (noun && noun.found) {
    if (noun.match('#Plural').found) {
      return true;
    }
    if (noun.match('#Singular').found) {
      return false;
    }
  }
  return null;
};
module.exports = isPlural;

},{}],145:[function(_dereq_,module,exports){
'use strict';
const fns = _dereq_('../../../../../fns'); //jaja!
const suffix_rules = _dereq_('./suffix_rules');

const goodTypes = {
  Infinitive: true,
  Gerund: true,
  PastTense: true,
  PresentTense: true,
  FutureTense: true,
  PerfectTense: true,
  Pluperfect: true,
  FuturePerfect: true,
  Participle: true
};

const predictForm = function(term, verbose) {
  //do we already know the form?
  let keys = Object.keys(goodTypes);
  for (let i = 0; i < keys.length; i++) {
    if (term.tag[keys[i]]) {
      if (verbose) {
        console.log('predicted ' + keys[i] + ' from pos', path);
      }
      return keys[i];
    }
  }
  //consult our handy suffix rules
  const arr = Object.keys(suffix_rules);
  for (let i = 0; i < arr.length; i++) {
    if (fns.endsWith(term.normal, arr[i]) && arr[i].length < term.normal.length) {
      if (verbose) {
        const msg = 'predicted ' + suffix_rules[arr[i]] + ' from suffix ' + arr[i];
        console.log(msg, path);
      }
      return suffix_rules[arr[i]];
    }
  }
  return null;
};

module.exports = predictForm;

},{"../../../../../fns":40,"./suffix_rules":146}],146:[function(_dereq_,module,exports){
'use strict';
//suffix signals for verb tense, generated from test data
const compact = {
  'Gerund': [
    'ing'
  ],
  'Actor': [
    'erer'
  ],
  'Infinitive': [
    'ate',
    'ize',
    'tion',
    'rify',
    'then',
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
    'ent',
    'eed',
    'er',
    'le',
    'own',
    'unk',
    'ung',
    'en'
  ],
  'PastTense': [
    'ed',
    'lt',
    'nt',
    'pt',
    'ew',
    'ld'
  ],
  'PresentTense': [
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

for (let i = 0; i < l; i++) {
  let l2 = compact[keys[i]].length;
  for (let o = 0; o < l2; o++) {
    suffix_rules[compact[keys[i]][o]] = keys[i];
  }
}
module.exports = suffix_rules;

},{}],147:[function(_dereq_,module,exports){
'use strict';
//turn a infinitiveVerb, like "walk" into an adjective like "walkable"

const rules = [
  [/y$/, 'i'], //relay - reliable
  [/([aeiou][n])$/, '$1n'], //win - winnable
];

//convert - 'convertible'
//http://grammarist.com/usage/able-ible/
//http://blog.oxforddictionaries.com/2012/10/ibles-and-ables/
const ible_suffixes = {
  collect: true,
  exhaust: true,
  convert: true,
  digest: true,
  discern: true,
  dismiss: true,
  reverse: true,
  access: true,
  collapse: true,
  express: true
};

const irregulars = {
  eat: 'edible',
  hear: 'audible',
  see: 'visible',
  defend: 'defensible',
  write: 'legible',
  move: 'movable',
  divide: 'divisible',
  perceive: 'perceptible'
};

//takes an infitive verb, and returns an adjective form
const toAdjective = function(str) {
  if (irregulars[str]) {
    return irregulars[str];
  }
  for(let i = 0; i < rules.length; i++) {
    if (str.match(rules[i][0])) {
      str = str.replace(rules[i][0], rules[i][1]);
    }
  }
  let adj = str + 'able';
  if (ible_suffixes[str]) {
    adj = str + 'ible';
  }
  return adj;
};

module.exports = toAdjective;

},{}],148:[function(_dereq_,module,exports){
'use strict';
//turn any verb into its infinitive form
const rules = _dereq_('./rules');
let irregulars = _dereq_('../../../../../data').irregular_verbs;
const predict = _dereq_('../predict');

//map the irregulars for easy infinitive lookup
// {bought: 'buy'}
const verb_mapping = () => {
  return Object.keys(irregulars).reduce((h, k) => {
    Object.keys(irregulars[k]).forEach((pos) => {
      h[irregulars[k][pos]] = k;
    });
    return h;
  }, {});
};

irregulars = verb_mapping();

const toInfinitive = function(t) {
  if (t.tag.Infinitive) {
    return t.normal;
  }
  //check the irregular verb conjugations
  if (irregulars[t.normal]) {
    return irregulars[t.normal];
  }
  //check the suffix rules
  let form = predict(t);
  if (rules[form]) {
    for (let i = 0; i < rules[form].length; i++) {
      let rule = rules[form][i];
      if (t.normal.match(rule.reg)) {
        return t.normal.replace(rule.reg, rule.to);
      }
    }
  }
  return t.normal;
};

module.exports = toInfinitive;

},{"../../../../../data":8,"../predict":145,"./rules":149}],149:[function(_dereq_,module,exports){
'use strict';
//rules for turning a verb into infinitive form
let rules = {
  Participle: [
    {
      reg: /own$/i,
      to: 'ow'
    },
    {
      reg: /(.)un([g|k])$/i,
      to: '$1in$2'
    }
  ],
  Actor: [
    {
      reg: /(er)er$/i,
      to: '$1'
    }
  ],
  PresentTense: [
    {
      reg: /(ies)$/i,
      to: 'y'
    }, {
      reg: /(tch|sh)es$/i,
      to: '$1'
    }, {
      reg: /(ss|zz)es$/i,
      to: '$1'
    }, {
      reg: /([tzlshicgrvdnkmu])es$/i,
      to: '$1e'
    }, {
      reg: /(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$/i,
      to: '$1'
    }, {
      reg: /(ow)s$/i,
      to: '$1'
    }, {
      reg: /(op)s$/i,
      to: '$1'
    }, {
      reg: /([eirs])ts$/i,
      to: '$1t'
    }, {
      reg: /(ll)s$/i,
      to: '$1'
    }, {
      reg: /(el)s$/i,
      to: '$1'
    }, {
      reg: /(ip)es$/i,
      to: '$1e'
    }, {
      reg: /ss$/i,
      to: 'ss'
    }, {
      reg: /s$/i,
      to: ''
    }],
  Gerund: [
    {
      reg: /pping$/i,
      to: 'p'
    }, {
      reg: /lling$/i,
      to: 'll'
    }, {
      reg: /tting$/i,
      to: 't'
    }, {
      reg: /ssing$/i,
      to: 'ss'
    }, {
      reg: /gging$/i,
      to: 'g'
    }, {
      reg: /([^aeiou])ying$/i,
      to: '$1y'
    }, {
      reg: /([^ae]i.)ing$/i,
      to: '$1e'
    }, {
      reg: /(ea.)ing$/i,
      to: '$1'
    }, {
      reg: /(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$/i,
      to: '$1e'
    }, {
      reg: /(ch|sh)ing$/i,
      to: '$1'
    }, {
      reg: /(..)ing$/i,
      to: '$1'
    }],
  PastTense: [
    {
      reg: /(ued)$/i,
      to: 'ue'
    }, {
      reg: /([aeiou]zz)ed$/i,
      to: '$1'
    }, {
      reg: /(e|i)lled$/i,
      to: '$1ll'
    }, {
      reg: /(sh|ch)ed$/i,
      to: '$1'
    }, {
      reg: /(tl|gl)ed$/i,
      to: '$1e'
    }, {
      reg: /(um?pt?)ed$/i,
      to: '$1'
    }, {
      reg: /(ss)ed$/i,
      to: '$1'
    }, {
      reg: /pped$/i,
      to: 'p'
    }, {
      reg: /tted$/i,
      to: 't'
    }, {
      reg: /gged$/i,
      to: 'g'
    }, {
      reg: /(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$/i,
      to: '$1'
    }, {
      reg: /(.ut)ed$/i,
      to: '$1e'
    }, {
      reg: /(us)ed$/i,
      to: '$1e'
    }, {
      reg: /(..[^aeiouy])ed$/i,
      to: '$1e'
    }, {
      reg: /ied$/i,
      to: 'y'
    }, {
      reg: /(.o)ed$/i,
      to: '$1o'
    }, {
      reg: /(.i)ed$/i,
      to: '$1'
    }, {
      reg: /(a[^aeiou])ed$/i,
      to: '$1'
    }, {
      reg: /([rl])ew$/i,
      to: '$1ow'
    }, {
      reg: /([pl])t$/i,
      to: '$1t'
    }]
};
module.exports = rules;

},{}],150:[function(_dereq_,module,exports){
'use strict';
//turns a verb negative - may not have enough information to do it properly
// (eg 'did not eat' vs 'does not eat') - needs the noun
const toInfinitive = _dereq_('./methods/toInfinitive');

const toNegative = (ts) => {
  //would not walk
  let modal = ts.match('#Auxillary').first(); //.notIf('(is|are|was|will|has|had)').first(); //.first();
  if (modal.found) {
    let index = modal.list[0].index();
    return ts.parentTerms.insertAt(index + 1, 'not', 'Verb');
  }

  //is not
  let copula = ts.match('(#Copula|will|has|had)').first();
  if (copula.found) {
    let index = copula.list[0].index();
    return ts.parentTerms.insertAt(index + 1, 'not', 'Verb');
  }

  let isPlural = ts.isPlural();

  //walked -> did not walk
  let past = ts.match('#PastTense').last();
  if (past.found) {
    let vb = past.list[0];
    let index = vb.index();
    vb.terms[0].text = toInfinitive(vb.terms[0]);
    if (isPlural) {
      return ts.parentTerms.insertAt(index, 'do not', 'Verb');
    }
    return ts.parentTerms.insertAt(index, 'did not', 'Verb');
  }

  //walks -> does not walk
  let pres = ts.match('#PresentTense').last();
  if (pres.found) {
    let vb = pres.list[0];
    let index = vb.index();
    vb.terms[0].text = toInfinitive(vb.terms[0]);
    return ts.parentTerms.insertAt(index, 'does not', 'Verb');
  }

  //not walking
  let gerund = ts.match('#Gerund').last();
  if (gerund.found) {
    let index = gerund.list[0].index();
    return ts.parentTerms.insertAt(index, 'not', 'Verb');
  }

  //walk -> do not walk
  let vb = ts.match('#Verb').last();
  if (vb.found) {
    vb = vb.list[0];
    let index = vb.index();
    vb.terms[0].text = toInfinitive(vb.terms[0]);
    if (isPlural) {
      return ts.parentTerms.insertAt(index, 'does not', 'Verb');
    }
    return ts.parentTerms.insertAt(index, 'did not', 'Verb');
  }

  return ts;
};
module.exports = toNegative;

},{"./methods/toInfinitive":148}],151:[function(_dereq_,module,exports){
'use strict';
const Terms = _dereq_('../../paths').Terms;
const conjugate = _dereq_('./methods/conjugate');
const toAdjective = _dereq_('./methods/toAdjective');
const interpret = _dereq_('./interpret');
const toNegative = _dereq_('./toNegative');
const isPlural = _dereq_('./methods/isPlural');

class Verb extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.parse();
  }
  parse() {
    this.negative = this.match('#Negative');
    this.adverbs = this.match('#Adverb');
    let aux = this.clone().not('(#Adverb|#Negative)');
    this.verb = aux.match('#Verb').not('#Particle').last();
    this.particle = aux.match('#Particle').last();
    if (this.verb.found) {
      this.verb = this.verb.list[0].terms[0];
    }
    this.auxillary = aux.match('#Auxillary+');
  }
  data(verbose) {
    return {
      text: this.out('text'),
      normal: this.out('normal'),
      parts: {
        negative: this.negative.out('normal'),
        auxillary: this.auxillary.out('normal'),
        verb: this.verb.out('normal'),
        adverbs: this.adverbs.out('normal'),
      },
      interpret: interpret(this, verbose),
      conjugations: this.conjugate()
    };
  }
  getNoun() {
    if (!this.refTerms) {
      return null;
    }
    let str = '#Adjective? #Noun+ ' + this.out('normal');
    return this.refTerms.match(str).match('#Noun+');
  }
  //which conjugation is this right now?
  conjugation() {
    return interpret(this, false).tense;
  }
  //blast-out all forms
  conjugate(verbose) {
    return conjugate(this, verbose);
  }

  isPlural() {
    return isPlural(this);
  }
  /** negation **/
  isNegative() {
    return this.match('#Negative').list.length === 1;
  }
  isPerfect() {
    return this.auxillary.match('(have|had)').found;
  }
  toNegative() {
    if (this.isNegative()) {
      return this;
    }
    return toNegative(this);
  }
  toPositive() {
    return this.match('#Negative').delete();
  }

  /** conjugation **/
  toPastTense() {
    let obj = this.conjugate();
    return this.replaceWith(obj.PastTense);
  }
  toPresentTense() {
    let obj = this.conjugate();
    return this.replaceWith(obj.PresentTense);
  }
  toFutureTense() {
    let obj = this.conjugate();
    return this.replaceWith(obj.FutureTense);
  }
  toInfinitive() {
    let obj = this.conjugate();
    //NOT GOOD. please fix
    this.terms[this.terms.length - 1].text = obj.Infinitive;
    return this;
  }

  asAdjective() {
    return toAdjective(this.verb.out('normal'));
  }

}
module.exports = Verb;

},{"../../paths":56,"./interpret":133,"./methods/conjugate":138,"./methods/isPlural":144,"./methods/toAdjective":147,"./toNegative":150}],152:[function(_dereq_,module,exports){
//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2015 MIT
'use strict';
const fns = _dereq_('./paths').fns;
const data = _dereq_('../data/index');
const abbreviations = Object.keys(data.abbreviations);

const naiive_split = function (text) {
  //first, split by newline
  let splits = text.split(/(\n+)/);
  //split by period, question-mark, and exclamation-mark
  splits = splits.map(function (str) {
    return str.split(/(\S.+?[.!?])(?=\s+|$)/g);
  });
  return fns.flatten(splits);
};

const sentence_parser = function (text) {
  let sentences = [];
  text = fns.ensureString(text);
  //first do a greedy-split..
  let chunks = [];
  //ensure it 'smells like' a sentence
  if (!text || typeof text !== 'string' || !text.match(/\S/)) {
    return sentences;
  }
  // This was the splitter regex updated to fix quoted punctuation marks.
  // let splits = text.split(/(\S.+?[.\?!])(?=\s+|$|")/g);
  // todo: look for side effects in this regex replacement:
  let splits = naiive_split(text);
  //filter-out the grap ones
  for (let i = 0; i < splits.length; i++) {
    let s = splits[i];
    if (!s || s === '') {
      continue;
    }
    //this is meaningful whitespace
    if (!s.match(/\S/)) {
      //add it to the last one
      if (chunks[chunks.length - 1]) {
        chunks[chunks.length - 1] += s;
        continue;
      } else if (splits[i + 1]) { //add it to the next one
        splits[i + 1] = s + splits[i + 1];
        continue;
      }
    //else, only whitespace, no terms, no sentence
    }
    chunks.push(s);
  }

  //detection of non-sentence chunks
  const abbrev_reg = new RegExp('\\b(' + abbreviations.join('|') + ')[.!?] ?$', 'i');
  const acronym_reg = new RegExp('[ |\.][A-Z]\.?( *)?$', 'i');
  const elipses_reg = new RegExp('\\.\\.+( +)?$');
  //loop through these chunks, and join the non-sentence chunks back together..
  for (let i = 0; i < chunks.length; i++) {
    //should this chunk be combined with the next one?
    if (chunks[i + 1] && (chunks[i].match(abbrev_reg) || chunks[i].match(acronym_reg) || chunks[i].match(elipses_reg))) {
      chunks[i + 1] = (chunks[i] + (chunks[i + 1] || '')); //.replace(/ +/g, ' ');
    } else if (chunks[i] && chunks[i].length > 0) { //this chunk is a proper sentence..
      sentences.push(chunks[i]);
      chunks[i] = '';
    }

  }
  //if we never got a sentence, return the given text
  if (sentences.length === 0) {
    return [text];
  }
  return sentences;
};

module.exports = sentence_parser;
// console.log(sentence_parser('john f. kennedy'));

},{"../data/index":8,"./paths":56}],153:[function(_dereq_,module,exports){
//used for pretty-printing on the server-side
const colors = {
  blue: [
    'Noun',
    'Plural',
    'Singular',
    'Pronoun',
    'Possessive',
    'Place',
    'Person',
    'City',
  ],
  red: [
    'Value',
    'Ordinal',
    'Cardinal',
    'TextValue',
    'NumericValue'
  ],
  green: [
    'Verb',
    'Auxillary',
    'Negative',
    'PastTense',
    'PresentTense',
    'FutureTense',
    'Modal',
    'Infinitive',
    'Gerund',
    'Copula',
    'Participle',
  ],
  cyan: [
    'Preposition',
    'Conjunction',
    'Determiner',
  ],
  black: [
    'Adjective',
    'Adverb'
  ]
};
module.exports = Object.keys(colors).reduce((h, c) => {
  colors[c].forEach((str) => {
    h[str] = c;
  });
  return h;
}, {});

},{}],154:[function(_dereq_,module,exports){
'use strict';

//list of inconsistent parts-of-speech
const conflicts = [
  //top-level pos are all inconsistent
  ['Noun', 'Verb', 'Adjective', 'Adverb', 'Determiner', 'Conjunction', 'Preposition', 'QuestionWord', 'Expression', 'Url', 'PhoneNumber', 'Email', 'Emoji'],
  //exlusive-nouns
  ['Person', 'Organization', 'Value', 'Place', 'Actor', 'Demonym', 'Pronoun'],
  //things that can't be plural
  ['Plural', 'Singular'],
  // ['Plural', 'Pronoun'],
  ['Plural', 'Person'],
  ['Plural', 'Organization'],
  ['Plural', 'Currency'],
  ['Plural', 'Ordinal'],
  //exlusive-people
  ['MaleName', 'FemaleName'],
  ['FirstName', 'LastName', 'Honorific'],
  //adjectives
  ['Comparative', 'Superlative'],
  //values
  ['Value', 'Verb', 'Adjective'],
  // ['Value', 'Year'],
  ['Ordinal', 'Cardinal'],
  ['TextValue', 'NumericValue'],
  ['NiceNumber', 'TextValue'],
  ['Ordinal', 'Currency'], //$5.50th
  //verbs
  ['PastTense', 'PerfectTense', 'Pluperfect', 'FuturePerfect', 'Copula', 'Modal', 'Participle', 'Infinitive', 'Gerund'],
  //date
  ['Month', 'WeekDay', 'Year', 'Duration'],
  ['Particle', 'Conjunction', 'Adverb', 'Preposition'],
  ['Date', 'Verb', 'Adjective', 'Person'],
  //phrases
  ['NounPhrase', 'VerbPhrase', 'AdjectivePhrase', 'ConditionalPhrase'],
  //a/an -> 1
  ['Value', 'Determiner'],
  ['Verb', 'NounPhrase'],
  ['Noun', 'VerbPhrase'],
  //roman numerals
  ['RomanNumeral', 'Fraction', 'NiceNumber'],
  ['RomanNumeral', 'Money'],
  //cases
  ['UpperCase', 'TitleCase', 'CamelCase']
];

const find = (tag) => {
  let arr = [];
  for (let i = 0; i < conflicts.length; i++) {
    if (conflicts[i].indexOf(tag) !== -1) {
      arr = arr.concat(conflicts[i]);
    }
  }
  return arr.filter((t) => t !== tag);
};

module.exports = find;

// console.log(find('Person'));

},{}],155:[function(_dereq_,module,exports){
'use strict';
const conflicts = _dereq_('./conflicts');
const tree = _dereq_('./tree');

const extra = {
  Month: 'Singular',
  // Year: 'Noun',
  Time: 'Noun',
  WeekDay: 'Noun',
  Duration: 'Noun',
  NumberRange: 'Contraction'
};


const all_children = (obj) => {

  let children = Object.keys(obj || {});
  //two levels deep
  children.forEach((str) => {
    if (typeof obj[str] === 'object') {
      let kids = Object.keys(obj[str]);
      kids.forEach((gc) => {
        if (typeof obj[str][gc] === 'object') {
          let grandkids = Object.keys(obj[str][gc]);
          children = children.concat(grandkids);
        }
      });
      children = children.concat(kids);
    }
  });
  return children;
};

const build = function() {
  //make tags
  let all = {};
  //recursively add them
  const add_tags = (obj, is) => {
    Object.keys(obj).forEach((k) => {
      is = is.slice(0); //clone it
      all[k] = {
        parents: is,
        children: all_children(obj[k])
      };
      if (obj[k] !== true) {
        add_tags(obj[k], is.concat([k])); //recursive
      }
    });
  };
  add_tags(tree, []);

  //add extras
  Object.keys(all).forEach((tag) => {
    if (extra[tag]) {
      all[tag].parents.push(extra[tag]);
    }
  });

  //add conflicts
  Object.keys(all).forEach((tag) => {
    all[tag].not = conflicts(tag);
    let parents = all[tag].parents;
    for(let i = 0; i < parents.length; i++) {
      let alsoNot = conflicts(parents[i]);
      all[tag].not = all[tag].not.concat(alsoNot);
    }
  });

  return all;
};

module.exports = build();
// console.log(all.Duration);
// console.log(all_children(tree['NounPhrase']));

},{"./conflicts":154,"./tree":156}],156:[function(_dereq_,module,exports){
//the POS tags we use, according to their dependencies
//(dont make it too deep, cause fns aren't properly clever-enough)
module.exports = {
  Noun: {
    Singular: {
      Person: {
        FirstName: {
          MaleName: true,
          FemaleName: true,
        },
        LastName: true,
        Honorific: true
      },
      Place: {
        Country: true,
        City: true,
        Address: true
      },
      Organization: {
        SportsTeam: true,
        Company: true,
        School: true,
      },
    },
    Plural: true,
    Pronoun: true,
    Actor: true,
    Unit: true,
    Demonym: true,
    Possessive: true,
  },
  Date: { //not a noun, but usually is
    Month: true,
    WeekDay: true,
    RelativeDay: true,
    Year: true,
    Duration: true,
    Time: true,
    Holiday: true
  },
  Verb: {
    PresentTense: {
      Infinitive: true,
      Gerund: true
    },
    PastTense: true,
    PerfectTense: true,
    FuturePerfect: true,
    Pluperfect: true,
    Copula: true,
    Modal: true,
    Participle: true,
    Particle: true
  },
  Adjective: {
    Comparative: true,
    Superlative: true
  },
  Adverb: true,
  Value: {
    Ordinal: true,
    Cardinal: {
      RomanNumeral: true,
    },
    Fraction: true,
    TextValue: true,
    NumericValue: true,
    NiceNumber: true,
    Money: true,
    NumberRange: true,
  },
  Currency: true,
  //glue
  Determiner: true,
  Conjunction: true,
  Preposition: true,
  QuestionWord: true,
  Expression: true,
  Url: true,
  PhoneNumber: true,
  HashTag: true,
  Emoji: true,
  Email: true,

  //non-exclusive
  Condition: true,
  Auxillary: true,
  Negative: true,
  Contraction: true,

  TitleCase: true,
  CamelCase: true,
  UpperCase: true,
  Hyphenated: true,
  Acronym: true,
  ClauseEnd: true,
  //phrases
  Quotation: true,
  // ValuePhrase: true,
  // AdjectivePhrase: true,
  // ConditionPhrase: true,

};

},{}],157:[function(_dereq_,module,exports){
'use strict';
const fns = _dereq_('./paths').fns;
const build_whitespace = _dereq_('./whitespace');
const makeUID = _dereq_('./makeUID');

class Term {
  constructor(str) {
    this._text = fns.ensureString(str);
    this.tag = {};
    //seperate whitespace from the text
    let parsed = build_whitespace(this._text);
    this.whitespace = parsed.whitespace;
    this._text = parsed.text;
    // console.log(this.whitespace, this._text);
    this.parent = null;
    this.silent_term = '';
    //has this term been modified
    this.dirty = false;
    this.normalize();
    //make a unique id for this term
    this.uid = makeUID(this.normal);
  }
  set text(str) {
    str = str || '';
    this._text = str.trim();
    this.dirty = true;
    if (this._text !== str) {
      this.whitespace = build_whitespace(str);
    }
    this.normalize();
  }
  get text() {
    return this._text;
  }
  get isA() {
    return 'Term';
  }
  /** where in the sentence is it? zero-based. */
  index() {
    let ts = this.parentTerms;
    if (!ts) {
      return null;
    }
    return ts.terms.indexOf(this);
  }
  /** make a copy with no references to the original  */
  clone() {
    let term = new Term(this._text, null);
    term.tag = fns.copy(this.tag);
    term.whitespace = fns.copy(this.whitespace);
    term.silent_term = this.silent_term;
    return term;
  }
}
Term = _dereq_('./methods/normalize')(Term);
Term = _dereq_('./methods/isA')(Term);
Term = _dereq_('./methods/out')(Term);
Term = _dereq_('./methods/tag')(Term);
Term = _dereq_('./methods/case')(Term);
Term = _dereq_('./methods/punctuation')(Term);

module.exports = Term;

},{"./makeUID":158,"./methods/case":159,"./methods/isA":160,"./methods/normalize":161,"./methods/out":165,"./methods/punctuation":167,"./methods/tag":168,"./paths":172,"./whitespace":173}],158:[function(_dereq_,module,exports){
'use strict';

//this is a not-well-thought-out way to reduce our dependence on `object===object` reference stuff
//generates a unique id for this term
//may need to change when the term really-transforms? not sure.
const uid = (str) => {
  return str + '-xxxxxxxx'.replace(/x/g, function(c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
};
module.exports = uid;

},{}],159:[function(_dereq_,module,exports){
'use strict';

const addMethods = (Term) => {

  const methods = {
    toUpperCase: function () {
      this.text = this.text.toUpperCase();
      this.tagAs('#UpperCase', 'toUpperCase');
      return this;
    },
    toLowerCase: function () {
      this.text = this.text.toLowerCase();
      this.unTag('#TitleCase');
      this.unTag('#UpperCase');
      return this;
    },
    toTitleCase: function () {
      this.text = this.text.replace(/^[a-z]/, (x) => x.toUpperCase());
      this.tagAs('#TitleCase', 'toTitleCase');
      return this;
    },
    toCamelCase: function() {
      this.toTitleCase();
      let i = this.index();
      if (i !== 0) {
        this.whitespace.before = '';
      }
      // this.whitespace.after = '';
      this.tagAs('#CamelCase', 'toCamelCase');
      return this;
    },
    /** is it titlecased because it deserves it? Like a person's name? */
    needsTitleCase: function() {
      const titleCases = [
        'Person',
        'Place',
        'Organization',
        'Acronym',
        'UpperCase',
        'Currency',
        'RomanNumeral',
        'Month',
        'WeekDay',
        'Holiday',
        'Demonym',
      ];
      for(let i = 0; i < titleCases.length; i++) {
        if (this.tag[titleCases[i]]) {
          return true;
        }
      }
      //specific words that keep their titlecase
      //https://en.wikipedia.org/wiki/Capitonym
      const irregulars = [
        'i',
        'god',
        'allah',
      ];
      for(let i = 0; i < irregulars.length; i++) {
        if (this.normal === irregulars[i]) {
          return true;
        }
      }
      return false;
    }
  };
  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;

},{}],160:[function(_dereq_,module,exports){
'use strict';

const addMethods = (Term) => {

  const methods = {
    /** does it appear to be an acronym, like FBI or M.L.B. */
    isAcronym: function () {
      //like N.D.A
      if (this.text.match(/([A-Z]\.)+[A-Z]?$/)) {
        return true;
      }
      //like 'F.'
      if (this.text.match(/^[A-Z]\.$/)) {
        return true;
      }
      //like NDA
      if (this.text.match(/[A-Z]{3}$/)) {
        return true;
      }
      return false;
    },

    /** check if it is word-like in english */
    isWord: function () {
      let t = this;
      //assume a contraction produces a word-word
      if (t.silent_term) {
        return true;
      }
      //no letters or numbers
      if (!t.text.match(/[a-z|0-9]/i)) {
        return false;
      }
      //has letters, but with no vowels
      if (t.normal.match(/[a-z]/) && t.normal.length > 1 && !t.normal.match(/[aeiouy]/i)) {
        return false;
      }
      //has numbers but not a 'value'
      if (t.normal.match(/[0-9]/)) {
        //s4e
        if (t.normal.match(/[a-z][0-9][a-z]/)) {
          return false;
        }
        //ensure it looks like a 'value' eg '-$4,231.00'
        if (!t.normal.match(/^([$-])*?([0-9,\.])*?([s\$%])*?$/)) {
          return false;
        }
      }
      return true;
    }
  };
  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;

},{}],161:[function(_dereq_,module,exports){
'use strict';
const addNormal = _dereq_('./normalize').addNormal;
const addRoot = _dereq_('./root');

const addMethods = (Term) => {

  const methods = {
    normalize: function () {
      addNormal(this);
      addRoot(this);
      return this;
    },
  };
  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;

},{"./normalize":162,"./root":163}],162:[function(_dereq_,module,exports){
'use strict';
const killUnicode = _dereq_('./unicode');

//some basic operations on a string to reduce noise
exports.normalize = function(str) {
  str = str || '';
  str = str.toLowerCase();
  str = str.trim();
  //(very) rough asci transliteration -  bjŏrk -> bjork
  str = killUnicode(str);
  //hashtags, atmentions
  str = str.replace(/^[#@]/, '');
  // coerce single curly quotes
  str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, '\'');
  // coerce double curly quotes
  str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '');
  //coerce unicode elipses
  str = str.replace(/\u2026/g, '...');

  //strip leading & trailing grammatical punctuation
  if (!str.match(/^[:;]/)) {
    str = str.replace(/\.{3,}$/g, '');
    str = str.replace(/['",\.!:;\?\)]$/g, '');
    str = str.replace(/^['"\(]/g, '');
  }
  return str;
};

exports.addNormal = function (term) {
  let str = term._text || '';
  str = exports.normalize(str);
  //compact acronyms
  if (term.isAcronym()) {
    str = str.replace(/\./g, '');
  }
  //nice-numbers
  str = str.replace(/([0-9]),([0-9])/g, '$1$2');
  term.normal = str;
};


// console.log(normalize('Dr. V Cooper'));

},{"./unicode":164}],163:[function(_dereq_,module,exports){
'use strict';
//
const rootForm = function(term) {
  let str = term.normal || term.silent_term || '';
  //plural
  // if (term.tag.Plural) {
  // str = term.nouns().toSingular().normal || str;
  // }
  str = str.replace(/'s\b/, '');
  str = str.replace(/'\b/, '');
  term.root = str;
};

module.exports = rootForm;

},{}],164:[function(_dereq_,module,exports){
'use strict';
//a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
//approximate visual (not semantic or phonetic) relationship between unicode and ascii characters
//http://en.wikipedia.org/wiki/List_of_Unicode_characters
//https://docs.google.com/spreadsheet/ccc?key=0Ah46z755j7cVdFRDM1A2YVpwa1ZYWlpJM2pQZ003M0E
let compact = {
  '!': '¡',
  '?': '¿Ɂ',
  'a': 'ªÀÁÂÃÄÅàáâãäåĀāĂăĄąǍǎǞǟǠǡǺǻȀȁȂȃȦȧȺΆΑΔΛάαλАДадѦѧӐӑӒӓƛɅæ',
  'b': 'ßþƀƁƂƃƄƅɃΒβϐϦБВЪЬбвъьѢѣҌҍҔҕƥƾ',
  'c': '¢©ÇçĆćĈĉĊċČčƆƇƈȻȼͻͼͽϲϹϽϾϿЄСсєҀҁҪҫ',
  'd': 'ÐĎďĐđƉƊȡƋƌǷ',
  'e': 'ÈÉÊËèéêëĒēĔĕĖėĘęĚěƎƏƐǝȄȅȆȇȨȩɆɇΈΕΞΣέεξϱϵ϶ЀЁЕЭеѐёҼҽҾҿӖӗӘәӚӛӬӭ',
  'f': 'ƑƒϜϝӺӻҒғӶӷſ',
  'g': 'ĜĝĞğĠġĢģƓǤǥǦǧǴǵ',
  'h': 'ĤĥĦħƕǶȞȟΉΗЂЊЋНнђћҢңҤҥҺһӉӊ',
  'I': 'ÌÍÎÏ',
  'i': 'ìíîïĨĩĪīĬĭĮįİıƖƗȈȉȊȋΊΐΪίιϊІЇії',
  'j': 'ĴĵǰȷɈɉϳЈј',
  'k': 'ĶķĸƘƙǨǩΚκЌЖКжкќҚқҜҝҞҟҠҡ',
  'l': 'ĹĺĻļĽľĿŀŁłƚƪǀǏǐȴȽΙӀӏ',
  'm': 'ΜϺϻМмӍӎ',
  'n': 'ÑñŃńŅņŇňŉŊŋƝƞǸǹȠȵΝΠήηϞЍИЙЛПийлпѝҊҋӅӆӢӣӤӥπ',
  'o': 'ÒÓÔÕÖØðòóôõöøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱΌΘΟθοσόϕϘϙϬϭϴОФоѲѳӦӧӨөӪӫ¤ƍΏ',
  'p': 'ƤƿΡρϷϸϼРрҎҏÞ',
  'q': 'Ɋɋ',
  'r': 'ŔŕŖŗŘřƦȐȑȒȓɌɍЃГЯгяѓҐґ',
  's': 'ŚśŜŝŞşŠšƧƨȘșȿςϚϛϟϨϩЅѕ',
  't': 'ŢţŤťŦŧƫƬƭƮȚțȶȾΓΤτϮϯТт҂Ҭҭ',
  'u': 'µÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųƯưƱƲǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄΰμυϋύϑЏЦЧцџҴҵҶҷӋӌӇӈ',
  'v': 'νѴѵѶѷ',
  'w': 'ŴŵƜωώϖϢϣШЩшщѡѿ',
  'x': '×ΧχϗϰХхҲҳӼӽӾӿ',
  'y': 'ÝýÿŶŷŸƳƴȲȳɎɏΎΥΫγψϒϓϔЎУучўѰѱҮүҰұӮӯӰӱӲӳ',
  'z': 'ŹźŻżŽžƩƵƶȤȥɀΖζ'
};
//decompress data into two hashes
let unicode = {};
Object.keys(compact).forEach(function (k) {
  compact[k].split('').forEach(function (s) {
    unicode[s] = k;
  });
});

const killUnicode = (str) => {
  let chars = str.split('');
  chars.forEach((s, i) => {
    if (unicode[s]) {
      chars[i] = unicode[s];
    }
  });
  return chars.join('');
};
module.exports = killUnicode;
// console.log(fixUnicode('bjŏȒk'));

},{}],165:[function(_dereq_,module,exports){
'use strict';
const renderHtml = _dereq_('./renderHtml');
const fns = _dereq_('../../paths').fns;

const methods = {
  /** a pixel-perfect reproduction of the input, with whitespace preserved */
  text: function(r) {
    return r.whitespace.before + r._text + r.whitespace.after;
  },
  /** a lowercased, punctuation-cleaned, whitespace-trimmed version of the word */
  normal: function(r) {
    return r.normal;
  },
  /** the &encoded term in a span element, with POS as classNames */
  html: function(r) {
    return renderHtml(r);
  },
  /** a simplified response for Part-of-Speech tagging*/
  tags: function(r) {
    return {
      text: r.text,
      normal: r.normal,
      tags: Object.keys(r.tag)
    };
  },
  /** check-print information for the console */
  debug: function(r) {
    let tags = Object.keys(r.tag).map((tag) => {
      return fns.printTag(tag);
    }).join(', ');
    let word = r.text;
    // word = r.whitespace.before + word + r.whitespace.after;
    word = '\'' + fns.yellow(word || '-') + '\'';
    if (r.dirty) {
      // word += fns.red('*');
    }
    let silent = '';
    if (r.silent_term) {
      silent = '[' + r.silent_term + ']';
    }
    word = fns.leftPad(word, 25);
    word += fns.leftPad(silent, 5);
    console.log('   ' + word + '   ' + '     - ' + tags);
  }
};

const addMethods = (Term) => {
  //hook them into result.proto
  Term.prototype.out = function(fn) {
    if (!methods[fn]) {
      fn = 'text';
    }
    return methods[fn](this);
  };
  return Term;
};

module.exports = addMethods;

},{"../../paths":172,"./renderHtml":166}],166:[function(_dereq_,module,exports){
'use strict';
//turn xml special characters into apersand-encoding.
//i'm not sure this is perfectly safe.
const escapeHtml = (s) => {
  const HTML_CHAR_MAP = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    '\'': '&#39;',
    ' ': '&nbsp;'
  };
  return s.replace(/[<>&"' ]/g, function(ch) {
    return HTML_CHAR_MAP[ch];
  });
};

//remove html elements already in the text
//not tested!
//http://stackoverflow.com/questions/295566/sanitize-rewrite-html-on-the-client-side
const sanitize = (html) => {
  const tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
  const tagOrComment = new RegExp(
    '<(?:'
    // Comment body.
    + '!--(?:(?:-*[^->])*--+|-?)'
    // Special "raw text" elements whose content should be elided.
    + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
    + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
    // Regular name
    + '|/?[a-z]'
    + tagBody
    + ')>',
    'gi');
  let oldHtml;
  do {
    oldHtml = html;
    html = html.replace(tagOrComment, '');
  } while (html !== oldHtml);
  return html.replace(/</g, '&lt;');
};

//turn the term into ~properly~ formatted html
const renderHtml = function(t) {
  let classes = Object.keys(t.tag).filter((tag) => tag !== 'Term');
  classes = classes.map(c => 'nl-' + c);
  classes = classes.join(' ');
  let text = sanitize(t.text);
  text = escapeHtml(text);
  let el = '<span class="' + classes + '">' + text + '</span>';
  return escapeHtml(t.whitespace.before) + el + escapeHtml(t.whitespace.after);
};

module.exports = renderHtml;

},{}],167:[function(_dereq_,module,exports){
'use strict';

const addMethods = (Term) => {

  const methods = {
    /** the punctuation at the end of this term*/
    endPunctuation: function() {
      let m = this.text.match(/[a-z]([,:;\/.(\.\.\.)\!\?]+)$/i);
      if (m) {
        const allowed = {
          ',': 'comma',
          ':': 'colon',
          ';': 'semicolon',
          '.': 'period',
          '...': 'elipses',
          '!': 'exclamation',
          '?': 'question'
        };
        if (allowed[m[1]]) {
          return m[1];
        }
      }
      return null;
    },
    setPunctuation: function(punct) {
      this.text = this.text.replace(/[a-z]([,:;\/.(\.\.\.)\!\?]+)$/i, '');
      this.text += punct;
      return this;
    },

    /** check if the term ends with a comma */
    hasComma: function () {
      if (this.endPunctuation() === 'comma') {
        return true;
      }
      return false;
    },

    killPunctuation: function () {
      this.text = this._text.replace(/([,:;\/.(\.\.\.)\!\?]+)$/, '');
      return this;
    },
  };
  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;

},{}],168:[function(_dereq_,module,exports){
'use strict';
const setTag = _dereq_('./setTag');
const unTag = _dereq_('./unTag');
const tagset = _dereq_('./paths').tags;

const addMethods = (Term) => {

  const methods = {
    /** set the term as this part-of-speech */
    tagAs: function(tag, reason) {
      setTag(this, tag, reason);
    },
    /** remove this part-of-speech from the term*/
    unTag: function(tag, reason) {
      unTag(this, tag, reason);
    },

    /** is this tag compatible with this word */
    canBe: function (tag) {
      tag = tag || '';
      tag = tag.replace(/^#/, '');
      let not = tagset[tag].not || [];
      for (let i = 0; i < not.length; i++) {
        if (this.tag[not[i]]) {
          return false;
        }
      }
      return true;
    },

  };

  //hook them into term.prototype
  Object.keys(methods).forEach((k) => {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;

},{"./paths":169,"./setTag":170,"./unTag":171}],169:[function(_dereq_,module,exports){
arguments[4][121][0].apply(exports,arguments)
},{"../../paths":172,"dup":121}],170:[function(_dereq_,module,exports){
'use strict';
//set a term as a particular Part-of-speech
const path = _dereq_('./paths');
const log = path.log;
const tagset = path.tags;
const unTag = _dereq_('./unTag');


const makeCompatible = (term, tag, reason) => {
  if (!tagset[tag]) {
    return;
  }
  //find incompatible tags
  let not = tagset[tag].not || [];
  for (let i = 0; i < not.length; i++) {
    unTag(term, not[i], reason);
  }
};

const tag_one = (term, tag, reason) => {
  //ignore if already tagged
  if (term.tag[tag]) {
    return;
  }
  reason = reason || '';
  //clean first
  makeCompatible(term, tag, reason);
  // unTag(term, tag, reason);
  log.tagAs(term, tag, reason);
  term.tag[tag] = true;
};

const tagAll = function (term, tag, reason) {
  if (!term || !tag || typeof tag !== 'string') {
    // console.log(tag)
    return;
  }
  tag = tag || '';
  tag = tag.replace(/^#/, '');
  tag_one(term, tag, reason);
  //find assumed-tags
  if (tagset[tag]) {
    let tags = tagset[tag].parents || [];
    for (let i = 0; i < tags.length; i++) {
      tag_one(term, tags[i], '-');
    }
  }
};


module.exports = tagAll;
// console.log(tagset['Person']);

},{"./paths":169,"./unTag":171}],171:[function(_dereq_,module,exports){
'use strict';
//set a term as a particular Part-of-speech
const path = _dereq_('./paths');
const log = path.log;
const tagset = path.tags;

//remove a tag from a term
const unTagOne = (term, tag, reason) => {
  if (term.tag[tag]) {
    log.tell('   --' + tag + ' ' + (reason || ''));
    delete term.tag[tag];
  }
};

const unTagAll = (term, tag, reason) => {
  if (!term || !tag) {
    return;
  }
  unTagOne(term, tag, reason);
  if (tagset[tag]) {
    //pull-out their children (dependants) too
    //this should probably be recursive, instead of just 2-deep
    let killAlso = tagset[tag].children || [];
    for (let o = 0; o < killAlso.length; o++) {
      //kill its child
      unTagOne(term, killAlso[o], reason);
      //kill grandchildren too
      let kill2 = tagset[killAlso[o]].children || []
      for (let i2 = 0; i2 < kill2.length; i2++) {
        unTagOne(term, kill2[i2], reason);
      }
    }
  }
  return;
};
module.exports = unTagAll;

},{"./paths":169}],172:[function(_dereq_,module,exports){
module.exports = {
  fns: _dereq_('../fns'),
  log: _dereq_('../log'),
  data: _dereq_('../data'),
  tags: _dereq_('../tags')
};

},{"../data":8,"../fns":40,"../log":42,"../tags":155}],173:[function(_dereq_,module,exports){
'use strict';
//seperate the 'meat' from the trailing/leading whitespace.
//works in concert with ./src/result/tokenize.js
const build_whitespace = (str) => {
  let whitespace = {
    before: '',
    after: ''
  };
  //get before punctuation/whitespace
  let m = str.match(/^(\s|-+|\.\.+)+/);
  if (m) {
    whitespace.before = m[0];
    str = str.replace(/^(\s|-+|\.\.+)+/, '');
  }
  //get after punctuation/whitespace
  m = str.match(/(\s+|-+|\.\.+)$/);
  if (m) {
    str = str.replace(/(\s+|-+|\.\.+)$/, '');
    whitespace.after = m[0];
  }
  return {
    whitespace: whitespace,
    text: str
  };
};
module.exports = build_whitespace;

},{}],174:[function(_dereq_,module,exports){
'use strict';
const Term = _dereq_('../term');

const notWord = {
  '-': true,
  '--': true,
  '...': true,
};

//turn a string into an array of terms (naiive for now, lumped later)
const fromString = function (str) {
  let all = [];
  //start with a naiive split
  str = str || '';
  if (typeof str === 'number') {
    str = '' + str;
  }
  let firstSplit = str.split(/(\S+)/);
  let arr = [];
  for(let i = 0; i < firstSplit.length; i++) {
    let word = firstSplit[i];
    let hasHyphen = word.match(/^([a-z]+)(-)([a-z0-9].*)/i);
    if (hasHyphen) {
      //support multiple-hyphenated-terms
      let hyphens = word.split('-');
      for(let o = 0; o < hyphens.length; o++) {
        if (o === hyphens.length - 1) {
          arr.push(hyphens[o]);
        } else {
          arr.push(hyphens[o] + '-');
        }
      }
    } else {
      arr.push(word);
    }
  }
  //greedy merge whitespace+arr to the right
  let carry = '';
  for (let i = 0; i < arr.length; i++) {
    //if it's more than a whitespace
    if (arr[i].match(/\S/) && !notWord[arr[i]]) {
      all.push(carry + arr[i]);
      carry = '';
    } else {
      carry += arr[i];
    }
  }
  //handle last one
  if (carry && all.length > 0) {
    all[all.length - 1] += carry; //put it on the end
  }
  return all.map((t) => new Term(t));
};
module.exports = fromString;

},{"../term":157}],175:[function(_dereq_,module,exports){
'use strict';
const tagger = _dereq_('./tagger');
const build = _dereq_('./build');

class Terms {
  constructor(arr, lexicon, refText, refTerms) {
    this.terms = arr;
    this.lexicon = lexicon;
    this.refText = refText;
    this._refTerms = refTerms;
    this.count = undefined;
    this.get = (n) => {
      return this.terms[n];
    };
  }
  get found() {
    return this.terms.length > 0;
  }
  get length() {
    return this.terms.length;
  }
  get isA() {
    return 'Terms';
  }
  get refTerms() {
    return this._refTerms || this;
  }
  set refTerms(ts) {
    this._refTerms = ts;
    return this;
  }
  set dirty(dirt) {
    this.terms.forEach((t) => {
      t.dirty = dirt;
    });
  }
  posTag() {
    tagger(this);
    return this;
  }
  firstTerm() {
    return this.terms[0];
  }
  lastTerm() {
    return this.terms[this.terms.length - 1];
  }
  get parent() {
    return this.refText || this;
  }
  set parent(r) {
    this.refText = r;
    return this;
  }
  get parentTerms() {
    return this.refTerms || this;
  }
  set parentTerms(r) {
    this.refTerms = r;
    return this;
  }
  all() {
    return this.parent;
  }
  data() {
    return {
      text: this.out('text'),
      normal: this.out('normal'),
    };
  }
  get whitespace() {
    return {
      before: (str) => {
        this.firstTerm().whitespace.before = str;
        return this;
      },
      after: (str) => {
        this.lastTerm().whitespace.after = str;
        return this;
      },
    };
  }

  static fromString(str, lexicon) {
    let termArr = build(str);
    let ts = new Terms(termArr, lexicon, null);
    //give each term a reference to this ts
    ts.terms.forEach((t) => {
      t.parentTerms = ts;
    });
    ts.posTag();
    return ts;
  }
}
Terms = _dereq_('./match')(Terms);
Terms = _dereq_('./match/not')(Terms);
Terms = _dereq_('./methods/tag')(Terms);
Terms = _dereq_('./methods/loops')(Terms);
Terms = _dereq_('./methods/delete')(Terms);
Terms = _dereq_('./methods/insert')(Terms);
Terms = _dereq_('./methods/misc')(Terms);
Terms = _dereq_('./methods/out')(Terms);
Terms = _dereq_('./methods/replace')(Terms);
Terms = _dereq_('./methods/split')(Terms);
Terms = _dereq_('./methods/transform')(Terms);
module.exports = Terms;

},{"./build":174,"./match":176,"./match/not":182,"./methods/delete":183,"./methods/insert":184,"./methods/loops":185,"./methods/misc":186,"./methods/out":187,"./methods/replace":188,"./methods/split":189,"./methods/tag":190,"./methods/transform":191,"./tagger":203}],176:[function(_dereq_,module,exports){
'use strict';
//
const syntax = _dereq_('./lib/syntax');
const startHere = _dereq_('./lib/startHere');
const Text = _dereq_('../../result/index');
// const diff = require('./diff');



const matchMethods = (Terms) => {

  //support {word:true} whitelist
  const matchObj = function(ts, obj) {
    let matches = ts.terms.filter((t) => obj[t.normal]);
    matches = matches.map((a) => {
      return new Terms([a], ts.lexicon, ts.refText, ts.refTerms);
    });
    return new Text(matches, ts.lexicon, ts.parent);
  };

  //support [word, word] whitelist
  const matchArr = function(r, arr) {
    //its faster this way
    let obj = arr.reduce((h, a) => {
      h[a] = true;
      return h;
    }, {});
    return matchObj(r, obj);
  };

  //support regex-like whitelist-match
  const matchString = function(r, str, verbose) {
    let matches = [];
    let regs = syntax(str);
    for (let t = 0; t < r.terms.length; t++) {
      //don't loop through if '^'
      if (regs[0] && regs[0].starting && t > 0) {
        break;
      }
      let m = startHere(r, t, regs, verbose);
      if (m) {
        matches.push(m);
        //ok, don't try to match these again.
        let skip = m.length - 1;
        t += skip; //this could use some work
      }
    }
    matches = matches.map((a) => {
      return new Terms(a, r.lexicon, r.refText, r.refTerms);
    });
    return new Text(matches, r.lexicon, r.parent);
  };

  const methods = {

    /**match all */
    match: function (want, verbose) {
      //support regex-like whitelist-match
      if (typeof want === 'string') {
        return matchString(this, want, verbose);
      }
      if (typeof want === 'object') {
        let type = Object.prototype.toString.call(want);
        //support [word, word] whitelist
        if (type === '[object Array]') {
          return matchArr(this, want, verbose);
        }
        //support {word:true} whitelist
        if (type === '[object Object]') {
          return matchObj(this, want, verbose);
        }
      }
      return this;
    },

    /**return first match */
    matchOne: function (str) {
      let regs = syntax(str);
      for (let t = 0; t < this.terms.length; t++) {
        //don't loop through if '^'
        if (regs[0] && regs[0].starting && t > 0) {
          break;
        }
        let m = startHere(this, t, regs);
        if (m) {
          return m;
        }
      }
      return null;
    },

    /**return first match */
    has: function (str) {
      let m = this.matchOne(str);
      return !!m;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = matchMethods;

},{"../../result/index":44,"./lib/startHere":180,"./lib/syntax":181}],177:[function(_dereq_,module,exports){
'use strict';
const fns = _dereq_('./paths').fns;

//compare 1 term to one reg
const perfectMatch = (term, reg) => {
  if (!term || !reg) {
    return false;
  }
  //support '.' - any
  if (reg.anyOne) {
    return true;
  }
  //pos-match
  if (reg.tag) {
    for (let i = 0; i < reg.tag.length; i++) {
      let tag = reg.tag[i];
      if (term.tag[tag]) {
        return true;
      }
    }
    return false;
  }
  //one-of term-match
  if (reg.oneOf) {
    for (let i = 0; i < reg.oneOf.length; i++) {
      let str = reg.oneOf[i];
      //try a tag match
      if (str.match(/^#/)) {
        let tag = str.replace(/^#/, '');
        tag = fns.titleCase(tag);
        if (term.tag[tag]) {
          return true;
        }
      //try a string-match
      } else if (term.normal === str || term.text === str) {
        return true;
      }
    }
    return false;
  }
  //text-match
  if (reg.normal) {
    if (term.normal === reg.normal || term.text === reg.normal || term.root === reg.normal) {
      return true;
    }
    //try contraction match too
    if (term.silent_term === reg.normal) {
      return true;
    }
  }
  return false;
};

//wrap above method, to support '!' negation
const isMatch = (term, reg, verbose) => {
  let found = perfectMatch(term, reg, verbose);
  if (reg.negative) {
    found = !!!found;
  }
  return found;
};
module.exports = isMatch;

},{"./paths":179}],178:[function(_dereq_,module,exports){
'use strict';
const fns = _dereq_('./paths').fns;

const almostMatch = (reg_str, term) => {
  return fns.startsWith(term.normal, reg_str);
};

// match ['john', 'smith'] regs, when the term is lumped
const lumpMatch = function(term, regs, reg_i) {
  let reg_str = regs[reg_i].normal;
  //is this a partial match? 'tony'& 'tony hawk'
  if (almostMatch(reg_str, term)) {
    //try to grow it
    for (reg_i = reg_i + 1; reg_i < regs.length; reg_i++) {
      reg_str += ' ' + regs[reg_i].normal;
      //is it now perfect?
      if (reg_str === term.normal) {
        return reg_i;
      }
      //is it still almost?
      if (almostMatch(reg_str, term)) {
        continue;
      }
      return null;
    }
  }
  return null;
};

module.exports = lumpMatch;

},{"./paths":179}],179:[function(_dereq_,module,exports){
module.exports = {
  fns: _dereq_('../../../fns'),
  log: _dereq_('../../../log'),
};

},{"../../../fns":40,"../../../log":42}],180:[function(_dereq_,module,exports){
'use strict';
const lumpMatch = _dereq_('./lumpMatch');
const isMatch = _dereq_('./isMatch');

// match everything until this point - '*'
const greedyUntil = (ts, i, reg) => {
  for (i = i; i < ts.length; i++) {
    let t = ts.terms[i];
    if (isMatch(t, reg)) {
      return i;
    }
  }
  return null;
};

//keep matching this reg as long as possible
const greedyOf = (ts, i, reg, until) => {
  for (i = i; i < ts.length; i++) {
    let t = ts.terms[i];
    //found next reg ('until')
    if (until && isMatch(t, until)) {
      return i;
    }
    //die here
    if (!isMatch(t, reg)) {
      return i;
    }
  }
  return i;
};

//try and match all regs, starting at this term
const startHere = (ts, startAt, regs, verbose) => {
  let term_i = startAt;
  //check each regex-thing
  for (let reg_i = 0; reg_i < regs.length; reg_i++) {
    let term = ts.terms[term_i];
    let reg = regs[reg_i];
    let next_reg = regs[reg_i + 1];

    if (!term) {
      //we didn't need it anyways
      if (reg.optional) {
        continue;
      }
      return null;
    }

    //catch '^' errors
    if (reg.starting && term_i > 0) {
      return null;
    }

    //catch '$' errors
    if (reg.ending && term_i !== ts.length - 1 && !reg.minMax) {
      return null;
    }

    //support '*'
    if (regs[reg_i].astrix) {
      //just grab until the end..
      if (!next_reg) {
        return ts.terms.slice(startAt, ts.length);
      }
      let foundAt = greedyUntil(ts, term_i, regs[reg_i + 1]);
      if (!foundAt) {
        return null;
      }
      term_i = foundAt + 1;
      reg_i += 1;
      continue;
    }

    //support '{x,y}'
    if (regs[reg_i].minMax) {
      //on last reg?
      if (!next_reg) {
        let len = ts.length;
        let max = regs[reg_i].minMax.max + startAt;
        //if it must go to the end, but can't
        if (regs[reg_i].ending && max < len) {
          return null;
        }
        //dont grab past the end
        if (max < len) {
          len = max;
        }
        return ts.terms.slice(startAt, len);
      }
      //otherwise, match until this next thing
      let foundAt = greedyUntil(ts, term_i, next_reg);
      if (!foundAt) {
        return null;
      }
      //if it's too close/far..
      let minMax = regs[reg_i].minMax;
      if (foundAt < minMax.min || foundAt > minMax.max) {
        return null;
      }
      term_i = foundAt + 1;
      reg_i += 1;
      continue;
    }

    //if optional, check next one
    if (reg.optional) {
      let until = regs[reg_i + 1];
      term_i = greedyOf(ts, term_i, reg, until);
      continue;
    }

    //check a perfect match
    if (isMatch(term, reg, verbose)) {
      term_i += 1;
      //try to greedy-match '+'
      if (reg.consecutive) {
        let until = regs[reg_i + 1];
        term_i = greedyOf(ts, term_i, reg, until);
      }
      continue;
    }

    if (term.silent_term && !term.normal) { //skip over silent contraction terms
      //we will continue on it, but not start on it
      if (reg_i === 0) {
        return null;
      }
      //try the next term, but with this regex again
      term_i += 1;
      reg_i -= 1;
      continue;
    }

    //handle partial-matches of lumped terms
    let lumpUntil = lumpMatch(term, regs, reg_i);
    if (lumpUntil) {
      reg_i = lumpUntil;
      term_i += 1;
      continue;
    }


    //was it optional anways?
    if (reg.optional) {
      continue;
    }
    return null;
  }
  return ts.terms.slice(startAt, term_i);
};

module.exports = startHere;

},{"./isMatch":177,"./lumpMatch":178}],181:[function(_dereq_,module,exports){
'use strict';
// parse a search lookup term find the regex-like syntax in this term
const fns = _dereq_('./paths').fns;

//turn 'regex-like' search string into parsed json
const parse_term = function (term) {
  term = term || '';
  term = term.trim();
  let reg = {
    optional: false
  };
  //order matters..

  //negation ! flag
  if (fns.startsWith(term, '!')) {
    term = term.substr(1, term.length);
    reg.negative = true;
  }
  //leading ^ flag
  if (fns.startsWith(term, '^')) {
    term = term.substr(1, term.length);
    reg.starting = true;
  }
  //trailing $ flag means ending
  if (fns.endsWith(term, '$')) {
    term = term.replace(/\$$/, '');
    reg.ending = true;
  }
  //optional flag
  if (fns.endsWith(term, '?')) {
    term = term.replace(/\?$/, '');
    reg.optional = true;
  }
  //atleast-one-but-greedy flag
  if (fns.endsWith(term, '+')) {
    term = term.replace(/\+$/, '');
    reg.consecutive = true;
  }
  //pos flag
  if (fns.startsWith(term, '#')) {
    term = term.replace(/^\#/, '');
    reg.tag = [fns.titleCase(term)];
    term = null;
  }
  //one_of options flag
  if (fns.startsWith(term, '(') && fns.endsWith(term, ')')) {
    term = term.replace(/\)$/, '');
    term = term.replace(/^\(/, '');
    reg.oneOf = term.split(/\|/g);
    term = null;
  }
  //min/max any '{1,3}'
  if (fns.startsWith(term, '{') && fns.endsWith(term, '}')) {
    let m = term.match(/\{([0-9]+), ?([0-9]+)\}/);
    reg.minMax = {
      min: parseInt(m[1], 10),
      max: parseInt(m[2], 10)
    };
    term = null;
  }
  //a period means any one term
  if (term === '.') {
    reg.anyOne = true;
    term = null;
  }
  //a * means anything until sentence end
  if (term === '*') {
    reg.astrix = true;
    term = null;
  }
  reg.normal = term;
  if (reg.normal) {
    reg.normal = reg.normal.toLowerCase();
  }
  return reg;
};

//turn a match string into an array of objects
const parse_all = function (reg) {
  reg = reg || '';
  reg = reg.split(/ +/);
  return reg.map(parse_term);
};
// console.log(parse_all(''));

module.exports = parse_all;

},{"./paths":179}],182:[function(_dereq_,module,exports){
'use strict';
//
const syntax = _dereq_('./lib/syntax');
const startHere = _dereq_('./lib/startHere');
const Text = _dereq_('../../result/index');
// const diff = require('./diff');

const addfns = (Terms) => {

  const fns = {
    //blacklist from a {word:true} object
    notObj: function(r, obj) {
      let matches = [];
      let current = [];
      r.terms.forEach((t) => { //TODO: support multi-word blacklists
        //we should blacklist this term
        if (obj.hasOwnProperty(t.normal)) {
          if (current.length) {
            matches.push(current);
          }
          current = [];
        } else {
          current.push(t);
        }
      });
      //add remainder
      if (current.length) {
        matches.push(current);
      }
      matches = matches.map((a) => {
        return new Terms(a, r.lexicon, r.refText, r.refTerms);
      });
      return new Text(matches, r.lexicon, r.parent);
    },

    //blacklist from a match string
    notString : function(r, want, verbose) {
      let matches = [];
      let regs = syntax(want);
      let terms = [];
      //try the match starting from each term
      for(let i = 0; i < r.terms.length; i++) {
        let bad = startHere(r, i, regs, verbose);
        if (bad) {
          //reset matches
          if (terms.length > 0) {
            matches.push(terms);
            terms = [];
          }
          //skip these terms now
          i += bad.length - 1;
          continue;
        }
        terms.push(r.terms[i]);
      }
      //remaining ones
      if (terms.length > 0) {
        matches.push(terms);
      }
      matches = matches.map((a) => {
        return new Terms(a, r.lexicon, r.refText, r.refTerms);
      });
      // return matches
      return new Text(matches, r.lexicon, r.parent);
    }
  };
  //blacklist from a [word, word] array
  fns.notArray = function(r, arr) {
    let obj = arr.reduce((h, a) => {
      h[a] = true;
      return h;
    }, {});
    return fns.notObj(r, obj);
  };

  /**return everything but these matches*/
  Terms.prototype.not = function(want, verbose) {
    //support [word, word] blacklist
    if (typeof want === 'object') {
      let type = Object.prototype.toString.call(want);
      if (type === '[object Array]') {
        return fns.notArray(this, want, verbose);
      }
      if (type === '[object Object]') {
        return fns.notObj(this, want, verbose);
      }
    }
    if (typeof want === 'string') {
      return fns.notString(this, want, verbose);
    }
    return this;
  };
  return Terms;
};

module.exports = addfns;

},{"../../result/index":44,"./lib/startHere":180,"./lib/syntax":181}],183:[function(_dereq_,module,exports){
'use strict';
const mutate = _dereq_('../mutate');

const deleteMethods = (Terms) => {

  const methods = {

    delete: function (reg) {
      //don't touch parent if empty
      if (!this.found) {
        return this;
      }
      //remove all selected
      if (!reg) {
        this.parentTerms = mutate.deleteThese(this.parentTerms, this);
        return this;
      }
      //only remove a portion of this
      let found = this.match(reg);
      if (found.found) {
        let r = mutate.deleteThese(this, found);
        return r;
      }
      return this.parentTerms;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = deleteMethods;

},{"../mutate":192}],184:[function(_dereq_,module,exports){
'use strict';
const mutate = _dereq_('../mutate');

//whitespace
const addSpaceAt = (ts, i) => {
  if (!ts.terms.length || !ts.terms[i]) {
    return ts;
  }
  ts.terms[i].whitespace.before = ' ';
  return ts;
};

const insertMethods = (Terms) => {

  //accept any sorta thing
  const ensureTerms = function(input) {
    if (input.isA === 'Terms') {
      return input;
    }
    if (input.isA === 'Term') {
      return new Terms([input]);
    }
    return Terms.fromString(input);
  };

  const methods = {

    insertBefore: function (input, tag) {
      let original_l = this.terms.length;
      let ts = ensureTerms(input);
      if (tag) {
        ts.tagAs(tag);
      }
      let index = this.index();
      //pad a space on parent
      addSpaceAt(this.parentTerms, index);
      if (index > 0) {
        addSpaceAt(ts, 0); //if in middle of sentence
      }
      this.parentTerms.terms = mutate.insertAt(this.parentTerms.terms, index, ts);
      //also copy them to current selection
      if (this.terms.length === original_l) {
        this.terms = ts.terms.concat(this.terms);
      }
      return this;
    },

    insertAfter: function (input, tag) {
      let original_l = this.terms.length;
      let ts = ensureTerms(input);
      if (tag) {
        ts.tagAs(tag);
      }
      let index = this.terms[this.terms.length - 1].index();
      //beginning whitespace to ts
      addSpaceAt(ts, 0);
      this.parentTerms.terms = mutate.insertAt(this.parentTerms.terms, index + 1, ts);
      //also copy them to current selection
      if (this.terms.length === original_l) {
        this.terms = this.terms.concat(ts.terms);
      }
      return this;
    },

    insertAt: function (index, input, tag) {
      if (index < 0) {
        index = 0;
      }
      let original_l = this.terms.length;
      let ts = ensureTerms(input);
      //tag that thing too
      if (tag) {
        ts.tagAs(tag);
      }
      if (index > 0) {
        addSpaceAt(ts, 0); //if in middle of sentence
      }
      this.parentTerms.terms = mutate.insertAt(this.parentTerms.terms, index, ts);
      //also copy them to current selection
      if (this.terms.length === original_l) {
        //splice the new terms into this (yikes!)
        Array.prototype.splice.apply(this.terms, [index, 0].concat(ts.terms));
      }
      //beginning whitespace to ts
      if (index === 0) {
        this.terms[0].whitespace.before = '';
        ts.terms[ts.terms.length - 1].whitespace.after = ' ';
      }
      return this;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = insertMethods;

},{"../mutate":192}],185:[function(_dereq_,module,exports){
'use strict';
//these methods are simply term-methods called in a loop

const addMethods = (Terms) => {

  const foreach = [
    // ['tagAs'],
    // ['unTag'],
    // ['canBe'],
    ['toUpperCase', 'UpperCase'],
    ['toLowerCase'],
    ['toTitleCase', 'TitleCase'],
  // ['toCamelCase', 'CamelCase'],
  ];

  foreach.forEach((arr) => {
    let k = arr[0];
    let tag = arr[1];
    let myFn = function () {
      let args = arguments;
      this.terms.forEach((t) => {
        t[k].apply(t, args);
      });
      if (tag) {
        this.tagAs(tag, k);
      }
      return this;
    };
    Terms.prototype[k] = myFn;
  });
  return Terms;
};

module.exports = addMethods;

},{}],186:[function(_dereq_,module,exports){
'use strict';

const miscMethods = (Terms) => {

  const methods = {
    term: function (n) {
      return this.terms[n];
    },
    first: function () {
      let t = this.terms[0];
      return new Terms([t], this.lexicon, this.refText, this.refTerms);
    },
    last: function () {
      let t = this.terms[this.terms.length - 1];
      return new Terms([t], this.lexicon, this.refText, this.refTerms);
    },
    slice: function (start, end) {
      let terms = this.terms.slice(start, end);
      return new Terms(terms, this.lexicon, this.refText, this.refTerms);
    },
    endPunctuation: function () {
      return this.last().terms[0].endPunctuation();
    },
    canBe: function (tag) {
      tag = tag || '';
      tag = tag.replace(/^#/, '');
      //atleast one of these
      for (let i = 0; i < this.terms.length; i++) {
        if (!this.terms[i].canBe(tag)) {
          return false;
        }
      }
      return true;
    },
    index: function() {
      let parent = this.parentTerms;
      let first = this.terms[0];
      if (!parent || !first) {
        return null; //maybe..
      }
      for(let i = 0; i < parent.terms.length; i++) {
        if (first === parent.terms[i]) {
          return i;
        }
      }
      return null;
    },
    termIndex: function() {
      let first = this.terms[0];
      let ref = this.refText || this;
      if (!ref || !first) {
        return null; //maybe..
      }
      // console.log(ref);
      let n = 0;
      for(let i = 0; i < ref.list.length; i++) {
        let ts = ref.list[i];
        for(let o = 0; o < ts.terms.length; o++) {
          if (ts.terms[o] === first) {
            return n;
          }
          n += 1;
        }
      }
      return n;
    },
    //number of characters in this match
    chars() {
      return this.terms.reduce((i, t) => {
        i += t.whitespace.before.length;
        i += t.text.length;
        i += t.whitespace.after.length;
        return i;
      }, 0);
    },
    //just .length
    wordCount() {
      return this.terms.length;
    },

    //this has term-order logic, so has to be here
    toCamelCase: function() {
      this.toTitleCase();
      this.terms.forEach((t, i) => {
        if (i !== 0) {
          t.whitespace.before = '';
        }
        t.whitespace.after = '';
      });
      this.tagAs('#CamelCase', 'toCamelCase');
      return this;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = miscMethods;

},{}],187:[function(_dereq_,module,exports){
'use strict';
const fns = _dereq_('../paths').fns;

const methods = {
  text: function (ts) {
    return ts.terms.reduce((str, t) => {
      str += t.out('text');
      return str;
    }, '');
  },

  normal: function (ts) {
    let terms = ts.terms.filter((t) => {
      return t.text;
    });
    terms = terms.map((t) => {
      return t.normal; //+ punct;
    });
    return terms.join(' ');
  },

  grid: function(ts) {
    var str = '  ';
    str += ts.terms.reduce((s, t) => {
      s += fns.leftPad(t.text, 11);
      return s;
    }, '');
    return str + '\n\n';
  },

  color: function(ts) {
    return ts.terms.reduce((s, t) => {
      s += fns.printTerm(t);
      return s;
    }, '');
  },
  /** no punctuation, fancy business **/
  root: function (ts) {
    return ts.terms.filter((t) => t.text).map((t) => t.normal).join(' ').toLowerCase();
  },

  html: function (ts) {
    return ts.terms.map((t) => t.render.html()).join(' ');
  },
  debug: function(ts) {
    ts.terms.forEach((t) => {
      t.out('debug');
    });
  }
};
methods.plaintext = methods.text;
methods.normalize = methods.normal;
methods.normalized = methods.normal;
methods.colors = methods.color;
methods.tags = methods.terms;


const renderMethods = (Terms) => {
  Terms.prototype.out = function(str) {
    if (methods[str]) {
      return methods[str](this);
    }
    return methods.text(this);
  };
  //check method
  Terms.prototype.debug = function () {
    return methods.debug(this);
  };
  return Terms;
};

module.exports = renderMethods;

},{"../paths":193}],188:[function(_dereq_,module,exports){
'use strict';
const mutate = _dereq_('../mutate');

const replaceMethods = (Terms) => {
  const methods = {

    /**swap this for that */
    replace: function (str1, str2) {
      //in this form, we 'replaceWith'
      if (str2 === undefined) {
        return this.replaceWith(str1);
      }
      this.match(str1).replaceWith(str2);
      return this;
    },


    /**swap this for that */
    replaceWith: function (str, tag) {
      let toAdd = Terms.fromString(str);
      if (tag) {
        toAdd.tagAs(tag, 'user-given');
      }
      let index = this.index();
      this.parentTerms = mutate.deleteThese(this.parentTerms, this);
      this.parentTerms.terms = mutate.insertAt(this.parentTerms.terms, index, toAdd);
      this.terms = toAdd.terms;
      return this;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = replaceMethods;

},{"../mutate":192}],189:[function(_dereq_,module,exports){
'use strict';

//break apart a termlist into (before, match after)
const breakUpHere = (terms, ts) => {
  let firstTerm = ts.terms[0];
  let len = ts.terms.length;
  for (let i = 0; i < terms.length; i++) {
    if (terms[i] === firstTerm) {
      return {
        before: terms.slice(0, i),
        match: terms.slice(i, i + len),
        after: terms.slice(i + len, terms.length),
      };
    }
  }
  return {
    after: terms
  };
};

const splitMethods = (Terms) => {

  const methods = {

    /** at the end of the match, split the terms **/
    splitAfter: function (reg, verbose) {
      let ms = this.match(reg, verbose); //Array[ts]
      let termArr = this.terms;
      let all = [];
      ms.list.forEach((lookFor) => {
        let section = breakUpHere(termArr, lookFor);
        if (section.before && section.match) {
          all.push(section.before.concat(section.match));
        }
        termArr = section.after;
      });
      //add the remaining
      if (termArr.length) {
        all.push(termArr);
      }
      //make them termlists
      all = all.map((ts) => {
        let parent = this.refText; //|| this;
        return new Terms(ts, this.lexicon, parent, this.refTerms);
      });
      return all;
    },

    /** return only before & after  the match**/
    splitOn: function (reg, verbose) {
      let ms = this.match(reg, verbose); //Array[ts]
      let termArr = this.terms;
      let all = [];
      ms.list.forEach((lookFor) => {
        let section = breakUpHere(termArr, lookFor);
        if (section.before) {
          all.push(section.before);
        }
        if (section.match) {
          all.push(section.match);
        }
        termArr = section.after;
      });
      //add the remaining
      if (termArr.length) {
        all.push(termArr);
      }
      //make them termlists
      all = all.filter(a => a && a.length);
      all = all.map((ts) => new Terms(ts, ts.lexicon, ts.refText, this.refTerms));
      return all;
    },

    /** at the start of the match, split the terms**/
    splitBefore: function (reg, verbose) {
      let ms = this.match(reg, verbose); //Array[ts]
      let termArr = this.terms;
      let all = [];
      ms.list.forEach((lookFor) => {
        let section = breakUpHere(termArr, lookFor);
        if (section.before) {
          all.push(section.before);
        }
        if (section.match) {
          all.push(section.match);
        }
        termArr = section.after;
      });
      //add the remaining
      if (termArr.length) {
        all.push(termArr);
      }
      //cleanup-step: merge all (middle) matches with the next one
      for (let i = 0; i < all.length; i++) {
        for (let o = 0; o < ms.length; o++) {
          if (ms.list[o].terms[0] === all[i][0]) {
            if (all[i + 1]) {
              all[i] = all[i].concat(all[i + 1]);
              all[i + 1] = [];
            }
          }
        }
      }
      //make them termlists
      all = all.filter(a => a && a.length);
      all = all.map((ts) => new Terms(ts, ts.lexicon, ts.refText, this.refTerms));
      return all;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = splitMethods;
exports = splitMethods;

},{}],190:[function(_dereq_,module,exports){
'use strict';

const addMethods = (Terms) => {

  const methods = {
    tagAs: function (tag, reason) {
      this.terms.forEach((t) => {
        t.tagAs(tag, reason);
      });
    },
    unTag: function (tag, reason) {
      this.terms.forEach((t) => {
        t.unTag(tag, reason);
      });
    },
    canBe: function (tag, reason) {
      this.terms.forEach((t) => {
        t.canBe(tag, reason);
      });
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = addMethods;

},{}],191:[function(_dereq_,module,exports){
'use strict';

const transforms = (Terms) => {

  const methods = {

    clone: function () {
      let terms = this.terms.map((t) => {
        return t.clone();
      });
      return new Terms(terms, this.lexicon, this.refText, null); //, this.refTerms
    },
    hyphenate: function () {
      this.terms.forEach((t, i) => {
        if (i !== this.terms.length - 1) {
          t.whitespace.after = '-';
        }
        if (i !== 0) {
          t.whitespace.before = '';
        }
      });
      return this;
    },
    dehyphenate: function () {
      this.terms.forEach((t) => {
        if (t.whitespace.after === '-') {
          t.whitespace.after = ' ';
        }
      });
      return this;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = transforms;

},{}],192:[function(_dereq_,module,exports){
'use strict';
//
const getTerms = (needle) => {
  let arr = [];
  if (needle.isA === 'Terms') {
    arr = needle.terms;
  } else if (needle.isA === 'Text') {
    arr = needle.flatten().list[0].terms;
  } else if (needle.isA === 'Term') {
    arr = [needle];
  }
  return arr;
};

//remove them
exports.deleteThese = (source, needle) => {
  let arr = getTerms(needle);
  source.terms = source.terms.filter((t) => {
    for (let i = 0; i < arr.length; i++) {
      if (t === arr[i]) {
        return false;
      }
    }
    return true;
  });
  return source;
};

//add them
exports.insertAt = (terms, i, needle) => {
  needle.dirty = true;
  let arr = getTerms(needle);
  //handle whitespace
  if (i > 0 && arr[0]) {
    arr[0].whitespace.before = ' ';
  }
  //gnarly splice
  //-( basically  - terms.splice(i+1, 0, arr) )
  Array.prototype.splice.apply(terms, [i, 0].concat(arr));
  return terms;
};

},{}],193:[function(_dereq_,module,exports){
module.exports = {
  data: _dereq_('../data/index'),
  lexicon: _dereq_('../data/lexicon'),
  fns: _dereq_('../fns'),
  log: _dereq_('../log'),
  Term: _dereq_('../term')
};

},{"../data/index":8,"../data/lexicon":9,"../fns":40,"../log":42,"../term":157}],194:[function(_dereq_,module,exports){
'use strict';
const fixContraction = _dereq_('./fix');

const irregulars = {
  'wanna': ['want', 'to'],
  'gonna': ['going', 'to'],
  'im': ['i', 'am'],
  'alot': ['a', 'lot'],

  'dont': ['do', 'not'],
  'dun': ['do', 'not'],

  'ive': ['i', 'have'],

  'won\'t': ['will', 'not'],
  'wont': ['will', 'not'],

  'can\'t': ['can', 'not'],
  'cant': ['can', 'not'],
  'cannot': ['can', 'not'],

  'aint': ['is', 'not'], //or 'are'
  'ain\'t': ['is', 'not'],
  'shan\'t': ['should', 'not'],
  'imma': ['I', 'will'],

  'where\'d': ['where', 'did'],
  'whered': ['where', 'did'],
  'when\'d': ['when', 'did'],
  'whend': ['when', 'did'],
  'how\'d': ['how', 'did'],
  'howd': ['how', 'did'],
  'what\'d': ['what', 'did'],
  'whatd': ['what', 'did'],
  'let\'s': ['let', 'us'],

  //multiple word contractions
  'dunno': ['do', 'not', 'know'],
  'brb': ['be', 'right', 'back'],
  'gtg': ['got', 'to', 'go'],
  'irl': ['in', 'real', 'life'],
  'tbh': ['to', 'be', 'honest'],
  'imo': ['in', 'my', 'opinion'],
  'til': ['today', 'i', 'learned'],
  'rn': ['right', 'now'],
// 'idk': ['i', 'don\'t', 'know'],
};

//check irregulars
const checkIrregulars = (ts) => {
  let irreg = Object.keys(irregulars);
  for(let i = 0; i < irreg.length; i++) {
    for(let t = 0; t < ts.terms.length; t++) {
      if (ts.terms[t].normal === irreg[i]) {
        let fix = irregulars[irreg[i]];
        ts = fixContraction(ts, fix, t);
        break;
      }
    }
  }
  return ts;
};
module.exports = checkIrregulars;

},{"./fix":198}],195:[function(_dereq_,module,exports){
'use strict';
const fixContraction = _dereq_('./fix');
const splitContraction = _dereq_('./split');


//these are always contractions
// const blacklist = {
//   'it\'s': true,
//   'that\'s': true
// };

// //rocket's red glare
// if (nextWord.tag['Adjective'] && terms.get(x + 2) && terms.get(x + 2).tag['Noun']) {
//   return true;
// }
// //next word is an adjective
// if (nextWord.tag['Adjective'] || nextWord.tag['Verb'] || nextWord.tag['Adverb']) {
//   return false;
// }



// "'s" may be a contraction or a possessive
// 'spencer's house' vs 'spencer's good'
const isPossessive = (ts, i) => {
  let t = ts.terms[i];
  let next_t = ts.terms[i + 1];
  //a pronoun can't be possessive - "he's house"
  if (t.tag.Pronoun || t.tag.QuestionWord) {
    return false;
  }
  //if end of sentence, it is possessive - "was spencer's"
  if (!next_t) {
    return true;
  }
  //a gerund suggests 'is walking'
  if (next_t.tag.VerbPhrase) {
    return false;
  }
  //spencer's house
  if (next_t.tag.Noun) {
    return true;
  }
  //rocket's red glare
  if (next_t.tag.Adjective && ts.terms[i + 2] && ts.terms[i + 2].tag.Noun) {
    return true;
  }
  //an adjective suggests 'is good'
  if (next_t.tag.Adjective || next_t.tag.Adverb || next_t.tag.Verb) {
    return false;
  }
  return false;
};


//handle ambigous contraction "'s"
const hardOne = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    //skip existing
    if (ts.terms[i].silent_term) {
      continue;
    }
    let parts = splitContraction(ts.terms[i]);
    if (parts) {
      //have we found a hard one
      if (parts.end === 's') {
        //spencer's house
        if (isPossessive(ts, i)) {
          ts.terms[i].tagAs('#Possessive', 'hard-contraction');
          // console.log('==possessive==');
          continue;
        }
        //is vs was
        let arr = [parts.start, 'is'];
        ts = fixContraction(ts, arr, i);
        i += 1;
      }
    }
  }
  return ts;
};

module.exports = hardOne;

},{"./fix":198,"./split":200}],196:[function(_dereq_,module,exports){
'use strict';
const fixContraction = _dereq_('./fix');
const split = _dereq_('./split');

//the formulaic contraction types:
const easy_ends = {
  'll': 'will',
  'd': 'would',
  've': 'have',
  're': 'are',
  'm': 'am',
  'n\'t': 'not'
//these ones are a bit tricksier:
// 't': 'not',
// 's': 'is' //or was
};


//unambiguous contractions, like "'ll"
const easyOnes = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    //skip existing
    if (ts.terms[i].silent_term) {
      continue;
    }
    let parts = split(ts.terms[i]);
    if (parts) {
      //make sure its an easy one
      if (easy_ends[parts.end]) {
        let arr = [
          parts.start,
          easy_ends[parts.end]
        ];
        ts = fixContraction(ts, arr, i);
        i += 1;
      }
    }
  }
  return ts;
};
module.exports = easyOnes;

},{"./fix":198,"./split":200}],197:[function(_dereq_,module,exports){
'use strict';
const fixContraction = _dereq_('./fix');
const Term = _dereq_('../../../term');

const numberRange = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //skip existing
    if (t.silent_term) {
      continue;
    }
    //hyphens found in whitespace - '5 - 7'
    if (t.tag.Value && i > 0 && t.whitespace.before === ' - ') {
      let to = new Term('');
      to.silent_term = 'to';
      ts.insertAt(i, to);
      ts.terms[i - 1].tagAs('NumberRange');
      ts.terms[i].tagAs('NumberRange');
      ts.terms[i].whitespace.before = '';
      ts.terms[i].whitespace.after = '';
      ts.terms[i + 1].tagAs('NumberRange');
      return ts;
    }
    if (t.tag.NumberRange) {
      let arr = t.text.split(/(-)/);
      arr[1] = 'to';
      ts = fixContraction(ts, arr, i);
      ts.terms[i].tagAs('NumberRange');
      ts.terms[i + 1].tagAs('NumberRange');
      ts.terms[i + 2].tagAs('NumberRange');
      i += 2;
    }
  }
  return ts;
};
module.exports = numberRange;

},{"../../../term":157,"./fix":198}],198:[function(_dereq_,module,exports){
'use strict';
const Term = _dereq_('../../../term');

const tags = {
  'not': 'Negative',
  'will': 'Verb',
  'would': 'Modal',
  'have': 'Verb',
  'are': 'Copula',
  'is': 'Copula',
  'am': 'Verb',
};
//make sure the newly created term gets the easy tags
const easyTag = (t) => {
  if (tags[t.silent_term]) {
    t.tagAs(tags[t.silent_term]);
  }
};


//add a silent term
const fixContraction = (ts, parts, i) => {
  //add the interpretation to the contracted term
  let one = ts.terms[i];
  one.silent_term = parts[0];
  //tag it as a contraction
  one.tagAs('Contraction', 'tagger-contraction');

  //add a new empty term
  let two = new Term('');
  two.silent_term = parts[1];
  two.tagAs('Contraction', 'tagger-contraction');
  ts.insertAt(i + 1, two);
  //ensure new term has no auto-whitspace
  two.whitespace.before = '';
  two.whitespace.after = '';
  easyTag(two);

  //potentially it's three-contracted-terms, like 'dunno'
  if (parts[2]) {
    let three = new Term('');
    three.silent_term = parts[2];
    // ts.terms.push(three);
    ts.insertAt(i + 2, three);
    three.tagAs('Contraction', 'tagger-contraction');
    easyTag(three);
  }

  return ts;
};

module.exports = fixContraction;

},{"../../../term":157}],199:[function(_dereq_,module,exports){
'use strict';
const irregulars = _dereq_('./01-irregulars');
const hardOne = _dereq_('./02-hardOne');
const easyOnes = _dereq_('./03-easyOnes');
const numberRange = _dereq_('./04-numberRange');

//find and pull-apart contractions
const interpret = function(ts) {
  //check irregulars
  ts = irregulars(ts);
  //guess-at ambiguous "'s" one
  ts = hardOne(ts);
  //check easy ones
  ts = easyOnes(ts);
  //5-7
  ts = numberRange(ts);
  return ts;
};

module.exports = interpret;

},{"./01-irregulars":194,"./02-hardOne":195,"./03-easyOnes":196,"./04-numberRange":197}],200:[function(_dereq_,module,exports){
'use strict';

const allowed = {
  're': true,
  've': true,
  'll': true,
  't': true,
  's': true,
  'd': true,
  'm': true
};
/** interpret a terms' contraction */
const splitContraction = (t) => {
  let parts = t.text.match(/^([a-z]+)'([a-z][a-z]?)$/i);
  if (parts && parts[1] && allowed[parts[2]]) {
    //handle n't
    if (parts[2] === 't' && parts[1].match(/[a-z]n$/)) {
      parts[1] = parts[1].replace(/n$/, '');
      parts[2] = 'n\'t'; //dunno..
    }
    //fix titlecase
    if (t.tag.TitleCase) {
      parts[1] = parts[1].replace(/^[a-z]/, (x) => x.toUpperCase());
    }
    return {
      start: parts[1],
      end: parts[2]
    };
  }
  // "flanders' house"
  parts = t.text.match(/[a-z]s'$/i);
  if (parts) {
    return {
      start: t.normal.replace(/s'?$/, ''),
      end: ''
    };
  }
  return null;
};
module.exports = splitContraction;

},{}],201:[function(_dereq_,module,exports){
'use strict';
const log = _dereq_('../paths').log;
const path = 'correction';
const verb_corrections = _dereq_('./verb_corrections');

//mostly pos-corections here
const corrections = function (r) {
  log.here(path);
  //ambig prepositions/conjunctions
  //so funny
  r.match('so #Adjective').match('so').tag('Adverb', 'so-adv');
  //so the
  r.match('so #Noun').match('so').tag('Conjunction', 'so-conj');
  //do so
  r.match('do so').match('so').tag('Noun', 'so-noun');
  //still good
  r.match('still #Adjective').match('still').tag('Adverb', 'still-advb');
  //'more' is not always an adverb
  r.match('more #Noun').tag('Noun', 'more-noun');
  //still make
  r.match('still #Verb').term(0).tag('Adverb', 'still-verb');
  //the word 'second'
  r.match('second #Noun').term(0).unTag('Unit').tag('Ordinal', 'second-noun');
  //foot/feet
  r.match('(foot|feet)').tag('Noun', 'foot-noun');
  r.match('#Value (foot|feet)').match('(foot|feet)').tag('Unit', 'foot-unit');
  //the word 'how'
  r.match('how (#Copula|#Modal|#PastTense)').term(0).tag('QuestionWord', 'how-question');
  //will secure our
  r.match('will #Adjective').term(1).tag('Verb', 'will-adj');
  //'u' as pronoun
  r.match('u #Verb').term(0).tag('Pronoun', 'u-pronoun-1');
  r.match('#Conjunction u').term(1).tag('Pronoun', 'u-pronoun-2');
  //is no walk
  r.match('is no #Verb').term(2).tag('Noun', 'is-no-verb');

  //Determiner-signals
  //the wait to vote
  r.match('the #Verb #Preposition .').match('#Verb').tag('Noun', 'correction-determiner1');
  //the swim
  r.match('the #Verb').match('#Verb').tag('Noun', 'correction-determiner2');
  //the nice swim
  r.match('the #Adjective #Verb').match('#Verb').tag('Noun', 'correction-determiner3');
  //the truly nice swim
  r.match('the #Adverb #Adjective #Verb').match('#Verb').tag('Noun', 'correction-determiner4');

  //organization
  r.match('#Organization of the? #TitleCase').tag('Organization', 'org-of-place');
  r.match('#Organization #Country').tag('Organization', 'org-country');
  r.match('(world|global|international|national|#Demonym) #Organization').tag('Organization', 'global-org');
  r.match('#TitleCase (ltd|co|inc|dept|assn|bros)').tag('Organization', 'org-abbrv');

  //a sense of
  r.match('#Determiner #Verb of').term(1).tag('Noun', 'the-verb-of');
  //he quickly foo
  r.match('#Noun #Adverb #Noun').term(2).tag('Verb', 'correction');
  //is eager to go
  r.match('#Copula #Adjective to #Verb').match('#Adjective to').tag('Verb', 'correction');
  //different views than
  r.match('#Verb than').term(0).tag('Noun', 'correction');
  //her polling
  r.match('#Possessive #Verb').term(1).tag('Noun', 'correction-possessive');
  //like
  r.match('just like').term(1).tag('Preposition', 'like-preposition');
  //folks like her
  r.match('#Noun like #Noun').term(1).tag('Preposition', 'correction');
  //the threat of force
  r.match('#Determiner #Noun of #Verb').match('#Verb').tag('Noun', 'noun-of-noun');
  //big dreams, critical thinking
  r.match('#Adjective #PresentTense').term(1).tag('Noun', 'adj-presentTense');
  //my buddy
  r.match('#Possessive #FirstName').term(1).unTag('Person', 'possessive-name');
  //'a/an' can mean 1
  r.match('(a|an) (#Duration|#Value)').ifNo('#Plural').term(0).tag('Value', 'a-is-one');
  //half a million
  r.match('half a? #Value').tag('Value', 'half-a-value'); //quarter not ready
  r.match('#Value and a (half|quarter)').tag('Value', 'value-and-a-half');
  //all values are either ordinal or cardinal
  r.match('#Value').match('!#Ordinal').tag('#Cardinal', 'not-ordinal');

  //money
  r.match('#Value+ #Currency').tag('Money', 'value-currency');
  r.match('#Money and #Money #Currency?').tag('Money', 'money-and-money');

  //swear-words as non-expression POS
  //nsfw
  r.match('holy (shit|fuck|hell)').tag('Expression', 'swears-expression');
  r.match('#Determiner (shit|damn|hell)').term(1).tag('Noun', 'swears-noun');
  r.match('(shit|damn|fuck) (#Determiner|#Possessive|them)').term(0).tag('Verb', 'swears-verb');
  r.match('#Copula fucked up?').not('#Copula').tag('Adjective', 'swears-adjective');

  //more-detailed corrections
  r = verb_corrections(r);

  return r;
};

module.exports = corrections;

},{"../paths":208,"./verb_corrections":202}],202:[function(_dereq_,module,exports){
'use strict';

const corrections = function (r) {
  //support a splattering of auxillaries before a verb
  let advb = '(#Adverb|not)+?';
  //had walked
  r.match(`(has|had) ${advb} #PastTense`).not('#Verb$').tag('Auxillary', 'had-walked');
  //was walking
  r.match(`#Copula ${advb} #Gerund`).not('#Verb$').tag('Auxillary', 'copula-walking');
  //been walking
  r.match(`(be|been) ${advb} #Gerund`).not('#Verb$').tag('Auxillary', 'be-walking');
  //would walk
  r.match(`(#Modal|did) ${advb} #Verb`).not('#Verb$').tag('Auxillary', 'modal-verb');
  //would have had
  r.match(`#Modal ${advb} have ${advb} had ${advb} #Verb`).not('#Verb$').tag('Auxillary', 'would-have');
  //would be walking
  r.match(`(#Modal) ${advb} be ${advb} #Verb`).not('#Verb$').tag('Auxillary', 'would-be');
  //would been walking
  r.match(`(#Modal|had|has) ${advb} been ${advb} #Verb`).not('#Verb$').tag('Auxillary', 'would-be');
  //infinitive verbs suggest plural nouns - 'XYZ walk to the store'
  // r.match(`#Singular+ #Infinitive`).match('#Singular+').tag('Plural', 'infinitive-make-plural');
  return r;
};
module.exports = corrections;

},{}],203:[function(_dereq_,module,exports){
'use strict';
//the steps and processes of pos-tagging
const contraction = {
  interpret: _dereq_('./contraction')
};
const lumper = {
  lexicon_lump: _dereq_('./lumper/lexicon_lump'),
  lump_two: _dereq_('./lumper/lump_two'),
  lump_three: _dereq_('./lumper/lump_three')
};
const step = {
  punctuation_step: _dereq_('./steps/01-punctuation_step'),
  lexicon_step: _dereq_('./steps/02-lexicon_step'),
  capital_step: _dereq_('./steps/03-capital_step'),
  web_step: _dereq_('./steps/04-web_step'),
  suffix_step: _dereq_('./steps/05-suffix_step'),
  neighbour_step: _dereq_('./steps/06-neighbour_step'),
  noun_fallback: _dereq_('./steps/07-noun_fallback'),
  date_step: _dereq_('./steps/08-date_step'),
  auxillary_step: _dereq_('./steps/09-auxillary_step'),
  negation_step: _dereq_('./steps/10-negation_step'),
  adverb_step: _dereq_('./steps/11-adverb_step'),
  phrasal_step: _dereq_('./steps/12-phrasal_step'),
  comma_step: _dereq_('./steps/13-comma_step'),
  possessive_step: _dereq_('./steps/14-possessive_step'),
  value_step: _dereq_('./steps/15-value_step'),
  acronym_step: _dereq_('./steps/16-acronym_step'),
  emoji_step: _dereq_('./steps/17-emoji_step'),
  person_step: _dereq_('./steps/18-person_step'),
  quotation_step: _dereq_('./steps/19-quotation_step'),
  organization_step: _dereq_('./steps/20-organization_step'),
  plural_step: _dereq_('./steps/21-plural_step')
};
const corrections = _dereq_('./corrections');
const tagPhrase = _dereq_('./phrase');


const tagger = function (ts) {
  ts = step.punctuation_step(ts);
  ts = step.emoji_step(ts);
  ts = lumper.lexicon_lump(ts);
  ts = step.lexicon_step(ts);
  ts = step.web_step(ts);
  ts = step.suffix_step(ts);
  ts = step.neighbour_step(ts);
  ts = step.capital_step(ts);
  ts = step.noun_fallback(ts);
  ts = contraction.interpret(ts);
  ts = step.date_step(ts);
  ts = step.auxillary_step(ts);
  ts = step.negation_step(ts);
  // ts = step.adverb_step(ts);
  ts = step.phrasal_step(ts);
  ts = step.comma_step(ts);
  ts = step.possessive_step(ts);
  ts = step.value_step(ts);
  ts = step.acronym_step(ts);
  ts = step.person_step(ts);
  ts = step.quotation_step(ts);
  ts = step.organization_step(ts);
  ts = step.plural_step(ts);
  //lump a couple times, for long ones
  for (let i = 0; i < 3; i++) {
    ts = lumper.lump_three(ts);
    ts = lumper.lump_two(ts);
  }
  ts = corrections(ts);
  ts = tagPhrase(ts);
  return ts;
};

module.exports = tagger;

},{"./contraction":199,"./corrections":201,"./lumper/lexicon_lump":205,"./lumper/lump_three":206,"./lumper/lump_two":207,"./phrase":210,"./steps/01-punctuation_step":211,"./steps/02-lexicon_step":212,"./steps/03-capital_step":213,"./steps/04-web_step":214,"./steps/05-suffix_step":215,"./steps/06-neighbour_step":216,"./steps/07-noun_fallback":217,"./steps/08-date_step":218,"./steps/09-auxillary_step":219,"./steps/10-negation_step":220,"./steps/11-adverb_step":221,"./steps/12-phrasal_step":222,"./steps/13-comma_step":223,"./steps/14-possessive_step":224,"./steps/15-value_step":225,"./steps/16-acronym_step":226,"./steps/17-emoji_step":227,"./steps/18-person_step":228,"./steps/19-quotation_step":229,"./steps/20-organization_step":230,"./steps/21-plural_step":231}],204:[function(_dereq_,module,exports){
'use strict';
const paths = _dereq_('../paths');
const Term = paths.Term;
const log = paths.log;
const path = 'tagger/combine';
//merge two term objects.. carefully

const makeText = (a, b) => {
  let text = a.whitespace.before + a.text + a.whitespace.after;
  text += b.whitespace.before + b.text + b.whitespace.after;
  return text;
};

const combine = function(s, i) {
  let a = s.terms[i];
  let b = s.terms[i + 1];
  if (!b) {
    return;
  }
  log.tell('--combining: "' + a.normal + '"+"' + b.normal + '"', path);
  let text = makeText(a, b);
  s.terms[i] = new Term(text, a.context);
  s.terms[i].normal = a.normal + ' ' + b.normal;
  s.terms[i + 1] = null;
  s.terms = s.terms.filter((t) => t !== null);
  return;
};

module.exports = combine;

},{"../paths":208}],205:[function(_dereq_,module,exports){
'use strict';
//check for "united" + "kingdom" in lexicon, and combine + tag it
const combine = _dereq_('./combine');
const p = _dereq_('../paths');
const log = p.log;
const lexicon = p.lexicon;
const fns = p.fns;
const path = 'tagger/multiple';

const combineMany = (ts, i, count) => {
  for (let n = 0; n < count; n++) {
    combine(ts, i);
  }
};

//try to concatenate multiple-words to get this term
const tryStringFrom = (want, start, ts) => {
  let text = '';
  let normal = '';
  let simple = '';
  for (let i = start; i < ts.terms.length; i++) {
    if (i === start) {
      text = ts.terms[i].text;
      normal = ts.terms[i].normal;
      simple = ts.terms[i].root;
    } else {
      text += ' ' + ts.terms[i].text;
      normal += ' ' + ts.terms[i].normal;
      simple += ' ' + ts.terms[i].root;
    }
    //we've gone too far
    if (text === want || normal === want || simple === want) {
      let count = i - start;
      combineMany(ts, start, count);
      return true;
    }
    if (normal.length > want.length) {
      return false;
    }
  }
  return false;
};

const lexicon_lump = function (ts) {
  log.here(path);
  let uLexicon = ts.lexicon || {};

  //try the simpler, known lexicon
  for (let i = 0; i < ts.terms.length - 1; i++) {
    //try 'A'+'B'
    let normal = ts.terms[i].normal + ' ' + ts.terms[i + 1].normal;
    let text = ts.terms[i].text + ' ' + ts.terms[i + 1].text;
    let pos = lexicon[normal] || lexicon[text];
    if (pos) {
      combine(ts, i);
      ts.terms[i].tagAs(pos, 'multiples-lexicon');
    }
  }

  //try the user's lexicon
  Object.keys(uLexicon).forEach((str) => {
    for (let i = 0; i < ts.terms.length; i++) {
      if (fns.startsWith(str, ts.terms[i].normal) || fns.startsWith(str, ts.terms[i].text)) {
        if (tryStringFrom(str, i, ts)) {
          ts.terms[i].tagAs(uLexicon[str], 'user-lexicon-lump');
        }
      }
    }
  });
  return ts;
};

module.exports = lexicon_lump;

},{"../paths":208,"./combine":204}],206:[function(_dereq_,module,exports){
'use strict';
const log = _dereq_('../paths').log;
const path = 'lumper/lump_three';
const combine = _dereq_('./combine');

//rules for combining three terms into one
const do_three = [
  {
    //John & Joe's
    condition: (a, b, c) => (a.tag.Noun && (b.text === '&' || b.normal === 'n') && c.tag.Noun),
    result: 'Organization',
    reason: 'Noun-&-Noun'
  },
  {
    //1 800 PhoneNumber
    condition: (a, b, c) => (a.tag.Value && b.tag.Value && c.tag.PhoneNumber && b.normal.length === 3 && a.normal.length < 3),
    result: 'PhoneNumber',
    reason: '1-800-PhoneNumber'
  },
];

const lump_three = function(s) {
  log.here(path);
  for (let o = 0; o < do_three.length; o++) {
    for (let i = 0; i < s.terms.length - 2; i++) {
      let a = s.terms[i];
      let b = s.terms[i + 1];
      let c = s.terms[i + 2];
      if (do_three[o].condition(a, b, c)) {
        //merge terms A+B
        combine(s, i);
        //merge A+C
        combine(s, i);
        //tag it as POS
        s.terms[i].tagAs(do_three[o].result, 'lump-three (' + do_three[o].reason + ')');
      }
    }
  }
  return s;
};

module.exports = lump_three;

},{"../paths":208,"./combine":204}],207:[function(_dereq_,module,exports){
'use strict';
const log = _dereq_('../paths').log;
const path = 'lumper/lump_two';
const combine = _dereq_('./combine');

const timezones = {
  standard: true,
  daylight: true,
  summer: true,
  eastern: true,
  pacific: true,
  central: true,
  mountain: true,
};

//rules that combine two words
const do_two = [
  {
    //6 am
    condition: (a, b) => (a.tag.Holiday && (b.normal === 'day' || b.normal === 'eve')),
    result: 'Holiday',
    reason: 'holiday-day'
  }, {
    //Aircraft designer
    condition: (a, b) => (a.tag.Noun && b.tag.Actor),
    result: 'Actor',
    reason: 'thing-doer'
  }, {
    //timezones
    condition: (a, b) => (timezones[a.normal] && (b.normal === 'standard time' || b.normal === 'time')),
    result: 'Time',
    reason: 'timezone'
  }, {
    //canadian dollar, Brazilian pesos
    condition: (a, b) => (a.tag.Demonym && b.tag.Currency),
    result: 'Currency',
    reason: 'demonym-currency'
  }, {
    //(454) 232-9873
    condition: (a, b) => (a.tag.NumericValue && b.tag.PhoneNumber && a.normal.length <= 3),
    result: 'PhoneNumber',
    reason: '(800) PhoneNumber'
  }
];

const lump_two = function (s) {
  log.here(path);
  for (let o = 0; o < do_two.length; o++) {
    for (let i = 0; i < s.terms.length - 1; i++) {
      let a = s.terms[i];
      let b = s.terms[i + 1];
      if (do_two[o].condition(a, b)) {
        //merge terms
        combine(s, i);
        //tag it as POS
        s.terms[i].tagAs(do_two[o].result, 'lump-two (' + do_two[o].reason + ')');
      }
    }
  }
  return s;
};

module.exports = lump_two;

},{"../paths":208,"./combine":204}],208:[function(_dereq_,module,exports){
module.exports = _dereq_('../paths');

},{"../paths":193}],209:[function(_dereq_,module,exports){
'use strict';

//
const conditionPass = function(r) {
  //'if it really goes, I will..'
  let m = r.match('#Condition {1,7} #ClauseEnd');
  //make sure it ends on a comma
  if (m.found && m.match('#Comma$')) {
    m.tag('ConditionPhrase');
  }
  //'go a bit further, if it then has a pronoun
  m = r.match('#Condition {1,13} #ClauseEnd #Pronoun');
  if (m.found && m.match('#Comma$')) {
    m.not('#Pronoun$').tag('ConditionPhrase', 'end-pronoun');
  }
  //if it goes then ..
  m = r.match('#Condition {1,7} then');
  if (m.found) {
    m.not('then$').tag('ConditionPhrase', 'cond-then');
  }
  //at the end of a sentence:
  //'..., if it really goes.'
  m = r.match('#Comma #Condition {1,7} .$');
  if (m.found) {
    m.not('^#Comma').tag('ConditionPhrase', 'comma-7-end');
  }
  // '... if so.'
  m = r.match('#Condition {1,4}$');
  if (m.found) {
    m.tag('ConditionPhrase', 'cond-4-end');
  }
  return r;
};

module.exports = conditionPass;

},{}],210:[function(_dereq_,module,exports){
'use strict';
const conditionPass = _dereq_('./00-conditionPass');
// const verbPhrase = require('./01-verbPhrase');
// const nounPhrase = require('./02-nounPhrase');
// const AdjectivePhrase = require('./03-adjectivePhrase');
//
const phraseTag = function (Text) {
  Text = conditionPass(Text);
  // Text = verbPhrase(Text);
  // Text = nounPhrase(Text);
  // Text = AdjectivePhrase(Text);
  return Text;
};

module.exports = phraseTag;

},{"./00-conditionPass":209}],211:[function(_dereq_,module,exports){
'use strict';
const log = _dereq_('../paths').log;
const rules = _dereq_('./data/punct_rules');
const path = 'tagger/punctuation';

//not so smart (right now)
const isRomanNumeral = function(t) {
  if (!t.canBe('RomanNumeral')) {
    return false;
  }
  const str = t.text;
  if (str.length > 1 && str.match(/^[IVXCM]+$/)) {
    return true;
  }
  return false;
};

const oneLetters = {
  a: true,
  i: true,
  //internet-slang
  u: true,
  r: true,
  c: true,
  k: true
};

const punctuation_step = function (ts) {
  log.here(path);
  ts.terms.forEach((t) => {
    let str = t.text;
    //anything can be titlecase
    if (str.match(/^[A-Z][a-z']/)) {
      t.tagAs('TitleCase', 'punct-rule');
    }
    //ok, normalise it a little,
    str = str.replace(/[,\.\?]$/, '');
    //do punctuation rules (on t.text)
    for (let i = 0; i < rules.length; i++) {
      let r = rules[i];
      if (str.match(r.reg)) {
        //don't over-write any other known tags
        if (t.canBe(r.tag)) {
          t.tagAs(r.tag, 'punctuation-rule- "' + r.str + '"');
        }
        return;
      }
    }
    //terms like 'e'
    if (str.length === 1 && !oneLetters[str.toLowerCase()]) {
      t.tagAs('Acronym', 'one-letter-acronym');
    }
    //roman numerals (weak rn)
    if (isRomanNumeral(t)) {
      t.tagAs('RomanNumeral', 'is-roman-numeral');
    }

  });
  return ts;
};

module.exports = punctuation_step;

},{"../paths":208,"./data/punct_rules":236}],212:[function(_dereq_,module,exports){
'use strict';
const p = _dereq_('../paths');
const split = _dereq_('../contraction/split');

const lexicon = p.lexicon;
const log = p.log;
const path = 'tagger/lexicon';

const check_lexicon = (str, sentence) => {
  //check a user's custom lexicon
  let custom = sentence.lexicon || {};
  if (custom[str]) {
    return custom[str];
  }
  if (lexicon[str]) {
    return lexicon[str];
  }
  return null;
};

const lexicon_pass = function (ts) {
  log.here(path);
  let found;
  //loop through each term
  for (let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //basic term lookup
    found = check_lexicon(t.normal, ts);
    if (found) {
      t.tagAs(found, 'lexicon-match');
      continue;
    }
    found = check_lexicon(t.text, ts);
    if (found) {
      t.tagAs(found, 'lexicon-match-text');
      continue;
    }
    //support contractions (manually)
    let parts = split(t);
    if (parts && parts.start) {
      found = check_lexicon(parts.start.toLowerCase(), ts);
      if (found) {
        t.tagAs(found, 'contraction-lexicon');
        continue;
      }
    }
    //support silent_term matches
    found = check_lexicon(t.silent_term, ts);
    if (t.silent_term && found) {
      t.tagAs(found, 'silent_term-lexicon');
      continue;
    }
    //multiple-words / hyphenation
    let words = t.normal.split(/[ -]/);
    if (words.length > 1) {
      found = check_lexicon(words[words.length - 1], ts);
      if (found) {
        t.tagAs(found, 'multiword-lexicon');
        continue;
      }
    }
  }
  return ts;
};

module.exports = lexicon_pass;

},{"../contraction/split":200,"../paths":208}],213:[function(_dereq_,module,exports){
'use strict';
//titlecase is a signal for a noun
const log = _dereq_('../paths').log;
const path = 'tagger/capital';

const capital_logic = function (s) {
  log.here(path);
  //(ignore first word)
  for (let i = 1; i < s.terms.length; i++) {
    let t = s.terms[i];
    //has a capital, but isn't too weird.
    if (t.tag.TitleCase && t.isWord()) {
      t.tagAs('Noun', 'capital-step');
      t.tagAs('TitleCase', 'capital-step');
    }
  }
  //support first-word of sentence as proper titlecase
  let t = s.terms[0];
  if (t && t.tag.TitleCase) {
    if (t.tag.Person || t.tag.Organization || t.tag.Place) {
      t.tagAs('TitleCase', 'first-term-capital');
    }
  }
  return s;
};

module.exports = capital_logic;

},{"../paths":208}],214:[function(_dereq_,module,exports){
'use strict';
//identify urls, hashtags, @mentions, emails
const log = _dereq_('../paths').log;
const path = 'tagger/web_step';
// 'Email': Noun,
// 'Url': Noun,
// 'AtMention': Noun,
// 'HashTag': Noun,

const is_email = function(str) {
  if (str.match(/^\w+@\w+\.[a-z]{2,3}$/)) { //not fancy
    return true;
  }
  return false;
};

const is_hashtag = function(str) {
  if (str.match(/^#[a-z0-9_]{2,}$/)) {
    return true;
  }
  return false;
};

const is_atmention = function(str) {
  if (str.match(/^@\w{2,}$/)) {
    return true;
  }
  return false;
};

const is_url = function(str) {
  //with http/www
  if (str.match(/^(https?:\/\/|www\.)\w+\.[a-z]{2,3}/)) { //not fancy
    return true;
  }
  // 'boo.com'
  //http://mostpopularwebsites.net/top-level-domain
  if (str.match(/^[\w\.\/]+\.(com|net|gov|org|ly|edu|info|biz|ru|jp|de|in|uk|br)/)) {
    return true;
  }
  return false;
};

const web_pass = function(terms) {
  log.here(path);
  for (let i = 0; i < terms.length; i++) {
    let t = terms.get(i);
    let str = t.text.trim().toLowerCase();
    if (is_email(str)) {
      t.tagAs('Email', 'web_pass');
    }
    if (is_hashtag(str)) {
      t.tagAs('HashTag', 'web_pass');
    }
    if (is_atmention(str)) {
      t.tagAs('AtMention', 'web_pass');
    }
    if (is_url(str)) {
      t.tagAs('Url', 'web_pass');
    }
  }
  return terms;
};

module.exports = web_pass;

},{"../paths":208}],215:[function(_dereq_,module,exports){
'use strict';
const log = _dereq_('../paths').log;
const rules = _dereq_('./data/word_rules');
const path = 'tagger/suffix';

const suffix_step = function(s) {
  log.here(path);
  s.terms.forEach((t) => {
    //do normalized rules (on t.normal)
    for (let o = 0; o < rules.length; o++) {
      let r = rules[o];
      if (t.normal.match(r.reg)) {
        //don't over-write any other known tags
        if (t.canBe(r.tag)) {
          t.tagAs(r.tag, 'word-rule- "' + r.str + '"');
        }
        return;
      }
    }
  });
  return s;
};

module.exports = suffix_step;

},{"../paths":208,"./data/word_rules":237}],216:[function(_dereq_,module,exports){
'use strict';
const markov = _dereq_('./data/neighbours');
const afterThisWord = markov.afterThisWord;
const beforeThisWord = markov.beforeThisWord;
const beforeThisPos = markov.beforeThisPos;
const afterThisPos = markov.afterThisPos;
const log = _dereq_('../paths').log;
const path = 'tagger/neighbours';

//basically a last-ditch effort before everything falls back to a noun
//for unknown terms, look left + right first, and hit-up the markov-chain for clues
const neighbour_step = function (ts) {
  log.here(path);
  ts.terms.forEach((t, n) => {
    //is it still unknown?
    let termTags = Object.keys(t.tag);
    if (termTags.length === 0) {
      let lastTerm = ts.terms[n - 1];
      let nextTerm = ts.terms[n + 1];
      //look at last word for clues
      if (lastTerm && afterThisWord[lastTerm.normal]) {
        t.tagAs(afterThisWord[lastTerm.normal], 'neighbour-after-"' + lastTerm.normal + '"');
        return;
      }
      //look at next word for clues
      if (nextTerm && beforeThisWord[nextTerm.normal]) {
        t.tagAs(beforeThisWord[nextTerm.normal], 'neighbour-before-"' + nextTerm.normal + '"');
        return;
      }
      //look at the last POS for clues
      let tags = [];
      if (lastTerm) {
        tags = Object.keys(lastTerm.tag);
        for (let i = 0; i < tags.length; i++) {
          if (afterThisPos[tags[i]]) {
            t.tagAs(afterThisPos[tags[i]], 'neighbour-after-[' + tags[i] + ']');
            return;
          }
        }
      }
      //look at the next POS for clues
      if (nextTerm) {
        tags = Object.keys(nextTerm.tag);
        for (let i = 0; i < tags.length; i++) {
          if (beforeThisPos[tags[i]]) {
            t.tagAs(beforeThisPos[tags[i]], 'neighbour-before-[' + tags[i] + ']');
            return;
          }
        }
      }
    }
  });

  return ts;
};

module.exports = neighbour_step;

},{"../paths":208,"./data/neighbours":234}],217:[function(_dereq_,module,exports){
'use strict';
const log = _dereq_('../paths').log;
const path = 'tagger/noun_fallback';
//tag word as noun if we know nothing about it, still.

//tags that dont really count
const nothing = {
  TitleCase: true,
  UpperCase: true,
  CamelCase: true
};
//are the tags basically empty
const gotNothing = function(t) {
  //fail-fast
  if (t.tag.Noun || t.tag.Verb || t.tag.Adjective) {
    return false;
  }
  let tags = Object.keys(t.tag);
  if (tags.length === 0) {
    return true;
  }
  if (tags.filter(tag => !nothing[tag]).length === 0) {
    return true;
  }
  return false;
};

const noun_fallback = function(s) {
  log.here(path);
  for (let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
    //fail-fast
    if (t.tag.Noun || t.tag.Verb) {
      continue;
    }
    //ensure it only has the tag 'Term'
    if (gotNothing(t)) {
      //ensure it's atleast word-looking
      if (t.isWord() === false) {
        continue;
      }
      t.tagAs('Noun', 'noun-fallback');
    }
  }
  return s;
};

module.exports = noun_fallback;

},{"../paths":208}],218:[function(_dereq_,module,exports){
'use strict';
const log = _dereq_('../paths').log;
const path = 'tagger/datePass';

//ambiguous 'may' and 'march'
const months = '(may|march|jan|april|sep)';
const preps = '(in|by|before|for|during|on|until|after|of|within)';
const thisNext = '(last|next|this|previous|current|upcoming|coming)';
const sections = '(start|end|middle|starting|ending|midpoint|beginning)';
// const dayTime = '(night|evening|morning|afternoon|day|daytime)';

// const isDate = (num) => {
//   if (num && num < 31 && num > 0) {
//     return true;
//   }
//   return false;
// };

//ensure a year is approximately typical for common years
//please change in one thousand years
const isYear = (num) => {
  if (num && num > 1000 && num < 3000) {
    return true;
  }
  return false;
};

//non-destructively tag values & prepositions as dates
const datePass = function (ts) {
  log.here(path);

  ts.match(`#Month #DateRange+`).tag('Date', 'correction-numberRange');
  // ts.match(`#Month #Value to #Value`).tag('Date', 'correction-contraction');

  //months
  ts.match(`${months} (#Determiner|#Value|#Date)`).term(0).tag('Month', 'correction-may');
  ts.match(`#Date ${months}`).term(1).tag('Month', 'correction-may');
  ts.match(`${preps} ${months}`).term(1).tag('Month', 'correction-may');
  ts.match(`(next|this|last) ${months}`).term(1).tag('Month', 'correction-may'); //maybe not 'this'

  //values
  ts.match('#Value #Abbreviation').tag('Value', 'value-abbr');
  ts.match('a #Value').tag('Value', 'a-value');
  ts.match('(minus|negative) #Value').tag('Value', 'minus-value');
  ts.match('#Value grand').tag('Value', 'value-grand');
  // ts.match('#Ordinal (half|quarter)').tag('Value', 'ordinal-half');//not ready
  ts.match('(half|quarter) #Ordinal').tag('Value', 'half-ordinal');
  ts.match('(hundred|thousand|million|billion|trillion) and #Value').tag('Value', 'magnitude-and-value');
  ts.match('#Value point #Value').tag('Value', 'value-point-value');

  //time
  ts.match('#Cardinal #Time').tag('Time', 'value-time');
  ts.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time');
  ts.match('(#Value|#Time) (am|pm)').tag('Time', 'value-ampm');
  ts.match('all day').tag('Time', 'all-day');

  //seasons
  ts.match(`${preps}? ${thisNext} (spring|summer|winter|fall|autumn)`).tag('Date', 'thisNext-season');
  ts.match(`the? ${sections} of (spring|summer|winter|fall|autumn)`).tag('Date', 'section-season');

  //june the 5th
  ts.match('#Date the? #Ordinal').tag('Date', 'correction-date');
  //5th of March
  ts.match('#Value of? #Month').tag('Date', 'value-of-month');
  //5 March
  ts.match('#Cardinal #Month').tag('Date', 'cardinal-month');
  //march 5 to 7
  ts.match('#Month #Value to #Value').tag('Date', 'value-to-value');

  //last month
  ts.match(`${thisNext} #Date`).tag('Date', 'thisNext-date');
  //for four days
  ts.match(`${preps}? #Value #Duration`).tag('Date', 'value-duration');

  //by 5 March
  ts.match('due? (by|before|after|until) #Date').tag('Date', 'by-date');
  //tomorrow before 3
  ts.match('#Date (by|before|after|at|@|about) #Cardinal').not('^#Date').tag('Time', 'date-before-Cardinal');
  //2pm est
  ts.match('#Time (eastern|pacific|central|mountain)').term(1).tag('Time', 'timezone');
  ts.match('#Time (est|pst|gmt)').term(1).tag('Time', 'timezone abbr');
  //saturday am
  ts.match('#Date (am|pm)').term(1).unTag('Verb').unTag('Copula').tag('Time', 'date-am');
  //late at night
  ts.match('at night').tag('Time', 'at-night');
  ts.match('in the (night|evening|morning|afternoon|day|daytime)').tag('Time', 'in-the-night');
  ts.match('(early|late) (at|in)? the? (night|evening|morning|afternoon|day|daytime)').tag('Time', 'early-evening');
  //march 12th 2018
  ts.match('#Month #Value #Cardinal').tag('Date', 'month-value-cardinal');
  ts.match('(last|next|this|previous|current|upcoming|coming|the) #Date').tag('Date', 'next-feb');
  ts.match('#Date #Value').tag('Date', 'date-value');
  ts.match('#Value #Date').tag('Date', 'value-date');
  ts.match('#Date #Preposition #Date').tag('Date', 'date-prep-date');

  //two days before
  ts.match('#Value #Duration #Conjunction').tag('Date', 'val-duration-conjunction');

  //start of june
  ts.match(`the? ${sections} of #Date`).tag('Date', 'section-of-date');

  //year tagging
  let value = ts.match(`#Date #Value #Cardinal`).lastTerm().values();
  let num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'date-value-year');
  }
  //scoops up a bunch
  value = ts.match(`#Date+ #Cardinal`).lastTerm().values();
  num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'date-year');
  }
  //feb 8 2018
  value = ts.match(`#Month #Value #Cardinal`).lastTerm().values();
  num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'date-year2');
  }
  //feb 8 to 10th 2018
  value = ts.match(`#Month #Value to #Value #Cardinal`).lastTerm().values();
  num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'date-year3');
  }
  //in 1998
  value = ts.match(`(in|of|by|during|before|starting|ending|for|year) #Cardinal`).lastTerm().values();
  num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'preposition-year');
  }
  //fifth week in 1998
  ts.match('#Duration in #Date').tag('Date', 'duration-in-date');

  return ts;
};

module.exports = datePass;

},{"../paths":208}],219:[function(_dereq_,module,exports){
'use strict';
const log = _dereq_('../paths').log;
const path = 'tagger/auxillary';
//

const auxillary = {
  'do': true,
  'don\'t': true,
  'does': true,
  'doesn\'t': true,
  'will': true,
  'wont': true,
  'won\'t': true,
  'have': true,
  'haven\'t': true,
  'had': true,
  'hadn\'t': true,
  'not': true,
};

const corrections = function(ts) {
  log.here(path);
  //set verbs as auxillaries
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (auxillary[t.normal] || auxillary[t.silent_term]) {
      let next = ts.terms[i + 1];
      //if next word is a verb
      if (next && (next.tag.Verb || next.tag.Adverb || next.tag.Negative)) {
        t.tagAs('Auxillary', 'corrections-auxillary');
        continue;
      }
    }
  }
  return ts;
};

module.exports = corrections;

},{"../paths":208}],220:[function(_dereq_,module,exports){
'use strict';
const log = _dereq_('../paths').log;
const path = 'tagger/negation';

// 'not' is sometimes a verb, sometimes an adjective
const negation_step = function(ts) {
  log.here(path);
  for(let i = 0; i < ts.length; i++) {
    let t = ts.get(i);
    if (t.normal === 'not' || t.silent_term === 'not') {
      //find the next verb/adjective
      for(let o = i + 1; o < ts.length; o++) {
        if (ts.get(o).tag.Verb) {
          t.tagAs('VerbPhrase', 'negate-verb');
          break;
        }
        if (ts.get(o).tag.Adjective) {
          t.tagAs('AdjectivePhrase', 'negate-adj');
          break;
        }
      }
    }
  }
  return ts;
};

module.exports = negation_step;

},{"../paths":208}],221:[function(_dereq_,module,exports){
'use strict';
const log = _dereq_('../paths').log;
const path = 'tagger/adverb';

//adverbs can be for verbs or nouns
const adverb_step = function(ts) {
  log.here(path);
  for(let i = 0; i < ts.length; i++) {
    let t = ts.get(i);
    if (t.tag.Adverb) {
      //find the next verb/adjective
      for(let o = 0; o < 7; o++) {
        //look forward first
        let after = ts.get(i + o);
        if (after) {
          if (after.tag.Verb) {
            t.tagAs('VerbPhrase', 'adverb-verb');
            break;
          }
          if (after.tag.Adjective) {
            t.tagAs('AdjectivePhrase', 'adverb-adj');
            break;
          }
        }
        //look before the adverb now
        let before = ts.get(i - o);
        if (before) {
          if (before.tag.Verb) {
            t.tagAs('VerbPhrase', 'verb-adverb');
            break;
          }
          if (before.tag.Adjective) {
            t.tagAs('AdjectivePhrase', 'adj-adverb');
            break;
          }
        }
      }

    }
  }
  return ts;
};

module.exports = adverb_step;

},{"../paths":208}],222:[function(_dereq_,module,exports){
'use strict';
const log = _dereq_('../paths').log;
const phrasals = _dereq_('./data/phrasal_verbs');
const toInfinitive = _dereq_('../../../result/subset/verbs/methods/toInfinitive/index.js');

const path = 'tagger/phrasal';

//words that could be particles
const particles = {
  'aback': true,
  'along': true,
  'apart': true,
  'at': true,
  'away': true,
  'back': true,
  'by': true,
  'do': true,
  'down': true,
  'forth': true,
  'forward': true,
  'in': true,
  'into': true,
  'it': true,
  'off': true,
  'on': true,
  'out': true,
  'over': true,
  'round': true,
  'through': true,
  'together': true,
  'under': true,
  'up': true,
  'upon': true,
  'way': true,
};

//phrasal verbs are compound verbs like 'beef up'
const phrasals_step = function(ts) {
  log.here(path);
  for(let i = 1; i < ts.length; i++) {
    let t = ts.get(i);
    //is it a particle, like 'up'
    if (particles[t.normal]) {
      //look backwards
      let last = ts.get(i - 1);
      if (last.tag.Verb) {
        let inf = toInfinitive(last);
        if (phrasals[inf + ' ' + t.normal]) {
          t.tagAs('Particle', 'phrasalVerb-particle');
        }
      }
    }

  }
  return ts;
};

module.exports = phrasals_step;

},{"../../../result/subset/verbs/methods/toInfinitive/index.js":148,"../paths":208,"./data/phrasal_verbs":235}],223:[function(_dereq_,module,exports){
'use strict';
//-types of comma-use-
// PlaceComma - Hollywood, California
// List       - cool, fun, and great.
// ClauseEnd  - if so, we do.

//like Toronto, Canada
const isPlaceComma = (ts, i) => {
  let t = ts.terms[i];
  let nextTerm = ts.terms[i + 1];
  //'australia, canada' is a list
  if (nextTerm && t.tag.Place && !t.tag.Country && nextTerm.tag.Country) {
    return true;
  }
  return false;
};

//adj, noun, or verb
const mainTag = (t) => {
  if (t.tag.Adjective) {
    return 'Adjective';
  }
  if (t.tag.Noun) {
    return 'Noun';
  }
  if (t.tag.Verb) {
    return 'Verb';
  }
  return null;
};

const tagAsList = (ts, start, end) => {
  for(let i = start; i <= end; i++) {
    ts.terms[i].tag.List = true;
  }
};

//take the first term with a comma, and test to the right.
//the words with a comma must be the same pos.
const isList = (ts, i) => {
  let start = i;
  let tag = mainTag(ts.terms[i]);
  //ensure there's a following comma, and its the same pos
  //then a Conjunction
  let sinceComma = 0;
  let count = 0;
  let hasConjunction = false;
  for(i = i + 1; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //are we approaching the end
    if (count > 0 && t.tag.Conjunction) {
      hasConjunction = true;
      continue;
    }
    //found one,
    if (t.tag[tag]) {
      //looks good. keep it going
      if (t.tag.Comma) {
        count += 1;
        sinceComma = 0;
        continue;
      }
      if (count > 0 && hasConjunction) { //is this the end of the list?
        tagAsList(ts, start, i);
        return true;
      }
    }
    sinceComma += 1;
    //have we gone too far without a comma?
    if (sinceComma > 5) {
      return false;
    }
  }
  return false;
};

const commaStep = function(ts) {
  //tag the correct punctuation forms
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    let punct = t.endPunctuation();
    if (punct === ',') {
      t.tagAs('Comma', 'comma-step');
      continue;
    }
    if (punct === ';' || punct === ':') {
      t.tagAs('ClauseEnd', 'clause-punt');
      continue;
    }
    //support elipses
    if (t.whitespace.after.match(/^\.\./)) {
      t.tagAs('ClauseEnd', 'clause-elipses');
      continue;
    }
    //support ' - ' clause
    if (ts.terms[i + 1] && ts.terms[i + 1].whitespace.before.match(/ - /)) {
      t.tagAs('ClauseEnd', 'hypen-clause');
      continue;
    }
  }

  //disambiguate the commas now
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (t.tag.Comma) {
      //if we already got it
      if (t.tag.List) {
        continue;
      }
      //like 'Hollywood, California'
      if (isPlaceComma(ts, i)) {
        continue;
      }
      //like 'cold, wet hands'
      if (isList(ts, i)) {
        continue;
      }
      //otherwise, it's a phrasal comma, like 'you must, if you think so'
      t.tag.ClauseEnd = true;
    }
  }
  return ts;
};

module.exports = commaStep;

},{}],224:[function(_dereq_,module,exports){
'use strict';
//decide if an apostrophe s is a contraction or not
// 'spencer's nice' -> 'spencer is nice'
// 'spencer's house' -> 'spencer's house'

//these are always contractions
const blacklist = {
  'it\'s': true,
  'that\'s': true
};

//a possessive means "'s" describes ownership, not a contraction, like 'is'
const is_possessive = function(terms, x) {
  let t = terms.get(x);
  //these are always contractions, not possessive
  if (blacklist[t.normal]) {
    return false;
  }
  //"spencers'" - this is always possessive - eg "flanders'"
  if (t.normal.match(/[a-z]s'$/)) {
    return true;
  }
  //if no apostrophe s, return
  if (!t.normal.match(/[a-z]'s$/)) {
    return false;
  }
  //some parts-of-speech can't be possessive
  if (t.tag['Pronoun']) {
    return false;
  }
  let nextWord = terms.get(x + 1);
  //last word is possessive  - "better than spencer's"
  if (!nextWord) {
    return true;
  }
  //next word is 'house'
  if (nextWord.tag['Noun']) {
    return true;
  }
  //rocket's red glare
  if (nextWord.tag['Adjective'] && terms.get(x + 2) && terms.get(x + 2).tag['Noun']) {
    return true;
  }
  //next word is an adjective
  if (nextWord.tag['Adjective'] || nextWord.tag['Verb'] || nextWord.tag['Adverb']) {
    return false;
  }
  return false;
};

//tag each term as possessive, if it should
const possessiveStep = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    if (is_possessive(terms, i)) {
      let t = terms.get(i);
      //if it's not already a noun, co-erce it to one
      if (!t.tag['Noun']) {
        t.tagAs('Noun', 'possessive_pass');
      }
      t.tagAs('Possessive', 'possessive_pass');
    }
  }
  return terms;
};
module.exports = possessiveStep;

},{}],225:[function(_dereq_,module,exports){
'use strict';
'use strict';
const log = _dereq_('../paths').log;
const path = 'tagger/value';

const value_step = function(ts) {
  log.here(path);
  ts.terms.forEach((t) => {
    if (t.tag.Value) {
      //ordinal/cardinal
      if (!t.tag.Ordinal && !t.tag.Cardinal) {
        if (t.normal.match(/^[0-9]([0-9]+,)*?(\.[0-9])$/)) {
          t.tagAs('Cardinal', 'ordinal-regex');
        } else {
          t.tagAs('Cardinal', 'cardinal-regex');
        }
      }
      //text/number
      if (!t.tag.TextValue && !t.tag.NumericValue) {
        if (t.normal.match(/^[a-z]/)) {
          t.tagAs('TextValue', 'TextValue-regex');
        } else {
          t.tagAs('NumericValue', 'NumericValue-regex');
        }
      }
    }
  });
  return ts;
};

module.exports = value_step;

},{"../paths":208}],226:[function(_dereq_,module,exports){
'use strict';
'use strict';
const log = _dereq_('../paths').log;
const path = 'tagger/acronym_step';

const acronym_step = function(ts) {
  log.here(path);
  ts.terms.forEach((t) => {
    if (t.isAcronym()) {
      t.tagAs('Acronym', 'acronym-step');
    }
  });
  return ts;
};

module.exports = acronym_step;

},{"../paths":208}],227:[function(_dereq_,module,exports){
'use strict';
const fns = _dereq_('../paths').fns;
const emojiReg = _dereq_('./data/emoji_regex');
const emoticon = _dereq_('./data/emoticon_list');
//test for forms like ':woman_tone2:‍:ear_of_rice:'
//https://github.com/Kikobeats/emojis-keywords/blob/master/index.js
const isCommaEmoji = (t) => {
  if (fns.startsWith(t.text, ':')) {
    //end comma can be last or second-last ':haircut_tone3:‍♀️'
    if (!t.text.match(/:.?$/)) {
      return false;
    }
    //ensure no spaces
    if (t.text.match(' ')) {
      return false;
    }
    //reasonably sized
    if (t.text.length > 35) {
      return false;
    }
    return true
  }
  return false;
};

//check against emoticon whitelist
const isEmoticon = (t) => {
  //normalize the 'eyes'
  let str = t.text.replace(/^[:;]/, ':')
  str = str.replace(/[:;]$/, ':')
  return emoticon[str]
}

//
const emojiStep = (ts) => {
  for (let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //test for :keyword: emojis
    if (isCommaEmoji(t)) {
      t.tagAs('Emoji', 'comma-emoji');
    }
    //test for unicode emojis
    if (t.text.match(emojiReg)) {
      t.tagAs('Emoji', 'unicode-emoji');
    }
    //test for emoticon ':)' emojis
    if (isEmoticon(t)) {
      t.tagAs('Emoji', 'emoticon-emoji');
    }
  }
  return ts;
};
module.exports = emojiStep;

},{"../paths":208,"./data/emoji_regex":232,"./data/emoticon_list":233}],228:[function(_dereq_,module,exports){
'use strict';
const log = _dereq_('../paths').log;
const path = 'tagger/person_step';

let titles = _dereq_('../paths').data.titles;
titles = titles.reduce((h, str) => {
  h[str] = true;
  return h;
}, {});

const person_step = function (ts) {
  log.here(path);
  let reason = 'person-step';
  // x Lastname
  ts.match('#Noun #LastName').firstTerm().canBe('#FirstName').tag('#FirstName', 'noun-lastname');

  // Firstname x (dangerous)
  let tmp = ts.match('#FirstName #Noun').ifNo('^#Possessive').ifNo('^#Comma');
  tmp.lastTerm().canBe('#LastName').tag('#LastName', 'firstname-noun');

  //j.k Rowling
  ts.match('#Acronym #TitleCase').canBe('#Person').tag('#Person', 'acronym-titlecase');
  ts.match('#Noun van der? #Noun').canBe('#Person').tag('#Person', 'von der noun');
  ts.match('#FirstName de #Noun').canBe('#Person').tag('#Person', 'firstname-de-noun');
  ts.match('(king|queen|prince|saint|lady) of? #Noun').canBe('#Person').tag('#Person', 'king-of-noun');
  ts.match('#FirstName (bin|al) #Noun').canBe('#Person').tag('#Person', 'firstname-al-noun');

  //ambiguous firstnames
  let maybe = ['will', 'may', 'april', 'june', 'said', 'rob', 'wade', 'ray', 'rusty', 'drew', 'miles', 'jack', 'chuck', 'randy', 'jan', 'pat', 'cliff', 'bill'];
  maybe = '(' + maybe.join('|') + ')';
  ts.match(maybe + ' #LastName').firstTerm().tag('#FirstName', reason);

  //ambiguous lastnames
  maybe = ['green', 'white', 'brown', 'hall', 'young', 'king', 'hill', 'cook', 'gray', 'price'];
  maybe = '(' + maybe.join('|') + ')';
  ts.match('#FirstName ' + maybe).tag('#Person', reason);

  //people chunks
  //John L. Foo
  ts.match('#FirstName #Acronym #TitleCase').tag('Person', 'firstname-acronym-titlecase');
  //Andrew Lloyd Webber
  ts.match('#FirstName #FirstName #TitleCase').tag('Person', 'firstname-firstname-titlecase');
  //Mr Foo
  ts.match('#Honorific #FirstName? #TitleCase').tag('Person', 'Honorific-TitleCase');
  //John Foo
  ts.match('#FirstName #TitleCase').match('#FirstName #Noun').tag('Person', 'firstname-titlecase');
  //ludwig van beethovan
  ts.match('#TitleCase (van|al|bin) #TitleCase').tag('Person', 'correction-titlecase-van-titlecase');
  ts.match('#TitleCase (de|du) la? #TitleCase').tag('Person', 'correction-titlecase-van-titlecase');
  //peter the great
  ts.match('#FirstName the #Adjective').tag('Person', 'correction-determiner5');
  //Morgan Shlkjsfne
  ts.match('#Person #TitleCase').match('#TitleCase #Noun').tag('Person', 'correction-person-titlecase');

  //last names
  // let reason = 'person-correction';
  //Joe K. Sombrero
  ts.match('#FirstName #Acronym #Noun').ifNo('#Date').tag('#Person', reason).lastTerm().tag('#LastName', reason);
  //Jani K. Smith
  ts.match('#TitleCase #Acronym? #LastName').ifNo('#Date').tag('#Person', reason).lastTerm().tag('#LastName', reason);
  //john bodego's
  ts.match('#FirstName (#Singular|#Possessive)').ifNo('#Date').tag('#Person', reason).lastTerm().tag('#LastName', reason);
  //pope francis
  ts.match('(lady|queen|sister) #TitleCase').ifNo('#Date').tag('#FemaleName', reason);
  ts.match('(king|pope|father) #TitleCase').ifNo('#Date').tag('#MaleName', 'correction-poe');

  //peter II
  ts.match('#Person #Person the? #RomanNumeral').tag('Person', 'correction-roman-numeral');

  //'Professor Fink', 'General McCarthy'
  for(let i = 0; i < ts.terms.length - 1; i++) {
    let t = ts.terms[i];
    if (titles[t.normal]) {
      if (ts.terms[i + 1] && ts.terms[i + 1].tag.Person) {
        t.tagAs('Person', 'title-person');
      }
    }
  }
  return ts;
};

module.exports = person_step;

},{"../paths":208}],229:[function(_dereq_,module,exports){
'use strict';
const log = _dereq_('../paths').log;
const path = 'tagger/person_step';

const tagSlice = function(ts, start, end) {
  ts.terms.slice(start, end + 1).forEach((t) => {
    t.tagAs('Quotation', 'quotation_step');
  });
};

//tag a inline quotation as such
const quotation_step = (ts) => {
  log.here(path);
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (t.text.match(/^["'\u201B\u201C\u2033\u201F\u2018]/)) {
      //look for the ending
      for(let o = 0; o < ts.terms.length; o++) {
        //max-length- don't go-on forever
        if (!ts.terms[i + o] || o > 8) {
          break;
        }
        if (ts.terms[i + o].text.match(/.["'\u201D\u2036\u2019]([;:,.])?$/)) {
          tagSlice(ts, i, o + i);
          i += o;
          break;
        }
      }
    }
  }
  return ts;
};
module.exports = quotation_step;

},{"../paths":208}],230:[function(_dereq_,module,exports){
'use strict';
const log = _dereq_('../paths').log;
const path = 'tagger/organization_step';

const cantBe = [
  'Verb',
  'Pronoun',
  'Determiner',
  'Adverb',
  'Possessive',
  'Conjunction',
  'Preposition',
  'Adjective',
  'QuestionWord',
  'Value',
  'Negative',
  'Comma',
];

//orgwords like 'bank' in 'Foo Bank'
let orgWords = _dereq_('../paths').data.orgWords;
orgWords = orgWords.reduce((h, str) => {
  h[str] = true;
  return h;
}, {});

//could this word be an organization
const maybeOrg = function(t) {
  //must be a noun
  if (!t.tag.Noun) {
    return false;
  }
  //can't be these things
  if (t.tag.Pronoun || t.tag.Comma || t.tag.Possessive) {
    return false;
  }
  //must be one of these
  if (t.tag.TitleCase || t.tag.Organization) {
    return true;
  }
  return false;
};

const organization_step = (ts) => {
  log.here(path);
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (orgWords[t.normal]) {
      //eg. Toronto University
      let lastTerm = ts.terms[i - 1];
      if (lastTerm && maybeOrg(lastTerm)) {
        lastTerm.tagAs('Organization', 'org-word-1');
        t.tagAs('Organization', 'org-word-2');
        continue;
      }
      //eg. University of Toronto
      let nextTerm = ts.terms[i + 1];
      if (nextTerm && nextTerm.normal === 'of') {
        if (ts.terms[i + 2] && maybeOrg(ts.terms[i + 2])) {
          t.tagAs('Organization', 'org-word-1');
          nextTerm.tagAs('Organization', 'org-word-2');
          ts.terms[i + 2].tagAs('Organization', 'org-word-3');
          continue;
        }
      }
    }
  }
  return ts;
};
module.exports = organization_step;

},{"../paths":208}],231:[function(_dereq_,module,exports){
'use strict';
const log = _dereq_('../paths').log;
const isPlural = _dereq_('../../../result/subset/nouns/isPlural');
const path = 'tagger/plural';

const pluralStep = function(ts) {
  log.here(path);
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (t.tag.Noun) {
      //skip existing fast
      if (t.tag.Singular || t.tag.Plural) {
        continue;
      }
      //check if it's plural
      let plural = isPlural(t); //can be null if unknown
      if (plural) {
        t.tagAs('Plural', 'pluralStep');
      } else if (plural === false) {
        // console.log(t.normal, plural);
        t.tagAs('Singular', 'pluralStep');
      }
    }
  }
  return ts;
};

module.exports = pluralStep;

},{"../../../result/subset/nouns/isPlural":93,"../paths":208}],232:[function(_dereq_,module,exports){
//yep,
//https://github.com/mathiasbynens/emoji-regex/blob/master/index.js
module.exports = /(?:0\u20E3\n1\u20E3|2\u20E3|3\u20E3|4\u20E3|5\u20E3|6\u20E3|7\u20E3|8\u20E3|9\u20E3|#\u20E3|\*\u20E3|\uD83C(?:\uDDE6\uD83C(?:\uDDE8|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDEE|\uDDF1|\uDDF2|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFC|\uDDFD|\uDDFF)|\uDDE7\uD83C(?:\uDDE6|\uDDE7|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDEF|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFB|\uDDFC|\uDDFE|\uDDFF)|\uDDE8\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF5|\uDDF7|\uDDFA|\uDDFB|\uDDFC|\uDDFD|\uDDFE|\uDDFF)|\uDDE9\uD83C(?:\uDDEA|\uDDEC|\uDDEF|\uDDF0|\uDDF2|\uDDF4|\uDDFF)|\uDDEA\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEC|\uDDED|\uDDF7|\uDDF8|\uDDF9|\uDDFA)|\uDDEB\uD83C(?:\uDDEE|\uDDEF|\uDDF0|\uDDF2|\uDDF4|\uDDF7)|\uDDEC\uD83C(?:\uDDE6|\uDDE7|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDF1|\uDDF2|\uDDF3|\uDDF5|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFC|\uDDFE)|\uDDED\uD83C(?:\uDDF0|\uDDF2|\uDDF3|\uDDF7|\uDDF9|\uDDFA)|\uDDEE\uD83C(?:\uDDE8|\uDDE9|\uDDEA|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9)|\uDDEF\uD83C(?:\uDDEA|\uDDF2|\uDDF4|\uDDF5)|\uDDF0\uD83C(?:\uDDEA|\uDDEC|\uDDED|\uDDEE|\uDDF2|\uDDF3|\uDDF5|\uDDF7|\uDDFC|\uDDFE|\uDDFF)|\uDDF1\uD83C(?:\uDDE6|\uDDE7|\uDDE8|\uDDEE|\uDDF0|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFB|\uDDFE)|\uDDF2\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF5|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFB|\uDDFC|\uDDFD|\uDDFE|\uDDFF)|\uDDF3\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEB|\uDDEC|\uDDEE|\uDDF1|\uDDF4|\uDDF5|\uDDF7|\uDDFA|\uDDFF)|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C(?:\uDDE6|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF7|\uDDF8|\uDDF9|\uDDFC|\uDDFE)|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C(?:\uDDEA|\uDDF4|\uDDF8|\uDDFA|\uDDFC)|\uDDF8\uD83C(?:\uDDE6|\uDDE7|\uDDE8|\uDDE9|\uDDEA|\uDDEC|\uDDED|\uDDEE|\uDDEF|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF7|\uDDF8|\uDDF9|\uDDFB|\uDDFD|\uDDFE|\uDDFF)|\uDDF9\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEB|\uDDEC|\uDDED|\uDDEF|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF7|\uDDF9|\uDDFB|\uDDFC|\uDDFF)|\uDDFA\uD83C(?:\uDDE6|\uDDEC|\uDDF2|\uDDF8|\uDDFE|\uDDFF)|\uDDFB\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEC|\uDDEE|\uDDF3|\uDDFA)|\uDDFC\uD83C(?:\uDDEB|\uDDF8)|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C(?:\uDDEA|\uDDF9)|\uDDFF\uD83C(?:\uDDE6|\uDDF2|\uDDFC)))|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD79\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED0\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3]|\uD83E[\uDD10-\uDD18\uDD80-\uDD84\uDDC0]/g;

},{}],233:[function(_dereq_,module,exports){
//just some of the most common emoticons
//faster than
//http://stackoverflow.com/questions/28077049/regex-matching-emoticons
module.exports = {
  ':(': true,
  ':)': true,
  ':P': true,
  ':p': true,
  ':O': true,
  ':3': true,
  ':|': true,
  ':/': true,
  ':\\': true,
  ':$': true,
  ':*': true,
  ':@': true,
  ':-(': true,
  ':-)': true,
  ':-P': true,
  ':-p': true,
  ':-O': true,
  ':-3': true,
  ':-|': true,
  ':-/': true,
  ':-\\': true,
  ':-$': true,
  ':-*': true,
  ':-@': true,
  ':^(': true,
  ':^)': true,
  ':^P': true,
  ':^p': true,
  ':^O': true,
  ':^3': true,
  ':^|': true,
  ':^/': true,
  ':^\\': true,
  ':^$': true,
  ':^*': true,
  ':^@': true,
  '):': true,
  '(:': true,
  '$:': true,
  '*:': true,
  ')-:': true,
  '(-:': true,
  '$-:': true,
  '*-:': true,
  ')^:': true,
  '(^:': true,
  '$^:': true,
  '*^:': true,
  '<3': true,
  '</3': true,
  '<\\3': true
};

},{}],234:[function(_dereq_,module,exports){
'use strict';
//markov-like stats about co-occurance, for hints about unknown terms
//basically, a little-bit better than the noun-fallback
//just top n-grams from nlp tags, generated from nlp-corpus

//after this word, here's what happens usually
let afterThisWord = {
  i: 'Verb', //44% //i walk..
  first: 'Noun', //50% //first principles..
  it: 'Verb', //33%
  there: 'Verb', //35%
  // to: 'Verb', //32%
  not: 'Verb', //33%
  because: 'Noun', //31%
  if: 'Noun', //32%
  but: 'Noun', //26%
  who: 'Verb', //40%
  this: 'Noun', //37%
  his: 'Noun', //48%
  when: 'Noun', //33%
  you: 'Verb', //35%
  very: 'Adjective', // 39%
  old: 'Noun', //51%
  never: 'Verb', //42%
  before: 'Noun', //28%
};

//in advance of this word, this is what happens usually
let beforeThisWord = {
  there: 'Verb', //23% // be there
  me: 'Verb', //31% //see me
  man: 'Adjective', // 80% //quiet man
  only: 'Verb', //27% //sees only
  him: 'Verb', //32% //show him
  were: 'Noun', //48% //we were
  what: 'Verb', //25% //know what
  took: 'Noun', //38% //he took
  himself: 'Verb', //31% //see himself
  went: 'Noun', //43% //he went
  who: 'Noun', //47% //person who
  jr: 'Person'
};

//following this POS, this is likely
let afterThisPos = {
  Adjective: 'Noun', //36% //blue dress
  Possessive: 'Noun', //41% //his song
  Determiner: 'Noun', //47%
  Adverb: 'Verb', //20%
  // Person: 'Verb', //40%
  Pronoun: 'Verb', //40%
  Value: 'Noun', //47%
  Ordinal: 'Noun', //53%
  Modal: 'Verb', //35%
  Superlative: 'Noun', //43%
  Demonym: 'Noun', //38%
  Organization: 'Verb', //33%
  Honorific: 'Person', //
// FirstName: 'Person', //
};

//in advance of this POS, this is likely
let beforeThisPos = {
  Copula: 'Noun', //44% //spencer is
  PastTense: 'Noun', //33% //spencer walked
  Conjunction: 'Noun', //36%
  Modal: 'Noun', //38%
  PluperfectTense: 'Noun', //40%
  PerfectTense: 'Verb', //32%
// LastName: 'FirstName', //
};
module.exports = {
  beforeThisWord: beforeThisWord,
  afterThisWord: afterThisWord,

  beforeThisPos: beforeThisPos,
  afterThisPos: afterThisPos
};

},{}],235:[function(_dereq_,module,exports){
//phrasal verbs are two words that really mean one verb.
//'beef up' is one verb, and not some direction of beefing.
//by @spencermountain, 2015 mit
//many credits to http://www.allmyphrasalverbs.com/
'use strict';

//start the list with some randoms
let main = {
  'be onto': true,
  'fall behind': true,
  'fall through': true,
  'fool with': true,
  'get across': true,
  'get along': true,
  'get at': true,
  'give way': true,
  'hear from': true,
  'hear of': true,
  'keep from': true,
  'lash into': true,
  'make do': true,
  'run across': true,
  'set upon': true,
  'take aback': true,
};

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
  'in': 'bang,barge,bash,beat,block,book,box,break,bring,burn,butt,carve,cash,check,come,cross,drop,fall,fence,fill,give,grow,hand,hang,head,jack,keep,leave,let,lock,log,move,opt,pack,peel,pull,put,reach,ring,rub,send,set,settle,shut,sign,smash,snow,strike,take,try,turn,type,warm,wave,wean,wear,wheel',
  'on': 'add,call,carry,catch,count,feed,get,give,go,grind,head,hold,keep,lay,log,pass,pop,power,put,send,show,snap,switch,take,tell,try,turn,wait',
  'over': 'come,go,look,read,run,talk',
  'together': 'come,pull,put',
  'up': 'add,back,beat,bend,blow,boil,bottle,break,bring,buckle,bulk,bundle,call,carve,clean,cut,dress,fill,flag,fold,get,give,grind,grow,hang,hold,keep,let,load,lock,look,man,mark,melt,move,pack,pin,pipe,plump,pop,power,pull,put,rub,scale,scrape,send,set,settle,shake,show,sit,slow,smash,square,stand,strike,take,tear,tie,top,turn,use,wash,wind'
};
Object.keys(symmetric).forEach(function(k) {
  symmetric[k].split(',').forEach(function(s) {
    //add the given form
    main[s + ' ' + k] = true;
    //add its opposite form
    main[s + ' ' + opposites[k]] = true;
  });
});

//forms that don't have in/out symmetry
const asymmetric = {
  'about': 'bring,fool,gad,go,root,mess',
  'after': 'go,look,take',
  'ahead': 'get,go,press',
  'along': 'bring,move',
  'apart': 'fall,take',
  'around': 'ask,boss,bring,call,come,fool,get,horse,joke,lie,mess,play',
  'away': 'back,carry,file,frighten,hide,wash',
  'back': 'fall,fight,hit,hold,look,pay,stand,think',
  'by': 'come,drop,get,go,stop,swear,swing,tick,zip',
  'down': 'bog,calm,fall,hand,hunker,jot,knock,lie,narrow,note,pat,pour,run,tone,trickle,wear',
  'for': 'fend,file,gun,hanker,root,shoot',
  'forth': 'bring,come',
  'forward': 'come,look',
  'in': 'cave,chip,hone,jump,key,pencil,plug,rein,shade,sleep,stop,suck,tie,trade,tuck,usher,weigh,zero',
  'into': 'look,run',
  'it': 'go,have',
  'off': 'auction,be,beat,blast,block,brush,burn,buzz,cast,cool,drop,end,face,fall,fend,frighten,goof,jack,kick,knock,laugh,level,live,make,mouth,nod,pair,pay,peel,read,reel,ring,rip,round,sail,shave,shoot,sleep,slice,split,square,stave,stop,storm,strike,tear,tee,tick,tip,top,walk,work,write',
  'on': 'bank,bargain,frown,hit,latch,pile,prattle,press,spring,spur,tack,urge,yammer',
  'out': 'act,ask,back,bail,bear,black,blank,bleed,blow,blurt,branch,buy,cancel,cut,eat,edge,farm,figure,find,fill,find,fish,fizzle,flake,flame,flare,flesh,flip,geek,get,help,hide,hold,iron,knock,lash,level,listen,lose,luck,make,max,miss,nerd,pan,pass,pick,pig,point,print,psych,rat,read,rent,root,rule,run,scout,see,sell,shout,single,sit,smoke,sort,spell,splash,stamp,start,storm,straighten,suss,time,tire,top,trip,trot,wash,watch,weird,whip,wimp,wipe,work,zone,zonk',
  'over': 'bend,bubble,do,fall,get,gloss,hold,keel,mull,pore,sleep,spill,think,tide,tip',
  'round': 'get,go',
  'through': 'go,run',
  'to': 'keep,see',
  'up': 'act,beef,board,bone,boot,brighten,build,buy,catch,cheer,cook,end,eye,face,fatten,feel,fess,fill,fuck,fish,finish,fire,firm,flame,flare,free,freeze,freshen,fry,fuel,gang,gear,goof,hack,ham,heat,hit,hole,hush,jazz,juice,lap,light,lighten,line,link,listen,live,loosen,make,mash,measure,mess,mix,mock,mop,muddle,open,own,pair,patch,pick,prop,psych,read,rough,rustle,save,shack,sign,size,slice,slip,snap,sober,spark,split,spruce,stack,start,stay,stir,stitch,straighten,string,suck,suit,sum,step,team,tee,think,tidy,tighten,toss,trade,trip,type,vacuum,wait,wake,warm,weigh,whip,wire,wise,word,write,zip'
};
Object.keys(asymmetric).forEach(function(k) {
  asymmetric[k].split(',').forEach(function(s) {
    main[s + ' ' + k] = true;
  });
});

module.exports = main;

},{}],236:[function(_dereq_,module,exports){
//these are regexes applied to t.text, instead of t.normal
module.exports = [
  //#funtime
  ['^#[a-z]+', 'HashTag'],
  //chillin'
  ['[a-z]+n\'', 'Gerund'],
  //spencers'
  ['[a-z]+s\'', 'Possessive'],
  //589-3809
  ['[0-9]{3}-[0-9]{4}', 'PhoneNumber'],
  //632-589-3809
  ['\\(?[0-9]{3}\\)?[ -]?[0-9]{3}-[0-9]{4}', 'PhoneNumber'],

  //dates/times
  ['[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])', 'Time'], //4:32:32
  ['[012]?[0-9](:[0-5][0-9])?(:[0-5][0-9])? ?(am|pm)', 'Time'], //4pm
  ['[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])? ?(am|pm)?', 'Time'], //4:00pm
  ['[PMCE]ST', 'Time'], //PST, time zone abbrevs
  ['utc ?[\+\-]?[0-9]\+?', 'Time'], //UTC 8+
  ['[a-z0-9]*? o\'?clock', 'Time'], //3 oclock
  ['[0-9]{1,4}[/\\-\\.][0-9]{1,2}[/\\-\\.][0-9]{1,4}', 'Date'], //03/02/89, 03-02-89

  //money
  ['^[\-\+]?[$€¥£][0-9]+(\.[0-9]{1,2})?$', 'Money'], //like $5.30
  ['^[\-\+]?[$€¥£][0-9]{1,3}(,[0-9]{3})+(\.[0-9]{1,2})?$', 'Money'], //like $5,231.30

  //values
  ['[0-9]{1,4}(st|nd|rd|th)?-[0-9]{1,4}(st|nd|rd|th)?', 'NumberRange'], //5-7
  ['^[\-\+]?[0-9]{1,3}(,[0-9]{3})+(\.[0-9]+)?$', 'NiceNumber'], //like 5,999.0
  ['^[\-\+]?[0-9]+(\.[0-9]+)?$', 'NumericValue'], //like +5.0

  ['[0-9]{1,4}/[0-9]{1,4}', 'Fraction'], //3/2ths
  ['[0-9]{1,2}-[0-9]{1,2}', 'Value'], //7-8

  //mc'adams
  ['ma?c\'.*', 'LastName'],
  //o'douggan
  ['o\'[drlkn].*', 'LastName'],

].map(function (a) {
  return {
    reg: new RegExp('^' + a[0] + '$', 'i'),
    tag: a[1],
    str: a[0]
  };
});

},{}],237:[function(_dereq_,module,exports){
'use strict';
//regex suffix patterns and their most common parts of speech,
//built using wordnet, by spencer kelly.

//the order here matters.
module.exports = [
  ['^[0-9]+ ?(am|pm)$', 'Date'],
  ['[0-9](st|nd|rd|r?th)$', 'Ordinal'], //like 5th
  ['([0-9])([a-z]{1,2})$', 'Cardinal'], //like 5kg
  ['^[0-9,\.]+$', 'Cardinal'], //like 5
  ['^[a-z]et$', 'Verb'],
  ['cede$', 'Infinitive'],
  ['.[cts]hy$', 'Adjective'],
  ['.[st]ty$', 'Adjective'],
  ['.[lnr]ize$', 'Infinitive'],
  ['.[gk]y$', 'Adjective'],
  ['.fies$', 'PresentTense'],
  ['ities$', 'Plural'],
  ['.some$', 'Adjective'],
  ['.[nrtumcd]al$', 'Adjective'],
  ['.que$', 'Adjective'],
  ['.[tnl]ary$', 'Adjective'],
  ['.[di]est$', 'Superlative'],
  ['^(un|de|re)\\-[a-z]..', 'Verb'],
  ['.lar$', 'Adjective'],
  ['[bszmp]{2}y', 'Adjective'],
  ['.zes$', 'PresentTense'],
  ['.[icldtgrv]ent$', 'Adjective'],
  ['.[rln]ates$', 'PresentTense'],
  ['.[oe]ry$', 'Singular'],
  ['[rdntkbhs]ly$', 'Adverb'],
  ['.[lsrnpb]ian$', 'Adjective'],
  ['.[^aeiou]ial$', 'Adjective'],
  ['.[^aeiou]eal$', 'Adjective'],
  ['.[vrl]id$', 'Adjective'],
  ['.[ilk]er$', 'Comparative'],
  ['.ike$', 'Adjective'],
  ['.ends?$', 'Verb'],
  ['.wards$', 'Adverb'],
  ['.rmy$', 'Adjective'],
  ['.rol$', 'Singular'],
  ['.tors$', 'Noun'],
  ['.azy$', 'Adjective'],
  ['.where$', 'Adverb'],
  ['.ify$', 'Infinitive'],
  ['.bound$', 'Adjective'],
  ['.[^z]ens$', 'Verb'],
  ['.oid$', 'Adjective'],
  ['.vice$', 'Singular'],
  ['.rough$', 'Adjective'],
  ['.mum$', 'Adjective'],
  ['.teen(th)?$', 'Value'],
  ['.oses$', 'PresentTense'],
  ['.ishes$', 'PresentTense'],
  ['.ects$', 'PresentTense'],
  ['.tieth$', 'Ordinal'],
  ['.ices$', 'Plural'],
  ['.tage$', 'Infinitive'],
  ['.ions$', 'Plural'],
  ['.tion$', 'Singular'],
  ['.ean$', 'Adjective'],
  ['.[ia]sed$', 'Adjective'],
  ['.urned', 'PastTense'],
  ['.tized$', 'PastTense'],
  ['.[aeiou][td]ed', 'PastTense'],
  ['.llen$', 'Adjective'],
  ['.fore$', 'Adverb'],
  ['.ances$', 'Plural'],
  ['.gate$', 'Infinitive'],
  ['.nes$', 'PresentTense'],
  ['.less$', 'Adverb'],
  ['.ried$', 'Adjective'],
  ['.gone$', 'Adjective'],
  ['.made$', 'Adjective'],
  ['.ing$', 'Gerund'], //likely to be converted to adjective after lexicon pass
  ['.tures$', 'Plural'],
  ['.ous$', 'Adjective'],
  ['.ports$', 'Plural'],
  ['. so$', 'Adverb'],
  ['.ints$', 'Plural'],
  ['.[gt]led$', 'Adjective'],
  ['.lked$', 'PastTense'],
  ['.fully$', 'Adverb'],
  ['.*ould$', 'Modal'],
  ['^[\-\+]?[0-9]+(\.[0-9]+)?$', 'NumericValue'],
  ['[a-z]*\\-[a-z]*\\-', 'Adjective'],
  ['[a-z]\'s$', 'Noun'],
  ['.\'n$', 'Verb'],
  ['.\'re$', 'Copula'],
  ['.\'ll$', 'Modal'],
  ['.\'t$', 'Verb'],
  ['.tches$', 'PresentTense'],
  ['^https?\:?\/\/[a-z0-9]', 'Url'], //the colon is removed in normalisation
  ['^www\.[a-z0-9]', 'Url'],
  ['.ize$', 'Infinitive'],
  ['.[^aeiou]ise$', 'Infinitive'],
  ['.[aeiou]te$', 'Infinitive'],
  ['.ea$', 'Singular'],
  ['[aeiou][pns]er$', 'Singular'],
  ['.ia$', 'Noun'],
  ['.sis$', 'Singular'],
  ['.[aeiou]na$', 'Noun'],
  ['.[^aeiou]ity$', 'Singular'],
  ['.[^aeiou]ium$', 'Singular'],
  ['.[^aeiou][ei]al$', 'Adjective'],
  ['.ffy$', 'Adjective'],
  ['.[^aeiou]ic$', 'Adjective'],
  ['.(gg|bb|zz)ly$', 'Adjective'],
  ['.[aeiou]my$', 'Adjective'],
  ['.[^aeiou][ai]ble$', 'Adjective'],
  ['.[^aeiou]eable$', 'Adjective'],
  ['.[^aeiou]ful$', 'Adjective'],
  ['.[^aeiouf]ish$', 'Adjective'],
  ['.[^aeiou]ica$', 'Singular'],
  ['[aeiou][^aeiou]is$', 'Singular'],
  ['[^aeiou]ard$', 'Singular'],
  ['[^aeiou]ism$', 'Singular'],
  ['.[^aeiou]ity$', 'Singular'],
  ['.[^aeiou]ium$', 'Singular'],
  ['.[lstrn]us$', 'Singular'],
  ['..ic$', 'Adjective'],
  ['[aeiou][^aeiou]id$', 'Adjective'],
  ['.[^aeiou]ive$', 'Adjective'],
  ['[ea]{2}zy$', 'Adjective'],
  ['[^aeiou]ician$', 'Actor'],
  ['.keeper$', 'Actor'],
  ['.logist$', 'Actor'],
  ['..ier$', 'Actor'],
  ['.ettes$', 'Plural'],
  ['.ette$', 'Singular'],
  ['.[^aeiou][ao]pher$', 'Actor'],
  ['.tive$', 'Actor'],
  ['[aeiou].*ist$', 'Adjective'],
  ['(over|under)[a-z]{2,}$', 'Adjective'],
  ['[^i]fer$', 'Infinitive'],
  ['[aeiou]c?ked$', 'PastTense'], //hooked
  ['(eastern|central|mountain|pacific)( standard)? time', 'Time'], //PST, eastern time.  Todo:(only American right now)
  //slang things
  ['^um+$', 'Expression'], //ummmm
  ['^([hyj]a)+$', 'Expression'], //hahah
  ['^(k)+$', 'Expression'], //kkkk
  ['^(yo)+$', 'Expression'], //yoyo
  ['^yes+$', 'Expression'], //yessss
  ['^no+$', 'Expression'], //noooo
  ['^lol[sz]$', 'Expression'], //lol
  ['^woo+[pt]?$', 'Expression'], //woo
  ['^ug?h+$', 'Expression'], //uhh
  ['^uh[ -]?oh$', 'Expression'], //uhoh

  //lastname patterns
  //https://en.wikipedia.org/wiki/List_of_family_name_affixes
  //macdonell
  ['^ma?cd[aeiou]', 'LastName'],
  //icelandic/swedish
  ['.sdottir$', 'LastName'], //female
  ['.sson$', 'LastName'], //male
  //polish
  ['.[oau][wvl]ski$', 'LastName'], //male
  ['.[oau][wvl]ska$', 'LastName'], //female
  ['.czyk$', 'LastName'], //male
  ['.marek$', 'LastName'], //male
  //east-europe Hasanov, etc
  ['.[^aeiou][ai][kln]ov$', 'LastName'], //
  ['..chuk$', 'LastName'], //
  ['..enko$', 'LastName'], //
  ['.v[iy]ch$', 'LastName'], //
  //greek
  ['.opoulos$', 'LastName'], //
  ['.akis$', 'LastName'], //
  //lithuania
  ['.auskas$', 'LastName'],
  //norway
  ['.nss?en$', 'LastName']

].map(function (a) {
  return {
    reg: new RegExp(a[0]),
    tag: a[1],
    str: a[0]
  };
});

},{}]},{},[41])(41)
});