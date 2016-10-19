/* nlp_compromise v7.1.2
   github.com/nlp-compromise
   MIT
*/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nlp_compromise = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
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

},{}],2:[function(_dereq_,module,exports){
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
},{"_process":1,"ansi-styles":3,"escape-string-regexp":4,"has-ansi":5,"strip-ansi":7,"supports-color":9}],3:[function(_dereq_,module,exports){
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

},{}],4:[function(_dereq_,module,exports){
'use strict';

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};

},{}],5:[function(_dereq_,module,exports){
'use strict';
var ansiRegex = _dereq_('ansi-regex');
var re = new RegExp(ansiRegex().source); // remove the `g` flag
module.exports = re.test.bind(re);

},{"ansi-regex":6}],6:[function(_dereq_,module,exports){
'use strict';
module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
};

},{}],7:[function(_dereq_,module,exports){
'use strict';
var ansiRegex = _dereq_('ansi-regex')();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};

},{"ansi-regex":8}],8:[function(_dereq_,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],9:[function(_dereq_,module,exports){
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
},{"_process":1}],10:[function(_dereq_,module,exports){
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
  ly: 'dai,deep,earth,gris,heaven,low,meas,melancho,month,oi,prick,seem,s,ug,unru,week,wi,woman',
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

var arr = ['ablaze', 'above', 'adult', 'ahead', 'aloof', 'arab', 'asleep', 'average', 'awake', 'backwards', 'bad', 'blank', 'bogus', 'bottom', 'brisk', 'cagey', 'chief', 'civil', 'common', 'complex', 'cozy', 'crisp', 'deaf', 'devout', 'difficult', 'downtown', 'due', 'dumb', 'eerie', 'evil', 'excess', 'extra', 'fake', 'far', 'faux', 'fierce ', 'final', 'fit', 'foreign', 'fun', 'good', 'goofy', 'gratis', 'grey', 'groovy', 'gross', 'half', 'huge', 'humdrum', 'inside', 'kaput', 'left', 'less', 'level', 'lewd', 'magenta', 'makeshift', 'mammoth', 'medium', 'modern', 'moot', 'naive', 'nearby', 'next', 'nonstop', 'north', 'notable', 'offbeat', 'ok', 'outside', 'overwrought', 'premium', 'pricey', 'pro', 'quaint', 'random', 'rear', 'rebel', 'ritzy', 'rough', 'savvy', 'sexy', 'shut', 'shy', 'sleek', 'smug', 'solemn', 'south', 'stark', 'superb', 'taboo', 'teenage', 'top', 'tranquil', 'true', 'ultra', 'understood', 'unfair', 'unknown', 'upbeat', 'upstairs', 'vanilla', 'various', 'widespread', 'woozy', 'wrong'];

module.exports = fns.uncompress_suffixes(arr, compressed);

},{"../fns":14}],11:[function(_dereq_,module,exports){
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
var arr = ['absurd', 'aggressive', 'alert', 'alive', 'angry', 'attractive', 'awesome', 'beautiful', 'big', 'bitter', 'black', 'blue', 'bored', 'boring', 'brash', 'brave', 'brief', 'bright', 'broad', 'brown', 'calm', 'charming', 'cheap', 'check', 'clean', 'clear', 'close', 'cold', 'cool', 'cruel', 'curly', 'cute', 'damp', 'dangerous', 'dark', 'dead', 'dear', 'deep', 'dirty', 'drunk', 'dry', 'dull', 'eager', 'early', 'easy', 'efficient', 'empty', 'even', 'extreme', 'faint', 'fair', 'fanc', 'fast', 'fat', 'feeble', 'few', 'fierce', 'fine', 'firm', 'flat', 'forgetful', 'formal', 'frail', 'free', 'fresh', 'full', 'funny', 'gentle', 'glad', 'glib', 'grand', 'great', 'green', 'gruesome', 'handsome', 'happy', 'hard', 'harsh', 'heavy', 'high', 'hollow', 'hot', 'hungry', 'impolite', 'important', 'innocent', 'intellegent', 'interesting', 'keen', 'kind', 'lame', 'large', 'late', 'lean', 'light', 'little', 'long', 'loose', 'loud', 'low', 'lucky', 'lush', 'macho', 'mad', 'mature', 'mean', 'meek', 'mellow', 'mundane', 'narrow', 'near', 'neat', 'new', 'nice', 'noisy', 'normal', 'odd', 'old', 'orange', 'pale', 'pink', 'plain', 'poor', 'proud', 'pure', 'purple', 'quick', 'quiet', 'rapid', 'rare', 'raw', 'red', 'rich', 'ripe', 'rotten', 'round', 'rude', 'sad', 'safe', 'scarce', 'scared', 'shallow', 'sharp', 'short', 'shrill', 'simple', 'slim', 'slow', 'small', 'smart', 'smooth', 'soft', 'solid', 'soon', 'sore', 'sour', 'square', 'stale', 'steep', 'stiff', 'straight', 'strange', 'strict', 'strong', 'sweet', 'swift', 'tall', 'tame', 'tart', 'tender', 'tense', 'thick', 'thin', 'thirsty', 'tight', 'tired', 'tough', 'true', 'vague', 'vast', 'vulgar', 'warm', 'weak', 'weird', 'wet', 'white', 'wide', 'wild', 'windy', 'wise', 'yellow', 'young'];

module.exports = fns.uncompress_suffixes(arr, compressed);

},{"../fns":14}],12:[function(_dereq_,module,exports){
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

var relative = ['yesterday', 'today', 'tomorrow',
// 'week',
'weekend', 'tonight'];

module.exports = {
  days: days,
  months: months,
  durations: durations,
  relative: relative
};

},{}],13:[function(_dereq_,module,exports){
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

},{}],14:[function(_dereq_,module,exports){
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

},{}],15:[function(_dereq_,module,exports){
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
  'nouns': _dereq_('./nouns/nouns'),

  'organizations': _dereq_('./organizations/organizations'),
  'sportsTeams': _dereq_('./organizations/sportsTeams'),
  'bands': _dereq_('./organizations/bands'),
  'orgWords': _dereq_('./organizations/orgWords'),

  'adjectives': _dereq_('./adjectives/adjectives'),
  'superlatives': _dereq_('./adjectives/convertable'),

  'irregular_verbs': _dereq_('./verbs/irregular_verbs'),
  'verbs': _dereq_('./verbs/verbs'),

  'misc': _dereq_('./misc/misc')
};

},{"./adjectives/adjectives":10,"./adjectives/convertable":11,"./dates/dates":12,"./dates/holidays":13,"./misc/misc":20,"./nouns/abbreviations":22,"./nouns/demonyms":23,"./nouns/irregular_plurals":24,"./nouns/nouns":25,"./nouns/places":26,"./nouns/professions":27,"./nouns/uncountables":28,"./organizations/bands":29,"./organizations/orgWords":30,"./organizations/organizations":31,"./organizations/sportsTeams":32,"./people/firstnames":35,"./values/currencies":37,"./values/numbers":38,"./values/ordinalMap":39,"./values/units":40,"./verbs/irregular_verbs":41,"./verbs/verbs":43}],16:[function(_dereq_,module,exports){
'use strict';
//a lexicon is a giant object of known words

var data = _dereq_('./index');
var fns = _dereq_('./fns');
var Term = _dereq_('../term');

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
//let a rip
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
addArr(data.dates.days, 'Day');
addArr(data.dates.months, 'Month');
addArr(data.dates.relative, 'Date');
addArr(data.holidays, 'Holiday');

addArr(data.professions, 'Actor'); //?
addArr(data.demonyms, 'Demonym');
addArr(data.sportsTeams, 'SportsTeam');
addArr(data.bands, 'Organization');
addArr(data.orgWords, 'Noun');

var units = data.units.words.filter(function (s) {
  return s.length > 1;
});
addArr(units, 'Unit');
addArr(data.dates.durations, 'Duration');

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
  var o = t.verb.conjugate() || {};
  wantVerbs.forEach(function (k) {
    if (o[k] && !lexicon[o[k]]) {
      lexicon[o[k]] = k;
    }
  });
});

//conjugate adjectives
data.superlatives.forEach(function (a) {
  var t = new Term(a);
  t.tag.Adjective = true;
  var o = t.adjective.conjugate || {};
  Object.keys(o).forEach(function (k) {
    if (o[k] && !lexicon[o[k]]) {
      lexicon[o[k]] = k;
    }
  });
});

//inflect nouns
data.nouns.forEach(function (n) {
  lexicon[n] = 'Singular';
  var t = new Term(n);
  t.tag.Noun = true;
  var plural = t.noun.toPlural();
  lexicon[plural] = 'Plural';
});

//let a rip.
addArr(data.verbs, 'Verb');
addObj(data.firstnames);
addArr(data.places.airports, 'Place');
addArr(data.places.cities, 'City');
addArr(data.places.countries, 'Country');
addArr(data.uncountables, 'Noun');
addArr(data.organizations, 'Organization');
addArr(data.adjectives, 'Adjective');
addArr(data.superlatives, 'Adjective');
addArr(data.currencies, 'Currency');
//these ad-hoc manual ones have priority
addObj(data.misc);

//for safety (these are sneaky)
delete lexicon[''];
delete lexicon[' '];
delete lexicon[null];
module.exports = lexicon;

