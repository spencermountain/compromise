var inflect = require("../inflect")

var test = [
  ["snake", "snakes"],
  ["ski", "skis"],
  ["Barrymore", "Barrymores"],
  ["witch", "witches"],
  ["box", "boxes"],
  ["gas", "gases"],
  ["bus", "buses"],
  ["kiss", "kisses"],
  ["Jones", "Joneses"],
  ["child", "children"],
  ["woman", "women"],
  ["man", "men"],
  ["person", "people"],
  ["goose", "geese"],
  ["mouse", "mice"],
  ["barracks", "barracks"],
  ["deer", "deer"],
  ["nucleus", "nuclei"],
  ["syllabus", "syllabi"],
  ["fungus", "fungi"],
  ["cactus", "cacti"],
  ["thesis", "theses"],
  ["crisis", "crises"],
  ["phenomenon", "phenomena"],
  ["index", "indices"],
  ["appendix", "appendices"],
  ["criterion", "criteria"],
  ["berry", "berries"],
  ["activity", "activities"],
  ["daisy", "daisies"],
  ["church", "churches"],
  ["bus", "buses"],
  ["fox", "foxes"],
  ["stomach", "stomachs"],
  ["epoch", "epochs"],
  ["knife", "knives"],
  ["half", "halves"],
  ["scarf", "scarves"],
  ["chief", "chiefs"],
  ["spoof", "spoofs"],
  ["solo", "solos"],
  ["zero", "zeros"],
  ["avocado", "avocados"],
  ["studio", "studios"],
  ["zoo", "zoos"],
  ["embryo", "embryos"],
  ["hero", "heroes"],
  ["banjo", "banjos"],
  ["cargo", "cargos"],
  ["flamingo", "flamingos"],
  ["fresco", "frescos"],
  ["ghetto", "ghettos"],
  ["halo", "halos"],
  ["mango", "mangos"],
  ["memento", "mementos"],
  ["motto", "mottos"],
  ["tornado", "tornados"],
  ["tuxedo", "tuxedos"],
  ["volcano", "volcanos"],
  ["crisis", "crises"],
  ["analysis", "analyses"],
  ["neurosis", "neuroses"],
  ["aircraft", "aircraft"],
  ["bass", "bass"],
  ["bison", "bison"],
  ["deer", "deer"],
  ["fish", "fish"],
  ["fowl", "fowl"],
  ["halibut", "halibut"],
  ["moose", "moose"],
  ["salmon", "salmon"],
  ["sheep", "sheep"],
  ["spacecraft", "spacecraft"],
  ["tuna", "tuna"],
  ["trout", "trout"],
  ["armadillo", "armadillos"],
  ["auto", "autos"],
  ["bravo", "bravos"],
  ["bronco", "broncos"],
  ["casino", "casinos"],
  ["combo", "combos"],
  ["gazebo", "gazebos"],
  ["kilo", "kilos"],
  ["kimono", "kimonos"],
  ["logo", "logos"],
  ["memo", "memos"],
  ["poncho", "ponchos"],
  ["photo", "photos"],
  ["pimento", "pimentos"],
  ["pro", "pros"],
  ["sombrero", "sombreros"],
  ["taco", "tacos"],
  ["memo", "memos"],
  ["torso", "torsos"],
  ["xylophone", "xylophones"],
  ["quintuplet", "quintuplets"],
  ["worrywart", "worrywarts"],
  ["nerd", "nerds"],
  ["lollipop", "lollipops"],
  ["eyebrow", "eyebrows"],

  // ["man of steel", "men of steel"],
  // ["wolf of wall street", "wolves of wall street"],
  // ["salt of the earth", "salt of the earth"],

]
test.forEach(function(t) {
  var str = "console.log(nlp.noun.singularize('" + t[1] + "')=='" + t[0] + "')"
  // console.log(str)
  var p = inflect.pluralize(t[0])
  if (!(p == t[1])) {
    console.log(t)
  }
  var s = inflect.singularize(t[1])
  if (!(s == t[0])) {
    console.log(t)
  }
  // console.log(p+"   "+ (p==t[1]))

})
// console.log(singularize("poppies"))
// console.log(singularize("geniuses"))

//NOT WORKING singularize-direction
// [ 'half', 'halves' ]
// [ 'scarf', 'scarves' ]
// [ 'neurosis', 'neuroses' ]