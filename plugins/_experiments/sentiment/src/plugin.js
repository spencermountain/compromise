import { emoji_object_regex, emoji_regex, emoticon_regex, emoticons, emojis } from './emoji.js'
import { pattern_en, pattern_en_keys } from './data/index.js'
import { labelWordArray, averageArray, value_limit, chunkArrays } from './lib.js'



const sentimentComp = {
  /** add a method */
  api: (View) => {


    View.prototype.sentiment = function (addMood = false, addSummary = false) {
      //console.log('addMood: ', addMood);
      //console.log('addSummary: ', addSummary);
      // Ensure that inputStr is text
      let inputStr = this.text();
      let isInputValid = typeof inputStr === 'string';
      if ((isInputValid === false) || (inputStr === '')) {
        return { 'error': 'Input must be a string containing text.' };
      }

      // SET DEFAULTS
      //
      // Create default return object with scores of 0
      let returnObj = { 'polarity': 0, 'subjectivity': 0 };
      // Create default empty summary array
      let summaryArr = [];

      // INPUT STRING PROCESSING
      // 
      // Remove sarcasm symbols [!] and (!), if present
      inputStr = inputStr.replace(/\(!\)|\[!\]/g, '').replace(/\s+/g, ' ').trim();
      // Create array of emoticons from input string
      let emoticonArr = inputStr.match(emoticon_regex) || [];
      //console.log('emoticonArr: ', emoticonArr);
      // Create array of emoticon values using emoticonArr
      let emoticonValArr = emoticonArr.map(function (element) { return parseFloat(emoticons[element]) }) || [];
      //console.log('emoticonValArr: ', emoticonValArr);
      // From inputText, get all the emojis which have scores
      let emojisOnlyArr = inputStr.match(emoji_object_regex) || [];
      //console.log('emojisOnlyArr: ', emojisOnlyArr);
      // Get all the values of the emojis in emojisOnlyArr
      let emojiValArr = emojisOnlyArr.map(function (element) { return parseFloat(emojis[element]) }) || [];
      //console.log('emojiValArr: ', emojiValArr);
      // Add emojisOnlyArr into emoticonArr
      emoticonArr = emoticonArr.concat(emojisOnlyArr);
      //console.log('emoticonArr: ', emoticonArr);
      // Add emoticonValArr into emoticonValArr
      emoticonValArr = emoticonValArr.concat(emojiValArr);
      //console.log('emoticonValArr: ', emoticonValArr);
      // Remove emoticons from inputStr,
      // remove emojis,
      // replace multiple exclamation marks with 1,
      // remove apostrophes,
      // and change entire string to lower case
      inputStr = inputStr.replace(emoticon_regex, '').replace(emoji_regex, ' ').replace(/\s+/g, ' ').replace(/!{2,}/g, '!').replace(/['’]/g, '').trim().toLowerCase();
      //console.log('inputStr: ', inputStr);
      // From inputStr, create array containing only words listed in pattern_en or exclamation marks
      let wordArr = (inputStr.match(/\w+|!/g)).filter(function (element) {
        return (pattern_en_keys.includes(element) || element.includes('!'));
      });
      //console.log('wordArr: ', wordArr);
      // Create array of labels of types of words in wordArr
      let labelInfoObj = labelWordArray(wordArr);
      //console.log('labelInfoObj: ', labelInfoObj);
      // If wordArr is now empty,
      // return an object with polarity and subjectivity of 0,
      // as well as mood and summary information, if those flags
      // are set
      if ((wordArr.length === 0) || (labelInfoObj.hasOwnProperty('error'))) {
        if (addMood === true) {
          returnObj.mood = averageArray(emoticonValArr);
          // If addSummary is true, add scored_icons
          if (addSummary === true) {
            let summaryObj = {};
            summaryObj.scored_icons = emoticonArr;
            summaryObj.mood = emoticonValArr;
            summaryArr.push(summaryObj);
          }
        }
        if (addSummary === true) { returnObj.summary = summaryArr; }
        return returnObj;
      }
      // Since labelInfoObjn returned valid data,
      // it's time to chunk the words and labels
      // in groupd, each containing just 1
      // 'opinion'/ 'opinion!', and the closest
      // preceeding negation and intensifiers,
      // if included
      let chunkInfoObj = chunkArrays(labelInfoObj.words, labelInfoObj.labels);
      //console.log('chunkInfoObj', chunkInfoObj);
      let wordArr2d = chunkInfoObj.word_chunks;
      let labelArr2d = chunkInfoObj.label_chunks;

      // VALUE CALCULATION
      // 
      // Create polarityArr and subjectivityArr arrays
      // to hold individual calculation results before
      // averaging them at the end.
      let polarityValArr = [];
      let subjectivityValArr = [];
      // Iterate through arrays to calculate polarity and subjectivity
      for (let index = 0; index < labelArr2d.length; index++) {
        // Prepare this iteration's summary object
        let summaryObject = {};
        // Add scored_words index
        summaryObject.scored_words = wordArr2d[index];
        // If 'opinion!' exists, add '!' to scored_words array
        if (labelArr2d[index].indexOf('opinion!') > -1) { summaryObject.scored_words.push('!'); }
        // If a 'negation' exists, set value of multiplier
        // to -0.5, otherwise, set it to 1
        let negationMultiplier = labelArr2d[index].indexOf('negation') > -1 ? -0.5 : 1;
        // If an 'intensifier' exists, calculate value,
        // otherwise, default to 1
        let intensityMultiplier = 1;
        // Get index of location of intensifier for this index
        let intensifierIndex = labelArr2d[index].indexOf('intensifier');
        // If an intensifier exists...
        if (intensifierIndex > -1) {
          // ...get corresponding intensity score
          // from pattern_en object
          intensityMultiplier = parseFloat(pattern_en[wordArr2d[index][intensifierIndex]][0].replace(/i/g, ''));
          // if negationMultiplier = -0.5, then
          // use inverse of intensityMultiplier
          if (negationMultiplier === -0.5) { intensityMultiplier = 1 / intensityMultiplier }
        }
        // Find 'opinion' or 'opinion!' in current array
        let opinionLoc = Math.max(labelArr2d[index].indexOf('opinion'), labelArr2d[index].indexOf('opinion!'));
        // If 'opinion!' is the current array,
        // set exclamationMultiplier to 1.25,
        // otherwise set it at 1
        let exclamationMultiplier = labelArr2d[index].indexOf('opinion!') > -1 ? 1.25 : 1;
        // Use location of 'opinion' in current array to
        // get polarity and subjectivity values, and
        // then multiply them by the appropriate multipliers
        let polarityVal = (parseFloat(pattern_en[wordArr2d[index][opinionLoc]][1].replace(/p/g, ''))) * negationMultiplier * intensityMultiplier * exclamationMultiplier;
        let subjectivityVal = (parseFloat(pattern_en[wordArr2d[index][opinionLoc]][2].replace(/s/g, ''))) * intensityMultiplier;
        // Limit polarity to a range of -1 to 1
        polarityVal = value_limit(polarityVal, -1, 1);
        // Limit subjectiivity to a range of 0 to 1
        subjectivityVal = value_limit(subjectivityVal, 0, 1);
        polarityValArr.push(polarityVal);
        subjectivityValArr.push(subjectivityVal);
        // Add polarity and subjectivity of this iteration to summaryObject
        summaryObject.polarity = polarityVal;
        summaryObject.subjectivity = subjectivityVal;
        // Add this iteration's information to summary array
        summaryArr.push(summaryObject);
      }
      //console.log('polarityValArr', polarityValArr);
      //console.log('subjectivityValArr', subjectivityValArr);
      //console.log('summaryArr', summaryArr);
      // Average values in arrays to get respective scores
      let polarityScore = averageArray(polarityValArr);
      let subjectivityScore = averageArray(subjectivityValArr);
      returnObj.polarity = polarityScore;
      returnObj.subjectivity = subjectivityScore;
      if (addMood === true) {
        returnObj.mood = averageArray(emoticonValArr);
        // If addSummary is true, add scored_icons
        if (addSummary === true) {
          let summaryObj = {};
          summaryObj.scored_icons = emoticonArr;
          summaryObj.mood = emoticonValArr;
          summaryArr.push(summaryObj);
        }
      }
      if (addSummary === true) { returnObj.summary = summaryArr; }
      return returnObj;
    }
  }
}

export default sentimentComp


