'use strict';
//more-spefic tags for a person
const wrestle = function(t) {
  //find an unknown gender
  if (t.pos.Person) {
    if (!t.pos.MalePerson && !t.pos.FemalePerson) {
      let gender = t.info('gender')
      if (gender) {
        t.tag(gender, 'wrestle-person')
      }
    }
  }
  return t
}

module.exports = wrestle
