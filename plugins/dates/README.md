<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>date-parsing plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div> 

  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-dates">
    <img src="https://img.shields.io/npm/v/compromise-dates.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-dates/builds/compromise-dates.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/dates/builds/compromise-dates.min.js" />
  </a>

  <div align="center">
    <code>npm install compromise-dates</code>
  </div>
</div>

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

This library is an earnest attempt to get date information out of text, in a clear way -
<div >
<img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>- including all informal formats, and folksy shorthands.
</div>

<!-- spacer -->
<img height="15px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>


```js
const nlp = require('compromise')
nlp.extend(require('compromise-dates'))

let doc = nlp('the second monday of february')
doc.dates().get(0)
/*
  {}
*/
```

<img height="10px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

<img height="15px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>


<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221632-b9094000-ffb7-11e9-99e0-b48edd6cdf8a.png"/>
</div>

<div align="left">
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>• <b><i>Tokenization</i></b> and <b><i>disambiguation</i></b> with compromise</i>.
</div>
<div align="left">
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>• <b><i>Timezone</i></b> and <b><i>DST</i></b> reckoning with <a href="https://github.com/spencermountain/spacetime">spacetime <sup>[1]</sup></a>
</div>
<div align="left">
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>• <b><i>Number-parsing</i></b> with <i><a href="https://github.com/spencermountain/compromise/tree/master/plugins/numbers">compromise-numbers <sup>[1]</sup></a></i>
</div>
<div align="left">
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>• <b><i>Timezone reconciliation</i></b> with <a href="https://github.com/spencermountain/spacetime-informal">spacetime-informal <sup>[1]</sup></a>
</div>

<img height="55px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

<img  src="https://user-images.githubusercontent.com/399657/109049133-e5156c80-76a5-11eb-9690-e8af1e3764b1.png" />

<img height="35px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>


<div align="center">
<h3><a href="#">Demo</a></h3>
</div>

<img height="15px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### *Things it does well:*

