/* nlp_compromise v7.0.0
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
  if (str && str.length && str.substr(0, 1) === prefix) {
    return true;
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

},{}],11:[function(_dereq_,module,exports){
'use strict';

var Text = _dereq_('./text/text');

var nlp = function nlp(str, context) {
  return new Text(str, context);
};

module.exports = nlp;

},{"./text/text":77}],12:[function(_dereq_,module,exports){
'use strict';
//the data is all variously compressed and sorted
//this is just a helper file for the main file paths..

var files = {
  'people': ['firstnames'],
  'values': ['currencies', 'numbers'],
  dates: ['dates', 'holidays'],
  'nouns': ['professions', 'abbreviations', 'demonyms', 'irregular_plurals', 'places', 'uncountables'],
  'organizations': ['organizations', 'groups'],
  'adjectives': ['adjectives', 'superlatives'],
  'verbs': ['irregular_verbs', 'phrasal_verbs', 'verbs'],
  misc: ['misc']
};
var data = {};
Object.keys(files).forEach(function (k) {
  files[k].forEach(function (s) {
    data[s] = _dereq_('./' + k + '/' + s);
  });
});
module.exports = data;

},{}],13:[function(_dereq_,module,exports){
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

},{}],14:[function(_dereq_,module,exports){
'use strict';
//a lexicon is a giant object of known words

var data = _dereq_('./data');
var fns = _dereq_('./fns');
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
addObj(data.misc);
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
addArr(data.phrasal_verbs, 'PhrasalVerb');
addArr(data.verbs, 'Verb');

//number-words are well-structured
var obj = data.numbers.ordinal;
addArr(Object.keys(obj.ones), 'Value');
addArr(Object.keys(obj.teens), 'Value');
addArr(Object.keys(obj.tens), 'Value');
addArr(Object.keys(obj.multiples), 'Value');
obj = data.numbers.cardinal;
addArr(Object.keys(obj.ones), 'Value');
addArr(Object.keys(obj.teens), 'Value');
addArr(Object.keys(obj.tens), 'Value');
addArr(Object.keys(obj.multiples), 'Value');
addArr(Object.keys(data.numbers.prefixes), 'Value');

//singular/plural
addArr(Object.keys(data.irregular_plurals.toPlural), 'Singular');
addArr(Object.keys(data.irregular_plurals.toSingle), 'Plural');

//dates are well-structured
addArr(data.dates.days, 'Date');
addArr(data.dates.months, 'Date');
addArr(data.dates.durations, 'Date');
addArr(data.dates.relative, 'Date');
addArr(Object.keys(data.holidays), 'Date');
addArr(data.professions, 'Actor'); //?
addArr(data.demonyms, 'Demonym'); //?

//irregular verbs
var verbForms = {
  past: 'PastTense',
  present: 'PresentTense',
  perfect: 'PerfectTense',
  pluperfect: 'Pluperfect',
  future_perfect: 'FuturePerfect',
  gerund: 'Gerund',
  actor: 'Actor'
};
Object.keys(data.irregular_verbs).forEach(function (k) {
  lexicon[k] = 'Infinitive';
  Object.keys(data.irregular_verbs[k]).forEach(function (k2) {
    lexicon[verbForms[k2]] = data.irregular_verbs[k][k2];
  });
});

module.exports = lexicon;

// console.log(Object.keys(data));
// console.log(data.misc);
// console.log(lexicon.house);

},{"./data":12,"./fns":13}],15:[function(_dereq_,module,exports){
'use strict';

var chalk = _dereq_('chalk');

exports.rightPad = function (str, width, char) {
  char = char || ' ';
  str = str.toString();
  while (str.length < width) {
    str += char;
  }return str;
};
exports.leftPad = function (str, width, char) {
  char = char || ' ';
  str = str.toString();
  while (str.length < width) {
    str += char;
  }return str;
};

exports.findIndent = function (path) {
  var indent = path.split('/').length - 1;
  indent = exports.rightPad('', indent, '   ');
  return indent;
};

exports.makePath = function (path, indent) {
  //make path heading:
  if (path) {
    path += ':';
  }
  path = indent + chalk.blue(chalk.bgCyan(path));
  return path;
};

},{"chalk":2}],16:[function(_dereq_,module,exports){
(function (process){
'use strict';

var fns = _dereq_('./fns');
var chalk = _dereq_('chalk');
var pretty_print = _dereq_('./pretty_print');

var _disable = false;

//dummy function
var dummy = {
  here: function here() {},
  change: function change() {},
  show: function show() {},
  tag: function tag() {},
  disable: function disable() {
    _disable = true;
  }
};

var shouldPrint = function shouldPrint(path) {
  if (_disable) {
    return false;
  }
  var arg = process.argv[2];
  var toPrint = arg.replace(/^--debug=?/, '') || '*';
  if (toPrint === '*' || toPrint === '') {
    return true;
  }
  if (path.indexOf(toPrint) === 0) {
    return true;
  }
  return false;
};

var serverOutput = {
  here: function here(path) {
    if (shouldPrint(path)) {
      var indent = fns.findIndent(path) || '';
      console.log(fns.makePath(path, indent));
    }
  },
  warn: function warn(input, path) {
    if (shouldPrint(path)) {
      console.log('   ' + chalk.red('---' + input));
    }
  },
  change: function change(input, path) {
    if (shouldPrint(path)) {
      var indent = fns.findIndent(path) || '';
      console.log(indent + '   ' + chalk.green(input));
    }
  },
  tag: function tag(t, pos, reason, path) {
    if (shouldPrint(path)) {
      var indent = fns.findIndent(path) || '';
      console.log(indent + '     ' + chalk.green(t.normal) + ' -> ' + chalk.red(pos) + '    (' + reason + ')');
    }
  },
  show: function show(input, path) {
    if (shouldPrint(path)) {
      pretty_print(input, path);
    }
  },
  disable: function disable() {
    _disable = true;
  }
};

//figure out if it should print anything, first
var log = function () {
  if (!process || !process.argv || !process.argv[2]) {
    return dummy;
  }
  var arg = process.argv[2];
  if (!arg.match(/^--debug/)) {
    return dummy;
  }
  return serverOutput;
}();

module.exports = log;

}).call(this,_dereq_('_process'))
},{"./fns":15,"./pretty_print":17,"_process":1,"chalk":2}],17:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var fns = _dereq_('./fns');
var chalk = _dereq_('chalk');

//specific-ways to print classes
var format = {
  Sentence: function Sentence(s, indent) {
    console.log(indent + '[Sentence] ' + chalk.red(s.input));
    s.terms.forEach(function (t) {
      var pos = Object.keys(t.pos).filter(function (k) {
        return k !== 'Term';
      });
      console.log(indent + '   ' + chalk.green('- ' + t.text) + '   [' + pos.join(', ') + ']');
    });
  }
};
format.Text = function (t, indent) {
  console.log(indent + '[Text] ' + chalk.red(t.input));
  t.sentences.forEach(function (s) {
    format.Sentence(s, indent + '   ');
  });
};

var pretty_print = function pretty_print(input, path) {
  path = path || '';
  var indent = fns.findIndent(path) || '';
  console.log(fns.makePath(path, indent));

  indent = fns.leftPad(indent, path.length, ' ') || ' ';
  if (typeof input === 'string') {
    console.log(indent + input);
    return;
  }
  if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && format[input.constructor.name]) {
    format[input.constructor.name](input, indent);
    return;
  }
  return;
};

module.exports = pretty_print;

},{"./fns":15,"chalk":2}],18:[function(_dereq_,module,exports){
'use strict';

exports.strip_terminator = function (s) {
  var t = s.terms[s.terms.length - 1];
  var m = t.text.match(/([\.\?\!])\W*$/);
  if (m) {
    var char = m[0];
    //remove from end of last term
    t.text = t.text.substr(0, t.text.length - char.length);
    return char;
  }
  return '';
};

},{}],19:[function(_dereq_,module,exports){
'use strict';
//supported Sentence.get() methods

var mainVerb = function mainVerb(s) {
  for (var i = 0; i < s.terms.length; i++) {
    if (s.terms[i].pos.Verb) {
      return s.terms[i];
    }
  }
  return null;
};

module.exports = {

  sentencetype: function sentencetype(s) {
    var terminator = s.terminator || '';
    //grab only the first character (eg. "!!!")
    terminator = terminator.substr(0, 1);
    var mapping = {
      '.': 'Declarative',
      '!': 'Exclamation',
      '?': 'Question'
    };
    if (mapping[terminator]) {
      return mapping[terminator];
    }
    return 'Declarative';
  },

  conjugation: function conjugation(s) {
    var verb = mainVerb(s);
    if (verb) {
      return verb.info('conjugation');
    }
    return null;
  },

  tense: function tense(s) {
    var verb = mainVerb(s);
    if (verb) {
      return verb.info('tense');
    }
    return null;
  }
};

},{}],20:[function(_dereq_,module,exports){
'use strict';
//supported Sentence.return() methods

module.exports = {
  text: function text(s) {
    return s.terms.reduce(function (str, t) {
      str += t.as('text');
      return str;
    }, '') + s.terminator;
  },

  normal: function normal(s) {
    var normal = s.terms.reduce(function (str, t) {
      str += ' ' + t.as('normal');
      return str;
    }, '');
    normal = normal.trim();
    //add terminator
    var form = s.get('sentenceType');
    var mapping = {
      'Exclamation': '!',
      'Declarative': '.',
      'Question': '?'
    };
    if (mapping[form]) {
      normal = normal += mapping[form];
    }
    return normal;
  },

  html: function html(s) {
    var html = s.terms.reduce(function (str, t) {
      return str + '\n  ' + t.render('html');
    }, '');
    html += s.terminator;
    var classes = ['nlpSentence', s.info('SentenceType')];
    return '<span class="' + classes.join(' ') + '">' + html + '\n</span>';
  },

  tags: function tags(s) {
    return s.terms.map(function (t) {
      return {
        text: t.text,
        normal: t.as('normal'),
        tags: Object.keys(t.pos)
      };
    });
  }

};

},{}],21:[function(_dereq_,module,exports){
'use strict';
//a Sentence() is a list of Terms

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fns = _dereq_('../fns');
var Term = _dereq_('../term/term');
var split_terms = _dereq_('./split_terms');
var _info = _dereq_('./info');
var transforms = _dereq_('./transforms');
var _render = _dereq_('./render');
var helpers = _dereq_('./helpers');
var tagger = _dereq_('../tagger');

var Sentence = function () {
  function Sentence(str, context) {
    var _this = this;

    _classCallCheck(this, Sentence);

    this.input = fns.ensureString(str);
    this.context = fns.ensureObject(context);
    this.terms = split_terms(this.input);
    this.terms = this.terms.map(function (txt) {
      var c = fns.copy(context);
      c.sentence = _this; //give it a ref
      return new Term(txt, c);
    });
    //parse-out terminating character
    this.terminator = helpers.strip_terminator(this);
    //do Part-of-Speech tagging
    tagger(this);
  }

  _createClass(Sentence, [{
    key: 'addWord',

    //add a word at a specific location
    value: function addWord(str, i, tag) {
      var t = new Term(str);
      if (tag) {
        t.tag(tag, 'add-word');
      }
      var before = this.terms.slice(0, i + 1);
      var after = this.terms.slice(i + 1, this.terms.length);
      this.terms = before.concat([t], after);
    }
    //change the text, return this

  }, {
    key: 'to',
    value: function to(method) {
      if (fns.isFunction(method)) {
        return method(this);
      }
      //is it a known transformation?
      method = method.toLowerCase();
      if (transforms[method]) {
        return transforms[method](this);
      }
      //else, apply it to each term
      this.terms = this.terms.map(function (t) {
        return t.to(method);
      });
      return this;
    }

    //get, analyze, return boolean

  }, {
    key: 'is',
    value: function is(method) {
      if (fns.isFunction(method)) {
        return method(this);
      }
      return false;
    }

    //get some data back

  }, {
    key: 'info',
    value: function info(method) {
      if (fns.isFunction(method)) {
        return method(this);
      }
      //is it known?
      method = method.toLowerCase();
      if (_info[method]) {
        return _info[method](this);
      }
      //otherwise, try each term
      return this.terms.map(function (t) {
        return t.info(method);
      });
    }

    //return it as something

  }, {
    key: 'render',
    value: function render(method) {
      if (fns.isFunction(method)) {
        return method(this);
      }
      //is it known?
      method = method.toLowerCase();
      if (_render[method]) {
        return _render[method](this);
      }
      //otherwise, try each term
      return this.terms.map(function (t) {
        return t.render(method);
      });
    }
  }, {
    key: 'text',
    set: function set(str) {
      this.input = fns.ensureString(str);
      this.terminator = helpers.strip_terminator(this);
      tagger(this);
    },
    get: function get() {
      return fns.ensureString(this.input);
    }
  }]);

  return Sentence;
}();

module.exports = Sentence;

},{"../fns":10,"../tagger":26,"../term/term":61,"./helpers":18,"./info":19,"./render":20,"./split_terms":22,"./transforms":23}],22:[function(_dereq_,module,exports){
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
// console.log(split_terms('john is nice'))
// console.log(split_terms('  john   is   nice '))
// console.log(split_terms("  john\tis \n  nice "))

},{}],23:[function(_dereq_,module,exports){
'use strict';
//supported Sentence.to() methods

module.exports = {
  normal: function normal(s) {
    s.terms = s.terms.map(function (t) {
      return t.to('normal');
    });
    return s;
  },

  exclamation: function exclamation(s) {
    s.terminator = '!';
    return s;
  },

  statement: function statement(s) {
    s.terminator = '.';
    return s;
  }
};

},{}],24:[function(_dereq_,module,exports){
'use strict';

//the formulaic contraction types:
exports.easy_ends = {
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

exports.irregulars = {
  'dunno': ['do', 'not', 'know'],
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
  'let\'s': ['let', 'us'],
  'brb': ['be', 'right', 'back']
};

},{}],25:[function(_dereq_,module,exports){
'use strict';

var data = _dereq_('./data');
//accept [i, ll] and return [i, will]
var identify_contraction = function identify_contraction(parts) {
  //easier contractions, like 'i'll'
  if (data.easy_ends[parts.end]) {
    parts.end = data.easy_ends[parts.end];
    return parts;
  }
  //ambiguous contraction 's'
  if (parts.end === 's') {}
  return parts;
};

var interpret_contractions = function interpret_contractions(s) {
  for (var i = 0; i < s.terms.length; i++) {
    var t = s.terms[i];
    //interpret irregular contractions, like "let's"
    if (data.irregulars[t.normal]) {
      var arr = data.irregulars[t.normal];
      s.terms[i].silent_term = arr[0];
      //add second word
      s.addWord('', i, null);
      s.terms[i + 1].silent_term = arr[1];
      //if it exists, add a third word
      if (arr[2]) {
        s.addWord('', i + 1, null);
        s.terms[i + 2].silent_term = arr[2];
      }
      break;
    }
    var parts = s.terms[i].info('contraction');
    if (parts) {
      parts = identify_contraction(parts);
      s.terms[i].silent_term = parts.start;
      s.addWord('', i, null);
      s.terms[i + 1].silent_term = parts.end;
      break;
    }
  }
  return s;
};

module.exports = interpret_contractions;

},{"./data":24}],26:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../log');

var step = {
  lexicon_step: _dereq_('./steps/lexicon_pass'),
  capital_step: _dereq_('./steps/capital_step'),
  suffix_step: _dereq_('./steps/suffix_step'),
  web_step: _dereq_('./steps/web_step'),
  wrestle: _dereq_('./steps/wrestle'),
  noun_fallback: _dereq_('./steps/noun_fallback')
};

var interpret_contractions = _dereq_('./contraction');

var lumper = {
  lexicon_lump: _dereq_('./lumper/lexicon_lump'),
  lump_two: _dereq_('./lumper/lump_two'),
  lump_three: _dereq_('./lumper/lump_three')
};

var tagger = function tagger(s) {
  log.here('tagger');
  s = interpret_contractions(s);
  s = lumper.lexicon_lump(s);
  s = step.lexicon_step(s);
  s = step.capital_step(s);
  s = step.web_step(s);
  s = step.suffix_step(s);
  s = step.noun_fallback(s);
  for (var i = 0; i < 2; i++) {
    s = lumper.lump_two(s);
    s = lumper.lump_three(s);
    s = step.wrestle(s);
  }
  return s;
};

module.exports = tagger;

},{"../log":16,"./contraction":25,"./lumper/lexicon_lump":30,"./lumper/lump_three":31,"./lumper/lump_two":32,"./steps/capital_step":34,"./steps/lexicon_pass":36,"./steps/noun_fallback":37,"./steps/suffix_step":38,"./steps/web_step":39,"./steps/wrestle":40}],27:[function(_dereq_,module,exports){
'use strict';

var Term = _dereq_('../../term/term');
var log = _dereq_('../paths').log;
var path = 'tagger/combine';
//merge two term objects.. carefully

var combine = function combine(s, i) {
  var a = s.terms[i];
  var b = s.terms[i + 1];
  if (!b) {
    return;
  }
  log.change('--combining: "' + a.normal + '"+"' + b.normal + '"', path);
  var text = a.whitespace.before + a.text + a.whitespace.after;
  text += b.whitespace.before + b.text + b.whitespace.after;
  s.terms[i] = new Term(text, a.context);
  s.terms[i + 1] = null;
  s.terms = s.terms.filter(function (t) {
    return t !== null;
  });
  return;
};

module.exports = combine;

},{"../../term/term":61,"../paths":33}],28:[function(_dereq_,module,exports){
'use strict';

//rules for combining three terms into one
module.exports = [{
  //john f kennedy
  condition: function condition(a, b, c) {
    return a.pos.Person && b.info('isAcronym') && c.pos.Noun;
  },
  result: 'Person',
  reason: 'Name-Initial-Capital'
}, {
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
    return a.info('titleCase') && b.normal === 'of' && c.info('titleCase');
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
//   condition: (a, b, c) => (a.normal === 'will' && b.normal === 'have' && c.pos.Verb),
//   result: 'FutureTense',
//   reason: 'will-have-Verb'
// },

{
  //two hundred and three
  condition: function condition(a, b, c) {
    return a.pos.Value && b.normal === 'and' && c.pos.Value;
  },
  result: 'Value',
  reason: 'Value-and-Value'
}];

},{}],29:[function(_dereq_,module,exports){
'use strict';
//rules that combine two words

module.exports = [{
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
    return a.pos.Honourific && b.info('TitleCase');
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
    return a.pos.Person && !a.pos.Pronoun && !a.pos.Possessive && !a.info('hasComma') && b.info('TitleCase') && !a.is_acronym() && !b.pos.Verb;
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
    return a.info('TitleCase') && a.pos.Noun && b.pos['Organization'] || b.info('TitleCase') && a.pos['Organization'];
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
},
// {
//   //will walk (perfect)
//   condition: (a, b) => (a.normal === 'will' && b.pos.Verb),
//   result: 'PerfectTense',
//   reason: 'will-verb'
// },
// {
//   //will have walked (pluperfect)
//   condition: (a, b) => (a.normal.match(/^will ha(ve|d)$/) && b.pos.Verb),
//   result: 'Pluperfect',
//   reason: 'will-have-verb'
// },
{
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
},
// {
//   //for verbs in Past/Present Continuous ('is raining')
//   condition: (a, b) => (a.pos.Copula && a.normal.match(/^(am|is|are|was|were)$/)
//     && b.pos.Verb && b.normal.match(/ing$/)),
//   result: 'Verb',
//   reason: 'copula-gerund'
// },
{
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
}];

},{}],30:[function(_dereq_,module,exports){
'use strict';
//check for "united" + "kingdom" in lexicon, and combine + tag it

var combine = _dereq_('./combine');
var p = _dereq_('../paths');
var log = p.log;
var lexicon = p.lexicon;
var path = 'tagger/multiple';

var lexicon_lump = function lexicon_lump(s) {
  log.here(path);
  for (var i = 0; i < s.terms.length - 1; i++) {
    //try 'A'+'B'
    var str = s.terms[i].normal + ' ' + s.terms[i + 1].normal;
    if (lexicon[str]) {
      combine(s, i);
      s.terms[i].tag(lexicon[str], 'multiples-lexicon');
    }
  }

  return s;
};

module.exports = lexicon_lump;

},{"../paths":33,"./combine":27}],31:[function(_dereq_,module,exports){
'use strict';

var combine = _dereq_('./combine');
var do_three = _dereq_('./data/do_three');
// const dont_three = require('./data/dont_three');

var lump_three = function lump_three(s) {
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
        s.terms[i].tag(do_three[o].result, 'lump-three (' + do_three[o].reason + ')');
      }
    }
  }
  return s;
};

module.exports = lump_three;

},{"./combine":27,"./data/do_three":28}],32:[function(_dereq_,module,exports){
'use strict';

var do_two = _dereq_('./data/do_two');
var combine = _dereq_('./combine');
// const dont_two = require('./data/dont_two');

var lump_two = function lump_two(s) {
  for (var o = 0; o < do_two.length; o++) {
    for (var i = 0; i < s.terms.length - 1; i++) {
      var a = s.terms[i];
      var b = s.terms[i + 1];
      if (do_two[o].condition(a, b)) {
        //merge terms
        combine(s, i);
        //tag it as POS
        s.terms[i].tag(do_two[o].result, 'lump-two (' + do_two[o].reason + ')');
      }
    }
  }
  return s;
};

module.exports = lump_two;

},{"./combine":27,"./data/do_two":29}],33:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  lexicon: _dereq_('../lexicon/lexicon'),
  data: _dereq_('../lexicon/data'),
  fns: _dereq_('../fns'),
  log: _dereq_('../log')
};

},{"../fns":10,"../lexicon/data":12,"../lexicon/lexicon":14,"../log":16}],34:[function(_dereq_,module,exports){
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
    if (t.info('titleCase') && t.info('isWord')) {
      t.tag('Noun', 'capital-step');
    }
  }
  return s;
};

module.exports = capital_logic;

},{"../paths":33}],35:[function(_dereq_,module,exports){
'use strict';
//regex suffix patterns and their most common parts of speech,
//built using wordnet, by spencer kelly.

//the order here matters.

module.exports = [['^[0-9]+ ?(am|pm)$', 'Date'], ['^[0-9]+(st|nd|rd)?$', 'Value'], ['^[a-z]et$', 'Verb'], ['cede$', 'Infinitive'], ['.[cts]hy$', 'Adjective'], ['.[st]ty$', 'Adjective'], ['.[lnr]ize$', 'Infinitive'], ['.[gk]y$', 'Adjective'], ['.fies$', 'PresentTense'], ['.some$', 'Adjective'], ['.[nrtumcd]al$', 'Adjective'], ['.que$', 'Adjective'], ['.[tnl]ary$', 'Adjective'], ['.[di]est$', 'Superlative'], ['^(un|de|re)\\-[a-z]..', 'Verb'], ['.lar$', 'Adjective'], ['[bszmp]{2}y', 'Adjective'], ['.zes$', 'PresentTense'], ['.[icldtgrv]ent$', 'Adjective'], ['.[rln]ates$', 'PresentTense'], ['.[oe]ry$', 'Singular'], ['[rdntkdhs]ly$', 'Adverb'], ['.[lsrnpb]ian$', 'Adjective'], ['.[^aeiou]ial$', 'Adjective'], ['.[^aeiou]eal$', 'Adjective'], ['.[vrl]id$', 'Adjective'], ['.[ilk]er$', 'Comparative'], ['.ike$', 'Adjective'], ['.ends?$', 'Verb'], ['.wards$', 'Adverb'], ['.rmy$', 'Adjective'], ['.rol$', 'Singular'], ['.tors$', 'Noun'], ['.azy$', 'Adjective'], ['.where$', 'Adverb'], ['.ify$', 'Infinitive'], ['.bound$', 'Adjective'], ['.[^z]ens$', 'Verb'], ['.oid$', 'Adjective'], ['.vice$', 'Singular'], ['.rough$', 'Adjective'], ['.mum$', 'Adjective'], ['.teen(th)?$', 'Value'], ['.oses$', 'PresentTense'], ['.ishes$', 'PresentTense'], ['.ects$', 'PresentTense'], ['.tieth$', 'Ordinal'], ['.ices$', 'Plural'], ['.pose$', 'Infinitive'], ['.ions$', 'Plural'], ['.ean$', 'Adjective'], ['.[ia]sed$', 'Adjective'], ['.tized$', 'PastTense'], ['.llen$', 'Adjective'], ['.fore$', 'Adverb'], ['.ances$', 'Plural'], ['.gate$', 'Infinitive'], ['.nes$', 'PresentTense'], ['.less$', 'Adverb'], ['.ried$', 'Adjective'], ['.gone$', 'Adjective'], ['.made$', 'Adjective'], ['.ing$', 'Gerund'], //likely to be converted to adjective after lexicon pass
['.tions$', 'Plural'], ['.tures$', 'Plural'], ['.ous$', 'Adjective'], ['.ports$', 'Plural'], ['. so$', 'Adverb'], ['.ints$', 'Plural'], ['.[gt]led$', 'Adjective'], ['.lked$', 'PastTense'], ['.fully$', 'Adverb'], ['.*ould$', 'Modal'], ['^-?[0-9]+(.,[0-9]+)?$', 'Value'], ['[a-z]*\\-[a-z]*\\-', 'Adjective'], ['[a-z]\'s$', 'Noun'], ['.\'n$', 'Verb'], ['.\'re$', 'Copula'], ['.\'ll$', 'Modal'], ['.\'t$', 'Verb'], ['.tches$', 'PresentTense'], ['^https?\:?\/\/[a-z0-9]', 'Url'], //the colon is removed in normalisation
['^www\.[a-z0-9]', 'Url'], ['.ize$', 'Infinitive'], ['.[^aeiou]ise$', 'Infinitive'], ['.[aeiou]te$', 'Infinitive'], ['.ea$', 'Singular'], ['[aeiou][pns]er$', 'Singular'], ['.ia$', 'Noun'], ['.sis$', 'Singular'], ['.[aeiou]na$', 'Noun'], ['.[^aeiou]ity$', 'Singular'], ['.[^aeiou]ium$', 'Singular'], ['.[^aeiou][ei]al$', 'Adjective'], ['.ffy$', 'Adjective'], ['.[^aeiou]ic$', 'Adjective'], ['.(gg|bb|zz)ly$', 'Adjective'], ['.[aeiou]my$', 'Adjective'], ['.[^aeiou][ai]ble$', 'Adjective'], ['.[^aeiou]eable$', 'Adjective'], ['.[^aeiou]ful$', 'Adjective'], ['.[^aeiou]ish$', 'Adjective'], ['.[^aeiou]ica$', 'Singular'], ['[aeiou][^aeiou]is$', 'Singular'], ['[^aeiou]ard$', 'Singular'], ['[^aeiou]ism$', 'Singular'], ['.[^aeiou]ity$', 'Singular'], ['.[^aeiou]ium$', 'Singular'], ['.[lstrn]us$', 'Singular'], ['..ic$', 'Adjective'], ['[aeiou][^aeiou]id$', 'Adjective'], ['.[^aeiou]ish$', 'Adjective'], ['.[^aeiou]ive$', 'Adjective'], ['[ea]{2}zy$', 'Adjective'], ['[^aeiou]ician$', 'Actor'], ['.keeper$', 'Actor'], ['.logist$', 'Actor'], ['..ier$', 'Actor'], ['.[^aeiou][ao]pher$', 'Actor'], ['.tive$', 'Actor'], ['[aeiou].*ist$', 'Adjective'], ['[^i]fer$', 'Infinitive'], ['(bb|tt|gg|pp|ll|nn|mm)', 'Verb'], //rubbed
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
    pos: a[1],
    str: a[0]
  };
});

},{}],36:[function(_dereq_,module,exports){
'use strict';

var p = _dereq_('../paths');
var lexicon = p.lexicon;
var log = p.log;
var path = 'tagger/lexicon';

var check_lexicon = function check_lexicon(str) {
  if (lexicon[str]) {
    return lexicon[str];
  }
  //normalize it a bit
  // str = str.replace(/\bnot\b/, '');
  // str = str.replace(/\bwill\b/, '');
  // str = str.replace(/\bwon't\b/, '');
  // str = str.replace(/\bhave(n't)?\b/, '');
  // str = str.trim();
  // if (lexicon[str]) {
  //   return lexicon[str];
  // }
  return null;
};

var lexicon_pass = function lexicon_pass(s) {
  log.here(path);
  //loop through each term
  for (var i = 0; i < s.terms.length; i++) {
    var t = s.terms[i];
    //contraction lookup
    var found = check_lexicon(t.silent_term);
    if (t.silent_term && found) {
      t.tag(found, 'silent_term-lexicon');
      continue;
    }
    //basic term lookup
    found = check_lexicon(t.normal);
    if (found) {
      t.tag(found, 'lexicon-match');
      continue;
    }
  }
  return s;
};

module.exports = lexicon_pass;

},{"../paths":33}],37:[function(_dereq_,module,exports){
'use strict';
//tag word as noun if we know nothing about it, still.

var noun_fallback = function noun_fallback(s) {
  for (var i = 0; i < s.terms.length; i++) {
    //fail-fast
    if (s.terms[i].pos.Noun || s.terms[i].pos.Verb) {
      continue;
    }
    //ensure it only has the tag 'Term'
    var tags = Object.keys(s.terms[i].pos);
    if (tags.length === 0) {
      //ensure it's atleast word-looking
      if (s.terms[i].info('isWord') === false) {
        continue;
      }
      s.terms[i].tag('Noun', 'noun-fallback');
    }
  }
  return s;
};

module.exports = noun_fallback;

},{}],38:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var rules = _dereq_('./data/word_rules');
var path = 'tagger/suffix';

var suffix_step = function suffix_step(s) {
  log.here(path);
  for (var i = 0; i < s.terms.length; i++) {
    var t = s.terms[i];
    //don't over-write any known tags
    if (Object.keys(s.terms[i].pos).length > 0) {
      continue;
    }
    for (var o = 0; o < rules.length; o++) {
      var r = rules[o];
      if (t.normal.match(r.reg)) {
        t.tag(r.pos, 'suffix-step- "' + r.str + '"');
      }
    }
  }
  return s;
};

module.exports = suffix_step;

},{"../paths":33,"./data/word_rules":35}],39:[function(_dereq_,module,exports){
'use strict';
//identify urls, hashtags, @mentions, emails

var path = 'tagger/web';
var log = _dereq_('../paths').log;
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
    var t = terms[i];
    var str = t.text.trim().toLowerCase();
    if (is_email(str)) {
      t.tag('Email', 'web_pass');
    }
    if (is_hashtag(str)) {
      t.tag('HashTag', 'web_pass');
    }
    if (is_atmention(str)) {
      t.tag('AtMention', 'web_pass');
    }
    if (is_url(str)) {
      t.tag('Url', 'web_pass');
    }
  }
  return terms;
};

module.exports = web_pass;

},{"../paths":33}],40:[function(_dereq_,module,exports){
'use strict';

var log = _dereq_('../paths').log;
var path = 'tagger/wrestle';
//take basic POS like 'Noun' and try to find a more aggressive POS
var wrestle = function wrestle(s) {
  log.here(path);
  s.terms = s.terms.map(function (t) {
    console.log(t.pos);
    return t.to('Specific');
  });
  return s;
};

module.exports = wrestle;

},{"../paths":33}],41:[function(_dereq_,module,exports){
'use strict';
//the POS tags we use, according to their dependencies

var tree = {
  Noun: {
    Singular: {
      Pronoun: true,
      Person: {
        MalePerson: true,
        FemalePerson: true
      },
      Place: {
        Country: true,
        City: true
      },
      Organization: true,
      Value: {
        Currency: true,
        Ordinal: true,
        Cardinal: true
      },
      Date: true
    },
    Plural: true,
    Actor: true,
    Demonym: true
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
    Auxillary: true,
    PhrasalVerb: true,
    Negative: true
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
  Condition: true,
  Possessive: true,
  QuestionWord: true,
  Expression: true,
  Term: true //fallback
};

//list of inconsistent parts-of-speech
var conflicts = [
//top-level pos are all inconsistent
['Noun', 'Verb', 'Adjective', 'Adverb', 'Determiner', 'Conjunction', 'Preposition', 'QuestionWord', 'Expression'],
//nouns
['Person', 'Organization', 'Value', 'Date', 'Place', 'Actor', 'Demonym', 'Pronoun'],
//things that can't be plural
['Plural', 'Singular'], ['Plural', 'Pronoun'], ['Plural', 'Person'], ['Plural', 'Organization'], ['Plural', 'Currency'], ['Plural', 'Ordinal'],
//people
['MalePerson', 'FemalePerson'],
//adjectives
['Comparative', 'Superlative'],
//values
['Currency', 'Ordinal'], //$"5.50th"?
//verbs
['Infinitive', 'Gerund', 'Pluperfect', 'FuturePerfect'],
//tenses
['PastTense', 'PresentTense', 'PerfectTense'],
//non-infinitive
['Infinitive', 'PastTense'], ['Infinitive', 'PresentTense'],
//non-gerund
['Gerund', 'PastTense'], ['Gerund', 'PresentTense'],
//more verbs
['Copula', 'Modal']];
var tags = {};
//recursively add them, with is
var add_tags = function add_tags(obj, is) {
  Object.keys(obj).forEach(function (k) {
    tags[k] = is;
    if (obj[k] !== true) {
      add_tags(obj[k], is.concat([k])); //recursive
    }
  });
};
add_tags(tree, []);

//for each tag, add their notibilities
Object.keys(tags).forEach(function (k) {
  tags[k] = {
    is: [].concat(tags[k]),
    not: {}
  };
  for (var i = 0; i < conflicts.length; i++) {
    if (conflicts[i].indexOf(k) !== -1) {
      conflicts[i].forEach(function (s) {
        if (s !== k) {
          tags[k].not[s] = true;
        }
      });
    }
  }
});
//also add their derived notible types
Object.keys(tags).forEach(function (k) {
  for (var i = 0; i < tags[k].is.length; i++) {
    var parent = tags[k].is[i];
    var bad_keys = Object.keys(tags[parent].not);
    for (var o = 0; o < bad_keys.length; o++) {
      tags[k].not[bad_keys[o]] = true;
    }
  }
});
//add themselves to 'is'
Object.keys(tags).forEach(function (k) {
  // tags[k].is = tags[k].is.concat([k]);
  tags[k].is.push(k);
});

module.exports = tags;
// console.log(tags);

},{}],42:[function(_dereq_,module,exports){
'use strict';
//the ordering of the requires-matters

var Term = _dereq_('./term');
var Noun = _dereq_('./noun');
var Verb = _dereq_('./verb');
var Value = _dereq_('./value');
// const Adjective = require('./adjective')

module.exports = {
  Term: Term,
  Noun: Noun,
  Verb: Verb,
  Value: Value
};

},{"./noun":44,"./term":49,"./value":50,"./verb":53}],43:[function(_dereq_,module,exports){
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

},{}],44:[function(_dereq_,module,exports){
'use strict';

var isPlural = _dereq_('./inflection/isPlural');
var hasPlural = _dereq_('./inflection/hasPlural');
var _article = _dereq_('./article');

var info = {
  isplural: function isplural(t) {
    return isPlural(t);
  },
  hasplural: function hasplural(t) {
    return hasPlural(t);
  },
  article: function article(t) {
    return _article(t);
  }
};
module.exports = info;

},{"./article":43,"./inflection/hasPlural":45,"./inflection/isPlural":46}],45:[function(_dereq_,module,exports){
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

},{"../../paths":48}],46:[function(_dereq_,module,exports){
'use strict';

var irregulars = _dereq_('../../paths').data.irregular_plurals;
var rules = _dereq_('./rules');

//first, try to guess based on existing tags
var couldEvenBePlural = function couldEvenBePlural(t) {
  if (t.pos.Person || t.pos.Value || t.pos.Organization || t.pos.Date) {
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
  // a fallback 'looks pretty plural' rule..
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

},{"../../paths":48,"./rules":47}],47:[function(_dereq_,module,exports){
'use strict';
//similar to plural/singularize rules, but not the same

var plural_indicators = [/(^v)ies$/i, /ises$/i, /ives$/i, /(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /(buffal|tomat|tornad)oes$/i, /(analy|ba|diagno|parenthe|progno|synop|the)ses$/i, /(vert|ind|cort)ices$/i, /(matr|append)ices$/i, /(x|ch|ss|sh|s|z|o)es$/i, /men$/i, /news$/i, /.tia$/i, /(^f)ves$/i, /(lr)ves$/i, /(^aeiouy|qu)ies$/i, /(m|l)ice$/i, /(cris|ax|test)es$/i, /(alias|status)es$/i, /ics$/i];

//similar to plural/singularize rules, but not the same
var singular_indicators = [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i];
module.exports = {
  singular_indicators: singular_indicators,
  plural_indicators: plural_indicators
};

},{}],48:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  data: _dereq_('../../lexicon/data'),
  log: _dereq_('../../log'),
  fns: _dereq_('../../fns')
};

},{"../../fns":10,"../../lexicon/data":12,"../../log":16}],49:[function(_dereq_,module,exports){
'use strict';

var info = {

  //the punctuation at the end of this term
  endpunctuation: function endpunctuation(t) {
    var m = t.text.match(/[a-z]([,:;\/.(\.\.\.)\!\?]+)$/);
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

  hyphenation: function hyphenation(t) {
    var m = t.text.match(/^([a-z]+)-([a-z]+)$/);
    if (m && m[1] && m[2]) {
      return {
        start: m[1],
        end: m[2]
      };
    }
    return null;
  },

  contraction: function contraction(t) {
    var allowed = {
      'll': true,
      't': true,
      's': true,
      'd': true,
      'm': true
    };
    var parts = t.text.match(/^([a-z]+)'([a-z][a-z]?)$/);
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
    parts = t.text.match(/^([a-z]+s)'$/);
    if (parts) {
      return {
        start: parts[1],
        end: ''
      };
    }
    return null;
  },

  titlecase: function titlecase(t) {
    if (t.text.match(/^[A-Z][a-z]/)) {
      return true;
    }
    return false;
  },

  //is it perhaps not an english word?
  //.. to avoid lumping words with non-word stuff
  isword: function isword(t) {
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

  isacronym: function isacronym(t) {
    //like N.D.A
    if (t.text.match(/([A-Z]\.)+[A-Z]?$/i)) {
      return true;
    }
    //like 'F.'
    if (t.text.match(/^[A-Z]\.$/i)) {
      return true;
    }
    //like NDA
    if (t.text.match(/[A-Z]{3}$/i)) {
      return true;
    }
    return false;
  },

  hascomma: function hascomma(t) {
    if (t.info('endPunctuation') === 'comma') {
      return true;
    }
    return false;
  }

};

module.exports = info;

},{}],50:[function(_dereq_,module,exports){
'use strict';

var info = {

  //return a float/integer
  number: function number() {
    return 42; //TODO
  }

};
module.exports = info;

},{}],51:[function(_dereq_,module,exports){
'use strict';
//turn a verb into all it's forms

var to = {
  Actor: _dereq_('./toActor')
};

var conjugate = function conjugate(t) {
  var all = {};
  //first, get its current form
  var form = t.info('Conjugation');
  if (form) {
    all[form] = t.normal;
  }
  if (form !== 'Infinitive') {
    all['Infinitive'] = t.info('Infinitive');
  }
  //ok, send this infinitive to all conjugators
  var inf = all['Infinitive'] || t.normal;
  //to Actor
  if (!all.Actor) {
    all.Actor = to.Actor(inf);
  }

  return all;
};

module.exports = conjugate;

},{"./toActor":52}],52:[function(_dereq_,module,exports){
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

},{}],53:[function(_dereq_,module,exports){
'use strict';

var predictForm = _dereq_('./predict');
var _conjugate = _dereq_('./conjugation');
var toInfinitive = _dereq_('./toInfinitive');
var info = {

  //try to predict which form this verb is
  conjugation: function conjugation(t) {
    return predictForm(t);
  },
  infinitive: function infinitive(t) {
    return toInfinitive(t);
  },
  //return all forms of this verb
  conjugate: function conjugate(t) {
    return _conjugate(t);
  },

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
      if (t.pos[keys[i]]) {
        return tenses[keys[i]];
      }
    }
    return null;
  }

};
module.exports = info;

},{"./conjugation":51,"./predict":54,"./toInfinitive":56}],54:[function(_dereq_,module,exports){
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
  Pluperfect: true,
  FuturePerfect: true
};

var predictForm = function predictForm(term) {
  //do we already know the form?
  var keys = Object.keys(goodTypes);
  for (var i = 0; i < keys.length; i++) {
    if (term.pos[keys[i]]) {
      log.show('predicted ' + keys[i] + ' from pos', path);
      return keys[i];
    }
  }
  //consult our handy suffix rules
  var arr = Object.keys(suffix_rules);
  for (var _i = 0; _i < arr.length; _i++) {
    if (fns.endsWith(term.normal, arr[_i]) && arr[_i].length < term.normal.length) {
      var msg = 'predicted ' + suffix_rules[arr[_i]] + ' from suffix ' + arr[_i];
      log.show(msg, path);
      return suffix_rules[arr[_i]];
    }
  }
  return null;
};

module.exports = predictForm;

},{"../paths":48,"./suffix_rules":55}],55:[function(_dereq_,module,exports){
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

},{}],56:[function(_dereq_,module,exports){
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
  if (t.pos.Infinitive) {
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

},{"../../paths":48,"./rules":57}],57:[function(_dereq_,module,exports){
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

},{}],58:[function(_dereq_,module,exports){
'use strict';

var renderHtml = _dereq_('./renderHtml');

//supported Sentence.return() methods
module.exports = {
  text: function text(t) {
    return t.whitespace.before + t.text + t.whitespace.after;
  },
  normal: function normal(t) {
    return t.normal;
  },
  html: function html(t) {
    return renderHtml(t);
  }
};

},{"./renderHtml":59}],59:[function(_dereq_,module,exports){
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
  var classes = Object.keys(t.pos).filter(function (tag) {
    return tag !== 'Term';
  });
  classes = classes.map(function (c) {
    return 'nlp' + c;
  });
  classes = classes.join(' ');
  var text = t.whitespace.before + t.text + t.whitespace.after;
  text = sanitize(text);
  text = escapeHtml(text);
  return '<span class="' + classes + '">' + text + '</span>';
};

module.exports = renderHtml;

},{}],60:[function(_dereq_,module,exports){
'use strict';
//set a term as a particular Part-of-speech

var log = _dereq_('../log');
var info = _dereq_('./info');
var transforms = _dereq_('./transforms');
var tagset = _dereq_('../tagset');
var fns = _dereq_('../fns');
var path = 'tagger';

//check if the term is compatible with a pos tag.
var canBe = function canBe(term, tag) {
  //already compatible..
  if (term.pos[tag]) {
    return true;
  }
  //unknown tag..
  if (!tagset[tag]) {
    //huh? sure, go for it.
    return true;
  }
  //consult tagset's incompatible tags
  var not = Object.keys(tagset[tag].not);
  for (var i = 0; i < not.length; i++) {
    if (term.pos[not[i]]) {
      return false;
    }
  }
  return true;
};

var set_tag = function set_tag(term, tag, reason) {
  log.tag(term, tag, reason, path);
  //reset term, if necessary
  if (canBe(term, tag) === false) {
    term.pos = {};
    term.transforms = {};
    term.infos = {};
  }
  if (!tagset[tag]) {
    console.warn('unknown tag ' + tag + ' - ' + reason);
    return;
  }
  var tags = tagset[tag].is;
  for (var i = 0; i < tags.length; i++) {
    term.pos[tags[i]] = true;
    fns.extend(term.transforms, transforms[tags[i]]);
    fns.extend(term.infos, info[tags[i]]);
  }
  return;
};

module.exports = set_tag;

},{"../fns":10,"../log":16,"../tagset":41,"./info":42,"./transforms":63}],61:[function(_dereq_,module,exports){
'use strict';
//a Text() is a list of sentences, which are a list of Terms

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fns = _dereq_('../fns');
var log = _dereq_('../log');
var set_tag = _dereq_('./tag');
var tagset = _dereq_('../tagset');
var build_whitespace = _dereq_('./whitespace');
var _render = _dereq_('./render');
var normalize = _dereq_('./transforms/term/normalize');
var info = _dereq_('./info');
var transforms = _dereq_('./transforms');

var Term = function () {
  function Term(str, context) {
    _classCallCheck(this, Term);

    this.str = fns.ensureString(str);
    this.context = fns.ensureObject(context);
    this.whitespace = build_whitespace(this.str);
    this.silent_term = '';
    this.text = this.str.trim();
    this.normal = normalize(this.text);
    this.pos = {};
    this.transforms = transforms.Term;
    this.infos = info.Term;
  }

  _createClass(Term, [{
    key: 'tag',
    value: function tag(_tag, reason) {
      set_tag(this, _tag, reason);
      this.context.reason = reason;
      return this;
    }
    //change the text, return this

  }, {
    key: 'to',
    value: function to(method) {
      if (fns.isFunction(method)) {
        return method(this);
      }
      //is it a known transformation?
      var transform = this.transforms[method.toLowerCase()];
      if (transform) {
        return transform(this);
      }
      //is it just a pos-tag?
      method = fns.titleCase(method);
      if (tagset[method]) {
        this.tag(method, 'manual-tag');
        return this.to('Specific');
      }
      log.change('no method ' + method, 'term');
      return this;
    }

    //get some data back

  }, {
    key: 'info',
    value: function info(method) {
      if (fns.isFunction(method)) {
        return method(this);
      }
      method = method.toLowerCase();
      if (this.infos[method]) {
        return this.infos[method](this);
      }
      return null;
    }

    //get, analyze, return boolean

  }, {
    key: 'is',
    value: function (_is) {
      function is(_x) {
        return _is.apply(this, arguments);
      }

      is.toString = function () {
        return _is.toString();
      };

      return is;
    }(function (method) {
      if (fns.isFunction(method)) {
        return method(this);
      }
      method = fns.titleCase(method);
      //if we already know it is
      if (this.pos[method]) {
        return true;
      }
      //if we already know this is incompatible
      if (tagset[method] && !this.canBe(method)) {
        return false;
      }
      //is it a known 'is' method?
      method = method.toLowerCase();
      if (is[method]) {
        return is[method](this);
      }
      return false;
    })
    //return it as something

  }, {
    key: 'render',
    value: function render(method) {
      if (fns.isFunction(method)) {
        return method(this);
      }
      //is it known?
      method = method.toLowerCase();
      if (_render[method]) {
        return _render[method](this);
      }
      return '';
    }
  }, {
    key: 'text',
    set: function set(str) {
      this.str = fns.ensureString(str);
      this.normal = normalize(this.text);
    },
    get: function get() {
      return fns.ensureString(this.str);
    }
  }]);

  return Term;
}();

module.exports = Term;

},{"../fns":10,"../log":16,"../tagset":41,"./info":42,"./render":58,"./tag":60,"./transforms":63,"./transforms/term/normalize":69,"./whitespace":73}],62:[function(_dereq_,module,exports){
'use strict';

var adjective = {
  noun: function noun(t) {
    t.text += 'ness';
    return t;
  }
};
module.exports = adjective;

},{}],63:[function(_dereq_,module,exports){
'use strict';
//the ordering of the requires-matters

module.exports = {
  Term: _dereq_('./term'),
  Noun: _dereq_('./noun'),
  Value: _dereq_('./value'),
  Verb: _dereq_('./verb'),
  Adjective: _dereq_('./adjective'),
  Person: _dereq_('./person')
};

},{"./adjective":62,"./noun":64,"./person":66,"./term":68,"./value":70,"./verb":71}],64:[function(_dereq_,module,exports){
'use strict';

var wrestleNoun = _dereq_('./wrestle');
var noun = {
  /** Convert the term to a plural form (sometimes called inflection)*/
  plural: function plural(t) {
    t.text += 's';
    t.tag('Plural');
    return t;
  },
  /** Convert the term to a singular form (sometimes called inflection)*/
  singular: function singular(t) {
    t.text.replace('s$', '');
    t.tag('Singular');
    return t;
  },
  /** Turn a generic 'Noun' term into a more detailed form*/
  specific: function specific(t) {
    return wrestleNoun(t);
  }
};
module.exports = noun;

},{"./wrestle":65}],65:[function(_dereq_,module,exports){
'use strict';
// const paths = require('../paths')
//turn just 'Noun', into something more

var wrestleNoun = function wrestleNoun(t) {
  //turn 'Noun', into plural/singular
  if (!t.pos.Plural && !t.pos.Singular) {
    var inflection = 'Singular';
    if (t.info('isPlural')) {
      inflection = 'Plural';
    }
    t.tag(inflection, 'wrestle-pluralization');
  }
  return t;
};

module.exports = wrestleNoun;

},{}],66:[function(_dereq_,module,exports){
'use strict';

var wrestle = _dereq_('./wrestle');

module.exports = {
  formal: function formal(t) {
    return t;
  },
  informal: function informal(t) {
    return t;
  },
  specific: function specific(t) {
    return wrestle(t);
  }
};

},{"./wrestle":67}],67:[function(_dereq_,module,exports){
'use strict';
//more-spefic tags for a person

var wrestle = function wrestle(t) {
  //find an unknown gender
  if (t.pos.Person) {
    if (!t.pos.MalePerson && !t.pos.FemalePerson) {
      var gender = t.info('gender');
      if (gender) {
        t.tag(gender, 'wrestle-person');
      }
    }
  }
  return t;
};

module.exports = wrestle;

},{}],68:[function(_dereq_,module,exports){
'use strict';

var normalize = _dereq_('./normalize');

module.exports = {
  normal: function normal(t) {
    t.text += normalize(t.text);
    return t;
  },
  lowercase: function lowercase(t) {
    t.text = t.text.toLowerCase();
    return t;
  },
  uppercase: function uppercase(t) {
    t.text = t.text.toUpperCase();
    return t;
  },
  titlecase: function titlecase(t) {
    t.text = t.text.replace(/^[a-z]/, function (x) {
      return x.toUpperCase();
    });
    return t;
  },
  specific: function specific(t) {
    //to be overloaded
    return t;
  }
};

},{"./normalize":69}],69:[function(_dereq_,module,exports){
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

},{}],70:[function(_dereq_,module,exports){
'use strict';

var value = {
  ordinal: function ordinal(t) {
    t.text += 'th';
    return t;
  }
};
module.exports = value;

},{}],71:[function(_dereq_,module,exports){
'use strict';

var wrestleVerb = _dereq_('./wrestle');

var verb = {
  pasttense: function pasttense(t) {
    t.text += 'ed';
    t.tag('PastTense', 'manual');
    return t;
  },

  specific: function specific(t) {
    return wrestleVerb(t);
  }
};
module.exports = verb;

},{"./wrestle":72}],72:[function(_dereq_,module,exports){
'use strict';
//

//is a normal 'Verb', also something more?

var advancedVerbs = {
  Infinitive: true,
  Gerund: true,
  PastTense: true,
  PresentTense: true,
  FutureTense: true,
  Pluperfect: true,
  FuturePerfect: true
};

//turn just 'Verb', into something more
var wrestleVerb = function wrestleVerb(t) {
  //make sure it's not a fancy verb already
  var keys = Object.keys(advancedVerbs);
  for (var i = 0; i < keys.length; i++) {
    if (t.pos[keys[i]]) {
      return t;
    }
  }
  //determine this verb's conjugation
  var form = t.info('Conjugation');
  if (form) {
    t.tag(form, 'wrestle-conjugation');
  }
  return t;
};

module.exports = wrestleVerb;

},{}],73:[function(_dereq_,module,exports){
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

},{}],74:[function(_dereq_,module,exports){
'use strict';
//nearly every inspection method is over at /sentence/info

module.exports = {

  terms: function terms(t) {
    var arr = [];
    t.sentences.forEach(function (s) {
      s.terms.forEach(function (term) {
        arr.push(term);
      });
    });
    return arr;
  }
};

},{}],75:[function(_dereq_,module,exports){
'use strict';

var chalk = _dereq_('chalk');
var fns = _dereq_('../../log/fns');

var PosColor = function PosColor(tag) {
  var known = {
    Noun: function Noun(s) {
      return chalk.green(s);
    },
    Person: function Person(s) {
      return chalk.bgGreen(s);
    },
    Verb: function Verb(s) {
      return chalk.red(s);
    },
    Adjective: function Adjective(s) {
      return chalk.cyan(s);
    },
    Adverb: function Adverb(s) {
      return chalk.yellow(s);
    },
    Determiner: function Determiner(s) {
      return chalk.grey(s);
    }
  };
  if (known[tag]) {
    return known[tag](tag);
  }
  return tag;
};

//supported Sentence.return() methods
module.exports = {
  text: function text(t) {
    return t.sentences.reduce(function (str, s) {
      str += s.as('text');
      return str;
    }, '');
  },
  normal: function normal(t) {
    return t.sentences.reduce(function (str, s) {
      str += s.as('normal') + ' ';
      return str;
    }, '');
  },
  tags: function tags(t) {
    return t.sentences.map(function (s) {
      return s.as('tags');
    });
  },
  html: function html(t) {
    return t.sentences.reduce(function (str, s) {
      return str + s.render('html') + '\n';
    }, '');
  },
  prettyprint: function prettyprint(t) {
    console.log('\n\n');
    t.sentences.forEach(function (s) {
      s.terms.forEach(function (term) {
        var niceTags = Object.keys(term.pos).map(function (tag) {
          return PosColor(tag);
        }).join(', ');
        niceTags = fns.rightPad(niceTags, 40);
        var title = '\'' + term.text + '\'';
        var silent = '';
        if (term.silent_term) {
          silent = '  [' + term.silent_term + ']';
        }
        silent = fns.rightPad(silent, 6);
        var reason = chalk.green('  - ' + (term.context.reason || ''));
        console.log(fns.rightPad('   ' + title, 20) + silent + '  ' + niceTags + reason);
      });
      console.log('   ' + chalk.bgCyan('-----------'));
    });
  }
};

},{"../../log/fns":15,"chalk":2}],76:[function(_dereq_,module,exports){
//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2015 MIT
'use strict';

var data = _dereq_('../lexicon/data');
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

},{"../fns":10,"../lexicon/data":12}],77:[function(_dereq_,module,exports){
'use strict';
//a Text() is a list of sentences, which are a list of Terms

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fns = _dereq_('../fns');
// const debug = require('../debug');
var log = function log() {};
var Sentence = _dereq_('../sentence/sentence');
var split_sentences = _dereq_('./split_sentences');
var _info = _dereq_('./info');
var transforms = _dereq_('./transforms/transforms');
var _render = _dereq_('./render');

var Text = function () {
  function Text(str, context) {
    var _this = this;

    _classCallCheck(this, Text);

    this.input = fns.ensureString(str);
    this.context = fns.ensureObject(context);
    this.sentences = split_sentences(this.input);
    this.sentences = this.sentences.map(function (txt) {
      var c = fns.copy(context);
      c.parent = _this; //give it our ref
      return new Sentence(txt, c);
    });
    log(this);
  }

  _createClass(Text, [{
    key: 'terms',
    value: function terms() {
      return this.info('Terms');
    }

    //change the text, return this

  }, {
    key: 'to',
    value: function to(method) {
      if (fns.isFunction(method)) {
        return method(this);
      }
      //is it known?
      method = method.toLowerCase();
      if (transforms[method]) {
        return transform[method](this);
      }
      //else, apply it to each sentence
      this.sentences = this.sentences.map(function (s) {
        return s.to(method);
      });
      return this;
    }

    //get, analyze, return boolean

  }, {
    key: 'is',
    value: function is(method) {
      if (fns.isFunction(method)) {
        return method(this);
      }
      method = method.toLowerCase();
      return false;
    }

    //get some data back

  }, {
    key: 'info',
    value: function info(method) {
      if (fns.isFunction(method)) {
        return method(this);
      }
      //is it known?
      method = method.toLowerCase();
      if (_info[method]) {
        return _info[method](this);
      }
      //otherwise, try it on each sentence
      return this.sentences.map(function (s) {
        return s.info(method);
      });
    }

    //return it as something

  }, {
    key: 'render',
    value: function render(method) {
      log('====' + method + '====');
      if (fns.isFunction(method)) {
        return method(this);
      }
      //is it known?
      method = method.toLowerCase();
      if (_render[method]) {
        return _render[method](this);
      }
      //otherwise, try it on each sentence
      return this.sentences.map(function (s) {
        return s.render(method);
      });
    }
  }]);

  return Text;
}();

module.exports = Text;

},{"../fns":10,"../sentence/sentence":21,"./info":74,"./render":75,"./split_sentences":76,"./transforms/transforms":78}],78:[function(_dereq_,module,exports){
'use strict';
//supported Text.to() transformation methods

module.exports = {

  normal: function normal(t) {
    t.sentences = t.sentences.map(function (s) {
      return s.to('normal');
    });
    return t;
  },

  exclamation: function exclamation(t) {
    t.sentences = t.sentences.map(function (s) {
      //don't turn questions into statements
      if (s.is('Question')) {
        return s;
      }
      return s.to('Exclamation');
    });
    return t;
  },
  statement: function statement(t) {
    t.sentences = t.sentences.map(function (s) {
      //don't turn questions into statements
      if (s.is('Question')) {
        return s;
      }
      return s.to('Statement');
    });
    return t;
  }

};

},{}]},{},[11])(11)
});