//build this class
const subClass = function(Document) {

  class Term extends Document {
    isTerm() {
      console.log('it works!');
      return this;
    }
  }
  return Term;

};
module.exports = subClass;
