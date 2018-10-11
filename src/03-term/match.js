
//ignore optional/greedy logic, straight-up term match
const doesMatch = function(t, reg) {
  if (reg.normal !== undefined) {
    return reg.normal === t.normal;
  }
  if (reg.tag !== undefined) {
    return t.tags[reg.rag] === true;
  }
  if (reg.choices !== undefined) {
    //recursion alert
    let foundOne = reg.choices.find(r => doesMatch(t, r));
    return foundOne !== undefined;
  }
  return false;
};
module.exports = doesMatch;
