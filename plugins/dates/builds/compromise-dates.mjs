const addMethods = function(Doc, world) {
  world.addTags({
    FinancialQuarter: {
      // isA: 'Date',
      notA: 'Foo',
    },
  });

  /**  */
  class Dates extends Doc {
    longForm() {}
    shortForm() {}
  }

  Doc.prototype.dates = function(n) {
    let r = this.clauses();
    let dates = r.match('#Date+');
    if (typeof n === 'number') {
      dates = dates.get(n);
    }
    if (typeof n === 'number') {
      dates = dates.get(n);
    }
    return new Dates(dates.list, this, this.world)
  };
};

var src = addMethods;

export default src;