// console.log(lexicon['april fools']);
// let t = new Term('shake');
// t.tag.Verb = true;
// console.log(t.verb.conjugate())

},{"../term":109,"./fns":14,"./index":15}],17:[function(_dereq_,module,exports){
'use strict';

module.exports = [
// 'now',
'a lot', 'a posteriori', 'abroad', 'ad nauseam', 'again', 'all but', 'all that', 'almost', 'alone', 'already', 'also', 'always', 'anymore', 'anyway', 'apart', 'aside', 'at best', 'at large', 'at least', 'at most', 'at worst', 'away', 'by far', 'by now', 'damn', 'de jure', 'de trop', 'directly', 'en masse', 'ever', 'for example', 'for good', 'for sure', 'forever', 'further', 'furthermore', 'hence', 'indeed', 'instead', 'just', 'just about', 'kinda', 'maybe', 'meanwhile', 'more', 'moreover', 'newly', 'no longer', 'not withstanding', 'of course', 'often', 'once', 'once again', 'once more', 'only', 'par excellence', 'per se', 'perhaps', 'point blank', 'quite', 'randomly', 'rather', 'really', 'several', 'so', 'somehow', 'sometimes', 'somewhat', 'soon', 'sort of', 'such', 'then', 'thus', 'too', 'totally', 'toward', 'twice', 'up to', 'upwards of', 'very', 'way', 'well', 'yes'];

},{}],18:[function(_dereq_,module,exports){
'use strict';

module.exports = ['this', 'any', 'enough', 'each', 'whatever', 'every', 'these', 'another', 'plenty', 'whichever', 'neither', 'an', 'a', 'least', 'own', 'few', 'both', 'those', 'the', 'that', 'various', 'either', 'much', 'some', 'else',
//some other languages (what could go wrong?)
'la', 'le', 'les', 'des', 'de', 'du', 'el'];

},{}],19:[function(_dereq_,module,exports){
'use strict';

module.exports = ['uh', 'uhh', 'uh huh', 'uh-oh', 'please', 'ugh', 'sheesh', 'eww', 'pff', 'voila', 'oy', 'hi', 'hello', 'bye', 'goodbye', 'hey', 'hai', 'eep', 'hurrah', 'yuck', 'ow', 'duh', 'oh', 'hmm', 'yeah', 'whoa', 'ooh', 'whee', 'ah', 'bah', 'gah', 'yaa', 'phew', 'gee', 'ahem', 'eek', 'meh', 'yahoo', 'oops', 'd\'oh', 'psst', 'argh', 'grr', 'nah', 'shhh', 'whew', 'mmm', 'ooo', 'yay', 'uh-huh', 'boo', 'wow', 'nope', 'haha', 'hahaha', 'lol', 'lols', 'ya', 'hee', 'ohh', 'eh', 'yup', 'et cetera', 'a la'];

},{}],20:[function(_dereq_,module,exports){
'use strict';

var misc = {
  'here': 'Noun',
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
  'not': 'Negative',
  'never': 'Negative',
  'no': 'Negative',
  'no doubt': 'Noun',
  'not only': 'Adverb'
};

var compact = {
  Adjective: ['so called', //?
  'on board', 'vice versa', 'en route', 'upside down', 'up front', 'in front', 'in situ', 'in vitro', 'ad hoc', 'de facto', 'ad infinitum', 'for keeps', 'a priori', 'off guard', 'spot on', 'ipso facto', 'fed up', 'brand new', 'old fashioned', 'bona fide', 'well off', 'far off', 'straight forward', 'hard up', 'sui generis', 'en suite', 'avant garde', 'sans serif', 'gung ho', 'super duper'],

  Place: ['new england', 'new hampshire', 'new jersey', 'new mexico', 'united states', 'united kingdom', 'great britain', 'great lakes', 'pacific ocean', 'atlantic ocean', 'indian ocean', 'arctic ocean', 'antarctic ocean', 'everglades'],
  //conjunctions
  'Conjunction': ['yet', 'therefore', 'or', 'while', 'nor', 'whether', 'though', 'because', 'cuz', 'but', 'for', 'and', 'however', 'before', 'although', 'how', 'plus', 'versus', 'otherwise'],
  Time: [
  //date
  'noon', 'midnight', 'now', 'morning', 'evening', 'afternoon', 'night', 'breakfast time', 'lunchtime', 'dinnertime', 'ago', 'sometime', 'eod', 'oclock'],
  Date: [
  //end of day, end of month
  'eom', 'standard time', 'daylight time'],
  'Condition': ['if', 'unless', 'notwithstanding'],

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

},{"./adverbs":17,"./determiners":18,"./expressions":19,"./prepositions":21}],21:[function(_dereq_,module,exports){
'use strict';

module.exports = ['\'o', 'a\'', 'about', 'across', 'after', 'along', 'amid', 'amidst', 'among', 'amongst', 'apropos', 'around', 'as', 'as long as', 'at', 'atop', 'barring', 'below', 'besides', 'between', 'by', 'chez', 'circa', 'despite', 'down', 'during', 'except', 'from', 'in', 'into', 'just like', 'mid', 'midst', 'notwithstanding', 'o\'', 'of', 'off', 'on', 'onto', 'out', 'per', 'qua', 'sans', 'since', 'so that', 'than', 'through', 'throughout', 'thru', 'till', 'to', 'towards', 'unless', 'unlike', 'until', 'up', 'upon', 'versus', 'via', 'vis-a-vis', 'w/o', 'whereas', 'with', 'within', 'without'];

},{}],22:[function(_dereq_,module,exports){
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
  Honourific: ['adj', 'adm', 'adv', 'asst', 'atty', 'bldg', 'brig', 'capt', 'cmdr', 'comdr', 'cpl', 'det', 'dr', 'esq', 'gen', 'gov', 'hon', 'jr', 'llb', 'lt', 'maj', 'messrs', 'mister', 'mlle', 'mme', 'mr', 'mrs', 'ms', 'mstr', 'op', 'ord', 'phd', 'prof', 'pvt', 'rep', 'reps', 'res', 'rev', 'sen', 'sens', 'sfc', 'sgt', 'sir', 'sr', 'supt', 'surg'
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

},{}],23:[function(_dereq_,module,exports){
'use strict';

//adjectival forms of place names, as adjectives.
module.exports = ['afghan', 'albanian', 'algerian', 'angolan', 'argentine', 'armenian', 'australian', 'aussie', 'austrian', 'bangladeshi', 'basque', // of Basque Country
'belarusian', 'belgian', 'bolivian', 'bosnian', 'brazilian', 'bulgarian', 'cambodian', 'cameroonian', 'canadian', 'chadian', 'chilean', 'chinese', 'colombian', 'congolese', 'croatian', 'cuban', 'czech', 'dominican', 'danish', 'egyptian', 'british', 'estonian', 'ethiopian', 'ecuadorian', 'finnish', 'french', 'gambian', 'georgian', 'german', 'greek', 'ghanaian', 'guatemalan', 'haitian', 'hungarian', 'honduran', 'icelandic', 'indian', 'indonesian', 'iranian', 'iraqi', 'irish', 'israeli', 'italian', 'ivorian', // of Ivory Coast
'jamaican', 'japanese', 'jordanian', 'kazakh', 'kenyan', 'korean', 'kuwaiti', 'lao', // of Laos
'latvian', 'lebanese', 'liberian', 'libyan', 'lithuanian', 'namibian', 'malagasy', // of Madagascar
'macedonian', 'malaysian', 'mexican', 'mongolian', 'moroccan', 'dutch', 'nicaraguan', 'nigerian', // of Nigeria
'nigerien', // of Niger
'norwegian', 'omani', 'panamanian', 'paraguayan', 'pakistani', 'palestinian', 'peruvian', 'philippine', 'filipino', 'polish', 'portuguese', 'qatari', 'romanian', 'russian', 'rwandan', 'samoan', 'saudi', 'scottish', 'senegalese', 'serbian', 'singaporean', 'slovak', 'somalian', 'sudanese', 'swedish', 'swiss', 'syrian', 'taiwanese', 'trinidadian', 'thai', 'tunisian', 'turkmen', 'ugandan', 'ukrainian', 'american', 'hindi', 'spanish', 'venezuelan', 'vietnamese', 'welsh', 'zambian', 'zimbabwean', 'english', 'african', 'european', 'asian', 'californian'];

},{}],24:[function(_dereq_,module,exports){
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

},{}],25:[function(_dereq_,module,exports){
'use strict';

module.exports = ['ad hominem', 'banking', 'body', 'breakfast', 'ceiling', 'city', 'credit card', 'death', 'dinner', 'door', 'economy', 'energy', 'event', 'everything', 'example', 'fl oz', 'friend', 'funding', 'god', 'grand slam', 'head start', 'home', 'house', 'lunch', 'nothing', 'number', 'others', 'part', 'patent', 'problem', 'purpose', 'room', 'student', 'stuff', 'super bowl', 'system', 'there', 'thing', 'things', 'tragedy', 'us dollar', 'world', 'world series'];

},{}],26:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');

//uncompressed country names
var countries = ['bahamas', 'bangladesh', 'belgium', 'brazil', 'burkina faso', 'burundi', 'cape verde', 'chile', 'comoros', 'congo-brazzaville', 'cuba', 'cote d\'ivoire', 'denmark', 'djibouti', 'ecuador', 'egypt', 'el salvador', 'fiji', 'france', 'germany', 'greece', 'guinea-bissau', 'haiti', 'honduras', 'hungary', 'iraq', 'israel', 'italy', 'jamaica', 'kenya', 'kuwait', 'laos', 'lesotho', 'libya', 'luxembourg', 'malawi', 'mali', 'malta', 'mexico', 'moldova', 'morocco', 'mozambique', 'netherlands', 'nicaragua', 'niger', 'panama', 'peru', 'solomon islands', 'sri lanka', 'suriname', 'sweden', 'timor-leste', 'turkey', 'u.s.a.', 'united kingdom', 'usa', 'ussr', 'vietnam', 'yemen', 'zimbabwe'];
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
var cities = ['aalborg', 'abu dhabi', 'ahmedabad', 'almaty', 'antwerp', 'aqaba', 'ashdod', 'ashgabat', 'athens', 'auckland', 'bogota', 'brno', 'brussels', 'calgary', 'cape town', 'cebu', 'cluj-napoca', 'curitiba', 'doha', 'dushanbe', 'espoo', 'frankfurt', 'genoa', 'ghent', 'giza', 'graz', 'guangzhou', 'haifa', 'hanoi', 'helsinki', 'ho chi minh', 'homs', 'iasi', 'innsbruck', 'i̇zmir', 'jakarta', 'kiev', 'kingston', 'klaipėda', 'kobe', 'kosice', 'krakow', 'la plata', 'luxembourg', 'medellín', 'mexico', 'miskolc', 'montevideo', 'montreal', 'moscow', 'nagoya', 'nis', 'odessa', 'oslo', 'ottawa', 'palermo', 'paris', 'perth', 'phnom penh', 'phoenix', 'port elizabeth', 'poznan', 'prague', 'reykjavik', 'riga', 'rome', 'rosario', 'seville', 'skopje', 'stockholm', 'stuttgart', 'sydney', 'tbilisi', 'tegucigalpa', 'the hague', 'thessaloniki', 'tokyo', 'toulouse', 'trondheim', 'tunis', 'turku', 'utrecht', 'vantaa', 'vasteras', 'warsaw', 'winnipeg', 'wroclaw', 'zagreb', 'zaragoza'];

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
  ur: 'kuala lump,winterth,kopavog',
  ch: 'muni,zuri,christchur',
  na: 'barcelo,vien,var',
  ma: 'yokoha,li',
  ul: 'istanb,seo,kab',
  to: 'toron,qui,por',
  iv: 'khark,lv,tel av',
  sk: 'dnipropetrov,gdan,min'
};

cities = fns.uncompress_suffixes(cities, suffix_compressed_cities);

var prefix_compressed_cities = {
  'new ': 'delhi,york,taipei',
  san: 'a\'a,tiago, josé',
  ta: 'ipei,mpere,llinn,rtu',
  ba: 'ngalore,ngkok,ku,sel',
  li: 'verpool,ège,nz,massol',
  ma: 'rseille,ndalay,drid,lmo',
  be: 'rn,lgrade,irut',
  ka: 'rachi,raj,ndy',
  da: 'egu,kar,ugavpils',
  ch: 'icago,arleroi,ișinau',
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

},{"../fns":14}],27:[function(_dereq_,module,exports){
'use strict';

//professions 'lawyer' that aren't covered by verb.to_actor()

module.exports = ['accountant', 'administrator', 'advisor', 'agent', 'architect', 'artist', 'assistant', 'attendant', 'bricklayer', 'butcher', 'carpenter', 'clerk', 'deputy', 'dietician', 'engineer', 'farmer', 'firefighter', 'fireman', 'gardener', 'getor', 'hairdresser', 'housekeeper', 'instructor', 'journalist', 'lawyer', 'mechanic', 'minister', 'musician', 'nurse', 'officer', 'operator', 'photographer', 'plumber', 'policeman', 'politician', 'practitioner', 'president', 'programmer', 'psychologist', 'receptionist', 'researcher', 'roofer', 'sailor', 'scientist', 'secretary', 'security guard', 'soldier', 'supervisor', 'surgeon', 'technician', 'therapist'];

},{}],28:[function(_dereq_,module,exports){
'use strict';

//common nouns that have no plural form. These are suprisingly rare
//used in noun.inflect(), and added as nouns in lexicon
module.exports = ['advice', 'aircraft', 'art', 'baggage', 'bass', 'beef', 'bison', 'blood', 'bread', 'butter', 'cake', 'cash', 'celcius', 'chaos', 'cheese', 'chewing', 'civics', 'clothing', 'coal', 'coffee', 'conduct', 'confusion', 'cotton', 'currency', 'economics', 'education', 'electricity', 'enjoyment', 'entertainment', 'equipment', 'ethics', 'everybody', 'everyone', 'fahrenheit', 'fiction', 'fish', 'flour', 'food', 'forgiveness', 'fowl', 'fruit', 'fun', 'furniture', 'gold', 'golf', 'gossip', 'grass', 'ground', 'gum', 'gymnastics', 'hair', 'halibut', 'happiness', 'hertz', 'history', 'hockey', 'homework', 'honey', 'hospitality', 'ice', 'impatience', 'importance', 'information', 'itself', 'jewelry', 'justice', 'kelvin', 'knowledge', 'laughter', 'leather', 'leisure', 'lightning', 'liquid', 'literature', 'luck', 'luggage', 'machinery', 'mail', 'mathematics', 'measles', 'meat', 'milk', 'mist', 'money', 'moose', 'mumps', 'music', 'news', 'noise', 'oil', 'oxygen', 'paper', 'patience', 'peace', 'peanut', 'pepper', 'petrol', 'physics', 'plastic', 'pork', 'power', 'pressure', 'progress', 'rain', 'recognition', 'recreation', 'relaxation', 'research', 'rice', 'sadness', 'safety', 'salmon', 'salt', 'sand', 'scenery', 'series', 'sheep', 'shopping', 'silk', 'silver', 'snow', 'soap', 'soccer', 'softness', 'space', 'spacecraft', 'species', 'speed', 'steam', 'steel', 'sugar', 'sunshine', 'tea', 'tennis', 'thunder', 'time', 'toothpaste', 'traffic', 'trouble', 'trousers', 'trout', 'tuna', 'vinegar', 'violence', 'warmth', 'water', 'weather', 'wildlife', 'wine', 'wood', 'wool'];

},{}],29:[function(_dereq_,module,exports){
'use strict';

module.exports = ['abba', 'ac/dc', 'aerosmith', 'bee gees', 'coldplay', 'creedence clearwater revival', 'def leppard', 'depeche mode', 'destiny\'s child', 'duran duran', 'fleetwood mac', 'green day', 'guns n roses', 'joy division', 'metallica', 'moody blues', 'motley crue', 'new kids on the block', 'pink floyd', 'r.e.m.', 'radiohead', 'red hot chili peppers', 'sex pistols', 'soundgarden', 'spice girls', 'the beach boys', 'the beatles', 'the black eyed peas', 'the byrds', 'the carpenters', 'the guess who', 'the hollies', 'the rolling stones', 'the smashing pumpkins', 'the supremes', 'the who', 'thin lizzy', 'u2', 'van halen'];

},{}],30:[function(_dereq_,module,exports){
'use strict';

//nouns that also signal the title of an unknown organization
//todo remove/normalize plural forms
module.exports = ['administration', 'agence', 'agences', 'agencies', 'agency', 'aircraft', 'airlines', 'airways', 'army', 'assoc', 'associates', 'association', 'assurance', 'authority', 'autorite', 'aviation', 'bank', 'banque', 'board', 'boys', 'brands', 'brewery', 'brotherhood', 'brothers', 'building society', 'bureau', 'cafe', 'caisse', 'capital', 'care', 'cathedral', 'center', 'central bank', 'centre', 'chemicals', 'choir', 'chronicle', 'church', 'circus', 'clinic', 'clinique', 'club', 'co', 'coalition', 'coffee', 'collective', 'college', 'commission', 'committee', 'communications', 'community', 'company', 'comprehensive', 'computers', 'confederation', 'conference', 'conseil', 'consulting', 'containers', 'corporation', 'corps', 'council', 'crew', 'daily news', 'data', 'departement', 'department', 'department store', 'departments', 'design', 'development', 'directorate', 'division', 'drilling', 'education', 'eglise', 'electric', 'electricity', 'energy', 'ensemble', 'enterprise', 'enterprises', 'entertainment', 'estate', 'etat', 'evening news', 'faculty', 'federation', 'financial', 'fm', 'foundation', 'fund', 'gas', 'gazette', 'general', 'girls', 'government', 'group', 'guild', 'health authority', 'herald', 'holdings', 'hospital', 'hotel', 'hotels', 'inc', 'industries', 'institut', 'institute', 'institute of technology', 'institutes', 'insurance', 'international', 'interstate', 'investment', 'investments', 'investors', 'journal', 'laboratory', 'labs', 'law', 'liberation army', 'limited', 'local authority', 'local health authority', 'machines', 'magazine', 'management', 'marine', 'marketing', 'markets', 'media', 'memorial', 'mercantile exchange', 'ministere', 'ministry', 'mobile', 'motor', 'motors', 'musee', 'museum',
// 'network',
'news', 'news service', 'observatory', 'office', 'oil', 'optical', 'orchestra', 'organization', 'partners', 'partnership',
// 'party',
'people\'s party', 'petrol', 'petroleum', 'pharmacare', 'pharmaceutical', 'pharmaceuticals', 'pizza', 'plc', 'police', 'polytechnic', 'post', 'power', 'press', 'productions', 'quartet', 'radio', 'records', 'regional authority', 'regional health authority', 'reserve', 'resources', 'restaurant', 'restaurants', 'savings', 'school', 'securities', 'service', 'services', 'social club', 'societe', 'society', 'sons', 'standard', 'state police', 'state university', 'stock exchange', 'subcommittee', 'syndicat', 'systems', 'technologies', 'technology', 'telecommunications', 'telegraph', 'television', 'times', 'tribunal', 'tv', 'union', 'university', 'utilities', 'workers'];

},{}],31:[function(_dereq_,module,exports){
'use strict';
//just a few named-organizations
//no acronyms needed. no product/brand pollution.

module.exports = ['20th century fox', '3m', '7-eleven', 'abc', 'academy of sciences', 'acer', 'activision', 'adidas', 'aig', 'al qaeda', 'al jazeera', 'alcatel', 'alcatel-lucent', 'altair', 'amc', 'amd', 'american express', 'amt', 'amtrak', 'anheuser-busch', 'aol', 'apple computers', 'applebee\'s', 'arby\'s', 'argos', 'armco', 'ashland oil', 'associated press', 'at&t', 'avis', 'avon', 'ayer', 'banana republic', 'basf', 'baskin robbins', 'baxter', 'bayer', 'bbc', 'bechtel', 'ben & jerry\'s', 'berkshire hathaway', 'bf goodrich', 'bfgoodrich', 'black & decker', 'blockbuster video', 'bloomingdale', 'blue cross', 'bmw', 'bni', 'boeing', 'bombardier', 'boston globe', 'boston pizza', 'bp', 'cadbury', 'carl\'s jr', 'cbc', 'chevron', 'chevy', 'chick fil-a', 'china daily', 'cisco', 'cisco systems', 'citigroup', 'cnn', 'coca cola', 'colgate', 'comcast', 'compaq', 'coors', 'costco', 'craigslist', 'daimler', 'dell', 'der spiegel', 'disney', 'dow jones', 'dunkin donuts', 'dupont', 'ebay', 'esa', 'eu', 'exxon mobil', 'exxonmobil', 'facebook', 'fannie mae', 'fedex', 'fiat', 'financial times', 'firestone', 'ford', 'frito-lay', 'g8', 'general electric', 'general motors', 'glaxo smith kline', 'glencore', 'goldman sachs', 'goodyear', 'google', 'gucci', 'h & m', 'hasbro', 'hewlett-packard', 'hitachi', 'hizbollah', 'home depot', 'honda', 'hsbc', 'hyundai', 'ibm', 'ihop', 'ing', 'intel', 'interpol', 'itv', 'jiffy lube', 'johnson & johnson', 'jpmorgan', 'jpmorgan chase', 'jsa', 'katv', 'kfc', 'kkk', 'kmart', 'kodak', 'l\'oreal', 'la presse', 'la-z-boy', 'lenovo', 'lexis', 'lexmark', 'lg', 'little caesars', 'mac\'s milk', 'mattel', 'mazda', 'mcdonald\'s', 'mcdonalds', 'mercedes', 'mercedes-benz', 'microsoft', 'mitas', 'mitsubishi', 'mlb', 'mobil', 'monsanto', 'motel 6', 'motorola', 'mtv', 'myspace', 'nandos', 'nascar', 'nasdaq', 'national academy of sciences', 'nato', 'natwest', 'nba', 'nbc', 'nestle', 'nestlé', 'netflix', 'new york times', 'newsweek', 'nfl', 'nhl', 'nhs', 'nike', 'nintendo', 'nissan', 'nokia', 'notre dame', 'novartis', 'nwa', 'old navy', 'opec', 'orange julius', 'oxfam', 'pan am', 'panasonic', 'panda express', 'pbs', 'pepsico', 'petrobras', 'petrochina', 'petronas', 'peugeot', 'pfizer', 'philip morris', 'pizza hut', 'premier oil', 'procter & gamble', 'prudential', 'quantas', 'quizno\'s', 'rbc', 'rbs', 're/max', 'readers digest', 'red bull', 'red cross', 'red lobster', 'revlon', 'royal bank', 'royal dutch shell', 'ryanair', 'safeway', 'sainsbury\'s', 'samsung', 'sears', 'siemens', 'sony', 'starbucks', 'statoil', 'subaru', 't mobile', 'taco bell', 'td bank', 'telefonica', 'telus', 'tesco', 'tesla motors', 'tgi fridays', 'the daily mail', 'tim hortons', 'tmz', 'toshiba', 'toyota', 'toys r us', 'twitter', 'ubs', 'unesco', 'unilever', 'united nations', 'ups', 'usa today', 'usps', 'verizon', 'vh1', 'visa', 'vodafone', 'volkswagen', 'volvo', 'wal-mart', 'walgreens', 'wall street journal', 'walmart', 'warner bros', 'wells fargo', 'westfield', 'westinghouse', 'world trade organization', 'yahoo!', 'yamaha', 'ymca', 'youtube', 'ywca'];

},{}],32:[function(_dereq_,module,exports){
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

},{}],33:[function(_dereq_,module,exports){
'use strict';

//names commonly used in either gender
module.exports = ['casey', 'jamie', 'lee', 'jaime', 'jessie', 'morgan', 'rene', 'robin', 'devon', 'kerry', 'alexis', 'guadalupe', 'blair', 'kasey', 'jean', 'marion', 'aubrey', 'shelby', 'jan', 'shea', 'jade', 'kenyatta', 'kelsey', 'shay', 'lashawn', 'trinity', 'regan', 'jammie', 'cassidy', 'cheyenne', 'reagan', 'shiloh', 'marlo', 'andra', 'devan', 'rosario', 'lee'];

},{}],34:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');

