//build this class
const subClass = function(Document) {

  class Adjective extends Document {
    toAdverb() {
      console.log('it works!');
      return this;
    }
  }
  return Adjective;

};
module.exports = subClass;
