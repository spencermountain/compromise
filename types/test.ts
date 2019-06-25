// tslint:disable:no-relative-import-in-test

// importing via absolute path appears to be broken because this package
// indirectly imports itself (compromise -> compromise-plugin -> compromise),
// which brings in an older, broken version of its typings that typescript
// always seems to prefer over the typings in the repo proper.
import * as compromise from '.';

// $ExpectType Text
const r = compromise('he is fun', {});

r.verbs().out();
r.debug();

// $ExpectType void
compromise.addConjugations({ eat: { Actor: "eater" } });