//the unique/uncompressed names..
var arr = ['abby', 'amy', 'bobbi', 'brooke', 'carol', 'cheryl', 'claire', 'cleo', 'consuelo', 'eleanor', 'eliza', 'erika', 'faye', 'fern', 'genevieve', 'gertrude', 'gladys', 'inez', 'ingrid', 'jenny', 'jo', 'joni', 'kathryn', 'kelli', 'kim', 'latoya', 'leigh', 'lupe', 'luz', 'lynn', 'mae', 'maude', 'mildred', 'miriam', 'naomi', 'nikki', 'olga', 'reba', 'robyn', 'rosalind', 'ruth', 'sheryl', 'socorro', 'sonja', 'staci', 'tanya', 'therese', 'toni', 'traci', 'vicki', 'vicky'];

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

},{"../fns":14}],35:[function(_dereq_,module,exports){
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

},{"./ambiguous":33,"./female":34,"./male":36}],36:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');

//the unique/uncompressed names..
var arr = ['adolfo', 'angelo', 'anthony', 'armand', 'arthur', 'bill', 'billy', 'bobby', 'bradford', 'bret', 'caleb', 'carroll', 'cliff', 'clifford', 'craig', 'curt', 'derek', 'doug', 'dwight', 'edmund', 'eli', 'elliot', 'enrique', 'erik', 'felipe', 'felix', 'francisco', 'frank', 'george', 'glenn', 'greg', 'gregg', 'hans', 'hugh', 'ira', 'irving', 'isaac', 'jim', 'kermit', 'kurt', 'leo', 'levi', 'lorenzo', 'lou', 'pablo', 'pat', 'percy', 'philip', 'phillip', 'rex', 'ricky', 'shaun', 'shawn', 'sterling', 'steve', 'tim', 'timothy', 'wilbur', 'williams', 'woodrow'];

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

},{"../fns":14}],37:[function(_dereq_,module,exports){
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

},{}],38:[function(_dereq_,module,exports){
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

},{}],39:[function(_dereq_,module,exports){
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

},{"./numbers":38}],40:[function(_dereq_,module,exports){
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

},{}],41:[function(_dereq_,module,exports){
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
    Actor: 'beater',
    Participle: 'beaten'

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

Object.keys(participles).forEach(function (inf) {
  irregular[inf] = irregular[inf] || {};
  irregular[inf].Participle = participles[inf];
});

module.exports = irregular;

},{"./participles":42}],42:[function(_dereq_,module,exports){
'use strict';

//particples are a bit like past-tense
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
  'bought': 'bought',
  'caught': 'caught',
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
  'forgot': 'forgotten',
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

},{}],43:[function(_dereq_,module,exports){
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
var arr = ['abandon', 'accept', 'add', 'added', 'adopt', 'aid', 'appeal', 'applaud', 'archive', 'ask', 'assign', 'associate', 'assume', 'attempt', 'avoid', 'become', 'bomb', 'cancel', 'claim', 'claw', 'come', 'control', 'convey', 'cook', 'copy', 'cut', 'deem', 'defy', 'deny', 'describe', 'design', 'destroy', 'die', 'divide', 'do', 'doubt', 'drag', 'drift', 'drop', 'echo', 'embody', 'enjoy', 'envy', 'excel', 'fail', 'fix', 'float', 'flood', 'focus', 'fold', 'get', 'goes', 'grab', 'grasp', 'grow', 'happen', 'head', 'help', 'hold fast', 'hope', 'include', 'instruct', 'join', 'keep', 'know', 'learn', 'let', 'lift', 'link', 'load', 'loan', 'look', 'make due', 'mark', 'melt', 'minus', 'multiply', 'name', 'need', 'occur', 'overcome', 'overlap', 'overwhelm', 'owe', 'pay', 'plan', 'plug', 'plus', 'pop', 'pour', 'proclaim', 'put', 'rank', 'reason', 'reckon', 'relax', 'repair', 'reply', 'reveal', 'revel', 'risk', 'rub', 'ruin', 'sail', 'seek', 'seem', 'send', 'set', 'shout', 'sleep', 'sneak', 'sort', 'spoil', 'stem', 'step', 'stop', 'study', 'take', 'talk', 'thank', 'took', 'trade', 'transfer', 'trap', 'travel', 'tune', 'undergo', 'undo', 'uplift', 'walk', 'watch', 'win', 'wipe', 'work', 'yawn', 'yield'];

module.exports = fns.uncompress_suffixes(arr, compressed);

},{"../fns":14}],44:[function(_dereq_,module,exports){
'use strict';
// typeof obj == "function" also works
// but not in older browsers. :-/

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

},{}],45:[function(_dereq_,module,exports){
'use strict';

var parse = _dereq_('./parse');

var nlp = function nlp(str, context) {
  return parse(str, context);
};

module.exports = nlp;

},{"./parse":52}],46:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

},{"../fns":44,"chalk":2}],47:[function(_dereq_,module,exports){
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

},{"../data/index":15,"../fns":44}],48:[function(_dereq_,module,exports){
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

},{}],49:[function(_dereq_,module,exports){
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
  ts = step.comma_step(ts);
  ts = step.possessive_step(ts);
  ts = step.value_step(ts);
  //lump a couple times, for long ones
  for (var i = 0; i < 3; i++) {
    ts = lumper.lump_three(ts);
    ts = lumper.lump_two(ts);
  }
  // for(let i = 0; i < ts.terms.length; i++) {
  // ts.terms[i].normalize();
  // }
  return ts;
};

module.exports = tagger;

},{"./tagger":62}],50:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('./tagger/paths').log;
var path = 'correction';
//
var corrections = function corrections(r) {
  log.here(path);

  //the word 'so'
  //so funny
  r.match('so #Adjective').match('so').tag('Adverb');
  //so the
  r.match('so #Noun').match('so').tag('Conjunction');
  //do so
  r.match('do so').match('so').tag('Noun');
  //still good
  r.match('still #Adjective').match('still').tag('Adverb');
  //'more' is not always an adverb
  r.match('more #Noun').tag('Noun');
  //still make
  r.match('still #Verb').term(0).tag('Adverb', 'still-verb');

  //the word 'second'
  r.match('second #Noun').term(0).unTag('Unit').tag('Ordinal', 'second-noun');

  //will secure our
  r.match('will #Adjective').term(1).tag('Verb', 'will-adj');

  //is no walk
  r.match('is no #Verb').term(2).tag('Noun', 'is-no-verb');

  //Determiner-signals
  //the wait to vote
  r.match('the #Verb #Preposition .').match('#Verb').tag('Noun', 'correction-determiner1');
  //the swim
  r.match('the #Verb').match('#Verb').tag('#Noun', 'correction-determiner2');
  //the nice swim
  r.match('the #Adjective #Verb').match('#Verb').tag('#Noun', 'correction-determiner3');
  //the truly nice swim
  r.match('the #Adverb #Adjective #Verb').match('#Verb').tag('#Noun', 'correction-determiner4');
  //peter the great
  r.match('#Person the #Adjective').tag('Person', 'correction-determiner5');
  //book the flight
  r.match('#Noun the #Noun').term(0).tag('Verb', 'correction-determiner6');
  //a sense of
  r.match('#Determiner #Verb of').term(1).tag('Noun', 'the-verb-of');

  //past-tense copula
  r.match('has #Adverb? #Negative? #Adverb? been').tag('Copula');

  //he quickly foo
  r.match('#Noun #Adverb #Noun').term(2).tag('Verb', 'correction');

  //is eager to go
  r.match('#Copula #Adjective to #Verb').match('#Adjective to').tag('Verb', 'correction');

  //different views than
  r.match('#Verb than').term(0).tag('Noun', 'correction');

  //her polling
  r.match('#Possessive #Verb').term(1).tag('Noun', 'correction-possessive');

  //folks like her
  r.match('#Noun like #Noun').term(1).tag('Preposition', 'correction');

  //the threat of force
  r.match('#Determiner #Noun of #Verb').match('#Verb').tag('Noun', 'noun-of-noun');

  //big dreams, critical thinking
  r.match('#Adjective #PresentTense').term(1).tag('Noun', 'adj-presentTense');

  //ambiguous 'may' and 'march'
  r.match('(may|march) #Determiner').term(0).tag('Month', 'correction-may');
  r.match('(may|march) #Value').term(0).tag('Month', 'correction-may');
  r.match('(may|march) #Date').term(0).tag('Month', 'correction-may');
  r.match('#Date (may|march)').term(1).tag('Month', 'correction-may');
  r.match('(next|this|last) (may|march)').term(1).tag('Month', 'correction-may');

  //'a/an' can mean 1
  r.match('(a|an) (#Duration|#Value)').term(0).tag('Value');
  //all values are either ordinal or cardinal
  r.match('#Value').match('!#Ordinal').tag('#Cardinal');

  //time
  r.match('#Cardinal #Time').tag('Time', 'value-time');
  r.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time');
  r.match('(#Value|#Time) (am|pm)').tag('Time', 'value-ampm');
  //may the 5th
  r.match('#Date the? #Ordinal').term(1).tag('Date', 'correction-date');
  //5th of March
  r.match('#Value of? #Month').term(1).tag('Date', 'value-of-month');
  //5 March
  r.match('#Cardinal #Month').tag('Date', 'cardinal-month');
  //by 5 March
  r.match('(by|before|after|until) #Date').tag('Date', 'by-date');
  //tomorrow before 3
  r.match('#Date (by|before|after|at|@|about) #Cardinal').remove('^#Date').tag('Time', 'before-Cardinal');
  //2pm est
  r.match('#Time (eastern|pacific|central|mountain)').term(1).tag('Time', 'timezone');
  r.match('#Time (est|pst|gmt)').term(1).tag('Time', 'timezone abbr');
  //saturday am
  r.match('#Date (am|pm)').term(1).unTag('Verb').unTag('Copula').tag('Time', 'date-am');
  //late at night
  r.match('(early|late) (at|in)? the? (night|evening|morning|afternoon|day|daytime)').tag('Time');
  //march 12th 2018
  r.match('#Month #Value #Cardinal').tag('Date', 'month-value-cardinal');
  return r;
};

