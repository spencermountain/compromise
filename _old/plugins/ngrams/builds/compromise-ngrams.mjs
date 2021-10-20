/* compromise-ngrams 0.0.6 MIT */
var defaults = {
  max: 4,
  min: 1
};

var oneSize = function oneSize(list, size) {
  var grams = {}; // count each instance

  list.forEach(function (terms) {
    for (var i = 0; i < terms.length; i += 1) {
      var slice = terms.slice(i, i + size);

      if (slice.length === size) {
        var str = slice.join(' ');

        if (grams.hasOwnProperty(str)) {
          grams[str].count += 1;
        } else {
          grams[str] = {
            size: size,
            count: 1
          };
        }
      }
    }
  }); // turn them into an array

  var arr = Object.keys(grams).map(function (k) {
    grams[k].normal = k;
    return grams[k];
  });
  return arr;
};

var allGrams = function allGrams(list, options) {
  // support {size:2} syntax
  if (options.size) {
    options.min = options.size;
    options.max = options.size;
  }

  var max = options.max || defaults.max;
  var min = options.min || defaults.min;
  var arr = [];

  for (var size = min; size <= max; size += 1) {
    arr = arr.concat(oneSize(list, size));
  }

  return arr;
};

var getGrams = allGrams;

var defaults$1 = {
  max: 4,
  min: 1
};

var oneSize$1 = function oneSize(list, size) {
  var grams = {}; // count each instance

  list.forEach(function (terms) {
    for (var i = 0; i <= terms.length; i += 1) {
      var slice = terms.slice(0, i);

      if (slice.length === size) {
        var str = slice.join(' ');

        if (grams.hasOwnProperty(str)) {
          grams[str].count += 1;
        } else {
          grams[str] = {
            size: size,
            count: 1
          };
        }
      }
    }
  }); // turn them into an array

  var arr = Object.keys(grams).map(function (k) {
    grams[k].normal = k;
    return grams[k];
  });
  return arr;
};

var startGrams = function startGrams(list, options) {
  // support {size:2} syntax
  if (options.size) {
    options.min = options.size;
    options.max = options.size;
  }

  var max = options.max || defaults$1.max;
  var min = options.min || defaults$1.min;
  var arr = [];

  for (var size = min; size <= max; size++) {
    arr = arr.concat(oneSize$1(list, size));
  }

  return arr;
};

var startGrams_1 = startGrams;

var defaults$2 = {
  max: 4,
  min: 1
};

var oneSize$2 = function oneSize(list, size) {
  var grams = {}; // count each instance

  list.forEach(function (terms) {
    var len = terms.length;

    for (var i = 0; i <= terms.length; i += 1) {
      var slice = terms.slice(len - i, len);

      if (slice.length === size) {
        var str = slice.join(' ');

        if (grams.hasOwnProperty(str)) {
          grams[str].count += 1;
        } else {
          grams[str] = {
            size: size,
            count: 1
          };
        }
      }
    }
  }); // turn them into an array

  var arr = Object.keys(grams).map(function (k) {
    grams[k].normal = k;
    return grams[k];
  });
  return arr;
};

var endGrams = function endGrams(list, options) {
  // support {size:2} syntax
  if (options.size) {
    options.min = options.size;
    options.max = options.size;
  }

  var max = options.max || defaults$2.max;
  var min = options.min || defaults$2.min;
  var arr = [];

  for (var size = min; size <= max; size++) {
    arr = arr.concat(oneSize$2(list, size));
  }

  return arr;
};

var endGrams_1 = endGrams;

// tokenize by term
var tokenize = function tokenize(doc) {
  var list = doc.json({
    terms: {
      clean: true
    },
    text: false
  }).map(function (o) {
    return o.terms.map(function (t) {
      return t.clean;
    });
  });
  return list;
};

var tokenize_1 = tokenize;

var sort = function sort(arr) {
  arr = arr.sort(function (a, b) {
    //first sort them by count
    if (a.count > b.count) {
      return -1;
    }

    if (a.count < b.count) {
      return 1;
    } // in a tie, sort them by size


    if (a.size > b.size) {
      return -1;
    }

    if (a.size < b.size) {
      return 1;
    }

    return 0;
  });
  return arr;
};

var sort_1 = sort;

var addMethod = function addMethod(Doc) {
  /** list all repeating sub-phrases, by word-count */
  Doc.prototype.ngrams = function (obj) {
    var list = tokenize_1(this);
    var arr = getGrams(list, obj || {});
    arr = sort_1(arr);
    return arr;
  };

  Doc.prototype.nGrams = Doc.prototype.ngrams;
  /** n-grams with one word */

  Doc.prototype.unigrams = function (n) {
    var arr = getGrams(tokenize_1(this), {
      max: 1,
      min: 1
    });
    arr = sort_1(arr);

    if (typeof n === 'number') {
      arr = arr[n];
    }

    return arr;
  };

  Doc.prototype.uniGrams = Doc.prototype.unigrams;
  /** n-grams with two words */

  Doc.prototype.bigrams = function (n) {
    var arr = getGrams(tokenize_1(this), {
      max: 2,
      min: 2
    });
    arr = sort_1(arr);

    if (typeof n === 'number') {
      arr = arr[n];
    }

    return arr;
  };

  Doc.prototype.biGrams = Doc.prototype.bigrams;
  /** n-grams with three words */

  Doc.prototype.trigrams = function (n) {
    var arr = getGrams(tokenize_1(this), {
      max: 3,
      min: 3
    });
    arr = sort_1(arr);

    if (typeof n === 'number') {
      arr = arr[n];
    }

    return arr;
  };

  Doc.prototype.triGrams = Doc.prototype.trigrams;
  /** list all repeating sub-phrases, using the first word */

  Doc.prototype.startgrams = function (obj) {
    var list = tokenize_1(this);
    var arr = startGrams_1(list, obj || {});
    arr = sort_1(arr);
    return arr;
  };

  Doc.prototype.startGrams = Doc.prototype.startgrams;
  /** list all repeating sub-phrases, connected to the last word of each phrase */

  Doc.prototype.endgrams = function (obj) {
    var list = tokenize_1(this);
    var arr = endGrams_1(list, obj || {});
    arr = sort_1(arr);
    return arr;
  };

  Doc.prototype.endGrams = Doc.prototype.endgrams;
  /** list all repeating sub-phrases, connected to the last word of each phrase */

  Doc.prototype.edgegrams = function (obj) {
    var list = tokenize_1(this);
    var start = startGrams_1(list, obj || {});
    var end = endGrams_1(list, obj || {}); // combine them together

    var all = start.concat(end);
    var combine = all.reduce(function (h, a) {
      if (h[a.normal]) {
        h[a.normal].count += a.count;
      } else {
        h[a.normal] = a;
      }

      return h;
    }, {});
    var arr = Object.keys(combine).map(function (k) {
      return combine[k];
    });
    arr = sort_1(arr);
    return arr;
  };

  Doc.prototype.edgeGrams = Doc.prototype.edgegrams;
};

var src = addMethod;

export default src;