| `explicit-dates` | <sup>*description*</sup> | `Start`   | `End` |
| ------------- |:-------------:| -----:| -----:|
| *march 2nd* | |March 2, 12:00am | March 2, 11:59pm
| *2 march* | | '' | ''
| *tues march 2*| | '' | ''
| *march the second* | <sup>*natural-language number*</sup> | '' | ''
| *on the 2nd* | <sup>*implicit months*</sup> | '' | ''
| *tuesday the 2nd* | <sup>*date-reckoning*</sup> | '' | ''
|<br/>**`numeric-dates:`**| |
| *2020/03/02* |<sup>*iso formats*</sup> | '' | ''
| *2020-03-02* | | '' | ''
| *03-02-2020* |<sup>*british formats*</sup> | '' | ''
| *03/02* | | '' | ''
| *2020.08.13* | | '' | ''
|<br/>**`named-dates:`**| |
| *today* | | - | -
| *tomorrow* | | '' | ''
| *christmas eve* |<sup>*calendar-holidays*</sup> | Dec 24, 12:00am | Dec 24, 11:59pm
| *easter* |<sup>*astronomical holidays*</sup> | -depends- | -
| *q1* | | Jan 1, 12:00am | Mar 31, 11:59pm
|<br/>**`times:`**| |
| *2pm* | | '' | ''
| *2:12pm* | | '' | ''
| *2:12* | | '' | ''
| *02:12:00* | | '' | ''
| *2 oclock* | | '' | ''
| *before 1* | | '' | ''
| *noon* | | '' | ''
| *at night* | | '' | ''
| *in the morning* | | '' | ''
| *tomorrow evening* | | '' | ''
|<br/>**`timezones:`**| |
| *eastern time* | | '' | '' 
| *est* | | '' | '' 
| *peru time* | | '' | '' 
| *GMT+9* | | '' | '' 
|<br/>**`relative durations:`**| |
| *this march* | | '' | ''
| *this week* | | '' | ''
| *this sunday* | | '' | ''
| *next april* | | '' | ''
| *this past year* | | '' | ''
| *second week of march* | | '' | ''
| *last weekend of march* | | '' | ''
| *last spring* | | '' | ''
| *the saturday after next* | | '' | ''
|<br/>**`punted dates:`**| |
| *two days after tomorrow* | | '' | '' 
| *in seven weeks* | | '' | '' 
| *2 weeks from now* | | '' | '' 
| *2 weeks after* | | '' | '' 
| *2 years 4 months 5 days ago* | | '' | '' 
| *a week friday* | | '' | '' 
| *a week and a half before* | | '' | '' 
| *on the 1st* | | '' | '' 
|<br/>**`start/end:`**| |
| *end of the week* | | '' | '' 
| *start of next year* | | '' | '' 
| *start of next year* | | '' | '' 
| *middle of q2 last year* | | '' | '' 
|<br/>**`date-ranges:`**| |
| *between [june] and [july]* | | '' | ''
| *from [today] to [haloween]* | | '' | ''
| *[aug 1] - [aug 31]* | | '' | ''
| *[today] to [next friday]* | | '' | ''
| *during june`* | | '' | ''
| *before [2019]* | | '' | ''
| *by march* | | '' | ''
| *after february* | | '' | ''
| *22-23 February* | | '' | ''


<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### *Things it does awkwardly:*
| *`hmmm,`* | <sup>*description*</sup> | `Start`   | `End` |
| ------------- |:-------------:| :-------------:|  :-------------:| 
| *middle of 2019/June* | tries to find the sorta-center | 'June 15' | '' |
| *good friday 2025* | tries to reckon astronomically-set holidays| '' | '' |
| *Oct 22 1975 2am in PST* | historical DST changes (assumes current dates) | '' | '' |

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### *Things it doesn't do:*
| *😓,* | <sup>*description*</sup> | `Start`   | `End` |
| ------------- |:-------------:| :-------------:|  :-------------:| 
| *not this Saturday, but the Saturday after* | self-reference logic | '' | '' |
| *3 years ago tomorrow* | folksy short-hand  | '' | '' |
| *2100* | military time formats  | '' | '' |
| *may 97* | 'bare' 2-digit years  | '' | '' |


<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

<div align="center">
<!-- spacer -->
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221848-11404200-ffb8-11e9-90cd-3adee8d8564f.png"/>
</div>

## API

- **.dates()** - find dates like `June 8th` or `03/03/18`
  - **.dates().get()** - parsed dates as json
  - **.dates().json()** - overloaded json output with date metadata
  - **.dates().format('')** - convert the dates to specific formats
 
- **.durations()** - find unspecified lengths of time like `two hours and 30mins`
  - **.durations().get()** - parsed durations as json
  - **.durations().json()** - overloaded json output with duration metadata
  - **.durations().normalize()** - turn 3mins into 3 minutes
 
- **.times()** - find day-times like `three oclock`
  - **.times().get()** - parsed times as json
  - **.times().json()** - overloaded json output with time metadata
  - **.times().normalize()** - turn 3mins into 3 minutes

`.dates()` accepts an optional object, that lets you set the context for the date parsing.


<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Configuration:
```js
const context = {
  timezone: 'Canada/Eastern', //the default timezone is 'ETC/UTC'
  today: '2020-02-20', //the implicit, or reference day/year
  punt: { weeks: 2 }, // the implied duration to use for 'after june 2nd'
  dayStart: '8:00am',
  dayEndt: '5:30pm'
}

