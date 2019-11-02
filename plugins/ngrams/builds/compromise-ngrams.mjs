const defaults = {
  max: 4,
  min: 1,
};

const oneSize = function(list, size) {
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

const allGrams = function(list, options) {
  // support {size:2} syntax
  if (options.size) {
    options.min = options.size;
    options.max = options.size;
  }
  let max = options.max || defaults.max;
  let min = options.min || defaults.min;
  let arr = [];
  for (let size = min; size <= max; size += 1) {
    arr = arr.concat(oneSize(list, size));
  }
  return arr
};
var getGrams = allGrams;

const defaults$1 = {
  max: 4,
  min: 1,
};

const oneSize$1 = function(list, size) {
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

const startGrams = function(list, options) {
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
var startGrams_1 = startGrams;

const defaults$2 = {
  max: 4,
  min: 1,
};

const oneSize$2 = function(list, size) {
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

const endGrams = function(list, options) {
  // support {size:2} syntax
  if (options.size) {
    options.min = options.size;
    options.max = options.size;
  }
  let max = options.max || defaults$2.max;
  let min = options.min || defaults$2.min;
  let arr = [];
  for (let size = min; size <= max; size++) {
    arr = arr.concat(oneSize$2(list, size));
  }
  return arr
};
var endGrams_1 = endGrams;

// tokenize by term
const tokenize = function(doc) {
  let list = doc.json({ terms: { clean: true }, text: false }).map(o => {
    return o.terms.map(t => t.clean)
  });
  return list
};
var tokenize_1 = tokenize;

const sort = function(arr) {
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
var sort_1 = sort;

const addMethod = function(Doc) {
  /** list all repeating sub-phrases, by word-count */
  Doc.prototype.ngrams = function(obj) {
    let list = tokenize_1(this);
    let arr = getGrams(list, obj || {});
    arr = sort_1(arr);
    return arr
  };
  Doc.prototype.nGrams = Doc.prototype.ngrams;

  /** n-grams with one word */
  Doc.prototype.unigrams = function(n) {
    let arr = getGrams(tokenize_1(this), { max: 1, min: 1 });
    arr = sort_1(arr);
    if (typeof n === 'number') {
      arr = arr[n];
    }
    return arr
  };
  Doc.prototype.uniGrams = Doc.prototype.unigrams;

  /** n-grams with two words */
  Doc.prototype.bigrams = function(n) {
    let arr = getGrams(tokenize_1(this), { max: 2, min: 2 });
    arr = sort_1(arr);
    if (typeof n === 'number') {
      arr = arr[n];
    }
    return arr
  };
  Doc.prototype.biGrams = Doc.prototype.bigrams;

  /** n-grams with two words */
  Doc.prototype.trigrams = function(n) {
    let arr = getGrams(tokenize_1(this), { max: 3, min: 3 });
    arr = sort_1(arr);
    if (typeof n === 'number') {
      arr = arr[n];
    }
    return arr
  };
  Doc.prototype.triGrams = Doc.prototype.trigrams;

  /** list all repeating sub-phrases, using the first word */
  Doc.prototype.startgrams = function(obj) {
    let list = tokenize_1(this);
    let arr = startGrams_1(list, obj || {});
    arr = sort_1(arr);
    return arr
  };
  Doc.prototype.startGrams = Doc.prototype.startgrams;

  /** list all repeating sub-phrases, connected to the last word of each phrase */
  Doc.prototype.endgrams = function(obj) {
    let list = tokenize_1(this);
    let arr = endGrams_1(list, obj || {});
    arr = sort_1(arr);
    return arr
  };
  Doc.prototype.endGrams = Doc.prototype.endgrams;
};
var src = addMethod;

export default src;
