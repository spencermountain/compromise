/*!
 *by spencer kelly
 *
 * based on jsPOS by Percy Wegmann
 * Licensed under the LGPLv3 license
 * http://www.opensource.org/licenses/lgpl-3.0.html
 */

var tag = (function() {

var tag = function(words, options){
  	var results = [];
  	//lookup words
    for (var i in words) {
  	    var word=words[i];
        results[i]={word:word, pos:null, clues:[]}
            //first, regex-based guesses
          var patterns = [
            {reg: /[a-z]\-[a-z]/ , pos: 'JJ'},
            {reg: /^de\-[a-z]../ , pos: 'VB'},
            {reg: /^un\-[a-z]../ , pos: 'VB'},
            {reg: /^re\-[a-z]../ , pos: 'VB'},
            {reg: /.*ould$/ , pos: 'MD'},
            {reg: /..*ing$/ , pos: 'VBG'},
            {reg: /..*'n$/ , pos: 'VBG'},
            {reg: /...*ed$/ , pos: 'VBD'},
            {reg: /.*ness$/ , pos: 'NN'},
            {reg: /.*ment$/ , pos: 'NN'},
            {reg: /.*full?$/ , pos: 'JJ'},
            {reg: /.*ous$/ , pos: 'JJ'},
            {reg: /.*ble$/ , pos: 'JJ'},
            {reg: /.*ic$/ , pos: 'JJ'},
            {reg: /..*ive$/ , pos: 'JJ'},
            {reg: /..*ic$/ , pos: 'JJ'},
            {reg: /..*est$/ , pos: 'JJ'},
            {reg: /.*ical$/ , pos: 'JJ'},
            {reg: /.*ial$/ , pos: 'JJ'},
            {reg: /...*ish$/ , pos: 'JJ'},
            {reg: /.*less$/ , pos: 'JJ'},
            {reg: /..*ant$/ , pos: 'JJ'},
            {reg: /..*ly$/ , pos: 'RB'},
            {reg: /\./ , pos: 'NN'},
            {reg: /^((?![aeiouy]).)*$/, pos: 'NN'},
            {reg: /^-?[0-9]+(.[0-9]+)?$/ , pos: 'CD'},
            {reg: /'s$/ , pos: 'NNO'}
          ]
          for(var o in patterns){
            if(word.match(patterns[o].reg)){
              results[i].pos=parts_of_speech[patterns[o].pos];
              results[i].rule="regex"
            }
          }
            //next, use the pos suggestions from the lexicon
            word=word.replace(/[\.,!:;]*$/,'')
            var lex=lexicon[word.toLowerCase()];
            if(lex){
              results[i].pos=parts_of_speech[lex];
              results[i].rule="lexicon";
              }
            //noun if a capital appears in the not-first word
            if(i!=0 && word.match(/[A-Z]/)){
              results[i].pos=parts_of_speech["NN"];
              results[i].rule="capital";
              }
            //noun if we can convert into a number
            if (parseFloat(word)){
                results[i].pos=parts_of_speech["NN"];
                results[i].rule="number";
               }
            //fallback to noun
            if(!results[i].pos){
                results[i].pos=parts_of_speech["NN"];
                results[i].rule="unknown";
                }
    }

  	//sentence-level context rules
    for(var i in results){
        i=parseInt(i);
        if(!results[i+1]){continue;}

         //if no adjectives or verbs at all, kill the adverbs
       /* if(results[i].pos.tag=="RB" ){
          if(!_.detect(results, function(r){return r.pos.parent=="verb" || r.pos.parent=="adjective"} )){
           results[i].pos=parts_of_speech["NN"];
           results[i].rule="dangling adverb";
           }
        } */
         //suggest verb or adjective after adverb
        if(results[i].pos.tag=="RB" && ( !results[i-1] || results[i-1].pos.parent!="verb")   ){
          results=suggest_adverb_phrase(i, "from_adverb", results, {strong:false});
        }
         //suggest noun phrase after posessive pronouns (her|my|its)
        if(results[i].pos.tag=="PP" ){
          results=suggest_noun_phrase(i, "from_posessive", results, {strong:true});
        }
          //suggest noun phrase after determiners (the|a)
        if(results[i].pos.tag=="VBZ" && results[i+1].pos.parent!="verb"  ){
          results=suggest_adjective_phrase(i, "vbz-adjective", results, {strong:false});
        }
         //suggest noun phrase after determiners (the|a)
        if(results[i].pos.tag=="DT" ){
          results=suggest_noun_phrase(i, "from_determiner", results, {strong:false});
        }
          // suggest verb phrase after would|could|should
        if(results[i].pos.tag=="MD" ){
          results=suggest_verb_phrase(i, "from_would", results, {strong:false});
        }
         // suggest adjective phrase after copula and no determiner/verb
      //  if(results[i].pos.tag=="CP" && results[i+1].pos.tag!="DT" && results[i+1].pos.parent!="verb"){
         // results=suggest_adjective_phrase(i, "from_copula", results, {strong:false});
       // }
     }




     	//more specific context rules
    for(var i in results){
       i=parseInt(i);
       if(!results[i+1]){continue;}
       //noun adjective noun
       if(results[i].pos.parent=="noun" && results[i+2] && results[i+1].pos.tag=="JJ" && results[i+2].pos.parent=="noun"){
          if(!options.big){
           results[i+1].pos=parts_of_speech["NN"];   //fails on 'truck bombing outside kabul'
           results[i+1].rule="noun_adjective_noun";
           }
       }
        //adjective - verb to adverb - verb
       if(results[i].pos.tag=="JJ" && results[i+1].pos.parent=="verb"){
           results[i].pos=parts_of_speech["RB"];
           results[i].rule="adjective_verb";
       }
        //two consecutive adjectives, no comma
       if(results[i].pos.tag=="JJ" && results[i+1].pos.tag=="JJ"){
         if(!results[i].word.match(',')){
           results[i].pos=parts_of_speech["RB"];
           results[i].rule="twoadjectives";
         }
       }
               //verb before persponal pronoun (scared his..)
       if(results[i].pos.tag=="PRP" ){
           if(results[i-1] && results[i-1].pos.parent=="adjective"){
           results[i-1].pos=parts_of_speech["VB"];
           results[i-1].rule="verb_myself";
           }
           else if( !results[i-1] || !results[i-1].pos.parent=="verb"){
             results=suggest_verb_phrase(i, "from_pronoun", results, {strong:false});
           }
       }
        //interpret prepositions as verbs is in, are from
       if(results[i].pos.tag=="CP" && results[i+1].pos.tag=="IN"){
           results[i+1].pos=parts_of_speech["VB"];
           results[i+1].rule="preposition_verb";
       }
        //hook conjunction grammars together  cute and [noun]
       if(results[i].pos.parent=="adjective" && results[i+1].pos.tag=="CC" && results[i+2] && results[i+2].pos.parent=="noun" ){
           results[i+2].pos=parts_of_speech["JJ"];
           results[i+2].rule="and_adjective";
       }

     }


     //context based on end of phrase
     var last=results.length-1;
       if(results[last-1]){
          // 'is [noun]' then end, becomes 'is [adjective]'
         if(results[last-1].pos.tag=="CP" && results[last].pos.parent=="noun"){
           results[last].pos=parts_of_speech["JJ"];
           results[last].rule="end_copula"
         }
          // '[noun] [verb]' then end, becomes '[noun] [noun]'
         if(results[last-1].pos.parent=="noun" && (results[last].pos.parent=="adjective" || results[last].pos.tag=="RB")  ){
           results[last].pos=parts_of_speech["NN"];
           results[last].rule="ending_noun"
         }

       }


    return results;
}


        function suggest_noun_phrase(o, rule, results, options){
            var top=results.length;
            for(var i=o+1; i<top; i++){   // console.log(results[i].word)
                if(results[i].pos.parent=='noun'){
                  return results;
                }
                if(  results[i].pos.parent=='verb'  && results[i].pos.tag!="RB" ){
                  results[i].pos=parts_of_speech["NN"];
                  results[i].rule=rule;
                  return results;
                }
                if(results[i+1]){
                  if(results[i].pos.parent=='adj' || results[i].pos.tag=="RB"){
                    results[i].pos.parent='adjective';
                    results[i].rule=rule;
                    }
                 }
                 else{//last word and still no noun
                    results[i].pos=parts_of_speech["NN"];
                    results[i].rule=rule;
                 }
              }
            return results;
         }


        function suggest_verb_phrase(o, rule, results, options){
            var top=results.length;
            for(var i=o+1; i<top; i++){
                if(results[i].pos.parent=='verb'){
                  return results;
                }
                if(results[i].pos.parent=='noun' ){
                  results[i].pos=parts_of_speech["VB"];
                  results[i].rule=rule;
                  return results;
                }
                if(results[i+1]){
                  if(results[i].pos.parent=='adj' || results[i].pos.tag=="RB"){
                    results[i].pos.parent='verb';
                    results[i].rule=rule;
                    }
                 }
                 else{//last word and still no verb
                    results[i].pos=parts_of_speech["VB"];
                    results[i].rule=rule;
                 }
              }
             return results;
         }

        function suggest_adjective_phrase(o, rule, results, options){
            var top=results.length;
            for(var i=o+1; i<top; i++){
                if(results[i].pos.parent=='adjective'){
                  return results;
                }
                if(results[i].pos.tag=="DT" || results[i].pos.tag=="CP"){
                  return results;
                }
                if(results[i].pos.parent=='noun' || results[i].pos.parent=='verb' ){
                  results[i].pos=parts_of_speech["JJ"];
                  results[i].rule=rule;
                  return results;
                }
                if(results[i+1]){
                  if(results[i].pos.tag=="RB"){
                    results[i].pos.parent='adjective';
                    results[i].rule=rule;
                    }
                 }
                 else{//last word and still no verb
                    if(options.strong){
                       results[i].pos=parts_of_speech["JJ"];
                       results[i].rule=rule;
                    }
                 }
              }
             return results;
         }

         //suggest a verb or adjective is coming
        function suggest_adverb_phrase(o, rule, results, options){
            var top=results.length;
            for(var i=o+1; i<top; i++){
                if(results[i].pos.parent=='adjective' || results[i].pos.parent=='verb'){
                  return results;
                }
                if(results[i].pos.parent=='noun' ){
                  results[i].pos=parts_of_speech["JJ"];
                  results[i].rule=rule;
                  return results;
                }
                if(results[i+1]){
                  if(results[i].pos.tag=="RB"){
                    results[i].pos.parent='adjective';
                    results[i].rule=rule;
                    }
                 }
                 else{//last word and still no verb
                  if(options.strong){
                    results[i].pos=parts_of_speech["JJ"];
                    results[i].rule=rule;
                    }
                 }
              }
             return results;
         }

    // export for AMD / RequireJS
  if (typeof define !== 'undefined' && define.amd) {
    define([], function() {
      return tag;
    });
  }
  // export for Node.js
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = tag;
  }

  return tag;


})()
