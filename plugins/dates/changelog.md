<!-- #### [Unreleased]
- **[breaking]** - return array in .json().dates
-->

### 3.9.0 [July 2026]
- **[new]** - repeating dates return a `repeat` object - `'every tuesday'`, `'mondays at 5pm'`, `'weekends in july'`
- **[new]** - `unit` field in `.dates().get()` 
- **[new]** - nth-weekday support - `'the second monday of february'`, `'last friday in june'`
- **[new]** - support two-digit years - `"june of '98"`, `"summer of '69"`, `'may 97'`
- **[new]** - `'quarter to five'`, `'at ten to 4'`-style times
- **[new]** - multi-part shifts - `'2 years, 4 months, and 5 days ago'`, `'a week and a half before'`
- **[new]** - `'the saturday after next'`, `'week after next'`, `'weekend after next'`
- **[new]** - `'due eod'` - end-of-day support
- **[fix]** - holidays with an explicit year - `'easter 2026'` 
- **[fix]** - asking for `'christmas'` on christmas-day no longer returns next year's
- **[fix]** - overnight ranges cross midnight - `'10pm to 2am'`, 
- **[fix]** - explicit `'2am'` is not rewritten to pm
- **[fix]** - `'between friday and sunday'` no longer returns a reversed range
- **[fix]** - `'between june 2nd and 5th'` no longer loses its end-date
- **[fix]** - `'end of the month'`, `'in a couple of weeks'` no longer return the current date
- **[fix]** - `'half an hour'` is 30 minutes, not one hour;
- **[fix]** - `'a few'` is 3, not 2;
- **[fix]** - `'hence'` means the future;
- **[fix]** - `'day after next'` is not tomorrow;
- **[fix]** - `'the 5th of next month'` wraps the year in december
- **[fix]** - `'2nd weekend of june'` is the 2nd weekend, not the 3rd;
- **[fix]** - `'the soldiers march tomorrow'` no longer returns a date in march
- **[fix]** - bare years up to 2059 are recognized
- **[fix]** - `GMT+9` means utc+9
- **[fix]** - `jst`/`sgt`/`nzst`/`akst` etc now resolve to spelled-out timezones
- **[fix]** - `'now pst'` keeps the time-of-day, instead of resetting to midnight
- **[fix]** - `.times().get()` returns an array
- **[fix]** - typescript types
- **[change]** - holiday-name spellings 

### 3.8.0 [May 2026]
- **[fix]** - 'one thirty am' is not '130 am'
- **[fix]** - 'in 2-4 years from now'
- **[fix]** - '28th of September to 5th of October 2008'
- **[change]** - more tests
- **[update]** - dependencies

### 3.7.1 [Jan 2025]
* * fix `#Month (next|last|this) year` #1162
- **[update]** - dependencies

### 3.7.0 [July 2024]
- **[new]** - date features:
* * `'until christmas'`
* * `'in-the-morning'`
* * `'sept to oct 2008'`
* * improved `'2-4 weeks'` logic
* * fix `'2 days before'` tagging

### 3.6.0 [July 2024]
- **[new]** - support `{dmy:true}` option #1131 (thanks Howard!)
- **[update]** - dependencies

### 3.5.0 [Feb 2024]

- **[new]** - `dates().isBefore()`, `dates().isBefore()` methods
- **[new]** - `.dates().isSame()` method
- **[new]** - `.debug('dates')` function
- **[fix]** - tokenizer fixes

### 2.2.0 [April 2021]

- **[new]** - start parsing or/and date combos

### 2.1.0 [April 2021]

- **[change]** - null timezone is now the same as undefined timezone
- **[change]** - drop ie11 support
- **[change]** - dont babel esm build anymore

### 2.0.2 [April 2021]

- **[change]** - better time-range support
- **[change]** - date-shifts set smarter date-units

### 2.0.1 [March 2021]

- **[change]** - better am/pm choices in ambiguous time-ranges

### 2.0.0 [March 2021]

- **[breaking]** - flatten json date results
- **[breaking]** - remove duration from .get results
- **[breaking]** - make repeating dates objects w/ start/end dates
- **[new]** - return date unit information
- **[new]** - custom time for repeating dates
- **[change]** - include assumed iana timezone in results

### 1.5.5 [March 2021]

- **[change]** - use more-intuitive choices for ampm
- **[change]** - support more time-range formats
- **[change]** - reverse upsidedown date-ranges

### 1.5.3 [March 2021]

- **[change]** - move Timezone tag to main lib
- **[change]** - support timezone-abbrevations

### 1.5.0 [March 2021]

- **[change]** - return dates in computer's timezone, unless set

### 1.4.3 [March 2021]

- **[change]** - consecutive date tokenization changes
- **[change]** - fixes to 'this/next/last x' logic

### 1.4.1 [Jan 2021]

- **[change]** - date tokenization of multiple AND and OR dates
- **[change]** - smart tokenization of duration and date
- **[change]** - 'in 2 minutes' vs 'for 2 minutes'

### 1.4.0 [Jan 2021]

- **[new]** - `.durations()` method
- **[new]** - `.times()` method
- **[new]** - begin support for repeating, interval-based dates 'any wednesday in june'

### 1.3.0 [Dec 2020]

- first not-crappy release.
- 1,552 tests now passing.
