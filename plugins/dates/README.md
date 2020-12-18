<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>WIP date-parsing plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-dates">
    <img src="https://img.shields.io/npm/v/compromise-dates.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-dates/builds/compromise-dates.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise/master/plugins/dates/builds/compromise-dates.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-dates</code>
</div>

`compromise-date` also depends on [compromise-numbers](../numbers)

<div align="center">
  <code>npm install compromise-numbers</code>
</div>

`compromise-dates` can turn natural-language date forms like `June ninth-fourteenth` into parsed ISO dates with start+end times.

```js
const nlp = require('compromise')
nlp.extend(require('compromise-dates'))
nlp.extend(require('compromise-numbers'))

let doc = nlp('my birthday is June 5th 1998')
doc.dates().json()
/*[{ 
  text: 'June 5th 1998',
  date: { start: '1998-06-05T00:00:00.000-04:00', end: null } 
}]*/
```

### Things it does:

**explicit-dates**
- `march 2nd`
- `2 march`
- `tues march 2`
- `march the second`
- `on the 2nd`
**numerical-dates**
- `1999/03/02`
- `1999-03-02`
- `03-02-1999`
- `03/02`
- `2015.08.13`
**named-dates**
- `today`
- `easter`
- `q1`
- `tomorrow`
**time:**
- `2pm`
- `2:12pm`
- `2:12`
- `02:12:00`
- `2 oclock`
- `before 1`
- `noon`
- `at night`
- `in the morning`
- `tomorrow evening`
**timezone:**
- `eastern time`
- `est`
- `peru time`
- `GMT+9`
**relative duration**
- `this march`
- `this week`
- `this sunday`
- `next april`
- `this past year`
- `second week of march`
- `last weekend of march`
- `last spring`
- `the saturday after next`
**punt**
- `two days after tomorrow`
- `in seven weeks`
- `2 weeks from now`
- `2 weeks after`
- `2 years 4 months 5 days ago`
- `a week friday`
- `a week and a half before`
- `on the 1st`
**start/end**
- `end of the week`
- `start of next year`
- `start of next year`
- `middle of q2 last year`

#### Date-ranges
- `between [june] and [july]`
- `from [today] to [haloween]`
- `[aug 1] - [aug 31]`
- `[today] to [next friday]`
- `during june` 
- `before [2019]`
- `by march`
- `after february`
- `22-23 February`


### Things it does awkwardly
* `middle of 2019/June` - tries to find the center
* `good friday 2025` - tries to reckon astronomically-set holidays
* historical DST changes `Oct 22 1975 in PST` (always uses this year's DST date)

### Things it doesn't do
* things like `not this Saturday, but the Saturday after`
* repeating dates like `every sunday` - only contiguous times are supported
* `3 years ago tomorrow`
* military time formats like `2100`
* 'bare' 2-digit years like `may 97`  - ('97 is supported)

## API

- **.dates()** - find dates like `June 8th` or `03/03/18`
  - **.dates().json()** - overloaded output with date metadata
  - **.dates().format('')** - convert the dates to specific formats

`.dates()` accepts an optional object, that lets you set the context for the date parsing.

```js
const context = {
  timezone: 'Canada/Eastern', //the default timezone is 'ETC/UTC'
  today: '2020-02-20', //the implicit, or reference day/year
  punt: { weeks: 2 }, // the implied duration to use for 'after june 2nd'
}

nlp('in two days')
  .dates(context)
  .json()
```

### Method

ranges:
  * *between {} and {}*
  * *in {}*
  * *before {}*
  * *after {}*

tokens:
```
  shift:    '5 weeks before' to {weeks:-5}
            '14 hours after' to {hours:14}
  
  counter:  '4th week of' to {unit:week, num:4}
            '10th hour in' to {unit:hour, num:10}
            'last hour in' to {unit:hour, num:'last'}
  
  time:      'at 5pm' to '5:00pm'
  
  timezone:  'EST' to 'America/New_York'
  
  relative:  'next wednesday'
```

Units:
  * **Week** - 'mon-sun'
  * **Month** - 'march 2020'
  * **Quarter** - 'q2 2020'
  * **Season** - 'summer'
  * **Year** - '2019'
  * **Weekend** - 'sat-sun'
  * **Day** - '12:00am-11:59pm'
  * **CalendarDate** - 'June 22'
  * **WeekDay** - 'thursday'
  * **Holiday** - 'easter'
  * **Hour** - '4pm'
  * **Minute** - '4:32pm'


## Opinions

### Start of week
By default, weeks start on a Monday, and *'next week'* will run from Monday morning to Sunday night.
This can be configued in spacetime, but right now we are not passing-through this config.

### Implied durations
*'after October'* returns a range starting **Nov 1st**, and ending **2-weeks** after, by default.
This can be configured by setting `punt` param in the context object:
```js
doc.dates({punt: { month: 1 }})
```

### Future bias
*'May 7th'* will prefer a May 7th in the future

### This/Next/Last
*'this/next/last week'* is mostly straight-forward.

But *'this monday'* and *'monday'* is more ambiguous - here, it always refers to the future. On tuesday, saying 'this monday' means 'next monday'. As I understand it, this is the most-intuitive interpretation. Saying *'this monday'* on monday, is itself.

Likewise, *'this june'* in June, is itself. *'this june'* in any other month, is the nearest June in the future.

Future versions of this library may look at sentence-tense to help disambiguate these dates - *'i paid on monday'* vs *'i will pay on monday'*.

### Nth Week
The first week of a month, or a year is the first week *with a thursday in it*. This is a weird, but widely-held standard. I believe it's a military formalism. It cannot be (easily) configued. This means that the start-date for *first week of January* may be a Monday in December, etc.

As expected, *first monday of January* will always be in January.

### British/American ambiguity
by default, we use the same interpretation of dates as javascript does - we assume `01/02/2020` is Jan 2nd, (US-version) but allow `13/01/2020` to be Jan 13th (UK-version). This should be possible to configure in the near future.

### Seasons
By default, *'this summer'* will return **June 1 - Sept 1**, which is northern hemisphere ISO.
Configuring the default hemisphere should be possible in the future.

### Day times
There are some hardcoded times for *'lunch time'* and others, but mainly, a day begins at `12:00am` and ends at `11:59pm` - the last millisecond of the day.

### Invalid dates
compromise will tag anything that looks like a date, but not validate the dates until they are parsed.
* *'january 34th 2020'* will return **Jan 31 2020**.
* *'tomorrow at 2:62pm'* will return just return 'tomorrow'.
* *'6th week of february* will return the 2nd week of march.
* Setting an hour that's skipped, or repeated by a DST change will return the closest valid time to the DST change.

### Inclusive/exclusive ranges
*'between january and march'* will include all of march. This is usually pretty-ambiguous normally.

### Misc
* *'thursday the 16th'* - will set to the 16th, even if it's not thursday
* *'in a few hours/years'* - in 2 hours/years
* *'jan 5th 2008 to Jan 6th the following year'* - date-range explicit references
* assume *'half past 5'* is 5pm

### See also
* [Duckling](https://duckling.wit.ai/) - by wit.ai (facebook)
* [Chronic](https://github.com/mojombo/chronic) - by Tom Preston-Werner (Ruby)
* [SUTime](https://nlp.stanford.edu/software/sutime.shtml) - by Angel Chang, Christopher Manning (Java)
* [Natty](http://natty.joestelmach.com/) - by Joe Stelmach (Java)
* [ParseDateTime](https://pypi.org/project/parsedatetime/) by Mike Taylor (Python)

Work in progress.

MIT
