import lz from './lz.js'
import fs from 'fs'

let string = fs.readFileSync('../../../plugins/speed/tests/files/freshPrince.txt').toString()
// string = "This is my compression test.";


console.log("Size of sample is: " + string.length, '\n\n');
let compressed = lz.compress(string);
// console.log(string)
// console.log(compressed)
console.log("\n\nSize of compressed sample is: " + compressed.length);
string = lz.decompress(compressed);



/*
[
  text,
  tag,
  post,
  pre
*/