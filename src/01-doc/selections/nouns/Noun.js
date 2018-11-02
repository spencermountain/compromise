//build this class 
const subClass = function(Document) {

  class Noun extends Document {
    toPlural() {
      console.log('it works!');
      return this;
    }
  }
  return Noun;

};
module.exports = subClass;
