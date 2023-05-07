/* eslint-disable */
import nlp from '../../../src/three.js'
import plg from './src/plugin.js'
nlp.plugin(plg)

// Tests
console.log("Test submissions to sentiment:");

console.log("");

console.log("INPUTS THAT RETURN ERRORS:");
console.log("-----");
console.log("No input:");
console.log("", nlp().sentiment());
// Expected result:
// {error: 'Input must be a string containing text.'}
console.log("-----");
console.log("Empty string:");
console.log("", nlp("").sentiment(""));
// Expected result:
// {error: 'Input must be a string containing text.'}
console.log("-----");
console.log("Object:");
console.log({ 'This': 'object', 'contains': 'words' }, nlp({ 'This': 'object', 'contains': 'words' }).sentiment());
console.log("-----");
// Expected result:
// {error: 'Input must be a string containing text.'}

console.log("");

console.log("BASIC EXPLANATIONS:");
console.log("-----");
console.log("Polarity is the negative or positive sentiment of the score, and ranges from -1.0 (negative sentiment) to 1.0 (positive sentiment). Neutral is anything around zero (usually -0.05 to 0.05).");
console.log("Subjectivity is a measure of how likely it is that the string is opinion-based, and ranges from 0 (not likely to be opinion-based) to 1.0 (highly likely to be opinion-based).");
console.log("-----");
console.log("sentiment looks for known opinion-based words. The following string has none:");
console.log("This movie exists.", nlp("This movie exists.").sentiment());
// Expected result:
// {polarity: 0, subjectivity: 0}
console.log("-----");
console.log("The following string has a single opinion-based word in it (\"good\"):");
console.log("This movie is good.", nlp("This movie is good.").sentiment());
// Expected result:
// {polarity: 0.7, subjectivity: 0.6}
console.log("-----");
console.log("The scores can be changed in several ways.");
console.log("This sentence adds the intensifier \"very\". Note how the scores change from above:");
console.log("This movie is very good.", nlp("This movie is very good.").sentiment());
// Expected result:
// {polarity: 0.9099999999999999, subjectivity: 0.78}
console.log("-----");
console.log("This sentence adds the negation \"not\". Note the effect of this on the scores:");
console.log("This movie is not good.", nlp("This movie is not good.").sentiment());
// Expected result:
// {polarity: -0.35, subjectivity: 0.6}
console.log("-----");
console.log("Adding an exclamation mark also affects scores:");
console.log("This movie is good!", nlp("This movie is good!").sentiment());
// Expected result:
// {polarity: 0.875, subjectivity: 0.6}
console.log("-----");
console.log("Combining a negation, intensifier, and an exclamation mark to the opinion-based word:");
console.log("This movie is not very good!", nlp("This movie is not very good!").sentiment());
// Expected result:
// {polarity: -0.33653846153846145, subjectivity: 0.46153846153846145}
console.log("-----");
console.log("However, sentiment only looks at the 1 closest preceeding negation (if present), the 1 closest preceeding intensifier (if present), and a single exclamation mark:");
console.log("This movie is not not really very good!!!!", nlp("This movie is not not really very good!!!!").sentiment());
// Expected result:
// {polarity: -0.33653846153846145, subjectivity: 0.46153846153846145}
console.log("-----");
console.log("If a negation and/or an intensifier follow the opinion-based word, they are ignored. The following sentence is scored as if (not very) didn't exist:");
console.log("This movie is good (not very).", nlp("This movie is good (not very).").sentiment());
// Expected result:
// {polarity: 0.7, subjectivity: 0.6}
console.log("-----");
console.log("Moving the (not very) phrase to before the opinion-based word makes a difference in the scores:");
console.log("This movie is (not very) good.", nlp("This movie is (not very) good.").sentiment());
// Expected result:
// {polarity: -0.26923076923076916, subjectivity: 0.46153846153846145}
console.log("-----");

console.log("");

console.log("MULTIPLE OPINION-BASED WORDS:");
console.log("-----");
console.log("Multiple opinion-based words can be used:");
console.log("It's not very good. In fact, it was bad.", nlp("It's not very good. In fact, it was bad.").sentiment());
// Expected result:
// {polarity: -0.48461538461538456, subjectivity: 0.5641192307692307}
console.log("-----");
console.log("When multiple opinion-based words are used, each opinion-based word is affected by the closest preceeding single negation and/or intensifier.");
console.log("The following sentence is scored differently than directly above because (not very) is attributed to the following opinion-based word (bad), rather than the opinion-based word before them (good):");
console.log("It's good (not very). In fact, it was bad.", nlp("It's good (not very). In fact, it was bad.").sentiment());
// Expected result:
// {polarity: 0.48461538461538456, subjectivity: 0.5564230769230769}
console.log("-----");

console.log("");

