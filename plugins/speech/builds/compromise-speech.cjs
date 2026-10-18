(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseSpeech = factory());
})(this, (function () { 'use strict';

  var version = '0.2.0';

  const api = function (View) {
    /** */
    View.prototype.syllables = function (options = {}) {
      this.compute('syllables', options);
      const all = [];
      this.docs.forEach(terms => {
        let some = [];
        terms.forEach(term => {
          some = some.concat(term.syllables);
        });
        if (some.length > 0) {
          all.push(some);
        }
      });
      return all
    };
    /** */
    View.prototype.soundsLike = function () {
      this.compute('soundsLike');
      const all = [];
      this.docs.forEach(terms => {
        let some = [];
        terms.forEach(term => {
          some = some.concat(term.soundsLike);
        });
        if (some.length > 0) {
          all.push(some);
        }
      });
      return all
    };
  };

  // Whole-word splits that override the vowel-span and boundary rules.
  // Keys are lowercase; values are interior cut offsets, excluding the word's end.
  const exceptions = {
    acre: [1], // a-cre: the final re carries a syllable
    // Borrowed words whose final e is pronounced.
    cafe: [2], // ca-fe
    abalone: [2, 3, 5], // ab-a-lo-ne
    aborigine: [2, 3, 6, 7], // ab-o-rig-i-ne
    comanche: [2, 5], // co-man-che
    dolce: [3], // dol-ce
    // Borrowed vowel combinations do not follow the usual English pair rules.
    acacia: [1, 3], // a-ca-cia
    fuchsia: [4], // fuch-sia
    concierge: [3, 5], // con-ci-erge
    concierges: [3, 5], // con-ci-erges
    comedienne: [2, 4, 6], // co-me-di-enne
    // The final re in massacre carries a syllable, including its inflected forms.
    massacre: [3, 5], // mas-sa-cre
    massacred: [3, 5], // mas-sa-cred
    massacring: [3, 5], // mas-sa-cring
    // Silent consonants make these look like syllabic -le endings.
    aisle: [],
    isle: [],
    wednesday: [6], // wednes-day
    // Keep the spoken vowel groups together or apart explicitly.
    buoyant: [4], // buoy-ant
    buoyancy: [4, 6], // buoy-an-cy
    acquiesce: [2, 5], // ac-qui-esce
    acquiesced: [2, 5], // ac-qui-esced
    acquiescent: [2, 5, 7], // ac-qui-es-cent
    acquiescence: [2, 5, 7], // ac-qui-es-cence
    people: [3], //'peo ple',
    queue: [], //'queue',
    business: [4], //'busi ness',
    quiet: [3], //'qui et',
    science: [3], //'sci ence',
    poet: [2], //'po et',
    poetry: [2, 4], //'po et ry',
    every: [3], //'eve ry',
    everything: [3, 5], // 'eve ry thing',
    everybody: [3, 5, 7], //'eve ry bo dy',
    ilyich: [2], // 'il yich': consonantal y in this name
    juan: [], // 'juan':
    wyatt: [2], // 'wy att'
    // Place names retain their recognizable compound boundaries.
    batesville: [5], // bates-ville
    belleville: [5], // belle-ville
    bridgeport: [6], // bridge-port
    cambridgeport: [3, 9], // cam-bridge-port
    cambridgeside: [3, 9], // cam-bridge-side
    janesville: [5], // janes-ville
    roseberry: [4, 7], // rose-ber-ry
    roseville: [4], // rose-ville
    // These names retain vowels that the general spelling rules suppress or blend.
    belge: [3], // bel-ge
    canadienne: [2, 4, 6], // ca-na-di-enne
    mildred: [3], // mil-dred
    nietzsche: [5], // nietz-sche
    odea: [1, 3], // o-de-a
    // The two written o's belong to separate syllables in these words.
    zoologist: [2, 4, 5], // zo-ol-o-gist
    zoology: [2, 4, 5], // zo-ol-o-gy
  };

  const checkExceptions = str => {
    if (Object.hasOwn(exceptions, str)) {
      return exceptions[str]
    }
    // Reuse singular cuts for a plain -s ending; exact entries above take priority.
    const singular = str.replace(/s$/, '');
    if (Object.hasOwn(exceptions, singular)) {
      // A sibilant before silent e adds a syllable: sci-ence becomes sci-en-ces.
      if (/[csxz]e$/.test(singular)) {
        return exceptions[singular].concat(singular.length - 2)
      }
      return exceptions[singular]
    }
    return null
  };

  // Match a compound's left component, including its silent e.
  // Both vowel counting and boundary placement use these same spelling rules.
  const compoundPrefixes = [
    /^note(?=book)/, // note-book: silent e and a boundary after the complete base
    /^side(?=kick|line|show|step|stream|track|walk|water|way|winder|wise)/,
    /^some(?=bod|one|time|where)/,
    /^none(?=such)/, // none-such retains the silent e of none
    /^goose(?=berr)/, // goose-berry and goose-berries
    /^above(?=board|ground)/,
    /^a?fore(?=clos|taste|said|mentioned)/,
    /^ware(?=house|housing)/,
    /^space(?=port|ship)/,
    /^race(?=horse)/,
    /^lake(?=side)/,
    /^white(?=side)/,
    /^state(?=side)/,
    /^juke(?=box)/,
    /^police(?=woman|women|man|men)/,
    /^(?:sale|spoke)s?(?=woman|women|man|men)/,
  ];

  // Roots ending in ed keep their vowel; these are not regular past-tense suffixes.
  const voicedEd = /(?:[^aeiouyl]led|^(?:hundred|kindred|sacred|wicked|rugged|ragged|wretched|naked|crooked|(?:a|em|death|river|water|flower|hot|sick|sun|sea)bed|(?:in|inter|thorough|cross|pure)bred|infrared|newlywed|premed))(?:['’](?:s|d|ll|re|ve))?$/;

  // Find vowel spans in lowercase spelling; return character offsets, not syllables.
  // Candidate vowel letters; ignored rules handle consonantal uses of u and y.
  const isVowel = /[aeiouy]/;

  // Ignore the character at match.index + offset. Rules may veto a whole word.
  // Global patterns visit every occurrence; except prevents that rule from applying.
  const ignored = [
    { match: /[^aeiou]e(?=['’](?:s|d|ll|re|ve)$|$)/g, offset: 1, except: /[^aeiouyl]le(?:['’](?:s|d|ll|re|ve))?$/ }, // silent e
    { match: /[^td]ed(?=['’](?:s|d|ll|re|ve)$|$)/g, offset: 1, except: voicedEd }, // walked vs hundred/bubbled
    { match: /es(?=['’](?:s|d|ll|re|ve)$|$)/g, offset: 0, except: /([sxzcg]|ch|sh|[^aeiouyl]l)es(?:['’](?:s|d|ll|re|ve))?$/ }, // cakes vs boxes/tables
    {
      match: /e(?=ments?$|thing$|s?man$)/g,
      offset: 0,
      except: /(?:[^aeiouyl]le(?:ments?|thing|s?man)|elements?)$/,
    }, // movement(s), but settlement(s) and element(s)
    // Silent e stays silent before consonant suffixes, but syllabic -le survives.
    {
      match: /[^aeiou]e(?=ness(?:es)?$|l(?:y|iness)$|ful(?:ly)?$|less$|ships?$|some$)/g,
      offset: 1,
      except: /[^aeiouyl]le(?:ness(?:es)?|l(?:y|iness)|ful(?:ly)?|less|ships?|some)$/,
    },
    { match: /['’][rv]e$/g, offset: 2 }, // we're, they've: suffix e adds no syllable
    { match: /qu(?=[aeiouy])/g, offset: 1 }, // consonantal u
    { match: /que(?=s?$|ly$|ness$)/g, offset: 2 }, // opaque, opaques, opaquely
    { match: /^y(?=[aeiou])/g, offset: 0 }, // yard, yellow
    { match: /[aeiouwy]y(?=[aeiou])/g, offset: 1 }, // beyond, lawyer, doubled y
    { match: /[aeiou]ny(?=[aeiou])/g, offset: 2, except: /^any/ }, // canyon, but anyone
    { match: /gu(?=a)/g, offset: 1 }, // guard, language
    { match: /busi(?=ness)/g, offset: 3 }, // businesses, agribusiness: the i stays silent
    { match: /ever(?=y(?:body|thing|where|one|day|time|$))/g, offset: 2 }, // everywhere, everyone
  ];

  // Mc contributes a spoken syllable despite having no written vowel.
  const syllabicPrefix = /^mc(?=[a-z])/;

  // These consonants carry a syllable despite having no written vowel.
  // The captured consonant starts the span; surrounding letters provide context.
  const syllabicConsonants = [
    /(?:[sxz]e?|[cs]h|[cg]e)['’](s)$/, // horse's, church's
    /[ai]s(m)(?:s|['’]s)?$/, // chasm, criticism, and plurals/possessives
    /[iy]th(m)(?:s|['’]s)?$/, // algorithm, rhythms
    /[^aeiouyn](n)['’]t$/, // couldn't, wasn't; not can't or hasn't
    /^(?:could|should|would|might|must)['’](v)e$/, // modal + have: would-'ve, unlike we've
  ];

  // Keep a boundary after these matched prefixes, even inside a vowel group.
  const separate = [
    /^(?:re)?cre(?=at[eio])/, // create, recreate, recreation (but not creature)
    /^re(?=act)/, // re-act and re-action
    /^re(?=absorb|app|elect|emerg|enter|establish|evalu|impos|invent|issue|us[ei])/, // reuse, reenter; not reed
    /^pre(?=adolesc|ambl|arrang|eminen|empt|exist|ignition|invas)/, // preempt, preexisting; not preen
    /^(?:micro|macro)(?=[aeiou])/, // micro-organism, macro-economic
    /^co(?=operat|ordinat|alesc|erc)/, // cooperate, coercion; not cooperage
    /^pro(?=act)/, // proactive; not approach
    /^flu(?=id)/, // flu-id, unlike fruit
    /^ru(?=in)/, // ru-in and ru-ined
    /di(?=et|en[ct])/, // diet, audience, obedient; not died or soldier
    /^ide(?=a)/, // idea, ideal; not deal
    /^sovi(?=et)/, // Soviet and its derivatives retain separate i and e sounds
    /^soci(?=et)/, // society, societies, societal; not social
    /i(?=ell[aoi])/, // Gabriella, Gabrielli, -iello names; not field
    /i(?=et(?:te)?s?$)/, // Juliet, Henriette
    /^qui(?=et)/, // quiet keeps its separate vowels in quietly and quieter
    /^acre(?=age)/, // acreage retains the vowel of acre before -age
    /^sci(?=on)/, // scion has two vowels, unlike the ending in vision
    /^intra(?=[aeiou])/, // intrauterine, intraocular
    /re(?=al(?!ly|m))/, // cereal, reality; not really or realm
    /[^q]u(?=en[ctdz])/, // fluent, innuendo, influenza; not subsequent
    /[^g]u(?=ing)/, // suing, continuing; not plaguing or intriguing
    /argu(?=ing)/, // arguing retains its pronounced u
    /^lou(?=is)/, // Louis, Louisville
    /[eo]u(?=illes?$)/, // separate the vowel groups in -euille/-ouille
    /ou(?=ett)/, // silhouette, pirouette: ou and e are separate vowels
    /o(?=as?$)/, // boa, boas; not boat
  ];

  // Match a bounded window around the current vowel: [i - before, i + after).
  const joined = [
    // Common vowel pairs share a span unless a separate rule overrides them.
    { before: 1, after: 1, match: /^(ai|au|ay|ea|ee|ei|eu|ey|ie|oa|oe|oi|oo|ou|oy|ue|ui)$/ },
    { before: 3, after: 2, match: /^llion/ }, // million, unlike lion
    { before: 2, after: 3, match: /^[cst]i(?:on|an|al|ous)/ }, // nation, special, musician
    { before: 2, after: 4, match: /^cia(?:s|['’]s)?$/ }, // final -cia blends; association and glaciation keep separate vowels
    { before: 2, after: 1, match: /^eau$/ }, // extend ea to eau in beautiful
    { before: 1, after: 3, match: /^ae(?:r|st)/ }, // aerospace, aesthetic
    { before: 2, after: 3, match: /^[cg]eous/ }, // gorgeous, herbaceous; not courteous
    { before: 3, after: 3, match: /^hteous/ }, // righteous and its suffixes
  ];

  // Mark pronounced vowel groups before choosing any consonant boundaries.
  const vowelSpan = word => {
    // Record ignored positions without deleting letters or shifting offsets.
    const silent = new Set();
    // A silent e remains silent inside a recognized compound.
    compoundPrefixes.forEach(pattern => {
      const match = pattern.exec(word);
      if (match) {
        silent.add(match[0].lastIndexOf('e'));
      }
    });
    ignored.forEach(rule => {
      if (!rule.except || !rule.except.test(word)) {
        for (const match of word.matchAll(rule.match)) {
          silent.add(match.index + rule.offset);
        }
      }
    });
    // Forced separations take precedence over the joined-vowel rules below.
    const breaks = new Set();
    separate.forEach(pattern => {
      const match = pattern.exec(word);
      if (match) {
        breaks.add(match.index + match[0].length);
      }
    });
    // Spans use slice-compatible offsets: start is inclusive, end is exclusive.
    const groups = [];
    const prefix = syllabicPrefix.exec(word);
    if (prefix) {
      groups.push({ start: 0, end: prefix[0].length });
    }
    // Mark the captured consonants without inserting letters or shifting offsets.
    const voiced = new Set();
    syllabicConsonants.forEach(pattern => {
      const match = pattern.exec(word);
      if (match) {
        voiced.add(match.index + match[0].lastIndexOf(match[1]));
      }
    });
    for (let i = 0; i < word.length; i += 1) {
      if ((!isVowel.test(word[i]) && !voiced.has(i)) || silent.has(i)) {
        continue
      }
      const previous = groups[groups.length - 1];
      // Only adjacent pronounced vowels may extend an existing span.
      const blended =
        previous &&
        previous.end === i &&
        !breaks.has(i) &&
        joined.some(rule => rule.match.test(word.slice(Math.max(0, i - rule.before), i + rule.after)));
      if (blended) {
        previous.end = i + 1;
      } else {
        groups.push({ start: i, end: i + 1 });
      }
    }
    return groups
  };

  // Turn vowel spans into cut positions by assigning the consonants between them.
  // Consonant clusters allowed to start a chunk; the picker checks longest first.
  const onset = new Set([
    'bl', 'br', 'ch', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr',
    'ph', 'pl', 'pr', 'qu', 'sh', 'sk', 'sl', 'sm', 'sn', 'sp',
    'st', 'sw', 'th', 'tr', 'tw', 'wh', 'scr', 'shr', 'spl', 'spr', 'str', 'thr',
  ]);

  // Applied in order after onset placement; later rules take precedence.
  // left/right are offsets from the surrounding vowel groups' edges.
  // minLeft only moves a boundary forward, preserving a longer consonant cluster.
  // gap matches intervening letters; tail matches the complete remaining spelling.
  const adjustments = [
    { minGap: 1, maxGap: 1, gap: /^x$/, left: 1 }, // box-es
    { minGap: 2, gap: /^(.)\1/, minLeft: 1 }, // rab-bit
    { minGap: 2, tail: /^ed$/, right: -1 }, // res-ted
    { minGap: 2, gap: /^sh$/, tail: /^(es|ing)$/, right: 0 }, // wish-ing
    { minGap: 2, gap: /l$/, tail: /^e(?:[sd]|['’](?:s|d|ll|re|ve))?$/, right: -2 }, // bot-tle, ta-bles, bub-bled
    { minGap: 2, gap: /l$/, tail: /^e(?:ments?|ships?|ness(?:es)?|less|ful(?:ly)?|ly)(?:['’]s)?$/, right: -2 }, // set-tle-ment, bat-tle-ships
    { minGap: 1, gap: /l$/, tail: /^ess(?:ly|ness(?:es)?)?$/, right: -1 }, // help-less: keep the suffix intact
    { minGap: 3, gap: /^ssl$/, tail: /^y$/, right: -1 }, // help-less-ly, not help-les-sly
    { minGap: 1, gap: /^(?:s|th)$/, tail: /^m(?:s|['’]s)?$/, right: 0 }, // chas-m, rhyth-m
    { minGap: 1, tail: /^n['’]t$/, right: 0 }, // could-n't: keep the base consonants together
    { minGap: 1, gap: /^[-‐‑–—]+$/, right: 0 }, // re-enter: keep the hyphen on the left
  ];

  // Choose one cut between each pair of vowel spans, preserving their count.
  const pickBoundaries = (word, vowelSpans) => {
    const cuts = [];
    // Keep recognized compound components intact, such as side-walk and some-one.
    const compoundCuts = compoundPrefixes.flatMap(pattern => {
      const match = pattern.exec(word);
      return match ? [match[0].length] : []
    });
    for (let i = 1; i < vowelSpans.length; i += 1) {
      // The gap contains the letters not assigned to either vowel span.
      const left = vowelSpans[i - 1].end;
      const right = vowelSpans[i].start;
      const gap = word.slice(left, right);
      // Match full suffixes so long endings are not mistaken for shorter ones.
      const tail = word.slice(right);
      // Adjacent vowels split directly; a single consonant starts the next chunk.
      let cut = left;
      if (gap.length > 1) {
        cut = right - 1;
        // Prefer the longest recognized consonant cluster at the next chunk's start.
        for (let size = Math.min(3, gap.length); size > 1; size -= 1) {
          if (onset.has(gap.slice(-size))) {
            cut = right - size;
            break
          }
        }
      }
      // Apply every matching adjustment in order, allowing specific rules to override.
      adjustments.forEach(rule => {
        if (
          gap.length < rule.minGap ||
          (rule.maxGap !== undefined && gap.length > rule.maxGap) ||
          (rule.gap && !rule.gap.test(gap)) ||
          (rule.tail && !rule.tail.test(tail))
        ) {
          return
        }
        // Exact offsets replace the cut; minLeft only advances an earlier cut.
        if (rule.left !== undefined) {
          cut = left + rule.left;
        } else if (rule.right !== undefined) {
          cut = right + rule.right;
        } else {
          cut = Math.max(cut, left + rule.minLeft);
        }
      });
      // A compound boundary overrides ordinary consonant placement within this gap.
      compoundCuts.forEach(boundary => {
        if (boundary >= left && boundary <= right) {
          cut = boundary;
        }
      });
      cuts.push(cut);
    }
    return cuts
  };

  const findCuts = str => {
    // Exact exceptions and their plural forms take priority over spelling rules.
    const found = checkExceptions(str);
    if (found !== null) {
      return found
    }
    // Keep apostrophe suffixes intact so vowel rules can recognize an extra syllable.
    const vowelSpans = vowelSpan(str);
    const cuts = pickBoundaries(str, vowelSpans);
    // An exception may supply base-word cuts without overriding a syllabic suffix.
    const key = str.replace(/['’](?:s|d|ll|re|ve)$/, '');
    // Without a suffix, the initial lookup already checked this word.
    if (key === str) {
      return cuts
    }
    const baseCuts = checkExceptions(key);
    if (baseCuts !== null) {
      return baseCuts.concat(cuts.filter(cut => cut >= key.length))
    }
    return cuts
  };

  const trailingPunct = /(?<!\p{Punctuation})\p{Punctuation}+$/u;
  const leadingPunct = /^[\p{Punctuation}$]+/u;

  // Prepare spelling for rule matching; cuts are still applied to the original text.
  const normalize = input => {
    let txt = input.toLowerCase();
    // Ignore trailing punctuation runs for analysis; internal apostrophes stay intact.
    txt = txt.replace(trailingPunct, '');
    // Keep the prefix length so cuts still align with the original spelling.
    const prefix = txt.match(leadingPunct)?.[0] || '';
    const clean = txt.slice(prefix.length);
    return { clean, prefix }
  };

  const pushCutsBack = (cuts, prefix = '') => {
    return cuts.map(cut => cut + prefix.length)
  };

  // split a string into chunks based on the given cuts
  const applyCuts = (text, cuts) => {
    let start = 0;
    const parts = cuts.map(end => {
      const part = text.slice(start, end);
      start = end;
      return part
    });
    // Cuts are interior boundaries; the final chunk always runs to the text's end.
    parts.push(text.slice(start));
    return parts
  };

  // Pass the original term text through; the tokenizer owns pre/post punctuation.
  const splitTerm = (term, options = {}) => {
    if (!term.text) {
      return []
    }
    let str = term.text;
    if (options.normalize) {
      str = term.normal || term.text;
    }
    // we can split on a normalized string
    const { clean, prefix } = normalize(str);
    let cuts = findCuts(clean);
    if (prefix && prefix.length > 0) {
      cuts = pushCutsBack(cuts, prefix);
    }
    return applyCuts(str, cuts)
  };

  // Store syllables on each term; the public API collects them by sentence.
  const syllables = function (view, options = {}) {
    view.docs.forEach(terms => {
      terms.forEach(term => {
        term.syllables = splitTerm(term, options);
      });
    });
  };

  //individual manipulations of the text
  const transformations = {
    dedup: (s) => {
      return s.replace(/([^c])\1/g, '$1')
    },
    dropInitialLetters: (s) => {
      if (/^(kn|gn|pn|ae|wr)/.test(s)) {
        return s.substring(1, s.length - 1)
      }
      return s
    },
    dropBafterMAtEnd: (s) => {
      return s.replace(/mb$/, 'm')
    },
    cchange: (s) => {
      s = s.replace(/([^s]|^)(c)(h)/g, '$1x$3').trim();
      s = s.replace(/cia/g, 'xia');
      s = s.replace(/c([iey])/g, 's$1');
      return s.replace(/c/g, 'k')
    },
    dchange: (s) => {
      s = s.replace(/d(ge|gy|gi)/g, 'j$1');
      return s.replace(/d/g, 't')
    },
    dropG: (s) => {
      // Drop 'G' if followed by 'H' and 'H' is not at the end or before a vowel. 
      s = s.replace(/gh(^$|[^aeiou])/g, 'h$1');//eslint-disable-line
      // Drop 'G' if followed by 'N' or 'NED' and is at the end.
      return s.replace(/g(n|ned)$/g, '$1')
    },
    changeG: (s) => {
      s = s.replace(/gh/g, 'f');
      s = s.replace(/([^g]|^)(g)([iey])/g, '$1j$3');
      s = s.replace(/gg/g, 'g');
      return s.replace(/g/g, 'k')
    },
    dropH: (s) => {
      return s.replace(/([aeiou])h([^aeiou]|$)/g, '$1$2')
    },
    changeCK: (s) => {
      return s.replace(/ck/g, 'k')
    },
    changePH: (s) => {
      return s.replace(/ph/g, 'f')
    },
    changeQ: (s) => {
      return s.replace(/q/g, 'k')
    },
    changeS: (s) => {
      return s.replace(/s(h|io|ia)/g, 'x$1')
    },
    changeT: (s) => {
      s = s.replace(/t(ia[^n]|io)/g, 'x$1');
      // return s.replace(/th/, '0')
      return s
    },
    dropT: (s) => {
      return s.replace(/tch/g, 'ch')
    },
    changeV: (s) => {
      return s.replace(/v/g, 'f')
    },
    changeWH: (s) => {
      return s.replace(/^wh/, 'w')
    },
    dropW: (s) => {
      return s.replace(/w([^aeiou]|$)/g, '$1')
    },
    changeX: (s) => {
      s = s.replace(/^x/, 's');
      return s.replace(/x/g, 'ks')
    },
    dropY: (s) => {
      return s.replace(/y([^aeiou]|$)/g, '$1')
    },
    changeZ: (s) => {
      return s.replace(/z/, 's')
    },
    dropVowels: (s) => {
      return s //.charAt(0) + s.substr(1, s.length).replace(/[aeiou]/g, '');
    },
  };

  //a js version of the metaphone (#1) algorithm
  //adapted from the work of Chris Umbel
  // https://github.com/NaturalNode/natural/blob/master/lib/natural/phonetics/metaphone.js


  const metaphone = function (s) {
    s = transformations.dedup(s);
    s = transformations.dropInitialLetters(s);
    s = transformations.dropBafterMAtEnd(s);
    s = transformations.changeCK(s);
    s = transformations.cchange(s);
    s = transformations.dchange(s);
    s = transformations.dropG(s);
    s = transformations.changeG(s);
    s = transformations.dropH(s);
    s = transformations.changePH(s);
    s = transformations.changeQ(s);
    s = transformations.changeS(s);
    s = transformations.changeX(s);
    s = transformations.changeT(s);
    s = transformations.dropT(s);
    s = transformations.changeV(s);
    s = transformations.changeWH(s);
    s = transformations.dropW(s);
    s = transformations.dropY(s);
    s = transformations.changeZ(s);
    s = transformations.dropVowels(s);
    return s.trim()
  };

  const soundsLike = function (view) {
    view.docs.forEach(terms => {
      terms.forEach(term => {
        term.soundsLike = metaphone(term.normal || term.text);
      });
    });
  };

  var plugin = {
    version,
    api,
    compute: {
      syllables,
      soundsLike,
    },
  };

  return plugin;

}));
