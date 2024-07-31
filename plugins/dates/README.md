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

### _Things it does well:_

| `explicit-dates`                    |       <sup>_description_</sup>        |          `Start` |            `End` |
| ----------------------------------- | :-----------------------------------: | ---------------: | ---------------: |
| _march 2nd_                         |                                       | March 2, 12:00am | March 2, 11:59pm |
| _2 march_                           |                                       |               '' |               '' |
| _tues march 2_                      |                                       |               '' |               '' |
| _march the second_                  | <sup>_natural-language number_</sup>  |               '' |               '' |
| _on the 2nd_                        |     <sup>_implicit months_</sup>      |               '' |               '' |
| _tuesday the 2nd_                   |      <sup>_date-reckoning_</sup>      |               '' |               '' |
| <br/>**`numeric-dates:`**           |                                       |
| _2020/03/02_                        |       <sup>_iso formats_</sup>        |               '' |               '' |
| _2020-03-02_                        |                                       |               '' |               '' |
| _03-02-2020_                        |     <sup>_british formats_</sup>      |               '' |               '' |
| _03/02_                             |                                       |               '' |               '' |
| _2020.08.13_                        |         <sup>_alt-ISO_</sup>          |               '' |               '' |
| <br/>**`named-dates:`**             |                                       |
| _today_                             |                                       |                - |                - |
| _tomorrow_                          |                                       |               '' |               '' |
| _christmas eve_                     |    <sup>_calendar-holidays_</sup>     |  Dec 24, 12:00am |  Dec 24, 11:59pm |
| _easter_                            |  <sup>_astronomical holidays_</sup>   |        -depends- |                - |
| _q1_                                |                                       |   Jan 1, 12:00am |  Mar 31, 11:59pm |
| <br/>**`times:`**                   |                                       |
| _2pm_                               |                                       |               '' |               '' |
| _2:12pm_                            |                                       |               '' |               '' |
| _2:12_                              |                                       |               '' |               '' |
| _02:12:00_                          |     <sup>_weird iso-times_</sup>      |               '' |               '' |
| _two oclock_                        |     <sup>_written formats_</sup>      |               '' |               '' |
| _before 1_                          |                                       |               '' |               '' |
| _noon_                              |                                       |               '' |               '' |
| _at night_                          |    <sup>_informal daytimes_</sup>     |               '' |               '' |
| _in the morning_                    |                                       |               '' |               '' |
| _tomorrow evening_                  |                                       |               '' |               '' |
| <br/>**`timezones:`**               |                                       |
| _eastern time_                      |  <sup>_informal zone support_</sup>   |               '' |               '' |
| _est_                               |      <sup>_TZ shorthands_</sup>       |               '' |               '' |
| _peru time_                         |                                       |               '' |               '' |
| _..in beirut_                       |       <sup>_by location_</sup>        |               '' |               '' |
| _GMT+9_                             |    <sup>_by UTC/GMT offset_</sup>     |               '' |               '' |
| _-4h_                               |                  ''                   |               '' |               '' |
| _Canada/Eastern_                    |        <sup>_IANA codes_</sup>        |               '' |               '' |
| <br/>**`relative durations:`**      |                                       |
| _this march_                        |                                       |               '' |               '' |
| _this week_                         |                                       |               '' |               '' |
| _this sunday_                       |                                       |               '' |               '' |
| _next april_                        |                                       |               '' |               '' |
| _this past year_                    |                                       |               '' |               '' |
| _second week of march_              |                                       |               '' |               '' |
| _last weekend of march_             |                                       |               '' |               '' |
| _last spring_                       |                                       |               '' |               '' |
| _the saturday after next_           |                                       |               '' |               '' |
| <br/>**`punted dates:`**            |                                       |
| _in seven weeks_                    |       <sup>_now+duration_</sup>       |               '' |               '' |
| _two days after june 6th_           |      <sup>_date+duration_</sup>       |               '' |               '' |
| _2 weeks from now_                  |                                       |               '' |               '' |
| _2 weeks after june_                |                                       |               '' |               '' |
| _2 years, 4 months, and 5 days ago_ |    <sup>_complex durations_</sup>     |               '' |               '' |
| _a week and a half before_          |   <sup>_written-out numbers_</sup>    |               '' |               '' |
| _a week friday_                     |       <sup>_idiom format_</sup>       |               '' |               '' |
| <br/>**`start/end:`**               |                                       |
| _end of the week_                   |  <sup>_up-against the ending_</sup>   |               '' |               '' |
| _start of next year_                |   <sup>_lean-toward starting_</sup>   |               '' |               '' |
| _middle of q2 last year_            | <sup>_rough-center calculation_</sup> |               '' |               '' |
| <br/>**`date-ranges:`**             |                                       |
| _between june and july_             |     <sup>_explicit ranges_</sup>      |               '' |               '' |
| _from today to next haloween_       |                                       |               '' |               '' |
| _aug 1 - aug 31_                    |       <sup>_dash-ranges_</sup>        |               '' |               '' |
| _22-23 February_                    |                                       |               '' |               '' |
| _today to next friday_              |                                       |               '' |               '' |
| _during june_                       |                                       |               '' |               '' |
| _aug to june 1999_                  |    <sup>_shared range info_</sup>     |               '' |               '' |
| _before [2019]_                     |       <sup>_up-to a date_</sup>       |               '' |               '' |
| _by march_                          |                                       |               '' |               '' |
| _after february_                    |     <sup>_date-to-infinity_</sup>     |               '' |               '' |
| <br/>**`repeating-intervals:`**     |                                       |
| _any wednesday_                     |    <sup>_n-repeating dates_</sup>     |                  |
| _any day in June_                   | <sup>_repeating-date in range_</sup>  |       June 1 ... |       .. June 30 |
| _any wednesday this week_           |                                       |               '' |               '' |
| _weekends in July_                  |  <sup>_more-complex interval_</sup>   |               '' |               '' |
| _every weekday until February_      |   <sup>_interval until date_</sup>    |               '' |               '' |

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### _Things it does awkwardly:_

