'use strict';


const applyTermList = function(TermList) {


  let methods = {
    /** remove all these selected terms from their sentences */
    remove: function() {
      this.arr.forEach((t) => {
        t.remove();
      });
      // this.arr = [];
      return this;
    },

    /** fake foreach */
    forEach(fn) {
      this.arr.forEach(fn);
      return this;
    },
    /** fake map */
    map(fn) {
      return this.arr.map(fn);
    },

    /** terms[0] wrapper */
    first() {
      return this.arr[0];
    },
    /** terms[1] wrapper */
    second() {
      return this.arr[1];
    },
    /** terms[2] wrapper */
    third() {
      return this.arr[2];
    },
    /** the last result. terms[terms.length-1] wrapper */
    last() {
      return this.arr[this.arr.length - 1];
    },
    /** add a new term before this one*/
    append(str) {
      this.arr.forEach((t) => {
        t.append(str);
      });
      return this.context.parent;
    },
    /** add a new term after this one*/
    prepend(str) {
      this.arr.forEach((t) => {
        t.prepend(str);
      });
      return this.context.parent;
    },
    /** turn this term into another one*/
    replace(str) {
      this.arr.forEach((t) => {
        t.replace(str);
      });
      return this.context.parent;
    },
    /** grab the sentence for each term*/
    sentences() {
      let sentences = this.arr.map((t) => {
        return t.context.sentence;
      });
      return new SentenceList(sentences);
    },
    /** flatten these terms into text */
    plaintext() {
      return this.arr.reduce((str, t) => {
        str += t.whitespace.before + t.text + t.whitespace.after;
        return str;
      }, '');
    },
    pretty() {
      this.arr.forEach((t) => {
        t.render('pretty');
      });
    },
    /** return unique terms and their frequencies */
    byFreq() {
      return helpers.byFreq(this.arr);
    },
    /** grab nth element, substitute for bracket notation */
    get(n) {
      return this.arr[n];
    },


    /** fake filter */
    filter : function(fn) {
      let arr = this.arr.filter(fn);
      return new TermList(arr);
    },
    /** fake foreach */
    forEach : function(fn) {
      let arr = this.arr.forEach(fn);
      return this;
    },
    /** detach these terms from any pass-by-reference mutations*/
    clone : function() {
      let arr = this.arr.map((t) => t.clone());
      return new TermList(arr);
    },
    /**fake slice  */
    slice : function(start, end) {
      let arr = this.arr.slice(start, end);
      return new TermList(arr);
    }
  };
  Object.keys(methods).forEach((k) => {
    TermList.prototype[k] = methods[k];
  });
};

const applyResult = function(Result) {
  const methods = [
    'remove',
    'forEach',
    'map',
    'first',
    'second',
    'third',
    'last',
    'append',
    'prepend',
    'replace',
    'sentences',
    'plaintext',
    'pretty',
    'byFreq',
    'get',
    'filter',
    'clone',
    'slice'
  ];
  methods.forEach((k) => {
    Result.prototype[k] = function() {
      return this.arr.map((ts) => {
        return ts[k]();
      });
    };
  });
};
module.exports = {
  applyTermList: applyTermList,
  applyResult: applyResult,
};
