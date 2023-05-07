/* eslint-disable */
import { intensifiers, negations } from './data/index.js'

// HELPER FUNCTIONS



/**
* Label the words of the input array as either 'negation', 'instensifier', 'opinion', or 'opinion!'
* ('opinion!' is an opinion word that is followed by an exclamation mark)
*
* @author Scott Cram
*
* @param {Array} inputArr - The array to be labeled
* 
* @returns {Object} labelReturnObj - Object consisting of labeling results, including:
* @returns {Array} labelReturnObj.words - words from inputArr, less any exclamation marks
* @returns {Array} labelReturnObj.labels - array of word types that act as labels for each element in labelReturnObj.words
*/
function labelWordArray(inputArr) {
  // Return error array if inputArr has no elements
  if (inputArr.length === 0) { return { 'error': 'input array has no elements' } }
  // Initialize variables
  let labelReturnObj = { 'words': [], 'labels': [] };
  let wordsArr = inputArr;
  let labelsArr = [];
  // Classify each word in Array as
  // either 'em' (exclamation mark), negation', 'intensifier', or 'opinion'
  inputArr.forEach(function (element, index) {
    if (element.includes('!')) {
      labelsArr[index] = 'em';
      return;
    }
    if (negations.includes(element)) {
      labelsArr[index] = 'negation';
      return;
    }
    if (intensifiers.includes(element)) {
      labelsArr[index] = 'intensifier';
      return;
    }
    labelsArr[index] = 'opinion';
  });
  // In labelsArr, look for any instances of
  // 'opinion' followed by 'em', and if found,
  // convert 'opnion' to 'opinion!', remove 'em',
  // and remove exclamation mark from wordsArr
  for (let countdown = labelsArr.length - 1; countdown >= 0; countdown--) {
    if (countdown < labelsArr.length - 1) {
      if ((labelsArr[countdown] === 'opinion') && (labelsArr[countdown + 1] === 'em')) {
        labelsArr[countdown] = 'opinion!';
        labelsArr.splice(countdown + 1, 1);
        wordsArr.splice(countdown + 1, 1);
      }
    }
  }
  // If there is not at least 1 'opinion' in
  // labelsArr, then return object with error
  if ((labelsArr.indexOf('opinion') < 0) && (labelsArr.indexOf('opinion!') < 0)) {
    return { 'error': 'no opinion-based words found' };
  }
  // Each 'opinion'/'opinion!' is only modified
  // by preceeding words, so ensure that the last
  // item in wordsArr and labelArr is an 'opinion'/'opinion!'
  wordsArr = wordsArr.slice(0, Math.max(labelsArr.lastIndexOf('opinion'), labelsArr.lastIndexOf('opinion!')) + 1);
  labelsArr = labelsArr.slice(0, Math.max(labelsArr.lastIndexOf('opinion'), labelsArr.lastIndexOf('opinion!')) + 1);
  labelReturnObj.words = wordsArr;
  labelReturnObj.labels = labelsArr;
  return labelReturnObj;
}

/**
* Find indices to split array at a given word
*
* @author Scott Cram
*
* @param {Array} startingArr - The array to be split
* @param {string} splitWord - The word at which split
*
* @returns {Array} splitPoints - Array of numbers that, when used in pairs for Array.splice(), cane be used to split the array so that only once occurence of splitWord appears
*  
* 
*/

function findArraySplitPoints(startingArr, splitWord) {
  // Count how many times the splitWord occurs in startingArr
  let howManySplitWords = startingArr.reduce(function (accumulator, currentValue) {
    if (currentValue.match(splitWord) !== null) { accumulator++ }
    return accumulator;
  }, 0);
  // If count is less than zero, return empty array
  if (howManySplitWords < 1) {
    return [];
  }
  // Using the above count of splitWord occurences,
  // locate splice points for array
  let startArrCount = 0;
  let splitWordCount = 1;	// We can now assume at least 1 occurence of splitWord
  let splitPoints = [startArrCount];
  startingArr.forEach(function (element, index) {
    if ((element.match(splitWord) !== null) && (splitWordCount < howManySplitWords)) {
      splitPoints.push(index + 1);
      splitPoints.push(index + 1);
      startArrCount = index + 1;
      splitWordCount++;
      return;
    }
    if ((element.match(splitWord) !== null) && (splitWordCount === howManySplitWords)) {
      splitPoints.push(startingArr.length);
    }
  });
  return splitPoints;
}

