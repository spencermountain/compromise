var date_extractor = (function() {

  var main = function(text) {
    var results = finddate(text);
    return {
      "text": results[0],
      "from": formatdate(results[1]),
      "to": formatdate(results[2])
    }
  }



  //this function returns an array.
  //foundarray[0] is the text that contains the date bit (to highlight),
  //foundarray[1] is the start date
  //foundarray[2] is the end date

    function finddate(text) {
      if (text == null) {
        return '';
      }
      var foundarray = new Array();
      text = text.replace(/ Feb\.? /g, ' February ');
      text = text.replace(/ Mar\.? /g, ' March ');
      text = text.replace(/ Apr\.? /g, ' April ');
      text = text.replace(/ Jun\.? /g, ' June ');
      text = text.replace(/ Jul\.? /g, ' July ');
      text = text.replace(/ Aug\.? /g, ' August ');
      text = text.replace(/ Sep\.? /g, ' September ');
      text = text.replace(/ Oct\.? /g, ' October ');
      text = text.replace(/ Nov\.? /g, ' November ');
      text = text.replace(/ Dec\.? /g, ' December ');
      text = text.replace(/\(/g, '( ');
      text = text.replace(/\)/g, ' )');
      text = text.replace(/\Bfirst\B/, '1st');
      text = text.replace(/second of /, '2nd of');
      text = text.replace(/third of /, '3rd of');
      text = text.replace(/fourth of /, '4rth of');
      text = text.replace(/fifth of /, '5th of');
      text = text.replace(/sixth of /, '6th of');
      text = text.replace(/seventh of /, '7th of');
      text = text.replace(/eighth of /, '8th of');
      text = text.replace(/ninth of /, '9th of');
      text = text.replace(/tenth of /, '10th of');



      var found;

    var months_reg = "(july|august|september|october|november|december|january|february|march|april|may|june),?"
    var number_reg = "[0-9]{1,2}(th|rd|st)?,?"
    var reg = new RegExp(reg, "gi");
    var regexes = [{
      str: months_reg + " " + number_reg + "",
      example: "March 7th-11th 1987"
    }, {
      str: months_reg + "",
      example: "28th of September to 5th of October 2008"
    }, {
      str: months_reg + "",
      example: "March 7th to june 11th 1987"
    }, {
      str: months_reg + "",
      example: "between 13 February and 15 February 1945"
    }, {
      str: months_reg + "",
      example: "between March 7th and june 11th 1987"
    }, {
      str: months_reg + "",
      example: "March 1st 1987"
    }, {
      str: months_reg + "",
      example: "3rd - 5th of March 1969"
    }, {
      str: months_reg + "",
      example: "3rd of March 1969"
    }, {
      str: months_reg + "",
      example: "September 1939 to April 1945"
    }, {
      str: months_reg + "",
      example: "March 1969"
    }, {
      str: months_reg + "",
      example: "400 - 600 BC"
    }, {
      str: months_reg + "",
      example: "1997-1998"
    }, {
      str: months_reg + "",
      example: "1997-98"
    }, {
      str: months_reg + "",
      example: "400 BC"
    }, {
      str: months_reg + "",
      example: "1998"
    }]

      //eg March 7th-11th 1987
      var best = /(july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)? ?(\-| to | until | till ) ?[0-9]{1,2}(th|rd|st)?,? [0-9]{4}/i.exec(text);
      if (best != null) {
        found = best[0];
        var remove = / ?(-| to | until ) ?[0-9]{1,2}(th|rd|st)?,?/i.exec(found); //remove until date
        foundarray[0] = found;
        foundarray[1] = found.replace(remove[0], '');
        var remove = /[0-9]{1,2}(th|rd|st)?,? ?(-| to | until )/i.exec(found); //remove to date
        foundarray[2] = found.replace(remove[0], '');
        return foundarray;
      }

      //eg '28th of September to 5th of October 2008'
      var best = /[0-9]{1,2}(th|rd|st)? (of )?(july|august|september|october|november|december|january|february|march|april|may|june),? ?(-| to | until | till ) ?[0-9]{1,2}(th|rd|st)? (of )?(july|august|september|october|november|december|january|february|march|april|may|june),? [0-9]{4}/i.exec(text);
      if (best != null) {
        var found = best[0];
        foundarray[0] = found;
        var remove = /(-| to | until | till ) ?[0-9]{1,2}(th|rd|st)? (of )?(july|august|september|october|november|december|january|february|march|april|may|june),?/i.exec(found); //remove until date
        var tfound = found.replace(remove[0], '');
        tfound = tfound.replace(/( of | to | until | till |-)/, ' ');
        foundarray[1] = tfound.replace(remove[0], '');
        //to date
        var remove = /[0-9]{1,2}(th|rd|st)? (of )?(july|august|september|october|november|december|january|february|march|april|may|june),? ?(-| to | until | till )/i.exec(found); //remove from date
        var tfound = found.replace(remove[0], '');
        tfound = tfound.replace(/( of | to | until | till |-)/, ' ');
        foundarray[2] = tfound.replace(remove[0], '');
        return foundarray;
      }


      //eg March 7th to june 11th 1987
      var best = /(july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)? ?(-| to | until | till ) ?(july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)?( |, )[0-9]{4}/i.exec(text);
      // var best = /(july|august|september|october|november|december|january|february|march|april|may|june) [0-9]{1,2} to (july|august|september|october|november|december|january|february|march|april|may|june) [0-9]{1,2} [0-9]{4}/i.exec(text);
      if (best != null) {
        found = best[0];
        var remove = / ?(-| to | until | till ) ?(july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)?,?/i.exec(found); //remove until date
        foundarray[0] = found;
        foundarray[1] = found.replace(remove[0], '');
        var end = found.replace(/(july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)? ?(-| to | until | till ) ?/i, '');
        foundarray[2] = end;
        return foundarray;
      }

      //eg between 13 February and 15 February 1945
      var best = /(through|throughout|during|within|between) [0-9]{1,2}(th|rd|st)? (july|august|september|october|november|december|january|february|march|april|may|june),? ?(-| to | until | till | and ) ?[0-9]{1,2}(th|rd|st)? (july|august|september|october|november|december|january|february|march|april|may|june),? [0-9]{4}/i.exec(text);
      // var best = /(july|august|september|october|november|december|january|february|march|april|may|june) [0-9]{1,2} to (july|august|september|october|november|december|january|february|march|april|may|june) [0-9]{1,2} [0-9]{4}/i.exec(text);
      if (best != null) {
        found = best[0];
        // console.log("*"+best);
        var end = /[0-9]{1,2}(th|rd|st)? (july|august|september|october|november|december|january|february|march|april|may|june),? [0-9]{4}/i.exec(found); //grab end date
        var start = found.replace(/(through|throughout|during|within|between) /i, '');
        start = start.replace(/,? ?(-| to | until | till | and ) ?[0-9]{1,2}(th|rd|st)? (july|august|september|october|november|december|january|february|march|april|may|june),?/i, '');

        foundarray[0] = found;
        foundarray[1] = start;
        foundarray[2] = end[0];
        //console.log(foundarray[1]);
        return foundarray;
      }

      //eg between March 7th and june 11th 1987
      var best = /between (july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)? ?(-| and ) ?(july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)?( |, )[0-9]{4}/i.exec(text);
      // var best = /(july|august|september|october|november|december|january|february|march|april|may|june) [0-9]{1,2} to (july|august|september|october|november|december|january|february|march|april|may|june) [0-9]{1,2} [0-9]{4}/i.exec(text);
      if (best != null) {
        found = best[0];
        foundarray[0] = found;
        var remove = / ?(-| and ) ?(july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)?,?/i.exec(found); //remove until date
        foundarray[1] = found.replace(remove[0], '');
        foundarray[1] = foundarray[1].replace('between', '');
        //to date
        var remove = /between (july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)? ?(-| and ) ?/i.exec(found); //remove from date
        foundarray[2] = found.replace(remove[0], '');
        foundarray[2] = foundarray[2].replace('between', '');
        return foundarray;
      }


      //eg March 1st 1987
      var best = /(july|august|september|october|november|december|january|february|march|april|may|june),? (the )?[0-9]{1,2}(th|rd|st)?( |, |,)[0-9]{4}/i.exec(text);
      if (best != null) {
        found = best[0];
        foundarray[0] = found;
        foundarray[1] = found
        return foundarray;
      }

      //eg 3rd - 5th of March 1969
      if (found == null) {
        var second = /[0-9]{1,2}(th|rd|st)? ?( to |-| until |\/) ?[0-9]{1,2}(th|rd|st)? (of )?(july|august|september|october|november|december|january|february|march|april|may|june)( |, |,)[0-9]{4}/i.exec(text);
        if (second != null) {
          found = second[0];
          foundarray[0] = found;
          var start = found.replace(/(th|rd|st)? ?( to |-| until |\/) ?[0-9]{1,2}(th|rd|st)?( of)?/i, '');
          var end = found.replace(/[0-9]{1,2}(th|rd|st)? ?( to |-| until |\/) ?/i, '');
          start = start.replace('of', '');
          end = end.replace('of', '');
          foundarray[1] = start;
          foundarray[2] = end;
          return foundarray;
        }
      }
      //eg 3rd of March 1969
      if (found == null) {
        var second = /[0-9]{1,2}(th|rd|st)? ?(of )?(july|august|september|october|november|december|january|february|march|april|may|june)( |, |,)[0-9]{4}/i.exec(text);
        if (second != null) {
          found = second[0];
          foundarray[0] = found;
          foundarray[1] = found
          return foundarray;
        }
      }
      //eg September 1939 to April 1945
      if (found == null) {
        var third = /(july|august|september|october|november|december|january|february|march|april|may|june)( |, |,)(of )?[0-9]{4,4} ?( to |-| until ) ?(july|august|september|october|november|december|january|february|march|april|may|june)( |, |,)(of )?[0-9]{4,4}/i.exec(text); //
        if (third != null) {
          var start = third[0].replace(/ (to|-|until) (july|august|september|october|november|december|january|february|march|april|may|june)( |, |,)(of )?[0-9]{4,4}/i, '');
          var end = third[0].replace(/(july|august|september|october|november|december|january|february|march|april|may|june)( |, |,)(of )?[0-9]{4,4} (to|-|until) /i, '');
          found = third[0];
          foundarray[0] = found;
          foundarray[1] = start;
          foundarray[2] = end;
          return foundarray;
        }
      }

      //eg March 1969
      if (found == null) {
        var third = /(july|august|september|october|november|december|january|february|march|april|may|june)( |, |,)(of )?[0-9]{4,4}/i.exec(text); //
        if (third != null) {
          found = third[0];
          foundarray[0] = found;
          foundarray[1] = found
          return foundarray;
        }
      }

      //eg 400 - 600 BC
      if (found == null) {
        var year = / ([0-9]{3,4} ?- ?[0-9]{2,4} ?(BC.|B.C.|BC ))/i.exec(text);
        if (year != null) {
          found = year[1];
          found = found.replace(/ ?- ?[0-9]{2,4}/, '');
          foundarray[0] = found;
          foundarray[1] = found.replace(/(BC.|B.C.|BC |BCE.|B.C.E.|BCE )/, 'B.C.')
          return foundarray;
        }
      }

      //eg 1997-1998
      if (found == null) {
        var year = / [0-9]{4,4} ?(-|–| to | until ) ?'?[0-9]{4,4}/i.exec(text);
        if (year != null) {
          found = year[0];
          foundarray[0] = found;
          var tfound = found.replace(/ ?- ?'?[0-9]{4,4}/, '');
          if (tfound != null && tfound < 2020) {
            foundarray[1] = tfound

            var remove = /[0-9]{4} ?- ?/i.exec(found); //remove from date
            foundarray[2] = found.replace(remove[0], '');

            return foundarray;
          }
        }
      }
      //eg 1997-98
      if (found == null) {
        var year = / [0-9]{4,4} ?(-|–| to | until ) ?'?[0-9]{2,2}/i.exec(text);
        if (year != null) {
          found = year[0];
          foundarray[0] = found;
          var tfound = found.replace(/ ?- ?'?[0-9]{2,2}/, '');
          if (tfound != null && tfound < 2020) {
            foundarray[1] = tfound

            var remove = /[0-9]{2} ?- ?/i.exec(found); //remove from date
            foundarray[2] = found.replace(remove[0], '');

            return foundarray;
          }
        }
      }



      //eg 400 BC
      if (found == null) {
        var year = / ([0-9]{3,4} (BC.|B.C.|BC ))/i.exec(text);
        if (year != null) {
          found = year[1];
          foundarray[0] = found;
          foundarray[1] = found.replace(/(BC.|B.C.|BC |BCE.|B.C.E.|BCE )/, 'B.C.')
          return foundarray;
        }
      }


      //matches year
      if (found == null) {
        var year = / [0-9]{4,4}/i.exec(text);
        if (year != null && year < 2020) {
          found = year[0];
          foundarray[0] = found;
          foundarray[1] = found
          return foundarray;
        }
      }

      if (found != null) {
        break;
      }


      return foundarray;

    }


    //begin processing date to be mql-friendly

    //var str=formatdate('July 2, 1934'); acre.write(str);

    function formatdate(found) {
      if (!found) {
        return {};
      }
      found = found.replace('of ', '');
      found = found.replace('the ', '');
      found = found.replace('th ', ' ');
      found = found.replace('rd ', ' ');
      found = found.replace('1st ', '01');

      var month = /july|august|september|october|november|december|january|february|march|april|may|june/i.exec(found);
      month = '' + month;
      month = month.toLowerCase();
      var monthnum = 0;
      var months = {
        january: 1,
        february: 2,
        march: 3,
        april: 4,
        may: 5,
        june: 6,
        july: 7,
        august: 8,
        september: 9,
        october: 10,
        november: 11,
        december: 12,
      }
      monthnum = months[month]

      if (found.match('B.C.')) {
        var year = /[0-9]{3,4}/i.exec(found);
        year = year + '';
        if (year.length == 3) {
          year = '0' + year;
        }
        if (year.length == 2) {
          year = '00' + year;
        }
        year = '-' + year;
        return year;
      } //something bc
      else {
        var year = /[0-9]{4}/i.exec(found);
      } //normal years
      found = found.replace(year, '');
      var date = /[0-9]{1,2}/i.exec(found);

      return {
        "year": year,
        "month": monthnum,
        "day": date
      };
    }



  if (typeof module !== 'undefined' && module.exports) {
    module.exports = date_extractor;
  }

  return main;


})()


console.log(date_extractor("Feb. 14 1969"))