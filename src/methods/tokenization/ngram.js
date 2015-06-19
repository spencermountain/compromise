//split a string into all possible parts

module.exports = function (text, options) {
  options = options || {}
  var min_count = options.min_count || 1; // minimum hit-count
  var max_size = options.max_size || 5; // maximum gram count
  var REallowedChars = /[^a-zA-Z'\-]+/g; //Invalid characters are replaced with a whitespace
  var i, j, k, textlen, s;
  var keys = [null];
  var results = [];
  max_size++;
  for (i = 1; i <= max_size; i++) {
    keys.push({});
  }
  // clean the text
  text = text.replace(REallowedChars, " ").replace(/^\s+/, "").replace(/\s+$/, "");
  text = text.toLowerCase()
  // Create a hash
  text = text.split(/\s+/);
  for (i = 0, textlen = text.length; i < textlen; i++) {
    s = text[i];
    keys[1][s] = (keys[1][s] || 0) + 1;
    for (j = 2; j <= max_size; j++) {
      if (i + j <= textlen) {
        s += " " + text[i + j - 1];
        keys[j][s] = (keys[j][s] || 0) + 1;
      } else {
        break
      }
    }
  }
  // map to array
  i = undefined;
  for (k = 1; k < max_size; k++) {
    results[k] = [];
    var key = keys[k];
    for (i in key) {
      if (key.hasOwnProperty(i) && key[i] >= min_count) {
        results[k].push({
          "word": i,
          "count": key[i],
          "size": k
        })
      }
    }
  }
  results = results.filter(function (s) {
    return s !== null
  })
  results = results.map(function (r) {
    r = r.sort(function (a, b) {
      return b.count - a.count
    })
    return r;
  });
  return results
}

//console.log(module.exports("i really think that we all really think it's all good"))
// console.log(module.exports("i said i rule", {max_size:1})) // word-count
