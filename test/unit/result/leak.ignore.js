var test = require('tape');
var iterate = require('leakage').iterate;
var nlp = require('../lib/nlp');
// var memwatch = require('memwatch-next');

// function fileSize(size) {
//   var e = (Math.log(size) / Math.log(1e3)) | 0;
//   return +(size / Math.pow(1e3, e)).toFixed(2) + ' ' + ('kMGTPEZY'[e - 1] || '') + 'B';
// }
// var heapUsed = process.memoryUsage().heapUsed;
// console.log('Program is using ' + fileSize(heapUsed) + ' kb of Heap.');

test('compromise does not mem-leak', function(t) {
  iterate(100, () => {
    var r = nlp('please no do not leak');
  //var m = r.match('do not .');
  });
  t.ok(true, 'does not leak');
  t.end();
});

// memwatch.on('leak', function(info) {
//   console.log(info);
// });
// var r = nlp('please no do not leak');
// var hd = new memwatch.HeapDiff();
// r = nlp('please no do no2t leak');
// r = nlp('pleease no do not leak');
// var diff = hd.end();
// console.log(diff.change.details);
