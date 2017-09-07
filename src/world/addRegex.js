//parse a key-value of regex-tag pairs into an array of regexps
//(on the World prototype)
const addRegex = function(obj) {
  obj = obj || {};
  let keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    let reg = new RegExp(keys[i], 'i');
    this.regex.push({
      reg: reg,
      tag: obj[keys[i]]
    });
  }
};
module.exports = addRegex;
