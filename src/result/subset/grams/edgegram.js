'use strict';
//accept '5', [5], and {size:[5]}
const defaults = function(options) {
  if (typeof options === 'number' || (options && options.length !== undefined)) {
    options = {
      size : options
    };
  }
  options = options || {};
  if (typeof options.size === 'number') {
    options.size = [options.size];
  }
  if (options.size === undefined) {
    options.size = [1, 2, 3];
  }
  return options;
};

//sort the grams in an array
const toArray = function(obj) {
  let arr = [];
  Object.keys(obj).forEach((size) => {
    Object.keys(obj[size]).forEach((k) => {
      arr.push({
        text: k,
        count: obj[size][k],
        size: parseInt(size, 10)
      });
    });
  });
  //sort the array
  arr = arr.sort((a, b) => {
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

const startgram = function(ts, size) {
  if (size > 0 && ts.length >= size) {
    let gram = ts.slice(0, size);
    let str = gram.out('normal');
    return str;
  }
  return null;
};
const endgram = function(ts, size) {
  if (size > 0 && ts.length >= size) {
    let end = ts.length;
    let gram = ts.slice(end - size, end);
    let str = gram.out('normal');
    return str;
  }
  return null;
};

//start-grams
exports.start = function(r, options) {
  options = defaults(options);
  let grams = {};
  options.size.forEach((size) => {
    grams[size] = {};
    //count each gram #times
    r.list.forEach((ts) => {
      let str = startgram(ts, size);
      if (str) {
        grams[size][str] = grams[size][str] || 0;
        grams[size][str] += 1;
      }
    });
  });
  return toArray(grams);
};

//end-grams
exports.end = function(r, options) {
  options = defaults(options);
  let grams = {};
  options.size.forEach((size) => {
    grams[size] = {};
    //count each gram #times
    r.list.forEach((ts) => {
      let str = endgram(ts, size);
      if (str) {
        grams[size][str] = grams[size][str] || 0;
        grams[size][str] += 1;
      }
    });
  });
  return toArray(grams);
};
//start-grams+end-grams
exports.both = function(r, options) {
  options = defaults(options);
  let grams = {};
  options.size.forEach((size) => {
    grams[size] = {};
    //count each gram #times
    r.list.forEach((ts) => {
      //start
      let str = startgram(ts, size);
      if (str) {
        grams[size][str] = grams[size][str] || 0;
        grams[size][str] += 1;
      }
      //end
      str = endgram(ts, size);
      if (str) {
        grams[size][str] = grams[size][str] || 0;
        grams[size][str] += 1;
      }
    });
  });
  return toArray(grams);
};
