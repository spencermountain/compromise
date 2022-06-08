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
<img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>- including all informal text formats, and folksy shorthands.
</div>

<!-- spacer -->
<img height="15px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>


```js
import nlp from 'compromise'
import datePlugin from 'compromise-dates'
nlp.plugin(datePlugin)

let doc = nlp('the second monday of february')
doc.dates().get()[0]
/*
  { start: '2021-02-08T00:00:00.000Z', end: '2021-02-08T23:59:59.999Z'}
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
<h2><a href="http://compromise.cool/dates/">Demo</a></h2>
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
| *2020.08.13* | <sup>*alt-ISO*</sup>| '' | ''
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
| *02:12:00* | <sup>*weird iso-times*</sup>| '' | ''
| *two oclock* |<sup>*written formats*</sup> | '' | ''
| *before 1* | | '' | ''
| *noon* | | '' | ''
| *at night* | <sup>*informal daytimes*</sup> | '' | ''
| *in the morning* | | '' | ''
| *tomorrow evening* | | '' | ''
|<br/>**`timezones:`**| |
| *eastern time* | <sup>*informal zone support*</sup>| '' | '' 
| *est* |<sup>*TZ shorthands*</sup> | '' | '' 
| *peru time* | | '' | '' 
| *..in beirut* | <sup>*by location*</sup> | '' | '' 
| *GMT+9* | <sup>*by UTC/GMT offset*</sup>| '' | '' 
| *-4h* | '' | '' | '' 
| *Canada/Eastern* | <sup>*IANA codes*</sup>| '' | '' 
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
| *in seven weeks* | <sup>*now+duration*</sup>| '' | '' 
| *two days after june 6th* | <sup>*date+duration*</sup>| '' | '' 
| *2 weeks from now* | | '' | '' 
| *2 weeks after june* | | '' | '' 
| *2 years, 4 months, and 5 days ago* | <sup>*complex durations*</sup>| '' | '' 
| *a week and a half before* | <sup>*written-out numbers*</sup>| '' | '' 
| *a week friday* | <sup>*idiom format*</sup>| '' | '' 
|<br/>**`start/end:`**| |
| *end of the week* | <sup>*up-against the ending*</sup> | '' | '' 
| *start of next year* | <sup>*lean-toward starting*</sup>| '' | '' 
| *middle of q2 last year* |<sup>*rough-center calculation*</sup> | '' | '' 
|<br/>**`date-ranges:`**| |
| *between june and july* |<sup>*explicit ranges*</sup> | '' | ''
| *from today to next haloween* | | '' | ''
| *aug 1 - aug 31* | <sup>*dash-ranges*</sup>| '' | ''
| *22-23 February* | | '' | ''
| *today to next friday* | | '' | ''
| *during june* | | '' | ''
| *aug to june 1999* | <sup>*shared range info*</sup>| '' | ''
| *before [2019]* |<sup>*up-to a date*</sup> | '' | ''
| *by march* | | '' | ''
| *after february* | <sup>*date-to-infinity*</sup>| '' | ''
|<br/>**`repeating-intervals:`**| |
| *any wednesday* | <sup>*n-repeating dates*</sup> |  | 
| *any day in June* | <sup>*repeating-date in range*</sup> | June 1 ... | .. June 30
| *any wednesday this week* | | '' | ''
| *weekends in July* | <sup>*more-complex interval*</sup>| '' | ''
| *every weekday until February* | <sup>*interval until date*</sup>| '' | ''

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### *Things it does awkwardly:*
| *`hmmm,`* | <sup>*description*</sup> | `Start`   | `End` |
| ------------- |:-------------:| :-------------:|  :-------------:| 
| *middle of 2019/June* | tries to find the sorta-center | June 15 | '' |
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
  - **.times().format(fmt)** - convert between time formats '24h' | '{hour-pad}:{minute-pad}' [etc](https://github.com/spencermountain/spacetime/wiki/Formatting)
  - **.times().normalize()** - turn 3mins into 3 minutes



<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Configuration:
`.dates()` accepts an optional object, that lets you set the context for the date parsing.
```js
const context = {
  timezone: 'Canada/Eastern', //the default timezone is 'ETC/UTC'
  today: '2020-02-20', //the implicit, or reference day/year
  punt: { weeks: 2 }, // the implied duration to use for 'after june 2nd'
  dayStart: '8:00am',
  dayEnd: '5:30pm'
}

