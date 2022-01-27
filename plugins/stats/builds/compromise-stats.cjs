(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('efrt')) :
  typeof define === 'function' && define.amd ? define(['efrt'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseStats = factory(global.efrt));
})(this, (function (efrt) { 'use strict';

  const defaults$2 = {
    max: 4,
    min: 1,
  };

  const oneSize$2 = function (list, size) {
    let grams = {};
    // count each instance
    list.forEach(terms => {
      for (let i = 0; i < terms.length; i += 1) {
        let slice = terms.slice(i, i + size);
        if (slice.length === size) {
          let str = slice.join(' ');
          if (grams.hasOwnProperty(str)) {
            grams[str].count += 1;
          } else {
            grams[str] = {
              size: size,
              count: 1,
            };
          }
        }
      }
    });
    // turn them into an array
    let arr = Object.keys(grams).map(k => {
      grams[k].normal = k;
      return grams[k]
    });
    return arr
  };

  const allGrams = function (list, options) {
    // support {size:2} syntax
    if (options.size) {
      options.min = options.size;
      options.max = options.size;
    }
    let max = options.max || defaults$2.max;
    let min = options.min || defaults$2.min;
    let arr = [];
    for (let size = min; size <= max; size += 1) {
      arr = arr.concat(oneSize$2(list, size));
    }
    return arr
  };

  const defaults$1 = {
    max: 4,
    min: 1,
  };

  const oneSize$1 = function (list, size) {
    let grams = {};
    // count each instance
    list.forEach(terms => {
      for (let i = 0; i <= terms.length; i += 1) {
        let slice = terms.slice(0, i);
        if (slice.length === size) {
          let str = slice.join(' ');
          if (grams.hasOwnProperty(str)) {
            grams[str].count += 1;
          } else {
            grams[str] = {
              size: size,
              count: 1,
            };
          }
        }
      }
    });
    // turn them into an array
    let arr = Object.keys(grams).map(k => {
      grams[k].normal = k;
      return grams[k]
    });
    return arr
  };

  const startGrams = function (list, options) {
    // support {size:2} syntax
    if (options.size) {
      options.min = options.size;
      options.max = options.size;
    }
    let max = options.max || defaults$1.max;
    let min = options.min || defaults$1.min;
    let arr = [];
    for (let size = min; size <= max; size++) {
      arr = arr.concat(oneSize$1(list, size));
    }
    return arr
  };

  const defaults = {
    max: 4,
    min: 1,
  };

  const oneSize = function (list, size) {
    let grams = {};
    // count each instance
    list.forEach(terms => {
      let len = terms.length;
      for (let i = 0; i <= terms.length; i += 1) {
        let slice = terms.slice(len - i, len);
        if (slice.length === size) {
          let str = slice.join(' ');
          if (grams.hasOwnProperty(str)) {
            grams[str].count += 1;
          } else {
            grams[str] = {
              size: size,
              count: 1,
            };
          }
        }
      }
    });
    // turn them into an array
    let arr = Object.keys(grams).map(k => {
      grams[k].normal = k;
      return grams[k]
    });
    return arr
  };

  const endGrams = function (list, options) {
    // support {size:2} syntax
    if (options.size) {
      options.min = options.size;
      options.max = options.size;
    }
    let max = options.max || defaults.max;
    let min = options.min || defaults.min;
    let arr = [];
    for (let size = min; size <= max; size++) {
      arr = arr.concat(oneSize(list, size));
    }
    return arr
  };

  // tokenize by term
  const tokenize = function (doc) {
    let list = doc.json({ text: false }).map(o => {
      return o.terms.map(t => t.normal)
    });
    return list
  };

  const sort = function (arr) {
    arr = arr.sort((a, b) => {
      //first sort them by count
      if (a.count > b.count) {
        return -1
      }
      if (a.count < b.count) {
        return 1
      }
      // in a tie, sort them by size
      if (a.size > b.size) {
        return -1
      }
      if (a.size < b.size) {
        return 1
      }
      return 0
    });
    return arr
  };

  const addMethod = function (View) {
    /** list all repeating sub-phrases, by word-count */
    View.prototype.ngrams = function (obj) {
      let list = tokenize(this);
      let arr = allGrams(list, obj || {});
      arr = sort(arr);
      return arr
    };
    View.prototype.nGrams = View.prototype.ngrams;
    View.prototype.ngram = View.prototype.ngrams;

    /** n-grams with one word */
    View.prototype.unigrams = function (n) {
      let arr = allGrams(tokenize(this), { max: 1, min: 1 });
      arr = sort(arr);
      if (typeof n === 'number') {
        arr = arr[n];
      }
      return arr
    };
    View.prototype.uniGrams = View.prototype.unigrams;

    /** n-grams with two words */
    View.prototype.bigrams = function (n) {
      let arr = allGrams(tokenize(this), { max: 2, min: 2 });
      arr = sort(arr);
      if (typeof n === 'number') {
        arr = arr[n];
      }
      return arr
    };
    View.prototype.biGrams = View.prototype.bigrams;

    /** n-grams with three words */
    View.prototype.trigrams = function (n) {
      let arr = allGrams(tokenize(this), { max: 3, min: 3 });
      arr = sort(arr);
      if (typeof n === 'number') {
        arr = arr[n];
      }
      return arr
    };
    View.prototype.triGrams = View.prototype.trigrams;

    /** list all repeating sub-phrases, using the first word */
    View.prototype.startgrams = function (obj) {
      let list = tokenize(this);
      let arr = startGrams(list, obj || {});
      arr = sort(arr);
      return arr
    };
    View.prototype.startGrams = View.prototype.startgrams;

    /** list all repeating sub-phrases, connected to the last word of each phrase */
    View.prototype.endgrams = function (obj) {
      let list = tokenize(this);
      let arr = endGrams(list, obj || {});
      arr = sort(arr);
      return arr
    };
    View.prototype.endGrams = View.prototype.endgrams;

    /** list all repeating sub-phrases, connected to the last word of each phrase */
    View.prototype.edgegrams = function (obj) {
      let list = tokenize(this);
      let start = startGrams(list, obj || {});
      let end = endGrams(list, obj || {});
      // combine them together
      let all = start.concat(end);
      let combine = all.reduce((h, a) => {
        if (h[a.normal]) {
          h[a.normal].count += a.count;
        } else {
          h[a.normal] = a;
        }
        return h
      }, {});
      let arr = Object.keys(combine).map(k => combine[k]);
      arr = sort(arr);
      return arr
    };
    View.prototype.edgeGrams = View.prototype.edgegrams;
  };

  var pcked = {
    "1.292": "true¦the",
    "1.534": "true¦be",
    "1.567": "true¦to",
    "1.585": "true¦and",
    "1.644": "true¦of",
    "1.652": "true¦a",
    "1.741": "true¦i",
    "1.749": "true¦in",
    "1.908": "true¦you",
    "1.967": "true¦that",
    "1.983": "true¦it",
    "2.021": "true¦not",
    "2.022": "true¦for",
    "2.072": "true¦have",
    "2.104": "true¦this",
    "2.163": "true¦on",
    "2.179": "true¦with",
    "2.217": "true¦do",
    "2.229": "true¦he",
    "2.268": "true¦as",
    "2.277": "true¦my",
    "2.287": "true¦we",
    "2.319": "true¦at",
    "2.322": "true¦but",
    "2.392": "true¦they",
    "2.418": "true¦me",
    "2.420": "true¦your",
    "2.422": "true¦his",
    "2.426": "true¦get",
    "2.433": "true¦will",
    "2.440": "true¦so",
    "2.449": "true¦by",
    "2.456": "true¦all",
    "2.461": "true¦can",
    "2.477": "true¦from,say",
    "2.481": "true¦go",
    "2.495": "true¦she",
    "2.509": "true¦or",
    "2.524": "true¦if,what",
    "2.533": "true¦her",
    "2.539": "true¦one",
    "2.557": "true¦when",
    "2.565": "true¦make",
    "2.569": "true¦an",
    "2.592": "true¦our",
    "2.595": "true¦know",
    "2.596": "true¦out",
    "2.597": "true¦up",
    "2.599": "true¦was",
    "2.603": "true¦just",
    "2.614": "true¦there",
    "2.632": "true¦like",
    "2.643": "true¦about",
    "2.645": "true¦would",
    "2.647": "true¦no,time",
    "2.649": "true¦is",
    "2.665": "true¦come",
    "2.684": "true¦him",
    "2.693": "true¦who",
    "2.703": "true¦more",
    "2.713": "true¦good",
    "2.718": "true¦which",
    "2.719": "true¦their",
    "2.721": "true¦had",
    "2.726": "true¦them",
    "2.732": "true¦person",
    "2.739": "true¦toronto",
    "2.743": "true¦take",
    "2.747": "true¦now,think",
    "2.756": "true¦see",
    "2.757": "true¦are",
    "2.758": "true¦then",
    "2.766": "true¦want",
    "2.777": "true¦new",
    "2.801": "true¦some",
    "2.824": "true¦into",
    "2.827": "true¦first",
    "2.831": "true¦us",
    "2.832": "true¦year",
    "2.833": "true¦could",
    "2.845": "true¦day",
    "2.847": "true¦how",
    "2.850": "true¦only",
    "2.856": "true¦very",
    "2.864": "true¦back",
    "2.868": "true¦look",
    "2.870": "true¦work",
    "2.878": "true¦aft0oth0;er",
    "2.882": "true¦than",
    "2.893": "true¦because",
    "2.898": "true¦these",
    "2.902": "true¦well",
    "2.903": "true¦great",
    "2.909": "true¦tell",
    "2.911": "true¦call",
    "2.913": "true¦its",
    "2.921": "true¦down",
    "2.923": "true¦give",
    "2.924": "true¦h0;as,ere",
    "2.927": "true¦also,thing",
    "2.929": "true¦find",
    "2.930": "true¦right",
    "2.934": "true¦over",
    "2.955": "true¦way",
    "2.967": "true¦man",
    "2.968": "true¦where",
    "2.972": "true¦place",
    "2.977": "true¦ask",
    "2.978": "true¦two",
    "2.979": "true¦little,should",
    "2.982": "true¦use",
    "2.990": "true¦am",
    "3.012": "true¦ne0;ed,ver",
    "3.019": "true¦any",
    "3.023": "true¦before",
    "3.026": "true¦love",
    "3.038": "true¦most",
    "3.043": "true¦must",
    "3.045": "true¦too",
    "3.047": "true¦off",
    "3.048": "true¦u",
    "3.049": "true¦much",
    "3.050": "true¦try",
    "3.061": "true¦let",
    "3.063": "true¦really",
    "3.067": "true¦why",
    "3.068": "true¦world",
    "3.074": "true¦help",
    "3.075": "true¦did",
    "3.080": "true¦long",
    "3.083": "true¦name",
    "3.090": "true¦last",
    "3.097": "true¦still",
    "3.100": "true¦were",
    "3.103": "true¦may",
    "3.105": "true¦mean",
    "3.106": "true¦friend",
    "3.107": "true¦american",
    "3.111": "true¦even,keep",
    "3.114": "true¦every",
    "3.115": "true¦many",
    "3.118": "true¦home",
    "3.121": "true¦again",
    "3.122": "true¦put",
    "3.123": "true¦leave",
    "3.138": "true¦feel",
    "3.141": "true¦old",
    "3.143": "true¦play",
    "3.147": "true¦king",
    "3.156": "true¦city",
    "3.158": "true¦state",
    "3.159": "true¦food,while",
    "3.165": "true¦start",
    "3.170": "true¦high",
    "3.171": "true¦been,life,through",
    "3.174": "true¦those",
    "3.178": "true¦oh",
    "3.180": "true¦night",
    "3.182": "true¦child",
    "3.187": "true¦hear",
    "3.188": "true¦woman",
    "3.189": "true¦bring,country,live,prince",
    "3.200": "true¦game",
    "3.203": "true¦court,going",
    "3.204": "true¦late",
    "3.205": "true¦end",
    "3.207": "true¦own",
    "3.214": "true¦always",
    "3.219": "true¦such",
    "3.222": "true¦around",
    "3.229": "true¦open",
    "3.233": "true¦house",
    "3.239": "true¦best",
    "3.244": "true¦same",
    "3.247": "true¦eat",
    "3.250": "true¦change",
    "3.255": "true¦top",
    "3.256": "true¦ever",
    "3.257": "true¦meet,part",
    "3.258": "true¦next",
    "3.259": "true¦without",
    "3.260": "true¦once",
    "3.261": "true¦away,show",
    "3.263": "true¦both",
    "3.264": "true¦america",
    "3.267": "true¦job",
    "3.269": "true¦another",
    "3.271": "true¦bad",
    "3.272": "true¦guy,hand",
    "3.275": "true¦something",
    "3.276": "true¦order",
    "3.278": "true¦include",
    "3.280": "true¦yeah",
    "3.285": "true¦family",
    "3.286": "true¦girl,under",
    "3.287": "true¦three",
    "3.290": "true¦become,run,talk",
    "3.297": "true¦each",
    "3.299": "true¦big",
    "3.301": "true¦head",
    "3.303": "true¦set",
    "3.306": "true¦school,today",
    "3.312": "true¦turn",
    "3.317": "true¦begin",
    "3.319": "true¦wait",
    "3.321": "true¦large",
    "3.329": "true¦haha",
    "3.330": "true¦party",
    "3.331": "true¦might",
    "3.335": "true¦service",
    "3.341": "true¦government",
    "3.342": "true¦between,cause",
    "3.350": "true¦small",
    "3.351": "true¦since",
    "3.353": "true¦walk",
    "3.355": "true¦hold,sure",
    "3.358": "true¦nothing,send",
    "3.361": "true¦pay",
    "3.364": "true¦believe",
    "3.366": "true¦care",
    "3.369": "true¦buy,room",
    "3.371": "true¦until",
    "3.381": "true¦hour",
    "3.382": "true¦upon",
    "3.383": "true¦number,stand",
    "3.386": "true¦word",
    "3.389": "true¦lot,though",
    "3.392": "true¦money",
    "3.394": "true¦done",
    "3.395": "true¦s0;econd,it",
    "3.397": "true¦together",
    "3.400": "true¦wife",
    "3.401": "true¦move,water,young",
    "3.404": "true¦enough",
    "3.406": "true¦point,seem",
    "3.407": "true¦hard",
    "3.409": "true¦during,soon",
    "3.411": "true¦does",
    "3.412": "true¦everything,light",
    "3.414": "true¦stop",
    "3.415": "true¦face,write",
    "3.422": "true¦company",
    "3.423": "true¦fall",
    "3.425": "true¦against,few",
    "3.428": "true¦create",
    "3.430": "true¦busine0different,pa0;ss",
    "3.433": "true¦area,free",
    "3.438": "true¦book,law",
    "3.439": "true¦lose,tonight",
    "3.441": "true¦eye,okay",
    "3.444": "true¦lead,pretty",
    "3.446": "true¦anything,stay",
    "3.449": "true¦case",
    "3.451": "true¦gandhi",
    "3.456": "true¦issue",
    "3.460": "true¦die",
    "3.465": "true¦someone",
    "3.467": "true¦cut,drink,watch",
    "3.469": "true¦hope",
    "3.470": "true¦far,side,united",
    "3.472": "true¦got,quite",
    "3.474": "true¦type",
    "3.476": "true¦base,form,kill",
    "3.478": "true¦act,serve,week",
    "3.479": "true¦line",
    "3.485": "true¦h0restaurant;appen,owever",
    "3.487": "true¦kind",
    "3.488": "true¦bar,plan",
    "3.490": "true¦nation",
    "3.492": "true¦cry,support",
    "3.494": "true¦star,white",
    "3.496": "true¦congress,reach",
    "3.498": "true¦himself",
    "3.500": "true¦close,nice,return",
    "3.502": "true¦hey",
    "3.504": "true¦problem",
    "3.506": "true¦remember",
    "3.507": "true¦already,power,s0;een,ystem",
    "3.511": "true¦month,win",
    "3.513": "true¦princess",
    "3.515": "true¦body,term",
    "3.517": "true¦ha0marry,yet;lf,ppy",
    "3.519": "true¦break",
    "3.521": "true¦car,heart,less,question",
    "3.523": "true¦answer,build,door",
    "3.525": "true¦war",
    "3.527": "true¦boy,century,father",
    "3.529": "true¦distri0fa0level;ct",
    "3.533": "true¦used",
    "3.535": "true¦group,hit,read,whole",
    "3.538": "true¦thank",
    "3.540": "true¦fire,wish",
    "3.542": "true¦mind,president",
    "3.544": "true¦idea,throw",
    "3.546": "true¦continue,minute",
    "3.548": "true¦follow,national",
    "3.552": "true¦baby",
    "3.555": "true¦dec2experien1pr0;i0ov1;ce;ide",
    "3.557": "true¦shall",
    "3.559": "true¦check",
    "3.561": "true¦actually,health",
    "3.565": "true¦reason",
    "3.568": "true¦please",
    "3.570": "true¦shop",
    "3.572": "true¦near",
    "3.574": "true¦consider,yourself",
    "3.579": "true¦full,history,kid,table",
    "3.581": "true¦team",
    "3.586": "true¦add,real,tax",
    "3.588": "true¦else,fight,interest,million,poor,sorry",
    "3.591": "true¦low,ma0strong;rket,tter",
    "3.593": "true¦often,son",
    "3.595": "true¦maybe,till",
    "3.598": "true¦force,town",
    "3.600": "true¦course",
    "3.602": "true¦e0;arly,vent",
    "3.605": "true¦black,college,foot,least,mother,spend",
    "3.607": "true¦fast",
    "3.610": "true¦dog,future,god,lady",
    "3.612": "true¦able,claim,s0;everal,peak,treet",
    "3.615": "true¦red",
    "3.620": "true¦horse,pro0sell;bably,gram",
    "3.622": "true¦morning,offer",
    "3.625": "true¦learn,sign",
    "3.627": "true¦deal,four",
    "3.632": "true¦bit,others,sleep",
    "3.635": "true¦bed,m0present;usic,yself",
    "3.638": "true¦bro0ei0ok,public,queen,store;ther",
    "3.640": "true¦commun0secur0;ity",
    "3.643": "true¦class,everyone,l0wear;and,etter",
    "3.646": "true¦grow,sound,whether",
    "3.648": "true¦drive,enjoy,mr",
    "3.651": "true¦allow,carry,hot,parent,rule,save,yes",
    "3.654": "true¦easy,la,pick,tree",
    "3.656": "true¦bill,drop,fi0member,states,ur;lm,ne",
    "3.659": "true¦british",
    "3.662": "true¦death,receive",
    "3.665": "true¦choose,d0office,visit;octor,ream",
    "3.667": "true¦john",
    "3.670": "true¦chicken",
    "3.673": "true¦age,fro0n,park,stude0within;nt",
    "3.676": "true¦air,de,result",
    "3.679": "true¦finish,round,step,uh",
    "3.682": "true¦e,north,player",
    "3.685": "true¦dinner,s0;hort,outh",
    "3.687": "true¦almo0disease,ground,instead,pa0;st",
    "3.690": "true¦join",
    "3.693": "true¦c0island,wrong;lick,over",
    "3.696": "true¦dead,gone,trade",
    "3.699": "true¦account,clean,fly,novel,outside,story,understand",
    "3.702": "true¦beautiful,cost,decision,field",
    "3.705": "true¦a0;long,ttack",
    "3.708": "true¦fuck,los",
    "3.712": "true¦c0forget,gold,increase;haracter,ommon",
    "3.715": "true¦ball,peace,true",
    "3.718": "true¦a1date,education,fun,l0middle,rest,tornado;ay,ol;go,ngeles",
    "3.721": "true¦appear,rather",
    "3.724": "true¦moment",
    "3.727": "true¦enter,finally,taken",
    "3.731": "true¦across,economy,fairy,important,ride,seek",
    "3.734": "true¦given,major,s0;o0pe0taff,ummer;cial",
    "3.737": "true¦listen",
    "3.740": "true¦cold,road",
    "3.744": "true¦challenge,example,phone,train",
    "3.747": "true¦clear,dance,list,record,sea0taste;!t",
    "3.751": "true¦le0rate,single;ague,ft",
    "3.754": "true¦a1byr2club,huge,indian,r0share;eply,oll;cti0rt;on",
    "3.757": "true¦song",
    "3.761": "true¦complete,friendly,process",
    "3.764": "true¦alone,behind,catch,dear,federal,human,inside",
    "3.768": "true¦anyone,budget,dress,leader,note,ready,stuff,view",
    "3.771": "true¦position,ring",
    "3.775": "true¦among,raise,study",
    "3.779": "true¦although,bank,east,possible,review,t0;!hird",
    "3.782": "true¦c0hahaha,information,nigga,pull,remain,west;at,harge",
    "3.786": "true¦expect,general,produce,re0window;form,port,search",
    "3.790": "true¦effort,five,local,sister,wall",
    "3.793": "true¦born,language,paper,sometimes",
    "3.797": "true¦c0lie,miss,space,title,university;!apital,ontrol",
    "3.801": "true¦green,pr0;actice,oduct",
    "3.805": "true¦beer",
    "3.808": "true¦couple,especially,kingdom",
    "3.812": "true¦arm,employee,fill,hang,require,subject,test",
    "3.816": "true¦daught0giant,india,piece,rock,wond0;er",
    "3.820": "true¦chance,press,river",
    "3.824": "true¦agree,c5drug,hundred,noti4p1s0value;en2hip,pot,tanda5weet;ala2olitical,ro0;mi0tein;se;ce;a0itizen;rd",
    "3.828": "true¦building,coffee,develop,french,item,s0whose;even,hit",
    "3.832": "true¦choice,design,file,hair,location",
    "3.837": "true¦menu,opportunity,weapon",
    "3.841": "true¦difference,go1master,n0society,wind;atur0early;al",
    "3.845": "true¦c2d0energy,fe1worker;efinitely,oll0;ar;ertain,redit",
    "3.849": "true¦board,fish,recommend,teacher,voice,w0;ake,hom",
    "3.853": "true¦ah,individual,po0secret,thus,worth;pular,st",
    "3.858": "true¦amount,bear,e0fail,picture,six;ffect,xplain",
    "3.862": "true¦fair,t0uk,v,ya;each,hemselves",
    "3.866": "true¦animal,blue,church,fat,leg,mine,protect,rise,travel",
    "3.871": "true¦a1count,forward,movie,perfect,s0;hoot,trike;bove,ddress",
    "3.875": "true¦a0famous,liver,population,self;greement,ttempt",
    "3.880": "true¦b3c2evidence,gla1hi,ro1s0;kill,port;ss;hain,ondition;enefit,itch",
    "3.885": "true¦co0english,favorite,joke,quality,treat;lor,ncern",
    "3.889": "true¦b1deep,economic,figure,period,s0;afe,ex,ituation;ird,ox",
    "3.894": "true¦appeal,d3hall,r1t0york;ou1v;i0ose;ch;etermine,raw",
    "3.899": "true¦c1guess,key,option,p0recognize;olouse,rofessional;ontract,ustomer",
    "3.903": "true¦apply,cross,describe,freedom,girlfriend,oil,pizza,s0;ing,traight",
    "3.908": "true¦due,e3i1kiss,mom,per,roy2s0version;!pring;nternation0tself;al;arth,ngland",
    "3.913": "true¦al,b1c0identify,source;ell,heese;!eing,lock",
    "3.918": "true¦cent4degree,hate,m2prepare,re0sun,tr1weekend;f3lationsh0;ip;a0ovement;in,rch;er",
    "3.923": "true¦b1co0dad,enemy,floor,propose,science,vote,wine;mputer,ol;eauty,lood",
    "3.928": "true¦beat,d0ma1plant,suppose,wood;a0ouble;rk",
    "3.933": "true¦accord,canada,dama1jud1lunch,sty0troub0;le;ge",
    "3.939": "true¦arrive,di1fre1gr0jump,laugh,motion,search,unless,written;ant,eek;sh",
    "3.944": "true¦a4former,industry,majes5o2person3realize,s0uni1;eas0ir,tati0;on;ffici0rigin0;al;ctivi0uthor,ward;ty",
    "3.949": "true¦anyway,cook,f0herself,stick,wedding;it,lavor",
    "3.955": "true¦complete1golden,ice,m0nor,responsibility,tomorrow,usual1;eal,ile;ly",
    "3.960": "true¦a1b0cri2difficult,focus,govt,particular,terrible;low,us;pril,weso0;me",
    "3.966": "true¦ba2centre,hurt,joey,m0private,simply;arriage,e0;at,ntion;g,ttle",
    "3.971": "true¦d6etc,f4german,h3inde2m1offic5perhaps,s0tir2;ection,ite,pecific;!ilitary;ed;ost,usband;eature,urth0;er;!ick",
    "3.977": "true¦a0cup,immediately,respect;mazing,partment",
    "3.983": "true¦available,burg2code,f1garden,m0opinion,replace,success,thought;easure,odern;inal,low0;er",
    "3.988": "true¦e5fund,le,m3prigio,r4s1tr0;eatment,uth;i0t;lver,ze;edical,ount0;ain;urope,vening",
    "3.994": "true¦conduct,delicious,everybody,fellow,g7m5r2s1t0worry;arget,herefore;teal,urpri2;e0isk;duce,fu0;se;e0o2;ssage,thod;enerati0un;on",
    "4.000": "true¦avoid,baseba4c2development,hi4nucl1s0t1;imple,ort,uper;ear;h0lause;emical,ief;ll",
    "4.006": "true¦average,busy,corn5e4hotel,l3news,purpose,role,s1t0whatev5;ext,rust;a0hoe,uit;lad,uce;iving,ord;h,ntire;er",
    "4.013": "true¦a3christmas,e1growth,l0pu2reward,shape,track,video;atin,ondon;ncourage,sta0;blish;dvance,rmy",
    "4.019": "true¦billion,contain,de4f2in1s0theory,waste;erious,mile,trength;fluence,volve;estiv0inanci0un1;al;ny",
    "4.025": "true¦aid,band,c7egg,limit,manag6nature,p4quickly,r3se2t0;e0oward;chnology,rrorist;par2rv3;!ange;ack,l0;ate;er;hina,ontact",
    "4.032": "true¦application,discuss,e4introduce,lack,mouth,ne3p1regard,s0ten,warm;ale,enate;ro0urchase;ject,perty;!cessary;m,xactly",
    "4.038": "true¦attention,beyond,chinese,discov2f1insurance,james,material,object,policy,s0wollstonecraft;creen,ecure;eeling,ing0;er",
    "4.045": "true¦a5b4d3hell,m1own2principle,sentence,t0umm;ea,otal;inist0urd0;er;ecade,ry;east,ottom;bility,ttend",
    "4.052": "true¦a8boat,cheap,d5exist,h3i2judgment,knock,l1majority,o,p0;age,erform;ink,or;mprove,rel4;ide,o0;nor,spital;e0irect;m0n;and;ccept,pproach",
    "4.058": "true¦argument,c5dwarf,european,gain,i3kick,lift,no4o2pocket,r1suddenly,wi0;lliam,ng;ace,eg4;ccur,nli1;magi0nvite;ne;areer,onstitut0;ion",
    "4.065": "true¦a7c6d4e3investment,s1w0yellow;an,ei1;elect,i0uggest;ght;l1xpr4;epend,ir0;ection;ivil,ulture;cc0frica,sleep;ess",
    "4.072": "true¦anymore,burn,extremely,legal,pe4re2s0thr3winter;a0peed;d,ndwich;move,p0;eat;ople,rcent",
    "4.080": "true¦afraid,c2maintain,nose,p1rachel,s0unit;imilar,pread,tage,upp2;artner,rove;ertain0razy;ly",
    "4.087": "true¦ally,ca1glad,h0manner,pair,sultan,wonderful;ealthy,o1;ptain,st0;le",
    "4.094": "true¦aBcAd8e6f4ge2heisenberg,most3s0;eptember,h0quare;ake,ut;neral0orge;ly;an,ore0ruit;ign,st;mail,x0;celle1ercise;efenda0uty;nt;alifornia,lothes;head,rgue",
    "4.102": "true¦app9britain,c8doubt,fix,id,lo7mo6p5r3s2t0wide;ip,r0;aining,oop;ignificant,moke,word;e0icardo;cently,lease,source;ath,lus,ush;lecu2nica;ck,ss;ap,handler;le",
    "4.110": "true¦a7b6c5eight,interview,ju3k,magic,ne2quick,re1structure,t0various;all,w3;quest,sponse;ither,twork;ne,st0;ice;ouncil,urrent;ottle,rand;chieve,ngry",
    "4.117": "true¦cr9defense,e6football,h5i3launch,mexic4normal,pop,relate,s2t0wild;hous6o0;ugh,wer;hirt,tupid,unday;raq,tali0;an;igh2oney;asi1xp0;and;ly;eam,own",
    "4.125": "true¦aDbCcAd9f6g5hero,internet,l4mass,no3pr2s1t0village,w7;ap,ex4;peech,tone;event,omote;body,rthern;a3ong6;as;iredra1l0;ow;ke;eliv1iamond;entral,hamb0;er;eg,irthday;gency,uthority",
    "4.133": "true¦aCcAd8e4fou6global,income,l2model,p0religious,slow,ticket,varie7websi3;ain,hoto,m,o0roud,ursue;lBrt;eh,ibrary,oca0;te;arn,mp2x0;cept,te0;nd;ty;ai0eficit,irect0;ly;amp0omplaint;!aign;dv0ustralia;ice",
    "4.142": "true¦a9d8gift,heavy,ir7july,lu6m5p4s3t1w0;ill1omen;hink0ool,tc;ing;ery,i2;ositive,rogre4;etal,issi1;ck;on;amn,irector;ss",
    "4.150": "true¦a4ban,c0desire,ear,forth,ho,lo2museum,rush,statu3truck;elebra2o0;a0rr4;st;te;ff1mend0ppoint0;ment;ect",
    "4.159": "true¦a6c5d4fr3g2holiday,journey,length,ma1p0strange;articular7rovis6;p,ssive;ay,entleman,overnor;ance,y;ata,epartment;ake,opy,reature;bsolute1ddit0;ion;ly",
    "4.168": "true¦aAb8county,d7eventually,fash6hiBi5knowled9loud,m4ob3pai2s0tmr,working;elect5now,omebody,p0tateme1;ecy,in;nt;serve,tain;ana4ouse;mpossible,nspi5;ion;esert,istance;ike,lind,order,rid0;ge;lright,wa0;re",
    "4.176": "true¦acGbFcBd9e7fa5kitchen,m4native,p3regular,s0throughout,uncle;c1eni5oft,u0wallow;ff8rfaC;ene,o5;atient,hoebe,rop6;aBeeting;ct0ith;or;arli2nsu0;re;ecemb0iet,r;er;on0rowd;clude,v0;ersation,in0;ce;ite,ranch;id",
    "4.186": "true¦aEbDc9de8fancy,inveFjaquel7known,likely,ma6o5p2represBs1t0weather,youth;ask,ie,owards,ri3;cotland,kE;hysic1o0;rtion,verty;al;cean,verall;ch0d;ine;bt,tail;ha2o0;mmitm0nfirm;ent;ir,rming;oss,reakfa1;ladd1rre0;st;in",
    "4.195": "true¦airport,below,cDdAe8h6jury,le5m4o3prize,roof,s1wa0yo;shingtBt;ca5heep,ky,pir0ubm0;it;oh,pening,rganizati8;atch,ou4;adership,ss6;and0eat,uh;le;nvironme0qual,verywhere,x;nt;emocracy,r0;ag0iver;on;arpet,o0;mplex,nnect",
    "4.205": "true¦aCbAcoBdestroy,e9farm,g7initiative,mil6p4s2t1w0;!elfaCheel;elevisFiny;ett0oldi5plit,trugg0;le;acific,erfecAlaying,o0;litics,und;k,lions;ath0uard;er;ngage,xtra;e0owl,rain;ach;dmi3pparen2s1tmosphe0;re;ian,sociate;tly;nistrat0t;ion",
    "4.214": "true¦aCbAd8f5gra4mon3p2relief,s1t0urge,weird;error,hreaten;atur1erious4hould5pendi9tatus;etit6ref4;day;mmar,nd;arm1ebruary,ollowi5ul0;ly;er;ecline,ivis0;ion;asic,elo0;ng;narchist,rticle",
    "4.224": "true¦aNbJcGdisordFeDfCimage,joy,knowBlegislatAmonstFp7r4s1transfFwa0yesterday;itAsh;essiIoul,t1u0;cc9rround;ock,r7;e0obert;a0quire8;lity,sonA;l1o0ress2;em,tential;aintiff,eas0;ure;ing;eed;ra,scape,vil,xperi0;ment;er;a1omfort0;able;fe,sh;asically,et,r1utt0;on;ight,o0;k2wn;im,l0rtist;haz0ive;en",
    "4.234": "true¦aKbIcGdDelement,fCgraBill,j9kinda,l7m5onto,p2quart8safeFt1u0;m,su5;ailor,housands,otally,radiJ;i1r0;isIoducH;nk,tch3;ill2usic0;al;awy0iao;er;a0urisdicB;nuary,panese;b,ss;allen,irm,riday;espi9i0runk;r0vide;ty;ircumstance,o0u6;llect,urage;athroom,o0;ot,st2;fford,ppropria2rbitra0;ti0;on;te",
    "4.245": "true¦annouLcGdeFemployEfAhorribBlemKm9neighbor,ourselves,p6r5s1thin,w0;ave,ent;cream,eize,hi2outhern,p1t0;rengthen,uck;anish,eakA;ft,ne;emind,omaF;o1r0;esent5oceed;ol,ur;emory,ode;a1ema0old3;le;ir0ult;ly;er;feat,pre3;hannel,o0;m0s;mi0pare;ssi0;on;nce",
    "4.256": "true¦aRbJcIdFeEfChBimpose,japAknight,l9m8na,orange,r5s2t0unfortunate1vegetable,writPx;homas,ru0;ly;cienti1mart,u0;gar,shi;fCst;ank,e0iK;ce0ligMpublAspoGtire,volutM;nt,ss;edicine,istake;o0ucky;an;elpful,unt;!antast4la0;g,t;rror,xecutiF;e0ifficulty;fe6mocrat0;ic;harles,ommit;alan6e4o2r0;e0o0;ad;w,yfrie0;nd;ginn0n;ing;ce;ppro2s0ugust;ia,sociat0;ion;ve",
    "4.267": "true¦aJbid,cEdDeAfacili9g8ii,load,m5p4r2st1tail,w0;elcome,henever,rap;able,orm;adio,e0;cove3j8;len4ot;a1e0;dia,ntal;ry;a2uide;ty;d5l1ngine,stima0xchan5;te;ect;are,ec3;h3o0;mmand,ns1vera0;ge;ent;icago,ristian;d,fternoon",
    "4.278": "true¦aDbc,cAdang9f6gym,h5loveCm4nail,o3pr2quiet,r0successful,tour,writ9;e0oute;ference,gula5pair;etend,otest;ctob5hh,ught;agici9erchant,irr3;a,eaven;av1unc0;tion;or;er;l0ommercial,raft;ear0oud;ly;dopt,fric0;an",
    "4.290": "true¦aKbIcGdEeAfool,growing,h9i8licenCm6november,op5root,s3t2wa1y0;ard,ours;itress,les;aco,ooth;ecretary,lightly,t0;eak,retch;erate,po6;a0ike;le,nagemE;ntend,slands;at,idden,orn;mp2x0;am,cu0pens9;se;ire,loy;a0ownload;!ngerous;lerk,on0;cept,sist;asis,e0ride;havior,lief;ccid1ffair,g1lternat0;ive;ent",
    "4.301": "true¦aHbFcCentirely,fBgolf,honest,inveEjournal,lion,m9newspaper,otherwiIp7re6s3t2v0ye;alley,i0;ce,olen3;hou,rap;acrifi1nack,tr0;ategy,ip;ce;flect,leva7sto3;a0owerful;ttern,yme5;ama,edica0ovy,ultiple;re;etch,olk;anadi3ha5o0;mplain,nte0z;nt;ipartis0urden;an;c1dvantage,li,nybody,ri0;se;ademy,tive",
    "4.314": "true¦aTbRcKdJfailuIgotten,iraqi,liHmFp9quDr5s2t1u0;nique,pdP;empNraffic;l1o0teel;mewheEup;a2ip;a2e0;presentati0ser0;ve;re,y;a4e2hysics,r0;ay,o0;be,tB;rm0t;it;nt,rliameF;a0inecraft;gazine,yor;berty,terally;re;etermina4isappoiArag,ude;hocol5irc4o0risis;at,ll1m0ndo;bat,mittee;ec0;tion;le;ate;eef,irth,o0;dmin,mb;ncie0ssume;nt",
    "4.326": "true¦aObMcHdDexamiChaBiAj8label,m6n4o2plaCrandom,s1t0viole9western;ale,ech,heatOony;an,olEu3;cc0mg;asFupy;e0oise;ck;at0eaning;e,h;oi0uice;nt;gnoEnfo0;rm;ne;a1e0ismiss;bate,lay;t,v0;id;a3hest,l2ompetit1r0;a4iminal;ion;assic,ever;lm,tegory;ell,lame,u0ye;sh;dult,nywhe0;re",
    "4.339": "true¦aMbLcEdCeAgermany,instituBj9lean,m6neighborhood,pr3richard,s1t0;ape,om;chedule,howEo0pell,upre3ymptom;lve,mewhG;evious,i1o0;posJsperity;me;a1i0orH;n,x;dam,il;ack,udiciE;astern,limina0pic;te;e0isappear;sk,vi4;a5h4o0ryst9u8;mment,n1p,unt0;er;cert,fiden0;ce;at;ptu2ve;ond,ulb;ddition1narchism,ssu0;re;al",
    "4.353": "true¦aLbKcJdHedit,factoIgeGhaClBnormalDoAp8r6s4t3upstairs,w0y,zoG;age,hoev1i0;nn0tness;er;alk1hick;ervaHhot,w0;ing;e0ussian;su7veal;aul,erformance,o0;et,rk;dd,rdina7;abBegislation,imited;n1rd0;ly;dso0s;me;ne;iscove0ocume4;ry;heat,limb,oin;eside,out;dventure,mbassad1ppoi0rrow;nt;or",
    "4.366": "true¦aRbQcLdIexploKfGhEiCjim,mBoAp7r4s1u0van,w9;gLnderstood;a1cottBett4he7m0;ell,s;lary,nta;e0id,ow,s,uin;ad0venue;ing;lan1ri0;nt,or;et;peraDwe;rs,sg;mportance,r0;ish;abit,i0;ghlight,ndu;or0riC;cBever;e0ispute,owntown,rake,u6;cla0serve;re;hip,lo3o1urrent0;ly;!nstruc0;tion;ck;ind,orrow,un1;cknowledge,hm1tta0;ch;ed",
    "4.381": "true¦aTbother,cLdJeaten,fiPgHhoFinDjuveniXmCnBp5r2s1toy,u0weak,zealand;niform,ps3;alt,ink,lowE;esponsibUo0uR;ck0man;et;a3e2r0ure;e0oceediB;gna6sence;n,rmane5;r0ssG;is,ticipH;egative,oodL;agnifice1uslim;depende0stitutCteresti4;nt;nest0p;ly;a0raduAuest;ng;e0na;finit5sseA;a5o0;n1u0;ch,sin;flict,ne0stitutional;ct0;ion;ndid0st;ate;ccuse,ffordab3maze,n2pa1si0;de;rt;alysis,xiety;le",
    "4.395": "true¦a00bYcUdRexcepQfMhKinJjIlEnCoAp9r6s3t1useful,v0wiX;ariaPictim;as0emperaMheBrus0wen0;ty;c1ho0ileXtatue,uppC;re,ut;aJrP;e0unning;l0nt,solve;ax,y;!atio,hilosophy,itch,ledSroof;rigin0scar;!ally;ickna0ut;me;a2ets,o0;g,v0;er;h,ne;ail,esus,ohnsA;ju1stant,terpreta6;ai,ighway,ung0;ry;ourth,u0;el,rni0;tu0;re;ti2;i0r3;g,scussi0;on;ircuit,o1r0ustom;ew;mbine,nfu0;se;ay,u0;cket,ry;broad,lle1nnual,ppeara0;nce;ge",
    "4.411": "true¦aXbTcOdKemperJfFguarantee,hCi9kay,mood,outdoJp7re6s4t3unusual,v2w0;arn0orthy;!i3;eterVia;end,hai;ayi0plendid,tr9uddCwear;ng;acBcover,gime,mark,publicR;atOig,otato,re0unishmeD;cious,viously;mm1n0;stall,telligG;ediEigra9;a0enF;ppin0rE;ess;alse,ounda2r0;ight0oz0;en;tion;or;e1id0;nt;l0monstr3;hi,ight;hemist3o0rack;nfer1rpor0;ate;ence;ry;e1ob,r0;ave,ief;n0sides;ch;fghanist0lbum;an",
    "4.426": "true¦aUbRcMdKeJfHgFidentEjeff,knee,lCminXn9opus,p8r5s3t1v0wo,zero;ancouvXe,is6olume;echnique,ra0;ditional,nspN;a0cott,e7hock,picy,ummaCwitch;ke,ra,tisfy;at,e0ub;presentat0solut0;ion;akistan,lain,ossibil5roceduQ;e0iB;ed0t;ed;am0ectuM;b,p;ity;alle0raC;ry;light,r0;iendship,og;fficiCnable,ve;efi0istinguish,riven;ne;eiling,o0;m1n0;stitute,trast;f0prehensive;ort;atter1egun,lon0reath,utl6;de;!y;cqui4ppetiz3r0ssistance;bitrat1rangem0;ent;or;er;re",
    "4.443": "true¦a05b01cWdSeNfur,goose,iKkorea,lImHnGoDpCr9s6t4v1w0;a,eigh;e1i0;ctory,rgin7;hicMnue;i2o0;ilet,ne;a1e,heltTkip,li0omehow;ght;il,vM;e1uss0;ia;latRmora;enalty,ortlaRrincipal,ub;bviousLn1ppo0;n7siJ;i9tario;akMeighbourhood,obel,umerous;all,on;attHe0oneG;arnBgisla7;mmigr3n0rL;dicaCstrum0;ent;ffec3ntit2xplan0;ati0;on;le;tive;a1i0ownstair,ust;ne,splay;nc0rkness;ing;arri3hris,on0rab;stant1tribu0;te;ly;er;ackgrou2iology,r0;e0unch;ed;nd;bt,lcohol,pp,ustrali0;an",
    "4.460": "true¦aXbRchildren,dQeMfLgJhIiGjus,korean,lEmAp7queSr5s4t1univer9vo0waU;lunteUtU;erritory,hread,i1r0une;easu0yC;re;hown,ingQpecificalTum,ymbol;ach,e0unnP;moHside1;hra1leasa0ossibQrofessor;nt;se;a,e1i0um;chael,ll,nim1;di0reL;um;ee,l,ook0;ing;mpact,nd0;ependen2ustriH;ello,istoric;ilbert,ree0t,ulf;ce;amiliar,ew9lorida,orty;v2x0;ecu0pressi8;te;eryday,oluti6;on,ump;a1u0;st;c2rte0;nd0;er;on;ctu1rrange,ssemb0ttorney,wake;ly;al",
    "4.478": "true¦a01b00cMdLeKfHh06iFjEkillWlDmBnobZp7qaeda,r5s2t0uAvegetarian;on,ra0;ce,nsacS;a1ch,hadow,pare,u0;bstantiEici00;dTnd;e0iZosalind;laNquired,ver2;artnership,e2ha1laywood,oll,r0;escripLo;se;ppL;erit,o0;biMd,nkey,v6;!ouis;!ar,ewel,oe;bn,de2lleg2n0;gredie9te9;e7ind1ly1orm0requentG;al;ing;g,ngineB;er6isastA;aAha8o0;lour,m3n0;fro1te0ven5;st;nt;m1petit0;ive;erce,unica0;tiC;pt0rt;er;b1reful0;ly;le;at,one,uck;band5nxi4pprecia3rts,t0uto;lantic,t0;itu0ract;de;te;ous;on",
    "4.496": "true¦a0Fb0Bc00diZeWfQgOhNiKkristeva,lImDnCoceania,p6rail,s2turkey,u1vary,w0;ait0Ce08;nlike,sa;cheOexu03hell,ile0Fo2p1t0wim;air,em,olDream;i0GokC;ftwaDlut02;a4e3ile,olitician,pl,r0s;e1ofi0;le,t;paVserve;arl,rsonal08t02;ce,sta;earby,urL;a2i1o0;o4rris;!sfortE;id0kWrie;en;azy,end,iteratu0sd;re;n0srael;itiKs0;i2tructL;ood,ug;ho0reet;st;a4ifty,o1ra0;me;ld,r0;mula,t0;une;ke,te;ntertainKxpe0;ctatAn0;se;p,rt,scouI;a9hef,o1reati0;on,ve;m4n0;clus4gression2s0;equFide0;red;al;monwe1pan0;ion;alth;mpus,nc2;aba,e2u0;g,tt0;er;an,droom;bs4c0dvocate,ustin;cording2hieve0;me0;nt;ly;en0;ce",
    "4.515": "true¦a0Ib0Fc01dWeTfRgPhMiIjoseph,kHlGmax,oEp7r5s3t2un1v0Gw0;eep,hip,innN;ab05comfortab05happy;al02e08;leepKpy,tare,u0;bsFrvive;e0urH;ad5commendaWgret,scue;a3c,e1o0ri2;lluUssC;ak,rsua0;de;n1rticVsseng0tT;er;el,touflia;bligaOr0versea;ganic,iginaT;abour,ead7;ennedy,i;lln2n0;n,s0;tance;ess;ear1istoric0orrY;al;ing;oAra0;ham,y;a0ifth,lash,ounta8;me,vouriG;mergency,ntry,x0;act,p0treme;ansiLoO;a2e0ozE;st0voB;ina4ruc4;niErw0;in;aAho8l6m,o0yc5;cktail,n1rpora0unsB;tiD;s1tin0;ent;o0ult;le;assroAima0;te;p,s0;en;b,n0;c0dy;el;bq,ens1re0tw;ast;on;bu3dvi3ffirm,nne,pologize,rm2sse1t0;om;rt;or;se",
    "4.535": "true¦a0Ib0Dc00dXeUfrSgQhOiLjam,lKmJnIoGpDquo0ArAs5t2upgra7v1wi0;ck0Gf;acancy,ePiola08s;a1ermin0Kh0ong0Guesday,wOypicalJ;umb,y;g,nk,t;a3cholar,e2li1t0;adium,ir,rongF;de;c0Fvere;ck,l4usaJ;e1i0;dRghts,p;cruit,gis02;arkPeninsula,re1ublicati0;on;cedeWsidenti07;b0ffenSlymp03so;jective,vious;ecessari3yc;etropolitan,idnight,oni04;ab,ip;n1ta0;ly;sIventoB;epatVi0;nt,p;ett0uinea;in;ank,id0;ge;at8gypt,mploy1n0;force0traB;meF;arl5elive1istaEomestMr0;aft,iv4;ry;hampionship,lAo3r0ulturM;aft1u0;el,st;ing;mp3n0w;scie1v0;ert;nce;e1o0;se;te;ie0os5;nt;a2e0jp,ro,ur7;ard,lt,t0;ter;de,s0;ed;c5fterwards,graw4lien,nge3ssi2tom1ven0;ue;ic;st;l,r;al;tor",
    "4.557": "true¦a0Ob0Kc0Gd0Ae05f00gXhoWiSjeRknife,looVmPnoOoJpDreCs8t5un4v2w0;a0e0Mithdraw;l0Knt09;entu0Fi0;ctoria,ola05t0B;!known;eGh1r0;ea05iggG;erapy,ir04rone;aiZequence,i2t1u0;b,reO;atisAroke;gn03m;aliIsiR;e4hilosoph3ie,lastic,ortrait,r0;act2i1op0;erIorT;m08oriV;icX;ptide,rspective;bli6ffe2gYp1rgan0;!iz02;tics;nd0;er;e,wheT;assa0elt,iranda;ge;rsey,wish;e,n0;ch,stant4te0;n0rstaC;se;nour,ok;al,e1oodbye,reat0;ly;ar,nI;e2l1or0unerE;gotten,ma7;ame,ip,ood;a0e;st;di3lepha2mo3n,ssenti9x0;amina2ci0hibi2pJtraordinI;te;nt;tion;c,e2igni1o0;ing;ty;ni1te0;ct,rmin8;al;amera,e2losu1o0;mpel,re;re;nsus,remony;alanc2elov2u0;ddy,l0;let;ed;l1nnivers0sh,wkward;ary;ert",
    "4.579": "true¦a13b0Yc0Ld0Ie0Df0Ag06hZiUje0VlSmPn05pJrFs8t2unemploy0Ew0;eb,i0ooden;ndows,sdom,t;axpay15h2i1our0;i3na0A;l,ssue;e0roat;at11rapi0;st;eafThort0Si4m3o2p1tudio,u0;ggesMrv09s0U;a0Cit;da,vereign;i1oo1;gh,x0;th;a2e0i8oomm01;lative0Kt0;a05ireW;ge,pe,w;aint0Fersona9i3lug,o2rison0Ou0;blish0Nrp0;le,os;is05lish;l0n;ot;ariBe1iss09o0yste00;b,narch;re,xico;iabi0o;li03;mproveJn0slam;c1itial05ten0;tiV;entive,redibl0;e,y;a4c,e3ollyw2u0;ng07rrica0;ne;ood;aviXritage;nn0v;ah;en2oogle,ri1ui0;lPtar;ef,ll;dYetic;ailed,i1oundXreeze,un0;ctionUdN;nance,refox;ase,d2lsewhere,n1quip0st3;ment;countStree;uc0ward;ate;e1isn0rawGumb;ey;but,cor,posit,vil;aAhairm9lo8o2ur0;rency,ta0;in;al,l4m2n0rn,stume;g,tra0;ry;ic,passi0;on;o8umbia;se6th;an;paci0reful;ty;a1reed0;ing;h,lco1re0;ly;ny;l3r1s0;pect;riv0thur;al;arm,t0;er",
    "4.602": "true¦a10b0Xc0Fd0Ae01f00gWhSinRjr,ke,lPmKneIoHpCr9s7t6u4vi1w0yelp;arri2el0I;n07s0;it0u0P;or;hh,ltimate0nivers0Ns0P;!ly;ennis,hursday,witt0N;a0ervi8o0Qtra8;dd0Pid;ati6e1i0omant0M;dicul8v0H;duc0Al0QsolvS;a2ercei0Qlatform,oTr0tolemy,uni06;ay0Gi0;est,vileT;ckaSle,n,yi0;ng;bDverco8;ighbour,rv0;ous;a3edi2is1ol0;i0Fly;erab0Bsi0B;caYev04;c,inP;argeOifeti0;me;n02venU;ealthcare,o0;ck1ly,us0;eho2tS;ey;!lo2r1ui0;ld;andmothVey,oce0;ry;reak,undamentR;l,m5n3t,xten0;d1si0;on,ve;ed;a6for3rico,terpri0;se;bra1er0;ge;ce;e2is0u;agree,cipl5tin0;ct;ep0signC;ly;aFhDlassBo4r2u0;is0rM;ine;it8u0;sh;lumn,m4n0urti9;fid2sist2tribu0;ti0;on;ent;in,munic0;ate;ic0;al;arity,e0;er;binet,nd2rol,thol0us;ic;a1loody,oil,ubb0;le;be,rn;dministr1ge0ssault;nda;ati0;ve",
    "4.627": "true¦a12b0Vc0Pd0He0Ef0Ag08h06i00kill0SlYmQnPoOpKrFsCt6u4v3w0yie0Z;eek0Ch1i0;ls02zard;ereas,oa;ess3ietnam;n0rban;d,iR;i4r1unn0wel0M;el;a0end;ns0sh;form,laM;ff,g0S;ampIe1toma06u0;b5e;at0DnatN;a1e0;!ign,publicans;i0p,ve;l0th;way;ar2hiladelphia,i1lKro0;fessiIvince;raAsZ;!o7tP;ak,ccasionalOffensi04;evertheless,otab5;a3emori06i1or0usc4;eov0Crow;d0les,ni;g07st;gistra2n1rb0;le;datoTufactu08;te;il,o0;bGw04;di4mpress2n0;sect,teri0;or;!i0;on;ot;ail,ijazi,mm,oldLu0;rIt;ardenVe0rain;m,nt3;acebook,loat,o0requency;r0x;ge,mer0um;ly;a1motionIn0;t7vironmentH;stN;e6i2j,rown,u0;ct,t0;ch;ctiona5n,s0;abil1clo0;se;ity;ck,mocrats;hi4o1ur0;ry;llecti1m0ntainCrnwall;ing;ve;ck,ldhood;a4e2iologic1onus,r0;eathe,onze;al;ho0neath;ld;ckwards,sk0th;et;ccompany,dmi2hh,l0nnoy,rizona,wful;phonso,togeth0;er;re",
    "4.654": "true¦a1Mb1Dc10d0Ue0Nf0Eg0Ah05in02j01ko,lZmYnWooo,pMrEs8t5understandi1Wv2w0yoga;arehouOhisp0Ki0ou1F;pe,re,t1C;ac14i1o0;n,ya0U;be,tam0C;e15hee,oa1Br0ypic0G;ansport10i0;ck,ll10;car4ettle0Gh3i2lap,ovi0Tpi1t0urge9;eYraw;d0Ate;gnature,mi7;arp,elf,ield,udd08;ce0Red,y;a6e2o1ug0yE;!by;b,gers,pe;asonab0Nc2gu1volutiona0;ry;lar0L;a0Ze9;bbit,l0JvQ;a8e4hysici6i3ls,ortZr0sp,ussy;ai1evail,o0;fou0Rmpt;se;ll,t;nnsylvanRr0;centa05mi1si0;an;ss0D;k,lm,nic;arrow,ego6i0Ro0;n,thJ;ah,ichel0Qodify;a0ege0GodY;ddKptop,t0N;ones,ung0N;c1dex,fect05i0nov04;tia0K;iJorpora0J;!a1eight,ostAp,um0;anity,or;rbor,st4waii1yth0;am;!an;en2luckste6overn,r0;andchildr0iev0G;en;ie,t0B;a5e3o01rm,u0;ck1nn0;el;in;lic0n0A;ia;ctu1iQrth0;er;al;a5igh4l3m2stablish1vi0xisten05;deM;meL;iEma;d,izabe0;th;gVrthquaG;e4is2ot,r0;essi00i0;ll,nkiZ;char0liC;ge;ed,ntiHscript8;apBd,eAh8o2r0;eep,ick0;et;alit4ke,lleague,m2ns0rps;ensus,istent0ta6;ly;edy,pens0;at0;ion;iAo0;ke;nt;abCe;a5e4iography,la3o1rea0;ch;ld,riGu0;nd;st;comiDnd;ke1sketba0;ll;!ry;c7l3ng2p,t0;lanta,tribu0;te;le;abama,l0;eged,i0;an0;ce;complish,t0;i0ress;ng",
    "4.682": "true¦0:1L;a1Db17c0Vd0Pe0Mf0Ig0Ch09in06j04kind0l03mZnWoTpKquiet0rDsAt7u6ve5w1xx,yellH;a3id2o1;lf,rn;!e0;ff1Blk0XtchD;il,rM;ps,sele1A;attoo,n,o2r1y;ansit,ibe;ma11pic;atelli0Jcroll,haw,il0orr07t2u1;fficie16mm18pervisor;ake,umb13;a5e2o1;ar,bb0Nme;flecImain2n1sin;d0Lew;ing;g,pid1;!ly;a6e5he4leas08o3r2u1;er0Pr6;eparaBimari0;ke,li06pular0Jssessi0W;eb,nomen0V;rsonnMtition0C;r2tie5u1;se;aVi0J;lympics,r1;chard,dina1ganize;nce;ba,e2o1;ti0M;d,ed0H;e2il0u1;g,siciA;anw0Dditerrane9mbers1ntNrry,ss;!hip;ayYobby,ucki0;a1ealSustify;cket,ne;jure,te2v1;estigaMisE;nsYrnal;ans2istori1;an;el;ap,o4r1;a1ind;nd1teful;fathMma;at,odfell1;ow;asten,irework,l1orgiKraud;e1ock;e,x1;ibU;d,nzyme,qu2rr,xclu1;de;al0;a5e2iDo1raF;c,nut;fini2spair,tail1;ed;te;ddy,n,wn;elebrBhAin8lue,o2uri1;ous;lorado,mbo,n1ttM;servati4t1;ext,ro1;ll1versy;er;ve;derlad,e1;ma;arm,eB;ity;a5ooth,ru4u1;ll,r1;nt,ri1;to;sh;nana,re;ctiv7ddict5mino,pplica4sse3w1;hi1;le;ss;nt;!i1;on;e0ist;ly",
    "4.712": "true¦0:21;a22b1Uc18d0Ye0Tf0Qg0Mh0Ii0Dj0Ck0Bl05m02nWoUpNrGs9t5u4v3w1zoo;aterfro1Ieak0Kh1orldwi0V;erev0il1T;a22eg1Pisi28;hm,nnecessa1Jsc;empo02h3is,o1ribu27t;r1urism;ch,n;ief,k;c6h5i4li0XmokInake,occ0pray,qui0Ot2u1weep;p,rviv1H;a1ra15;ndFrbucks;ngEre;a7elley,rimp;oIrat9;e2o1uby;a1EllAta1R;c4dd8medy,na3s1vi1M;e1pective08;arch0rB;me;eipt,ogni1L;a5iWlann4ro2un1;ch;hib1mine0U;it;ing;int0r1ssa11;d1Gibanou,liamenta0U;bser1ffici7li1Apposi1Eurs;va1D;a3e2o1;pe;ckla08r16;i,t1;i0Cur1;alQ;a2i1ortga0Rrt,ustard;lita0GnoC;rquis,trix;a5e3i1ols;ber0Lneup,te1;ra0G;a1sbi0K;f,th0;me,p,wrV;a,indneD;et,ulia;c0Wmag07n1;di3juNnoce05s2teg1;rity;tructor,ult;ct01es;a2elicopt0o1;llow;ppi7v1;en;ar3d,enIl6ro2u1;d,t;ss;a04ba04;atig2irm1le0A;ly;ue;arthquak0conomVgyptiZlectric,x1;hau01it,p1teP;ected,i2lo1o0C;de;re;a9e4i2o1;in,mina0D;sti1vor6;nc07;claNf3s1;ceDp1;era08;en1;ce;llas,nc0;aIelebHhEiDlean0o2r1;!ap,iticize;m3n1rp;gratulati1sidera00te5vicX;ons;b7muniIp1;arisVl3o1;s0u1;nd;i1y;me1;nt;inaO;nderella,rcular,te;aracterist2er1;ry;ics;raJ;bba3ribbe2su1;al;an;ge;a5ehalf,iHl2oo1;st;a2e1;ed,ss;de,nd;il,k0ll1;et;er;bsoluAc8dop6mu5n4sto3ttenti2u1;di5tobiography;ve;nish;drew,thrax;se;ti1;on;cepta1re;ble;te",
    "4.744": "true¦0:2E;1:1P;a2Cb1Wc1Dd12e0Zf0Ug0Rh0Oi0Hj0Gk0Fl09m00nZoYpQrMsDt9ub0v6w3y2;on1Tup;e3h2il;!a0U;althy,dnesd0I;al2ulner3;id,u2;ab0Q;e4h3obacco,r2ui1;ansla1iv1J;e26ru;lephone,mp0r0Xs7;a9c8e7it6lave1Jo5p4t3yn2;dro14onym,thes0A;eph1Ura1W;eaki1Kur;cg1Sfa,lMur;ti1I;al,conda1Dnsitive;!oR;fe12lm17nc1t;a4e2hy0W;a0Zbuild,gardlIp2treat;!uP;id,re0Y;a8e6h5iano,lay1Lr2;e3ick,o2;duc0mo1;cise0Ulimina13;ilosoph0ysici1L;a2nTrceiv06;ce0Fnut;in0EncaU;ffe1Argani0Nyst0;ightmaMoveli1G;a7cphers0Se6i4o2yth;lecul2p,rt11;ar;croso1Estr2t;ess;h,sseng0;in3n2pSsk;date,ufactur0;e,la10;a6ettu0Vi3o2;op;festyNg3mi2qu11;ta1;a1ht0M;borato0Iunch0;ar,erala;ord12uz;ii,llino7m5n2;do0Uqui3stagram,t2vest0U;errupt,roduc1;re;l2p02;ay;is;e0Ei3o2;e,peM;ke;enerosiYlobe,ra2;nds00v2;e,iW;a5ev0i3lutt0r2ulfill;ed,o0K;dd2x5;le;lkenste0Dre;d3mpow0nterta0Cpisode,stablish2uro,xtern03;ed;it0Bucation01;aAe8i5o4r3um2;!pliX;ead7ou9um;cumentaRuB;scr2verF;e1i2;mina1;light2pt,s;ful;mmQyli2;ght;aHeDhristianiCivic,lBo2rui8;m5n3sta,u2;gh;su2vi6;me;mon5p2;a3ri2;se;ct;ly;ay,iD;ty;l4rtifica1;ti2;on;ia;lo3mbrid2rt;ge;ry;aEeBf,iAlew,o7rut6u2;llsh4mp,r2;ni2;ng;it;al;o3un2;ce;!m;le,n;at3foreha2llissima;nd;en;chel3s2;in;or;fgh6ircra5lexand0rd,thei3u2;nt,thorize;st;er;ft;an",
    "4.779": "true¦0:2V;1:2S;2:3P;3:3B;4:2O;5:3N;a3Cb2Yc25d1Ve1Qf1Ig1Dh17i11j10l0Wm0Pn0Jo0Ep05quanti0OrYsNtDuBvAw6;a8e7hi6orkpla3;sk2Qttingt4;d,n;nd,rs;a36ir05ow;nf6rge5;air,ortuna2B;aEeBh9o8r7u6;!b;ail,u2W;w16x34;a,e6ru2Bund0;oret0Ireby;chn0Henag0nsi4rr6;i6or1T;b2fy;ck0Slk2U;aEcFeDharpn2ViClipp0nowfall,oAt8u6ympathy;bseque5fficient2mm1Apport0r6;ge4rouX;a6e1Picklefo31ri1H;b,ck,mp,ples,tuto2I;ap,b0lo6uthea20;!m4;lk,multaneous2xZ;an,conds;dd6mu0Q;am;aBe8i0Uou6ul1;gh6t21;!ly;cogni1Lg7markab0Dp6sort;eated2lace2U;i1Gula1K;dar,inbow;aDhilip,iClBo9r6;e7o6;gram2Hmpt2spe10;mi0senta1E;pulo6rtugue2Kwd0;us;ag1Jun16;er3stol;d,ragraph,ycheR;penings,r9ut7ver6;look,whelm1;er,sta6;nd1;edi,gan0V;a9e8hi,i7o6vm;nsen29vo;e3ggas;gotia10utr1R;s6to;ty;a9e7o6s,unicip1O;ck,nth2untains;chanic6nt0Nr0Qtro;al,s;de,g7k1nufactur1r6;ket1t1M;ic1I;a7ewis,o6uxu1D;be,un0Kv1;d,mar6te2;ck;immy,uni0E;gnorJmpris4n6slam1J;f9qui17stru05t7v6;estiga0Jo1M;eract6ro;!i4;a5la0G;aAe9ft,ir1o8um6;!b6;le;ld0mel18us1;n,rb;s0Btr1I;r8u6;id6m;an3;a3ett6;el;ac04eCiBormat,r8u6;ck1r6;na3thermo0U;an6en;cis6k2;co;!b0nish16;ath0mini03;ag0cho,e,ssenti18u,x6;c8p6;iTlo6ress2;it;essiLlaim;aEeAf,i6ramatic13u0Uyslex0P;m8s6;!appoint0Zc6tribuQ;!our0V;!e;a8fault,p6r,sign0;ende5i6th;ct;l0n;sh,ve;aUe,hMivilian,lLoBr7u6;m,r0N;a8eat7itic6;ism;or;ve;ck,mDn7ok0Jtta6;ge;centraAs7venti6;onZ;ide6um0;ra6;ti4;te;b6pone5;!in0A;assify,iff;a9e7ri6;st;ek,q6;ue;lk,mpi4r6;iot,l6;ey;on;ll1r7ther6;ine;b,olina;ing;aHeElCoAr8u6;nny,tch0;er;a6eeze;!ss;snia,unda6;ry;a6esO;nk;aup7ng6ta,wa7;al;re;ng,rga6the;in;ccJdvGftEka,liDnytiCppare5rmIssBttractiAu7waren6;ess;dien3thent6;ic;ce;on,ve;et,ista5;me;ke;!erwa6;rd;anc7erti6;se;ed;ident8omplish6;me5;nt;al2;ly",
    "4.816": "true¦0:31;1:2T;2:2K;3:2J;a2Ob2Ec1Yd1Le1Ef18g15h12i0Wj0Rl0Mm0Dn0Ao08pZquant1ZrTsGtBu9ve7w6y4;ell4outube;!ed;hist30orkers;ggy,t4;!o;si0t4;iFt3;a7h6ime2ot,r5u4wi0M;na,t2Q;adi0ip2T;anksgivi0ink1W;b,pest25;am,cFeDhCiBku08ma0Yp8t7u4weetie,ympho0G;b5ccess26ppor13s4;pe1Ota1S;redd29u1D;at,eady,ocki0rateg2A;!a5ecia4;lize;ke,rk;mi,tu2D;ade,ed,ri0Yuttleworthy;ldom,p4rpe2Overe2xy;arate2t;out,reeni0ulpt2A;a8e5ib,o4u0U;am,g3;ar,imburse21j5m4nt1;a1Aov1;ec2Doi28;dia2CilroMmXtion1;eAo9r4uss;e7o4;misis,se5te4;ct1Esta2C;!cu27;dict,ferr1Cgnan0Wmi0Y;st3tt3;nQr4;pendicular,siste27;ath,bjec22ct,pera0Cr4;al,lando;azi,e5o4;d,on;phew,w2;aAe8isle7lb,o5u4;d,slims;n4t1N;k,opo2u1G;ad;chanism,d1n4;!us;i,laria,nki0Mrsha4xim0I;ll;a6e4ikewi0Cocal00uv;ak,g4igh,p3st;al2itim1D;s,w4;n,su12;a7i6ohn5u4;an;ny;st;w,zz;an,m7n4;fo,te4vi0C;llectu1r4;est0Hpret;munMp4;eri1le0V;a5ome4u;la03work;m,rAve1A;arl0Pl5r4;adual2egg,ip;an0Yitt3;avo8i7l5ollow3r4;eque15ustr0S;i0o6u4;sh;fteen,ght3;ur;ffective2i9lectric8nd7quivale10valu0Nx4;cellen0Qis5peri4;enc00ment1;ti0;eav0Ki0;ity;ne;eEi8o6r4;a4ift;in,m06;ll,nat4;e,i0M;a7git1n3plomaAs4;gui7t4;ribu0Iu4;rb;gno4ry;se;cen4dic05er,m0Fparture,velopK;cy;aFhEitizenship,laDn,o6r5urricul4;um;owdGuY;ff9mmand3n6pp3r4urtesy;d,respo4;nd;!e,sul5t4;emporaFractX;ta04;in;p,rify,sh;art3imney;l5r4thedr1;b00rot;culPl4;ed;aAe8i7obby,r5u4;l2tt;ewe4oadway,uP;ry;l2tter2;auti4e,verage;ful2;d2nn3seB;er;ly;dKgi0isIlGmFnCppellants,r9s7top,utom5wa4xe;it;at4;ic;sign,tonish4;meL;kansas,tifi4;ci1;al;cest5ticip4;ate;or;id,p;as,i4lega9;ce;le;ng;am,j7mi4;ra4ssi5;ti4;on;ective,ust4;!me4;nt",
    "4.858": "true¦0:4K;1:4P;2:4R;3:47;4:4S;a45b3Qc2Wd2Re2Gf25g1Yh1Pi1Kjacks4k1Jl1Dm15n0Zo0Tp0Gr0AsRtFuEv7w5yeap;a5idespre0Oorri3Uwii;it25rd17tt;aAe8i7o5;id,l5;cano,unta48;ol21rtue;ggie,ni4Vr5;ify,mo2X;ca4Rlenti4Hria2W;phold,sage,tO;aFeDhCiAo1Qr5u0Z;a7e6op5;hy,ic39;asu3Zmb3;dition3Ui5nsi2vell0;n3Ft;de,m5nk;!i1;ank1With0;a5e,nd26stimony;c2Tse;ki1lent39n;aMcaKensib3hIiHkirt,la36m,nGomeFpCquee3Vsa,t8u6w5ynthet1X;edi4GitzerlaQ;ng,ppor30r5s3E;pl3Vveill4B;a6ev3Yicky,r5;awber3Leetc3U;b5lk;il27;a6o5;il,ns1T;c3Nm;d32th19;ap,eak;a,s;areho1Bo5;rt3Nve0T;llop,n5rl2C;!d2I;cr2Qtisfi2Q;a9e6o5ubb0;b10ve1Cy;ci09fu6li16s5;emb3pect15;nd;dic2Bnch;a,eGiFlCoBr8u5;mp,r5;e2Wsu5;a1Qit;e5oclama2;ce0As5;criSuF;et2Ukem4;a6e5;ad;in2Onk;nt,ty;!n1M;ccasion1Xliv0ngoi1p,r9ut6ver5wl;night,pri3Cwhelm;co6l5;aw,et;me;chestra,ganisa2;a9eed8fl,i7o5t;n5rthwe21tab2Ev;ethe6violQ;ghtinga3le;le02;rra1Pviga30;aBeAi7m03o6u5;mmy,nicipal0Zshroom;de2Wtorcyc3zilla;c5gra2rac3ssissippi;ro5;be;ans,moir;inten2Tnu1EthemaV;and9e7i6o5;okXs0;ab3bertari1Sght0ly,vW;a5i,ss0th1A;pe;i1mark;el1Vh1Om;gnora0Pllust2Jn5so0T;du2Lf7herit,ni1spec2t5va0T;a1Aerfer5;en2J;ect20rastructu1C;aCe9i7o5se;mema5ok0peful1Oriz4ussaL;de;di1ndu5;ism,s;ad6e5n2C;!l;li1Yquart0;mm0ndkerchief,rb1Lsh,ul;e8iTlow,o5uideli1W;d5n;de5wB;ss;!ll0ne5;ti5;cs;aCiAl9o8ran5;c6kl5;in;hi0Jis;rmula2st0undi1;av18uid;e5lt0;ld0;ith6ntasy,vor5;ab3;ful;fficiEggplaTleCnAs9thn8v6xc5;e0IitemeS;alua2e5;rs;ic;s0Jteem;da5ormo13;ng0;ctr4vat5;or;enL;ati1e7is6octri13r0Tu5;b,ra2;closu07posXtinct0L;fendants,lica1Amocrat,scen5tecZvelop0;daEt;aWeThQiPlKoAr7u5;pboard,r5shi4;b,dk0V;aig,eativ6itic5;iRs;ity;conut,il,ll0Ommut0n5up4;dCfuBgr9queYs7tinui1ve5;nie5y;nt;pira5truct;cy;atu5essmZ;la0V;si4;e01om;a8o5;s6t5;hi1;et;n,ssifica2;garet0Nrc08;a6e5;esecaDmiIryl;pOracteri02;a6lebratEre5;al;se;es02lend02p5;tive;aFetrEhai,iDlCo8ri7t,u5;n,r5;ke;ck;a7oksto6r5t;ed;re;st;ah,esYues;ng,tt0;ay;g7nglade07r5;k,m5ri0;an;el;b02cWdQirplaPlMmbInGpprenticeshFrBssho3u5;c2t5;omatic6u5;mn;al5;ly;le;ab7m6te5;ry;our;!ic;ip;aly5ti;ze;edk7it5;io5;us;ar;aska,l6s,zheim0;er;en;ne;apt7verti5;si1;ng;!a2;ti4;on;c5tiva7;ept7u5;ra5;te;an5;ce;!oli5;sh",
    "4.903": "true¦0:54;1:5Q;2:48;3:5F;4:44;5:5R;6:5G;7:52;8:5D;a5Eb4Zc42d3Fe32f2Ng2Fh26i21j1Yk1Ul1Om1In1Ao17p0Rqualifi4Lr0FsRtKuHvEwAyea9z;!rs;aBeaAheat,i9ret3J;lliams,shi2;kn35ry;i4Zrd,x;eAi9om12;llag0rg7zi0;lv51nd4Gst;gh,n9pcomi2sb;der9i55precedent4B;go,mi5Hneath,wat0;aEeCin,oBr9yraR;a9eati46iang5J;d0ge4D;ni6ppi2;chnic2Bd,ena33l2Gn9;a50th;bl4Rctics,ta;aTcSePhNiLkiKlJoIpFquad,tCuBwe9ydney;at9d49ethea3D;!er;ccess42mmo3Tpermark4Nspici5;aAo9rongh4X;op,ra2V;r31te3;eAi9;ke,ritu4;ci18e3Z;ck,u0J;am,eepy;nny;gnifica2Ym5n9rna,z;!gapo4G;a08o9;tgun,wi2;lAnsa1rgea4Ht9;tl3Kup;fi01li2;arNri2O;il3KlAt9udi;isfac1yagraha;esm8ty;aHeAid0o9ul0;ll7ta6;aEfi27in,li4Hnaiss4HsAv9;erend,i4J;i9tric1;de9st4E;!n9;ce,ti4;ffirm,g8;ghav,lph,ptors,t9;io,tle9;bo3O;aLerJhotograph0iIlHoFrBsychologiAu9;mpk7nk;c4st;eBinces,o9;duc22pos9spe0Yv36;ed,i1;fer2Mjudi42;l9r1Vtenti11;e,icem8;easa22z;neapp43pe;cep1i9;sh;perwoArticipa1t9;r5ty;rk;ops,pAs,utf9ver3;it;erat2Nt;aEeDice3o9utr03v;minArwegi8twithsta9;ndi2;at9ee;e,i5;at,gle1Hls5st,t38;me3n2Tp,ugh37v9;al,y;aDeBiAorn7ut9;a1u4;d,gh33ld,ni2sappropria1;chan3KdicaErmaEss9;e,y;dn0Uhatma,nn,ssachusetts,themat04;aDeCiAo9;ne,v7;ncoln,qu9;id;ap,ga2H;ce,g,me2Wndlord,s0;ans0WeeBfor35iAn9;owledge38w;m,tt25;n,p0;an,e,ournAu9;nk,st7;ali2C;llu30mpBn9pho2Zv;c9fluenti4k,nova0Vterfe2J;!a,reasing3;at9ersona6rov1P;ie2K;aFeDideo03oCu9v,ydrog1V;n9sse7;!t9;er,i2;nes2Dof,sti2U;ck,r9;oi2Or;i0Wllowe1Or9sti3vi2;n03ve1Y;aFeBigant2Qlo0JoAr9;adXid;ldilocks,odn00;nAolog9t0U;ic4;e9iP;roO;ll5mi2rr1Vtheri2ze;aJeIiGlEo9rienD;oCrAu9;l,rte1C;k,m9;al3;ds;a9i0C;vo11w,x,y;e0El9refight0;li2;a0Ydera1;bAci9reweQt4;al,lita6;r25ulo9;us;ate07ea,lImbGnCqBx9;ception4i21p9tremi19;and0Pedi1lor0;ua1;d9gagUli16trepreneV;lAur9;e,i2;ess;a9roid0;rras0Gssy;e9igib1S;ct9mentaW;ioPron1R;aTePiDoAriveway,u9ye;ll;dAmini5o,ugl9;as;ge;ckeJffereInosaHsAt9;ch;agreEobediXruDt9;incAra9;ct;ti9;ve;pt;eme0X;ur;nt3;ns;ad3bris,creaVlAm,nt4pa9;rt;ega6i9;!be06;i9ys;ry;a01ertifica6hYiWlVoDrBu9;b8t9;ti2;a0Visp9o0G;!y;lNmInAo9verMwork0zy;ki2peX;cCf0necticut,qu0st0Utroversi4ven9;e,i9;en0O;al;e9re6;al,r9;ni2;ng;edi8p9;lAromi9;se;e1icat9;ed;lectAo9;rful;or;own,uD;n9viliza1;dy;ao,eAink,rist9;en;st0;lBrbohydAs9;ino,sim;ra6;cula1l7;aKerl7lGoFrBu9;reaucra9y0;cy;iBo9;adca9oklyn;st;dZlliaK;rough;a9efuscu;nk9ze;et;in;ngaloArb0;er;re;bor1cOds,ffec1ggresNirliMmbulKnJppGrDtAug,vailabili9;ty;hletAtenda9;nt;e,ic;!abi8n9;old;an;ella6roximate3;ly;te;na,t;an9;ce;ne;si5;ademBcount9;ab9;le;ic;ti5;on",
    "4.955": "true¦0:6E;1:6A;2:48;3:4N;4:61;5:54;6:6C;7:60;a5Lb50c41d3Le3Af31g2Sh2Ji2Bj27k23l1Tm1In1Fo19p0Squ0Rr0FsWtNuIvDw8xp,y5E;aBheelbarrAi8oo,ur6D;d55ll9ndsh5Fs8;cons5He2;ow;d,gg4rr1X;anilla,eAi9o8;lcan69ti5;agra,nta0Crtu1sa;g5Xr8;di6Fge;n9pload,r8tah;a1Cself;c8dergrou1Teasy;ertain8onstitu2U;!ty;aFeChBoAr8utori1;anscriDi8o30u04;m,um4H;e,k1JrA;irds,n,orough2;m9nnessee,sta5Ox8;tu5B;pt;!y;aPeOhKiImok0nee2UoHpFtDu9w8;an,ift2;bcontract5Bnshi3WpAr9s8;pect0tain57;ge,rend3;erce2Npre3O;a8ool,riki5;irca3Or2St0;a8erm,o4;n,wn;ft2il,le2n02phist2Wuthwe56y;ms,n8tc48;ce4Wgh;!aAe8ld;pherd8riff;!e3E;cklet4ve;nt,ttl3vente0Ww;fegua5Ht4D;aHeAi9na,o8;bins4cky;dAsi5;alm,cDfrac7gist2Zinfor4Clie42sBtaTv8;a9en8;ge;mp;ign,tr8;ai4Uo3S;lGord0;c8iny,m;i3Kk;al01e;aKeHhysic2TiFlaEoDp4Fr9to,u8;blic2l2Ynjab;ivate2o8;b,c8;edur1l8;aim;nnonn3or2rn;intiffs,za;ne,one3ss,zzer8;ia;n8rmanent2;c8n;il;r9ss8thrick,w;iona6wo4P;a8ti1;di2Jnoid;baCklahoCpen2tto,uAver9x8;!fo4LygZ;pa2Etake;n3Ira5t8;p3Lrageo2J;ma;a9d,ecess1Mic8orthea3X;hol3Xk;pole4sa;aGcdona37eFiBo9u8yster25;ltiplay3mbai,rD;d8i3Sntre1ot,rgiana,ti30;ifica7;croarAllen9nimi14s8tche12x0;e0Ihap,souri;nium;ray;antime,lancho2socyclo24;ge,mm1nsi4r8;g2ZylaL;aEeBi9o8yi5;gistics,ngpudd3Drdship;ar,s8;a,ti5;a9nd3o,s8;!l27;fs,se;d9kh,rg0Eugh8;i5t3;en;a8ne20o5;r8t02;amcha8l,nataka;nd;aAe8unc7;rk,w8;elWs;s4ys;mpEn8;cuba6fCsBt8;e8ima6;nd0r8;fa2Fpret3sec7;talla7u2O;er04orm0;ort,rison2Y;aEe9i8obby,r;pst3tt3;aBlAmisphe2Jpat9r8sita6;d,s;it0Kocy6;m1Op0R;dache,p;lo,rr0Ht8y;ch,h;dp,eBlor0Vord4r8uilt;a9i8ub;ll0m;t2Ovy;nBo8;grap9met8r2D;ry;hy;!er2N;aFemini19iClexibil00oAr8urnish;ee2i8nd;ghtful,sk;ne,r8;d,t;c9el1Blipino,redrak8st;es;tion1;llo1Prt,shion0;clip0Hhh,lHmphasiGnCqualRr,sAthi9vol1Ax8y;ce0Eot2C;c1opi1H;!s8;en1G;chAro9t8;husia0Uitle20;ll;ant1Yilada;ze;aboKd3;aLeDi8nt,o06rape;aBnAs8;appoin8miss1;ti5;esafe,i5;be6gnosH;aEcCdBem,fensi0Tl,nsAp9s8;erv0ktop;loy,ot;ity;icat0;ei0Oo8;ra6;f,r2;gg3v8;is;aYeo,hWig0KlSoBrAu8;e,sto8z;di0Qmiz0;ims4op;gniNllapMmpLnDoBpyright,rrup7u8;n8rtya1P;cill12sel12t8;leH;ky,pe8;ra7;fDstrucHt8verG;entBin8;ent1u8;al2;ly;ioG;e8identi1;ss;!etit0Q;se;tiZ;aAi9o8;ne;n0Zp;us;ar8em,ili,ron0Xunk;g0lE;lCmBnnib1rAt8u7;ch3t0E;er;i5l,to4;el;f,i9or8;ie;ph;aMbc,coz,d,eJiGlossFrBu8;ddhi9ff8;alo,et;sm;aAe9isk8ook,u6;et;akthrough,w;dy;om;n8o;di5;ng;gg9ha8lV;ve;ar;!lBt8;mDtlef8;ie8;ld;dw8lot;in;b08cc04dmir1ffilia6lXmQnNppKrHsAttendan9ustri8vocado;an;ce;ap,kd,sBtron8;a9om8;er,ic1y;ut;assin9e8;mbEssN;!a7;chitect8p;!u8;re;eti6lic8;ab8;le;alo9ch8drL;or;gy;azeCbi7eric9ong8;st;as;ti4;on;me8;nt;coholClBo9t8;itu9;ngsi8ud;de;ey;ic;al;!e9umula6;te;nt,pt0;ed;raham,s8;orb,tra9u8;rd;ct",
    "5.013": "true¦0:8K;1:89;2:86;3:80;4:7M;5:7J;6:8R;7:8O;a7Wb7Fc66d5Le51f4Jg42h3Vi3Jj3Hk38l2Zm2En2Ao1Xp1Cq19r0Xs02tPuMvJwAy9z8;oologi5Gu;ep,r;aEeDhCillingn4WoAr8uDwe;estl0i8;gley,st,t;nderful7ol,rk8;for6Ao3U;ereup1ir;rd7P;h,istco3Uk7Ol8na,y7L;k5Ut0;a8ersa65iol53l;cci7Ig8lZ;i3Bue;n9t8;ensil,t4Y;finish2lo1Cto;aIdp,eHhFiEldr,oDrAu8yl0;rn8t;er,i4ov0;a9e45i8ous0y34;bbiani,ni5Ovi5;in0mp3Unspare86;fu,kyo,mb;ck,ght79le;!ai46ei02r8understorm;esh1Will0;chnici3mp32nu4Dstify;iw3l8s6Z;es,ib3;a01cYeWhViUkelet1lSnat0Oorrow3GpNtGuBwaAy8;nagogue,r8;i3up;m,y;bsAck0f16per9r8spen19;at,prising7viv4Z;i4Ym3;equ4Did1It8;anti7Ritu6;an5DeeDh,iCr9up8;idi55;ang0i8;de,p8;e,p0;ff,ng;p,r;aBe8he3Uri6;ar,c8nc0;ializ2tac8;le,ul5R;di2Aghetti;a8ot,um;in,ng,sh;an,khs,tt4N;a3Se0oppi4rink;ason2c5Knato8rvices,ttings;rs;ar9en8holar38otXramb5Q;ar6Pt;ce,f;c,mpl0t3;aIeAichards1o8upD;b8ck4Ell0oseveAsi1Y;be52e;aEbIcCdBel,f9gister2h1Linstate6Mlaxa4Ymembr4Nnew5port0vo8;lt;in2riger43ug8;ee;istri36sto5Yuc2;e8or1S;iv2p4S;p,soni4;jk2Znki61;!n,u8;arr8iz;el;aNeJhHick57lFoDr9sychiatri3Cu8y;ppy,zzl2;eAi9o8ude6M;cu2Xductivi42ne,vinci5;ci4ncip6L;!a9p,y;la68nd0rband4Uti1u8;ch;a8ea;ce61yoff;eebs,ysiolog8;ic5y;aAculi4Odicu2Oer,nd,r8;fec49s8ta3N;i2Yua1A;!ch,sa69;ck4Hna0Vr9ssport,tri8vili1;ck;e9ti8;s3ti1;kh,nts;bGfFg,o,pCrButAve8;n,rt8;i1Mu4F;a4break,ta;lea58ph3;era9ti8;mist55on5;!ti36;fe2D;eAs8;cu25es8tac4C;si1;lisk,si38;aAda,eva9i8w;agara,ghtclub,x1;!da;hi,y;aNeLiEoAu8ythology;l8tt0;e,titude;dernAr9tivate8;!d;ali2Yg3;ize;cDg07lCnAs8;appropria6f8siona3Ft4I;old;i8t;m5st3C;kshake,lionai1M;hig3rowa2J;adow,d,nd,r5Ct8;abolism,er;chine37instream,nAr9y8;b,o;io,ri2ti5;ag2i8;fe1Qpu2V;aFbs,eEiClc,o8u4;g9ot,u8;!isiaV;ic8o;!al;ck,fegu3Xght8nguist30;bulb,i4ly;ct,ddy0V;ndscape,s3St0und2U;aEeBi8nit,rishOya;dn9n,t8;!ty;ap,ey;b9n8tt37;singt1tucky;ab;r8shmir;ma;e8i,oshua;n,opardy;cy,d30llum3RmFn8ra3Usola2Fvo2I;cluDdBevit0Xfini6hApOs9teg8;ra6;a3Gight,pect1Kufficie4E;abita4Dibit1J;epend0Yia8o;na;di4;agin0Qp8;lemen9res8;si1H;ta24;aBe9indi,o8ybrid;op,rmo36st0Av0;ir,r8;m3o3A;hn,irc9mpshi0Dn8rd02z32;dIgi4;ut;aLeKf,iIlidd1m,oHrAu8;ardi3es1Njar8;at;aBe9it,oo8;m,ve;a8enhou1J;sy,t0;ce9d8pe,sp;!er;ful;a,dmoth0th2W;ld,m8rls,vi4;me;ek,n1N;!ng3Hr9s8ya;oli2L;din0me3Iy;aMb,eLiJlGoBr9t,u8;r1Bzzy;a8own;g30mewo05;il,nt,r8;bidAe8;caZhe8ign0;ad;!d2E;ag9e8uores37;sh,x;ship;fe,gh24ji,n8sc5tnB;la2U;at,b,d,rnando,t15;g9irn8ll0E;ess;ot;aOcMdinburgh,fficiLin,lImpower2LnFternEvDx8;eBp9tra8;ct;enditu8osu8;re;cution0mpt,rcisis;ic0Ro02;al,i09;dors2franchise2Dginee9joy8;ab19;ri4;d9ev8;a6en;er7;ent7;onomi8stasy;st;r8t1;l,ma8;rk;aQeMiCm,ownw1GrBu9well,y8;!i4;n8o;d0Tge1;aw0o1D;!ap0ctFfferEmin0PplomaDrect2s9v8;erPorc2;posAse28t8;or05ress8;!ed;e,i03;!t;!entia01;at8;or;a0SducYpre0UstructiAtaCv8;a1So8;lv2;ve;me,nforth,rl8;in;a07e04hZlaXoFpm,rCu8;ba,cumb0i,r8s;io8l;si8;ty;avi4eek,i9o8;sEw;b,t0V;ast5lumbOmInDpe,rBst7unt8wboy;en8rym3;an8;ce;p8rect7;se;centraEneHsAt8;emp8inuous7;la6;c8eco,umpB;ioE;mAp8;atibTiTle0Wosi8;ti1;enta9u8;n5te;ry;us;ss8usi,w;ics;a9rist8;ia0Aoph0;l9n8rlot6;deli0gi4;et;ll8rtiorari;ul8;ar;l,meFnEpCrAshy,tf9ve8;rn;ish;ab8niXs1t0ve;as;itol,su8;le;al,n1;!r1;aJeHiGlEoCr9u8;dd0Cff,lk,tterf7;ew0idegroom,o8;ccoli,therhood,wse8;!r;hr,mbi4uld0w8x0;li4;e8u0E;ss2;eb0ngo;havior5in,nt;al;ckboBit,ndh,stAt8;ti4;ng;ard;ne;cc07d00ggressiveZlVmeUnLpJrFssassEtBugusAw8;ak8;en;ta;he9m,t8;ic;ns;ina6;m8ray;e8s;ni3;an;e,propriat8t;e7i1;aEders1nBt8;icipat2on8;io;ed;!ounce8uN;meL;on;rch8tomy;o,y;nd;eAl9p8r;ha;sta6;x,ynikov;!ly;ams,ditionCjaAmini8;st0;er;ce8;nt;al7;ly;ommoda6ura8;cy;te",
    "5.080": "true¦0:8Q;1:94;2:9R;3:91;4:AS;5:A8;6:96;7:9Z;8:AN;9:AB;A:A2;B:AF;a9Ab8Cc76d69e5Sf5Kg5Bh4Wi4Gj4Ck47l40m3Hn34o30p21qu1Zr1Fs0HtYuVvPwHxGyDzC;ip,omb32;aCummy;nCrn;g,ke90;in,m00;aHeGhFiEoCrest1;nder6CrC;km6m;d9Onst4thho66;atsoev0enAMol3;ekd6Assex;iv0lki2qt,rra9Ss88tC;ersp3Ts4;aGeEiDoCp;l,r;enna,i,nce9Ov46;ga,ngeAErC;b,if4D;nuatu,u0K;nDpCrn,sh0;vo7ward32;consc4Hdercov0icoA1na07st75wi5Y;aSb,d,eOhJick1ml,oHrEuCwe39;ck,rC;r37t1;aCek;ct9Yg1Pil0nsCvel0;m0Xvesti7;ad,ll,rtillCyo4S;as;eEomps4rC;eaten9FiC;ll,ve;rCsaur75;apeut8Seaft0;helka,lepo9CmpErDxtC;b28ed;mi97ra9U;e8Worari3;ke32mCxi,yl9L;e,p4;a06e04h01i00lYmeXnowm6oWpUtLuGwCynthes0G;arEiCo9G;ftCss;!ne4U;aj,m;bDi7n5Mpra,rC;na5Spa4R;sCtit1;cribe,idC;ia7Ny;aHeGiFrCua8Wy20;iDucC;tur8;ct3ve;f1mula7;rn,wa8R;in,rCtistic8;k,tC;er,up;a,ecifCind1ott0;i7Gy;ar,cia1Pdi7Tme5Cre,vereign9;lt;ee5ToC;pe,w0;ckJsters;aDerlo5ZiCou40utt1y;ni2t9;ft,m;ek0g84ll0miot7SnCqu8Gri8t5V;!tenci2;dDlCn58shi1Qva77y6N;sa,u7;ne40;aSeGiFoDuCyers4;mo81naw4Gth;adsi6Mbot,dCm,tt18;!e7X;ght3m,nd,pe;aKcJdistric3NfIgul8Fmaind0new5IpHquest82sEtro,viC;se,talCv8;ize;cDembl8JiCta80;d4NgW;is5I;l46resentativ6P;err8ra68;k4onsPruit7M;!diDliC;st78za5;ly,ne3J;bbi,ciDj,ndCpp0tif2A;om3y;al,st;aCo2X;ke,lify;a03eZhWiUlRoNrEsych67uC;blis5Tpp15tCzz1;in,ti2;eIiHoC;b4XcEgrDnoun82sp0vC;id0;ammi2es2Z;essi2rastiC;na5;n2Xva42;decess7PmiCtz7Fvi25;eBse;k0litEpDrtr3JstpoAttCutiA;a65e5Z;co7Je;ic30;!aCea4Au4P;n0Mtin6DyC;s0Lwright;lCn43ta;gr7Nl5P;d,ilDoC;!enix,ol6tograph;ippiAlips;bb1e,g,rDtC;al,i7;cCform0u;h,y;c,d3Riseh,lHne,parizou,rEsDtC;h5Erol;si42te;aDtiC;al3es;ll6Snoia;!estini6;asMh5TkEmega,nw7Boohooohooo,rDssingt4ttom6verCwner10z;lap,see;ac1ie6Dna6C;ie;atMe1ViJoDuCxt,y;cle49n,s,tritionW;ah,isGrFtCuronnih54;ch,eC;bCd;ook;m6rC;is;co1netCpp1;eCy;en;h6ionaC;li5U;aOeMgi,iImHoEph,tv,uC;rmuBsCz;harraf,l4G;dDld,nroe,rCss,therfu00u6Ew;bidi9ph4N;e0Fifi60u1;!s;aEnerDsC;o,s3Pt;!al;mi;asure5McYdiCl4mor3Ataph68;ta5;dGkFnErCsh,thematici6;garCketpla6Ct;et;oa,t1;eNin;a2Gis4;aGettBiEoDuC;ke,mb0;ad5Kbu1c1Edgi2ud3y8;cenCeutena5Cme,nux,o46vesto33;ce,si2;k4Aurenti6yC;out;aFetchEg,ina22nCoi;iCot;ck0;up;nye,te;aDoC;!el,i2I;in38lape3DmaiCna,sp0;ca;bm,deOmmen1TnEp16rrDsC;aac,ol4H;eleva4Xita7;aKc32dividu0XfJhe06spiItFvC;aCent5G;de,lC;id;a5PeCimida7rig4M;llige4RrnC;sh0K;ra5;ormati26rin3S;bili9ugu0Q;as,ntiCol4D;c8fC;ica5;aLeJiFmEoCub,w,yacin2W;bhou1Clm3Iov0rriCu0Y;b3d;!mm;lDpcroft,sC;pan41se;arCda;io2B;ar9brCc14lp0redi1X;ew;iz,mFndgun,rDt0untCwthorA;!ed;ass46dCt,v53;co16en,waB;burg0p0;aJeHirGlad3oFrCulp;aCo6;m,ndpaC;re41;re,wn;affe,d1;e,nuiAoC;graph3Kl3O;llbla2Mmepl0Drni2Itew0D;aIbi,ca,eed1LiHloGoErDujiC;ta;ac5onti0;am,l3ssC;il;o12p;an4HxtuB;ith2Vlada,n0Hshion1Bt9x;ager3ditori8inste27k,lePmNnIquHstim36thi2Pv2NxC;cChib0Dplo1E;eEiDluC;si12;ti2;l,ssive3;ip;compaFh47rEtC;husia2RrC;eat,u39;i0Lon;ss;eraMis13otionC;al3;ctoCva5;raC;l,te;a04eTiJoErCu3Hvd;eCink1P;ad;le,mFnDwnC;gra1Qh0Z;aCkey,or;ld;a1Je,inic6;aJnt,sC;cFmEneyCpleaRtinguish34;laC;nd;ay;o,rC;etCiminato1Q;e,iona1P;blo,lCna;!e3M;ad0Uc,du3LfiJgrada5lawaBpenden3GsGtEvC;elopi2oC;n,uB;aTroC;it;ir06piDtiC;ny;se;ciCni2;enC;cy;mErt,soviLyC;tiC;me;!n2H;a0Dbi,h05i04l03mc,n02oJrFustoEyC;cloAstC;eiAic;dy;awl,eEit,ocodi1uC;el9nC;ch;epy,ma7st;lliTmKnFoErC;al,responC;di2;le1Trdi23;ceEjunc5seCtribut2I;queCrva5;nt3;iCp5;ve;eImGpC;arEliC;ca7menC;ta0N;ab1;eCission0unU;mo1An2E;baC;ck;si4;e,t;ari9eani2int4;a,ne;aIeesy,iFoDurchC;ill;ir,rC;us;!lCn,pot1;dCe;caBiV;l,mpagAncell1Tp;bRge,in,l3nto,pitalErCsterbridge,t0;d0KoCpent0ria0A;liA;ism;a04eZhi,iUlOoLrEs,uC;ckingh0MdC;!dhi0W;!aHeaFiEoDuC;no;th;be,ef3;ki2tC;hi2;ce,ke,zili6;ar,bbDil10ld3oC;b,ty;in;aGeFoDuC;sh;ckaCke;de;!nd;dd0;hFllioEoCrla,shop;graph0logi0EtechnC;ol09;ns;ar;aEhavio0HrDstsell0troth0M;er;ry;c4tlC;es;ckFdElDndaEr4siC;cs;d,lo4;ge;w12y12;a,b10c0Td0Lffini9g0Hi0Fl08m01nXpUrQsKuEvia5wCye;ful3;ly;dGr,stronesi6tC;iDomobi1;le;stM;an;io;hGsDylC;um;am,ociDumC;i2p5;atZ;am;bitEcCk;hipelago,tC;ic;ra7;athy,olDpC;liSrov8;ogy;alyEdy,noy0AtiqDyhC;ow;ue;st;aGusC;eDi2;ng;meC;nt;teCz4;ur;aniAbeGfrFlowZtC;ar,erC;na7;te;ed;rt;ne;!rcC;el;ed,iDriculturC;al,e;li9ta5;ti4;equateIheBministrFoEversC;e,i9;ty;rn;atC;or;re;!ly;cCquaintE;ident8laFordDuC;!stom;anC;ce;im;al;breviatEc,duDel,hi,oC;ard;ct;e,i4;on",
    "5.159": "true¦0:C2;1:DF;2:DW;3:DE;4:BK;5:DN;6:C4;7:DC;8:DX;9:DK;A:D4;B:BV;C:BZ;D:B6;E:9H;aCYbBTc9Yd91e8Cf7Pg73h6Hi5Zj5Tk5Ol5Cm4Qn4Do43p2Xq2Ur20s0Ut0Cu05vZwLxKyGzoF;mTn2L;aGeFrs,un;a99llowstoBK;ar,hFn18;!oo;b22d;aPeOhMiImi,nt,oGreFud;ck,n9YstA3;lfga2o4XrF;ds,kshop,s9I;g,lGnF;d0k;de,he8IlF;ing4y;a70ereFistleblow0;by;bBQstminBQ;itstaff,rGsFtch6yho3D;nt,p;faBy;aJenIiGoF;dC3odoo;br5QcAVgoroAWlFnd0Rol6Nvo;!la6;t,us;cuAAmpiBniDIr,se;lt4VnGpsF;ca8iBR;believCWdHeGifi5juDlFseDNveCL;ea9Mike4;mpl3Axpect5;erFo;grad2VstandCS;aUc,eThPiNm,oMrGuFwelf81ys1;n,rbiAO;aJeIiHoGuF;dCff8m68;t,ubl5;bAlC3nam82pp6;law4Xn7Q;de03g5Enscrip3;by,lst2Zuc70x6;bet62nFt34;k0t;an5QereHiGorFrivi2;n,ou2C;nk0rD;of,up1;chnologC4ll6ndernA9ymanak;cFk6o,pa,r,x3J;!tC2;a0Hc0Ee0Bh08i06k04l02m01nickeACoZpVqTtKuIwGyF;m3KrBF;aFeeteD;mp,n0R;bst35lim5PpFrpri9Ispic9Y;erviEpleCF;aKeJiIoHrGuF;dios,ff5nB7;ange4eam3L;mp,ut;l,t8G;rBOv6V;ll,tF;eFic;sm5F;mi,uF;a1KirrA7;aAMecGotliBQrinF;gs;ifFt4E;ica3;a01fFmmerfe64ph6LrB9;ia,tCE;a5Cell5il;aFim,p;b,y;atFet80i92yscrap0;e,i2;!eCnFp;gul35ha;aGippi2ortaCrFu19;ed,iek;!dy,kespeaBrp4;att8cGle07mFo6Spa8Cvente6L;!i;!ond4ret4;aFhmidt,iss8Brap4E;rabae92tterF;!ed;!ge,lGmo4QnskrBKtF;i0Vurdays;ly,o1;a06eUhSiNjb,oHrAIss,uF;e,lemaFm,nn6;ki2;blJcIg6Sma89o9Ip0sHtGuFv0;ge,t0;aBIisser5V;es,t0;!k0;ox;bb1cHdGsFval9;ky;dBJicul4V;hFk0J;ar27ly;oFythm;de,n5R;aPbeOcMdesign,e59fJgAjoi57liev5mi6Xn8YspHtaGveFynol24;la3rt;il0lANrd5;eFons6M;ct6L;erend7TinGreshF;!i2;anB5e;!eF;iv0pt7G;kah,lli1;ct7EgeB2;b8DcFke,ng0tt8;co1k3V;at1YuF;aFeso,iAYo;ck,rterback,sh;a0Ee06h05i01lZoSrGuF;d4Flitz0nct2Prch9Ks5M;aPeKiJoF;cureAEgrHlong5mGph3Osecut75tFud4vid5;agoniDoty2V;!ethe7V;amm0es74;c93mit61;dIsGventiF;on,ve;id9Isi2tFump3;ig7Oo;atorMic3;de6Kwn;!d,iElite4nKop,pHrFstuB;sche,tF;ab8ugA;p6ulaF;riF;ze;!y;aFum;tt0;cHerBge1mp,tF;if4YtsburF;gh;!k8O;el2Zilip28;ar,ck,eLnnifeath0rGssimiDtroF;c,l;fHiGpetFvas5E;ua7;l,od6X;ormi2uF;me;k,l,p;ct,lJpa,rHsFt,ula,yro1D;!tF;or,ry;aFtisans56;chu7ke2N;esYm0;cLi4l,mis64n32pKrIuHverF;boa7EjFse8E;oy;!tfie3D;dFgasm,ien3M;er4inari4;erationApo67t8M;cuGeFtop6N;an1M;pi5rr8N;aPeOhl,iLoHrc,sGuF;!cleoti7Jrse9;!pa;i4Vok,rm,str8CtHvF;a,elF;la,ty;or6Dre;bb8cFd,ghtfa0Qke;ki,oF;ti6F;e0DtherlanXwt1;rFtiona8X;ra7;aVcTd,eOhc,iJoHp,t,uFysoB;ni4TrFst0;chis1der0m4Ip3S;c27mFna,r1s78;ent5Kma;c,lIm12nFst0;dGis02neapolFus;is;f3Ls1Q;!waukee;aIin,lHme,nGtaF;bol0W;a8Qta8J;!bour5Yee,lsto1Qo35;ningf3Ftba06;c,donalF;ds;gnific7SnIrHsFtt,z1;cuFturba7;li5S;!ginAia,vello5Nx;a,go,ia,or,uscri4O;aNeLiHk,ooko5DuFynd1;ggaCnFstB;ar;bHd,fGmFn8Fste6Ttiga3v6Mz;b,p;eboNti2;e4Lrari15;ban1mona6EtF;te5M;nte35pErGsag73uFws;ra;!ry;ais0eHhilafGiFr,uwa7Ty8;ll6sE;at;nFv6;!t,ya;amJeIiHoGuF;dge7Ki46;se,yful4;ll;ffers1r9w;aic0Pie;cq,dol,f1Gl,mTnHowa,p,q,roGsF;bn,le;ny;appropr2RcOdMeqLfJherit7Pjec3l0Xma7sIteFvolv5;graGrF;na1Sv2U;l,ti1;tall0ubord2V;ant9erFie1C;!i3X;ua7C;efini7iFulC;e,ffere7Igeno4Mrect4;inerFonvenie7H;at3S;agina9pF;ecc6OortF;ant4ed;aUeNiLoIumHvGyF;pe;ic;b0id;g,mGnFspita70;da,g;aCici5AosexuA;ghl0Bnd0tFv;her07l0;aJhIigh60rGsF;!i12;a0RbF;e5LloB;!e;l0rtF;ed,i4;ck,hIin,llHmilt1nGrF;dcoBp0;ks;uc21w08;!ahahaF;!ha;aUeRiPlMoJrGuFyp28;iccio01tt0;aGeF;atn3Ugo9;c3Pph;blGdEgh,ldmFver50;an;et;e4FiGoF;o54ssa9;mpEt27;bs1llet7mmiFn;ck;laGnoa,oF;graph5Erg4T;to;mInesHrFuC;lFry;and;ha;b22eF;r,s;aZdr,eXiSlPoKrIuF;ck0ng37riGseF;li;ous4;!eewFu1A;ay;g,lIotpri5YrF;eGgiven34mula7tF;hwi0Gr33;!moD;di2;ap,oGufF;fy;a5Luri1S;ddl0erce4lInanci2Or,sHtF;ti2zgeraF;ld;hi2;et,t0D;el6llows0YnF;ci2;a,cul5Cde,iFjita,lc1mi2RrtheDv;nt0;at6csta1Od4Cglint1ighteen02lYmSnQquiPrNsco42vLxFyebr3J;cHecu3on,plFtremi59;icit4oiF;ta3;epGuF;r1Qs;tion29;aFentuA;!de;ic,nFweiterung59;ie;pp5ty;cFdorEhanc5s07thusiaD;loEycloped3L;bHer23o,paF;naFtT;da;aGoF;dy;lm;eFiza;ctronics,ga4WvF;enF;th;!th;a06d,eViKoHrGtm,uAyF;nas4Kslex38;ainaCiv6y0;ck,min4Nom,pe,rotGubtfFwnvo7;ul;hy;aNce,fferentMgestYl,men10sF;aJcGguDmFp2Htille9;al,ou4K;a28eGoF;mfo33uraC;rn;bleFrm;!d;ia7;logFmet0;ue;alersOcMfeVgra2FmKnIpHsir5tGvFy;iEo3;en3;loy3Tosi3rKu41;iEomFse,t1;ina3;ean0HonF;st0E;isFlara07;ive;hip;iIrfHs,tF;abaEed;se;ur;sy;a0Wbc,emete9h0Ni0Ll0Hnn,oPpi,rIuGyliF;nd0;bFpcake;!s;aKeJiteri1oHuGyinF;!g;mb8soe;cieBuF;ch;a29pe;ck0ppy;cai0Sd,l04mZnMol0rHstco,uF;nselFpFri0;li2;niIrFy;eFidS;c3spondenF;ce,t;sh;cesQdNfKsistenJtFverQ;eGradicF;to9;mFn3;pt;cy;iFuT;dentia2XguFne;ra3;eGuctF;or;mn5nsa3;si1;munGpF;lexi2Rul2F;e,icaF;b8tioF;ns;iseFlaterAomb1B;um;aHeGimbi2oF;si2;ar2Oft;m,rk;nFrcuYviliz5;cinnati,nam1;aLeHiGoFurchya0B;pp0;bi,l4;eseburg0mGstnF;ut;icF;al4;llenFmp,rg0t29uc0;gi2;esaQlOnMp24rJshi0talyDuF;ldr1tFve9;ioF;us;st;boGelFgo,vi2;ess;ne;celFon;la3;amaFedon0K;ri;rs;a09eZiToNrHuF;iZm,rFzz;ma,n6;aJeakdIiHoF;ad4n7w;ly;dAt;own;nd1z0R;lJnIoHre,se,ulevaGwF;el;rd;st0ze;apar7di2y;st0;bl0Ncyc8nCochem0NrGzarB;re;minghGthpF;la1H;am;ge;aMeKheaJnjam6stHwiF;ld0;er;ow;in;de;p,tF;!hov19;chFm;es;byl1cLff8ghdad,o,rHsGzooF;ka;h,il;gaiHnGrF;el,y;ey;ni2;kGterF;ia;up;b0Sc0Id0Aerospa0Uffil07g04iyo,l02mZnTppointmRrPsLtJuHvFw;eFoid0S;rt;s,tonoF;my;lFtach0B;as;pirHsGtrolF;ogy;er3ign07;a3e;gentiFtwork;na;enF;ts;alHdrGglo,imat5noyi2ot,s,vF;il;oid;og,ytF;icA;al;bFnes03p8;er,iF;en07;an,e,iFlamistakeo;ght;grava7reeF;ab8;te;ia3;ti1;on;a,hd,opt5vF;anIerGiF;so9;sa9tiseH;ry;ceFi;meT;ed;cGe,he,quFronym;it;essib8oF;mmodaIuntF;abiF;liF;ty;ti2;ng;le;bJerdeIit,seHundF;anF;ce;nt;en;ey,ie",
    "5.256": "true¦0:H9;1:IK;2:KA;3:K2;4:K1;5:JF;6:KG;7:KF;8:K4;9:KL;A:KD;B:KE;C:I4;D:JM;E:GS;F:BR;G:KJ;H:JX;I:II;aI9bGPcEIdDCeCDfBPgAWh9Wi90j8Pk8Hl7Rm6Un6Go64p4Sq4Nr3Ss1Rt0Uu0Cv02wLyKzJ;elJMoologD3um,zz;ay,er,oungeItd;aTb,eRhPiMll,oJrong5Rto,wi;ld,n,oKrJ;kIFst;hI2lf;dCTkipedIWldKnterJrt,th0;bothJ7lic4T;erFNlJY;a,eelchair,iJ;chHFm,rl,sk0;bJdEDe,nGW;inGIkinz;g7iv3llNrLsKtJ;ch0erfa56;abi,h2S;dJDe,mJ;er,th;aJ2pap0;aReOiKoJrs,ulAX;gHIus;!al,bDKcLewpoiAii,rtuKtJviJ8;a,ro;al4oH;eroy,tu9;al,danJQlKrJx;offentlicBAtCD;cFVoHT;!h3lESrsiCst4;fo,i,kr73mZnMpriLrKsJtmoI;n,s;du,iCY;gB4si2;avail98cUdQgrate1AiPkiIUloJ2pOrelFOsLtJ;ime4ouchabJ;iC2le;topp95uJ;ccessfulJre;!ly;a7IleasaA;!qI4v;eJr7A;fiErJ;dog,lyi2taBEwJ;ay,eFMhe13;he7CovGO;brelCAmm,piH8;a0Be07hYiXl,oTpc,rJurkiCXym;aPeNiMoKuJ;mpFAro;oI2pe,uJ;blXpe;cky,f1;asur0mJ;endoHor;nsKumaJvolIWy;!tAP;co,lDY;mLnEogFPrJsFurnEK;stF7tJ;ilBWoiF;my,w;dy,er,ght4mo,t;eOiNoMrJs,t,waBYyG0;eKoJ;nELtt1wi2;esoFX;roughfaGNught0C;oeF4rsCst1;oKrJ;apeut95eaboEA;logi5rem;amma8dF7lKnderloGJrrJx2Z;aGIifD;!co,eJ;gra2Iscope;blet9Jd,iLkKmJste8K;!il,pN;!eov0;l53waneF;a1Gc1Be14f,h0Vi0Tk0Rl0Pmoke0On0Mo0Kp0AquaC0s,tWuQwLyJ;mbolA0ntJstemGM;ax;ap,eLimKoJ;on,rdm0J;mi2suHH;a8WeJll;pi2tDG;bNd5ffiH4ggest3icid9lliv5mMndays,pKsJv;penFtain3;erJpo74;b,heE3;mar9PptGZ;cont77poeIIsecB;aSd,eRiQoOrJurEL;aLeJ;ssJw;ful;iJp,y;ghtH2t;ckhoJve;lm;ck0gASle,puFX;adfaIphan15ri1vens7;gKnlDAp1rJtioBP;craft,t1;gerJnaA;!i2;ecRhQiMlendCKoKrJ;awl,u2;ntanHBuJ;s,t;lLnJr9;aJe;ch,l;l,t;er9Vinx;iC0k,uHF;g32lJs,w,x;idariCv3;aAQeJiff;ak0;r,y;end0iJm;ck,ppe6;eJi,yrockD6;pt9Ltc6W;dewF4gnificFOle46mJncere4;oEpl5Qulat1H;aQePiOoLrJ;i1YuJ;b,g;oBBpKrtcoG9wJ;ro1Z;keep0p0;a,ny,ok,pwre4UrlCF;ar,en;kespeare5ll9BmpEEng4Rr7war9T;aNbasA2cy,duFQmiMnKsaDXv2RxJ;t7uBE;sJtiGX;itiviCor;na6ramCL;mJrs;!an;aLene6hizophr6Ri,oKruJulp7F;b,tiFZ;ld,ts;ndinavi5rJ;!ecr8Z;b,lom7m0Inctua6pKrJtu2Lw;ah,banC7;!phiEA;a0Abi,eSiQjd,ly,oMuJ;de4mKsJ;h3se19tD;b91or;dLna6AsKtJutine4;a6i;alERy;eo,riguez;c5dd1g,nk,pp1tchJ;ie;ap0cWdVfUgSiRlPm,nNpLsKunit3vJx;iew0o81;entG8idDHourcBTpect18tor3ulAE;aJetiDRorADti1;iDVy;ew3oJ;!unEVvaB;!ay,evEHiJo8Pucta2Z;a89cs,ve;mburFnveA;aDQiJulAJ;meAst6;erEBraDVus9;ditAOne3P;iLoJruit0yc8G;mmend3nsJuAve6C;ideraBtruDR;eFZpieA;m31ndolKpJsh,t49viEzAJ;i45tAI;ph;aiEIuJ;aKinJot3;oa;d,iAk0rteJsi;r4t;a0Lbs,e0Gh0Di0Al05mc,oZrNsLuJvp,yrotechAD;bliDAnJ;e,iD2;us,ychJ;!ic;acSePiOoJ;cessMdigLfit4QjecKmin8Gpor0TsJudh7verb;ecu8titu8;ti1;ioH;i7or;cy,metiC7;ach0cKdiseaFexis9Ema5VsJtri9;i8Iti92;i9SluGurs9X;!tiJ;c9Kse;aBFiNlLppy,rKsJ;itDYt9;celaCRtfolio;ar,enEMlute5SyJ;nesi5peptiG;nt3soB4;aLuJ;mJra74;b0e;it,nJst0teau,us36;ck,n3s;!a9LcKgESlgrima8NnbaJ;ll;as6NnD;!antKenomen9oJ;sphoryEJtograp49;om;aceMdophi1ep3ki2nLpperoUrJs57trole4A;iJpe4Mson3Xt3K;odDtone48;di2et7H;ful4;bCWcQdd1el78kistaPla8nz0pu5rNsLtJwn;hJie1Cna;og4EwC9;sJtrami;coGer;alyJcABmes5ticipaA;sA1ze;ni;ed,ifiI;bseScd,fficeDNm0Enwar3SpQrLsa71t,utKverJxl9L;cook3doEheaAYp6J;liEwaAX;dMeLganizaKiJthodox;e4Issa;tion9;!g7;e4InCF;a,hthalmoloJpn;gy;rvJsF;ab1er;aVbc,c,eSiMj,oKp,uJxE;de,mb;bi62nvio7Wob,rthwesteStJ;a6epCZ;cLnJ;eteJtenAS;en5W;hJk9O;olsJt;!on;bras17ga8hru,p9rd,st1ur7wJ;boJsteCR;rn;pkB9tional4AvigaB;a08c07e03iYmorpg,oNps,sn,tg,uJvp;cHffB7ltiLrKsJtaA;s9Ftapha;al,do17;p4taS;an,bi5LdSis40lluRnNoMrLsc5OtKuntaJ;inoH;h,oro62to;occo,ta5I;nl4Fr;aLe1JgKsJtaDI;o7troH;er,ol;rc2Qs92;sk;er7Ti;dMme,nLrvi6HsKtiJ;ga8;!chief,solong3Kunderst9I;aj,dblowi2imiFuscu1;dASweI;aCdiLla1MmKrce6PsJte7O;h,opotamB5;orand2Jph8L;aBcin9;d,h;car7gnificeOnMrKsterpieBJtJxim48ze;!ern9tre91uAG;ath7bleheBWgariCCiJk0ve3S;lyn,n0ti9N;age20che8ViJ;!fes4BpuCI;nt4;a03cbo,eXiSoMs,td,uKyJ;!in,net8r2U;cy,mJnche7re,xembourg;brid6Dp;bbyiIft,ma,nMoLrJuiFyalC;ds,rJ;aiE;pho1se4;eli7FgJ;fell4Nstan8Vti9A;bLfesp5ghtKneJpsti03st3ye;ar,r;en,s;erJya;a8tarian2Y;aNgLiKnJonar97te,vera61;n7o9Use,t5E;c3Bsu9T;enda6iJ;sA0t;gu7Mvi2;ck9MgMl9EnLra,st4tKureJva,zi72;a8n;ch,ino;ka;esF;aOeLfc,itKnights,oJrupski,u87;sovo,un;ab,e;epi2l3PndriKshubJyb8I;hai;ck;bob,ha,l,po6GtJ;hariEie;aQd,ePharkhaALiOk,oLuJ;ggl0liJstifi0K;e,o;an,bs,g,hann,nath5sJ;hJt1;!i;hANo;ffr6Tst0;cJin,smiE;in1ZobJ;!iA1;c0Dde5Sh26k0Clb,m07nLps,rKsraeliJv5;!t6W;k,oquo70responsMvi2;c01dXfVgenuiChabAAjUorganDsRteOvJ;aLincKolunJ;ta6;ib1;liJri98;diC;nsKrJ;conne8ZveE;ify;tKurJ;er,geA;in8Vrume1C;e8Uunc8H;lJuF;a8ecBux;iKoJ;nes92;cJgnaAre8P;aBt;ap02epBoKreaJ;si2;nsisteArrect4;agina87i3RmMpJ;ati3OlJroper4;iJor;caB;ineA;ea,ke;!onD;a06e02iWk,oMuKyJ;gieEmn,pothet2P;mb4rd1sJ;h,t1;l7YmQnMpLrKsJur4wl;e,ta46;!sem5;dod6Ne04;!eLoJ;rJurJ;ab1;!ymo7;eJy;own0r,t41;erarcNghLlKppJstor2Sth0;ie,o;ls,t;lanJne69;ds;hy;aven4eLfClJr0D;iJl0;um;d,h86;biTgSlQmPnOo,rLsKvJz5R;a,in,oc;s1ty;a5Zden3mKoJp;ld;le5X;d3ge,k;l5Fst0;lucinogJt;enD;!ue;tu9;a06e02hZigg1lVnocc00oSrMuJwh;aJjara67;camo1ntanamo,rJ;anCnieri;aLeJiev3owl3umb1;aJe3H;se,teI;du9nKphJ;ics;dpa,i8;ldfi2Lrg8Qtting86urm50vernJ;an7WmeJ;nt9;aLitteKoJ;om,r7B;ri2;nd,sg1B;etKomesJ;hi;to;l,nKrm,sJtaw6Q;tu6K;eJo5S;r3Js4Jt1J;bri4Rga,i4lLmbleKndhJsp3;ism;!r;axy,ifr7lJt;op;a05di,e04iZj7GlVm,oRrNuJ;nctionKrJ;nis3Ky;aJi2;liCry;agi1eLiJos2Oustra2O;tt0voJ;loH;a07ezi2igMnchm5;rtJunde7T;nJunate4;igJ;ht;aLea,iKoJuoropho5Z;r1Bwe7O;msy,nt,pp0;mi2re,sk;br3Der6XnJsh0;alLeJ;ly,sF;se;ize;eb1ud;m,r74ulC;ar0Gb0Fc0Ed0Cisenh0Bl03m02nZrYsUtQvOxJ;agge0WpJtin5V;eKloJressw5R;raBsi82;di8l,rimenJ;taB;anJoL;!s;hKobicoJ;ke;anJern3J;!ol;cLpresKtJ;!h0;so;!a7F;ica,neIu1R;cKlighten7Irich7Isla7OtireCvJzym5K;i23y;haAla7MoG;e6ig0Dphas35;bPeNf,iJla,v34;giKsabeJ;th;biJ;liC;ctrJna;ic9;ow;ow0;dJgevil1is7mu63s,uc2X;ie,y;!lectD;ay,o6A;nest4phoE;a0Le05iUoSpc,qs,rOuLwelKyJ;l5namDsfuncB;li2;nKpliJ;ca8;c5o;aJea6;cuKstJ;ic18;la;da,gJn70orw4Kppl0rm,ughn25w6;ma;arrhea,cSetiRff,geIligQoxiGplom4QrePsLvJy;eJil;rt;advanta0GcKmant1paJrega3Csipa8tr0Z;ra8;laim0rimiJ;na8;!c41;en57;ti5;ta8;bXcWfTlRmQnv0odoPpNrLsJt0utsche,vot4Q;mo5AperatJ;e4i7;aJby;il;enJre2I;den3J;raA;an2OoliK;e8iJ;sh;eJi4Goe,y;ctJr;!i66;ay,eiv3is4V;it,ra;inClKn55rJybreak;es3Qr4W;e,it;a1Hbs,c,dp,e1Dh12i0Zl0Ung,oTrNs,uKyJze26;a,b0;dd1lJn1Yrfew;!iJ;na6;aMeLiJowdfu4Numb;nJpp1;ge;ep0sceA;ckdJmp3wl0;own;a0Hh4Jincide0Gl0Bm06nUoSpenhag4JrruRsmoQuMvJwa2Ayo8;aKeJ;!naA;leA;nLrJ;ag4YtJ;n0Qs;ti2;!polit5;pt;kJl0BrdinZ;book,ie;ceGdesce45fRgesBr4DsMtKvJ;eyXinci2;ai1Bemp50inu9rJ;acB;eLoKpicuous4titutionJ;al4;lida8rt;cu2KrvJ;ato6;eJiG;cBsJ;si7;!et,fort2YmKpJ;a14rehe3S;entJo3H;atJ;or;!lectiMoKumJ;niI;nJur3;el,i9;b1ve4;!n3C;!cJti2;hi2;aMeopatra,inicLoJump;ak,ckwork,seJ;ne0Q;al,s;ir,ra,sp3;nd0rrhKtrJ;ic,us;os01;aQeLilKronic1uJ;!bby;de,e5;ckLdd08etah,nKwJ;!i2y;ey;i2oJ;ut;h3OlKn,rJuffeur;!acteri3AgesheV;andritsan2Xkb0Qleng0;le6meAnsorship,rJ;tKvantJ;es;ainCifi3;!dPiOlMnKrJsa,tara1S;l2Rniv9tT;a6did,nabJoe,terbu6;is;culJga6orD;at3;ro;et;a0Pb0Occ,e0Ghar0Fi09l07o02rRta,uJ;chan5nOrMsKtJyi2;te6;hJinessm5t1;el;glJt7;ar;dJk0;!le;aRePiMoJy5;adcaKcaGom,wJ;ni2;st0;efi2ghtJ;ly,neJ;ss;ak0eJ;ch;d,g,nJve6;dy;arMlKmb0Xno,oki2rEurb7yco0A;ne;lywJt;ood;di2;oJueber6;c,g,om,w0N;d1WllKochemist6sJ;cu1Wexu9;bKiJ;aKng;oaJ;rd;ti;aOcaNfrie1NlKneficiaJrnste0FtC;l,ry;gi5iJ;ev0;er;me;d,rJti2;er,i2;do;al,ckseat,d9e,hra06ltimo05mbUnRrMsLtJ;es,htub,tJ;er3;em5s;bKcelo2MroniJ;tt;arKecJie;ue;a,i5;dKkruptJ;cy;it,o;oo;a2Db28c1Ud1Jf1Fg1Ah18iGl0Xm0Nn0Jp0DrYsWtQuLve6wKyJ;!odhya;e,kward4w;!cLf,str09thoriJ;taJz3;ti24;h,kJ;la0U;roMtJ;aKiJ;re;in;ciC;ty;hr0Aki2pectibHsimiNtrJ;ay;abWbitraUcRe1XguQiNomPsenaMtiJ;cuKfaJstD;ct;la8;l,ult;stoJthmetD;crJt1;atD;ab4;aGhJ;!aeologiIer;st;b1l,ry;le;ia;olNpJr7t4;all3liLointKreJt;ciaBntiX;ee;anV;lo;alogoHdreLonymoHtJ;icJo09;ipaByclonD;!u,ws;aQbiNericKmuniBsterdJ;am;aKorJ;ps;ns;anKgJ;uoH;ce;nJzing4;da;aQbePhacOlNmoMsLterJ;aBnatJ;ive4;os;nd;ah,eg07ot;en;it;rKsk5;an;mi2;em,i,medabJ;ad;a,gregatMnoKoJ;ny;stD;ic;e,i7;fKs,terlJ;ife;!aiJect3;rs;d3miPvJ;aKeJ;nt,rse4;iLntagJ;eoH;us;ta;n,ttJ;ed4;ly;ed;cLhi2quKu8;te;aiAisiB;esso6oKumuJ;laB;mLuntJ;aAi2;ng;modaBpaniJ;meA;nt;ti7;on;ry;domLoGusiJ;ve;de;an,in9;al;na",
    "5.381": "true¦0:V8;1:VU;2:W8;3:W7;4:U4;5:W5;6:W3;7:VK;8:OT;9:UC;A:VI;B:W4;C:UI;D:T0;E:VP;F:VZ;G:VH;H:TQ;I:RX;J:SJ;<name>,aSVbQBcM5dK1eIPfHIgGFhF6iDTjDAkCWlC4mAFn9Wo97p78qu71r5Qs2Yt1Ru17v0MwVxUyLzK;inc,uowH;aReNoKur;gi,lk,rLuK;aTZng0;e,kda7;aLe,lKst,w;e36l8;rKst;b95ly;d,m,nk8Ao;vi,y;a05e01hXiRk,ld,oNrKu;!eLongK;fFQly;n,tch2;lfe,odcMp,rKuldRX;dsworVBkKt;ab7sQE;oS1ut;!eOfi,lMnzNQrd,tK;ePPhKnesC;draw9me;d4lKt;fG2s;!ld;ere8iK;gs,rlLtK;h0i1;poQ6wiUU;aMbcU3dIHekLlcoH6stK;on,siUF;nd,s;poO5v0;a,de,g0lNnMrKst42tchdK5;m4nKp,ranFwiRL;er,t;g,k;!e,po7;aZeUhp,iLoKulgJ;c9icema18lun9Yrt5HtSZwSV;aRcOdeotaT9e,gilM1jR4lTEnNrgiMsLvK;a,iA;ta,uAH;l,niF;ci,eyaLL;ar,torK;!iK;an,oUM;b7duM0;gNneMrLtK;eraNNo2;ander3bal0AsUI;rGzuelA;!etariaKK;canNlMnadiTNrLscOItK;!icA;i2roQZ;!dANiI1;ciJPt;as,d7SmbilT6nOpNrMsLtK;erU9i;ernaBXy;iIsuSS;liRPriC;aWcleJdReQhOiNlimit2mMprofesJ5realLsigniertHtKusuOVwav0;er,owaL0;!iUC;arDistakG;camer9latANmporLIversORx;eKo4;altKLlpfE5;asiM4dAPnfHEquivocOOsGA;eLisputeKPoK;ne,ubtJS;niGDrK;estiMTstaKtakH;ndGBteQZ;nimousKuthor1M;!ly;a0Je0Eh08i05oYrPuNwLyrK;a6e;e2iKouPC;g,st2tPK;es,lT7mbl0rKsshJ;ks,moZ;aOeNiMoQDuKy8;deO1mpeDstK;ed,wortK4;bun9o;as5mbLOnPD;cMffiFFitP1mp,nsKumatEvQE;cribe,fKmQA;erGorT8;le,t;aLYeOlNme,oMpp7rLtKw;alitaSQo;nadEre6t;lbJthpas3;d,erKF;naKs;il;ckF1geNOkG9mLnKptMF;g,t8;b0etGid;atch0eNiMoLrKug;!eate7RiPY;ms5t;ckL4gh;atrRTbAoKrmomJNsPW;doR1lQQn;aNle,mpMnOHrKstingcheatsenGtsu,xNU;eSFrK;itoriI7orIB;!la3or9;cheNBpFHsi1;hPlOmNnMrLttKurSQve56xaB;er,oo2;getK1i3NzA;a,g;a1pa;iBZly;iADoe;a25c1Wd,e1Mh1Di15k13l10m0Zn0Wo0Lp0Fq0ErinaSDtZuNwLyK;llGsteGT;a3eKoQAu1;aFetmeCW;bQccesHHfOgaDitGnNpLra,sK;anHLpend2s31;erKplemeC0;pow0stJ;bu4RriCsRL;fKi;iciJTraQ8;aNmMoAKsLtK;le,ropR3;cripBidHYtanPL;ariIisH7;ru;aUeSiRoPrMuKyE0;dKffi1ng;!yi1;aightwOBeLuK;ggK7t;ak,tchi1;llerP6rK;efro6ytelK4;mula6nk;aKeLQllJreotyQAwardNA;kKJlRNme3Q;in2lk0mm0ndLrKy8;ch,vS3;ardKo2P;iz2;l,uib;angl2eNideM7lMoLps,rK;i6uOK;rt14uC;endid4iF3urPJ;cKedi4lJR;ialFtrQQuKN;ak,b,fy,lSmQns,oo,phMYrPuK;ls,ndNthKven7I;eKweL;aKrnmoNT;ste3T;ly,traNY;cer0y;atEeK;pDHrsQJ;dieLSiKleLS;cI0tuQJ;aLoK;oBQre,wflaOW;g,re;eaP8ilOLse,th,ugg7;aLoK;pBMuC;nt,te;at0iKrtE;llfB4nn0;aQblGZcPd,eOgMkhiR4mLnuso2App8xteenK;!th;cK6psonMB;ma,nK;atoDiPU;gfri2rPL;h,k4;m,nz;aQerPiOoLrunk,uK;ff7hui,n;cJGemak0oLpp8reN4uldKwcaC;a,nt;!p;!moES;!ni,wAL;ck,lt,mKnn5wn;efAN;aScRdiBeQinPmOnMrv8veLwaHCxK;iMUuaQY;nFriF;d8soDtK;inODoPX;eIYinJ;e,feLY;i1ki1rs;retariAOt;so4Ytbelt;aQhNindLNotLNrKulMV;eKupuloOC;aminKenshCU;!g;aibJeduIAiraz,oKwarzenegg0;olKtt;i1s;fLMlLGmm0nK;dOHn0;bO2cOffr5iNks,lvaBmoPIndMrLtKv2x5;chNXiO1;castDSdJim;alw9WeKEinisLSl0oz;li1n4J;h8ramen60;a0MeXfd,hWiSkp,m,nRoMuK;bbiOEdKnescaO6thKI;dy,mAo53;bMcheIBk,llout,mKYn,strOWtLut,wHWyalK;e,iHT;!ms;bIUertK;o,s;dMIli;!chmoP7dMflEWgLnCo,sK;en,is,n0;id,oPF;erHQin;a,etorEi;a05bP1c02d01ed,fZgeneratYhXinsBTlVmUnTopHpSsOtMuni5vKwiP2;!eKis2;aHJl,rL6;ireKroacMP;d,e;isGPouOXpMtK;auran3Xi1leK0rK;a8iGLucNA;ectf9Bi3onF2;aGYe9liP8;e,oFL;ittit6WonstrGA;aKinqBW;t2Pxi1;abiliDKearC;e,i5;lKorm0reshM3;ex;efiIreJO;oKrea3urIQyc7;llectKvO2;!i5;cLlisK;m,tCN;hi1tiM5;!dH6gQiPjOkMma,nLpp8tionK;!a7;gi1k8t;etenmotK7oK;ff;asthAcha2Y;!deJ2;i1ot3;aNeLiKrA;!rGZtt0;bec,er,sKue;adilMYtionG;drLil,lifKntitaLRrt;i0yi1;a6up7;a14cc,df,e0Wh0Si0Ol0KneumonJQo0ErUsSt,uNyK;rKth5;amKotechnE;id;!lMnLpKrH5tlibHM;!il;cM7dKZ;lKp;ed,in;u,ychK;edelicJFotE;!a02eYiSoKudenti9;acLCbQduci1ficDNhibiBlifeFRmOpNspecLCtLvi1xK;imiFy;eKocIW;cL9oBZ;!el,ortioECrietaD;i9EotKulga3;er,iFT;aO8oscKP;c2m9nLus,vK;atisaBeK9y;cLteK;d,r;eKiplCZ;shFWt5;cLsKvale6;choIJumA0;eNViK;piKEse;isKEnk;etMAintOlMmpKWnKCoh,rt0sLte6uK;ghkeepsGMltD;!h,tstructuraGU;iKo,ystyreI;sh2teFG;er,leI2;aMentif7EigI3uK;mp,nd0rK;al,ipo60;c0iG9nta8yboy;cMer,lLnFOp0st5tcaiK;rn;griBDlaL1;kaxe,s;arLil,oKysik;bIGnograph,spha3toKR;isKmaceutLU;ee;acoJIdQePll,nOrLso,tKyt5;smaBOty;fect5Uk,plex2sLturb,vK;aM5eBM;ia,o0C;dlet5gu8mAobsc9H;p0ve;estM5ro;cWhrump,lUmphlLYnSoH0pRrPsNtKveABy0;el,hLi1CrK;iot5AonC4;find0ogH;siKtuKPwA;ng,onaC8;e,kKr98va4B;da7er,s;pardel7ua;iKna,ty;!ck;eKletiz0;ont1Mt3;hacamGLifiMIkeGV;b04c03d02hLWig,k01l00mHFnsLKpVrTscillGItSuLverKw,xo;caIOdHHfl7SsARweAR;ghI6rse1MtK;da3fOgrHJlNpatBXrLsK;ourJ4pokHtaLV;ageKigH0;!oKB;ook;ieI8l7L;hr;atHMeo,h,phaKweI7;naJY;al,eratNpLrBXtimiK;st,zaB;!ressK;i40or;ioEY;e,ivB7ya;ok,ra;e,or;ap,eaniA;eMliLnox46sK;i14tiC7;qGVvi5;diBErflac08se;aVdp,eThs,iRl,oMuK;anIIdiHZm,r76tK;crack0elK4;b6Oel,rNs2tLuKwadHT;riK5s;aBiKon4;ceGfy;thw5GwHP;cZgKna,ssAv0;g0h;at4edKighboF7ptuIutr5vermoJGwpoA4;to,y;fH7gPm2rNtKus8Jxa0M;!al,e,hurK7ionK;alKwiKJ;e,ly;eKrow4;ndJX;!a,p2X;a0Qc,dl,e09g08i01l7Hm00n,oQre,sdn,tPuK;ffl0jNlMmLse,tKzaffarp2V;e,uFQ;b7phrIH;ayJXl,ticulIO;he;h,nl;by,c26dRhand98jo,le,ntQrOtNurMvemK;enK;ts;ni1;el,if;m5tK;ar,e;gomeDy;s,ulaK;r,te;ac,cb,r;cPdtFWg,lNnMsKtt,xIO;conduBYtKunderstanKX;aken4re4Y;g7iaILnesoGF;banI7iKls;tari4;k,roE5;!mt;aZdiYga,htab,iXlVmUndelssohn,rRsiQtK;aNeorLrK;e,opolH9;ologK;iGNy;boKgenomEphysiIK;li3;lf;ceLiK;diA;d9GneD;braIor9J;l5JtK;dFBi1;!jE7;an,ci,ocI2;d,ningEO;cdonaFJdeleiIe,gZharashtIOjeK4keov0lG6mYnVori,rQsNtKvrokordatIN;chLeriKthew,u6H;al9B;a,up;onLqueraJ3seKt;!uC;ic,s;cNe,gaux,iMkLr57sKtyrdom,v8;!h9;ed,weFT;ah,jua8Sni;!el;azLe,iKni1;cuHNp1C;ir;i,ma;!nK;et,iIF;a07dr,e00gasherF7iToMt3uK;c7PminaKna,th0;to;cPfFg8h,nNoMpLrDtteDveKyoHV;d,rs;ez;nGPsH;eso0VgeK;!viF;a7ke;!a4KbPfOgaG9kelih35llipFWmitDVnda,ps,que0XtNvLzK;a9YzCB;!ab7eK;ly,rpoE1;er9i24;!elo1;erDN;aPctTgOipzNnMonLsKxIW;lievil7sH;!a9Q;!gt9Fin;ig;enEVitimaGD;rn2sh;boMcBIdi83gENnKsh,tituI1ughGwf2V;!dK;maDGspoFG;ur0;aTeRhaUiOk,nNoMrKuaH6yt7Z;isKne,uC;!tH;d8DlkaEGppH;aFXitDG;a,ck8dLln,nK;as,ky;d,s;tKyca99;amiIo;bMi,lLminsKngaroo,rzBSthleHufmA;ki;a,iskF8;hi;aXeTiRoOp,uK;diciaMliLmKnkBFrisdicA7st4;bo,pi1;et,us;l4ry;hannesbu3DllLn,sefi79urnaliI9yK;ce,f27;iv0y;gJnK;g7n7X;l4opard7FrLsKw63;sGDt;emy,oK;me;!e,mmu,rNundiERwAyK;!aK;!nK;ti;ur;c91d0Uep,gGHll0Sm0KnOon,rLsKtdc,vy,�m;i,l71nt,otoG3p,su8V;e,onErKw8;a9MeK;gBNsist87vers87;a0Ec09d04expen9Mf01gZher8Tjur00na3sTtNvK;aLestigBQoK;iEFlveEN;d0li55;eLimi91oxicaCEuitiK;on,ve;lle8SnsMrK;courCest4CgHim,stellJvK;al,iew0;e4iEQ;aniFensiEOiOoNtitutMuK;boKl8;rdi7Q;es,i98;lub7mnCM;dLgnifica6;!enKlew15;ioH2;atuaBect2iLlKor8TringeE7;i8Fow;ltHKni6Orm;eNiKone0S;ra,spensGviK;dualistKs7J;!ic;ce6fini6J;arce8Ni3lu5VoLuK;mbe6r;mpKnveni6J;eKle3;te6;deq3Sugu8I;a,bal7VmQpK;airDSeFYlNosH3rKud6E;essLi6oK;bGv;ioniCY;a6iKoEN;ca3ed;aEKort9uI;egB5iKust89;ga6;eKhr;aBolE6;a0Cbo,d,e04i02oUsbc,uMyK;bridi6NdraKphe6T;!te;a,dQe,gPlOmNnLrKssa8;l,t8;chbaCSk,tK;smA;iGNp;k,l;e4h,o;!s5;c,dgs5lQmoPpOrLtKuAKwa6W;a,d54liI;at0Lde,izoLrifi2seKto92;baCJs;nt9;eless81i1;!sexuaGD;l0ocauC8;gh0jaCElKnDRp0D;laDt5um;aNbrid54ctEdDPightHlMmingwC1rLsKzboll5P;siA;cul52eup5i1o8;en,iCLm,o;d9Dli1rLtK;ed,hr14;sBVtK;beZlaF8s;bitYck0iVkim,lUnPppen8rMst,tLunAHwD9ywKzy;ood;chEQin;ajuku,dwoBGe,mKr0Y;fKi1oET;ul;dMgLoK;i,v0;mAov0;ed4sKy;!haCZ;fwBIibC0;magJrLtiK;!an;e,sty7;at;a0Hb,e0Bh09i06l02oVq,rMta,uKv,y88;cci,itarist,nKr5st;k,n11powd0sling0;aOeNoLumK;py;gnKovy;io;enwiASg,naE7;!buge5cefMmmLnE9phEssro1KtiDVveKze;ly,ya5P;!atDO;ul4;dPkha7ldAFnOodNrMss72uLvernK;e9Io99;dsmBKld,t;ilD8y9X;n34y;a,zal3Z;damn,ly;aMea0LoLuK;coCtH;b97ck;dsA9re;!bbDPntLta,vK;!in;lemA;aKerao;r,st4;eOiNnMoLrK;manEra55;rg;eAYii;g0s;la9Zs;elElMrKu6ve,ye;gantua,rK;is5;en,il9BlK;ow;a0Gcc,e0Ci04lXoUps,rMuK;giBDlfil66ndraiKss,tur3C;si1;aOeMiLoK;!ck,gs,sF;g8PnchmA;a6MderiAFeKn2Gs05t;l50z0;ct9nKv9;!cKk5W;es,o7G;!al,cu,dd0n,oLrKurteenDI;es25feAJg2mul20st0tu46;liCA;!aOeNiLoK;c0Pwn,yd;ckK;!er;mi1;k,tterKvor88;!y;asQck7dPfa,g,lNnd0rKs2GtzwarrH;eKi1;mApK;laA9;i1leK;r,t;eDRuciaD;co;ign,lKminiItiBU;dmAiciLlK;!a;ta3;b6Xci7SggSirRk,lQmOsMtimLvorKyBB;ab4;a,id;ciKten0;naBsm;iliaKou;riF;afAWli1se4;e,i28;ot;a0Rb0Qconom0Pd0Ngo,i0Ml0Gm0Cn06p03r01s00thYureXvTw,xK;cPemplaDhBZodCRpNtK;eri8CingLrK;adiBemiCW;uiBC;eCCoK;!uCB;eedLiClusiK;on,ve4;ing4;acMeLidentKolvi1;iaDly;n4ri1N;ua3;ka;iKniciF;c,op7T;ca5Gpn;aCe3Pn8PotEronKupByi;eoC9;idemiKo85;c,oloK;gy;abl2chaOdMfLgin1Jjoy9BlarA4tKveAK;ang7ertain0fer6;orceG;angBBeKow;ar97r;nt0;bKerg1Rit,pre6Sul67;arKryo;k,rassK;!me6;aps2ectNg8iMlLuciK;da3;en,is;e,minaBte;ed,or,rK;ic6Gocu3;ghFn0;en,iKuc5Ww8;b7ti1;ic6C;!oA6;rKsi0t0;nKri1;eKi1;d,st;a1Hb,e0Oh0Mi02khImt,oWps,rPtx,uNwMyK;naKsfunc3G;mi9R;ell0;bl8ffer8nferm7TrKsk;ga;aMeKugsto9F;aKid9A;ms;goLmKug62;as;nKon;s,va7;cNe,gs,l9OsMug,wnK;for80rK;ig5W;!t;tor9umenK;taB;a01ctator38dn�t,e00ffuZg7Tke,lYmWng,rectVsNvLzK;zy;er,iK;ne,s1H;approv9baAIcovQencha6gPk,pOrupBsNtK;!oLrK;esCibut6D;rt;!en5O;at6Lel,ro84ut02;ra7Lus5M;er0ry;i1oD;enKinu7Z;si2L;ige6u3;si5;go,se;gnoAOlKphragm,z;og;!arK;na;adli7Ub09c04fXja,lUmRnQpoCsNtLvoK;id,ur;eKritA9;!cB;ai,cKpat64tiI;artKrip7L;es;is,nis;iCoK;nKs;ize;ay2e1PiKta;beraOca7LnK;ea3qu1I;!eOiKorm;cMnK;aKi7A;te4;ie6;a4RrK;en6P;aNiKo1K;dLsionmK;ak;ed4;de6;aLorK;ah;ti1ucheD;da,l2ZmOnNphn6HrLzzlK;e,i1;i1la,wiK;ni9M;dy,e,i82;ag0Qphu;a34e2Zh2Ji2El20o09ps,rWuMyKzechoslovak4T;clooctyInicK;al,i9H;bby,lPnOrNsKtt0;se,tomK;aDiK;zaB;d,ra6t64;n,t;miMtK;!iKur3S;va3;na3;aTeQickPoNpf,uK;cLde,is0ncKsh2t4Vz;hy;ib7;ssKt4S;i1roa4Y;et0;a3RdLeK;!d;it4C;ck02m,wK;foKl2;rd;a19b17c16di7Nl12m0JnSok0pi1rRsPuLvKwdenbea8G;alVe2H;nKp,rt1A;sell45teK;rKss;atta53fe5D;mKpl4R;e6Ric;de1Kneli8Epor2M;c08f03gre02jec6Hn,quer3ZsVtOveK;nLyK;an59;iKtion30;ent4;esPinOrK;aLi5NollK;ed,i1;ctu9diK;ct;ge6u2;ta6;ePideraOolMtK;ituKr38;en5L;aBiK;daB;b4te;c8Gque6;gaB;edeNiMoK;ld,rKu7H;maS;r7Ls8H;raB;e4KluRurK;!ri1;ed2Yi5ZmZpKra6Y;aUeQlPuK;lNtK;aKe;tiK;on9;si4W;et2i7J;lMnsatLtitiveK;ne26;e,oD;li1;nionLrK;ative4t4F;shK;ip;andLence4Citt2oK;diFnsenCti5;i1o;a,e,in,lK;aLegK;ia3;bo7Lti5;ky;bleKweb;r,s2Q;st0;aRePicOoMuK;bKt2R;houC;g,tK;!h2;ki1;aKvela6Ew;nup,ri1;mOrNsLudK;e,io;p,sK;ma3;ifi6N;my,p;d0lantNrcuMtizeLvK;!i6Z;ns;la3;ro;aVeRiOlNoMristLuK;ck,m;ie;lester1Ap8reograph0;oe;lKnat1Jo1rp;dbir60l8;in;a13ckMerlead0meta2BnnLrr3MvK;rol5Dy;ai;li2G;mele5nLrKs0te0Iuta4L;co9ge0JitG;d4RgK;!ed;dJlMnLrK;amEti4W;s1Gtenni9;eb,lKtE;phoI;b02dill01j00lYmXnWpitaVrPsk51tLusew22vK;alDiF;astrophMeLoptKs;ri41;ri1;e,ic;am3MdiNmeMneLp,r,tK;e,i0;!ro;l,n;ff,ovascK;ulJ;!li1U;alicu4Xon4At5;eo,pi1;culKle;at0X;un;ac;ar4IrilK;lo;a1Id1He12ff,i0Wk,l0Pmi,o0CrUsc,uLyK;goIpaY;ckRdQff1FgPildNrKttermilk;eLgKi9n2qa,s02;eMundy;au;eKup;rs;is,s;ge,mou4R;he4Ale;aZeYiVoPuK;iCsLtK;al4;chet0QhK;leK;ss;adMil,keLns5s,ugKw44;ht;!ra2M;casLsK;he3V;ti1;an,ga3Vm,nLstKtann30;ol;gt,k;ad4Ady;cKmb7;el3O;di4ei1iVlSmbQnfi2IoOp,rMttl2uKwl0xi1;qu3MtiqK;ue;dHnK;eo;lpr21mtK;own;ardKer;!i0;ivLogneCshevikK;!s;ia;li1s;ackPeu,indNoMuKvd;etoo3Tffs,rK;!ry;or;foK;ld;smi3O;!asOcep,d47kiNl2Jnd0oteQpolJrLsK;!hAmar0E;thsKyaL;toI;ni;!e;aXcWeVfeUginn0hSiji1lPnNrt35sMtLwitK;ch;ta;ie1Jtiv9;chmaKz;rk;lKmo6ongi1;a,wooKy;ds;n,oK;ld0;ll;p0swax;ht1Bky;k,t7;ay;bys03c01ilZjaj,klaYllXnUrQsNtK;ch,hKtali5;ed,urK;st;eKilisk;liI;ne;aMki1rK;acks,eK;tt;ck;a,ge,kKn,qu26;er,i1ruKs;pt;ad,er;va;ey,oK;ut;h,kKteri9;i1la1C;it;a3Gb38c2Sd2If2Dg29h26i23l1Tm1Mn0Sp0Iqua0Hr06sXtTuRvOwMxLyKzu0R;ce;is;ardKww;ed,s;aKen0G;il,tJ;ar;dito09gKro17;me6;kinsMmospherEtK;orneKributG;ys;!on;ce1XhPparag28sLtK;ai0Chma;ay,eK;nt,rK;tiK;ve;croLlK;ey;ft;boret17chNeMistocraLre,se,tilleDun;ry;cy;nt,pa;aeolPbiNduMiK;tecKve;tur9;ke;shK;op;og0L;ri0W;erRh0Gni,oPpK;arNeKlaud,s;alGllLndaK;ge;a6ee;el;logKst7;etEiC;tuK;re;a08cestr07d04g00iZnXoVtLxioKy17;us4;arctSeQhPiLoinK;et3;bioLgH;en;tiK;cs;em,o0K;loK;pe;ica;mKn;alo10;abelKex,ie;la;ma3ta;eMri4uiK;sh;ly;ls;hLroutsK;os;ra;al,y;grNlMtomK;ic9;al;!ytE;am;aPbiguiFd,eNiLpliKulTy;fy;notransferaCtabh;se;nKricorp;!d2;!r;geSimoRlNphabMsea,tLuminK;um;er2;et;ahabMeLo0ZuK;de;!r0K;ad;ny;riA;oLyaK;!h;li;hLimK;sa;hh;a3gMrK;ouK;nd;ie,ro;firNro,tK;ermaLh0;er;th;maB;e7judiRnAoOvK;entuLisK;er,or;roK;us;lesce6rG;ab7;an;caB;le;cOh,ne,ouMquiLtiviK;sm;esc2r2;stE;ic;eOoLt,usK;aBed;rKst;di1;ng;leOsK;siK;biK;liF;ty;ra3;andon2diOe,oliBuK;!nda6s;nt;ti5;on;ca3;te;ed;a,s,ta"
  };

  const tf = function (view, opts = {}) {
    let counts = {};
    let use = opts.use || 'root';
    view.docs.forEach(terms => {
      terms.forEach(term => {
        let str = term[use] || term.implicit || term.normal;
        if (str) {
          counts[str] = counts[str] || 0;
          counts[str] += 1;
        }
      });
    });
    return counts
  };

  const idf = function (view, opts = {}) {
    let counts = {};
    let total = 0;
    let use = opts.use || 'root';
    view.docs.forEach(terms => {
      terms.forEach(term => {
        let str = term[use] || term.implicit || term.normal;
        if (str) {
          counts[str] = counts[str] || 0;
          counts[str] += 1;
          total += 1;
        }
      });
    });

    counts = Object.entries(counts);
    counts = counts.reduce((h, a) => {
      if (opts.min && a[1] < opts.min) {
        return h
      }
      // IDF = (Total number of documents) / (total number of documents containing the keyword)
      let num = Math.log10(total / a[1]);
      //force between 0-1
      // num = num / max
      // num = Math.round(num * 1000) / 1000 // round to 2 digits
      h[a[0]] = num.toFixed(3);
      return h
    }, {});
    return counts
  };

  const unzip = function (model) {
    let all = {};
    Object.keys(model).forEach(k => {
      model[k] = efrt.unpack(model[k]);
      let num = Number(k);
      Object.keys(model[k]).forEach(w => {
        all[w] = num;
      });
    });
    return all
  };

  const model = unzip(pcked);
  let keys = Object.keys(model);
  const max = model[keys[keys.length - 1]] * 1.1;
  // console.log(Object.keys(model).length.toLocaleString())
  // console.log(model.sway)

  const addMethods = function (View) {

    View.prototype.tfidf = function (opts = {}) {
      // term frequency
      let counts = tf(this, opts);
      let freqs = Object.entries(counts);
      freqs = freqs.map(a => {
        let [w, count] = a;
        // tfidf = tf * idf
        let tfidf = count * (model[w] || max);
        // round it 2 decimals
        tfidf = Math.round(tfidf * 100) / 100;
        a[1] = tfidf;
        return a
      });

      return freqs.sort((a, b) => {
        if (a[1] > b[1]) {
          return -1
        } else if (a[1] < b[1]) {
          return 1
        }
        return 0
      })
    };

    View.prototype.idf = idf;
  };

  const api = function (View) {
    addMethod(View);
    addMethods(View);
  };

  const compute = {
    // this is just the same thing
    // but written to Term objects
    tfidf: (view) => {
      let res = view.tfidf();
      res = res.reduce((h, a) => {
        h[a[0]] = a[1];
        return h
      }, {});
      view.docs.forEach(terms => {
        terms.forEach(term => {
          term.tfidf = res[term.root || term.implicit || term.normal] || 0;
        });
      });
    }
  };

  var plugin = {
    compute,
    api
  };

  return plugin;

}));
