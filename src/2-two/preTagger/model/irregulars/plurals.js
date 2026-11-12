//nouns with irregular plural/singular forms
//used in nouns.toPlural(), and also in the lexicon.
const pairs = `
addendum addenda
corpus corpora
criterion criteria
curriculum curricula
genus genera
memorandum memoranda
opus opera
ovum ova
phenomenon phenomena
referendum referenda
alga algae
alumna alumnae
antenna antennae
formula formulae
larva larvae
nebula nebulae
vertebra vertebrae
analysis analyses
axis axes
diagnosis diagnoses
parenthesis parentheses
prognosis prognoses
synopsis synopses
thesis theses
neurosis neuroses
oasis oases
appendix appendices
index indices
matrix matrices
ox oxen
sex sexes
alumnus alumni
bacillus bacilli
cactus cacti
fungus fungi
hippopotamus hippopotami
libretto libretti
modulus moduli
nucleus nuclei
octopus octopi
radius radii
stimulus stimuli
syllabus syllabi
cookie cookies
calorie calories
auntie aunties
movie movies
pie pies
rookie rookies
tie ties
zombie zombies
leaf leaves
loaf loaves
thief thieves
foot feet
goose geese
tooth teeth
beau beaux
chateau chateaux
tableau tableaux
bus buses
gas gases
circus circuses
alias aliases
atlas atlases
canvas canvases
iris irises
lens lenses
crisis crises
virus viruses
database databases
excuse excuses
abuse abuses
avocado avocados
barracks barracks
child children
clothes clothes
echo echoes
embargo embargoes
epoch epochs
deer deer
halo halos
man men
woman women
mosquito mosquitoes
mouse mice
person people
quiz quizzes
buzz buzzes
fez fezzes
rodeo rodeos
shoe shoes
sombrero sombreros
stomach stomachs
tornado tornados
tuxedo tuxedos
volcano volcanoes
`
const plurals = {}
pairs.trim().split('\n').forEach(line => {
  const [singular, plural] = line.trim().split(' ')
  plurals[singular] = plural
})
export default plurals
