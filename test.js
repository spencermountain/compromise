
function dotests(){

var fails=[]

////coerce a noun
assert_pos("swim", [ "VB" ])
assert_pos("the swim", ["DT", "NN" ])
assert_pos("my swim", ["PP", "NN" ])
assert_pos("the obviously good swim", ["DT", "RB", "JJ","NN" ])
assert_pos("spencer kelly", [ "NN", "NN" ])//looks like an adverb but aint
//coerce a verb
assert_pos("swing", [ "NN" ])
assert_pos("would normally swing", ["MD", "RB","VB" ])
//coerce an adjective
assert_pos("quietly lkajsfijf", [ "RB", "JJ" ])
assert_pos("schlooking in toronto is scarey and lkasf", ["VBG", "IN","NN","CP","JJ","CC", "JJ" ])
assert_pos("lkjasdf always walks so very lkjafe", ["NN", "RB","VBZ","RB","RB","JJ" ])
assert_pos("lkjasdf always walks in every cafesefirehty", ["NN", "RB","VBZ","IN","DT","NN" ])
//coerce a verb
assert_pos("he lkajsdf so hard", [ "PRP", "VB", "RB", "JJ" ])
assert_pos("scared", [ "JJ" ])
assert_pos("scared him hard", [ "VB", "PRP", "JJ" ])
//coerce an adverb
assert_pos("he is real", [ "PRP", "CP", "JJ" ])
assert_pos("he is real cool", [ "PRP", "CP", "RB","JJ" ])
assert_pos("a pretty, good and nice swim", ["DT", "JJ", "JJ","CC","JJ", "NN" ])
assert_pos("a pretty good and nice swim", ["DT", "RB", "JJ","CC","JJ", "NN" ])



//spotter tests
////////////////
var options={
    gerund:true,
    stick_adjectives:true,
    stick_prepositions:true,
    stick_the:false,
    subnouns:false,
    match_whole:false
  }


//sticky nouns
assert_spot("the strobelight at plastic people", {}, ["strobelight"]);
assert_spot("the strobelight at plastic people", {stick_adjectives:true}, ["strobelight", "plastic people"]);
assert_spot("natalie portman in black swan", {}, ["natalie portman", "swan"]);
assert_spot("natalie portman in black swan", {stick_adjectives:true}, ["natalie portman", "swan","black swan"]);
assert_spot("i enjoyed watching children of men", {}, []);
assert_spot("i enjoyed watching children of men", {stick_prepositions:true}, ["children of men"]);

assert_spot("really lame", {}, []);
assert_spot("really lame", {match_whole:true}, ["really lame"]);
//ngram
assert_spot("toronto international film festival", {}, ["toronto international film festival"] )
assert_spot("toronto film festival", {subnouns:true},  ["toronto film festival","toronto","festival","toronto film","film festival"]);
assert_spot("nancy reagan when she spoke about hiv in denver", {},  ["nancy reagan", "hiv", "denver"])
assert_spot("nancy reagan when she spoke about hiv in denver", {subnouns:true},  ["nancy reagan","hiv","denver","nancy","reagan"])
assert_spot("Dr. Conrad Murray guilty verdict", {},  ["Dr. Conrad Murray guilty verdict"])
assert_spot("Dr. Conrad Murray guilty verdict", {subnouns:true},  ["Dr. Conrad Murray guilty verdict","Conrad","Murray","guilty","verdict","Conrad Murray","Murray guilty","guilty verdict","Conrad Murray guilty","Murray guilty verdict","Conrad Murray guilty verdict"])

assert_spot("tom cruise and nancy kerrigan", {},["tom cruise","nancy kerrigan"])
assert_spot("tom cruise and nancy kerrigan", {stick_prepositions:true},["tom cruise","nancy kerrigan","tom cruise and nancy kerrigan"])
assert_spot("tom cruise and nancy kerrigan", {subnouns:true, stick_prepositions:true},["tom cruise","nancy kerrigan","cruise","nancy","kerrigan","tom cruise and nancy kerrigan"])

assert_spot("strolling in berlin", {},  ["berlin"]);
assert_spot("strolling in berlin", {gerund:true},  [ "strolling","berlin"]);

assert_spot("smoking all morning in the bathtub", {gerund:false}, ["morning","bathtub"] );
assert_spot("smoking all morning in the bathtub", {gerund:true}, ["smoking","morning","bathtub"] );


assert_spot("waking up and being exhausted at bob marley's house", {gerund:true}, ["waking up", "bob marley"] );

assert_spot("the simpsons", {}, ["simpson"]);
assert_spot("the simpsons", {stick_the:true}, ["simpson","the simpsons"]);
assert_spot("singing in the phantom of the opera", {stick_prepositions:true}, ["phantom", "opera", "phantom of the opera"]);
assert_spot("singing in the phantom of the opera", {stick_prepositions:true, gerund:true}, ["singing","phantom","opera","singing in the phantom","phantom of the opera"]);
//assert_spot("singing in the phantom of the opera", {stick_prepositions:true, gerund:true, match_whole:true}, ["singing","phantom","opera","singing in the phantom","phantom of the opera","singing in the phantom of the opera"]);


return fails


function assert_spot(str,  options, obj){
  var nouns=_.pluck(spot(str, options), "word");
  if(_.isEqual(nouns, obj )  || nouns.length==0 && obj.length==0){
  }
  else{
    fails.push(str)
    console.log('fail  - >'+ str +'        '+JSON.stringify(nouns))
  }
}

function assert_pos(str, obj){
  var the= pos(str, {})[0]
  the= _.pluck(_.pluck(the, "pos"), "tag")
  if(_.isEqual(the, obj )  ){
  // console.log('true');
  }
  else{
    console.log('fail  =>'+ str +'        '+JSON.stringify(pos))
  }
}

}