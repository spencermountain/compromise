/* nlp_compromise v7.0.0
   github.com/nlp-compromise
   MIT
*/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nlp_compromise = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/spencer/mountain/nlp/nlp_compromise/node_modules/browserify/node_modules/process/browser.js":[function(_dereq_,module,exports){
// shim for using process in browser

var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

(function () {
  try {
    cachedSetTimeout = setTimeout;
  } catch (e) {
    cachedSetTimeout = function () {
      throw new Error('setTimeout is not defined');
    }
  }
  try {
    cachedClearTimeout = clearTimeout;
  } catch (e) {
    cachedClearTimeout = function () {
      throw new Error('clearTimeout is not defined');
    }
  }
} ())
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
    var timeout = cachedSetTimeout.call(null, cleanUpNextTick);
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
    cachedClearTimeout.call(null, timeout);
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
        cachedSetTimeout.call(null, drainQueue, 0);
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/index.js":[function(_dereq_,module,exports){
(function (process){
'use strict';
var escapeStringRegexp = _dereq_('escape-string-regexp');
var ansiStyles = _dereq_('ansi-styles');
var stripAnsi = _dereq_('strip-ansi');
var hasAnsi = _dereq_('has-ansi');
var supportsColor = _dereq_('supports-color');
var defineProps = Object.defineProperties;
var isSimpleWindowsTerm = process.platform === 'win32' && !/^xterm/i.test(process.env.TERM);

function Chalk(options) {
	// detect mode if not set manually
	this.enabled = !options || options.enabled === undefined ? supportsColor : options.enabled;
}

// use bright blue on Windows as the normal blue color is illegible
if (isSimpleWindowsTerm) {
	ansiStyles.blue.open = '\u001b[94m';
}

var styles = (function () {
	var ret = {};

	Object.keys(ansiStyles).forEach(function (key) {
		ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

		ret[key] = {
			get: function () {
				return build.call(this, this._styles.concat(key));
			}
		};
	});

	return ret;
})();

var proto = defineProps(function chalk() {}, styles);

function build(_styles) {
	var builder = function () {
		return applyStyle.apply(builder, arguments);
	};

	builder._styles = _styles;
	builder.enabled = this.enabled;
	// __proto__ is used because we must return a function, but there is
	// no way to create a function with a different prototype.
	/* eslint-disable no-proto */
	builder.__proto__ = proto;

	return builder;
}

function applyStyle() {
	// support varags, but simply cast to string in case there's only one arg
	var args = arguments;
	var argsLen = args.length;
	var str = argsLen !== 0 && String(arguments[0]);

	if (argsLen > 1) {
		// don't slice `arguments`, it prevents v8 optimizations
		for (var a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!this.enabled || !str) {
		return str;
	}

	var nestedStyles = this._styles;
	var i = nestedStyles.length;

	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	// see https://github.com/chalk/chalk/issues/58
	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
	var originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && (nestedStyles.indexOf('gray') !== -1 || nestedStyles.indexOf('grey') !== -1)) {
		ansiStyles.dim.open = '';
	}

	while (i--) {
		var code = ansiStyles[nestedStyles[i]];

		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;
	}

	// Reset the original 'dim' if we changed it to work around the Windows dimmed gray issue.
	ansiStyles.dim.open = originalDim;

	return str;
}

function init() {
	var ret = {};

	Object.keys(styles).forEach(function (name) {
		ret[name] = {
			get: function () {
				return build.call(this, [name]);
			}
		};
	});

	return ret;
}

defineProps(Chalk.prototype, init());

module.exports = new Chalk();
module.exports.styles = ansiStyles;
module.exports.hasColor = hasAnsi;
module.exports.stripColor = stripAnsi;
module.exports.supportsColor = supportsColor;

}).call(this,_dereq_('_process'))
},{"_process":"/home/spencer/mountain/nlp/nlp_compromise/node_modules/browserify/node_modules/process/browser.js","ansi-styles":"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/node_modules/ansi-styles/index.js","escape-string-regexp":"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/node_modules/escape-string-regexp/index.js","has-ansi":"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/node_modules/has-ansi/index.js","strip-ansi":"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/node_modules/strip-ansi/index.js","supports-color":"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/node_modules/supports-color/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/node_modules/ansi-styles/index.js":[function(_dereq_,module,exports){
'use strict';

function assembleStyles () {
	var styles = {
		modifiers: {
			reset: [0, 0],
			bold: [1, 22], // 21 isn't widely supported and 22 does the same thing
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		colors: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39]
		},
		bgColors: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49]
		}
	};

	// fix humans
	styles.colors.grey = styles.colors.gray;

	Object.keys(styles).forEach(function (groupName) {
		var group = styles[groupName];

		Object.keys(group).forEach(function (styleName) {
			var style = group[styleName];

			styles[styleName] = group[styleName] = {
				open: '\u001b[' + style[0] + 'm',
				close: '\u001b[' + style[1] + 'm'
			};
		});

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});
	});

	return styles;
}

Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});

},{}],"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/node_modules/escape-string-regexp/index.js":[function(_dereq_,module,exports){
'use strict';

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};

},{}],"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/node_modules/has-ansi/index.js":[function(_dereq_,module,exports){
'use strict';
var ansiRegex = _dereq_('ansi-regex');
var re = new RegExp(ansiRegex().source); // remove the `g` flag
module.exports = re.test.bind(re);

},{"ansi-regex":"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/node_modules/has-ansi/node_modules/ansi-regex/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/node_modules/has-ansi/node_modules/ansi-regex/index.js":[function(_dereq_,module,exports){
'use strict';
module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
};

},{}],"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/node_modules/strip-ansi/index.js":[function(_dereq_,module,exports){
'use strict';
var ansiRegex = _dereq_('ansi-regex')();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};

},{"ansi-regex":"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/node_modules/strip-ansi/node_modules/ansi-regex/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/node_modules/strip-ansi/node_modules/ansi-regex/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/node_modules/has-ansi/node_modules/ansi-regex/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/node_modules/supports-color/index.js":[function(_dereq_,module,exports){
(function (process){
'use strict';
var argv = process.argv;

var terminator = argv.indexOf('--');
var hasFlag = function (flag) {
	flag = '--' + flag;
	var pos = argv.indexOf(flag);
	return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
};

module.exports = (function () {
	if ('FORCE_COLOR' in process.env) {
		return true;
	}

	if (hasFlag('no-color') ||
		hasFlag('no-colors') ||
		hasFlag('color=false')) {
		return false;
	}

	if (hasFlag('color') ||
		hasFlag('colors') ||
		hasFlag('color=true') ||
		hasFlag('color=always')) {
		return true;
	}

	if (process.stdout && !process.stdout.isTTY) {
		return false;
	}

	if (process.platform === 'win32') {
		return true;
	}

	if ('COLORTERM' in process.env) {
		return true;
	}

	if (process.env.TERM === 'dumb') {
		return false;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
		return true;
	}

	return false;
})();

}).call(this,_dereq_('_process'))
},{"_process":"/home/spencer/mountain/nlp/nlp_compromise/node_modules/browserify/node_modules/process/browser.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/adjectives/adjectives.js":[function(_dereq_,module,exports){
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

module.exports = fns.uncompress_suffixes(arr, compressed);

},{"../fns":"/home/spencer/mountain/nlp/nlp_compromise/src/data/fns.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/adjectives/convertable.js":[function(_dereq_,module,exports){
'use strict';

//these are adjectives that can become comparative + superlative with out "most/more"
//its a whitelist for conjugation
//this data is shared between comparative/superlative methods
module.exports = ['absurd', 'aggressive', 'alert', 'alive', 'awesome', 'beautiful', 'big', 'bitter', 'black', 'blue', 'bored', 'boring', 'brash', 'brave', 'brief', 'bright', 'broad', 'brown', 'calm', 'charming', 'cheap', 'clean', 'cold', 'cool', 'cruel', 'cute', 'damp', 'deep', 'dear', 'dead', 'dark', 'dirty', 'drunk', 'dull', 'eager', 'efficient', 'even', 'faint', 'fair', 'fanc', 'fast', 'fat', 'feeble', 'few', 'fierce', 'fine', 'flat', 'forgetful', 'frail', 'full', 'gentle', 'glib', 'great', 'green', 'gruesome', 'handsome', 'hard', 'harsh', 'high', 'hollow', 'hot', 'impolite', 'innocent', 'keen', 'kind', 'lame', 'lean', 'light', 'little', 'loose', 'long', 'loud', 'low', 'lush', 'macho', 'mean', 'meek', 'mellow', 'mundane', 'near', 'neat', 'new', 'nice', 'normal', 'odd', 'old', 'pale', 'pink', 'plain', 'poor', 'proud', 'purple', 'quick', 'rare', 'rapid', 'red', 'rich', 'ripe', 'rotten', 'round', 'rude', 'sad', 'safe', 'scarce', 'scared', 'shallow', 'sharp', 'short', 'shrill', 'simple', 'slim', 'slow', 'small', 'smart', 'smooth', 'soft', 'sore', 'sour', 'square', 'stale', 'steep', 'stiff', 'straight', 'strange', 'strong', 'sweet', 'swift', 'tall', 'tame', 'tart', 'tender', 'tense', 'thick', 'thin', 'tight', 'tough', 'vague', 'vast', 'vulgar', 'warm', 'weak', 'wet', 'white', 'wide', 'wild', 'wise', 'young', 'yellow', 'easy', 'narrow', 'late', 'early', 'soon', 'close', 'empty', 'dry', 'windy', 'noisy', 'thirsty', 'hungry', 'fresh', 'quiet', 'clear', 'heavy', 'happy', 'funny', 'lucky', 'check', 'important', 'interesting', 'attractive', 'dangerous', 'intellegent', 'pure', 'orange', 'large', 'firm', 'grand', 'formal', 'raw', 'weird', 'glad', 'mad', 'strict', 'tired', 'solid', 'extreme', 'mature', 'true', 'free', 'curly', 'angry'];

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/dates/dates.js":[function(_dereq_,module,exports){
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
'minute', 'hour', 'morning', 'afternoon', 'evening', 'night', 'day', 'week', 'month', 'year', 'decade'];
//add their plurals
var len = durations.length;
for (var _i = 0; _i < len; _i++) {
  durations.push(durations[_i]);
  durations.push(durations[_i] + 's');
}
durations.push('century');
durations.push('centuries');

var relative = ['yesterday', 'today', 'tomorrow',
// 'week',
'weekend', 'tonight'];

module.exports = {
  days: days,
  months: months,
  durations: durations,
  relative: relative
};

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/dates/holidays.js":[function(_dereq_,module,exports){
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
var holidays = fns.extendObj(annual, astronomical[thisYear] || {});

module.exports = holidays;

},{"../fns":"/home/spencer/mountain/nlp/nlp_compromise/src/data/fns.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/fns.js":[function(_dereq_,module,exports){
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/index.js":[function(_dereq_,module,exports){
'use strict';
//the data is all variously compressed and sorted
//this is just a helper file for the main file paths..

module.exports = {
  'firstnames': _dereq_('./people/firstnames'),
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
  'organizations': _dereq_('./organizations/organizations'),
  'groups': _dereq_('./organizations/groups'),
  'adjectives': _dereq_('./adjectives/adjectives'),
  'superlatives': _dereq_('./adjectives/convertable'),
  'irregular_verbs': _dereq_('./verbs/irregular_verbs'),
  'verbs': _dereq_('./verbs/verbs'),
  'misc': _dereq_('./misc/misc')
};

},{"./adjectives/adjectives":"/home/spencer/mountain/nlp/nlp_compromise/src/data/adjectives/adjectives.js","./adjectives/convertable":"/home/spencer/mountain/nlp/nlp_compromise/src/data/adjectives/convertable.js","./dates/dates":"/home/spencer/mountain/nlp/nlp_compromise/src/data/dates/dates.js","./dates/holidays":"/home/spencer/mountain/nlp/nlp_compromise/src/data/dates/holidays.js","./misc/misc":"/home/spencer/mountain/nlp/nlp_compromise/src/data/misc/misc.js","./nouns/abbreviations":"/home/spencer/mountain/nlp/nlp_compromise/src/data/nouns/abbreviations.js","./nouns/demonyms":"/home/spencer/mountain/nlp/nlp_compromise/src/data/nouns/demonyms.js","./nouns/irregular_plurals":"/home/spencer/mountain/nlp/nlp_compromise/src/data/nouns/irregular_plurals.js","./nouns/places":"/home/spencer/mountain/nlp/nlp_compromise/src/data/nouns/places.js","./nouns/professions":"/home/spencer/mountain/nlp/nlp_compromise/src/data/nouns/professions.js","./nouns/uncountables":"/home/spencer/mountain/nlp/nlp_compromise/src/data/nouns/uncountables.js","./organizations/groups":"/home/spencer/mountain/nlp/nlp_compromise/src/data/organizations/groups.js","./organizations/organizations":"/home/spencer/mountain/nlp/nlp_compromise/src/data/organizations/organizations.js","./people/firstnames":"/home/spencer/mountain/nlp/nlp_compromise/src/data/people/firstnames.js","./values/currencies":"/home/spencer/mountain/nlp/nlp_compromise/src/data/values/currencies.js","./values/numbers":"/home/spencer/mountain/nlp/nlp_compromise/src/data/values/numbers.js","./values/ordinalMap":"/home/spencer/mountain/nlp/nlp_compromise/src/data/values/ordinalMap.js","./values/units":"/home/spencer/mountain/nlp/nlp_compromise/src/data/values/units.js","./verbs/irregular_verbs":"/home/spencer/mountain/nlp/nlp_compromise/src/data/verbs/irregular_verbs.js","./verbs/verbs":"/home/spencer/mountain/nlp/nlp_compromise/src/data/verbs/verbs.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/lexicon.js":[function(_dereq_,module,exports){
'use strict';
//a lexicon is a giant object of known words

var data = _dereq_('./index');
var fns = _dereq_('./fns');
var Term = _dereq_('../models/term');

var lexicon = {};

var addObj = function addObj(o) {
  fns.extendObj(lexicon, o);
};
var addArr = function addArr(arr, tag) {
  var l = arr.length;
  for (var i = 0; i < l; i++) {
    // if (lexicon[arr[i]]) {
    // console.log('-' + arr[i] + '    ' + lexicon[arr[i]] + '->' + tag)
    // }
    lexicon[arr[i]] = tag;
  }
};
//let a rip.
addObj(data.abbreviations);
addObj(data.firstnames);
addArr(data.places.airports, 'Place');
addArr(data.places.cities, 'City');
addArr(data.places.countries, 'Country');
addArr(data.uncountables, 'Noun');
addArr(data.organizations, 'Organization');
addArr(data.groups, 'Noun');
addArr(data.adjectives, 'Adjective');
addArr(data.superlatives, 'Adjective');
addArr(data.currencies, 'Currency');
addArr(data.verbs, 'Verb');
addArr(data.units, 'Unit');

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
addArr(data.dates.days, 'Day');
addArr(data.dates.months, 'Month');
addArr(data.dates.durations, 'Duration');
addArr(data.dates.relative, 'Date');
addArr(Object.keys(data.holidays), 'Day');

addArr(data.professions, 'Actor'); //?
addArr(data.demonyms, 'Demonym'); //?

//irregular verbs
Object.keys(data.irregular_verbs).forEach(function (k) {
  lexicon[k] = 'Infinitive';
  var conj = data.irregular_verbs[k];
  Object.keys(conj).forEach(function (k2) {
    if (conj[k2]) {
      lexicon[conj[k2]] = k2;
    }
  });
});

//conjugate verblist
var wantVerbs = ['PastTense', 'PresentTense',
// 'FutureTense',
'Infinitive', 'Gerund', 'Actor', 'Adjective'];
data.verbs.forEach(function (v) {
  var t = new Term(v);
  t.tag.Verb = true;
  var obj = t.info('conjugations') || {};
  wantVerbs.forEach(function (k) {
    if (obj[k] && !lexicon[obj[k]]) {
      lexicon[obj[k]] = k;
    }
  });
});

//conjugate adjectives
data.adjectives.forEach(function (v) {
  var t = new Term(v);
  t.tag.Adjective = true;
  var obj = t.info('adjconjugations') || {};
  Object.keys(obj).forEach(function (k) {
    if (obj[k] && !lexicon[obj[k]]) {
      lexicon[obj[k]] = k;
    }
  });
});

//these ad-hoc manual ones have priority
addObj(data.misc);

//for safety (these are sneaky)
delete lexicon[''];
delete lexicon[' '];
delete lexicon[null];
module.exports = lexicon;

// console.log(lexicon.place);
// let t = new Term('shake');
// t.tag.Verb = true;
// console.log(t.info('conjugations'));

},{"../models/term":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/index.js","./fns":"/home/spencer/mountain/nlp/nlp_compromise/src/data/fns.js","./index":"/home/spencer/mountain/nlp/nlp_compromise/src/data/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/misc/adverbs.js":[function(_dereq_,module,exports){
'use strict';

module.exports = [
// 'now',
'again', 'already', 'soon', 'directly', 'toward', 'forever', 'apart', 'instead', 'yes', 'alone', 'indeed', 'ever', 'quite', 'perhaps', 'then', 'thus', 'very', 'really', 'often', 'once', 'never', 'away', 'always', 'sometimes', 'also', 'maybe', 'so', 'just', 'well', 'several', 'such', 'randomly', 'too', 'rather', 'abroad', 'almost', 'anyway', 'twice', 'aside', 'moreover', 'anymore', 'newly', 'damn', 'somewhat', 'somehow', 'meanwhile', 'hence', 'further', 'furthermore', 'more', 'way', 'kinda', 'totally',
// 'notably',
'of course', 'at least', 'no longer', 'sort of',
// 'at first',
'once again', 'once more', 'up to', 'by now', 'all but', 'just about', 'a lot', 'by far', 'at best', 'at large', 'for good', 'for example', 'for sure', 'at most', 'per se', 'at worst', 'upwards of', 'en masse', 'point blank', 'ad nauseam', 'all that', 'not withstanding', 'de jure', 'par excellence', 'de trop', 'a posteriori'];

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/misc/determiners.js":[function(_dereq_,module,exports){
'use strict';

module.exports = ['this', 'any', 'enough', 'each', 'whatever', 'every', 'these', 'another', 'plenty', 'whichever', 'neither', 'an', 'a', 'least', 'own', 'few', 'both', 'those', 'the', 'that', 'various', 'either', 'much', 'some', 'else', 'no',
//some other languages (what could go wrong?)
'la', 'le', 'les', 'des', 'de', 'du', 'el'];

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/misc/expressions.js":[function(_dereq_,module,exports){
'use strict';

module.exports = ['uh', 'uhh', 'uh huh', 'uh-oh', 'please', 'ugh', 'sheesh', 'eww', 'pff', 'voila', 'oy', 'hi', 'hello', 'bye', 'goodbye', 'hey', 'hai', 'eep', 'hurrah', 'yuck', 'ow', 'duh', 'oh', 'hmm', 'yeah', 'whoa', 'ooh', 'whee', 'ah', 'bah', 'gah', 'yaa', 'phew', 'gee', 'ahem', 'eek', 'meh', 'yahoo', 'oops', 'd\'oh', 'psst', 'argh', 'grr', 'nah', 'shhh', 'whew', 'mmm', 'ooo', 'yay', 'uh-huh', 'boo', 'wow', 'nope', 'haha', 'hahaha', 'lol', 'lols', 'ya', 'hee', 'ohh', 'eh', 'yup', 'et cetera', 'a la'];

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/misc/misc.js":[function(_dereq_,module,exports){
'use strict';

var misc = {
  'here': 'Adjective',
  'better': 'Comparative',
  'earlier': 'Superlative',
  'make sure': 'Verb',
  'keep tabs': 'Verb',
  'has': 'Verb',
  'sounds': 'PresentTense',
  //special case for took/taken
  'taken': 'PastTense',
  'msg': 'Verb', //slang
  'a few': 'Value', //different than 'few people'
  'years old': 'Unit', //special case
  'not': 'Negative'
};

var compact = {
  Time: ['oclock', 'morning', 'noon', 'afternoon', 'evening', 'night', 'breakfast time', 'lunchtime', 'dinnertime'],
  Adjective: ['so called', //?
  'on board', 'vice versa', 'en route', 'upside down', 'up front', 'in front', 'in situ', 'in vitro', 'ad hoc', 'de facto', 'ad infinitum', 'for keeps', 'a priori', 'off guard', 'spot on', 'ipso facto', 'fed up', 'brand new', 'old fashioned', 'bona fide', 'well off', 'far off', 'straight forward', 'hard up', 'sui generis', 'en suite', 'avant garde', 'sans serif', 'gung ho', 'super duper'],

  Place: ['new england', 'new hampshire', 'new jersey', 'new mexico', 'united states', 'united kingdom', 'great britain'],
  //conjunctions
  'Conjunction': ['yet', 'therefore', 'or', 'while', 'nor', 'whether', 'though', 'because', 'cuz', 'but', 'for', 'and', 'however', 'before', 'although', 'how', 'plus', 'versus'],
  Date: [
  //date
  'noon', 'midnight', 'now', 'morning', 'evening', 'afternoon', 'ago', 'sometime',
  //end of day, end of month
  'eod', 'eom', 'standard time', 'daylight time', 'summer time'],
  'Condition': ['if', 'unless', 'otherwise', 'notwithstanding'],

  'PastTense': ['said', 'had', 'been', 'began', 'came', 'did', 'meant', 'went'],

  'Verb': ['given', 'known', 'shown', 'seen', 'born'],

  'Gerund': ['going', 'being', 'according', 'resulting', 'developing', 'staining'],

  'Copula': ['is', 'are', 'was', 'were', 'am'],

  //determiners
  'Determiner': _dereq_('./determiners'),

  //prepositions
  'Preposition': _dereq_('./prepositions'),

  //modal verbs
  'Modal': ['can', 'may', 'could', 'might', 'will', 'ought to', 'would', 'must', 'shall', 'should', 'ought', 'shant', 'lets'],

  //Possessive pronouns
  'Possessive': ['mine', 'something', 'none', 'anything', 'anyone', 'theirs', 'himself', 'ours', 'his', 'my', 'their', 'yours', 'your', 'our', 'its', 'herself', 'hers', 'themselves', 'myself', 'itself', 'her'],

  //personal pronouns (nouns)
  'Pronoun': ['it', 'they', 'i', 'them', 'you', 'she', 'me', 'he', 'him', 'ourselves', 'us', 'we', 'thou', 'il', 'elle', 'yourself', '\'em', 'he\'s', 'she\'s'],
  //questions are awkward pos. are clarified in question_pass
  'QuestionWord': ['where', 'why', 'when', 'who', 'whom', 'whose', 'what', 'which'],
  //some manual adverbs (the rest are generated)
  'Adverb': _dereq_('./adverbs'),

  //interjections, expressions
  'Expression': _dereq_('./expressions'),

  //special nouns that shouldnt be seen as a verb
  'Noun': ['nothing', 'everything', 'god', 'student', 'patent', 'funding', 'banking', 'ceiling', 'energy', 'purpose', 'friend', 'event', 'room', 'door', 'thing', 'things', 'stuff', 'lunch', 'breakfast', 'dinner', 'home', 'problem', 'body', 'world', 'city', 'death', 'others', 'there', 'number', 'system', 'example', 'part', 'house', 'head start', 'credit card', 'fl oz', 'ad hominem', 'us dollar'],
  //family-terms are people
  Person: ['father', 'mother', 'mom', 'dad', 'mommy', 'daddy', 'sister', 'brother', 'aunt', 'uncle', 'grandfather', 'grandmother', 'cousin', 'stepfather', 'stepmother', 'boy', 'girl', 'man', 'men', 'woman', 'women', 'guy', 'dude', 'bro', 'gentleman', 'someone']
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

},{"./adverbs":"/home/spencer/mountain/nlp/nlp_compromise/src/data/misc/adverbs.js","./determiners":"/home/spencer/mountain/nlp/nlp_compromise/src/data/misc/determiners.js","./expressions":"/home/spencer/mountain/nlp/nlp_compromise/src/data/misc/expressions.js","./prepositions":"/home/spencer/mountain/nlp/nlp_compromise/src/data/misc/prepositions.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/misc/prepositions.js":[function(_dereq_,module,exports){
'use strict';

module.exports = ['until', 'onto', 'of', 'into', 'out', 'except', 'across', 'by', 'between', 'at', 'down', 'as', 'from', 'around', 'with', 'among', 'upon', 'amid', 'to', 'along', 'since', 'about', 'off', 'on', 'within', 'in', 'during', 'per', 'without', 'throughout', 'through', 'than', 'via', 'up', 'unlike', 'despite', 'below', 'unless', 'towards', 'besides', 'after', 'whereas', '\'o', 'amidst', 'amongst', 'apropos', 'atop', 'barring', 'chez', 'circa', 'mid', 'midst', 'notwithstanding', 'qua', 'sans', 'vis-a-vis', 'thru', 'till', 'versus', 'without', 'w/o', 'o\'', 'a\''];

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/nouns/abbreviations.js":[function(_dereq_,module,exports){
//these are common word shortenings used in the lexicon and sentence segmentation methods
//there are all nouns,or at the least, belong beside one.
'use strict';

//common abbreviations

var compact = {
  Term: ['arc', 'al', 'exp', 'fy', 'pd', 'pl', 'plz', 'tce', 'bl', 'ma', 'ba', 'lit', 'ex', 'eg', 'ie', 'ca', 'cca', 'vs', 'etc', 'esp', 'ft',
  //these are too ambiguous
  'bc', 'ad', 'md', 'corp', 'col'],
  Organization: ['dept', 'univ', 'assn', 'bros', 'inc', 'ltd', 'co',
  //proper nouns with exclamation marks
  'yahoo', 'joomla', 'jeopardy'],

  Place: ['rd', 'st', 'dist', 'mt', 'ave', 'blvd', 'cl', 'ct', 'cres', 'hwy',
  //states
  'ariz', 'cal', 'calif', 'colo', 'conn', 'fla', 'fl', 'ga', 'ida', 'ia', 'kan', 'kans', 'minn', 'neb', 'nebr', 'okla', 'penna', 'penn', 'pa', 'dak', 'tenn', 'tex', 'ut', 'vt', 'va', 'wis', 'wisc', 'wy', 'wyo', 'usafa', 'alta', 'ont', 'que', 'sask'],

  Date: ['jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'sept', 'oct', 'nov', 'dec', 'circa'],

  //Honourifics
  Honourific: ['llb', 'jr', 'mr', 'mrs', 'ms', 'dr', 'prof', 'sr', 'sen', 'rep', 'gov', 'atty', 'supt', 'det', 'rev', 'gen', 'lt', 'cmdr', 'adm', 'capt', 'sgt', 'cpl', 'maj',
  // 'miss',
  // 'misses',
  'mister', 'sir', 'esq', 'mstr', 'phd', 'adj', 'adv', 'asst', 'bldg', 'brig', 'comdr', 'hon', 'messrs', 'mlle', 'mme', 'op', 'ord', 'pvt', 'reps', 'res', 'sens', 'sfc', 'surg']

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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/nouns/demonyms.js":[function(_dereq_,module,exports){
'use strict';

//adjectival forms of place names, as adjectives.
module.exports = ['afghan', 'albanian', 'algerian', 'angolan', 'argentine', 'armenian', 'australian', 'aussie', 'austrian', 'bangladeshi', 'basque', // of Basque Country
'belarusian', 'belgian', 'bolivian', 'bosnian', 'brazilian', 'bulgarian', 'cambodian', 'cameroonian', 'canadian', 'chadian', 'chilean', 'chinese', 'colombian', 'congolese', 'croatian', 'cuban', 'czech', 'dominican', 'danish', 'egyptian', 'british', 'estonian', 'ethiopian', 'ecuadorian', 'finnish', 'french', 'gambian', 'georgian', 'german', 'greek', 'ghanaian', 'guatemalan', 'haitian', 'hungarian', 'honduran', 'icelandic', 'indian', 'indonesian', 'iranian', 'iraqi', 'irish', 'israeli', 'italian', 'ivorian', // of Ivory Coast
'jamaican', 'japanese', 'jordanian', 'kazakh', 'kenyan', 'korean', 'kuwaiti', 'lao', // of Laos
'latvian', 'lebanese', 'liberian', 'libyan', 'lithuanian', 'namibian', 'malagasy', // of Madagascar
'macedonian', 'malaysian', 'mexican', 'mongolian', 'moroccan', 'dutch', 'nicaraguan', 'nigerian', // of Nigeria
'nigerien', // of Niger
'norwegian', 'omani', 'panamanian', 'paraguayan', 'pakistani', 'palestinian', 'peruvian', 'philippine', 'filipino', 'polish', 'portuguese', 'qatari', 'romanian', 'russian', 'rwandan', 'samoan', 'saudi', 'scottish', 'senegalese', 'serbian', 'singaporean', 'slovak', 'somalian', 'sudanese', 'swedish', 'swiss', 'syrian', 'taiwanese', 'trinidadian', 'thai', 'tunisian', 'turkmen', 'ugandan', 'ukrainian', 'american', 'hindi', 'spanish', 'venezuelan', 'vietnamese', 'welsh', 'zambian', 'zimbabwean', 'english', 'african', 'european', 'asian', 'californian'];

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/nouns/irregular_plurals.js":[function(_dereq_,module,exports){
//nouns with irregular plural/singular forms
//used in noun.inflect, and also in the lexicon.
//compressed with '_' to reduce some redundancy.
'use strict';

var main = [['child', '_ren'], ['person', 'people'], ['leaf', 'leaves'], ['database', '_s'], ['quiz', '_zes'], ['stomach', '_s'], ['sex', '_es'], ['move', '_s'], ['shoe', '_s'], ['goose', 'geese'], ['phenomenon', 'phenomena'], ['barracks', '_'], ['deer', '_'], ['syllabus', 'syllabi'], ['index', 'indices'], ['appendix', 'appendices'], ['criterion', 'criteria'], ['man', 'men'], ['sex', '_es'], ['rodeo', '_s'], ['epoch', '_s'], ['zero', '_s'], ['avocado', '_s'], ['halo', '_s'], ['tornado', '_s'], ['tuxedo', '_s'], ['sombrero', '_s'], ['addendum', 'addenda'], ['alga', '_e'], ['alumna', '_e'], ['alumnus', 'alumni'], ['bacillus', 'bacilli'], ['cactus', 'cacti'], ['beau', '_x'], ['château', '_x'], ['chateau', '_x'], ['tableau', '_x'], ['corpus', 'corpora'], ['curriculum', 'curricula'], ['echo', '_es'], ['embargo', '_es'], ['foot', 'feet'], ['genus', 'genera'], ['hippopotamus', 'hippopotami'], ['larva', '_e'], ['libretto', 'libretti'], ['loaf', 'loaves'], ['matrix', 'matrices'], ['memorandum', 'memoranda'], ['mosquito', '_es'], ['opus', 'opera'], ['ovum', 'ova'], ['ox', '_en'], ['radius', 'radii'], ['referendum', 'referenda'], ['thief', 'thieves'], ['tooth', 'teeth']];
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/nouns/places.js":[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');

//uncompressed country names
var countries = ['usa', 'u.s.a.', 'ussr', 'brazil', 'bangladesh', 'mexico', 'vietnam', 'egypt', 'germany', 'turkey', 'france', 'united kingdom', 'italy', 'kenya', 'iraq', 'morocco', 'peru', 'yemen', 'mozambique', 'sri lanka', 'burkina faso', 'niger', 'netherlands', 'chile', 'malawi', 'ecuador', 'côte d\'ivoire', 'mali', 'zimbabwe',
// 'chad',
'belgium', 'cuba', 'greece', 'haiti', 'burundi', 'hungary', 'sweden', 'honduras', 'israel', 'laos', 'el salvador', 'libya', 'nicaragua', 'denmark', 'congo-brazzaville', 'kuwait', 'moldova', 'panama', 'jamaica', 'lesotho', 'guinea-bissau', 'timor-leste', 'djibouti', 'fiji', 'comoros', 'solomon islands', 'luxembourg', 'suriname', 'cape verde', 'malta', 'bahamas'];
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
countries = fns.uncompress_suffixes(countries, compressed_countries);

/////uncomressed cities
var cities = ['guangzhou', 'ahmedabad', 'phoenix', 'jakarta', 'curitiba', 'moscow', 'tokyo', 'nagoya', 'kobe', 'mexico', 'cebu', 'ho chi minh', 'hanoi', 'giza', 'frankfurt', 'stuttgart', 'i̇zmir', 'paris', 'toulouse', 'rome', 'palermo', 'genoa', 'cape town', 'port elizabeth', 'bogotá', 'medellín', 'seville', 'zaragoza', 'kiev', 'odessa', 'rosario', 'la plata', 'warsaw', 'kraków', 'łódź', 'wrocław', 'poznań', 'calgary', 'ottawa', 'montreal', 'winnipeg', 'sydney', 'perth', 'homs', 'iași', 'cluj-napoca', 'almaty', 'the hague', 'utrecht', 'phnom penh', 'antwerp', 'ghent', 'brussels', 'tunis', 'athens', 'thessaloniki', 'prague', 'brno', 'miskolc', 'stockholm', 'västerås', 'tegucigalpa', 'graz', 'innsbruck', 'abu dhabi', 'haifa', 'ashdod', 'dushanbe', 'niš', 'aqaba', 'aalborg', 'helsinki', 'espoo', 'vantaa', 'turku', 'košice', 'ashgabat', 'oslo', 'trondheim', 'auckland', 'tbilisi', 'zagreb', 'montevideo', 'klaipėda', 'doha', 'skopje', 'riga', 'luxembourg', 'reykjavik', 'kingston'];

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
  ma: 'yokoha,li',
  ul: 'istanb,seo,kab',
  to: 'toron,qui,por',
  iv: 'khark,lv,tel av',
  sk: 'dnipropetrov,gdań,min'
};

cities = fns.uncompress_suffixes(cities, suffix_compressed_cities);

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
cities = fns.uncompress_prefixes(cities, prefix_compressed_cities);

//some of the busiest airports in the world from
//https://www.world-airport-codes.com/world-top-30-airports.html
var airports = ['atl', 'pek', 'lhr', 'hnd', 'ord', 'lax', 'cdg', 'dfw', 'cgk', 'dxb', 'fra', 'hkg', 'den', 'bkk', 'ams', 'jfk', 'ist', 'sfo', 'clt', 'las', 'phx', 'iax', 'kul', 'mia', 'icn', 'muc', 'syd', 'fco', 'mco', 'bcn', 'yyz', 'lgw', 'phl'];

module.exports = {
  countries: countries,
  cities: cities,
  airports: airports
};

},{"../fns":"/home/spencer/mountain/nlp/nlp_compromise/src/data/fns.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/nouns/professions.js":[function(_dereq_,module,exports){
'use strict';

//professions 'lawyer' that aren't covered by verb.to_actor()

module.exports = ['accountant', 'advisor', 'farmer', 'mechanic', 'technician', 'architect', 'clerk', 'therapist', 'bricklayer', 'butcher', 'carpenter', 'nurse', 'engineer', 'supervisor', 'attendant', 'operator', 'dietician', 'housekeeper', 'advisor', 'agent', 'firefighter', 'fireman', 'policeman', 'attendant', 'scientist', 'gardener', 'hairdresser', 'instructor', 'programmer', 'administrator', 'journalist', 'assistant', 'lawyer', 'officer', 'plumber', 'getor', 'psychologist', 'receptionist', 'roofer', 'sailor', 'security guard', 'photographer', 'soldier', 'surgeon', 'researcher', 'practitioner', 'politician', 'musician', 'artist', 'secretary', 'minister', 'deputy', 'president'];

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/nouns/uncountables.js":[function(_dereq_,module,exports){
'use strict';

//common nouns that have no plural form. These are suprisingly rare
//used in noun.inflect(), and added as nouns in lexicon
module.exports = ['aircraft', 'bass', 'bison', 'fowl', 'halibut', 'moose', 'salmon', 'spacecraft', 'tuna', 'trout', 'advice', 'information', 'knowledge', 'trouble', 'enjoyment', 'fun', 'recreation', 'relaxation', 'meat', 'rice', 'bread', 'cake', 'coffee', 'ice', 'water', 'oil', 'grass', 'hair', 'fruit', 'wildlife', 'equipment', 'machinery', 'furniture', 'mail', 'luggage', 'jewelry', 'clothing', 'money', 'mathematics', 'economics', 'physics', 'civics', 'ethics', 'gymnastics', 'mumps', 'measles', 'news', 'tennis', 'baggage', 'currency', 'soap', 'toothpaste', 'food', 'sugar', 'butter', 'flour', 'research', 'leather', 'wool', 'wood', 'coal', 'weather', 'homework', 'cotton', 'silk', 'patience', 'impatience', 'vinegar', 'art', 'beef', 'blood', 'cash', 'chaos', 'cheese', 'chewing', 'conduct', 'confusion', 'education', 'electricity', 'entertainment', 'fiction', 'forgiveness', 'gold', 'gossip', 'ground', 'happiness', 'history', 'honey', 'hospitality', 'importance', 'justice', 'laughter', 'leisure', 'lightning', 'literature', 'luck', 'milk', 'mist', 'music', 'noise', 'oxygen', 'paper', 'peace', 'peanut', 'pepper', 'petrol', 'plastic', 'pork', 'power', 'pressure', 'rain', 'recognition', 'sadness', 'safety', 'salt', 'sand', 'scenery', 'shopping', 'silver', 'snow', 'softness', 'space', 'speed', 'steam', 'sunshine', 'tea', 'thunder', 'time', 'traffic', 'trousers', 'violence', 'warmth', 'wine', 'steel', 'soccer', 'hockey', 'golf', 'fish', 'gum', 'liquid', 'series', 'sheep', 'species', 'fahrenheit', 'celcius', 'kelvin', 'hertz', 'everyone', 'everybody'];

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/organizations/groups.js":[function(_dereq_,module,exports){
'use strict';

module.exports = ['center', 'centre', 'memorial', 'school', 'government', 'faculty', 'society', 'union', 'ministry', 'collective', 'association', 'committee', 'university', 'bank', 'college', 'foundation', 'department', 'institute', 'club', 'co', 'sons'];

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/organizations/organizations.js":[function(_dereq_,module,exports){
'use strict';
//just a few named-organizations
//no acronyms needed. no product/brand pollution.

var organizations = ['google', 'microsoft', 'walmart', 'exxonmobil', 'glencore', 'samsung', 'chevron', 'at&t', 'verizon', 'costco', 'nestlé', '7-eleven', 'adidas', 'nike', 'acer', 'mcdonalds', 'mcdonald\'s', 'comcast', 'compaq', 'craigslist', 'cisco', 'disney', 'coca cola', 'dupont', 'ebay', 'facebook', 'fedex', 'kmart', 'kkk', 'kodak', 'monsanto', 'myspace', 'netflix', 'sony', 'telus', 'twitter', 'usps', 'ubs', 'ups', 'walgreens', 'youtube', 'yahoo!', 'yamaha'];

module.exports = organizations;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/people/ambiguous.js":[function(_dereq_,module,exports){
'use strict';

//names commonly used in either gender
module.exports = ['casey', 'jamie', 'lee', 'jaime', 'jessie', 'morgan', 'rene', 'robin', 'devon', 'kerry', 'alexis', 'guadalupe', 'blair', 'kasey', 'jean', 'marion', 'aubrey', 'shelby', 'jan', 'shea', 'jade', 'kenyatta', 'kelsey', 'shay', 'lashawn', 'trinity', 'regan', 'jammie', 'cassidy', 'cheyenne', 'reagan', 'shiloh', 'marlo', 'andra', 'devan', 'rosario', 'lee'];

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/people/female.js":[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');

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
arr = fns.uncompress_suffixes(arr, suffix_compressed);

var prefix_compressed = {
  mar: 'go,isol,itza,sha',
  tam: 'i,ika,my',
  be: 'atriz,cky,tty,ttye',
  pe: 'arl,ggy,nny',
  pa: 'ige,m,tty'
};
arr = fns.uncompress_prefixes(arr, prefix_compressed);

module.exports = arr;

},{"../fns":"/home/spencer/mountain/nlp/nlp_compromise/src/data/fns.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/people/firstnames.js":[function(_dereq_,module,exports){
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
  names[male[i]] = 'MalePerson';
}
for (var _i = 0; _i < female.length; _i++) {
  names[female[_i]] = 'FemalePerson';
}
//ambiguous/unisex names
for (var _i2 = 0; _i2 < ambiguous.length; _i2 += 1) {
  names[ambiguous[_i2]] = 'Person';
}
// console.log(names['spencer']);
module.exports = names;

},{"./ambiguous":"/home/spencer/mountain/nlp/nlp_compromise/src/data/people/ambiguous.js","./female":"/home/spencer/mountain/nlp/nlp_compromise/src/data/people/female.js","./male":"/home/spencer/mountain/nlp/nlp_compromise/src/data/people/male.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/people/male.js":[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');

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

arr = fns.uncompress_suffixes(arr, suffix_compressed);

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
arr = fns.uncompress_prefixes(arr, prefix_compressed);

module.exports = arr;

},{"../fns":"/home/spencer/mountain/nlp/nlp_compromise/src/data/fns.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/values/currencies.js":[function(_dereq_,module,exports){
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/values/numbers.js":[function(_dereq_,module,exports){
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/values/ordinalMap.js":[function(_dereq_,module,exports){
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

},{"./numbers":"/home/spencer/mountain/nlp/nlp_compromise/src/data/values/numbers.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/values/units.js":[function(_dereq_,module,exports){
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
    words[units[k][shorter]] = true;
    words[units[k][shorter] + 's'] = true;
  });
});
words = Object.keys(words);

module.exports = {
  words: words,
  units: units
};

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/verbs/irregular_verbs.js":[function(_dereq_,module,exports){
'use strict';

var _irregular_verbs;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//a list of exceptions to the verb rules
var irregular_verbs = (_irregular_verbs = {
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
    PastTense: 'been',
    Participle: 'been',
    PresentTense: 'is',
    // FutureTense: 'will be',
    Actor: '',
    Gerund: 'am'
  },
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
    Actor: 'beater'
  },
  begin: {
    Gerund: 'beginning',
    PastTense: 'began'
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
    Gerund: 'dying'
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
    PastTense: 'wrote'
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

}, _defineProperty(_irregular_verbs, 'arise', {
  Participle: 'arisen'
}), _defineProperty(_irregular_verbs, 'beat', {
  Participle: 'beaten'
}), _defineProperty(_irregular_verbs, 'become', {
  Participle: 'become'
}), _defineProperty(_irregular_verbs, 'begin', {
  Participle: 'begun'
}), _defineProperty(_irregular_verbs, 'bend', {
  Participle: 'bent'
}), _defineProperty(_irregular_verbs, 'bet', {
  Participle: 'bet'
}), _defineProperty(_irregular_verbs, 'bite', {
  Participle: 'bitten'
}), _defineProperty(_irregular_verbs, 'bleed', {
  Participle: 'bled'
}), _defineProperty(_irregular_verbs, 'brake', {
  Participle: 'broken'
}), _defineProperty(_irregular_verbs, 'bring', {
  Participle: 'brought'
}), _defineProperty(_irregular_verbs, 'build', {
  Participle: 'built'
}), _defineProperty(_irregular_verbs, 'burn', {
  Participle: 'burned'
}), _defineProperty(_irregular_verbs, 'burst', {
  Participle: 'burst'
}), _defineProperty(_irregular_verbs, 'bought', {
  Participle: 'bought'
}), _defineProperty(_irregular_verbs, 'caught', {
  Participle: 'caught'
}), _defineProperty(_irregular_verbs, 'choose', {
  Participle: 'chosen'
}), _defineProperty(_irregular_verbs, 'cling', {
  Participle: 'clung'
}), _defineProperty(_irregular_verbs, 'come', {
  Participle: 'come'
}), _defineProperty(_irregular_verbs, 'creep', {
  Participle: 'crept'
}), _defineProperty(_irregular_verbs, 'cut', {
  Participle: 'cut'
}), _defineProperty(_irregular_verbs, 'deal', {
  Participle: 'dealt'
}), _defineProperty(_irregular_verbs, 'dig', {
  Participle: 'dug'
}), _defineProperty(_irregular_verbs, 'dive', {
  Participle: 'dived'
}), _defineProperty(_irregular_verbs, 'do', {
  Participle: 'done'
}), _defineProperty(_irregular_verbs, 'draw', {
  Participle: 'drawn'
}), _defineProperty(_irregular_verbs, 'dream', {
  Participle: 'dreamt'
}), _defineProperty(_irregular_verbs, 'drive', {
  Participle: 'driven'
}), _defineProperty(_irregular_verbs, 'eat', {
  Participle: 'eaten'
}), _defineProperty(_irregular_verbs, 'fall', {
  Participle: 'fallen'
}), _defineProperty(_irregular_verbs, 'feed', {
  Participle: 'fed'
}), _defineProperty(_irregular_verbs, 'fight', {
  Participle: 'fought'
}), _defineProperty(_irregular_verbs, 'flee', {
  Participle: 'fled'
}), _defineProperty(_irregular_verbs, 'fling', {
  Participle: 'flung'
}), _defineProperty(_irregular_verbs, 'forgot', {
  Participle: 'forgotten'
}), _defineProperty(_irregular_verbs, 'forgive', {
  Participle: 'forgiven'
}), _defineProperty(_irregular_verbs, 'freeze', {
  Participle: 'frozen'
}), _defineProperty(_irregular_verbs, 'got', {
  Participle: 'gotten'
}), _defineProperty(_irregular_verbs, 'give', {
  Participle: 'given'
}), _defineProperty(_irregular_verbs, 'go', {
  Participle: 'gone'
}), _defineProperty(_irregular_verbs, 'grow', {
  Participle: 'grown'
}), _defineProperty(_irregular_verbs, 'hang', {
  Participle: 'hung'
}), _defineProperty(_irregular_verbs, 'have', {
  Participle: 'had'
}), _defineProperty(_irregular_verbs, 'hear', {
  Participle: 'heard'
}), _defineProperty(_irregular_verbs, 'hide', {
  Participle: 'hidden'
}), _defineProperty(_irregular_verbs, 'hit', {
  Participle: 'hit'
}), _defineProperty(_irregular_verbs, 'hold', {
  Participle: 'held'
}), _defineProperty(_irregular_verbs, 'hurt', {
  Participle: 'hurt'
}), _defineProperty(_irregular_verbs, 'keep', {
  Participle: 'kept'
}), _defineProperty(_irregular_verbs, 'kneel', {
  Participle: 'knelt'
}), _defineProperty(_irregular_verbs, 'know', {
  Participle: 'known'
}), _defineProperty(_irregular_verbs, 'lay', {
  Participle: 'laid'
}), _defineProperty(_irregular_verbs, 'lead', {
  Participle: 'led'
}), _defineProperty(_irregular_verbs, 'leap', {
  Participle: 'leapt'
}), _defineProperty(_irregular_verbs, 'leave', {
  Participle: 'left'
}), _defineProperty(_irregular_verbs, 'lend', {
  Participle: 'lent'
}), _defineProperty(_irregular_verbs, 'light', {
  Participle: 'lit'
}), _defineProperty(_irregular_verbs, 'loose', {
  Participle: 'lost'
}), _defineProperty(_irregular_verbs, 'make', {
  Participle: 'made'
}), _defineProperty(_irregular_verbs, 'mean', {
  Participle: 'meant'
}), _defineProperty(_irregular_verbs, 'meet', {
  Participle: 'met'
}), _defineProperty(_irregular_verbs, 'pay', {
  Participle: 'paid'
}), _defineProperty(_irregular_verbs, 'prove', {
  Participle: 'proven'
}), _defineProperty(_irregular_verbs, 'put', {
  Participle: 'put'
}), _defineProperty(_irregular_verbs, 'quit', {
  Participle: 'quit'
}), _defineProperty(_irregular_verbs, 'read', {
  Participle: 'read'
}), _defineProperty(_irregular_verbs, 'ride', {
  Participle: 'ridden'
}), _defineProperty(_irregular_verbs, 'ring', {
  Participle: 'rung'
}), _defineProperty(_irregular_verbs, 'rise', {
  Participle: 'risen'
}), _defineProperty(_irregular_verbs, 'run', {
  Participle: 'run'
}), _defineProperty(_irregular_verbs, 'say', {
  Participle: 'said'
}), _defineProperty(_irregular_verbs, 'see', {
  Participle: 'seen'
}), _defineProperty(_irregular_verbs, 'seek', {
  Participle: 'sought'
}), _defineProperty(_irregular_verbs, 'sell', {
  Participle: 'sold'
}), _defineProperty(_irregular_verbs, 'send', {
  Participle: 'sent'
}), _defineProperty(_irregular_verbs, 'set', {
  Participle: 'set'
}), _defineProperty(_irregular_verbs, 'sew', {
  Participle: 'sewn'
}), _defineProperty(_irregular_verbs, 'shake', {
  Participle: 'shaken'
}), _defineProperty(_irregular_verbs, 'shave', {
  Participle: 'shaved'
}), _defineProperty(_irregular_verbs, 'shine', {
  Participle: 'shone'
}), _defineProperty(_irregular_verbs, 'shoot', {
  Participle: 'shot'
}), _defineProperty(_irregular_verbs, 'shut', {
  Participle: 'shut'
}), _defineProperty(_irregular_verbs, 'sing', {
  Participle: 'sung'
}), _defineProperty(_irregular_verbs, 'sink', {
  Participle: 'sunk'
}), _defineProperty(_irregular_verbs, 'seat', {
  Participle: 'sat'
}), _defineProperty(_irregular_verbs, 'slay', {
  Participle: 'slain'
}), _defineProperty(_irregular_verbs, 'sleep', {
  Participle: 'slept'
}), _defineProperty(_irregular_verbs, 'slide', {
  Participle: 'slid'
}), _defineProperty(_irregular_verbs, 'sneak', {
  Participle: 'snuck'
}), _defineProperty(_irregular_verbs, 'speak', {
  Participle: 'spoken'
}), _defineProperty(_irregular_verbs, 'speed', {
  Participle: 'sped'
}), _defineProperty(_irregular_verbs, 'spend', {
  Participle: 'spent'
}), _defineProperty(_irregular_verbs, 'spill', {
  Participle: 'spilled'
}), _defineProperty(_irregular_verbs, 'spin', {
  Participle: 'spun'
}), _defineProperty(_irregular_verbs, 'spit', {
  Participle: 'spat'
}), _defineProperty(_irregular_verbs, 'split', {
  Participle: 'split'
}), _defineProperty(_irregular_verbs, 'spread', {
  Participle: 'spread'
}), _defineProperty(_irregular_verbs, 'spring', {
  Participle: 'sprung'
}), _defineProperty(_irregular_verbs, 'stand', {
  Participle: 'stood'
}), _defineProperty(_irregular_verbs, 'steal', {
  Participle: 'stolen'
}), _defineProperty(_irregular_verbs, 'stick', {
  Participle: 'stuck'
}), _defineProperty(_irregular_verbs, 'sting', {
  Participle: 'stung'
}), _defineProperty(_irregular_verbs, 'stink', {
  Participle: 'stunk'
}), _defineProperty(_irregular_verbs, 'strew', {
  Participle: 'strewn'
}), _defineProperty(_irregular_verbs, 'strike', {
  Participle: 'struck'
}), _defineProperty(_irregular_verbs, 'sware', {
  Participle: 'sworn'
}), _defineProperty(_irregular_verbs, 'sweep', {
  Participle: 'swept'
}), _defineProperty(_irregular_verbs, 'swim', {
  Participle: 'swum'
}), _defineProperty(_irregular_verbs, 'swing', {
  Participle: 'swung'
}), _defineProperty(_irregular_verbs, 'take', {
  Participle: 'taken'
}), _defineProperty(_irregular_verbs, 'teach', {
  Participle: 'taught'
}), _defineProperty(_irregular_verbs, 'tear', {
  Participle: 'torn'
}), _defineProperty(_irregular_verbs, 'tell', {
  Participle: 'told'
}), _defineProperty(_irregular_verbs, 'think', {
  Participle: 'thought'
}), _defineProperty(_irregular_verbs, 'thrive', {
  Participle: 'thrived'
}), _defineProperty(_irregular_verbs, 'throw', {
  Participle: 'thrown'
}), _defineProperty(_irregular_verbs, 'undergo', {
  Participle: 'undergone'
}), _defineProperty(_irregular_verbs, 'understand', {
  Participle: 'understood'
}), _defineProperty(_irregular_verbs, 'upset', {
  Participle: 'upset'
}), _defineProperty(_irregular_verbs, 'wake', {
  Participle: 'woken'
}), _defineProperty(_irregular_verbs, 'wear', {
  Participle: 'worn'
}), _defineProperty(_irregular_verbs, 'weave', {
  Participle: 'woven'
}), _defineProperty(_irregular_verbs, 'weep', {
  Participle: 'wept'
}), _defineProperty(_irregular_verbs, 'win', {
  Participle: 'won'
}), _defineProperty(_irregular_verbs, 'wind', {
  Participle: 'wound'
}), _defineProperty(_irregular_verbs, 'withdraw', {
  Participle: 'withdrawn'
}), _defineProperty(_irregular_verbs, 'wring', {
  Participle: 'wrung'
}), _defineProperty(_irregular_verbs, 'write', {
  Participle: 'written'
}), _irregular_verbs);

module.exports = irregular_verbs;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/data/verbs/verbs.js":[function(_dereq_,module,exports){
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
  use: ',ca,over,ref,acc,am,pa,ho',
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
  ce: 'redu,produ,divor,fa,noti,for,repla',
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
var arr = ['hope', 'thank', 'work', 'stop', 'control', 'join', 'enjoy', 'fail', 'aid', 'ask', 'talk', 'add', 'walk', 'describe', 'study', 'seem', 'occur', 'claim', 'fix', 'help', 'design', 'include', 'need', 'keep', 'assume', 'accept', 'do', 'look', 'die', 'seek', 'attempt', 'bomb', 'cook', 'copy', 'claw', 'doubt', 'drift', 'envy', 'fold', 'flood', 'focus', 'lift', 'link', 'load', 'loan', 'melt', 'overlap', 'rub', 'repair', 'sail', 'sleep', 'trade', 'trap', 'travel', 'tune', 'undergo', 'undo', 'uplift', 'yawn', 'plan', 'reveal', 'owe', 'sneak', 'drop', 'name', 'head', 'spoil', 'echo', 'deny', 'yield', 'reason', 'defy', 'applaud', 'risk', 'step', 'deem', 'embody', 'adopt', 'convey', 'pop', 'grab', 'revel', 'stem', 'mark', 'drag', 'pour', 'reckon', 'assign', 'rank', 'destroy', 'float', 'appeal', 'grasp', 'shout', 'overcome', 'relax', 'excel', 'plug', 'proclaim', 'ruin', 'abandon', 'overwhelm', 'wipe', 'added', 'took', 'goes', 'avoid', 'come', 'set', 'pay', 'grow', 'get', 'instruct', 'know', 'take', 'let', 'sort', 'put', 'take', 'cut', 'become', 'reply', 'happen', 'watch', 'associate', 'send', 'archive', 'cancel', 'learn', 'transfer', 'minus', 'plus', 'multiply', 'divide', 'win'];

module.exports = fns.uncompress_suffixes(arr, compressed);

},{"../fns":"/home/spencer/mountain/nlp/nlp_compromise/src/data/fns.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/fns.js":[function(_dereq_,module,exports){
'use strict';
// typeof obj == "function" also works
// but not in older browsers. :-/

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.isFunction = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
};

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
  if (str && prefix) {
    if (str.substr(0, prefix.length) === prefix) {
      return true;
    }
  }
  return false;
};

exports.titleCase = function (str) {
  return str.replace(/^[a-z]/, function (x) {
    return x.toUpperCase();
  });
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

//shallow-merge an object
exports.extend = function (o, o2) {
  if (!o) {
    return o2;
  }
  if (!o2) {
    return o;
  }
  Object.keys(o2).forEach(function (k) {
    o[k] = o2[k];
  });
  return o;
};

//a very naaive inflector for
//our public-facing one is in ./terms/noun/info
exports.toPlural = function (str) {
  var irregular = {
    Glue: 'Glue'
  };
  if (irregular[str]) {
    return irregular[str];
  }
  if (str.match(/y$/i)) {
    return str.replace(/y$/i, 'ies');
  }
  if (str.match(/person$/i)) {
    return str.replace(/person$$/i, 'people');
  }
  if (str.match(/s$/i)) {
    return str;
  }
  return str + 's';
};

exports.values = function (obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
};
exports.sum = function (arr) {
  return arr.reduce(function (sum, i) {
    return sum + i;
  }, 0);
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/index.js":[function(_dereq_,module,exports){
'use strict';

var parse = _dereq_('./parse');

var nlp = function nlp(str, context) {
  return parse(str, context);
};

module.exports = nlp;

},{"./parse":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/logger/index.js":[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var chalk = _dereq_('chalk');
var fns = _dereq_('../fns');

var _enable = false;

module.exports = {
  enable: function enable(str) {
    _enable = str || true;
  },
  here: function here(path) {
    if (_enable === true || _enable === path) {
      console.log('  ' + chalk.yellow(chalk.underline(path)));
    }
  },
  tell: function tell(str, path) {
    if (_enable === true || _enable === path) {
      if ((typeof str === 'undefined' ? 'undefined' : _typeof(str)) === 'object') {
        str = JSON.stringify(str);
      }
      str = '    ' + chalk.magenta(str);
      console.log(str);
    }
  },
  tagAs: function tagAs(t, pos, reason) {
    if (_enable === true || _enable === 'tagger') {
      var title = t.normal || '[' + t.silent_term + ']';
      title = chalk.green(title);
      title = fns.leftPad('\'' + title + '\'', 20);
      title += '  ->   ' + chalk.red(pos);
      title = fns.leftPad(title, 54);
      console.log('       ' + title + '(' + (reason || '') + ')');
    }
  },
  match: function match(t, reason) {
    console.log('       ' + chalk.green('-match-') + '  \'' + chalk.red(t.normal) + '\'  -  ' + reason);
  },
  noMatch: function noMatch(t) {
    console.log('               ' + chalk.magenta('-die \'' + t.normal + '\''));
  }
};

},{"../fns":"/home/spencer/mountain/nlp/nlp_compromise/src/fns.js","chalk":"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/index.js":[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chalk = _dereq_('chalk');
var Terms = _dereq_('./terms');

//a result is an array of termLists

var Result = function () {
  function Result(arr) {
    _classCallCheck(this, Result);

    this.list = arr || [];
  }
  /** did it find anything? */


  _createClass(Result, [{
    key: 'found',
    get: function get() {
      return this.list.length > 0;
    }
  }]);

  return Result;
}();

//add methods to prototype


var methods = _dereq_('./methods');
Object.keys(methods).forEach(function (k) {
  Result = methods[k](Result);
});

/** do a regex-like search through terms and return a subset */
Result.prototype.match = function (reg, quiet) {
  var list = [];
  this.list.forEach(function (ts) {
    //an array of arrays
    var matches = ts.match(reg, quiet);
    matches.forEach(function (ms) {
      list.push(new Terms(ms));
    });
  });
  return new Result(list);
};
/** return terms after this match */
Result.prototype.after = function (reg) {
  var after = reg + ' *';
  return this.match(after).remove(reg);
};
/** return terms before this match */
Result.prototype.before = function (reg) {
  var before = '* ' + reg;
  return this.match(before).remove(reg);
};
/** like .match(), but negative (filter-out the matches)*/
Result.prototype.remove = function (reg) {
  var _this = this;

  var list = [];
  this.list.forEach(function (ts) {
    var matches = ts.remove(reg, _this.context);
    if (matches) {
      list.push(matches);
    }
  });
  return new Result(list, this.context);
};

module.exports = Result;

//apply methods
// require('./methods').addMethods(Result);

},{"./methods":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/methods/index.js","./terms":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/terms/index.js","chalk":"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/methods/generic.js":[function(_dereq_,module,exports){
'use strict';

var Term = _dereq_('../../term');
var Terms = _dereq_('../terms');

var genericMethods = function genericMethods(Result) {

  var methods = {
    /** how many results are there?*/
    count: function count() {
      return this.list.length;
    },

    /** get a flat array of all terms in every result*/
    terms: function terms() {
      return this.list.reduce(function (arr, ts) {
        return arr.concat(ts.terms);
      }, []);
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
        return new Terms(arr, _this.context);
      });
      return new Result(list, this.context);
    },
    /**use only the first result */
    first: function first(n) {
      if (!n && n !== 0) {
        return this.get(0);
      }
      return new Result(this.list.slice(0, n), this.context);
    },
    /**use only the last result */
    last: function last(n) {
      if (!n && n !== 0) {
        return this.get(this.list.length - 1);
      }
      var end = this.list.length;
      var start = end - n;
      return new Result(this.list.slice(start, end), this.context);
    },
    /** use only the nth result*/
    get: function get(n) {
      //return an empty result
      if (!n && n !== 0 || !this.list[n]) {
        return new Result([], this.context);
      }
      var ts = this.list[n];
      return new Result([ts], this.context);
    },

    /**copy data properly so later transformations will have no effect*/
    clone: function clone() {
      var list = this.list.map(function (ts) {
        return ts.clone();
      });
      return new Result(list);
    },

    /**turn all sentences into one, for example*/
    flatten: function flatten() {
      var list = this.list.reduce(function (all, ts) {
        all = all.concat(ts.terms);
        return all;
      }, []);
      var terms = new Terms(list);
      return new Result([terms], this.context);
    },
    /**tag all the terms in this result as something */
    tag: function tag(_tag, reason) {
      this.terms().forEach(function (t) {
        t.tagAs(_tag, reason);
      });
      return this;
    },
    /**remove a tag in all the terms in this result (that had it) */
    unTag: function unTag(tag, reason) {
      this.terms().forEach(function (t) {
        delete t.tag[tag];
      });
      return this;
    },
    /** filter-out all terms with this tag*/
    remove: function remove(tag) {
      var list = this.list.map(function (ts) {
        return ts.remove(tag);
      });
      return new Result(list, this.context);
    },

    replace: function replace(text) {
      this.list.forEach(function (ts) {
        ts.terms.forEach(function (t) {
          t.text = text;
        });
      });
      return this;
    }

  };

  Object.keys(methods).forEach(function (k) {
    Result.prototype[k] = methods[k];
  });
  return Result;
};

module.exports = genericMethods;

},{"../../term":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/index.js","../terms":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/terms/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/methods/index.js":[function(_dereq_,module,exports){
'use strict';

var genericMethods = _dereq_('./generic');
var valueMethods = _dereq_('./value');
var prettyPrint = _dereq_('./prettyPrint');

var methods = {
  generic: _dereq_('./generic'),
  value: _dereq_('./value'),
  prettyPrint: _dereq_('./prettyPrint')
};

module.exports = methods;

},{"./generic":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/methods/generic.js","./prettyPrint":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/methods/prettyPrint.js","./value":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/methods/value/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/methods/prettyPrint.js":[function(_dereq_,module,exports){
'use strict';

var chalk = _dereq_('chalk');

var prettyPrint = function prettyPrint(Result) {

  var methods = {

    check: function check() {
      this.list.forEach(function (ts, i) {
        console.log('--');
        ts.check();
      });
      return this;
    },

    plaintext: function plaintext() {
      return this.list.reduce(function (str, ts) {
        str += ts.plaintext();
        return str;
      }, '');
    },

    normal: function normal() {
      return this.list.reduce(function (str, ts) {
        str += ts.normal();
        return str;
      }, '');
    },

    phrases: function phrases() {
      this.list.forEach(function (ts) {
        var str = '';
        ts.terms.forEach(function (t) {
          var text = t.plaintext();
          if (t.tag.NounPhrase) {
            str += chalk.cyan(text);
            return;
          }
          if (t.tag.VerbPhrase) {
            str += chalk.red(text);
            return;
          }
          if (t.tag.AdjectivePhrase) {
            str += chalk.magenta(text);
            return;
          }
          str += text;
        });
        console.log('\n' + str);
      });
    }
  };
  Object.keys(methods).forEach(function (k) {
    Result.prototype[k] = methods[k];
  });
  return Result;
};

module.exports = prettyPrint;

},{"chalk":"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/methods/value/index.js":[function(_dereq_,module,exports){
'use strict';

var methods = {
  toNumber: function toNumber() {
    this.terms().forEach(function (t) {
      if (t.tag.Value) {
        t.to('number');
      }
    });
    return this;
  },
  toCardinal: function toCardinal() {
    this.terms().forEach(function (t) {
      if (t.tag.Value) {
        t.to('cardinal');
      }
    });
    return this;
  },
  toOrdinal: function toOrdinal() {
    this.terms().forEach(function (t) {
      if (t.tag.Value) {
        t.to('ordinal');
      }
    });
    return this;
  }
};

module.exports = function (Result) {
  Object.keys(methods).forEach(function (k) {
    Result.prototype[k] = methods[k];
  });
  return Result;
};

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/paths.js":[function(_dereq_,module,exports){
'use strict';

module.exports = {
  fns: _dereq_('../../fns'),
  log: _dereq_('../../logger')
};

},{"../../fns":"/home/spencer/mountain/nlp/nlp_compromise/src/fns.js","../../logger":"/home/spencer/mountain/nlp/nlp_compromise/src/logger/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/terms/index.js":[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var paths = _dereq_('../paths');
var log = paths.log;
var fns = paths.fns;
var Term = _dereq_('../../term');
var match = _dereq_('./match');

var Terms = function () {
  function Terms(arr, context) {
    var _this = this;

    _classCallCheck(this, Terms);

    this.terms = arr;
    this.context = context || {};
    this.get = function (n) {
      return _this.terms[n];
    };
    // this.terms = this.arr;
  }

  _createClass(Terms, [{
    key: 'term',
    value: function term(n) {
      return this.terms[n];
    }
  }, {
    key: 'forEach',
    value: function forEach(fn) {
      this.terms.forEach(fn);
      return this;
    }
  }, {
    key: 'plaintext',
    value: function plaintext() {
      return this.terms.reduce(function (str, t) {
        str += t.plaintext();
        return str;
      }, '');
    }
  }, {
    key: 'normal',
    value: function normal() {
      return this.terms.map(function (t) {
        return t.normal;
      }).join(' ');
    }
  }, {
    key: 'remove',
    value: function remove(tag) {
      this.terms = this.terms.filter(function (t) {
        return !t[tag];
      });
      return this;
    }
  }, {
    key: 'check',
    value: function check() {
      this.terms.forEach(function (t) {
        t.render('check');
      });
    }
  }, {
    key: 'insertAt',
    value: function insertAt(text, i) {
      var term = new Term(text, this.context);
      this.terms.splice(i + 1, 0, term);
      return this;
    }
  }, {
    key: 'length',
    get: function get() {
      return this.terms.length;
    }
  }]);

  return Terms;
}();
//some other methods


Terms.prototype.clone = function () {
  var terms = this.terms.map(function (t) {
    return t.clone();
  });
  return new Terms(terms, this.context);
};

Terms.prototype.match = function (reg, quiet) {
  return match(this, reg, quiet); //returns an array of matches
};
Terms.prototype.remove = function (reg) {
  var matchTerms = match(this, reg);
  matchTerms = fns.flatten(matchTerms);
  var terms = this.terms.filter(function (t) {
    for (var i = 0; i < matchTerms.length; i++) {
      if (t === matchTerms[i]) {
        return false;
      }
    }
    return true;
  });
  return new Terms(terms, this.context);
};
module.exports = Terms;

},{"../../term":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/index.js","../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/paths.js","./match":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/terms/match/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/terms/match/fullMatch.js":[function(_dereq_,module,exports){
'use strict';

var paths = _dereq_('../../paths');
var log = paths.log;
var fns = paths.fns;
var path = 'match';

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
    if (term.normal === reg.normal || term.text === reg.normal) {
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
var fullMatch = function fullMatch(term, reg) {
  var found = perfectMatch(term, reg);
  if (reg.negative) {
    found = !!!found;
  }
  return found;
};

module.exports = fullMatch;

},{"../../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/terms/match/index.js":[function(_dereq_,module,exports){
'use strict';
//

var syntax = _dereq_('./syntax');
var log = _dereq_('../../paths').log;
var startHere = _dereq_('./startHere');
var path = 'match';

//main event
var match = function match(ts, str, quiet) {
  if (!quiet) {
    log.here(path);
  }
  var matches = [];
  //fail fast
  if (!str || !ts) {
    return matches;
  }
  var regs = syntax(str);
  if (!quiet) {
    log.tell(regs);
  }
  for (var t = 0; t < ts.terms.length; t++) {
    //don't loop through if '^'
    if (regs[0] && regs[0].starting && t > 0) {
      break;
    }
    var m = startHere(ts, t, regs);
    if (m) {
      matches.push(m);
      //ok, don't try to match these again.
      var skip = m.length - 1;
      t += skip; //this could use some work
    }
  }
  return matches;
};

module.exports = match;

},{"../../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/paths.js","./startHere":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/terms/match/startHere.js","./syntax":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/terms/match/syntax.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/terms/match/lumpMatch.js":[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../../paths').fns;

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

},{"../../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/terms/match/startHere.js":[function(_dereq_,module,exports){
'use strict';

var fullMatch = _dereq_('./fullMatch');
var lumpMatch = _dereq_('./lumpMatch');

// match everything until this point - '*'
var greedyUntil = function greedyUntil(terms, i, reg) {
  for (i = i; i < terms.length; i++) {
    if (fullMatch(terms.get(i), reg)) {
      return i;
    }
  }
  return null;
};

//keep matching this reg as long as possible
var greedyOf = function greedyOf(terms, i, reg) {
  for (i = i; i < terms.length; i++) {
    if (!fullMatch(terms.get(i), reg)) {
      return i;
    }
  }
  return i;
};

//try and match all regs, starting at this term
var startHere = function startHere(ts, startAt, regs) {
  var term_i = startAt;
  //check each regex-thing
  for (var reg_i = 0; reg_i < regs.length; reg_i++) {
    var term = ts.get(term_i);
    var reg = regs[reg_i];
    if (!term) {
      //we didn't need it anyways
      if (reg.optional) {
        continue;
      }
      // console.log(chalk.red('   -dead-end '));
      return null;
    }
    //catch '^' errors
    if (reg.starting && term_i > 0) {
      return null;
    }
    //catch '$' errors
    if (reg.ending && term_i !== ts.length - 1) {
      return null;
    }
    //support '*'
    if (regs[reg_i].greedy) {
      var next_reg = regs[reg_i + 1];
      //easy, just return rest of sentence
      if (!next_reg) {
        return ts.terms.slice(startAt, ts.length);
      }
      //otherwise, match until this next thing
      if (next_reg) {
        var foundAt = greedyUntil(ts, term_i, next_reg);
        //didn't find it
        if (!foundAt) {
          return null;
        }
        //continue it further-down place
        term_i = foundAt + 1;
        reg_i += 1;
        continue;
      }
    }
    //check a perfect match
    if (fullMatch(term, reg)) {
      term_i += 1;
      //try to greedy-match '+'
      if (reg.consecutive) {
        term_i = greedyOf(ts, term_i, reg);
      }
      // let soFar = ts.terms.slice(startAt, term_i).plaintext();
      // log.tell(soFar + '..', path);
      continue;
    }
    //handle partial-matches of lumped terms
    var lumpUntil = lumpMatch(term, regs, reg_i);
    if (lumpUntil) {
      reg_i = lumpUntil;
      term_i += 1;
      continue;
    }
    //skip over silent contraction terms
    if (term.silent_term && !term.normal) {
      //try the next term, but with this regex again
      term_i += 1;
      reg_i -= 1;
      continue;
    }
    //was it optional anways?
    if (reg.optional) {
      continue;
    }
    // console.log(chalk.red('   -dead: ' + terms.get(term_i).normal));
    return null;
  }
  return ts.terms.slice(startAt, term_i);
};

module.exports = startHere;

},{"./fullMatch":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/terms/match/fullMatch.js","./lumpMatch":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/terms/match/lumpMatch.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/terms/match/syntax.js":[function(_dereq_,module,exports){
'use strict';
// parse a search lookup term find the regex-like syntax in this term

var fns = _dereq_('../../paths').fns;

//turn 'regex-like' search string into parsed json
var parse_term = function parse_term(term, i) {
  term = term || '';
  term = term.trim();
  var reg = {};
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
    reg.optional = false;
    reg.consecutive = true;
  }

  //pos flag
  if (fns.startsWith(term, '#')) {
    term = term.replace(/^\#/, '');
    reg.tag = term.split(/\|/g).map(function (str) {
      return fns.titleCase(str);
    });
    term = null;
  }
  //one_of options flag
  if (fns.startsWith(term, '(') && fns.endsWith(term, ')')) {
    term = term.replace(/\)$/, '');
    term = term.replace(/^\(/, '');
    reg.oneOf = term.split(/\|/g).map(function (str) {
      return str.toLowerCase();
    });
    term = null;
  }
  //alias flag
  if (fns.startsWith(term, '~')) {
    term = term.replace(/^\~/, '');
    term = term.replace(/\~$/, '');
    reg.alias = true;
  }
  //addition flag
  if (fns.startsWith(term, '+')) {
    term = term.replace(/^\+/, '');
    term = term.replace(/\+$/, '');
    reg.extra = true;
  }

  //a period means any one term
  if (term === '.') {
    reg.anyOne = true;
    term = null;
  }
  //a * means anything until sentence end
  if (term === '*') {
    reg.greedy = true;
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
  reg = reg.split(/ +/);
  return reg.map(parse_term);
};
// console.log(parse_all(''));

module.exports = parse_all;

},{"../../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/helpers.js":[function(_dereq_,module,exports){
'use strict';

var Term = _dereq_('./index');
var fns = _dereq_('../../fns');

module.exports = {
  makeTerm: function makeTerm(str, t) {
    var c = fns.copy(t.context);
    var index = t.info('index');
    var s = t.context.parent;

    var term = new Term(str, c);
    //create the proper whitespace for this term
    if (index === s.arr.length - 1) {
      term.whitespace.before = ' ';
    } else {
      term.whitespace.before = ' ';
    }
    return term;
  }
};

},{"../../fns":"/home/spencer/mountain/nlp/nlp_compromise/src/fns.js","./index":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/index.js":[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var set_tag = _dereq_('./tag').set_tag;
var normalize = _dereq_('./normalize');
var fns = _dereq_('../../fns');
var build_whitespace = _dereq_('./whitespace');

var methods = _dereq_('./methods');
methods.render = _dereq_('./render');

var Term = function () {
  function Term(str, context) {
    _classCallCheck(this, Term);

    this.text = fns.ensureString(str);
    this.context = fns.ensureObject(context);
    this.tag = {};
    this.whitespace = build_whitespace(str || '');
    this._text = this.text.trim();
    // this.endPunct = this.endPunctuation();
    this.normal = normalize(this.text);
    this.silent_term = '';
    this.helpers = _dereq_('./helpers');
  }

  _createClass(Term, [{
    key: 'endPunctuation',


    /** the comma, period ... punctuation that ends this sentence */
    value: function endPunctuation() {
      var m = this.text.match(/([\.\?\!,;:])$/);
      if (m) {
        //remove it from end of text
        // this.text = this.text.substr(0, this.text.length - 1);
        return m[0];
      }
      return '';
    }

    /** print-out this text, as it was given */

  }, {
    key: 'plaintext',
    value: function plaintext() {
      var str = this.whitespace.before + this.text + this.whitespace.after;
      return str;
    }

    /** delete this term from its sentence */

  }, {
    key: 'remove',
    value: function remove() {
      var s = this.context.parent;
      var index = this.info('index');
      s.arr.splice(index, 1);
      return s;
    }

    /** queries about this term with true or false answer */

  }, {
    key: 'is',
    value: function is(str) {
      if (this.tag[str]) {
        return true;
      }
      str = str.toLowerCase();
      if (methods.is[str]) {
        return methods.is[str](this);
      }
      return false;
    }

    /** fetch ad-hoc information about this term */

  }, {
    key: 'info',
    value: function info(str) {
      str = str.toLowerCase();
      if (methods.info[str]) {
        return methods.info[str](this);
      } else {
        // console.log('missing \'info\' method ' + str);
      }
      return null;
    }

    /** find other terms related to this */

  }, {
    key: 'pluck',
    value: function pluck(str) {
      str = str.toLowerCase();
      if (methods.pluck[str]) {
        return methods.pluck[str](this);
      } else {
        console.warn('missing \'pluck\' method ' + str);
      }
      return null;
    }

    /** methods that change this term */

  }, {
    key: 'to',
    value: function to(str) {
      str = str.toLowerCase();
      if (methods.transform[str]) {
        return methods.transform[str](this);
      } else {
        console.warn('missing \'to\' method ' + str);
      }
      return null;
    }

    /** methods that change this term */

  }, {
    key: 'render',
    value: function render(str) {
      str = str.toLowerCase();
      if (methods.render[str]) {
        return methods.render[str](this);
      } else {
        console.warn('missing \'render\' method ' + str);
      }
      return null;
    }

    /** set the term as this part-of-speech */

  }, {
    key: 'tagAs',
    value: function tagAs(tag, reason) {
      set_tag(this, tag, reason);
    }

    /** get a list of words to the left of this one, in reversed order */

  }, {
    key: 'before',
    value: function before(n) {
      var terms = this.context.parent.arr;
      //get terms before this
      var index = this.info('index');
      terms = terms.slice(0, index);
      //reverse them
      var reversed = [];
      var len = terms.length;
      for (var i = len - 1; i !== 0; i--) {
        reversed.push(terms[i]);
      }
      var end = terms.length;
      if (n) {
        end = n;
      }
      return reversed.slice(0, end);
    }

    /** get a list of words to the right of this one */

  }, {
    key: 'after',
    value: function after(n) {
      var terms = this.context.parent.arr;
      var i = this.info('index') + 1;
      var end = terms.length - 1;
      if (n) {
        end = i + n;
      }
      return terms.slice(i, end);
    }
  }, {
    key: 'next',
    value: function next() {
      var terms = this.context.parent.arr;
      var i = this.info('index') + 1;
      return terms[i];
    }

    /** add a word before this one*/

  }, {
    key: 'append',
    value: function append(str) {
      var term = this.helpers.makeTerm(str, this);
      var index = this.info('Index');
      var s = this.context.parent;
      s.arr.splice(index, 0, term);
      return s;
    }
    /** add a new word after this one*/

  }, {
    key: 'prepend',
    value: function prepend(str) {
      var term = this.helpers.makeTerm(str, this);
      var index = this.info('Index');
      var s = this.context.parent;
      s.arr.splice(index + 1, 0, term);
      return s;
    }
    /** replace this word with a new one*/

  }, {
    key: 'replace',
    value: function replace(str) {
      var c = fns.copy(this.context);
      var term = new Term(str, c);
      term.whitespace.before = this.whitespace.before;
      term.whitespace.after = this.whitespace.after;
      term.endPunct = this.endPunct;
      var index = this.info('Index');
      var s = this.context.parent;
      s.arr[index] = term;
      return s;
    }

    /** make a copy with no references to the original  */

  }, {
    key: 'clone',
    value: function clone() {
      var c = fns.copy(this.context);
      var term = new Term(this.text, c);
      term.tag = fns.copy(this.tag);
      term.whitespace = fns.copy(this.whitespace);
      term.silent_term = this.silent_term;
      term.endPunct = this.endPunct;
      return term;
    }
  }, {
    key: 'text',
    set: function set(str) {
      this._text = str.trim();
      if (this._text !== str) {
        this.whitespace = build_whitespace(str);
      }
      // this.endPunct = this.endPunctuation();
      this.normal = normalize(this.text);
    },
    get: function get() {
      return this._text;
    }
  }]);

  return Term;
}();

module.exports = Term;

},{"../../fns":"/home/spencer/mountain/nlp/nlp_compromise/src/fns.js","./helpers":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/helpers.js","./methods":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/index.js","./normalize":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/normalize.js","./render":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/render/index.js","./tag":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/tag.js","./whitespace":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/whitespace.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/index.js":[function(_dereq_,module,exports){
'use strict';
//

var adjective = {
  info: _dereq_('./info'),
  is: _dereq_('./is'),
  pluck: _dereq_('./pluck'),
  transform: _dereq_('./transform')
};

module.exports = adjective;

},{"./info":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/info/index.js","./is":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/is/index.js","./pluck":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/pluck/index.js","./transform":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/transform/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/info/index.js":[function(_dereq_,module,exports){
'use strict';

var toAdverb = _dereq_('./toAdverb');
var toNoun = _dereq_('./toNoun');
var toComparative = _dereq_('./toComparative');
var toSuperlative = _dereq_('./toSuperlative');

var info = {
  adverbform: function adverbform(t) {
    return toAdverb(t.normal);
  },
  nounform: function nounform(t) {
    return toNoun(t.normal);
  },
  comparative: function comparative(t) {
    return toComparative(t.normal);
  },
  superlative: function superlative(t) {
    return toSuperlative(t.normal);
  },
  adjconjugations: function adjconjugations(t) {
    return {
      Adverb: t.info('adverbForm'),
      Noun: t.info('nounForm'),
      Comparative: t.info('comparative'),
      Superlative: t.info('superlative')
    };
  }
};
module.exports = info;

},{"./toAdverb":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/info/toAdverb.js","./toComparative":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/info/toComparative.js","./toNoun":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/info/toNoun.js","./toSuperlative":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/info/toSuperlative.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/info/toAdverb.js":[function(_dereq_,module,exports){
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/info/toComparative.js":[function(_dereq_,module,exports){
//turn 'quick' into 'quickly'
'use strict';

var convertables = _dereq_('../paths').data.superlatives;

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

  if (convertables.indexOf(str) !== -1) {
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

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/info/toNoun.js":[function(_dereq_,module,exports){
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/info/toSuperlative.js":[function(_dereq_,module,exports){
//turn 'quick' into 'quickest'
'use strict';

var convertables = _dereq_('../paths').data.superlatives;

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

  if (convertables.indexOf(str) !== -1) {
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

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/is/index.js":[function(_dereq_,module,exports){
'use strict';

var is = {};
module.exports = is;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/paths.js":[function(_dereq_,module,exports){
'use strict';

module.exports = _dereq_('../paths');

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/pluck/index.js":[function(_dereq_,module,exports){
'use strict';
//grab the terms related to this term

var pluck = {};
module.exports = pluck;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/transform/index.js":[function(_dereq_,module,exports){
'use strict';

var transform = {};
module.exports = transform;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adverb/index.js":[function(_dereq_,module,exports){
'use strict';
//

var adverb = {
  info: _dereq_('./info'),
  is: _dereq_('./is'),
  pluck: _dereq_('./pluck'),
  transform: _dereq_('./transform')
};

module.exports = adverb;

},{"./info":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adverb/info/index.js","./is":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adverb/is/index.js","./pluck":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adverb/pluck/index.js","./transform":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adverb/transform/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adverb/info/index.js":[function(_dereq_,module,exports){
'use strict';

var toAdjective = _dereq_('./toAdjective');
var info = {
  adjectiveForm: function adjectiveForm(t) {
    return toAdjective(t.normal);
  }
};
module.exports = info;

},{"./toAdjective":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adverb/info/toAdjective.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adverb/info/toAdjective.js":[function(_dereq_,module,exports){
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adverb/is/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/is/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adverb/pluck/index.js":[function(_dereq_,module,exports){
'use strict';
//grab the terms related to this term

var pluck = {
  target: function target(t) {
    // let before = t.before(3);
    var after = t.after(3);
    // console.log(after);
    // let len = before.length;
    return null;
  }
};
module.exports = pluck;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adverb/transform/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/transform/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/date/index.js":[function(_dereq_,module,exports){
'use strict';
//

var date = {
  info: _dereq_('./info'),
  is: _dereq_('./is'),
  pluck: _dereq_('./pluck'),
  transform: _dereq_('./transform')
};

module.exports = date;

},{"./info":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/date/info/index.js","./is":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/date/is/index.js","./pluck":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/date/pluck/index.js","./transform":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/date/transform/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/date/info/index.js":[function(_dereq_,module,exports){
'use strict';

var info = {};
module.exports = info;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/date/is/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/is/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/date/pluck/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/pluck/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/date/transform/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/transform/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/filters.js":[function(_dereq_,module,exports){
'use strict';
// const tags = require('../../tags');

var fns = _dereq_('./paths').fns;
var terms = _dereq_('./terms');

//collect all methods that reduce a termlist, etc
var all = {};
// //each POS tag is a filter method
// Object.keys(tags).forEach((k) => {
//   let method = fns.toPlural(k).toLowerCase();
//   all[method] = (ts) => {
//     return ts.filter((t) => {
//       return t.tag[k];
//     });
//   };
// });

//each 'is' method is a filter
Object.keys(terms).forEach(function (term) {
  Object.keys(terms[term].is).forEach(function (k) {
    var method = fns.toPlural(k);
    all[method] = function (ts) {
      return ts.filter(function (t) {
        return t.is(k);
      });
    };
  });
});

module.exports = all;

},{"./paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/paths.js","./terms":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/terms.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/index.js":[function(_dereq_,module,exports){
'use strict';

var terms = _dereq_('./terms');

var reduce_methods = function reduce_methods(k) {
  var methods = {};
  Object.keys(terms).forEach(function (t) {
    Object.keys(terms[t][k]).forEach(function (method) {
      methods[method] = terms[t][k][method];
    });
  });
  return methods;
};

var methods = {
  //individual term methods
  is: reduce_methods('is'),
  info: reduce_methods('info'),
  transform: reduce_methods('transform'),
  pluck: reduce_methods('pluck'),
  //termlist methods
  filters: _dereq_('./filters'),
  infos: _dereq_('./infos'),
  transforms: _dereq_('./transforms')
};
module.exports = methods;

},{"./filters":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/filters.js","./infos":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/infos.js","./terms":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/terms.js","./transforms":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/transforms.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/infos.js":[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('./paths').fns;
var terms = _dereq_('./terms');

//collect all info methods for a termslist
var all = {};
Object.keys(terms).forEach(function (k) {
  var tag = fns.titleCase(k);
  Object.keys(terms[k].info).forEach(function (method) {
    all[method] = function (ts) {
      return ts.map(function (t) {
        //null, if it doesn't apply
        if (!t.tag[tag]) {
          return null;
        }
        return t.info(method);
      });
    };
  });
});
module.exports = all;

},{"./paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/paths.js","./terms":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/terms.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/index.js":[function(_dereq_,module,exports){
'use strict';
//

var noun = {
  info: _dereq_('./info'),
  is: _dereq_('./is'),
  pluck: _dereq_('./pluck'),
  transform: _dereq_('./transform')
};

module.exports = noun;

},{"./info":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/info/index.js","./is":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/is/index.js","./pluck":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/pluck/index.js","./transform":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/transform/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/info/article.js":[function(_dereq_,module,exports){
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

var indefinite_article = function indefinite_article(t) {
  var str = t.normal;

  //explicit irregular forms
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  //spelled-out acronyms
  if (t.info('is_acronym') && an_acronyms.hasOwnProperty(str.substr(0, 1))) {
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/info/hasPlural.js":[function(_dereq_,module,exports){
'use strict';

var uncountables = _dereq_('../../paths').data.uncountables;

//certain words can't be plural, like 'peace'
var hasPlural = function hasPlural(t) {
  var str = t.normal;
  for (var i = 0; i < uncountables.length; i++) {
    if (str === uncountables[i]) {
      return false;
    }
  }
  return true;
};

module.exports = hasPlural;

},{"../../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/info/index.js":[function(_dereq_,module,exports){
'use strict';

var hasPlural = _dereq_('./hasPlural');
var _article = _dereq_('./article');
var toPlural = _dereq_('./inflect/toPlural');
var toSingle = _dereq_('./inflect/toSingle');

var info = {

  /** can this word become a plural? Some words like 'peace' cannot.*/
  hasplural: function hasplural(t) {
    return hasPlural(t);
  },
  /** whether to use a/an/this/those */
  article: function article(t) {
    return _article(t);
  },
  /** inflect/pluralize a word like 'shoe' into 'shoes' */
  plural: function plural(t) {
    if (t.info('hasPlural') && !t.is('Plural')) {
      return toPlural(t.normal);
    }
    return t.normal;
  },
  /** inflect/pluralize a word like 'shoe' into 'shoes' */
  singular: function singular(t) {
    if (t.info('hasPlural') && t.is('Plural')) {
      return toSingle(t.normal);
    }
    return t.normal;
  }
};
module.exports = info;

},{"./article":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/info/article.js","./hasPlural":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/info/hasPlural.js","./inflect/toPlural":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/info/inflect/toPlural.js","./inflect/toSingle":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/info/inflect/toSingle.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/info/inflect/data/pluralRules.js":[function(_dereq_,module,exports){
'use strict';

//patterns for turning 'bus' to 'buses'
module.exports = [[/(ax|test)is$/i, '$1es'], [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i'], [/(octop|vir)i$/i, '$1i'], [/(kn|l|w)ife$/i, '$1ives'], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)f$/i, '$1ves'], [/^(dwar|handkerchie|hoo|scar|whar)f$/i, '$1ves'], [/(alias|status)$/i, '$1es'], [/(bu)s$/i, '$1ses'], [/(al|ad|at|er|et|ed|ad)o$/i, '$1oes'], [/([ti])um$/i, '$1a'], [/([ti])a$/i, '$1a'], [/sis$/i, 'ses'], [/(hive)$/i, '$1s'], [/([^aeiouy]|qu)y$/i, '$1ies'], [/(x|ch|ss|sh|s|z)$/i, '$1es'], [/(matr|vert|ind|cort)(ix|ex)$/i, '$1ices'], [/([m|l])ouse$/i, '$1ice'], [/([m|l])ice$/i, '$1ice'], [/^(ox)$/i, '$1en'], [/^(oxen)$/i, '$1'], [/(quiz)$/i, '$1zes'], [/(antenn|formul|nebul|vertebr|vit)a$/i, '$1ae'], [/(sis)$/i, 'ses'], [/^(?!talis|.*hu)(.*)man$/i, '$1men'], [/(.*)/i, '$1s']].map(function (a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/info/inflect/data/singleRules.js":[function(_dereq_,module,exports){
'use strict';

//patterns for turning 'dwarves' to 'dwarf'
module.exports = [[/([^v])ies$/i, '$1y'], [/ises$/i, 'isis'], [/(kn|[^o]l|w)ives$/i, '$1ife'], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)ves$/i, '$1f'], [/^(dwar|handkerchie|hoo|scar|whar)ves$/i, '$1f'], [/(antenn|formul|nebul|vertebr|vit)ae$/i, '$1a'], [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, '$1us'], [/(buffal|tomat|tornad)(oes)$/i, '$1o'], [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1sis'], [/(vert|ind|cort)(ices)$/i, '$1ex'], [/(matr|append)(ices)$/i, '$1ix'], [/(x|ch|ss|sh|s|z|o)es$/i, '$1'], [/men$/i, 'man'], [/(n)ews$/i, '$1ews'], [/([ti])a$/i, '$1um'], [/([^aeiouy]|qu)ies$/i, '$1y'], [/(s)eries$/i, '$1eries'], [/(m)ovies$/i, '$1ovie'], [/([m|l])ice$/i, '$1ouse'], [/(cris|ax|test)es$/i, '$1is'], [/(alias|status)es$/i, '$1'], [/(ss)$/i, '$1'], [/(ics)$/i, '$1'], [/s$/i, '']].map(function (a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/info/inflect/toPlural.js":[function(_dereq_,module,exports){
'use strict';

var irregulars = _dereq_('../../paths').data.irregular_plurals.toPlural;
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

},{"../../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/paths.js","./data/pluralRules":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/info/inflect/data/pluralRules.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/info/inflect/toSingle.js":[function(_dereq_,module,exports){
'use strict';

var irregulars = _dereq_('../../paths').data.irregular_plurals.toSingle;
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

},{"../../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/paths.js","./data/singleRules":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/info/inflect/data/singleRules.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/is/index.js":[function(_dereq_,module,exports){
'use strict';

var isPlural = _dereq_('./isPlural');
var is = {
  /** is this term currently plural */
  plural: function plural(t) {
    return isPlural(t);
  },
  /** is this term currently not-plural */
  singular: function singular(t) {
    return !isPlural(t);
  }
};
module.exports = is;

},{"./isPlural":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/is/isPlural.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/is/isPlural.js":[function(_dereq_,module,exports){
'use strict';

var irregulars = _dereq_('../../paths').data.irregular_plurals;
var rules = _dereq_('./rules');

//first, try to guess based on existing tags
var couldEvenBePlural = function couldEvenBePlural(t) {
  if (t.tag.Person || t.tag.Value || t.tag.Organization || t.tag.Date) {
    return false;
  }
  return true;
};

var is_plural = function is_plural(t) {
  var str = t.normal;
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

module.exports = is_plural;

},{"../../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/paths.js","./rules":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/is/rules.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/is/rules.js":[function(_dereq_,module,exports){
'use strict';
//similar to plural/singularize rules, but not the same

var plural_indicators = [/(^v)ies$/i, /ises$/i, /ives$/i, /(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /(buffal|tomat|tornad)oes$/i, /(analy|ba|diagno|parenthe|progno|synop|the)ses$/i, /(vert|ind|cort)ices$/i, /(matr|append)ices$/i, /(x|ch|ss|sh|s|z|o)es$/i, /men$/i, /news$/i, /.tia$/i, /(^f)ves$/i, /(lr)ves$/i, /(^aeiouy|qu)ies$/i, /(m|l)ice$/i, /(cris|ax|test)es$/i, /(alias|status)es$/i, /ics$/i];

//similar to plural/singularize rules, but not the same
var singular_indicators = [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i];
module.exports = {
  singular_indicators: singular_indicators,
  plural_indicators: plural_indicators
};

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/paths.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/paths.js"][0].apply(exports,arguments)
},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/pluck/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/pluck/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/transform/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/transform/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/paths.js":[function(_dereq_,module,exports){
'use strict';

module.exports = {
  data: _dereq_('../../../data'),
  fns: _dereq_('../../../fns'),
  log: _dereq_('../../../logger')
};

},{"../../../data":"/home/spencer/mountain/nlp/nlp_compromise/src/data/index.js","../../../fns":"/home/spencer/mountain/nlp/nlp_compromise/src/fns.js","../../../logger":"/home/spencer/mountain/nlp/nlp_compromise/src/logger/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/index.js":[function(_dereq_,module,exports){
'use strict';
//

var person = {
  info: _dereq_('./info'),
  is: _dereq_('./is'),
  pluck: _dereq_('./pluck'),
  transform: _dereq_('./transform')
};

module.exports = person;

},{"./info":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/info/index.js","./is":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/is/index.js","./pluck":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/pluck/index.js","./transform":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/transform/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/info/gender.js":[function(_dereq_,module,exports){
'use strict';

var firstnames = _dereq_('../paths').data.firstnames;
// make a statistical assumption about the gender of the person based on their given name
// used for pronoun resolution only.
// not intended for classification, or discrimination of people.
var gender = function gender(t) {
  var o = t.info('parsedName');
  var firstName = o.firstName;
  if (!firstName) {
    return null;
  }
  if (firstnames[firstName] === 'MalePerson') {
    return 'Male';
  }
  if (firstnames[firstName] === 'FemalePerson') {
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

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/info/index.js":[function(_dereq_,module,exports){
'use strict';

var parseName = _dereq_('./parseName');
var gender = _dereq_('./gender');

var info = {
  parsedName: function (_parsedName) {
    function parsedName(_x) {
      return _parsedName.apply(this, arguments);
    }

    parsedName.toString = function () {
      return _parsedName.toString();
    };

    return parsedName;
  }(function (t) {
    return parsedName(t);
  }),
  gender: function gender(t) {
    return parsedName(t);
  }
};
module.exports = info;

},{"./gender":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/info/gender.js","./parseName":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/info/parseName.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/info/parseName.js":[function(_dereq_,module,exports){
'use strict';

var data = _dereq_('../paths').data;
var firstnames = data.firstnames;
var honourifics = Object.keys(data.abbreviations).reduce(function (h, k) {
  if (data.abbreviations[k] === 'Honourific') {
    h[k] = true;
  }
  return h;
}, {});

//str is a normalized string
//str_orig is original text [optional]
var parseName = function parseName(str, str_orig) {

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

module.exports = parseName;

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/is/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/is/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/paths.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/paths.js"][0].apply(exports,arguments)
},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/pluck/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/pluck/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/transform/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/transform/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/place/index.js":[function(_dereq_,module,exports){
'use strict';
//

var place = {
  info: _dereq_('./info'),
  is: _dereq_('./is'),
  pluck: _dereq_('./pluck'),
  transform: _dereq_('./transform')
};

module.exports = place;

},{"./info":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/place/info/index.js","./is":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/place/is/index.js","./pluck":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/place/pluck/index.js","./transform":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/place/transform/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/place/info/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/date/info/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/place/is/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/is/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/place/pluck/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/pluck/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/place/transform/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/transform/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/index.js":[function(_dereq_,module,exports){
'use strict';
//

var term = {
  info: _dereq_('./info'),
  is: _dereq_('./is'),
  render: _dereq_('./render'),
  pluck: _dereq_('./pluck'),
  transform: _dereq_('./transform')
};

module.exports = term;

},{"./info":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/info/index.js","./is":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/is/index.js","./pluck":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/pluck/index.js","./render":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/render/index.js","./transform":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/transform/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/info/index.js":[function(_dereq_,module,exports){
'use strict';
// const normalize = require('./normalize');

var info = {

  /* normalize punctuation, whitespace & case */
  normalized: function normalized(t) {
    return t.normal;
  },

  /** the punctuation at the end of this term*/
  endpunctuation: function endpunctuation(t) {
    var m = t.text.match(/[a-z]([,:;\/.(\.\.\.)\!\?]+)$/i);
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
        return allowed[m[1]];
      }
    }
    return null;
  },

  /** interpret a term's hyphenation */
  hyphenation: function hyphenation(t) {
    var m = t.normal.match(/^([a-z]+)-([a-z]+)$/);
    if (m && m[1] && m[2]) {
      return {
        start: m[1],
        end: m[2]
      };
    }
    return null;
  },

  /** interpret a terms' contraction */
  contraction: function contraction(t) {
    var allowed = {
      'll': true,
      't': true,
      's': true,
      'd': true,
      'm': true
    };
    var parts = t.normal.match(/^([a-z]+)'([a-z][a-z]?)$/);
    if (parts && parts[1] && allowed[parts[2]]) {
      //handle n't
      if (parts[2] === 't' && parts[1].match(/[a-z]n$/)) {
        parts[1] = parts[1].replace(/n$/, '');
        parts[2] = 'n\'t'; //dunno..
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
  },

  /** check if the term ends with a comma */
  hascomma: function hascomma(t) {
    if (t.info('endPunctuation') === 'comma') {
      return true;
    }
    return false;
  },

  /** where in the sentence is it? zero-based. */
  index: function index(t) {
    var terms = t.context.parent.arr;
    for (var i = 0; i < terms.length; i++) {
      if (terms[i] === t) {
        return i;
      }
    }
    return null;
  }
};

module.exports = info;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/is/index.js":[function(_dereq_,module,exports){
'use strict';
//true/false methods for all Terms

var term = {

  /** is this the first term in the sentence? */
  first: function first(t) {
    var index = t.index();
    if (index === 0) {
      return true;
    }
    return false;
  },

  /** is this the last term in the sentence? */
  last: function last(t) {
    var index = t.index();
    if (index === t.context.parent.arr.length - 1) {
      return true;
    }
    return false;
  },

  /** check if the text has one capital letter, the first one */
  titlecase: function titlecase(t) {
    if (t.text.match(/^[A-Z][a-z]/)) {
      return true;
    }
    return false;
  },

  /** check if it is word-like in english */
  word: function word(t) {
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
  },

  /** is this a word like 'not' that reverses a verb*/
  negation: function negation(t) {
    if (t.normal === 'not' || t.silent_term === 'not') {
      return true;
    }
    return false;
  },

  /** does it appear to be an acronym, like FBI or M.L.B. */
  acronym: function acronym(t) {
    //like N.D.A
    if (t.text.match(/([A-Z]\.)+[A-Z]?$/)) {
      return true;
    }
    //like 'F.'
    if (t.text.match(/^[A-Z]\.$/)) {
      return true;
    }
    //like NDA
    if (t.text.match(/[A-Z]{3}$/)) {
      return true;
    }
    return false;
  }

};

module.exports = term;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/paths.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/paths.js"][0].apply(exports,arguments)
},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/pluck/index.js":[function(_dereq_,module,exports){
'use strict';
// methods for cherrypicking other terms related to this one

var term = {
  next: function next(t) {
    var index = t.info('Index');
    return t.context.parent.arr[index + 1];
  },
  before: function before(t) {
    var index = t.info('Index');
    return t.context.parent.arr[index - 1];
  }
};

module.exports = term;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/render/index.js":[function(_dereq_,module,exports){
'use strict';

var renderHtml = _dereq_('./renderHtml');
var chalk = _dereq_('chalk');
var paths = _dereq_('../paths');
var log = paths.log;
var fns = paths.fns;

var colors = {
  Noun: chalk.cyan,
  Verb: chalk.magenta,
  Adjective: chalk.yellow,
  Adverb: chalk.red
};

//supported Sentence.return() methods
module.exports = {
  /** a pixel-perfect reproduction of the input, with whitespace preserved */
  text: function text(t) {
    return t.whitespace.before + t.text + t.whitespace.after;
  },
  /** a lowercased, punctuation-cleaned, whitespace-trimmed version of the word */
  normal: function normal(t) {
    return t.normal;
  },
  /** the &encoded term in a span element, with POS as classNames */
  html: function html(t) {
    return renderHtml(t);
  },
  /** a simplified response for Part-of-Speech tagging*/
  tags: function tags(t) {
    return {
      text: t.text,
      normal: t.render('normal'),
      tags: Object.keys(t.tag)
    };
  },
  /** check-print information for the console */
  check: function check(t) {
    var tags = Object.keys(t.tag).map(function (tag) {
      if (colors[tag]) {
        return colors[tag](tag);
      }
      return tag;
    }).join(', ');
    var word = t.text;
    word = '\'' + chalk.green(word || ' ') + '\'';
    var silent = '';
    if (t.silent_term) {
      silent = '[' + t.silent_term + ']';
    }
    // word += fns.leftPad(silent, 10);
    word = fns.leftPad(word, 25);
    word += fns.leftPad(silent, 10);
    // word = fns.leftPad(word, 32);
    // word = fns.rightPad(word, 28);
    console.log('   ' + word + '   ' + '     - ' + tags);
  }
};

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/paths.js","./renderHtml":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/render/renderHtml.js","chalk":"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/render/renderHtml.js":[function(_dereq_,module,exports){
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
    return 'nlp' + c;
  });
  classes = classes.join(' ');
  var text = sanitize(t.text);
  text = escapeHtml(text);
  var el = '<span class="' + classes + '">' + text + '</span>';
  return escapeHtml(t.whitespace.before) + el + escapeHtml(t.whitespace.after);
};

module.exports = renderHtml;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/transform/contract.js":[function(_dereq_,module,exports){
'use strict';

var irregular = {
  will: 'won\'t',
  can: 'can\'t'
};
var contractable = {
  can: true,
  have: true,
  had: true,
  do: true,
  did: true
};

//turn 'have not' into 'haven't', etc.
var contract = function contract(t) {
  var after = t.next();
  //not -> n't contractions
  if (after && after.normal === 'not') {
    //try an irregular form
    if (irregular[t.normal]) {
      t.silent_term = t.text;
      t.text = irregular[t.normal];
      after.silent_term = after.text;
      after.text = '';
      return t;
    }
    //try a standard n't rule
    if (t.tag.Modal || t.tag.Copula || contractable[t.normal]) {
      t.silent_term = t.text;
      t.text = t.text + 'n\'t';
      after.silent_term = after.text;
      after.text = '';
      return t;
    }
  }
  return t;
};

module.exports = contract;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/transform/index.js":[function(_dereq_,module,exports){
'use strict';

var contract = _dereq_('./contract');

module.exports = {
  /**a readable, normalized form - trim whitespace, normalize punctuation, and lowercase */
  normal: function normal(t) {
    t.text = t.info('normalized');
    t.whitespace.before = '';
    t.whitespace.after = ' ';
    //don't append a space at the end
    if (t.is('last')) {
      t.whitespace.after = '';
    }
    return t;
  },
  /** set all characters to lower/downcase*/
  lowercase: function lowercase(t) {
    t.text = t.text.toLowerCase();
    return t;
  },
  /** set all characters to uper/titlecase*/
  uppercase: function uppercase(t) {
    t.text = t.text.toUpperCase();
    return t;
  },
  /** ensure the first character is a capital. Ignore other characters. */
  titlecase: function titlecase(t) {
    t.text = t.text.replace(/^[a-z]/, function (x) {
      return x.toUpperCase();
    });
    return t;
  },

  /** normalize newlines, tabs, and multiple spaces */
  normalwhitespace: function normalwhitespace(t) {
    t.whitespace.before = ' ';
    t.whitespace.after = '';
    return t;
  },

  /** expand all contractions */
  expansion: function expansion(t) {
    if (t.silent_term) {
      t.text = t.silent_term;
      t.silent_term = null;
    }
    return t;
  },

  /** contract any (possible) contractions */
  contraction: function contraction(t) {
    return contract(t);
  }

};

},{"./contract":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/transform/contract.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/terms.js":[function(_dereq_,module,exports){
'use strict';

module.exports = {
  adjective: _dereq_('./adjective'),
  adverb: _dereq_('./adverb'),
  date: _dereq_('./date'),
  noun: _dereq_('./noun'),
  person: _dereq_('./person'),
  place: _dereq_('./place'),
  term: _dereq_('./term'),
  url: _dereq_('./url'),
  value: _dereq_('./value'),
  verb: _dereq_('./verb')
};
// 
// let terms = [
//   'adjective',
//   'adverb',
//   'date',
//   'noun',
//   'person',
//   'place',
//   'term',
//   'url',
//   'value',
//   'verb',
// ].reduce((h, s) => {
//   h[s] = require('./' + s);
//   return h;
// }, {});
// module.exports = terms;

},{"./adjective":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/index.js","./adverb":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adverb/index.js","./date":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/date/index.js","./noun":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/index.js","./person":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/person/index.js","./place":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/place/index.js","./term":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/index.js","./url":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/url/index.js","./value":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/index.js","./verb":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/transforms.js":[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('./paths').fns;
var terms = _dereq_('./terms');

//collect all transforms for a termslist
var all = {};
Object.keys(terms).forEach(function (k) {
  var tag = fns.titleCase(k);
  Object.keys(terms[k].transform).forEach(function (method) {
    var name = 'to' + fns.titleCase(method);
    //make a termList method..
    all[name] = function (ts) {
      ts.arr = ts.arr.map(function (t) {
        //only apply it
        if (tag === 'Term' || t.tag[tag]) {
          return t.to(method);
        }
        return t;
      });
      return ts;
    };
  });
});
module.exports = all;

},{"./paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/paths.js","./terms":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/terms.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/url/index.js":[function(_dereq_,module,exports){
'use strict';
//

var url = {
  info: _dereq_('./info'),
  is: _dereq_('./is'),
  pluck: _dereq_('./pluck'),
  transform: _dereq_('./transform')
};

module.exports = url;

},{"./info":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/url/info/index.js","./is":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/url/is/index.js","./pluck":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/url/pluck/index.js","./transform":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/url/transform/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/url/info/index.js":[function(_dereq_,module,exports){
'use strict';

var parseUrl = _dereq_('./parseUrl');
var info = {
  parseurl: function parseurl(t) {
    return parseUrl(t.text);
  }
};
module.exports = info;

},{"./parseUrl":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/url/info/parseUrl.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/url/info/parseUrl.js":[function(_dereq_,module,exports){
'use strict';
//parse a url into components, in 'loose' mode
//taken from   http://locutus.io/php/url/parse_url/

var parse_url = function parse_url(str) {
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/url/is/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/is/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/url/pluck/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/pluck/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/url/transform/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/transform/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/index.js"][0].apply(exports,arguments)
},{"./info":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/index.js","./is":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/is/index.js","./pluck":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/pluck/index.js","./transform":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/transform/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/index.js":[function(_dereq_,module,exports){
'use strict';

var toNumber = _dereq_('./toNumber');
var toText = _dereq_('./toText');
var parseNumber = _dereq_('./parse');

var info = {

  /* return a number, like '5th', as a cardinal, like 5 */
  cardinal: function cardinal(t) {
    var num = parseNumber(t);
    //if it is textual, make a textCardinal
    if (t.is('TextValue')) {
      return toText.cardinal(num);
    }
    //otherwise, numerical form
    return num;
  },

  /* return a number, like '5', as an ordinal, like '5th' */
  ordinal: function ordinal(t) {
    var num = parseNumber(t);
    //if it is textual, make a textCardinal
    if (t.is('TextValue')) {
      return toText.ordinal(num);
    }
    //otherwise, numerical form
    return toNumber.ordinal(num);
  },

  /** return a float/integer version of this number*/
  number: function number(t) {
    var n = parseNumber(t);
    if (t.is('Ordinal')) {
      return toNumber.ordinal(n);
    }
    return n;
  },

  /** return a textual version of this number*/
  textual: function textual(t) {
    var num = parseNumber(t);
    if (t.is('Ordinal')) {
      return toText.ordinal(num);
    } else {
      return toText.cardinal(num);
    }
  },

  /** generate all forms for this number */
  parse: function parse(t) {
    var num = parseNumber(t);
    return {
      Numeric: {
        Cardinal: num,
        Ordinal: toNumber.ordinal(num)
      },
      TextValue: {
        Cardinal: toText.cardinal(num),
        Ordinal: toText.ordinal(num)
      }
    };
  }

};
module.exports = info;

},{"./parse":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/parse/index.js","./toNumber":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/toNumber/index.js","./toText":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/toText/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/parse/data.js":[function(_dereq_,module,exports){
'use strict';

var p = _dereq_('../../paths');
var numbers = p.data.numbers;

//setup number-word data
var ones = Object.assign({}, numbers.ordinal.ones, numbers.cardinal.ones);
var teens = Object.assign({}, numbers.ordinal.teens, numbers.cardinal.teens);
var tens = Object.assign({}, numbers.ordinal.tens, numbers.cardinal.tens);
var multiples = Object.assign({}, numbers.ordinal.multiples, numbers.cardinal.multiples);

module.exports = {
  ones: ones,
  teens: teens,
  tens: tens,
  multiples: multiples
};

},{"../../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/parse/findModifiers.js":[function(_dereq_,module,exports){
'use strict';

//support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5

var findModifiers = function findModifiers(str) {
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

module.exports = findModifiers;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/parse/index.js":[function(_dereq_,module,exports){
'use strict';

var parseNumeric = _dereq_('./parseNumeric');
var findModifiers = _dereq_('./findModifiers');
var words = _dereq_('./data');
var isValid = _dereq_('./validate');
var parseDecimals = _dereq_('./parseDecimals');
var log = _dereq_('../../paths').log;
var path = 'parseNumber';

// a 'section' is something like 'fifty-nine thousand'
// turn a section into something we can add to - like 59000
var section_sum = function section_sum(obj) {
  return Object.keys(obj).reduce(function (sum, k) {
    sum += obj[k];
    return sum;
  }, 0);
};

//turn a string into a number
var parse = function parse(t) {
  log.here('parseNumber', path);
  var str = t.normal;
  //'a/an' is 1
  if (str === 'a' || str === 'an') {
    return 1;
  }
  //handle a string of mostly numbers
  if (t.tag['Numeric'] || str.match(/^[0-9]+(st|nd|rd|th)?$/)) {
    return parseNumeric(str);
  }
  var modifier = findModifiers(str);
  str = modifier.str;
  var biggest_yet = 0;
  var has = {};
  var sum = 0;
  var isNegative = false;
  var terms = str.split(/[ -]/);
  for (var i = 0; i < terms.length; i++) {
    var w = terms[i];
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
      log.warn('invalid state', path);
      log.warn(has, path);
      return null;
    }
    //buildup section, collect 'has' values
    if (w.match(/^[0-9]$/)) {
      has['ones'] = parseInt(w, 10); //not technically right
    } else if (words.ones[w]) {
      has['ones'] = words.ones[w];
    } else if (words.teens[w]) {
      has['teens'] = words.teens[w];
    } else if (words.tens[w]) {
      has['tens'] = words.tens[w];
    } else if (words.multiples[w]) {
      var mult = words.multiples[w];
      //something has gone wrong : 'two hundred five hundred'
      if (mult === biggest_yet) {
        log.warn('invalid multiplier', path);
        return null;
      }
      //if it's the biggest yet, multiply the whole sum - eg 'five hundred thousand'
      if (mult > biggest_yet) {
        biggest_yet = mult;
        sum += section_sum(has);
        sum = (sum || 1) * mult;
      } else {
        //it's smaller, so only multiply section_sum - eg 'five thousand one hundred'
        sum += (section_sum(has) || 1) * mult;
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

module.exports = parse;

},{"../../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/paths.js","./data":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/parse/data.js","./findModifiers":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/parse/findModifiers.js","./parseDecimals":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/parse/parseDecimals.js","./parseNumeric":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/parse/parseNumeric.js","./validate":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/parse/validate.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/parse/parseDecimals.js":[function(_dereq_,module,exports){
'use strict';

var words = _dereq_('./data');

//concatenate into a string with leading '0.'
var parseDecimals = function parseDecimals(arr) {
  var str = '0.';
  for (var i = 0; i < arr.length; i++) {
    var w = arr[i];
    if (words.ones[w]) {
      str += words.ones[w];
    } else if (w.match(/^[0-9]$/)) {
      str += w;
    } else {
      return 0;
    }
  }
  return parseFloat(str);
};

module.exports = parseDecimals;

},{"./data":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/parse/data.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/parse/parseNumeric.js":[function(_dereq_,module,exports){
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/parse/validate.js":[function(_dereq_,module,exports){
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

},{"./data":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/parse/data.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/toNumber/index.js":[function(_dereq_,module,exports){
'use strict';
//turn a number like 5 into an ordinal like 5th

var toOrdinal = function toOrdinal(num) {
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

module.exports = {
  ordinal: toOrdinal
};

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/toText/buildUp.js":[function(_dereq_,module,exports){
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/toText/index.js":[function(_dereq_,module,exports){
'use strict';
//

var toOrdinal = _dereq_('../../paths').data.ordinalMap.toOrdinal;
var buildUp = _dereq_('./buildUp');
var toText = {
  cardinal: function cardinal(num) {
    var arr = buildUp(num);
    return arr.join(' ');
  },
  ordinal: function ordinal(num) {
    var arr = buildUp(num);
    //convert the last number to an ordinal
    var last = arr[arr.length - 1];
    arr[arr.length - 1] = toOrdinal[last] || last;
    return arr.join(' ');
  }
};

module.exports = toText;

},{"../../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/paths.js","./buildUp":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/info/toText/buildUp.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/is/index.js":[function(_dereq_,module,exports){
'use strict';
//'is' methods for value

var p = _dereq_('../paths');
var num = p.data.numbers;
var ordinal = num.ordinal;
var cardinal = num.cardinal;

var lastWord = function lastWord(t) {
  var words = t.normal.split(/[ -]/);
  return words[words.length - 1];
};

var value = {

  /** is this an ordinal number written in numbers, like '500th' */
  numberordinal: function numberordinal(t) {
    if (t.normal.match(/[0-9](st|nd|rd|r?th)$/)) {
      return true;
    }
    return false;
  },
  /** is this an ordinal number spelled-out in words, like 'five hundredth' */
  textordinal: function textordinal(t) {
    var last = lastWord(t);
    if (ordinal.ones[last] || ordinal.teens[last] || ordinal.tens[last] || ordinal.multiples[last]) {
      return true;
    }
    return false;
  },
  /** is this an cardinal number written in numbers, like '500' */
  numbercardinal: function numbercardinal(t) {
    if (t.normal.match(/^[0-9,\.]+$/)) {
      return true;
    }
    return false;
  },
  /** is this an cardinal number spelled-out in words, like 'five hundredth' */
  textcardinal: function textcardinal(t) {
    var last = lastWord(t);
    if (cardinal.ones[last] || cardinal.teens[last] || cardinal.tens[last] || cardinal.multiples[last]) {
      return true;
    }
    return false;
  },

  /** an ordinal is '5th', or 'fifth', instead of 5 */
  ordinal: function ordinal(t) {
    if (t.is('NumberOrdinal') || t.is('TextOrdinal')) {
      return true;
    }
    return false;
  },

  /** a cardinal is a number that is not an ordinal like 'fifth', but a regular number, like 'five' */
  cardinal: function cardinal(t) {
    if (t.is('NumberCardinal') || t.is('TextCardinal')) {
      return true;
    }
    return false;
  },

  /** a TextValue is a number that's spelled-out*/
  textvalue: function textvalue(t) {
    if (t.is('TextCardinal') || t.is('TextOrdinal')) {
      return true;
    }
    return false;
  },
  /** a TextValue is a number that's spelled-out*/
  Numeric: function Numeric(t) {
    if (t.is('NumberCardinal') || t.is('NumberOrdinal')) {
      return true;
    }
    return false;
  }
};
module.exports = value;

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/paths.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/paths.js"][0].apply(exports,arguments)
},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/pluck/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/pluck/index.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/value/transform/index.js":[function(_dereq_,module,exports){
'use strict';

var value = {
  /** return an numeric version like an integer/float, like 44, or 308, or an ordinal like '1st', '308th' */
  number: function number(t) {
    var num = t.info('Number');
    t.text = '' + num;
    t.tagAs('Numeric');
    return t;
  },
  /** return an textual version, like 'fourty four', or 'three hundred and eight' - or an ordinal string like 'first''*/
  textvalue: function textvalue(t) {
    var num = t.info('Textual');
    t.text = '' + num;
    t.tagAs('TextValue');
    return t;
  },
  /** turn an ordinal into a cardinal - 1 to '1st', 308 to '308th' */
  cardinal: function cardinal(t) {
    var num = t.info('Cardinal');
    t.text = '' + num;
    t.tagAs('Cardinal');
    return t;
  },
  /** turn a cardinal into an ordinal - '1st' to 1, '308th' to 308  */
  ordinal: function ordinal(t) {
    var num = t.info('Ordinal');
    t.text = '' + num;
    t.tagAs('Ordinal');
    return t;
  }
};
module.exports = value;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/index.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/noun/index.js"][0].apply(exports,arguments)
},{"./info":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/index.js","./is":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/is/index.js","./pluck":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/pluck/index.js","./transform":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/transform/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/data/rules.js":[function(_dereq_,module,exports){
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
}];

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/generic.js":[function(_dereq_,module,exports){
'use strict';
//non-specifc, 'hail-mary' transforms from infinitive, into other forms

var fns = _dereq_('./paths').fns;

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
    if (fns.endsWith(inf, /[bcdfghjklmnpqrstvwxz]y$/)) {
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
    if (fns.endsWith(inf, /[bcdfghjklmnpqrstvwxz]y$/)) {
      return inf.slice(0, -1) + 'ied';
    }
    return inf + 'ed';
  },

  FutureTense: function FutureTense(o) {
    return 'will ' + o.Infinitive;
  },

  PerfectTense: function PerfectTense(o) {
    return 'have ' + (o.Participle || o.PastTense);
  },

  Pluperfect: function Pluperfect(o) {
    if (o.PastTense) {
      return 'had ' + o.PastTense;
    }
    return null;
  },
  FuturePerfect: function FuturePerfect(o) {
    if (o.PastTense) {
      return 'will have ' + o.PastTense;
    }
    return null;
  }

};

module.exports = generic;

},{"./paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/index.js":[function(_dereq_,module,exports){
'use strict';

var checkIrregulars = _dereq_('./irregulars');
var suffixPass = _dereq_('./suffixes');
var toActor = _dereq_('./toActor');
var toAdjective = _dereq_('./toAdjective');
var generic = _dereq_('./generic');

//turn a verb into all it's forms
var conjugate = function conjugate(t) {
  var all = {
    PastTense: null,
    PresentTense: null,
    FutureTense: null,
    Infinitive: null,
    Gerund: null,
    Actor: null,
    PerfectTense: null,
    Pluperfect: null
  };
  //first, get its current form
  var form = t.info('Conjugation');
  if (form) {
    all[form] = t.normal;
  }
  if (form !== 'Infinitive') {
    all['Infinitive'] = t.info('Infinitive');
  }
  //check irregular forms
  all = Object.assign(all, checkIrregulars(t.normal));

  //ok, send this infinitive to all conjugators
  var inf = all['Infinitive'] || t.normal;

  //check suffix rules
  all = Object.assign(all, suffixPass(inf));

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

},{"./generic":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/generic.js","./irregulars":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/irregulars.js","./suffixes":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/suffixes.js","./toActor":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/toActor.js","./toAdjective":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/toAdjective.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/irregulars.js":[function(_dereq_,module,exports){
'use strict';

var irregulars = _dereq_('./paths').data.irregular_verbs;

var checkIrregulars = function checkIrregulars(str) {
  var keys = Object.keys(irregulars);
  for (var i = 0; i < keys.length; i++) {
    var obj = irregulars[keys[i]];

    //matched infinitive
    if (keys[i] === str) {
      obj = Object.assign({}, obj);
      obj.Infinitive = keys[i];
      return obj;
    }

    //check other forms
    var kinds = Object.keys(obj);
    for (var o = 0; o < kinds.length; o++) {
      if (obj[kinds[o]] === str) {
        obj = Object.assign({}, obj);
        obj.Infinitive = keys[i];
        return obj;
      }
    }
  }
  return null;
};

module.exports = checkIrregulars;
// console.log(checkIrregulars('understood'));

},{"./paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/paths.js":[function(_dereq_,module,exports){
'use strict';

module.exports = _dereq_('../../paths');

},{"../../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/suffixes.js":[function(_dereq_,module,exports){
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

},{"./data/rules":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/data/rules.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/toActor.js":[function(_dereq_,module,exports){
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/toAdjective.js":[function(_dereq_,module,exports){
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/index.js":[function(_dereq_,module,exports){
'use strict';

var predictForm = _dereq_('./predict');
var conjugate = _dereq_('./conjugation');
var toInfinitive = _dereq_('./toInfinitive');

var info = {
  /** try to predict which form this verb is */
  conjugation: function conjugation(t) {
    return predictForm(t);
  },
  /** return the main 'default' form of the verb*/
  infinitive: function infinitive(t) {
    return toInfinitive(t);
  },
  /** return all forms of this verb */
  conjugations: function conjugations(t) {
    return conjugate(t);
  },

  /** is it past/present/future tense */
  tense: function tense(t) {
    var tenses = {
      PresentTense: 'PresentTense',
      PastTense: 'PastTense',
      FutureTense: 'FutureTense',
      Infinitive: 'PresentTense',
      Gerund: 'PresentTense',
      Actor: 'PresentTense',
      PerfectTense: 'PastTense',
      Pluperfect: 'PastTense',
      FuturePerfect: 'FutureTense'
    };
    var keys = Object.keys(tenses);
    for (var i = 0; i < keys.length; i++) {
      if (t.tag[keys[i]]) {
        return tenses[keys[i]];
      }
    }
    return 'PresentTense'; //hmm, default?
  },

  /** look around for the auxillary terms before this, like 'would have had' */
  auxillaries: function auxillaries(t) {
    //if this is an auxillary, return nothing
    if (t.is('Auxillary')) {
      return [];
    }
    var arr = [];
    var before = t.info('Before').slice(0, 4);
    for (var i = 0; i < before.length; i++) {
      if (before[i].is('Auxillary')) {
        arr.unshift(before[i]); //(before terms are reversed)
      } else if (before[i].is('Negation')) {
        continue;
      } else {
        break;
      }
    }
    return arr;
  },

  /** find a term object that reverses the meaning of this verb */
  negation: function negation(t) {
    //look at the words before
    var before = t.info('Before').slice(0, 3);
    for (var i = 0; i < before.length; i++) {
      if (before[i].normal === 'not' || before[i].silent_term === 'not') {
        return before[i];
      }
    }
    //look at the next word after - 'is not'
    var after = t.info('after');
    if (after[0] && after[0].normal === 'not') {
      return after[0];
    }
    return null;
  },

  /** parse-out common verb prefixes, for conjugation*/
  prefix: function prefix(t) {
    var match = t.normal.match(/^(over|under|re|anti|full|cross)([- ])?([^aeiou][a-z]*)/i);
    if (match) {
      return {
        prefix: match[1] + (match[2] || ''),
        root: match[3]
      };
    }
    return null;
  },

  /**for phrasal verbs ('look out'), conjugate look, then append 'out'*/
  particle: function particle(t) {
    var phrasal_reg = new RegExp('^(.*?) (in|out|on|off|behind|way|with|of|away|across|ahead|back|over|under|together|apart|up|upon|aback|down|about|before|after|around|to|forth|round|through|along|onto)$', 'i');
    if (t.normal.match(phrasal_reg)) {
      var split = t.normal.match(phrasal_reg, '');
      return {
        phrasal: split[1],
        particle: split[2]
      };
    }
    return null;
  },

  /** find the auxillary, root, and particle of this verb*/
  components: function components(t) {
    return {
      negation: t.info('Negation'),
      auxillaries: t.info('Auxillaries'),
      particle: t.info('Particle'),
      prefix: t.info('Prefix')
    };
  }
};
module.exports = info;

},{"./conjugation":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/conjugation/index.js","./predict":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/predict/index.js","./toInfinitive":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/toInfinitive/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/predict/index.js":[function(_dereq_,module,exports){
'use strict';

var paths = _dereq_('../../paths');
var log = paths.log;
var fns = paths.fns;
var suffix_rules = _dereq_('./suffix_rules');
var path = 'conjugation';

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

var predictForm = function predictForm(term) {
  //do we already know the form?
  var keys = Object.keys(goodTypes);
  for (var i = 0; i < keys.length; i++) {
    if (term.tag[keys[i]]) {
      log.tell('predicted ' + keys[i] + ' from pos', path);
      return keys[i];
    }
  }
  //consult our handy suffix rules
  var arr = Object.keys(suffix_rules);
  for (var _i = 0; _i < arr.length; _i++) {
    if (fns.endsWith(term.normal, arr[_i]) && arr[_i].length < term.normal.length) {
      var msg = 'predicted ' + suffix_rules[arr[_i]] + ' from suffix ' + arr[_i];
      log.tell(msg, path);
      return suffix_rules[arr[_i]];
    }
  }
  return null;
};

module.exports = predictForm;

},{"../../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/paths.js","./suffix_rules":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/predict/suffix_rules.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/predict/suffix_rules.js":[function(_dereq_,module,exports){
'use strict';
//suffix signals for verb tense, generated from test data

var compact = {
  'Gerund': ['ing'],
  'Actor': ['erer'],
  'Infinitive': ['ate', 'ize', 'tion', 'rify', 'then', 'ress', 'ify', 'age', 'nce', 'ect', 'ise', 'ine', 'ish', 'ace', 'ash', 'ure', 'tch', 'end', 'ack', 'and', 'ute', 'ade', 'ock', 'ite', 'ase', 'ose', 'use', 'ive', 'int', 'nge', 'lay', 'est', 'ain', 'ant', 'eed', 'er', 'le', 'own', 'unk', 'ung', 'en'],
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/toInfinitive/index.js":[function(_dereq_,module,exports){
'use strict';
//turn any verb into its infinitive form

var rules = _dereq_('./rules');
var irregulars = _dereq_('../../paths').data.irregular_verbs;

//map the irregulars for easy infinitive lookup
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
  var form = t.info('Conjugation');
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

},{"../../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/paths.js","./rules":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/toInfinitive/rules.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/info/toInfinitive/rules.js":[function(_dereq_,module,exports){
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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/is/index.js":[function(_dereq_,module,exports){
'use strict';
//true/false methods for Verbs

var verb = {
  /** is this a word, like 'will have had', before another verb */
  auxillary: function auxillary(t) {
    var aux = {
      will: true,
      be: true,
      was: true,
      have: true,
      had: true
    };
    if (aux[t.normal] || aux[t.silent_term]) {
      return true;
    }
    if (t.tag.Modal) {
      return true;
    }
    return false;
  }
};
module.exports = verb;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/paths.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/adjective/paths.js"][0].apply(exports,arguments)
},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/pluck/index.js":[function(_dereq_,module,exports){
'use strict';
//pluck/cherrypick methods on verbs

var verb = {
  /** find the adverb(s) for this verb*/
  adverb: function adverb(t) {

    return null;
  }
};
module.exports = verb;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/verb/transform/index.js":[function(_dereq_,module,exports){
'use strict';

var transform = {
  pasttense: function pasttense(t) {
    var obj = t.info('Conjugations');
    t.text = obj.Past || t.text;
    return t;
  }
};
module.exports = transform;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/normalize.js":[function(_dereq_,module,exports){
'use strict';

var normalize = function normalize(str) {
  str = str.toLowerCase();
  //convert hyphenations to a multiple-word term
  str = str.replace(/([a-z])\-([a-z])/g, '$1 $2');
  //hashtags, atmentions
  str = str.replace(/^[#@]/, '');

  // coerce single curly quotes
  str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, '\'');
  // coerce double curly quotes
  str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '');
  //strip leading & trailing grammatical punctuation
  str = str.replace(/['",\.!:;\?\)]$/g, '');
  str = str.replace(/^['"\(]/g, '');
  return str;
};

module.exports = normalize;

// console.log(normalize('Dr. V Cooper'));

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/paths.js":[function(_dereq_,module,exports){
'use strict';

module.exports = {
  fns: _dereq_('../../fns'),
  log: _dereq_('../../logger')
};

},{"../../fns":"/home/spencer/mountain/nlp/nlp_compromise/src/fns.js","../../logger":"/home/spencer/mountain/nlp/nlp_compromise/src/logger/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/render/index.js":[function(_dereq_,module,exports){
'use strict';

var renderHtml = _dereq_('./renderHtml');
var chalk = _dereq_('chalk');
var paths = _dereq_('../paths');
var log = paths.log;
var fns = paths.fns;

var colors = {
  Noun: chalk.cyan,
  Verb: chalk.magenta,
  Adjective: chalk.yellow,
  Adverb: chalk.red
};

//supported Sentence.return() methods
module.exports = {
  /** a pixel-perfect reproduction of the input, with whitespace preserved */
  text: function text(t) {
    return t.whitespace.before + t.text + t.whitespace.after;
  },
  /** a lowercased, punctuation-cleaned, whitespace-trimmed version of the word */
  normal: function normal(t) {
    return t.normal;
  },
  /** the &encoded term in a span element, with POS as classNames */
  html: function html(t) {
    return renderHtml(t);
  },
  /** a simplified response for Part-of-Speech tagging*/
  tags: function tags(t) {
    return {
      text: t.text,
      normal: t.render('normal'),
      tags: Object.keys(t.tag)
    };
  },
  /** check-print information for the console */
  check: function check(t) {
    var tags = Object.keys(t.tag).map(function (tag) {
      if (colors[tag]) {
        return colors[tag](tag);
      }
      return tag;
    }).join(', ');
    var word = t.text;
    word = '\'' + chalk.green(word || '-') + '\'';
    var silent = '';
    if (t.silent_term) {
      silent = '[' + t.silent_term + ']';
    }
    // word += fns.leftPad(silent, 10);
    word = fns.leftPad(word, 25);
    word += fns.leftPad(silent, 10);
    // word = fns.leftPad(word, 32);
    // word = fns.rightPad(word, 28);
    console.log('   ' + word + '   ' + '     - ' + tags);
  }
};

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/paths.js","./renderHtml":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/render/renderHtml.js","chalk":"/home/spencer/mountain/nlp/nlp_compromise/node_modules/chalk/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/render/renderHtml.js":[function(_dereq_,module,exports){
arguments[4]["/home/spencer/mountain/nlp/nlp_compromise/src/models/term/methods/term/render/renderHtml.js"][0].apply(exports,arguments)
},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/tag.js":[function(_dereq_,module,exports){
'use strict';
//set a term as a particular Part-of-speech

var log = _dereq_('../../logger');
var tagset = _dereq_('./tagset');

//check if the term is compatible with a pos tag.
var canBe = function canBe(term, tag) {
  //already compatible..
  if (term.tag[tag]) {
    return true;
  }
  //unknown tag..
  if (!tagset[tag]) {
    //huh? sure, go for it.
    return true;
  }
  //consult tagset's incompatible tags
  var not = tagset[tag].not;
  var tags = Object.keys(term.tag);
  for (var i = 0; i < tags.length; i++) {
    if (not.indexOf(tags[i]) !== -1) {
      return false;
    }
  }
  return true;
};

var set_tag = function set_tag(term, tag, reason) {
  tag = tag || '';
  tag = tag.replace(/^#/, '');
  //fail-fast
  if (!term || !tag || term.tag[tag]) {
    return;
  }
  log.tagAs(term, tag, reason);
  //reset term, if necessary
  if (canBe(term, tag) === false) {
    log.tell('retting tags for ' + term.normal);
    term.tag = {};
  }
  term.tag[tag] = true;
  if (!tagset[tag]) {
    // console.warn('unknown tag ' + tag + ' - ' + reason);
    term.tag[tag] = true;
    return;
  }
  //also set tags by deduction
  var tags = tagset[tag].is;
  for (var i = 0; i < tags.length; i++) {
    if (!term.tag[tags[i]]) {
      log.tagAs(term, tags[i], ' - - deduction-' + tag);
      term.tag[tags[i]] = true;
    }
  }
  return;
};

module.exports = {
  set_tag: set_tag,
  canBe: canBe
};

},{"../../logger":"/home/spencer/mountain/nlp/nlp_compromise/src/logger/index.js","./tagset":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/tagset/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/tagset/conflicts.js":[function(_dereq_,module,exports){
'use strict';

//list of inconsistent parts-of-speech

var conflicts = [
//top-level pos are all inconsistent
['Noun', 'Verb', 'Adjective', 'Adverb', 'Determiner', 'Conjunction', 'Preposition', 'QuestionWord', 'Expression'],
//nouns
['Person', 'Organization', 'Value', 'Place', 'Actor', 'Demonym', 'Pronoun'],
//things that can't be plural
['Plural', 'Singular'], ['Plural', 'Pronoun'], ['Plural', 'Person'], ['Plural', 'Organization'], ['Plural', 'Currency'], ['Plural', 'Ordinal'],
//people
['MalePerson', 'FemalePerson'],
//adjectives
['Comparative', 'Superlative'],
//values
['Ordinal', 'Cardinal'], ['TextValue', 'Numeric'], ['Ordinal', 'Currency'], //$5.50th
//verbs
['Infinitive', 'Gerund', 'Pluperfect', 'FuturePerfect'],
//tenses
['PastTense', 'PresentTense', 'PerfectTense'],
//non-infinitive
['Infinitive', 'PastTense'], ['Infinitive', 'PresentTense'],
//non-gerund
['Gerund', 'PastTense'], ['Gerund', 'PresentTense'],
//more verbs
['Copula', 'Modal'],
//web text
['HashTag', 'Noun', 'Verb', 'Adjective', 'Adverb'], ['Email', 'Verb', 'Adjective', 'Adverb'], ['Url', 'Verb', 'Adjective', 'Adverb'], ['HashTag', 'Email', 'Url'],
//date
['Month', 'Day', 'Year', 'Duration'], ['Particle', 'Conjunction', 'Adverb', 'Preposition'], ['Date', 'Verb', 'Adjective'], ['Month', 'Verb'],
//phrases
['NounPhrase', 'VerbPhrase', 'AdjectivePhrase'],
//a/an -> 1
['Value', 'Determiner']];

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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/tagset/index.js":[function(_dereq_,module,exports){
'use strict';

var conflicts = _dereq_('./conflicts');
var tree = _dereq_('./tree');

//make tags
var all = {};
//recursively add them, with is
var add_tags = function add_tags(obj, is) {
  Object.keys(obj).forEach(function (k) {
    all[k] = is;
    if (obj[k] !== true) {
      add_tags(obj[k], is.concat([k])); //recursive
    }
  });
};
add_tags(tree, []);

//add conflicts
Object.keys(all).forEach(function (tag) {
  all[tag] = {
    is: all[tag],
    not: conflicts(tag)
  };
});

module.exports = all;

},{"./conflicts":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/tagset/conflicts.js","./tree":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/tagset/tree.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/tagset/tree.js":[function(_dereq_,module,exports){
"use strict";

//the POS tags we use, according to their dependencies
module.exports = {
  NounPhrase: {
    Noun: {
      Singular: {
        Pronoun: true,
        Person: {
          MalePerson: true,
          FemalePerson: true,
          Honourific: true
        },
        Place: {
          Country: true,
          City: true
        },
        Organization: true
      },
      Plural: true,
      Actor: true,
      Unit: true,
      Demonym: true,
      Possessive: true
    }
  },
  Verb: {
    PresentTense: {
      Infinitive: true,
      Gerund: true
    },
    PastTense: true,
    PerfectTense: true,
    Pluperfect: true,
    FuturePerfect: true,
    Copula: true,
    Modal: true,
    Participle: true
  },
  VerbPhrase: {
    Particle: true
  },
  Adjective: {
    Comparative: true,
    Superlative: true
  },
  Adverb: true,
  Glue: {
    Determiner: true,
    Conjunction: true,
    Preposition: true
  },
  Value: {
    Currency: true,
    Ordinal: true,
    Cardinal: true,
    TextValue: true,
    Numeric: true
  },
  Date: {
    Month: true,
    Day: true,
    Year: true,
    Duration: true,
    Time: true
  },
  Condition: true,
  QuestionWord: true,
  Expression: true,
  Url: true,
  HashTag: true,
  Email: true,
  Auxillary: true,
  Negative: true,

  ValuePhrase: true,
  AdjectivePhrase: true
};

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/whitespace.js":[function(_dereq_,module,exports){
'use strict';

var build_whitespace = function build_whitespace(str) {
  var whitespace = {
    before: '',
    after: ''
  };
  //get before
  var m = str.match(/^\s+/);
  if (m) {
    whitespace.before = m[0];
  }
  //get after
  m = str.match(/\s+$/);
  if (m) {
    whitespace.after = m[0];
  }
  return whitespace;
};
module.exports = build_whitespace;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/01-split_sentences.js":[function(_dereq_,module,exports){
//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2015 MIT
'use strict';

var data = _dereq_('../data/index');
var abbreviations = Object.keys(data.abbreviations);
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
  var acronym_reg = new RegExp('[ |\.][A-Z]\.?( *)?$', 'i');
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
// console.log(sentence_parser('john f. kennedy'));

},{"../data/index":"/home/spencer/mountain/nlp/nlp_compromise/src/data/index.js","../fns":"/home/spencer/mountain/nlp/nlp_compromise/src/fns.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/02-split_terms.js":[function(_dereq_,module,exports){
'use strict';
//an initial, naiive split of arr based on spaces

var split_terms = function split_terms(str) {
  var result = [];
  //start with a naiive split
  var arr = str.split(/(\S+)/);
  //greedy merge whitespace+arr to the right
  var carry = '';
  for (var i = 0; i < arr.length; i++) {
    //if it's more than a whitespace
    if (arr[i].match(/\S/)) {
      result.push(carry + arr[i]);
      carry = '';
    } else {
      carry += arr[i];
    }
  }
  //handle last one
  if (carry && result.length > 0) {
    result[result.length - 1] += carry; //put it on the end
  }
  return result;
};

module.exports = split_terms;
// console.log(split_terms('  john   is   nice '))

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/03-tagger.js":[function(_dereq_,module,exports){
'use strict';

var tg = _dereq_('./tagger');
var step = tg.step;
var lumper = tg.lumper;
var contraction = tg.contraction;

var tagger = function tagger(ts) {
  ts = step.punctuation_step(ts);
  ts = lumper.lexicon_lump(ts);
  ts = step.lexicon_step(ts);
  ts = step.capital_step(ts);
  ts = step.web_step(ts);
  ts = step.suffix_step(ts);
  ts = step.neighbour_step(ts);
  ts = step.noun_fallback(ts);
  ts = contraction.interpret(ts);
  ts = step.date_step(ts);
  ts = step.auxillary_step(ts);
  ts = step.negation_step(ts);
  // ts = step.adverb_step(ts);
  ts = step.phrasal_step(ts);
  // ts = step.correction_step(ts);
  for (var i = 0; i < 2; i++) {
    ts = lumper.lump_three(ts);
    ts = lumper.lump_two(ts);
  }
  return ts;
};

module.exports = tagger;

},{"./tagger":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/04-corrections.js":[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('./tagger/paths').log;
var path = 'correction';
//
var corrections = function corrections(result) {
  log.here(path);
  //Determiner-signals
  //the wait to vote
  result.match('the #Verb #Preposition .', true).match('#Verb', true).tag('Noun', 'correction-determiner1');
  //the swim
  result.match('the #Verb', true).match('#Verb', true).tag('#Noun', 'correction-determiner2');
  //the nice swim
  result.match('the #Adjective #Verb', true).match('#Verb', true).tag('#Noun', 'correction-determiner3');
  //the truly nice swim
  result.match('the #Adverb #Adjective #Verb', true).match('#Verb', true).tag('#Noun', 'correction-determiner4');
  //peter the great
  result.match('#Person the #Adjective', true).tag('Person', 'correction-determiner5');
  //book the flight
  result.match('#Noun the #Noun', true).term(0).tag('Verb', 'correction-determiner6');

  //he quickly foo
  result.match('#Noun #Adverb #Noun', true).term(2).tag('Verb', 'correction');

  //is eager to go
  result.match('#Copula #Adjective to #Verb', true).match('#Adjective to').tag('Verb', 'correction');

  //different views than
  result.match('#Verb than', true).term(0).tag('Noun', 'correction');

  //her polling
  // result.match('#Possessive #Verb').term(1).tag('Noun', 'correction-possessive');

  //folks like her
  result.match('#Plural like #Noun', true).term(1).tag('Preposition', 'correction');

  //ambiguous 'may' and 'march'
  result.match('(may|march) #Determiner', true).term(0).tag('Month', 'correction-may');
  result.match('(may|march) #Value', true).term(0).tag('Month', 'correction-may');
  result.match('(may|march) #Date', true).term(0).tag('Month', 'correction-may');
  result.match('#Date (may|march)', true).term(1).tag('Month', 'correction-may');
  result.match('(next|this|last) (may|march)', true).term(1).tag('Month', 'correction-may');

  //'a/an' can mean 1
  result.match('(a|an) (#Duration|#Value)', true).term(0).tag('Value');
  //all values are either ordinal or cardinal
  result.match('#Value', true).match('!#Ordinal', true).tag('#Cardinal');

  //time
  result.match('#Cardinal #Time', true).tag('Time', 'value-time');
  result.match('(by|before|after|at|@|about) #Time', true).tag('Time', 'preposition-time');
  result.match('(#Value|#Time) (am|pm)', true).tag('Time', 'value-ampm');
  //may the 5th
  result.match('#Date the? #Ordinal', true).term(1).tag('Date', 'correction-date');
  return result;
};

module.exports = corrections;

},{"./tagger/paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/05-phrases.js":[function(_dereq_,module,exports){
'use strict';

var verbPhrase = _dereq_('./phrase/01-verbPhrase');
var nounPhrase = _dereq_('./phrase/02-nounPhrase');
var AdjectivePhrase = _dereq_('./phrase/03-adjectivePhrase');
//
var phraseTag = function phraseTag(result) {
  result = verbPhrase(result);
  result = nounPhrase(result);
  result = AdjectivePhrase(result);
  return result;
};

module.exports = phraseTag;

},{"./phrase/01-verbPhrase":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/phrase/01-verbPhrase.js","./phrase/02-nounPhrase":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/phrase/02-nounPhrase.js","./phrase/03-adjectivePhrase":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/phrase/03-adjectivePhrase.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/index.js":[function(_dereq_,module,exports){
'use strict';

var steps = {
  split_sentences: _dereq_('./01-split_sentences'),
  split_terms: _dereq_('./02-split_terms'),
  tagger: _dereq_('./03-tagger'),
  corrections: _dereq_('./04-corrections'),
  phrase: _dereq_('./05-phrases')
};
var Term = _dereq_('../models/term');
var Terms = _dereq_('../models/result/terms');
var fns = _dereq_('../fns');
var log = _dereq_('../logger');
var path = 'parse';
var Result = _dereq_('../models/result');

//turn the string into an array of termList objects
var tokenize = function tokenize(str, context) {
  str = fns.ensureString(str);
  context = fns.ensureObject(context);
  //step #1
  var arr = steps.split_sentences(str);
  arr = arr.map(function (sen, i) {
    //find the particular words
    //step #2
    var terms = steps.split_terms(sen);
    terms = terms.map(function (term) {
      //make them proper Term objects
      var c = fns.copy(context);
      return new Term(term, c);
    });
    //make it 'Terms()' object
    terms = new Terms(terms, context);
    //give each term a parent reference
    terms.forEach(function (t) {
      t.context.parent = terms;
    });
    log.tell('=sentence' + i + '=', path);
    //step #3
    terms = steps.tagger(terms);
    log.tell('\n', path);
    return terms;
  });
  //wrap them up into a Result
  var result = new Result(arr, context);
  //fix apparent mistakes in tagging
  result = steps.corrections(result);
  //tag NounPhrase, VerbPhrase
  result = steps.phrase(result);
  return result;
};
module.exports = tokenize;

},{"../fns":"/home/spencer/mountain/nlp/nlp_compromise/src/fns.js","../logger":"/home/spencer/mountain/nlp/nlp_compromise/src/logger/index.js","../models/result":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/index.js","../models/result/terms":"/home/spencer/mountain/nlp/nlp_compromise/src/models/result/terms/index.js","../models/term":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/index.js","./01-split_sentences":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/01-split_sentences.js","./02-split_terms":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/02-split_terms.js","./03-tagger":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/03-tagger.js","./04-corrections":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/04-corrections.js","./05-phrases":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/05-phrases.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/phrase/01-verbPhrase.js":[function(_dereq_,module,exports){
'use strict';
//

var verbPhrase = function verbPhrase(result) {
  result.match('#Verb', true).tag('VerbPhrase', 'verbphrase-verb');
  //'will have had'..
  result.match('#Auxillary+', true).tag('VerbPhrase', '2');
  // 'is'
  result.match('#Copula', true).tag('VerbPhrase', '#3');
  //'really will'..
  result.match('#Adverb #Auxillary', true).tag('VerbPhrase', '#4');
  //to go
  result.match('to #Infinitive', true).tag('VerbPhrase', '#5');
  //work with
  result.match('#Verb #Preposition', true).tag('VerbPhrase', '#6');
  return result;
};

module.exports = verbPhrase;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/phrase/02-nounPhrase.js":[function(_dereq_,module,exports){
'use strict';
//

var nounPhrase = function nounPhrase(result) {
  //nice house
  result.match('#Adjective #NounPhrase', true).tag('NounPhrase');
  //tag preceding determiner 'the nice house'
  result.match('#Determiner #NounPhrase', true).tag('NounPhrase');
  //
  result.match('#Noun #Preposition #Noun', true).tag('NounPhrase');
  //john and sara
  result.match('#Noun #Conjunction #Noun', true).tag('NounPhrase');
  //fifty stars
  result.match('#Value #NounPhrase', true).tag('NounPhrase');

  return result;
};

module.exports = nounPhrase;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/phrase/03-adjectivePhrase.js":[function(_dereq_,module,exports){
'use strict';
//

var adjectivePhrase = function adjectivePhrase(result) {
  //is really not so good
  result.match('#Copula #Adverb? not? as? #Adverb? #Adjective', true).tag('AdjectivePhrase').term(0).tag('#Copula');
  //is as strong as
  result.match('#AdjectivePhrase as', true).tag('AdjectivePhrase');
  return result;
};

module.exports = adjectivePhrase;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/contraction/01-irregulars.js":[function(_dereq_,module,exports){
'use strict';

var fixContraction = _dereq_('./fix');

var irregulars = {
  'wanna': ['want', 'to'],
  'gonna': ['going', 'to'],
  'im': ['i', 'am'],
  'alot': ['a', 'lot'],

  'dont': ['do', 'not'],
  'dun': ['do', 'not'],

  'won\'t': ['will', 'not'],
  'wont': ['will', 'not'],

  'cant': ['can', 'not'],
  'cannot': ['can', 'not'],

  'aint': ['is', 'not'], //or 'are'
  'ain\'t': ['is', 'not'],
  'shan\'t': ['should', 'not'],

  'where\'d': ['where', 'did'],
  'whered': ['where', 'did'],
  'when\'d': ['when', 'did'],
  'whend': ['when', 'did'],
  'how\'d': ['how', 'did'],
  'howd': ['how', 'did'],
  'what\'d': ['what', 'did'],
  'whatd': ['what', 'did'],
  'let\'s': ['let', 'us']
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

},{"./fix":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/contraction/fix.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/contraction/02-hardOne.js":[function(_dereq_,module,exports){
'use strict';

var fixContraction = _dereq_('./fix');

// "'s" may be a contraction or a possessive
// 'spencer's house' vs 'spencer's good'
var isPossessive = function isPossessive(ts, i) {
  var t = ts.terms[i];
  var next_t = ts.terms[i + 1];
  //a pronoun can't be possessive - "he's house"
  if (t.tag.Pronoun) {
    return false;
  }
  //if end of sentence, it is possessive - "was spencer's"
  if (!next_t) {
    return true;
  }
  //an adjective suggests 'is good'
  if (next_t.tag.Adjective) {
    return true;
  }
  //a gerund suggests 'is walking'
  if (next_t.tag.VerbPhrase) {
    return true;
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
    var parts = ts.terms[i].info('contraction');
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

},{"./fix":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/contraction/fix.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/contraction/03-easyOnes.js":[function(_dereq_,module,exports){
'use strict';

var fixContraction = _dereq_('./fix');

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
    var parts = ts.terms[i].info('contraction');
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

},{"./fix":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/contraction/fix.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/contraction/fix.js":[function(_dereq_,module,exports){
'use strict';
//add a silent term

var fixContraction = function fixContraction(ts, arr, i) {
  //add a new term
  ts.insertAt('', i);
  //add the interpretation silently
  ts.terms[i].silent_term = arr[0];
  ts.terms[i + 1].silent_term = arr[1];
  return ts;
};

module.exports = fixContraction;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/contraction/index.js":[function(_dereq_,module,exports){
'use strict';

var irregulars = _dereq_('./01-irregulars');
var hardOne = _dereq_('./02-hardOne');
var easyOnes = _dereq_('./03-easyOnes');

//find and pull-apart contractions
var interpret = function interpret(ts) {
  //check irregulars
  ts = irregulars(ts);
  //guess-at ambiguous "'s" one
  ts = hardOne(ts);
  //check easy ones
  ts = easyOnes(ts);
  return ts;
};

module.exports = interpret;

},{"./01-irregulars":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/contraction/01-irregulars.js","./02-hardOne":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/contraction/02-hardOne.js","./03-easyOnes":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/contraction/03-easyOnes.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/index.js":[function(_dereq_,module,exports){
'use strict';

//the steps and processes of pos-tagging
module.exports = {
  contraction: {
    interpret: _dereq_('./contraction')
  },
  lumper: {
    lexicon_lump: _dereq_('./lumper/lexicon_lump'),
    lump_two: _dereq_('./lumper/lump_two'),
    lump_three: _dereq_('./lumper/lump_three')
  },
  step: {
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
    phrasal_step: _dereq_('./steps/12-phrasal_step')
  }
};

},{"./contraction":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/contraction/index.js","./lumper/lexicon_lump":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/lumper/lexicon_lump.js","./lumper/lump_three":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/lumper/lump_three.js","./lumper/lump_two":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/lumper/lump_two.js","./steps/01-punctuation_step":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/01-punctuation_step.js","./steps/02-lexicon_step":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/02-lexicon_step.js","./steps/03-capital_step":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/03-capital_step.js","./steps/04-web_step":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/04-web_step.js","./steps/05-suffix_step":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/05-suffix_step.js","./steps/06-neighbour_step":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/06-neighbour_step.js","./steps/07-noun_fallback":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/07-noun_fallback.js","./steps/08-date_step":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/08-date_step.js","./steps/09-auxillary_step":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/09-auxillary_step.js","./steps/10-negation_step":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/10-negation_step.js","./steps/11-adverb_step":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/11-adverb_step.js","./steps/12-phrasal_step":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/12-phrasal_step.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/lumper/combine.js":[function(_dereq_,module,exports){
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

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/lumper/data/do_three.js":[function(_dereq_,module,exports){
'use strict';

//rules for combining three terms into one
module.exports = [{
  //john f kennedy
  condition: function condition(a, b, c) {
    return a.tag.Person && b.is('Acronym') && c.tag.Noun;
  },
  result: 'Person',
  reason: 'Name-Initial-Capital'
}, {
  //John & Joe's
  condition: function condition(a, b, c) {
    return a.tag.Noun && (b.text === '&' || b.normal === 'n') && c.tag.Noun;
  },
  result: 'Person',
  reason: 'Noun-&-Noun'
},
// {
//   //June the 5th
//   condition: (a, b, c) => (a.tag.Date && b.normal === 'the' && c.tag.Value),
//   result: 'Date',
//   reason: 'Date-the-Value'
// },
// {
//   //5th of June
//   condition: (a, b, c) => (a.tag.Value && (b.tag.Conjunction || b.tag.Preposition) && c.tag.Date),
//   result: 'Date',
//   reason: 'Value-Prep-Date'
// },
// {
//   //June 5th to 7th
//   condition: (a, b, c) => (a.tag.Date && (b.tag.Conjunction || b.tag.Preposition) && c.tag.Value),
//   result: 'Date',
//   reason: 'Date-Preposition-Value'
// },
// {
//   //3hrs after 5pm
//   condition: (a, b, c) => (a.tag.Date && (c.tag.Date || c.tag.Ordinal) && (b.tag.Preposition || b.tag.Determiner || b.tag.Conjunction || b.tag.Adjective)),
//   result: 'Date',
//   reason: 'Date-Preposition-Date'
// },
{
  //President of Mexico
  condition: function condition(a, b, c) {
    return a.is('titleCase') && b.normal === 'of' && c.is('titleCase');
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
},
// {
//   //will have walk
//   condition: (a, b, c) => (a.normal === 'will' && b.normal === 'have' && c.tag.Verb),
//   result: 'FutureTense',
//   reason: 'will-have-Verb'
// },

{
  //two hundred and three
  condition: function condition(a, b, c) {
    return a.tag.Value && b.normal === 'and' && c.tag.Value;
  },
  result: 'Value',
  reason: 'Value-and-Value'
}, {
  //two point three
  condition: function condition(a, b, c) {
    return a.tag.Value && b.normal === 'point' && c.tag.Value;
  },
  result: 'Value',
  reason: 'Value-and-Value'
}];

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/lumper/data/do_two.js":[function(_dereq_,module,exports){
'use strict';
//rules that combine two words

module.exports = [{
  condition: function condition(a, b) {
    return a.tag.Person && b.tag.Honourific || a.tag.Honourific && b.tag.Person;
  }, //"John sr."
  result: 'Person',
  reason: 'person-words'
}, {
  //6 am
  condition: function condition(a, b) {
    return (a.tag.Value || a.tag.Date) && (b.normal === 'am' || b.normal === 'pm');
  },
  result: 'Time',
  reason: 'time-am/pm'
}, {
  //'Dr. John'
  condition: function condition(a, b) {
    return a.tag.Honourific && b.is('TitleCase');
  },
  result: 'Person',
  reason: 'person-honourific'
}, {
  // "john lkjsdf's"
  condition: function condition(a, b) {
    return a.tag.Person && b.tag.tagsessive;
  },
  result: 'Person',
  reason: 'person-possessive'
}, {
  //"John Abcd" - needs to be careful
  condition: function condition(a, b) {
    return a.tag.Person && !a.tag.Pronoun && !a.tag.tagsessive && !a.info('hasComma') && b.is('TitleCase') && !a.is('Acronym') && !b.tag.Verb;
  }, //'Person, Capital -> Person'
  result: 'Person',
  reason: 'person-titleCase'
}, {
  //Aircraft designer
  condition: function condition(a, b) {
    return a.tag.Noun && b.tag.Actor;
  },
  result: 'Actor',
  reason: 'thing-doer'
}, {
  //Canada Inc
  condition: function condition(a, b) {
    return a.is('TitleCase') && a.tag.Noun && b.tag['Organization'] || b.is('TitleCase') && a.tag['Organization'];
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
  //timezones
  condition: function condition(a, b) {
    return b.normal.match(/(standard|daylight|summer) time/) && (a.tag['Adjective'] || a.tag['Place']);
  },
  result: 'Date',
  reason: 'timezone'
}, {
  //canadian dollar, Brazilian pesos
  condition: function condition(a, b) {
    return a.tag.Demonym && b.tag.Currency;
  },
  result: 'Currency',
  reason: 'demonym-currency'
}, {
  //7 ft
  condition: function condition(a, b) {
    return a.tag.Value && b.tag.Abbreviation || a.tag.Abbreviation && b.tag.Value;
  },
  result: 'Value',
  reason: 'value-abbreviation'
}, {
  //NASA Flordia
  condition: function condition(a, b) {
    return a.tag.Noun && b.tag.Abbreviation || a.tag.Abbreviation && b.tag.Noun;
  },
  result: 'Noun',
  reason: 'noun-abbreviation'
}, {
  //both values, not ordinals, not '5 20'
  condition: function condition(a, b) {
    return a.tag.Value && b.tag.Value && !a.tag.Ordinal && !b.tag.Numeric;
  },
  result: 'Value',
  reason: 'two-values'
}, {
  //both places
  condition: function condition(a, b) {
    return a.tag.Place && b.tag.Place;
  },
  result: 'Place',
  reason: 'two-places'
}];

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/lumper/lexicon_lump.js":[function(_dereq_,module,exports){
'use strict';
//check for "united" + "kingdom" in lexicon, and combine + tag it

var combine = _dereq_('./combine');
var p = _dereq_('../paths');
var log = p.log;
var lexicon = p.lexicon;
var path = 'tagger/multiple';

var lexicon_lump = function lexicon_lump(s) {
  log.here(path);
  var userLex = s.context.lexicon || {};
  for (var i = 0; i < s.terms.length - 1; i++) {
    //try 'A'+'B'
    var str = s.terms[i].normal + ' ' + s.terms[i + 1].normal;
    if (lexicon[str] || userLex[str]) {
      combine(s, i);
      s.terms[i].tagAs(lexicon[str], 'multiples-lexicon');
    }
  }

  return s;
};

module.exports = lexicon_lump;

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js","./combine":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/lumper/combine.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/lumper/lump_three.js":[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var path = 'lumper/lump_three';
var combine = _dereq_('./combine');
var do_three = _dereq_('./data/do_three');
// const dont_three = require('./data/dont_three');

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

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js","./combine":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/lumper/combine.js","./data/do_three":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/lumper/data/do_three.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/lumper/lump_two.js":[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var path = 'lumper/lump_two';
var do_two = _dereq_('./data/do_two');
var combine = _dereq_('./combine');
// const dont_two = require('./data/dont_two');

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

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js","./combine":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/lumper/combine.js","./data/do_two":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/lumper/data/do_two.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js":[function(_dereq_,module,exports){
'use strict';

module.exports = {
  data: _dereq_('../../data/index'),
  lexicon: _dereq_('../../data/lexicon'),
  fns: _dereq_('../../fns'),
  log: _dereq_('../../logger'),
  Term: _dereq_('../../models/term')
};

},{"../../data/index":"/home/spencer/mountain/nlp/nlp_compromise/src/data/index.js","../../data/lexicon":"/home/spencer/mountain/nlp/nlp_compromise/src/data/lexicon.js","../../fns":"/home/spencer/mountain/nlp/nlp_compromise/src/fns.js","../../logger":"/home/spencer/mountain/nlp/nlp_compromise/src/logger/index.js","../../models/term":"/home/spencer/mountain/nlp/nlp_compromise/src/models/term/index.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/01-punctuation_step.js":[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var rules = _dereq_('./data/punct_rules');
var path = 'tagger/punctuation';

var punctuation_step = function punctuation_step(ts) {
  log.here(path);
  ts.forEach(function (t) {
    //don't over-write any known tags
    if (Object.keys(t.tag).length > 0) {
      return;
    }
    //do punctuation rules (on t.text)
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      if (t.text.match(r.reg)) {
        t.tagAs(r.tag, 'punctuation-rule- "' + r.str + '"');
        return;
      }
    }
  });
  return ts;
};

module.exports = punctuation_step;

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js","./data/punct_rules":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/data/punct_rules.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/02-lexicon_step.js":[function(_dereq_,module,exports){
'use strict';

var p = _dereq_('../paths');
var lexicon = p.lexicon;
var log = p.log;
var path = 'tagger/lexicon';

var check_lexicon = function check_lexicon(str, sentence) {
  //check a user's custom lexicon
  var custom = sentence.context.lexicon || {};
  if (custom[str]) {
    return custom[str];
  }
  if (lexicon[str]) {
    return lexicon[str];
  }
  return null;
};

var lexicon_pass = function lexicon_pass(s) {
  log.here(path);
  var found = void 0;
  //loop through each term
  for (var i = 0; i < s.terms.length; i++) {
    var t = s.terms[i];
    //basic term lookup
    found = check_lexicon(t.normal, s);
    if (found) {
      t.tagAs(found, 'lexicon-match');
      continue;
    }
    //support contractions (manually)
    var parts = t.info('contraction') || {};
    found = check_lexicon(parts.start, s);
    if (found) {
      t.tagAs(found, 'contraction-lexicon');
      continue;
    }
    //support silent_term matches
    found = check_lexicon(t.silent_term, s);
    if (t.silent_term && found) {
      t.tagAs(found, 'silent_term-lexicon');
      continue;
    }
  }
  return s;
};

module.exports = lexicon_pass;

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/03-capital_step.js":[function(_dereq_,module,exports){
'use strict';
//titlecase is a signal for a noun

var log = _dereq_('../paths').log;
var path = 'tagger/capital';

var capital_logic = function capital_logic(s) {
  log.here(path);
  //(ignore first word)
  for (var i = 1; i < s.terms.length; i++) {
    var t = s.terms[i];
    //has a capital, but isn't too weird.
    if (t.is('titleCase') && t.is('word')) {
      t.tagAs('Noun', 'capital-step');
    }
  }
  return s;
};

module.exports = capital_logic;

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/04-web_step.js":[function(_dereq_,module,exports){
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

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/05-suffix_step.js":[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var rules = _dereq_('./data/word_rules');
var path = 'tagger/suffix';

var suffix_step = function suffix_step(s) {
  log.here(path);
  s.terms.forEach(function (t) {
    //don't over-write any known tags
    if (Object.keys(t.tag).length > 0) {
      return;
    }
    //do normalized rules (on t.normal)
    for (var o = 0; o < rules.length; o++) {
      var r = rules[o];
      if (t.normal.match(r.reg)) {
        t.tagAs(r.tag, 'word-rule- "' + r.str + '"');
        return;
      }
    }
  });
  return s;
};

module.exports = suffix_step;

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js","./data/word_rules":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/data/word_rules.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/06-neighbour_step.js":[function(_dereq_,module,exports){
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
var neighbour_step = function neighbour_step(s) {
  log.here(path);
  s.terms.forEach(function (t, n) {
    //is it still unknown?
    var termTags = Object.keys(t.tag);
    if (termTags.length === 0) {
      var lastTerm = s.terms[n - 1];
      var nextTerm = s.terms[n + 1];
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

  return s;
};

module.exports = neighbour_step;

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js","./data/neighbours":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/data/neighbours.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/07-noun_fallback.js":[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var path = 'tagger/noun_fallback';
//tag word as noun if we know nothing about it, still.

var noun_fallback = function noun_fallback(s) {
  log.here(path);
  for (var i = 0; i < s.terms.length; i++) {
    var t = s.terms[i];
    //fail-fast
    if (t.tag.Noun || t.tag.Verb) {
      continue;
    }
    //ensure it only has the tag 'Term'
    var tags = Object.keys(t.tag);
    if (tags.length === 0) {
      //ensure it's atleast word-looking
      if (t.is('word') === false) {
        continue;
      }
      t.tagAs('Noun', 'noun-fallback');
      //check if it's plural, too
      if (t.is('plural')) {
        t.tagAs('Plural', 'fallback-plural');
      }
    }
  }
  return s;
};

module.exports = noun_fallback;

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/08-date_step.js":[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var path = 'tagger/datePass';

var preDate = {
  on: true,
  in: true,
  before: true,
  by: true,
  after: true,
  during: true
};

//ensure a year is approximately typical for common years
var isYear = function isYear(t) {
  if (t.tag.Ordinal) {
    return false;
  }
  var num = t.info('number');
  if (!num || num < 1000 || num > 3000) {
    return false;
  }
  return true;
};

//rules for two-term dates
var twoDates = [{
  condition: function condition(a, b) {
    return preDate[a.normal] && b.tag.Date;
  },
  reason: 'predate-date'
}];

//rules for three-term dates
var threeDates = [{
  condition: function condition(a, b, c) {
    return a.tag.Month && b.tag.Value && c.tag.Cardinal && isYear(c);
  },
  reason: 'month-value-year'
}, {
  condition: function condition(a, b, c) {
    return a.tag.Date && b.normal === 'and' && c.tag.Date;
  },
  reason: 'date-and-date'
}];

//non-destructively tag values & prepositions as dates
var datePass = function datePass(s) {
  log.here(path);
  //set verbs as auxillaries
  for (var i = 0; i < s.terms.length - 1; i++) {
    var a = s.terms[i];
    var b = s.terms[i + 1];
    var c = s.terms[i + 2];
    if (c) {
      for (var o = 0; o < threeDates.length; o++) {
        if (threeDates[o].condition(a, b, c)) {
          a.tagAs('Date', threeDates[o].reason);
          b.tagAs('Date', threeDates[o].reason);
          c.tagAs('Date', threeDates[o].reason);
        }
      }
    }
    for (var _o = 0; _o < twoDates.length; _o++) {
      if (twoDates[_o].condition(a, b)) {
        a.tagAs('Date', twoDates[_o].reason);
        b.tagAs('Date', twoDates[_o].reason);
      }
    }
  }
  return s;
};

module.exports = datePass;

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/09-auxillary_step.js":[function(_dereq_,module,exports){
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

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/10-negation_step.js":[function(_dereq_,module,exports){
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

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/11-adverb_step.js":[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var path = 'tagger/adverb';

//adverbs can be for verbs or nouns
var adverb_step = function adverb_step(ts) {
  log.here(path);
  for (var i = 0; i < ts.length; i++) {
    var t = ts.get(i);
    if (t.tag.Adverb) {
      //find the next verb/adjective
      for (var o = 0; o < 7; o++) {
        //look forward first
        var after = ts.get(i + o);
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
        var before = ts.get(i - o);
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

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/12-phrasal_step.js":[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var phrasals = _dereq_('./data/phrasal_verbs');
var path = 'tagger/phrasal';

//words that could be particles
var particles = {
  'away': true,
  'back': true,
  'in': true,
  'out': true,
  'on': true,
  'off': true,
  'over': true,
  'under': true,
  'together': true,
  'apart': true,
  'up': true,
  'down': true
};

//phrasal verbs are compound verbs like 'beef up'
var phrasals_step = function phrasals_step(ts) {
  log.here(path);
  for (var i = 1; i < ts.length; i++) {
    var t = ts.get(i);
    //is it a particle, like 'up'
    if (particles[t.normal]) {
      //look backwards
      var last = ts.get(i - 1);
      if (last.tag.Verb) {
        var inf = last.info('infinitive');
        if (phrasals[inf + ' ' + t.normal]) {
          t.tagAs('Particle', 'phrasalVerb-particle');
        }
      }
    }
  }
  return ts;
};

module.exports = phrasals_step;

},{"../paths":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/paths.js","./data/phrasal_verbs":"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/data/phrasal_verbs.js"}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/data/neighbours.js":[function(_dereq_,module,exports){
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
  to: 'Verb', //32%
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
  who: 'Noun' };

//following this POS, this is likely
var afterThisPos = {
  Adjective: 'Noun', //36% //blue dress
  Possessive: 'Noun', //41% //his song
  Determiner: 'Noun', //47%
  Adverb: 'Verb', //20%
  Person: 'Verb', //40%
  Pronoun: 'Verb', //40%
  Value: 'Noun', //47%
  Ordinal: 'Noun', //53%
  Modal: 'Verb', //35%
  Superlative: 'Noun', //43%
  Demonym: 'Noun', //38%
  Organization: 'Verb' };

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

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/data/phrasal_verbs.js":[function(_dereq_,module,exports){
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
  'lash into': true,
  'make do': true,
  'run across': true,
  'set upon': true,
  'take aback': true,
  'keep from': true
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
  'up': 'act,beef,board,bone,boot,brighten,build,buy,catch,cheer,cook,end,eye,face,fatten,feel,fess,finish,fire,firm,flame,flare,free,freeze,freshen,fry,fuel,gang,gear,goof,hack,ham,heat,hit,hole,hush,jazz,juice,lap,light,lighten,line,link,listen,live,loosen,make,mash,measure,mess,mix,mock,mop,muddle,open,own,pair,patch,pick,prop,psych,read,rough,rustle,save,shack,sign,size,slice,slip,snap,sober,spark,split,spruce,stack,start,stay,stir,stitch,straighten,string,suck,suit,sum,step,team,tee,think,tidy,tighten,toss,trade,trip,type,vacuum,wait,wake,warm,weigh,whip,wire,wise,word,write,zip'
};
Object.keys(asymmetric).forEach(function (k) {
  asymmetric[k].split(',').forEach(function (s) {
    main[s + ' ' + k];
  });
});

module.exports = main;

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/data/punct_rules.js":[function(_dereq_,module,exports){
'use strict';

//these are regexes applied to t.text, instead of t.normal
module.exports = [['^#[a-z]+$', 'HashTag'], ['[a-z]s\'$', 'Possessive'], ['^[0-9,\.]+$', 'Numeric'], //like 5
['[12]?[0-9](:[0-5][0-9])? ?(am|pm)', 'Time'], //4pm
['[12]?[0-9](:[0-5][0-9]) ?(am|pm)?', 'Time'], //4:00pm
['[PMCE]ST', 'Time'], //PST, time zone abbrevs
['utc ?[\+\-]?[0-9]\+?', 'Time'], //UTC 8+
['[a-z0-9]*? o\'?clock', 'Time']].map(function (a) {
  return {
    reg: new RegExp(a[0]),
    tag: a[1],
    str: a[0]
  };
});

},{}],"/home/spencer/mountain/nlp/nlp_compromise/src/parse/tagger/steps/data/word_rules.js":[function(_dereq_,module,exports){
'use strict';
//regex suffix patterns and their most common parts of speech,
//built using wordnet, by spencer kelly.

//the order here matters.

module.exports = [['^[0-9]+ ?(am|pm)$', 'Date'], ['[0-9](st|nd|rd|r?th)$', 'Ordinal'], //like 5th
['([0-9])([a-z]{1,2})$', 'Cardinal'], //like 5kg
['^[0-9,\.]+$', 'Cardinal'], //like 5
['^[a-z]et$', 'Verb'], ['cede$', 'Infinitive'], ['.[cts]hy$', 'Adjective'], ['.[st]ty$', 'Adjective'], ['.[lnr]ize$', 'Infinitive'], ['.[gk]y$', 'Adjective'], ['.fies$', 'PresentTense'], ['ities$', 'Plural'], ['.some$', 'Adjective'], ['.[nrtumcd]al$', 'Adjective'], ['.que$', 'Adjective'], ['.[tnl]ary$', 'Adjective'], ['.[di]est$', 'Superlative'], ['^(un|de|re)\\-[a-z]..', 'Verb'], ['.lar$', 'Adjective'], ['[bszmp]{2}y', 'Adjective'], ['.zes$', 'PresentTense'], ['.[icldtgrv]ent$', 'Adjective'], ['.[rln]ates$', 'PresentTense'], ['.[oe]ry$', 'Singular'], ['[rdntkbhs]ly$', 'Adverb'], ['.[lsrnpb]ian$', 'Adjective'], ['.[^aeiou]ial$', 'Adjective'], ['.[^aeiou]eal$', 'Adjective'], ['.[vrl]id$', 'Adjective'], ['.[ilk]er$', 'Comparative'], ['.ike$', 'Adjective'], ['.ends?$', 'Verb'], ['.wards$', 'Adverb'], ['.rmy$', 'Adjective'], ['.rol$', 'Singular'], ['.tors$', 'Noun'], ['.azy$', 'Adjective'], ['.where$', 'Adverb'], ['.ify$', 'Infinitive'], ['.bound$', 'Adjective'], ['.[^z]ens$', 'Verb'], ['.oid$', 'Adjective'], ['.vice$', 'Singular'], ['.rough$', 'Adjective'], ['.mum$', 'Adjective'], ['.teen(th)?$', 'Value'], ['.oses$', 'PresentTense'], ['.ishes$', 'PresentTense'], ['.ects$', 'PresentTense'], ['.tieth$', 'Ordinal'], ['.ices$', 'Plural'], ['.tage$', 'Infinitive'], ['.ions$', 'Plural'], ['.tion$', 'Singular'], ['.ean$', 'Adjective'], ['.[ia]sed$', 'Adjective'], ['.tized$', 'PastTense'], ['.llen$', 'Adjective'], ['.fore$', 'Adverb'], ['.ances$', 'Plural'], ['.gate$', 'Infinitive'], ['.nes$', 'PresentTense'], ['.less$', 'Adverb'], ['.ried$', 'Adjective'], ['.gone$', 'Adjective'], ['.made$', 'Adjective'], ['.ing$', 'Gerund'], //likely to be converted to adjective after lexicon pass
['.tures$', 'Plural'], ['.ous$', 'Adjective'], ['.ports$', 'Plural'], ['. so$', 'Adverb'], ['.ints$', 'Plural'], ['.[gt]led$', 'Adjective'], ['.lked$', 'PastTense'], ['.fully$', 'Adverb'], ['.*ould$', 'Modal'], ['^-?[0-9]+(.,[0-9]+)?$', 'Value'], ['[a-z]*\\-[a-z]*\\-', 'Adjective'], ['[a-z]\'s$', 'Noun'], ['.\'n$', 'Verb'], ['.\'re$', 'Copula'], ['.\'ll$', 'Modal'], ['.\'t$', 'Verb'], ['.tches$', 'PresentTense'], ['^https?\:?\/\/[a-z0-9]', 'Url'], //the colon is removed in normalisation
['^www\.[a-z0-9]', 'Url'], ['.ize$', 'Infinitive'], ['.[^aeiou]ise$', 'Infinitive'], ['.[aeiou]te$', 'Infinitive'], ['.ea$', 'Singular'], ['[aeiou][pns]er$', 'Singular'], ['.ia$', 'Noun'], ['.sis$', 'Singular'], ['.[aeiou]na$', 'Noun'], ['.[^aeiou]ity$', 'Singular'], ['.[^aeiou]ium$', 'Singular'], ['.[^aeiou][ei]al$', 'Adjective'], ['.ffy$', 'Adjective'], ['.[^aeiou]ic$', 'Adjective'], ['.(gg|bb|zz)ly$', 'Adjective'], ['.[aeiou]my$', 'Adjective'], ['.[^aeiou][ai]ble$', 'Adjective'], ['.[^aeiou]eable$', 'Adjective'], ['.[^aeiou]ful$', 'Adjective'], ['.[^aeiou]ish$', 'Adjective'], ['.[^aeiou]ica$', 'Singular'], ['[aeiou][^aeiou]is$', 'Singular'], ['[^aeiou]ard$', 'Singular'], ['[^aeiou]ism$', 'Singular'], ['.[^aeiou]ity$', 'Singular'], ['.[^aeiou]ium$', 'Singular'], ['.[lstrn]us$', 'Singular'], ['..ic$', 'Adjective'], ['[aeiou][^aeiou]id$', 'Adjective'], ['.[^aeiou]ish$', 'Adjective'], ['.[^aeiou]ive$', 'Adjective'], ['[ea]{2}zy$', 'Adjective'], ['[^aeiou]ician$', 'Actor'], ['.keeper$', 'Actor'], ['.logist$', 'Actor'], ['..ier$', 'Actor'], ['.[^aeiou][ao]pher$', 'Actor'], ['.tive$', 'Actor'], ['[aeiou].*ist$', 'Adjective'], ['[^i]fer$', 'Infinitive'], ['(bb|tt|gg|pp|ll|nn|mm)', 'Verb'], //rubbed
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
['^uh[ -]?oh$', 'Expression']].map(function (a) {
  return {
    reg: new RegExp(a[0]),
    tag: a[1],
    str: a[0]
  };
});

},{}]},{},["/home/spencer/mountain/nlp/nlp_compromise/src/index.js"])("/home/spencer/mountain/nlp/nlp_compromise/src/index.js")
});