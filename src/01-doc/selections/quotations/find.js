
const findQuotations = function (doc) {
  let matches = doc.match('#Quotation+');
  // let found = [];
  // matches.list.forEach((ts) => {
  //   let open = 0;
  //   let start = null;
  //   //handle nested quotes - 'startQuote->startQuote->endQuote->endQuote'
  //   ts.terms.forEach((t, i) => {
  //     if (t.tags.StartQuotation === true) {
  //       if (open === 0) {
  //         start = i;
  //       }
  //       open += 1;
  //     }
  //     if (open > 0 && t.tags.EndQuotation === true) {
  //       open -= 1;
  //     }
  //     if (open === 0 && start !== null) {
  //       found.push(ts.slice(start, i + 1));
  //       start = null;
  //     }
  //   });
  //   //maybe we messed something up..
  //   if (start !== null) {
  //     found.push(ts.slice(start, ts.terms.length));
  //   }
  // });
  // matches.list = found;
  // if (typeof n === 'number') {
  //   matches = matches.get(n);
  // }
  return matches;
};
module.exports = findQuotations;
