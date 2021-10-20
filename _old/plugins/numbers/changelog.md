### v1.4.0 [June 2021]

- **[fix]** - runtime error in number parser
- **[change]** - add export maps
- **[change]** - remove sourcemap for js build
- update deps

### v1.3.0 [Feb 2021]

- **[change]** - use babel default build target (drop ie11 polyfill)
- **[change]** - dont compile esm build w/ babel anymore
- update deps

### v1.2.0 [Feb 2021]

- **[change]** - big improvements to `.fractions()` and decimal-parsing in the number-parser (thanks Jake!)
- **[change]** - `.money()` parsing improvements -'35 cents' -> 0.35
- **[new]** - add `.money().get()` method

### v1.1.0 [Dec 2020]

- **[new]** - add `.money()` class methods:
  - `.money().currency()`
  - `.money().json()`
- **[new]** - add `.get()` method for faster number lookup
- **[change]** - improved `.percentages()` and `.fractions()` parsing
