import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-toPastParticiple] '

test('toPastParticiple:', function (t) {
  let arr = [
    [`I eat breakfast every morning.`, `I have eaten breakfast every morning this week.`],
    [`She reads a book before bed.`, `She has read the entire book series.`],
    [`He teaches math to high school students.`, `He has taught math for 20 years.`],
    [`They walk their dog in the park.`, `They have walked their dog every day for a year.`],
    [`We watch a movie on Friday nights.`, `We have watched every movie in the theater this year.`],
    [`I eat pizza.`, `I have eaten pizza.`],
    [`He reads books.`, `He has read books.`],
    [`They run marathons.`, `They have run marathons.`],
    [`She sings songs.`, `She has sung songs.`],
    [`We write letters.`, `We have written letters.`],
    [`You speak Spanish.`, `You have spoken Spanish.`],
    [`He swims laps.`, `He has swum laps.`],
    [`They climb mountains.`, `They have climbed mountains.`],
    [`She dances ballet.`, `She has danced ballet.`],
    [`We paint pictures.`, `We have painted pictures.`],
    [`I play soccer.`, `I have played soccer.`],
    [`They study history.`, `They have studied history.`],
    [`He cooks dinner.`, `He has cooked dinner.`],
    [`She designs websites.`, `She has designed websites.`],
    [`We watch movies.`, `We have watched movies.`],
    [`You listen to music.`, `You have listened to music.`],
    [`They build houses.`, `They have built houses.`],
    [`I plant flowers.`, `I have planted flowers.`],
    [`He fixes cars.`, `He has fixed cars.`],
    [`She teaches math.`, `She has taught math.`],
    [`We clean the house.`, `We have cleaned the house.`],
    [`You drive a car.`, `You have driven a car.`],
    [`They ride bikes.`, `They have ridden bikes.`],
    [`I take photos.`, `I have taken photos.`],
    [`She does yoga.`, `She has done yoga.`],
    [`We sing in the choir.`, `We have sung in the choir.`],
    [`You draw pictures.`, `You have drawn pictures.`],
    [`They make cookies.`, `They have made cookies.`],
    [`He surfs the internet.`, `He has surfed the internet.`],
    [`She plays the guitar.`, `She has played the guitar.`],
    [`We travel the world.`, `We have traveled the world.`],
    [`You speak to friends.`, `You have spoken to friends.`],
    [`They fish in the river.`, `They have fished in the river.`],
    [`I write stories.`, `I have written stories.`],
    [`He takes a shower.`, `He has taken a shower.`],
    [`She sews clothes.`, `She has sewn clothes.`],
    [`We play board games.`, `We have played board games.`],
    [`You exercise at the gym.`, `You have exercised at the gym.`],
    [`They fly airplanes.`, `They have flown airplanes.`],
    [`He studies science.`, `He has studied`],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toPastParticiple()
    t.equal(doc.text(), a[1], here + ' ' + a[0])
  })
  t.end()
})
