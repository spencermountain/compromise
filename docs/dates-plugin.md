# Dates plugin

`compromise-dates` finds dates, times, and durations in text, and resolves them to
start/end timestamps.

It handles the informal forms people actually write - `the second monday of
february`, `a week and a half before`, `4pm est`, `every weekday until february` - and is deliberately
careful about false-positives, so `May will join us` and `Version 3.10` are not dates.

It is rule-based: tokenization and disambiguation come from compromise, number-parsing from the
numbers plugin, and timezone/DST reckoning from [spacetime](https://github.com/spencermountain/spacetime).

## Usage

`npm install compromise compromise-dates`

```js
import nlp from 'compromise'
import datePlugin from 'compromise-dates'
nlp.plugin(datePlugin)

let doc = nlp('the second monday of february')
doc.dates().json()
/*
[{
  start: '2027-02-08T00:00:00.000Z',
  end: '2027-02-08T23:59:59.999Z',
  timezone: 'Etc/UTC',
  duration: { years: 0, months: 0, days: 1, hours: 0, minutes: 0 },
  unit: 'day'
}]
*/
```

##Details:

Dates are resolved relative to _now_, in the system timezone unless told otherwise. Pass a
context object to pin both, which you should do in tests, or on a server:

```js
let context = {
  today: '2026-11-04', // the reference moment - iso string, epoch, or Date
  timezone: 'America/New_York', // iana name
}
nlp('in two days').dates(context).get(0).start
// '2026-11-06T00:00:00.000-05:00'
```

Every result is a half-open-ish range: `start` is the first millisecond, `end` the last. A bare
day runs `00:00:00.000` to `23:59:59.999`. A clock time has `start === end`. A date with a time
(`tomorrow at 3pm`) starts at the time and ends at the end of that day.

Date terms are tagged - `#Date`, `#Time`, `#Duration`, `#Holiday`, `#Timezone`, `#WeekDay`,
`#Month`, and the plugin's own `#DateShift` for `two weeks before` - so they can be used in
`.match()` patterns. `doc.debug('dates')` prints each date's resolved range.

## API

### `.dates(context?)`

Returns a View of every date-phrase in the document. `context` is optional:

| option     | default         | meaning                                                                    |
| ---------- | --------------- | -------------------------------------------------------------------------- |
| `today`    | now             | the reference moment - an iso string, epoch number, or Date                |
| `timezone` | system timezone | an iana name like `Canada/Eastern`. Text like `4pm est` overrides it       |
| `punt`     | `{ weeks: 2 }`  | the implied length of open-ended ranges, like `after june 2nd`             |
| `dayStart` | none            | when set, like `'8:00am'`, a day-range starts there instead of at midnight |
| `dayEnd`   | none            | when set, like `'5:30pm'`, a day-range ends there, and so does `eod`       |
| `dmy`      | `false`         | read ambiguous numeric dates as day/month/year - `02/03` becomes March 2nd |

| method                | returns | description                                                                                                |
| --------------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `.get(n?)`            | array   | parsed `{ start, end, timezone, duration, unit, repeat }` objects, or just the nth one                     |
| `.json(opts?)`        | array   | the normal `.json()` output with a `dates` object added to each match                                      |
| `.format(fmt)`        | View    | replaces each date in the document with a formatted string, using spacetime's `{month} {date}` syntax      |
| `.add(n, unit?)`      | View    | shifts each date forward and rewrites the text - `june 5th` becomes `june 7th`. The unit defaults to `day` |
| `.subtract(n, unit?)` | View    | the same, backwards                                                                                        |
| `.isValid()`          | View    | drops matches that do not resolve - `february 222`, `nov 42nd`, `someday`                                  |
| `.isBefore(date)`     | View    | keeps only dates that start before the given date - an iso string, or any parseable text                   |
| `.isAfter(date)`      | View    | keeps only dates that start after it                                                                       |
| `.isSame(unit, date)` | View    | keeps only dates in the same `year`, `month`, `day`, etc.                                                  |

All of these chain, and the filters keep the context you passed in:

```js
let doc = nlp('nov 42nd, june 5th 2027, and april 7 2008')
doc.dates({ timezone: 'UTC' }).isValid().isBefore('2010').out('array')
// ['april 7 2008']

doc = nlp('i went skiing two days after November 1st 2019 at 7pm')
doc.dates().format('{day} {month} {date-ordinal}, {time}')
doc.text()
// 'i went skiing Sunday November 3rd, 7:00pm'

doc = nlp('it was june 5th 2020')
doc.dates().add(2, 'days')
doc.text()
// 'it was june 7th 2020'
```

The shape of each `.get()` result:

```js
{
  start: '2026-11-05T15:00:00.000Z',  // iso, in the resolved timezone
  end: '2026-11-05T23:59:59.999Z',    // iso, or null for an unparsed date
  timezone: 'Etc/UTC',
  duration: { years: 0, months: 0, days: 0, hours: 9, minutes: 0 }, // end minus start
  unit: 'time',                        // 'year' | 'quarter' | 'month' | 'week' | 'day' | 'time', when it fits one
  repeat: {                            // only for repeating dates
    interval: { day: 1 },
    filter: { weekDays: { tuesday: true } },
    choose: 'AND',                     // 'AND' for 'every', 'OR' for 'any'
    time: '5:00pm',                    // only if given
  },
}
```

### `.times(n?)`

Returns clock-times like `4:30pm`, `half past five`, or `16:30`, independent of any date.

| method         | description                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| `.get(n?)`     | `{ time: '4:30pm', '24h': '16:30', hour: 16, minute: 30 }` per match                                  |
| `.json(opts?)` | `.json()` output with a `time` object on each match                                                   |
| `.format(fmt)` | rewrites each time in the document - `'24h'`, or a spacetime format like `{hour-24-pad}:{minute-pad}` |

```js
let doc = nlp('tomorrow 5:45pm')
doc.times().format('24h')
doc.text()
// 'tomorrow 17:45'
```

### `.durations(n?)`

Returns lengths of time like `2 weeks`, `30mins`, or `two hours and 8 mins`. A shift from now
like `in 20 mins` is a date, not a duration, and `for 20 mins` is a duration, not a date.

| method         | description                                             |
| -------------- | ------------------------------------------------------- |
| `.get(n?)`     | `{ hour: 2, minute: 8 }` per match                      |
| `.json(opts?)` | `.json()` output with a `duration` object on each match |

Supported units: `millisecond`, `second`, `minute`, `hour`, `day`, `week`, `weekend`, `month`,
`quarter`, `season`, `year`, `decade`, `century`, and their plurals and short forms (`min`, `hr`,
`sec`, `wk`, `yr`, `qtr`).

## Opinions

The parser has to decide things that English does not:

- **Future bias** - a bare `june` or `friday` is the next one, including today. The exception is
  the current month: `may 7th` on may 20th is this year's, two weeks ago. A bare numeric `03/02`
  also stays in the current year.
- **Weeks start on monday**, and run to sunday night. The `first week of june` is the first week
  with a thursday in it, so it may start in may.
- **`next friday` on a tuesday** is a week after this friday. Use `this coming friday` or
  `this friday` for the near one. Likewise `last monday` on a tuesday is a week back; `this past
monday` is yesterday.
- **`between january and march`** is exclusive, ending where march begins. `january to march` is
  inclusive, ending with march.
- **Open-ended ranges punt** - `after october` starts Nov 1st and runs for the `punt` duration,
  two weeks by default. `before march` runs from now to the end of february.
- **Seasons are northern-hemisphere**, and two months long: spring is march-april, summer
  june-july, autumn september-october, winter december-january.
- **A bare number from 1 to 12 with a slash** is month/day, like javascript. `13/01/2020` is read
  as day/month because it has to be. Set `dmy: true` to flip the default.
- **Invalid dates are tagged but not parsed** - `february 30, 2026` and `january 34th` are tagged
  `#Date`, but `.get()` returns nothing for them, and `.isValid()` drops them.
- **DST gaps** - an hour that is skipped or repeated by a DST change returns the closest valid time.

## Supported formats

Every phrase below was run through `.dates(context).get()` with this context, so the ISO
strings are the actual output. The reference day is a **Wednesday**:

```js
let context = { today: '2026-11-04T10:00:00', timezone: 'Etc/UTC' }
```

Future dates resolve forward from that day - `june` is June 2027, `thanksgiving` is still 2026. A
phrase that returns two rows returned two dates.

### Explicit dates

| text                         | start                    | end                      |
| ---------------------------- | ------------------------ | ------------------------ |
| march 2nd                    | 2027-03-02T00:00:00.000Z | 2027-03-02T23:59:59.999Z |
| 2 march                      | 2027-03-02T00:00:00.000Z | 2027-03-02T23:59:59.999Z |
| march 2nd, 2027              | 2027-03-02T00:00:00.000Z | 2027-03-02T23:59:59.999Z |
| March 2, 2027                | 2027-03-02T00:00:00.000Z | 2027-03-02T23:59:59.999Z |
| 2 Mar 2027                   | 2027-03-02T00:00:00.000Z | 2027-03-02T23:59:59.999Z |
| Mar. 2, 2027                 | 2027-03-02T00:00:00.000Z | 2027-03-02T23:59:59.999Z |
| Sept 10th                    | 2027-09-10T00:00:00.000Z | 2027-09-10T23:59:59.999Z |
| the 2nd of March 2027        | 2027-03-02T00:00:00.000Z | 2027-03-02T23:59:59.999Z |
| march the second             | 2027-03-02T00:00:00.000Z | 2027-03-02T23:59:59.999Z |
| march second                 | 2027-03-02T00:00:00.000Z | 2027-03-02T23:59:59.999Z |
| june fifth 2027              | 2027-06-05T00:00:00.000Z | 2027-06-05T23:59:59.999Z |
| May twenty-fourth, 2010      | 2010-05-24T00:00:00.000Z | 2010-05-24T23:59:59.999Z |
| the twenty third of June     | 2027-06-23T00:00:00.000Z | 2027-06-23T23:59:59.999Z |
| on the 18th                  | 2026-11-18T00:00:00.000Z | 2026-11-18T23:59:59.999Z |
| on the fourteenth            | 2026-11-14T00:00:00.000Z | 2026-11-14T23:59:59.999Z |
| the 15th of next month       | 2026-12-15T00:00:00.000Z | 2026-12-15T23:59:59.999Z |
| tuesday the 2nd              | 2026-12-02T00:00:00.000Z | 2026-12-02T23:59:59.999Z |
| Thursday, September 10, 2026 | 2026-09-10T00:00:00.000Z | 2026-09-10T23:59:59.999Z |
| Thu., Sept. 10, 2026         | 2026-09-10T00:00:00.000Z | 2026-09-10T23:59:59.999Z |
| SEPTEMBER 10TH, 2026         | 2026-09-10T00:00:00.000Z | 2026-09-10T23:59:59.999Z |
| @ march 2nd                  | 2027-03-02T00:00:00.000Z | 2027-03-02T23:59:59.999Z |
| July 4th, 1776               | 1776-07-04T00:00:00.000Z | 1776-07-04T23:59:59.999Z |

### Numeric dates

| text                      | start                         | end                           |
| ------------------------- | ----------------------------- | ----------------------------- |
| 2027/03/02                | 2027-03-02T00:00:00.000Z      | 2027-03-02T23:59:59.999Z      |
| 2027-03-02                | 2027-03-02T00:00:00.000Z      | 2027-03-02T23:59:59.999Z      |
| 2027.03.02                | 2027-03-02T00:00:00.000Z      | 2027-03-02T23:59:59.999Z      |
| 03/02/2027                | 2027-03-02T00:00:00.000Z      | 2027-03-02T23:59:59.999Z      |
| 03-02-2027                | 2027-03-02T00:00:00.000Z      | 2027-03-02T23:59:59.999Z      |
| 25-12-2027                | 2027-12-25T00:00:00.000Z      | 2027-12-25T23:59:59.999Z      |
| 03/02                     | 2026-03-02T00:00:00.000Z      | 2026-03-02T23:59:59.999Z      |
| Sep-2012                  | 2012-09-01T00:00:00.000Z      | 2012-09-30T23:59:59.999Z      |
| 2026-09-10T16:30:00Z      | 2026-09-10T16:30:00.000Z      | 2026-09-10T16:30:00.000Z      |
| 2026-09-10T16:30:00+05:00 | 2026-09-10T16:30:00.000+05:00 | 2026-09-10T16:30:00.000+05:00 |
| 25-12-1999 12:32          | 1999-12-25T12:32:00.000Z      | 1999-12-25T23:59:59.999Z      |

### Years, months, seasons, quarters

| text                       | start                    | end                      |
| -------------------------- | ------------------------ | ------------------------ |
| 2027                       | 2027-01-01T00:00:00.000Z | 2027-12-31T23:59:59.999Z |
| in 1990                    | 1990-01-01T00:00:00.000Z | 1990-12-31T23:59:59.999Z |
| june                       | 2027-06-01T00:00:00.000Z | 2027-06-30T23:59:59.999Z |
| june 2027                  | 2027-06-01T00:00:00.000Z | 2027-06-30T23:59:59.999Z |
| June of 2027               | 2027-06-01T00:00:00.000Z | 2027-06-30T23:59:59.999Z |
| sept 2027                  | 2027-09-01T00:00:00.000Z | 2027-09-30T23:59:59.999Z |
| Sept, 2012                 | 2012-09-01T00:00:00.000Z | 2012-09-30T23:59:59.999Z |
| next march                 | 2028-03-01T00:00:00.000Z | 2028-03-31T23:59:59.999Z |
| last june                  | 2026-06-01T00:00:00.000Z | 2026-06-30T23:59:59.999Z |
| this june                  | 2027-06-01T00:00:00.000Z | 2027-06-30T23:59:59.999Z |
| every june                 | 2027-06-01T00:00:00.000Z | 2027-06-30T23:59:59.999Z |
| november 10th of last year | 2025-11-10T00:00:00.000Z | 2025-11-10T23:59:59.999Z |
| june 7 next year           | 2027-06-07T00:00:00.000Z | 2027-06-07T23:59:59.999Z |
| summer 2027                | 2027-06-01T00:00:00.000Z | 2027-07-31T23:59:59.999Z |
| this summer                | 2026-06-01T00:00:00.000Z | 2026-07-31T23:59:59.999Z |
| next spring                | 2027-03-01T00:00:00.000Z | 2027-04-30T23:59:59.999Z |
| last winter                | 2025-12-01T00:00:00.000Z | 2026-01-31T23:59:59.999Z |
| autumn 2027                | 2027-09-01T00:00:00.000Z | 2027-10-31T23:59:59.999Z |
| fall 2027                  | 2027-09-01T00:00:00.000Z | 2027-10-31T23:59:59.999Z |
| summer of '69              | 1969-06-01T00:00:00.000Z | 1969-07-31T23:59:59.999Z |
| q1                         | 2026-01-01T00:00:00.000Z | 2026-03-31T23:59:59.999Z |
| q3                         | 2026-07-01T00:00:00.000Z | 2026-09-30T23:59:59.999Z |
| q2 2027                    | 2027-04-01T00:00:00.000Z | 2027-06-30T23:59:59.999Z |
| first quarter              | 2026-01-01T00:00:00.000Z | 2026-03-31T23:59:59.999Z |
| third quarter 2027         | 2027-07-01T00:00:00.000Z | 2027-09-30T23:59:59.999Z |
| the second quarter of 2027 | 2027-04-01T00:00:00.000Z | 2027-06-30T23:59:59.999Z |

### Spoken and two-digit years

| text                                            | start                    | end                      |
| ----------------------------------------------- | ------------------------ | ------------------------ |
| twenty twenty-six                               | 2026-01-01T00:00:00.000Z | 2026-12-31T23:59:59.999Z |
| in twenty thirty                                | 2030-01-01T00:00:00.000Z | 2030-12-31T23:59:59.999Z |
| june 5th twenty twenty-seven                    | 2027-06-05T00:00:00.000Z | 2027-06-05T23:59:59.999Z |
| christmas twenty twenty-six                     | 2026-12-25T00:00:00.000Z | 2026-12-25T23:59:59.999Z |
| may 97                                          | 1997-05-01T00:00:00.000Z | 1997-05-31T23:59:59.999Z |
| june of '98                                     | 1998-06-01T00:00:00.000Z | 1998-06-30T23:59:59.999Z |
| the tenth of September, two thousand twenty-six | 2026-09-10T00:00:00.000Z | 2026-09-10T23:59:59.999Z |

### Named days

| text                     | start                    | end                      |
| ------------------------ | ------------------------ | ------------------------ |
| today                    | 2026-11-04T00:00:00.000Z | 2026-11-04T23:59:59.999Z |
| tomorrow                 | 2026-11-05T00:00:00.000Z | 2026-11-05T23:59:59.999Z |
| yesterday                | 2026-11-03T00:00:00.000Z | 2026-11-03T23:59:59.999Z |
| day after tomorrow       | 2026-11-06T00:00:00.000Z | 2026-11-06T23:59:59.999Z |
| the day after next       | 2026-11-06T00:00:00.000Z | 2026-11-06T23:59:59.999Z |
| the day before yesterday | 2026-11-02T00:00:00.000Z | 2026-11-02T23:59:59.999Z |
| sometime today           | 2026-11-04T00:00:00.000Z | 2026-11-04T23:59:59.999Z |
| later today              | 2026-11-04T00:00:00.000Z | 2026-11-04T23:59:59.999Z |

### Holidays

| text                     | start                    | end                      |
| ------------------------ | ------------------------ | ------------------------ |
| christmas                | 2026-12-25T00:00:00.000Z | 2026-12-25T23:59:59.999Z |
| christmas eve            | 2026-12-24T00:00:00.000Z | 2026-12-24T23:59:59.999Z |
| xmas                     | 2026-12-25T00:00:00.000Z | 2026-12-25T23:59:59.999Z |
| next christmas           | 2027-12-25T00:00:00.000Z | 2027-12-25T23:59:59.999Z |
| new years                | 2027-01-01T00:00:00.000Z | 2027-01-01T23:59:59.999Z |
| new years eve            | 2026-12-31T00:00:00.000Z | 2026-12-31T23:59:59.999Z |
| new years day 2030       | 2030-01-01T00:00:00.000Z | 2030-01-01T23:59:59.999Z |
| valentines day           | 2027-02-14T00:00:00.000Z | 2027-02-14T23:59:59.999Z |
| halloween                | 2027-10-31T00:00:00.000Z | 2027-10-31T23:59:59.999Z |
| summer solstice          | 2027-06-21T00:00:00.000Z | 2027-06-21T23:59:59.999Z |
| Christmas 2027           | 2027-12-25T00:00:00.000Z | 2027-12-25T23:59:59.999Z |
| easter 2027              | 2027-03-28T00:00:00.000Z | 2027-03-28T23:59:59.999Z |
| halloween night          | 2027-10-31T20:00:00.000Z | 2027-10-31T23:59:59.999Z |
| Christmas morning at 9am | 2026-12-25T09:00:00.000Z | 2026-12-25T23:59:59.999Z |

### Weekdays

| text                       | start                    | end                      |
| -------------------------- | ------------------------ | ------------------------ |
| monday                     | 2026-11-09T00:00:00.000Z | 2026-11-09T23:59:59.999Z |
| tuesday                    | 2026-11-10T00:00:00.000Z | 2026-11-10T23:59:59.999Z |
| wednesday                  | 2026-11-04T00:00:00.000Z | 2026-11-04T23:59:59.999Z |
| thurs                      | 2026-11-05T00:00:00.000Z | 2026-11-05T23:59:59.999Z |
| on sat                     | 2026-11-07T00:00:00.000Z | 2026-11-07T23:59:59.999Z |
| this friday                | 2026-11-06T00:00:00.000Z | 2026-11-06T23:59:59.999Z |
| this coming monday         | 2026-11-09T00:00:00.000Z | 2026-11-09T23:59:59.999Z |
| this upcoming monday       | 2026-11-09T00:00:00.000Z | 2026-11-09T23:59:59.999Z |
| this past monday           | 2026-11-02T00:00:00.000Z | 2026-11-02T23:59:59.999Z |
| next friday                | 2026-11-13T00:00:00.000Z | 2026-11-13T23:59:59.999Z |
| next mon                   | 2026-11-09T00:00:00.000Z | 2026-11-09T23:59:59.999Z |
| last friday                | 2026-10-30T00:00:00.000Z | 2026-10-30T23:59:59.999Z |
| last thurs                 | 2026-10-29T00:00:00.000Z | 2026-10-29T23:59:59.999Z |
| a week after this friday   | 2026-11-13T00:00:00.000Z | 2026-11-13T23:59:59.999Z |
| two weeks from this friday | 2026-11-20T00:00:00.000Z | 2026-11-20T23:59:59.999Z |
| the saturday after next    | 2026-11-14T00:00:00.000Z | 2026-11-14T23:59:59.999Z |
| the Monday after next      | 2026-11-16T00:00:00.000Z | 2026-11-16T23:59:59.999Z |
| friday on the 6th          | 2026-11-06T00:00:00.000Z | 2026-11-06T23:59:59.999Z |
| thursday the 16th          | 2026-11-16T00:00:00.000Z | 2026-11-16T23:59:59.999Z |
| Tuesday, 10 January        | 2027-01-10T00:00:00.000Z | 2027-01-10T23:59:59.999Z |
| tuesday april 1st, 2027    | 2027-04-01T00:00:00.000Z | 2027-04-01T23:59:59.999Z |
| Sunday 12/7/2027           | 2027-12-07T00:00:00.000Z | 2027-12-07T23:59:59.999Z |
| saturday am                | 2026-11-07T09:00:00.000Z | 2026-11-07T23:59:59.999Z |

### Relative periods

| text                    | start                    | end                      |
| ----------------------- | ------------------------ | ------------------------ |
| this week               | 2026-11-02T00:00:00.000Z | 2026-11-08T23:59:59.999Z |
| next week               | 2026-11-09T00:00:00.000Z | 2026-11-15T23:59:59.999Z |
| last week               | 2026-10-26T00:00:00.000Z | 2026-11-01T23:59:59.999Z |
| the past week           | 2026-10-26T00:00:00.000Z | 2026-11-01T23:59:59.999Z |
| this weekend            | 2026-11-07T00:00:00.000Z | 2026-11-08T23:59:59.999Z |
| next weekend            | 2026-11-14T00:00:00.000Z | 2026-11-15T23:59:59.999Z |
| last weekend            | 2026-10-31T00:00:00.000Z | 2026-11-01T23:59:59.999Z |
| this past weekend       | 2026-10-31T00:00:00.000Z | 2026-11-01T23:59:59.999Z |
| weekend after next      | 2026-11-21T00:00:00.000Z | 2026-11-22T23:59:59.999Z |
| week after next         | 2026-11-16T00:00:00.000Z | 2026-11-22T23:59:59.999Z |
| this month              | 2026-11-01T00:00:00.000Z | 2026-11-30T23:59:59.999Z |
| next month              | 2026-12-01T00:00:00.000Z | 2026-12-31T23:59:59.999Z |
| last month              | 2026-10-01T00:00:00.000Z | 2026-10-31T23:59:59.999Z |
| current month           | 2026-11-01T00:00:00.000Z | 2026-11-30T23:59:59.999Z |
| this quarter            | 2026-10-01T00:00:00.000Z | 2026-12-31T23:59:59.999Z |
| next quarter            | 2027-01-01T00:00:00.000Z | 2027-03-31T23:59:59.999Z |
| last quarter            | 2026-07-01T00:00:00.000Z | 2026-09-30T23:59:59.999Z |
| this year               | 2026-01-01T00:00:00.000Z | 2026-12-31T23:59:59.999Z |
| next year               | 2027-01-01T00:00:00.000Z | 2027-12-31T23:59:59.999Z |
| last year               | 2025-01-01T00:00:00.000Z | 2025-12-31T23:59:59.999Z |
| this past year          | 2025-01-01T00:00:00.000Z | 2025-12-31T23:59:59.999Z |
| current year            | 2026-01-01T00:00:00.000Z | 2026-12-31T23:59:59.999Z |
| sometime next week      | 2026-11-09T00:00:00.000Z | 2026-11-15T23:59:59.999Z |
| at some point next week | 2026-11-09T00:00:00.000Z | 2026-11-15T23:59:59.999Z |
| sometime this month     | 2026-11-01T00:00:00.000Z | 2026-11-30T23:59:59.999Z |
| this day                | 2026-11-04T00:00:00.000Z | 2026-11-04T23:59:59.999Z |
| last day                | 2026-11-03T00:00:00.000Z | 2026-11-03T23:59:59.999Z |

### Nth position in a period

| text                                 | start                    | end                      |
| ------------------------------------ | ------------------------ | ------------------------ |
| first week of june                   | 2027-05-31T00:00:00.000Z | 2027-06-06T23:59:59.999Z |
| second week of february              | 2027-02-08T00:00:00.000Z | 2027-02-14T23:59:59.999Z |
| third week of 2027                   | 2027-01-11T00:00:00.000Z | 2027-01-17T23:59:59.999Z |
| last week of december                | 2026-12-28T00:00:00.000Z | 2027-01-03T23:59:59.999Z |
| first weekend of 2027                | 2027-01-02T00:00:00.000Z | 2027-01-03T23:59:59.999Z |
| the last weekend in october          | 2027-10-30T00:00:00.000Z | 2027-10-31T23:59:59.999Z |
| second weekend of june               | 2027-06-12T00:00:00.000Z | 2027-06-13T23:59:59.999Z |
| first day of february                | 2027-02-01T00:00:00.000Z | 2027-02-01T23:59:59.999Z |
| last day of february                 | 2027-02-28T00:00:00.000Z | 2027-02-28T23:59:59.999Z |
| last day of q1 2027                  | 2027-03-31T00:00:00.000Z | 2027-03-31T23:59:59.999Z |
| the last day of this month           | 2026-11-30T00:00:00.000Z | 2026-11-30T23:59:59.999Z |
| last day of the year                 | 2026-12-31T00:00:00.000Z | 2026-12-31T23:59:59.999Z |
| third day of 2027                    | 2027-01-03T00:00:00.000Z | 2027-01-03T23:59:59.999Z |
| 100th day of 2027                    | 2027-04-10T00:00:00.000Z | 2027-04-10T23:59:59.999Z |
| 3rd month of 2027                    | 2027-03-01T00:00:00.000Z | 2027-03-31T23:59:59.999Z |
| 2nd month in 2028                    | 2028-02-01T00:00:00.000Z | 2028-02-29T23:59:59.999Z |
| first hour of 2027                   | 2027-01-01T00:00:00.000Z | 2027-01-01T00:59:59.999Z |
| last hour of March 2027              | 2027-03-31T23:00:00.000Z | 2027-03-31T23:59:59.999Z |
| 30th minute of 2027                  | 2027-01-01T00:30:00.000Z | 2027-01-01T00:30:59.999Z |
| 5th day of q2 2027                   | 2027-04-05T00:00:00.000Z | 2027-04-05T23:59:59.999Z |
| 1st of the last month                | 2026-10-01T00:00:00.000Z | 2026-10-31T23:59:59.999Z |
| the 5th of next month                | 2026-12-05T00:00:00.000Z | 2026-12-05T23:59:59.999Z |
| the first Monday of October 2027     | 2027-10-04T00:00:00.000Z | 2027-10-04T23:59:59.999Z |
| the second monday of february        | 2027-02-08T00:00:00.000Z | 2027-02-08T23:59:59.999Z |
| the fourth Thursday of November 2027 | 2027-11-25T00:00:00.000Z | 2027-11-25T23:59:59.999Z |
| the last Friday of September 2027    | 2027-09-24T00:00:00.000Z | 2027-09-24T23:59:59.999Z |
| last friday in june                  | 2027-06-25T00:00:00.000Z | 2027-06-25T23:59:59.999Z |

### Start, middle, and end

| text                   | start                    | end                      |
| ---------------------- | ------------------------ | ------------------------ |
| middle of february     | 2027-02-15T00:00:00.000Z | 2027-02-21T23:59:59.999Z |
| middle of q2 last year | 2026-05-16T12:00:00.000Z | 2026-06-08T05:59:59.999Z |
| end of february        | 2027-02-28T23:59:59.999Z | 2027-02-28T23:59:59.999Z |
| end of the week        | 2026-11-08T23:59:59.999Z | 2026-11-08T23:59:59.999Z |
| end of the month       | 2026-11-30T23:59:59.999Z | 2026-11-30T23:59:59.999Z |
| end of 2027            | 2027-12-31T23:59:59.999Z | 2027-12-31T23:59:59.999Z |
| eod                    | 2026-11-04T22:00:00.000Z | 2026-11-04T22:00:00.000Z |
| eom                    | 2026-11-30T00:00:00.000Z | 2026-11-30T23:59:59.999Z |
| eoy                    | 2026-12-31T00:00:00.000Z | 2026-12-31T23:59:59.999Z |

### Shifted from now

| text                                | start                    | end                      |
| ----------------------------------- | ------------------------ | ------------------------ |
| in 3 days                           | 2026-11-07T00:00:00.000Z | 2026-11-07T23:59:59.999Z |
| in ten days                         | 2026-11-14T00:00:00.000Z | 2026-11-14T23:59:59.999Z |
| in 2 weeks                          | 2026-11-18T00:00:00.000Z | 2026-11-18T23:59:59.999Z |
| in six weeks                        | 2026-12-16T00:00:00.000Z | 2026-12-16T23:59:59.999Z |
| in 3 months                         | 2027-02-04T00:00:00.000Z | 2027-02-04T23:59:59.999Z |
| in 18 months                        | 2028-05-04T00:00:00.000Z | 2028-05-04T23:59:59.999Z |
| in 2 years                          | 2028-11-04T00:00:00.000Z | 2028-11-04T23:59:59.999Z |
| in a week                           | 2026-11-11T00:00:00.000Z | 2026-11-11T23:59:59.999Z |
| in a year                           | 2027-11-04T00:00:00.000Z | 2027-11-04T23:59:59.999Z |
| in a fortnight                      | 2026-11-18T00:00:00.000Z | 2026-11-18T23:59:59.999Z |
| in a month's time                   | 2026-12-04T00:00:00.000Z | 2026-12-04T23:59:59.999Z |
| in a dozen days                     | 2026-11-16T00:00:00.000Z | 2026-11-16T23:59:59.999Z |
| in a hundred years                  | 2126-11-04T00:00:00.000Z | 2126-11-04T23:59:59.999Z |
| in a few days                       | 2026-11-07T00:00:00.000Z | 2026-11-07T23:59:59.999Z |
| in a couple of weeks                | 2026-11-18T00:00:00.000Z | 2026-11-18T23:59:59.999Z |
| in an hour                          | 2026-11-04T11:00:00.000Z | 2026-11-04T11:00:00.000Z |
| in half an hour                     | 2026-11-04T10:30:00.000Z | 2026-11-04T10:30:00.000Z |
| in an hour and a half               | 2026-11-04T11:30:00.000Z | 2026-11-04T11:30:00.000Z |
| in ninety minutes                   | 2026-11-04T11:30:00.000Z | 2026-11-04T11:30:00.000Z |
| in 48 hours                         | 2026-11-06T10:00:00.000Z | 2026-11-06T10:00:00.000Z |
| in 20 mins                          | 2026-11-04T10:20:00.000Z | 2026-11-04T10:20:00.000Z |
| 3 days ago                          | 2026-11-01T00:00:00.000Z | 2026-11-01T23:59:59.999Z |
| 2 weeks ago                         | 2026-10-21T00:00:00.000Z | 2026-10-21T23:59:59.999Z |
| a fortnight ago                     | 2026-10-21T00:00:00.000Z | 2026-10-21T23:59:59.999Z |
| 6 months ago                        | 2026-05-04T00:00:00.000Z | 2026-05-04T23:59:59.999Z |
| a year ago                          | 2025-11-04T00:00:00.000Z | 2025-11-04T23:59:59.999Z |
| two hundred days ago                | 2026-04-18T00:00:00.000Z | 2026-04-18T23:59:59.999Z |
| 2 years 4 months ago                | 2024-07-04T00:00:00.000Z | 2024-07-04T23:59:59.999Z |
| 2 years, 4 months, and 5 days ago   | 2024-06-29T00:00:00.000Z | 2024-06-29T23:59:59.999Z |
| an hour ago                         | 2026-11-04T09:00:00.000Z | 2026-11-04T09:00:00.000Z |
| three days from now                 | 2026-11-07T00:00:00.000Z | 2026-11-07T23:59:59.999Z |
| a week from today                   | 2026-11-11T00:00:00.000Z | 2026-11-11T23:59:59.999Z |
| a week from tomorrow                | 2026-11-12T00:00:00.000Z | 2026-11-12T23:59:59.999Z |
| a year ago today                    | 2025-11-04T00:00:00.000Z | 2025-11-04T23:59:59.999Z |
| a week ago yesterday                | 2026-10-27T00:00:00.000Z | 2026-10-27T23:59:59.999Z |
| two weeks and three days from today | 2026-11-21T00:00:00.000Z | 2026-11-21T23:59:59.999Z |
| one year and two months from today  | 2028-01-04T00:00:00.000Z | 2028-01-04T23:59:59.999Z |
| a hundred years from now            | 2126-11-04T00:00:00.000Z | 2126-11-04T23:59:59.999Z |
| roughly two weeks from today        | 2026-11-18T00:00:00.000Z | 2026-11-18T23:59:59.999Z |
| 2 weeks hence                       | 2026-11-18T00:00:00.000Z | 2026-11-18T23:59:59.999Z |
| in 2-4 years from now               | 2028-11-04T00:00:00.000Z | 2030-11-04T23:59:59.999Z |

### Shifted from a date

| text                                | start                    | end                      |
| ----------------------------------- | ------------------------ | ------------------------ |
| two days after june 6th             | 2027-06-08T00:00:00.000Z | 2027-06-08T23:59:59.999Z |
| twenty five days before june 1st    | 2027-05-07T00:00:00.000Z | 2027-05-07T23:59:59.999Z |
| three days after September 30, 2027 | 2027-10-03T00:00:00.000Z | 2027-10-03T23:59:59.999Z |
| the day after December 31, 2026     | 2027-01-01T00:00:00.000Z | 2027-01-01T23:59:59.999Z |
| one week before January 1, 2027     | 2026-12-25T00:00:00.000Z | 2026-12-25T23:59:59.999Z |
| a week after easter                 | 2027-04-04T00:00:00.000Z | 2027-04-04T23:59:59.999Z |
| two days before christmas           | 2026-12-23T00:00:00.000Z | 2026-12-23T23:59:59.999Z |
| a month after new years             | 2027-02-01T00:00:00.000Z | 2027-02-01T23:59:59.999Z |
| the day after christmas             | 2026-12-26T00:00:00.000Z | 2026-12-26T23:59:59.999Z |
| three years after yesterday         | 2029-11-03T00:00:00.000Z | 2029-11-03T23:59:59.999Z |
| two weeks after thanksgiving        | 2026-12-10T00:00:00.000Z | 2026-12-10T23:59:59.999Z |
| 2 weeks after june                  | 2027-06-15T00:00:00.000Z | 2027-06-15T23:59:59.999Z |
| a week and a half before            | 2026-10-24T22:00:00.000Z | 2026-10-24T22:00:00.000Z |
| november 10th in two years          | 2028-11-10T00:00:00.000Z | 2028-11-10T23:59:59.999Z |
| three days before new years         | 2026-12-29T00:00:00.000Z | 2026-12-29T23:59:59.999Z |
| two weeks after thanksgiving, 2027  | 2027-12-09T00:00:00.000Z | 2027-12-09T23:59:59.999Z |

### Clock times

| text                  | start                    | end                      |
| --------------------- | ------------------------ | ------------------------ |
| 2pm                   | 2026-11-04T14:00:00.000Z | 2026-11-04T14:00:00.000Z |
| 2:12pm                | 2026-11-04T14:12:00.000Z | 2026-11-04T14:12:00.000Z |
| 2:12                  | 2026-11-04T14:12:00.000Z | 2026-11-04T14:12:00.000Z |
| 02:12:00              | 2026-11-04T02:12:00.000Z | 2026-11-04T02:12:00.000Z |
| 14:30                 | 2026-11-04T14:30:00.000Z | 2026-11-04T14:30:00.000Z |
| 15:45                 | 2026-11-04T15:45:00.000Z | 2026-11-04T15:45:00.000Z |
| @14:00                | 2026-11-04T14:00:00.000Z | 2026-11-04T14:00:00.000Z |
| 4 p.m.                | 2026-11-04T16:00:00.000Z | 2026-11-04T16:00:00.000Z |
| two oclock            | 2026-11-04T14:00:00.000Z | 2026-11-04T14:00:00.000Z |
| 2 oclock pm           | 2026-11-04T14:00:00.000Z | 2026-11-04T14:00:00.000Z |
| at eleven oclock      | 2026-11-04T11:00:00.000Z | 2026-11-04T11:00:00.000Z |
| six thirty pm         | 2026-11-04T18:30:00.000Z | 2026-11-04T18:30:00.000Z |
| eleven thirty am      | 2026-11-04T11:30:00.000Z | 2026-11-04T11:30:00.000Z |
| half past 3           | 2026-11-04T15:30:00.000Z | 2026-11-04T15:30:00.000Z |
| quarter past 5        | 2026-11-04T17:15:00.000Z | 2026-11-04T17:15:00.000Z |
| quarter to five       | 2026-11-04T16:45:00.000Z | 2026-11-04T16:45:00.000Z |
| at ten to 4           | 2026-11-04T15:50:00.000Z | 2026-11-04T15:50:00.000Z |
| ten past 8            | 2026-11-04T08:10:00.000Z | 2026-11-04T08:10:00.000Z |
| twenty past 4         | 2026-11-04T16:20:00.000Z | 2026-11-04T16:20:00.000Z |
| five past 3           | 2026-11-04T15:05:00.000Z | 2026-11-04T15:05:00.000Z |
| at 20 past            | 2026-11-04T11:20:00.000Z | 2026-11-04T11:20:00.000Z |
| noon                  | 2026-11-04T12:00:00.000Z | 2026-11-04T12:00:00.000Z |
| midnight              | 2026-11-04T00:00:00.000Z | 2026-11-04T00:00:00.000Z |
| midday                | 2026-11-04T12:00:00.000Z | 2026-11-04T12:00:00.000Z |
| eod                   | 2026-11-04T22:00:00.000Z | 2026-11-04T22:00:00.000Z |
| lunchtime             | 2026-11-04T12:00:00.000Z | 2026-11-04T12:00:00.000Z |
| dinnertime            | 2026-11-04T18:00:00.000Z | 2026-11-04T18:00:00.000Z |
| 4 in the morning      | 2026-11-04T04:00:00.000Z | 2026-11-04T04:00:00.000Z |
| 4:30 in the evening   | 2026-11-04T16:30:00.000Z | 2026-11-04T16:30:00.000Z |
| 5:30 in the afternoon | 2026-11-04T17:30:00.000Z | 2026-11-04T17:30:00.000Z |
| 7 at night            | 2026-11-04T19:00:00.000Z | 2026-11-04T19:00:00.000Z |
| at 3pm sharp          | 2026-11-04T15:00:00.000Z | 2026-11-04T15:00:00.000Z |
| 4pm on the dot        | 2026-11-04T16:00:00.000Z | 2026-11-04T16:00:00.000Z |
| around 2:15           | 2026-11-04T14:15:00.000Z | 2026-11-04T14:15:00.000Z |
| about 3pm             | 2026-11-04T15:00:00.000Z | 2026-11-04T15:00:00.000Z |

### Day parts

| text                      | start                    | end                      |
| ------------------------- | ------------------------ | ------------------------ |
| this morning              | 2026-11-04T09:00:00.000Z | 2026-11-04T09:00:00.000Z |
| this afternoon            | 2026-11-04T14:00:00.000Z | 2026-11-04T14:00:00.000Z |
| this evening              | 2026-11-04T18:00:00.000Z | 2026-11-04T18:00:00.000Z |
| at night                  | 2026-11-04T20:00:00.000Z | 2026-11-04T20:00:00.000Z |
| in the morning            | 2026-11-04T09:00:00.000Z | 2026-11-04T09:00:00.000Z |
| tomorrow morning          | 2026-11-05T09:00:00.000Z | 2026-11-05T23:59:59.999Z |
| tomorrow afternoon        | 2026-11-05T14:00:00.000Z | 2026-11-05T23:59:59.999Z |
| tomorrow night            | 2026-11-05T20:00:00.000Z | 2026-11-05T23:59:59.999Z |
| tomorrow late at night    | 2026-11-05T23:00:00.000Z | 2026-11-05T23:59:59.999Z |
| yesterday morning         | 2026-11-03T09:00:00.000Z | 2026-11-03T23:59:59.999Z |
| friday morning            | 2026-11-06T09:00:00.000Z | 2026-11-06T23:59:59.999Z |
| thursday night            | 2026-11-05T20:00:00.000Z | 2026-11-05T23:59:59.999Z |
| saturday evening          | 2026-11-07T18:00:00.000Z | 2026-11-07T23:59:59.999Z |
| saturday noon             | 2026-11-07T12:00:00.000Z | 2026-11-07T23:59:59.999Z |
| next tuesday morning      | 2026-11-10T09:00:00.000Z | 2026-11-10T23:59:59.999Z |
| morning of june 5th       | 2027-06-05T09:00:00.000Z | 2027-06-05T23:59:59.999Z |
| tomorrow pm               | 2026-11-05T17:00:00.000Z | 2026-11-05T23:59:59.999Z |
| tomorrow early in the day | 2026-11-05T08:00:00.000Z | 2026-11-05T23:59:59.999Z |

### Date + time

| text                         | start                    | end                      |
| ---------------------------- | ------------------------ | ------------------------ |
| tomorrow at 3pm              | 2026-11-05T15:00:00.000Z | 2026-11-05T23:59:59.999Z |
| tomorrow at about 3pm        | 2026-11-05T15:00:00.000Z | 2026-11-05T23:59:59.999Z |
| noon tomorrow                | 2026-11-05T12:00:00.000Z | 2026-11-05T23:59:59.999Z |
| noon on friday               | 2026-11-06T12:00:00.000Z | 2026-11-06T23:59:59.999Z |
| 8pm tonight                  | 2026-11-04T20:00:00.000Z | 2026-11-04T20:00:00.000Z |
| tonight at 8                 | 2026-11-04T20:00:00.000Z | 2026-11-04T20:00:00.000Z |
| tonight at 11:59pm           | 2026-11-04T23:59:00.000Z | 2026-11-04T23:59:00.000Z |
| today at 16:00               | 2026-11-04T16:00:00.000Z | 2026-11-04T23:59:59.999Z |
| tomorrow at 12am             | 2026-11-05T00:00:00.000Z | 2026-11-05T23:59:59.999Z |
| tomorrow at 12pm             | 2026-11-05T12:00:00.000Z | 2026-11-05T23:59:59.999Z |
| friday at 10am               | 2026-11-06T10:00:00.000Z | 2026-11-06T23:59:59.999Z |
| monday at 3pm                | 2026-11-09T15:00:00.000Z | 2026-11-09T23:59:59.999Z |
| tuesday 10:30am              | 2026-11-10T10:30:00.000Z | 2026-11-10T23:59:59.999Z |
| yesterday at 2pm             | 2026-11-03T14:00:00.000Z | 2026-11-03T23:59:59.999Z |
| march 2nd at 2pm             | 2027-03-02T14:00:00.000Z | 2027-03-02T23:59:59.999Z |
| march 2nd @ 2:02             | 2027-03-02T14:02:00.000Z | 2027-03-02T23:59:59.999Z |
| 2 oclock march 2nd           | 2027-03-02T14:00:00.000Z | 2027-03-02T23:59:59.999Z |
| 4:32 on march 2nd            | 2027-03-02T16:32:00.000Z | 2027-03-02T23:59:59.999Z |
| June 5 2027 at 11pm          | 2027-06-05T23:00:00.000Z | 2027-06-05T23:59:59.999Z |
| September 10, 2026 at 8:15am | 2026-09-10T08:15:00.000Z | 2026-09-10T23:59:59.999Z |
| 03/13/2027 at 2:00           | 2027-03-13T14:00:00.000Z | 2027-03-13T23:59:59.999Z |
| feb 2 at 4:30pm              | 2027-02-02T16:30:00.000Z | 2027-02-02T23:59:59.999Z |
| next tuesday at 3pm          | 2026-11-10T15:00:00.000Z | 2026-11-10T23:59:59.999Z |
| halloween at 8pm             | 2027-10-31T20:00:00.000Z | 2027-10-31T23:59:59.999Z |
| new years eve 8pm            | 2026-12-31T20:00:00.000Z | 2026-12-31T23:59:59.999Z |
| easter monday 10am           | 2027-03-29T10:00:00.000Z | 2027-03-29T23:59:59.999Z |
| tomorrow before noon         | 2026-11-05T00:00:00.000Z | 2026-11-05T12:00:00.000Z |
| today after 2:00             | 2026-11-04T14:00:00.000Z | 2026-11-04T23:59:59.999Z |
| after 4pm                    | 2026-11-04T16:00:00.001Z | 2026-11-18T16:00:00.001Z |
| before 5pm                   | 2026-11-04T00:00:00.000Z | 2026-11-04T17:00:00.000Z |
| by 5pm                       | 2026-11-04T00:00:00.000Z | 2026-11-04T17:00:00.000Z |
| anytime after 5pm            | 2026-11-04T17:00:00.001Z | 2026-11-18T17:00:00.001Z |

### Time ranges

| text                         | start                    | end                      |
| ---------------------------- | ------------------------ | ------------------------ |
| 9am to 5pm                   | 2026-11-04T09:00:00.000Z | 2026-11-04T17:00:00.000Z |
| 9am-5pm                      | 2026-11-04T09:00:00.000Z | 2026-11-04T17:00:00.000Z |
| 2-4pm                        | 2026-11-04T14:00:00.000Z | 2026-11-04T16:00:00.000Z |
| tomorrow 9-5                 | 2026-11-05T09:00:00.000Z | 2026-11-05T17:00:00.000Z |
| monday 9 to 5                | 2026-11-09T09:00:00.000Z | 2026-11-09T17:00:00.000Z |
| 3-5 on june 1st              | 2027-06-01T15:00:00.000Z | 2027-06-01T17:00:00.000Z |
| 4pm until 6pm                | 2026-11-04T16:00:00.000Z | 2026-11-04T18:00:00.000Z |
| 10pm to 2am                  | 2026-11-04T22:00:00.000Z | 2026-11-05T02:00:00.000Z |
| 11pm to 2am january 5th      | 2027-01-05T23:00:00.000Z | 2027-01-06T02:00:00.000Z |
| between 2pm and 4pm          | 2026-11-04T14:00:00.000Z | 2026-11-04T16:00:00.000Z |
| between 2 and 4 tomorrow     | 2026-11-05T14:00:00.000Z | 2026-11-05T16:00:00.000Z |
| between 10 and 2 tuesday     | 2026-11-10T10:00:00.000Z | 2026-11-10T14:00:00.000Z |
| tomorrow from 09:30 to 17:45 | 2026-11-05T09:30:00.000Z | 2026-11-05T17:45:00.000Z |
| tonight from 11pm to 1am     | 2026-11-04T23:00:00.000Z | 2026-11-05T01:00:00.000Z |
| from 9am to 5pm monday       | 2026-11-09T09:00:00.000Z | 2026-11-09T17:00:00.000Z |
| friday 10am to 12pm          | 2026-11-06T10:00:00.000Z | 2026-11-06T12:00:00.000Z |
| wednesday from 2 to 4pm      | 2026-11-04T14:00:00.000Z | 2026-11-04T16:00:00.000Z |
| wed between 2 - 5pm          | 2026-11-04T14:00:00.000Z | 2026-11-04T17:00:00.000Z |
| june 4 at 2pm - 9pm          | 2027-06-04T14:00:00.000Z | 2027-06-04T21:00:00.000Z |
| april 1 from 2pm to 4pm      | 2027-04-01T14:00:00.000Z | 2027-04-01T16:00:00.000Z |
| 2:15pm to 4:45pm             | 2026-11-04T14:15:00.000Z | 2026-11-04T16:45:00.000Z |
| tues at 3pm to 5pm           | 2026-11-10T15:00:00.000Z | 2026-11-10T17:00:00.000Z |
| 3pm or 5pm                   | 2026-11-04T15:00:00.000Z | 2026-11-04T15:00:00.000Z |
| 3pm or 5pm                   | 2026-11-04T17:00:00.000Z | 2026-11-04T17:00:00.000Z |

### Timezones

| text                       | start                         | end                           |
| -------------------------- | ----------------------------- | ----------------------------- |
| 4pm eastern time           | 2026-11-04T16:00:00.000-05:00 | 2026-11-04T16:00:00.000-05:00 |
| 4pm est                    | 2026-11-04T16:00:00.000-05:00 | 2026-11-04T16:00:00.000-05:00 |
| 3pm pst                    | 2026-11-04T15:00:00.000-08:00 | 2026-11-04T15:00:00.000-08:00 |
| 5pm gmt                    | 2026-11-04T17:00:00.000Z      | 2026-11-04T17:00:00.000Z      |
| noon pacific time          | 2026-11-04T12:00:00.000-08:00 | 2026-11-04T12:00:00.000-08:00 |
| today in central time      | 2026-11-04T00:00:00.000-06:00 | 2026-11-04T23:59:59.999-06:00 |
| 4pm JST                    | 2026-11-04T16:00:00.000+09:00 | 2026-11-04T16:00:00.000+09:00 |
| 4pm SGT                    | 2026-11-04T16:00:00.000+08:00 | 2026-11-04T16:00:00.000+08:00 |
| 4pm GMT+9                  | 2026-11-04T16:00:00.000+09:00 | 2026-11-04T16:00:00.000+09:00 |
| 3pm utc-5                  | 2026-11-04T15:00:00.000-05:00 | 2026-11-04T15:00:00.000-05:00 |
| today UTC+5                | 2026-11-04T00:00:00.000+05:00 | 2026-11-04T23:59:59.999+05:00 |
| today in CET               | 2026-11-04T00:00:00.000+01:00 | 2026-11-04T23:59:59.999+01:00 |
| today in AEST              | 2026-11-04T00:00:00.000+10:00 | 2026-11-04T23:59:59.999+10:00 |
| today in peru time         | 2026-11-04T00:00:00.000-05:00 | 2026-11-04T23:59:59.999-05:00 |
| today in newfoundland time | 2026-11-04T00:00:00.000-03:30 | 2026-11-04T23:59:59.999-03:30 |
| march 2nd at 2pm UTC+5     | 2027-03-02T14:00:00.000+05:00 | 2027-03-02T23:59:59.999+05:00 |
| tomorrow at noon est       | 2026-11-05T12:00:00.000-05:00 | 2026-11-05T23:59:59.999-05:00 |
| july 5 2027 12 oclock PST  | 2027-07-05T12:00:00.000-07:00 | 2027-07-05T23:59:59.999-07:00 |
| 2pm pacific standard time  | 2026-11-04T14:00:00.000-08:00 | 2026-11-04T14:00:00.000-08:00 |
| now pst                    | 2026-11-04T10:00:00.000-08:00 | 2026-11-04T10:00:00.000-08:00 |
| today in Canada/Eastern    | 2026-11-04T00:00:00.000-05:00 | 2026-11-04T23:59:59.999-05:00 |
| march 15th in eastern time | 2027-03-15T00:00:00.000-04:00 | 2027-03-15T23:59:59.999-04:00 |

### Date ranges

| text                                     | start                    | end                      |
| ---------------------------------------- | ------------------------ | ------------------------ |
| between june and july 2027               | 2027-06-01T00:00:00.000Z | 2027-07-01T00:00:00.000Z |
| between june 5th and august 19th 2027    | 2027-06-05T00:00:00.000Z | 2027-08-18T23:59:59.999Z |
| between tuesday and thursday             | 2026-11-10T00:00:00.000Z | 2026-11-11T23:59:59.999Z |
| between friday and sunday                | 2026-11-06T00:00:00.000Z | 2026-11-07T23:59:59.999Z |
| between jan 5 and jan 10                 | 2027-01-05T00:00:00.000Z | 2027-01-09T23:59:59.999Z |
| between Sept and Oct 2027                | 2027-09-01T00:00:00.000Z | 2027-10-01T00:00:00.000Z |
| june to july                             | 2027-06-01T00:00:00.000Z | 2027-07-31T23:59:59.999Z |
| today to next friday                     | 2026-11-04T00:00:00.000Z | 2026-11-13T23:59:59.999Z |
| from monday to friday                    | 2026-11-09T00:00:00.000Z | 2026-11-13T23:59:59.999Z |
| monday through friday                    | 2026-11-09T00:00:00.000Z | 2026-11-13T23:59:59.999Z |
| monday to wednesday next week            | 2026-11-09T00:00:00.000Z | 2026-11-11T23:59:59.999Z |
| this Friday through Sunday               | 2026-11-06T00:00:00.000Z | 2026-11-08T23:59:59.999Z |
| today through tomorrow                   | 2026-11-04T00:00:00.000Z | 2026-11-05T23:59:59.999Z |
| yesterday through tomorrow               | 2026-11-03T00:00:00.000Z | 2026-11-05T23:59:59.999Z |
| aug 1 - aug 31                           | 2027-08-01T00:00:00.000Z | 2027-08-31T23:59:59.999Z |
| aug 1-3                                  | 2027-08-01T00:00:00.000Z | 2027-08-03T23:59:59.999Z |
| august 10th to 15th                      | 2027-08-10T00:00:00.000Z | 2027-08-15T23:59:59.999Z |
| August 10-22, 2027                       | 2027-08-10T00:00:00.000Z | 2027-08-22T23:59:59.999Z |
| September 10–12, 2026                    | 2026-09-10T00:00:00.000Z | 2026-09-12T23:59:59.999Z |
| September 10 — September 12, 2026        | 2026-09-10T00:00:00.000Z | 2026-09-12T23:59:59.999Z |
| 22-23 February                           | 2027-02-22T00:00:00.000Z | 2027-02-23T23:59:59.999Z |
| June 1st to June 11th 2027               | 2027-06-01T00:00:00.000Z | 2027-06-11T23:59:59.999Z |
| june 5-7 1999                            | 1999-06-05T00:00:00.000Z | 1999-06-07T23:59:59.999Z |
| June 1st-11th 1999                       | 1999-06-01T00:00:00.000Z | 1999-06-11T23:59:59.999Z |
| 15th - 20th of august                    | 2027-08-15T00:00:00.000Z | 2027-08-20T23:59:59.999Z |
| 28th of September to 5th of October 2027 | 2027-09-28T00:00:00.000Z | 2027-10-05T23:59:59.999Z |
| 12th of July to 3rd of August 1995       | 1995-07-12T00:00:00.000Z | 1995-08-03T23:59:59.999Z |
| 5 to 7 of january 1998                   | 1998-01-05T00:00:00.000Z | 1998-01-07T23:59:59.999Z |
| December 30 to January 2                 | 2026-12-30T00:00:00.000Z | 2027-01-02T23:59:59.999Z |
| December 30, 2026 to January 2, 2027     | 2026-12-30T00:00:00.000Z | 2027-01-02T23:59:59.999Z |
| feb to apr 2027                          | 2027-02-01T00:00:00.000Z | 2027-04-30T23:59:59.999Z |
| january to march 2027                    | 2027-01-01T00:00:00.000Z | 2027-03-31T23:59:59.999Z |
| march 2027 to may 2027                   | 2027-03-01T00:00:00.000Z | 2027-05-31T23:59:59.999Z |
| September through November 2027          | 2027-09-01T00:00:00.000Z | 2027-11-30T23:59:59.999Z |
| December 2026 through February 2027      | 2026-12-01T00:00:00.000Z | 2027-02-28T23:59:59.999Z |
| 2010 - 2020                              | 2010-01-01T00:00:00.000Z | 2020-12-31T23:59:59.999Z |
| twenty ten - twenty twenty               | 2010-01-01T00:00:00.000Z | 2020-12-31T23:59:59.999Z |
| 2026-09-10 to 2026-09-12                 | 2026-09-10T00:00:00.000Z | 2026-09-12T23:59:59.999Z |
| 8/10/2027 - 8/15/2027                    | 2027-08-10T00:00:00.000Z | 2027-08-15T23:59:59.999Z |
| 09/10/2026 through 09/12/2026            | 2026-09-10T00:00:00.000Z | 2026-09-12T23:59:59.999Z |
| jan 1 to dec 31                          | 2027-01-01T00:00:00.000Z | 2027-12-31T23:59:59.999Z |
| april 1st-30th                           | 2027-04-01T00:00:00.000Z | 2027-04-30T23:59:59.999Z |
| during june                              | 2027-06-01T00:00:00.000Z | 2027-06-30T23:59:59.999Z |
| from Christmas Eve to Boxing Day 2026    | 2026-12-24T00:00:00.000Z | 2026-12-26T23:59:59.999Z |

### Open-ended ranges

| text                 | start                    | end                      |
| -------------------- | ------------------------ | ------------------------ |
| before 2027          | 2026-11-04T10:00:00.000Z | 2026-12-31T23:59:59.999Z |
| before march 1       | 2026-11-04T10:00:00.000Z | 2027-02-28T23:59:59.999Z |
| before tomorrow      | 2026-11-04T10:00:00.000Z | 2026-11-04T23:59:59.999Z |
| before next week     | 2026-11-04T10:00:00.000Z | 2026-11-08T23:59:59.999Z |
| before christmas     | 2026-11-04T10:00:00.000Z | 2026-12-24T23:59:59.999Z |
| by march             | 2026-11-04T10:00:00.000Z | 2027-02-28T23:59:59.999Z |
| by friday            | 2026-11-04T10:00:00.000Z | 2026-11-05T23:59:59.999Z |
| by next friday       | 2026-11-04T10:00:00.000Z | 2026-11-12T23:59:59.999Z |
| by tomorrow          | 2026-11-04T10:00:00.000Z | 2026-11-04T23:59:59.999Z |
| by valentines day    | 2026-11-04T10:00:00.000Z | 2027-02-13T23:59:59.999Z |
| by 1999-12-25        | 1999-12-11T00:00:00.000Z | 1999-12-24T23:59:59.999Z |
| until friday         | 2026-11-04T00:00:00.000Z | 2026-11-06T00:00:00.000Z |
| until february 20    | 2026-11-04T00:00:00.000Z | 2027-02-20T00:00:00.000Z |
| until next christmas | 2026-11-04T00:00:00.000Z | 2027-12-25T00:00:00.000Z |
| after february       | 2027-03-01T00:00:00.000Z | 2027-03-15T00:00:00.000Z |
| after tomorrow       | 2026-11-06T00:00:00.000Z | 2026-11-20T00:00:00.000Z |
| after june 2nd       | 2027-06-03T00:00:00.000Z | 2027-06-17T00:00:00.000Z |

### Lists of dates

| text                      | start                    | end                      |
| ------------------------- | ------------------------ | ------------------------ |
| jan 5 or 8                | 2027-01-05T00:00:00.000Z | 2027-01-05T23:59:59.999Z |
| jan 5 or 8                | 2027-01-08T00:00:00.000Z | 2027-01-08T23:59:59.999Z |
| jan 5 and 8               | 2027-01-05T00:00:00.000Z | 2027-01-05T23:59:59.999Z |
| jan 5 and 8               | 2027-01-08T00:00:00.000Z | 2027-01-08T23:59:59.999Z |
| june 3rd and 4th          | 2027-06-03T00:00:00.000Z | 2027-06-03T23:59:59.999Z |
| june 3rd and 4th          | 2027-06-04T00:00:00.000Z | 2027-06-04T23:59:59.999Z |
| february 5th, 6th and 7th | 2027-02-05T00:00:00.000Z | 2027-02-05T23:59:59.999Z |
| february 5th, 6th and 7th | 2027-02-06T00:00:00.000Z | 2027-02-06T23:59:59.999Z |
| february 5th, 6th and 7th | 2027-02-07T00:00:00.000Z | 2027-02-07T23:59:59.999Z |
| 1, 2 and 3 of march       | 2027-03-01T00:00:00.000Z | 2027-03-01T23:59:59.999Z |
| 1, 2 and 3 of march       | 2027-03-02T00:00:00.000Z | 2027-03-02T23:59:59.999Z |
| 1, 2 and 3 of march       | 2027-03-03T00:00:00.000Z | 2027-03-03T23:59:59.999Z |
| 3, 4, or 5 of Feb 1998    | 1998-02-03T00:00:00.000Z | 1998-02-03T23:59:59.999Z |
| 3, 4, or 5 of Feb 1998    | 1998-02-04T00:00:00.000Z | 1998-02-04T23:59:59.999Z |
| 3, 4, or 5 of Feb 1998    | 1998-02-05T00:00:00.000Z | 1998-02-05T23:59:59.999Z |
| april 1 or may 2          | 2027-04-01T00:00:00.000Z | 2027-04-01T23:59:59.999Z |
| april 1 or may 2          | 2027-05-02T00:00:00.000Z | 2027-05-02T23:59:59.999Z |
| dec 25 or jan 1           | 2026-12-25T00:00:00.000Z | 2026-12-25T23:59:59.999Z |
| dec 25 or jan 1           | 2027-01-01T00:00:00.000Z | 2027-01-01T23:59:59.999Z |
| march and april           | 2027-03-01T00:00:00.000Z | 2027-03-31T23:59:59.999Z |
| march and april           | 2027-04-01T00:00:00.000Z | 2027-04-30T23:59:59.999Z |
| jan or feb                | 2027-01-01T00:00:00.000Z | 2027-01-31T23:59:59.999Z |
| jan or feb                | 2027-02-01T00:00:00.000Z | 2027-02-28T23:59:59.999Z |
| january or february 2027  | 2027-01-01T00:00:00.000Z | 2027-01-31T23:59:59.999Z |
| january or february 2027  | 2027-02-01T00:00:00.000Z | 2027-02-28T23:59:59.999Z |
| march, may, or june       | 2027-03-01T00:00:00.000Z | 2027-03-31T23:59:59.999Z |
| march, may, or june       | 2027-05-01T00:00:00.000Z | 2027-05-31T23:59:59.999Z |
| march, may, or june       | 2027-06-01T00:00:00.000Z | 2027-06-30T23:59:59.999Z |
| during june or july 2027  | 2027-06-01T00:00:00.000Z | 2027-06-30T23:59:59.999Z |
| during june or july 2027  | 2027-07-01T00:00:00.000Z | 2027-07-31T23:59:59.999Z |
| mon, tuesday, wednesday   | 2026-11-09T00:00:00.000Z | 2026-11-09T23:59:59.999Z |
| mon, tuesday, wednesday   | 2026-11-10T00:00:00.000Z | 2026-11-10T23:59:59.999Z |
| mon, tuesday, wednesday   | 2026-11-04T00:00:00.000Z | 2026-11-04T23:59:59.999Z |
| sunday or monday          | 2026-11-08T00:00:00.000Z | 2026-11-08T23:59:59.999Z |
| sunday or monday          | 2026-11-09T00:00:00.000Z | 2026-11-09T23:59:59.999Z |
| next friday, this monday  | 2026-11-13T00:00:00.000Z | 2026-11-13T23:59:59.999Z |
| next friday, this monday  | 2026-11-09T00:00:00.000Z | 2026-11-09T23:59:59.999Z |
| feb 5 or next weekend     | 2027-02-05T00:00:00.000Z | 2027-02-05T23:59:59.999Z |
| feb 5 or next weekend     | 2026-11-14T00:00:00.000Z | 2026-11-15T23:59:59.999Z |
| only in 2018 and 2020     | 2018-01-01T00:00:00.000Z | 2018-12-31T23:59:59.999Z |
| only in 2018 and 2020     | 2020-01-01T00:00:00.000Z | 2020-12-31T23:59:59.999Z |

### Repeating dates

| text                         | start                    | end                      | repeat                                                                                                                                      |
| ---------------------------- | ------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| every tuesday                | `null`                   | `null`                   | `{"interval":{"day":1},"filter":{"weekDays":{"tuesday":true}},"choose":"AND"}`                                                              |
| any wednesday                | `null`                   | `null`                   | `{"interval":{"day":1},"filter":{"weekDays":{"wednesday":true}},"choose":"OR"}`                                                             |
| mondays at 5pm               | `null`                   | `null`                   | `{"interval":{"day":1},"filter":{"weekDays":{"monday":true}},"choose":"OR","time":"5:00pm"}`                                                |
| every tuesday at 3pm         | 2026-11-04T15:00:00.000Z | 2026-11-04T15:00:00.000Z | `{"interval":{"day":1},"filter":{"weekDays":{"tuesday":true}},"choose":"AND"}`                                                              |
| tuesdays and thursdays       | `null`                   | `null`                   | `{"interval":{"day":1},"filter":{"weekDays":{"tuesday":true}},"choose":"OR"}`                                                               |
| tuesdays and thursdays       | `null`                   | `null`                   | `{"interval":{"day":1},"filter":{"weekDays":{"thursday":true}},"choose":"OR"}`                                                              |
| every day                    | `null`                   | `null`                   | `{"interval":{"day":1},"choose":"AND"}`                                                                                                     |
| every other day              | `null`                   | `null`                   | `{"interval":{"day":2},"choose":"AND"}`                                                                                                     |
| every weekday                | `null`                   | `null`                   | `{"interval":{"day":1},"filter":{"weekDays":{"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true}},"choose":"AND"}` |
| every weekend                | `null`                   | `null`                   | `{"interval":{"weekend":1},"choose":"AND"}`                                                                                                 |
| every other week             | `null`                   | `null`                   | `{"interval":{"week":2},"choose":"AND"}`                                                                                                    |
| every 2 weeks                | `null`                   | `null`                   | `{"interval":{"week":2},"choose":"AND"}`                                                                                                    |
| any day in June              | 2027-06-01T00:00:00.000Z | 2027-06-30T23:59:59.999Z | `{"interval":{"day":1},"choose":"OR"}`                                                                                                      |
| any wednesday this week      | 2026-11-02T00:00:00.000Z | 2026-11-08T23:59:59.999Z | `{"interval":{"day":1},"filter":{"weekDays":{"wednesday":true}},"choose":"OR"}`                                                             |
| weekends in July             | 2027-07-01T00:00:00.000Z | 2027-07-31T23:59:59.999Z | `{"interval":{"day":1},"filter":{"weekDays":{"saturday":true,"sunday":true}},"choose":"AND"}`                                               |
| every weekday until February | 2026-11-04T00:00:00.000Z | 2027-02-01T00:00:00.000Z | `{"interval":{"day":1},"filter":{"weekDays":{"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true}},"choose":"AND"}` |

### Durations

| text                  | `.durations().get(0)`   |
| --------------------- | ----------------------- |
| 2 weeks               | `{"week":2}`            |
| 30 minutes            | `{"minute":30}`         |
| 30mins                | `{"minute":30}`         |
| 20min                 | `{"minute":20}`         |
| 10hrs                 | `{"hour":10}`           |
| 1sec                  | `{"second":1}`          |
| two hours and 8 mins  | `{"hour":2,"minute":8}` |
| 12 years and 2 months | `{"year":12,"month":2}` |
| for 3 hours           | `{"hour":3}`            |
| 3 weekends            | `{"weekend":3}`         |
| 2 decades             | `{"decade":2}`          |

### Times

| text             | `.times().get(0)`                                       |
| ---------------- | ------------------------------------------------------- |
| 4:30pm           | `{"time":"4:30pm","24h":"16:30","hour":16,"minute":30}` |
| 4pm              | `{"time":"4:00pm","24h":"16:00","hour":16,"minute":0}`  |
| 16:30            | `{"time":"4:30pm","24h":"16:30","hour":16,"minute":30}` |
| half past five   | `{"time":"5:30pm","24h":"17:30","hour":17,"minute":30}` |
| quarter to five  | `{"time":"4:45pm","24h":"16:45","hour":16,"minute":45}` |
| six thirty pm    | `{"time":"6:30pm","24h":"18:30","hour":18,"minute":30}` |
| ten after 9      | `{"time":"9:10am","24h":"9:10","hour":9,"minute":10}`   |
| 7 in the evening | `{"time":"7:00pm","24h":"19:00","hour":19,"minute":0}`  |
| noon             | `{"time":"12:00pm","24h":"12:00","hour":12,"minute":0}` |
| midnight         | `{"time":"12:00am","24h":"0:00","hour":0,"minute":0}`   |
| 2 oclock pm      | `{"time":"2:00pm","24h":"14:00","hour":14,"minute":0}`  |

---

## Not supported

These forms are either not recognized, or return something you would not want. Pull-requests welcome.

- `not this saturday, but the saturday after` - self-referencing logic
- `3 years ago tomorrow` - folksy compound shorthand
- `2100`, `0900` - military time
- `daily`, `weekly`, `monthly`, `biweekly` - bare frequency adverbs. Supports `every day`, `every week`
- historical DST rules - `Oct 22 1975 2am in PST` uses today's DST schedule
- nested or arbitrary precision - `sometime`, `someday`, `the ides of march`
