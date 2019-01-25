//build this class
const subClass = function(Document) {

  class Person extends Document {
    nickname() {
      console.log('it works!');
      return this;
    }
  }
  return Person;

};
module.exports = subClass;
