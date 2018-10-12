//found a match? it's greedy? keep going!
const goGreedy = function(terms, t, reg) {
  for(; t < terms.length; t += 1) {
    if (terms[t].doesMatch(reg) === false) {
      return t;
    }
    console.log('       +', terms[t].normal);
  }
  return t;
};

//tries to match a sequence of terms, starting from here
const tryHere = function(terms, regs) {
  let t = 0;
  for(let r = 0; r < regs.length; r += 1) {
    // console.log(t + '   -' + terms[t].normal + ' - ' + regs[r].normal);
    let reg = regs[r];
    if (!terms[t]) {
      return false;
    }

    //looks like a match, continue
    if (reg.anything === true || terms[t].doesMatch(reg) === true) {
      t += 1;
      //keep it going!
      if (reg.greedy === true) {
        t = goGreedy(terms, t, reg);
      }
      // console.log('next');
      continue;
    }

    //bah, who cares, keep going
    // if (reg.optional === true) {
    // t += 1;
    // continue;
    // }
    console.log('   ❌\n\n');
    return false;
  }
  //we got to the end of the regs, and haven't failed!
  //return our result
  console.log('✔️', t);
  return terms.slice(0, t);
};
module.exports = tryHere;
