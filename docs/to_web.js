let api = require('./api');
let arr = ['doc-inspect', 'word-changes', 'sentence-changes', 'match/tag'];
let all = {};
arr.forEach((str) => {
  Object.keys(api.generic[str]).forEach((name) => {
    all[name + '()'] = api.generic[str][name];
  });
});

let subsets = Object.keys(api.subsets);
subsets.forEach((k) => {
  // all[k + '()'] = {
  //   desc: 'Return all ' + k + ' in the document.',
  //   example: api.subsets[k].data.example.match(/^(.+).data\(/)[1],
  //   returns: 'Text',
  // };
  Object.keys(api.subsets[k]).forEach((name) => {
    if (name === 'data') {
      all[k + '()'] = api.subsets[k][name];
    } else {
      all[k + '().' + name + '()'] = api.subsets[k][name];
    }
  });
});
console.log(all);
console.log(Object.keys(all).length);
