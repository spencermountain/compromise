/* nlp_compromise v6.5.0 MIT*/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nlp_compromise = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
//these are common word shortenings used in the lexicon and sentence segmentation methods
//there are all nouns, or at the least, belong beside one.
'use strict';

var honourifics = _dereq_('./honourifics'); //stored seperately, for 'noun.is_person()'

//common abbreviations
var main = ['arc', 'al', 'exp', 'rd', 'st', 'dist', 'mt', 'fy', 'pd', 'pl', 'plz', 'tce', 'llb', 'md', 'bl', 'ma', 'ba', 'lit', 'ex', 'eg', 'ie', 'circa', 'ca', 'cca', 'vs', 'etc', 'esp', 'ft', 'bc', 'ad'];

//person titles like 'jr', (stored seperately)
main = main.concat(honourifics);

//org main
var orgs = ['dept', 'univ', 'assn', 'bros', 'inc', 'ltd', 'co', 'corp',
//proper nouns with exclamation marks
'yahoo', 'joomla', 'jeopardy'];
main = main.concat(orgs);

//place main
var places = ['ariz', 'cal', 'calif', 'col', 'colo', 'conn', 'fla', 'fl', 'ga', 'ida', 'ia', 'kan', 'kans', 'md', 'minn', 'neb', 'nebr', 'okla', 'penna', 'penn', 'pa', 'dak', 'tenn', 'tex', 'ut', 'vt', 'va', 'wis', 'wisc', 'wy', 'wyo', 'usafa', 'alta', 'ont', 'que', 'sask', 'ave', 'blvd', 'cl', 'ct', 'cres', 'hwy'];
main = main.concat(places);

//date abbrevs.
//these are added seperately because they are not nouns
var dates = ['jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'sept', 'oct', 'nov', 'dec'];
main = main.concat(dates);

module.exports = {
  abbreviations: main,
  dates: dates,
  orgs: orgs,
  places: places
};

},{"./honourifics":9}],2:[function(_dereq_,module,exports){
//adjectives that either aren't covered by rules, or have superlative/comparative forms
//this list is the seed, from which various forms are conjugated
'use strict';

var fns = _dereq_('../fns');

//suffix-index adjectives
//  {cial:'cru,spe'} -> 'crucial', 'special'
var compressed = {
  erate: 'degen,delib,desp,lit,mod',
  icial: 'artif,benef,off,superf',
  ntial: 'esse,influe,pote,substa',
  teful: 'gra,ha,tas,was',
  stant: 'con,di,in,resi',
  going: 'easy,fore,on,out',
  hing: 'astonis,das,far-reac,refres,scat,screec,self-loat,soot',
  eful: 'car,grac,peac,sham,us,veng',
  ming: 'alar,cal,glea,unassu,unbeco,upco',
  cial: 'commer,cru,finan,ra,so,spe',
  tful: 'deligh,doub,fre,righ,though,wis',
  ight: 'overn,overwe,r,sl,upt',
  ated: 'antiqu,intoxic,sophistic,unregul,unrel',
  rant: 'aber,exube,flag,igno,vib',
  uent: 'congr,fl,freq,subseq',
  rate: 'accu,elabo,i,sepa',
  ific: 'horr,scient,spec,terr',
  rary: 'arbit,contempo,cont,tempo',
  ntic: 'authe,fra,giga,roma',
  wing: 'harro,kno,left-,right-',
  nant: 'domi,malig,preg,reso',
  nent: 'emi,immi,perma,promi',
  iant: 'brill,def,g,luxur',
  ging: 'dama,encoura,han,lon',
  iate: 'appropr,immed,inappropr,intermed',
  rect: 'cor,e,incor,indi',
  zing: 'agoni,ama,appeti,free',
  ant: 'abund,arrog,eleg,extravag,exult,hesit,irrelev,miscre,nonchal,obeis,observ,pl,pleas,redund,relev,reluct,signific,vac,verd',
  ing: 'absorb,car,coo,liv,lov,ly,menac,perplex,shock,stand,surpris,tell,unappeal,unconvinc,unend,unsuspect,vex,want',
  ate: 'adequ,delic,fortun,inadequ,inn,intim,legitim,priv,sed,ultim',
  ted: 'expec,impor,limi,spiri,talen,tes,unexpec,unpreceden',
  ish: 'dan,fool,hell,lout,self,snobb,squeam,styl',
  ary: 'dre,legend,necess,prim,sc,second,w,we',
  ite: 'el,favor,fin,oppos,pet,pol,recond,tr',
  ely: 'hom,lik,liv,lon,lov,tim,unlik',
  ure: 'fut,insec,miniat,obsc,premat,sec,s',
  tly: 'cos,ghas,ghos,nigh,sain,sprigh,unsigh',
  dly: 'cowar,cud,frien,frien,kin,ma',
  ble: 'a,dou,hum,nim,no,proba',
  rly: 'bu,disorde,elde,hou,neighbo,yea',
  ine: 'div,femin,genu,mascul,prist,rout',
  ute: 'absol,ac,c,m,resol',
  ped: 'cram,pum,stereoty,stri,war',
  sed: 'clo,disea,distres,unsupervi,u',
  lly: 'chi,hi,jo,si,sme',
  per: 'dap,impro,pro,su,up',
  ile: 'fert,host,juven,mob,volat',
  led: 'detai,disgrunt,fab,paralle,troub',
  ern: 'east,north,south,st,west',
  ast: 'e,l,p,steadf',
  ent: 'abs,appar,b,pres',
  ged: 'dama,deran,jag,rag',
  ded: 'crow,guar,retar,undeci',
  est: 'b,dishon,hon,quick',
  ial: 'colon,impart,init,part',
  ter: 'bet,lat,ou,ut',
  ond: 'bey,bl,sec,vagab',
  ady: 'he,re,sh,ste',
  eal: 'ether,id,r,surr',
  ard: 'abo,awkw,stand,straightforw',
  ior: 'jun,pr,sen,super',
  ale: 'fem,m,upsc,wholes',
  ed: 'advanc,belov,craz,determin,hallow,hook,inbr,justifi,nak,nuanc,sacr,subdu,unauthoriz,unrecogniz,wick',
  ly: 'dai,deep,earth,gris,heaven,low,meas,melancho,month,oi,on,prick,seem,s,ug,unru,week,wi,woman',
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
  le: 'midd,multip,sing,so,subt,who',
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

var arr = ['ablaze', 'above', 'adult', 'ahead', 'aloof', 'arab', 'asleep', 'average', 'awake', 'backwards', 'bad', 'blank', 'bogus', 'bottom', 'brisk', 'cagey', 'chief', 'civil', 'common', 'complex', 'cozy', 'crisp', 'deaf', 'devout', 'difficult', 'downtown', 'due', 'dumb', 'eerie', 'evil', 'excess', 'extra', 'fake', 'far', 'faux', 'fierce ', 'fit', 'foreign', 'fun', 'good', 'goofy', 'gratis', 'grey', 'groovy', 'gross', 'half', 'huge', 'humdrum', 'inside', 'kaput',
//  'lax', -> airports
'left', 'less', 'level', 'lewd', 'magenta', 'makeshift', 'mammoth', 'medium', 'moot', 'naive', 'nearby', 'next', 'nonstop', 'north', 'offbeat', 'ok', 'outside', 'overwrought', 'premium', 'pricey', 'pro', 'quaint', 'random', 'rear', 'rebel', 'ritzy', 'rough', 'savvy', 'sexy', 'shut', 'shy', 'sleek', 'smug', 'solemn', 'south', 'stark', 'superb', 'taboo', 'teenage', 'top', 'tranquil', 'ultra', 'understood', 'unfair', 'unknown', 'upbeat', 'upstairs', 'vanilla', 'various', 'widespread', 'woozy', 'wrong', 'final', 'true', 'modern', 'notable'];

module.exports = fns.expand_suffixes(arr, compressed);

},{"../fns":23}],3:[function(_dereq_,module,exports){
'use strict';

//these are adjectives that can become comparative + superlative with out "most/more"
//its a whitelist for conjugation
//this data is shared between comparative/superlative methods
module.exports = ['absurd', 'aggressive', 'alert', 'alive', 'awesome', 'beautiful', 'big', 'bitter', 'black', 'blue', 'bored', 'boring', 'brash', 'brave', 'brief', 'bright', 'broad', 'brown', 'calm', 'charming', 'cheap', 'clean', 'cold', 'cool', 'cruel', 'cute', 'damp', 'deep', 'dear', 'dead', 'dark', 'dirty', 'drunk', 'dull', 'eager', 'efficient', 'even', 'faint', 'fair', 'fanc', 'fast', 'fat', 'feeble', 'few', 'fierce', 'fine', 'flat', 'forgetful', 'frail', 'full', 'gentle', 'glib', 'great', 'green', 'gruesome', 'handsome', 'hard', 'harsh', 'high', 'hollow', 'hot', 'impolite', 'innocent', 'keen', 'kind', 'lame', 'lean', 'light', 'little', 'loose', 'long', 'loud', 'low', 'lush', 'macho', 'mean', 'meek', 'mellow', 'mundane', 'near', 'neat', 'new', 'nice', 'normal', 'odd', 'old', 'pale', 'pink', 'plain', 'poor', 'proud', 'purple', 'quick', 'rare', 'rapid', 'red', 'rich', 'ripe', 'rotten', 'round', 'rude', 'sad', 'safe', 'scarce', 'scared', 'shallow', 'sharp', 'short', 'shrill', 'simple', 'slim', 'slow', 'small', 'smart', 'smooth', 'soft', 'sore', 'sour', 'square', 'stale', 'steep', 'stiff', 'straight', 'strange', 'strong', 'sweet', 'swift', 'tall', 'tame', 'tart', 'tender', 'tense', 'thick', 'thin', 'tight', 'tough', 'vague', 'vast', 'vulgar', 'warm', 'weak', 'wet', 'white', 'wide', 'wild', 'wise', 'young', 'yellow', 'easy', 'narrow', 'late', 'early', 'soon', 'close', 'empty', 'dry', 'windy', 'noisy', 'thirsty', 'hungry', 'fresh', 'quiet', 'clear', 'heavy', 'happy', 'funny', 'lucky', 'pretty', 'important', 'interesting', 'attractive', 'dangerous', 'intellegent', 'pure', 'orange', 'large', 'firm', 'grand', 'formal', 'raw', 'weird', 'glad', 'mad', 'strict', 'tired', 'solid', 'extreme', 'mature', 'true', 'free', 'curly', 'angry'].reduce(function (h, s) {
  h[s] = 'Adjective';
  return h;
}, {});

},{}],4:[function(_dereq_,module,exports){
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

},{}],5:[function(_dereq_,module,exports){
'use strict';
//terms that are 'Date' term

var months = ['january', 'february',
// "march",  //ambig
'april',
// "may",   //ambig
'june', 'july', 'august', 'september', 'october', 'november', 'december', 'jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'sept', 'sep'];
var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'];
//add 'mondays'
for (var i = 0; i <= 6; i++) {
  days.push(days[i] + 's');
}

var durations = ['millisecond', 'second', 'minute', 'hour', 'morning', 'afternoon', 'evening', 'night', 'day', 'week', 'month', 'year', 'decade'];
//add their plurals
var len = durations.length;
for (var _i = 0; _i < len; _i++) {
  durations.push(durations[_i] + 's');
}
durations.push('century');
durations.push('centuries');

var relative = ['yesterday', 'today', 'tomorrow', 'week', 'weekend', 'tonight'];

module.exports = {
  days: days,
  months: months,
  durations: durations,
  relative: relative
};

},{}],6:[function(_dereq_,module,exports){
'use strict';

//adjectival forms of place names, as adjectives.
module.exports = ['afghan', 'albanian', 'algerian', 'angolan', 'argentine', 'armenian', 'australian', 'aussie', 'austrian', 'bangladeshi', 'basque', // of Basque Country
'belarusian', 'belgian', 'bolivian', 'bosnian', 'brazilian', 'bulgarian', 'cambodian', 'cameroonian', 'canadian', 'chadian', 'chilean', 'chinese', 'colombian', 'congolese', 'croatian', 'cuban', 'czech', 'dominican', 'danish', 'egyptian', 'british', 'estonian', 'ethiopian', 'ecuadorian', 'finnish', 'french', 'gambian', 'georgian', 'german', 'greek', 'ghanaian', 'guatemalan', 'haitian', 'hungarian', 'honduran', 'icelandic', 'indian', 'indonesian', 'iranian', 'iraqi', 'irish', 'israeli', 'italian', 'ivorian', // of Ivory Coast
'jamaican', 'japanese', 'jordanian', 'kazakh', 'kenyan', 'korean', 'kuwaiti', 'lao', // of Laos
'latvian', 'lebanese', 'liberian', 'libyan', 'lithuanian', 'namibian', 'malagasy', // of Madagascar
'macedonian', 'malaysian', 'mexican', 'mongolian', 'moroccan', 'dutch', 'nicaraguan', 'nigerian', // of Nigeria
'nigerien', // of Niger
'norwegian', 'omani', 'panamanian', 'paraguayan', 'pakistani', 'palestinian', 'peruvian', 'philippine', 'filipino', 'polish', 'portuguese', 'qatari', 'romanian', 'russian', 'rwandan', 'samoan', 'saudi', 'scottish', 'senegalese', 'serbian', 'singaporean', 'slovak', 'somalian', 'sudanese', 'swedish', 'swiss', 'syrian', 'taiwanese', 'trinidadian', 'thai', 'tunisian', 'turkmen', 'ugandan', 'ukrainian', 'american', 'hindi', 'spanish', 'venezuelan', 'vietnamese', 'welsh', 'zambian', 'zimbabwean', 'english', 'african', 'european', 'asian', 'californian'];

},{}],7:[function(_dereq_,module,exports){
// common first-names in compressed form.
// from http://www.ssa.gov/oact/babynames/limits.html  and http://www.servicealberta.gov.ab.ca/pdf/vs/2001_Boys.pdf
// not sure what regional/cultural/demographic bias this has. Probably a lot.
// 73% of people are represented in the top 1000 names

// used to reduce redundant named-entities in longer text. (don't spot the same person twice.)
// used to identify gender for coreference resolution
'use strict';

var male = _dereq_('./names/male');
var female = _dereq_('./names/female');
var names = {};

//names commonly used in either gender
var ambiguous = ['casey', 'jamie', 'lee', 'jaime', 'jessie', 'morgan', 'rene', 'robin', 'devon', 'kerry', 'alexis', 'guadalupe', 'blair', 'kasey', 'jean', 'marion', 'aubrey', 'shelby', 'jan', 'shea', 'jade', 'kenyatta', 'kelsey', 'shay', 'lashawn', 'trinity', 'regan', 'jammie', 'cassidy', 'cheyenne', 'reagan', 'shiloh', 'marlo', 'andra', 'devan', 'rosario', 'lee'];
for (var i = 0; i < male.length; i++) {
  names[male[i]] = 'm';
}
for (var _i = 0; _i < female.length; _i++) {
  names[female[_i]] = 'f';
}
//ambiguous/unisex names
for (var _i2 = 0; _i2 < ambiguous.length; _i2 += 1) {
  names[ambiguous[_i2]] = 'a';
}
// console.log(names['spencer']);
// console.log(names['jill']);
// console.log(names['sue'])
// console.log(names['jan'])
module.exports = {
  all: names,
  male: male,
  female: female
};

},{"./names/female":14,"./names/male":15}],8:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');
//turns holiday-names into text-versions of their dates
//https://en.wikipedia.org/wiki/federal_holidays_in_the_united_states

//some major, and unambiguous holidays with the same date each year
var annual = {
  //general
  'new years eve': 'december 31',
  'new years': 'january 1',
  'new years day': 'january 1',
  'thanksgiving': 'fourth thursday in november',
  'christmas eve': 'december 24',
  'christmas': 'december 25',
  'christmas day': 'december 25',
  'saint patricks day': 'march 17',
  'st patricks day': 'march 17',
  'april fools': 'april 1',
  'halloween': 'october 31',
  'valentines': 'february 14',
  'valentines day': 'february 14',

  //american
  'martin luther king': 'third monday in january',
  'inauguration day': 'january 20',
  'washingtons birthday': 'third monday in february',
  'presidents day': 'third monday in february',
  'memorial day': 'last monday in may',
  // 'independence': 'july 4',
  'labor day': 'first monday in september',
  'columbus day': 'second monday in october',
  'veterans day': 'november 11',

  //british
  'labour day': 'first monday in september',
  'commonwealth day': 'second monday in march',
  'st andrews day': 'november 30',
  'saint andrews day': 'november 30',
  'may day': 'may 1',

  //russian
  'russia day': 'june 12',

  //australian
  'australia day': 'january 26',
  'boxing day': 'december 26',
  'queens birthday': '2nd monday in june',

  //canadian
  'canada day': 'july 1',
  'victoria day': 'may 24',
  'canadian thanksgiving': 'second monday in october',
  'rememberance day': 'november 11',
  'august civic holiday': 'first monday in august',
  'natal day': 'first monday in august',

  //european
  'all saints day': 'november 1',
  'armistice day': 'november 11',
  'bastille day': 'july 14',
  'st stephens day': 'december 26',
  'saint stephens day': 'december 26'
};

// hardcoded dates for non-regular holidays
//   ----change every few years(!)---   TODO :do more years
var astronomical = {
  2015: {
    'chinese new year': 'february 19',
    'easter': 'april 5',
    'easter sunday': 'april 5',
    'easter monday': 'april 6',
    'good friday': 'april 3',
    'ascension day': 'may 14',
    'eid': 'july 17',
    'eid al-fitr': 'july 17',
    'eid al-adha': 'september 24',
    'ramadan': 'june 6', //range
    'ashura': '23 october',
    'diwali': '11 november'
  },
  2016: {
    'chinese new year': 'february 8',
    'easter': 'march 27',
    'easter sunday': 'march 27',
    'easter monday': 'march 28',
    'good friday': 'march 25',
    'ascension day': 'may 5',
    'eid': 'july 6',
    'eid al-fitr': 'july 6',
    'eid al-adha': 'september 11',
    'ramadan': 'may 27',
    'diwali': 'october 30'
  },
  2017: {
    'chinese new year': '28 january',
    'easter': 'april 16',
    'easter sunday': 'april 16',
    'easter monday': 'april 17',
    'good friday': 'april 14',
    'ascension day': 'may 25',
    'eid': 'july 25',
    'eid al-fitr': 'july 25',
    'diwali': 'october 21',
    'ramadan': 'may 27'
  }
};
//select current year
var thisYear = new Date().getFullYear();
var holidays = fns.extend(annual, astronomical[thisYear] || {});

module.exports = holidays;

},{"../fns":23}],9:[function(_dereq_,module,exports){
'use strict';

//these are common person titles used in the lexicon and sentence segmentation methods
//they are also used to identify that a noun is a person
module.exports = [
//honourifics
'jr', 'mr', 'mrs', 'ms', 'dr', 'prof', 'sr', 'sen', 'corp', 'rep', 'gov', 'atty', 'supt', 'det', 'rev', 'col', 'gen', 'lt', 'cmdr', 'adm', 'capt', 'sgt', 'cpl', 'maj',
// 'miss',
// 'misses',
'mister', 'sir', 'esq', 'mstr', 'phd', 'adj', 'adv', 'asst', 'bldg', 'brig', 'comdr', 'hon', 'messrs', 'mlle', 'mme', 'op', 'ord', 'pvt', 'reps', 'res', 'sens', 'sfc', 'surg'];

},{}],10:[function(_dereq_,module,exports){
//nouns with irregular plural/singular forms
//used in noun.inflect, and also in the lexicon.
//compressed with '_' to reduce some redundancy.
'use strict';

var main = [['child', '_ren'], ['person', 'people'], ['leaf', 'leaves'], ['database', '_s'], ['quiz', '_zes'], ['stomach', '_s'], ['sex', '_es'], ['move', '_s'], ['shoe', '_s'], ['goose', 'geese'], ['phenomenon', 'phenomena'], ['barracks', '_'], ['deer', '_'], ['syllabus', 'syllabi'], ['index', 'indices'], ['appendix', 'appendices'], ['criterion', 'criteria'], ['man', 'men'], ['sex', '_es'], ['rodeo', '_s'], ['epoch', '_s'], ['zero', '_s'], ['avocado', '_s'], ['halo', '_s'], ['tornado', '_s'], ['tuxedo', '_s'], ['sombrero', '_s'], ['addendum', 'addenda'], ['alga', '_e'], ['alumna', '_e'], ['alumnus', 'alumni'], ['bacillus', 'bacilli'], ['cactus', 'cacti'], ['beau', '_x'], ['château', '_x'], ['chateau', '_x'], ['tableau', '_x'], ['corpus', 'corpora'], ['curriculum', 'curricula'], ['echo', '_es'], ['embargo', '_es'], ['foot', 'feet'], ['genus', 'genera'], ['hippopotamus', 'hippopotami'], ['larva', '_e'], ['libretto', 'libretti'], ['loaf', 'loaves'], ['matrix', 'matrices'], ['memorandum', 'memoranda'], ['mosquito', '_es'], ['opus', 'opera'], ['ovum', 'ova'], ['ox', '_en'], ['radius', 'radii'], ['referendum', 'referenda'], ['thief', 'thieves'], ['tooth', 'teeth']];

main = main.map(function (a) {
  a[1] = a[1].replace('_', a[0]);
  return a;
});

module.exports = main;

},{}],11:[function(_dereq_,module,exports){
'use strict';

//a list of exceptions to the verb rules
var irregular_verbs = {
  take: {
    perfect: 'have taken',
    pluperfect: 'had taken',
    future_perfect: 'will have taken'
  },
  can: {
    gerund: '',
    present: 'can',
    past: 'could',
    future: 'can',
    perfect: 'could',
    pluperfect: 'could',
    future_perfect: 'can',
    actor: ''
  },
  free: {
    gerund: 'freeing',
    actor: ''
  },
  arise: {
    past: 'arose',
    participle: 'arisen'
  },
  babysit: {
    past: 'babysat',
    actor: 'babysitter'
  },
  be: { // this is crazy-hard and shouldn't be here
    past: 'been',
    present: 'is',
    future: 'will be',
    perfect: 'have been',
    pluperfect: 'had been',
    future_perfect: 'will have been',
    actor: '',
    gerund: 'am'
  },
  is: {
    past: 'was',
    present: 'is',
    future: 'will be',
    perfect: 'have been',
    pluperfect: 'had been',
    future_perfect: 'will have been',
    actor: '',
    gerund: 'being'
  },
  beat: {
    gerund: 'beating',
    actor: 'beater'
  },
  begin: {
    gerund: 'beginning',
    past: 'began'
  },
  bet: {
    actor: 'better'
  },
  bind: {
    past: 'bound'
  },
  bite: {
    gerund: 'biting',
    past: 'bit'
  },
  bleed: {
    past: 'bled'
  },
  break: {
    past: 'broke'
  },
  breed: {
    past: 'bred'
  },
  bring: {
    past: 'brought'
  },
  broadcast: {
    past: 'broadcast'
  },
  build: {
    past: 'built'
  },
  buy: {
    past: 'bought'
  },
  catch: {
    past: 'caught'
  },
  choose: {
    gerund: 'choosing',
    past: 'chose'
  },
  cost: {
    past: 'cost'
  },
  deal: {
    past: 'dealt'
  },
  die: {
    past: 'died',
    gerund: 'dying'
  },
  dig: {
    gerund: 'digging',
    past: 'dug'
  },
  do: {
    past: 'did',
    present: 'does'
  },
  draw: {
    past: 'drew'
  },
  drink: {
    past: 'drank'
  },
  drive: {
    gerund: 'driving',
    past: 'drove'
  },
  eat: {
    gerund: 'eating',
    past: 'ate',
    actor: 'eater'
  },
  fall: {
    past: 'fell'
  },
  feed: {
    past: 'fed'
  },
  feel: {
    past: 'felt',
    actor: 'feeler'
  },
  fight: {
    past: 'fought'
  },
  find: {
    past: 'found'
  },
  fly: {
    past: 'flew'
  },
  forbid: {
    past: 'forbade'
  },
  forget: {
    gerund: 'forgeting',
    past: 'forgot'
  },
  forgive: {
    gerund: 'forgiving',
    past: 'forgave'
  },
  freeze: {
    gerund: 'freezing',
    past: 'froze'
  },
  get: {
    past: 'got'
  },
  give: {
    gerund: 'giving',
    past: 'gave'
  },
  go: {
    past: 'went',
    present: 'goes'
  },
  hang: {
    past: 'hung'
  },
  have: {
    gerund: 'having',
    past: 'had',
    present: 'has'
  },
  hear: {
    past: 'heard'
  },
  hide: {
    past: 'hid'
  },
  hold: {
    past: 'held'
  },
  hurt: {
    past: 'hurt'
  },
  lay: {
    past: 'laid'
  },
  lead: {
    past: 'led'
  },
  leave: {
    past: 'left'
  },
  lie: {
    gerund: 'lying',
    past: 'lay'
  },
  light: {
    past: 'lit'
  },
  lose: {
    gerund: 'losing',
    past: 'lost'
  },
  make: {
    past: 'made'
  },
  mean: {
    past: 'meant'
  },
  meet: {
    gerund: 'meeting',
    past: 'met',
    actor: 'meeter'
  },
  pay: {
    past: 'paid'
  },
  read: {
    past: 'read'
  },
  ring: {
    past: 'rang'
  },
  rise: {
    past: 'rose',
    gerund: 'rising',
    pluperfect: 'had risen',
    future_perfect: 'will have risen'
  },
  run: {
    gerund: 'running',
    past: 'ran'
  },
  say: {
    past: 'said'
  },
  see: {
    past: 'saw'
  },
  sell: {
    past: 'sold'
  },
  shine: {
    past: 'shone'
  },
  shoot: {
    past: 'shot'
  },
  show: {
    past: 'showed'
  },
  sing: {
    past: 'sang'
  },
  sink: {
    past: 'sank',
    pluperfect: 'had sunk'
  },
  sit: {
    past: 'sat'
  },
  slide: {
    past: 'slid'
  },
  speak: {
    past: 'spoke',
    perfect: 'have spoken',
    pluperfect: 'had spoken',
    future_perfect: 'will have spoken'
  },
  spin: {
    gerund: 'spinning',
    past: 'spun'
  },
  spread: {
    past: 'spread'
  },
  stand: {
    past: 'stood'
  },
  steal: {
    past: 'stole',
    actor: 'stealer'
  },
  stick: {
    past: 'stuck'
  },
  sting: {
    past: 'stung'
  },
  stream: {
    actor: 'streamer'
  },
  strike: {
    gerund: 'striking',
    past: 'struck'
  },
  swear: {
    past: 'swore'
  },
  swim: {
    past: 'swam'
  },
  swing: {
    past: 'swung'
  },
  teach: {
    past: 'taught',
    present: 'teaches'
  },
  tear: {
    past: 'tore'
  },
  tell: {
    past: 'told'
  },
  think: {
    past: 'thought'
  },
  understand: {
    past: 'understood'
  },
  wake: {
    past: 'woke'
  },
  wear: {
    past: 'wore'
  },
  win: {
    gerund: 'winning',
    past: 'won'
  },
  withdraw: {
    past: 'withdrew'
  },
  write: {
    gerund: 'writing',
    past: 'wrote'
  },
  tie: {
    gerund: 'tying',
    past: 'tied'
  },
  ski: {
    past: 'skiied'
  },
  boil: {
    actor: 'boiler'
  },
  miss: {
    present: 'miss'
  },
  act: {
    actor: 'actor'
  },
  compete: {
    gerund: 'competing',
    past: 'competed',
    actor: 'competitor'
  },
  being: {
    gerund: 'are',
    past: 'were',
    present: 'are'
  },
  imply: {
    past: 'implied',
    present: 'implies'
  },
  ice: {
    gerund: 'icing',
    past: 'iced'
  },
  develop: {
    past: 'developed',
    actor: 'developer',
    gerund: 'developing'
  },
  wait: {
    gerund: 'waiting',
    past: 'waited',
    actor: 'waiter'
  },
  aim: {
    actor: 'aimer'
  },
  spill: {
    past: 'spilt'
  },
  drop: {
    gerund: 'dropping',
    past: 'dropped'
  },
  log: {
    gerund: 'logging',
    past: 'logged'
  },
  rub: {
    gerund: 'rubbing',
    past: 'rubbed'
  },
  smash: {
    present: 'smashes'
  },
  suit: {
    gerund: 'suiting',
    past: 'suited',
    actor: 'suiter'
  }
};
module.exports = irregular_verbs;

},{}],12:[function(_dereq_,module,exports){
'use strict';

var misc = {
  'there': 'NN',
  'here': 'JJ',

  'better': 'JJR',
  'earlier': 'JJR',

  'has': 'VB',
  'sounds': 'VBZ',
  //special case for took/taken
  'taken': 'VBD',
  'msg': 'VB', //slang
  //date
  'noon': 'DA',
  'midnight': 'DA',
  //errr....
  'now': 'DA',
  'morning': 'DA',
  'evening': 'DA',
  'afternoon': 'DA',
  'ago': 'DA',
  'sometime': 'DA',
  //end of day, end of month
  'eod': 'DA',
  'eom': 'DA',
  'number': 'NN',
  'system': 'NN',
  'example': 'NN',
  'part': 'NN',
  'house': 'NN'
};

var compact = {
  //conjunctions
  'CC': ['yet', 'therefore', 'or', 'while', 'nor', 'whether', 'though', 'because', 'cuz', 'but', 'for', 'and', 'however', 'before', 'although', 'how', 'plus', 'versus', 'not'],
  'CO': ['if', 'unless', 'otherwise', 'notwithstanding'],

  'VBD': ['said', 'had', 'been', 'began', 'came', 'did', 'meant', 'went'],

  'VBN': ['given', 'known', 'shown', 'seen', 'born'],

  'VBG': ['going', 'being', 'according', 'resulting', 'developing', 'staining'],

  //copula
  'CP': ['is', 'will be', 'are', 'was', 'were', 'am', 'isn\'t', 'ain\'t', 'aren\'t'],

  //determiners
  'DT': ['this', 'any', 'enough', 'each', 'whatever', 'every', 'these', 'another', 'plenty', 'whichever', 'neither', 'an', 'a', 'least', 'own', 'few', 'both', 'those', 'the', 'that', 'various', 'either', 'much', 'some', 'else', 'no',
  //some other languages (what could go wrong?)
  'la', 'le', 'les', 'des', 'de', 'du', 'el'],

  //prepositions
  'IN': ['until', 'onto', 'of', 'into', 'out', 'except', 'across', 'by', 'between', 'at', 'down', 'as', 'from', 'around', 'with', 'among', 'upon', 'amid', 'to', 'along', 'since', 'about', 'off', 'on', 'within', 'in', 'during', 'per', 'without', 'throughout', 'through', 'than', 'via', 'up', 'unlike', 'despite', 'below', 'unless', 'towards', 'besides', 'after', 'whereas', '\'o', 'amidst', 'amongst', 'apropos', 'atop', 'barring', 'chez', 'circa', 'mid', 'midst', 'notwithstanding', 'qua', 'sans', 'vis-a-vis', 'thru', 'till', 'versus', 'without', 'w/o', 'o\'', 'a\''],

  //modal verbs
  'MD': ['can', 'may', 'could', 'might', 'will', 'ought to', 'would', 'must', 'shall', 'should', 'ought', 'shant', 'lets'],

  //Possessive pronouns
  'PP': ['mine', 'something', 'none', 'anything', 'anyone', 'theirs', 'himself', 'ours', 'his', 'my', 'their', 'yours', 'your', 'our', 'its', 'herself', 'hers', 'themselves', 'myself', 'itself', 'her'],

  //personal pronouns (nouns)
  'PRP': ['it', 'they', 'i', 'them', 'you', 'she', 'me', 'he', 'him', 'ourselves', 'us', 'we', 'thou', 'il', 'elle', 'yourself', '\'em', 'he\'s', 'she\'s'],
  //questions are awkward pos. are clarified in question_pass
  'QU': ['where', 'why', 'when', 'who', 'whom', 'whose', 'what', 'which'],
  //some manual adverbs (the rest are generated)
  'RB': [
  // 'now',
  'again', 'already', 'soon', 'directly', 'toward', 'forever', 'apart', 'instead', 'yes', 'alone', 'indeed', 'ever', 'quite', 'perhaps', 'then', 'thus', 'very', 'often', 'once', 'never', 'away', 'always', 'sometimes', 'also', 'maybe', 'so', 'just', 'well', 'several', 'such', 'randomly', 'too', 'rather', 'abroad', 'almost', 'anyway', 'twice', 'aside', 'moreover', 'anymore', 'newly', 'damn', 'somewhat', 'somehow', 'meanwhile', 'hence', 'further', 'furthermore', 'more', 'way', 'kinda', 'totally'],

  //interjections, expressions
  'EX': ['uh', 'uhh', 'uh huh', 'uh-oh', 'please', 'ugh', 'sheesh', 'eww', 'pff', 'voila', 'oy', 'hi', 'hello', 'bye', 'goodbye', 'hey', 'hai', 'eep', 'hurrah', 'yuck', 'ow', 'duh', 'oh', 'hmm', 'yeah', 'whoa', 'ooh', 'whee', 'ah', 'bah', 'gah', 'yaa', 'phew', 'gee', 'ahem', 'eek', 'meh', 'yahoo', 'oops', 'd\'oh', 'psst', 'argh', 'grr', 'nah', 'shhh', 'whew', 'mmm', 'ooo', 'yay', 'uh-huh', 'boo', 'wow', 'nope', 'haha', 'hahaha', 'lol', 'lols', 'ya', 'hee', 'ohh', 'eh', 'yup'],

  //special nouns that shouldnt be seen as a verb
  'NN': ['nothing', 'everything', 'god', 'student', 'patent', 'funding', 'banking', 'ceiling', 'energy', 'purpose', 'friend', 'event', 'room', 'door', 'thing', 'things', 'stuff', 'lunch', 'breakfast', 'dinner', 'home', 'problem', 'body', 'world', 'city', 'death', 'others'],
  //family-terms are people
  PN: ['father', 'mother', 'mom', 'dad', 'mommy', 'daddy', 'sister', 'brother', 'aunt', 'uncle', 'grandfather', 'grandmother', 'cousin', 'stepfather', 'stepmother', 'boy', 'girl', 'man', 'men', 'woman', 'women', 'guy', 'dude', 'bro', 'gentleman', 'someone']
};
//unpack the compact terms into the misc lexicon..
var keys = Object.keys(compact);
for (var i = 0; i < keys.length; i++) {
  var arr = compact[keys[i]];
  for (var i2 = 0; i2 < arr.length; i2++) {
    misc[arr[i2]] = keys[i];
  }
}
// console.log(misc.a);
module.exports = misc;

},{}],13:[function(_dereq_,module,exports){
'use strict';

//common terms that are multi-word, but one part-of-speech
//these should not include phrasal verbs, like 'looked out'. These are handled elsewhere.
module.exports = {
  'a few': 'CD', //different than 'few people'
  'of course': 'RB',
  'at least': 'RB',
  'no longer': 'RB',
  'sort of': 'RB',
  // 'at first': 'RB',
  'once again': 'RB',
  'once more': 'RB',
  'up to': 'RB',
  'by now': 'RB',
  'all but': 'RB',
  'just about': 'RB',
  'so called': 'JJ', //?
  'on board': 'JJ',
  'a lot': 'RB',
  'by far': 'RB',
  'at best': 'RB',
  'at large': 'RB',
  'for good': 'RB',
  'for example': 'RB',
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
  'in front': 'JJ',
  'in situ': 'JJ',
  'in vitro': 'JJ',
  'ad hoc': 'JJ',
  'de facto': 'JJ',
  'ad infinitum': 'JJ',
  'ad nauseam': 'RB',
  'all that': 'RB',
  'for keeps': 'JJ',
  'a priori': 'JJ',
  'et cetera': 'IN',
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
  'head start': 'NN',
  'make sure': 'VB',
  'keep tabs': 'VB',
  'credit card': 'NN',
  //timezones
  'standard time': 'DA',
  'daylight time': 'DA',
  'summer time': 'DA',
  'fl oz': 'NN',
  'us dollar': 'NN'
};

},{}],14:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../../fns');

