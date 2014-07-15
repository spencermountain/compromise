// oj
// ===================================================================
// Unified templating for the people. Thirsty people.

;(function(){

  var root = this,
    ArrP = Array.prototype,
    FunP = Function.prototype,
    ObjP = Object.prototype,
    slice = ArrP.slice,
    unshift = ArrP.unshift,
    concat = ArrP.concat,
    pass = function(v){return v},
    _udf = 'undefined'

  // oj function: highest level of capture for tag functions
  function oj(){
    return oj.tag.apply(this, ['oj'].concat(slice.call(arguments)).concat([{__quiet__:1}]))
  };

  oj.version = '0.2.1'

  oj.isClient = !(typeof process !== "undefined" && process !== null ? process.versions != null ? process.versions.node : 0 : 0)

  // Detect jQuery globally or in required module
  if (typeof $ != _udf)
    oj.$ = $
  else if (typeof require != _udf)
    try {
      oj.$ = require('jquery')
    } catch (e){}

  // Export as a module in node
  if (typeof require != _udf)
    module.exports = oj
  // Export globally if not in node
  else
    root['oj'] = oj

  // Reference ourselves for template files to see
  oj.oj = oj

  // oj.load: load the page specified generating necessary html, css, and client side events
  oj.load = function(page){
    // Defer dom manipulation until the page is ready
    return oj.$(function(){
      oj.$.ojBody(require(page))

      // Trigger events bound through onload
      return oj.onload()
    });
  };

  // oj.onload: Enlist in onload action or run them.
  var _onLoadQueue = {queue: [], loaded: false}
  oj.onload = function(f){
    // Call everything if no arguments
    if (oj.isUndefined(f)){
      _onLoadQueue.loaded = true
      while ((f = _onLoadQueue.queue.shift()))
        f()
    }
    // Call load if already loaded
    else if (_onLoadQueue.loaded)
      f()
    // Queue function for later
    else
      _onLoadQueue.queue.push(f)
  }

  // oj.emit: Used by plugins to group multiple elements as if it is a single tag.
  oj.emit = function(){return oj.tag.apply(oj, ['oj'].concat(slice.call(arguments)))}

  // Type Helpers
  oj.isDefined = function(a){return typeof a !== _udf}
  oj.isOJ = function(obj){return !!(obj != null ? obj.isOJ : void 0)}
  oj.isOJType = function(a){return oj.isOJ(a) && a.type === a}
  oj.isOJInstance = function(a){return oj.isOJ(a) && !oj.isOJType(a)}
  oj.isEvented = function(a){return !!(a && a.on && a.off && a.trigger)}
  oj.isDOM = function(a){return !!(a && (a.nodeType != null))}
  oj.isDOMElement = function(a){return !!(a && a.nodeType === 1)}
  oj.isDOMAttribute = function(a){return !!(a && a.nodeType === 2)}
  oj.isDOMText = function(a){return !!(a && a.nodeType === 3)}
  oj.isjQuery = function(a){return !!(a && a.jquery)}
  oj.isUndefined = function(a){return a === void 0}
  oj.isBoolean = function(a){return a === true || a === false || ObjP.toString.call(a) === '[object Boolean]'}
  oj.isNumber = function(a){return !!(a === 0 || (a && a.toExponential && a.toFixed))}
  oj.isString = function(a){return !!(a === '' || (a && a.charCodeAt && a.substr))}
  oj.isDate = function(a){return !!(a && a.getTimezoneOffset && a.setUTCFullYear)}
  oj.isPlainObject = function(a){return oj.$.isPlainObject(a) && !oj.isOJ(a)}
  oj.isFunction = oj.$.isFunction
  oj.isArray = oj.$.isArray
  oj.isRegEx = function(a){return ObjP.toString.call(a) === '[object RegExp]'}
  oj.isArguments = function(a){return ObjP.toString.call(a) === '[object Arguments]'}
  oj.parse = function(str){
    var n, o = str
    if (str === _udf)
      o = void 0
    else if (str === 'null')
      o = null
    else if (str === 'true')
      o = true
    else if (str === 'false')
      o = false
    else if (!isNaN(n = parseFloat(str)))
      o = n
    return o;
  };

  // unionArguments: Union arguments into options and args
  oj.unionArguments = function(argList){
    var options = {}, args = [], v, ix = 0
    for (; ix < argList.length; ix++){
      v = argList[ix]
      if (oj.isPlainObject(v))
        options = _extend(options, v)
      else
        args.push(v)
    }
    return {options: options, args: args}
  }

  // argumentShift: Shift argument out of options with key
  oj.argumentShift = function(options, key){
    var value
    if ((oj.isPlainObject(options)) && (key != null) && (options[key] != null)){
      value = options[key]
      delete options[key]
    }
    return value
  };

  // Utility Helpers
  var _keys = Object.keys,
    _extend = oj.$.extend

  function _isCapitalLetter(c){return !!(c.match(/[A-Z]/));};

  function _has(obj, key){return ObjP.hasOwnProperty.call(obj, key)}

  function _values(obj){
    var keys = _keys(obj),
      len = keys.length,
      values = new Array(len),
      i = 0
    for (; i < len; i++)
      values[i] = obj[keys[i]]
    return values
  }

  function _toArray(obj){
    if (!obj)
      return []
    if (oj.isArray(obj))
      return slice.call(obj)
    if (oj.isArguments(obj))
      return slice.call(obj)
    if (obj.toArray && oj.isFunction(obj.toArray))
      return obj.toArray()
    return _values(obj)
  }

  function _isEmpty(o){
    if (oj.isArray(o))
      return o.length === 0
    for (var k in o)
      if (_has(o, k))
        return false
    return true
  };

  function _clone(o){
    if (!(oj.isArray(o) || oj.isPlainObject(o)))
      return o
    if (oj.isArray(o))
      return o.slice()
    else
      return _extend({}, o)
  }

  // _setObject(obj, k1, k2, ..., value):
  // Set object deeply key by key ensure each part is an object
  function _setObject(obj){
    var args = arguments,
      o = obj,
      len = args.length,
      // keys are args ix: 1 to n-2
      keys = 3 <= len ? slice.call(args, 1, len = len - 1) : (len = 1, []),
      // value is last arg
      value = args[len++],
      ix, k

    for (ix = 0; ix < keys.length; ix++){
      k = keys[ix]

      // Initialize key to empty object if necessary
      if (typeof o[k] !== 'object')
        o[k] = {}

      // Set final value if this is the last key
      if (ix === keys.length - 1)
        o[k] = value
      else
        // Continue deeper
        o = o[k]
    }
    return obj
  };

  // uniqueSort:
  function uniqueSort(arr, isSorted){
    if (isSorted == null)
      isSorted = false

    if (!isSorted)
      arr.sort()

    var out = [], ix, item
    for (ix = 0; ix < arr.length; ix++){
      item = arr[ix]
      if (ix > 0 && arr[ix - 1] === arr[ix])
        continue
      out.push(item)
    }
    return out
  };

  // _d(args...): initialization helper that returns first arg that isn't null
  function _d(){
    for (var ix = 0;ix < arguments.length; ix++)
      if (arguments[ix] != null)
        return arguments[ix]
    return null
  }

  // _e: error by throwing msg with optional fn name
  function _e(fn, msg){
    msg = _d(msg, fn, '')
    fn = _d(fn, 0)
    var pfx = "oj: "
    if (fn)
      pfx = "oj." + fn + ": "
    throw new Error(pfx + msg)
  }

  // _a: assert when cond is false with msg and with optional fn name
  function _a(cond, fn, msg){if (!cond) _e(fn,msg)}

  // _v: validate argument n with fn name and message
  function _v(fn, n, v, type){
    n = {1:'first',2:'second',3: 'third', 4: 'fourth'}[n]
    _a(!type || (typeof v === type), fn, "" + type + " expected for " + n + " argument")
  }

  // _splitAndTrim: Split string by seperator and trim result
  function _splitAndTrim(str, seperator, limit){
    return str.split(seperator, limit).map(function(v){
      return v.trim()
    })
  }

  // _decamelize: Convert from camal case to underscore case
  function _decamelize(str){return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()}

  // _dasherize: Convert from camal case or space seperated to dashes
  function _dasherize(str){return _decamelize(str).replace(/[ _]/g, '-')}

  // oj.addMethod: add multiple methods to an object
  oj.addMethods = function(obj, mapNameToMethod){
    for (var methodName in mapNameToMethod)
      oj.addMethod(obj, methodName, mapNameToMethod[methodName]);
  }

  // oj.addMethod: Add method to object with name and fn
  oj.addMethod = function(obj, name, fn){
    _v('addMethod', 2, name, 'string')
    _v('addMethod', 3, fn, 'function')
    // Methods are non-enumerable, non-writable properties
    Object.defineProperty(obj, name, {
      value: fn,
      enumerable: false,
      writable: false,
      configurable: true
    })
  }

  // oj.removeMethod: Remove a method with name from an object
  oj.removeMethod = function(obj, name){
    _v('removeMethod', 2, name, 'string');
    delete obj[name]
  };

  // oj.addProperties: add multiple properties to an object
  // Properties can be specified by get/set methods or by a value
  // Optionally you can include writable or enumerable settings
  oj.addProperties = function(obj, mapNameToInfo){

    // Iterate over properties
    var propInfo, propName;

    for (propName in mapNameToInfo){
      propInfo = mapNameToInfo[propName];

      // Wrap the value if propInfo is not already a prop definition
      if (((propInfo != null ? propInfo.get : void 0) == null) &&
          ((propInfo != null ? propInfo.value : void 0) == null))
        propInfo = {value: propInfo, writable: true}

      oj.addProperty(obj, propName, propInfo);
    }
  };

  // oj.addProperty: Add property to object with name and info
  oj.addProperty = function(obj, name, info){
    _v('addProperty', 2, name, 'string')
    _v('addProperty', 3, info, 'object')

    // Default properties to enumerable and configurable
    info = _extend({enumerable: true, configurable: true}, info)

    // Remove property if it already exists
    if (Object.getOwnPropertyDescriptor(obj, name) != null)
      oj.removeProperty(obj, name)

    // Add the property
    Object.defineProperty(obj, name, info)
  };

  // oj.removeProperty: remove property from object with name
  oj.removeProperty = function(obj, name){
    _v('removeProperty', 2, name, 'string')
    delete obj[name]
  }

  // oj.isProperty: Determine property in object is a get/set property
  oj.isProperty = function(obj, name){
    _v('isProperty', 2, name, 'string')
    return Object.getOwnPropertyDescriptor(obj, name).get != null
  };

  // oj.copyProperty: Copy source.propName to dest.propName
  oj.copyProperty = function(dest, source, propName){
    var info = Object.getOwnPropertyDescriptor(source, propName)
    if (info.value != null)
      info.value = _clone(info.value)
    return Object.defineProperty(dest, propName, info)
  }

  // _argsStack: Abstraction to wrap global arguments stack.
  // This makes me sad but it is necessary for div -> syntax
  var _argsStack = [];

  // Access the top of the stack
  oj._argsTop = function(){
    if (_argsStack.length)
      return _argsStack[_argsStack.length - 1]
    else
      return null
  }

  // Push scope onto arguments
  oj._argsPush = function(args){
    _argsStack.push(_d(args,[]))
  }

  // Pop scope from arguments
  oj._argsPop = function(){
    if (_argsStack.length)
      return _argsStack.pop()
    return null
  }

  // Append argument
  oj._argsAppend = function(arg){
    var top = oj._argsTop()
    if (top != null)
      top.push(arg)
  }

  // oj.tag (name, attributes, rest...)
  oj.tag = function(name){
    _v('tag', 1, name, 'string')

    var rest = 2 <= arguments.length ? slice.call(arguments, 1) : [],
      u = oj.unionArguments(rest),
      args = u.args,
      attributes = u.options,
      isQuiet = attributes.__quiet__,
      arg, len, r, ix,
      // Build ojml starting with tag
      ojml = [name]

    if (isQuiet)
      delete attributes.__quiet__;

    // Add attributes to ojml if they exist
    if (!_isEmpty(attributes))
      ojml.push(attributes);

    // Store current tag context
    oj._argsPush(ojml)

    // Loop over attributes
    for (ix = 0; ix < args.length; ix++){
      arg = args[ix]

      if (oj.isPlainObject(arg))
        continue

      else if (oj.isFunction(arg)){
        len = oj._argsTop().length

        // Call the fn tags will append to oj._argsTop
        r = arg()

        // Use return value instead if oj._argsTop didn't change
        if (len === oj._argsTop().length && (r != null))
          oj._argsAppend(r)

      } else
        oj._argsAppend(arg)
    }

    // Restore previous tag context
    oj._argsPop()

    // Append the final result to your parent's arguments
    // if there exists an argument to append to.
    // Do not emit when quiet is set,
    if (!isQuiet)
      oj._argsAppend(ojml)

    return ojml
  }

  // Define all elements as closed or open
  oj.tag.elements = {
    closed: 'a abbr acronym address applet article aside audio b bdo big blockquote body button canvas caption center cite code colgroup command datalist dd del details dfn dir div dl dt em embed fieldset figcaption figure font footer form frameset h1 h2 h3 h4 h5 h6 head header hgroup html i iframe ins keygen kbd label legend li map mark menu meter nav noframes noscript object ol optgroup option output p pre progress q rp rt ruby s samp script section select small source span strike strong style sub summary sup table tbody td textarea tfoot th thead time title tr tt u ul var video wbr xmp'.split(' '),
    open: 'area base br col command css !DOCTYPE embed hr img input keygen link meta param source track wbr'.split(' ')
  }

  // Keep track of all valid elements
  oj.tag.elements.all = (oj.tag.elements.closed.concat(oj.tag.elements.open)).sort()

  // tag.isClosed: Determine if an element is closed or open
  oj.tag.isClosed = function(tag){return oj.tag.elements.open.indexOf(tag) === -1}

  // _setTagName: Record tag name on a given tag function
  function _setTagName(tag, name){if (tag != null) tag.tagName = name }

  // _getTagName: Get a tag name on a given tag function
  function _getTagName(tag){return tag.tagName}

  // _getQuietTagName: Get quiet tag name
  function _getQuietTagName(tag){return '_' + tag}

  // _setInstanceOnElement: Record an oj instance on a given element
  function _setInstanceOnElement(el, inst){if (el != null) el.oj = inst}

  // _getInstanceOnElement: Get a oj instance on a given element
  function _getInstanceOnElement(el){
    if ((el != null ? el.oj : 0) != null)
      return el.oj
    else
      return null
  }

  // Create tag methods for all elements
  for (var ix = 0; ix < oj.tag.elements.all.length; ix++){
    t = oj.tag.elements.all[ix]
    ;(function(t){
      // Define tag function named t
      oj[t] = function(){return oj.tag.apply(oj, [t].concat(slice.call(arguments)))}

      // Quiet tag functions do not emit
      // Define quiet tag function named qt
      var qt = _getQuietTagName(t)
      oj[qt] = function(){return oj.tag.apply(oj, [t, {__quiet__: 1 }].concat(slice.call(arguments)))}

      // Tag functions remember their name so the OJML syntax can use the function
      _setTagName(oj[t], t)
      _setTagName(oj[qt], t)
    })(t)
  }

  // oj.doctype: Method to define doctypes based on short names

  var dhp = 'HTML PUBLIC "-//W3C//DTD HTML 4.01',
  w3 = '"http://www.w3.org/TR/html4/',
  strict5 = 'html',
  strict4 = dhp + '//EN" ' + w3 + 'strict.dtd"',
  _doctypes = {
    '5': strict5,
    'HTML 5': strict5,
    '4': strict4,
    'HTML 4.01 Strict': strict4,
    'HTML 4.01 Frameset': dhp + ' Frameset//EN" ' + w3 + 'frameset.dtd"',
    'HTML 4.01 Transitional': dhp + ' Transitional//EN" ' + w3 + 'loose.dtd"'
  }

  // Define the method passing through to !DOCTYPE tag function
  oj.doctype = function(typeOrValue){
    typeOrValue = _d(typeOrValue,'5')
    return oj['!DOCTYPE'](_d(_doctypes[typeOrValue], typeOrValue))
  };

  // oj.extendInto (context): Extend all OJ methods into a context.
  // Defaults to root, which is either `global` or `window`

  // Methods that start with _ are not extended
  oj.useGlobally = oj.extendInto = function(context){
    context = _d(context,root)

    var o = {}, k, qn, v;

    // For all keys and values in oj
    for (k in oj){
      v = oj[k]

      // Extend into new object
      if (k[0] !== '_' && k !== 'extendInto' && k !== 'useGlobally'){
        o[k] = v

        // Export _tag and _Type methods
        qn = _getQuietTagName(k)
        if (oj[qn])
          o[qn] = oj[qn]
      }
    }
    _extend(context, o)
  };

  // oj.compile(options, ojml)
  // ---
  // Compile ojml into meaningful parts
  // options:
  // * html - Compile to html
  // * dom - Compile to dom
  // * css - Compile to css
  // * cssMap - Record css as a javascript object
  // * styles -- Output css as style tags
  // * minify - Minify js and css
  // * ignore:{html:1} - Map of tags to ignore while compiling

  oj.compile = function(options, ojml){
    // Options is optional
    ojml = _d(ojml, options)

    var css, cssMap, dom, html,

    // Default options to compile everything
    options = _extend({html:1, dom:0, css:0, cssMap:0, minify:0, ignore:{}}, options),

    // Init accumulator
    acc = _clone(options)

    acc.html = options.html ? [] : null
    acc.dom = options.dom && (typeof document !== "undefined" && document !== null) ? document.createElement('OJ') : null
    acc.css = options.css || options.cssMap ? {} : null;
    acc.indent = ''

    // Accumulate insert events per element
    acc.inserts = []

    if (options.dom)
      acc.types = []

    acc.tags = {}

    // Always ignore oj and css tags
    _extend(options.ignore, {oj:1, css:1})

    // Recursive compile to accumulator
    _compileAny(ojml, acc)

    // Flatten CSS
    if (acc.css != null)
      cssMap = _flattenCSSMap(acc.css)

    // Generate css if necessary
    if (options.css)
      css = _cssFromPluginObject(cssMap, {minify: options.minify, tags: 0})

    // Output cssMap if necessary
    if (!options.cssMap)
      cssMap = undefined

    // Generate HTML if necessary
    if (options.html)
      html = acc.html.join('')

    // Generate dom if necessary
    if (options.dom){

      // Remove the <oj> wrapping from the dom element
      dom = acc.dom.childNodes;

      // Cleanup inconsistencies of childNodes
      if (dom.length != null){
        // Make dom a real array
        dom = _toArray(dom)

        // Filter out anything that isn't a dom element
        dom = dom.filter(function(v){return oj.isDOM(v)})
      }

      // Ensure dom is null if empty
      if (dom.length === 0)
        dom = null

      // Single elements are not returned as a list
      else if (dom.length === 1)
        // Reasoning: The common cases don't have multiple elements
        // <html>,<body>, etc and this is abstracted for you anyway
        // with jQuery plugins
        dom = dom[0]
    }
    return {
      html: html,
      dom: dom,
      css: css,
      cssMap: cssMap,
      types: acc.types,
      tags: acc.tags,
      inserts: acc.inserts
    }
  };

  // _styleFromObject: Convert object to style string
  function _styleFromObject(obj, options){
    options = _extend({
      inline: true,
      indent: ''
    }, options)

    // Trailing semi should only exist on when we aren't indenting
    options.semi = !options.inline;

    var out = "",

    // Sort keys to create consistent output
    keys = _keys(obj).sort(),

    // Support indention and inlining
    indent = options.indent != null ? options.indent : '',
    newline = options.inline ? '' : '\n',
    ix, k, kFancy, semi

    for (ix = 0; ix < keys.length; ix++){
      kFancy = keys[ix]

      // Add semi if it is not inline or it is not the last key
      semi = options.semi || ix !== keys.length - 1 ? ";" : ''

      // Allow keys to be camal case
      k = _dasherize(kFancy)

      // Collect css result for this key
      out += "" + indent + k + ":" + obj[kFancy] + semi + newline
    }
    return out
  };

  // _attributesFromObject: Convert object to attribute string with no special conversions
  function _attributesFromObject(obj){
    if (!oj.isPlainObject(obj))
      return obj

    // Pass through non objects
    var k, v, ix,
      out = '',
      space = '',
      // Serialize attributes in order for consistent output
      attrs = _keys(obj).sort()

    for (ix = 0; ix < attrs.length; ix++){
      k = attrs[ix]
      v = obj[k]

      // Boolean attributes have no value
      if (v === true)
        out += "" + space + k

      // Other attributes have a value
      else
        out += "" + space + k + "=\"" + v + "\""

      space = ' '
    }
    return out;
  };

  // _flattenCSSMap: Take an OJ cssMap and flatten it into the form
  // `'plugin' -> '@media query' -> 'selector' ->'rulesMap'`
  //
  // This method vastly simplifies `_cssFromPluginObject`
  // Nested, media, and comma definitions are resolved and merged
  function _flattenCSSMap(cssMap){
    var flatMap = {}, plugin, cssMap_
    for (plugin in cssMap){
      cssMap_ = cssMap[plugin]
      _flattenCSSMap_(cssMap_, flatMap, [''], [''], plugin)
    }
    return flatMap
  };

  // Recursive helper with accumulators (it outputs flatMapAcc)
  function _flattenCSSMap_(cssMap, flatMapAcc, selectorsAcc, mediasAcc, plugin){

    // Built in media helpers
    var acc, cur, inner, isMedia, mediaJoined, mediasNext, next, outer, parts, rules, selector, selectorJoined, selectorsNext, o, i,

    medias = {
      'widescreen': 'only screen and (min-width: 1200px)',
      'monitor': '',
      'tablet': 'only screen and (min-width: 768px) and (max-width: 959px)',
      'phone': 'only screen and (max-width: 767px)'
    };

    for (selector in cssMap){
      rules = cssMap[selector]

      // Base Case: Record our selector when `rules` is a value
      if (typeof rules !== 'object'){

        // Join selectors and media accumulators with commas
        selectorJoined = selectorsAcc.sort().join(',')
        mediaJoined = mediasAcc.sort().join(',')

        // Prepend @media as that was removed previously when spliting into parts
        if (mediaJoined !== '')
          mediaJoined = "@media " + mediaJoined

        // Record the rule deeply in `flatMapAcc`
        _setObject(flatMapAcc, plugin, mediaJoined, selectorJoined, selector, rules)
      // Recursive Case: Recurse on `rules` when it is an object
      } else {

        // (r1) Media Query found: Generate the next media queries
        if (selector.indexOf('@media') === 0){
          isMedia = true
          mediasNext = next = []
          selectorsNext = selectorsAcc
          selector = (selector.slice('@media'.length)).trim()
          acc = mediasAcc

        // (r2) Selector found: Generate the next selectors
        } else {
          isMedia = false
          selectorsNext = next = []
          mediasNext = mediasAcc
          acc = selectorsAcc
        }

        // Media queries and Selectors can be comma seperated
        parts = _splitAndTrim(selector, ',')

        // Media queries have convience substitutions like 'phone', 'tablet'
        if (isMedia){
          parts = parts.map(function(v){
            return _d(medias[v], v)
          });
        }

        // Determine the next selectors or media queries
        for (o = 0; o < acc.length; o++){
          outer = acc[o]

          for (i = 0; i < parts.length; i++){
            inner = parts[i]

            // When `&` is not present just insert in front with the correct join operator
            cur = inner
            if ((inner.indexOf('&')) === -1 && outer !== '')
              cur = (isMedia ? '& and ' : '& ') + cur;

            next.push(cur.replace(/&/g, outer));
          }
        }

        // Recurse through objects after calculating the next selectors
        _flattenCSSMap_(
          rules, flatMapAcc, selectorsNext, mediasNext, plugin
        );
      }
    }
  };

  // _styleClassFromPlugin: Abstract plugin <style> naming
  function _styleClassFromPlugin(plugin){return "" + plugin + "-style"}

  // _styleTagFromMediaObject: Abstract creating <style> tag
  oj._styleTagFromMediaObject = function(plugin, mediaMap, options){
    var newline = (options != null ? options.minify : void 0) ? '' : '\n',
      css = _cssFromMediaObject(mediaMap, options)
    return "<style class=\"" + (_styleClassFromPlugin(plugin)) + "\">" + newline + css + "</style>";
  }

  // _cssFromMediaObject: Convert css from a flattened mediaMap rule object.
  // The rule object is of the form:
  // mediaQuery => selector => rulesObject
  function _cssFromMediaObject(mediaMap, options){
    options = _d(options, {})

    var indent, indentRule, media, rules, selector, selectorMap, space, styles,

      minify = options.minify != null ? options.minify : 0,
      tags = options.tags != null ? options.tags : 0,

      // Deterine what output characters are needed
      newline = minify ? '' : '\n',
      space = minify ? '' : ' ',
      inline = minify,
      css = ''

    // Build css for media => selector =>  rules
    for (media in mediaMap){
      selectorMap = mediaMap[media];

      // Serialize media query
      if (media){
        media = media.replace(/,/g, "," + space);
        css += "" + media + space + "{" + newline;
      }

      for (selector in selectorMap){
        styles = selectorMap[selector]
        indent = (!minify) && media ? '\t' : ''

        // Serialize selector
        selector = selector.replace(/,/g, "," + newline)
        css += "" + indent + selector + space + "{" + newline

        // Serialize style rules
        indentRule = !minify ? indent + '\t' : indent
        rules = _styleFromObject(styles, {
          inline: inline,
          indent: indentRule
        });
        css += rules + indent + '}' + newline
      }

      // End media query
      if (media !== '')
        css += '}' + newline

    }
    try {
      css = oj._minifyCSS(css, options)
    } catch (e){
      throw new Error("css minification error: " + e.message + "\nCould not minify:\n" + css)
    }
    return css
  };

  // _cssFromPluginObject: Convert flattened css selectors and rules to a string
  // pluginMaps are of the form:
  // pluginName => mediaQuery => selector => rulesObject
  // minify:false will output newlines
  // tags:true will output the css in `<style>` tags

  function _cssFromPluginObject(flatCSSMap, options){
    options = _d(options, {})

    var mediaMap, plugin,
      minify = options.minify != null ? options.minify : 0,
      tags = options.tags != null ? options.tags : 0,
      // Deterine what output characters are needed
      newline = minify ? '' : '\n',
      space = minify ? '' : ' ',
      inline = minify,
      css = ''

    for (plugin in flatCSSMap){
      mediaMap = flatCSSMap[plugin]
      if (tags)
        css += "<style class=\"" + plugin + "-style\">" + newline

      // Serialize CSS with potential minification
      css += _cssFromMediaObject(mediaMap, options)
      if (tags)
        css += "" + newline + "</style>" + newline
    }
    return css
  };

  // _compileDeeper: Recursive helper for compiling that wraps indention
  function _compileDeeper(method, ojml, options){
    var i = options.indent
    options.indent += '\t'
    method(ojml, options)
    options.indent = i
  };

  // _compileAny Recursive helper for compiling ojml or any type
  function _compileAny(any, options){
    // Array
    if (oj.isArray(any))
      _compileTag(any, options)

    // String
    else if (oj.isString(any)){
      if (options.html != null)
        options.html.push(any)

      if (any.length > 0 && any[0] === '<'){
        var root = document.createElement('div')
        root.innerHTML = any;
        if (options.dom != null)
          options.dom.appendChild(root);
      } else {
        if (options.dom != null)
          options.dom.appendChild(document.createTextNode(any))
      }

    // Boolean or Number
    } else if (oj.isBoolean(any) || oj.isNumber(any)){
      if (options.html != null)
        options.html.push("" + any)

      if (options.dom != null)
        options.dom.appendChild(document.createTextNode("" + any));

    // Function
    } else if (oj.isFunction(any)){

      // Wrap function call to allow full oj generation within any
      _compileAny(oj(any), options);

    // Date
    } else if (oj.isDate(any)){
      if (options.html != null)
        options.html.push("" + (any.toLocaleString()));

      if (options.dom != null)
        options.dom.appendChild(document.createTextNode("" + (any.toLocaleString())));

    // OJ Type or Instance
    } else if (oj.isOJ(any)){
      if (options.types != null)
        options.types.push(any)

      if (options.html != null)
        options.html.push(any.toHTML(options))

      if (options.dom != null)
        options.dom.appendChild(any.toDOM(options))

      if (options.css != null)
        _extend(options.css, any.toCSSMap(options));
    }
    // Do nothing for: null, undefined, object
  };


  // _compileTag: Recursive helper for compiling ojml tags
  function _compileTag(ojml, options){

    // Empty list compiles to undefined
    if (ojml.length === 0) return

    // The first part of ojml is the tag
    var tag = ojml[0],
      tagType = typeof tag,
      u = oj.unionArguments(ojml.slice(1)),
      attributes = u.options,
      children = u.args,
      styles,
      selector

    // Allow the tag parameter to be 'table' (string) or oj.table (function) or oj.Table (object)
    if ((tagType === 'function' || tagType === 'object'))
      tag = _d(_getTagName(tag), tag)

    // Fail if no tag found
    if (!(oj.isString(tag) && tag.length > 0))
      _e('compile', 'tag name is missing')

    // Record tag as encountered
    options.tags[tag] = true

    // Instance oj object if tag is capitalized
    if (_isCapitalLetter(tag[0]))
      return _compileDeeper(_compileAny, new oj[tag](ojml.slice(1)), options)

    // Compile to css if requested
    if (options.css && tag === 'css'){

      // Extend options.css with rules
      for (selector in attributes){
        styles = attributes[selector]
        options.css['oj'] = _d(options.css['oj'], {})
        options.css['oj'][selector] = _d(options.css['oj'][selector], {})
        _extend(options.css['oj'][selector], styles);
      }
    }

    // Compile DOCTYPE as special case because it is not really an element
    // It has attributes with spaces and cannot be created by dom manipulation
    // In this way it is HTML generation only.

    if (tag === '!DOCTYPE'){
      _v('compile', 1, ojml[1], 'string');
      if (!options.ignore[tag]){
        if (options.html)
          options.html.push("<" + tag + " " + ojml[1] + ">")
        // options.dom is purposely ignored
      }
      return;
    }
    if (!options.ignore[tag]){
      var events = _attributesProcessedForOJ(attributes), el

      // Compile to dom if requested
      // Add dom element with attributes
      if (options.dom && (typeof document !== "undefined" && document !== null)){

        // Create element
        el = document.createElement(tag)

        // Add self to parent
        if (oj.isDOMElement(options.dom))
          options.dom.appendChild(el)

        // Push ourselves on the dom stack (to handle children)
        options.dom = el

        // Set attributes in sorted order for consistency
        if (oj.isPlainObject(attributes)){
          var keys = _keys(attributes).sort(), ix, attrName, attrValue
          for (ix = 0; ix < keys.length; ix++){
            attrName = keys[ix]
            attrValue = attributes[attrName]

            // Boolean attributes have no value
            if (attrValue === true)
              el.setAttributeNode(document.createAttribute(attrName))
            else
              el.setAttribute(attrName, attrValue)
          }
        }

        // Bind events
        _attributesBindEventsToDOM(events, el, options.inserts)
      }

      // Compile to html if requested
      // Add tag with attributes
      if (options.html){
        var attr = _d(_attributesFromObject(attributes), ''),
          space = attr === '' ? '' : ' '
        options.html.push("<" + tag + space + attr + ">")
        // Recurse through children if this tag isn't ignored deeply
      }
    }
    if (options.ignore[tag] !== 'deep'){
      for (ix = 0; ix < children.length; ix++){
        var child = children[ix]
        // Skip indention if there is only one child
        if (options.html != null && !options.minify && children.length > 1)
          options.html.push("\n\t" + options.indent)
        _compileDeeper(_compileAny, child, options)
      }
    }

    // Skip indention if there is only one child
    if (options.html != null && !options.minify && children.length > 1)
      options.html.push("\n" + options.indent)

    // End html tag if you have children or your tag closes
    if (!options.ignore[tag]){

      // Close tag if html
      if (options.html != null && (children.length > 0 || oj.tag.isClosed(tag)))
        options.html.push("</" + tag + ">")

      // Pop ourselves if dom
      if (options.dom)
        options.dom = options.dom.parentNode
    }
  };

  // _attributesProcessedForOJ: Process attributes to make them easier to use
  function _attributesProcessedForOJ(attr){
    var jqEvents = {bind:1, on:1, off:1, live:1, blur:1, change:1, click:1, dblclick:1, focus:1, focusin:1, focusout:1, hover:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseup:1, ready:1, resize:1, scroll:1, select:1, insert:1},
    events, k, v

    // Allow attributes to alias c to class and use arrays instead of space seperated strings
    // Convert to c and class from arrays to strings
    if (oj.isArray(attr != null ? attr.c : void 0))
      attr.c = attr.c.join(' ')

    if (oj.isArray(attr != null ? attr["class"] : void 0))
      attr["class"] = attr["class"].join(' ')

    // Move c to class
    if ((attr != null ? attr.c : void 0) != null){
      if ((attr != null ? attr["class"] : void 0) != null)
        attr["class"] += ' ' + attr.c
      else
        attr["class"] = attr.c
      delete attr.c
    }

    // Allow attributes to take style as an object
    if (oj.isPlainObject(attr != null ? attr.style : void 0)){
      attr.style = _styleFromObject(attr.style, {
        inline: true
      });
    }

    // Omit attributes with values of false, null, or undefined
    if (oj.isPlainObject(attr)){
      for (k in attr){
        v = attr[k]
        if (v === null || v === void 0 || v === false)
          delete attr[k]
      }
    }

    // Filter out jquery events
    events = {}
    if (oj.isPlainObject(attr)){

      // Filter out attributes that are jquery events
      for (k in attr){
        v = attr[k]

        // If this attribute (k) is an event
        if (jqEvents[k] != null){
          events[k] = v
          delete attr[k]
        }
      }
    }

    // Returns bindable events
    return events
  };

  // Bind events to dom
  function _attributesBindEventsToDOM(events, el, inserts){
    var ek, ev, _results = []
    for (ek in events){
      ev = events[ek]
      _a(oj.$ != null, "jquery is missing when binding a '" + ek + "' event")
      // accumulate insert events manually since DOMNodeInserted is slow and depreciated
      if (ek == 'insert' && inserts)
        inserts.push(function(){ev.call(el,el)})
      else if (oj.isArray(ev))
        _results.push(oj.$(el)[ek].apply(this, ev))
      else
        _results.push(oj.$(el)[ek](ev))
    }
    return _results
  };

  // oj.toHTML: Compile directly to HTML only
  oj.toHTML = function(options, ojml){

    // Options is optional
    if (!oj.isPlainObject(options)){
      ojml = options
      options = {}
    }

    // Create html only
    _extend(options, {dom: 0, js: 0, html: 1, css: 0})
    return (oj.compile(options, ojml)).html
  };

  // oj.toCSS: Compile directly to CSS only
  oj.toCSS = function(options, ojml){
    // Options is optional
    if (!oj.isPlain(options)){
      ojml = options
      options = {}
    }
    // Create css only
    _extend(options, {dom: 0, js: 0, html: 0, css: 1})
    return (oj.compile(options, ojml)).css
  };

  // _inherit: Inherit Child from Parent
  // Based on, but sadly incompatable with, coffeescript inheritance
  function _inherit(Child, Parent){
    var Ctor, prop

    // Copy class properties and methods
    for (prop in Parent)
      oj.copyProperty(Child, Parent, prop)

    Ctor = function(){};
    Ctor.prototype = Parent.prototype;
    Child.prototype = new Ctor()

    // Provide easy access for base class methods
    // Example: Parent.base.methodName(arguments...)
    Child.base = Child.__super__ = Parent.prototype
  };

  // _construct(Type, arg1, arg2, ...): Construct type as if using call
  function _construct(Type){return new (FunP.bind.apply(Type, arguments))};

  // oj.createType: Create OJ type with args object supporting:
  // base, constructor, properties, and methods
  oj.createType = function(name, args){

    args = _d(args, {})
    args.methods = _d(args.methods, {})
    args.properties = _d(args.properties, {})

    _v('createType', 1, name, 'string');
    _v('createType', 2, args, 'object');

    var methodKeys, propKeys, typeProps,

      // When auto newing you need to delay construct the properties
      // or they will be constructed twice.
      delay = '__DELAYED__',

      // Constructor to return
      Out = new Function("return function " + name + "(){\n  var _t = this;\n  if ( !(this instanceof " + name + ") ){\n    _t = new " + name + "('" + delay + "');\n    _t.__autonew__ = true;\n  }\n\n  if (arguments && arguments[0] != '" + delay + "')\n    " + name + ".prototype.constructor.apply(_t, arguments);\n\n  return _t;\n}")()

    // Default the constructor to call its base
    if (args.base != null && (args.constructor == null || (!args.hasOwnProperty('constructor')))){
      args.constructor = function(){
        return Out.base != null ?  Out.base.constructor.apply(this, arguments) : void 0
      }
    }

    // Inherit if necessary
    if (args.base != null)
      _inherit(Out, args.base)

    // Add the constructor as a method
    oj.addMethod(Out.prototype, 'constructor', args.constructor)

    // Mark new type and its instances with a non-enumerable type and isOJ properties
    typeProps = {
      type: {
        value: Out,
        writable: false,
        enumerable: false
      },
      typeName: {
        value: name,
        writable: false,
        enumerable: false
      },
      isOJ: {
        value: true,
        writable: false,
        enumerable: false
      }
    }
    oj.addProperties(Out, typeProps)
    oj.addProperties(Out.prototype, typeProps)

    // Add properties all oj Types have
    propKeys = (_keys(args.properties)).sort()
    if (Out.prototype.properties != null)
      propKeys = uniqueSort(Out.prototype.properties.concat(propKeys))

    oj.addProperty(Out.prototype, 'properties', {
      value: propKeys,
      writable: false,
      enumerable: false
    })

    // Add methods helper to instance
    methodKeys = (_keys(args.methods)).sort()
    if (Out.prototype.methods != null)
      methodKeys = uniqueSort(Out.prototype.methods.concat(methodKeys))

    oj.addProperty(Out.prototype, 'methods', {
      value: methodKeys,
      writable: false,
      enumerable: false
    })

    // Add methods all oj Types have
    _extend(args.methods, {

      // get: Get property by key or get all properties
      get: function(k){
        // get specific property
        if (oj.isString(k)){
          if (this.has(k))
            return this[k]
        // get all properties
        } else {
          var out = {}, ix, p
          for (ix = 0; ix < this.properties.length; ix++){
            p = this.properties[ix];
            out[p] = this[p];
          }
          return out
        }
      },

      // set: Set property by key, or set all properties with object
      set: function(k, v){
        var key, obj = k, value;

        // Optionally take key, value instead of object
        if (!oj.isPlainObject(k)){
          obj = {};
          obj[k] = v;
        }

        // Set all keys that are valid properties
        for (key in obj){
          value = obj[key];
          if (this.has(key)){
            this[key] = value;
          }
        }
      },

      // has: Determine if property exists
      has: function(k){return this.properties.some(function(v){return v === k})},

      // can: Determine if method exists
      can: function(k){return this.methods.some(function(v){return v === k})},

      // toJSON: Use properties to generate json
      toJSON: function(){
        var json = {},
          prop,
          ix = 0
        for (;ix < this.properties.length; ix++){
          prop = this.properties[ix]
          json[prop] = this[prop]
        }
        return json
      }
    });

    // Add methods
    oj.addMethods(Out.prototype, args.methods);

    // Add the properties
    oj.addProperties(Out.prototype, args.properties);
    return Out;
  };

  // _createQuietType: Takes an OJ Type and creates the _Type that doesn't emit
  _createQuietType = function(typeName){
    return oj[_getQuietTagName(typeName)] = function(){
      return _construct.apply(null, [oj[typeName]].concat(slice.call(arguments), [{
        __quiet__: 1
      }]));
    }
  }

  // oj.createEnum
  oj.createEnum = function(name, args){_e('createEnum', 'NYI')}

  // oj.View
  oj.View = oj.createType('View', {

    // Views are special objects map properties together. This is a union of arguments
    // With the remaining arguments becoming a list
    constructor: function(){
      _a(oj.isDOM(this.el), this.typeName, 'constructor did not set this.el')

      // Set instance on @el
      _setInstanceOnElement(this.el, this)

      var u = oj.unionArguments(arguments),
        options = u.options,
        args = u.args

      // Emit as a tag if it isn't quiet or used new keyword
      if (this.__autonew__ && !options.__quiet__)
        this.emit()

      // Remove quiet flag as it has served its purpose
      if (options.__quiet__ != null)
        delete options.__quiet__

      // Add class oj-typeName
      this.$el.addClass("oj-" + this.typeName)

      // Views automatically set all options to their properties
      // arguments directly to properties
      this.set(options)

      // Remove options that were set
      options = _clone(options);
      this.properties.forEach(function(v){return delete options[v]})

      // Views pass through remaining options to be attributes on the root element
      // This can include jquery events and interpreted arguments
      this.addAttributes(options)

      // Record if view is fully constructed
      return this._isConstructed = true
    },
    properties: {
      // The element backing the View
      el: {
        get: function(){return this._el},
        set: function(v){
          // Set the element directly if this is a dom element
          if (oj.isDOMElement(v)){
            this._el = v
            // Clear cache of $el
            this._$el = null
          } else {
            // Generate the dom element
            this._el = oj.compile({dom:1, css:0, cssMap:0, html:0}, v).dom
          }
        }
      },

      // Get and cache jquery-enabled element (readonly)
      $el: {
        get: function(){
          return this._$el != null ? this._$el : (this._$el = oj.$(this.el))
        }
      },

      // Get and set id attribute of view
      id: {
        get: function(){return this.$el.attr('id')},
        set: function(v){return this.$el.attr('id', v)}
      },
      // class:
      // get: -> @$el.attr 'class'
      // set: (v) ->
      //   # Join arrays with spaces
      //   if oj.isArray v
      //     v = v.join ' '
      //   @$el.attr 'class', v
      //   return
      // Alias for classes
      // c:
      // get: -> @class
      // set: (v) -> @class = v; return
      // Get all currently set attributes (readonly)

      attributes: {
        get: function(){
          var out = {}
          slice.call(this.el.attributes).forEach(function(attr){
            return out[attr.name] = attr.value
          })
          return out
        }
      },

      // Get all classes as an array (readwrite)
      classes: {
        get: function(){return this.$el.attr('class').split(/\s+/)},
        set: function(v){this.$el.attr('class', v.join(' '))}
      },

      // Get / set all currently set themes (readwrite)
      themes: {
        get: function(){
          var thms = [],
            prefix = 'theme-',
            ix = 0,
            cls
          for (; ix < this.classes.length; ix++){
            cls = this.classes[ix]
            if (cls.indexOf(prefix) === 0)
              thms.push(cls.slice(prefix.length))
          }
          return thms
        },
        set: function(v){
          if (!oj.isArray(v))
            v = [v]
          this.clearThemes()
          var theme, ix = 0
          for (;ix < v.length; ix++){
            theme = v[ix]
            this.addTheme(theme)
          }
        }
      },
      theme: {
        get: function(){return this.themes},
        set: function(v){this.themes = v}
      },

      // Determine if this view has been fully constructed (readonly)
      isConstructed: {get: function(){return _d(this._isConstructed, false)}},

      // Determine if this view has been fully inserted (readonly)
      isInserted: {get: function(){return _d(this._isInserted, false)}}
    },
    methods: {

      // $: Find element from within root
      $: function(){return this.$el.find.apply(this.$el, arguments)},

      // addAttribute: Add a single attribute
      addAttribute: function(name, value){
        var attr = {}
        attr[name] = value
        this.addAttributes(attr)
      },

      // addAttributes: Add attributes and apply the oj magic with jquery binding
      addAttributes: function(attributes){
        var attr = _clone(attributes),
          events = _attributesProcessedForOJ(attr),
          k, v

        // Add attributes as object
        if (oj.isPlainObject(attr)){
          for (k in attr){
            v = attr[k]
            if (k === 'class')
              this.addClass(v)
            else if (v === true)
              // Boolean attributes have no value
              this.el.setAttributeNode(document.createAttribute(k))
            else
              // Otherwise add it normally
              this.$el.attr(k, v)
          }
        }

        // Bind events
        if (events != null)
          _attributesBindEventsToDOM(events, this.el)
      },

      // Remove a single attribute
      removeAttribute: function(name){this.$el.removeAttr(name)},

      // Remove multiple attributes
      removeAttributes: function(list){var _t = this; list.forEach(function(v){_t.removeAttribute(v)})},

      // Add a single class
      addClass: function(name){this.$el.addClass(name)},

      // Remove a single class
      removeClass: function(name){this.$el.removeClass(name)},

      // Determine if class is applied
      hasClass: function(name){return this.$el.hasClass(name)},

      // Add a single theme
      addTheme: function(name){this.addClass("theme-" + name)},

      // Remove a single theme
      removeTheme: function(name){this.removeClass("theme-" + name)},

      // Determine if theme is applied
      hasTheme: function(name){return this.hasClass("theme-" + name)},

      // Clear all themes
      clearThemes: function(){var _t = this; this.themes.forEach(function(t){_t.removeTheme(t)}) },

      // emit: Emit instance as a tag function would do
      emit: function(){oj._argsAppend(this)},

      // Convert View to html
      toHTML: function(options){
        return this.el.outerHTML + ((options != null ? options.minify : void 0) ? '' : '\n');
      },

      // Convert View to dom (for compiling)
      toDOM: function(){return this.el},

      // Convert
      toCSS: function(options){
        return _cssFromPluginObject(_flattenCSSMap(this.cssMap), _extend({}, {
          minify: options.minify,
          tags: 0
        }));
      },

      // Convert
      toCSSMap: function(){return this.type.cssMap},

      // Convert View to string (for debugging)
      toString: function(){return this.toHTML()},

      // detach: -> throw 'detach nyi'
      // The implementation is to set el manipulate it, and remember how to set it back

      // attach: -> throw 'attach nyi'
      // The implementation is to unset el from detach
      // inserted is called the instance is inserted in the dom (override)

      inserted: function(){return this._isInserted = true}
    }
  });


  // oj.View.cssMap: remember css for this View
  oj.View.cssMap = {}

  // oj.View.css: set view's css with css object mapping, or raw css string
  oj.View.css = function(css){
    _a(oj.isString(css) || oj.isPlainObject(css), this.typeName, 'object or string expected for first argument');

    var cssMap, _base, _base1, _name, _name1, _ref2, _ref3;

    if (oj.isString(css)){
      if ((_ref2 = (_base = this.cssMap)[_name = "oj-" + this.typeName]) == null){
        _base[_name] = "";
      }
      this.cssMap["oj-" + this.typeName] += css;
    } else {
      if ((_ref3 = (_base1 = this.cssMap)[_name1 = "oj-" + this.typeName]) == null){
        _base1[_name1] = {};
      }
      cssMap = _setObject({}, ".oj-" + this.typeName, css);
      _extend(this.cssMap["oj-" + this.typeName], cssMap);
    }
  };

  // oj.View.themes: Remember themes for this View
  oj.View.themes = []

  // oj.View.theme: create a View specific theme with css object mapping
  oj.View.theme = function(name, css){
    _v(this.typeName, 1, name, 'string');
    _v(this.typeName, 2, css, 'object');

    // Calculate styleName
    var dashName = _dasherize(name),
      styleName = "oj-" + this.typeName,

      // Wrap css in plugin name
      cssMap = _setObject({}, ".oj-" + this.typeName + ".theme-" + dashName, css)

    // Extend into this views cssMap
      this.cssMap[styleName] = _d(this.cssMap[styleName], {})
      _extend(this.cssMap["oj-" + this.typeName], cssMap)

    // Remember the theme item
    this.themes.push(dashName)
    this.themes = uniqueSort(this.themes)
  };

  // oj.CollectionView: Inheritable base type that enables two-way collection binding
  oj.CollectionView = oj.createType('CollectionView', {
    base: oj.View,
    constructor: function(options){
      if ((options != null ? options.each : void 0) != null)
        this.each = oj.argumentShift(options, 'each')

      if ((options != null ? options.models : void 0) != null)
        this.models = oj.argumentShift(options, 'models')

      oj.CollectionView.base.constructor.apply(this, arguments);

      // Once everything is constructed call make precisely once.
      return this.make()
    },
    properties: {
      each: {
        get: function(){return this._each},
        set: function(v){
          this._each = v
          if (this.isConstructed)
            this.make()
        }
      },
      collection: {
        get: function(){return this.models},
        set: function(v){return this.models = v}
      },
      models: {
        get: function(){return this._models},
        set: function(v){
          // Unbind events if collection
          if (oj.isFunction(this._models != null ? this._models.off : void 0))
            this._models.off('add remove change reset destroy', null, this)

          this._models = v

          // Bind events if collection
          if (oj.isFunction(this._models != null ? this._models.on : void 0)){
            this._models.on('add', this.collectionModelAdded, this)
            this._models.on('remove', this.collectionModelRemoved, this)
            this._models.on('change', this.collectionModelChanged, this)
            this._models.on('destroy', this.collectionModelDestroyed, this)
            this._models.on('reset', this.collectionReset, this)
          }
          if (this.isConstructed)
            this.make()
        }
      }
    },
    methods: {

      // Override make to create your view
      make: function(){_e(this.typeName, '`make` method not implemented by custom view')},

      // Override these events to minimally update on change
      collectionModelAdded: function(mod, cols){return this.make()},
      collectionModelRemoved: function(mod, cols, opt){return this.make()},
      collectionModelChanged: function(mod, cols, opt){},
      collectionModelDestroyed: function(cols, opt){return this.make()},
      collectionReset: function(cols, opt){return this.make()}
    }
  });

  // oj.ModelView: Inheritable base type that enables two-way model binding
  oj.ModelView = oj.createType('ModelView', {
    base: oj.View,
    constructor: function(options){
      if ((options != null ? options.value : void 0) != null)
        this.value = oj.argumentShift(options, 'value')

      if ((options != null ? options.model : void 0) != null)
        this.model = oj.argumentShift(options, 'model')

      return oj.ModelView.base.constructor.apply(this, arguments)
    },
    properties: {
      model: {
        get: function(){
          return this._model
        },
        set: function(v){
          // Unbind events on the old model
          if (oj.isEvented(this._model))
            this._model.off('change', null, this);

          this._model = v

          // Bind events on the new model
          if (oj.isEvented(this._model))
            this._model.on('change', this.modelChanged, this);

          // Trigger change manually when settings new model
          this.modelChanged()
        }
      }
    },
    methods: {

      // Override modelChanged if you don't want a full remake
      modelChanged: function(){
        var _t = this;
        return this.$el.oj(function(){
          return _t.make(_t.mode)
        });
      },
      make: function(model){
        return _e(this.typeName, '`make` method not implemented by custom view');
      }
    }
  });

  // oj.ModelViewView: Inheritable base type that enables two-way model binding to a specific key
  oj.ModelKeyView = oj.createType('ModelKeyView', {

    // Inherit ModelView to handle model and bindings
    base: oj.ModelView,
    constructor: function(options){

      if ((options != null ? options.key : void 0) != null)
        this.key = oj.argumentShift(options, 'key')

      // Call super to bind model and value
      return oj.ModelKeyView.base.constructor.apply(this, arguments);
    },
    properties: {
      // Key used to access model
      key: null,

      // Override this property and call this.viewChanged when appropriate
      value: {
        get: function(){_e(this.typeName, 'value getter not implemented')},
        set: function(v){_e(this.typeName, 'value setter not implemented')}
      }
    },

    methods: {

      // modelChanged: called by model binding code to
      // automatically set this.value when the model changes
      modelChanged: function(){
        if ((this.model != null) && (this.key != null)){
          // Update the view if necessary
          if (!this._viewUpdatedModel)
            this.value = this.model.get(this.key)
        }
      },

      // viewChanged: Will set the model whenever this.value is set
      viewChanged: function(){
        var _t = this

        // Briefly delay view changes because they often change before
        // the controls visually update
        setTimeout((function(){
          if ((_t.model != null) && (_t.key != null)){
            // Ensure view changes aren't triggered twice
            _t._viewUpdatedModel = true
            _t.model.set(_t.key, _t.value)
            _t._viewUpdatedModel = false
          }
        }), 10)
      }
    }
  });

  // oj.TextBox
  oj.TextBox = oj.createType('TextBox', {
    base: oj.ModelKeyView,
    constructor: function(){
      var _t = this,
        u = oj.unionArguments(arguments),
        options = u.options,
        args = u.args

      this.el = oj(function(){
        oj.input({type: 'text'}, {
          // When live changes are set indicate change on every keypress
          // Delay change events slighty as value is visually updated after key presses
          keydown: function(){
            if (_t.live)
              setTimeout((function(){return _t.$el.change()}), 10)
          },
          keyup: function(){
            if (_t.live)
              setTimeout((function(){return _t.$el.change()}), 10)
          },
          change: function(){_t.viewChanged()}
        })
      })

      // Value can be set by argument
      if (args.length > 0)
        this.value = args[0]

      // Set live if it exists
      if ((options != null ? options.live : void 0) != null)
        this.live = oj.argumentShift(options, 'live')

      return oj.TextBox.base.constructor.apply(this, [options])
    },
    properties: {
      value: {
        get: function(){
          var v = this.el.value
          if ((v == null) || v === _udf)
            v = ''
          return v
        },
        set: function(v){this.el.value = v}
      },

      // Live update model as text changes
      live: true
    }
  });

  // oj.CheckBox
  oj.CheckBox = oj.createType('CheckBox', {
    base: oj.ModelKeyView,
    constructor: function(){
      var _t = this,
        u = oj.unionArguments(arguments),
        options = u.options,
        args = u.args

      this.el = oj(function(){
        oj.input({type: 'checkbox'}, {
          change: function(){_t.viewChanged()}
        })
      })

      // Value can be set by argument
      if (args.length > 0)
        this.value = args[0]

      return oj.CheckBox.base.constructor.call(this, options);
    },
    properties: {
      value: {
        get: function(){return this.el.checked},
        set: function(v){
          this.el.checked = v = !!v
          if (v)
            this.$el.attr('checked', 'checked')
          else
            this.$el.removeAttr('checked')
        }
      }
    }
  });

  // oj.Text
  oj.Text = oj.createType('Text', {
    base: oj.ModelKeyView,
    constructor: function(){
      var _t = this,
        u = oj.unionArguments(arguments),
        options = u.options,
        args = u.args

      // Get tag name if provided
      this._tagName = oj.argumentShift(options, 'tagName')

      // Create element with tagName
      this.el = oj(function(){
        return oj[_t.tagName]()
      });

      // Value can be set by argument
      if (args.length > 0)
        this.value = args[0]

      return oj.Text.base.constructor.call(this, options);
    },

    properties: {
      // value: text value of this object (readwrite)
      value: {
        get: function(){return this.$el.ojValue()},
        set: function(v){this.$el.oj(v)}
      },

      // tagName: name of root tag (writeonce)
      tagName: {get: function(){return _d(this._tagName, 'div')}}
    }
  });

  // oj.TextArea
  oj.TextArea = oj.createType('TextArea', {
    base: oj.ModelKeyView,
    constructor: function(){
      var _t = this,
        u = oj.unionArguments(arguments),
        options = u.options,
        args = u.args

      this.el = oj(function(){
        return oj.textarea({
          // When live changes are set indicate change on every keypress
          // Delay change events slighty as value is visually updated after key presses
          keydown: function(){
            if (_t.live)
              setTimeout((function(){return _t.$el.change()}), 10)
          },
          keyup: function(){
            if (_t.live)
              setTimeout((function(){return _t.$el.change()}), 10)
          },
          change: function(){
            _t.viewChanged()
          }
        });
      });

      // Value can be set by argument
      this.value = oj.argumentShift(options, 'value') || args.join('\n')
      return oj.TextArea.base.constructor.call(this, options)
    },
    properties: {
      value: {
        get: function(){return this.el.value},
        set: function(v){this.el.value = v}
      },

      // Live update model as text changes
      live: true
    }
  });

  // oj.ListBox
  oj.ListBox = oj.createType('ListBox', {
    base: oj.ModelKeyView,
    constructor: function(){
      var _t = this,
        u = oj.unionArguments(arguments),
        options = u.options,
        args = u.args

      this.el = oj(function(){
        return oj.select({
          change: function(){_t.viewChanged()}
        })
      })

      // @options is a list of elements
      this.options = oj.argumentShift(options, 'options');

      // Value can be set by argument
      if (args.length > 0)
        this.value = args[0]

      return oj.ListBox.base.constructor.apply(this, [options]);
    },
    properties: {
      value: {
        get: function(){
          return this.$el.val();
        },
        set: function(v){
          this.$el.val(v);
        }
      },
      options: {
        get: function(){
          return this._options;
        },
        set: function(v){
          if (!oj.isArray(v)){
            throw new Error("oj." + this.typeName + ".options array is missing");
          }
          this._options = v;
          this.$el.oj(function(){
            var op, _j, _len1;

            for (_j = 0, _len1 = v.length; _j < _len1; _j++){
              op = v[_j];
              oj.option(op);
            }
          });
        }
      }
    }
  });

  // oj.Button
  oj.Button = oj.createType('Button', {
    base: oj.View,
    constructor: function(){
      var _t = this,
      u = oj.unionArguments(arguments),
      options = u.options,
      args = u.args,

      // Label is first argument
      title = ''
      if (args.length > 0)
        title = args[0]

      // Label is specified as option
      if (options.title != null)
        title = oj.argumentShift(options, 'title')

      // Create element
      this.el = oj(function(){return oj.button(title)})

      oj.Button.base.constructor.apply(this, [options]);
      return this.title = title;
    },
    properties: {
      title: {
        get: function(){return _d(this._title, '')},
        set: function(v){this.$el.oj((this._title = v))}
      }
    },
    methods: {
      click: function(){
        if (arguments.length > 0)
          return this.$el.click.apply(this.$el, arguments)
        else
          return this.$el.click()
      }
    }
  });

  // oj.List: List control with two-way collection binding
  oj.List = oj.createType('List', {
    base: oj.CollectionView,
    constructor: function(){
      var _t = this,
        u = oj.unionArguments(arguments),
        options = u.options,
        args = u.args,
        items

      // tagName is write-once
      this._tagName = oj.argumentShift(options, 'tagName')
      this.itemTagName = oj.argumentShift(options, 'itemTagName')

      // Create the root element
      this.el = oj(function(){return oj[_t.tagName]()});

      // Use el if it was passed in
      if (options.el != null)
        this.el = oj.argumentShift(options, 'el')

      // Default @each function to pass through values
      if (options.each == null){
        options.each = function(model){
          if (oj.isString(model) || oj.isNumber(model) || oj.isBoolean(model))
            return model
          else
            return JSON.stringify(model)
        }
      }

      // Args have been handled so don't pass them on
      oj.List.base.constructor.apply(this, [options]);

      // Set @items to options or args if they exist
      items = args.length > 0 ? args : null;
      return this.items = options.items != null ? oj.argumentShift(options, 'items') : items;
    },

    properties: {
      // items: get or set all items at once (readwrite)
      items: {
        get: function(){
          // Found in cache
          if (this._items != null)
            return this._items

          // Calc from ojValues
          return this.$items.ojValues()
        },
        set: function(v){
          this._items = v
          this.make()
        }
      },
      count: {get: function(){return this.$items.length}},

      // tagName: name of root tag (writeonce)
      tagName: {get: function(){return _d(this._tagName, 'div')}},

      // itemTagName: name of item tags (readwrite)
      itemTagName: {
        get: function(){return _d(this._itemTagName, 'div')},
        set: function(v){this._itemTagName = v; this.make();}
      },

      // $items: list of `<li>` elements (readonly)
      $items: {
        get: function(){
          // Get from cache or cache the recalculated list
          return this._$items != null ? this._$items : this._$items = this.$("> " + this.itemTagName)
        }
      }
    },

    methods: {
      // item: get or set item value at item ix
      item: function(ix, ojml){
        ix = this._bound(ix, this.count, ".item: index")
        if (ojml != null)
          this.$item(ix).oj(ojml)
        else
          return this.$item(ix).ojValue()
      },

      // $item: `<li>` element for a given item ix. The tag name may change.
      $item: function(ix){return this.$items.eq(this._bound(ix, this.count, ".$item: index"))},

      // make: Remake view from model data using each
      make: function(){
        // Do nothing until fully constructed
        if (!this.isConstructed)
          return

        // Some properties call make before construction completes
        var _t = this, ix, model, models, views, out

        // Convert models to views using each
        if ((this.models != null) && (this.each != null)){

          // Get list of models from collection or array
          models = oj.isEvented(this.models) ? this.models.models : this.models;

          // Add view item for every model
          views = models.map(function(model){return _t._itemFromModel(model)})

        // Items are already views so just use them
        } else if (this.items != null) {
          views = this.items
        }

        // Render the views
        this.$el.oj(function(){return views.map(function(view){_t._itemElFromItem(view)}) })

        // Indicate to CollectionView the items changed
        this.itemsChanged()
      },

      // collectionModelAdded: Model add occurred, add the item
      collectionModelAdded: function(m, c){this.add(c.indexOf(m), this._itemFromModel(m))},

      // collectionModelRemoved: Model remove occured, delete the item
      collectionModelRemoved: function(m, c, o){this.remove(o.index)},

      // collectionModelRemoved: Model reset occured, full rebuild
      collectionReset: function(){this.make()},

      // Helper Methods
      // _itemFromModel: Helper to map model to item
      _itemFromModel: function(model){
        var _t = this;
        return oj(function(){return _t.each(model)});
      },

      // _itemElFromItem: Helper to create itemTagName wrapped item
      _itemElFromItem: function(item){
        return oj[this.itemTagName](item);
      },

      // _bound: Bound index to allow negatives, throw when out of range
      _bound: function(ix, count, message){
        var ixNew = ix < 0 ? ix + count : ix
        if (!(0 <= ixNew && ixNew < count))
          _e(this.typeName, message + " is out of bounds (" + ix + " in [0," + (count - 1) + "])")
        return ixNew
      },

      // itemsChanged: Model changed occured, clear relevant cached values
      itemsChanged: function(){this._items = null; this._$items = null},

      // Manipulation Methods
      add: function(ix, ojml){
        // ix defaults to -1 and is optional
        if (ojml == null){
          ojml = ix
          ix = -1
        }

        ix = this._bound(ix, this.count + 1, ".add: index")
        var tag = this.itemTagName

        // Empty
        if (this.count === 0)
          this.$el.oj(function(){return oj[tag](ojml)})

        // Last
        else if (ix === this.count)
          this.$item(ix - 1).ojAfter(function(){return oj[tag](ojml)})

        // Not last
        else
          this.$item(ix).ojBefore(function(){return oj[tag](ojml)})

        this.itemsChanged()
      },

      remove: function(ix){
        ix = _d(ix,-1)
        ix = this._bound(ix, this.count, ".remove: index")
        var out = this.item(ix)
        this.$item(ix).remove()
        this.itemsChanged()
        return out
      },

      move: function(ixFrom, ixTo){
        ixTo = _d(ixTo, -1)
        if (ixFrom === ixTo)
          return
        ixFrom = this._bound(ixFrom, this.count, ".move: fromIndex")
        ixTo = this._bound(ixTo, this.count, ".move: toIndex")
        if (ixTo > ixFrom)
          this.$item(ixFrom).insertAfter(this.$item(ixTo))
        else
          this.$item(ixFrom).insertBefore(this.$item(ixTo))
        this.itemsChanged()
      },
      swap: function(ix1, ix2){
        if (ix1 === ix2)
          return
        ix1 = this._bound(ix1, this.count, ".swap: firstIndex");
        ix2 = this._bound(ix2, this.count, ".swap: secondIndex");
        if (Math.abs(ix1 - ix2) === 1)
          this.move(ix1, ix2)
        else {
          var ixMin = Math.min(ix1, ix2),
            ixMax = Math.max(ix1, ix2)
          this.move(ixMax, ixMin)
          this.move(ixMin + 1, ixMax)
        }
        this.itemsChanged()
      },
      unshift: function(v){this.add(0, v)},
      shift: function(){return this.remove(0)},
      push: function(v){this.add(this.count, v)},
      pop: function(){return this.remove(-1)},
      clear: function(){this.$items.remove(); this.itemsChanged()}
    }
  });


  // oj.NumberList: NumberList is a `List` specialized with `<ol>` and `<li>` tags
  oj.NumberList = oj.createType('NumberList', {
    base: oj.List,
    constructor: function(){
      var args = [{tagName:'ol', itemTagName:'li'}].concat(slice.call(arguments))
      return oj.NumberList.base.constructor.apply(this, args)
    }
  })

  // oj.BulletList: BulletList is a `List` specialized with `<ul>` and `<li>` tags
  oj.BulletList = oj.createType('BulletList', {
    base: oj.List,
    constructor: function(){
      var args = [{tagName:'ul', itemTagName:'li'}].concat(slice.call(arguments))
      return oj.BulletList.base.constructor.apply(this, args)
    }
  })

  // oj.Table
  oj.Table = oj.createType('Table', {
    base: oj.CollectionView,
    constructor: function(){
      var _t = this,
        u = oj.unionArguments(arguments),
        options = u.options,
        args = u.args,
        rows, ix

      // Generate root
      this.el = oj(function(){return oj.table()})

      // Use el if it was passed in
      if (options.el != null)
        this.el = oj.argumentShift(options, 'el')

      // Default @each function to pass through values
      if (options.each == null){
        options.each = function(model, cell){
          var values = (oj.isString(model)) || (oj.isNumber(model)) || (oj.isBoolean(model)) ? [model] : (oj.isEvented(model)) && typeof model.attributes === 'object' ? _values(model.attributes) : _values(model)
          return values.map(function(v){cell(v)});
        };
      }

      // Args have been handled so don't pass them on
      oj.Table.base.constructor.apply(this, [options]);

      // Validate args as arrays
      for(ix = 0; ix < args.length; ix++)
        _a(oj.isArray(args[ix]), 'Table', 'array expected for row arguments')

      // Set @rows to options or args if they exist
      rows = _d(oj.argumentShift(options, 'rows'), args)
      if (rows.length > 0)
        return this.rows = rows
    },
    properties: {

      // rowCount: The number of rows (readonly)
      rowCount: {get: function(){return this.$trs.length}},

      // columnCount: The number of columns (readonly)
      columnCount: {get: function(){
        // The number of columns is number of `<tr>` in rows, header, or footer
        var tflen, thlen, trlen
        if ((trlen = this.$tr(0).find('> td').length) > 0)
          return trlen
        else if ((thlen = this.$theadTR.find('> th').length) > 0)
          return thlen
        else if ((tflen = this.$tfootTR.find('> td').length) > 0)
          return tflen
        return 0
      }},

      // rows: Row values as a list of lists as interpreted by ojValue plugin (readwrite)
      rows: {
        get: function(){
          // Get cached result
          if (this._rows != null)
            return this._rows

          // Calculate rows by mapping from td to ojValue
          var r, rx = 0
          this._rows = []
          for (; rx < this.rowCount; rx++){
            r = this.$tdsRow(rx).toArray().map(function(el){return $(el).ojValue()})
            this._rows.push(r);
          }
          return this._rows
        },
        set: function(list){
          if (!((list != null) && list.length > 0))
            return this.clearBody()
          this._rows = list
          this.make()
        }
      },

      // header: Array of header values as interpreted by ojValue plugin (readwrite)
      header: {
        get: function(){return this.$theadTR.find('> th').ojValues()},
        set: function(list){
          _a(oj.isArray(list), this.typeName + '.header', 'array expected for first argument')

          if (!((list != null) && list.length > 0))
            return this.clearHeader()

          return this.$theadTRMake.oj(function(){
            return list.map(function(ojml){oj.th(ojml)})
          });
        }
      },

      // footer: Array of footer values as interpreted by ojValue plugin (readwrite)
      footer: {
        get: function(){
          return this.$tfootTR.find('> td').ojValues();
        },
        set: function(list){
          var _t = this;

          if (!oj.isArray(list)){
            throw new Error('oj.Table.footer: array expected for first argument');
          }
          if (!((list != null) && list.length > 0)){
            return this.clearFooter();
          }
          return this.$tfootTRMake.oj(function(){
            var ojml, _j, _len1, _results;

            _results = [];
            for (_j = 0, _len1 = list.length; _j < _len1; _j++){
              ojml = list[_j];
              _results.push(oj.td(ojml));
            }
            return _results;
          });
        }
      },

      // caption: The table caption (readwrite)
      caption: {
        get: function(){return this.$caption.ojValue()},
        set: function(v){this.$captionMake.oj(v)}
      },

      // Element accessors
      $table: {get: function(){return this.$el}},
      $caption: {get: function(){return this.$('> caption')}},
      $colgroup: {get: function(){return this.$('> colgroup')}},
      $thead: {get: function(){return this.$('> thead')}},
      $tfoot: {get: function(){return this.$('> tfoot')}},
      $tbody: {get: function(){return this.$('> tbody')}},
      $theadTR: {get: function(){return this.$thead.find('> tr')}},
      $tfootTR: {get: function(){return this.$tfoot.find('> tr')}},
      $ths: {get: function(){return this.$theadTR.find('> th')}},
      $trs: {get: function(){
        // Cache or calculate
        return this._$trs != null ? this._$trs : this._$trs = this.$("> tbody > tr")
      }},

      // Table tags must have an order: `<caption>` `<colgroup>` `<thead>` `<tfoot>` `<tbody>`
      // These accessors create table tags and preserve this order very carefully
      // $colgroupMake: get or create `<colgroup>` after `<caption>` or prepended to `<table>`

      $colgroupMake: {get: function(){
        if (this.$colgroup.length > 0)
          return this.$colgroup
        t = '<colgroup></colgroup>'
        if (this.$caption.length > 0)
          this.$caption.insertAfter(t)
        else
          this.$table.append(t)
        return this.$tbody
      }},

      // $captionMake: get or create `<caption>` prepended to `<table>`
      $captionMake: {
        get: function(){
          if (this.$caption.length > 0)
            return this.$caption
          this.$table.prepend('<caption></caption>')
          return this.$caption
        }
      },

      // $tfootMake: get or create `<tfoot>` before `<tbody>` or appended to `<table>`
      $tfootMake: {
        get: function(){
          if (this.$tfoot.length > 0)
            return this.$tfoot
          t = '<tfoot></tfoot>'
          if (this.$tfoot.length > 0)
            this.$tfoot.insertBefore(t)
          else
            this.$table.append(t)

          return this.$tfoot
        }
      },

      // $theadMake: get or create `<thead>` after `<colgroup>` or after `<caption>`, or prepended to `<table>`
      $theadMake: {
        get: function(){
          if (this.$thead.length > 0)
            return this.$thead
          t = '<thead></thead>'
          if (this.$colgroup.length > 0)
            this.$colgroup.insertAfter(t);
          else if (this.$caption.length > 0)
            this.$caption.insertAfter(t)
          else
            this.$table.prepend(t)
          return this.$thead
        }
      },

      // $tbodyMake: get or create `<tbody>` appened to `<table>`
      $tbodyMake: {
        get: function(){
          if (this.$tbody.length > 0)
            return this.$tbody
          this.$table.append('<tbody></tbody>')
          return this.$tbody;
        }
      },

      // $theadTRMake: get or create `<tr>` inside of `<thead>`
      $theadTRMake: {
        get: function(){
          if (this.$theadTR.length > 0)
            return this.$theadTR
          this.$theadMake.html('<tr></tr>')
          return this.$theadTR
        }
      },

      // $tfootTRMake: get or create `<tr>` inside of `<tfoot>`
      $tfootTRMake: {
        get: function(){
          if (this.$tfootTR.length > 0)
            return this.$tfootTR
          this.$tfootMake.html('<tr></tr>')
          return this.$tfootTR
        }
      }
    },

    methods: {

      // make: Remake everything (override)
      make: function(){
        if (!this.isConstructed)
          return

        // Some properties call make before construction completes
        var _t = this, models, rowViews = []

        // Convert models to views if model/each exists
        if ((this.models != null) && (this.each != null)){
          models = oj.isEvented(this.models) ? this.models.models : this._models
          rowViews = models.map(function(model){return _t._rowFromModel(model)})
        // Convert rows to views
        } else if (this.rows != null){
          rowViews = this.rows.map(function(row){
            return oj(function(){
              row.forEach(function(cell){oj.td(cell)})
            })
          })
        }

        // Render rows into tbody
        if (rowViews.length > 0)
          this.$tbodyMake.oj(function(){
            rowViews.forEach(function(r){
              oj.tr(r)
            })
          })

        this.bodyChanged()
      },

      collectionModelAdded: function(m, c){
        var rx = c.indexOf(m),
          row = this._rowFromModel(m)
        this._addRowTR(rx, oj(function(){
          return oj.tr(row)
        }))
      },

      collectionModelRemoved: function(m, c, o){this.removeRow(o.index)},

      collectionReset: function(){this.make()},

      // $tr: Get `<tr>` jquery element at row rx
      $tr: function(rx){
        rx = rx < 0 ? rx + count : rx
        return this.$trs.eq(rx)
      },

      // $tdsRow: Get list of `<td>`s in row rx
      $tdsRow: function(rx){
        rx = rx < 0 ? rx + count : rx
        return this.$tr(rx).find('> td')
      },

      // $td: Get `<td>` row rx, column cx
      $td: function(rx, cx){
        rx = rx < 0 ? rx + this.rowCount : rx
        cx = cx < 0 ? cx + this.columnCount : cx
        return this.$tdsRow(rx).eq(cx)
      },

      // row: Get values at a given row
      row: function(rx, listOJML){
        rx = this._bound(rx, this.rowCount, ".row: rx")

        if (listOJML != null){
          _a(listOJML.length === cellCount(rx), this.typeName, "array expected for second argument with length (" + rx + ")")

          // Set tds
          listOJML.forEach(function(ojml,cx){
            this.$td(rx, cx).oj(ojml)
          })

        } else {
          return this.$tdsRow(rx).ojValues()
        }
      },

      // cell: Get or set value at row rx, column cx
      cell: function(rx, cx, ojml){
        if (ojml != null)
          return this.$td(rx, cx).oj(ojml)
        else
          return this.$td(rx, cx).ojValue()
      },

      // addRow: Add row to index rx
      addRow: function(rx, listOJML){

        if (listOJML == null){
          listOJML = rx
          rx = -1
        }
        rx = this._bound(rx, this.rowCount + 1, ".addRow: rx")
        _a(oj.isArray(listOJML), 'addRow', 'expected array for row content')

        this._addRowTR(rx, function(){
          oj.tr(function(){
            listOJML.forEach(function(cell){
              oj.td(cell)
            })
          });
        });
      },

      // _addRowTR: Helper to add row directly with `<tr>`
      _addRowTR: function(rx, tr){
        // Empty
        if (this.rowCount === 0)
          this.$el.oj(tr)

        // Last
        else if (rx === this.rowCount)
          this.$tr(rx - 1).ojAfter(tr)

        // Not last
        else
          this.$tr(rx).ojBefore(tr)

        this.bodyChanged()
      },

      // removeRow: Remove row at index rx (defaults to end)
      removeRow: function(rx){
        if (rx == null)
          rx = -1
        rx = this._bound(rx, this.rowCount, ".removeRow: index");
        var out = this.row(rx)
        this.$tr(rx).remove()
        this.bodyChanged()
        return out
      },

      // moveRow: Move row at index rx (defaults to end)
      moveRow: function(rxFrom, rxTo){
        if (rxFrom === rxTo)
          return

        rxFrom = this._bound(rxFrom, this.rowCount, ".moveRow: fromIndex")
        rxTo = this._bound(rxTo, this.rowCount, ".moveRow: toIndex")
        var insert = rxTo > rxFrom ? 'insertAfter' : 'insertBefore'
        this.$tr(rxFrom)[insert](this.$tr(rxTo))
        this.bodyChanged();
      },

      // swapRow: Swap row rx1 and rx2
      swapRow: function(rx1, rx2){
        if (rx1 === rx2)
          return
        rx1 = this._bound(rx1, this.rowCount, ".swap: firstIndex");
        rx2 = this._bound(rx2, this.rowCount, ".swap: secondIndex");
        if (Math.abs(rx1 - rx2) === 1)
          this.moveRow(rx1, rx2)
        else {
          var rxMin = Math.min(rx1, rx2),
            rxMax = Math.max(rx1, rx2)
          this.moveRow(rxMax, rxMin);
          this.moveRow(rxMin + 1, rxMax);
        }
        this.bodyChanged();
      },
      unshiftRow: function(v){this.addRow(0, v)},
      shiftRow: function(){return this.removeRow(0)},
      pushRow: function(v){this.addRow(this.rowCount, v)},
      popRow: function(){return this.removeRow(-1)},
      clearColgroup: function(){this.$colgroup.remove()},
      clearBody: function(){
        this.$tbody.remove();
        this.bodyChanged();
      },
      clearHeader: function(){
        this.$thead.remove();
        this.headerChanged();
      },
      clearFooter: function(){
        this.$tfoot.remove();
        this.footerChanged();
      },
      clearCaption: function(){
        this.$capation.remove();
      },
      clear: function(){
        this.clearBody();
        this.clearHeader();
        this.clearFooter();
        return this.$caption.remove();
      },

      // When body changes clear relevant cached values
      bodyChanged: function(){this._rows = null; this._columns = null; this._$trs = null},

      // When header changes clear relevant cached values
      headerChanged: function(){this._header = null},

      // When footer changes clear relevant cached values
      footerChanged: function(){this._footer = null},

      // _rowFromModel: Helper to map model to row
      _rowFromModel: function(model){
        var _t = this;
        return oj(function(){
          return _t.each(model, oj.td);
        });
      },

      // _bound: Bound index to allow negatives, throw when out of range
      _bound: function(ix, count, message){
        var ixNew = ix < 0 ? ix + count : ix
        if (!(0 <= ixNew && ixNew < count)){
          throw new Error("oj." + this.typeName + message + " is out of bounds (" + ix + " in [0," + (count - 1) + "])");
        }
        return ixNew;
      }
    }
  });

  // Create Quiet _Types
  for (var typeName in oj){
    // Type with captital first letter that doesn't end in "View"
    if (_isCapitalLetter(typeName[0]) && typeName.slice(typeName.length - 4) !== 'View'){
      oj[_getQuietTagName(typeName)] = _createQuietType(typeName);
    }
  }

  // oj.sandbox: The sandbox is a readonly version of oj exposed to the user when templating server-side
  oj.sandbox = {};
  _keys(oj).forEach(function(key){
    if ((key.length > 0 && key[0] !== '_') || (key.length > 0 && key[0] === '_' && (oj[key.slice(1)] != null))){
      oj.addProperty(oj.sandbox, key, {value: oj[key], writable: false});
    }
  })

  // oj.use(plugin, settings): import a plugin of OJ with optional settings
  oj.use = function(plugin, settings){
    settings = _d(settings, {})
    _v('use', 1, plugin, 'function')
    _v('use', 2, settings, 'object')

   // Call plugin to gather extension map
    var pluginResult = plugin(oj, settings),
      pluginMap =  _clone(pluginResult),
      name, value

    // Add _Type quiet types
    for (name in pluginResult){
      value = pluginResult[name]
      if (oj.isOJType(value))
        pluginMap[_getQuietTagName(name)] = _createQuietType(value.typeName);
    }

    // Extend all properties
    for (name in pluginMap){
      value = pluginMap[name]

      // Add to oj
      oj[name] = value

      // Add plugin to sandbox
      oj.addProperty(oj.sandbox, name, {value: value, writable: false})
    }
  };

  // _jqExtend(fn): Create a jquery plugin with the following options:
  //   option.get is called to retrieve value per element
  //   option.set is called when setting elements
  //   option.first:true means return only the first get,
  //     otherwise it is returned as an array
  function _jqExtend(options){
    if (options == null)
      options = {}

    options = _extend({
      get: pass,
      set: pass,
      first: false
    }, options)

    return function(){
      var el, out, r, ix,
        args = _toArray(arguments),
        $els = jQuery(this)

      // Map over jquery selection if no arguments
      if ((oj.isFunction(options.get)) && args.length === 0){
        out = []
        for (ix = 0; ix < $els.length; ix++){
          el = $els[ix];
          out.push(options.get(oj.$(el)))
          if (options.first)
            return out[0]
        }
        return out
      } else if (oj.isFunction(options.set)){

        // By default return this for chaining
        out = $els;
        for (ix = 0; ix < $els.length; ix++){
          el = $els[ix]
          r = options.set(oj.$(el), args)
          // Short circuit if anything is returned
          if (r != null)
            return r
        }
        return $els
      }
    };
  };

  function _triggerInserted(types, inserts){
    var ix = 0
    for (; ix <  types.length; ix++)
      types[ix].inserted()
    if(inserts) {
      for (ix = 0; ix < inserts.length; ix++)
        inserts[ix]()
    }
  }

  function _insertStyles(pluginMap, options){
    var mediaMap, plugin
    for (plugin in pluginMap){
      mediaMap = pluginMap[plugin]

      // Skip global css if options.global is true
      if (plugin === 'oj-style' && !(options != null ? options.global : 0))
        continue

      // Create <style> tag for the plugin
      if (oj.$('.' + _styleClassFromPlugin(plugin)).length === 0)
        oj.$('head').append(oj._styleTagFromMediaObject(plugin, mediaMap))
    }
  };

  // oj jquery plugin: Insert like innertHTML or get first instance
  oj.$.fn.oj = _jqExtend({
    // Get returns the first instance
    get: function($el){return $el[0].oj;},

    // Set compiles and inserts in innerHTML
    set: function($el, args){

      // No arguments return the first instance
      if (args.length === 0)
        return $el[0].oj

      // Compile ojml
      var r = oj.compile.apply(oj, [{dom: 1, html: 0, cssMap: 1 }].concat(slice.call(args)))

      _insertStyles(r.cssMap, {global: 0})

      // Reset content and append to dom
      $el.html('')

      // Ensure r.dom is an array
      if (!oj.isArray(r.dom))
        r.dom = [r.dom]

      // Append resulting dom elements
      for (var ix = 0; ix < r.dom.length; ix++)
        $el.append(r.dom[ix])

      // Trigger inserted events
      _triggerInserted(r.types, r.inserts)
    }
  });

  // jQuery.ojBody plugin: replace body with ojml.
  // Global css is rebuilt when using this method.
  oj.$.ojBody = function(ojml){

    // Compile only the body and below
    var bodyOnly = {html: 1, '!DOCTYPE': 1, body: 1, head: 'deep', meta: 1, title: 'deep', link: 'deep', script: 'deep'}

    try {
      var r = oj.compile({dom: 1, html: 0, css: 0, cssMap: 1, ignore: bodyOnly }, ojml)
    } catch (e){
      throw new Error("oj.compile: " + e.message);
    }

    // Clear body and insert dom elements
    if (r.dom != null)
      oj.$('body').html(r.dom)

    _insertStyles(r.cssMap, {global:1})

    _triggerInserted(r.types, r.inserts)
  };

  // Helper method that abstracts getting oj values
  function _jqGetValue($el, args){
    var el = $el[0],
      child = el.firstChild

    // Parse the text to turn it into bool, number, or string
    if (oj.isDOMText(child))
      return oj.parse(child.nodeValue)

    // Get elements as oj instances or elements
    else if (oj.isDOMElement(child))
      return _d(_getInstanceOnElement(child), child)
  }

  // jQuery.fn.ojValue: Get the first value of the selected contents
  oj.$.fn.ojValue = _jqExtend({first: true, set: null, get: _jqGetValue })

  // jQuery.fn.ojValues: Get values as an array of the selected element's contents
  oj.$.fn.ojValues = _jqExtend({first: false, set: null, get: _jqGetValue})

  // jQuery.fn.ojAfter, ojBefore, etc: oj insertion plugins to jquery
  var jqFromOJ = {
    ojAfter: 'after',
    ojBefore: 'before',
    ojAppend: 'append',
    ojPrepend: 'prepend',
    ojReplaceWith: 'replaceWith',
    ojWrap: 'wrap',
    ojWrapInner: 'wrapInner'
  }
  for (var ojName in jqFromOJ){
    var jqName = jqFromOJ[ojName]
    ;(function(ojName, jqName){
      oj.$.fn[ojName] = _jqExtend({
        set: function($el, args){

          // Compile ojml for each one to separate references
          var opts = {dom:1,html:0,css:0,cssMap:1},
            r = oj.compile.apply(oj, [opts].concat(slice.call(args)))
          _insertStyles(r.cssMap, {global: 0});

          // Append to the dom
          $el[jqName](r.dom);
          _triggerInserted(r.types, r.inserts);
        },
        get: null
      });
    })(ojName, jqName)
  }

  // Minify Helpers that hook into server-side minification
  oj._minifyJS = pass
  oj._minifyCSS = pass

  // Path Helpers: Used to implement require client side
  // Simplified from: github.com/joyent/node/lib/path.js

  var _pathRx = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/;

  function _pathSplit(fname){
    var result = _pathRx.exec(fname)
    return [result[1] || '', result[2] || '', result[3] || '', result[4] || ''];
  }

  function _pathNormArray(parts, allowAboveRoot){
    var up = 0,
      i = parts.length - 1,
      last
    while (i >= 0){
      last = parts[i];
      if (last === '.')
        parts.splice(i, 1)
      else if (last === '..'){
        parts.splice(i, 1)
        up++
      } else if (up){
        parts.splice(i, 1)
        up--
      }
      i--
    }
    if (allowAboveRoot)
      while (up--)
        parts.unshift('..')
    return parts
  }

  oj._pathResolve = function(){
    var resolvedPath = '',
      isAbsolute = false,
      i = arguments.length - 1,
      path
    while (i >= -1 && !isAbsolute){
      path = i >= 0 ? arguments[i] : process.cwd();
      if ((typeof path !== 'string') || !path)
        continue;
      resolvedPath = path + '/' + resolvedPath
      isAbsolute = path.charAt(0) === '/'
      i--
    }
    resolvedPath = _pathNormArray(resolvedPath.split('/').filter(function(p){
      return !!p;
    }), !isAbsolute).join('/')
    return ((isAbsolute ? '/' : '') + resolvedPath) || '.'
  }

  oj._pathNormalize = function(path){
    var isAbsolute = path.charAt(0) === '/',
    trailingSlash = path.substr(-1) === '/'
    path = _pathNormArray(path.split('/').filter(function(p){
      return !!p
    }), !isAbsolute).join('/')
    if (!path && !isAbsolute)
      path = '.'
    if (path && trailingSlash)
      path += '/'
    return (isAbsolute ? '/' : '') + path
  }

  oj._pathJoin = function(){
    var paths = slice.call(arguments, 0)
    return oj._pathNormalize(paths.filter(function(p, index){
      return p && typeof p === 'string'
    }).join('/'))
  }

  oj._pathDirname = function(path){
    var result = _pathSplit(path),
    root = result[0],
    dir = result[1]
    if (!root && !dir)
      return '.'
    if (dir)
      dir = dir.substr(0, dir.length - 1)
    return root + dir
  }

}).call(this);