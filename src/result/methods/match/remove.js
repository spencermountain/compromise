'use strict';

const remove = (Text) => {

  const methods = {

    /** like .match(), but negative (filter-out the matches)*/
    remove: function (reg) {
      //if there's no reg, remove these selected terms
      this.list.forEach((ts) => {
        ts.remove(reg)
      })
      return this.parent
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