module.exports = corrections;

},{"./tagger/paths":69}],51:[function(_dereq_,module,exports){
'use strict';

var conditionPass = _dereq_('./phrase/00-conditionPass');
var verbPhrase = _dereq_('./phrase/01-verbPhrase');
var nounPhrase = _dereq_('./phrase/02-nounPhrase');
var AdjectivePhrase = _dereq_('./phrase/03-adjectivePhrase');
//
var phraseTag = function phraseTag(result) {
  result = conditionPass(result);
  result = verbPhrase(result);
  result = nounPhrase(result);
  result = AdjectivePhrase(result);
  return result;
};

module.exports = phraseTag;

},{"./phrase/00-conditionPass":53,"./phrase/01-verbPhrase":54,"./phrase/02-nounPhrase":55,"./phrase/03-adjectivePhrase":56}],52:[function(_dereq_,module,exports){
'use strict';

var steps = {
  split_sentences: _dereq_('./01-split_sentences'),
  split_terms: _dereq_('./02-split_terms'),
  tagger: _dereq_('./03-tagger'),
  corrections: _dereq_('./04-corrections'),
  phrase: _dereq_('./05-phrases')
};
var Term = _dereq_('../term');
var Terms = _dereq_('../terms');
var fns = _dereq_('../fns');
var log = _dereq_('../logger');
var path = 'parse';
var Result = _dereq_('../result');

//turn the string into an array of termList objects
var tokenize = function tokenize(str, context) {
  str = fns.ensureString(str);
  context = fns.ensureObject(context);
  //step #1
  var arr = steps.split_sentences(str);
  arr = arr.map(function (sen, i) {
    //find the particular words
    //step #2
    var ts = steps.split_terms(sen);
    ts = ts.map(function (term) {
      //make them proper Term objects
      var c = fns.copy(context);
      return new Term(term, c);
    });
    //make it 'Terms()' object
    ts = new Terms(ts, context);
    //give each term a parent reference
    ts.terms.forEach(function (t) {
      t.context.parent = ts;
    });
    log.tell('=sentence' + i + '=', path);
    //step #3
    ts = steps.tagger(ts);
    log.tell('\n', path);
    return ts;
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

},{"../fns":44,"../logger":46,"../result":90,"../term":109,"../terms":153,"./01-split_sentences":47,"./02-split_terms":48,"./03-tagger":49,"./04-corrections":50,"./05-phrases":51}],53:[function(_dereq_,module,exports){
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
    m.remove('#Pronoun$').tag('ConditionPhrase');
  }
  //if it goes then ..
  m = r.match('#Condition {1,7} then');
  if (m.found) {
    m.remove('then$').tag('ConditionPhrase');
  }
  //at the end of a sentence:
  //'..., if it really goes.'
  m = r.match('#Comma #Condition {1,7} .$');
  if (m.found) {
    m.remove('^#Comma').tag('ConditionPhrase');
  }
  // '... if so.'
  m = r.match('#Condition {1,4}$');
  if (m.found) {
    m.tag('ConditionPhrase');
  }
  return r;
};

module.exports = conditionPass;

},{}],54:[function(_dereq_,module,exports){
'use strict';
//

var verbPhrase = function verbPhrase(result) {
  result.match('#Verb').tag('VerbPhrase', 'verbphrase-verb');
  //was quickly
  result.match('#Adverb? #Verb #Adverb?').tag('VerbPhrase', 'verbphrase-verb');
  //is not
  result.match('#Verb #Negative').tag('VerbPhrase', 'verb-not');
  //never is
  result.match('never #Verb').tag('VerbPhrase', 'not-verb');
  //'will have had'..
  result.match('#Auxillary+').tag('VerbPhrase', '2');
  // 'is'
  result.match('#Copula').tag('VerbPhrase', '#3');
  //'really will'..
  result.match('#Adverb #Auxillary').tag('VerbPhrase', '#4');
  //to go
  result.match('to #Infinitive').tag('VerbPhrase', '#5');
  //work with
  result.match('#Verb #Preposition').tag('VerbPhrase', '#6');
  return result;
};

module.exports = verbPhrase;

},{}],55:[function(_dereq_,module,exports){
'use strict';
//

var nounPhrase = function nounPhrase(result) {
  //fifty stars
  result.match('#Value #Noun').tag('NounPhrase');
  //nice house
  result.match('#Adjective #NounPhrase').tag('NounPhrase');
  //tag preceding determiner 'the nice house'
  result.match('#Determiner #NounPhrase').tag('NounPhrase');
  //
  result.match('#Noun #Preposition #Noun').tag('NounPhrase');
  //john and sara
  result.match('#Noun #Conjunction #Noun').tag('NounPhrase');
  //difficult but necessary talks
  result.match('#Adjective #Conjunction #Adjective #NounPhrase').tag('NounPhrase');

  return result;
};

module.exports = nounPhrase;

},{}],56:[function(_dereq_,module,exports){
'use strict';
//

var adjectivePhrase = function adjectivePhrase(result) {
  //is really not so good
  // result.match('#Copula+ #Adverb? #Negative? as? #Adverb? #Adjective').tag('AdjectivePhrase').term(0).tag('#Copula');
  // //stonger than
  // result.match('#Comparative than').tag('AdjectivePhrase');
  //very easy
  result.match('#Copula #Adverb? #Negative? #Adverb? #Adjective #Adverb?').match('#Adverb? #Adjective #Adverb?').tag('AdjectivePhrase');
  //difficult but necessary
  result.match('#AdjectivePhrase #Conjunction #Adjective').tag('AdjectivePhrase');
  //is as strong as
  result.match('#AdjectivePhrase as').tag('AdjectivePhrase');
  return result;
};

module.exports = adjectivePhrase;

},{}],57:[function(_dereq_,module,exports){
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

  'can\'t': ['can', 'not'],
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

},{"./fix":60}],58:[function(_dereq_,module,exports){
'use strict';

var fixContraction = _dereq_('./fix');

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
  if (t.tag.Pronoun) {
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
    var parts = ts.terms[i].term.contraction();
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

},{"./fix":60}],59:[function(_dereq_,module,exports){
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
    var parts = ts.terms[i].term.contraction();
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

},{"./fix":60}],60:[function(_dereq_,module,exports){
'use strict';
//add a silent term

var fixContraction = function fixContraction(ts, arr, i) {
  //add a new term
  ts.insertAt('', i);
  var t = ts.terms[i];
  var nextT = ts.terms[i + 1];
  //add the interpretation silently
  t.silent_term = arr[0];
  nextT.silent_term = arr[1];
  return ts;
};

module.exports = fixContraction;

},{}],61:[function(_dereq_,module,exports){
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

},{"./01-irregulars":57,"./02-hardOne":58,"./03-easyOnes":59}],62:[function(_dereq_,module,exports){
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
    phrasal_step: _dereq_('./steps/12-phrasal_step'),
    comma_step: _dereq_('./steps/13-comma_step'),
    possessive_step: _dereq_('./steps/14-possessive_step'),
    value_step: _dereq_('./steps/15-value_step')
  }
};

},{"./contraction":61,"./lumper/lexicon_lump":66,"./lumper/lump_three":67,"./lumper/lump_two":68,"./steps/01-punctuation_step":70,"./steps/02-lexicon_step":71,"./steps/03-capital_step":72,"./steps/04-web_step":73,"./steps/05-suffix_step":74,"./steps/06-neighbour_step":75,"./steps/07-noun_fallback":76,"./steps/08-date_step":77,"./steps/09-auxillary_step":78,"./steps/10-negation_step":79,"./steps/11-adverb_step":80,"./steps/12-phrasal_step":81,"./steps/13-comma_step":82,"./steps/14-possessive_step":83,"./steps/15-value_step":84}],63:[function(_dereq_,module,exports){
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

},{"../paths":69}],64:[function(_dereq_,module,exports){
'use strict';

//rules for combining three terms into one
module.exports = [{
  //john f kennedy
  condition: function condition(a, b, c) {
    return a.tag.Person && b.term.isAcronym() && c.tag.Noun;
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
}, {
  //President of Mexico
  condition: function condition(a, b, c) {
    return a.tag.TitleCase && b.normal === 'of' && c.tag.TitleCase;
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
  reason: 'Value-point-Value'
}];

},{}],65:[function(_dereq_,module,exports){
'use strict';

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
module.exports = [{
  condition: function condition(a, b) {
    return a.tag.Person && b.tag.Honourific || a.tag.Honourific && b.tag.Person;
  }, //"John sr."
  result: 'Person',
  reason: 'person-words'
}, {
  //6 am
  condition: function condition(a, b) {
    return a.tag.Holiday && (b.normal === 'day' || b.normal === 'eve');
  },
  result: 'Holiday',
  reason: 'holiday-day'
}, {
  //'Dr. John'
  condition: function condition(a, b) {
    return a.tag.Honourific && b.tag.TitleCase;
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
    return a.tag.Person && !a.tag.Pronoun && !a.tag.tagsessive && !a.term.hasComma() && b.tag.TitleCase && !a.term.isAcronym() && !b.tag.Verb;
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
    return a.tag.TitleCase && a.tag.Noun && b.tag['Organization'] || b.tag.TitleCase && a.tag['Organization'];
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
  //7 ft
  condition: function condition(a, b) {
    return a.tag.Value && b.tag.Abbreviation || a.tag.Abbreviation && b.tag.Value;
  },
  result: 'Value',
  reason: 'value-abbreviation'
}, {
  //a hundred
  condition: function condition(a, b) {
    return (a.normal === 'a' || a.normal === 'an') && b.tag.Value;
  },
  result: 'Value',
  reason: 'determiner-value'
}, {
  //minus two
  condition: function condition(a, b) {
    return (a.normal === 'minus' || a.normal === 'negative') && b.tag.Value;
  },
  result: 'Value',
  reason: 'minus-value'
}, {
  //six grand
  condition: function condition(a, b) {
    return a.tag.Value && b.normal === 'grand';
  },
  result: 'Value',
  reason: 'value-grand'
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
    return a.tag.Value && b.tag.Value && !a.tag.Ordinal && !b.tag.NumericValue;
  },
  result: 'Value',
  reason: 'two-values'
}];

},{}],66:[function(_dereq_,module,exports){
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

},{"../paths":69,"./combine":63}],67:[function(_dereq_,module,exports){
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

},{"../paths":69,"./combine":63,"./data/do_three":64}],68:[function(_dereq_,module,exports){
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

},{"../paths":69,"./combine":63,"./data/do_two":65}],69:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  data: _dereq_('../../data/index'),
  lexicon: _dereq_('../../data/lexicon'),
  fns: _dereq_('../../fns'),
  log: _dereq_('../../logger'),
  Term: _dereq_('../../term')
};

},{"../../data/index":15,"../../data/lexicon":16,"../../fns":44,"../../logger":46,"../../term":109}],70:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var rules = _dereq_('./data/punct_rules');
var path = 'tagger/punctuation';

