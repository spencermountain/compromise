'use strict';
const splitMethods = (Text) => {

  const methods = {

    /** do a regex-like search through terms and return a subset */
    match: function (reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        //an array of arrays
        let matches = ts.match(reg, verbose);
        matches.list.forEach((ms) => {
          list.push(ms);
        });
      });
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

    not: function(reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        let found = ts.not(reg, verbose);
        list = list.concat(found.list);
      });
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

    /** find the first result */
    // matchOne: function (reg, verbose) {
    //   for (let i = 0; i < this.list.length; i++) {
    //     let ms = this.list[i].match(reg, verbose);
    //     if (ms && ms.length) {
    //       let parent = this.parent || this;
    //       return new Text(ms, parent);
    //     }
    //   }
    //   return null;
    // },

    /** true/false if it countains atleast one match*/
    // has: function (reg, verbose) {
    //   for (let i = 0; i < this.list.length; i++) {
    //     let ms = this.list[i].match(reg, verbose);
    //     if (ms && ms.length) {
    //       return true;
    //     }
    //   }
    //   return false;
    // },

    if: function (reg, verbose) {
      let list = [];
      for(let i = 0; i < this.list.length; i++) {
        let m = this.list[i].match(reg, verbose);
        if (m.found) {
          list.push(this.list[i]);
        }
      }
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

    ifNo: function (reg, verbose) {
      let list = [];
      for(let i = 0; i < this.list.length; i++) {
        let m = this.list[i].match(reg, verbose);
        if (!m.found) {
          list.push(this.list[i]);
        }
      }
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

    /** return terms after this match */
    // after: function (reg) {
    //   let after = reg + ' *';
    //   return this.match(after).not(reg);
    // },
    //
    // /** return terms before this match */
    // before: function (reg) {
    //   let before = '* ' + reg;
    //   return this.match(before).not(reg);
    // },

  };
  //alias 'and'
  methods.and = methods.match;

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = splitMethods;