nlp('in two days').dates(context).json()
```


<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>

## API
- **[.dates()](https://observablehq.com/@spencermountain/compromise-dates)** - 'June 2021', 'next week'
  - **[.dates().json()](https://observablehq.com/@spencermountain/compromise-dates)** - overloaded output with date metadata
  - **[.dates().format('')](https://observablehq.com/@spencermountain/compromise-dates)** - convert the dates to specific formats
  - **[.dates().toShortForm()](https://observablehq.com/@spencermountain/compromise-dates)** - convert 'Wednesday' to 'Wed', etc
  - **[.dates().toLongForm()](https://observablehq.com/@spencermountain/compromise-dates)** - convert 'Feb' to 'February', etc
- **.durations()** - 'seven days and two hours', '30mins'
  - **.json()** - overloaded json output with duration info
  - **.get()** - grab parsed duration
- **.times()** - 'three pm', '9 oclock'
  - **.json()** - overloaded json output with time info
  - **.get()** - grab parsed time





<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

## *Opinions*:

#### *Start of week:*
By default, weeks start on a Monday, and *'next week'* will run from Monday morning to Sunday night.
This can be configued in spacetime, but right now we are not passing-through this config.

#### *Implied durations:*
*'after October'* returns a range starting **Nov 1st**, and ending **2-weeks** after, by default.
This can be configured by setting `punt` param in the context object:
```js
doc.dates({punt: { month: 1 }})
```

#### *Future bias:*
*'May 7th'* will prefer a May 7th in the future

#### *This/Next/Last:*
*'this/next/last week'* is mostly straight-forward.

But *'this monday'* and *'monday'* is more ambiguous - here, it always refers to the future. On tuesday, saying 'this monday' means 'next monday'. As I understand it, this is the most-intuitive interpretation. Saying *'this monday'* on monday, is itself.

Likewise, *'this june'* in June, is itself. *'this june'* in any other month, is the nearest June in the future.

Future versions of this library may look at sentence-tense to help disambiguate these dates - *'i paid on monday'* vs *'i will pay on monday'*.

#### *Nth Week:*
The first week of a month, or a year is the first week *with a thursday in it*. This is a weird, but widely-held standard. I believe it's a military formalism. It cannot be (easily) configued. This means that the start-date for *first week of January* may be a Monday in December, etc.

As expected, *first monday of January* will always be in January.

#### *British/American ambiguity:*
by default, we use the same interpretation of dates as javascript does - we assume `01/02/2020` is Jan 2nd, (US-version) but allow `13/01/2020` to be Jan 13th (UK-version). This should be possible to configure in the near future.

#### *Seasons:*
By default, *'this summer'* will return **June 1 - Sept 1**, which is northern hemisphere ISO.
Configuring the default hemisphere should be possible in the future.

#### *Day times:*
There are some hardcoded times for *'lunch time'* and others, but mainly, a day begins at `12:00am` and ends at `11:59pm` - the last millisecond of the day.

#### *Invalid dates:*
compromise will tag anything that looks like a date, but not validate the dates until they are parsed.
* *'january 34th 2020'* will return **Jan 31 2020**.
* *'tomorrow at 2:62pm'* will return just return 'tomorrow'.
* *'6th week of february* will return the 2nd week of march.
* Setting an hour that's skipped, or repeated by a DST change will return the closest valid time to the DST change.

#### *Inclusive/exclusive ranges:*
*'between january and march'* will include all of march. This is usually pretty-ambiguous normally.

#### *Misc:*
* *'thursday the 16th'* - will set to the 16th, even if it's not thursday
* *'in a few hours/years'* - in 2 hours/years
* *'jan 5th 2008 to Jan 6th the following year'* - date-range explicit references
* assume *'half past 5'* is 5pm

<!-- spacer -->
<div align="center">
  <img height="40px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
  <hr/>
</div>
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221632-b9094000-ffb7-11e9-99e0-b48edd6cdf8a.png"/>
</div>

### *About:*

<!-- spacer -->
<img height="10px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>


<div align="left">
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>1 - <b>Regular-expressions</b> are the wrong way to parse dates.
</div>

<div align="left">
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>2 - <b>Neural-nets</b> are the wrong way to parse dates.
</div>

<div align="left">
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>3 - A <b>startup</b> is the wrong place to build a universal date-parser.
</div>


<!-- spacer -->
<img height="40px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

Parsing <ins>*dates*</ins>, <ins>*times*</ins>, and <ins>*durations*</ins> from natural language can be a solved-problem.

A rule-based, community open-source library - *one based on simple NLP* - is the best way to build a natural language date parser -  commercial, or otherwise - for the frontend, or the backend.

The *[match-syntax](https://observablehq.com/@spencermountain/compromise-match-syntax)* is effective and easy, *javascript* is prevailing, and the more people who contribute, the better.


<img height="40px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### See also
* [Duckling](https://duckling.wit.ai/) - by wit.ai (facebook)
* [Chronic](https://github.com/mojombo/chronic) - by Tom Preston-Werner (Ruby)
* [SUTime](https://nlp.stanford.edu/software/sutime.shtml) - by Angel Chang, Christopher Manning (Java)
* [Natty](http://natty.joestelmach.com/) - by Joe Stelmach (Java)
* [ParseDateTime](https://pypi.org/project/parsedatetime/) by Mike Taylor (Python)
* [rrule](https://github.com/jakubroztocil/rrule) - repeating date-interval handler (js)

<div align="center">
  <img height="40px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

Work on compromise-date is sponsored by <a href="https://www.simform.com/"><img src="https://user-images.githubusercontent.com/399657/107404468-4f3de700-6ad4-11eb-9d60-7a90625b57d6.png" width="150px"/></a>

**MIT** licenced
