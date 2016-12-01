'use strict';

const replaceMethods = (Terms) => {
  const methods = {

    /**swap this for that */
    replace: function (reg, str) {
      //in this form, we 'replaceWith'
      if (str === undefined) {
        return this.replaceWith(reg)
      }
      ts.replaceWith(str)
      return this
    },

    /**swap this for that */
    replaceWith: function (str, tag) {
      let ts = Terms.fromString(str)
      if (tag) {
        ts.set_tag(tag, 'user-given')
      }
      this.each((i, len) => {
        console.log(i + ' - ' + len)
        console.log(this.terms.slice(i, i + len).map((t) => t.normal))
        console.log('')
      })
      return this
    }

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = replaceMethods;;