//the unique/uncompressed names..
var arr = ['abby', 'amy', 'autumn', 'bobbi', 'brooke', 'carol', 'cheryl', 'claire', 'cleo', 'consuelo',
// 'dawn',
'eleanor', 'eliza', 'erika', 'faye', 'fern', 'genevieve', 'gertrude', 'gladys', 'inez', 'ingrid', 'jenny', 'jo', 'joni', 'kathryn', 'kelli', 'kim', 'latoya', 'leigh', 'lupe', 'luz', 'lynn', 'mae', 'maude', 'mildred', 'miriam', 'naomi', 'nikki', 'olga', 'reba', 'robyn', 'rosalind', 'ruth', 'sheryl', 'socorro', 'sonja', 'staci', 'tanya', 'therese', 'toni', 'traci', 'vicki', 'vicky'];

//compressed by frequent suffixes
var suffix_compressed = {
  nette: 'an,antoi,ja,jea,jean,ly',
  eline: 'ad,ang,jacqu,mad',
  rlene: 'a,cha,da,ma',
  stine: 'chri,erne,ju,kri',
  tasha: 'la,na,',
  andra: 'alex,cass,s',
  helle: 'mic,rac,roc',
  linda: 'be,,me',
  stina: 'chri,cri,kri',
  annie: ',f,je',
  anne: ',di,je,jo,le,mari,rox,sus,suz',
  elia: 'am,ang,cec,c,corn,d,of,sh',
  llie: 'ca,ke,li,mi,mo,ne,o,sa',
  anna: ',de,di,jo,joh,sh',
  ette: 'bernad,b,bridg,claud,paul,yv',
  ella: 'd,,est,lu,marc,st',
  nnie: 'bo,co,je,mi,wi',
  elle: 'dani,est,gabri,isab,jan',
  icia: 'al,fel,let,patr,tr',
  leen: 'ai,cath,col,ei,kath',
  elma: ',s,th,v',
  etta: ',henri,lor,ros',
  anie: 'j,mel,stef,steph',
  anda: 'am,mir,w,yol',
  arla: 'c,d,k,m',
  lena: 'e,he,,magda',
  rina: 'kat,ma,sab,t',
  isha: 'al,ke,lat,tr',
  olly: 'd,m,p',
  rice: 'beat,cla,pat',
  ttie: 'be,ma,ne',
  acie: 'gr,st,tr',
  isty: 'chr,kr,m',
  dith: 'e,ju,mere',
  onya: 'lat,s,t',
  onia: 'ant,s,t',
  erri: 'k,sh,t',
  lisa: 'a,e,',
  rine: 'cathe,katha,kathe',
  nita: 'a,bo,jua',
  elyn: 'ev,jacqu,joc',
  nine: 'ja,jea,jean',
  nice: 'ber,eu,ja',
  tney: 'brit,cour,whi',
  ssie: 'be,ca,e',
  beth: ',elisa,eliza',
  ine: 'carol,ela,franc,gerald,jasm,joseph,lorra,max,nad,paul',
  ana: 'adri,,d,de,di,j,ju,l,sh,sus',
  rie: 'car,che,lau,lo,ma,marjo,rosema,sher,vale',
  ina: 'angel,carol,d,georg,g,josef,mart,n,t',
  ora: 'c,deb,d,fl,len,l,n,',
  ara: 'barb,c,cl,k,l,s,tam,t',
  ela: 'ang,carm,gabri,graci,l,manu,pam',
  ica: 'angel,er,jess,mon,patr,veron',
  nda: 'bre,gle,luci,ly,rho,ro',
  ley: 'ash,kel,kimber,les,shel,shir',
  eri: 'ch,j,k,sh,t',
  ndy: 'ci,ma,mi,sa,we',
  ene: 'hel,imog,ir,jol,lor',
  ula: 'e,l,pa,urs',
  ann: ',jo,le,mary',
  ola: 'le,l,,vi',
  nna: 'do,gle,je,lado',
  nne: 'adrie,cori,ly,yvo',
  lie: 'ju,les,nata,rosa',
  ise: 'den,el,elo,lou',
  die: 'ad,gol,jo,sa',
  ena: 'd,lor,r,she',
  ian: 'jill,lill,mar,viv',
  lyn: 'caro,gwendo,jac,mari',
  ssa: 'aly,mari,meli,vane',
  thy: 'ca,doro,dor,ka',
  tha: 'ber,mar,saman,tabi',
  sie: 'el,jo,ro,su',
  bel: 'isa,ma,mari',
  via: 'oli,sil,syl',
  tie: 'chris,ka,kris',
  dra: 'au,ken,son',
  ria: 'glo,ma,victo',
  gie: 'an,mag,mar',
  lly: 'ke,sa,she',
  ila: 'le,l,she',
  rna: 'lo,my,ve',
  ole: 'car,nich,nic',
  rma: 'e,i,no',
  any: 'beth,britt,tiff',
  ona: 'le,m,ram',
  rta: 'albe,ma,robe',
  en: 'carm,dore,ell,gretch,gw,hel,kar,kirst,krist,laur,maure',
  ia: 'cecil,claud,cynth,eugen,georg,jul,luc,lyd,marc,soph,virgin',
  le: 'ade,camil,ceci,ga,gay,luci,lucil,mab,miche,myrt',
  ie: 'bobb,debb,dix,eff,jack,lizz,mam,soph,tamm,vick',
  ra: 'barb,deb,elvi,lau,may,my,pet,ve',
  er: 'amb,est,esth,heath,jenif,jennif,summ',
  da: 'a,ai,fre,frie,hil,i,matil',
  ce: 'ali,canda,candi,constan,floren,gra,joy',
  ah: 'beul,debor,hann,le,rebek,sar',
  sa: 'el,lui,mari,ro,tere,there',
  ne: 'daph,dia,ja,jay,laver,simo',
  el: 'eth,laur,muri,racha,rach,raqu',
  is: 'delor,dor,jan,lo,mav,phyll',
  et: 'bridg,harri,jan,margar,margr',
  ta: 'al,chris,kris,margari,ri',
  es: 'agn,delor,dolor,franc,merced',
  an: 'jo,meag,meg,megh,sus',
  cy: 'lu,mar,nan,sta,tra',
  in: 'caitl,er,kar,krist',
  ey: 'audr,linds,stac,trac',
  ca: 'bian,blan,francis,rebec',
  on: 'alis,allis,shann,shar',
  il: 'abiga,apr,ga,syb',
  ly: 'bever,emi,kimber,li',
  ea: 'andr,chels,doroth,l',
  ee: 'aim,d,desir,ren',
  ma: 'al,em,wil',
  di: 'bran,hei,jo',
  va: 'el,e,i',
  ue: 'dominiq,moniq,s',
  ay: 'f,k,linds',
  te: 'celes,ka,margueri',
  ry: 'ma,rosema,sher',
  na: 'ed,shau,shaw',
  dy: 'jo,ju,tru',
  ti: 'chris,kris,pat',
  sy: 'bet,dai,pat',
  ri: 'ka,lo,sha',
  la: 'kay,priscil,wil',
  al: 'cryst,kryst,op',
  ll: 'jewe,ji,ne'
};
arr = fns.expand_suffixes(arr, suffix_compressed);

var prefix_compressed = {
  mar: 'go,isol,itza,sha',
  tam: 'i,ika,my',
  be: 'atriz,cky,tty,ttye',
  pe: 'arl,ggy,nny',
  pa: 'ige,m,tty'
};
arr = fns.expand_prefixes(arr, prefix_compressed);

module.exports = arr;

},{"../../fns":23}],15:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../../fns');

//the unique/uncompressed names..
var arr = ['adolfo', 'angelo', 'anthony', 'armand', 'arthur', 'bill', 'billy', 'bobby', 'bradford', 'bret', 'caleb', 'carroll', 'cliff', 'clifford', 'craig', 'curt', 'derek', 'doug', 'dwight', 'edmund', 'eli', 'elliot', 'enrique', 'erik', 'felipe', 'felix', 'francisco', 'frank', 'george', 'glenn', 'greg', 'gregg', 'hans', 'hugh', 'ira', 'irving', 'isaac', 'jim', 'kermit', 'kurt', 'leo', 'levi', 'lorenzo', 'lou', 'pablo', 'pat', 'percy', 'philip', 'phillip', 'rex', 'ricky', 'shaun', 'shawn', 'sterling', 'steve', 'tim', 'timothy', 'wilbur', 'williams', 'wm', 'woodrow'];

//compressed by frequent suffixes
var suffix_compressed = {
  rence: 'cla,lau,law,te,ter',
  lbert: 'a,de,e,gi,wi',
  ustin: 'ag,a,d,j',
  berto: 'al,gil,hum,ro',
  ester: 'ch,l,sylv',
  onnie: 'd,l,r',
  wayne: 'de,d,',
  erick: ',fred,rod',
  athan: 'john,jon,n',
  elvin: ',k,m',
  anuel: 'em,emm,m',
  bert: ',her,hu,nor,ro',
  rick: 'der,fred,kend,pat,',
  land: 'cleve,gar,le,ro',
  ando: 'arm,fern,orl,rol',
  ardo: 'edu,ger,leon,ric',
  lton: 'a,car,e,mi',
  arry: 'b,g,h,l',
  nton: 'a,cli,qui',
  fred: 'al,,wil',
  ance: 'l,terr,v',
  mmie: 'ji,sa,to',
  erry: 'j,p,t',
  mond: 'des,ed,ray',
  rman: 'he,no,she',
  rvin: 'e,i,ma',
  nald: 'do,regi,ro',
  rett: 'b,eve,gar',
  son: 'harri,jack,ja,ma,nel,ty,wil',
  ell: 'darn,darr,low,mitch,russ,terr,wend',
  ard: 'bern,edw,ger,how,leon,rich,will',
  ian: 'adr,br,christ,dam,fab,,jul',
  don: 'bran,,el,gor,shel',
  ron: 'aa,by,came,my,',
  ton: 'bur,clay,clif,pres,wins',
  lan: 'a,al,dy,har,no',
  rey: 'ca,co,geoff,jeff',
  ent: 'br,k,tr,vinc',
  ael: 'ism,mich,raf,raph',
  mmy: 'ji,sa,ti,to',
  mon: 'da,ra,si,solo',
  las: 'dal,doug,nicho,nico',
  vin: 'al,cal,de,ke',
  nny: 'be,da,joh,ke',
  ius: 'cornel,dar,demetr,jul',
  ley: 'brad,har,stan,wes',
  lio: 'emi,ju,roge',
  ben: ',reu,ru',
  ory: 'c,greg,r',
  lie: 'bil,char,wil',
  van: 'e,i,',
  roy: 'le,,t',
  all: 'kend,marsh,rand',
  ary: 'c,g,zach',
  ddy: 'bu,fre,te',
  art: 'b,stew,stu',
  iel: 'dan,gabr,nathan',
  lin: 'co,frank,mar',
  yle: 'do,k,l',
  her: 'christop,kristop,lut',
  oyd: 'b,fl,ll',
  ren: 'dar,lo,war',
  ter: 'dex,pe,wal',
  arl: 'c,e,k',
  ane: 'd,du,sh',
  aul: 'p,r,s',
  dan: 'bren,,jor',
  nie: 'ben,er,john',
  ine: 'anto,bla,jerma',
  lph: 'ra,rando,rudo',
  est: 'earn,ern,forr',
  win: 'dar,ed,er',
  is: 'chr,curt,den,denn,ell,franc,lew,lou,lu,morr,ot,trav,will',
  er: 'alexand,elm,grov,hom,jasp,javi,oliv,rodg,rog,spenc,tyl,xavi',
  an: 'bry,de,esteb,eth,ju,log,rom,ry,se,st,steph',
  el: 'ab,darr,fid,jo,lion,marc,mich,migu,no,russ,samu',
  in: 'benjam,bra,dar,darr,efra,joaqu,mart,quent',
  ie: 'arch,edd,frank,fredd,lou,regg,robb',
  en: 'all,dami,gl,k,ow,steph,stev',
  ey: 'dew,harv,jo,mick,rick,rodn,sidn',
  al: ',h,jam,miche,ne,rand',
  on: 'bry,j,jonath,le,marl,vern',
  or: 'hect,juni,salvad,tayl,trev,vict',
  dy: 'an,bra,co,gra,ran,ru',
  ce: 'bru,bry,hora,mauri,roy,walla',
  il: 'cec,em,ne,ph,virg',
  ar: 'ces,edg,lam,om,osc',
  es: 'andr,charl,jam,mil,mos',
  ro: 'alejand,alva,artu,ped,rami',
  am: 'abrah,ad,grah,s,willi',
  ck: 'chu,domini,ja,ma,ni',
  io: 'anton,gregor,ignac,mar,serg',
  ah: 'elij,jeremi,mic,no',
  nt: 'brya,cli,gra,lamo',
  re: 'and,pier,salvato,theodo',
  ed: ',jar,n,t',
  ld: 'arno,gera,haro,jera',
  as: 'eli,luc,thom,tom',
  os: 'am,carl,marc,sant',
  ew: 'andr,dr,math,matth',
  ke: 'bla,ja,lu,mi',
  tt: 'ellio,emme,ma,sco',
  ty: 'mar,mon,rus,scot',
  th: 'hea,kei,kenne,se',
  ay: 'cl,j,murr,r',
  le: 'da,mer,orvil',
  te: 'mon,pe,vicen',
  us: 'jes,marc,ruf',
  od: 'elwo,jarr,r',
  ob: 'b,jac,r',
  to: 'beni,ernes,ot',
  ne: 'euge,ge,tyro',
  go: 'domin,hu,santia',
  de: 'clau,cly,wa',
  do: 'alfre,reynal,wilfre',
  rk: 'cla,ki,ma',
  se: 'cha,jes,jo',
  ry: 'hen,jeffe,jeff',
  ic: 'cedr,domin,er',
  ad: 'br,ch,conr'
};

arr = fns.expand_suffixes(arr, suffix_compressed);

var prefix_compressed = {
  jos: 'eph,h,hua',
  ro: 'cky,dolfo,osevelt,scoe,ss',
  je: 'ff,remy,rome,ss',
  to: 'by,dd,m,ny',
  da: 'rryl,ryl,ve,vid',
  jo: 'e,esph,hn,rge',
  ma: 'lcolm,rc,rco,x',
  al: 'ex,fonso,i,onzo',
  gu: 'illermo,stavo,y'
};
arr = fns.expand_prefixes(arr, prefix_compressed);

module.exports = arr;

},{"../../fns":23}],16:[function(_dereq_,module,exports){
'use strict';

var cardinal = {
  ones: {
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
    'grand': 1e3,
    'thousand': 1e3,
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
  ones: cardinal.ones,
  teens: cardinal.teens,
  tens: cardinal.tens,
  multiples: cardinal.multiples,

  ordinal_ones: ordinal.ones,
  ordinal_teens: ordinal.teens,
  ordinal_tens: ordinal.tens,
  ordinal_multiples: ordinal.multiples,

  prefixes: prefixes
};

},{}],17:[function(_dereq_,module,exports){
'use strict';
//just a few named-organizations
//no acronyms needed. no product/brand pollution.

var organizations = ['google', 'microsoft', 'walmart', 'exxonmobil', 'glencore', 'samsung', 'chevron', 'at&t', 'verizon', 'costco', 'nestlé', '7-eleven', 'adidas', 'nike', 'acer', 'mcdonalds', 'mcdonald\'s', 'comcast', 'compaq', 'craigslist', 'cisco', 'disney', 'coca cola', 'dupont', 'ebay', 'facebook', 'fedex', 'kmart', 'kkk', 'kodak', 'monsanto', 'myspace', 'netflix', 'sony', 'telus', 'twitter', 'usps', 'ubs', 'ups', 'walgreens', 'youtube', 'yahoo!', 'yamaha'];

var suffixes = ['center', 'centre', 'memorial', 'school', 'government', 'faculty', 'society', 'union', 'ministry', 'collective', 'association', 'committee', 'university', 'bank', 'college', 'foundation', 'department', 'institute', 'club', 'co', 'sons'];

module.exports = {
  suffixes: suffixes,
  organizations: organizations
};

},{}],18:[function(_dereq_,module,exports){
//phrasal verbs are two words that really mean one verb.
//'beef up' is one verb, and not some direction of beefing.
//by @spencermountain, 2015 mit
//many credits to http://www.allmyphrasalverbs.com/
'use strict';

var verb_conjugate = _dereq_('../term/verb/conjugate/conjugate.js');

//start the list with some randoms
var main = ['be onto', 'fall behind', 'fall through', 'fool with', 'get across', 'get along', 'get at', 'give way', 'hear from', 'hear of', 'lash into', 'make do', 'run across', 'set upon', 'take aback', 'keep from'];

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
    main.push(s + ' ' + k);
    //add its opposite form
    main.push(s + ' ' + opposites[k]);
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
  'up': 'act,beef,board,bone,boot,brighten,build,buy,catch,cheer,cook,end,eye,face,fatten,feel,fess,finish,fire,firm,flame,flare,free,freeze,freshen,fry,fuel,gang,gear,goof,hack,ham,heat,hit,hole,hush,jazz,juice,lap,light,lighten,line,link,listen,live,loosen,make,mash,measure,mess,mix,mock,mop,muddle,open,own,pair,patch,pick,prop,psych,read,rough,rustle,save,shack,sign,size,slice,slip,snap,sober,spark,split,spruce,stack,start,stay,stir,stitch,straighten,string,suck,suit,sum,team,tee,think,tidy,tighten,toss,trade,trip,type,vacuum,wait,wake,warm,weigh,whip,wire,wise,word,write,zip'
};
Object.keys(asymmetric).forEach(function (k) {
  asymmetric[k].split(',').forEach(function (s) {
    main.push(s + ' ' + k);
  });
});

//at his point all verbs are infinitive. lets make this explicit.
main = main.reduce(function (h, s) {
  h[s] = 'VBP';
  return h;
}, {});

//conjugate every phrasal verb. takes ~30ms
var tags = {
  present: 'VB',
  past: 'VBD',
  future: 'VBF',
  gerund: 'VBG',
  infinitive: 'VBP'
};
var cache = {}; //cache individual verbs to speed it up
var split = void 0,
    verb = void 0,
    particle = void 0,
    phrasal = void 0;
Object.keys(main).forEach(function (s) {
  split = s.split(' ');
  verb = split[0];
  particle = split[1];
  if (cache[verb] === undefined) {
    cache[verb] = verb_conjugate(verb);
  }
  Object.keys(cache[verb]).forEach(function (k) {
    phrasal = cache[verb][k] + ' ' + particle;
    if (tags[k]) {
      main[phrasal] = tags[k];
    }
  });
});

// console.log(main);
// console.log(main['mess about']);
module.exports = main;

},{"../term/verb/conjugate/conjugate.js":102}],19:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');

//uncompressed country names
var countries = ['usa', 'u.s.a.', 'ussr', 'brazil', 'bangladesh', 'mexico', 'vietnam', 'egypt', 'germany', 'turkey', 'france', 'united kingdom', 'italy', 'kenya', 'iraq', 'morocco', 'peru', 'yemen', 'mozambique', 'sri lanka', 'burkina faso', 'niger', 'netherlands', 'chile', 'malawi', 'ecuador', 'côte d\'ivoire', 'mali', 'zimbabwe', 'chad', 'belgium', 'cuba', 'greece', 'haiti', 'burundi', 'hungary', 'sweden', 'honduras', 'israel', 'laos', 'el salvador', 'libya', 'nicaragua', 'denmark', 'congo-brazzaville', 'kuwait', 'moldova', 'panama', 'jamaica', 'lesotho', 'guinea-bissau', 'timor-leste', 'djibouti', 'fiji', 'comoros', 'solomon islands', 'luxembourg', 'suriname', 'cape verde', 'malta', 'bahamas'];
var compressed_countries = {
  istan: 'pak,uzbek,afghan,tajik,turkmen',
  ublic: 'czech rep,dominican rep,central african rep',
  uinea: 'g,papua new g,equatorial g',
  land: 'thai,po,switzer,fin,republic of ire,new zea,swazi,ice',
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
  ia: 'ind,ethiop,cambod,boliv,slovak,georg,croat,latv',
  an: 'jap,ir,taiw,azerbaij,om',
  da: 'ugan,cana,rwan',
  us: 'belar,mauriti,cypr',
  al: 'nep,seneg,portug',
  in: 'spa,ben,bahra',
  go: 'dr con,to,trinidad-toba',
  la: 'venezue,ango,guatema',
  es: 'united stat,philippin,united arab emirat',
  on: 'camero,leban,gab',
  ar: 'myanm,madagasc,qat',
  ay: 'paragu,norw,urugu',
  ne: 'ukrai,sierra leo,palesti'
};
countries = fns.expand_suffixes(countries, compressed_countries);

/////uncomressed cities
var cities = ['guangzhou', 'ahmedabad', 'phoenix', 'jakarta', 'curitiba', 'moscow', 'tokyo', 'nagoya', 'kobe', 'mexico', 'cebu', 'ho chi minh', 'hanoi', 'giza', 'frankfurt', 'stuttgart', 'i̇zmir', 'paris', 'toulouse', 'nice', 'rome', 'palermo', 'genoa', 'cape town', 'port elizabeth', 'bogotá', 'medellín', 'seville', 'zaragoza', 'kiev', 'odessa', 'rosario', 'la plata', 'warsaw', 'kraków', 'łódź', 'wrocław', 'poznań', 'calgary', 'ottawa', 'montreal', 'winnipeg', 'sydney', 'perth', 'homs', 'iași', 'cluj-napoca', 'almaty', 'the hague', 'utrecht', 'phnom penh', 'antwerp', 'ghent', 'brussels', 'tunis', 'athens', 'thessaloniki', 'prague', 'brno', 'miskolc', 'stockholm', 'västerås', 'tegucigalpa', 'graz', 'innsbruck', 'abu dhabi', 'haifa', 'ashdod', 'dushanbe', 'niš', 'aqaba', 'aalborg', 'helsinki', 'espoo', 'vantaa', 'turku', 'košice', 'ashgabat', 'oslo', 'trondheim', 'auckland', 'tbilisi', 'zagreb', 'split', 'kuwait', 'montevideo', 'klaipėda', 'doha', 'skopje', 'riga', 'luxembourg', 'reykjavik', 'kingston'];

var suffix_compressed_cities = {
  burg: 'saint peters,yekaterin,ham,til,gothen,salz',
  ton: 'hous,edmon,welling,hamil',
  ion: 'hauts-bassins reg,nord reg,herakl',
  ana: 'hav,tir,ljublj',
  ara: 'guadalaj,ank,timișo',
  an: 'tehr,mil,durb,bus,tain,abidj,amm,yerev',
  ia: 'philadelph,brasíl,alexandr,pretor,valenc,sof,nicos',
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
  ur: 'kuala lump,winterth,kópavog',
  ch: 'muni,züri,christchur',
  na: 'barcelo,vien,var',
  ma: 'yokoha,li,pana',
  ul: 'istanb,seo,kab',
  to: 'toron,qui,por',
  iv: 'khark,lv,tel av',
  sk: 'dnipropetrov,gdań,min'
};

