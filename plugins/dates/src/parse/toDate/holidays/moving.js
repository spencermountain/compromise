//yep,
const jan = 0
const feb = 1
const march = 2
const april = 3
const may = 4
const june = 5
const july = 6
// const august = 7
const sep = 8
const oct = 9
const nov = 10
const dec = 11

// hardcoded dates for astronomical holidays
//   ----please change, every few years(!)---
module.exports = {
  2018: {
    // Astronomical major holidays
    'martin luther king': [jan, 15], //[third monday in january],
    'mlk day': [jan, 15], //[third Monday in January],
    'presidents day': [feb, 19], //[third monday in february],
    'mardi gras': [feb, 13], //[47 days before easter],
    'commonwealth day': [march, 12], //[second monday in march],
    'tax day': [april, 17],
    'mothers day': [may, 13], //[second Sunday in May],
    'memorial day': [may, 28], //[last monday in may],
    'fathers day': [june, 17], //[third Sunday in June],
    'labor day': [sep, 3], //[first monday in september],
    'columbus day': [oct, 8], //[second monday in october],
    'indigenous peoples day': [oct, 8], //[second monday in October],
    'canadian thanksgiving': [oct, 8], //[second monday in october],
    'election day': [nov, 6], // [Tuesday following the first Monday in November],
    thanksgiving: [nov, 22], // [fourth Thursday in November],
    // 't-day': [nov, 22], // [fourth Thursday in November],
    'turkey day': [nov, 22], //[fourth Thursday in November],
    'black friday': [nov, 23], //[fourth tuesday in november],
    'cyber monday': [nov, 26],

    // Astronomical religious and cultural holidays
    // Catholic + Christian
    'ash wednesday': [feb, 14], // [First day of Lent],
    'palm sunday': [march, 25], // [Sunday before Easter Sunday],
    'maundy thursday': [march, 29], // [The day before Good Friday],
    'good friday': [march, 30],
    'holy saturday': [march, 31],
    easter: [april, 1],
    'easter sunday': [april, 1],
    'easter monday': [april, 2],
    'orthodox good friday': [april, 6],
    'orthodox holy saturday': [april, 7],
    'orthodox easter': [april, 8],
    'orthodox easter monday': [april, 9],
    'ascension day': [may, 10],
    pentecost: [may, 20],
    whitsunday: [may, 20],
    'whit sunday': [may, 20],
    'whit monday': [may, 21], // [The day after Pentecost],
    'trinity sunday': [may, 27], // [The Sunday after Pentecost],
    'corpus christi': [may, 31],
    advent: [dec, 2], // Ranged holiday [dec, 25] [The Sunday nearest St Andrew’s Day, encompassing the next three Sundays, ending on Christmas Day],

    // Jewish
    'tu bishvat': [jan, 31],
    'tu bshevat': [jan, 31],
    purim: [march, 1],
    passover: [march, 31], // Ranged holiday [april, 7],
    'yom hashoah': [april, 11],
    'lag baomer': [may, 3],
    shavuot: [may, 20],
    'tisha bav': [july, 22],
    'rosh hashana': [sep, 10],
    'yom kippur': [sep, 19],
    sukkot: [sep, 24], // Ranged holiday [sep, 30],
    'shmini atzeret': [oct, 1],
    'simchat torah': [oct, 2],
    chanukah: [dec, 3], // Ranged holiday [dec, 30],
    hanukkah: [dec, 3], // Ranged holiday [dec, 30],

    // Muslim
    'isra and miraj': [april, 13],
    'lailat al-qadr': [june, 10],
    'eid al-fitr': [june, 15],
    'id al-Fitr': [june, 15],
    'eid ul-Fitr': [june, 15],
    ramadan: [may, 16], // Ranged holiday [, ],
    'eid al-adha': [sep, 22],
    muharram: [sep, 12],
    'the prophets birthday': [nov, 21],

    // Pagan / metal
    ostara: [march, 20],
    'march equinox': [march, 20],
    'vernal equinox': [march, 20],
    litha: [june, 21],
    'june solistice': [june, 21],
    'summer solistice': [june, 21],
    mabon: [sep, 23],
    'september equinox': [sep, 23],
    'autumnal equinox': [sep, 23],
    yule: [dec, 21],
    'december solstice': [dec, 21],
    'winter solstice': [dec, 21],

    // Additional important holidays
    'chinese new year': [feb, 16],
    diwali: [nov, 7],
  },
}
