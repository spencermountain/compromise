'use strict';

const deleteMethods = (Text) => {

  const methods = {

    /** destructive, mutating delete*/
    delete: function (reg) {
      //remove all of this, return parent
      if (!reg) {
        this.list.forEach((ts) => {
          ts.delete(reg);
        });
        return this.parent;
      }
      //return subset
      this.list.forEach((ts) => {
        ts.delete(reg);
      });
      return this;
    },

    // //like match, but removes matching terms from original
    // pluck: function (reg) {
    //   let list = [];
    //   this.forEach((ts) => {
    //     list = list.concat(ts.pluck(reg).list);
    //   });
    //   return new Text(list, this);
    // }

  };
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};
module.exports = deleteMethods;
