import { unpack } from 'efrt'
import pattern_en_packed from './_pckd.js'


// Decompress above data
const pattern_en = unpack(pattern_en_packed);

// Add some data efrt 2.7.0 compression can't handle yet
// 
// Wait...you can add to a const? Yes!
// Ref: https://stackoverflow.com/a/23436563
let arrayInfo = ["i1.0", "p0.0", "s0.0"];
pattern_en['13th'] = arrayInfo;
pattern_en['20th'] = arrayInfo;
pattern_en['21st'] = arrayInfo;
pattern_en['2nd'] = arrayInfo;
pattern_en['3rd'] = arrayInfo;

// Sort all subarrays in alphabetical order
// resulting order and their corresponding
// indices will be:
// intensity		[0]
// polarity			[1]
// subjectivity	[2]
Object.values(pattern_en).forEach(function (element) {
  element.sort();
})
//console.log('pattern_en:', pattern_en);

// Find all keys from expanded pattern_en object
const pattern_en_keys = Object.keys(pattern_en);
//console.log('pattern_en_keys: ', pattern_en_keys);

// Find all intensifiers (keys whose values are not "i1.0") in pattern_en object
const intensifiers = Object.keys(pattern_en).filter(function (element) {
  return (pattern_en[element][0] != "i1.0");
});
//console.log('intensifiers', intensifiers);

// Set up dictionary of negations
const negations = ['not', 'no', 'never', 'neither', 'havent', 'hasnt', 'hadnt', 'cant', 'couldnt', 'shouldnt', 'wasnt', 'wont', 'wouldnt', 'dont', 'doesnt', 'didnt', 'isnt', 'arent', 'aint', 'mustnt', 'werent'];
//console.log('negations: ', negations);

export { pattern_en, pattern_en_keys, intensifiers, negations }