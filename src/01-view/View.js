class Doc {
  constructor( list = [] , stack ) {
    this.list = list;
    Object.defineProperty(this, 'stack', {
      enumerable: false,
      value: stack
    });
    //add ourself to the stack
    this.stack.add(this);
  }
  text() {
    return this.list.reduce((str, p) => str + p.text(), '');
  }
  //go up one
  parent() {
    return this.stack.pop();
  }
}
//
Doc.prototype.match = function(str) {
  let matches = [];
  this.list.forEach((p) => {
    matches = matches.concat(p.match(str));
  });
  return new Doc(matches, this.stack);
};

const Nouns = require('./classes/Nouns')(Doc);
Doc.prototype.nouns = function() {
  return new Nouns(this.list, this.stack);
};

module.exports = Doc;
