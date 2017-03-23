'use strict';
//
const lumper = (ts) => {

  //John & Joe's
  ts.match('#Noun (&|n) #Noun').lump().tag('Organization', 'Noun-&-Noun');

  //1 800 PhoneNumber
  ts.match('1 #Value #PhoneNumber').lump().tag('Organization', 'Noun-&-Noun');

  //6 am
  ts.match('#Holiday (day|eve)').lump().tag('Holiday', 'holiday-day');

  //Aircraft designer
  ts.match('#Noun #Actor').lump().tag('Actor', 'thing-doer');

  //timezones
  ts.match('(standard|daylight|summer|eastern|pacific|central|mountain) standard? time').lump().tag('Time', 'timezone');

  //canadian dollar, Brazilian pesos
  ts.match('#Demonym #Currency').lump().tag('Currency', 'demonym-currency');

  //(454) 232-9873
  ts.match('#NumericValue #PhoneNumber').lump().tag('PhoneNumber', '(800) PhoneNumber');
  return ts;
};
module.exports = lumper;
