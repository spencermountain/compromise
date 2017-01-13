'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/log').enable();

//bug 1.
// const m = nlp('what is 10 and 10?');
// m.values().toNumber();
// m.check();

var text = `
Manchester United have rejected a £19 million bid from Everton for Morgan Schneiderlin, as the January transfer window continues to heat-up.

As reported by the Guardian, United are looking to recoup the £24 million they paid for Schneiderlin back in the summer of 2015, with the French midfielder struggling badly for game time under Jose Mourinho this season. With that in mind, the club turned down Everton's first official offer just days into the winter transfer window.

Get 24 Hours of Sky Sports and watch all of the action live with NOW TV for £6.99. Sign up and get a 10% Discount.

The newspaper reports that the Toffees' interest in Schneiderlin has been known for several weeks, as Ronald Koeman looks to strengthen his midfield options going into the second half of the season. The Dutchman worked with the 27-year-old during his spell in charge of Southampton, so knows what he's capable of at this level.

With Idrissa Gueye now heading off to the African Cup of Nations and James McCarthy's fitness still a cause for concern, Everton are eyeing several additions to their squad this month, while West Bromwich Albion are also believed to be interested in Schneiderlin's services, according to the paper.

The French international was a consistent figure under Louis van Gaal last season, featuring alongside the likes of Michael Carrick, Ander Herrera and Bastian Schweinsteiger in midfield, but his situation has drastically changed this term, with Paul Pogba arriving at Old Trafford for a world-record fee in the summer.

Schneiderlin has won 33% of his average duels and registered an average pass accuracy of 87% in three Premier League appearances this season, as United sit sixth on 39 points, one behind the top four and nine clear of Everton in seventh.

Next up for them is a home clash with Reading in the FA Cup on Saturday, before taking on Hull City at Old Trafford.

64.3% of Morgan Schneiderlin's passes have been forward in the Premier League this season.
`;
let arr = nlp(text).topics().data();
console.log(arr);