| _`hmmm,`_                |            <sup>_description_</sup>            | `Start` | `End` |
| ------------------------ | :--------------------------------------------: | :-----: | :---: |
| _middle of 2019/June_    |         tries to find the sorta-center         | June 15 |  ''   |
| _good friday 2025_       |  tries to reckon astronomically-set holidays   |   ''    |  ''   |
| _Oct 22 1975 2am in PST_ | historical DST changes (assumes current dates) |   ''    |  ''   |

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### _Things it doesn't do:_

| _😓,_                                       | <sup>_description_</sup> | `Start` | `End` |
| ------------------------------------------- | :----------------------: | :-----: | :---: |
| _not this Saturday, but the Saturday after_ |   self-reference logic   |   ''    |  ''   |
| _3 years ago tomorrow_                      |    folksy short-hand     |   ''    |  ''   |
| _2100_                                      |  military time formats   |   ''    |  ''   |
| _may 97_                                    |   'bare' 2-digit years   |   ''    |  ''   |

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
  - **[.dates().isBefore(iso)](https://observablehq.com/@spencermountain/compromise-dates)** - return only dates occuring before given date
  - **[.dates().isAfter(iso)](https://observablehq.com/@spencermountain/compromise-dates)** - return only dates occuring after given date
  - **[.dates().isSame(unit, iso)](https://observablehq.com/@spencermountain/compromise-dates)** - return only dates within a given year, month, date
- **[.durations()](https://observablehq.com/@spencermountain/compromise-dates)** - `2 weeks` or `5mins`
  - **[.durations().get()](https://observablehq.com/@spencermountain/compromise-dates)** - return simple json for duration
  - **[.durations().json()](https://observablehq.com/@spencermountain/compromise-dates)** - overloaded output with duration metadata
- **[.times()](https://observablehq.com/@spencermountain/compromise-dates)** - `4:30pm` or `half past five`
  - **[.durations().get()](https://observablehq.com/@spencermountain/compromise-dates)** - return simple json for times
  - **[.times().json()](https://observablehq.com/@spencermountain/compromise-dates)** - overloaded output with time metadata

<!-- spacer -->
<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Configuration:

`.dates()` accepts an optional object, that lets you set the context for the date parsing.

```js
const context = {
  timezone: 'Canada/Eastern', //the default timezone is 'ETC/UTC'
  today: '2020-02-20', //the implicit, or reference day/year
  punt: { weeks: 2 }, // the implied duration to use for 'after june 2nd'
  dayStart: '8:00am',
  dayEnd: '5:30pm',
  dmy : false //assume british-format dates, when unclear
}

nlp('in two days').dates(context).get()
/*
  [{ start: '2020-02-22T08:00:00.000+5:00', end: '2020-02-22T17:30:00.000+5:00' }]
*/
```

<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

## _Opinions_:

### _Start of week:_

By default, weeks start on a Monday, and _'next week'_ will run from Monday morning to Sunday night.
This can be configued in spacetime, but right now we are not passing-through this config.

### _Implied durations:_

_'after October'_ returns a range starting **Nov 1st**, and ending **2-weeks** after, by default.
This can be configured by setting `punt` param in the context object:

```js
doc.dates({ punt: { month: 1 } })
```

### _Future bias:_

_'May 7th'_ will prefer a May 7th in the future.

The parser will return a past-date though, in the current-month:

```js
// from march 2nd
nlp('feb 30th').dates({ today: '2021-02-01' }).get()
```

### _This/Next/Last:_

named-weeks or months eg _'this/next/last week'_ are mostly straight-forward.

#### _This monday_

A bare 'monday' will always refer to itself, or the upcoming monday.

- Saying _'this monday'_ on monday, is itself.
- Saying _'this monday'_ on tuesday , is next week.

Likewise, _'this june'_ in June, is itself. _'this june'_ in any other month, is the nearest June in the future.

Future versions of this library could look at sentence-tense to help disambiguate these dates - _'i paid on monday'_ vs _'i will pay on monday'_.

#### _Last monday_

If it's Tuesday, _'last monday'_ will not mean yesterday.

- Saying _'last monday'_ on a tuesday will be -1 week.
- Saying _'a week ago monday'_ will also work.
- Saying _'this past monday'_ will return yesterday.

For reference, **Wit.ai** & **chronic** libraries both return yesterday. **Natty** and **SugarJs** returns -1 week, like we do.

_'last X'_ can be less than 7 days backward, if it crosses a week starting-point:

- Saying _'last friday'_ on a monday will be only a few days back.

#### _Next Friday_

If it's Tuesday, _'next wednesday'_ will not be tomorrow. It will be a week after tomorrow.

- Saying _'next wednesday'_ on a tuesday, will be +1 week.
- Saying _'a week wednesday'_ will also be +1 week.
- Saying _'this coming wednesday'_ will be tomorrow.

For reference, **Wit.ai**, **chronic**, and **Natty** libraries all return tomorrow. **SugarJs** returns +1 week, like we do.

### _Nth Week:_

The first week of a month, or a year is the first week _with a thursday in it_. This is a weird, but widely-held standard. I believe it's a military formalism. It cannot be (easily) configued. This means that the start-date for _first week of January_ may be a Monday in December, etc.

As expected, _first monday of January_ will always be in January.

### _British/American ambiguity:_

by default, we use the same interpretation of dates as javascript does - we assume `01/02/2020` is Jan 2nd, (US-version) but allow `13/01/2020` to be Jan 13th (UK-version).

if you want to co-erce an interpretation of `02/03/1999`, you can set it with the `dmy:true` option:
```js
nlp('02/03/1999').dates().get() //February 3
nlp('02/03/1999').dates({dmy:true}).get() // March 2
```
ISO dates, (like `1999-03-02`) are unaffected by the change.

### _Seasons:_

By default, _'this summer'_ will return **June 1 - Sept 1**, which is northern hemisphere ISO.
Configuring the default hemisphere should be possible in the future.

### _Day times:_

There are some hardcoded times for _'lunch time'_ and others, but mainly, a day begins at `12:00am` and ends at `11:59pm` - the last millisecond of the day.

### _Invalid dates:_

compromise will tag anything that looks like a date, but not validate the dates until they are parsed.

- _'january 34th 2020'_ will return **Jan 31 2020**.
- _'tomorrow at 2:62pm'_ will return just return 'tomorrow'.
- _'6th week of february_ will return the 2nd week of march.
- Setting an hour that's skipped, or repeated by a DST change will return the closest valid time to the DST change.

### _Inclusive/exclusive ranges:_

_'between january and march'_ will include all of march. This is usually pretty-ambiguous normally.

### _Date greediness:_

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
  world.postProcess(doc => {
    // tag '2nd quarter' as a date
    doc.match('#Ordinal quarter').tag('#Date')
    // tag '2/2' as a date (not a fraction)
    doc.match('/[0-9]{1,2}/[0-9]{1,2}/').tag('#Date')
  })
})
```

### _Misc:_

- _'thursday the 16th'_ - will set to the 16th, even if it's not thursday
- _'in a few hours/years'_ - in 2 hours/years
- _'jan 5th 2008 to Jan 6th the following year'_ - date-range explicit references
- assume _'half past 5'_ is 5pm

<!-- spacer -->
<div align="center">
  <img height="40px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
  <hr/>
</div>
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221632-b9094000-ffb7-11e9-99e0-b48edd6cdf8a.png"/>
</div>

### _About:_

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

Parsing <ins>_dates_</ins>, <ins>_times_</ins>, <ins>_durations_</ins>, and <ins>_intervals_</ins> from natural language can be a solved-problem.

A rule-based, community open-source library - _one based on simple NLP_ - is the best way to build a natural language date parser - commercial, or otherwise - for the frontend, or the backend.

The _[match-syntax](https://observablehq.com/@spencermountain/compromise-match-syntax)_ is effective and easy, _javascript_ is prevailing, and the more people who contribute, the better.

<img height="40px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### See also

- [Duckling](https://duckling.wit.ai/) - by wit.ai (facebook)
- [Sugarjs/dates](https://sugarjs.com/dates/) - by Andrew Plummer (js)
- [Chronic](https://github.com/mojombo/chronic) - by Tom Preston-Werner (Ruby)
- [SUTime](https://nlp.stanford.edu/software/sutime.shtml) - by Angel Chang, Christopher Manning (Java)
- [Natty](http://natty.joestelmach.com/) - by Joe Stelmach (Java)
- [rrule](https://github.com/jakubroztocil/rrule) - repeating date-interval handler (js)
- [ParseDateTime](https://pypi.org/project/parsedatetime/) by Mike Taylor (Python)

<div align="center">
  <img height="40px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

compromise-date is sponsored by <a href="https://www.simform.com/"><img src="https://user-images.githubusercontent.com/399657/107404468-4f3de700-6ad4-11eb-9d60-7a90625b57d6.png" width="150px"/></a>

**MIT** licenced
