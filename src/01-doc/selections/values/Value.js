//build this class
const subClass = function(Document) {

  class Value extends Document {
    toNumber() {
      console.log('it works!');
      return this;
    }
  }
  return Value;

};
module.exports = subClass;