console.log("EMOJIS, EMOTIONS (\"SMILEYS\") AND MOOD:");
console.log("-----");
console.log("Here's a short text-style message, with no emojis or emoticons/smileys:");
console.log("Awesome. I love it!", nlp("Awesome. I love it!").sentiment());
// Expected result:
// {polarity: 0.8125, subjectivity: 0.8}
console.log("-----");
console.log("Polarity and subjectivity scores are measured solely from text, so they aren't affected by the includion of emojis or emoticons/smileys:");
console.log("Awesome. I love it!😍", nlp("Awesome. I love it!😍").sentiment());
// Expected result:
// {polarity: 0.8125, subjectivity: 0.8}
console.log("-----");
console.log("However, you can set the mood flag to true, and you'll see a mood score. The mood score is similar to polarity, but calculated from the emojis and emoticons/smileys.");
console.log("Just like polarity, mood can range from -1.0 (negative sentiment) to 1.0 (positive sentiment).");
console.log("Awesome. I love it!😍", nlp("Awesome. I love it!😍").sentiment(true));
// Expected result:
// {polarity: 0.8125, subjectivity: 0.8, mood: 0.678}
console.log("-----");
console.log("Naturally, you can use multiple emoticons/smileys, and this will change the mood score:");
console.log("Awesome.🎉 I love it! 🤗😍:-D", nlp("Awesome.🎉 I love it! 🤗😍:-D").sentiment(true));
// Expected result:
// {polarity: 0.8125, subjectivity: 0.8, mood: 0.8053333333333333}
console.log("-----");
console.log("You can even use mood score to detect cynicism, by noting when the polarity (text) is negative and mood (emoticons/smileys) is positive (or vice-versa):");
let sentimentVal = nlp("The movie wasn't that good.😉 ;-)").sentiment(true);
console.log("The movie wasn't that good.😉 ;-)", sentimentVal);
// Expected result:
// {polarity: -0.35, subjectivity: 0.6, mood: 0.35650000000000004}
console.log("If you detect situations like this, you can calculate the average of these two scores to get the true overall polarity:");
console.log("(" + sentimentVal.polarity + " + " + sentimentVal.mood + ") ÷ 2 = " + ((sentimentVal.polarity + sentimentVal.mood) / 2));
// Expected result:
// (-0.35 + 0.35650000000000004) ÷ 2 = 0.0032500000000000306
console.log("-----");

console.log("");

console.log("SUMMARY:");
console.log("-----");
console.log("The other flag that can be set is the summary flag.");
console.log("This summary includes which negation and intensifier (if any) were chunked together with which opinion-based word, as well as the polarity and subjectivity score of each chunk:");
console.log("It's not really very good.", nlp("It's not really very good.").sentiment(false, true));
// Expected result:
// {
//   "polarity": -0.26923076923076916,
//   "subjectivity": 0.46153846153846145,
//   "summary": [
//     {
//       "scored_words": [
//         "not",
//         "very",
//         "good"
//       ],
//       "polarity": -0.26923076923076916,
//       "subjectivity": 0.46153846153846145
//     }
//   ]
// }
console.log("-----");
console.log("If you set both the mood flag and the summary flag to true, you can see each emoji, emoticon and how they were scored, as well:");
console.log("It's not really very good. 😦:-(", nlp("It's not really very good. 😦:-(").sentiment(true, true));
// {
//   "polarity": -0.26923076923076916,
//   "subjectivity": 0.46153846153846145,
//   "mood": -0.5589999999999999,
//   "summary": [
//     {
//       "scored_words": [
//         "not",
//         "very",
//         "good"
//       ],
//       "polarity": -0.26923076923076916,
//       "subjectivity": 0.46153846153846145
//     },
//     {
//       "scored_icons": [
//         ":-(",
//         "😦"
//       ],
//       "mood": [
//         -0.75,
//         -0.368
//       ]
//     }
//   ]
// }
console.log("-----");
console.log("If you set both the mood flag and the summary flag to true, but have no emojis or emoticons/smileys in the text, the scored emoticons and mood in the summary will simply be empty arrays:");
console.log("It's not really very good.", nlp("It's not really very good.").sentiment(true, true));
// Expected result:
// {
//   "polarity": -0.26923076923076916,
//   "subjectivity": 0.46153846153846145,
//   "mood": 0,
//   "summary": [
//     {
//       "scored_words": [
//         "not",
//         "very",
//         "good"
//       ],
//       "polarity": -0.26923076923076916,
//       "subjectivity": 0.46153846153846145
//     },
//     {
//       "scored_icons": [],
//       "mood": []
//     }
//   ]
// }
console.log("-----");

// Dependencies:
// https://unpkg.com/efrt@2.7.0/builds/efrt-unpack.min.js
// https://unpkg.com/compromise