cities = fns.expand_suffixes(cities, suffix_compressed_cities);

var prefix_compressed_cities = {
  'new ': 'delhi,york,taipei',
  san: 'a\'a,tiago, josé',
  ta: 'ipei,mpere,llinn,rtu',
  ba: 'ngalore,ngkok,ku,sel',
  li: 'verpool,ège,nz,massol',
  ma: 'rseille,ndalay,drid,lmö',
  be: 'rn,lgrade,irut',
  ka: 'rachi,raj,ndy',
  da: 'egu,kar,ugavpils',
  ch: 'icago,arleroi,ișinău',
  co: 'lombo,nstanța,rk',
  bu: 'rsa,charest,dapest'
};
cities = fns.expand_prefixes(cities, prefix_compressed_cities);

//some of the busiest airports in the world from
//https://www.world-airport-codes.com/world-top-30-airports.html
var airports = ['atl', 'pek', 'lhr', 'hnd', 'ord', 'lax', 'cdg', 'dfw', 'cgk', 'dxb', 'fra', 'hkg', 'den', 'bkk', 'ams', 'jfk', 'ist', 'sfo', 'clt', 'las', 'phx', 'iax', 'kul', 'mia', 'icn', 'muc', 'syd', 'fco', 'mco', 'bcn', 'yyz', 'lgw', 'phl'];

module.exports = {
  countries: countries,
  cities: cities,
  airports: airports
};
// console.log(cities[99]);
// console.log(countries[99]);

},{"../fns":23}],20:[function(_dereq_,module,exports){
'use strict';

//professions 'lawyer' that aren't covered by verb.to_actor()

module.exports = ['accountant', 'advisor', 'farmer', 'mechanic', 'technician', 'architect', 'clerk', 'therapist', 'bricklayer', 'butcher', 'carpenter', 'nurse', 'engineer', 'supervisor', 'attendant', 'operator', 'dietician', 'housekeeper', 'advisor', 'agent', 'firefighter', 'fireman', 'policeman', 'attendant', 'scientist', 'gardener', 'hairdresser', 'instructor', 'programmer', 'administrator', 'journalist', 'assistant', 'lawyer', 'officer', 'plumber', 'inspector', 'psychologist', 'receptionist', 'roofer', 'sailor', 'security guard', 'photographer', 'soldier', 'surgeon', 'researcher', 'practitioner', 'politician', 'musician', 'artist', 'secretary', 'minister', 'deputy', 'president'];

},{}],21:[function(_dereq_,module,exports){
'use strict';

//common nouns that have no plural form. These are suprisingly rare
//used in noun.inflect(), and added as nouns in lexicon
module.exports = ['aircraft', 'bass', 'bison', 'fowl', 'halibut', 'moose', 'salmon', 'spacecraft', 'tuna', 'trout', 'advice', 'information', 'knowledge', 'trouble', 'enjoyment', 'fun', 'recreation', 'relaxation', 'meat', 'rice', 'bread', 'cake', 'coffee', 'ice', 'water', 'oil', 'grass', 'hair', 'fruit', 'wildlife', 'equipment', 'machinery', 'furniture', 'mail', 'luggage', 'jewelry', 'clothing', 'money', 'mathematics', 'economics', 'physics', 'civics', 'ethics', 'gymnastics', 'mumps', 'measles', 'news', 'tennis', 'baggage', 'currency', 'soap', 'toothpaste', 'food', 'sugar', 'butter', 'flour', 'research', 'leather', 'wool', 'wood', 'coal', 'weather', 'homework', 'cotton', 'silk', 'patience', 'impatience', 'vinegar', 'art', 'beef', 'blood', 'cash', 'chaos', 'cheese', 'chewing', 'conduct', 'confusion', 'education', 'electricity', 'entertainment', 'fiction', 'forgiveness', 'gold', 'gossip', 'ground', 'happiness', 'history', 'honey', 'hospitality', 'importance', 'justice', 'laughter', 'leisure', 'lightning', 'literature', 'luck', 'melancholy', 'milk', 'mist', 'music', 'noise', 'oxygen', 'paper', 'peace', 'peanut', 'pepper', 'petrol', 'plastic', 'pork', 'power', 'pressure', 'rain', 'recognition', 'sadness', 'safety', 'salt', 'sand', 'scenery', 'shopping', 'silver', 'snow', 'softness', 'space', 'speed', 'steam', 'sunshine', 'tea', 'thunder', 'time', 'traffic', 'trousers', 'violence', 'warmth', 'wine', 'steel', 'soccer', 'hockey', 'golf', 'fish', 'gum', 'liquid', 'series', 'sheep', 'species', 'fahrenheit', 'celcius', 'kelvin', 'hertz', 'everyone', 'everybody'];

},{}],22:[function(_dereq_,module,exports){
//most-frequent non-irregular verbs, in infinitive form, to be conjugated for the lexicon
//this list is the seed, from which various forms are conjugated
'use strict';

var fns = _dereq_('../fns');

//suffix-index adjectives
//  {cial:'cru,spe'} -> 'crucial', 'special'
var compressed = {
  prove: 'im,,ap,disap',
  serve: ',de,ob,re',
  ress: 'exp,p,prog,st,add,d',
  lect: 'ref,se,neg,col,e',
  sist: 'in,con,per,re,as',
  tain: 'ob,con,main,s,re',
  mble: 'rese,gru,asse,stu',
  ture: 'frac,lec,tor,fea',
  port: 're,sup,ex,im',
  ate: 'rel,oper,indic,cre,h,activ,estim,particip,d,anticip,evalu',
  use: 'ca,,over,ref,acc,am,pa,ho',
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
  end: 't,dep,,ext,att',
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
  ce: 'redu,produ,divor,fa,noti,pla,for,repla',
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
var arr = ['hope', 'thank', 'work', 'stop', 'control', 'join', 'enjoy', 'fail', 'aid', 'ask', 'talk', 'add', 'walk', 'describe', 'study', 'seem', 'occur', 'claim', 'fix', 'help', 'design', 'include', 'need', 'keep', 'assume', 'accept', 'do', 'look', 'die', 'seek', 'attempt', 'bomb', 'cook', 'copy', 'claw', 'doubt', 'drift', 'envy', 'fold', 'flood', 'focus', 'lift', 'link', 'load', 'loan', 'melt', 'overlap', 'rub', 'repair', 'sail', 'sleep', 'trade', 'trap', 'travel', 'tune', 'undergo', 'undo', 'uplift', 'yawn', 'plan', 'reveal', 'owe', 'sneak', 'drop', 'name', 'head', 'spoil', 'echo', 'deny', 'yield', 'reason', 'defy', 'applaud', 'risk', 'step', 'deem', 'embody', 'adopt', 'convey', 'pop', 'grab', 'revel', 'stem', 'mark', 'drag', 'pour', 'reckon', 'assign', 'rank', 'destroy', 'float', 'appeal', 'grasp', 'shout', 'overcome', 'relax', 'excel', 'plug', 'proclaim', 'ruin', 'abandon', 'overwhelm', 'wipe', 'added', 'took', 'goes', 'avoid', 'come', 'set', 'pay', 'grow', 'inspect', 'instruct', 'know', 'take', 'let', 'sort', 'put', 'take', 'cut', 'become', 'reply', 'happen', 'watch', 'associate', 'send', 'archive', 'cancel', 'learn', 'transfer', 'minus', 'plus', 'multiply', 'divide'];

module.exports = fns.expand_suffixes(arr, compressed);

},{"../fns":23}],23:[function(_dereq_,module,exports){
'use strict';

exports.pluck = function (arr, str) {
  arr = arr || [];
  return arr.map(function (o) {
    return o[str];
  });
};

//make an array of strings easier to lookup
exports.toObj = function (arr) {
  return arr.reduce(function (h, a) {
    h[a] = true;
    return h;
  }, {});
};
//turn key->value into value->key
exports.reverseObj = function (obj) {
  return Object.keys(obj).reduce(function (h, k) {
    h[obj[k]] = k;
    return h;
  }, {});
};

//turn a nested array into one array
exports.flatten = function (arr) {
  var all = [];
  arr.forEach(function (a) {
    all = all.concat(a);
  });
  return all;
};

//string utilities
exports.endsWith = function (str, suffix) {
  //if suffix is regex
  if (suffix && suffix instanceof RegExp) {
    if (str.match(suffix)) {
      return true;
    }
  }
  //if suffix is a string
  if (str && suffix && str.indexOf(suffix, str.length - suffix.length) !== -1) {
    return true;
  }
  return false;
};
exports.startsWith = function (str, prefix) {
  if (str && str.length && str.substr(0, 1) === prefix) {
    return true;
  }
  return false;
};

exports.extend = function (a, b) {
  var keys = Object.keys(b);
  for (var i = 0; i < keys.length; i++) {
    a[keys[i]] = b[keys[i]];
  }
  return a;
};

exports.titlecase = function (str) {
  if (!str) {
    return '';
  }
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// typeof obj == "function" also works
// but not in older browsers. :-/
exports.isFunction = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
};

//uncompress data in the adhoc compressed form {'ly':'kind,quick'}
exports.expand_suffixes = function (list, obj) {
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
exports.expand_prefixes = function (list, obj) {
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

},{}],24:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var fns = _dereq_('./fns.js');

var models = {
  Term: _dereq_('./term/term.js'),
  Text: _dereq_('./text/text.js'),
  Sentence: _dereq_('./sentence/sentence.js'),
  Statement: _dereq_('./sentence/statement/statement.js'),
  Question: _dereq_('./sentence/question/question.js'),
  Verb: _dereq_('./term/verb/verb.js'),
  Adjective: _dereq_('./term/adjective/adjective.js'),
  Adverb: _dereq_('./term/adverb/adverb.js'),
  Noun: _dereq_('./term/noun/noun.js'),
  Value: _dereq_('./term/noun/value/value.js'),
  Person: _dereq_('./term/noun/person/person.js'),
  Place: _dereq_('./term/noun/place/place.js'),
  Date: _dereq_('./term/noun/date/date.js'),
  Organization: _dereq_('./term/noun/organization/organization.js')
};

function NLP() {

  this.plugin = function (obj) {
    obj = obj || {};
    // if obj is a function, pass it an instance of this nlp library
    if (fns.isFunction(obj)) {
      // run it in this current context
      obj = obj.call(this, this);
    }
    //apply each plugin to the correct prototypes
    Object.keys(obj).forEach(function (k) {
      Object.keys(obj[k]).forEach(function (method) {
        models[k].prototype[method] = obj[k][method];
      });
    });
  };
  this.lexicon = function (obj) {
    obj = obj || {};
    var lex = _dereq_('./lexicon.js');

    Object.keys(obj).forEach(function (k) {
      lex[k] = obj[k];
    });

    return lex;
  };

  this.term = function (s) {
    return new models.Term(s);
  };
  this.noun = function (s) {
    return new models.Noun(s);
  };
  this.verb = function (s) {
    return new models.Verb(s);
  };
  this.adjective = function (s) {
    return new models.Adjective(s);
  };
  this.adverb = function (s) {
    return new models.Adverb(s);
  };

  this.value = function (s) {
    return new models.Value(s);
  };
  this.person = function (s) {
    return new models.Person(s);
  };
  this.place = function (s) {
    return new models.Place(s);
  };
  this.date = function (s) {
    return new models.Date(s);
  };
  this.organization = function (s) {
    return new models.Organization(s);
  };

  this.text = function (s, options) {
    return new models.Text(s, options);
  };
  this.sentence = function (s, options) {
    return new models.Sentence(s, options);
  };
  this.statement = function (s) {
    return new models.Statement(s);
  };
  this.question = function (s) {
    return new models.Question(s);
  };
}

var nlp = new NLP();
//export to window or webworker
if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' || typeof DedicatedWorkerGlobalScope === 'function') {
  self.nlp_compromise = nlp;
}
//export to commonjs
if (typeof module !== 'undefined' && module.exports) {
  module.exports = nlp;
}
//export to amd
if (typeof define === 'function' && define.amd) {
  define(nlp);
}

// console.log(nlp.verb('played').conjugate());

},{"./fns.js":23,"./lexicon.js":25,"./sentence/question/question.js":57,"./sentence/sentence.js":60,"./sentence/statement/statement.js":63,"./term/adjective/adjective.js":64,"./term/adverb/adverb.js":69,"./term/noun/date/date.js":74,"./term/noun/noun.js":80,"./term/noun/organization/organization.js":82,"./term/noun/person/person.js":86,"./term/noun/place/place.js":88,"./term/noun/value/value.js":100,"./term/term.js":101,"./term/verb/verb.js":111,"./text/text.js":114}],25:[function(_dereq_,module,exports){
//the lexicon is a big hash of words to pos tags
//it's built by conjugating and inflecting a small seed of terms
'use strict';

var fns = _dereq_('./fns.js');
var verb_conjugate = _dereq_('./term/verb/conjugate/conjugate.js');
var verb_to_adjective = _dereq_('./term/verb/to_adjective.js');
var to_comparative = _dereq_('./term/adjective/to_comparative.js');
var to_superlative = _dereq_('./term/adjective/to_superlative.js');
var to_adverb = _dereq_('./term/adjective/to_adverb.js');
var grand_mapping = _dereq_('./sentence/pos/parts_of_speech.js').tag_mapping;

var lexicon = {};

var addObj = function addObj(obj) {
  var keys = Object.keys(obj);
  var l = keys.length;
  for (var i = 0; i < l; i++) {
    lexicon[keys[i]] = obj[keys[i]];
  }
};

var addArr = function addArr(arr, tag) {
  var l = arr.length;
  for (var i = 0; i < l; i++) {
    lexicon[arr[i]] = tag;
  }
};

//conjugate all verbs.
var verbMap = {
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
  PresentTense: 'PresentTense'
};

var irregulars = _dereq_('./data/irregular_verbs.js');
var verbs = _dereq_('./data/verbs.js').concat(Object.keys(irregulars));

var _loop = function _loop(i) {
  var o = verb_conjugate(verbs[i]);
  Object.keys(o).forEach(function (k) {
    if (k && o[k] && verbMap[k]) {
      lexicon[o[k]] = verbMap[k];
    }
  });
  //also add their adjective form - "walkable"
  lexicon[verb_to_adjective(verbs[i])] = 'Adjective';
};

for (var i = 0; i < verbs.length; i++) {
  _loop(i);
}

var orgs = _dereq_('./data/organizations.js');
addArr(orgs.organizations, 'Organization');
addArr(orgs.suffixes, 'Noun');

var places = _dereq_('./data/places.js');
addArr(places.countries, 'Country');
addArr(places.cities, 'City');

_dereq_('./data/adjectives.js').forEach(function (s) {
  lexicon[s] = 'Adjective';
  lexicon[to_comparative(s)] = 'Comparative';
  lexicon[to_superlative(s)] = 'Superlative';
  lexicon[to_adverb(s)] = 'Adverb';
});
Object.keys(_dereq_('./data/convertables.js')).forEach(function (s) {
  lexicon[s] = 'Adjective';
  lexicon[to_comparative(s)] = 'Comparative';
  lexicon[to_superlative(s)] = 'Superlative';
  lexicon[to_adverb(s)] = 'Adverb';
});

addArr(_dereq_('./data/abbreviations.js').abbreviations, 'Abbreviation');
addArr(_dereq_('./data/demonyms.js'), 'Demonym');
addArr(_dereq_('./data/currencies.js'), 'Currency');
addArr(_dereq_('./data/honourifics.js'), 'Honourific');
addArr(_dereq_('./data/uncountables.js'), 'Noun');
var dates = _dereq_('./data/dates.js');
addArr(dates.days, 'Date');
addArr(dates.months, 'Date');
addArr(dates.durations, 'Date');
addArr(dates.relative, 'Date');

//unpack the numbers
var nums = _dereq_('./data/numbers.js');
var all_nums = Object.keys(nums).reduce(function (arr, k) {
  arr = arr.concat(Object.keys(nums[k]));
  return arr;
}, []);
addArr(all_nums, 'Value');

//a little fancy
var firstNames = _dereq_('./data/firstnames.js');
//add all names
addArr(Object.keys(firstNames.all), 'Person');
//overwrite to MalePerson, FemalePerson
addArr(firstNames.male, 'MalePerson');
addArr(firstNames.female, 'FemalePerson');
//add irregular nouns
var irregNouns = _dereq_('./data/irregular_nouns.js');
addArr(fns.pluck(irregNouns, 0), 'Noun');
addArr(fns.pluck(irregNouns, 1), 'Plural');

addObj(_dereq_('./data/misc.js'));
addObj(_dereq_('./data/multiples.js'));
addObj(_dereq_('./data/phrasal_verbs.js'));
//add named holidays, like 'easter'
Object.keys(_dereq_('./data/holidays.js')).forEach(function (k) {
  lexicon[k] = 'Date';
});

//professions
addArr(_dereq_('./data/professions.js'), 'Actor');

//just in case
delete lexicon[false];
delete lexicon[true];
delete lexicon[undefined];
delete lexicon[null];
delete lexicon[''];

//use 'Noun', not 'NN'
Object.keys(lexicon).forEach(function (k) {
  lexicon[k] = grand_mapping[lexicon[k]] || lexicon[k];
});

module.exports = lexicon;
// console.log(lexicon['doing']);

},{"./data/abbreviations.js":1,"./data/adjectives.js":2,"./data/convertables.js":3,"./data/currencies.js":4,"./data/dates.js":5,"./data/demonyms.js":6,"./data/firstnames.js":7,"./data/holidays.js":8,"./data/honourifics.js":9,"./data/irregular_nouns.js":10,"./data/irregular_verbs.js":11,"./data/misc.js":12,"./data/multiples.js":13,"./data/numbers.js":16,"./data/organizations.js":17,"./data/phrasal_verbs.js":18,"./data/places.js":19,"./data/professions.js":20,"./data/uncountables.js":21,"./data/verbs.js":22,"./fns.js":23,"./sentence/pos/parts_of_speech.js":38,"./term/adjective/to_adverb.js":65,"./term/adjective/to_comparative.js":66,"./term/adjective/to_superlative.js":68,"./term/verb/conjugate/conjugate.js":102,"./term/verb/to_adjective.js":110}],26:[function(_dereq_,module,exports){
'use strict';
// a regex-like lookup for a list of terms.
// returns matches in a 'Terms' class

var Result = _dereq_('./result');
var syntax_parse = _dereq_('./syntax_parse');
var match_term = _dereq_('./match_term');

// take a slice of our terms, and try a match starting here
var tryFromHere = function tryFromHere(terms, regs, options) {
  var result = [];
  var which_term = 0;
  for (var i = 0; i < regs.length; i++) {
    var term = terms[which_term];
    //if we hit the end of terms, prematurely
    if (!term) {
      return null;
    }
    //find a match with term, (..), [..], or ~..~ syntax
    if (match_term(term, regs[i], options)) {
      //handle '$' logic
      if (regs[i].signals.trailing && terms[which_term + 1]) {
        return null;
      }
      //handle '^' logic
      if (regs[i].signals.leading && which_term !== 0) {
        return null;
      }
      result.push(terms[which_term]);
      which_term += 1;
      continue;
    }
    //if it's a contraction, go to next term
    if (term.normal === '') {
      result.push(terms[which_term]);
      which_term += 1;
      term = terms[which_term];
    }
    //support wildcards, some matching logic
    // '.' means easy-pass
    if (regs[i].signals.any_one) {
      result.push(terms[which_term]);
      which_term += 1;
      continue;
    }
    //else, if term was optional, continue anyways
    if (regs[i].signals.optional) {
      continue; //(this increments i, but not which_term)
    }
    //attempt is dead.
    return null;
  }
  //success, return terms subset
  return result;
};

//find first match and return []Terms
var findAll = function findAll(terms, regs, options) {
  var result = [];
  regs = syntax_parse(regs || '');
  // one-off lookup for ^
  // '^' token is 'must start at 0'
  if (regs[0].signals.leading) {
    var match = tryFromHere(terms, regs, options) || [];
    if (match) {
      return [new Result(match)];
    } else {
      return null;
    }
  }

  //repeating version starting from each term
  var len = terms.length; // - regs.length + 1;
  for (var i = 0; i < len; i++) {
    var termSlice = terms.slice(i, terms.length);
    var _match = tryFromHere(termSlice, regs, options);
    if (_match) {
      result.push(new Result(_match));
    }
  }
  //if we have no results, return null
  if (result.length === 0) {
    return null;
  }
  return result;
};

//calls Terms.replace() on each found result
var replaceAll = function replaceAll(terms, regs, replacement, options) {
  var list = findAll(terms, regs, options);
  if (list) {
    list.forEach(function (t) {
      t.replace(replacement, options);
    });
  }
};

module.exports = {
  findAll: findAll,
  replaceAll: replaceAll
};

},{"./match_term":27,"./result":28,"./syntax_parse":29}],27:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns.js');

//a regex-like string search
// returns a boolean for match/not
var match_term = function match_term(term, reg) {
  //fail-fast
  if (!term || !reg || !reg.signals) {
    return false;
  }
  var signals = reg.signals;

  //support optional (foo|bar) syntax
  if (signals.one_of) {
    var arr = reg.term.split('|');
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === term.normal || arr[i] === term.text) {
        return true;
      }
    }
    return false;
  }
  //support [Pos] syntax
  if (signals.pos) {
    var pos = fns.titlecase(reg.term);
    if (term.pos[pos]) {
      return true;
    }
    return false;
  }
  //support ~alias~ syntax
  if (signals.alias) {
    if (reg.term === term.root()) {
      return true;
    }
    return false;
  }
  //straight-up text match
  if (reg.term === term.normal || reg.term === term.text || reg.term === term.expansion) {
    return true;
  }

  return false;
};

module.exports = match_term;

},{"../fns.js":23}],28:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _match = _dereq_('./match.js');

// a slice of term objects returned from .match()
// ideally changes that happen here happen in the original object

var Result = function () {
  function Result(terms) {
    _classCallCheck(this, Result);

    this.terms = terms;
  }
  //wha, this is possible eg. text.match().match()


  _createClass(Result, [{
    key: 'match',
    value: function match(str, options) {
      return _match(this.terms, str, options);
    }
    //a 1-1 replacement of strings

  }, {
    key: 'replace',
    value: function replace(words) {
      for (var i = 0; i < this.terms.length; i++) {
        //umm, this is like a capture-group in regexp..
        //so just leave it
        if (words[i] === '$') {
          continue;
        }
        //allow replacements with the capture group, like 'cyber-$1'
        if (words[i].match(/\$1/)) {
          var combined = words[1].replace(/\$1/, this.terms[i].text);
          this.terms[i].changeTo(combined);
          continue;
        }
        this.terms[i].changeTo(words[i] || '');
      }
      return this;
    }
  }, {
    key: 'text',
    value: function text() {
      return this.terms.reduce(function (s, t) {
        //implicit contractions shouldn't be included
        if (t.text) {
          s += ' ' + t.text;
        }
        return s;
      }, '').trim();
    }
  }, {
    key: 'normal',
    value: function normal() {
      return this.terms.reduce(function (s, t) {
        //implicit contractions shouldn't be included
        if (t.normal) {
          s += ' ' + t.normal;
        }
        return s;
      }, '').trim();
    }
  }]);

  return Result;
}();
//a slice of term objects


