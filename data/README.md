hello!

here is the data compressed and compiled into the word models that compromise uses to understand text.

there are some things to note:

1. run `npm run pack` after making a change, to see changes appear.

2. lexicon words are lowercased and compressed with [efrt](https://github.com/spencermountain/efrt), some characters are reserved -`[0-9,;!:|¦]`

3. be careful adding ambiguous words - 'ray' should not be a #Person - it's a better fit for `./switches/person-date.js`

4. many word-lists have conjugations automatically applied to them - #Singular words are pluralized, etc.


the lexicon output data can be found in `./src/2-two/preTagger/model/lexicon/_data.js`

and the word-conjugation data can be found in `./src/2-two/preTagger/model/models/_data.js`

for more information, see the [compromise-lexicon docs](https://observablehq.com/@spencermountain/compromise-lexicon).