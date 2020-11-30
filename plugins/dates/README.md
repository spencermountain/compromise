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
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-dates</code>
</div>
`compromise-date` also depends on [compromise-numbers](../numbers)
<div align="center">
  <code>npm install compromise-numbers</code>
</div>

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

### Date-Formats

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


### API

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

### Implied duration
*'after October'* returns a range starting **Nov 1st**, and ending 2-weeks after, by default.
This can be configured by setting `punt` param in the context object:
```js
doc.dates({punt: { month: 1 }})
```

### This/Next/Last
*'this/next/last week'* is mostly straight-forward.

But *'this monday'* is more ambiguous - here, it always refers to the future. On tuesday, saying 'this monday' means 'next monday'. This is, as I understand it, the most-intuitive interpretation. *'this monday'* on monday, is itself.

Likewise, *'this june'* in June, is itself. *'this june'* in any other month, is the nearest June in the future.

### Nth Week
The first week of a month, or a year is the first week *with a thursday in it*. This is a weird, but widely-held standard. It cannot be (easily) configued.

### British/American ambiguity
by default, we use the same interpretation of dates as javascript does - we assume `01/02/2020` is Jan 2nd, (US-version) but allow `13/01/2020` to be Jan 13th (UK-version). This should be possible to configure in the near future.

### Seasons
By default, *'this summer'* will return **June 1 - Sept 1**, which is northern hemisphere ISO.
Configuring the default hemisphere should be possible in the future.

### Day times
There are some hardcoded times for *'lunch time'* and others, but mainly, a day begins at `12:00am` and ends at `11:59pm` - the last millisecond of the day.

Work in progress.

MIT