module.exports = Result;

},{"./match.js":26}],29:[function(_dereq_,module,exports){
'use strict';
// parse a search lookup term find the regex-like syntax in this term

var fns = _dereq_('../fns.js');
// flags:
// {
//   pos: true,
//   optional: true,
//   one_of: true,
//   alias: true,
//   leading: true,
//   trailing: true,
//   any_one: true,
//   any_many: true,
// }

var parse_term = function parse_term(term, i) {
  term = term || '';
  term = term.trim();
  var signals = {};
  //order matters!

  //leading ^ flag
  if (fns.startsWith(term, '^')) {
    term = term.substr(1, term.length);
    signals.leading = true;
  }
  //trailing $ flag means ending
  if (fns.endsWith(term, '$')) {
    term = term.replace(/\$$/, '');
    signals.trailing = true;
  }
  //optional flag
  if (fns.endsWith(term, '?')) {
    term = term.replace(/\?$/, '');
    signals.optional = true;
  }

  //pos flag
  if (fns.startsWith(term, '[') && fns.endsWith(term, ']')) {
    term = term.replace(/\]$/, '');
    term = term.replace(/^\[/, '');
    signals.pos = true;
  }
  //one_of options flag
  if (fns.startsWith(term, '(') && fns.endsWith(term, ')')) {
    term = term.replace(/\)$/, '');
    term = term.replace(/^\(/, '');
    signals.one_of = true;
  }
  //alias flag
  if (fns.startsWith(term, '~')) {
    term = term.replace(/^\~/, '');
    term = term.replace(/\~$/, '');
    signals.alias = true;
  }
  //addition flag
  if (fns.startsWith(term, '+')) {
    term = term.replace(/^\+/, '');
    term = term.replace(/\+$/, '');
    signals.extra = true;
  }

  //a period means anything
  if (term === '.') {
    signals.any_one = true;
  }
  //a * means anything
  if (term === '*') {
    signals.any_many = true;
  }
  return {
    term: term,
    signals: signals,
    i: i
  };
};
// console.log(parse_term('(one|1) (two|2)'));

//turn a match string into an array of objects
var parse_all = function parse_all(regs) {
  regs = regs || [];
  return regs.map(parse_term);
};
// console.log(parse_all(''));

module.exports = parse_all;

},{"../fns.js":23}],30:[function(_dereq_,module,exports){
'use strict';
//change a sentence to past, present, or future tense

var pos = _dereq_('./pos/parts_of_speech.js');

//conjugate a specific verb
var flip_verb = function flip_verb(t, tense) {
  if (tense === 'present') {
    t.to_present();
  } else if (tense === 'past') {
    t.to_past();
  } else if (tense === 'future') {
    t.to_future();
  }
  return t;
};

var change_tense = function change_tense(s, tense) {
  //convert all verbs
  for (var i = 0; i < s.terms.length; i++) {
    var t = s.terms[i];
    if (t instanceof pos.Verb) {
      //ignore gerunds too - "is walking"
      if (t.pos['Gerund']) {
        continue;
      }
      //ignore true infinitives, "go to sleep"
      if (t.pos['Infinitive']) {
        if (s.terms[i - 1] && s.terms[i - 1].normal === 'to') {
          continue;
        }
      }
      s.terms[i] = flip_verb(t, tense);
    }
  }
  return s;
};

// [
//   'john walks to the church',
//   'john walks and feeds the birds',
//   'john always walks',
//   'will you walk?',
// ];

module.exports = change_tense;

},{"./pos/parts_of_speech.js":38}],31:[function(_dereq_,module,exports){
'use strict';
//turns 'is not' into "isn't", and "he is" into "he's"

var contractor = {
  'will': 'll',
  'would': 'd',
  'have': 've',
  'are': 're',
  'not': 't',
  'is': 's'
  // 'was': 's' //this is too folksy
};

var contract = function contract(terms) {
  for (var i = 1; i < terms.length; i++) {
    if (contractor[terms[i].normal]) {
      //remember expansion
      terms[i - 1].expansion = terms[i - 1].text;
      terms[i].expansion = terms[i].text;
      //handle special `n't` case
      if (terms[i].normal === 'not') {
        terms[i - 1].text += 'n';
      }
      terms[i - 1].text += '\'' + contractor[terms[i].normal];
      terms[i - 1].rebuild();
      terms[i].text = '';
      terms[i].rebuild();
    }
  }
  return terms;
};

module.exports = contract;

},{}],32:[function(_dereq_,module,exports){
'use strict';

var expand = function expand(terms) {
  for (var i = 0; i < terms.length; i++) {
    if (terms[i].expansion) {
      terms[i].text = terms[i].expansion;
      terms[i].rebuild();
    }
  }
  return terms;
};

module.exports = expand;

},{}],33:[function(_dereq_,module,exports){
'use strict';

//boolean if sentence has

// "[copula] [pastTense] by"
// "[pastParticiple] by"

var passive_voice = function passive_voice(s) {
  var terms = s.terms;
  for (var i = 0; i < terms.length - 2; i++) {
    if (terms[i].pos['Copula'] && terms[i + 1].pos['Verb'] && terms[i + 2].normal === 'by') {
      //don't do 'june was approaching by then'
      if (terms[i + 1].pos['Gerund']) {
        continue;
      }
      return true;
    }
  }
  return false;
};

module.exports = passive_voice;

},{}],34:[function(_dereq_,module,exports){
'use strict';

var pos = _dereq_('./parts_of_speech');

//set the part-of-speech of a particular term
var assign = function assign(t, tag, reason) {
  //check if redundant, first
  if (t.pos[tag]) {
    return t;
  }
  var P = pos.classMapping[tag] || pos.Term;
  var expansion = t.expansion;
  var whitespace = t.whitespace;
  var reasoning = t.reasoning;
  t = new P(t.text, tag);
  t.reasoning = reasoning;
  t.reasoning.push(reason);
  t.whitespace = whitespace;
  t.expansion = expansion;
  return t;
};
module.exports = assign;

},{"./parts_of_speech":38}],35:[function(_dereq_,module,exports){
'use strict';

var pos = _dereq_('../parts_of_speech');
var fns = _dereq_('../../../fns');

//get the combined text
var new_string = function new_string(a, b) {
  var space = a.whitespace.trailing + b.whitespace.preceding;
  return a.text + space + b.text;
};

var combine_two = function combine_two(terms, i, tag, reason) {
  var a = terms[i];
  var b = terms[i + 1];
  //fail-fast
  if (!a || !b) {
    return terms;
  }
  //keep relevant/consistant old POS tags
  var old_pos = {};
  if (a.pos[tag]) {
    old_pos = a.pos;
  }
  if (b.pos[tag]) {
    old_pos = fns.extend(old_pos, b.pos);
  }
  //find the new Pos class
  var Pos = pos.classMapping[tag] || pos.Term;
  terms[i] = new Pos(new_string(a, b), tag);
  //copy-over reasoning
  terms[i].reasoning = [a.reasoning.join(', '), b.reasoning.join(', ')];
  terms[i].reasoning.push(reason);
  //copy-over old pos
  terms[i].pos = fns.extend(terms[i].pos, old_pos);
  //combine whitespace
  terms[i].whitespace.preceding = a.whitespace.preceding;
  terms[i].whitespace.trailing = b.whitespace.trailing;
  //kill 'b'
  terms[i + 1] = null;
  return terms;
};

var combine_three = function combine_three(terms, i, tag, reason) {
  var a = terms[i];
  var b = terms[i + 1];
  var c = terms[i + 2];
  //fail-fast
  if (!a || !b || !c) {
    return terms;
  }
  var Pos = pos.classMapping[tag] || pos.Term;
  var space1 = a.whitespace.trailing + b.whitespace.preceding;
  var space2 = b.whitespace.trailing + c.whitespace.preceding;
  var text = a.text + space1 + b.text + space2 + c.text;
  terms[i] = new Pos(text, tag);
  terms[i].reasoning = [a.reasoning.join(', '), b.reasoning.join(', ')];
  terms[i].reasoning.push(reason);
  //transfer unused-up whitespace
  terms[i].whitespace.preceding = a.whitespace.preceding;
  terms[i].whitespace.trailing = c.whitespace.trailing;
  terms[i + 1] = null;
  terms[i + 2] = null;
  return terms;
};

module.exports = {
  two: combine_two,
  three: combine_three
};

},{"../../../fns":23,"../parts_of_speech":38}],36:[function(_dereq_,module,exports){
'use strict';

var combine = _dereq_('./combine').three;

// const dont_lump = [
// {
//   condition: (a, b, c) => (),
//   reason: ''
// },
// ];

var do_lump = [{
  //John & Joe's
  condition: function condition(a, b, c) {
    return a.pos.Noun && (b.text === '&' || b.normal === 'n') && c.pos.Noun;
  },
  result: 'Person',
  reason: 'Noun-&-Noun'
}, {
  //June the 5th
  condition: function condition(a, b, c) {
    return a.pos.Date && b.normal === 'the' && c.pos.Value;
  },
  result: 'Date',
  reason: 'Date-the-Value'
}, {
  //5th of June
  condition: function condition(a, b, c) {
    return a.pos.Value && (b.pos.Conjunction || b.pos.Preposition) && c.pos.Date;
  },
  result: 'Date',
  reason: 'Value-Prep-Date'
}, {
  //June 5th to 7th
  condition: function condition(a, b, c) {
    return a.pos.Date && (b.pos.Conjunction || b.pos.Preposition) && c.pos.Value;
  },
  result: 'Date',
  reason: 'Date-Preposition-Value'
}, {
  //3hrs after 5pm
  condition: function condition(a, b, c) {
    return a.pos.Date && (c.pos.Date || c.pos.Ordinal) && (b.pos.Preposition || b.pos.Determiner || b.pos.Conjunction || b.pos.Adjective);
  },
  result: 'Date',
  reason: 'Date-Preposition-Date'
}, {
  //President of Mexico
  condition: function condition(a, b, c) {
    return a.is_capital() && b.normal === 'of' && c.is_capital();
  },
  result: 'Noun',
  reason: 'Capital-of-Capital'
}, {
  //three-word quote
  condition: function condition(a, b, c) {
    return a.text.match(/^["']/) && !b.text.match(/["']/) && c.text.match(/["']$/);
  },
  result: 'Noun',
  reason: 'Three-word-quote'
}, {
  //will have walk
  condition: function condition(a, b, c) {
    return a.normal === 'will' && b.normal === 'have' && c.pos.Verb;
  },
  result: 'FutureTense',
  reason: 'will-have-Verb'
}, {
  //two hundred and three
  condition: function condition(a, b, c) {
    return a.pos.Value && b.normal === 'and' && c.pos.Value;
  },
  result: 'Value',
  reason: 'Value-and-Value'
}];

var lump_three = function lump_three(terms) {
  //fail-fast
  if (terms.length < 3) {
    return terms;
  }
  for (var i = 0; i < terms.length - 2; i++) {
    var a = terms[i];
    var b = terms[i + 1];
    var c = terms[i + 2];
    if (!a || !b || !c) {
      continue;
    }
    for (var o = 0; o < do_lump.length; o++) {
      if (do_lump[o].condition(a, b, c)) {
        var new_tag = do_lump[o].result;
        var reason = do_lump[o].reason;
        terms = combine(terms, i, new_tag, reason);
        break;
      }
    }
  }
  //remove empties
  terms = terms.filter(function (t) {
    return t;
  });
  return terms;
};

module.exports = lump_three;

},{"./combine":35}],37:[function(_dereq_,module,exports){
'use strict';
//apply lumper+splitter words to terms to combine them

var combine = _dereq_('./combine').two;

//not just 'Noun', but something more deliberate
var is_specific = function is_specific(t) {
  var specific = ['Person', 'Place', 'Value', 'Date', 'Organization'];
  for (var i = 0; i < specific.length; i++) {
    if (t.pos[specific[i]]) {
      return true;
    }
  }
  return false;
};

//rules that combine two words
var do_lump = [{
  condition: function condition(a, b) {
    return a.pos.Person && b.pos.Honourific || a.pos.Honourific && b.pos.Person;
  }, //"John sr."
  result: 'Person',
  reason: 'person-words'
}, {
  //6 am
  condition: function condition(a, b) {
    return (a.pos.Value || a.pos.Date) && (b.normal === 'am' || b.normal === 'pm');
  },
  result: 'Date',
  reason: 'date-am/pm'
}, {
  //'Dr. John'
  condition: function condition(a, b) {
    return a.pos.Honourific && b.is_capital();
  },
  result: 'Person',
  reason: 'person-honourific'
}, {
  // "john lkjsdf's"
  condition: function condition(a, b) {
    return a.pos.Person && b.pos.Possessive;
  },
  result: 'Person',
  reason: 'person-possessive'
}, {
  //"John Abcd" - needs to be careful
  condition: function condition(a, b) {
    return a.pos.Person && !a.pos.Pronoun && !a.pos.Possessive && !a.has_comma() && b.is_capital() && !a.is_acronym() && !b.pos.Verb;
  }, //'Person, Capital -> Person'
  result: 'Person',
  reason: 'person-titleCase'
}, {
  //June 4
  condition: function condition(a, b) {
    return a.pos.Date && b.pos.Value;
  },
  result: 'Date',
  reason: 'date-value'
}, {
  //4 June
  condition: function condition(a, b) {
    return a.pos.Value && b.pos.Date;
  },
  result: 'Date',
  reason: 'value-date'
}, {
  //last wednesday
  condition: function condition(a, b) {
    return (a.normal === 'last' || a.normal === 'next' || a.normal === 'this') && b.pos.Date;
  },
  result: 'Date',
  reason: 'relative-date'
}, {
  //Aircraft designer
  condition: function condition(a, b) {
    return a.pos.Noun && b.pos.Actor;
  },
  result: 'Actor',
  reason: 'thing-doer'
}, {
  //Canada Inc
  condition: function condition(a, b) {
    return a.is_capital() && a.pos.Noun && b.pos['Organization'] || b.is_capital() && a.pos['Organization'];
  },
  result: 'Organization',
  reason: 'organization-org'
}, {
  //two-word quote
  condition: function condition(a, b) {
    return a.text.match(/^["']/) && b.text.match(/["']$/);
  },
  result: 'Quotation',
  reason: 'two-word-quote'
}, {
  //will walk (perfect)
  condition: function condition(a, b) {
    return a.normal === 'will' && b.pos.Verb;
  },
  result: 'PerfectTense',
  reason: 'will-verb'
}, {
  //will have walked (pluperfect)
  condition: function condition(a, b) {
    return a.normal.match(/^will ha(ve|d)$/) && b.pos.Verb;
  },
  result: 'PluperfectTense',
  reason: 'will-have-verb'
}, {
  //timezones
  condition: function condition(a, b) {
    return b.normal.match(/(standard|daylight|summer) time/) && (a.pos['Adjective'] || a.pos['Place']);
  },
  result: 'Date',
  reason: 'timezone'
}, {
  //canadian dollar, Brazilian pesos
  condition: function condition(a, b) {
    return a.pos.Demonym && b.pos.Currency;
  },
  result: 'Currency',
  reason: 'demonym-currency'
}, {
  //for verbs in Past/Present Continuous ('is raining')
  condition: function condition(a, b) {
    return a.pos.Copula && a.normal.match(/^(am|is|are|was|were)$/) && b.pos.Verb && b.normal.match(/ing$/);
  },
  result: 'Verb',
  reason: 'copula-gerund'
}, {
  //7 ft
  condition: function condition(a, b) {
    return a.pos.Value && b.pos.Abbreviation || a.pos.Abbreviation && b.pos.Value;
  },
  result: 'Value',
  reason: 'value-abbreviation'
}, {
  //NASA Flordia
  condition: function condition(a, b) {
    return a.pos.Noun && b.pos.Abbreviation || a.pos.Abbreviation && b.pos.Noun;
  },
  result: 'Noun',
  reason: 'noun-abbreviation'
}, {
  //both dates
  condition: function condition(a, b) {
    return a.pos.Date && b.pos.Date;
  },
  result: 'Date',
  reason: 'two-dates'
}, {
  //both values
  condition: function condition(a, b) {
    return a.pos.Value && b.pos.Value;
  },
  result: 'Value',
  reason: 'two-values'
}, {
  //both places
  condition: function condition(a, b) {
    return a.pos.Place && b.pos.Place;
  },
  result: 'Place',
  reason: 'two-places'
}, {
  //'have not'
  condition: function condition(a, b) {
    return (a.pos.Infinitive || a.pos.Copula || a.pos.PresentTense) && b.normal === 'not';
  },
  result: 'Verb',
  reason: 'verb-not'
}, {
  //both places (this is the most aggressive rule of them all)
  condition: function condition(a, b) {
    return a.pos.Noun && b.pos.Noun && !is_specific(a) && !is_specific(b);
  },
  result: 'Noun',
  reason: 'two-nouns'
}];

//exceptions or guards to the above rules, more or less
var dont_lump = [{ //don't chunk non-word things with word-things
  condition: function condition(a, b) {
    return a.is_word() === false || b.is_word() === false;
  },
  reason: 'not a word'
}, {
  //if A has a comma, don't chunk it, (unless it's a date)
  condition: function condition(a) {
    return a.has_comma() && !a.pos.Date;
  },
  reason: 'has a comma'
}, { //dont chunk over possessives, eg "spencer's house"
  condition: function condition(a) {
    return a.pos['Possessive'];
  },
  reason: 'has possessive'
}, {
  condition: function condition(a) {
    return a.pos['Expression'] || a.pos['Phrasal'] || a.pos['Pronoun'];
  },
  reason: 'unchunkable pos'
}, { //dont chunk contractions (again)
  condition: function condition(a, b) {
    return a.expansion || b.expansion;
  },
  reason: 'is contraction'
}, { //"Toronto Montreal"
  condition: function condition(a, b) {
    return a.pos['City'] && b.pos['City'];
  },
  reason: 'two cities'
}, { //"Canada Cuba"
  condition: function condition(a, b) {
    return a.pos['Country'] && b.pos['Country'];
  },
  reason: 'two countries'
}, { //"John you"
  condition: function condition(a, b) {
    return a.pos['Person'] && b.pos['Pronoun'];
  },
  reason: 'person-pronoun'
}, { //url singleton
  condition: function condition(a, b) {
    return a.pos['Url'] || b.pos['Url'];
  },
  reason: 'url-no-lump'
}, { //Hashtag singleton
  condition: function condition(a, b) {
    return a.pos['Hashtag'] || b.pos['Hashtag'];
  },
  reason: 'hashtag-no-lump'
}, { //Email singleton
  condition: function condition(a, b) {
    return a.pos['Email'] || b.pos['Email'];
  },
  reason: 'email-no-lump'
}, { //Quotation singleton
  condition: function condition(a, b) {
    return a.pos['Quotation'] || b.pos['Quotation'];
  },
  reason: 'quotation-no-lump'
}];

//check lumping 'blacklist'
var ignore_pair = function ignore_pair(a, b) {
  for (var o = 0; o < dont_lump.length; o++) {
    if (dont_lump[o].condition(a, b)) {
      return true;
    }
  }
  return false;
};

//pairwise-compare two terms (find the 'twosies')
var lump_two = function lump_two(terms) {
  //each term..
  for (var i = 0; i < terms.length; i++) {
    var a = terms[i];
    var b = terms[i + 1];
    if (!a || !b) {
      continue;
    }
    //first check lumping 'blacklist'
    if (ignore_pair(a, b)) {
      continue;
    }
    //check each lumping rule
    for (var o = 0; o < do_lump.length; o++) {
      //should it combine?
      if (do_lump[o].condition(a, b)) {
        var new_tag = do_lump[o].result;
        var reason = do_lump[o].reason;
        // console.log(a.normal);
        // console.log(a.pos);
        terms = combine(terms, i, new_tag, 'chunked ' + reason);
        break;
      }
    }
  }
  //remove empties
  terms = terms.filter(function (t) {
    return t;
  });
  return terms;
};

module.exports = lump_two;

},{"./combine":35}],38:[function(_dereq_,module,exports){
'use strict';

var Term = _dereq_('../../term/term.js');

var Verb = _dereq_('../../term/verb/verb.js');
var Adverb = _dereq_('../../term/adverb/adverb.js');
var Adjective = _dereq_('../../term/adjective/adjective.js');

var Noun = _dereq_('../../term/noun/noun.js');
var Person = _dereq_('../../term/noun/person/person.js');
var Place = _dereq_('../../term/noun/place/place.js');
var Organization = _dereq_('../../term/noun/organization/organization.js');
var Value = _dereq_('../../term/noun/value/value.js');
var _Date = _dereq_('../../term/noun/date/date.js');
var Url = _dereq_('../../term/noun/url/url.js');

var tag_mapping = {
  //nouns
  'NNA': 'Acronym',
  'NNS': 'Plural',
  'NN': 'Noun',
  'NNO': 'Possessive',
  'CD': 'Value',
  // 'NNP': 'Noun',
  // 'NNPA': 'Noun',
  // 'NNAB': 'Noun',
  // 'NNPS': 'Noun',
  // 'NNG': 'Noun',
  'AC': 'Actor',
  'DA': 'Date',
  'CO': 'Condition',
  'PN': 'Person',

  //glue
  'PP': 'Possessive',
  'PRP': 'Pronoun',
  'EX': 'Expression', //interjection
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

  'QU': 'Question'
};

var classMapping = {
  'Noun': Noun,
  'Honourific': Noun,
  'Acronym': Noun,
  'Plural': Noun,
  'Pronoun': Noun,
  'Actor': Noun,
  'Abbreviation': Noun,
  'Currency': Noun,

  'Verb': Verb,
  'PresentTense': Verb,
  'FutureTense': Verb,
  'PastTense': Verb,
  'Infinitive': Verb,
  'PerfectTense': Verb,
  'PluperfectTense': Verb,
  'Gerund': Verb,
  'Copula': Verb,
  'Modal': Verb,

  'Comparative': Adjective,
  'Superlative': Adjective,
  'Adjective': Adjective,
  'Demonym': Adjective,

  'Determiner': Term,
  'Preposition': Term,
  'Expression': Term,
  'Conjunction': Term,
  'Possessive': Term,
  'Question': Term,
  'Symbol': Term,

  'Email': Noun,
  'AtMention': Noun,
  'HashTag': Noun,
  'Url': Url,

  //not yet fully-supported as a POS
  'MalePerson': Person,
  'FemalePerson': Person,

  'Adverb': Adverb,
  'Value': Value,

  'Place': Place,
  'City': Place,
  'Country': Place,

  'Person': Person,
  'Organization': Organization,
  'Date': _Date
};

module.exports = {
  tag_mapping: tag_mapping,
  classMapping: classMapping,
  Term: Term,
  'Date': _Date,
  Value: Value,
  Verb: Verb,
  Person: Person,
  Place: Place,
  Organization: Organization,
  Adjective: Adjective,
  Adverb: Adverb,
  Noun: Noun
};

},{"../../term/adjective/adjective.js":64,"../../term/adverb/adverb.js":69,"../../term/noun/date/date.js":74,"../../term/noun/noun.js":80,"../../term/noun/organization/organization.js":82,"../../term/noun/person/person.js":86,"../../term/noun/place/place.js":88,"../../term/noun/url/url.js":93,"../../term/noun/value/value.js":100,"../../term/term.js":101,"../../term/verb/verb.js":111}],39:[function(_dereq_,module,exports){
'use strict';

var assign = _dereq_('../assign');

//date words that are sometimes-not..
var tough_dates = {
  may: true,
  april: true,
  march: true,
  june: true,
  jan: true
};

//an integer that looks year-like
var maybe_year = function maybe_year(t) {
  if (t.pos.Value) {
    var num = t.number || 0;
    if (num >= 1900 && num < 2030) {
      return true;
    }
  }
  return false;
};

//neighbouring words that indicate it is a date
var date_signals = {
  between: true,
  before: true,
  after: true,
  during: true,
  from: true,
  to: true,
  in: true,
  of: true,
  the: true,
  next: true
};

var ambiguous_dates = function ambiguous_dates(terms) {
  for (var i = 0; i < terms.length; i++) {
    var t = terms[i];
    if (tough_dates[t.normal] || maybe_year(t)) {
      //'march' or '2015'
      //if nearby another date or value
      if (terms[i + 1] && (terms[i + 1].pos['Value'] || terms[i + 1].pos['Date'])) {
        terms[i] = assign(t, 'Date', 'date_signal');
        continue;
      }
      if (terms[i - 1] && (terms[i - 1].pos['Value'] || terms[i - 1].pos['Date'])) {
        terms[i] = assign(t, 'Date', 'date_signal');
        continue;
      }

      //if next term is date-like
      if (terms[i + 1] && date_signals[terms[i + 1].normal]) {
        terms[i] = assign(t, 'Date', 'date_signal');
        continue;
      }
      //if last term is date-like
      if (terms[i - 1] && date_signals[terms[i - 1].normal]) {
        terms[i] = assign(t, 'Date', 'date_signal');
        continue;
      }
    }
  }
  return terms;
};

module.exports = ambiguous_dates;

},{"../assign":34}],40:[function(_dereq_,module,exports){
'use strict';

var assign = _dereq_('../assign');
//set POS for capitalised words
var capital_signals = function capital_signals(terms) {
  //first words need careful rules
  if (terms[0] && terms[0].is_acronym()) {
    terms[0] = assign(terms[0], 'Noun', 'acronym');
  }
  //non-first-word capitals are nouns
  for (var i = 1; i < terms.length; i++) {
    if (terms[i].is_capital() || terms[i].is_acronym()) {
      terms[i] = assign(terms[i], 'Noun', 'capital_signal');
    }
  }
  return terms;
};
module.exports = capital_signals;

},{"../assign":34}],41:[function(_dereq_,module,exports){
'use strict';

var starts = {
  'if': true,
  'in the event': true,
  'in order to': true,
  'so long as': true,
  'provided': true,
  'save that': true,
  'after': true,
  'once': true,
  'subject to': true,
  'without': true,
  'effective': true,
  'upon': true,
  'during': true,
  'unless': true,
  'according': true,
  'notwithstanding': true,
  'when': true,
  'before': true
};

// ensure there's a verb in a couple words
var verbSoon = function verbSoon(terms, x) {
  for (var i = 0; i < 5; i++) {
    if (terms[i + x] && terms[i + x].pos['Verb']) {
      return true;
    }
  }
  return false;
};

// find the next upcoming comma
var nextComma = function nextComma(terms, i) {
  //don't be too aggressive
  var max = terms.length - 1;
  if (max > i + 7) {
    max = i + 7;
  }
  for (var x = i; x < max; x++) {
    //ensure there's a command and a verb coming up soon
    if (terms[x].has_comma() && verbSoon(terms, x)) {
      return x;
    }
  }
  //allow trailing conditions too
  if (i > 5 && terms.length - i < 5) {
    return terms.length;
  }
  return null;
};

//set these terms as conditional
var tagCondition = function tagCondition(terms, start, stop) {
  for (var i = start; i <= stop; i++) {
    if (!terms[i]) {
      break;
    }
    terms[i].pos['Condition'] = true;
  }
};

var conditional_pass = function conditional_pass(terms) {

  //try leading condition
  if (terms[0] && starts[terms[0].normal]) {
    var until = nextComma(terms, 0);
    if (until) {
      tagCondition(terms, 0, until);
    }
  }

  //try trailing condition
  for (var i = 3; i < terms.length; i++) {
    if (starts[terms[i].normal] && terms[i - 1].has_comma()) {
      var _until = nextComma(terms, i);
      if (_until) {
        tagCondition(terms, i, _until);
        i += _until;
      }
    }
  }
  return terms;
};

module.exports = conditional_pass;

},{}],42:[function(_dereq_,module,exports){
'use strict';

var pos = _dereq_('../../parts_of_speech');
//places a 'silent' term where a contraction, like "they're" exists

//the formulaic contraction types:
var supported = {
  'll': 'will',
  'd': 'would',
  've': 'have',
  're': 'are',
  'm': 'am' //this is not the safest way to support i'm
  //these ones are a bit tricksier:
  // 't': 'not',
  // 's': 'is' //or was
};

var irregulars = {
  'dunno': ['do not', 'know'],
  'wanna': ['want', 'to'],
  'gonna': ['going', 'to'],
  'im': ['i', 'am'],
  'alot': ['a', 'lot'],

  'dont': ['do not'],
  'don\'t': ['do not'],
  'dun': ['do not'],

  'won\'t': ['will not'],
  'wont': ['will not'],

  'can\'t': ['can not'],
  'cannot': ['can not'],

  'aint': ['is not'], //or 'are'
  'ain\'t': ['is not'],
  'shan\'t': ['should not'],

  'where\'d': ['where', 'did'],
  'when\'d': ['when', 'did'],
  'how\'d': ['how', 'did'],
  'what\'d': ['what', 'did'],
  'brb': ['be', 'right', 'back'],
  'let\'s': ['let', 'us']
};

// `n't` contractions - negate doesn't have a second term
var handle_negate = function handle_negate(terms, i) {
  terms[i].expansion = terms[i].text.replace(/n'.*/, '');
  terms[i].expansion += ' not';
  return terms;
};

//puts a 'implicit term' in this sentence, at 'i'
var handle_simple = function handle_simple(terms, i, particle) {
  terms[i].expansion = terms[i].text.replace(/'.*/, '');
  //make ghost-term
  var second_word = new pos.Verb('');
  second_word.expansion = particle;
  second_word.whitespace.trailing = terms[i].whitespace.trailing;
  terms[i].whitespace.trailing = ' ';
  terms.splice(i + 1, 0, second_word);
  return terms;
};

// expand manual contractions
var handle_irregulars = function handle_irregulars(terms, x, arr) {
  terms[x].expansion = arr[0];
  for (var i = 1; i < arr.length; i++) {
    var t = new pos.Term('');
    t.whitespace.trailing = terms[x].whitespace.trailing; //move whitespace
    terms[x].whitespace.trailing = ' ';
    t.expansion = arr[i];
    terms.splice(x + i, 0, t);
  }
  return terms;
};

// `'s` contractions
var handle_copula = function handle_copula(terms, i) {
  //fixup current term
  terms[i].expansion = terms[i].text.replace(/'s$/, '');
  //make ghost-term
  var second_word = new pos.Verb('');
  second_word.whitespace.trailing = terms[i].whitespace.trailing; //move whitespace
  terms[i].whitespace.trailing = ' ';
  second_word.expansion = 'is';
  terms.splice(i + 1, 0, second_word);
  return terms;
};

//turn all contraction-forms into 'silent' tokens
var interpret = function interpret(terms) {
  for (var i = 0; i < terms.length; i++) {
    //known-forms
    if (irregulars[terms[i].normal]) {
      terms = handle_irregulars(terms, i, irregulars[terms[i].normal]);
      continue;
    }
    //words with an apostrophe
    if (terms[i].has_abbreviation()) {
      var split = terms[i].normal.split(/'/);
      var pre = split[0];
      var post = split[1];
      // eg "they've"
      if (supported[post]) {
        terms = handle_simple(terms, i, supported[post]);
        continue;
      }
      // eg "couldn't"
      if (post === 't' && pre.match(/n$/)) {
        terms = handle_negate(terms, i);
        continue;
      }
      //eg "spencer's" -if it's possessive, it's not a contraction.
      if (post === 's' && terms[i].pos['Possessive']) {
        continue;
      }
      // eg "spencer's"
      if (post === 's') {
        terms = handle_copula(terms, i);
        continue;
      }
    }
  }

  return terms;
};

module.exports = interpret;

// let t = new pos.Verb(`spencer's`);
// let terms = interpret([t]);
// console.log(terms);

},{"../../parts_of_speech":38}],43:[function(_dereq_,module,exports){
'use strict';

var assign = _dereq_('../assign');
var grammar_rules = _dereq_('./rules/grammar_rules');
var fns = _dereq_('../../../fns');
// const match = require('../../match/match');

//tests a subset of terms against a array of tags
var hasTags = function hasTags(terms, tags) {
  if (terms.length !== tags.length) {
    return false;
  }
  for (var i = 0; i < tags.length; i++) {
    //do a [tag] match
    if (fns.startsWith(tags[i], '[') && fns.endsWith(tags[i], ']')) {
      var pos = tags[i].match(/^\[(.*?)\]$/)[1];
      if (!terms[i].pos[pos]) {
        return false;
      }
    } else if (terms[i].normal !== tags[i]) {
      //do a text-match
      return false;
    }
  }
  return true;
};

//hints from the sentence grammar
var grammar_rules_pass = function grammar_rules_pass(s) {
  for (var i = 0; i < s.terms.length; i++) {
    for (var o = 0; o < grammar_rules.length; o++) {
      var rule = grammar_rules[o];
      //does this rule match
      var terms = s.terms.slice(i, i + rule.before.length);
      if (hasTags(terms, rule.before)) {
        //change before/after for each term
        for (var c = 0; c < rule.before.length; c++) {
          if (rule.after[c]) {
            var newPos = rule.after[c].match(/^\[(.*?)\]$/)[1];
            s.terms[i + c] = assign(s.terms[i + c], newPos, 'grammar_rule  (' + rule.before.join(',') + ')');
          }
        }
        break;
      }
    }
  }
  return s.terms;
};
module.exports = grammar_rules_pass;

},{"../../../fns":23,"../assign":34,"./rules/grammar_rules":51}],44:[function(_dereq_,module,exports){
'use strict';

var assign = _dereq_('../assign');

//clear-up ambiguous interjections "ok"[Int], "thats ok"[Adj]
var interjection_fixes = function interjection_fixes(terms) {
  var interjections = {
    ok: true,
    so: true,
    please: true,
    alright: true,
    well: true,
    now: true
  };
  for (var i = 0; i < terms.length; i++) {
    if (i > 3) {
      break;
    }
    if (interjections[terms[i].normal]) {
      terms[i] = assign(terms[i], 'Expression', 'interjection_fixes');
    } else {
      break;
    }
  }
  return terms;
};

module.exports = interjection_fixes;

},{"../assign":34}],45:[function(_dereq_,module,exports){
'use strict';

var defaultLexicon = _dereq_('../../../lexicon.js');
var assign = _dereq_('../assign');

//consult lexicon for this known-word
var lexicon_pass = function lexicon_pass(terms, options) {
  var lexicon = options.lexicon || defaultLexicon;
  return terms.map(function (t) {

    var normal = t.normal;
    //normalize apostrophe s for grammatical purposes
    if (t.has_abbreviation()) {
      var split = normal.split(/'/);
      if (split[1] === 's') {
        normal = split[0];
      }
    }

    //check lexicon straight-up
    if (lexicon[normal] !== undefined) {
      return assign(t, lexicon[normal], 'lexicon_pass');
    }

    if (lexicon[t.expansion] !== undefined) {
      return assign(t, lexicon[t.expansion], 'lexicon_expansion');
    }
    //try to match it without a prefix - eg. outworked -> worked
    if (normal.match(/^(over|under|out|-|un|re|en).{3}/)) {
      var attempt = normal.replace(/^(over|under|out|.*?-|un|re|en)/, '');
      if (lexicon[attempt]) {
        return assign(t, lexicon[attempt], 'lexicon_prefix');
      }
    }
    //try to match without a contraction - "they've" -> "they"
    if (t.has_abbreviation()) {
      var _attempt = normal.replace(/'(ll|re|ve|re|d|m|s)$/, '');
      // attempt = attempt.replace(/n't/, '');
      if (lexicon[_attempt]) {
        return assign(t, lexicon[_attempt], 'lexicon_suffix');
      }
    }

    //match 'twenty-eight'
    if (normal.match(/-/)) {
      var sides = normal.split('-');
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
module.exports = lexicon_pass;

},{"../../../lexicon.js":25,"../assign":34}],46:[function(_dereq_,module,exports){
'use strict';

var lexicon = _dereq_('../../../lexicon.js');
var assign = _dereq_('../assign');

var should_merge = function should_merge(a, b) {
  if (!a || !b) {
    return false;
  }
  //if it's a known multiple-word term
  if (lexicon[a.normal + ' ' + b.normal]) {
    return true;
  }
  return false;
};

var multiples_pass = function multiples_pass(terms) {
  var new_terms = [];
  var last_one = null;
  for (var i = 0; i < terms.length; i++) {
    var t = terms[i];
    //if the tags match (but it's not a hidden contraction)
    if (should_merge(last_one, t)) {
      var last = new_terms[new_terms.length - 1];
      var space = t.whitespace.preceding + last.whitespace.trailing;
      last.text += space + t.text;
      last.rebuild();
      last.whitespace.trailing = t.whitespace.trailing;
      var pos = lexicon[last.normal];
      new_terms[new_terms.length - 1] = assign(last, pos, 'multiples_pass_lexicon');
      new_terms[new_terms.length - 1].whitespace = last.whitespace;
    } else {
      new_terms.push(t);
    }
    last_one = t;
  }
  return new_terms;
};

module.exports = multiples_pass;

},{"../../../lexicon.js":25,"../assign":34}],47:[function(_dereq_,module,exports){
'use strict';

var assign = _dereq_('../assign');
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
  //these are always contractions, not possessive
  if (blacklist[terms[x].normal]) {
    return false;
  }
  //"spencers'" - this is always possessive - eg "flanders'"
  if (terms[x].normal.match(/[a-z]s'$/)) {
    return true;
  }
  //if no apostrophe s, return
  if (!terms[x].normal.match(/[a-z]'s$/)) {
    return false;
  }
  //some parts-of-speech can't be possessive
  if (terms[x].pos['Pronoun']) {
    return false;
  }
  var nextWord = terms[x + 1];
  //last word is possessive  - "better than spencer's"
  if (!nextWord) {
    return true;
  }
  //next word is 'house'
  if (nextWord.pos['Noun']) {
    return true;
  }
  //rocket's red glare
  if (nextWord.pos['Adjective'] && terms[x + 2] && terms[x + 2].pos['Noun']) {
    return true;
  }
  //next word is an adjective
  if (nextWord.pos['Adjective'] || nextWord.pos['Verb'] || nextWord.pos['Adverb']) {
    return false;
  }
  return false;
};

//tag each term as possessive, if it should
var possessive_pass = function possessive_pass(terms) {
  for (var i = 0; i < terms.length; i++) {
    if (is_possessive(terms, i)) {
      //if it's not already a noun, co-erce it to one
      if (!terms[i].pos['Noun']) {
        terms[i] = assign(terms[i], 'Noun', 'possessive_pass');
      }
      terms[i].pos['Possessive'] = true;
    }
  }
  return terms;
};
module.exports = possessive_pass;

},{"../assign":34}],48:[function(_dereq_,module,exports){
'use strict';

var assign = _dereq_('../assign');
// question-words are awkward,
// 'why',  //*
// 'where',
// 'when',
// 'what',
// 'who',
// 'whom',
// 'whose',
// 'which'

//differentiate pos for "who walked?" -vs- "he who walked"
// Pick up that book on the floor.
var is_pronoun = function is_pronoun(terms, x) {
  var determiners = {
    who: true,
    whom: true,
    whose: true,
    which: true
  };
  //if it starts a sentence, it's probably a question
  if (x === 0) {
    return false;
  }
  if (determiners[terms[x].normal]) {
    //if it comes after a Noun..
    if (terms[x - 1] && terms[x - 1].pos['Noun']) {
      //if next word is a verb
      if (terms[x + 1] && (terms[x + 1].pos['Verb'] || terms[x + 1].pos['Adverb'])) {
        return true;
      }
    }
  }
  return false;
};

var question_pass = function question_pass(terms) {
  for (var i = 0; i < terms.length; i++) {
    if (terms[i].pos.Question && is_pronoun(terms, i)) {
      terms[i] = assign(terms[i], 'Pronoun', 'question_is_pronoun');
    }
  }
  return terms;
};

module.exports = question_pass;

},{"../assign":34}],49:[function(_dereq_,module,exports){
'use strict';
// knowing if something is inside a quotation is important grammatically
//set all the words inside quotations marks as pos['Quotation']=true
// verbatim change of narration only, 'scare quotes' don't count.

var startQuote = function startQuote(s) {
  return s.match(/^["\u201C]./);
};
var endQuote = function endQuote(s) {
  return s.match(/.["\u201D]$/);
};

//find the next quotation terminator
var quotation_ending = function quotation_ending(terms, start) {
  for (var i = start; i < terms.length; i++) {
    if (endQuote(terms[i].text)) {
      return i;
    }
  }
  return null;
};

//set these terms as quotations
var tagQuotation = function tagQuotation(terms, start, stop) {
  for (var i = start; i <= stop; i++) {
    if (!terms[i]) {
      break;
    }
    terms[i].pos['Quotation'] = true;
  }
};

//hunt
var quotation_pass = function quotation_pass(terms) {
  for (var i = 0; i < terms.length; i++) {
    if (startQuote(terms[i].text)) {
      var end = quotation_ending(terms, [i]);
      if (end !== null) {
        tagQuotation(terms, i, end);
        return terms;
      }
    }
  }
  return terms;
};

module.exports = quotation_pass;

},{}],50:[function(_dereq_,module,exports){
'use strict';

var word_rules = _dereq_('./rules/word_rules');
var assign = _dereq_('../assign');

//word-rules that run on '.text', not '.normal'
var punct_rules = [{ //'+'
  reg: new RegExp('^[@%^&*+=~-]?$', 'i'),
  pos: 'Symbol',
  reason: 'independent-symbol'
}, { //2:54pm
  reg: new RegExp('^[12]?[0-9]\:[0-9]{2}( am| pm)?$', 'i'),
  pos: 'Date',
  reason: 'time_reg'
}, { //1999/12/25
  reg: new RegExp('^[0-9]{1,4}[-/][0-9]{1,2}[-/][0-9]{1,4}$', 'i'),
  pos: 'Date',
  reason: 'numeric_date'
}, { //3:32
  reg: new RegExp('^[0-9]{1,2}:[0-9]{2}(:[0-9]{2})?', 'i'),
  pos: 'Date',
  reason: 'time'
}];

var regex_pass = function regex_pass(terms) {
  terms.forEach(function (t, i) {
    //don't overwrite
    if (terms[i].tag !== '?') {
      return;
    }
    var text = terms[i].text;
    var normal = terms[i].normal;
    //normalize apostrophe s for grammatical purposes
    if (terms[i].has_abbreviation()) {
      var split = terms[i].normal.split(/'/);
      if (split[1] === 's') {
        normal = split[0];
      }
    }
    //regexes that involve punctuation
    for (var o = 0; o < punct_rules.length; o++) {
      if (text.match(punct_rules[o].reg)) {
        terms[i] = assign(terms[i], punct_rules[o].pos, punct_rules[o].rules);
        return;
      }
    }
    //bigger list of regexes on normal
    for (var _o = 0; _o < word_rules.length; _o++) {
      if (normal.match(word_rules[_o].reg)) {
        var reason = 'regex #' + _o + ' ' + word_rules[_o].pos;
        terms[i] = assign(terms[i], word_rules[_o].pos, reason);
        return;
      }
    }
  });
  return terms;
};

module.exports = regex_pass;

},{"../assign":34,"./rules/word_rules":52}],51:[function(_dereq_,module,exports){
'use strict';

module.exports = [
//determiner hints
{
  'before': ['[Determiner]', '[?]'],
  'after': ['[Determiner]', '[Noun]']
}, {
  'before': ['the', '[Verb]'],
  'after': [null, '[Noun]']
}, {
  'before': ['[Determiner]', '[Adjective]', '[Verb]'],
  'after': ['[Noun]', '[Noun]', '[Noun]']
}, {
  'before': ['[Determiner]', '[Adverb]', '[Adjective]', '[?]'],
  'after': ['[Determiner]', '[Adverb]', '[Adjective]', '[Noun]']
}, {
  'before': ['[?]', '[Determiner]', '[Noun]'],
  'after': ['[Verb]', '[Determiner]', '[Noun]']
},
//"peter the great"
{
  'before': ['[Person]', 'the', '[Noun]'],
  'after': ['[Person]', null, '[Noun]']
},
// //"book the flight"
{
  'before': ['[Noun]', 'the', '[Noun]'],
  'after': ['[Verb]', null, '[Noun]']
},

//Possessive hints
{
  'before': ['[Possessive]', '[?]'],
  'after': ['[Possessive]', '[Noun]']
},
// {
//   'before': ['[Possessive]', '[Verb]'],
//   'after': ['[Possessive]', '[Noun]'],
// },
{
  'before': ['[?]', '[Possessive]', '[Noun]'],
  'after': ['[Verb]', '[Possessive]', '[Noun]']
},
//copula hints
{
  'before': ['[Copula]', '[?]'],
  'after': ['[Copula]', '[Adjective]'] }, {
  'before': ['[Copula]', '[Adverb]', '[?]'],
  'after': ['[Copula]', '[Adverb]', '[Adjective]'] },
//preposition hints
{
  'before': ['[?]', '[Preposition]'],
  'after': ['[Verb]', '[Preposition]']
},
//conjunction hints, like lists (a little sloppy)
{
  'before': ['[Adverb]', '[Conjunction]', '[Adverb]'],
  'after': ['[Adverb]', '[Adverb]', '[Adverb]']
},
//do not
// {
//   'before': ['[Verb]', 'not'],
//   'after': ['[Verb]', '[Verb]'],
// },
// {
//   'before': ['[Noun]', '[Conjunction]', '[Noun]'],
//   'after': ['[Noun]', '[Noun]', '[Noun]'],
// },
{
  'before': ['[Adjective]', '[Conjunction]', '[Adjective]'],
  'after': ['[Adjective]', '[Adjective]', '[Adjective]']
}, {
  'before': ['[?]', '[Conjunction]', '[Verb]'],
  'after': ['[Verb]', '[Conjunction]', '[Verb]']
}, {
  'before': ['[Verb]', '[Conjunction]', '[?]'],
  'after': ['[Verb]', '[Conjunction]', '[Verb]']
},
//adverb hints
{
  'before': ['[Noun]', '[Adverb]', '[Noun]'],
  'after': ['[Noun]', '[Adverb]', '[Verb]']
},
//pronoun hints
{
  'before': ['[?]', '[Pronoun]'],
  'after': ['[Verb]', '[Pronoun]']
},
//modal hints
{
  'before': ['[Modal]', '[?]'],
  'after': ['[Modal]', '[Verb]']
}, {
  'before': ['[Modal]', '[Adverb]', '[?]'],
  'after': ['[Modal]', '[Adverb]', '[Verb]']
}, { // 'red roses' => Adjective, Noun
  'before': ['[Adjective]', '[Verb]'],
  'after': ['[Adjective]', '[Noun]']
}, { // 5 kittens => Value, Nouns
  'before': ['[Value]', '[Verb]'],
  'after': ['[Value]', '[Noun]']
},

//ambiguous dates (march/may)
// {
//   'before': ['[Modal]', '[Value]'],
//   'after': ['[Modal]', '[Verb]'],
// },
{
  'before': ['[Adverb]', '[Value]'],
  'after': ['[Adverb]', '[Verb]']
}];

},{}],52:[function(_dereq_,module,exports){
'use strict';

var tag_mapping = _dereq_('../../parts_of_speech.js').tag_mapping;
//regex patterns and parts of speech],
module.exports = [['^[0-9]+ ?(am|pm)$', 'DA'], ['^[0-9]+(st|nd|rd)?$', 'CD'], ['^[a-z]et$', 'VB'], ['cede$', 'VB'], ['.[cts]hy$', 'JJ'], ['.[st]ty$', 'JJ'], ['.[lnr]ize$', 'VB'], ['.[gk]y$', 'JJ'], ['.fies$', 'VB'], ['.some$', 'JJ'], ['.[nrtumcd]al$', 'JJ'], ['.que$', 'JJ'], ['.[tnl]ary$', 'JJ'], ['.[di]est$', 'JJS'], ['^(un|de|re)\\-[a-z]..', 'VB'], ['.lar$', 'JJ'], ['[bszmp]{2}y', 'JJ'], ['.zes$', 'VB'], ['.[icldtgrv]ent$', 'JJ'], ['.[rln]ates$', 'VBZ'], ['.[oe]ry$', 'NN'], ['[rdntkdhs]ly$', 'RB'], ['.[lsrnpb]ian$', 'JJ'], ['.[^aeiou]ial$', 'JJ'], ['.[^aeiou]eal$', 'JJ'], ['.[vrl]id$', 'JJ'], ['.[ilk]er$', 'JJR'], ['.ike$', 'JJ'], ['.ends?$', 'VB'], ['.wards$', 'RB'], ['.rmy$', 'JJ'], ['.rol$', 'NN'], ['.tors$', 'NN'], ['.azy$', 'JJ'], ['.where$', 'RB'], ['.ify$', 'VB'], ['.bound$', 'JJ'], ['.[^z]ens$', 'VB'], ['.oid$', 'JJ'], ['.vice$', 'NN'], ['.rough$', 'JJ'], ['.mum$', 'JJ'], ['.teen(th)?$', 'CD'], ['.oses$', 'VB'], ['.ishes$', 'VB'], ['.ects$', 'VB'], ['.tieth$', 'CD'], ['.ices$', 'NN'], ['.pose$', 'VB'], ['.ions$', 'NN'], ['.ean$', 'JJ'], ['.[ia]sed$', 'JJ'], ['.tized$', 'VB'], ['.llen$', 'JJ'], ['.fore$', 'RB'], ['.ances$', 'NN'], ['.gate$', 'VB'], ['.nes$', 'VB'], ['.less$', 'RB'], ['.ried$', 'JJ'], ['.gone$', 'JJ'], ['.made$', 'JJ'], ['.ing$', 'VB'], //likely to be converted to adjective after lexicon pass
['.tions$', 'NN'], ['.tures$', 'NN'], ['.ous$', 'JJ'], ['.ports$', 'NN'], ['. so$', 'RB'], ['.ints$', 'NN'], ['.[gt]led$', 'JJ'], ['.lked$', 'VB'], ['.fully$', 'RB'], ['.*ould$', 'MD'], ['^-?[0-9]+(.[0-9]+)?$', 'CD'], ['[a-z]*\\-[a-z]*\\-', 'JJ'], ['[a-z]\'s$', 'NNO'], ['.\'n$', 'VB'], ['.\'re$', 'CP'], ['.\'ll$', 'MD'], ['.\'t$', 'VB'], ['.tches$', 'VB'], ['^https?\:?\/\/[a-z0-9]', 'NN'], //the colon is removed in normalisation
['^www\.[a-z0-9]', 'NN'], ['.ize$', 'VB'], ['.[^aeiou]ise$', 'VB'], ['.[aeiou]te$', 'VB'], ['.ea$', 'NN'], ['[aeiou][pns]er$', 'NN'], ['.ia$', 'NN'], ['.sis$', 'NN'], ['.[aeiou]na$', 'NN'], ['.[^aeiou]ity$', 'NN'], ['.[^aeiou]ium$', 'NN'], ['.[^aeiou][ei]al$', 'JJ'], ['.ffy$', 'JJ'], ['.[^aeiou]ic$', 'JJ'], ['.(gg|bb|zz)ly$', 'JJ'], ['.[aeiou]my$', 'JJ'], ['.[^aeiou][ai]ble$', 'JJ'], ['.[^aeiou]eable$', 'JJ'], ['.[^aeiou]ful$', 'JJ'], ['.[^aeiou]ish$', 'JJ'], ['.[^aeiou]ica$', 'NN'], ['[aeiou][^aeiou]is$', 'NN'], ['[^aeiou]ard$', 'NN'], ['[^aeiou]ism$', 'NN'], ['.[^aeiou]ity$', 'NN'], ['.[^aeiou]ium$', 'NN'], ['.[lstrn]us$', 'NN'], ['..ic$', 'JJ'], ['[aeiou][^aeiou]id$', 'JJ'], ['.[^aeiou]ish$', 'JJ'], ['.[^aeiou]ive$', 'JJ'], ['[ea]{2}zy$', 'JJ'], ['[^aeiou]ician$', 'AC'], ['.keeper$', 'AC'], ['.logist$', 'AC'], ['..ier$', 'AC'], ['.[^aeiou][ao]pher$', 'AC'], ['.tive$', 'AC'], ['[aeiou].*ist$', 'JJ'], ['[^i]fer$', 'VB'],
//slang things
['^um+$', 'EX'], //ummmm
['^([hyj]a)+$', 'EX'], //hahah
['^(k)+$', 'EX'], //kkkk
['^(yo)+$', 'EX'], //yoyo
['^yes+$', 'EX'], //yessss
['^no+$', 'EX'], //noooo
['^lol[sz]$', 'EX'], //lol
['^woo+[pt]?$', 'EX'], //woo
['^ug?h+$', 'EX'], //uhh
['^uh[ -]?oh$', 'EX']].map(function (a) {
  return {
    reg: new RegExp(a[0], 'i'),
    pos: tag_mapping[a[1]]
  };
});

},{"../../parts_of_speech.js":38}],53:[function(_dereq_,module,exports){
'use strict';
//identify urls, hashtags, @mentions, emails

var assign = _dereq_('../assign');
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
  for (var i = 0; i < terms.length; i++) {
    var str = terms[i].text.trim().toLowerCase();
    if (is_email(str)) {
      terms[i] = assign(terms[i], 'Email', 'web_pass');
    }
    if (is_hashtag(str)) {
      terms[i] = assign(terms[i], 'HashTag', 'web_pass');
    }
    if (is_atmention(str)) {
      terms[i] = assign(terms[i], 'AtMention', 'web_pass');
    }
    if (is_url(str)) {
      terms[i] = assign(terms[i], 'Url', 'web_pass');
    }
  }
  return terms;
};

module.exports = web_pass;

},{"../assign":34}],54:[function(_dereq_,module,exports){
//part-of-speech tagging
'use strict';

var lump_two = _dereq_('./lumper/lump_two');
var lump_three = _dereq_('./lumper/lump_three');
var pos = _dereq_('./parts_of_speech');
var assign = _dereq_('./assign');

var grammar_pass = _dereq_('./passes/grammar_pass');
var interjection_fixes = _dereq_('./passes/interjection_fixes');
var lexicon_pass = _dereq_('./passes/lexicon_pass');
var capital_signals = _dereq_('./passes/capital_signals');
var conditional_pass = _dereq_('./passes/conditional_pass');
var ambiguous_dates = _dereq_('./passes/ambiguous_dates');
var multiple_pass = _dereq_('./passes/multiples_pass');
var regex_pass = _dereq_('./passes/regex_pass');
var quotation_pass = _dereq_('./passes/quotation_pass');
var possessive_pass = _dereq_('./passes/possessive_pass');
var contraction_pass = _dereq_('./passes/contractions/interpret');
var question_pass = _dereq_('./passes/question_pass');
var web_text_pass = _dereq_('./passes/web_text_pass');

var noun_fallback = function noun_fallback(terms) {
  for (var i = 0; i < terms.length; i++) {
    if (terms[i].tag === '?' && terms[i].normal.match(/[a-z]/)) {
      terms[i] = assign(terms[i], 'Noun', 'fallback');
    }
  }
  return terms;
};

//turn nouns into person/place
var specific_noun = function specific_noun(terms) {
  for (var i = 0; i < terms.length; i++) {
    var t = terms[i];
    if (t instanceof pos.Noun) {
      //don't overwrite known forms...
      if (t.pos.Person || t.pos.Place || t.pos.Value || t.pos.Date || t.pos.Organization) {
        continue;
      }
      if (t.is_person()) {
        terms[i] = assign(t, 'Person', 'is_person');
      } else if (t.is_place()) {
        terms[i] = assign(t, 'Place', 'is_place');
      } else if (t.is_value()) {
        terms[i] = assign(t, 'Value', 'is_value');
      } else if (t.is_date()) {
        terms[i] = assign(t, 'Date', 'is_date');
      } else if (t.is_organization()) {
        terms[i] = assign(t, 'Organization', 'is_organization');
      }
    }
  }
  return terms;
};

var tagger = function tagger(s, options) {
  //word-level rules
  s.terms = capital_signals(s.terms);
  s.terms = lexicon_pass(s.terms, options);
  s.terms = multiple_pass(s.terms);
  s.terms = regex_pass(s.terms);
  s.terms = interjection_fixes(s.terms);
  s.terms = web_text_pass(s.terms);
  //sentence-level rules
  //(repeat these steps a couple times, to wiggle-out the grammar)
  for (var i = 0; i < 3; i++) {
    s.terms = grammar_pass(s);
    s.terms = specific_noun(s.terms);
    s.terms = ambiguous_dates(s.terms);
    s.terms = possessive_pass(s.terms);
    s.terms = lump_two(s.terms);
    s.terms = noun_fallback(s.terms);
    s.terms = lump_three(s.terms);
  }
  s.terms = conditional_pass(s.terms);
  s.terms = quotation_pass(s.terms);
  s.terms = contraction_pass(s.terms);
  s.terms = question_pass(s.terms);
  return s.terms;
};

module.exports = tagger;

},{"./assign":34,"./lumper/lump_three":36,"./lumper/lump_two":37,"./parts_of_speech":38,"./passes/ambiguous_dates":39,"./passes/capital_signals":40,"./passes/conditional_pass":41,"./passes/contractions/interpret":42,"./passes/grammar_pass":43,"./passes/interjection_fixes":44,"./passes/lexicon_pass":45,"./passes/multiples_pass":46,"./passes/possessive_pass":47,"./passes/question_pass":48,"./passes/quotation_pass":49,"./passes/regex_pass":50,"./passes/web_text_pass":53}],55:[function(_dereq_,module,exports){
'use strict';
//build-out this mapping

var interrogatives = {
  'who': 'who',
  'whose': 'who',
  'whom': 'who',
  'which person': 'who',

  'where': 'where',
  'when': 'when',

  'why': 'why',
  'how come': 'why'
};

var easyForm = function easyForm(s, i) {
  var t = s.terms[i];
  var nextTerm = s.terms[i + 1];

  //some interrogative forms are two-terms, try it.
  if (nextTerm) {
    var twoTerm = t.normal + ' ' + nextTerm.normal;
    if (interrogatives[twoTerm]) {
      return interrogatives[twoTerm];
    }
  }
  //try an interrogative first - 'who'
  if (interrogatives[t.normal]) {
    return interrogatives[t.normal];
  }
  //an interrogative as a contraction - 'why'd'
  if (interrogatives[t.expansion]) {
    return interrogatives[t.expansion];
  }
  return false;
};

module.exports = easyForm;

},{}],56:[function(_dereq_,module,exports){
'use strict';

var hardFormVerb = {
  'which': 'which',
  'what': 'what'
};

// "what time" -> 'when'
var knownForm = {
  time: 'when',
  day: 'when',
  year: 'when',

  person: 'who', //more covered by pos["Actor"]

  amount: 'number',
  number: 'number'
};

var hardForm = function hardForm(s, i) {
  var t = s.terms[i];
  var nextTerm = s.terms[i + 1];
  // which, or what
  var questionWord = hardFormVerb[t.normal] || hardFormVerb[t.expanded];
  // end early.
  if (!nextTerm || !questionWord) {
    return null;
  }

  //"which is.."
  if (nextTerm.pos['Copula']) {
    return t.normal;
  }
  //"which politician.."
  if (nextTerm.pos['Actor']) {
    return 'who';
  }
  //"what time.."
  if (knownForm[nextTerm.normal]) {
    return knownForm[nextTerm.normal];
  }

  return questionWord;
};

module.exports = hardForm;

},{}],57:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sentence = _dereq_('../sentence.js');
var question_form = _dereq_('./question_form');

var Question = function (_Sentence) {
  _inherits(Question, _Sentence);

  function Question(str, options) {
    _classCallCheck(this, Question);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Question).call(this, str, options));
  }

  _createClass(Question, [{
    key: 'form',
    value: function form() {
      return question_form(this);
    }
  }]);

  return Question;
}(Sentence);

Question.fn = Question.prototype;

module.exports = Question;

// let q = new Question(`accordingly, is he cool?`);
// let q = new Question(`what time did you show up?`);
// console.log(q.form());

},{"../sentence.js":60,"./question_form":58}],58:[function(_dereq_,module,exports){
'use strict';
//classifies a question into:
var yesNoTerm = _dereq_('./yesNo.js');
var easyForm = _dereq_('./easyForm.js');
var hardForm = _dereq_('./hardForm.js');

// how, when, where, who, why
// what, which
// number
// yesNo

//exceptions:
// You bought what!? - Echo question
// Who bought what? - Multiple wh-expressions
// I wonder who Fred will ask to leave. - passive question

// "Five Ws and one H" + 'which'
// let forms = {
// how: ['in what way'],
// what: ['what\'s'],
// which: ['what one'],
// number: ['how many', 'how much', 'how far', 'how long'],
// };

var question_form = function question_form(s) {
  //loop through and find first signal
  for (var i = 0; i < s.terms.length; i++) {

    //who is.. -> "who"
    var form = easyForm(s, i);
    if (form) {
      return form;
    }
    //which politician.. -> "who"
    form = hardForm(s, i);
    if (form) {
      return form;
    }
    //is he..  -> "yesNo"
    if (yesNoTerm(s, i)) {
      return 'yesNo';
    }
  }
  return null;
};

module.exports = question_form;

},{"./easyForm.js":55,"./hardForm.js":56,"./yesNo.js":59}],59:[function(_dereq_,module,exports){
'use strict';

// Yes/No questions take the form:
// he is -> is he?

var yesNoVerb = {
  is: true,
  are: true,
  was: true,
  will: true,
  do: true,
  did: true
};

var yesNoTerm = function yesNoTerm(s, i) {
  var t = s.terms[i];
  var lastTerm = s.terms[i - 1];
  var nextTerm = s.terms[i + 1];
  //try a yes/no question then
  if (yesNoVerb[t.normal] || yesNoVerb[t.expansion]) {
    //leading 'is x...' is a question
    if (!lastTerm) {
      return true;
    }
    //ending '... are.' is a not question
    if (!lastTerm) {
      return false;
    }
    // 'he is' is not a question..
    if (lastTerm.pos['Pronoun'] || lastTerm.pos['Person']) {
      return false;
    }
    // 'is he' is a question..
    if (nextTerm.pos['Pronoun'] || nextTerm.pos['Person']) {
      return true;
    }
  }
  return false;
};

module.exports = yesNoTerm;

},{}],60:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Term = _dereq_('../term/term');
var tagger = _dereq_('./pos/tagger');
var passive_voice = _dereq_('./passive_voice');
var contractions = {
  contract: _dereq_('./contractions/contract'),
  expand: _dereq_('./contractions/expand')
};
var change_tense = _dereq_('./change_tense');
var spot = _dereq_('./spot');
var _match = _dereq_('../match/match');
var tokenize_match = function tokenize_match() {};

//a sentence is an array of Term objects, along with their various methods

var Sentence = function () {
  function Sentence(str, options) {
    _classCallCheck(this, Sentence);

    this.str = '';
    if (typeof str === 'string') {
      this.str = str;
    } else if (typeof str === 'number') {
      this.str = '' + str;
    }
    options = options || {};
    var the = this;
    var words = this.str.split(/( +)/);
    //build-up term-objects
    this.terms = [];
    if (words[0] === '') {
      words.shift();
    }
    for (var i = 0; i < words.length; i++) {
      if (!words[i] || !words[i].match(/\S/i)) {
        continue;
      }
      var whitespace = {
        preceding: words[i - 1],
        trailing: words[i + 1]
      };
      //don't use them twice
      words[i - 1] = null;
      words[i + 1] = null;
      this.terms.push(new Term(words[i], null, whitespace));
    }
    // console.log(this.terms);
    //part-of-speech tagging
    this.terms = tagger(this, options);
    // process contractions
    //now the hard part is already done, just flip them
    this.contractions = {
      // "he'd go" -> "he would go"
      expand: function expand() {
        the.terms = contractions.expand(the.terms);
        return the;
      },
      // "he would go" -> "he'd go"
      contract: function contract() {
        the.terms = contractions.contract(the.terms);
        return the;
      }
    };
  }

  //Sentence methods:

  //insert a new word at this point


  _createClass(Sentence, [{
    key: 'addBefore',
    value: function addBefore(i, str) {
      var t = new Term(str);
      this.terms.splice(i, 0, t);
    }
  }, {
    key: 'addAfter',
    value: function addAfter(i, str) {
      var t = new Term(str);
      this.terms.splice(i + 1, 0, t);
    }

    // a regex-like lookup for a list of terms.
    // returns [] of matches in a 'Terms' class

  }, {
    key: 'match',
    value: function match(match_str, options) {
      var regs = tokenize_match(match_str);
      return _match.findAll(this.terms, regs, options);
    }
    //returns a transformed sentence

  }, {
    key: 'replace',
    value: function replace(match_str, replacement, options) {
      var regs = tokenize_match(match_str);
      replacement = tokenize_match(replacement);
      _match.replaceAll(this.terms, regs, replacement, options);
      return this;
    }

    //the ending punctuation

  }, {
    key: 'terminator',
    value: function terminator() {
      var allowed = {
        '.': true,
        '?': true,
        '!': true
      };
      var char = this.str.match(/([\.\?\!])\W*$/);
      if (char && allowed[char[1]]) {
        return char[1];
      }
      return '';
    }

    //part-of-speech assign each term

  }, {
    key: 'tag',
    value: function tag() {
      this.terms = tagger(this);
      return this.terms;
    }

    //is it a question/statement

  }, {
    key: 'sentence_type',
    value: function sentence_type() {
      var char = this.terminator();
      var types = {
        '?': 'interrogative',
        '!': 'exclamative',
        '.': 'declarative'
      };
      return types[char] || 'declarative';
    }

    // A was verbed by B - B verbed A

  }, {
    key: 'is_passive',
    value: function is_passive() {
      return passive_voice(this);
    }
    // Question doesn't have negate, this is a placeholder

  }, {
    key: 'negate',
    value: function negate() {
      return this;
    }

    //map over Term methods

  }, {
    key: 'text',
    value: function text() {
      return this.terms.reduce(function (s, t) {
        //implicit contractions shouldn't be included
        if (t.text) {
          s += (t.whitespace.preceding || '') + t.text + (t.whitespace.trailing || '');
        }
        return s;
      }, '');
    }
    //like text but for cleaner text

  }, {
    key: 'normal',
    value: function normal() {
      var str = this.terms.reduce(function (s, t) {
        if (t.normal) {
          s += ' ' + t.normal;
        }
        return s;
      }, '').trim();
      return str + this.terminator();
    }

    //further 'lemmatisation/inflection'

  }, {
    key: 'root',
    value: function root() {
      return this.terms.reduce(function (s, t) {
        s += ' ' + t.root();
        return s;
      }, '').trim();
    }
    //return only the main POS classnames/tags

  }, {
    key: 'tags',
    value: function tags() {
      return this.terms.map(function (t) {
        return t.tag || '?';
      });
    }
    //mining for specific things

  }, {
    key: 'people',
    value: function people() {
      return this.terms.filter(function (t) {
        return t.pos['Person'];
      });
    }
  }, {
    key: 'places',
    value: function places() {
      return this.terms.filter(function (t) {
        return t.pos['Place'];
      });
    }
  }, {
    key: 'dates',
    value: function dates() {
      return this.terms.filter(function (t) {
        return t.pos['Date'];
      });
    }
  }, {
    key: 'organizations',
    value: function organizations() {
      return this.terms.filter(function (t) {
        return t.pos['Organization'];
      });
    }
  }, {
    key: 'values',
    value: function values() {
      return this.terms.filter(function (t) {
        return t.pos['Value'];
      });
    }

    //parts of speech

  }, {
    key: 'nouns',
    value: function nouns() {
      return this.terms.filter(function (t) {
        return t.pos['Noun'];
      });
    }
  }, {
    key: 'adjectives',
    value: function adjectives() {
      return this.terms.filter(function (t) {
        return t.pos['Adjective'];
      });
    }
  }, {
    key: 'verbs',
    value: function verbs() {
      return this.terms.filter(function (t) {
        return t.pos['Verb'];
      });
    }
  }, {
    key: 'adverbs',
    value: function adverbs() {
      return this.terms.filter(function (t) {
        return t.pos['Adverb'];
      });
    }

    // john walks quickly -> john walked quickly

  }, {
    key: 'to_past',
    value: function to_past() {
      change_tense(this, 'past');
      return this;
    }
    // john walked quickly -> john walks quickly

  }, {
    key: 'to_present',
    value: function to_present() {
      change_tense(this, 'present');
      return this;
    }
    // john walked quickly -> john will walk quickly

  }, {
    key: 'to_future',
    value: function to_future() {
      change_tense(this, 'future');
      return this;
    }
  }, {
    key: 'strip_conditions',
    value: function strip_conditions() {
      var _this = this;

      this.terms = this.terms.filter(function (t, i) {
        //remove preceding condition
        if (i > 0 && t.pos['Condition'] && !_this.terms[i - 1].pos['Condition']) {
          _this.terms[i - 1].text = _this.terms[i - 1].text.replace(/,$/, '');
          _this.terms[i - 1].whitespace.trailing = '';
          _this.terms[i - 1].rebuild();
        }
        return !t.pos['Condition'];
      });
      return this;
    }

    //'semantic' word-count, skips over implicit terms and things

  }, {
    key: 'word_count',
    value: function word_count() {
      return this.terms.filter(function (t) {
        //a quiet term, from a contraction
        if (t.normal === '') {
          return false;
        }
        return true;
      }).length;
    }

    //named-entity recognition

  }, {
    key: 'topics',
    value: function topics() {
      return spot(this);
    }
  }]);

  return Sentence;
}();

//unpublished methods
//tokenize the match string, just like you'd tokenize the sentence.
//this avoids lumper/splitter problems between haystack and needle


tokenize_match = function tokenize_match(str) {
  var regs = new Sentence(str).terms; //crazy!
  regs = regs.map(function (t) {
    return t.text;
  });
  regs = regs.filter(function (t) {
    return t !== '';
  });
  return regs;
};

Sentence.fn = Sentence.prototype;

module.exports = Sentence;

// let s = new Sentence(`don't go`);
// console.log(s.text());
// s.contractions.expand();
// console.log(s.text());
// s.contractions.contract();
// console.log(s.text());

},{"../match/match":26,"../term/term":101,"./change_tense":30,"./contractions/contract":31,"./contractions/expand":32,"./passive_voice":33,"./pos/tagger":54,"./spot":61}],61:[function(_dereq_,module,exports){
'use strict';
//generic named-entity-recognition

var blacklist = {
  man: true,
  woman: true,
  girl: true,
  boy: true,
  guy: true,
  father: true,
  mother: true,
  sister: true,
  brother: true
};

var consolidate = function consolidate(topics) {
  var names = {};
  for (var i = 0; i < topics.length; i++) {
    var normal = topics[i].root();
    if (normal) {
      names[normal] = names[normal] || {
        count: 0,
        text: normal
      };
      names[normal].count += 1;
    }
  }
  //sort by freq
  var arr = Object.keys(names).map(function (k) {
    return names[k];
  });
  return arr.sort(function (a, b) {
    if (a.count > b.count) {
      return -1;
    } else {
      return 1;
    }
  });
};

var spot = function spot(s) {
  var topics = [];
  for (var i = 0; i < s.terms.length; i++) {
    var t = s.terms[i];
    //some stop-words
    if (blacklist[t.normal]) {
      continue;
    }
    //grab person, place, locations
    if (t.pos['Place'] || t.pos['Organization']) {
      topics.push(t);
      continue;
    }
    if (t.pos['Person'] && !t.pos['Pronoun']) {
      topics.push(t);
      continue;
    }
    //add capitalized nouns...
    if (i !== 0 && t.pos['Noun'] && t.is_capital()) {
      //no dates, or values
      if (t.pos['Value'] || t.pos['Date'] || t.pos['Pronoun']) {
        continue;
      }
      topics.push(t);
    }
  }
  return consolidate(topics);
};

module.exports = spot;

},{}],62:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../../../fns');

//these terms are nicer ways to negate a sentence
//ie. john always walks -> john always doesn't walk
var logical_negate = {
  'everyone': 'no one',
  'everybody': 'nobody',
  'someone': 'no one',
  'somebody': 'nobody',
  // everything:"nothing",
  'always': 'never'
};
//create corrollary
var logical_affirm = fns.reverseObj(logical_negate);
//these are not symmetic
logical_affirm['nobody'] = 'somebody';

var negate = function negate(s) {
  var _loop = function _loop(i) {
    var t = s.terms[i];
    //these verbs are red-herrings
    if (t.pos['Condition'] || t.pos['Quotation']) {
      return 'continue';
    }
    //logical-negations are smoother than verb-negations
    //ie. always -> never
    if (logical_negate[t.normal]) {
      t.changeTo(logical_negate[t.normal]);
      return 'break';
    }
    if (logical_affirm[t.normal]) {
      t.changeTo(logical_affirm[t.normal]);
      return 'break';
    }
    //negate the first verb
    if (t.pos['Verb']) {

      //different rule for i/we/they/you + infinitive
      //that is, 'i walk' -> 'i don\'t walk', not 'I not walk'

      var isPronounAndInfinitive = function isPronounAndInfinitive() {
        if (s.terms[i - 1]) {
          var p = s.terms[i - 1].text;
          return (p === 'i' || p === 'we' || p === 'they' || p === 'you') && t.pos['Infinitive'];
        }
        return false;
      };

      if (isPronounAndInfinitive()) {
        t.changeTo('don\'t ' + t.text);
        return 'break';
      }
      t.negate();
      return 'break';
    }
  };

  _loop2: for (var i = 0; i < s.terms.length; i++) {
    var _ret = _loop(i);

    switch (_ret) {
      case 'continue':
        continue;

      case 'break':
        break _loop2;}
  }

  return;
};

module.exports = negate;

},{"../../../fns":23}],63:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sentence = _dereq_('../sentence.js');
var _negate = _dereq_('./negate/negate.js');

var Statement = function (_Sentence) {
  _inherits(Statement, _Sentence);

  function Statement(str, options) {
    _classCallCheck(this, Statement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Statement).call(this, str, options));
  }

  _createClass(Statement, [{
    key: 'negate',
    value: function negate() {
      _negate(this);
      return this;
    }
  }]);

  return Statement;
}(Sentence);

Statement.fn = Statement.prototype;

module.exports = Statement;

// let s = new Statement('john is a person');
// console.log(s);

},{"../sentence.js":60,"./negate/negate.js":62}],64:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Term = _dereq_('../term.js');

var _to_comparative = _dereq_('./to_comparative');
var _to_superlative = _dereq_('./to_superlative');
var adj_to_adv = _dereq_('./to_adverb');
var adj_to_noun = _dereq_('./to_noun');

var Adjective = function (_Term) {
  _inherits(Adjective, _Term);

  function Adjective(str, tag) {
    _classCallCheck(this, Adjective);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Adjective).call(this, str));

    _this.tag = tag;
    if (tag) {
      _this.pos[tag] = true;
    }
    _this.pos['Adjective'] = true;
    return _this;
  }

  _createClass(Adjective, [{
    key: 'to_comparative',
    value: function to_comparative() {
      return _to_comparative(this.normal);
    }
  }, {
    key: 'to_superlative',
    value: function to_superlative() {
      return _to_superlative(this.normal);
    }
  }, {
    key: 'to_noun',
    value: function to_noun() {
      return adj_to_noun(this.normal);
    }
  }, {
    key: 'to_adverb',
    value: function to_adverb() {
      return adj_to_adv(this.normal);
    }
  }, {
    key: 'conjugate',
    value: function conjugate() {
      return {
        comparative: _to_comparative(this.normal),
        superlative: _to_superlative(this.normal),
        adverb: adj_to_adv(this.normal),
        noun: adj_to_noun(this.normal)
      };
    }
  }, {
    key: 'all_forms',
    value: function all_forms() {
      var forms = this.conjugate();
      forms['normal'] = this.normal;
      return forms;
    }
  }]);

  return Adjective;
}(Term);

Adjective.fn = Adjective.prototype;

//let t = new Adjective("quick")
//console.log(t.all_forms());

module.exports = Adjective;

},{"../term.js":101,"./to_adverb":65,"./to_comparative":66,"./to_noun":67,"./to_superlative":68}],65:[function(_dereq_,module,exports){
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

},{}],66:[function(_dereq_,module,exports){
//turn 'quick' into 'quickly'
'use strict';

var convertables = _dereq_('../../data/convertables.js');

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

  if (convertables.hasOwnProperty(str)) {
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

},{"../../data/convertables.js":3}],67:[function(_dereq_,module,exports){
//convert cute to cuteness
'use strict';

var to_noun = function to_noun(w) {
  var irregulars = {
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

},{}],68:[function(_dereq_,module,exports){
//turn 'quick' into 'quickest'
'use strict';

var convertables = _dereq_('../../data/convertables.js');

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

},{"../../data/convertables.js":3}],69:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Term = _dereq_('../term.js');
var _to_adjective = _dereq_('./to_adjective.js');

var Adverb = function (_Term) {
  _inherits(Adverb, _Term);

  function Adverb(str, tag) {
    _classCallCheck(this, Adverb);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Adverb).call(this, str));

    _this.tag = tag;
    _this.pos['Adverb'] = true;
    return _this;
  }

  _createClass(Adverb, [{
    key: 'to_adjective',
    value: function to_adjective() {
      return _to_adjective(this.normal);
    }
  }, {
    key: 'all_forms',
    value: function all_forms() {
      return {
        adjective: this.to_adjective(),
        normal: this.normal
      };
    }
  }]);

  return Adverb;
}(Term);

Adverb.fn = Adverb.prototype;

//let t = new Adverb("quickly")
//console.log(t.all_forms());

module.exports = Adverb;

},{"../term.js":101,"./to_adjective.js":70}],70:[function(_dereq_,module,exports){
//turns 'quickly' into 'quick'
'use strict';

var to_adjective = function to_adjective(str) {
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

// console.log(to_adjective('quickly') === 'quick')
// console.log(to_adjective('marvelously') === 'marvelous')
module.exports = to_adjective;

},{}],71:[function(_dereq_,module,exports){
'use strict';
//turn "plz"  "please"

var implications = {
  'plz': 'please',
  'tmrw': 'tomorrow',
  'wat': 'what',
  'r': 'are',
  'u': 'you'
};

var implied = function implied(str) {
  if (implications[str]) {
    return implications[str];
  }
  return null;
};

module.exports = implied;

},{}],72:[function(_dereq_,module,exports){
'use strict';

var is_acronym = function is_acronym(str) {
  //like N.D.A
  if (str.match(/([A-Z]\.)+[A-Z]?$/)) {
    return true;
  }
  //like NDA
  if (str.match(/[A-Z]{3}$/)) {
    return true;
  }
  return false;
};
module.exports = is_acronym;

},{}],73:[function(_dereq_,module,exports){
'use strict';

var is_acronym = _dereq_('../is_acronym.js');

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

var indefinite_article = function indefinite_article(str) {
  if (!str) {
    return null;
  }

  //pronounced letters of acronyms that get a 'an'
  var an_acronyms = {
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
  var a_regexs = [/^onc?e/i, //'wu' sound of 'o'
  /^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
  /^eul/i];

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

module.exports = indefinite_article;

// console.log(indefinite_article('N.D.A'));

},{"../is_acronym.js":72}],74:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Noun = _dereq_('../noun.js');
var parse_date = _dereq_('./parse_date.js');

var _Date = function (_Noun) {
  _inherits(_Date, _Noun);

  function _Date(str, tag) {
    _classCallCheck(this, _Date);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_Date).call(this, str));

    _this.tag = tag;
    _this.pos['Date'] = true;
    _this.data = parse_date(_this.text) || {};
    return _this;
  }

  //can we make it a js Date object?


  _createClass(_Date, [{
    key: 'is_date',
    value: function is_date() {
      var o = this.data;
      if (o.month === null || o.day === null || o.year === null) {
        return false;
      }
      return true;
    }
  }, {
    key: 'date',
    value: function date() {
      if (this.is_date() === false) {
        return null;
      }
      var d = new Date();
      if (this.data.year) {
        d.setYear(this.data.year);
      }
      if (this.data.month !== null) {
        d.setMonth(this.data.month);
      }
      if (this.data.day !== null) {
        d.setDate(this.data.day);
      }
      return d;
    }
  }]);

  return _Date;
}(Noun);

_Date.fn = _Date.prototype;

module.exports = _Date;

// let d = new _Date('June 4th 1993');
// console.log(d.date());

},{"../noun.js":80,"./parse_date.js":77}],75:[function(_dereq_,module,exports){
'use strict';

var months = _dereq_('../../../data/dates').months.concat(['march', 'may']); //(march and may are ambiguous grammatically)
var month = '(' + months.join('|') + ')';
var day = '([0-9]{1,2})';
var year = '\'?([12][0-9]{3})';

var rules = [{
  reg: month + ' ' + day + ' ' + year, //'March 1st 1987'
  order: ['month', 'day', 'year']
}, {
  reg: day + ' of ' + month + ' ' + year, //'3rd of March 1969',
  order: ['day', 'month', 'year']
},

//incomplete versions
{
  reg: day + ' of ' + month, //'3rd of March',
  order: ['day', 'month']
}, {
  reg: month + ' ' + year, //'March 1969',
  order: ['month', 'year']
}, {
  reg: month + ' ' + day, //'March 18th',
  order: ['month', 'day']
}, {
  reg: day + ' ' + month, //'18th of March',
  order: ['day', 'month']
}, {
  reg: '' + month, //'january'
  order: ['month']
}, {
  reg: '' + year, //'1998'
  order: ['year']
}].map(function (o) {
  o.reg = new RegExp('\\b' + o.reg + '\\b', '');
  return o;
});
module.exports = rules;

},{"../../../data/dates":5}],76:[function(_dereq_,module,exports){

'use strict';

var dates = _dereq_('../../../data/dates');

//build date regex
var terms = dates.months.concat(dates.days);
var day_reg = '(\\b' + terms.join('\\b|\\b') + '\\b)';
day_reg = new RegExp(day_reg, 'i');
var times_reg = /1?[0-9]:[0-9]{2}/;
var is_date = function is_date(str) {
  if (str.match(day_reg) || str.match(times_reg)) {
    return true;
  }
  //a straight-up year, like '2016'
  if (str.match(/^[12][0-9]{3}$/)) {
    var n = parseInt(str, 10);
    if (n > 1300 && n < 2100) {
      return true;
    }
  }
  return false;
};

module.exports = is_date;

// console.log(is_date('2015'));

},{"../../../data/dates":5}],77:[function(_dereq_,module,exports){
'use strict';
// #generates properly-formatted dates from free-text date forms
// #by spencer kelly 2015

var to_number = _dereq_('../value/parse/to_number.js');
//regexes to top-parse
var rules = _dereq_('./date_rules.js');

//return integers from strings
var wrangle = {

  year: function year(s) {
    var num = s.match(/[0-9]+/);
    num = parseInt(num, 10);
    if (!num || num > 2900 || num < 0) {
      return null;
    }
    //honestly, prob not a year either
    if (num > 100 && num < 1000) {
      return null;
    }
    //'20BC' becomes -20
    if (s.match(/[0-9] ?bc/i)) {
      return num *= -1;
    }
    // '98 becomes 1998
    if (num < 100 && num > 30) {
      num += 1900;
    }
    return num;
  },

  month: function month(s) {
    //0 based months, 1 based days...
    var months_obj = {
      january: 0,
      february: 1,
      march: 2,
      april: 3,
      may: 4,
      june: 5,
      july: 6,
      august: 7,
      september: 8,
      october: 9,
      november: 10,
      december: 11,
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      sept: 8,
      oct: 9,
      nov: 10,
      dec: 11
    };
    return months_obj[s];
  },

  day: function day(s) {
    var n = to_number(s) || parseInt(s, 10);
    if (n < 0 || n > 31) {
      return null;
    }
    return n;
  }
};

//cleanup string
var preprocess = function preprocess(str) {
  str = str.toLowerCase();
  str = str.replace(/([0-9]+)(nd|rd|th|st)/i, '$1');
  var words = str.split(' ').map(function (w) {
    if (!w.match(/[0-9]/)) {
      return to_number(w) || w;
    }
    return w;
  });
  return words.join(' ');
};

var date_parser = function date_parser(str) {
  str = preprocess(str);
  var result = {
    year: null,
    month: null,
    day: null
  };
  for (var i = 0; i < rules.length; i++) {
    if (str.match(rules[i].reg)) {
      var m = str.match(rules[i].reg);
      for (var o = 0; o < rules[i].order.length; o++) {
        var type = rules[i].order[o];
        result[type] = wrangle[type](m[o + 1]);
      }
      break;
    }
  }
  return result;
};
module.exports = date_parser;
// console.log(wrangle.year('1998'));
// console.log(date_parser('March 1st 1987'));
// console.log(date_extractor('june second 1999'));

},{"../value/parse/to_number.js":97,"./date_rules.js":75}],78:[function(_dereq_,module,exports){
'use strict';

var irregulars = _dereq_('../../data/irregular_nouns');

//similar to plural/singularize rules, but not the same
var plural_indicators = [/(^v)ies$/i, /ises$/i, /ives$/i, /(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /(buffal|tomat|tornad)oes$/i, /(analy|ba|diagno|parenthe|progno|synop|the)ses$/i, /(vert|ind|cort)ices$/i, /(matr|append)ices$/i, /(x|ch|ss|sh|s|z|o)es$/i, /men$/i, /news$/i, /.tia$/i, /(^f)ves$/i, /(lr)ves$/i, /(^aeiouy|qu)ies$/i, /(m|l)ice$/i, /(cris|ax|test)es$/i, /(alias|status)es$/i, /ics$/i];

//similar to plural/singularize rules, but not the same
var singular_indicators = [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i];

var is_plural = function is_plural(str) {
  str = (str || '').toLowerCase();
  //handle 'mayors of chicago'
  var preposition = str.match(/([a-z]*) (of|in|by|for) [a-z]/);
  if (preposition && preposition[1]) {
    str = preposition[1];
  }
  // if it's a known irregular case
  for (var i = 0; i < irregulars.length; i++) {
    if (irregulars[i][1] === str) {
      return true;
    }
    if (irregulars[i][0] === str) {
      return false;
    }
  }
  for (var _i = 0; _i < plural_indicators.length; _i++) {
    if (str.match(plural_indicators[_i])) {
      return true;
    }
  }
  for (var _i2 = 0; _i2 < singular_indicators.length; _i2++) {
    if (str.match(singular_indicators[_i2])) {
      return false;
    }
  }
  // some 'looks pretty plural' rules
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

module.exports = is_plural;

},{"../../data/irregular_nouns":10}],79:[function(_dereq_,module,exports){
//uncountables are words that shouldn't ever inflect, for metaphysical reasons, like 'peace'
'use strict';

var uncountable_arr = _dereq_('../../data/uncountables.js');

var uncountable = uncountable_arr.reduce(function (h, a) {
  h[a] = true;
  return h;
}, {});

var is_uncountable = function is_uncountable(str) {
  if (uncountable[str]) {
    return true;
  }
  return false;
};
// console.log(is_uncountable("peace") === true)
// console.log(is_uncountable("dog") === false)
module.exports = is_uncountable;

},{"../../data/uncountables.js":21}],80:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Term = _dereq_('../term.js');
var _article = _dereq_('./article.js');
var _is_plural = _dereq_('./is_plural.js');
var _is_place = _dereq_('./place/is_place.js');
var _is_person = _dereq_('./person/is_person.js');
var _pronoun = _dereq_('./pronoun.js');
var _is_value = _dereq_('./value/is_value.js');
var _is_date = _dereq_('./date/is_date.js');
var _is_organization = _dereq_('./organization/is_organization.js');
var _singularize = _dereq_('./singularize.js');
var _pluralize = _dereq_('./pluralize.js');
var _is_uncountable = _dereq_('./is_uncountable.js');

var Noun = function (_Term) {
  _inherits(Noun, _Term);

  function Noun(str, tag) {
    _classCallCheck(this, Noun);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Noun).call(this, str));

    _this.tag = tag;
    _this.pos['Noun'] = true;
    if (tag) {
      _this.pos[tag] = true;
    }
    if (_this.is_plural()) {
      _this.pos['Plural'] = true;
    }
    return _this;
  }
  //noun methods


  _createClass(Noun, [{
    key: 'article',
    value: function article() {
      //if it's a person, it's he/she, not a/an
      if (this.pos['Person']) {
        return this.pronoun();
      }
      //groups of people are 'they'
      if (this.pos['Organization']) {
        return 'they';
      }
      return _article(this.text);
    }
  }, {
    key: 'root',
    value: function root() {
      return this.singularize();
    }
  }, {
    key: 'pronoun',
    value: function pronoun() {
      if (this.is_organization() || this.is_place() || this.is_value()) {
        return 'it';
      }
      return _pronoun(this.normal);
    }
  }, {
    key: 'is_plural',
    value: function is_plural() {
      if (this.pos['Date'] || this.pos['Possessive']) {
        return false;
      } else if (this.has_abbreviation()) {
        //contractions & possessives are not plural
        return false;
      } else {
        return _is_plural(this.normal);
      }
    }
  }, {
    key: 'is_uncountable',
    value: function is_uncountable() {
      return _is_uncountable(this.strip_apostrophe());
    }
  }, {
    key: 'pluralize',
    value: function pluralize() {
      return _pluralize(this.strip_apostrophe());
    }
  }, {
    key: 'singularize',
    value: function singularize() {
      return _singularize(this.strip_apostrophe());
    }
    //sub-classes

  }, {
    key: 'is_person',
    value: function is_person() {
      //don't overwrite dates, etc
      if (this.pos['Date']) {
        return false;
      }
      return _is_person(this.strip_apostrophe());
    }
  }, {
    key: 'is_organization',
    value: function is_organization() {
      //don't overwrite urls
      if (this.pos['Url']) {
        return false;
      }
      return _is_organization(this.strip_apostrophe(), this.text);
    }
  }, {
    key: 'is_date',
    value: function is_date() {
      return _is_date(this.strip_apostrophe());
    }
  }, {
    key: 'is_value',
    value: function is_value() {
      //don't overwrite dates, etc
      if (this.pos['Date'] || this.pos['HashTag']) {
        return false;
      }
      return _is_value(this.strip_apostrophe());
    }
  }, {
    key: 'is_place',
    value: function is_place() {
      return _is_place(this.strip_apostrophe());
    }
  }, {
    key: 'all_forms',
    value: function all_forms() {
      return {
        'singular': this.singularize(),
        'plural': this.pluralize(),
        'normal': this.normal
      };
    }
  }]);

  return Noun;
}(Term);

