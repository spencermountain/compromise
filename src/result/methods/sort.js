'use strict';
//alphabetical sorting of a termlist array
const alphaSort = function(r) {
  r.list.sort((a, b) => {
    //#1 performance speedup
    if (a === b) {
      return 0;
    }
    //#2 performance speedup
    if (a.terms[0] && b.terms[0]) {
      if (a.terms[0].normal > b.terms[0].normal) {
        return 1;
      }
      if (a.terms[0].normal < b.terms[0].normal) {
        return -1;
      }
    }
    //regular compare
    if (a.out('normal') > b.out('normal')) {
      return 1;
    }
    return -1;
  });
  return r;
};

const chronSort = function(r) {
  //pre-compute indexes
  let tmp = r.list.map((ts) => {
    return {
      ts: ts,
      index: ts.termIndex()
    };
  });
  tmp = tmp.sort((a, b) => {
    if (a.index > b.index) {
      return 1;
    }
    if (a.index === b.index) {
      return 0;
    }
    return -1;
  });
  //return ts objects
  r.list = tmp.map((o) => o.ts);
  return r;
};

const sortMethod = (Text) => {

  const methods = {

    /**reorder result.list alphabetically */
    sort: function (method) {
      if (!method || method === 'alpha' || method === 'alphabetical') {
        return alphaSort(this, Text);
      }
      if (method === 'chron' || method === 'chronological') {
        return chronSort(this, Text);
      }
      return this;
    },

    /**reverse the order of result.list */
    reverse: function () {
      this.list = this.list.reverse();
      return this;
    },

    unique: function () {
      let obj = {};
      this.list = this.list.filter((ts) => {
        let str = ts.out('root');
        if (obj[str]) {
          return false;
        }
        obj[str] = true;
        return true;
      });
      return this;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = sortMethod;
