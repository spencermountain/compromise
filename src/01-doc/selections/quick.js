//these are selections that don't require their own subclasses/methods
module.exports = {
  clauses: function(doc) {
    // console.log('---hi!--');
    // let m = doc.split('#Comma');
    return doc;
  },
  questions: function(doc) {
    let list = doc.list.filter(p => {
      return p.lastTerm().hasQuestionMark();
    });
    return doc.buildFrom(list);
  },
  sentences: function(doc) {
    let list = doc.list.filter(p => {
      return p.lastTerm().hasQuestionMark() !== true;
    });
    return doc.buildFrom(list);
  }
};