Noun.fn = Noun.prototype;

module.exports = Noun;

//let t = new Noun('mouse');
//console.log(t.all_forms());

},{"../term.js":101,"./article.js":73,"./date/is_date.js":76,"./is_plural.js":78,"./is_uncountable.js":79,"./organization/is_organization.js":81,"./person/is_person.js":84,"./place/is_place.js":87,"./pluralize.js":89,"./pronoun.js":90,"./singularize.js":91,"./value/is_value.js":94}],81:[function(_dereq_,module,exports){
'use strict';

var abbreviations = _dereq_('../../../data/abbreviations');
var org_data = _dereq_('../../../data/organizations');

//some boring capitalised acronyms you see frequently
var blacklist = {
  url: true,
  http: true,
  wtf: true,
  irl: true,
  ie: true,
  eg: true,
  gps: true,
  dna: true,
  sms: true };

//words like 'co' and ltd
var org_suffix = abbreviations.orgs.reduce(function (h, s) {
  h[s] = true;
  return h;
}, {});
org_data.suffixes.forEach(function (s) {
  //a few more
  org_suffix[s] = true;
});

//named orgs like google and nestle
var org_names = org_data.organizations.reduce(function (h, s) {
  h[s] = true;
  return h;
}, {});

var is_organization = function is_organization(str, text) {
  text = text || '';
  //blacklist some boring ones
  if (blacklist[str]) {
    return false;
  }
  //some known organizations, like microsoft
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
  if (str.match(/[a-z]{3}\.(com|net|org|biz)/)) {
    //not a perfect url regex, but a "org.com"
    return true;
  }
  // "foobar inc."
  var words = str.split(' ');
  if (words.length > 1) {
    var last = words[words.length - 1];
    if (org_suffix[last]) {
      return true;
    }
  }

  return false;
};

module.exports = is_organization;

// console.log(is_organization('Captain of Jamaica'));

},{"../../../data/abbreviations":1,"../../../data/organizations":17}],82:[function(_dereq_,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Noun = _dereq_('../noun.js');

var Organization = function (_Noun) {
  _inherits(Organization, _Noun);

  function Organization(str, tag) {
    _classCallCheck(this, Organization);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Organization).call(this, str));

    _this.tag = tag;
    _this.pos['Organization'] = true;

    return _this;
  }

  return Organization;
}(Noun);

