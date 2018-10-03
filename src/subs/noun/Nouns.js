
const buildClass = function(View) {

  class Nouns extends View {
    constructor( phrases = [] , stack ) {
      super(phrases, stack);
    }
    plurals() {
      console.log('works');
      return this;
    }
  }

  return Nouns;
};
module.exports = buildClass;
