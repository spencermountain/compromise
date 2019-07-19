/* break-down a match expression into this:
{
  normal:'',
  tag:'',
  regex:'',

  start:false,
  end:false,
  negative:false,
  anything:false,
  greedy:false,
  optional:false,

  capture:false,
  choices:[],
}
*/
const end = function(str) {
  return str[str.length - 1]
}
const start = function(str) {
  return str[0]
}
const stripStart = function(str) {
  return str.substr(1)
}
const stripEnd = function(str) {
  return str.substr(0, str.length - 1)
}
const stripBoth = function(str) {
  str = stripStart(str)
  str = stripEnd(str)
  return str
}

//
const token = function(w) {
  let obj = {}
  //collect any flags (do it twice)
  for (let i = 0; i < 2; i += 1) {
    //back-flags
    if (end(w) === '+') {
      obj.greedy = true
      w = stripEnd(w)
    }
    if (w !== '*' && end(w) === '*') {
      obj.greedy = true
      w = stripEnd(w)
    }
    if (end(w) === '?') {
      obj.optional = true
      w = stripEnd(w)
    }
    if (end(w) === '$') {
      obj.end = true
      w = stripEnd(w)
    }
    //front-flags
    if (start(w) === '^') {
      obj.start = true
      w = stripStart(w)
    }
    if (start(w) === '!') {
      obj.negative = true
      w = stripStart(w)
    }
    //wrapped-flags
    if (start(w) === '(' && end(w) === ')') {
      obj.choices = w.split('|')
      //remove '(' and ')'
      obj.choices[0] = stripStart(obj.choices[0])
      let last = obj.choices.length - 1
      obj.choices[last] = stripEnd(obj.choices[last])
      obj.choices = obj.choices.filter(s => s)
      //recursion alert!
      obj.choices = obj.choices.map(token)
      w = ''
    }
    //capture group
    if (start(w) === '[' || end(w) === ']') {
      obj.capture = true
      w = stripBoth(w)
    }
    //regex
    if (start(w) === '/' && end(w) === '/') {
      w = stripBoth(w)
      obj.regex = new RegExp(w)
      return obj
    }
  }

  //do the actual token content
  if (start(w) === '#') {
    obj.tag = stripStart(w)
    return obj
  }
  if (w === '.') {
    obj.anything = true
    return obj
  }
  //support alone-astrix
  if (w === '*') {
    obj.anything = true
    obj.greedy = true
    obj.optional = true
    return obj
  }
  if (w) {
    //somehow handle encoded-chars?
    obj.normal = w.toLowerCase()
  }
  return obj
}
module.exports = token