Organization.fn = Organization.prototype;
module.exports = Organization;

},{"../noun.js":80}],83:[function(_dereq_,module,exports){
'use strict';

var firstnames = _dereq_('../../../data/firstnames').all;
var parse_name = _dereq_('./parse_name.js');

var gender = function gender(normal) {
  if (normal === 'he') {
    return 'Male';
  }
  if (normal === 'she') {
    return 'Female';
  }
  var o = parse_name(normal);
  var firstName = o.firstName;
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
  if (normal.match(/\b(mr|mister|sr|sir|jr)\b/i)) {
    return 'Male';
  }
  //female honourifics
  if (normal.match(/^(mrs|miss|ms|misses|mme|mlle)\.? /i)) {
    return 'Female';
  }
  //statistical guesses
  if (firstName.match(/.(i|ee|[a|e]y|a)$/i)) {
    //this is almost-always true
    return 'Female';
  }
  if (firstName.match(/[ou]$/i)) {
    //if it ends in a 'oh or uh', male
    return 'Male';
  }
  if (firstName.match(/(nn|ll|tt)/i)) {
    //if it has double-consonants, female
    return 'Female';
  }
  // name not recognized, or recognized as of indeterminate gender
  return null;
};
module.exports = gender;

// console.log(gender('john', 'john') === 'Male');
// console.log(gender('jane smith', 'jane') === 'Female');
// console.log(gender('jan smith', 'jan') === null);

},{"../../../data/firstnames":7,"./parse_name.js":85}],84:[function(_dereq_,module,exports){
'use strict';

var firstnames = _dereq_('../../../data/firstnames').all;
var honourifics = _dereq_('../../../data/honourifics').reduce(function (h, s) {
  h[s] = true;
  return h;
}, {});

//these pronouns are people
var whitelist = {
  'he': true,
  'she': true,
  'i': true,
  'you': true
};
var is_person = function is_person(str) {
  if (whitelist[str] || firstnames[str]) {
    return true;
  }
  var words = str.split(' ');
  if (words.length > 1) {
    var first = words[0];
    if (honourifics[first] || firstnames[first]) {
      return true;
    }
  }
  //check middle initial - "phil k dick"
  if (words.length > 2) {
    if (words[0].length > 1 && words[2].length > 1) {
      if (words[1].match(/^[a-z]\.?$/)) {
        return true;
      }
    }
  }
  return false;
};

module.exports = is_person;

// console.log(is_person('Illi Danza'));

},{"../../../data/firstnames":7,"../../../data/honourifics":9}],85:[function(_dereq_,module,exports){
'use strict';

var firstnames = _dereq_('../../../data/firstnames').all;
var honourifics = _dereq_('../../../data/honourifics').reduce(function (h, s) {
  h[s] = true;
  return h;
}, {});

//str is a normalized string
//str_orig is original text [optional]
var parse_name = function parse_name(str, str_orig) {

  var words = str.split(' ');
  var o = {
    honourific: null,
    firstName: null,
    middleName: null,
    lastName: null
  };

  var double_firstname = 0; //assuming no

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
    //is it a double name like Ann-Marie?
    if (firstnames[words[1]] && str_orig && words.length > 1 && (str_orig.indexOf(' ') > str_orig.indexOf('-') || str_orig.indexOf(' ') === -1)) {
      o.firstName += '-' + words[1];
      words = words.slice(1, words.length);
      double_firstname = str_orig.indexOf('-'); // > 0
    }
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
  //is it a double surname?
  if (str_orig && str_orig.lastIndexOf('-') > double_firstname) {
    if (words[words.length - 2]) {
      o.lastName = words[words.length - 2] + '-' + words[words.length - 1].replace(/'s$/, '');
      words = words.slice(0, words.length - 2);
    }
  } else if (words[words.length - 1]) {
    o.lastName = words[words.length - 1].replace(/'s$/, '');
    words = words.slice(0, words.length - 1);
  }
  o.middleName = words.join(' ');
  return o;
};

module.exports = parse_name;

},{"../../../data/firstnames":7,"../../../data/honourifics":9}],86:[function(_dereq_,module,exports){
// not all cultures use the firstname-lastname practice. this does make some assumptions.
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Noun = _dereq_('../noun.js');
var guess_gender = _dereq_('./gender.js');
var parse_name = _dereq_('./parse_name.js');

//capitalizes first letter of every word in a string
var title_case = function title_case(s) {
  if (!s) {
    return s;
  }
  s = s.replace(/(^\w|-\w| \w)/g, function (v) {
    return v.toUpperCase();
  });
  return s;
};

//capitalizes last name taking into account Mc-, Mac-, O'-
var lastname_case = function lastname_case(s) {
  if (!s) {
    return s;
  }

  s = title_case(s);
  s = s.replace(/(Mc|Mac|O\')(\w)/g, function (v) {
    return v.replace(/\w$/, function (w) {
      return w.toUpperCase();
    });
  });
  return s;
};

var Person = function (_Noun) {
  _inherits(Person, _Noun);

  function Person(str, tag) {
    _classCallCheck(this, Person);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Person).call(this, str));

    _this.tag = tag;
    _this.pos['Person'] = true;
    _this.honourific = null;
    _this.firstName = null;
    _this.middleName = null;
    _this.lastName = null;
    _this.parse();
    if (_this.isPronoun()) {
      _this.pos['Pronoun'] = true;
    }
    if (tag) {
      _this.pos[tag] = true;
    }
    return _this;
  }

  _createClass(Person, [{
    key: 'isPronoun',
    value: function isPronoun() {
      var whitelist = {
        'he': true,
        'she': true,
        'i': true,
        'you': true
      };
      return whitelist[this.normal];
    }

    //proper normalised name without the cruft

  }, {
    key: 'root',
    value: function root() {
      if (this.isPronoun()) {
        return this.normal;
      }
      var str = '';

      if (this.firstName) {
        str = this.firstName.toLowerCase();
      }
      if (this.middleName) {
        str += ' ' + this.middleName.toLowerCase();
      }
      if (this.lastName) {
        str += ' ' + this.lastName.toLowerCase();
      }
      return str.trim() || this.normal;
    }

    //turn a multi-word string into [first, middle, last, honourific]

  }, {
    key: 'parse',
    value: function parse() {
      var o = parse_name(this.normal, this.text.trim());
      this.honourific = o.honourific;
      this.firstName = title_case(o.firstName);
      this.middleName = title_case(o.middleName);
      this.lastName = lastname_case(o.lastName);
    }
  }, {
    key: 'gender',
    value: function gender() {
      //if we already know it, from the lexicon
      if (this.pos.FemalePerson) {
        return 'Female';
      }
      if (this.pos.MalePerson) {
        return 'Male';
      }
      return guess_gender(this.normal);
    }
  }, {
    key: 'pronoun',
    value: function pronoun() {
      var pronouns = {
        Male: 'he',
        Female: 'she'
      };
      var gender = this.gender();
      //return 'singular they' if no gender is found
      return pronouns[gender] || 'they';
    }
  }]);

  return Person;
}(Noun);

Person.fn = Person.prototype;
module.exports = Person;
/*
let p = new Person('Jani-Lee K. o\'brien-macneil');
console.log(p);
let z = new Person('Mary-Jane Willson-Johnson');
console.log(z);*/

},{"../noun.js":80,"./gender.js":83,"./parse_name.js":85}],87:[function(_dereq_,module,exports){
'use strict';

var places = _dereq_('../../../data/places');
var abbreviations = _dereq_('../../../data/abbreviations');

//add Country names
var isPlace = places.countries.reduce(function (h, s) {
  h[s] = true;
  return h;
}, {});
//add City names
places.cities.forEach(function (s) {
  isPlace[s] = true;
});
//add airports
places.airports.forEach(function (s) {
  isPlace[s] = true;
});
//add place abbreviations names
abbreviations.places.forEach(function (s) {
  isPlace[s] = true;
});

//these are signals too
var firstwords = ['west', 'east', 'nort', 'south', 'western', 'eastern', 'nortern', 'southern', 'mount'].reduce(function (h, s) {
  h[s] = true;
  return h;
}, {});

var lastwords = ['city', 'town', 'county', 'village', 'province', 'country', 'state', 'province', 'mountain', 'river', 'valley', 'park', 'avenue', 'street', 'road'].reduce(function (h, s) {
  h[s] = true;
  return h;
}, {});

var is_place = function is_place(str) {
  var words = str.split(' ');

  if (words.length > 1) {
    //first words, like 'eastern'
    if (firstwords[words[0]]) {
      return true;
    }
    //last words, like 'mountain'
    if (lastwords[words[words.length - 1]]) {
      return true;
    }
  }
  for (var i = 0; i < words.length; i++) {
    if (isPlace[words[i]]) {
      return true;
    }
  }

  return false;
};

module.exports = is_place;

},{"../../../data/abbreviations":1,"../../../data/places":19}],88:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Noun = _dereq_('../noun.js');
var places = _dereq_('../../../data/places.js');
var fns = _dereq_('../../../fns.js');
//make cities/countries easy to lookup
var countries = fns.toObj(places.countries);
var cities = fns.toObj(places.cities);

