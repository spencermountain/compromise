(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nlp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports={
  "author": "Spencer Kelly <spencermountain@gmail.com> (http://spencermounta.in)",
  "name": "compromise",
  "description": "natural language processing in the browser",
  "version": "7.0.28",
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
    "builds/",
    "docs/"
  ],
  "dependencies": {},
  "devDependencies": {
    "babel-plugin-transform-es3-member-expression-literals": "^6.22.0",
    "babel-plugin-transform-es3-property-literals": "^6.22.0",
    "babel-preset-es2015": "6.9.0",
    "babel-preset-stage-2": "^6.11.0",
    "babelify": "7.3.0",
    "babili": "0.0.11",
    "browserify": "13.0.1",
    "browserify-glob": "^0.2.0",
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

var fns = _dereq_('../fns');

//suffix-index adjectives
//  {cial:'cru,spe'} -> 'crucial', 'special'
var compressed = {
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

var arr = ['ablaze', 'above', 'adult', 'ahead', 'aloof', 'arab', 'asleep', 'average', 'backwards', 'bad', 'blank', 'bogus', 'bottom', 'brisk', 'cagey', 'chief', 'civil', 'common', 'complex', 'cozy', 'crisp', 'devout', 'difficult', 'due', 'dumb', 'eerie', 'evil', 'excess', 'extra', 'fake', 'far', 'faux', 'fierce ', 'final', 'fit', 'foreign', 'fun', 'good', 'goofy', 'gratis', 'grey', 'groovy', 'gross', 'half', 'huge', 'humdrum', 'inside', 'kaput', 'left', 'level', 'lewd', 'magenta', 'makeshift', 'mammoth', 'medium', 'modern', 'moot', 'naive', 'nearby', 'next', 'nonstop', 'north', 'notable', 'offbeat', 'ok', 'online', 'offline', 'outside', 'overwrought', 'premium', 'pricey', 'pro', 'quaint', 'random', 'rear', 'rebel', 'ritzy', 'savvy', 'sexy', 'shut', 'shy', 'sleek', 'smug', 'solemn', 'south', 'stark', 'superb', 'taboo', 'teenage', 'top', 'tranquil', 'true', 'ultra', 'understood', 'unfair', 'unknown', 'upbeat', 'upstairs', 'vanilla', 'various', 'widespread', 'woozy', 'wrong',
//in
'certain', 'highfalutin', 'main', 'vain'];

module.exports = fns.uncompress_suffixes(arr, compressed);

},{"../fns":7}],3:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');
//these are adjectives that can become comparative + superlative with out "most/more"
//its a whitelist for conjugation
//this data is shared between comparative/superlative methods

var compressed = {
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
  ate: 'adequ,delic,fortun,inadequ,inn,intim,legitim,priv,sed,ultim'
};
var arr = ['absurd', 'aggressive', 'alert', 'alive', 'angry', 'attractive', 'awesome', 'beautiful', 'big', 'bitter', 'black', 'blue', 'bored', 'boring', 'brash', 'brave', 'brief', 'brown', 'calm', 'charming', 'cheap', 'check', 'clean', 'clear', 'close', 'cold', 'cool', 'cruel', 'curly', 'cute', 'dangerous', 'dear', 'dirty', 'drunk', 'dry', 'dull', 'eager', 'early', 'easy', 'efficient', 'empty', 'even', 'extreme', 'faint', 'fair', 'fanc', 'feeble', 'few', 'fierce', 'fine', 'firm', 'forgetful', 'formal', 'frail', 'free', 'full', 'funny', 'gentle', 'glad', 'glib', 'glad', 'grand', 'green', 'gruesome', 'handsome', 'happy', 'harsh', 'heavy', 'high', 'hollow', 'hot', 'hungry', 'impolite', 'important', 'innocent', 'intellegent', 'interesting', 'keen', 'kind', 'lame', 'large', 'late', 'lean', 'little', 'long', 'loud', 'low', 'lucky', 'lush', 'macho', 'mature', 'mean', 'meek', 'mellow', 'mundane', 'narrow', 'near', 'neat', 'new', 'nice', 'noisy', 'normal', 'odd', 'old', 'orange', 'pale', 'pink', 'plain', 'poor', 'proud', 'pure', 'purple', 'rapid', 'rare', 'raw', 'rich', 'rotten', 'round', 'rude', 'safe', 'scarce', 'scared', 'shallow', 'shrill', 'simple', 'slim', 'slow', 'small', 'smooth', 'solid', 'soon', 'sore', 'sour', 'square', 'stale', 'steep', 'strange', 'strict', 'strong', 'swift', 'tall', 'tame', 'tart', 'tender', 'tense', 'thin', 'thirsty', 'tired', 'true', 'vague', 'vast', 'vulgar', 'warm', 'weird', 'wet', 'wild', 'windy', 'wise', 'yellow', 'young'];

module.exports = fns.uncompress_suffixes(arr, compressed);

},{"../fns":7}],4:[function(_dereq_,module,exports){
'use strict';

//adjectives that become verbs with +'en' (short->shorten)

//ones that also become superlative/comparative (short -> shortest)
module.exports = ['bright', 'broad', 'coarse', 'damp', 'dark', 'dead', 'deaf', 'deep', 'fast', 'fat', 'flat', 'fresh', 'great', 'hard', 'light', 'loose', 'mad', 'moist', 'quick', 'quiet', 'red', 'ripe', 'rough', 'sad', 'sharp', 'short', 'sick', 'smart', 'soft', 'stiff', 'straight', 'sweet', 'thick', 'tight', 'tough', 'weak', 'white', 'wide'];

},{}],5:[function(_dereq_,module,exports){
'use strict';
//terms that are 'Date' term

var months = ['january', 'february',
// "march",  //ambig
'april',
// "may",   //ambig
'june', 'july', 'august', 'september', 'october', 'november', 'december', 'jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'sept', 'sep'];

var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'];
//add plural eg.'mondays'
for (var i = 0; i <= 6; i++) {
  days.push(days[i] + 's');
}

var durations = ['millisecond',
// 'second',
'minute', 'hour', 'day', 'week', 'month', 'year', 'decade'];
//add their plurals
var len = durations.length;
for (var _i = 0; _i < len; _i++) {
  durations.push(durations[_i]);
  durations.push(durations[_i] + 's');
}
durations.push('century');
durations.push('centuries');
durations.push('seconds');

var relative = ['yesterday', 'today', 'tomorrow',
// 'week',
'weekend', 'tonight'];

module.exports = {
  days: days,
  months: months,
  durations: durations,
  relative: relative
};

},{}],6:[function(_dereq_,module,exports){
'use strict';

module.exports = ['all hallows eve', 'all saints day', 'all sts day', 'april fools', 'armistice day', 'australia day', 'bastille day', 'boxing day', 'canada day', 'christmas', 'christmas eve', 'cinco de mayo', 'emancipation day', 'groundhog day', 'halloween', '16 de septiembre', 'dieciseis de septiembre', 'grito de dolores', 'all hallows eve', 'day of the dead', 'dia de muertos', 'harvey milk day', 'inauguration day', 'independence day', 'independents day', 'juneteenth', 'labour day', 'national freedom day', 'national nurses day', 'new years', 'new years eve', 'purple heart day', 'rememberance day', 'rosa parks day', 'saint andrews day', 'saint patricks day', 'saint stephens day', 'saint valentines day', 'st andrews day', 'st patricks day', 'st stephens day', 'st valentines day ', 'valentines day', 'veterans day', 'victoria day', 'womens equality day', 'xmas',
// Fixed religious and cultural holidays
// Catholic + Christian
'epiphany', 'orthodox christmas day', 'orthodox new year', 'assumption of mary', 'all saints day', 'all souls day', 'feast of the immaculate conception', 'feast of our lady of guadalupe',

// Kwanzaa
'kwanzaa',

// Pagan / metal 🤘
'imbolc', 'beltaine', 'lughnassadh', 'samhain', 'martin luther king day', 'mlk day', 'presidents day', 'mardi gras', 'tax day', 'commonwealth day', 'mothers day', 'memorial day', 'fathers day', 'columbus day', 'indigenous peoples day', 'canadian thanksgiving', 'election day', 'thanksgiving', 't-day', 'turkey day', 'black friday', 'cyber monday',

// Astronomical religious and cultural holidays
// Catholic + Christian
'ash wednesday', 'palm sunday', 'maundy thursday', 'good friday', 'holy saturday', 'easter', 'easter sunday', 'easter monday', 'orthodox good friday', 'orthodox holy saturday', 'orthodox easter', 'orthodox easter monday', 'ascension day', 'pentecost', 'whitsunday', 'whit sunday', 'whit monday', 'trinity sunday', 'corpus christi', 'advent',

// Jewish
'tu bishvat', 'tu bshevat', 'purim', 'passover', 'yom hashoah', 'lag baomer', 'shavuot', 'tisha bav', 'rosh hashana', 'yom kippur', 'sukkot', 'shmini atzeret', 'simchat torah', 'chanukah', 'hanukkah',

// Muslim
'isra and miraj', 'lailat al-qadr', 'eid al-fitr', 'id al-Fitr', 'eid ul-Fitr', 'ramadan', 'eid al-adha', 'muharram', 'the prophets birthday',

// Pagan / metal 🤘
'ostara', 'march equinox', 'vernal equinox', 'litha', 'june solistice', 'summer solistice', 'mabon', 'september equinox', 'autumnal equinox', 'yule', 'december solstice', 'winter solstice',

// Additional important holidays
'chinese new year', 'diwali'];

},{}],7:[function(_dereq_,module,exports){
'use strict';

//shallow-merge an object

exports.extendObj = function (o, o2) {
  Object.keys(o2).forEach(function (k) {
    o[k] = o2[k];
  });
  return o;
};

//uncompress data in the adhoc compressed form {'ly':'kind,quick'}
exports.uncompress_suffixes = function (list, obj) {
  var keys = Object.keys(obj);
  var l = keys.length;
  for (var i = 0; i < l; i++) {
    var arr = obj[keys[i]].split(',');
    for (var i2 = 0; i2 < arr.length; i2++) {
      list.push(arr[i2] + keys[i]);
    }
  }
  return list;
};

//uncompress data in the adhoc compressed form {'over':'blown,kill'}
exports.uncompress_prefixes = function (list, obj) {
  var keys = Object.keys(obj);
  var l = keys.length;
  for (var i = 0; i < l; i++) {
    var arr = obj[keys[i]].split(',');
    for (var i2 = 0; i2 < arr.length; i2++) {
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

  'misc': _dereq_('./misc/misc')
};

},{"./adjectives/adjectives":2,"./adjectives/superlatives":3,"./adjectives/verbConverts":4,"./dates/dates":5,"./dates/holidays":6,"./misc/misc":13,"./nouns/abbreviations":15,"./nouns/demonyms":16,"./nouns/irregular_plurals":17,"./nouns/nouns":18,"./nouns/places":19,"./nouns/professions":20,"./nouns/uncountables":21,"./organizations/bands":22,"./organizations/orgWords":23,"./organizations/organizations":24,"./organizations/sportsTeams":25,"./people/firstnames":28,"./people/lastnames":29,"./people/notable":31,"./people/titles":32,"./values/currencies":33,"./values/numbers":34,"./values/ordinalMap":35,"./values/units":36,"./verbs/irregular_verbs":37,"./verbs/verbs":39}],9:[function(_dereq_,module,exports){
'use strict';
//a lexicon is a giant object of known words and their assumed pos-tag.
//the way we make it rn is a bit of a mess.

var data = _dereq_('./index');
var fns = _dereq_('./fns');
var toPlural = _dereq_('../result/subset/nouns/methods/pluralize');
var adj = _dereq_('../result/subset/adjectives/methods/index');
var toAdjective = _dereq_('../result/subset/verbs/methods/toAdjective');
var fastConjugate = _dereq_('../result/subset/verbs/methods/conjugate/faster');
var lexicon = {};
// console.time('lexicon');

var addObj = function addObj(o) {
  fns.extendObj(lexicon, o);
};
var addArr = function addArr(arr, tag) {
  var l = arr.length;
  for (var i = 0; i < l; i++) {
    lexicon[arr[i]] = tag;
  }
};

//let a rip
addArr(data.uncountables, 'Noun');
var units = data.units.words.filter(function (s) {
  return s.length > 1;
});
addArr(units, 'Unit');
addArr(data.dates.durations, 'Duration');

addObj(data.abbreviations);
//number-words are well-structured
var obj = data.numbers.ordinal;
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
Object.keys(data.irregular_verbs).forEach(function (inf) {
  lexicon[inf] = 'Infinitive';
  var conj = data.irregular_verbs[inf];
  Object.keys(conj).forEach(function (k2) {
    if (conj[k2]) {
      lexicon[conj[k2]] = k2;
    }
  });
  var o = fastConjugate(inf);
  Object.keys(o).forEach(function (k) {
    if (o[k] && !lexicon[o[k]]) {
      lexicon[o[k]] = k;
    }
  });
});

//conjugate verblist
data.verbs.forEach(function (v) {
  var o = fastConjugate(v);
  Object.keys(o).forEach(function (k) {
    if (o[k] && !lexicon[o[k]]) {
      lexicon[o[k]] = k;
    }
  });
  lexicon[toAdjective(v)] = 'Adjective';
});

//conjugate adjectives
data.superlatives.forEach(function (a) {
  lexicon[adj.toNoun(a)] = 'Noun';
  lexicon[adj.toAdverb(a)] = 'Adverb';
  lexicon[adj.toSuperlative(a)] = 'Superlative';
  lexicon[adj.toComparative(a)] = 'Comparative';
});

//even more expressive adjectives
data.verbConverts.forEach(function (a) {
  lexicon[adj.toNoun(a)] = 'Noun';
  lexicon[adj.toAdverb(a)] = 'Adverb';
  lexicon[adj.toSuperlative(a)] = 'Superlative';
  lexicon[adj.toComparative(a)] = 'Comparative';

  var v = adj.toVerb(a);
  lexicon[v] = 'Verb';
  //now conjugate it
  var o = fastConjugate(v);
  Object.keys(o).forEach(function (k) {
    if (o[k] && !lexicon[o[k]]) {
      lexicon[o[k]] = k;
    }
  });
});

//inflect nouns
data.nouns.forEach(function (n) {
  lexicon[n] = 'Singular';
  var plural = toPlural(n);
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

},{"../result/subset/adjectives/methods/index":61,"../result/subset/nouns/methods/pluralize":98,"../result/subset/verbs/methods/conjugate/faster":137,"../result/subset/verbs/methods/toAdjective":148,"./fns":7,"./index":8}],10:[function(_dereq_,module,exports){
'use strict';

module.exports = [
// 'now',
'a lot', 'a posteriori', 'abroad', 'ad nauseam', 'again', 'all but', 'all that', 'almost', 'alone', 'already', 'also', 'always', 'anymore', 'anyway', 'apart', 'aside', 'at best', 'at large', 'at least', 'at most', 'at worst', 'away', 'by far', 'by now', 'damn', 'de jure', 'de trop', 'directly', 'en masse', 'ever', 'for example', 'for good', 'for sure', 'forever', 'further', 'furthermore', 'hence', 'indeed', 'instead', 'just', 'just about', 'kinda', 'maybe', 'meanwhile', 'more', 'moreover', 'newly', 'no longer', 'not withstanding', 'of course', 'often', 'once', 'once again', 'once more', 'only', 'par excellence', 'per se', 'perhaps', 'point blank', 'quite', 'randomly', 'rather', 'really', 'several', 'so', 'somehow', 'sometimes', 'somewhat', 'soon', 'sort of', 'such', 'then', 'thus', 'too', 'totally', 'toward', 'twice', 'up to', 'upwards of', 'very', 'way', 'well', 'yes', 'yep'];

},{}],11:[function(_dereq_,module,exports){
'use strict';

module.exports = ['this', 'any', 'enough', 'each', 'whatever', 'every', 'these', 'another', 'plenty', 'whichever', 'neither', 'an', 'a', 'least', 'own', 'few', 'both', 'those', 'the', 'that', 'various', 'either', 'much', 'some', 'else',
//some other languages (what could go wrong?)
'la', 'le', 'les', 'des', 'de', 'du', 'el'];

},{}],12:[function(_dereq_,module,exports){
'use strict';

module.exports = ['uh', 'uhh', 'uhm', 'uh huh', 'uh-oh', 'please', 'plz', 'ugh', 'sheesh', 'eww', 'pff', 'voila', 'oy', 'hi', 'hello', 'bye', 'goodbye', 'hey', 'hai', 'eep', 'hurrah', 'yuck', 'ow', 'duh', 'oh', 'hmm', 'yeah', 'whoa', 'ooh', 'whee', 'ah', 'bah', 'gah', 'yaa', 'phew', 'gee', 'ahem', 'eek', 'meh', 'yahoo', 'oops', 'd\'oh', 'psst', 'argh', 'grr', 'nah', 'shhh', 'whew', 'mmm', 'ooo', 'yay', 'uh-huh', 'boo', 'wow', 'nope', 'haha', 'hahaha', 'lol', 'lols', 'lmao', 'lmfao', 'ya', 'hee', 'ohh', 'eh', 'yup', 'wtf', 'wtaf', 'et cetera', 'fuck', 'shit', 'damn', 'dang', 'damnit', 'dammit', 'hell', 'a la'];

},{}],13:[function(_dereq_,module,exports){
'use strict';

var misc = {
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

var compact = {
  Adjective: ['so called', //?
  'on board', 'vice versa', 'en route', 'upside down', 'up front', 'in front', 'in situ', 'in vitro', 'ad hoc', 'de facto', 'ad infinitum', 'for keeps', 'a priori', 'off guard', 'spot on', 'ipso facto', 'fed up', 'brand new', 'old fashioned', 'bona fide', 'well off', 'far off', 'straight forward', 'hard up', 'sui generis', 'en suite', 'avant garde', 'sans serif', 'gung ho', 'super duper', 'bourgeois'],

  Verb: ['lengthen', 'heighten', 'worsen', 'lessen', 'awaken', 'frighten', 'threaten', 'hasten', 'strengthen', 'given',
  //misc
  'known', 'shown', 'seen', 'born'],

  Place: ['new england', 'new hampshire', 'new jersey', 'new mexico', 'united states', 'united kingdom', 'great britain', 'great lakes', 'pacific ocean', 'atlantic ocean', 'indian ocean', 'arctic ocean', 'antarctic ocean', 'everglades'],
  //conjunctions
  'Conjunction': ['yet', 'therefore', 'or', 'while', 'nor', 'whether', 'though', 'tho', 'because', 'cuz', 'but', 'for', 'and', 'however', 'before', 'although', 'how', 'plus', 'versus', 'otherwise'],
  Time: [
  //date
  'noon', 'midnight', 'now', 'morning', 'evening', 'afternoon', 'night', 'breakfast time', 'lunchtime', 'dinnertime', 'ago', 'sometime', 'eod', 'oclock'],
  Date: [
  //end of day, end of month
  'eom', 'standard time', 'daylight time'],
  'Condition': ['if', 'unless', 'notwithstanding'],

  'PastTense': ['said', 'had', 'been', 'began', 'came', 'did', 'meant', 'went'],

  'Gerund': ['going', 'being', 'according', 'resulting', 'developing', 'staining'],

  'Copula': ['is', 'are', 'was', 'were', 'am'],

  //determiners
  'Determiner': _dereq_('./determiners'),

  //prepositions
  'Preposition': _dereq_('./prepositions'),

  //modal verbs
  'Modal': ['can', 'may', 'could', 'might', 'will', 'ought to', 'would', 'must', 'shall', 'should', 'ought', 'shant', 'lets'],

  //Possessive pronouns
  'Possessive': ['mine', 'something', 'none', 'anything', 'anyone', 'theirs', 'himself', 'ours', 'his', 'my', 'their', 'yours', 'your', 'our', 'its', 'herself', 'hers', 'themselves', 'myself', 'her'],

  //personal pronouns (nouns)
  'Pronoun': ['it', 'they', 'i', 'them', 'you', 'she', 'me', 'he', 'him', 'ourselves', 'us', 'we', 'thou', 'il', 'elle', 'yourself', '\'em', 'he\'s', 'she\'s'],
  //questions are awkward pos. are clarified in question_pass
  'QuestionWord': ['where', 'why', 'when', 'who', 'whom', 'whose', 'what', 'which'],
  //some manual adverbs (the rest are generated)
  'Adverb': _dereq_('./adverbs'),

  //interjections, expressions
  'Expression': _dereq_('./expressions'),

  //family-terms are people
  Person: ['father', 'mother', 'mom', 'dad', 'mommy', 'daddy', 'sister', 'brother', 'aunt', 'uncle', 'grandfather', 'grandmother', 'cousin', 'stepfather', 'stepmother', 'boy', 'girl', 'man', 'woman', 'guy', 'dude', 'bro', 'gentleman', 'someone']
};
//unpack the compact terms into the misc lexicon..
var keys = Object.keys(compact);
for (var i = 0; i < keys.length; i++) {
  var arr = compact[keys[i]];
  for (var i2 = 0; i2 < arr.length; i2++) {
    misc[arr[i2]] = keys[i];
  }
}
module.exports = misc;

},{"./adverbs":10,"./determiners":11,"./expressions":12,"./prepositions":14}],14:[function(_dereq_,module,exports){
'use strict';

module.exports = ['\'o', 'a\'', 'about', 'across', 'after', 'along', 'amid', 'amidst', 'among', 'amongst', 'apropos', 'around', 'as', 'as long as', 'at', 'atop', 'barring', 'below', 'besides', 'between', 'by', 'chez', 'circa', 'despite', 'down', 'during', 'except', 'from', 'in', 'into',
// 'just like',
'mid', 'midst', 'notwithstanding', 'o\'', 'of', 'off', 'on', 'onto', 'out', 'per', 'qua', 'sans', 'since', 'so that', 'than', 'through', 'throughout', 'thru', 'till', 'to', 'towards', 'unlike', 'until', 'up', 'upon', 'versus', 'via', 'vis-a-vis', 'w/o', 'whereas', 'with', 'within', 'without', '-' //june - july
];

},{}],15:[function(_dereq_,module,exports){
//these are common word shortenings used in the lexicon and sentence segmentation methods
//there are all nouns,or at the least, belong beside one.
'use strict';

//common abbreviations

var compact = {
  Noun: ['arc', 'al', 'exp', 'fy', 'pd', 'pl', 'plz', 'tce', 'bl', 'ma', 'ba', 'lit', 'ex', 'eg', 'ie', 'ca', 'cca', 'vs', 'etc', 'esp', 'ft',
  //these are too ambiguous
  'bc', 'ad', 'md', 'corp', 'col'],
  Organization: ['dept', 'univ', 'assn', 'bros', 'inc', 'ltd', 'co',
  //proper nouns with exclamation marks
  'yahoo', 'joomla', 'jeopardy'],

  Place: ['rd', 'st', 'dist', 'mt', 'ave', 'blvd', 'cl', 'ct', 'cres', 'hwy',
  //states
  'ariz', 'cal', 'calif', 'colo', 'conn', 'fla', 'fl', 'ga', 'ida', 'ia', 'kan', 'kans', 'minn', 'neb', 'nebr', 'okla', 'penna', 'penn', 'pa', 'dak', 'tenn', 'tex', 'ut', 'vt', 'va', 'wis', 'wisc', 'wy', 'wyo', 'usafa', 'alta', 'ont', 'que', 'sask'],

  Date: ['jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'sept', 'oct', 'nov', 'dec', 'circa'],

  //Honorifics
  Honorific: ['adj', 'adm', 'adv', 'asst', 'atty', 'bldg', 'brig', 'capt', 'cmdr', 'comdr', 'cpl', 'det', 'dr', 'esq', 'gen', 'gov', 'hon', 'jr', 'llb', 'lt', 'maj', 'messrs', 'mister', 'mlle', 'mme', 'mr', 'mrs', 'ms', 'mstr', 'op', 'ord', 'phd', 'prof', 'pvt', 'rep', 'reps', 'res', 'rev', 'sen', 'sens', 'sfc', 'sgt', 'sir', 'sr', 'supt', 'surg'
  //miss
  //misses
  ]

};

//unpack the compact terms into the misc lexicon..
var abbreviations = {};
var keys = Object.keys(compact);
for (var i = 0; i < keys.length; i++) {
  var arr = compact[keys[i]];
  for (var i2 = 0; i2 < arr.length; i2++) {
    abbreviations[arr[i2]] = keys[i];
  }
}
module.exports = abbreviations;

},{}],16:[function(_dereq_,module,exports){
'use strict';

//adjectival forms of place names, as adjectives.
module.exports = ['afghan', 'albanian', 'algerian', 'angolan', 'argentine', 'armenian', 'australian', 'aussie', 'austrian', 'bangladeshi', 'basque', // of Basque Country
'belarusian', 'belgian', 'bolivian', 'bosnian', 'brazilian', 'bulgarian', 'cambodian', 'cameroonian', 'canadian', 'chadian', 'chilean', 'chinese', 'colombian', 'congolese', 'croatian', 'cuban', 'czech', 'dominican', 'danish', 'egyptian', 'british', 'estonian', 'ethiopian', 'ecuadorian', 'finnish', 'french', 'gambian', 'georgian', 'german', 'greek', 'ghanaian', 'guatemalan', 'haitian', 'hungarian', 'honduran', 'icelandic', 'indian', 'indonesian', 'iranian', 'iraqi', 'irish', 'israeli', 'italian', 'ivorian', // of Ivory Coast
'jamaican', 'japanese', 'jordanian', 'kazakh', 'kenyan', 'korean', 'kuwaiti', 'lao', // of Laos
'latvian', 'lebanese', 'liberian', 'libyan', 'lithuanian', 'namibian', 'malagasy', // of Madagascar
'macedonian', 'malaysian', 'mexican', 'mongolian', 'moroccan', 'dutch', 'nicaraguan', 'nigerian', // of Nigeria
'nigerien', // of Niger
'norwegian', 'omani', 'panamanian', 'paraguayan', 'pakistani', 'palestinian', 'peruvian', 'philippine', 'filipino', 'polish', 'portuguese', 'qatari', 'romanian', 'russian', 'rwandan', 'samoan', 'saudi', 'scottish', 'senegalese', 'serbian', 'singaporean', 'slovak', 'somalian', 'sudanese', 'swedish', 'swiss', 'syrian', 'taiwanese', 'trinidadian', 'thai', 'tunisian', 'turkmen', 'ugandan', 'ukrainian', 'american', 'hindi', 'spanish', 'venezuelan', 'vietnamese', 'welsh', 'zambian', 'zimbabwean', 'english', 'african', 'european', 'asian', 'californian'];

},{}],17:[function(_dereq_,module,exports){
//nouns with irregular plural/singular forms
//used in noun.inflect, and also in the lexicon.
//compressed with '_' to reduce some redundancy.
'use strict';

var main = [['child', '_ren'], ['person', 'people'], ['leaf', 'leaves'], ['database', '_s'], ['quiz', '_zes'], ['stomach', '_s'], ['sex', '_es'], ['move', '_s'], ['shoe', '_s'], ['goose', 'geese'], ['phenomenon', 'phenomena'], ['barracks', '_'], ['deer', '_'], ['syllabus', 'syllabi'], ['index', 'indices'], ['appendix', 'appendices'], ['criterion', 'criteria'], ['man', 'men'], ['rodeo', '_s'], ['epoch', '_s'], ['zero', '_s'], ['avocado', '_s'], ['halo', '_s'], ['tornado', '_s'], ['tuxedo', '_s'], ['sombrero', '_s'], ['addendum', 'addenda'], ['alga', '_e'], ['alumna', '_e'], ['alumnus', 'alumni'], ['bacillus', 'bacilli'], ['cactus', 'cacti'], ['beau', '_x'], ['château', '_x'], ['chateau', '_x'], ['tableau', '_x'], ['corpus', 'corpora'], ['curriculum', 'curricula'], ['echo', '_es'], ['embargo', '_es'], ['foot', 'feet'], ['genus', 'genera'], ['hippopotamus', 'hippopotami'], ['larva', '_e'], ['libretto', 'libretti'], ['loaf', 'loaves'], ['matrix', 'matrices'], ['memorandum', 'memoranda'], ['mosquito', '_es'], ['opus', 'opera'], ['ovum', 'ova'], ['ox', '_en'], ['radius', 'radii'], ['referendum', 'referenda'], ['thief', 'thieves'], ['tooth', 'teeth']];
//decompress it
main = main.map(function (a) {
  a[1] = a[1].replace('_', a[0]);
  return a;
});
//build-out two mappings
var toSingle = main.reduce(function (h, a) {
  h[a[1]] = a[0];
  return h;
}, {});
var toPlural = main.reduce(function (h, a) {
  h[a[0]] = a[1];
  return h;
}, {});

module.exports = {
  toSingle: toSingle,
  toPlural: toPlural
};

},{}],18:[function(_dereq_,module,exports){
'use strict';

//most nouns do not nead to be listed
//for whatever reasons, these look like not-nouns
//so make sure they become nouns
module.exports = [
//double-consonant rule
'egg', 'bottle', 'cottage', 'kitty', 'doggy', 'ad hominem', 'banking', 'body', 'breakfast', 'ceiling', 'city', 'credit card', 'death', 'dinner', 'door', 'economy', 'energy', 'event', 'everything', 'example', 'fl oz', 'friend', 'funding', 'god', 'glacier', 'canary', 'grand slam', 'head start', 'home', 'house', 'lunch', 'nothing', 'number', 'others', 'part', 'patent', 'problem', 'purpose', 'room', 'student', 'stuff', 'super bowl', 'system', 'there', 'thing', 'things', 'tragedy', 'us dollar', 'world', 'world series'];

},{}],19:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');

//uncompressed country names
var countries = ['andorra', 'antarctica', 'antigua and barbuda', 'aruba', 'bahamas', 'bangladesh', 'barbados', 'belgium', 'belize', 'bermuda', 'bonaire', 'brazil', 'brunei', 'burkina faso', 'burundi', 'burma', 'cape verde',
// 'chad',
'chile', 'comoros', 'congo-brazzaville', 'cuba', 'curacao', 'cote d\'ivoire', 'denmark', 'djibouti', 'dominica', 'east timor', 'ecuador', 'egypt', 'el salvador', 'fiji', 'france', 'french guiana', 'germany', 'gibraltar', 'greece', 'grenada', 'guam', 'guinea-bissau', 'guadeloupe', 'guernsey', 'haiti', 'honduras', 'hungary', 'hong kong', 'isle of man', 'iraq', 'israel', 'ivory coast', 'italy', 'jamaica', 'jersey', 'kenya', 'kiribati', 'kosovo', 'kuwait', 'laos', 'lesotho', 'libya', 'luxembourg', 'macao', 'malawi', 'mali', 'malta', 'martinique', 'mayotte', 'moldova', 'mozambique', 'montserrat', 'montenegro', 'nauru', 'niue', 'netherlands', 'nicaragua', 'niger', 'palau', 'panama', 'peru', 'samoa', 'san marino', 'saint helena', 'sint maarten', 'singapore', 'sri lanka', 'suriname', 'sweden', 'timor-leste', 'trinidad and tobago', 'tonga', 'tokelau', 'turkey', 'tuvalu', 'u.s.a.', 'united kingdom', 'u.k.', 'usa', 'ussr', 'vanuatu', 'vietnam', 'vatican city', 'wales', 'wallis and futuna', 'yemen', 'zimbabwe',
//'in'
'spain', 'benin', 'bahrain', 'saint martin', 'liechtenstein'];
var compressed_countries = {
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
var cities = ['aalborg', 'abu dhabi', 'ahmedabad', 'almaty', 'antwerp', 'aqaba', 'ashdod', 'ashgabat', 'athens', 'auckland', 'bogota', 'brussels', 'calgary', 'cape town', 'cebu', 'curitiba', 'doha', 'dushanbe', 'frankfurt', 'genoa', 'ghent', 'giza', 'graz', 'guangzhou', 'haifa', 'hanoi', 'helsinki', 'ho chi minh', 'homs', 'i̇zmir', 'jakarta', 'kiev', 'kingston', 'klaipeda', 'kobe', 'kosice', 'krakow', 'la plata', 'luxembourg', 'medellín', 'mexico', 'miskolc', 'montevideo', 'montreal', 'moscow', 'nagoya', 'nis', 'odessa', 'oslo', 'ottawa', 'palermo', 'paris', 'perth', 'phnom penh', 'phoenix', 'port elizabeth', 'poznan', 'prague', 'reykjavik', 'riga', 'rome', 'rosario', 'seville', 'skopje', 'stockholm', 'stuttgart', 'sydney', 'tbilisi', 'tegucigalpa', 'the hague', 'thessaloniki', 'tokyo', 'toulouse', 'trondheim', 'tunis', 'turku', 'utrecht', 'warsaw', 'winnipeg', 'wroclaw', 'zagreb',
//in
'tianjin', 'berlin', 'turin', 'dublin'];

var suffix_compressed_cities = {
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

var prefix_compressed_cities = {
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
var airports = ['atl', 'pek', 'lhr', 'hnd', 'ord', 'lax', 'cdg', 'dfw', 'cgk', 'dxb', 'fra', 'hkg', 'den', 'bkk', 'ams', 'jfk', 'ist', 'sfo', 'clt', 'las', 'phx', 'iax', 'kul', 'mia', 'icn', 'muc', 'syd', 'fco', 'mco', 'bcn', 'yyz', 'lgw', 'phl'];

module.exports = {
  countries: countries,
  cities: cities,
  airports: airports
};

},{"../fns":7}],20:[function(_dereq_,module,exports){
'use strict';

//professions 'lawyer' that aren't covered by verb.to_actor()

module.exports = ['accountant', 'administrator', 'advisor', 'agent', 'architect', 'artist', 'assistant', 'attendant', 'bricklayer', 'butcher', 'carpenter', 'clerk', 'deputy', 'dietician', 'engineer', 'farmer', 'firefighter', 'fireman', 'gardener', 'getor', 'hairdresser', 'housekeeper', 'instructor', 'journalist', 'lawyer', 'mechanic', 'minister', 'musician', 'nurse', 'officer', 'operator', 'photographer', 'plumber', 'policeman', 'politician', 'practitioner', 'president', 'programmer', 'psychologist', 'receptionist', 'researcher', 'roofer', 'sailor', 'scientist', 'secretary', 'security guard', 'soldier', 'supervisor', 'surgeon', 'technician', 'therapist'];

},{}],21:[function(_dereq_,module,exports){
'use strict';

//common nouns that have no plural form. These are suprisingly rare
//used in noun.inflect(), and added as nouns in lexicon
module.exports = ['advice', 'aircraft', 'art', 'baggage', 'bass', 'beef', 'bison', 'blood', 'bread', 'butter', 'cake', 'cash', 'celcius', 'chaos', 'cheese', 'chewing', 'civics', 'clothing', 'coal', 'coffee', 'conduct', 'confusion', 'cotton', 'currency', 'economics', 'education', 'electricity', 'enjoyment', 'entertainment', 'equipment', 'ethics', 'everybody', 'everyone', 'fahrenheit', 'fiction', 'fish', 'flour', 'food', 'forgiveness', 'fowl', 'fruit', 'fun', 'furniture', 'gold', 'golf', 'gossip', 'grass', 'ground', 'gum', 'gymnastics', 'hair', 'halibut', 'happiness', 'hertz', 'history', 'hockey', 'homework', 'honey', 'hospitality', 'ice', 'impatience', 'importance', 'information', 'itself', 'jewelry', 'justice', 'kelvin', 'knowledge', 'laughter', 'leather', 'leisure', 'lightning', 'liquid', 'literature', 'luck', 'luggage', 'machinery', 'mail', 'mathematics', 'measles', 'meat', 'milk', 'mist', 'money', 'moose', 'mumps', 'music', 'news', 'noise', 'oil', 'oxygen', 'paper', 'patience', 'peace', 'peanut', 'pepper', 'petrol', 'physics', 'plastic', 'pork', 'power', 'pressure', 'progress', 'rain', 'recognition', 'recreation', 'relaxation', 'research', 'rice', 'sadness', 'safety', 'salmon', 'salt', 'sand', 'scenery', 'series', 'sheep', 'shopping', 'silk', 'silver', 'snow', 'soap', 'soccer', 'softness', 'space', 'spacecraft', 'species', 'speed', 'steam', 'steel', 'sugar', 'sunshine', 'tea', 'tennis', 'thunder', 'time', 'toothpaste', 'traffic', 'trouble', 'trousers', 'trout', 'tuna', 'vinegar', 'violence', 'warmth', 'water', 'weather', 'wildlife', 'wine', 'wood', 'wool'];

},{}],22:[function(_dereq_,module,exports){
'use strict';

module.exports = ['abba', 'ac/dc', 'aerosmith', 'bee gees', 'coldplay', 'creedence clearwater revival', 'def leppard', 'depeche mode', 'destiny\'s child', 'duran duran', 'fleetwood mac', 'green day', 'guns n roses', 'joy division', 'metallica', 'moody blues', 'motley crue', 'new kids on the block', 'pink floyd', 'r.e.m.', 'radiohead', 'red hot chili peppers', 'sex pistols', 'soundgarden', 'spice girls', 'the beach boys', 'the beatles', 'the black eyed peas', 'the byrds', 'the carpenters', 'the guess who', 'the hollies', 'the rolling stones', 'the smashing pumpkins', 'the supremes', 'the who', 'thin lizzy', 'u2', 'van halen'];

},{}],23:[function(_dereq_,module,exports){
'use strict';

//nouns that also signal the title of an unknown organization
//todo remove/normalize plural forms
module.exports = ['administration', 'agence', 'agences', 'agencies', 'agency', 'aircraft', 'airlines', 'airways', 'army', 'assoc', 'associates', 'association', 'assurance', 'authority', 'autorite', 'aviation', 'bank', 'banque', 'board', 'boys', 'brands', 'brewery', 'brotherhood', 'brothers', 'building society', 'bureau', 'cafe', 'caisse', 'capital', 'care', 'cathedral', 'center', 'central bank', 'centre', 'chemicals', 'choir', 'chronicle', 'church', 'circus', 'clinic', 'clinique', 'club', 'co', 'coalition', 'coffee', 'collective', 'college', 'commission', 'committee', 'communications', 'community', 'company', 'comprehensive', 'computers', 'confederation', 'conference', 'conseil', 'consulting', 'containers', 'corporation', 'corps', 'council', 'crew', 'daily news', 'data', 'departement', 'department', 'department store', 'departments', 'design', 'development', 'directorate', 'division', 'drilling', 'education', 'eglise', 'electric', 'electricity', 'energy', 'ensemble', 'enterprise', 'enterprises', 'entertainment', 'estate', 'etat', 'evening news', 'faculty', 'federation', 'financial', 'fm', 'foundation', 'fund', 'gas', 'gazette', 'girls', 'government', 'group', 'guild', 'health authority', 'herald', 'holdings', 'hospital', 'hotel', 'hotels', 'inc', 'industries', 'institut', 'institute', 'institute of technology', 'institutes', 'insurance', 'international', 'interstate', 'investment', 'investments', 'investors', 'journal', 'laboratory', 'labs',
// 'law',
'liberation army', 'limited', 'local authority', 'local health authority', 'machines', 'magazine', 'management', 'marine', 'marketing', 'markets', 'media', 'memorial', 'mercantile exchange', 'ministere', 'ministry', 'military', 'mobile', 'motor', 'motors', 'musee', 'museum',
// 'network',
'news', 'news service', 'observatory', 'office', 'oil', 'optical', 'orchestra', 'organization', 'partners', 'partnership',
// 'party',
'people\'s party', 'petrol', 'petroleum', 'pharmacare', 'pharmaceutical', 'pharmaceuticals', 'pizza', 'plc', 'police', 'polytechnic', 'post', 'power', 'press', 'productions', 'quartet', 'radio', 'regional authority', 'regional health authority', 'reserve', 'resources', 'restaurant', 'restaurants', 'savings', 'school', 'securities', 'service', 'services', 'social club', 'societe', 'society', 'sons', 'standard', 'state police', 'state university', 'stock exchange', 'subcommittee', 'syndicat', 'systems', 'telecommunications', 'telegraph', 'television', 'times', 'tribunal', 'tv', 'union', 'university', 'utilities', 'workers'];

},{}],24:[function(_dereq_,module,exports){
'use strict';
//just a few named-organizations
//no acronyms needed. no product/brand pollution.

module.exports = ['20th century fox', '3m', '7-eleven', 'abc', 'academy of sciences', 'acer', 'activision', 'adidas', 'aig', 'al jazeera', 'al qaeda', 'alcatel-lucent', 'alcatel', 'altair', 'amc', 'amd', 'american express', 'amt', 'amtrak', 'anheuser-busch', 'aol', 'apple computers', 'applebee\'s', 'arby\'s', 'argos', 'armco', 'ashland oil', 'associated press', 'at&t', 'avis', 'avon', 'ayer', 'banana republic', 'basf', 'baskin robbins', 'baxter', 'bayer', 'bbc', 'bechtel', 'ben & jerry\'s', 'berkshire hathaway', 'bf goodrich', 'bfgoodrich', 'black & decker', 'blockbuster video', 'bloomingdale', 'blue cross', 'bmw', 'bni', 'boeing', 'bombardier', 'boston globe', 'boston pizza', 'bp', 'capital one', 'cadbury', 'carl\'s jr', 'cbc', 'chevron', 'chevy', 'chick fil-a', 'china daily', 'cia', 'cisco systems', 'cisco', 'citigroup', 'cnn', 'coca cola', 'colgate', 'comcast', 'compaq', 'coors', 'costco', 'craigslist', 'daimler', 'dea', 'dell', 'der spiegel', 'disney', 'doj', 'dow jones', 'dunkin donuts', 'dupont', 'ebay', 'esa', 'eu', 'exxon mobil', 'exxonmobil', 'facebook', 'fannie mae', 'fbi', 'fda', 'fedex', 'fiat', 'financial times', 'firestone', 'ford', 'frito-lay', 'g8', 'general electric', 'general motors', 'ghq', 'glaxo smith kline', 'glencore', 'goldman sachs', 'goodyear', 'google', 'gucci', 'h & m', 'hasbro', 'hewlett-packard', 'hitachi', 'hizbollah', 'home depot', 'honda', 'hsbc', 'hyundai', 'ibm', 'ihop', 'ing', 'intel', 'interpol', 'itv', 'jiffy lube', 'johnson & johnson', 'jpmorgan chase', 'jpmorgan', 'jsa', 'katv', 'kfc', 'kkk', 'kmart', 'kodak', 'l\'oreal', 'la presse', 'la-z-boy', 'lenovo', 'lexis', 'lexmark', 'lg', 'little caesars', 'mac\'s milk', 'mattel', 'mazda', 'mcdonald\'s', 'mcdonalds', 'medicaid', 'medicare', 'mercedes-benz', 'mercedes', 'microsoft', 'mitas', 'mitsubishi', 'mlb', 'mobil', 'monsanto', 'motel 6', 'motorola', 'mtv', 'myspace', 'nandos', 'nasa', 'nascar', 'nasdaq', 'national academy of sciences', 'nato', 'natwest', 'nba', 'nbc', 'nestle', 'nestlé', 'netflix', 'new york times', 'newsweek', 'nfl', 'nhl', 'nhs', 'nike', 'nintendo', 'nissan', 'nokia', 'notre dame', 'novartis', 'nsa', 'nwa', 'old navy', 'opec', 'orange julius', 'oxfam', 'pan am', 'panasonic', 'panda express', 'pbs', 'pepsico', 'petrobras', 'petrochina', 'petronas', 'peugeot', 'pfizer', 'philip morris', 'pizza hut', 'premier oil', 'procter & gamble', 'prudential', 'quantas', 'quizno\'s', 'rbc', 'rbs', 're/max', 'readers digest', 'red bull', 'red cross', 'red lobster', 'revlon', 'royal bank', 'royal dutch shell', 'ryanair', 'safeway', 'sainsbury\'s', 'samsung', 'sears', 'siemens', 'sony', 'starbucks', 'statoil', 'subaru', 't mobile', 'taco bell', 'td bank', 'telefonica', 'telus', 'tesco', 'tesla motors', 'tgi fridays', 'the daily mail', 'tim hortons', 'tmz', 'toshiba', 'toyota', 'toys r us', 'twitter', 'ubs', 'unesco', 'unilever', 'united nations', 'ups', 'usa today', 'usps', 'verizon', 'vh1', 'visa', 'vodafone', 'volkswagen', 'volvo', 'wal-mart', 'walgreens', 'wall street journal', 'walmart', 'warner bros', 'wells fargo', 'westfield', 'westinghouse', 'world trade organization', 'yahoo!', 'yamaha', 'ymca', 'youtube', 'ywca'];

},{}],25:[function(_dereq_,module,exports){
'use strict';

module.exports = [
//mlb
'washington nationals', 'toronto blue jays', 'texas rangers', 'tampa bay rays', 'st. louis cardinals', 'seattle mariners', 'san francisco giants', 'san diego padres', 'pittsburgh pirates', 'philadelphia phillies', 'oakland athletics', 'new york yankees', 'new york mets', 'minnesota twins', 'milwaukee brewers', 'miami marlins', 'los angeles dodgers', 'kansas city royals', 'houston astros', 'detroit tigers', 'colorado rockies', 'cleveland indians', 'cincinnati reds', 'chicago white sox', 'chicago cubs', 'boston red sox', 'baltimore orioles', 'atlanta braves', 'arizona diamondbacks', 'diamondbacks', 'braves', 'orioles', 'white sox', 'astros', 'royals', 'dodgers', 'marlins', 'brewers', 'mets', 'yankees', 'phillies', 'padres', 'giants', 'mariners', 'cardinals', 'blue jays',

//nba
'boston celtics', 'brooklyn nets', 'new york knicks', 'philadelphia 76ers', 'toronto raptors', 'chicago bulls', 'cleveland cavaliers', 'detroit pistons', 'indiana pacers', 'milwaukee bucks', 'atlanta hawks', 'charlotte hornets', 'miami heat', 'orlando magic', 'washington wizards', 'dallas mavericks', 'houston rockets', 'memphis grizzlies', 'new orleans pelicans', 'san antonio spurs', 'denver nuggets', 'minnesota timberwolves', 'portland trail blazers', 'oklahoma city thunder', 'utah jazz', 'golden state warriors', 'los angeles clippers', 'los angeles lakers', 'phoenix suns', 'sacramento kings', '76ers', 'knicks', 'mavericks', 'lakers', 'celtics',

//nfl
'buffalo bills', 'miami dolphins', 'new england patriots', 'new york jets', 'baltimore ravens', 'cincinnati bengals', 'cleveland browns', 'pittsburgh steelers', 'houston texans', 'indianapolis colts', 'jacksonville jaguars', 'tennessee titans', 'denver broncos', 'kansas city chiefs', 'oakland raiders', 'san diego chargers', 'dallas cowboys', 'new york giants', 'philadelphia eagles', 'washington redskins', 'chicago bears', 'detroit lions', 'green bay packers', 'minnesota vikings', 'atlanta falcons', 'carolina panthers', 'new orleans saints', 'tampa bay buccaneers', 'arizona cardinals', 'st. louis rams', 'san francisco 49ers', 'seattle seahawks',

//mls
'chicago fire', 'columbus crew sc', 'd.c. united', 'montreal impact', 'new england revolution', 'new york city fc', 'new york red bulls', 'philadelphia union', 'colorado rapids', 'fc dallas', 'houston dynamo', 'la galaxy', 'portland timbers', 'real salt lake', 'san jose earthquakes', 'seattle sounders', 'sporting kansas city', 'vancouver whitecaps', 'atlanta united', 'minnesota united',
//premier league soccer (mostly city+fc)
'blackburn rovers', 'leicester city', 'manchester city', 'manchester united', 'aston villa', 'cardiff city', 'newcastle united', 'queens park rangers', 'sheffield united', 'stoke city', 'tottenham hotspur', 'west ham united'];

},{}],26:[function(_dereq_,module,exports){
'use strict';

//names commonly used in either gender
module.exports = ['casey', 'jamie', 'lee', 'jaime', 'jessie', 'morgan', 'rene', 'robin', 'devon', 'kerry', 'alexis', 'guadalupe', 'blair', 'kasey', 'jean', 'marion', 'aubrey', 'shelby', 'jan', 'shea', 'jade', 'kenyatta', 'kelsey', 'shay', 'lashawn', 'trinity', 'regan', 'jammie', 'cassidy', 'cheyenne', 'reagan', 'shiloh', 'marlo', 'andra', 'devan', 'rosario', 'lee', 'mel'];

},{}],27:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');
//names with a distinctive signal that they identify as a female, internationally

//compressed by frequent suffixes
//comprssed with
//https://github.com/nlp-compromise/thumb/blob/master/src/compress/compress.js
var compressed = {
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
  on: 'alis,man,shann,shar',
  an: 'meag,meg,megh,sus'
};

var list = ['abigail', 'aicha', 'alya', 'andrea', 'annika', 'beatriz', 'bettye', 'brandi', 'brooke', 'carol', 'celeste', 'chelsea', 'cheryl', 'chloe', 'claire', 'cleo', 'constanza', 'consuelo', 'crystal', 'dominique', 'dorothea', 'eleanor', 'eliza', 'erika', 'fay', 'faye', 'fern', 'gail', 'genevieve', 'gertrude', 'gladys', 'heidi', 'ingrid', 'jade', 'jill', 'jo', 'jodie', 'joni', 'kate', 'katie', 'kathryn', 'kay', 'kim', 'krystal', 'latoya', 'laxmi', 'leigh', 'lindsay', 'lupe', 'lynn', 'mae', 'malika', 'margo', 'marguerite', 'marisol', 'maritza', 'maude', 'maya', 'mildred', 'miriam', 'monique', 'mrignayani', 'naomi', 'nell', 'nikki', 'olga', 'paige', 'pam', 'parvati', 'pearl', 'reba', 'robyn', 'rosalind', 'shania', 'sheryl', 'sue', 'sybil', 'tami', 'tamika', 'therese', 'toni', 'gisele',
//in
'caitlin', 'erin', 'karin', 'kristin'];
list = fns.uncompress_suffixes(list, compressed);

for (var i = 0; i < list.length; i++) {
  var str = list[i];
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
var no_change = ['amy', 'becky', 'betty', 'beverly', 'cathy', 'dolly', 'dorothy', 'hilary', 'hillary', 'kimberly', 'rosemary', 'sally', 'shelly', 'trudy', 'tammy', 'wendy', 'ruby', 'susi'];
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

var male = _dereq_('./male');
var female = _dereq_('./female');
var ambiguous = _dereq_('./ambiguous');
var names = {};

for (var i = 0; i < male.length; i++) {
  names[male[i]] = 'MaleName';
}
for (var _i = 0; _i < female.length; _i++) {
  names[female[_i]] = 'FemaleName';
}
//ambiguous/unisex names
for (var _i2 = 0; _i2 < ambiguous.length; _i2 += 1) {
  names[ambiguous[_i2]] = 'FirstName';
}
// console.log(names['spencer']);
module.exports = names;

},{"./ambiguous":26,"./female":27,"./male":30}],29:[function(_dereq_,module,exports){
'use strict';

//a random copy+paste job from around the internet
//(dont mean to step on any toes)
//some countries have a higher lastname-signal than others
//this list is further augmented by some regexps, over in ./data/punct_rules.js
// https://en.wikipedia.org/wiki/List_of_most_common_surnames_in_Europe
module.exports = ['lee', 'li', 'zhang', 'wang', 'nguyen', 'garcia', 'gonzalez', 'hernandez', 'smirnov', 'muller', 'wong', 'cheung', 'liu', 'lau', 'chen', 'chan', 'yang', 'yeung', 'huang', 'zhao', 'chiu', 'wu', 'zhou', 'chow', 'xu', 'tsui', 'zhu', 'hu', 'guo', 'gao', 'kwok', 'luo', 'devi', 'singh', 'kumar', 'kaur', 'sato', 'suzuki', 'takahashi', 'tanaka', 'watanabe', 'ito', 'yamamoto', 'nakamura', 'kobayashi', 'kato', 'yoshida', 'yamada', 'sasaki', 'yamaguchi', 'saito', 'matsumoto', 'inoue', 'kimura', 'hayashi', 'shimizu', 'yamazaki', 'ikeda', 'hashimoto', 'yamashita', 'ishikawa', 'nakajima', 'maeda', 'fujita', 'ogawa', 'harris', 'thompson', 'martinez', 'robinson', 'rodriguez', 'walker', 'wright', 'lopez', 'carter', 'perez', 'roberts', 'turner', 'phillips', 'parker', 'evans', 'edwards', 'collins', 'sanchez', 'morris', 'rogers', 'bailey', 'rivera', 'cooper', 'richardson', 'cox', 'torres', 'peterson', 'ramirez', 'brooks', 'sanders', 'bennett', 'barnes', 'henderson', 'coleman', 'jenkins', 'perry', 'powell', 'patterson', 'hughes', 'flores', 'simmons', 'foster', 'bryant', 'hayes', 'smith', 'jones', 'williams', 'miller', 'taylor', 'wilson', 'davis', 'clark', 'moore', 'anderson', 'lewis', 'jackson', 'adams', 'tryniski', 'campbell', 'gruber', 'huber', 'wagner', 'pichler', 'steiner', 'mammadov', 'aliyev', 'hasanov', 'ivanou', 'ivanov', 'kazlov', 'peeters', 'janssens', 'dimitrov', 'horvat', 'neilson', 'jensen', 'hansen', 'pedersen', 'andersen', 'christensen', 'larsen', 'vassiljev', 'petrov', 'kuznetsov', 'mihhailov', 'pavlov', 'semjonov', 'andrejev', 'aleksejev', 'johansson', 'nyman', 'lindholm', 'karlsson', 'andersson', 'dubois', 'durand', 'leroy', 'moreau', 'lefebvre', 'lefevre', 'roux', 'fournier', 'mercier', 'schmidt', 'schneider', 'fischer', 'meyer', 'weber', 'schulz', 'becker', 'hoffmann', 'kovacs', 'szabo', 'toth', 'nagy', 'byrne', 'murray', 'sullivan', 'rossi', 'russo', 'esposito', 'ricci', 'marino', 'klein', 'nowak', 'silva', 'santos', 'fernandez', 'ruiz', 'jimenez', 'alvarez', 'moreno', 'muñoz', 'alonso', 'gutierrez', 'romero', 'navarro', 'dominguez', 'gil', 'vazquez', 'serrano', 'ramos', 'blanco', 'sanz', 'castro', 'suarez', 'ortega', 'rubio', 'molina', 'delgado', 'morales', 'ortiz', 'marin', 'iglesias', 'boyko', 'davies', 'clarke', 'johnson', 'oliveira', 'sosa', 'rojas', 'munoz', 'diaz', 'gomez', 'xiao', 'tian', 'bahk', 'pahk', 'chung', 'jung', 'joung', 'chong', 'cheong', 'choung', 'choi', 'che', 'choy', 'chwe', 'yeun', 'yun', 'jhang', 'chang', 'cheon', 'kwon', 'soung', 'bhang', 'bahng', 'pahng', 'phang', 'kahn', 'tran', 'pham', 'huynh', 'hoang', 'phan', 'patel',
//these are famous ones
'mozart', 'bach', 'beethoven', 'nixon', 'vivaldi', 'obama', 'reagan', 'lenin', 'stalin', 'hitler', 'mussolini', 'kennedy', 'lincoln', 'gandhi', 'thatcher', 'orwell', 'darwin', 'einstein', 'picasso', 'edison', 'roosevelt', 'tolstoy', 'hemingway', 'hitchcock', 'messi', 'beckham', 'cohen'];

// let obj = {}
// module.exports.forEach((str) => {
//   if (obj[str]) {
//     console.log(str)
//   }
//   obj[str] = true
// })

},{}],30:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');
//names with a distinctive signal that they identify as a male, internationally

//the unique/uncompressed names..
var arr = ['abu', 'adolfo', 'anthony', 'arthur', 'billy', 'bobby', 'bob', 'buddy', //ergh
'bradford', 'bret', 'caleb', 'clifford', 'craig', 'derek', 'doug', 'dwight', 'eli', 'elliot', 'enrique', 'felipe', 'felix', 'francisco', 'frank', 'george', 'glenn', 'greg', 'gregg', 'hans', 'hugh', 'ira', 'isaac', 'kermit', 'leo', 'levi', 'lorenzo', 'percy', 'philip', 'phillip', 'regis', 'rex', 'ricky', 'shaun', 'shaquille', 'shawn', 'steve', 'timothy', 'ty', 'wilbur', 'williams', 'woodrow', 'wolfgang', 'youssef', 'mahmoud', 'mustafa', 'hamza', 'tareq', 'ali', 'beshoi', 'mark', 'moe', 'habib', 'moussa', 'adama', 'osama', 'abdoulaye', 'modibo', 'mustapha', 'aziz', 'mateo', 'santino', 'davi', 'jacob', 'vicente', 'alonso', 'maximiliano', 'jose', 'jeronimo', 'joshua', 'ajani', 'amir', 'arnav', 'suraj', 'bruno', 'yousouf', 'wei', 'hao', 'yi', 'lei', 'aarav', 'reyansh', 'arjun', 'abulfazl', 'reza', 'kathem', 'ori', 'yosef', 'itai', 'moshe', 'ichika', 'itsuki', 'tatsuki', 'asahi', 'haruki', 'tomoharu', 'yuuma', 'taichi', 'saqib', 'abubakr', 'ergi', 'marc', 'eric', 'enzo', 'pol', 'alex', 'marti', 'jakob', 'paul', 'leevi', 'aputsiaq', 'inunnguaq', 'inuk', 'francesco', 'andrea', 'mattia', 'matteo', 'tommaso', 'nikola', 'ilija', 'marko', 'luka', 'antoni', 'jakub', 'franciszek', 'filip', 'stanislaw', 'mikolaj', 'yusuf', 'berat', 'emir', 'ahmet', 'mehmet', 'leroy', 'roy', 'troy', 'floyd', 'lloyd', 'carl', 'earl', 'karl', 'raul', 'saul', 'earnest', 'ernest', 'forrest', 'arnold', 'harold', 'andrew', 'mathew', 'matthew', 'elliott', 'matt', 'scott', 'marty', 'monty', 'scotty', 'clay', 'jay', 'murray', 'monte', 'pete', 'elwood', 'jarrod', 'claude', 'clyde', 'wade', 'alfredo', 'reynaldo', 'wilfredo', 'clark', 'kirk', 'chase', 'jesse', 'cedric', 'dominic', 'josh', 'rocky', 'rodolfo', 'roosevelt', 'roscoe', 'ross', 'jeff', 'jeremy', 'jerome', 'jess', 'toby', 'todd', 'tom', 'tony', 'darryl', 'daryl', 'dave', 'joe', 'john', 'jorge', 'malcolm', 'marco', 'max', 'alfonso', 'alonzo', 'guillermo', 'gustavo',
//in
'yassin', 'hussein', 'benjamin', 'martin', 'joaquin', 'hossein', 'colin', 'franklin', 'marlin', 'darwin', 'edwin', 'erwin', 'darin', 'darrin', 'efrain', 'quentin'];

//compressed by frequent suffixes
//comprssed with
//https://github.com/nlp-compromise/thumb/blob/master/src/compress/compress.js
var suffix_compressed = {
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
'use strict';

//notable people with names that aren't caught by the ordinary person-name rules
exports.male = ['messiaen', 'saddam hussain', 'virgin mary', 'van gogh', 'mitt romney', 'barack obama', 'kanye west', 'mubarek', 'lebron james', 'emeril lagasse', 'rush limbaugh', 'carson palmer', 'ray romano', 'ronaldinho', 'valentino rossi', 'rod stewart', 'kiefer sutherland', 'denzel washington', 'dick wolf', 'tiger woods', 'adolf hitler', 'hulk hogan', 'ashton kutcher', 'kobe bryant', 'cardinal wolsey', 'slobodan milosevic'];

exports.female = ['jk rowling', 'oprah winfrey', 'reese witherspoon', 'tyra banks', 'halle berry', 'paris hilton', 'scarlett johansson'];

},{}],32:[function(_dereq_,module,exports){
'use strict';

//extend to person-names if infront of a name - 'Professor Frink'
module.exports = ['lord', 'lady', 'king', 'queen', 'prince', 'princess', 'dutchess', 'president', 'excellency', 'professor', 'chancellor', 'father', 'pastor', 'brother', 'sister', 'doctor', 'captain', 'commander', 'general', 'lieutenant', 'reverend', 'rabbi', 'ayatullah', 'councillor', 'secretary', 'sultan', 'mayor', 'congressman', 'congresswoman'];

},{}],33:[function(_dereq_,module,exports){
'use strict';
//some most-common iso-codes (most are too ambiguous)

var shortForms = ['usd', 'cad', 'aud', 'gbp', 'krw', 'inr', 'hkd', 'dkk', 'cny', 'xaf', 'xof', 'eur', 'jpy',
//currency symbols
'€', '$', '¥', '£', 'лв', '₡', 'kn', 'kr', '¢', 'Ft', 'Rp', '﷼', '₭', 'ден', '₨', 'zł', 'lei', 'руб', '฿'];

//some common, unambiguous currency names
var longForms = ['denar', 'dobra', 'forint', 'kwanza', 'kyat', 'lempira', 'pound sterling', 'riel', 'yen', 'zloty',
//colloquial currency names
'dollar', 'cent', 'penny', 'dime', 'dinar', 'euro', 'lira', 'pound', 'pence', 'peso', 'baht', 'sterling', 'rouble', 'shekel', 'sheqel', 'yuan', 'franc', 'rupee', 'shilling', 'krona', 'dirham', 'bitcoin'];
var irregularPlurals = {
  yen: 'yen',
  baht: 'baht',
  riel: 'riel',
  penny: 'pennies'
};

//add plural forms - 'euros'
var l = longForms.length;
for (var i = 0; i < l; i++) {
  if (irregularPlurals[longForms[i]]) {
    longForms.push(irregularPlurals[longForms[i]]);
  } else {
    longForms.push(longForms[i] + 's');
  }
}

module.exports = shortForms.concat(longForms);

},{}],34:[function(_dereq_,module,exports){
'use strict';

var cardinal = {
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

var ordinal = {
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
var prefixes = {
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

var numbers = _dereq_('./numbers');
var toOrdinal = {};
var toCardinal = {};
Object.keys(numbers.ordinal).forEach(function (k) {
  var ordinal = Object.keys(numbers.ordinal[k]);
  var cardinal = Object.keys(numbers.cardinal[k]);
  for (var i = 0; i < ordinal.length; i++) {
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

var units = {
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
    // 'in': 'inch',
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
var words = {};
Object.keys(units).forEach(function (k) {
  Object.keys(units[k]).forEach(function (shorter) {
    if (shorter.length > 1) {
      words[shorter] = true;
    }
    var longer = units[k][shorter];
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

var participles = _dereq_('./participles');

var irregular = {
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
  bite: {
    Gerund: 'biting',
    PastTense: 'bit'
  },
  bleed: {
    PastTense: 'bled'
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
    Gerund: 'dying'
  },
  dig: {
    Gerund: 'digging',
    PastTense: 'dug'
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
//fancy es3 literal support (ftw?)
var literals = [['break', {
  PastTense: 'broke'
}], ['catch', {
  PastTense: 'caught'
}], ['do', {
  PastTense: 'did',
  PresentTense: 'does'
}], ['bind', {
  PastTense: 'bound'
}], ['spread', {
  PastTense: 'spread'
}]];
literals.forEach(function (a) {
  irregular[a[0]] = a[1];
});

Object.keys(participles).forEach(function (inf) {
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
'use strict';

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
  // 'catch': 'caught',
  'choose': 'chosen',
  'cling': 'clung',
  'come': 'come',
  'creep': 'crept',
  'cut': 'cut',
  'deal': 'dealt',
  'dig': 'dug',
  'dive': 'dived',
  // 'do': 'done',
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
  // 'throw': 'thrown',
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

var fns = _dereq_('../fns');

//suffix-index adjectives
//  {cial:'cru,spe'} -> 'crucial', 'special'

//suffix-index adjectives
//  {cial:'cru,spe'} -> 'crucial', 'special'
var compressed = {
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
var arr = ['abandon', 'accept', 'add', 'added', 'adopt', 'aid', 'appeal', 'applaud', 'archive', 'ask', 'assign', 'associate', 'assume', 'attempt', 'avoid', 'ban', 'become', 'bomb', 'cancel', 'claim', 'claw', 'come', 'control', 'convey', 'cook', 'copy', 'cut', 'deem', 'defy', 'deny', 'describe', 'design', 'destroy', 'die', 'divide', 'do', 'doubt', 'drag', 'drift', 'drop', 'echo', 'embody', 'enjoy', 'envy', 'excel', 'fall', 'fail', 'fix', 'float', 'flood', 'focus', 'fold', 'get', 'goes', 'grab', 'grasp', 'grow', 'happen', 'head', 'help', 'hold fast', 'hope', 'include', 'instruct', 'invest', 'join', 'keep', 'know', 'learn', 'let', 'lift', 'link', 'load', 'loan', 'look', 'make due', 'mark', 'melt', 'minus', 'multiply', 'name', 'need', 'occur', 'overcome', 'overlap', 'overwhelm', 'owe', 'pay', 'plan', 'plug', 'plus', 'pop', 'pour', 'proclaim', 'put', 'rank', 'reason', 'reckon', 'relax', 'repair', 'reply', 'reveal', 'revel', 'risk', 'rub', 'ruin', 'sail', 'seek', 'seem', 'send', 'set', 'shout', 'sleep', 'sneak', 'sort', 'spoil', 'stem', 'step', 'stop', 'study', 'take', 'talk', 'thank', 'took', 'trade', 'transfer', 'trap', 'travel', 'tune', 'undergo', 'undo', 'uplift', 'walk', 'watch', 'win', 'wipe', 'work', 'yawn', 'yield'];

module.exports = fns.uncompress_suffixes(arr, compressed);

},{"../fns":7}],40:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var tagColors = _dereq_('./tags/colors');

// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
var c = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  black: '\x1b[30m'
};
//dont use colors on client-side
if (typeof module === 'undefined') {
  Object.keys(c).forEach(function (k) {
    c[k] = '';
  });
}

//coerce any input into a string
exports.ensureString = function (input) {
  if (typeof input === 'string') {
    return input;
  } else if (typeof input === 'number') {
    return '' + input;
  }
  return '';
};
//coerce any input into a string
exports.ensureObject = function (input) {
  if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object') {
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

exports.titleCase = function (str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

//turn a nested array into one array
exports.flatten = function (arr) {
  var all = [];
  arr.forEach(function (a) {
    all = all.concat(a);
  });
  return all;
};

//shallow-clone an object
exports.copy = function (o) {
  var o2 = {};
  o = exports.ensureObject(o);
  Object.keys(o).forEach(function (k) {
    o2[k] = o[k];
  });
  return o2;
};
exports.extend = function (obj, a) {
  obj = exports.copy(obj);
  var keys = Object.keys(a);
  for (var i = 0; i < keys.length; i++) {
    obj[keys[i]] = a[keys[i]];
  }
  return obj;
};

//colorization
exports.green = function (str) {
  return c.green + str + c.reset;
};
exports.red = function (str) {
  return c.red + str + c.reset;
};
exports.blue = function (str) {
  return c.blue + str + c.reset;
};
exports.magenta = function (str) {
  return c.magenta + str + c.reset;
};
exports.cyan = function (str) {
  return c.cyan + str + c.reset;
};
exports.yellow = function (str) {
  return c.yellow + str + c.reset;
};
exports.black = function (str) {
  return c.black + str + c.reset;
};
exports.printTag = function (tag) {
  if (tagColors[tag]) {
    return exports[tagColors[tag]](tag);
  }
  return tag;
};
exports.printTerm = function (t) {
  var tags = Object.keys(t.tag);
  for (var i = 0; i < tags.length; i++) {
    if (tagColors[tags[i]]) {
      var color = tagColors[tags[i]];
      return exports[color](t.plaintext);
    }
  }
  return c.reset + t.plaintext + c.reset;
};

exports.leftPad = function (str, width, char) {
  char = char || ' ';
  str = str.toString();
  while (str.length < width) {
    str += char;
  }
  return str;
};

},{"./tags/colors":154}],41:[function(_dereq_,module,exports){
(function (global){
'use strict';

var buildResult = _dereq_('./result/build');
var pkg = _dereq_('../package.json');
var log = _dereq_('./log');

//the main thing
var nlp = function nlp(str, lexicon, tagSet) {
  return buildResult(str, lexicon, tagSet);
};

//this is handy
nlp.version = pkg.version;

//so handy at times
nlp.lexicon = function () {
  return _dereq_('./data/lexicon');
};

//also this is much handy
nlp.verbose = function (str) {
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var fns = _dereq_('../fns');
var _enable = false;

module.exports = {
  enable: function enable(str) {
    if (str === undefined) {
      str = true;
    }
    _enable = str;
  },
  here: function here(path) {
    if (_enable === true || _enable === path) {
      console.log('  ' + path);
    }
  },
  tell: function tell(str, path) {
    if (_enable === true || _enable === path) {
      if ((typeof str === 'undefined' ? 'undefined' : _typeof(str)) === 'object') {
        str = JSON.stringify(str);
      }
      str = '    ' + str;
      console.log(str);
    }
  },
  tagAs: function tagAs(t, pos, reason) {
    if (_enable === true || _enable === 'tagger') {
      var title = t.normal || '[' + t.silent_term + ']';
      title = fns.yellow(title);
      title = fns.leftPad('\'' + title + '\'', 20);
      title += '  ->   ' + fns.printTag(pos);
      title = fns.leftPad(title, 54);
      console.log('       ' + title + '(' + fns.cyan(reason || '') + ')');
    }
  }
};

},{"../fns":40}],43:[function(_dereq_,module,exports){
'use strict';

var Text = _dereq_('./index');
var tokenize = _dereq_('./tokenize');
var Terms = _dereq_('./paths').Terms;
var normalize = _dereq_('../term/methods/normalize/normalize').normalize;
var tagArr = _dereq_('../tags');

//basically really dirty and stupid.
var normalizeLex = function normalizeLex(lex) {
  lex = lex || {};
  return Object.keys(lex).reduce(function (h, k) {
    //add natural form
    h[k] = lex[k];
    var normal = normalize(k);
    if (k !== normal) {
      //add it too
      h[normal] = lex[k];
    }
    return h;
  }, {});
};

var extendTags = function extendTags(newTags) {
  console.log(newTags);
  console.log(tagArr);
};

//build a new pos-tagged Result obj from a string
var fromString = function fromString(str, lexicon, tagSet) {
  var sentences = tokenize(str);
  //make sure lexicon obeys standards
  lexicon = normalizeLex(lexicon);
  var list = sentences.map(function (s) {
    return Terms.fromString(s, lexicon);
  });
  //extend tagset for this ref
  if (tagSet) {
    extendTags(tagSet);
  }

  var r = new Text(list, lexicon, null, tagSet);
  //give each ts a ref to the result
  r.list.forEach(function (ts) {
    ts.refText = r;
  });
  return r;
};
module.exports = fromString;

},{"../tags":156,"../term/methods/normalize/normalize":163,"./index":44,"./paths":56,"./tokenize":153}],44:[function(_dereq_,module,exports){
'use strict';
//a Text is an array of termLists

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Text = function () {
  function Text(arr, lexicon, reference, tagSet) {
    _classCallCheck(this, Text);

    this.list = arr || [];
    this.reference = reference;
    this.tagSet = tagSet;
  }
  //getter/setters
  /** did it find anything? */


  _createClass(Text, [{
    key: 'all',
    value: function all() {
      return this.parent;
    }
  }, {
    key: 'index',
    value: function index() {
      return this.list.map(function (ts) {
        return ts.index();
      });
    }
  }, {
    key: 'data',
    value: function data() {
      return this.list.map(function (ts) {
        return {
          normal: ts.out('normal'),
          text: ts.out('text')
        };
      });
    }
  }, {
    key: 'debug',
    value: function debug(opts) {
      return out(this, 'debug', opts);
    }
  }, {
    key: 'found',
    get: function get() {
      return this.list.length > 0;
    }
    /** how many Texts are there?*/

  }, {
    key: 'length',
    get: function get() {
      return this.list.length;
    }
  }, {
    key: 'isA',
    get: function get() {
      return 'Text';
    }
  }, {
    key: 'parent',
    get: function get() {
      return this.reference || this;
    },
    set: function set(r) {
      this.reference = r;
      return this;
    }
  }, {
    key: 'whitespace',
    get: function get() {
      var _this = this;

      return {
        before: function before(str) {
          _this.list.forEach(function (ts) {
            ts.whitespace.before(str);
          });
          return _this;
        },
        after: function after(str) {
          _this.list.forEach(function (ts) {
            ts.whitespace.after(str);
          });
          return _this;
        }
      };
    }
  }]);

  return Text;
}();

module.exports = Text;
Text = _dereq_('./methods/array')(Text);
Text = _dereq_('./methods/loops')(Text);
Text = _dereq_('./methods/match')(Text);
Text = _dereq_('./methods/out')(Text);
Text = _dereq_('./methods/sort')(Text);
Text = _dereq_('./methods/split')(Text);
Text = _dereq_('./methods/tag')(Text);
Text = _dereq_('./methods/normalize')(Text);

var subset = {
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
  endGrams: _dereq_('./subset/ngrams/endGrams')
};
//term subsets
Object.keys(subset).forEach(function (k) {
  Text.prototype[k] = function (num, arg) {
    var sub = subset[k];
    var m = sub.find(this, num, arg);
    return new subset[k](m.list, this.lexicon, this.parent);
  };
});

},{"./methods/array":45,"./methods/loops":46,"./methods/match":47,"./methods/normalize":48,"./methods/out":49,"./methods/sort":52,"./methods/split":54,"./methods/tag":55,"./subset/acronyms":57,"./subset/adjectives":59,"./subset/adverbs":67,"./subset/clauses":69,"./subset/contractions":73,"./subset/dates":75,"./subset/hashTags":85,"./subset/ngrams":89,"./subset/ngrams/endGrams":86,"./subset/ngrams/startGrams":90,"./subset/nouns":92,"./subset/organizations":101,"./subset/people":103,"./subset/phoneNumbers":105,"./subset/places":106,"./subset/quotations":108,"./subset/sentences":109,"./subset/sentences/questions":110,"./subset/sentences/statements":113,"./subset/terms":116,"./subset/topics":118,"./subset/urls":119,"./subset/values":120,"./subset/verbs":133}],45:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Terms = _dereq_('../../terms');

var genericMethods = function genericMethods(Text) {

  var methods = {

    /**copy data properly so later transformations will have no effect*/
    clone: function clone() {
      var list = this.list.map(function (ts) {
        return ts.clone();
      });
      // this.parent.list = this.parent.list.map((ts) => {
      //   return ts.clone();
      // });
      // return this;
      return new Text(list); //this.lexicon, this.parent
    },

    /** get the nth term of each result*/
    term: function term(n) {
      var _this = this;

      var list = this.list.map(function (ts) {
        var arr = [];
        var el = ts.terms[n];
        if (el) {
          arr = [el];
        }
        return new Terms(arr, _this.lexicon, _this.refText, _this.refTerms);
      });
      return new Text(list, this.lexicon, this.parent);
    },
    firstTerm: function firstTerm() {
      return this.match('^.');
    },
    lastTerm: function lastTerm() {
      return this.match('.$');
    },

    /** grab a subset of the results*/
    slice: function slice(start, end) {
      this.list = this.list.slice(start, end);
      return this;
    },

    /** use only the nth result*/
    get: function get(n) {
      //return an empty result
      if (!n && n !== 0 || !this.list[n]) {
        return new Text([], this.lexicon, this.parent);
      }
      var ts = this.list[n];
      return new Text([ts], this.lexicon, this.parent);
    },
    /**use only the first result */
    first: function first(n) {
      if (!n && n !== 0) {
        return this.get(0);
      }
      return new Text(this.list.slice(0, n), this.lexicon, this.parent);
    },
    /**use only the last result */
    last: function last(n) {
      if (!n && n !== 0) {
        return this.get(this.list.length - 1);
      }
      var end = this.list.length;
      var start = end - n;
      return new Text(this.list.slice(start, end), this.lexicon, this.parent);
    },

    concat: function concat() {
      //any number of params
      for (var i = 0; i < arguments.length; i++) {
        var p = arguments[i];
        if ((typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object') {
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
    flatten: function flatten() {
      var terms = [];
      this.list.forEach(function (ts) {
        terms = terms.concat(ts.terms);
      });
      //dont create an empty ts
      if (!terms.length) {
        return new Text(null, this.lexicon, this.parent);
      }
      var ts = new Terms(terms, this.lexicon, this, null);
      return new Text([ts], this.lexicon, this.parent);
    }

  };

  Object.keys(methods).forEach(function (k) {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = genericMethods;

},{"../../terms":176}],46:[function(_dereq_,module,exports){
'use strict';
//this methods are simply loops around each termList object.

var foreach = ['toTitleCase', 'toUpperCase', 'toLowerCase', 'toCamelCase', 'hyphenate', 'dehyphenate', 'insertBefore', 'insertAfter', 'insertAt', 'replace', 'replaceWith', 'delete'];

var addMethods = function addMethods(Text) {

  foreach.forEach(function (k) {
    var myFn = function myFn() {
      var args = arguments;
      this.list.forEach(function (ts) {
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

var splitMethods = function splitMethods(Text) {

  var methods = {

    /** do a regex-like search through terms and return a subset */
    match: function match(reg, verbose) {
      var list = [];
      this.list.forEach(function (ts) {
        //an array of arrays
        var matches = ts.match(reg, verbose);
        matches.list.forEach(function (ms) {
          list.push(ms);
        });
      });
      var parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

    not: function not(reg, verbose) {
      var list = [];
      this.list.forEach(function (ts) {
        var found = ts.not(reg, verbose);
        list = list.concat(found.list);
      });
      var parent = this.parent || this;
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

    'if': function _if(reg, verbose) {
      var list = [];
      for (var i = 0; i < this.list.length; i++) {
        var m = this.list[i].match(reg, verbose);
        if (m.found) {
          list.push(this.list[i]);
        }
      }
      var parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

    ifNo: function ifNo(reg, verbose) {
      var list = [];
      for (var i = 0; i < this.list.length; i++) {
        var m = this.list[i].match(reg, verbose);
        if (!m.found) {
          list.push(this.list[i]);
        }
      }
      var parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    }

  };
  //alias 'and'
  methods.and = methods.match;

  //hook them into result.proto
  Object.keys(methods).forEach(function (k) {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = splitMethods;

},{}],48:[function(_dereq_,module,exports){
'use strict';
//

var defaultMethods = {
  whitespace: true,
  'case': true,
  numbers: true,
  punctuation: true,
  unicode: true,
  contractions: true
};

var methods = {

  /** make only one space between each word */
  whitespace: function whitespace(r) {
    r.terms().list.forEach(function (ts, i) {
      var t = ts.terms[0];
      if (i > 0) {
        t.whitespace.before = ' ';
      }
      t.whitespace.after = '';
    });
    return r;
  },

  /** make first-word titlecase, and people, places titlecase */
  'case': function _case(r) {
    r.terms().list.forEach(function (ts, i) {
      var t = ts.terms[0];
      if (i === 0 || t.tag.Person || t.tag.Place || t.tag.Organization) {
        ts.toTitleCase();
      } else {
        ts.toLowerCase();
      }
    });
    return r;
  },

  /** turn 'five' to 5, and 'fifth' to 5th*/
  numbers: function numbers(r) {
    return r.values().toNumber();
  },

  /** remove commas, semicolons - but keep sentence-ending punctuation*/
  punctuation: function punctuation(r) {
    r.terms().list.forEach(function (ts, i) {
      var t = ts.terms[0];
      if (i < ts.terms.length - 1) {
        t.text = t.killPunctuation();
      }
    });
    return r;
  },

  contractions: function contractions(r) {
    return r.contractions().expand();
  }
};

var addMethods = function addMethods(Text) {
  Text.prototype.normalize = function (obj) {
    var _this = this;

    obj = obj || defaultMethods;
    //do each type of normalization
    Object.keys(obj).forEach(function (fn) {
      if (methods[fn]) {
        methods[fn](_this);
      }
    });
  };
  return Text;
};
module.exports = addMethods;

},{}],49:[function(_dereq_,module,exports){
'use strict';

var _topk = _dereq_('./topk');
var offset = _dereq_('./offset');

var methods = {
  text: function text(r) {
    return r.list.reduce(function (str, ts) {
      str += ts.out('text');
      return str;
    }, '');
  },
  normal: function normal(r) {
    return r.list.map(function (ts) {
      var str = ts.out('normal');
      var last = ts.last();
      if (last) {
        var punct = last.endPunctuation();
        if (punct === '.' || punct === '!' || punct === '?') {
          str += punct;
        }
      }
      return str;
    }).join(' ');
  },
  root: function root(r) {
    return r.list.map(function (ts) {
      return ts.out('root');
    }).join(' ');
  },
  /** output where in the original output string they are*/
  offsets: function offsets(r) {
    return offset(r);
  },
  grid: function grid(r) {
    return r.list.reduce(function (str, ts) {
      str += ts.out('grid');
      return str;
    }, '');
  },
  color: function color(r) {
    return r.list.reduce(function (str, ts) {
      str += ts.out('color');
      return str;
    }, '');
  },
  array: function array(r) {
    return r.list.reduce(function (arr, ts) {
      arr.push(ts.out('normal'));
      return arr;
    }, []);
  },
  json: function json(r) {
    return r.list.reduce(function (arr, ts) {
      var terms = ts.terms.map(function (t) {
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
  html: function html(r) {
    var html = r.list.reduce(function (str, ts) {
      var sentence = ts.terms.reduce(function (sen, t) {
        sen += '\n    ' + t.out('html');
        return sen;
      }, '');
      return str += '\n  <span>' + sentence + '\n  </span>';
    }, '');
    return '<span> ' + html + '\n</span>';
  },
  terms: function terms(r) {
    var arr = [];
    r.list.forEach(function (ts) {
      ts.terms.forEach(function (t) {
        arr.push({
          text: t.text,
          normal: t.normal,
          tags: Object.keys(t.tag)
        });
      });
    });
    return arr;
  },
  debug: function debug(r) {
    console.log('====');
    r.list.forEach(function (ts) {
      console.log('   --');
      ts.debug();
    });
    return r;
  },
  topk: function topk(r) {
    return _topk(r);
  }
};
methods.plaintext = methods.text;
methods.normalized = methods.normal;
methods.colors = methods.color;
methods.tags = methods.terms;
methods.offset = methods.offsets;
methods.frequency = methods.topk;
methods.freq = methods.topk;
methods.arr = methods.array;

var addMethods = function addMethods(Text) {
  Text.prototype.out = function (fn) {
    if (methods[fn]) {
      return methods[fn](this);
    }
    return methods.text(this);
  };
  Text.prototype.debug = function () {
    return methods.debug(this);
  };
  return Text;
};

module.exports = addMethods;

},{"./offset":50,"./topk":51}],50:[function(_dereq_,module,exports){
'use strict';
/** say where in the original output string they are found*/

var findOffset = function findOffset(parent, term) {
  var sum = 0;
  for (var i = 0; i < parent.list.length; i++) {
    for (var o = 0; o < parent.list[i].terms.length; o++) {
      var t = parent.list[i].terms[o];
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
var allOffset = function allOffset(r) {
  var parent = r.all();
  return r.list.map(function (ts) {
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

var topk = function topk(r, n) {
  //count occurance
  var count = {};
  r.list.forEach(function (ts) {
    var str = ts.out('root');
    count[str] = count[str] || 0;
    count[str] += 1;
  });
  //turn into an array
  var all = [];
  Object.keys(count).forEach(function (k) {
    all.push({
      normal: k,
      count: count[k]
    });
  });
  //add percentage
  all.forEach(function (o) {
    o.percent = parseFloat((o.count / r.list.length * 100).toFixed(2));
  });
  //sort by freq
  all = all.sort(function (a, b) {
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

var sorter = _dereq_('./methods');

var addMethods = function addMethods(Text) {

  var fns = {

    /**reorder result.list alphabetically */
    sort: function sort(method) {
      //default sort
      method = method || 'alphabetical';
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
      if (method === 'freq' || method === 'frequency') {
        return sorter.freq(this, Text);
      }
      if (method === 'wordcount') {
        return sorter.wordCount(this, Text);
      }
      return this;
    },

    /**reverse the order of result.list */
    reverse: function reverse() {
      this.list = this.list.reverse();
      return this;
    },

    unique: function unique() {
      var obj = {};
      this.list = this.list.filter(function (ts) {
        var str = ts.out('root');
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
  Object.keys(fns).forEach(function (k) {
    Text.prototype[k] = fns[k];
  });
  return Text;
};

module.exports = addMethods;

},{"./methods":53}],53:[function(_dereq_,module,exports){
'use strict';

//perform sort on pre-computed values

var sortEm = function sortEm(arr) {
  arr = arr.sort(function (a, b) {
    if (a.index > b.index) {
      return 1;
    }
    if (a.index === b.index) {
      return 0;
    }
    return -1;
  });
  //return ts objects
  return arr.map(function (o) {
    return o.ts;
  });
};

//alphabetical sorting of a termlist array
exports.alpha = function (r) {
  r.list.sort(function (a, b) {
    //#1 performance speedup
    if (a === b) {
      return 0;
    }
    //#2 performance speedup
    if (a.terms[0] && b.terms[0]) {
      if (a.terms[0].root > b.terms[0].root) {
        return 1;
      }
      if (a.terms[0].root < b.terms[0].root) {
        return -1;
      }
    }
    //regular compare
    if (a.out('root') > b.out('root')) {
      return 1;
    }
    return -1;
  });
  return r;
};

//the order they were recieved (chronological~)
exports.chron = function (r) {
  //pre-compute indexes
  var tmp = r.list.map(function (ts) {
    return {
      ts: ts,
      index: ts.termIndex()
    };
  });
  r.list = sortEm(tmp);
  return r;
};

//shortest matches first
exports.lengthFn = function (r) {
  //pre-compute indexes
  var tmp = r.list.map(function (ts) {
    return {
      ts: ts,
      index: ts.chars()
    };
  });
  r.list = sortEm(tmp).reverse();
  return r;
};

//count the number of terms in each match
exports.wordCount = function (r) {
  //pre-compute indexes
  var tmp = r.list.map(function (ts) {
    return {
      ts: ts,
      index: ts.length
    };
  });
  r.list = sortEm(tmp);
  return r;
};

//sort by frequency (like topk)
exports.freq = function (r) {
  //get counts
  var count = {};
  r.list.forEach(function (ts) {
    var str = ts.out('root');
    count[str] = count[str] || 0;
    count[str] += 1;
  });
  //pre-compute indexes
  var tmp = r.list.map(function (ts) {
    var num = count[ts.out('root')] || 0;
    return {
      ts: ts,
      index: num * -1 //quick-reverse it
    };
  });
  r.list = sortEm(tmp);
  return r;
};

},{}],54:[function(_dereq_,module,exports){
'use strict';

var splitMethods = function splitMethods(Text) {

  var methods = {
    /** turn result into two seperate results */
    splitAfter: function splitAfter(reg, verbose) {
      var list = [];
      this.list.forEach(function (ts) {
        ts.splitAfter(reg, verbose).forEach(function (mts) {
          list.push(mts);
        });
      });
      this.list = list;
      return this;
    },
    /** turn result into two seperate results */
    splitBefore: function splitBefore(reg, verbose) {
      var list = [];
      this.list.forEach(function (ts) {
        ts.splitBefore(reg, verbose).forEach(function (mts) {
          list.push(mts);
        });
      });
      this.list = list;
      return this;
    },
    /** turn result into two seperate results */
    splitOn: function splitOn(reg, verbose) {
      var list = [];
      this.list.forEach(function (ts) {
        ts.splitOn(reg, verbose).forEach(function (mts) {
          list.push(mts);
        });
      });
      this.list = list;
      return this;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach(function (k) {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = splitMethods;

},{}],55:[function(_dereq_,module,exports){
'use strict';

var splitMethods = function splitMethods(Text) {

  var methods = {

    /**tag all the terms in this result as something */
    tag: function tag(_tag, reason) {
      var _this = this;

      this.list.forEach(function (ts) {
        ts.tagAs(_tag, reason, _this.tagSet);
      });
      return this;
    },
    /**remove a tag in all the terms in this result (that had it) */
    unTag: function unTag(tag, reason) {
      var _this2 = this;

      this.list.forEach(function (ts) {
        ts.unTag(tag, reason, _this2.tagSet);
      });
      return this;
    },

    /** see if these terms can become this tag*/
    canBe: function canBe(tag) {
      var _this3 = this;

      this.list.forEach(function (ts) {
        ts.terms = ts.terms.filter(function (t) {
          return t.canBe(tag, _this3.tagSet);
        });
      });
      return this;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach(function (k) {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = splitMethods;

},{}],56:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  fns: _dereq_('../fns'),
  log: _dereq_('../log'),
  data: _dereq_('../data'),
  Terms: _dereq_('../terms'),
  tags: _dereq_('../tags')
};

},{"../data":8,"../fns":40,"../log":42,"../tags":156,"../terms":176}],57:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');

var Acronyms = function (_Text) {
  _inherits(Acronyms, _Text);

  function Acronyms() {
    _classCallCheck(this, Acronyms);

    return _possibleConstructorReturn(this, (Acronyms.__proto__ || Object.getPrototypeOf(Acronyms)).apply(this, arguments));
  }

  _createClass(Acronyms, [{
    key: 'data',
    value: function data() {
      return this.terms().list.map(function (ts) {
        var t = ts.terms[0];
        var parsed = t.text.toUpperCase().replace(/\./g).split('');
        return {
          periods: parsed.join('.'),
          normal: parsed.join(''),
          text: t.text
        };
      });
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      r = r.match('#Acronym');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    }
  }]);

  return Acronyms;
}(Text);

module.exports = Acronyms;

},{"../../index":44}],58:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Terms = _dereq_('../../paths').Terms;
var methods = _dereq_('./methods');

var Adjective = function (_Terms) {
  _inherits(Adjective, _Terms);

  function Adjective(arr, lexicon, refText, refTerms) {
    _classCallCheck(this, Adjective);

    return _possibleConstructorReturn(this, (Adjective.__proto__ || Object.getPrototypeOf(Adjective)).call(this, arr, lexicon, refText, refTerms));
  }

  _createClass(Adjective, [{
    key: 'data',
    value: function data() {
      var str = this.out('normal');
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
  }]);

  return Adjective;
}(Terms);

module.exports = Adjective;

},{"../../paths":56,"./methods":61}],59:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');
var Adjective = _dereq_('./adjective');

var Adjectives = function (_Text) {
  _inherits(Adjectives, _Text);

  function Adjectives() {
    _classCallCheck(this, Adjectives);

    return _possibleConstructorReturn(this, (Adjectives.__proto__ || Object.getPrototypeOf(Adjectives)).apply(this, arguments));
  }

  _createClass(Adjectives, [{
    key: 'data',
    value: function data() {
      return this.list.map(function (ts) {
        return ts.data();
      });
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      r = r.match('#Adjective');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      r.list = r.list.map(function (ts) {
        return new Adjective(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      });
      return r;
    }
  }]);

  return Adjectives;
}(Text);

module.exports = Adjectives;

},{"../../index":44,"./adjective":58}],60:[function(_dereq_,module,exports){
'use strict';
//an obj of adjectives that can be converted to superlative + comparative, via the lexicon data

var data = _dereq_('../../../../data');

var convertables = {};
data.superlatives.forEach(function (a) {
  convertables[a] = true;
});
data.verbConverts.forEach(function (a) {
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

var adj_to_adv = function adj_to_adv(str) {
  var irregulars = {
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

  var dont = {
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

  var transforms = [{
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

  var not_matches = [/airs$/, /ll$/, /ee.$/, /ile$/];

  if (dont[str]) {
    return null;
  }
  if (irregulars[str]) {
    return irregulars[str];
  }
  if (str.length <= 3) {
    return null;
  }
  for (var i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return null;
    }
  }
  for (var _i = 0; _i < transforms.length; _i++) {
    if (str.match(transforms[_i].reg)) {
      return str.replace(transforms[_i].reg, transforms[_i].repl);
    }
  }
  return str + 'ly';
};
// console.log(adj_to_adv('direct'))

module.exports = adj_to_adv;

},{}],63:[function(_dereq_,module,exports){
//turn 'quick' into 'quickly'
'use strict';

var convertables = _dereq_('./convertable');

var irregulars = {
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

var dont = {
  'overweight': 1,
  'main': 1,
  'nearby': 1,
  'asleep': 1,
  'weekly': 1,
  'secret': 1,
  'certain': 1
};

var transforms = [{
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

var matches = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /old$/, /oud$/, /e[ae]p$/];

var not_matches = [/ary$/, /ous$/];

var to_comparative = function to_comparative(str) {
  if (dont.hasOwnProperty(str)) {
    return null;
  }

  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }

  for (var i = 0; i < transforms.length; i++) {
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

  for (var _i = 0; _i < not_matches.length; _i++) {
    if (str.match(not_matches[_i])) {
      return 'more ' + str;
    }
  }

  for (var _i2 = 0; _i2 < matches.length; _i2++) {
    if (str.match(matches[_i2])) {
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

var to_noun = function to_noun(w) {
  var irregulars = {
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
  var transforms = [{
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

  for (var i = 0; i < transforms.length; i++) {
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

var convertables = _dereq_('./convertable');

var irregulars = {
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

var dont = {
  'overweight': 1,
  'ready': 1
};

var transforms = [{
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

var matches = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /oud$/, /...p$/];

var not_matches = [/ary$/];

var generic_transformation = function generic_transformation(s) {
  if (s.match(/e$/)) {
    return s + 'st';
  }
  return s + 'est';
};

var to_superlative = function to_superlative(str) {
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  for (var i = 0; i < transforms.length; i++) {
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

  for (var _i = 0; _i < not_matches.length; _i++) {
    if (str.match(not_matches[_i])) {
      return 'most ' + str;
    }
  }

  for (var _i2 = 0; _i2 < matches.length; _i2++) {
    if (str.match(matches[_i2])) {
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

var data = _dereq_('../../../../data');
//turn an adjective like 'soft' into a verb like 'soften'

var irregulars = {
  red: 'redden',
  sad: 'sadden',
  fat: 'fatten'
};

var convertable = data.verbConverts.reduce(function (h, str) {
  h[str] = true;
  return h;
}, {});

var toVerb = function toVerb(str) {
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');
var toAdjective = _dereq_('./toAdjective');

var Adverbs = function (_Text) {
  _inherits(Adverbs, _Text);

  function Adverbs() {
    _classCallCheck(this, Adverbs);

    return _possibleConstructorReturn(this, (Adverbs.__proto__ || Object.getPrototypeOf(Adverbs)).apply(this, arguments));
  }

  _createClass(Adverbs, [{
    key: 'data',
    value: function data() {
      return this.terms().list.map(function (ts) {
        var t = ts.terms[0];
        return {
          adjectiveForm: toAdjective(t.normal),
          normal: t.normal,
          text: t.text
        };
      });
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      r = r.match('#Adverb+');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    }
  }]);

  return Adverbs;
}(Text);

module.exports = Adverbs;

},{"../../index":44,"./toAdjective":68}],68:[function(_dereq_,module,exports){
//turns 'quickly' into 'quick'
'use strict';

var irregulars = {
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

var transforms = [{
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

var toAdjective = function toAdjective(str) {
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  for (var i = 0; i < transforms.length; i++) {
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');

var Clauses = function (_Text) {
  _inherits(Clauses, _Text);

  function Clauses() {
    _classCallCheck(this, Clauses);

    return _possibleConstructorReturn(this, (Clauses.__proto__ || Object.getPrototypeOf(Clauses)).apply(this, arguments));
  }

  _createClass(Clauses, null, [{
    key: 'find',
    value: function find(r, n) {
      r = r.splitAfter('#ClauseEnd');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    }
  }]);

  return Clauses;
}(Text);

module.exports = Clauses;

},{"../../index":44}],70:[function(_dereq_,module,exports){
'use strict';

//the plumbing to turn two words into a contraction

var combine = function combine(a, b) {
  b.whitespace.after = a.whitespace.after;
  a.whitespace.after = '';
  b.whitespace.before = '';
  a.silent_term = a.text;
  b.silent_term = b.text;
  b.text = '';
  a.tagAs('Contraction', 'new-contraction');
  b.tagAs('Contraction', 'new-contraction');
};

var contract = function contract(ts) {
  if (ts.expanded === false || ts.match('#Contraction').found) {
    return ts;
  }
  //he is -> he's
  ts.match('(#Noun|#QuestionWord) is').list.forEach(function (ls) {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'s';
    ls.contracted = true;
  });
  //he did -> he'd
  ts.match('#PronNoun did').list.forEach(function (ls) {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'d';
    ls.contracted = true;
  });
  //how do -> how'd
  ts.match('#QuestionWord (did|do)').list.forEach(function (ls) {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'d';
    ls.contracted = true;
  });

  //he would -> he'd
  ts.match('#Noun (could|would)').list.forEach(function (ls) {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'d';
    ls.contracted = true;
  });
  //they are -> they're
  ts.match('(they|we|you) are').list.forEach(function (ls) {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'re';
    ls.contracted = true;
  });
  //i am -> i'm
  ts.match('i am').list.forEach(function (ls) {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'m';
    ls.contracted = true;
  });
  //they will -> they'll
  ts.match('(#Noun|#QuestionWord) will').list.forEach(function (ls) {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'ll';
    ls.contracted = true;
  });
  //they have -> they've
  ts.match('(they|we|you|i) have').list.forEach(function (ls) {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += '\'ve';
    ls.contracted = true;
  });
  //is not -> isn't
  ts.match('(#Copula|#Modal|do) not').list.forEach(function (ls) {
    combine(ls.terms[0], ls.terms[1]);
    ls.terms[0].text += 'n\'t';
    ls.contracted = true;
  });
  return ts;
};

module.exports = contract;

},{}],71:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Terms = _dereq_('../../paths').Terms;
var _contract = _dereq_('./contract');

var _expand = function _expand(ts) {
  if (ts.contracted === false) {
    return ts;
  }
  ts.terms.forEach(function (t) {
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

var Contraction = function (_Terms) {
  _inherits(Contraction, _Terms);

  function Contraction() {
    _classCallCheck(this, Contraction);

    return _possibleConstructorReturn(this, (Contraction.__proto__ || Object.getPrototypeOf(Contraction)).apply(this, arguments));
  }

  _createClass(Contraction, [{
    key: 'data',
    value: function data() {
      var expanded = _expand(this.clone());
      var contracted = _contract(this.clone());
      return {
        text: this.out('text'),
        normal: this.out('normal'),
        expanded: {
          normal: expanded.out('normal'),
          text: expanded.out('text')
        },
        contracted: {
          normal: contracted.out('normal'),
          text: contracted.out('text')
        },
        isContracted: !!this.contracted
      };
    }
  }, {
    key: 'expand',
    value: function expand() {
      return _expand(this);
    }
  }, {
    key: 'contract',
    value: function contract() {
      return _contract(this);
    }
  }]);

  return Contraction;
}(Terms);

module.exports = Contraction;

},{"../../paths":56,"./contract":70}],72:[function(_dereq_,module,exports){
'use strict';
//find contractable, expanded-contractions

var find = function find(r) {
  var remain = r.not('#Contraction');
  var m = remain.match('(#Noun|#QuestionWord) (#Copula|did|do|have|had|could|would|will)');
  m.concat(remain.match('(they|we|you|i) have'));
  m.concat(remain.match('i am'));
  m.concat(remain.match('(#Copula|#Modal|do) not'));
  m.list.forEach(function (ts) {
    ts.expanded = true;
  });
  return m;
};
module.exports = find;

},{}],73:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');
var Contraction = _dereq_('./contraction');
var findPossible = _dereq_('./findPossible');

var Contractions = function (_Text) {
  _inherits(Contractions, _Text);

  function Contractions() {
    _classCallCheck(this, Contractions);

    return _possibleConstructorReturn(this, (Contractions.__proto__ || Object.getPrototypeOf(Contractions)).apply(this, arguments));
  }

  _createClass(Contractions, [{
    key: 'data',
    value: function data() {
      return this.list.map(function (ts) {
        return ts.data();
      });
    }
  }, {
    key: 'contract',
    value: function contract() {
      this.list.forEach(function (ts) {
        return ts.contract();
      });
      return this;
    }
  }, {
    key: 'expand',
    value: function expand() {
      this.list.forEach(function (ts) {
        return ts.expand();
      });
      return this;
    }
  }, {
    key: 'contracted',
    value: function contracted() {
      this.list = this.list.filter(function (ts) {
        return ts.contracted;
      });
      return this;
    }
  }, {
    key: 'expanded',
    value: function expanded() {
      this.list = this.list.filter(function (ts) {
        return !ts.contracted;
      });
      return this;
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      //find currently-contracted
      var found = r.match('#Contraction #Contraction #Contraction?');
      found.list = found.list.map(function (ts) {
        var c = new Contraction(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
        c.contracted = true;
        return c;
      });
      //find currently-expanded
      var expanded = findPossible(r);
      expanded.list.forEach(function (ts) {
        var c = new Contraction(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
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
  }]);

  return Contractions;
}(Text);

module.exports = Contractions;

},{"../../index":44,"./contraction":71,"./findPossible":72}],74:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Terms = _dereq_('../../paths').Terms;
var parsePunt = _dereq_('./parsePunt');
var parseSection = _dereq_('./parseSection');
var parseRelative = _dereq_('./parseRelative');
var parseDate = _dereq_('./parseDate');

var Date = function (_Terms) {
  _inherits(Date, _Terms);

  function Date(arr, lexicon, refText, refTerms) {
    _classCallCheck(this, Date);

    var _this = _possibleConstructorReturn(this, (Date.__proto__ || Object.getPrototypeOf(Date)).call(this, arr, lexicon, refText, refTerms));

    _this.month = _this.match('#Month');
    return _this;
  }

  _createClass(Date, [{
    key: 'data',
    value: function data() {
      var obj = {};
      //parsing order matters..
      //[two days before] [the start of] [this] [thursday]
      obj.punt = parsePunt(this); //two days before
      obj.section = parseSection(this); //the start of
      obj.relative = parseRelative(this); //this
      obj.date = parseDate(this); //thursday
      return obj;
    }
  }]);

  return Date;
}(Terms);

module.exports = Date;

},{"../../paths":56,"./parseDate":78,"./parsePunt":79,"./parseRelative":80,"./parseSection":81}],75:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');
var Date = _dereq_('./date');
var weekdays = _dereq_('./weekday');
var months = _dereq_('./month');

var Dates = function (_Text) {
  _inherits(Dates, _Text);

  function Dates() {
    _classCallCheck(this, Dates);

    return _possibleConstructorReturn(this, (Dates.__proto__ || Object.getPrototypeOf(Dates)).apply(this, arguments));
  }

  _createClass(Dates, [{
    key: 'data',
    value: function data() {
      return this.list.map(function (ts) {
        return ts.data();
      });
    }
  }, {
    key: 'toShortForm',
    value: function toShortForm() {
      this.match('#Month').terms().list.forEach(function (ts) {
        var t = ts.terms[0];
        months.toShortForm(t);
      });
      this.match('#WeekDay').terms().list.forEach(function (ts) {
        var t = ts.terms[0];
        weekdays.toShortForm(t);
      });
      return this;
    }
  }, {
    key: 'toLongForm',
    value: function toLongForm() {
      this.match('#Month').terms().list.forEach(function (ts) {
        var t = ts.terms[0];
        months.toLongForm(t);
      });
      this.match('#WeekDay').terms().list.forEach(function (ts) {
        var t = ts.terms[0];
        weekdays.toLongForm(t);
      });
      return this;
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      var dates = r.match('#Date+');
      if (typeof n === 'number') {
        dates = dates.get(n);
      }
      dates.list = dates.list.map(function (ts) {
        return new Date(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      });
      return dates;
    }
  }]);

  return Dates;
}(Text);

module.exports = Dates;

},{"../../index":44,"./date":74,"./month":77,"./weekday":84}],76:[function(_dereq_,module,exports){
'use strict';

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
  'december': 11
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
  'dec': 11
};

},{}],77:[function(_dereq_,module,exports){
'use strict';

var data = _dereq_('./data');
var shortMonths = data.shortMonths;
var longMonths = data.longMonths;

module.exports = {
  index: function index(t) {
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
  toShortForm: function toShortForm(t) {
    if (t.tag.Month !== undefined) {
      if (longMonths[t.normal] !== undefined) {
        var shorten = Object.keys(shortMonths);
        t.text = shorten[longMonths[t.normal]];
      }
    }
    t.dirty = true;
    return t;
  },
  toLongForm: function toLongForm(t) {
    if (t.tag.Month !== undefined) {
      if (shortMonths[t.normal] !== undefined) {
        var longer = Object.keys(longMonths);
        t.text = longer[shortMonths[t.normal]];
      }
    }
    t.dirty = true;
    return t;
  }

};

},{"./data":76}],78:[function(_dereq_,module,exports){
'use strict';

var parseTime = _dereq_('./parseTime');
var weekdays = _dereq_('./weekday');
var months = _dereq_('./month');
//
var isDate = function isDate(num) {
  if (num && num < 31 && num > 0) {
    return true;
  }
  return false;
};

//please change in one thousand years
var isYear = function isYear(num) {
  if (num && num > 1000 && num < 3000) {
    return true;
  }
  return false;
};

//
var parseDate = function parseDate(r) {
  var result = {
    month: null,
    date: null,
    weekday: null,
    year: null,
    knownDate: null,
    timeOfDay: null
  };
  var m = r.match('(#Holiday|today|tomorrow|yesterday)');
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
    var numbers = m.values().numbers();
    if (isDate(numbers[0])) {
      result.date = numbers[0];
    }
    var year = parseInt(r.match('#Year').out('normal'), 10);
    if (isYear(year)) {
      result.year = year;
    }
  }
  if (!m.found) {
    //january fifth,  january 1992
    m = r.match('#Month #Value');
    if (m.found) {
      var _numbers = m.values().numbers();
      var num = _numbers[0];
      if (isDate(num)) {
        result.date = num;
      }
    }
    //january 1992
    m = r.match('#Month #Year');
    if (m.found) {
      var _num = parseInt(r.match('#Year').out('normal'), 10);
      if (isYear(_num)) {
        result.year = _num;
      }
    }
  }

  //fifth of january
  m = r.match('#Value of #Month');
  if (m.found) {
    var _num2 = m.values().numbers()[0];
    if (isDate(_num2)) {
      result.date = _num2;
    }
  }
  return result;
};
module.exports = parseDate;

},{"./month":77,"./parseTime":82,"./weekday":84}],79:[function(_dereq_,module,exports){
'use strict';
//parse '5 days before', 'three weeks after'..

var durations = {
  year: true,
  quarter: true,
  month: true,
  week: true,
  weekend: true,
  day: true,
  hour: true
};

var parsePunt = function parsePunt(r) {
  var direction = null;
  var duration = {};
  //two days after
  var m = r.match('#Value #Duration (from|after|following)');
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
    r.match('#Value #Duration').list.forEach(function (ts) {
      var num = ts.match('*').values().data()[0] || {};
      num = num.number;
      if (num || num === 0) {
        var str = ts.match('#Duration').nouns().toSingular().out('normal');
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

var relatives = {
  'this': 'this',
  next: 'next',
  last: 'last',
  upcoming: 'next'
};
var parseRelative = function parseRelative(r) {
  var known = '(' + Object.keys(relatives).join('|') + ')';
  var m = r.match(known + '+').lastTerm();
  if (m.found) {
    var str = m.match(known).out('normal');
    return relatives[str];
  }
  return null;
};
module.exports = parseRelative;

},{}],81:[function(_dereq_,module,exports){
'use strict';
//

var sections = {
  start: 'start',
  end: 'end',
  middle: 'middle',
  beginning: 'start',
  ending: 'end',
  midpoint: 'middle',
  midst: 'middle'
};
var parseSection = function parseSection(r) {
  var known = '(' + Object.keys(sections).join('|') + ')';
  var m = r.match('the? ' + known + ' of');
  if (m.found) {
    var str = m.match(known).out('normal');
    return sections[str];
  }
  return null;
};
module.exports = parseSection;

},{}],82:[function(_dereq_,module,exports){
'use strict';
//

var isHour = function isHour(num) {
  if (num && num > 0 && num < 25) {
    return true;
  }
  return false;
};
var isMinute = function isMinute(num) {
  if (num && num > 0 && num < 60) {
    return true;
  }
  return false;
};

var parseTime = function parseTime(r) {
  var result = {
    logic: null,
    hour: null,
    minute: null,
    second: null,
    timezone: null
  };

  var logic = r.match('(by|before|for|during|at|until|after) #Time').firstTerm();
  if (logic.found) {
    result.logic = logic.out('normal');
  }

  var time = r.match('#Time');
  time.terms().list.forEach(function (ts) {
    var t = ts.terms[0];
    //3pm
    var m = t.text.match(/([12]?[0-9]) ?(am|pm)/i);
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
'use strict';

//follow the javascript scheme
//sunday is 0
exports.longDays = {
  'sunday': 0,
  'monday': 1,
  'tuesday': 2,
  'wednesday': 3,
  'thursday': 4,
  'friday': 5,
  'saturday': 6
};
exports.shortDays = {
  'sun': 0,
  'mon': 1,
  'tues': 2,
  'wed': 3,
  'thurs': 4,
  'fri': 5,
  'sat': 6
};

},{}],84:[function(_dereq_,module,exports){
'use strict';

var data = _dereq_('./data');
var shortDays = data.shortDays;
var longDays = data.longDays;

module.exports = {
  index: function index(t) {
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
  toShortForm: function toShortForm(t) {
    if (t.tag.WeekDay) {
      if (longDays[t.normal] !== undefined) {
        var shorten = Object.keys(shortDays);
        t.text = shorten[longDays[t.normal]];
      }
    }
    return t;
  },
  toLongForm: function toLongForm(t) {
    if (t.tag.WeekDay) {
      if (shortDays[t.normal] !== undefined) {
        var longer = Object.keys(longDays);
        t.text = longer[shortDays[t.normal]];
      }
    }
    return t;
  }
};

},{"./data":83}],85:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');

var HashTags = function (_Text) {
  _inherits(HashTags, _Text);

  function HashTags() {
    _classCallCheck(this, HashTags);

    return _possibleConstructorReturn(this, (HashTags.__proto__ || Object.getPrototypeOf(HashTags)).apply(this, arguments));
  }

  _createClass(HashTags, [{
    key: 'data',
    value: function data() {
      return this.terms().list.map(function (ts) {
        var t = ts.terms[0];
        return {
          text: t.text
        };
      });
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      r = r.match('#HashTag');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    }
  }]);

  return HashTags;
}(Text);

module.exports = HashTags;

},{"../../index":44}],86:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ngrams = _dereq_('./index');
var getGrams = _dereq_('./getGrams');

//like an n-gram, but only the endings of matches

var EndGrams = function (_Ngrams) {
  _inherits(EndGrams, _Ngrams);

  function EndGrams() {
    _classCallCheck(this, EndGrams);

    return _possibleConstructorReturn(this, (EndGrams.__proto__ || Object.getPrototypeOf(EndGrams)).apply(this, arguments));
  }

  _createClass(EndGrams, null, [{
    key: 'find',
    value: function find(r, n, size) {
      var opts = {
        size: [1, 2, 3, 4],
        edge: 'end'
      };
      //only look for bigrams, for example
      if (size) {
        opts.size = [size];
      }
      //fetch them
      var arr = getGrams(r, opts);
      r = new EndGrams(arr);
      //default sort
      r.sort();
      //grab top one, or something
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    }
  }]);

  return EndGrams;
}(Ngrams);

module.exports = EndGrams;

},{"./getGrams":87,"./index":89}],87:[function(_dereq_,module,exports){
'use strict';

var Gram = _dereq_('./gram');

//do all grams of one size, on one termList
var getGrams = function getGrams(fts, n) {
  var terms = fts.terms;
  if (terms.length < n) {
    return [];
  }
  var arr = [];
  for (var i = 0; i < terms.length - n + 1; i++) {
    var gram = new Gram(terms.slice(i, i + n));
    arr.push(gram);
  }
  return arr;
};

//left-sided grams
var startGram = function startGram(fts, n) {
  var terms = fts.terms;
  if (terms.length < n) {
    return [];
  }
  var arr = [new Gram(terms.slice(0, n))];
  return arr;
};

//right-sided grams
var endGram = function endGram(fts, n) {
  var terms = fts.terms;
  if (terms.length < n) {
    return [];
  }
  var arr = [new Gram(terms.slice(terms.length - n, terms.length))];
  return arr;
};

//ngrams are consecutive terms of a specific size
var buildGrams = function buildGrams(r, options) {
  options = options || {};
  options.size = options.size || [1, 2, 3];
  if (typeof options.size === 'number') {
    options.size = [options.size];
  }
  var obj = {};
  //collect and count all grams
  options.size.forEach(function (size) {
    r.list.forEach(function (ts) {
      var grams = [];
      if (options.edge === 'start') {
        grams = startGram(ts, size);
      } else if (options.edge === 'end') {
        grams = endGram(ts, size);
      } else {
        grams = getGrams(ts, size);
      }
      grams.forEach(function (g) {
        if (obj[g.key]) {
          obj[g.key].inc();
        } else {
          obj[g.key] = g;
        }
      });
    });
  });

  //flatten to an array
  var arr = Object.keys(obj).map(function (k) {
    return obj[k];
  });
  return arr;
};

module.exports = buildGrams;

},{"./gram":88}],88:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Terms = _dereq_('../../paths').Terms;

//this is one-or-more terms together, sorted by frequency

var Gram = function (_Terms) {
  _inherits(Gram, _Terms);

  function Gram(arr, lexicon, refText, refTerms) {
    _classCallCheck(this, Gram);

    //string to sort/uniq by
    var _this = _possibleConstructorReturn(this, (Gram.__proto__ || Object.getPrototypeOf(Gram)).call(this, arr, lexicon, refText, refTerms));

    _this.key = _this.out('normal');
    //bigram/trigram/etc
    _this.size = arr.length;
    //number of occurances
    _this.count = 1;
    return _this;
  }

  _createClass(Gram, [{
    key: 'inc',
    value: function inc() {
      this.count += 1;
    }
  }]);

  return Gram;
}(Terms);

module.exports = Gram;

},{"../../paths":56}],89:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');
var getGrams = _dereq_('./getGrams');

var Ngrams = function (_Text) {
  _inherits(Ngrams, _Text);

  function Ngrams() {
    _classCallCheck(this, Ngrams);

    return _possibleConstructorReturn(this, (Ngrams.__proto__ || Object.getPrototypeOf(Ngrams)).apply(this, arguments));
  }

  _createClass(Ngrams, [{
    key: 'data',
    value: function data() {
      return this.list.map(function (ts) {
        return {
          normal: ts.out('normal'),
          count: ts.count,
          size: ts.size
        };
      });
    }
  }, {
    key: 'unigrams',
    value: function unigrams() {
      this.list = this.list.filter(function (g) {
        return g.size === 1;
      });
      return this;
    }
  }, {
    key: 'bigrams',
    value: function bigrams() {
      this.list = this.list.filter(function (g) {
        return g.size === 2;
      });
      return this;
    }
  }, {
    key: 'trigrams',
    value: function trigrams() {
      this.list = this.list.filter(function (g) {
        return g.size === 3;
      });
      return this;
    }

    //default sort the ngrams

  }, {
    key: 'sort',
    value: function sort() {
      this.list = this.list.sort(function (a, b) {
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
  }], [{
    key: 'find',
    value: function find(r, n, size) {
      var opts = {
        size: [1, 2, 3, 4]
      };
      //only look for bigrams, for example
      if (size) {
        opts.size = [size];
      }
      //fetch them
      var arr = getGrams(r, opts);
      r = new Ngrams(arr);
      //default sort
      r.sort();
      //grab top one, or something
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    }
  }]);

  return Ngrams;
}(Text);

module.exports = Ngrams;

},{"../../index":44,"./getGrams":87}],90:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ngrams = _dereq_('./index');
var getGrams = _dereq_('./getGrams');

//like an n-gram, but only the startings of matches

var StartGrams = function (_Ngrams) {
  _inherits(StartGrams, _Ngrams);

  function StartGrams() {
    _classCallCheck(this, StartGrams);

    return _possibleConstructorReturn(this, (StartGrams.__proto__ || Object.getPrototypeOf(StartGrams)).apply(this, arguments));
  }

  _createClass(StartGrams, null, [{
    key: 'find',
    value: function find(r, n, size) {
      var opts = {
        size: [1, 2, 3, 4],
        edge: 'start'
      };
      //only look for bigrams, for example
      if (size) {
        opts.size = [size];
      }
      //fetch them
      var arr = getGrams(r, opts);
      r = new StartGrams(arr);
      //default sort
      r.sort();
      //grab top one, or something
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    }
  }]);

  return StartGrams;
}(Ngrams);

module.exports = StartGrams;

},{"./getGrams":87,"./index":89}],91:[function(_dereq_,module,exports){
'use strict';

var uncountables = _dereq_('../../../data').uncountables;

//certain words can't be plural, like 'peace'
var hasPlural = function hasPlural(t) {
  //end quick
  if (!t.tag.Noun) {
    return false;
  }
  if (t.tag.Plural) {
    return true;
  }
  //is it potentially plural?
  var noPlural = ['Pronoun', 'Place', 'Value', 'Person', 'Month', 'WeekDay', 'RelativeDay', 'Holiday'];
  for (var i = 0; i < noPlural.length; i++) {
    if (t.tag[noPlural[i]]) {
      return false;
    }
  }
  //terms known as un-inflectable, like 'peace'
  for (var _i = 0; _i < uncountables.length; _i++) {
    if (t.normal === uncountables[_i]) {
      return false;
    }
  }
  return true;
};

module.exports = hasPlural;

},{"../../../data":8}],92:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');
var Noun = _dereq_('./noun');

var Nouns = function (_Text) {
  _inherits(Nouns, _Text);

  function Nouns() {
    _classCallCheck(this, Nouns);

    return _possibleConstructorReturn(this, (Nouns.__proto__ || Object.getPrototypeOf(Nouns)).apply(this, arguments));
  }

  _createClass(Nouns, [{
    key: 'isPlural',
    value: function isPlural() {
      return this.list.map(function (ts) {
        return ts.isPlural();
      });
    }
  }, {
    key: 'hasPlural',
    value: function hasPlural() {
      return this.list.map(function (ts) {
        return ts.hasPlural();
      });
    }
  }, {
    key: 'toPlural',
    value: function toPlural() {
      this.list.forEach(function (ts) {
        return ts.toPlural();
      });
      return this;
    }
  }, {
    key: 'toSingular',
    value: function toSingular() {
      this.list.forEach(function (ts) {
        return ts.toSingular();
      });
      return this;
    }
  }, {
    key: 'data',
    value: function data() {
      return this.list.map(function (ts) {
        return ts.data();
      });
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      r = r.clauses();
      r = r.match('#Noun+');
      r = r.not('#Pronoun');
      r = r.not('(#Month|#WeekDay)'); //allow Durations, Holidays
      if (typeof n === 'number') {
        r = r.get(n);
      }
      r.list = r.list.map(function (ts) {
        return new Noun(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      });
      return r;
    }
  }]);

  return Nouns;
}(Text);

module.exports = Nouns;

},{"../../index":44,"./noun":100}],93:[function(_dereq_,module,exports){
'use strict';

var irregulars = _dereq_('../../../data').irregular_plurals;
var rules = _dereq_('./methods/data/indicators');

var knownPlural = {
  i: false,
  he: false,
  she: false,
  we: true,
  they: true
};

//is it potentially plural?
var noPlural = ['Place', 'Value', 'Person', 'Month', 'WeekDay', 'RelativeDay', 'Holiday'];
//first, try to guess based on existing tags
var couldEvenBePlural = function couldEvenBePlural(t) {
  for (var i = 0; i < noPlural.length; i++) {
    if (t.tag[noPlural[i]]) {
      return false;
    }
  }
  return true;
};

var isPlural = function isPlural(t) {
  var str = t.normal;

  //whitelist a few easy ones
  if (knownPlural[str] !== undefined) {
    return knownPlural[str];
  }
  //inspect the existing tags to see if a plural is valid
  if (!couldEvenBePlural(t)) {
    return false;
  }
  //handle 'mayors of chicago'
  var preposition = str.match(/([a-z]*) (of|in|by|for) [a-z]/);
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
  for (var i = 0; i < rules.plural_indicators.length; i++) {
    if (str.match(rules.plural_indicators[i])) {
      return true;
    }
  }
  for (var _i = 0; _i < rules.singular_indicators.length; _i++) {
    if (str.match(rules.singular_indicators[_i])) {
      return false;
    }
  }
  // a fallback 'looks check plural' rule..
  if (str.match(/s$/) && !str.match(/ss$/) && str.length > 3) {
    //needs some lovin'
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

var irregulars = {
  'hour': 'an',
  'heir': 'an',
  'heirloom': 'an',
  'honest': 'an',
  'honour': 'an',
  'honor': 'an',
  'uber': 'an' //german u
};
//pronounced letters of acronyms that get a 'an'
var an_acronyms = {
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
var a_regexs = [/^onc?e/i, //'wu' sound of 'o'
/^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
/^eul/i];

var makeArticle = function makeArticle(t) {
  var str = t.normal;

  //explicit irregular forms
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  //spelled-out acronyms
  var firstLetter = str.substr(0, 1);
  if (t.isAcronym() && an_acronyms.hasOwnProperty(firstLetter)) {
    return 'an';
  }
  //'a' regexes
  for (var i = 0; i < a_regexs.length; i++) {
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

var plural_indicators = [/(^v)ies$/i, /ises$/i, /ives$/i, /(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /(buffal|tomat|tornad)oes$/i, /(analy|ba|diagno|parenthe|progno|synop|the)ses$/i, /(vert|ind|cort)ices$/i, /(matr|append)ices$/i, /(x|ch|ss|sh|s|z|o)es$/i, /men$/i, /news$/i, /.tia$/i, /(^f)ves$/i, /(lr)ves$/i, /(^aeiouy|qu)ies$/i, /(m|l)ice$/i, /(cris|ax|test)es$/i, /(alias|status)es$/i, /ics$/i];

//similar to plural/singularize rules, but not the same
var singular_indicators = [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i];
module.exports = {
  singular_indicators: singular_indicators,
  plural_indicators: plural_indicators
};

},{}],96:[function(_dereq_,module,exports){
'use strict';

//patterns for turning 'bus' to 'buses'
module.exports = [[/(ax|test)is$/i, '$1es'], [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i'], [/(octop|vir)i$/i, '$1i'], [/(kn|l|w)ife$/i, '$1ives'], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)f$/i, '$1ves'], [/^(dwar|handkerchie|hoo|scar|whar)f$/i, '$1ves'], [/(alias|status)$/i, '$1es'], [/(bu)s$/i, '$1ses'], [/(al|ad|at|er|et|ed|ad)o$/i, '$1oes'], [/([ti])um$/i, '$1a'], [/([ti])a$/i, '$1a'], [/sis$/i, 'ses'], [/(hive)$/i, '$1s'], [/([^aeiouy]|qu)y$/i, '$1ies'], [/(x|ch|ss|sh|s|z)$/i, '$1es'], [/(matr|vert|ind|cort)(ix|ex)$/i, '$1ices'], [/([m|l])ouse$/i, '$1ice'], [/([m|l])ice$/i, '$1ice'], [/^(ox)$/i, '$1en'], [/^(oxen)$/i, '$1'], [/(quiz)$/i, '$1zes'], [/(antenn|formul|nebul|vertebr|vit)a$/i, '$1ae'], [/(sis)$/i, 'ses'], [/^(?!talis|.*hu)(.*)man$/i, '$1men'], [/(.*)/i, '$1s']].map(function (a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

},{}],97:[function(_dereq_,module,exports){
'use strict';

//patterns for turning 'dwarves' to 'dwarf'
module.exports = [[/([^v])ies$/i, '$1y'], [/ises$/i, 'isis'], [/(kn|[^o]l|w)ives$/i, '$1ife'], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)ves$/i, '$1f'], [/^(dwar|handkerchie|hoo|scar|whar)ves$/i, '$1f'], [/(antenn|formul|nebul|vertebr|vit)ae$/i, '$1a'], [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, '$1us'], [/(buffal|tomat|tornad)(oes)$/i, '$1o'], [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1sis'], [/(vert|ind|cort)(ices)$/i, '$1ex'], [/(matr|append)(ices)$/i, '$1ix'], [/(x|ch|ss|sh|s|z|o)es$/i, '$1'], [/men$/i, 'man'], [/(n)ews$/i, '$1ews'], [/([ti])a$/i, '$1um'], [/([^aeiouy]|qu)ies$/i, '$1y'], [/(s)eries$/i, '$1eries'], [/(m)ovies$/i, '$1ovie'], [/([m|l])ice$/i, '$1ouse'], [/(cris|ax|test)es$/i, '$1is'], [/(alias|status)es$/i, '$1'], [/(ss)$/i, '$1'], [/(ics)$/i, '$1'], [/s$/i, '']].map(function (a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

},{}],98:[function(_dereq_,module,exports){
'use strict';

var irregulars = _dereq_('../../../../data').irregular_plurals.toPlural;
var pluralRules = _dereq_('./data/pluralRules');

//turn 'shoe' into 'shoes'
var pluralize = function pluralize(str) {
  //irregular
  if (irregulars[str]) {
    return irregulars[str];
  }

  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    var first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];
    if (first) {
      var better_first = pluralize(first); //recursive
      return better_first + str.replace(first, '');
    }
  }

  //regular rule-based inflector
  for (var i = 0; i < pluralRules.length; i++) {
    if (str.match(pluralRules[i].reg)) {
      return str.replace(pluralRules[i].reg, pluralRules[i].repl);
    }
  }
  return null;
};

module.exports = pluralize;

},{"../../../../data":8,"./data/pluralRules":96}],99:[function(_dereq_,module,exports){
'use strict';

var irregulars = _dereq_('../../../../data').irregular_plurals.toSingle;
var singleRules = _dereq_('./data/singleRules');

//turn 'shoes' into 'shoe'
var toSingle = function toSingle(str) {
  //irregular
  if (irregulars[str]) {
    return irregulars[str];
  }
  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    var first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];
    if (first) {
      var better_first = toSingle(first); //recursive
      return better_first + str.replace(first, '');
    }
  }

  //regular rule-based inflector
  for (var i = 0; i < singleRules.length; i++) {
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Terms = _dereq_('../../paths').Terms;
var _hasPlural = _dereq_('./hasPlural');
var _isPlural = _dereq_('./isPlural');
var makeArticle = _dereq_('./makeArticle');
var pluralize = _dereq_('./methods/pluralize');
var singularize = _dereq_('./methods/singularize');

var Noun = function (_Terms) {
  _inherits(Noun, _Terms);

  function Noun(arr, lexicon, refText, refTerms) {
    _classCallCheck(this, Noun);

    var _this = _possibleConstructorReturn(this, (Noun.__proto__ || Object.getPrototypeOf(Noun)).call(this, arr, lexicon, refText, refTerms));

    _this.t = _this.terms[0];
    return _this;
  }

  _createClass(Noun, [{
    key: 'article',
    value: function article() {
      var t = this.t;
      return makeArticle(t);
    }
  }, {
    key: 'isPlural',
    value: function isPlural() {
      var t = this.t;
      return _isPlural(t);
    }
  }, {
    key: 'hasPlural',
    value: function hasPlural() {
      var t = this.t;
      return _hasPlural(t);
    }
  }, {
    key: 'toPlural',
    value: function toPlural() {
      var t = this.t;
      if (_hasPlural(t) && !_isPlural(t)) {
        t.text = pluralize(t.text);
        t.unTag('Plural', 'toPlural');
        t.tagAs('Singular', 'toPlural');
      }
      return this;
    }
  }, {
    key: 'toSingular',
    value: function toSingular() {
      var t = this.t;
      if (_isPlural(t)) {
        t.text = singularize(t.text);
        t.unTag('Plural', 'toSingular');
        t.tagAs('Singular', 'toSingular');
      }
      return this;
    }
  }, {
    key: 'data',
    value: function data() {
      return {
        article: this.article(),
        singular: this.toSingular().out('normal'),
        plural: this.toPlural().out('normal')
      };
    }
  }]);

  return Noun;
}(Terms);

module.exports = Noun;

},{"../../paths":56,"./hasPlural":91,"./isPlural":93,"./makeArticle":94,"./methods/pluralize":98,"./methods/singularize":99}],101:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');

var Organizations = function (_Text) {
  _inherits(Organizations, _Text);

  function Organizations() {
    _classCallCheck(this, Organizations);

    return _possibleConstructorReturn(this, (Organizations.__proto__ || Object.getPrototypeOf(Organizations)).apply(this, arguments));
  }

  _createClass(Organizations, [{
    key: 'data',
    value: function data() {
      return this.list.map(function (ts) {
        return {
          text: ts.out('text'),
          normal: ts.out('normal')
        };
      });
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      r = r.splitAfter('#Comma');
      r = r.match('#Organization+');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    }
  }]);

  return Organizations;
}(Text);

module.exports = Organizations;

},{"../../index":44}],102:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../../paths').log;
// make a statistical assumption about the gender of the person based on their given name
// used for pronoun resolution only.
// not intended for classification, or discrimination of people.
var gender = function gender(firstName) {
  if (!firstName) {
    return null;
  }
  //statistical guesses
  if (firstName.match(/.(i|ee|[a|e]y|a)$/i)) {
    //this is almost-always true
    log.tell('Female-name suffix');
    return 'Female';
  }
  if (firstName.match(/[ou]$/i)) {
    //if it ends in a 'oh or uh', male
    log.tell('Male-name suffix');
    return 'Male';
  }
  if (firstName.match(/(nn|ll|tt)/i)) {
    //if it has double-consonants, female
    log.tell('Female-name consonant-doubling');
    return 'Female';
  }
  // name not recognized, or recognized as of indeterminate gender
  return null;
};
module.exports = gender;

},{"../../paths":56}],103:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');
var Person = _dereq_('./person');
//this is used for pronoun and honorifics, and not intented for more-than grammatical use (see #117)

var People = function (_Text) {
  _inherits(People, _Text);

  function People() {
    _classCallCheck(this, People);

    return _possibleConstructorReturn(this, (People.__proto__ || Object.getPrototypeOf(People)).apply(this, arguments));
  }

  _createClass(People, [{
    key: 'data',
    value: function data() {
      return this.list.map(function (ts) {
        return ts.data();
      });
    }
  }, {
    key: 'pronoun',
    value: function pronoun() {
      return this.list.map(function (ts) {
        return ts.pronoun();
      });
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      var people = r.clauses();
      people = people.match('#Person+');
      if (typeof n === 'number') {
        people = people.get(n);
      }
      people.list = people.list.map(function (ts) {
        return new Person(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      });
      return people;
    }
  }]);

  return People;
}(Text);

module.exports = People;

},{"../../index":44,"./person":104}],104:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Terms = _dereq_('../../paths').Terms;
var _guessGender = _dereq_('./guessGender');
var log = _dereq_('../../paths').log;

var Person = function (_Terms) {
  _inherits(Person, _Terms);

  _createClass(Person, [{
    key: 'data',
    value: function data() {
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
  }]);

  function Person(arr, lexicon, refText, refTerms) {
    var _ret;

    _classCallCheck(this, Person);

    var _this = _possibleConstructorReturn(this, (Person.__proto__ || Object.getPrototypeOf(Person)).call(this, arr, lexicon, refText, refTerms));

    _this.firstName = _this.match('#FirstName+');
    _this.middleName = _this.match('#Acronym+');
    _this.honorifics = _this.match('#Honorific');
    _this.lastName = _this.match('#LastName+');
    //assume first-last
    if (!_this.firstName.found && _this.length > 1) {
      var m = _this.not('(#Acronym|#Honorific)');
      _this.firstName = m.first();
      _this.lastName = m.last();
    }
    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Person, [{
    key: 'guessGender',
    value: function guessGender() {
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
      var str = this.firstName.out('normal');
      return _guessGender(str);
    }
  }, {
    key: 'pronoun',
    value: function pronoun() {
      var str = this.firstName.out('normal');
      var g = this.guessGender(str);
      if (g === 'Male') {
        return 'he';
      }
      if (g === 'Female') {
        return 'she';
      }
      return 'they';
    }
  }, {
    key: 'root',
    value: function root() {
      var first = this.firstName.out('root');
      var last = this.lastName.out('root');
      if (first && last) {
        return first + ' ' + last;
      }
      return last || first || this.out('root');
    }
  }]);

  return Person;
}(Terms);

module.exports = Person;

},{"../../paths":56,"./guessGender":102}],105:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');

var PhoneNumbers = function (_Text) {
  _inherits(PhoneNumbers, _Text);

  function PhoneNumbers() {
    _classCallCheck(this, PhoneNumbers);

    return _possibleConstructorReturn(this, (PhoneNumbers.__proto__ || Object.getPrototypeOf(PhoneNumbers)).apply(this, arguments));
  }

  _createClass(PhoneNumbers, [{
    key: 'data',
    value: function data() {
      return this.terms().list.map(function (ts) {
        var t = ts.terms[0];
        return {
          text: t.text
        };
      });
    }
  }], [{
    key: 'find',
    value: function find(r) {
      r = r.splitAfter('#Comma');
      r = r.match('#PhoneNumber+');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    }
  }]);

  return PhoneNumbers;
}(Text);

module.exports = PhoneNumbers;

},{"../../index":44}],106:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');
var Place = _dereq_('./place');

var Places = function (_Text) {
  _inherits(Places, _Text);

  function Places() {
    _classCallCheck(this, Places);

    return _possibleConstructorReturn(this, (Places.__proto__ || Object.getPrototypeOf(Places)).apply(this, arguments));
  }

  _createClass(Places, [{
    key: 'data',
    value: function data() {
      return this.list.map(function (ts) {
        return {
          text: ts.out('text'),
          normal: ts.out('normal')
        };
      });
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      r = r.splitAfter('#Comma');
      r = r.match('#Place+');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      r.list = r.list.map(function (ts) {
        return new Place(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      });
      return r;
    }
  }]);

  return Places;
}(Text);

module.exports = Places;

},{"../../index":44,"./place":107}],107:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Terms = _dereq_('../../paths').Terms;

var Place = function (_Terms) {
  _inherits(Place, _Terms);

  function Place(arr, lexicon, refText, refTerms) {
    _classCallCheck(this, Place);

    var _this = _possibleConstructorReturn(this, (Place.__proto__ || Object.getPrototypeOf(Place)).call(this, arr, lexicon, refText, refTerms));

    _this.city = _this.match('#City');
    _this.country = _this.match('#Country');
    return _this;
  }

  _createClass(Place, [{
    key: 'root',
    value: function root() {
      return this.city.out('root');
    }
  }, {
    key: 'isA',
    get: function get() {
      return 'Place';
    }
  }]);

  return Place;
}(Terms);

module.exports = Place;

},{"../../paths":56}],108:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');

var Quotations = function (_Text) {
  _inherits(Quotations, _Text);

  function Quotations() {
    _classCallCheck(this, Quotations);

    return _possibleConstructorReturn(this, (Quotations.__proto__ || Object.getPrototypeOf(Quotations)).apply(this, arguments));
  }

  _createClass(Quotations, [{
    key: 'data',
    value: function data() {
      return this.list.map(function (t) {
        return {
          text: t.out(),
          normal: t.out('normal')
        };
      });
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      r = r.match('#Quotation+');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    }
  }]);

  return Quotations;
}(Text);

module.exports = Quotations;

},{"../../index":44}],109:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');
var Sentence = _dereq_('./sentence');

var Sentences = function (_Text) {
  _inherits(Sentences, _Text);

  function Sentences(arr, lexicon, reference) {
    _classCallCheck(this, Sentences);

    return _possibleConstructorReturn(this, (Sentences.__proto__ || Object.getPrototypeOf(Sentences)).call(this, arr, lexicon, reference));
  }

  _createClass(Sentences, [{
    key: 'data',
    value: function data() {
      return this.list.map(function (ts) {
        return ts.data();
      });
    }
    /** conjugate the main/first verb*/

  }, {
    key: 'toPastTense',
    value: function toPastTense() {
      this.list = this.list.map(function (ts) {
        ts = ts.toPastTense();
        return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      });
      return this;
    }
  }, {
    key: 'toPresentTense',
    value: function toPresentTense() {
      this.list = this.list.map(function (ts) {
        ts = ts.toPresentTense();
        return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      });
      return this;
    }
  }, {
    key: 'toFutureTense',
    value: function toFutureTense() {
      this.list = this.list.map(function (ts) {
        ts = ts.toFutureTense();
        return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      });
      return this;
    }
    /** negative/positive */

  }, {
    key: 'toNegative',
    value: function toNegative() {
      this.list = this.list.map(function (ts) {
        ts = ts.toNegative();
        return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      });
      return this;
    }
  }, {
    key: 'toPositive',
    value: function toPositive() {
      this.list = this.list.map(function (ts) {
        ts = ts.toPositive();
        return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      });
      return this;
    }

    /** look for 'was _ by' patterns */

  }, {
    key: 'isPassive',
    value: function isPassive() {
      this.list = this.list.filter(function (ts) {
        return ts.isPassive();
      });
      return this;
    }
    /** add a word to the start */

  }, {
    key: 'prepend',
    value: function prepend(str) {
      this.list = this.list.map(function (ts) {
        return ts.prepend(str);
      });
      return this;
    }
    /** add a word to the end */

  }, {
    key: 'append',
    value: function append(str) {
      this.list = this.list.map(function (ts) {
        return ts.append(str);
      });
      return this;
    }

    /** convert between question/statement/exclamation*/

  }, {
    key: 'toExclamation',
    value: function toExclamation() {
      this.list.forEach(function (ts) {
        ts.setPunctuation('!');
      });
      return this;
    }
  }, {
    key: 'toQuestion',
    value: function toQuestion() {
      this.list.forEach(function (ts) {
        ts.setPunctuation('?');
      });
      return this;
    }
  }, {
    key: 'toStatement',
    value: function toStatement() {
      this.list.forEach(function (ts) {
        ts.setPunctuation('.');
      });
      return this;
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      r = r.all();
      if (typeof n === 'number') {
        r = r.get(n);
      }
      r.list = r.list.map(function (ts) {
        return new Sentence(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      });
      // return new Text(r.list, r.lexicon, r.reference);
      return r;
    }
  }]);

  return Sentences;
}(Text);

module.exports = Sentences;

},{"../../index":44,"./sentence":111}],110:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../index');

var Questions = function (_Text) {
  _inherits(Questions, _Text);

  function Questions() {
    _classCallCheck(this, Questions);

    return _possibleConstructorReturn(this, (Questions.__proto__ || Object.getPrototypeOf(Questions)).apply(this, arguments));
  }

  _createClass(Questions, null, [{
    key: 'find',
    value: function find(r, n) {
      r = r.all();
      if (typeof n === 'number') {
        r = r.get(n);
      }
      var list = r.list.filter(function (ts) {
        return ts.last().endPunctuation() === '?';
      });
      return new Text(list, this.lexicon, this.parent);
    }
  }]);

  return Questions;
}(Text);

module.exports = Questions;

},{"../index":109}],111:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Terms = _dereq_('../../paths').Terms;
var _toNegative = _dereq_('./toNegative');
var _toPositive = _dereq_('./toPositive');
var Verb = _dereq_('../verbs/verb');
var insert = _dereq_('./smartInsert');

var Sentence = function (_Terms) {
  _inherits(Sentence, _Terms);

  function Sentence(arr, lexicon, refText, refTerms) {
    _classCallCheck(this, Sentence);

    return _possibleConstructorReturn(this, (Sentence.__proto__ || Object.getPrototypeOf(Sentence)).call(this, arr, lexicon, refText, refTerms));
  }

  _createClass(Sentence, [{
    key: 'data',
    value: function data() {
      return {
        text: this.out('text'),
        normal: this.out('normal')
      };
    }
    /** inflect the main/first noun*/

  }, {
    key: 'toSingular',
    value: function toSingular() {
      var nouns = this.match('#Noun').match('!#Pronoun').firstTerm();
      nouns.things().toSingular();
      return this;
    }
  }, {
    key: 'toPlural',
    value: function toPlural() {
      var nouns = this.match('#Noun').match('!#Pronoun').firstTerm();
      nouns.things().toPlural();
      return this;
    }

    /** find the first important verbPhrase. returns a Term object */

  }, {
    key: 'mainVerb',
    value: function mainVerb() {
      var terms = this.match('(#Adverb|#Auxillary|#Verb|#Negative|#Particle)+')['if']('#Verb'); //this should be (much) smarter
      if (terms.found) {
        terms = terms.list[0].terms;
        return new Verb(terms, this.lexicon, this.refText, this.refTerms);
      }
      return null;
    }

    /** sentence tense conversion**/

  }, {
    key: 'toPastTense',
    value: function toPastTense() {
      var verb = this.mainVerb();
      if (verb) {
        //this is really ugly..
        var start = verb.out('normal');
        verb.toPastTense();
        // console.log(verb.parentTerms.out() + '!');
        var end = verb.out('normal');
        var r = this.parentTerms.replace(start, end);
        return r;
      }
      return this;
    }
  }, {
    key: 'toPresentTense',
    value: function toPresentTense() {
      var verb = this.mainVerb();
      if (verb) {
        var start = verb.out('normal');
        verb.toPresentTense();
        var end = verb.out('normal');
        return this.parentTerms.replace(start, end);
      }
      return this;
    }
  }, {
    key: 'toFutureTense',
    value: function toFutureTense() {
      var verb = this.mainVerb();
      if (verb) {
        var start = verb.out('normal');
        verb.toFutureTense();
        var end = verb.out('normal');
        return this.parentTerms.replace(start, end);
      }
      return this;
    }

    /** negation **/

  }, {
    key: 'isNegative',
    value: function isNegative() {
      return this.match('#Negative').list.length === 1;
    }
  }, {
    key: 'toNegative',
    value: function toNegative() {
      if (this.isNegative()) {
        return this;
      }
      return _toNegative(this);
    }
  }, {
    key: 'toPositive',
    value: function toPositive() {
      if (!this.isNegative()) {
        return this;
      }
      return _toPositive(this);
    }

    /** smarter insert methods*/

  }, {
    key: 'append',
    value: function append(str) {
      return insert.append(this, str);
    }
  }, {
    key: 'prepend',
    value: function prepend(str) {
      return insert.prepend(this, str);
    }

    /** punctuation */

  }, {
    key: 'setPunctuation',
    value: function setPunctuation(punct) {
      var last = this.terms[this.terms.length - 1];
      last.setPunctuation(punct);
    }
  }, {
    key: 'getPunctuation',
    value: function getPunctuation() {
      var last = this.terms[this.terms.length - 1];
      return last.getPunctuation();
    }
    /** look for 'was _ by' patterns */

  }, {
    key: 'isPassive',
    value: function isPassive() {
      return this.match('was #Adverb? #PastTense #Adverb? by').found; //haha
    }
  }]);

  return Sentence;
}(Terms);

module.exports = Sentence;

},{"../../paths":56,"../verbs/verb":152,"./smartInsert":112,"./toNegative":114,"./toPositive":115}],112:[function(_dereq_,module,exports){
'use strict';

//sticking words at the start sentence-sensitive

var prepend = function prepend(ts, str) {
  var firstTerm = ts.terms[0];
  ts.insertAt(0, str);
  //handle titlecase of first-word
  if (firstTerm.text.match(/^[A-Z]/)) {
    //is it titlecased because it should be?
    if (firstTerm.needsTitleCase() === false) {
      firstTerm.toLowerCase();
    }
    var newTerm = ts.terms[0];
    newTerm.toTitleCase();
  }
  return ts;
};

//sticking words on end sentence-sensitive
var append = function append(ts, str) {
  var endTerm = ts.terms[ts.terms.length - 1];
  //move the sentence punctuation to the end
  var punct = endTerm.endPunctuation();
  if (punct) {
    endTerm.killPunctuation();
  }
  ts.insertAt(ts.terms.length, str);
  var newTerm = ts.terms[ts.terms.length - 1];
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../index');

var Statements = function (_Text) {
  _inherits(Statements, _Text);

  function Statements() {
    _classCallCheck(this, Statements);

    return _possibleConstructorReturn(this, (Statements.__proto__ || Object.getPrototypeOf(Statements)).apply(this, arguments));
  }

  _createClass(Statements, null, [{
    key: 'find',
    value: function find(r, n) {
      r = r.all();
      if (typeof n === 'number') {
        r = r.get(n);
      }
      var list = r.list.filter(function (ts) {
        return ts.last().endPunctuation() !== '?';
      });
      return new Text(list, this.lexicon, this.parent);
    }
  }]);

  return Statements;
}(Text);

module.exports = Statements;

},{"../index":109}],114:[function(_dereq_,module,exports){
'use strict';

//these terms are nicer ways to negate a sentence
//ie. john always walks -> john always doesn't walk

var logicalNegate = {
  'everyone': 'no one',
  'everybody': 'nobody',
  'someone': 'no one',
  'somebody': 'nobody',
  // everything:"nothing",
  'always': 'never'
};

//different rule for i/we/they/you + infinitive
//that is, 'i walk' -> 'i don\'t walk', not 'I not walk'
var toNegative = function toNegative(ts) {
  var lg = ts.match('(everyone|everybody|someone|somebody|always)').first();
  if (lg.found && logicalNegate[lg.out('normal')]) {
    var found = lg.out('normal');
    // ts = ts.replace(found, logicalNegate[found]);
    ts = ts.match(found).replaceWith(logicalNegate[found]).list[0];
    return ts.parentTerms;
  }
  //negate the main verb of the sentence
  var vb = ts.mainVerb();
  if (vb) {
    vb.toNegative();
  }
  return ts;
};
module.exports = toNegative;

},{}],115:[function(_dereq_,module,exports){
'use strict';

//ie. john never walks -> john always walks
//nobody/noone are ambiguous logically (somebody? / everybody?)

var logical = {
  'never': 'always',
  'nothing': 'everything'
};

var toPositive = function toPositive(ts) {
  var m = ts.match('(never|nothing)').first();
  if (m.found) {
    var str = m.out('normal');
    if (logical[str]) {
      ts = ts.match(str).replaceWith(logical[str]).list[0];
      return ts.parentTerms;
    }
  }
  //otherwise just remove 'not'
  ts['delete']('#Negative');
  return ts;
};
module.exports = toPositive;

},{}],116:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');
var Term = _dereq_('./term');

var Terms = function (_Text) {
  _inherits(Terms, _Text);

  function Terms() {
    _classCallCheck(this, Terms);

    return _possibleConstructorReturn(this, (Terms.__proto__ || Object.getPrototypeOf(Terms)).apply(this, arguments));
  }

  _createClass(Terms, [{
    key: 'data',
    value: function data() {
      return this.list.map(function (ts) {
        return ts.data();
      });
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      r = r.match('.');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      r.list = r.list.map(function (ts) {
        return new Term(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      });
      return r;
    }
  }]);

  return Terms;
}(Text);

module.exports = Terms;

},{"../../index":44,"./term":117}],117:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Terms = _dereq_('../../paths').Terms;
var tagList = _dereq_('../../paths').tags;
var boringTags = {
  Auxillary: true
};

var Term = function (_Terms) {
  _inherits(Term, _Terms);

  function Term(arr, lexicon, refText, refTerms) {
    _classCallCheck(this, Term);

    var _this = _possibleConstructorReturn(this, (Term.__proto__ || Object.getPrototypeOf(Term)).call(this, arr, lexicon, refText, refTerms));

    _this.t = _this.terms[0];
    return _this;
  }

  _createClass(Term, [{
    key: 'bestTag',
    value: function bestTag() {
      var tags = Object.keys(this.t.tag);
      tags = tags.sort(); //alphabetical, first
      //then sort by #of parent tags
      tags = tags.sort(function (a, b) {
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
  }, {
    key: 'data',
    value: function data() {
      var t = this.t;
      return {
        spaceBefore: t.whitespace.before,
        text: t.text,
        spaceAfter: t.whitespace.after,
        normal: t.normal,
        implicit: t.silent_term,
        bestTag: this.bestTag(),
        tags: Object.keys(t.tag)
      };
    }
  }]);

  return Term;
}(Terms);

module.exports = Term;

},{"../../paths":56}],118:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');
// const Noun = require('./noun');

var Things = function (_Text) {
  _inherits(Things, _Text);

  function Things() {
    _classCallCheck(this, Things);

    return _possibleConstructorReturn(this, (Things.__proto__ || Object.getPrototypeOf(Things)).apply(this, arguments));
  }

  _createClass(Things, [{
    key: 'data',
    value: function data() {
      return this.list.map(function (ts) {
        return ts.data();
      });
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      r = r.clauses();
      //find people/places/organizations
      var yup = r.people();
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
  }]);

  return Things;
}(Text);

module.exports = Things;

},{"../../index":44}],119:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');

var Urls = function (_Text) {
  _inherits(Urls, _Text);

  function Urls() {
    _classCallCheck(this, Urls);

    return _possibleConstructorReturn(this, (Urls.__proto__ || Object.getPrototypeOf(Urls)).apply(this, arguments));
  }

  _createClass(Urls, [{
    key: 'data',
    value: function data() {
      return this.terms().list.map(function (ts) {
        var t = ts.terms[0];
        return {
          text: t.text
        };
      });
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      r = r.match('#Url');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    }
  }]);

  return Urls;
}(Text);

module.exports = Urls;

},{"../../index":44}],120:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');
var Value = _dereq_('./value');

var Values = function (_Text) {
  _inherits(Values, _Text);

  function Values() {
    _classCallCheck(this, Values);

    return _possibleConstructorReturn(this, (Values.__proto__ || Object.getPrototypeOf(Values)).apply(this, arguments));
  }

  _createClass(Values, [{
    key: 'data',
    value: function data() {
      return this.list.map(function (ts) {
        return ts.data();
      });
    }
  }, {
    key: 'noDates',
    value: function noDates() {
      return this.not('#Date');
    }
    /** five -> 5 */

  }, {
    key: 'numbers',
    value: function numbers() {
      return this.list.map(function (ts) {
        return ts.number();
      });
    }
    /** five -> '5' */

  }, {
    key: 'toNumber',
    value: function toNumber() {
      this.list = this.list.map(function (ts) {
        return ts.toNumber();
      });
      return this;
    }
    /**5 -> 'five' */

  }, {
    key: 'toTextValue',
    value: function toTextValue() {
      this.list = this.list.map(function (ts) {
        return ts.toTextValue();
      });
      return this;
    }
    /**5th -> 5 */

  }, {
    key: 'toCardinal',
    value: function toCardinal() {
      this.list = this.list.map(function (ts) {
        return ts.toCardinal();
      });
      return this;
    }
    /**5 -> 5th */

  }, {
    key: 'toOrdinal',
    value: function toOrdinal() {
      this.list = this.list.map(function (ts) {
        return ts.toOrdinal();
      });
      return this;
    }
    /**5900 -> 5,900 */

  }, {
    key: 'toNiceNumber',
    value: function toNiceNumber() {
      this.list = this.list.map(function (ts) {
        return ts.toNiceNumber();
      });
      return this;
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      r = r.match('#Value+');
      // r = r.match('#Value+ #Unit?');

      //june 21st 1992 is two seperate values
      r.splitOn('#Year');
      // r.debug();
      if (typeof n === 'number') {
        r = r.get(n);
      }
      r.list = r.list.map(function (ts) {
        return new Value(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      });
      return r;
    }
  }]);

  return Values;
}(Text);

Values.prototype.clone = function () {
  var list = this.list.map(function (ts) {
    return ts.clone();
  });
  return new Values(list, this.lexicon);
};
module.exports = Values;

},{"../../index":44,"./value":132}],121:[function(_dereq_,module,exports){
'use strict';

var toNumber = _dereq_('../toNumber');

//turn a number like 5 into an ordinal like 5th
var numOrdinal = function numOrdinal(ts) {
  var num = toNumber(ts);
  if (!num && num !== 0) {
    return null;
  }
  //the teens are all 'th'
  var tens = num % 100;
  if (tens > 10 && tens < 20) {
    return '' + num + 'th';
  }
  //the rest of 'em
  var mapping = {
    0: 'th',
    1: 'st',
    2: 'nd',
    3: 'rd'
  };
  var str = '' + num;
  var last = str.slice(str.length - 1, str.length);
  if (mapping[last]) {
    str += mapping[last];
  } else {
    str += 'th';
  }
  return str;
};

module.exports = numOrdinal;

},{"../toNumber":127}],122:[function(_dereq_,module,exports){
'use strict';

module.exports = _dereq_('../../paths');

},{"../../paths":56}],123:[function(_dereq_,module,exports){
'use strict';

var toNumber = _dereq_('../toNumber');
var toText = _dereq_('../toText');
var ordinalWord = _dereq_('../../../paths').data.ordinalMap.toOrdinal;
//
var textOrdinal = function textOrdinal(ts) {
  var num = toNumber(ts);
  var words = toText(num);
  //convert the last number to an ordinal
  var last = words[words.length - 1];
  words[words.length - 1] = ordinalWord[last] || last;
  return words.join(' ');
};

module.exports = textOrdinal;

},{"../../../paths":56,"../toNumber":127,"../toText":131}],124:[function(_dereq_,module,exports){
'use strict';

var niceNumber = function niceNumber(num) {
  if (!num && num !== 0) {
    return null;
  }
  num = '' + num;
  var x = num.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
};
module.exports = niceNumber;

},{}],125:[function(_dereq_,module,exports){
'use strict';

var p = _dereq_('../paths');
var numbers = p.data.numbers;
var fns = p.fns;

//setup number-word data
var ones = fns.extend(numbers.ordinal.ones, numbers.cardinal.ones);
var teens = fns.extend(numbers.ordinal.teens, numbers.cardinal.teens);
var tens = fns.extend(numbers.ordinal.tens, numbers.cardinal.tens);
var multiples = fns.extend(numbers.ordinal.multiples, numbers.cardinal.multiples);

module.exports = {
  ones: ones,
  teens: teens,
  tens: tens,
  multiples: multiples
};

},{"../paths":122}],126:[function(_dereq_,module,exports){
'use strict';

//support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5

var findModifiers = function findModifiers(str) {
  var mults = [{
    reg: /^(minus|negative)[\s\-]/i,
    mult: -1
  }, {
    reg: /^(a\s)?half[\s\-](of\s)?/i,
    mult: 0.5
  }];
  for (var i = 0; i < mults.length; i++) {
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

},{}],127:[function(_dereq_,module,exports){
'use strict';

var parseNumeric = _dereq_('./parseNumeric');
var findModifiers = _dereq_('./findModifiers');
var words = _dereq_('./data');
var isValid = _dereq_('./validate');
var parseDecimals = _dereq_('./parseDecimals');
var log = _dereq_('../paths').log;
var path = 'parseNumber';

//some numbers we know
var casualForms = {
  // 'a few': 3,
  'a couple': 2,
  'a dozen': 12,
  'two dozen': 24,
  'zero': 0
};

// a 'section' is something like 'fifty-nine thousand'
// turn a section into something we can add to - like 59000
var section_sum = function section_sum(obj) {
  // console.log(obj);
  return Object.keys(obj).reduce(function (sum, k) {
    sum += obj[k];
    return sum;
  }, 0);
};

var alreadyNumber = function alreadyNumber(ts) {
  for (var i = 0; i < ts.terms.length; i++) {
    if (!ts.terms[i].tag.NumericValue) {
      return false;
    }
  }
  return true;
};

//turn a string into a number
var parse = function parse(ts) {
  log.here('parseNumber', path);
  var str = ts.out('normal');
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
  var modifier = findModifiers(str);
  str = modifier.str;
  var last_mult = null;
  var has = {};
  var sum = 0;
  var isNegative = false;
  var terms = str.split(/[ -]/);
  // console.log(terms);
  for (var i = 0; i < terms.length; i++) {
    var w = terms[i];
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
    var improperFractionMatch = w.match(/^([0-9,\. ]+)\/([0-9,\. ]+)$/);
    if (improperFractionMatch) {
      log.here('fractionMath', path);
      var num = parseFloat(improperFractionMatch[1].replace(/[, ]/g, ''));
      var denom = parseFloat(improperFractionMatch[2].replace(/[, ]/g, ''));
      if (denom) {
        sum += num / denom || 0;
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
      var mult = words.multiples[w];
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

},{"../paths":122,"./data":125,"./findModifiers":126,"./parseDecimals":128,"./parseNumeric":129,"./validate":130}],128:[function(_dereq_,module,exports){
'use strict';

var words = _dereq_('./data');

//concatenate into a string with leading '0.'
var parseDecimals = function parseDecimals(arr) {
  var str = '0.';
  for (var i = 0; i < arr.length; i++) {
    var w = arr[i];
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

},{"./data":125}],129:[function(_dereq_,module,exports){
'use strict';
//parse a string like "4,200.1" into Number 4200.1

var parseNumeric = function parseNumeric(str) {
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

},{}],130:[function(_dereq_,module,exports){
'use strict';

var words = _dereq_('./data');

//prevent things like 'fifteen ten', and 'five sixty'
var isValid = function isValid(w, has) {
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

},{"./data":125}],131:[function(_dereq_,module,exports){
'use strict';
// turns an integer/float into a textual number, like 'fifty-five'

//turn number into an array of magnitudes, like [[5, million], [2, hundred]]

var breakdown_magnitudes = function breakdown_magnitudes(num) {
  var working = num;
  var have = [];
  var sequence = [[1000000000, 'million'], [100000000, 'hundred million'], [1000000, 'million'], [100000, 'hundred thousand'], [1000, 'thousand'], [100, 'hundred'], [1, 'one']];
  sequence.forEach(function (a) {
    if (num > a[0]) {
      var howmany = Math.floor(working / a[0]);
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
var breakdown_hundred = function breakdown_hundred(num) {
  var tens_mapping = [['ninety', 90], ['eighty', 80], ['seventy', 70], ['sixty', 60], ['fifty', 50], ['forty', 40], ['thirty', 30], ['twenty', 20]];
  var ones_mapping = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  var arr = [];
  for (var i = 0; i < tens_mapping.length; i++) {
    if (num >= tens_mapping[i][1]) {
      num -= tens_mapping[i][1];
      arr.push(tens_mapping[i][0]);
    }
  }
  //(hopefully) we should only have 20-0 now
  if (ones_mapping[num]) {
    arr.push(ones_mapping[num]);
  }
  return arr;
};

/** print-out 'point eight nine'*/
var handle_decimal = function handle_decimal(num) {
  var names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  var arr = [];
  //parse it out like a string, because js math is such shit
  var decimal = ('' + num).match(/\.([0-9]+)/);
  if (!decimal || !decimal[0]) {
    return arr;
  }
  arr.push('point');
  var decimals = decimal[0].split('');
  for (var i = 0; i < decimals.length; i++) {
    arr.push(names[decimals[i]]);
  }
  return arr;
};

/** turns an integer into a textual number */
var to_text = function to_text(num) {
  var arr = [];
  //handle negative numbers
  if (num < 0) {
    arr.push('negative');
    num = Math.abs(num);
  }
  //break-down into units, counts
  var units = breakdown_magnitudes(num);
  //build-up the string from its components
  for (var i = 0; i < units.length; i++) {
    var unit_name = units[i].unit;
    if (unit_name === 'one') {
      unit_name = '';
      //put an 'and' in here
      if (arr.length > 1) {
        arr.push('and');
      }
    }
    arr = arr.concat(breakdown_hundred(units[i].count));
    arr.push(unit_name);
  }
  //also support decimals - 'point eight'
  arr = arr.concat(handle_decimal(num));
  //remove empties
  arr = arr.filter(function (s) {
    return s;
  });
  if (arr.length === 0) {
    arr[0] = 'zero';
  }
  return arr;
};

module.exports = to_text;

// console.log(to_text(-1000.8));

},{}],132:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var paths = _dereq_('../../paths');
var Terms = paths.Terms;
var parse = _dereq_('./toNumber');
var toText = _dereq_('./toText');
var _toNiceNumber = _dereq_('./toNiceNumber');
var numOrdinal = _dereq_('./numOrdinal');
var textOrdinal = _dereq_('./textOrdinal');

var isOrdinal = function isOrdinal(ts) {
  var t = ts.terms[ts.terms.length - 1];
  if (!t) {
    return false;
  }
  return t.tag.Ordinal === true;
};
var isText = function isText(ts) {
  for (var i = 0; i < ts.terms.length; i++) {
    if (ts.terms[i].tag.TextValue) {
      return true;
    }
  }
  return false;
};
var isNumber = function isNumber(ts) {
  for (var i = 0; i < ts.terms.length; i++) {
    var t = ts.terms[i];
    if (t.tag.TextValue || t.tag.NiceNumber || !t.tag.NumericValue) {
      return false;
    }
  }
  return true;
};

var Value = function (_Terms) {
  _inherits(Value, _Terms);

  function Value(arr, lexicon, refText, refTerms) {
    _classCallCheck(this, Value);

    var _this = _possibleConstructorReturn(this, (Value.__proto__ || Object.getPrototypeOf(Value)).call(this, arr, lexicon, refText, refTerms));

    _this.val = _this.match('#Value+').list[0];
    _this.unit = _this.match('#Unit$').list[0];
    return _this;
  }

  _createClass(Value, [{
    key: 'number',
    value: function number() {
      var num = parse(this.val);
      return num;
    }
    /** five -> '5' */

  }, {
    key: 'toNumber',
    value: function toNumber() {
      var val = this.val;
      // this.debug();
      //is already
      if (isNumber(val)) {
        return this;
      }
      //otherwise,
      if (isOrdinal(val)) {
        var num = numOrdinal(val);
        this.replaceWith(num, 'Value');
      } else {
        var _num = parse(val);
        // console.log(num);
        if (_num !== null) {
          this.replaceWith('' + _num, 'Value');
        }
      }
      return this;
    }
    /**5 -> 'five' */

  }, {
    key: 'toTextValue',
    value: function toTextValue() {
      var val = this.val;
      //is already
      if (isText(val)) {
        return this;
      }
      //otherwise, parse it
      if (isOrdinal(val)) {
        var _str = textOrdinal(val);
        return this.replaceWith(_str, 'Value');
      }
      var num = '' + parse(val);
      var str = toText(num).join(' ');
      this.replaceWith(str, 'Value');
      return this;
    }

    /**5th -> 5 */

  }, {
    key: 'toCardinal',
    value: function toCardinal() {
      var val = this.val;
      //already
      if (!isOrdinal(val)) {
        return this;
      }
      //otherwise,
      if (isText(val)) {
        var _num2 = '' + parse(val);
        var str = toText(_num2).join(' ');
        return this.replaceWith(str, 'Value');
      }
      var num = '' + parse(val);
      return this.replaceWith(num, 'Value');
    }

    /**5 -> 5th */

  }, {
    key: 'toOrdinal',
    value: function toOrdinal() {
      var val = this.val;
      //already
      if (isOrdinal(val)) {
        return this;
      }
      //otherwise,
      if (isText(val)) {
        var str = textOrdinal(val);
        this.replaceWith(str, 'Value');
      } else {
        //number-ordinal
        var _str2 = numOrdinal(val);
        this.replaceWith(_str2, 'Value');
      }
      return this;
    }

    /**5900 -> 5,900 */

  }, {
    key: 'toNiceNumber',
    value: function toNiceNumber() {
      var num = parse(this);
      var str = _toNiceNumber(num);
      this.replaceWith(str, 'Value');
      return this;
    }
  }, {
    key: 'data',
    value: function data() {
      var numV = this.clone().toNumber();
      var txtV = this.clone().toTextValue();
      var obj = {
        NumericValue: {
          cardinal: numV.toCardinal().out('text'),
          ordinal: numV.toOrdinal().out('text'),
          nicenumber: this.toNiceNumber().out('text')
        },
        TextValue: {
          cardinal: txtV.toCardinal().out('text'),
          ordinal: txtV.toOrdinal().out('text')
        },
        unit: ''
      };
      if (this.unit) {
        obj.unit = this.unit.out('text');
      }
      obj.number = this.number();
      return obj;
    }
  }]);

  return Value;
}(Terms);

Value.prototype.clone = function () {
  var terms = this.terms.map(function (t) {
    return t.clone();
  });
  return new Value(terms, this.lexicon, this.refText, this.refTerms);
};
module.exports = Value;

},{"../../paths":56,"./numOrdinal":121,"./textOrdinal":123,"./toNiceNumber":124,"./toNumber":127,"./toText":131}],133:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = _dereq_('../../index');
var Verb = _dereq_('./verb');

var Verbs = function (_Text) {
  _inherits(Verbs, _Text);

  function Verbs(arr, lexicon, reference) {
    _classCallCheck(this, Verbs);

    return _possibleConstructorReturn(this, (Verbs.__proto__ || Object.getPrototypeOf(Verbs)).call(this, arr, lexicon, reference));
  }

  _createClass(Verbs, [{
    key: 'data',
    value: function data() {
      return this.list.map(function (ts) {
        return ts.data();
      });
    }
  }, {
    key: 'conjugation',
    value: function conjugation(verbose) {
      return this.list.map(function (ts) {
        return ts.conjugation(verbose);
      });
    }
  }, {
    key: 'conjugate',
    value: function conjugate(verbose) {
      return this.list.map(function (ts) {
        return ts.conjugate(verbose);
      });
    }

    /** plural/singular **/

  }, {
    key: 'isPlural',
    value: function isPlural() {
      this.list = this.list.filter(function (ts) {
        return ts.isPlural();
      });
      return this;
    }
  }, {
    key: 'isSingular',
    value: function isSingular() {
      this.list = this.list.filter(function (ts) {
        return !ts.isPlural();
      });
      return this;
    }

    /** negation **/

  }, {
    key: 'isNegative',
    value: function isNegative() {
      this.list = this.list.filter(function (ts) {
        return ts.isNegative();
      });
      return this;
    }
  }, {
    key: 'isPositive',
    value: function isPositive() {
      this.list = this.list.filter(function (ts) {
        return !ts.isNegative();
      });
      return this;
    }
  }, {
    key: 'toNegative',
    value: function toNegative() {
      this.list = this.list.map(function (ts) {
        return ts.toNegative();
      });
      return this;
    }
  }, {
    key: 'toPositive',
    value: function toPositive() {
      this.list.forEach(function (ts) {
        ts.toPositive();
      });
      return this;
    }

    /** tense **/

  }, {
    key: 'toPastTense',
    value: function toPastTense() {
      this.list.forEach(function (ts) {
        ts.toPastTense();
      });
      return this;
    }
  }, {
    key: 'toPresentTense',
    value: function toPresentTense() {
      this.list.forEach(function (ts) {
        ts.toPresentTense();
      });
      return this;
    }
  }, {
    key: 'toFutureTense',
    value: function toFutureTense() {
      this.list.forEach(function (ts) {
        ts.toFutureTense();
      });
      return this;
    }
  }, {
    key: 'toInfinitive',
    value: function toInfinitive() {
      this.list.forEach(function (ts) {
        ts.toInfinitive();
      });
      return this;
    }
  }, {
    key: 'asAdjective',
    value: function asAdjective() {
      return this.list.map(function (ts) {
        return ts.asAdjective();
      });
    }
  }], [{
    key: 'find',
    value: function find(r, n) {
      r = r.match('(#Adverb|#Auxillary|#Verb|#Negative|#Particle)+')['if']('#Verb'); //this should be (much) smarter
      r = r.splitAfter('#Comma');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      r.list = r.list.map(function (ts) {
        return new Verb(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
      });
      return new Text(r.list, this.lexicon, this.parent);
    }
  }]);

  return Verbs;
}(Text);

module.exports = Verbs;

},{"../../index":44,"./verb":152}],134:[function(_dereq_,module,exports){
'use strict';

var predict = _dereq_('./methods/predict');

//'walking' - aka progressive
var isContinuous = function isContinuous(ts) {
  return ts.match('#Gerund').found;
};

//will not walk
var isNegative = function isNegative(ts) {
  var negs = ts.match('#Negative').list;
  if (negs.length === 2) {
    return false;
  }
  if (negs.length === 1) {
    return true;
  }
  return false;
};

//been walked by..
var isPassive = function isPassive(ts) {
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
var isPerfect = function isPerfect(ts) {
  if (ts.match('^(had|have) #PastTense')) {
    return true;
  }
  return false;
};

//should walk, could walk
var getModal = function getModal(ts) {
  var modal = ts.match('#Modal');
  if (!modal.found) {
    return null;
  }
  return modal.out('normal');
};

//past/present/future
var getTense = function getTense(ts) {
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
    var tenses = {
      PastTense: 'Past',
      FutureTense: 'Future',
      FuturePerfect: 'Future'
    };
    var tense = predict(ts.verb); //yikes
    return tenses[tense] || 'Present';
  }
  return 'Present';
};

// const isImperative = function(ts) {};
// const isConditional = function(ts) {};

// detect signals in auxillary verbs
// 'will' -> future, 'have'->perfect, modals, negatives, adverbs
var interpret = function interpret(ts) {
  var isNeg = isNegative(ts);
  // let aux = ts.auxillary.clone();
  // aux = aux.not('(#Negative|#Adverb)');
  var obj = {
    negative: isNeg,
    continuous: isContinuous(ts),
    passive: isPassive(ts),
    perfect: isPerfect(ts),
    modal: getModal(ts),
    tense: getTense(ts)
  };
  return obj;
};
module.exports = interpret;

},{"./methods/predict":146}],135:[function(_dereq_,module,exports){
'use strict';

var checkIrregulars = _dereq_('./irregulars');
var suffixPass = _dereq_('./suffixes');
var toActor = _dereq_('./toActor');
var toAdjective = _dereq_('./toAdjective');
var generic = _dereq_('./generic');
var predict = _dereq_('../predict');
var toInfinitive = _dereq_('../toInfinitive');
var toBe = _dereq_('./toBe');

//turn a verb into all it's forms
var conjugate = function conjugate(t, verbose) {

  //handle is/was/will-be specially
  if (t.normal === 'is' || t.normal === 'was' || t.normal === 'will') {
    return toBe();
  }

  //dont conjugate didn't
  if (t.tag.Contraction) {
    t.text = t.silent_term;
  }
  var all = {
    PastTense: null,
    PresentTense: null,
    // FutureTense: null,
    Infinitive: null,
    Gerund: null,
    Actor: null
  };
  //first, get its current form
  var form = predict(t);
  if (form) {
    all[form] = t.normal;
  }
  if (form !== 'Infinitive') {
    all['Infinitive'] = toInfinitive(t, verbose) || '';
  }
  //check irregular forms
  var irregObj = checkIrregulars(all['Infinitive']) || {};
  Object.keys(irregObj).forEach(function (k) {
    if (irregObj[k] && !all[k]) {
      all[k] = irregObj[k];
    }
  });
  //ok, send this infinitive to all conjugators
  var inf = all['Infinitive'] || t.normal;

  //check suffix rules
  var suffObj = suffixPass(inf);
  Object.keys(suffObj).forEach(function (k) {
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
  Object.keys(all).forEach(function (k) {
    if (!all[k] && generic[k]) {
      all[k] = generic[k](all);
    }
  });

  return all;
};

module.exports = conjugate;

},{"../predict":146,"../toInfinitive":149,"./generic":138,"./irregulars":140,"./suffixes":141,"./toActor":142,"./toAdjective":143,"./toBe":144}],136:[function(_dereq_,module,exports){
'use strict';

module.exports = [{
  reg: /(eave)$/i,
  repl: {
    pr: '$1s',
    pa: '$1d',
    gr: 'eaving',
    ar: '$1r'
  }
}, {
  reg: /(ink)$/i,
  repl: {
    pr: '$1s',
    pa: 'unk',
    gr: '$1ing',
    ar: '$1er'
  }
}, {
  reg: /(end)$/i,
  repl: {
    pr: '$1s',
    pa: 'ent',
    gr: '$1ing',
    ar: '$1er'
  }
}, {
  reg: /(ide)$/i,
  repl: {
    pr: '$1s',
    pa: 'ode',
    gr: 'iding',
    ar: 'ider'
  }
}, {
  reg: /(ake)$/i,
  repl: {
    pr: '$1s',
    pa: 'ook',
    gr: 'aking',
    ar: '$1r'
  }
}, {
  reg: /(eed)$/i,
  repl: {
    pr: '$1s',
    pa: '$1ed',
    gr: '$1ing',
    ar: '$1er'
  }
}, {
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
  }
}, {
  reg: /(..)(ow)$/i,
  repl: {
    pr: '$1$2s',
    pa: '$1ew',
    gr: '$1$2ing',
    prt: '$1$2n'
  }
}, {
  reg: /(..)([cs]h)$/i,
  repl: {
    pr: '$1$2es',
    pa: '$1$2ed',
    gr: '$1$2ing'
  }
}, {
  reg: /([^aeiou][ou])(g|d)$/i,
  repl: {
    pr: '$1$2s',
    pa: '$1$2$2ed',
    gr: '$1$2$2ing'
  }
}, {
  reg: /([^aeiou][aeiou])(b|t|p|m)$/i,
  repl: {
    pr: '$1$2s',
    pa: '$1$2$2ed',
    gr: '$1$2$2ing'
  }
}, {
  reg: /([aeiou]zz)$/i,
  repl: {
    pr: '$1es',
    pa: '$1ed',
    gr: '$1ing'
  }
}];

},{}],137:[function(_dereq_,module,exports){
'use strict';

var checkIrregulars = _dereq_('./irregulars');
var suffixPass = _dereq_('./suffixes');
var generic = _dereq_('./generic');
//this method is the same as regular conjugate, but optimised for use in the lexicon during warm-up.
//it's way faster because it knows input is already infinitive

var want = ['Gerund', 'PastTense', 'PresentTense'];

var fasterConjugate = function fasterConjugate(inf) {
  var all = {
    Infinitive: inf
  };
  var irregObj = checkIrregulars(all['Infinitive']);
  if (irregObj !== null) {
    Object.keys(irregObj).forEach(function (k) {
      if (irregObj[k] && !all[k]) {
        all[k] = irregObj[k];
      }
    });
  }
  //check suffix rules
  var suffObj = suffixPass(inf);
  Object.keys(suffObj).forEach(function (k) {
    if (suffObj[k] && !all[k]) {
      all[k] = suffObj[k];
    }
  });
  for (var i = 0; i < want.length; i++) {
    if (!all[want[i]]) {
      all[want[i]] = generic[want[i]](all);
    }
  }
  return all;
};
module.exports = fasterConjugate;
// console.log(fasterConjugate('walk'));

},{"./generic":138,"./irregulars":140,"./suffixes":141}],138:[function(_dereq_,module,exports){
'use strict';
//non-specifc, 'hail-mary' transforms from infinitive, into other forms

var fns = _dereq_('../../../../../fns'); //jaja!

var generic = {

  Gerund: function Gerund(o) {
    var inf = o.Infinitive;
    if (fns.endsWith(inf, 'e')) {
      return inf.replace(/e$/, 'ing');
    }
    return inf + 'ing';
  },

  PresentTense: function PresentTense(o) {
    var inf = o.Infinitive;
    if (fns.endsWith(inf, 's')) {
      return inf + 'es';
    }
    if (inf.match(/[bcdfghjklmnpqrstvwxz]y$/)) {
      return inf.slice(0, -1) + 'ies';
    }
    return inf + 's';
  },

  PastTense: function PastTense(o) {
    var inf = o.Infinitive;
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
  }

};

module.exports = generic;

},{"../../../../../fns":40}],139:[function(_dereq_,module,exports){
'use strict';

var conjugate = _dereq_('./conjugate');
var toBe = _dereq_('./toBe');

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
var multiWord = function multiWord(vb, verbose) {
  var isNegative = vb.negative.found;
  var isPlural = false;
  //handle 'to be' verb seperately
  if (vb.verb.tag.Copula || vb.verb.normal === 'be' && vb.auxillary.match('will').found) {
    return toBe(isPlural, isNegative);
  }

  var obj = conjugate(vb.verb, verbose);
  //apply particles
  if (vb.particle.found) {
    Object.keys(obj).forEach(function (k) {
      obj[k] = obj[k] + vb.particle.out();
    });
  }
  //apply adverbs
  if (vb.adverbs.found) {
    Object.keys(obj).forEach(function (k) {
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

},{"./conjugate":135,"./toBe":144}],140:[function(_dereq_,module,exports){
'use strict';

var irregulars = _dereq_('../../../../../data').irregular_verbs; //weeee!
var fns = _dereq_('../../../../../fns'); //weeee!
var infArr = Object.keys(irregulars);
var forms = ['Participle', 'Gerund', 'PastTense', 'PresentTense', 'FuturePerfect', 'PerfectTense', 'Actor'];

var checkIrregulars = function checkIrregulars(str) {
  //fast infinitive lookup
  if (irregulars[str] !== undefined) {
    var obj = fns.copy(irregulars[str]);
    obj.Infinitive = str;
    return obj;
  }
  //longer check of known-verb forms
  for (var i = 0; i < infArr.length; i++) {
    for (var o = 0; o < forms.length; o++) {
      var irObj = irregulars[infArr[i]];
      if (irObj[forms[o]] === str) {
        var _obj = fns.copy(irObj);
        _obj.Infinitive = infArr[i];
        return _obj;
      }
    }
  }
  return {};
};

module.exports = checkIrregulars;
// console.log(checkIrregulars('bit'));

},{"../../../../../data":8,"../../../../../fns":40}],141:[function(_dereq_,module,exports){
'use strict';

var rules = _dereq_('./data/rules');
var mapping = {
  pr: 'PresentTense',
  pa: 'PastTense',
  gr: 'Gerund',
  prt: 'Participle',
  ar: 'Actor'
};
var keys = Object.keys(mapping);

//check suffix rules
var suffixPass = function suffixPass(inf) {
  var found = {};
  for (var i = 0; i < rules.length; i++) {
    if (inf.match(rules[i].reg)) {
      var obj = rules[i].repl;
      for (var o = 0; o < keys.length; o++) {
        if (obj[keys[o]]) {
          var key = mapping[keys[o]];
          found[key] = inf.replace(rules[i].reg, obj[keys[o]]);
        }
      }
      return found;
    }
  }
  return found;
};

module.exports = suffixPass;

},{"./data/rules":136}],142:[function(_dereq_,module,exports){
'use strict';
//turn 'walk' into 'walker'

var irregulars = {
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
var dont = {
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
var rules = [{
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

var toActor = function toActor(inf) {
  //check blacklist
  if (dont[inf]) {
    return null;
  }
  //check irregulars
  if (irregulars[inf]) {
    return irregulars[inf];
  }
  //try rules
  for (var i = 0; i < rules.length; i++) {
    if (inf.match(rules[i].reg)) {
      return inf.replace(rules[i].reg, rules[i].repl);
    }
  }
  //yup,
  return inf + 'er';
};

module.exports = toActor;

},{}],143:[function(_dereq_,module,exports){
'use strict';
//turn a infinitiveVerb, like "walk" into an adjective like "walkable"

var rules = [[/[^aeiou]y$/, 'i'], //relay - reliable
[/([aeiou][n])$/, '$1n']];

//convert - 'convertible'
//http://grammarist.com/usage/able-ible/
//http://blog.oxforddictionaries.com/2012/10/ibles-and-ables/
var ible_suffixes = {
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

var irregulars = {
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
var toAdjective = function toAdjective(str) {
  if (irregulars[str]) {
    return irregulars[str];
  }
  for (var i = 0; i < rules.length; i++) {
    if (str.match(rules[i][0])) {
      str = str.replace(rules[i][0], rules[i][1]);
    }
  }
  var adj = str + 'able';
  if (ible_suffixes[str]) {
    adj = str + 'ible';
  }
  return adj;
};

module.exports = toAdjective;
// console.log(toAdjective('buy'));

},{}],144:[function(_dereq_,module,exports){
'use strict';
//too many special cases for is/was/will be

var toBe = function toBe(isPlural, isNegative) {
  var obj = {
    PastTense: 'was',
    PresentTense: 'is',
    FutureTense: 'will be',
    Infinitive: 'is',
    Gerund: 'being',
    Actor: '',
    PerfectTense: 'been',
    Pluperfect: 'been'
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

},{}],145:[function(_dereq_,module,exports){
'use strict';
//sometimes you can tell if a verb is plural/singular, just by the verb
// i am / we were
//othertimes you need its noun 'we walk' vs 'i walk'

var isPlural = function isPlural(vb) {
  if (vb.match('(are|were|does)').found) {
    return true;
  }
  if (vb.match('(is|am|do|was)').found) {
    return false;
  }
  //consider its prior noun
  var noun = vb.getNoun();
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

},{}],146:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../../../../../fns'); //jaja!
var suffix_rules = _dereq_('./suffix_rules');

var goodTypes = {
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

var predictForm = function predictForm(term, verbose) {
  //do we already know the form?
  var keys = Object.keys(goodTypes);
  for (var i = 0; i < keys.length; i++) {
    if (term.tag[keys[i]]) {
      if (verbose) {
        console.log('predicted ' + keys[i] + ' from pos', path);
      }
      return keys[i];
    }
  }
  //consult our handy suffix rules
  var arr = Object.keys(suffix_rules);
  for (var _i = 0; _i < arr.length; _i++) {
    if (fns.endsWith(term.normal, arr[_i]) && arr[_i].length < term.normal.length) {
      if (verbose) {
        var msg = 'predicted ' + suffix_rules[arr[_i]] + ' from suffix ' + arr[_i];
        console.log(msg, path);
      }
      return suffix_rules[arr[_i]];
    }
  }
  return null;
};

module.exports = predictForm;

},{"../../../../../fns":40,"./suffix_rules":147}],147:[function(_dereq_,module,exports){
'use strict';
//suffix signals for verb tense, generated from test data

var compact = {
  'Gerund': ['ing'],
  'Actor': ['erer'],
  'Infinitive': ['ate', 'ize', 'tion', 'rify', 'then', 'ress', 'ify', 'age', 'nce', 'ect', 'ise', 'ine', 'ish', 'ace', 'ash', 'ure', 'tch', 'end', 'ack', 'and', 'ute', 'ade', 'ock', 'ite', 'ase', 'ose', 'use', 'ive', 'int', 'nge', 'lay', 'est', 'ain', 'ant', 'ent', 'eed', 'er', 'le', 'own', 'unk', 'ung', 'en'],
  'PastTense': ['ed', 'lt', 'nt', 'pt', 'ew', 'ld'],
  'PresentTense': ['rks', 'cks', 'nks', 'ngs', 'mps', 'tes', 'zes', 'ers', 'les', 'acks', 'ends', 'ands', 'ocks', 'lays', 'eads', 'lls', 'els', 'ils', 'ows', 'nds', 'ays', 'ams', 'ars', 'ops', 'ffs', 'als', 'urs', 'lds', 'ews', 'ips', 'es', 'ts', 'ns', 's']
};
var suffix_rules = {};
var keys = Object.keys(compact);
var l = keys.length;

for (var i = 0; i < l; i++) {
  var l2 = compact[keys[i]].length;
  for (var o = 0; o < l2; o++) {
    suffix_rules[compact[keys[i]][o]] = keys[i];
  }
}
module.exports = suffix_rules;

},{}],148:[function(_dereq_,module,exports){
'use strict';
//turn a infinitiveVerb, like "walk" into an adjective like "walkable"

var rules = [[/y$/, 'i'], //relay - reliable
[/([aeiou][n])$/, '$1n']];

//convert - 'convertible'
//http://grammarist.com/usage/able-ible/
//http://blog.oxforddictionaries.com/2012/10/ibles-and-ables/
var ible_suffixes = {
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

var irregulars = {
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
var toAdjective = function toAdjective(str) {
  if (irregulars[str]) {
    return irregulars[str];
  }
  for (var i = 0; i < rules.length; i++) {
    if (str.match(rules[i][0])) {
      str = str.replace(rules[i][0], rules[i][1]);
    }
  }
  var adj = str + 'able';
  if (ible_suffixes[str]) {
    adj = str + 'ible';
  }
  return adj;
};

module.exports = toAdjective;

},{}],149:[function(_dereq_,module,exports){
'use strict';
//turn any verb into its infinitive form

var rules = _dereq_('./rules');
var irregulars = _dereq_('../../../../../data').irregular_verbs;
var predict = _dereq_('../predict');

//map the irregulars for easy infinitive lookup
// {bought: 'buy'}
var verb_mapping = function verb_mapping() {
  return Object.keys(irregulars).reduce(function (h, k) {
    Object.keys(irregulars[k]).forEach(function (pos) {
      h[irregulars[k][pos]] = k;
    });
    return h;
  }, {});
};

irregulars = verb_mapping();

var toInfinitive = function toInfinitive(t) {
  if (t.tag.Infinitive) {
    return t.normal;
  }
  //check the irregular verb conjugations
  if (irregulars[t.normal]) {
    return irregulars[t.normal];
  }
  //check the suffix rules
  var form = predict(t);
  if (rules[form]) {
    for (var i = 0; i < rules[form].length; i++) {
      var rule = rules[form][i];
      if (t.normal.match(rule.reg)) {
        return t.normal.replace(rule.reg, rule.to);
      }
    }
  }
  return t.normal;
};

module.exports = toInfinitive;

},{"../../../../../data":8,"../predict":146,"./rules":150}],150:[function(_dereq_,module,exports){
'use strict';
//rules for turning a verb into infinitive form

var rules = {
  Participle: [{
    reg: /own$/i,
    to: 'ow'
  }, {
    reg: /(.)un([g|k])$/i,
    to: '$1in$2'
  }],
  Actor: [{
    reg: /(er)er$/i,
    to: '$1'
  }],
  PresentTense: [{
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
  Gerund: [{
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
  PastTense: [{
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

},{}],151:[function(_dereq_,module,exports){
'use strict';
//turns a verb negative - may not have enough information to do it properly
// (eg 'did not eat' vs 'does not eat') - needs the noun

var toInfinitive = _dereq_('./methods/toInfinitive');

var toNegative = function toNegative(ts) {
  //would not walk
  var modal = ts.match('#Auxillary').first(); //.notIf('(is|are|was|will|has|had)').first(); //.first();
  if (modal.found) {
    var index = modal.list[0].index();
    return ts.parentTerms.insertAt(index + 1, 'not', 'Verb');
  }

  //words that pair easily with a 'not' - 'is not'
  var copula = ts.match('(#Copula|will|has|had|do)').first();
  if (copula.found) {
    var _index = copula.list[0].index();
    return ts.parentTerms.insertAt(_index + 1, 'not', 'Verb');
  }

  var isPlural = ts.isPlural();

  //walked -> did not walk
  var past = ts.match('#PastTense').last();
  if (past.found) {
    var _vb = past.list[0];
    var _index2 = _vb.index();
    _vb.terms[0].text = toInfinitive(_vb.terms[0]);
    if (isPlural) {
      return ts.parentTerms.insertAt(_index2, 'do not', 'Verb');
    }
    return ts.parentTerms.insertAt(_index2, 'did not', 'Verb');
  }

  //walks -> does not walk
  var pres = ts.match('#PresentTense').first();
  if (pres.found) {
    var _vb2 = pres.list[0];
    var _index3 = _vb2.index();
    _vb2.terms[0].text = toInfinitive(_vb2.terms[0]);
    //some things use 'do not', everything else is 'does not'
    var noun = ts.getNoun();
    if (noun.match('(i|we|they|you)').found) {
      return ts.parentTerms.insertAt(_index3, 'do not', 'Verb');
    }
    return ts.parentTerms.insertAt(_index3, 'does not', 'Verb');
  }

  //not walking
  var gerund = ts.match('#Gerund').last();
  if (gerund.found) {
    var _index4 = gerund.list[0].index();
    return ts.parentTerms.insertAt(_index4, 'not', 'Verb');
  }

  //walk -> do not walk
  var vb = ts.match('#Verb').last();
  if (vb.found) {
    vb = vb.list[0];
    var _index5 = vb.index();
    vb.terms[0].text = toInfinitive(vb.terms[0]);
    if (isPlural) {
      return ts.parentTerms.insertAt(_index5, 'does not', 'Verb');
    }
    return ts.parentTerms.insertAt(_index5, 'did not', 'Verb');
  }

  return ts;
};
module.exports = toNegative;

},{"./methods/toInfinitive":149}],152:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Terms = _dereq_('../../paths').Terms;
var _conjugate = _dereq_('./methods/conjugate');
var toAdjective = _dereq_('./methods/toAdjective');
var interpret = _dereq_('./interpret');
var _toNegative = _dereq_('./toNegative');
var _isPlural = _dereq_('./methods/isPlural');

var Verb = function (_Terms) {
  _inherits(Verb, _Terms);

  function Verb(arr, lexicon, refText, refTerms) {
    _classCallCheck(this, Verb);

    var _this = _possibleConstructorReturn(this, (Verb.__proto__ || Object.getPrototypeOf(Verb)).call(this, arr, lexicon, refText, refTerms));

    _this.parse();
    return _this;
  }

  _createClass(Verb, [{
    key: 'parse',
    value: function parse() {
      this.negative = this.match('#Negative');
      this.adverbs = this.match('#Adverb');
      var aux = this.clone().not('(#Adverb|#Negative)');
      this.verb = aux.match('#Verb').not('#Particle').last();
      this.particle = aux.match('#Particle').last();
      if (this.verb.found) {
        this.verb = this.verb.list[0].terms[0];
      }
      this.auxillary = aux.match('#Auxillary+');
    }
  }, {
    key: 'data',
    value: function data(verbose) {
      return {
        text: this.out('text'),
        normal: this.out('normal'),
        parts: {
          negative: this.negative.out('normal'),
          auxillary: this.auxillary.out('normal'),
          verb: this.verb.out('normal'),
          adverbs: this.adverbs.out('normal')
        },
        interpret: interpret(this, verbose),
        conjugations: this.conjugate()
      };
    }
  }, {
    key: 'getNoun',
    value: function getNoun() {
      if (!this.refTerms) {
        return null;
      }
      var str = '#Adjective? #Noun+ ' + this.out('normal');
      return this.refTerms.match(str).match('#Noun+');
    }
    //which conjugation is this right now?

  }, {
    key: 'conjugation',
    value: function conjugation() {
      return interpret(this, false).tense;
    }
    //blast-out all forms

  }, {
    key: 'conjugate',
    value: function conjugate(verbose) {
      return _conjugate(this, verbose);
    }
  }, {
    key: 'isPlural',
    value: function isPlural() {
      return _isPlural(this);
    }
    /** negation **/

  }, {
    key: 'isNegative',
    value: function isNegative() {
      return this.match('#Negative').list.length === 1;
    }
  }, {
    key: 'isPerfect',
    value: function isPerfect() {
      return this.auxillary.match('(have|had)').found;
    }
  }, {
    key: 'toNegative',
    value: function toNegative() {
      if (this.isNegative()) {
        return this;
      }
      return _toNegative(this);
    }
  }, {
    key: 'toPositive',
    value: function toPositive() {
      return this.match('#Negative')['delete']();
    }

    /** conjugation **/

  }, {
    key: 'toPastTense',
    value: function toPastTense() {
      var obj = this.conjugate();
      return this.replaceWith(obj.PastTense);
    }
  }, {
    key: 'toPresentTense',
    value: function toPresentTense() {
      var obj = this.conjugate();
      return this.replaceWith(obj.PresentTense);
    }
  }, {
    key: 'toFutureTense',
    value: function toFutureTense() {
      var obj = this.conjugate();
      return this.replaceWith(obj.FutureTense);
    }
  }, {
    key: 'toInfinitive',
    value: function toInfinitive() {
      var obj = this.conjugate();
      //NOT GOOD. please fix
      this.terms[this.terms.length - 1].text = obj.Infinitive;
      return this;
    }
  }, {
    key: 'asAdjective',
    value: function asAdjective() {
      return toAdjective(this.verb.out('normal'));
    }
  }]);

  return Verb;
}(Terms);

module.exports = Verb;

},{"../../paths":56,"./interpret":134,"./methods/conjugate":139,"./methods/isPlural":145,"./methods/toAdjective":148,"./toNegative":151}],153:[function(_dereq_,module,exports){
//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2015 MIT
'use strict';

var fns = _dereq_('./paths').fns;
var data = _dereq_('../data/index');
var abbreviations = Object.keys(data.abbreviations);

var naiive_split = function naiive_split(text) {
  //first, split by newline
  var splits = text.split(/(\n+)/);
  //split by period, question-mark, and exclamation-mark
  splits = splits.map(function (str) {
    return str.split(/(\S.+?[.!?])(?=\s+|$)/g);
  });
  return fns.flatten(splits);
};

var sentence_parser = function sentence_parser(text) {
  var sentences = [];
  text = fns.ensureString(text);
  //first do a greedy-split..
  var chunks = [];
  //ensure it 'smells like' a sentence
  if (!text || typeof text !== 'string' || !text.match(/\S/)) {
    return sentences;
  }
  // This was the splitter regex updated to fix quoted punctuation marks.
  // let splits = text.split(/(\S.+?[.\?!])(?=\s+|$|")/g);
  // todo: look for side effects in this regex replacement:
  var splits = naiive_split(text);
  //filter-out the grap ones
  for (var i = 0; i < splits.length; i++) {
    var s = splits[i];
    if (!s || s === '') {
      continue;
    }
    //this is meaningful whitespace
    if (!s.match(/\S/)) {
      //add it to the last one
      if (chunks[chunks.length - 1]) {
        chunks[chunks.length - 1] += s;
        continue;
      } else if (splits[i + 1]) {
        //add it to the next one
        splits[i + 1] = s + splits[i + 1];
        continue;
      }
      //else, only whitespace, no terms, no sentence
    }
    chunks.push(s);
  }

  //detection of non-sentence chunks
  var abbrev_reg = new RegExp('\\b(' + abbreviations.join('|') + ')[.!?] ?$', 'i');
  var acronym_reg = new RegExp('[ |\.][A-Z]\.?( *)?$', 'i');
  var elipses_reg = new RegExp('\\.\\.+( +)?$');
  //loop through these chunks, and join the non-sentence chunks back together..
  for (var _i = 0; _i < chunks.length; _i++) {
    //should this chunk be combined with the next one?
    if (chunks[_i + 1] && (chunks[_i].match(abbrev_reg) || chunks[_i].match(acronym_reg) || chunks[_i].match(elipses_reg))) {
      chunks[_i + 1] = chunks[_i] + (chunks[_i + 1] || '');
    } else if (chunks[_i] && chunks[_i].length > 0) {
      //this chunk is a proper sentence..
      sentences.push(chunks[_i]);
      chunks[_i] = '';
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

},{"../data/index":8,"./paths":56}],154:[function(_dereq_,module,exports){
'use strict';

//used for pretty-printing on the server-side
var colors = {
  blue: ['Noun', 'Plural', 'Singular', 'Pronoun', 'Possessive', 'Place', 'Person', 'City'],
  red: ['Value', 'Ordinal', 'Cardinal', 'TextValue', 'NumericValue'],
  green: ['Verb', 'Auxillary', 'Negative', 'PastTense', 'PresentTense', 'FutureTense', 'Modal', 'Infinitive', 'Gerund', 'Copula', 'Participle'],
  cyan: ['Preposition', 'Conjunction', 'Determiner'],
  black: ['Adjective', 'Adverb']
};
module.exports = Object.keys(colors).reduce(function (h, c) {
  colors[c].forEach(function (str) {
    h[str] = c;
  });
  return h;
}, {});

},{}],155:[function(_dereq_,module,exports){
'use strict';

//list of inconsistent parts-of-speech

var conflicts = [
//top-level pos are all inconsistent
['Noun', 'Verb', 'Adjective', 'Adverb', 'Determiner', 'Conjunction', 'Preposition', 'QuestionWord', 'Expression', 'Url', 'PhoneNumber', 'Email', 'Emoji'],
//exlusive-nouns
['Person', 'Organization', 'Value', 'Place', 'Actor', 'Demonym', 'Pronoun'],
//things that can't be plural
['Plural', 'Singular'],
// ['Plural', 'Pronoun'],
['Plural', 'Person'], ['Plural', 'Organization'], ['Plural', 'Currency'], ['Plural', 'Ordinal'],
//exlusive-people
['MaleName', 'FemaleName'], ['FirstName', 'LastName', 'Honorific'],
//adjectives
['Comparative', 'Superlative'],
//values
['Value', 'Verb', 'Adjective'],
// ['Value', 'Year'],
['Ordinal', 'Cardinal'], ['TextValue', 'NumericValue'], ['NiceNumber', 'TextValue'], ['Ordinal', 'Currency'], //$5.50th
//verbs
['PastTense', 'PerfectTense', 'Pluperfect', 'FuturePerfect', 'Copula', 'Modal', 'Participle', 'Infinitive', 'Gerund'],
//date
['Month', 'WeekDay', 'Year', 'Duration'], ['Particle', 'Conjunction', 'Adverb', 'Preposition'], ['Date', 'Verb', 'Adjective', 'Person'],
//phrases
['NounPhrase', 'VerbPhrase', 'AdjectivePhrase', 'ConditionalPhrase'],
//a/an -> 1
['Value', 'Determiner'], ['Verb', 'NounPhrase'], ['Noun', 'VerbPhrase'],
//roman numerals
['RomanNumeral', 'Fraction', 'NiceNumber'], ['RomanNumeral', 'Money'],
//cases
['UpperCase', 'TitleCase', 'CamelCase']];

var find = function find(tag) {
  var arr = [];
  for (var i = 0; i < conflicts.length; i++) {
    if (conflicts[i].indexOf(tag) !== -1) {
      arr = arr.concat(conflicts[i]);
    }
  }
  return arr.filter(function (t) {
    return t !== tag;
  });
};

module.exports = find;

// console.log(find('Person'));

},{}],156:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var conflicts = _dereq_('./conflicts');
var tree = _dereq_('./tree');

var extra = {
  Month: 'Singular',
  // Year: 'Noun',
  Time: 'Noun',
  WeekDay: 'Noun',
  Duration: 'Noun',
  NumberRange: 'Contraction'
};

var all_children = function all_children(obj) {
  if (obj === true) {
    return [];
  }
  var children = Object.keys(obj || {});
  //two levels deep
  children.forEach(function (str) {
    if (_typeof(obj[str]) === 'object') {
      var kids = Object.keys(obj[str]);
      kids.forEach(function (gc) {
        if (_typeof(obj[str][gc]) === 'object') {
          var grandkids = Object.keys(obj[str][gc]);
          children = children.concat(grandkids);
        }
      });
      children = children.concat(kids);
    }
  });
  return children;
};

var build = function build() {
  //make tags
  var all = {};
  //recursively add them
  var add_tags = function add_tags(obj, is) {
    Object.keys(obj).forEach(function (k) {
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
  Object.keys(all).forEach(function (tag) {
    if (extra[tag]) {
      all[tag].parents.push(extra[tag]);
    }
  });

  //add conflicts
  Object.keys(all).forEach(function (tag) {
    all[tag].not = conflicts(tag);
    var parents = all[tag].parents;
    for (var i = 0; i < parents.length; i++) {
      var alsoNot = conflicts(parents[i]);
      all[tag].not = all[tag].not.concat(alsoNot);
    }
  });

  return all;
};

module.exports = build();

},{"./conflicts":155,"./tree":157}],157:[function(_dereq_,module,exports){
"use strict";

//the POS tags we use, according to their dependencies
//(dont make it too deep, cause fns aren't properly clever-enough)
module.exports = {
  Noun: {
    Singular: {
      Person: {
        FirstName: {
          MaleName: true,
          FemaleName: true
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
        School: true
      }
    },
    Plural: true,
    Pronoun: true,
    Actor: true,
    Unit: true,
    Demonym: true,
    Possessive: true
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
      RomanNumeral: true
    },
    Fraction: true,
    TextValue: true,
    NumericValue: true,
    NiceNumber: true,
    Money: true,
    NumberRange: true
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
  Quotation: true
};

},{}],158:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fns = _dereq_('./paths').fns;
var build_whitespace = _dereq_('./whitespace');
var makeUID = _dereq_('./makeUID');

var Term = function () {
  function Term(str) {
    _classCallCheck(this, Term);

    this._text = fns.ensureString(str);
    this.tag = {};
    //seperate whitespace from the text
    var parsed = build_whitespace(this._text);
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

  _createClass(Term, [{
    key: 'index',

    /** where in the sentence is it? zero-based. */
    value: function index() {
      var ts = this.parentTerms;
      if (!ts) {
        return null;
      }
      return ts.terms.indexOf(this);
    }
    /** make a copy with no references to the original  */

  }, {
    key: 'clone',
    value: function clone() {
      var term = new Term(this._text, null);
      term.tag = fns.copy(this.tag);
      term.whitespace = fns.copy(this.whitespace);
      term.silent_term = this.silent_term;
      return term;
    }
  }, {
    key: 'text',
    set: function set(str) {
      str = str || '';
      this._text = str.trim();
      this.dirty = true;
      if (this._text !== str) {
        this.whitespace = build_whitespace(str);
      }
      this.normalize();
    },
    get: function get() {
      return this._text;
    }
  }, {
    key: 'isA',
    get: function get() {
      return 'Term';
    }
  }]);

  return Term;
}();

Term = _dereq_('./methods/normalize')(Term);
Term = _dereq_('./methods/isA')(Term);
Term = _dereq_('./methods/out')(Term);
Term = _dereq_('./methods/tag')(Term);
Term = _dereq_('./methods/case')(Term);
Term = _dereq_('./methods/punctuation')(Term);

module.exports = Term;

},{"./makeUID":159,"./methods/case":160,"./methods/isA":161,"./methods/normalize":162,"./methods/out":166,"./methods/punctuation":168,"./methods/tag":169,"./paths":173,"./whitespace":174}],159:[function(_dereq_,module,exports){
'use strict';
//this is a not-well-thought-out way to reduce our dependence on `object===object` reference stuff
//generates a unique id for this term
//may need to change when the term really-transforms? not sure.

var uid = function uid(str) {
  var nums = '';
  for (var i = 0; i < 5; i++) {
    nums += parseInt(Math.random() * 9, 10);
  }
  return str + '-' + nums;
};
module.exports = uid;

},{}],160:[function(_dereq_,module,exports){
'use strict';

var addMethods = function addMethods(Term) {

  var methods = {
    toUpperCase: function toUpperCase() {
      this.text = this.text.toUpperCase();
      this.tagAs('#UpperCase', 'toUpperCase');
      return this;
    },
    toLowerCase: function toLowerCase() {
      this.text = this.text.toLowerCase();
      this.unTag('#TitleCase');
      this.unTag('#UpperCase');
      return this;
    },
    toTitleCase: function toTitleCase() {
      this.text = this.text.replace(/^[a-z]/, function (x) {
        return x.toUpperCase();
      });
      this.tagAs('#TitleCase', 'toTitleCase');
      return this;
    },
    //(camelCase() is handled in `./terms` )

    /** is it titlecased because it deserves it? Like a person's name? */
    needsTitleCase: function needsTitleCase() {
      var titleCases = ['Person', 'Place', 'Organization', 'Acronym', 'UpperCase', 'Currency', 'RomanNumeral', 'Month', 'WeekDay', 'Holiday', 'Demonym'];
      for (var i = 0; i < titleCases.length; i++) {
        if (this.tag[titleCases[i]]) {
          return true;
        }
      }
      //specific words that keep their titlecase
      //https://en.wikipedia.org/wiki/Capitonym
      var irregulars = ['i', 'god', 'allah'];
      for (var _i = 0; _i < irregulars.length; _i++) {
        if (this.normal === irregulars[_i]) {
          return true;
        }
      }
      return false;
    }
  };
  //hook them into result.proto
  Object.keys(methods).forEach(function (k) {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;

},{}],161:[function(_dereq_,module,exports){
'use strict';

var addMethods = function addMethods(Term) {

  var methods = {
    /** does it appear to be an acronym, like FBI or M.L.B. */
    isAcronym: function isAcronym() {
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
    isWord: function isWord() {
      var t = this;
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
  Object.keys(methods).forEach(function (k) {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;

},{}],162:[function(_dereq_,module,exports){
'use strict';

var addNormal = _dereq_('./normalize').addNormal;
var addRoot = _dereq_('./root');

var addMethods = function addMethods(Term) {

  var methods = {
    normalize: function normalize() {
      addNormal(this);
      addRoot(this);
      return this;
    }
  };
  //hook them into result.proto
  Object.keys(methods).forEach(function (k) {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;

},{"./normalize":163,"./root":164}],163:[function(_dereq_,module,exports){
'use strict';

var killUnicode = _dereq_('./unicode');

//some basic operations on a string to reduce noise
exports.normalize = function (str) {
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
  str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036"]+/g, '');
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
  var str = term._text || '';
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

},{"./unicode":165}],164:[function(_dereq_,module,exports){
'use strict';
//

var rootForm = function rootForm(term) {
  var str = term.normal || term.silent_term || '';
  //plural
  // if (term.tag.Plural) {
  // str = term.nouns().toSingular().normal || str;
  // }
  str = str.replace(/'s\b/, '');
  str = str.replace(/'\b/, '');
  term.root = str;
};

module.exports = rootForm;

},{}],165:[function(_dereq_,module,exports){
'use strict';
//a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
//approximate visual (not semantic or phonetic) relationship between unicode and ascii characters
//http://en.wikipedia.org/wiki/List_of_Unicode_characters
//https://docs.google.com/spreadsheet/ccc?key=0Ah46z755j7cVdFRDM1A2YVpwa1ZYWlpJM2pQZ003M0E

var compact = {
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
var unicode = {};
Object.keys(compact).forEach(function (k) {
  compact[k].split('').forEach(function (s) {
    unicode[s] = k;
  });
});

var killUnicode = function killUnicode(str) {
  var chars = str.split('');
  chars.forEach(function (s, i) {
    if (unicode[s]) {
      chars[i] = unicode[s];
    }
  });
  return chars.join('');
};
module.exports = killUnicode;
// console.log(fixUnicode('bjŏȒk'));

},{}],166:[function(_dereq_,module,exports){
'use strict';

var renderHtml = _dereq_('./renderHtml');
var fns = _dereq_('../../paths').fns;

var methods = {
  /** a pixel-perfect reproduction of the input, with whitespace preserved */
  text: function text(r) {
    return r.whitespace.before + r._text + r.whitespace.after;
  },
  /** a lowercased, punctuation-cleaned, whitespace-trimmed version of the word */
  normal: function normal(r) {
    return r.normal;
  },
  /** even-more normalized than normal */
  root: function root(r) {
    return r.root || r.normal;
  },
  /** the &encoded term in a span element, with POS as classNames */
  html: function html(r) {
    return renderHtml(r);
  },
  /** a simplified response for Part-of-Speech tagging*/
  tags: function tags(r) {
    return {
      text: r.text,
      normal: r.normal,
      tags: Object.keys(r.tag)
    };
  },
  /** check-print information for the console */
  debug: function debug(r) {
    var tags = Object.keys(r.tag).map(function (tag) {
      return fns.printTag(tag);
    }).join(', ');
    var word = r.text;
    // word = r.whitespace.before + word + r.whitespace.after;
    word = '\'' + fns.yellow(word || '-') + '\'';
    if (r.dirty) {
      // word += fns.red('*');
    }
    var silent = '';
    if (r.silent_term) {
      silent = '[' + r.silent_term + ']';
    }
    word = fns.leftPad(word, 25);
    word += fns.leftPad(silent, 5);
    console.log('   ' + word + '   ' + '     - ' + tags);
  }
};

var addMethods = function addMethods(Term) {
  //hook them into result.proto
  Term.prototype.out = function (fn) {
    if (!methods[fn]) {
      fn = 'text';
    }
    return methods[fn](this);
  };
  return Term;
};

module.exports = addMethods;

},{"../../paths":173,"./renderHtml":167}],167:[function(_dereq_,module,exports){
'use strict';
//turn xml special characters into apersand-encoding.
//i'm not sure this is perfectly safe.

var escapeHtml = function escapeHtml(s) {
  var HTML_CHAR_MAP = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    '\'': '&#39;',
    ' ': '&nbsp;'
  };
  return s.replace(/[<>&"' ]/g, function (ch) {
    return HTML_CHAR_MAP[ch];
  });
};

//remove html elements already in the text
//not tested!
//http://stackoverflow.com/questions/295566/sanitize-rewrite-html-on-the-client-side
var sanitize = function sanitize(html) {
  var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
  var tagOrComment = new RegExp('<(?:'
  // Comment body.
  + '!--(?:(?:-*[^->])*--+|-?)'
  // Special "raw text" elements whose content should be elided.
  + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*' + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
  // Regular name
  + '|/?[a-z]' + tagBody + ')>', 'gi');
  var oldHtml = void 0;
  do {
    oldHtml = html;
    html = html.replace(tagOrComment, '');
  } while (html !== oldHtml);
  return html.replace(/</g, '&lt;');
};

//turn the term into ~properly~ formatted html
var renderHtml = function renderHtml(t) {
  var classes = Object.keys(t.tag).filter(function (tag) {
    return tag !== 'Term';
  });
  classes = classes.map(function (c) {
    return 'nl-' + c;
  });
  classes = classes.join(' ');
  var text = sanitize(t.text);
  text = escapeHtml(text);
  var el = '<span class="' + classes + '">' + text + '</span>';
  return escapeHtml(t.whitespace.before) + el + escapeHtml(t.whitespace.after);
};

module.exports = renderHtml;

},{}],168:[function(_dereq_,module,exports){
'use strict';

var addMethods = function addMethods(Term) {

  var methods = {
    /** the punctuation at the end of this term*/
    endPunctuation: function endPunctuation() {
      var m = this.text.match(/[a-z]([,:;\/.(\.\.\.)\!\?]+)$/i);
      if (m) {
        var allowed = {
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
    setPunctuation: function setPunctuation(punct) {
      this.text = this.text.replace(/[a-z]([,:;\/.(\.\.\.)\!\?]+)$/i, '');
      this.text += punct;
      return this;
    },

    /** check if the term ends with a comma */
    hasComma: function hasComma() {
      if (this.endPunctuation() === 'comma') {
        return true;
      }
      return false;
    },

    killPunctuation: function killPunctuation() {
      this.text = this._text.replace(/([,:;\/.(\.\.\.)\!\?]+)$/, '');
      return this;
    }
  };
  //hook them into result.proto
  Object.keys(methods).forEach(function (k) {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;

},{}],169:[function(_dereq_,module,exports){
'use strict';

var setTag = _dereq_('./setTag');
var _unTag = _dereq_('./unTag');
var tagset = _dereq_('./paths').tags;

var addMethods = function addMethods(Term) {

  var methods = {
    /** set the term as this part-of-speech */
    tagAs: function tagAs(tag, reason) {
      setTag(this, tag, reason);
    },
    /** remove this part-of-speech from the term*/
    unTag: function unTag(tag, reason) {
      _unTag(this, tag, reason);
    },

    /** is this tag compatible with this word */
    canBe: function canBe(tag) {
      tag = tag || '';
      tag = tag.replace(/^#/, '');
      var not = tagset[tag].not || [];
      for (var i = 0; i < not.length; i++) {
        if (this.tag[not[i]]) {
          return false;
        }
      }
      return true;
    }

  };

  //hook them into term.prototype
  Object.keys(methods).forEach(function (k) {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;

},{"./paths":170,"./setTag":171,"./unTag":172}],170:[function(_dereq_,module,exports){
arguments[4][122][0].apply(exports,arguments)
},{"../../paths":173,"dup":122}],171:[function(_dereq_,module,exports){
'use strict';
//set a term as a particular Part-of-speech

var path = _dereq_('./paths');
var log = path.log;
var tagset = path.tags;
var unTag = _dereq_('./unTag');

var makeCompatible = function makeCompatible(term, tag, reason) {
  if (!tagset[tag]) {
    return;
  }
  //find incompatible tags
  var not = tagset[tag].not || [];
  for (var i = 0; i < not.length; i++) {
    unTag(term, not[i], reason);
  }
};

var tag_one = function tag_one(term, tag, reason) {
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

var tagAll = function tagAll(term, tag, reason) {
  if (!term || !tag || typeof tag !== 'string') {
    // console.log(tag)
    return;
  }
  tag = tag || '';
  tag = tag.replace(/^#/, '');
  tag_one(term, tag, reason);
  //find assumed-tags
  if (tagset[tag]) {
    var tags = tagset[tag].parents || [];
    for (var i = 0; i < tags.length; i++) {
      tag_one(term, tags[i], '-');
    }
  }
};

module.exports = tagAll;
// console.log(tagset['Person']);

},{"./paths":170,"./unTag":172}],172:[function(_dereq_,module,exports){
'use strict';
//set a term as a particular Part-of-speech

var path = _dereq_('./paths');
var log = path.log;
var tagset = path.tags;

//remove a tag from a term
var unTagOne = function unTagOne(term, tag, reason) {
  if (term.tag[tag]) {
    log.tell('   --' + tag + ' ' + (reason || ''));
    delete term.tag[tag];
  }
};

var unTagAll = function unTagAll(term, tag, reason) {
  if (!term || !tag) {
    return;
  }
  unTagOne(term, tag, reason);
  if (tagset[tag]) {
    //pull-out their children (dependants) too
    //this should probably be recursive, instead of just 2-deep
    var killAlso = tagset[tag].children || [];
    for (var o = 0; o < killAlso.length; o++) {
      //kill its child
      unTagOne(term, killAlso[o], reason);
      //kill grandchildren too
      var kill2 = tagset[killAlso[o]].children || [];
      for (var i2 = 0; i2 < kill2.length; i2++) {
        unTagOne(term, kill2[i2], reason);
      }
    }
  }
  return;
};
module.exports = unTagAll;

},{"./paths":170}],173:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  fns: _dereq_('../fns'),
  log: _dereq_('../log'),
  data: _dereq_('../data'),
  tags: _dereq_('../tags')
};

},{"../data":8,"../fns":40,"../log":42,"../tags":156}],174:[function(_dereq_,module,exports){
'use strict';
//seperate the 'meat' from the trailing/leading whitespace.
//works in concert with ./src/result/tokenize.js

var build_whitespace = function build_whitespace(str) {
  var whitespace = {
    before: '',
    after: ''
  };
  //get before punctuation/whitespace
  var m = str.match(/^(\s|-+|\.\.+)+/);
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

},{}],175:[function(_dereq_,module,exports){
'use strict';

var Term = _dereq_('../term');

var notWord = {
  '-': true,
  '--': true,
  '...': true
};

//turn a string into an array of terms (naiive for now, lumped later)
var fromString = function fromString(str) {
  var all = [];
  //start with a naiive split
  str = str || '';
  if (typeof str === 'number') {
    str = '' + str;
  }
  var firstSplit = str.split(/(\S+)/);
  var arr = [];
  for (var i = 0; i < firstSplit.length; i++) {
    var word = firstSplit[i];
    var hasHyphen = word.match(/^([a-z]+)(-)([a-z0-9].*)/i);
    if (hasHyphen) {
      //support multiple-hyphenated-terms
      var hyphens = word.split('-');
      for (var o = 0; o < hyphens.length; o++) {
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
  var carry = '';
  for (var _i = 0; _i < arr.length; _i++) {
    //if it's more than a whitespace
    if (arr[_i].match(/\S/) && !notWord[arr[_i]]) {
      all.push(carry + arr[_i]);
      carry = '';
    } else {
      carry += arr[_i];
    }
  }
  //handle last one
  if (carry && all.length > 0) {
    all[all.length - 1] += carry; //put it on the end
  }
  return all.map(function (t) {
    return new Term(t);
  });
};
module.exports = fromString;

},{"../term":158}],176:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tagger = _dereq_('./tagger');
var build = _dereq_('./build');

var Terms = function () {
  function Terms(arr, lexicon, refText, refTerms) {
    var _this = this;

    _classCallCheck(this, Terms);

    this.terms = arr;
    this.lexicon = lexicon;
    this.refText = refText;
    this._refTerms = refTerms;
    this.count = undefined;
    this.get = function (n) {
      return _this.terms[n];
    };
  }

  _createClass(Terms, [{
    key: 'posTag',
    value: function posTag() {
      tagger(this);
      return this;
    }
  }, {
    key: 'firstTerm',
    value: function firstTerm() {
      return this.terms[0];
    }
  }, {
    key: 'lastTerm',
    value: function lastTerm() {
      return this.terms[this.terms.length - 1];
    }
  }, {
    key: 'all',
    value: function all() {
      return this.parent;
    }
  }, {
    key: 'data',
    value: function data() {
      return {
        text: this.out('text'),
        normal: this.out('normal')
      };
    }
  }, {
    key: 'found',
    get: function get() {
      return this.terms.length > 0;
    }
  }, {
    key: 'length',
    get: function get() {
      return this.terms.length;
    }
  }, {
    key: 'isA',
    get: function get() {
      return 'Terms';
    }
  }, {
    key: 'refTerms',
    get: function get() {
      return this._refTerms || this;
    },
    set: function set(ts) {
      this._refTerms = ts;
      return this;
    }
  }, {
    key: 'dirty',
    set: function set(dirt) {
      this.terms.forEach(function (t) {
        t.dirty = dirt;
      });
    }
  }, {
    key: 'parent',
    get: function get() {
      return this.refText || this;
    },
    set: function set(r) {
      this.refText = r;
      return this;
    }
  }, {
    key: 'parentTerms',
    get: function get() {
      return this.refTerms || this;
    },
    set: function set(r) {
      this.refTerms = r;
      return this;
    }
  }, {
    key: 'whitespace',
    get: function get() {
      var _this2 = this;

      return {
        before: function before(str) {
          _this2.firstTerm().whitespace.before = str;
          return _this2;
        },
        after: function after(str) {
          _this2.lastTerm().whitespace.after = str;
          return _this2;
        }
      };
    }
  }], [{
    key: 'fromString',
    value: function fromString(str, lexicon) {
      var termArr = build(str);
      var ts = new Terms(termArr, lexicon, null);
      //give each term a reference to this ts
      ts.terms.forEach(function (t) {
        t.parentTerms = ts;
      });
      ts.posTag();
      return ts;
    }
  }]);

  return Terms;
}();

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

},{"./build":175,"./match":177,"./match/not":183,"./methods/delete":184,"./methods/insert":185,"./methods/loops":186,"./methods/misc":187,"./methods/out":188,"./methods/replace":189,"./methods/split":190,"./methods/tag":191,"./methods/transform":192,"./tagger":204}],177:[function(_dereq_,module,exports){
'use strict';
//

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var syntax = _dereq_('./lib/syntax');
var startHere = _dereq_('./lib/startHere');
var Text = _dereq_('../../result/index');
// const diff = require('./diff');


var matchMethods = function matchMethods(Terms) {

  //support {word:true} whitelist
  var matchObj = function matchObj(ts, obj) {
    var matches = ts.terms.filter(function (t) {
      return obj[t.normal];
    });
    matches = matches.map(function (a) {
      return new Terms([a], ts.lexicon, ts.refText, ts.refTerms);
    });
    return new Text(matches, ts.lexicon, ts.parent);
  };

  //support [word, word] whitelist
  var matchArr = function matchArr(r, arr) {
    //its faster this way
    var obj = arr.reduce(function (h, a) {
      h[a] = true;
      return h;
    }, {});
    return matchObj(r, obj);
  };

  //support regex-like whitelist-match
  var matchString = function matchString(r, str, verbose) {
    var matches = [];
    var regs = syntax(str);
    for (var t = 0; t < r.terms.length; t++) {
      //don't loop through if '^'
      if (regs[0] && regs[0].starting && t > 0) {
        break;
      }
      var m = startHere(r, t, regs, verbose);
      if (m) {
        matches.push(m);
        //ok, don't try to match these again.
        var skip = m.length - 1;
        t += skip; //this could use some work
      }
    }
    matches = matches.map(function (a) {
      return new Terms(a, r.lexicon, r.refText, r.refTerms);
    });
    return new Text(matches, r.lexicon, r.parent);
  };

  var methods = {

    /**match all */
    match: function match(want, verbose) {
      //support regex-like whitelist-match
      if (typeof want === 'string') {
        return matchString(this, want, verbose);
      }
      if ((typeof want === 'undefined' ? 'undefined' : _typeof(want)) === 'object') {
        var type = Object.prototype.toString.call(want);
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
    matchOne: function matchOne(str) {
      var regs = syntax(str);
      for (var t = 0; t < this.terms.length; t++) {
        //don't loop through if '^'
        if (regs[0] && regs[0].starting && t > 0) {
          break;
        }
        var m = startHere(this, t, regs);
        if (m) {
          return m;
        }
      }
      return null;
    },

    /**return first match */
    has: function has(str) {
      var m = this.matchOne(str);
      return !!m;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach(function (k) {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = matchMethods;

},{"../../result/index":44,"./lib/startHere":181,"./lib/syntax":182}],178:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('./paths').fns;

//compare 1 term to one reg
var perfectMatch = function perfectMatch(term, reg) {
  if (!term || !reg) {
    return false;
  }
  //support '.' - any
  if (reg.anyOne) {
    return true;
  }
  //pos-match
  if (reg.tag) {
    for (var i = 0; i < reg.tag.length; i++) {
      var tag = reg.tag[i];
      if (term.tag[tag]) {
        return true;
      }
    }
    return false;
  }
  //one-of term-match
  if (reg.oneOf) {
    for (var _i = 0; _i < reg.oneOf.length; _i++) {
      var str = reg.oneOf[_i];
      //try a tag match
      if (str.match(/^#/)) {
        var _tag = str.replace(/^#/, '');
        _tag = fns.titleCase(_tag);
        if (term.tag[_tag]) {
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
var isMatch = function isMatch(term, reg, verbose) {
  var found = perfectMatch(term, reg, verbose);
  if (reg.negative) {
    found = !!!found;
  }
  return found;
};
module.exports = isMatch;

},{"./paths":180}],179:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('./paths').fns;

var almostMatch = function almostMatch(reg_str, term) {
  return fns.startsWith(term.normal, reg_str);
};

// match ['john', 'smith'] regs, when the term is lumped
var lumpMatch = function lumpMatch(term, regs, reg_i) {
  var reg_str = regs[reg_i].normal;
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

},{"./paths":180}],180:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  fns: _dereq_('../../../fns'),
  log: _dereq_('../../../log')
};

},{"../../../fns":40,"../../../log":42}],181:[function(_dereq_,module,exports){
'use strict';

var lumpMatch = _dereq_('./lumpMatch');
var isMatch = _dereq_('./isMatch');

// match everything until this point - '*'
var greedyUntil = function greedyUntil(ts, i, reg) {
  for (i = i; i < ts.length; i++) {
    var t = ts.terms[i];
    if (isMatch(t, reg)) {
      return i;
    }
  }
  return null;
};

//keep matching this reg as long as possible
var greedyOf = function greedyOf(ts, i, reg, until) {
  for (i = i; i < ts.length; i++) {
    var t = ts.terms[i];
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
var startHere = function startHere(ts, startAt, regs, verbose) {
  var term_i = startAt;
  //check each regex-thing
  for (var reg_i = 0; reg_i < regs.length; reg_i++) {
    var term = ts.terms[term_i];
    var reg = regs[reg_i];
    var next_reg = regs[reg_i + 1];

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
      var foundAt = greedyUntil(ts, term_i, regs[reg_i + 1]);
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
        var len = ts.length;
        var max = regs[reg_i].minMax.max + startAt;
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
      var _foundAt = greedyUntil(ts, term_i, next_reg);
      if (!_foundAt) {
        return null;
      }
      //if it's too close/far..
      var minMax = regs[reg_i].minMax;
      if (_foundAt < minMax.min || _foundAt > minMax.max) {
        return null;
      }
      term_i = _foundAt + 1;
      reg_i += 1;
      continue;
    }

    //if optional, check next one
    if (reg.optional) {
      var until = regs[reg_i + 1];
      term_i = greedyOf(ts, term_i, reg, until);
      continue;
    }

    //check a perfect match
    if (isMatch(term, reg, verbose)) {
      term_i += 1;
      //try to greedy-match '+'
      if (reg.consecutive) {
        var _until = regs[reg_i + 1];
        term_i = greedyOf(ts, term_i, reg, _until);
      }
      continue;
    }

    if (term.silent_term && !term.normal) {
      //skip over silent contraction terms
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
    var lumpUntil = lumpMatch(term, regs, reg_i);
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

},{"./isMatch":178,"./lumpMatch":179}],182:[function(_dereq_,module,exports){
'use strict';
// parse a search lookup term find the regex-like syntax in this term

var fns = _dereq_('./paths').fns;

//turn 'regex-like' search string into parsed json
var parse_term = function parse_term(term) {
  term = term || '';
  term = term.trim();
  var reg = {
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
    var m = term.match(/\{([0-9]+), ?([0-9]+)\}/);
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
var parse_all = function parse_all(reg) {
  reg = reg || '';
  reg = reg.split(/ +/);
  return reg.map(parse_term);
};
// console.log(parse_all(''));

module.exports = parse_all;

},{"./paths":180}],183:[function(_dereq_,module,exports){
'use strict';
//

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var syntax = _dereq_('./lib/syntax');
var startHere = _dereq_('./lib/startHere');
var Text = _dereq_('../../result/index');
// const diff = require('./diff');

var addfns = function addfns(Terms) {

  var fns = {
    //blacklist from a {word:true} object
    notObj: function notObj(r, obj) {
      var matches = [];
      var current = [];
      r.terms.forEach(function (t) {
        //TODO: support multi-word blacklists
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
      matches = matches.map(function (a) {
        return new Terms(a, r.lexicon, r.refText, r.refTerms);
      });
      return new Text(matches, r.lexicon, r.parent);
    },

    //blacklist from a match string
    notString: function notString(r, want, verbose) {
      var matches = [];
      var regs = syntax(want);
      var terms = [];
      //try the match starting from each term
      for (var i = 0; i < r.terms.length; i++) {
        var bad = startHere(r, i, regs, verbose);
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
      matches = matches.map(function (a) {
        return new Terms(a, r.lexicon, r.refText, r.refTerms);
      });
      // return matches
      return new Text(matches, r.lexicon, r.parent);
    }
  };
  //blacklist from a [word, word] array
  fns.notArray = function (r, arr) {
    var obj = arr.reduce(function (h, a) {
      h[a] = true;
      return h;
    }, {});
    return fns.notObj(r, obj);
  };

  /**return everything but these matches*/
  Terms.prototype.not = function (want, verbose) {
    //support [word, word] blacklist
    if ((typeof want === 'undefined' ? 'undefined' : _typeof(want)) === 'object') {
      var type = Object.prototype.toString.call(want);
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

},{"../../result/index":44,"./lib/startHere":181,"./lib/syntax":182}],184:[function(_dereq_,module,exports){
'use strict';

var mutate = _dereq_('../mutate');

var deleteMethods = function deleteMethods(Terms) {

  var methods = {

    'delete': function _delete(reg) {
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
      var found = this.match(reg);
      if (found.found) {
        var r = mutate.deleteThese(this, found);
        return r;
      }
      return this.parentTerms;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach(function (k) {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = deleteMethods;

},{"../mutate":193}],185:[function(_dereq_,module,exports){
'use strict';

var mutate = _dereq_('../mutate');

//whitespace
var addSpaceAt = function addSpaceAt(ts, i) {
  if (!ts.terms.length || !ts.terms[i]) {
    return ts;
  }
  ts.terms[i].whitespace.before = ' ';
  return ts;
};

var insertMethods = function insertMethods(Terms) {

  //accept any sorta thing
  var ensureTerms = function ensureTerms(input) {
    if (input.isA === 'Terms') {
      return input;
    }
    if (input.isA === 'Term') {
      return new Terms([input]);
    }
    return Terms.fromString(input);
  };

  var methods = {

    insertBefore: function insertBefore(input, tag) {
      var original_l = this.terms.length;
      var ts = ensureTerms(input);
      if (tag) {
        ts.tagAs(tag);
      }
      var index = this.index();
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

    insertAfter: function insertAfter(input, tag) {
      var original_l = this.terms.length;
      var ts = ensureTerms(input);
      if (tag) {
        ts.tagAs(tag);
      }
      var index = this.terms[this.terms.length - 1].index();
      //beginning whitespace to ts
      addSpaceAt(ts, 0);
      this.parentTerms.terms = mutate.insertAt(this.parentTerms.terms, index + 1, ts);
      //also copy them to current selection
      if (this.terms.length === original_l) {
        this.terms = this.terms.concat(ts.terms);
      }
      return this;
    },

    insertAt: function insertAt(index, input, tag) {
      if (index < 0) {
        index = 0;
      }
      var original_l = this.terms.length;
      var ts = ensureTerms(input);
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
  Object.keys(methods).forEach(function (k) {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = insertMethods;

},{"../mutate":193}],186:[function(_dereq_,module,exports){
'use strict';
//these methods are simply term-methods called in a loop

var addMethods = function addMethods(Terms) {

  var foreach = [
  // ['tagAs'],
  // ['unTag'],
  // ['canBe'],
  ['toUpperCase', 'UpperCase'], ['toLowerCase'], ['toTitleCase', 'TitleCase']];

  foreach.forEach(function (arr) {
    var k = arr[0];
    var tag = arr[1];
    var myFn = function myFn() {
      var args = arguments;
      this.terms.forEach(function (t) {
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

},{}],187:[function(_dereq_,module,exports){
'use strict';

var miscMethods = function miscMethods(Terms) {

  var methods = {
    term: function term(n) {
      return this.terms[n];
    },
    first: function first() {
      var t = this.terms[0];
      return new Terms([t], this.lexicon, this.refText, this.refTerms);
    },
    last: function last() {
      var t = this.terms[this.terms.length - 1];
      return new Terms([t], this.lexicon, this.refText, this.refTerms);
    },
    slice: function slice(start, end) {
      var terms = this.terms.slice(start, end);
      return new Terms(terms, this.lexicon, this.refText, this.refTerms);
    },
    endPunctuation: function endPunctuation() {
      return this.last().terms[0].endPunctuation();
    },
    canBe: function canBe(tag) {
      tag = tag || '';
      tag = tag.replace(/^#/, '');
      //atleast one of these
      for (var i = 0; i < this.terms.length; i++) {
        if (!this.terms[i].canBe(tag)) {
          return false;
        }
      }
      return true;
    },
    index: function index() {
      var parent = this.parentTerms;
      var first = this.terms[0];
      if (!parent || !first) {
        return null; //maybe..
      }
      for (var i = 0; i < parent.terms.length; i++) {
        if (first === parent.terms[i]) {
          return i;
        }
      }
      return null;
    },
    termIndex: function termIndex() {
      var first = this.terms[0];
      var ref = this.refText || this;
      if (!ref || !first) {
        return null; //maybe..
      }
      // console.log(ref);
      var n = 0;
      for (var i = 0; i < ref.list.length; i++) {
        var ts = ref.list[i];
        for (var o = 0; o < ts.terms.length; o++) {
          if (ts.terms[o] === first) {
            return n;
          }
          n += 1;
        }
      }
      return n;
    },
    //number of characters in this match
    chars: function chars() {
      return this.terms.reduce(function (i, t) {
        i += t.whitespace.before.length;
        i += t.text.length;
        i += t.whitespace.after.length;
        return i;
      }, 0);
    },

    //just .length
    wordCount: function wordCount() {
      return this.terms.length;
    },


    //this has term-order logic, so has to be here
    toCamelCase: function toCamelCase() {
      this.toTitleCase();
      this.terms.forEach(function (t, i) {
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
  Object.keys(methods).forEach(function (k) {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = miscMethods;

},{}],188:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../paths').fns;

var methods = {
  text: function text(ts) {
    return ts.terms.reduce(function (str, t) {
      str += t.out('text');
      return str;
    }, '');
  },

  normal: function normal(ts) {
    var terms = ts.terms.filter(function (t) {
      return t.text;
    });
    terms = terms.map(function (t) {
      return t.normal; //+ punct;
    });
    return terms.join(' ');
  },

  grid: function grid(ts) {
    var str = '  ';
    str += ts.terms.reduce(function (s, t) {
      s += fns.leftPad(t.text, 11);
      return s;
    }, '');
    return str + '\n\n';
  },

  color: function color(ts) {
    return ts.terms.reduce(function (s, t) {
      s += fns.printTerm(t);
      return s;
    }, '');
  },
  /** no punctuation, fancy business **/
  root: function root(ts) {
    return ts.terms.filter(function (t) {
      return t.text;
    }).map(function (t) {
      return t.root;
    }).join(' ').toLowerCase();
  },

  html: function html(ts) {
    return ts.terms.map(function (t) {
      return t.render.html();
    }).join(' ');
  },
  debug: function debug(ts) {
    ts.terms.forEach(function (t) {
      t.out('debug');
    });
  }
};
methods.plaintext = methods.text;
methods.normalize = methods.normal;
methods.normalized = methods.normal;
methods.colors = methods.color;
methods.tags = methods.terms;

var renderMethods = function renderMethods(Terms) {
  Terms.prototype.out = function (str) {
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

},{"../paths":194}],189:[function(_dereq_,module,exports){
'use strict';

var mutate = _dereq_('../mutate');

var replaceMethods = function replaceMethods(Terms) {
  var methods = {

    /**swap this for that */
    replace: function replace(str1, str2) {
      //in this form, we 'replaceWith'
      if (str2 === undefined) {
        return this.replaceWith(str1);
      }
      this.match(str1).replaceWith(str2);
      return this;
    },

    /**swap this for that */
    replaceWith: function replaceWith(str, tag) {
      var toAdd = Terms.fromString(str);
      if (tag) {
        toAdd.tagAs(tag, 'user-given');
      }
      var index = this.index();
      this.parentTerms = mutate.deleteThese(this.parentTerms, this);
      this.parentTerms.terms = mutate.insertAt(this.parentTerms.terms, index, toAdd);
      this.terms = toAdd.terms;
      return this;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach(function (k) {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = replaceMethods;

},{"../mutate":193}],190:[function(_dereq_,module,exports){
'use strict';

//break apart a termlist into (before, match after)

var breakUpHere = function breakUpHere(terms, ts) {
  var firstTerm = ts.terms[0];
  var len = ts.terms.length;
  for (var i = 0; i < terms.length; i++) {
    if (terms[i] === firstTerm) {
      return {
        before: terms.slice(0, i),
        match: terms.slice(i, i + len),
        after: terms.slice(i + len, terms.length)
      };
    }
  }
  return {
    after: terms
  };
};

var splitMethods = function splitMethods(Terms) {

  var methods = {

    /** at the end of the match, split the terms **/
    splitAfter: function splitAfter(reg, verbose) {
      var _this = this;

      var ms = this.match(reg, verbose); //Array[ts]
      var termArr = this.terms;
      var all = [];
      ms.list.forEach(function (lookFor) {
        var section = breakUpHere(termArr, lookFor);
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
      all = all.map(function (ts) {
        var parent = _this.refText; //|| this;
        return new Terms(ts, _this.lexicon, parent, _this.refTerms);
      });
      return all;
    },

    /** return only before & after  the match**/
    splitOn: function splitOn(reg, verbose) {
      var _this2 = this;

      var ms = this.match(reg, verbose); //Array[ts]
      var termArr = this.terms;
      var all = [];
      ms.list.forEach(function (lookFor) {
        var section = breakUpHere(termArr, lookFor);
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
      all = all.filter(function (a) {
        return a && a.length;
      });
      all = all.map(function (ts) {
        return new Terms(ts, ts.lexicon, ts.refText, _this2.refTerms);
      });
      return all;
    },

    /** at the start of the match, split the terms**/
    splitBefore: function splitBefore(reg, verbose) {
      var _this3 = this;

      var ms = this.match(reg, verbose); //Array[ts]
      var termArr = this.terms;
      var all = [];
      ms.list.forEach(function (lookFor) {
        var section = breakUpHere(termArr, lookFor);
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
      for (var i = 0; i < all.length; i++) {
        for (var o = 0; o < ms.length; o++) {
          if (ms.list[o].terms[0] === all[i][0]) {
            if (all[i + 1]) {
              all[i] = all[i].concat(all[i + 1]);
              all[i + 1] = [];
            }
          }
        }
      }
      //make them termlists
      all = all.filter(function (a) {
        return a && a.length;
      });
      all = all.map(function (ts) {
        return new Terms(ts, ts.lexicon, ts.refText, _this3.refTerms);
      });
      return all;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach(function (k) {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = splitMethods;
exports = splitMethods;

},{}],191:[function(_dereq_,module,exports){
'use strict';

var addMethods = function addMethods(Terms) {

  var methods = {
    tagAs: function tagAs(tag, reason) {
      this.terms.forEach(function (t) {
        t.tagAs(tag, reason);
      });
    },
    unTag: function unTag(tag, reason) {
      this.terms.forEach(function (t) {
        t.unTag(tag, reason);
      });
    },
    canBe: function canBe(tag, reason) {
      this.terms.forEach(function (t) {
        t.canBe(tag, reason);
      });
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach(function (k) {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = addMethods;

},{}],192:[function(_dereq_,module,exports){
'use strict';

var transforms = function transforms(Terms) {

  var methods = {

    clone: function clone() {
      var terms = this.terms.map(function (t) {
        return t.clone();
      });
      return new Terms(terms, this.lexicon, this.refText, null); //, this.refTerms
    },
    hyphenate: function hyphenate() {
      var _this = this;

      this.terms.forEach(function (t, i) {
        if (i !== _this.terms.length - 1) {
          t.whitespace.after = '-';
        }
        if (i !== 0) {
          t.whitespace.before = '';
        }
      });
      return this;
    },
    dehyphenate: function dehyphenate() {
      this.terms.forEach(function (t) {
        if (t.whitespace.after === '-') {
          t.whitespace.after = ' ';
        }
      });
      return this;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach(function (k) {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = transforms;

},{}],193:[function(_dereq_,module,exports){
'use strict';
//

var getTerms = function getTerms(needle) {
  var arr = [];
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
exports.deleteThese = function (source, needle) {
  var arr = getTerms(needle);
  source.terms = source.terms.filter(function (t) {
    for (var i = 0; i < arr.length; i++) {
      if (t === arr[i]) {
        return false;
      }
    }
    return true;
  });
  return source;
};

//add them
exports.insertAt = function (terms, i, needle) {
  needle.dirty = true;
  var arr = getTerms(needle);
  //handle whitespace
  if (i > 0 && arr[0]) {
    arr[0].whitespace.before = ' ';
  }
  //gnarly splice
  //-( basically  - terms.splice(i+1, 0, arr) )
  Array.prototype.splice.apply(terms, [i, 0].concat(arr));
  return terms;
};

},{}],194:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  data: _dereq_('../data/index'),
  lexicon: _dereq_('../data/lexicon'),
  fns: _dereq_('../fns'),
  log: _dereq_('../log'),
  Term: _dereq_('../term')
};

},{"../data/index":8,"../data/lexicon":9,"../fns":40,"../log":42,"../term":158}],195:[function(_dereq_,module,exports){
'use strict';

var fixContraction = _dereq_('./fix');

var irregulars = {
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
  'rn': ['right', 'now']
};

//check irregulars
var checkIrregulars = function checkIrregulars(ts) {
  var irreg = Object.keys(irregulars);
  for (var i = 0; i < irreg.length; i++) {
    for (var t = 0; t < ts.terms.length; t++) {
      if (ts.terms[t].normal === irreg[i]) {
        var fix = irregulars[irreg[i]];
        ts = fixContraction(ts, fix, t);
        break;
      }
    }
  }
  return ts;
};
module.exports = checkIrregulars;

},{"./fix":199}],196:[function(_dereq_,module,exports){
'use strict';

var fixContraction = _dereq_('./fix');
var splitContraction = _dereq_('./split');

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
var isPossessive = function isPossessive(ts, i) {
  var t = ts.terms[i];
  var next_t = ts.terms[i + 1];
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
var hardOne = function hardOne(ts) {
  for (var i = 0; i < ts.terms.length; i++) {
    //skip existing
    if (ts.terms[i].silent_term) {
      continue;
    }
    var parts = splitContraction(ts.terms[i]);
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
        var arr = [parts.start, 'is'];
        ts = fixContraction(ts, arr, i);
        i += 1;
      }
    }
  }
  return ts;
};

module.exports = hardOne;

},{"./fix":199,"./split":201}],197:[function(_dereq_,module,exports){
'use strict';

var fixContraction = _dereq_('./fix');
var split = _dereq_('./split');

//the formulaic contraction types:
var easy_ends = {
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
var easyOnes = function easyOnes(ts) {
  for (var i = 0; i < ts.terms.length; i++) {
    //skip existing
    if (ts.terms[i].silent_term) {
      continue;
    }
    var parts = split(ts.terms[i]);
    if (parts) {
      //make sure its an easy one
      if (easy_ends[parts.end]) {
        var arr = [parts.start, easy_ends[parts.end]];
        ts = fixContraction(ts, arr, i);
        i += 1;
      }
    }
  }
  return ts;
};
module.exports = easyOnes;

},{"./fix":199,"./split":201}],198:[function(_dereq_,module,exports){
'use strict';

var fixContraction = _dereq_('./fix');
var Term = _dereq_('../../../term');

var numberRange = function numberRange(ts) {
  for (var i = 0; i < ts.terms.length; i++) {
    var t = ts.terms[i];
    //skip existing
    if (t.silent_term) {
      continue;
    }
    //hyphens found in whitespace - '5 - 7'
    if (t.tag.Value && i > 0 && t.whitespace.before === ' - ') {
      var to = new Term('');
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
      var arr = t.text.split(/(-)/);
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

},{"../../../term":158,"./fix":199}],199:[function(_dereq_,module,exports){
'use strict';

var Term = _dereq_('../../../term');

var tags = {
  'not': 'Negative',
  'will': 'Verb',
  'would': 'Modal',
  'have': 'Verb',
  'are': 'Copula',
  'is': 'Copula',
  'am': 'Verb'
};
//make sure the newly created term gets the easy tags
var easyTag = function easyTag(t) {
  if (tags[t.silent_term]) {
    t.tagAs(tags[t.silent_term]);
  }
};

//add a silent term
var fixContraction = function fixContraction(ts, parts, i) {
  //add the interpretation to the contracted term
  var one = ts.terms[i];
  one.silent_term = parts[0];
  //tag it as a contraction
  one.tagAs('Contraction', 'tagger-contraction');

  //add a new empty term
  var two = new Term('');
  two.silent_term = parts[1];
  two.tagAs('Contraction', 'tagger-contraction');
  ts.insertAt(i + 1, two);
  //ensure new term has no auto-whitspace
  two.whitespace.before = '';
  two.whitespace.after = '';
  easyTag(two);

  //potentially it's three-contracted-terms, like 'dunno'
  if (parts[2]) {
    var three = new Term('');
    three.silent_term = parts[2];
    // ts.terms.push(three);
    ts.insertAt(i + 2, three);
    three.tagAs('Contraction', 'tagger-contraction');
    easyTag(three);
  }

  return ts;
};

module.exports = fixContraction;

},{"../../../term":158}],200:[function(_dereq_,module,exports){
'use strict';

var irregulars = _dereq_('./01-irregulars');
var hardOne = _dereq_('./02-hardOne');
var easyOnes = _dereq_('./03-easyOnes');
var numberRange = _dereq_('./04-numberRange');

//find and pull-apart contractions
var interpret = function interpret(ts) {
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

},{"./01-irregulars":195,"./02-hardOne":196,"./03-easyOnes":197,"./04-numberRange":198}],201:[function(_dereq_,module,exports){
'use strict';

var allowed = {
  're': true,
  've': true,
  'll': true,
  't': true,
  's': true,
  'd': true,
  'm': true
};
/** interpret a terms' contraction */
var splitContraction = function splitContraction(t) {
  var parts = t.text.match(/^([a-z]+)'([a-z][a-z]?)$/i);
  if (parts && parts[1] && allowed[parts[2]]) {
    //handle n't
    if (parts[2] === 't' && parts[1].match(/[a-z]n$/)) {
      parts[1] = parts[1].replace(/n$/, '');
      parts[2] = 'n\'t'; //dunno..
    }
    //fix titlecase
    if (t.tag.TitleCase) {
      parts[1] = parts[1].replace(/^[a-z]/, function (x) {
        return x.toUpperCase();
      });
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

},{}],202:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var path = 'correction';
var verb_corrections = _dereq_('./verb_corrections');

//mostly pos-corections here
var corrections = function corrections(r) {
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
  r.match('#Noun like #Noun').term(1).tag('Preposition', 'noun-like');
  //look like
  r.match('#Verb like').term(1).tag('Adverb', 'verb-like');
  //exactly like
  r.match('#Adverb like').term(1).tag('Adverb', 'adverb-like');

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

},{"../paths":209,"./verb_corrections":203}],203:[function(_dereq_,module,exports){
'use strict';

var corrections = function corrections(r) {
  //support a splattering of auxillaries before a verb
  var advb = '(#Adverb|not)+?';
  //had walked
  r.match('(has|had) ' + advb + ' #PastTense').not('#Verb$').tag('Auxillary', 'had-walked');
  //was walking
  r.match('#Copula ' + advb + ' #Gerund').not('#Verb$').tag('Auxillary', 'copula-walking');
  //been walking
  r.match('(be|been) ' + advb + ' #Gerund').not('#Verb$').tag('Auxillary', 'be-walking');
  //would walk
  r.match('(#Modal|did) ' + advb + ' #Verb').not('#Verb$').tag('Auxillary', 'modal-verb');
  //would have had
  r.match('#Modal ' + advb + ' have ' + advb + ' had ' + advb + ' #Verb').not('#Verb$').tag('Auxillary', 'would-have');
  //would be walking
  r.match('(#Modal) ' + advb + ' be ' + advb + ' #Verb').not('#Verb$').tag('Auxillary', 'would-be');
  //would been walking
  r.match('(#Modal|had|has) ' + advb + ' been ' + advb + ' #Verb').not('#Verb$').tag('Auxillary', 'would-be');
  //infinitive verbs suggest plural nouns - 'XYZ walk to the store'
  // r.match(`#Singular+ #Infinitive`).match('#Singular+').tag('Plural', 'infinitive-make-plural');
  return r;
};
module.exports = corrections;

},{}],204:[function(_dereq_,module,exports){
'use strict';
//the steps and processes of pos-tagging

var contraction = {
  interpret: _dereq_('./contraction')
};
var lumper = {
  lexicon_lump: _dereq_('./lumper/lexicon_lump'),
  lump_two: _dereq_('./lumper/lump_two'),
  lump_three: _dereq_('./lumper/lump_three')
};
var step = {
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
var corrections = _dereq_('./corrections');
var tagPhrase = _dereq_('./phrase');

var tagger = function tagger(ts) {
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
  for (var i = 0; i < 3; i++) {
    ts = lumper.lump_three(ts);
    ts = lumper.lump_two(ts);
  }
  ts = corrections(ts);
  ts = tagPhrase(ts);
  return ts;
};

module.exports = tagger;

},{"./contraction":200,"./corrections":202,"./lumper/lexicon_lump":206,"./lumper/lump_three":207,"./lumper/lump_two":208,"./phrase":211,"./steps/01-punctuation_step":212,"./steps/02-lexicon_step":213,"./steps/03-capital_step":214,"./steps/04-web_step":215,"./steps/05-suffix_step":216,"./steps/06-neighbour_step":217,"./steps/07-noun_fallback":218,"./steps/08-date_step":219,"./steps/09-auxillary_step":220,"./steps/10-negation_step":221,"./steps/12-phrasal_step":222,"./steps/13-comma_step":223,"./steps/14-possessive_step":224,"./steps/15-value_step":225,"./steps/16-acronym_step":226,"./steps/17-emoji_step":227,"./steps/18-person_step":228,"./steps/19-quotation_step":229,"./steps/20-organization_step":230,"./steps/21-plural_step":231}],205:[function(_dereq_,module,exports){
'use strict';

var paths = _dereq_('../paths');
var Term = paths.Term;
var log = paths.log;
var path = 'tagger/combine';
//merge two term objects.. carefully

var makeText = function makeText(a, b) {
  var text = a.whitespace.before + a.text + a.whitespace.after;
  text += b.whitespace.before + b.text + b.whitespace.after;
  return text;
};

var combine = function combine(s, i) {
  var a = s.terms[i];
  var b = s.terms[i + 1];
  if (!b) {
    return;
  }
  log.tell('--combining: "' + a.normal + '"+"' + b.normal + '"', path);
  var text = makeText(a, b);
  s.terms[i] = new Term(text, a.context);
  s.terms[i].normal = a.normal + ' ' + b.normal;
  s.terms[i + 1] = null;
  s.terms = s.terms.filter(function (t) {
    return t !== null;
  });
  return;
};

module.exports = combine;

},{"../paths":209}],206:[function(_dereq_,module,exports){
'use strict';
//check for "united" + "kingdom" in lexicon, and combine + tag it

var combine = _dereq_('./combine');
var p = _dereq_('../paths');
var log = p.log;
var lexicon = p.lexicon;
var fns = p.fns;
var path = 'tagger/multiple';

var combineMany = function combineMany(ts, i, count) {
  for (var n = 0; n < count; n++) {
    combine(ts, i);
  }
};

//try to concatenate multiple-words to get this term
var tryStringFrom = function tryStringFrom(want, start, ts) {
  var text = '';
  var normal = '';
  var simple = '';
  for (var i = start; i < ts.terms.length; i++) {
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
      var count = i - start;
      combineMany(ts, start, count);
      return true;
    }
    if (normal.length > want.length) {
      return false;
    }
  }
  return false;
};

var lexicon_lump = function lexicon_lump(ts) {
  log.here(path);
  var uLexicon = ts.lexicon || {};

  //try the simpler, known lexicon
  for (var i = 0; i < ts.terms.length - 1; i++) {
    //try 'A'+'B'
    var normal = ts.terms[i].normal + ' ' + ts.terms[i + 1].normal;
    var text = ts.terms[i].text + ' ' + ts.terms[i + 1].text;
    var pos = lexicon[normal] || lexicon[text];
    if (pos) {
      combine(ts, i);
      ts.terms[i].tagAs(pos, 'multiples-lexicon');
    }
  }

  //try the user's lexicon
  Object.keys(uLexicon).forEach(function (str) {
    for (var _i = 0; _i < ts.terms.length; _i++) {
      if (fns.startsWith(str, ts.terms[_i].normal) || fns.startsWith(str, ts.terms[_i].text)) {
        if (tryStringFrom(str, _i, ts)) {
          ts.terms[_i].tagAs(uLexicon[str], 'user-lexicon-lump');
        }
      }
    }
  });
  return ts;
};

module.exports = lexicon_lump;

},{"../paths":209,"./combine":205}],207:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var path = 'lumper/lump_three';
var combine = _dereq_('./combine');

//rules for combining three terms into one
var do_three = [{
  //John & Joe's
  condition: function condition(a, b, c) {
    return a.tag.Noun && (b.text === '&' || b.normal === 'n') && c.tag.Noun;
  },
  result: 'Organization',
  reason: 'Noun-&-Noun'
}, {
  //1 800 PhoneNumber
  condition: function condition(a, b, c) {
    return a.tag.Value && b.tag.Value && c.tag.PhoneNumber && b.normal.length === 3 && a.normal.length < 3;
  },
  result: 'PhoneNumber',
  reason: '1-800-PhoneNumber'
}];

var lump_three = function lump_three(s) {
  log.here(path);
  for (var o = 0; o < do_three.length; o++) {
    for (var i = 0; i < s.terms.length - 2; i++) {
      var a = s.terms[i];
      var b = s.terms[i + 1];
      var c = s.terms[i + 2];
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

},{"../paths":209,"./combine":205}],208:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var path = 'lumper/lump_two';
var combine = _dereq_('./combine');

var timezones = {
  standard: true,
  daylight: true,
  summer: true,
  eastern: true,
  pacific: true,
  central: true,
  mountain: true
};

//rules that combine two words
var do_two = [{
  //6 am
  condition: function condition(a, b) {
    return a.tag.Holiday && (b.normal === 'day' || b.normal === 'eve');
  },
  result: 'Holiday',
  reason: 'holiday-day'
}, {
  //Aircraft designer
  condition: function condition(a, b) {
    return a.tag.Noun && b.tag.Actor;
  },
  result: 'Actor',
  reason: 'thing-doer'
}, {
  //timezones
  condition: function condition(a, b) {
    return timezones[a.normal] && (b.normal === 'standard time' || b.normal === 'time');
  },
  result: 'Time',
  reason: 'timezone'
}, {
  //canadian dollar, Brazilian pesos
  condition: function condition(a, b) {
    return a.tag.Demonym && b.tag.Currency;
  },
  result: 'Currency',
  reason: 'demonym-currency'
}, {
  //(454) 232-9873
  condition: function condition(a, b) {
    return a.tag.NumericValue && b.tag.PhoneNumber && a.normal.length <= 3;
  },
  result: 'PhoneNumber',
  reason: '(800) PhoneNumber'
}];

var lump_two = function lump_two(s) {
  log.here(path);
  for (var o = 0; o < do_two.length; o++) {
    for (var i = 0; i < s.terms.length - 1; i++) {
      var a = s.terms[i];
      var b = s.terms[i + 1];
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

},{"../paths":209,"./combine":205}],209:[function(_dereq_,module,exports){
'use strict';

module.exports = _dereq_('../paths');

},{"../paths":194}],210:[function(_dereq_,module,exports){
'use strict';

//

var conditionPass = function conditionPass(r) {
  //'if it really goes, I will..'
  var m = r.match('#Condition {1,7} #ClauseEnd');
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

},{}],211:[function(_dereq_,module,exports){
'use strict';

var conditionPass = _dereq_('./00-conditionPass');
// const verbPhrase = require('./01-verbPhrase');
// const nounPhrase = require('./02-nounPhrase');
// const AdjectivePhrase = require('./03-adjectivePhrase');
//
var phraseTag = function phraseTag(Text) {
  Text = conditionPass(Text);
  // Text = verbPhrase(Text);
  // Text = nounPhrase(Text);
  // Text = AdjectivePhrase(Text);
  return Text;
};

module.exports = phraseTag;

},{"./00-conditionPass":210}],212:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var rules = _dereq_('./data/punct_rules');
var path = 'tagger/punctuation';

//not so smart (right now)
var isRomanNumeral = function isRomanNumeral(t) {
  if (!t.canBe('RomanNumeral')) {
    return false;
  }
  var str = t.text;
  if (str.length > 1 && str.match(/^[IVXCM]+$/)) {
    return true;
  }
  return false;
};

var oneLetters = {
  a: true,
  i: true,
  //internet-slang
  u: true,
  r: true,
  c: true,
  k: true
};

var punctuation_step = function punctuation_step(ts) {
  log.here(path);
  ts.terms.forEach(function (t) {
    var str = t.text;
    //anything can be titlecase
    if (str.match(/^[A-Z][a-z']/)) {
      t.tagAs('TitleCase', 'punct-rule');
    }
    //ok, normalise it a little,
    str = str.replace(/[,\.\?]$/, '');
    //do punctuation rules (on t.text)
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
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

},{"../paths":209,"./data/punct_rules":236}],213:[function(_dereq_,module,exports){
'use strict';

var p = _dereq_('../paths');
var split = _dereq_('../contraction/split');

var lexicon = p.lexicon;
var log = p.log;
var path = 'tagger/lexicon';

var check_lexicon = function check_lexicon(str, sentence) {
  //check a user's custom lexicon
  var custom = sentence.lexicon || {};
  if (custom[str]) {
    return custom[str];
  }
  if (lexicon[str]) {
    return lexicon[str];
  }
  return null;
};

var lexicon_pass = function lexicon_pass(ts) {
  log.here(path);
  var found = void 0;
  //loop through each term
  for (var i = 0; i < ts.terms.length; i++) {
    var t = ts.terms[i];
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
    var parts = split(t);
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
    var words = t.normal.split(/[ -]/);
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

},{"../contraction/split":201,"../paths":209}],214:[function(_dereq_,module,exports){
'use strict';
//titlecase is a signal for a noun

var log = _dereq_('../paths').log;
var path = 'tagger/capital';

var capital_logic = function capital_logic(s) {
  log.here(path);
  //(ignore first word)
  for (var i = 1; i < s.terms.length; i++) {
    var _t = s.terms[i];
    //has a capital, but isn't too weird.
    if (_t.tag.TitleCase && _t.isWord()) {
      _t.tagAs('Noun', 'capital-step');
      _t.tagAs('TitleCase', 'capital-step');
    }
  }
  //support first-word of sentence as proper titlecase
  var t = s.terms[0];
  if (t && t.tag.TitleCase) {
    if (t.tag.Person || t.tag.Organization || t.tag.Place) {
      t.tagAs('TitleCase', 'first-term-capital');
    }
  }
  return s;
};

module.exports = capital_logic;

},{"../paths":209}],215:[function(_dereq_,module,exports){
'use strict';
//identify urls, hashtags, @mentions, emails

var log = _dereq_('../paths').log;
var path = 'tagger/web_step';
// 'Email': Noun,
// 'Url': Noun,
// 'AtMention': Noun,
// 'HashTag': Noun,

var is_email = function is_email(str) {
  if (str.match(/^\w+@\w+\.[a-z]{2,3}$/)) {
    //not fancy
    return true;
  }
  return false;
};

var is_hashtag = function is_hashtag(str) {
  if (str.match(/^#[a-z0-9_]{2,}$/)) {
    return true;
  }
  return false;
};

var is_atmention = function is_atmention(str) {
  if (str.match(/^@\w{2,}$/)) {
    return true;
  }
  return false;
};

var is_url = function is_url(str) {
  //with http/www
  if (str.match(/^(https?:\/\/|www\.)\w+\.[a-z]{2,3}/)) {
    //not fancy
    return true;
  }
  // 'boo.com'
  //http://mostpopularwebsites.net/top-level-domain
  if (str.match(/^[\w\.\/]+\.(com|net|gov|org|ly|edu|info|biz|ru|jp|de|in|uk|br)/)) {
    return true;
  }
  return false;
};

var web_pass = function web_pass(terms) {
  log.here(path);
  for (var i = 0; i < terms.length; i++) {
    var t = terms.get(i);
    var str = t.text.trim().toLowerCase();
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

},{"../paths":209}],216:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var rules = _dereq_('./data/word_rules');
var path = 'tagger/suffix';

var suffix_step = function suffix_step(s) {
  log.here(path);
  s.terms.forEach(function (t) {
    //do normalized rules (on t.normal)
    for (var o = 0; o < rules.length; o++) {
      var r = rules[o];
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

},{"../paths":209,"./data/word_rules":237}],217:[function(_dereq_,module,exports){
'use strict';

var markov = _dereq_('./data/neighbours');
var afterThisWord = markov.afterThisWord;
var beforeThisWord = markov.beforeThisWord;
var beforeThisPos = markov.beforeThisPos;
var afterThisPos = markov.afterThisPos;
var log = _dereq_('../paths').log;
var path = 'tagger/neighbours';

//basically a last-ditch effort before everything falls back to a noun
//for unknown terms, look left + right first, and hit-up the markov-chain for clues
var neighbour_step = function neighbour_step(ts) {
  log.here(path);
  ts.terms.forEach(function (t, n) {
    //is it still unknown?
    var termTags = Object.keys(t.tag);
    if (termTags.length === 0) {
      var lastTerm = ts.terms[n - 1];
      var nextTerm = ts.terms[n + 1];
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
      var tags = [];
      if (lastTerm) {
        tags = Object.keys(lastTerm.tag);
        for (var i = 0; i < tags.length; i++) {
          if (afterThisPos[tags[i]]) {
            t.tagAs(afterThisPos[tags[i]], 'neighbour-after-[' + tags[i] + ']');
            return;
          }
        }
      }
      //look at the next POS for clues
      if (nextTerm) {
        tags = Object.keys(nextTerm.tag);
        for (var _i = 0; _i < tags.length; _i++) {
          if (beforeThisPos[tags[_i]]) {
            t.tagAs(beforeThisPos[tags[_i]], 'neighbour-before-[' + tags[_i] + ']');
            return;
          }
        }
      }
    }
  });

  return ts;
};

module.exports = neighbour_step;

},{"../paths":209,"./data/neighbours":234}],218:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var path = 'tagger/noun_fallback';
//tag word as noun if we know nothing about it, still.

//tags that dont really count
var nothing = {
  TitleCase: true,
  UpperCase: true,
  CamelCase: true
};
//are the tags basically empty
var gotNothing = function gotNothing(t) {
  //fail-fast
  if (t.tag.Noun || t.tag.Verb || t.tag.Adjective) {
    return false;
  }
  var tags = Object.keys(t.tag);
  if (tags.length === 0) {
    return true;
  }
  if (tags.filter(function (tag) {
    return !nothing[tag];
  }).length === 0) {
    return true;
  }
  return false;
};

var noun_fallback = function noun_fallback(s) {
  log.here(path);
  for (var i = 0; i < s.terms.length; i++) {
    var t = s.terms[i];
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

},{"../paths":209}],219:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var path = 'tagger/datePass';

//ambiguous 'may' and 'march'
var months = '(may|march|jan|april|sep)';
var preps = '(in|by|before|for|during|on|until|after|of|within)';
var thisNext = '(last|next|this|previous|current|upcoming|coming)';
var sections = '(start|end|middle|starting|ending|midpoint|beginning)';
// const dayTime = '(night|evening|morning|afternoon|day|daytime)';

// const isDate = (num) => {
//   if (num && num < 31 && num > 0) {
//     return true;
//   }
//   return false;
// };

//ensure a year is approximately typical for common years
//please change in one thousand years
var isYear = function isYear(num) {
  if (num && num > 1000 && num < 3000) {
    return true;
  }
  return false;
};

//non-destructively tag values & prepositions as dates
var datePass = function datePass(ts) {
  log.here(path);

  ts.match('#Month #DateRange+').tag('Date', 'correction-numberRange');
  // ts.match(`#Month #Value to #Value`).tag('Date', 'correction-contraction');

  //months
  ts.match(months + ' (#Determiner|#Value|#Date)').term(0).tag('Month', 'correction-may');
  ts.match('#Date ' + months).term(1).tag('Month', 'correction-may');
  ts.match(preps + ' ' + months).term(1).tag('Month', 'correction-may');
  ts.match('(next|this|last) ' + months).term(1).tag('Month', 'correction-may'); //maybe not 'this'

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
  ts.match(preps + '? ' + thisNext + ' (spring|summer|winter|fall|autumn)').tag('Date', 'thisNext-season');
  ts.match('the? ' + sections + ' of (spring|summer|winter|fall|autumn)').tag('Date', 'section-season');

  //june the 5th
  ts.match('#Date the? #Ordinal').tag('Date', 'correction-date');
  //5th of March
  ts.match('#Value of? #Month').tag('Date', 'value-of-month');
  //5 March
  ts.match('#Cardinal #Month').tag('Date', 'cardinal-month');
  //march 5 to 7
  ts.match('#Month #Value to #Value').tag('Date', 'value-to-value');

  //last month
  ts.match(thisNext + ' #Date').tag('Date', 'thisNext-date');
  //for four days
  ts.match(preps + '? #Value #Duration').tag('Date', 'value-duration');

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
  ts.match('the? ' + sections + ' of #Date').tag('Date', 'section-of-date');

  //year tagging
  var value = ts.match('#Date #Value #Cardinal').lastTerm().values();
  var num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'date-value-year');
  }
  //scoops up a bunch
  value = ts.match('#Date+ #Cardinal').lastTerm().values();
  num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'date-year');
  }
  //feb 8 2018
  value = ts.match('#Month #Value #Cardinal').lastTerm().values();
  num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'date-year2');
  }
  //feb 8 to 10th 2018
  value = ts.match('#Month #Value to #Value #Cardinal').lastTerm().values();
  num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'date-year3');
  }
  //in 1998
  value = ts.match('(in|of|by|during|before|starting|ending|for|year) #Cardinal').lastTerm().values();
  num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'preposition-year');
  }
  //fifth week in 1998
  ts.match('#Duration in #Date').tag('Date', 'duration-in-date');

  return ts;
};

module.exports = datePass;

},{"../paths":209}],220:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var path = 'tagger/auxillary';
//

var auxillary = {
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
  'not': true
};

var corrections = function corrections(ts) {
  log.here(path);
  //set verbs as auxillaries
  for (var i = 0; i < ts.terms.length; i++) {
    var t = ts.terms[i];
    if (auxillary[t.normal] || auxillary[t.silent_term]) {
      var next = ts.terms[i + 1];
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

},{"../paths":209}],221:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var path = 'tagger/negation';

// 'not' is sometimes a verb, sometimes an adjective
var negation_step = function negation_step(ts) {
  log.here(path);
  for (var i = 0; i < ts.length; i++) {
    var t = ts.get(i);
    if (t.normal === 'not' || t.silent_term === 'not') {
      //find the next verb/adjective
      for (var o = i + 1; o < ts.length; o++) {
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

},{"../paths":209}],222:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var phrasals = _dereq_('./data/phrasal_verbs');
var toInfinitive = _dereq_('../../../result/subset/verbs/methods/toInfinitive/index.js');

var path = 'tagger/phrasal';

//words that could be particles
var particles = {
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
  // 'in': true,
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
  'way': true
};

//phrasal verbs are compound verbs like 'beef up'
var phrasals_step = function phrasals_step(ts) {
  log.here(path);
  for (var i = 1; i < ts.length; i++) {
    var t = ts.get(i);
    //is it a particle, like 'up'
    if (particles[t.normal] || t.normal === 'in') {
      //look backwards
      var last = ts.get(i - 1);
      if (last.tag.Verb) {
        var inf = toInfinitive(last);
        if (phrasals[inf + ' ' + t.normal]) {
          t.tagAs('Particle', 'phrasalVerb-particle');
        }
      }
    }
  }
  return ts;
};

module.exports = phrasals_step;

},{"../../../result/subset/verbs/methods/toInfinitive/index.js":149,"../paths":209,"./data/phrasal_verbs":235}],223:[function(_dereq_,module,exports){
'use strict';
//-types of comma-use-
// PlaceComma - Hollywood, California
// List       - cool, fun, and great.
// ClauseEnd  - if so, we do.

//like Toronto, Canada

var isPlaceComma = function isPlaceComma(ts, i) {
  var t = ts.terms[i];
  var nextTerm = ts.terms[i + 1];
  //'australia, canada' is a list
  if (nextTerm && t.tag.Place && !t.tag.Country && nextTerm.tag.Country) {
    return true;
  }
  return false;
};

//adj, noun, or verb
var mainTag = function mainTag(t) {
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

var tagAsList = function tagAsList(ts, start, end) {
  for (var i = start; i <= end; i++) {
    ts.terms[i].tag.List = true;
  }
};

//take the first term with a comma, and test to the right.
//the words with a comma must be the same pos.
var isList = function isList(ts, i) {
  var start = i;
  var tag = mainTag(ts.terms[i]);
  //ensure there's a following comma, and its the same pos
  //then a Conjunction
  var sinceComma = 0;
  var count = 0;
  var hasConjunction = false;
  for (i = i + 1; i < ts.terms.length; i++) {
    var t = ts.terms[i];
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
      if (count > 0 && hasConjunction) {
        //is this the end of the list?
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

var commaStep = function commaStep(ts) {
  //tag the correct punctuation forms
  for (var i = 0; i < ts.terms.length; i++) {
    var t = ts.terms[i];
    var punct = t.endPunctuation();
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
  for (var _i = 0; _i < ts.terms.length; _i++) {
    var _t = ts.terms[_i];
    if (_t.tag.Comma) {
      //if we already got it
      if (_t.tag.List) {
        continue;
      }
      //like 'Hollywood, California'
      if (isPlaceComma(ts, _i)) {
        continue;
      }
      //like 'cold, wet hands'
      if (isList(ts, _i)) {
        continue;
      }
      //otherwise, it's a phrasal comma, like 'you must, if you think so'
      _t.tag.ClauseEnd = true;
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

var blacklist = {
  'it\'s': true,
  'that\'s': true
};

//a possessive means "'s" describes ownership, not a contraction, like 'is'
var is_possessive = function is_possessive(terms, x) {
  var t = terms.get(x);
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
  var nextWord = terms.get(x + 1);
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
var possessiveStep = function possessiveStep(terms) {
  for (var i = 0; i < terms.length; i++) {
    if (is_possessive(terms, i)) {
      var t = terms.get(i);
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

var log = _dereq_('../paths').log;
var path = 'tagger/value';

var value_step = function value_step(ts) {
  log.here(path);
  ts.terms.forEach(function (t) {
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

},{"../paths":209}],226:[function(_dereq_,module,exports){
'use strict';
'use strict';

var log = _dereq_('../paths').log;
var path = 'tagger/acronym_step';

var acronym_step = function acronym_step(ts) {
  log.here(path);
  ts.terms.forEach(function (t) {
    if (t.isAcronym()) {
      t.tagAs('Acronym', 'acronym-step');
    }
  });
  return ts;
};

module.exports = acronym_step;

},{"../paths":209}],227:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../paths').fns;
var emojiReg = _dereq_('./data/emoji_regex');
var emoticon = _dereq_('./data/emoticon_list');
//test for forms like ':woman_tone2:‍:ear_of_rice:'
//https://github.com/Kikobeats/emojis-keywords/blob/master/index.js
var isCommaEmoji = function isCommaEmoji(t) {
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
    return true;
  }
  return false;
};

//check against emoticon whitelist
var isEmoticon = function isEmoticon(t) {
  //normalize the 'eyes'
  var str = t.text.replace(/^[:;]/, ':');
  str = str.replace(/[:;]$/, ':');
  return emoticon[str];
};

//
var emojiStep = function emojiStep(ts) {
  for (var i = 0; i < ts.terms.length; i++) {
    var t = ts.terms[i];
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

},{"../paths":209,"./data/emoji_regex":232,"./data/emoticon_list":233}],228:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var path = 'tagger/person_step';

var titles = _dereq_('../paths').data.titles;
titles = titles.reduce(function (h, str) {
  h[str] = true;
  return h;
}, {});

var person_step = function person_step(ts) {
  log.here(path);
  var reason = 'person-step';
  // x Lastname
  ts.match('#Noun #LastName').firstTerm().canBe('#FirstName').tag('#FirstName', 'noun-lastname');

  // Firstname x (dangerous)
  var tmp = ts.match('#FirstName #Noun').ifNo('^#Possessive').ifNo('#ClauseEnd .');
  tmp.lastTerm().canBe('#LastName').tag('#LastName', 'firstname-noun');

  //j.k Rowling
  ts.match('#Acronym #TitleCase').canBe('#Person').tag('#Person', 'acronym-titlecase');
  ts.match('#Noun van der? #Noun').canBe('#Person').tag('#Person', 'von der noun');
  ts.match('#FirstName de #Noun').canBe('#Person').tag('#Person', 'firstname-de-noun');
  ts.match('(king|queen|prince|saint|lady) of? #Noun').canBe('#Person').tag('#Person', 'king-of-noun');
  ts.match('#FirstName (bin|al) #Noun').canBe('#Person').tag('#Person', 'firstname-al-noun');

  //ambiguous firstnames
  var maybe = ['will', 'may', 'april', 'june', 'said', 'rob', 'wade', 'ray', 'rusty', 'drew', 'miles', 'jack', 'chuck', 'randy', 'jan', 'pat', 'cliff', 'bill'];
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
  //mr X
  ts.match('#Honorific #Acronym').tag('Person', 'Honorific-TitleCase');
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
  for (var i = 0; i < ts.terms.length - 1; i++) {
    var t = ts.terms[i];
    if (titles[t.normal]) {
      if (ts.terms[i + 1] && ts.terms[i + 1].tag.Person) {
        t.tagAs('Person', 'title-person');
      }
    }
  }

  //remove single 'mr'
  ts.match('#Person+').match('^#Honorific$').unTag('Person', 'single-honorific');
  return ts;
};

module.exports = person_step;

},{"../paths":209}],229:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var path = 'tagger/person_step';

var tagSlice = function tagSlice(ts, start, end) {
  ts.terms.slice(start, end + 1).forEach(function (t) {
    t.tagAs('Quotation', 'quotation_step');
  });
};

//tag a inline quotation as such
var quotation_step = function quotation_step(ts) {
  log.here(path);
  for (var i = 0; i < ts.terms.length; i++) {
    var t = ts.terms[i];
    if (t.text.match(/^["'\u201B\u201C\u2033\u201F\u2018]/)) {
      //look for the ending
      for (var o = 0; o < ts.terms.length; o++) {
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

},{"../paths":209}],230:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var path = 'tagger/organization_step';

//orgwords like 'bank' in 'Foo Bank'
var orgWords = _dereq_('../paths').data.orgWords;
orgWords = orgWords.reduce(function (h, str) {
  h[str] = true;
  return h;
}, {});

//could this word be an organization
var maybeOrg = function maybeOrg(t) {
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

var organization_step = function organization_step(ts) {
  log.here(path);
  for (var i = 0; i < ts.terms.length; i++) {
    var t = ts.terms[i];
    if (orgWords[t.normal]) {
      //eg. Toronto University
      var lastTerm = ts.terms[i - 1];
      if (lastTerm && maybeOrg(lastTerm)) {
        lastTerm.tagAs('Organization', 'org-word-1');
        t.tagAs('Organization', 'org-word-2');
        continue;
      }
      //eg. University of Toronto
      var nextTerm = ts.terms[i + 1];
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

},{"../paths":209}],231:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var isPlural = _dereq_('../../../result/subset/nouns/isPlural');
var path = 'tagger/plural';

var pluralStep = function pluralStep(ts) {
  log.here(path);
  for (var i = 0; i < ts.terms.length; i++) {
    var t = ts.terms[i];
    if (t.tag.Noun) {
      //skip existing fast
      if (t.tag.Singular || t.tag.Plural) {
        continue;
      }
      //check if it's plural
      var plural = isPlural(t); //can be null if unknown
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

},{"../../../result/subset/nouns/isPlural":93,"../paths":209}],232:[function(_dereq_,module,exports){
"use strict";

//yep,
//https://github.com/mathiasbynens/emoji-regex/blob/master/index.js
module.exports = /(?:0\u20E3\n1\u20E3|2\u20E3|3\u20E3|4\u20E3|5\u20E3|6\u20E3|7\u20E3|8\u20E3|9\u20E3|#\u20E3|\*\u20E3|\uD83C(?:\uDDE6\uD83C(?:\uDDE8|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDEE|\uDDF1|\uDDF2|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFC|\uDDFD|\uDDFF)|\uDDE7\uD83C(?:\uDDE6|\uDDE7|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDEF|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFB|\uDDFC|\uDDFE|\uDDFF)|\uDDE8\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF5|\uDDF7|\uDDFA|\uDDFB|\uDDFC|\uDDFD|\uDDFE|\uDDFF)|\uDDE9\uD83C(?:\uDDEA|\uDDEC|\uDDEF|\uDDF0|\uDDF2|\uDDF4|\uDDFF)|\uDDEA\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEC|\uDDED|\uDDF7|\uDDF8|\uDDF9|\uDDFA)|\uDDEB\uD83C(?:\uDDEE|\uDDEF|\uDDF0|\uDDF2|\uDDF4|\uDDF7)|\uDDEC\uD83C(?:\uDDE6|\uDDE7|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDF1|\uDDF2|\uDDF3|\uDDF5|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFC|\uDDFE)|\uDDED\uD83C(?:\uDDF0|\uDDF2|\uDDF3|\uDDF7|\uDDF9|\uDDFA)|\uDDEE\uD83C(?:\uDDE8|\uDDE9|\uDDEA|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9)|\uDDEF\uD83C(?:\uDDEA|\uDDF2|\uDDF4|\uDDF5)|\uDDF0\uD83C(?:\uDDEA|\uDDEC|\uDDED|\uDDEE|\uDDF2|\uDDF3|\uDDF5|\uDDF7|\uDDFC|\uDDFE|\uDDFF)|\uDDF1\uD83C(?:\uDDE6|\uDDE7|\uDDE8|\uDDEE|\uDDF0|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFB|\uDDFE)|\uDDF2\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF5|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFB|\uDDFC|\uDDFD|\uDDFE|\uDDFF)|\uDDF3\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEB|\uDDEC|\uDDEE|\uDDF1|\uDDF4|\uDDF5|\uDDF7|\uDDFA|\uDDFF)|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C(?:\uDDE6|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF7|\uDDF8|\uDDF9|\uDDFC|\uDDFE)|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C(?:\uDDEA|\uDDF4|\uDDF8|\uDDFA|\uDDFC)|\uDDF8\uD83C(?:\uDDE6|\uDDE7|\uDDE8|\uDDE9|\uDDEA|\uDDEC|\uDDED|\uDDEE|\uDDEF|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF7|\uDDF8|\uDDF9|\uDDFB|\uDDFD|\uDDFE|\uDDFF)|\uDDF9\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEB|\uDDEC|\uDDED|\uDDEF|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF7|\uDDF9|\uDDFB|\uDDFC|\uDDFF)|\uDDFA\uD83C(?:\uDDE6|\uDDEC|\uDDF2|\uDDF8|\uDDFE|\uDDFF)|\uDDFB\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEC|\uDDEE|\uDDF3|\uDDFA)|\uDDFC\uD83C(?:\uDDEB|\uDDF8)|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C(?:\uDDEA|\uDDF9)|\uDDFF\uD83C(?:\uDDE6|\uDDF2|\uDDFC)))|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD79\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED0\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3]|\uD83E[\uDD10-\uDD18\uDD80-\uDD84\uDDC0]/g;

},{}],233:[function(_dereq_,module,exports){
'use strict';

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

var afterThisWord = {
  i: 'Verb', //44% //i walk..
  first: 'Noun', //50% //first principles..
  it: 'Verb', //33%
  there: 'Verb', //35%
  // to: 'Verb', //32%
  not: 'Verb', //33%
  because: 'Noun', //31%
  'if': 'Noun', //32%
  but: 'Noun', //26%
  who: 'Verb', //40%
  'this': 'Noun', //37%
  his: 'Noun', //48%
  when: 'Noun', //33%
  you: 'Verb', //35%
  very: 'Adjective', // 39%
  old: 'Noun', //51%
  never: 'Verb', //42%
  before: 'Noun' };

//in advance of this word, this is what happens usually
var beforeThisWord = {
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
var afterThisPos = {
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
  Honorific: 'Person' };

//in advance of this POS, this is likely
var beforeThisPos = {
  Copula: 'Noun', //44% //spencer is
  PastTense: 'Noun', //33% //spencer walked
  Conjunction: 'Noun', //36%
  Modal: 'Noun', //38%
  PluperfectTense: 'Noun', //40%
  PerfectTense: 'Verb' };
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

var main = {
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
  'take aback': true
};

//if there's a phrasal verb "keep on", there's often a "keep off"
var opposites = {
  'away': 'back',
  'in': 'out',
  'on': 'off',
  'over': 'under',
  'together': 'apart',
  'up': 'down'
};

//forms that have in/out symmetry
var symmetric = {
  'away': 'blow,bounce,bring,call,come,cut,drop,fire,get,give,go,keep,pass,put,run,send,shoot,switch,take,tie,throw',
  'in': 'bang,barge,bash,beat,block,book,box,break,bring,burn,butt,carve,cash,check,come,cross,drop,fall,fence,fill,give,grow,hand,hang,head,jack,keep,leave,let,lock,log,move,opt,pack,peel,pull,put,reach,ring,rub,send,set,settle,shut,sign,smash,snow,strike,take,try,turn,type,warm,wave,wean,wear,wheel',
  'on': 'add,call,carry,catch,count,feed,get,give,go,grind,head,hold,keep,lay,log,pass,pop,power,put,send,show,snap,switch,take,tell,try,turn,wait',
  'over': 'come,go,look,read,run,talk',
  'together': 'come,pull,put',
  'up': 'add,back,beat,bend,blow,boil,bottle,break,bring,buckle,bulk,bundle,call,carve,clean,cut,dress,fill,flag,fold,get,give,grind,grow,hang,hold,keep,let,load,lock,look,man,mark,melt,move,pack,pin,pipe,plump,pop,power,pull,put,rub,scale,scrape,send,set,settle,shake,show,sit,slow,smash,square,stand,strike,take,tear,tie,top,turn,use,wash,wind'
};
Object.keys(symmetric).forEach(function (k) {
  symmetric[k].split(',').forEach(function (s) {
    //add the given form
    main[s + ' ' + k] = true;
    //add its opposite form
    main[s + ' ' + opposites[k]] = true;
  });
});

//forms that don't have in/out symmetry
var asymmetric = {
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
Object.keys(asymmetric).forEach(function (k) {
  asymmetric[k].split(',').forEach(function (s) {
    main[s + ' ' + k] = true;
  });
});

module.exports = main;

},{}],236:[function(_dereq_,module,exports){
'use strict';

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
['o\'[drlkn].*', 'LastName']].map(function (a) {
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

module.exports = [['^[0-9]+ ?(am|pm)$', 'Date'], ['[0-9](st|nd|rd|r?th)$', 'Ordinal'], //like 5th
['([0-9])([a-z]{1,2})$', 'Cardinal'], //like 5kg
['^[0-9,\.]+$', 'Cardinal'], //like 5
['^[a-z]et$', 'Verb'], ['cede$', 'Infinitive'], ['.[cts]hy$', 'Adjective'], ['.[st]ty$', 'Adjective'], ['.[lnr]ize$', 'Infinitive'], ['.[gk]y$', 'Adjective'], ['.fies$', 'PresentTense'], ['ities$', 'Plural'], ['.some$', 'Adjective'], ['.[nrtumcd]al$', 'Adjective'], ['.que$', 'Adjective'], ['.[tnl]ary$', 'Adjective'], ['.[di]est$', 'Superlative'], ['^(un|de|re)\\-[a-z]..', 'Verb'], ['.lar$', 'Adjective'], ['[bszmp]{2}y', 'Adjective'], ['.zes$', 'PresentTense'], ['.[icldtgrv]ent$', 'Adjective'], ['.[rln]ates$', 'PresentTense'], ['.[oe]ry$', 'Singular'], ['[rdntkbhs]ly$', 'Adverb'], ['.[lsrnpb]ian$', 'Adjective'], ['.[^aeiou]ial$', 'Adjective'], ['.[^aeiou]eal$', 'Adjective'], ['.[vrl]id$', 'Adjective'], ['.[ilk]er$', 'Comparative'], ['.ike$', 'Adjective'], ['.ends?$', 'Verb'], ['.wards$', 'Adverb'], ['.rmy$', 'Adjective'], ['.rol$', 'Singular'], ['.tors$', 'Noun'], ['.azy$', 'Adjective'], ['.where$', 'Adverb'], ['.ify$', 'Infinitive'], ['.bound$', 'Adjective'], ['.[^z]ens$', 'Verb'], ['.oid$', 'Adjective'], ['.vice$', 'Singular'], ['.rough$', 'Adjective'], ['.mum$', 'Adjective'], ['.teen(th)?$', 'Value'], ['.oses$', 'PresentTense'], ['.ishes$', 'PresentTense'], ['.ects$', 'PresentTense'], ['.tieth$', 'Ordinal'], ['.ices$', 'Plural'], ['.tage$', 'Infinitive'], ['.ions$', 'Plural'], ['.tion$', 'Singular'], ['.ean$', 'Adjective'], ['.[ia]sed$', 'Adjective'], ['.urned', 'PastTense'], ['.tized$', 'PastTense'], ['.[aeiou][td]ed', 'PastTense'], ['.llen$', 'Adjective'], ['.fore$', 'Adverb'], ['.ances$', 'Plural'], ['.gate$', 'Infinitive'], ['.nes$', 'PresentTense'], ['.less$', 'Adverb'], ['.ried$', 'Adjective'], ['.gone$', 'Adjective'], ['.made$', 'Adjective'], ['.ing$', 'Gerund'], //likely to be converted to adjective after lexicon pass
['.tures$', 'Plural'], ['.ous$', 'Adjective'], ['.ports$', 'Plural'], ['. so$', 'Adverb'], ['.ints$', 'Plural'], ['.[gt]led$', 'Adjective'], ['.lked$', 'PastTense'], ['.fully$', 'Adverb'], ['.*ould$', 'Modal'], ['^[\-\+]?[0-9]+(\.[0-9]+)?$', 'NumericValue'], ['[a-z]*\\-[a-z]*\\-', 'Adjective'], ['[a-z]\'s$', 'Noun'], ['.\'n$', 'Verb'], ['.\'re$', 'Copula'], ['.\'ll$', 'Modal'], ['.\'t$', 'Verb'], ['.tches$', 'PresentTense'], ['^https?\:?\/\/[a-z0-9]', 'Url'], //the colon is removed in normalisation
['^www\.[a-z0-9]', 'Url'], ['.ize$', 'Infinitive'], ['.[^aeiou]ise$', 'Infinitive'], ['.[aeiou]te$', 'Infinitive'], ['.ea$', 'Singular'], ['[aeiou][pns]er$', 'Singular'], ['.ia$', 'Noun'], ['.sis$', 'Singular'], ['.[aeiou]na$', 'Noun'], ['.[^aeiou]ity$', 'Singular'], ['.[^aeiou]ium$', 'Singular'], ['.[^aeiou][ei]al$', 'Adjective'], ['.ffy$', 'Adjective'], ['.[^aeiou]ic$', 'Adjective'], ['.(gg|bb|zz)ly$', 'Adjective'], ['.[aeiou]my$', 'Adjective'], ['.[^aeiou][ai]ble$', 'Adjective'], ['.[^aeiou]eable$', 'Adjective'], ['.[^aeiou]ful$', 'Adjective'], ['.[^aeiouf]ish$', 'Adjective'], ['.[^aeiou]ica$', 'Singular'], ['[aeiou][^aeiou]is$', 'Singular'], ['[^aeiou]ard$', 'Singular'], ['[^aeiou]ism$', 'Singular'], ['.[^aeiou]ity$', 'Singular'], ['.[^aeiou]ium$', 'Singular'], ['.[lstrn]us$', 'Singular'], ['..ic$', 'Adjective'], ['[aeiou][^aeiou]id$', 'Adjective'], ['.[^aeiou]ive$', 'Adjective'], ['[ea]{2}zy$', 'Adjective'], ['[^aeiou]ician$', 'Actor'], ['.keeper$', 'Actor'], ['.logist$', 'Actor'], ['..ier$', 'Actor'], ['.ettes$', 'Plural'], ['.ette$', 'Singular'], ['.[^aeiou][ao]pher$', 'Actor'], ['.tive$', 'Actor'], ['[aeiou].*ist$', 'Adjective'], ['(over|under)[a-z]{2,}$', 'Adjective'], ['[^i]fer$', 'Infinitive'], ['[aeiou]c?ked$', 'PastTense'], //hooked
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
['.nss?en$', 'LastName']].map(function (a) {
  return {
    reg: new RegExp(a[0]),
    tag: a[1],
    str: a[0]
  };
});

},{}]},{},[41])(41)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
module.exports = {
  generic: require('./generic'),

  subsets: require('./subsets')
};

},{"./generic":3,"./subsets":6}],3:[function(require,module,exports){
'use strict';

//methods on the generic Result prototype
module.exports = {
  inspect: {
    data: {
      desc: 'return a handy array of meta-data for this subset. Default subset is sentences, but it can be anything.',
      example: 'nlp(\'The stage was set for the Alan Parsons Project! Which I believe was some sort of hovercraft.\').data()\n//[{normal:\'the stage was set...\'}]',
      returns: 'array'
    },
    found: {
      desc: 'is the match empty or not',
      returns: 'bool',
      example: 'nlp(\'oh say can you see?\').match(\'see\').found\n//true'
    },
    all: {
      desc: 'zooms-out from a subset back to the whole input',
      returns: 'Text',
      example: 'nlp(\'this is yelling\').verbs().toTitleCase().all().out()\n//this IS yelling'
    },
    debug: {
      desc: 'pretty-print the current selection to the console',
      returns: 'Text',
      example: 'nlp(\'wayne\u2019s world, party time, excellent- weeeyooweeeyoo!\').debug().out()'
    },
    out: {
      desc: 'render parsed data as an output. supports `text`, `normal`, `array`, `html`, `grid`, `color`, `debug`',
      returns: 'Text',
      example: 'nlp(\'you might say there\u2019s a little Uter in all of us\').match(\'#Adjective uter\').out(\'html\')\n//<span><span class="nl-Adjective">little</span>&nbsp;<span class="nl-Person nl-FirstName">Uter</span></span>'
    },
    whitespace: {
      desc: 'set before or after whitespace on each match',
      returns: 'Text',
      example: 'nlp(\'We like Roy! We like Roy!\').whitespace.before(\'   \').out()\n//We like Roy!   We like Roy!'
    },
    normalize: {
      desc: 'transforms whitespace, case, punctuation, contractions and values, so that they are more standard and workable',
      returns: 'Text',
      example: 'nlp(\' so... you like   DONUTS? have all the donuts in the WORLD!!!\').normalize().sentences(0).out()\n//So you like donuts?'
    }
  },
  array: {
    clone: {
      desc: 'copy the object, so changes no longer effect the original (make it ~immutable)',
      returns: 'Text',
      example: 'nlp(\'would somebody please think of the children\').clone().toUpperCase().parent.out()\n//would somebody please think of the children'
    },
    length: {
      desc: 'how many individual matches in the result',
      returns: 'int',
      example: 'nlp(\'jackie kennedy and aristotle onassis\').people().length\n//2'
    },
    slice: {
      desc: 'grab a subset of the results',
      returns: 'Text',
      example: 'nlp(\'Homer, have you been eating that sandwich again?\').terms().slice(0, 3).out()\n//Homer, have you'
    },
    sort: {
      desc: 'set a new ordering for the sentences/results. Accepts `alphabetical`, `chronological`, `length`, `wordcount`, `frequency`',
      returns: 'Text',
      example: 'nlp(\'Larry, Curly, and Moe\').people().sort(\'alphabetical\').out(\'array\')\n//Curly, Larry, Moe'
    },
    concat: {
      desc: 'combine two results into one',
      returns: 'Text',
      example: 'nlp(\'My name is Otto.\').concat(nlp(\'i love to get blotto\')).length()\n//2'
    },
    flatten: {
      desc: 'turn a list of results into one result',
      returns: 'Text',
      example: 'nlp(\'sex cauldron? I thought they closed that place down.\').flatten().length()\n//1'
    }
  },

  case: {
    toTitleCase: {
      desc: 'set the first letter of each term as a capital',
      returns: 'Text',
      example: 'nlp(\'jupiter, pluto and mars\').nouns().toTitleCase().all().out()\n//Jupiter, Pluto and Mars.'
    },
    toUpperCase: {
      desc: 'set all the letters as a capital',
      returns: 'Text',
      example: 'nlp(\'Dental plan. Lisa needs braces.\').match(\'dental .\').toUpperCase().out()\n//DENTAL PLAN.'
    },
    toLowerCase: {
      desc: 'set all the letters as a not-capital. Even acronyms and first-letters of sentences',
      returns: 'Text',
      example: 'nlp(\'Careful! They\u2019re RUFFLED!!\').toLowerCase().out()\n//careful! they\u2019re ruffled!!'
    },
    toCamelCase: {
      desc: 'remove whitespace and titlecase the words',
      returns: 'Text',
      example: 'nlp(\'natural language processing\').toCamelCase().out()\n//NaturalLanguageProcessing'
    }
  },
  punctuation: {
    hyphenate: {
      desc: 'remove whitespace and add a hyphenate between the words',
      returns: 'Text',
      example: 'nlp(\'natural language processing\').hyphenate().out()\n//natural-language-processing'
    },
    dehyphenate: {
      desc: 'remove hyphens and add normal whitespace between words',
      returns: 'Text',
      example: 'nlp(\'natural-language processing\').dehyphenate().out()\n//natural language processing'
    }

  },

  insert: {
    insertBefore: {
      desc: 'append a word (or words) before each match',
      returns: 'Text',
      example: 'nlp(\'stupid flanders\').match(\'flanders\').insertBefore(\'sexy\').all().out()\n//stupid sexy flanders'
    },
    insertAfter: {
      desc: 'append a word (or words) after each match',
      returns: 'Text',
      example: 'nlp(\'i know so many words\').insertAfter(\'bigly\').all().out()\n//i know so many words bigly'
    },
    insertAt: {
      desc: 'insert a word or words at a known index (zero-based)',
      returns: 'Text',
      example: 'nlp(\'so you are from Africa?\').insertAt(2, \'like,\').all().out()\n//so you are like, from africa?'
    }
  },

  replace: {
    replaceWith: {
      desc: 'turn the current selection into something else. Essentially just delete() -> insertAt().',
      returns: 'Text',
      example: 'nlp(\'it was the worst of times\').match(\'worst\').replaceWith(\'blurst\').all().out()\n//it was the blurst of times'
    },
    replace: {
      desc: 'turn a new selection into something else. Essentially just match() -> delete() -> insertAt().',
      returns: 'Text',
      example: 'nlp(\'trust me folks, big league.\').replace(\'big league\',\'bigly\').all().out()\n//trust me folks, bigly.'
    },
    delete: {
      desc: 'remove a match from the Text permanently. For a temporary filter, see `.not()`',
      returns: 'Text',
      example: 'nlp(\'you don\u2019t win friends with salad\').delete(\'do not\').out()\n//you win friends with salad'
    }
  },

  match: {
    match: {
      desc: 'zoom-in to a subset of the text, using a [regex-like syntax](https:\n//github.com/nlp-compromise/compromise/wiki/Match-syntax)',
      returns: 'Text',
      example: 'nlp(\'we understand, we are from the land of chocolate.\').match(\'land of #Noun\').out()\n//land of chocolate'
    },
    not: {
      desc: 'return parts of the text that do not match. Like .match() but opposite.',
      returns: 'Text',
      example: 'nlp(\'wait, there\u2019s a new mexico?\').places().not(\'new\').out()\n//mexico'
    },
    if: {
      desc: 'returns only the sets which contain this match. Like a Array.filter() method, for your results',
      returns: 'Text',
      example: 'nlp(\'We\u2019re here, we\u2019re clear, we don\u2019t want anymore bears.\').clauses().if(\'anymore\').out()\n//we don\'t want anymore bears'
    },
    ifNo: {
      desc: 'removes any sets that have this match',
      returns: 'Text',
      example: 'nlp(\'We\u2019re here, we\u2019re clear, we don\u2019t want anymore bears.\').clauses().ifNo(\'anymore\').out()\n//We\'re here, we\'re clear,'
    }
  },

  split: {
    splitOn: {
      desc: 'split matches into [before, match, after]',
      returns: 'Text',
      example: 'nlp(\'Monorail...Once again! Monorail... Monorail!\').splitOn(\'monorail\').get(0).out()\n//Monorail'
    },
    splitBefore: {
      desc: 'split matches into [before,  match + after]',
      returns: 'Text',
      example: 'nlp(\'Monorail...Once again! Monorail... Monorail!\').splitBefore(\'monorail\').get(0).out()\n//Monorail...Once again!'
    },
    splitAfter: {
      desc: 'split matches into [before + match,  after]',
      returns: 'Text',
      example: 'nlp(\'Monorail...Once again! Monorail... Monorail!\').splitAfter(\'monorail\').get(0).out()\n//Monorail'
    }
  },

  tag: {
    tag: {
      desc: 'set a particular interpretation for these terms. Can tag your match as anything. Supported tags do dependency/conflict logic.',
      returns: 'Text',
      example: 'nlp(\'Michael Apple ate a delicious apple.\').match(\'#FirstName apple\').tag(\'Person\').people().out()\n//Michael Apple'
    },
    unTag: {
      desc: 'remove a particular tag for all these terms.',
      returns: 'Text',
      example: 'nlp(\'they made a catch & scored a run\').match([\'run\',\'catch\']).unTag(\'#Verb\').nouns().out(\'array\')\n//catch, run'
    },
    canBe: {
      desc: 'return only terms that have no conflicts with this tag',
      returns: 'Text',
      example: 'nlp(\'it\u2019s fusilli jerry!\').canBe(\'Person\').out()\n//fusilli jerry'
    }
  }
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = {
  data: {
    desc: 'return a handy array of meta-data for this the contractions in this text',
    example: 'nlp(\' I\u2019d like to request seventeen dollars for a push broom rebristling\').contractions().data()\n//[{text:\'I\'d\'}]',
    returns: 'array'
  },
  expand: {
    desc: 'turn `didn\'t` into `did not`, etc',
    returns: 'Text',
    example: 'nlp(\'He\u2019s the greatest guy in history\').contractions().expand().out(\'\')\n//He is'
  },
  contract: {
    desc: 'turn did not into didn\'t, etc.',
    returns: 'Text',
    example: 'nlp(\'He is about to hit a chestnut tree\').contractions().contract().out(\'\')\n//He\'s'
  },
  contracted: {
    desc: 'show only the contractions that are currently contracted -eg. `i\'ll` but not `i will`',
    returns: 'Text',
    example: 'nlp(\'Lisa, I\u2019d like to buy your rock.\').contractions().contracted().out(\'\')\n//I\'d'
  },
  expanded: {
    desc: 'show only the contractions that are currently not contracted -eg. `he would` but not `he\'d`',
    returns: 'Text',
    example: 'nlp(\'Lisa, I would like to buy your rock.\').contractions().expanded().out(\'\')\n//I would'
  }
};

},{}],5:[function(require,module,exports){
'use strict';
module.exports = {
  data: {
    desc: 'return an array of meta-data about the dates and times in this text',
    example: 'nlp(\'Finally, I just stopped caring. Luckily for me, it was 1980 and no one noticed.\').dates().data()\n//[{text:\'1980\'}]',
    returns: 'array'
  },
  toShortForm: {
    desc: 'turn \'Thurs\' and \'Sept\' into `Thursday` and `September`',
    returns: 'Text',
    example: 'nlp(\'April, June, and Sept\').dates().toShortForm().all().out()\n//Apr, Jun, and Sept'
  },
  toLongForm: {
    desc: 'turn `Thursday` and `September` into \'Thurs\' and \'Sept\'',
    returns: 'Text',
    example: 'nlp(\'April, June, and Sept\').dates().toShortForm().all().out()\n//April, June, and September'
  }
};

},{}],6:[function(require,module,exports){
'use strict';

module.exports = {
  contractions: require('./contractions'),
  dates: require('./dates'),
  ngrams: require('./ngrams'),
  nouns: require('./nouns'),
  sentences: require('./sentences'),
  people: require('./people'),
  values: require('./values'),
  verbs: require('./verbs'),

  acronyms: {
    data: {
      desc: 'return an array of meta-data for the acronyms in this text',
      example: 'nlp(\'In the USA, the big CIA. The Bloods and the Crips, and the KKK.\').acronyms().data()\n//[{text:\'USA\'...}]',
      returns: 'array'
    }
  },

  adjectives: {
    data: {
      desc: 'return an array of meta-data for the adjectives and their adverbs',
      example: 'nlp(\'Guys, we have to assume our guns are useless. Throw them in the lake.\').adjectives().data()\n//[{text:\'useless\'}]',
      returns: 'array'
    }
  },

  adverbs: {
    data: {
      desc: 'return an array of meta-data for the adverbs in this text',
      example: 'nlp(\'truly, madly, deeply\').adverbs().data()\n//[{text:\'truly\'...}]',
      returns: 'array'
    }
  },

  clauses: {
    data: {
      desc: 'return an array of words split by sentence phrase (clause)',
      example: 'nlp(\'All right, Colossus, you\u2019re free to go, but stay away from Death Mountain\').clauses().data()\n//[{normal:\'all right\'}, {normal:\'Colossus\'}, {normal:\'you\'re free to go\'},]',
      returns: 'array'
    }
  },

  hashTags: {
    data: {
      desc: 'return an array of parsed hashtags used in the text',
      example: 'nlp(\'oh, but where is the #anykey\').hashTags().data()\n//[{normal:\'anykey\'}]',
      returns: 'array'
    }
  },

  startGrams: {
    data: {
      desc: 'return an array of subsequences beginning at the start of each sentence or match',
      example: 'nlp(\'Who controls the British crown? Who keeps the metric system down?\').startGrams().data()\n//[{normal:\'who\', size:1, count:2}...]',
      returns: 'array'
    }
  },
  endGrams: {
    data: {
      desc: 'return an array of subsequences ending at the end of each sentence or match',
      example: 'nlp(\'you think that\u2019s a knife? I\u2019ll show you a knife.\').endGrams().data()\n//[{normal:\'knife\', count:2, size:1}...]',
      returns: 'array'
    }
  },

  organizations: {
    data: {
      desc: 'return an array of named-organizations in this text',
      example: 'nlp(\'Your dreams may vary from those of Globex Corporation, its subsidiaries and shareholders.\').organizations().data()\n//[{text:\'Globex Corporation\'}]',
      returns: 'array'
    }
  },

  phoneNumbers: {
    data: {
      desc: 'return an array of parsed phonenumbers in this text',
      example: 'nlp(\'Moe Sizlak. That\u2019s right. I\u2019m a surgeon. (800) 555-0000.\').phoneNumbers().data()\n//[{text:\'(800) 555-0000\'}]',
      returns: 'array'
    }
  },

  places: {
    data: {
      desc: 'return an array of locations mentioned in this text',
      example: 'nlp(\'you could still go to McGill, the Harvard of Canada!\').places().data()\n//[{normal:\'canada\'}]',
      returns: 'array'
    }
  },

  questions: {
    data: {
      desc: 'return an array of question sentences in this text',
      example: 'nlp(\'are you saying boo, or boo-urns?\').questions().data().length\n//1',
      returns: 'array'
    }
  },

  quotations: {
    data: {
      desc: 'return an array of meta-data with the parsed quoations',
      example: 'nlp(\'the he said "crazy like a fox!".\').quotations().data().length\n//1',
      returns: 'array'
    }
  },

  statements: {
    data: {
      desc: 'return an array of sentences that are not questions',
      example: 'nlp(\'i was saying boo-urns.\').statements().data()\n//[{normal:\'i was saying boo-urns\'}]',
      returns: 'array'
    }
  },

  terms: {
    data: {
      desc: 'split all words into individual results, and return their metadata',
      example: 'nlp(\'we should all be more like little Ruttiger\').terms().data()\n//[{text:\'we\'}, {text:\'should\'}...]',
      returns: 'array'
    }
  },

  topics: {
    data: {
      desc: 'return the people, places, and organizations of this text',
      example: 'nlp(\'Hey everybody, I\u2019m lookin\u2019 for Amanda Hugginkiss\').topics().data()\n//[{text:\'Amanda Hugginkiss\'}]',
      returns: 'array'
    }
  },

  urls: {
    data: {
      desc: 'return an array of urls mentioned in this text',
      example: 'nlp(\'\uD83D\uDC4F http://simpsons.wikia.com\').urls().data()\n//[{text:\'http://simpsons.wikia.com\'}]',
      returns: 'array'
    }
  }

};

},{"./contractions":4,"./dates":5,"./ngrams":7,"./nouns":8,"./people":9,"./sentences":10,"./values":11,"./verbs":12}],7:[function(require,module,exports){
'use strict';

module.exports = {
  data: {
    desc: 'return a handy array of meta-data for the n-grams in this text',
    example: 'nlp(\'love love me do.\').ngrams().data()\n//[{text:\'love\', count:2, size:1}..]',
    returns: 'array'
  },
  unigrams: {
    desc: 'return only the ngrams of size 1',
    returns: 'Text',
    example: 'nlp(\'University of Toronto, in toronto\').ngrams().unigrams(0).data()\n//[{normal:\'toronto\', count:2, size:1}]'
  },
  bigrams: {
    desc: 'return only the ngrams of size 2',
    returns: 'Text',
    example: 'nlp(\'The University of Ryerson and University of Toronto, in toronto\').ngrams().bigrams(0).data()\n//[{normal:\'university of\', count:2, size:2}]'
  },
  trigrams: {
    desc: 'return only the ngrams of size 3',
    returns: 'Text',
    example: 'nlp(\'we like Roy! we like Roy!\').ngrams().trigrams(0).data()\n//[{normal:\'we like roy\', count:2, size:3}]'
  },
  sort: {
    desc: 'the default sort for ngrams - count, then size, then character length. (called by default)',
    returns: 'Text',
    example: 'nlp(\'i scream, you scream, we all scream for icecream.\').ngrams().sort().first().out()\n//scream'
  }
};

},{}],8:[function(require,module,exports){
'use strict';

module.exports = {
  data: {
    desc: 'return a handy array of meta-data for the nouns in this text',
    example: 'nlp(\'Lunchlady Doris, have you got any grease?\').nouns().data()\n//[{text:\'Lunchlady Doris\'}, {text:\'grease\'}]',
    returns: 'array'
  },
  isPlural: {
    desc: 'return only the plural nouns',
    returns: 'Text',
    example: 'nlp(\'All my life I\u2019ve had one dream, to accomplish my many goals.\').nouns().isPlural().out()\n//goals'
  },
  hasPlural: {
    desc: 'return only the nouns which can be plural (sometimes called \'countable\' nouns)',
    returns: 'Text',
    example: 'nlp(\'bring joy to the air, water, earth, and sky.\').nouns().hasPlural().length()\n//0'
  },
  toPlural: {
    desc: 'transform singular nouns into their plural (inflected) forms',
    returns: 'Text',
    example: 'nlp(\'the purple dinosaur\').nouns().toPlural().all().out()\n//the purple dinosaurs'
  },
  toSingular: {
    desc: 'transform plural nouns into their singular forms',
    returns: 'Text',
    example: 'nlp(\'the king\u2019s men\').nouns().toSingular().out()\n//the king\'s man'
  }

};

},{}],9:[function(require,module,exports){
'use strict';
module.exports = {
  data: {
    desc: 'return a handy array of meta-data of people mentioned in the text',
    example: 'nlp(\'The bong-rattling bass of Mel Schacher? The competent drum work of Don Brewer?\').people().data()\n//[{text:\' Mel Schacher\'}, {text:\'Don Brewer\'}]',
    returns: 'array'
  },
  pronoun: {
    desc: 'find the pronoun used to refer to the person, or suggest one based on their inferred gender.',
    returns: 'String',
    example: 'nlp(\'Tony Hawk did a 900\').people().pronoun()\n//\'he\''
  }
};

},{}],10:[function(require,module,exports){
'use strict';

module.exports = {
  data: {
    desc: 'return a handy array of meta-data for the sentences in this text',
    example: 'nlp(\'hi everybody! Hi Dr. Nick!\').sentences().data().length\n//[{normal:\'hi everybody\'}, {normal:\'hi dr nick\'}]',
    returns: 'array'
  },
  prepend: {
    desc: 'add a word (or words) at the beginning of these sentences, and move the sentnece\'s titlecase appropriately',
    returns: 'Text',
    example: 'nlp(\'I know so many words.\').sentences().prepend(\'believe me\').out()\n//Believe me, I know so many words.'
  },
  append: {
    desc: 'add a word (or words) at the end of these sentences, and move the sentnece\'s punctuation appropriately',
    returns: 'Text',
    example: 'nlp(\'I know so many words.\').sentences().append(\'big league\').out()\n//I know so many words big league.'
  },
  toPastTense: {
    desc: 'transform the sentences so that they are in the past tense',
    returns: 'Text',
    example: 'nlp(\'I pay the Homer tax.\').sentences().toPastTense().out()\n//I paid the Homer tax.'
  },
  toPresentTense: {
    desc: 'transform the sentences so that they are in the present tense',
    returns: 'Text',
    example: 'nlp(\'I paid the Homer tax.\').sentences().toPresentTense().out()\n//I pay the Homer tax.'
  },
  toFutureTense: {
    desc: 'transform the sentences so that they are in the future tense',
    returns: 'Text',
    example: 'nlp(\'That\u2019s the home-owner tax.\').sentences().toFutureTense().out()\n//That will be the home-owner tax'
  },
  toNegative: {
    desc: 'turn the sentence negative, so that it means the opposite thing',
    returns: 'Text',
    example: 'nlp(\'Now make like my pants, and split.\').sentences(0).toNegative().out()\n//Now do not make like my pants, and split.'
  },
  toPositive: {
    desc: 'if the sentence is negatively-stated, make it say the opposite thing',
    returns: 'Text',
    example: 'nlp(\'The goggles do nothing!\').sentences().toPositive().out()\n//The goggles do everything!'
  },
  isPassive: {
    desc: 'return only sentences that are passive-tense',
    returns: 'Text',
    example: 'nlp(\'you were saved by the bell\').sentences().isPassive().out()\n//you were saved by the bell'
  },
  toExclamation: {
    desc: 'replace the sentence\'s end punctuation with an exclamation point',
    returns: 'Text',
    example: 'nlp(\'sweet balls of fire?\').sentences().toExclamation().out()\n//sweet balls of fire!'
  },
  toQuestion: {
    desc: 'turn the sentence into a question',
    returns: 'Text',
    example: 'nlp(\'Stupider like a fox.\').sentences().toQuestion().out()\n//Stupider like a fox?'
  },
  toStatement: {
    desc: 'turn the sentence into a statement. Replace it\'s end punctuation with a period',
    returns: 'Text',
    example: 'nlp(\'Go out on a Tuesday? Who am I, Charlie Sheen?\').sentences(0).toStatement().out()\n//Go out on a Tuesday. Who am I, Charlie Sheen?'
  }
};

},{}],11:[function(require,module,exports){
'use strict';

module.exports = {
  data: {
    desc: 'return a handy array of meta-data for the numbers and values in this text',
    example: 'nlp(\'I\u2019d like to request seventeen dollars for a push broom rebristling\').values().data()\n//[{number:17, TextValue:{ Ordinal:\'seventeenth\'}, NumericValue:{ Ordinal:\'17th\'}} ]',
    returns: 'array'
  },
  noDates: {
    desc: 'remove numbers that are also dates, like in \'June 5th 1999\'.',
    returns: 'Text',
    example: 'nlp(\'in 2016, I\u2019m going to party like it\u2019s on sale for $19.99.\').values().noDates().length\n//1'
  },
  toNumber: {
    desc: 'turn a written number like `five thousand five hundred` into it\'s numerical form, like `5500`',
    returns: 'Text',
    example: 'nlp(\'ten things i hate about you\').values().toNumber().all().out()\n//10 things i hate about you'
  },
  toTextValue: {
    desc: 'turn a number like `5,500` into it\'s textual form, like `five thousand five hundred`',
    returns: 'Text',
    example: 'nlp(\'10 things i hate about you\').values().toTextValue().all().out()\n//ten things i hate about you'
  },
  toNiceNumber: {
    desc: 'turn a number into numerical form, but with nice commas, like `5,500`',
    returns: 'Text',
    example: 'nlp(\'five hundred sixty two thousand, four hundred and seven\').values().toTextValue().all().out()\n//\'562,407\''
  },
  toCardinal: {
    desc: 'turn `fifth` into `five`, and `5th` into `5`',
    returns: 'Text',
    example: 'nlp(\'twenty-third of december\').values().toCardinal().all().out()\n//23rd of december'
  },
  toOrdinal: {
    desc: 'turn `five` into `fifth` and `5` into `5th`',
    returns: 'Text',
    example: 'nlp(\'three strikes\').values().toOrdinal().all().nouns().toSingular().all().out()\n//third strike'
  },
  numbers: {
    desc: 'return the actual javascript integers (or floats)',
    returns: 'Array',
    example: 'nlp(\'at the seven eleven\').values().numbers()\n// [7, 11]'
  }
};

},{}],12:[function(require,module,exports){
'use strict';

module.exports = {
  data: {
    desc: 'return a handy array of meta-data for the verbs and their auxillaries in this text',
    example: 'nlp(\'he will have been walking quickly\').verbs().data()\n//[{verb:\'walking\', auxillary:\'will have been\', adverb:\'quickly\'}]\n',
    returns: 'array'
  },
  conjugation: {
    desc: 'which form of is the verb in currently? PastTense, PresentTense, Infinitive, etc',
    returns: 'String',
    example: 'nlp(\'My cat\u2019s breath smells like cat food\').verbs().conjugation()\n//[\'PresentTense\']\n'
  },
  conjugate: {
    desc: 'blast-out all conjugated forms of these verbs',
    returns: 'Array',
    example: 'nlp(\'she walked the walk\').verbs().conjugate()\n//[{Infinitive:\'walk\', ...}]\n'
  },

  isSingular: {
    desc: 'return only the verbs that are singular, like \'is\' but not \'are\'',
    returns: 'Text',
    example: 'nlp(\'we were discussing Wittgenstein over a game of backgammon\').verbs().isSingular().out(\'array\')\n//[{text:\'were discussing\'}]\n'
  },
  isPlural: {
    desc: 'return only the verbs that are plural, like \'are\' but not \'is\'',
    returns: 'Text',
    example: 'nlp(\'We were sitting in Barney\u2019s car\').verbs().isPlural().out(\'array\')\n//[]\n'
  },

  isPositive: {
    desc: 'return only the verbs that are not negative, like \'would sing\' but not \'would not sing\'',
    returns: 'Text',
    example: 'nlp(\'Dear Miss Hoover, you have Lyme disease.\').verbs().isNegative().length()\n    //1\n    '
  },
  isNegative: {
    desc: 'return only the verbs that are negative, like \'would not sing\' but not \'would sing\'',
    returns: 'Text',
    example: 'nlp(\'Dear Miss Hoover, you have Lyme disease.\').verbs().isNegative().length()\n//0\n'
  },
  toNegative: {
    desc: 'make the verbs mean the opposite thing - `walk`->`did not walk` etc',
    returns: 'Text',
    example: 'nlp(\'Dear Miss Hoover, you have Lyme disease.\').verbs().toNegative().out()\n//do not have\n'
  },
  toPositive: {
    desc: 'if the verb is negative, make it not negative',
    returns: 'Text',
    example: 'nlp(\'Dear Miss Hoover, you do not have Lyme disease\').verbs().toPositive().out()\n//have\n'
  },
  toPastTense: {
    desc: 'turn the verb into past tense - `walk`->`walked` etc.',
    returns: 'Text',
    example: 'nlp(\'It tastes like burning.\').verbs().toPastTense().out()\n//tasted\n'
  },
  toPresentTense: {
    desc: 'turn the verb into present tense - `walked`->`walks` etc.',
    returns: 'Text',
    example: 'nlp(\'you ate the sandwich?\').verbs().toPresentTense().out()\n//you eat the sandwich?\n'
  },
  toFutureTense: {
    desc: 'turn the verb into future tense - `walked`->`will walk` etc.',
    returns: 'Text',
    example: 'nlp(\'I\u2019m a furniture! \').verbs().toFutureTense().out()\n//will be'
  },
  asAdjective: {
    desc: 'conjugate the verb to its adjectival form - `walk`->`walkable`',
    returns: 'Array',
    example: 'nlp(\'strain\').verbs().asAdjective()\n//strenuous'
  }
};

},{}],13:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],14:[function(require,module,exports){

},{}],15:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"dup":14}],16:[function(require,module,exports){
(function (global){
'use strict';

var buffer = require('buffer');
var Buffer = buffer.Buffer;
var SlowBuffer = buffer.SlowBuffer;
var MAX_LEN = buffer.kMaxLength || 2147483647;
exports.alloc = function alloc(size, fill, encoding) {
  if (typeof Buffer.alloc === 'function') {
    return Buffer.alloc(size, fill, encoding);
  }
  if (typeof encoding === 'number') {
    throw new TypeError('encoding must not be number');
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  var enc = encoding;
  var _fill = fill;
  if (_fill === undefined) {
    enc = undefined;
    _fill = 0;
  }
  var buf = new Buffer(size);
  if (typeof _fill === 'string') {
    var fillBuf = new Buffer(_fill, enc);
    var flen = fillBuf.length;
    var i = -1;
    while (++i < size) {
      buf[i] = fillBuf[i % flen];
    }
  } else {
    buf.fill(_fill);
  }
  return buf;
}
exports.allocUnsafe = function allocUnsafe(size) {
  if (typeof Buffer.allocUnsafe === 'function') {
    return Buffer.allocUnsafe(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new Buffer(size);
}
exports.from = function from(value, encodingOrOffset, length) {
  if (typeof Buffer.from === 'function' && (!global.Uint8Array || Uint8Array.from !== Buffer.from)) {
    return Buffer.from(value, encodingOrOffset, length);
  }
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof value === 'string') {
    return new Buffer(value, encodingOrOffset);
  }
  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    var offset = encodingOrOffset;
    if (arguments.length === 1) {
      return new Buffer(value);
    }
    if (typeof offset === 'undefined') {
      offset = 0;
    }
    var len = length;
    if (typeof len === 'undefined') {
      len = value.byteLength - offset;
    }
    if (offset >= value.byteLength) {
      throw new RangeError('\'offset\' is out of bounds');
    }
    if (len > value.byteLength - offset) {
      throw new RangeError('\'length\' is out of bounds');
    }
    return new Buffer(value.slice(offset, offset + len));
  }
  if (Buffer.isBuffer(value)) {
    var out = new Buffer(value.length);
    value.copy(out, 0, 0, value.length);
    return out;
  }
  if (value) {
    if (Array.isArray(value) || (typeof ArrayBuffer !== 'undefined' && value.buffer instanceof ArrayBuffer) || 'length' in value) {
      return new Buffer(value);
    }
    if (value.type === 'Buffer' && Array.isArray(value.data)) {
      return new Buffer(value.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ' + 'ArrayBuffer, Array, or array-like object.');
}
exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
  if (typeof Buffer.allocUnsafeSlow === 'function') {
    return Buffer.allocUnsafeSlow(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size >= MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new SlowBuffer(size);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"buffer":17}],17:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"base64-js":13,"ieee754":36,"isarray":40}],18:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
},{"../../is-buffer/index.js":38}],19:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":20,"./lib/keys.js":21}],20:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],21:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],22:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var foreach = require('foreach');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"foreach":32,"object-keys":42}],23:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],24:[function(require,module,exports){
'use strict';

var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');

var sign = require('./helpers/sign');
var mod = require('./helpers/mod');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return Boolean(value);
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// http://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	}
};

module.exports = ES5;

},{"./helpers/isFinite":25,"./helpers/isNaN":26,"./helpers/mod":27,"./helpers/sign":28,"es-to-primitive/es5":29,"is-callable":39}],25:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],26:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],27:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],28:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],29:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};

},{"./helpers/isPrimitive":30,"is-callable":39}],30:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],31:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],32:[function(require,module,exports){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


},{}],33:[function(require,module,exports){
var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],34:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":33}],35:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":34}],36:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],37:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],38:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],39:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],40:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],41:[function(require,module,exports){
var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var booleanValueOf = Boolean.prototype.valueOf;

module.exports = function inspect_ (obj, opts, depth, seen) {
    if (!opts) opts = {};
    
    var maxDepth = opts.depth === undefined ? 5 : opts.depth;
    if (depth === undefined) depth = 0;
    if (depth >= maxDepth && maxDepth > 0 && obj && typeof obj === 'object') {
        return '[Object]';
    }
    
    if (seen === undefined) seen = [];
    else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }
    
    function inspect (value, from) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        return inspect_(value, opts, depth + 1, seen);
    }
    
    if (typeof obj === 'string') {
        return inspectString(obj);
    }
    else if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : '') + ']';
    }
    else if (obj === null) {
        return 'null';
    }
    else if (isSymbol(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? 'Object(' + symString + ')' : symString;
    }
    else if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '="' + quote(attrs[i].value) + '"';
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) s += '...';
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    else if (isArray(obj)) {
        if (obj.length === 0) return '[]';
        var xs = Array(obj.length);
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    else if (isError(obj)) {
        var parts = [];
        for (var key in obj) {
            if (!has(obj, key)) continue;
            
            if (/[^\w$]/.test(key)) {
                parts.push(inspect(key) + ': ' + inspect(obj[key]));
            }
            else {
                parts.push(key + ': ' + inspect(obj[key]));
            }
        }
        if (parts.length === 0) return '[' + obj + ']';
        return '{ [' + obj + '] ' + parts.join(', ') + ' }';
    }
    else if (typeof obj === 'object' && typeof obj.inspect === 'function') {
        return obj.inspect();
    }
    else if (isMap(obj)) {
        var parts = [];
        mapForEach.call(obj, function (value, key) {
            parts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
        });
        return 'Map (' + mapSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (isSet(obj)) {
        var parts = [];
        setForEach.call(obj, function (value ) {
            parts.push(inspect(value, obj));
        });
        return 'Set (' + setSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (typeof obj !== 'object') {
        return String(obj);
    }
    else if (isNumber(obj)) {
        return 'Object(' + Number(obj) + ')';
    }
    else if (isBoolean(obj)) {
        return 'Object(' + booleanValueOf.call(obj) + ')';
    }
    else if (isString(obj)) {
        return 'Object(' + inspect(String(obj)) + ')';
    }
    else if (!isDate(obj) && !isRegExp(obj)) {
        var xs = [], keys = [];
        for (var key in obj) {
            if (has(obj, key)) keys.push(key);
        }
        keys.sort();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (/[^\w$]/.test(key)) {
                xs.push(inspect(key) + ': ' + inspect(obj[key], obj));
            }
            else xs.push(key + ': ' + inspect(obj[key], obj));
        }
        if (xs.length === 0) return '{}';
        return '{ ' + xs.join(', ') + ' }';
    }
    else return String(obj);
};

function quote (s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray (obj) { return toStr(obj) === '[object Array]' }
function isDate (obj) { return toStr(obj) === '[object Date]' }
function isRegExp (obj) { return toStr(obj) === '[object RegExp]' }
function isError (obj) { return toStr(obj) === '[object Error]' }
function isSymbol (obj) { return toStr(obj) === '[object Symbol]' }
function isString (obj) { return toStr(obj) === '[object String]' }
function isNumber (obj) { return toStr(obj) === '[object Number]' }
function isBoolean (obj) { return toStr(obj) === '[object Boolean]' }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has (obj, key) {
    return hasOwn.call(obj, key);
}

function toStr (obj) {
    return Object.prototype.toString.call(obj);
}

function nameOf (f) {
    if (f.name) return f.name;
    var m = f.toString().match(/^function\s*([\w$]+)/);
    if (m) return m[1];
}

function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
    }
    return -1;
}

function isMap (x) {
    if (!mapSize) {
        return false;
    }
    try {
        mapSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet (x) {
    if (!setSize) {
        return false;
    }
    try {
        setSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isElement (x) {
    if (!x || typeof x !== 'object') return false;
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string'
        && typeof x.getAttribute === 'function'
    ;
}

function inspectString (str) {
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return "'" + s + "'";
    
    function lowbyte (c) {
        var n = c.charCodeAt(0);
        var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
        if (x) return '\\' + x;
        return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
    }
}

},{}],42:[function(require,module,exports){
'use strict';

// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = require('./isArguments');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./isArguments":43}],43:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],44:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":46}],45:[function(require,module,exports){
(function (process){
'use strict';

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

}).call(this,require('_process'))
},{"_process":46}],46:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],47:[function(require,module,exports){
module.exports = require("./lib/_stream_duplex.js")

},{"./lib/_stream_duplex.js":48}],48:[function(require,module,exports){
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}
},{"./_stream_readable":50,"./_stream_writable":52,"core-util-is":18,"inherits":37,"process-nextick-args":45}],49:[function(require,module,exports){
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":51,"core-util-is":18,"inherits":37}],50:[function(require,module,exports){
(function (process){
'use strict';

module.exports = Readable;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream;
(function () {
  try {
    Stream = require('st' + 'ream');
  } catch (_) {} finally {
    if (!Stream) Stream = require('events').EventEmitter;
  }
})();
/*</replacement>*/

var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var StringDecoder;

util.inherits(Readable, Stream);

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options && typeof options.read === 'function') this._read = options.read;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;

  if (!state.objectMode && typeof chunk === 'string') {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = bufferShim.from(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error('stream.unshift() after end event');
      stream.emit('error', _e);
    } else {
      var skipAdd;
      if (state.decoder && !addToFront && !encoding) {
        chunk = state.decoder.write(chunk);
        skipAdd = !state.objectMode && chunk.length === 0;
      }

      if (!addToFront) state.reading = false;

      // Don't add to the buffer if we've decoded to an empty string chunk and
      // we're not in object mode
      if (!skipAdd) {
        // if we want the data now, just emit it.
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit('data', chunk);
          stream.read(0);
        } else {
          // update the buffer info.
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

          if (state.needReadable) emitReadable(stream);
        }
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function (ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = bufferShim.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
}).call(this,require('_process'))
},{"./_stream_duplex":48,"./internal/streams/BufferList":53,"_process":46,"buffer":17,"buffer-shims":16,"core-util-is":18,"events":31,"inherits":37,"isarray":40,"process-nextick-args":45,"string_decoder/":64,"util":14}],51:[function(require,module,exports){
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":48,"core-util-is":18,"inherits":37}],52:[function(require,module,exports){
(function (process){
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

module.exports = Writable;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream;
(function () {
  try {
    Stream = require('st' + 'ream');
  } catch (_) {} finally {
    if (!Stream) Stream = require('events').EventEmitter;
  }
})();
/*</replacement>*/

var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

util.inherits(Writable, Stream);

function nop() {}

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;
  // Always throw error if a null is written
  // if we are not in object mode then throw
  // if it is not a buffer, string, or undefined.
  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = bufferShim.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);

  if (Buffer.isBuffer(chunk)) encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) processNextTick(cb, er);else cb(er);

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
        afterWrite(stream, state, finished, cb);
      }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function (err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = _this;
    } else {
      state.corkedRequestsFree = _this;
    }
  };
}
}).call(this,require('_process'))
},{"./_stream_duplex":48,"_process":46,"buffer":17,"buffer-shims":16,"core-util-is":18,"events":31,"inherits":37,"process-nextick-args":45,"util-deprecate":70}],53:[function(require,module,exports){
'use strict';

var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

module.exports = BufferList;

function BufferList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

BufferList.prototype.push = function (v) {
  var entry = { data: v, next: null };
  if (this.length > 0) this.tail.next = entry;else this.head = entry;
  this.tail = entry;
  ++this.length;
};

BufferList.prototype.unshift = function (v) {
  var entry = { data: v, next: this.head };
  if (this.length === 0) this.tail = entry;
  this.head = entry;
  ++this.length;
};

BufferList.prototype.shift = function () {
  if (this.length === 0) return;
  var ret = this.head.data;
  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
  --this.length;
  return ret;
};

BufferList.prototype.clear = function () {
  this.head = this.tail = null;
  this.length = 0;
};

BufferList.prototype.join = function (s) {
  if (this.length === 0) return '';
  var p = this.head;
  var ret = '' + p.data;
  while (p = p.next) {
    ret += s + p.data;
  }return ret;
};

BufferList.prototype.concat = function (n) {
  if (this.length === 0) return bufferShim.alloc(0);
  if (this.length === 1) return this.head.data;
  var ret = bufferShim.allocUnsafe(n >>> 0);
  var p = this.head;
  var i = 0;
  while (p) {
    p.data.copy(ret, i);
    i += p.data.length;
    p = p.next;
  }
  return ret;
};
},{"buffer":17,"buffer-shims":16}],54:[function(require,module,exports){
module.exports = require("./lib/_stream_passthrough.js")

},{"./lib/_stream_passthrough.js":49}],55:[function(require,module,exports){
(function (process){
var Stream = (function (){
  try {
    return require('st' + 'ream'); // hack to fix a circular dependency issue when used with browserify
  } catch(_){}
}());
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = Stream || exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

if (!process.browser && process.env.READABLE_STREAM === 'disable' && Stream) {
  module.exports = Stream;
}

}).call(this,require('_process'))
},{"./lib/_stream_duplex.js":48,"./lib/_stream_passthrough.js":49,"./lib/_stream_readable.js":50,"./lib/_stream_transform.js":51,"./lib/_stream_writable.js":52,"_process":46}],56:[function(require,module,exports){
module.exports = require("./lib/_stream_transform.js")

},{"./lib/_stream_transform.js":51}],57:[function(require,module,exports){
module.exports = require("./lib/_stream_writable.js")

},{"./lib/_stream_writable.js":52}],58:[function(require,module,exports){
(function (process){
var through = require('through');
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = function (write, end) {
    var tr = through(write, end);
    tr.pause();
    var resume = tr.resume;
    var pause = tr.pause;
    var paused = false;
    
    tr.pause = function () {
        paused = true;
        return pause.apply(this, arguments);
    };
    
    tr.resume = function () {
        paused = false;
        return resume.apply(this, arguments);
    };
    
    nextTick(function () {
        if (!paused) tr.resume();
    });
    
    return tr;
};

}).call(this,require('_process'))
},{"_process":46,"through":69}],59:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":31,"inherits":37,"readable-stream/duplex.js":47,"readable-stream/passthrough.js":54,"readable-stream/readable.js":55,"readable-stream/transform.js":56,"readable-stream/writable.js":57}],60:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var ES = require('es-abstract/es5');
var replace = bind.call(Function.call, String.prototype.replace);

var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;

module.exports = function trim() {
	var S = ES.ToString(ES.CheckObjectCoercible(this));
	return replace(replace(S, leftWhitespace, ''), rightWhitespace, '');
};

},{"es-abstract/es5":24,"function-bind":34}],61:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var boundTrim = bind.call(Function.call, getPolyfill());

define(boundTrim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundTrim;

},{"./implementation":60,"./polyfill":62,"./shim":63,"define-properties":22,"function-bind":34}],62:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":60}],63:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":62,"define-properties":22}],64:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = require('buffer').Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}

},{"buffer":17}],65:[function(require,module,exports){
(function (process){
var defined = require('defined');
var createDefaultStream = require('./lib/default_stream');
var Test = require('./lib/test');
var createResult = require('./lib/results');
var through = require('through');

var canEmitExit = typeof process !== 'undefined' && process
    && typeof process.on === 'function' && process.browser !== true
;
var canExit = typeof process !== 'undefined' && process
    && typeof process.exit === 'function'
;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

exports = module.exports = (function () {
    var harness;
    var lazyLoad = function () {
        return getHarness().apply(this, arguments);
    };
    
    lazyLoad.only = function () {
        return getHarness().only.apply(this, arguments);
    };
    
    lazyLoad.createStream = function (opts) {
        if (!opts) opts = {};
        if (!harness) {
            var output = through();
            getHarness({ stream: output, objectMode: opts.objectMode });
            return output;
        }
        return harness.createStream(opts);
    };
    
    lazyLoad.onFinish = function () {
        return getHarness().onFinish.apply(this, arguments);
    };

    lazyLoad.getHarness = getHarness

    return lazyLoad

    function getHarness (opts) {
        if (!opts) opts = {};
        opts.autoclose = !canEmitExit;
        if (!harness) harness = createExitHarness(opts);
        return harness;
    }
})();

function createExitHarness (conf) {
    if (!conf) conf = {};
    var harness = createHarness({
        autoclose: defined(conf.autoclose, false)
    });
    
    var stream = harness.createStream({ objectMode: conf.objectMode });
    var es = stream.pipe(conf.stream || createDefaultStream());
    if (canEmitExit) {
        es.on('error', function (err) { harness._exitCode = 1 });
    }
    
    var ended = false;
    stream.on('end', function () { ended = true });
    
    if (conf.exit === false) return harness;
    if (!canEmitExit || !canExit) return harness;

    var inErrorState = false;

    process.on('exit', function (code) {
        // let the process exit cleanly.
        if (code !== 0) {
            return
        }

        if (!ended) {
            var only = harness._results._only;
            for (var i = 0; i < harness._tests.length; i++) {
                var t = harness._tests[i];
                if (only && t.name !== only) continue;
                t._exit();
            }
        }
        harness.close();
        process.exit(code || harness._exitCode);
    });
    
    return harness;
}

exports.createHarness = createHarness;
exports.Test = Test;
exports.test = exports; // tap compat
exports.test.skip = Test.skip;

var exitInterval;

function createHarness (conf_) {
    if (!conf_) conf_ = {};
    var results = createResult();
    if (conf_.autoclose !== false) {
        results.once('done', function () { results.close() });
    }
    
    var test = function (name, conf, cb) {
        var t = new Test(name, conf, cb);
        test._tests.push(t);
        
        (function inspectCode (st) {
            st.on('test', function sub (st_) {
                inspectCode(st_);
            });
            st.on('result', function (r) {
                if (!r.ok && typeof r !== 'string') test._exitCode = 1
            });
        })(t);
        
        results.push(t);
        return t;
    };
    test._results = results;
    
    test._tests = [];
    
    test.createStream = function (opts) {
        return results.createStream(opts);
    };

    test.onFinish = function (cb) {
        results.on('done', cb);
    };
    
    var only = false;
    test.only = function (name) {
        if (only) throw new Error('there can only be one only test');
        results.only(name);
        only = true;
        return test.apply(null, arguments);
    };
    test._exitCode = 0;
    
    test.close = function () { results.close() };
    
    return test;
}

}).call(this,require('_process'))
},{"./lib/default_stream":66,"./lib/results":67,"./lib/test":68,"_process":46,"defined":23,"through":69}],66:[function(require,module,exports){
(function (process){
var through = require('through');
var fs = require('fs');

module.exports = function () {
    var line = '';
    var stream = through(write, flush);
    return stream;
    
    function write (buf) {
        for (var i = 0; i < buf.length; i++) {
            var c = typeof buf === 'string'
                ? buf.charAt(i)
                : String.fromCharCode(buf[i])
            ;
            if (c === '\n') flush();
            else line += c;
        }
    }
    
    function flush () {
        if (fs.writeSync && /^win/.test(process.platform)) {
            try { fs.writeSync(1, line + '\n'); }
            catch (e) { stream.emit('error', e) }
        }
        else {
            try { console.log(line) }
            catch (e) { stream.emit('error', e) }
        }
        line = '';
    }
};

}).call(this,require('_process'))
},{"_process":46,"fs":15,"through":69}],67:[function(require,module,exports){
(function (process){
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
var through = require('through');
var resumer = require('resumer');
var inspect = require('object-inspect');
var bind = require('function-bind');
var has = require('has');
var regexpTest = bind.call(Function.call, RegExp.prototype.test);
var yamlIndicators = /\:|\-|\?/;
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = Results;
inherits(Results, EventEmitter);

function Results () {
    if (!(this instanceof Results)) return new Results;
    this.count = 0;
    this.fail = 0;
    this.pass = 0;
    this._stream = through();
    this.tests = [];
}

Results.prototype.createStream = function (opts) {
    if (!opts) opts = {};
    var self = this;
    var output, testId = 0;
    if (opts.objectMode) {
        output = through();
        self.on('_push', function ontest (t, extra) {
            if (!extra) extra = {};
            var id = testId++;
            t.once('prerun', function () {
                var row = {
                    type: 'test',
                    name: t.name,
                    id: id
                };
                if (has(extra, 'parent')) {
                    row.parent = extra.parent;
                }
                output.queue(row);
            });
            t.on('test', function (st) {
                ontest(st, { parent: id });
            });
            t.on('result', function (res) {
                res.test = id;
                res.type = 'assert';
                output.queue(res);
            });
            t.on('end', function () {
                output.queue({ type: 'end', test: id });
            });
        });
        self.on('done', function () { output.queue(null) });
    }
    else {
        output = resumer();
        output.queue('TAP version 13\n');
        self._stream.pipe(output);
    }
    
    nextTick(function next() {
        var t;
        while (t = getNextTest(self)) {
            t.run();
            if (!t.ended) return t.once('end', function(){ nextTick(next); });
        }
        self.emit('done');
    });
    
    return output;
};

Results.prototype.push = function (t) {
    var self = this;
    self.tests.push(t);
    self._watch(t);
    self.emit('_push', t);
};

Results.prototype.only = function (name) {
    this._only = name;
};

Results.prototype._watch = function (t) {
    var self = this;
    var write = function (s) { self._stream.queue(s) };
    t.once('prerun', function () {
        write('# ' + t.name + '\n');
    });
    
    t.on('result', function (res) {
        if (typeof res === 'string') {
            write('# ' + res + '\n');
            return;
        }
        write(encodeResult(res, self.count + 1));
        self.count ++;

        if (res.ok) self.pass ++
        else self.fail ++
    });
    
    t.on('test', function (st) { self._watch(st) });
};

Results.prototype.close = function () {
    var self = this;
    if (self.closed) self._stream.emit('error', new Error('ALREADY CLOSED'));
    self.closed = true;
    var write = function (s) { self._stream.queue(s) };
    
    write('\n1..' + self.count + '\n');
    write('# tests ' + self.count + '\n');
    write('# pass  ' + self.pass + '\n');
    if (self.fail) write('# fail  ' + self.fail + '\n')
    else write('\n# ok\n')

    self._stream.queue(null);
};

function encodeResult (res, count) {
    var output = '';
    output += (res.ok ? 'ok ' : 'not ok ') + count;
    output += res.name ? ' ' + res.name.toString().replace(/\s+/g, ' ') : '';
    
    if (res.skip) output += ' # SKIP';
    else if (res.todo) output += ' # TODO';
    
    output += '\n';
    if (res.ok) return output;
    
    var outer = '  ';
    var inner = outer + '  ';
    output += outer + '---\n';
    output += inner + 'operator: ' + res.operator + '\n';
    
    if (has(res, 'expected') || has(res, 'actual')) {
        var ex = inspect(res.expected, {depth: res.objectPrintDepth});
        var ac = inspect(res.actual, {depth: res.objectPrintDepth});
        
        if (Math.max(ex.length, ac.length) > 65 || invalidYaml(ex) || invalidYaml(ac)) {
            output += inner + 'expected: |-\n' + inner + '  ' + ex + '\n';
            output += inner + 'actual: |-\n' + inner + '  ' + ac + '\n';
        }
        else {
            output += inner + 'expected: ' + ex + '\n';
            output += inner + 'actual:   ' + ac + '\n';
        }
    }
    if (res.at) {
        output += inner + 'at: ' + res.at + '\n';
    }
    if (res.operator === 'error' && res.actual && res.actual.stack) {
        var lines = String(res.actual.stack).split('\n');
        output += inner + 'stack: |-\n';
        for (var i = 0; i < lines.length; i++) {
            output += inner + '  ' + lines[i] + '\n';
        }
    }
    
    output += outer + '...\n';
    return output;
}

function getNextTest (results) {
    if (!results._only) {
        return results.tests.shift();
    }
    
    do {
        var t = results.tests.shift();
        if (!t) continue;
        if (results._only === t.name) {
            return t;
        }
    } while (results.tests.length !== 0)
}

function invalidYaml (str) {
    return regexpTest(yamlIndicators, str);
}

}).call(this,require('_process'))
},{"_process":46,"events":31,"function-bind":34,"has":35,"inherits":37,"object-inspect":41,"resumer":58,"through":69}],68:[function(require,module,exports){
(function (process,__dirname){
var deepEqual = require('deep-equal');
var defined = require('defined');
var path = require('path');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var has = require('has');
var trim = require('string.prototype.trim');

module.exports = Test;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;
var safeSetTimeout = setTimeout;

inherits(Test, EventEmitter);

var getTestArgs = function (name_, opts_, cb_) {
    var name = '(anonymous)';
    var opts = {};
    var cb;

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var t = typeof arg;
        if (t === 'string') {
            name = arg;
        }
        else if (t === 'object') {
            opts = arg || opts;
        }
        else if (t === 'function') {
            cb = arg;
        }
    }
    return { name: name, opts: opts, cb: cb };
};

function Test (name_, opts_, cb_) {
    if (! (this instanceof Test)) {
        return new Test(name_, opts_, cb_);
    }

    var args = getTestArgs(name_, opts_, cb_);

    this.readable = true;
    this.name = args.name || '(anonymous)';
    this.assertCount = 0;
    this.pendingCount = 0;
    this._skip = args.opts.skip || false;
    this._timeout = args.opts.timeout;
    this._objectPrintDepth = args.opts.objectPrintDepth || 5;
    this._plan = undefined;
    this._cb = args.cb;
    this._progeny = [];
    this._ok = true;

    for (var prop in this) {
        this[prop] = (function bind(self, val) {
            if (typeof val === 'function') {
                return function bound() {
                    return val.apply(self, arguments);
                };
            }
            else return val;
        })(this, this[prop]);
    }
}

Test.prototype.run = function () {
    if (this._skip) {
        this.comment('SKIP ' + this.name);
    }
    if (!this._cb || this._skip) {
        return this._end();
    }
    if (this._timeout != null) {
        this.timeoutAfter(this._timeout);
    }
    this.emit('prerun');
    this._cb(this);
    this.emit('run');
};

Test.prototype.test = function (name, opts, cb) {
    var self = this;
    var t = new Test(name, opts, cb);
    this._progeny.push(t);
    this.pendingCount++;
    this.emit('test', t);
    t.on('prerun', function () {
        self.assertCount++;
    })
    
    if (!self._pendingAsserts()) {
        nextTick(function () {
            self._end();
        });
    }
    
    nextTick(function() {
        if (!self._plan && self.pendingCount == self._progeny.length) {
            self._end();
        }
    });
};

Test.prototype.comment = function (msg) {
    var that = this;
    trim(msg).split('\n').forEach(function (aMsg) {
        that.emit('result', trim(aMsg).replace(/^#\s*/, ''));
    });
};

Test.prototype.plan = function (n) {
    this._plan = n;
    this.emit('plan', n);
};

Test.prototype.timeoutAfter = function(ms) {
    if (!ms) throw new Error('timeoutAfter requires a timespan');
    var self = this;
    var timeout = safeSetTimeout(function() {
        self.fail('test timed out after ' + ms + 'ms');
        self.end();
    }, ms);
    this.once('end', function() {
        clearTimeout(timeout);
    });
}

Test.prototype.end = function (err) { 
    var self = this;
    if (arguments.length >= 1 && !!err) {
        this.ifError(err);
    }
    
    if (this.calledEnd) {
        this.fail('.end() called twice');
    }
    this.calledEnd = true;
    this._end();
};

Test.prototype._end = function (err) {
    var self = this;
    if (this._progeny.length) {
        var t = this._progeny.shift();
        t.on('end', function () { self._end() });
        t.run();
        return;
    }
    
    if (!this.ended) this.emit('end');
    var pendingAsserts = this._pendingAsserts();
    if (!this._planError && this._plan !== undefined && pendingAsserts) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount
        });
    }
    this.ended = true;
};

Test.prototype._exit = function () {
    if (this._plan !== undefined &&
        !this._planError && this.assertCount !== this._plan) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount,
            exiting : true
        });
    }
    else if (!this.ended) {
        this.fail('test exited without ending', {
            exiting: true
        });
    }
};

Test.prototype._pendingAsserts = function () {
    if (this._plan === undefined) {
        return 1;
    }
    else {
        return this._plan - (this._progeny.length + this.assertCount);
    }
};

Test.prototype._assert = function assert (ok, opts) {
    var self = this;
    var extra = opts.extra || {};
    
    var res = {
        id : self.assertCount ++,
        ok : Boolean(ok),
        skip : defined(extra.skip, opts.skip),
        name : defined(extra.message, opts.message, '(unnamed assert)'),
        operator : defined(extra.operator, opts.operator),
        objectPrintDepth : self._objectPrintDepth
    };
    if (has(opts, 'actual') || has(extra, 'actual')) {
        res.actual = defined(extra.actual, opts.actual);
    }
    if (has(opts, 'expected') || has(extra, 'expected')) {
        res.expected = defined(extra.expected, opts.expected);
    }
    this._ok = Boolean(this._ok && ok);
    
    if (!ok) {
        res.error = defined(extra.error, opts.error, new Error(res.name));
    }
    
    if (!ok) {
        var e = new Error('exception');
        var err = (e.stack || '').split('\n');
        var dir = path.dirname(__dirname) + '/';
        
        for (var i = 0; i < err.length; i++) {
            var m = /^[^\s]*\s*\bat\s+(.+)/.exec(err[i]);
            if (!m) {
                continue;
            }
            
            var s = m[1].split(/\s+/);
            var filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[1]);
            if (!filem) {
                filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[2]);
                
                if (!filem) {
                    filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[3]);

                    if (!filem) {
                        continue;
                    }
                }
            }
            
            if (filem[1].slice(0, dir.length) === dir) {
                continue;
            }
            
            res.functionName = s[0];
            res.file = filem[1];
            res.line = Number(filem[2]);
            if (filem[3]) res.column = filem[3];
            
            res.at = m[1];
            break;
        }
    }

    self.emit('result', res);
    
    var pendingAsserts = self._pendingAsserts();
    if (!pendingAsserts) {
        if (extra.exiting) {
            self._end();
        } else {
            nextTick(function () {
                self._end();
            });
        }
    }
    
    if (!self._planError && pendingAsserts < 0) {
        self._planError = true;
        self.fail('plan != count', {
            expected : self._plan,
            actual : self._plan - pendingAsserts
        });
    }
};

Test.prototype.fail = function (msg, extra) {
    this._assert(false, {
        message : msg,
        operator : 'fail',
        extra : extra
    });
};

Test.prototype.pass = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'pass',
        extra : extra
    });
};

Test.prototype.skip = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'skip',
        skip : true,
        extra : extra
    });
};

Test.prototype.ok
= Test.prototype['true']
= Test.prototype.assert
= function (value, msg, extra) {
    this._assert(value, {
        message : defined(msg, 'should be truthy'),
        operator : 'ok',
        expected : true,
        actual : value,
        extra : extra
    });
};

Test.prototype.notOk
= Test.prototype['false']
= Test.prototype.notok
= function (value, msg, extra) {
    this._assert(!value, {
        message : defined(msg, 'should be falsy'),
        operator : 'notOk',
        expected : false,
        actual : value,
        extra : extra
    });
};

Test.prototype.error
= Test.prototype.ifError
= Test.prototype.ifErr
= Test.prototype.iferror
= function (err, msg, extra) {
    this._assert(!err, {
        message : defined(msg, String(err)),
        operator : 'error',
        actual : err,
        extra : extra
    });
};

Test.prototype.equal
= Test.prototype.equals
= Test.prototype.isEqual
= Test.prototype.is
= Test.prototype.strictEqual
= Test.prototype.strictEquals
= function (a, b, msg, extra) {
    this._assert(a === b, {
        message : defined(msg, 'should be equal'),
        operator : 'equal',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notEqual
= Test.prototype.notEquals
= Test.prototype.notStrictEqual
= Test.prototype.notStrictEquals
= Test.prototype.isNotEqual
= Test.prototype.isNot
= Test.prototype.not
= Test.prototype.doesNotEqual
= Test.prototype.isInequal
= function (a, b, msg, extra) {
    this._assert(a !== b, {
        message : defined(msg, 'should not be equal'),
        operator : 'notEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.deepEqual
= Test.prototype.deepEquals
= Test.prototype.isEquivalent
= Test.prototype.same
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.deepLooseEqual
= Test.prototype.looseEqual
= Test.prototype.looseEquals
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notDeepEqual
= Test.prototype.notEquivalent
= Test.prototype.notDeeply
= Test.prototype.notSame
= Test.prototype.isNotDeepEqual
= Test.prototype.isNotDeeply
= Test.prototype.isNotEquivalent
= Test.prototype.isInequivalent
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should not be equivalent'),
        operator : 'notDeepEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.notDeepLooseEqual
= Test.prototype.notLooseEqual
= Test.prototype.notLooseEquals
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'notDeepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype['throws'] = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }

    var caught = undefined;

    try {
        fn();
    } catch (err) {
        caught = { error : err };
        var message = err.message;
        delete err.message;
        err.message = message;
    }

    var passed = caught;

    if (expected instanceof RegExp) {
        passed = expected.test(caught && caught.error);
        expected = String(expected);
    }

    if (typeof expected === 'function' && caught) {
        passed = caught.error instanceof expected;
        caught.error = caught.error.constructor;
    }

    this._assert(typeof fn === 'function' && passed, {
        message : defined(msg, 'should throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error: !passed && caught && caught.error,
        extra : extra
    });
};

Test.prototype.doesNotThrow = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }
    var caught = undefined;
    try {
        fn();
    }
    catch (err) {
        caught = { error : err };
    }
    this._assert(!caught, {
        message : defined(msg, 'should not throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error : caught && caught.error,
        extra : extra
    });
};

Test.skip = function (name_, _opts, _cb) {
    var args = getTestArgs.apply(null, arguments);
    args.opts.skip = true;
    return Test(args.name, args.opts, args.cb);
};

// vim: set softtabstop=4 shiftwidth=4:


}).call(this,require('_process'),"/node_modules/tape/lib")
},{"_process":46,"deep-equal":19,"defined":23,"events":31,"has":35,"inherits":37,"path":44,"string.prototype.trim":61}],69:[function(require,module,exports){
(function (process){
var Stream = require('stream')

// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through
through.through = through

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }

  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false)

  stream.write = function (data) {
    write.call(this, data)
    return !stream.paused
  }

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift()
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data)
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data === null) _ended = true
    buffer.push(data)
    drain()
    return stream
  }

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy()
      })
  })

  function _end () {
    stream.writable = false
    end.call(stream)
    if(!stream.readable && stream.autoDestroy)
      stream.destroy()
  }

  stream.end = function (data) {
    if(ended) return
    ended = true
    if(arguments.length) stream.write(data)
    _end() // will emit or queue
    return stream
  }

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true
    ended = true
    buffer.length = 0
    stream.writable = stream.readable = false
    stream.emit('close')
    return stream
  }

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true
    return stream
  }

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false
      stream.emit('resume')
    }
    drain()
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain')
    return stream
  }
  return stream
}


}).call(this,require('_process'))
},{"_process":46,"stream":59}],70:[function(require,module,exports){
(function (global){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],71:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var docs = require('../../../docs/api');
var freshPrince = require('../lib/freshPrince');

test('generic-methods-run:', function (t) {

  var getters = {
    found: true,
    length: true,
  };
  var skip = {
    whitespace: true,
    insertAt: true,
    debug: true //too noisy
  };
  var needString = {
    insertBefore: true,
    insertAfter: true,
    match: true,
    splitOn: true,
    splitBefore: true,
    splitAfter: true,
  };

  var r = nlp(freshPrince);
  Object.keys(docs.generic).forEach(function(type) {
    Object.keys(docs.generic[type]).forEach(function(fn) {
      //simply call this method to see if it throws an error
      var func = function() {
        if (getters[fn]) {
          //getters dont have a '()'
          return r[fn];
        } else if (needString[fn]) {
          //give a dummy param
          return r[fn]('fun');
        } else if (skip[fn]) {
          //these are too fancy to call
          return typeof r[fn] === 'function';
        } else {
          //call this method
          return r[fn]();
        }
      };

      t.doesNotThrow(func, true, fn);
    });
  });
  t.end();
});

test('subsets-methods-exist:', function (t) {
  var addParam = {
    sentences: {
      append: true,
      prepend: true,
    }
  };
  var r = nlp(freshPrince);
  Object.keys(docs.subsets).forEach(function(subset) {
    //each subset
    t.doesNotThrow(function() {
      return r[subset](), true, subset + '()';
    });
    //each method in that subset
    Object.keys(docs.subsets[subset]).forEach(function(method) {
      var func = function() {
        if (addParam[subset] && addParam[subset][method]) {
          r[subset]()[method]('fun');
        } else {
          r[subset]()[method]();
        }
      };
      var msg = subset + '().' + method;
      t.doesNotThrow(func, true, msg);
    });
  });
  t.end();
});

},{"../../../docs/api":2,"../lib/freshPrince":74,"../lib/nlp":75,"tape":65}],72:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

var lexicon = {
  'Jardas al Abid': 'Place',
  'Umm Ar Rizam': 'Place',
  'Tobruk': 'Place'
};

test('find locality which has hyphenation:', function (t) {
  sentence = 'A suicide attack hit the centre of Jardas-al-Abid killing one person (and the attacker) and injuring more than twenty.';
  found = nlp(sentence, lexicon).places().data()[0].normal;
  t.equal('jardas al abid', found);
  t.equal(lexicon, lexicon, 'lexicon-unchanged');
  t.end();
});

test('find locality in possessive form:', function (t) {
  sentence = 'A suicide attack hit Jardas al Abid\'s center killing one person (and the attacker) and injuring more than twenty.';
  found = nlp(sentence, lexicon).places().data()[0].normal;
  t.equal('jardas al abid\'s', found);
  t.equal(lexicon, lexicon, 'lexicon-unchanged');
  t.end();
});

test('find locality with a proper name in front:', function (t) {
  sentence = 'A suicide attack hit Lybia\'s Jardas al Abid city killing one person (and the attacker) and injuring more than twenty.';
  found = nlp(sentence, lexicon).places().data()[0].normal;
  t.equal('jardas al abid', found);
  t.equal(lexicon, lexicon, 'lexicon-unchanged');
  t.end();
});

test('find locality followed by punctuation:', function (t) {
  sentence = 'A suicide attack hit Jardas al Abid, which killed one person (and the attacker) and injured more than twenty.';
  found = nlp(sentence, lexicon).places().data()[0].normal;
  t.equal('jardas al abid', found);
  t.equal(lexicon, lexicon, 'lexicon-unchanged');
  t.end();
});

},{"../lib/nlp":75,"tape":65}],73:[function(require,module,exports){
'use strict';

var pad = function (str, width, char) {
  char = char || '.';
  str = str.toString();
  while (str.length < width) {
    str += char;
  }
  return str;
};

//helpers to make test output messages nicer
var str_test = function(got, input, want, t) {
  var msg = pad('\'' + got + '\'', 20) + '(want: \'' + want + '\' )'; //'\'' + input +
  t.equal(got, want, msg);
  return;
};

var arr_test = function(got, input, want, t) {
  got = JSON.stringify(got);
  want = JSON.stringify(want);
  var msg = pad('\'' + got + '\'') + ' (want: \'' + want + '\' )'; //'\'' + input +
  t.equal(got, want, msg);
  return;
};

var has_pos = function(r, tags) {
  var terms = r.terms();
  if (r.length !== r.length) {
    return false;
  }
  for(var i = 0; i < terms.list.length; i++) {
    var t = terms.list[i].terms[0];
    if (!t.tag[tags[i]]) {
      return false;
    }
  }
  return true;
};

var pos_test = function(r, tags, t) {
  var str = '';
  var got = r.terms().list.map(function(ts) {
    var term = ts.terms[0];
    str += ' ' + term.normal;
    return Object.keys(term.tag)[0];
  }).join(', ');
  var msg = pad('"' + str.trim() + '"', 30) + pad(tags.join(', '), 45) + got;
  t.equal(has_pos(r, tags), true, msg);
  return;
};

var terms_test = function(terms, want, t, isText) {
  var str = '';
  var got = terms.map(function(term) {
    str += ' ' + term.text;
    if (isText) {
      return term.text;
    }
    return term.normal;
  });
  var msg = pad('"' + str + '"', 38) + ' got: [' + got.join(',') + ']  want: [' + want.join(',') + ']';
  t.deepEqual(got, want, msg);
};

var isArray = function(someVar) {
  if (Object.prototype.toString.call(someVar) === '[object Array]') {
    return true;
  }
  return false;
};

module.exports = {
  str_test: str_test,
  pos_test: pos_test,
  terms_test: terms_test,
  arr_test: arr_test,
  isArray: isArray
};

},{}],74:[function(require,module,exports){
module.exports = `Now this is a story all about how my life got flipped-turned upside down.
and I'd like to take a minute, just sit right there, I'll tell you how I became the prince of a town called Bel-Air.

In west Philadelphia born and raised, on the playground was where I spent most of my days.
Chillin' out maxin' relaxin' all cool, and all shooting some b-ball outside of the school.
When a couple of guys who were up to no good started making trouble in my neighborhood,
I got in one little fight and my mom got scared, she said, "You're movin' with your auntie and uncle in Bel-Air".

I begged and pleaded with her day after day but she packed my suitcase and sent me on my way.
She gave me a kiss and then she gave me my ticket. I put my Walkman on and said, "I might as well kick it".

First class, yo, this is bad. Drinking orange juice out of a champagne glass.
Is this what the people of Bel-Air living like? Hmm, this might be alright.

But wait I hear they're prissy, bourgeois, all that. Is this the type of place that they just send this cool cat?
I don't think so, I'll see when I get there.
I hope they're prepared for the prince of Bel-Air.

Well, the plane landed and when I came out. There was a dude who looked like a cop standing there with my name out.
I ain't trying to get arrested yet, I just got here.
I sprang with the quickness like lightning, disappeared.

I whistled for a cab and when it came near. The license plate said "Fresh" and it had dice in the mirror.
If anything I could say that this cab was rare, but I thought, "Nah, forget it" – "Yo, home to Bel-Air"!

I pulled up to the house about 7 or 8 and I yelled to the cabbie, "Yo home smell ya later".
I looked at my kingdom, I was finally there. To sit on my throne as the Prince of Bel-Air.
`;

},{}],75:[function(require,module,exports){
var nlp;
if (typeof window !== undefined) {
  // nlp = require('../../../src/index');
  nlp = require('../../../builds/compromise');
} else {
  nlp = window.nlp;
  alert('browser');
}

module.exports = nlp;

},{"../../../builds/compromise":1}],76:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('if-basic:', function (t) {
  var r = nlp('spencer is here');
  var m = r.if('asdf');
  t.equal(m.out('text'), '', 'if-negative');

  m = r.if('spencer');
  t.equal(m.out('text'), 'spencer is here', 'if-positive');

  r = nlp('spencer is here. john was here.');
  m = r.if('is');
  t.equal(m.out('normal'), 'spencer is here.', 'if-partial');

  t.end();
});

test('ifNo:', function (t) {
  var r = nlp('spencer is here');
  //ifNo
  m = r.ifNo('spencer');
  t.equal(m.out('text'), '', 'ifNo-positive');

  m = r.ifNo('asdf');
  t.equal(m.out('text'), 'spencer is here', 'ifNo-negative');

  r = nlp('spencer is here. john was here.');
  m = r.ifNo('is');
  t.equal(m.out('normal'), 'john was here.', 'if-no-partial');

  t.end();
});

},{"../lib/nlp":75,"tape":65}],77:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('insert-basic :', function(t) {

  var m = nlp('the dog sat').insertBefore('and');
  t.equal(m.out('text'), 'and the dog sat', 'and-dog');

  m = nlp('the dog sat').insertAfter('patiently');
  t.equal(m.out('text'), 'the dog sat patiently', 'sat-patiently');

  m = nlp('the dog sat');
  m.match('dog').insertBefore('nice');
  t.equal(m.out('text'), 'the nice dog sat', 'nice-dog');

  m = nlp('a dog sat');
  m.match('sat').insertAfter('quickly');
  t.equal(m.out('text'), 'a dog sat quickly', 'sat-quickly');

  m = nlp('a dog sat');
  m.match('a dog sat').insertAfter('quickly');
  t.equal(m.out('text'), 'a dog sat quickly', 'multi-match-quickly');

  m = nlp('a dog sat');
  m.match('asdf').insertAfter('no no no');
  t.equal(m.out('text'), 'a dog sat', 'no no no no');

  t.end();
});

test('insert-subset-include :', function(t) {
  var m = nlp('the dog is nice');
  var sub = m.match('is');
  sub.insertAfter('really');
  t.equal(sub.out('normal'), 'is really', 'is-really');
  t.equal(m.out('normal'), 'the dog is really nice', 'dog-is-really-nice');

  m = nlp('the dog climbed the fence');
  sub = m.match('climbed');
  sub.insertBefore('really');
  t.equal(sub.out('normal'), 'really climbed', 'really-quickly');
  t.equal(m.out('normal'), 'the dog really climbed the fence', 'dog-really-climbed');

  t.end();
});

},{"../lib/nlp":75,"tape":65}],78:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('==Match ==', function (T) {

  T.test('term-match :', function (t) {
    [
      ['quick', 'quick', true],
      ['Quick', 'Quick', true],
      ['quick', 's', false],
      ['quick', '#Adjective', true],
      ['quick', '#Noun', false],
      ['quick', '(fun|nice|quick|cool)', true],
      ['quick', '(fun|nice|good)', false],
    ].forEach(function (a) {
      var m = nlp(a[0]).match(a[1]);
      var msg = a[0] + ' matches ' + a[1] + ' ' + a[2];
      t.equal(m.found, a[2], msg);
    });
    t.end();
  });

  T.test('sentence-match:', function (t) {
    [
      ['the dog played', 'the dog', 'the dog'],
      ['the dog played', 'the dog played', 'the dog played'],
      ['the dog played', 'the #Noun', 'the dog'],
      ['the dog played', 'the #Noun played', 'the dog played'],
      ['the dog played', 'the cat played', ''],
      ['the dog played', 'the #Adjective played', ''],
      ['the dog played', 'the (cat|dog|piano) played', 'the dog played'],
      ['the dog played', 'the (cat|piano) played', ''],
      ['the dog played', 'the . played', 'the dog played'],
      //optional
      ['the dog played', 'the dog quickly? played', 'the dog played'],
      ['the dog played', 'the dog #Adverb? played', 'the dog played'],
      ['the dog quickly played', 'the dog #Adverb? played', 'the dog quickly played'],
      ['the dog quickly played', 'the dog #Adverb played', 'the dog quickly played'],
      ['the dog quickly played', 'the dog . played', 'the dog quickly played'],
      ['the dog quickly played', 'the dog .? played', 'the dog quickly played'],
      // ['the dog played', 'the dog .? played', 'the dog played'],

      //leading/trailing logic
      ['the dog played', 'the dog played$', 'the dog played'],
      ['the dog played', 'the dog', 'the dog'],
      ['the dog played', 'the dog$', ''],
      ['the dog played', 'the dog$ played', ''],
      ['the dog played', '^the dog', 'the dog'],
      ['the dog played', 'dog played', 'dog played'],
      ['the dog played', '^dog played', ''],
      ['the dog played', '^played', ''],
      ['the dog played', '^the', 'the'],

      ['john eats glue', 'john eats glue', 'john eats glue'],
      ['john eats glue', 'john eats', 'john eats'],
      ['john eats glue', 'eats glue', 'eats glue'],
      ['john eats glue', 'eats glue all day', ''],

      //test contractions
      // [`if you don't mind`, `you don't mind`, `you don't mind`],
      [`if you don't mind`, `you don't care`, ``],
      // [`if you don't mind`, `you don't`, `you don't`],
      // [`if you don't mind`, `don't mind`, `don't mind`],
      [`if you didn't care`, `didn't`, `didn't`],
      // [`if you wouldn't care, i'll eat here`, `i'll eat`, `i'll eat`], //omg hard one

      // [`don't go`, `do not`, `don't`],
      [`do not go`, `do not`, `do not`],
      // [`i dunno`, `do not`, `dunno`],
      //bugs
      // [`really remind me to buy`, '#Adverb? #Infinitive (me|us) (to|for)', `really remind me to`],

    ].forEach(function (a) {
      var m = nlp(a[0]).match(a[1]);
      if (!m.found) {
        t.equal(a[2], '', 'no-match: ' + a[0] + ' - -' + a[1]);
      } else {
        var msg = '\'' + a[0] + '\'  - ' + a[1] + ' - - have : \'' + m.out('normal') + '\'';
        t.equal(m.out('normal'), a[2], msg);
      }
    });
    t.end();
  });

  test('match-from-array :', function(t) {

    var m = nlp('spencer is really cool').match(['spencer']);
    t.equal(m.out('normal'), 'spencer', 'just-spencer');
    t.equal(m.length, 1, 'one-result');

    m = nlp('spencer is really cool').match([]);
    t.equal(m.out('normal'), '', 'empty match');
    t.equal(m.length, 0, 'zero-results');

    m = nlp('spencer is really cool');
    var r = m.match(['spencer', 'really']).toUpperCase();
    t.equal(r.out('text'), 'SPENCER REALLY', 'match-spencer-really');
    t.equal(r.length, 2, 'two-results');

    t.equal(m.out('text'), 'SPENCER is REALLY cool', 'match-spencer-really');
    t.equal(m.length, 1, 'still-one-result');
    t.end();
  });

  test('match-from-array :', function(t) {
    var m = nlp('spencer is really cool').match({
      'spencer': true
    });
    t.equal(m.out('normal'), 'spencer', 'just-spencer');
    t.equal(m.length, 1, 'one-result');
    t.end();
  });

  test('tag-match-tag :', function(t) {
    var m = nlp('apple is cool');
    m.match(['apple', 'susan']).tag('Person');
    var p = m.people();
    t.equal(p.out('normal'), 'apple', 'apple-tagged');
    t.equal(m.length, 1, 'one-result');
    t.end();
  });


});

},{"../lib/nlp":75,"tape":65}],79:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');


test('fancy match', function (t) {
  [
    //misc
    ['doug is good', '', 0],
    ['doug is good', '.', 3],
    ['doug is good', '.?', 3],
    ['doug is good', '.+', 3],

    //contractions
    ['he\'s nice', 'he is', 2],
    ['he\'s nice', 'is nice', 2],
    ['he\'s nice', 'he\'s', 1],
    ['he\'s nice', 'he\'s nice', 3],
    ['he\'s nice', 'nice', 1],

    //over/under
    ['he is nice', 'is nice and good', 0],
    ['is nice', 'he is nice', 0],

    //dot
    ['doug is good', 'doug is good', 3],
    ['doug is good', 'doug . good', 3],
    ['doug is good', 'doug is .', 3],
    ['doug is good', '. is .', 3],
    ['doug is good', '. . .', 3],
    ['doug is good', '. . . .', 0],

    //optional miss
    ['doug is good', 'doug is really? good', 3],
    ['doug is good', 'doug is .? good', 3], //tricky 'greedy optional' bug
    ['doug is good', 'doug is #Adverb? good', 3],
    //optional has
    ['doug is really good', 'doug is really? good', 4],
    ['doug is really good', 'doug is .? good', 4],
    ['doug is really good', 'doug is #Adverb? good', 4],
    //asterix empty
    ['doug is good', 'doug *', 3],
    ['doug is good', 'doug is *', 3],
    ['doug is good', '*', 3],
    //asterix positive
    ['doug is good', 'doug * good', 3],
    ['doug is really good', 'doug * good', 4],
    ['doug is really so very good', 'doug * good', 6],
    ['doug is really so very good at stuff', 'doug * good', 6],
    ['we think doug is really so very good at stuff', 'doug * good', 6],
    //asterix negative
    ['doug is good', 'doug * bad', 0],
    ['doug is good', 'spencer * bad', 0],
    ['doug is good', 'spencer *', 0],
    ['doug is good', 'doug * is', 2], //another tricky 'greedy optional' bug
    ['cool, fun, great, nice', '#Adjective+ great', 3],

    //
    ['Dr. Spencer Smith says hi', 'dr', 1],
    ['Dr. Spencer Smith says hi', 'dr spencer', 2],
    ['Dr. Spencer Smith says hi', 'dr spencer smith', 3],
    ['Dr. Spencer Smith says hi', 'dr spencer smith says', 4],
    ['Lately, Dr. Spencer Smith says hi', 'lately dr spencer smith', 4],
    //start ^
    ['in toronto', '^toronto', 0],
    ['toronto', '^toronto', 1],
    ['in toronto', '^in toronto', 2],
    ['in toronto', 'in ^toronto', 0],
    //end $
    ['it snows', 'it snows', 2],
    ['it snows', 'snows$', 1],
    ['it snows', 'it snows$', 2],
    ['it snows', 'it$ snows', 0],
    ['it snows', 'foo$', 0],
    //negative !
    ['it really snows', 'it #adverb snows', 3],
    ['it really snows', 'it !#adverb snows', 0],
    ['it really snows. it goes.', 'it !#adverb', 2],
    ['it is nice.', '!#adverb', 3],
    //max/min {}
    ['if it goes really well', 'if {1,2} well', 0],
    ['if it goes really well', 'if {1,6} well', 5],
    ['so i said that spencer is nice', '^{1,3} spencer', 0],
    ['so i said that spencer is nice', '^{1,6} spencer', 5],
    //optional/consecutive
    ['is really walking', 'is #Adverb+? walking', 3],
    ['is walking', 'is #Adverb+? walking', 2],
    ['is really really walking', 'is #Adverb+? walking', 4],
    ['is really not walking', 'is (#Adverb|not)+? walking', 4],
    ['is really not quickly walking', 'is (#Adverb|not)+? walking', 5],
    ['is walking', 'is (#Adverb|not)+? walking', 2],
  ].forEach(function (a) {
    var r = nlp(a[0]).match(a[1]).terms() || [];
    var msg = '\'' + a[0] + '\' - - - \'' + a[1] + '\' - - got:' + r.length + '  want:' + a[2];
    t.equal(r.length, a[2], msg);
  });
  t.end();
});

},{"../lib/nlp":75,"tape":65}],80:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('not-basic :', function(t) {

  var m = nlp('spencer is really cool').not('brown');
  t.equal(m.out('text'), 'spencer is really cool', 'missing-not');
  t.equal(m.length, 1, 'one-result');

  m = nlp('spencer is really cool').not('#Adverb');
  t.equal(m.out('text'), 'spencer is cool', 'one-not');
  t.equal(m.length, 2, 'two-result');

  m = nlp('spencer is really cool').not('#Adverb+');
  t.equal(m.out('text'), 'spencer is cool', 'still-one-not');
  t.equal(m.length, 2, 'two-results');

  m = nlp('spencer is really cool').not('#Adverb+');
  t.equal(m.out('text'), 'spencer is cool', 'two-not');
  t.equal(m.length, 2, 'two-results');

  m = nlp('spencer is really cool').not('is #Adverb+');
  t.equal(m.out('text'), 'spencer cool', 'three-not');
  t.equal(m.length, 2, 'two-results');

  m = nlp('spencer is really cool. John is really nice.').not('#Adverb');
  t.equal(m.out('text'), 'spencer is cool. John is nice.', 'two-terms-matches');
  t.equal(m.length, 4, 'four-results');

  m = nlp('spencer is really cool. John is really nice.').not('pardon me, #Adverb');
  t.equal(m.out('text'), 'spencer is really cool. John is really nice.', 'tricky-no-match');
  t.equal(m.length, 2, 'two-original-results');


  t.end();
});

test('not-from-array :', function(t) {

  var m = nlp('spencer is really cool').not(['spencer']);
  t.equal(m.out('normal'), 'is really cool', 'not-spencer');
  t.equal(m.length, 1, 'one-results');

  m = nlp('spencer is really cool').not(['']);
  t.equal(m.out('normal'), 'spencer is really cool', 'not-spencer');
  t.equal(m.length, 1, 'one-results');

  m = nlp('spencer is really cool').not(['spencer', 'really']);
  t.equal(m.out('normal'), 'is cool', 'not-spencer-really');
  t.equal(m.length, 2, 'two-results');
  t.end();
});

//test object-form
test('not-from-object :', function(t) {
  m = nlp('spencer is not really cool.');
  var r = m.not({
    'not': true,
    'really': true,
  });
  t.equal(m.out('normal'), 'spencer is not really cool.', 'double-obj-remains');
  t.equal(r.out('normal'), 'spencer is cool.', 'spencer-double-obj');

  m = nlp('everyone is cool. I said hi to everyone.').not({
    'everyone': true,
    'totally': true
  });
  t.equal(m.out('normal'), 'is cool. i said hi to', 'not-everyone');

  m = nlp('spencer is really, secretly, very cool.');
  var adv = m.adverbs().not({
    'really': true,
  });
  t.equal(adv.out('normal'), 'secretly very', 'not-subset');
  t.equal(adv.length, 1, 'one-result');

  var adv2 = m.adverbs().not('secretly');
  t.equal(adv2.out('normal'), 'really very', 'not-subset2');
  t.equal(adv2.length, 2, 'two-results');

  t.end();
});

},{"../lib/nlp":75,"tape":65}],81:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('remove-basic :', function(t) {

  var m = nlp('the brown cat played').match('brown').delete().all();
  t.equal(m.out('text'), 'the cat played', 'brown-cat');

  m = nlp('the nice brown cat played').match('nice brown').delete().all();
  t.equal(m.out('text'), 'the cat played', 'nice-brown');

  m = nlp('the nice brown cat played').match('#Adjective').delete().all();
  t.equal(m.out('text'), 'the cat played', 'adj-each');

  m = nlp('the nice brown cat played').match('#Adjective+').delete().all();
  t.equal(m.out('text'), 'the cat played', 'adj-consecutive');

  t.end();
});

test('remove-match :', function(t) {

  var m = nlp('the brown cat played').delete('brown');
  t.equal(m.out('text'), 'the cat played', 'brown-cat');

  m = nlp('the brown cat played. The brown dog sat down.').delete('brown');
  t.equal(m.out('text'), 'the cat played. The dog sat down.', 'brown-cat');

  m = nlp('the nice brown cat played. The nice dog waited.').delete('nice brown');
  t.equal(m.out('text'), 'the cat played. The nice dog waited.', 'nice-brown');

  m = nlp('the nice brown cat played. The cute dogs ate.').delete('#Adjective');
  t.equal(m.out('text'), 'the cat played. The dogs ate.', 'adj-each');

  m = nlp('the nice brown cat played. The cute dogs ate.').delete('#Adjective+');
  t.equal(m.out('text'), 'the cat played. The dogs ate.', 'adj-consecutive');

  t.end();
});

test('remove-logic :', function(t) {
  var m = nlp('spencer kelly is here').match('spencer kelly').delete('spencer');
  t.equal(m.out('normal'), 'kelly', 'remove(reg) returns this');

  m = nlp('spencer kelly is here').match('spencer kelly').delete().all();
  t.equal(m.out('normal'), 'is here', 'remove() returns parent');

  m = nlp('spencer kelly is here').match('spencer kelly').delete('notfound');
  t.equal(m.out('normal'), 'spencer kelly', 'remove(notfound) returns this');
  t.end();
});

},{"../lib/nlp":75,"tape":65}],82:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('replace-basic :', function(t) {

  var m = nlp('the dog played').match('dog').replace('cat').all();
  t.equal(m.out('text'), 'the cat played', 'dog-cat');

  m = nlp('the dog played').match('the dog').replace('a cat').all();
  t.equal(m.out('text'), 'a cat played', 'a-cat');

  m = nlp('the dog played').match('#Noun').replace('snake').all();
  t.equal(m.out('text'), 'the snake played', 'snake');

  m = nlp('the pit bull played').match('#Noun+').replace('snake').all();
  t.equal(m.out('text'), 'the snake played', 'pit bull');

  m = nlp('the pit bull dog played').match('#Noun+').replace('grey snake').all();
  t.equal(m.out('text'), 'the grey snake played', 'pit bull dog');

  t.end();
});

test('match-replace :', function(t) {
  [
    ['the dog played', 'the dog', 'the cat', 'the cat played'],
    ['the dog played', 'the #Noun', 'the cat', 'the cat played'],
    ['the dog played', 'the (dog|hamster|pet-snake)', 'the cat', 'the cat played'],
    ['the boy and the girl', 'the #Noun', 'the house', 'the house and the house'],
    ['the boy and the girl', 'the cat', 'the house', 'the boy and the girl'],
  ].forEach(function(a) {
    var str = nlp(a[0]).replace(a[1], a[2]).out('text');
    var msg = str + ' -- ' + a[3];
    t.equal(str, a[3], msg);
  });
  t.end();
});

},{"../lib/nlp":75,"tape":65}],83:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');

//make sure it can handle garbage inputs
test('garbage:', function (t) {
  var garbage = [
    '',
    '  ',
    null,
    '\n\n', [], {},
  ];
  garbage.forEach(function (g, i) {
    var num = nlp(g).list.length;
    var msg = typeof g + ' text input #' + i;
    t.equal(num, 0, msg);
  });
  var str = nlp(2).out();
  t.equal(str, '2', 'integer-casted');
  str = nlp(2.2).out();
  t.equal(str, '2.2', 'float-casted');

  //garbage in lexicon too
  str = nlp('hello', null).out();
  t.equal(str, 'hello', 'null-lexicon');

  str = nlp('hello', 2).out();
  t.equal(str, 'hello', 'int-lexicon');
  t.end();
});

test('extra exports:', function (t) {
  t.ok(nlp.version, 'version number exported');

  t.doesNotThrow(function() {
    nlp.verbose(true);
    nlp.verbose(false);
  }, 'can set verbosity');

  var keys = Object.keys(nlp.lexicon());
  t.ok(keys.length > 1000, 'lexicon is found');

  t.end();
});

test('misc:', function (t) {
  var str = '2 million five hundred thousand and fifty nine is bigger than 2882';
  var m = nlp(str);
  m.values().toNumber();
  t.equal(m.out('normal'), '2500059 is bigger than 2882', str);

  str = '2 million five hundred thousand and fifty nine is bigger than 2882';
  m = nlp(str);
  m.values().toNiceNumber();
  t.equal(m.out('text'), '2,500,059 is bigger than 2,882', str);

  str = 'doug is 5 years old';
  m = nlp(str);
  m.values().toTextValue();
  t.equal(m.out('normal'), 'doug is five years old', str);

  var r = nlp('Homer, have you been eating that sandwich again?').terms().slice(0, 3);
  t.equal(r.out('text'), 'Homer, have you', 'result.slice');

  // str = 'men go';
  // m = nlp(str).sentences().toPastTense().nouns().toSingular();
  // t.equal(m.out('normal'), 'a man went', str);
  t.end();
});

},{"./lib/nlp":75,"tape":65}],84:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var freshPrince = require('../lib/freshPrince');

test('offsets-equals-substr:', function (t) {
  var r = nlp(freshPrince);
  var arr = r.verbs().out('offsets');
  arr.forEach(function(obj) {
    var substr = freshPrince.substr(obj.offset, obj.length);
    t.equal(obj.text, substr, '\'' + obj.text + '\' offset ' + obj.offset);
  });
  t.end();
});

},{"../lib/freshPrince":74,"../lib/nlp":75,"tape":65}],85:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('topk:', function (t) {
  var str = 'it is good. it was nice. she is cool.';
  var r = nlp(str);
  var arr = r.verbs().out('topk');
  t.equal(arr[0].normal, 'is', '#1 is');
  t.equal(arr[0].count, 2, 'two is count');

  t.equal(arr[1].normal, 'was', 'one was count');
  t.equal(arr[1].count, 1, 'one was count');
  t.end();
});

test('out-tags:', function (t) {
  var str = 'texas rangers are a baseball team';
  var r = nlp(str);
  var arr = r.out('tags');
  t.equal(arr.length, 5, '5 terms');
  t.equal(arr[0].normal, 'texas rangers', 'texas rangers are #1');
  t.equal(arr[1].normal, 'are', 'are #2');
  t.ok(arr[0].tags.indexOf('SportsTeam') !== -1, 'they are a sportsteam');
  t.end();
});

test('out-array:', function (t) {
  var str = 'texas rangers are a baseball team. They do not play in houston.';
  var r = nlp(str).verbs();
  var arr = r.out('array');
  t.equal(arr.length, 2, '2 verbs');
  t.equal(arr[0], 'are', 'are #1');
  t.equal(arr[1], 'do not play', 'do not play #2');
  t.end();
});

test('out-others:', function (t) {
  var str = 'texas rangers are a baseball team. They do not play in houston.';
  var r = nlp(str).verbs();
  var txt = r.out('text');
  t.notEqual(r.out('html'), txt, 'html-out');
  t.notEqual(r.out('grid'), txt, 'grid-out');
  t.notEqual(r.out('root'), txt, 'grid-out');
  t.notEqual(r.out('color'), txt, 'color-out');
  t.notEqual(r.out('tags'), txt, 'tags-out');
  t.end();
});

},{"../lib/nlp":75,"tape":65}],86:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var fns = require('../lib/fns');

test('sortAlpha:', function (t) {
  var str = 'John xoo, John fredman, John davis, John fredman,';
  var r = nlp(str);
  r = r.people();
  r.sort('alpha');
  var want = ['john davis', 'john fredman', 'john fredman', 'john xoo'];
  fns.arr_test(r.out('array'), str, want, t);
  t.end();
});

test('sortChronological:', function (t) {
  var str = 'John xoo, John fredman, John davis';
  var r = nlp(str);
  r = r.people();
  r.sort('alphabetical');
  r.sort('chronological');
  var want = ['john xoo', 'john fredman', 'john davis'];
  fns.arr_test(r.out('array'), str, want, t);
  t.end();
});

test('reverse:', function (t) {
  var str = 'John xoo, John fredman, John davis';
  var r = nlp(str);
  r = r.people();
  r.sort('alphabetical');
  r.reverse();
  var want = ['john xoo', 'john fredman', 'john davis'];
  fns.arr_test(r.out('array'), str, want, t);
  t.end();
});

test('length:', function (t) {
  var str = 'Amy, John Fredman, Dr. Bill, Alexis Smithsonian';
  var r = nlp(str);
  r = r.people();
  r.sort('length');
  r.reverse();
  var want = ['amy', 'dr bill', 'john fredman', 'alexis smithsonian',];
  fns.arr_test(r.out('array'), str, want, t);
  t.end();
});

test('wordCount:', function (t) {
  var str = 'John Fredman, Amy, Dr. Bill G. Gates';
  var r = nlp(str);
  r = r.people();
  r.sort('wordCount');
  r.reverse();
  var want = ['dr bill g gates', 'john fredman', 'amy'];
  fns.arr_test(r.out('array'), str, want, t);
  t.end();
});

test('unique:', function (t) {
  var str = 'John xoo, John fredman, john xoo, John davis';
  var r = nlp(str);
  r = r.people();
  r.unique();
  var want = ['john xoo', 'john fredman', 'john davis'];
  fns.arr_test(r.out('array'), str, want, t);
  t.end();
});

test('frequency:', function (t) {
  var str = 'John xoo, John fredman, john xoo, John davis';
  var r = nlp(str).people();
  var a = r.out('frequency');
  t.equal(a[0].normal, 'john xoo', 'topk is sorted');
  t.equal(a[0].count, 2, 'topk finds two');
  t.end();
});

},{"../lib/fns":73,"../lib/nlp":75,"tape":65}],87:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

test('==Adjective==', function (T) {

  T.test('to_adverb:', function (t) {
    [
      ['quick', 'quickly'],
      // ['idle', 'idly'],
      ['dirty', null],
      ['fun', null],
      ['full', null],
      ['quixotic', 'quixotically'],
      ['cute', 'cutely'],
      ['good', 'well'],
      ['low', 'low']
    ].forEach(function (a) {
      var arr = nlp(a[0]).adjectives().data();
      var obj = arr[0];
      str_test(obj.adverbForm, a[0], a[1], t);
    });
    t.end();
  });

  T.test(' to_superlative', function (t) {
    [
      ['quick', 'quickest'],
      ['friendly', 'friendliest'],
      // ['caring', 'most caring'],
      ['fun', 'most fun'],
      ['full', 'fullest'],
      ['quixotic', 'most quixotic'],
      ['cute', 'cutest'],
    ].forEach(function (a) {
      var arr = nlp(a[0]).adjectives().data();
      var obj = arr[0];
      str_test(obj.superlative, a[0], a[1], t);
    });
    t.end();
  });
  //
  T.test(' to_comparative', function (t) {
    [
      ['quick', 'quicker'],
      ['friendly', 'friendlier'],
      // ['caring', 'more caring'],
      ['fun', 'more fun'],
      ['full', 'fuller'],
      ['quixotic', 'more quixotic'],
      ['cute', 'cuter'],
    ].forEach(function (a) {
      var arr = nlp(a[0]).adjectives().data();
      var obj = arr[0];
      str_test(obj.comparative, a[0], a[1], t);
    });
    t.end();
  });
  //
  T.test(' to_noun', function (t) {
    [
      ['quick', 'quickness'],
      ['fancy', 'fanciness'],
      // ['ferocious', 'ferociousness'],
      // ['', ''],
      // [' ', ''],
      ['clean', 'cleanliness'],
    ].forEach(function (a) {
      var arr = nlp(a[0]).adjectives().data();
      var obj = arr[0];
      str_test(obj.nounForm, a[0], a[1], t);
    });
    t.end();
  });
  //
  T.test(' conjugate', function (t) {
    var o = nlp('nice').adjectives().data()[0];
    str_test(o.comparative, 'nice', 'nicer', t);
    str_test(o.superlative, 'nice', 'nicest', t);
    str_test(o.adverbForm, 'nice', 'nicely', t);
    str_test(o.nounForm, 'nice', 'niceness', t);
    t.end();
  });

  T.end();
});

},{"../../lib/fns":73,"../../lib/nlp":75,"tape":65}],88:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

test('==Adverb==', function (T) {

  T.test('to_adjective:', function (t) {
    [
      ['quickly', 'quick'],
      ['garishly', 'garish'],
      ['tediously', 'tedious'],
      ['frightfully', 'frightful'],
      ['tortuously', 'tortuous'],
      ['privately', 'private'],
      ['unambiguously', 'unambiguous'],
      ['cortically', 'cortic'],
      ['biradially', 'biradial'],
      ['meanly', 'mean'],
      ['raspingly', 'rasping'],
      ['comprehensively', 'comprehensive'],
      ['fervently', 'fervent'],
      ['nationally', 'national'],
      ['maternally', 'maternal'],
      ['flashily', 'flashy'],
      ['only', 'only'],
      ['narrowly', 'narrow'],
      ['blasphemously', 'blasphemous'],
      ['abortively', 'abortive'],
      ['inoffensively', 'inoffensive'],
      ['truly', 'true'],
      ['gently', 'gent'],
      ['tolerantly', 'tolerant'],
      ['enchantingly', 'enchanting'],
      ['unswervingly', 'unswerving'],
      ['grubbily', 'grubby'],
      ['longitudinally', 'longitudinal'],
      ['thermodynamically', 'thermodynamic'],
      ['mirthfully', 'mirthful'],
      ['salaciously', 'salacious'],
      ['dourly', 'dour'],
      ['credulously', 'credulous'],
      ['carefully', 'careful'],
      ['knowingly', 'knowing'],
      ['geometrically', 'geometrical'],
      ['unassailably', 'unassailable'],
      ['antecedently', 'antecedent'],
      ['adjectively', 'adjective'],
      ['hebdomadally', 'hebdomadal'],
      ['dizzily', 'dizzy'],
      ['obnoxiously', 'obnoxious'],
      ['thirstily', 'thirsty'],
      ['biennially', 'biennial'],
      ['roguishly', 'roguish'],
      ['mentally', 'mental'],
      ['incessantly', 'incessant'],
      ['intelligently', 'intelligent'],
      ['perseveringly', 'persevering'],
      ['namely', 'name'],
      ['formidably', 'formidable'],
      ['vertically', 'vertical']
    ].forEach(function (a) {
      var o = nlp(a[0]).tag('Adverb').adverbs().data()[0];
      var msg = a[0] + ' -> ' + o.adjectiveForm;
      t.equal(o.adjectiveForm, a[1], msg);
    });
    t.end();
  });
});

},{"../../lib/nlp":75,"tape":65}],89:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var fns = require('../lib/fns');
var freshPrince = require('../lib/freshPrince');

var subsets = [
  'acronyms',
  'adjectives',
  'adverbs',
  'contractions',
  'dates',
  'hashTags',
  'organizations',
  'people',
  'phoneNumbers',
  'places',
  'sentences',
  'questions',
  'statements',
  'nouns',
  'urls',
  'values',
  'verbs'
];

test('all combined subsets empty:', function (t) {
  var r = nlp(freshPrince);
  var small = r.all();
  for(var i = 0; i < subsets.length; i++) {
    var sub = subsets[i];
    small = small[sub]();
  }
  t.equal(small.out('text'), '', 'no-uber subset');
  t.end();
});


test('all subsets have a data method:', function (t) {
  var r = nlp(freshPrince);
  subsets.forEach(function(s) {
    var sub = r[s]();
    var arr = sub.data();
    t.ok(fns.isArray(arr), s + '.data() is an array');
  });
  t.end();
});

test('all subsets support .all():', function (t) {
  var txt = freshPrince;
  var r = nlp(txt);
  subsets.forEach(function(s) {
    var sub = r[s]();
    var str = sub.all().out('text');
    var msg = s + '.all() works';
    t.equal(str, txt, msg);
  });
  t.end();
});

test('all subsets have an empty 100th element', function (t) {
  var txt = freshPrince;
  var r = nlp(txt);
  subsets.forEach(function(s) {
    var sub = r[s](9999);
    var str = sub.out('text');
    var msg = s + ' is empty';
    t.equal(str, '', msg);
  });
  t.end();
});

},{"../lib/fns":73,"../lib/freshPrince":74,"../lib/nlp":75,"tape":65}],90:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

test('basic is contractions', function(t) {
  var r = nlp(`he is cool.`);
  r.contractions().expand();
  t.equal(r.out('text'), `he is cool.`, 'expanded-expand');

  r = nlp(`he's cool.`);
  r.contractions().expand();
  t.equal(r.out('text'), `he is cool.`, 'contracted-expand');

  r = nlp(`he is cool.`);
  r.contractions().contract();
  t.equal(r.out('text'), `he's cool.`, 'expanded-contract');

  r = nlp(`he's cool.`);
  r.contractions().contract();
  t.equal(r.out('text'), `he's cool.`, 'contracted-contract');

  t.end();
});

test('do-not contractions', function(t) {
  var r = nlp(`please do not eat the marshmellow`);
  r.contractions().expand();
  t.equal(r.out('text'), `please do not eat the marshmellow`, 'expanded-expand');

  r = nlp(`please don't eat the marshmellow`);
  r.contractions().expand();
  t.equal(r.out('text'), `please do not eat the marshmellow`, 'contracted-expand');

  r = nlp(`please do not eat the marshmellow`);
  r.contractions().contract();
  t.equal(r.out('text'), `please don't eat the marshmellow`, 'expanded-contract');

  r = nlp(`please don't eat the marshmellow`);
  r.contractions().contract();
  t.equal(r.out('text'), `please don't eat the marshmellow`, 'contracted-contract');

  t.end();
});

test('have contractions', function(t) {
  var r = nlp(`i have stood`);
  r.contractions().expand();
  t.equal(r.out('text'), `i have stood`, 'expanded-expand');

  r = nlp(`i've stood`);
  r.contractions().expand();
  t.equal(r.out('text'), `i have stood`, 'contracted-expand');

  r = nlp(`i have stood`);
  r.contractions().contract();
  t.equal(r.out('text'), `i've stood`, 'expanded-contract');

  r = nlp(`i've stood`);
  r.contractions().contract();
  t.equal(r.out('text'), `i've stood`, 'contracted-contract');
  t.end();
});

test('repeated contract-expand', function(t) {
  var r = nlp(`i'm good`);
  r.contractions().expand();
  t.equal(r.out('text'), `i am good`, 'expand-1');
  r.contractions().contract();
  t.equal(r.out('text'), `i'm good`, 'contract-1');
  r.contractions().expand();
  t.equal(r.out('text'), `i am good`, 'expand-2');
  r.contractions().contract();
  t.equal(r.out('text'), `i'm good`, 'contract-2');

  r.contractions().contract().contract().contract();
  t.equal(r.out('text'), `i'm good`, 'contract-n');

  r.contractions().expand().expand().expand();
  t.equal(r.out('text'), `i am good`, 'expand-n');
  t.end();
});

test('contracted', function(t) {
  var r = nlp(`I'll go to Toronto. I will see.`);
  var str = r.contractions().contracted().out('text');
  t.equal(str, `I'll`, 'contracted');
  str = r.contractions().expanded().out('text');
  t.equal(str, `I will`, 'expanded');
  t.end();
});

},{"../../lib/nlp":75,"tape":65}],91:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

test('==contractions==', function(T) {

  T.test('possessives-or-contractions:', function(t) {
    [
      [`spencer's good`, `spencer is good`],
      [`spencer's house`, `spencer's house`],
      [`spencer's really good`, `spencer is really good`],
      [`he's good`, `he is good`],
      [`google's about to earn money`, `google is about to earn money`],
      [`toronto's citizens`, `toronto's citizens`],
      [`rocket's red glare`, `rocket's red glare`],
      [`somebody's walking`, `somebody is walking`],
      [`everyone's victories`, `everyone's victories`],
      [`the tornado's power`, `the tornado's power`],
    ].forEach(function(a) {
      var m = nlp(a[0]);
      m.contractions().expand();
      var str = m.out('normal');
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('contraction-pos:', function(t) {
    [
      [`john's good`, `Person`],
      [`ankara's good`, `Place`],
      [`January's good`, `Date`],
      [`john's cousin`, `Person`],
      [`ankara's citizens`, `Place`],
      [`January's weather`, `Date`],
    ].forEach(function(a) {
      var term = nlp(a[0]).list[0].terms[0];
      var msg = term.text + ' has tag ' + a[1];
      t.equal(term.tag[a[1]], true, msg);
    });
    t.end();
  });

  T.test('expand:', function(t) {
    [
      [`he's a hero`, ['he', 'is']],
      [`she's here`, ['she', 'is']],
      [`it's a hero`, ['it', 'is']],
      [`he'd win`, ['he', 'would']],
      [`they'd win`, ['they', 'would']],
      [`they've begun`, ['they', 'have']],
      [`they'll begun`, ['they', 'will']],
      [`we've begun`, ['we', 'have']],
      [`don't go`, ['do', 'not']],
      // dont expand leading 'nt contraction
      [`mustn't go`, ['must', 'not']],
      [`haven't gone`, ['have', 'not']],
      [`isn't going`, ['is', 'not']],
      ['can\'t go', ['can', 'not']],
      ['ain\'t going', ['is', 'not']],
      ['won\'t go', ['will', 'not']],

      ['i\'d go', ['i', 'would']],
      ['she\'d go', ['she', 'would']],
      ['he\'d go', ['he', 'would']],
      ['they\'d go', ['they', 'would']],
      ['we\'d go', ['we', 'would']],

      ['i\'ll go', ['i', 'will']],
      ['she\'ll go', ['she', 'will']],
      ['he\'ll go', ['he', 'will']],
      ['they\'ll go', ['they', 'will']],
      ['we\'ll go', ['we', 'will']],

      ['i\'ve go', ['i', 'have']],
      ['they\'ve go', ['they', 'have']],
      ['we\'ve go', ['we', 'have']],
      ['should\'ve go', ['should', 'have']],
      ['would\'ve go', ['would', 'have']],
      ['could\'ve go', ['could', 'have']],
      ['must\'ve go', ['must', 'have']],

      ['i\'m going', ['i', 'am']],
      ['we\'re going', ['we', 'are']],
      ['they\'re going', ['they', 'are']],

      [`don't`, ['do', 'not']],
      [`do not`, ['do', 'not']],
      [`dunno`, ['do', 'not', 'know']],

      [`spencer's going`, ['spencer', 'is']],
      [`he's going`, ['he', 'is']],

      [`how'd`, ['how', 'did']],
      // [`why'd`, ['why', 'did']],
      // [`who'd`, ['who', 'did']],
      [`when'll`, ['when', 'will']],
      [`how'll`, ['how', 'will']],
      [`who'll`, ['who', 'will']],
      [`who's`, ['who', 'is']],
      [`how's`, ['how', 'is']],
    ].forEach(function(a) {
      var arr = nlp(a[0]).contractions().expand().out('terms');
      var got = arr.map(function(term) {
        return term.normal;
      });
      var msg = a[0] + '  - - [' + got.join(', ') + '] should be [' + a[1].join(', ') + ']';
      t.deepEqual(got, a[1], msg);
    });
    t.end();
  });
  //
  T.test('contract:', function(t) {
    [
      [`he is a hero`, `he's`],
      [`she is here`, `she's`],
      [`it is a hero`, `it's`],
      [`he would win`, `he'd`],
      [`they would win`, `they'd`],
      [`they have begun`, `they've`],
      [`how will`, `how'll`],
      [`when will`, `when'll`],
      [`who did`, `who'd`],
      [`who is`, `who's`],
    ].forEach(function(a) {
      var term = nlp(a[0]).contractions().contract().list[0].terms[0];
      str_test(term.normal, a[0], a[1], t);
    });
    t.end();
  });

  T.test('preserve-contractions:', function(t) {
    [
      `he is a hero`,
      `she is here`,
      `it is a hero`,
      `he would win`,
      `they would win`,
    ].forEach(function(a) {
      var str = nlp(a[0]).out('normal');
      str_test(str, a[0], a[0], t);
    });
    t.end();
  });

  T.test('contraction-supports-whitespace:', function(t) {
    [
      ['We\'ve only just begun', 'We have only just begun'],
      ['We\'ve   only just begun', 'We have   only just begun']
    ].forEach(function(a) {
      var m = nlp(a[0]);
      m.contractions().expand();
      var str = m.out('text');
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('numberRange-contraction:', function(t) {
    var r = nlp('june 5-7 1998').match('5 to 7');
    t.equal(r.out('normal'), '5-7', 'june 5-7 numberRange');

    r = nlp('rooms 99-102').match('99 to 102');
    t.equal(r.out('normal'), '99-102', 'rooms 99-102');

    r = nlp('june 5th-7th 1998').match('5th to 7th');
    t.equal(r.out('normal'), '5th-7th', 'june 5th-7th numberRange');

    r = nlp('june 5th - 7th 1998').match('5th to 7th');
    t.equal(r.out('text'), ' 5th - 7th', 'june 5th - 7th numberRange');

    t.end();
  });

  T.test('numberRange-expand:', function(t) {
    var r = nlp('june 5-7 1998');
    r.contractions().expand();
    var str = r.out('normal');
    t.equal(str, 'june 5 to 7 1998', 'june 5-7 numberRange');

    r = nlp('rooms 99-102');
    r.contractions().expand();
    str = r.out('normal');
    t.equal(str, 'rooms 99 to 102', 'rooms 99-102');

    r = nlp('june 5th-7th 1998');
    r.contractions().expand();
    str = r.out('normal');
    t.equal(str, 'june 5th to 7th 1998', 'june 5th-7th numberRange');

    r = nlp('june 5th - 7th 1998');
    r.contractions().expand();
    str = r.out('normal');
    t.equal(str, 'june 5th to 7th 1998', 'june 5th - 7th numberRange');

    t.end();
  });

});

},{"../../lib/fns":73,"../../lib/nlp":75,"tape":65}],92:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

test('date-parse :', function(t) {
  [
    ['june 5th 1999', [5, 5, 1999]],
    ['june 5th 1999', [5, 5, 1999]],
    ['january 1st 1644', [0, 1, 1644]],
    ['jan 1st 1644', [0, 1, 1644]],
    ['June 4th 1993', [5, 4, 1993]],
    ['March 1st 1987', [2, 1, 1987]],
    ['June 22nd 2014', [5, 22, 2014]],
    ['may 22nd 2014', [4, 22, 2014]],
    ['sep 22nd 2014', [8, 22, 2014]],
    ['apr 22nd 2014', [3, 22, 2014]],
    ['June 22nd 1997', [5, 22, 1997]],
    ['3rd of March 1969', [2, 3, 1969]],
    ['2nd of April 1929', [3, 2, 1929]],
    ['2nd of jul 1929', [6, 2, 1929]],
    //incomplete dates
    ['March 1969', [2, null, 1969]],
    ['March 18th', [2, 18, null]],
    ['August 28th', [7, 28, null]],
    ['18th of March', [2, 18, null]],
    ['27th of March', [2, 27, null]],
    // ['2012-2014', [null, null, 2012]],
    // ['1997-1998', [null, null, 1997]],
    // ['1998', [null, null, 1998]],
    // ['1672', [null, null, 1672]],
    // ['2015', [null, null, 2015]],
    ['january 5th 1998', [0, 5, 1998]],
    ['february 10th', [1, 10, null]],
    ['february 30th', [1, 30, null]],
    ['jan 1921', [0, null, 1921]],
  //invalid dates
  // ['303rd of March 1969', [2, null, 1969]],
  // ['4103', [null, null, null]],
  // ['January 5th 4032', [0, 5, null]],
  ].forEach(function(a) {
    var arr = nlp(a[0]).dates().data();
    var o = arr[0].date;
    got = [o.month, o.date, o.year];
    var msg = 'date "' + a[0] + '"  got: [' + got.join(',') + ']  want: [' + a[1].join(',') + ']';
    t.deepEqual(got, a[1], msg);
  });
  t.end();
});

//   durations //

// ['March 7th-11th 1987', [2, 7, 1987]],
// ['June 1st-11th 1999', [5, 1, 1999]],
// ['28th of September to 5th of October 2008', [8, 28, 2008]],
// ['2nd of January to 5th of October 2008', [9, 5, 2008]],
// ['March 7th to june 11th 1987', [2, 7, 1987]],
// ['April 17th to september 11th 1981', [3, 17, 1981]],
// ['June 1st to June 11th 2014', [5, 1, 2014]],
// ['between 13 February and 15 February 1945', [1, 13, 1945]],
// ['between March 7th and june 11th 1987', [2, 7, 1987]],
// ['3rd - 5th of March 1969', [2, 3, 1969]],
// ["September 1939 to April 1945",  ["month":null,"day":null,"year":1939]],
// ["June 1969 to April 1975",  ["month":null,"day":null,"year":1969]],
// ["2014-1998",  ["month":null,"day":null,"year":null]],

},{"../../lib/nlp":75,"tape":65}],93:[function(require,module,exports){
(function (__filename){
var test = require('tape');
var nlp = require('../../lib/nlp');

var file = '';
if (typeof __filename !== 'undefined') {
  file = require('path').basename(__filename).replace(/\.js$/);
}
test(file + ': date-tag :', function(t) {
  [
    'yesterday',
    'today',
    'tomorrow',
    'morning',
    'afternoon',
    'evening',
    'noon',
    'midnight',
    'yesterday at noon',
    'yesterday at midnight',
    'today at noon',
    'today at midnight',
    'tomorrow at noon',
    'tomorrow at midnight',
    'this morning',
    'this afternoon',
    'this evening',
    'yesterday morning',
    'yesterday afternoon',
    'yesterday evening',
    'today morning',
    'today afternoon',
    'today evening',
    'tomorrow morning',
    'tomorrow afternoon',
    'tomorrow evening',
    'thursday morning',
    'thursday afternoon',
    'thursday evening',
    '6:00 yesterday',
    '6:00 today',
    '6:00 tomorrow',
    '5am yesterday',
    '5am today',
    '5am tomorrow',
    '4pm yesterday',
    '4pm today',
    '4pm tomorrow',
    'tuesday last week',
    'tuesday this week',
    'tuesday next week',
    'last week wednesday',
    'this week wednesday',
    'next week wednesday',
    '10 seconds ago',
    '10 minutes ago',
    '10 hours ago',
    '10 days ago',
    '10 weeks ago',
    '10 months ago',
    '10 years ago',
    'saturday',
    'sunday 11:00',
    'yesterday at 4:00',
    'today at 4:00',
    'tomorrow at 4:00',
    'yesterday at 6:45am',
    'today at 6:45am',
    'tomorrow at 6:45am',
    'yesterday at 6:45pm',
    'today at 6:45pm',
    'tomorrow at 6:45pm',
    'yesterday at 2:32 AM',
    'today at 2:32 AM',
    'tomorrow at 2:32 AM',
    'yesterday at 2:32 PM',
    'today at 2:32 PM',
    'tomorrow at 2:32 PM',
    'yesterday 02:32',
    'today 02:32',
    'tomorrow 02:32',
    'yesterday 2:32am',
    'today 2:32am',
    'tomorrow 2:32am',
    'yesterday 2:32pm',
    'today 2:32pm',
    'tomorrow 2:32pm',
    'wednesday at 14:30',
    'wednesday at 02:30am',
    'wednesday at 02:30pm',
    'wednesday 14:30',
    'wednesday 02:30am',
    'wednesday 02:30pm',
    'friday 03:00 am',
    'friday 03:00 pm',
    'sunday at 05:00 am',
    'sunday at 05:00 pm',
    '4th february',
    'november 3rd',
    'last june',
    'next october',
    '6 am',
    '5am',
    '5:30am',
    '8 pm',
    '4pm',
    '4:20pm',
    '06:56:06 am',
    '06:56:06 pm',
    'mon 2:35',
    '1:00 sun',
    '1am sun',
    '1pm sun',
    '1:00 on sun',
    '1am on sun',
    '1pm on sun',
    '12:14 PM',
    '12:14 AM',
    '2 seconds before now',
    '2 minutes before now',
    '2 hours before now',
    '2 days before now',
    '2 weeks before now',
    '2 months before now',
    '2 years before now',
    '4 seconds from now',
    '4 minutes from now',
    '4 hours from now',
    '4 days from now',
    '4 weeks from now',
    '4 months from now',
    '4 years from now',
    // '6 in the morning',
    // '4 in the afternoon',
    // '9 in the evening',
    // 'monday 6 in the morning',
    // 'monday 4 in the afternoon',
    // 'monday 9 in the evening',
    'last sunday at 21:45',
    'monday last week',
    '12th day last month',
    '12th day this month',
    '12th day next month',
    '1st tuesday last november',
    '1st tuesday this november',
    '1st tuesday next november',
    '10 hours before noon',
    '10 hours before midnight',
    '5 hours after noon',
    '5 hours after midnight',
    'noon last friday',
    'midnight last friday',
    'noon this friday',
    'midnight this friday',
    'noon next friday',
    'midnight next friday',
    'last friday at 20:00',
    'this friday at 20:00',
    'next friday at 20:00',
    '1:00 last friday',
    '1:00 this friday',
    '1:00 next friday',
    '1am last friday',
    '1am this friday',
    '1am next friday',
    '1pm last friday',
    '1pm this friday',
    '1pm next friday',
    '5 am last monday',
    '5 am this monday',
    '5 am next monday',
    '5 pm last monday',
    '5 pm this monday',
    '5 pm next monday',
    'last wednesday 7am',
    'this wednesday 7am',
    'next wednesday 7am',
    'last wednesday 7pm',
    'this wednesday 7pm',
    'next wednesday 7pm',
    'last tuesday 11 am',
    'this tuesday 11 am',
    'next tuesday 11 am',
    'last tuesday 11 pm',
    'this tuesday 11 pm',
    'next tuesday 11 pm',
    'yesterday at 13:00',
    'today at 13:00',
    '2nd friday in august',
    '3rd wednesday in november',
    'tomorrow 1 year ago',
    '11 january 2 years ago',
    '6 mondays from now',
    // 'final thursday in april',
    'last thursday in april',
    'monday to friday',
    '1 April to 31 August',
    '1999-12-31 to tomorrow',
    // 'now to 2010-01-01',
    '2009-03-10 9:00 to 11:00',
    '26 oct 10:00 am to 11:00 am',
    // 'jan 1 to 2',
    '16:00 nov 6 to 17:00',
    'may 2nd to 5th',
    '6am dec 5 to 7am',
    // '1/3 to 2/3',
    // '2/3 to in 1 week',
    // '3/3 21:00 to in 5 days',
    // 'first day of 2009 to last day of 2009',
    // 'first day of may to last day of may',
    // 'first to last day of 2008',
    // 'first to last day of september',
    'for 4 seconds',
    'for 4 minutes',
    'for 4 hours',
    'for 4 days',
    'for 4 weeks',
    'for 4 months',
    'for 4 years',
    'january 11',
    '11 january',
    '18 oct 17:00',
    '18 oct 5am',
    '18 oct 5pm',
    '18 oct 5 am',
    '18 oct 5 pm',
    'dec 25',
    'feb 28 3:00',
    'feb 28 3am',
    'feb 28 3pm',
    'feb 28 3 am',
    'feb 28 3 pm',
    '19:00 jul 1',
    '7am jul 1',
    '7pm jul 1',
    '7 am jul 1',
    '7 pm jul 1',
    'jan 24, 2011 12:00',
    'jan 24, 2011 12am',
    'jan 24, 2011 12pm',
    'may 27th',
    // '2005',
    'march 1st 2009',
    'february 14, 2004',
    'jan 3 2010',
    '3 jan 2000',
    '2010 october 28',
    // '1/3',
    // '1/3 16:00',
    '4:00',
    '17:00',
    '3:20:00',
    '1st day last year',
    '1st day this year',
    '1st day next year',
    '6th day last week',
    '6th day this week',
    '6th day next week',
    'yesterday 7 seconds ago',
    'yesterday 7 minutes ago',
    'yesterday 7 hours ago',
    'yesterday 7 days ago',
    'yesterday 7 weeks ago',
    'yesterday 7 months ago',
    'yesterday 7 years ago',
    'tomorrow 3 seconds ago',
    'tomorrow 3 minutes ago',
    'tomorrow 3 hours ago',
    'tomorrow 3 days ago',
    'tomorrow 3 weeks ago',
    'tomorrow 3 months ago',
    'tomorrow 3 years ago',
    '2nd monday',
    '100th day',
    '11 january next year',
    '11 january this year',
    '11 january last year',
    '6 hours before yesterday',
    '6 hours before tomorrow',
    '3 hours after yesterday',
    '3 hours after tomorrow',
    'saturday 3 months ago at 17:00',
    'saturday 3 months ago at 5:00am',
    'saturday 3 months ago at 5:00pm',
    '4th day last week',
    '8th month last year',
    '8th month this year',
    '8th month next year',
    'fri 3 months ago at 5am',
    'wednesday 1 month ago at 8pm',
    'October 2006',
    '27/5/1979',
  // '-5min',
  // '+2d',
  // '100th day to 200th',
  // 'march'
  ].forEach(function(first) {
    var str = nlp(first).match('#Date+').out('text');
    var msg = first + '  -> ' + str;
    t.equal(first, str, msg);
  });
  t.end();
});

}).call(this,"/test/unit/subset/date/date_tag.test.js")
},{"../../lib/nlp":75,"path":44,"tape":65}],94:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');


test('one big dates', function (t) {
  var r = nlp('six years and 2 days before the start of this next wednesday january 5th 1992 at 6pm');
  var dates = r.dates().data();
  t.equal(dates.length, 1, 'one long date');

  var o = dates[0];
  t.equal(o.punt.direction, 'backward', 'direction');
  t.equal(o.punt.duration.year, 6, 'durationyear');
  t.equal(o.punt.duration.day, 2, 'durationday');
  t.equal(o.section, 'start', 'section');
  t.equal(o.date.month, 0, 'relativemonth');
  t.equal(o.date.date, 5, 'relativedate');
  t.equal(o.date.weekday, 3, 'relativeweekday');
  t.equal(o.date.year, 1992, 'relativeyear');
  t.equal(o.date.knownDate, null, 'knowndate');
  // t.equal(o.article, a[1], msg);
  t.end();
});

test('short+long form', function (t) {
  var r = nlp('wednesday, january 2nd, 2016');
  var shorter = r.dates().toShortForm().out('normal');
  t.equal(shorter, 'wed jan 2nd 2016');

  var r2 = nlp('Thurs, feb 2nd, 2016');
  var longer = r2.dates().toLongForm().out('normal');
  t.equal(longer, 'thursday february 2nd 2016');

  // var r2 = nlp('Thurs, feb 2nd, 2016')
  // var longer = r2.dates().toLongForm().out('text')
  // t.equal(longer, 'Thursday, February 2nd, 2016')

  t.end();
});

},{"../../lib/nlp":75,"tape":65}],95:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

test('edgegram-sizes:', function (t) {
  var r = nlp(`he is cool. john was cool. He is really nice.`);

  var arr = r.startGrams(null, 5).data();
  t.equal(arr.length, 0, 'no-overgrams');

  arr = r.startGrams(null, 4).data();
  t.equal(arr.length, 1, 'one-4-startgram');

  arr = r.endGrams(null, 4).data();
  t.equal(arr.length, 1, 'one-4-endgram');

  t.end();
});

test('start-sizes:', function (t) {
  var r = nlp(`he is cool. john was cool. He is really nice.`);
  var arr = r.startGrams().data();
  t.equal(arr[0].normal, 'he is', 'sorted-by-freq');
  t.equal(arr[0].count, 2, 'normalized-counted');
  t.equal(arr[0].size, 2, 'normalized-counted');
  t.end();
});

},{"../../lib/nlp":75,"tape":65}],96:[function(require,module,exports){
'use strict';
var test = require('tape');
var nlp = require('../../lib/nlp');

test('ngram-test:', function (t) {

  var r = nlp('he is strong. he is cool');
  var arr = r.ngrams().data();

  t.equal(arr[0].normal, 'he is', 'sorted-by-freq');
  t.equal(arr[0].count, 2, 'normalized-counted');
  t.equal(arr[0].size, 2, 'normalized-counted');

  t.equal(arr.length, 9, 'ngram-length');
  t.end();
});

test('sort-bigrams:', function (t) {
  var r = nlp('he is strong. he is cool');
  var arr = r.ngrams(null, 2).data();
  t.equal(arr[0].normal, 'he is', '#1-by-freq');
  t.equal(arr[1].normal, 'is strong', '#2-by-freq');
  t.equal(arr[2].normal, 'is cool', '#3-by-freq');
  t.equal(arr.length, 3, 'ngram-length');
  t.end();
});

},{"../../lib/nlp":75,"tape":65}],97:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

test('.article():', function(t) {
  [
    ['duck', 'a'],
    ['eavesdropper', 'an'],
    ['alligator', 'an'],
    // ['hour', 'an'],
    ['NDA', 'an'],
    ['F.B.I', 'an'],
    ['N.D.A.', 'an'],
    ['eulogy', 'a'],
    ['ukalele', 'a'],
  ].forEach(function (a) {
    var o = nlp(a[0]).tag('Noun').nouns().data()[0];
    var msg = a[0] + ' -> ' + o.article;
    t.equal(o.article, a[1], msg);
  });
  t.end();
});

},{"../../lib/nlp":75,"tape":65}],98:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

test('==Plurals==', function(T) {

  T.test('is_plural():', function(t) {
    [
      ['octopus', false],
      ['tree', false],
      ['trees', true],
      // ['i', false],
      ['mayor of chicago', false],
      ['mayors of chicago', true],
      ['octopus', false],
      ['octopi', true],
      ['eyebrow', false],
      ['eyebrows', true],
      ['child', false],
      ['children', true],
      ['spencer\'s', false],
      ['toronto\'s', false],
    // ['simpsons\'', false],
    // ['she\'s', false],
    ].forEach(function (a) {
      var r = nlp(a[0]).nouns();
      var msg = a[0];
      t.equal(r.isPlural()[0], a[1], msg);
    });
    t.end();
  });

  T.test('singularize:', function(t) {
    [
      // ["Joneses", "Jones"],
      ['children', 'child'],
      ['women', 'woman'],
      ['men', 'man'],
      ['people', 'person'],
      ['geese', 'goose'],
      ['mice', 'mouse'],
      ['barracks', 'barracks'],
      ['deer', 'deer'],
      ['nuclei', 'nucleus'],
      ['syllabi', 'syllabus'],
      ['fungi', 'fungus'],
      ['cacti', 'cactus'],
      ['theses', 'thesis'],
      ['crises', 'crisis'],
      ['phenomena', 'phenomenon'],
      ['embryos', 'embryo'],
      ['frescos', 'fresco'],
      ['ghettos', 'ghetto'],
      ['halos', 'halo'],
      ['mangos', 'mango'],
      ['mementos', 'memento'],
      ['mottos', 'motto'],
      ['tornados', 'tornado'],
      ['tuxedos', 'tuxedo'],
      ['volcanos', 'volcano'],
      ['crises', 'crisis'],
      ['analyses', 'analysis'],
      ['aircraft', 'aircraft'],
      ['bass', 'bass'],
      ['bison', 'bison'],
      ['fish', 'fish'],
      ['fowl', 'fowl'],
      ['kilos', 'kilo'],
      ['kimonos', 'kimono'],
      ['logos', 'logo'],
      ['memos', 'memo'],
      ['ponchos', 'poncho'],
      ['photos', 'photo'],
      ['pimentos', 'pimento'],
      ['pros', 'pro'],
      ['sombreros', 'sombrero'],
      ['tacos', 'taco'],
      ['memos', 'memo'],
      ['torsos', 'torso'],
      ['xylophones', 'xylophone'],
      ['quintuplets', 'quintuplet'],
      ['worrywarts', 'worrywart'],
      ['nerds', 'nerd'],
      ['lollipops', 'lollipop'],
      ['eyebrows', 'eyebrow'],
      // ['mayors of chicago', 'mayor of chicago'],
      //test that sungular.singularize()==singular..
      ['mango', 'mango'],
      ['memento', 'memento'],
      ['motto', 'motto'],
      ['tornado', 'tornado'],
      ['person', 'person'],
      ['goose', 'goose'],
      ['mouse', 'mouse'],
      ['calves', 'calf'],
      ['olives', 'olive'],
      ['loaves', 'loaf'],
      ['oafs', 'oaf'],
      ['wives', 'wife'],
      ['roofs', 'roof'],
      ['hooves', 'hoof']
    ].forEach(function (a) {
      var r = nlp(a[0]).tag('Noun').nouns();
      var str = r.toSingular().out('normal');
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('pluralize:', function(t) {
    [
      ['snake', 'snakes'],
      ['ski', 'skis'],
      // ["Barrymore", "Barrymores"],
      ['witch', 'witches'],
      ['box', 'boxes'],
      ['gas', 'gases'],
      ['kiss', 'kisses'],
      ['index', 'indices'],
      ['appendix', 'appendices'],
      ['criterion', 'criteria'],
      ['berry', 'berries'],
      ['activity', 'activities'],
      ['daisy', 'daisies'],
      ['church', 'churches'],
      ['fox', 'foxes'],
      ['stomach', 'stomachs'],
      ['epoch', 'epochs'],
      ['knife', 'knives'],
      ['half', 'halves'],
      ['scarf', 'scarves'],
      ['chief', 'chiefs'],
      ['spoof', 'spoofs'],
      ['cafe', 'cafes'],
      ['gulf', 'gulfs'],
      ['alternative', 'alternatives'],
      ['solo', 'solos'],
      ['zero', 'zeros'],
      ['avocado', 'avocados'],
      ['studio', 'studios'],
      ['zoo', 'zoos'],
      ['embryo', 'embryos'],
      ['hero', 'heroes'],
      ['banjo', 'banjos'],
      ['cargo', 'cargos'],
      ['flamingo', 'flamingos'],
      ['fresco', 'frescos'],
      ['ghetto', 'ghettos'],
      ['halo', 'halos'],
      ['mango', 'mangos'],
      ['memento', 'mementos'],
      ['motto', 'mottos'],
      ['tornado', 'tornados'],
      ['tuxedo', 'tuxedos'],
      ['volcano', 'volcanos'],
      ['bus', 'buses'],
      ['crisis', 'crises'],
      ['analysis', 'analyses'],
      ['neurosis', 'neuroses'],
      ['aircraft', 'aircraft'],
      ['halibut', 'halibut'],
      ['moose', 'moose'],
      ['salmon', 'salmon'],
      ['sheep', 'sheep'],
      ['spacecraft', 'spacecraft'],
      ['tuna', 'tuna'],
      ['trout', 'trout'],
      ['armadillo', 'armadillos'],
      ['auto', 'autos'],
      ['bravo', 'bravos'],
      ['bronco', 'broncos'],
      ['casino', 'casinos'],
      ['combo', 'combos'],
      ['gazebo', 'gazebos'],
      //test that plural.pluralize()==plural..
      ['snakes', 'snakes'],
      ['skis', 'skis'],
      // ['mayor of chicago', 'mayors of chicago'],
      // ["Barrymores", "Barrymores"],
      ['witches', 'witches'],
      ['boxes', 'boxes'],
      ['gases', 'gases'],
      ['spoofs', 'spoofs'],
      ['solos', 'solos'],
      ['avocados', 'avocados'],
      ['studios', 'studios'],
      ['zoos', 'zoos'],
    ].forEach(function (a) {
      var r = nlp(a[0]).tag('Noun').nouns();
      var str = r.toPlural().out('normal');
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });
});

},{"../../lib/fns":73,"../../lib/nlp":75,"tape":65}],99:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

test('pronoun:', function(t) {
  [
    ['John', 'he'],
    ['John Smith', 'he'],
    ['Jane', 'she'],
    // ['turtle', 'it'],
    // ['turtles', 'they'],
    // ['Toronto', 'it'],
    // ['studying', 'it'],
    // ['horses', 'they'],
    // ['road bikes', 'they'],
    // ['NHL goaltenders', 'they'],
    ['Tony Danza', 'he'],
    ['Tanya Danza', 'she'],
    ['Mrs. Tanya Danza', 'she'],
  // ['John G. Fishermore Institute', 'it'],
  // ['John Fisher & sons', 'it'],
  ].forEach(function (a) {
    var str = nlp(a[0]).people().pronoun()[0];
    var msg = a[0] + ' -> ' + str;
    t.equal(str, a[1], msg);
  });
  t.end();
});

},{"../../lib/nlp":75,"tape":65}],100:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

//list of famous names taken from https://gate.ac.uk/gate/plugins/ANNIE/resources/gazetteer/
var tests = {
  'john stewart': 'Male',
  'martha stewart': 'Female',
  // 'Gaugin': 'Male',
  // 'Gauguin': 'Male',
  'George Bush': 'Male',
  'Hillary Clinton': 'Female',
  'Hillary Rodham Clinton': 'Female',
  // 'John the Baptist': 'Male',
  'Margaret Thatcher': 'Female',
  'Messiaen': 'Male',
  'Mozart': 'Male',
  'Nixon': 'Male',
  'Pope John Paul II': 'Male',
  'Richard Nixon': 'Male',
  'Ronald Reagan': 'Male',
  'Saddam Hussain': 'Male',
  'Saint - Saens': 'Male',
  // 'Shostakovich': 'Male',
  // 'Strauss': 'Male',
  // 'Thatcher': 'Female',
  // 'The Queen': 'Female',
  // 'the Queen': 'Female',
  'Van Gogh': 'Male',
  'Virgin Mary': 'Female',
  'Vivaldi': 'Male',
  'van Gogh': 'Male',
  'Carl Marx': 'Male',
  'Lenin': 'Male',
  'Stalin': 'Male',
  'George W.Bush': 'Male',
  'Mitt Romney': 'Male',
  'Barack Obama': 'Male',
  'Obama': 'Male',
  'Lady Gaga': 'Female',
  'Kanye West': 'Male',
  'Abu Hamza': 'Male',
  'Abu Hamza Al - Masri': 'Male',
  'Osama bin Laden': 'Male',
  'Osama Bin Laden': 'Male',
  'Mubarek': 'Male',
  'Muhammad Ali': 'Male',
  'Jennifer Aniston': 'Female',
  'Tyra Banks': 'Female',
  'Mario Batali': 'Male',
  'David Beckham': 'Male',
  'Halle Berry': 'Female',
  'Tom Brady': 'Male',
  'Matthew Broderick': 'Male',
  'Nathan Lane': 'Male',
  'Mel Brooks': 'Male',
  'Dan Brown': 'Male',
  'Jerry Bruckheimer': 'Male',
  'Kobe Bryant': 'Male',
  'Gisele Bundchen': 'Female',
  'Jim Carrey': 'Male',
  'Dave Chappelle': 'Male',
  'Sean Combs': 'Male',
  'Katie Couric': 'Female',
  'Simon Cowell': 'Male',
  'Tom Cruise': 'Male',
  'Johnny Depp': 'Male',
  'Cameron Diaz': 'Female',
  'Leonardo DiCaprio': 'Male',
  'Celine Dion': 'Female',
  'Jodie Foster': 'Female',
  'John Grisham': 'Male',
  'Tom Hanks': 'Male',
  'Paris Hilton': 'Female',
  'Eric Idle': 'Male',
  'Mike Nichols': 'Male',
  'Peter Jackson': 'Male',
  'LeBron James': 'Male',
  'Derek Jeter': 'Male',
  'Scarlett Johansson': 'Female',
  'Elton John': 'Male',
  'Angelina Jolie': 'Female',
  'Michael Jordan': 'Male',
  'Nicole Kidman': 'Female',
  'Heidi Klum': 'Female',
  'Emeril Lagasse': 'Male',
  'Jay Leno': 'Male',
  'David Letterman': 'Male',
  'Adriana Lima': 'Female',
  'Rush Limbaugh': 'Male',
  'George Lopez': 'Male',
  'Jennifer Lopez': 'Female',
  'George Lucas': 'Male',
  'Paul McCartney': 'Male',
  'Dr. Phil McGraw': 'Male',
  'Phil Mickelson': 'Male',
  'Kate Moss': 'Female',
  'Neil Diamond': 'Male',
  'Bill O\'Reilly': 'Male',
  'Shaquille O\'Neal': 'Male',
  'Carson Palmer': 'Male',
  'James Patterson': 'Male',
  'Ty Pennington': 'Male',
  'Regis Philbin': 'Male',
  'Brad Pitt': 'Male',
  'Wolfgang Puck': 'Male',
  'Rachael Ray': 'Female',
  'Nicole Richie': 'Female',
  'Alex Rodriguez': 'Male',
  'Ray Romano': 'Male',
  'Ronaldinho': 'Male',
  'Valentino Rossi': 'Male',
  'J.K. Rowling': 'Female',
  'Adam Sandler': 'Male',
  'Diane Sawyer': 'Female',
  'Michael Schumacher': 'Male',
  'Ryan Seacrest': 'Male',
  'Jerry Seinfeld': 'Male',
  'Maria Sharapova': 'Female',
  'Jessica Simpson': 'Female',
  'Will Smith': 'Male',
  'Annika Sorenstam': 'Female',
  'Steven Spielberg': 'Male',
  'Bruce Springsteen': 'Male',
  'Howard Stern': 'Male',
  'Rod Stewart': 'Male',
  'Kiefer Sutherland': 'Male',
  'Donald Trump': 'Male',
  'Rick Warren': 'Male',
  'Denzel Washington': 'Male',
  'Sardinia F Jones': 'Female',
  'Andrew Lloyd Webber': 'Male',
  'Michelle Wie': 'Female',
  'Serena Williams': 'Female',
  'Venus Williams': 'Female',
  'Oprah Winfrey': 'Female',
  'Reese Witherspoon': 'Female',
  'Dick Wolf': 'Male',
  'Tiger Woods': 'Male',
  'Renee Zellweger': 'Female',
  'Whitney Houston': 'Female',
  'Adolf Hitler': 'Male',
  'Shania Twain': 'Female',
  'Hulk Hogan': 'Male',
  'Michelle Obama': 'Female',
  'Ashton Kutcher': 'Male',
  'Cardinal Wolsey': 'Male',
  'Slobodan Milosevic': 'Male',
  'Renee Zellweger ': 'Female',
  'Whitney Houston ': 'Female',
};

test('celebrity names:', function (t) {
  Object.keys(tests).forEach(function(k) {
    var str = nlp(k).people().out('text');
    var msg = '\'' + k + '\' is a person - - have: \'' + str + '\'';
    t.equal(str, k, msg);
  });
  t.end();
});

},{"../../lib/nlp":75,"tape":65}],101:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('reserved words:', function (t) {

  var reserved = [
    'abstract',
    'boolean',
    'break',
    'byte',
    'case',
    'catch',
    'char',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'double',
    'else',
    'enum',
    'export',
    'extends',
    'false',
    'final',
    'finally',
    'float',
    'for',
    'function',
    'goto',
    'if',
    'implements',
    'import',
    'in',
    'instanceof',
    'int',
    'interface',
    'let',
    'long',
    'native',
    'new',
    'null',
    'package',
    'private',
    'protected',
    'prototype',
    'public',
    'return',
    'short',
    'static',
    'super',
    'switch',
    'synchronized',
    'this',
    'throw',
    'throws',
    'transient',
    'true',
    'try',
    'typeof',
    'var',
    'void',
    'volatile',
    'while',
    'with',
    'yeild',
    '__prototype__',
    '&&',
    '||',
    '|',
    '\'',
    '&',
    'Math.PI',
    12e34,
    '#§$%',
    'π',
    'привет',
    'café',
    '$$$',
    1e2,
    '{}',
    '[]'
  ];
  var str = reserved.join(' ');
  var r = nlp(str);
  t.equal(r.out('text'), str, 'reserved-words-are-printed');
  t.equal(r.terms().length, reserved.length, 'reserved-length');
  t.ok(r.verbs().data(), 'runs verb subset');
  t.ok(r.values().data(), 'runs value subset');
  t.ok(r.nouns().data(), 'runs noun subset');
  t.ok(r.ngrams().data(), 'runs ngrams subset');
  t.end();
});

},{"../lib/nlp":75,"tape":65}],102:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

test('prepend:', function(t) {
  var r = nlp('john is nice. he lives in SOHO.');
  r.sentences().prepend('so');
  t.equal(r.out('text'), 'so john is nice. so he lives in SOHO.', 'prepend-without-capital');

  r = nlp('It is nice. He lives in SOHO.');
  r.sentences().prepend('so');
  t.equal(r.out('text'), 'So it is nice. So he lives in SOHO.', 'prepend-with-capital');

  r = nlp('John is nice. FBI are in SOHO.');
  r.sentences().prepend('so');
  t.equal(r.out('text'), 'So John is nice. So FBI are in SOHO.', 'prepend-with-persistent-capital');

  r = nlp('It is nice. He lives in SOHO.');
  r.sentences().prepend('believe me');
  t.equal(r.out('text'), 'Believe me it is nice. Believe me he lives in SOHO.', 'multiple-word-prepend');

  t.end();
});

test('append:', function(t) {
  var r = nlp('john is nice. he lives in SOHO');
  r.sentences().append('not');
  t.equal(r.out('text'), 'john is nice not. he lives in SOHO not', 'append-with-without-period');

  r = nlp('It is nice! He lives in SOHO? I don\'t know...');
  r.sentences().append('dawg');
  t.equal(r.out('text'), 'It is nice dawg! He lives in SOHO dawg? I don\'t know dawg...', 'append-with-exclamations');

  r = nlp('It is nice. He lives in SOHO.');
  r.sentences().append('believe me');
  t.equal(r.out('text'), 'It is nice believe me. He lives in SOHO believe me.', 'multiple-word-append');

  t.end();
});

},{"../../lib/nlp":75,"tape":65}],103:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

test('quotation test:', function(t) {
  [
    [`he is "really good"`, `really good`],
    [`he is "really good" i guess`, `really good`],
    [`he is "good" i guess`, `good`],
    [`he is "completely and utterly great" i guess`, `completely and utterly great`],
    [`“quote”`, `quote`],
    [`“quote is here”`, `quote is here`],
  ].forEach(function (a) {
    var str = nlp(a[0]).match('#Quotation+').out('normal');
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

},{"../../lib/fns":73,"../../lib/nlp":75,"tape":65}],104:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

test('sentence-change-tense:', function(t) {
  [
    ['john walks quickly', 'john walked quickly', 'john will walk quickly'],
    ['he is quick', 'he was quick', 'he will be quick'],
    ['the stool falls over', 'the stool fell over', 'the stool will fall over'],
    // ['i usually take the stairs', 'i usually took the stairs', 'i usually will take the stairs'],
    // ['i usually use the stairs', 'i usually used the stairs', 'i usually will use the stairs'],
    // ['cardboard is made of tree fibre', 'cardboard was made of tree fibre', 'cardboard will be made of tree fibre'],
    ['he finishes first', 'he finished first', 'he will finish first'],
    ['our house looks great', 'our house looked great', 'our house will look great'],

    //infinitives
    // ['he does what he can to stop', 'he did what he could to stop', 'he will do what he can to stop'],
    ['goes to sleep', 'went to sleep', 'will go to sleep'],

    //grammatical-number
    // ['we do what we can to stop', 'we did what we could to stop', 'we will do what we can to stop'],

    //multi-sentence
    ['this is one sentence. This makes two now.', 'this was one sentence. This made two now.', 'this will be one sentence. This will make two now.'],

  //support negative
  // ['this isn\'t one sentence. This doesn\'t make two now.', 'this was not one sentence. This didn\'t make two now.', 'this won\'t be one sentence. This won\'t make two now.']
  ].forEach(function (a) {
    var r = nlp(a[0]).sentences();

    r.toPastTense();
    var str = r.out('text');
    t.equal(str, a[1], str);

    r.toFutureTense();
    str = r.out('text');
    t.equal(str, a[2], str);

    r.toPresentTense();
    str = r.out('text');
    t.equal(str, a[0], str);

  });
  t.end();
});


test('copula-form', function(t) {
  var m = nlp('john is nice').sentences();

  m.toPastTense();
  t.equal(m.out(), 'john was nice', 'toPast-1');

  m.toPresentTense();
  t.equal(m.out(), 'john is nice', 'toPres-1');

  m.toFutureTense();
  t.equal(m.out(), 'john will be nice', 'toFuture-1');

  m.toNegative();
  t.equal(m.out(), 'john will not be nice', 'toNeg-future');

  //negative forms
  m.toPastTense();
  t.equal(m.out(), 'john was not nice', 'toPast-neg');

  m.toPresentTense();
  t.equal(m.out(), 'john is not nice', 'toPres-neg');

  m.toFutureTense();
  t.equal(m.out(), 'john will not be nice', 'toFuture-neg');

  t.end();
});

test('conjugate-form', function(t) {
  var m = nlp('john walks quickly').sentences();

  m.toPastTense();
  t.equal(m.out(), 'john walked quickly', 'toPast-1');

  m.toPresentTense();
  t.equal(m.out(), 'john walks quickly', 'toPres-1');

  m.toFutureTense();
  t.equal(m.out(), 'john will walk quickly', 'toFuture-1');

  m.toNegative();
  t.equal(m.out(), 'john will not walk quickly', 'toNeg');

  //negative forms
  m.toPastTense();
  t.equal(m.out(), 'john did not walk quickly', 'toPast-neg');

  m.toPresentTense();
  t.equal(m.out(), 'john does not walk quickly', 'toPres-neg');

  m.toFutureTense();
  t.equal(m.out(), 'john will not walk quickly', 'toFuture-neg');

  t.end();
});

test('particle-form', function(t) {
  var m = nlp('the stool falls over').sentences();

  m.toPastTense();
  t.equal(m.out(), 'the stool fell over', 'toPast-1');

  m.toPresentTense();
  t.equal(m.out(), 'the stool falls over', 'toPres-1');

  m.toFutureTense();
  t.equal(m.out(), 'the stool will fall over', 'toFuture-1');

  m.toNegative();
  t.equal(m.out(), 'the stool will not fall over', 'toNeg');

  //negative forms
  m.toPastTense();
  t.equal(m.out(), 'the stool did not fall over', 'toPast-neg');

  m.toPresentTense();
  t.equal(m.out(), 'the stool does not fall over', 'toPres-neg');

  m.toFutureTense();
  t.equal(m.out(), 'the stool will not fall over', 'toFuture-neg');

  t.end();
});

},{"../../lib/nlp":75,"tape":65}],105:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;


test('==negation==', function(T) {

  T.test('negate:', function(t) {
    [
      //copula-sentences
      [`john is good`, `john is not good`],
      [`they are good`, `they are not good`],
      [`they will be good`, `they will not be good`],
      [`they will really be good`, `they will not really be good`],
      //different verb tenses
      [`he walks`, `he does not walk`],
      [`he will walk`, `he will not walk`],
      [`he walked`, `he did not walk`],
      [`he has walked`, `he has not walked`],
      [`he will have walked`, `he will not have walked`],
      [`he is walking`, `he is not walking`],
      //add adverbs
      [`he really walks`, `he really does not walk`],
      [`he will really walk`, `he will not really walk`],
      [`he really walked`, `he really did not walk`],
      [`he has really walked`, `he has not really walked`],
      [`he will have really walked`, `he will not have really walked`],
      [`he is really walking`, `he is not really walking`],
      //plural noun
      [`they walk`, `they do not walk`],
      //pronoun + infinitive
      [`i like running`, `i do not like running`],
      [`they swim`, `they do not swim`],
      [`we enjoy playing`, `we do not enjoy playing`],
      [`we swim`, `we do not swim`],
      [`we do swim`, `we do not swim`],
      [`i do care`, `i do not care`],
      [`they do care`, `they do not care`],

      //does not, is not, are not, etc.
      [`apples are bad`, `apples are not bad`],
      [`he does like it`, `he does not like it`],
      [`have died yet`, `have not died yet`],
      //logical negations
      ['john always walks', 'john never walks'],
      ['john always walks quickly', 'john never walks quickly'],
      ['everybody walks quickly', 'nobody walks quickly'],

      [`has played`, `has not played`],
      [`he has played`, `he has not played`],
      [`spencer is playing`, `spencer is not playing`],
      [`he will play`, `he will not play`],
      [`he will be playing`, `he will not be playing`],
      [`he had played`, `he had not played`],
      [`he plays`, `he does not play`],
      [`he played`, `he did not play`],
      [`he walked`, `he did not walk`],
      // [`he quietly walked`, `he did not quietly walk`],
      // [`he quietly walks`, `he does not quietly walk`],
      // [`we quietly walked`, `we do not quietly walk`],
      // [`we quietly walks`, `we do not quietly walk`],

    ].forEach(function (a) {
      var str = nlp(a[0]).sentences().toNegative().out('text');
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('sentence un-negate:', function(t) {
    [
      //copula-sentences
      [`john is not good`, `john is good`],
      [`they are not good`, `they are good`],
      [`they will not be good`, `they will be good`],
      //different verb tenses
      [`he does not walk`, `he does walk`],
      [`he did not walk`, `he did walk`],
      [`he is not walking`, `he is walking`],
      [`he has not been walking`, `he has been walking`],
      [`he did not walk`, `he did walk`],
      [`he does not walk`, `he does walk`],

      [`he has not walked`, `he has walked`],
      [`he will not have walked`, `he will have walked`],
      [`he is not walking`, `he is walking`],
      // //logical negations
      ['john never walks', 'john always walks'],
      ['john never walks quickly', 'john always walks quickly'],
    // ['everybody walks quickly', 'nobody walks quickly'],
    ].forEach(function (a) {
      var str = nlp(a[0]).sentences().toPositive().out('text');
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });
});

},{"../../lib/fns":73,"../../lib/nlp":75,"tape":65}],106:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

test('sentence tokenize:', function(t) {
  [
    ['Tony is nice. He lives in Japan.', 2],
    ['I like that Color', 1],
    ['Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds. I hope that\'s fine, etc. and you can attend Feb. 8th. Bye', 3],
    ['Soviet bonds to be sold in the U.S. market. Everyone wins.', 2],
    ['Hi there! Everyone wins!', 2],
    ['Hi there!!! Everyone wins.', 2],
    ['he bought Yahoo! the company.', 1],
    ['he is ill', 1],
    ['he is ill.', 1],
    ['she is fine. he is ill.', 2],
    ['she is fine. he is ill', 2],
    ['lkajsdflkjeicclksdfjefifh', 1],
    ['i think it is good ie. fantastic.', 1],
    ['i think it is good i.e. fantastic.', 1],
    ['i think it is good ... or else.', 1],
    ['i think it is good ... ', 1],
    ['What\'s my age again? What\'s my age again?', 2],
    ['the problem, eg. the javascript', 1],
    ['Dr. Tony is nice. He lives on Elm St. in Vancouver BC. Canada', 2],
    ['I made $5.60 today in 1 hour of work.  The E.M.T.\'s were on time, but only barely.', 2],
    ['Hi there.\nEveryone wins.', 2],
    ['Hi there!\n\nEveryone wins.', 2],
    ['Hi there\nEveryone wins', 2],
    ['Hi there.\n Everyone wins', 2],
    ['Hi there!!\nEveryone wins\n\n', 2],
  ].forEach(function (a) {
    var num = nlp(a[0]).list.length;
    var msg = '"' + a[0] + '" ->  ' + num;
    t.equal(num, a[1], msg);
  });
  t.end();
});

},{"../../lib/nlp":75,"tape":65}],107:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

test('=Whitespace=', function(T) {

  T.test('preserve whitespace:', function(t) {
    [
      'John Smith',
      'John   Smith',
      'John Smith  ',
      'John   Smith  ',
      ' John',
      ' John   Smith  ',
      //no joins
      'he is nice',
      'he   is nice',
      'he   is   nice',
      'he   is   nice  ',
      '  he   is   nice  ',
      //contractions
      `he isn't nice`,
      `he  isn't nice`,
      `he isn't  nice`,
      `he isn't     nice   `,
      `    he   isn't     nice   `,
      //multiples
      'it is ipso facto',
      'it is ipso facto  ',
      'it is   ipso facto  ',
      'it is   ipso    facto  ',
      '2nd of march, 2015'
    ].forEach(function (a) {
      var str = nlp(a).out('text');
      str_test(str, a, a, t);
    });
    t.end();
  });

  T.test('inter-sentence whitespace:', function(t) {
    [
      'John Smith is nice.',
      '   John Smith is nice.',
      '   John Smith is nice.   ',
      'John Smith is nice. He lives in Spain.',
      'John Smith is nice.    He lives in Spain.',
      'John Smith is nice.    He lives in Spain.  ',
      '    John Smith is nice.    He lives in Spain.  ',
      'Dr. Smith is nice.  He lives in Spain.  ',
      '    Dr. Smith is nice.    He lives in Spain.  ',
      'Dr. Smith is nice?  He lives in Spain.  ',
      '    Dr. Smith is nice?    He lives in Spain?  ',
      '    Dr. Smith is nice?    He lives in UCLA?  He does? ',
      '    Dr. Smith is nice?    He lives in Spain?  He does?? ',
    ].forEach(function (a) {
      var str = nlp(a).out('text');
      str_test(str, a, a, t);
    });
    t.end();
  });

  T.test('contraction whitespace:', function(t) {
    [
      ['John\'s    nice.', 'John is    nice.'],
      ['John Smith\'s    nice.', 'John Smith is    nice.'],
      ['John isn\'t    nice.', 'John is not    nice.'],
      ['John didn\'t    go.', 'John did not    go.'],
      ['I wanna    go.', 'I want to    go.'],
      ['they\'ve    gone.', 'they have    gone.'],
    ].forEach(function (a) {
      var str = nlp(a[0]).contractions().expand().all().out('text');
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

});

},{"../../lib/fns":73,"../../lib/nlp":75,"tape":65}],108:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

var mustBe = function(arr) {
  return arr.map(function(t) {
    return t.normal;
  });
};

test('clauses', function (t) {
  var m = nlp('he is nice - which is cool... but whatever');
  var have = mustBe(m.clauses().data());
  var want = ['he is nice', 'which is cool', 'but whatever'];
  var msg = have.join(' -- ');
  t.deepEqual(have, want, msg);

  m = nlp('he is nice. If so, then good');
  have = mustBe(m.clauses().data());
  want = ['he is nice', 'if so', 'then good'];
  msg = have.join(' -- ');
  t.deepEqual(have, want, msg);

  t.end();
});

test('adjectives', function (t) {
  var m = nlp('he is nice, cool and very fun');
  var have = mustBe(m.adjectives().data());
  var want = ['nice', 'cool', 'fun'];
  var msg = have.join(' -- ');
  t.deepEqual(have, want, msg);

  t.end();
});

test('contractions-subset', function (t) {
  var m = nlp('he\'s nice. She could\'ve seen.');
  var have = mustBe(m.contractions().data());
  var want = ['he\'s', 'could\'ve'];
  var msg = have.join(' -- ');
  t.deepEqual(have, want, msg);

  t.end();
});

},{"../lib/nlp":75,"tape":65}],109:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

test('topics concat:', function (t) {
  var things = nlp('spencer and danny are in Paris France, and germany for Google Inc and IBM').topics().out('array');
  var want = [
    'spencer',
    'danny',
    'paris france',
    'germany',
    'google inc',
    'ibm'
  ];
  t.equal(things.join(', '), want.join(', '), 'found right things');
  t.end();
});

},{"../../lib/nlp":75,"tape":65}],110:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

test('money-basic:', function (t) {
  var r = nlp('it is $70.23');
  var m = r.match('#Money');
  t.equal(m.out('normal'), '$70.23', 'match-$70.23');

  r = nlp('it is $703');
  m = r.match('#Money+');
  t.equal(m.out('normal'), '$703', 'match-$703');

  r = nlp('it is five euros');
  m = r.match('#Money+');
  t.equal(m.out('normal'), 'five euros', 'match-five-euros');

  r = nlp('i said five times, you should pay 12 dollars');
  m = r.match('#Money+');
  t.equal(m.out('normal'), '12 dollars', 'match-12 dollars');

  r = nlp('you should pay sixty five dollars and four cents USD');
  m = r.match('#Money+');
  t.equal(m.out('normal'), 'sixty five dollars and four cents usd', 'match-long-usd');

  t.end();
});

test('money-has:', function (t) {
  var tests = [
    ['$7', true],
    ['$7.0', true],
    ['$7.00', true],
    ['$7.003', false],

    ['$7082.03', true],
    ['$2,082.03', true],
    ['€7.00', true],
    ['¥70', true],
    ['£0.20', true],
    ['@0.20', false],

    ['8 cents', true],
    ['60 pence', true],
    ['sixty pence', true],
    ['sixty USD', true],
  ];
  tests.forEach(function(a) {
    var r = nlp(a[0]);
    var m = r.match('#Money');
    t.equal(m.found, a[1], 'money-has: \'' + a[0] + '\'');
  });
  t.end();
});

},{"../../lib/nlp":75,"tape":65}],111:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

test('to_number:', function (t) {
  [
    ['twenty two thousand five hundred', 22500],
    ['two thousand five hundred and sixty', 2560],
    ['a hundred and two', 102],
    ['a hundred', 100],
    ['seven', 7],
    ['seven grand', 7000],
    ['104', 104],
    ['13 thousand', 13000],
    ['17,983', 17983],
    ['nine hundred', 900],
    ['twenty one hundred', 2100],
    ['twenty one', 21],
    ['seventy two', 72],
    ['two hundred two', 202],
    ['one thousand one', 1001],
    ['minus five hundred', -500],
    ['minus fifteen', -15],
    ['five hundred million', 500000000],
    // ['$12.03', 12.03],
    // ['$12', 12],
    ['5 hundred', 500],
    ['5.2 thousand', 5200],
    ['million', 1000000],
    ['hundred one', 101],
    ['minus fifty', -50],
    ['twenty thousand', 20000],
    ['four point six', 4.6],
    ['nine hundred point five', 900.5],
    ['sixteen hundred sixteen point eight', 1616.8],
    ['four point seven nine', 4.79],
    ['four point sixteen', 4.16],
    ['twenty first', '21st'],
    ['fifty ninth', '59th'],
    ['nine hundred fiftieth', '950th'],
    ['nine hundred and second', '902nd'],
    ['five thousand nine hundred fiftieth', '5950th'],
    ['six hundred and fifty nine', 659],
    ['six hundred and fifty nine thousand', 659000],
    [950, 950],
    [999999950, 999999950],
    [8080999999950, 8080999999950],
    ['fifteen million and two', 15000002],
    ['six hundred and eighteen', 618],
    ['two hundred thousand', 200000],
    ['six million ninety', 6000090],
    ['twenty-two hundred', 2200],

    ['two million five hundred thousand', 2500000],
    ['one billion five hundred thousand', 1000500000],
    ['one billion five hundred thousand and eight', 1000500008],
    ['a million fifty thousand and eight', 1050008],
    ['a million twenty five thousand and fifty-two', 1025052],
    ['minus two million twenty five thousand and eighty', -2025080],

    ['7 hundred and 8 thousand', 708000],
    ['2 hundred and sixty 9 thousand seven hundred', 269700],
    ['2 hundred and six million 7 hundred thousand seven hundred', 206700700],

    ['minus 70', -70],
    ['minus eight', -8],
    ['minus 8 hundred', -800],
    ['twenty-seven hundred', 2700],
    ['minus eight thousand two hundred', -8200],
    ['twenty-five', 25],
    ['half a million', 500000],
    ['five hundred eighteen', 518],
    ['eighty eight point nine nine', 88.99],
    ['minus eighty eight point nine nine', -88.99],
    // ['1/2', 1 / 2],
    // ['-1/5', -1 / 5],
    // ['-1 1/10', -1 - 1 / 10],
    // ['1 1/20', 1 + 1 / 20],
    // ['1/2 million', 500000],
    // ['1 1/2 million', 1500000],
    ['negative five', -5],
    ['negative hundred', -100],
    // ['12:32', ''],
    // ['123-1231', ''],
    ['seven eleven', ''],
    ['ten-four', ''],
    ['one seven', ''],
    ['one ten', ''],
    ['one twelve', ''],
    ['one thirty', ''],
    ['nine fifty', ''],
    ['five six', ''],
    ['nine seventy', ''],
    ['nine two hundred', ''],
    ['ten one', ''],
    ['twelve one', ''],
    ['seventy five two', ''],
    ['two hundred three hundred', ''],
    ['sixty fifteen hundred', ''],
    ['one twenty', ''],
    ['twenty five twenty', ''],
  // ['',''],
  // [null,''],
  ].forEach(function (a) {
    var num = nlp(a[0]).values().toNumber().out('text');
    var want = '' + a[1] || a[0];
    var msg = '\'' + a[0] + '\' - - have: \'' + num + '\'   want:\'' + a[1] + '\'';
    t.equal(num, '' + want, msg);
  });
  t.end();
});

},{"../../lib/nlp":75,"tape":65}],112:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

test('to_text:', function (t) {
  [
    // [-5, 'negative five'],
    [5, 'five'],
    [15, 'fifteen'],
    [10, 'ten'],
    [20, 'twenty'],
    [75, 'seventy five'],
    [97, 'ninety seven'],
    [111, 'one hundred and eleven'],
    [175, 'one hundred and seventy five'],
    [900, 'nine hundred'],
    [1175, 'one thousand one hundred and seventy five'],
    [2000, 'two thousand'],
    [2100, 'two thousand one hundred'],
    [2102, 'two thousand one hundred and two'],
    [70000, 'seventy thousand'],
    [72000, 'seventy two thousand'],
    [900000, 'nine hundred thousand'],
    [900001, 'nine hundred thousand and one'],
    [900200, 'nine hundred thousand two hundred'],
    [900205, 'nine hundred thousand two hundred and five'],
    [7900205, 'seven million nine hundred thousand two hundred and five'],
    [90000000, 'ninety million'],
    [900000000, 'nine hundred million'],
    [900000080, 'nine hundred million and eighty'],
  ].forEach(function (a) {
    var str = nlp(a[0]).values().toTextValue().out('text');
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

},{"../../lib/fns":73,"../../lib/nlp":75,"tape":65}],113:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

test('==Value==', function (T) {

  T.test('to_ordinal:', function (t) {
    [
      [11, '11th'],
      [5, '5th'],
      [22, '22nd'],
    ].forEach(function (a) {
      var str = nlp(a[0]).values().toOrdinal().out('normal');
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('number:', function (t) {
    [
      ['five hundred feet', 500],
      ['fifty square feet', 50],
      ['90 hertz', 90],
      // ['5 six-ounce containers', 5],
      ['twelve 2-gram containers', 12],
      ['thirty-seven forever-21 stores', 37],
    ].forEach(function (a) {
      var str = nlp(a[0]).values().toNumber().term(0).first().out('normal');
      a[1] = '' + a[1];
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  // T.test('unit:', function(t) {
  //   [
  //     ['five hundred feet', 'feet'],
  //     ['fifty hertz', 'hertz'],
  //     ['100 dollars', 'dollars'],
  //     ['$100', 'dollar'],
  //     ['¥2.5', 'yen'],
  //     ['€3,000,100', 'euro'],
  //     ['EUR 9.99', 'eur'],
  //     ['5 g', 'g'],
  //     ['3 grams', 'gram'],
  //     ['2 inches', 'inch'],
  //     ['2 in', 'in'],
  //     ['5 g sugar', 'g'],
  //     ['10 grams of sugar', 'gram'],
  //     ['fifty inches of snow', 'inch'],
  //   ].forEach(function (a) {
  //     var str = nlp.value(a[0]).unit;
  //     str_test(str, a[0], a[1], t);
  //   });
  //   t.end();
  // });
  //
  // T.test('measurement:', function(t) {
  //   [
  //     ['five hundred feet', 'Distance'],
  //     ['100 kilometers', 'Distance'],
  //     ['fifty hertz', 'Frequency'],
  //     ['59 thousand $', 'Money'],
  //     ['100 mb', 'Data'],
  //     ['50 руб', 'Money'],
  //     ['EUR 9.99', 'Money'],
  //     ['100 dollars', 'Money'],
  //     ['256 bitcoins', 'Money'],
  //   ].forEach(function (a) {
  //     var str = nlp.value(a[0]).measurement;
  //     str_test(str, a[0], a[1], t);
  //   });
  //   t.end();
  // });
  //
  // T.test('of_what:', function(t) {
  //   [
  //     ['nine kg', 'kg'],
  //     ['5 kg of copper', 'copper'],
  //     ['many of these stories', 'many of these stories'],
  //     ['room full of beautiful creatures', 'full of beautiful creatures'],
  //     ['boxes of bags of food', 'boxes of bags of food'],
  //     ['5 boxes of water', 'boxes of water'],
  //     ['6 of kids', 'kids'],
  //     ['10 kids', 'kids'],
  //     ['just nothing', 'just nothing'],
  //     ['EUR 77', 'eur'],
  //     ['kg', 'kg']
  //   ].forEach(function (a) {
  //     var str = nlp.value(a[0]).of_what;
  //     str_test(str, a[0], a[1], t);
  //   });
  //   t.end();
  // });




});

},{"../../lib/fns":73,"../../lib/nlp":75,"tape":65}],114:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

var arr = [
  {
    'Infinitive': 'convolute',
    'PresentTense': 'convolutes',
    'Gerund': 'convoluting',
    'PastTense': 'convoluted'
  }, {
    'PresentTense': 'presents',
    'Gerund': 'presenting',
    'PastTense': 'presented',
    'Infinitive': 'present'
  }, {
    'PresentTense': 'angulates',
    'Gerund': 'angulating',
    'PastTense': 'angulated',
    'Infinitive': 'angulate'
  }, {
    'PresentTense': 'conjures',
    'Gerund': 'conjuring',
    'PastTense': 'conjured',
    'Infinitive': 'conjure'
  }, {
    'PresentTense': 'denounces',
    'Gerund': 'denouncing',
    'PastTense': 'denounced',
    'Infinitive': 'denounce'
  }, {
    'PresentTense': 'watches',
    'Gerund': 'watching',
    'PastTense': 'watched',
    'Infinitive': 'watch'
  }, {
    'PresentTense': 'tingles',
    'Gerund': 'tingling',
    'PastTense': 'tingled',
    'Infinitive': 'tingle'
  }, {
    'PresentTense': 'mortises',
    'Gerund': 'mortising',
    'PastTense': 'mortised',
    'Infinitive': 'mortise'
  }, {
    'PresentTense': 'disguises',
    'Gerund': 'disguising',
    'PastTense': 'disguised',
    'Infinitive': 'disguise'
  }, {
    'Infinitive': 'effect',
    'Gerund': 'effecting',
    'PastTense': 'effected',
    'PresentTense': 'effects'
  }, {
    'Infinitive': 'want',
    'Gerund': 'wanting',
    'PastTense': 'wanted',
    'PresentTense': 'wants'
  }, {
    'Infinitive': 'power',
    'Gerund': 'powering',
    'PastTense': 'powered',
    'PresentTense': 'powers'
  }, {
    'Infinitive': 'overcompensate',
    'PresentTense': 'overcompensates',
    'PastTense': 'overcompensated',
    'Gerund': 'overcompensating'
  }, {
    'Infinitive': 'ice',
    'PresentTense': 'ices',
    'PastTense': 'iced',
    'Gerund': 'icing'
  }, {
    'Infinitive': 'buy',
    'PresentTense': 'buys',
    'PastTense': 'bought',
    'Gerund': 'buying'
  }, {
    'Infinitive': 'flower',
    'PresentTense': 'flowers',
    'PastTense': 'flowered',
    'Gerund': 'flowering'
  }, {
    'Infinitive': 'rage',
    'PresentTense': 'rages',
    'PastTense': 'raged',
    'Gerund': 'raging'
  }, {
    'Infinitive': 'drive',
    'PresentTense': 'drives',
    'PastTense': 'drove',
    'Gerund': 'driving'
  }, {
    'Infinitive': 'foul',
    'PresentTense': 'fouls',
    'PastTense': 'fouled',
    'Gerund': 'fouling'
  }, {
    'Infinitive': 'overthrow',
    'PresentTense': 'overthrows',
    'Gerund': 'overthrowing',
    'PastTense': 'overthrew'
  }, {
    'Infinitive': 'aim',
    'PresentTense': 'aims',
    'PastTense': 'aimed',
    'Gerund': 'aiming'
  }, {
    'PresentTense': 'unifies',
    'Gerund': 'unifying',
    'PastTense': 'unified',
    'Infinitive': 'unify'
  }, {
    'PresentTense': 'addresses',
    'Gerund': 'addressing',
    'PastTense': 'addressed',
    'Infinitive': 'address'
  }, {
    'Infinitive': 'bumble',
    'PresentTense': 'bumbles',
    'PastTense': 'bumbled',
    'Gerund': 'bumbling'
  }, {
    'Infinitive': 'snipe',
    'PresentTense': 'snipes',
    'PastTense': 'sniped',
    'Gerund': 'sniping'
  }, {
    'PresentTense': 'relishes',
    'Gerund': 'relishing',
    'PastTense': 'relished',
    'Infinitive': 'relish'
  }, {
    'Infinitive': 'lengthen',
    'Gerund': 'lengthening',
    'PastTense': 'lengthened',
    'PresentTense': 'lengthens'
  }, {
    'Infinitive': 'farm',
    'PresentTense': 'farms',
    'PastTense': 'farmed',
    'Gerund': 'farming'
  },
  {
    'Infinitive': 'develop',
    'PresentTense': 'develops',
    'PastTense': 'developed',
    'Gerund': 'developing'
  },
  {
    'Infinitive': 'study',
    'PresentTense': 'studies',
    'PastTense': 'studied',
    'Gerund': 'studying'
  },
  {
    'Infinitive': 'criticise',
    'PresentTense': 'criticises',
    'PastTense': 'criticised',
    'Gerund': 'criticising'
  }, {
    'Infinitive': 'speak',
    'PresentTense': 'speaks',
    'PastTense': 'spoke',
    'Gerund': 'speaking',
  }, {
    'Infinitive': 'fuzz',
    'PresentTense': 'fuzzes',
    'PastTense': 'fuzzed',
    'Gerund': 'fuzzing',
  }, {
    'Infinitive': 'invest',
    'PresentTense': 'invests',
    'PastTense': 'invested',
    'Gerund': 'investing'
  }
];
test('conjugation:', function(t) {

  var test_conjugation = function(inf, o, form, original) {
    var msg = 'from ' + original + ' to ' + form + ':  [' + o[original] + '] -> [' + inf[form] + ']';
    t.equal(inf[form], o[form], msg);
  };

  arr.forEach(function(o) {
    var forms = ['Infinitive', 'PastTense', 'PresentTense', 'Gerund'];
    for(var i = 0; i < forms.length; i++) {
      var from = forms[i];
      var inf = nlp(o[from]).tag('Verb').verbs().conjugate()[0];
      test_conjugation(inf, o, 'Infinitive', from);
      test_conjugation(inf, o, 'PastTense', from);
      test_conjugation(inf, o, 'PresentTense', from);
      test_conjugation(inf, o, 'Gerund', from);
    }
  });
  t.end();
});

},{"../../lib/nlp":75,"tape":65}],115:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

test('verb-parts:', function(t) {
  var tests = [
    ['john is walking', '', 'is', ''],
    ['john was walking', '', 'was', ''],
    ['john will be walking', '', 'will be', ''],
    ['john has been walking', '', 'has been', ''],
    ['john had been walking', '', 'had been', ''],
    ['john would have had been walking', '', 'would have had been', ''],
    //negatives
    ['john is not walking', 'not', 'is', ''],
    ['john was not walking', 'not', 'was', ''],
    ['john will not be walking', 'not', 'will be', ''],
    ['john will be not walking', 'not', 'will be', ''],
    ['john has not been walking', 'not', 'has been', ''],
    ['john has been not walking', 'not', 'has been', ''],
    ['john had not been walking', 'not', 'had been', ''],
    ['john had been not walking', 'not', 'had been', ''],
    ['john would be walking', '', 'would be', ''],
    ['john would not be walking', 'not', 'would be', ''],
    ['john would be not walking', 'not', 'would be', ''],
    ['john would not have had been walking', 'not', 'would have had been', ''],
    ['john would have not had been walking', 'not', 'would have had been', ''],
    ['john would have had not been walking', 'not', 'would have had been', ''],
    ['john would have had been not walking', 'not', 'would have had been', ''],
    //adverbs + negatives combinations
    ['john is really walking', '', 'is', 'really'],
    ['john really is walking', '', 'is', 'really'],
    ['john is walking really', '', 'is', 'really'],
    ['john is not really walking', 'not', 'is', 'really'],
    ['john is really not walking', 'not', 'is', 'really'],
    ['john really is not walking', 'not', 'is', 'really'],
    ['john is not walking really', 'not', 'is', 'really'],
    ['john has really been not walking', 'not', 'has been', 'really'],
    ['john has been really not walking', 'not', 'has been', 'really'],
    ['john has been not really walking', 'not', 'has been', 'really'],
    ['john has been not walking really', 'not', 'has been', 'really'],
    ['john would really not have had been walking', 'not', 'would have had been', 'really'],
    ['john would not really have had been walking', 'not', 'would have had been', 'really'],
    ['john would not have really had been walking', 'not', 'would have had been', 'really'],
    ['john would not have had really been walking', 'not', 'would have had been', 'really'],
    ['john would not have had been really walking', 'not', 'would have had been', 'really'],
    ['john would not have had been walking really', 'not', 'would have had been', 'really'],
  ];
  tests.forEach(function(a) {
    var arr = nlp(a[0]).verbs().data();
    t.equal(arr.length, 1, '#verbs - ' + arr.length);
    t.equal(arr[0].parts.negative, a[1], 'neg-test - \'' + a[0] + '\'');
    t.equal(arr[0].parts.auxillary, a[2], 'aux-test  - \'' + a[0] + '\'');
    t.equal(arr[0].parts.verb, 'walking', 'verb-test  - \'' + a[0] + '\'');
    t.equal(arr[0].parts.adverbs, a[3], 'adverb-test  - \'' + a[0] + '\'');
  });
  t.end();
});

//dont take it too-far
test('verb-greedy:', function(t) {
  var arr = nlp('he would be, had he survived').verbs().data();
  t.equal(arr.length, 3, 'split-on-clause');

  arr = nlp('we walked, talked, and sang').verbs().data();
  t.equal(arr.length, 3, 'split-on-list');

  arr = nlp('we walked, talked, and quickly sang').verbs().data();
  t.equal(arr.length, 3, 'split-on-list2');

  arr = nlp('we suddenly walked, talked, and abruptly sang').verbs().data();
  t.equal(arr.length, 3, 'split-on-list3');

  arr = nlp('we really').verbs().data();
  t.equal(arr.length, 0, 'adverb-isnt-a-verb');

  arr = nlp('we really really').verbs().data();
  t.equal(arr.length, 0, 'two-adverbs-isnt-a-verb');

  arr = nlp('not good').verbs().data();
  t.equal(arr.length, 0, 'not-isnt-a-verb');

  var str = nlp('we must not').verbs().out('normal');
  t.equal(str, 'must not', 'verb-not');

  str = nlp('we must really').verbs().out('normal');
  t.equal(str, 'must really', 'verb-adverb');

  str = nlp('we must really not').verbs().out('normal');
  t.equal(str, 'must really not', 'verb-adverb-not');

  t.end();
});

},{"../../lib/nlp":75,"tape":65}],116:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

test('phrasal-verbs:', function(t) {
  [
    [`he is really good`, ['he', 'is', 'really', 'good']],
    [`he is upset about it`, ['he', 'is', 'upset', 'about', 'it']],
    [`he will mess about with it`, ['he', 'will', 'mess about', 'with', 'it']],

    [`come forward`, ['come forward']],
    [`come together`, ['come together']],
    [`come apart`, ['come apart']],

    [`frighten back`, ['frighten', 'back']],
    [`frighten away`, ['frighten away']],
  ].forEach(function (a) {
    var terms = nlp(a[0]).out('array');
    var msg = terms.join(' ') + '  -- ' + a[1].join(' ');
    t.equal(terms.join(' '), a[1].join(' '), msg);
  });
  t.end();
});

},{"../../lib/nlp":75,"tape":65}],117:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

test('plural-verbs:', function(t) {
  var r = nlp('i look at');
  var len = r.verbs().isPlural().length;
  t.equal(len, 0, 'i singular');

  r = nlp('we look at it. They report on it');
  len = r.verbs().isPlural().length;
  t.equal(len, 2, 'they plural');

  r = nlp('lkjsdf are cool');
  var str = r.verbs().isPlural().out('normal');
  t.equal(str, 'are', 'are plural');

  r = nlp('lkjsdf does eat bugs');
  str = r.verbs().isPlural().out('normal');
  t.equal(str, 'does eat', 'does plural');

  r = nlp('lkjsdf is cool');
  str = r.verbs().isPlural().out('normal');
  t.equal(str, '', 'is singular');
  t.end();
});

},{"../../lib/nlp":75,"tape":65}],118:[function(require,module,exports){
var test = require('tape');
var nlp = require('../../lib/nlp');

test('verb-to-adjective:', function(t) {
  [
    ['walk', 'walkable'],
    ['sing', 'singable'],
    ['win', 'winnable'],
    ['convert', 'convertible'],
    ['see', 'visible'],
  ].forEach(function(a) {
    var str = nlp(a[0]).verbs().asAdjective()[0];
    t.equal(str, a[1], str + ' -> ' + a[1]);
  });
  t.end();
});

},{"../../lib/nlp":75,"tape":65}],119:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('keyword emojis', function (t) {
  [
    ['he is so nice :heart:', ':heart:'],
    [':cool: :wine_glass: yeah party', ':cool: :wine_glass:'],
    ['to be or not to be: this is a question :cookie:', ':cookie:'],
  ].forEach(function (a) {
    var have = nlp(a[0]).match('#Emoji').out('normal');
    var msg = 'have: \'' + have + '\'  want: \'' + a[1] + '\'';
    t.equal(have, a[1], msg);
  });
  t.end();
});

test('unicode emojis', function (t) {
  [
    ['nice job 💯 ❤️', '💯 ❤️'],
    ['💚 good job 🎇', '💚 🎇'],
    ['visit Brunei', ''],
    ['visit Brunei 🇧🇳', '🇧🇳'],
    ['visit Brunei 🇧🇳🇧🇳🇧🇳', '🇧🇳🇧🇳🇧🇳'],
  ].forEach(function (a) {
    var have = nlp(a[0]).match('#Emoji').out('normal');
    var msg = 'have: \'' + have + '\'  want: \'' + a[1] + '\'';
    t.equal(have, a[1], msg);
  });
  t.end();
});

test('emoticon emojis', function (t) {
  [
    ['nice job :)', ':)'],
    [';) good work', ';)'],
    [';( oh no :(', ';( :('],
    ['to be: that is th3 question', ''],
    ['</3 </3 </3 sad', '</3 </3 </3'],
  // ['</3</3', '</3</3'],
  ].forEach(function (a) {
    var have = nlp(a[0]).match('#Emoji').out('normal');
    var msg = 'have: \'' + have + '\'  want: \'' + a[1] + '\'';
    t.equal(have, a[1], msg);
  });
  t.end();
});

},{"../lib/nlp":75,"tape":65}],120:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var pos_test = require('../lib/fns').pos_test;

test('default lexicon:', function (t) {
  [
    ['great', 'Adjective'],
    ['walked', 'PastTense'],
    ['singing', 'Gerund'],
    ['funniest', 'Superlative'],
    ['sillier', 'Comparative'],
    ['the', 'Determiner'],
    ['iraqi', 'Demonym'],
    ['december', 'Date'],
    ['fifth', 'Value'],
    ['suddenly', 'Adverb'],
    ['shanghai', 'City'],
    ['google', 'Organization'],
  ].forEach(function (a) {
    var r = nlp(a[0]);
    pos_test(r, [a[1]], t);
  });
  t.end();
});

test('adjusted lexicon:', function (t) {
  //place new words
  var lexicon = {
    'paris': 'Person',
    'lkjj': 'Adjective',
    'donkey kong': 'City'
  };

  var arr = [
    ['paris is nice', ['Person', 'Copula', 'Adjective']],
    ['he is lkjj', ['Pronoun', 'Copula', 'Adjective']],
    ['donkey kong wins the award', ['City', 'Verb', 'Determiner', 'Noun']],
  ];
  arr.forEach(function (a) {
    var r = nlp(a[0], lexicon);
    pos_test(r, a[1], t);
  });
  //
  //set gender from lexicon
  var terms = nlp('Kelly', lexicon);
  pos_test(terms, ['FemaleName'], t);
  //set as male:
  lexicon = {
    kelly: 'MaleName'
  };
  terms = nlp('Kelly', lexicon);
  pos_test(terms, ['MaleName'], t);
  //gender follows lumping
  terms = nlp('Kelly Gruber', lexicon);
  pos_test(terms, ['MaleName', 'LastName'], t);

  t.end();
});


test('tricky lexicon:', function (t) {
  var lexicon = {
    'bed bath and beyond': 'Organization'
  };
  var r = nlp('shopping at Bed Bath and Beyond, the store', lexicon);
  var str = r.organizations().out('normal');
  t.equal(str, 'bed bath and beyond', 'four-word');

  r = nlp('shopping at Bed, Bath, and-beyond the store', lexicon);
  str = r.organizations().out('normal');
  t.equal(str, 'bed bath and beyond', 'partially-hyphenated-word');

  r = nlp('shopping at Bed-bath and-beyond the store', lexicon);
  str = r.organizations().out('normal');
  t.equal(str, 'bed bath and beyond', 'many-hyphenated-word');
  t.end();
});

},{"../lib/fns":73,"../lib/nlp":75,"tape":65}],121:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('organization test', function(t) {
  var arr = [
    'google',
    'google inc',
    'Capital One',
    'HSBC',
    'NASA',
    '7-eleven',
    'al qaeda',
    'FBI',
    'monsanto',
    'Johnson & Johnson',
  // 'Johnson & Johnson LLC',
  ];
  arr.forEach(function (str) {
    var r = nlp(str);
    var orgs = r.organizations();
    var msg = orgs.out('text') + '  -  ' + str;
    t.equal(orgs.out('text'), str, msg);
  });
  t.end();
});

},{"../lib/nlp":75,"tape":65}],122:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('quotation test', function(t) {
  var arr = [
    ['so I said "nah forget it"', 'nah forget it'],
    ['so I said "nah, forget it" go home to bel-air!', 'nah forget it'],
    ['so I said \'nah, forget it\' go home to bel-air!', 'nah forget it'],
    ['so I said "nah" go home to bel-air!', 'nah'],
    ['so \'as if\' i said', 'as if'],
    ['the \'truthiness\' i said', 'truthiness'],
    ['yeah, “fun” and stuff', 'fun'],
    ['“Fun” and stuff', 'fun'],
  ];
  arr.forEach(function (a) {
    var r = nlp(a[0]);
    var str = r.quotations().out('normal');
    var msg = a[0] + '  -  ' + str;
    t.equal(str, a[1], msg);
  });
  t.end();
});

},{"../lib/nlp":75,"tape":65}],123:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');



test('specific_noun :', function(t) {
  [
    // ['five hundred feet', 'Value'],
    // ['50 square feet', 'Value'],
    // ['90 hertz', 'Value'],
    // ['two books', 'Value'],
    ['two hundred', 'Value'],
    ['4 hundred and ten', 'Value'],
    ['4 and a half million', 'Value'],
    ['499 thousand', 'Value'],
    ['499', 'Value'],
    ['4,899', 'Value'],

    ['John Smith', 'Person'],
    ['dr. John Smith', 'Person'],
    ['John Smith jr.', 'Person'],
    ['John Jacob Smith', 'Person'],
    ['Jani K. Smith', 'Person'],

    ['asdfefs', 'Noun'],
    ['octopus', 'Noun'],
    ['tree', 'Noun'],
    // ['i', 'Noun'],

    ['FBI', 'Organization'],
    ['F.B.I.', 'Organization'],
    ['Fun ltd.', 'Organization'],
    ['Fun co', 'Organization'],
    ['Smith & Rogers', 'Organization'],
    ['Google', 'Organization'],

    ['tuesday', 'Date'],
    ['february', 'Date'],
    ['february fifth', 'Date'],
    ['tuesday march 5th', 'Date'],
    ['tuesday march 5th, 2015', 'Date'],
  ].forEach(function(a) {
    var r = nlp(a[0]);

    if (a[1] === 'Person') {
      t.equal(r.people().out(), a[0], a[0] + ' - is_person');
    } else {
      t.equal(r.people().out(), '', a[0] + ' - not-a-person');
    }

    if (a[1] === 'Place') {
      t.equal(r.places().out(), a[0], a[0] + ' - is_place');
    } else {
      t.equal(r.places().out(), '', a[0] + ' - not-a-place');
    }

    if (a[1] === 'Value') {
      t.equal(r.values().noDates().out(), a[0], a[0] + ' - is_value');
    } else {
      t.equal(r.values().noDates().out(), '', a[0] + ' - not-a-value');
    }

    if (a[1] === 'Date') {
      t.equal(r.dates().out(), a[0], a[0] + ' - is_date');
    } else {
      t.equal(r.dates().out(), '', a[0] + ' - not-a-date');
    }

    if (a[1] === 'Organization') {
      t.equal(r.organizations().out(), a[0], a[0] + ' - is_organization');
    } else {
      t.equal(r.organizations().out(), '', a[0] + ' - not-a-org');
    }

  });
  t.end();
});

},{"../lib/nlp":75,"tape":65}],124:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
//nsfw!

test('swears:', function(t) {
  var m = nlp('shit, i am tired').match('^#Expression');
  t.ok(m.found, 'swear-1');

  m = nlp('the shit keeps piling up').match('the #Noun');
  t.ok(m.found, 'swear-2');

  m = nlp('damn them all').match('^#Verb');
  t.ok(m.found, 'swear-3');

  m = nlp('fuck the government').match('^#Verb');
  t.ok(m.found, 'swear-4');

  // m = nlp('when hell freezes over').match('^when #Noun');
  // t.ok(m.found, 'swear-5');

  m = nlp('he fucked up').match('he #Verb #Particle');
  t.ok(m.found, 'swear-6');

  m = nlp('it is fucked up').match('is #Adjective #Adjective');
  t.ok(m.found, 'swear-7');

  t.end();
});

},{"../lib/nlp":75,"tape":65}],125:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

//test a word from each file in ./data/**
test('pos from-lexicon', function (t) {
  var arr = [
    ['toronto', 'City'],
    ['mexico', 'Country'],
    ['Jamaica', 'Country'],
    ['legendary', 'Adjective'],
    ['above', 'Adjective'],
    ['moderate', 'Adjective'],
    ['extreme', 'Adjective'],
    ['august', 'Month'],
    ['saturday', 'WeekDay'],
    ['minute', 'Duration'],
    ['valentines day', 'Holiday'],
    ['ash wednesday', 'Holiday'],
    ['really', 'Adverb'],
    ['each', 'Determiner'],
    ['voila', 'Expression'],
    ['new england', 'Place'],
    ['hers', 'Possessive'],
    ['onto', 'Preposition'],
    ['blvd', 'Place'],
    ['belgian', 'Demonym'],
    ['cactus', 'Singular'],
    ['cacti', 'Plural'],
    ['economy', 'Noun'],
    ['engineer', 'Noun'],
    ['clothing', 'Noun'],
    ['duran duran', 'Organization'],
    ['american express', 'Organization'],
    ['brotherhood', 'Noun'],
    ['oakland athletics', 'SportsTeam'],
    ['jaime', 'Person'],
    ['claire', 'FemaleName'],
    ['arthur', 'MaleName'],
    ['¥', 'Currency'],
    ['pence', 'Currency'],
    ['seven', 'Value'],
    ['seventeen', 'Value'],
    ['twenty', 'Value'],
    ['thousand', 'Value'],
    ['eighteenth', 'Value'],
    ['tbsp', 'Unit'],
    ['wrote', 'PastTense'],
    ['write', 'Verb'],
    ['survive', 'Verb'],
    ['attempt', 'Verb'],
    ['mc\'adams', 'LastName'],
    ['Müller', 'LastName'],
    ['muller', 'LastName'],
    ['425-1231', 'PhoneNumber'],
    ['823-425-1231', 'PhoneNumber'],
    ['823 425-1231', 'PhoneNumber'],
    ['(823) 425-1231', 'PhoneNumber'],
    ['invest', 'Verb'],
    ['investing', 'Verb'],
    [`wallys'`, 'Possessive'],
  ];
  arr.forEach(function (a) {
    var term = nlp(a[0]).list[0].terms[0];
    var msg = '\'' + term.normal + '\' has - ' + a[1] + '  (' + Object.keys(term.tag).join(',') + ')';
    t.equal(term.tag[a[1]], true, msg);
  });
  t.end();
});

},{"../lib/nlp":75,"tape":65}],126:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var pos_test = require('../lib/fns').pos_test;

test('=Tagger=', function(T) {

  T.test('pos-basic-tag:', function(t) {
    [
      ['John is pretty', ['Person', 'Copula', 'Adjective']],
      ['John was lofty', ['Person', 'Copula', 'Adjective']],
      ['John Smith was lofty', ['FirstName', 'LastName', 'Copula', 'Adjective']],
      ['asdfes was lofty', ['Noun', 'Copula', 'Adjective']],
      ['asdfes lksejfj was lofty', ['Noun', 'Noun', 'Copula', 'Adjective']],
      ['Spencer Kelly is in Canada', ['Person', 'Person', 'Copula', 'Preposition', 'Place']],
      ['He is in Canada', ['Pronoun', 'Copula', 'Preposition', 'Place']],
      ['5 red roses', ['Value', 'Adjective', 'Noun']],
      // ['3 trains', ['Value', 'Noun']],
      ['3 trainers', ['Value', 'Noun']],
      ['5 buses', ['Value', 'Noun']],

      ['walk the walk', ['Verb', 'Determiner', 'Noun']],
      ['Peter the man', ['Person', 'Determiner', 'Noun']],
      // ['book the flight', ['Verb', 'Determiner', 'Noun']],

      //slang, contractions
      // ['u r nice', ['Pronoun', 'Copula', 'Adjective']],
      ['canadian bacon', ['Demonym', 'Noun']],
      ['canadian dollar', ['Currency']],

      //possessive rules
      ['john lkjsdf\'s', ['Person', 'Possessive']],
      ['john lkjsdf\'s house', ['Person', 'Possessive', 'Noun']],
      ['john Lkjsdf\'s house', ['Person', 'Possessive', 'Noun']],
      ['john Lkjsdf\'s House', ['Person', 'Possessive', 'Noun']],

      //question-words
      ['who is good?', ['QuestionWord', 'Copula', 'Adjective']],
      ['which is good?', ['QuestionWord', 'Copula', 'Adjective']],
      // ['bacon which is good', ['Noun', 'Pronoun', 'Copula', 'Adjective']],
      // ['bacon which really is good', ['Noun', 'Pronoun', 'Adverb', 'Copula', 'Adjective']],
      // ['Douglas who really is good', ['Person', 'Pronoun', 'Adverb', 'Copula', 'Adjective']],

      //web text things
      ['lkj@fun.com', ['Email']],
      ['j@f.ti', ['Email']],
      ['j@ti', ['Noun']],
      ['@ti', ['AtMention']],
      ['#funtimes', ['HashTag']],
      ['http://fun.com/cool?fun=yes', ['Url']],
      ['#cool fun.com @cooman', ['HashTag', 'Url', 'AtMention']],

      //people
      ['John swim', ['Person', 'Verb']],
      ['John, John', ['Person', 'Person']],
      ['John, you', ['FirstName', 'Pronoun']],
      ['John you', ['MaleName', 'Pronoun']],
      ['you John you', ['Pronoun', 'Person', 'Pronoun']],
      // ['10 + 9', ['Value', 'Symbol', 'Value']],
      // ['2 * 90 = 180', ['Value', 'Symbol', 'Value', 'Symbol', 'Value']],
      // ['one - seventy-six', ['Value', 'Symbol', 'Value']],

    ].forEach(function (a) {
      var terms = nlp(a[0]).terms(); //.data();
      pos_test(terms, a[1], t);
    });
    t.end();
  });
});

},{"../lib/fns":73,"../lib/nlp":75,"tape":65}],127:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('tag inference:', function (t) {
  var m = nlp('aasdf2').unTag('Noun').unTag('NounPhrase');
  var term = m.list[0].terms[0];
  t.equal(Object.keys(term.tag).length, 0, 'aasdf2 has no tags');
  //give it a specific tag-
  m.tag('SportsTeam');
  term = m.list[0].terms[0];
  t.equal(term.tag.Noun, true, 'aasdf2 now has Noun');
  t.equal(term.tag.Organization, true, 'aasdf2 now has Organization(inferred)');
  //give it a redundant tag-
  m.tag('Organization');
  term = m.list[0].terms[0];
  t.equal(term.tag.Noun, true, 'aasdf2 still has Noun');
  t.equal(term.tag.Organization, true, 'aasdf2 still has Organization');
  t.end();
});

test('untag inference:', function (t) {
  var m = nlp('aasdf');
  m.tag('FemaleName');
  var term = m.list[0].terms[0];
  t.equal(term.tag.FemaleName, true, 'aasdf first has FemaleName');
  t.equal(term.tag.Person, true, 'aasdf first has person');
  t.equal(term.tag.Noun, true, 'aasdf first has noun');
  //remove the assumption..
  term.unTag('Noun');
  t.equal(term.tag.Noun, undefined, 'aasdf now has no noun');
  t.equal(term.tag.Person, undefined, 'aasdf now has no person(inferred)');
  t.equal(term.tag.FemaleName, undefined, 'aasdf now has no FemaleName(inferred)');
  t.end();
});

test('tag idempodence:', function (t) {
  var m = nlp('walk').tag('Verb');
  var term = m.list[0].terms[0];
  t.equal(term.tag.Verb, true, 'walk has Verb');
  t.equal(term.tag.Value, undefined, 'walk has no Value');
  //untag irrelevant stuff
  term.unTag('Value');
  term.unTag('Determiner');
  term.unTag('Country');
  term.unTag('Place');
  t.equal(term.tag.Verb, true, 'walk has Verb after');
  t.equal(term.tag.Value, undefined, 'walk has no Value after');
  t.end();
});

test('tags are self-removing', function (t) {
  var terms = [
    'Person',
    'Place',
    'PastTense',
    'FemaleName',
    'Infinitive',
    'HashTag',
    'Month',
  ];
  terms.forEach(function(tag) {
    m = nlp('aasdf').tag(tag).unTag(tag);
    var t0 = m.list[0].terms[0];
    t.equal(t0.tag[tag], undefined, 'tag removes self ' + tag);
  });
  t.end();
});

},{"../lib/nlp":75,"tape":65}],128:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;

test('=Web Terminology=', function(T) {

  T.test('is-email:', function(t) {
    [
      [`s@s.com`, true],
      [`sasdf@sasdf.com`, true],
      [`sasdf@sasdf.ti`, true],
      [`sasdf@sasdf.t`,],
      [`sasdf@sasdft`,],
      [`sasdfsasdft.com`,],
      [`@sasdft.com`,],
      [`_@_.com`, true],
      [`_@_._`,],
      [`sas df@sasdf.com`,],
      [`sasdf@sa sdf.com`,],
    ].forEach(function (a) {
      var term = nlp(a[0]).list[0].terms[0];
      var msg = a[0] + ' is email: ' + a[1];
      t.equal(term.tag['Email'], a[1], msg);
    });
    t.end();
  });

  T.test('is-hashtag:', function(t) {
    [
      [`#lkjsdf`, true],
      [`#ll`, true],
      [`#22ll`, true],
      [`#_22ll`, true],
      // [`#l`,],
      [`# l`,],
      [`l#l`,],
    ].forEach(function (a) {
      var term = nlp(a[0]).list[0].terms[0];
      var msg = a[0] + ' is hashtag: ' + a[1];
      t.equal(term.tag['HashTag'], a[1], msg);
    });
    t.end();
  });

  T.test('is-url:', function(t) {
    [
      [`http://cool.com/fun`, true],
      [`https://cool.com`, true],
      [`https://cool.com/`, true],
      [`https://www.cool.com/`, true],
      [`http://subdomain.cool.com/`, true],
      [`www.fun.com/`, true],
      [`www.fun.com`, true],
      [`www.fun.com/foobar/fun`, true],
      [`www.subdomain.cool.com/`, true],
      [`wwwsubdomain.cool.com/`, true],
      [`woo.br`, true],
      [`woohoo.biz`, true],
      [`woop.org/news`, true],
      [`http://woop.org/news?foo=bar`, true],
      [`http:subdomain.cool.com/`,],
      [`coolcom`,],
    ].forEach(function (a) {
      var term = nlp(a[0]).list[0].terms[0];
      var msg = a[0] + ' is url: ' + a[1];
      t.equal(term.tag['Url'], a[1], msg);
    });
    t.end();
  });

});

},{"../lib/fns":73,"../lib/nlp":75,"tape":65}],129:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('hyphen-tokenize', function (t) {
  var r = nlp('super-cool work');
  t.equal(r.terms().length, 3, 'super, cool');
  t.equal(r.out('text'), 'super-cool work', 'preserve hyphen');
  t.equal(r.out('normal'), 'super cool work', 'normalize-out hyphen');

  r = nlp('http://about.com/my-summer-vacation');
  t.equal(r.terms().length, 1, 'url hyphen');
  r = nlp('http://about.com/my-summer');
  t.equal(r.terms().length, 1, 'url hyphen2');

  r = nlp('421-0059');
  t.equal(r.terms().length, 1, 'phoneNuumber hyphen');

  r = nlp('sept-2');
  t.equal(r.terms().length, 2, 'date hyphen');

  r = nlp('-2 degrees');
  t.equal(r.terms().length, 2, 'minus hyphen');

  t.end();
});


test('hyphenate', function (t) {
  var str = 'it is cool. he is nice';
  var m = nlp(str);
  m.hyphenate();
  t.equal(m.terms().length, 6, 'seperate terms');
  t.equal(m.out('text'), 'it-is-cool. he-is-nice', 'hyphenate');
  m.dehyphenate();
  t.equal(m.out('text'), str, 'dehyphenate');

  str = 'i payed seven-hundred for the sandwich';
  m = nlp(str);
  m.values().dehyphenate();
  t.equal(m.out('text'), 'i payed seven hundred for the sandwich', 'dehyphenate-values');

  str = 'he is the king of rock. she is the queen of cool.';
  m = nlp(str);
  m.match('(king|queen) of (#Noun|#Adjective)').hyphenate();
  t.equal(m.out('text'), 'he is the king-of-rock. she is the queen-of-cool.', 'hyphenate-match');

  t.end();
});

},{"../lib/nlp":75,"tape":65}],130:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('verb negate:', function(t) {
  [
    ['is', 'is not'],
    ['will', 'will not'],
    ['will be', 'will not be'],
    ['was', 'was not'],

    ['walks', 'does not walk'],
    ['walked', 'did not walk'],
    // ['walking', 'not walking'],
    // ['walk', 'do not walk'],
    ['will walk', 'will not walk'],
    ['will have walked', 'will not have walked'],

    // ['corrupted', 'did not corrupt'],
    ['jumped', 'did not jump'],
    ['stunk up', 'did not stink up'],

    [`would study`, `would not study`],
    [`could study`, `could not study`],
    [`should study`, `should not study`],
  ].forEach(function(a) {
    var str = nlp(a[0]).verbs().toNegative().out('normal');
    t.equal(str, a[1], a[1] + ' --- ' + str);
  });
  t.end();
});

},{"../lib/nlp":75,"tape":65}],131:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('sanity-check case:', function (t) {
  var str = 'John xoo, John fredman';
  var r = nlp(str);
  str = r.toUpperCase().out('text');
  t.equal(str, 'JOHN XOO, JOHN FREDMAN', 'uppercase');

  str = r.toLowerCase().out('text');
  t.equal(str, 'john xoo, john fredman', 'lowercase');

  str = r.toCamelCase().out('text');
  t.equal(str, 'JohnXoo,JohnFredman', 'camelcase');
  t.end();
});

test('tricky case:', function (t) {
  var str = 'i am spencer kelly here with Amy Adams.';
  var r = nlp(str);
  r.people().toUpperCase();
  str = r.out('text');
  t.equal(str, 'i am SPENCER KELLY here with AMY ADAMS.', 'tricky-uppercase');

  str = 'the Spencer Kelly Festival of Silly Walks';
  r = nlp(str);
  r.match('#TitleCase+').toCamelCase();
  t.equal(r.out('text'), 'the SpencerKellyFestival of SillyWalks', 'tricky-camelcase');

  t.end();
});

},{"../lib/nlp":75,"tape":65}],132:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('clone:', function (t) {
  var arr = [
    'he eats the alligator',
    'Jumanji is the best move. He eats cheese.',
    'Uperman is wayyyy better than batman!',
  ];
  arr.forEach(function(str) {
    var m = nlp(str);
    var neg = m.clone().sentences().toNegative();
    var past = m.clone().sentences().toPastTense();
    var fut = m.clone().sentences().toFutureTense();
    var adv = m.clone().verbs().insertBefore('really');
    var rm = m.clone().verbs().delete('#Verb');
    var out = m.out();
    t.equal(out, str, 'equals input - ' + out);
    t.notEqual(str, neg.out(), 'neg not equal - ' + str);
    t.notEqual(str, past.out(), 'past not equal - ' + str);
    t.notEqual(str, fut.out(), 'future not equal - ' + str);
    t.notEqual(str, adv.out(), 'adv not equal - ' + str);
    t.notEqual(str, rm.out(), 'rm not equal - ' + str);
  });
  t.end();
});

// test('one-liner:', function (t) {
//   var str = 'would somebody please think of the children';
//   var have = nlp(str).clone().toUpperCase().parent.out();
//   t.equal(str, have, 'parent-unchanged');
//   t.end();
// });

},{"../lib/nlp":75,"tape":65}],133:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;

test('sentence():', function(t) {
  [
    ['he is good', 'he is good'],
    ['Jack and Jill went up the hill.', 'jack and jill went up the hill.'],
    ['Mr. Clinton did so.', 'mr clinton did so.'],
    ['he is good', 'he is good'],
    ['Jack and Jill   went up the hill. She got  water.', 'jack and jill went up the hill. she got water.'],
    ['Joe', 'joe'],
    ['just-right', 'just right'],
    ['camel', 'camel'],
    ['4', '4'],
    ['four', 'four'],
    ['john smith', 'john smith'],
    ['Dr. John Smith-McDonald', 'dr john smith mcdonald'],
    ['Contains no fruit juice. \n\n All rights reserved', 'contains no fruit juice. all rights reserved'],
  ].forEach(function (a) {
    var str = nlp(a[0]).out('normal');
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

},{"../lib/fns":73,"../lib/nlp":75,"tape":65}],134:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('result methods', function (t) {
  var text = 'this :cookie: <3 💯 so good. It is really nice. Yes it is <3';

  //has method
  var m = nlp(text);
  t.equal(m.match('#Emoji').found, true, 'nlp.has positive');
  t.equal(m.match('#SportsTeam').found, false, 'nlp.has neg');

  //filter string
  var small = m.if('#Emoji');
  t.equal(small.out('normal'), 'this :cookie: <3 💯 so good. yes it is <3', 'nlp.filter string');

  //filter method
  small = m.ifNo('#Emoji');
  t.equal(small.out('normal'), 'it is really nice.', 'nlp.filter method');

  t.end();
});

},{"../lib/nlp":75,"tape":65}],135:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var arr_test = require('../lib/fns').arr_test;

test('splitAfter', function (t) {
  [
    ['doug and nancy', 'and', ['doug and', 'nancy']],
    ['doug and also nancy', 'and also', ['doug and also', 'nancy']],
    ['doug and definetly nancy', 'and #Adverb', ['doug and definetly', 'nancy']],
    ['maybe doug but possibly nancy', 'but', ['maybe doug but', 'possibly nancy']],

    ['a x b x c', 'x', ['a x', 'b x', 'c']],
    ['a b x c x', 'x', ['a b x', 'c x']],
    ['x a b x c', 'x', ['x', 'a b x', 'c']],
    ['x x a b c', 'x', ['x', 'x', 'a b c']],
    ['a x b x', 'x', ['a x', 'b x']],
    ['a x b c x', 'x', ['a x', 'b c x']],
    ['x x a b c', 'x', ['x', 'x', 'a b c']],

    ['john, paul, george, ringo', '#Comma', ['john', 'paul', 'george', 'ringo']],
    ['doug is really nice', 'is', ['doug is', 'really nice']],
  ].forEach(function (a) {
    var want = a[2];
    var got = nlp(a[0]).splitAfter(a[1]).out('array');
    arr_test(got, a[0], want, t);
  });
  t.end();
});

test('splitBefore', function (t) {
  [
    ['doug and nancy', 'and', ['doug', 'and nancy']],
    ['doug and also nancy', 'and also', ['doug', 'and also nancy']],
    ['doug and definetly nancy', 'and #Adverb', ['doug', 'and definetly nancy']],
    ['maybe doug but possibly nancy', 'but', ['maybe doug', 'but possibly nancy']],
    ['doug is really nice', 'is', ['doug', 'is really nice']],

    ['a x b x c', 'x', ['a', 'x b', 'x c']],
    ['a b x x c', 'x', ['a b', 'x', 'x c']],
    ['x a b x c', 'x', ['x a b', 'x c']],
    ['x x a b c', 'x', ['x', 'x a b c']],
    ['a x b x', 'x', ['a', 'x b', 'x']],
  ].forEach(function (a) {
    var want = a[2];
    var got = nlp(a[0]).splitBefore(a[1]).out('array');
    arr_test(got, a[0], want, t);
  });
  t.end();
});

test('splitOn', function (t) {
  [
    ['doug and nancy', 'and', ['doug', 'and', 'nancy']],
    ['doug and also nancy', 'and also', ['doug', 'and also', 'nancy']],
    ['doug and definetly nancy', 'and #Adverb', ['doug', 'and definetly', 'nancy']],
    ['maybe doug but possibly nancy', 'but', ['maybe doug', 'but', 'possibly nancy']],
    ['doug is really nice', 'is', ['doug', 'is', 'really nice']],

    ['a x b x c', 'x', ['a', 'x', 'b', 'x', 'c']],
    ['a b x x c', 'x', ['a b', 'x', 'x', 'c']],
    ['x a b x c', 'x', ['x', 'a b', 'x', 'c']],
    ['x x a b c', 'x', ['x', 'x', 'a b c']],
    ['a x b x', 'x', ['a', 'x', 'b', 'x']],
  ].forEach(function (a) {
    var want = a[2];
    var got = nlp(a[0]).splitOn(a[1]).out('array');
    arr_test(got, a[0], want, t);
  });
  t.end();
});

},{"../lib/fns":73,"../lib/nlp":75,"tape":65}],136:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('sanity-check case:', function (t) {
  var m = nlp('john is cool. he is nice');
  m.whitespace.before('  ');
  t.equal(m.out('text'), '  john is cool.  he is nice');

  m = nlp('john is cool. he is nice');
  m.whitespace.after('    ');
  t.equal(m.out('text'), 'john is cool.     he is nice    ');

  m = nlp('so john smith is cool.');
  m.people().whitespace.before('  ');
  m.people().whitespace.after('  ');
  t.equal(m.out('text'), 'so  john smith   is cool.');

  t.end();
});

},{"../lib/nlp":75,"tape":65}],137:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;

test('==WordCount==', function(t) {
  [
    ['he is good', 3],
    ['jack and jill went up the hill.', 7],
    ['Mr. Clinton did so.', 4],
    ['Bill Clinton ate cheese.', 4],
    ['5kb of data.', 3],
    ['it was five hundred and seventy two.', 7],
    ['jack and jill went up the hill. They got water.', 10],
    ['Bill Clinton went walking', 4],
    ['Bill Clinton will go walking', 5],
  ].forEach(function (a) {
    var num = nlp(a[0]).terms().length;
    str_test(num, a[0], a[1], t);
  });
  t.end();
});

},{"../lib/fns":73,"../lib/nlp":75,"tape":65}]},{},[71,72,76,77,79,78,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,106,105,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,126,125,127,128,129,130,131,132,133,134,135,136,137]);