/**
* Chunk up included arrays into subarrays, with each subarray containing only one 'opinion'/'opinion!' and single preceeding negation and/or modifier
*
* @author Scott Cram
*
* @param {Array} wordsArr - Array of words to be chunked
* @param {Array} labelsArr - Array of labels to be chunked
* 
* @returns {Object} chunks - Object consisting of chunking results, including:
* @returns {Array} chunks.words - words from inputArr, less any exclamation marks
* @returns {Array} chunks.labels - 2D array of word types
*/
function chunkArrays(wordsArr, labelsArr) {
  // Initialize variables
  let wordsArr2d = [];
  let labelsArr2d = [];
  let chunkReturnObj = { 'word_chunks': wordsArr2d, 'label_chunks': labelsArr2d };
  // Find points where 'opinion'/'opinion!' can be split up in array,
  // and store them in wordLocs (word locations)
  let wordLocs = findArraySplitPoints(labelsArr, 'opinion');
  // Use parameters stored in wordLocs array to
  // create 2d arrays, grouping a 'opinion' with any
  // preceeding negations and/or intensifiers.
  for (let index = 0; index < wordLocs.length; index += 2) {
    wordsArr2d.push(wordsArr.slice(wordLocs[index], wordLocs[index + 1]));
    labelsArr2d.push(labelsArr.slice(wordLocs[index], wordLocs[index + 1]));
  }
  // Go through each subarray, and only keep 
  // 1 closest preceeding negation, as well as
  // 1 closest preceeding intensifier

  // Iterate through labelsArr2d to work with each subarray 
  labelsArr2d.forEach(function (element, index) {
    // Create array to hold location of a
    // single 'negation' (index 0), a
    // single 'intensifier' (index 1), and
    // 'opinion'/'opinion!'
    let tempLocArr = [];
    // Get values of last occurences of each type of words
    tempLocArr.push(element.lastIndexOf('negation'));
    tempLocArr.push(element.lastIndexOf('intensifier'));
    tempLocArr.push(Math.max(element.lastIndexOf('opinion'), element.lastIndexOf('opinion!')));
    // Filter words and labels down to just the items at the indices in tempLocArr
    wordsArr2d[index] = wordsArr2d[index].filter(function (_, i) {
      return tempLocArr.includes(i);
    });
    labelsArr2d[index] = labelsArr2d[index].filter(function (_, i) {
      return tempLocArr.includes(i);
    });
  });
  // chunkReturnObj = {'word_chunks': wordsArr2d, 'label_chunks': labelsArr2d};
  chunkReturnObj.word_chunks = wordsArr2d;
  chunkReturnObj.label_chunks = labelsArr2d;
  return chunkReturnObj;
}

/**
* Limit a value inside a certain range
* 
*
* Original version:
* @author w3resource
* @see {@link https://www.w3resource.com/javascript-exercises/JavaScript: Limit a value inside a certain range} 
*
* @param {number} val - The value to be tested for range
* @param {number} min - The minimum amount in the desired range
* @param {number} max - The maximum amount in the desired range
*
* @returns {number} value - If the val input is within the range of min to max, val will be returned. If val is higher than max, then max will be returned. If val is lower than min, then min will be returned.
* 
*/
function value_limit(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}

// Average all values in inputArr together
// or leave at 0, if array is empty.
function averageArray(inputArr) {
  if (inputArr.length === 0) { return 0; }
  return inputArr.reduce(function (accum, currentVal) {
    return accum + currentVal;
  }, 0) / inputArr.length;
}

export { labelWordArray, averageArray, value_limit, chunkArrays }