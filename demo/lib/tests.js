(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./lib/default_stream":2,"./lib/results":3,"./lib/test":4,"_process":197,"defined":8,"through":31}],2:[function(require,module,exports){
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
},{"_process":197,"fs":184,"through":31}],3:[function(require,module,exports){
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
},{"_process":197,"events":190,"function-bind":10,"has":11,"inherits":12,"object-inspect":13,"resumer":14,"through":31}],4:[function(require,module,exports){
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
},{"_process":197,"deep-equal":5,"defined":8,"events":190,"has":11,"inherits":12,"path":195,"string.prototype.trim":16}],5:[function(require,module,exports){
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

},{"./lib/is_arguments.js":6,"./lib/keys.js":7}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],8:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":9}],11:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":10}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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
},{"_process":197,"through":31}],15:[function(require,module,exports){
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

},{"es-abstract/es5":21,"function-bind":10}],16:[function(require,module,exports){
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

},{"./implementation":15,"./polyfill":29,"./shim":30,"define-properties":17,"function-bind":10}],17:[function(require,module,exports){
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

},{"foreach":18,"object-keys":19}],18:[function(require,module,exports){

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


},{}],19:[function(require,module,exports){
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

},{"./isArguments":20}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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
	}
};

module.exports = ES5;

},{"./helpers/isFinite":22,"./helpers/isNaN":23,"./helpers/mod":24,"./helpers/sign":25,"es-to-primitive/es5":26,"is-callable":28}],22:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],23:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],24:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],25:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],26:[function(require,module,exports){
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

},{"./helpers/isPrimitive":27,"is-callable":28}],27:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":15}],30:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":29,"define-properties":17}],31:[function(require,module,exports){
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
},{"_process":197,"stream":208}],32:[function(require,module,exports){
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
  'ariz', 'cal', 'calif', 'col', 'colo', 'conn', 'fla', 'fl', 'ga', 'ida', 'ia', 'kan', 'kans', 'md', 'minn', 'neb', 'nebr', 'okla', 'penna', 'penn', 'pa', 'dak', 'tenn', 'tex', 'ut', 'vt', 'va', 'wis', 'wisc', 'wy', 'wyo', 'usafa', 'alta',
  'ont', 'que', 'sask',
  'ave', 'blvd', 'cl', 'ct', 'cres', 'hwy'
];
main = main.concat(places);

//date abbrevs.
//these are added seperately because they are not nouns
let dates = ['jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'sept', 'oct', 'nov', 'dec'];
main = main.concat(dates);

module.exports = {
  abbreviations: main,
  dates: dates,
  orgs: orgs,
  places: places
};

},{"./honourifics":40}],33:[function(require,module,exports){
//adjectives that either aren't covered by rules, or have superlative/comparative forms
//this list is the seed, from which various forms are conjugated
'use strict';
const fns = require('../fns');

//suffix-index adjectives
//  {cial:'cru,spe'} -> 'crucial', 'special'
let compressed = {
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

let arr = [
  'ablaze',
  'above',
  'adult',
  'ahead',
  'aloof',
  'arab',
  'asleep',
  'average',
  'awake',
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
  'deaf',
  'devout',
  'difficult',
  'downtown',
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
//  'lax', -> airports
  'left',
  'less',
  'level',
  'lewd',
  'magenta',
  'makeshift',
  'mammoth',
  'medium',
  'moot',
  'naive',
  'nearby',
  'next',
  'nonstop',
  'north',
  'offbeat',
  'ok',
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
  'rough',
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
  'wrong',
  'final',
  'true',
  'modern',
  'notable'
];

module.exports = fns.expand_suffixes(arr, compressed);

},{"../fns":54}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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
  'sep',
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
//add 'mondays'
for(let i = 0; i <= 6; i++) {
  days.push(days[i] + 's');
}

let durations = [
  'millisecond',
  'second',
  'minute',
  'hour',
  'morning',
  'afternoon',
  'evening',
  'night',
  'day',
  'week',
  'month',
  'year',
  'decade',
];
//add their plurals
let len = durations.length;
for(let i = 0; i < len; i++) {
  durations.push(durations[i] + 's');
}
durations.push('century');
durations.push('centuries');

let relative = [
  'yesterday',
  'today',
  'tomorrow',
  'week',
  'weekend',
  'tonight',
];

module.exports = {
  days: days,
  months: months,
  durations: durations,
  relative: relative
};

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
// common first-names in compressed form.
// from http://www.ssa.gov/oact/babynames/limits.html  and http://www.servicealberta.gov.ab.ca/pdf/vs/2001_Boys.pdf
// not sure what regional/cultural/demographic bias this has. Probably a lot.
// 73% of people are represented in the top 1000 names

// used to reduce redundant named-entities in longer text. (don't spot the same person twice.)
// used to identify gender for coreference resolution
'use strict';
let male = require('./names/male');
let female = require('./names/female');
const names = {};

//names commonly used in either gender
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
for(let i = 0; i < male.length; i++) {
  names[male[i]] = 'm';
}
for(let i = 0; i < female.length; i++) {
  names[female[i]] = 'f';
}
//ambiguous/unisex names
for (let i = 0; i < ambiguous.length; i += 1) {
  names[ambiguous[i]] = 'a';
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

},{"./names/female":45,"./names/male":46}],39:[function(require,module,exports){
'use strict';
const fns = require('../fns');
//turns holiday-names into text-versions of their dates
//https://en.wikipedia.org/wiki/federal_holidays_in_the_united_states

//some major, and unambiguous holidays with the same date each year
let annual = {
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
const astronomical = {
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
let thisYear = new Date().getFullYear();
let holidays = fns.extend(annual, astronomical[thisYear] || {});

module.exports = holidays;

},{"../fns":54}],40:[function(require,module,exports){
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
  // 'miss',
  // 'misses',
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

},{}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
//a list of exceptions to the verb rules
const irregular_verbs = {
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
    gerund: 'dying',
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

},{}],43:[function(require,module,exports){
'use strict';

const misc = {
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
  'house': 'NN',
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
    'not'
  ],
  'CO': [
    'if',
    'unless',
    'otherwise',
    'notwithstanding'
  ],

  'VBD': [
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
    'shant',
    'lets', //arguable
  ],

  //Possessive pronouns
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
    'herself',
    'hers',
    'themselves',
    'myself',
    'itself',
    'her', //this one is pretty ambiguous
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
    '\'em',
    'he\'s',
    'she\'s',
  ],
  //questions are awkward pos. are clarified in question_pass
  'QU': [
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
  'RB': [
    // 'now',
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
    'indeed',
    'ever',
    'quite',
    'perhaps',
    'then',
    'thus',
    'very',
    'often',
    'once',
    'never',
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
    'furthermore',
    'more',
    'way',
    'kinda',
    'totally',
  // 'notably',
  ],

  //interjections, expressions
  'EX': [
    'uh',
    'uhh',
    'uh huh',
    'uh-oh',
    'please',
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
    'ya',
    'hee',
    'ohh',
    'eh',
    'yup'
  ],

  //special nouns that shouldnt be seen as a verb
  'NN': [
    'nothing',
    'everything',
    'god',
    'student',
    'patent',
    'funding',
    'banking',
    'ceiling',
    'energy',
    'purpose',
    'friend',
    'event',
    'room',
    'door',
    'thing',
    'things',
    'stuff',
    'lunch',
    'breakfast',
    'dinner',
    'home',
    'problem',
    'body',
    'world',
    'city',
    'death',
    'others',
  ],
  //family-terms are people
  PN: [
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
    'men',
    'woman',
    'women',
    'guy',
    'dude',
    'bro',
    'gentleman',
    'someone',
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

},{}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
'use strict';
const fns = require('../../fns');

//the unique/uncompressed names..
let arr = [
  'abby',
  'amy',
  'autumn',
  'bobbi',
  'brooke',
  'carol',
  'cheryl',
  'claire',
  'cleo',
  'consuelo',
  // 'dawn',
  'eleanor',
  'eliza',
  'erika',
  'faye',
  'fern',
  'genevieve',
  'gertrude',
  'gladys',
  'inez',
  'ingrid',
  'jenny',
  'jo',
  'joni',
  'kathryn',
  'kelli',
  'kim',
  'latoya',
  'leigh',
  'lupe',
  'luz',
  'lynn',
  'mae',
  'maude',
  'mildred',
  'miriam',
  'naomi',
  'nikki',
  'olga',
  'reba',
  'robyn',
  'rosalind',
  'ruth',
  'sheryl',
  'socorro',
  'sonja',
  'staci',
  'tanya',
  'therese',
  'toni',
  'traci',
  'vicki',
  'vicky'
];

//compressed by frequent suffixes
let suffix_compressed = {
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

let prefix_compressed = {
  mar: 'go,isol,itza,sha',
  tam: 'i,ika,my',
  be: 'atriz,cky,tty,ttye',
  pe: 'arl,ggy,nny',
  pa: 'ige,m,tty'
};
arr = fns.expand_prefixes(arr, prefix_compressed);

module.exports = arr;

},{"../../fns":54}],46:[function(require,module,exports){
'use strict';
const fns = require('../../fns');

//the unique/uncompressed names..
let arr = [
  'adolfo',
  'angelo',
  'anthony',
  'armand',
  'arthur',
  'bill',
  'billy',
  'bobby',
  'bradford',
  'bret',
  'caleb',
  'carroll',
  'cliff',
  'clifford',
  'craig',
  'curt',
  'derek',
  'doug',
  'dwight',
  'edmund',
  'eli',
  'elliot',
  'enrique',
  'erik',
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
  'irving',
  'isaac',
  'jim',
  'kermit',
  'kurt',
  'leo',
  'levi',
  'lorenzo',
  'lou',
  'pablo',
  'pat',
  'percy',
  'philip',
  'phillip',
  'rex',
  'ricky',
  'shaun',
  'shawn',
  'sterling',
  'steve',
  'tim',
  'timothy',
  'wilbur',
  'williams',
  'wm',
  'woodrow'
];

//compressed by frequent suffixes
let suffix_compressed = {
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

let prefix_compressed = {
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

},{"../../fns":54}],47:[function(require,module,exports){
const cardinal = {
  ones : {
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
  },
  teens : {
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
  },
  tens : {
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90,
  },
  multiples : {
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

const ordinal = {
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
  'quartic': 1,
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

  prefixes: prefixes,
};

},{}],48:[function(require,module,exports){
'use strict';
//just a few named-organizations
//no acronyms needed. no product/brand pollution.
let organizations = [
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
  'kkk',
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
  'government',
  'faculty',
  'society',
  'union',
  'ministry',
  'collective',
  'association',
  'committee',
  'university',
  'bank',
  'college',
  'foundation',
  'department',
  'institute',
  'club',
  'co',
  'sons'
];

module.exports = {
  suffixes: suffixes,
  organizations: organizations
};

},{}],49:[function(require,module,exports){
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
  'in': 'bang,barge,bash,beat,block,book,box,break,bring,burn,butt,carve,cash,check,come,cross,drop,fall,fence,fill,give,grow,hand,hang,head,jack,keep,leave,let,lock,log,move,opt,pack,peel,pull,put,reach,ring,rub,send,set,settle,shut,sign,smash,snow,strike,take,try,turn,type,warm,wave,wean,wear,wheel',
  'on': 'add,call,carry,catch,count,feed,get,give,go,grind,head,hold,keep,lay,log,pass,pop,power,put,send,show,snap,switch,take,tell,try,turn,wait',
  'over': 'come,go,look,read,run,talk',
  'together': 'come,pull,put',
  'up': 'add,back,beat,bend,blow,boil,bottle,break,bring,buckle,bulk,bundle,call,carve,clean,cut,dress,fill,flag,fold,get,give,grind,grow,hang,hold,keep,let,load,lock,look,man,mark,melt,move,pack,pin,pipe,plump,pop,power,pull,put,rub,scale,scrape,send,set,settle,shake,show,sit,slow,smash,square,stand,strike,take,tear,tie,top,turn,use,wash,wind',
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
let split,
  verb,
  particle,
  phrasal;
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

// console.log(main);
// console.log(main['mess about']);
module.exports = main;

},{"../term/verb/conjugate/conjugate.js":133}],50:[function(require,module,exports){
'use strict';
const fns = require('../fns');

//uncompressed country names
let countries = [
  'usa',
  'u.s.a.',
  'ussr',
  'brazil',
  'bangladesh',
  'mexico',
  'vietnam',
  'egypt',
  'germany',
  'turkey',
  'france',
  'united kingdom',
  'italy',
  'kenya',
  'iraq',
  'morocco',
  'peru',
  'yemen',
  'mozambique',
  'sri lanka',
  'burkina faso',
  'niger',
  'netherlands',
  'chile',
  'malawi',
  'ecuador',
  'côte d\'ivoire',
  'mali',
  'zimbabwe',
  'chad',
  'belgium',
  'cuba',
  'greece',
  'haiti',
  'burundi',
  'hungary',
  'sweden',
  'honduras',
  'israel',
  'laos',
  'el salvador',
  'libya',
  'nicaragua',
  'denmark',
  'congo-brazzaville',
  'kuwait',
  'moldova',
  'panama',
  'jamaica',
  'lesotho',
  'guinea-bissau',
  'timor-leste',
  'djibouti',
  'fiji',
  'comoros',
  'solomon islands',
  'luxembourg',
  'suriname',
  'cape verde',
  'malta',
  'bahamas'
];
let compressed_countries = {
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
let cities = [
  'guangzhou',
  'ahmedabad',
  'phoenix',
  'jakarta',
  'curitiba',
  'moscow',
  'tokyo',
  'nagoya',
  'kobe',
  'mexico',
  'cebu',
  'ho chi minh',
  'hanoi',
  'giza',
  'frankfurt',
  'stuttgart',
  'i̇zmir',
  'paris',
  'toulouse',
  'nice',
  'rome',
  'palermo',
  'genoa',
  'cape town',
  'port elizabeth',
  'bogotá',
  'medellín',
  'seville',
  'zaragoza',
  'kiev',
  'odessa',
  'rosario',
  'la plata',
  'warsaw',
  'kraków',
  'łódź',
  'wrocław',
  'poznań',
  'calgary',
  'ottawa',
  'montreal',
  'winnipeg',
  'sydney',
  'perth',
  'homs',
  'iași',
  'cluj-napoca',
  'almaty',
  'the hague',
  'utrecht',
  'phnom penh',
  'antwerp',
  'ghent',
  'brussels',
  'tunis',
  'athens',
  'thessaloniki',
  'prague',
  'brno',
  'miskolc',
  'stockholm',
  'västerås',
  'tegucigalpa',
  'graz',
  'innsbruck',
  'abu dhabi',
  'haifa',
  'ashdod',
  'dushanbe',
  'niš',
  'aqaba',
  'aalborg',
  'helsinki',
  'espoo',
  'vantaa',
  'turku',
  'košice',
  'ashgabat',
  'oslo',
  'trondheim',
  'auckland',
  'tbilisi',
  'zagreb',
  'split',
  'kuwait',
  'montevideo',
  'klaipėda',
  'doha',
  'skopje',
  'riga',
  'luxembourg',
  'reykjavik',
  'kingston',
];

let suffix_compressed_cities = {
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

let prefix_compressed_cities = {
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
]

module.exports = {
  countries: countries,
  cities: cities,
  airports: airports
};
// console.log(cities[99]);
// console.log(countries[99]);

},{"../fns":54}],51:[function(require,module,exports){
//professions 'lawyer' that aren't covered by verb.to_actor()

module.exports = [
  'accountant',
  'advisor',
  'farmer',
  'mechanic',
  'technician',
  'architect',
  'clerk',
  'therapist',
  'bricklayer',
  'butcher',
  'carpenter',
  'nurse',
  'engineer',
  'supervisor',
  'attendant',
  'operator',
  'dietician',
  'housekeeper',
  'advisor',
  'agent',
  'firefighter',
  'fireman',
  'policeman',
  'attendant',
  'scientist',
  'gardener',
  'hairdresser',
  'instructor',
  'programmer',
  'administrator',
  'journalist',
  'assistant',
  'lawyer',
  'officer',
  'plumber',
  'inspector',
  'psychologist',
  'receptionist',
  'roofer',
  'sailor',
  'security guard',
  'photographer',
  'soldier',
  'surgeon',
  'researcher',
  'practitioner',
  'politician',
  'musician',
  'artist',
  'secretary',
  'minister',
  'deputy',
  'president'
];

},{}],52:[function(require,module,exports){
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
  'hertz',
  'everyone',
  'everybody'
];

},{}],53:[function(require,module,exports){
//most-frequent non-irregular verbs, in infinitive form, to be conjugated for the lexicon
//this list is the seed, from which various forms are conjugated
'use strict';
const fns = require('../fns');

//suffix-index adjectives
//  {cial:'cru,spe'} -> 'crucial', 'special'
let compressed = {
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
let arr = [
  'hope',
  'thank',
  'work',
  'stop',
  'control',
  'join',
  'enjoy',
  'fail',
  'aid',
  'ask',
  'talk',
  'add',
  'walk',
  'describe',
  'study',
  'seem',
  'occur',
  'claim',
  'fix',
  'help',
  'design',
  'include',
  'need',
  'keep',
  'assume',
  'accept',
  'do',
  'look',
  'die',
  'seek',
  'attempt',
  'bomb',
  'cook',
  'copy',
  'claw',
  'doubt',
  'drift',
  'envy',
  'fold',
  'flood',
  'focus',
  'lift',
  'link',
  'load',
  'loan',
  'melt',
  'overlap',
  'rub',
  'repair',
  'sail',
  'sleep',
  'trade',
  'trap',
  'travel',
  'tune',
  'undergo',
  'undo',
  'uplift',
  'yawn',
  'plan',
  'reveal',
  'owe',
  'sneak',
  'drop',
  'name',
  'head',
  'spoil',
  'echo',
  'deny',
  'yield',
  'reason',
  'defy',
  'applaud',
  'risk',
  'step',
  'deem',
  'embody',
  'adopt',
  'convey',
  'pop',
  'grab',
  'revel',
  'stem',
  'mark',
  'drag',
  'pour',
  'reckon',
  'assign',
  'rank',
  'destroy',
  'float',
  'appeal',
  'grasp',
  'shout',
  'overcome',
  'relax',
  'excel',
  'plug',
  'proclaim',
  'ruin',
  'abandon',
  'overwhelm',
  'wipe',
  'added',
  'took',
  'goes',
  'avoid',
  'come',
  'set',
  'pay',
  'grow',
  'inspect',
  'instruct',
  'know',
  'take',
  'let',
  'sort',
  'put',
  'take',
  'cut',
  'become',
  'reply',
  'happen',
  'watch',
  'associate',
  'send',
  'archive',
  'cancel',
  'learn',
  'transfer',
  'minus',
  'plus',
  'multiply',
  'divide',
];

module.exports = fns.expand_suffixes(arr, compressed);

},{"../fns":54}],54:[function(require,module,exports){
'use strict';
exports.pluck = function(arr, str) {
  arr = arr || [];
  return arr.map(function(o) {
    return o[str];
  });
};

//make an array of strings easier to lookup
exports.toObj = function(arr) {
  return arr.reduce(function(h, a) {
    h[a] = true;
    return h;
  }, {});
};
//turn key->value into value->key
exports.reverseObj = function(obj) {
  return Object.keys(obj).reduce(function(h, k) {
    h[obj[k]] = k;
    return h;
  }, {});
};

//turn a nested array into one array
exports.flatten = function(arr) {
  let all = [];
  arr.forEach(function(a) {
    all = all.concat(a);
  });
  return all;
};

//string utilities
exports.endsWith = function(str, suffix) {
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
exports.startsWith = function(str, prefix) {
  if (str && str.length && str.substr(0, 1) === prefix) {
    return true;
  }
  return false;
};

exports.extend = function(a, b) {
  const keys = Object.keys(b);
  for(let i = 0; i < keys.length; i++) {
    a[keys[i]] = b[keys[i]];
  }
  return a;
};

exports.titlecase = function(str) {
  if (!str) {
    return '';
  }
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// typeof obj == "function" also works
// but not in older browsers. :-/
exports.isFunction = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
};


//uncompress data in the adhoc compressed form {'ly':'kind,quick'}
exports.expand_suffixes = function(list, obj) {
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
exports.expand_prefixes = function(list, obj) {
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

},{}],55:[function(require,module,exports){
'use strict';
const fns = require('./fns.js');

let models = {
  Term : require('./term/term.js'),
  Text : require('./text/text.js'),
  Sentence : require('./sentence/sentence.js'),
  Statement : require('./sentence/statement/statement.js'),
  Question : require('./sentence/question/question.js'),
  Verb : require('./term/verb/verb.js'),
  Adjective : require('./term/adjective/adjective.js'),
  Adverb : require('./term/adverb/adverb.js'),
  Noun : require('./term/noun/noun.js'),
  Value : require('./term/noun/value/value.js'),
  Person : require('./term/noun/person/person.js'),
  Place : require('./term/noun/place/place.js'),
  Date : require('./term/noun/date/date.js'),
  Organization : require('./term/noun/organization/organization.js')
};

function NLP() {

  this.plugin = function(obj) {
    obj = obj || {};
    // if obj is a function, pass it an instance of this nlp library
    if (fns.isFunction(obj)) {
      // run it in this current context
      obj = obj.call(this, this);
    }
    //apply each plugin to the correct prototypes
    Object.keys(obj).forEach(function(k) {
      Object.keys(obj[k]).forEach(function(method) {
        models[k].prototype[method] = obj[k][method];
      });
    });
  };
  this.lexicon = function(obj) {
    obj = obj || {};
    let lex = require('./lexicon.js');

    Object.keys(obj).forEach(function(k) {
      lex[k] = obj[k];
    });

    return lex;
  };

  this.term = function(s) {
    return new models.Term(s);
  };
  this.noun = function(s) {
    return new models.Noun(s);
  };
  this.verb = function(s) {
    return new models.Verb(s);
  };
  this.adjective = function(s) {
    return new models.Adjective(s);
  };
  this.adverb = function(s) {
    return new models.Adverb(s);
  };

  this.value = function(s) {
    return new models.Value(s);
  };
  this.person = function(s) {
    return new models.Person(s);
  };
  this.place = function(s) {
    return new models.Place(s);
  };
  this.date = function(s) {
    return new models.Date(s);
  };
  this.organization = function(s) {
    return new models.Organization(s);
  };

  this.text = function(s, options) {
    return new models.Text(s, options);
  };
  this.sentence = function(s, options) {
    return new models.Sentence(s, options);
  };
  this.statement = function(s) {
    return new models.Statement(s);
  };
  this.question = function(s) {
    return new models.Question(s);
  };
}

let nlp = new NLP();
//export to window or webworker
if (typeof window === 'object' || typeof DedicatedWorkerGlobalScope === 'function') {
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

},{"./fns.js":54,"./lexicon.js":56,"./sentence/question/question.js":88,"./sentence/sentence.js":91,"./sentence/statement/statement.js":94,"./term/adjective/adjective.js":95,"./term/adverb/adverb.js":100,"./term/noun/date/date.js":105,"./term/noun/noun.js":111,"./term/noun/organization/organization.js":113,"./term/noun/person/person.js":117,"./term/noun/place/place.js":119,"./term/noun/value/value.js":131,"./term/term.js":132,"./term/verb/verb.js":142,"./text/text.js":145}],56:[function(require,module,exports){
//the lexicon is a big hash of words to pos tags
//it's built by conjugating and inflecting a small seed of terms
'use strict';
const fns = require('./fns.js');
const verb_conjugate = require('./term/verb/conjugate/conjugate.js');
const verb_to_adjective = require('./term/verb/to_adjective.js');
const to_comparative = require('./term/adjective/to_comparative.js');
const to_superlative = require('./term/adjective/to_superlative.js');
const to_adverb = require('./term/adjective/to_adverb.js');
const grand_mapping = require('./sentence/pos/parts_of_speech.js').tag_mapping;

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

const irregulars = require('./data/irregular_verbs.js');
let verbs = require('./data/verbs.js').concat(Object.keys(irregulars));
for (let i = 0; i < verbs.length; i++) {
  const o = verb_conjugate(verbs[i]);
  Object.keys(o).forEach(function(k) {
    if (k && o[k] && verbMap[k]) {
      lexicon[o[k]] = verbMap[k];
    }
  });
  //also add their adjective form - "walkable"
  lexicon[verb_to_adjective(verbs[i])] = 'Adjective';
}

let orgs = require('./data/organizations.js');
addArr(orgs.organizations, 'Organization');
addArr(orgs.suffixes, 'Noun');

let places = require('./data/places.js');
addArr(places.countries, 'Country');
addArr(places.cities, 'City');

require('./data/adjectives.js').forEach(function(s) {
  lexicon[s] = 'Adjective';
  lexicon[to_comparative(s)] = 'Comparative';
  lexicon[to_superlative(s)] = 'Superlative';
  lexicon[to_adverb(s)] = 'Adverb';
});
Object.keys(require('./data/convertables.js')).forEach(function(s) {
  lexicon[s] = 'Adjective';
  lexicon[to_comparative(s)] = 'Comparative';
  lexicon[to_superlative(s)] = 'Superlative';
  lexicon[to_adverb(s)] = 'Adverb';
});

addArr(require('./data/abbreviations.js').abbreviations, 'Abbreviation');
addArr(require('./data/demonyms.js'), 'Demonym');
addArr(require('./data/currencies.js'), 'Currency');
addArr(require('./data/honourifics.js'), 'Honourific');
addArr(require('./data/uncountables.js'), 'Noun');
let dates = require('./data/dates.js');
addArr(dates.days, 'Date');
addArr(dates.months, 'Date');
addArr(dates.durations, 'Date');
addArr(dates.relative, 'Date');

//unpack the numbers
let nums = require('./data/numbers.js');
let all_nums = Object.keys(nums).reduce((arr, k) => {
  arr = arr.concat(Object.keys(nums[k]));
  return arr;
}, []);
addArr(all_nums, 'Value');

//a little fancy
const firstNames = require('./data/firstnames.js');
//add all names
addArr(Object.keys(firstNames.all), 'Person');
//overwrite to MalePerson, FemalePerson
addArr(firstNames.male, 'MalePerson');
addArr(firstNames.female, 'FemalePerson');
//add irregular nouns
const irregNouns = require('./data/irregular_nouns.js');
addArr(fns.pluck(irregNouns, 0), 'Noun');
addArr(fns.pluck(irregNouns, 1), 'Plural');

addObj(require('./data/misc.js'));
addObj(require('./data/multiples.js'));
addObj(require('./data/phrasal_verbs.js'));
//add named holidays, like 'easter'
Object.keys(require('./data/holidays.js')).forEach(function(k) {
  lexicon[k] = 'Date';
});

//professions
addArr(require('./data/professions.js'), 'Actor');

//just in case
delete lexicon[false];
delete lexicon[true];
delete lexicon[undefined];
delete lexicon[null];
delete lexicon[''];

//use 'Noun', not 'NN'
Object.keys(lexicon).forEach(function(k) {
  lexicon[k] = grand_mapping[lexicon[k]] || lexicon[k];
});

module.exports = lexicon;
// console.log(lexicon['doing']);

},{"./data/abbreviations.js":32,"./data/adjectives.js":33,"./data/convertables.js":34,"./data/currencies.js":35,"./data/dates.js":36,"./data/demonyms.js":37,"./data/firstnames.js":38,"./data/holidays.js":39,"./data/honourifics.js":40,"./data/irregular_nouns.js":41,"./data/irregular_verbs.js":42,"./data/misc.js":43,"./data/multiples.js":44,"./data/numbers.js":47,"./data/organizations.js":48,"./data/phrasal_verbs.js":49,"./data/places.js":50,"./data/professions.js":51,"./data/uncountables.js":52,"./data/verbs.js":53,"./fns.js":54,"./sentence/pos/parts_of_speech.js":69,"./term/adjective/to_adverb.js":96,"./term/adjective/to_comparative.js":97,"./term/adjective/to_superlative.js":99,"./term/verb/conjugate/conjugate.js":133,"./term/verb/to_adjective.js":141}],57:[function(require,module,exports){
'use strict';
// a regex-like lookup for a list of terms.
// returns matches in a 'Terms' class
const Result = require('./result');
const syntax_parse = require('./syntax_parse');
const match_term = require('./match_term');


// take a slice of our terms, and try a match starting here
const tryFromHere = function(terms, regs, options) {
  let result = [];
  let which_term = 0;
  for(let i = 0; i < regs.length; i++) {
    let term = terms[which_term];
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
const findAll = function(terms, regs, options) {
  let result = [];
  regs = syntax_parse(regs || '');
  // one-off lookup for ^
  // '^' token is 'must start at 0'
  if (regs[0].signals.leading) {
    let match = tryFromHere(terms, regs, options) || [];
    if (match) {
      return [new Result(match)];
    } else {
      return null;
    }
  }

  //repeating version starting from each term
  let len = terms.length; // - regs.length + 1;
  for(let i = 0; i < len; i++) {
    let termSlice = terms.slice(i, terms.length);
    let match = tryFromHere(termSlice, regs, options);
    if (match) {
      result.push(new Result(match));
    }
  }
  //if we have no results, return null
  if (result.length === 0) {
    return null;
  }
  return result;
};

//calls Terms.replace() on each found result
const replaceAll = function(terms, regs, replacement, options) {
  let list = findAll(terms, regs, options);
  if (list) {
    list.forEach((t) => {
      t.replace(replacement, options);
    });
  }
};


module.exports = {
  findAll,
  replaceAll,
};

},{"./match_term":58,"./result":59,"./syntax_parse":60}],58:[function(require,module,exports){
'use strict';
const fns = require('../fns.js');

//a regex-like string search
// returns a boolean for match/not
const match_term = function(term, reg) {
  //fail-fast
  if (!term || !reg || !reg.signals) {
    return false;
  }
  let signals = reg.signals;

  //support optional (foo|bar) syntax
  if (signals.one_of) {
    let arr = reg.term.split('|');
    for(let i = 0; i < arr.length; i++) {
      if (arr[i] === term.normal || arr[i] === term.text) {
        return true;
      }
    }
    return false;
  }
  //support [Pos] syntax
  if (signals.pos) {
    let pos = fns.titlecase(reg.term);
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

},{"../fns.js":54}],59:[function(require,module,exports){
'use strict';
const match = require('./match.js');

// a slice of term objects returned from .match()
// ideally changes that happen here happen in the original object
class Result {
  constructor(terms) {
    this.terms = terms;
  }
  //wha, this is possible eg. text.match().match()
  match(str, options) {
    return match(this.terms, str, options);
  }
  //a 1-1 replacement of strings
  replace(words) {
    for(let i = 0; i < this.terms.length; i++) {
      //umm, this is like a capture-group in regexp..
      //so just leave it
      if (words[i] === '$') {
        continue;
      }
      //allow replacements with the capture group, like 'cyber-$1'
      if (words[i].match(/\$1/)) {
        let combined = words[1].replace(/\$1/, this.terms[i].text);
        this.terms[i].changeTo(combined);
        continue;
      }
      this.terms[i].changeTo(words[i] || '');
    }
    return this;
  }
  text() {
    return this.terms.reduce(function(s, t) {
      //implicit contractions shouldn't be included
      if (t.text) {
        s += ' ' + t.text;
      }
      return s;
    }, '').trim();
  }
  normal() {
    return this.terms.reduce(function(s, t) {
      //implicit contractions shouldn't be included
      if (t.normal) {
        s += ' ' + t.normal;
      }
      return s;
    }, '').trim();
  }
}
//a slice of term objects
module.exports = Result;

},{"./match.js":57}],60:[function(require,module,exports){
'use strict';
// parse a search lookup term find the regex-like syntax in this term
const fns = require('../fns.js');
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


const parse_term = function(term, i) {
  term = term || '';
  term = term.trim();
  let signals = {};
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
    term,
    signals,
    i
  };
};
// console.log(parse_term('(one|1) (two|2)'));


//turn a match string into an array of objects
const parse_all = function(regs) {
  regs = regs || [];
  return regs.map(parse_term);
};
// console.log(parse_all(''));

module.exports = parse_all;

},{"../fns.js":54}],61:[function(require,module,exports){
'use strict';
//change a sentence to past, present, or future tense
const pos = require('./pos/parts_of_speech.js');

//conjugate a specific verb
const flip_verb = function(t, tense) {
  if (tense === 'present') {
    t.to_present();
  } else if (tense === 'past') {
    t.to_past();
  } else if (tense === 'future') {
    t.to_future();
  }
  return t;
};

const change_tense = function(s, tense) {
  //convert all verbs
  for(let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
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

},{"./pos/parts_of_speech.js":69}],62:[function(require,module,exports){
'use strict';
//turns 'is not' into "isn't", and "he is" into "he's"
const contractor = {
  'will': 'll',
  'would': 'd',
  'have': 've',
  'are': 're',
  'not': 't',
  'is': 's'
// 'was': 's' //this is too folksy
};

const contract = function(terms) {
  for(let i = 1; i < terms.length; i++) {
    if (contractor[terms[i].normal]) {
      //remember expansion
      terms[i - 1].expansion = terms[i - 1].text;
      terms[i].expansion = terms[i].text;
      //handle special `n't` case
      if (terms[i].normal === 'not') {
        terms[i - 1].text += 'n';
      }
      terms[i - 1].text += `'` + contractor[terms[i].normal];
      terms[i - 1].rebuild();
      terms[i].text = '';
      terms[i].rebuild();
    }
  }
  return terms;
};

module.exports = contract;

},{}],63:[function(require,module,exports){
'use strict';

const expand = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    if (terms[i].expansion) {
      terms[i].text = terms[i].expansion;
      terms[i].rebuild();
    }
  }
  return terms;
};

module.exports = expand;

},{}],64:[function(require,module,exports){
'use strict';

//boolean if sentence has

// "[copula] [pastTense] by"
// "[pastParticiple] by"
const passive_voice = function(s) {
  let terms = s.terms;
  for (let i = 0; i < terms.length - 2; i++) {
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

},{}],65:[function(require,module,exports){
'use strict';
const pos = require('./parts_of_speech');

//set the part-of-speech of a particular term
const assign = function (t, tag, reason) {
  //check if redundant, first
  if (t.pos[tag]) {
    return t;
  }
  let P = pos.classMapping[tag] || pos.Term;
  let expansion = t.expansion;
  let whitespace = t.whitespace;
  let reasoning = t.reasoning;
  t = new P(t.text, tag);
  t.reasoning = reasoning;
  t.reasoning.push(reason);
  t.whitespace = whitespace;
  t.expansion = expansion;
  return t;
};
module.exports = assign;

},{"./parts_of_speech":69}],66:[function(require,module,exports){
'use strict';
const pos = require('../parts_of_speech');
const fns = require('../../../fns');

//get the combined text
const new_string = function(a, b) {
  let space = a.whitespace.trailing + b.whitespace.preceding;
  return a.text + space + b.text;
};

const combine_two = function(terms, i, tag, reason) {
  let a = terms[i];
  let b = terms[i + 1];
  //fail-fast
  if (!a || !b) {
    return terms;
  }
  //keep relevant/consistant old POS tags
  let old_pos = {};
  if (a.pos[tag]) {
    old_pos = a.pos;
  }
  if (b.pos[tag]) {
    old_pos = fns.extend(old_pos, b.pos);
  }
  //find the new Pos class
  let Pos = pos.classMapping[tag] || pos.Term;
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

const combine_three = function(terms, i, tag, reason) {
  let a = terms[i];
  let b = terms[i + 1];
  let c = terms[i + 2];
  //fail-fast
  if (!a || !b || !c) {
    return terms;
  }
  let Pos = pos.classMapping[tag] || pos.Term;
  let space1 = a.whitespace.trailing + b.whitespace.preceding;
  let space2 = b.whitespace.trailing + c.whitespace.preceding;
  let text = a.text + space1 + b.text + space2 + c.text;
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
  three: combine_three,
};

},{"../../../fns":54,"../parts_of_speech":69}],67:[function(require,module,exports){
'use strict';
const combine = require('./combine').three;

// const dont_lump = [
// {
//   condition: (a, b, c) => (),
//   reason: ''
// },
// ];

const do_lump = [
  {
    //John & Joe's
    condition: (a, b, c) => (a.pos.Noun && (b.text === '&' || b.normal === 'n') && c.pos.Noun),
    result: 'Person',
    reason: 'Noun-&-Noun'
  },
  {
    //June the 5th
    condition: (a, b, c) => (a.pos.Date && b.normal === 'the' && c.pos.Value),
    result: 'Date',
    reason: 'Date-the-Value'
  },
  {
    //5th of June
    condition: (a, b, c) => (a.pos.Value && (b.pos.Conjunction || b.pos.Preposition) && c.pos.Date),
    result: 'Date',
    reason: 'Value-Prep-Date'
  },
  {
    //June 5th to 7th
    condition: (a, b, c) => (a.pos.Date && (b.pos.Conjunction || b.pos.Preposition) && c.pos.Value),
    result: 'Date',
    reason: 'Date-Preposition-Value'
  },
  {
    //3hrs after 5pm
    condition: (a, b, c) => (a.pos.Date && (c.pos.Date || c.pos.Ordinal) && (b.pos.Preposition || b.pos.Determiner || b.pos.Conjunction || b.pos.Adjective)),
    result: 'Date',
    reason: 'Date-Preposition-Date'
  },
  {
    //President of Mexico
    condition: (a, b, c) => (a.is_capital() && b.normal === 'of' && c.is_capital()),
    result: 'Noun',
    reason: 'Capital-of-Capital'
  },
  {
    //three-word quote
    condition: (a, b, c) => (a.text.match(/^["']/) && !b.text.match(/["']/) && c.text.match(/["']$/)),
    result: 'Noun',
    reason: 'Three-word-quote'
  },
  {
    //will have walk
    condition: (a, b, c) => (a.normal === 'will' && b.normal === 'have' && c.pos.Verb),
    result: 'FutureTense',
    reason: 'will-have-Verb'
  },

  {
    //two hundred and three
    condition: (a, b, c) => (a.pos.Value && b.normal === 'and' && c.pos.Value),
    result: 'Value',
    reason: 'Value-and-Value'
  }
];

const lump_three = function(terms) {
  //fail-fast
  if (terms.length < 3) {
    return terms;
  }
  for(let i = 0; i < terms.length - 2; i++) {
    let a = terms[i];
    let b = terms[i + 1];
    let c = terms[i + 2];
    if (!a || !b || !c) {
      continue;
    }
    for(let o = 0; o < do_lump.length; o++) {
      if (do_lump[o].condition(a, b, c)) {
        let new_tag = do_lump[o].result;
        let reason = do_lump[o].reason;
        terms = combine(terms, i, new_tag, reason);
        break;
      }
    }
  }
  //remove empties
  terms = terms.filter((t) => t);
  return terms;
};

module.exports = lump_three;

},{"./combine":66}],68:[function(require,module,exports){
'use strict';
//apply lumper+splitter words to terms to combine them
const combine = require('./combine').two;

//not just 'Noun', but something more deliberate
const is_specific = function(t) {
  const specific = [
    'Person',
    'Place',
    'Value',
    'Date',
    'Organization',
  ];
  for(let i = 0; i < specific.length; i++) {
    if (t.pos[specific[i]]) {
      return true;
    }
  }
  return false;
};

//rules that combine two words
const do_lump = [
  {
    condition: (a, b) => (a.pos.Person && b.pos.Honourific || a.pos.Honourific && b.pos.Person), //"John sr."
    result: 'Person',
    reason: 'person-words'
  },
  {
    //6 am
    condition: (a, b) => ((a.pos.Value || a.pos.Date) && (b.normal === 'am' || b.normal === 'pm')),
    result: 'Date',
    reason: 'date-am/pm'
  },
  {
    //'Dr. John'
    condition: (a, b) => (a.pos.Honourific && b.is_capital()),
    result: 'Person',
    reason: 'person-honourific'
  },
  {
    // "john lkjsdf's"
    condition: (a, b) => (a.pos.Person && b.pos.Possessive),
    result: 'Person',
    reason: 'person-possessive'
  },
  {
    //"John Abcd" - needs to be careful
    condition: (a, b) => (a.pos.Person && !a.pos.Pronoun && !a.pos.Possessive && !a.has_comma() && b.is_capital() && !a.is_acronym() && !b.pos.Verb), //'Person, Capital -> Person'
    result: 'Person',
    reason: 'person-titleCase'
  },
  {
    //June 4
    condition: (a, b) => (a.pos.Date && b.pos.Value),
    result: 'Date',
    reason: 'date-value'
  },
  {
    //4 June
    condition: (a, b) => (a.pos.Value && b.pos.Date),
    result: 'Date',
    reason: 'value-date'
  },
  {
    //last wednesday
    condition: (a, b) => ((a.normal === 'last' || a.normal === 'next' || a.normal === 'this') && b.pos.Date),
    result: 'Date',
    reason: 'relative-date'
  },
  {
    //Aircraft designer
    condition: (a, b) => (a.pos.Noun && b.pos.Actor),
    result: 'Actor',
    reason: 'thing-doer'
  },
  {
    //Canada Inc
    condition: (a, b) => (a.is_capital() && a.pos.Noun && b.pos['Organization'] || b.is_capital() && a.pos['Organization']),
    result: 'Organization',
    reason: 'organization-org'
  },
  {
    //two-word quote
    condition: (a, b) => (a.text.match(/^["']/) && b.text.match(/["']$/)),
    result: 'Quotation',
    reason: 'two-word-quote'
  },
  {
    //will walk (perfect)
    condition: (a, b) => (a.normal === 'will' && b.pos.Verb),
    result: 'PerfectTense',
    reason: 'will-verb'
  },
  {
    //will have walked (pluperfect)
    condition: (a, b) => (a.normal.match(/^will ha(ve|d)$/) && b.pos.Verb),
    result: 'PluperfectTense',
    reason: 'will-have-verb'
  },
  {
    //timezones
    condition: (a, b) => (b.normal.match(/(standard|daylight|summer) time/) && (a.pos['Adjective'] || a.pos['Place'])),
    result: 'Date',
    reason: 'timezone'
  },
  {
    //canadian dollar, Brazilian pesos
    condition: (a, b) => (a.pos.Demonym && b.pos.Currency),
    result: 'Currency',
    reason: 'demonym-currency'
  },
  {
    //for verbs in Past/Present Continuous ('is raining')
    condition: (a, b) => (a.pos.Copula && a.normal.match(/^(am|is|are|was|were)$/)
      && b.pos.Verb && b.normal.match(/ing$/)),
    result: 'Verb',
    reason: 'copula-gerund'
  },
  {
    //7 ft
    condition: (a, b) => ((a.pos.Value && b.pos.Abbreviation) || (a.pos.Abbreviation && b.pos.Value)),
    result: 'Value',
    reason: 'value-abbreviation'
  },
  {
    //NASA Flordia
    condition: (a, b) => ((a.pos.Noun && b.pos.Abbreviation) || (a.pos.Abbreviation && b.pos.Noun)),
    result: 'Noun',
    reason: 'noun-abbreviation'
  },
  {
    //both dates
    condition: (a, b) => (a.pos.Date && b.pos.Date),
    result: 'Date',
    reason: 'two-dates'
  },
  {
    //both values
    condition: (a, b) => (a.pos.Value && b.pos.Value),
    result: 'Value',
    reason: 'two-values'
  },
  {
    //both places
    condition: (a, b) => (a.pos.Place && b.pos.Place),
    result: 'Place',
    reason: 'two-places'
  },
  {
    //'have not'
    condition: (a, b) => ((a.pos.Infinitive || a.pos.Copula || a.pos.PresentTense) && b.normal === 'not'),
    result: 'Verb',
    reason: 'verb-not'
  },
  {
    //both places (this is the most aggressive rule of them all)
    condition: (a, b) => (a.pos.Noun && b.pos.Noun && !is_specific(a) && !is_specific(b)),
    result: 'Noun',
    reason: 'two-nouns'
  },
];

//exceptions or guards to the above rules, more or less
const dont_lump = [
  { //don't chunk non-word things with word-things
    condition: (a, b) => (a.is_word() === false || b.is_word() === false),
    reason: 'not a word',
  },
  {
    //if A has a comma, don't chunk it, (unless it's a date)
    condition: (a) => (a.has_comma() && !a.pos.Date),
    reason: 'has a comma',
  },
  { //dont chunk over possessives, eg "spencer's house"
    condition: (a) => (a.pos['Possessive']),
    reason: 'has possessive',
  },
  {
    condition: (a) => (a.pos['Expression'] || a.pos['Phrasal'] || a.pos['Pronoun']),
    reason: 'unchunkable pos',
  },
  { //dont chunk contractions (again)
    condition: (a, b) => (a.expansion || b.expansion),
    reason: 'is contraction',
  },
  { //"Toronto Montreal"
    condition: (a, b) => (a.pos['City'] && b.pos['City']),
    reason: 'two cities',
  },
  { //"Canada Cuba"
    condition: (a, b) => (a.pos['Country'] && b.pos['Country']),
    reason: 'two countries',
  },
  { //"John you"
    condition: (a, b) => (a.pos['Person'] && b.pos['Pronoun']),
    reason: 'person-pronoun',
  },
  { //url singleton
    condition: (a, b) => (a.pos['Url'] || b.pos['Url']),
    reason: 'url-no-lump',
  },
  { //Hashtag singleton
    condition: (a, b) => (a.pos['Hashtag'] || b.pos['Hashtag']),
    reason: 'hashtag-no-lump',
  },
  { //Email singleton
    condition: (a, b) => (a.pos['Email'] || b.pos['Email']),
    reason: 'email-no-lump',
  },
  { //Quotation singleton
    condition: (a, b) => (a.pos['Quotation'] || b.pos['Quotation']),
    reason: 'quotation-no-lump',
  },
];

//check lumping 'blacklist'
const ignore_pair = function(a, b) {
  for(let o = 0; o < dont_lump.length; o++) {
    if (dont_lump[o].condition(a, b)) {
      return true;
    }
  }
  return false;
};

//pairwise-compare two terms (find the 'twosies')
const lump_two = function(terms) {
  //each term..
  for(let i = 0; i < terms.length; i++) {
    let a = terms[i];
    let b = terms[i + 1];
    if (!a || !b) {
      continue;
    }
    //first check lumping 'blacklist'
    if (ignore_pair(a, b)) {
      continue;
    }
    //check each lumping rule
    for(let o = 0; o < do_lump.length; o++) {
      //should it combine?
      if (do_lump[o].condition(a, b)) {
        let new_tag = do_lump[o].result;
        let reason = do_lump[o].reason;
        // console.log(a.normal);
        // console.log(a.pos);
        terms = combine(terms, i, new_tag, 'chunked ' + reason);
        break;
      }
    }
  }
  //remove empties
  terms = terms.filter((t) => t);
  return terms;
};

module.exports = lump_two;

},{"./combine":66}],69:[function(require,module,exports){

const Term = require('../../term/term.js');

const Verb = require('../../term/verb/verb.js');
const Adverb = require('../../term/adverb/adverb.js');
const Adjective = require('../../term/adjective/adjective.js');

const Noun = require('../../term/noun/noun.js');
const Person = require('../../term/noun/person/person.js');
const Place = require('../../term/noun/place/place.js');
const Organization = require('../../term/noun/organization/organization.js');
const Value = require('../../term/noun/value/value.js');
const _Date = require('../../term/noun/date/date.js');
const Url = require('../../term/noun/url/url.js');

const tag_mapping = {
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

  'QU': 'Question',
};

const classMapping = {
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
  Organization,
  Adjective,
  Adverb,
  Noun,
};

},{"../../term/adjective/adjective.js":95,"../../term/adverb/adverb.js":100,"../../term/noun/date/date.js":105,"../../term/noun/noun.js":111,"../../term/noun/organization/organization.js":113,"../../term/noun/person/person.js":117,"../../term/noun/place/place.js":119,"../../term/noun/url/url.js":124,"../../term/noun/value/value.js":131,"../../term/term.js":132,"../../term/verb/verb.js":142}],70:[function(require,module,exports){
'use strict';
const assign = require('../assign');

//date words that are sometimes-not..
const tough_dates = {
  may: true,
  april: true,
  march: true,
  june: true,
  jan: true,
};

//an integer that looks year-like
const maybe_year = function(t) {
  if (t.pos.Value) {
    let num = t.number || 0;
    if (num >= 1900 && num < 2030) {
      return true;
    }
  }
  return false;
};

//neighbouring words that indicate it is a date
const date_signals = {
  between: true,
  before: true,
  after: true,
  during: true,
  from: true,
  to: true,
  in: true,
  of: true,
  the: true,
  next: true,
};

const ambiguous_dates = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    let t = terms[i];
    if (tough_dates[t.normal] || maybe_year(t)) { //'march' or '2015'
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

},{"../assign":65}],71:[function(require,module,exports){
'use strict';
const assign = require('../assign');
//set POS for capitalised words
const capital_signals = function(terms) {
  //first words need careful rules
  if (terms[0] && terms[0].is_acronym()) {
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
module.exports = capital_signals;

},{"../assign":65}],72:[function(require,module,exports){
'use strict';

const starts = {
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
  'before': true,
};

// ensure there's a verb in a couple words
const verbSoon = function(terms, x) {
  for(let i = 0; i < 5; i++) {
    if (terms[i + x] && terms[i + x].pos['Verb']) {
      return true;
    }
  }
  return false;
};

// find the next upcoming comma
const nextComma = function(terms, i) {
  //don't be too aggressive
  let max = terms.length - 1;
  if (max > i + 7) {
    max = i + 7;
  }
  for(let x = i; x < max; x++) {
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
const tagCondition = function(terms, start, stop) {
  for(let i = start; i <= stop; i++) {
    if (!terms[i]) {
      break;
    }
    terms[i].pos['Condition'] = true;
  }
};

const conditional_pass = function(terms) {

  //try leading condition
  if (terms[0] && starts[terms[0].normal]) {
    let until = nextComma(terms, 0);
    if (until) {
      tagCondition(terms, 0, until);
    }
  }

  //try trailing condition
  for(let i = 3; i < terms.length; i++) {
    if (starts[terms[i].normal] && terms[i - 1].has_comma()) {
      let until = nextComma(terms, i);
      if (until) {
        tagCondition(terms, i, until);
        i += until;
      }
    }
  }
  return terms;
};

module.exports = conditional_pass;

},{}],73:[function(require,module,exports){
'use strict';
let pos = require('../../parts_of_speech');
//places a 'silent' term where a contraction, like "they're" exists

//the formulaic contraction types:
const supported = {
  'll': 'will',
  'd': 'would',
  've': 'have',
  're': 'are',
  'm': 'am' //this is not the safest way to support i'm
//these ones are a bit tricksier:
// 't': 'not',
// 's': 'is' //or was
};

const irregulars = {
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
  'let\'s': ['let', 'us'],
};

// `n't` contractions - negate doesn't have a second term
const handle_negate = function(terms, i) {
  terms[i].expansion = terms[i].text.replace(/n'.*/, '');
  terms[i].expansion += ' not';
  return terms;
};

//puts a 'implicit term' in this sentence, at 'i'
const handle_simple = function(terms, i, particle) {
  terms[i].expansion = terms[i].text.replace(/'.*/, '');
  //make ghost-term
  let second_word = new pos.Verb('');
  second_word.expansion = particle;
  second_word.whitespace.trailing = terms[i].whitespace.trailing;
  terms[i].whitespace.trailing = ' ';
  terms.splice(i + 1, 0, second_word);
  return terms;
};

// expand manual contractions
const handle_irregulars = function(terms, x, arr) {
  terms[x].expansion = arr[0];
  for(let i = 1; i < arr.length; i++) {
    let t = new pos.Term('');
    t.whitespace.trailing = terms[x].whitespace.trailing; //move whitespace
    terms[x].whitespace.trailing = ' ';
    t.expansion = arr[i];
    terms.splice(x + i, 0, t);
  }
  return terms;
};

// `'s` contractions
const handle_copula = function(terms, i) {
  //fixup current term
  terms[i].expansion = terms[i].text.replace(/'s$/, '');
  //make ghost-term
  let second_word = new pos.Verb('');
  second_word.whitespace.trailing = terms[i].whitespace.trailing; //move whitespace
  terms[i].whitespace.trailing = ' ';
  second_word.expansion = 'is';
  terms.splice(i + 1, 0, second_word);
  return terms;
};


//turn all contraction-forms into 'silent' tokens
const interpret = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    //known-forms
    if (irregulars[terms[i].normal]) {
      terms = handle_irregulars(terms, i, irregulars[terms[i].normal]);
      continue;
    }
    //words with an apostrophe
    if (terms[i].has_abbreviation()) {
      let split = terms[i].normal.split(/'/);
      let pre = split[0];
      let post = split[1];
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

},{"../../parts_of_speech":69}],74:[function(require,module,exports){
'use strict';
const assign = require('../assign');
const grammar_rules = require('./rules/grammar_rules');
const fns = require('../../../fns');
// const match = require('../../match/match');


//tests a subset of terms against a array of tags
const hasTags = function(terms, tags) {
  if (terms.length !== tags.length) {
    return false;
  }
  for(let i = 0; i < tags.length; i++) {
    //do a [tag] match
    if (fns.startsWith(tags[i], '[') && fns.endsWith(tags[i], ']')) {
      let pos = tags[i].match(/^\[(.*?)\]$/)[1];
      if (!terms[i].pos[pos]) {
        return false;
      }
    } else if (terms[i].normal !== tags[i]) { //do a text-match
      return false;
    }

  }
  return true;
};

//hints from the sentence grammar
const grammar_rules_pass = function(s) {
  for(let i = 0; i < s.terms.length; i++) {
    for(let o = 0; o < grammar_rules.length; o++) {
      let rule = grammar_rules[o];
      //does this rule match
      let terms = s.terms.slice(i, i + rule.before.length);
      if (hasTags(terms, rule.before)) {
        //change before/after for each term
        for(let c = 0; c < rule.before.length; c++) {
          if (rule.after[c]) {
            let newPos = rule.after[c].match(/^\[(.*?)\]$/)[1];
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

},{"../../../fns":54,"../assign":65,"./rules/grammar_rules":82}],75:[function(require,module,exports){
'use strict';
const assign = require('../assign');

//clear-up ambiguous interjections "ok"[Int], "thats ok"[Adj]
const interjection_fixes = function(terms) {
  const interjections = {
    ok: true,
    so: true,
    please: true,
    alright: true,
    well: true,
    now: true
  };
  for(let i = 0; i < terms.length; i++) {
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

},{"../assign":65}],76:[function(require,module,exports){
'use strict';
let defaultLexicon = require('../../../lexicon.js');
const assign = require('../assign');

//consult lexicon for this known-word
const lexicon_pass = function(terms, options) {
  let lexicon = options.lexicon || defaultLexicon;
  return terms.map(function(t) {

    let normal = t.normal;
    //normalize apostrophe s for grammatical purposes
    if (t.has_abbreviation()) {
      let split = normal.split(/'/);
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
      const attempt = normal.replace(/^(over|under|out|.*?-|un|re|en)/, '');
      if (lexicon[attempt]) {
        return assign(t, lexicon[attempt], 'lexicon_prefix');
      }
    }
    //try to match without a contraction - "they've" -> "they"
    if (t.has_abbreviation()) {
      let attempt = normal.replace(/'(ll|re|ve|re|d|m|s)$/, '');
      // attempt = attempt.replace(/n't/, '');
      if (lexicon[attempt]) {
        return assign(t, lexicon[attempt], 'lexicon_suffix');
      }
    }

    //match 'twenty-eight'
    if (normal.match(/-/)) {
      let sides = normal.split('-');
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

},{"../../../lexicon.js":56,"../assign":65}],77:[function(require,module,exports){
'use strict';
const lexicon = require('../../../lexicon.js');
const assign = require('../assign');

const should_merge = function(a, b) {
  if (!a || !b) {
    return false;
  }
  //if it's a known multiple-word term
  if (lexicon[a.normal + ' ' + b.normal]) {
    return true;
  }
  return false;
};

const multiples_pass = function(terms) {
  let new_terms = [];
  let last_one = null;
  for(let i = 0; i < terms.length; i++) {
    let t = terms[i];
    //if the tags match (but it's not a hidden contraction)
    if (should_merge(last_one, t)) {
      let last = new_terms[new_terms.length - 1];
      let space = t.whitespace.preceding + last.whitespace.trailing;
      last.text += space + t.text;
      last.rebuild();
      last.whitespace.trailing = t.whitespace.trailing;
      let pos = lexicon[last.normal];
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

},{"../../../lexicon.js":56,"../assign":65}],78:[function(require,module,exports){
'use strict';
const assign = require('../assign');
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
  let nextWord = terms[x + 1];
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
const possessive_pass = function(terms) {
  for(let i = 0; i < terms.length; i++) {
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

},{"../assign":65}],79:[function(require,module,exports){
'use strict';
const assign = require('../assign');
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
const is_pronoun = function(terms, x) {
  const determiners = {
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

const question_pass = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    if (terms[i].pos.Question && is_pronoun(terms, i)) {
      terms[i] = assign(terms[i], 'Pronoun', 'question_is_pronoun');
    }
  }
  return terms;
};

module.exports = question_pass;

},{"../assign":65}],80:[function(require,module,exports){
'use strict';
// knowing if something is inside a quotation is important grammatically
//set all the words inside quotations marks as pos['Quotation']=true
// verbatim change of narration only, 'scare quotes' don't count.

const startQuote = function(s) {
  return s.match(/^["\u201C]./);
};
const endQuote = function(s) {
  return s.match(/.["\u201D]$/);
};

//find the next quotation terminator
const quotation_ending = function(terms, start) {
  for(let i = start; i < terms.length; i++) {
    if (endQuote(terms[i].text)) {
      return i;
    }
  }
  return null;
};

//set these terms as quotations
const tagQuotation = function(terms, start, stop) {
  for(let i = start; i <= stop; i++) {
    if (!terms[i]) {
      break;
    }
    terms[i].pos['Quotation'] = true;
  }
};

//hunt
const quotation_pass = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    if (startQuote(terms[i].text)) {
      let end = quotation_ending(terms, [i]);
      if (end !== null) {
        tagQuotation(terms, i, end);
        return terms;
      }
    }
  }
  return terms;
};

module.exports = quotation_pass;

},{}],81:[function(require,module,exports){
'use strict';
const word_rules = require('./rules/word_rules');
const assign = require('../assign');

//word-rules that run on '.text', not '.normal'
const punct_rules = [
  { //'+'
    reg: new RegExp('^[@%^&*+=~-]?$', 'i'),
    pos: 'Symbol',
    reason: 'independent-symbol'
  },
  { //2:54pm
    reg: new RegExp('^[12]?[0-9]\:[0-9]{2}( am| pm)?$', 'i'),
    pos: 'Date',
    reason: 'time_reg'
  },
  { //1999/12/25
    reg: new RegExp('^[0-9]{1,4}[-/][0-9]{1,2}[-/][0-9]{1,4}$', 'i'),
    pos: 'Date',
    reason: 'numeric_date'
  },
  { //3:32
    reg: new RegExp('^[0-9]{1,2}:[0-9]{2}(:[0-9]{2})?', 'i'),
    pos: 'Date',
    reason: 'time'
  },
];

const regex_pass = function(terms) {
  terms.forEach((t, i) => {
    //don't overwrite
    if (terms[i].tag !== '?') {
      return;
    }
    let text = terms[i].text;
    let normal = terms[i].normal;
    //normalize apostrophe s for grammatical purposes
    if (terms[i].has_abbreviation()) {
      let split = terms[i].normal.split(/'/);
      if (split[1] === 's') {
        normal = split[0];
      }
    }
    //regexes that involve punctuation
    for(let o = 0; o < punct_rules.length; o++) {
      if (text.match(punct_rules[o].reg)) {
        terms[i] = assign(terms[i], punct_rules[o].pos, punct_rules[o].rules);
        return;
      }
    }
    //bigger list of regexes on normal
    for (let o = 0; o < word_rules.length; o++) {
      if (normal.match(word_rules[o].reg)) {
        let reason = 'regex #' + o + ' ' + word_rules[o].pos;
        terms[i] = assign(terms[i], word_rules[o].pos, reason);
        return;
      }
    }
  });
  return terms;
};

module.exports = regex_pass;

},{"../assign":65,"./rules/word_rules":83}],82:[function(require,module,exports){
module.exports = [
  //determiner hints
  {
    'before': ['[Determiner]', '[?]'],
    'after': ['[Determiner]', '[Noun]']
  },
  {
    'before': ['the', '[Verb]'],
    'after': [null, '[Noun]']
  },
  {
    'before': ['[Determiner]', '[Adjective]', '[Verb]'],
    'after': ['[Noun]', '[Noun]', '[Noun]']
  },
  {
    'before': ['[Determiner]', '[Adverb]', '[Adjective]', '[?]'],
    'after': ['[Determiner]', '[Adverb]', '[Adjective]', '[Noun]'],
  },
  {
    'before': ['[?]', '[Determiner]', '[Noun]'],
    'after': ['[Verb]', '[Determiner]', '[Noun]'],
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
    'after': ['[Possessive]', '[Noun]'],
  },
  // {
  //   'before': ['[Possessive]', '[Verb]'],
  //   'after': ['[Possessive]', '[Noun]'],
  // },
  {
    'before': ['[?]', '[Possessive]', '[Noun]'],
    'after': ['[Verb]', '[Possessive]', '[Noun]'],
  },
  //copula hints
  {
    'before': ['[Copula]', '[?]'],
    'after': ['[Copula]', '[Adjective]'], // not sure
  },
  {
    'before': ['[Copula]', '[Adverb]', '[?]'],
    'after': ['[Copula]', '[Adverb]', '[Adjective]'], // not sure
  },
  //preposition hints
  {
    'before': ['[?]', '[Preposition]'],
    'after': ['[Verb]', '[Preposition]'],
  },
  //conjunction hints, like lists (a little sloppy)
  {
    'before': ['[Adverb]', '[Conjunction]', '[Adverb]'],
    'after': ['[Adverb]', '[Adverb]', '[Adverb]'],
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
    'after': ['[Adjective]', '[Adjective]', '[Adjective]'],
  },
  {
    'before': ['[?]', '[Conjunction]', '[Verb]'],
    'after': ['[Verb]', '[Conjunction]', '[Verb]'],
  },
  {
    'before': ['[Verb]', '[Conjunction]', '[?]'],
    'after': ['[Verb]', '[Conjunction]', '[Verb]'],
  },
  //adverb hints
  {
    'before': ['[Noun]', '[Adverb]', '[Noun]'],
    'after': ['[Noun]', '[Adverb]', '[Verb]'],
  },
  //pronoun hints
  {
    'before': ['[?]', '[Pronoun]'],
    'after': ['[Verb]', '[Pronoun]'],
  },
  //modal hints
  {
    'before': ['[Modal]', '[?]'],
    'after': ['[Modal]', '[Verb]'],
  },
  {
    'before': ['[Modal]', '[Adverb]', '[?]'],
    'after': ['[Modal]', '[Adverb]', '[Verb]'],
  },
  { // 'red roses' => Adjective, Noun
    'before': ['[Adjective]', '[Verb]'],
    'after': ['[Adjective]', '[Noun]'],
  },
  { // 5 kittens => Value, Nouns
    'before': ['[Value]', '[Verb]'],
    'after': ['[Value]', '[Noun]'],
  },

  //ambiguous dates (march/may)
  // {
  //   'before': ['[Modal]', '[Value]'],
  //   'after': ['[Modal]', '[Verb]'],
  // },
  {
    'before': ['[Adverb]', '[Value]'],
    'after': ['[Adverb]', '[Verb]'],
  }
];

},{}],83:[function(require,module,exports){
const tag_mapping = require('../../parts_of_speech.js').tag_mapping;
//regex patterns and parts of speech],
module.exports = [
  ['^[0-9]+ ?(am|pm)$', 'DA'],
  ['^[0-9]+(st|nd|rd)?$', 'CD'],
  ['^[a-z]et$', 'VB'],
  ['cede$', 'VB'],
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
  ['.[oe]ry$', 'NN'],
  ['[rdntkdhs]ly$', 'RB'],
  ['.[lsrnpb]ian$', 'JJ'],
  ['.[^aeiou]ial$', 'JJ'],
  ['.[^aeiou]eal$', 'JJ'],
  ['.[vrl]id$', 'JJ'],
  ['.[ilk]er$', 'JJR'],
  ['.ike$', 'JJ'],
  ['.ends?$', 'VB'],
  ['.wards$', 'RB'],
  ['.rmy$', 'JJ'],
  ['.rol$', 'NN'],
  ['.tors$', 'NN'],
  ['.azy$', 'JJ'],
  ['.where$', 'RB'],
  ['.ify$', 'VB'],
  ['.bound$', 'JJ'],
  ['.[^z]ens$', 'VB'],
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
  ['.ing$', 'VB'],  //likely to be converted to adjective after lexicon pass
  ['.tions$', 'NN'],
  ['.tures$', 'NN'],
  ['.ous$', 'JJ'],
  ['.ports$', 'NN'],
  ['. so$', 'RB'],
  ['.ints$', 'NN'],
  ['.[gt]led$', 'JJ'],
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
  ['.[^aeiou][ai]ble$', 'JJ'],
  ['.[^aeiou]eable$', 'JJ'],
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
  ['[^aeiou]ician$', 'AC'],
  ['.keeper$', 'AC'],
  ['.logist$', 'AC'],
  ['..ier$', 'AC'],
  ['.[^aeiou][ao]pher$', 'AC'],
  ['.tive$', 'AC'],
  ['[aeiou].*ist$', 'JJ'],
  ['[^i]fer$', 'VB'],
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
  ['^uh[ -]?oh$', 'EX'], //uhoh
].map(function(a) {
  return {
    reg: new RegExp(a[0], 'i'),
    pos: tag_mapping[a[1]]
  };
});

},{"../../parts_of_speech.js":69}],84:[function(require,module,exports){
'use strict';
//identify urls, hashtags, @mentions, emails
const assign = require('../assign');
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
  for(let i = 0; i < terms.length; i++) {
    let str = terms[i].text.trim().toLowerCase();
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

},{"../assign":65}],85:[function(require,module,exports){
//part-of-speech tagging
'use strict';

const lump_two = require('./lumper/lump_two');
const lump_three = require('./lumper/lump_three');
const pos = require('./parts_of_speech');
const assign = require('./assign');

const grammar_pass = require('./passes/grammar_pass');
const interjection_fixes = require('./passes/interjection_fixes');
const lexicon_pass = require('./passes/lexicon_pass');
const capital_signals = require('./passes/capital_signals');
const conditional_pass = require('./passes/conditional_pass');
const ambiguous_dates = require('./passes/ambiguous_dates');
const multiple_pass = require('./passes/multiples_pass');
const regex_pass = require('./passes/regex_pass');
const quotation_pass = require('./passes/quotation_pass');
const possessive_pass = require('./passes/possessive_pass');
const contraction_pass = require('./passes/contractions/interpret');
const question_pass = require('./passes/question_pass');
const web_text_pass = require('./passes/web_text_pass');

const noun_fallback = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    if (terms[i].tag === '?' && terms[i].normal.match(/[a-z]/)) {
      terms[i] = assign(terms[i], 'Noun', 'fallback');
    }
  }
  return terms;
};

//turn nouns into person/place
const specific_noun = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    let t = terms[i];
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

const tagger = function(s, options) {
  //word-level rules
  s.terms = capital_signals(s.terms);
  s.terms = lexicon_pass(s.terms, options);
  s.terms = multiple_pass(s.terms);
  s.terms = regex_pass(s.terms);
  s.terms = interjection_fixes(s.terms);
  s.terms = web_text_pass(s.terms);
  //sentence-level rules
  //(repeat these steps a couple times, to wiggle-out the grammar)
  for(let i = 0; i < 3; i++) {
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

},{"./assign":65,"./lumper/lump_three":67,"./lumper/lump_two":68,"./parts_of_speech":69,"./passes/ambiguous_dates":70,"./passes/capital_signals":71,"./passes/conditional_pass":72,"./passes/contractions/interpret":73,"./passes/grammar_pass":74,"./passes/interjection_fixes":75,"./passes/lexicon_pass":76,"./passes/multiples_pass":77,"./passes/possessive_pass":78,"./passes/question_pass":79,"./passes/quotation_pass":80,"./passes/regex_pass":81,"./passes/web_text_pass":84}],86:[function(require,module,exports){
'use strict';
//build-out this mapping
const interrogatives = {
  'who': 'who',
  'whose': 'who',
  'whom': 'who',
  'which person': 'who',

  'where': 'where',
  'when': 'when',

  'why': 'why',
  'how come': 'why',
};

const easyForm = function(s, i) {
  let t = s.terms[i];
  let nextTerm = s.terms[i + 1];

  //some interrogative forms are two-terms, try it.
  if (nextTerm) {
    let twoTerm = t.normal + ' ' + nextTerm.normal;
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

},{}],87:[function(require,module,exports){
'use strict';

let hardFormVerb = {
  'which': 'which',
  'what': 'what',
};

// "what time" -> 'when'
let knownForm = {
  time: 'when',
  day: 'when',
  year: 'when',

  person: 'who', //more covered by pos["Actor"]

  amount: 'number',
  number: 'number',
};

const hardForm = function(s, i) {
  let t = s.terms[i];
  let nextTerm = s.terms[i + 1];
  // which, or what
  let questionWord = hardFormVerb[t.normal] || hardFormVerb[t.expanded];
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

},{}],88:[function(require,module,exports){
'use strict';
const Sentence = require('../sentence.js');
const question_form = require('./question_form');

class Question extends Sentence {
  constructor(str, options) {
    super(str, options);
  }

  form() {
    return question_form(this);
  }

}
Question.fn = Question.prototype;

module.exports = Question;

// let q = new Question(`accordingly, is he cool?`);
// let q = new Question(`what time did you show up?`);
// console.log(q.form());

},{"../sentence.js":91,"./question_form":89}],89:[function(require,module,exports){
'use strict';
//classifies a question into:
let yesNoTerm = require('./yesNo.js');
let easyForm = require('./easyForm.js');
let hardForm = require('./hardForm.js');

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

const question_form = function(s) {
  //loop through and find first signal
  for(let i = 0; i < s.terms.length; i++) {

    //who is.. -> "who"
    let form = easyForm(s, i);
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

},{"./easyForm.js":86,"./hardForm.js":87,"./yesNo.js":90}],90:[function(require,module,exports){
'use strict';

// Yes/No questions take the form:
// he is -> is he?
const yesNoVerb = {
  is: true,
  are: true,
  was: true,
  will: true,
  do: true,
  did: true,
};

const yesNoTerm = function(s, i) {
  let t = s.terms[i];
  let lastTerm = s.terms[i - 1];
  let nextTerm = s.terms[i + 1];
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

},{}],91:[function(require,module,exports){
'use strict';
const Term = require('../term/term');
const tagger = require('./pos/tagger');
const passive_voice = require('./passive_voice');
const contractions = {
  contract: require('./contractions/contract'),
  expand: require('./contractions/expand'),
};
const change_tense = require('./change_tense');
const spot = require('./spot');
const match = require('../match/match');
let tokenize_match = function() {};


//a sentence is an array of Term objects, along with their various methods
class Sentence {

  constructor(str, options) {
    this.str = '';
    if (typeof str === 'string') {
      this.str = str;
    } else if (typeof str === 'number') {
      this.str = '' + str;
    }
    options = options || {};
    const the = this;
    const words = this.str.split(/( +)/);
    //build-up term-objects
    this.terms = [];
    if (words[0] === '') {
      words.shift();
    }
    for(let i = 0; i < words.length; i++) {
      if (!words[i] || !words[i].match(/\S/i)) {
        continue;
      }
      let whitespace = {
        preceding: words[i - 1],
        trailing: words[i + 1],
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
      expand: function() {
        the.terms = contractions.expand(the.terms);
        return the;
      },
      // "he would go" -> "he'd go"
      contract: function() {
        the.terms = contractions.contract(the.terms);
        return the;
      }
    };
  }

  //Sentence methods:

  //insert a new word at this point
  addBefore(i, str) {
    let t = new Term(str);
    this.terms.splice(i, 0, t);
  }
  addAfter(i, str) {
    let t = new Term(str);
    this.terms.splice(i + 1, 0, t);
  }

  // a regex-like lookup for a list of terms.
  // returns [] of matches in a 'Terms' class
  match(match_str, options) {
    let regs = tokenize_match(match_str);
    return match.findAll(this.terms, regs, options);
  }
  //returns a transformed sentence
  replace(match_str, replacement, options) {
    let regs = tokenize_match(match_str);
    replacement = tokenize_match(replacement);
    match.replaceAll(this.terms, regs, replacement, options);
    return this;
  }

  //the ending punctuation
  terminator() {
    const allowed = {
      '.': true,
      '?': true,
      '!': true
    };
    let char = this.str.match(/([\.\?\!])\W*$/);
    if (char && allowed[char[1]]) {
      return char[1];
    }
    return '';
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
      '.': 'declarative'
    };
    return types[char] || 'declarative';
  }

  // A was verbed by B - B verbed A
  is_passive() {
    return passive_voice(this);
  }
  // Question doesn't have negate, this is a placeholder
  negate() {
    return this;
  }

  //map over Term methods
  text() {
    return this.terms.reduce(function(s, t) {
      //implicit contractions shouldn't be included
      if (t.text) {
        s += (t.whitespace.preceding || '') + t.text + (t.whitespace.trailing || '');
      }
      return s;
    }, '');
  }
  //like text but for cleaner text
  normal() {
    let str = this.terms.reduce(function(s, t) {
      if (t.normal) {
        s += ' ' + t.normal;
      }
      return s;
    }, '').trim();
    return str + this.terminator();
  }

  //further 'lemmatisation/inflection'
  root() {
    return this.terms.reduce(function(s, t) {
      s += ' ' + t.root();
      return s;
    }, '').trim();
  }
  //return only the main POS classnames/tags
  tags() {
    return this.terms.map(function(t) {
      return t.tag || '?';
    });
  }
  //mining for specific things
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
  organizations() {
    return this.terms.filter(function(t) {
      return t.pos['Organization'];
    });
  }
  values() {
    return this.terms.filter(function(t) {
      return t.pos['Value'];
    });
  }

  //parts of speech
  nouns() {
    return this.terms.filter(function(t) {
      return t.pos['Noun'];
    });
  }
  adjectives() {
    return this.terms.filter(function(t) {
      return t.pos['Adjective'];
    });
  }
  verbs() {
    return this.terms.filter(function(t) {
      return t.pos['Verb'];
    });
  }
  adverbs() {
    return this.terms.filter(function(t) {
      return t.pos['Adverb'];
    });
  }

  // john walks quickly -> john walked quickly
  to_past() {
    change_tense(this, 'past');
    return this;
  }
  // john walked quickly -> john walks quickly
  to_present() {
    change_tense(this, 'present');
    return this;
  }
  // john walked quickly -> john will walk quickly
  to_future() {
    change_tense(this, 'future');
    return this;
  }
  strip_conditions() {
    this.terms = this.terms.filter((t, i) => {
      //remove preceding condition
      if (i > 0 && t.pos['Condition'] && !this.terms[i - 1].pos['Condition']) {
        this.terms[i - 1].text = this.terms[i - 1].text.replace(/,$/, '');
        this.terms[i - 1].whitespace.trailing = '';
        this.terms[i - 1].rebuild();
      }
      return !t.pos['Condition'];
    });
    return this;
  }

  //'semantic' word-count, skips over implicit terms and things
  word_count() {
    return this.terms.filter((t) => {
      //a quiet term, from a contraction
      if (t.normal === '') {
        return false;
      }
      return true;
    }).length;
  }

  //named-entity recognition
  topics() {
    return spot(this);
  }

}

//unpublished methods
//tokenize the match string, just like you'd tokenize the sentence.
//this avoids lumper/splitter problems between haystack and needle
tokenize_match = function(str) {
  let regs = new Sentence(str).terms; //crazy!
  regs = regs.map((t) => t.text);
  regs = regs.filter((t) => t !== '');
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

},{"../match/match":57,"../term/term":132,"./change_tense":61,"./contractions/contract":62,"./contractions/expand":63,"./passive_voice":64,"./pos/tagger":85,"./spot":92}],92:[function(require,module,exports){
'use strict';
//generic named-entity-recognition

const blacklist = {
  man: true,
  woman: true,
  girl: true,
  boy: true,
  guy: true,
  father: true,
  mother: true,
  sister: true,
  brother: true,
};

const consolidate = function(topics) {
  let names = {};
  for(let i = 0; i < topics.length; i++) {
    let normal = topics[i].root();
    if (normal) {
      names[normal] = names[normal] || {
        count: 0,
        text: normal
      };
      names[normal].count += 1;
    }
  }
  //sort by freq
  let arr = Object.keys(names).map((k) => names[k]);
  return arr.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    } else {
      return 1;
    }
  });
};


const spot = function(s) {
  let topics = [];
  for(let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
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

},{}],93:[function(require,module,exports){
'use strict';
const fns = require('../../../fns');

//these terms are nicer ways to negate a sentence
//ie. john always walks -> john always doesn't walk
const logical_negate = {
  'everyone': 'no one',
  'everybody': 'nobody',
  'someone': 'no one',
  'somebody': 'nobody',
  // everything:"nothing",
  'always': 'never'
};
//create corrollary
let logical_affirm = fns.reverseObj(logical_negate);
//these are not symmetic
logical_affirm['nobody'] = 'somebody';

const negate = function(s) {

  for(let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
    //these verbs are red-herrings
    if (t.pos['Condition'] || t.pos['Quotation']) {
      continue;
    }
    //logical-negations are smoother than verb-negations
    //ie. always -> never
    if (logical_negate[t.normal]) {
      t.changeTo(logical_negate[t.normal]);
      break;
    }
    if (logical_affirm[t.normal]) {
      t.changeTo(logical_affirm[t.normal]);
      break;
    }
    //negate the first verb
    if (t.pos['Verb']) {

      //different rule for i/we/they/you + infinitive
      //that is, 'i walk' -> 'i don\'t walk', not 'I not walk'
      function isPronounAndInfinitive() {
        if (s.terms[i - 1]) {
          let p = s.terms[i - 1].text;
          return (p === 'i' || p === 'we' || p === 'they' || p === 'you') &&
            (t.pos['Infinitive']);
        }
        return false;
      }

      if (isPronounAndInfinitive()) {
        t.changeTo('don\'t ' + t.text);
        break;
      }
      t.negate();
      break;
    }
  }
  return;
};

module.exports = negate;

},{"../../../fns":54}],94:[function(require,module,exports){
'use strict';
const Sentence = require('../sentence.js');
const negate = require('./negate/negate.js');

class Statement extends Sentence {
  constructor(str, options) {
    super(str, options);
  }
  negate() {
    negate(this);
    return this;
  }
}
Statement.fn = Statement.prototype;

module.exports = Statement;

// let s = new Statement('john is a person');
// console.log(s);

},{"../sentence.js":91,"./negate/negate.js":93}],95:[function(require,module,exports){
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
    if (tag) {
      this.pos[tag] = true;
    }
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
  all_forms() {
    let forms = this.conjugate();
    forms['normal'] = this.normal;
    return forms;
  }

}
Adjective.fn = Adjective.prototype;

//let t = new Adjective("quick")
//console.log(t.all_forms());

module.exports = Adjective;

},{"../term.js":132,"./to_adverb":96,"./to_comparative":97,"./to_noun":98,"./to_superlative":99}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
//turn 'quick' into 'quickly'
'use strict';
const convertables = require('../../data/convertables.js');

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

  if (convertables.hasOwnProperty(str)) {
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

},{"../../data/convertables.js":34}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
//turn 'quick' into 'quickest'
'use strict';
const convertables = require('../../data/convertables.js');

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

},{"../../data/convertables.js":34}],100:[function(require,module,exports){
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
  all_forms() {
    return {
      adjective: this.to_adjective(),
      normal: this.normal
    }
  }
}
Adverb.fn = Adverb.prototype;

//let t = new Adverb("quickly")
//console.log(t.all_forms());

module.exports = Adverb;

},{"../term.js":132,"./to_adjective.js":101}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
'use strict';
//turn "plz"  "please"
const implications = {
  'plz': 'please',
  'tmrw': 'tomorrow',
  'wat': 'what',
  'r': 'are',
  'u': 'you',
};

const implied = function(str) {
  if (implications[str]) {
    return implications[str];
  }
  return null;
};

module.exports = implied;

},{}],103:[function(require,module,exports){
'use strict';
const is_acronym = function(str) {
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

},{}],104:[function(require,module,exports){
'use strict';

const is_acronym = require('../is_acronym.js');

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

module.exports = indefinite_article;

// console.log(indefinite_article('N.D.A'));

},{"../is_acronym.js":103}],105:[function(require,module,exports){
'use strict';
const Noun = require('../noun.js');
const parse_date = require('./parse_date.js');

class _Date extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Date'] = true;
    this.data = parse_date(this.text) || {};
  }

  //can we make it a js Date object?
  is_date() {
    let o = this.data;
    if (o.month === null || o.day === null || o.year === null) {
      return false;
    }
    return true;
  }

  date() {
    if (this.is_date() === false) {
      return null;
    }
    let d = new Date();
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

}
_Date.fn = _Date.prototype;

module.exports = _Date;

// let d = new _Date('June 4th 1993');
// console.log(d.date());

},{"../noun.js":111,"./parse_date.js":108}],106:[function(require,module,exports){
'use strict';

let months = require('../../../data/dates').months.concat(['march', 'may']); //(march and may are ambiguous grammatically)
const month = '(' + months.join('|') + ')';
const day = '([0-9]{1,2})';
const year = '\'?([12][0-9]{3})';

const rules = [
  {
    reg: `${month} ${day} ${year}`, //'March 1st 1987'
    order: ['month', 'day', 'year']
  },
  {
    reg: `${day} of ${month} ${year}`, //'3rd of March 1969',
    order: ['day', 'month', 'year']
  },

  //incomplete versions
  {
    reg: `${day} of ${month}`, //'3rd of March',
    order: ['day', 'month']
  },
  {
    reg: `${month} ${year}`, //'March 1969',
    order: ['month', 'year']
  },
  {
    reg: `${month} ${day}`, //'March 18th',
    order: ['month', 'day']
  },
  {
    reg: `${day} ${month}`, //'18th of March',
    order: ['day', 'month']
  },
  {
    reg: `${month}`, //'january'
    order: ['month']
  },
  {
    reg: `${year}`, //'1998'
    order: ['year']
  }
].map(function (o) {
  o.reg = new RegExp('\\b' + o.reg + '\\b', '');
  return o;
});
module.exports = rules;

},{"../../../data/dates":36}],107:[function(require,module,exports){

'use strict';

const dates = require('../../../data/dates');

//build date regex
let terms = dates.months.concat(dates.days);
let day_reg = '(\\b' + terms.join('\\b|\\b') + '\\b)';
day_reg = new RegExp(day_reg, 'i');
const times_reg = /1?[0-9]:[0-9]{2}/;
const is_date = function(str) {
  if (str.match(day_reg) || str.match(times_reg)) {
    return true;
  }
  //a straight-up year, like '2016'
  if (str.match(/^[12][0-9]{3}$/)) {
    let n = parseInt(str, 10);
    if (n > 1300 && n < 2100) {
      return true;
    }
  }
  return false;
};

module.exports = is_date;

// console.log(is_date('2015'));

},{"../../../data/dates":36}],108:[function(require,module,exports){
'use strict';
// #generates properly-formatted dates from free-text date forms
// #by spencer kelly 2015
const to_number = require('../value/parse/to_number.js');
//regexes to top-parse
const rules = require('./date_rules.js');

//return integers from strings
let wrangle = {

  year: function(s) {
    let num = s.match(/[0-9]+/);
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

  month: function(s) {
    //0 based months, 1 based days...
    let months_obj = {
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

  day: function(s) {
    let n = to_number(s) || parseInt(s, 10);
    if (n < 0 || n > 31) {
      return null;
    }
    return n;
  }
};

//cleanup string
const preprocess = function(str) {
  str = str.toLowerCase();
  str = str.replace(/([0-9]+)(nd|rd|th|st)/i, '$1');
  let words = str.split(' ').map(function(w) {
    if (!w.match(/[0-9]/)) {
      return to_number(w) || w;
    }
    return w;
  });
  return words.join(' ');
};

const date_parser = function(str) {
  str = preprocess(str);
  let result = {
    year: null,
    month: null,
    day: null
  };
  for(let i = 0; i < rules.length; i++) {
    if (str.match(rules[i].reg)) {
      let m = str.match(rules[i].reg);
      for(let o = 0; o < rules[i].order.length; o++) {
        let type = rules[i].order[o];
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

},{"../value/parse/to_number.js":128,"./date_rules.js":106}],109:[function(require,module,exports){
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

},{"../../data/irregular_nouns":41}],110:[function(require,module,exports){
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

},{"../../data/uncountables.js":52}],111:[function(require,module,exports){
'use strict';
const Term = require('../term.js');
const article = require('./article.js');
const is_plural = require('./is_plural.js');
const is_place = require('./place/is_place.js');
const is_person = require('./person/is_person.js');
const pronoun = require('./pronoun.js');
const is_value = require('./value/is_value.js');
const is_date = require('./date/is_date.js');
const is_organization = require('./organization/is_organization.js');
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
    if (this.is_plural()) {
      this.pos['Plural'] = true;
    }
  }
  //noun methods
  article() {
    //if it's a person, it's he/she, not a/an
    if (this.pos['Person']) {
      return this.pronoun();
    }
    //groups of people are 'they'
    if (this.pos['Organization']) {
      return 'they';
    }
    return article(this.text);
  }
  root() {
    return this.singularize();
  }
  pronoun() {
    if (this.is_organization() || this.is_place() || this.is_value()) {
      return 'it';
    }
    return pronoun(this.normal);
  }
  is_plural() {
    if (this.pos['Date'] || this.pos['Possessive']) {
      return false;
    } else if (this.has_abbreviation()) { //contractions & possessives are not plural
      return false;
    } else {
      return is_plural(this.normal);
    }
  }
  is_uncountable() {
    return is_uncountable(this.strip_apostrophe());
  }
  pluralize() {
    return pluralize(this.strip_apostrophe());
  }
  singularize() {
    return singularize(this.strip_apostrophe());
  }
  //sub-classes
  is_person() {
    //don't overwrite dates, etc
    if (this.pos['Date']) {
      return false;
    }
    return is_person(this.strip_apostrophe());
  }
  is_organization() {
    //don't overwrite urls
    if (this.pos['Url']) {
      return false;
    }
    return is_organization(this.strip_apostrophe(), this.text);
  }
  is_date() {
    return is_date(this.strip_apostrophe());
  }
  is_value() {
    //don't overwrite dates, etc
    if (this.pos['Date'] || this.pos['HashTag']) {
      return false;
    }
    return is_value(this.strip_apostrophe());
  }
  is_place() {
    return is_place(this.strip_apostrophe());
  }
  all_forms() {
    return {
      'singular': this.singularize(),
      'plural': this.pluralize(),
      'normal': this.normal
    };
  }

}

Noun.fn = Noun.prototype;

module.exports = Noun;

//let t = new Noun('mouse');
//console.log(t.all_forms());

},{"../term.js":132,"./article.js":104,"./date/is_date.js":107,"./is_plural.js":109,"./is_uncountable.js":110,"./organization/is_organization.js":112,"./person/is_person.js":115,"./place/is_place.js":118,"./pluralize.js":120,"./pronoun.js":121,"./singularize.js":122,"./value/is_value.js":125}],112:[function(require,module,exports){
'use strict';
const abbreviations = require('../../../data/abbreviations');
const org_data = require('../../../data/organizations');

//some boring capitalised acronyms you see frequently
const blacklist = {
  url: true,
  http: true,
  wtf: true,
  irl: true,
  ie: true,
  eg: true,
  gps: true,
  dna: true,
  sms: true, //these should maybe be somewhere else
};

//words like 'co' and ltd
let org_suffix = abbreviations.orgs.reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});
org_data.suffixes.forEach(function(s) { //a few more
  org_suffix[s] = true;
});

//named orgs like google and nestle
let org_names = org_data.organizations.reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

const is_organization = function(str, text) {
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
  if (str.match(/[a-z]{3}\.(com|net|org|biz)/)) { //not a perfect url regex, but a "org.com"
    return true;
  }
  // "foobar inc."
  let words = str.split(' ');
  if (words.length > 1) {
    let last = words[words.length - 1];
    if (org_suffix[last]) {
      return true;
    }
  }

  return false;
};

module.exports = is_organization;

// console.log(is_organization('Captain of Jamaica'));

},{"../../../data/abbreviations":32,"../../../data/organizations":48}],113:[function(require,module,exports){
'use strict';
const Noun = require('../noun.js');

class Organization extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Organization'] = true;

  }
}
Organization.fn = Organization.prototype;
module.exports = Organization;

},{"../noun.js":111}],114:[function(require,module,exports){
'use strict';
const firstnames = require('../../../data/firstnames').all;
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
  if (normal.match(/\b(mr|mister|sr|sir|jr)\b/i)) {
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
  // name not recognized, or recognized as of indeterminate gender
  return null;
};
module.exports = gender;

// console.log(gender('john', 'john') === 'Male');
// console.log(gender('jane smith', 'jane') === 'Female');
// console.log(gender('jan smith', 'jan') === null);

},{"../../../data/firstnames":38,"./parse_name.js":116}],115:[function(require,module,exports){
'use strict';
const firstnames = require('../../../data/firstnames').all;
let honourifics = require('../../../data/honourifics').reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

//these pronouns are people
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

},{"../../../data/firstnames":38,"../../../data/honourifics":40}],116:[function(require,module,exports){
'use strict';
const firstnames = require('../../../data/firstnames').all;
const honourifics = require('../../../data/honourifics').reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

//str is a normalized string
//str_orig is original text [optional]
const parse_name = function(str, str_orig) {

  let words = str.split(' ');
  let o = {
    honourific: null,
    firstName: null,
    middleName: null,
    lastName: null,
  };

  let double_firstname = 0; //assuming no

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
    if (firstnames[words[1]]
      && str_orig
      && words.length > 1
      && (str_orig.indexOf(' ') > str_orig.indexOf('-')
      || str_orig.indexOf(' ') === -1)) {
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
  if (str_orig && (str_orig.lastIndexOf('-') > double_firstname)) {
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

},{"../../../data/firstnames":38,"../../../data/honourifics":40}],117:[function(require,module,exports){
// not all cultures use the firstname-lastname practice. this does make some assumptions.
'use strict';
const Noun = require('../noun.js');
const guess_gender = require('./gender.js');
const parse_name = require('./parse_name.js');

//capitalizes first letter of every word in a string
const title_case = function (s) {
  if (!s) {
    return s;
  }
  s = s.replace(/(^\w|-\w| \w)/g, function (v) {
    return v.toUpperCase();
  });
  return s;
};

//capitalizes last name taking into account Mc-, Mac-, O'-
const lastname_case = function (s) {
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
    if (this.isPronoun()) {
      this.pos['Pronoun'] = true;
    }
    if (tag) {
      this.pos[tag] = true;
    }
  }

  isPronoun() {
    let whitelist = {
      'he': true,
      'she': true,
      'i': true,
      'you': true,
    };
    return whitelist[this.normal];
  }

  //proper normalised name without the cruft
  root() {
    if (this.isPronoun()) {
      return this.normal;
    }
    let str = '';

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
  parse() {
    let o = parse_name(this.normal, this.text.trim());
    this.honourific = o.honourific;
    this.firstName = title_case(o.firstName);
    this.middleName = title_case(o.middleName);
    this.lastName = lastname_case(o.lastName);
  }

  gender() {
    //if we already know it, from the lexicon
    if (this.pos.FemalePerson) {
      return 'Female';
    }
    if (this.pos.MalePerson) {
      return 'Male';
    }
    return guess_gender(this.normal);
  }

  pronoun() {
    const pronouns = {
      Male: 'he',
      Female: 'she',
    };
    let gender = this.gender();
    //return 'singular they' if no gender is found
    return pronouns[gender] || 'they';
  }

}
Person.fn = Person.prototype;
module.exports = Person;
/*
let p = new Person('Jani-Lee K. o\'brien-macneil');
console.log(p);
let z = new Person('Mary-Jane Willson-Johnson');
console.log(z);*/

},{"../noun.js":111,"./gender.js":114,"./parse_name.js":116}],118:[function(require,module,exports){
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
//add airports
places.airports.forEach(function(s) {
  isPlace[s] = true;
});
//add place abbreviations names
abbreviations.places.forEach(function(s) {
  isPlace[s] = true;
});

//these are signals too
let firstwords = [
  'west',
  'east',
  'nort',
  'south',
  'western',
  'eastern',
  'nortern',
  'southern',
  'mount',
].reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

const lastwords = [
  'city',
  'town',
  'county',
  'village',
  'province',
  'country',
  'state',
  'province',
  'mountain',
  'river',
  'valley',
  'park',
  'avenue',
  'street',
  'road', //these should maybe be somewhere else
].reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

const is_place = function(str) {
  let words = str.split(' ');

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
  for (let i = 0; i < words.length; i++) {
    if (isPlace[words[i]]) {
      return true;
    }
  }

  return false;
};

module.exports = is_place;

},{"../../../data/abbreviations":32,"../../../data/places":50}],119:[function(require,module,exports){
'use strict';
const Noun = require('../noun.js');
const places = require('../../../data/places.js');
const fns = require('../../../fns.js');
//make cities/countries easy to lookup
let countries = fns.toObj(places.countries);
let cities = fns.toObj(places.cities);


const Place = class Place extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Place'] = true;
    this.pos[tag] = true;
    this.title = null;
    this.city = null;
    this.region = null; //'2nd-tier' (state/province/county/whatever)
    this.country = null;
    this.parse();
  }
  root() {
    return this.title || this.normal;
  }

  parse() {
    //parse a comma-described place like "toronto, ontario"
    let terms = this.strip_apostrophe().split(' ');
    this.title = terms[0];
    for(let i = 1; i < terms.length; i++) {
      let t = terms[i];
      if (cities[t]) {
        this.city = fns.titlecase(t);
      } else if (countries[t]) {
        this.country = fns.titlecase(t);
      } else if (this.city !== null) { //if we already got the city..
        this.region = fns.titlecase(t);
      } else { //it's part of the title
        this.title += ' ' + t;
      }
    }

  }
};
Place.fn = Place.prototype;
module.exports = Place;

// console.log(new Place('Toronto, Ontario, Canada'));

},{"../../../data/places.js":50,"../../../fns.js":54,"../noun.js":111}],120:[function(require,module,exports){
'use strict';
const is_uncountable = require('./is_uncountable.js');
const irregulars = require('../../data/irregular_nouns.js');
const is_plural = require('./is_plural.js');
const fns = require('../../fns.js');

const pluralize_rules = [
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

},{"../../data/irregular_nouns.js":41,"../../fns.js":54,"./is_plural.js":109,"./is_uncountable.js":110}],121:[function(require,module,exports){
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

},{"./is_plural.js":109,"./person/gender.js":114,"./person/is_person.js":115}],122:[function(require,module,exports){
'use strict';
const is_uncountable = require('./is_uncountable.js');
const irregulars = require('../../data/irregular_nouns.js');
const is_plural = require('./is_plural.js');
const fns = require('../../fns.js');

const singularize_rules = [
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

},{"../../data/irregular_nouns.js":41,"../../fns.js":54,"./is_plural.js":109,"./is_uncountable.js":110}],123:[function(require,module,exports){
'use strict';
//parse a url into components, in 'loose' mode
//taken from   http://locutus.io/php/url/parse_url/

const parse_url = function(str) { // eslint-disable-line camelcase
  let key = [
    'source',
    'scheme',
    'authority',
    'userInfo',
    'user',
    'pass',
    'host',
    'port',
    'relative',
    'path',
    'directory',
    'file',
    'query',
    'fragment'
  ];
  let reg = new RegExp([
    '(?:(?![^:@]+:[^:@\\/]*@)([^:\\/?#.]+):)?',
    '(?:\\/\\/\\/?)?',
    '((?:(([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?)',
    '(((\\/(?:[^?#](?![^?#\\/]*\\.[^?#\\/.]+(?:[?#]|$)))*\\/?)?([^?#\\/]*))',
    '(?:\\?([^#]*))?(?:#(.*))?)'
  ].join(''));
  let m = reg.exec(str);
  let uri = {};
  let i = 14;
  while (i--) {
    if (m[i]) {
      uri[key[i]] = m[i];
    }
  }
  return uri;
};

module.exports = parse_url;
// console.log(parse_url('http://fun.domain.com/fun?foo=bar'));

},{}],124:[function(require,module,exports){
'use strict';
const Noun = require('../noun');
const parse_url = require('./parse_url');

class Url extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Url'] = true;
    this.parsed = this.parse();
    this.normal = this.parsed.host || str;
    this.normal = this.normal.replace(/^www\./, '');
  }
  parse() {
    return parse_url(this.text);
  }
}
Url.fn = Url.prototype;
module.exports = Url;
// console.log(new Url('http://fun.domain.com/fun?foo=bar'));

},{"../noun":111,"./parse_url":123}],125:[function(require,module,exports){
'use strict';

const nums = require('../../../data/numbers.js');
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

},{"../../../data/numbers.js":47,"../date/is_date":107}],126:[function(require,module,exports){
'use strict';
// handle 'nine point eight four'
const nums = require('../../../../data/numbers.js');
const fns = require('../../../../fns');
let ones = {};
ones = fns.extend(ones, nums.ones);
ones = fns.extend(ones, nums.teens);
ones = fns.extend(ones, nums.ordinal_ones);
ones = fns.extend(ones, nums.ordinal_teens);

//concatenate into a string with leading '0.'
const decimals = function(words) {
  let str = '0.';
  for(let i = 0; i < words.length; i++) {
    let w = words[i];
    if (ones[w]) {
      str += ones[w];
    } else {
      return 0;
    }
  }
  return parseFloat(str);
};

module.exports = decimals;

},{"../../../../data/numbers.js":47,"../../../../fns":54}],127:[function(require,module,exports){
'use strict';

//support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
const find_modifiers = (str) => {
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

},{}],128:[function(require,module,exports){
'use strict';
// Spoken numbers take the following format
// [sixty five] (thousand) [sixty five] (hundred) [sixty five]
// aka: [one/teen/ten] (multiple) [one/teen/ten] (multiple) ...
const nums = require('../../../../data/numbers.js');
const fns = require('../../../../fns.js');
const find_modifiers = require('./modifiers.js');
const parse_decimals = require('./decimals.js');

let ones = {};
let teens = {};
let tens = {};
let multiples = {};
ones = fns.extend(ones, nums.ones);
ones = fns.extend(ones, nums.ordinal_ones);

teens = fns.extend(teens, nums.teens);
teens = fns.extend(teens, nums.ordinal_teens);

tens = fns.extend(tens, nums.tens);
tens = fns.extend(tens, nums.ordinal_tens);

multiples = fns.extend(multiples, nums.multiples);
multiples = fns.extend(multiples, nums.ordinal_multiples);


const normalize = (s) => {
  //pretty-printed numbers
  s = s.replace(/, ?/g, '');
  s = s.replace(/([a-z])-([a-z])/gi, '$1 $2');
  //parse-out currency
  s = s.replace(/[$£€]/, '');
  s = s.replace(/[\$%\(\)~,]/g, '');
  s = s.trim();
  return s;
};

const section_sum = (obj) => {
  return Object.keys(obj).reduce((sum, k) => {
    sum += obj[k];
    return sum;
  }, 0);
};

//prevent things like 'fifteen ten', and 'five sixty'
const appropriate = (w, has) => {
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

const to_number = function(str) {
  //try to fail-fast
  if (!str || typeof str === 'number') {
    return str;
  }
  str = normalize(str);
  let modifier = find_modifiers(str);
  str = modifier.str;
  let biggest_yet = 0;
  let has = {};
  let sum = 0;
  let isNegative = false;
  let words = str.split(' ');
  for(let i = 0; i < words.length; i++) {
    let w = words[i];
    if (!w || w === 'and') {
      continue;
    }
    if (w === "-" || w === "negative") {
      isNegative = true;
      continue
    }
    if (w.startsWith("-")) {
      isNegative = true;
      w = w.substr(1)
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
    const improperFractionMatch = w.match(/^([0-9,\. ]+)\/([0-9,\. ]+)$/)
    if (improperFractionMatch) {
      const num = parseFloat(improperFractionMatch[1].replace(/[, ]/g, ''))
      const denom = parseFloat(improperFractionMatch[2].replace(/[, ]/g, ''))
      sum += (num/denom) || 0;
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

},{"../../../../data/numbers.js":47,"../../../../fns.js":54,"./decimals.js":126,"./modifiers.js":127}],129:[function(require,module,exports){
'use strict';
// const nums = require('../../../data/numbers.js');
// const fns = require('../../../fns.js');

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
  'nineteen',
];
const tens_mapping = [
  ['ninety', 90],
  ['eighty', 80],
  ['seventy', 70],
  ['sixty', 60],
  ['fifty', 50],
  ['forty', 40],
  ['thirty', 30],
  ['twenty', 20],
];

let sequence = [
  [1000000000, 'million'],
  [100000000, 'hundred million'],
  [1000000, 'million'],
  [100000, 'hundred thousand'],
  [1000, 'thousand'],
  [100, 'hundred'],
  [1, 'one'],
];

//turn number into an array of magnitudes
const breakdown_magnitudes = function(num) {
  let working = num;
  let have = [];
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
  let str = '';
  for(let i = 0; i < tens_mapping.length; i++) {
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


const to_text = function(num) {
  let isNegative = false;
  if (num < 0) {
    isNegative = true;
    num = Math.abs(num);
  }
  //break-down into units, counts
  let units = breakdown_magnitudes(num);
  //build-up the string from its components
  let str = '';
  for(let i = 0; i < units.length; i++) {
    let unit_name = units[i].unit;
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

},{}],130:[function(require,module,exports){
'use strict';
const money = require('../../../data/currencies').reduce((h, s) => {
  h[s] = 'currency';
  return h;
}, {});

const units = {
  'Temperature': {
    '°c': 'Celsius',
    '°f': 'Fahrenheit',
    'k': 'Kelvin',
    '°re': 'Reaumur',
    '°n': 'Newton',
    '°ra': 'Rankine',
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
    'fl oz': 'fluid ounce',
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
    'acre': 'acre',
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
    'knot': 'knot',
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
    'yb': 'yottabyte',
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

},{"../../../data/currencies":35}],131:[function(require,module,exports){
'use strict';
const Noun = require('../noun');
const to_number = require('./parse/to_number');
const to_text = require('./to_text');
const units = require('./units');
const nums = require('../../../data/numbers');
const fns = require('../../../fns');
//get an array of ordinal (first, second...) numbers
let ordinals = {};
ordinals = fns.extend(ordinals, nums.ordinal_ones);
ordinals = fns.extend(ordinals, nums.ordinal_teens);
ordinals = fns.extend(ordinals, nums.ordinal_tens);
ordinals = fns.extend(ordinals, nums.ordinal_multiples);
ordinals = Object.keys(ordinals);

class Value extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Value'] = true;
    this.number = null;
    this.unit = null;
    this.unit_name = null;
    this.measurement = null;
    this.of_what = '';
    // this.text = str;
    // this.normal = str;
    if (this.is_ordinal()) {
      this.pos['Ordinal'] = true;
    }
    this.parse();
  }

  //test for nearly-numbers, like phonenumbers, or whatever
  is_number(s) {
    //phone numbers, etc
    if (s.match(/[:@]/)) {
      return false;
    }
    //if there's a number, then something, then a number
    if (s.match(/[0-9][^(0-9|\/),\.][0-9]/)) {
      if (s.match(/((?:[0-9]|\.)+) ((?:[0-9]|\.)+)\/((?:[0-9]|\.)+)/)) { // I'm sure there is a better regexpxs
        return true;
      }
      return false;
    }
    return true;
  };

  is_number_word(w) {
    let number_words = {
      minus: true,
      negative: true,
      point: true,
      half: true,
      quarter: true,
    };

    if (w.match(/[0-9]/) || number_words[w]) {
      return true;
    } else if (nums.ones[w] || nums.teens[w] || nums.tens[w] || nums.multiples[w]) {
      return true;
    } else if (nums.ordinal_ones[w] || nums.ordinal_teens[w] || nums.ordinal_tens[w] || nums.ordinal_multiples[w]) {
      return true;
    }

    return false;
  };


  is_ordinal() {
    //1st
    if (this.normal.match(/^[0-9]+(rd|st|nd|th)$/)) {
      return true;
    }
    //first, second...
    for(let i = 0; i < ordinals.length; i++) {
      if (fns.endsWith(this.normal, ordinals[i])) {
        return true;
      }
    }
    return false;
  }

  //turn an integer like 22 into '22nd'
  to_ordinal() {
    let num = this.number;
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

  root() {
    let str = this.number;
    if (this.unit) {
      str += ' ' + this.unit;
    }
    return str;
  }

  is_unit() {
    //if it's a known unit
    if (units[this.unit]) {
      return true;
    }
    //currencies are derived-through POS
    if (this.pos['Currency']) {
      return true;
    }

    let s = this.unit.toLowerCase();
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

  parse() {
    if (!this.is_number(this.text)) {
      return;
    }

    let words = this.text.toLowerCase().split(/[ ]/);
    //split at '-' only for numbers like twenty-two, sixty-seven, etc.
    //so that 'twelve six-gram pieces' returns 12 for number, not null
    //however, still returns null for 'three sevel-eleven stores'
    for (let i = 0; i < words.length; i++) {
      let w = words[i];
      if ((w.indexOf('-') === w.lastIndexOf('-')) && w.indexOf('-') > -1) {
        let halves = w.split(/[-]/);
        if (this.is_number_word(halves[0]) && this.is_number_word(halves[1])) {
          words[i] = halves[0];
          words.splice(i + 1, 0, halves[1]);
        }
      }
    }

    let numbers = '';
    let raw_units = '';

    //seperate number-words from unit-words
    for (let i = 0; i < words.length; i++) {
      let w = words[i];
      if (this.is_number_word(w)) {
        numbers += ' ' + w;
      } else {
        raw_units += ' ' + w;
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
    let firstChar = this.text.substr(0, 1);
    const symbolic_currency = {
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
    let of_pos = this.text.indexOf(' of ');
    if (of_pos > 0) {
      let before = this.text.substring(0, of_pos).trim();
      let after = this.text.substring(of_pos + 4).trim();

      let space_pos = before.lastIndexOf(' ');
      let w = before.substring(space_pos).trim();

      //if the word before 'of' is a unit, return whatever is after 'of'
      //else return this word + of + whatever is after 'of'
      if (w && (this.is_unit(w) || this.is_number_word(w))) {
        this.of_what = after;
      } else {
        this.of_what = w + ' of ' + after;
      }
    } else if (this.unit_name) {
      //if value contains a unit but no 'of', return unit
      this.of_what = this.unit;
    } else {
      //if value is a number followed by words, skip numbers
      //and return words; if there is no numbers, return full
      let temp_words = this.text.split(' ');
      for (let i = 0; i < temp_words.length; i++) {
        if (this.is_number_word(temp_words[i])) {
          temp_words[i] = '';
          continue;
        }
        this.of_what = temp_words.join(' ').trim();
      }
    }

  }

  textual() {
    return to_text(this.number || this.normal || this.text);
  }

}
Value.fn = Value.prototype;
module.exports = Value;

},{"../../../data/numbers":47,"../../../fns":54,"../noun":111,"./parse/to_number":128,"./to_text":129,"./units":130}],132:[function(require,module,exports){
'use strict';
const is_acronym = require('./is_acronym');
const match_term = require('../match/match_term');
const syntax_parse = require('../match/syntax_parse');
const implied = require('./implied');

class Term {
  constructor(str, tag, whitespace) {
    //don't pass non-strings through here any further..
    if (typeof str === 'number') {
      str = '' + str;
    } else if (typeof str !== 'string') {
      str = '';
    }
    str = (str).toString();
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
  rebuild() {
    this.text = this.text || '';
    this.text = this.text.trim();

    this.normal = '';
    this.normalize();
    this.expansion = implied(this.normal);
  }
  changeTo(str) {
    this.text = str;
    this.rebuild();
  }
  //a regex-like string search
  match(match_str, options) {
    let reg = syntax_parse([match_str]);
    return match_term(this, reg[0], options);
  }
  //the 'root' singular/infinitive/whatever.
  // method is overloaded by each pos type
  root() {
    return this.strip_apostrophe();
  }
  //strip apostrophe s
  strip_apostrophe() {
    if (this.normal.match(/[a-z]'[a-z][a-z]?$/)) {
      let split = this.normal.split(/'/);
      if (split[1] === 's') {
        return split[0];
      }
    }
    return this.normal;
  }

  has_comma() {
    if (this.text.match(/,$/)) {
      return true;
    }
    return false;
  }
  has_abbreviation() {
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

  is_capital() {
    if (this.text.match(/[A-Z][a-z]/)) {
      return true;
    }
    return false;
  }
  //utility method to avoid lumping words with non-word stuff
  is_word() {
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
  is_acronym() {
    return is_acronym(this.text);
  }
  //working word
  normalize() {
    let str = this.text || '';
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

  all_forms() {
    return {};
  }

}
Term.fn = Term.prototype;

module.exports = Term;

},{"../match/match_term":58,"../match/syntax_parse":60,"./implied":102,"./is_acronym":103}],133:[function(require,module,exports){
//turn a verb into its other grammatical forms.
'use strict';
const verb_to_actor = require('./to_actor');
const to_infinitive = require('./to_infinitive');
const from_infinitive = require('./from_infinitive');
const irregular_verbs = require('../../../data/irregular_verbs');
const predict = require('./predict_form.js');
const generic = require('./generic.js');
const strip_prefix = require('./strip_prefix.js');
const fns = require('../../../fns.js');


//make sure object has all forms
const fufill = function(obj, prefix) {
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
    Object.keys(obj).forEach(function(k) {
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


const conjugate = function(w) {
  if (w === undefined) {
    return {};
  }

  //for phrasal verbs ('look out'), conjugate look, then append 'out'
  const phrasal_reg = new RegExp('^(.*?) (in|out|on|off|behind|way|with|of|away|across|ahead|back|over|under|together|apart|up|upon|aback|down|about|before|after|around|to|forth|round|through|along|onto)$', 'i');
  if (w.match(phrasal_reg)) {
    const split = w.match(phrasal_reg, '');
    const phrasal_verb = split[1];
    const particle = split[2];
    const result = conjugate(phrasal_verb); //recursive
    Object.keys(result).forEach(function(k) {
      if (result[k]) {
        result[k] += ' ' + particle;
      }
    });
    return result;
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
  let prefix = strip_prefix(w);
  w = w.replace(prefix, '');

  //guess the tense, so we know which transormation to make
  const predicted = predict(w) || 'infinitive';
  //check against suffix rules
  let infinitive = to_infinitive(w, predicted) || '';
  //check irregulars
  let obj = irregular_verbs[w] || irregular_verbs[infinitive] || {};
  obj = fns.extend({}, obj);
  //apply regex-transformations
  let conjugations = from_infinitive(infinitive);
  Object.keys(conjugations).forEach(function(k) {
    if (!obj[k]) {
      obj[k] = conjugations[k];
    }
  });
  return fufill(obj, prefix);
};
module.exports = conjugate;

// console.log(conjugate('played'));

},{"../../../data/irregular_verbs":42,"../../../fns.js":54,"./from_infinitive":134,"./generic.js":135,"./predict_form.js":136,"./strip_prefix.js":137,"./to_actor":139,"./to_infinitive":140}],134:[function(require,module,exports){
'use strict';

let rules = [
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
];

let keys = {
  pr: 'present',
  pa: 'past',
  gr: 'gerund',
  prt: 'participle',
  ar: 'actor',
};

const from_infinitive = function(str) {
  let obj = {
    infinitive: str
  };
  if (!str || typeof str !== 'string') {
    // console.log(str);
    return obj;
  }
  for(let i = 0; i < rules.length; i++) {
    if (str.match(rules[i].reg)) {
      // console.log(rules[i]);
      Object.keys(rules[i].repl).forEach(function(k) {
        obj[keys[k]] = str.replace(rules[i].reg, rules[i].repl[k]);
      });
      return obj;
    }
  }
  return obj;
};
// console.log(from_infinitive('watch'));

module.exports = from_infinitive;

},{}],135:[function(require,module,exports){
'use strict';
//non-specifc, 'hail-mary' transforms from infinitive, into other forms
const fns = require('../../../fns');
const generic = {

  gerund: (o) => {
    let inf = o.infinitive;
    if (fns.endsWith(inf, 'e')) {
      return inf.replace(/e$/, 'ing');
    }
    return inf + 'ing';
  },

  present: (o) => {
    let inf = o.infinitive;
    if (fns.endsWith(inf, 's')) {
      return inf + 'es';
    }
    if (fns.endsWith(inf, /[bcdfghjklmnpqrstvwxz]y$/)) {
      return inf.slice(0, -1) + 'ies';
    }
    return inf + 's';
  },

  past: (o) => {
    let inf = o.infinitive;
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

  future: (o) => {
    return 'will ' + o.infinitive;
  },

  perfect: (o) => {
    return 'have ' + (o.participle || o.past);
  },

  pluperfect: (o) => {
    return 'had ' + o.past;
  },

  future_perfect: (o) => {
    return 'will have ' + o.past;
  }

};

module.exports = generic;

},{"../../../fns":54}],136:[function(require,module,exports){
'use strict';
//this method is used to predict which current conjugation a verb is

//this method is the slowest in the whole library,
const fns = require('../../../fns.js');
const suffix_rules = require('./suffix_rules');
const irregular_verbs = require('../../../data/irregular_verbs');
let known_verbs = Object.keys(irregular_verbs).reduce(function(h, k) {
  Object.keys(irregular_verbs[k]).forEach(function(k2) {
    h[irregular_verbs[k][k2]] = k2;
  });
  return h;
}, {});

const predict = function(w) {

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

  const arr = Object.keys(suffix_rules);
  for (let i = 0; i < arr.length; i++) {
    if (fns.endsWith(w, arr[i]) && arr[i].length < w.length) {
      return suffix_rules[arr[i]];
    }
  }
  return 'infinitive';
};

module.exports = predict;

},{"../../../data/irregular_verbs":42,"../../../fns.js":54,"./suffix_rules":138}],137:[function(require,module,exports){
'use strict';
// 'over-kill' should use conjugation rules of 'kill', etc..

const strip_prefix = function(str) {
  let prefix = '';
  let match = str.match(/^(over|under|re|anti|full|cross)([- ])?([^aeiou][a-z]*)/i);
  if (match) {
    prefix = match[1] + (match[2] || '');
  }
  return prefix;
};

module.exports = strip_prefix;

},{}],138:[function(require,module,exports){
'use strict';
//suffix signals for verb tense, generated from test data
const compact = {
  'gerund': [
    'ing'
  ],
  'infinitive': [
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
    'eed',
    'er',
    'le'
  ],
  'participle': [
    'own',
    'unk',
    'ung',
    'en'
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

for (let i = 0; i < l; i++) {
  let l2 = compact[keys[i]].length;
  for (let o = 0; o < l2; o++) {
    suffix_rules[compact[keys[i]][o]] = keys[i];
  }
}
module.exports = suffix_rules;

},{}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
//turns a verb in any form, into it's infinitive version
// eg "walked" -> "walk"
'use strict';

const irregular_verbs = require('../../../data/irregular_verbs');
let known_verbs = Object.keys(irregular_verbs).reduce(function(h, k) {
  Object.keys(irregular_verbs[k]).forEach(function(k2) {
    h[irregular_verbs[k][k2]] = k;
  });
  return h;
}, {});


let rules = {
  participle: [
    {
      reg: /own$/i,
      to: 'ow'
    },
    {
      reg: /(.)un([g|k])$/i,
      to: '$1in$2'
    },
  // {
  //   reg: /(..)en$/i,
  //   to: '$1e'
  // },
  ],
  actor: [
    {
      reg: /(er)er$/i,
      to: '$1'
    }
  ],
  present: [
    {
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
  gerund: [
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
  past: [
    {
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

const to_infinitive = function (str, from_tense) {
  if (known_verbs.hasOwnProperty(str)) {
    return known_verbs[str];
  }
  if (from_tense === 'infinitive') {
    return str;
  }
  let regs = rules[from_tense] || [];
  for(let i = 0; i < regs.length; i++) {
    if (str.match(regs[i].reg)) {
      return str.replace(regs[i].reg, regs[i].to);
    }
  }
  return str;
};

// console.log(to_infinitive('played', 'past'));

module.exports = to_infinitive;

},{"../../../data/irregular_verbs":42}],141:[function(require,module,exports){
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
const to_adjective = function(str) {
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

module.exports = to_adjective;

},{}],142:[function(require,module,exports){
'use strict';
const Term = require('../term.js');
const conjugate = require('./conjugate/conjugate.js');
const negate = require('./verb_negate.js');
const to_adjective = require('./to_adjective.js');
const predict_form = require('./conjugate/predict_form.js');

const verbTags = {
  infinitive: 'Infinitive',
  present: 'PresentTense',
  past: 'PastTense',
  gerund: 'Gerund',
  actor: 'Actor',
  future: 'FutureTense',
  pluperfect: 'PluperfectTense',
  perfect: 'PerfectTense'
};

class Verb extends Term {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Verb'] = true;
    //if we've been told which
    if (tag) {
      this.pos[tag] = true;
    }
  }

  //'root' for a verb means infinitive
  root() {
    return this.conjugate().infinitive;
  }

  //retrieve a specific form
  conjugation() {
    //check cached conjugations
    let conjugations = this.conjugate();
    let keys = Object.keys(conjugations);
    for(let i = 0; i < keys.length; i++) {
      if (conjugations[keys[i]] === this.normal) {
        return verbTags[keys[i]];
      }
    }
    //try to guess
    return verbTags[predict_form(this.normal)];
  }
  tense() {
    //map conjugation onto past/present/future
    let tenses = {
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
    let c = this.conjugation();
    return tenses[c] || 'present';
  }

  conjugate() {
    return conjugate(this.normal);
  }
  to_past() {
    let tense = 'past';
    let conjugations = this.conjugate(this.normal);
    this.tag = verbTags[tense];
    this.changeTo(conjugations[tense]);
    return conjugations[tense];
  }
  to_present() {
    let tense = 'present';
    let conjugations = this.conjugate(this.normal);
    this.tag = verbTags[tense];
    this.changeTo(conjugations[tense]);
    return conjugations[tense];
  }
  to_future() {
    let tense = 'future';
    let conjugations = this.conjugate(this.normal);
    this.tag = verbTags[tense];
    this.changeTo(conjugations[tense]);
    return conjugations[tense];
  }
  to_adjective() {
    return to_adjective(this.conjugate().infinitive);
  }

  //is this verb negative already?
  isNegative() {
    const str = this.normal;
    //yep, pretty simple
    if (str.match(/(n't|\bnot\b)/)) {
      return true;
    }
    return false;
  }

  //turn 'walked' to "didn't walk"
  negate() {
    this.changeTo(negate(this));
    return this;
  }

  all_forms() {
    let forms = this.conjugate();
    forms['negated'] = negate(this);
    forms['normal'] = this.normal;
    return forms;
  }
}
Verb.fn = Verb.prototype;

module.exports = Verb;

//let v = new Verb('run');
//console.log(v.all_forms());

},{"../term.js":132,"./conjugate/conjugate.js":133,"./conjugate/predict_form.js":136,"./to_adjective.js":141,"./verb_negate.js":143}],143:[function(require,module,exports){
'use strict';
//recieves a verb object, and returns a negated string
//sort out don't/didn't/doesn't/won't
const fns = require('../../fns');

// logic:
// [past tense] - "sold" -> "didn't sell"
// [present] - "sells" -> "doesn't sell"
// [future] - "will sell" -> "won't sell"

const negate = function(v) {

  let known_negation = {
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
    'do': 'don\'t',
  };
  //hard-coded explicit forms
  if (known_negation[v.normal]) {
    return known_negation[v.normal];
  }
  //try to un-negate?  create corrollary
  let known_affirmation = fns.reverseObj(known_negation);
  if (known_affirmation[v.normal]) {
    return known_affirmation[v.normal];
  }

  //multiple-word verbs, like 'have walked'
  let words = v.normal.split(' ');
  if (words.length > 1 && words[1] === 'not') {
    return words[0];
  }
  if (words.length > 1 && known_negation[words[0]]) {
    return known_negation[words[0]] + ' ' + words.slice(1, words.length).join(' ');
  }
  let form = v.conjugation();
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

},{"../../fns":54}],144:[function(require,module,exports){
//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2015 MIT
'use strict';
let abbreviations = require('../data/abbreviations').abbreviations;
let fns = require('../fns');

const naiive_split = function(text) {
  //first, split by newline
  let splits = text.split(/(\n+)/);
  //split by period, question-mark, and exclamation-mark
  splits = splits.map(function(str) {
    return str.split(/(\S.+?[.!?])(?=\s+|$)/g);
  });
  return fns.flatten(splits);
};

const sentence_parser = function(text) {
  const sentences = [];
  //first do a greedy-split..
  let chunks = [];
  //ensure it 'smells like' a sentence
  if (!text || typeof text !== 'string' || !text.match(/\w/)) {
    return sentences;
  }
  // This was the splitter regex updated to fix quoted punctuation marks.
  // let splits = text.split(/(\S.+?[.\?!])(?=\s+|$|")/g);
  // todo: look for side effects in this regex replacement:
  let splits = naiive_split(text);
  //filter-out the grap ones
  for(let i = 0; i < splits.length; i++) {
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
  const acronym_reg = new RegExp('[ |\.][A-Z]\.? +?$', 'i');
  const elipses_reg = new RegExp('\\.\\.\\.* +?$');
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
// console.log(sentence_parser('hi John. He is good'));

},{"../data/abbreviations":32,"../fns":54}],145:[function(require,module,exports){
'use strict';
const sentence_parser = require('./sentence_parser.js');
// const Sentence = require('../sentence/sentence.js');
const Question = require('../sentence/question/question.js');
const Statement = require('../sentence/statement/statement.js');
const fns = require('../fns.js');

//a text object is a series of sentences, along with the generic methods for transforming them
class Text {
  constructor(str, options) {
    options = options || {};
    const the = this;
    if (typeof str === 'string') {
      this.raw_text = str;
    } else if (typeof str === 'number') {
      this.raw_text = '' + str;
    } else {
      this.raw_text = '';
    }
    //build-up sentence/statement methods
    this.sentences = sentence_parser(this.raw_text).map(function(s) {
      let last_char = s.slice(-1);
      if (last_char === '?') { //TODO:be smartr
        return new Question(s, options);
      }
      return new Statement(s, options);
    });

    this.contractions = {
      // he'd -> he would
      expand: function() {
        the.sentences = the.sentences.map(function(s) {
          return s.contractions.expand();
        });
        return the;
      },
      // he would -> he'd
      contract: function() {
        the.sentences = the.sentences.map(function(s) {
          return s.contractions.contract();
        });
        return the;
      }
    };
  }


  //map over sentence methods
  text() {
    const arr = this.sentences.map(function(s) {
      return s.text();
    });
    return fns.flatten(arr).join('');
  }
  normal() {
    const arr = this.sentences.map(function(s) {
      return s.normal();
    });
    return fns.flatten(arr).join(' ');
  }

  //further 'lemmatisation/inflection'
  root() {
    const arr = this.sentences.map(function(s) {
      return s.root();
    });
    return fns.flatten(arr).join(' ');
  }

  terms() {
    const arr = this.sentences.map(function(s) {
      return s.terms;
    });
    return fns.flatten(arr);
  }
  tags() {
    return this.sentences.map(function(s) {
      return s.tags();
    });
  }

  //a regex-like lookup for a sentence.
  // returns an array of terms
  match(str, options) {
    let arr = [];
    for(let i = 0; i < this.sentences.length; i++) {
      arr = arr.concat(this.sentences[i].match(str, options));
    }
    return arr;
  }
  replace(str, replacement, options) {
    for(let i = 0; i < this.sentences.length; i++) {
      this.sentences[i].replace(str, replacement, options);
    }
    return this;
  }

  //transformations
  to_past() {
    this.sentences = this.sentences.map(function(s) {
      return s.to_past();
    });
    return this;
  }
  to_present() {
    this.sentences = this.sentences.map(function(s) {
      return s.to_present();
    });
    return this;
  }
  to_future() {
    this.sentences = this.sentences.map(function(s) {
      return s.to_future();
    });
    return this;
  }
  negate() {
    this.sentences = this.sentences.map(function(s) {
      return s.negate();
    });
    return this;
  }


  //returns an array with elements from this.sentences[i].func()
  generate_arr(func) {
    let arr = [];
    for (let i = 0; i < this.sentences.length; i++) {
      arr = arr.concat(this.sentences[i][func]());
    }
    return arr;
  }

  //parts of speech
  nouns() {
    return this.generate_arr('nouns');
  }
  adjectives() {
    return this.generate_arr('adjectives');
  }
  verbs() {
    return this.generate_arr('verbs');
  }
  adverbs() {
    return this.generate_arr('adverbs');
  }

  //mining
  people() {
    return this.generate_arr('people');
  }
  places() {
    return this.generate_arr('places');
  }
  organizations() {
    return this.generate_arr('organizations');
  }
  dates() {
    return this.generate_arr('dates');
  }
  values() {
    return this.generate_arr('values');
  }

  //more generic named-entity recognition
  topics() {
    //consolodate topics across sentences
    let obj = {};
    for(let i = 0; i < this.sentences.length; i++) {
      let topics = this.sentences[i].topics();
      for(let o = 0; o < topics.length; o++) {
        if (obj[topics[o].text]) {
          obj[topics[o].text].count += topics[o].count;
        } else {
          obj[topics[o].text] = topics[o];
        }
      }
    }
    //sort by frequency
    let arr = Object.keys(obj).map((k) => obj[k]);
    return arr.sort((a, b) => {
      if (a.count > b.count) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  //'semantic' word-count, skips over implicit terms and things
  word_count() {
    let count = 0;
    for(let i = 0; i < this.sentences.length; i++) {
      count += this.sentences[i].word_count();
    }
    return count;
  }
}
Text.fn = Text.prototype;

module.exports = Text;

},{"../fns.js":54,"../sentence/question/question.js":88,"../sentence/statement/statement.js":94,"./sentence_parser.js":144}],146:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('==Adjective==', function(T) {

  T.test('to_adverb:', function(t) {
    [
      ['quick', 'quickly'],
      ['idle', 'idly'],
      ['dirty', null],
      ['fun', null],
      ['full', null],
      ['quixotic', 'quixotically'],
      ['cute', 'cutely'],
      ['good', 'well'],
      ['low', 'low']
    ].forEach(function (a) {
      var str = nlp.adjective(a[0]).to_adverb();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test(' to_superlative', function(t) {
    [
      ['quick', 'quickest'],
      ['friendly', 'friendliest'],
      ['caring', 'most caring'],
      ['fun', 'most fun'],
      ['full', 'fullest'],
      ['quixotic', 'most quixotic'],
      ['cute', 'cutest'],
    ].forEach(function (a) {
      var str = nlp.adjective(a[0]).to_superlative();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test(' to_comparative', function(t) {
    [
      ['quick', 'quicker'],
      ['friendly', 'friendlier'],
      ['caring', 'more caring'],
      ['fun', 'more fun'],
      ['full', 'fuller'],
      ['quixotic', 'more quixotic'],
      ['cute', 'cuter'],
    ].forEach(function (a) {
      var str = nlp.adjective(a[0]).to_comparative();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test(' to_noun', function(t) {
    [
      ['quick', 'quickness'],
      ['fancy', 'fanciness'],
      ['ferocious', 'ferociousness'],
      ['', ''],
      [' ', ''],
      ['clean', 'cleanliness'],
    ].forEach(function (a) {
      var str = nlp.adjective(a[0]).to_noun();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test(' conjugate', function(t) {
    var adv = nlp.adjective('nice');
    var o = adv.conjugate();
    str_test(o.comparative, 'nice', 'nicer', t);
    str_test(o.superlative, 'nice', 'nicest', t);
    str_test(o.adverb, 'nice', 'nicely', t);
    str_test(o.noun, 'nice', 'niceness', t);
    t.end();
  });

  T.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],147:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('==Adverb==', function(T) {

  T.test('to_adjective:', function(t) {
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
      var str = nlp.adverb(a[0]).to_adjective();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],148:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('.article():', function(t) {
  [
    ['duck', 'a'],
    ['eavesdropper', 'an'],
    ['alligator', 'an'],
    ['hour', 'an'],
    ['NDA', 'an'],
    ['F.B.I', 'an'],
    ['N.D.A.', 'an'],
    ['eulogy', 'a'],
    ['ukalele', 'a'],
  ].forEach(function (a) {
    var str = nlp.noun(a[0]).article();
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],149:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;


test('conditions:', function(t) {
  [
    ['if it is raining, the driveway is wet', 'the driveway is wet'],
    ['if it is raining, the driveway is wet, unless it is snowing', 'the driveway is wet'],
  ].forEach(function (a) {
    var str = nlp.sentence(a[0]).strip_conditions().text();
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],150:[function(require,module,exports){
var test = require('tape');
var str_test = require('./lib/fns').str_test;
var nlp = require('./lib/nlp');

test('conjugation:', function(t) {

  var test_conjugation = function(inf, o, form, original) {
    var msg = 'from ' + original + ' to ' + form + ':  [' + o[form] + '] -> [' + inf[form] + ']';
    t.equal(inf[form], o[form], msg);
  };

  [
    {
      'infinitive': 'convolute',
      'present': 'convolutes',
      'gerund': 'convoluting',
      'past': 'convoluted'
    }, {
      'present': 'presents',
      'gerund': 'presenting',
      'past': 'presented',
      'infinitive': 'present'
    }, {
      'present': 'angulates',
      'gerund': 'angulating',
      'past': 'angulated',
      'infinitive': 'angulate'
    }, {
      'present': 'conjures',
      'gerund': 'conjuring',
      'past': 'conjured',
      'infinitive': 'conjure'
    }, {
      'present': 'denounces',
      'gerund': 'denouncing',
      'past': 'denounced',
      'infinitive': 'denounce'
    }, {
      'present': 'watches',
      'gerund': 'watching',
      'past': 'watched',
      'infinitive': 'watch'
    }, {
      'present': 'tingles',
      'gerund': 'tingling',
      'past': 'tingled',
      'infinitive': 'tingle'
    }, {
      'present': 'mortises',
      'gerund': 'mortising',
      'past': 'mortised',
      'infinitive': 'mortise'
    }, {
      'present': 'disguises',
      'gerund': 'disguising',
      'past': 'disguised',
      'infinitive': 'disguise'
    }, {
      'infinitive': 'effect',
      'gerund': 'effecting',
      'past': 'effected',
      'present': 'effects'
    }, {
      'infinitive': 'want',
      'gerund': 'wanting',
      'past': 'wanted',
      'present': 'wants'
    }, {
      'infinitive': 'power',
      'gerund': 'powering',
      'past': 'powered',
      'present': 'powers'
    }, {
      'infinitive': 'overcompensate',
      'present': 'overcompensates',
      'past': 'overcompensated',
      'gerund': 'overcompensating'
    }, {
      'infinitive': 'ice',
      'present': 'ices',
      'past': 'iced',
      'gerund': 'icing'
    }, {
      'infinitive': 'buy',
      'present': 'buys',
      'past': 'bought',
      'gerund': 'buying'
    }, {
      'infinitive': 'flower',
      'present': 'flowers',
      'past': 'flowered',
      'gerund': 'flowering'
    }, {
      'infinitive': 'rage',
      'present': 'rages',
      'past': 'raged',
      'gerund': 'raging'
    }, {
      'infinitive': 'drive',
      'present': 'drives',
      'past': 'drove',
      'gerund': 'driving'
    }, {
      'infinitive': 'foul',
      'present': 'fouls',
      'past': 'fouled',
      'gerund': 'fouling'
    }, {
      'infinitive': 'overthrow',
      'present': 'overthrows',
      'gerund': 'overthrowing',
      'past': 'overthrew'
    }, {
      'infinitive': 'aim',
      'present': 'aims',
      'past': 'aimed',
      'gerund': 'aiming'
    }, {
      'present': 'unifies',
      'gerund': 'unifying',
      'past': 'unified',
      'infinitive': 'unify'
    }, {
      'present': 'addresses',
      'gerund': 'addressing',
      'past': 'addressed',
      'infinitive': 'address'
    }, {
      'infinitive': 'bumble',
      'present': 'bumbles',
      'past': 'bumbled',
      'gerund': 'bumbling'
    }, {
      'infinitive': 'snipe',
      'present': 'snipes',
      'past': 'sniped',
      'gerund': 'sniping'
    }, {
      'present': 'relishes',
      'gerund': 'relishing',
      'past': 'relished',
      'infinitive': 'relish'
    }, {
      'infinitive': 'lengthen',
      'gerund': 'lengthening',
      'past': 'lengthened',
      'present': 'lengthens'
    }, {
      'infinitive': 'farm',
      'present': 'farms',
      'past': 'farmed',
      'gerund': 'farming'
    }, {
      'infinitive': 'develop',
      'present': 'develops',
      'past': 'developed',
      'gerund': 'developing'
    }, {
      'infinitive': 'study',
      'present': 'studies',
      'past': 'studied',
      'gerund': 'studying'
    },
    {
      'infinitive': 'criticise',
      'present': 'criticises',
      'past': 'criticised',
      'gerund': 'criticising'
    }, {
      'infinitive': 'speak',
      'present': 'speaks',
      'past': 'spoke',
      'gerund': 'speaking',
      'perfect': 'have spoken',
      'pluperfect': 'had spoken',
      'future_perfect': 'will have spoken'
    }
  ].forEach(function(o) {
    var forms = ['infinitive', 'past', 'present', 'gerund'];
    for(var i = 0; i < forms.length; i++) {
      var original_form = forms[i];
      var inf = nlp.verb(o[original_form]).conjugate();
      test_conjugation(inf, o, 'infinitive', original_form);
      test_conjugation(inf, o, 'past', original_form);
      test_conjugation(inf, o, 'present', original_form);
      test_conjugation(inf, o, 'gerund', original_form);
    }
  });
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],151:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

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
    ].forEach(function (a) {
      var str = nlp.text(a[0]).contractions.expand().text();
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
    ].forEach(function (a) {
      var term = nlp.sentence(a[0]).terms[0];
      var msg = term.text + ' has pos ' + a[1];
      t.equal(term.pos[a[1]], true, msg);
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
      [`don't go`, ['do not', 'go']],
      // dont expand leading 'nt contraction
      [`mustn't go`, ['must not', 'go']],
      [`haven't gone`, ['have not', 'gone']],
      [`isn't going`, ['is not', 'going']],
      ['can\'t go', ['can not', 'go']],
      ['ain\'t going', ['is not', 'going']],
      ['won\'t go', ['will not', 'go']],

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

      [`don't`, ['do not']],
      [`do not`, ['do not']],
      [`dunno`, ['do not', 'know']],

      [`spencer's going`, ['spencer', 'is']],
      [`he's going`, ['he', 'is']],
    ].forEach(function (a) {
      var s = nlp.sentence(a[0]).contractions.expand();
      var got = [s.terms[0].normal];
      if (s.terms[1]) {
        got.push(s.terms[1].normal);
      }
      var msg = got.join(', ') + ' should be ' + a[1].join(',');
      t.deepEqual(got, a[1], msg);
    });
    t.end();
  });

  T.test('contract:', function(t) {
    [
      [`he is a hero`, `he's`],
      [`she is here`, `she's`],
      [`it is a hero`, `it's`],
      [`he would win`, `he'd`],
      [`they would win`, `they'd`],
      [`they have begun`, `they've`],
    ].forEach(function (a) {
      var term = nlp.sentence(a[0]).contractions.contract().terms[0];
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
    ].forEach(function (a) {
      var str = nlp.text(a[0]).text();
      str_test(str, a[0], a[0], t);
    });
    t.end();
  });

  T.test('supports whitespace:', function(t) {
    [
      ['We\'ve only just begun', 'We have only just begun'],
      ['We\'ve   only just begun', 'We have   only just begun']
    ].forEach(function (a) {
      var str = nlp.text(a[0]).contractions.expand().text();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],152:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;


test('date-parse :', function(t) {
  [
    ['june 5th 1999', [5, 5, 1999]],
    ['jun 5th 1999', [5, 5, 1999]],
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
    ['2012-2014', [null, null, 2012]],
    ['1997-1998', [null, null, 1997]],
    ['1998', [null, null, 1998]],
    ['1672', [null, null, 1672]],
    ['2015', [null, null, 2015]],
    ['january 5th 1998', [0, 5, 1998]],
    ['february 10th', [1, 10, null]],
    ['february 30th', [1, 30, null]],
    ['jan 1921', [0, null, 1921]],
    //invalid dates
    ['303rd of March 1969', [2, null, 1969]],
    ['4103', [null, null, null]],
    ['January 5th 4032', [0, 5, null]],
  ].forEach(function(a) {
    var data = nlp.date(a[0]).data;
    got = [data.month, data.day, data.year];
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

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],153:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var pos_test = require('./lib/fns').pos_test;

test('date-tag :', function(t) {
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
    'first to last day of 2008',
    'first to last day of september',
    // 'for 4 seconds',
    // 'for 4 minutes',
    // 'for 4 hours',
    // 'for 4 days',
    // 'for 4 weeks',
    // 'for 4 months',
    // 'for 4 years',
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
  ].forEach(function(str) {
    var terms = nlp.sentence(str).terms;
    pos_test(terms, ['Date'], t);
  });
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],154:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');

var garbage = [
  '',
  '  ',
  null,
  '\n\n',
  [],
  {},
];

var terms = [
  nlp.term,
  nlp.verb,
  nlp.noun,
  nlp.adverb,
  nlp.adjective,
  nlp.value,
  nlp.person,
  nlp.place,
  nlp.organization,
];
test('==Garbage tests==', function(T) {

  T.test('text() garbage:', function(t) {
    garbage.forEach(function (g) {
      var num = nlp.text(g).sentences.length;
      var msg = (typeof g) + 'text input';
      t.equal(num, 0, msg);
    });
    t.end();
  });

  T.test('sentence() garbage:', function(t) {
    garbage.forEach(function (g) {
      var num = nlp.sentence(g).terms.length;
      var msg = (typeof g) + ' sentence input';
      t.equal(num, 0, msg);
    });
    t.end();
  });

  T.test('term() garbage:', function(t) {
    garbage.forEach(function (g) {
      terms.forEach(function(term) {
        var str = term(g).normal;
        var msg = JSON.stringify(g) + ' term input';
        t.equal(str, '', msg);
      });
    });
    t.end();
  });

});

},{"./lib/nlp":157,"tape":1}],155:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var pos_test = require('./lib/fns').pos_test;

test('=Lexicon test=', function(T) {

  T.test('default lexicon:', function(t) {
    var lexicon = nlp.lexicon();
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
      var msg = 'lexicon has ' + a[0] + ' : ' + a[1] + ' (' + lexicon[a[0]] + ')';
      t.equal(lexicon[a[0]], a[1], msg);
    });
    t.end();
  });

  T.test('adjusted lexicon:', function(t) {
    //place new words
    nlp.lexicon({
      'paris': 'Person',
      'lkjj': 'Adjective',
      'donkey kong': 'City',
    });
    [
      ['paris is nice', ['Person', 'Copula', 'Adjective']],
      ['he is lkjj', ['Pronoun', 'Copula', 'Adjective']],
      ['donkey kong wins the award', ['City', 'Verb', 'Determiner', 'Noun']],
    ].forEach(function (a) {
      var terms = nlp.sentence(a[0]).terms;
      pos_test(terms, a[1], t);
    });

    //set gender from lexicon
    var terms = nlp.sentence('Kelly').terms;
    pos_test(terms, ['FemalePerson'], t);
    //set as male:
    nlp.lexicon({
      kelly: 'MalePerson'
    });
    terms = nlp.sentence('Kelly').terms;
    pos_test(terms, ['MalePerson'], t);
    //gender follows lumping
    terms = nlp.sentence('Kelly Gruber').terms;
    pos_test(terms, ['MalePerson'], t);

    t.end();
  });
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],156:[function(require,module,exports){
//helpers to make test output messages nicer
const str_test = function(got, input, output, t) {
  var msg = '\'' + input + '\' -> \'' + got + '\'';
  t.equal(got, output, msg);
  return;
};

const has_pos = function(terms, tags) {
  if (terms.length !== tags.length) {
    return false;
  }
  for(var i = 0; i < terms.length; i++) {
    if (!terms[i].pos[tags[i]]) {
      return false;
    }
  }
  return true;
};

const pos_test = function(terms, tags, t) {
  terms = terms || [];
  var str = '';
  var got = terms.map(function(term) {
    str += ' ' + term.text;
    return Object.keys(term.pos).join('|');
  }).join(', ');
  var msg = '"' + str.trim() + '" has tags [' + tags.join(',') + ']   (' + got + ')';
  t.equal(has_pos(terms, tags), true, msg);
  return;
};

const terms_test = function(terms, want, t, isText) {
  var str = '';
  var got = terms.map(function(term) {
    str += ' ' + term.text;
    if (isText) {
      return term.text;
    }
    return term.normal;
  });
  var msg = '"' + str + '"  got: [' + got.join(',') + ']  want: [' + want.join(',') + ']';
  t.deepEqual(got, want, msg);
};



module.exports = {
  str_test: str_test,
  pos_test: pos_test,
  terms_test: terms_test,
};

},{}],157:[function(require,module,exports){
var nlp;
if (typeof window !== undefined) {
  nlp = require('../../../src/index');
} else {
  nlp = window.nlp_compromise;
  alert('browser');
}
// var nlp = require('../../builds/nlp_compromise');
// var nlp = require('../../builds/nlp_compromise.min');

module.exports = nlp;

},{"../../../src/index":55}],158:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var pos_test = require('./lib/fns').pos_test;

test('lumper test:', function(t) {
  [
    ['John Baseball', ['Person']],
    ['John sr.', ['Person']],
    ['Dr. John', ['Person']],
    ['she said "dutch oven"', ['Person', 'PastTense', 'Quotation']],
    ['she said "huge dutch oven"', ['Person', 'PastTense', 'Quotation']],
    ['the Captain of Jamaica', ['Determiner', 'Noun']],
    ['joe will have walked', ['Person', 'Verb']],
    ['joe had walked', ['Person', 'Verb']],
  // ['joe had 5 books', ['Person', 'PastTense', 'Value']],
  // ['joe does walk', ['Person', 'PresentTense']],
  // ['joe doesn\'t walk', ['Person', 'PresentTense']],
  // ['joe does not walk', ['Person', 'PresentTense']],
  // ['joe does not walk quickly', ['Person', 'PresentTense', 'Adverb']],
  // ['joe does 5 books', ['Person', 'Verb', 'Value']],
  ].forEach(function (a) {
    var terms = nlp.sentence(a[0]).terms;
    pos_test(terms, a[1], t);
  });
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],159:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;


test('==Match ==', function(T) {

  T.test('term-match :', function(t) {
    [
      ['quick', 'quick', true],
      ['Quick', 'Quick', true],
      ['quick', 's', false],
      ['quick', '[Adjective]', true],
      ['quick', '[Noun]', false],
      ['quick', '(fun|nice|quick|cool)', true],
      ['quick', '(fun|nice|good)', false],
    ].forEach(function(a) {
      var term = nlp.sentence(a[0]).terms[0];
      var msg = a[0] + ' matches ' + a[1] + ' ' + a[2];
      t.equal(term.match(a[1]), a[2], msg);
    });
    t.end();
  });

  T.test('sentence-match:', function(t) {
    [
      ['the dog played', 'the dog', 'the dog'],
      ['the dog played', 'the dog played', 'the dog played'],
      ['the dog played', 'the [Noun]', 'the dog'],
      ['the dog played', 'the [Noun] played', 'the dog played'],
      ['the dog played', 'the cat played', ''],
      ['the dog played', 'the [Adjective] played', ''],
      ['the dog played', 'the (cat|dog|piano) played', 'the dog played'],
      ['the dog played', 'the (cat|piano) played', ''],
      ['the dog played', 'the . played', 'the dog played'],
      //optional
      ['the dog played', 'the dog quickly? played', 'the dog played'],
      ['the dog played', 'the dog [Adverb]? played', 'the dog played'],
      ['the dog quickly played', 'the dog [Adverb]? played', 'the dog quickly played'],
      ['the dog quickly played', 'the dog [Adverb] played', 'the dog quickly played'],
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
      [`if you don't mind`, `you don't mind`, `you don't mind`],
      [`if you don't mind`, `you don't care`, ``],
      [`if you don't mind`, `you don't`, `you don't`],
      [`if you don't mind`, `don't mind`, `don't mind`],
      [`if you didn't care`, `didn't`, `didn't`],
      // [`if you wouldn't care, i'll eat here`, `i'll eat`, `i'll eat`], //omg hard one

      [`don't go`, `do not`, `don't`],
      [`do not go`, `do not`, `do not`],
      [`i dunno`, `do not`, `dunno`],
      //bugs
      [`really remind me to buy`, '[Adverb]? [Infinitive] (me|us) (to|for)', `really remind me to`],

    ].forEach(function(a) {
      var matches = nlp.sentence(a[0]).match(a[1]);
      if (!matches) {
        t.equal(a[2], '', 'no-match: ' + a[0]);
      } else {
        str_test(matches[0].text(), a[0], a[2], t);
      }
    });
    t.end();
  });

});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],160:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('==Normalize==', function(T) {

  T.test('sentence():', function(t) {
    [
      ['he is good', 'he is good'],
      ['Jack and Jill went up the hill.', 'jack and jill went up the hill.'],
      ['Mr. Clinton did so.', 'mr clinton did so.'],
    ].forEach(function (a) {
      var str = nlp.sentence(a[0]).normal();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('text():', function(t) {
    [
      ['he is good', 'he is good'],
      ['Jack and Jill   went up the hill. She got  water.', 'jack and jill went up the hill. she got water.'],
    // ['Contains no fruit juice \n\n All rights reserved', 'contains no fruit juice. all rights reserved'],
    ].forEach(function (a) {
      var str = nlp.text(a[0]).normal();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],161:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');

test('passive-voice:', function(t) {
  [
    ['the drink was drank by me', true],
    ['baghdad was flooded by the river', true],
    ['My birthday was approaching by June 5th', false],
    ['Oh say can you see? By the dawn\'s early rise.', false],
  ].forEach(function (a) {
    var bool = nlp.sentence(a[0]).is_passive();
    var msg = a[0] + ' is passive';
    t.equal(bool, a[1], msg);
  });
  t.end();
});

},{"./lib/nlp":157,"tape":1}],162:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('==Person==', function(T) {

  T.test('honourific:', function(t) {
    [
      ['John Smith', null],
      ['dr. John Smith', 'dr'],
      ['John Smith jr.', 'jr'],
      ['John Jacob Smith', null],
      ['Jani K. Smith', null],
      ['asdfefs', null]
    ].forEach(function (a) {
      var str = nlp.person(a[0]).honourific;
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('firstName:', function(t) {
    [
      ['John Smith', 'John'],
      ['dr. John Smith', 'John'],
      ['Ann-Marie Smith-O\'Brien jr.', 'Ann-Marie'],
      ['John Jacob Smith-o\'brien', 'John'],
      ['Jani K. Smith', 'Jani'],
      ['Ann-Marie', 'Ann-Marie'],
      ['asdfefs', null]
    ].forEach(function (a) {
      var str = nlp.person(a[0]).firstName;
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('lastName:', function(t) {
    [
      ['John Smith', 'Smith'],
      ['dr. John Smith', 'Smith'],
      ['John Smith jr.', 'Smith'],
      ['John Jacob mcdonald-williams', 'McDonald-Williams'],
      ['Jani-Lee K. o\'brien-macneil', 'O\'Brien-MacNeil'],
    ].forEach(function (a) {
      var str = nlp.person(a[0]).lastName;
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('gender():', function(t) {
    [
      ['John Smith', 'Male'],
      ['dr. John Smith', 'Male'],
      ['Jane Doe', 'Female'],
      ['Jane', 'Female'],
      // ambiguous gender
      ['Jan Smith', null],
      ['Jan', null],
      //unknown name
      ['Jani K. Smith', 'Female'],
      ['Jani', null],
      ['asdfefs', null]
    ].forEach(function (a) {
      var str = nlp.person(a[0]).gender();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],163:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var terms_test = require('./lib/fns').terms_test;


test('phrasal-verbs:', function(t) {
  [
    [`he is really good`, ['he', 'is', 'really', 'good']],
    [`he is upset about it`, ['he', 'is', 'upset', 'about', 'it']],
    [`he will mess about with it`, ['he', 'will mess about', 'with', 'it']],

    [`come forward`, ['come forward']],
    [`come together`, ['come together']],
    [`come apart`, ['come apart']],

    [`frighten back`, ['frighten', 'back']],
    [`frighten away`, ['frighten away']],
  ].forEach(function (a) {
    var terms = nlp.sentence(a[0]).terms;
    terms_test(terms, a[1], t);
  });
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],164:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var terms_test = require('./lib/fns').terms_test;


test('==Pluck-terms==', function(T) {

  T.test('pluck-people :', function(t) {
    [
      ['Sally Daniels went to the park with Don Douglas', ['Sally Daniels', 'Don Douglas']],
      ['Then Sally went to the park with all her friends.', ['Sally']],
      ['Oh say can you see? By the dawn\'s early rise.', ['you']],
      ['All the base are belong to us.', []]
    ].forEach(function(a) {
      var terms = nlp.text(a[0]).people();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });

  T.test('pluck-places :', function(t) {
    [
      ['Toronto is the biggest city in Canada', ['Toronto', 'Canada']],
      ['Beijing China grows each year. It is usually sunny.', ['Beijing China']],
      ['How long is the flight from SFO to LAX? Both in the USA!', ['SFO', 'LAX?', 'USA!']],
      ['Oh say can you see? By the dawn\'s early rise.', []],
    ].forEach(function(a) {
      var terms = nlp.text(a[0]).places();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });

  T.test('pluck nouns :', function(t) {
    [
      ['Cat eats meat.', ['Cat', 'meat.']],
      ['Running, swimming, jumping.', []],
      ['John Doe ran the race', ['John Doe', 'race']],
    ].forEach(function(a) {
      var terms = nlp.sentence(a[0]).nouns();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });

  T.test('pluck-adjectives ', function(t) {
    [
      ['Nice dog is eating', ['Nice']],
      ['Beautiful, dirty, rich.', ['Beautiful,', 'dirty,', 'rich.']],
    ].forEach(function(a) {
      var terms = nlp.sentence(a[0]).adjectives();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });

  T.test('pluck verbs :', function(t) {
    [
      ['Cat eats meat.', ['eats']],
      ['Beijing China grows each year. It is usually sunny.', ['grows', 'is']],
      ['Running, swimming, jumping.', ['Running,', 'swimming,', 'jumping.']],
    ].forEach(function(a) {
      var terms = nlp.sentence(a[0]).verbs();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });

  T.test('pluck adverbs :', function(t) {
    [
      ['Eat gently, slowly.', ['gently,', 'slowly.']],
      ['John quickly ate the food', ['quickly']],
      ['all spectators immediately started cheering hard', ['immediately', 'hard']],
      ['walk softly and carry a big stick', ['softly']],
    ].forEach(function(a) {
      var terms = nlp.sentence(a[0]).adverbs();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });

  T.test('pluck dates :', function(t) {
    [
      ['Toronto is best in January', ['January']],
      ['My birthday is June 5th', ['June 5th']],
      ['Oh say can you see? By the dawn\'s early rise.', []],
    ].forEach(function(a) {
      var terms = nlp.sentence(a[0]).dates();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });

  T.test('pluck values :', function(t) {
    [
      // ['The 5 books in Toronto are best in January', ['5 books']],
      // ['My harddrive is 5 Gb', ['5 Gb']],
      ['he is seven', ['seven']],
      // ['add eight and five', ['eight', 'five']],
      ['My birthday is June 5th', []],
      ['Oh say can you see? By the dawn\'s early rise.', []],
    ].forEach(function(a) {
      var terms = nlp.sentence(a[0]).values();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });

  T.test('pluck organizations :', function(t) {
    [
      ['The 5 books in Toronto are best in January', []],
      ['My birthday is June 5th', []],
      ['Oh say can you see? By the dawn\'s early rise.', []],
      ['Google may purchase Cannabis Inc', ['Google', 'Cannabis Inc']],
    ].forEach(function(a) {
      var terms = nlp.sentence(a[0]).organizations();
      terms_test(terms, a[1], t, true);
    });
    t.end();
  });


});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],165:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('==Plurals==', function(T) {

  T.test('is_plural():', function(t) {
    [
      ['octopus', false],
      ['tree', false],
      ['trees', true],
      ['i', false],
      // ["we", true],
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
      ['she\'s', false],
    ].forEach(function (a) {
      var str = nlp.noun(a[0]).is_plural();
      str_test(str, a[0], a[1], t);
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
      ['mayors of chicago', 'mayor of chicago'],
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
      var str = nlp.noun(a[0]).singularize();
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
      ['mayor of chicago', 'mayors of chicago'],
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
      var str = nlp.noun(a[0]).pluralize();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],166:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('pronoun:', function(t) {
  [
    ['John', 'he'],
    ['John Smith', 'he'],
    ['Jane', 'she'],
    ['turtle', 'it'],
    ['turtles', 'they'],
    ['Toronto', 'it'],
    ['studying', 'it'],
    ['horses', 'they'],
    ['road bikes', 'they'],
    ['NHL goaltenders', 'they'],
    ['Tony Danza', 'he'],
    ['Tanya Danza', 'she'],
    ['Mrs. Tanya Danza', 'she'],
    ['John G. Fishermore Institute', 'it'],
    ['John Fisher & sons', 'it'],
  ].forEach(function (a) {
    var str = nlp.noun(a[0]).pronoun();
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],167:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('question-test :', function(t) {
  [
    ['which party was it?', 'which'],
    ['which day was it?', 'when'],
    ['but who did you go with?', 'who'],
    ['what time did you show up?', 'when'],
    [`why'd you come so early?`, 'why'],
    [`when'll you show up?`, 'when'],
    [`is it fun?`, 'yesNo'],
    [`was it fun?`, 'yesNo'],
    [`did you think it was fun?`, 'yesNo'],
  ].forEach(function(a) {
    var str = nlp.question(a[0]).form();
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],168:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

var all_quotations = function(s) {
  var str = '';
  for(var i = 0; i < s.terms.length; i++) {
    if (s.terms[i].pos.Quotation) {
      str += ' ' + s.terms[i].normal;
    }
  }
  return str.trim();
};

test('quotation test:', function(t) {
  [
    [`he is "really good"`, `really good`],
    [`he is "really good" i guess`, `really good`],
    [`he is "good" i guess`, `good`],
    [`he is "completely and utterly great" i guess`, `completely and utterly great`],
    [`“quote”`, `quote`],
    [`“quote is here”`, `quote is here`],
  ].forEach(function (a) {
    var str = all_quotations(nlp.sentence(a[0]));
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],169:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;


test('match-replace :', function(t) {
  [
    ['the dog played', 'the dog', 'the cat', 'the cat played'],
    ['the dog played', 'the [Noun]', 'the cat', 'the cat played'],
    ['the dog played', 'the (dog|hamster|pet-snake)', 'the cat', 'the cat played'],
    ['the boy and the girl', 'the [Noun]', 'the house', 'the house and the house'],
    ['the boy and the girl', 'the cat', 'the house', 'the boy and the girl'],
  ].forEach(function(a) {
    var str = nlp.sentence(a[0]).replace(a[1], a[2]).text();
    str_test(str, a[0], a[3], t);
  });
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],170:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;


test('root():', function(t) {
  //on term
  str_test(nlp.term('Joe').root(), '', 'joe', t);
  str_test(nlp.term('just-right').root(), '', 'just right', t);
  //on noun
  str_test(nlp.noun('camel').root(), '', 'camel', t);
  str_test(nlp.noun('camels').root(), '', 'camel', t);
  str_test(nlp.noun('4').root(), '', '4', t);
  str_test(nlp.noun('shadows').root(), '', 'shadow', t);
  //on verb
  str_test(nlp.verb('shadow').root(), '', 'shadow', t);
  str_test(nlp.verb('shadowed').root(), '', 'shadow', t);
  str_test(nlp.verb('shadowing').root(), '', 'shadow', t);
  str_test(nlp.verb('shadows').root(), '', 'shadow', t);
  //on person
  str_test(nlp.person('john smith').root(), '', 'john smith', t);
  str_test(nlp.person('john g. smith').root(), '', 'john g smith', t);
  str_test(nlp.person('mr. john g. smith-o\'reilly').root(), '', 'john g smith-o\'reilly', t);
  str_test(nlp.person('john g. m. smith').root(), '', 'john g m smith', t);
  str_test(nlp.person('Dr. John Smith-McDonald').root(), '', 'john smith-mcdonald', t);
  //on place
  str_test(nlp.place('Toronto').root(), '', 'toronto', t);
  str_test(nlp.place('Toronto, Canada').root(), '', 'toronto', t);
  str_test(nlp.place('Toronto Canada').root(), '', 'toronto', t);
  // nlp.place('Toronto, Ontario, Canada').root(), '', 'toronto',t);
  //on term
  str_test(nlp.text('Joe is 5.5 ft tall.').root(), '', 'joe is 5.5 ft tall', t);
  str_test(nlp.text('Joe is five ft tall.').root(), '', 'joe is 5 ft tall', t);
  str_test(nlp.text('Dr. Joe is cool.').root(), '', 'joe is cool', t);
  str_test(nlp.text('it is just-right').root(), '', 'it is just right', t);
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],171:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('==negation==', function(T) {

  T.test('negate:', function(t) {
    [
      //copula-sentences
      [`john is good`, `john isn't good`],
      [`they are good`, `they aren't good`],
      [`they will be good`, `they won't be good`],
      //different verb tenses
      [`he walks`, `he doesn't walk`],
      [`he walked`, `he didn't walk`],
      [`he has walked`, `he hasn't walked`],
      [`he will have walked`, `he won't have walked`],
      [`he is walking`, `he isn't walking`],
      //pronoun + infinitive
      [`i like running`, `i don't like running`],
      [`they swim`, `they don't swim`],
      [`we enjoy playing`, `we don't enjoy playing`],
      [`we don't swim`, `we do swim`],
      [`i don't care`, `i do care`],
      [`they don't care`, `they do care`],
      //does not, is not, are not, etc.
      [`apples are not bad`, `apples are bad`],
      [`he does not like it`, `he does like it`],
      [`have not died yet`, `have died yet`],
      //logical negations
      ['john always walks', 'john never walks'],
      ['john always walks quickly', 'john never walks quickly'],
      ['everybody walks quickly', 'nobody walks quickly'],
    ].forEach(function (a) {
      var str = nlp.statement(a[0]).negate().text();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('sentence un-negate:', function(t) {
    [
      //copula-sentences
      [`john isn't good`, `john is good`],
      [`they aren't good`, `they are good`],
      [`they won't be good`, `they will be good`],
      //different verb tenses
      // [`he walks`, `he doesn't walk`],
      // [`he walked`, `he didn't walk`],
      [`he didn't walk`, `he did walk`],
      [`he doesn't walk`, `he does walk`],

      [`he hasn't walked`, `he has walked`],
      [`he won't have walked`, `he will have walked`],
      [`he isn't walking`, `he is walking`],
      // //logical negations
      ['john always walks', 'john never walks'],
      ['john always walks quickly', 'john never walks quickly'],
      // ['everybody walks quickly', 'nobody walks quickly'],

    ].forEach(function (a) {
      var str = nlp.statement(a[0]).negate().text();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],172:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

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
    var num = nlp.text(a[0]).sentences.length;
    var msg = '"' + a[0] + '" ->  ' + num;
    t.equal(num, a[1], msg);
  });
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],173:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('sentence-terminator:', function(t) {
  [
    ['Tony is nice.', '.'],
    ['Tony is nice!', '!'],
    ['Is Tony is nice?', '?'],
    ['Tony is okay', '']
  ].forEach(function(a) {
    var str = nlp.text(a[0]).sentences[0].terminator();
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],174:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');



test('specific_noun :', function(t) {
  [
    ['five hundred feet', 'Value'],
    ['50 square feet', 'Value'],
    ['90 hertz', 'Value'],
    ['two books', 'Value'],
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
    var n = nlp.noun(a[0]);
    var msg = '';

    msg = '"' + a[0] + '" is_person: ' + a[1];
    t.equal(n.is_person(), (a[1] === 'Person'), msg);

    msg = '"' + a[0] + '" is_place: ' + a[1];
    t.equal(n.is_place(), (a[1] === 'Place'), msg);

    msg = '"' + a[0] + '" is_value: ' + a[1];
    t.equal(n.is_value(), (a[1] === 'Value'), msg);

    msg = '"' + a[0] + '" is_date: ' + a[1];
    t.equal(n.is_date(), (a[1] === 'Date'), msg);

    msg = '"' + a[0] + '" is_organization: ' + a[1];
    t.equal(n.is_organization(), (a[1] === 'Organization'), msg);

  });
  t.end();
});

},{"./lib/nlp":157,"tape":1}],175:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var pos_test = require('./lib/fns').pos_test;

test('=Tagger=', function(T) {

  T.test('pos-basic-tag:', function(t) {
    [
      ['John is pretty', ['Person', 'Copula', 'Adjective']],
      ['John was lofty', ['Person', 'Copula', 'Adjective']],
      ['John Smith was lofty', ['Person', 'Copula', 'Adjective']],
      ['asdfes was lofty', ['Noun', 'Copula', 'Adjective']],
      ['asdfes lksejfj was lofty', ['Noun', 'Copula', 'Adjective']],
      ['Spencer Kelly is in Canada', ['Person', 'Copula', 'Preposition', 'Place']],
      ['He is in Canada', ['Pronoun', 'Copula', 'Preposition', 'Place']],
      ['5 red roses', ['Value', 'Adjective', 'Noun']],
      // ['3 trains', ['Value', 'Noun']],
      // ['5 buses', ['Value', 'Noun']],
      //fancier stuff
      ['walk the walk', ['Verb', 'Determiner', 'Noun']],
      ['Peter the man', ['Person', 'Determiner', 'Noun']],
      ['book the flight', ['Verb', 'Determiner', 'Noun']],
      //slang, contractions
      ['u r nice', ['Pronoun', 'Copula', 'Adjective']],
      ['canadian bacon', ['Demonym', 'Noun']],
      ['canadian dollar', ['Currency']],
      //possessive rules
      ['bill lkjsdf\'s', ['Person']],
      ['bill lkjsdf\'s house', ['Person', 'Noun']],
      ['Bill Lkjsdf\'s house', ['Person', 'Noun']],
      ['Bill Lkjsdf\'s House', ['Person', 'Noun']],
      //question
      ['who is good?', ['Question', 'Copula', 'Adjective']],
      ['which is good?', ['Question', 'Copula', 'Adjective']],
      ['bacon which is good', ['Noun', 'Pronoun', 'Copula', 'Adjective']],
      ['bacon which really is good', ['Noun', 'Pronoun', 'Adverb', 'Copula', 'Adjective']],
      ['Douglas who really is good', ['Person', 'Pronoun', 'Adverb', 'Copula', 'Adjective']],
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
      ['John Swim', ['Person', 'Verb']],
      ['John, John', ['Person', 'Person']],
      ['John, you', ['Person', 'Pronoun']],
      ['John you', ['Person', 'Pronoun']],
      ['you John you', ['Pronoun', 'Person', 'Pronoun']],
      ['10 + 9', ['Value', 'Symbol', 'Value']],
      ['2 * 90 = 180', ['Value', 'Symbol', 'Value', 'Symbol', 'Value']],
      ['one - seventy-six', ['Value', 'Symbol', 'Value']],
    // ['',[]],
    // ['',[]],
    // ['',[]],
    ].forEach(function (a) {
      var terms = nlp.sentence(a[0]).terms;
      pos_test(terms, a[1], t);
    });
    t.end();
  });
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],176:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

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
    ['he does what he can to stop', 'he did what he could to stop', 'he will do what he can to stop'],
    ['goes to sleep', 'went to sleep', 'will go to sleep'],

    //grammatical-number
    // ['we do what we can to stop', 'we did what we could to stop', 'we will do what we can to stop'],

    //multi-sentence
    ['this is one sentence. This makes two now.', 'this was one sentence. This made two now.', 'this will be one sentence. This will make two now.'],

  //support negative
  // ['this isn\'t one sentence. This doesn\'t make two now.', 'this was not one sentence. This didn\'t make two now.', 'this won\'t be one sentence. This won\'t make two now.']
  ].forEach(function (a) {
    var s = nlp.text(a[0]);

    s.to_past();
    str_test(s.text(), a[0], a[1], t);

    s.to_future();
    str_test(s.text(), a[0], a[2], t);

    s.to_present();
    str_test(s.text(), a[0], a[0], t);

  });
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],177:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;


test('term negate:', function(t) {
  [
    ['is', 'isn\'t'],
    ['will', 'won\'t'],
    ['will be', 'won\'t be'],
    ['was', 'wasn\'t'],

    ['walks', 'doesn\'t walk'],
    ['walked', 'didn\'t walk'],
    ['walking', 'not walking'],
    ['walk', 'don\'t walk'],
    ['will walk', 'won\'t walk'],
    ['will have walked', 'won\'t have walked'],

    ['corrupted', 'didn\'t corrupt'],
    ['jumped', 'didn\'t jump'],
    ['stunk up', 'didn\'t stink up'],

    [`would study`, `wouldn't study`],
    [`could study`, `couldn't study`],
    [`should study`, `shouldn't study`],
  ].forEach(function(a) {
    var str = nlp.verb(a[0]).negate().normal;
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],178:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('topics:', function(t) {
  [
    ['James and Tony Hawk both live in Toronto. Tony Hawk is cool.', 'tony hawk'],
    ['I live Toronto. I think Toronto is cool.', 'toronto'],
    ['The EACD united in 1972. EACD must follow regulations.', 'eacd'],
    ['The Elkjsdflkjsdf sells hamburgers. I think the Elkjsdflkjsdf eats turky.', 'elkjsdflkjsdf'],
    ['Toronto\'s citizens love toronto!', 'toronto'],
  ].forEach(function (a) {
    var str = nlp.text(a[0]).topics()[0].text;
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],179:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('==Value==', function(T) {

  T.test('to_ordinal:', function(t) {
    [
      [11, '11th'],
      [5, '5th'],
      [22, '22nd'],
    ].forEach(function (a) {
      var str = nlp.value(a[0]).to_ordinal();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('number:', function(t) {
    [
      ['five hundred feet', 500],
      ['fifty square feet', 50],
      ['90 hertz', 90],
      ['5 six-ounce containers', 5],
      ['twelve 2-gram containers', 12],
      ['thirty-seven forever-21 stores', 37],
    ].forEach(function (a) {
      var str = nlp.value(a[0]).number;
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('unit:', function(t) {
    [
      ['five hundred feet', 'feet'],
      ['fifty hertz', 'hertz'],
      ['100 dollars', 'dollars'],
      ['$100', 'dollar'],
      ['¥2.5', 'yen'],
      ['€3,000,100', 'euro'],
      ['EUR 9.99', 'eur'],
      ['5 g', 'g'],
      ['3 grams', 'gram'],
      ['2 inches', 'inch'],
      ['2 in', 'in'],
      ['5 g sugar', 'g'],
      ['10 grams of sugar', 'gram'],
      ['fifty inches of snow', 'inch'],
    ].forEach(function (a) {
      var str = nlp.value(a[0]).unit;
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('measurement:', function(t) {
    [
      ['five hundred feet', 'Distance'],
      ['100 kilometers', 'Distance'],
      ['fifty hertz', 'Frequency'],
      ['59 thousand $', 'Money'],
      ['100 mb', 'Data'],
      ['50 руб', 'Money'],
      ['EUR 9.99', 'Money'],
      ['100 dollars', 'Money'],
      ['256 bitcoins', 'Money'],
    ].forEach(function (a) {
      var str = nlp.value(a[0]).measurement;
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('of_what:', function(t) {
    [
      ['nine kg', 'kg'],
      ['5 kg of copper', 'copper'],
      ['many of these stories', 'many of these stories'],
      ['room full of beautiful creatures', 'full of beautiful creatures'],
      ['boxes of bags of food', 'boxes of bags of food'],
      ['5 boxes of water', 'boxes of water'],
      ['6 of kids', 'kids'],
      ['10 kids', 'kids'],
      ['just nothing', 'just nothing'],
      ['EUR 77', 'eur'],
      ['kg', 'kg']
    ].forEach(function (a) {
      var str = nlp.value(a[0]).of_what;
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('to_text:', function(t) {
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
      var str = nlp.value(a[0]).textual();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });


  T.test('to_number:', function(t) {
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
      ['$12.03', 12.03],
      ['$12', 12],
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
      ['twenty first', 21],
      ['fifty ninth', 59],
      ['nine hundred fiftieth', 950],
      ['five thousand nine hundred fiftieth', 5950],
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
      ['1/2', 1 / 2],
      ['-1/5', -1 / 5],
      ['-1 1/10', -1 - 1 / 10],
      ['1 1/20', 1 + 1 / 20],
      ['1/2 million', 500000],
      ['1 1/2 million', 1500000],
      ['negative five', -5],
      ['negative hundred', -100],
      ['12:32', null],
      ['123-1231', null],
      ['seven eleven', null],
      ['ten-four', null],
      ['one seven', null],
      ['one ten', null],
      ['one twelve', null],
      ['one thirty', null],
      ['nine fifty', null],
      ['five six', null],
      ['nine seventy', null],
      ['nine two hundred', null],
      ['ten one', null],
      ['twelve one', null],
      ['seventy five two', null],
      ['two hundred three hundred', null],
      ['sixty fifteen hundred', null],
      ['one twenty', null],
      ['twenty five twenty', null],
    // ['', null],
    // [null, null],
    ].forEach(function (a) {
      var str = nlp.value(a[0]).number;
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],180:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;


test('verb-to-adjective:', function(t) {
  [
    ['walk', 'walkable'],
    ['sing', 'singable'],
    ['win', 'winnable'],
    ['convert', 'convertible'],
    ['see', 'visible'],
  ].forEach(function(a) {
    var str = nlp.verb(a[0]).to_adjective();
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],181:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

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
      var term = nlp.sentence(a[0]).terms[0];
      var msg = a[0] + ' is email: ' + a[1];
      t.equal(term.pos['Email'], a[1], msg);
    });
    t.end();
  });

  T.test('is-hashtag:', function(t) {
    [
      [`#lkjsdf`, true],
      [`#ll`, true],
      [`#22ll`, true],
      [`#_22ll`, true],
      [`#l`,],
      [`# l`,],
      [`l#l`,],
    ].forEach(function (a) {
      var term = nlp.sentence(a[0]).terms[0];
      var msg = a[0] + ' is hashtag: ' + a[1];
      t.equal(term.pos['HashTag'], a[1], msg);
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
      var term = nlp.sentence(a[0]).terms[0];
      var msg = a[0] + ' is url: ' + a[1];
      t.equal(term.pos['Url'], a[1], msg);
    });
    t.end();
  });

});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],182:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

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
      var str = nlp.sentence(a).text();
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
      var str = nlp.text(a).text();
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
      var str = nlp.text(a[0]).contractions.expand().text();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });


});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],183:[function(require,module,exports){
var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('==WordCount==', function(T) {

  T.test('sentence():', function(t) {
    [
      ['he is good', 3],
      ['jack and jill went up the hill.', 7],
      ['Mr. Clinton did so.', 3],
      ['Bill Clinton ate cheese.', 3],
      ['5kb of data.', 3],
      ['it was five hundred and seventy two.', 3],
    ].forEach(function (a) {
      var num = nlp.sentence(a[0]).word_count();
      str_test(num, a[0], a[1], t);
    });
    t.end();
  });

  T.test('text():', function(t) {
    [
      ['he is good', 3],
      ['jack and jill went up the hill. They got water.', 10],
      ['Mr. Clinton did so.', 3],
      ['Bill Clinton ate cheese.', 3],
      ['Bill Clinton went walking', 3],
      ['Bill Clinton will go walking', 3],
    ].forEach(function (a) {
      var num = nlp.text(a[0]).word_count();
      str_test(num, a[0], a[1], t);
    });
    t.end();
  });

});

},{"./lib/fns":156,"./lib/nlp":157,"tape":1}],184:[function(require,module,exports){

},{}],185:[function(require,module,exports){
;(function (exports) {
  'use strict'

  var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

  var PLUS = '+'.charCodeAt(0)
  var SLASH = '/'.charCodeAt(0)
  var NUMBER = '0'.charCodeAt(0)
  var LOWER = 'a'.charCodeAt(0)
  var UPPER = 'A'.charCodeAt(0)
  var PLUS_URL_SAFE = '-'.charCodeAt(0)
  var SLASH_URL_SAFE = '_'.charCodeAt(0)

  function decode (elt) {
    var code = elt.charCodeAt(0)
    if (code === PLUS || code === PLUS_URL_SAFE) return 62 // '+'
    if (code === SLASH || code === SLASH_URL_SAFE) return 63 // '/'
    if (code < NUMBER) return -1 // no match
    if (code < NUMBER + 10) return code - NUMBER + 26 + 26
    if (code < UPPER + 26) return code - UPPER
    if (code < LOWER + 26) return code - LOWER + 26
  }

  function b64ToByteArray (b64) {
    var i, j, l, tmp, placeHolders, arr

    if (b64.length % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4')
    }

    // the number of equal signs (place holders)
    // if there are two placeholders, than the two characters before it
    // represent one byte
    // if there is only one, then the three characters before it represent 2 bytes
    // this is just a cheap hack to not do indexOf twice
    var len = b64.length
    placeHolders = b64.charAt(len - 2) === '=' ? 2 : b64.charAt(len - 1) === '=' ? 1 : 0

    // base64 is 4/3 + up to two characters of the original data
    arr = new Arr(b64.length * 3 / 4 - placeHolders)

    // if there are placeholders, only get up to the last complete 4 chars
    l = placeHolders > 0 ? b64.length - 4 : b64.length

    var L = 0

    function push (v) {
      arr[L++] = v
    }

    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
      push((tmp & 0xFF0000) >> 16)
      push((tmp & 0xFF00) >> 8)
      push(tmp & 0xFF)
    }

    if (placeHolders === 2) {
      tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
      push(tmp & 0xFF)
    } else if (placeHolders === 1) {
      tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
      push((tmp >> 8) & 0xFF)
      push(tmp & 0xFF)
    }

    return arr
  }

  function uint8ToBase64 (uint8) {
    var i
    var extraBytes = uint8.length % 3 // if we have 1 byte left, pad 2 bytes
    var output = ''
    var temp, length

    function encode (num) {
      return lookup.charAt(num)
    }

    function tripletToBase64 (num) {
      return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
    }

    // go through the array every three bytes, we'll deal with trailing stuff later
    for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
      temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
      output += tripletToBase64(temp)
    }

    // pad the end with zeros, but make sure to not forget the extra bytes
    switch (extraBytes) {
      case 1:
        temp = uint8[uint8.length - 1]
        output += encode(temp >> 2)
        output += encode((temp << 4) & 0x3F)
        output += '=='
        break
      case 2:
        temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
        output += encode(temp >> 10)
        output += encode((temp >> 4) & 0x3F)
        output += encode((temp << 2) & 0x3F)
        output += '='
        break
      default:
        break
    }

    return output
  }

  exports.toByteArray = b64ToByteArray
  exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],186:[function(require,module,exports){
arguments[4][184][0].apply(exports,arguments)
},{"dup":184}],187:[function(require,module,exports){
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
Buffer.poolSize = 8192 // not used by this implementation

var rootParent = {}

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

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.foo = function () { return 42 }
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

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */
function Buffer (arg) {
  if (!(this instanceof Buffer)) {
    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
    if (arguments.length > 1) return new Buffer(arg, arguments[1])
    return new Buffer(arg)
  }

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    this.length = 0
    this.parent = undefined
  }

  // Common case.
  if (typeof arg === 'number') {
    return fromNumber(this, arg)
  }

  // Slightly less common case.
  if (typeof arg === 'string') {
    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
  }

  // Unusual.
  return fromObject(this, arg)
}

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function fromNumber (that, length) {
  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < length; i++) {
      that[i] = 0
    }
  }
  return that
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

  // Assumption: byteLength() return value is always < kMaxLength.
  var length = byteLength(string, encoding) | 0
  that = allocate(that, length)

  that.write(string, encoding)
  return that
}

function fromObject (that, object) {
  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

  if (isArray(object)) return fromArray(that, object)

  if (object == null) {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (typeof ArrayBuffer !== 'undefined') {
    if (object.buffer instanceof ArrayBuffer) {
      return fromTypedArray(that, object)
    }
    if (object instanceof ArrayBuffer) {
      return fromArrayBuffer(that, object)
    }
  }

  if (object.length) return fromArrayLike(that, object)

  return fromJsonObject(that, object)
}

function fromBuffer (that, buffer) {
  var length = checked(buffer.length) | 0
  that = allocate(that, length)
  buffer.copy(that, 0, 0, length)
  return that
}

function fromArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Duplicate of fromArray() to keep fromArray() monomorphic.
function fromTypedArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  // Truncating the elements is probably not what people expect from typed
  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
  // of the old Buffer constructor.
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(array)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromTypedArray(that, new Uint8Array(array))
  }
  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
// Returns a zero-length buffer for inputs that don't conform to the spec.
function fromJsonObject (that, object) {
  var array
  var length = 0

  if (object.type === 'Buffer' && isArray(object.data)) {
    array = object.data
    length = checked(array.length) | 0
  }
  that = allocate(that, length)

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
} else {
  // pre-set for values that may exist in the future
  Buffer.prototype.length = undefined
  Buffer.prototype.parent = undefined
}

function allocate (that, length) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that.length = length
  }

  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
  if (fromPool) that.parent = rootParent

  return that
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (subject, encoding) {
  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

  var buf = new Buffer(subject, encoding)
  delete buf.parent
  return buf
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

  var i = 0
  var len = Math.min(x, y)
  while (i < len) {
    if (a[i] !== b[i]) break

    ++i
  }

  if (i !== len) {
    x = a[i]
    y = b[i]
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
    case 'binary':
    case 'base64':
    case 'raw':
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
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; i++) {
      length += list[i].length
    }
  }

  var buf = new Buffer(length)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

function byteLength (string, encoding) {
  if (typeof string !== 'string') string = '' + string

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'binary':
      // Deprecated
      case 'raw':
      case 'raws':
        return len
      case 'utf8':
      case 'utf-8':
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

  start = start | 0
  end = end === undefined || end === Infinity ? this.length : end | 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

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

Buffer.prototype.compare = function compare (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return 0
  return Buffer.compare(this, b)
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    if (val.length === 0) return -1 // special case: looking for empty string always fails
    return String.prototype.indexOf.call(this, val, byteOffset)
  }
  if (Buffer.isBuffer(val)) {
    return arrayIndexOf(this, val, byteOffset)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset)
  }

  function arrayIndexOf (arr, val, byteOffset) {
    var foundIndex = -1
    for (var i = 0; byteOffset + i < arr.length; i++) {
      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
      } else {
        foundIndex = -1
      }
    }
    return -1
  }

  throw new TypeError('val must be string, number or Buffer')
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
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) throw new Error('Invalid hex string')
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

function binaryWrite (buf, string, offset, length) {
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
    var swap = encoding
    encoding = offset
    offset = length | 0
    length = swap
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
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

      case 'binary':
        return binaryWrite(this, string, offset, length)

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

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
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
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  if (newBuf.length) newBuf.parent = this.parent || this

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
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

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
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

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
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
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
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
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
  var sub = value < 0 ? 1 : 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
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
  var sub = value < 0 ? 1 : 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
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
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
  if (offset < 0) throw new RangeError('index out of range')
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
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; i++) {
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

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new RangeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
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

  for (var i = 0; i < length; i++) {
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
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
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
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"base64-js":185,"ieee754":191,"isarray":188}],188:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],189:[function(require,module,exports){
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
},{"../../is-buffer/index.js":193}],190:[function(require,module,exports){
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
      }
      throw TypeError('Uncaught, unspecified "error" event.');
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

},{}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"dup":12}],193:[function(require,module,exports){
/**
 * Determine if an object is Buffer
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install is-buffer`
 */

module.exports = function (obj) {
  return !!(obj != null &&
    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
      (obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj))
    ))
}

},{}],194:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],195:[function(require,module,exports){
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
},{"_process":197}],196:[function(require,module,exports){
(function (process){
'use strict';

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn) {
  var args = new Array(arguments.length - 1);
  var i = 0;
  while (i < args.length) {
    args[i++] = arguments[i];
  }
  process.nextTick(function afterTick() {
    fn.apply(null, args);
  });
}

}).call(this,require('_process'))
},{"_process":197}],197:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
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
    var timeout = setTimeout(cleanUpNextTick);
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
    clearTimeout(timeout);
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
        setTimeout(drainQueue, 0);
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

},{}],198:[function(require,module,exports){
module.exports = require("./lib/_stream_duplex.js")

},{"./lib/_stream_duplex.js":199}],199:[function(require,module,exports){
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}
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
  if (!Duplex.prototype[method])
    Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex))
    return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false)
    this.readable = false;

  if (options && options.writable === false)
    this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false)
    this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended)
    return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

},{"./_stream_readable":201,"./_stream_writable":203,"core-util-is":189,"inherits":192,"process-nextick-args":196}],200:[function(require,module,exports){
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
  if (!(this instanceof PassThrough))
    return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function(chunk, encoding, cb) {
  cb(null, chunk);
};

},{"./_stream_transform":202,"core-util-is":189,"inherits":192}],201:[function(require,module,exports){
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
var Buffer = require('buffer').Buffer;
/*</replacement>*/

Readable.ReadableState = ReadableState;

var EE = require('events');

/*<replacement>*/
var EElistenerCount = function(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/



/*<replacement>*/
var Stream;
(function (){try{
  Stream = require('st' + 'ream');
}catch(_){}finally{
  if (!Stream)
    Stream = require('events').EventEmitter;
}}())
/*</replacement>*/

var Buffer = require('buffer').Buffer;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/



/*<replacement>*/
var debugUtil = require('util');
var debug;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var StringDecoder;

util.inherits(Readable, Stream);

var Duplex;
function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.buffer = [];
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
    if (!StringDecoder)
      StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

var Duplex;
function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable))
    return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options && typeof options.read === 'function')
    this._read = options.read;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function(chunk, encoding) {
  var state = this._readableState;

  if (!state.objectMode && typeof chunk === 'string') {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = new Buffer(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function(chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

Readable.prototype.isPaused = function() {
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
      var e = new Error('stream.unshift() after end event');
      stream.emit('error', e);
    } else {
      if (state.decoder && !addToFront && !encoding)
        chunk = state.decoder.write(chunk);

      if (!addToFront)
        state.reading = false;

      // if we want the data now, just emit it.
      if (state.flowing && state.length === 0 && !state.sync) {
        stream.emit('data', chunk);
        stream.read(0);
      } else {
        // update the buffer info.
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
          state.buffer.unshift(chunk);
        else
          state.buffer.push(chunk);

        if (state.needReadable)
          emitReadable(stream);
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
  return !state.ended &&
         (state.needReadable ||
          state.length < state.highWaterMark ||
          state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function(enc) {
  if (!StringDecoder)
    StringDecoder = require('string_decoder/').StringDecoder;
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
    // Get the next highest power of 2
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

function howMuchToRead(n, state) {
  if (state.length === 0 && state.ended)
    return 0;

  if (state.objectMode)
    return n === 0 ? 0 : 1;

  if (n === null || isNaN(n)) {
    // only flow one buffer at a time
    if (state.flowing && state.buffer.length)
      return state.buffer[0].length;
    else
      return state.length;
  }

  if (n <= 0)
    return 0;

  // If we're asking for more than the target buffer level,
  // then raise the water mark.  Bump up to the next highest
  // power of 2, to prevent increasing it excessively in tiny
  // amounts.
  if (n > state.highWaterMark)
    state.highWaterMark = computeNewHighWaterMark(n);

  // don't have that much.  return null, unless we've ended.
  if (n > state.length) {
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    } else {
      return state.length;
    }
  }

  return n;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function(n) {
  debug('read', n);
  var state = this._readableState;
  var nOrig = n;

  if (typeof n !== 'number' || n > 0)
    state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 &&
      state.needReadable &&
      (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended)
      endReadable(this);
    else
      emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0)
      endReadable(this);
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
  }

  if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0)
      state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
  }

  // If _read pushed data synchronously, then `reading` will be false,
  // and we need to re-evaluate how much data we can return to the user.
  if (doRead && !state.reading)
    n = howMuchToRead(nOrig, state);

  var ret;
  if (n > 0)
    ret = fromList(n, state);
  else
    ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  }

  state.length -= n;

  // If we have nothing in the buffer, then we want to know
  // as soon as we *do* get something into the buffer.
  if (state.length === 0 && !state.ended)
    state.needReadable = true;

  // If we tried to read() past the EOF, then emit end on the next tick.
  if (nOrig !== n && state.ended && state.length === 0)
    endReadable(this);

  if (ret !== null)
    this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!(Buffer.isBuffer(chunk)) &&
      typeof chunk !== 'string' &&
      chunk !== null &&
      chunk !== undefined &&
      !state.objectMode) {
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
    if (state.sync)
      processNextTick(emitReadable_, stream);
    else
      emitReadable_(stream);
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
  while (!state.reading && !state.flowing && !state.ended &&
         state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;
    else
      len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function(n) {
  this.emit('error', new Error('not implemented'));
};

Readable.prototype.pipe = function(dest, pipeOpts) {
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

  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
              dest !== process.stdout &&
              dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted)
    processNextTick(endFn);
  else
    src.once('end', endFn);

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
    if (state.awaitDrain &&
        (!dest._writableState || dest._writableState.needDrain))
      ondrain();
  }

  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    if (false === ret) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      if (state.pipesCount === 1 &&
          state.pipes[0] === dest &&
          src.listenerCount('data') === 1 &&
          !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
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
    if (EElistenerCount(dest, 'error') === 0)
      dest.emit('error', er);
  }
  // This is a brutally ugly hack to make sure that our error handler
  // is attached before any userland ones.  NEVER DO THIS.
  if (!dest._events || !dest._events.error)
    dest.on('error', onerror);
  else if (isArray(dest._events.error))
    dest._events.error.unshift(onerror);
  else
    dest._events.error = [onerror, dest._events.error];


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
  return function() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain)
      state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}


Readable.prototype.unpipe = function(dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0)
    return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes)
      return this;

    if (!dest)
      dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest)
      dest.emit('unpipe', this);
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

    for (var i = 0; i < len; i++)
      dests[i].emit('unpipe', this);
    return this;
  }

  // try to find the right one.
  var i = indexOf(state.pipes, dest);
  if (i === -1)
    return this;

  state.pipes.splice(i, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1)
    state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function(ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  // If listening to data, and it has not explicitly been paused,
  // then call resume to start the flow of data on the next tick.
  if (ev === 'data' && false !== this._readableState.flowing) {
    this.resume();
  }

  if (ev === 'readable' && this.readable) {
    var state = this._readableState;
    if (!state.readableListening) {
      state.readableListening = true;
      state.emittedReadable = false;
      state.needReadable = true;
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
Readable.prototype.resume = function() {
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
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading)
    stream.read(0);
}

Readable.prototype.pause = function() {
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
  if (state.flowing) {
    do {
      var chunk = stream.read();
    } while (null !== chunk && state.flowing);
  }
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function(stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function() {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length)
        self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function(chunk) {
    debug('wrapped data');
    if (state.decoder)
      chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined))
      return;
    else if (!state.objectMode && (!chunk || !chunk.length))
      return;

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
      this[i] = function(method) { return function() {
        return stream[method].apply(stream, arguments);
      }; }(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function(ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function(n) {
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
function fromList(n, state) {
  var list = state.buffer;
  var length = state.length;
  var stringMode = !!state.decoder;
  var objectMode = !!state.objectMode;
  var ret;

  // nothing in the list, definitely empty.
  if (list.length === 0)
    return null;

  if (length === 0)
    ret = null;
  else if (objectMode)
    ret = list.shift();
  else if (!n || n >= length) {
    // read it all, truncate the array.
    if (stringMode)
      ret = list.join('');
    else if (list.length === 1)
      ret = list[0];
    else
      ret = Buffer.concat(list, length);
    list.length = 0;
  } else {
    // read just some of it.
    if (n < list[0].length) {
      // just take a part of the first list item.
      // slice is the same for buffers and strings.
      var buf = list[0];
      ret = buf.slice(0, n);
      list[0] = buf.slice(n);
    } else if (n === list[0].length) {
      // first list is a perfect match
      ret = list.shift();
    } else {
      // complex case.
      // we have enough to cover it, but it spans past the first buffer.
      if (stringMode)
        ret = '';
      else
        ret = new Buffer(n);

      var c = 0;
      for (var i = 0, l = list.length; i < l && c < n; i++) {
        var buf = list[0];
        var cpy = Math.min(n - c, buf.length);

        if (stringMode)
          ret += buf.slice(0, cpy);
        else
          buf.copy(ret, c, 0, cpy);

        if (cpy < buf.length)
          list[0] = buf.slice(cpy);
        else
          list.shift();

        c += cpy;
      }
    }
  }

  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0)
    throw new Error('endReadable called on non-empty stream');

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

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf (xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

}).call(this,require('_process'))
},{"./_stream_duplex":199,"_process":197,"buffer":187,"core-util-is":189,"events":190,"inherits":192,"isarray":194,"process-nextick-args":196,"string_decoder/":209,"util":186}],202:[function(require,module,exports){
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
  this.afterTransform = function(er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb)
    return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined)
    stream.push(data);

  if (cb)
    cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}


function Transform(options) {
  if (!(this instanceof Transform))
    return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  // when the writable side finishes, then flush out anything remaining.
  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function')
      this._transform = options.transform;

    if (typeof options.flush === 'function')
      this._flush = options.flush;
  }

  this.once('prefinish', function() {
    if (typeof this._flush === 'function')
      this._flush(function(er) {
        done(stream, er);
      });
    else
      done(stream);
  });
}

Transform.prototype.push = function(chunk, encoding) {
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
Transform.prototype._transform = function(chunk, encoding, cb) {
  throw new Error('not implemented');
};

Transform.prototype._write = function(chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform ||
        rs.needReadable ||
        rs.length < rs.highWaterMark)
      this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function(n) {
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


function done(stream, er) {
  if (er)
    return stream.emit('error', er);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length)
    throw new Error('calling transform done when ws.length != 0');

  if (ts.transforming)
    throw new Error('calling transform done when still transforming');

  return stream.push(null);
}

},{"./_stream_duplex":199,"core-util-is":189,"inherits":192}],203:[function(require,module,exports){
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

module.exports = Writable;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/


/*<replacement>*/
var Buffer = require('buffer').Buffer;
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
(function (){try{
  Stream = require('st' + 'ream');
}catch(_){}finally{
  if (!Stream)
    Stream = require('events').EventEmitter;
}}())
/*</replacement>*/

var Buffer = require('buffer').Buffer;

util.inherits(Writable, Stream);

function nop() {}

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

var Duplex;
function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

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
  this.onwrite = function(er) {
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
}

WritableState.prototype.getBuffer = function writableStateGetBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function (){try {
Object.defineProperty(WritableState.prototype, 'buffer', {
  get: internalUtil.deprecate(function() {
    return this.getBuffer();
  }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' +
     'instead.')
});
}catch(_){}}());


var Duplex;
function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, though they're not
  // instanceof Writable, they're instanceof Readable.
  if (!(this instanceof Writable) && !(this instanceof Duplex))
    return new Writable(options);

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function')
      this._write = options.write;

    if (typeof options.writev === 'function')
      this._writev = options.writev;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function() {
  this.emit('error', new Error('Cannot pipe. Not readable.'));
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

  if (!(Buffer.isBuffer(chunk)) &&
      typeof chunk !== 'string' &&
      chunk !== null &&
      chunk !== undefined &&
      !state.objectMode) {
    var er = new TypeError('Invalid non-string/buffer chunk');
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function(chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (Buffer.isBuffer(chunk))
    encoding = 'buffer';
  else if (!encoding)
    encoding = state.defaultEncoding;

  if (typeof cb !== 'function')
    cb = nop;

  if (state.ended)
    writeAfterEnd(this, cb);
  else if (validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function() {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function() {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing &&
        !state.corked &&
        !state.finished &&
        !state.bufferProcessing &&
        state.bufferedRequest)
      clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string')
    encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64',
'ucs2', 'ucs-2','utf16le', 'utf-16le', 'raw']
.indexOf((encoding + '').toLowerCase()) > -1))
    throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode &&
      state.decodeStrings !== false &&
      typeof chunk === 'string') {
    chunk = new Buffer(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);

  if (Buffer.isBuffer(chunk))
    encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret)
    state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
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
  if (writev)
    stream._writev(chunk, state.onwrite);
  else
    stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync)
    processNextTick(cb, er);
  else
    cb(er);

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

  if (er)
    onwriteError(stream, state, sync, er, cb);
  else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished &&
        !state.corked &&
        !state.bufferProcessing &&
        state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      processNextTick(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished)
    onwriteDrain(stream, state);
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
    var buffer = [];
    var cbs = [];
    while (entry) {
      cbs.push(entry.callback);
      buffer.push(entry);
      entry = entry.next;
    }

    // count the one we are adding, as well.
    // TODO(isaacs) clean this up
    state.pendingcb++;
    state.lastBufferedRequest = null;
    doWrite(stream, state, true, state.length, buffer, '', function(err) {
      for (var i = 0; i < cbs.length; i++) {
        state.pendingcb--;
        cbs[i](err);
      }
    });

    // Clear buffer
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

    if (entry === null)
      state.lastBufferedRequest = null;
  }
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function(chunk, encoding, cb) {
  cb(new Error('not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function(chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined)
    this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished)
    endWritable(this, state, cb);
};


function needFinish(state) {
  return (state.ending &&
          state.length === 0 &&
          state.bufferedRequest === null &&
          !state.finished &&
          !state.writing);
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
    if (state.finished)
      processNextTick(cb);
    else
      stream.once('finish', cb);
  }
  state.ended = true;
}

},{"./_stream_duplex":199,"buffer":187,"core-util-is":189,"events":190,"inherits":192,"process-nextick-args":196,"util-deprecate":210}],204:[function(require,module,exports){
module.exports = require("./lib/_stream_passthrough.js")

},{"./lib/_stream_passthrough.js":200}],205:[function(require,module,exports){
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

},{"./lib/_stream_duplex.js":199,"./lib/_stream_passthrough.js":200,"./lib/_stream_readable.js":201,"./lib/_stream_transform.js":202,"./lib/_stream_writable.js":203}],206:[function(require,module,exports){
module.exports = require("./lib/_stream_transform.js")

},{"./lib/_stream_transform.js":202}],207:[function(require,module,exports){
module.exports = require("./lib/_stream_writable.js")

},{"./lib/_stream_writable.js":203}],208:[function(require,module,exports){
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

},{"events":190,"inherits":192,"readable-stream/duplex.js":198,"readable-stream/passthrough.js":204,"readable-stream/readable.js":205,"readable-stream/transform.js":206,"readable-stream/writable.js":207}],209:[function(require,module,exports){
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

},{"buffer":187}],210:[function(require,module,exports){
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
},{}]},{},[146,147,148,149,150,151,152,153,154,155,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183]);
