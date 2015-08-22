/**
 * build helpers
 * not used in the project itself, only used by ./_build
 *
 * @readonly
 * @module data/_
 */
var dict = require('./dictionary');
var lang = 'en';
var results = {main:[[]], zip:[[]]};

function setLang(l) {
	lang = l;
}
function getRes(isZip) {
	return (isZip) ? results.zip : results.main;
}
function allPossible() {
	var _all = [];
	for (var key in dict) {
		if (dict[key].hasOwnProperty('words')) {
			_all = _all.concat(dict[key].words.filter(possibleAndMulti).map(function(o){
				o.tag = key;
				return o;
			}));
		}
	}
	return _all;
};
// some helpers (only for _build)
function repl(a, r, s){
	// advanced data minifying, general logic
	if (typeof a === 'undefined') { return null; }
	var std = ['&','_','#','~','!','%',';','@','0','1','2','3','4','5','6','7','8','9','>','`'];
	if (!s && r) { s = std.slice(0, r.length); }
	if (!r) { r = std; }
	function _r(w){
		s.forEach(function(rS, i) { w = w.replace(new RegExp(rS, 'g'), r[i]) });
		return w;
	}
	return (a instanceof Array) ? a.map(_r) : _r(a);
}
function replBase(a, r, s, baseI){
	// advanced data minifying - also replace another array element (['fantastic', '=ally'])
	if (!(a instanceof Array)) { return null; }
	if (!baseI) baseI = 0;
	return a.map(function(w, i) {
		if (typeof w != 'string') {
			return w;
		} else if (i === baseI) {
			return (r||s) ? this.repl(w, r, s) : w;
		} else if (r) {
			var _w = w.replace('=', a[baseI]).replace('<', a[baseI].slice(0,-2));
		} else { // do zip
			var _w = w.replace(a[baseI], '=').replace(a[baseI].slice(0,-2), '<');
		}
		return (r||s) ? this.repl(_w, r, s) : _w;
	}.bind(this));
}
function newRes(isZip) {
	var r = results[(isZip) ? 'zip' : 'main'];
	if (r.length-1 > 0) results[(isZip) ? 'zip' : 'main'].push([]);
	return [];
}
function val(o, fb) {
	if (fb) {
		return (o.hasOwnProperty(lang)) ? o[lang] : fb;
	}
	return (typeof o === 'string') ? o : o[lang];
}
function did(s, isZip) {
	var r = results[(isZip) ? 'zip' : 'main'];
	var a = r[r.length-1];
	if (s instanceof Array) {
		results[(isZip) ? 'zip' : 'main'][r.length-1] = a.concat(s);
	} else {
		results[(isZip) ? 'zip' : 'main'][r.length-1].push(s);
	}
	return s;
}
function handled(s, isZip) {
	var r = results[(isZip) ? 'zip' : 'main'];
	var a = r[r.length-1];
	return a.indexOf(s) > -1;
}
function possibleAndMulti(o) {
	return ( o.hasOwnProperty(lang) );
}
function possible(o) {
	return ( o.hasOwnProperty(lang) && o[lang].indexOf(' ') < 0 );
}
function possibleOrig(o) {
	return ( o.hasOwnProperty(lang)) && (o.hasOwnProperty('uid') && o[lang].indexOf(' ') < 0 );
}
function possibleRef(o) {
	return ( o.hasOwnProperty(lang) && o.hasOwnProperty('ref') );
}
function isRef(oa, o) {
	return ((oa.ref instanceof Array && oa.ref.indexOf(o.uid) > -1) || oa.ref === o.uid);
}
function rest(type, isZip) {
	return did(dict[type].words.filter(function(o, isZip) {
		return ( o.hasOwnProperty(lang) && o[lang].indexOf(' ') < 0 && !handled(o[lang], isZip) );
	}), isZip);
}
function meta(o, i) {
	var args = (typeof i === 'object') ? i : this;
	if (o.hasOwnProperty('meta') && o.meta.hasOwnProperty(args.key)) {
		var unhandled = args.hasOwnProperty('handled') ? true : (!handled(o[lang], args.isZip||0));
		if (args.hasOwnProperty('noLang')) {
			return (unhandled && possible(o));
		}
		if (o.meta[args.key] instanceof Array) {
			var checkLang = o.meta[args.key];
		} else {
			var checkLang = Object.keys(o.meta[args.key]);
		}
		return (unhandled && possible(o) && checkLang.indexOf(lang) > -1);
	}
	return false;
}
module.exports = {
	repl: repl,
	replBase: replBase,
	allPossible: allPossible,
	setLang: setLang,
	getRes: getRes,
	newRes: newRes,
	val: val,
	did: did,
	handled: handled,
	possibleAndMulti: possibleAndMulti,
	possible: possible,
	possibleOrig: possibleOrig,
	possibleRef: possibleRef,
	isRef: isRef,
	rest: rest,
	meta: meta
};