nlp('in two days').dates(context).get()
/*
  [{ start: '2020-02-22T08:00:00.000+5:00', end: '2020-02-22T17:30:00.000+5:00' }]
*/
```


<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>

## API
- **[.dates()](https://observablehq.com/@spencermountain/compromise-dates)** - find dates like `June 8th` or `03/03/18`
  - **[.dates().get()](https://observablehq.com/@spencermountain/compromise-dates)** - simple start/end json result
  - **[.dates().json()](https://observablehq.com/@spencermountain/compromise-dates)** - overloaded output with date metadata
  - **[.dates().format('')](https://observablehq.com/@spencermountain/compromise-dates)** - convert the dates to specific formats
  - **[.dates().toShortForm()](https://observablehq.com/@spencermountain/compromise-dates)** - convert 'Wednesday' to 'Wed', etc
  - **[.dates().toLongForm()](https://observablehq.com/@spencermountain/compromise-dates)** - convert 'Feb' to 'February', etc
- **[.durations()](https://observablehq.com/@spencermountain/compromise-dates)** - `2 weeks` or `5mins`
  - **[.durations().get()](https://observablehq.com/@spencermountain/compromise-dates)** - return simple json for duration
  - **[.durations().json()](https://observablehq.com/@spencermountain/compromise-dates)** - overloaded output with duration metadata
- **[.times()](https://observablehq.com/@spencermountain/compromise-dates)** - `4:30pm` or `half past five`
  - **[.durations().get()](https://observablehq.com/@spencermountain/compromise-dates)** - return simple json for times
  - **[.times().json()](https://observablehq.com/@spencermountain/compromise-dates)** - overloaded output with time metadata




<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

## *Opinions*:

### *Start of week:*
By default, weeks start on a Monday, and *'next week'* will run from Monday morning to Sunday night.
This can be configued in spacetime, but right now we are not passing-through this config.

### *Implied durations:*
*'after October'* returns a range starting **Nov 1st**, and ending **2-weeks** after, by default.
This can be configured by setting `punt` param in the context object:
```js
doc.dates({punt: { month: 1 }})
```

### *Future bias:*
*'May 7th'* will prefer a May 7th in the future.

The parser will return a past-date though, in the current-month:
```js
// from march 2nd
nlp('feb 30th').dates({today: '2021-02-01'}).get()

