import test from 'tape'
import nlp from './_lib.js'
const here = '[three/places] '

test('known-regions:', function (t) {
  let arr = [
    ['i want to go to Ohio to see George Harrison', 'ohio'],
    ['we are visiting Gloucestershire, before we leave', 'gloucestershire'],
    ['manitoba is nice this time of year', 'manitoba'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0]).match('#Region').text('normal')
    t.equal(str, a[1], here + a[0])
  })
  t.end()
})

test('places-find:', function (t) {
  let arr = [
    ['live in the Rekcjd Province', 'rekcjd province'],
    ['live in the Lekfjs District', 'lekfjs district'],
    ['visiting Tojbs Kjeh Region', 'tojbs kjeh region'],
    ['visiting the State of Lkjfhe', 'state of lkjfhe'],
    ['see you in West Nunavut', 'west nunavut'],
    ['see you in western Hunan', 'western hunan'],
    ['see you in Northern Hunan province', 'northern hunan province'],
    ['see you in Toronto, Canada', 'toronto canada'],
    ['see you in Toronto, Ontario', 'toronto ontario'],
    ['I flew to Austin, Texas', 'austin texas'],
    ['I flew to San antonio, Texas', 'san antonio texas'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0]).places(0).text('normal')
    t.equal(str, a[1], here + a[0])
  })
  t.end()
})

test('mixed continents-places:', function (t) {
  const doc = nlp('in north africa, eastern asia, guatemala, europe, north america, and japan')
  t.equal(doc.places().length, 6, here + '6-places')
  t.end()
})

test('national-monuments:', function (t) {
  let list = [
    'Forbidden City',
    "St. Peter's Basilica",
    'Palace of Versailles',
    'Lincoln Memorial',
    'Colosseum',
    'Parthenon',
    'Eiffel Tower',
    'Taj Mahal',
    'Cologne Cathedral',
    'Peterhof Palace',
    'Łazienki Palace',
    'Vietnam Veterans Memorial',
    'World War II Memorial',
    'Independence National Historical Park',
    'Statue of Liberty National Monument',
    'Teotihuacán',
    'Mysore Palace',
    'Tsarskoe Selo State Museum-Reserve',
    'Pompeii',
    'Wilanów Palace',
    'Schönbrunn Palace',
    'Kazan Kremlin',
    'Tower of London',
    'Alhambra',
    'Chichén Itzá',
    'Topkapı Palace',
    'Chapultepec Castle',
    'Ciudad de las Artes y las Ciencias',
    'Statue of Unity',
    'Tulum',
    'Auschwitz-Birkenau Memorial and Museum',
    'Edinburgh Castle',
    'Mosque–Cathedral of Córdoba',
    'Royal Alcázar of Seville',
    'Wawel Castle',
    'Arc de Triomphe',
    'Royal Palace of Madrid',
    'Neuschwanstein',
    'Machu Picchu',
    'Castillo San Felipe del Morro',
    'San Juan National Historic Site',
    'Admiralty Island',
    'African Burial Ground',
    'Agate Fossil Beds',
    'Agua Fria',
    'Alibates Flint Quarries',
    'Aniakchak',
    'Avi Kwa Ame',
    'Aztec Ruins',
    'Bandelier',
    'Berryessa Snow Mountain',
    'Browns Canyon',
    'Buck Island Reef',
    'Cabrillo',
    'California Coastal',
    'Camp Hale — Continental Divide',
    'Camp Nelson',
    'Canyon de Chelly',
    'Canyons of the Ancients',
    'Cape Krusenstern',
    'Capulin Volcano',
    'Carrizo Plain',
    'Casa Grande Ruins',
    'Cascade–Siskiyou',
    'Castillo de San Marcos',
    'Castle Clinton',
    'Castle Mountains',
    'Castner Range',
    'Cedar Breaks',
    'Chimney Rock',
    'Chiricahua',
    'Colorado',
    'Devils Postpile',
    'Devils Tower',
    'Effigy Mounds',
    'El Malpais',
    'El Morro',
    'Florissant Fossil Beds',
    'Fort Frederica',
    'Fort Matanzas',
    'Fort McHenry',
    'Fort Monroe',
    'Fort Ord',
    'Fort Pulaski',
    'Fort Stanwix',
    'Fort Union',
    'Fossil Butte',
    'Freedom Riders',
    'Giant Sequoia',
    'Gila Cliff Dwellings',
    'Gold Butte',
    'Governors Island',
    'Grand Canyon–Parashant',
    'Grand Portage',
    'Grand Staircase–Escalante',
    'Hagerman Fossil Beds',
    'Hanford Reach',
    'Hohokam Pima',
    'Hovenweep',
    'Ironwood Forest',
    'Jewel Cave',
    'John Day Fossil Beds',
    'Kasha-Katuwe Tent Rocks',
    'Katahdin Woods and Waters',
    'Little Bighorn Battlefield',
    'Marianas Trench Marine',
    'Military Working Dog Teams',
    'Mill Springs Battlefield',
    'Misty Fjords',
    'Mojave Trails',
    'Montezuma Castle',
    'Muir Woods',
    'Natural Bridges',
    'Newberry Volcanic',
    'Oregon Caves',
    'Organ Pipe Cactus',
    'Pacific Remote Islands',
    'Papahānaumokuākea',
    'Pipe Spring',
    'Pipestone',
    'Pompeys Pillar',
    'Poverty Point',
    'Prehistoric Trackways',
    'Rainbow Bridge',
    'Río Grande del Norte',
    'Rose Atoll',
    'Russell Cave',
    'San Gabriel Mountains',
    'San Juan Islands',
    'Santa Rosa and San Jacinto Mountains',
    'Scotts Bluff',
    'Sonoran Desert',
    'Statue of Liberty',
    'Sunset Crater Volcano',
    'Timpanogos Cave',
    'Tonto',
    'Tule Lake',
    'Tule Springs Fossil Beds',
    'Tuzigoot',
    'Upper Missouri River Breaks',
    'Vermilion Cliffs',
    'Virgin Islands Coral Reef',
    'Waco Mammoth',
    'Walnut Canyon',
    'Wupatki',
    'Yucca House',
  ]

  list.forEach(str => {
    let doc = nlp(str)
    t.ok(doc.places().found, str)
  })
  t.end()
})
