
//patterns are .match() statements to be run after the tagger
const posthoc = function(ts) {
  const patterns = ts.world.patterns;
  Object.keys(patterns).forEach((k) => {
    ts.match(k).tag(patterns[k], 'post-hoc: ' + k);
  });
  return ts;
};
module.exports = posthoc;