var Place = function (_Noun) {
  _inherits(Place, _Noun);

  function Place(str, tag) {
    _classCallCheck(this, Place);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Place).call(this, str));

    _this.tag = tag;
    _this.pos['Place'] = true;
    _this.pos[tag] = true;
    _this.title = null;
    _this.city = null;
    _this.region = null; //'2nd-tier' (state/province/county/whatever)
    _this.country = null;
    _this.parse();
    return _this;
  }

  _createClass(Place, [{
    key: 'root',
    value: function root() {
      return this.title || this.normal;
    }
  }, {
    key: 'parse',
    value: function parse() {
      //parse a comma-described place like "toronto, ontario"
      var terms = this.strip_apostrophe().split(' ');
      this.title = terms[0];
      for (var i = 1; i < terms.length; i++) {
        var t = terms[i];
        if (cities[t]) {
          this.city = fns.titlecase(t);
        } else if (countries[t]) {
          this.country = fns.titlecase(t);
        } else if (this.city !== null) {
          //if we already got the city..
          this.region = fns.titlecase(t);
        } else {
          //it's part of the title
          this.title += ' ' + t;
        }
      }
    }
  }]);

  return Place;
}(Noun);
Place.fn = Place.prototype;
module.exports = Place;

// console.log(new Place('Toronto, Ontario, Canada'));

},{"../../../data/places.js":19,"../../../fns.js":23,"../noun.js":80}],89:[function(_dereq_,module,exports){
'use strict';

var is_uncountable = _dereq_('./is_uncountable.js');
var irregulars = _dereq_('../../data/irregular_nouns.js');
var is_plural = _dereq_('./is_plural.js');
var fns = _dereq_('../../fns.js');

var pluralize_rules = [[/(ax|test)is$/i, '$1es'], [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i'], [/(octop|vir)i$/i, '$1i'], [/(kn|l|w)ife$/i, '$1ives'], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)f$/i, '$1ves'], [/^(dwar|handkerchie|hoo|scar|whar)f$/i, '$1ves'], [/(alias|status)$/i, '$1es'], [/(bu)s$/i, '$1ses'], [/(al|ad|at|er|et|ed|ad)o$/i, '$1oes'], [/([ti])um$/i, '$1a'], [/([ti])a$/i, '$1a'], [/sis$/i, 'ses'], [/(hive)$/i, '$1s'], [/([^aeiouy]|qu)y$/i, '$1ies'], [/(x|ch|ss|sh|s|z)$/i, '$1es'], [/(matr|vert|ind|cort)(ix|ex)$/i, '$1ices'], [/([m|l])ouse$/i, '$1ice'], [/([m|l])ice$/i, '$1ice'], [/^(ox)$/i, '$1en'], [/^(oxen)$/i, '$1'], [/(quiz)$/i, '$1zes'], [/(antenn|formul|nebul|vertebr|vit)a$/i, '$1ae'], [/(sis)$/i, 'ses'], [/^(?!talis|.*hu)(.*)man$/i, '$1men'], [/(.*)/i, '$1s']].map(function (a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

var pluralize = function pluralize(str) {
  var low = str.toLowerCase();
  //uncountable
  if (is_uncountable(low)) {
    //uncountables shouldn't ever inflect
    return str;
  }
  //is it already plural?
  if (is_plural(low) === true) {
    return str;
  }
  //irregular
  var found = irregulars.filter(function (r) {
    return r[0] === low;
  });
  if (found[0]) {
    if (fns.titlecase(low) === str) {
      //handle capitalisation properly
      return fns.titlecase(found[0][1]);
    }
    return found[0][1];
  }
  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    var first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];
    if (first) {
      var better_first = pluralize(first);
      return better_first + str.replace(first, '');
    }
  }
  //regular
  for (var i = 0; i < pluralize_rules.length; i++) {
    if (str.match(pluralize_rules[i].reg)) {
      return str.replace(pluralize_rules[i].reg, pluralize_rules[i].repl);
    }
  }
  return null;
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

},{"../../data/irregular_nouns.js":10,"../../fns.js":23,"./is_plural.js":78,"./is_uncountable.js":79}],90:[function(_dereq_,module,exports){
'use strict';

var is_person = _dereq_('./person/is_person.js');
var is_plural = _dereq_('./is_plural.js');
var gender = _dereq_('./person/gender.js');

var pronoun = function pronoun(str) {
  if (is_person(str)) {
    var g = gender(str);
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

},{"./is_plural.js":78,"./person/gender.js":83,"./person/is_person.js":84}],91:[function(_dereq_,module,exports){
'use strict';

var is_uncountable = _dereq_('./is_uncountable.js');
var irregulars = _dereq_('../../data/irregular_nouns.js');
var is_plural = _dereq_('./is_plural.js');
var fns = _dereq_('../../fns.js');

var singularize_rules = [[/([^v])ies$/i, '$1y'], [/ises$/i, 'isis'], [/(kn|[^o]l|w)ives$/i, '$1ife'], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)ves$/i, '$1f'], [/^(dwar|handkerchie|hoo|scar|whar)ves$/i, '$1f'], [/(antenn|formul|nebul|vertebr|vit)ae$/i, '$1a'], [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, '$1us'], [/(buffal|tomat|tornad)(oes)$/i, '$1o'], [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1sis'], [/(vert|ind|cort)(ices)$/i, '$1ex'], [/(matr|append)(ices)$/i, '$1ix'], [/(x|ch|ss|sh|s|z|o)es$/i, '$1'], [/men$/i, 'man'], [/(n)ews$/i, '$1ews'], [/([ti])a$/i, '$1um'], [/([^aeiouy]|qu)ies$/i, '$1y'], [/(s)eries$/i, '$1eries'], [/(m)ovies$/i, '$1ovie'], [/([m|l])ice$/i, '$1ouse'], [/(cris|ax|test)es$/i, '$1is'], [/(alias|status)es$/i, '$1'], [/(ss)$/i, '$1'], [/(ics)$/i, '$1'], [/s$/i, '']].map(function (a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

var singularize = function singularize(str) {
  var low = str.toLowerCase();
  //uncountable
  if (is_uncountable(low)) {
    return str;
  }
  //is it already singular?
  if (is_plural(low) === false) {
    return str;
  }
  //irregular
  var found = irregulars.filter(function (r) {
    return r[1] === low;
  });
  if (found[0]) {
    if (fns.titlecase(low) === str) {
      //handle capitalisation properly
      return fns.titlecase(found[0][0]);
    }
    return found[0][0];
  }
  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    var first = str.match(/^([a-z]*) (of|in|by|for) [a-z]/);
    if (first && first[1]) {
      var better_first = singularize(first[1]);
      return better_first + str.replace(first[1], '');
    }
  }
  //regular
  for (var i = 0; i < singularize_rules.length; i++) {
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

},{"../../data/irregular_nouns.js":10,"../../fns.js":23,"./is_plural.js":78,"./is_uncountable.js":79}],92:[function(_dereq_,module,exports){
'use strict';
//parse a url into components, in 'loose' mode
//taken from   http://locutus.io/php/url/parse_url/

var parse_url = function parse_url(str) {
  // eslint-disable-line camelcase
  var key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'];
  var reg = new RegExp(['(?:(?![^:@]+:[^:@\\/]*@)([^:\\/?#.]+):)?', '(?:\\/\\/\\/?)?', '((?:(([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?)', '(((\\/(?:[^?#](?![^?#\\/]*\\.[^?#\\/.]+(?:[?#]|$)))*\\/?)?([^?#\\/]*))', '(?:\\?([^#]*))?(?:#(.*))?)'].join(''));
  var m = reg.exec(str);
  var uri = {};
  var i = 14;
  while (i--) {
    if (m[i]) {
      uri[key[i]] = m[i];
    }
  }
  return uri;
};

module.exports = parse_url;
// console.log(parse_url('http://fun.domain.com/fun?foo=bar'));

},{}],93:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Noun = _dereq_('../noun');
var parse_url = _dereq_('./parse_url');

var Url = function (_Noun) {
  _inherits(Url, _Noun);

  function Url(str, tag) {
    _classCallCheck(this, Url);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Url).call(this, str));

    _this.tag = tag;
    _this.pos['Url'] = true;
    _this.parsed = _this.parse();
    _this.normal = _this.parsed.host || str;
    _this.normal = _this.normal.replace(/^www\./, '');
    return _this;
  }

  _createClass(Url, [{
    key: 'parse',
    value: function parse() {
      return parse_url(this.text);
    }
  }]);

  return Url;
}(Noun);

Url.fn = Url.prototype;
module.exports = Url;
// console.log(new Url('http://fun.domain.com/fun?foo=bar'));

},{"../noun":80,"./parse_url":92}],94:[function(_dereq_,module,exports){
'use strict';

var nums = _dereq_('../../../data/numbers.js');
var is_date = _dereq_('../date/is_date');

var is_value = function is_value(str) {
  var words = str.split(' ');
  //'january 5' is not a value
  if (is_date(str)) {
    return false;
  }
  for (var i = 0; i < words.length; i++) {
    var w = words[i];
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

},{"../../../data/numbers.js":16,"../date/is_date":76}],95:[function(_dereq_,module,exports){
'use strict';
// handle 'nine point eight four'

var nums = _dereq_('../../../../data/numbers.js');
var fns = _dereq_('../../../../fns');
var ones = {};
ones = fns.extend(ones, nums.ones);
ones = fns.extend(ones, nums.teens);
ones = fns.extend(ones, nums.ordinal_ones);
ones = fns.extend(ones, nums.ordinal_teens);

//concatenate into a string with leading '0.'
var decimals = function decimals(words) {
  var str = '0.';
  for (var i = 0; i < words.length; i++) {
    var w = words[i];
    if (ones[w]) {
      str += ones[w];
    } else {
      return 0;
    }
  }
  return parseFloat(str);
};

module.exports = decimals;

},{"../../../../data/numbers.js":16,"../../../../fns":23}],96:[function(_dereq_,module,exports){
'use strict';

//support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5

var find_modifiers = function find_modifiers(str) {
  var mults = [{
    reg: /^(minus|negative)[\s\-]/i,
    mult: -1
  }, {
    reg: /^(a\s)?half[\s\-](of\s)?/i,
    mult: 0.5
  }, {
    reg: /^(a\s)?quarter[\s\-]/i,
    mult: 0.25
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

module.exports = find_modifiers;

},{}],97:[function(_dereq_,module,exports){
'use strict';
// Spoken numbers take the following format
// [sixty five] (thousand) [sixty five] (hundred) [sixty five]
// aka: [one/teen/ten] (multiple) [one/teen/ten] (multiple) ...

var nums = _dereq_('../../../../data/numbers.js');
var fns = _dereq_('../../../../fns.js');
var find_modifiers = _dereq_('./modifiers.js');
var parse_decimals = _dereq_('./decimals.js');

var ones = {};
var teens = {};
var tens = {};
var multiples = {};
ones = fns.extend(ones, nums.ones);
ones = fns.extend(ones, nums.ordinal_ones);

teens = fns.extend(teens, nums.teens);
teens = fns.extend(teens, nums.ordinal_teens);

tens = fns.extend(tens, nums.tens);
tens = fns.extend(tens, nums.ordinal_tens);

multiples = fns.extend(multiples, nums.multiples);
multiples = fns.extend(multiples, nums.ordinal_multiples);

var normalize = function normalize(s) {
  //pretty-printed numbers
  s = s.replace(/, ?/g, '');
  s = s.replace(/([a-z])-([a-z])/gi, '$1 $2');
  //parse-out currency
  s = s.replace(/[$£€]/, '');
  s = s.replace(/[\$%\(\)~,]/g, '');
  s = s.trim();
  return s;
};

var section_sum = function section_sum(obj) {
  return Object.keys(obj).reduce(function (sum, k) {
    sum += obj[k];
    return sum;
  }, 0);
};

//prevent things like 'fifteen ten', and 'five sixty'
var appropriate = function appropriate(w, has) {
  if (ones[w]) {
    if (has.ones || has.teens) {
      return false;
    }
  } else if (teens[w]) {
    if (has.ones || has.teens || has.tens) {
      return false;
    }
  } else if (tens[w]) {
    if (has.ones || has.teens || has.tens) {
      return false;
    }
  }
  return true;
};

var to_number = function to_number(str) {
  //try to fail-fast
  if (!str || typeof str === 'number') {
    return str;
  }
  str = normalize(str);
  var modifier = find_modifiers(str);
  str = modifier.str;
  var biggest_yet = 0;
  var has = {};
  var sum = 0;
  var isNegative = false;
  var words = str.split(' ');
  for (var i = 0; i < words.length; i++) {
    var w = words[i];
    if (!w || w === 'and') {
      continue;
    }
    if (w === "-" || w === "negative") {
      isNegative = true;
      continue;
    }
    if (w.startsWith("-")) {
      isNegative = true;
      w = w.substr(1);
    }
    //decimal mode
    if (w === 'point') {
      sum += section_sum(has);
      sum += parse_decimals(words.slice(i + 1, words.length));
      sum *= modifier.amount;
      return sum;
    }
    //maybe it's just a number typed as a string
    if (w.match(/^[0-9,\. ]+$/)) {
      sum += parseFloat(w.replace(/[, ]/g, '')) || 0;
      continue;
    }
    //improper fraction
    var improperFractionMatch = w.match(/^([0-9,\. ]+)\/([0-9,\. ]+)$/);
    if (improperFractionMatch) {
      var num = parseFloat(improperFractionMatch[1].replace(/[, ]/g, ''));
      var denom = parseFloat(improperFractionMatch[2].replace(/[, ]/g, ''));
      sum += num / denom || 0;
      continue;
    }
    //prevent mismatched units, like 'seven eleven'
    if (!appropriate(w, has)) {
      return null;
    }
    //collect 'has' values
    if (ones[w]) {
      has['ones'] = ones[w];
    } else if (teens[w]) {
      has['teens'] = teens[w];
    } else if (tens[w]) {
      has['tens'] = tens[w];
    } else if (multiples[w]) {
      //something has gone wrong : 'two hundred five hundred'
      if (multiples[w] === biggest_yet) {
        return null;
      }
      //if it's the biggest yet, multiply the whole sum - eg 'five hundred thousand'
      if (multiples[w] > biggest_yet) {
        biggest_yet = multiples[w];
        sum += section_sum(has);
        sum = (sum || 1) * multiples[w];
      } else {
        //it's smaller, so only multiply section_sum - eg 'five thousand one hundred'
        sum += (section_sum(has) || 1) * multiples[w];
      }
      //reset our section
      has = {};
    }
  }
  //dump the remaining has values
  sum += section_sum(has);
  //post-process add modifier
  sum *= modifier.amount;
  sum *= isNegative ? -1 : 1;
  return sum;
};

module.exports = to_number;

// console.log(to_number('half a million'));

},{"../../../../data/numbers.js":16,"../../../../fns.js":23,"./decimals.js":95,"./modifiers.js":96}],98:[function(_dereq_,module,exports){
'use strict';
// const nums = require('../../../data/numbers.js');
// const fns = require('../../../fns.js');

var ones_mapping = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tens_mapping = [['ninety', 90], ['eighty', 80], ['seventy', 70], ['sixty', 60], ['fifty', 50], ['forty', 40], ['thirty', 30], ['twenty', 20]];

var sequence = [[1000000000, 'million'], [100000000, 'hundred million'], [1000000, 'million'], [100000, 'hundred thousand'], [1000, 'thousand'], [100, 'hundred'], [1, 'one']];

//turn number into an array of magnitudes
var breakdown_magnitudes = function breakdown_magnitudes(num) {
  var working = num;
  var have = [];
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
  var str = '';
  for (var i = 0; i < tens_mapping.length; i++) {
    if (num >= tens_mapping[i][1]) {
      num -= tens_mapping[i][1];
      str += ' ' + tens_mapping[i][0];
    }
  }
  //(hopefully) we should only have 20-0 now
  if (ones_mapping[num]) {
    str += ' ' + ones_mapping[num];
  }
  return str.trim();
};

var to_text = function to_text(num) {
  var isNegative = false;
  if (num < 0) {
    isNegative = true;
    num = Math.abs(num);
  }
  //break-down into units, counts
  var units = breakdown_magnitudes(num);
  //build-up the string from its components
  var str = '';
  for (var i = 0; i < units.length; i++) {
    var unit_name = units[i].unit;
    if (unit_name === 'one') {
      unit_name = '';
      //put an 'and' in here
      if (str.length > 1) {
        str += ' and';
      }
    }
    str += ' ' + breakdown_hundred(units[i].count) + ' ' + unit_name;
  }
  str = str || 'zero';
  str = str.replace(/ +/g, ' ');
  str = str.trim();
  if (isNegative) {
    str = 'negative ' + str;
  }
  return str;
};

module.exports = to_text;

// console.log(to_text(-5));

},{}],99:[function(_dereq_,module,exports){
'use strict';

var money = _dereq_('../../../data/currencies').reduce(function (h, s) {
  h[s] = 'currency';
  return h;
}, {});

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
    'cp': 'cup',
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
    'feet': 'foot',
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
    'ton': 'tonne',
    'st': 'stone'
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
    'ca': 'centiare',
    'mile²': 'square mile',
    'mile2': 'square mile',
    'in²': 'square inch',
    'in2': 'square inch',
    'yd²': 'square yard',
    'yd2': 'square yard',
    'ft²': 'square foot',
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
    'bar': 'bar',
    'w': 'watt',
    'n': 'newton',
    'wb': 'weber',
    't': 'tesla',
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
  },
  'Money': money
};

module.exports = Object.keys(units).reduce(function (h, k) {
  Object.keys(units[k]).forEach(function (u) {
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

},{"../../../data/currencies":4}],100:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Noun = _dereq_('../noun');
var to_number = _dereq_('./parse/to_number');
var to_text = _dereq_('./to_text');
var units = _dereq_('./units');
var nums = _dereq_('../../../data/numbers');
var fns = _dereq_('../../../fns');
//get an array of ordinal (first, second...) numbers
var ordinals = {};
ordinals = fns.extend(ordinals, nums.ordinal_ones);
ordinals = fns.extend(ordinals, nums.ordinal_teens);
ordinals = fns.extend(ordinals, nums.ordinal_tens);
ordinals = fns.extend(ordinals, nums.ordinal_multiples);
ordinals = Object.keys(ordinals);

var Value = function (_Noun) {
  _inherits(Value, _Noun);

  function Value(str, tag) {
    _classCallCheck(this, Value);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Value).call(this, str));

    _this.tag = tag;
    _this.pos['Value'] = true;
    _this.number = null;
    _this.unit = null;
    _this.unit_name = null;
    _this.measurement = null;
    _this.of_what = '';
    // this.text = str;
    // this.normal = str;
    if (_this.is_ordinal()) {
      _this.pos['Ordinal'] = true;
    }
    _this.parse();
    return _this;
  }

  //test for nearly-numbers, like phonenumbers, or whatever


  _createClass(Value, [{
    key: 'is_number',
    value: function is_number(s) {
      //phone numbers, etc
      if (s.match(/[:@]/)) {
        return false;
      }
      //if there's a number, then something, then a number
      if (s.match(/[0-9][^(0-9|\/),\.][0-9]/)) {
        if (s.match(/((?:[0-9]|\.)+) ((?:[0-9]|\.)+)\/((?:[0-9]|\.)+)/)) {
          // I'm sure there is a better regexpxs
          return true;
        }
        return false;
      }
      return true;
    }
  }, {
    key: 'is_number_word',
    value: function is_number_word(w) {
      var number_words = {
        minus: true,
        negative: true,
        point: true,
        half: true,
        quarter: true
      };

      if (w.match(/[0-9]/) || number_words[w]) {
        return true;
      } else if (nums.ones[w] || nums.teens[w] || nums.tens[w] || nums.multiples[w]) {
        return true;
      } else if (nums.ordinal_ones[w] || nums.ordinal_teens[w] || nums.ordinal_tens[w] || nums.ordinal_multiples[w]) {
        return true;
      }

      return false;
    }
  }, {
    key: 'is_ordinal',
    value: function is_ordinal() {
      //1st
      if (this.normal.match(/^[0-9]+(rd|st|nd|th)$/)) {
        return true;
      }
      //first, second...
      for (var i = 0; i < ordinals.length; i++) {
        if (fns.endsWith(this.normal, ordinals[i])) {
          return true;
        }
      }
      return false;
    }

    //turn an integer like 22 into '22nd'

  }, {
    key: 'to_ordinal',
    value: function to_ordinal() {
      var num = this.number;
      //fail fast
      if (!num && num !== 0) {
        return '';
      }
      //teens are all 'th'
      if (num >= 10 && num <= 20) {
        return '' + num + 'th';
      }
      //treat it as a string..
      num = '' + num;
      //fail safely
      if (!num.match(/[0-9]$/)) {
        return num;
      }
      if (fns.endsWith(num, '1')) {
        return num + 'st';
      }
      if (fns.endsWith(num, '2')) {
        return num + 'nd';
      }
      if (fns.endsWith(num, '3')) {
        return num + 'rd';
      }
      return num + 'th';
    }

    //overwrite term.normal?
    // normal() {
    //   let str = '' + (this.number || '');
    //   if (this.is_ordinal()) {
    //     str = this.to_ordinal(str);
    //   }
    //   if (this.unit) {
    //     str += ' ' + this.unit;
    //   }
    //   return str;
    // }

  }, {
    key: 'root',
    value: function root() {
      var str = this.number;
      if (this.unit) {
        str += ' ' + this.unit;
      }
      return str;
    }
  }, {
    key: 'is_unit',
    value: function is_unit() {
      //if it's a known unit
      if (units[this.unit]) {
        return true;
      }
      //currencies are derived-through POS
      if (this.pos['Currency']) {
        return true;
      }

      var s = this.unit.toLowerCase();
      if (nums.prefixes[s]) {
        return true;
      }

      //try singular version
      s = this.unit.replace(/s$/, '');
      if (units[s]) {
        this.unit = this.unit.replace(/s$/, '');
        return true;
      }

      s = this.unit.replace(/es$/, '');
      if (units[s]) {
        this.unit = this.unit.replace(/es$/, '');
        return true;
      }
      return false;
    }
  }, {
    key: 'parse',
    value: function parse() {
      if (!this.is_number(this.text)) {
        return;
      }

      var words = this.text.toLowerCase().split(/[ ]/);
      //split at '-' only for numbers like twenty-two, sixty-seven, etc.
      //so that 'twelve six-gram pieces' returns 12 for number, not null
      //however, still returns null for 'three sevel-eleven stores'
      for (var i = 0; i < words.length; i++) {
        var w = words[i];
        if (w.indexOf('-') === w.lastIndexOf('-') && w.indexOf('-') > -1) {
          var halves = w.split(/[-]/);
          if (this.is_number_word(halves[0]) && this.is_number_word(halves[1])) {
            words[i] = halves[0];
            words.splice(i + 1, 0, halves[1]);
          }
        }
      }

      var numbers = '';
      var raw_units = '';

      //seperate number-words from unit-words
      for (var _i = 0; _i < words.length; _i++) {
        var _w = words[_i];
        if (this.is_number_word(_w)) {
          numbers += ' ' + _w;
        } else {
          raw_units += ' ' + _w;
        }
      }
      this.unit = raw_units.trim();

      //if raw_units is something like "grams of sugar", try it first,
      //then "grams of", and then "grams".
      while (this.unit !== '') {
        if (this.is_unit() && units[this.unit]) {
          this.measurement = units[this.unit].category;
          this.unit_name = units[this.unit].name;
          break;
        } else {
          this.unit = this.unit.substr(0, this.unit.lastIndexOf(' ')).trim();
        }
      }

      //support '$400' => 400 dollars
      var firstChar = this.text.substr(0, 1);
      var symbolic_currency = {
        '€': 'euro',
        '$': 'dollar',
        '¥': 'yen',
        '£': 'pound',
        '¢': 'cent',
        '฿': 'bitcoin'
      };
      if (symbolic_currency[firstChar]) {
        this.measurement = 'Money';
        this.unit_name = 'currency';
        this.unit = symbolic_currency[firstChar];
      }

      numbers = numbers.trim();
      this.number = to_number(numbers);

      //of_what
      var of_pos = this.text.indexOf(' of ');
      if (of_pos > 0) {
        var before = this.text.substring(0, of_pos).trim();
        var after = this.text.substring(of_pos + 4).trim();

        var space_pos = before.lastIndexOf(' ');
        var _w2 = before.substring(space_pos).trim();

        //if the word before 'of' is a unit, return whatever is after 'of'
        //else return this word + of + whatever is after 'of'
        if (_w2 && (this.is_unit(_w2) || this.is_number_word(_w2))) {
          this.of_what = after;
        } else {
          this.of_what = _w2 + ' of ' + after;
        }
      } else if (this.unit_name) {
        //if value contains a unit but no 'of', return unit
        this.of_what = this.unit;
      } else {
        //if value is a number followed by words, skip numbers
        //and return words; if there is no numbers, return full
        var temp_words = this.text.split(' ');
        for (var _i2 = 0; _i2 < temp_words.length; _i2++) {
          if (this.is_number_word(temp_words[_i2])) {
            temp_words[_i2] = '';
            continue;
          }
          this.of_what = temp_words.join(' ').trim();
        }
      }
    }
  }, {
    key: 'textual',
    value: function textual() {
      return to_text(this.number || this.normal || this.text);
    }
  }]);

  return Value;
}(Noun);

Value.fn = Value.prototype;
module.exports = Value;

},{"../../../data/numbers":16,"../../../fns":23,"../noun":80,"./parse/to_number":97,"./to_text":98,"./units":99}],101:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _is_acronym = _dereq_('./is_acronym');
var match_term = _dereq_('../match/match_term');
var syntax_parse = _dereq_('../match/syntax_parse');
var implied = _dereq_('./implied');

var Term = function () {
  function Term(str, tag, whitespace) {
    _classCallCheck(this, Term);

    //don't pass non-strings through here any further..
    if (typeof str === 'number') {
      str = '' + str;
    } else if (typeof str !== 'string') {
      str = '';
    }
    str = str.toString();
    //trailing & preceding whitespace
    this.whitespace = whitespace || {};
    this.whitespace.preceding = this.whitespace.preceding || '';
    this.whitespace.trailing = this.whitespace.trailing || '';
    //set .text
    this.text = str;
    //the normalised working-version of the word
    this.normal = '';
    //if it's a contraction or slang, the implication, or 'hidden word'
    this.expansion = '';
    //set .normal
    this.rebuild();
    //the reasoning behind it's part-of-speech
    this.reasoning = [];
    //these are orphaned POS that have no methods
    this.pos = {};
    this.tag = tag || '?';
    if (tag) {
      this.pos[tag] = true;
    }
  }

  //when the text changes, rebuild derivative fields


  _createClass(Term, [{
    key: 'rebuild',
    value: function rebuild() {
      this.text = this.text || '';
      this.text = this.text.trim();

      this.normal = '';
      this.normalize();
      this.expansion = implied(this.normal);
    }
  }, {
    key: 'changeTo',
    value: function changeTo(str) {
      this.text = str;
      this.rebuild();
    }
    //a regex-like string search

  }, {
    key: 'match',
    value: function match(match_str, options) {
      var reg = syntax_parse([match_str]);
      return match_term(this, reg[0], options);
    }
    //the 'root' singular/infinitive/whatever.
    // method is overloaded by each pos type

  }, {
    key: 'root',
    value: function root() {
      return this.strip_apostrophe();
    }
    //strip apostrophe s

  }, {
    key: 'strip_apostrophe',
    value: function strip_apostrophe() {
      if (this.normal.match(/[a-z]'[a-z][a-z]?$/)) {
        var split = this.normal.split(/'/);
        if (split[1] === 's') {
          return split[0];
        }
      }
      return this.normal;
    }
  }, {
    key: 'has_comma',
    value: function has_comma() {
      if (this.text.match(/,$/)) {
        return true;
      }
      return false;
    }
  }, {
    key: 'has_abbreviation',
    value: function has_abbreviation() {
      // "spencer's"
      if (this.text.match(/[a-z]'[a-z][a-z]?$/)) {
        return true;
      }
      // "flanders' house"
      if (this.text.match(/[a-z]s'$/)) {
        return true;
      }
      return false;
    }
  }, {
    key: 'is_capital',
    value: function is_capital() {
      if (this.text.match(/[A-Z][a-z]/)) {
        return true;
      }
      return false;
    }
    //utility method to avoid lumping words with non-word stuff

  }, {
    key: 'is_word',
    value: function is_word() {
      if (this.text.match(/^\[.*?\]\??$/)) {
        return false;
      }
      if (!this.text.match(/[a-z|0-9]/i)) {
        return false;
      }
      if (this.text.match(/[\|#\<\>]/i)) {
        return false;
      }
      return true;
    }
    //FBI or F.B.I.

  }, {
    key: 'is_acronym',
    value: function is_acronym() {
      return _is_acronym(this.text);
    }
    //working word

  }, {
    key: 'normalize',
    value: function normalize() {
      var str = this.text || '';
      str = str.toLowerCase();
      //strip grammatical punctuation
      str = str.replace(/[,\.!:;\?\(\)^$]/g, '');
      //hashtags, atmentions
      str = str.replace(/^[#@]/, '');
      //convert hyphenations to a multiple-word term
      str = str.replace(/([a-z])\-([a-z])/g, '$1 $2');
      // coerce single curly quotes
      str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, '\'');
      // coerce double curly quotes
      str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '');
      //remove quotations + scare-quotes
      str = str.replace(/^'/g, '');
      str = str.replace(/'$/g, '');
      str = str.replace(/"/g, '');
      if (!str.match(/[a-z0-9]/i)) {
        return '';
      }
      this.normal = str;
      return this.normal;
    }
  }, {
    key: 'all_forms',
    value: function all_forms() {
      return {};
    }
  }]);

  return Term;
}();

Term.fn = Term.prototype;

module.exports = Term;

},{"../match/match_term":27,"../match/syntax_parse":29,"./implied":71,"./is_acronym":72}],102:[function(_dereq_,module,exports){
//turn a verb into its other grammatical forms.
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var verb_to_actor = _dereq_('./to_actor');
var to_infinitive = _dereq_('./to_infinitive');
var from_infinitive = _dereq_('./from_infinitive');
var irregular_verbs = _dereq_('../../../data/irregular_verbs');
var predict = _dereq_('./predict_form.js');
var generic = _dereq_('./generic.js');
var strip_prefix = _dereq_('./strip_prefix.js');
var fns = _dereq_('../../../fns.js');

//make sure object has all forms
var fufill = function fufill(obj, prefix) {
  //we're toast if there's no infinitive
  if (!obj.infinitive) {
    return obj;
  }
  //apply generic methods to missing forms
  if (!obj.gerund) {
    obj.gerund = generic.gerund(obj);
  }
  if (!obj.present) {
    obj.present = generic.present(obj);
  }
  if (!obj.past) {
    obj.past = generic.past(obj);
  }
  if (obj.actor === undefined) {
    obj.actor = verb_to_actor(obj.infinitive);
  }

  //add the prefix to all forms, if it exists
  if (prefix) {
    Object.keys(obj).forEach(function (k) {
      obj[k] = prefix + obj[k];
    });
  }
  //future is 'will'+infinitive
  if (!obj.future) {
    obj.future = generic.future(obj);
  }
  //perfect is 'have'+past-tense
  if (!obj.perfect) {
    obj.perfect = generic.perfect(obj);
  }
  //pluperfect is 'had'+past-tense
  if (!obj.pluperfect) {
    obj.pluperfect = generic.pluperfect(obj);
  }
  //future perfect is 'will have'+past-tense
  if (!obj.future_perfect) {
    obj.future_perfect = generic.future_perfect(obj);
  }
  return obj;
};

var conjugate = function conjugate(w) {
  if (w === undefined) {
    return {};
  }

  //for phrasal verbs ('look out'), conjugate look, then append 'out'
  var phrasal_reg = new RegExp('^(.*?) (in|out|on|off|behind|way|with|of|away|across|ahead|back|over|under|together|apart|up|upon|aback|down|about|before|after|around|to|forth|round|through|along|onto)$', 'i');
  if (w.match(phrasal_reg)) {
    var _ret = function () {
      var split = w.match(phrasal_reg, '');
      var phrasal_verb = split[1];
      var particle = split[2];
      var result = conjugate(phrasal_verb); //recursive
      Object.keys(result).forEach(function (k) {
        if (result[k]) {
          result[k] += ' ' + particle;
        }
      });
      return {
        v: result
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  //for pluperfect ('had tried') remove 'had' and call it past-tense
  w = w.replace(/^had /i, '');
  //for perfect ('have tried') remove 'have' and call it past-tense
  w = w.replace(/^have /i, '');
  //for future perfect ('will have tried') remove 'will have' and call it past-tense
  w = w.replace(/^will have /i, '');
  //chop it if it's future-tense
  w = w.replace(/^will /i, '');

  //un-prefix the verb, and add it in later
  var prefix = strip_prefix(w);
  w = w.replace(prefix, '');

  //guess the tense, so we know which transormation to make
  var predicted = predict(w) || 'infinitive';
  //check against suffix rules
  var infinitive = to_infinitive(w, predicted) || '';
  //check irregulars
  var obj = irregular_verbs[w] || irregular_verbs[infinitive] || {};
  obj = fns.extend({}, obj);
  //apply regex-transformations
  var conjugations = from_infinitive(infinitive);
  Object.keys(conjugations).forEach(function (k) {
    if (!obj[k]) {
      obj[k] = conjugations[k];
    }
  });
  return fufill(obj, prefix);
};
module.exports = conjugate;

// console.log(conjugate('played'));

},{"../../../data/irregular_verbs":11,"../../../fns.js":23,"./from_infinitive":103,"./generic.js":104,"./predict_form.js":105,"./strip_prefix.js":106,"./to_actor":108,"./to_infinitive":109}],103:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var rules = [{
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
}];

var keys = {
  pr: 'present',
  pa: 'past',
  gr: 'gerund',
  prt: 'participle',
  ar: 'actor'
};

var from_infinitive = function from_infinitive(str) {
  var obj = {
    infinitive: str
  };
  if (!str || typeof str !== 'string') {
    // console.log(str);
    return obj;
  }

  var _loop = function _loop(i) {
    if (str.match(rules[i].reg)) {
      // console.log(rules[i]);
      Object.keys(rules[i].repl).forEach(function (k) {
        obj[keys[k]] = str.replace(rules[i].reg, rules[i].repl[k]);
      });
      return {
        v: obj
      };
    }
  };

  for (var i = 0; i < rules.length; i++) {
    var _ret = _loop(i);

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
  return obj;
};
// console.log(from_infinitive('watch'));

module.exports = from_infinitive;

},{}],104:[function(_dereq_,module,exports){
'use strict';
//non-specifc, 'hail-mary' transforms from infinitive, into other forms

var fns = _dereq_('../../../fns');
var generic = {

  gerund: function gerund(o) {
    var inf = o.infinitive;
    if (fns.endsWith(inf, 'e')) {
      return inf.replace(/e$/, 'ing');
    }
    return inf + 'ing';
  },

  present: function present(o) {
    var inf = o.infinitive;
    if (fns.endsWith(inf, 's')) {
      return inf + 'es';
    }
    if (fns.endsWith(inf, /[bcdfghjklmnpqrstvwxz]y$/)) {
      return inf.slice(0, -1) + 'ies';
    }
    return inf + 's';
  },

  past: function past(o) {
    var inf = o.infinitive;
    if (fns.endsWith(inf, 'e')) {
      return inf + 'd';
    }
    if (fns.endsWith(inf, 'ed')) {
      return inf;
    }
    if (fns.endsWith(inf, /[bcdfghjklmnpqrstvwxz]y$/)) {
      return inf.slice(0, -1) + 'ied';
    }
    return inf + 'ed';
  },

  future: function future(o) {
    return 'will ' + o.infinitive;
  },

  perfect: function perfect(o) {
    return 'have ' + (o.participle || o.past);
  },

  pluperfect: function pluperfect(o) {
    return 'had ' + o.past;
  },

  future_perfect: function future_perfect(o) {
    return 'will have ' + o.past;
  }

};

module.exports = generic;

},{"../../../fns":23}],105:[function(_dereq_,module,exports){
'use strict';
//this method is used to predict which current conjugation a verb is

//this method is the slowest in the whole library,

var fns = _dereq_('../../../fns.js');
var suffix_rules = _dereq_('./suffix_rules');
var irregular_verbs = _dereq_('../../../data/irregular_verbs');
var known_verbs = Object.keys(irregular_verbs).reduce(function (h, k) {
  Object.keys(irregular_verbs[k]).forEach(function (k2) {
    h[irregular_verbs[k][k2]] = k2;
  });
  return h;
}, {});

var predict = function predict(w) {

  //check if known infinitive
  if (irregular_verbs[w]) {
    return 'infinitive';
  }
  //check if known infinitive
  if (known_verbs[w]) {
    return known_verbs[w];
  }

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
  if (w.match(/[^aeiou]ing$/)) {
    return 'gerund';
  }

  var arr = Object.keys(suffix_rules);
  for (var i = 0; i < arr.length; i++) {
    if (fns.endsWith(w, arr[i]) && arr[i].length < w.length) {
      return suffix_rules[arr[i]];
    }
  }
  return 'infinitive';
};

module.exports = predict;

},{"../../../data/irregular_verbs":11,"../../../fns.js":23,"./suffix_rules":107}],106:[function(_dereq_,module,exports){
'use strict';
// 'over-kill' should use conjugation rules of 'kill', etc..

var strip_prefix = function strip_prefix(str) {
  var prefix = '';
  var match = str.match(/^(over|under|re|anti|full|cross)([- ])?([^aeiou][a-z]*)/i);
  if (match) {
    prefix = match[1] + (match[2] || '');
  }
  return prefix;
};

module.exports = strip_prefix;

},{}],107:[function(_dereq_,module,exports){
'use strict';
//suffix signals for verb tense, generated from test data

var compact = {
  'gerund': ['ing'],
  'infinitive': ['ate', 'ize', 'tion', 'rify', 'then', 'ress', 'ify', 'age', 'nce', 'ect', 'ise', 'ine', 'ish', 'ace', 'ash', 'ure', 'tch', 'end', 'ack', 'and', 'ute', 'ade', 'ock', 'ite', 'ase', 'ose', 'use', 'ive', 'int', 'nge', 'lay', 'est', 'ain', 'ant', 'eed', 'er', 'le'],
  'participle': ['own', 'unk', 'ung', 'en'],
  'past': ['ed', 'lt', 'nt', 'pt', 'ew', 'ld'],
  'present': ['rks', 'cks', 'nks', 'ngs', 'mps', 'tes', 'zes', 'ers', 'les', 'acks', 'ends', 'ands', 'ocks', 'lays', 'eads', 'lls', 'els', 'ils', 'ows', 'nds', 'ays', 'ams', 'ars', 'ops', 'ffs', 'als', 'urs', 'lds', 'ews', 'ips', 'es', 'ts', 'ns', 's']
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

},{}],108:[function(_dereq_,module,exports){
//somone who does this present-tense verb
//turn 'walk' into 'walker'
'use strict';

var actor = function actor(str) {
  str = str || '';
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
  var transforms = [{
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
  for (var i = 0; i < transforms.length; i++) {
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

},{}],109:[function(_dereq_,module,exports){
//turns a verb in any form, into it's infinitive version
// eg "walked" -> "walk"
'use strict';

var irregular_verbs = _dereq_('../../../data/irregular_verbs');
var known_verbs = Object.keys(irregular_verbs).reduce(function (h, k) {
  Object.keys(irregular_verbs[k]).forEach(function (k2) {
    h[irregular_verbs[k][k2]] = k;
  });
  return h;
}, {});

var rules = {
  participle: [{
    reg: /own$/i,
    to: 'ow'
  }, {
    reg: /(.)un([g|k])$/i,
    to: '$1in$2'
  }],
  actor: [{
    reg: /(er)er$/i,
    to: '$1'
  }],
  present: [{
    reg: /(ies)$/i,
    to: 'y'
  }, {
    reg: /(tch|sh)es$/i,
    to: '$1'
  }, {
    reg: /(ss)es$/i,
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
  gerund: [{
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
  past: [{
    reg: /(ued)$/i,
    to: 'ue'
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

var to_infinitive = function to_infinitive(str, from_tense) {
  if (known_verbs.hasOwnProperty(str)) {
    return known_verbs[str];
  }
  if (from_tense === 'infinitive') {
    return str;
  }
  var regs = rules[from_tense] || [];
  for (var i = 0; i < regs.length; i++) {
    if (str.match(regs[i].reg)) {
      return str.replace(regs[i].reg, regs[i].to);
    }
  }
  return str;
};

// console.log(to_infinitive('played', 'past'));

module.exports = to_infinitive;

},{"../../../data/irregular_verbs":11}],110:[function(_dereq_,module,exports){
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
var to_adjective = function to_adjective(str) {
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

module.exports = to_adjective;

},{}],111:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Term = _dereq_('../term.js');
var _conjugate = _dereq_('./conjugate/conjugate.js');
var _negate = _dereq_('./verb_negate.js');
var _to_adjective = _dereq_('./to_adjective.js');
var predict_form = _dereq_('./conjugate/predict_form.js');

var verbTags = {
  infinitive: 'Infinitive',
  present: 'PresentTense',
  past: 'PastTense',
  gerund: 'Gerund',
  actor: 'Actor',
  future: 'FutureTense',
  pluperfect: 'PluperfectTense',
  perfect: 'PerfectTense'
};

var Verb = function (_Term) {
  _inherits(Verb, _Term);

  function Verb(str, tag) {
    _classCallCheck(this, Verb);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Verb).call(this, str));

    _this.tag = tag;
    _this.pos['Verb'] = true;
    //if we've been told which
    if (tag) {
      _this.pos[tag] = true;
    }
    return _this;
  }

  //'root' for a verb means infinitive


  _createClass(Verb, [{
    key: 'root',
    value: function root() {
      return this.conjugate().infinitive;
    }

    //retrieve a specific form

  }, {
    key: 'conjugation',
    value: function conjugation() {
      //check cached conjugations
      var conjugations = this.conjugate();
      var keys = Object.keys(conjugations);
      for (var i = 0; i < keys.length; i++) {
        if (conjugations[keys[i]] === this.normal) {
          return verbTags[keys[i]];
        }
      }
      //try to guess
      return verbTags[predict_form(this.normal)];
    }
  }, {
    key: 'tense',
    value: function tense() {
      //map conjugation onto past/present/future
      var tenses = {
        infinitive: 'present',
        gerund: 'present',
        actor: 'present',
        present: 'present',
        past: 'past',
        future: 'future',
        perfect: 'past',
        pluperfect: 'past',
        future_perfect: 'future'
      };
      var c = this.conjugation();
      return tenses[c] || 'present';
    }
  }, {
    key: 'conjugate',
    value: function conjugate() {
      return _conjugate(this.normal);
    }
  }, {
    key: 'to_past',
    value: function to_past() {
      var tense = 'past';
      var conjugations = this.conjugate(this.normal);
      this.tag = verbTags[tense];
      this.changeTo(conjugations[tense]);
      return conjugations[tense];
    }
  }, {
    key: 'to_present',
    value: function to_present() {
      var tense = 'present';
      var conjugations = this.conjugate(this.normal);
      this.tag = verbTags[tense];
      this.changeTo(conjugations[tense]);
      return conjugations[tense];
    }
  }, {
    key: 'to_future',
    value: function to_future() {
      var tense = 'future';
      var conjugations = this.conjugate(this.normal);
      this.tag = verbTags[tense];
      this.changeTo(conjugations[tense]);
      return conjugations[tense];
    }
  }, {
    key: 'to_adjective',
    value: function to_adjective() {
      return _to_adjective(this.conjugate().infinitive);
    }

    //is this verb negative already?

  }, {
    key: 'isNegative',
    value: function isNegative() {
      var str = this.normal;
      //yep, pretty simple
      if (str.match(/(n't|\bnot\b)/)) {
        return true;
      }
      return false;
    }

    //turn 'walked' to "didn't walk"

  }, {
    key: 'negate',
    value: function negate() {
      this.changeTo(_negate(this));
      return this;
    }
  }, {
    key: 'all_forms',
    value: function all_forms() {
      var forms = this.conjugate();
      forms['negated'] = _negate(this);
      forms['normal'] = this.normal;
      return forms;
    }
  }]);

  return Verb;
}(Term);

Verb.fn = Verb.prototype;

module.exports = Verb;

//let v = new Verb('run');
//console.log(v.all_forms());

},{"../term.js":101,"./conjugate/conjugate.js":102,"./conjugate/predict_form.js":105,"./to_adjective.js":110,"./verb_negate.js":112}],112:[function(_dereq_,module,exports){
'use strict';
//recieves a verb object, and returns a negated string
//sort out don't/didn't/doesn't/won't

var fns = _dereq_('../../fns');

// logic:
// [past tense] - "sold" -> "didn't sell"
// [present] - "sells" -> "doesn't sell"
// [future] - "will sell" -> "won't sell"

var negate = function negate(v) {

  var known_negation = {
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
    'have': 'haven\'t',
    'has': 'hasn\'t',
    'does': 'doesn\'t',
    'do': 'don\'t'
  };
  //hard-coded explicit forms
  if (known_negation[v.normal]) {
    return known_negation[v.normal];
  }
  //try to un-negate?  create corrollary
  var known_affirmation = fns.reverseObj(known_negation);
  if (known_affirmation[v.normal]) {
    return known_affirmation[v.normal];
  }

  //multiple-word verbs, like 'have walked'
  var words = v.normal.split(' ');
  if (words.length > 1 && words[1] === 'not') {
    return words[0];
  }
  if (words.length > 1 && known_negation[words[0]]) {
    return known_negation[words[0]] + ' ' + words.slice(1, words.length).join(' ');
  }
  var form = v.conjugation();
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
  //walk -> don't walk ?
  if (form === 'Infinitive') {
    return 'don\'t ' + v.text;
  }

  return v.text;
};

module.exports = negate;

},{"../../fns":23}],113:[function(_dereq_,module,exports){
//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2015 MIT
'use strict';

var abbreviations = _dereq_('../data/abbreviations').abbreviations;
var fns = _dereq_('../fns');

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
  //first do a greedy-split..
  var chunks = [];
  //ensure it 'smells like' a sentence
  if (!text || typeof text !== 'string' || !text.match(/\w/)) {
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
  var acronym_reg = new RegExp('[ |\.][A-Z]\.? +?$', 'i');
  var elipses_reg = new RegExp('\\.\\.\\.* +?$');
  //loop through these chunks, and join the non-sentence chunks back together..
  for (var _i = 0; _i < chunks.length; _i++) {
    //should this chunk be combined with the next one?
    if (chunks[_i + 1] && (chunks[_i].match(abbrev_reg) || chunks[_i].match(acronym_reg) || chunks[_i].match(elipses_reg))) {
      chunks[_i + 1] = chunks[_i] + (chunks[_i + 1] || ''); //.replace(/ +/g, ' ');
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
// console.log(sentence_parser('hi John. He is good'));

},{"../data/abbreviations":1,"../fns":23}],114:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sentence_parser = _dereq_('./sentence_parser.js');
// const Sentence = require('../sentence/sentence.js');
var Question = _dereq_('../sentence/question/question.js');
var Statement = _dereq_('../sentence/statement/statement.js');
var fns = _dereq_('../fns.js');

//a text object is a series of sentences, along with the generic methods for transforming them

var Text = function () {
  function Text(str, options) {
    _classCallCheck(this, Text);

    options = options || {};
    var the = this;
    if (typeof str === 'string') {
      this.raw_text = str;
    } else if (typeof str === 'number') {
      this.raw_text = '' + str;
    } else {
      this.raw_text = '';
    }
    //build-up sentence/statement methods
    this.sentences = sentence_parser(this.raw_text).map(function (s) {
      var last_char = s.slice(-1);
      if (last_char === '?') {
        //TODO:be smartr
        return new Question(s, options);
      }
      return new Statement(s, options);
    });

    this.contractions = {
      // he'd -> he would
      expand: function expand() {
        the.sentences = the.sentences.map(function (s) {
          return s.contractions.expand();
        });
        return the;
      },
      // he would -> he'd
      contract: function contract() {
        the.sentences = the.sentences.map(function (s) {
          return s.contractions.contract();
        });
        return the;
      }
    };
  }

  //map over sentence methods


  _createClass(Text, [{
    key: 'text',
    value: function text() {
      var arr = this.sentences.map(function (s) {
        return s.text();
      });
      return fns.flatten(arr).join('');
    }
  }, {
    key: 'normal',
    value: function normal() {
      var arr = this.sentences.map(function (s) {
        return s.normal();
      });
      return fns.flatten(arr).join(' ');
    }

    //further 'lemmatisation/inflection'

  }, {
    key: 'root',
    value: function root() {
      var arr = this.sentences.map(function (s) {
        return s.root();
      });
      return fns.flatten(arr).join(' ');
    }
  }, {
    key: 'terms',
    value: function terms() {
      var arr = this.sentences.map(function (s) {
        return s.terms;
      });
      return fns.flatten(arr);
    }
  }, {
    key: 'tags',
    value: function tags() {
      return this.sentences.map(function (s) {
        return s.tags();
      });
    }

    //a regex-like lookup for a sentence.
    // returns an array of terms

  }, {
    key: 'match',
    value: function match(str, options) {
      var arr = [];
      for (var i = 0; i < this.sentences.length; i++) {
        arr = arr.concat(this.sentences[i].match(str, options));
      }
      return arr;
    }
  }, {
    key: 'replace',
    value: function replace(str, replacement, options) {
      for (var i = 0; i < this.sentences.length; i++) {
        this.sentences[i].replace(str, replacement, options);
      }
      return this;
    }

    //transformations

  }, {
    key: 'to_past',
    value: function to_past() {
      this.sentences = this.sentences.map(function (s) {
        return s.to_past();
      });
      return this;
    }
  }, {
    key: 'to_present',
    value: function to_present() {
      this.sentences = this.sentences.map(function (s) {
        return s.to_present();
      });
      return this;
    }
  }, {
    key: 'to_future',
    value: function to_future() {
      this.sentences = this.sentences.map(function (s) {
        return s.to_future();
      });
      return this;
    }
  }, {
    key: 'negate',
    value: function negate() {
      this.sentences = this.sentences.map(function (s) {
        return s.negate();
      });
      return this;
    }

    //returns an array with elements from this.sentences[i].func()

  }, {
    key: 'generate_arr',
    value: function generate_arr(func) {
      var arr = [];
      for (var i = 0; i < this.sentences.length; i++) {
        arr = arr.concat(this.sentences[i][func]());
      }
      return arr;
    }

    //parts of speech

  }, {
    key: 'nouns',
    value: function nouns() {
      return this.generate_arr('nouns');
    }
  }, {
    key: 'adjectives',
    value: function adjectives() {
      return this.generate_arr('adjectives');
    }
  }, {
    key: 'verbs',
    value: function verbs() {
      return this.generate_arr('verbs');
    }
  }, {
    key: 'adverbs',
    value: function adverbs() {
      return this.generate_arr('adverbs');
    }

    //mining

  }, {
    key: 'people',
    value: function people() {
      return this.generate_arr('people');
    }
  }, {
    key: 'places',
    value: function places() {
      return this.generate_arr('places');
    }
  }, {
    key: 'organizations',
    value: function organizations() {
      return this.generate_arr('organizations');
    }
  }, {
    key: 'dates',
    value: function dates() {
      return this.generate_arr('dates');
    }
  }, {
    key: 'values',
    value: function values() {
      return this.generate_arr('values');
    }

    //more generic named-entity recognition

  }, {
    key: 'topics',
    value: function topics() {
      //consolodate topics across sentences
      var obj = {};
      for (var i = 0; i < this.sentences.length; i++) {
        var topics = this.sentences[i].topics();
        for (var o = 0; o < topics.length; o++) {
          if (obj[topics[o].text]) {
            obj[topics[o].text].count += topics[o].count;
          } else {
            obj[topics[o].text] = topics[o];
          }
        }
      }
      //sort by frequency
      var arr = Object.keys(obj).map(function (k) {
        return obj[k];
      });
      return arr.sort(function (a, b) {
        if (a.count > b.count) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    //'semantic' word-count, skips over implicit terms and things

  }, {
    key: 'word_count',
    value: function word_count() {
      var count = 0;
      for (var i = 0; i < this.sentences.length; i++) {
        count += this.sentences[i].word_count();
      }
      return count;
    }
  }]);

  return Text;
}();

Text.fn = Text.prototype;

module.exports = Text;

},{"../fns.js":23,"../sentence/question/question.js":57,"../sentence/statement/statement.js":63,"./sentence_parser.js":113}]},{},[24])(24)
});