'use strict';

const remove = (Text) => {

  const methods = {

    /** like .match(), but negative (filter-out the matches)*/
    remove: function (reg) {
      //if there's no reg, remove these selected terms
      if (!reg) {
        this.list.forEach((ts) => {
          ts.terms.forEach((t) => {
            t.remove();
          });
        });
        this.list = [];
        return this;
      }
      //otherwise, remove these matches
      if (typeof reg === 'string') {
        let list = [];
        this.list.forEach((ts) => {
          let matches = ts.remove(reg, this.context);
          if (matches && matches.terms && matches.terms.length) {
            list.push(matches);
          }
        });
        this.list = list;
        return this;
      }
      //remove matching terms in this Result object
      if (typeof reg === 'object' && reg.constructor.name === 'Result') {
        // reg.check()
        // return this
      }
      return this
    },

    //like match, but removes matching terms from original
    pluck: function (reg) {
      let list = []
      this.forEach((ts) => {
        list = list.concat(ts.pluck(reg).list)
      })
      return new Text(list, this)
    }

  };
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};
module.exports = remove;
