import test from 'tape'
import nlp from '../_lib.js'
// const here = '[three/chunks] '

test('chunker', function (t) {
  let arr = [

    ["Record your successes and keep going."],
    ["With a million jobs at stake, I refused to let that happen."],
    ["Letters Written in Sweden, Norway, and Denmark was Wollstonecraft's most popular book in the 1790s."],
    ["Highly recommended, ask for Josh!"],
    ["It seemed to fly rather than gallop, but so smoothly that Beauty was not frightened; indeed, she would have enjoyed the journey if she had not feared what might happen to her at the end of it."],
    ["Are you sure you wanna do this?"],
    ["Shares finish lower on sustained selling"],
    ["This English shire is named for an Old Saxon landowner; the name means \"Snot's home\""],
    ["What do you call a man with no arms and no legs, but can play the piano really well?"],
    ["My friend was repeatedly trying to get me to call another friend to act as 'ground control,' for he explained to me that he would periodically lose all concept of who he was or the situation he was in."],
    ["Don't want to be your monkey wrench"],
    ["Im sure you will learn to do the same."],
    ["But when we really need them, someone else have already liked that boring care."],
    ["The accidental gun rate — the accidental gun death rate of children under 15 in the United States is nine times higher than in the other 25 industrialized countries combined."],
    ["Think of the positive aspects of each situation."],
    ["The term \"Great Britain\", by contrast, refers conventionally to the island of Great Britain, or politically to England, Scotland and Wales in combination."],
    ["I had ingrown hairs and follicle problems for over a year and Crystal"],
    ["C'mon, Pheebs, we're gonna catch that movie, we gotta get going.", ''],
    ["The top 10 music festivals in Toronto for spring 2015", ''],
    ["Duck, duck, l'oie; (l'oie of course referring to this other feathered friend)", ''],
    ["I hate when I'm standing there trying to be handsome when some other guy comes and stands next to me and challenges my handsomeness.", ''],
    ["round the old sun-dial, and perhaps he will give you what you want.”", ''],
    ["John, sorry for the late response, but I think you can implement immediately.", ''],
    ["Nah man you may get lucky they may just mess with you like they did with me", ''],
    ["I see how lah, den i tell u whether meeting for dinner not.", ''],
    ["I am asking you to do just that.", ''],
    ["If you didn't become Final Form, just hit the pause button and press \"Retry\".", ''],
    ["Among the most widely used are subjecting DNA to UV radiation or chemical mutagens, error-prone PCR, degenerate codons, or recombination.", ''],
    ["This bar is a top pick for my friends and I when we want to go somewhere we know we can enjoy and unwind on the weekend.", ''],
    ["madam, cried the clerk of the kitchen.", ''],
    ["I can’t believe they-they didn’t even tell us!", ''],
    ["You can now eat chimney sundaes in Toronto", ''],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.chunks().forEach(chunk => {

    })
  })
  t.end()
})