```

### *This/Next/Last:*
named-weeks or months eg *'this/next/last week'* are mostly straight-forward.

#### *This monday*
A bare 'monday' will always refer to itself, or the upcoming monday. 

* Saying *'this monday'* on monday, is itself.
* Saying *'this monday'* on tuesday , is next week.

Likewise, *'this june'* in June, is itself. *'this june'* in any other month, is the nearest June in the future.

Future versions of this library could look at sentence-tense to help disambiguate these dates - *'i paid on monday'* vs *'i will pay on monday'*.

#### *Last monday*
If it's Tuesday, *'last monday'* will not mean yesterday.

* Saying *'last monday'* on a tuesday will be -1 week.
* Saying *'a week ago monday'* will also work.
* Saying *'this past monday'* will return yesterday.

For reference, **Wit.ai** & **chronic** libraries both return yesterday. **Natty** and **SugarJs** returns -1 week, like we do.

*'last X'* can be less than 7 days backward, if it crosses a week starting-point:
* Saying *'last friday'* on a monday will be only a few days back.

#### *Next Friday*
If it's Tuesday, *'next wednesday'* will not be tomorrow. It will be a week after tomorrow.

* Saying *'next wednesday'* on a tuesday, will be +1 week.
* Saying *'a week wednesday'* will also be +1 week.
* Saying *'this coming wednesday'* will be tomorrow.

For reference, **Wit.ai**, **chronic**, and **Natty** libraries all return tomorrow. **SugarJs** returns +1 week, like we do.

### *Nth Week:*
The first week of a month, or a year is the first week *with a thursday in it*. This is a weird, but widely-held standard. I believe it's a military formalism. It cannot be (easily) configued. This means that the start-date for *first week of January* may be a Monday in December, etc.

As expected, *first monday of January* will always be in January.

### *British/American ambiguity:*
by default, we use the same interpretation of dates as javascript does - we assume `01/02/2020` is Jan 2nd, (US-version) but allow `13/01/2020` to be Jan 13th (UK-version). This should be possible to configure in the near future.

### *Seasons:*
By default, *'this summer'* will return **June 1 - Sept 1**, which is northern hemisphere ISO.
Configuring the default hemisphere should be possible in the future.

### *Day times:*
There are some hardcoded times for *'lunch time'* and others, but mainly, a day begins at `12:00am` and ends at `11:59pm` - the last millisecond of the day.

### *Invalid dates:*
compromise will tag anything that looks like a date, but not validate the dates until they are parsed.
* *'january 34th 2020'* will return **Jan 31 2020**.
* *'tomorrow at 2:62pm'* will return just return 'tomorrow'.
* *'6th week of february* will return the 2nd week of march.
* Setting an hour that's skipped, or repeated by a DST change will return the closest valid time to the DST change.

### *Inclusive/exclusive ranges:*
*'between january and march'* will include all of march. This is usually pretty-ambiguous normally.

### *Date greediness:*
This library makes no assumptions about the input text, and is careful to avoid false-positive dates.
If you know your text is a date, you can crank-up the date-tagger with a [compromise-plugin](https://observablehq.com/@spencermountain/compromise-plugins), like so:
```js
nlp.extend(function (Doc, world) {
  // ambiguous words
  world.addWords({
    weds: 'WeekDay',
    wed: 'WeekDay',
    sat: 'WeekDay',
    sun: 'WeekDay',
  })
  world.postProcess((doc) => {
    // tag '2nd quarter' as a date
    doc.match('#Ordinal quarter').tag('#Date')
    // tag '2/2' as a date (not a fraction)
    doc.match('/[0-9]{1,2}/[0-9]{1,2}/').tag('#Date')
  })
})
```


### *Misc:*
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
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>1 - <b>Regular-expressions</b> are too-brittle to parse dates.
</div>

<div align="left">
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>2 - <b>Neural-nets</b> are too-wonky to parse dates.
</div>

<div align="left">
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>3 - A <b>corporation</b>, or <b>startup</b> is the wrong place to build a universal date-parser.
</div>


<!-- spacer -->
<img height="40px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

Parsing <ins>*dates*</ins>, <ins>*times*</ins>, <ins>*durations*</ins>, and <ins>*intervals*</ins> from natural language can be a solved-problem.

A rule-based, community open-source library - *one based on simple NLP* - is the best way to build a natural language date parser -  commercial, or otherwise - for the frontend, or the backend.

The *[match-syntax](https://observablehq.com/@spencermountain/compromise-match-syntax)* is effective and easy, *javascript* is prevailing, and the more people who contribute, the better.


<img height="40px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### See also
* [Duckling](https://duckling.wit.ai/) - by wit.ai (facebook)
* [Sugarjs/dates](https://sugarjs.com/dates/) - by Andrew Plummer (js)
* [Chronic](https://github.com/mojombo/chronic) - by Tom Preston-Werner (Ruby)
* [SUTime](https://nlp.stanford.edu/software/sutime.shtml) - by Angel Chang, Christopher Manning (Java)
* [Natty](http://natty.joestelmach.com/) - by Joe Stelmach (Java)
* [rrule](https://github.com/jakubroztocil/rrule) - repeating date-interval handler (js)
* [ParseDateTime](https://pypi.org/project/parsedatetime/) by Mike Taylor (Python)

<div align="center">
  <img height="40px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

compromise-date is sponsored by <a href="https://www.simform.com/"><img src="https://user-images.githubusercontent.com/399657/107404468-4f3de700-6ad4-11eb-9d60-7a90625b57d6.png" width="150px"/></a>

**MIT** licenced
