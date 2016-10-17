'use strict';
const Terms = require('../../terms');

const genericMethods = (Result) => {

  const methods = {
    /** how many results are there?*/
    count : function() {
      return this.list.length;
    },


    /** get the nth term of each result*/
    term : function(n) {
      let list = this.list.map((ts) => {
        let arr = [];
        let el = ts.terms[n];
        if (el) {
          arr = [el];
        }
        return new Terms(arr, this.context);
      });
      return new Result(list, this.context);
    },
    /**use only the first result */
    first : function(n) {
      if (!n && n !== 0) {
        return this.get(0);
      }
      return new Result(this.list.slice(0, n), this.context);
    },
    /**use only the last result */
    last : function(n) {
      if (!n && n !== 0) {
        return this.get(this.list.length - 1);
      }
      let end = this.list.length;
      let start = end - n;
      return new Result(this.list.slice(start, end), this.context);
    },
    /** use only the nth result*/
    get : function(n) {
      //return an empty result
      if ((!n && n !== 0) || !this.list[n]) {
        return new Result([], this.context);
      }
      let ts = this.list[n];
      return new Result([ts], this.context);
    },

    /**copy data properly so later transformations will have no effect*/
    clone: function() {
      let list = this.list.map((ts) => {
        return ts.clone();
      });
      return new Result(list);
    },

    /**turn all sentences into one, for example*/
    flatten: function() {
      let list = this.list.reduce((all, ts) => {
        all = all.concat(ts.terms);
        return all;
      }, []);
      let terms = new Terms(list);
      return new Result([terms], this.context);
    },
    /**tag all the terms in this result as something */
    tag: function(tag, reason) {
      this.terms.forEach((t) => {
        t.tagAs(tag, reason);
      });
      return this;
    },
    /**remove a tag in all the terms in this result (that had it) */
    unTag: function(tag, reason) {
      this.terms.forEach((t) => {
        delete t.tag[tag];
      });
      return this;
    },

    replace: function(text) {
      this.list.forEach((ts) => {
        ts.terms.forEach((t) => {
          t.text = text;
        });
      });
      return this;
    },

    expand: function() {
      this.list.forEach((ts) => {
        ts.terms.forEach((t, i) => {
          if (t.silent_term) {
            if (t.term.isTitlecase()) {
              t.text = t.silent_term;
              t.text = t.term.titlecase();
            } else {
              t.text = t.silent_term;
            }
            //add whitespace too
            let last = ts.terms[i - 1];
            if (last) {
              last.whitespace.after = ' ';
            }
          }
        });
      });
      return this;
    }
  };

  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};

module.exports = genericMethods;