var punctuation_step = function punctuation_step(ts) {
  log.here(path);
  ts.terms.forEach(function (t) {
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

},{"../paths":69,"./data/punct_rules":87}],71:[function(_dereq_,module,exports){
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
    var parts = t.term.contraction();
    if (parts && parts.start) {
      found = check_lexicon(parts.start.toLowerCase(), s);
      if (found) {
        t.tagAs(found, 'contraction-lexicon');
        continue;
      }
    }
    //support silent_term matches
    found = check_lexicon(t.silent_term, s);
    if (t.silent_term && found) {
      t.tagAs(found, 'silent_term-lexicon');
      continue;
    }
    //multiple-words / hyphenation
    var words = t.normal.split(/[ -]/);
    if (words.length > 1) {
      found = check_lexicon(words[words.length - 1], s);
      if (found) {
        t.tagAs(found, 'multiword-lexicon');
        continue;
      }
    }
  }
  return s;
};

module.exports = lexicon_pass;

},{"../paths":69}],72:[function(_dereq_,module,exports){
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
    if (_t.term.isTitlecase() && _t.term.isWord()) {
      _t.tagAs('Noun', 'capital-step');
      _t.tagAs('TitleCase', 'capital-step');
    }
  }
  //support first-word of sentence as proper titlecase
  var t = s.terms[0];
  if (t && t.term.isTitlecase()) {
    if (t.tag.Person || t.tag.Organization || t.tag.Place) {
      t.tagAs('TitleCase', 'first-term-capital');
    }
  }
  return s;
};

module.exports = capital_logic;

},{"../paths":69}],73:[function(_dereq_,module,exports){
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

},{"../paths":69}],74:[function(_dereq_,module,exports){
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

},{"../paths":69,"./data/word_rules":88}],75:[function(_dereq_,module,exports){
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

},{"../paths":69,"./data/neighbours":85}],76:[function(_dereq_,module,exports){
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
      if (t.term.isWord() === false) {
        continue;
      }
      t.tagAs('Noun', 'noun-fallback');
      //check if it's plural, too
      if (t.tag.Plural) {
        t.tagAs('Plural', 'fallback-plural');
      }
    }
  }
  return s;
};

module.exports = noun_fallback;

},{"../paths":69}],77:[function(_dereq_,module,exports){
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
  var num = t.value.number;
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
    //in 2018
    if (a.tag.Date || preDate[a.normal] && b.tag.Value) {
      var year = parseInt(b.normal, 10);
      if (year && year > 1200 && year < 2090) {
        a.tagAs('Date', 'in-year');
        b.tagAs('Date', 'in-year');
      }
    }
  }
  return s;
};

module.exports = datePass;

},{"../paths":69}],78:[function(_dereq_,module,exports){
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

},{"../paths":69}],79:[function(_dereq_,module,exports){
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

},{"../paths":69}],80:[function(_dereq_,module,exports){
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

},{"../paths":69}],81:[function(_dereq_,module,exports){
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
        var inf = last.verb.infinitive();
        if (phrasals[inf + ' ' + t.normal]) {
          t.tagAs('Particle', 'phrasalVerb-particle');
        }
      }
    }
  }
  return ts;
};

