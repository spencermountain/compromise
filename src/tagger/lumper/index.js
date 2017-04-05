'use strict';
//
const lumper = (ts) => {

  //John & Joe's
  ts.match('#Noun (&|n) #Noun').tag('Organization', 'Noun-&-Noun');

  //1 800 PhoneNumber
  ts.match('1 #Value #PhoneNumber').tag('PhoneNumber', '1-800-Value');
  //(454) 232-9873
  ts.match('#NumericValue #PhoneNumber').tag('PhoneNumber', '(800) PhoneNumber');

  //6 am
  ts.match('#Holiday (day|eve)').tag('Holiday', 'holiday-day');

  //Aircraft designer
  ts.match('#Noun #Actor').tag('Actor', 'thing-doer');

  //timezones
  ts.match('(standard|daylight|summer|eastern|pacific|central|mountain) standard? time').tag('Time', 'timezone');

  //canadian dollar, Brazilian pesos
  ts.match('#Demonym #Currency').tag('Currency', 'demonym-currency');

  return ts;
};
module.exports = lumper;
