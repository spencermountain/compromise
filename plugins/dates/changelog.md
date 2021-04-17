<!-- #### [Unreleased]
- **[breaking]** - return array in .json().dates
-->

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