module.exports = phrasals_step;

},{"../paths":69,"./data/phrasal_verbs":86}],82:[function(_dereq_,module,exports){
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
      t.tag.Comma = true;
      continue;
    }
    if (punct === ';') {
      t.tag.ClauseEnd = true;
      continue;
    }
    if (punct === ':') {
      t.tag.ClauseEnd = true;
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

},{}],83:[function(_dereq_,module,exports){
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

},{}],84:[function(_dereq_,module,exports){
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

},{"../paths":69}],85:[function(_dereq_,module,exports){
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

},{}],86:[function(_dereq_,module,exports){
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

},{}],87:[function(_dereq_,module,exports){
'use strict';

//these are regexes applied to t.text, instead of t.normal
module.exports = [['^#[a-z]+', 'HashTag'], ['[a-z]s\'', 'Possessive'], ['[0-9]([0-9,\.]*?)?]+', 'NumericValue'], //like 5
['[12]?[0-9](:[0-5][0-9])? ?(am|pm)', 'Time'], //4pm
['[12]?[0-9](:[0-5][0-9]) ?(am|pm)?', 'Time'], //4:00pm
['[PMCE]ST', 'Time'], //PST, time zone abbrevs
['utc ?[\+\-]?[0-9]\+?', 'Time'], //UTC 8+
['[a-z0-9]*? o\'?clock', 'Time'], //3 oclock
['[0-9]{1,4}/[0-9]{1,2}/[0-9]{1,4}', 'Date'], //03/02/89
['[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,4}', 'Date'], //03-02-89
['[0-9]{1,4}/[0-9]{1,4}', 'Fraction'], //3/2ths
['[0-9]{1,2}-[0-9]{1,2}', 'Value']].map(function (a) {
  return {
    reg: new RegExp('^' + a[0] + '$'),
    tag: a[1],
    str: a[0]
  };
});

},{}],88:[function(_dereq_,module,exports){
'use strict';
//regex suffix patterns and their most common parts of speech,
//built using wordnet, by spencer kelly.

//the order here matters.

module.exports = [['^[0-9]+ ?(am|pm)$', 'Date'], ['[0-9](st|nd|rd|r?th)$', 'Ordinal'], //like 5th
['([0-9])([a-z]{1,2})$', 'Cardinal'], //like 5kg
['^[0-9,\.]+$', 'Cardinal'], //like 5
['^[a-z]et$', 'Verb'], ['cede$', 'Infinitive'], ['.[cts]hy$', 'Adjective'], ['.[st]ty$', 'Adjective'], ['.[lnr]ize$', 'Infinitive'], ['.[gk]y$', 'Adjective'], ['.fies$', 'PresentTense'], ['ities$', 'Plural'], ['.some$', 'Adjective'], ['.[nrtumcd]al$', 'Adjective'], ['.que$', 'Adjective'], ['.[tnl]ary$', 'Adjective'], ['.[di]est$', 'Superlative'], ['^(un|de|re)\\-[a-z]..', 'Verb'], ['.lar$', 'Adjective'], ['[bszmp]{2}y', 'Adjective'], ['.zes$', 'PresentTense'], ['.[icldtgrv]ent$', 'Adjective'], ['.[rln]ates$', 'PresentTense'], ['.[oe]ry$', 'Singular'], ['[rdntkbhs]ly$', 'Adverb'], ['.[lsrnpb]ian$', 'Adjective'], ['.[^aeiou]ial$', 'Adjective'], ['.[^aeiou]eal$', 'Adjective'], ['.[vrl]id$', 'Adjective'], ['.[ilk]er$', 'Comparative'], ['.ike$', 'Adjective'], ['.ends?$', 'Verb'], ['.wards$', 'Adverb'], ['.rmy$', 'Adjective'], ['.rol$', 'Singular'], ['.tors$', 'Noun'], ['.azy$', 'Adjective'], ['.where$', 'Adverb'], ['.ify$', 'Infinitive'], ['.bound$', 'Adjective'], ['.[^z]ens$', 'Verb'], ['.oid$', 'Adjective'], ['.vice$', 'Singular'], ['.rough$', 'Adjective'], ['.mum$', 'Adjective'], ['.teen(th)?$', 'Value'], ['.oses$', 'PresentTense'], ['.ishes$', 'PresentTense'], ['.ects$', 'PresentTense'], ['.tieth$', 'Ordinal'], ['.ices$', 'Plural'], ['.tage$', 'Infinitive'], ['.ions$', 'Plural'], ['.tion$', 'Singular'], ['.ean$', 'Adjective'], ['.[ia]sed$', 'Adjective'], ['.urned', 'PastTense'], ['.tized$', 'PastTense'], ['.[aeiou][td]ed', 'PastTense'], ['.llen$', 'Adjective'], ['.fore$', 'Adverb'], ['.ances$', 'Plural'], ['.gate$', 'Infinitive'], ['.nes$', 'PresentTense'], ['.less$', 'Adverb'], ['.ried$', 'Adjective'], ['.gone$', 'Adjective'], ['.made$', 'Adjective'], ['.ing$', 'Gerund'], //likely to be converted to adjective after lexicon pass
['.tures$', 'Plural'], ['.ous$', 'Adjective'], ['.ports$', 'Plural'], ['. so$', 'Adverb'], ['.ints$', 'Plural'], ['.[gt]led$', 'Adjective'], ['.lked$', 'PastTense'], ['.fully$', 'Adverb'], ['.*ould$', 'Modal'], ['^-?[0-9]+(.,[0-9]+)?$', 'Value'], ['[a-z]*\\-[a-z]*\\-', 'Adjective'], ['[a-z]\'s$', 'Noun'], ['.\'n$', 'Verb'], ['.\'re$', 'Copula'], ['.\'ll$', 'Modal'], ['.\'t$', 'Verb'], ['.tches$', 'PresentTense'], ['^https?\:?\/\/[a-z0-9]', 'Url'], //the colon is removed in normalisation
['^www\.[a-z0-9]', 'Url'], ['.ize$', 'Infinitive'], ['.[^aeiou]ise$', 'Infinitive'], ['.[aeiou]te$', 'Infinitive'], ['.ea$', 'Singular'], ['[aeiou][pns]er$', 'Singular'], ['.ia$', 'Noun'], ['.sis$', 'Singular'], ['.[aeiou]na$', 'Noun'], ['.[^aeiou]ity$', 'Singular'], ['.[^aeiou]ium$', 'Singular'], ['.[^aeiou][ei]al$', 'Adjective'], ['.ffy$', 'Adjective'], ['.[^aeiou]ic$', 'Adjective'], ['.(gg|bb|zz)ly$', 'Adjective'], ['.[aeiou]my$', 'Adjective'], ['.[^aeiou][ai]ble$', 'Adjective'], ['.[^aeiou]eable$', 'Adjective'], ['.[^aeiou]ful$', 'Adjective'], ['.[^aeiou]ish$', 'Adjective'], ['.[^aeiou]ica$', 'Singular'], ['[aeiou][^aeiou]is$', 'Singular'], ['[^aeiou]ard$', 'Singular'], ['[^aeiou]ism$', 'Singular'], ['.[^aeiou]ity$', 'Singular'], ['.[^aeiou]ium$', 'Singular'], ['.[lstrn]us$', 'Singular'], ['..ic$', 'Adjective'], ['[aeiou][^aeiou]id$', 'Adjective'], ['.[^aeiou]ish$', 'Adjective'], ['.[^aeiou]ive$', 'Adjective'], ['[ea]{2}zy$', 'Adjective'], ['[^aeiou]ician$', 'Actor'], ['.keeper$', 'Actor'], ['.logist$', 'Actor'], ['..ier$', 'Actor'], ['.[^aeiou][ao]pher$', 'Actor'], ['.tive$', 'Actor'], ['[aeiou].*ist$', 'Adjective'], ['[^i]fer$', 'Infinitive'], ['(bb|tt|gg|pp|ll|nn|mm)..?$', 'Verb'], //rubbed
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

},{}],89:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Result = _dereq_('../index');

var Adjectives = function (_Result) {
  _inherits(Adjectives, _Result);

  function Adjectives(list) {
    var _ret;

    _classCallCheck(this, Adjectives);

    // this.check();
    var _this = _possibleConstructorReturn(this, (Adjectives.__proto__ || Object.getPrototypeOf(Adjectives)).call(this, list));

    _this.when('#Adjective+');
    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Adjectives, [{
    key: 'parse',
    value: function parse() {
      return this.terms.map(function (t) {
        return {
          comparative: t.adjective.comparative(),
          superlative: t.adjective.superlative(),
          adverbForm: t.adjective.adverbForm(),
          nounForm: t.adjective.nounForm()
        };
      });
    }
  }, {
    key: 'adverbs',
    value: function adverbs() {
      this.parent();
      //very cool / cool suddenly
      this.when('#Adverb+ #Adjective').or('#Adjective #Adverb+').when('#Adverb');
      return this;
    }
  }, {
    key: 'stripAdverbs',
    value: function stripAdverbs() {
      this.parent();
      this.adverbs().remove();
      return this.parent();
    }
  }]);

  return Adjectives;
}(Result);

module.exports = Adjectives;

},{"../index":90}],90:[function(_dereq_,module,exports){
'use strict';

//a result is an array of termLists

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Result = function () {
  function Result(arr) {
    _classCallCheck(this, Result);

    this.list = arr || [];
  }
  //getter/setters
  /** did it find anything? */


  _createClass(Result, [{
    key: 'found',
    get: function get() {
      return this.list.length > 0;
    }
  }, {
    key: 'terms',
    get: function get() {
      return this.list.reduce(function (arr, ts) {
        return arr.concat(ts.terms.filter(function (t) {
          return t.sel;
        }));
      }, []);
    }
  }]);

  return Result;
}();

var selectFns = _dereq_('./selection');
Result = selectFns(Result);

var inspectFns = _dereq_('./inspect');
Result = inspectFns(Result);

var renderFns = _dereq_('./render');
Result = renderFns(Result);

/** different presentation logic for this result*/
Result.prototype.render = _dereq_('./render');
/** fixup transforms**/
Result.prototype.normalize = _dereq_('./normalize');
/** **/
Result.prototype.ngram = _dereq_('./inspect/ngram');
/** **/
Result.prototype.topk = _dereq_('./inspect/topk');

module.exports = Result;

var Adjectives = _dereq_('./adjectives');
Result.prototype.adjectives = function () {
  return new Adjectives(this.list);
};
var Values = _dereq_('./values');
Result.prototype.values = function () {
  return new Values(this.list);
};

//apply methods
// require('./methods').addMethods(Result);

},{"./adjectives":89,"./inspect":91,"./inspect/ngram":92,"./inspect/topk":93,"./normalize":94,"./render":95,"./selection":96,"./values":97}],91:[function(_dereq_,module,exports){
'use strict';

var Terms = _dereq_('../../terms');

var genericMethods = function genericMethods(Result) {

  var methods = {
    /** how many results are there?*/
    count: function count() {
      return this.list.length;
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
      this.terms.filter(function (t) {
        return t.sel;
      }).forEach(function (t) {
        t.tagAs(_tag, reason);
      });
      return this;
    },
    /**remove a tag in all the terms in this result (that had it) */
    unTag: function unTag(tag, reason) {
      this.terms.filter(function (t) {
        return t.sel;
      }).forEach(function (t) {
        delete t.tag[tag];
      });
      return this;
    },

    replace: function replace(text) {
      this.list.forEach(function (ts) {
        ts.terms.filter(function (t) {
          return t.sel;
        }).forEach(function (t) {
          t.text = text;
        });
      });
      return this;
    },

    expand: function expand() {
      this.list.forEach(function (ts) {
        ts.terms.filter(function (t) {
          return t.sel;
        }).forEach(function (t, i) {
          if (t.silent_term) {
            if (t.term.isTitlecase()) {
              t.text = t.silent_term;
              t.text = t.term.titlecase();
            } else {
              t.text = t.silent_term;
            }
            //add whitespace too
            var last = ts.terms[i - 1];
            if (last) {
              last.whitespace.after = ' ';
            }
          }
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

},{"../../terms":153}],92:[function(_dereq_,module,exports){
'use strict';
//ngrams are consecutive terms of a specific size

var ngram = function ngram(options) {
  options = options || {};
  options.size = options.size || [1, 2, 3];
  if (typeof options.size === 'number') {
    options.size = [options.size];
  }
  //flatten terms
  var terms = this.list.map(function (ts) {
    return ts.terms.map(function (t) {
      return t.normal;
    });
  });

  //count freq
  var obj = {};
  //each gram-size
  options.size.forEach(function (size) {
    obj[size] = {};
    //each sentence/match
    for (var s = 0; s < terms.length; s++) {
      //start slice at each term
      for (var o = 0; o < terms[s].length - size + 1; o++) {
        var str = terms[s].slice(o, o + size).join(' ');
        obj[size][str] = obj[size][str] || 0;
        obj[size][str] += 1;
      }
    }
  });

  //flatten to an array
  var arr = [];
  Object.keys(obj).forEach(function (size) {
    Object.keys(obj[size]).forEach(function (k) {
      arr.push({
        text: k,
        count: obj[size][k],
        size: parseInt(size, 10)
      });
    });
  });
  //sort the array
  arr = arr.sort(function (a, b) {
    if (a.count > b.count) {
      return -1;
    }
    //(the tie-braker)
    if (a.count === b.count && a.size > b.size) {
      return -1;
    }
    return 1;
  });
  return arr;
};

module.exports = ngram;

},{}],93:[function(_dereq_,module,exports){
'use strict';
//

var topk = function topk(n) {
  //count occurance
  var count = {};
  this.terms.forEach(function (t) {
    count[t.normal] = count[t.normal] || 0;
    count[t.normal] += 1;
  });
  //turn into an array
  var all = [];
  Object.keys(count).forEach(function (k) {
    all.push({
      term: k,
      count: count[k]
    });
  });
  //add percentage
  all.forEach(function (o) {
    o.percent = (o.count / all.length * 100).toFixed(2);
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

},{}],94:[function(_dereq_,module,exports){
'use strict';
//

var defaultMethods = {
  whitespace: true,
  case: true,
  numbers: true,
  punctuation: true,
  unicode: true
};

var methods = {

  /** make only one space between each word */
  whitespace: function whitespace(r) {
    r.list.forEach(function (ts) {
      ts.terms.forEach(function (t, i) {
        if (i > 0) {
          t.whitespace.before = ' ';
        }
        t.whitespace.after = '';
      });
    });
    return r;
  },

  /** make first-word titlecase, and people, places titlecase */
  case: function _case(r) {
    r.list.forEach(function (ts) {
      ts.terms.forEach(function (t, i) {
        if (i === 0 || t.tag.Person || t.tag.Place || t.tag.Organization) {
          t.text = t.term.titlecase();
        } else {
          t.text = t.text.toLowerCase();
        }
      });
    });
    return r;
  },

  /** turn 'five' to 5, and 'fifth' to 5th*/
  numbers: function numbers(r) {
    return r.toNumber();
  },

  /** remove commas, semicolons - but keep sentence-ending punctuation*/
  punctuation: function punctuation(r) {
    r.list.forEach(function (ts) {
      ts.terms.forEach(function (t, i) {
        if (i < ts.terms.length - 1) {
          t.text = t.term.noPunctuation();
        }
      });
    });
    return r;
  }
};

var normalize = function normalize(obj) {
  var result = this;
  obj = obj || defaultMethods;
  Object.keys(obj).forEach(function (k) {
    if (obj[k] && methods[k]) {
      result = methods[k](result);
    }
  });
  return result;
};

module.exports = normalize;

},{}],95:[function(_dereq_,module,exports){
'use strict';

var chalk = _dereq_('chalk');

var prettyPrint = function prettyPrint(Result) {

  var methods = {

    check: function check() {
      console.log('====');
      this.list.forEach(function (ts) {
        console.log('   --');
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
      return this.list.map(function (ts) {
        var str = ts.normal();
        var last = ts.last();
        if (last && last.sel) {
          var punct = last.endPunctuation();
          if (punct === '.' || punct === '!' || punct === '?') {
            str += punct;
          }
        }
        return str;
      }).join(' ');
    },

    phrases: function phrases() {
      this.list.forEach(function (ts) {
        var str = '';
        ts.terms.forEach(function (t) {
          var text = t.plaintext();
          if (t.tag.ConditionPhrase) {
            str += chalk.magenta(text);
            return;
          }
          if (t.tag.NounPhrase) {
            str += chalk.cyan(text);
            return;
          }
          if (t.tag.VerbPhrase) {
            str += chalk.red(text);
            return;
          }
          if (t.tag.AdjectivePhrase) {
            str += chalk.green(text);
            return;
          }
          str += text;
        });
        console.log('\n' + str);
      });
    },

    asArray: function asArray() {
      return this.list.map(function (ts) {
        return ts.normal();
      });
    }

  };
  Object.keys(methods).forEach(function (k) {
    Result.prototype[k] = methods[k];
  });
  return Result;
};

module.exports = prettyPrint;

},{"chalk":2}],96:[function(_dereq_,module,exports){
'use strict';

var Terms = _dereq_('../../terms');

var match = function match(Result) {

  var methods = {

    /** do a regex-like search through terms and return a subset */
    match: function match(reg, verbose) {
      var list = [];
      this.list.forEach(function (ts) {
        //an array of arrays
        var matches = ts.match(reg, verbose);
        matches.forEach(function (ms) {
          list.push(new Terms(ms));
        });
      });
      // this.list = list;
      return new Result(list);
    },

    /** return terms after this match */
    after: function after(reg) {
      var after = reg + ' *';
      return this.match(after).remove(reg);
    },

    /** return terms before this match */
    before: function before(reg) {
      var before = '* ' + reg;
      return this.match(before).remove(reg);
    },

    /** like .match(), but negative (filter-out the matches)*/
    remove: function remove(reg) {
      var _this = this;

      //if there's no reg, remove all selected terms
      if (!reg) {
        this.list.forEach(function (ts) {
          ts.terms = ts.terms.filter(function (t) {
            return !t.sel;
          });
        });
        return this;
      }
      //otherwise, remove just the matches
      var list = [];
      this.list.forEach(function (ts) {
        var matches = ts.remove(reg, _this.context);
        if (matches && matches.terms && matches.terms.length) {
          list.push(matches);
        }
      });
      this.list = list;
      return this;
    },

    /** tag a subset as selected/non-selected **/
    when: function when(str, debug) {
      this.list.forEach(function (ts) {
        ts.terms.forEach(function (t) {
          t.sel = false;
        });
        ts.when(str, debug);
      });
      return this;
    },
    /** opposite of .when **/
    not: function not(str, debug) {
      this.when(str, debug);
      //reverse it
      this.terms.forEach(function (t) {
        t.sel = !t.sel;
      });
      return this;
    },

    /** tag a subset as selected/non-selected **/
    or: function or(str, debug) {
      this.list.forEach(function (ts) {
        ts.when(str, debug);
      });
      return this;
    },

    /** re-select all terms **/
    parent: function parent() {
      this.list.forEach(function (ts) {
        ts.terms.forEach(function (t) {
          t.sel = true;
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
module.exports = match;

},{"../../terms":153}],97:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Result = _dereq_('../index');

var Values = function (_Result) {
  _inherits(Values, _Result);

  function Values(list) {
    var _ret;

    _classCallCheck(this, Values);

    var _this = _possibleConstructorReturn(this, (Values.__proto__ || Object.getPrototypeOf(Values)).call(this, list));

    _this.when('#Value+');
    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Values, [{
    key: 'parse',
    value: function parse() {
      return this.terms.map(function (t) {
        return {
          number: t.value.number(),
          nicenumber: t.value.nicenumber(),
          textValue: t.value.textValue(),
          cardinal: t.value.cardinal(),
          ordinal: t.value.ordinal()
        };
      });
    }
    /** five -> '5' */

  }, {
    key: 'toNumber',
    value: function toNumber() {
      this.terms.forEach(function (t) {
        t.text = '' + t.value.number();
        t.tagAs('NumericValue', 'toNumber()');
      });
      return this;
    }
    /**5900 -> 5,900 */

  }, {
    key: 'toNiceNumber',
    value: function toNiceNumber() {
      this.terms.forEach(function (t) {
        t.text = '' + t.value.nicenumber();
      });
      return this;
    }
    /**5 -> 'five' */

  }, {
    key: 'toTextValue',
    value: function toTextValue() {
      this.terms.forEach(function (t) {
        t.text = t.value.textValue();
        t.tagAs('TextValue', 'toTextValue()');
      });
      return this;
    }
    /**5th -> 5 */

  }, {
    key: 'toCardinal',
    value: function toCardinal() {
      this.terms.forEach(function (t) {
        t.text = '' + t.value.cardinal();
        t.tagAs('Cardinal', 'toCardinal()');
      });
      return this;
    }
    /**5 -> 5th */

  }, {
    key: 'toOrdinal',
    value: function toOrdinal() {
      this.terms.forEach(function (t) {
        t.text = t.value.ordinal();
        t.tagAs('Ordinal', 'toOrdinal()');
      });
      return this;
    }
  }]);

  return Values;
}(Result);

module.exports = Values;

},{"../index":90}],98:[function(_dereq_,module,exports){
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
['Ordinal', 'Cardinal'], ['TextValue', 'NumericValue'], ['Ordinal', 'Currency'], //$5.50th
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
// ['NounPhrase', 'VerbPhrase', 'AdjectivePhrase'],
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

},{}],99:[function(_dereq_,module,exports){
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

},{"./conflicts":98,"./tree":100}],100:[function(_dereq_,module,exports){
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
      Actor: true,
      Unit: true,
      Demonym: true,
      Possessive: true,
      Date: {
        Month: true,
        Day: true,
        Year: true,
        Duration: true,
        Time: true,
        Holiday: true
      }
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
  Value: {
    Currency: true,
    Ordinal: true,
    Fraction: true,
    Cardinal: true,
    TextValue: true,
    NumericValue: true
  },
  //glue
  Determiner: true,
  Conjunction: true,
  Preposition: true,

  Condition: true,
  TitleCase: true,
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

},{}],101:[function(_dereq_,module,exports){
'use strict';

var toAdverb = _dereq_('./toAdverb');
var toNoun = _dereq_('./toNoun');
var toComparative = _dereq_('./toComparative');
var toSuperlative = _dereq_('./toSuperlative');

var adjective = {
  adverbForm: function adverbForm() {
    return toAdverb(this.normal);
  },
  nounForm: function nounForm() {
    return toNoun(this.normal);
  },
  comparative: function comparative() {
    return toComparative(this.normal);
  },
  superlative: function superlative() {
    return toSuperlative(this.normal);
  },
  conjugate: function conjugate() {
    return {
      adverbForm: this.adjective.adverbForm(),
      nounForm: this.adjective.nounForm(),
      comparative: this.adjective.comparative(),
      superlative: this.adjective.superlative()
    };
  }
};
module.exports = adjective;

},{"./toAdverb":103,"./toComparative":104,"./toNoun":105,"./toSuperlative":106}],102:[function(_dereq_,module,exports){
'use strict';

module.exports = _dereq_('../paths');

},{"../paths":120}],103:[function(_dereq_,module,exports){
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

},{}],104:[function(_dereq_,module,exports){
//turn 'quick' into 'quickly'
'use strict';

var convertables = _dereq_('./paths').data.superlatives;

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

},{"./paths":102}],105:[function(_dereq_,module,exports){
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

},{}],106:[function(_dereq_,module,exports){
//turn 'quick' into 'quickest'
'use strict';

var convertables = _dereq_('./paths').data.superlatives;

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

},{"./paths":102}],107:[function(_dereq_,module,exports){
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

var fixUnicode = function fixUnicode(str) {
  var chars = str.split('');
  chars.forEach(function (s, i) {
    if (unicode[s]) {
      chars[i] = unicode[s];
    }
  });
  return chars.join('');
};
module.exports = fixUnicode;
// console.log(fixUnicode('bjŏȒk'));

},{}],108:[function(_dereq_,module,exports){
'use strict';

var Term = _dereq_('./index');
var fns = _dereq_('./paths').fns;

module.exports = {
  makeTerm: function makeTerm(str, t) {
    var c = fns.copy(t.context);
    var index = t.term.index();
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

},{"./index":109,"./paths":120}],109:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var set_tag = _dereq_('./tag').set_tag;
var addNormal = _dereq_('./normalize');
var addRoot = _dereq_('./root');
var fns = _dereq_('./paths').fns;
var build_whitespace = _dereq_('./whitespace');

var bindMethods = function bindMethods(o, str, self) {
  self[str] = {};
  Object.keys(o).forEach(function (fn) {
    self[str][fn] = o[fn].bind(self);
  });
};

var Term = function () {
  function Term(str, context) {
    _classCallCheck(this, Term);

    this._text = fns.ensureString(str);
    this.context = fns.ensureObject(context);
    this.tag = {};
    this.sel = true;
    this.whitespace = build_whitespace(str || '');
    this._text = this._text.trim();

    bindMethods(_dereq_('./term'), 'term', this);
    bindMethods(_dereq_('./verb'), 'verb', this);
    bindMethods(_dereq_('./noun'), 'noun', this);
    bindMethods(_dereq_('./adjective'), 'adjective', this);
    bindMethods(_dereq_('./value'), 'value', this);
    bindMethods(_dereq_('./pronoun'), 'pronoun', this);

    bindMethods(_dereq_('./render'), 'render', this);

    this.normalize();
    this.silent_term = '';
    this.helpers = _dereq_('./helpers');
  }

  _createClass(Term, [{
    key: 'normalize',
    value: function normalize() {
      addNormal(this);
      addRoot(this);
    }

    /** the comma, period ... punctuation that ends this sentence */

  }, {
    key: 'endPunctuation',
    value: function endPunctuation() {
      var m = this._text.match(/([\.\?\!,;:])$/);
      if (m) {
        //remove it from end of text
        // this.text = this._text.substr(0, this._text.length - 1);
        return m[0];
      }
      return '';
    }

    /** print-out this text, as it was given */

  }, {
    key: 'plaintext',
    value: function plaintext() {
      var str = this.whitespace.before + this._text + this.whitespace.after;
      return str;
    }

    /** delete this term from its sentence */

  }, {
    key: 'remove',
    value: function remove() {
      var s = this.context.parent;
      var index = this.term.index();
      s.arr.splice(index, 1);
      return s;
    }

    /** set the term as this part-of-speech */

  }, {
    key: 'tagAs',
    value: function tagAs(tag, reason) {
      set_tag(this, tag, reason);
    }

    /** make a copy with no references to the original  */

  }, {
    key: 'clone',
    value: function clone() {
      var c = fns.copy(this.context);
      var term = new Term(this._text, c);
      term.tag = fns.copy(this.tag);
      term.whitespace = fns.copy(this.whitespace);
      term.silent_term = this.silent_term;
      term.endPunct = this.endPunct;
      term.sel = this.sel;
      return term;
    }
  }, {
    key: 'text',
    set: function set(str) {
      str = str || '';
      this._text = str.trim();
      if (this._text !== str) {
        this.whitespace = build_whitespace(str);
      }
      this.normalize();
    },
    get: function get() {
      return this._text;
    }
  }]);

  return Term;
}();

module.exports = Term;

},{"./adjective":101,"./helpers":108,"./normalize":110,"./noun":112,"./paths":120,"./pronoun":121,"./render":122,"./root":124,"./tag":125,"./term":126,"./value":127,"./verb":146,"./whitespace":152}],110:[function(_dereq_,module,exports){
'use strict';

var fixUnicode = _dereq_('./fixUnicode');

var normalize = function normalize(term) {
  var str = term._text || '';
  str = str.toLowerCase();
  //(very) rough asci transliteration -  bjŏrk -> bjork
  str = fixUnicode(str);
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

  //compact acronyms
  if (term.term.isAcronym()) {
    str = str.replace(/\./g, '');
  }
  term.normal = str;
};

module.exports = normalize;

// console.log(normalize('Dr. V Cooper'));

},{"./fixUnicode":107}],111:[function(_dereq_,module,exports){
'use strict';

var uncountables = _dereq_('../paths').data.uncountables;

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
  var noPlural = ['Pronoun', 'Place', 'Date', 'Value', 'Person'];
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

},{"../paths":120}],112:[function(_dereq_,module,exports){
'use strict';

var _hasPlural = _dereq_('./hasPlural');
var makeArticle = _dereq_('./makeArticle');
var _toPlural = _dereq_('./inflect/toPlural');
var _toSingular = _dereq_('./inflect/toSingle');
var _isPlural = _dereq_('./inflect/isPlural');

module.exports = {
  toPlural: function toPlural() {
    if (!this.noun.hasPlural() || this.noun.isPlural()) {
      return this.text;
    }
    return _toPlural(this.text);
  },
  toSingular: function toSingular() {
    if (!this.noun.hasPlural() || !this.noun.isPlural()) {
      return this.text;
    }
    return _toSingular(this.text);
  },
  hasPlural: function hasPlural() {
    return _hasPlural(this);
  },
  isPlural: function isPlural() {
    return _isPlural(this);
  }
};

},{"./hasPlural":111,"./inflect/isPlural":116,"./inflect/toPlural":117,"./inflect/toSingle":118,"./makeArticle":119}],113:[function(_dereq_,module,exports){
'use strict';
//similar to plural/singularize rules, but not the same

var plural_indicators = [/(^v)ies$/i, /ises$/i, /ives$/i, /(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /(buffal|tomat|tornad)oes$/i, /(analy|ba|diagno|parenthe|progno|synop|the)ses$/i, /(vert|ind|cort)ices$/i, /(matr|append)ices$/i, /(x|ch|ss|sh|s|z|o)es$/i, /men$/i, /news$/i, /.tia$/i, /(^f)ves$/i, /(lr)ves$/i, /(^aeiouy|qu)ies$/i, /(m|l)ice$/i, /(cris|ax|test)es$/i, /(alias|status)es$/i, /ics$/i];

//similar to plural/singularize rules, but not the same
var singular_indicators = [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i];
module.exports = {
  singular_indicators: singular_indicators,
  plural_indicators: plural_indicators
};

},{}],114:[function(_dereq_,module,exports){
'use strict';

//patterns for turning 'bus' to 'buses'
module.exports = [[/(ax|test)is$/i, '$1es'], [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i'], [/(octop|vir)i$/i, '$1i'], [/(kn|l|w)ife$/i, '$1ives'], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)f$/i, '$1ves'], [/^(dwar|handkerchie|hoo|scar|whar)f$/i, '$1ves'], [/(alias|status)$/i, '$1es'], [/(bu)s$/i, '$1ses'], [/(al|ad|at|er|et|ed|ad)o$/i, '$1oes'], [/([ti])um$/i, '$1a'], [/([ti])a$/i, '$1a'], [/sis$/i, 'ses'], [/(hive)$/i, '$1s'], [/([^aeiouy]|qu)y$/i, '$1ies'], [/(x|ch|ss|sh|s|z)$/i, '$1es'], [/(matr|vert|ind|cort)(ix|ex)$/i, '$1ices'], [/([m|l])ouse$/i, '$1ice'], [/([m|l])ice$/i, '$1ice'], [/^(ox)$/i, '$1en'], [/^(oxen)$/i, '$1'], [/(quiz)$/i, '$1zes'], [/(antenn|formul|nebul|vertebr|vit)a$/i, '$1ae'], [/(sis)$/i, 'ses'], [/^(?!talis|.*hu)(.*)man$/i, '$1men'], [/(.*)/i, '$1s']].map(function (a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

},{}],115:[function(_dereq_,module,exports){
'use strict';

//patterns for turning 'dwarves' to 'dwarf'
module.exports = [[/([^v])ies$/i, '$1y'], [/ises$/i, 'isis'], [/(kn|[^o]l|w)ives$/i, '$1ife'], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)ves$/i, '$1f'], [/^(dwar|handkerchie|hoo|scar|whar)ves$/i, '$1f'], [/(antenn|formul|nebul|vertebr|vit)ae$/i, '$1a'], [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, '$1us'], [/(buffal|tomat|tornad)(oes)$/i, '$1o'], [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1sis'], [/(vert|ind|cort)(ices)$/i, '$1ex'], [/(matr|append)(ices)$/i, '$1ix'], [/(x|ch|ss|sh|s|z|o)es$/i, '$1'], [/men$/i, 'man'], [/(n)ews$/i, '$1ews'], [/([ti])a$/i, '$1um'], [/([^aeiouy]|qu)ies$/i, '$1y'], [/(s)eries$/i, '$1eries'], [/(m)ovies$/i, '$1ovie'], [/([m|l])ice$/i, '$1ouse'], [/(cris|ax|test)es$/i, '$1is'], [/(alias|status)es$/i, '$1'], [/(ss)$/i, '$1'], [/(ics)$/i, '$1'], [/s$/i, '']].map(function (a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

},{}],116:[function(_dereq_,module,exports){
'use strict';

var irregulars = _dereq_('../../paths').data.irregular_plurals;
var rules = _dereq_('./data/indicators');

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

},{"../../paths":120,"./data/indicators":113}],117:[function(_dereq_,module,exports){
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

},{"../../paths":120,"./data/pluralRules":114}],118:[function(_dereq_,module,exports){
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

},{"../../paths":120,"./data/singleRules":115}],119:[function(_dereq_,module,exports){
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
  if (t.term.isAcronym() && an_acronyms.hasOwnProperty(str.substr(0, 1))) {
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

},{}],120:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  fns: _dereq_('../fns'),
  log: _dereq_('../logger'),
  data: _dereq_('../data'),
  tags: _dereq_('../tags')
};

},{"../data":15,"../fns":44,"../logger":46,"../tags":99}],121:[function(_dereq_,module,exports){
'use strict';

var pluralMap = {
  'he': 'they',
  'she': 'they',
  'it': 'they',
  'they': 'they',
  'this': 'those'
};
var singularMap = {
  'those': 'this'
};

module.exports = {
  toPlural: function toPlural() {
    if (pluralMap[this.normal]) {
      return pluralMap[this.normal];
    }
    return this.text;
  },
  toSingular: function toSingular() {
    if (singularMap[this.normal]) {
      return singularMap[this.normal];
    }
    return this.text;
  }
};

},{}],122:[function(_dereq_,module,exports){
'use strict';

var renderHtml = _dereq_('./renderHtml');
var chalk = _dereq_('chalk');
var paths = _dereq_('../paths');
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
  text: function text() {
    return this.whitespace.before + this.text + this.whitespace.after;
  },
  /** a lowercased, punctuation-cleaned, whitespace-trimmed version of the word */
  normal: function normal() {
    return this.normal;
  },
  /** the &encoded term in a span element, with POS as classNames */
  html: function html() {
    return renderHtml(this);
  },
  /** a simplified response for Part-of-Speech tagging*/
  tags: function tags() {
    return {
      text: this.text,
      normal: this.normal,
      tags: Object.keys(this.tag)
    };
  },
  /** check-print information for the console */
  check: function check() {
    var tags = Object.keys(this.tag).map(function (tag) {
      if (colors[tag]) {
        return colors[tag](tag);
      }
      return tag;
    }).join(', ');
    var word = this.text;
    word = '\'' + chalk.green(word || '-') + '\'';
    var silent = '';
    if (this.silent_term) {
      silent = '[' + this.silent_term + ']';
    }
    // word += fns.leftPad(silent, 10);
    word = fns.leftPad(word, 25);
    word += fns.leftPad(silent, 10);
    // word = fns.leftPad(word, 32);
    // word = fns.rightPad(word, 28);
    console.log('   ' + word + '   ' + '     - ' + tags);
  }
};

},{"../paths":120,"./renderHtml":123,"chalk":2}],123:[function(_dereq_,module,exports){
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

},{}],124:[function(_dereq_,module,exports){
'use strict';
//

var rootForm = function rootForm(term) {
  var str = term.normal || term.silent_term || '';
  //plural
  // if (term.tag.Plural) {
  // str = term.noun.Singular() || str;
  // }
  str = str.replace(/'s\b/, '');
  str = str.replace(/'\b/, '');
  term.root = str;
};

module.exports = rootForm;

},{}],125:[function(_dereq_,module,exports){
'use strict';
//set a term as a particular Part-of-speech

var path = _dereq_('./paths');
var log = path.log;
var tagset = path.tags;

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
    log.tell('forgetting tags for ' + term.normal);
    term.tag = {};
  }
  term.tag[tag] = true;
  if (!tagset[tag]) {
    // console.warn('unknown tag ' + tag + ' - ' + reason);
    term.tag[tag] = true;
    return;
  }
  // //also set tags by deduction
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

},{"./paths":120}],126:[function(_dereq_,module,exports){
'use strict';
// const normalize = require('./normalize');

var fns = _dereq_('../paths').fns;
var term = {

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
        return allowed[m[1]];
      }
    }
    return null;
  },

  /** interpret a term's hyphenation */
  hyphenation: function hyphenation() {
    var m = this.normal.match(/^([a-z]+)-([a-z]+)$/);
    if (m && m[1] && m[2]) {
      return {
        start: m[1],
        end: m[2]
      };
    }
    return null;
  },

  /** interpret a terms' contraction */
  contraction: function contraction() {
    var t = this;
    var allowed = {
      're': true,
      've': true,
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
      //fix titlecase
      if (t.tag.TitleCase) {
        parts[1] = fns.titleCase(parts[1]);
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
  hasComma: function hasComma() {
    if (this.term.endPunctuation() === 'comma') {
      return true;
    }
    return false;
  },

  /** where in the sentence is it? zero-based. */
  index: function index() {
    var t = this;
    var terms = t.context.parent.arr;
    for (var i = 0; i < terms.length; i++) {
      if (terms[i] === t) {
        return i;
      }
    }
    return null;
  },

  /** ensure the first character is a capital. Ignore other characters. */
  titlecase: function titlecase() {
    return this.text.replace(/^[a-z]/, function (x) {
      return x.toUpperCase();
    });
  },

  /** check if the text has one capital letter, the first one */
  isTitlecase: function isTitlecase() {
    if (this.text.match(/^[A-Z][a-z]/)) {
      return true;
    }
    return false;
  },

  noPunctuation: function noPunctuation() {
    return this.text.replace(/([,;:])$/, '');
  },
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

module.exports = term;

},{"../paths":120}],127:[function(_dereq_,module,exports){
'use strict';

var toNumber = _dereq_('./toNumber');
var toText = _dereq_('./toText');
var parseNumber = _dereq_('./parse');

var value = {

  /* return a number, like '5th', as a cardinal, like 5 */
  cardinal: function cardinal() {
    var num = parseNumber(this);
    //if it is textual, make a textCardinal
    if (this.tag.TextValue) {
      return toText.cardinal(num);
    }
    //otherwise, numerical form
    return num;
  },

  /* return a number, like '5', as an ordinal, like '5th' */
  ordinal: function ordinal() {
    var num = parseNumber(this);
    //if it is textual, make a textCardinal
    if (this.tag.TextValue) {
      return toText.ordinal(num);
    }
    //otherwise, numerical form
    return toNumber.ordinal(num);
  },

  /** return a float/integer version of this number*/
  number: function number() {
    var n = parseNumber(this);
    if (this.tag.Ordinal) {
      return toNumber.ordinal(n);
    }
    return n;
  },

  /** return a textual version of this number*/
  textValue: function textValue() {
    var num = parseNumber(this);
    if (this.tag.Ordinal) {
      return toText.ordinal(num);
    } else {
      return toText.cardinal(num);
    }
  },

  nicenumber: function nicenumber() {
    var n = parseNumber(this);
    n = '' + n;
    var x = n.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  },

  /** generate all forms for this number */
  parse: function parse() {
    var num = parseNumber(this);
    return {
      Number: {
        Cardinal: num,
        Ordinal: toNumber.ordinal(num)
      },
      Text: {
        Cardinal: toText.cardinal(num),
        Ordinal: toText.ordinal(num)
      }
    };
  }

};
module.exports = value;

},{"./parse":130,"./toNumber":135,"./toText":137}],128:[function(_dereq_,module,exports){
'use strict';

var p = _dereq_('../paths');
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

},{"../paths":134}],129:[function(_dereq_,module,exports){
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

},{}],130:[function(_dereq_,module,exports){
'use strict';

var parseNumeric = _dereq_('./parseNumeric');
var findModifiers = _dereq_('./findModifiers');
var words = _dereq_('./data');
var isValid = _dereq_('./validate');
var parseDecimals = _dereq_('./parseDecimals');
var log = _dereq_('../paths').log;
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
      log.tell('invalid state', path);
      log.tell(has, path);
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
        log.tell('invalid multiplier', path);
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

},{"../paths":134,"./data":128,"./findModifiers":129,"./parseDecimals":131,"./parseNumeric":132,"./validate":133}],131:[function(_dereq_,module,exports){
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

},{"./data":128}],132:[function(_dereq_,module,exports){
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

},{}],133:[function(_dereq_,module,exports){
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

},{"./data":128}],134:[function(_dereq_,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"../paths":120,"dup":102}],135:[function(_dereq_,module,exports){
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

},{}],136:[function(_dereq_,module,exports){
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

},{}],137:[function(_dereq_,module,exports){
'use strict';
//

var toOrdinal = _dereq_('../paths').data.ordinalMap.toOrdinal;
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

},{"../paths":134,"./buildUp":136}],138:[function(_dereq_,module,exports){
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

},{}],139:[function(_dereq_,module,exports){
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

},{"./paths":142}],140:[function(_dereq_,module,exports){
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
  var form = t.verb.conjugation();
  if (form) {
    all[form] = t.normal;
  }
  if (form !== 'Infinitive') {
    all['Infinitive'] = t.verb.infinitive() || '';
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

},{"./generic":139,"./irregulars":141,"./suffixes":143,"./toActor":144,"./toAdjective":145}],141:[function(_dereq_,module,exports){
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

},{"./paths":142}],142:[function(_dereq_,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"../paths":147,"dup":102}],143:[function(_dereq_,module,exports){
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

},{"./data/rules":138}],144:[function(_dereq_,module,exports){
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

},{}],145:[function(_dereq_,module,exports){
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

},{}],146:[function(_dereq_,module,exports){
'use strict';

var predict = _dereq_('./predict');
var toInfinitive = _dereq_('./toInfinitive');
var _conjugate = _dereq_('./conjugate');

var pluralMap = {
  'is': 'are',
  'have': 'has'
};
var singularMap = {
  'are': 'is',
  'has': 'have'
};

module.exports = {
  toPlural: function toPlural() {
    if (pluralMap[this.normal]) {
      return pluralMap[this.normal];
    }
    if (this.tag.PresentTense) {
      return this.text.replace(/s$/, '');
    }
    return this.text;
  },
  toSingular: function toSingular() {
    if (singularMap[this.normal]) {
      return singularMap[this.normal];
    }
    return this.text;
  },
  infinitive: function infinitive() {
    return toInfinitive(this);
  },
  conjugation: function conjugation() {
    return predict(this);
  },
  conjugate: function conjugate() {
    return _conjugate(this);
  }
};

},{"./conjugate":140,"./predict":148,"./toInfinitive":150}],147:[function(_dereq_,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"../paths":120,"dup":102}],148:[function(_dereq_,module,exports){
'use strict';

var paths = _dereq_('../paths');
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

},{"../paths":147,"./suffix_rules":149}],149:[function(_dereq_,module,exports){
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

},{}],150:[function(_dereq_,module,exports){
'use strict';
//turn any verb into its infinitive form

var rules = _dereq_('./rules');
var irregulars = _dereq_('../paths').data.irregular_verbs;

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
  var form = t.verb.conjugation();
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

},{"../paths":147,"./rules":151}],151:[function(_dereq_,module,exports){
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

},{}],152:[function(_dereq_,module,exports){
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

},{}],153:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var paths = _dereq_('./paths');
var log = paths.log;
var fns = paths.fns;
var Term = _dereq_('../term');
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
    key: 'last',
    value: function last() {
      return this.terms[this.terms.length - 1];
    }
  }, {
    key: 'plaintext',
    value: function plaintext() {
      return this.terms.filter(function (t) {
        return t.sel;
      }).reduce(function (str, t) {
        str += t.plaintext();
        return str;
      }, '');
    }
  }, {
    key: 'normal',
    value: function normal() {
      return this.terms.filter(function (t) {
        return t.sel;
      }).map(function (t) {
        return t.normal;
      }).join(' ');
    }
  }, {
    key: 'check',
    value: function check() {
      this.terms.filter(function (t) {
        return t.sel;
      }).forEach(function (t) {
        t.render.check();
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

Terms.prototype.match = function (reg, verbose) {
  return match(this, reg, verbose); //returns an array of matches
};

Terms.prototype.when = function (reg, verbose) {
  var found = match(this, reg, verbose); //returns an array of matches
  found.forEach(function (arr) {
    arr.forEach(function (t) {
      t.sel = true;
    });
  });
  return this;
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

},{"../term":109,"./match":155,"./paths":159}],154:[function(_dereq_,module,exports){
'use strict';

var paths = _dereq_('../paths');
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
var fullMatch = function fullMatch(term, reg) {
  var found = perfectMatch(term, reg);
  if (reg.negative) {
    found = !!!found;
  }
  return found;
};

module.exports = fullMatch;

},{"../paths":159}],155:[function(_dereq_,module,exports){
'use strict';
//

var syntax = _dereq_('./syntax');
var log = _dereq_('../paths').log;
var startHere = _dereq_('./startHere');
var path = 'match';

//main event
var match = function match(ts, str, verbose) {
  if (verbose) {
    log.here(path);
  }
  var matches = [];
  //fail fast
  if (!str || !ts) {
    return matches;
  }
  var regs = syntax(str);
  if (verbose) {
    // console.log(regs);
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

},{"../paths":159,"./startHere":157,"./syntax":158}],156:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../paths').fns;

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

},{"../paths":159}],157:[function(_dereq_,module,exports){
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
var greedyOf = function greedyOf(terms, i, reg, until) {
  for (i = i; i < terms.length; i++) {
    var t = terms.get(i);
    //found next reg ('until')
    if (until && fullMatch(t, until)) {
      return i;
    }
    //die here
    if (!fullMatch(t, reg)) {
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
    if (fullMatch(term, reg)) {
      term_i += 1;
      //try to greedy-match '+'
      if (reg.consecutive) {
        var _until = regs[reg_i + 1];
        term_i = greedyOf(ts, term_i, reg, _until);
      }
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
    return null;
  }
  return ts.terms.slice(startAt, term_i);
};

module.exports = startHere;

},{"./fullMatch":154,"./lumpMatch":156}],158:[function(_dereq_,module,exports){
'use strict';
// parse a search lookup term find the regex-like syntax in this term

var fns = _dereq_('../paths').fns;

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
  reg = reg.split(/ +/);
  return reg.map(parse_term);
};
// console.log(parse_all(''));

module.exports = parse_all;

},{"../paths":159}],159:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  fns: _dereq_('../fns'),
  log: _dereq_('../logger')
};

},{"../fns":44,"../logger":46}]},{},[45])(45)
});