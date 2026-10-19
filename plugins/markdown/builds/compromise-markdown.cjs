(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseMarkdown = factory());
})(this, (function () { 'use strict';

  /**
   * @typedef {import('mdast').Nodes} Nodes
   *
   * @typedef Options
   *   Configuration (optional).
   * @property {boolean | null | undefined} [includeImageAlt=true]
   *   Whether to use `alt` for `image`s (default: `true`).
   * @property {boolean | null | undefined} [includeHtml=true]
   *   Whether to use `value` of HTML (default: `true`).
   */

  /** @type {Options} */
  const emptyOptions = {};

  /**
   * Get the text content of a node or list of nodes.
   *
   * Prefers the node’s plain-text fields, otherwise serializes its children,
   * and if the given value is an array, serialize the nodes in it.
   *
   * @param {unknown} [value]
   *   Thing to serialize, typically `Node`.
   * @param {Options | null | undefined} [options]
   *   Configuration (optional).
   * @returns {string}
   *   Serialized `value`.
   */
  function toString(value, options) {
    const settings = emptyOptions;
    const includeImageAlt =
      typeof settings.includeImageAlt === 'boolean'
        ? settings.includeImageAlt
        : true;
    const includeHtml =
      typeof settings.includeHtml === 'boolean' ? settings.includeHtml : true;

    return one(value, includeImageAlt, includeHtml)
  }

  /**
   * One node or several nodes.
   *
   * @param {unknown} value
   *   Thing to serialize.
   * @param {boolean} includeImageAlt
   *   Include image `alt`s.
   * @param {boolean} includeHtml
   *   Include HTML.
   * @returns {string}
   *   Serialized node.
   */
  function one(value, includeImageAlt, includeHtml) {
    if (node(value)) {
      if ('value' in value) {
        return value.type === 'html' && !includeHtml ? '' : value.value
      }

      if (includeImageAlt && 'alt' in value && value.alt) {
        return value.alt
      }

      if ('children' in value) {
        return all(value.children, includeImageAlt, includeHtml)
      }
    }

    if (Array.isArray(value)) {
      return all(value, includeImageAlt, includeHtml)
    }

    return ''
  }

  /**
   * Serialize a list of nodes.
   *
   * @param {Array<unknown>} values
   *   Thing to serialize.
   * @param {boolean} includeImageAlt
   *   Include image `alt`s.
   * @param {boolean} includeHtml
   *   Include HTML.
   * @returns {string}
   *   Serialized nodes.
   */
  function all(values, includeImageAlt, includeHtml) {
    /** @type {Array<string>} */
    const result = [];
    let index = -1;

    while (++index < values.length) {
      result[index] = one(values[index], includeImageAlt, includeHtml);
    }

    return result.join('')
  }

  /**
   * Check if `value` looks like a node.
   *
   * @param {unknown} value
   *   Thing.
   * @returns {value is Nodes}
   *   Whether `value` is a node.
   */
  function node(value) {
    return Boolean(value && typeof value === 'object')
  }

  /**
   * Map of named character references.
   *
   * @type {Record<string, string>}
   */
  const characterEntities = {
    AElig: 'Æ',
    AMP: '&',
    Aacute: 'Á',
    Abreve: 'Ă',
    Acirc: 'Â',
    Acy: 'А',
    Afr: '𝔄',
    Agrave: 'À',
    Alpha: 'Α',
    Amacr: 'Ā',
    And: '⩓',
    Aogon: 'Ą',
    Aopf: '𝔸',
    ApplyFunction: '⁡',
    Aring: 'Å',
    Ascr: '𝒜',
    Assign: '≔',
    Atilde: 'Ã',
    Auml: 'Ä',
    Backslash: '∖',
    Barv: '⫧',
    Barwed: '⌆',
    Bcy: 'Б',
    Because: '∵',
    Bernoullis: 'ℬ',
    Beta: 'Β',
    Bfr: '𝔅',
    Bopf: '𝔹',
    Breve: '˘',
    Bscr: 'ℬ',
    Bumpeq: '≎',
    CHcy: 'Ч',
    COPY: '©',
    Cacute: 'Ć',
    Cap: '⋒',
    CapitalDifferentialD: 'ⅅ',
    Cayleys: 'ℭ',
    Ccaron: 'Č',
    Ccedil: 'Ç',
    Ccirc: 'Ĉ',
    Cconint: '∰',
    Cdot: 'Ċ',
    Cedilla: '¸',
    CenterDot: '·',
    Cfr: 'ℭ',
    Chi: 'Χ',
    CircleDot: '⊙',
    CircleMinus: '⊖',
    CirclePlus: '⊕',
    CircleTimes: '⊗',
    ClockwiseContourIntegral: '∲',
    CloseCurlyDoubleQuote: '”',
    CloseCurlyQuote: '’',
    Colon: '∷',
    Colone: '⩴',
    Congruent: '≡',
    Conint: '∯',
    ContourIntegral: '∮',
    Copf: 'ℂ',
    Coproduct: '∐',
    CounterClockwiseContourIntegral: '∳',
    Cross: '⨯',
    Cscr: '𝒞',
    Cup: '⋓',
    CupCap: '≍',
    DD: 'ⅅ',
    DDotrahd: '⤑',
    DJcy: 'Ђ',
    DScy: 'Ѕ',
    DZcy: 'Џ',
    Dagger: '‡',
    Darr: '↡',
    Dashv: '⫤',
    Dcaron: 'Ď',
    Dcy: 'Д',
    Del: '∇',
    Delta: 'Δ',
    Dfr: '𝔇',
    DiacriticalAcute: '´',
    DiacriticalDot: '˙',
    DiacriticalDoubleAcute: '˝',
    DiacriticalGrave: '`',
    DiacriticalTilde: '˜',
    Diamond: '⋄',
    DifferentialD: 'ⅆ',
    Dopf: '𝔻',
    Dot: '¨',
    DotDot: '⃜',
    DotEqual: '≐',
    DoubleContourIntegral: '∯',
    DoubleDot: '¨',
    DoubleDownArrow: '⇓',
    DoubleLeftArrow: '⇐',
    DoubleLeftRightArrow: '⇔',
    DoubleLeftTee: '⫤',
    DoubleLongLeftArrow: '⟸',
    DoubleLongLeftRightArrow: '⟺',
    DoubleLongRightArrow: '⟹',
    DoubleRightArrow: '⇒',
    DoubleRightTee: '⊨',
    DoubleUpArrow: '⇑',
    DoubleUpDownArrow: '⇕',
    DoubleVerticalBar: '∥',
    DownArrow: '↓',
    DownArrowBar: '⤓',
    DownArrowUpArrow: '⇵',
    DownBreve: '̑',
    DownLeftRightVector: '⥐',
    DownLeftTeeVector: '⥞',
    DownLeftVector: '↽',
    DownLeftVectorBar: '⥖',
    DownRightTeeVector: '⥟',
    DownRightVector: '⇁',
    DownRightVectorBar: '⥗',
    DownTee: '⊤',
    DownTeeArrow: '↧',
    Downarrow: '⇓',
    Dscr: '𝒟',
    Dstrok: 'Đ',
    ENG: 'Ŋ',
    ETH: 'Ð',
    Eacute: 'É',
    Ecaron: 'Ě',
    Ecirc: 'Ê',
    Ecy: 'Э',
    Edot: 'Ė',
    Efr: '𝔈',
    Egrave: 'È',
    Element: '∈',
    Emacr: 'Ē',
    EmptySmallSquare: '◻',
    EmptyVerySmallSquare: '▫',
    Eogon: 'Ę',
    Eopf: '𝔼',
    Epsilon: 'Ε',
    Equal: '⩵',
    EqualTilde: '≂',
    Equilibrium: '⇌',
    Escr: 'ℰ',
    Esim: '⩳',
    Eta: 'Η',
    Euml: 'Ë',
    Exists: '∃',
    ExponentialE: 'ⅇ',
    Fcy: 'Ф',
    Ffr: '𝔉',
    FilledSmallSquare: '◼',
    FilledVerySmallSquare: '▪',
    Fopf: '𝔽',
    ForAll: '∀',
    Fouriertrf: 'ℱ',
    Fscr: 'ℱ',
    GJcy: 'Ѓ',
    GT: '>',
    Gamma: 'Γ',
    Gammad: 'Ϝ',
    Gbreve: 'Ğ',
    Gcedil: 'Ģ',
    Gcirc: 'Ĝ',
    Gcy: 'Г',
    Gdot: 'Ġ',
    Gfr: '𝔊',
    Gg: '⋙',
    Gopf: '𝔾',
    GreaterEqual: '≥',
    GreaterEqualLess: '⋛',
    GreaterFullEqual: '≧',
    GreaterGreater: '⪢',
    GreaterLess: '≷',
    GreaterSlantEqual: '⩾',
    GreaterTilde: '≳',
    Gscr: '𝒢',
    Gt: '≫',
    HARDcy: 'Ъ',
    Hacek: 'ˇ',
    Hat: '^',
    Hcirc: 'Ĥ',
    Hfr: 'ℌ',
    HilbertSpace: 'ℋ',
    Hopf: 'ℍ',
    HorizontalLine: '─',
    Hscr: 'ℋ',
    Hstrok: 'Ħ',
    HumpDownHump: '≎',
    HumpEqual: '≏',
    IEcy: 'Е',
    IJlig: 'Ĳ',
    IOcy: 'Ё',
    Iacute: 'Í',
    Icirc: 'Î',
    Icy: 'И',
    Idot: 'İ',
    Ifr: 'ℑ',
    Igrave: 'Ì',
    Im: 'ℑ',
    Imacr: 'Ī',
    ImaginaryI: 'ⅈ',
    Implies: '⇒',
    Int: '∬',
    Integral: '∫',
    Intersection: '⋂',
    InvisibleComma: '⁣',
    InvisibleTimes: '⁢',
    Iogon: 'Į',
    Iopf: '𝕀',
    Iota: 'Ι',
    Iscr: 'ℐ',
    Itilde: 'Ĩ',
    Iukcy: 'І',
    Iuml: 'Ï',
    Jcirc: 'Ĵ',
    Jcy: 'Й',
    Jfr: '𝔍',
    Jopf: '𝕁',
    Jscr: '𝒥',
    Jsercy: 'Ј',
    Jukcy: 'Є',
    KHcy: 'Х',
    KJcy: 'Ќ',
    Kappa: 'Κ',
    Kcedil: 'Ķ',
    Kcy: 'К',
    Kfr: '𝔎',
    Kopf: '𝕂',
    Kscr: '𝒦',
    LJcy: 'Љ',
    LT: '<',
    Lacute: 'Ĺ',
    Lambda: 'Λ',
    Lang: '⟪',
    Laplacetrf: 'ℒ',
    Larr: '↞',
    Lcaron: 'Ľ',
    Lcedil: 'Ļ',
    Lcy: 'Л',
    LeftAngleBracket: '⟨',
    LeftArrow: '←',
    LeftArrowBar: '⇤',
    LeftArrowRightArrow: '⇆',
    LeftCeiling: '⌈',
    LeftDoubleBracket: '⟦',
    LeftDownTeeVector: '⥡',
    LeftDownVector: '⇃',
    LeftDownVectorBar: '⥙',
    LeftFloor: '⌊',
    LeftRightArrow: '↔',
    LeftRightVector: '⥎',
    LeftTee: '⊣',
    LeftTeeArrow: '↤',
    LeftTeeVector: '⥚',
    LeftTriangle: '⊲',
    LeftTriangleBar: '⧏',
    LeftTriangleEqual: '⊴',
    LeftUpDownVector: '⥑',
    LeftUpTeeVector: '⥠',
    LeftUpVector: '↿',
    LeftUpVectorBar: '⥘',
    LeftVector: '↼',
    LeftVectorBar: '⥒',
    Leftarrow: '⇐',
    Leftrightarrow: '⇔',
    LessEqualGreater: '⋚',
    LessFullEqual: '≦',
    LessGreater: '≶',
    LessLess: '⪡',
    LessSlantEqual: '⩽',
    LessTilde: '≲',
    Lfr: '𝔏',
    Ll: '⋘',
    Lleftarrow: '⇚',
    Lmidot: 'Ŀ',
    LongLeftArrow: '⟵',
    LongLeftRightArrow: '⟷',
    LongRightArrow: '⟶',
    Longleftarrow: '⟸',
    Longleftrightarrow: '⟺',
    Longrightarrow: '⟹',
    Lopf: '𝕃',
    LowerLeftArrow: '↙',
    LowerRightArrow: '↘',
    Lscr: 'ℒ',
    Lsh: '↰',
    Lstrok: 'Ł',
    Lt: '≪',
    Map: '⤅',
    Mcy: 'М',
    MediumSpace: ' ',
    Mellintrf: 'ℳ',
    Mfr: '𝔐',
    MinusPlus: '∓',
    Mopf: '𝕄',
    Mscr: 'ℳ',
    Mu: 'Μ',
    NJcy: 'Њ',
    Nacute: 'Ń',
    Ncaron: 'Ň',
    Ncedil: 'Ņ',
    Ncy: 'Н',
    NegativeMediumSpace: '​',
    NegativeThickSpace: '​',
    NegativeThinSpace: '​',
    NegativeVeryThinSpace: '​',
    NestedGreaterGreater: '≫',
    NestedLessLess: '≪',
    NewLine: '\n',
    Nfr: '𝔑',
    NoBreak: '⁠',
    NonBreakingSpace: ' ',
    Nopf: 'ℕ',
    Not: '⫬',
    NotCongruent: '≢',
    NotCupCap: '≭',
    NotDoubleVerticalBar: '∦',
    NotElement: '∉',
    NotEqual: '≠',
    NotEqualTilde: '≂̸',
    NotExists: '∄',
    NotGreater: '≯',
    NotGreaterEqual: '≱',
    NotGreaterFullEqual: '≧̸',
    NotGreaterGreater: '≫̸',
    NotGreaterLess: '≹',
    NotGreaterSlantEqual: '⩾̸',
    NotGreaterTilde: '≵',
    NotHumpDownHump: '≎̸',
    NotHumpEqual: '≏̸',
    NotLeftTriangle: '⋪',
    NotLeftTriangleBar: '⧏̸',
    NotLeftTriangleEqual: '⋬',
    NotLess: '≮',
    NotLessEqual: '≰',
    NotLessGreater: '≸',
    NotLessLess: '≪̸',
    NotLessSlantEqual: '⩽̸',
    NotLessTilde: '≴',
    NotNestedGreaterGreater: '⪢̸',
    NotNestedLessLess: '⪡̸',
    NotPrecedes: '⊀',
    NotPrecedesEqual: '⪯̸',
    NotPrecedesSlantEqual: '⋠',
    NotReverseElement: '∌',
    NotRightTriangle: '⋫',
    NotRightTriangleBar: '⧐̸',
    NotRightTriangleEqual: '⋭',
    NotSquareSubset: '⊏̸',
    NotSquareSubsetEqual: '⋢',
    NotSquareSuperset: '⊐̸',
    NotSquareSupersetEqual: '⋣',
    NotSubset: '⊂⃒',
    NotSubsetEqual: '⊈',
    NotSucceeds: '⊁',
    NotSucceedsEqual: '⪰̸',
    NotSucceedsSlantEqual: '⋡',
    NotSucceedsTilde: '≿̸',
    NotSuperset: '⊃⃒',
    NotSupersetEqual: '⊉',
    NotTilde: '≁',
    NotTildeEqual: '≄',
    NotTildeFullEqual: '≇',
    NotTildeTilde: '≉',
    NotVerticalBar: '∤',
    Nscr: '𝒩',
    Ntilde: 'Ñ',
    Nu: 'Ν',
    OElig: 'Œ',
    Oacute: 'Ó',
    Ocirc: 'Ô',
    Ocy: 'О',
    Odblac: 'Ő',
    Ofr: '𝔒',
    Ograve: 'Ò',
    Omacr: 'Ō',
    Omega: 'Ω',
    Omicron: 'Ο',
    Oopf: '𝕆',
    OpenCurlyDoubleQuote: '“',
    OpenCurlyQuote: '‘',
    Or: '⩔',
    Oscr: '𝒪',
    Oslash: 'Ø',
    Otilde: 'Õ',
    Otimes: '⨷',
    Ouml: 'Ö',
    OverBar: '‾',
    OverBrace: '⏞',
    OverBracket: '⎴',
    OverParenthesis: '⏜',
    PartialD: '∂',
    Pcy: 'П',
    Pfr: '𝔓',
    Phi: 'Φ',
    Pi: 'Π',
    PlusMinus: '±',
    Poincareplane: 'ℌ',
    Popf: 'ℙ',
    Pr: '⪻',
    Precedes: '≺',
    PrecedesEqual: '⪯',
    PrecedesSlantEqual: '≼',
    PrecedesTilde: '≾',
    Prime: '″',
    Product: '∏',
    Proportion: '∷',
    Proportional: '∝',
    Pscr: '𝒫',
    Psi: 'Ψ',
    QUOT: '"',
    Qfr: '𝔔',
    Qopf: 'ℚ',
    Qscr: '𝒬',
    RBarr: '⤐',
    REG: '®',
    Racute: 'Ŕ',
    Rang: '⟫',
    Rarr: '↠',
    Rarrtl: '⤖',
    Rcaron: 'Ř',
    Rcedil: 'Ŗ',
    Rcy: 'Р',
    Re: 'ℜ',
    ReverseElement: '∋',
    ReverseEquilibrium: '⇋',
    ReverseUpEquilibrium: '⥯',
    Rfr: 'ℜ',
    Rho: 'Ρ',
    RightAngleBracket: '⟩',
    RightArrow: '→',
    RightArrowBar: '⇥',
    RightArrowLeftArrow: '⇄',
    RightCeiling: '⌉',
    RightDoubleBracket: '⟧',
    RightDownTeeVector: '⥝',
    RightDownVector: '⇂',
    RightDownVectorBar: '⥕',
    RightFloor: '⌋',
    RightTee: '⊢',
    RightTeeArrow: '↦',
    RightTeeVector: '⥛',
    RightTriangle: '⊳',
    RightTriangleBar: '⧐',
    RightTriangleEqual: '⊵',
    RightUpDownVector: '⥏',
    RightUpTeeVector: '⥜',
    RightUpVector: '↾',
    RightUpVectorBar: '⥔',
    RightVector: '⇀',
    RightVectorBar: '⥓',
    Rightarrow: '⇒',
    Ropf: 'ℝ',
    RoundImplies: '⥰',
    Rrightarrow: '⇛',
    Rscr: 'ℛ',
    Rsh: '↱',
    RuleDelayed: '⧴',
    SHCHcy: 'Щ',
    SHcy: 'Ш',
    SOFTcy: 'Ь',
    Sacute: 'Ś',
    Sc: '⪼',
    Scaron: 'Š',
    Scedil: 'Ş',
    Scirc: 'Ŝ',
    Scy: 'С',
    Sfr: '𝔖',
    ShortDownArrow: '↓',
    ShortLeftArrow: '←',
    ShortRightArrow: '→',
    ShortUpArrow: '↑',
    Sigma: 'Σ',
    SmallCircle: '∘',
    Sopf: '𝕊',
    Sqrt: '√',
    Square: '□',
    SquareIntersection: '⊓',
    SquareSubset: '⊏',
    SquareSubsetEqual: '⊑',
    SquareSuperset: '⊐',
    SquareSupersetEqual: '⊒',
    SquareUnion: '⊔',
    Sscr: '𝒮',
    Star: '⋆',
    Sub: '⋐',
    Subset: '⋐',
    SubsetEqual: '⊆',
    Succeeds: '≻',
    SucceedsEqual: '⪰',
    SucceedsSlantEqual: '≽',
    SucceedsTilde: '≿',
    SuchThat: '∋',
    Sum: '∑',
    Sup: '⋑',
    Superset: '⊃',
    SupersetEqual: '⊇',
    Supset: '⋑',
    THORN: 'Þ',
    TRADE: '™',
    TSHcy: 'Ћ',
    TScy: 'Ц',
    Tab: '\t',
    Tau: 'Τ',
    Tcaron: 'Ť',
    Tcedil: 'Ţ',
    Tcy: 'Т',
    Tfr: '𝔗',
    Therefore: '∴',
    Theta: 'Θ',
    ThickSpace: '  ',
    ThinSpace: ' ',
    Tilde: '∼',
    TildeEqual: '≃',
    TildeFullEqual: '≅',
    TildeTilde: '≈',
    Topf: '𝕋',
    TripleDot: '⃛',
    Tscr: '𝒯',
    Tstrok: 'Ŧ',
    Uacute: 'Ú',
    Uarr: '↟',
    Uarrocir: '⥉',
    Ubrcy: 'Ў',
    Ubreve: 'Ŭ',
    Ucirc: 'Û',
    Ucy: 'У',
    Udblac: 'Ű',
    Ufr: '𝔘',
    Ugrave: 'Ù',
    Umacr: 'Ū',
    UnderBar: '_',
    UnderBrace: '⏟',
    UnderBracket: '⎵',
    UnderParenthesis: '⏝',
    Union: '⋃',
    UnionPlus: '⊎',
    Uogon: 'Ų',
    Uopf: '𝕌',
    UpArrow: '↑',
    UpArrowBar: '⤒',
    UpArrowDownArrow: '⇅',
    UpDownArrow: '↕',
    UpEquilibrium: '⥮',
    UpTee: '⊥',
    UpTeeArrow: '↥',
    Uparrow: '⇑',
    Updownarrow: '⇕',
    UpperLeftArrow: '↖',
    UpperRightArrow: '↗',
    Upsi: 'ϒ',
    Upsilon: 'Υ',
    Uring: 'Ů',
    Uscr: '𝒰',
    Utilde: 'Ũ',
    Uuml: 'Ü',
    VDash: '⊫',
    Vbar: '⫫',
    Vcy: 'В',
    Vdash: '⊩',
    Vdashl: '⫦',
    Vee: '⋁',
    Verbar: '‖',
    Vert: '‖',
    VerticalBar: '∣',
    VerticalLine: '|',
    VerticalSeparator: '❘',
    VerticalTilde: '≀',
    VeryThinSpace: ' ',
    Vfr: '𝔙',
    Vopf: '𝕍',
    Vscr: '𝒱',
    Vvdash: '⊪',
    Wcirc: 'Ŵ',
    Wedge: '⋀',
    Wfr: '𝔚',
    Wopf: '𝕎',
    Wscr: '𝒲',
    Xfr: '𝔛',
    Xi: 'Ξ',
    Xopf: '𝕏',
    Xscr: '𝒳',
    YAcy: 'Я',
    YIcy: 'Ї',
    YUcy: 'Ю',
    Yacute: 'Ý',
    Ycirc: 'Ŷ',
    Ycy: 'Ы',
    Yfr: '𝔜',
    Yopf: '𝕐',
    Yscr: '𝒴',
    Yuml: 'Ÿ',
    ZHcy: 'Ж',
    Zacute: 'Ź',
    Zcaron: 'Ž',
    Zcy: 'З',
    Zdot: 'Ż',
    ZeroWidthSpace: '​',
    Zeta: 'Ζ',
    Zfr: 'ℨ',
    Zopf: 'ℤ',
    Zscr: '𝒵',
    aacute: 'á',
    abreve: 'ă',
    ac: '∾',
    acE: '∾̳',
    acd: '∿',
    acirc: 'â',
    acute: '´',
    acy: 'а',
    aelig: 'æ',
    af: '⁡',
    afr: '𝔞',
    agrave: 'à',
    alefsym: 'ℵ',
    aleph: 'ℵ',
    alpha: 'α',
    amacr: 'ā',
    amalg: '⨿',
    amp: '&',
    and: '∧',
    andand: '⩕',
    andd: '⩜',
    andslope: '⩘',
    andv: '⩚',
    ang: '∠',
    ange: '⦤',
    angle: '∠',
    angmsd: '∡',
    angmsdaa: '⦨',
    angmsdab: '⦩',
    angmsdac: '⦪',
    angmsdad: '⦫',
    angmsdae: '⦬',
    angmsdaf: '⦭',
    angmsdag: '⦮',
    angmsdah: '⦯',
    angrt: '∟',
    angrtvb: '⊾',
    angrtvbd: '⦝',
    angsph: '∢',
    angst: 'Å',
    angzarr: '⍼',
    aogon: 'ą',
    aopf: '𝕒',
    ap: '≈',
    apE: '⩰',
    apacir: '⩯',
    ape: '≊',
    apid: '≋',
    apos: "'",
    approx: '≈',
    approxeq: '≊',
    aring: 'å',
    ascr: '𝒶',
    ast: '*',
    asymp: '≈',
    asympeq: '≍',
    atilde: 'ã',
    auml: 'ä',
    awconint: '∳',
    awint: '⨑',
    bNot: '⫭',
    backcong: '≌',
    backepsilon: '϶',
    backprime: '‵',
    backsim: '∽',
    backsimeq: '⋍',
    barvee: '⊽',
    barwed: '⌅',
    barwedge: '⌅',
    bbrk: '⎵',
    bbrktbrk: '⎶',
    bcong: '≌',
    bcy: 'б',
    bdquo: '„',
    becaus: '∵',
    because: '∵',
    bemptyv: '⦰',
    bepsi: '϶',
    bernou: 'ℬ',
    beta: 'β',
    beth: 'ℶ',
    between: '≬',
    bfr: '𝔟',
    bigcap: '⋂',
    bigcirc: '◯',
    bigcup: '⋃',
    bigodot: '⨀',
    bigoplus: '⨁',
    bigotimes: '⨂',
    bigsqcup: '⨆',
    bigstar: '★',
    bigtriangledown: '▽',
    bigtriangleup: '△',
    biguplus: '⨄',
    bigvee: '⋁',
    bigwedge: '⋀',
    bkarow: '⤍',
    blacklozenge: '⧫',
    blacksquare: '▪',
    blacktriangle: '▴',
    blacktriangledown: '▾',
    blacktriangleleft: '◂',
    blacktriangleright: '▸',
    blank: '␣',
    blk12: '▒',
    blk14: '░',
    blk34: '▓',
    block: '█',
    bne: '=⃥',
    bnequiv: '≡⃥',
    bnot: '⌐',
    bopf: '𝕓',
    bot: '⊥',
    bottom: '⊥',
    bowtie: '⋈',
    boxDL: '╗',
    boxDR: '╔',
    boxDl: '╖',
    boxDr: '╓',
    boxH: '═',
    boxHD: '╦',
    boxHU: '╩',
    boxHd: '╤',
    boxHu: '╧',
    boxUL: '╝',
    boxUR: '╚',
    boxUl: '╜',
    boxUr: '╙',
    boxV: '║',
    boxVH: '╬',
    boxVL: '╣',
    boxVR: '╠',
    boxVh: '╫',
    boxVl: '╢',
    boxVr: '╟',
    boxbox: '⧉',
    boxdL: '╕',
    boxdR: '╒',
    boxdl: '┐',
    boxdr: '┌',
    boxh: '─',
    boxhD: '╥',
    boxhU: '╨',
    boxhd: '┬',
    boxhu: '┴',
    boxminus: '⊟',
    boxplus: '⊞',
    boxtimes: '⊠',
    boxuL: '╛',
    boxuR: '╘',
    boxul: '┘',
    boxur: '└',
    boxv: '│',
    boxvH: '╪',
    boxvL: '╡',
    boxvR: '╞',
    boxvh: '┼',
    boxvl: '┤',
    boxvr: '├',
    bprime: '‵',
    breve: '˘',
    brvbar: '¦',
    bscr: '𝒷',
    bsemi: '⁏',
    bsim: '∽',
    bsime: '⋍',
    bsol: '\\',
    bsolb: '⧅',
    bsolhsub: '⟈',
    bull: '•',
    bullet: '•',
    bump: '≎',
    bumpE: '⪮',
    bumpe: '≏',
    bumpeq: '≏',
    cacute: 'ć',
    cap: '∩',
    capand: '⩄',
    capbrcup: '⩉',
    capcap: '⩋',
    capcup: '⩇',
    capdot: '⩀',
    caps: '∩︀',
    caret: '⁁',
    caron: 'ˇ',
    ccaps: '⩍',
    ccaron: 'č',
    ccedil: 'ç',
    ccirc: 'ĉ',
    ccups: '⩌',
    ccupssm: '⩐',
    cdot: 'ċ',
    cedil: '¸',
    cemptyv: '⦲',
    cent: '¢',
    centerdot: '·',
    cfr: '𝔠',
    chcy: 'ч',
    check: '✓',
    checkmark: '✓',
    chi: 'χ',
    cir: '○',
    cirE: '⧃',
    circ: 'ˆ',
    circeq: '≗',
    circlearrowleft: '↺',
    circlearrowright: '↻',
    circledR: '®',
    circledS: 'Ⓢ',
    circledast: '⊛',
    circledcirc: '⊚',
    circleddash: '⊝',
    cire: '≗',
    cirfnint: '⨐',
    cirmid: '⫯',
    cirscir: '⧂',
    clubs: '♣',
    clubsuit: '♣',
    colon: ':',
    colone: '≔',
    coloneq: '≔',
    comma: ',',
    commat: '@',
    comp: '∁',
    compfn: '∘',
    complement: '∁',
    complexes: 'ℂ',
    cong: '≅',
    congdot: '⩭',
    conint: '∮',
    copf: '𝕔',
    coprod: '∐',
    copy: '©',
    copysr: '℗',
    crarr: '↵',
    cross: '✗',
    cscr: '𝒸',
    csub: '⫏',
    csube: '⫑',
    csup: '⫐',
    csupe: '⫒',
    ctdot: '⋯',
    cudarrl: '⤸',
    cudarrr: '⤵',
    cuepr: '⋞',
    cuesc: '⋟',
    cularr: '↶',
    cularrp: '⤽',
    cup: '∪',
    cupbrcap: '⩈',
    cupcap: '⩆',
    cupcup: '⩊',
    cupdot: '⊍',
    cupor: '⩅',
    cups: '∪︀',
    curarr: '↷',
    curarrm: '⤼',
    curlyeqprec: '⋞',
    curlyeqsucc: '⋟',
    curlyvee: '⋎',
    curlywedge: '⋏',
    curren: '¤',
    curvearrowleft: '↶',
    curvearrowright: '↷',
    cuvee: '⋎',
    cuwed: '⋏',
    cwconint: '∲',
    cwint: '∱',
    cylcty: '⌭',
    dArr: '⇓',
    dHar: '⥥',
    dagger: '†',
    daleth: 'ℸ',
    darr: '↓',
    dash: '‐',
    dashv: '⊣',
    dbkarow: '⤏',
    dblac: '˝',
    dcaron: 'ď',
    dcy: 'д',
    dd: 'ⅆ',
    ddagger: '‡',
    ddarr: '⇊',
    ddotseq: '⩷',
    deg: '°',
    delta: 'δ',
    demptyv: '⦱',
    dfisht: '⥿',
    dfr: '𝔡',
    dharl: '⇃',
    dharr: '⇂',
    diam: '⋄',
    diamond: '⋄',
    diamondsuit: '♦',
    diams: '♦',
    die: '¨',
    digamma: 'ϝ',
    disin: '⋲',
    div: '÷',
    divide: '÷',
    divideontimes: '⋇',
    divonx: '⋇',
    djcy: 'ђ',
    dlcorn: '⌞',
    dlcrop: '⌍',
    dollar: '$',
    dopf: '𝕕',
    dot: '˙',
    doteq: '≐',
    doteqdot: '≑',
    dotminus: '∸',
    dotplus: '∔',
    dotsquare: '⊡',
    doublebarwedge: '⌆',
    downarrow: '↓',
    downdownarrows: '⇊',
    downharpoonleft: '⇃',
    downharpoonright: '⇂',
    drbkarow: '⤐',
    drcorn: '⌟',
    drcrop: '⌌',
    dscr: '𝒹',
    dscy: 'ѕ',
    dsol: '⧶',
    dstrok: 'đ',
    dtdot: '⋱',
    dtri: '▿',
    dtrif: '▾',
    duarr: '⇵',
    duhar: '⥯',
    dwangle: '⦦',
    dzcy: 'џ',
    dzigrarr: '⟿',
    eDDot: '⩷',
    eDot: '≑',
    eacute: 'é',
    easter: '⩮',
    ecaron: 'ě',
    ecir: '≖',
    ecirc: 'ê',
    ecolon: '≕',
    ecy: 'э',
    edot: 'ė',
    ee: 'ⅇ',
    efDot: '≒',
    efr: '𝔢',
    eg: '⪚',
    egrave: 'è',
    egs: '⪖',
    egsdot: '⪘',
    el: '⪙',
    elinters: '⏧',
    ell: 'ℓ',
    els: '⪕',
    elsdot: '⪗',
    emacr: 'ē',
    empty: '∅',
    emptyset: '∅',
    emptyv: '∅',
    emsp13: ' ',
    emsp14: ' ',
    emsp: ' ',
    eng: 'ŋ',
    ensp: ' ',
    eogon: 'ę',
    eopf: '𝕖',
    epar: '⋕',
    eparsl: '⧣',
    eplus: '⩱',
    epsi: 'ε',
    epsilon: 'ε',
    epsiv: 'ϵ',
    eqcirc: '≖',
    eqcolon: '≕',
    eqsim: '≂',
    eqslantgtr: '⪖',
    eqslantless: '⪕',
    equals: '=',
    equest: '≟',
    equiv: '≡',
    equivDD: '⩸',
    eqvparsl: '⧥',
    erDot: '≓',
    erarr: '⥱',
    escr: 'ℯ',
    esdot: '≐',
    esim: '≂',
    eta: 'η',
    eth: 'ð',
    euml: 'ë',
    euro: '€',
    excl: '!',
    exist: '∃',
    expectation: 'ℰ',
    exponentiale: 'ⅇ',
    fallingdotseq: '≒',
    fcy: 'ф',
    female: '♀',
    ffilig: 'ﬃ',
    fflig: 'ﬀ',
    ffllig: 'ﬄ',
    ffr: '𝔣',
    filig: 'ﬁ',
    fjlig: 'fj',
    flat: '♭',
    fllig: 'ﬂ',
    fltns: '▱',
    fnof: 'ƒ',
    fopf: '𝕗',
    forall: '∀',
    fork: '⋔',
    forkv: '⫙',
    fpartint: '⨍',
    frac12: '½',
    frac13: '⅓',
    frac14: '¼',
    frac15: '⅕',
    frac16: '⅙',
    frac18: '⅛',
    frac23: '⅔',
    frac25: '⅖',
    frac34: '¾',
    frac35: '⅗',
    frac38: '⅜',
    frac45: '⅘',
    frac56: '⅚',
    frac58: '⅝',
    frac78: '⅞',
    frasl: '⁄',
    frown: '⌢',
    fscr: '𝒻',
    gE: '≧',
    gEl: '⪌',
    gacute: 'ǵ',
    gamma: 'γ',
    gammad: 'ϝ',
    gap: '⪆',
    gbreve: 'ğ',
    gcirc: 'ĝ',
    gcy: 'г',
    gdot: 'ġ',
    ge: '≥',
    gel: '⋛',
    geq: '≥',
    geqq: '≧',
    geqslant: '⩾',
    ges: '⩾',
    gescc: '⪩',
    gesdot: '⪀',
    gesdoto: '⪂',
    gesdotol: '⪄',
    gesl: '⋛︀',
    gesles: '⪔',
    gfr: '𝔤',
    gg: '≫',
    ggg: '⋙',
    gimel: 'ℷ',
    gjcy: 'ѓ',
    gl: '≷',
    glE: '⪒',
    gla: '⪥',
    glj: '⪤',
    gnE: '≩',
    gnap: '⪊',
    gnapprox: '⪊',
    gne: '⪈',
    gneq: '⪈',
    gneqq: '≩',
    gnsim: '⋧',
    gopf: '𝕘',
    grave: '`',
    gscr: 'ℊ',
    gsim: '≳',
    gsime: '⪎',
    gsiml: '⪐',
    gt: '>',
    gtcc: '⪧',
    gtcir: '⩺',
    gtdot: '⋗',
    gtlPar: '⦕',
    gtquest: '⩼',
    gtrapprox: '⪆',
    gtrarr: '⥸',
    gtrdot: '⋗',
    gtreqless: '⋛',
    gtreqqless: '⪌',
    gtrless: '≷',
    gtrsim: '≳',
    gvertneqq: '≩︀',
    gvnE: '≩︀',
    hArr: '⇔',
    hairsp: ' ',
    half: '½',
    hamilt: 'ℋ',
    hardcy: 'ъ',
    harr: '↔',
    harrcir: '⥈',
    harrw: '↭',
    hbar: 'ℏ',
    hcirc: 'ĥ',
    hearts: '♥',
    heartsuit: '♥',
    hellip: '…',
    hercon: '⊹',
    hfr: '𝔥',
    hksearow: '⤥',
    hkswarow: '⤦',
    hoarr: '⇿',
    homtht: '∻',
    hookleftarrow: '↩',
    hookrightarrow: '↪',
    hopf: '𝕙',
    horbar: '―',
    hscr: '𝒽',
    hslash: 'ℏ',
    hstrok: 'ħ',
    hybull: '⁃',
    hyphen: '‐',
    iacute: 'í',
    ic: '⁣',
    icirc: 'î',
    icy: 'и',
    iecy: 'е',
    iexcl: '¡',
    iff: '⇔',
    ifr: '𝔦',
    igrave: 'ì',
    ii: 'ⅈ',
    iiiint: '⨌',
    iiint: '∭',
    iinfin: '⧜',
    iiota: '℩',
    ijlig: 'ĳ',
    imacr: 'ī',
    image: 'ℑ',
    imagline: 'ℐ',
    imagpart: 'ℑ',
    imath: 'ı',
    imof: '⊷',
    imped: 'Ƶ',
    in: '∈',
    incare: '℅',
    infin: '∞',
    infintie: '⧝',
    inodot: 'ı',
    int: '∫',
    intcal: '⊺',
    integers: 'ℤ',
    intercal: '⊺',
    intlarhk: '⨗',
    intprod: '⨼',
    iocy: 'ё',
    iogon: 'į',
    iopf: '𝕚',
    iota: 'ι',
    iprod: '⨼',
    iquest: '¿',
    iscr: '𝒾',
    isin: '∈',
    isinE: '⋹',
    isindot: '⋵',
    isins: '⋴',
    isinsv: '⋳',
    isinv: '∈',
    it: '⁢',
    itilde: 'ĩ',
    iukcy: 'і',
    iuml: 'ï',
    jcirc: 'ĵ',
    jcy: 'й',
    jfr: '𝔧',
    jmath: 'ȷ',
    jopf: '𝕛',
    jscr: '𝒿',
    jsercy: 'ј',
    jukcy: 'є',
    kappa: 'κ',
    kappav: 'ϰ',
    kcedil: 'ķ',
    kcy: 'к',
    kfr: '𝔨',
    kgreen: 'ĸ',
    khcy: 'х',
    kjcy: 'ќ',
    kopf: '𝕜',
    kscr: '𝓀',
    lAarr: '⇚',
    lArr: '⇐',
    lAtail: '⤛',
    lBarr: '⤎',
    lE: '≦',
    lEg: '⪋',
    lHar: '⥢',
    lacute: 'ĺ',
    laemptyv: '⦴',
    lagran: 'ℒ',
    lambda: 'λ',
    lang: '⟨',
    langd: '⦑',
    langle: '⟨',
    lap: '⪅',
    laquo: '«',
    larr: '←',
    larrb: '⇤',
    larrbfs: '⤟',
    larrfs: '⤝',
    larrhk: '↩',
    larrlp: '↫',
    larrpl: '⤹',
    larrsim: '⥳',
    larrtl: '↢',
    lat: '⪫',
    latail: '⤙',
    late: '⪭',
    lates: '⪭︀',
    lbarr: '⤌',
    lbbrk: '❲',
    lbrace: '{',
    lbrack: '[',
    lbrke: '⦋',
    lbrksld: '⦏',
    lbrkslu: '⦍',
    lcaron: 'ľ',
    lcedil: 'ļ',
    lceil: '⌈',
    lcub: '{',
    lcy: 'л',
    ldca: '⤶',
    ldquo: '“',
    ldquor: '„',
    ldrdhar: '⥧',
    ldrushar: '⥋',
    ldsh: '↲',
    le: '≤',
    leftarrow: '←',
    leftarrowtail: '↢',
    leftharpoondown: '↽',
    leftharpoonup: '↼',
    leftleftarrows: '⇇',
    leftrightarrow: '↔',
    leftrightarrows: '⇆',
    leftrightharpoons: '⇋',
    leftrightsquigarrow: '↭',
    leftthreetimes: '⋋',
    leg: '⋚',
    leq: '≤',
    leqq: '≦',
    leqslant: '⩽',
    les: '⩽',
    lescc: '⪨',
    lesdot: '⩿',
    lesdoto: '⪁',
    lesdotor: '⪃',
    lesg: '⋚︀',
    lesges: '⪓',
    lessapprox: '⪅',
    lessdot: '⋖',
    lesseqgtr: '⋚',
    lesseqqgtr: '⪋',
    lessgtr: '≶',
    lesssim: '≲',
    lfisht: '⥼',
    lfloor: '⌊',
    lfr: '𝔩',
    lg: '≶',
    lgE: '⪑',
    lhard: '↽',
    lharu: '↼',
    lharul: '⥪',
    lhblk: '▄',
    ljcy: 'љ',
    ll: '≪',
    llarr: '⇇',
    llcorner: '⌞',
    llhard: '⥫',
    lltri: '◺',
    lmidot: 'ŀ',
    lmoust: '⎰',
    lmoustache: '⎰',
    lnE: '≨',
    lnap: '⪉',
    lnapprox: '⪉',
    lne: '⪇',
    lneq: '⪇',
    lneqq: '≨',
    lnsim: '⋦',
    loang: '⟬',
    loarr: '⇽',
    lobrk: '⟦',
    longleftarrow: '⟵',
    longleftrightarrow: '⟷',
    longmapsto: '⟼',
    longrightarrow: '⟶',
    looparrowleft: '↫',
    looparrowright: '↬',
    lopar: '⦅',
    lopf: '𝕝',
    loplus: '⨭',
    lotimes: '⨴',
    lowast: '∗',
    lowbar: '_',
    loz: '◊',
    lozenge: '◊',
    lozf: '⧫',
    lpar: '(',
    lparlt: '⦓',
    lrarr: '⇆',
    lrcorner: '⌟',
    lrhar: '⇋',
    lrhard: '⥭',
    lrm: '‎',
    lrtri: '⊿',
    lsaquo: '‹',
    lscr: '𝓁',
    lsh: '↰',
    lsim: '≲',
    lsime: '⪍',
    lsimg: '⪏',
    lsqb: '[',
    lsquo: '‘',
    lsquor: '‚',
    lstrok: 'ł',
    lt: '<',
    ltcc: '⪦',
    ltcir: '⩹',
    ltdot: '⋖',
    lthree: '⋋',
    ltimes: '⋉',
    ltlarr: '⥶',
    ltquest: '⩻',
    ltrPar: '⦖',
    ltri: '◃',
    ltrie: '⊴',
    ltrif: '◂',
    lurdshar: '⥊',
    luruhar: '⥦',
    lvertneqq: '≨︀',
    lvnE: '≨︀',
    mDDot: '∺',
    macr: '¯',
    male: '♂',
    malt: '✠',
    maltese: '✠',
    map: '↦',
    mapsto: '↦',
    mapstodown: '↧',
    mapstoleft: '↤',
    mapstoup: '↥',
    marker: '▮',
    mcomma: '⨩',
    mcy: 'м',
    mdash: '—',
    measuredangle: '∡',
    mfr: '𝔪',
    mho: '℧',
    micro: 'µ',
    mid: '∣',
    midast: '*',
    midcir: '⫰',
    middot: '·',
    minus: '−',
    minusb: '⊟',
    minusd: '∸',
    minusdu: '⨪',
    mlcp: '⫛',
    mldr: '…',
    mnplus: '∓',
    models: '⊧',
    mopf: '𝕞',
    mp: '∓',
    mscr: '𝓂',
    mstpos: '∾',
    mu: 'μ',
    multimap: '⊸',
    mumap: '⊸',
    nGg: '⋙̸',
    nGt: '≫⃒',
    nGtv: '≫̸',
    nLeftarrow: '⇍',
    nLeftrightarrow: '⇎',
    nLl: '⋘̸',
    nLt: '≪⃒',
    nLtv: '≪̸',
    nRightarrow: '⇏',
    nVDash: '⊯',
    nVdash: '⊮',
    nabla: '∇',
    nacute: 'ń',
    nang: '∠⃒',
    nap: '≉',
    napE: '⩰̸',
    napid: '≋̸',
    napos: 'ŉ',
    napprox: '≉',
    natur: '♮',
    natural: '♮',
    naturals: 'ℕ',
    nbsp: ' ',
    nbump: '≎̸',
    nbumpe: '≏̸',
    ncap: '⩃',
    ncaron: 'ň',
    ncedil: 'ņ',
    ncong: '≇',
    ncongdot: '⩭̸',
    ncup: '⩂',
    ncy: 'н',
    ndash: '–',
    ne: '≠',
    neArr: '⇗',
    nearhk: '⤤',
    nearr: '↗',
    nearrow: '↗',
    nedot: '≐̸',
    nequiv: '≢',
    nesear: '⤨',
    nesim: '≂̸',
    nexist: '∄',
    nexists: '∄',
    nfr: '𝔫',
    ngE: '≧̸',
    nge: '≱',
    ngeq: '≱',
    ngeqq: '≧̸',
    ngeqslant: '⩾̸',
    nges: '⩾̸',
    ngsim: '≵',
    ngt: '≯',
    ngtr: '≯',
    nhArr: '⇎',
    nharr: '↮',
    nhpar: '⫲',
    ni: '∋',
    nis: '⋼',
    nisd: '⋺',
    niv: '∋',
    njcy: 'њ',
    nlArr: '⇍',
    nlE: '≦̸',
    nlarr: '↚',
    nldr: '‥',
    nle: '≰',
    nleftarrow: '↚',
    nleftrightarrow: '↮',
    nleq: '≰',
    nleqq: '≦̸',
    nleqslant: '⩽̸',
    nles: '⩽̸',
    nless: '≮',
    nlsim: '≴',
    nlt: '≮',
    nltri: '⋪',
    nltrie: '⋬',
    nmid: '∤',
    nopf: '𝕟',
    not: '¬',
    notin: '∉',
    notinE: '⋹̸',
    notindot: '⋵̸',
    notinva: '∉',
    notinvb: '⋷',
    notinvc: '⋶',
    notni: '∌',
    notniva: '∌',
    notnivb: '⋾',
    notnivc: '⋽',
    npar: '∦',
    nparallel: '∦',
    nparsl: '⫽⃥',
    npart: '∂̸',
    npolint: '⨔',
    npr: '⊀',
    nprcue: '⋠',
    npre: '⪯̸',
    nprec: '⊀',
    npreceq: '⪯̸',
    nrArr: '⇏',
    nrarr: '↛',
    nrarrc: '⤳̸',
    nrarrw: '↝̸',
    nrightarrow: '↛',
    nrtri: '⋫',
    nrtrie: '⋭',
    nsc: '⊁',
    nsccue: '⋡',
    nsce: '⪰̸',
    nscr: '𝓃',
    nshortmid: '∤',
    nshortparallel: '∦',
    nsim: '≁',
    nsime: '≄',
    nsimeq: '≄',
    nsmid: '∤',
    nspar: '∦',
    nsqsube: '⋢',
    nsqsupe: '⋣',
    nsub: '⊄',
    nsubE: '⫅̸',
    nsube: '⊈',
    nsubset: '⊂⃒',
    nsubseteq: '⊈',
    nsubseteqq: '⫅̸',
    nsucc: '⊁',
    nsucceq: '⪰̸',
    nsup: '⊅',
    nsupE: '⫆̸',
    nsupe: '⊉',
    nsupset: '⊃⃒',
    nsupseteq: '⊉',
    nsupseteqq: '⫆̸',
    ntgl: '≹',
    ntilde: 'ñ',
    ntlg: '≸',
    ntriangleleft: '⋪',
    ntrianglelefteq: '⋬',
    ntriangleright: '⋫',
    ntrianglerighteq: '⋭',
    nu: 'ν',
    num: '#',
    numero: '№',
    numsp: ' ',
    nvDash: '⊭',
    nvHarr: '⤄',
    nvap: '≍⃒',
    nvdash: '⊬',
    nvge: '≥⃒',
    nvgt: '>⃒',
    nvinfin: '⧞',
    nvlArr: '⤂',
    nvle: '≤⃒',
    nvlt: '<⃒',
    nvltrie: '⊴⃒',
    nvrArr: '⤃',
    nvrtrie: '⊵⃒',
    nvsim: '∼⃒',
    nwArr: '⇖',
    nwarhk: '⤣',
    nwarr: '↖',
    nwarrow: '↖',
    nwnear: '⤧',
    oS: 'Ⓢ',
    oacute: 'ó',
    oast: '⊛',
    ocir: '⊚',
    ocirc: 'ô',
    ocy: 'о',
    odash: '⊝',
    odblac: 'ő',
    odiv: '⨸',
    odot: '⊙',
    odsold: '⦼',
    oelig: 'œ',
    ofcir: '⦿',
    ofr: '𝔬',
    ogon: '˛',
    ograve: 'ò',
    ogt: '⧁',
    ohbar: '⦵',
    ohm: 'Ω',
    oint: '∮',
    olarr: '↺',
    olcir: '⦾',
    olcross: '⦻',
    oline: '‾',
    olt: '⧀',
    omacr: 'ō',
    omega: 'ω',
    omicron: 'ο',
    omid: '⦶',
    ominus: '⊖',
    oopf: '𝕠',
    opar: '⦷',
    operp: '⦹',
    oplus: '⊕',
    or: '∨',
    orarr: '↻',
    ord: '⩝',
    order: 'ℴ',
    orderof: 'ℴ',
    ordf: 'ª',
    ordm: 'º',
    origof: '⊶',
    oror: '⩖',
    orslope: '⩗',
    orv: '⩛',
    oscr: 'ℴ',
    oslash: 'ø',
    osol: '⊘',
    otilde: 'õ',
    otimes: '⊗',
    otimesas: '⨶',
    ouml: 'ö',
    ovbar: '⌽',
    par: '∥',
    para: '¶',
    parallel: '∥',
    parsim: '⫳',
    parsl: '⫽',
    part: '∂',
    pcy: 'п',
    percnt: '%',
    period: '.',
    permil: '‰',
    perp: '⊥',
    pertenk: '‱',
    pfr: '𝔭',
    phi: 'φ',
    phiv: 'ϕ',
    phmmat: 'ℳ',
    phone: '☎',
    pi: 'π',
    pitchfork: '⋔',
    piv: 'ϖ',
    planck: 'ℏ',
    planckh: 'ℎ',
    plankv: 'ℏ',
    plus: '+',
    plusacir: '⨣',
    plusb: '⊞',
    pluscir: '⨢',
    plusdo: '∔',
    plusdu: '⨥',
    pluse: '⩲',
    plusmn: '±',
    plussim: '⨦',
    plustwo: '⨧',
    pm: '±',
    pointint: '⨕',
    popf: '𝕡',
    pound: '£',
    pr: '≺',
    prE: '⪳',
    prap: '⪷',
    prcue: '≼',
    pre: '⪯',
    prec: '≺',
    precapprox: '⪷',
    preccurlyeq: '≼',
    preceq: '⪯',
    precnapprox: '⪹',
    precneqq: '⪵',
    precnsim: '⋨',
    precsim: '≾',
    prime: '′',
    primes: 'ℙ',
    prnE: '⪵',
    prnap: '⪹',
    prnsim: '⋨',
    prod: '∏',
    profalar: '⌮',
    profline: '⌒',
    profsurf: '⌓',
    prop: '∝',
    propto: '∝',
    prsim: '≾',
    prurel: '⊰',
    pscr: '𝓅',
    psi: 'ψ',
    puncsp: ' ',
    qfr: '𝔮',
    qint: '⨌',
    qopf: '𝕢',
    qprime: '⁗',
    qscr: '𝓆',
    quaternions: 'ℍ',
    quatint: '⨖',
    quest: '?',
    questeq: '≟',
    quot: '"',
    rAarr: '⇛',
    rArr: '⇒',
    rAtail: '⤜',
    rBarr: '⤏',
    rHar: '⥤',
    race: '∽̱',
    racute: 'ŕ',
    radic: '√',
    raemptyv: '⦳',
    rang: '⟩',
    rangd: '⦒',
    range: '⦥',
    rangle: '⟩',
    raquo: '»',
    rarr: '→',
    rarrap: '⥵',
    rarrb: '⇥',
    rarrbfs: '⤠',
    rarrc: '⤳',
    rarrfs: '⤞',
    rarrhk: '↪',
    rarrlp: '↬',
    rarrpl: '⥅',
    rarrsim: '⥴',
    rarrtl: '↣',
    rarrw: '↝',
    ratail: '⤚',
    ratio: '∶',
    rationals: 'ℚ',
    rbarr: '⤍',
    rbbrk: '❳',
    rbrace: '}',
    rbrack: ']',
    rbrke: '⦌',
    rbrksld: '⦎',
    rbrkslu: '⦐',
    rcaron: 'ř',
    rcedil: 'ŗ',
    rceil: '⌉',
    rcub: '}',
    rcy: 'р',
    rdca: '⤷',
    rdldhar: '⥩',
    rdquo: '”',
    rdquor: '”',
    rdsh: '↳',
    real: 'ℜ',
    realine: 'ℛ',
    realpart: 'ℜ',
    reals: 'ℝ',
    rect: '▭',
    reg: '®',
    rfisht: '⥽',
    rfloor: '⌋',
    rfr: '𝔯',
    rhard: '⇁',
    rharu: '⇀',
    rharul: '⥬',
    rho: 'ρ',
    rhov: 'ϱ',
    rightarrow: '→',
    rightarrowtail: '↣',
    rightharpoondown: '⇁',
    rightharpoonup: '⇀',
    rightleftarrows: '⇄',
    rightleftharpoons: '⇌',
    rightrightarrows: '⇉',
    rightsquigarrow: '↝',
    rightthreetimes: '⋌',
    ring: '˚',
    risingdotseq: '≓',
    rlarr: '⇄',
    rlhar: '⇌',
    rlm: '‏',
    rmoust: '⎱',
    rmoustache: '⎱',
    rnmid: '⫮',
    roang: '⟭',
    roarr: '⇾',
    robrk: '⟧',
    ropar: '⦆',
    ropf: '𝕣',
    roplus: '⨮',
    rotimes: '⨵',
    rpar: ')',
    rpargt: '⦔',
    rppolint: '⨒',
    rrarr: '⇉',
    rsaquo: '›',
    rscr: '𝓇',
    rsh: '↱',
    rsqb: ']',
    rsquo: '’',
    rsquor: '’',
    rthree: '⋌',
    rtimes: '⋊',
    rtri: '▹',
    rtrie: '⊵',
    rtrif: '▸',
    rtriltri: '⧎',
    ruluhar: '⥨',
    rx: '℞',
    sacute: 'ś',
    sbquo: '‚',
    sc: '≻',
    scE: '⪴',
    scap: '⪸',
    scaron: 'š',
    sccue: '≽',
    sce: '⪰',
    scedil: 'ş',
    scirc: 'ŝ',
    scnE: '⪶',
    scnap: '⪺',
    scnsim: '⋩',
    scpolint: '⨓',
    scsim: '≿',
    scy: 'с',
    sdot: '⋅',
    sdotb: '⊡',
    sdote: '⩦',
    seArr: '⇘',
    searhk: '⤥',
    searr: '↘',
    searrow: '↘',
    sect: '§',
    semi: ';',
    seswar: '⤩',
    setminus: '∖',
    setmn: '∖',
    sext: '✶',
    sfr: '𝔰',
    sfrown: '⌢',
    sharp: '♯',
    shchcy: 'щ',
    shcy: 'ш',
    shortmid: '∣',
    shortparallel: '∥',
    shy: '­',
    sigma: 'σ',
    sigmaf: 'ς',
    sigmav: 'ς',
    sim: '∼',
    simdot: '⩪',
    sime: '≃',
    simeq: '≃',
    simg: '⪞',
    simgE: '⪠',
    siml: '⪝',
    simlE: '⪟',
    simne: '≆',
    simplus: '⨤',
    simrarr: '⥲',
    slarr: '←',
    smallsetminus: '∖',
    smashp: '⨳',
    smeparsl: '⧤',
    smid: '∣',
    smile: '⌣',
    smt: '⪪',
    smte: '⪬',
    smtes: '⪬︀',
    softcy: 'ь',
    sol: '/',
    solb: '⧄',
    solbar: '⌿',
    sopf: '𝕤',
    spades: '♠',
    spadesuit: '♠',
    spar: '∥',
    sqcap: '⊓',
    sqcaps: '⊓︀',
    sqcup: '⊔',
    sqcups: '⊔︀',
    sqsub: '⊏',
    sqsube: '⊑',
    sqsubset: '⊏',
    sqsubseteq: '⊑',
    sqsup: '⊐',
    sqsupe: '⊒',
    sqsupset: '⊐',
    sqsupseteq: '⊒',
    squ: '□',
    square: '□',
    squarf: '▪',
    squf: '▪',
    srarr: '→',
    sscr: '𝓈',
    ssetmn: '∖',
    ssmile: '⌣',
    sstarf: '⋆',
    star: '☆',
    starf: '★',
    straightepsilon: 'ϵ',
    straightphi: 'ϕ',
    strns: '¯',
    sub: '⊂',
    subE: '⫅',
    subdot: '⪽',
    sube: '⊆',
    subedot: '⫃',
    submult: '⫁',
    subnE: '⫋',
    subne: '⊊',
    subplus: '⪿',
    subrarr: '⥹',
    subset: '⊂',
    subseteq: '⊆',
    subseteqq: '⫅',
    subsetneq: '⊊',
    subsetneqq: '⫋',
    subsim: '⫇',
    subsub: '⫕',
    subsup: '⫓',
    succ: '≻',
    succapprox: '⪸',
    succcurlyeq: '≽',
    succeq: '⪰',
    succnapprox: '⪺',
    succneqq: '⪶',
    succnsim: '⋩',
    succsim: '≿',
    sum: '∑',
    sung: '♪',
    sup1: '¹',
    sup2: '²',
    sup3: '³',
    sup: '⊃',
    supE: '⫆',
    supdot: '⪾',
    supdsub: '⫘',
    supe: '⊇',
    supedot: '⫄',
    suphsol: '⟉',
    suphsub: '⫗',
    suplarr: '⥻',
    supmult: '⫂',
    supnE: '⫌',
    supne: '⊋',
    supplus: '⫀',
    supset: '⊃',
    supseteq: '⊇',
    supseteqq: '⫆',
    supsetneq: '⊋',
    supsetneqq: '⫌',
    supsim: '⫈',
    supsub: '⫔',
    supsup: '⫖',
    swArr: '⇙',
    swarhk: '⤦',
    swarr: '↙',
    swarrow: '↙',
    swnwar: '⤪',
    szlig: 'ß',
    target: '⌖',
    tau: 'τ',
    tbrk: '⎴',
    tcaron: 'ť',
    tcedil: 'ţ',
    tcy: 'т',
    tdot: '⃛',
    telrec: '⌕',
    tfr: '𝔱',
    there4: '∴',
    therefore: '∴',
    theta: 'θ',
    thetasym: 'ϑ',
    thetav: 'ϑ',
    thickapprox: '≈',
    thicksim: '∼',
    thinsp: ' ',
    thkap: '≈',
    thksim: '∼',
    thorn: 'þ',
    tilde: '˜',
    times: '×',
    timesb: '⊠',
    timesbar: '⨱',
    timesd: '⨰',
    tint: '∭',
    toea: '⤨',
    top: '⊤',
    topbot: '⌶',
    topcir: '⫱',
    topf: '𝕥',
    topfork: '⫚',
    tosa: '⤩',
    tprime: '‴',
    trade: '™',
    triangle: '▵',
    triangledown: '▿',
    triangleleft: '◃',
    trianglelefteq: '⊴',
    triangleq: '≜',
    triangleright: '▹',
    trianglerighteq: '⊵',
    tridot: '◬',
    trie: '≜',
    triminus: '⨺',
    triplus: '⨹',
    trisb: '⧍',
    tritime: '⨻',
    trpezium: '⏢',
    tscr: '𝓉',
    tscy: 'ц',
    tshcy: 'ћ',
    tstrok: 'ŧ',
    twixt: '≬',
    twoheadleftarrow: '↞',
    twoheadrightarrow: '↠',
    uArr: '⇑',
    uHar: '⥣',
    uacute: 'ú',
    uarr: '↑',
    ubrcy: 'ў',
    ubreve: 'ŭ',
    ucirc: 'û',
    ucy: 'у',
    udarr: '⇅',
    udblac: 'ű',
    udhar: '⥮',
    ufisht: '⥾',
    ufr: '𝔲',
    ugrave: 'ù',
    uharl: '↿',
    uharr: '↾',
    uhblk: '▀',
    ulcorn: '⌜',
    ulcorner: '⌜',
    ulcrop: '⌏',
    ultri: '◸',
    umacr: 'ū',
    uml: '¨',
    uogon: 'ų',
    uopf: '𝕦',
    uparrow: '↑',
    updownarrow: '↕',
    upharpoonleft: '↿',
    upharpoonright: '↾',
    uplus: '⊎',
    upsi: 'υ',
    upsih: 'ϒ',
    upsilon: 'υ',
    upuparrows: '⇈',
    urcorn: '⌝',
    urcorner: '⌝',
    urcrop: '⌎',
    uring: 'ů',
    urtri: '◹',
    uscr: '𝓊',
    utdot: '⋰',
    utilde: 'ũ',
    utri: '▵',
    utrif: '▴',
    uuarr: '⇈',
    uuml: 'ü',
    uwangle: '⦧',
    vArr: '⇕',
    vBar: '⫨',
    vBarv: '⫩',
    vDash: '⊨',
    vangrt: '⦜',
    varepsilon: 'ϵ',
    varkappa: 'ϰ',
    varnothing: '∅',
    varphi: 'ϕ',
    varpi: 'ϖ',
    varpropto: '∝',
    varr: '↕',
    varrho: 'ϱ',
    varsigma: 'ς',
    varsubsetneq: '⊊︀',
    varsubsetneqq: '⫋︀',
    varsupsetneq: '⊋︀',
    varsupsetneqq: '⫌︀',
    vartheta: 'ϑ',
    vartriangleleft: '⊲',
    vartriangleright: '⊳',
    vcy: 'в',
    vdash: '⊢',
    vee: '∨',
    veebar: '⊻',
    veeeq: '≚',
    vellip: '⋮',
    verbar: '|',
    vert: '|',
    vfr: '𝔳',
    vltri: '⊲',
    vnsub: '⊂⃒',
    vnsup: '⊃⃒',
    vopf: '𝕧',
    vprop: '∝',
    vrtri: '⊳',
    vscr: '𝓋',
    vsubnE: '⫋︀',
    vsubne: '⊊︀',
    vsupnE: '⫌︀',
    vsupne: '⊋︀',
    vzigzag: '⦚',
    wcirc: 'ŵ',
    wedbar: '⩟',
    wedge: '∧',
    wedgeq: '≙',
    weierp: '℘',
    wfr: '𝔴',
    wopf: '𝕨',
    wp: '℘',
    wr: '≀',
    wreath: '≀',
    wscr: '𝓌',
    xcap: '⋂',
    xcirc: '◯',
    xcup: '⋃',
    xdtri: '▽',
    xfr: '𝔵',
    xhArr: '⟺',
    xharr: '⟷',
    xi: 'ξ',
    xlArr: '⟸',
    xlarr: '⟵',
    xmap: '⟼',
    xnis: '⋻',
    xodot: '⨀',
    xopf: '𝕩',
    xoplus: '⨁',
    xotime: '⨂',
    xrArr: '⟹',
    xrarr: '⟶',
    xscr: '𝓍',
    xsqcup: '⨆',
    xuplus: '⨄',
    xutri: '△',
    xvee: '⋁',
    xwedge: '⋀',
    yacute: 'ý',
    yacy: 'я',
    ycirc: 'ŷ',
    ycy: 'ы',
    yen: '¥',
    yfr: '𝔶',
    yicy: 'ї',
    yopf: '𝕪',
    yscr: '𝓎',
    yucy: 'ю',
    yuml: 'ÿ',
    zacute: 'ź',
    zcaron: 'ž',
    zcy: 'з',
    zdot: 'ż',
    zeetrf: 'ℨ',
    zeta: 'ζ',
    zfr: '𝔷',
    zhcy: 'ж',
    zigrarr: '⇝',
    zopf: '𝕫',
    zscr: '𝓏',
    zwj: '‍',
    zwnj: '‌'
  };

  // To do: next major: use `Object.hasOwn`.
  const own$5 = {}.hasOwnProperty;

  /**
   * Decode a single character reference (without the `&` or `;`).
   * You probably only need this when you’re building parsers yourself that follow
   * different rules compared to HTML.
   * This is optimized to be tiny in browsers.
   *
   * @param {string} value
   *   `notin` (named), `#123` (deci), `#x123` (hexa).
   * @returns {string|false}
   *   Decoded reference.
   */
  function decodeNamedCharacterReference(value) {
    return own$5.call(characterEntities, value) ? characterEntities[value] : false
  }

  /**
   * Like `Array#splice`, but smarter for giant arrays.
   *
   * `Array#splice` takes all items to be inserted as individual argument which
   * causes a stack overflow in V8 when trying to insert 100k items for instance.
   *
   * Otherwise, this does not return the removed items, and takes `items` as an
   * array instead of rest parameters.
   *
   * @template {unknown} T
   *   Item type.
   * @param {Array<T>} list
   *   List to operate on.
   * @param {number} start
   *   Index to remove/insert at (can be negative).
   * @param {number} remove
   *   Number of items to remove.
   * @param {Array<T>} items
   *   Items to inject into `list`.
   * @returns {undefined}
   *   Nothing.
   */
  function splice(list, start, remove, items) {
    const end = list.length;
    let chunkStart = 0;
    /** @type {Array<unknown>} */
    let parameters;

    // Make start between zero and `end` (included).
    if (start < 0) {
      start = -start > end ? 0 : end + start;
    } else {
      start = start > end ? end : start;
    }
    remove = remove > 0 ? remove : 0;

    // No need to chunk the items if there’s only a couple (10k) items.
    if (items.length < 10000) {
      parameters = Array.from(items);
      parameters.unshift(start, remove);
      // @ts-expect-error Hush, it’s fine.
      list.splice(...parameters);
    } else {
      // Delete `remove` items starting from `start`
      if (remove) list.splice(start, remove);

      // Insert the items in chunks to not cause stack overflows.
      while (chunkStart < items.length) {
        parameters = items.slice(chunkStart, chunkStart + 10000);
        parameters.unshift(start, 0);
        // @ts-expect-error Hush, it’s fine.
        list.splice(...parameters);
        chunkStart += 10000;
        start += 10000;
      }
    }
  }

  /**
   * Append `items` (an array) at the end of `list` (another array).
   * When `list` was empty, returns `items` instead.
   *
   * This prevents a potentially expensive operation when `list` is empty,
   * and adds items in batches to prevent V8 from hanging.
   *
   * @template {unknown} T
   *   Item type.
   * @param {Array<T>} list
   *   List to operate on.
   * @param {Array<T>} items
   *   Items to add to `list`.
   * @returns {Array<T>}
   *   Either `list` or `items`.
   */
  function push(list, items) {
    if (list.length > 0) {
      splice(list, list.length, 0, items);
      return list;
    }
    return items;
  }

  /**
   * @import {
   *   Extension,
   *   Handles,
   *   HtmlExtension,
   *   NormalizedExtension
   * } from 'micromark-util-types'
   */


  const hasOwnProperty = {}.hasOwnProperty;

  /**
   * Combine multiple syntax extensions into one.
   *
   * @param {ReadonlyArray<Extension>} extensions
   *   List of syntax extensions.
   * @returns {NormalizedExtension}
   *   A single combined extension.
   */
  function combineExtensions(extensions) {
    /** @type {NormalizedExtension} */
    const all = {};
    let index = -1;

    while (++index < extensions.length) {
      syntaxExtension(all, extensions[index]);
    }

    return all
  }

  /**
   * Merge `extension` into `all`.
   *
   * @param {NormalizedExtension} all
   *   Extension to merge into.
   * @param {Extension} extension
   *   Extension to merge.
   * @returns {undefined}
   *   Nothing.
   */
  function syntaxExtension(all, extension) {
    /** @type {keyof Extension} */
    let hook;

    for (hook in extension) {
      const maybe = hasOwnProperty.call(all, hook) ? all[hook] : undefined;
      /** @type {Record<string, unknown>} */
      const left = maybe || (all[hook] = {});
      /** @type {Record<string, unknown> | undefined} */
      const right = extension[hook];
      /** @type {string} */
      let code;

      if (right) {
        for (code in right) {
          if (!hasOwnProperty.call(left, code)) left[code] = [];
          const value = right[code];
          constructs(
            // @ts-expect-error Looks like a list.
            left[code],
            Array.isArray(value) ? value : value ? [value] : []
          );
        }
      }
    }
  }

  /**
   * Merge `list` into `existing` (both lists of constructs).
   * Mutates `existing`.
   *
   * @param {Array<unknown>} existing
   *   List of constructs to merge into.
   * @param {Array<unknown>} list
   *   List of constructs to merge.
   * @returns {undefined}
   *   Nothing.
   */
  function constructs(existing, list) {
    let index = -1;
    /** @type {Array<unknown>} */
    const before = [];

    while (++index < list.length) {
  (list[index].add === 'after' ? existing : before).push(list[index]);
    }

    splice(existing, 0, 0, before);
  }

  /**
   * Turn the number (in string form as either hexa- or plain decimal) coming from
   * a numeric character reference into a character.
   *
   * Sort of like `String.fromCodePoint(Number.parseInt(value, base))`, but makes
   * non-characters and control characters safe.
   *
   * @param {string} value
   *   Value to decode.
   * @param {number} base
   *   Numeric base.
   * @returns {string}
   *   Character.
   */
  function decodeNumericCharacterReference(value, base) {
    const code = Number.parseInt(value, base);
    if (
    // C0 except for HT, LF, FF, CR, space.
    code < 9 || code === 11 || code > 13 && code < 32 ||
    // Control character (DEL) of C0, and C1 controls.
    code > 126 && code < 160 ||
    // Lone high surrogates and low surrogates.
    code > 55_295 && code < 57_344 ||
    // Noncharacters.
    code > 64_975 && code < 65_008 || /* eslint-disable no-bitwise */
    (code & 65_535) === 65_535 || (code & 65_535) === 65_534 || /* eslint-enable no-bitwise */
    // Out of range
    code > 1_114_111) {
      return "\uFFFD";
    }
    return String.fromCodePoint(code);
  }

  /**
   * Normalize an identifier (as found in references, definitions).
   *
   * Collapses markdown whitespace, trim, and then lower- and uppercase.
   *
   * Some characters are considered “uppercase”, such as U+03F4 (`ϴ`), but if their
   * lowercase counterpart (U+03B8 (`θ`)) is uppercased will result in a different
   * uppercase character (U+0398 (`Θ`)).
   * So, to get a canonical form, we perform both lower- and uppercase.
   *
   * Using uppercase last makes sure keys will never interact with default
   * prototypal values (such as `constructor`): nothing in the prototype of
   * `Object` is uppercase.
   *
   * @param {string} value
   *   Identifier to normalize.
   * @returns {string}
   *   Normalized identifier.
   */
  function normalizeIdentifier(value) {
    return value
    // Collapse markdown whitespace.
    .replace(/[\t\n\r ]+/g, " ")
    // Trim.
    .replace(/^ | $/g, '')
    // Some characters are considered “uppercase”, but if their lowercase
    // counterpart is uppercased will result in a different uppercase
    // character.
    // Hence, to get that form, we perform both lower- and uppercase.
    // Upper case makes sure keys will not interact with default prototypal
    // methods: no method is uppercase.
    .toLowerCase().toUpperCase();
  }

  /**
   * @import {Code} from 'micromark-util-types'
   */

  /**
   * Check whether the character code represents an ASCII alpha (`a` through `z`,
   * case insensitive).
   *
   * An **ASCII alpha** is an ASCII upper alpha or ASCII lower alpha.
   *
   * An **ASCII upper alpha** is a character in the inclusive range U+0041 (`A`)
   * to U+005A (`Z`).
   *
   * An **ASCII lower alpha** is a character in the inclusive range U+0061 (`a`)
   * to U+007A (`z`).
   *
   * @param code
   *   Code.
   * @returns {boolean}
   *   Whether it matches.
   */
  const asciiAlpha = regexCheck(/[A-Za-z]/);

  /**
   * Check whether the character code represents an ASCII alphanumeric (`a`
   * through `z`, case insensitive, or `0` through `9`).
   *
   * An **ASCII alphanumeric** is an ASCII digit (see `asciiDigit`) or ASCII alpha
   * (see `asciiAlpha`).
   *
   * @param code
   *   Code.
   * @returns {boolean}
   *   Whether it matches.
   */
  const asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);

  /**
   * Check whether the character code represents an ASCII atext.
   *
   * atext is an ASCII alphanumeric (see `asciiAlphanumeric`), or a character in
   * the inclusive ranges U+0023 NUMBER SIGN (`#`) to U+0027 APOSTROPHE (`'`),
   * U+002A ASTERISK (`*`), U+002B PLUS SIGN (`+`), U+002D DASH (`-`), U+002F
   * SLASH (`/`), U+003D EQUALS TO (`=`), U+003F QUESTION MARK (`?`), U+005E
   * CARET (`^`) to U+0060 GRAVE ACCENT (`` ` ``), or U+007B LEFT CURLY BRACE
   * (`{`) to U+007E TILDE (`~`).
   *
   * See:
   * **\[RFC5322]**:
   * [Internet Message Format](https://tools.ietf.org/html/rfc5322).
   * P. Resnick.
   * IETF.
   *
   * @param code
   *   Code.
   * @returns {boolean}
   *   Whether it matches.
   */
  const asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);

  /**
   * Check whether a character code is an ASCII control character.
   *
   * An **ASCII control** is a character in the inclusive range U+0000 NULL (NUL)
   * to U+001F (US), or U+007F (DEL).
   *
   * @param {Code} code
   *   Code.
   * @returns {boolean}
   *   Whether it matches.
   */
  function asciiControl(code) {
    return (
      // Special whitespace codes (which have negative values), C0 and Control
      // character DEL
      code !== null && (code < 32 || code === 127)
    );
  }

  /**
   * Check whether the character code represents an ASCII digit (`0` through `9`).
   *
   * An **ASCII digit** is a character in the inclusive range U+0030 (`0`) to
   * U+0039 (`9`).
   *
   * @param code
   *   Code.
   * @returns {boolean}
   *   Whether it matches.
   */
  const asciiDigit = regexCheck(/\d/);

  /**
   * Check whether the character code represents an ASCII hex digit (`a` through
   * `f`, case insensitive, or `0` through `9`).
   *
   * An **ASCII hex digit** is an ASCII digit (see `asciiDigit`), ASCII upper hex
   * digit, or an ASCII lower hex digit.
   *
   * An **ASCII upper hex digit** is a character in the inclusive range U+0041
   * (`A`) to U+0046 (`F`).
   *
   * An **ASCII lower hex digit** is a character in the inclusive range U+0061
   * (`a`) to U+0066 (`f`).
   *
   * @param code
   *   Code.
   * @returns {boolean}
   *   Whether it matches.
   */
  const asciiHexDigit = regexCheck(/[\dA-Fa-f]/);

  /**
   * Check whether the character code represents ASCII punctuation.
   *
   * An **ASCII punctuation** is a character in the inclusive ranges U+0021
   * EXCLAMATION MARK (`!`) to U+002F SLASH (`/`), U+003A COLON (`:`) to U+0040 AT
   * SIGN (`@`), U+005B LEFT SQUARE BRACKET (`[`) to U+0060 GRAVE ACCENT
   * (`` ` ``), or U+007B LEFT CURLY BRACE (`{`) to U+007E TILDE (`~`).
   *
   * @param code
   *   Code.
   * @returns {boolean}
   *   Whether it matches.
   */
  const asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);

  /**
   * Check whether a character code is a markdown line ending.
   *
   * A **markdown line ending** is the virtual characters M-0003 CARRIAGE RETURN
   * LINE FEED (CRLF), M-0004 LINE FEED (LF) and M-0005 CARRIAGE RETURN (CR).
   *
   * In micromark, the actual character U+000A LINE FEED (LF) and U+000D CARRIAGE
   * RETURN (CR) are replaced by these virtual characters depending on whether
   * they occurred together.
   *
   * @param {Code} code
   *   Code.
   * @returns {boolean}
   *   Whether it matches.
   */
  function markdownLineEnding(code) {
    return code !== null && code < -2;
  }

  /**
   * Check whether a character code is a markdown line ending (see
   * `markdownLineEnding`) or markdown space (see `markdownSpace`).
   *
   * @param {Code} code
   *   Code.
   * @returns {boolean}
   *   Whether it matches.
   */
  function markdownLineEndingOrSpace(code) {
    return code !== null && (code < 0 || code === 32);
  }

  /**
   * Check whether a character code is a markdown space.
   *
   * A **markdown space** is the concrete character U+0020 SPACE (SP) and the
   * virtual characters M-0001 VIRTUAL SPACE (VS) and M-0002 HORIZONTAL TAB (HT).
   *
   * In micromark, the actual character U+0009 CHARACTER TABULATION (HT) is
   * replaced by one M-0002 HORIZONTAL TAB (HT) and between 0 and 3 M-0001 VIRTUAL
   * SPACE (VS) characters, depending on the column at which the tab occurred.
   *
   * @param {Code} code
   *   Code.
   * @returns {boolean}
   *   Whether it matches.
   */
  function markdownSpace(code) {
    return code === -2 || code === -1 || code === 32;
  }

  // Size note: removing ASCII from the regex and using `asciiPunctuation` here
  // In fact adds to the bundle size.
  /**
   * Check whether the character code represents Unicode punctuation.
   *
   * A **Unicode punctuation** is a character in the Unicode `Pc` (Punctuation,
   * Connector), `Pd` (Punctuation, Dash), `Pe` (Punctuation, Close), `Pf`
   * (Punctuation, Final quote), `Pi` (Punctuation, Initial quote), `Po`
   * (Punctuation, Other), or `Ps` (Punctuation, Open) categories, or an ASCII
   * punctuation (see `asciiPunctuation`).
   *
   * See:
   * **\[UNICODE]**:
   * [The Unicode Standard](https://www.unicode.org/versions/).
   * Unicode Consortium.
   *
   * @param code
   *   Code.
   * @returns
   *   Whether it matches.
   */
  const unicodePunctuation = regexCheck(/\p{P}|\p{S}/u);

  /**
   * Check whether the character code represents Unicode whitespace.
   *
   * Note that this does handle micromark specific markdown whitespace characters.
   * See `markdownLineEndingOrSpace` to check that.
   *
   * A **Unicode whitespace** is a character in the Unicode `Zs` (Separator,
   * Space) category, or U+0009 CHARACTER TABULATION (HT), U+000A LINE FEED (LF),
   * U+000C (FF), or U+000D CARRIAGE RETURN (CR) (**\[UNICODE]**).
   *
   * See:
   * **\[UNICODE]**:
   * [The Unicode Standard](https://www.unicode.org/versions/).
   * Unicode Consortium.
   *
   * @param code
   *   Code.
   * @returns
   *   Whether it matches.
   */
  const unicodeWhitespace = regexCheck(/\s/);

  /**
   * Create a code check from a regex.
   *
   * @param {RegExp} regex
   *   Expression.
   * @returns {(code: Code) => boolean}
   *   Check.
   */
  function regexCheck(regex) {
    return check;

    /**
     * Check whether a code matches the bound regex.
     *
     * @param {Code} code
     *   Character code.
     * @returns {boolean}
     *   Whether the character code matches the bound regex.
     */
    function check(code) {
      return code !== null && code > -1 && regex.test(String.fromCharCode(code));
    }
  }

  /**
   * @import {Effects, State, TokenType} from 'micromark-util-types'
   */


  // To do: implement `spaceOrTabWithOptions` (`connect`, `content`).

  /**
   * Parse spaces and tabs.
   *
   * There is no `nok` parameter:
   *
   * *   spaces in markdown are often optional, in which case this factory can be
   *     used and `ok` will be switched to whether spaces were found or not
   * *   one line ending or space can be detected with `markdownSpace(code)` right
   *     before using `factorySpace`
   *
   * ###### Examples
   *
   * Where `␉` represents a tab (plus how much it expands) and `␠` represents a
   * single space.
   *
   * ```markdown
   * ␉
   * ␠␠␠␠
   * ␉␠
   * ```
   *
   * @param {Effects} effects
   *   Context.
   * @param {State} ok
   *   State switched to when successful.
   * @param {TokenType} type
   *   Type of the whole whitespace.
   * @param {number | undefined} [max=Infinity]
   *   Max (exclusive).
   * @returns {State}
   *   Start state.
   */
  function factorySpace(effects, ok, type, max) {
    const limit = max ? max - 1 : Infinity;
    let size = 0;
    return start;

    /** @type {State} */
    function start(code) {
      if (markdownSpace(code)) {
        effects.enter(type);
        return prefix(code);
      }
      return ok(code);
    }

    /** @type {State} */
    function prefix(code) {
      if (markdownSpace(code) && size++ < limit) {
        effects.consume(code);
        return prefix;
      }
      effects.exit(type);
      return ok(code);
    }
  }

  /**
   * Parse spaces and tabs, with a required minimum and maximum, matching
   * `markdown-rs`’s `space_or_tab_min_max`.
   *
   * Unlike `factorySpace`, this can fail: `nok` is used when fewer than
   * `min` spaces or tabs are found.
   *
   * @param {Effects} effects
   *   Context.
   * @param {State} ok
   *   State switched to when successful.
   * @param {State} nok
   *   State switched to when unsuccessful.
   * @param {TokenType} type
   *   Type of the whole whitespace.
   * @param {number} min
   *   Minimum allowed characters (inclusive).
   * @param {number} max
   *   Maximum allowed characters (inclusive).
   * @returns {State}
   *   Start state.
   */
  function factorySpaceMinMax(effects, ok, nok, type, min, max) {
    let size = 0;
    return start;

    /** @type {State} */
    function start(code) {
      if (markdownSpace(code)) {
        effects.enter(type);
        return prefix(code);
      }
      return after(code);
    }

    /** @type {State} */
    function prefix(code) {
      if (markdownSpace(code) && size < max) {
        effects.consume(code);
        size++;
        return prefix;
      }
      effects.exit(type);
      return after(code);
    }

    /** @type {State} */
    function after(code) {
      return size >= min ? ok(code) : nok(code);
    }
  }

  /**
   * @import {
   *   InitialConstruct,
   *   Initializer,
   *   State,
   *   TokenizeContext,
   *   Token
   * } from 'micromark-util-types'
   */

  /** @type {InitialConstruct} */
  const content$1 = {
    tokenize: initializeContent
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Initializer}
   *   Content.
   */
  function initializeContent(effects) {
    const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
    /** @type {Token} */
    let previous;
    return contentStart;

    /** @type {State} */
    function afterContentStartConstruct(code) {
      if (code === null) {
        effects.consume(code);
        return;
      }
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return factorySpace(effects, contentStart, "linePrefix");
    }

    /** @type {State} */
    function paragraphInitial(code) {
      effects.enter("paragraph");
      return lineStart(code);
    }

    /** @type {State} */
    function lineStart(code) {
      const token = effects.enter("chunkText", {
        contentType: "text",
        previous
      });
      if (previous) {
        previous.next = token;
      }
      previous = token;
      return data(code);
    }

    /** @type {State} */
    function data(code) {
      if (code === null) {
        effects.exit("chunkText");
        effects.exit("paragraph");
        effects.consume(code);
        return;
      }
      if (markdownLineEnding(code)) {
        effects.consume(code);
        effects.exit("chunkText");
        return lineStart;
      }

      // Data.
      effects.consume(code);
      return data;
    }
  }

  /**
   * @import {Event} from 'micromark-util-types'
   */

  /**
   * @typedef {[number, number, Array<Event>]} Change
   * @typedef {[number, number, number]} Jump
   */

  /**
   * Tracks a bunch of edits.
   *
   * Port of `edit_map.rs` from `markdown-rs`:
   * <https://github.com/wooorm/markdown-rs/blob/1506572f/src/util/edit_map.rs>.
   *
   * Deal with several changes in events, batching them together.
   *
   * Preferably, changes should be kept to a minimum.
   * Sometimes, it’s needed to change the list of events, because parsing can be
   * messy, and it helps to expose a cleaner interface of events to the compiler
   * and other users.
   * It can also help to merge many adjacent similar events.
   * And, in other cases, it’s needed to parse subcontent: pass some events
   * through another tokenizer and inject the result.
   */
  let EditMap$1 = class EditMap {
    /**
     * Create a new edit map.
     *
     * @returns
     *   New instance.
     */
    constructor() {
      /**
       * Changes by index, so `add` does not need to scan `map` (which is
       * quadratic for documents with many edits at different places).
       *
       * @type {Map<number, Change>}
       */
      this.index = new Map();

      /**
       * Record of changes.
       *
       * @type {Array<Change>}
       */
      this.map = [];
    }

    /**
     * Create an edit: a remove and/or add at a certain place.
     *
     * @param {number} index
     *   Index at which to apply the edit.
     * @param {number} remove
     *   Count of items to remove at the index.
     * @param {Array<Event>} add
     *   Items to add at the index.
     * @returns {undefined}
     *   Nothing.
     */
    add(index, remove, add) {
      addImplementation$1(this, index, remove, add, false);
    }

    /**
     * Create an edit: but insert `add` before existing additions, instead of
     * after them.
     *
     * @param {number} index
     *   Index at which to apply the edit.
     * @param {number} remove
     *   Count of items to remove at the index.
     * @param {Array<Event>} add
     *   Items to add at the index.
     * @returns {undefined}
     *   Nothing.
     */
    addBefore(index, remove, add) {
      addImplementation$1(this, index, remove, add, true);
    }

    /**
     * Done, change the events.
     *
     * @param {Array<Event>} events
     *   List of events to apply the edits to.
     * @returns {undefined}
     *   Nothing.
     */
    consume(events) {
      this.map.sort(function (a, b) {
        return a[0] - b[0];
      });
      if (this.map.length === 0) {
        return;
      }

      // To do: if links are added in events, like they are in `markdown-rs`,
      // this is needed.
      // // Calculate jumps: where items in the current list move to.
      // /** @type {Array<Jump>} */
      // const jumps = []
      // let index = 0
      // let addAcc = 0
      // let removeAcc = 0
      // while (index < this.map.length) {
      //   const [at, remove, add] = this.map[index]
      //   removeAcc += remove
      //   addAcc += add.length
      //   jumps.push([at, removeAcc, addAcc])
      //   index += 1
      // }
      //
      // shiftLinks(events, jumps)

      let index = this.map.length;
      /** @type {Array<Array<Event>>} */
      const vecs = [];
      while (index > 0) {
        index -= 1;
        vecs.push(events.slice(this.map[index][0] + this.map[index][1]), this.map[index][2]);

        // Truncate rest.
        events.length = this.map[index][0];
      }
      vecs.push(events.slice());
      events.length = 0;
      let slice = vecs.pop();
      while (slice) {
        for (const element of slice) {
          events.push(element);
        }
        slice = vecs.pop();
      }

      // Truncate everything.
      this.map.length = 0;
      this.index.clear();
    }
  };

  /**
   * Create an edit.
   *
   * @param {EditMap} editMap
   *   Edit map to apply to.
   * @param {number} at
   *   Index at which to apply the edit.
   * @param {number} remove
   *   Count of items to remove at the index.
   * @param {Array<Event>} add
   *   Items to add at the index.
   * @param {boolean} before
   *   Insert `add` before existing additions at `at`, instead of after them.
   * @returns {undefined}
   *   Nothing.
   */
  function addImplementation$1(editMap, at, remove, add, before) {
    if (remove === 0 && add.length === 0) {
      return;
    }
    const existing = editMap.index.get(at);
    if (existing) {
      existing[1] += remove;
      if (before) {
        add.push(...existing[2]);
        existing[2] = add;
      } else {
        existing[2].push(...add);
      }
      return;
    }

    /** @type {Change} */
    const change = [at, remove, add];
    editMap.map.push(change);
    editMap.index.set(at, change);
  }

  // /**
  //  * Shift `previous` and `next` links according to `jumps`.
  //  *
  //  * This fixes links in case there are events removed or added between them.
  //  *
  //  * @param {Array<Event>} events
  //  * @param {Array<Jump>} jumps
  //  */
  // function shiftLinks(events, jumps) {
  //   let jumpIndex = 0
  //   let index = 0
  //   let add = 0
  //   let rm = 0

  //   while (index < events.length) {
  //     const rmCurr = rm

  //     while (jumpIndex < jumps.length && jumps[jumpIndex][0] <= index) {
  //       add = jumps[jumpIndex][2]
  //       rm = jumps[jumpIndex][1]
  //       jumpIndex += 1
  //     }

  //     // Ignore items that will be removed.
  //     if (rm > rmCurr) {
  //       index += rm - rmCurr
  //     } else {
  //       // ?
  //       // if let Some(link) = &events[index].link {
  //       //     if let Some(next) = link.next {
  //       //         events[next].link.as_mut().unwrap().previous = Some(index + add - rm);
  //       //         while jumpIndex < jumps.len() && jumps[jumpIndex].0 <= next {
  //       //             add = jumps[jumpIndex].2;
  //       //             rm = jumps[jumpIndex].1;
  //       //             jumpIndex += 1;
  //       //         }
  //       //         events[index].link.as_mut().unwrap().next = Some(next + add - rm);
  //       //         index = next;
  //       //         continue;
  //       //     }
  //       // }
  //       index += 1
  //     }
  //   }
  // }

  /**
   * @import {
   *   Construct,
   *   ContainerState,
   *   InitialConstruct,
   *   Initializer,
   *   Point,
   *   State,
   *   TokenizeContext,
   *   Tokenizer,
   *   Token
   * } from 'micromark-util-types'
   */

  /** @type {InitialConstruct} */
  const document$1 = {
    tokenize: initializeDocument
  };

  /** @type {Construct} */
  const containerConstruct = {
    tokenize: tokenizeContainer
  };

  /**
   * @this {TokenizeContext}
   *   Self.
   * @type {Initializer}
   *   Initializer.
   */
  function initializeDocument(effects) {
    const self = this;
    /** @type {Array<StackItem>} */
    const stack = [];
    let continued = 0;
    /** @type {TokenizeContext | undefined} */
    let childFlow;
    /** @type {Token | undefined} */
    let childToken;
    /** @type {number} */
    let lineStartOffset;
    return start;

    /** @type {State} */
    function start(code) {
      // First we iterate through the open blocks, starting with the root
      // document, and descending through last children down to the last open
      // block.
      // Each block imposes a condition that the line must satisfy if the block is
      // to remain open.
      // For example, a block quote requires a `>` character.
      // A paragraph requires a non-blank line.
      // In this phase we may match all or just some of the open blocks.
      // But we cannot close unmatched blocks yet, because we may have a lazy
      // continuation line.
      if (continued < stack.length) {
        const item = stack[continued];
        self.containerState = item[1];
        return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code);
      }

      // Done.
      return checkNewContainers(code);
    }

    /** @type {State} */
    function documentContinue(code) {
      continued++;

      // Note: this field is called `_closeFlow` but it also closes containers.
      // Perhaps a good idea to rename it but it’s already used in the wild by
      // extensions.
      if (self.containerState._closeFlow) {
        self.containerState._closeFlow = undefined;
        if (childFlow) {
          closeFlow();
        }

        // Note: this algorithm for moving events around is similar to the
        // algorithm when dealing with lazy lines in `writeToChild`.
        const indexBeforeExits = self.events.length;
        let indexBeforeFlow = indexBeforeExits;
        /** @type {Point | undefined} */
        let point;

        // Find the flow chunk.
        while (indexBeforeFlow--) {
          if (self.events[indexBeforeFlow][0] === 'exit' && self.events[indexBeforeFlow][1].type === "chunkFlow") {
            point = self.events[indexBeforeFlow][1].end;
            break;
          }
        }
        exitContainers(continued);

        // Fix positions.
        let index = indexBeforeExits;
        while (index < self.events.length) {
          self.events[index][1].end = {
            ...point
          };
          index++;
        }
        const editMap = new EditMap$1();
        // Inject the exits earlier (they’re still also at the end).
        editMap.add(indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
        // Discard the duplicate exits.
        editMap.add(indexBeforeExits, index - indexBeforeExits, []);
        editMap.consume(self.events);
        return checkNewContainers(code);
      }
      return start(code);
    }

    /** @type {State} */
    function checkNewContainers(code) {
      // Next, after consuming the continuation markers for existing blocks, we
      // look for new block starts (e.g. `>` for a block quote).
      // If we encounter a new block start, we close any blocks unmatched in
      // step 1 before creating the new block as a child of the last matched
      // block.
      if (continued === stack.length) {
        // No need to `check` whether there’s a container, of `exitContainers`
        // would be moot.
        // We can instead immediately `attempt` to parse one.
        if (!childFlow) {
          return documentContinued(code);
        }

        // If we have concrete content, such as block HTML or fenced code,
        // we can’t have containers “pierce” into them, so we can immediately
        // start.
        if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
          return flowStart(code);
        }

        // If we do have flow, it could still be a blank line,
        // but we’d be interrupting it w/ a new container if there’s a current
        // construct.
        // To do: next major: remove `_gfmTableDynamicInterruptHack` (no longer
        // needed in micromark-extension-gfm-table@1.0.6).
        self.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
      }

      // Check if there is a new container.
      self.containerState = {};
      return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code);
    }

    /** @type {State} */
    function thereIsANewContainer(code) {
      if (childFlow) {
        closeFlow();
      }
      exitContainers(continued);
      return documentContinued(code);
    }

    /** @type {State} */
    function thereIsNoNewContainer(code) {
      self.parser.lazy[self.now().line] = continued !== stack.length;
      lineStartOffset = self.now().offset;
      return flowStart(code);
    }

    /** @type {State} */
    function documentContinued(code) {
      // Try new containers.
      self.containerState = {};
      return effects.attempt(containerConstruct, containerContinue, flowStart)(code);
    }

    /** @type {State} */
    function containerContinue(code) {
      continued++;
      stack.push([self.currentConstruct, self.containerState]);
      // Try another.
      return documentContinued(code);
    }

    /** @type {State} */
    function flowStart(code) {
      if (code === null) {
        if (childFlow) {
          closeFlow();
        }
        exitContainers(0);
        effects.consume(code);
        return;
      }
      childFlow = childFlow || self.parser.flow(self.now());
      effects.enter("chunkFlow", {
        _tokenizer: childFlow,
        contentType: "flow",
        previous: childToken
      });
      return flowContinue(code);
    }

    /** @type {State} */
    function flowContinue(code) {
      if (code === null) {
        writeToChild(effects.exit("chunkFlow"), true);
        exitContainers(0);
        effects.consume(code);
        return;
      }
      if (markdownLineEnding(code)) {
        effects.consume(code);
        writeToChild(effects.exit("chunkFlow"));
        // Get ready for the next line.
        continued = 0;
        self.interrupt = undefined;
        return start;
      }
      effects.consume(code);
      return flowContinue;
    }

    /**
     * @param {Token} token
     *   Token.
     * @param {boolean | undefined} [endOfFile]
     *   Whether the token is at the end of the file (default: `false`).
     * @returns {undefined}
     *   Nothing.
     */
    function writeToChild(token, endOfFile) {
      const stream = self.sliceStream(token);
      if (endOfFile) {
        stream.push(null);
      }
      token.previous = childToken;
      if (childToken) {
        childToken.next = token;
      }
      childToken = token;
      childFlow.defineSkip(token.start);
      childFlow.write(stream);

      // Alright, so we just added a lazy line:
      //
      // ```markdown
      // > a
      // b.
      //
      // Or:
      //
      // > ~~~c
      // d
      //
      // Or:
      //
      // > | e |
      // f
      // ```
      //
      // The construct in the second example (fenced code) does not accept lazy
      // lines, so it marked itself as done at the end of its first line, and
      // then the content construct parses `d`.
      // Most constructs in markdown match on the first line: if the first line
      // forms a construct, a non-lazy line can’t “unmake” it.
      //
      // The construct in the third example is potentially a GFM table, and
      // those are *weird*.
      // It *could* be a table, from the first line, if the following line
      // matches a condition.
      // In this case, that second line is lazy, which “unmakes” the first line
      // and turns the whole into one content block.
      //
      // We’ve now parsed the non-lazy and the lazy line, and can figure out
      // whether the lazy line started a new flow block.
      // If it did, we exit the current containers between the two flow blocks.
      if (self.parser.lazy[token.start.line]) {
        let index = childFlow.events.length;
        while (index--) {
          if (
          // The token starts before the line ending…
          childFlow.events[index][1].start.offset < lineStartOffset && (
          // …and either is not ended yet…
          !childFlow.events[index][1].end ||
          // …or ends after it.
          childFlow.events[index][1].end.offset > lineStartOffset)) {
            // Exit: there’s still something open, which means it’s a lazy line
            // part of something.
            return;
          }
        }

        // Note: this algorithm for moving events around is similar to the
        // algorithm when closing flow in `documentContinue`.
        const indexBeforeExits = self.events.length;
        let indexBeforeFlow = indexBeforeExits;
        /** @type {boolean | undefined} */
        let seen;
        /** @type {Point | undefined} */
        let point;

        // Find the previous chunk (the one before the lazy line).
        while (indexBeforeFlow--) {
          if (self.events[indexBeforeFlow][0] === 'exit' && self.events[indexBeforeFlow][1].type === "chunkFlow") {
            if (seen) {
              point = self.events[indexBeforeFlow][1].end;
              break;
            }
            seen = true;
          }
        }
        exitContainers(continued);

        // Fix positions.
        index = indexBeforeExits;
        while (index < self.events.length) {
          self.events[index][1].end = {
            ...point
          };
          index++;
        }
        const editMap = new EditMap$1();
        // Inject the exits earlier (they’re still also at the end).
        editMap.add(indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
        // Discard the duplicate exits.
        editMap.add(indexBeforeExits, index - indexBeforeExits, []);
        editMap.consume(self.events);
      }
    }

    /**
     * @param {number} size
     *   Size.
     * @returns {undefined}
     *   Nothing.
     */
    function exitContainers(size) {
      let index = stack.length;

      // Exit open containers.
      while (index-- > size) {
        const entry = stack[index];
        self.containerState = entry[1];
        entry[0].exit.call(self, effects);
      }
      stack.length = size;
    }
    function closeFlow() {
      childFlow.write([null]);
      childToken = undefined;
      childFlow = undefined;
      self.containerState._closeFlow = undefined;
    }
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   *   Tokenizer.
   */
  function tokenizeContainer(effects, ok, nok) {
    // Always populated by defaults.

    return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok, nok), "linePrefix", this.parser.constructs.disable.null.includes('codeIndented') ? undefined : 4);
  }

  /**
   * @import {Code} from 'micromark-util-types'
   */

  /**
   * Classify whether a code represents whitespace, punctuation, or something
   * else.
   *
   * Used for attention (emphasis, strong), whose sequences can open or close
   * based on the class of surrounding characters.
   *
   * > 👉 **Note**: eof (`null`) is seen as whitespace.
   *
   * @param {Code} code
   *   Code.
   * @returns {typeof constants.characterGroupWhitespace | typeof constants.characterGroupPunctuation | undefined}
   *   Group.
   */
  function classifyCharacter(code) {
    if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) {
      return 1;
    }
    if (unicodePunctuation(code)) {
      return 2;
    }
  }

  /**
   * @import {Event, Resolver, TokenizeContext} from 'micromark-util-types'
   */

  /**
   * Call all `resolveAll`s.
   *
   * @param {ReadonlyArray<{resolveAll?: Resolver | undefined}>} constructs
   *   List of constructs, optionally with `resolveAll`s.
   * @param {Array<Event>} events
   *   List of events.
   * @param {TokenizeContext} context
   *   Context used by `tokenize`.
   * @returns {Array<Event>}
   *   Changed events.
   */
  function resolveAll(constructs, events, context) {
    /** @type {Array<Resolver>} */
    const called = [];
    let index = -1;

    while (++index < constructs.length) {
      const resolve = constructs[index].resolveAll;

      if (resolve && !called.includes(resolve)) {
        events = resolve(events, context);
        called.push(resolve);
      }
    }

    return events
  }

  /**
   * @import {
   *   Code,
   *   Construct,
   *   Event,
   *   Point,
   *   Resolver,
   *   State,
   *   TokenizeContext,
   *   Tokenizer,
   *   Token
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const attention$2 = {
    name: 'attention',
    resolveAll: resolveAllAttention,
    tokenize: tokenizeAttention
  };

  /**
   * Take all events and resolve attention to emphasis or strong.
   *
   * @type {Resolver}
   */
  // eslint-disable-next-line complexity
  function resolveAllAttention(events, context) {
    let index = -1;
    /** @type {Array<Event>} */
    let nextEvents;

    // Walk through all events.
    //
    // Note: performance of this is fine on an mb of normal markdown, but it’s
    // a bottleneck for malicious stuff.
    while (++index < events.length) {
      // Find a token that can close.
      if (events[index][0] === 'enter' && events[index][1].type === 'attentionSequence' && events[index][1]._close) {
        let open = index;

        // Now walk back to find an opener.
        while (open--) {
          // Find a token that can open the closer.
          if (events[open][0] === 'exit' && events[open][1].type === 'attentionSequence' && events[open][1]._open &&
          // If the markers are the same:
          context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index][1]).charCodeAt(0)) {
            // If the opening can close or the closing can open,
            // and the close size *is not* a multiple of three,
            // but the sum of the opening and closing size *is* multiple of three,
            // then don’t match.
            if ((events[open][1]._close || events[index][1]._open) && (events[index][1].end.offset - events[index][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index][1].end.offset - events[index][1].start.offset) % 3)) {
              continue;
            }

            // Number of markers to use from the sequence.
            const use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index][1].end.offset - events[index][1].start.offset > 1 ? 2 : 1;
            const start = {
              ...events[open][1].end
            };
            const end = {
              ...events[index][1].start
            };
            movePoint(start, -use);
            movePoint(end, use);
            const openingSequence = {
              type: use > 1 ? "strongSequence" : "emphasisSequence",
              start,
              end: {
                ...events[open][1].end
              }
            };
            const closingSequence = {
              type: use > 1 ? "strongSequence" : "emphasisSequence",
              start: {
                ...events[index][1].start
              },
              end
            };
            const text = {
              type: use > 1 ? "strongText" : "emphasisText",
              start: {
                ...events[open][1].end
              },
              end: {
                ...events[index][1].start
              }
            };
            const group = {
              type: use > 1 ? "strong" : "emphasis",
              start: {
                ...openingSequence.start
              },
              end: {
                ...closingSequence.end
              }
            };
            events[open][1].end = {
              ...openingSequence.start
            };
            events[index][1].start = {
              ...closingSequence.end
            };
            nextEvents = [];

            // If there are more markers in the opening, add them before.
            if (events[open][1].end.offset - events[open][1].start.offset) {
              nextEvents = push(nextEvents, [['enter', events[open][1], context], ['exit', events[open][1], context]]);
            }

            // Opening.
            nextEvents = push(nextEvents, [['enter', group, context], ['enter', openingSequence, context], ['exit', openingSequence, context], ['enter', text, context]]);

            // Always populated by defaults.

            // Between.
            nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index), context));

            // Closing.
            nextEvents = push(nextEvents, [['exit', text, context], ['enter', closingSequence, context], ['exit', closingSequence, context], ['exit', group, context]]);

            /** @type {number} */
            let offset = 0;

            // If there are more markers in the closing, add them after.
            if (events[index][1].end.offset - events[index][1].start.offset) {
              offset = 2;
              nextEvents = push(nextEvents, [['enter', events[index][1], context], ['exit', events[index][1], context]]);
            }
            splice(events, open - 1, index - open + 3, nextEvents);
            index = open + nextEvents.length - offset - 2;
            break;
          }
        }
      }
    }

    // Remove remaining sequences.
    index = -1;
    while (++index < events.length) {
      if (events[index][1].type === 'attentionSequence') {
        events[index][1].type = 'data';
      }
    }
    return events;
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeAttention(effects, ok) {
    const attentionMarkers = this.parser.constructs.attentionMarkers.null;
    const previous = this.previous;
    const before = classifyCharacter(previous);

    /** @type {NonNullable<Code>} */
    let marker;
    return start;

    /**
     * Before a sequence.
     *
     * ```markdown
     * > | **
     *     ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      marker = code;
      effects.enter('attentionSequence');
      return inside(code);
    }

    /**
     * In a sequence.
     *
     * ```markdown
     * > | **
     *     ^^
     * ```
     *
     * @type {State}
     */
    function inside(code) {
      if (code === marker) {
        effects.consume(code);
        return inside;
      }
      const token = effects.exit('attentionSequence');

      // To do: next major: move this to resolver, just like `markdown-rs`.
      const after = classifyCharacter(code);

      // Always populated by defaults.

      // Note: `*` and `_` are in `attentionMarkers` through core.
      // They are excluded here as the loosening is meant for markers registered
      // by *other* constructs (such as GFM strikethrough’s `~`).
      const open = !after || after === 2 && before || attentionMarkers.includes(code) && code !== 42 && code !== 95;
      const close = !before || before === 2 && after || attentionMarkers.includes(previous) && previous !== 42 && previous !== 95;
      token._open = Boolean(marker === 42 ? open : open && (before || !close));
      token._close = Boolean(marker === 42 ? close : close && (after || !open));
      return ok(code);
    }
  }

  /**
   * Move a point a bit.
   *
   * Note: `move` only works inside lines! It’s not possible to move past other
   * chunks (replacement characters, tabs, or line endings).
   *
   * @param {Point} point
   *   Point.
   * @param {number} offset
   *   Amount to move.
   * @returns {undefined}
   *   Nothing.
   */
  function movePoint(point, offset) {
    point.column += offset;
    point.offset += offset;
    point._bufferIndex += offset;
  }

  /**
   * @import {
   *   Construct,
   *   State,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const autolink = {
    name: 'autolink',
    tokenize: tokenizeAutolink
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeAutolink(effects, ok, nok) {
    let size = 0;
    return start;

    /**
     * Start of an autolink.
     *
     * ```markdown
     * > | a<https://example.com>b
     *      ^
     * > | a<user@example.com>b
     *      ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      effects.enter("autolink");
      effects.enter("autolinkMarker");
      effects.consume(code);
      effects.exit("autolinkMarker");
      effects.enter("autolinkProtocol");
      return open;
    }

    /**
     * After `<`, at protocol or atext.
     *
     * ```markdown
     * > | a<https://example.com>b
     *       ^
     * > | a<user@example.com>b
     *       ^
     * ```
     *
     * @type {State}
     */
    function open(code) {
      if (asciiAlpha(code)) {
        effects.consume(code);
        return schemeOrEmailAtext;
      }
      if (code === 64) {
        return nok(code);
      }
      return emailAtext(code);
    }

    /**
     * At second byte of protocol or atext.
     *
     * ```markdown
     * > | a<https://example.com>b
     *        ^
     * > | a<user@example.com>b
     *        ^
     * ```
     *
     * @type {State}
     */
    function schemeOrEmailAtext(code) {
      // ASCII alphanumeric and `+`, `-`, and `.`.
      if (code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) {
        // Count the previous alphabetical from `open` too.
        size = 1;
        return schemeInsideOrEmailAtext(code);
      }
      return emailAtext(code);
    }

    /**
     * In ambiguous protocol or atext.
     *
     * ```markdown
     * > | a<https://example.com>b
     *        ^
     * > | a<user@example.com>b
     *        ^
     * ```
     *
     * @type {State}
     */
    function schemeInsideOrEmailAtext(code) {
      if (code === 58) {
        effects.consume(code);
        size = 0;
        return urlInside;
      }

      // ASCII alphanumeric and `+`, `-`, and `.`.
      if ((code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) && size++ < 32) {
        effects.consume(code);
        return schemeInsideOrEmailAtext;
      }
      size = 0;
      return emailAtext(code);
    }

    /**
     * After protocol, in URL.
     *
     * ```markdown
     * > | a<https://example.com>b
     *             ^
     * ```
     *
     * @type {State}
     */
    function urlInside(code) {
      if (code === 62) {
        effects.exit("autolinkProtocol");
        effects.enter("autolinkMarker");
        effects.consume(code);
        effects.exit("autolinkMarker");
        effects.exit("autolink");
        return ok;
      }

      // ASCII control, space, or `<`.
      if (code === null || code === 32 || code === 60 || asciiControl(code)) {
        return nok(code);
      }
      effects.consume(code);
      return urlInside;
    }

    /**
     * In email atext.
     *
     * ```markdown
     * > | a<user.name@example.com>b
     *              ^
     * ```
     *
     * @type {State}
     */
    function emailAtext(code) {
      if (code === 64) {
        effects.consume(code);
        return emailAtSignOrDot;
      }
      if (asciiAtext(code)) {
        effects.consume(code);
        return emailAtext;
      }
      return nok(code);
    }

    /**
     * In label, after at-sign or dot.
     *
     * ```markdown
     * > | a<user.name@example.com>b
     *                 ^       ^
     * ```
     *
     * @type {State}
     */
    function emailAtSignOrDot(code) {
      return asciiAlphanumeric(code) ? emailLabel(code) : nok(code);
    }

    /**
     * In label, where `.` and `>` are allowed.
     *
     * ```markdown
     * > | a<user.name@example.com>b
     *                   ^
     * ```
     *
     * @type {State}
     */
    function emailLabel(code) {
      if (code === 46) {
        effects.consume(code);
        size = 0;
        return emailAtSignOrDot;
      }
      if (code === 62) {
        // Exit, then change the token type.
        effects.exit("autolinkProtocol").type = "autolinkEmail";
        effects.enter("autolinkMarker");
        effects.consume(code);
        effects.exit("autolinkMarker");
        effects.exit("autolink");
        return ok;
      }
      return emailValue(code);
    }

    /**
     * In label, where `.` and `>` are *not* allowed.
     *
     * Though, this is also used in `emailLabel` to parse other values.
     *
     * ```markdown
     * > | a<user.name@ex-ample.com>b
     *                    ^
     * ```
     *
     * @type {State}
     */
    function emailValue(code) {
      // ASCII alphanumeric or `-`.
      if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
        const next = code === 45 ? emailValue : emailLabel;
        effects.consume(code);
        return next;
      }
      return nok(code);
    }
  }

  /**
   * @import {
   *   Construct,
   *   State,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const blankLine = {
    partial: true,
    tokenize: tokenizeBlankLine
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeBlankLine(effects, ok, nok) {
    return start;

    /**
     * Start of blank line.
     *
     * > 👉 **Note**: `␠` represents a space character.
     *
     * ```markdown
     * > | ␠␠␊
     *     ^
     * > | ␊
     *     ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      return markdownSpace(code) ? factorySpace(effects, after, "linePrefix")(code) : after(code);
    }

    /**
     * At eof/eol, after optional whitespace.
     *
     * > 👉 **Note**: `␠` represents a space character.
     *
     * ```markdown
     * > | ␠␠␊
     *       ^
     * > | ␊
     *     ^
     * ```
     *
     * @type {State}
     */
    function after(code) {
      return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
    }
  }

  /**
   * @import {
   *   Construct,
   *   Exiter,
   *   State,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const blockQuote = {
    continuation: {
      tokenize: tokenizeBlockQuoteContinuation
    },
    exit: exit$1,
    name: 'blockQuote',
    tokenize: tokenizeBlockQuoteStart
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeBlockQuoteStart(effects, ok, nok) {
    const self = this;
    return start;

    /**
     * Start of block quote.
     *
     * ```markdown
     * > | > a
     *     ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      if (code === 62) {
        const state = self.containerState;
        if (!state.open) {
          effects.enter("blockQuote", {
            _container: true
          });
          state.open = true;
        }
        effects.enter("blockQuotePrefix");
        effects.enter("blockQuoteMarker");
        effects.consume(code);
        effects.exit("blockQuoteMarker");
        return after;
      }
      return nok(code);
    }

    /**
     * After `>`, before optional whitespace.
     *
     * ```markdown
     * > | > a
     *      ^
     * ```
     *
     * @type {State}
     */
    function after(code) {
      if (markdownSpace(code)) {
        effects.enter("blockQuotePrefixWhitespace");
        effects.consume(code);
        effects.exit("blockQuotePrefixWhitespace");
        effects.exit("blockQuotePrefix");
        return ok;
      }
      effects.exit("blockQuotePrefix");
      return ok(code);
    }
  }

  /**
   * Start of block quote continuation.
   *
   * ```markdown
   *   | > a
   * > | > b
   *     ^
   * ```
   *
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeBlockQuoteContinuation(effects, ok, nok) {
    const self = this;
    return contStart;

    /**
     * Start of block quote continuation.
     *
     * Also used to parse the first block quote opening.
     *
     * ```markdown
     *   | > a
     * > | > b
     *     ^
     * ```
     *
     * @type {State}
     */
    function contStart(code) {
      if (markdownSpace(code)) {
        // Always populated by defaults.

        return factorySpace(effects, contBefore, "linePrefix", self.parser.constructs.disable.null.includes('codeIndented') ? undefined : 4)(code);
      }
      return contBefore(code);
    }

    /**
     * At `>`, after optional whitespace.
     *
     * Also used to parse the first block quote opening.
     *
     * ```markdown
     *   | > a
     * > | > b
     *     ^
     * ```
     *
     * @type {State}
     */
    function contBefore(code) {
      return effects.attempt(blockQuote, ok, nok)(code);
    }
  }

  /** @type {Exiter} */
  function exit$1(effects) {
    effects.exit("blockQuote");
  }

  /**
   * @import {
   *   Construct,
   *   State,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const characterEscape = {
    name: 'characterEscape',
    tokenize: tokenizeCharacterEscape
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeCharacterEscape(effects, ok, nok) {
    return start;

    /**
     * Start of character escape.
     *
     * ```markdown
     * > | a\*b
     *      ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      effects.enter("characterEscape");
      effects.enter("escapeMarker");
      effects.consume(code);
      effects.exit("escapeMarker");
      return inside;
    }

    /**
     * After `\`, at punctuation.
     *
     * ```markdown
     * > | a\*b
     *       ^
     * ```
     *
     * @type {State}
     */
    function inside(code) {
      // ASCII punctuation.
      if (asciiPunctuation(code)) {
        effects.enter("characterEscapeValue");
        effects.consume(code);
        effects.exit("characterEscapeValue");
        effects.exit("characterEscape");
        return ok;
      }
      return nok(code);
    }
  }

  /**
   * @import {
   *   Code,
   *   Construct,
   *   State,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const characterReference = {
    name: 'characterReference',
    tokenize: tokenizeCharacterReference
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeCharacterReference(effects, ok, nok) {
    const self = this;
    let size = 0;
    /** @type {number} */
    let max;
    /** @type {(code: Code) => boolean} */
    let test;
    return start;

    /**
     * Start of character reference.
     *
     * ```markdown
     * > | a&amp;b
     *      ^
     * > | a&#123;b
     *      ^
     * > | a&#x9;b
     *      ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      effects.enter("characterReference");
      effects.enter("characterReferenceMarker");
      effects.consume(code);
      effects.exit("characterReferenceMarker");
      return open;
    }

    /**
     * After `&`, at `#` for numeric references or alphanumeric for named
     * references.
     *
     * ```markdown
     * > | a&amp;b
     *       ^
     * > | a&#123;b
     *       ^
     * > | a&#x9;b
     *       ^
     * ```
     *
     * @type {State}
     */
    function open(code) {
      if (code === 35) {
        effects.enter("characterReferenceMarkerNumeric");
        effects.consume(code);
        effects.exit("characterReferenceMarkerNumeric");
        return numeric;
      }
      effects.enter("characterReferenceValue");
      max = 31;
      test = asciiAlphanumeric;
      return value(code);
    }

    /**
     * After `#`, at `x` for hexadecimals or digit for decimals.
     *
     * ```markdown
     * > | a&#123;b
     *        ^
     * > | a&#x9;b
     *        ^
     * ```
     *
     * @type {State}
     */
    function numeric(code) {
      if (code === 88 || code === 120) {
        effects.enter("characterReferenceMarkerHexadecimal");
        effects.consume(code);
        effects.exit("characterReferenceMarkerHexadecimal");
        effects.enter("characterReferenceValue");
        max = 6;
        test = asciiHexDigit;
        return value;
      }
      effects.enter("characterReferenceValue");
      max = 7;
      test = asciiDigit;
      return value(code);
    }

    /**
     * After markers (`&#x`, `&#`, or `&`), in value, before `;`.
     *
     * The character reference kind defines what and how many characters are
     * allowed.
     *
     * ```markdown
     * > | a&amp;b
     *       ^^^
     * > | a&#123;b
     *        ^^^
     * > | a&#x9;b
     *         ^
     * ```
     *
     * @type {State}
     */
    function value(code) {
      if (code === 59 && size) {
        const token = effects.exit("characterReferenceValue");
        if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self.sliceSerialize(token))) {
          return nok(code);
        }

        // To do: `markdown-rs` uses a different name:
        // `CharacterReferenceMarkerSemi`.
        effects.enter("characterReferenceMarker");
        effects.consume(code);
        effects.exit("characterReferenceMarker");
        effects.exit("characterReference");
        return ok;
      }
      if (test(code) && size++ < max) {
        effects.consume(code);
        return value;
      }
      return nok(code);
    }
  }

  /**
   * @import {
   *   Construct,
   *   State,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const nonLazyContinuation = {
    partial: true,
    tokenize: tokenizeNonLazyContinuation
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeNonLazyContinuation(effects, ok, nok) {
    const self = this;
    return start;

    /**
     * At eol, before continuation.
     *
     * ```markdown
     * > | * ```js
     *            ^
     *   | b
     * ```
     *
     * @type {State}
     */
    function start(code) {
      if (code === null) {
        return nok(code);
      }
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return after;
    }

    /**
     * A continuation.
     *
     * ```markdown
     *   | * ```js
     * > | b
     *     ^
     * ```
     *
     * @type {State}
     */
    function after(code) {
      return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
    }
  }

  /**
   * @import {
   *   Code,
   *   Construct,
   *   State,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */


  /** @type {Construct} */
  const codeFenced = {
    concrete: true,
    name: 'codeFenced',
    tokenize: tokenizeCodeFenced
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeCodeFenced(effects, ok, nok) {
    const self = this;
    /** @type {Construct} */
    const closeStart = {
      partial: true,
      tokenize: tokenizeCloseStart
    };
    let initialPrefix = 0;
    let sizeOpen = 0;
    /** @type {NonNullable<Code>} */
    let marker;
    return start;

    /**
     * Start of code.
     *
     * ```markdown
     * > | ~~~js
     *     ^
     *   | alert(1)
     *   | ~~~
     * ```
     *
     * @type {State}
     */
    function start(code) {
      // To do: parse whitespace like `markdown-rs`.
      return beforeSequenceOpen(code);
    }

    /**
     * In opening fence, after prefix, at sequence.
     *
     * ```markdown
     * > | ~~~js
     *     ^
     *   | alert(1)
     *   | ~~~
     * ```
     *
     * @type {State}
     */
    function beforeSequenceOpen(code) {
      const tail = self.events[self.events.length - 1];
      initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
      marker = code;
      effects.enter("codeFenced");
      effects.enter("codeFencedFence");
      effects.enter("codeFencedFenceSequence");
      return sequenceOpen(code);
    }

    /**
     * In opening fence sequence.
     *
     * ```markdown
     * > | ~~~js
     *      ^
     *   | alert(1)
     *   | ~~~
     * ```
     *
     * @type {State}
     */
    function sequenceOpen(code) {
      if (code === marker) {
        sizeOpen++;
        effects.consume(code);
        return sequenceOpen;
      }
      if (sizeOpen < 3) {
        return nok(code);
      }
      effects.exit("codeFencedFenceSequence");
      return markdownSpace(code) ? factorySpace(effects, infoBefore, "whitespace")(code) : infoBefore(code);
    }

    /**
     * In opening fence, after the sequence (and optional whitespace), before info.
     *
     * ```markdown
     * > | ~~~js
     *        ^
     *   | alert(1)
     *   | ~~~
     * ```
     *
     * @type {State}
     */
    function infoBefore(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit("codeFencedFence");
        return self.interrupt ? ok(code) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code);
      }
      effects.enter("codeFencedFenceInfo");
      effects.enter("chunkString", {
        contentType: "string"
      });
      return info(code);
    }

    /**
     * In info.
     *
     * ```markdown
     * > | ~~~js
     *        ^
     *   | alert(1)
     *   | ~~~
     * ```
     *
     * @type {State}
     */
    function info(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit("chunkString");
        effects.exit("codeFencedFenceInfo");
        return infoBefore(code);
      }
      if (markdownSpace(code)) {
        effects.exit("chunkString");
        effects.exit("codeFencedFenceInfo");
        return factorySpace(effects, metaBefore, "whitespace")(code);
      }
      if (code === 96 && code === marker) {
        return nok(code);
      }
      effects.consume(code);
      return info;
    }

    /**
     * In opening fence, after info and whitespace, before meta.
     *
     * ```markdown
     * > | ~~~js eval
     *           ^
     *   | alert(1)
     *   | ~~~
     * ```
     *
     * @type {State}
     */
    function metaBefore(code) {
      if (code === null || markdownLineEnding(code)) {
        return infoBefore(code);
      }
      effects.enter("codeFencedFenceMeta");
      effects.enter("chunkString", {
        contentType: "string"
      });
      return meta(code);
    }

    /**
     * In meta.
     *
     * ```markdown
     * > | ~~~js eval
     *           ^
     *   | alert(1)
     *   | ~~~
     * ```
     *
     * @type {State}
     */
    function meta(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit("chunkString");
        effects.exit("codeFencedFenceMeta");
        return infoBefore(code);
      }
      if (code === 96 && code === marker) {
        return nok(code);
      }
      effects.consume(code);
      return meta;
    }

    /**
     * At eol/eof in code, before a non-lazy closing fence or content.
     *
     * ```markdown
     * > | ~~~js
     *          ^
     * > | alert(1)
     *             ^
     *   | ~~~
     * ```
     *
     * @type {State}
     */
    function atNonLazyBreak(code) {
      return effects.attempt(closeStart, after, contentBefore)(code);
    }

    /**
     * Before code content, not a closing fence, at eol.
     *
     * ```markdown
     *   | ~~~js
     * > | alert(1)
     *             ^
     *   | ~~~
     * ```
     *
     * @type {State}
     */
    function contentBefore(code) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return contentStart;
    }

    /**
     * Before code content, not a closing fence.
     *
     * ```markdown
     *   | ~~~js
     * > | alert(1)
     *     ^
     *   | ~~~
     * ```
     *
     * @type {State}
     */
    function contentStart(code) {
      return initialPrefix > 0 && markdownSpace(code) ? factorySpace(effects, beforeContentChunk, "linePrefix", initialPrefix + 1)(code) : beforeContentChunk(code);
    }

    /**
     * Before code content, after optional prefix.
     *
     * ```markdown
     *   | ~~~js
     * > | alert(1)
     *     ^
     *   | ~~~
     * ```
     *
     * @type {State}
     */
    function beforeContentChunk(code) {
      if (code === null || markdownLineEnding(code)) {
        return effects.check(nonLazyContinuation, atNonLazyBreak, after)(code);
      }
      effects.enter("codeFlowValue");
      return contentChunk(code);
    }

    /**
     * In code content.
     *
     * ```markdown
     *   | ~~~js
     * > | alert(1)
     *     ^^^^^^^^
     *   | ~~~
     * ```
     *
     * @type {State}
     */
    function contentChunk(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit("codeFlowValue");
        return beforeContentChunk(code);
      }
      effects.consume(code);
      return contentChunk;
    }

    /**
     * After code.
     *
     * ```markdown
     *   | ~~~js
     *   | alert(1)
     * > | ~~~
     *        ^
     * ```
     *
     * @type {State}
     */
    function after(code) {
      effects.exit("codeFenced");
      return ok(code);
    }

    /**
     * @this {TokenizeContext}
     *   Context.
     * @type {Tokenizer}
     */
    function tokenizeCloseStart(effects, ok, nok) {
      let size = 0;
      return startBefore;

      /**
       *
       *
       * @type {State}
       */
      function startBefore(code) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return start;
      }

      /**
       * Before closing fence, at optional whitespace.
       *
       * ```markdown
       *   | ~~~js
       *   | alert(1)
       * > | ~~~
       *     ^
       * ```
       *
       * @type {State}
       */
      function start(code) {
        // Always populated by defaults.

        // To do: `enter` here or in next state?
        effects.enter("codeFencedFence");
        return markdownSpace(code) ? factorySpace(effects, beforeSequenceClose, "linePrefix", self.parser.constructs.disable.null.includes('codeIndented') ? undefined : 4)(code) : beforeSequenceClose(code);
      }

      /**
       * In closing fence, after optional whitespace, at sequence.
       *
       * ```markdown
       *   | ~~~js
       *   | alert(1)
       * > | ~~~
       *     ^
       * ```
       *
       * @type {State}
       */
      function beforeSequenceClose(code) {
        if (code === marker) {
          effects.enter("codeFencedFenceSequence");
          return sequenceClose(code);
        }
        return nok(code);
      }

      /**
       * In closing fence sequence.
       *
       * ```markdown
       *   | ~~~js
       *   | alert(1)
       * > | ~~~
       *     ^
       * ```
       *
       * @type {State}
       */
      function sequenceClose(code) {
        if (code === marker) {
          size++;
          effects.consume(code);
          return sequenceClose;
        }
        if (size >= sizeOpen) {
          effects.exit("codeFencedFenceSequence");
          return markdownSpace(code) ? factorySpace(effects, sequenceCloseAfter, "whitespace")(code) : sequenceCloseAfter(code);
        }
        return nok(code);
      }

      /**
       * After closing fence sequence, after optional whitespace.
       *
       * ```markdown
       *   | ~~~js
       *   | alert(1)
       * > | ~~~
       *        ^
       * ```
       *
       * @type {State}
       */
      function sequenceCloseAfter(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit("codeFencedFence");
          return ok(code);
        }
        return nok(code);
      }
    }
  }

  /**
   * @import {
   *   Construct,
   *   State,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const codeIndented = {
    name: 'codeIndented',
    tokenize: tokenizeCodeIndented
  };

  /** @type {Construct} */
  const furtherStart = {
    partial: true,
    tokenize: tokenizeFurtherStart
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeCodeIndented(effects, ok, nok) {
    return start;

    /**
     * Start of code (indented).
     *
     * > **Parsing note**: it is not needed to check if this first line is a
     * > filled line (that it has a non-whitespace character), because blank lines
     * > are parsed already, so we never run into that.
     *
     * ```markdown
     * > |     aaa
     *     ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      // To do: manually check if interrupting like `markdown-rs`.

      effects.enter("codeIndented");
      return factorySpaceMinMax(effects, atBreak, nok, "linePrefix", 4, 4)(code);
    }

    /**
     * At a break.
     *
     * ```markdown
     * > |     aaa
     *         ^  ^
     * ```
     *
     * @type {State}
     */
    function atBreak(code) {
      if (code === null) {
        return after(code);
      }
      if (markdownLineEnding(code)) {
        return effects.attempt(furtherStart, atBreak, after)(code);
      }
      effects.enter("codeFlowValue");
      return inside(code);
    }

    /**
     * In code content.
     *
     * ```markdown
     * > |     aaa
     *         ^^^^
     * ```
     *
     * @type {State}
     */
    function inside(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit("codeFlowValue");
        return atBreak(code);
      }
      effects.consume(code);
      return inside;
    }

    /** @type {State} */
    function after(code) {
      effects.exit("codeIndented");
      // To do: allow interrupting like `markdown-rs`.
      // Feel free to interrupt.
      // tokenizer.interrupt = false
      return ok(code);
    }
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeFurtherStart(effects, ok, nok) {
    const self = this;
    return furtherStart;

    /**
     * At eol, trying to parse another indent.
     *
     * ```markdown
     * > |     aaa
     *            ^
     *   |     bbb
     * ```
     *
     * @type {State}
     */
    function furtherStart(code) {
      // To do: improve `lazy` / `pierce` handling.
      // If this is a lazy line, it can’t be code.
      if (self.parser.lazy[self.now().line]) {
        return nok(code);
      }
      if (markdownLineEnding(code)) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return furtherStart;
      }

      // To do: the code here in `micromark-js` is a bit different from
      // `markdown-rs` because there it can attempt spaces.
      // We can’t yet.
      return factorySpaceMinMax(effects, ok, onNotEnoughPrefix, "linePrefix", 4, 4)(code);
    }

    /**
     * After not enough of a prefix.
     *
     * A following line ending is another (potentially blank) line to try,
     * anything else means this isn’t a continuation.
     *
     * ```markdown
     * > |     aaa
     *
     *   |     bbb
     * ```
     *
     * @type {State}
     */
    function onNotEnoughPrefix(code) {
      return markdownLineEnding(code) ? furtherStart(code) : nok(code);
    }
  }

  /**
   * @import {
   *   Construct,
   *   Previous,
   *   Resolver,
   *   State,
   *   TokenizeContext,
   *   Tokenizer,
   *   Token
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const codeText = {
    name: 'codeText',
    previous: previous$1,
    resolve: resolveCodeText,
    tokenize: tokenizeCodeText
  };

  // To do: next major: don’t resolve, like `markdown-rs`.
  /** @type {Resolver} */
  function resolveCodeText(events) {
    let tailExitIndex = events.length - 4;
    let headEnterIndex = 3;
    /** @type {number} */
    let index;
    /** @type {number | undefined} */
    let enter;

    // If we start and end with an EOL or a space.
    if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === 'space') && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === 'space')) {
      index = headEnterIndex;

      // And we have data.
      while (++index < tailExitIndex) {
        if (events[index][1].type === "codeTextData") {
          // Then we have padding.
          events[headEnterIndex][1].type = "codeTextPadding";
          events[tailExitIndex][1].type = "codeTextPadding";
          headEnterIndex += 2;
          tailExitIndex -= 2;
          break;
        }
      }
    }

    // Merge adjacent spaces and data.
    index = headEnterIndex - 1;
    tailExitIndex++;
    while (++index <= tailExitIndex) {
      if (enter === undefined) {
        if (index !== tailExitIndex && events[index][1].type !== "lineEnding") {
          enter = index;
        }
      } else if (index === tailExitIndex || events[index][1].type === "lineEnding") {
        events[enter][1].type = "codeTextData";
        if (index !== enter + 2) {
          events[enter][1].end = events[index - 1][1].end;
          events.splice(enter + 2, index - enter - 2);
          tailExitIndex -= index - enter - 2;
          index = enter + 2;
        }
        enter = undefined;
      }
    }
    return events;
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Previous}
   */
  function previous$1(code) {
    // If there is a previous code, there will always be a tail.
    return code !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeCodeText(effects, ok, nok) {
    let sizeOpen = 0;
    /** @type {number} */
    let size;
    /** @type {Token} */
    let token;
    return start;

    /**
     * Start of code (text).
     *
     * ```markdown
     * > | `a`
     *     ^
     * > | \`a`
     *      ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      effects.enter("codeText");
      effects.enter("codeTextSequence");
      return sequenceOpen(code);
    }

    /**
     * In opening sequence.
     *
     * ```markdown
     * > | `a`
     *     ^
     * ```
     *
     * @type {State}
     */
    function sequenceOpen(code) {
      if (code === 96) {
        effects.consume(code);
        sizeOpen++;
        return sequenceOpen;
      }
      effects.exit("codeTextSequence");
      return between(code);
    }

    /**
     * Between something and something else.
     *
     * ```markdown
     * > | `a`
     *      ^^
     * ```
     *
     * @type {State}
     */
    function between(code) {
      // EOF.
      if (code === null) {
        return nok(code);
      }

      // To do: next major: don’t do spaces in resolve, but when compiling,
      // like `markdown-rs`.
      // Tabs don’t work, and virtual spaces don’t make sense.
      if (code === 32) {
        effects.enter('space');
        effects.consume(code);
        effects.exit('space');
        return between;
      }

      // Closing fence? Could also be data.
      if (code === 96) {
        token = effects.enter("codeTextSequence");
        size = 0;
        return sequenceClose(code);
      }
      if (markdownLineEnding(code)) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return between;
      }

      // Data.
      effects.enter("codeTextData");
      return data(code);
    }

    /**
     * In data.
     *
     * ```markdown
     * > | `a`
     *      ^
     * ```
     *
     * @type {State}
     */
    function data(code) {
      if (code === null || code === 32 || code === 96 || markdownLineEnding(code)) {
        effects.exit("codeTextData");
        return between(code);
      }
      effects.consume(code);
      return data;
    }

    /**
     * In closing sequence.
     *
     * ```markdown
     * > | `a`
     *       ^
     * ```
     *
     * @type {State}
     */
    function sequenceClose(code) {
      // More.
      if (code === 96) {
        effects.consume(code);
        size++;
        return sequenceClose;
      }

      // Done!
      if (size === sizeOpen) {
        effects.exit("codeTextSequence");
        effects.exit("codeText");
        return ok(code);
      }

      // More or less accents: mark as data.
      token.type = "codeTextData";
      return data(code);
    }
  }

  /**
   * Some of the internal operations of micromark do lots of editing
   * operations on very large arrays. This runs into problems with two
   * properties of most circa-2020 JavaScript interpreters:
   *
   *  - Array-length modifications at the high end of an array (push/pop) are
   *    expected to be common and are implemented in (amortized) time
   *    proportional to the number of elements added or removed, whereas
   *    other operations (shift/unshift and splice) are much less efficient.
   *  - Function arguments are passed on the stack, so adding tens of thousands
   *    of elements to an array with `arr.push(...newElements)` will frequently
   *    cause stack overflows. (see <https://stackoverflow.com/questions/22123769/rangeerror-maximum-call-stack-size-exceeded-why>)
   *
   * SpliceBuffers are an implementation of gap buffers, which are a
   * generalization of the "queue made of two stacks" idea. The splice buffer
   * maintains a cursor, and moving the cursor has cost proportional to the
   * distance the cursor moves, but inserting, deleting, or splicing in
   * new information at the cursor is as efficient as the push/pop operation.
   * This allows for an efficient sequence of splices (or pushes, pops, shifts,
   * or unshifts) as long such edits happen at the same part of the array or
   * generally sweep through the array from the beginning to the end.
   *
   * The interface for splice buffers also supports large numbers of inputs by
   * passing a single array argument rather passing multiple arguments on the
   * function call stack.
   *
   * @template T
   *   Item type.
   */
  class SpliceBuffer {
    /**
     * @param {ReadonlyArray<T> | null | undefined} [initial]
     *   Initial items (optional).
     * @returns
     *   Splice buffer.
     */
    constructor(initial) {
      /** @type {Array<T>} */
      this.left = initial ? [...initial] : [];
      /** @type {Array<T>} */
      this.right = [];
    }

    /**
     * Array access;
     * does not move the cursor.
     *
     * @param {number} index
     *   Index.
     * @return {T}
     *   Item.
     */
    get(index) {
      if (index < 0 || index >= this.left.length + this.right.length) {
        throw new RangeError('Cannot access index `' + index + '` in a splice buffer of size `' + (this.left.length + this.right.length) + '`');
      }
      if (index < this.left.length) return this.left[index];
      return this.right[this.right.length - index + this.left.length - 1];
    }

    /**
     * The length of the splice buffer, one greater than the largest index in the
     * array.
     */
    get length() {
      return this.left.length + this.right.length;
    }

    /**
     * Remove and return `list[0]`;
     * moves the cursor to `0`.
     *
     * @returns {T | undefined}
     *   Item, optional.
     */
    shift() {
      this.setCursor(0);
      return this.right.pop();
    }

    /**
     * Slice the buffer to get an array;
     * does not move the cursor.
     *
     * @param {number} start
     *   Start.
     * @param {number | null | undefined} [end]
     *   End (optional).
     * @returns {Array<T>}
     *   Array of items.
     */
    slice(start, end) {
      /** @type {number} */
      const stop = end === null || end === undefined ? Number.POSITIVE_INFINITY : end;
      if (stop < this.left.length) {
        return this.left.slice(start, stop);
      }
      if (start > this.left.length) {
        return this.right.slice(this.right.length - stop + this.left.length, this.right.length - start + this.left.length).reverse();
      }
      return this.left.slice(start).concat(this.right.slice(this.right.length - stop + this.left.length).reverse());
    }

    /**
     * Mimics the behavior of Array.prototype.splice() except for the change of
     * interface necessary to avoid segfaults when patching in very large arrays.
     *
     * This operation moves cursor is moved to `start` and results in the cursor
     * placed after any inserted items.
     *
     * @param {number} start
     *   Start;
     *   zero-based index at which to start changing the array;
     *   negative numbers count backwards from the end of the array and values
     *   that are out-of bounds are clamped to the appropriate end of the array.
     * @param {number | null | undefined} [deleteCount=0]
     *   Delete count (default: `0`);
     *   maximum number of elements to delete, starting from start.
     * @param {Array<T> | null | undefined} [items=[]]
     *   Items to include in place of the deleted items (default: `[]`).
     * @return {Array<T>}
     *   Any removed items.
     */
    splice(start, deleteCount, items) {
      /** @type {number} */
      const count = deleteCount || 0;
      this.setCursor(Math.trunc(start));
      const removed = this.right.splice(this.right.length - count, Number.POSITIVE_INFINITY);
      if (items) chunkedPush(this.left, items);
      return removed.reverse();
    }

    /**
     * Remove and return the highest-numbered item in the array, so
     * `list[list.length - 1]`;
     * Moves the cursor to `length`.
     *
     * @returns {T | undefined}
     *   Item, optional.
     */
    pop() {
      this.setCursor(Number.POSITIVE_INFINITY);
      return this.left.pop();
    }

    /**
     * Inserts a single item to the high-numbered side of the array;
     * moves the cursor to `length`.
     *
     * @param {T} item
     *   Item.
     * @returns {undefined}
     *   Nothing.
     */
    push(item) {
      this.setCursor(Number.POSITIVE_INFINITY);
      this.left.push(item);
    }

    /**
     * Inserts many items to the high-numbered side of the array.
     * Moves the cursor to `length`.
     *
     * @param {Array<T>} items
     *   Items.
     * @returns {undefined}
     *   Nothing.
     */
    pushMany(items) {
      this.setCursor(Number.POSITIVE_INFINITY);
      chunkedPush(this.left, items);
    }

    /**
     * Inserts a single item to the low-numbered side of the array;
     * Moves the cursor to `0`.
     *
     * @param {T} item
     *   Item.
     * @returns {undefined}
     *   Nothing.
     */
    unshift(item) {
      this.setCursor(0);
      this.right.push(item);
    }

    /**
     * Inserts many items to the low-numbered side of the array;
     * moves the cursor to `0`.
     *
     * @param {Array<T>} items
     *   Items.
     * @returns {undefined}
     *   Nothing.
     */
    unshiftMany(items) {
      this.setCursor(0);
      chunkedPush(this.right, items.reverse());
    }

    /**
     * Move the cursor to a specific position in the array. Requires
     * time proportional to the distance moved.
     *
     * If `n < 0`, the cursor will end up at the beginning.
     * If `n > length`, the cursor will end up at the end.
     *
     * @param {number} n
     *   Position.
     * @return {undefined}
     *   Nothing.
     */
    setCursor(n) {
      if (n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0) return;
      if (n < this.left.length) {
        // Move cursor to the this.left
        const removed = this.left.splice(n, Number.POSITIVE_INFINITY);
        chunkedPush(this.right, removed.reverse());
      } else {
        // Move cursor to the this.right
        const removed = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        chunkedPush(this.left, removed.reverse());
      }
    }
  }

  /**
   * Avoid stack overflow by pushing items onto the stack in segments
   *
   * @template T
   *   Item type.
   * @param {Array<T>} list
   *   List to inject into.
   * @param {ReadonlyArray<T>} right
   *   Items to inject.
   * @return {undefined}
   *   Nothing.
   */
  function chunkedPush(list, right) {
    /** @type {number} */
    let chunkStart = 0;
    if (right.length < 10000) {
      list.push(...right);
    } else {
      while (chunkStart < right.length) {
        list.push(...right.slice(chunkStart, chunkStart + 10000));
        chunkStart += 10000;
      }
    }
  }

  /**
   * @import {Chunk, Event, Token} from 'micromark-util-types'
   */


  /**
   * Tokenize subcontent.
   *
   * @param {Array<Event>} eventsArray
   *   List of events.
   * @returns {boolean}
   *   Whether subtokens were found.
   */
  // eslint-disable-next-line complexity
  function subtokenize(eventsArray) {
    /** @type {Record<string, number>} */
    const jumps = {};
    let index = -1;
    /** @type {Event} */
    let event;
    /** @type {number | undefined} */
    let lineIndex;
    /** @type {number} */
    let otherIndex;
    /** @type {Event} */
    let otherEvent;
    /** @type {Array<Event>} */
    let parameters;
    /** @type {Array<Event>} */
    let subevents;
    /** @type {boolean | undefined} */
    let more;
    const events = new SpliceBuffer(eventsArray);
    while (++index < events.length) {
      while (index in jumps) {
        index = jumps[index];
      }
      event = events.get(index);

      // Add a hook for the GFM tasklist extension, which needs to know if text
      // is in the first content of a list item.
      if (index && event[1].type === "chunkFlow" && events.get(index - 1)[1].type === "listItemPrefix") {
        subevents = event[1]._tokenizer.events;
        otherIndex = 0;
        if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
          otherIndex += 2;
        }
        if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
          while (++otherIndex < subevents.length) {
            if (subevents[otherIndex][1].type === "content") {
              break;
            }
            if (subevents[otherIndex][1].type === "chunkText") {
              subevents[otherIndex][1]._isInFirstContentOfListItem = true;
              otherIndex++;
            }
          }
        }
      }

      // Enter.
      if (event[0] === 'enter') {
        if (event[1].contentType) {
          Object.assign(jumps, subcontent(events, index));
          index = jumps[index];
          more = true;
        }
      }
      // Exit.
      else if (event[1]._container) {
        otherIndex = index;
        lineIndex = undefined;
        while (otherIndex--) {
          otherEvent = events.get(otherIndex);
          if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
            if (otherEvent[0] === 'enter') {
              if (lineIndex) {
                events.get(lineIndex)[1].type = "lineEndingBlank";
              }
              otherEvent[1].type = "lineEnding";
              lineIndex = otherIndex;
            }
          } else if (otherEvent[1].type === "linePrefix" || otherEvent[1].type === "listItemIndent") ; else {
            break;
          }
        }
        if (lineIndex) {
          // Fix position.
          event[1].end = {
            ...events.get(lineIndex)[1].start
          };

          // Switch container exit w/ line endings.
          parameters = events.slice(lineIndex, index);
          parameters.unshift(event);
          events.splice(lineIndex, index - lineIndex + 1, parameters);
        }
      }
    }

    // The changes to the `events` buffer must be copied back into the eventsArray
    splice(eventsArray, 0, Number.POSITIVE_INFINITY, events.slice(0));
    return !more;
  }

  /**
   * Tokenize embedded tokens.
   *
   * @param {SpliceBuffer<Event>} events
   *   Events.
   * @param {number} eventIndex
   *   Index.
   * @returns {Record<string, number>}
   *   Gaps.
   */
  function subcontent(events, eventIndex) {
    const token = events.get(eventIndex)[1];
    const context = events.get(eventIndex)[2];
    let startPosition = eventIndex - 1;
    /** @type {Array<number>} */
    const startPositions = [];
    let tokenizer = token._tokenizer;
    if (!tokenizer) {
      tokenizer = context.parser[token.contentType](token.start);
      if (token._contentTypeTextTrailing) {
        tokenizer._contentTypeTextTrailing = true;
      }
    }
    const childEvents = tokenizer.events;
    /** @type {Array<[number, number]>} */
    const jumps = [];
    /** @type {Record<string, number>} */
    const gaps = {};
    /** @type {Array<Chunk>} */
    let stream;
    /** @type {Token | undefined} */
    let previous;
    let index = -1;
    /** @type {Token | undefined} */
    let current = token;
    let adjust = 0;
    let start = 0;
    const breaks = [start];

    // Loop forward through the linked tokens to pass them in order to the
    // subtokenizer.
    while (current) {
      // Find the position of the event for this token.
      while (events.get(++startPosition)[1] !== current) {
        // Empty.
      }
      startPositions.push(startPosition);
      if (!current._tokenizer) {
        stream = context.sliceStream(current);
        if (!current.next) {
          stream.push(null);
        }
        if (previous) {
          tokenizer.defineSkip(current.start);
        }
        if (current._isInFirstContentOfListItem) {
          tokenizer._gfmTasklistFirstContentOfListItem = true;
        }
        tokenizer.write(stream);
        if (current._isInFirstContentOfListItem) {
          tokenizer._gfmTasklistFirstContentOfListItem = undefined;
        }
      }

      // Unravel the next token.
      previous = current;
      current = current.next;
    }

    // Now, loop back through all events (and linked tokens), to figure out which
    // parts belong where.
    current = token;
    while (++index < childEvents.length) {
      if (
      // Find a void token that includes a break.
      childEvents[index][0] === 'exit' && childEvents[index - 1][0] === 'enter' && childEvents[index][1].type === childEvents[index - 1][1].type && childEvents[index][1].start.line !== childEvents[index][1].end.line) {
        start = index + 1;
        breaks.push(start);
        // Help GC.
        current._tokenizer = undefined;
        current.previous = undefined;
        current = current.next;
      }
    }

    // Help GC.
    tokenizer.events = [];

    // If there’s one more token (which is the cases for lines that end in an
    // EOF), that’s perfect: the last point we found starts it.
    // If there isn’t then make sure any remaining content is added to it.
    if (current) {
      // Help GC.
      current._tokenizer = undefined;
      current.previous = undefined;
    } else {
      breaks.pop();
    }

    // Now splice the events from the subtokenizer into the current events,
    // moving back to front so that splice indices aren’t affected.
    index = breaks.length;
    while (index--) {
      const slice = childEvents.slice(breaks[index], breaks[index + 1]);
      const start = startPositions.pop();
      jumps.push([start, start + slice.length - 1]);
      events.splice(start, 2, slice);
    }
    jumps.reverse();
    index = -1;
    while (++index < jumps.length) {
      gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
      adjust += jumps[index][1] - jumps[index][0] - 1;
    }
    return gaps;
  }

  /**
   * @import {
   *   Construct,
   *   Resolver,
   *   State,
   *   TokenizeContext,
   *   Tokenizer,
   *   Token
   * } from 'micromark-util-types'
   */

  /**
   * No name because it must not be turned off.
   * @type {Construct}
   */
  const content = {
    resolve: resolveContent,
    tokenize: tokenizeContent
  };

  /** @type {Construct} */
  const continuationConstruct = {
    partial: true,
    tokenize: tokenizeContinuation
  };

  /**
   * Content is transparent: it’s parsed right now. That way, definitions are also
   * parsed right now: before text in paragraphs (specifically, media) are parsed.
   *
   * @type {Resolver}
   */
  function resolveContent(events) {
    subtokenize(events);
    return events;
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeContent(effects, ok) {
    /** @type {Token | undefined} */
    let previous;
    return chunkStart;

    /**
     * Before a content chunk.
     *
     * ```markdown
     * > | abc
     *     ^
     * ```
     *
     * @type {State}
     */
    function chunkStart(code) {
      effects.enter("content");
      previous = effects.enter("chunkContent", {
        contentType: "content"
      });
      return chunkInside(code);
    }

    /**
     * In a content chunk.
     *
     * ```markdown
     * > | abc
     *     ^^^
     * ```
     *
     * @type {State}
     */
    function chunkInside(code) {
      if (code === null) {
        return contentEnd(code);
      }

      // To do: in `markdown-rs`, each line is parsed on its own, and everything
      // is stitched together resolving.
      if (markdownLineEnding(code)) {
        return effects.check(continuationConstruct, contentContinue, contentEnd)(code);
      }

      // Data.
      effects.consume(code);
      return chunkInside;
    }

    /**
     *
     *
     * @type {State}
     */
    function contentEnd(code) {
      effects.exit("chunkContent");
      effects.exit("content");
      return ok(code);
    }

    /**
     *
     *
     * @type {State}
     */
    function contentContinue(code) {
      effects.consume(code);
      effects.exit("chunkContent");
      previous.next = effects.enter("chunkContent", {
        contentType: "content",
        previous
      });
      previous = previous.next;
      return chunkInside;
    }
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeContinuation(effects, ok, nok) {
    const self = this;
    return startLookahead;

    /**
     *
     *
     * @type {State}
     */
    function startLookahead(code) {
      effects.exit("chunkContent");
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return factorySpace(effects, prefixed, "linePrefix");
    }

    /**
     *
     *
     * @type {State}
     */
    function prefixed(code) {
      if (code === null || markdownLineEnding(code)) {
        return nok(code);
      }

      // Always populated by defaults.

      const tail = self.events[self.events.length - 1];
      if (!self.parser.constructs.disable.null.includes('codeIndented') && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
        return ok(code);
      }
      return effects.interrupt(self.parser.constructs.flow, nok, ok)(code);
    }
  }

  /**
   * @import {Effects, State, TokenType} from 'micromark-util-types'
   */

  /**
   * Parse destinations.
   *
   * ###### Examples
   *
   * ```markdown
   * <a>
   * <a\>b>
   * <a b>
   * <a)>
   * a
   * a\)b
   * a(b)c
   * a(b)
   * ```
   *
   * @param {Effects} effects
   *   Context.
   * @param {State} ok
   *   State switched to when successful.
   * @param {State} nok
   *   State switched to when unsuccessful.
   * @param {TokenType} type
   *   Type for whole (`<a>` or `b`).
   * @param {TokenType} literalType
   *   Type when enclosed (`<a>`).
   * @param {TokenType} literalMarkerType
   *   Type for enclosing (`<` and `>`).
   * @param {TokenType} rawType
   *   Type when not enclosed (`b`).
   * @param {TokenType} stringType
   *   Type for the value (`a` or `b`).
   * @param {number | undefined} [max=Infinity]
   *   Depth of nested parens (inclusive).
   * @returns {State}
   *   Start state.
   */
  function factoryDestination(effects, ok, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
    const limit = max || Number.POSITIVE_INFINITY;
    let balance = 0;
    return start;

    /**
     * Start of destination.
     *
     * ```markdown
     * > | <aa>
     *     ^
     * > | aa
     *     ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      if (code === 60) {
        effects.enter(type);
        effects.enter(literalType);
        effects.enter(literalMarkerType);
        effects.consume(code);
        effects.exit(literalMarkerType);
        return enclosedBefore;
      }

      // ASCII control, space, closing paren.
      if (code === null || code === 32 || code === 41 || asciiControl(code)) {
        return nok(code);
      }
      effects.enter(type);
      effects.enter(rawType);
      effects.enter(stringType);
      effects.enter("chunkString", {
        contentType: "string"
      });
      return raw(code);
    }

    /**
     * After `<`, at an enclosed destination.
     *
     * ```markdown
     * > | <aa>
     *      ^
     * ```
     *
     * @type {State}
     */
    function enclosedBefore(code) {
      if (code === 62) {
        effects.enter(literalMarkerType);
        effects.consume(code);
        effects.exit(literalMarkerType);
        effects.exit(literalType);
        effects.exit(type);
        return ok;
      }
      effects.enter(stringType);
      effects.enter("chunkString", {
        contentType: "string"
      });
      return enclosed(code);
    }

    /**
     * In enclosed destination.
     *
     * ```markdown
     * > | <aa>
     *      ^
     * ```
     *
     * @type {State}
     */
    function enclosed(code) {
      if (code === 62) {
        effects.exit("chunkString");
        effects.exit(stringType);
        return enclosedBefore(code);
      }
      if (code === null || code === 60 || markdownLineEnding(code)) {
        return nok(code);
      }
      effects.consume(code);
      return code === 92 ? enclosedEscape : enclosed;
    }

    /**
     * After `\`, at a special character.
     *
     * ```markdown
     * > | <a\*a>
     *        ^
     * ```
     *
     * @type {State}
     */
    function enclosedEscape(code) {
      if (code === 60 || code === 62 || code === 92) {
        effects.consume(code);
        return enclosed;
      }
      return enclosed(code);
    }

    /**
     * In raw destination.
     *
     * ```markdown
     * > | aa
     *     ^
     * ```
     *
     * @type {State}
     */
    function raw(code) {
      if (!balance && (code === null || code === 41 || markdownLineEndingOrSpace(code))) {
        effects.exit("chunkString");
        effects.exit(stringType);
        effects.exit(rawType);
        effects.exit(type);
        return ok(code);
      }
      if (balance < limit && code === 40) {
        effects.consume(code);
        balance++;
        return raw;
      }
      if (code === 41) {
        effects.consume(code);
        balance--;
        return raw;
      }

      // ASCII control (but *not* `\0`) and space and `(`.
      // Note: in `markdown-rs`, `\0` exists in codes, in `micromark-js` it
      // doesn’t.
      if (code === null || code === 32 || code === 40 || asciiControl(code)) {
        return nok(code);
      }
      effects.consume(code);
      return code === 92 ? rawEscape : raw;
    }

    /**
     * After `\`, at special character.
     *
     * ```markdown
     * > | a\*a
     *       ^
     * ```
     *
     * @type {State}
     */
    function rawEscape(code) {
      if (code === 40 || code === 41 || code === 92) {
        effects.consume(code);
        return raw;
      }
      return raw(code);
    }
  }

  /**
   * @import {
   *   Effects,
   *   State,
   *   TokenizeContext,
   *   TokenType
   * } from 'micromark-util-types'
   */

  /**
   * Parse labels.
   *
   * > 👉 **Note**: labels in markdown are capped at 999 characters in the string.
   *
   * ###### Examples
   *
   * ```markdown
   * [a]
   * [a
   * b]
   * [a\]b]
   * ```
   *
   * @this {TokenizeContext}
   *   Tokenize context.
   * @param {Effects} effects
   *   Context.
   * @param {State} ok
   *   State switched to when successful.
   * @param {State} nok
   *   State switched to when unsuccessful.
   * @param {TokenType} type
   *   Type of the whole label (`[a]`).
   * @param {TokenType} markerType
   *   Type for the markers (`[` and `]`).
   * @param {TokenType} stringType
   *   Type for the identifier (`a`).
   * @returns {State}
   *   Start state.
   */
  function factoryLabel(effects, ok, nok, type, markerType, stringType) {
    const self = this;
    let size = 0;
    /** @type {boolean} */
    let seen;
    return start;

    /**
     * Start of label.
     *
     * ```markdown
     * > | [a]
     *     ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      effects.enter(type);
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.enter(stringType);
      return atBreak;
    }

    /**
     * In label, at something, before something else.
     *
     * ```markdown
     * > | [a]
     *      ^
     * ```
     *
     * @type {State}
     */
    function atBreak(code) {
      if (size > 999 || code === null || code === 91 || code === 93 && !seen ||
      // To do: remove in the future once we’ve switched from
      // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
      // which doesn’t need this.
      // Hidden footnotes hook.
      /* c8 ignore next 3 */
      code === 94 && !size && '_hiddenFootnoteSupport' in self.parser.constructs) {
        return nok(code);
      }
      if (code === 93) {
        effects.exit(stringType);
        effects.enter(markerType);
        effects.consume(code);
        effects.exit(markerType);
        effects.exit(type);
        return ok;
      }

      // To do: indent? Link chunks and EOLs together?
      if (markdownLineEnding(code)) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return atBreak;
      }
      effects.enter("chunkString", {
        contentType: "string"
      });
      return labelInside(code);
    }

    /**
     * In label, in text.
     *
     * ```markdown
     * > | [a]
     *      ^
     * ```
     *
     * @type {State}
     */
    function labelInside(code) {
      if (code === null || code === 91 || code === 93 || markdownLineEnding(code) || size++ > 999) {
        effects.exit("chunkString");
        return atBreak(code);
      }
      effects.consume(code);
      if (!seen) seen = !markdownSpace(code);
      return code === 92 ? labelEscape : labelInside;
    }

    /**
     * After `\`, at a special character.
     *
     * ```markdown
     * > | [a\*a]
     *        ^
     * ```
     *
     * @type {State}
     */
    function labelEscape(code) {
      if (code === 91 || code === 92 || code === 93) {
        effects.consume(code);
        size++;
        return labelInside;
      }
      return labelInside(code);
    }
  }

  /**
   * @import {
   *   Code,
   *   Effects,
   *   State,
   *   TokenType
   * } from 'micromark-util-types'
   */

  /**
   * Parse titles.
   *
   * ###### Examples
   *
   * ```markdown
   * "a"
   * 'b'
   * (c)
   * "a
   * b"
   * 'a
   *     b'
   * (a\)b)
   * ```
   *
   * @param {Effects} effects
   *   Context.
   * @param {State} ok
   *   State switched to when successful.
   * @param {State} nok
   *   State switched to when unsuccessful.
   * @param {TokenType} type
   *   Type of the whole title (`"a"`, `'b'`, `(c)`).
   * @param {TokenType} markerType
   *   Type for the markers (`"`, `'`, `(`, and `)`).
   * @param {TokenType} stringType
   *   Type for the value (`a`).
   * @returns {State}
   *   Start state.
   */
  function factoryTitle(effects, ok, nok, type, markerType, stringType) {
    /** @type {NonNullable<Code>} */
    let marker;
    return start;

    /**
     * Start of title.
     *
     * ```markdown
     * > | "a"
     *     ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      if (code === 34 || code === 39 || code === 40) {
        effects.enter(type);
        effects.enter(markerType);
        effects.consume(code);
        effects.exit(markerType);
        marker = code === 40 ? 41 : code;
        return begin;
      }
      return nok(code);
    }

    /**
     * After opening marker.
     *
     * This is also used at the closing marker.
     *
     * ```markdown
     * > | "a"
     *      ^
     * ```
     *
     * @type {State}
     */
    function begin(code) {
      if (code === marker) {
        effects.enter(markerType);
        effects.consume(code);
        effects.exit(markerType);
        effects.exit(type);
        return ok;
      }
      effects.enter(stringType);
      return atBreak(code);
    }

    /**
     * At something, before something else.
     *
     * ```markdown
     * > | "a"
     *      ^
     * ```
     *
     * @type {State}
     */
    function atBreak(code) {
      if (code === marker) {
        effects.exit(stringType);
        return begin(marker);
      }
      if (code === null) {
        return nok(code);
      }

      // Note: blank lines can’t exist in content.
      if (markdownLineEnding(code)) {
        // To do: use `space_or_tab_eol_with_options`, connect.
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return factorySpace(effects, atBreak, "linePrefix");
      }
      effects.enter("chunkString", {
        contentType: "string"
      });
      return inside(code);
    }

    /**
     *
     *
     * @type {State}
     */
    function inside(code) {
      if (code === marker || code === null || markdownLineEnding(code)) {
        effects.exit("chunkString");
        return atBreak(code);
      }
      effects.consume(code);
      return code === 92 ? escape : inside;
    }

    /**
     * After `\`, at a special character.
     *
     * ```markdown
     * > | "a\*b"
     *      ^
     * ```
     *
     * @type {State}
     */
    function escape(code) {
      if (code === marker || code === 92) {
        effects.consume(code);
        return inside;
      }
      return inside(code);
    }
  }

  /**
   * @import {Effects, State} from 'micromark-util-types'
   */

  /**
   * Parse spaces and tabs.
   *
   * There is no `nok` parameter:
   *
   * *   line endings or spaces in markdown are often optional, in which case this
   *     factory can be used and `ok` will be switched to whether spaces were found
   *     or not
   * *   one line ending or space can be detected with
   *     `markdownLineEndingOrSpace(code)` right before using `factoryWhitespace`
   *
   * @param {Effects} effects
   *   Context.
   * @param {State} ok
   *   State switched to when successful.
   * @returns {State}
   *   Start state.
   */
  function factoryWhitespace(effects, ok) {
    /** @type {boolean} */
    let seen;
    return start;

    /** @type {State} */
    function start(code) {
      if (markdownLineEnding(code)) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        seen = true;
        return start;
      }
      if (markdownSpace(code)) {
        return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code);
      }
      return ok(code);
    }
  }

  /**
   * @import {
   *   Construct,
   *   State,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const definition$1 = {
    name: 'definition',
    tokenize: tokenizeDefinition
  };

  /** @type {Construct} */
  const titleBefore = {
    partial: true,
    tokenize: tokenizeTitleBefore
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeDefinition(effects, ok, nok) {
    const self = this;
    /** @type {string} */
    let identifier;
    return start;

    /**
     * At start of a definition.
     *
     * ```markdown
     * > | [a]: b "c"
     *     ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      // Do not interrupt paragraphs (but do follow definitions).
      // To do: do `interrupt` the way `markdown-rs` does.
      // To do: parse whitespace the way `markdown-rs` does.
      effects.enter("definition");
      return before(code);
    }

    /**
     * After optional whitespace, at `[`.
     *
     * ```markdown
     * > | [a]: b "c"
     *     ^
     * ```
     *
     * @type {State}
     */
    function before(code) {
      // To do: parse whitespace the way `markdown-rs` does.

      return factoryLabel.call(self, effects, labelAfter,
      // Note: we don’t need to reset the way `markdown-rs` does.
      nok, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(code);
    }

    /**
     * After label.
     *
     * ```markdown
     * > | [a]: b "c"
     *        ^
     * ```
     *
     * @type {State}
     */
    function labelAfter(code) {
      identifier = normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1));
      if (code === 58) {
        effects.enter("definitionMarker");
        effects.consume(code);
        effects.exit("definitionMarker");
        return markerAfter;
      }
      return nok(code);
    }

    /**
     * After marker.
     *
     * ```markdown
     * > | [a]: b "c"
     *         ^
     * ```
     *
     * @type {State}
     */
    function markerAfter(code) {
      // Note: whitespace is optional.
      return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, destinationBefore)(code) : destinationBefore(code);
    }

    /**
     * Before destination.
     *
     * ```markdown
     * > | [a]: b "c"
     *          ^
     * ```
     *
     * @type {State}
     */
    function destinationBefore(code) {
      return factoryDestination(effects, destinationAfter,
      // Note: we don’t need to reset the way `markdown-rs` does.
      nok, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(code);
    }

    /**
     * After destination.
     *
     * ```markdown
     * > | [a]: b "c"
     *           ^
     * ```
     *
     * @type {State}
     */
    function destinationAfter(code) {
      return effects.attempt(titleBefore, after, after)(code);
    }

    /**
     * After definition.
     *
     * ```markdown
     * > | [a]: b
     *           ^
     * > | [a]: b "c"
     *               ^
     * ```
     *
     * @type {State}
     */
    function after(code) {
      return markdownSpace(code) ? factorySpace(effects, afterWhitespace, "whitespace")(code) : afterWhitespace(code);
    }

    /**
     * After definition, after optional whitespace.
     *
     * ```markdown
     * > | [a]: b
     *           ^
     * > | [a]: b "c"
     *               ^
     * ```
     *
     * @type {State}
     */
    function afterWhitespace(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit("definition");

        // Note: we don’t care about uniqueness.
        // It’s likely that that doesn’t happen very frequently.
        // It is more likely that it wastes precious time.
        self.parser.defined.push(identifier);

        // To do: `markdown-rs` interrupt.
        // // You’d be interrupting.
        // tokenizer.interrupt = true
        return ok(code);
      }
      return nok(code);
    }
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeTitleBefore(effects, ok, nok) {
    return titleBefore;

    /**
     * After destination, at whitespace.
     *
     * ```markdown
     * > | [a]: b
     *           ^
     * > | [a]: b "c"
     *           ^
     * ```
     *
     * @type {State}
     */
    function titleBefore(code) {
      return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, beforeMarker)(code) : nok(code);
    }

    /**
     * At title.
     *
     * ```markdown
     *   | [a]: b
     * > | "c"
     *     ^
     * ```
     *
     * @type {State}
     */
    function beforeMarker(code) {
      return factoryTitle(effects, titleAfter, nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code);
    }

    /**
     * After title.
     *
     * ```markdown
     * > | [a]: b "c"
     *               ^
     * ```
     *
     * @type {State}
     */
    function titleAfter(code) {
      return markdownSpace(code) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code) : titleAfterOptionalWhitespace(code);
    }

    /**
     * After title, after optional whitespace.
     *
     * ```markdown
     * > | [a]: b "c"
     *               ^
     * ```
     *
     * @type {State}
     */
    function titleAfterOptionalWhitespace(code) {
      return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
    }
  }

  /**
   * @import {
   *   Construct,
   *   State,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const hardBreakEscape = {
    name: 'hardBreakEscape',
    tokenize: tokenizeHardBreakEscape
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeHardBreakEscape(effects, ok, nok) {
    return start;

    /**
     * Start of a hard break (escape).
     *
     * ```markdown
     * > | a\
     *      ^
     *   | b
     * ```
     *
     * @type {State}
     */
    function start(code) {
      effects.enter("hardBreakEscape");
      effects.consume(code);
      return after;
    }

    /**
     * After `\`, at eol.
     *
     * ```markdown
     * > | a\
     *       ^
     *   | b
     * ```
     *
     *  @type {State}
     */
    function after(code) {
      if (markdownLineEnding(code)) {
        effects.exit("hardBreakEscape");
        return ok(code);
      }
      return nok(code);
    }
  }

  /**
   * @import {
   *   Construct,
   *   Resolver,
   *   State,
   *   TokenizeContext,
   *   Tokenizer,
   *   Token
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const headingAtx = {
    name: 'headingAtx',
    resolve: resolveHeadingAtx,
    tokenize: tokenizeHeadingAtx
  };

  /** @type {Resolver} */
  function resolveHeadingAtx(events, context) {
    let contentEnd = events.length - 2;
    let contentStart = 3;

    // Prefix whitespace, part of the opening.
    if (events[contentStart][1].type === "whitespace") {
      contentStart += 2;
    }

    // Suffix whitespace, part of the closing.
    if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") {
      contentEnd -= 2;
    }
    if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) {
      contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
    }
    if (contentEnd > contentStart) {
      const content = {
        type: "atxHeadingText",
        start: events[contentStart][1].start,
        end: events[contentEnd][1].end
      };
      const text = {
        type: "chunkText",
        start: events[contentStart][1].start,
        end: events[contentEnd][1].end,
        contentType: "text"
      };
      splice(events, contentStart, contentEnd - contentStart + 1, [['enter', content, context], ['enter', text, context], ['exit', text, context], ['exit', content, context]]);
    }
    return events;
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeHeadingAtx(effects, ok, nok) {
    let size = 0;
    return start;

    /**
     * Start of a heading (atx).
     *
     * ```markdown
     * > | ## aa
     *     ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      // To do: parse indent like `markdown-rs`.
      effects.enter("atxHeading");
      return before(code);
    }

    /**
     * After optional whitespace, at `#`.
     *
     * ```markdown
     * > | ## aa
     *     ^
     * ```
     *
     * @type {State}
     */
    function before(code) {
      effects.enter("atxHeadingSequence");
      return sequenceOpen(code);
    }

    /**
     * In opening sequence.
     *
     * ```markdown
     * > | ## aa
     *     ^
     * ```
     *
     * @type {State}
     */
    function sequenceOpen(code) {
      if (code === 35 && size++ < 6) {
        effects.consume(code);
        return sequenceOpen;
      }

      // Always at least one `#`.
      if (code === null || markdownLineEndingOrSpace(code)) {
        effects.exit("atxHeadingSequence");
        return atBreak(code);
      }
      return nok(code);
    }

    /**
     * After something, before something else.
     *
     * ```markdown
     * > | ## aa
     *       ^
     * ```
     *
     * @type {State}
     */
    function atBreak(code) {
      if (code === 35) {
        effects.enter("atxHeadingSequence");
        return sequenceFurther(code);
      }
      if (code === null || markdownLineEnding(code)) {
        effects.exit("atxHeading");
        // To do: interrupt like `markdown-rs`.
        // // Feel free to interrupt.
        // tokenizer.interrupt = false
        return ok(code);
      }
      if (markdownSpace(code)) {
        return factorySpace(effects, atBreak, "whitespace")(code);
      }

      // To do: generate `data` tokens, add the `text` token later.
      // Needs edit map, see: `markdown.rs`.
      effects.enter("atxHeadingText");
      return data(code);
    }

    /**
     * In further sequence (after whitespace).
     *
     * Could be normal “visible” hashes in the heading or a final sequence.
     *
     * ```markdown
     * > | ## aa ##
     *           ^
     * ```
     *
     * @type {State}
     */
    function sequenceFurther(code) {
      if (code === 35) {
        effects.consume(code);
        return sequenceFurther;
      }
      effects.exit("atxHeadingSequence");
      return atBreak(code);
    }

    /**
     * In text.
     *
     * ```markdown
     * > | ## aa
     *        ^
     * ```
     *
     * @type {State}
     */
    function data(code) {
      if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
        effects.exit("atxHeadingText");
        return atBreak(code);
      }
      effects.consume(code);
      return data;
    }
  }

  /**
   * List of lowercase HTML “block” tag names.
   *
   * The list, when parsing HTML (flow), results in more relaxed rules (condition
   * 6).
   * Because they are known blocks, the HTML-like syntax doesn’t have to be
   * strictly parsed.
   * For tag names not in this list, a more strict algorithm (condition 7) is used
   * to detect whether the HTML-like syntax is seen as HTML (flow) or not.
   *
   * This is copied from:
   * <https://spec.commonmark.org/0.30/#html-blocks>.
   *
   * > 👉 **Note**: `search` was added in `CommonMark@0.31`.
   */
  const htmlBlockNames = [
    'address',
    'article',
    'aside',
    'base',
    'basefont',
    'blockquote',
    'body',
    'caption',
    'center',
    'col',
    'colgroup',
    'dd',
    'details',
    'dialog',
    'dir',
    'div',
    'dl',
    'dt',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'frame',
    'frameset',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hr',
    'html',
    'iframe',
    'legend',
    'li',
    'link',
    'main',
    'menu',
    'menuitem',
    'nav',
    'noframes',
    'ol',
    'optgroup',
    'option',
    'p',
    'param',
    'search',
    'section',
    'summary',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'title',
    'tr',
    'track',
    'ul'
  ];

  /**
   * List of lowercase HTML “raw” tag names.
   *
   * The list, when parsing HTML (flow), results in HTML that can include lines
   * without exiting, until a closing tag also in this list is found (condition
   * 1).
   *
   * This module is copied from:
   * <https://spec.commonmark.org/0.30/#html-blocks>.
   *
   * > 👉 **Note**: `textarea` was added in `CommonMark@0.30`.
   */
  const htmlRawNames = ['pre', 'script', 'style', 'textarea'];

  /**
   * @import {
   *   Code,
   *   Construct,
   *   Resolver,
   *   State,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */


  /** @type {Construct} */
  const htmlFlow = {
    concrete: true,
    name: 'htmlFlow',
    resolveTo: resolveToHtmlFlow,
    tokenize: tokenizeHtmlFlow
  };

  /** @type {Construct} */
  const blankLineBefore = {
    partial: true,
    tokenize: tokenizeBlankLineBefore
  };

  /** @type {Resolver} */
  function resolveToHtmlFlow(events) {
    let index = events.length;
    while (index--) {
      if (events[index][0] === 'enter' && events[index][1].type === "htmlFlow") {
        break;
      }
    }
    if (index > 1 && events[index - 2][1].type === "linePrefix") {
      // Add the prefix start to the HTML token.
      events[index][1].start = events[index - 2][1].start;
      // Add the prefix start to the HTML line token.
      events[index + 1][1].start = events[index - 2][1].start;
      // Remove the line prefix.
      events.splice(index - 2, 2);
    }
    return events;
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeHtmlFlow(effects, ok, nok) {
    const self = this;
    /** @type {number} */
    let marker;
    /** @type {boolean} */
    let closingTag;
    /** @type {string} */
    let buffer;
    /** @type {number} */
    let index;
    /** @type {Code} */
    let markerB;
    return start;

    /**
     * Start of HTML (flow).
     *
     * ```markdown
     * > | <x />
     *     ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      // To do: parse indent like `markdown-rs`.
      return before(code);
    }

    /**
     * At `<`, after optional whitespace.
     *
     * ```markdown
     * > | <x />
     *     ^
     * ```
     *
     * @type {State}
     */
    function before(code) {
      effects.enter("htmlFlow");
      effects.enter("htmlFlowData");
      effects.consume(code);
      return open;
    }

    /**
     * After `<`, at tag name or other stuff.
     *
     * ```markdown
     * > | <x />
     *      ^
     * > | <!doctype>
     *      ^
     * > | <!--xxx-->
     *      ^
     * ```
     *
     * @type {State}
     */
    function open(code) {
      if (code === 33) {
        effects.consume(code);
        return declarationOpen;
      }
      if (code === 47) {
        effects.consume(code);
        closingTag = true;
        return tagCloseStart;
      }
      if (code === 63) {
        effects.consume(code);
        marker = 3;
        // To do:
        // tokenizer.concrete = true
        // To do: use `markdown-rs` style interrupt.
        // While we’re in an instruction instead of a declaration, we’re on a `?`
        // right now, so we do need to search for `>`, similar to declarations.
        return self.interrupt ? ok : continuationDeclarationInside;
      }

      // ASCII alphabetical.
      if (asciiAlpha(code)) {
        // Always the case.
        effects.consume(code);
        buffer = String.fromCharCode(code);
        return tagName;
      }
      return nok(code);
    }

    /**
     * After `<!`, at declaration, comment, or CDATA.
     *
     * ```markdown
     * > | <!doctype>
     *       ^
     * > | <!--xxx-->
     *       ^
     * > | <![CDATA[>&<]]>
     *       ^
     * ```
     *
     * @type {State}
     */
    function declarationOpen(code) {
      if (code === 45) {
        effects.consume(code);
        marker = 2;
        return commentOpenInside;
      }
      if (code === 91) {
        effects.consume(code);
        marker = 5;
        index = 0;
        return cdataOpenInside;
      }

      // ASCII alphabetical.
      if (asciiAlpha(code)) {
        effects.consume(code);
        marker = 4;
        // // Do not form containers.
        // tokenizer.concrete = true
        return self.interrupt ? ok : continuationDeclarationInside;
      }
      return nok(code);
    }

    /**
     * After `<!-`, inside a comment, at another `-`.
     *
     * ```markdown
     * > | <!--xxx-->
     *        ^
     * ```
     *
     * @type {State}
     */
    function commentOpenInside(code) {
      if (code === 45) {
        effects.consume(code);
        // // Do not form containers.
        // tokenizer.concrete = true
        return self.interrupt ? ok : continuationDeclarationInside;
      }
      return nok(code);
    }

    /**
     * After `<![`, inside CDATA, expecting `CDATA[`.
     *
     * ```markdown
     * > | <![CDATA[>&<]]>
     *        ^^^^^^
     * ```
     *
     * @type {State}
     */
    function cdataOpenInside(code) {
      const value = "CDATA[";
      if (code === value.charCodeAt(index++)) {
        effects.consume(code);
        if (index === value.length) {
          // // Do not form containers.
          // tokenizer.concrete = true
          return self.interrupt ? ok : continuation;
        }
        return cdataOpenInside;
      }
      return nok(code);
    }

    /**
     * After `</`, in closing tag, at tag name.
     *
     * ```markdown
     * > | </x>
     *       ^
     * ```
     *
     * @type {State}
     */
    function tagCloseStart(code) {
      if (asciiAlpha(code)) {
        // Always the case.
        effects.consume(code);
        buffer = String.fromCharCode(code);
        return tagName;
      }
      return nok(code);
    }

    /**
     * In tag name.
     *
     * ```markdown
     * > | <ab>
     *      ^^
     * > | </ab>
     *       ^^
     * ```
     *
     * @type {State}
     */
    function tagName(code) {
      if (code === null || code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
        const slash = code === 47;
        const name = buffer.toLowerCase();
        if (!slash && !closingTag && htmlRawNames.includes(name)) {
          marker = 1;
          // // Do not form containers.
          // tokenizer.concrete = true
          return self.interrupt ? ok(code) : continuation(code);
        }
        if (htmlBlockNames.includes(buffer.toLowerCase())) {
          marker = 6;
          if (slash) {
            effects.consume(code);
            return basicSelfClosing;
          }

          // // Do not form containers.
          // tokenizer.concrete = true
          return self.interrupt ? ok(code) : continuation(code);
        }
        marker = 7;
        // Do not support complete HTML when interrupting.
        return self.interrupt && !self.parser.lazy[self.now().line] ? nok(code) : closingTag ? completeClosingTagAfter(code) : completeAttributeNameBefore(code);
      }

      // ASCII alphanumerical and `-`.
      if (code === 45 || asciiAlphanumeric(code)) {
        effects.consume(code);
        buffer += String.fromCharCode(code);
        return tagName;
      }
      return nok(code);
    }

    /**
     * After closing slash of a basic tag name.
     *
     * ```markdown
     * > | <div/>
     *          ^
     * ```
     *
     * @type {State}
     */
    function basicSelfClosing(code) {
      if (code === 62) {
        effects.consume(code);
        // // Do not form containers.
        // tokenizer.concrete = true
        return self.interrupt ? ok : continuation;
      }
      return nok(code);
    }

    /**
     * After closing slash of a complete tag name.
     *
     * ```markdown
     * > | <x/>
     *        ^
     * ```
     *
     * @type {State}
     */
    function completeClosingTagAfter(code) {
      if (markdownSpace(code)) {
        effects.consume(code);
        return completeClosingTagAfter;
      }
      return completeEnd(code);
    }

    /**
     * At an attribute name.
     *
     * At first, this state is used after a complete tag name, after whitespace,
     * where it expects optional attributes or the end of the tag.
     * It is also reused after attributes, when expecting more optional
     * attributes.
     *
     * ```markdown
     * > | <a />
     *        ^
     * > | <a :b>
     *        ^
     * > | <a _b>
     *        ^
     * > | <a b>
     *        ^
     * > | <a >
     *        ^
     * ```
     *
     * @type {State}
     */
    function completeAttributeNameBefore(code) {
      if (code === 47) {
        effects.consume(code);
        return completeEnd;
      }

      // ASCII alphanumerical and `:` and `_`.
      if (code === 58 || code === 95 || asciiAlpha(code)) {
        effects.consume(code);
        return completeAttributeName;
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return completeAttributeNameBefore;
      }
      return completeEnd(code);
    }

    /**
     * In attribute name.
     *
     * ```markdown
     * > | <a :b>
     *         ^
     * > | <a _b>
     *         ^
     * > | <a b>
     *         ^
     * ```
     *
     * @type {State}
     */
    function completeAttributeName(code) {
      // ASCII alphanumerical and `-`, `.`, `:`, and `_`.
      if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
        effects.consume(code);
        return completeAttributeName;
      }
      return completeAttributeNameAfter(code);
    }

    /**
     * After attribute name, at an optional initializer, the end of the tag, or
     * whitespace.
     *
     * ```markdown
     * > | <a b>
     *         ^
     * > | <a b=c>
     *         ^
     * ```
     *
     * @type {State}
     */
    function completeAttributeNameAfter(code) {
      if (code === 61) {
        effects.consume(code);
        return completeAttributeValueBefore;
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return completeAttributeNameAfter;
      }
      return completeAttributeNameBefore(code);
    }

    /**
     * Before unquoted, double quoted, or single quoted attribute value, allowing
     * whitespace.
     *
     * ```markdown
     * > | <a b=c>
     *          ^
     * > | <a b="c">
     *          ^
     * ```
     *
     * @type {State}
     */
    function completeAttributeValueBefore(code) {
      if (code === null || code === 60 || code === 61 || code === 62 || code === 96) {
        return nok(code);
      }
      if (code === 34 || code === 39) {
        effects.consume(code);
        markerB = code;
        return completeAttributeValueQuoted;
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return completeAttributeValueBefore;
      }
      return completeAttributeValueUnquoted(code);
    }

    /**
     * In double or single quoted attribute value.
     *
     * ```markdown
     * > | <a b="c">
     *           ^
     * > | <a b='c'>
     *           ^
     * ```
     *
     * @type {State}
     */
    function completeAttributeValueQuoted(code) {
      if (code === markerB) {
        effects.consume(code);
        markerB = null;
        return completeAttributeValueQuotedAfter;
      }
      if (code === null || markdownLineEnding(code)) {
        return nok(code);
      }
      effects.consume(code);
      return completeAttributeValueQuoted;
    }

    /**
     * In unquoted attribute value.
     *
     * ```markdown
     * > | <a b=c>
     *          ^
     * ```
     *
     * @type {State}
     */
    function completeAttributeValueUnquoted(code) {
      if (code === null || code === 34 || code === 39 || code === 47 || code === 60 || code === 61 || code === 62 || code === 96 || markdownLineEndingOrSpace(code)) {
        return completeAttributeNameAfter(code);
      }
      effects.consume(code);
      return completeAttributeValueUnquoted;
    }

    /**
     * After double or single quoted attribute value, before whitespace or the
     * end of the tag.
     *
     * ```markdown
     * > | <a b="c">
     *            ^
     * ```
     *
     * @type {State}
     */
    function completeAttributeValueQuotedAfter(code) {
      if (code === 47 || code === 62 || markdownSpace(code)) {
        return completeAttributeNameBefore(code);
      }
      return nok(code);
    }

    /**
     * In certain circumstances of a complete tag where only an `>` is allowed.
     *
     * ```markdown
     * > | <a b="c">
     *             ^
     * ```
     *
     * @type {State}
     */
    function completeEnd(code) {
      if (code === 62) {
        effects.consume(code);
        return completeAfter;
      }
      return nok(code);
    }

    /**
     * After `>` in a complete tag.
     *
     * ```markdown
     * > | <x>
     *        ^
     * ```
     *
     * @type {State}
     */
    function completeAfter(code) {
      if (code === null || markdownLineEnding(code)) {
        // // Do not form containers.
        // tokenizer.concrete = true
        return continuation(code);
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return completeAfter;
      }
      return nok(code);
    }

    /**
     * In continuation of any HTML kind.
     *
     * ```markdown
     * > | <!--xxx-->
     *          ^
     * ```
     *
     * @type {State}
     */
    function continuation(code) {
      if (code === 45 && marker === 2) {
        effects.consume(code);
        return continuationCommentInside;
      }
      if (code === 60 && marker === 1) {
        effects.consume(code);
        return continuationRawTagOpen;
      }
      if (code === 62 && marker === 4) {
        effects.consume(code);
        return continuationClose;
      }
      if (code === 63 && marker === 3) {
        effects.consume(code);
        return continuationDeclarationInside;
      }
      if (code === 93 && marker === 5) {
        effects.consume(code);
        return continuationCdataInside;
      }
      if (markdownLineEnding(code) && (marker === 6 || marker === 7)) {
        effects.exit("htmlFlowData");
        return effects.check(blankLineBefore, continuationAfter, continuationStart)(code);
      }
      if (code === null || markdownLineEnding(code)) {
        effects.exit("htmlFlowData");
        return continuationStart(code);
      }
      effects.consume(code);
      return continuation;
    }

    /**
     * In continuation, at eol.
     *
     * ```markdown
     * > | <x>
     *        ^
     *   | asd
     * ```
     *
     * @type {State}
     */
    function continuationStart(code) {
      return effects.check(nonLazyContinuation, continuationStartNonLazy, continuationAfter)(code);
    }

    /**
     * In continuation, at eol, before non-lazy content.
     *
     * ```markdown
     * > | <x>
     *        ^
     *   | asd
     * ```
     *
     * @type {State}
     */
    function continuationStartNonLazy(code) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return continuationBefore;
    }

    /**
     * In continuation, before non-lazy content.
     *
     * ```markdown
     *   | <x>
     * > | asd
     *     ^
     * ```
     *
     * @type {State}
     */
    function continuationBefore(code) {
      if (code === null || markdownLineEnding(code)) {
        return continuationStart(code);
      }
      effects.enter("htmlFlowData");
      return continuation(code);
    }

    /**
     * In comment continuation, after one `-`, expecting another.
     *
     * ```markdown
     * > | <!--xxx-->
     *             ^
     * ```
     *
     * @type {State}
     */
    function continuationCommentInside(code) {
      if (code === 45) {
        effects.consume(code);
        return continuationDeclarationInside;
      }
      return continuation(code);
    }

    /**
     * In raw continuation, after `<`, at `/`.
     *
     * ```markdown
     * > | <script>console.log(1)</script>
     *                            ^
     * ```
     *
     * @type {State}
     */
    function continuationRawTagOpen(code) {
      if (code === 47) {
        effects.consume(code);
        buffer = '';
        return continuationRawEndTag;
      }
      return continuation(code);
    }

    /**
     * In raw continuation, after `</`, in a raw tag name.
     *
     * ```markdown
     * > | <script>console.log(1)</script>
     *                             ^^^^^^
     * ```
     *
     * @type {State}
     */
    function continuationRawEndTag(code) {
      if (code === 62) {
        const name = buffer.toLowerCase();
        if (htmlRawNames.includes(name)) {
          effects.consume(code);
          return continuationClose;
        }
        return continuation(code);
      }
      if (asciiAlpha(code) && buffer.length < 8) {
        // Always the case.
        effects.consume(code);
        buffer += String.fromCharCode(code);
        return continuationRawEndTag;
      }
      return continuation(code);
    }

    /**
     * In cdata continuation, after `]`, expecting `]>`.
     *
     * ```markdown
     * > | <![CDATA[>&<]]>
     *                  ^
     * ```
     *
     * @type {State}
     */
    function continuationCdataInside(code) {
      if (code === 93) {
        effects.consume(code);
        return continuationDeclarationInside;
      }
      return continuation(code);
    }

    /**
     * In declaration or instruction continuation, at `>`.
     *
     * ```markdown
     * > | <!-->
     *         ^
     * > | <?>
     *       ^
     * > | <!q>
     *        ^
     * > | <!--ab-->
     *             ^
     * > | <![CDATA[>&<]]>
     *                   ^
     * ```
     *
     * @type {State}
     */
    function continuationDeclarationInside(code) {
      if (code === 62) {
        effects.consume(code);
        return continuationClose;
      }

      // More dashes.
      if (code === 45 && marker === 2) {
        effects.consume(code);
        return continuationDeclarationInside;
      }
      return continuation(code);
    }

    /**
     * In closed continuation: everything we get until the eol/eof is part of it.
     *
     * ```markdown
     * > | <!doctype>
     *               ^
     * ```
     *
     * @type {State}
     */
    function continuationClose(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit("htmlFlowData");
        return continuationAfter(code);
      }
      effects.consume(code);
      return continuationClose;
    }

    /**
     * Done.
     *
     * ```markdown
     * > | <!doctype>
     *               ^
     * ```
     *
     * @type {State}
     */
    function continuationAfter(code) {
      effects.exit("htmlFlow");
      // // Feel free to interrupt.
      // tokenizer.interrupt = false
      // // No longer concrete.
      // tokenizer.concrete = false
      return ok(code);
    }
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeBlankLineBefore(effects, ok, nok) {
    return start;

    /**
     * Before eol, expecting blank line.
     *
     * ```markdown
     * > | <div>
     *          ^
     *   |
     * ```
     *
     * @type {State}
     */
    function start(code) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return effects.attempt(blankLine, ok, nok);
    }
  }

  /**
   * @import {
   *   Code,
   *   Construct,
   *   State,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const htmlText = {
    name: 'htmlText',
    tokenize: tokenizeHtmlText
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeHtmlText(effects, ok, nok) {
    const self = this;
    /** @type {NonNullable<Code> | undefined} */
    let marker;
    /** @type {number} */
    let index;
    /** @type {State} */
    let returnState;
    return start;

    /**
     * Start of HTML (text).
     *
     * ```markdown
     * > | a <b> c
     *       ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      effects.enter("htmlText");
      effects.enter("htmlTextData");
      effects.consume(code);
      return open;
    }

    /**
     * After `<`, at tag name or other stuff.
     *
     * ```markdown
     * > | a <b> c
     *        ^
     * > | a <!doctype> c
     *        ^
     * > | a <!--b--> c
     *        ^
     * ```
     *
     * @type {State}
     */
    function open(code) {
      if (code === 33) {
        effects.consume(code);
        return declarationOpen;
      }
      if (code === 47) {
        effects.consume(code);
        return tagCloseStart;
      }
      if (code === 63) {
        effects.consume(code);
        return instruction;
      }

      // ASCII alphabetical.
      if (asciiAlpha(code)) {
        effects.consume(code);
        return tagOpen;
      }
      return nok(code);
    }

    /**
     * After `<!`, at declaration, comment, or CDATA.
     *
     * ```markdown
     * > | a <!doctype> c
     *         ^
     * > | a <!--b--> c
     *         ^
     * > | a <![CDATA[>&<]]> c
     *         ^
     * ```
     *
     * @type {State}
     */
    function declarationOpen(code) {
      if (code === 45) {
        effects.consume(code);
        return commentOpenInside;
      }
      if (code === 91) {
        effects.consume(code);
        index = 0;
        return cdataOpenInside;
      }
      if (asciiAlpha(code)) {
        effects.consume(code);
        return declaration;
      }
      return nok(code);
    }

    /**
     * In a comment, after `<!-`, at another `-`.
     *
     * ```markdown
     * > | a <!--b--> c
     *          ^
     * ```
     *
     * @type {State}
     */
    function commentOpenInside(code) {
      if (code === 45) {
        effects.consume(code);
        return commentEnd;
      }
      return nok(code);
    }

    /**
     * In comment.
     *
     * ```markdown
     * > | a <!--b--> c
     *           ^
     * ```
     *
     * @type {State}
     */
    function comment(code) {
      if (code === null) {
        return nok(code);
      }
      if (code === 45) {
        effects.consume(code);
        return commentClose;
      }
      if (markdownLineEnding(code)) {
        returnState = comment;
        return lineEndingBefore(code);
      }
      effects.consume(code);
      return comment;
    }

    /**
     * In comment, after `-`.
     *
     * ```markdown
     * > | a <!--b--> c
     *             ^
     * ```
     *
     * @type {State}
     */
    function commentClose(code) {
      if (code === 45) {
        effects.consume(code);
        return commentEnd;
      }
      return comment(code);
    }

    /**
     * In comment, after `--`.
     *
     * ```markdown
     * > | a <!--b--> c
     *              ^
     * ```
     *
     * @type {State}
     */
    function commentEnd(code) {
      return code === 62 ? end(code) : code === 45 ? commentClose(code) : comment(code);
    }

    /**
     * After `<![`, in CDATA, expecting `CDATA[`.
     *
     * ```markdown
     * > | a <![CDATA[>&<]]> b
     *          ^^^^^^
     * ```
     *
     * @type {State}
     */
    function cdataOpenInside(code) {
      const value = "CDATA[";
      if (code === value.charCodeAt(index++)) {
        effects.consume(code);
        return index === value.length ? cdata : cdataOpenInside;
      }
      return nok(code);
    }

    /**
     * In CDATA.
     *
     * ```markdown
     * > | a <![CDATA[>&<]]> b
     *                ^^^
     * ```
     *
     * @type {State}
     */
    function cdata(code) {
      if (code === null) {
        return nok(code);
      }
      if (code === 93) {
        effects.consume(code);
        return cdataClose;
      }
      if (markdownLineEnding(code)) {
        returnState = cdata;
        return lineEndingBefore(code);
      }
      effects.consume(code);
      return cdata;
    }

    /**
     * In CDATA, after `]`, at another `]`.
     *
     * ```markdown
     * > | a <![CDATA[>&<]]> b
     *                    ^
     * ```
     *
     * @type {State}
     */
    function cdataClose(code) {
      if (code === 93) {
        effects.consume(code);
        return cdataEnd;
      }
      return cdata(code);
    }

    /**
     * In CDATA, after `]]`, at `>`.
     *
     * ```markdown
     * > | a <![CDATA[>&<]]> b
     *                     ^
     * ```
     *
     * @type {State}
     */
    function cdataEnd(code) {
      if (code === 62) {
        return end(code);
      }
      if (code === 93) {
        effects.consume(code);
        return cdataEnd;
      }
      return cdata(code);
    }

    /**
     * In declaration.
     *
     * ```markdown
     * > | a <!b> c
     *          ^
     * ```
     *
     * @type {State}
     */
    function declaration(code) {
      if (code === null || code === 62) {
        return end(code);
      }
      if (markdownLineEnding(code)) {
        returnState = declaration;
        return lineEndingBefore(code);
      }
      effects.consume(code);
      return declaration;
    }

    /**
     * In instruction.
     *
     * ```markdown
     * > | a <?b?> c
     *         ^
     * ```
     *
     * @type {State}
     */
    function instruction(code) {
      if (code === null) {
        return nok(code);
      }
      if (code === 63) {
        effects.consume(code);
        return instructionClose;
      }
      if (markdownLineEnding(code)) {
        returnState = instruction;
        return lineEndingBefore(code);
      }
      effects.consume(code);
      return instruction;
    }

    /**
     * In instruction, after `?`, at `>`.
     *
     * ```markdown
     * > | a <?b?> c
     *           ^
     * ```
     *
     * @type {State}
     */
    function instructionClose(code) {
      return code === 62 ? end(code) : instruction(code);
    }

    /**
     * After `</`, in closing tag, at tag name.
     *
     * ```markdown
     * > | a </b> c
     *         ^
     * ```
     *
     * @type {State}
     */
    function tagCloseStart(code) {
      // ASCII alphabetical.
      if (asciiAlpha(code)) {
        effects.consume(code);
        return tagClose;
      }
      return nok(code);
    }

    /**
     * After `</x`, in a tag name.
     *
     * ```markdown
     * > | a </b> c
     *          ^
     * ```
     *
     * @type {State}
     */
    function tagClose(code) {
      // ASCII alphanumerical and `-`.
      if (code === 45 || asciiAlphanumeric(code)) {
        effects.consume(code);
        return tagClose;
      }
      return tagCloseBetween(code);
    }

    /**
     * In closing tag, after tag name.
     *
     * ```markdown
     * > | a </b> c
     *          ^
     * ```
     *
     * @type {State}
     */
    function tagCloseBetween(code) {
      if (markdownLineEnding(code)) {
        returnState = tagCloseBetween;
        return lineEndingBefore(code);
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return tagCloseBetween;
      }
      return end(code);
    }

    /**
     * After `<x`, in opening tag name.
     *
     * ```markdown
     * > | a <b> c
     *         ^
     * ```
     *
     * @type {State}
     */
    function tagOpen(code) {
      // ASCII alphanumerical and `-`.
      if (code === 45 || asciiAlphanumeric(code)) {
        effects.consume(code);
        return tagOpen;
      }
      if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
        return tagOpenBetween(code);
      }
      return nok(code);
    }

    /**
     * In opening tag, after tag name.
     *
     * ```markdown
     * > | a <b> c
     *         ^
     * ```
     *
     * @type {State}
     */
    function tagOpenBetween(code) {
      if (code === 47) {
        effects.consume(code);
        return end;
      }

      // ASCII alphabetical and `:` and `_`.
      if (code === 58 || code === 95 || asciiAlpha(code)) {
        effects.consume(code);
        return tagOpenAttributeName;
      }
      if (markdownLineEnding(code)) {
        returnState = tagOpenBetween;
        return lineEndingBefore(code);
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return tagOpenBetween;
      }
      return end(code);
    }

    /**
     * In attribute name.
     *
     * ```markdown
     * > | a <b c> d
     *          ^
     * ```
     *
     * @type {State}
     */
    function tagOpenAttributeName(code) {
      // ASCII alphabetical and `-`, `.`, `:`, and `_`.
      if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
        effects.consume(code);
        return tagOpenAttributeName;
      }
      return tagOpenAttributeNameAfter(code);
    }

    /**
     * After attribute name, before initializer, the end of the tag, or
     * whitespace.
     *
     * ```markdown
     * > | a <b c> d
     *           ^
     * ```
     *
     * @type {State}
     */
    function tagOpenAttributeNameAfter(code) {
      if (code === 61) {
        effects.consume(code);
        return tagOpenAttributeValueBefore;
      }
      if (markdownLineEnding(code)) {
        returnState = tagOpenAttributeNameAfter;
        return lineEndingBefore(code);
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return tagOpenAttributeNameAfter;
      }
      return tagOpenBetween(code);
    }

    /**
     * Before unquoted, double quoted, or single quoted attribute value, allowing
     * whitespace.
     *
     * ```markdown
     * > | a <b c=d> e
     *            ^
     * ```
     *
     * @type {State}
     */
    function tagOpenAttributeValueBefore(code) {
      if (code === null || code === 60 || code === 61 || code === 62 || code === 96) {
        return nok(code);
      }
      if (code === 34 || code === 39) {
        effects.consume(code);
        marker = code;
        return tagOpenAttributeValueQuoted;
      }
      if (markdownLineEnding(code)) {
        returnState = tagOpenAttributeValueBefore;
        return lineEndingBefore(code);
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return tagOpenAttributeValueBefore;
      }
      effects.consume(code);
      return tagOpenAttributeValueUnquoted;
    }

    /**
     * In double or single quoted attribute value.
     *
     * ```markdown
     * > | a <b c="d"> e
     *             ^
     * ```
     *
     * @type {State}
     */
    function tagOpenAttributeValueQuoted(code) {
      if (code === marker) {
        effects.consume(code);
        marker = undefined;
        return tagOpenAttributeValueQuotedAfter;
      }
      if (code === null) {
        return nok(code);
      }
      if (markdownLineEnding(code)) {
        returnState = tagOpenAttributeValueQuoted;
        return lineEndingBefore(code);
      }
      effects.consume(code);
      return tagOpenAttributeValueQuoted;
    }

    /**
     * In unquoted attribute value.
     *
     * ```markdown
     * > | a <b c=d> e
     *            ^
     * ```
     *
     * @type {State}
     */
    function tagOpenAttributeValueUnquoted(code) {
      if (code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 96) {
        return nok(code);
      }
      if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
        return tagOpenBetween(code);
      }
      effects.consume(code);
      return tagOpenAttributeValueUnquoted;
    }

    /**
     * After double or single quoted attribute value, before whitespace or the end
     * of the tag.
     *
     * ```markdown
     * > | a <b c="d"> e
     *               ^
     * ```
     *
     * @type {State}
     */
    function tagOpenAttributeValueQuotedAfter(code) {
      if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
        return tagOpenBetween(code);
      }
      return nok(code);
    }

    /**
     * In certain circumstances of a tag where only an `>` is allowed.
     *
     * ```markdown
     * > | a <b c="d"> e
     *               ^
     * ```
     *
     * @type {State}
     */
    function end(code) {
      if (code === 62) {
        effects.consume(code);
        effects.exit("htmlTextData");
        effects.exit("htmlText");
        return ok;
      }
      return nok(code);
    }

    /**
     * At eol.
     *
     * > 👉 **Note**: we can’t have blank lines in text, so no need to worry about
     * > empty tokens.
     *
     * ```markdown
     * > | a <!--a
     *            ^
     *   | b-->
     * ```
     *
     * @type {State}
     */
    function lineEndingBefore(code) {
      effects.exit("htmlTextData");
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return lineEndingAfter;
    }

    /**
     * After eol, at optional whitespace.
     *
     * > 👉 **Note**: we can’t have blank lines in text, so no need to worry about
     * > empty tokens.
     *
     * ```markdown
     *   | a <!--a
     * > | b-->
     *     ^
     * ```
     *
     * @type {State}
     */
    function lineEndingAfter(code) {
      // Always populated by defaults.

      return markdownSpace(code) ? factorySpace(effects, lineEndingAfterPrefix, "linePrefix", self.parser.constructs.disable.null.includes('codeIndented') ? undefined : 4)(code) : lineEndingAfterPrefix(code);
    }

    /**
     * After eol, after optional whitespace.
     *
     * > 👉 **Note**: we can’t have blank lines in text, so no need to worry about
     * > empty tokens.
     *
     * ```markdown
     *   | a <!--a
     * > | b-->
     *     ^
     * ```
     *
     * @type {State}
     */
    function lineEndingAfterPrefix(code) {
      effects.enter("htmlTextData");
      return returnState(code);
    }
  }

  /**
   * @import {
   *   Construct,
   *   Event,
   *   Resolver,
   *   State,
   *   TokenizeContext,
   *   Tokenizer,
   *   Token
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const labelEnd = {
    name: 'labelEnd',
    resolveAll: resolveAllLabelEnd,
    resolveTo: resolveToLabelEnd,
    tokenize: tokenizeLabelEnd
  };

  /** @type {Construct} */
  const resourceConstruct = {
    tokenize: tokenizeResource
  };
  /** @type {Construct} */
  const referenceFullConstruct = {
    tokenize: tokenizeReferenceFull
  };
  /** @type {Construct} */
  const referenceCollapsedConstruct = {
    tokenize: tokenizeReferenceCollapsed
  };

  /** @type {Resolver} */
  function resolveAllLabelEnd(events) {
    let index = -1;
    /** @type {Array<Event>} */
    const newEvents = [];
    while (++index < events.length) {
      const token = events[index][1];
      newEvents.push(events[index]);
      if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
        // Remove the marker.
        const offset = token.type === "labelImage" ? 4 : 2;
        token.type = "data";
        index += offset;
      }
    }

    // If the events are equal, we don't have to copy newEvents to events
    if (events.length !== newEvents.length) {
      splice(events, 0, events.length, newEvents);
    }
    return events;
  }

  /** @type {Resolver} */
  function resolveToLabelEnd(events, context) {
    let index = events.length;
    let offset = 0;
    /** @type {number | undefined} */
    let open;
    /** @type {number | undefined} */
    let close;
    /** @type {Array<Event>} */
    let media;

    // Find an opening.
    while (index--) {
      const token = events[index][1];
      if (open) {
        // If we see another link, or inactive link label, we’ve been here before.
        if (token.type === "link" || token.type === "labelLink" && token._inactive) {
          break;
        }

        // Mark other link openings as inactive, as we can’t have links in
        // links.
        if (events[index][0] === 'enter' && token.type === "labelLink") {
          token._inactive = true;
        }
      } else if (close) {
        if (events[index][0] === 'enter' && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
          open = index;
          if (token.type !== "labelLink") {
            offset = 2;
            break;
          }
        }
      } else if (token.type === "labelEnd") {
        close = index;
      }
    }
    const group = {
      type: events[open][1].type === "labelLink" ? "link" : "image",
      start: {
        ...events[open][1].start
      },
      end: {
        ...events[events.length - 1][1].end
      }
    };
    const label = {
      type: "label",
      start: {
        ...events[open][1].start
      },
      end: {
        ...events[close][1].end
      }
    };
    const text = {
      type: "labelText",
      start: {
        ...events[open + offset + 2][1].end
      },
      end: {
        ...events[close - 2][1].start
      }
    };
    media = [['enter', group, context], ['enter', label, context]];

    // Opening marker.
    media = push(media, events.slice(open + 1, open + offset + 3));

    // Text open.
    media = push(media, [['enter', text, context]]);

    // Always populated by defaults.

    // Between.
    media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));

    // Text close, marker close, label close.
    media = push(media, [['exit', text, context], events[close - 2], events[close - 1], ['exit', label, context]]);

    // Reference, resource, or so.
    media = push(media, events.slice(close + 1));

    // Media close.
    media = push(media, [['exit', group, context]]);
    splice(events, open, events.length, media);
    return events;
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeLabelEnd(effects, ok, nok) {
    const self = this;
    const labelStarts = self._labelStarts;
    /** @type {Token} */
    let labelStart;
    /** @type {boolean} */
    let defined;
    if (labelStarts) {
      // Discard ones that failed to close,
      // they’re not needed anymore.
      while (labelStarts.length > 0 && labelStarts[labelStarts.length - 1]._balanced) {
        labelStarts.pop();
      }
      labelStart = labelStarts[labelStarts.length - 1];
    }
    return start;

    /**
     * Start of label end.
     *
     * ```markdown
     * > | [a](b) c
     *       ^
     * > | [a][b] c
     *       ^
     * > | [a][] b
     *       ^
     * > | [a] b
     * ```
     *
     * @type {State}
     */
    function start(code) {
      // If there is not an okay opening.
      if (!labelStart) {
        return nok(code);
      }

      // If the corresponding label (link) start is marked as inactive,
      // it means we’d be wrapping a link, like this:
      //
      // ```markdown
      // > | a [b [c](d) e](f) g.
      //                  ^
      // ```
      //
      // We can’t have that, so it’s just balanced brackets.
      if (labelStart._inactive) {
        return labelEndNok(code);
      }
      defined = self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize({
        start: labelStart.end,
        end: self.now()
      })));
      effects.enter("labelEnd");
      effects.enter("labelMarker");
      effects.consume(code);
      effects.exit("labelMarker");
      effects.exit("labelEnd");
      return after;
    }

    /**
     * After `]`.
     *
     * ```markdown
     * > | [a](b) c
     *       ^
     * > | [a][b] c
     *       ^
     * > | [a][] b
     *       ^
     * > | [a] b
     *       ^
     * ```
     *
     * @type {State}
     */
    function after(code) {
      // Note: `markdown-rs` also parses GFM footnotes here, which for us is in
      // an extension.

      // Resource (`[asd](fgh)`)?
      if (code === 40) {
        return effects.attempt(resourceConstruct, labelEndOk, defined ? labelEndOk : labelEndNok)(code);
      }

      // Full (`[asd][fgh]`) or collapsed (`[asd][]`) reference?
      if (code === 91) {
        return effects.attempt(referenceFullConstruct, labelEndOk, defined ? referenceNotFull : labelEndNok)(code);
      }

      // Shortcut (`[asd]`) reference?
      return defined ? labelEndOk(code) : labelEndNok(code);
    }

    /**
     * After `]`, at `[`, but not at a full reference.
     *
     * > 👉 **Note**: we only get here if the label is defined.
     *
     * ```markdown
     * > | [a][] b
     *        ^
     * > | [a] b
     *        ^
     * ```
     *
     * @type {State}
     */
    function referenceNotFull(code) {
      return effects.attempt(referenceCollapsedConstruct, labelEndOk, labelEndNok)(code);
    }

    /**
     * Done, we found something.
     *
     * ```markdown
     * > | [a](b) c
     *           ^
     * > | [a][b] c
     *           ^
     * > | [a][] b
     *          ^
     * > | [a] b
     *        ^
     * ```
     *
     * @type {State}
     */
    function labelEndOk(code) {
      // Note: `markdown-rs` does a bunch of stuff here.
      // This label start is now used up: discard it so it’s never found again.

      labelStarts.pop();
      return ok(code);
    }

    /**
     * Done, it’s nothing.
     *
     * There was an okay opening, but we didn’t match anything.
     *
     * ```markdown
     * > | [a](b c
     *        ^
     * > | [a][b c
     *        ^
     * > | [a] b
     *        ^
     * ```
     *
     * @type {State}
     */
    function labelEndNok(code) {
      labelStart._balanced = true;
      return nok(code);
    }
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeResource(effects, ok, nok) {
    return resourceStart;

    /**
     * At a resource.
     *
     * ```markdown
     * > | [a](b) c
     *        ^
     * ```
     *
     * @type {State}
     */
    function resourceStart(code) {
      effects.enter("resource");
      effects.enter("resourceMarker");
      effects.consume(code);
      effects.exit("resourceMarker");
      return resourceBefore;
    }

    /**
     * In resource, after `(`, at optional whitespace.
     *
     * ```markdown
     * > | [a](b) c
     *         ^
     * ```
     *
     * @type {State}
     */
    function resourceBefore(code) {
      return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceOpen)(code) : resourceOpen(code);
    }

    /**
     * In resource, after optional whitespace, at `)` or a destination.
     *
     * ```markdown
     * > | [a](b) c
     *         ^
     * ```
     *
     * @type {State}
     */
    function resourceOpen(code) {
      if (code === 41) {
        return resourceEnd(code);
      }
      return factoryDestination(effects, resourceDestinationAfter, resourceDestinationMissing, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code);
    }

    /**
     * In resource, after destination, at optional whitespace.
     *
     * ```markdown
     * > | [a](b) c
     *          ^
     * ```
     *
     * @type {State}
     */
    function resourceDestinationAfter(code) {
      return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceBetween)(code) : resourceEnd(code);
    }

    /**
     * At invalid destination.
     *
     * ```markdown
     * > | [a](<<) b
     *         ^
     * ```
     *
     * @type {State}
     */
    function resourceDestinationMissing(code) {
      return nok(code);
    }

    /**
     * In resource, after destination and whitespace, at `(` or title.
     *
     * ```markdown
     * > | [a](b ) c
     *           ^
     * ```
     *
     * @type {State}
     */
    function resourceBetween(code) {
      if (code === 34 || code === 39 || code === 40) {
        return factoryTitle(effects, resourceTitleAfter, nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code);
      }
      return resourceEnd(code);
    }

    /**
     * In resource, after title, at optional whitespace.
     *
     * ```markdown
     * > | [a](b "c") d
     *              ^
     * ```
     *
     * @type {State}
     */
    function resourceTitleAfter(code) {
      return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceEnd)(code) : resourceEnd(code);
    }

    /**
     * In resource, at `)`.
     *
     * ```markdown
     * > | [a](b) d
     *          ^
     * ```
     *
     * @type {State}
     */
    function resourceEnd(code) {
      if (code === 41) {
        effects.enter("resourceMarker");
        effects.consume(code);
        effects.exit("resourceMarker");
        effects.exit("resource");
        return ok;
      }
      return nok(code);
    }
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeReferenceFull(effects, ok, nok) {
    const self = this;
    return referenceFull;

    /**
     * In a reference (full), at the `[`.
     *
     * ```markdown
     * > | [a][b] d
     *        ^
     * ```
     *
     * @type {State}
     */
    function referenceFull(code) {
      return factoryLabel.call(self, effects, referenceFullAfter, referenceFullMissing, "reference", "referenceMarker", "referenceString")(code);
    }

    /**
     * In a reference (full), after `]`.
     *
     * ```markdown
     * > | [a][b] d
     *          ^
     * ```
     *
     * @type {State}
     */
    function referenceFullAfter(code) {
      return self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1))) ? ok(code) : nok(code);
    }

    /**
     * In reference (full) that was missing.
     *
     * ```markdown
     * > | [a][b d
     *        ^
     * ```
     *
     * @type {State}
     */
    function referenceFullMissing(code) {
      return nok(code);
    }
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeReferenceCollapsed(effects, ok, nok) {
    return referenceCollapsedStart;

    /**
     * In reference (collapsed), at `[`.
     *
     * > 👉 **Note**: we only get here if the label is defined.
     *
     * ```markdown
     * > | [a][] d
     *        ^
     * ```
     *
     * @type {State}
     */
    function referenceCollapsedStart(code) {
      // We only attempt a collapsed label if there’s a `[`.

      effects.enter("reference");
      effects.enter("referenceMarker");
      effects.consume(code);
      effects.exit("referenceMarker");
      return referenceCollapsedOpen;
    }

    /**
     * In reference (collapsed), at `]`.
     *
     * > 👉 **Note**: we only get here if the label is defined.
     *
     * ```markdown
     * > | [a][] d
     *         ^
     * ```
     *
     *  @type {State}
     */
    function referenceCollapsedOpen(code) {
      if (code === 93) {
        effects.enter("referenceMarker");
        effects.consume(code);
        effects.exit("referenceMarker");
        effects.exit("reference");
        return ok;
      }
      return nok(code);
    }
  }

  /**
   * @import {
   *   Construct,
   *   State,
   *   Token,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */


  /** @type {Construct} */
  const labelStartImage = {
    name: 'labelStartImage',
    resolveAll: labelEnd.resolveAll,
    tokenize: tokenizeLabelStartImage
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeLabelStartImage(effects, ok, nok) {
    const self = this;
    /** @type {Token} */
    let labelImage;
    return start;

    /**
     * Start of label (image) start.
     *
     * ```markdown
     * > | a ![b] c
     *       ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      effects.enter("labelImage");
      effects.enter("labelImageMarker");
      effects.consume(code);
      effects.exit("labelImageMarker");
      return open;
    }

    /**
     * After `!`, at `[`.
     *
     * ```markdown
     * > | a ![b] c
     *        ^
     * ```
     *
     * @type {State}
     */
    function open(code) {
      if (code === 91) {
        effects.enter("labelMarker");
        effects.consume(code);
        effects.exit("labelMarker");
        labelImage = effects.exit("labelImage");
        return after;
      }
      return nok(code);
    }

    /**
     * After `![`.
     *
     * ```markdown
     * > | a ![b] c
     *         ^
     * ```
     *
     * This is needed in because, when GFM footnotes are enabled, images never
     * form when started with a `^`.
     * Instead, links form:
     *
     * ```markdown
     * ![^a](b)
     *
     * ![^a][b]
     *
     * [b]: c
     * ```
     *
     * ```html
     * <p>!<a href=\"b\">^a</a></p>
     * <p>!<a href=\"c\">^a</a></p>
     * ```
     *
     * @type {State}
     */
    function after(code) {
      // To do: use a new field to do this, this is still needed for
      // `micromark-extension-gfm-footnote`, but the `label-start-link`
      // behavior isn’t.
      // Hidden footnotes hook.
      /* c8 ignore next 6 */
      if (code === 94 && '_hiddenFootnoteSupport' in self.parser.constructs) {
        return nok(code);
      }
      self._labelStarts = self._labelStarts || [];
      self._labelStarts.push(labelImage);
      return ok(code);
    }
  }

  /**
   * @import {
   *   Construct,
   *   State,
   *   Token,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */


  /** @type {Construct} */
  const labelStartLink = {
    name: 'labelStartLink',
    resolveAll: labelEnd.resolveAll,
    tokenize: tokenizeLabelStartLink
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeLabelStartLink(effects, ok, nok) {
    const self = this;
    /** @type {Token} */
    let labelLink;
    return start;

    /**
     * Start of label (link) start.
     *
     * ```markdown
     * > | a [b] c
     *       ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      effects.enter("labelLink");
      effects.enter("labelMarker");
      effects.consume(code);
      effects.exit("labelMarker");
      labelLink = effects.exit("labelLink");
      return after;
    }

    /** @type {State} */
    function after(code) {
      // To do: this isn’t needed in `micromark-extension-gfm-footnote`,
      // remove.
      // Hidden footnotes hook.
      /* c8 ignore next 6 */
      if (code === 94 && '_hiddenFootnoteSupport' in self.parser.constructs) {
        return nok(code);
      }
      self._labelStarts = self._labelStarts || [];
      self._labelStarts.push(labelLink);
      return ok(code);
    }
  }

  /**
   * @import {
   *   Construct,
   *   State,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const lineEnding = {
    name: 'lineEnding',
    tokenize: tokenizeLineEnding
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeLineEnding(effects, ok) {
    return start;

    /** @type {State} */
    function start(code) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return factorySpace(effects, ok, "linePrefix");
    }
  }

  /**
   * @import {
   *   Code,
   *   Construct,
   *   State,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const thematicBreak$1 = {
    name: 'thematicBreak',
    tokenize: tokenizeThematicBreak
  };

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeThematicBreak(effects, ok, nok) {
    let size = 0;
    /** @type {NonNullable<Code>} */
    let marker;
    return start;

    /**
     * Start of thematic break.
     *
     * ```markdown
     * > | ***
     *     ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      effects.enter("thematicBreak");
      // To do: parse indent like `markdown-rs`.
      return before(code);
    }

    /**
     * After optional whitespace, at marker.
     *
     * ```markdown
     * > | ***
     *     ^
     * ```
     *
     * @type {State}
     */
    function before(code) {
      marker = code;
      return atBreak(code);
    }

    /**
     * After something, before something else.
     *
     * ```markdown
     * > | ***
     *     ^
     * ```
     *
     * @type {State}
     */
    function atBreak(code) {
      if (code === marker) {
        effects.enter("thematicBreakSequence");
        return sequence(code);
      }
      if (size >= 3 && (code === null || markdownLineEnding(code))) {
        effects.exit("thematicBreak");
        return ok(code);
      }
      return nok(code);
    }

    /**
     * In sequence.
     *
     * ```markdown
     * > | ***
     *     ^
     * ```
     *
     * @type {State}
     */
    function sequence(code) {
      if (code === marker) {
        effects.consume(code);
        size++;
        return sequence;
      }
      effects.exit("thematicBreakSequence");
      return markdownSpace(code) ? factorySpace(effects, atBreak, "whitespace")(code) : atBreak(code);
    }
  }

  /**
   * @import {
   *   Code,
   *   Construct,
   *   Exiter,
   *   State,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */


  /** @type {Construct} */
  const list$2 = {
    continuation: {
      tokenize: tokenizeListContinuation
    },
    exit: tokenizeListEnd,
    name: 'list',
    tokenize: tokenizeListStart
  };

  /** @type {Construct} */
  const listItemPrefixWhitespaceConstruct = {
    partial: true,
    tokenize: tokenizeListItemPrefixWhitespace
  };

  /** @type {Construct} */
  const indentConstruct = {
    partial: true,
    tokenize: tokenizeIndent$1
  };

  // To do: `markdown-rs` parses list items on their own and later stitches them
  // together.

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeListStart(effects, ok, nok) {
    const self = this;
    const tail = self.events[self.events.length - 1];
    let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
    let size = 0;
    return start;

    /** @type {State} */
    function start(code) {
      const kind = self.containerState.type || (code === 42 || code === 43 || code === 45 ? "listUnordered" : "listOrdered");
      if (kind === "listUnordered" ? !self.containerState.marker || code === self.containerState.marker : asciiDigit(code)) {
        if (!self.containerState.type) {
          self.containerState.type = kind;
          effects.enter(kind, {
            _container: true
          });
        }
        if (kind === "listUnordered") {
          effects.enter("listItemPrefix");
          return code === 42 || code === 45 ? effects.check(thematicBreak$1, nok, atMarker)(code) : atMarker(code);
        }
        if (!self.interrupt || code === 49) {
          effects.enter("listItemPrefix");
          effects.enter("listItemValue");
          return inside(code);
        }
      }
      return nok(code);
    }

    /** @type {State} */
    function inside(code) {
      if (asciiDigit(code) && ++size < 10) {
        effects.consume(code);
        return inside;
      }
      if ((!self.interrupt || size < 2) && (self.containerState.marker ? code === self.containerState.marker : code === 41 || code === 46)) {
        effects.exit("listItemValue");
        return atMarker(code);
      }
      return nok(code);
    }

    /**
     * @type {State}
     **/
    function atMarker(code) {
      effects.enter("listItemMarker");
      effects.consume(code);
      effects.exit("listItemMarker");
      self.containerState.marker = self.containerState.marker || code;
      return effects.check(blankLine,
      // Can’t be empty when interrupting.
      self.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
    }

    /** @type {State} */
    function onBlank(code) {
      self.containerState.initialBlankLine = true;
      initialSize++;
      return endOfPrefix(code);
    }

    /** @type {State} */
    function otherPrefix(code) {
      if (markdownSpace(code)) {
        effects.enter("listItemPrefixWhitespace");
        effects.consume(code);
        effects.exit("listItemPrefixWhitespace");
        return endOfPrefix;
      }
      return nok(code);
    }

    /** @type {State} */
    function endOfPrefix(code) {
      self.containerState.size = initialSize + self.sliceSerialize(effects.exit("listItemPrefix"), true).length;
      return ok(code);
    }
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeListContinuation(effects, ok, nok) {
    const self = this;
    self.containerState._closeFlow = undefined;
    return effects.check(blankLine, onBlank, notBlank);

    /** @type {State} */
    function onBlank(code) {
      self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;

      // We have a blank line.
      // Still, try to consume at most the items size.
      return factorySpace(effects, ok, "listItemIndent", self.containerState.size + 1)(code);
    }

    /** @type {State} */
    function notBlank(code) {
      if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
        self.containerState.furtherBlankLines = undefined;
        self.containerState.initialBlankLine = undefined;
        return notInCurrentItem(code);
      }
      self.containerState.furtherBlankLines = undefined;
      self.containerState.initialBlankLine = undefined;
      return effects.attempt(indentConstruct, ok, notInCurrentItem)(code);
    }

    /** @type {State} */
    function notInCurrentItem(code) {
      // While we do continue, we signal that the flow should be closed.
      self.containerState._closeFlow = true;
      // As we’re closing flow, we’re no longer interrupting.
      self.interrupt = undefined;
      // Always populated by defaults.

      return factorySpace(effects, effects.attempt(list$2, ok, nok), "linePrefix", self.parser.constructs.disable.null.includes('codeIndented') ? undefined : 4)(code);
    }
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeIndent$1(effects, ok, nok) {
    const self = this;
    return factorySpace(effects, afterPrefix, "listItemIndent", self.containerState.size + 1);

    /** @type {State} */
    function afterPrefix(code) {
      const tail = self.events[self.events.length - 1];
      return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self.containerState.size ? ok(code) : nok(code);
    }
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Exiter}
   */
  function tokenizeListEnd(effects) {
    effects.exit(this.containerState.type);
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
    const self = this;

    // Always populated by defaults.

    return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self.parser.constructs.disable.null.includes('codeIndented') ? undefined : 4 + 1);

    /** @type {State} */
    function afterPrefix(code) {
      const tail = self.events[self.events.length - 1];
      return !markdownSpace(code) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok(code) : nok(code);
    }
  }

  /**
   * @import {
   *   Code,
   *   Construct,
   *   Resolver,
   *   State,
   *   TokenizeContext,
   *   Tokenizer
   * } from 'micromark-util-types'
   */

  /** @type {Construct} */
  const setextUnderline = {
    name: 'setextUnderline',
    resolveTo: resolveToSetextUnderline,
    tokenize: tokenizeSetextUnderline
  };

  /** @type {Resolver} */
  function resolveToSetextUnderline(events, context) {
    const editMap = new EditMap$1();
    let index = events.length;
    /** @type {number | undefined} */
    let content;
    /** @type {number | undefined} */
    let text;
    /** @type {number | undefined} */
    let definition;

    // Find the opening of the content.
    // It’ll always exist: we don’t tokenize if it isn’t there.
    while (index--) {
      if (events[index][0] === 'enter') {
        if (events[index][1].type === "content") {
          content = index;
          break;
        }
        if (events[index][1].type === "paragraph") {
          text = index;
        }
      }
      // Exit
      else {
        if (events[index][1].type === "content") {
          // Remove the content end (if needed we’ll add it later)
          editMap.add(index, 1, []);
        }
        if (!definition && events[index][1].type === "definition") {
          definition = index;
        }
      }
    }
    const heading = {
      type: "setextHeading",
      start: {
        ...events[content][1].start
      },
      end: {
        ...events[events.length - 1][1].end
      }
    };

    // Change the paragraph to setext heading text.
    events[text][1].type = "setextHeadingText";

    // If we have definitions in the content, we’ll keep on having content,
    // but we need move it.
    if (definition) {
      editMap.add(text, 0, [['enter', heading, context]]);
      editMap.add(definition + 1, 0, [['exit', events[content][1], context]]);
      events[content][1].end = {
        ...events[definition][1].end
      };
    } else {
      events[content][1] = heading;
    }

    // Add the heading exit at the end.
    editMap.add(events.length, 0, [['exit', heading, context]]);
    editMap.consume(events);
    return events;
  }

  /**
   * @this {TokenizeContext}
   *   Context.
   * @type {Tokenizer}
   */
  function tokenizeSetextUnderline(effects, ok, nok) {
    const self = this;
    /** @type {NonNullable<Code>} */
    let marker;
    return start;

    /**
     * At start of heading (setext) underline.
     *
     * ```markdown
     *   | aa
     * > | ==
     *     ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      let index = self.events.length;
      /** @type {boolean | undefined} */
      let paragraph;
      // Find an opening.
      while (index--) {
        // Skip enter/exit of line ending, line prefix, and content.
        // We can now either have a definition or a paragraph.
        if (self.events[index][1].type !== "lineEnding" && self.events[index][1].type !== "linePrefix" && self.events[index][1].type !== "content") {
          paragraph = self.events[index][1].type === "paragraph";
          break;
        }
      }

      // To do: handle lazy/pierce like `markdown-rs`.
      // To do: parse indent like `markdown-rs`.
      if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph)) {
        effects.enter("setextHeadingLine");
        marker = code;
        return before(code);
      }
      return nok(code);
    }

    /**
     * After optional whitespace, at `-` or `=`.
     *
     * ```markdown
     *   | aa
     * > | ==
     *     ^
     * ```
     *
     * @type {State}
     */
    function before(code) {
      effects.enter("setextHeadingLineSequence");
      return inside(code);
    }

    /**
     * In sequence.
     *
     * ```markdown
     *   | aa
     * > | ==
     *     ^
     * ```
     *
     * @type {State}
     */
    function inside(code) {
      if (code === marker) {
        effects.consume(code);
        return inside;
      }
      effects.exit("setextHeadingLineSequence");
      return markdownSpace(code) ? factorySpace(effects, after, "lineSuffix")(code) : after(code);
    }

    /**
     * After sequence, after optional whitespace.
     *
     * ```markdown
     *   | aa
     * > | ==
     *       ^
     * ```
     *
     * @type {State}
     */
    function after(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit("setextHeadingLine");
        return ok(code);
      }
      return nok(code);
    }
  }

  /**
   * @import {
   *   InitialConstruct,
   *   Initializer,
   *   State,
   *   TokenizeContext
   * } from 'micromark-util-types'
   */

  /** @type {InitialConstruct} */
  const flow$1 = {
    tokenize: initializeFlow
  };

  /**
   * @this {TokenizeContext}
   *   Self.
   * @type {Initializer}
   *   Initializer.
   */
  function initializeFlow(effects) {
    const self = this;
    const initial = effects.attempt(
    // Try to parse a blank line.
    blankLine, atBlankEnding,
    // Try to parse initial flow (essentially, only code).
    effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content, afterConstruct)), "linePrefix")));
    return initial;

    /** @type {State} */
    function atBlankEnding(code) {
      if (code === null) {
        effects.consume(code);
        return;
      }
      effects.enter("lineEndingBlank");
      effects.consume(code);
      effects.exit("lineEndingBlank");
      self.currentConstruct = undefined;
      return initial;
    }

    /** @type {State} */
    function afterConstruct(code) {
      if (code === null) {
        effects.consume(code);
        return;
      }
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      self.currentConstruct = undefined;
      return initial;
    }
  }

  /**
   * @import {
   *   Code,
   *   InitialConstruct,
   *   Initializer,
   *   Resolver,
   *   State,
   *   TokenizeContext
   * } from 'micromark-util-types'
   */

  const resolver = {
    resolveAll: createResolver()
  };
  const string$1 = initializeFactory('string');
  const text$3 = initializeFactory('text');

  /**
   * @param {'string' | 'text'} field
   *   Field.
   * @returns {InitialConstruct}
   *   Construct.
   */
  function initializeFactory(field) {
    return {
      resolveAll: createResolver(field === 'text' ? resolveAllLineSuffixes : undefined),
      tokenize: initializeText
    };

    /**
     * @this {TokenizeContext}
     *   Context.
     * @type {Initializer}
     */
    function initializeText(effects) {
      const self = this;
      const constructs = this.parser.constructs[field];
      const text = effects.attempt(constructs, start, notText);
      return start;

      /** @type {State} */
      function start(code) {
        return atBreak(code) ? text(code) : notText(code);
      }

      /** @type {State} */
      function notText(code) {
        if (code === null) {
          effects.consume(code);
          return;
        }
        effects.enter("data");
        effects.consume(code);
        return data;
      }

      /** @type {State} */
      function data(code) {
        if (atBreak(code)) {
          effects.exit("data");
          return text(code);
        }

        // Data.
        effects.consume(code);
        return data;
      }

      /**
       * @param {Code} code
       *   Code.
       * @returns {boolean}
       *   Whether the code is a break.
       */
      function atBreak(code) {
        if (code === null) {
          return true;
        }
        const list = constructs[code];
        let index = -1;
        if (list) {
          // Always populated by defaults.

          while (++index < list.length) {
            const item = list[index];
            if (!item.previous || item.previous.call(self, self.previous)) {
              return true;
            }
          }
        }
        return false;
      }
    }
  }

  /**
   * @param {Resolver | undefined} [extraResolver]
   *   Resolver.
   * @returns {Resolver}
   *   Resolver.
   */
  function createResolver(extraResolver) {
    return resolveAllText;

    /** @type {Resolver} */
    function resolveAllText(events, context) {
      let index = -1;
      /** @type {number | undefined} */
      let enter;

      // A rather boring computation (to merge adjacent `data` events) which
      // improves mm performance by 29%.
      while (++index <= events.length) {
        if (enter === undefined) {
          if (events[index] && events[index][1].type === "data") {
            enter = index;
            index++;
          }
        } else if (!events[index] || events[index][1].type !== "data") {
          // Don’t do anything if there is one data token.
          if (index !== enter + 2) {
            events[enter][1].end = events[index - 1][1].end;
            events.splice(enter + 2, index - enter - 2);
            index = enter + 2;
          }
          enter = undefined;
        }
      }
      return extraResolver ? extraResolver(events, context) : events;
    }
  }

  /**
   * A rather ugly set of instructions which again looks at chunks in the input
   * stream.
   * The reason to do this here is that it is *much* faster to parse in reverse.
   * And that we can’t hook into `null` to split the line suffix before an EOF.
   * To do: figure out if we can make this into a clean utility, or even in core.
   * As it will be useful for GFMs literal autolink extension (and maybe even
   * tables?)
   *
   * @type {Resolver}
   */
  function resolveAllLineSuffixes(events, context) {
    const editMap = new EditMap$1();
    let eventIndex = 0; // Skip first.

    while (++eventIndex <= events.length) {
      if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
        const data = events[eventIndex - 1][1];
        const chunks = context.sliceStream(data);
        let index = chunks.length;
        let bufferIndex = -1;
        let size = 0;
        /** @type {boolean | undefined} */
        let tabs;
        while (index--) {
          const chunk = chunks[index];
          if (typeof chunk === 'string') {
            bufferIndex = chunk.length;
            while (chunk.charCodeAt(bufferIndex - 1) === 32) {
              size++;
              bufferIndex--;
            }
            if (bufferIndex) {
              break;
            }
            bufferIndex = -1;
          }
          // Number
          else if (chunk === -2) {
            tabs = true;
            size++;
          } else if (chunk === -1) ; else {
            // Replacement character, exit.
            index++;
            break;
          }
        }

        // Allow final trailing whitespace.
        if (context._contentTypeTextTrailing && eventIndex === events.length) {
          size = 0;
        }
        if (size) {
          const token = {
            type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
            start: {
              _bufferIndex: index ? bufferIndex : data.start._bufferIndex + bufferIndex,
              _index: data.start._index + index,
              line: data.end.line,
              column: data.end.column - size,
              offset: data.end.offset - size
            },
            end: {
              ...data.end
            }
          };
          data.end = {
            ...token.start
          };
          if (data.start.offset === data.end.offset) {
            Object.assign(data, token);
          } else {
            editMap.add(eventIndex, 0, [['enter', token, context], ['exit', token, context]]);
          }
        }
        eventIndex++;
      }
    }
    editMap.consume(events);
    return events;
  }

  /**
   * @import {Extension} from 'micromark-util-types'
   */


  /** @satisfies {Extension['document']} */
  const document = {
    [42]: list$2,
    [43]: list$2,
    [45]: list$2,
    [48]: list$2,
    [49]: list$2,
    [50]: list$2,
    [51]: list$2,
    [52]: list$2,
    [53]: list$2,
    [54]: list$2,
    [55]: list$2,
    [56]: list$2,
    [57]: list$2,
    [62]: blockQuote
  };

  /** @satisfies {Extension['contentInitial']} */
  const contentInitial = {
    [91]: definition$1
  };

  /** @satisfies {Extension['flowInitial']} */
  const flowInitial = {
    [-2]: codeIndented,
    [-1]: codeIndented,
    [32]: codeIndented
  };

  /** @satisfies {Extension['flow']} */
  const flow = {
    [35]: headingAtx,
    [42]: thematicBreak$1,
    [45]: [setextUnderline, thematicBreak$1],
    [60]: htmlFlow,
    [61]: setextUnderline,
    [95]: thematicBreak$1,
    [96]: codeFenced,
    [126]: codeFenced
  };

  /** @satisfies {Extension['string']} */
  const string = {
    [38]: characterReference,
    [92]: characterEscape
  };

  /** @satisfies {Extension['text']} */
  const text$2 = {
    [-5]: lineEnding,
    [-4]: lineEnding,
    [-3]: lineEnding,
    [33]: labelStartImage,
    [38]: characterReference,
    [42]: attention$2,
    [60]: [autolink, htmlText],
    [91]: labelStartLink,
    [92]: [hardBreakEscape, characterEscape],
    [93]: labelEnd,
    [95]: attention$2,
    [96]: codeText
  };

  /** @satisfies {Extension['insideSpan']} */
  const insideSpan = {
    null: [attention$2, resolver]
  };

  /** @satisfies {Extension['attentionMarkers']} */
  const attentionMarkers = {
    null: [42, 95]
  };

  /** @satisfies {Extension['disable']} */
  const disable = {
    null: []
  };

  var defaultConstructs = /*#__PURE__*/Object.freeze({
    __proto__: null,
    attentionMarkers: attentionMarkers,
    contentInitial: contentInitial,
    disable: disable,
    document: document,
    flow: flow,
    flowInitial: flowInitial,
    insideSpan: insideSpan,
    string: string,
    text: text$2
  });

  /**
   * @import {
   *   Chunk,
   *   Code,
   *   ConstructRecord,
   *   Construct,
   *   Effects,
   *   InitialConstruct,
   *   ParseContext,
   *   Point,
   *   State,
   *   TokenizeContext,
   *   Token
   * } from 'micromark-util-types'
   */

  /**
   * Create a tokenizer.
   * Tokenizers deal with one type of data (e.g., containers, flow, text).
   * The parser is the object dealing with it all.
   * `initialize` works like other constructs, except that only its `tokenize`
   * function is used, in which case it doesn’t receive an `ok` or `nok`.
   * `from` can be given to set the point before the first character, although
   * when further lines are indented, they must be set with `defineSkip`.
   *
   * @param {ParseContext} parser
   *   Parser.
   * @param {InitialConstruct} initialize
   *   Construct.
   * @param {Omit<Point, '_bufferIndex' | '_index'> | undefined} [from]
   *   Point (optional).
   * @returns {TokenizeContext}
   *   Context.
   */
  function createTokenizer(parser, initialize, from) {
    /** @type {Point} */
    let point = {
      _bufferIndex: -1,
      _index: 0,
      line: from && from.line || 1,
      column: from && from.column || 1,
      offset: from && from.offset || 0
    };
    /** @type {Record<string, number>} */
    const columnStart = {};
    /** @type {Array<Construct>} */
    const resolveAllConstructs = [];
    /** @type {Array<Chunk>} */
    let chunks = [];
    /** @type {Array<Token>} */
    let stack = [];

    /**
     * Tools used for tokenizing.
     *
     * @type {Effects}
     */
    const effects = {
      attempt: constructFactory(onsuccessfulconstruct),
      check: constructFactory(onsuccessfulcheck),
      consume,
      enter,
      exit,
      interrupt: constructFactory(onsuccessfulcheck, {
        interrupt: true
      })
    };

    /**
     * State and tools for resolving and serializing.
     *
     * @type {TokenizeContext}
     */
    const context = {
      code: null,
      containerState: {},
      defineSkip,
      events: [],
      now,
      parser,
      previous: null,
      sliceSerialize,
      sliceStream,
      write
    };

    /**
     * The state function.
     *
     * @type {State | undefined}
     */
    let state = initialize.tokenize.call(context, effects);
    if (initialize.resolveAll) {
      resolveAllConstructs.push(initialize);
    }
    return context;

    /** @type {TokenizeContext['write']} */
    function write(slice) {
      chunks = push(chunks, slice);
      main();

      // Exit if we’re not done, resolve might change stuff.
      if (chunks[chunks.length - 1] !== null) {
        return [];
      }
      addResult(initialize, 0);

      // Otherwise, resolve, and exit.
      context.events = resolveAll(resolveAllConstructs, context.events, context);
      return context.events;
    }

    //
    // Tools.
    //

    /** @type {TokenizeContext['sliceSerialize']} */
    function sliceSerialize(token, expandTabs) {
      return serializeChunks(sliceStream(token), expandTabs);
    }

    /** @type {TokenizeContext['sliceStream']} */
    function sliceStream(token) {
      return sliceChunks(chunks, token);
    }

    /** @type {TokenizeContext['now']} */
    function now() {
      // This is a hot path, so we clone manually instead of `Object.assign({}, point)`
      const {
        _bufferIndex,
        _index,
        line,
        column,
        offset
      } = point;
      return {
        _bufferIndex,
        _index,
        line,
        column,
        offset
      };
    }

    /** @type {TokenizeContext['defineSkip']} */
    function defineSkip(value) {
      columnStart[value.line] = value.column;
      accountForPotentialSkip();
    }

    //
    // State management.
    //

    /**
     * Main loop (note that `_index` and `_bufferIndex` in `point` are modified by
     * `consume`).
     * Here is where we walk through the chunks, which either include strings of
     * several characters, or numerical character codes.
     * The reason to do this in a loop instead of a call is so the stack can
     * drain.
     *
     * @returns {undefined}
     *   Nothing.
     */
    function main() {
      while (point._index < chunks.length) {
        const chunk = chunks[point._index];

        // If we’re in a buffer chunk, loop through it.
        if (typeof chunk === 'string') {
          const chunkIndex = point._index;
          if (point._bufferIndex < 0) {
            point._bufferIndex = 0;
          }
          while (point._index === chunkIndex && point._bufferIndex < chunk.length) {
            go(chunk.charCodeAt(point._bufferIndex));
          }
        } else {
          go(chunk);
        }
      }
    }

    /**
     * Deal with one code.
     *
     * @param {Code} code
     *   Code.
     * @returns {undefined}
     *   Nothing.
     */
    function go(code) {
      state = state(code);
    }

    /** @type {Effects['consume']} */
    function consume(code) {
      if (markdownLineEnding(code)) {
        point.line++;
        point.column = 1;
        point.offset += code === -3 ? 2 : 1;
        accountForPotentialSkip();
      } else if (code !== -1) {
        point.column++;
        point.offset++;
      }

      // Not in a string chunk.
      if (point._bufferIndex < 0) {
        point._index++;
      } else {
        point._bufferIndex++;

        // At end of string chunk.
        if (point._bufferIndex ===
        // Points w/ non-negative `_bufferIndex` reference
        // strings.
        /** @type {string} */
        chunks[point._index].length) {
          point._bufferIndex = -1;
          point._index++;
        }
      }

      // Expose the previous character.
      context.previous = code;
    }

    /** @type {Effects['enter']} */
    function enter(type, fields) {
      /** @type {Token} */
      // @ts-expect-error Patch instead of assign required fields to help GC.
      const token = fields || {};
      token.type = type;
      token.start = now();
      context.events.push(['enter', token, context]);
      stack.push(token);
      return token;
    }

    /** @type {Effects['exit']} */
    function exit(type) {
      const token = stack.pop();
      token.end = now();
      context.events.push(['exit', token, context]);
      return token;
    }

    /**
     * Use results.
     *
     * @type {ReturnHandle}
     */
    function onsuccessfulconstruct(construct, info) {
      addResult(construct, info.from);
    }

    /**
     * Discard results.
     *
     * @type {ReturnHandle}
     */
    function onsuccessfulcheck(_, info) {
      info.restore();
    }

    /**
     * Factory to attempt/check/interrupt.
     *
     * @param {ReturnHandle} onreturn
     *   Callback.
     * @param {{interrupt?: boolean | undefined} | undefined} [fields]
     *   Fields.
     */
    function constructFactory(onreturn, fields) {
      return hook;

      /**
       * Handle either an object mapping codes to constructs, a list of
       * constructs, or a single construct.
       *
       * @param {Array<Construct> | ConstructRecord | Construct} constructs
       *   Constructs.
       * @param {State} returnState
       *   State.
       * @param {State | undefined} [bogusState]
       *   State.
       * @returns {State}
       *   State.
       */
      function hook(constructs, returnState, bogusState) {
        /** @type {ReadonlyArray<Construct>} */
        let listOfConstructs;
        /** @type {number} */
        let constructIndex;
        /** @type {Construct} */
        let currentConstruct;
        /** @type {Info} */
        let info;
        return Array.isArray(constructs) ? /* c8 ignore next 1 */
        handleListOfConstructs(constructs) : 'tokenize' in constructs ?
        // Looks like a construct.
        handleListOfConstructs([(/** @type {Construct} */constructs)]) : handleMapOfConstructs(constructs);

        /**
         * Handle a list of construct.
         *
         * @param {ConstructRecord} map
         *   Constructs.
         * @returns {State}
         *   State.
         */
        function handleMapOfConstructs(map) {
          return start;

          /** @type {State} */
          function start(code) {
            const left = code !== null && map[code];
            const all = code !== null && map.null;
            const list = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...(Array.isArray(left) ? left : left ? [left] : []), ...(Array.isArray(all) ? all : all ? [all] : [])];
            return handleListOfConstructs(list)(code);
          }
        }

        /**
         * Handle a list of construct.
         *
         * @param {ReadonlyArray<Construct>} list
         *   Constructs.
         * @returns {State}
         *   State.
         */
        function handleListOfConstructs(list) {
          listOfConstructs = list;
          constructIndex = 0;
          if (list.length === 0) {
            return bogusState;
          }
          return handleConstruct(list[constructIndex]);
        }

        /**
         * Handle a single construct.
         *
         * @param {Construct} construct
         *   Construct.
         * @returns {State}
         *   State.
         */
        function handleConstruct(construct) {
          return start;

          /** @type {State} */
          function start(code) {
            // To do: not needed to store if there is no bogus state, probably?
            // Currently doesn’t work because `inspect` in document does a check
            // w/o a bogus, which doesn’t make sense. But it does seem to help perf
            // by not storing.
            info = store();
            currentConstruct = construct;
            if (!construct.partial) {
              context.currentConstruct = construct;
            }

            // Always populated by defaults.

            if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
              return nok();
            }
            return construct.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            fields ? Object.assign(Object.create(context), fields) : context, effects, ok, nok)(code);
          }
        }

        /** @type {State} */
        function ok(code) {
          onreturn(currentConstruct, info);
          return returnState;
        }

        /** @type {State} */
        function nok(code) {
          info.restore();
          if (++constructIndex < listOfConstructs.length) {
            return handleConstruct(listOfConstructs[constructIndex]);
          }
          return bogusState;
        }
      }
    }

    /**
     * @param {Construct} construct
     *   Construct.
     * @param {number} from
     *   From.
     * @returns {undefined}
     *   Nothing.
     */
    function addResult(construct, from) {
      if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
        resolveAllConstructs.push(construct);
      }
      if (construct.resolve) {
        splice(context.events, from, context.events.length - from, construct.resolve(context.events.slice(from), context));
      }
      if (construct.resolveTo) {
        context.events = construct.resolveTo(context.events, context);
      }
    }

    /**
     * Store state.
     *
     * @returns {Info}
     *   Info.
     */
    function store() {
      const startPoint = now();
      const startPrevious = context.previous;
      const startCurrentConstruct = context.currentConstruct;
      const startEventsIndex = context.events.length;
      const startStack = Array.from(stack);
      return {
        from: startEventsIndex,
        restore
      };

      /**
       * Restore state.
       *
       * @returns {undefined}
       *   Nothing.
       */
      function restore() {
        point = startPoint;
        context.previous = startPrevious;
        context.currentConstruct = startCurrentConstruct;
        context.events.length = startEventsIndex;
        stack = startStack;
        accountForPotentialSkip();
      }
    }

    /**
     * Move the current point a bit forward in the line when it’s on a column
     * skip.
     *
     * @returns {undefined}
     *   Nothing.
     */
    function accountForPotentialSkip() {
      if (point.line in columnStart && point.column < 2) {
        point.column = columnStart[point.line];
        point.offset += columnStart[point.line] - 1;
      }
    }
  }

  /**
   * Get the chunks from a slice of chunks in the range of a token.
   *
   * @param {ReadonlyArray<Chunk>} chunks
   *   Chunks.
   * @param {Pick<Token, 'end' | 'start'>} token
   *   Token.
   * @returns {Array<Chunk>}
   *   Chunks.
   */
  function sliceChunks(chunks, token) {
    const startIndex = token.start._index;
    const startBufferIndex = token.start._bufferIndex;
    const endIndex = token.end._index;
    const endBufferIndex = token.end._bufferIndex;
    /** @type {Array<Chunk>} */
    let view;
    if (startIndex === endIndex) {
      // @ts-expect-error `_bufferIndex` is used on string chunks.
      view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
    } else {
      view = chunks.slice(startIndex, endIndex);
      if (startBufferIndex > -1) {
        const head = view[0];
        if (typeof head === 'string') {
          view[0] = head.slice(startBufferIndex);
          /* c8 ignore next 4 -- used to be used, no longer */
        } else {
          view.shift();
        }
      }
      if (endBufferIndex > 0) {
        // @ts-expect-error `_bufferIndex` is used on string chunks.
        view.push(chunks[endIndex].slice(0, endBufferIndex));
      }
    }
    return view;
  }

  /**
   * Get the string value of a slice of chunks.
   *
   * @param {ReadonlyArray<Chunk>} chunks
   *   Chunks.
   * @param {boolean | undefined} [expandTabs=false]
   *   Whether to expand tabs (default: `false`).
   * @returns {string}
   *   Result.
   */
  function serializeChunks(chunks, expandTabs) {
    let index = -1;
    /** @type {Array<string>} */
    const result = [];
    /** @type {boolean | undefined} */
    let atTab;
    while (++index < chunks.length) {
      const chunk = chunks[index];
      /** @type {string} */
      let value;
      if (typeof chunk === 'string') {
        value = chunk;
      } else {
        switch (chunk) {
          case -5:
            {
              value = "\r";
              break;
            }
          case -4:
            {
              value = "\n";
              break;
            }
          case -3:
            {
              value = "\r" + "\n";
              break;
            }
          case -2:
            {
              value = expandTabs ? " " : "\t";
              break;
            }
          case -1:
            {
              if (!expandTabs && atTab) {
                continue;
              }
              value = " ";
              break;
            }
          default:
            {
              // Currently only replacement character.
              value = String.fromCharCode(chunk);
            }
        }
      }
      atTab = chunk === -2;
      result.push(value);
    }
    return result.join('');
  }

  /**
   * @import {
   *   Create,
   *   FullNormalizedExtension,
   *   InitialConstruct,
   *   ParseContext,
   *   ParseOptions
   * } from 'micromark-util-types'
   */


  /**
   * @param {ParseOptions | null | undefined} [options]
   *   Configuration (optional).
   * @returns {ParseContext}
   *   Parser.
   */
  function parse(options) {
    const settings = options || {};
    const constructs = /** @type {FullNormalizedExtension} */
    combineExtensions([defaultConstructs, ...(settings.extensions || [])]);

    /** @type {ParseContext} */
    const parser = {
      constructs,
      content: create(content$1),
      defined: [],
      document: create(document$1),
      flow: create(flow$1),
      lazy: {},
      string: create(string$1),
      text: create(text$3)
    };
    return parser;

    /**
     * @param {InitialConstruct} initial
     *   Construct to start with.
     * @returns {Create}
     *   Create a tokenizer.
     */
    function create(initial) {
      return creator;
      /** @type {Create} */
      function creator(from) {
        return createTokenizer(parser, initial, from);
      }
    }
  }

  /**
   * @import {Event} from 'micromark-util-types'
   */


  /**
   * @param {Array<Event>} events
   *   Events.
   * @returns {Array<Event>}
   *   Events.
   */
  function postprocess(events) {
    while (!subtokenize(events)) {
      // Empty
    }
    return events;
  }

  /**
   * @import {Chunk, Code, Encoding, Value} from 'micromark-util-types'
   */

  /**
   * @callback Preprocessor
   *   Preprocess a value.
   * @param {Value} value
   *   Value.
   * @param {Encoding | null | undefined} [encoding]
   *   Encoding when `value` is a typed array (optional).
   * @param {boolean | null | undefined} [end=false]
   *   Whether this is the last chunk (default: `false`).
   * @returns {Array<Chunk>}
   *   Chunks.
   */

  const search = /[\0\t\n\r]/g;

  /**
   * @returns {Preprocessor}
   *   Preprocess a value.
   */
  function preprocess() {
    let column = 1;
    let buffer = '';
    /** @type {boolean | undefined} */
    let start = true;
    /** @type {boolean | undefined} */
    let atCarriageReturn;
    return preprocessor;

    /** @type {Preprocessor} */
    // eslint-disable-next-line complexity
    function preprocessor(value, encoding, end) {
      value = buffer + (typeof value === 'string' ? value.toString() : new TextDecoder(encoding || undefined).decode(value));

      /** @type {Array<Chunk>} */
      const chunks = [];
      let startPosition = 0;
      buffer = '';
      if (start) {
        // To do: `markdown-rs` actually parses BOMs (byte order mark).
        if (value.charCodeAt(0) === 65279) {
          startPosition++;
        }
        start = undefined;
      }
      while (startPosition < value.length) {
        search.lastIndex = startPosition;
        const match = search.exec(value);
        const endPosition = match && match.index !== undefined ? match.index : value.length;
        const code = value.charCodeAt(endPosition);
        if (!match) {
          buffer = value.slice(startPosition);
          break;
        }
        if (code === 10 && startPosition === endPosition && atCarriageReturn) {
          chunks.push(-3);
          atCarriageReturn = undefined;
        } else {
          if (atCarriageReturn) {
            chunks.push(-5);
            atCarriageReturn = undefined;
          }
          if (startPosition < endPosition) {
            chunks.push(value.slice(startPosition, endPosition));
            column += endPosition - startPosition;
          }
          switch (code) {
            case 0:
              {
                chunks.push(65533);
                column++;
                break;
              }
            case 9:
              {
                const next = Math.ceil(column / 4) * 4;
                chunks.push(-2);
                while (column++ < next) {
                  chunks.push(-1);
                }
                break;
              }
            case 10:
              {
                chunks.push(-4);
                column = 1;
                break;
              }
            default:
              {
                atCarriageReturn = true;
                column = 1;
              }
          }
        }
        startPosition = endPosition + 1;
      }
      if (end) {
        if (atCarriageReturn) {
          chunks.push(-5);
        }
        if (buffer) {
          chunks.push(buffer);
        }
        chunks.push(null);
      }
      return chunks;
    }
  }

  const characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;

  /**
   * Decode markdown strings (which occur in places such as fenced code info
   * strings, destinations, labels, and titles).
   *
   * The “string” content type allows character escapes and -references.
   * This decodes those.
   *
   * @param {string} value
   *   Value to decode.
   * @returns {string}
   *   Decoded value.
   */
  function decodeString(value) {
    return value.replace(characterEscapeOrReference, decode);
  }

  /**
   * @param {string} $0
   *   Match.
   * @param {string} $1
   *   Character escape.
   * @param {string} $2
   *   Character reference.
   * @returns {string}
   *   Decoded value
   */
  function decode($0, $1, $2) {
    if ($1) {
      // Escape.
      return $1;
    }

    // Reference.
    const head = $2.charCodeAt(0);
    if (head === 35) {
      const head = $2.charCodeAt(1);
      const hex = head === 120 || head === 88;
      return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
    }
    return decodeNamedCharacterReference($2) || $0;
  }

  /**
   * @typedef {import('unist').Node} Node
   * @typedef {import('unist').Point} Point
   * @typedef {import('unist').Position} Position
   */

  /**
   * @typedef NodeLike
   * @property {string} type
   * @property {PositionLike | null | undefined} [position]
   *
   * @typedef PointLike
   * @property {number | null | undefined} [line]
   * @property {number | null | undefined} [column]
   * @property {number | null | undefined} [offset]
   *
   * @typedef PositionLike
   * @property {PointLike | null | undefined} [start]
   * @property {PointLike | null | undefined} [end]
   */

  /**
   * Serialize the positional info of a point, position (start and end points),
   * or node.
   *
   * @param {Node | NodeLike | Point | PointLike | Position | PositionLike | null | undefined} [value]
   *   Node, position, or point.
   * @returns {string}
   *   Pretty printed positional info of a node (`string`).
   *
   *   In the format of a range `ls:cs-le:ce` (when given `node` or `position`)
   *   or a point `l:c` (when given `point`), where `l` stands for line, `c` for
   *   column, `s` for `start`, and `e` for end.
   *   An empty string (`''`) is returned if the given value is neither `node`,
   *   `position`, nor `point`.
   */
  function stringifyPosition(value) {
    // Nothing.
    if (!value || typeof value !== 'object') {
      return ''
    }

    // Node.
    if ('position' in value || 'type' in value) {
      return position(value.position)
    }

    // Position.
    if ('start' in value || 'end' in value) {
      return position(value)
    }

    // Point.
    if ('line' in value || 'column' in value) {
      return point$1(value)
    }

    // ?
    return ''
  }

  /**
   * @param {Point | PointLike | null | undefined} point
   * @returns {string}
   */
  function point$1(point) {
    return index(point && point.line) + ':' + index(point && point.column)
  }

  /**
   * @param {Position | PositionLike | null | undefined} pos
   * @returns {string}
   */
  function position(pos) {
    return point$1(pos && pos.start) + '-' + point$1(pos && pos.end)
  }

  /**
   * @param {number | null | undefined} value
   * @returns {number}
   */
  function index(value) {
    return value && typeof value === 'number' ? value : 1
  }

  /**
   * @import {
   *   Break,
   *   Blockquote,
   *   Code,
   *   Definition,
   *   Emphasis,
   *   Heading,
   *   Html,
   *   Image,
   *   InlineCode,
   *   Link,
   *   ListItem,
   *   List,
   *   Nodes,
   *   Paragraph,
   *   PhrasingContent,
   *   ReferenceType,
   *   Root,
   *   Strong,
   *   Text,
   *   ThematicBreak
   * } from 'mdast'
   * @import {
   *   Encoding,
   *   Event,
   *   Token,
   *   Value
   * } from 'micromark-util-types'
   * @import {Point} from 'unist'
   * @import {
   *   CompileContext,
   *   CompileData,
   *   Config,
   *   Extension,
   *   Handle,
   *   OnEnterError,
   *   Options
   * } from './types.js'
   */

  const own$4 = {}.hasOwnProperty;

  /**
   * Turn markdown into a syntax tree.
   *
   * @overload
   * @param {Value} value
   * @param {Encoding | null | undefined} [encoding]
   * @param {Options | null | undefined} [options]
   * @returns {Root}
   *
   * @overload
   * @param {Value} value
   * @param {Options | null | undefined} [options]
   * @returns {Root}
   *
   * @param {Value} value
   *   Markdown to parse.
   * @param {Encoding | Options | null | undefined} [encoding]
   *   Character encoding for when `value` is `Buffer`.
   * @param {Options | null | undefined} [options]
   *   Configuration.
   * @returns {Root}
   *   mdast tree.
   */
  function fromMarkdown(value, encoding, options) {
    if (encoding && typeof encoding === 'object') {
      options = encoding;
      encoding = undefined;
    }
    return compiler(options)(postprocess(parse(options).document().write(preprocess()(value, encoding, true))));
  }

  /**
   * Note this compiler only understand complete buffering, not streaming.
   *
   * @param {Options | null | undefined} [options]
   */
  function compiler(options) {
    /** @type {Config} */
    const config = {
      afterExit: [],
      beforeEnter: [],
      transforms: [],
      canContainEols: ['emphasis', 'fragment', 'heading', 'paragraph', 'strong'],
      enter: {
        autolink: opener(link),
        autolinkProtocol: onenterdata,
        autolinkEmail: onenterdata,
        atxHeading: opener(heading),
        blockQuote: opener(blockQuote),
        characterEscape: onenterdata,
        characterReference: onenterdata,
        codeFenced: opener(codeFlow),
        codeFencedFenceInfo: buffer,
        codeFencedFenceMeta: buffer,
        codeIndented: opener(codeFlow, buffer),
        codeText: opener(codeText, buffer),
        codeTextData: onenterdata,
        data: onenterdata,
        codeFlowValue: onenterdata,
        definition: opener(definition),
        definitionDestinationString: buffer,
        definitionLabelString: buffer,
        definitionTitleString: buffer,
        emphasis: opener(emphasis),
        hardBreakEscape: opener(hardBreak),
        hardBreakTrailing: opener(hardBreak),
        htmlFlow: opener(html, buffer),
        htmlFlowData: onenterdata,
        htmlText: opener(html, buffer),
        htmlTextData: onenterdata,
        image: opener(image),
        label: buffer,
        link: opener(link),
        listItem: opener(listItem),
        listItemValue: onenterlistitemvalue,
        listOrdered: opener(list, onenterlistordered),
        listUnordered: opener(list),
        paragraph: opener(paragraph),
        reference: onenterreference,
        referenceString: buffer,
        resourceDestinationString: buffer,
        resourceTitleString: buffer,
        setextHeading: opener(heading),
        strong: opener(strong),
        thematicBreak: opener(thematicBreak)
      },
      exit: {
        atxHeading: closer(),
        atxHeadingSequence: onexitatxheadingsequence,
        autolink: closer(),
        autolinkEmail: onexitautolinkemail,
        autolinkProtocol: onexitautolinkprotocol,
        blockQuote: closer(),
        characterEscapeValue: onexitdata,
        characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
        characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
        characterReferenceValue: onexitcharacterreferencevalue,
        characterReference: onexitcharacterreference,
        codeFenced: closer(onexitcodefenced),
        codeFencedFence: onexitcodefencedfence,
        codeFencedFenceInfo: onexitcodefencedfenceinfo,
        codeFencedFenceMeta: onexitcodefencedfencemeta,
        codeFlowValue: onexitdata,
        codeIndented: closer(onexitcodeindented),
        codeText: closer(onexitcodetext),
        codeTextData: onexitdata,
        data: onexitdata,
        definition: closer(),
        definitionDestinationString: onexitdefinitiondestinationstring,
        definitionLabelString: onexitdefinitionlabelstring,
        definitionTitleString: onexitdefinitiontitlestring,
        emphasis: closer(),
        hardBreakEscape: closer(onexithardbreak),
        hardBreakTrailing: closer(onexithardbreak),
        htmlFlow: closer(onexithtmlflow),
        htmlFlowData: onexitdata,
        htmlText: closer(onexithtmltext),
        htmlTextData: onexitdata,
        image: closer(onexitimage),
        label: onexitlabel,
        labelText: onexitlabeltext,
        lineEnding: onexitlineending,
        link: closer(onexitlink),
        listItem: closer(),
        listOrdered: closer(),
        listUnordered: closer(),
        paragraph: closer(),
        referenceString: onexitreferencestring,
        resourceDestinationString: onexitresourcedestinationstring,
        resourceTitleString: onexitresourcetitlestring,
        resource: onexitresource,
        setextHeading: closer(onexitsetextheading),
        setextHeadingLineSequence: onexitsetextheadinglinesequence,
        setextHeadingText: onexitsetextheadingtext,
        strong: closer(),
        thematicBreak: closer()
      }
    };
    configure$1(config, (options || {}).mdastExtensions || []);

    /** @type {CompileData} */
    const data = {};
    return compile;

    /**
     * Turn micromark events into an mdast tree.
     *
     * @param {Array<Event>} events
     *   Events.
     * @returns {Root}
     *   mdast tree.
     */
    function compile(events) {
      /** @type {Root} */
      let tree = {
        type: 'root',
        children: [],
        position: undefined
      };
      /** @type {Omit<CompileContext, 'sliceSerialize'>} */
      const context = {
        stack: [tree],
        tokenStack: [],
        config,
        enter,
        exit,
        buffer,
        resume,
        data
      };
      /** @type {Array<number>} */
      const listStack = [];
      /** @type {Array<Event>} */
      const prepared = [];
      let index = -1;

      // Add `listItem` tokens and infer spread.
      // Each list is prepared while it is last in `prepared`, so nothing shifts.
      while (++index < events.length) {
        prepared.push(events[index]);
        if (events[index][1].type === "listOrdered" || events[index][1].type === "listUnordered") {
          if (events[index][0] === 'enter') {
            listStack.push(prepared.length - 1);
          } else {
            const tail = listStack.pop();
            prepareList(prepared, tail);
          }
        }
      }
      events = prepared;
      index = -1;
      while (++index < events.length) {
        const handler = config[events[index][0]];
        if (events[index][0] === 'enter' && config.beforeEnter.length > 0) {
          callListeners(config.beforeEnter, {
            ...context,
            sliceSerialize: events[index][2].sliceSerialize
          }, events[index][1]);
        }
        if (own$4.call(handler, events[index][1].type)) {
          // Note: spread first, V8 has optimizations for object shape cloning.
          handler[events[index][1].type].call({
            ...context,
            sliceSerialize: events[index][2].sliceSerialize
          }, events[index][1]);
        }
        if (events[index][0] === 'exit' && config.afterExit.length > 0) {
          callListeners(config.afterExit, {
            ...context,
            sliceSerialize: events[index][2].sliceSerialize
          }, events[index][1]);
        }
      }

      // Handle tokens still being open.
      if (context.tokenStack.length > 0) {
        const tail = context.tokenStack[context.tokenStack.length - 1];
        const handler = tail[1] || defaultOnError;
        handler.call(context, undefined, tail[0]);
      }

      // Figure out `root` position.
      tree.position = {
        start: point(events.length > 0 ? events[0][1].start : {
          line: 1,
          column: 1,
          offset: 0
        }),
        end: point(events.length > 0 ? events[events.length - 2][1].end : {
          line: 1,
          column: 1,
          offset: 0
        })
      };

      // Call transforms.
      index = -1;
      while (++index < config.transforms.length) {
        tree = config.transforms[index](tree) || tree;
      }
      return tree;
    }

    /**
     * @param {Array<Handle>} listeners
     *   Listeners.
     * @param {CompileContext} context
     *   Context.
     * @param {Token} token
     *   Token.
     * @returns {undefined}
     *   Nothing.
     */
    function callListeners(listeners, context, token) {
      let index = -1;
      while (++index < listeners.length) {
        listeners[index].call(context, token);
      }
    }

    /**
     * @param {Array<Event>} events
     *   Events, ending with the list to prepare.
     * @param {number} start
     *   Index of the list enter.
     * @returns {undefined}
     */
    function prepareList(events, start) {
      const end = events.length - 1;
      let index = start - 1;
      let containerBalance = -1;
      let listSpread = false;
      /** @type {Token | undefined} */
      let listItem;
      /** @type {number | undefined} */
      let lineIndex;
      /** @type {number | undefined} */
      let firstBlankLineIndex;
      /** @type {boolean | undefined} */
      let atMarker;
      /**
       * `listItem` events to insert before the event at `at`, in walk order.
       * Merged in after the walk, as inserting while walking would shift the
       * rest of the list once per item.
       * @type {Array<{at: number, event: Event}>}
       */
      const insertions = [];
      while (++index <= end) {
        const event = events[index];
        switch (event[1].type) {
          case "listUnordered":
          case "listOrdered":
          case "blockQuote":
            {
              if (event[0] === 'enter') {
                containerBalance++;
              } else {
                containerBalance--;
              }
              atMarker = undefined;
              break;
            }
          case "lineEndingBlank":
            {
              if (event[0] === 'enter') {
                if (listItem && !atMarker && !containerBalance && !firstBlankLineIndex) {
                  firstBlankLineIndex = index;
                }
                atMarker = undefined;
              }
              break;
            }
          case "linePrefix":
          case "listItemValue":
          case "listItemMarker":
          case "listItemPrefix":
          case "listItemPrefixWhitespace":
            {
              // Empty.

              break;
            }
          default:
            {
              atMarker = undefined;
            }
        }
        if (!containerBalance && event[0] === 'enter' && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === 'exit' && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
          if (listItem) {
            let tailIndex = index;
            lineIndex = undefined;
            while (tailIndex--) {
              const tailEvent = events[tailIndex];
              if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
                if (tailEvent[0] === 'exit') continue;
                if (lineIndex) {
                  events[lineIndex][1].type = "lineEndingBlank";
                  listSpread = true;
                }
                tailEvent[1].type = "lineEnding";
                lineIndex = tailIndex;
              } else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") ; else {
                break;
              }
            }
            if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
              listItem._spread = true;
            }

            // Fix position.
            listItem.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
            insertions.push({
              at: lineIndex || index,
              event: ['exit', listItem, event[2]]
            });
          }

          // Create a new list item.
          if (event[1].type === "listItemPrefix") {
            /** @type {Token} */
            const item = {
              type: 'listItem',
              _spread: false,
              start: Object.assign({}, event[1].start),
              // @ts-expect-error: we’ll add `end` in a second.
              end: undefined
            };
            listItem = item;
            insertions.push({
              at: index,
              event: ['enter', item, event[2]]
            });
            firstBlankLineIndex = undefined;
            atMarker = true;
          }
        }
      }

      // The list is at the end of `events`: take it off, then push it back with
      // the insertions merged in.
      // Nothing follows the list, so nothing shifts.
      const listEvents = events.splice(start);
      let insertion = 0;
      index = -1;
      while (++index < listEvents.length) {
        while (insertion < insertions.length && insertions[insertion].at === start + index) {
          events.push(insertions[insertion++].event);
        }
        events.push(listEvents[index]);
      }
      events[start][1]._spread = listSpread;
    }

    /**
     * Create an opener handle.
     *
     * @param {(token: Token) => Nodes} create
     *   Create a node.
     * @param {Handle | undefined} [and]
     *   Optional function to also run.
     * @returns {Handle}
     *   Handle.
     */
    function opener(create, and) {
      return open;

      /**
       * @this {CompileContext}
       * @param {Token} token
       * @returns {undefined}
       */
      function open(token) {
        enter.call(this, create(token), token);
        if (and) and.call(this, token);
      }
    }

    /**
     * @type {CompileContext['buffer']}
     */
    function buffer() {
      this.stack.push({
        type: 'fragment',
        children: []
      });
    }

    /**
     * @type {CompileContext['enter']}
     */
    function enter(node, token, errorHandler) {
      const parent = this.stack[this.stack.length - 1];
      /** @type {Array<Nodes>} */
      const siblings = parent.children;
      siblings.push(node);
      this.stack.push(node);
      this.tokenStack.push([token, errorHandler || undefined]);
      node.position = {
        start: point(token.start),
        // @ts-expect-error: `end` will be patched later.
        end: undefined
      };
    }

    /**
     * Create a closer handle.
     *
     * @param {Handle | undefined} [and]
     *   Optional function to also run.
     * @returns {Handle}
     *   Handle.
     */
    function closer(and) {
      return close;

      /**
       * @this {CompileContext}
       * @param {Token} token
       * @returns {undefined}
       */
      function close(token) {
        if (and) and.call(this, token);
        exit.call(this, token);
      }
    }

    /**
     * @type {CompileContext['exit']}
     */
    function exit(token, onExitError) {
      const node = this.stack.pop();
      const open = this.tokenStack.pop();
      if (!open) {
        throw new Error('Cannot close `' + token.type + '` (' + stringifyPosition({
          start: token.start,
          end: token.end
        }) + '): it’s not open');
      }
      if (open[0].type !== token.type) {
        if (onExitError) {
          onExitError.call(this, token, open[0]);
        } else {
          const handler = open[1] || defaultOnError;
          handler.call(this, token, open[0]);
        }
      }
      node.position.end = point(token.end);
    }

    /**
     * @type {CompileContext['resume']}
     */
    function resume() {
      return toString(this.stack.pop());
    }

    //
    // Handlers.
    //

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onenterlistordered() {
      this.data.expectingFirstListItemValue = true;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onenterlistitemvalue(token) {
      if (this.data.expectingFirstListItemValue) {
        const ancestor = this.stack[this.stack.length - 2];
        ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
        this.data.expectingFirstListItemValue = undefined;
      }
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onexitcodefencedfenceinfo() {
      const data = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.lang = data;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onexitcodefencedfencemeta() {
      const data = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.meta = data;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onexitcodefencedfence() {
      // Exit if this is the closing fence.
      if (this.data.flowCodeInside) return;
      this.buffer();
      this.data.flowCodeInside = true;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onexitcodefenced() {
      const data = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '');
      this.data.flowCodeInside = undefined;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onexitcodeindented() {
      const data = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.value = data.replace(/(\r?\n|\r)$/g, '');
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onexitdefinitionlabelstring(token) {
      const label = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.label = label;
      node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onexitdefinitiontitlestring() {
      const data = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.title = data;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onexitdefinitiondestinationstring() {
      const data = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.url = data;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onexitatxheadingsequence(token) {
      const node = this.stack[this.stack.length - 1];
      if (!node.depth) {
        const depth = this.sliceSerialize(token).length;
        node.depth = depth;
      }
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onexitsetextheadingtext() {
      this.data.setextHeadingSlurpLineEnding = true;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onexitsetextheadinglinesequence(token) {
      const node = this.stack[this.stack.length - 1];
      node.depth = this.sliceSerialize(token).codePointAt(0) === 61 ? 1 : 2;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onexitsetextheading() {
      this.data.setextHeadingSlurpLineEnding = undefined;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onenterdata(token) {
      const node = this.stack[this.stack.length - 1];
      /** @type {Array<Nodes>} */
      const siblings = node.children;
      let tail = siblings[siblings.length - 1];
      if (!tail || tail.type !== 'text') {
        // Add a new text node.
        tail = text();
        tail.position = {
          start: point(token.start),
          // @ts-expect-error: we’ll add `end` later.
          end: undefined
        };
        siblings.push(tail);
      }
      this.stack.push(tail);
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onexitdata(token) {
      const tail = this.stack.pop();
      tail.value += this.sliceSerialize(token);
      tail.position.end = point(token.end);
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onexitlineending(token) {
      const context = this.stack[this.stack.length - 1];
      // If we’re at a hard break, include the line ending in there.
      if (this.data.atHardBreak) {
        const tail = context.children[context.children.length - 1];
        tail.position.end = point(token.end);
        this.data.atHardBreak = undefined;
        return;
      }
      if (!this.data.setextHeadingSlurpLineEnding && config.canContainEols.includes(context.type)) {
        onenterdata.call(this, token);
        onexitdata.call(this, token);
      }
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onexithardbreak() {
      this.data.atHardBreak = true;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onexithtmlflow() {
      const data = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.value = data;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onexithtmltext() {
      const data = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.value = data;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onexitcodetext() {
      const data = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.value = data;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onexitlink() {
      const node = this.stack[this.stack.length - 1];
      // Note: there are also `identifier` and `label` fields on this link node!
      // These are used / cleaned here.

      // To do: clean.
      if (this.data.inReference) {
        /** @type {ReferenceType} */
        const referenceType = this.data.referenceType || 'shortcut';
        node.type += 'Reference';
        // @ts-expect-error: mutate.
        node.referenceType = referenceType;
        // @ts-expect-error: mutate.
        delete node.url;
        delete node.title;
      } else {
        // @ts-expect-error: mutate.
        delete node.identifier;
        // @ts-expect-error: mutate.
        delete node.label;
      }
      this.data.referenceType = undefined;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onexitimage() {
      const node = this.stack[this.stack.length - 1];
      // Note: there are also `identifier` and `label` fields on this link node!
      // These are used / cleaned here.

      // To do: clean.
      if (this.data.inReference) {
        /** @type {ReferenceType} */
        const referenceType = this.data.referenceType || 'shortcut';
        node.type += 'Reference';
        // @ts-expect-error: mutate.
        node.referenceType = referenceType;
        // @ts-expect-error: mutate.
        delete node.url;
        delete node.title;
      } else {
        // @ts-expect-error: mutate.
        delete node.identifier;
        // @ts-expect-error: mutate.
        delete node.label;
      }
      this.data.referenceType = undefined;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onexitlabeltext(token) {
      const string = this.sliceSerialize(token);
      const ancestor = this.stack[this.stack.length - 2];
      // @ts-expect-error: stash this on the node, as it might become a reference
      // later.
      ancestor.label = decodeString(string);
      // @ts-expect-error: same as above.
      ancestor.identifier = normalizeIdentifier(string).toLowerCase();
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onexitlabel() {
      const fragment = this.stack[this.stack.length - 1];
      const value = this.resume();
      const node = this.stack[this.stack.length - 1];
      // Assume a reference.
      this.data.inReference = true;
      if (node.type === 'link') {
        /** @type {Array<PhrasingContent>} */
        const children = fragment.children;
        node.children = children;
      } else {
        node.alt = value;
      }
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onexitresourcedestinationstring() {
      const data = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.url = data;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onexitresourcetitlestring() {
      const data = this.resume();
      const node = this.stack[this.stack.length - 1];
      node.title = data;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onexitresource() {
      this.data.inReference = undefined;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onenterreference() {
      this.data.referenceType = 'collapsed';
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onexitreferencestring(token) {
      const label = this.resume();
      const node = this.stack[this.stack.length - 1];
      // @ts-expect-error: stash this on the node, as it might become a reference
      // later.
      node.label = label;
      // @ts-expect-error: same as above.
      node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
      this.data.referenceType = 'full';
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */

    function onexitcharacterreferencemarker(token) {
      this.data.characterReferenceType = token.type;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onexitcharacterreferencevalue(token) {
      const data = this.sliceSerialize(token);
      const type = this.data.characterReferenceType;
      /** @type {string} */
      let value;
      if (type) {
        value = decodeNumericCharacterReference(data, type === "characterReferenceMarkerNumeric" ? 10 : 16);
        this.data.characterReferenceType = undefined;
      } else {
        const result = decodeNamedCharacterReference(data);
        value = result;
      }
      const tail = this.stack[this.stack.length - 1];
      tail.value += value;
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onexitcharacterreference(token) {
      const tail = this.stack.pop();
      tail.position.end = point(token.end);
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onexitautolinkprotocol(token) {
      onexitdata.call(this, token);
      const node = this.stack[this.stack.length - 1];
      node.url = this.sliceSerialize(token);
    }

    /**
     * @this {CompileContext}
     * @type {Handle}
     */
    function onexitautolinkemail(token) {
      onexitdata.call(this, token);
      const node = this.stack[this.stack.length - 1];
      node.url = 'mailto:' + this.sliceSerialize(token);
    }

    //
    // Creaters.
    //

    // Each node factory pre-declares `position` as undefined as the trailing
    // property. enter() patches it to a real value, but the property already
    // exists, so V8 sees a single hidden class for each node type from
    // construction through the rest of the pipeline. Without the pre-declare,
    // each node took a hidden-class transition when enter() added position.

    /** @returns {Blockquote} */
    function blockQuote() {
      return {
        type: 'blockquote',
        children: [],
        position: undefined
      };
    }

    /** @returns {Code} */
    function codeFlow() {
      return {
        type: 'code',
        lang: null,
        meta: null,
        value: '',
        position: undefined
      };
    }

    /** @returns {InlineCode} */
    function codeText() {
      return {
        type: 'inlineCode',
        value: '',
        position: undefined
      };
    }

    /** @returns {Definition} */
    function definition() {
      return {
        type: 'definition',
        identifier: '',
        label: null,
        title: null,
        url: '',
        position: undefined
      };
    }

    /** @returns {Emphasis} */
    function emphasis() {
      return {
        type: 'emphasis',
        children: [],
        position: undefined
      };
    }

    /** @returns {Heading} */
    function heading() {
      return {
        type: 'heading',
        // @ts-expect-error `depth` will be set later.
        depth: 0,
        children: [],
        position: undefined
      };
    }

    /** @returns {Break} */
    function hardBreak() {
      return {
        type: 'break',
        position: undefined
      };
    }

    /** @returns {Html} */
    function html() {
      return {
        type: 'html',
        value: '',
        position: undefined
      };
    }

    /** @returns {Image} */
    function image() {
      return {
        type: 'image',
        title: null,
        url: '',
        alt: null,
        position: undefined
      };
    }

    /** @returns {Link} */
    function link() {
      return {
        type: 'link',
        title: null,
        url: '',
        children: [],
        position: undefined
      };
    }

    /**
     * @param {Token} token
     * @returns {List}
     */
    function list(token) {
      return {
        type: 'list',
        ordered: token.type === 'listOrdered',
        start: null,
        spread: token._spread,
        children: [],
        position: undefined
      };
    }

    /**
     * @param {Token} token
     * @returns {ListItem}
     */
    function listItem(token) {
      return {
        type: 'listItem',
        spread: token._spread,
        checked: null,
        children: [],
        position: undefined
      };
    }

    /** @returns {Paragraph} */
    function paragraph() {
      return {
        type: 'paragraph',
        children: [],
        position: undefined
      };
    }

    /** @returns {Strong} */
    function strong() {
      return {
        type: 'strong',
        children: [],
        position: undefined
      };
    }

    /** @returns {Text} */
    function text() {
      return {
        type: 'text',
        value: '',
        position: undefined
      };
    }

    /** @returns {ThematicBreak} */
    function thematicBreak() {
      return {
        type: 'thematicBreak',
        position: undefined
      };
    }
  }

  /**
   * Copy a point-like value.
   *
   * @param {Point} d
   *   Point-like value.
   * @returns {Point}
   *   unist point.
   */
  function point(d) {
    return {
      line: d.line,
      column: d.column,
      offset: d.offset
    };
  }

  /**
   * @param {Config} combined
   * @param {Array<Array<Extension> | Extension>} extensions
   * @returns {undefined}
   */
  function configure$1(combined, extensions) {
    let index = -1;
    while (++index < extensions.length) {
      const value = extensions[index];
      if (Array.isArray(value)) {
        configure$1(combined, value);
      } else {
        extension(combined, value);
      }
    }
  }

  /**
   * @param {Config} combined
   * @param {Extension} extension
   * @returns {undefined}
   */
  function extension(combined, extension) {
    /** @type {keyof Extension} */
    let key;
    for (key in extension) {
      if (own$4.call(extension, key)) {
        switch (key) {
          case 'canContainEols':
            {
              const right = extension[key];
              if (right) {
                combined[key].push(...right);
              }
              break;
            }
          case 'transforms':
            {
              const right = extension[key];
              if (right) {
                combined[key].push(...right);
              }
              break;
            }
          case 'afterExit':
          case 'beforeEnter':
            {
              const right = extension[key];
              if (right) {
                combined[key].push(right);
              }
              break;
            }
          case 'enter':
          case 'exit':
            {
              const right = extension[key];
              if (right) {
                Object.assign(combined[key], right);
              }
              break;
            }
          // No default
        }
      }
    }
  }

  /** @type {OnEnterError} */
  function defaultOnError(left, right) {
    if (left) {
      throw new Error('Cannot close `' + left.type + '` (' + stringifyPosition({
        start: left.start,
        end: left.end
      }) + '): a different token (`' + right.type + '`, ' + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ') is open');
    }
    throw new Error('Cannot close document, a token (`' + right.type + '`, ' + stringifyPosition({
      start: right.start,
      end: right.end
    }) + ') is still open');
  }

  /**
   * @import {Node, Parent} from 'unist'
   */


  /**
   * Generate an assertion from a test.
   *
   * Useful if you’re going to test many nodes, for example when creating a
   * utility where something else passes a compatible test.
   *
   * The created function is a bit faster because it expects valid input only:
   * a `node`, `index`, and `parent`.
   *
   * @param {Test} test
   *   *   when nullish, checks if `node` is a `Node`.
   *   *   when `string`, works like passing `(node) => node.type === test`.
   *   *   when `function` checks if function passed the node is true.
   *   *   when `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
   *   *   when `array`, checks if any one of the subtests pass.
   * @returns {Check}
   *   An assertion.
   */
  const convert =
    // Note: overloads in JSDoc can’t yet use different `@template`s.
    /**
     * @type {(
     *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
     *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
     *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
     *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
     *   ((test?: Test) => Check)
     * )}
     */
    (
      /**
       * @param {Test} [test]
       * @returns {Check}
       */
      function (test) {
        if (test === null || test === undefined) {
          return ok$1
        }

        if (typeof test === 'function') {
          return castFactory(test)
        }

        if (typeof test === 'object') {
          return Array.isArray(test)
            ? anyFactory(test)
            : // Cast because `ReadonlyArray` goes into the above but `isArray`
              // narrows to `Array`.
              propertiesFactory(/** @type {Props} */ (test))
        }

        if (typeof test === 'string') {
          return typeFactory(test)
        }

        throw new Error('Expected function, string, or object as test')
      }
    );

  /**
   * @param {Array<Props | TestFunction | string>} tests
   * @returns {Check}
   */
  function anyFactory(tests) {
    /** @type {Array<Check>} */
    const checks = [];
    let index = -1;

    while (++index < tests.length) {
      checks[index] = convert(tests[index]);
    }

    return castFactory(any)

    /**
     * @this {unknown}
     * @type {TestFunction}
     */
    function any(...parameters) {
      let index = -1;

      while (++index < checks.length) {
        if (checks[index].apply(this, parameters)) return true
      }

      return false
    }
  }

  /**
   * Turn an object into a test for a node with a certain fields.
   *
   * @param {Props} check
   * @returns {Check}
   */
  function propertiesFactory(check) {
    const checkAsRecord = /** @type {Record<string, unknown>} */ (check);

    return castFactory(all)

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    function all(node) {
      const nodeAsRecord = /** @type {Record<string, unknown>} */ (
        /** @type {unknown} */ (node)
      );

      /** @type {string} */
      let key;

      for (key in check) {
        if (nodeAsRecord[key] !== checkAsRecord[key]) return false
      }

      return true
    }
  }

  /**
   * Turn a string into a test for a node with a certain type.
   *
   * @param {string} check
   * @returns {Check}
   */
  function typeFactory(check) {
    return castFactory(type)

    /**
     * @param {Node} node
     */
    function type(node) {
      return node && node.type === check
    }
  }

  /**
   * Turn a custom test into a test for a node that passes that test.
   *
   * @param {TestFunction} testFunction
   * @returns {Check}
   */
  function castFactory(testFunction) {
    return check

    /**
     * @this {unknown}
     * @type {Check}
     */
    function check(value, index, parent) {
      return Boolean(
        looksLikeANode(value) &&
          testFunction.call(
            this,
            value,
            typeof index === 'number' ? index : undefined,
            parent || undefined
          )
      )
    }
  }

  function ok$1() {
    return true
  }

  /**
   * @param {unknown} value
   * @returns {value is Node}
   */
  function looksLikeANode(value) {
    return value !== null && typeof value === 'object' && 'type' in value
  }

  /**
   * @typedef {import('mdast').Html} Html
   * @typedef {import('mdast').PhrasingContent} PhrasingContent
   */


  /**
   * Check if the given value is *phrasing content*.
   *
   * > 👉 **Note**: Excludes `html`, which can be both phrasing or flow.
   *
   * @param node
   *   Thing to check, typically `Node`.
   * @returns
   *   Whether `value` is phrasing content.
   */

  const phrasing$1 =
    /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
    (
      convert([
        'break',
        'delete',
        'emphasis',
        // To do: next major: removed since footnotes were added to GFM.
        'footnote',
        'footnoteReference',
        'image',
        'imageReference',
        'inlineCode',
        // Enabled by `mdast-util-math`:
        'inlineMath',
        'link',
        'linkReference',
        // Enabled by `mdast-util-mdx`:
        'mdxJsxTextElement',
        // Enabled by `mdast-util-mdx`:
        'mdxTextExpression',
        'strong',
        'text',
        // Enabled by `mdast-util-directive`:
        'textDirective'
      ])
    );

  /**
   * @callback Handler
   *   Handle a value, with a certain ID field set to a certain value.
   *   The ID field is passed to `zwitch`, and it’s value is this function’s
   *   place on the `handlers` record.
   * @param {...any} parameters
   *   Arbitrary parameters passed to the zwitch.
   *   The first will be an object with a certain ID field set to a certain value.
   * @returns {any}
   *   Anything!
   */

  /**
   * @callback UnknownHandler
   *   Handle values that do have a certain ID field, but it’s set to a value
   *   that is not listed in the `handlers` record.
   * @param {unknown} value
   *   An object with a certain ID field set to an unknown value.
   * @param {...any} rest
   *   Arbitrary parameters passed to the zwitch.
   * @returns {any}
   *   Anything!
   */

  /**
   * @callback InvalidHandler
   *   Handle values that do not have a certain ID field.
   * @param {unknown} value
   *   Any unknown value.
   * @param {...any} rest
   *   Arbitrary parameters passed to the zwitch.
   * @returns {void|null|undefined|never}
   *   This should crash or return nothing.
   */

  /**
   * @template {InvalidHandler} [Invalid=InvalidHandler]
   * @template {UnknownHandler} [Unknown=UnknownHandler]
   * @template {Record<string, Handler>} [Handlers=Record<string, Handler>]
   * @typedef Options
   *   Configuration (required).
   * @property {Invalid} [invalid]
   *   Handler to use for invalid values.
   * @property {Unknown} [unknown]
   *   Handler to use for unknown values.
   * @property {Handlers} [handlers]
   *   Handlers to use.
   */

  const own$3 = {}.hasOwnProperty;

  /**
   * Handle values based on a field.
   *
   * @template {InvalidHandler} [Invalid=InvalidHandler]
   * @template {UnknownHandler} [Unknown=UnknownHandler]
   * @template {Record<string, Handler>} [Handlers=Record<string, Handler>]
   * @param {string} key
   *   Field to switch on.
   * @param {Options<Invalid, Unknown, Handlers>} [options]
   *   Configuration (required).
   * @returns {{unknown: Unknown, invalid: Invalid, handlers: Handlers, (...parameters: Parameters<Handlers[keyof Handlers]>): ReturnType<Handlers[keyof Handlers]>, (...parameters: Parameters<Unknown>): ReturnType<Unknown>}}
   */
  function zwitch(key, options) {
    const settings = options || {};

    /**
     * Handle one value.
     *
     * Based on the bound `key`, a respective handler will be called.
     * If `value` is not an object, or doesn’t have a `key` property, the special
     * “invalid” handler will be called.
     * If `value` has an unknown `key`, the special “unknown” handler will be
     * called.
     *
     * All arguments, and the context object, are passed through to the handler,
     * and it’s result is returned.
     *
     * @this {unknown}
     *   Any context object.
     * @param {unknown} [value]
     *   Any value.
     * @param {...unknown} parameters
     *   Arbitrary parameters passed to the zwitch.
     * @property {Handler} invalid
     *   Handle for values that do not have a certain ID field.
     * @property {Handler} unknown
     *   Handle values that do have a certain ID field, but it’s set to a value
     *   that is not listed in the `handlers` record.
     * @property {Handlers} handlers
     *   Record of handlers.
     * @returns {unknown}
     *   Anything.
     */
    function one(value, ...parameters) {
      /** @type {Handler|undefined} */
      let fn = one.invalid;
      const handlers = one.handlers;

      if (value && own$3.call(value, key)) {
        // @ts-expect-error Indexable.
        const id = String(value[key]);
        // @ts-expect-error Indexable.
        fn = own$3.call(handlers, id) ? handlers[id] : one.unknown;
      }

      if (fn) {
        return fn.call(this, value, ...parameters)
      }
    }

    one.handlers = settings.handlers || {};
    one.invalid = settings.invalid;
    one.unknown = settings.unknown;

    // @ts-expect-error: matches!
    return one
  }

  /**
   * @import {Options, State} from './types.js'
   */

  const own$2 = {}.hasOwnProperty;

  /**
   * Configure a base state w/ an extension.
   *
   * @param {State} base
   *   Base state to configure.
   * @param {Options} extension
   *   Extension to apply.
   * @returns {State}
   *   Given `base`.
   */
  function configure(base, extension) {
    let index = -1;
    /** @type {keyof Options} */
    let key;

    // First do subextensions.
    if (extension.extensions) {
      while (++index < extension.extensions.length) {
        configure(base, extension.extensions[index]);
      }
    }

    for (key in extension) {
      if (own$2.call(extension, key)) {
        switch (key) {
          case 'extensions': {
            // Empty.
            break
          }

          /* c8 ignore next 4 */
          case 'unsafe': {
            list$1(base[key], extension[key]);
            break
          }

          case 'join': {
            list$1(base[key], extension[key]);
            break
          }

          case 'handlers': {
            map$2(base[key], extension[key]);
            break
          }

          default: {
            // @ts-expect-error: matches.
            base.options[key] = extension[key];
          }
        }
      }
    }

    return base
  }

  /**
   * Merge arrays from the extension into the base state.
   *
   * @template T
   *   Kind.
   * @param {Array<T>} left
   *   List to merge into.
   * @param {Array<T> | null | undefined} right
   *   List to merge from.
   * @returns {undefined}
   *   Nothing.
   */
  function list$1(left, right) {
    if (right) {
      left.push(...right);
    }
  }

  /**
   * Merge objects from the extension into the base state.
   *
   * @template T
   *   Kind.
   * @param {Record<string, T>} left
   *   Object to merge into.
   * @param {Record<string, T> | null | undefined} right
   *   Object to merge from.
   * @returns {undefined}
   *   Nothing.
   */
  function map$2(left, right) {
    if (right) {
      Object.assign(left, right);
    }
  }

  /**
   * @import {Blockquote, Parents} from 'mdast'
   * @import {Info, Map, State} from 'mdast-util-to-markdown'
   */

  /**
   * Serialize a blockquote node.
   *
   * @param {Blockquote} node
   *   Node to serialize.
   * @param {Parents | undefined} _
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @param {Info} info
   *   Info on surrounding context.
   * @returns {string}
   *   Serialized markdown.
   */
  function blockquote(node, _, state, info) {
    const exit = state.enter('blockquote');
    const tracker = state.createTracker(info);
    tracker.move('> ');
    tracker.shift(2);
    const value = state.indentLines(
      state.containerFlow(node, tracker.current()),
      map$1
    );
    exit();
    return value
  }

  /**
   * Indent lines w/ blockquote markers.
   *
   * @type {Map}
   */
  function map$1(line, _, blank) {
    return '>' + (blank ? '' : ' ') + line
  }

  /**
   * @import {ConstructName, Unsafe} from 'mdast-util-to-markdown'
   */

  /**
   * Check if a pattern is in scope based on the current stack of constructs.
   *
   * @param {Array<ConstructName>} stack
   *   Current stack of constructs.
   * @param {Unsafe} pattern
   *   Pattern to check.
   * @returns {boolean}
   *   Whether the pattern is in scope.
   */
  function patternInScope(stack, pattern) {
    return (
      listInScope(stack, pattern.inConstruct, true) &&
      !listInScope(stack, pattern.notInConstruct, false)
    )
  }

  /**
   * Check if any of the constructs in the list are present in the stack.
   *
   * @param {Array<ConstructName>} stack
   *   Current stack of constructs.
   * @param {Unsafe['inConstruct']} list
   *   List of constructs to check for in the stack.
   * @param {boolean} none
   *   Value to return if the list is empty or not provided.
   * @returns {boolean}
   *   Whether any of the constructs in the list are present in the stack.
   */
  function listInScope(stack, list, none) {
    if (typeof list === 'string') {
      list = [list];
    }

    if (!list || list.length === 0) {
      return none
    }

    let index = -1;

    while (++index < list.length) {
      if (stack.includes(list[index])) {
        return true
      }
    }

    return false
  }

  /**
   * @import {Break, Parents} from 'mdast'
   * @import {Info, State} from 'mdast-util-to-markdown'
   */


  /**
   * Serialize a break node.
   *
   * @param {Break} _
   *   Node to serialize.
   * @param {Parents | undefined} _1
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @param {Info} info
   *   Info on surrounding context.
   * @returns {string}
   *   Serialized markdown.
   */
  function hardBreak(_, _1, state, info) {
    let index = -1;

    while (++index < state.unsafe.length) {
      const pattern = state.unsafe[index];

      // If we can’t put unconditional eols in this construct (setext headings,
      // tables), use a space instead.
      if (
        pattern.character === '\n' &&
        !pattern.before &&
        !pattern.after &&
        patternInScope(state.stack, pattern)
      ) {
        return /[\t ]/.test(info.before) ? '' : ' '
      }
    }

    return '\\\n'
  }

  /**
   * Get the count of the longest repeating streak of `substring` in `value`.
   *
   * @param {string} value
   *   Content to search in.
   * @param {string} substring
   *   Substring to look for, typically one character.
   * @returns {number}
   *   Count of most frequent adjacent `substring`s in `value`.
   */
  function longestStreak(value, substring) {
    const source = String(value);
    let index = source.indexOf(substring);
    let expected = index;
    let count = 0;
    let max = 0;

    if (typeof substring !== 'string') {
      throw new TypeError('Expected substring')
    }

    while (index !== -1) {
      if (index === expected) {
        if (++count > max) {
          max = count;
        }
      } else {
        count = 1;
      }

      expected = index + substring.length;
      index = source.indexOf(substring, expected);
    }

    return max
  }

  /**
   * @import {State} from 'mdast-util-to-markdown'
   * @import {Code} from 'mdast'
   */

  /**
   * Checks if a code block can be formatted as an indented code block.
   *
   * @param {Code} node
   *   Node to check.
   * @param {State} state
   *   Info passed around.
   * @returns {boolean}
   *   Whether the code can be formatted as an indented code block.
   */
  function formatCodeAsIndented(node, state) {
    return Boolean(
      state.options.fences === false &&
      node.value &&
      // If there’s no info…
      !node.lang &&
      // And there’s a non-whitespace character…
      /[^\n\r ]/.test(node.value) &&
      // And the value doesn’t start or end in a blank…
      !/^[\t ]*(?:[\n\r]|$)|(?:^|[\n\r])[\t ]*$/.test(node.value)
    )
  }

  /**
   * @import {Options, State} from 'mdast-util-to-markdown'
   */

  /**
   * Checks the preferred fence option.
   *
   * @param {State} state
   *   Info passed around.
   * @returns {Exclude<Options['fence'], null | undefined>}
   *   Preferred fence marker.
   */
  function checkFence(state) {
    const marker = state.options.fence || '`';

    if (marker !== '`' && marker !== '~') {
      throw new Error(
        'Cannot serialize code with `' +
          marker +
          '` for `options.fence`, expected `` ` `` or `~`'
      )
    }

    return marker
  }

  /**
   * @import {Info, Map, State} from 'mdast-util-to-markdown'
   * @import {Code, Parents} from 'mdast'
   */


  /**
   * Serialize a code node.
   *
   * @param {Code} node
   *   Node to serialize.
   * @param {Parents | undefined} _
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @param {Info} info
   *   Info on surrounding context.
   * @returns {string}
   *   Serialized markdown.
   */
  function code$2(node, _, state, info) {
    const marker = checkFence(state);
    const raw = node.value || '';

    if (formatCodeAsIndented(node, state)) {
      const exit = state.enter('codeIndented');
      const value = state.indentLines(raw, map);
      exit();
      return value
    }

    const tracker = state.createTracker(info);
    const sequence = marker.repeat(Math.max(longestStreak(raw, marker) + 1, 3));
    const exit = state.enter('codeFenced');
    const suffix = marker === '`' ? 'GraveAccent' : 'Tilde';
    let value = tracker.move(sequence);

    if (node.lang) {
      const subexit = state.enter(`codeFencedLang${suffix}`);
      value += tracker.move(
        state.safe(node.lang, {
          before: value,
          after: ' ',
          encode: ['`'],
          ...tracker.current()
        })
      );
      subexit();
    }

    if (node.lang && node.meta) {
      const subexit = state.enter(`codeFencedMeta${suffix}`);
      value += tracker.move(' ');
      value += tracker.move(
        state.safe(node.meta, {
          before: value,
          after: '\n',
          encode: ['`'],
          ...tracker.current()
        })
      );
      subexit();
    }

    value += tracker.move('\n');

    if (raw) {
      value += tracker.move(raw + '\n');
    }

    value += tracker.move(sequence);
    exit();
    return value
  }

  /**
   * Indent lines w/ code indent.
   *
   * @type {Map}
   */
  function map(line, _, blank) {
    return (blank ? '' : '    ') + line
  }

  /**
   * @import {Options, State} from 'mdast-util-to-markdown'
   */

  /**
   * Checks the preferred quote option.
   *
   * @param {State} state
   *   Info passed around.
   * @returns {Exclude<Options['quote'], null | undefined>}
   *   Preferred quote.
   */
  function checkQuote(state) {
    const marker = state.options.quote || '"';

    if (marker !== '"' && marker !== "'") {
      throw new Error(
        'Cannot serialize title with `' +
          marker +
          '` for `options.quote`, expected `"`, or `\'`'
      )
    }

    return marker
  }

  /**
   * @import {Info, State} from 'mdast-util-to-markdown'
   * @import {Definition, Parents} from 'mdast'
   */


  /**
   * Serialize a definition node.
   *
   * @param {Definition} node
   *   Node to serialize.
   * @param {Parents | undefined} _
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @param {Info} info
   *   Info on surrounding context.
   * @returns {string}
   *   Serialized markdown.
   */
  function definition(node, _, state, info) {
    const quote = checkQuote(state);
    const suffix = quote === '"' ? 'Quote' : 'Apostrophe';
    const exit = state.enter('definition');
    let subexit = state.enter('label');
    const tracker = state.createTracker(info);
    let value = tracker.move('[');
    value += tracker.move(
      state.safe(state.associationId(node), {
        before: value,
        after: ']',
        ...tracker.current()
      })
    );
    value += tracker.move(']: ');

    subexit();

    if (
      // If there’s no url, or…
      !node.url ||
      // If there are control characters or whitespace.
      /[\0- \u007F]/.test(node.url)
    ) {
      subexit = state.enter('destinationLiteral');
      value += tracker.move('<');
      value += tracker.move(
        state.safe(node.url, {before: value, after: '>', ...tracker.current()})
      );
      value += tracker.move('>');
    } else {
      // No whitespace, raw is prettier.
      subexit = state.enter('destinationRaw');
      value += tracker.move(
        state.safe(node.url, {
          before: value,
          after: node.title ? ' ' : '\n',
          ...tracker.current()
        })
      );
    }

    subexit();

    if (node.title) {
      subexit = state.enter(`title${suffix}`);
      value += tracker.move(' ' + quote);
      value += tracker.move(
        state.safe(node.title, {
          before: value,
          after: quote,
          ...tracker.current()
        })
      );
      value += tracker.move(quote);
      subexit();
    }

    exit();

    return value
  }

  /**
   * @import {Options, State} from 'mdast-util-to-markdown'
   */

  /**
   * Checks the preferred emphasis option.
   *
   * @param {State} state
   *   Info passed around.
   * @returns {Exclude<Options['emphasis'], null | undefined>}
   *   Preferred emphasis marker.
   */
  function checkEmphasis(state) {
    const marker = state.options.emphasis || '*';

    if (marker !== '*' && marker !== '_') {
      throw new Error(
        'Cannot serialize emphasis with `' +
          marker +
          '` for `options.emphasis`, expected `*`, or `_`'
      )
    }

    return marker
  }

  /**
   * @import {AttentionInfo, Info, State} from 'mdast-util-to-markdown'
   * @import {Emphasis, Parents} from 'mdast'
   */


  emphasis.attention = attention$1;
  emphasis.peek = peek$1;

  /**
   * Serialize an emphasis node.
   *
   * Attention is properly handled by `containerPhrasing`.
   *
   * @param {Emphasis} node
   *   Node to serialize.
   * @param {Parents | undefined} _
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @param {Info} info
   *   Info on surrounding context.
   * @returns {string}
   *   Serialized markdown.
   */
  function emphasis(node, _, state, info) {
    const exit = state.enter('phrasing');
    const value = state.containerPhrasing({type: 'root', children: [node]}, info);
    exit();
    return value
  }

  /**
   * Serialize an emphasis node as attention.
   *
   * @param {Emphasis} _
   *   Node to serialize.
   * @param {State} state
   *   Info passed around.
   * @returns {AttentionInfo}
   *   Info on how to serialize the node.
   */
  function attention$1(_, state) {
    const marker = checkEmphasis(state);
    return {
      construct: 'emphasis',
      markers: marker === '*' ? ['*', '_'] : ['_', '*'],
      sizes: [1]
    }
  }

  /**
   * Peek at this node.
   *
   * @param {Emphasis} _
   *   Node to serialize.
   * @param {Parents | undefined} _1
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @returns {string}
   *   Start of the serialized markdown.
   */
  function peek$1(_, _1, state) {
    return state.options.emphasis || '*'
  }

  /**
   * Encode a code point as a character reference.
   *
   * @param {number} code
   *   Code point to encode.
   * @returns {string}
   *   Encoded character reference.
   */
  function encodeCharacterReference(code) {
    return '&#x' + code.toString(16).toUpperCase() + ';'
  }

  /**
   * @param {string} d
   * @returns {string}
   */
  function color(d) {
    return d
  }

  /**
   * @import {Node as UnistNode, Parent as UnistParent} from 'unist'
   */


  /** @type {Readonly<ActionTuple>} */
  const empty = [];

  /**
   * Continue traversing as normal.
   */
  const CONTINUE = true;

  /**
   * Stop traversing immediately.
   */
  const EXIT = false;

  /**
   * Do not traverse this node’s children.
   */
  const SKIP = 'skip';

  /**
   * Visit nodes, with ancestral information.
   *
   * This algorithm performs *depth-first* *tree traversal* in *preorder*
   * (**NLR**) or if `reverse` is given, in *reverse preorder* (**NRL**).
   *
   * You can choose for which nodes `visitor` is called by passing a `test`.
   * For complex tests, you should test yourself in `visitor`, as it will be
   * faster and will have improved type information.
   *
   * Walking the tree is an intensive task.
   * Make use of the return values of the visitor when possible.
   * Instead of walking a tree multiple times, walk it once, use `unist-util-is`
   * to check if a node matches, and then perform different operations.
   *
   * You can change the tree.
   * See `Visitor` for more info.
   *
   * @overload
   * @param {Tree} tree
   * @param {Check} check
   * @param {BuildVisitor<Tree, Check>} visitor
   * @param {boolean | null | undefined} [reverse]
   * @returns {undefined}
   *
   * @overload
   * @param {Tree} tree
   * @param {BuildVisitor<Tree>} visitor
   * @param {boolean | null | undefined} [reverse]
   * @returns {undefined}
   *
   * @param {UnistNode} tree
   *   Tree to traverse.
   * @param {Visitor | Test} test
   *   `unist-util-is`-compatible test
   * @param {Visitor | boolean | null | undefined} [visitor]
   *   Handle each node.
   * @param {boolean | null | undefined} [reverse]
   *   Traverse in reverse preorder (NRL) instead of the default preorder (NLR).
   * @returns {undefined}
   *   Nothing.
   *
   * @template {UnistNode} Tree
   *   Node type.
   * @template {Test} Check
   *   `unist-util-is`-compatible test.
   */
  function visitParents(tree, test, visitor, reverse) {
    /** @type {Test} */
    let check;

    if (typeof test === 'function' && typeof visitor !== 'function') {
      reverse = visitor;
      // @ts-expect-error no visitor given, so `visitor` is test.
      visitor = test;
    } else {
      // @ts-expect-error visitor given, so `test` isn’t a visitor.
      check = test;
    }

    const is = convert(check);
    const step = reverse ? -1 : 1;

    factory(tree, undefined, [])();

    /**
     * @param {UnistNode} node
     * @param {number | undefined} index
     * @param {Array<UnistParent>} parents
     */
    function factory(node, index, parents) {
      const value = /** @type {Record<string, unknown>} */ (
        node && typeof node === 'object' ? node : {}
      );

      if (typeof value.type === 'string') {
        const name =
          // `hast`
          typeof value.tagName === 'string'
            ? value.tagName
            : // `xast`
              typeof value.name === 'string'
              ? value.name
              : undefined;

        Object.defineProperty(visit, 'name', {
          value:
            'node (' + color(node.type + (name ? '<' + name + '>' : '')) + ')'
        });
      }

      return visit

      function visit() {
        /** @type {Readonly<ActionTuple>} */
        let result = empty;
        /** @type {Readonly<ActionTuple>} */
        let subresult;
        /** @type {number} */
        let offset;
        /** @type {Array<UnistParent>} */
        let grandparents;

        if (!test || is(node, index, parents[parents.length - 1] || undefined)) {
          // @ts-expect-error: `visitor` is now a visitor.
          result = toResult(visitor(node, parents));

          if (result[0] === EXIT) {
            return result
          }
        }

        if ('children' in node && node.children) {
          const nodeAsParent = /** @type {UnistParent} */ (node);

          if (nodeAsParent.children && result[0] !== SKIP) {
            offset = (reverse ? nodeAsParent.children.length : -1) + step;
            grandparents = parents.concat(nodeAsParent);

            while (offset > -1 && offset < nodeAsParent.children.length) {
              const child = nodeAsParent.children[offset];

              subresult = factory(child, offset, grandparents)();

              if (subresult[0] === EXIT) {
                return subresult
              }

              offset =
                typeof subresult[1] === 'number' ? subresult[1] : offset + step;
            }
          }
        }

        return result
      }
    }
  }

  /**
   * Turn a return value into a clean result.
   *
   * @param {VisitorResult} value
   *   Valid return values from visitors.
   * @returns {Readonly<ActionTuple>}
   *   Clean result.
   */
  function toResult(value) {
    if (Array.isArray(value)) {
      return value
    }

    if (typeof value === 'number') {
      return [CONTINUE, value]
    }

    return value === null || value === undefined ? empty : [value]
  }

  /**
   * @import {Node as UnistNode, Parent as UnistParent} from 'unist'
   * @import {VisitorResult} from 'unist-util-visit-parents'
   */


  /**
   * Visit nodes.
   *
   * This algorithm performs *depth-first* *tree traversal* in *preorder*
   * (**NLR**) or if `reverse` is given, in *reverse preorder* (**NRL**).
   *
   * You can choose for which nodes `visitor` is called by passing a `test`.
   * For complex tests, you should test yourself in `visitor`, as it will be
   * faster and will have improved type information.
   *
   * Walking the tree is an intensive task.
   * Make use of the return values of the visitor when possible.
   * Instead of walking a tree multiple times, walk it once, use `unist-util-is`
   * to check if a node matches, and then perform different operations.
   *
   * You can change the tree.
   * See `Visitor` for more info.
   *
   * @overload
   * @param {Tree} tree
   * @param {Check} check
   * @param {BuildVisitor<Tree, Check>} visitor
   * @param {boolean | null | undefined} [reverse]
   * @returns {undefined}
   *
   * @overload
   * @param {Tree} tree
   * @param {BuildVisitor<Tree>} visitor
   * @param {boolean | null | undefined} [reverse]
   * @returns {undefined}
   *
   * @param {UnistNode} tree
   *   Tree to traverse.
   * @param {Visitor | Test} testOrVisitor
   *   `unist-util-is`-compatible test (optional, omit to pass a visitor).
   * @param {Visitor | boolean | null | undefined} [visitorOrReverse]
   *   Handle each node (when test is omitted, pass `reverse`).
   * @param {boolean | null | undefined} [maybeReverse=false]
   *   Traverse in reverse preorder (NRL) instead of the default preorder (NLR).
   * @returns {undefined}
   *   Nothing.
   *
   * @template {UnistNode} Tree
   *   Node type.
   * @template {Test} Check
   *   `unist-util-is`-compatible test.
   */
  function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
    /** @type {boolean | null | undefined} */
    let reverse;
    /** @type {Test} */
    let test;
    /** @type {Visitor} */
    let visitor;

    if (
      typeof testOrVisitor === 'function' &&
      typeof visitorOrReverse !== 'function'
    ) {
      test = undefined;
      visitor = testOrVisitor;
      reverse = visitorOrReverse;
    } else {
      // @ts-expect-error: assume the overload with test was given.
      test = testOrVisitor;
      // @ts-expect-error: assume the overload with test was given.
      visitor = visitorOrReverse;
      reverse = maybeReverse;
    }

    visitParents(tree, test, overload, reverse);

    /**
     * @param {UnistNode} node
     * @param {Array<UnistParent>} parents
     */
    function overload(node, parents) {
      const parent = parents[parents.length - 1];
      const index = parent ? parent.children.indexOf(node) : undefined;
      return visitor(node, index, parent)
    }
  }

  /**
   * @import {State} from 'mdast-util-to-markdown'
   * @import {Heading} from 'mdast'
   */


  /**
   * Checks if a heading can be formatted as a setext heading.
   *
   * @param {Heading} node
   *   Node to check.
   * @param {State} state
   *   Info passed around.
   * @returns {boolean}
   *   Whether the heading can be formatted as a setext heading.
   */
  function formatHeadingAsSetext(node, state) {
    let literalWithBreak = false;

    // Look for literals with a line break.
    // Note that this also
    visit(node, function (node) {
      if (
        ('value' in node && /\r?\n|\r/.test(node.value)) ||
        node.type === 'break'
      ) {
        literalWithBreak = true;
        return EXIT
      }
    });

    return Boolean(
      (!node.depth || node.depth < 3) &&
      toString(node) &&
      (state.options.setext || literalWithBreak)
    )
  }

  /**
   * @import {Info, State} from 'mdast-util-to-markdown'
   * @import {Heading, Parents} from 'mdast'
   */


  /**
   * Serialize a heading node.
   *
   * @param {Heading} node
   *   Node to serialize.
   * @param {Parents | undefined} _
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @param {Info} info
   *   Info on surrounding context.
   * @returns {string}
   *   Serialized markdown.
   */
  function heading(node, _, state, info) {
    const rank = Math.max(Math.min(6, node.depth || 1), 1);
    const tracker = state.createTracker(info);

    if (formatHeadingAsSetext(node, state)) {
      const exit = state.enter('headingSetext');
      const subexit = state.enter('phrasing');
      const value = state.containerPhrasing(node, {
        ...tracker.current(),
        before: '\n',
        after: '\n'
      });
      subexit();
      exit();

      return (
        value +
        '\n' +
        (rank === 1 ? '=' : '-').repeat(
          // The whole size…
          value.length -
            // Minus the position of the character after the last EOL (or
            // 0 if there is none)…
            (Math.max(value.lastIndexOf('\r'), value.lastIndexOf('\n')) + 1)
        )
      )
    }

    const sequence = '#'.repeat(rank);
    const exit = state.enter('headingAtx');
    const subexit = state.enter('phrasing');

    // Note: for proper tracking, we should reset the output positions when there
    // is no content returned, because then the space is not output.
    // Practically, in that case, there is no content, so it doesn’t matter that
    // we’ve tracked one too many characters.
    tracker.move(sequence + ' ');

    let value = state.containerPhrasing(node, {
      before: '# ',
      after: '\n',
      ...tracker.current()
    });

    const head = value.charCodeAt(0);

    if (head === 9 /* `\t` */ || head === 32 /* ` ` */) {
      // To do: what effect has the character reference on tracking?
      value = encodeCharacterReference(head) + value.slice(1);
    }

    value = value ? sequence + ' ' + value : sequence;

    if (state.options.closeAtx) {
      value += ' ' + sequence;
    }

    subexit();
    exit();

    return value
  }

  /**
   * @import {Html} from 'mdast'
   */

  html.peek = htmlPeek;

  /**
   * Serialize an HTML node.
   *
   * @param {Html} node
   *   Node to serialize.
   * @returns {string}
   *   Serialized markdown.
   */
  function html(node) {
    return node.value || ''
  }

  /**
   * Peek at this node.
   *
   * @returns {string}
   *   Start of the serialized markdown.
   */
  function htmlPeek() {
    return '<'
  }

  /**
   * @import {Info, State} from 'mdast-util-to-markdown'
   * @import {Image, Parents} from 'mdast'
   */


  image$1.peek = imagePeek;

  /**
   * Serialize an image node.
   *
   * @param {Image} node
   *   Node to serialize.
   * @param {Parents | undefined} _
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @param {Info} info
   *   Info on surrounding context.
   * @returns {string}
   *   Serialized markdown.
   */
  function image$1(node, _, state, info) {
    const quote = checkQuote(state);
    const suffix = quote === '"' ? 'Quote' : 'Apostrophe';
    const exit = state.enter('image');
    let subexit = state.enter('label');
    const tracker = state.createTracker(info);
    let value = tracker.move('![');
    value += tracker.move(
      state.safe(node.alt, {before: value, after: ']', ...tracker.current()})
    );
    value += tracker.move('](');

    subexit();

    if (
      // If there’s no url but there is a title…
      (!node.url && node.title) ||
      // If there are control characters or whitespace.
      /[\0- \u007F]/.test(node.url)
    ) {
      subexit = state.enter('destinationLiteral');
      value += tracker.move('<');
      value += tracker.move(
        state.safe(node.url, {before: value, after: '>', ...tracker.current()})
      );
      value += tracker.move('>');
    } else {
      // No whitespace, raw is prettier.
      subexit = state.enter('destinationRaw');
      value += tracker.move(
        state.safe(node.url, {
          before: value,
          after: node.title ? ' ' : ')',
          ...tracker.current()
        })
      );
    }

    subexit();

    if (node.title) {
      subexit = state.enter(`title${suffix}`);
      value += tracker.move(' ' + quote);
      value += tracker.move(
        state.safe(node.title, {
          before: value,
          after: quote,
          ...tracker.current()
        })
      );
      value += tracker.move(quote);
      subexit();
    }

    value += tracker.move(')');
    exit();

    return value
  }

  /**
   * Peek at this node.
   *
   * @returns {string}
   *   Start of the serialized markdown.
   */
  function imagePeek() {
    return '!'
  }

  /**
   * @import {Info, State} from 'mdast-util-to-markdown'
   * @import {ImageReference, Parents} from 'mdast'
   */

  imageReference.peek = imageReferencePeek;

  /**
   * Serialize an image reference node.
   *
   * @param {ImageReference} node
   *   Node to serialize.
   * @param {Parents | undefined} _
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @param {Info} info
   *   Info on surrounding context.
   * @returns {string}
   *   Serialized markdown.
   */
  function imageReference(node, _, state, info) {
    const type = node.referenceType;
    const exit = state.enter('imageReference');
    let subexit = state.enter('label');
    const tracker = state.createTracker(info);
    let value = tracker.move('![');
    const alt = state.safe(node.alt, {
      before: value,
      after: ']',
      ...tracker.current()
    });
    value += tracker.move(alt + '][');

    subexit();
    // Hide that we’re in phrasing as things like attention or code cannot form
    // in references.
    // Character escapes and references *do* work.
    // It is important to know about other constructs, such as table cells.
    const stack = state.stack;
    state.stack = stack.filter(function (d) {
      return d !== 'phrasing'
    });
    subexit = state.enter('reference');
    // Note: for proper tracking, we should reset the output positions when we end
    // up making a `shortcut` reference, because then there is no brace output.
    // Practically, in that case, there is no content, so it doesn’t matter that
    // we’ve tracked one too many characters.
    const reference = state.safe(state.associationId(node), {
      before: value,
      after: ']',
      ...tracker.current()
    });
    subexit();
    state.stack = stack;
    exit();

    if (type === 'full' || !alt || alt !== reference) {
      value += tracker.move(reference + ']');
    } else if (type === 'shortcut') {
      // Remove the unwanted `[`.
      value = value.slice(0, -1);
    } else {
      value += tracker.move(']');
    }

    return value
  }

  /**
   * Peek at this node.
   *
   * @returns {string}
   *   Start of the serialized markdown.
   */
  function imageReferencePeek() {
    return '!'
  }

  /**
   * @import {State} from 'mdast-util-to-markdown'
   * @import {InlineCode, Parents} from 'mdast'
   */

  inlineCode.peek = inlineCodePeek;

  /**
   * Serialize an inline code node.
   *
   * @param {InlineCode} node
   *   Node to serialize.
   * @param {Parents | undefined} _
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @returns {string}
   *   Serialized markdown.
   */
  function inlineCode(node, _, state) {
    let value = node.value || '';
    let sequence = '`';
    let index = -1;

    // If there is a single grave accent on its own in the code, use a fence of
    // two.
    // If there are two in a row, use one.
    while (new RegExp('(^|[^`])' + sequence + '([^`]|$)').test(value)) {
      sequence += '`';
    }

    // If this is not just spaces or eols (tabs don’t count), and either the
    // first or last character are a space, eol, or tick, then pad with spaces.
    if (
      /[^\n\r ]/.test(value) &&
      ((/^[\n\r ]/.test(value) && /[\n\r ]$/.test(value)) || /^`|`$/.test(value))
    ) {
      value = ' ' + value + ' ';
    }

    // We have a potential problem: certain characters after eols could result in
    // blocks being seen.
    // For example, if someone injected the string `'\n# b'`, then that would
    // result in an ATX heading.
    // We can’t escape characters in `inlineCode`, but because eols are
    // transformed to spaces when going from markdown to HTML anyway, we can swap
    // them out.
    while (++index < state.unsafe.length) {
      const pattern = state.unsafe[index];
      const expression = state.compilePattern(pattern);

      // Only look for `atBreak`s.
      // Btw: note that `atBreak` patterns will always start the regex at LF or
      // CR.
      if (!pattern.atBreak) continue

      /** @type {RegExpExecArray | null} */
      let match;

      while ((match = expression.exec(value))) {
        let position = match.index;

        // Support CRLF (patterns only look for one of the characters).
        if (
          value.charCodeAt(position) === 10 /* `\n` */ &&
          value.charCodeAt(position - 1) === 13 /* `\r` */
        ) {
          position--;
        }

        value = value.slice(0, position) + ' ' + value.slice(match.index + 1);
      }
    }

    return sequence + value + sequence
  }

  /**
   * Peek at this node.
   *
   * @returns {string}
   *   Start of the serialized markdown.
   */
  function inlineCodePeek() {
    return '`'
  }

  /**
   * @import {State} from 'mdast-util-to-markdown'
   * @import {Link} from 'mdast'
   */


  /**
   * Checks if a link can be formatted as an autolink.
   *
   * @param {Link} node
   *   Node to check.
   * @param {State} state
   *   Info passed around.
   * @returns {boolean}
   *   Whether the link can be formatted as an autolink.
   */
  function formatLinkAsAutolink(node, state) {
    const raw = toString(node);

    return Boolean(
      !state.options.resourceLink &&
      // If there’s a url…
      node.url &&
      // And there’s no title…
      !node.title &&
      // And the content of `node` is a single text node…
      node.children &&
      node.children.length === 1 &&
      node.children[0].type === 'text' &&
      // And if the url is the same as the content…
      (raw === node.url || 'mailto:' + raw === node.url) &&
      // And that starts w/ a protocol…
      /^[a-z][+\-.a-z]+:/i.test(node.url) &&
      // And that doesn’t contain ASCII control codes (character escapes and
      // references don’t work), space, or angle brackets…
      !/[\0- <>\u007F]/.test(node.url)
    )
  }

  /**
   * @import {Info, State} from 'mdast-util-to-markdown'
   * @import {Link, Parents} from 'mdast'
   * @import {Exit} from '../types.js'
   */


  link$1.peek = linkPeek;

  /**
   * Serialize a link node.
   *
   * @param {Link} node
   *   Node to serialize.
   * @param {Parents | undefined} _
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @param {Info} info
   *   Info on surrounding context.
   * @returns {string}
   *   Serialized markdown.
   */
  function link$1(node, _, state, info) {
    const quote = checkQuote(state);
    const suffix = quote === '"' ? 'Quote' : 'Apostrophe';
    const tracker = state.createTracker(info);

    if (formatLinkAsAutolink(node, state)) {
      // Hide that we’re in phrasing as things like attention or code cannot form
      // in autolinks.
      // Character escapes also don’t work (nor character references),
      // but that is a different matter, which `safe.js` handles for `autolink`.
      // It is important to know about other constructs, such as table cells.
      const stack = state.stack;
      state.stack = stack.filter(function (d) {
        return d !== 'phrasing'
      });
      const exit = state.enter('autolink');
      let value = tracker.move('<');
      value += tracker.move(
        state.containerPhrasing(node, {
          before: value,
          after: '>',
          ...tracker.current()
        })
      );
      value += tracker.move('>');
      exit();
      state.stack = stack;
      return value
    }

    const exit = state.enter('link');
    let subexit = state.enter('label');
    let value = tracker.move('[');
    value += tracker.move(
      state.containerPhrasing(node, {
        before: value,
        after: '](',
        ...tracker.current()
      })
    );
    value += tracker.move('](');
    subexit();

    if (
      // If there’s no url but there is a title…
      (!node.url && node.title) ||
      // If there are control characters or whitespace.
      /[\0- \u007F]/.test(node.url)
    ) {
      subexit = state.enter('destinationLiteral');
      value += tracker.move('<');
      value += tracker.move(
        state.safe(node.url, {before: value, after: '>', ...tracker.current()})
      );
      value += tracker.move('>');
    } else {
      // No whitespace, raw is prettier.
      subexit = state.enter('destinationRaw');
      value += tracker.move(
        state.safe(node.url, {
          before: value,
          after: node.title ? ' ' : ')',
          ...tracker.current()
        })
      );
    }

    subexit();

    if (node.title) {
      subexit = state.enter(`title${suffix}`);
      value += tracker.move(' ' + quote);
      value += tracker.move(
        state.safe(node.title, {
          before: value,
          after: quote,
          ...tracker.current()
        })
      );
      value += tracker.move(quote);
      subexit();
    }

    value += tracker.move(')');

    exit();
    return value
  }

  /**
   * Peek at this node.
   *
   * @param {Link} node
   *   Node to peek at.
   * @param {Parents | undefined} _
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @returns {string}
   *   Start of the serialized markdown.
   */
  function linkPeek(node, _, state) {
    return formatLinkAsAutolink(node, state) ? '<' : '['
  }

  /**
   * @import {Info, State} from 'mdast-util-to-markdown'
   * @import {LinkReference, Parents} from 'mdast'
   */

  linkReference.peek = linkReferencePeek;

  /**
   * Serialize a link reference node.
   *
   * @param {LinkReference} node
   *   Node to serialize.
   * @param {Parents | undefined} _
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @param {Info} info
   *   Info on surrounding context.
   * @returns {string}
   *   Serialized markdown.
   */
  function linkReference(node, _, state, info) {
    const type = node.referenceType;
    const exit = state.enter('linkReference');
    let subexit = state.enter('label');
    const tracker = state.createTracker(info);
    let value = tracker.move('[');
    const text = state.containerPhrasing(node, {
      before: value,
      after: ']',
      ...tracker.current()
    });
    value += tracker.move(text + '][');

    subexit();
    // Hide that we’re in phrasing as things like attention or code cannot form
    // in references.
    // Character escapes and references *do* work.
    // It is important to know about other constructs, such as table cells.
    const stack = state.stack;
    state.stack = stack.filter(function (d) {
      return d !== 'phrasing'
    });
    subexit = state.enter('reference');
    // Note: for proper tracking, we should reset the output positions when we end
    // up making a `shortcut` reference, because then there is no brace output.
    // Practically, in that case, there is no content, so it doesn’t matter that
    // we’ve tracked one too many characters.
    const reference = state.safe(state.associationId(node), {
      before: value,
      after: ']',
      ...tracker.current()
    });
    subexit();
    state.stack = stack;
    exit();

    if (type === 'full' || !text || text !== reference) {
      value += tracker.move(reference + ']');
    } else if (type === 'shortcut') {
      // Remove the unwanted `[`.
      value = value.slice(0, -1);
    } else {
      value += tracker.move(']');
    }

    return value
  }

  /**
   * Peek at this node.
   *
   * @returns {string}
   *   Start of the serialized markdown.
   */
  function linkReferencePeek() {
    return '['
  }

  /**
   * @import {Options, State} from 'mdast-util-to-markdown'
   */

  /**
   * Checks the preferred list bullet option.
   *
   * @param {State} state
   *   Info passed around.
   * @returns {Exclude<Options['bullet'], null | undefined>}
   *   Preferred list bullet.
   */
  function checkBullet(state) {
    const marker = state.options.bullet || '*';

    if (marker !== '*' && marker !== '+' && marker !== '-') {
      throw new Error(
        'Cannot serialize items with `' +
          marker +
          '` for `options.bullet`, expected `*`, `+`, or `-`'
      )
    }

    return marker
  }

  /**
   * @import {Options, State} from 'mdast-util-to-markdown'
   */


  /**
   * Checks the preferred alternate list bullet option.
   *
   * @param {State} state
   *   Info passed around.
   * @returns {Exclude<Options['bullet'], null | undefined>}
   *   Preferred alternate list bullet.
   */
  function checkBulletOther(state) {
    const bullet = checkBullet(state);
    const bulletOther = state.options.bulletOther;

    if (!bulletOther) {
      return bullet === '*' ? '-' : '*'
    }

    if (bulletOther !== '*' && bulletOther !== '+' && bulletOther !== '-') {
      throw new Error(
        'Cannot serialize items with `' +
          bulletOther +
          '` for `options.bulletOther`, expected `*`, `+`, or `-`'
      )
    }

    if (bulletOther === bullet) {
      throw new Error(
        'Expected `bullet` (`' +
          bullet +
          '`) and `bulletOther` (`' +
          bulletOther +
          '`) to be different'
      )
    }

    return bulletOther
  }

  /**
   * @import {Options, State} from 'mdast-util-to-markdown'
   */

  /**
   * Checks the preferred ordered list bullet option.
   *
   * @param {State} state
   *   Info passed around.
   * @returns {Exclude<Options['bulletOrdered'], null | undefined>}
   *   Preferred ordered list bullet.
   */
  function checkBulletOrdered(state) {
    const marker = state.options.bulletOrdered || '.';

    if (marker !== '.' && marker !== ')') {
      throw new Error(
        'Cannot serialize items with `' +
          marker +
          '` for `options.bulletOrdered`, expected `.` or `)`'
      )
    }

    return marker
  }

  /**
   * @import {Options, State} from 'mdast-util-to-markdown'
   */

  /**
   * Checks the preferred rule option.
   *
   * @param {State} state
   *   Info passed around.
   * @returns {Exclude<Options['rule'], null | undefined>}
   *   Preferred rule marker.
   */
  function checkRule(state) {
    const marker = state.options.rule || '*';

    if (marker !== '*' && marker !== '-' && marker !== '_') {
      throw new Error(
        'Cannot serialize rules with `' +
          marker +
          '` for `options.rule`, expected `*`, `-`, or `_`'
      )
    }

    return marker
  }

  /**
   * @import {Info, State} from 'mdast-util-to-markdown'
   * @import {List, Parents} from 'mdast'
   */


  /**
   * Serialize a list node.
   *
   * @param {List} node
   *   Node to serialize.
   * @param {Parents | undefined} parent
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @param {Info} info
   *   Info on surrounding context.
   * @returns {string}
   *   Serialized markdown.
   */
  function list(node, parent, state, info) {
    const exit = state.enter('list');
    const bulletCurrent = state.bulletCurrent;
    /** @type {string} */
    let bullet = node.ordered ? checkBulletOrdered(state) : checkBullet(state);
    /** @type {string} */
    const bulletOther = node.ordered
      ? bullet === '.'
        ? ')'
        : '.'
      : checkBulletOther(state);
    let useDifferentMarker =
      parent && state.bulletLastUsed ? bullet === state.bulletLastUsed : false;

    if (!node.ordered) {
      const firstListItem = node.children ? node.children[0] : undefined;

      // If there’s an empty first list item directly in two list items,
      // we have to use a different bullet:
      //
      // ```markdown
      // * - *
      // ```
      //
      // …because otherwise it would become one big thematic break.
      if (
        // Bullet could be used as a thematic break marker:
        (bullet === '*' || bullet === '-') &&
        // Empty first list item:
        firstListItem &&
        (!firstListItem.children || !firstListItem.children[0]) &&
        // Directly in two other list items:
        state.stack[state.stack.length - 1] === 'list' &&
        state.stack[state.stack.length - 2] === 'listItem' &&
        state.stack[state.stack.length - 3] === 'list' &&
        state.stack[state.stack.length - 4] === 'listItem' &&
        // That are each the first child.
        state.indexStack[state.indexStack.length - 1] === 0 &&
        state.indexStack[state.indexStack.length - 2] === 0 &&
        state.indexStack[state.indexStack.length - 3] === 0
      ) {
        useDifferentMarker = true;
      }

      // If there’s a thematic break at the start of the first list item,
      // we have to use a different bullet:
      //
      // ```markdown
      // * ---
      // ```
      //
      // …because otherwise it would become one big thematic break.
      if (checkRule(state) === bullet && firstListItem) {
        let index = -1;

        while (++index < node.children.length) {
          const item = node.children[index];

          if (
            item &&
            item.type === 'listItem' &&
            item.children &&
            item.children[0] &&
            item.children[0].type === 'thematicBreak'
          ) {
            useDifferentMarker = true;
            break
          }
        }
      }
    }

    if (useDifferentMarker) {
      bullet = bulletOther;
    }

    state.bulletCurrent = bullet;
    const value = state.containerFlow(node, info);
    state.bulletLastUsed = bullet;
    state.bulletCurrent = bulletCurrent;
    exit();
    return value
  }

  /**
   * @import {Options, State} from 'mdast-util-to-markdown'
   */

  /**
   * Checks the preferred list item indent option.
   *
   * @param {State} state
   *   Info passed around.
   * @returns {Exclude<Options['listItemIndent'], null | undefined>}
   *   Preferred list item indent.
   */
  function checkListItemIndent(state) {
    const style = state.options.listItemIndent || 'one';

    if (style !== 'tab' && style !== 'one' && style !== 'mixed') {
      throw new Error(
        'Cannot serialize items with `' +
          style +
          '` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`'
      )
    }

    return style
  }

  /**
   * @import {Info, Map, State} from 'mdast-util-to-markdown'
   * @import {ListItem, Parents} from 'mdast'
   */


  /**
   * Serialize a list item node.
   *
   * @param {ListItem} node
   *   Node to serialize.
   * @param {Parents | undefined} parent
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @param {Info} info
   *   Info on surrounding context.
   * @returns {string}
   *   Serialized markdown.
   */
  function listItem(node, parent, state, info) {
    const listItemIndent = checkListItemIndent(state);
    let bullet = state.bulletCurrent || checkBullet(state);

    // Add the marker value for ordered lists.
    if (parent && parent.type === 'list' && parent.ordered) {
      bullet =
        (typeof parent.start === 'number' && parent.start > -1
          ? parent.start
          : 1) +
        (state.options.incrementListMarker === false
          ? 0
          : parent.children.indexOf(node)) +
        bullet;
    }

    let size = bullet.length + 1;

    if (
      listItemIndent === 'tab' ||
      (listItemIndent === 'mixed' &&
        ((parent && parent.type === 'list' && parent.spread) || node.spread))
    ) {
      size = Math.ceil(size / 4) * 4;
    }

    const tracker = state.createTracker(info);
    tracker.move(bullet + ' '.repeat(size - bullet.length));
    tracker.shift(size);
    const exit = state.enter('listItem');
    const value = state.indentLines(
      state.containerFlow(node, tracker.current()),
      map
    );
    exit();

    return value

    /**
     * Indent lines of the list item.
     *
     * @type {Map}
     */
    function map(line, index, blank) {
      if (index) {
        return (blank ? '' : ' '.repeat(size)) + line
      }

      return (blank ? bullet : bullet + ' '.repeat(size - bullet.length)) + line
    }
  }

  /**
   * @import {Info, State} from 'mdast-util-to-markdown'
   * @import {Paragraph, Parents} from 'mdast'
   */

  /**
   * Serialize a paragraph node.
   *
   * @param {Paragraph} node
   *   Node to serialize.
   * @param {Parents | undefined} _
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @param {Info} info
   *   Info on surrounding context.
   * @returns {string}
   *   Serialized markdown.
   */
  function paragraph(node, _, state, info) {
    const exit = state.enter('paragraph');
    const subexit = state.enter('phrasing');
    const value = state.containerPhrasing(node, info);
    subexit();
    exit();
    return value
  }

  /**
   * @import {Info, State} from 'mdast-util-to-markdown'
   * @import {Parents, Root} from 'mdast'
   */


  /**
   * Serialize a root node.
   *
   * @param {Root} node
   *   Node to serialize.
   * @param {Parents | undefined} _
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @param {Info} info
   *   Info on surrounding context.
   * @returns {string}
   *   Serialized markdown.
   */
  function root(node, _, state, info) {
    // Note: `html` nodes are ambiguous.
    const hasPhrasing = node.children.some(function (d) {
      return phrasing$1(d)
    });

    if (!hasPhrasing) return state.containerFlow(node, info)

    const exit = state.enter('phrasing');
    const value = state.containerPhrasing(node, info);
    exit();
    return value
  }

  /**
   * @import {Options, State} from 'mdast-util-to-markdown'
   */

  /**
   * Checks the preferred strong option.
   *
   * @param {State} state
   *   Info passed around.
   * @returns {Exclude<Options['strong'], null | undefined>}
   *   Preferred strong marker.
   */
  function checkStrong(state) {
    const marker = state.options.strong || '*';

    if (marker !== '*' && marker !== '_') {
      throw new Error(
        'Cannot serialize strong with `' +
          marker +
          '` for `options.strong`, expected `*`, or `_`'
      )
    }

    return marker
  }

  /**
   * @import {AttentionInfo, Info, State} from 'mdast-util-to-markdown'
   * @import {Parents, Strong} from 'mdast'
   */


  strong.attention = attention;
  strong.peek = peek;

  /**
   * Serialize a strong node.
   *
   * Attention is properly handled by `containerPhrasing`.
   *
   * @param {Strong} node
   *   Node to serialize.
   * @param {Parents | undefined} _
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @param {Info} info
   *   Info on surrounding context.
   * @returns {string}
   *   Serialized markdown.
   */
  function strong(node, _, state, info) {
    const exit = state.enter('phrasing');
    const value = state.containerPhrasing({type: 'root', children: [node]}, info);
    exit();
    return value
  }

  /**
   * Serialize a strong node as attention.
   *
   * @param {Strong} _
   *   Node to serialize.
   * @param {State} state
   *   Info passed around.
   * @returns {AttentionInfo}
   *   Info on how to serialize the node.
   */
  function attention(_, state) {
    const marker = checkStrong(state);
    return {
      construct: 'strong',
      markers: marker === '*' ? ['*', '_'] : ['_', '*'],
      sizes: [2]
    }
  }

  /**
   * Peek at this node.
   *
   * @param {Strong} _
   *   Node to serialize.
   * @param {Parents | undefined} _1
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @returns {string}
   *   Start of the serialized markdown.
   */
  function peek(_, _1, state) {
    return state.options.strong || '*'
  }

  /**
   * @import {Info, State} from 'mdast-util-to-markdown'
   * @import {Parents, Text} from 'mdast'
   */

  /**
   * Serialize a text node.
   *
   * @param {Text} node
   *   Node to serialize.
   * @param {Parents | undefined} parent
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @param {Info} info
   *   Info on surrounding context.
   * @returns {string}
   *   Serialized markdown.
   */
  function text$1(node, parent, state, info) {
    /* c8 ignore next -- parent always passed */
    const siblings = parent ? parent.children : [];
    const index = siblings.indexOf(node);

    return state.safe(node.value, {
      ...info,
      afterNode: siblings[index + 1],
      beforeNode: siblings[index - 1]
    })
  }

  /**
   * @import {Options, State} from 'mdast-util-to-markdown'
   */

  /**
   * Checks the preferred rule repetition option.
   *
   * @param {State} state
   *   Info passed around.
   * @returns {Exclude<Options['ruleRepetition'], null | undefined>}
   *   Preferred rule repetition.
   */
  function checkRuleRepetition(state) {
    const repetition = state.options.ruleRepetition || 3;

    if (repetition < 3) {
      throw new Error(
        'Cannot serialize rules with repetition `' +
          repetition +
          '` for `options.ruleRepetition`, expected `3` or more'
      )
    }

    return repetition
  }

  /**
   * @import {State} from 'mdast-util-to-markdown'
   * @import {Parents, ThematicBreak} from 'mdast'
   */


  /**
   * Serialize a thematic break node.
   *
   * @param {ThematicBreak} _
   *   Node to serialize.
   * @param {Parents | undefined} _1
   *   Parent node.
   * @param {State} state
   *   Info passed around.
   * @returns {string}
   *   Serialized markdown.
   */
  function thematicBreak(_, _1, state) {
    const value = (
      checkRule(state) + (state.options.ruleSpaces ? ' ' : '')
    ).repeat(checkRuleRepetition(state));

    return state.options.ruleSpaces ? value.slice(0, -1) : value
  }

  /**
   * Default (CommonMark) handlers.
   */
  const handle = {
    blockquote,
    break: hardBreak,
    code: code$2,
    definition,
    emphasis,
    hardBreak,
    heading,
    html,
    image: image$1,
    imageReference,
    inlineCode,
    link: link$1,
    linkReference,
    list,
    listItem,
    paragraph,
    root,
    strong,
    text: text$1,
    thematicBreak
  };

  /**
   * @typedef {1 | 2 | 3 | 4 | 5 | 6 | 7} Kind
   *   Kind of HTML (flow) element.
   */

  /**
   * Infer the kind of HTML that `value` is.
   *
   * This works on valid trees as produced by `micromark`.
   * Kinds:
   *
   * 1. raw
   * 2. comment
   * 3. instruction
   * 4. declaration
   * 5. cdata
   * 6. block
   * 7. other
   *
   * See: <https://spec.commonmark.org/0.31.2/#html-blocks>.
   *
   * @param {string} value
   *   HTML.
   * @returns {Kind | undefined}
   *   Kind; `undefined` if unknown.
   */
  function htmlKind(value) {
    if (value.charCodeAt(0) !== 60 /* `<` */) return

    const next = value.charCodeAt(1);

    if (next === 33 /* `!` */) {
      const code = value.charCodeAt(2);
      if (code === 45 /* `-` */) return 2
      if (code === 91 /* `[` */) return 5
      if (asciiAlpha(code)) return 4
      return
    }

    if (next === 63 /* `?` */) return 3

    const closing = next === 47; /* `/` */
    const start = closing ? 2 : 1;
    let end = start;
    let code = value.charCodeAt(end);

    if (!asciiAlpha(code)) return

    while (code === 45 /* `-` */ || asciiAlphanumeric(code)) {
      code = value.charCodeAt(++end);
    }

    const name = value.slice(start, end).toLowerCase();

    if (!closing && code !== 47 /* `/` */ && htmlRawNames.includes(name)) {
      return 1
    }

    return htmlBlockNames.includes(name) ? 6 : 7
  }

  /**
   * @import {Join} from 'mdast-util-to-markdown'
   */


  /** @type {Array<Join>} */
  const join = [joinDefaults];

  /**
   * Default join function.
   *
   * @type {Join}
   */
  function joinDefaults(left, right, parent, state) {
    // Indented code after list or another indented code.
    if (
      right.type === 'code' &&
      formatCodeAsIndented(right, state) &&
      (left.type === 'list' ||
        (left.type === right.type && formatCodeAsIndented(left, state)))
    ) {
      return false
    }

    // Join children of a list or an item.
    // In which case, `parent` has a `spread` field.
    if ('spread' in parent && typeof parent.spread === 'boolean') {
      if (
        left.type === 'paragraph' &&
        // Two paragraphs.
        (left.type === right.type ||
          right.type === 'definition' ||
          // Paragraph followed by a setext heading.
          (right.type === 'heading' && formatHeadingAsSetext(right, state)))
      ) {
        return
      }

      // HTML that only ends at a blank line followed by something.
      if (left.type === 'html') {
        const kind = htmlKind(left.value);
        if (kind === undefined || kind === 6 || kind === 7) return 1
      }

      // HTML that cannot interrupt a paragraph (kind 7) after one.
      if (left.type === 'paragraph' && right.type === 'html') {
        const kind = htmlKind(right.value);
        if (kind === undefined || kind === 7) return 1
      }

      return parent.spread ? 1 : 0
    }
  }

  /**
   * @import {ConstructName, Unsafe} from 'mdast-util-to-markdown'
   */

  /**
   * List of constructs that occur in phrasing (paragraphs, headings), but cannot
   * contain things like attention (emphasis, strong), images, or links.
   * So they sort of cancel each other out.
   * Note: could use a better name.
   *
   * @type {Array<ConstructName>}
   */
  const fullPhrasingSpans = [
    'autolink',
    'destinationLiteral',
    'destinationRaw',
    'reference',
    'titleQuote',
    'titleApostrophe'
  ];

  /** @type {Array<Unsafe>} */
  const unsafe = [
    {character: '\t', after: '[\\r\\n]', inConstruct: 'phrasing'},
    {character: '\t', before: '[\\r\\n]', inConstruct: 'phrasing'},
    {
      character: '\t',
      inConstruct: ['codeFencedLangGraveAccent', 'codeFencedLangTilde']
    },
    {
      character: '\r',
      inConstruct: [
        'codeFencedLangGraveAccent',
        'codeFencedLangTilde',
        'codeFencedMetaGraveAccent',
        'codeFencedMetaTilde',
        'destinationLiteral',
        'headingAtx'
      ]
    },
    {
      character: '\n',
      inConstruct: [
        'codeFencedLangGraveAccent',
        'codeFencedLangTilde',
        'codeFencedMetaGraveAccent',
        'codeFencedMetaTilde',
        'destinationLiteral',
        'headingAtx'
      ]
    },
    {character: '\r', before: '[\\r\\n]', inConstruct: 'phrasing'},
    {character: '\r', after: '\\r', inConstruct: 'phrasing'},
    {character: '\n', before: '\\n', inConstruct: 'phrasing'},
    {character: '\n', after: '[\\r\\n]', inConstruct: 'phrasing'},
    {character: ' ', after: '[\\r\\n]', inConstruct: 'phrasing'},
    {character: ' ', before: '[\\r\\n]', inConstruct: 'phrasing'},
    {
      character: ' ',
      inConstruct: ['codeFencedLangGraveAccent', 'codeFencedLangTilde']
    },
    // An exclamation mark can start an image, if it is followed by a link or
    // a link reference.
    {
      character: '!',
      after: '\\[',
      inConstruct: 'phrasing',
      notInConstruct: fullPhrasingSpans
    },
    // A quote can break out of a title.
    {character: '"', inConstruct: 'titleQuote'},
    // A number sign could start an ATX heading if it starts a line.
    {atBreak: true, character: '#'},
    {character: '#', inConstruct: 'headingAtx', after: '(?:[\r\n]|$)'},
    // Dollar sign and percentage are not used in markdown.
    // An ampersand could start a character reference.
    {character: '&', after: '[#A-Za-z]', inConstruct: 'phrasing'},
    // An apostrophe can break out of a title.
    {character: "'", inConstruct: 'titleApostrophe'},
    // A left paren could break out of a destination raw.
    {character: '(', inConstruct: 'destinationRaw'},
    // A left paren followed by `]` could make something into a link or image.
    {
      before: '\\]',
      character: '(',
      inConstruct: 'phrasing',
      notInConstruct: fullPhrasingSpans
    },
    // A right paren could start a list item or break out of a destination
    // raw.
    {atBreak: true, before: '\\d+', character: ')'},
    {character: ')', inConstruct: 'destinationRaw'},
    // An asterisk can start thematic breaks, list items, emphasis, strong.
    {atBreak: true, character: '*', after: '(?:[ \t\r\n*])'},
    {character: '*', inConstruct: 'phrasing', notInConstruct: fullPhrasingSpans},
    // A plus sign could start a list item.
    {atBreak: true, character: '+', after: '(?:[ \t\r\n])'},
    // A dash can start thematic breaks, list items, and setext heading
    // underlines.
    {atBreak: true, character: '-', after: '(?:[ \t\r\n-])'},
    // A dot could start a list item.
    {atBreak: true, before: '\\d+', character: '.', after: '(?:[ \t\r\n]|$)'},
    // Slash, colon, and semicolon are not used in markdown for constructs.
    // A less than can start html (flow or text) or an autolink.
    // HTML could start with an exclamation mark (declaration, cdata, comment),
    // slash (closing tag), question mark (instruction), or a letter (tag).
    // An autolink also starts with a letter.
    // Finally, it could break out of a destination literal.
    {atBreak: true, character: '<', after: '[!/?A-Za-z]'},
    {
      character: '<',
      after: '[!/?A-Za-z]',
      inConstruct: 'phrasing',
      notInConstruct: fullPhrasingSpans
    },
    {character: '<', inConstruct: 'destinationLiteral'},
    // An equals to can start setext heading underlines.
    {atBreak: true, character: '='},
    // A greater than can start block quotes and it can break out of a
    // destination literal.
    {atBreak: true, character: '>'},
    {character: '>', inConstruct: 'destinationLiteral'},
    // Question mark and at sign are not used in markdown for constructs.
    // A left bracket can start definitions, references, labels,
    {atBreak: true, character: '['},
    {character: '[', inConstruct: 'phrasing', notInConstruct: fullPhrasingSpans},
    {character: '[', inConstruct: ['label', 'reference']},
    // A backslash can start an escape (when followed by punctuation) or a
    // hard break (when followed by an eol).
    // Note: typical escapes are handled in `safe`!
    {character: '\\', after: '[\\r\\n]', inConstruct: 'phrasing'},
    // A right bracket can exit labels.
    {character: ']', inConstruct: ['label', 'reference']},
    // Caret is not used in markdown for constructs.
    // An underscore can start emphasis, strong, or a thematic break.
    {atBreak: true, character: '_'},
    {character: '_', inConstruct: 'phrasing', notInConstruct: fullPhrasingSpans},
    // A grave accent can start code (fenced or text), or it can break out of
    // a grave accent code fence.
    {atBreak: true, character: '`'},
    {
      character: '`',
      inConstruct: ['codeFencedLangGraveAccent', 'codeFencedMetaGraveAccent']
    },
    {character: '`', inConstruct: 'phrasing', notInConstruct: fullPhrasingSpans},
    // Left brace, vertical bar, right brace are not used in markdown for
    // constructs.
    // A tilde can start code (fenced).
    {atBreak: true, character: '~'},
    {character: '<', inConstruct: 'autolink'},
    {character: '>', inConstruct: 'autolink'},
    {character: '\u007F', inConstruct: 'autolink'}
  ];

  // Also the low ASCII control characters including space.
  let code$1 = -1;

  while (++code$1 < 33) {
    unsafe.push({character: String.fromCharCode(code$1), inConstruct: 'autolink'});
  }

  /**
   * @import {AssociationId} from '../types.js'
   */


  /**
   * Get an identifier from an association to match it to others.
   *
   * Associations are nodes that match to something else through an ID:
   * <https://github.com/syntax-tree/mdast#association>.
   *
   * The `label` of an association is the string value: character escapes and
   * references work, and casing is intact.
   * The `identifier` is used to match one association to another:
   * controversially, character escapes and references don’t work in this
   * matching: `&copy;` does not match `©`, and `\+` does not match `+`.
   *
   * But casing is ignored (and whitespace) is trimmed and collapsed: ` A\nb`
   * matches `a b`.
   * So, we do prefer the label when figuring out how we’re going to serialize:
   * it has whitespace, casing, and we can ignore most useless character
   * escapes and all character references.
   *
   * @type {AssociationId}
   */
  function association(node) {
    if (node.label || !node.identifier) {
      return node.label || ''
    }

    return decodeString(node.identifier)
  }

  /**
   * @import {CompilePattern} from '../types.js'
   */

  /**
   * Compiles a pattern object into a regular expression.
   *
   * @type {CompilePattern}
   */
  function compilePattern(pattern) {
    if (!pattern._compiled) {
      const before =
        (pattern.atBreak ? '[\\r\\n][\\t ]*' : '') +
        (pattern.before ? '(?:' + pattern.before + ')' : '');

      pattern._compiled = new RegExp(
        (pattern.beforeNode ? '^' : before ? '(' + before + ')' : '') +
          (/[$()*+.?[\\\]^{|}]/.test(pattern.character) ? '\\' : '') +
          pattern.character +
          (pattern.afterNode
            ? '$'
            : pattern.after
              ? '(?:' + pattern.after + ')'
              : ''),
        pattern.unicode ? 'gu' : 'g'
      );
    }

    return pattern._compiled
  }

  /**
   * Get the first character of a value.
   *
   * Is aware of astral characters (such as emoji).
   *
   * @param {string} value
   *   Value.
   * @returns {string}
   *   First character; empty if `value` is empty.
   */
  function firstCharacter(value) {
    const code = value.codePointAt(0);
    return code === undefined ? '' : String.fromCodePoint(code)
  }

  /**
   * Get the last character of a value.
   *
   * Is aware of astral characters (such as emoji).
   *
   * @param {string} value
   *   Value.
   * @returns {string}
   *   Last character; empty if `value` is empty.
   */
  function lastCharacter(value) {
    // Only a surrogate pair gives a code point above the BMP.
    const code = value.codePointAt(value.length - 2);
    return code !== undefined && code > 0xff_ff
      ? value.slice(-2)
      : value.slice(-1)
  }

  /**
   * @import {EncodeSides} from '../types.js'
   */


  /**
   * Check whether to encode (as a character reference) the characters
   * surrounding an attention run.
   *
   * Which characters are around an attention run influence whether it works or
   * not.
   *
   * See <https://github.com/orgs/syntax-tree/discussions/60> for more info.
   * See this markdown in a particular renderer to see what works:
   *
   * ```markdown
   * |                         | A (letter inside) | B (punctuation inside) | C (whitespace inside) | D (nothing inside) |
   * | ----------------------- | ----------------- | ---------------------- | --------------------- | ------------------ |
   * | 1 (letter outside)      | x*y*z             | x*.*z                  | x* *z                 | x**z               |
   * | 2 (punctuation outside) | .*y*.             | .*.*.                  | .* *.                 | .**.               |
   * | 3 (whitespace outside)  | x *y* z           | x *.* z                | x * * z               | x ** z             |
   * | 4 (nothing outside)     | *x*               | *.*                    | * *                   | **                 |
   * ```
   *
   * @param {number} outside
   *   Code point on the outer side of the run.
   * @param {number} inside
   *   Code point on the inner side of the run.
   * @param {string} marker
   *   Marker of the run.
   *   Underscores are handled more strictly (they form less often) than
   *   asterisks.
   * @returns {EncodeSides}
   *   Whether to encode characters.
   */
  // Important: punctuation must never be encoded.
  // Punctuation is solely used by markdown constructs.
  // And by encoding itself.
  // Encoding them will break constructs or double encode things.
  function encodeInfo(outside, inside, marker) {
    const outsideKind = classifyCharacter(outside);
    const insideKind = classifyCharacter(inside);

    // Letter outside:
    if (outsideKind === undefined) {
      return insideKind === undefined
        ? // Letter inside:
          // we have to encode *both* letters for `_` as it is looser.
          // it already forms for `*` (and GFMs `~`).
          marker === '_'
          ? {inside: true, outside: true}
          : {inside: false, outside: false}
        : insideKind === 1
          ? // Whitespace inside: encode both (letter, whitespace).
            {inside: true, outside: true}
          : // Punctuation inside: encode outer (letter)
            {inside: false, outside: true}
    }

    // Whitespace outside:
    if (outsideKind === 1) {
      return insideKind === undefined
        ? // Letter inside: already forms.
          {inside: false, outside: false}
        : insideKind === 1
          ? // Whitespace inside: encode both (whitespace).
            {inside: true, outside: true}
          : // Punctuation inside: already forms.
            {inside: false, outside: false}
    }

    // Punctuation outside:
    return insideKind === undefined
      ? // Letter inside: already forms.
        {inside: false, outside: false}
      : insideKind === 1
        ? // Whitespace inside: encode inner (whitespace).
          {inside: true, outside: false}
        : // Punctuation inside: already forms.
          {inside: false, outside: false}
  }

  /**
   * @import {Attention, Handle, Info, State} from 'mdast-util-to-markdown'
   * @import {PhrasingParents} from '../types.js'
   */


  /**
   * Markers for builtin attention (emphasis, strong) to whether they are stricter:
   * whether they cannot open and close inside words.
   *
   * Builtin runs pair following CommonMark rules for emphasis and strong:
   * they are split,
   * using one or two markers at a time,
   * with the rule of 3.
   * Other markers pair like GFM strikethrough:
   * whole runs pair with a run of the same size.
   *
   * @type {Map<string, boolean>}
   */
  const builtins = new Map([
    ['*', false],
    ['_', true]
  ]);

  /**
   * @typedef AttentionResult
   *   Attention, of which the sequence is chosen later.
   * @property {Array<Item>} children
   *   Serialized children.
   * @property {Array<string>} sequences
   *   Sequences that can be used, in order of preference.
   */

  /**
   * @typedef Improvement
   *   Improvement of attention sequences.
   * @property {Map<AttentionResult, string>} chosen
   *   Chosen sequences for each attention.
   * @property {Array<Token>} tokens
   *   Tokens involved in the improvement.
   * @property {Mistake | undefined} mistake
   *   Mistake that led to this improvement, if any.
   */

  /**
   * @typedef {AttentionResult | string} Item
   *   Serialized phrasing.
   */

  /**
   * @typedef Mistake
   *   Sequence that does not form its attention.
   * @property {Array<AttentionResult>} attention
   *   Attention to try other sequences for.
   * @property {number} index
   *   Index of the token.
   */

  /**
   * @typedef Run
   *   Sequences next to each other with the same marker.
   * @property {boolean} close
   *   Whether it can close.
   * @property {number} end
   *   Index after the last marker not used (to open).
   * @property {Array<Token>} markers
   *   Sequence of each marker.
   * @property {boolean} open
   *   Whether it can open.
   * @property {boolean} split
   *   Whether it can be split (built-in attention).
   * @property {number} start
   *   Index of the first marker not used (to close).
   * @property {Array<Token>} tokens
   *   Sequences.
   */

  /**
   * @typedef Token
   *   Rendered phrasing.
   * @property {AttentionResult | undefined} attention
   *   Attention, if this is one of its sequences.
   * @property {string} value
   *   Value.
   */

  /**
   * Get candidates for a mistake:
   * attention to try other sequences for,
   * later first.
   *
   * @param {Array<Token>} tokens
   *   Tokens.
   * @param {Array<Token>} involved
   *   Sequences involved in the mistake.
   * @param {Map<Token, Run>} runOf
   *   Run of each sequence.
   * @returns {Array<AttentionResult>}
   *   Candidates.
   */
  function candidates(tokens, involved, runOf) {
    /** @type {Set<AttentionResult | undefined>} */
    const related = new Set();

    // The attention involved, and attention in runs with its sequences.
    for (const token of tokens) {
      const siblings = runOf.get(token);
      if (
        siblings &&
        token.attention &&
        involved.some((d) => d.attention === token.attention)
      ) {
        for (const sibling of siblings.tokens) {
          related.add(sibling.attention);
        }
      }
    }

    /** @type {Array<AttentionResult>} */
    const ordered = [];

    for (const token of tokens) {
      if (token.attention && related.delete(token.attention)) {
        ordered.push(token.attention);
      }
    }

    // Later first: attention that opens later is inner or next.
    ordered.reverse();
    return ordered
  }

  /**
   * Check whether sequences form their attention, like `micromark`.
   *
   * Sequences of `*` and `_` pair like emphasis and strong in CommonMark,
   * others like strikethrough in GFM.
   *
   * @param {Array<Token>} tokens
   *   Tokens.
   * @param {string} before
   *   Characters before.
   * @param {string} after
   *   Characters after.
   * @returns {Mistake | undefined}
   *   First mistake, if any.
   */
  function check(tokens, before, after) {
    /** @type {Array<Run>} */
    const runs = [];
    /** @type {Map<Token, Array<Token>>} */
    const wrong = new Map();
    /** @type {Map<Token, Run>} */
    const runOf = new Map();
    let index = 0;

    while (index < tokens.length) {
      if (!tokens[index].attention) {
        index++;
        continue
      }

      const marker = tokens[index].value.charAt(0);
      const strict = builtins.get(marker);
      let end = index + 1;

      while (
        end < tokens.length &&
        tokens[end].attention &&
        tokens[end].value.charAt(0) === marker
      ) {
        end++;
      }

      const head = index ? tokens[index - 1].value : before;
      const previous = classifyCharacter(head.charCodeAt(head.length - 1));
      const next = classifyCharacter(
        (end < tokens.length ? tokens[end].value : after).charCodeAt(0)
      );
      const open = !next || (next === 2 && Boolean(previous));
      const close = !previous || (previous === 2 && Boolean(next));
      /** @type {Run} */
      const run = {
        tokens: tokens.slice(index, end),
        markers: [],
        start: 0,
        end: 0,
        // Underscores are strict, they cannot open or close inside words.
        open: strict ? open && (Boolean(previous) || !close) : open,
        close: strict ? close && (Boolean(next) || !open) : close,
        // All builtins can split runs.
        split: strict !== undefined
      };

      for (const token of run.tokens) {
        // Every sequence is wrong until it pairs with its other sequence.
        wrong.set(token, [...run.tokens]);
        runOf.set(token, run);
        let size = token.value.length;
        while (size--) run.markers.push(token);
      }

      run.end = run.markers.length;
      runs.push(run);
      index = end;
    }

    pair(runs, wrong);

    index = -1;

    while (++index < tokens.length) {
      const involved = wrong.get(tokens[index]);
      if (involved) return {attention: candidates(tokens, involved, runOf), index}
    }
  }

  /**
   * Serialize the children of a parent that contains phrasing children.
   *
   * @param {PhrasingParents} parent
   *   Parent of phrasing nodes.
   * @param {State} state
   *   Info passed around about the current state.
   * @param {Info} info
   *   Info on where we are in the document we are generating.
   * @returns {string}
   *   Serialized result.
   */
  function containerPhrasing(parent, state, info) {
    return serialize$1(phrasing(parent, state, info), info.before, info.after)
  }

  /**
   * Encode the first or last character of tokens as a character reference,
   * if it is text.
   *
   * @param {Array<Token>} tokens
   *   Tokens.
   * @param {boolean} start
   *   Whether to encode the first or last character.
   * @returns {undefined}
   *   Nothing.
   */
  function encode(tokens, start) {
    const token = tokens[start ? 0 : tokens.length - 1];

    if (!token || token.attention) return

    const character = start
      ? firstCharacter(token.value)
      : lastCharacter(token.value);
    const reference = encodeCharacterReference(
      /** @type {number} */ (character.codePointAt(0))
    );

    token.value = start
      ? reference + token.value.slice(character.length)
      : token.value.slice(0, token.value.length - character.length) + reference;
  }

  /**
   * Try other sequences for the candidates of a mistake and use the first that
   * moves the mistake further.
   *
   * @param {Array<Item>} items
   *   Items.
   * @param {Map<AttentionResult, string>} chosen
   *   Sequences to use instead of preferred sequences.
   * @param {Mistake} mistake
   *   Mistake.
   * @param {string} before
   *   Characters before.
   * @param {string} after
   *   Characters after.
   * @returns {Improvement | undefined}
   *   Result if better.
   */
  function improve(items, chosen, mistake, before, after) {
    for (const attention of mistake.attention) {
      const current = chosen.get(attention) || attention.sequences[0];

      for (const sequence of attention.sequences) {
        if (sequence === current) continue
        const trial = new Map(chosen);
        trial.set(attention, sequence);
        const tokens = render(items, trial, before, after);
        const next = check(tokens, before, after);

        if (!next || next.index > mistake.index) {
          return {chosen: trial, mistake: next, tokens}
        }
      }
    }
  }

  /**
   * Pair runs like `micromark` and mark sequences that do form their attention
   * as fine.
   *
   * Each pair uses markers from the end of an opener and the start of a closer.
   * It forms the intended attention if those markers are exactly the whole
   * opening and closing sequence of one attention.
   * Otherwise attention is mixed up:
   * either sequences of different attention pair,
   * part of a sequence is used (such as `**` of strong as `*`),
   * or several sequences are used together (such as `*` and `*` as `**`).
   * Then the sequences involved are recorded with each other.
   *
   * @param {Array<Run>} runs
   *   Runs.
   * @param {Map<Token, Array<Token>>} wrong
   *   Sequences that are wrong, with the sequences involved.
   * @returns {undefined}
   *   Nothing, `wrong` is changed.
   */
  function pair(runs, wrong) {
    let index = 0;

    while (index < runs.length) {
      const closer = runs[index];
      const marker = closer.tokens[0].value.charAt(0);
      const closerSize = closer.end - closer.start;
      let open = closer.close && closerSize ? index : 0;

      while (open--) {
        const opener = runs[open];
        const openerSize = opener.end - opener.start;

        if (
          opener.tokens[0].value.charAt(0) === marker &&
          opener.open &&
          openerSize &&
          (closer.split
            ? // The rule of 3, on the sizes that are left.
              !((opener.close || closer.open) && closerSize % 3) ||
              (openerSize + closerSize) % 3
            : // Others pair whole runs of the same size.
              openerSize === opener.markers.length && openerSize === closerSize)
        ) {
          const size = closer.split
            ? openerSize > 1 && closerSize > 1
              ? 2
              : 1
            : closerSize;
          const opening = opener.markers.slice(opener.end - size, opener.end);
          const closing = closer.markers.slice(closer.start, closer.start + size);
          const openToken = opening[0];
          const closeToken = closing[0];

          if (
            // Whole sequences:
            // the markers of a sequence are next to each other,
            // so if the first and last marker are of one sequence of that size,
            // all markers are exactly that sequence.
            openToken === opening[size - 1] &&
            openToken.value.length === size &&
            closeToken === closing[size - 1] &&
            closeToken.value.length === size &&
            // Of the same attention, so its opening and closing sequence.
            openToken.attention === closeToken.attention
          ) {
            wrong.delete(openToken);
            wrong.delete(closeToken);
          } else {
            const involved = [...new Set([...opening, ...closing])];
            // Add to what is involved already: a sequence can be in several pairs.
            for (const token of involved) {
              const list = wrong.get(token);
              if (list) list.push(...involved);
            }
          }

          opener.end -= size;
          closer.start += size;
          break
        }
      }

      // Stay on this run if it can close more.
      if (open === -1 || closer.start === closer.end) index++;
    }
  }

  /**
   * Get the sequences that can be used for attention, in order of preference.
   *
   * @param {string} type
   *   Node type.
   * @param {Array<string>} markers
   *   Markers.
   * @param {Array<number>} sizes
   *   Sizes.
   * @returns {Array<string>}
   *   Sequences.
   */
  function attentionSequences(type, markers, sizes) {
    if (markers.length === 0) {
      throw new Error(
        'Cannot serialize `' +
          type +
          '` as attention without markers, expected one or more markers'
      )
    }

    if (sizes.length === 0) {
      throw new Error(
        'Cannot serialize `' +
          type +
          '` as attention without sizes, expected one or more sizes'
      )
    }

    for (const size of sizes) {
      if (!Number.isSafeInteger(size) || size < 1) {
        throw new Error(
          'Cannot serialize `' +
            type +
            '` as attention with `' +
            size +
            '` as size, expected positive integer'
        )
      }
    }

    /** @type {Array<string>} */
    const sequences = [];

    for (const marker of markers) {
      if (marker.length !== 1) {
        throw new Error(
          'Cannot serialize `' +
            type +
            '` as attention with `' +
            marker +
            '` as marker, expected a single ascii character'
        )
      }

      if (!asciiPunctuation(marker.charCodeAt(0))) {
        throw new Error(
          'Cannot serialize `' +
            type +
            '` as attention with `' +
            marker +
            '` as marker, expected ascii punctuation'
        )
      }

      for (const size of sizes) {
        sequences.push(marker.repeat(size));
      }
    }

    return sequences
  }

  /**
   * Serialize the children of a parent that contains phrasing children,
   * keeping attention separate,
   * so that its markers can be chosen later.
   *
   * @param {PhrasingParents} parent
   *   Parent of phrasing nodes.
   * @param {State} state
   *   Info passed around about the current state.
   * @param {Info} info
   *   Info on where we are in the document we are generating.
   * @returns {Array<Item>}
   *   Items.
   */
  function phrasing(parent, state, info) {
    const indexStack = state.indexStack;
    const children = parent.children || [];
    /** @type {Array<Item>} */
    const results = [];
    let index = -1;
    let before = info.before;

    indexStack.push(-1);
    let tracker = state.createTracker(info);

    while (++index < children.length) {
      const child = children[index];
      /** @type {string} */
      let after;

      indexStack[indexStack.length - 1] = index;

      if (index + 1 < children.length) {
        /** @type {Handle} */
        // @ts-expect-error: hush, it’s actually a `zwitch`.
        let handle = state.handle.handlers[children[index + 1].type];
        // @ts-expect-error: hush, it’s actually a `zwitch`.
        if (handle && handle.peek) handle = handle.peek;
        after = handle
          ? firstCharacter(
              handle(children[index + 1], parent, state, {
                before: '',
                after: '',
                ...tracker.current()
              })
            )
          : '';
      } else {
        after = info.after;
      }

      // In some cases, html (text) can be found in phrasing right after an eol.
      // When we’d serialize that, it could be seen as html (flow): all its kinds
      // except 7 can interrupt a paragraph.
      // As we can’t escape or so to prevent it from happening,
      // we take a somewhat reasonable approach:
      // replace that eol with a space.
      // See: <https://github.com/syntax-tree/mdast-util-to-markdown/issues/15>
      const previous = results[results.length - 1];

      if (
        typeof previous === 'string' &&
        (before === '\r' || before === '\n') &&
        child.type === 'html' &&
        htmlKind(child.value) !== 7
      ) {
        results[results.length - 1] = previous.replace(/(\r?\n|\r)$/, ' ');
        before = ' ';

        // To do: does this work to reset tracker?
        tracker = state.createTracker(info);
        tracker.move(serialize$1(results, info.before, info.after));
      }

      /** @type {(Handle & {attention?: Attention | undefined}) | undefined} */
      // @ts-expect-error: hush, it’s actually a `zwitch`.
      const handle = state.handle.handlers[child.type];

      if (handle && handle.attention) {
        const {construct, markers, sizes} = handle.attention(child, state);
        const sequences = attentionSequences(child.type, markers, sizes);
        const sequence = sequences[0];
        const exit = state.enter(construct);
        tracker.move(sequence);
        const inside = phrasing(/** @type {PhrasingParents} */ (child), state, {
          ...tracker.current(),
          before: sequence,
          after: sequence
        });
        tracker.move(serialize$1(inside, sequence, sequence));
        tracker.move(sequence);
        exit();
        results.push({children: inside, sequences});
        before = sequence.charAt(sequence.length - 1);
      } else {
        const value = state.handle(child, parent, state, {
          ...tracker.current(),
          after,
          before
        });

        if (!value) continue
        tracker.move(value);
        results.push(value);
        before = lastCharacter(value);
      }
    }

    indexStack.pop();

    return results
  }

  /**
   * Render items with sequences;
   * encoding characters around attention where needed.
   *
   * @param {Array<Item>} items
   *   Serialized phrasing.
   * @param {Map<AttentionResult, string>} chosen
   *   Sequences to use instead of preferred sequences.
   * @param {string} before
   *   Characters before.
   * @param {string} after
   *   Characters after.
   * @returns {Array<Token>}
   *   Tokens.
   */
  function render(items, chosen, before, after) {
    /** @type {Array<Token>} */
    const tokens = [];
    /** @type {string | undefined} */
    let encodeAfter;
    let previous = lastCharacter(before);
    let index = -1;

    while (++index < items.length) {
      const item = items[index];

      if (typeof item === 'string') {
        /** @type {Token} */
        const token = {value: item, attention: undefined};

        // If attention before had to encode the character after it, encode it.
        if (encodeAfter && encodeAfter === firstCharacter(item)) {
          encode([token], true);
        }

        encodeAfter = undefined;
        tokens.push(token);
        if (token.value) previous = lastCharacter(token.value);
        continue
      }

      const sequence = chosen.get(item) || item.sequences[0];
      const marker = sequence.charAt(0);
      const next = items[index + 1];
      const outsideBefore = previous;
      const outsideAfter = firstCharacter(
        next === undefined
          ? after
          : typeof next === 'string'
            ? next
            : chosen.get(next) || next.sequences[0]
      );
      const inside = render(item.children, chosen, sequence, sequence);
      const head = inside.length > 0 ? inside[0].value : '';
      const open = encodeInfo(
        outsideBefore.charCodeAt(outsideBefore.length - 1),
        head.charCodeAt(0),
        marker
      );

      if (open.inside) encode(inside, true);

      const tail =
        inside.length > 0 ? lastCharacter(inside[inside.length - 1].value) : '';
      const close = encodeInfo(
        outsideAfter.charCodeAt(0),
        tail.charCodeAt(tail.length - 1),
        marker
      );

      if (close.inside) encode(inside, false);

      if (open.outside && outsideBefore !== '\n' && outsideBefore !== '\r') {
        encode(tokens, false);
      }

      if (close.outside) encodeAfter = outsideAfter;

      tokens.push({value: sequence, attention: item}, ...inside, {
        value: sequence,
        attention: item
      });
      previous = sequence.charAt(sequence.length - 1);
    }

    return tokens
  }

  /**
   * Serialize phrasing with attention.
   *
   * Whether attention forms depends on everything around it.
   * This checks that it does and tries other sequences if not.
   *
   * @param {Array<Item>} items
   *   Phrasing items.
   * @param {string} before
   *   Characters before.
   * @param {string} after
   *   Characters after.
   * @returns {string}
   *   Serialized markdown.
   */
  function serialize$1(items, before, after) {
    /** @type {Map<AttentionResult, string>} */
    let chosen = new Map();
    const initial = render(items, chosen, before, after);
    let tokens = initial;
    let mistake = check(tokens, before, after);

    while (mistake) {
      const next = improve(items, chosen, mistake, before, after);

      if (!next) {
        tokens = initial;
        break
      }

      chosen = next.chosen;
      tokens = next.tokens;
      mistake = next.mistake;
    }

    // Join the tokens.
    let result = '';
    for (const token of tokens) result += token.value;
    return result
  }

  /**
   * @import {State} from 'mdast-util-to-markdown'
   * @import {FlowChildren, FlowParents, TrackFields} from '../types.js'
   */

  /**
   * Serialize the children of a parent that contains flow children.
   *
   * @param {FlowParents} parent
   *   Parent of flow nodes.
   * @param {State} state
   *   Info passed around about the current state.
   * @param {TrackFields} info
   *   Info on where we are in the document we are generating.
   * @returns {string}
   *   Serialized children, joined by (blank) lines.
   */
  function containerFlow(parent, state, info) {
    const indexStack = state.indexStack;
    const children = parent.children || [];
    const tracker = state.createTracker(info);
    /** @type {Array<string>} */
    const results = [];
    let index = -1;

    indexStack.push(-1);

    while (++index < children.length) {
      const child = children[index];

      indexStack[indexStack.length - 1] = index;

      results.push(
        tracker.move(
          state.handle(child, parent, state, {
            before: '\n',
            after: '\n',
            ...tracker.current()
          })
        )
      );

      if (child.type !== 'list') {
        state.bulletLastUsed = undefined;
      }

      if (index < children.length - 1) {
        results.push(
          tracker.move(between(child, children[index + 1], parent, state))
        );
      }
    }

    indexStack.pop();

    return results.join('')
  }

  /**
   * Determine the markdown to insert between two flow nodes.
   *
   * @param {FlowChildren} left
   *   Left flow node.
   * @param {FlowChildren} right
   *   Right flow node.
   * @param {FlowParents} parent
   *   Parent of the flow nodes.
   * @param {State} state
   *   Info passed around.
   * @returns {string}
   *   Markdown to insert between the two flow nodes.
   */
  function between(left, right, parent, state) {
    let index = state.join.length;

    while (index--) {
      const result = state.join[index](left, right, parent, state);

      if (result === true || result === 1) {
        break
      }

      if (typeof result === 'number') {
        return '\n'.repeat(1 + result)
      }

      if (result === false) {
        return '\n\n<!---->\n\n'
      }
    }

    return '\n\n'
  }

  /**
   * @import {IndentLines} from '../types.js'
   */

  const eol = /\r?\n|\r/g;

  /**
   * Indents each line.
   *
   * @type {IndentLines}
   */
  function indentLines(value, map) {
    /** @type {Array<string>} */
    const result = [];
    let start = 0;
    let line = 0;
    /** @type {RegExpExecArray | null} */
    let match;

    while ((match = eol.exec(value))) {
      one(value.slice(start, match.index));
      result.push(match[0]);
      start = match.index + match[0].length;
      line++;
    }

    one(value.slice(start));

    return result.join('')

    /**
     * Indents a single line.
     *
     * @param {string} value
     *   Line.
     */
    function one(value) {
      result.push(map(value, line, !value));
    }
  }

  /**
   * @import {Nodes} from 'mdast'
   * @import {SafeConfig, State, Unsafe} from 'mdast-util-to-markdown'
   */


  const own$1 = {}.hasOwnProperty;

  /**
   * Make a string safe for embedding in markdown constructs.
   *
   * In markdown, almost all punctuation characters can, in certain cases,
   * result in something.
   * Whether they do is highly subjective to where they happen and in what
   * they happen.
   *
   * To solve this, `mdast-util-to-markdown` tracks:
   *
   * * characters before and after something;
   * * what “constructs” we are in.
   *
   * This information is then used by this function to escape or encode
   * special characters.
   *
   * @param {State} state
   *   Info passed around about the current state.
   * @param {string | null | undefined} input
   *   Raw value to make safe.
   * @param {SafeConfig} config
   *   Configuration.
   * @returns {string}
   *   Serialized markdown safe for embedding.
   */
  function safe(state, input, config) {
    const value = (config.before || '') + (input || '') + (config.after || '');
    /** @type {Array<number>} */
    const positions = [];
    /** @type {Array<string>} */
    const result = [];
    /** @type {Record<number, {before: boolean, after: boolean}>} */
    const infos = {};
    // Character escapes and references do not work in autolinks, so
    // percent-encoding is used instead.
    const percentEncode = state.stack.includes('autolink');
    const offset = config.before ? config.before.length : 0;
    const end = value.length - (config.after ? config.after.length : 0);
    let index = -1;

    while (++index < state.unsafe.length) {
      const pattern = state.unsafe[index];

      if (
        !patternInScope(state.stack, pattern) ||
        !nodeInScope(pattern.beforeNode, config.beforeNode) ||
        !nodeInScope(pattern.afterNode, config.afterNode)
      ) {
        continue
      }

      const expression = state.compilePattern(pattern);
      const from = pattern.beforeNode ? offset : 0;
      const subject = value.slice(from, pattern.afterNode ? end : undefined);
      /** @type {RegExpExecArray | null} */
      let match;

      while ((match = expression.exec(subject))) {
        const before = 'before' in pattern || Boolean(pattern.atBreak);
        const after = 'after' in pattern;
        const position = from + match.index + (before ? match[1].length : 0);

        if (own$1.call(infos, position)) {
          if (infos[position].before && !before) {
            infos[position].before = false;
          }

          if (infos[position].after && !after) {
            infos[position].after = false;
          }
        } else {
          positions.push(position);
          infos[position] = {before, after};
        }
      }
    }

    positions.sort(numerical);

    let start = offset;
    index = -1;

    while (++index < positions.length) {
      const position = positions[index];

      // Character before or after matched:
      if (position < start || position >= end) {
        continue
      }

      // Special handling for “intraword” underscores (`a_b`, `a__b`).
      // Those are different from asterisks in forming attention.
      // Note that `a _ b` also cannot form but not escaping it is very complex,
      // so that’s not handled.
      if (
        value.charAt(position) === '_' &&
        // Preceded by an unescaped character that is not punctuation or whitespace:
        position > 0 &&
        classifyCharacter(value.charCodeAt(position - 1)) === undefined &&
        !own$1.call(infos, position - 1) &&
        // Characters next to attention markers can become character references
        // later, turning `a` into `&#x61;`, so those do not count.
        !(position - 1 === offset && /[*_]/.test(value.charAt(offset - 1)))
      ) {
        let sequenceEnd = position + 1;

        // Look for the whole run.
        while (sequenceEnd < end && value.charAt(sequenceEnd) === '_') {
          sequenceEnd++;
        }

        const skip = sequenceEnd - position - 1;

        if (
          // All underscores in the run are unsafe positions, so they can be
          // skipped.
          positions[index + skip] === sequenceEnd - 1 &&
          // Rest as above.
          sequenceEnd < value.length &&
          classifyCharacter(value.charCodeAt(sequenceEnd)) === undefined &&
          !own$1.call(infos, sequenceEnd) &&
          !(sequenceEnd === end - 1 && /[*_]/.test(value.charAt(end)))
        ) {
          index += skip;
          continue
        }
      }

      // If this character is supposed to be escaped because it has a condition on
      // the next character, and the next character is definitly being escaped,
      // then skip this escape.
      if (
        (position + 1 < end &&
          positions[index + 1] === position + 1 &&
          infos[position].after &&
          !infos[position + 1].before &&
          !infos[position + 1].after) ||
        (positions[index - 1] === position - 1 &&
          infos[position].before &&
          !infos[position - 1].before &&
          !infos[position - 1].after)
      ) {
        continue
      }

      if (start !== position) {
        const slice = value.slice(start, position);
        // If we have to use a character reference, an ampersand would be more
        // correct, but as backslashes only care about punctuation, either will
        // do the trick
        result.push(percentEncode ? slice : escapeBackslashes(slice, '\\'));
      }

      start = position;

      // Percent-encoding such as `%20`.
      if (percentEncode) {
        result.push(
          '%' +
            value.charCodeAt(position).toString(16).toUpperCase().padStart(2, '0')
        );
        start++;
      } else if (
        /[!-/:-@[-`{-~]/.test(value.charAt(position)) &&
        (!config.encode || !config.encode.includes(value.charAt(position)))
      ) {
        // Character escape.
        result.push('\\');
      } else {
        // Character reference.
        result.push(encodeCharacterReference(value.charCodeAt(position)));
        start++;
      }
    }

    const rest = value.slice(start, end);
    result.push(percentEncode ? rest : escapeBackslashes(rest, config.after));

    return result.join('')
  }

  /**
   * Check if a node matches the node types of a pattern.
   *
   * @param {Array<Nodes['type']> | Nodes['type'] | null | undefined} types
   *   Node types.
   * @param {Nodes | undefined} node
   *   Node.
   * @returns {boolean}
   *   Whether `node` matches `types`.
   */
  function nodeInScope(types, node) {
    if (!types) return true
    if (!node) return false
    return typeof types === 'string'
      ? types === node.type
      : types.includes(node.type)
  }

  /**
   * Compare two numbers.
   *
   * @param {number} a
   *   Number.
   * @param {number} b
   *   Other number.
   * @returns {number}
   *   Result.
   */
  function numerical(a, b) {
    return a - b
  }

  /**
   * Escape backslashes in a string, considering characters that follow.
   *
   * @param {string} value
   *   Value.
   * @param {string} after
   *   Characters that follow the value.
   * @returns {string}
   *   Escaped string.
   */
  function escapeBackslashes(value, after) {
    const expression = /\\(?=[!-/:-@[-`{-~])/g;
    /** @type {Array<number>} */
    const positions = [];
    /** @type {Array<string>} */
    const results = [];
    const whole = value + after;
    let index = -1;
    let start = 0;
    /** @type {RegExpExecArray | null} */
    let match;

    while ((match = expression.exec(whole))) {
      positions.push(match.index);
    }

    while (++index < positions.length) {
      if (start !== positions[index]) {
        results.push(value.slice(start, positions[index]));
      }

      results.push('\\');
      start = positions[index];
    }

    results.push(value.slice(start));

    return results.join('')
  }

  /**
   * @import {CreateTracker, TrackCurrent, TrackMove, TrackShift} from '../types.js'
   */

  /**
   * Track positional info in the output.
   *
   * @type {CreateTracker}
   */
  function track(config) {
    // Defaults are used to prevent crashes when older utilities somehow activate
    // this code.
    /* c8 ignore next 5 */
    const options = config || {};
    const now = options.now || {};
    let lineShift = options.lineShift || 0;
    let line = now.line || 1;
    let column = now.column || 1;

    return {move, current, shift}

    /**
     * Get the current tracked info.
     *
     * @type {TrackCurrent}
     */
    function current() {
      return {now: {line, column}, lineShift}
    }

    /**
     * Define an increased line shift (the typical indent for lines).
     *
     * @type {TrackShift}
     */
    function shift(value) {
      lineShift += value;
    }

    /**
     * Move past some generated markdown.
     *
     * @type {TrackMove}
     */
    function move(input) {
      // eslint-disable-next-line unicorn/prefer-default-parameters
      const value = input || '';
      const chunks = value.split(/\r?\n|\r/g);
      const tail = chunks[chunks.length - 1];
      line += chunks.length - 1;
      column =
        chunks.length === 1 ? column + tail.length : 1 + tail.length + lineShift;
      return value
    }
  }

  /**
   * @import {Info, Join, Options, SafeConfig, State} from 'mdast-util-to-markdown'
   * @import {Nodes} from 'mdast'
   * @import {Enter, FlowParents, PhrasingParents, TrackFields} from './types.js'
   */


  /**
   * Turn an mdast syntax tree into markdown.
   *
   * @param {Nodes} tree
   *   Tree to serialize.
   * @param {Options | null | undefined} [options]
   *   Configuration (optional).
   * @returns {string}
   *   Serialized markdown representing `tree`.
   */
  function toMarkdown(tree, options) {
    const settings = options || {};
    /** @type {State} */
    const state = {
      associationId: association,
      bulletCurrent: undefined,
      bulletLastUsed: undefined,
      containerPhrasing: containerPhrasingBound,
      containerFlow: containerFlowBound,
      createTracker: track,
      compilePattern,
      enter,
      // @ts-expect-error: GFM / frontmatter are typed in `mdast` but not defined
      // here.
      handlers: {...handle},
      // @ts-expect-error: add `handle` in a second.
      handle: undefined,
      indentLines,
      indexStack: [],
      join: [...join],
      options: {},
      safe: safeBound,
      stack: [],
      unsafe: [...unsafe]
    };

    configure(state, settings);

    if (state.options.tightDefinitions) {
      state.join.push(joinDefinition);
    }

    state.handle = zwitch('type', {
      invalid,
      unknown,
      handlers: state.handlers
    });

    let result = state.handle(
      phrasing$1(tree) ? {type: 'root', children: [tree]} : tree,
      undefined,
      state,
      {before: '\n', after: '\n', now: {line: 1, column: 1}, lineShift: 0}
    );

    if (
      result &&
      result.charCodeAt(result.length - 1) !== 10 &&
      result.charCodeAt(result.length - 1) !== 13
    ) {
      result += '\n';
    }

    return result

    /**
     * Enter a construct.
     *
     * @type {Enter}
     */
    function enter(name) {
      state.stack.push(name);
      return exit

      /**
       * Exit a construct.
       *
       * @returns {undefined}
       *   Nothing.
       */
      function exit() {
        state.stack.pop();
      }
    }
  }

  /**
   * Handle an invalid value that cannot be processed.
   *
   * @param {unknown} value
   *   Value.
   * @returns {never}
   *   Never.
   * @throws {Error}
   *   Always.
   */
  function invalid(value) {
    throw new Error('Cannot handle value `' + value + '`, expected node')
  }

  /**
   * Handle an unknown node.
   *
   * @param {unknown} value
   *   Value.
   * @returns {never}
   *   Never.
   * @throws {Error}
   *   Always.
   */
  function unknown(value) {
    // Always a node.
    const node = /** @type {Nodes} */ (value);
    throw new Error('Cannot handle unknown node `' + node.type + '`')
  }

  /**
   * Join function for `tightDefinitions` option.
   *
   * @type {Join}
   */
  function joinDefinition(left, right) {
    // No blank line between adjacent definitions.
    if (left.type === 'definition' && left.type === right.type) {
      return 0
    }
  }

  /**
   * Serialize the children of a parent that contains phrasing children.
   *
   * These children will be joined flush together.
   *
   * @this {State}
   *   Info passed around about the current state.
   * @param {PhrasingParents} parent
   *   Parent of flow nodes.
   * @param {Info} info
   *   Info on where we are in the document we are generating.
   * @returns {string}
   *   Serialized children, joined together.
   */
  function containerPhrasingBound(parent, info) {
    return containerPhrasing(parent, this, info)
  }

  /**
   * Serialize the children of a parent that contains flow children.
   *
   * These children will typically be joined by blank lines.
   * What they are joined by exactly is defined by `Join` functions.
   *
   * @this {State}
   *   Info passed around about the current state.
   * @param {FlowParents} parent
   *   Parent of flow nodes.
   * @param {TrackFields} info
   *   Info on where we are in the document we are generating.
   * @returns {string}
   *   Serialized children, joined by (blank) lines.
   */
  function containerFlowBound(parent, info) {
    return containerFlow(parent, this, info)
  }

  /**
   * Make a string safe for embedding in markdown constructs.
   *
   * In markdown, almost all punctuation characters can, in certain cases,
   * result in something.
   * Whether they do is highly subjective to where they happen and in what
   * they happen.
   *
   * To solve this, `mdast-util-to-markdown` tracks:
   *
   * * Characters before and after something;
   * * What “constructs” we are in.
   *
   * This information is then used by this function to escape or encode
   * special characters.
   *
   * @this {State}
   *   Info passed around about the current state.
   * @param {string | null | undefined} value
   *   Raw value to make safe.
   * @param {SafeConfig} config
   *   Configuration.
   * @returns {string}
   *   Serialized markdown safe for embedding.
   */
  function safeBound(value, config) {
    return safe(this, value, config)
  }

  /**
   * @import {Code, ConstructRecord, Event, Extension, Previous, State, TokenizeContext, Tokenizer} from 'micromark-util-types'
   */

  const wwwPrefix = {
    tokenize: tokenizeWwwPrefix,
    partial: true
  };
  const domain = {
    tokenize: tokenizeDomain,
    partial: true
  };
  const path = {
    tokenize: tokenizePath,
    partial: true
  };
  const trail = {
    tokenize: tokenizeTrail,
    partial: true
  };
  const emailDomainDotTrail = {
    tokenize: tokenizeEmailDomainDotTrail,
    partial: true
  };
  const wwwAutolink = {
    name: 'wwwAutolink',
    tokenize: tokenizeWwwAutolink,
    previous: previousWww
  };
  const protocolAutolink = {
    name: 'protocolAutolink',
    tokenize: tokenizeProtocolAutolink,
    previous: previousProtocol
  };
  const emailAutolink = {
    name: 'emailAutolink',
    tokenize: tokenizeEmailAutolink,
    previous: previousEmail
  };

  /** @type {ConstructRecord} */
  const text = {};

  /**
   * Create an extension for `micromark` to support GitHub autolink literal
   * syntax.
   *
   * @returns {Extension}
   *   Extension for `micromark` that can be passed in `extensions` to enable GFM
   *   autolink literal syntax.
   */
  function gfmAutolinkLiteral() {
    return {
      text
    };
  }

  /** @type {Code} */
  let code = 48;

  // Add alphanumerics.
  while (code < 123) {
    text[code] = emailAutolink;
    code++;
    if (code === 58) code = 65;else if (code === 91) code = 97;
  }
  text[43] = emailAutolink;
  text[45] = emailAutolink;
  text[46] = emailAutolink;
  text[95] = emailAutolink;
  text[72] = [emailAutolink, protocolAutolink];
  text[104] = [emailAutolink, protocolAutolink];
  text[87] = [emailAutolink, wwwAutolink];
  text[119] = [emailAutolink, wwwAutolink];

  // To do: perform email autolink literals on events, afterwards.
  // That’s where `markdown-rs` and `cmark-gfm` perform it.
  // It should look for `@`, then for atext backwards, and then for a label
  // forwards.
  // To do: `mailto:`, `xmpp:` protocol as prefix.

  /**
   * Email autolink literal.
   *
   * ```markdown
   * > | a contact@example.org b
   *       ^^^^^^^^^^^^^^^^^^^
   * ```
   *
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizeEmailAutolink(effects, ok, nok) {
    const self = this;
    /** @type {boolean | undefined} */
    let dot;
    /** @type {boolean} */
    let data;
    return start;

    /**
     * Start of email autolink literal.
     *
     * ```markdown
     * > | a contact@example.org b
     *       ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      if (!gfmAtext(code) || !previousEmail.call(self, self.previous) || previousUnbalanced(self.events)) {
        return nok(code);
      }
      effects.enter('literalAutolink');
      effects.enter('literalAutolinkEmail');
      return atext(code);
    }

    /**
     * In email atext.
     *
     * ```markdown
     * > | a contact@example.org b
     *       ^
     * ```
     *
     * @type {State}
     */
    function atext(code) {
      if (gfmAtext(code)) {
        effects.consume(code);
        return atext;
      }
      if (code === 64) {
        effects.consume(code);
        return emailDomain;
      }
      return nok(code);
    }

    /**
     * In email domain.
     *
     * The reference code is a bit overly complex as it handles the `@`, of which
     * there may be just one.
     * Source: <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L318>
     *
     * ```markdown
     * > | a contact@example.org b
     *               ^
     * ```
     *
     * @type {State}
     */
    function emailDomain(code) {
      // Dot followed by alphanumerical (not `-` or `_`).
      if (code === 46) {
        return effects.check(emailDomainDotTrail, emailDomainAfter, emailDomainDot)(code);
      }

      // Alphanumerical, `-`, and `_`.
      if (code === 45 || code === 95 || asciiAlphanumeric(code)) {
        data = true;
        effects.consume(code);
        return emailDomain;
      }

      // To do: `/` if xmpp.

      // Note: normally we’d truncate trailing punctuation from the link.
      // However, email autolink literals cannot contain any of those markers,
      // except for `.`, but that can only occur if it isn’t trailing.
      // So we can ignore truncating!
      return emailDomainAfter(code);
    }

    /**
     * In email domain, on dot that is not a trail.
     *
     * ```markdown
     * > | a contact@example.org b
     *                      ^
     * ```
     *
     * @type {State}
     */
    function emailDomainDot(code) {
      effects.consume(code);
      dot = true;
      return emailDomain;
    }

    /**
     * After email domain.
     *
     * ```markdown
     * > | a contact@example.org b
     *                          ^
     * ```
     *
     * @type {State}
     */
    function emailDomainAfter(code) {
      // Domain must not be empty, must include a dot, and must end in alphabetical.
      // Source: <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L332>.
      if (data && dot && asciiAlpha(self.previous)) {
        effects.exit('literalAutolinkEmail');
        effects.exit('literalAutolink');
        return ok(code);
      }
      return nok(code);
    }
  }

  /**
   * `www` autolink literal.
   *
   * ```markdown
   * > | a www.example.org b
   *       ^^^^^^^^^^^^^^^
   * ```
   *
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizeWwwAutolink(effects, ok, nok) {
    const self = this;
    return wwwStart;

    /**
     * Start of www autolink literal.
     *
     * ```markdown
     * > | www.example.com/a?b#c
     *     ^
     * ```
     *
     * @type {State}
     */
    function wwwStart(code) {
      if (code !== 87 && code !== 119 || !previousWww.call(self, self.previous) || previousUnbalanced(self.events)) {
        return nok(code);
      }
      effects.enter('literalAutolink');
      effects.enter('literalAutolinkWww');
      // Note: we *check*, so we can discard the `www.` we parsed.
      // If it worked, we consider it as a part of the domain.
      return effects.check(wwwPrefix, effects.attempt(domain, effects.attempt(path, wwwAfter), nok), nok)(code);
    }

    /**
     * After a www autolink literal.
     *
     * ```markdown
     * > | www.example.com/a?b#c
     *                          ^
     * ```
     *
     * @type {State}
     */
    function wwwAfter(code) {
      effects.exit('literalAutolinkWww');
      effects.exit('literalAutolink');
      return ok(code);
    }
  }

  /**
   * Protocol autolink literal.
   *
   * ```markdown
   * > | a https://example.org b
   *       ^^^^^^^^^^^^^^^^^^^
   * ```
   *
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizeProtocolAutolink(effects, ok, nok) {
    const self = this;
    let buffer = '';
    let seen = false;
    return protocolStart;

    /**
     * Start of protocol autolink literal.
     *
     * ```markdown
     * > | https://example.com/a?b#c
     *     ^
     * ```
     *
     * @type {State}
     */
    function protocolStart(code) {
      if ((code === 72 || code === 104) && previousProtocol.call(self, self.previous) && !previousUnbalanced(self.events)) {
        effects.enter('literalAutolink');
        effects.enter('literalAutolinkHttp');
        buffer += String.fromCodePoint(code);
        effects.consume(code);
        return protocolPrefixInside;
      }
      return nok(code);
    }

    /**
     * In protocol.
     *
     * ```markdown
     * > | https://example.com/a?b#c
     *     ^^^^^
     * ```
     *
     * @type {State}
     */
    function protocolPrefixInside(code) {
      // `5` is size of `https`
      if (asciiAlpha(code) && buffer.length < 5) {
        // @ts-expect-error: definitely number.
        buffer += String.fromCodePoint(code);
        effects.consume(code);
        return protocolPrefixInside;
      }
      if (code === 58) {
        const protocol = buffer.toLowerCase();
        if (protocol === 'http' || protocol === 'https') {
          effects.consume(code);
          return protocolSlashesInside;
        }
      }
      return nok(code);
    }

    /**
     * In slashes.
     *
     * ```markdown
     * > | https://example.com/a?b#c
     *           ^^
     * ```
     *
     * @type {State}
     */
    function protocolSlashesInside(code) {
      if (code === 47) {
        effects.consume(code);
        if (seen) {
          return afterProtocol;
        }
        seen = true;
        return protocolSlashesInside;
      }
      return nok(code);
    }

    /**
     * After protocol, before domain.
     *
     * ```markdown
     * > | https://example.com/a?b#c
     *             ^
     * ```
     *
     * @type {State}
     */
    function afterProtocol(code) {
      // To do: this is different from `markdown-rs`:
      // https://github.com/wooorm/markdown-rs/blob/b3a921c761309ae00a51fe348d8a43adbc54b518/src/construct/gfm_autolink_literal.rs#L172-L182
      return code === null || asciiControl(code) || markdownLineEndingOrSpace(code) || unicodeWhitespace(code) || unicodePunctuation(code) ? nok(code) : effects.attempt(domain, effects.attempt(path, protocolAfter), nok)(code);
    }

    /**
     * After a protocol autolink literal.
     *
     * ```markdown
     * > | https://example.com/a?b#c
     *                              ^
     * ```
     *
     * @type {State}
     */
    function protocolAfter(code) {
      effects.exit('literalAutolinkHttp');
      effects.exit('literalAutolink');
      return ok(code);
    }
  }

  /**
   * `www` prefix.
   *
   * ```markdown
   * > | a www.example.org b
   *       ^^^^
   * ```
   *
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizeWwwPrefix(effects, ok, nok) {
    let size = 0;
    return wwwPrefixInside;

    /**
     * In www prefix.
     *
     * ```markdown
     * > | www.example.com
     *     ^^^^
     * ```
     *
     * @type {State}
     */
    function wwwPrefixInside(code) {
      if ((code === 87 || code === 119) && size < 3) {
        size++;
        effects.consume(code);
        return wwwPrefixInside;
      }
      if (code === 46 && size === 3) {
        effects.consume(code);
        return wwwPrefixAfter;
      }
      return nok(code);
    }

    /**
     * After www prefix.
     *
     * ```markdown
     * > | www.example.com
     *         ^
     * ```
     *
     * @type {State}
     */
    function wwwPrefixAfter(code) {
      // If there is *anything*, we can link.
      return code === null ? nok(code) : ok(code);
    }
  }

  /**
   * Domain.
   *
   * ```markdown
   * > | a https://example.org b
   *               ^^^^^^^^^^^
   * ```
   *
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizeDomain(effects, ok, nok) {
    /** @type {boolean | undefined} */
    let underscoreInLastSegment;
    /** @type {boolean | undefined} */
    let underscoreInLastLastSegment;
    /** @type {boolean | undefined} */
    let seen;
    return domainInside;

    /**
     * In domain.
     *
     * ```markdown
     * > | https://example.com/a
     *             ^^^^^^^^^^^
     * ```
     *
     * @type {State}
     */
    function domainInside(code) {
      // Check whether this marker, which is a trailing punctuation
      // marker, optionally followed by more trailing markers, and then
      // followed by an end.
      if (code === 46 || code === 95) {
        return effects.check(trail, domainAfter, domainAtPunctuation)(code);
      }

      // GH documents that only alphanumerics (other than `-`, `.`, and `_`) can
      // occur, which sounds like ASCII only, but they also support `www.點看.com`,
      // so that’s Unicode.
      // Instead of some new production for Unicode alphanumerics, markdown
      // already has that for Unicode punctuation and whitespace, so use those.
      // Source: <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L12>.
      if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code) || code !== 45 && unicodePunctuation(code)) {
        return domainAfter(code);
      }
      seen = true;
      effects.consume(code);
      return domainInside;
    }

    /**
     * In domain, at potential trailing punctuation, that was not trailing.
     *
     * ```markdown
     * > | https://example.com
     *                    ^
     * ```
     *
     * @type {State}
     */
    function domainAtPunctuation(code) {
      // There is an underscore in the last segment of the domain
      if (code === 95) {
        underscoreInLastSegment = true;
      }
      // Otherwise, it’s a `.`: save the last segment underscore in the
      // penultimate segment slot.
      else {
        underscoreInLastLastSegment = underscoreInLastSegment;
        underscoreInLastSegment = undefined;
      }
      effects.consume(code);
      return domainInside;
    }

    /**
     * After domain.
     *
     * ```markdown
     * > | https://example.com/a
     *                        ^
     * ```
     *
     * @type {State} */
    function domainAfter(code) {
      // Note: that’s GH says a dot is needed, but it’s not true:
      // <https://github.com/github/cmark-gfm/issues/279>
      if (underscoreInLastLastSegment || underscoreInLastSegment || !seen) {
        return nok(code);
      }
      return ok(code);
    }
  }

  /**
   * Path.
   *
   * ```markdown
   * > | a https://example.org/stuff b
   *                          ^^^^^^
   * ```
   *
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizePath(effects, ok) {
    let sizeOpen = 0;
    let sizeClose = 0;
    return pathInside;

    /**
     * In path.
     *
     * ```markdown
     * > | https://example.com/a
     *                        ^^
     * ```
     *
     * @type {State}
     */
    function pathInside(code) {
      if (code === 40) {
        sizeOpen++;
        effects.consume(code);
        return pathInside;
      }

      // To do: `markdown-rs` also needs this.
      // If this is a paren, and there are less closings than openings,
      // we don’t check for a trail.
      if (code === 41 && sizeClose < sizeOpen) {
        return pathAtPunctuation(code);
      }

      // Check whether this trailing punctuation marker is optionally
      // followed by more trailing markers, and then followed
      // by an end.
      if (code === 33 || code === 34 || code === 38 || code === 39 || code === 41 || code === 42 || code === 44 || code === 46 || code === 58 || code === 59 || code === 60 || code === 63 || code === 93 || code === 95 || code === 126) {
        return effects.check(trail, ok, pathAtPunctuation)(code);
      }
      if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) {
        return ok(code);
      }
      effects.consume(code);
      return pathInside;
    }

    /**
     * In path, at potential trailing punctuation, that was not trailing.
     *
     * ```markdown
     * > | https://example.com/a"b
     *                          ^
     * ```
     *
     * @type {State}
     */
    function pathAtPunctuation(code) {
      // Count closing parens.
      if (code === 41) {
        sizeClose++;
      }
      effects.consume(code);
      return pathInside;
    }
  }

  /**
   * Trail.
   *
   * This calls `ok` if this *is* the trail, followed by an end, which means
   * the entire trail is not part of the link.
   * It calls `nok` if this *is* part of the link.
   *
   * ```markdown
   * > | https://example.com").
   *                        ^^^
   * ```
   *
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizeTrail(effects, ok, nok) {
    return trail;

    /**
     * In trail of domain or path.
     *
     * ```markdown
     * > | https://example.com").
     *                        ^
     * ```
     *
     * @type {State}
     */
    function trail(code) {
      // Regular trailing punctuation.
      if (code === 33 || code === 34 || code === 39 || code === 41 || code === 42 || code === 44 || code === 46 || code === 58 || code === 59 || code === 63 || code === 95 || code === 126) {
        effects.consume(code);
        return trail;
      }

      // `&` followed by one or more alphabeticals and then a `;`, is
      // as a whole considered as trailing punctuation.
      // In all other cases, it is considered as continuation of the URL.
      if (code === 38) {
        effects.consume(code);
        return trailCharacterReferenceStart;
      }

      // Needed because we allow literals after `[`, as we fix:
      // <https://github.com/github/cmark-gfm/issues/278>.
      // Check that it is not followed by `(` or `[`.
      if (code === 93) {
        effects.consume(code);
        return trailBracketAfter;
      }
      if (
      // `<` is an end.
      code === 60 ||
      // So is whitespace.
      code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) {
        return ok(code);
      }
      return nok(code);
    }

    /**
     * In trail, after `]`.
     *
     * > 👉 **Note**: this deviates from `cmark-gfm` to fix a bug.
     * > See end of <https://github.com/github/cmark-gfm/issues/278> for more.
     *
     * ```markdown
     * > | https://example.com](
     *                         ^
     * ```
     *
     * @type {State}
     */
    function trailBracketAfter(code) {
      // Whitespace or something that could start a resource or reference is the end.
      // Switch back to trail otherwise.
      if (code === null || code === 40 || code === 91 || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) {
        return ok(code);
      }
      return trail(code);
    }

    /**
     * In character-reference like trail, after `&`.
     *
     * ```markdown
     * > | https://example.com&amp;).
     *                         ^
     * ```
     *
     * @type {State}
     */
    function trailCharacterReferenceStart(code) {
      // When non-alpha, it’s not a trail.
      return asciiAlpha(code) ? trailCharacterReferenceInside(code) : nok(code);
    }

    /**
     * In character-reference like trail.
     *
     * ```markdown
     * > | https://example.com&amp;).
     *                         ^
     * ```
     *
     * @type {State}
     */
    function trailCharacterReferenceInside(code) {
      // Switch back to trail if this is well-formed.
      if (code === 59) {
        effects.consume(code);
        return trail;
      }
      if (asciiAlpha(code)) {
        effects.consume(code);
        return trailCharacterReferenceInside;
      }

      // It’s not a trail.
      return nok(code);
    }
  }

  /**
   * Dot in email domain trail.
   *
   * This calls `ok` if this *is* the trail, followed by an end, which means
   * the trail is not part of the link.
   * It calls `nok` if this *is* part of the link.
   *
   * ```markdown
   * > | contact@example.org.
   *                        ^
   * ```
   *
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizeEmailDomainDotTrail(effects, ok, nok) {
    return start;

    /**
     * Dot.
     *
     * ```markdown
     * > | contact@example.org.
     *                    ^   ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      // Must be dot.
      effects.consume(code);
      return after;
    }

    /**
     * After dot.
     *
     * ```markdown
     * > | contact@example.org.
     *                     ^   ^
     * ```
     *
     * @type {State}
     */
    function after(code) {
      // Not a trail if alphanumeric.
      return asciiAlphanumeric(code) ? nok(code) : ok(code);
    }
  }

  /**
   * See:
   * <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L156>.
   *
   * @type {Previous}
   */
  function previousWww(code) {
    return code === null || code === 40 || code === 42 || code === 95 || code === 91 || code === 93 || code === 126 || markdownLineEndingOrSpace(code);
  }

  /**
   * See:
   * <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L214>.
   *
   * @type {Previous}
   */
  function previousProtocol(code) {
    return !asciiAlpha(code);
  }

  /**
   * @this {TokenizeContext}
   * @type {Previous}
   */
  function previousEmail(code) {
    // Do not allow a slash “inside” atext.
    // The reference code is a bit weird, but that’s what it results in.
    // Source: <https://github.com/github/cmark-gfm/blob/ef1cfcb/extensions/autolink.c#L307>.
    // Other than slash, every preceding character is allowed.
    return !(code === 47 || gfmAtext(code));
  }

  /**
   * @param {Code} code
   * @returns {boolean}
   */
  function gfmAtext(code) {
    return code === 43 || code === 45 || code === 46 || code === 95 || asciiAlphanumeric(code);
  }

  /**
   * @param {Array<Event>} events
   * @returns {boolean}
   */
  function previousUnbalanced(events) {
    let index = events.length;
    let result = false;
    while (index--) {
      const token = events[index][1];
      if ((token.type === 'labelLink' || token.type === 'labelImage') && !token._balanced) {
        result = true;
        break;
      }

      // If we’ve seen this token, and it was marked as not having any unbalanced
      // bracket before it, we can exit.
      if (token._gfmAutolinkLiteralWalkedInto) {
        result = false;
        break;
      }
    }
    if (events.length > 0 && !result) {
      // Mark the last token as “walked into” w/o finding
      // anything.
      events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
    }
    return result;
  }

  /**
   * @import {Event, Exiter, Extension, Resolver, State, Token, TokenizeContext, Tokenizer} from 'micromark-util-types'
   */

  const indent = {
    tokenize: tokenizeIndent,
    partial: true
  };

  // To do: micromark should support a `_hiddenGfmFootnoteSupport`, which only
  // affects label start (image).
  // That will let us drop `tokenizePotentialGfmFootnote*`.
  // It currently has a `_hiddenFootnoteSupport`, which affects that and more.
  // That can be removed when `micromark-extension-footnote` is archived.

  /**
   * Create an extension for `micromark` to enable GFM footnote syntax.
   *
   * @returns {Extension}
   *   Extension for `micromark` that can be passed in `extensions` to
   *   enable GFM footnote syntax.
   */
  function gfmFootnote() {
    /** @type {Extension} */
    return {
      document: {
        [91]: {
          name: 'gfmFootnoteDefinition',
          tokenize: tokenizeDefinitionStart,
          continuation: {
            tokenize: tokenizeDefinitionContinuation
          },
          exit: gfmFootnoteDefinitionEnd
        }
      },
      text: {
        [91]: {
          name: 'gfmFootnoteCall',
          tokenize: tokenizeGfmFootnoteCall
        },
        [93]: {
          name: 'gfmPotentialFootnoteCall',
          add: 'after',
          tokenize: tokenizePotentialGfmFootnoteCall,
          resolveTo: resolveToPotentialGfmFootnoteCall
        }
      }
    };
  }

  // To do: remove after micromark update.
  /**
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizePotentialGfmFootnoteCall(effects, ok, nok) {
    const self = this;
    let index = self.events.length;
    const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
    /** @type {Token} */
    let labelStart;

    // Find an opening.
    while (index--) {
      const token = self.events[index][1];
      if (token.type === "labelImage") {
        labelStart = token;
        break;
      }

      // Exit if we’ve walked far enough.
      if (token.type === 'gfmFootnoteCall' || token.type === "labelLink" || token.type === "label" || token.type === "image" || token.type === "link") {
        break;
      }
    }
    return start;

    /**
     * @type {State}
     */
    function start(code) {
      if (!labelStart || !labelStart._balanced) {
        return nok(code);
      }
      const id = normalizeIdentifier(self.sliceSerialize({
        start: labelStart.end,
        end: self.now()
      }));
      if (id.codePointAt(0) !== 94 || !defined.includes(id.slice(1))) {
        return nok(code);
      }
      effects.enter('gfmFootnoteCallLabelMarker');
      effects.consume(code);
      effects.exit('gfmFootnoteCallLabelMarker');
      return ok(code);
    }
  }

  // To do: remove after micromark update.
  /** @type {Resolver} */
  function resolveToPotentialGfmFootnoteCall(events, context) {
    let index = events.length;

    // Find an opening.
    while (index--) {
      if (events[index][1].type === "labelImage" && events[index][0] === 'enter') {
        events[index][1];
        break;
      }
    }
    // Change the `labelImageMarker` to a `data`.
    events[index + 1][1].type = "data";
    events[index + 3][1].type = 'gfmFootnoteCallLabelMarker';

    // The whole (without `!`):
    /** @type {Token} */
    const call = {
      type: 'gfmFootnoteCall',
      start: Object.assign({}, events[index + 3][1].start),
      end: Object.assign({}, events[events.length - 1][1].end)
    };
    // The `^` marker
    /** @type {Token} */
    const marker = {
      type: 'gfmFootnoteCallMarker',
      start: Object.assign({}, events[index + 3][1].end),
      end: Object.assign({}, events[index + 3][1].end)
    };
    // Increment the end 1 character.
    marker.end.column++;
    marker.end.offset++;
    marker.end._bufferIndex++;
    /** @type {Token} */
    const string = {
      type: 'gfmFootnoteCallString',
      start: Object.assign({}, marker.end),
      end: Object.assign({}, events[events.length - 1][1].start)
    };
    /** @type {Token} */
    const chunk = {
      type: "chunkString",
      contentType: 'string',
      start: Object.assign({}, string.start),
      end: Object.assign({}, string.end)
    };

    /** @type {Array<Event>} */
    const replacement = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    events[index + 1], events[index + 2], ['enter', call, context],
    // The `[`
    events[index + 3], events[index + 4],
    // The `^`.
    ['enter', marker, context], ['exit', marker, context],
    // Everything in between.
    ['enter', string, context], ['enter', chunk, context], ['exit', chunk, context], ['exit', string, context],
    // The ending (`]`, properly parsed and labelled).
    events[events.length - 2], events[events.length - 1], ['exit', call, context]];
    events.splice(index, events.length - index + 1, ...replacement);
    return events;
  }

  /**
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizeGfmFootnoteCall(effects, ok, nok) {
    const self = this;
    const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
    let size = 0;
    /** @type {boolean} */
    let data;

    // Note: the implementation of `markdown-rs` is different, because it houses
    // core *and* extensions in one project.
    // Therefore, it can include footnote logic inside `label-end`.
    // We can’t do that, but luckily, we can parse footnotes in a simpler way than
    // needed for labels.
    return start;

    /**
     * Start of footnote label.
     *
     * ```markdown
     * > | a [^b] c
     *       ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      effects.enter('gfmFootnoteCall');
      effects.enter('gfmFootnoteCallLabelMarker');
      effects.consume(code);
      effects.exit('gfmFootnoteCallLabelMarker');
      return callStart;
    }

    /**
     * After `[`, at `^`.
     *
     * ```markdown
     * > | a [^b] c
     *        ^
     * ```
     *
     * @type {State}
     */
    function callStart(code) {
      if (code !== 94) return nok(code);
      effects.enter('gfmFootnoteCallMarker');
      effects.consume(code);
      effects.exit('gfmFootnoteCallMarker');
      effects.enter('gfmFootnoteCallString');
      effects.enter('chunkString').contentType = 'string';
      return callData;
    }

    /**
     * In label.
     *
     * ```markdown
     * > | a [^b] c
     *         ^
     * ```
     *
     * @type {State}
     */
    function callData(code) {
      if (
      // Too long.
      size > 999 ||
      // Closing brace with nothing.
      code === 93 && !data ||
      // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      code === null || code === 91 || markdownLineEndingOrSpace(code)) {
        return nok(code);
      }
      if (code === 93) {
        effects.exit('chunkString');
        const token = effects.exit('gfmFootnoteCallString');
        if (!defined.includes(normalizeIdentifier(self.sliceSerialize(token)))) {
          return nok(code);
        }
        effects.enter('gfmFootnoteCallLabelMarker');
        effects.consume(code);
        effects.exit('gfmFootnoteCallLabelMarker');
        effects.exit('gfmFootnoteCall');
        return ok;
      }
      if (!markdownLineEndingOrSpace(code)) {
        data = true;
      }
      size++;
      effects.consume(code);
      return code === 92 ? callEscape : callData;
    }

    /**
     * On character after escape.
     *
     * ```markdown
     * > | a [^b\c] d
     *           ^
     * ```
     *
     * @type {State}
     */
    function callEscape(code) {
      if (code === 91 || code === 92 || code === 93) {
        effects.consume(code);
        size++;
        return callData;
      }
      return callData(code);
    }
  }

  /**
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizeDefinitionStart(effects, ok, nok) {
    const self = this;
    const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
    /** @type {string} */
    let identifier;
    let size = 0;
    /** @type {boolean | undefined} */
    let data;
    return start;

    /**
     * Start of GFM footnote definition.
     *
     * ```markdown
     * > | [^a]: b
     *     ^
     * ```
     *
     * @type {State}
     */
    function start(code) {
      effects.enter('gfmFootnoteDefinition')._container = true;
      effects.enter('gfmFootnoteDefinitionLabel');
      effects.enter('gfmFootnoteDefinitionLabelMarker');
      effects.consume(code);
      effects.exit('gfmFootnoteDefinitionLabelMarker');
      return labelAtMarker;
    }

    /**
     * In label, at caret.
     *
     * ```markdown
     * > | [^a]: b
     *      ^
     * ```
     *
     * @type {State}
     */
    function labelAtMarker(code) {
      if (code === 94) {
        effects.enter('gfmFootnoteDefinitionMarker');
        effects.consume(code);
        effects.exit('gfmFootnoteDefinitionMarker');
        effects.enter('gfmFootnoteDefinitionLabelString');
        effects.enter('chunkString').contentType = 'string';
        return labelInside;
      }
      return nok(code);
    }

    /**
     * In label.
     *
     * > 👉 **Note**: `cmark-gfm` prevents whitespace from occurring in footnote
     * > definition labels.
     *
     * ```markdown
     * > | [^a]: b
     *       ^
     * ```
     *
     * @type {State}
     */
    function labelInside(code) {
      if (
      // Too long.
      size > 999 ||
      // Closing brace with nothing.
      code === 93 && !data ||
      // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      code === null || code === 91 || markdownLineEndingOrSpace(code)) {
        return nok(code);
      }
      if (code === 93) {
        effects.exit('chunkString');
        const token = effects.exit('gfmFootnoteDefinitionLabelString');
        identifier = normalizeIdentifier(self.sliceSerialize(token));
        effects.enter('gfmFootnoteDefinitionLabelMarker');
        effects.consume(code);
        effects.exit('gfmFootnoteDefinitionLabelMarker');
        effects.exit('gfmFootnoteDefinitionLabel');
        return labelAfter;
      }
      if (!markdownLineEndingOrSpace(code)) {
        data = true;
      }
      size++;
      effects.consume(code);
      return code === 92 ? labelEscape : labelInside;
    }

    /**
     * After `\`, at a special character.
     *
     * > 👉 **Note**: `cmark-gfm` currently does not support escaped brackets:
     * > <https://github.com/github/cmark-gfm/issues/240>
     *
     * ```markdown
     * > | [^a\*b]: c
     *         ^
     * ```
     *
     * @type {State}
     */
    function labelEscape(code) {
      if (code === 91 || code === 92 || code === 93) {
        effects.consume(code);
        size++;
        return labelInside;
      }
      return labelInside(code);
    }

    /**
     * After definition label.
     *
     * ```markdown
     * > | [^a]: b
     *         ^
     * ```
     *
     * @type {State}
     */
    function labelAfter(code) {
      if (code === 58) {
        effects.enter('definitionMarker');
        effects.consume(code);
        effects.exit('definitionMarker');
        if (!defined.includes(identifier)) {
          defined.push(identifier);
        }

        // Any whitespace after the marker is eaten, forming indented code
        // is not possible.
        // No space is also fine, just like a block quote marker.
        return factorySpace(effects, whitespaceAfter, 'gfmFootnoteDefinitionWhitespace');
      }
      return nok(code);
    }

    /**
     * After definition prefix.
     *
     * ```markdown
     * > | [^a]: b
     *           ^
     * ```
     *
     * @type {State}
     */
    function whitespaceAfter(code) {
      // `markdown-rs` has a wrapping token for the prefix that is closed here.
      return ok(code);
    }
  }

  /**
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizeDefinitionContinuation(effects, ok, nok) {
    /// Start of footnote definition continuation.
    ///
    /// ```markdown
    ///   | [^a]: b
    /// > |     c
    ///     ^
    /// ```
    //
    // Either a blank line, which is okay, or an indented thing.
    return effects.check(blankLine, ok, effects.attempt(indent, ok, nok));
  }

  /** @type {Exiter} */
  function gfmFootnoteDefinitionEnd(effects) {
    effects.exit('gfmFootnoteDefinition');
  }

  /**
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizeIndent(effects, ok, nok) {
    const self = this;
    return factorySpace(effects, afterPrefix, 'gfmFootnoteDefinitionIndent', 4 + 1);

    /**
     * @type {State}
     */
    function afterPrefix(code) {
      const tail = self.events[self.events.length - 1];
      return tail && tail[1].type === 'gfmFootnoteDefinitionIndent' && tail[2].sliceSerialize(tail[1], true).length === 4 ? ok(code) : nok(code);
    }
  }

  /**
   * @import {Options} from 'micromark-extension-gfm-strikethrough'
   * @import {Event, Extension, Resolver, State, Token, TokenizeContext, Tokenizer} from 'micromark-util-types'
   */

  /**
   * Create an extension for `micromark` to enable GFM strikethrough syntax.
   *
   * @param {Options | null | undefined} [options={}]
   *   Configuration.
   * @returns {Extension}
   *   Extension for `micromark` that can be passed in `extensions`, to
   *   enable GFM strikethrough syntax.
   */
  function gfmStrikethrough(options) {
    const options_ = {};
    let single = options_.singleTilde;
    const tokenizer = {
      name: 'strikethrough',
      tokenize: tokenizeStrikethrough,
      resolveAll: resolveAllStrikethrough
    };
    if (single === null || single === undefined) {
      single = true;
    }
    return {
      text: {
        [126]: tokenizer
      },
      insideSpan: {
        null: [tokenizer]
      },
      attentionMarkers: {
        null: [126]
      }
    };

    /**
     * Take events and resolve strikethrough.
     *
     * @type {Resolver}
     */
    function resolveAllStrikethrough(events, context) {
      let index = -1;

      // Walk through all events.
      while (++index < events.length) {
        // Find a token that can close.
        if (events[index][0] === 'enter' && events[index][1].type === 'strikethroughSequenceTemporary' && events[index][1]._close) {
          let open = index;

          // Now walk back to find an opener.
          while (open--) {
            // Find a token that can open the closer.
            if (events[open][0] === 'exit' && events[open][1].type === 'strikethroughSequenceTemporary' && events[open][1]._open &&
            // If the sizes are the same:
            events[index][1].end.offset - events[index][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
              events[index][1].type = 'strikethroughSequence';
              events[open][1].type = 'strikethroughSequence';

              /** @type {Token} */
              const strikethrough = {
                type: 'strikethrough',
                start: Object.assign({}, events[open][1].start),
                end: Object.assign({}, events[index][1].end)
              };

              /** @type {Token} */
              const text = {
                type: 'strikethroughText',
                start: Object.assign({}, events[open][1].end),
                end: Object.assign({}, events[index][1].start)
              };

              // Opening.
              /** @type {Array<Event>} */
              const nextEvents = [['enter', strikethrough, context], ['enter', events[open][1], context], ['exit', events[open][1], context], ['enter', text, context]];
              const insideSpan = context.parser.constructs.insideSpan.null;
              if (insideSpan) {
                // Between.
                splice(nextEvents, nextEvents.length, 0, resolveAll(insideSpan, events.slice(open + 1, index), context));
              }

              // Closing.
              splice(nextEvents, nextEvents.length, 0, [['exit', text, context], ['enter', events[index][1], context], ['exit', events[index][1], context], ['exit', strikethrough, context]]);
              splice(events, open - 1, index - open + 3, nextEvents);
              index = open + nextEvents.length - 2;
              break;
            }
          }
        }
      }
      index = -1;
      while (++index < events.length) {
        if (events[index][1].type === 'strikethroughSequenceTemporary') {
          events[index][1].type = "data";
        }
      }
      return events;
    }

    /**
     * @this {TokenizeContext}
     * @type {Tokenizer}
     */
    function tokenizeStrikethrough(effects, ok, nok) {
      const previous = this.previous;
      const events = this.events;
      let size = 0;
      return start;

      /** @type {State} */
      function start(code) {
        if (previous === 126 && events[events.length - 1][1].type !== "characterEscape") {
          return nok(code);
        }
        effects.enter('strikethroughSequenceTemporary');
        return more(code);
      }

      /** @type {State} */
      function more(code) {
        const before = classifyCharacter(previous);
        if (code === 126) {
          // If this is the third marker, exit.
          if (size > 1) return nok(code);
          effects.consume(code);
          size++;
          return more;
        }
        if (size < 2 && !single) return nok(code);
        const token = effects.exit('strikethroughSequenceTemporary');
        const after = classifyCharacter(code);
        token._open = !after || after === 2 && Boolean(before);
        token._close = !before || before === 2 && Boolean(after);
        return ok(code);
      }
    }
  }

  /**
   * @import {Event} from 'micromark-util-types'
   */

  // Port of `edit_map.rs` from `markdown-rs`.
  // This should move to `markdown-js` later.

  // Deal with several changes in events, batching them together.
  //
  // Preferably, changes should be kept to a minimum.
  // Sometimes, it’s needed to change the list of events, because parsing can be
  // messy, and it helps to expose a cleaner interface of events to the compiler
  // and other users.
  // It can also help to merge many adjacent similar events.
  // And, in other cases, it’s needed to parse subcontent: pass some events
  // through another tokenizer and inject the result.

  /**
   * @typedef {[number, number, Array<Event>]} Change
   * @typedef {[number, number, number]} Jump
   */

  /**
   * Tracks a bunch of edits.
   */
  class EditMap {
    /**
     * Create a new edit map.
     */
    constructor() {
      /**
       * Record of changes.
       *
       * @type {Array<Change>}
       */
      this.map = [];

      /**
       * Changes by index, so `add` does not scan `map` (quadratic on
       * table-heavy documents).
       *
       * @type {Map<number, Change>}
       */
      this.index = new Map();
    }

    /**
     * Create an edit: a remove and/or add at a certain place.
     *
     * @param {number} index
     *   Index at which to apply the edit.
     * @param {number} remove
     *   Count of items to remove at the index.
     * @param {Array<Event>} add
     *   Items to add at the index.
     * @returns {undefined}
     *   Nothing.
     */
    add(index, remove, add) {
      addImplementation(this, index, remove, add);
    }

    // To do: add this when moving to `micromark`.
    // /**
    //  * Create an edit: but insert `add` before existing additions.
    //  *
    //  * @param {number} index
    //  * @param {number} remove
    //  * @param {Array<Event>} add
    //  * @returns {undefined}
    //  */
    // addBefore(index, remove, add) {
    //   addImplementation(this, index, remove, add, true)
    // }

    /**
     * Done, change the events.
     *
     * @param {Array<Event>} events
     *   List of events to apply the edits to.
     * @returns {undefined}
     *   Nothing.
     */
    consume(events) {
      this.map.sort(function (a, b) {
        return a[0] - b[0];
      });

      /* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
      if (this.map.length === 0) {
        return;
      }

      // To do: if links are added in events, like they are in `markdown-rs`,
      // this is needed.
      // // Calculate jumps: where items in the current list move to.
      // /** @type {Array<Jump>} */
      // const jumps = []
      // let index = 0
      // let addAcc = 0
      // let removeAcc = 0
      // while (index < this.map.length) {
      //   const [at, remove, add] = this.map[index]
      //   removeAcc += remove
      //   addAcc += add.length
      //   jumps.push([at, removeAcc, addAcc])
      //   index += 1
      // }
      //
      // . shiftLinks(events, jumps)

      let index = this.map.length;
      /** @type {Array<Array<Event>>} */
      const vecs = [];
      while (index > 0) {
        index -= 1;
        vecs.push(events.slice(this.map[index][0] + this.map[index][1]), this.map[index][2]);

        // Truncate rest.
        events.length = this.map[index][0];
      }
      vecs.push(events.slice());
      events.length = 0;
      let slice = vecs.pop();
      while (slice) {
        for (const element of slice) {
          events.push(element);
        }
        slice = vecs.pop();
      }

      // Truncate everything.
      this.map.length = 0;
      this.index.clear();
    }
  }

  /**
   * Create an edit.
   *
   * @param {EditMap} editMap
   *   Edit map to apply to.
   * @param {number} at
   *   Index at which to apply the edit.
   * @param {number} remove
   *   Count of items to remove at the index.
   * @param {Array<Event>} add
   *   Items to add at the index.
   * @returns {undefined}
   *   Nothing.
   */
  function addImplementation(editMap, at, remove, add) {
    /* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
    if (remove === 0 && add.length === 0) {
      return;
    }
    const existing = editMap.index.get(at);
    if (existing) {
      existing[1] += remove;

      // To do: before not used by tables, use when moving to micromark.
      // if (before) {
      //   add.push(...existing[2])
      //   existing[2] = add
      // } else {
      existing[2].push(...add);
      // }

      return;
    }

    /** @type {Change} */
    const change = [at, remove, add];
    editMap.map.push(change);
    editMap.index.set(at, change);
  }

  // /**
  //  * Shift `previous` and `next` links according to `jumps`.
  //  *
  //  * This fixes links in case there are events removed or added between them.
  //  *
  //  * @param {Array<Event>} events
  //  * @param {Array<Jump>} jumps
  //  */
  // function shiftLinks(events, jumps) {
  //   let jumpIndex = 0
  //   let index = 0
  //   let add = 0
  //   let rm = 0

  //   while (index < events.length) {
  //     const rmCurr = rm

  //     while (jumpIndex < jumps.length && jumps[jumpIndex][0] <= index) {
  //       add = jumps[jumpIndex][2]
  //       rm = jumps[jumpIndex][1]
  //       jumpIndex += 1
  //     }

  //     // Ignore items that will be removed.
  //     if (rm > rmCurr) {
  //       index += rm - rmCurr
  //     } else {
  //       // ?
  //       // if let Some(link) = &events[index].link {
  //       //     if let Some(next) = link.next {
  //       //         events[next].link.as_mut().unwrap().previous = Some(index + add - rm);
  //       //         while jumpIndex < jumps.len() && jumps[jumpIndex].0 <= next {
  //       //             add = jumps[jumpIndex].2;
  //       //             rm = jumps[jumpIndex].1;
  //       //             jumpIndex += 1;
  //       //         }
  //       //         events[index].link.as_mut().unwrap().next = Some(next + add - rm);
  //       //         index = next;
  //       //         continue;
  //       //     }
  //       // }
  //       index += 1
  //     }
  //   }
  // }

  /**
   * @import {Event} from 'micromark-util-types'
   */

  /**
   * @typedef {'center' | 'left' | 'none' | 'right'} Align
   */

  /**
   * Figure out the alignment of a GFM table.
   *
   * @param {Readonly<Array<Event>>} events
   *   List of events.
   * @param {number} index
   *   Table enter event.
   * @returns {Array<Align>}
   *   List of aligns.
   */
  function gfmTableAlign(events, index) {
    let inDelimiterRow = false;
    /** @type {Array<Align>} */
    const align = [];
    while (index < events.length) {
      const event = events[index];
      if (inDelimiterRow) {
        if (event[0] === 'enter') {
          // Start of alignment value: set a new column.
          // To do: `markdown-rs` uses `tableDelimiterCellValue`.
          if (event[1].type === 'tableContent') {
            align.push(events[index + 1][1].type === 'tableDelimiterMarker' ? 'left' : 'none');
          }
        }
        // Exits:
        // End of alignment value: change the column.
        // To do: `markdown-rs` uses `tableDelimiterCellValue`.
        else if (event[1].type === 'tableContent') {
          if (events[index - 1][1].type === 'tableDelimiterMarker') {
            const alignIndex = align.length - 1;
            align[alignIndex] = align[alignIndex] === 'left' ? 'center' : 'right';
          }
        }
        // Done!
        else if (event[1].type === 'tableDelimiterRow') {
          break;
        }
      } else if (event[0] === 'enter' && event[1].type === 'tableDelimiterRow') {
        inDelimiterRow = true;
      }
      index += 1;
    }
    return align;
  }

  /**
   * @import {Event, Extension, Point, Resolver, State, Token, TokenizeContext, Tokenizer} from 'micromark-util-types'
   */


  /**
   * Create an HTML extension for `micromark` to support GitHub tables syntax.
   *
   * @returns {Extension}
   *   Extension for `micromark` that can be passed in `extensions` to enable GFM
   *   table syntax.
   */
  function gfmTable() {
    return {
      flow: {
        null: {
          name: 'table',
          tokenize: tokenizeTable,
          resolveAll: resolveTable
        }
      }
    };
  }

  /**
   * Tokenizer for GFM tables.
   *
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizeTable(effects, ok, nok) {
    const self = this;
    let size = 0;
    let sizeB = 0;
    /** @type {boolean | undefined} */
    let seen;
    return start;

    /**
     * Start of a GFM table.
     *
     * If there is a valid table row or table head before, then we try to parse
     * another row.
     * Otherwise, we try to parse a head.
     *
     * ```markdown
     * > | | a |
     *     ^
     *   | | - |
     * > | | b |
     *     ^
     * ```
     * @type {State}
     */
    function start(code) {
      let index = self.events.length - 1;
      while (index > -1) {
        const {
          type
        } = self.events[index][1];
        if (type === "lineEnding" ||
        // Note: markdown-rs uses `whitespace` instead of `linePrefix`
        type === "linePrefix") {
          index--;
        } else {
          break;
        }
      }
      const tail = index > -1 ? self.events[index][1].type : null;
      const next = tail === 'tableHead' || tail === 'tableRow' ? bodyRowStart : headRowBefore;

      // Don’t allow lazy body rows.
      if (next === bodyRowStart && self.parser.lazy[self.now().line]) {
        return nok(code);
      }
      return next(code);
    }

    /**
     * Before table head row.
     *
     * ```markdown
     * > | | a |
     *     ^
     *   | | - |
     *   | | b |
     * ```
     *
     * @type {State}
     */
    function headRowBefore(code) {
      effects.enter('tableHead');
      effects.enter('tableRow');
      return headRowStart(code);
    }

    /**
     * Before table head row, after whitespace.
     *
     * ```markdown
     * > | | a |
     *     ^
     *   | | - |
     *   | | b |
     * ```
     *
     * @type {State}
     */
    function headRowStart(code) {
      if (code === 124) {
        return headRowBreak(code);
      }

      // To do: micromark-js should let us parse our own whitespace in extensions,
      // like `markdown-rs`:
      //
      // ```js
      // // 4+ spaces.
      // if (markdownSpace(code)) {
      //   return nok(code)
      // }
      // ```

      seen = true;
      // Count the first character, that isn’t a pipe, double.
      sizeB += 1;
      return headRowBreak(code);
    }

    /**
     * At break in table head row.
     *
     * ```markdown
     * > | | a |
     *     ^
     *       ^
     *         ^
     *   | | - |
     *   | | b |
     * ```
     *
     * @type {State}
     */
    function headRowBreak(code) {
      if (code === null) {
        // Note: in `markdown-rs`, we need to reset, in `micromark-js` we don‘t.
        return nok(code);
      }
      if (markdownLineEnding(code)) {
        // If anything other than one pipe (ignoring whitespace) was used, it’s fine.
        if (sizeB > 1) {
          sizeB = 0;
          // To do: check if this works.
          // Feel free to interrupt:
          self.interrupt = true;
          effects.exit('tableRow');
          effects.enter("lineEnding");
          effects.consume(code);
          effects.exit("lineEnding");
          return headDelimiterStart;
        }

        // Note: in `markdown-rs`, we need to reset, in `micromark-js` we don‘t.
        return nok(code);
      }
      if (markdownSpace(code)) {
        // To do: check if this is fine.
        // effects.attempt(State::Next(StateName::GfmTableHeadRowBreak), State::Nok)
        // State::Retry(space_or_tab(tokenizer))
        return factorySpace(effects, headRowBreak, "whitespace")(code);
      }
      sizeB += 1;
      if (seen) {
        seen = false;
        // Header cell count.
        size += 1;
      }
      if (code === 124) {
        effects.enter('tableCellDivider');
        effects.consume(code);
        effects.exit('tableCellDivider');
        // Whether a delimiter was seen.
        seen = true;
        return headRowBreak;
      }

      // Anything else is cell data.
      effects.enter("data");
      return headRowData(code);
    }

    /**
     * In table head row data.
     *
     * ```markdown
     * > | | a |
     *       ^
     *   | | - |
     *   | | b |
     * ```
     *
     * @type {State}
     */
    function headRowData(code) {
      if (code === null || code === 124 || markdownLineEndingOrSpace(code)) {
        effects.exit("data");
        return headRowBreak(code);
      }
      effects.consume(code);
      return code === 92 ? headRowEscape : headRowData;
    }

    /**
     * In table head row escape.
     *
     * ```markdown
     * > | | a\-b |
     *         ^
     *   | | ---- |
     *   | | c    |
     * ```
     *
     * @type {State}
     */
    function headRowEscape(code) {
      if (code === 92 || code === 124) {
        effects.consume(code);
        return headRowData;
      }
      return headRowData(code);
    }

    /**
     * Before delimiter row.
     *
     * ```markdown
     *   | | a |
     * > | | - |
     *     ^
     *   | | b |
     * ```
     *
     * @type {State}
     */
    function headDelimiterStart(code) {
      // Reset `interrupt`.
      self.interrupt = false;

      // Note: in `markdown-rs`, we need to handle piercing here too.
      if (self.parser.lazy[self.now().line]) {
        return nok(code);
      }
      effects.enter('tableDelimiterRow');
      // Track if we’ve seen a `:` or `|`.
      seen = false;
      if (markdownSpace(code)) {
        return factorySpace(effects, headDelimiterBefore, "linePrefix", self.parser.constructs.disable.null.includes('codeIndented') ? undefined : 4)(code);
      }
      return headDelimiterBefore(code);
    }

    /**
     * Before delimiter row, after optional whitespace.
     *
     * Reused when a `|` is found later, to parse another cell.
     *
     * ```markdown
     *   | | a |
     * > | | - |
     *     ^
     *   | | b |
     * ```
     *
     * @type {State}
     */
    function headDelimiterBefore(code) {
      if (code === 45 || code === 58) {
        return headDelimiterValueBefore(code);
      }
      if (code === 124) {
        seen = true;
        // If we start with a pipe, we open a cell marker.
        effects.enter('tableCellDivider');
        effects.consume(code);
        effects.exit('tableCellDivider');
        return headDelimiterCellBefore;
      }

      // More whitespace / empty row not allowed at start.
      return headDelimiterNok(code);
    }

    /**
     * After `|`, before delimiter cell.
     *
     * ```markdown
     *   | | a |
     * > | | - |
     *      ^
     * ```
     *
     * @type {State}
     */
    function headDelimiterCellBefore(code) {
      if (markdownSpace(code)) {
        return factorySpace(effects, headDelimiterValueBefore, "whitespace")(code);
      }
      return headDelimiterValueBefore(code);
    }

    /**
     * Before delimiter cell value.
     *
     * ```markdown
     *   | | a |
     * > | | - |
     *       ^
     * ```
     *
     * @type {State}
     */
    function headDelimiterValueBefore(code) {
      // Align: left.
      if (code === 58) {
        sizeB += 1;
        seen = true;
        effects.enter('tableDelimiterMarker');
        effects.consume(code);
        effects.exit('tableDelimiterMarker');
        return headDelimiterLeftAlignmentAfter;
      }

      // Align: none.
      if (code === 45) {
        sizeB += 1;
        // To do: seems weird that this *isn’t* left aligned, but that state is used?
        return headDelimiterLeftAlignmentAfter(code);
      }
      if (code === null || markdownLineEnding(code)) {
        return headDelimiterCellAfter(code);
      }
      return headDelimiterNok(code);
    }

    /**
     * After delimiter cell left alignment marker.
     *
     * ```markdown
     *   | | a  |
     * > | | :- |
     *        ^
     * ```
     *
     * @type {State}
     */
    function headDelimiterLeftAlignmentAfter(code) {
      if (code === 45) {
        effects.enter('tableDelimiterFiller');
        return headDelimiterFiller(code);
      }

      // Anything else is not ok after the left-align colon.
      return headDelimiterNok(code);
    }

    /**
     * In delimiter cell filler.
     *
     * ```markdown
     *   | | a |
     * > | | - |
     *       ^
     * ```
     *
     * @type {State}
     */
    function headDelimiterFiller(code) {
      if (code === 45) {
        effects.consume(code);
        return headDelimiterFiller;
      }

      // Align is `center` if it was `left`, `right` otherwise.
      if (code === 58) {
        seen = true;
        effects.exit('tableDelimiterFiller');
        effects.enter('tableDelimiterMarker');
        effects.consume(code);
        effects.exit('tableDelimiterMarker');
        return headDelimiterRightAlignmentAfter;
      }
      effects.exit('tableDelimiterFiller');
      return headDelimiterRightAlignmentAfter(code);
    }

    /**
     * After delimiter cell right alignment marker.
     *
     * ```markdown
     *   | |  a |
     * > | | -: |
     *         ^
     * ```
     *
     * @type {State}
     */
    function headDelimiterRightAlignmentAfter(code) {
      if (markdownSpace(code)) {
        return factorySpace(effects, headDelimiterCellAfter, "whitespace")(code);
      }
      return headDelimiterCellAfter(code);
    }

    /**
     * After delimiter cell.
     *
     * ```markdown
     *   | |  a |
     * > | | -: |
     *          ^
     * ```
     *
     * @type {State}
     */
    function headDelimiterCellAfter(code) {
      if (code === 124) {
        return headDelimiterBefore(code);
      }
      if (code === null || markdownLineEnding(code)) {
        // Exit when:
        // * there was no `:` or `|` at all (it’s a thematic break or setext
        //   underline instead)
        // * the header cell count is not the delimiter cell count
        if (!seen || size !== sizeB) {
          return headDelimiterNok(code);
        }

        // Note: in markdown-rs`, a reset is needed here.
        effects.exit('tableDelimiterRow');
        effects.exit('tableHead');
        // To do: in `markdown-rs`, resolvers need to be registered manually.
        // effects.register_resolver(ResolveName::GfmTable)
        return ok(code);
      }
      return headDelimiterNok(code);
    }

    /**
     * In delimiter row, at a disallowed byte.
     *
     * ```markdown
     *   | | a |
     * > | | x |
     *       ^
     * ```
     *
     * @type {State}
     */
    function headDelimiterNok(code) {
      // Note: in `markdown-rs`, we need to reset, in `micromark-js` we don‘t.
      return nok(code);
    }

    /**
     * Before table body row.
     *
     * ```markdown
     *   | | a |
     *   | | - |
     * > | | b |
     *     ^
     * ```
     *
     * @type {State}
     */
    function bodyRowStart(code) {
      // Note: in `markdown-rs` we need to manually take care of a prefix,
      // but in `micromark-js` that is done for us, so if we’re here, we’re
      // never at whitespace.
      effects.enter('tableRow');
      return bodyRowBreak(code);
    }

    /**
     * At break in table body row.
     *
     * ```markdown
     *   | | a |
     *   | | - |
     * > | | b |
     *     ^
     *       ^
     *         ^
     * ```
     *
     * @type {State}
     */
    function bodyRowBreak(code) {
      if (code === 124) {
        effects.enter('tableCellDivider');
        effects.consume(code);
        effects.exit('tableCellDivider');
        return bodyRowBreak;
      }
      if (code === null || markdownLineEnding(code)) {
        effects.exit('tableRow');
        return ok(code);
      }
      if (markdownSpace(code)) {
        return factorySpace(effects, bodyRowBreak, "whitespace")(code);
      }

      // Anything else is cell content.
      effects.enter("data");
      return bodyRowData(code);
    }

    /**
     * In table body row data.
     *
     * ```markdown
     *   | | a |
     *   | | - |
     * > | | b |
     *       ^
     * ```
     *
     * @type {State}
     */
    function bodyRowData(code) {
      if (code === null || code === 124 || markdownLineEndingOrSpace(code)) {
        effects.exit("data");
        return bodyRowBreak(code);
      }
      effects.consume(code);
      return code === 92 ? bodyRowEscape : bodyRowData;
    }

    /**
     * In table body row escape.
     *
     * ```markdown
     *   | | a    |
     *   | | ---- |
     * > | | b\-c |
     *         ^
     * ```
     *
     * @type {State}
     */
    function bodyRowEscape(code) {
      if (code === 92 || code === 124) {
        effects.consume(code);
        return bodyRowData;
      }
      return bodyRowData(code);
    }
  }

  /** @type {Resolver} */

  function resolveTable(events, context) {
    let index = -1;
    let inFirstCellAwaitingPipe = true;
    /** @type {RowKind} */
    let rowKind = 0;
    /** @type {Range} */
    let lastCell = [0, 0, 0, 0];
    /** @type {Range} */
    let cell = [0, 0, 0, 0];
    let afterHeadAwaitingFirstBodyRow = false;
    let lastTableEnd = 0;
    /** @type {Token | undefined} */
    let currentTable;
    /** @type {Token | undefined} */
    let currentBody;
    /** @type {Token | undefined} */
    let currentCell;
    const map = new EditMap();
    while (++index < events.length) {
      const event = events[index];
      const token = event[1];
      if (event[0] === 'enter') {
        // Start of head.
        if (token.type === 'tableHead') {
          afterHeadAwaitingFirstBodyRow = false;

          // Inject previous (body end and) table end.
          if (lastTableEnd !== 0) {
            flushTableEnd(map, context, lastTableEnd, currentTable, currentBody);
            currentBody = undefined;
            lastTableEnd = 0;
          }

          // Inject table start.
          currentTable = {
            type: 'table',
            start: Object.assign({}, token.start),
            // Note: correct end is set later.
            end: Object.assign({}, token.end)
          };
          map.add(index, 0, [['enter', currentTable, context]]);
        } else if (token.type === 'tableRow' || token.type === 'tableDelimiterRow') {
          inFirstCellAwaitingPipe = true;
          currentCell = undefined;
          lastCell = [0, 0, 0, 0];
          cell = [0, index + 1, 0, 0];

          // Inject table body start.
          if (afterHeadAwaitingFirstBodyRow) {
            afterHeadAwaitingFirstBodyRow = false;
            currentBody = {
              type: 'tableBody',
              start: Object.assign({}, token.start),
              // Note: correct end is set later.
              end: Object.assign({}, token.end)
            };
            map.add(index, 0, [['enter', currentBody, context]]);
          }
          rowKind = token.type === 'tableDelimiterRow' ? 2 : currentBody ? 3 : 1;
        }
        // Cell data.
        else if (rowKind && (token.type === "data" || token.type === 'tableDelimiterMarker' || token.type === 'tableDelimiterFiller')) {
          inFirstCellAwaitingPipe = false;

          // First value in cell.
          if (cell[2] === 0) {
            if (lastCell[1] !== 0) {
              cell[0] = cell[1];
              currentCell = flushCell(map, context, lastCell, rowKind, undefined, currentCell);
              lastCell = [0, 0, 0, 0];
            }
            cell[2] = index;
          }
        } else if (token.type === 'tableCellDivider') {
          if (inFirstCellAwaitingPipe) {
            inFirstCellAwaitingPipe = false;
          } else {
            if (lastCell[1] !== 0) {
              cell[0] = cell[1];
              currentCell = flushCell(map, context, lastCell, rowKind, undefined, currentCell);
            }
            lastCell = cell;
            cell = [lastCell[1], index, 0, 0];
          }
        }
      }
      // Exit events.
      else if (token.type === 'tableHead') {
        afterHeadAwaitingFirstBodyRow = true;
        lastTableEnd = index;
      } else if (token.type === 'tableRow' || token.type === 'tableDelimiterRow') {
        lastTableEnd = index;
        if (lastCell[1] !== 0) {
          cell[0] = cell[1];
          currentCell = flushCell(map, context, lastCell, rowKind, index, currentCell);
        } else if (cell[1] !== 0) {
          currentCell = flushCell(map, context, cell, rowKind, index, currentCell);
        }
        rowKind = 0;
      } else if (rowKind && (token.type === "data" || token.type === 'tableDelimiterMarker' || token.type === 'tableDelimiterFiller')) {
        cell[3] = index;
      }
    }
    if (lastTableEnd !== 0) {
      flushTableEnd(map, context, lastTableEnd, currentTable, currentBody);
    }
    map.consume(context.events);

    // To do: move this into `html`, when events are exposed there.
    // That’s what `markdown-rs` does.
    // That needs updates to `mdast-util-gfm-table`.
    index = -1;
    while (++index < context.events.length) {
      const event = context.events[index];
      if (event[0] === 'enter' && event[1].type === 'table') {
        event[1]._align = gfmTableAlign(context.events, index);
      }
    }
    return events;
  }

  /**
   * Generate a cell.
   *
   * @param {EditMap} map
   *   Edit map to apply to.
   * @param {Readonly<TokenizeContext>} context
   *   Tokenize context.
   * @param {Readonly<Range>} range
   *   Range of the cell within events.
   * @param {RowKind} rowKind
   *   Type of row.
   * @param {number | undefined} rowEnd
   *   Index of the end of the row, if known.
   * @param {Token | undefined} previousCell
   *   Previous cell token, if any.
   * @returns {Token | undefined}
   *   Current cell token after flushing, if any.
   */
  // eslint-disable-next-line max-params
  function flushCell(map, context, range, rowKind, rowEnd, previousCell) {
    // `markdown-rs` uses:
    // rowKind === 2 ? 'tableDelimiterCell' : 'tableCell'
    const groupName = rowKind === 1 ? 'tableHeader' : rowKind === 2 ? 'tableDelimiter' : 'tableData';
    // `markdown-rs` uses:
    // rowKind === 2 ? 'tableDelimiterCellValue' : 'tableCellText'
    const valueName = 'tableContent';

    // Insert an exit for the previous cell, if there is one.
    //
    // ```markdown
    // > | | aa | bb | cc |
    //          ^-- exit
    //           ^^^^-- this cell
    // ```
    if (range[0] !== 0) {
      previousCell.end = Object.assign({}, getPoint(context.events, range[0]));
      map.add(range[0], 0, [['exit', previousCell, context]]);
    }

    // Insert enter of this cell.
    //
    // ```markdown
    // > | | aa | bb | cc |
    //           ^-- enter
    //           ^^^^-- this cell
    // ```
    const now = getPoint(context.events, range[1]);
    previousCell = {
      type: groupName,
      start: Object.assign({}, now),
      // Note: correct end is set later.
      end: Object.assign({}, now)
    };
    map.add(range[1], 0, [['enter', previousCell, context]]);

    // Insert text start at first data start and end at last data end, and
    // remove events between.
    //
    // ```markdown
    // > | | aa | bb | cc |
    //            ^-- enter
    //             ^-- exit
    //           ^^^^-- this cell
    // ```
    if (range[2] !== 0) {
      const relatedStart = getPoint(context.events, range[2]);
      const relatedEnd = getPoint(context.events, range[3]);
      /** @type {Token} */
      const valueToken = {
        type: valueName,
        start: Object.assign({}, relatedStart),
        end: Object.assign({}, relatedEnd)
      };
      map.add(range[2], 0, [['enter', valueToken, context]]);
      if (rowKind !== 2) {
        // Fix positional info on remaining events
        const start = context.events[range[2]];
        const end = context.events[range[3]];
        start[1].end = Object.assign({}, end[1].end);
        start[1].type = "chunkText";
        start[1].contentType = "text";

        // Remove if needed.
        if (range[3] > range[2] + 1) {
          const a = range[2] + 1;
          const b = range[3] - range[2] - 1;
          map.add(a, b, []);
        }
      }
      map.add(range[3] + 1, 0, [['exit', valueToken, context]]);
    }

    // Insert an exit for the last cell, if at the row end.
    //
    // ```markdown
    // > | | aa | bb | cc |
    //                    ^-- exit
    //               ^^^^^^-- this cell (the last one contains two “between” parts)
    // ```
    if (rowEnd !== undefined) {
      previousCell.end = Object.assign({}, getPoint(context.events, rowEnd));
      map.add(rowEnd, 0, [['exit', previousCell, context]]);
      previousCell = undefined;
    }
    return previousCell;
  }

  /**
   * Generate table end (and table body end).
   *
   * @param {Readonly<EditMap>} map
   *   Edit map to apply to.
   * @param {Readonly<TokenizeContext>} context
   *   Tokenize context.
   * @param {number} index
   *   Index within the events where the table end should be inserted.
   * @param {Token} table
   *   Table token.
   * @param {Token | undefined} tableBody
   *   Table body token, if any.
   * @returns {undefined}
   *   Nothing.
   */
  // eslint-disable-next-line max-params
  function flushTableEnd(map, context, index, table, tableBody) {
    /** @type {Array<Event>} */
    const exits = [];
    const related = getPoint(context.events, index);
    if (tableBody) {
      tableBody.end = Object.assign({}, related);
      exits.push(['exit', tableBody, context]);
    }
    table.end = Object.assign({}, related);
    exits.push(['exit', table, context]);
    map.add(index + 1, 0, exits);
  }

  /**
   * Get the point (start or end) for a given event in the list of events.
   *
   * @param {Readonly<Array<Event>>} events
   *   List of events.
   * @param {number} index
   *   Index of the event to get the point for.
   * @returns {Readonly<Point>}
   *   Start point for enter and end point for exit.
   */
  function getPoint(events, index) {
    const event = events[index];
    const side = event[0] === 'enter' ? 'start' : 'end';
    return event[1][side];
  }

  /**
   * @import {Extension, State, TokenizeContext, Tokenizer} from 'micromark-util-types'
   */

  const tasklistCheck = {
    name: 'tasklistCheck',
    tokenize: tokenizeTasklistCheck
  };

  /**
   * Create an HTML extension for `micromark` to support GFM task list items
   * syntax.
   *
   * @returns {Extension}
   *   Extension for `micromark` that can be passed in `htmlExtensions` to
   *   support GFM task list items when serializing to HTML.
   */
  function gfmTaskListItem() {
    return {
      text: {
        [91]: tasklistCheck
      }
    };
  }

  /**
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizeTasklistCheck(effects, ok, nok) {
    const self = this;
    return open;

    /**
     * At start of task list item check.
     *
     * ```markdown
     * > | * [x] y.
     *       ^
     * ```
     *
     * @type {State}
     */
    function open(code) {
      if (
      // Exit if there’s stuff before.
      self.previous !== null ||
      // Exit if not in the first content that is the first child of a list
      // item.
      !self._gfmTasklistFirstContentOfListItem) {
        return nok(code);
      }
      effects.enter('taskListCheck');
      effects.enter('taskListCheckMarker');
      effects.consume(code);
      effects.exit('taskListCheckMarker');
      return inside;
    }

    /**
     * In task list item check.
     *
     * ```markdown
     * > | * [x] y.
     *        ^
     * ```
     *
     * @type {State}
     */
    function inside(code) {
      // Currently we match how GH works in files.
      // To match how GH works in comments, use `markdownSpace` (`[\t ]`) instead
      // of `markdownLineEndingOrSpace` (`[\t\n\r ]`).
      if (markdownLineEndingOrSpace(code)) {
        effects.enter('taskListCheckValueUnchecked');
        effects.consume(code);
        effects.exit('taskListCheckValueUnchecked');
        return close;
      }
      if (code === 88 || code === 120) {
        effects.enter('taskListCheckValueChecked');
        effects.consume(code);
        effects.exit('taskListCheckValueChecked');
        return close;
      }
      return nok(code);
    }

    /**
     * At close of task list item check.
     *
     * ```markdown
     * > | * [x] y.
     *         ^
     * ```
     *
     * @type {State}
     */
    function close(code) {
      if (code === 93) {
        effects.enter('taskListCheckMarker');
        effects.consume(code);
        effects.exit('taskListCheckMarker');
        effects.exit('taskListCheck');
        return after;
      }
      return nok(code);
    }

    /**
     * @type {State}
     */
    function after(code) {
      // EOL in paragraph means there must be something else after it.
      if (markdownLineEnding(code)) {
        return ok(code);
      }

      // Space or tab?
      // Check what comes after.
      if (markdownSpace(code)) {
        return effects.check({
          tokenize: spaceThenNonSpace
        }, ok, nok)(code);
      }

      // EOF, or non-whitespace, both wrong.
      return nok(code);
    }
  }

  /**
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function spaceThenNonSpace(effects, ok, nok) {
    return factorySpace(effects, after, "whitespace");

    /**
     * After whitespace, after task list item check.
     *
     * ```markdown
     * > | * [x] y.
     *           ^
     * ```
     *
     * @type {State}
     */
    function after(code) {
      // EOF means there was nothing, so bad.
      // EOL means there’s content after it, so good.
      // Impossible to have more spaces.
      // Anything else is good.
      return code === null ? nok(code) : ok(code);
    }
  }

  /**
   * @typedef {import('micromark-extension-gfm-footnote').HtmlOptions} HtmlOptions
   * @typedef {import('micromark-extension-gfm-strikethrough').Options} Options
   * @typedef {import('micromark-util-types').Extension} Extension
   * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
   */


  /**
   * Create an extension for `micromark` to enable GFM syntax.
   *
   * @param {Options | null | undefined} [options]
   *   Configuration (optional).
   *
   *   Passed to `micromark-extens-gfm-strikethrough`.
   * @returns {Extension}
   *   Extension for `micromark` that can be passed in `extensions` to enable GFM
   *   syntax.
   */
  function gfm(options) {
    return combineExtensions([
      gfmAutolinkLiteral(),
      gfmFootnote(),
      gfmStrikethrough(),
      gfmTable(),
      gfmTaskListItem()
    ])
  }

  /**
   * Count how often a character (or substring) is used in a string.
   *
   * @param {string} value
   *   Value to search in.
   * @param {string} character
   *   Character (or substring) to look for.
   * @return {number}
   *   Number of times `character` occurred in `value`.
   */
  function ccount(value, character) {
    const source = String(value);

    if (typeof character !== 'string') {
      throw new TypeError('Expected character')
    }

    let count = 0;
    let index = source.indexOf(character);

    while (index !== -1) {
      count++;
      index = source.indexOf(character, index + character.length);
    }

    return count
  }

  function ok() {}

  function escapeStringRegexp(string) {
  	if (typeof string !== 'string') {
  		throw new TypeError('Expected a string');
  	}

  	// Escape characters with special meaning either inside or outside character sets.
  	// Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
  	return string
  		.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
  		.replace(/-/g, '\\x2d');
  }

  /**
   * @import {Nodes, Parents, PhrasingContent, Root, Text} from 'mdast'
   * @import {BuildVisitor, Test, VisitorResult} from 'unist-util-visit-parents'
   */


  /**
   * Find patterns in a tree and replace them.
   *
   * The algorithm searches the tree in *preorder* for complete values in `Text`
   * nodes.
   * Partial matches are not supported.
   *
   * @param {Nodes} tree
   *   Tree to change.
   * @param {FindAndReplaceList | FindAndReplaceTuple} list
   *   Patterns to find.
   * @param {Options | null | undefined} [options]
   *   Configuration (when `find` is not `Find`).
   * @returns {undefined}
   *   Nothing.
   */
  function findAndReplace(tree, list, options) {
    const settings = options || {};
    const ignored = convert(settings.ignore || []);
    const pairs = toPairs(list);
    let pairIndex = -1;

    while (++pairIndex < pairs.length) {
      visitParents(tree, 'text', visitor);
    }

    /**
     * Visit a text node, and handle it if it is not in an ignored parent.
     *
     * @type {BuildVisitor<Root, 'text'>}
     */
    function visitor(node, parents) {
      let index = -1;
      /** @type {Parents | undefined} */
      let grandparent;

      while (++index < parents.length) {
        const parent = parents[index];
        /** @type {Array<Nodes> | undefined} */
        const siblings = grandparent ? grandparent.children : undefined;

        if (
          ignored(
            parent,
            siblings ? siblings.indexOf(parent) : undefined,
            grandparent
          )
        ) {
          return
        }

        grandparent = parent;
      }

      if (grandparent) {
        return handler(node, parents)
      }
    }

    /**
     * Handle a text node which is not in an ignored parent.
     *
     * @param {Text} node
     *   Text node to search in.
     * @param {Array<Parents>} parents
     *   Ancestors of `node`.
     * @returns {VisitorResult}
     *   Where to continue visiting.
     */
    function handler(node, parents) {
      const parent = parents[parents.length - 1];
      const find = pairs[pairIndex][0];
      const replace = pairs[pairIndex][1];
      let start = 0;
      /** @type {Array<Nodes>} */
      const siblings = parent.children;
      const index = siblings.indexOf(node);
      let change = false;
      /** @type {Array<PhrasingContent>} */
      let nodes = [];

      find.lastIndex = 0;

      let match = find.exec(node.value);

      while (match) {
        const position = match.index;
        /** @type {RegExpMatchObject} */
        const matchObject = {
          index: match.index,
          input: match.input,
          stack: [...parents, node]
        };
        let value = replace(...match, matchObject);

        if (typeof value === 'string') {
          value = value.length > 0 ? {type: 'text', value} : undefined;
        }

        // It wasn’t a match after all.
        if (value === false) {
          // False acts as if there was no match.
          // So we need to reset `lastIndex`, which currently being at the end of
          // the current match, to the beginning.
          find.lastIndex = position + 1;
        } else {
          if (start !== position) {
            add({type: 'text', value: node.value.slice(start, position)});
          }

          if (Array.isArray(value)) {
            for (const child of value) add(child);
          } else if (value) {
            add(value);
          }

          start = position + match[0].length;
          change = true;
        }

        if (!find.global) {
          break
        }

        match = find.exec(node.value);
      }

      if (change) {
        if (start < node.value.length) {
          add({type: 'text', value: node.value.slice(start)});
        }

        parent.children.splice(index, 1, ...nodes);
      } else {
        nodes = [node];
      }

      return index + nodes.length

      /**
       * Add a node.
       *
       * @param {PhrasingContent} child
       *   Node to add.
       * @returns {undefined}
       *   Nothing.
       */
      function add(child) {
        const previous = nodes[nodes.length - 1];

        if (previous && previous.type === 'text' && child.type === 'text') {
          previous.value += child.value;
        } else {
          nodes.push(child);
        }
      }
    }
  }

  /**
   * Turn a tuple or a list of tuples into pairs.
   *
   * @param {FindAndReplaceList | FindAndReplaceTuple} tupleOrList
   *   Schema.
   * @returns {Pairs}
   *   Clean pairs.
   */
  function toPairs(tupleOrList) {
    if (!Array.isArray(tupleOrList)) {
      throw new TypeError('Expected find and replace tuple or list of tuples')
    }

    /** @type {Pairs} */
    const result = [];

    /** @type {FindAndReplaceList} */
    // @ts-expect-error: correct.
    const list =
      !tupleOrList[0] || Array.isArray(tupleOrList[0])
        ? tupleOrList
        : [tupleOrList];

    let index = -1;

    while (++index < list.length) {
      const tuple = list[index];
      result.push([toExpression(tuple[0]), toFunction(tuple[1])]);
    }

    return result
  }

  /**
   * Turn a find into an expression.
   *
   * @param {Find} find
   *   Pattern to find.
   * @returns {RegExp}
   *   Global expression.
   */
  function toExpression(find) {
    return typeof find === 'string' ? new RegExp(escapeStringRegexp(find), 'g') : find
  }

  /**
   * Turn a replace into a function.
   *
   * @param {Replace} replace
   *   Thing to replace with.
   * @returns {ReplaceFunction}
   *   Function that returns that thing.
   */
  function toFunction(replace) {
    return typeof replace === 'function'
      ? replace
      : function () {
          return replace
        }
  }

  /**
   * @import {RegExpMatchObject, ReplaceFunction} from 'mdast-util-find-and-replace'
   * @import {CompileContext, Extension as FromMarkdownExtension, Handle as FromMarkdownHandle, Transform as FromMarkdownTransform} from 'mdast-util-from-markdown'
   * @import {ConstructName, Options as ToMarkdownExtension} from 'mdast-util-to-markdown'
   * @import {Link, PhrasingContent} from 'mdast'
   */


  /** @type {ConstructName} */
  const inConstruct = 'phrasing';
  /** @type {Array<ConstructName>} */
  const notInConstruct = ['autolink', 'link', 'image', 'label'];

  /**
   * Create an extension for `mdast-util-from-markdown` to enable GFM autolink
   * literals in markdown.
   *
   * @returns {FromMarkdownExtension}
   *   Extension for `mdast-util-to-markdown` to enable GFM autolink literals.
   */
  function gfmAutolinkLiteralFromMarkdown() {
    return {
      transforms: [transformGfmAutolinkLiterals],
      enter: {
        literalAutolink: enterLiteralAutolink,
        literalAutolinkEmail: enterLiteralAutolinkValue,
        literalAutolinkHttp: enterLiteralAutolinkValue,
        literalAutolinkWww: enterLiteralAutolinkValue
      },
      exit: {
        literalAutolink: exitLiteralAutolink,
        literalAutolinkEmail: exitLiteralAutolinkEmail,
        literalAutolinkHttp: exitLiteralAutolinkHttp,
        literalAutolinkWww: exitLiteralAutolinkWww
      }
    }
  }

  /**
   * Create an extension for `mdast-util-to-markdown` to enable GFM autolink
   * literals in markdown.
   *
   * @returns {ToMarkdownExtension}
   *   Extension for `mdast-util-to-markdown` to enable GFM autolink literals.
   */
  function gfmAutolinkLiteralToMarkdown() {
    return {
      unsafe: [
        {
          character: '@',
          before: '[+\\-.\\w]',
          after: '[\\-.\\w]',
          inConstruct,
          notInConstruct
        },
        {
          character: '.',
          before: '[Ww]',
          after: '[\\-.\\w]',
          inConstruct,
          notInConstruct
        },
        {
          character: ':',
          before: '[ps]',
          after: '\\/',
          inConstruct,
          notInConstruct
        }
      ]
    }
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function enterLiteralAutolink(token) {
    this.enter({type: 'link', title: null, url: '', children: []}, token);
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function enterLiteralAutolinkValue(token) {
    this.config.enter.autolinkProtocol.call(this, token);
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitLiteralAutolinkHttp(token) {
    this.config.exit.autolinkProtocol.call(this, token);
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitLiteralAutolinkWww(token) {
    this.config.exit.data.call(this, token);
    const node = this.stack[this.stack.length - 1];
    ok(node.type === 'link');
    node.url = 'http://' + this.sliceSerialize(token);
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitLiteralAutolinkEmail(token) {
    this.config.exit.autolinkEmail.call(this, token);
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitLiteralAutolink(token) {
    this.exit(token);
  }

  /** @type {FromMarkdownTransform} */
  function transformGfmAutolinkLiterals(tree) {
    findAndReplace(
      tree,
      [
        [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, findUrl],
        [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, findEmail]
      ],
      {ignore: ['link', 'linkReference']}
    );
  }

  /**
   * @type {ReplaceFunction}
   * @param {string} _
   * @param {string} protocol
   * @param {string} domain
   * @param {string} path
   * @param {RegExpMatchObject} match
   * @returns {Array<PhrasingContent> | Link | false}
   */
  // eslint-disable-next-line max-params
  function findUrl(_, protocol, domain, path, match) {
    let prefix = '';

    // Not an expected previous character.
    if (!previous(match)) {
      return false
    }

    // Treat `www` as part of the domain.
    if (/^w/i.test(protocol)) {
      domain = protocol + domain;
      protocol = '';
      prefix = 'http://';
    }

    if (!isCorrectDomain(domain)) {
      return false
    }

    const parts = splitUrl(domain + path);

    if (!parts[0]) return false

    /** @type {Link} */
    const result = {
      type: 'link',
      title: null,
      url: prefix + protocol + parts[0],
      children: [{type: 'text', value: protocol + parts[0]}]
    };

    if (parts[1]) {
      return [result, {type: 'text', value: parts[1]}]
    }

    return result
  }

  /**
   * @type {ReplaceFunction}
   * @param {string} _
   * @param {string} atext
   * @param {string} label
   * @param {RegExpMatchObject} match
   * @returns {Link | false}
   */
  function findEmail(_, atext, label, match) {
    if (
      // Not an expected previous character.
      !previous(match, true) ||
      // Label ends in not allowed character.
      /[-\d_]$/.test(label)
    ) {
      return false
    }

    return {
      type: 'link',
      title: null,
      url: 'mailto:' + atext + '@' + label,
      children: [{type: 'text', value: atext + '@' + label}]
    }
  }

  /**
   * @param {string} domain
   * @returns {boolean}
   */
  function isCorrectDomain(domain) {
    const parts = domain.split('.');

    if (
      parts.length < 2 ||
      (parts[parts.length - 1] &&
        (/_/.test(parts[parts.length - 1]) ||
          !/[a-zA-Z\d]/.test(parts[parts.length - 1]))) ||
      (parts[parts.length - 2] &&
        (/_/.test(parts[parts.length - 2]) ||
          !/[a-zA-Z\d]/.test(parts[parts.length - 2])))
    ) {
      return false
    }

    return true
  }

  /**
   * @param {string} url
   * @returns {[string, string | undefined]}
   */
  function splitUrl(url) {
    const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url);

    if (!trailExec) {
      return [url, undefined]
    }

    url = url.slice(0, trailExec.index);

    let trail = trailExec[0];
    let closingParenIndex = trail.indexOf(')');
    const openingParens = ccount(url, '(');
    let closingParens = ccount(url, ')');

    while (closingParenIndex !== -1 && openingParens > closingParens) {
      url += trail.slice(0, closingParenIndex + 1);
      trail = trail.slice(closingParenIndex + 1);
      closingParenIndex = trail.indexOf(')');
      closingParens++;
    }

    return [url, trail]
  }

  /**
   * @param {RegExpMatchObject} match
   * @param {boolean | null | undefined} [email=false]
   * @returns {boolean}
   */
  function previous(match, email) {
    const code = match.input.charCodeAt(match.index - 1);

    return (
      (match.index === 0 ||
        unicodeWhitespace(code) ||
        unicodePunctuation(code)) &&
      // If it’s an email, the previous character should not be a slash.
      (!email || code !== 47)
    )
  }

  /**
   * @import {
   *   CompileContext,
   *   Extension as FromMarkdownExtension,
   *   Handle as FromMarkdownHandle
   * } from 'mdast-util-from-markdown'
   * @import {ToMarkdownOptions} from 'mdast-util-gfm-footnote'
   * @import {
   *   Handle as ToMarkdownHandle,
   *   Map,
   *   Options as ToMarkdownExtension
   * } from 'mdast-util-to-markdown'
   * @import {FootnoteDefinition, FootnoteReference} from 'mdast'
   */


  footnoteReference.peek = footnoteReferencePeek;

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function enterFootnoteCallString() {
    this.buffer();
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function enterFootnoteCall(token) {
    this.enter({type: 'footnoteReference', identifier: '', label: ''}, token);
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function enterFootnoteDefinitionLabelString() {
    this.buffer();
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function enterFootnoteDefinition(token) {
    this.enter(
      {type: 'footnoteDefinition', identifier: '', label: '', children: []},
      token
    );
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitFootnoteCallString(token) {
    const label = this.resume();
    const node = this.stack[this.stack.length - 1];
    ok(node.type === 'footnoteReference');
    node.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
    node.label = label;
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitFootnoteCall(token) {
    this.exit(token);
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitFootnoteDefinitionLabelString(token) {
    const label = this.resume();
    const node = this.stack[this.stack.length - 1];
    ok(node.type === 'footnoteDefinition');
    node.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
    node.label = label;
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitFootnoteDefinition(token) {
    this.exit(token);
  }

  /** @type {ToMarkdownHandle} */
  function footnoteReferencePeek() {
    return '['
  }

  /**
   * @type {ToMarkdownHandle}
   * @param {FootnoteReference} node
   */
  function footnoteReference(node, _, state, info) {
    const tracker = state.createTracker(info);
    let value = tracker.move('[^');
    const exit = state.enter('footnoteReference');
    const subexit = state.enter('reference');
    value += tracker.move(
      state.safe(state.associationId(node), {after: ']', before: value})
    );
    subexit();
    exit();
    value += tracker.move(']');
    return value
  }

  /**
   * Create an extension for `mdast-util-from-markdown` to enable GFM footnotes
   * in markdown.
   *
   * @returns {FromMarkdownExtension}
   *   Extension for `mdast-util-from-markdown`.
   */
  function gfmFootnoteFromMarkdown() {
    return {
      enter: {
        gfmFootnoteCallString: enterFootnoteCallString,
        gfmFootnoteCall: enterFootnoteCall,
        gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
        gfmFootnoteDefinition: enterFootnoteDefinition
      },
      exit: {
        gfmFootnoteCallString: exitFootnoteCallString,
        gfmFootnoteCall: exitFootnoteCall,
        gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
        gfmFootnoteDefinition: exitFootnoteDefinition
      }
    }
  }

  /**
   * Create an extension for `mdast-util-to-markdown` to enable GFM footnotes
   * in markdown.
   *
   * @param {ToMarkdownOptions | null | undefined} [options]
   *   Configuration (optional).
   * @returns {ToMarkdownExtension}
   *   Extension for `mdast-util-to-markdown`.
   */
  function gfmFootnoteToMarkdown(options) {

    return {
      handlers: {footnoteDefinition, footnoteReference},
      // This is on by default already.
      unsafe: [{character: '[', inConstruct: ['label', 'phrasing', 'reference']}]
    }

    /**
     * @type {ToMarkdownHandle}
     * @param {FootnoteDefinition} node
     */
    function footnoteDefinition(node, _, state, info) {
      const tracker = state.createTracker(info);
      let value = tracker.move('[^');
      const exit = state.enter('footnoteDefinition');
      const subexit = state.enter('label');
      value += tracker.move(
        state.safe(state.associationId(node), {before: value, after: ']'})
      );
      subexit();

      value += tracker.move(']:');

      if (node.children && node.children.length > 0) {
        tracker.shift(4);

        value += tracker.move(
          (' ') +
            state.indentLines(
              state.containerFlow(node, tracker.current()),
              mapExceptFirst
            )
        );
      }

      exit();

      return value
    }
  }

  /** @type {Map} */
  function mapExceptFirst(line, index, blank) {
    return index === 0 ? line : mapAll(line, index, blank)
  }

  /** @type {Map} */
  function mapAll(line, index, blank) {
    return (blank ? '' : '    ') + line
  }

  /**
   * @import {Delete} from 'mdast'
   * @import {
   *   CompileContext,
   *   Extension as FromMarkdownExtension,
   *   Handle as FromMarkdownHandle
   * } from 'mdast-util-from-markdown'
   * @import {
   *   Attention,
   *   ConstructName,
   *   Handle as ToMarkdownHandle,
   *   Options as ToMarkdownExtension
   * } from 'mdast-util-to-markdown'
   */

  /**
   * List of constructs that occur in phrasing (paragraphs, headings), but cannot
   * contain strikethrough.
   * So they sort of cancel each other out.
   * Note: could use a better name.
   *
   * Note: keep in sync with: <https://github.com/syntax-tree/mdast-util-to-markdown/blob/8ce8dbf/lib/unsafe.js#L14>
   *
   * @type {Array<ConstructName>}
   */
  const constructsWithoutStrikethrough = [
    'autolink',
    'destinationLiteral',
    'destinationRaw',
    'reference',
    'titleQuote',
    'titleApostrophe'
  ];

  handleDelete.attention = attentionDelete;
  handleDelete.peek = peekDelete;

  /**
   * Create an extension for `mdast-util-from-markdown` to enable GFM
   * strikethrough in markdown.
   *
   * @returns {FromMarkdownExtension}
   *   Extension for `mdast-util-from-markdown` to enable GFM strikethrough.
   */
  function gfmStrikethroughFromMarkdown() {
    return {
      canContainEols: ['delete'],
      enter: {strikethrough: enterStrikethrough},
      exit: {strikethrough: exitStrikethrough}
    }
  }

  /**
   * Create an extension for `mdast-util-to-markdown` to enable GFM
   * strikethrough in markdown.
   *
   * @returns {ToMarkdownExtension}
   *   Extension for `mdast-util-to-markdown` to enable GFM strikethrough.
   */
  function gfmStrikethroughToMarkdown() {
    return {
      handlers: {delete: handleDelete},
      unsafe: [
        {
          character: '~',
          inConstruct: 'phrasing',
          notInConstruct: constructsWithoutStrikethrough
        }
      ]
    }
  }

  /**
   * Enter strikethrough.
   *
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function enterStrikethrough(token) {
    this.enter({type: 'delete', children: [], position: undefined}, token);
  }

  /**
   * Exit strikethrough.
   *
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitStrikethrough(token) {
    this.exit(token);
  }

  /**
   * Serialize a delete node.
   *
   * @type {ToMarkdownHandle}
   * @param {Delete} node
   *   Node to serialize.
   */
  function handleDelete(node, _, state, info) {
    // To do: next major: empty this function, like emphasis and strong handlers,
    // this is no longer needed.
    const tracker = state.createTracker(info);
    const sequence = state.stack.includes('strikethrough') ? '~' : '~~';
    const exit = state.enter('strikethrough');
    let value = tracker.move(sequence);
    value += state.containerPhrasing(node, {
      ...tracker.current(),
      before: value,
      after: '~'
    });
    value += tracker.move(sequence);
    exit();
    return value
  }

  /**
   * Serialize a delete node as attention.
   *
   * @type {Attention}
   */
  function attentionDelete() {
    return {construct: 'strikethrough', markers: ['~'], sizes: [2, 1]}
  }

  /**
   * Peek the first character of a delete node.
   *
   * @type {ToMarkdownHandle}
   */
  function peekDelete() {
    return '~'
  }

  // To do: next major: remove.
  /**
   * @typedef {Options} MarkdownTableOptions
   *   Configuration.
   */

  /**
   * @typedef Options
   *   Configuration.
   * @property {boolean | null | undefined} [alignDelimiters=true]
   *   Whether to align the delimiters (default: `true`);
   *   they are aligned by default:
   *
   *   ```markdown
   *   | Alpha | B     |
   *   | ----- | ----- |
   *   | C     | Delta |
   *   ```
   *
   *   Pass `false` to make them staggered:
   *
   *   ```markdown
   *   | Alpha | B |
   *   | - | - |
   *   | C | Delta |
   *   ```
   * @property {ReadonlyArray<string | null | undefined> | string | null | undefined} [align]
   *   How to align columns (default: `''`);
   *   one style for all columns or styles for their respective columns;
   *   each style is either `'l'` (left), `'r'` (right), or `'c'` (center);
   *   other values are treated as `''`, which doesn’t place the colon in the
   *   alignment row but does align left;
   *   *only the lowercased first character is used, so `Right` is fine.*
   * @property {boolean | null | undefined} [delimiterEnd=true]
   *   Whether to end each row with the delimiter (default: `true`).
   *
   *   > 👉 **Note**: please don’t use this: it could create fragile structures
   *   > that aren’t understandable to some markdown parsers.
   *
   *   When `true`, there are ending delimiters:
   *
   *   ```markdown
   *   | Alpha | B     |
   *   | ----- | ----- |
   *   | C     | Delta |
   *   ```
   *
   *   When `false`, there are no ending delimiters:
   *
   *   ```markdown
   *   | Alpha | B
   *   | ----- | -----
   *   | C     | Delta
   *   ```
   * @property {boolean | null | undefined} [delimiterStart=true]
   *   Whether to begin each row with the delimiter (default: `true`).
   *
   *   > 👉 **Note**: please don’t use this: it could create fragile structures
   *   > that aren’t understandable to some markdown parsers.
   *
   *   When `true`, there are starting delimiters:
   *
   *   ```markdown
   *   | Alpha | B     |
   *   | ----- | ----- |
   *   | C     | Delta |
   *   ```
   *
   *   When `false`, there are no starting delimiters:
   *
   *   ```markdown
   *   Alpha | B     |
   *   ----- | ----- |
   *   C     | Delta |
   *   ```
   * @property {boolean | null | undefined} [padding=true]
   *   Whether to add a space of padding between delimiters and cells
   *   (default: `true`).
   *
   *   When `true`, there is padding:
   *
   *   ```markdown
   *   | Alpha | B     |
   *   | ----- | ----- |
   *   | C     | Delta |
   *   ```
   *
   *   When `false`, there is no padding:
   *
   *   ```markdown
   *   |Alpha|B    |
   *   |-----|-----|
   *   |C    |Delta|
   *   ```
   * @property {((value: string) => number) | null | undefined} [stringLength]
   *   Function to detect the length of table cell content (optional);
   *   this is used when aligning the delimiters (`|`) between table cells;
   *   full-width characters and emoji mess up delimiter alignment when viewing
   *   the markdown source;
   *   to fix this, you can pass this function,
   *   which receives the cell content and returns its “visible” size;
   *   note that what is and isn’t visible depends on where the text is displayed.
   *
   *   Without such a function, the following:
   *
   *   ```js
   *   markdownTable([
   *     ['Alpha', 'Bravo'],
   *     ['中文', 'Charlie'],
   *     ['👩‍❤️‍👩', 'Delta']
   *   ])
   *   ```
   *
   *   Yields:
   *
   *   ```markdown
   *   | Alpha | Bravo |
   *   | - | - |
   *   | 中文 | Charlie |
   *   | 👩‍❤️‍👩 | Delta |
   *   ```
   *
   *   With [`string-width`](https://github.com/sindresorhus/string-width):
   *
   *   ```js
   *   import stringWidth from 'string-width'
   *
   *   markdownTable(
   *     [
   *       ['Alpha', 'Bravo'],
   *       ['中文', 'Charlie'],
   *       ['👩‍❤️‍👩', 'Delta']
   *     ],
   *     {stringLength: stringWidth}
   *   )
   *   ```
   *
   *   Yields:
   *
   *   ```markdown
   *   | Alpha | Bravo   |
   *   | ----- | ------- |
   *   | 中文  | Charlie |
   *   | 👩‍❤️‍👩    | Delta   |
   *   ```
   */

  /**
   * @param {string} value
   *   Cell value.
   * @returns {number}
   *   Cell size.
   */
  function defaultStringLength(value) {
    return value.length
  }

  /**
   * Generate a markdown
   * ([GFM](https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables))
   * table.
   *
   * @param {ReadonlyArray<ReadonlyArray<string | null | undefined>>} table
   *   Table data (matrix of strings).
   * @param {Readonly<Options> | null | undefined} [options]
   *   Configuration (optional).
   * @returns {string}
   *   Result.
   */
  function markdownTable(table, options) {
    const settings = options || {};
    // To do: next major: change to spread.
    const align = (settings.align || []).concat();
    const stringLength = settings.stringLength || defaultStringLength;
    /** @type {Array<number>} Character codes as symbols for alignment per column. */
    const alignments = [];
    /** @type {Array<Array<string>>} Cells per row. */
    const cellMatrix = [];
    /** @type {Array<Array<number>>} Sizes of each cell per row. */
    const sizeMatrix = [];
    /** @type {Array<number>} */
    const longestCellByColumn = [];
    let mostCellsPerRow = 0;
    let rowIndex = -1;

    // This is a superfluous loop if we don’t align delimiters, but otherwise we’d
    // do superfluous work when aligning, so optimize for aligning.
    while (++rowIndex < table.length) {
      /** @type {Array<string>} */
      const row = [];
      /** @type {Array<number>} */
      const sizes = [];
      let columnIndex = -1;

      if (table[rowIndex].length > mostCellsPerRow) {
        mostCellsPerRow = table[rowIndex].length;
      }

      while (++columnIndex < table[rowIndex].length) {
        const cell = serialize(table[rowIndex][columnIndex]);

        if (settings.alignDelimiters !== false) {
          const size = stringLength(cell);
          sizes[columnIndex] = size;

          if (
            longestCellByColumn[columnIndex] === undefined ||
            size > longestCellByColumn[columnIndex]
          ) {
            longestCellByColumn[columnIndex] = size;
          }
        }

        row.push(cell);
      }

      cellMatrix[rowIndex] = row;
      sizeMatrix[rowIndex] = sizes;
    }

    // Figure out which alignments to use.
    let columnIndex = -1;

    if (typeof align === 'object' && 'length' in align) {
      while (++columnIndex < mostCellsPerRow) {
        alignments[columnIndex] = toAlignment(align[columnIndex]);
      }
    } else {
      const code = toAlignment(align);

      while (++columnIndex < mostCellsPerRow) {
        alignments[columnIndex] = code;
      }
    }

    // Inject the alignment row.
    columnIndex = -1;
    /** @type {Array<string>} */
    const row = [];
    /** @type {Array<number>} */
    const sizes = [];

    while (++columnIndex < mostCellsPerRow) {
      const code = alignments[columnIndex];
      let before = '';
      let after = '';

      if (code === 99 /* `c` */) {
        before = ':';
        after = ':';
      } else if (code === 108 /* `l` */) {
        before = ':';
      } else if (code === 114 /* `r` */) {
        after = ':';
      }

      // There *must* be at least one hyphen-minus in each alignment cell.
      let size =
        settings.alignDelimiters === false
          ? 1
          : Math.max(
              1,
              longestCellByColumn[columnIndex] - before.length - after.length
            );

      const cell = before + '-'.repeat(size) + after;

      if (settings.alignDelimiters !== false) {
        size = before.length + size + after.length;

        if (size > longestCellByColumn[columnIndex]) {
          longestCellByColumn[columnIndex] = size;
        }

        sizes[columnIndex] = size;
      }

      row[columnIndex] = cell;
    }

    // Inject the alignment row.
    cellMatrix.splice(1, 0, row);
    sizeMatrix.splice(1, 0, sizes);

    rowIndex = -1;
    /** @type {Array<string>} */
    const lines = [];

    while (++rowIndex < cellMatrix.length) {
      const row = cellMatrix[rowIndex];
      const sizes = sizeMatrix[rowIndex];
      columnIndex = -1;
      /** @type {Array<string>} */
      const line = [];

      while (++columnIndex < mostCellsPerRow) {
        const cell = row[columnIndex] || '';
        let before = '';
        let after = '';

        if (settings.alignDelimiters !== false) {
          const size =
            longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0);
          const code = alignments[columnIndex];

          if (code === 114 /* `r` */) {
            before = ' '.repeat(size);
          } else if (code === 99 /* `c` */) {
            if (size % 2) {
              before = ' '.repeat(size / 2 + 0.5);
              after = ' '.repeat(size / 2 - 0.5);
            } else {
              before = ' '.repeat(size / 2);
              after = before;
            }
          } else {
            after = ' '.repeat(size);
          }
        }

        if (settings.delimiterStart !== false && !columnIndex) {
          line.push('|');
        }

        if (
          settings.padding !== false &&
          // Don’t add the opening space if we’re not aligning and the cell is
          // empty: there will be a closing space.
          !(settings.alignDelimiters === false && cell === '') &&
          (settings.delimiterStart !== false || columnIndex)
        ) {
          line.push(' ');
        }

        if (settings.alignDelimiters !== false) {
          line.push(before);
        }

        line.push(cell);

        if (settings.alignDelimiters !== false) {
          line.push(after);
        }

        if (settings.padding !== false) {
          line.push(' ');
        }

        if (
          settings.delimiterEnd !== false ||
          columnIndex !== mostCellsPerRow - 1
        ) {
          line.push('|');
        }
      }

      lines.push(
        settings.delimiterEnd === false
          ? line.join('').replace(/ +$/, '')
          : line.join('')
      );
    }

    return lines.join('\n')
  }

  /**
   * @param {string | null | undefined} [value]
   *   Value to serialize.
   * @returns {string}
   *   Result.
   */
  function serialize(value) {
    return value === null || value === undefined ? '' : String(value)
  }

  /**
   * @param {string | null | undefined} value
   *   Value.
   * @returns {number}
   *   Alignment.
   */
  function toAlignment(value) {
    const code = typeof value === 'string' ? value.codePointAt(0) : 0;

    return code === 67 /* `C` */ || code === 99 /* `c` */
      ? 99 /* `c` */
      : code === 76 /* `L` */ || code === 108 /* `l` */
        ? 108 /* `l` */
        : code === 82 /* `R` */ || code === 114 /* `r` */
          ? 114 /* `r` */
          : 0
  }

  /**
   * @typedef {import('mdast').InlineCode} InlineCode
   * @typedef {import('mdast').Table} Table
   * @typedef {import('mdast').TableCell} TableCell
   * @typedef {import('mdast').TableRow} TableRow
   *
   * @typedef {import('markdown-table').Options} MarkdownTableOptions
   *
   * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext
   * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
   * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
   *
   * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension
   * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle
   * @typedef {import('mdast-util-to-markdown').State} State
   * @typedef {import('mdast-util-to-markdown').Info} Info
   */


  /**
   * Create an extension for `mdast-util-from-markdown` to enable GFM tables in
   * markdown.
   *
   * @returns {FromMarkdownExtension}
   *   Extension for `mdast-util-from-markdown` to enable GFM tables.
   */
  function gfmTableFromMarkdown() {
    return {
      enter: {
        table: enterTable,
        tableData: enterCell,
        tableHeader: enterCell,
        tableRow: enterRow
      },
      exit: {
        codeText: exitCodeText,
        table: exitTable,
        tableData: exit,
        tableHeader: exit,
        tableRow: exit
      }
    }
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function enterTable(token) {
    const align = token._align;
    this.enter(
      {
        type: 'table',
        align: align.map(function (d) {
          return d === 'none' ? null : d
        }),
        children: []
      },
      token
    );
    this.data.inTable = true;
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitTable(token) {
    this.exit(token);
    this.data.inTable = undefined;
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function enterRow(token) {
    this.enter({type: 'tableRow', children: []}, token);
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exit(token) {
    this.exit(token);
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function enterCell(token) {
    this.enter({type: 'tableCell', children: []}, token);
  }

  // Overwrite the default code text data handler to unescape escaped pipes when
  // they are in tables.
  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitCodeText(token) {
    let value = this.resume();

    if (this.data.inTable) {
      value = value.replace(/\\([\\|])/g, replace);
    }

    const node = this.stack[this.stack.length - 1];
    ok(node.type === 'inlineCode');
    node.value = value;
    this.exit(token);
  }

  /**
   * @param {string} $0
   * @param {string} $1
   * @returns {string}
   */
  function replace($0, $1) {
    // Pipes work, backslashes don’t (but can’t escape pipes).
    return $1 === '|' ? $1 : $0
  }

  /**
   * Create an extension for `mdast-util-to-markdown` to enable GFM tables in
   * markdown.
   *
   * @param {Options | null | undefined} [options]
   *   Configuration.
   * @returns {ToMarkdownExtension}
   *   Extension for `mdast-util-to-markdown` to enable GFM tables.
   */
  function gfmTableToMarkdown(options) {
    const settings = {};
    const padding = settings.tableCellPadding;
    const alignDelimiters = settings.tablePipeAlign;
    const stringLength = settings.stringLength;
    const around = padding ? ' ' : '|';

    return {
      unsafe: [
        {character: '\r', inConstruct: 'tableCell'},
        {character: '\n', inConstruct: 'tableCell'},
        // A pipe, when followed by a tab or space (padding), or a dash or colon
        // (unpadded delimiter row), could result in a table.
        {atBreak: true, character: '|', after: '[\t :-]'},
        // A pipe in a cell must be encoded.
        {character: '|', inConstruct: 'tableCell'},
        // A colon must be followed by a dash, in which case it could start a
        // delimiter row.
        {atBreak: true, character: ':', after: '-'},
        // A delimiter row can also start with a dash, when followed by more
        // dashes, a colon, or a pipe.
        // This is a stricter version than the built in check for lists, thematic
        // breaks, and setex heading underlines though:
        // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
        {atBreak: true, character: '-', after: '[:|-]'}
      ],
      handlers: {
        inlineCode: inlineCodeWithTable,
        table: handleTable,
        tableCell: handleTableCell,
        tableRow: handleTableRow
      }
    }

    /**
     * @type {ToMarkdownHandle}
     * @param {Table} node
     */
    function handleTable(node, _, state, info) {
      return serializeData(handleTableAsData(node, state, info), node.align)
    }

    /**
     * This function isn’t really used normally, because we handle rows at the
     * table level.
     * But, if someone passes in a table row, this ensures we make somewhat sense.
     *
     * @type {ToMarkdownHandle}
     * @param {TableRow} node
     */
    function handleTableRow(node, _, state, info) {
      const row = handleTableRowAsData(node, state, info);
      const value = serializeData([row]);
      // `markdown-table` will always add an align row
      return value.slice(0, value.indexOf('\n'))
    }

    /**
     * @type {ToMarkdownHandle}
     * @param {TableCell} node
     */
    function handleTableCell(node, _, state, info) {
      const exit = state.enter('tableCell');
      const subexit = state.enter('phrasing');
      const value = state.containerPhrasing(node, {
        ...info,
        before: around,
        after: around
      });
      subexit();
      exit();
      return value
    }

    /**
     * @param {Array<Array<string>>} matrix
     * @param {Array<string | null | undefined> | null | undefined} [align]
     */
    function serializeData(matrix, align) {
      return markdownTable(matrix, {
        align,
        // @ts-expect-error: `markdown-table` types should support `null`.
        alignDelimiters,
        // @ts-expect-error: `markdown-table` types should support `null`.
        padding,
        // @ts-expect-error: `markdown-table` types should support `null`.
        stringLength
      })
    }

    /**
     * @param {Table} node
     * @param {State} state
     * @param {Info} info
     */
    function handleTableAsData(node, state, info) {
      const children = node.children;
      let index = -1;
      /** @type {Array<Array<string>>} */
      const result = [];
      const subexit = state.enter('table');

      while (++index < children.length) {
        result[index] = handleTableRowAsData(children[index], state, info);
      }

      subexit();

      return result
    }

    /**
     * @param {TableRow} node
     * @param {State} state
     * @param {Info} info
     */
    function handleTableRowAsData(node, state, info) {
      const children = node.children;
      let index = -1;
      /** @type {Array<string>} */
      const result = [];
      const subexit = state.enter('tableRow');

      while (++index < children.length) {
        // Note: the positional info as used here is incorrect.
        // Making it correct would be impossible due to aligning cells?
        // And it would need copy/pasting `markdown-table` into this project.
        result[index] = handleTableCell(children[index], node, state, info);
      }

      subexit();

      return result
    }

    /**
     * @type {ToMarkdownHandle}
     * @param {InlineCode} node
     */
    function inlineCodeWithTable(node, parent, state) {
      let value = handle.inlineCode(node, parent, state);

      if (state.stack.includes('tableCell')) {
        value = value.replace(/\|/g, '\\$&');
      }

      return value
    }
  }

  /**
   * @typedef {import('mdast').ListItem} ListItem
   * @typedef {import('mdast').Paragraph} Paragraph
   * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext
   * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
   * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
   * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension
   * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle
   */


  /**
   * Create an extension for `mdast-util-from-markdown` to enable GFM task
   * list items in markdown.
   *
   * @returns {FromMarkdownExtension}
   *   Extension for `mdast-util-from-markdown` to enable GFM task list items.
   */
  function gfmTaskListItemFromMarkdown() {
    return {
      exit: {
        taskListCheckValueChecked: exitCheck,
        taskListCheckValueUnchecked: exitCheck,
        paragraph: exitParagraphWithTaskListItem
      }
    }
  }

  /**
   * Create an extension for `mdast-util-to-markdown` to enable GFM task list
   * items in markdown.
   *
   * @returns {ToMarkdownExtension}
   *   Extension for `mdast-util-to-markdown` to enable GFM task list items.
   */
  function gfmTaskListItemToMarkdown() {
    return {
      unsafe: [{atBreak: true, character: '-', after: '[:|-]'}],
      handlers: {listItem: listItemWithTaskListItem}
    }
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitCheck(token) {
    // We’re always in a paragraph, in a list item.
    const node = this.stack[this.stack.length - 2];
    ok(node.type === 'listItem');
    node.checked = token.type === 'taskListCheckValueChecked';
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitParagraphWithTaskListItem(token) {
    const parent = this.stack[this.stack.length - 2];

    if (
      parent &&
      parent.type === 'listItem' &&
      typeof parent.checked === 'boolean'
    ) {
      const node = this.stack[this.stack.length - 1];
      ok(node.type === 'paragraph');
      const head = node.children[0];

      if (head && head.type === 'text') {
        const siblings = parent.children;
        let index = -1;
        /** @type {Paragraph | undefined} */
        let firstParaghraph;

        while (++index < siblings.length) {
          const sibling = siblings[index];
          if (sibling.type === 'paragraph') {
            firstParaghraph = sibling;
            break
          }
        }

        if (firstParaghraph === node) {
          // Must start with a space or a tab.
          head.value = head.value.slice(1);

          if (head.value.length === 0) {
            node.children.shift();
          } else if (
            node.position &&
            head.position &&
            typeof head.position.start.offset === 'number'
          ) {
            head.position.start.column++;
            head.position.start.offset++;
            node.position.start = Object.assign({}, head.position.start);
          }
        }
      }
    }

    this.exit(token);
  }

  /**
   * @type {ToMarkdownHandle}
   * @param {ListItem} node
   */
  function listItemWithTaskListItem(node, parent, state, info) {
    const head = node.children[0];
    const checkable =
      typeof node.checked === 'boolean' && head && head.type === 'paragraph';
    const checkbox = '[' + (node.checked ? 'x' : ' ') + '] ';
    const tracker = state.createTracker(info);

    if (checkable) {
      tracker.move(checkbox);
    }

    let value = handle.listItem(node, parent, state, {
      ...info,
      ...tracker.current()
    });

    if (checkable) {
      value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
    }

    return value

    /**
     * @param {string} $0
     * @returns {string}
     */
    function check($0) {
      return $0 + checkbox
    }
  }

  /**
   * @import {Extension as FromMarkdownExtension} from 'mdast-util-from-markdown'
   * @import {Options} from 'mdast-util-gfm'
   * @import {Options as ToMarkdownExtension} from 'mdast-util-to-markdown'
   */


  /**
   * Create an extension for `mdast-util-from-markdown` to enable GFM (autolink
   * literals, footnotes, strikethrough, tables, tasklists).
   *
   * @returns {Array<FromMarkdownExtension>}
   *   Extension for `mdast-util-from-markdown` to enable GFM (autolink literals,
   *   footnotes, strikethrough, tables, tasklists).
   */
  function gfmFromMarkdown() {
    return [
      gfmAutolinkLiteralFromMarkdown(),
      gfmFootnoteFromMarkdown(),
      gfmStrikethroughFromMarkdown(),
      gfmTableFromMarkdown(),
      gfmTaskListItemFromMarkdown()
    ]
  }

  /**
   * Create an extension for `mdast-util-to-markdown` to enable GFM (autolink
   * literals, footnotes, strikethrough, tables, tasklists).
   *
   * @param {Options | null | undefined} [options]
   *   Configuration (optional).
   * @returns {ToMarkdownExtension}
   *   Extension for `mdast-util-to-markdown` to enable GFM (autolink literals,
   *   footnotes, strikethrough, tables, tasklists).
   */
  function gfmToMarkdown(options) {
    return {
      extensions: [
        gfmAutolinkLiteralToMarkdown(),
        gfmFootnoteToMarkdown(),
        gfmStrikethroughToMarkdown(),
        gfmTableToMarkdown(),
        gfmTaskListItemToMarkdown()
      ]
    }
  }

  const module$1 = { exports: {} };
  (function() {

    //// Export the API
    var namespace;

    // CommonJS / Node module
    if (typeof module$1 !== 'undefined') {
      namespace = module$1.exports = format;
    }

    // Browsers and other environments
    else {
      // Get the global object. Works in ES3, ES5, and ES5 strict mode.
      namespace = (function(){ return this || (0, eval)('this') }());
    }

    namespace.format = format;
    namespace.vsprintf = vsprintf;

    if (typeof console !== 'undefined' && typeof console.log === 'function') {
      namespace.printf = printf;
    }

    function printf(/* ... */) {
      console.log(format.apply(null, arguments));
    }

    function vsprintf(fmt, replacements) {
      return format.apply(null, [fmt].concat(replacements));
    }

    function format(fmt) {
      var argIndex = 1 // skip initial format argument
        , args = [].slice.call(arguments)
        , i = 0
        , n = fmt.length
        , result = ''
        , c
        , escaped = false
        , arg
        , tmp
        , leadingZero = false
        , precision
        , nextArg = function() { return args[argIndex++]; }
        , slurpNumber = function() {
            var digits = '';
            while (/\d/.test(fmt[i])) {
              digits += fmt[i++];
              c = fmt[i];
            }
            return digits.length > 0 ? parseInt(digits) : null;
          }
        ;
      for (; i < n; ++i) {
        c = fmt[i];
        if (escaped) {
          escaped = false;
          if (c == '.') {
            leadingZero = false;
            c = fmt[++i];
          }
          else if (c == '0' && fmt[i + 1] == '.') {
            leadingZero = true;
            i += 2;
            c = fmt[i];
          }
          else {
            leadingZero = true;
          }
          precision = slurpNumber();
          switch (c) {
          case 'b': // number in binary
            result += parseInt(nextArg(), 10).toString(2);
            break;
          case 'c': // character
            arg = nextArg();
            if (typeof arg === 'string' || arg instanceof String)
              result += arg;
            else
              result += String.fromCharCode(parseInt(arg, 10));
            break;
          case 'd': // number in decimal
            result += parseInt(nextArg(), 10);
            break;
          case 'f': // floating point number
            tmp = String(parseFloat(nextArg()).toFixed(precision || 6));
            result += leadingZero ? tmp : tmp.replace(/^0/, '');
            break;
          case 'j': // JSON
            result += JSON.stringify(nextArg());
            break;
          case 'o': // number in octal
            result += '0' + parseInt(nextArg(), 10).toString(8);
            break;
          case 's': // string
            result += nextArg();
            break;
          case 'x': // lowercase hexadecimal
            result += '0x' + parseInt(nextArg(), 10).toString(16);
            break;
          case 'X': // uppercase hexadecimal
            result += '0x' + parseInt(nextArg(), 10).toString(16).toUpperCase();
            break;
          default:
            result += c;
            break;
          }
        } else if (c === '%') {
          escaped = true;
        } else {
          result += c;
        }
      }
      return result;
    }

  }());

  var formatter = module$1.exports;

  // @ts-expect-error

  const fault = Object.assign(create(Error), {
    eval: create(EvalError),
    range: create(RangeError),
    reference: create(ReferenceError),
    syntax: create(SyntaxError),
    type: create(TypeError),
    uri: create(URIError)
  });

  /**
   * Create a new `EConstructor`, with the formatted `format` as a first argument.
   *
   * @template {Error} Fault
   * @template {new (reason: string) => Fault} Class
   * @param {Class} Constructor
   */
  function create(Constructor) {
    /** @type {string} */
    // @ts-expect-error
    FormattedError.displayName = Constructor.displayName || Constructor.name;

    return FormattedError

    /**
     * Create an error with a printf-like formatted message.
     *
     * @param {string|null} [format]
     *   Template string.
     * @param {...unknown} values
     *   Values to render in `format`.
     * @returns {Fault}
     */
    function FormattedError(format, ...values) {
      /** @type {string} */
      const reason = format ? formatter(format, ...values) : format;
      return new Constructor(reason)
    }
  }

  /**
   * @typedef {'toml' | 'yaml'} Preset
   *   Known name of a frontmatter style.
   *
   * @typedef Info
   *   Sequence.
   *
   *   Depending on how this structure is used, it reflects a marker or a fence.
   * @property {string} close
   *   Closing.
   * @property {string} open
   *   Opening.
   *
   * @typedef MatterProps
   *   Fields describing a kind of matter.
   * @property {string} type
   *   Node type to tokenize as.
   * @property {boolean | null | undefined} [anywhere=false]
   *   Whether matter can be found anywhere in the document, normally, only matter
   *   at the start of the document is recognized.
   *
   *   > 👉 **Note**: using this is a terrible idea.
   *   > It’s called frontmatter, not matter-in-the-middle or so.
   *   > This makes your markdown less portable.
   *
   * @typedef MarkerProps
   *   Marker configuration.
   * @property {Info | string} marker
   *   Character repeated 3 times, used as complete fences.
   *
   *   For example the character `'-'` will result in `'---'` being used as the
   *   fence
   *   Pass `open` and `close` to specify different characters for opening and
   *   closing fences.
   * @property {never} [fence]
   *   If `marker` is set, `fence` must not be set.
   *
   * @typedef FenceProps
   *   Fence configuration.
   * @property {Info | string} fence
   *   Complete fences.
   *
   *   This can be used when fences contain different characters or lengths
   *   other than 3.
   *   Pass `open` and `close` to interface to specify different characters for opening and
   *   closing fences.
   * @property {never} [marker]
   *   If `fence` is set, `marker` must not be set.
   *
   * @typedef {(MatterProps & FenceProps) | (MatterProps & MarkerProps)} Matter
   *   Fields describing a kind of matter.
   *
   *   > 👉 **Note**: using `anywhere` is a terrible idea.
   *   > It’s called frontmatter, not matter-in-the-middle or so.
   *   > This makes your markdown less portable.
   *
   *   > 👉 **Note**: `marker` and `fence` are mutually exclusive.
   *   > If `marker` is set, `fence` must not be set, and vice versa.
   *
   * @typedef {Matter | Preset | Array<Matter | Preset>} Options
   *   Configuration.
   */

  const own = {}.hasOwnProperty;
  const markers = {
    yaml: '-',
    toml: '+'
  };

  /**
   * Simplify options by normalizing them to an array of matters.
   *
   * @param {Options | null | undefined} [options='yaml']
   *   Configuration (default: `'yaml'`).
   * @returns {Array<Matter>}
   *   List of matters.
   */
  function toMatters(options) {
    /** @type {Array<Matter>} */
    const result = [];
    let index = -1;

    /** @type {Array<Matter | Preset>} */
    const presetsOrMatters = Array.isArray(options)
      ? options
      : options
      ? [options]
      : ['yaml'];
    while (++index < presetsOrMatters.length) {
      result[index] = matter$1(presetsOrMatters[index]);
    }
    return result
  }

  /**
   * Simplify an option.
   *
   * @param {Matter | Preset} option
   *   Configuration.
   * @returns {Matter}
   *   Matter.
   */
  function matter$1(option) {
    let result = option;
    if (typeof result === 'string') {
      if (!own.call(markers, result)) {
        throw fault('Missing matter definition for `%s`', result)
      }
      result = {
        type: result,
        marker: markers[result]
      };
    } else if (typeof result !== 'object') {
      throw fault('Expected matter to be an object, not `%j`', result)
    }
    if (!own.call(result, 'type')) {
      throw fault('Missing `type` in matter `%j`', result)
    }
    if (!own.call(result, 'fence') && !own.call(result, 'marker')) {
      throw fault('Missing `marker` or `fence` in matter `%j`', result)
    }
    return result
  }

  /**
   * @typedef {import('micromark-util-types').Construct} Construct
   * @typedef {import('micromark-util-types').ConstructRecord} ConstructRecord
   * @typedef {import('micromark-util-types').Extension} Extension
   * @typedef {import('micromark-util-types').State} State
   * @typedef {import('micromark-util-types').TokenType} TokenType
   * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
   * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
   *
   * @typedef {import('./to-matters.js').Info} Info
   * @typedef {import('./to-matters.js').Matter} Matter
   * @typedef {import('./to-matters.js').Options} Options
   */


  /**
   * Create an extension for `micromark` to enable frontmatter syntax.
   *
   * @param {Options | null | undefined} [options='yaml']
   *   Configuration (default: `'yaml'`).
   * @returns {Extension}
   *   Extension for `micromark` that can be passed in `extensions`, to
   *   enable frontmatter syntax.
   */
  function frontmatter(options) {
    const matters = toMatters(options);
    /** @type {ConstructRecord} */
    const flow = {};
    let index = -1;
    while (++index < matters.length) {
      const matter = matters[index];
      const code = fence$1(matter, 'open').charCodeAt(0);
      const construct = createConstruct(matter);
      const existing = flow[code];
      if (Array.isArray(existing)) {
        existing.push(construct);
      } else {
        // Never a single object, always an array.
        flow[code] = [construct];
      }
    }
    return {
      flow
    }
  }

  /**
   * @param {Matter} matter
   * @returns {Construct}
   */
  function createConstruct(matter) {
    const anywhere = matter.anywhere;
    const frontmatterType = /** @type {TokenType} */ matter.type;
    const fenceType = /** @type {TokenType} */ frontmatterType + 'Fence';
    const sequenceType = /** @type {TokenType} */ fenceType + 'Sequence';
    const valueType = /** @type {TokenType} */ frontmatterType + 'Value';
    const closingFenceConstruct = {
      tokenize: tokenizeClosingFence,
      partial: true
    };

    /**
     * Fence to look for.
     *
     * @type {string}
     */
    let buffer;
    let bufferIndex = 0;
    return {
      tokenize: tokenizeFrontmatter,
      concrete: true
    }

    /**
     * @this {TokenizeContext}
     * @type {Tokenizer}
     */
    function tokenizeFrontmatter(effects, ok, nok) {
      const self = this;
      return start

      /**
       * Start of frontmatter.
       *
       * ```markdown
       * > | ---
       *     ^
       *   | title: "Venus"
       *   | ---
       * ```
       *
       * @type {State}
       */
      function start(code) {
        const position = self.now();
        if (
          // Indent not allowed.
          position.column === 1 &&
          // Normally, only allowed in first line.
          (position.line === 1 || anywhere)
        ) {
          buffer = fence$1(matter, 'open');
          bufferIndex = 0;
          if (code === buffer.charCodeAt(bufferIndex)) {
            effects.enter(frontmatterType);
            effects.enter(fenceType);
            effects.enter(sequenceType);
            return openSequence(code)
          }
        }
        return nok(code)
      }

      /**
       * In open sequence.
       *
       * ```markdown
       * > | ---
       *     ^
       *   | title: "Venus"
       *   | ---
       * ```
       *
       * @type {State}
       */
      function openSequence(code) {
        if (bufferIndex === buffer.length) {
          effects.exit(sequenceType);
          if (markdownSpace(code)) {
            effects.enter('whitespace');
            return openSequenceWhitespace(code)
          }
          return openAfter(code)
        }
        if (code === buffer.charCodeAt(bufferIndex++)) {
          effects.consume(code);
          return openSequence
        }
        return nok(code)
      }

      /**
       * In whitespace after open sequence.
       *
       * ```markdown
       * > | ---␠
       *        ^
       *   | title: "Venus"
       *   | ---
       * ```
       *
       * @type {State}
       */
      function openSequenceWhitespace(code) {
        if (markdownSpace(code)) {
          effects.consume(code);
          return openSequenceWhitespace
        }
        effects.exit('whitespace');
        return openAfter(code)
      }

      /**
       * After open sequence.
       *
       * ```markdown
       * > | ---
       *        ^
       *   | title: "Venus"
       *   | ---
       * ```
       *
       * @type {State}
       */
      function openAfter(code) {
        if (markdownLineEnding(code)) {
          effects.exit(fenceType);
          effects.enter('lineEnding');
          effects.consume(code);
          effects.exit('lineEnding');
          // Get ready for closing fence.
          buffer = fence$1(matter, 'close');
          bufferIndex = 0;
          return effects.attempt(closingFenceConstruct, after, contentStart)
        }

        // EOF is not okay.
        return nok(code)
      }

      /**
       * Start of content chunk.
       *
       * ```markdown
       *   | ---
       * > | title: "Venus"
       *     ^
       *   | ---
       * ```
       *
       * @type {State}
       */
      function contentStart(code) {
        if (code === null || markdownLineEnding(code)) {
          return contentEnd(code)
        }
        effects.enter(valueType);
        return contentInside(code)
      }

      /**
       * In content chunk.
       *
       * ```markdown
       *   | ---
       * > | title: "Venus"
       *     ^
       *   | ---
       * ```
       *
       * @type {State}
       */
      function contentInside(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit(valueType);
          return contentEnd(code)
        }
        effects.consume(code);
        return contentInside
      }

      /**
       * End of content chunk.
       *
       * ```markdown
       *   | ---
       * > | title: "Venus"
       *                   ^
       *   | ---
       * ```
       *
       * @type {State}
       */
      function contentEnd(code) {
        // Require a closing fence.
        if (code === null) {
          return nok(code)
        }

        // Can only be an eol.
        effects.enter('lineEnding');
        effects.consume(code);
        effects.exit('lineEnding');
        return effects.attempt(closingFenceConstruct, after, contentStart)
      }

      /**
       * After frontmatter.
       *
       * ```markdown
       *   | ---
       *   | title: "Venus"
       * > | ---
       *        ^
       * ```
       *
       * @type {State}
       */
      function after(code) {
        // `code` must be eol/eof.
        effects.exit(frontmatterType);
        return ok(code)
      }
    }

    /** @type {Tokenizer} */
    function tokenizeClosingFence(effects, ok, nok) {
      let bufferIndex = 0;
      return closeStart

      /**
       * Start of close sequence.
       *
       * ```markdown
       *   | ---
       *   | title: "Venus"
       * > | ---
       *     ^
       * ```
       *
       * @type {State}
       */
      function closeStart(code) {
        if (code === buffer.charCodeAt(bufferIndex)) {
          effects.enter(fenceType);
          effects.enter(sequenceType);
          return closeSequence(code)
        }
        return nok(code)
      }

      /**
       * In close sequence.
       *
       * ```markdown
       *   | ---
       *   | title: "Venus"
       * > | ---
       *     ^
       * ```
       *
       * @type {State}
       */
      function closeSequence(code) {
        if (bufferIndex === buffer.length) {
          effects.exit(sequenceType);
          if (markdownSpace(code)) {
            effects.enter('whitespace');
            return closeSequenceWhitespace(code)
          }
          return closeAfter(code)
        }
        if (code === buffer.charCodeAt(bufferIndex++)) {
          effects.consume(code);
          return closeSequence
        }
        return nok(code)
      }

      /**
       * In whitespace after close sequence.
       *
       * ```markdown
       * > | ---
       *   | title: "Venus"
       *   | ---␠
       *        ^
       * ```
       *
       * @type {State}
       */
      function closeSequenceWhitespace(code) {
        if (markdownSpace(code)) {
          effects.consume(code);
          return closeSequenceWhitespace
        }
        effects.exit('whitespace');
        return closeAfter(code)
      }

      /**
       * After close sequence.
       *
       * ```markdown
       *   | ---
       *   | title: "Venus"
       * > | ---
       *        ^
       * ```
       *
       * @type {State}
       */
      function closeAfter(code) {
        if (code === null || markdownLineEnding(code)) {
          effects.exit(fenceType);
          return ok(code)
        }
        return nok(code)
      }
    }
  }

  /**
   * @param {Matter} matter
   * @param {'close' | 'open'} prop
   * @returns {string}
   */
  function fence$1(matter, prop) {
    return matter.marker
      ? pick$1(matter.marker, prop).repeat(3)
      : // @ts-expect-error: They’re mutually exclusive.
        pick$1(matter.fence, prop)
  }

  /**
   * @param {Info | string} schema
   * @param {'close' | 'open'} prop
   * @returns {string}
   */
  function pick$1(schema, prop) {
    return typeof schema === 'string' ? schema : schema[prop]
  }

  /**
   * @typedef {import('mdast').Literal} Literal
   *
   * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext
   * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
   * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
   * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension
   *
   * @typedef {import('micromark-extension-frontmatter').Info} Info
   * @typedef {import('micromark-extension-frontmatter').Matter} Matter
   * @typedef {import('micromark-extension-frontmatter').Options} Options
   */


  /**
   * Create an extension for `mdast-util-from-markdown`.
   *
   * @param {Options | null | undefined} [options]
   *   Configuration (optional).
   * @returns {FromMarkdownExtension}
   *   Extension for `mdast-util-from-markdown`.
   */
  function frontmatterFromMarkdown(options) {
    const matters = toMatters(options);
    /** @type {FromMarkdownExtension['enter']} */
    const enter = {};
    /** @type {FromMarkdownExtension['exit']} */
    const exit = {};
    let index = -1;

    while (++index < matters.length) {
      const matter = matters[index];
      enter[matter.type] = opener(matter);
      exit[matter.type] = close;
      exit[matter.type + 'Value'] = value;
    }

    return {enter, exit}
  }

  /**
   * @param {Matter} matter
   * @returns {FromMarkdownHandle} enter
   */
  function opener(matter) {
    return open

    /**
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function open(token) {
      // @ts-expect-error: custom.
      this.enter({type: matter.type, value: ''}, token);
      this.buffer();
    }
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function close(token) {
    const data = this.resume();
    const node = this.stack[this.stack.length - 1];
    this.exit(token);
    // Remove the initial and final eol.
    node.value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '');
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function value(token) {
    this.config.enter.data.call(this, token);
    this.config.exit.data.call(this, token);
  }

  /**
   * Create an extension for `mdast-util-to-markdown`.
   *
   * @param {Options | null | undefined} [options]
   *   Configuration (optional).
   * @returns {ToMarkdownExtension}
   *   Extension for `mdast-util-to-markdown`.
   */
  function frontmatterToMarkdown(options) {
    /** @type {ToMarkdownExtension['unsafe']} */
    const unsafe = [];
    /** @type {ToMarkdownExtension['handlers']} */
    const handlers = {};
    const matters = toMatters(options);
    let index = -1;

    while (++index < matters.length) {
      const matter = matters[index];

      // @ts-expect-error: this can add custom frontmatter nodes.
      // Typing those is the responsibility of the end user.
      handlers[matter.type] = handler(matter);

      const open = fence(matter, 'open');

      unsafe.push({
        atBreak: true,
        character: open.charAt(0),
        after: escapeStringRegexp(open.charAt(1))
      });
    }

    return {unsafe, handlers}
  }

  /**
   * Create a handle that can serialize a frontmatter node as markdown.
   *
   * @param {Matter} matter
   *   Structure.
   * @returns {(node: Literal) => string} enter
   *   Handler.
   */
  function handler(matter) {
    const open = fence(matter, 'open');
    const close = fence(matter, 'close');

    return handle

    /**
     * Serialize a frontmatter node as markdown.
     *
     * @param {Literal} node
     *   Node to serialize.
     * @returns {string}
     *   Serialized node.
     */
    function handle(node) {
      return open + (node.value ? '\n' + node.value : '') + '\n' + close
    }
  }

  /**
   * Get an `open` or `close` fence.
   *
   * @param {Matter} matter
   *   Structure.
   * @param {'close' | 'open'} prop
   *   Field to get.
   * @returns {string}
   *   Fence.
   */
  function fence(matter, prop) {
    return matter.marker
      ? pick(matter.marker, prop).repeat(3)
      : // @ts-expect-error: They’re mutually exclusive.
        pick(matter.fence, prop)
  }

  /**
   * Take `open` or `close` fields when schema is an info object, or use the
   * given value when it is a string.
   *
   * @param {Info | string} schema
   *   Info object or value.
   * @param {'close' | 'open'} prop
   *   Field to get.
   * @returns {string}
   *   Thing to use for the opening or closing.
   */
  function pick(schema, prop) {
    return typeof schema === 'string' ? schema : schema[prop]
  }

  var version = '0.0.1';

  // Public option defaults. Explicit options and inherited modes take precedence.
  const defaults = {
    texts: 'inline',
    roots: 'inline',
    paragraphs: 'inline',
    headings: 'inline',
    strongs: 'inline',
    emphases: 'inline',
    deletions: 'inline',
    links: 'inline',
    blockquotes: 'inline',
    lists: 'inline',
    listItems: 'inline',
    tables: 'skip',
    tableRows: 'inline',
    tableCells: 'inline',
    footnoteDefinitions: 'inline',
    codeBlocks: 'skip',
    inlineCodes: 'skip',
    htmlBlocks: 'skip',
    images: 'skip',
    definitions: 'skip',
    thematicBreaks: 'skip',
    breaks: 'skip',
    footnoteReferences: 'skip',
    yamlBlocks: 'skip',
    tomlBlocks: 'skip',
  };

  // mdast uses `link` for explicit links and autolinks. Parser positions distinguish
  // bare/angle links from [labels](destinations), even when their visible text agrees.
  const isAutolink = node => {
    if (node.type !== 'link' || node.children?.length !== 1 || node.children[0].type !== 'text') {
      return false
    }
    const outer = node.position;
    const inner = node.children[0].position;
    const start = inner?.start.offset - outer?.start.offset;
    const end = outer?.end.offset - inner?.end.offset;
    return (start === 0 && end === 0) || (start === 1 && end === 1)
  };

  // Public options describe collections; AST node types remain singular.
  const optionNames = {
    text: 'texts',
    root: 'roots',
    paragraph: 'paragraphs',
    heading: 'headings',
    strong: 'strongs',
    emphasis: 'emphases',
    delete: 'deletions',
    link: 'links',
    linkReference: 'links',
    blockquote: 'blockquotes',
    list: 'lists',
    listItem: 'listItems',
    table: 'tables',
    tableRow: 'tableRows',
    tableCell: 'tableCells',
    footnoteDefinition: 'footnoteDefinitions',
    code: 'codeBlocks',
    inlineCode: 'inlineCodes',
    html: 'htmlBlocks',
    image: 'images',
    imageReference: 'images',
    definition: 'definitions',
    thematicBreak: 'thematicBreaks',
    break: 'breaks',
    footnoteReference: 'footnoteReferences',
    yaml: 'yamlBlocks',
    toml: 'tomlBlocks',
  };

  const modeFor = (node, options, inherited) => {
    const { type } = node;
    const name = optionNames[type];
    let group;
    if (type === 'footnoteDefinition' || type === 'footnoteReference') {
      group = options.footnotes;
    } else if (type === 'yaml' || type === 'toml') {
      group = options.frontmatter;
    }
    let specific = options[name] ?? options[type];
    if (type === 'listItem' && typeof node.checked === 'boolean') {
      specific = options.taskLists ?? specific;
    } else if (isAutolink(node)) {
      specific = options.autolinks ?? specific;
    }
    let mode = specific ?? group ?? inherited ?? defaults[name] ?? 'inline';
    if (mode === true) {
      mode = 'keep';
    } else if (mode === false) {
      mode = 'skip';
    }
    if (!['skip', 'keep', 'inline'].includes(mode)) {
      throw new Error(`Unknown Markdown format for ${type}: ${mode}`)
    }
    return mode
  };

  // Formatting adds syntax around original children, without changing their AST values.
  const block = () => ({ block: true });
  const wrap = (prefix, suffix) => (_node, mode) => {
    if (mode === 'keep') {
      return { prefix, suffix }
    }
    return {}
  };
  const link = (node, mode) => {
    if (mode !== 'keep') {
      return {}
    }
    let suffix = `](${node.url})`;
    if (node.type === 'linkReference') {
      suffix = `][${node.label || node.identifier}]`;
    } else if (node.title) {
      suffix = `](${node.url} "${node.title}")`;
    }
    return { prefix: '[', suffix }
  };
  const literal = () => ({ text: true, block: true });
  const image = (node, mode) => {
    if (mode === 'inline') {
      return { generated: node.alt || '' }
    }
    if (node.type === 'imageReference') {
      return { generated: `![${node.alt || ''}][${node.label || node.identifier}]` }
    }
    return { generated: `![${node.alt || ''}](${node.url})` }
  };

  const fmtNode = {
    text: () => ({ text: true }),
    strong: wrap('**', '**'),
    emphasis: wrap('*', '*'),
    delete: wrap('~~', '~~'),
    link,
    linkReference: link,
    root: block,
    paragraph: block,
    heading: (node, mode) => {
      let prefix = '';
      if (mode === 'keep') {
        prefix = '#'.repeat(node.depth) + ' ';
      }
      return { block: true, prefix }
    },
    blockquote: (_node, mode) => ({ block: true, prefix: mode === 'keep' ? '> ' : '' }),
    list: (_node, mode) => ({ block: true, childMode: mode }),
    listItem: (node, mode) => {
      let prefix = '';
      if (mode === 'keep') {
        prefix = '- ';
        if (typeof node.checked === 'boolean') {
          prefix += node.checked ? '[x] ' : '[ ] ';
        }
      }
      return { block: true, prefix }
    },
    table: (_node, mode) => ({ block: true, childMode: mode }),
    tableRow: (_node, mode) => ({ block: true, childMode: mode, prefix: mode === 'keep' ? '| ' : '' }),
    tableCell: (_node, mode) => ({ block: mode !== 'keep', suffix: mode === 'keep' ? ' | ' : '' }),
    footnoteDefinition: (node, mode) => ({ block: true, prefix: mode === 'keep' ? `[^${node.identifier}]: ` : '' }),
    code: (node, mode) => ({
      text: true, block: true,
      prefix: mode === 'keep' ? '```' + (node.lang || '') + '\n' : '',
      suffix: mode === 'keep' ? '\n```' : '',
    }),
    inlineCode: (_node, mode) => ({ text: true, ...wrap('`', '`')(null, mode) }),
    html: literal,
    image,
    imageReference: image,
    definition: (node, mode) => ({ block: true, generated: mode === 'keep' ? `[${node.identifier}]: ${node.url}` : node.url }),
    thematicBreak: (_node, mode) => ({ block: true, generated: mode === 'keep' ? '---' : '' }),
    break: () => ({ generated: '\n' }),
    footnoteReference: (node, mode) => ({ generated: mode === 'keep' ? `[^${node.identifier}]` : node.identifier }),
    yaml: (_node, mode) => ({ text: true, block: true, ...wrap('---\n', '\n---')(null, mode) }),
    toml: (_node, mode) => ({ text: true, block: true, ...wrap('+++\n', '\n+++')(null, mode) }),
  };

  const walk = (tree, options = {}) => {
    const nodes = [];
    const groups = [];
    let group = [];
    const flush = () => {
      if (group.length) {
        groups.push(group);
        group = [];
      }
    };
    const append = node => {
      nodes.push(node);
      group.push(node);
    };
    // Synthetic text exists only in the NLP view; it is never inserted into the AST.
    const generate = value => {
      if (value) {
        append({ type: 'text', value, generated: true });
      }
    };
    const stack = [{ node: tree }];
    for (; stack.length > 0;) {
      const { node, exit, behavior, inherited } = stack.pop();
      if (exit) {
        generate(behavior.suffix);
        if (behavior.block) {
          flush();
        }
        continue
      }
      if (!Object.hasOwn(fmtNode, node.type)) {
        throw new Error(`Unsupported Markdown node: ${node.type}`)
      }
      const mode = modeFor(node, options, inherited);
      // Let task items override a skipped ordinary list without exposing other items.
      const inspectTasks = node.type === 'list' && options.taskLists != null;
      if (mode === 'skip' && !inspectTasks) {
        flush();
        continue
      }
      const fmt = fmtNode[node.type](node, mode);
      // A list/quote prefix must stay beside the first paragraph inside its wrapper.
      if (fmt.block && group.some(part => !part.generated)) {
        flush();
      }
      generate(fmt.prefix);
      if (fmt.text) {
        append(node);
      } else if (fmt.generated !== undefined) {
        generate(fmt.generated);
      } else if (node.children) {
        stack.push({ node, exit: true, behavior: fmt });
        for (let i = node.children.length - 1; i >= 0; i -= 1) {
          stack.push({ node: node.children[i], inherited: fmt.childMode });
        }
        continue
      } else {
        throw new Error(`Expected children for Markdown node: ${node.type}`)
      }
      generate(fmt.suffix);
      if (fmt.block) {
        flush();
      }
    }
    flush();
    return { nodes, groups }
  };

  const connectNodes = (doc, nodes, binding) => {
    // All prose runs contribute to the same document-owned lookup and node layouts.
    const { terms, layout } = binding;
    nodes.forEach(node => layout.set(node, []));
    if (!doc.termList().length) {
      nodes.forEach(node => layout.set(node, [node.value]));
      return
    }
    let index = 0;
    let cursor = 0;
    // Temporary import cursors align text in order; no moving offsets are retained.
    const consume = (value, source) => {
      for (let remaining = value; remaining.length > 0;) {
        const node = nodes[index];
        if (!node) {
          throw new Error('Cannot align tokenized text with the Markdown tree')
        }
        const text = node.value.slice(cursor, cursor + remaining.length);
        if (!remaining.startsWith(text)) {
          throw new Error('Cannot align tokenized text with the Markdown tree')
        }
        if (text) {
          if (source) {
            // walk*ed* has two word fragments; **walked** followed by a space has one.
            const part = { node, text, source };
            source.parts.push(part);
            layout.get(node).push(part);
          } else {
            layout.get(node).push(text);
          }
        }
        remaining = remaining.slice(text.length);
        cursor += text.length;
        if (cursor === node.value.length) {
          index += 1;
          cursor = 0;
        }
      }
    };
    doc.termList().forEach(term => {
      const source = { parts: [] };
      consume(term.pre);
      consume(term.text, source);
      consume(term.post);
      terms.set(term, source);
    });
    if (nodes.slice(index).some((node, i) => node.value.length > (i === 0 ? cursor : 0))) {
      throw new Error('Tokenization did not preserve all Markdown text')
    }
  };

  const readTree = function (tree, nlp, options = {}) {
    // Snapshot read options so later caller changes cannot alter write-back traversal.
    const readOptions = { ...options };
    const { nodes, groups } = walk(tree, readOptions);
    const doc = nlp.tokenize('');
    const binding = {
      tree,
      readOptions,
      nodes,
      groups,
      layout: new Map(),
      terms: new WeakMap(),
      values: nodes.map(node => node.value),
    };
    groups.forEach(group => {
      // Tokenize a whole prose run so inline markup cannot split words or matches.
      const part = nlp.tokenize(group.map(node => node.value).join(''));
      connectNodes(part, group, binding);
      if (part.document.length) {
        // Readable plaintext separation only; write-back retains original AST separators.
        if (doc.document.length) {
          doc.document.at(-1).at(-1).post += '\n\n';
        }
        part.document.forEach(sentence => doc.document.push(sentence));
      }
    });
    // One shared document owns all bindings, including those reached through selections.
    Object.defineProperty(doc.document, 'unist', { value: binding });
    doc.compute(nlp.hooks());
    return doc
  };

  // called every doc.replace() so we can shuffle our metadata around
  const onTransfer = ({ oldTerms, newTerms, document }) => {
    const binding = document.unist;
    if (!binding) {
      return // Ordinary compromise documents have no AST connection.
    }
    const { terms } = binding;
    const sources = oldTerms.map(term => terms.get(term));
    if (!sources.length || !newTerms.length || sources.some(source => !source)) {
      return
    }
    const owners = new Set(sources.flatMap(source => source.parts.map(part => part.node)));
    if (owners.size !== 1) {
      return // Missing bindings cause an explicit failure at write-back.
    }
    const node = [...owners][0];
    const entries = binding.layout.get(node);
    const start = entries.indexOf(sources[0].parts[0]);
    const end = entries.indexOf(sources.at(-1).parts.at(-1));
    const covered = entries.slice(start, end + 1).filter(entry => typeof entry !== 'string');
    if (
      start < 0 ||
      end < start ||
      covered.length !== sources.length ||
      covered.some((part, i) => part.source !== sources[i])
    ) {
      return
    }
    // Replace word slots and their internal separators, keeping outside text untouched.
    const replacement = [];
    newTerms.forEach((term, i) => {
      if (i > 0) {
        replacement.push(newTerms[i - 1].post + term.pre);
      }
      const source = { parts: [] };
      const part = { node, text: term.text, source };
      source.parts.push(part);
      replacement.push(part);
      terms.set(term, source);
    });
    entries.splice(start, end - start + 1, ...replacement);
  };

  const update = doc => {
    const unist = doc.document.unist;
    if (!unist) {
      throw new Error('This document is not connected to a Markdown tree')
    }
    const { tree, nodes, values, layout, terms } = unist;
    const { nodes: current, groups } = walk(tree, unist.readOptions);
    // Generated wrappers are recreated during traversal, so compare their values.
    const sameNode = (node, previous) => node === previous ||
      (node.generated === true && previous?.generated === true && node.value === previous.value);
    // Moving text across block boundaries also invalidates the imported structure.
    const sameGroups = groups.length === unist.groups.length && groups.every((group, i) =>
      group.length === unist.groups[i].length && group.every((node, j) => sameNode(node, unist.groups[i][j])));
    if (!sameGroups || current.length !== nodes.length || current.some((node, i) => !sameNode(node, nodes[i]) || node.value !== values[i])) {
      throw new Error('Markdown tree changed since import or last update')
    }
    // Slots describe word order independently of compromise's pre/post storage.
    const expected = [
      ...new Set(
        nodes.flatMap(node =>
          layout
            .get(node)
            .filter(entry => typeof entry !== 'string')
            .map(part => part.source)
        )
      ),
    ];
    const allTerms = doc.document.flat();
    const words = new Map();
    allTerms.forEach((term, i) => {
      const source = terms.get(term);
      if (!source) {
        throw new Error('Cannot update tree: inserted or replaced text has ambiguous ownership')
      }
      if (source !== expected[i]) {
        throw new Error('Cannot update tree: deleted or reordered words require structural editing')
      }
      const original = source.parts.map(part => part.text).join('');
      if (source.parts.length > 1 && term.text !== original) {
        throw new Error('Cannot update tree: edited text crosses Markdown nodes')
      }
      words.set(source, term.text);
    });
    if (allTerms.length !== expected.length) {
      throw new Error('Cannot update tree: deleted words require structural editing')
    }
    // Literal separators stay as imported; punctuation-only edits are deliberately ignored.
    const output = nodes.map(node =>
      layout
        .get(node)
        .map(entry => {
          if (typeof entry === 'string') {
            return entry
          }
          if (entry.source.parts.length > 1) {
            return entry.text
          }
          return words.get(entry.source)
        })
        .join('')
    );
    // Generated Markdown is read-only: edits must not leak syntax into source nodes.
    if (nodes.some((node, i) => node.generated && output[i] !== values[i])) {
      throw new Error('Cannot update tree: generated Markdown syntax was edited')
    }
    // No AST mutation happens until every word has passed validation.
    nodes.forEach((node, i) => {
      if (!node.generated) {
        node.value = output[i];
      }
    });
    unist.values = output;
    return doc
  };

  /* eslint-disable no-console */

  const debug = view => {
    const binding = view.document.unist;
    if (!binding) {
      console.log('AST: this document has no tree binding');
      return
    }
    // Import order provides stable local IDs, even when debugging a selection.
    const ids = new Map(binding.nodes.map((node, i) => [node, `node-${i + 1}`]));
    const referenced = new Set();
    console.log('AST terms:');
    view.termList().forEach(term => {
      const source = binding.terms.get(term);
      const nodes = [...new Set(source?.parts.map(part => part.node) || [])];
      nodes.forEach(node => referenced.add(node));
      let owners = 'unbound (write-back will fail)';
      if (nodes.length > 0) {
        owners = nodes.map(node => ids.get(node)).join(', ');
      }
      console.log(`  ${JSON.stringify(term.text)} -> ${owners}`);
    });
    console.log('AST text nodes:');
    binding.nodes.forEach(node => {
      if (referenced.has(node)) {
        console.log(`  ${ids.get(node)}: ${JSON.stringify(node.value)}`);
      }
    });
  };

  const matter = ['yaml', 'toml'];

  const plugin = {
    version,
    onReplace: onTransfer,
    mutate: world => {
      world.methods.one.debug ||= {};
      world.methods.one.debug.ast = debug;
    },
    lib: {
      fromAst: function (tree, options = {}) {
        return readTree(tree, this, options)
      },
      fromMarkdown: function (md, options = {}) {
        // Parsing is fixed here; callers with another parser can use fromAst().
        const tree = fromMarkdown(md, {
          extensions: [gfm(), frontmatter(matter)],
          mdastExtensions: [gfmFromMarkdown(), frontmatterFromMarkdown(matter)],
        });
        return this.fromAst(tree, options)
      },
    },
    api: View => {
      // write our terms back to the tree
      View.prototype.updateTree = function () {
        return update(this)
      };
      // Serialize back to markdown
      View.prototype.markdown = function () {
        const tree = this.document.unist?.tree;
        return toMarkdown(tree, { extensions: [gfmToMarkdown(), frontmatterToMarkdown(matter)] })
      };
    },
  };

  return plugin;

}));
