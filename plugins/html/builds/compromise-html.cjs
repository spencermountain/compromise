(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseHtml = factory());
})(this, (function () { 'use strict';

  function ok$1() {}

  /**
   * @import {Schema as SchemaType, Space} from 'property-information'
   */

  /** @type {SchemaType} */
  class Schema {
    /**
     * @param {SchemaType['property']} property
     *   Property.
     * @param {SchemaType['normal']} normal
     *   Normal.
     * @param {Space | undefined} [space]
     *   Space.
     * @returns
     *   Schema.
     */
    constructor(property, normal, space) {
      this.normal = normal;
      this.property = property;

      if (space) {
        this.space = space;
      }
    }
  }

  Schema.prototype.normal = {};
  Schema.prototype.property = {};
  Schema.prototype.space = undefined;

  /**
   * @import {Info, Space} from 'property-information'
   */


  /**
   * @param {ReadonlyArray<Schema>} definitions
   *   Definitions.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns {Schema}
   *   Schema.
   */
  function merge(definitions, space) {
    /** @type {Record<string, Info>} */
    const property = {};
    /** @type {Record<string, string>} */
    const normal = {};

    for (const definition of definitions) {
      Object.assign(property, definition.property);
      Object.assign(normal, definition.normal);
    }

    return new Schema(property, normal, space)
  }

  /**
   * Get the cleaned case insensitive form of an attribute or property.
   *
   * @param {string} value
   *   An attribute-like or property-like name.
   * @returns {string}
   *   Value that can be used to look up the properly cased property on a
   *   `Schema`.
   */
  function normalize$1(value) {
    return value.toLowerCase()
  }

  /**
   * @import {Info as InfoType} from 'property-information'
   */

  /** @type {InfoType} */
  class Info {
    /**
     * @param {string} property
     *   Property.
     * @param {string} attribute
     *   Attribute.
     * @returns
     *   Info.
     */
    constructor(property, attribute) {
      this.attribute = attribute;
      this.property = property;
    }
  }

  Info.prototype.attribute = '';
  Info.prototype.booleanish = false;
  Info.prototype.boolean = false;
  Info.prototype.commaOrSpaceSeparated = false;
  Info.prototype.commaSeparated = false;
  Info.prototype.defined = false;
  Info.prototype.mustUseProperty = false;
  Info.prototype.number = false;
  Info.prototype.overloadedBoolean = false;
  Info.prototype.property = '';
  Info.prototype.spaceSeparated = false;
  Info.prototype.space = undefined;

  let powers = 0;

  const boolean = increment();
  const booleanish = increment();
  const overloadedBoolean = increment();
  const number = increment();
  const spaceSeparated = increment();
  const commaSeparated = increment();
  const commaOrSpaceSeparated = increment();

  function increment() {
    return 2 ** ++powers
  }

  var types = /*#__PURE__*/Object.freeze({
    __proto__: null,
    boolean: boolean,
    booleanish: booleanish,
    commaOrSpaceSeparated: commaOrSpaceSeparated,
    commaSeparated: commaSeparated,
    number: number,
    overloadedBoolean: overloadedBoolean,
    spaceSeparated: spaceSeparated
  });

  /**
   * @import {Space} from 'property-information'
   */


  const checks = /** @type {ReadonlyArray<keyof typeof types>} */ (
    Object.keys(types)
  );

  class DefinedInfo extends Info {
    /**
     * @constructor
     * @param {string} property
     *   Property.
     * @param {string} attribute
     *   Attribute.
     * @param {number | null | undefined} [mask]
     *   Mask.
     * @param {Space | undefined} [space]
     *   Space.
     * @returns
     *   Info.
     */
    constructor(property, attribute, mask, space) {
      let index = -1;

      super(property, attribute);

      mark(this, 'space', space);

      if (typeof mask === 'number') {
        while (++index < checks.length) {
          const check = checks[index];
          mark(this, checks[index], (mask & types[check]) === types[check]);
        }
      }
    }
  }

  DefinedInfo.prototype.defined = true;

  /**
   * @template {keyof DefinedInfo} Key
   *   Key type.
   * @param {DefinedInfo} values
   *   Info.
   * @param {Key} key
   *   Key.
   * @param {DefinedInfo[Key]} value
   *   Value.
   * @returns {undefined}
   *   Nothing.
   */
  function mark(values, key, value) {
    if (value) {
      values[key] = value;
    }
  }

  /**
   * @import {Info, Space} from 'property-information'
   */


  /**
   * @param {Definition} definition
   *   Definition.
   * @returns {Schema}
   *   Schema.
   */
  function create(definition) {
    /** @type {Record<string, Info>} */
    const properties = {};
    /** @type {Record<string, string>} */
    const normals = {};

    for (const [property, value] of Object.entries(definition.properties)) {
      const info = new DefinedInfo(
        property,
        definition.transform(definition.attributes || {}, property),
        value,
        definition.space
      );

      if (
        definition.mustUseProperty &&
        definition.mustUseProperty.includes(property)
      ) {
        info.mustUseProperty = true;
      }

      properties[property] = info;

      normals[normalize$1(property)] = property;
      normals[normalize$1(info.attribute)] = property;
    }

    return new Schema(properties, normals, definition.space)
  }

  const aria = create({
    properties: {
      ariaActiveDescendant: null,
      ariaAtomic: booleanish,
      ariaAutoComplete: null,
      ariaBusy: booleanish,
      ariaChecked: booleanish,
      ariaColCount: number,
      ariaColIndex: number,
      ariaColSpan: number,
      ariaControls: spaceSeparated,
      ariaCurrent: null,
      ariaDescribedBy: spaceSeparated,
      ariaDetails: null,
      ariaDisabled: booleanish,
      ariaDropEffect: spaceSeparated,
      ariaErrorMessage: null,
      ariaExpanded: booleanish,
      ariaFlowTo: spaceSeparated,
      ariaGrabbed: booleanish,
      ariaHasPopup: null,
      ariaHidden: booleanish,
      ariaInvalid: null,
      ariaKeyShortcuts: null,
      ariaLabel: null,
      ariaLabelledBy: spaceSeparated,
      ariaLevel: number,
      ariaLive: null,
      ariaModal: booleanish,
      ariaMultiLine: booleanish,
      ariaMultiSelectable: booleanish,
      ariaOrientation: null,
      ariaOwns: spaceSeparated,
      ariaPlaceholder: null,
      ariaPosInSet: number,
      ariaPressed: booleanish,
      ariaReadOnly: booleanish,
      ariaRelevant: null,
      ariaRequired: booleanish,
      ariaRoleDescription: spaceSeparated,
      ariaRowCount: number,
      ariaRowIndex: number,
      ariaRowSpan: number,
      ariaSelected: booleanish,
      ariaSetSize: number,
      ariaSort: null,
      ariaValueMax: number,
      ariaValueMin: number,
      ariaValueNow: number,
      ariaValueText: null,
      role: null
    },
    transform(_, property) {
      return property === 'role'
        ? property
        : 'aria-' + property.slice(4).toLowerCase()
    }
  });

  /**
   * @param {Record<string, string>} attributes
   *   Attributes.
   * @param {string} attribute
   *   Attribute.
   * @returns {string}
   *   Transformed attribute.
   */
  function caseSensitiveTransform(attributes, attribute) {
    return attribute in attributes ? attributes[attribute] : attribute
  }

  /**
   * @param {Record<string, string>} attributes
   *   Attributes.
   * @param {string} property
   *   Property.
   * @returns {string}
   *   Transformed property.
   */
  function caseInsensitiveTransform(attributes, property) {
    return caseSensitiveTransform(attributes, property.toLowerCase())
  }

  const html$3 = create({
    attributes: {
      acceptcharset: 'accept-charset',
      classname: 'class',
      htmlfor: 'for',
      httpequiv: 'http-equiv'
    },
    mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
    properties: {
      // Standard Properties.
      abbr: null,
      accept: commaSeparated,
      acceptCharset: spaceSeparated,
      accessKey: spaceSeparated,
      action: null,
      allow: null,
      allowFullScreen: boolean,
      allowPaymentRequest: boolean,
      allowUserMedia: boolean,
      alpha: boolean,
      alt: null,
      as: null,
      async: boolean,
      autoCapitalize: null,
      autoComplete: spaceSeparated,
      autoFocus: boolean,
      autoPlay: boolean,
      blocking: spaceSeparated,
      capture: null,
      charSet: null,
      checked: boolean,
      cite: null,
      className: spaceSeparated,
      closedBy: null,
      colorSpace: null,
      cols: number,
      colSpan: number,
      command: null,
      commandFor: null,
      content: null,
      contentEditable: booleanish,
      controls: boolean,
      controlsList: spaceSeparated,
      coords: number | commaSeparated,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: boolean,
      defer: boolean,
      dir: null,
      dirName: null,
      disabled: boolean,
      download: overloadedBoolean,
      draggable: booleanish,
      encType: null,
      enterKeyHint: null,
      fetchPriority: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: boolean,
      formTarget: null,
      headers: spaceSeparated,
      height: number,
      hidden: overloadedBoolean,
      high: number,
      href: null,
      hrefLang: null,
      htmlFor: spaceSeparated,
      httpEquiv: spaceSeparated,
      id: null,
      imageSizes: null,
      imageSrcSet: null,
      inert: boolean,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: boolean,
      itemId: null,
      itemProp: spaceSeparated,
      itemRef: spaceSeparated,
      itemScope: boolean,
      itemType: spaceSeparated,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: boolean,
      low: number,
      manifest: null,
      max: null,
      maxLength: number,
      media: null,
      method: null,
      min: null,
      minLength: number,
      multiple: boolean,
      muted: boolean,
      name: null,
      nonce: null,
      noModule: boolean,
      noValidate: boolean,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforeMatch: null,
      onBeforePrint: null,
      onBeforeToggle: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextLost: null,
      onContextMenu: null,
      onContextRestored: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onScrollEnd: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onSlotChange: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: boolean,
      optimum: number,
      pattern: null,
      ping: spaceSeparated,
      placeholder: null,
      playsInline: boolean,
      popover: null,
      popoverTarget: null,
      popoverTargetAction: null,
      poster: null,
      preload: null,
      readOnly: boolean,
      referrerPolicy: null,
      rel: spaceSeparated,
      required: boolean,
      reversed: boolean,
      rows: number,
      rowSpan: number,
      sandbox: spaceSeparated,
      scope: null,
      scoped: boolean,
      seamless: boolean,
      selected: boolean,
      shadowRootClonable: boolean,
      shadowRootCustomElementRegistry: boolean,
      shadowRootDelegatesFocus: boolean,
      shadowRootMode: null,
      shadowRootSerializable: boolean,
      shape: null,
      size: number,
      sizes: null,
      slot: null,
      span: number,
      spellCheck: booleanish,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: null,
      start: number,
      step: null,
      style: null,
      tabIndex: number,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: boolean,
      useMap: null,
      value: booleanish,
      width: number,
      wrap: null,
      writingSuggestions: null,

      // Legacy.
      // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
      align: null, // Several. Use CSS `text-align` instead,
      aLink: null, // `<body>`. Use CSS `a:active {color}` instead
      archive: spaceSeparated, // `<object>`. List of URIs to archives
      axis: null, // `<td>` and `<th>`. Use `scope` on `<th>`
      background: null, // `<body>`. Use CSS `background-image` instead
      bgColor: null, // `<body>` and table elements. Use CSS `background-color` instead
      border: number, // `<table>`. Use CSS `border-width` instead,
      borderColor: null, // `<table>`. Use CSS `border-color` instead,
      bottomMargin: number, // `<body>`
      cellPadding: null, // `<table>`
      cellSpacing: null, // `<table>`
      char: null, // Several table elements. When `align=char`, sets the character to align on
      charOff: null, // Several table elements. When `char`, offsets the alignment
      classId: null, // `<object>`
      clear: null, // `<br>`. Use CSS `clear` instead
      code: null, // `<object>`
      codeBase: null, // `<object>`
      codeType: null, // `<object>`
      color: null, // `<font>` and `<hr>`. Use CSS instead
      compact: boolean, // Lists. Use CSS to reduce space between items instead
      declare: boolean, // `<object>`
      event: null, // `<script>`
      face: null, // `<font>`. Use CSS instead
      frame: null, // `<table>`
      frameBorder: null, // `<iframe>`. Use CSS `border` instead
      hSpace: number, // `<img>` and `<object>`
      leftMargin: number, // `<body>`
      link: null, // `<body>`. Use CSS `a:link {color: *}` instead
      longDesc: null, // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
      lowSrc: null, // `<img>`. Use a `<picture>`
      marginHeight: number, // `<body>`
      marginWidth: number, // `<body>`
      noResize: boolean, // `<frame>`
      noHref: boolean, // `<area>`. Use no href instead of an explicit `nohref`
      noShade: boolean, // `<hr>`. Use background-color and height instead of borders
      noWrap: boolean, // `<td>` and `<th>`
      object: null, // `<applet>`
      profile: null, // `<head>`
      prompt: null, // `<isindex>`
      rev: null, // `<link>`
      rightMargin: number, // `<body>`
      rules: null, // `<table>`
      scheme: null, // `<meta>`
      scrolling: booleanish, // `<frame>`. Use overflow in the child context
      standby: null, // `<object>`
      summary: null, // `<table>`
      text: null, // `<body>`. Use CSS `color` instead
      topMargin: number, // `<body>`
      valueType: null, // `<param>`
      version: null, // `<html>`. Use a doctype.
      vAlign: null, // Several. Use CSS `vertical-align` instead
      vLink: null, // `<body>`. Use CSS `a:visited {color}` instead
      vSpace: number, // `<img>` and `<object>`

      // Non-standard Properties.
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      credentialless: boolean,
      disablePictureInPicture: boolean,
      disableRemotePlayback: boolean,
      exportParts: commaSeparated,
      part: spaceSeparated,
      prefix: null,
      property: null,
      results: number,
      security: null,
      unselectable: null
    },
    space: 'html',
    transform: caseInsensitiveTransform
  });

  const svg$1 = create({
    attributes: {
      accentHeight: 'accent-height',
      alignmentBaseline: 'alignment-baseline',
      arabicForm: 'arabic-form',
      baselineShift: 'baseline-shift',
      capHeight: 'cap-height',
      className: 'class',
      clipPath: 'clip-path',
      clipRule: 'clip-rule',
      colorInterpolation: 'color-interpolation',
      colorInterpolationFilters: 'color-interpolation-filters',
      colorProfile: 'color-profile',
      colorRendering: 'color-rendering',
      crossOrigin: 'crossorigin',
      dataType: 'datatype',
      dominantBaseline: 'dominant-baseline',
      enableBackground: 'enable-background',
      fillOpacity: 'fill-opacity',
      fillRule: 'fill-rule',
      floodColor: 'flood-color',
      floodOpacity: 'flood-opacity',
      fontFamily: 'font-family',
      fontSize: 'font-size',
      fontSizeAdjust: 'font-size-adjust',
      fontStretch: 'font-stretch',
      fontStyle: 'font-style',
      fontVariant: 'font-variant',
      fontWeight: 'font-weight',
      glyphName: 'glyph-name',
      glyphOrientationHorizontal: 'glyph-orientation-horizontal',
      glyphOrientationVertical: 'glyph-orientation-vertical',
      hrefLang: 'hreflang',
      horizAdvX: 'horiz-adv-x',
      horizOriginX: 'horiz-origin-x',
      horizOriginY: 'horiz-origin-y',
      imageRendering: 'image-rendering',
      letterSpacing: 'letter-spacing',
      lightingColor: 'lighting-color',
      markerEnd: 'marker-end',
      markerMid: 'marker-mid',
      markerStart: 'marker-start',
      maskType: 'mask-type',
      navDown: 'nav-down',
      navDownLeft: 'nav-down-left',
      navDownRight: 'nav-down-right',
      navLeft: 'nav-left',
      navNext: 'nav-next',
      navPrev: 'nav-prev',
      navRight: 'nav-right',
      navUp: 'nav-up',
      navUpLeft: 'nav-up-left',
      navUpRight: 'nav-up-right',
      onAbort: 'onabort',
      onActivate: 'onactivate',
      onAfterPrint: 'onafterprint',
      onBeforePrint: 'onbeforeprint',
      onBegin: 'onbegin',
      onCancel: 'oncancel',
      onCanPlay: 'oncanplay',
      onCanPlayThrough: 'oncanplaythrough',
      onChange: 'onchange',
      onClick: 'onclick',
      onClose: 'onclose',
      onCopy: 'oncopy',
      onCueChange: 'oncuechange',
      onCut: 'oncut',
      onDblClick: 'ondblclick',
      onDrag: 'ondrag',
      onDragEnd: 'ondragend',
      onDragEnter: 'ondragenter',
      onDragExit: 'ondragexit',
      onDragLeave: 'ondragleave',
      onDragOver: 'ondragover',
      onDragStart: 'ondragstart',
      onDrop: 'ondrop',
      onDurationChange: 'ondurationchange',
      onEmptied: 'onemptied',
      onEnd: 'onend',
      onEnded: 'onended',
      onError: 'onerror',
      onFocus: 'onfocus',
      onFocusIn: 'onfocusin',
      onFocusOut: 'onfocusout',
      onHashChange: 'onhashchange',
      onInput: 'oninput',
      onInvalid: 'oninvalid',
      onKeyDown: 'onkeydown',
      onKeyPress: 'onkeypress',
      onKeyUp: 'onkeyup',
      onLoad: 'onload',
      onLoadedData: 'onloadeddata',
      onLoadedMetadata: 'onloadedmetadata',
      onLoadStart: 'onloadstart',
      onMessage: 'onmessage',
      onMouseDown: 'onmousedown',
      onMouseEnter: 'onmouseenter',
      onMouseLeave: 'onmouseleave',
      onMouseMove: 'onmousemove',
      onMouseOut: 'onmouseout',
      onMouseOver: 'onmouseover',
      onMouseUp: 'onmouseup',
      onMouseWheel: 'onmousewheel',
      onOffline: 'onoffline',
      onOnline: 'ononline',
      onPageHide: 'onpagehide',
      onPageShow: 'onpageshow',
      onPaste: 'onpaste',
      onPause: 'onpause',
      onPlay: 'onplay',
      onPlaying: 'onplaying',
      onPopState: 'onpopstate',
      onProgress: 'onprogress',
      onRateChange: 'onratechange',
      onRepeat: 'onrepeat',
      onReset: 'onreset',
      onResize: 'onresize',
      onScroll: 'onscroll',
      onSeeked: 'onseeked',
      onSeeking: 'onseeking',
      onSelect: 'onselect',
      onShow: 'onshow',
      onStalled: 'onstalled',
      onStorage: 'onstorage',
      onSubmit: 'onsubmit',
      onSuspend: 'onsuspend',
      onTimeUpdate: 'ontimeupdate',
      onToggle: 'ontoggle',
      onUnload: 'onunload',
      onVolumeChange: 'onvolumechange',
      onWaiting: 'onwaiting',
      onZoom: 'onzoom',
      overlinePosition: 'overline-position',
      overlineThickness: 'overline-thickness',
      paintOrder: 'paint-order',
      panose1: 'panose-1',
      pointerEvents: 'pointer-events',
      referrerPolicy: 'referrerpolicy',
      renderingIntent: 'rendering-intent',
      shapeRendering: 'shape-rendering',
      stopColor: 'stop-color',
      stopOpacity: 'stop-opacity',
      strikethroughPosition: 'strikethrough-position',
      strikethroughThickness: 'strikethrough-thickness',
      strokeDashArray: 'stroke-dasharray',
      strokeDashOffset: 'stroke-dashoffset',
      strokeLineCap: 'stroke-linecap',
      strokeLineJoin: 'stroke-linejoin',
      strokeMiterLimit: 'stroke-miterlimit',
      strokeOpacity: 'stroke-opacity',
      strokeWidth: 'stroke-width',
      tabIndex: 'tabindex',
      textAnchor: 'text-anchor',
      textDecoration: 'text-decoration',
      textRendering: 'text-rendering',
      transformOrigin: 'transform-origin',
      typeOf: 'typeof',
      underlinePosition: 'underline-position',
      underlineThickness: 'underline-thickness',
      unicodeBidi: 'unicode-bidi',
      unicodeRange: 'unicode-range',
      unitsPerEm: 'units-per-em',
      vAlphabetic: 'v-alphabetic',
      vHanging: 'v-hanging',
      vIdeographic: 'v-ideographic',
      vMathematical: 'v-mathematical',
      vectorEffect: 'vector-effect',
      vertAdvY: 'vert-adv-y',
      vertOriginX: 'vert-origin-x',
      vertOriginY: 'vert-origin-y',
      wordSpacing: 'word-spacing',
      writingMode: 'writing-mode',
      xHeight: 'x-height',
      // These were camelcased in Tiny. Now lowercased in SVG 2
      playbackOrder: 'playbackorder',
      timelineBegin: 'timelinebegin'
    },
    properties: {
      about: commaOrSpaceSeparated,
      accentHeight: number,
      accumulate: null,
      additive: null,
      alignmentBaseline: null,
      alphabetic: number,
      amplitude: number,
      arabicForm: null,
      ascent: number,
      attributeName: null,
      attributeType: null,
      azimuth: number,
      bandwidth: null,
      baselineShift: null,
      baseFrequency: null,
      baseProfile: null,
      bbox: null,
      begin: null,
      bias: number,
      by: null,
      calcMode: null,
      capHeight: number,
      className: spaceSeparated,
      clip: null,
      clipPath: null,
      clipPathUnits: null,
      clipRule: null,
      color: null,
      colorInterpolation: null,
      colorInterpolationFilters: null,
      colorProfile: null,
      colorRendering: null,
      content: null,
      contentScriptType: null,
      contentStyleType: null,
      crossOrigin: null,
      cursor: null,
      cx: null,
      cy: null,
      d: null,
      dataType: null,
      defaultAction: null,
      descent: number,
      diffuseConstant: number,
      direction: null,
      display: null,
      dur: null,
      divisor: number,
      dominantBaseline: null,
      download: boolean,
      dx: null,
      dy: null,
      edgeMode: null,
      editable: null,
      elevation: number,
      enableBackground: null,
      end: null,
      event: null,
      exponent: number,
      externalResourcesRequired: null,
      fill: null,
      fillOpacity: number,
      fillRule: null,
      filter: null,
      filterRes: null,
      filterUnits: null,
      floodColor: null,
      floodOpacity: null,
      focusable: null,
      focusHighlight: null,
      fontFamily: null,
      fontSize: null,
      fontSizeAdjust: null,
      fontStretch: null,
      fontStyle: null,
      fontVariant: null,
      fontWeight: null,
      format: null,
      fr: null,
      from: null,
      fx: null,
      fy: null,
      g1: commaSeparated,
      g2: commaSeparated,
      glyphName: commaSeparated,
      glyphOrientationHorizontal: null,
      glyphOrientationVertical: null,
      glyphRef: null,
      gradientTransform: null,
      gradientUnits: null,
      handler: null,
      hanging: number,
      hatchContentUnits: null,
      hatchUnits: null,
      height: null,
      href: null,
      hrefLang: null,
      horizAdvX: number,
      horizOriginX: number,
      horizOriginY: number,
      id: null,
      ideographic: number,
      imageRendering: null,
      initialVisibility: null,
      in: null,
      in2: null,
      intercept: number,
      k: number,
      k1: number,
      k2: number,
      k3: number,
      k4: number,
      kernelMatrix: commaOrSpaceSeparated,
      kernelUnitLength: null,
      keyPoints: null, // SEMI_COLON_SEPARATED
      keySplines: null, // SEMI_COLON_SEPARATED
      keyTimes: null, // SEMI_COLON_SEPARATED
      kerning: null,
      lang: null,
      lengthAdjust: null,
      letterSpacing: null,
      lightingColor: null,
      limitingConeAngle: number,
      local: null,
      markerEnd: null,
      markerMid: null,
      markerStart: null,
      markerHeight: null,
      markerUnits: null,
      markerWidth: null,
      mask: null,
      maskContentUnits: null,
      maskType: null,
      maskUnits: null,
      mathematical: null,
      max: null,
      media: null,
      mediaCharacterEncoding: null,
      mediaContentEncodings: null,
      mediaSize: number,
      mediaTime: null,
      method: null,
      min: null,
      mode: null,
      name: null,
      navDown: null,
      navDownLeft: null,
      navDownRight: null,
      navLeft: null,
      navNext: null,
      navPrev: null,
      navRight: null,
      navUp: null,
      navUpLeft: null,
      navUpRight: null,
      numOctaves: null,
      observer: null,
      offset: null,
      onAbort: null,
      onActivate: null,
      onAfterPrint: null,
      onBeforePrint: null,
      onBegin: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnd: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFocusIn: null,
      onFocusOut: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadStart: null,
      onMessage: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onMouseWheel: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRepeat: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onShow: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onZoom: null,
      opacity: null,
      operator: null,
      order: null,
      orient: null,
      orientation: null,
      origin: null,
      overflow: null,
      overlay: null,
      overlinePosition: number,
      overlineThickness: number,
      paintOrder: null,
      panose1: null,
      path: null,
      pathLength: number,
      patternContentUnits: null,
      patternTransform: null,
      patternUnits: null,
      phase: null,
      ping: spaceSeparated,
      pitch: null,
      playbackOrder: null,
      pointerEvents: null,
      points: null,
      pointsAtX: number,
      pointsAtY: number,
      pointsAtZ: number,
      preserveAlpha: null,
      preserveAspectRatio: null,
      primitiveUnits: null,
      propagate: null,
      property: commaOrSpaceSeparated,
      r: null,
      radius: null,
      referrerPolicy: null,
      refX: null,
      refY: null,
      rel: commaOrSpaceSeparated,
      rev: commaOrSpaceSeparated,
      renderingIntent: null,
      repeatCount: null,
      repeatDur: null,
      requiredExtensions: commaOrSpaceSeparated,
      requiredFeatures: commaOrSpaceSeparated,
      requiredFonts: commaOrSpaceSeparated,
      requiredFormats: commaOrSpaceSeparated,
      resource: null,
      restart: null,
      result: null,
      rotate: null,
      rx: null,
      ry: null,
      scale: null,
      seed: null,
      shapeRendering: null,
      side: null,
      slope: null,
      snapshotTime: null,
      specularConstant: number,
      specularExponent: number,
      spreadMethod: null,
      spacing: null,
      startOffset: null,
      stdDeviation: null,
      stemh: null,
      stemv: null,
      stitchTiles: null,
      stopColor: null,
      stopOpacity: null,
      strikethroughPosition: number,
      strikethroughThickness: number,
      string: null,
      stroke: null,
      strokeDashArray: commaOrSpaceSeparated,
      strokeDashOffset: null,
      strokeLineCap: null,
      strokeLineJoin: null,
      strokeMiterLimit: number,
      strokeOpacity: number,
      strokeWidth: null,
      style: null,
      surfaceScale: number,
      syncBehavior: null,
      syncBehaviorDefault: null,
      syncMaster: null,
      syncTolerance: null,
      syncToleranceDefault: null,
      systemLanguage: commaOrSpaceSeparated,
      tabIndex: number,
      tableValues: null,
      target: null,
      targetX: number,
      targetY: number,
      textAnchor: null,
      textDecoration: null,
      textRendering: null,
      textLength: null,
      timelineBegin: null,
      title: null,
      transformBehavior: null,
      type: null,
      typeOf: commaOrSpaceSeparated,
      to: null,
      transform: null,
      transformOrigin: null,
      u1: null,
      u2: null,
      underlinePosition: number,
      underlineThickness: number,
      unicode: null,
      unicodeBidi: null,
      unicodeRange: null,
      unitsPerEm: number,
      values: null,
      vAlphabetic: number,
      vMathematical: number,
      vectorEffect: null,
      vHanging: number,
      vIdeographic: number,
      version: null,
      vertAdvY: number,
      vertOriginX: number,
      vertOriginY: number,
      viewBox: null,
      viewTarget: null,
      visibility: null,
      width: null,
      widths: null,
      wordSpacing: null,
      writingMode: null,
      x: null,
      x1: null,
      x2: null,
      xChannelSelector: null,
      xHeight: number,
      y: null,
      y1: null,
      y2: null,
      yChannelSelector: null,
      z: null,
      zoomAndPan: null
    },
    space: 'svg',
    transform: caseSensitiveTransform
  });

  const xlink = create({
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null
    },
    space: 'xlink',
    transform(_, property) {
      return 'xlink:' + property.slice(5).toLowerCase()
    }
  });

  const xmlns = create({
    attributes: {xmlnsxlink: 'xmlns:xlink'},
    properties: {xmlnsXLink: null, xmlns: null},
    space: 'xmlns',
    transform: caseInsensitiveTransform
  });

  const xml = create({
    properties: {xmlBase: null, xmlLang: null, xmlSpace: null},
    space: 'xml',
    transform(_, property) {
      return 'xml:' + property.slice(3).toLowerCase()
    }
  });

  /**
   * @import {Schema} from 'property-information'
   */


  const cap = /[A-Z]/g;
  const dash = /-[a-z]/g;
  const valid = /^data[-\w.:]+$/i;

  /**
   * Look up info on a property.
   *
   * In most cases the given `schema` contains info on the property.
   * All standard,
   * most legacy,
   * and some non-standard properties are supported.
   * For these cases,
   * the returned `Info` has hints about the value of the property.
   *
   * `name` can also be a valid data attribute or property,
   * in which case an `Info` object with the correctly cased `attribute` and
   * `property` is returned.
   *
   * `name` can be an unknown attribute,
   * in which case an `Info` object with `attribute` and `property` set to the
   * given name is returned.
   * It is not recommended to provide unsupported legacy or recently specced
   * properties.
   *
   *
   * @param {Schema} schema
   *   Schema;
   *   either the `html` or `svg` export.
   * @param {string} value
   *   An attribute-like or property-like name;
   *   it will be passed through `normalize` to hopefully find the correct info.
   * @returns {Info}
   *   Info.
   */
  function find(schema, value) {
    const normal = normalize$1(value);
    let property = value;
    let Type = Info;

    if (normal in schema.normal) {
      return schema.property[schema.normal[normal]]
    }

    if (normal.length > 4 && normal.slice(0, 4) === 'data' && valid.test(value)) {
      // Attribute or property.
      if (value.charAt(4) === '-') {
        // Turn it into a property.
        const rest = value.slice(5).replace(dash, camelcase$1);
        property = 'data' + rest.charAt(0).toUpperCase() + rest.slice(1);
      } else {
        // Turn it into an attribute.
        const rest = value.slice(4);

        if (!dash.test(rest)) {
          let dashes = rest.replace(cap, kebab);

          if (dashes.charAt(0) !== '-') {
            dashes = '-' + dashes;
          }

          value = 'data' + dashes;
        }
      }

      Type = DefinedInfo;
    }

    return new Type(property, value)
  }

  /**
   * @param {string} $0
   *   Value.
   * @returns {string}
   *   Kebab.
   */
  function kebab($0) {
    return '-' + $0.toLowerCase()
  }

  /**
   * @param {string} $0
   *   Value.
   * @returns {string}
   *   Camel.
   */
  function camelcase$1($0) {
    return $0.charAt(1).toUpperCase()
  }

  // Note: types exposed from `index.d.ts`.

  const html$2 = merge([aria, html$3, xlink, xmlns, xml], 'html');

  const svg = merge([aria, svg$1, xlink, xmlns, xml], 'svg');

  /**
   * @typedef Options
   *   Configuration for `stringify`.
   * @property {boolean} [padLeft=true]
   *   Whether to pad a space before a token.
   * @property {boolean} [padRight=false]
   *   Whether to pad a space after a token.
   */

  /**
   * @typedef {Options} StringifyOptions
   *   Please use `StringifyOptions` instead.
   */

  /**
   * Parse comma-separated tokens to an array.
   *
   * @param {string} value
   *   Comma-separated tokens.
   * @returns {Array<string>}
   *   List of tokens.
   */
  function parse$2(value) {
    /** @type {Array<string>} */
    const tokens = [];
    const input = String(value || '');
    let index = input.indexOf(',');
    let start = 0;
    /** @type {boolean} */
    let end = false;

    while (!end) {
      if (index === -1) {
        index = input.length;
        end = true;
      }

      const token = input.slice(start, index).trim();

      if (token || !end) {
        tokens.push(token);
      }

      start = index + 1;
      index = input.indexOf(',', start);
    }

    return tokens
  }

  /**
   * Serialize an array of strings or numbers to comma-separated tokens.
   *
   * @param {Array<string|number>} values
   *   List of tokens.
   * @param {Options} [options]
   *   Configuration for `stringify` (optional).
   * @returns {string}
   *   Comma-separated tokens.
   */
  function stringify$1(values, options) {
    const settings = options || {};

    // Ensure the last empty entry is seen.
    const input = values[values.length - 1] === '' ? [...values, ''] : values;

    return input
      .join(
        (settings.padRight ? ' ' : '') +
          ',' +
          (settings.padLeft === false ? '' : ' ')
      )
      .trim()
  }

  /**
   * @typedef {import('hast').Element} Element
   * @typedef {import('hast').Properties} Properties
   */

  /**
   * @template {string} SimpleSelector
   *   Selector type.
   * @template {string} DefaultTagName
   *   Default tag name.
   * @typedef {(
   *   SimpleSelector extends ''
   *     ? DefaultTagName
   *     : SimpleSelector extends `${infer TagName}.${infer Rest}`
   *     ? ExtractTagName<TagName, DefaultTagName>
   *     : SimpleSelector extends `${infer TagName}#${infer Rest}`
   *     ? ExtractTagName<TagName, DefaultTagName>
   *     : SimpleSelector extends string
   *     ? SimpleSelector
   *     : DefaultTagName
   * )} ExtractTagName
   *   Extract tag name from a simple selector.
   */

  const search = /[#.]/g;

  /**
   * Create a hast element from a simple CSS selector.
   *
   * @template {string} Selector
   *   Type of selector.
   * @template {string} [DefaultTagName='div']
   *   Type of default tag name (default: `'div'`).
   * @param {Selector | null | undefined} [selector]
   *   Simple CSS selector (optional).
   *
   *   Can contain a tag name (`foo`), classes (`.bar`), and an ID (`#baz`).
   *   Multiple classes are allowed.
   *   Uses the last ID if multiple IDs are found.
   * @param {DefaultTagName | null | undefined} [defaultTagName='div']
   *   Tag name to use if `selector` does not specify one (default: `'div'`).
   * @returns {Element & {tagName: ExtractTagName<Selector, DefaultTagName>}}
   *   Built element.
   */
  function parseSelector(selector, defaultTagName) {
    const value = selector || '';
    /** @type {Properties} */
    const props = {};
    let start = 0;
    /** @type {string | undefined} */
    let previous;
    /** @type {string | undefined} */
    let tagName;

    while (start < value.length) {
      search.lastIndex = start;
      const match = search.exec(value);
      const subvalue = value.slice(start, match ? match.index : value.length);

      if (subvalue) {
        if (!previous) {
          tagName = subvalue;
        } else if (previous === '#') {
          props.id = subvalue;
        } else if (Array.isArray(props.className)) {
          props.className.push(subvalue);
        } else {
          props.className = [subvalue];
        }

        start += subvalue.length;
      }

      if (match) {
        previous = match[0];
        start++;
      }
    }

    return {
      type: 'element',
      // @ts-expect-error: tag name is parsed.
      tagName: tagName || defaultTagName || 'div',
      properties: props,
      children: []
    }
  }

  /**
   * Parse space-separated tokens to an array of strings.
   *
   * @param {string} value
   *   Space-separated tokens.
   * @returns {Array<string>}
   *   List of tokens.
   */
  function parse$1(value) {
    const input = String(value || '').trim();
    return input ? input.split(/[ \t\n\r\f]+/g) : []
  }

  /**
   * Serialize an array of strings as space separated-tokens.
   *
   * @param {Array<string|number>} values
   *   List of tokens.
   * @returns {string}
   *   Space-separated tokens.
   */
  function stringify(values) {
    return values.join(' ').trim()
  }

  /**
   * @import {Element, Nodes, RootContent, Root} from 'hast'
   * @import {Info, Schema} from 'property-information'
   */


  /**
   * @param {Schema} schema
   *   Schema to use.
   * @param {string} defaultTagName
   *   Default tag name.
   * @param {ReadonlyArray<string> | undefined} [caseSensitive]
   *   Case-sensitive tag names (default: `undefined`).
   * @returns
   *   `h`.
   */
  function createH(schema, defaultTagName, caseSensitive) {
    const adjust = caseSensitive ? createAdjustMap(caseSensitive) : undefined;

    /**
     * Hyperscript compatible DSL for creating virtual hast trees.
     *
     * @overload
     * @param {null | undefined} [selector]
     * @param {...Child} children
     * @returns {Root}
     *
     * @overload
     * @param {string} selector
     * @param {Properties} properties
     * @param {...Child} children
     * @returns {Element}
     *
     * @overload
     * @param {string} selector
     * @param {...Child} children
     * @returns {Element}
     *
     * @param {string | null | undefined} [selector]
     *   Selector.
     * @param {Child | Properties | null | undefined} [properties]
     *   Properties (or first child) (default: `undefined`).
     * @param {...Child} children
     *   Children.
     * @returns {Result}
     *   Result.
     */
    function h(selector, properties, ...children) {
      /** @type {Result} */
      let node;

      if (selector === null || selector === undefined) {
        node = {type: 'root', children: []};
        // Properties are not supported for roots.
        const child = /** @type {Child} */ (properties);
        children.unshift(child);
      } else {
        node = parseSelector(selector, defaultTagName);
        // Normalize the name.
        const lower = node.tagName.toLowerCase();
        const adjusted = adjust ? adjust.get(lower) : undefined;
        node.tagName = adjusted || lower;

        // Handle properties.
        if (isChild(properties)) {
          children.unshift(properties);
        } else {
          for (const [key, value] of Object.entries(properties)) {
            addProperty(schema, node.properties, key, value);
          }
        }
      }

      // Handle children.
      for (const child of children) {
        addChild(node.children, child);
      }

      if (node.type === 'element' && node.tagName === 'template') {
        node.content = {type: 'root', children: node.children};
        node.children = [];
      }

      return node
    }

    return h
  }

  /**
   * Check if something is properties or a child.
   *
   * @param {Child | Properties} value
   *   Value to check.
   * @returns {value is Child}
   *   Whether `value` is definitely a child.
   */
  function isChild(value) {
    // Never properties if not an object.
    if (value === null || typeof value !== 'object' || Array.isArray(value)) {
      return true
    }

    // Never node without `type`; that’s the main discriminator.
    if (typeof value.type !== 'string') return false

    // Slower check: never property value if object or array with
    // non-number/strings.
    const record = /** @type {Record<string, unknown>} */ (value);
    const keys = Object.keys(value);

    for (const key of keys) {
      const value = record[key];

      if (value && typeof value === 'object') {
        if (!Array.isArray(value)) return true

        const list = /** @type {ReadonlyArray<unknown>} */ (value);

        for (const item of list) {
          if (typeof item !== 'number' && typeof item !== 'string') {
            return true
          }
        }
      }
    }

    // Also see empty `children` as a node.
    if ('children' in value && Array.isArray(value.children)) {
      return true
    }

    // Default to properties, someone can always pass an empty object,
    // put `data: {}` in a node,
    // or wrap it in an array.
    return false
  }

  /**
   * @param {Schema} schema
   *   Schema.
   * @param {Properties} properties
   *   Properties object.
   * @param {string} key
   *   Property name.
   * @param {PropertyValue | Style} value
   *   Property value.
   * @returns {undefined}
   *   Nothing.
   */
  function addProperty(schema, properties, key, value) {
    const info = find(schema, key);
    /** @type {PropertyValue} */
    let result;

    // Ignore nullish and NaN values.
    if (value === null || value === undefined) return

    if (typeof value === 'number') {
      // Ignore NaN.
      if (Number.isNaN(value)) return

      result = value;
    }
    // Booleans.
    else if (typeof value === 'boolean') {
      result = value;
    }
    // Handle list values.
    else if (typeof value === 'string') {
      if (info.spaceSeparated) {
        result = parse$1(value);
      } else if (info.commaSeparated) {
        result = parse$2(value);
      } else if (info.commaOrSpaceSeparated) {
        result = parse$1(parse$2(value).join(' '));
      } else {
        result = parsePrimitive(info, info.property, value);
      }
    } else if (Array.isArray(value)) {
      result = [...value];
    } else {
      result = info.property === 'style' ? style(value) : String(value);
    }

    if (Array.isArray(result)) {
      /** @type {Array<number | string>} */
      const finalResult = [];

      for (const item of result) {
        // Assume no booleans in array.
        finalResult.push(
          /** @type {number | string} */ (
            parsePrimitive(info, info.property, item)
          )
        );
      }

      result = finalResult;
    }

    // Class names (which can be added both on the `selector` and here).
    if (info.property === 'className' && Array.isArray(properties.className)) {
      // Assume no booleans in `className`.
      result = properties.className.concat(
        /** @type {Array<number | string> | number | string} */ (result)
      );
    }

    properties[info.property] = result;
  }

  /**
   * @param {Array<RootContent>} nodes
   *   Children.
   * @param {Child} value
   *   Child.
   * @returns {undefined}
   *   Nothing.
   */
  function addChild(nodes, value) {
    if (value === null || value === undefined) ; else if (typeof value === 'number' || typeof value === 'string') {
      nodes.push({type: 'text', value: String(value)});
    } else if (Array.isArray(value)) {
      for (const child of value) {
        addChild(nodes, child);
      }
    } else if (typeof value === 'object' && 'type' in value) {
      if (value.type === 'root') {
        addChild(nodes, value.children);
      } else {
        nodes.push(value);
      }
    } else {
      throw new Error('Expected node, nodes, or string, got `' + value + '`')
    }
  }

  /**
   * Parse a single primitives.
   *
   * @param {Info} info
   *   Property information.
   * @param {string} name
   *   Property name.
   * @param {PrimitiveValue} value
   *   Property value.
   * @returns {PrimitiveValue}
   *   Property value.
   */
  function parsePrimitive(info, name, value) {
    if (typeof value === 'string') {
      if (info.number && value && !Number.isNaN(Number(value))) {
        return Number(value)
      }

      if (
        (info.boolean || info.overloadedBoolean) &&
        (value === '' || normalize$1(value) === normalize$1(name))
      ) {
        return true
      }
    }

    return value
  }

  /**
   * Serialize a `style` object as a string.
   *
   * @param {Style} styles
   *   Style object.
   * @returns {string}
   *   CSS string.
   */
  function style(styles) {
    /** @type {Array<string>} */
    const result = [];

    for (const [key, value] of Object.entries(styles)) {
      result.push([key, value].join(': '));
    }

    return result.join('; ')
  }

  /**
   * Create a map to adjust casing.
   *
   * @param {ReadonlyArray<string>} values
   *   List of properly cased keys.
   * @returns {Map<string, string>}
   *   Map of lowercase keys to uppercase keys.
   */
  function createAdjustMap(values) {
    /** @type {Map<string, string>} */
    const result = new Map();

    for (const value of values) {
      result.set(value.toLowerCase(), value);
    }

    return result
  }

  /**
   * List of case-sensitive SVG tag names.
   *
   * @type {ReadonlyArray<string>}
   */
  const svgCaseSensitiveTagNames = [
    'altGlyph',
    'altGlyphDef',
    'altGlyphItem',
    'animateColor',
    'animateMotion',
    'animateTransform',
    'clipPath',
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDistantLight',
    'feDropShadow',
    'feFlood',
    'feFuncA',
    'feFuncB',
    'feFuncG',
    'feFuncR',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'fePointLight',
    'feSpecularLighting',
    'feSpotLight',
    'feTile',
    'feTurbulence',
    'foreignObject',
    'glyphRef',
    'linearGradient',
    'radialGradient',
    'solidColor',
    'textArea',
    'textPath'
  ];

  // Register the JSX namespace on `h`.
  /**
   * @typedef {import('./jsx-classic.js').Element} h.JSX.Element
   * @typedef {import('./jsx-classic.js').ElementChildrenAttribute} h.JSX.ElementChildrenAttribute
   * @typedef {import('./jsx-classic.js').IntrinsicAttributes} h.JSX.IntrinsicAttributes
   * @typedef {import('./jsx-classic.js').IntrinsicElements} h.JSX.IntrinsicElements
   */


  // Note: this explicit type is needed, otherwise TS creates broken types.
  /** @type {ReturnType<createH>} */
  const h = createH(html$2, 'div');

  // Note: this explicit type is needed, otherwise TS creates broken types.
  /** @type {ReturnType<createH>} */
  const s = createH(svg, 'g', svgCaseSensitiveTagNames);

  /**
   * @import {VFile, Value} from 'vfile'
   * @import {Location} from 'vfile-location'
   */

  /**
   * Create an index of the given document to translate between line/column and
   * offset based positional info.
   *
   * Also implemented in Rust in [`wooorm/markdown-rs`][markdown-rs].
   *
   * [markdown-rs]: https://github.com/wooorm/markdown-rs/blob/main/src/util/location.rs
   *
   * @param {VFile | Value} file
   *   File to index.
   * @returns {Location}
   *   Accessors for index.
   */
  function location(file) {
    const value = String(file);
    /**
     * List, where each index is a line number (0-based), and each value is the
     * byte index *after* where the line ends.
     *
     * @type {Array<number>}
     */
    const indices = [];

    return {toOffset, toPoint}

    /** @type {Location['toPoint']} */
    function toPoint(offset) {
      if (typeof offset === 'number' && offset > -1 && offset <= value.length) {
        let index = 0;

        while (true) {
          let end = indices[index];

          if (end === undefined) {
            const eol = next(value, indices[index - 1]);
            end = eol === -1 ? value.length + 1 : eol + 1;
            indices[index] = end;
          }

          if (end > offset) {
            return {
              line: index + 1,
              column: offset - (index > 0 ? indices[index - 1] : 0) + 1,
              offset
            }
          }

          index++;
        }
      }
    }

    /** @type {Location['toOffset']} */
    function toOffset(point) {
      if (
        point &&
        typeof point.line === 'number' &&
        typeof point.column === 'number' &&
        !Number.isNaN(point.line) &&
        !Number.isNaN(point.column)
      ) {
        while (indices.length < point.line) {
          const from = indices[indices.length - 1];
          const eol = next(value, from);
          const end = eol === -1 ? value.length + 1 : eol + 1;
          if (from === end) break
          indices.push(end);
        }

        const offset =
          (point.line > 1 ? indices[point.line - 2] : 0) + point.column - 1;
        // The given `column` could not exist on this line.
        if (offset < indices[point.line - 1]) return offset
      }
    }
  }

  /**
   * @param {string} value
   * @param {number} from
   */
  function next(value, from) {
    const cr = value.indexOf('\r', from);
    const lf = value.indexOf('\n', from);
    if (lf === -1) return cr
    if (cr === -1 || cr + 1 === lf) return lf
    return cr < lf ? cr : lf
  }

  /**
   * Map of web namespaces.
   *
   * @type {Record<string, string>}
   */
  const webNamespaces = {
    svg: 'http://www.w3.org/2000/svg'};

  /**
   * @import {ElementData, Element, Nodes, RootContent, Root} from 'hast'
   * @import {DefaultTreeAdapterMap, Token} from 'parse5'
   * @import {Schema} from 'property-information'
   * @import {Point, Position} from 'unist'
   * @import {VFile} from 'vfile'
   * @import {Options} from 'hast-util-from-parse5'
   */


  const own$4 = {}.hasOwnProperty;
  /** @type {unknown} */
  // type-coverage:ignore-next-line
  const proto = Object.prototype;

  /**
   * Transform a `parse5` AST to hast.
   *
   * @param {DefaultTreeAdapterMap['node']} tree
   *   `parse5` tree to transform.
   * @param {Options | null | undefined} [options]
   *   Configuration (optional).
   * @returns {Nodes}
   *   hast tree.
   */
  function fromParse5(tree, options) {
    const settings = options || {};

    return one$1(
      {
        file: settings.file || undefined,
        location: false,
        schema: settings.space === 'svg' ? svg : html$2,
        verbose: settings.verbose || false
      },
      tree
    )
  }

  /**
   * Transform a node.
   *
   * @param {State} state
   *   Info passed around about the current state.
   * @param {DefaultTreeAdapterMap['node']} node
   *   p5 node.
   * @returns {Nodes}
   *   hast node.
   */
  function one$1(state, node) {
    /** @type {Nodes} */
    let result;

    switch (node.nodeName) {
      case '#comment': {
        const reference = /** @type {DefaultTreeAdapterMap['commentNode']} */ (
          node
        );
        result = {type: 'comment', value: reference.data};
        patch(state, reference, result);
        return result
      }

      case '#document':
      case '#document-fragment': {
        const reference =
          /** @type {DefaultTreeAdapterMap['document'] | DefaultTreeAdapterMap['documentFragment']} */ (
            node
          );
        const quirksMode =
          'mode' in reference
            ? reference.mode === 'quirks' || reference.mode === 'limited-quirks'
            : false;

        result = {
          type: 'root',
          children: all$2(state, node.childNodes),
          data: {quirksMode}
        };

        if (state.file && state.location) {
          const document = String(state.file);
          const loc = location(document);
          const start = loc.toPoint(0);
          const end = loc.toPoint(document.length);
          result.position = {start, end};
        }

        return result
      }

      case '#documentType': {
        const reference = /** @type {DefaultTreeAdapterMap['documentType']} */ (
          node
        );
        result = {type: 'doctype'};
        patch(state, reference, result);
        return result
      }

      case '#text': {
        const reference = /** @type {DefaultTreeAdapterMap['textNode']} */ (node);
        result = {type: 'text', value: reference.value};
        patch(state, reference, result);
        return result
      }

      // Element.
      default: {
        const reference = /** @type {DefaultTreeAdapterMap['element']} */ (node);
        result = element$2(state, reference);
        return result
      }
    }
  }

  /**
   * Transform children.
   *
   * @param {State} state
   *   Info passed around about the current state.
   * @param {Array<DefaultTreeAdapterMap['node']>} nodes
   *   Nodes.
   * @returns {Array<RootContent>}
   *   hast nodes.
   */
  function all$2(state, nodes) {
    let index = -1;
    /** @type {Array<RootContent>} */
    const results = [];

    while (++index < nodes.length) {
      // Assume no roots in `nodes`.
      const result = /** @type {RootContent} */ (one$1(state, nodes[index]));
      results.push(result);
    }

    return results
  }

  /**
   * Transform an element.
   *
   * @param {State} state
   *   Info passed around about the current state.
   * @param {DefaultTreeAdapterMap['element']} node
   *   `parse5` node to transform.
   * @returns {Element}
   *   hast node.
   */
  function element$2(state, node) {
    const schema = state.schema;

    state.schema = node.namespaceURI === webNamespaces.svg ? svg : html$2;

    // Props.
    let index = -1;
    /** @type {Record<string, string>} */
    const properties = {};

    while (++index < node.attrs.length) {
      const attribute = node.attrs[index];
      const name =
        (attribute.prefix ? attribute.prefix + ':' : '') + attribute.name;
      if (!own$4.call(proto, name)) {
        properties[name] = attribute.value;
      }
    }

    // Build.
    const x = state.schema.space === 'svg' ? s : h;
    const result = x(node.tagName, properties, all$2(state, node.childNodes));
    patch(state, node, result);

    // Switch content.
    if (result.tagName === 'template') {
      const reference = /** @type {DefaultTreeAdapterMap['template']} */ (node);
      const pos = reference.sourceCodeLocation;
      const startTag = pos && pos.startTag && position$1(pos.startTag);
      const endTag = pos && pos.endTag && position$1(pos.endTag);

      // Root in, root out.
      const content = /** @type {Root} */ (one$1(state, reference.content));

      if (startTag && endTag && state.file) {
        content.position = {start: startTag.end, end: endTag.start};
      }

      result.content = content;
    }

    state.schema = schema;

    return result
  }

  /**
   * Patch positional info from `from` onto `to`.
   *
   * @param {State} state
   *   Info passed around about the current state.
   * @param {DefaultTreeAdapterMap['node']} from
   *   p5 node.
   * @param {Nodes} to
   *   hast node.
   * @returns {undefined}
   *   Nothing.
   */
  function patch(state, from, to) {
    if ('sourceCodeLocation' in from && from.sourceCodeLocation && state.file) {
      const position = createLocation(state, to, from.sourceCodeLocation);

      if (position) {
        state.location = true;
        to.position = position;
      }
    }
  }

  /**
   * Create clean positional information.
   *
   * @param {State} state
   *   Info passed around about the current state.
   * @param {Nodes} node
   *   hast node.
   * @param {Token.ElementLocation} location
   *   p5 location info.
   * @returns {Position | undefined}
   *   Position, or nothing.
   */
  function createLocation(state, node, location) {
    const result = position$1(location);

    if (node.type === 'element') {
      const tail = node.children[node.children.length - 1];

      // Bug for unclosed with children.
      // See: <https://github.com/inikulin/parse5/issues/109>.
      if (
        result &&
        !location.endTag &&
        tail &&
        tail.position &&
        tail.position.end
      ) {
        result.end = Object.assign({}, tail.position.end);
      }

      if (state.verbose) {
        /** @type {Record<string, Position | undefined>} */
        const properties = {};
        /** @type {string} */
        let key;

        if (location.attrs) {
          for (key in location.attrs) {
            if (own$4.call(location.attrs, key)) {
              properties[find(state.schema, key).property] = position$1(
                location.attrs[key]
              );
            }
          }
        }

        ok$1(location.startTag);
        const opening = position$1(location.startTag);
        const closing = location.endTag ? position$1(location.endTag) : undefined;
        /** @type {ElementData['position']} */
        const data = {opening};
        if (closing) data.closing = closing;
        data.properties = properties;

        node.data = {position: data};
      }
    }

    return result
  }

  /**
   * Turn a p5 location into a position.
   *
   * @param {Token.Location} loc
   *   Location.
   * @returns {Position | undefined}
   *   Position or nothing.
   */
  function position$1(loc) {
    const start = point$1({
      line: loc.startLine,
      column: loc.startCol,
      offset: loc.startOffset
    });
    const end = point$1({
      line: loc.endLine,
      column: loc.endCol,
      offset: loc.endOffset
    });

    // @ts-expect-error: we do use `undefined` for points if one or the other
    // exists.
    return start || end ? {start, end} : undefined
  }

  /**
   * Filter out invalid points.
   *
   * @param {Point} point
   *   Point with potentially `undefined` values.
   * @returns {Point | undefined}
   *   Point or nothing.
   */
  function point$1(point) {
    return point.line && point.column ? point : undefined
  }

  const UNDEFINED_CODE_POINTS = new Set([
      65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214,
      393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894,
      720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574,
      1048575, 1114110, 1114111,
  ]);
  const REPLACEMENT_CHARACTER = '\uFFFD';
  var CODE_POINTS;
  (function (CODE_POINTS) {
      CODE_POINTS[CODE_POINTS["EOF"] = -1] = "EOF";
      CODE_POINTS[CODE_POINTS["NULL"] = 0] = "NULL";
      CODE_POINTS[CODE_POINTS["TABULATION"] = 9] = "TABULATION";
      CODE_POINTS[CODE_POINTS["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
      CODE_POINTS[CODE_POINTS["LINE_FEED"] = 10] = "LINE_FEED";
      CODE_POINTS[CODE_POINTS["FORM_FEED"] = 12] = "FORM_FEED";
      CODE_POINTS[CODE_POINTS["SPACE"] = 32] = "SPACE";
      CODE_POINTS[CODE_POINTS["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
      CODE_POINTS[CODE_POINTS["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
      CODE_POINTS[CODE_POINTS["AMPERSAND"] = 38] = "AMPERSAND";
      CODE_POINTS[CODE_POINTS["APOSTROPHE"] = 39] = "APOSTROPHE";
      CODE_POINTS[CODE_POINTS["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
      CODE_POINTS[CODE_POINTS["SOLIDUS"] = 47] = "SOLIDUS";
      CODE_POINTS[CODE_POINTS["DIGIT_0"] = 48] = "DIGIT_0";
      CODE_POINTS[CODE_POINTS["DIGIT_9"] = 57] = "DIGIT_9";
      CODE_POINTS[CODE_POINTS["SEMICOLON"] = 59] = "SEMICOLON";
      CODE_POINTS[CODE_POINTS["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
      CODE_POINTS[CODE_POINTS["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
      CODE_POINTS[CODE_POINTS["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
      CODE_POINTS[CODE_POINTS["QUESTION_MARK"] = 63] = "QUESTION_MARK";
      CODE_POINTS[CODE_POINTS["LATIN_CAPITAL_A"] = 65] = "LATIN_CAPITAL_A";
      CODE_POINTS[CODE_POINTS["LATIN_CAPITAL_Z"] = 90] = "LATIN_CAPITAL_Z";
      CODE_POINTS[CODE_POINTS["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
      CODE_POINTS[CODE_POINTS["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
      CODE_POINTS[CODE_POINTS["LATIN_SMALL_A"] = 97] = "LATIN_SMALL_A";
      CODE_POINTS[CODE_POINTS["LATIN_SMALL_Z"] = 122] = "LATIN_SMALL_Z";
  })(CODE_POINTS || (CODE_POINTS = {}));
  const SEQUENCES = {
      DASH_DASH: '--',
      CDATA_START: '[CDATA[',
      DOCTYPE: 'doctype',
      SCRIPT: 'script',
      PUBLIC: 'public',
      SYSTEM: 'system',
  };
  //Surrogates
  function isSurrogate(cp) {
      return cp >= 55296 && cp <= 57343;
  }
  function isSurrogatePair(cp) {
      return cp >= 56320 && cp <= 57343;
  }
  function getSurrogatePairCodePoint(cp1, cp2) {
      return (cp1 - 55296) * 1024 + 9216 + cp2;
  }
  //NOTE: excluding NULL and ASCII whitespace
  function isControlCodePoint(cp) {
      return ((cp !== 0x20 && cp !== 0x0a && cp !== 0x0d && cp !== 0x09 && cp !== 0x0c && cp >= 0x01 && cp <= 0x1f) ||
          (cp >= 0x7f && cp <= 0x9f));
  }
  function isUndefinedCodePoint(cp) {
      return (cp >= 64976 && cp <= 65007) || UNDEFINED_CODE_POINTS.has(cp);
  }

  var ERR;
  (function (ERR) {
      ERR["controlCharacterInInputStream"] = "control-character-in-input-stream";
      ERR["noncharacterInInputStream"] = "noncharacter-in-input-stream";
      ERR["surrogateInInputStream"] = "surrogate-in-input-stream";
      ERR["nonVoidHtmlElementStartTagWithTrailingSolidus"] = "non-void-html-element-start-tag-with-trailing-solidus";
      ERR["endTagWithAttributes"] = "end-tag-with-attributes";
      ERR["endTagWithTrailingSolidus"] = "end-tag-with-trailing-solidus";
      ERR["unexpectedSolidusInTag"] = "unexpected-solidus-in-tag";
      ERR["unexpectedNullCharacter"] = "unexpected-null-character";
      ERR["unexpectedQuestionMarkInsteadOfTagName"] = "unexpected-question-mark-instead-of-tag-name";
      ERR["invalidFirstCharacterOfTagName"] = "invalid-first-character-of-tag-name";
      ERR["unexpectedEqualsSignBeforeAttributeName"] = "unexpected-equals-sign-before-attribute-name";
      ERR["missingEndTagName"] = "missing-end-tag-name";
      ERR["unexpectedCharacterInAttributeName"] = "unexpected-character-in-attribute-name";
      ERR["unknownNamedCharacterReference"] = "unknown-named-character-reference";
      ERR["missingSemicolonAfterCharacterReference"] = "missing-semicolon-after-character-reference";
      ERR["unexpectedCharacterAfterDoctypeSystemIdentifier"] = "unexpected-character-after-doctype-system-identifier";
      ERR["unexpectedCharacterInUnquotedAttributeValue"] = "unexpected-character-in-unquoted-attribute-value";
      ERR["eofBeforeTagName"] = "eof-before-tag-name";
      ERR["eofInTag"] = "eof-in-tag";
      ERR["missingAttributeValue"] = "missing-attribute-value";
      ERR["missingWhitespaceBetweenAttributes"] = "missing-whitespace-between-attributes";
      ERR["missingWhitespaceAfterDoctypePublicKeyword"] = "missing-whitespace-after-doctype-public-keyword";
      ERR["missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers"] = "missing-whitespace-between-doctype-public-and-system-identifiers";
      ERR["missingWhitespaceAfterDoctypeSystemKeyword"] = "missing-whitespace-after-doctype-system-keyword";
      ERR["missingQuoteBeforeDoctypePublicIdentifier"] = "missing-quote-before-doctype-public-identifier";
      ERR["missingQuoteBeforeDoctypeSystemIdentifier"] = "missing-quote-before-doctype-system-identifier";
      ERR["missingDoctypePublicIdentifier"] = "missing-doctype-public-identifier";
      ERR["missingDoctypeSystemIdentifier"] = "missing-doctype-system-identifier";
      ERR["abruptDoctypePublicIdentifier"] = "abrupt-doctype-public-identifier";
      ERR["abruptDoctypeSystemIdentifier"] = "abrupt-doctype-system-identifier";
      ERR["cdataInHtmlContent"] = "cdata-in-html-content";
      ERR["incorrectlyOpenedComment"] = "incorrectly-opened-comment";
      ERR["eofInScriptHtmlCommentLikeText"] = "eof-in-script-html-comment-like-text";
      ERR["eofInDoctype"] = "eof-in-doctype";
      ERR["nestedComment"] = "nested-comment";
      ERR["abruptClosingOfEmptyComment"] = "abrupt-closing-of-empty-comment";
      ERR["eofInComment"] = "eof-in-comment";
      ERR["incorrectlyClosedComment"] = "incorrectly-closed-comment";
      ERR["eofInCdata"] = "eof-in-cdata";
      ERR["absenceOfDigitsInNumericCharacterReference"] = "absence-of-digits-in-numeric-character-reference";
      ERR["nullCharacterReference"] = "null-character-reference";
      ERR["surrogateCharacterReference"] = "surrogate-character-reference";
      ERR["characterReferenceOutsideUnicodeRange"] = "character-reference-outside-unicode-range";
      ERR["controlCharacterReference"] = "control-character-reference";
      ERR["noncharacterCharacterReference"] = "noncharacter-character-reference";
      ERR["missingWhitespaceBeforeDoctypeName"] = "missing-whitespace-before-doctype-name";
      ERR["missingDoctypeName"] = "missing-doctype-name";
      ERR["invalidCharacterSequenceAfterDoctypeName"] = "invalid-character-sequence-after-doctype-name";
      ERR["duplicateAttribute"] = "duplicate-attribute";
      ERR["nonConformingDoctype"] = "non-conforming-doctype";
      ERR["missingDoctype"] = "missing-doctype";
      ERR["misplacedDoctype"] = "misplaced-doctype";
      ERR["endTagWithoutMatchingOpenElement"] = "end-tag-without-matching-open-element";
      ERR["closingOfElementWithOpenChildElements"] = "closing-of-element-with-open-child-elements";
      ERR["disallowedContentInNoscriptInHead"] = "disallowed-content-in-noscript-in-head";
      ERR["openElementsLeftAfterEof"] = "open-elements-left-after-eof";
      ERR["abandonedHeadElementChild"] = "abandoned-head-element-child";
      ERR["misplacedStartTagForHeadElement"] = "misplaced-start-tag-for-head-element";
      ERR["nestedNoscriptInHead"] = "nested-noscript-in-head";
      ERR["eofInElementThatCanContainOnlyText"] = "eof-in-element-that-can-contain-only-text";
  })(ERR || (ERR = {}));

  //Const
  const DEFAULT_BUFFER_WATERLINE = 1 << 16;
  //Preprocessor
  //NOTE: HTML input preprocessing
  //(see: http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#preprocessing-the-input-stream)
  class Preprocessor {
      constructor(handler) {
          this.handler = handler;
          this.html = '';
          this.pos = -1;
          // NOTE: Initial `lastGapPos` is -2, to ensure `col` on initialisation is 0
          this.lastGapPos = -2;
          this.gapStack = [];
          this.skipNextNewLine = false;
          this.lastChunkWritten = false;
          this.endOfChunkHit = false;
          this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
          this.isEol = false;
          this.lineStartPos = 0;
          this.droppedBufferSize = 0;
          this.line = 1;
          //NOTE: avoid reporting errors twice on advance/retreat
          this.lastErrOffset = -1;
      }
      /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
      get col() {
          return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
      }
      /** The index in `html` at which the current code point starts (the high surrogate of a pair). */
      get codePointStart() {
          return this.pos - Number(this.lastGapPos === this.pos);
      }
      /** The offset of the current code point, before the second unit of a surrogate pair. */
      get offset() {
          return this.droppedBufferSize + this.codePointStart;
      }
      getError(code, cpOffset) {
          const { line, col, offset } = this;
          const startCol = col + cpOffset;
          const startOffset = offset + cpOffset;
          return {
              code,
              startLine: line,
              endLine: line,
              startCol,
              endCol: startCol,
              startOffset,
              endOffset: startOffset,
          };
      }
      _err(code) {
          if (this.handler.onParseError && this.lastErrOffset !== this.offset) {
              this.lastErrOffset = this.offset;
              this.handler.onParseError(this.getError(code, 0));
          }
      }
      _addGap() {
          this.gapStack.push(this.lastGapPos);
          this.lastGapPos = this.pos;
      }
      _processSurrogate(cp) {
          //NOTE: try to peek a surrogate pair
          if (this.pos !== this.html.length - 1) {
              const nextCp = this.html.charCodeAt(this.pos + 1);
              if (isSurrogatePair(nextCp)) {
                  //NOTE: we have a surrogate pair. Peek pair character and recalculate code point.
                  this.pos++;
                  //NOTE: add a gap that should be avoided during retreat
                  this._addGap();
                  return getSurrogatePairCodePoint(cp, nextCp);
              }
          }
          //NOTE: we are at the end of a chunk, therefore we can't infer the surrogate pair yet.
          else if (!this.lastChunkWritten) {
              this.endOfChunkHit = true;
              return CODE_POINTS.EOF;
          }
          //NOTE: isolated surrogate
          this._err(ERR.surrogateInInputStream);
          return cp;
      }
      willDropParsedChunk() {
          return this.pos > this.bufferWaterline;
      }
      dropParsedChunk() {
          if (this.willDropParsedChunk()) {
              // Retain the entire current code point, including both units of a surrogate pair.
              const droppedSize = this.offset - this.droppedBufferSize;
              this.html = this.html.substring(droppedSize);
              this.lineStartPos -= droppedSize;
              this.droppedBufferSize += droppedSize;
              this.pos -= droppedSize;
              this.lastGapPos = -2;
              this.gapStack.length = 0;
              if (this.pos > 0)
                  this._addGap();
          }
      }
      write(chunk, isLastChunk) {
          if (this.html.length > 0) {
              this.html += chunk;
          }
          else {
              this.html = chunk;
          }
          this.endOfChunkHit = false;
          this.lastChunkWritten = isLastChunk;
      }
      insertHtmlAtCurrentPos(chunk) {
          this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1);
          this.endOfChunkHit = false;
      }
      startsWith(pattern, caseSensitive) {
          // Check if our buffer has enough characters
          if (this.pos + pattern.length > this.html.length) {
              this.endOfChunkHit = !this.lastChunkWritten;
              return false;
          }
          if (caseSensitive) {
              return this.html.startsWith(pattern, this.pos);
          }
          for (let i = 0; i < pattern.length; i++) {
              const cp = this.html.charCodeAt(this.pos + i) | 0x20;
              if (cp !== pattern.charCodeAt(i)) {
                  return false;
              }
          }
          return true;
      }
      peek(offset) {
          const pos = this.pos + offset;
          if (pos >= this.html.length) {
              this.endOfChunkHit = !this.lastChunkWritten;
              return CODE_POINTS.EOF;
          }
          const code = this.html.charCodeAt(pos);
          return code === CODE_POINTS.CARRIAGE_RETURN ? CODE_POINTS.LINE_FEED : code;
      }
      advance() {
          this.pos++;
          //NOTE: LF should be in the last column of the line
          if (this.isEol) {
              this.isEol = false;
              this.line++;
              this.lineStartPos = this.pos;
          }
          if (this.pos >= this.html.length) {
              this.endOfChunkHit = !this.lastChunkWritten;
              return CODE_POINTS.EOF;
          }
          let cp = this.html.charCodeAt(this.pos);
          //NOTE: all U+000D CARRIAGE RETURN (CR) characters must be converted to U+000A LINE FEED (LF) characters
          if (cp === CODE_POINTS.CARRIAGE_RETURN) {
              this.isEol = true;
              this.skipNextNewLine = true;
              return CODE_POINTS.LINE_FEED;
          }
          //NOTE: any U+000A LINE FEED (LF) characters that immediately follow a U+000D CARRIAGE RETURN (CR) character
          //must be ignored.
          if (cp === CODE_POINTS.LINE_FEED) {
              this.isEol = true;
              if (this.skipNextNewLine) {
                  // `line` will be bumped again in the recursive call.
                  this.line--;
                  this.skipNextNewLine = false;
                  this._addGap();
                  return this.advance();
              }
          }
          this.skipNextNewLine = false;
          if (isSurrogate(cp)) {
              cp = this._processSurrogate(cp);
          }
          //OPTIMIZATION: first check if code point is in the common allowed
          //range (ASCII alphanumeric, whitespaces, big chunk of BMP)
          //before going into detailed performance cost validation.
          const isCommonValidRange = this.handler.onParseError === null ||
              (cp > 0x1f && cp < 0x7f) ||
              cp === CODE_POINTS.LINE_FEED ||
              cp === CODE_POINTS.CARRIAGE_RETURN ||
              (cp > 0x9f && cp < 64976);
          if (!isCommonValidRange) {
              this._checkForProblematicCharacters(cp);
          }
          return cp;
      }
      _checkForProblematicCharacters(cp) {
          if (isControlCodePoint(cp)) {
              this._err(ERR.controlCharacterInInputStream);
          }
          else if (isUndefinedCodePoint(cp)) {
              this._err(ERR.noncharacterInInputStream);
          }
      }
      retreat(count) {
          this.pos -= count;
          while (this.pos < this.lastGapPos) {
              this.lastGapPos = this.gapStack.pop();
              this.pos--;
          }
          this.isEol = false;
      }
  }

  var TokenType;
  (function (TokenType) {
      TokenType[TokenType["CHARACTER"] = 0] = "CHARACTER";
      TokenType[TokenType["NULL_CHARACTER"] = 1] = "NULL_CHARACTER";
      TokenType[TokenType["WHITESPACE_CHARACTER"] = 2] = "WHITESPACE_CHARACTER";
      TokenType[TokenType["START_TAG"] = 3] = "START_TAG";
      TokenType[TokenType["END_TAG"] = 4] = "END_TAG";
      TokenType[TokenType["COMMENT"] = 5] = "COMMENT";
      TokenType[TokenType["DOCTYPE"] = 6] = "DOCTYPE";
      TokenType[TokenType["EOF"] = 7] = "EOF";
      TokenType[TokenType["HIBERNATION"] = 8] = "HIBERNATION";
  })(TokenType || (TokenType = {}));
  function getTokenAttr(token, attrName) {
      for (let i = token.attrs.length - 1; i >= 0; i--) {
          if (token.attrs[i].name === attrName) {
              return token.attrs[i].value;
          }
      }
      return null;
  }

  // Adapted from https://github.com/mathiasbynens/he/blob/36afe179392226cf1b6ccdb16ebbb7a5a844d93a/src/he.js#L106-L134
  /**
   * C1 Unicode control character reference replacements (code points 128-159).
   * Index i gives the replacement for code point 128+i; 0 means "no replacement".
   */
  const c1 = [
      8364, 0, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 352, 8249, 338, 0,
      381, 0, 0, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 732, 8482, 353, 8250,
      339, 0, 382, 376,
  ];
  /**
   * True for NUL, UTF-16 surrogates, and values past U+10FFFF.
   * @param codePoint Unicode code point to check.
   */
  function isInvalidCodePoint(codePoint) {
      return (codePoint === 0 ||
          (codePoint >= 0xd8_00 && codePoint <= 0xdf_ff) ||
          codePoint > 0x10_ff_ff);
  }
  /**
   * Replace the given code point with U+FFFD if it is NUL (0), a surrogate, or
   * outside the valid Unicode range. Code points in the C1 controls range
   * (128-159) are remapped to their Windows-1252 equivalents, following the
   * HTML spec. All other code points are returned unchanged.
   * @param codePoint Unicode code point to convert.
   */
  function replaceCodePoint(codePoint) {
      if (isInvalidCodePoint(codePoint)) {
          return 0xff_fd;
      }
      if (codePoint >= 128 && codePoint <= 159) {
          return c1[codePoint - 128] || codePoint;
      }
      return codePoint;
  }

  // Generated using scripts/write-decode-map.ts
  /* eslint-disable unicorn/prefer-unicode-code-point-escapes -- Fixed-width escapes keep generated source compact. */
  /**
   * Serialized decode data; the format is documented in
   * `src/internal/decode-data-format.ts`. `[0]` is one-byte data (all char
   * codes <= 0xFF: header, front-coded name suffixes, per-name metadata,
   * cuckoo choice bits); `[1]` holds the replacement values.
   */
  // biome-ignore format: generated data
  const htmlDecodeData = ["Q=¨`p0AEligMPacutebrevecircyfrgravelphamacrndogonpfpplyFunctionringscrsigntildeumlBackslashrvwedcyecausernoullistafropfrevescrumpeqCHcyOPYacutepitalDifferentialDyleyscaronedilirconintdotedillanterDotfrhiircleDotMinusPlusTimeslockwiseContourIntegralseCurlyDoubleQuoteQuoteolonengruentinttourIntegralpfroductunterClockwiseContourIntegralrossscrupCapDDotrahdJcyScyZcyaggerrrshvcaronyeltafriacriticalAcuteDotubleAcuteGraveTildemondfferentialDopftDotEqualubleContourIntegralDotwnArrowLeftArrowRightArrowTeeongLeftArrowRightArrowRightArrowRightArrowTeeUpArrowDownArrowVerticalBarwnArrowBarUpArrowBreveLeftRightVectorTeeVectorVectorBarRightTeeVectorVectorBarTeeArrowarrowscrtrokENGTHacutecaronircydotfrgravelementmacrptySmallSquareVerySmallSquareogonpfpsilonqualTildeilibriumscrimtaumlxistsponentialEFcyfrilledSmallSquareVerySmallSquareopfrAlluriertrfscrGJcyTammadbrevecedilircydotfrgopfreaterEqualLessFullEqualGreaterLessSlantEqualTildescrtHARDcyacektcircfrilbertSpaceopfrizontalLinescrtrokumpDownHumpEqualIEcyJligOcyacutecircydotfrgravemacrginaryIpliesntegralrsectionvisibleCommaTimesogonpftascrtildeukcymlJcircyfropfscrercyukcyKHcyJcyappacedilyfropfscrLJcyTacutembdangplacetrfrrcaronedilyeftAngleBracketrrowBarRightArrowCeilingDoubleBracketwnTeeVectorVectorBarFloorRightArrowVectorTeeArrowVectorriangleBarEqualUpDownVectorTeeVectorVectorBarVectorBararrowrightarrowssEqualGreaterFullEqualGreaterLessSlantEqualTildefrleftarrowmidotongLeftArrowRightArrowRightArrowleftarrowrightarrowrightarrowpfwerLeftArrowRightArrowscrhtroktMapcyediumSpacellintrffrinusPlusopfscruNJcyacutecaronedilyegativeMediumSpaceThickSpacenSpaceVeryThinSpacestedGreaterGreaterLessLesswLinefroBreaknBreakingSpacepftCongruentupCapDoubleVerticalBarElementqualTildexistsGreaterEqualFullEqualGreaterLessSlantEqualTildeHumpDownHumpEqualLeftTriangleBarEqualssEqualGreaterLessSlantEqualTildeNestedGreaterGreaterLessLessPrecedesEqualSlantEqualReverseElementightTriangleBarEqualSquareSubsetEqualpersetEqualubsetEqualcceedsEqualSlantEqualTildepersetEqualTildeEqualFullEqualTildeVerticalBarscrtildeuOEligacutecircydblacfrgravemacregaicronopfpenCurlyDoubleQuoteQuoterscrlashtildemesumlverBarraceketParenthesisPartialDcyfrhiilusMinusoincareplanepfrecedesEqualSlantEqualTildeimeoductportionalscriQUOTfropfscrRBarrEGacutengrrtlcaronedilyeverseElementquilibriumUpEquilibriumfrhoightAngleBracketrrowBarLeftArrowCeilingDoubleBracketwnTeeVectorVectorBarFloorTeeArrowVectorriangleBarEqualUpDownVectorTeeVectorVectorBarVectorBararrowopfundImpliesrightarrowscrhuleDelayedSHCHcycyOFTcyacutecaronedilircyfrhortDownArrowLeftArrowRightArrowUpArrowigmamallCircleopfqrtuareIntersectionSubsetEqualpersetEqualUnionscrtarubsetEqualcceedsEqualSlantEqualTildehThatmpersetEqualsetTHORNRADESHcycyabucaronedilyfrhereforetaickSpacenSpaceildeEqualFullEqualTildeopfripleDotscrtrokUacuterrocirbrcyevecircydblacfrgravemacrnderBarraceketParenthesisionPlusogonpfpArrowBarDownArrowDownArrowEquilibriumTeeArrowarrowdownarrowperLeftArrowRightArrowsilonringscrtildeumlVDashbarcydashleerbarticalBarLineSeparatorTildeyThinSpacefropfscrvdashWcircedgefropfscrXfriopfscrYAcyIcyUcyacutecircyfropfscrumlZHcyacutecaronydoteroWidthSpacetafropfscraacutebrevecEdircuteyeligfrgravelefsymphphamacrlgpndanddslopevgelemsdaabcdefghrtvbdsphtzarrogonpfpEacireidosproxeqringscrtympeqtildeumlwconintintbNotackcongepsilonprimesimeqrveewedgebrktbrkcongydquoecausemptyvpsirnoutahweenfrigcapircupodotplustimessqcuptartriangledownupuplusveewedgekarowlacklozengesquaretriangledownleftrightnkk12434ocknequivotopfttomwtiexDLRlrHDUduULRlrVHLRhlrboxdLRlrhDUduminusplustimesuLRlrvHLRhlrprimerevevbarscremiimeolbhsubulletmpEeqcacutepandbrcupcapupdotsretoncapsronedilircupssmdotedilmptyvnterdotfrhcyeckmarkiirEceqlearrowleftrightdRSastcircdashefnintmidscirlubsuitoloneqmmatpfnlementxesngdotintpfrodysrrarrossscrubepetdotudarrlreprsclarrppbrcapcapupdotorsrarrmlyeqprecsuccveewedgerenvearrowleftrightveewedwconintintylctydArrHaraggerlethrrshvbkarowlaccaronydaggerrrotseqegltamptyvfishtrharlriamondsuitsegammasinvideontimesonxjcylcornropollarpfteqdotminusplussquareublebarwedgewnarrowdownarrowsharpoonleftrightrbkarowcornropscryoltroktdotrifuarrharwanglezcyigrarreDDototacutestercaronircolonydotefDotrgravesdotlinterslsdotmacrptysetvsp134ngspogonpfparsllussilonvqcircolonsimlantgtrlessualsestivDDvparslrDotarrscrdotimtahumlroxclistpectationonentialefallingdotseqcyemalefiligligligriligjliglatligtnsnofopfrallkvpartintrac123456823534584556878slownscrgElacutemmadpbrevecircydotelqqslantsccdotollesfrggimeljcylEajnEapproxeqqsimopfravescrimeltccirdotlParquestrapproxrrdoteqlessqlesslesssimvertneqqnEhArrairsplfmiltrdcyrcirwbarcirceartsuitlliprconfrksearowwarowoarrmthtokleftarrowrightarrowpfrbarscrlashtrokybullpheniacutecircyecyxclffrgraveiiintntnfinotajligmacrgelinepartthofpedncarefintieodottcalegersrcallarhkprodocygonpftaprodquestscrinEdotsvvtildeukcymljcircyfrmathopfscrercyukcykappavcedilyfrgreenhcyjcyopfscrlAarrrrtailBarrEgHaracuteemptyvgranmbdangdlepquorrbfsfshklpplsimtltailesbarrbrkracekkeslducaronedililubydcaquorrdharusharsheftarrowtailharpoondownupleftarrowsrightarrowsharpoonssquigarrowthreetimesgqqslantsccdotorgessapproxdoteqgtrqgtrgtrsimfishtloorrgEhardulblkjcylarrcornerhardtrimidotoustachenEapproxeqqsimoangrrbrkngleftarrowrightarrowmapstorightarrowoparrowleftrightparflustimeswastbarzengefparltrarrcornerhardmtrisaquocrhimegqbuortroktccirdothreeimeslarrquestrPariefurdsharuharvertneqqnEmDDotacrletesepstodownleftuprkercommaydasheasuredanglefrhoicrodastcirdotnusbdulcpdrnplusodelspfpscrtposultimapmapnGgtvLeftarrowrightarrowltvRightarrowVDashdashablacutengpEidosproxturalsbspumpecapronedilongdotupydasheArrarhkrowdotquivsearimxistsfrgEeqqslantssimtrhArrarrparisdvjcylArrEarrdreftarrowrightarrowqqslantsssimtriemidopftinEdotvabcnivabcparallelsltolintrcueeceqrArrarrcwightarrowtriesccueerhortmidparallelimeqmidparqsubepeubEeseteqqcceqpEeseteqqtglildelgrianglelefteqrightequmerospvDashHarrapdashgetinfinlArretrierArrtriesimwArrarhkrownearoSacutestcircydashblacivotsoldeligfcirrgonravethbarmintlarrcirrossinetmacregaicrondnusopfparerplusrarrderoffmigoforslopevscrlasholtildemesasumlvbarparallelsimltcyercntiodmilptenkfrhivmmatoneitchforkvlanckhkvusacirbcirdouemnsimtwomointintpfundrEapcueecapproxcurlyeqeqnapproxeqqsimsimimesnEapsimodfalarlinesurfptosimurelscriuncspqfrintopfprimescruaternionsintesteqotrAarrrrtailBarrHaraceutedicemptyvngdelequorrapbfscfshklpplsimtlwtailionalsbarrbrkracekkeslducaronedililubydcaldharquorshealinepartsctgfishtloorrhardulovightarrowtailharpoondownupleftarrowsharpoonsrightarrowssquigarrowthreetimesngsingdotseqlarrharmmoustachenmidoangrrbrkparflustimespargtpolintrarrsaquocrhqbuorthreeimesriefltriuluharxsacutebquocEaproncueedilircnEapsimpolintsimydotbeeArrarhkrowctmiswartminusnxtfrownharpchcyyortmidparallelyigmafvmdoteqgElEneplusrarrlarrmallsetminusshpeparslidletesoftcylbarpfpadesuitrqcapsupssubeseteqpesetequareffrarrscretmnmiletarftarfraightepsilonphinsubEdotedotmultnEeplusrarrseteqqneqqimubpccapproxcurlyeqeqnapproxeqqsimsimmngp123EdotsubedothsolublarrmultnEeplusseteqqneqqimubpwArrarhkrownwarzligtargetubrkcaronedilydotelrecfrhere4foretasymvickapproxsimnspkapsimornildemesbardntoeapbotcirforksaprimeradeiangledownlefteqqrighteqdoteminusplussbtimepeziumscryhcytrokwixtoheadleftarrowrightarrowuArrHaracuterrbrcyevecircydarrblacharfishtrgraveharlrblklcornerroptrimacrlogonpfparrowdownarrowharpoonleftrightlussihlonuparrowsrcornerropingtriscrtdotilderifuarrmlwanglevArrBarvDashangrtrepsilonkappanothingphiiroptorhosigmaubsetneqqpsetneqqthetariangleleftrightcydasheebareqlliprbartfrltrinsubpopfproprtriscrubnEepnEezigzagwcircedbargeqierpfropfpreathscrxcapircupdtrifrhArrarrilArrarrmapnisodotpflustimerArrarrscrqcupuplustriveewedgeyacuteycircyenfricyopfscrucymlzacutecaronydoteetrftafrhcyigrarropfscrwjnjC(D%D($(D'%$$ED($'$'$%$'%E$/D'$F%'D(D&#,%%&&$%$)%+%%$E$F$'$&$(#'D&$(%$&4%($(E'%&%($&$)%*$%$%$+)()')($:&5-($'($%*&&&/%%&)%@$'$F$%&&#%%)$&$&$&$(%%%&$(%$$%&%$E$2.&0,.(.(&'%.$F%$&&&(%6)&+*),---&*/1---)-.&)*+,).%*,&,*'('2+,+)1&'1,)2&'&*('($F%'#&D%D($(E&%$$&$ED($)$'%1(2$'%E$)$'((&+$&%%$%D&$(%-#&$E$3)2$F%'%+$&#'D$$'($$($(%&%$$&$E$$$F$./'*,***'*-*($F$$#)$'%$$'$%$.$&%/$&%'$.'(#'$'$&D(D'%$$&$%D($$%&&*%($%&('+%/,($'%E%%$&$($'E%#(%$$E$F$F%'$'#'$&$'$(%$$E$F$F#'D$$(%'%%%+%%$(%'%$$2(',&,-'*'0).+)1&'('-,)'&*(*)(*/&/('/),))/&')-&'('-%1','*'''-'($E$$%+$($/+-'-',+-'-%E%/(-$&%$%'$$#&$%$-%*$E$+$F$&$$#'$($(%'%$$5+-.)+0%5)+%($E$)%1%%%$&,'(&4&*''+H'(&*-(-L-J-'-M-(&O*H&/2F2((%*(***G*M*(&W,K&+.H.-&1'/3F3(&O2(.I4('H,(().H.-.H(I.(&(+(+,+(&.$FD($$#(D(D'%$$($ED($'%&%($F$6,($$$FE'D(&&D&$)('+&'.#+$%$E$%$$$+$/%%$$%)+(+-+(%&%(&*-%$F%$C'$E$&$F#(D%$(%%%%'%$(%'%$$$%/+-*0$%$%$3)'-&-,(*(0*.,)2&(((&+(+))*0&0((/*,*)0&().&(($&%-$-$&%$$-#)%%$($($$%'%'%&%$$E$0(,(-(*$'$-$F$&%')/))/(+)1()($F$&$%&&)(%)+(+-+(&(%$%$&(+(&&C($'$'%%$%%$$(%'%$$E$+&%%K&)$'(((,(($F$+$F%'C)%%''$'&&D'%$$($ED($'$*)',&(.%&('$'%E$)*&*,%,%.%&((%(%,%/(-%%'&$'$F$(D&#($&$%$'($$%%'&$'*+'+,+(&-$E$F$F$(#($'$E$F$F#F$$$F$F#'$&$&D($'%$$E$F$F$&#'$($(%$$&$0%%$%$&$FC)$($$%D%$E&E&%$D'$$%DD($)&%%&$'&%E$$%&&&$&(&$%$&$&%&&)%*$*$*$*$*$*$*$&%(%*$&&'$&'$'%E$$%$%'%$%%%%%')%D'$F%$%&(%D(D&$*%&#'$*'*'('&*%%'&&)%$&''$'%$$'$()$%(%&%'%%&$&'$E$('&'%&''''(&('&&/.%&(&&&($($.()(+0'0'0(&%%&'$&%%&$E&G%%$F%$&&%'%&'$'$'$&$'$'$'$'$&%'$'$'$&$'$'$'$'$'$'$&&&%'$'$'$&$'$'$'$'$&(&'&(&%'$'$'$&$'$'$'$'$'$'$$($'E'$F%&%%'$%%'$''$&'%%%'$'$($#)%$&&&(&&'%&&&D%&&%$'&&E'%&%&(%$&D'%(E%'($E$&%&('%$$%&$&$'%'..()%*$*&*'*'&$&(&&&'$'(&$'($)$%&($&$'%'))&%%'&&&%E&&F$'%$'%&$F%%'$&$'$$'$))$%&&%%')$%$&(&&'%&&&%&D%')$&+*'(&((F&&.-(%&%&$*%&$(#'$&$(%'%%%%'$$)%&$(%$$$%(&%%(D%%&%($(%D$''$$&'&*''$%$%(%&%$F&)*&&$&$(&&$(%E%$&%(&&(&'&)%/%*'-'..($*%'&&$F&$%%%'$'%%'$$'%&$)$&%)#(%%D(%'$(%%G$%'%$$&$$$'%D$$E'%$&&$$%)%$%$&&$'%&(&($%%'%($$%%%$'%E$&'%%&%%'&'$$(&'%&&**'%'&&&%(%%)$'%&$&%&%%$%E$D&%%$&%&%,&,#0$%$($(%&&&%D$'$G$&%&%&$&$F%'&$'$$*D(($H$($($($'%($G%($($'%'%($'%&%%&$F#%%$$(%&($%$$($'%$$&$$%$%$&$&(%$&%&&)$*$&D'%$E$$%$$'$&$$%$%$%$$%%%''%$&$'$%&$F$'$&%%'$'$D$%%&%%&%'%(%*'%&&&)((&'&&$K%E#'$(%%%'%'&$'&'$$&$'$()&%'%'$E$*&($'%'%.'-%E%'$F%'%'$(%'C)$$E&%$$&E&$%%DD($$%'&%%'%&$'$'&%''''&%%%%&$$%'%&(&%'%$&&&(''&(&'$&%&%E%%$'D($F%%'$'&'$($'$$$%'$'E%#(%$$E$'$F$F%'$'#(($$(%$$E$($&$&$F$F#(%%%'$'$$%$$&$(%)%'%'%%'$'%%$E&%%'$(%'%'%'%'%'&'%%$&&&$'D$'%&%'($&%'&)$$(%'&%%%%$$&%&($%(&(%%$$%*,''..%'-'-1$,+,-'-%$%$&$&(%$&%&&)$*$&D'%&*'&'()''&'&$(%'%D$$%$$''$($%&$&$$%&%)%'%&$(%')'$%%%''%$&$'$%&$'&%%&%.+-')'-%.,(%&&D&&%(%'&&%$&'&$$&'%$'%)%&($%$%&$(%E%$%%'$'$%%&%($%'D$%%&%%&%'%'%'%(%'&$'$'$$*&'$K%E#(D&%%&$'&%$&&)')')%%'$(%$$'$/$E$%D'%$&&&&F&%&($($)$$&%%$($(%E$$$F%'$$%)%&#F%D&D$,(-%D%D&D$-$(%'$'%'%E%$&D&E&%&'%&(%*$D&%F(D$&&&%'%&(F%%%$$'$$%&%''$(%%F%'%'&E%')$$E$E%$&$'D'H&D%&%$&$$'%&%&$$%$&$%$$&$'%D%&%%%$&*(-&$'D'H&D'$%&%$&%($$&$FE$&%(D(F(%)$)$&%(%)$)$$&'('E'D%(%$&&&D'$(E$'%&(D(D%,%&($$%&&&D&D%*)+%%'$($%&%&%((%%%'D'$'F*%,D&%(E&$'D'$'F*%,D$&E'%%%.0%,(1%$$%$&&&%$(%'%E%'%E&D%(%'&D&D'F%'&G%F$'%''$(%%'#%D(%%$&G$%$$'%'%%%%%'$'$'%D$&E'%$$'%$$&$'%&&'%&%$$'%&%(&$&&$F$&%&%&$$%&%$&%(%F$F$%'%%%(%$$&E'%%D(&&)%D&$'#&F$''&&'$&$$%$(&&&&&$&'$E$%&$%'%&$$%*%$$()$'%%%'''$'&'%($'$G%'&'&$$$*%EE&$$%$%%%&%$&$')'*'%'*(&(&'&%&($%%&%&&%%&(''''&$'%%&%'$F%$$(#F$&$F$($F$-'&%&(%E%#(%%%'$'$&$F&&%&%)%%'$'$'%E&%%'%'$(%'$'%'%'%'%'&'%'$%'&%('$'%&%'($&%'&)$$(%'&%%%%$$&%(%&($%%$&'&'''$%%E$$(%'%D$''$($%$&$$,-'(./%(-,+(.(-(-%%%-$'%&%$$()'$'$'&%%&%&&D&&%($&'%%)$'$(%E%$%%&%($$(%'%%'$'$''$)$$#)$'$$%$%%&&%&%$&&%&%%&%&&%)%&%$$&'$'$$'%''$(%E%%%%'%)'$%%$E&&$'%'&$%)(+E$$'($($%$&&&$'$&$'$&$'$&%&'&'$'$/&&%)%%&%%$&$'D$(%$&$'%%E$()&&$$'(D&%(D%&($(&+%'$($(&+%%$&&($&$$'$F%'%'%'$&'$%0+&&%$%&$&&&$'&&'&%'$&'&'&&)%+$)&,$'%'%($%%')'*'%'*(&(&'&%$%%%$F$F$F$&$&&'&&$'&&'(%&'&'&%'$&'&&)%+$)&,$'%'%($$'%''$(%%'D'#)%$$&$(%'%$$&$($E$(('&%(&($%,(&&&%&&&E&$'E&($)%($%%$&%$&&&&&D'&%%$($'%)+'+'/%+$+(0%&&&$&(&'&%&'%)$F&$%&%'$'%1*-#'$&D(%%$'&&D'%$$'%'%&$(%DD($''$%&$()%&&%&$'E$$'%E$)%,%.,(%&%%'$'&%+$()%&&%&%&$F$'%'%%'$$'E%$)#'$&'$$'$(%+&(&*&&'$'(&$'%&('K/D(J/D&('..($%$'$%&&&%%'%'&$$E$'$G'D$F$'$'$F%G(D&F(D$)#($(&%($%'$E$F$$$$%'$F#'%&%%$'$E$'%&$$$'%&$&$&$'%E&&%'$'%&$F%'$(%&$&$(C)&$$'%$D%$E$&$F$F$&E%#)$(%$$&$(%%$E$&$)$F$F$%%%0@0000H8H40H000047P00P@001000@0B0HP@:H9T8P000LB8d@800@I0<110000QQ8400P10030005940@410020000Q02000@0200000@P0101@8000440400000000808000000000@00000000P`0000000040400@0004<000000000008000030000000000P020T400020@0@00000000000000000000000000P0000000400400000400220080000100000000000000000P000000000000P000000@00402000000000@00000000000000000000040000000000000", "Æ&Á\u0102Â\u0410\uD835\uDD04À\u0391\u0100\u2A53\u0104\uD835\uDD38\u2061Å\uD835\uDC9C\u2254ÃÄ\u2216\u2AE7\u2306\u0411\u2235\u212C\u0392\uD835\uDD05\uD835\uDD39\u02D8\u212C\u224E\u0427©\u0106\u22D2\u2145\u212D\u010CÇ\u0108\u2230\u010A¸·\u212D\u03A7\u2299\u2296\u2295\u2297\u2232\u201D\u2019\u2237\u2A74\u2261\u222F\u222E\u2102\u2210\u2233\u2A2F\uD835\uDC9E\u22D3\u224D\u2145\u2911\u0402\u0405\u040F\u2021\u21A1\u2AE4\u010E\u0414\u2207\u0394\uD835\uDD07´\u02D9\u02DD`\u02DC\u22C4\u2146\uD835\uDD3B¨\u20DC\u2250\u222F¨\u21D3\u21D0\u21D4\u2AE4\u27F8\u27FA\u27F9\u21D2\u22A8\u21D1\u21D5\u2225\u2193\u2913\u21F5\u0311\u2950\u295E\u21BD\u2956\u295F\u21C1\u2957\u22A4\u21A7\u21D3\uD835\uDC9F\u0110\u014AÐÉ\u011AÊ\u042D\u0116\uD835\uDD08È\u2208\u0112\u25FB\u25AB\u0118\uD835\uDD3C\u0395\u2A75\u2242\u21CC\u2130\u2A73\u0397Ë\u2203\u2147\u0424\uD835\uDD09\u25FC\u25AA\uD835\uDD3D\u2200\u2131\u2131\u0403>\u0393\u03DC\u011E\u0122\u011C\u0413\u0120\uD835\uDD0A\u22D9\uD835\uDD3E\u2265\u22DB\u2267\u2AA2\u2277\u2A7E\u2273\uD835\uDCA2\u226B\u042A\u02C7^\u0124\u210C\u210B\u210D\u2500\u210B\u0126\u224E\u224F\u0415\u0132\u0401ÍÎ\u0418\u0130\u2111Ì\u2111\u012A\u2148\u21D2\u222C\u222B\u22C2\u2063\u2062\u012E\uD835\uDD40\u0399\u2110\u0128\u0406Ï\u0134\u0419\uD835\uDD0D\uD835\uDD41\uD835\uDCA5\u0408\u0404\u0425\u040C\u039A\u0136\u041A\uD835\uDD0E\uD835\uDD42\uD835\uDCA6\u0409<\u0139\u039B\u27EA\u2112\u219E\u013D\u013B\u041B\u27E8\u2190\u21E4\u21C6\u2308\u27E6\u2961\u21C3\u2959\u230A\u2194\u294E\u22A3\u21A4\u295A\u22B2\u29CF\u22B4\u2951\u2960\u21BF\u2958\u21BC\u2952\u21D0\u21D4\u22DA\u2266\u2276\u2AA1\u2A7D\u2272\uD835\uDD0F\u22D8\u21DA\u013F\u27F5\u27F7\u27F6\u27F8\u27FA\u27F9\uD835\uDD43\u2199\u2198\u2112\u21B0\u0141\u226A\u2905\u041C\u205F\u2133\uD835\uDD10\u2213\uD835\uDD44\u2133\u039C\u040A\u0143\u0147\u0145\u041D\u200B\u200B\u200B\u200B\u226B\u226A\n\uD835\uDD11\u2060 \u2115\u2AEC\u2262\u226D\u2226\u2209\u2260\u2242\u0338\u2204\u226F\u2271\u2267\u0338\u226B\u0338\u2279\u2A7E\u0338\u2275\u224E\u0338\u224F\u0338\u22EA\u29CF\u0338\u22EC\u226E\u2270\u2278\u226A\u0338\u2A7D\u0338\u2274\u2AA2\u0338\u2AA1\u0338\u2280\u2AAF\u0338\u22E0\u220C\u22EB\u29D0\u0338\u22ED\u228F\u0338\u22E2\u2290\u0338\u22E3\u2282\u20D2\u2288\u2281\u2AB0\u0338\u22E1\u227F\u0338\u2283\u20D2\u2289\u2241\u2244\u2247\u2249\u2224\uD835\uDCA9Ñ\u039D\u0152ÓÔ\u041E\u0150\uD835\uDD12Ò\u014C\u03A9\u039F\uD835\uDD46\u201C\u2018\u2A54\uD835\uDCAAØÕ\u2A37Ö\u203E\u23DE\u23B4\u23DC\u2202\u041F\uD835\uDD13\u03A6\u03A0±\u210C\u2119\u2ABB\u227A\u2AAF\u227C\u227E\u2033\u220F\u2237\u221D\uD835\uDCAB\u03A8\"\uD835\uDD14\u211A\uD835\uDCAC\u2910®\u0154\u27EB\u21A0\u2916\u0158\u0156\u0420\u211C\u220B\u21CB\u296F\u211C\u03A1\u27E9\u2192\u21E5\u21C4\u2309\u27E7\u295D\u21C2\u2955\u230B\u22A2\u21A6\u295B\u22B3\u29D0\u22B5\u294F\u295C\u21BE\u2954\u21C0\u2953\u21D2\u211D\u2970\u21DB\u211B\u21B1\u29F4\u0429\u0428\u042C\u015A\u2ABC\u0160\u015E\u015C\u0421\uD835\uDD16\u2193\u2190\u2192\u2191\u03A3\u2218\uD835\uDD4A\u221A\u25A1\u2293\u228F\u2291\u2290\u2292\u2294\uD835\uDCAE\u22C6\u22D0\u22D0\u2286\u227B\u2AB0\u227D\u227F\u220B\u2211\u22D1\u2283\u2287\u22D1Þ\u2122\u040B\u0426\t\u03A4\u0164\u0162\u0422\uD835\uDD17\u2234\u0398\u205F\u200A\u2009\u223C\u2243\u2245\u2248\uD835\uDD4B\u20DB\uD835\uDCAF\u0166Ú\u219F\u2949\u040E\u016CÛ\u0423\u0170\uD835\uDD18Ù\u016A_\u23DF\u23B5\u23DD\u22C3\u228E\u0172\uD835\uDD4C\u2191\u2912\u21C5\u2195\u296E\u22A5\u21A5\u21D1\u21D5\u2196\u2197\u03D2\u03A5\u016E\uD835\uDCB0\u0168Ü\u22AB\u2AEB\u0412\u22A9\u2AE6\u22C1\u2016\u2016\u2223|\u2758\u2240\u200A\uD835\uDD19\uD835\uDD4D\uD835\uDCB1\u22AA\u0174\u22C0\uD835\uDD1A\uD835\uDD4E\uD835\uDCB2\uD835\uDD1B\u039E\uD835\uDD4F\uD835\uDCB3\u042F\u0407\u042EÝ\u0176\u042B\uD835\uDD1C\uD835\uDD50\uD835\uDCB4\u0178\u0416\u0179\u017D\u0417\u017B\u200B\u0396\u2128\u2124\uD835\uDCB5á\u0103\u223E\u223E\u0333\u223Fâ´\u0430æ\u2061\uD835\uDD1Eà\u2135\u2135\u03B1\u0101\u2A3F&\u2227\u2A55\u2A5C\u2A58\u2A5A\u2220\u29A4\u2220\u2221\u29A8\u29A9\u29AA\u29AB\u29AC\u29AD\u29AE\u29AF\u221F\u22BE\u299D\u2222Å\u237C\u0105\uD835\uDD52\u2248\u2A70\u2A6F\u224A\u224B'\u2248\u224Aå\uD835\uDCB6*\u2248\u224Dãä\u2233\u2A11\u2AED\u224C\u03F6\u2035\u223D\u22CD\u22BD\u2305\u2305\u23B5\u23B6\u224C\u0431\u201E\u2235\u2235\u29B0\u03F6\u212C\u03B2\u2136\u226C\uD835\uDD1F\u22C2\u25EF\u22C3\u2A00\u2A01\u2A02\u2A06\u2605\u25BD\u25B3\u2A04\u22C1\u22C0\u290D\u29EB\u25AA\u25B4\u25BE\u25C2\u25B8\u2423\u2592\u2591\u2593\u2588=\u20E5\u2261\u20E5\u2310\uD835\uDD53\u22A5\u22A5\u22C8\u2557\u2554\u2556\u2553\u2550\u2566\u2569\u2564\u2567\u255D\u255A\u255C\u2559\u2551\u256C\u2563\u2560\u256B\u2562\u255F\u29C9\u2555\u2552\u2510\u250C\u2500\u2565\u2568\u252C\u2534\u229F\u229E\u22A0\u255B\u2558\u2518\u2514\u2502\u256A\u2561\u255E\u253C\u2524\u251C\u2035\u02D8¦\uD835\uDCB7\u204F\u223D\u22CD\\\u29C5\u27C8\u2022\u2022\u224E\u2AAE\u224F\u224F\u0107\u2229\u2A44\u2A49\u2A4B\u2A47\u2A40\u2229\uFE00\u2041\u02C7\u2A4D\u010Dç\u0109\u2A4C\u2A50\u010B¸\u29B2¢·\uD835\uDD20\u0447\u2713\u2713\u03C7\u25CB\u29C3\u02C6\u2257\u21BA\u21BB®\u24C8\u229B\u229A\u229D\u2257\u2A10\u2AEF\u29C2\u2663\u2663:\u2254\u2254,@\u2201\u2218\u2201\u2102\u2245\u2A6D\u222E\uD835\uDD54\u2210©\u2117\u21B5\u2717\uD835\uDCB8\u2ACF\u2AD1\u2AD0\u2AD2\u22EF\u2938\u2935\u22DE\u22DF\u21B6\u293D\u222A\u2A48\u2A46\u2A4A\u228D\u2A45\u222A\uFE00\u21B7\u293C\u22DE\u22DF\u22CE\u22CF¤\u21B6\u21B7\u22CE\u22CF\u2232\u2231\u232D\u21D3\u2965\u2020\u2138\u2193\u2010\u22A3\u290F\u02DD\u010F\u0434\u2146\u2021\u21CA\u2A77°\u03B4\u29B1\u297F\uD835\uDD21\u21C3\u21C2\u22C4\u22C4\u2666\u2666¨\u03DD\u22F2÷÷\u22C7\u22C7\u0452\u231E\u230D$\uD835\uDD55\u02D9\u2250\u2251\u2238\u2214\u22A1\u2306\u2193\u21CA\u21C3\u21C2\u2910\u231F\u230C\uD835\uDCB9\u0455\u29F6\u0111\u22F1\u25BF\u25BE\u21F5\u296F\u29A6\u045F\u27FF\u2A77\u2251é\u2A6E\u011B\u2256ê\u2255\u044D\u0117\u2147\u2252\uD835\uDD22\u2A9Aè\u2A96\u2A98\u2A99\u23E7\u2113\u2A95\u2A97\u0113\u2205\u2205\u2205\u2003\u2004\u2005\u014B\u2002\u0119\uD835\uDD56\u22D5\u29E3\u2A71\u03B5\u03B5\u03F5\u2256\u2255\u2242\u2A96\u2A95=\u225F\u2261\u2A78\u29E5\u2253\u2971\u212F\u2250\u2242\u03B7ðë\u20AC!\u2203\u2130\u2147\u2252\u0444\u2640\uFB03\uFB00\uFB04\uD835\uDD23\uFB01fj\u266D\uFB02\u25B1\u0192\uD835\uDD57\u2200\u22D4\u2AD9\u2A0D½\u2153¼\u2155\u2159\u215B\u2154\u2156¾\u2157\u215C\u2158\u215A\u215D\u215E\u2044\u2322\uD835\uDCBB\u2267\u2A8C\u01F5\u03B3\u03DD\u2A86\u011F\u011D\u0433\u0121\u2265\u22DB\u2265\u2267\u2A7E\u2A7E\u2AA9\u2A80\u2A82\u2A84\u22DB\uFE00\u2A94\uD835\uDD24\u226B\u22D9\u2137\u0453\u2277\u2A92\u2AA5\u2AA4\u2269\u2A8A\u2A8A\u2A88\u2A88\u2269\u22E7\uD835\uDD58`\u210A\u2273\u2A8E\u2A90>\u2AA7\u2A7A\u22D7\u2995\u2A7C\u2A86\u2978\u22D7\u22DB\u2A8C\u2277\u2273\u2269\uFE00\u2269\uFE00\u21D4\u200A½\u210B\u044A\u2194\u2948\u21AD\u210F\u0125\u2665\u2665\u2026\u22B9\uD835\uDD25\u2925\u2926\u21FF\u223B\u21A9\u21AA\uD835\uDD59\u2015\uD835\uDCBD\u210F\u0127\u2043\u2010í\u2063î\u0438\u0435¡\u21D4\uD835\uDD26ì\u2148\u2A0C\u222D\u29DC\u2129\u0133\u012B\u2111\u2110\u2111\u0131\u22B7\u01B5\u2208\u2105\u221E\u29DD\u0131\u222B\u22BA\u2124\u22BA\u2A17\u2A3C\u0451\u012F\uD835\uDD5A\u03B9\u2A3C¿\uD835\uDCBE\u2208\u22F9\u22F5\u22F4\u22F3\u2208\u2062\u0129\u0456ï\u0135\u0439\uD835\uDD27\u0237\uD835\uDD5B\uD835\uDCBF\u0458\u0454\u03BA\u03F0\u0137\u043A\uD835\uDD28\u0138\u0445\u045C\uD835\uDD5C\uD835\uDCC0\u21DA\u21D0\u291B\u290E\u2266\u2A8B\u2962\u013A\u29B4\u2112\u03BB\u27E8\u2991\u27E8\u2A85«\u2190\u21E4\u291F\u291D\u21A9\u21AB\u2939\u2973\u21A2\u2AAB\u2919\u2AAD\u2AAD\uFE00\u290C\u2772{[\u298B\u298F\u298D\u013E\u013C\u2308{\u043B\u2936\u201C\u201E\u2967\u294B\u21B2\u2264\u2190\u21A2\u21BD\u21BC\u21C7\u2194\u21C6\u21CB\u21AD\u22CB\u22DA\u2264\u2266\u2A7D\u2A7D\u2AA8\u2A7F\u2A81\u2A83\u22DA\uFE00\u2A93\u2A85\u22D6\u22DA\u2A8B\u2276\u2272\u297C\u230A\uD835\uDD29\u2276\u2A91\u21BD\u21BC\u296A\u2584\u0459\u226A\u21C7\u231E\u296B\u25FA\u0140\u23B0\u23B0\u2268\u2A89\u2A89\u2A87\u2A87\u2268\u22E6\u27EC\u21FD\u27E6\u27F5\u27F7\u27FC\u27F6\u21AB\u21AC\u2985\uD835\uDD5D\u2A2D\u2A34\u2217_\u25CA\u25CA\u29EB(\u2993\u21C6\u231F\u21CB\u296D\u200E\u22BF\u2039\uD835\uDCC1\u21B0\u2272\u2A8D\u2A8F[\u2018\u201A\u0142<\u2AA6\u2A79\u22D6\u22CB\u22C9\u2976\u2A7B\u2996\u25C3\u22B4\u25C2\u294A\u2966\u2268\uFE00\u2268\uFE00\u223A¯\u2642\u2720\u2720\u21A6\u21A6\u21A7\u21A4\u21A5\u25AE\u2A29\u043C\u2014\u2221\uD835\uDD2A\u2127µ\u2223*\u2AF0·\u2212\u229F\u2238\u2A2A\u2ADB\u2026\u2213\u22A7\uD835\uDD5E\u2213\uD835\uDCC2\u223E\u03BC\u22B8\u22B8\u22D9\u0338\u226B\u20D2\u226B\u0338\u21CD\u21CE\u22D8\u0338\u226A\u20D2\u226A\u0338\u21CF\u22AF\u22AE\u2207\u0144\u2220\u20D2\u2249\u2A70\u0338\u224B\u0338\u0149\u2249\u266E\u266E\u2115 \u224E\u0338\u224F\u0338\u2A43\u0148\u0146\u2247\u2A6D\u0338\u2A42\u043D\u2013\u2260\u21D7\u2924\u2197\u2197\u2250\u0338\u2262\u2928\u2242\u0338\u2204\u2204\uD835\uDD2B\u2267\u0338\u2271\u2271\u2267\u0338\u2A7E\u0338\u2A7E\u0338\u2275\u226F\u226F\u21CE\u21AE\u2AF2\u220B\u22FC\u22FA\u220B\u045A\u21CD\u2266\u0338\u219A\u2025\u2270\u219A\u21AE\u2270\u2266\u0338\u2A7D\u0338\u2A7D\u0338\u226E\u2274\u226E\u22EA\u22EC\u2224\uD835\uDD5F¬\u2209\u22F9\u0338\u22F5\u0338\u2209\u22F7\u22F6\u220C\u220C\u22FE\u22FD\u2226\u2226\u2AFD\u20E5\u2202\u0338\u2A14\u2280\u22E0\u2AAF\u0338\u2280\u2AAF\u0338\u21CF\u219B\u2933\u0338\u219D\u0338\u219B\u22EB\u22ED\u2281\u22E1\u2AB0\u0338\uD835\uDCC3\u2224\u2226\u2241\u2244\u2244\u2224\u2226\u22E2\u22E3\u2284\u2AC5\u0338\u2288\u2282\u20D2\u2288\u2AC5\u0338\u2281\u2AB0\u0338\u2285\u2AC6\u0338\u2289\u2283\u20D2\u2289\u2AC6\u0338\u2279ñ\u2278\u22EA\u22EC\u22EB\u22ED\u03BD#\u2116\u2007\u22AD\u2904\u224D\u20D2\u22AC\u2265\u20D2>\u20D2\u29DE\u2902\u2264\u20D2<\u20D2\u22B4\u20D2\u2903\u22B5\u20D2\u223C\u20D2\u21D6\u2923\u2196\u2196\u2927\u24C8ó\u229B\u229Aô\u043E\u229D\u0151\u2A38\u2299\u29BC\u0153\u29BF\uD835\uDD2C\u02DBò\u29C1\u29B5\u03A9\u222E\u21BA\u29BE\u29BB\u203E\u29C0\u014D\u03C9\u03BF\u29B6\u2296\uD835\uDD60\u29B7\u29B9\u2295\u2228\u21BB\u2A5D\u2134\u2134ªº\u22B6\u2A56\u2A57\u2A5B\u2134ø\u2298õ\u2297\u2A36ö\u233D\u2225¶\u2225\u2AF3\u2AFD\u2202\u043F%.\u2030\u22A5\u2031\uD835\uDD2D\u03C6\u03D5\u2133\u260E\u03C0\u22D4\u03D6\u210F\u210E\u210F+\u2A23\u229E\u2A22\u2214\u2A25\u2A72±\u2A26\u2A27±\u2A15\uD835\uDD61£\u227A\u2AB3\u2AB7\u227C\u2AAF\u227A\u2AB7\u227C\u2AAF\u2AB9\u2AB5\u22E8\u227E\u2032\u2119\u2AB5\u2AB9\u22E8\u220F\u232E\u2312\u2313\u221D\u221D\u227E\u22B0\uD835\uDCC5\u03C8\u2008\uD835\uDD2E\u2A0C\uD835\uDD62\u2057\uD835\uDCC6\u210D\u2A16?\u225F\"\u21DB\u21D2\u291C\u290F\u2964\u223D\u0331\u0155\u221A\u29B3\u27E9\u2992\u29A5\u27E9»\u2192\u2975\u21E5\u2920\u2933\u291E\u21AA\u21AC\u2945\u2974\u21A3\u219D\u291A\u2236\u211A\u290D\u2773}]\u298C\u298E\u2990\u0159\u0157\u2309}\u0440\u2937\u2969\u201D\u201D\u21B3\u211C\u211B\u211C\u211D\u25AD®\u297D\u230B\uD835\uDD2F\u21C1\u21C0\u296C\u03C1\u03F1\u2192\u21A3\u21C1\u21C0\u21C4\u21CC\u21C9\u219D\u22CC\u02DA\u2253\u21C4\u21CC\u200F\u23B1\u23B1\u2AEE\u27ED\u21FE\u27E7\u2986\uD835\uDD63\u2A2E\u2A35)\u2994\u2A12\u21C9\u203A\uD835\uDCC7\u21B1]\u2019\u2019\u22CC\u22CA\u25B9\u22B5\u25B8\u29CE\u2968\u211E\u015B\u201A\u227B\u2AB4\u2AB8\u0161\u227D\u2AB0\u015F\u015D\u2AB6\u2ABA\u22E9\u2A13\u227F\u0441\u22C5\u22A1\u2A66\u21D8\u2925\u2198\u2198§;\u2929\u2216\u2216\u2736\uD835\uDD30\u2322\u266F\u0449\u0448\u2223\u2225­\u03C3\u03C2\u03C2\u223C\u2A6A\u2243\u2243\u2A9E\u2AA0\u2A9D\u2A9F\u2246\u2A24\u2972\u2190\u2216\u2A33\u29E4\u2223\u2323\u2AAA\u2AAC\u2AAC\uFE00\u044C/\u29C4\u233F\uD835\uDD64\u2660\u2660\u2225\u2293\u2293\uFE00\u2294\u2294\uFE00\u228F\u2291\u228F\u2291\u2290\u2292\u2290\u2292\u25A1\u25A1\u25AA\u25AA\u2192\uD835\uDCC8\u2216\u2323\u22C6\u2606\u2605\u03F5\u03D5¯\u2282\u2AC5\u2ABD\u2286\u2AC3\u2AC1\u2ACB\u228A\u2ABF\u2979\u2282\u2286\u2AC5\u228A\u2ACB\u2AC7\u2AD5\u2AD3\u227B\u2AB8\u227D\u2AB0\u2ABA\u2AB6\u22E9\u227F\u2211\u266A\u2283¹²³\u2AC6\u2ABE\u2AD8\u2287\u2AC4\u27C9\u2AD7\u297B\u2AC2\u2ACC\u228B\u2AC0\u2283\u2287\u2AC6\u228B\u2ACC\u2AC8\u2AD4\u2AD6\u21D9\u2926\u2199\u2199\u292Aß\u2316\u03C4\u23B4\u0165\u0163\u0442\u20DB\u2315\uD835\uDD31\u2234\u2234\u03B8\u03D1\u03D1\u2248\u223C\u2009\u2248\u223Cþ\u02DC×\u22A0\u2A31\u2A30\u222D\u2928\u22A4\u2336\u2AF1\uD835\uDD65\u2ADA\u2929\u2034\u2122\u25B5\u25BF\u25C3\u22B4\u225C\u25B9\u22B5\u25EC\u225C\u2A3A\u2A39\u29CD\u2A3B\u23E2\uD835\uDCC9\u0446\u045B\u0167\u226C\u219E\u21A0\u21D1\u2963ú\u2191\u045E\u016Dû\u0443\u21C5\u0171\u296E\u297E\uD835\uDD32ù\u21BF\u21BE\u2580\u231C\u231C\u230F\u25F8\u016B¨\u0173\uD835\uDD66\u2191\u2195\u21BF\u21BE\u228E\u03C5\u03D2\u03C5\u21C8\u231D\u231D\u230E\u016F\u25F9\uD835\uDCCA\u22F0\u0169\u25B5\u25B4\u21C8ü\u29A7\u21D5\u2AE8\u2AE9\u22A8\u299C\u03F5\u03F0\u2205\u03D5\u03D6\u221D\u2195\u03F1\u03C2\u228A\uFE00\u2ACB\uFE00\u228B\uFE00\u2ACC\uFE00\u03D1\u22B2\u22B3\u0432\u22A2\u2228\u22BB\u225A\u22EE||\uD835\uDD33\u22B2\u2282\u20D2\u2283\u20D2\uD835\uDD67\u221D\u22B3\uD835\uDCCB\u2ACB\uFE00\u228A\uFE00\u2ACC\uFE00\u228B\uFE00\u299A\u0175\u2A5F\u2227\u2259\u2118\uD835\uDD34\uD835\uDD68\u2118\u2240\u2240\uD835\uDCCC\u22C2\u25EF\u22C3\u25BD\uD835\uDD35\u27FA\u27F7\u03BE\u27F8\u27F5\u27FC\u22FB\u2A00\uD835\uDD69\u2A01\u2A02\u27F9\u27F6\uD835\uDCCD\u2A06\u2A04\u25B3\u22C1\u22C0ý\u044F\u0177\u044B¥\uD835\uDD36\u0457\uD835\uDD6A\uD835\uDCCE\u044Eÿ\u017A\u017E\u0437\u017C\u2128\u03B6\uD835\uDD37\u0436\u21DD\uD835\uDD6B\uD835\uDCCF\u200D\u200C"];

  /**
   * Constants and helpers shared between the decode-data generator
   * (`scripts/write-decode-map.ts`) and the runtime (`src/decode.ts`).
   *
   * The format and the algorithms (front-coded names, exact 32-bit keys in a
   * two-choice cuckoo table, the length-probe front end, and the measured
   * engineering notes) are documented with references in
   * `scripts/README.md`.
   */
  /** Bias added to every meta char so none needs escaping in JS source. */
  const META_BIAS = 0x23;
  /** Bias for header and choice-bit chars. */
  const HEADER_BIAS = 0x30;
  /** Number of header chars: n (2), suffixes length (2), bucket count (2). */
  const HEADER_LENGTH = 6;
  /** Choice bits packed per char. */
  const CHOICE_BITS_PER_CHAR = 6;
  /** Multiplier deriving the first candidate bucket from a key. */
  const BUCKET_HASH_1 = 0x9e_37_79_b1;
  /** Multiplier deriving the second candidate bucket from a key. */
  const BUCKET_HASH_2 = 0x85_eb_ca_6b;
  /** Size of the (c0,c1) class table (10-bit index). */
  const PAIR_TABLE_SIZE = 1024;
  /**
   * Map an alphanumeric char code to 6 bits (1..62); 0 = not alphanumeric.
   * Used for the key's last-character field.
   */
  const CHAR_REMAP = (() => {
      const remap = new Uint8Array(128);
      for (let code = 0x30; code <= 0x39; code++)
          remap[code] = code - 0x2f;
      for (let code = 0x41; code <= 0x5a; code++)
          remap[code] = code - 0x36;
      for (let code = 0x61; code <= 0x7a; code++)
          remap[code] = code - 0x3c;
      return remap;
  })();
  /**
   * The exact 32-bit key for a name occurring at `nameStart` with `length`
   * chars. Covers the first two and last two characters plus the length;
   * middle characters are verified separately against the names blob.
   *
   * The hot decoder inlines this computation; tests assert both stay in sync
   * by looking every entity up through the public API.
   * @param text Text containing the name.
   * @param nameStart Index of the name's first character.
   * @param length Length of the name.
   */
  function exactKey(text, nameStart, length) {
      return ((text.charCodeAt(nameStart) << 25) |
          (text.charCodeAt(nameStart + 1) << 18) |
          (text.charCodeAt(nameStart + length - 2) << 11) |
          (CHAR_REMAP[text.charCodeAt(nameStart + length - 1)] << 5) |
          length);
  }
  /**
   * The 10-bit (c0,c1) class index used by the probe front end. The function
   * was chosen by exhaustive search over load-free mixers for minimal
   * candidate-set collisions on the real entity set.
   * @param c0 First char code of the candidate name.
   * @param c1 Second char code.
   */
  function pairIndex(c0, c1) {
      return (((c0 * 3) << 3) ^ c1) & (PAIR_TABLE_SIZE - 1);
  }
  /**
   * First candidate bucket for a key in a table of `buckets` buckets.
   * @param key Exact key.
   * @param buckets Bucket count.
   */
  function bucketOne(key, buckets) {
      return ((Math.imul(key, BUCKET_HASH_1) >>> 16) * buckets) >>> 16;
  }
  /**
   * Second candidate bucket for a key.
   * @param key Exact key.
   * @param buckets Bucket count.
   */
  function bucketTwo(key, buckets) {
      return ((Math.imul(key, BUCKET_HASH_2) >>> 16) * buckets) >>> 16;
  }
  /**
   * Build the lookup structures from a serialized dataset.
   * @param packed Serialized decode data, see `decode-data-format.ts`.
   */
  function initDecodeData(packed) {
      const [data, values] = packed;
      const nameCount = ((data.charCodeAt(0) - HEADER_BIAS) << 6) |
          (data.charCodeAt(1) - HEADER_BIAS);
      const suffixesLength = ((data.charCodeAt(2) - HEADER_BIAS) << 6) |
          (data.charCodeAt(3) - HEADER_BIAS);
      const buckets = ((data.charCodeAt(4) - HEADER_BIAS) << 6) |
          (data.charCodeAt(5) - HEADER_BIAS);
      const metaStart = HEADER_LENGTH + suffixesLength;
      const choicesStart = metaStart + 2 * nameCount;
      const slotCount = 2 * buckets;
      const keys = new Int32Array(slotCount);
      const slotMidOff = new Uint16Array(slotCount);
      const slotValue = new Uint16Array(slotCount);
      const lengthBits = new Uint32Array(PAIR_TABLE_SIZE);
      const middleOffsets = new Map();
      const middles = [];
      let name = "";
      let suffixOffset = HEADER_LENGTH;
      let valueOffset = 0;
      for (let index = 0; index < nameCount; index++) {
          const meta0 = data.charCodeAt(metaStart + 2 * index) - META_BIAS;
          const meta1 = data.charCodeAt(metaStart + 2 * index + 1) - META_BIAS;
          const prefixLength = meta0 & 31;
          const length = prefixLength + (meta1 & 31);
          const valueLength = (meta1 >> 5) + 1;
          name =
              name.slice(0, prefixLength) +
                  data.slice(suffixOffset, suffixOffset + length - prefixLength);
          suffixOffset += length - prefixLength;
          const key = exactKey(name, 0, length);
          const choice = (data.charCodeAt(choicesStart + Math.floor(index / CHOICE_BITS_PER_CHAR)) -
              HEADER_BIAS) &
              (1 << (index % CHOICE_BITS_PER_CHAR));
          let slot = 2 * (choice === 0 ? bucketOne : bucketTwo)(key, buckets);
          if (keys[slot] !== 0)
              slot += 1;
          keys[slot] = key;
          if (length > 4) {
              const middle = name.slice(2, length - 2);
              const existing = middleOffsets.get(middle);
              if (existing === undefined) {
                  middleOffsets.set(middle, middles.length);
                  slotMidOff[slot] = middles.length;
                  for (let middleIndex = 0; middleIndex < middle.length; middleIndex += 2) {
                      middles.push(middle.charCodeAt(middleIndex) |
                          (middle.charCodeAt(middleIndex + 1) << 16));
                  }
              }
              else {
                  slotMidOff[slot] = existing;
              }
          }
          const pair = pairIndex(name.charCodeAt(0), name.charCodeAt(1));
          lengthBits[pair] |= length <= 16 ? 1 << (length - 2) : 0x80_00;
          if ((meta0 & 0x20) !== 0) {
              lengthBits[pair] |= 1 << (length - 2 + 16);
          }
          /*
           * Values have one or two units, leaving bit 1 for the legacy flag.
           * The generator checks the 14-bit offset and two-unit value limits.
           */
          slotValue[slot] =
              (valueOffset << 2) | (valueLength - 1) | ((meta0 & 0x20) >> 4);
          valueOffset += valueLength;
      }
      return {
          keys,
          buckets,
          slotMidOff,
          slotValue,
          values,
          lengthBits,
          middles: new Uint32Array(middles),
      };
  }

  const CHAR_NUM = 35; // "#"
  const CHAR_SEMI = 59; // ";"
  const CHAR_EQUALS = 61; // "="
  const CHAR_ZERO = 48; // "0"
  const CHAR_LOWER_A = 97; // "a"
  const CHAR_LOWER_X = 120; // "x"
  const CHAR_UPPER_A = 65; // "A"
  /** Bit that needs to be set to convert an upper case ASCII character to lower case */
  const TO_LOWER_BIT = 0b10_0000;
  /**
   * Unsigned subtraction trick: (code - lo) >>> 0 wraps negatives to large
   * values, so a single `<=` covers the entire [lo..hi] range check.
   * @param code Code point to check.
   */
  function isNumber(code) {
      return (code - CHAR_ZERO) >>> 0 <= 9;
  }
  function isAlphaNumeric(code) {
      return (isNumber(code) || ((code | TO_LOWER_BIT) - CHAR_LOWER_A) >>> 0 <= 25 // Z - a
      );
  }
  /**
   * Checks if the given character is a valid end character for an entity in an attribute.
   *
   * Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
   * See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
   * @param code Code point to check.
   */
  function isEntityInAttributeInvalidEnd(code) {
      return code === CHAR_EQUALS || isAlphaNumeric(code);
  }
  /**
   * Decoding mode for named entities.
   */
  var DecodingMode;
  (function (DecodingMode) {
      /** Entities in text nodes that can end with any character. */
      DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
      /** Only allow entities terminated with a semicolon. */
      DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
      /** Entities in attributes have limitations on ending characters. */
      DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
  })(DecodingMode || (DecodingMode = {}));
  /** Decode data for HTML entities. */
  const htmlDecode = /* #__PURE__ */ initDecodeData(htmlDecodeData);
  /*
   * Every decoder below is specialized over these module-level constants. V8
   * compiles direct references to them roughly 20% faster than property loads
   * off a shared object.
   */
  const htmlKeys = /* #__PURE__ */ (() => htmlDecode.keys)();
  const htmlBuckets = /* #__PURE__ */ (() => htmlDecode.buckets)();
  const htmlSlotMidOff = /* #__PURE__ */ (() => htmlDecode.slotMidOff)();
  const htmlLengthBits = /* #__PURE__ */ (() => htmlDecode.lengthBits)();
  const htmlMiddles = /* #__PURE__ */ (() => htmlDecode.middles)();
  /** Hoisted for the specialized HTML cores; see `emitHtmlValue`. */
  const htmlSlotValue = /* #__PURE__ */ (() => htmlDecode.slotValue)();
  const htmlValues = /* #__PURE__ */ (() => htmlDecode.values)();
  /**
   * Find the slot matching `text[start..start+length)`, or -1. A match proves
   * every character of the span (exact key + middle comparison).
   * @param text Input text.
   * @param start Start of the span in `text`.
   * @param length Length of the span.
   */
  function findSlotHtml(text, start, length) {
      const c0 = text.charCodeAt(start);
      const c1 = text.charCodeAt(start + 1);
      const c2 = text.charCodeAt(start + length - 2);
      const c3 = text.charCodeAt(start + length - 1);
      /*
       * Probed spans aren't pre-filtered to alphanumerics; characters >= 0x80
       * would alias mod 128 inside the packed 7-bit fields, so reject them
       * before they can forge a key.
       */
      if ((c0 | c1 | c2 | c3) > 127)
          return -1;
      const key = (c0 << 25) | (c1 << 18) | (c2 << 11) | (CHAR_REMAP[c3] << 5) | length;
      let slot = 2 * (((Math.imul(key, BUCKET_HASH_1) >>> 16) * htmlBuckets) >>> 16);
      for (let attempt = 0;; attempt++) {
          if (htmlKeys[slot] === key &&
              (length <= 4 || isMidMatchHtml(slot, text, start, length))) {
              return slot;
          }
          if (htmlKeys[slot + 1] === key &&
              (length <= 4 || isMidMatchHtml(slot + 1, text, start, length))) {
              return slot + 1;
          }
          if (attempt === 1)
              return -1;
          slot =
              2 * (((Math.imul(key, BUCKET_HASH_2) >>> 16) * htmlBuckets) >>> 16);
      }
  }
  /**
   * Compare the middle characters (positions 2..length-3) of the candidate at
   * `slot` against the input. The key already proves the outer characters and
   * the length. Names of length at most four are accepted by the caller.
   * @param slot Slot of the candidate.
   * @param text Input text.
   * @param start Start of the span in `text`.
   * @param length Length of the span.
   */
  function isMidMatchHtml(slot, text, start, length) {
      let wordIndex = htmlSlotMidOff[slot];
      let index = start + 2;
      const end = start + length - 2;
      while (index + 1 < end) {
          if ((text.charCodeAt(index) | (text.charCodeAt(index + 1) << 16)) !==
              htmlMiddles[wordIndex++])
              return false;
          index += 2;
      }
      return (index === end ||
          text.charCodeAt(index) === (htmlMiddles[wordIndex] & 0xff_ff));
  }
  /** ASCII digit values; 0xff marks characters outside the hexadecimal range. */
  const numericDigits = /* #__PURE__ */ (() => {
      const digits = new Uint8Array(128).fill(0xff);
      for (let digit = 0; digit < 10; digit++) {
          digits[CHAR_ZERO + digit] = digit;
      }
      for (let digit = 0; digit < 6; digit++) {
          digits[CHAR_UPPER_A + digit] = digit + 10;
          digits[CHAR_LOWER_A + digit] = digit + 10;
      }
      return digits;
  })();
  /**
   * Find the longest legacy (semicolon-less) match for the name starting at
   * `start`, using the per-class legacy length bits. Returns
   * `slot << 3 | matchLength`, or -1 if there is no match. Only called after
   * the exact probes failed (the miss path).
   * @param input Input text.
   * @param start Start of the name.
   * @param maxLength Number of available run characters.
   */
  function findLegacySlot(input, start, maxLength) {
      let legacy = (htmlLengthBits[pairIndex(input.charCodeAt(start), input.charCodeAt(start + 1))] >>>
          16) &
          31;
      while (legacy !== 0) {
          // Longest first: the spec matches references greedily.
          const top = 31 - Math.clz32(legacy);
          legacy ^= 1 << top;
          if (top + 2 > maxLength)
              continue;
          const slot = findSlotHtml(input, start, top + 2);
          if (slot >= 0 && (htmlSlotValue[slot] & 2) !== 0) {
              return (slot << 3) | (top + 2);
          }
      }
      return -1;
  }
  /**
   * Match a class containing long names without probing all its shorter lengths.
   * The 32-character window bounds the scan even for invalid or unterminated runs.
   * Returns `(slot << 6) | consumed`, excluding the `&`, or -1 on a miss.
   * @param input Input containing the candidate name.
   * @param start Start of the name.
   * @param mode Decoding mode, including the rules for legacy matches.
   */
  function findLongClassMatch(input, start, mode) {
      const length = input.slice(start, start + 32).indexOf(";");
      if ((length - 2) >>> 0 <= 29) {
          const slot = findSlotHtml(input, start, length);
          if (slot >= 0)
              return (slot << 6) | (length + 1);
      }
      if (mode !== DecodingMode.Strict) {
          const packed = findLegacySlot(input, start, Math.min(31, input.length - start));
          if (packed >= 0) {
              const length = packed & 7;
              if (mode !== DecodingMode.Attribute ||
                  start + length >= input.length ||
                  !isEntityInAttributeInvalidEnd(input.charCodeAt(start + length)))
                  return ((packed >> 3) << 6) | length;
          }
      }
      return -1;
  }
  const STATE_ENTITY_START = 0;
  const STATE_NUMERIC_START = 1;
  const STATE_NUMERIC_DECIMAL = 2;
  const STATE_NUMERIC_HEX = 3;
  const STATE_NAMED_ENTITY = 4;
  /**
   * Token decoder with support of writing partial entities; the shared base
   * of `HtmlEntityDecoder` and `XmlEntityDecoder`. Numeric entities are
   * identical in both document types and are handled here; named entities are
   * left to the subclasses.
   *
   * The decoder is driven by a tokenizer: after a `&`, write the following
   * input (possibly in chunks). `write` returns the number of characters
   * consumed once the entity is decided, or -1 while more input is needed.
   * Rejection may surface later than strictly possible (the decoder buffers
   * until a terminator or the name-length limit), but emitted code points,
   * consumed counts, and final return values are exact.
   */
  class EntityDecoderBase {
      emitCodePoint;
      errors;
      /** The current state of the decoder. */
      state = STATE_ENTITY_START;
      /** Characters that were consumed while parsing an entity. */
      consumed = 1;
      /** Accumulated numeric code point, or a packed partial XML name. */
      result = 0;
      /** The mode in which the decoder is operating. */
      decodeMode = DecodingMode.Strict;
      /** Replacement rules for numeric character references. */
      replaceNumericCodePoint = replaceCodePoint;
      constructor(
      /**
       * The function that is called when a codepoint is decoded.
       *
       * For multi-byte named entities, this will be called multiple times,
       * with the second codepoint, and the same `consumed` value.
       * @param codepoint The decoded codepoint.
       * @param consumed The number of bytes consumed by the decoder.
       */
      emitCodePoint, 
      /** An object that is used to produce errors. */
      errors) {
          this.emitCodePoint = emitCodePoint;
          this.errors = errors;
      }
      /**
       * Switches between the numeric decimal and hexadecimal states.
       *
       * Equivalent to the `Numeric character reference state` in the HTML spec.
       * @param input The string containing the entity (or a continuation of the entity).
       * @param offset The current offset.
       * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
       */
      stateNumericStart(input, offset) {
          if (offset >= input.length) {
              return -1;
          }
          if ((input.charCodeAt(offset) | TO_LOWER_BIT) === CHAR_LOWER_X) {
              this.state = STATE_NUMERIC_HEX;
              this.consumed += 1;
              return this.stateNumericHex(input, offset + 1);
          }
          this.state = STATE_NUMERIC_DECIMAL;
          return this.stateNumericDecimal(input, offset);
      }
      /**
       * Parses a hexadecimal numeric entity.
       *
       * Equivalent to the `Hexadecimal character reference state` in the HTML spec.
       * @param input The string containing the entity (or a continuation of the entity).
       * @param offset The current offset.
       * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
       */
      stateNumericHex(input, offset) {
          const inputLength = input.length;
          // Local accumulators; flushed before any exit.
          let { result, consumed } = this;
          let index = offset;
          while (index < inputLength) {
              const char = input.charCodeAt(index);
              const digit = numericDigits[char];
              if (digit <= 15) {
                  result = result * 16 + digit;
              }
              else {
                  this.result = result;
                  this.consumed = consumed;
                  return this.emitNumericEntity(char, 3);
              }
              consumed += 1;
              index += 1;
          }
          this.result = result;
          this.consumed = consumed;
          return -1; // Incomplete entity
      }
      /**
       * Parses a decimal numeric entity.
       *
       * Equivalent to the `Decimal character reference state` in the HTML spec.
       * @param input The string containing the entity (or a continuation of the entity).
       * @param offset The current offset.
       * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
       */
      stateNumericDecimal(input, offset) {
          const inputLength = input.length;
          // Local accumulators; flushed before any exit.
          let { result, consumed } = this;
          let index = offset;
          while (index < inputLength) {
              const digit = input.charCodeAt(index) - CHAR_ZERO;
              if (digit >>> 0 > 9) {
                  this.result = result;
                  this.consumed = consumed;
                  return this.emitNumericEntity(digit + CHAR_ZERO, 2);
              }
              result = result * 10 + digit;
              consumed += 1;
              index += 1;
          }
          this.result = result;
          this.consumed = consumed;
          return -1; // Incomplete entity
      }
      /**
       * Validate and emit a numeric entity.
       *
       * Implements the logic from the `Hexadecimal character reference start
       * state` and `Numeric character reference end state` in the HTML spec.
       * @param lastCp The last code point of the entity. Used to see if the
       *               entity was terminated with a semicolon.
       * @param expectedLength The minimum number of characters that should be
       *                       consumed. Used to validate that at least one digit
       *                       was consumed.
       * @returns The number of characters that were consumed.
       */
      emitNumericEntity(lastCp, expectedLength) {
          // Ensure we consumed at least one digit.
          if (this.consumed <= expectedLength) {
              this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed);
              return 0;
          }
          // Figure out if this is a legit end of the entity
          if (lastCp === CHAR_SEMI) {
              this.consumed += 1;
          }
          else if (this.decodeMode === DecodingMode.Strict) {
              return 0;
          }
          this.emitCodePoint(this.replaceNumericCodePoint(this.result), this.consumed);
          if (this.errors) {
              if (lastCp !== CHAR_SEMI) {
                  this.errors.missingSemicolonAfterCharacterReference();
              }
              this.errors.validateNumericCharacterReference(this.result);
          }
          return this.consumed;
      }
      /**
       * Resets the instance to make it reusable.
       * @param decodeMode Entity decoding mode to use.
       */
      startEntity(decodeMode) {
          this.decodeMode = decodeMode;
          this.state = STATE_ENTITY_START;
          this.result = 0;
          this.consumed = 1;
      }
      /**
       * Write an entity to the decoder. This can be called multiple times with partial entities.
       * If the entity is incomplete, the decoder will return -1.
       * @param input The string containing the entity (or a continuation of the entity).
       * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
       * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
       */
      write(input, offset) {
          switch (this.state) {
              case STATE_ENTITY_START: {
                  if (input.charCodeAt(offset) === CHAR_NUM) {
                      this.state = STATE_NUMERIC_START;
                      this.consumed += 1;
                      return this.stateNumericStart(input, offset + 1);
                  }
                  this.state = STATE_NAMED_ENTITY;
                  return this.stateNamedEntity(input, offset);
              }
              case STATE_NUMERIC_START: {
                  return this.stateNumericStart(input, offset);
              }
              case STATE_NUMERIC_DECIMAL: {
                  return this.stateNumericDecimal(input, offset);
              }
              case STATE_NUMERIC_HEX: {
                  return this.stateNumericHex(input, offset);
              }
              default: {
                  // NamedEntity: the only remaining state.
                  return this.stateNamedEntity(input, offset);
              }
          }
      }
      /**
       * Signal to the parser that the end of the input was reached.
       *
       * Remaining data will be emitted and relevant errors will be produced.
       * @returns The number of characters consumed.
       */
      end() {
          switch (this.state) {
              case STATE_NAMED_ENTITY: {
                  return this.endNamedEntity();
              }
              // Otherwise, emit a numeric entity if we have one.
              case STATE_NUMERIC_DECIMAL: {
                  return this.emitNumericEntity(0, 2);
              }
              case STATE_NUMERIC_HEX: {
                  return this.emitNumericEntity(0, 3);
              }
              case STATE_NUMERIC_START: {
                  this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed);
                  return 0;
              }
              default: {
                  // EntityStart: return 0.
                  return 0;
              }
          }
      }
  }
  /**
   * Streaming decoder for HTML entities.
   *
   * When the entity fits inside the current chunk (the common case), the
   * lookup runs directly on the chunk via the same length-probe scheme as the
   * synchronous decoder; chunk-boundary runs use a reusable character buffer.
   */
  class HtmlEntityDecoder extends EntityDecoderBase {
      /** Total name characters seen for the current named entity. */
      runLength = 0;
      /** Reused for ASCII alphanumerics; the 32nd character rules out an exact match. */
      nameBuffer = new Uint8Array(32);
      /**
       * Emit the replacement for a matched slot. Values are at most two
       * UTF-16 code units; like previous versions, each unit is emitted as
       * its own callback (surrogate halves included).
       * @param slot The matched slot.
       */
      emitSlot(slot) {
          const packed = htmlSlotValue[slot];
          const off = packed >> 2;
          this.emitCodePoint(htmlValues.charCodeAt(off), this.consumed);
          if ((packed & 1) !== 0) {
              this.emitCodePoint(htmlValues.charCodeAt(off + 1), this.consumed);
          }
      }
      startEntity(decodeMode) {
          super.startEntity(decodeMode);
          this.runLength = 0;
      }
      stateNamedEntity(input, offset) {
          const inputLength = input.length;
          if (this.runLength === 0 && offset + 17 <= inputLength) {
              /*
               * Fast path: all length probes are conclusive inside this
               * chunk. (Near the chunk end a probe miss could be a name
               * continuing in the next chunk, so fall through to buffering.)
               */
              const c0 = input.charCodeAt(offset);
              const pair = pairIndex(c0, input.charCodeAt(offset + 1));
              const bits = htmlLengthBits[pair];
              if ((bits & 0x80_00) !== 0 && offset + 32 <= inputLength) {
                  const packed = findLongClassMatch(input, offset, this.decodeMode);
                  if (packed >= 0) {
                      const length = packed & 63;
                      this.consumed = length + 1;
                      this.emitSlot(packed >> 6);
                      if (input.charCodeAt(offset + length - 1) !== CHAR_SEMI) {
                          this.errors?.missingSemicolonAfterCharacterReference();
                      }
                      return this.consumed;
                  }
                  // The window decides every exact or legacy candidate.
                  return 0;
              }
              let probed = bits & 0x7f_ff;
              while (probed !== 0) {
                  /*
                   * Shortest candidate first: only one length can carry the
                   * terminating ';' (a ';' inside a longer candidate fails its
                   * middle comparison), so the order is correctness-neutral,
                   * and the most common entities are short. Legacy matches are
                   * resolved after the loop, preserving exact-match
                   * precedence.
                   */
                  const low = probed & -probed;
                  probed ^= low;
                  const length = 33 - Math.clz32(low);
                  if (input.charCodeAt(offset + length) === CHAR_SEMI) {
                      const slot = findSlotHtml(input, offset, length);
                      if (slot >= 0) {
                          this.consumed = length + 2;
                          this.emitSlot(slot);
                          return this.consumed;
                      }
                  }
              }
              if ((bits & 0x80_00) === 0) {
                  if (this.decodeMode !== DecodingMode.Strict) {
                      const packed = findLegacySlot(input, offset, 31);
                      if (packed >= 0) {
                          const matchLength = packed & 7;
                          const next = input.charCodeAt(offset + matchLength);
                          if (this.decodeMode === DecodingMode.Attribute &&
                              isEntityInAttributeInvalidEnd(next)) {
                              return 0;
                          }
                          this.consumed = matchLength + 1;
                          this.emitSlot(packed >> 3);
                          this.errors?.missingSemicolonAfterCharacterReference();
                          return this.consumed;
                      }
                  }
                  // No long names in this class: the probes were exhaustive.
                  return 0;
              }
          }
          // A 32nd name character rules out every exact HTML match.
          let index = offset;
          let { runLength } = this;
          let terminator = -1;
          const scanEnd = Math.min(inputLength, offset + 32 - runLength);
          while (index < scanEnd) {
              const char = input.charCodeAt(index);
              if (!isAlphaNumeric(char)) {
                  terminator = char;
                  break;
              }
              this.nameBuffer[runLength++] = char;
              index++;
          }
          if (terminator < 0 && runLength < 32) {
              this.runLength = runLength;
              return -1;
          }
          if (terminator === CHAR_SEMI && (runLength - 2) >>> 0 <= 29) {
              const slot = findBufferedHtmlSlot(this.nameBuffer, runLength);
              if (slot >= 0) {
                  this.consumed = runLength + 2;
                  this.emitSlot(slot);
                  return this.consumed;
              }
          }
          if (this.decodeMode !== DecodingMode.Strict && runLength >= 2) {
              const packed = findBufferedLegacySlot(this.nameBuffer, runLength);
              if (packed >= 0) {
                  const length = packed & 7;
                  const next = length < runLength ? this.nameBuffer[length] : terminator;
                  if (this.decodeMode === DecodingMode.Attribute &&
                      isEntityInAttributeInvalidEnd(next))
                      return 0;
                  this.consumed = length + 1;
                  this.emitSlot(packed >> 3);
                  this.errors?.missingSemicolonAfterCharacterReference();
                  return this.consumed;
              }
          }
          return 0;
      }
      endNamedEntity() {
          // Emit the longest legacy match in the buffered run, if any.
          if (this.decodeMode === DecodingMode.Strict || this.runLength < 2) {
              return 0;
          }
          const packed = findBufferedLegacySlot(this.nameBuffer, this.runLength);
          if (packed < 0)
              return 0;
          if (this.decodeMode === DecodingMode.Attribute &&
              (packed & 7) < this.runLength) {
              return 0;
          }
          this.consumed = (packed & 7) + 1;
          this.emitSlot(packed >> 3);
          this.errors?.missingSemicolonAfterCharacterReference();
          return this.consumed;
      }
  }
  /**
   * Find a buffered name. Its characters were already checked as ASCII
   * alphanumerics while scanning, so no outer-character range check is needed.
   * @param buffer Reusable character buffer.
   * @param length Number of characters to match.
   */
  function findBufferedHtmlSlot(buffer, length) {
      const key = (buffer[0] << 25) |
          (buffer[1] << 18) |
          (buffer[length - 2] << 11) |
          (CHAR_REMAP[buffer[length - 1]] << 5) |
          length;
      let slot = 2 * (((Math.imul(key, BUCKET_HASH_1) >>> 16) * htmlBuckets) >>> 16);
      for (let attempt = 0;; attempt++) {
          if (htmlKeys[slot] === key &&
              (length <= 4 || isBufferedMiddle(slot, buffer, length)))
              return slot;
          if (htmlKeys[slot + 1] === key &&
              (length <= 4 || isBufferedMiddle(slot + 1, buffer, length)))
              return slot + 1;
          if (attempt === 1)
              return -1;
          slot =
              2 * (((Math.imul(key, BUCKET_HASH_2) >>> 16) * htmlBuckets) >>> 16);
      }
  }
  function isBufferedMiddle(slot, buffer, length) {
      let wordIndex = htmlSlotMidOff[slot];
      let index = 2;
      const end = length - 2;
      while (index + 1 < end) {
          if ((buffer[index] | (buffer[index + 1] << 16)) !==
              htmlMiddles[wordIndex++])
              return false;
          index += 2;
      }
      return (index === end || buffer[index] === (htmlMiddles[wordIndex] & 0xff_ff));
  }
  /**
   * Find the longest legacy name in the buffer, packed as `(slot << 3) | length`.
   * @param buffer Reusable character buffer.
   * @param length Number of buffered characters.
   */
  function findBufferedLegacySlot(buffer, length) {
      let legacy = (htmlLengthBits[pairIndex(buffer[0], buffer[1])] >>> 16) & 31;
      while (legacy !== 0) {
          const top = 31 - Math.clz32(legacy);
          legacy ^= 1 << top;
          if (top + 2 > length)
              continue;
          const slot = findBufferedHtmlSlot(buffer, top + 2);
          if (slot >= 0 && (htmlSlotValue[slot] & 2) !== 0)
              return (slot << 3) | (top + 2);
      }
      return -1;
  }

  /** All valid namespaces in HTML. */
  var NS;
  (function (NS) {
      NS["HTML"] = "http://www.w3.org/1999/xhtml";
      NS["MATHML"] = "http://www.w3.org/1998/Math/MathML";
      NS["SVG"] = "http://www.w3.org/2000/svg";
      NS["XLINK"] = "http://www.w3.org/1999/xlink";
      NS["XML"] = "http://www.w3.org/XML/1998/namespace";
      NS["XMLNS"] = "http://www.w3.org/2000/xmlns/";
  })(NS || (NS = {}));
  var ATTRS;
  (function (ATTRS) {
      ATTRS["TYPE"] = "type";
      ATTRS["ACTION"] = "action";
      ATTRS["ENCODING"] = "encoding";
      ATTRS["PROMPT"] = "prompt";
      ATTRS["NAME"] = "name";
      ATTRS["COLOR"] = "color";
      ATTRS["FACE"] = "face";
      ATTRS["SIZE"] = "size";
  })(ATTRS || (ATTRS = {}));
  /**
   * The mode of the document.
   *
   * @see {@link https://dom.spec.whatwg.org/#concept-document-limited-quirks}
   */
  var DOCUMENT_MODE;
  (function (DOCUMENT_MODE) {
      DOCUMENT_MODE["NO_QUIRKS"] = "no-quirks";
      DOCUMENT_MODE["QUIRKS"] = "quirks";
      DOCUMENT_MODE["LIMITED_QUIRKS"] = "limited-quirks";
  })(DOCUMENT_MODE || (DOCUMENT_MODE = {}));
  var TAG_NAMES;
  (function (TAG_NAMES) {
      TAG_NAMES["A"] = "a";
      TAG_NAMES["ADDRESS"] = "address";
      TAG_NAMES["ANNOTATION_XML"] = "annotation-xml";
      TAG_NAMES["APPLET"] = "applet";
      TAG_NAMES["AREA"] = "area";
      TAG_NAMES["ARTICLE"] = "article";
      TAG_NAMES["ASIDE"] = "aside";
      TAG_NAMES["B"] = "b";
      TAG_NAMES["BASE"] = "base";
      TAG_NAMES["BASEFONT"] = "basefont";
      TAG_NAMES["BGSOUND"] = "bgsound";
      TAG_NAMES["BIG"] = "big";
      TAG_NAMES["BLOCKQUOTE"] = "blockquote";
      TAG_NAMES["BODY"] = "body";
      TAG_NAMES["BR"] = "br";
      TAG_NAMES["BUTTON"] = "button";
      TAG_NAMES["CAPTION"] = "caption";
      TAG_NAMES["CENTER"] = "center";
      TAG_NAMES["CODE"] = "code";
      TAG_NAMES["COL"] = "col";
      TAG_NAMES["COLGROUP"] = "colgroup";
      TAG_NAMES["DD"] = "dd";
      TAG_NAMES["DESC"] = "desc";
      TAG_NAMES["DETAILS"] = "details";
      TAG_NAMES["DIALOG"] = "dialog";
      TAG_NAMES["DIR"] = "dir";
      TAG_NAMES["DIV"] = "div";
      TAG_NAMES["DL"] = "dl";
      TAG_NAMES["DT"] = "dt";
      TAG_NAMES["EM"] = "em";
      TAG_NAMES["EMBED"] = "embed";
      TAG_NAMES["FIELDSET"] = "fieldset";
      TAG_NAMES["FIGCAPTION"] = "figcaption";
      TAG_NAMES["FIGURE"] = "figure";
      TAG_NAMES["FONT"] = "font";
      TAG_NAMES["FOOTER"] = "footer";
      TAG_NAMES["FOREIGN_OBJECT"] = "foreignObject";
      TAG_NAMES["FORM"] = "form";
      TAG_NAMES["FRAME"] = "frame";
      TAG_NAMES["FRAMESET"] = "frameset";
      TAG_NAMES["H1"] = "h1";
      TAG_NAMES["H2"] = "h2";
      TAG_NAMES["H3"] = "h3";
      TAG_NAMES["H4"] = "h4";
      TAG_NAMES["H5"] = "h5";
      TAG_NAMES["H6"] = "h6";
      TAG_NAMES["HEAD"] = "head";
      TAG_NAMES["HEADER"] = "header";
      TAG_NAMES["HGROUP"] = "hgroup";
      TAG_NAMES["HR"] = "hr";
      TAG_NAMES["HTML"] = "html";
      TAG_NAMES["I"] = "i";
      TAG_NAMES["IMG"] = "img";
      TAG_NAMES["IMAGE"] = "image";
      TAG_NAMES["INPUT"] = "input";
      TAG_NAMES["IFRAME"] = "iframe";
      TAG_NAMES["KEYGEN"] = "keygen";
      TAG_NAMES["LABEL"] = "label";
      TAG_NAMES["LI"] = "li";
      TAG_NAMES["LINK"] = "link";
      TAG_NAMES["LISTING"] = "listing";
      TAG_NAMES["MAIN"] = "main";
      TAG_NAMES["MALIGNMARK"] = "malignmark";
      TAG_NAMES["MARQUEE"] = "marquee";
      TAG_NAMES["MATH"] = "math";
      TAG_NAMES["MENU"] = "menu";
      TAG_NAMES["META"] = "meta";
      TAG_NAMES["MGLYPH"] = "mglyph";
      TAG_NAMES["MI"] = "mi";
      TAG_NAMES["MO"] = "mo";
      TAG_NAMES["MN"] = "mn";
      TAG_NAMES["MS"] = "ms";
      TAG_NAMES["MTEXT"] = "mtext";
      TAG_NAMES["NAV"] = "nav";
      TAG_NAMES["NOBR"] = "nobr";
      TAG_NAMES["NOFRAMES"] = "noframes";
      TAG_NAMES["NOEMBED"] = "noembed";
      TAG_NAMES["NOSCRIPT"] = "noscript";
      TAG_NAMES["OBJECT"] = "object";
      TAG_NAMES["OL"] = "ol";
      TAG_NAMES["OPTGROUP"] = "optgroup";
      TAG_NAMES["OPTION"] = "option";
      TAG_NAMES["P"] = "p";
      TAG_NAMES["PARAM"] = "param";
      TAG_NAMES["PLAINTEXT"] = "plaintext";
      TAG_NAMES["PRE"] = "pre";
      TAG_NAMES["RB"] = "rb";
      TAG_NAMES["RP"] = "rp";
      TAG_NAMES["RT"] = "rt";
      TAG_NAMES["RTC"] = "rtc";
      TAG_NAMES["RUBY"] = "ruby";
      TAG_NAMES["S"] = "s";
      TAG_NAMES["SCRIPT"] = "script";
      TAG_NAMES["SEARCH"] = "search";
      TAG_NAMES["SECTION"] = "section";
      TAG_NAMES["SELECT"] = "select";
      TAG_NAMES["SOURCE"] = "source";
      TAG_NAMES["SMALL"] = "small";
      TAG_NAMES["SPAN"] = "span";
      TAG_NAMES["STRIKE"] = "strike";
      TAG_NAMES["STRONG"] = "strong";
      TAG_NAMES["STYLE"] = "style";
      TAG_NAMES["SUB"] = "sub";
      TAG_NAMES["SUMMARY"] = "summary";
      TAG_NAMES["SUP"] = "sup";
      TAG_NAMES["TABLE"] = "table";
      TAG_NAMES["TBODY"] = "tbody";
      TAG_NAMES["TEMPLATE"] = "template";
      TAG_NAMES["TEXTAREA"] = "textarea";
      TAG_NAMES["TFOOT"] = "tfoot";
      TAG_NAMES["TD"] = "td";
      TAG_NAMES["TH"] = "th";
      TAG_NAMES["THEAD"] = "thead";
      TAG_NAMES["TITLE"] = "title";
      TAG_NAMES["TR"] = "tr";
      TAG_NAMES["TRACK"] = "track";
      TAG_NAMES["TT"] = "tt";
      TAG_NAMES["U"] = "u";
      TAG_NAMES["UL"] = "ul";
      TAG_NAMES["SVG"] = "svg";
      TAG_NAMES["VAR"] = "var";
      TAG_NAMES["WBR"] = "wbr";
      TAG_NAMES["XMP"] = "xmp";
  })(TAG_NAMES || (TAG_NAMES = {}));
  /**
   * Tag IDs are numeric IDs for known tag names.
   *
   * We use tag IDs to improve the performance of tag name comparisons.
   */
  var TAG_ID;
  (function (TAG_ID) {
      TAG_ID[TAG_ID["UNKNOWN"] = 0] = "UNKNOWN";
      TAG_ID[TAG_ID["A"] = 1] = "A";
      TAG_ID[TAG_ID["ADDRESS"] = 2] = "ADDRESS";
      TAG_ID[TAG_ID["ANNOTATION_XML"] = 3] = "ANNOTATION_XML";
      TAG_ID[TAG_ID["APPLET"] = 4] = "APPLET";
      TAG_ID[TAG_ID["AREA"] = 5] = "AREA";
      TAG_ID[TAG_ID["ARTICLE"] = 6] = "ARTICLE";
      TAG_ID[TAG_ID["ASIDE"] = 7] = "ASIDE";
      TAG_ID[TAG_ID["B"] = 8] = "B";
      TAG_ID[TAG_ID["BASE"] = 9] = "BASE";
      TAG_ID[TAG_ID["BASEFONT"] = 10] = "BASEFONT";
      TAG_ID[TAG_ID["BGSOUND"] = 11] = "BGSOUND";
      TAG_ID[TAG_ID["BIG"] = 12] = "BIG";
      TAG_ID[TAG_ID["BLOCKQUOTE"] = 13] = "BLOCKQUOTE";
      TAG_ID[TAG_ID["BODY"] = 14] = "BODY";
      TAG_ID[TAG_ID["BR"] = 15] = "BR";
      TAG_ID[TAG_ID["BUTTON"] = 16] = "BUTTON";
      TAG_ID[TAG_ID["CAPTION"] = 17] = "CAPTION";
      TAG_ID[TAG_ID["CENTER"] = 18] = "CENTER";
      TAG_ID[TAG_ID["CODE"] = 19] = "CODE";
      TAG_ID[TAG_ID["COL"] = 20] = "COL";
      TAG_ID[TAG_ID["COLGROUP"] = 21] = "COLGROUP";
      TAG_ID[TAG_ID["DD"] = 22] = "DD";
      TAG_ID[TAG_ID["DESC"] = 23] = "DESC";
      TAG_ID[TAG_ID["DETAILS"] = 24] = "DETAILS";
      TAG_ID[TAG_ID["DIALOG"] = 25] = "DIALOG";
      TAG_ID[TAG_ID["DIR"] = 26] = "DIR";
      TAG_ID[TAG_ID["DIV"] = 27] = "DIV";
      TAG_ID[TAG_ID["DL"] = 28] = "DL";
      TAG_ID[TAG_ID["DT"] = 29] = "DT";
      TAG_ID[TAG_ID["EM"] = 30] = "EM";
      TAG_ID[TAG_ID["EMBED"] = 31] = "EMBED";
      TAG_ID[TAG_ID["FIELDSET"] = 32] = "FIELDSET";
      TAG_ID[TAG_ID["FIGCAPTION"] = 33] = "FIGCAPTION";
      TAG_ID[TAG_ID["FIGURE"] = 34] = "FIGURE";
      TAG_ID[TAG_ID["FONT"] = 35] = "FONT";
      TAG_ID[TAG_ID["FOOTER"] = 36] = "FOOTER";
      TAG_ID[TAG_ID["FOREIGN_OBJECT"] = 37] = "FOREIGN_OBJECT";
      TAG_ID[TAG_ID["FORM"] = 38] = "FORM";
      TAG_ID[TAG_ID["FRAME"] = 39] = "FRAME";
      TAG_ID[TAG_ID["FRAMESET"] = 40] = "FRAMESET";
      TAG_ID[TAG_ID["H1"] = 41] = "H1";
      TAG_ID[TAG_ID["H2"] = 42] = "H2";
      TAG_ID[TAG_ID["H3"] = 43] = "H3";
      TAG_ID[TAG_ID["H4"] = 44] = "H4";
      TAG_ID[TAG_ID["H5"] = 45] = "H5";
      TAG_ID[TAG_ID["H6"] = 46] = "H6";
      TAG_ID[TAG_ID["HEAD"] = 47] = "HEAD";
      TAG_ID[TAG_ID["HEADER"] = 48] = "HEADER";
      TAG_ID[TAG_ID["HGROUP"] = 49] = "HGROUP";
      TAG_ID[TAG_ID["HR"] = 50] = "HR";
      TAG_ID[TAG_ID["HTML"] = 51] = "HTML";
      TAG_ID[TAG_ID["I"] = 52] = "I";
      TAG_ID[TAG_ID["IMG"] = 53] = "IMG";
      TAG_ID[TAG_ID["IMAGE"] = 54] = "IMAGE";
      TAG_ID[TAG_ID["INPUT"] = 55] = "INPUT";
      TAG_ID[TAG_ID["IFRAME"] = 56] = "IFRAME";
      TAG_ID[TAG_ID["KEYGEN"] = 57] = "KEYGEN";
      TAG_ID[TAG_ID["LABEL"] = 58] = "LABEL";
      TAG_ID[TAG_ID["LI"] = 59] = "LI";
      TAG_ID[TAG_ID["LINK"] = 60] = "LINK";
      TAG_ID[TAG_ID["LISTING"] = 61] = "LISTING";
      TAG_ID[TAG_ID["MAIN"] = 62] = "MAIN";
      TAG_ID[TAG_ID["MALIGNMARK"] = 63] = "MALIGNMARK";
      TAG_ID[TAG_ID["MARQUEE"] = 64] = "MARQUEE";
      TAG_ID[TAG_ID["MATH"] = 65] = "MATH";
      TAG_ID[TAG_ID["MENU"] = 66] = "MENU";
      TAG_ID[TAG_ID["META"] = 67] = "META";
      TAG_ID[TAG_ID["MGLYPH"] = 68] = "MGLYPH";
      TAG_ID[TAG_ID["MI"] = 69] = "MI";
      TAG_ID[TAG_ID["MO"] = 70] = "MO";
      TAG_ID[TAG_ID["MN"] = 71] = "MN";
      TAG_ID[TAG_ID["MS"] = 72] = "MS";
      TAG_ID[TAG_ID["MTEXT"] = 73] = "MTEXT";
      TAG_ID[TAG_ID["NAV"] = 74] = "NAV";
      TAG_ID[TAG_ID["NOBR"] = 75] = "NOBR";
      TAG_ID[TAG_ID["NOFRAMES"] = 76] = "NOFRAMES";
      TAG_ID[TAG_ID["NOEMBED"] = 77] = "NOEMBED";
      TAG_ID[TAG_ID["NOSCRIPT"] = 78] = "NOSCRIPT";
      TAG_ID[TAG_ID["OBJECT"] = 79] = "OBJECT";
      TAG_ID[TAG_ID["OL"] = 80] = "OL";
      TAG_ID[TAG_ID["OPTGROUP"] = 81] = "OPTGROUP";
      TAG_ID[TAG_ID["OPTION"] = 82] = "OPTION";
      TAG_ID[TAG_ID["P"] = 83] = "P";
      TAG_ID[TAG_ID["PARAM"] = 84] = "PARAM";
      TAG_ID[TAG_ID["PLAINTEXT"] = 85] = "PLAINTEXT";
      TAG_ID[TAG_ID["PRE"] = 86] = "PRE";
      TAG_ID[TAG_ID["RB"] = 87] = "RB";
      TAG_ID[TAG_ID["RP"] = 88] = "RP";
      TAG_ID[TAG_ID["RT"] = 89] = "RT";
      TAG_ID[TAG_ID["RTC"] = 90] = "RTC";
      TAG_ID[TAG_ID["RUBY"] = 91] = "RUBY";
      TAG_ID[TAG_ID["S"] = 92] = "S";
      TAG_ID[TAG_ID["SCRIPT"] = 93] = "SCRIPT";
      TAG_ID[TAG_ID["SEARCH"] = 94] = "SEARCH";
      TAG_ID[TAG_ID["SECTION"] = 95] = "SECTION";
      TAG_ID[TAG_ID["SELECT"] = 96] = "SELECT";
      TAG_ID[TAG_ID["SOURCE"] = 97] = "SOURCE";
      TAG_ID[TAG_ID["SMALL"] = 98] = "SMALL";
      TAG_ID[TAG_ID["SPAN"] = 99] = "SPAN";
      TAG_ID[TAG_ID["STRIKE"] = 100] = "STRIKE";
      TAG_ID[TAG_ID["STRONG"] = 101] = "STRONG";
      TAG_ID[TAG_ID["STYLE"] = 102] = "STYLE";
      TAG_ID[TAG_ID["SUB"] = 103] = "SUB";
      TAG_ID[TAG_ID["SUMMARY"] = 104] = "SUMMARY";
      TAG_ID[TAG_ID["SUP"] = 105] = "SUP";
      TAG_ID[TAG_ID["TABLE"] = 106] = "TABLE";
      TAG_ID[TAG_ID["TBODY"] = 107] = "TBODY";
      TAG_ID[TAG_ID["TEMPLATE"] = 108] = "TEMPLATE";
      TAG_ID[TAG_ID["TEXTAREA"] = 109] = "TEXTAREA";
      TAG_ID[TAG_ID["TFOOT"] = 110] = "TFOOT";
      TAG_ID[TAG_ID["TD"] = 111] = "TD";
      TAG_ID[TAG_ID["TH"] = 112] = "TH";
      TAG_ID[TAG_ID["THEAD"] = 113] = "THEAD";
      TAG_ID[TAG_ID["TITLE"] = 114] = "TITLE";
      TAG_ID[TAG_ID["TR"] = 115] = "TR";
      TAG_ID[TAG_ID["TRACK"] = 116] = "TRACK";
      TAG_ID[TAG_ID["TT"] = 117] = "TT";
      TAG_ID[TAG_ID["U"] = 118] = "U";
      TAG_ID[TAG_ID["UL"] = 119] = "UL";
      TAG_ID[TAG_ID["SVG"] = 120] = "SVG";
      TAG_ID[TAG_ID["VAR"] = 121] = "VAR";
      TAG_ID[TAG_ID["WBR"] = 122] = "WBR";
      TAG_ID[TAG_ID["XMP"] = 123] = "XMP";
  })(TAG_ID || (TAG_ID = {}));
  const TAG_NAME_TO_ID = new Map([
      [TAG_NAMES.A, TAG_ID.A],
      [TAG_NAMES.ADDRESS, TAG_ID.ADDRESS],
      [TAG_NAMES.ANNOTATION_XML, TAG_ID.ANNOTATION_XML],
      [TAG_NAMES.APPLET, TAG_ID.APPLET],
      [TAG_NAMES.AREA, TAG_ID.AREA],
      [TAG_NAMES.ARTICLE, TAG_ID.ARTICLE],
      [TAG_NAMES.ASIDE, TAG_ID.ASIDE],
      [TAG_NAMES.B, TAG_ID.B],
      [TAG_NAMES.BASE, TAG_ID.BASE],
      [TAG_NAMES.BASEFONT, TAG_ID.BASEFONT],
      [TAG_NAMES.BGSOUND, TAG_ID.BGSOUND],
      [TAG_NAMES.BIG, TAG_ID.BIG],
      [TAG_NAMES.BLOCKQUOTE, TAG_ID.BLOCKQUOTE],
      [TAG_NAMES.BODY, TAG_ID.BODY],
      [TAG_NAMES.BR, TAG_ID.BR],
      [TAG_NAMES.BUTTON, TAG_ID.BUTTON],
      [TAG_NAMES.CAPTION, TAG_ID.CAPTION],
      [TAG_NAMES.CENTER, TAG_ID.CENTER],
      [TAG_NAMES.CODE, TAG_ID.CODE],
      [TAG_NAMES.COL, TAG_ID.COL],
      [TAG_NAMES.COLGROUP, TAG_ID.COLGROUP],
      [TAG_NAMES.DD, TAG_ID.DD],
      [TAG_NAMES.DESC, TAG_ID.DESC],
      [TAG_NAMES.DETAILS, TAG_ID.DETAILS],
      [TAG_NAMES.DIALOG, TAG_ID.DIALOG],
      [TAG_NAMES.DIR, TAG_ID.DIR],
      [TAG_NAMES.DIV, TAG_ID.DIV],
      [TAG_NAMES.DL, TAG_ID.DL],
      [TAG_NAMES.DT, TAG_ID.DT],
      [TAG_NAMES.EM, TAG_ID.EM],
      [TAG_NAMES.EMBED, TAG_ID.EMBED],
      [TAG_NAMES.FIELDSET, TAG_ID.FIELDSET],
      [TAG_NAMES.FIGCAPTION, TAG_ID.FIGCAPTION],
      [TAG_NAMES.FIGURE, TAG_ID.FIGURE],
      [TAG_NAMES.FONT, TAG_ID.FONT],
      [TAG_NAMES.FOOTER, TAG_ID.FOOTER],
      [TAG_NAMES.FOREIGN_OBJECT, TAG_ID.FOREIGN_OBJECT],
      [TAG_NAMES.FORM, TAG_ID.FORM],
      [TAG_NAMES.FRAME, TAG_ID.FRAME],
      [TAG_NAMES.FRAMESET, TAG_ID.FRAMESET],
      [TAG_NAMES.H1, TAG_ID.H1],
      [TAG_NAMES.H2, TAG_ID.H2],
      [TAG_NAMES.H3, TAG_ID.H3],
      [TAG_NAMES.H4, TAG_ID.H4],
      [TAG_NAMES.H5, TAG_ID.H5],
      [TAG_NAMES.H6, TAG_ID.H6],
      [TAG_NAMES.HEAD, TAG_ID.HEAD],
      [TAG_NAMES.HEADER, TAG_ID.HEADER],
      [TAG_NAMES.HGROUP, TAG_ID.HGROUP],
      [TAG_NAMES.HR, TAG_ID.HR],
      [TAG_NAMES.HTML, TAG_ID.HTML],
      [TAG_NAMES.I, TAG_ID.I],
      [TAG_NAMES.IMG, TAG_ID.IMG],
      [TAG_NAMES.IMAGE, TAG_ID.IMAGE],
      [TAG_NAMES.INPUT, TAG_ID.INPUT],
      [TAG_NAMES.IFRAME, TAG_ID.IFRAME],
      [TAG_NAMES.KEYGEN, TAG_ID.KEYGEN],
      [TAG_NAMES.LABEL, TAG_ID.LABEL],
      [TAG_NAMES.LI, TAG_ID.LI],
      [TAG_NAMES.LINK, TAG_ID.LINK],
      [TAG_NAMES.LISTING, TAG_ID.LISTING],
      [TAG_NAMES.MAIN, TAG_ID.MAIN],
      [TAG_NAMES.MALIGNMARK, TAG_ID.MALIGNMARK],
      [TAG_NAMES.MARQUEE, TAG_ID.MARQUEE],
      [TAG_NAMES.MATH, TAG_ID.MATH],
      [TAG_NAMES.MENU, TAG_ID.MENU],
      [TAG_NAMES.META, TAG_ID.META],
      [TAG_NAMES.MGLYPH, TAG_ID.MGLYPH],
      [TAG_NAMES.MI, TAG_ID.MI],
      [TAG_NAMES.MO, TAG_ID.MO],
      [TAG_NAMES.MN, TAG_ID.MN],
      [TAG_NAMES.MS, TAG_ID.MS],
      [TAG_NAMES.MTEXT, TAG_ID.MTEXT],
      [TAG_NAMES.NAV, TAG_ID.NAV],
      [TAG_NAMES.NOBR, TAG_ID.NOBR],
      [TAG_NAMES.NOFRAMES, TAG_ID.NOFRAMES],
      [TAG_NAMES.NOEMBED, TAG_ID.NOEMBED],
      [TAG_NAMES.NOSCRIPT, TAG_ID.NOSCRIPT],
      [TAG_NAMES.OBJECT, TAG_ID.OBJECT],
      [TAG_NAMES.OL, TAG_ID.OL],
      [TAG_NAMES.OPTGROUP, TAG_ID.OPTGROUP],
      [TAG_NAMES.OPTION, TAG_ID.OPTION],
      [TAG_NAMES.P, TAG_ID.P],
      [TAG_NAMES.PARAM, TAG_ID.PARAM],
      [TAG_NAMES.PLAINTEXT, TAG_ID.PLAINTEXT],
      [TAG_NAMES.PRE, TAG_ID.PRE],
      [TAG_NAMES.RB, TAG_ID.RB],
      [TAG_NAMES.RP, TAG_ID.RP],
      [TAG_NAMES.RT, TAG_ID.RT],
      [TAG_NAMES.RTC, TAG_ID.RTC],
      [TAG_NAMES.RUBY, TAG_ID.RUBY],
      [TAG_NAMES.S, TAG_ID.S],
      [TAG_NAMES.SCRIPT, TAG_ID.SCRIPT],
      [TAG_NAMES.SEARCH, TAG_ID.SEARCH],
      [TAG_NAMES.SECTION, TAG_ID.SECTION],
      [TAG_NAMES.SELECT, TAG_ID.SELECT],
      [TAG_NAMES.SOURCE, TAG_ID.SOURCE],
      [TAG_NAMES.SMALL, TAG_ID.SMALL],
      [TAG_NAMES.SPAN, TAG_ID.SPAN],
      [TAG_NAMES.STRIKE, TAG_ID.STRIKE],
      [TAG_NAMES.STRONG, TAG_ID.STRONG],
      [TAG_NAMES.STYLE, TAG_ID.STYLE],
      [TAG_NAMES.SUB, TAG_ID.SUB],
      [TAG_NAMES.SUMMARY, TAG_ID.SUMMARY],
      [TAG_NAMES.SUP, TAG_ID.SUP],
      [TAG_NAMES.TABLE, TAG_ID.TABLE],
      [TAG_NAMES.TBODY, TAG_ID.TBODY],
      [TAG_NAMES.TEMPLATE, TAG_ID.TEMPLATE],
      [TAG_NAMES.TEXTAREA, TAG_ID.TEXTAREA],
      [TAG_NAMES.TFOOT, TAG_ID.TFOOT],
      [TAG_NAMES.TD, TAG_ID.TD],
      [TAG_NAMES.TH, TAG_ID.TH],
      [TAG_NAMES.THEAD, TAG_ID.THEAD],
      [TAG_NAMES.TITLE, TAG_ID.TITLE],
      [TAG_NAMES.TR, TAG_ID.TR],
      [TAG_NAMES.TRACK, TAG_ID.TRACK],
      [TAG_NAMES.TT, TAG_ID.TT],
      [TAG_NAMES.U, TAG_ID.U],
      [TAG_NAMES.UL, TAG_ID.UL],
      [TAG_NAMES.SVG, TAG_ID.SVG],
      [TAG_NAMES.VAR, TAG_ID.VAR],
      [TAG_NAMES.WBR, TAG_ID.WBR],
      [TAG_NAMES.XMP, TAG_ID.XMP],
  ]);
  function getTagID(tagName) {
      var _a;
      return (_a = TAG_NAME_TO_ID.get(tagName)) !== null && _a !== void 0 ? _a : TAG_ID.UNKNOWN;
  }
  const $ = TAG_ID;
  const SPECIAL_ELEMENTS = {
      [NS.HTML]: new Set([
          $.ADDRESS,
          $.APPLET,
          $.AREA,
          $.ARTICLE,
          $.ASIDE,
          $.BASE,
          $.BASEFONT,
          $.BGSOUND,
          $.BLOCKQUOTE,
          $.BODY,
          $.BR,
          $.BUTTON,
          $.CAPTION,
          $.CENTER,
          $.COL,
          $.COLGROUP,
          $.DD,
          $.DETAILS,
          $.DIR,
          $.DIV,
          $.DL,
          $.DT,
          $.EMBED,
          $.FIELDSET,
          $.FIGCAPTION,
          $.FIGURE,
          $.FOOTER,
          $.FORM,
          $.FRAME,
          $.FRAMESET,
          $.H1,
          $.H2,
          $.H3,
          $.H4,
          $.H5,
          $.H6,
          $.HEAD,
          $.HEADER,
          $.HGROUP,
          $.HR,
          $.HTML,
          $.IFRAME,
          $.IMG,
          $.INPUT,
          $.LI,
          $.LINK,
          $.LISTING,
          $.MAIN,
          $.MARQUEE,
          $.MENU,
          $.META,
          $.NAV,
          $.NOEMBED,
          $.NOFRAMES,
          $.NOSCRIPT,
          $.OBJECT,
          $.OL,
          $.P,
          $.PARAM,
          $.PLAINTEXT,
          $.PRE,
          $.SCRIPT,
          $.SECTION,
          $.SELECT,
          $.SOURCE,
          $.STYLE,
          $.SUMMARY,
          $.TABLE,
          $.TBODY,
          $.TD,
          $.TEMPLATE,
          $.TEXTAREA,
          $.TFOOT,
          $.TH,
          $.THEAD,
          $.TITLE,
          $.TR,
          $.TRACK,
          $.UL,
          $.WBR,
          $.XMP,
      ]),
      [NS.MATHML]: new Set([$.MI, $.MO, $.MN, $.MS, $.MTEXT, $.ANNOTATION_XML]),
      [NS.SVG]: new Set([$.TITLE, $.FOREIGN_OBJECT, $.DESC]),
      [NS.XLINK]: new Set(),
      [NS.XML]: new Set(),
      [NS.XMLNS]: new Set(),
  };
  const NUMBERED_HEADERS = new Set([$.H1, $.H2, $.H3, $.H4, $.H5, $.H6]);
  new Set([
      TAG_NAMES.STYLE,
      TAG_NAMES.SCRIPT,
      TAG_NAMES.XMP,
      TAG_NAMES.IFRAME,
      TAG_NAMES.NOEMBED,
      TAG_NAMES.NOFRAMES,
      TAG_NAMES.PLAINTEXT,
  ]);

  //States
  var State;
  (function (State) {
      State[State["DATA"] = 0] = "DATA";
      State[State["RCDATA"] = 1] = "RCDATA";
      State[State["RAWTEXT"] = 2] = "RAWTEXT";
      State[State["SCRIPT_DATA"] = 3] = "SCRIPT_DATA";
      State[State["PLAINTEXT"] = 4] = "PLAINTEXT";
      State[State["TAG_OPEN"] = 5] = "TAG_OPEN";
      State[State["END_TAG_OPEN"] = 6] = "END_TAG_OPEN";
      State[State["TAG_NAME"] = 7] = "TAG_NAME";
      State[State["RCDATA_LESS_THAN_SIGN"] = 8] = "RCDATA_LESS_THAN_SIGN";
      State[State["RCDATA_END_TAG_OPEN"] = 9] = "RCDATA_END_TAG_OPEN";
      State[State["RCDATA_END_TAG_NAME"] = 10] = "RCDATA_END_TAG_NAME";
      State[State["RAWTEXT_LESS_THAN_SIGN"] = 11] = "RAWTEXT_LESS_THAN_SIGN";
      State[State["RAWTEXT_END_TAG_OPEN"] = 12] = "RAWTEXT_END_TAG_OPEN";
      State[State["RAWTEXT_END_TAG_NAME"] = 13] = "RAWTEXT_END_TAG_NAME";
      State[State["SCRIPT_DATA_LESS_THAN_SIGN"] = 14] = "SCRIPT_DATA_LESS_THAN_SIGN";
      State[State["SCRIPT_DATA_END_TAG_OPEN"] = 15] = "SCRIPT_DATA_END_TAG_OPEN";
      State[State["SCRIPT_DATA_END_TAG_NAME"] = 16] = "SCRIPT_DATA_END_TAG_NAME";
      State[State["SCRIPT_DATA_ESCAPE_START"] = 17] = "SCRIPT_DATA_ESCAPE_START";
      State[State["SCRIPT_DATA_ESCAPE_START_DASH"] = 18] = "SCRIPT_DATA_ESCAPE_START_DASH";
      State[State["SCRIPT_DATA_ESCAPED"] = 19] = "SCRIPT_DATA_ESCAPED";
      State[State["SCRIPT_DATA_ESCAPED_DASH"] = 20] = "SCRIPT_DATA_ESCAPED_DASH";
      State[State["SCRIPT_DATA_ESCAPED_DASH_DASH"] = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH";
      State[State["SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"] = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN";
      State[State["SCRIPT_DATA_ESCAPED_END_TAG_OPEN"] = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN";
      State[State["SCRIPT_DATA_ESCAPED_END_TAG_NAME"] = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME";
      State[State["SCRIPT_DATA_DOUBLE_ESCAPE_START"] = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START";
      State[State["SCRIPT_DATA_DOUBLE_ESCAPED"] = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED";
      State[State["SCRIPT_DATA_DOUBLE_ESCAPED_DASH"] = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH";
      State[State["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"] = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH";
      State[State["SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"] = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN";
      State[State["SCRIPT_DATA_DOUBLE_ESCAPE_END"] = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END";
      State[State["BEFORE_ATTRIBUTE_NAME"] = 31] = "BEFORE_ATTRIBUTE_NAME";
      State[State["ATTRIBUTE_NAME"] = 32] = "ATTRIBUTE_NAME";
      State[State["AFTER_ATTRIBUTE_NAME"] = 33] = "AFTER_ATTRIBUTE_NAME";
      State[State["BEFORE_ATTRIBUTE_VALUE"] = 34] = "BEFORE_ATTRIBUTE_VALUE";
      State[State["ATTRIBUTE_VALUE_DOUBLE_QUOTED"] = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED";
      State[State["ATTRIBUTE_VALUE_SINGLE_QUOTED"] = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED";
      State[State["ATTRIBUTE_VALUE_UNQUOTED"] = 37] = "ATTRIBUTE_VALUE_UNQUOTED";
      State[State["AFTER_ATTRIBUTE_VALUE_QUOTED"] = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED";
      State[State["SELF_CLOSING_START_TAG"] = 39] = "SELF_CLOSING_START_TAG";
      State[State["BOGUS_COMMENT"] = 40] = "BOGUS_COMMENT";
      State[State["MARKUP_DECLARATION_OPEN"] = 41] = "MARKUP_DECLARATION_OPEN";
      State[State["COMMENT_START"] = 42] = "COMMENT_START";
      State[State["COMMENT_START_DASH"] = 43] = "COMMENT_START_DASH";
      State[State["COMMENT"] = 44] = "COMMENT";
      State[State["COMMENT_LESS_THAN_SIGN"] = 45] = "COMMENT_LESS_THAN_SIGN";
      State[State["COMMENT_LESS_THAN_SIGN_BANG"] = 46] = "COMMENT_LESS_THAN_SIGN_BANG";
      State[State["COMMENT_LESS_THAN_SIGN_BANG_DASH"] = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH";
      State[State["COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"] = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH";
      State[State["COMMENT_END_DASH"] = 49] = "COMMENT_END_DASH";
      State[State["COMMENT_END"] = 50] = "COMMENT_END";
      State[State["COMMENT_END_BANG"] = 51] = "COMMENT_END_BANG";
      State[State["DOCTYPE"] = 52] = "DOCTYPE";
      State[State["BEFORE_DOCTYPE_NAME"] = 53] = "BEFORE_DOCTYPE_NAME";
      State[State["DOCTYPE_NAME"] = 54] = "DOCTYPE_NAME";
      State[State["AFTER_DOCTYPE_NAME"] = 55] = "AFTER_DOCTYPE_NAME";
      State[State["AFTER_DOCTYPE_PUBLIC_KEYWORD"] = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD";
      State[State["BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"] = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER";
      State[State["DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"] = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED";
      State[State["DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"] = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED";
      State[State["AFTER_DOCTYPE_PUBLIC_IDENTIFIER"] = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER";
      State[State["BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"] = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS";
      State[State["AFTER_DOCTYPE_SYSTEM_KEYWORD"] = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD";
      State[State["BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"] = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER";
      State[State["DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"] = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED";
      State[State["DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"] = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED";
      State[State["AFTER_DOCTYPE_SYSTEM_IDENTIFIER"] = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER";
      State[State["BOGUS_DOCTYPE"] = 67] = "BOGUS_DOCTYPE";
      State[State["CDATA_SECTION"] = 68] = "CDATA_SECTION";
      State[State["CDATA_SECTION_BRACKET"] = 69] = "CDATA_SECTION_BRACKET";
      State[State["CDATA_SECTION_END"] = 70] = "CDATA_SECTION_END";
      State[State["CHARACTER_REFERENCE"] = 71] = "CHARACTER_REFERENCE";
      State[State["AMBIGUOUS_AMPERSAND"] = 72] = "AMBIGUOUS_AMPERSAND";
  })(State || (State = {}));
  //Tokenizer initial states for different modes
  const TokenizerMode = {
      DATA: State.DATA,
      RCDATA: State.RCDATA,
      RAWTEXT: State.RAWTEXT,
      SCRIPT_DATA: State.SCRIPT_DATA,
      PLAINTEXT: State.PLAINTEXT,
      CDATA_SECTION: State.CDATA_SECTION,
  };
  //Utils
  //OPTIMIZATION: these utility functions should not be moved out of this module. V8 Crankshaft will not inline
  //this functions if they will be situated in another module due to context switch.
  //Always perform inlining check before modifying this functions ('node --trace-inlining').
  function isAsciiDigit(cp) {
      return cp >= CODE_POINTS.DIGIT_0 && cp <= CODE_POINTS.DIGIT_9;
  }
  function isAsciiUpper(cp) {
      return cp >= CODE_POINTS.LATIN_CAPITAL_A && cp <= CODE_POINTS.LATIN_CAPITAL_Z;
  }
  function isAsciiLower(cp) {
      return cp >= CODE_POINTS.LATIN_SMALL_A && cp <= CODE_POINTS.LATIN_SMALL_Z;
  }
  function isAsciiLetter(cp) {
      return isAsciiLower(cp) || isAsciiUpper(cp);
  }
  function isAsciiAlphaNumeric(cp) {
      return isAsciiLetter(cp) || isAsciiDigit(cp);
  }
  function toAsciiLower(cp) {
      return cp + 32;
  }
  function isWhitespace(cp) {
      return (cp === CODE_POINTS.SPACE || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.TABULATION || cp === CODE_POINTS.FORM_FEED || cp === CODE_POINTS.CARRIAGE_RETURN);
  }
  function isScriptDataDoubleEscapeSequenceEnd(cp) {
      return isWhitespace(cp) || cp === CODE_POINTS.SOLIDUS || cp === CODE_POINTS.GREATER_THAN_SIGN;
  }
  function getErrorForNumericCharacterReference(code) {
      if (code === CODE_POINTS.NULL) {
          return ERR.nullCharacterReference;
      }
      else if (code > 1114111) {
          return ERR.characterReferenceOutsideUnicodeRange;
      }
      else if (isSurrogate(code)) {
          return ERR.surrogateCharacterReference;
      }
      else if (isUndefinedCodePoint(code)) {
          return ERR.noncharacterCharacterReference;
      }
      else if (isControlCodePoint(code) || code === CODE_POINTS.CARRIAGE_RETURN) {
          return ERR.controlCharacterReference;
      }
      return null;
  }
  //Tokenizer
  class Tokenizer {
      constructor(options, handler) {
          this.options = options;
          this.handler = handler;
          this.paused = false;
          /** Ensures that the parsing loop isn't run multiple times at once. */
          this.inLoop = false;
          /**
           * Indicates that the current adjusted node exists, is not an element in the HTML namespace,
           * and that it is not an integration point for either MathML or HTML.
           *
           * @see {@link https://html.spec.whatwg.org/multipage/parsing.html#tree-construction}
           */
          this.inForeignNode = false;
          this.lastStartTagName = '';
          this.active = false;
          this.state = State.DATA;
          this.returnState = State.DATA;
          this.entityStartPos = 0;
          this.consumedAfterSnapshot = -1;
          this.currentCharacterToken = null;
          this.currentToken = null;
          this.currentAttr = { name: '', value: '' };
          this.currentAttrLocation = null;
          /**
           * `[start, end)` of `preprocessor.html` still to be appended to the attribute value, comment data or character
           * token being built (`_flushRun`): input that is used as is is appended as one slice, not a code point at a time.
           */
          this.runStart = 0;
          this.runEnd = 0;
          this.preprocessor = new Preprocessor(handler);
          this.currentLocation = this.getCurrentLocation(-1);
          this.entityDecoder = new HtmlEntityDecoder((cp, consumed) => {
              // Note: Set `pos` _before_ flushing, as flushing might drop
              // the current chunk and invalidate `entityStartPos`.
              this.preprocessor.pos = this.entityStartPos + consumed - 1;
              if (!this._isCharacterReferenceInAttribute()) {
                  this._ensureCharacterToken(isWhitespace(cp)
                      ? TokenType.WHITESPACE_CHARACTER
                      : cp === CODE_POINTS.NULL
                          ? TokenType.NULL_CHARACTER
                          : TokenType.CHARACTER);
              }
              this._extendRunWith(String.fromCodePoint(cp), 0);
          }, handler.onParseError
              ? {
                  missingSemicolonAfterCharacterReference: () => {
                      this._err(ERR.missingSemicolonAfterCharacterReference, 1);
                  },
                  absenceOfDigitsInNumericCharacterReference: (consumed) => {
                      this._err(ERR.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + consumed);
                  },
                  validateNumericCharacterReference: (code) => {
                      const error = getErrorForNumericCharacterReference(code);
                      if (error)
                          this._err(error, 1);
                  },
              }
              : undefined);
      }
      //Errors
      _err(code, cpOffset = 0) {
          var _a, _b;
          (_b = (_a = this.handler).onParseError) === null || _b === void 0 ? void 0 : _b.call(_a, this.preprocessor.getError(code, cpOffset));
      }
      // NOTE: `offset` may never run across line boundaries.
      getCurrentLocation(offset) {
          if (!this.options.sourceCodeLocationInfo) {
              return null;
          }
          return {
              startLine: this.preprocessor.line,
              startCol: this.preprocessor.col - offset,
              startOffset: this.preprocessor.offset - offset,
              endLine: -1,
              endCol: -1,
              endOffset: -1,
          };
      }
      _runParsingLoop() {
          if (this.inLoop)
              return;
          this.inLoop = true;
          while (this.active && !this.paused) {
              this.consumedAfterSnapshot = 0;
              const cp = this._consume();
              if (!this._ensureHibernation()) {
                  this._callState(cp);
              }
          }
          this.inLoop = false;
      }
      //API
      /** Emit buffered character tokens without completing the current token or emitting EOF. */
      flushCharacters() {
          var _a;
          if (this.inLoop) {
              throw new Error('Cannot flush characters from a tokenizer callback');
          }
          const location = (_a = this.currentCharacterToken) === null || _a === void 0 ? void 0 : _a.location;
          let nextLocation = null;
          if (location) {
              nextLocation = this.getCharacterTokenEndLocation(location);
              this.currentLocation = nextLocation;
          }
          this.inLoop = true;
          try {
              this._emitCurrentCharacterToken(nextLocation);
          }
          finally {
              this.inLoop = false;
          }
          this._runParsingLoop();
      }
      getCharacterTokenEndLocation(location) {
          const endOffset = this.getCharacterTokenEndOffset();
          const html = this.preprocessor.html.slice(location.startOffset - this.preprocessor.droppedBufferSize, endOffset - this.preprocessor.droppedBufferSize);
          let line = location.startLine;
          let lastLineBreak = -1;
          for (let i = html.indexOf('\n'); i !== -1; i = html.indexOf('\n', i + 1)) {
              line++;
              lastLineBreak = i;
          }
          for (let i = html.indexOf('\r'); i !== -1; i = html.indexOf('\r', i + 1)) {
              // Count CRLF as one line break by counting its LF only.
              if (html.charCodeAt(i + 1) !== CODE_POINTS.LINE_FEED) {
                  line++;
                  lastLineBreak = Math.max(lastLineBreak, i);
              }
          }
          return {
              startLine: line,
              startCol: lastLineBreak === -1 ? location.startCol + html.length : html.length - lastLineBreak,
              startOffset: endOffset,
              endLine: -1,
              endCol: -1,
              endOffset: -1,
          };
      }
      // Return the input boundary before any unfinished token or buffered delimiter.
      getCharacterTokenEndOffset() {
          var _a;
          const end = this.preprocessor.droppedBufferSize + this.preprocessor.pos + 1;
          const tokenLocation = (_a = this.currentToken) === null || _a === void 0 ? void 0 : _a.location;
          switch (this.state) {
              case State.TAG_OPEN:
              case State.RCDATA_LESS_THAN_SIGN:
              case State.RAWTEXT_LESS_THAN_SIGN:
              case State.SCRIPT_DATA_LESS_THAN_SIGN:
              case State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN:
              case State.CDATA_SECTION_BRACKET: {
                  return end - 1;
              }
              case State.END_TAG_OPEN:
              case State.MARKUP_DECLARATION_OPEN:
              case State.RCDATA_END_TAG_OPEN:
              case State.RCDATA_END_TAG_NAME:
              case State.RAWTEXT_END_TAG_OPEN:
              case State.RAWTEXT_END_TAG_NAME:
              case State.SCRIPT_DATA_END_TAG_OPEN:
              case State.SCRIPT_DATA_END_TAG_NAME:
              case State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:
              case State.SCRIPT_DATA_ESCAPED_END_TAG_NAME:
              case State.CDATA_SECTION_END: {
                  return end - 2;
              }
              case State.CHARACTER_REFERENCE: {
                  return this._isCharacterReferenceInAttribute() && tokenLocation
                      ? tokenLocation.startOffset
                      : this.preprocessor.droppedBufferSize + this.entityStartPos;
              }
              case State.DOCTYPE:
              case State.BEFORE_DOCTYPE_NAME: {
                  return this.currentLocation.startOffset;
              }
              default: {
                  if (tokenLocation &&
                      (this.state === State.TAG_NAME ||
                          (this.state >= State.BEFORE_ATTRIBUTE_NAME && this.state <= State.BOGUS_COMMENT) ||
                          (this.state >= State.COMMENT_START && this.state <= State.BOGUS_DOCTYPE))) {
                      return tokenLocation.startOffset;
                  }
                  return end;
              }
          }
      }
      pause() {
          this.paused = true;
      }
      resume(writeCallback) {
          if (!this.paused) {
              throw new Error('Parser was already resumed');
          }
          this.paused = false;
          // Necessary for synchronous resume.
          if (this.inLoop)
              return;
          this._runParsingLoop();
          if (!this.paused) {
              writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
          }
      }
      write(chunk, isLastChunk, writeCallback) {
          this.active = true;
          this.preprocessor.write(chunk, isLastChunk);
          this._runParsingLoop();
          if (!this.paused) {
              writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
          }
      }
      insertHtmlAtCurrentPos(chunk) {
          this.active = true;
          this.preprocessor.insertHtmlAtCurrentPos(chunk);
          this._runParsingLoop();
      }
      //Hibernation
      _ensureHibernation() {
          if (this.preprocessor.endOfChunkHit) {
              this.preprocessor.retreat(this.consumedAfterSnapshot);
              this.consumedAfterSnapshot = 0;
              this.active = false;
              return true;
          }
          return false;
      }
      //Consumption
      _consume() {
          this.consumedAfterSnapshot++;
          return this.preprocessor.advance();
      }
      _advanceBy(count) {
          this.consumedAfterSnapshot += count;
          for (let i = 0; i < count; i++) {
              this.preprocessor.advance();
          }
      }
      _consumeSequenceIfMatch(pattern, caseSensitive) {
          if (this.preprocessor.startsWith(pattern, caseSensitive)) {
              // We will already have consumed one character before calling this method.
              this._advanceBy(pattern.length - 1);
              return true;
          }
          return false;
      }
      //Token creation
      _createStartTagToken() {
          this._flushRun('');
          this.currentToken = {
              type: TokenType.START_TAG,
              tagName: '',
              tagID: TAG_ID.UNKNOWN,
              selfClosing: false,
              ackSelfClosing: false,
              attrs: [],
              location: this.getCurrentLocation(1),
          };
      }
      _createEndTagToken() {
          this._flushRun('');
          this.currentToken = {
              type: TokenType.END_TAG,
              tagName: '',
              tagID: TAG_ID.UNKNOWN,
              selfClosing: false,
              ackSelfClosing: false,
              attrs: [],
              location: this.getCurrentLocation(2),
          };
      }
      _createCommentToken(offset) {
          this._flushRun('');
          this.currentToken = {
              type: TokenType.COMMENT,
              data: '',
              location: this.getCurrentLocation(offset),
          };
      }
      _createDoctypeToken(initialName) {
          this._flushRun('');
          this.currentToken = {
              type: TokenType.DOCTYPE,
              name: initialName,
              forceQuirks: false,
              publicId: null,
              systemId: null,
              location: this.currentLocation,
          };
      }
      _createCharacterToken(type) {
          if (this.currentLocation) {
              const start = this.currentLocation.startOffset - this.preprocessor.droppedBufferSize;
              // A flushed CR already advanced the line; exclude its ignored LF from the next token's range.
              if (this.preprocessor.html[start] === '\n' && this.preprocessor.html[start - 1] === '\r') {
                  this.currentLocation.startOffset++;
              }
          }
          this.currentCharacterToken = {
              type,
              chars: '',
              location: this.currentLocation,
          };
      }
      //Tag attributes
      _createAttr(attrNameFirstCh) {
          this._flushRun('');
          this.currentAttr = {
              name: attrNameFirstCh,
              value: '',
          };
          this.currentAttrLocation = this.getCurrentLocation(0);
      }
      _leaveAttrName() {
          var _a;
          var _b;
          const token = this.currentToken;
          if (getTokenAttr(token, this.currentAttr.name) === null) {
              token.attrs.push(this.currentAttr);
              if (token.location && this.currentAttrLocation) {
                  const attrLocations = ((_a = (_b = token.location).attrs) !== null && _a !== void 0 ? _a : (_b.attrs = Object.create(null)));
                  attrLocations[this.currentAttr.name] = this.currentAttrLocation;
                  // Set end location
                  this._leaveAttrValue();
              }
          }
          else {
              this._err(ERR.duplicateAttribute);
          }
      }
      _leaveAttrValue() {
          if (this.currentAttrLocation) {
              this.currentAttrLocation.endLine = this.preprocessor.line;
              this.currentAttrLocation.endCol = this.preprocessor.col;
              this.currentAttrLocation.endOffset = this.preprocessor.offset;
          }
      }
      /**
       * Append the pending run and `text` to the attribute value, comment data or character token being built.
       * The run is a string of its own: V8 copies a slice of fewer than 13 characters but lets a longer one share
       * the input's buffer, which would keep that buffer alive for as long as any attribute value or text cut from
       * it is; a concatenation is flattened into a buffer of its own when it is sliced.
       */
      _flushRun(text) {
          if (this.runEnd === this.runStart && text.length === 0) {
              return;
          }
          const slice = this.preprocessor.html.slice(this.runStart, this.runEnd);
          const run = (slice.length < 13 ? slice : ` ${slice}`.slice(1)) + text;
          const token = this.currentToken;
          this.runStart = this.runEnd;
          if (token === null) {
              this.currentCharacterToken.chars += run;
          }
          else if (token.type === TokenType.COMMENT) {
              token.data += run;
          }
          else {
              this.currentAttr.value += run;
          }
      }
      /** Extend the pending run by the current input code point, read as `cp`, or flush it and start a new one. */
      _extendRun(cp) {
          const { preprocessor } = this;
          //NOTE: a CR is read as LF, which is then not in the input.
          if (cp === CODE_POINTS.LINE_FEED && preprocessor.html.charCodeAt(preprocessor.pos) !== CODE_POINTS.LINE_FEED) {
              this._flushRun('\n');
              this.runStart = preprocessor.pos + 1;
          }
          else {
              const start = preprocessor.pos - Number(cp > 65535);
              if (start !== this.runEnd) {
                  this._flushRun('');
                  this.runStart = start;
              }
          }
          this.runEnd = preprocessor.pos + 1;
      }
      /**
       * Extend the pending run by `text`, the input that ends `cpOffset` code points after the current one, or flush
       * the run and append `text` where the input differs (a NUL replacement, a decoded reference, a dropped chunk).
       */
      _extendRunWith(text, cpOffset) {
          const { preprocessor } = this;
          const start = preprocessor.codePointStart + 1 + cpOffset - text.length;
          if (start >= 0 && preprocessor.html.startsWith(text, start)) {
              if (start !== this.runEnd) {
                  this._flushRun('');
                  this.runStart = start;
              }
          }
          else {
              this._flushRun(text);
              this.runStart = start + text.length;
          }
          this.runEnd = start + text.length;
      }
      //Token emission
      prepareToken(ct) {
          this._emitCurrentCharacterToken(ct.location);
          this.currentToken = null;
          if (ct.location) {
              ct.location.endLine = this.preprocessor.line;
              ct.location.endCol = this.preprocessor.col + 1;
              ct.location.endOffset = this.preprocessor.offset + 1;
          }
          this.currentLocation = this.getCurrentLocation(-1);
      }
      emitCurrentTagToken() {
          const ct = this.currentToken;
          this.prepareToken(ct);
          ct.tagID = getTagID(ct.tagName);
          if (ct.type === TokenType.START_TAG) {
              this.lastStartTagName = ct.tagName;
              this.handler.onStartTag(ct);
          }
          else {
              if (ct.attrs.length > 0) {
                  this._err(ERR.endTagWithAttributes);
              }
              if (ct.selfClosing) {
                  this._err(ERR.endTagWithTrailingSolidus);
              }
              this.handler.onEndTag(ct);
          }
          this.preprocessor.dropParsedChunk();
      }
      emitCurrentComment(ct) {
          this.prepareToken(ct);
          this.handler.onComment(ct);
          this.preprocessor.dropParsedChunk();
      }
      emitCurrentDoctype(ct) {
          this.prepareToken(ct);
          this.handler.onDoctype(ct);
          this.preprocessor.dropParsedChunk();
      }
      _emitCurrentCharacterToken(nextLocation) {
          this._flushRun('');
          if (this.currentCharacterToken) {
              //NOTE: if we have a pending character token, make it's end location equal to the
              //current token's start location.
              if (nextLocation && this.currentCharacterToken.location) {
                  this.currentCharacterToken.location.endLine = nextLocation.startLine;
                  this.currentCharacterToken.location.endCol = nextLocation.startCol;
                  this.currentCharacterToken.location.endOffset = nextLocation.startOffset;
              }
              switch (this.currentCharacterToken.type) {
                  case TokenType.CHARACTER: {
                      this.handler.onCharacter(this.currentCharacterToken);
                      break;
                  }
                  case TokenType.NULL_CHARACTER: {
                      this.handler.onNullCharacter(this.currentCharacterToken);
                      break;
                  }
                  case TokenType.WHITESPACE_CHARACTER: {
                      this.handler.onWhitespaceCharacter(this.currentCharacterToken);
                      break;
                  }
              }
              this.currentCharacterToken = null;
          }
      }
      _emitEOFToken() {
          const location = this.getCurrentLocation(0);
          if (location) {
              location.endLine = location.startLine;
              location.endCol = location.startCol;
              location.endOffset = location.startOffset;
          }
          this._emitCurrentCharacterToken(location);
          this.handler.onEof({ type: TokenType.EOF, location });
          this.active = false;
      }
      //Characters emission
      //OPTIMIZATION: The specification uses only one type of character token (one token per character).
      //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
      //If we have a sequence of characters that belong to the same group, the parser can process it
      //as a single solid character token.
      //So, there are 3 types of character tokens in parse5:
      //1)TokenType.NULL_CHARACTER - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
      //2)TokenType.WHITESPACE_CHARACTER - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
      //3)TokenType.CHARACTER - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
      /** Make the current character token one of `type`, emitting the current one if it has another type. */
      _ensureCharacterToken(type) {
          if (this.currentCharacterToken) {
              if (this.currentCharacterToken.type === type) {
                  return;
              }
              this.currentLocation = this.getCurrentLocation(0);
              this._emitCurrentCharacterToken(this.currentLocation);
              this.preprocessor.dropParsedChunk();
          }
          this._createCharacterToken(type);
      }
      /** Emit the current input code point, read as `cp`. */
      _emitCodePoint(cp) {
          const type = isWhitespace(cp)
              ? TokenType.WHITESPACE_CHARACTER
              : cp === CODE_POINTS.NULL
                  ? TokenType.NULL_CHARACTER
                  : TokenType.CHARACTER;
          const token = this.currentCharacterToken;
          if (token === null || token.type !== type) {
              this._ensureCharacterToken(type);
          }
          this._extendRun(cp);
      }
      //NOTE: used when we emit characters explicitly.
      //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
      // Negative `cpOffset` values locate text emitted before the current input character.
      _emitChars(ch, cpOffset = 0) {
          if (this.options.sourceCodeLocationInfo &&
              cpOffset !== 0 &&
              this.currentCharacterToken &&
              this.currentCharacterToken.type !== TokenType.CHARACTER) {
              this.currentLocation = this.getCurrentLocation(ch.length - 1 - cpOffset);
              this._emitCurrentCharacterToken(this.currentLocation);
              // Keep source characters that precede the lookahead available for a subsequent flush.
              this._createCharacterToken(TokenType.CHARACTER);
          }
          else {
              this._ensureCharacterToken(TokenType.CHARACTER);
          }
          this._extendRunWith(ch, cpOffset);
      }
      // Character reference helpers
      _startCharacterReference() {
          this.returnState = this.state;
          this.state = State.CHARACTER_REFERENCE;
          this.entityStartPos = this.preprocessor.pos;
          this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? DecodingMode.Attribute : DecodingMode.Legacy);
      }
      _isCharacterReferenceInAttribute() {
          return (this.returnState === State.ATTRIBUTE_VALUE_DOUBLE_QUOTED ||
              this.returnState === State.ATTRIBUTE_VALUE_SINGLE_QUOTED ||
              this.returnState === State.ATTRIBUTE_VALUE_UNQUOTED);
      }
      _flushCodePointConsumedAsCharacterReference(cp) {
          if (this._isCharacterReferenceInAttribute()) {
              this._extendRun(cp);
          }
          else {
              this._emitCodePoint(cp);
          }
      }
      // Calling states this way turns out to be much faster than any other approach.
      _callState(cp) {
          switch (this.state) {
              case State.DATA: {
                  this._stateData(cp);
                  break;
              }
              case State.RCDATA: {
                  this._stateRcdata(cp);
                  break;
              }
              case State.RAWTEXT: {
                  this._stateRawtext(cp);
                  break;
              }
              case State.SCRIPT_DATA: {
                  this._stateScriptData(cp);
                  break;
              }
              case State.PLAINTEXT: {
                  this._statePlaintext(cp);
                  break;
              }
              case State.TAG_OPEN: {
                  this._stateTagOpen(cp);
                  break;
              }
              case State.END_TAG_OPEN: {
                  this._stateEndTagOpen(cp);
                  break;
              }
              case State.TAG_NAME: {
                  this._stateTagName(cp);
                  break;
              }
              case State.RCDATA_LESS_THAN_SIGN: {
                  this._stateRcdataLessThanSign(cp);
                  break;
              }
              case State.RCDATA_END_TAG_OPEN: {
                  this._stateRcdataEndTagOpen(cp);
                  break;
              }
              case State.RCDATA_END_TAG_NAME: {
                  this._stateRcdataEndTagName(cp);
                  break;
              }
              case State.RAWTEXT_LESS_THAN_SIGN: {
                  this._stateRawtextLessThanSign(cp);
                  break;
              }
              case State.RAWTEXT_END_TAG_OPEN: {
                  this._stateRawtextEndTagOpen(cp);
                  break;
              }
              case State.RAWTEXT_END_TAG_NAME: {
                  this._stateRawtextEndTagName(cp);
                  break;
              }
              case State.SCRIPT_DATA_LESS_THAN_SIGN: {
                  this._stateScriptDataLessThanSign(cp);
                  break;
              }
              case State.SCRIPT_DATA_END_TAG_OPEN: {
                  this._stateScriptDataEndTagOpen(cp);
                  break;
              }
              case State.SCRIPT_DATA_END_TAG_NAME: {
                  this._stateScriptDataEndTagName(cp);
                  break;
              }
              case State.SCRIPT_DATA_ESCAPE_START: {
                  this._stateScriptDataEscapeStart(cp);
                  break;
              }
              case State.SCRIPT_DATA_ESCAPE_START_DASH: {
                  this._stateScriptDataEscapeStartDash(cp);
                  break;
              }
              case State.SCRIPT_DATA_ESCAPED: {
                  this._stateScriptDataEscaped(cp);
                  break;
              }
              case State.SCRIPT_DATA_ESCAPED_DASH: {
                  this._stateScriptDataEscapedDash(cp);
                  break;
              }
              case State.SCRIPT_DATA_ESCAPED_DASH_DASH: {
                  this._stateScriptDataEscapedDashDash(cp);
                  break;
              }
              case State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
                  this._stateScriptDataEscapedLessThanSign(cp);
                  break;
              }
              case State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
                  this._stateScriptDataEscapedEndTagOpen(cp);
                  break;
              }
              case State.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
                  this._stateScriptDataEscapedEndTagName(cp);
                  break;
              }
              case State.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
                  this._stateScriptDataDoubleEscapeStart(cp);
                  break;
              }
              case State.SCRIPT_DATA_DOUBLE_ESCAPED: {
                  this._stateScriptDataDoubleEscaped(cp);
                  break;
              }
              case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
                  this._stateScriptDataDoubleEscapedDash(cp);
                  break;
              }
              case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
                  this._stateScriptDataDoubleEscapedDashDash(cp);
                  break;
              }
              case State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
                  this._stateScriptDataDoubleEscapedLessThanSign(cp);
                  break;
              }
              case State.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
                  this._stateScriptDataDoubleEscapeEnd(cp);
                  break;
              }
              case State.BEFORE_ATTRIBUTE_NAME: {
                  this._stateBeforeAttributeName(cp);
                  break;
              }
              case State.ATTRIBUTE_NAME: {
                  this._stateAttributeName(cp);
                  break;
              }
              case State.AFTER_ATTRIBUTE_NAME: {
                  this._stateAfterAttributeName(cp);
                  break;
              }
              case State.BEFORE_ATTRIBUTE_VALUE: {
                  this._stateBeforeAttributeValue(cp);
                  break;
              }
              case State.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
                  this._stateAttributeValueDoubleQuoted(cp);
                  break;
              }
              case State.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
                  this._stateAttributeValueSingleQuoted(cp);
                  break;
              }
              case State.ATTRIBUTE_VALUE_UNQUOTED: {
                  this._stateAttributeValueUnquoted(cp);
                  break;
              }
              case State.AFTER_ATTRIBUTE_VALUE_QUOTED: {
                  this._stateAfterAttributeValueQuoted(cp);
                  break;
              }
              case State.SELF_CLOSING_START_TAG: {
                  this._stateSelfClosingStartTag(cp);
                  break;
              }
              case State.BOGUS_COMMENT: {
                  this._stateBogusComment(cp);
                  break;
              }
              case State.MARKUP_DECLARATION_OPEN: {
                  this._stateMarkupDeclarationOpen(cp);
                  break;
              }
              case State.COMMENT_START: {
                  this._stateCommentStart(cp);
                  break;
              }
              case State.COMMENT_START_DASH: {
                  this._stateCommentStartDash(cp);
                  break;
              }
              case State.COMMENT: {
                  this._stateComment(cp);
                  break;
              }
              case State.COMMENT_LESS_THAN_SIGN: {
                  this._stateCommentLessThanSign(cp);
                  break;
              }
              case State.COMMENT_LESS_THAN_SIGN_BANG: {
                  this._stateCommentLessThanSignBang(cp);
                  break;
              }
              case State.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
                  this._stateCommentLessThanSignBangDash(cp);
                  break;
              }
              case State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
                  this._stateCommentLessThanSignBangDashDash(cp);
                  break;
              }
              case State.COMMENT_END_DASH: {
                  this._stateCommentEndDash(cp);
                  break;
              }
              case State.COMMENT_END: {
                  this._stateCommentEnd(cp);
                  break;
              }
              case State.COMMENT_END_BANG: {
                  this._stateCommentEndBang(cp);
                  break;
              }
              case State.DOCTYPE: {
                  this._stateDoctype(cp);
                  break;
              }
              case State.BEFORE_DOCTYPE_NAME: {
                  this._stateBeforeDoctypeName(cp);
                  break;
              }
              case State.DOCTYPE_NAME: {
                  this._stateDoctypeName(cp);
                  break;
              }
              case State.AFTER_DOCTYPE_NAME: {
                  this._stateAfterDoctypeName(cp);
                  break;
              }
              case State.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
                  this._stateAfterDoctypePublicKeyword(cp);
                  break;
              }
              case State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
                  this._stateBeforeDoctypePublicIdentifier(cp);
                  break;
              }
              case State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
                  this._stateDoctypePublicIdentifierDoubleQuoted(cp);
                  break;
              }
              case State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
                  this._stateDoctypePublicIdentifierSingleQuoted(cp);
                  break;
              }
              case State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
                  this._stateAfterDoctypePublicIdentifier(cp);
                  break;
              }
              case State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
                  this._stateBetweenDoctypePublicAndSystemIdentifiers(cp);
                  break;
              }
              case State.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
                  this._stateAfterDoctypeSystemKeyword(cp);
                  break;
              }
              case State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
                  this._stateBeforeDoctypeSystemIdentifier(cp);
                  break;
              }
              case State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
                  this._stateDoctypeSystemIdentifierDoubleQuoted(cp);
                  break;
              }
              case State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
                  this._stateDoctypeSystemIdentifierSingleQuoted(cp);
                  break;
              }
              case State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
                  this._stateAfterDoctypeSystemIdentifier(cp);
                  break;
              }
              case State.BOGUS_DOCTYPE: {
                  this._stateBogusDoctype(cp);
                  break;
              }
              case State.CDATA_SECTION: {
                  this._stateCdataSection(cp);
                  break;
              }
              case State.CDATA_SECTION_BRACKET: {
                  this._stateCdataSectionBracket(cp);
                  break;
              }
              case State.CDATA_SECTION_END: {
                  this._stateCdataSectionEnd(cp);
                  break;
              }
              case State.CHARACTER_REFERENCE: {
                  this._stateCharacterReference();
                  break;
              }
              case State.AMBIGUOUS_AMPERSAND: {
                  this._stateAmbiguousAmpersand(cp);
                  break;
              }
              default: {
                  throw new Error('Unknown state');
              }
          }
      }
      // State machine
      // Data state
      //------------------------------------------------------------------
      _stateData(cp) {
          switch (cp) {
              case CODE_POINTS.LESS_THAN_SIGN: {
                  this.state = State.TAG_OPEN;
                  break;
              }
              case CODE_POINTS.AMPERSAND: {
                  this._startCharacterReference();
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this._emitCodePoint(cp);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._emitCodePoint(cp);
              }
          }
      }
      //  RCDATA state
      //------------------------------------------------------------------
      _stateRcdata(cp) {
          switch (cp) {
              case CODE_POINTS.AMPERSAND: {
                  this._startCharacterReference();
                  break;
              }
              case CODE_POINTS.LESS_THAN_SIGN: {
                  this.state = State.RCDATA_LESS_THAN_SIGN;
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this._emitChars(REPLACEMENT_CHARACTER);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._emitCodePoint(cp);
              }
          }
      }
      // RAWTEXT state
      //------------------------------------------------------------------
      _stateRawtext(cp) {
          switch (cp) {
              case CODE_POINTS.LESS_THAN_SIGN: {
                  this.state = State.RAWTEXT_LESS_THAN_SIGN;
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this._emitChars(REPLACEMENT_CHARACTER);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._emitCodePoint(cp);
              }
          }
      }
      // Script data state
      //------------------------------------------------------------------
      _stateScriptData(cp) {
          switch (cp) {
              case CODE_POINTS.LESS_THAN_SIGN: {
                  this.state = State.SCRIPT_DATA_LESS_THAN_SIGN;
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this._emitChars(REPLACEMENT_CHARACTER);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._emitCodePoint(cp);
              }
          }
      }
      // PLAINTEXT state
      //------------------------------------------------------------------
      _statePlaintext(cp) {
          switch (cp) {
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this._emitChars(REPLACEMENT_CHARACTER);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._emitCodePoint(cp);
              }
          }
      }
      // Tag open state
      //------------------------------------------------------------------
      _stateTagOpen(cp) {
          if (isAsciiLetter(cp)) {
              this._createStartTagToken();
              this.state = State.TAG_NAME;
              this._stateTagName(cp);
          }
          else
              switch (cp) {
                  case CODE_POINTS.EXCLAMATION_MARK: {
                      this.state = State.MARKUP_DECLARATION_OPEN;
                      break;
                  }
                  case CODE_POINTS.SOLIDUS: {
                      this.state = State.END_TAG_OPEN;
                      break;
                  }
                  case CODE_POINTS.QUESTION_MARK: {
                      this._err(ERR.unexpectedQuestionMarkInsteadOfTagName);
                      this._createCommentToken(1);
                      this.state = State.BOGUS_COMMENT;
                      this._stateBogusComment(cp);
                      break;
                  }
                  case CODE_POINTS.EOF: {
                      this._err(ERR.eofBeforeTagName);
                      this._emitChars('<', -1);
                      this._emitEOFToken();
                      break;
                  }
                  default: {
                      this._err(ERR.invalidFirstCharacterOfTagName);
                      this._emitChars('<', -1);
                      this.state = State.DATA;
                      this._stateData(cp);
                  }
              }
      }
      // End tag open state
      //------------------------------------------------------------------
      _stateEndTagOpen(cp) {
          if (isAsciiLetter(cp)) {
              this._createEndTagToken();
              this.state = State.TAG_NAME;
              this._stateTagName(cp);
          }
          else
              switch (cp) {
                  case CODE_POINTS.GREATER_THAN_SIGN: {
                      this._err(ERR.missingEndTagName);
                      this.state = State.DATA;
                      break;
                  }
                  case CODE_POINTS.EOF: {
                      this._err(ERR.eofBeforeTagName);
                      this._emitChars('</', -1);
                      this._emitEOFToken();
                      break;
                  }
                  default: {
                      this._err(ERR.invalidFirstCharacterOfTagName);
                      this._createCommentToken(2);
                      this.state = State.BOGUS_COMMENT;
                      this._stateBogusComment(cp);
                  }
              }
      }
      // Tag name state
      //------------------------------------------------------------------
      _stateTagName(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  this.state = State.BEFORE_ATTRIBUTE_NAME;
                  break;
              }
              case CODE_POINTS.SOLIDUS: {
                  this.state = State.SELF_CLOSING_START_TAG;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this.state = State.DATA;
                  this.emitCurrentTagToken();
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  token.tagName += REPLACEMENT_CHARACTER;
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInTag);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  token.tagName += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
              }
          }
      }
      // RCDATA less-than sign state
      //------------------------------------------------------------------
      _stateRcdataLessThanSign(cp) {
          if (cp === CODE_POINTS.SOLIDUS) {
              this.state = State.RCDATA_END_TAG_OPEN;
          }
          else {
              this._emitChars('<', -1);
              this.state = State.RCDATA;
              this._stateRcdata(cp);
          }
      }
      // RCDATA end tag open state
      //------------------------------------------------------------------
      _stateRcdataEndTagOpen(cp) {
          if (isAsciiLetter(cp)) {
              this.state = State.RCDATA_END_TAG_NAME;
              this._stateRcdataEndTagName(cp);
          }
          else {
              this._emitChars('</', -1);
              this.state = State.RCDATA;
              this._stateRcdata(cp);
          }
      }
      handleSpecialEndTag(_cp) {
          if (!this.preprocessor.startsWith(this.lastStartTagName, false)) {
              return !this._ensureHibernation();
          }
          this._createEndTagToken();
          const token = this.currentToken;
          token.tagName = this.lastStartTagName;
          const cp = this.preprocessor.peek(this.lastStartTagName.length);
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  this._advanceBy(this.lastStartTagName.length);
                  this.state = State.BEFORE_ATTRIBUTE_NAME;
                  return false;
              }
              case CODE_POINTS.SOLIDUS: {
                  this._advanceBy(this.lastStartTagName.length);
                  this.state = State.SELF_CLOSING_START_TAG;
                  return false;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this._advanceBy(this.lastStartTagName.length);
                  this.emitCurrentTagToken();
                  this.state = State.DATA;
                  return false;
              }
              default: {
                  //NOTE: the end tag is text after all, so no token is being built.
                  this.currentToken = null;
                  return !this._ensureHibernation();
              }
          }
      }
      // RCDATA end tag name state
      //------------------------------------------------------------------
      _stateRcdataEndTagName(cp) {
          if (this.handleSpecialEndTag(cp)) {
              this._emitChars('</', -1);
              this.state = State.RCDATA;
              this._stateRcdata(cp);
          }
      }
      // RAWTEXT less-than sign state
      //------------------------------------------------------------------
      _stateRawtextLessThanSign(cp) {
          if (cp === CODE_POINTS.SOLIDUS) {
              this.state = State.RAWTEXT_END_TAG_OPEN;
          }
          else {
              this._emitChars('<', -1);
              this.state = State.RAWTEXT;
              this._stateRawtext(cp);
          }
      }
      // RAWTEXT end tag open state
      //------------------------------------------------------------------
      _stateRawtextEndTagOpen(cp) {
          if (isAsciiLetter(cp)) {
              this.state = State.RAWTEXT_END_TAG_NAME;
              this._stateRawtextEndTagName(cp);
          }
          else {
              this._emitChars('</', -1);
              this.state = State.RAWTEXT;
              this._stateRawtext(cp);
          }
      }
      // RAWTEXT end tag name state
      //------------------------------------------------------------------
      _stateRawtextEndTagName(cp) {
          if (this.handleSpecialEndTag(cp)) {
              this._emitChars('</', -1);
              this.state = State.RAWTEXT;
              this._stateRawtext(cp);
          }
      }
      // Script data less-than sign state
      //------------------------------------------------------------------
      _stateScriptDataLessThanSign(cp) {
          switch (cp) {
              case CODE_POINTS.SOLIDUS: {
                  this.state = State.SCRIPT_DATA_END_TAG_OPEN;
                  break;
              }
              case CODE_POINTS.EXCLAMATION_MARK: {
                  this.state = State.SCRIPT_DATA_ESCAPE_START;
                  this._emitChars('<!');
                  break;
              }
              default: {
                  this._emitChars('<', -1);
                  this.state = State.SCRIPT_DATA;
                  this._stateScriptData(cp);
              }
          }
      }
      // Script data end tag open state
      //------------------------------------------------------------------
      _stateScriptDataEndTagOpen(cp) {
          if (isAsciiLetter(cp)) {
              this.state = State.SCRIPT_DATA_END_TAG_NAME;
              this._stateScriptDataEndTagName(cp);
          }
          else {
              this._emitChars('</', -1);
              this.state = State.SCRIPT_DATA;
              this._stateScriptData(cp);
          }
      }
      // Script data end tag name state
      //------------------------------------------------------------------
      _stateScriptDataEndTagName(cp) {
          if (this.handleSpecialEndTag(cp)) {
              this._emitChars('</', -1);
              this.state = State.SCRIPT_DATA;
              this._stateScriptData(cp);
          }
      }
      // Script data escape start state
      //------------------------------------------------------------------
      _stateScriptDataEscapeStart(cp) {
          if (cp === CODE_POINTS.HYPHEN_MINUS) {
              this.state = State.SCRIPT_DATA_ESCAPE_START_DASH;
              this._emitChars('-');
          }
          else {
              this.state = State.SCRIPT_DATA;
              this._stateScriptData(cp);
          }
      }
      // Script data escape start dash state
      //------------------------------------------------------------------
      _stateScriptDataEscapeStartDash(cp) {
          if (cp === CODE_POINTS.HYPHEN_MINUS) {
              this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
              this._emitChars('-');
          }
          else {
              this.state = State.SCRIPT_DATA;
              this._stateScriptData(cp);
          }
      }
      // Script data escaped state
      //------------------------------------------------------------------
      _stateScriptDataEscaped(cp) {
          switch (cp) {
              case CODE_POINTS.HYPHEN_MINUS: {
                  this.state = State.SCRIPT_DATA_ESCAPED_DASH;
                  this._emitChars('-');
                  break;
              }
              case CODE_POINTS.LESS_THAN_SIGN: {
                  this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this._emitChars(REPLACEMENT_CHARACTER);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInScriptHtmlCommentLikeText);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._emitCodePoint(cp);
              }
          }
      }
      // Script data escaped dash state
      //------------------------------------------------------------------
      _stateScriptDataEscapedDash(cp) {
          switch (cp) {
              case CODE_POINTS.HYPHEN_MINUS: {
                  this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
                  this._emitChars('-');
                  break;
              }
              case CODE_POINTS.LESS_THAN_SIGN: {
                  this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this.state = State.SCRIPT_DATA_ESCAPED;
                  this._emitChars(REPLACEMENT_CHARACTER);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInScriptHtmlCommentLikeText);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this.state = State.SCRIPT_DATA_ESCAPED;
                  this._emitCodePoint(cp);
              }
          }
      }
      // Script data escaped dash dash state
      //------------------------------------------------------------------
      _stateScriptDataEscapedDashDash(cp) {
          switch (cp) {
              case CODE_POINTS.HYPHEN_MINUS: {
                  this._emitChars('-');
                  break;
              }
              case CODE_POINTS.LESS_THAN_SIGN: {
                  this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this.state = State.SCRIPT_DATA;
                  this._emitChars('>');
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this.state = State.SCRIPT_DATA_ESCAPED;
                  this._emitChars(REPLACEMENT_CHARACTER);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInScriptHtmlCommentLikeText);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this.state = State.SCRIPT_DATA_ESCAPED;
                  this._emitCodePoint(cp);
              }
          }
      }
      // Script data escaped less-than sign state
      //------------------------------------------------------------------
      _stateScriptDataEscapedLessThanSign(cp) {
          if (cp === CODE_POINTS.SOLIDUS) {
              this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN;
          }
          else if (isAsciiLetter(cp)) {
              this._emitChars('<', -1);
              this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_START;
              this._stateScriptDataDoubleEscapeStart(cp);
          }
          else {
              this._emitChars('<', -1);
              this.state = State.SCRIPT_DATA_ESCAPED;
              this._stateScriptDataEscaped(cp);
          }
      }
      // Script data escaped end tag open state
      //------------------------------------------------------------------
      _stateScriptDataEscapedEndTagOpen(cp) {
          if (isAsciiLetter(cp)) {
              this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_NAME;
              this._stateScriptDataEscapedEndTagName(cp);
          }
          else {
              this._emitChars('</', -1);
              this.state = State.SCRIPT_DATA_ESCAPED;
              this._stateScriptDataEscaped(cp);
          }
      }
      // Script data escaped end tag name state
      //------------------------------------------------------------------
      _stateScriptDataEscapedEndTagName(cp) {
          if (this.handleSpecialEndTag(cp)) {
              this._emitChars('</', -1);
              this.state = State.SCRIPT_DATA_ESCAPED;
              this._stateScriptDataEscaped(cp);
          }
      }
      // Script data double escape start state
      //------------------------------------------------------------------
      _stateScriptDataDoubleEscapeStart(cp) {
          if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) &&
              isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
              this._emitCodePoint(cp);
              for (let i = 0; i < SEQUENCES.SCRIPT.length; i++) {
                  this._emitCodePoint(this._consume());
              }
              this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
          }
          else if (!this._ensureHibernation()) {
              this.state = State.SCRIPT_DATA_ESCAPED;
              this._stateScriptDataEscaped(cp);
          }
      }
      // Script data double escaped state
      //------------------------------------------------------------------
      _stateScriptDataDoubleEscaped(cp) {
          switch (cp) {
              case CODE_POINTS.HYPHEN_MINUS: {
                  this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH;
                  this._emitChars('-');
                  break;
              }
              case CODE_POINTS.LESS_THAN_SIGN: {
                  this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
                  this._emitChars('<');
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this._emitChars(REPLACEMENT_CHARACTER);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInScriptHtmlCommentLikeText);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._emitCodePoint(cp);
              }
          }
      }
      // Script data double escaped dash state
      //------------------------------------------------------------------
      _stateScriptDataDoubleEscapedDash(cp) {
          switch (cp) {
              case CODE_POINTS.HYPHEN_MINUS: {
                  this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH;
                  this._emitChars('-');
                  break;
              }
              case CODE_POINTS.LESS_THAN_SIGN: {
                  this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
                  this._emitChars('<');
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
                  this._emitChars(REPLACEMENT_CHARACTER);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInScriptHtmlCommentLikeText);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
                  this._emitCodePoint(cp);
              }
          }
      }
      // Script data double escaped dash dash state
      //------------------------------------------------------------------
      _stateScriptDataDoubleEscapedDashDash(cp) {
          switch (cp) {
              case CODE_POINTS.HYPHEN_MINUS: {
                  this._emitChars('-');
                  break;
              }
              case CODE_POINTS.LESS_THAN_SIGN: {
                  this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
                  this._emitChars('<');
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this.state = State.SCRIPT_DATA;
                  this._emitChars('>');
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
                  this._emitChars(REPLACEMENT_CHARACTER);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInScriptHtmlCommentLikeText);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
                  this._emitCodePoint(cp);
              }
          }
      }
      // Script data double escaped less-than sign state
      //------------------------------------------------------------------
      _stateScriptDataDoubleEscapedLessThanSign(cp) {
          if (cp === CODE_POINTS.SOLIDUS) {
              this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_END;
              this._emitChars('/');
          }
          else {
              this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
              this._stateScriptDataDoubleEscaped(cp);
          }
      }
      // Script data double escape end state
      //------------------------------------------------------------------
      _stateScriptDataDoubleEscapeEnd(cp) {
          if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) &&
              isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
              this._emitCodePoint(cp);
              for (let i = 0; i < SEQUENCES.SCRIPT.length; i++) {
                  this._emitCodePoint(this._consume());
              }
              this.state = State.SCRIPT_DATA_ESCAPED;
          }
          else if (!this._ensureHibernation()) {
              this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
              this._stateScriptDataDoubleEscaped(cp);
          }
      }
      // Before attribute name state
      //------------------------------------------------------------------
      _stateBeforeAttributeName(cp) {
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  // Ignore whitespace
                  break;
              }
              case CODE_POINTS.SOLIDUS:
              case CODE_POINTS.GREATER_THAN_SIGN:
              case CODE_POINTS.EOF: {
                  this.state = State.AFTER_ATTRIBUTE_NAME;
                  this._stateAfterAttributeName(cp);
                  break;
              }
              case CODE_POINTS.EQUALS_SIGN: {
                  this._err(ERR.unexpectedEqualsSignBeforeAttributeName);
                  this._createAttr('=');
                  this.state = State.ATTRIBUTE_NAME;
                  break;
              }
              default: {
                  this._createAttr('');
                  this.state = State.ATTRIBUTE_NAME;
                  this._stateAttributeName(cp);
              }
          }
      }
      // Attribute name state
      //------------------------------------------------------------------
      _stateAttributeName(cp) {
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED:
              case CODE_POINTS.SOLIDUS:
              case CODE_POINTS.GREATER_THAN_SIGN:
              case CODE_POINTS.EOF: {
                  this._leaveAttrName();
                  this.state = State.AFTER_ATTRIBUTE_NAME;
                  this._stateAfterAttributeName(cp);
                  break;
              }
              case CODE_POINTS.EQUALS_SIGN: {
                  this._leaveAttrName();
                  this.state = State.BEFORE_ATTRIBUTE_VALUE;
                  break;
              }
              case CODE_POINTS.QUOTATION_MARK:
              case CODE_POINTS.APOSTROPHE:
              case CODE_POINTS.LESS_THAN_SIGN: {
                  this._err(ERR.unexpectedCharacterInAttributeName);
                  this.currentAttr.name += String.fromCodePoint(cp);
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this.currentAttr.name += REPLACEMENT_CHARACTER;
                  break;
              }
              default: {
                  this.currentAttr.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
              }
          }
      }
      // After attribute name state
      //------------------------------------------------------------------
      _stateAfterAttributeName(cp) {
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  // Ignore whitespace
                  break;
              }
              case CODE_POINTS.SOLIDUS: {
                  this.state = State.SELF_CLOSING_START_TAG;
                  break;
              }
              case CODE_POINTS.EQUALS_SIGN: {
                  this.state = State.BEFORE_ATTRIBUTE_VALUE;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this.state = State.DATA;
                  this.emitCurrentTagToken();
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInTag);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._createAttr('');
                  this.state = State.ATTRIBUTE_NAME;
                  this._stateAttributeName(cp);
              }
          }
      }
      // Before attribute value state
      //------------------------------------------------------------------
      _stateBeforeAttributeValue(cp) {
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  // Ignore whitespace
                  break;
              }
              case CODE_POINTS.QUOTATION_MARK: {
                  this.state = State.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
                  break;
              }
              case CODE_POINTS.APOSTROPHE: {
                  this.state = State.ATTRIBUTE_VALUE_SINGLE_QUOTED;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this._err(ERR.missingAttributeValue);
                  this.state = State.DATA;
                  this.emitCurrentTagToken();
                  break;
              }
              default: {
                  this.state = State.ATTRIBUTE_VALUE_UNQUOTED;
                  this._stateAttributeValueUnquoted(cp);
              }
          }
      }
      // Attribute value (double-quoted) state
      //------------------------------------------------------------------
      _stateAttributeValueDoubleQuoted(cp) {
          switch (cp) {
              case CODE_POINTS.QUOTATION_MARK: {
                  this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
                  break;
              }
              case CODE_POINTS.AMPERSAND: {
                  this._startCharacterReference();
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this._extendRunWith(REPLACEMENT_CHARACTER, 0);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInTag);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._extendRun(cp);
              }
          }
      }
      // Attribute value (single-quoted) state
      //------------------------------------------------------------------
      _stateAttributeValueSingleQuoted(cp) {
          switch (cp) {
              case CODE_POINTS.APOSTROPHE: {
                  this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
                  break;
              }
              case CODE_POINTS.AMPERSAND: {
                  this._startCharacterReference();
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this._extendRunWith(REPLACEMENT_CHARACTER, 0);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInTag);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._extendRun(cp);
              }
          }
      }
      // Attribute value (unquoted) state
      //------------------------------------------------------------------
      _stateAttributeValueUnquoted(cp) {
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  this._leaveAttrValue();
                  this.state = State.BEFORE_ATTRIBUTE_NAME;
                  break;
              }
              case CODE_POINTS.AMPERSAND: {
                  this._startCharacterReference();
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this._leaveAttrValue();
                  this.state = State.DATA;
                  this.emitCurrentTagToken();
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this._extendRunWith(REPLACEMENT_CHARACTER, 0);
                  break;
              }
              case CODE_POINTS.QUOTATION_MARK:
              case CODE_POINTS.APOSTROPHE:
              case CODE_POINTS.LESS_THAN_SIGN:
              case CODE_POINTS.EQUALS_SIGN:
              case CODE_POINTS.GRAVE_ACCENT: {
                  this._err(ERR.unexpectedCharacterInUnquotedAttributeValue);
                  this._extendRun(cp);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInTag);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._extendRun(cp);
              }
          }
      }
      // After attribute value (quoted) state
      //------------------------------------------------------------------
      _stateAfterAttributeValueQuoted(cp) {
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  this._leaveAttrValue();
                  this.state = State.BEFORE_ATTRIBUTE_NAME;
                  break;
              }
              case CODE_POINTS.SOLIDUS: {
                  this._leaveAttrValue();
                  this.state = State.SELF_CLOSING_START_TAG;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this._leaveAttrValue();
                  this.state = State.DATA;
                  this.emitCurrentTagToken();
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInTag);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._err(ERR.missingWhitespaceBetweenAttributes);
                  this._leaveAttrValue();
                  this.state = State.BEFORE_ATTRIBUTE_NAME;
                  this._stateBeforeAttributeName(cp);
              }
          }
      }
      // Self-closing start tag state
      //------------------------------------------------------------------
      _stateSelfClosingStartTag(cp) {
          switch (cp) {
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  const token = this.currentToken;
                  token.selfClosing = true;
                  this.state = State.DATA;
                  this.emitCurrentTagToken();
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInTag);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._err(ERR.unexpectedSolidusInTag);
                  this.state = State.BEFORE_ATTRIBUTE_NAME;
                  this._stateBeforeAttributeName(cp);
              }
          }
      }
      // Bogus comment state
      //------------------------------------------------------------------
      _stateBogusComment(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this.state = State.DATA;
                  this.emitCurrentComment(token);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this.emitCurrentComment(token);
                  this._emitEOFToken();
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this._extendRunWith(REPLACEMENT_CHARACTER, 0);
                  break;
              }
              default: {
                  this._extendRun(cp);
              }
          }
      }
      // Markup declaration open state
      //------------------------------------------------------------------
      _stateMarkupDeclarationOpen(cp) {
          if (this._consumeSequenceIfMatch(SEQUENCES.DASH_DASH, true)) {
              this._createCommentToken(SEQUENCES.DASH_DASH.length + 1);
              this.state = State.COMMENT_START;
          }
          else if (this._consumeSequenceIfMatch(SEQUENCES.DOCTYPE, false)) {
              // NOTE: Doctypes tokens are created without fixed offsets. We keep track of the moment a doctype *might* start here.
              this.currentLocation = this.getCurrentLocation(SEQUENCES.DOCTYPE.length + 1);
              this.state = State.DOCTYPE;
          }
          else if (this._consumeSequenceIfMatch(SEQUENCES.CDATA_START, true)) {
              if (this.inForeignNode) {
                  this.state = State.CDATA_SECTION;
              }
              else {
                  this._err(ERR.cdataInHtmlContent);
                  this._createCommentToken(SEQUENCES.CDATA_START.length + 1);
                  this.currentToken.data = '[CDATA[';
                  this.state = State.BOGUS_COMMENT;
              }
          }
          //NOTE: Sequence lookups can be abrupted by hibernation. In that case, lookup
          //results are no longer valid and we will need to start over.
          else if (!this._ensureHibernation()) {
              this._err(ERR.incorrectlyOpenedComment);
              this._createCommentToken(2);
              this.state = State.BOGUS_COMMENT;
              this._stateBogusComment(cp);
          }
      }
      // Comment start state
      //------------------------------------------------------------------
      _stateCommentStart(cp) {
          switch (cp) {
              case CODE_POINTS.HYPHEN_MINUS: {
                  this.state = State.COMMENT_START_DASH;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this._err(ERR.abruptClosingOfEmptyComment);
                  this.state = State.DATA;
                  const token = this.currentToken;
                  this.emitCurrentComment(token);
                  break;
              }
              default: {
                  this.state = State.COMMENT;
                  this._stateComment(cp);
              }
          }
      }
      // Comment start dash state
      //------------------------------------------------------------------
      _stateCommentStartDash(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.HYPHEN_MINUS: {
                  this.state = State.COMMENT_END;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this._err(ERR.abruptClosingOfEmptyComment);
                  this.state = State.DATA;
                  this.emitCurrentComment(token);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInComment);
                  this.emitCurrentComment(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._extendRunWith('-', -1);
                  this.state = State.COMMENT;
                  this._stateComment(cp);
              }
          }
      }
      // Comment state
      //------------------------------------------------------------------
      _stateComment(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.HYPHEN_MINUS: {
                  this.state = State.COMMENT_END_DASH;
                  break;
              }
              case CODE_POINTS.LESS_THAN_SIGN: {
                  this._extendRunWith('<', 0);
                  this.state = State.COMMENT_LESS_THAN_SIGN;
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  this._extendRunWith(REPLACEMENT_CHARACTER, 0);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInComment);
                  this.emitCurrentComment(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._extendRun(cp);
              }
          }
      }
      // Comment less-than sign state
      //------------------------------------------------------------------
      _stateCommentLessThanSign(cp) {
          switch (cp) {
              case CODE_POINTS.EXCLAMATION_MARK: {
                  this._extendRunWith('!', 0);
                  this.state = State.COMMENT_LESS_THAN_SIGN_BANG;
                  break;
              }
              case CODE_POINTS.LESS_THAN_SIGN: {
                  this._extendRunWith('<', 0);
                  break;
              }
              default: {
                  this.state = State.COMMENT;
                  this._stateComment(cp);
              }
          }
      }
      // Comment less-than sign bang state
      //------------------------------------------------------------------
      _stateCommentLessThanSignBang(cp) {
          if (cp === CODE_POINTS.HYPHEN_MINUS) {
              this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH;
          }
          else {
              this.state = State.COMMENT;
              this._stateComment(cp);
          }
      }
      // Comment less-than sign bang dash state
      //------------------------------------------------------------------
      _stateCommentLessThanSignBangDash(cp) {
          if (cp === CODE_POINTS.HYPHEN_MINUS) {
              this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH;
          }
          else {
              this.state = State.COMMENT_END_DASH;
              this._stateCommentEndDash(cp);
          }
      }
      // Comment less-than sign bang dash dash state
      //------------------------------------------------------------------
      _stateCommentLessThanSignBangDashDash(cp) {
          if (cp !== CODE_POINTS.GREATER_THAN_SIGN && cp !== CODE_POINTS.EOF) {
              this._err(ERR.nestedComment);
          }
          this.state = State.COMMENT_END;
          this._stateCommentEnd(cp);
      }
      // Comment end dash state
      //------------------------------------------------------------------
      _stateCommentEndDash(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.HYPHEN_MINUS: {
                  this.state = State.COMMENT_END;
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInComment);
                  this.emitCurrentComment(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._extendRunWith('-', -1);
                  this.state = State.COMMENT;
                  this._stateComment(cp);
              }
          }
      }
      // Comment end state
      //------------------------------------------------------------------
      _stateCommentEnd(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this.state = State.DATA;
                  this.emitCurrentComment(token);
                  break;
              }
              case CODE_POINTS.EXCLAMATION_MARK: {
                  this.state = State.COMMENT_END_BANG;
                  break;
              }
              case CODE_POINTS.HYPHEN_MINUS: {
                  this._extendRunWith('-', -2);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInComment);
                  this.emitCurrentComment(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._extendRunWith('--', -1);
                  this.state = State.COMMENT;
                  this._stateComment(cp);
              }
          }
      }
      // Comment end bang state
      //------------------------------------------------------------------
      _stateCommentEndBang(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.HYPHEN_MINUS: {
                  this._extendRunWith('--!', -1);
                  this.state = State.COMMENT_END_DASH;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this._err(ERR.incorrectlyClosedComment);
                  this.state = State.DATA;
                  this.emitCurrentComment(token);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInComment);
                  this.emitCurrentComment(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._extendRunWith('--!', -1);
                  this.state = State.COMMENT;
                  this._stateComment(cp);
              }
          }
      }
      // DOCTYPE state
      //------------------------------------------------------------------
      _stateDoctype(cp) {
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  this.state = State.BEFORE_DOCTYPE_NAME;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this.state = State.BEFORE_DOCTYPE_NAME;
                  this._stateBeforeDoctypeName(cp);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInDoctype);
                  this._createDoctypeToken(null);
                  const token = this.currentToken;
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._err(ERR.missingWhitespaceBeforeDoctypeName);
                  this.state = State.BEFORE_DOCTYPE_NAME;
                  this._stateBeforeDoctypeName(cp);
              }
          }
      }
      // Before DOCTYPE name state
      //------------------------------------------------------------------
      _stateBeforeDoctypeName(cp) {
          if (isAsciiUpper(cp)) {
              this._createDoctypeToken(String.fromCharCode(toAsciiLower(cp)));
              this.state = State.DOCTYPE_NAME;
          }
          else
              switch (cp) {
                  case CODE_POINTS.SPACE:
                  case CODE_POINTS.LINE_FEED:
                  case CODE_POINTS.TABULATION:
                  case CODE_POINTS.FORM_FEED: {
                      // Ignore whitespace
                      break;
                  }
                  case CODE_POINTS.NULL: {
                      this._err(ERR.unexpectedNullCharacter);
                      this._createDoctypeToken(REPLACEMENT_CHARACTER);
                      this.state = State.DOCTYPE_NAME;
                      break;
                  }
                  case CODE_POINTS.GREATER_THAN_SIGN: {
                      this._err(ERR.missingDoctypeName);
                      this._createDoctypeToken(null);
                      const token = this.currentToken;
                      token.forceQuirks = true;
                      this.emitCurrentDoctype(token);
                      this.state = State.DATA;
                      break;
                  }
                  case CODE_POINTS.EOF: {
                      this._err(ERR.eofInDoctype);
                      this._createDoctypeToken(null);
                      const token = this.currentToken;
                      token.forceQuirks = true;
                      this.emitCurrentDoctype(token);
                      this._emitEOFToken();
                      break;
                  }
                  default: {
                      this._createDoctypeToken(String.fromCodePoint(cp));
                      this.state = State.DOCTYPE_NAME;
                  }
              }
      }
      // DOCTYPE name state
      //------------------------------------------------------------------
      _stateDoctypeName(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  this.state = State.AFTER_DOCTYPE_NAME;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this.state = State.DATA;
                  this.emitCurrentDoctype(token);
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  token.name += REPLACEMENT_CHARACTER;
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInDoctype);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  token.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
              }
          }
      }
      // After DOCTYPE name state
      //------------------------------------------------------------------
      _stateAfterDoctypeName(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  // Ignore whitespace
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this.state = State.DATA;
                  this.emitCurrentDoctype(token);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInDoctype);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  if (this._consumeSequenceIfMatch(SEQUENCES.PUBLIC, false)) {
                      this.state = State.AFTER_DOCTYPE_PUBLIC_KEYWORD;
                  }
                  else if (this._consumeSequenceIfMatch(SEQUENCES.SYSTEM, false)) {
                      this.state = State.AFTER_DOCTYPE_SYSTEM_KEYWORD;
                  }
                  //NOTE: sequence lookup can be abrupted by hibernation. In that case lookup
                  //results are no longer valid and we will need to start over.
                  else if (!this._ensureHibernation()) {
                      this._err(ERR.invalidCharacterSequenceAfterDoctypeName);
                      token.forceQuirks = true;
                      this.state = State.BOGUS_DOCTYPE;
                      this._stateBogusDoctype(cp);
                  }
              }
          }
      }
      // After DOCTYPE public keyword state
      //------------------------------------------------------------------
      _stateAfterDoctypePublicKeyword(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  this.state = State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
                  break;
              }
              case CODE_POINTS.QUOTATION_MARK: {
                  this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
                  token.publicId = '';
                  this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
                  break;
              }
              case CODE_POINTS.APOSTROPHE: {
                  this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
                  token.publicId = '';
                  this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this._err(ERR.missingDoctypePublicIdentifier);
                  token.forceQuirks = true;
                  this.state = State.DATA;
                  this.emitCurrentDoctype(token);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInDoctype);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
                  token.forceQuirks = true;
                  this.state = State.BOGUS_DOCTYPE;
                  this._stateBogusDoctype(cp);
              }
          }
      }
      // Before DOCTYPE public identifier state
      //------------------------------------------------------------------
      _stateBeforeDoctypePublicIdentifier(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  // Ignore whitespace
                  break;
              }
              case CODE_POINTS.QUOTATION_MARK: {
                  token.publicId = '';
                  this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
                  break;
              }
              case CODE_POINTS.APOSTROPHE: {
                  token.publicId = '';
                  this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this._err(ERR.missingDoctypePublicIdentifier);
                  token.forceQuirks = true;
                  this.state = State.DATA;
                  this.emitCurrentDoctype(token);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInDoctype);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
                  token.forceQuirks = true;
                  this.state = State.BOGUS_DOCTYPE;
                  this._stateBogusDoctype(cp);
              }
          }
      }
      // DOCTYPE public identifier (double-quoted) state
      //------------------------------------------------------------------
      _stateDoctypePublicIdentifierDoubleQuoted(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.QUOTATION_MARK: {
                  this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  token.publicId += REPLACEMENT_CHARACTER;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this._err(ERR.abruptDoctypePublicIdentifier);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this.state = State.DATA;
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInDoctype);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  token.publicId += String.fromCodePoint(cp);
              }
          }
      }
      // DOCTYPE public identifier (single-quoted) state
      //------------------------------------------------------------------
      _stateDoctypePublicIdentifierSingleQuoted(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.APOSTROPHE: {
                  this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  token.publicId += REPLACEMENT_CHARACTER;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this._err(ERR.abruptDoctypePublicIdentifier);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this.state = State.DATA;
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInDoctype);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  token.publicId += String.fromCodePoint(cp);
              }
          }
      }
      // After DOCTYPE public identifier state
      //------------------------------------------------------------------
      _stateAfterDoctypePublicIdentifier(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  this.state = State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this.state = State.DATA;
                  this.emitCurrentDoctype(token);
                  break;
              }
              case CODE_POINTS.QUOTATION_MARK: {
                  this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
                  token.systemId = '';
                  this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
                  break;
              }
              case CODE_POINTS.APOSTROPHE: {
                  this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
                  token.systemId = '';
                  this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInDoctype);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
                  token.forceQuirks = true;
                  this.state = State.BOGUS_DOCTYPE;
                  this._stateBogusDoctype(cp);
              }
          }
      }
      // Between DOCTYPE public and system identifiers state
      //------------------------------------------------------------------
      _stateBetweenDoctypePublicAndSystemIdentifiers(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  // Ignore whitespace
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this.emitCurrentDoctype(token);
                  this.state = State.DATA;
                  break;
              }
              case CODE_POINTS.QUOTATION_MARK: {
                  token.systemId = '';
                  this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
                  break;
              }
              case CODE_POINTS.APOSTROPHE: {
                  token.systemId = '';
                  this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInDoctype);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
                  token.forceQuirks = true;
                  this.state = State.BOGUS_DOCTYPE;
                  this._stateBogusDoctype(cp);
              }
          }
      }
      // After DOCTYPE system keyword state
      //------------------------------------------------------------------
      _stateAfterDoctypeSystemKeyword(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  this.state = State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
                  break;
              }
              case CODE_POINTS.QUOTATION_MARK: {
                  this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
                  token.systemId = '';
                  this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
                  break;
              }
              case CODE_POINTS.APOSTROPHE: {
                  this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
                  token.systemId = '';
                  this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this._err(ERR.missingDoctypeSystemIdentifier);
                  token.forceQuirks = true;
                  this.state = State.DATA;
                  this.emitCurrentDoctype(token);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInDoctype);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
                  token.forceQuirks = true;
                  this.state = State.BOGUS_DOCTYPE;
                  this._stateBogusDoctype(cp);
              }
          }
      }
      // Before DOCTYPE system identifier state
      //------------------------------------------------------------------
      _stateBeforeDoctypeSystemIdentifier(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  // Ignore whitespace
                  break;
              }
              case CODE_POINTS.QUOTATION_MARK: {
                  token.systemId = '';
                  this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
                  break;
              }
              case CODE_POINTS.APOSTROPHE: {
                  token.systemId = '';
                  this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this._err(ERR.missingDoctypeSystemIdentifier);
                  token.forceQuirks = true;
                  this.state = State.DATA;
                  this.emitCurrentDoctype(token);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInDoctype);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
                  token.forceQuirks = true;
                  this.state = State.BOGUS_DOCTYPE;
                  this._stateBogusDoctype(cp);
              }
          }
      }
      // DOCTYPE system identifier (double-quoted) state
      //------------------------------------------------------------------
      _stateDoctypeSystemIdentifierDoubleQuoted(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.QUOTATION_MARK: {
                  this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  token.systemId += REPLACEMENT_CHARACTER;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this._err(ERR.abruptDoctypeSystemIdentifier);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this.state = State.DATA;
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInDoctype);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  token.systemId += String.fromCodePoint(cp);
              }
          }
      }
      // DOCTYPE system identifier (single-quoted) state
      //------------------------------------------------------------------
      _stateDoctypeSystemIdentifierSingleQuoted(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.APOSTROPHE: {
                  this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  token.systemId += REPLACEMENT_CHARACTER;
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this._err(ERR.abruptDoctypeSystemIdentifier);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this.state = State.DATA;
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInDoctype);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  token.systemId += String.fromCodePoint(cp);
              }
          }
      }
      // After DOCTYPE system identifier state
      //------------------------------------------------------------------
      _stateAfterDoctypeSystemIdentifier(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                  // Ignore whitespace
                  break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this.emitCurrentDoctype(token);
                  this.state = State.DATA;
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInDoctype);
                  token.forceQuirks = true;
                  this.emitCurrentDoctype(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._err(ERR.unexpectedCharacterAfterDoctypeSystemIdentifier);
                  this.state = State.BOGUS_DOCTYPE;
                  this._stateBogusDoctype(cp);
              }
          }
      }
      // Bogus DOCTYPE state
      //------------------------------------------------------------------
      _stateBogusDoctype(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this.emitCurrentDoctype(token);
                  this.state = State.DATA;
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this.emitCurrentDoctype(token);
                  this._emitEOFToken();
                  break;
              }
              // Do nothing
          }
      }
      // CDATA section state
      //------------------------------------------------------------------
      _stateCdataSection(cp) {
          switch (cp) {
              case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
                  this.state = State.CDATA_SECTION_BRACKET;
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInCdata);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this._emitCodePoint(cp);
              }
          }
      }
      // CDATA section bracket state
      //------------------------------------------------------------------
      _stateCdataSectionBracket(cp) {
          if (cp === CODE_POINTS.RIGHT_SQUARE_BRACKET) {
              this.state = State.CDATA_SECTION_END;
          }
          else {
              this._emitChars(']', -1);
              this.state = State.CDATA_SECTION;
              this._stateCdataSection(cp);
          }
      }
      // CDATA section end state
      //------------------------------------------------------------------
      _stateCdataSectionEnd(cp) {
          switch (cp) {
              case CODE_POINTS.GREATER_THAN_SIGN: {
                  this.state = State.DATA;
                  break;
              }
              case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
                  this._emitChars(']', -2);
                  break;
              }
              default: {
                  this._emitChars(']]', -1);
                  this.state = State.CDATA_SECTION;
                  this._stateCdataSection(cp);
              }
          }
      }
      // Character reference state
      //------------------------------------------------------------------
      _stateCharacterReference() {
          let length = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
          if (length < 0) {
              if (this.preprocessor.lastChunkWritten) {
                  length = this.entityDecoder.end();
              }
              else {
                  // Wait for the rest of the entity.
                  this.active = false;
                  // Mark the entire buffer as read.
                  this.preprocessor.pos = this.preprocessor.html.length - 1;
                  this.consumedAfterSnapshot = 0;
                  this.preprocessor.endOfChunkHit = true;
                  return;
              }
          }
          if (length === 0) {
              // This was not a valid entity. Go back to the beginning, and
              // figure out what to do.
              this.preprocessor.pos = this.entityStartPos;
              this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
              this.state =
                  !this._isCharacterReferenceInAttribute() && isAsciiAlphaNumeric(this.preprocessor.peek(1))
                      ? State.AMBIGUOUS_AMPERSAND
                      : this.returnState;
          }
          else {
              // We successfully parsed an entity. Switch to the return state.
              this.state = this.returnState;
          }
      }
      // Ambiguos ampersand state
      //------------------------------------------------------------------
      _stateAmbiguousAmpersand(cp) {
          if (isAsciiAlphaNumeric(cp)) {
              this._flushCodePointConsumedAsCharacterReference(cp);
          }
          else {
              if (cp === CODE_POINTS.SEMICOLON) {
                  this._err(ERR.unknownNamedCharacterReference);
              }
              this.state = this.returnState;
              this._callState(cp);
          }
      }
  }

  //Element utils
  const IMPLICIT_END_TAG_REQUIRED = new Set([TAG_ID.DD, TAG_ID.DT, TAG_ID.LI, TAG_ID.OPTGROUP, TAG_ID.OPTION, TAG_ID.P, TAG_ID.RB, TAG_ID.RP, TAG_ID.RT, TAG_ID.RTC]);
  const IMPLICIT_END_TAG_REQUIRED_THOROUGHLY = new Set([
      ...IMPLICIT_END_TAG_REQUIRED,
      TAG_ID.CAPTION,
      TAG_ID.COLGROUP,
      TAG_ID.TBODY,
      TAG_ID.TD,
      TAG_ID.TFOOT,
      TAG_ID.TH,
      TAG_ID.THEAD,
      TAG_ID.TR,
  ]);
  const SCOPING_ELEMENTS_HTML = new Set([
      TAG_ID.APPLET,
      TAG_ID.CAPTION,
      TAG_ID.HTML,
      TAG_ID.MARQUEE,
      TAG_ID.OBJECT,
      TAG_ID.TABLE,
      TAG_ID.TD,
      TAG_ID.TEMPLATE,
      TAG_ID.TH,
  ]);
  const SCOPING_ELEMENTS_HTML_LIST = new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.OL, TAG_ID.UL]);
  const SCOPING_ELEMENTS_HTML_BUTTON = new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.BUTTON]);
  const SCOPING_ELEMENTS_MATHML = new Set([TAG_ID.ANNOTATION_XML, TAG_ID.MI, TAG_ID.MN, TAG_ID.MO, TAG_ID.MS, TAG_ID.MTEXT]);
  const SCOPING_ELEMENTS_SVG = new Set([TAG_ID.DESC, TAG_ID.FOREIGN_OBJECT, TAG_ID.TITLE]);
  const TABLE_ROW_CONTEXT = new Set([TAG_ID.TR, TAG_ID.TEMPLATE, TAG_ID.HTML]);
  const TABLE_BODY_CONTEXT = new Set([TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TEMPLATE, TAG_ID.HTML]);
  const TABLE_CONTEXT = new Set([TAG_ID.TABLE, TAG_ID.TEMPLATE, TAG_ID.HTML]);
  const TABLE_CELLS = new Set([TAG_ID.TD, TAG_ID.TH]);
  //Stack of open elements
  class OpenElementStack {
      get currentTmplContentOrNode() {
          return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
      }
      constructor(document, treeAdapter, handler) {
          this.treeAdapter = treeAdapter;
          this.handler = handler;
          this.items = [];
          this.tagIDs = [];
          this.stackTop = -1;
          this.tmplCount = 0;
          this.currentTagId = TAG_ID.UNKNOWN;
          this.current = document;
      }
      //Index of element
      _indexOf(element) {
          return this.items.lastIndexOf(element, this.stackTop);
      }
      //Update current element
      _isInTemplate() {
          return this.currentTagId === TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === NS.HTML;
      }
      _updateCurrentElement() {
          this.current = this.items[this.stackTop];
          this.currentTagId = this.tagIDs[this.stackTop];
      }
      //Mutations
      push(element, tagID) {
          this.stackTop++;
          this.items[this.stackTop] = element;
          this.current = element;
          this.tagIDs[this.stackTop] = tagID;
          this.currentTagId = tagID;
          if (this._isInTemplate()) {
              this.tmplCount++;
          }
          this.handler.onItemPush(element, tagID, true);
      }
      pop() {
          const popped = this.current;
          if (this.tmplCount > 0 && this._isInTemplate()) {
              this.tmplCount--;
          }
          this.stackTop--;
          this._updateCurrentElement();
          this.handler.onItemPop(popped, true);
      }
      replace(oldElement, newElement) {
          const idx = this._indexOf(oldElement);
          this.items[idx] = newElement;
          if (idx === this.stackTop) {
              this.current = newElement;
          }
      }
      insertAfter(referenceElement, newElement, newElementID) {
          const insertionIdx = this._indexOf(referenceElement) + 1;
          this.items.splice(insertionIdx, 0, newElement);
          this.tagIDs.splice(insertionIdx, 0, newElementID);
          this.stackTop++;
          if (insertionIdx === this.stackTop) {
              this._updateCurrentElement();
          }
          if (this.current && this.currentTagId !== undefined) {
              this.handler.onItemPush(this.current, this.currentTagId, insertionIdx === this.stackTop);
          }
      }
      popUntilTagNamePopped(tagName) {
          let targetIdx = this.stackTop + 1;
          do {
              targetIdx = this.tagIDs.lastIndexOf(tagName, targetIdx - 1);
          } while (targetIdx > 0 && this.treeAdapter.getNamespaceURI(this.items[targetIdx]) !== NS.HTML);
          this.shortenToLength(Math.max(targetIdx, 0));
      }
      shortenToLength(idx) {
          while (this.stackTop >= idx) {
              const popped = this.current;
              if (this.tmplCount > 0 && this._isInTemplate()) {
                  this.tmplCount -= 1;
              }
              this.stackTop--;
              this._updateCurrentElement();
              this.handler.onItemPop(popped, this.stackTop < idx);
          }
      }
      popUntilElementPopped(element) {
          const idx = this._indexOf(element);
          this.shortenToLength(Math.max(idx, 0));
      }
      popUntilPopped(tagNames, targetNS) {
          const idx = this._indexOfTagNames(tagNames, targetNS);
          this.shortenToLength(Math.max(idx, 0));
      }
      popUntilNumberedHeaderPopped() {
          this.popUntilPopped(NUMBERED_HEADERS, NS.HTML);
      }
      popUntilTableCellPopped() {
          this.popUntilPopped(TABLE_CELLS, NS.HTML);
      }
      popAllUpToHtmlElement() {
          //NOTE: here we assume that the root <html> element is always first in the open element stack, so
          //we perform this fast stack clean up.
          this.tmplCount = 0;
          this.shortenToLength(1);
      }
      _indexOfTagNames(tagNames, namespace) {
          for (let i = this.stackTop; i >= 0; i--) {
              if (tagNames.has(this.tagIDs[i]) && this.treeAdapter.getNamespaceURI(this.items[i]) === namespace) {
                  return i;
              }
          }
          return -1;
      }
      clearBackTo(tagNames, targetNS) {
          const idx = this._indexOfTagNames(tagNames, targetNS);
          this.shortenToLength(idx + 1);
      }
      clearBackToTableContext() {
          this.clearBackTo(TABLE_CONTEXT, NS.HTML);
      }
      clearBackToTableBodyContext() {
          this.clearBackTo(TABLE_BODY_CONTEXT, NS.HTML);
      }
      clearBackToTableRowContext() {
          this.clearBackTo(TABLE_ROW_CONTEXT, NS.HTML);
      }
      remove(element) {
          const idx = this._indexOf(element);
          if (idx >= 0) {
              if (idx === this.stackTop) {
                  this.pop();
              }
              else {
                  this.items.splice(idx, 1);
                  this.tagIDs.splice(idx, 1);
                  this.stackTop--;
                  this._updateCurrentElement();
                  this.handler.onItemPop(element, false);
              }
          }
      }
      //Search
      tryPeekProperlyNestedBodyElement() {
          //Properly nested <body> element (should be second element in stack).
          return this.stackTop >= 1 && this.tagIDs[1] === TAG_ID.BODY ? this.items[1] : null;
      }
      contains(element) {
          return this._indexOf(element) > -1;
      }
      getCommonAncestor(element) {
          const elementIdx = this._indexOf(element) - 1;
          return elementIdx >= 0 ? this.items[elementIdx] : null;
      }
      isRootHtmlElementCurrent() {
          return this.stackTop === 0 && this.tagIDs[0] === TAG_ID.HTML;
      }
      //Element in scope
      hasInDynamicScope(tagName, htmlScope) {
          for (let i = this.stackTop; i >= 0; i--) {
              const tn = this.tagIDs[i];
              switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
                  case NS.HTML: {
                      if (tn === tagName)
                          return true;
                      if (htmlScope.has(tn))
                          return false;
                      break;
                  }
                  case NS.SVG: {
                      if (SCOPING_ELEMENTS_SVG.has(tn))
                          return false;
                      break;
                  }
                  case NS.MATHML: {
                      if (SCOPING_ELEMENTS_MATHML.has(tn))
                          return false;
                      break;
                  }
              }
          }
          return true;
      }
      hasInScope(tagName) {
          return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML);
      }
      hasInListItemScope(tagName) {
          return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_LIST);
      }
      hasInButtonScope(tagName) {
          return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_BUTTON);
      }
      hasNumberedHeaderInScope() {
          for (let i = this.stackTop; i >= 0; i--) {
              const tn = this.tagIDs[i];
              switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
                  case NS.HTML: {
                      if (NUMBERED_HEADERS.has(tn))
                          return true;
                      if (SCOPING_ELEMENTS_HTML.has(tn))
                          return false;
                      break;
                  }
                  case NS.SVG: {
                      if (SCOPING_ELEMENTS_SVG.has(tn))
                          return false;
                      break;
                  }
                  case NS.MATHML: {
                      if (SCOPING_ELEMENTS_MATHML.has(tn))
                          return false;
                      break;
                  }
              }
          }
          return true;
      }
      hasInTableScope(tagName) {
          for (let i = this.stackTop; i >= 0; i--) {
              if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) {
                  continue;
              }
              switch (this.tagIDs[i]) {
                  case tagName: {
                      return true;
                  }
                  case TAG_ID.TABLE:
                  case TAG_ID.HTML: {
                      return false;
                  }
              }
          }
          return true;
      }
      hasTableBodyContextInTableScope() {
          for (let i = this.stackTop; i >= 0; i--) {
              if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) {
                  continue;
              }
              switch (this.tagIDs[i]) {
                  case TAG_ID.TBODY:
                  case TAG_ID.THEAD:
                  case TAG_ID.TFOOT: {
                      return true;
                  }
                  case TAG_ID.TABLE:
                  case TAG_ID.HTML: {
                      return false;
                  }
              }
          }
          return true;
      }
      hasInSelectScope(tagName) {
          for (let i = this.stackTop; i >= 0; i--) {
              if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) {
                  continue;
              }
              switch (this.tagIDs[i]) {
                  case tagName: {
                      return true;
                  }
                  case TAG_ID.OPTION:
                  case TAG_ID.OPTGROUP: {
                      break;
                  }
                  default: {
                      return false;
                  }
              }
          }
          return true;
      }
      //Implied end tags
      generateImpliedEndTags() {
          while (this.currentTagId !== undefined && IMPLICIT_END_TAG_REQUIRED.has(this.currentTagId)) {
              this.pop();
          }
      }
      generateImpliedEndTagsThoroughly() {
          while (this.currentTagId !== undefined && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
              this.pop();
          }
      }
      generateImpliedEndTagsWithExclusion(exclusionId) {
          while (this.currentTagId !== undefined &&
              this.currentTagId !== exclusionId &&
              IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
              this.pop();
          }
      }
  }

  //Const
  const NOAH_ARK_CAPACITY = 3;
  var EntryType;
  (function (EntryType) {
      EntryType[EntryType["Marker"] = 0] = "Marker";
      EntryType[EntryType["Element"] = 1] = "Element";
  })(EntryType || (EntryType = {}));
  const MARKER = { type: EntryType.Marker };
  //List of formatting elements
  class FormattingElementList {
      constructor(treeAdapter) {
          this.treeAdapter = treeAdapter;
          this.entries = [];
          this.bookmark = null;
      }
      //Noah Ark's condition
      //OPTIMIZATION: at first we try to find possible candidates for exclusion using
      //lightweight heuristics without thorough attributes check.
      _getNoahArkConditionCandidates(newElement, neAttrs) {
          const candidates = [];
          const neAttrsLength = neAttrs.length;
          const neTagName = this.treeAdapter.getTagName(newElement);
          const neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
          for (let i = 0; i < this.entries.length; i++) {
              const entry = this.entries[i];
              if (entry.type === EntryType.Marker) {
                  break;
              }
              const { element } = entry;
              if (this.treeAdapter.getTagName(element) === neTagName &&
                  this.treeAdapter.getNamespaceURI(element) === neNamespaceURI) {
                  const elementAttrs = this.treeAdapter.getAttrList(element);
                  if (elementAttrs.length === neAttrsLength) {
                      candidates.push({ idx: i, attrs: elementAttrs });
                  }
              }
          }
          return candidates;
      }
      _ensureNoahArkCondition(newElement) {
          if (this.entries.length < NOAH_ARK_CAPACITY)
              return;
          const neAttrs = this.treeAdapter.getAttrList(newElement);
          const candidates = this._getNoahArkConditionCandidates(newElement, neAttrs);
          if (candidates.length < NOAH_ARK_CAPACITY)
              return;
          //NOTE: build attrs map for the new element, so we can perform fast lookups
          const neAttrsMap = new Map(neAttrs.map((neAttr) => [neAttr.name, neAttr.value]));
          let validCandidates = 0;
          //NOTE: remove bottommost candidates, until Noah's Ark condition will not be met
          for (let i = 0; i < candidates.length; i++) {
              const candidate = candidates[i];
              // We know that `candidate.attrs.length === neAttrs.length`
              if (candidate.attrs.every((cAttr) => neAttrsMap.get(cAttr.name) === cAttr.value)) {
                  validCandidates += 1;
                  if (validCandidates >= NOAH_ARK_CAPACITY) {
                      this.entries.splice(candidate.idx, 1);
                  }
              }
          }
      }
      //Mutations
      insertMarker() {
          this.entries.unshift(MARKER);
      }
      pushElement(element, token) {
          this._ensureNoahArkCondition(element);
          this.entries.unshift({
              type: EntryType.Element,
              element,
              token,
          });
      }
      insertElementAfterBookmark(element, token) {
          const bookmarkIdx = this.entries.indexOf(this.bookmark);
          this.entries.splice(bookmarkIdx, 0, {
              type: EntryType.Element,
              element,
              token,
          });
      }
      removeEntry(entry) {
          const entryIndex = this.entries.indexOf(entry);
          if (entryIndex !== -1) {
              this.entries.splice(entryIndex, 1);
          }
      }
      /**
       * Clears the list of formatting elements up to the last marker.
       *
       * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
       */
      clearToLastMarker() {
          const markerIdx = this.entries.indexOf(MARKER);
          if (markerIdx === -1) {
              this.entries.length = 0;
          }
          else {
              this.entries.splice(0, markerIdx + 1);
          }
      }
      //Search
      getElementEntryInScopeWithTagName(tagName) {
          const entry = this.entries.find((entry) => entry.type === EntryType.Marker || this.treeAdapter.getTagName(entry.element) === tagName);
          return entry && entry.type === EntryType.Element ? entry : null;
      }
      getElementEntry(element) {
          return this.entries.find((entry) => entry.type === EntryType.Element && entry.element === element);
      }
  }

  const defaultTreeAdapter = {
      //Node construction
      createDocument() {
          return {
              nodeName: '#document',
              mode: DOCUMENT_MODE.NO_QUIRKS,
              childNodes: [],
          };
      },
      createDocumentFragment() {
          return {
              nodeName: '#document-fragment',
              childNodes: [],
          };
      },
      createElement(tagName, namespaceURI, attrs) {
          return {
              nodeName: tagName,
              tagName,
              attrs,
              namespaceURI,
              childNodes: [],
              parentNode: null,
          };
      },
      createCommentNode(data) {
          return {
              nodeName: '#comment',
              data,
              parentNode: null,
          };
      },
      createTextNode(value) {
          return {
              nodeName: '#text',
              value,
              parentNode: null,
          };
      },
      //Tree mutation
      appendChild(parentNode, newNode) {
          parentNode.childNodes.push(newNode);
          newNode.parentNode = parentNode;
      },
      insertBefore(parentNode, newNode, referenceNode) {
          const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
          parentNode.childNodes.splice(insertionIdx, 0, newNode);
          newNode.parentNode = parentNode;
      },
      setTemplateContent(templateElement, contentElement) {
          templateElement.content = contentElement;
      },
      getTemplateContent(templateElement) {
          return templateElement.content;
      },
      setDocumentType(document, name, publicId, systemId) {
          const doctypeNode = document.childNodes.find((node) => node.nodeName === '#documentType');
          if (doctypeNode) {
              doctypeNode.name = name;
              doctypeNode.publicId = publicId;
              doctypeNode.systemId = systemId;
          }
          else {
              const node = {
                  nodeName: '#documentType',
                  name,
                  publicId,
                  systemId,
                  parentNode: null,
              };
              defaultTreeAdapter.appendChild(document, node);
          }
      },
      setDocumentMode(document, mode) {
          document.mode = mode;
      },
      getDocumentMode(document) {
          return document.mode;
      },
      detachNode(node) {
          if (node.parentNode) {
              const idx = node.parentNode.childNodes.indexOf(node);
              node.parentNode.childNodes.splice(idx, 1);
              node.parentNode = null;
          }
      },
      insertText(parentNode, text) {
          if (parentNode.childNodes.length > 0) {
              const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
              if (defaultTreeAdapter.isTextNode(prevNode)) {
                  prevNode.value += text;
                  return;
              }
          }
          defaultTreeAdapter.appendChild(parentNode, defaultTreeAdapter.createTextNode(text));
      },
      insertTextBefore(parentNode, text, referenceNode) {
          const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
          if (prevNode && defaultTreeAdapter.isTextNode(prevNode)) {
              prevNode.value += text;
          }
          else {
              defaultTreeAdapter.insertBefore(parentNode, defaultTreeAdapter.createTextNode(text), referenceNode);
          }
      },
      adoptAttributes(recipient, attrs) {
          const recipientAttrsMap = new Set(recipient.attrs.map((attr) => attr.name));
          for (let j = 0; j < attrs.length; j++) {
              if (!recipientAttrsMap.has(attrs[j].name)) {
                  recipient.attrs.push(attrs[j]);
              }
          }
      },
      //Tree traversing
      getFirstChild(node) {
          return node.childNodes[0];
      },
      getChildNodes(node) {
          return node.childNodes;
      },
      getParentNode(node) {
          return node.parentNode;
      },
      getAttrList(element) {
          return element.attrs;
      },
      //Node data
      getTagName(element) {
          return element.tagName;
      },
      getNamespaceURI(element) {
          return element.namespaceURI;
      },
      getTextNodeContent(textNode) {
          return textNode.value;
      },
      getCommentNodeContent(commentNode) {
          return commentNode.data;
      },
      getDocumentTypeNodeName(doctypeNode) {
          return doctypeNode.name;
      },
      getDocumentTypeNodePublicId(doctypeNode) {
          return doctypeNode.publicId;
      },
      getDocumentTypeNodeSystemId(doctypeNode) {
          return doctypeNode.systemId;
      },
      //Node types
      isTextNode(node) {
          return node.nodeName === '#text';
      },
      isCommentNode(node) {
          return node.nodeName === '#comment';
      },
      isDocumentTypeNode(node) {
          return node.nodeName === '#documentType';
      },
      isElementNode(node) {
          return Object.prototype.hasOwnProperty.call(node, 'tagName');
      },
      // Source code location
      setNodeSourceCodeLocation(node, location) {
          node.sourceCodeLocation = location;
      },
      getNodeSourceCodeLocation(node) {
          return node.sourceCodeLocation;
      },
      updateNodeSourceCodeLocation(node, endLocation) {
          node.sourceCodeLocation = { ...node.sourceCodeLocation, ...endLocation };
      },
  };

  //Const
  const VALID_DOCTYPE_NAME = 'html';
  const VALID_SYSTEM_ID = 'about:legacy-compat';
  const QUIRKS_MODE_SYSTEM_ID = 'http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd';
  const QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
      '+//silmaril//dtd html pro v0r11 19970101//',
      '-//as//dtd html 3.0 aswedit + extensions//',
      '-//advasoft ltd//dtd html 3.0 aswedit + extensions//',
      '-//ietf//dtd html 2.0 level 1//',
      '-//ietf//dtd html 2.0 level 2//',
      '-//ietf//dtd html 2.0 strict level 1//',
      '-//ietf//dtd html 2.0 strict level 2//',
      '-//ietf//dtd html 2.0 strict//',
      '-//ietf//dtd html 2.0//',
      '-//ietf//dtd html 2.1e//',
      '-//ietf//dtd html 3.0//',
      '-//ietf//dtd html 3.2 final//',
      '-//ietf//dtd html 3.2//',
      '-//ietf//dtd html 3//',
      '-//ietf//dtd html level 0//',
      '-//ietf//dtd html level 1//',
      '-//ietf//dtd html level 2//',
      '-//ietf//dtd html level 3//',
      '-//ietf//dtd html strict level 0//',
      '-//ietf//dtd html strict level 1//',
      '-//ietf//dtd html strict level 2//',
      '-//ietf//dtd html strict level 3//',
      '-//ietf//dtd html strict//',
      '-//ietf//dtd html//',
      '-//metrius//dtd metrius presentational//',
      '-//microsoft//dtd internet explorer 2.0 html strict//',
      '-//microsoft//dtd internet explorer 2.0 html//',
      '-//microsoft//dtd internet explorer 2.0 tables//',
      '-//microsoft//dtd internet explorer 3.0 html strict//',
      '-//microsoft//dtd internet explorer 3.0 html//',
      '-//microsoft//dtd internet explorer 3.0 tables//',
      '-//netscape comm. corp.//dtd html//',
      '-//netscape comm. corp.//dtd strict html//',
      "-//o'reilly and associates//dtd html 2.0//",
      "-//o'reilly and associates//dtd html extended 1.0//",
      "-//o'reilly and associates//dtd html extended relaxed 1.0//",
      '-//sq//dtd html 2.0 hotmetal + extensions//',
      '-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//',
      '-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//',
      '-//spyglass//dtd html 2.0 extended//',
      '-//sun microsystems corp.//dtd hotjava html//',
      '-//sun microsystems corp.//dtd hotjava strict html//',
      '-//w3c//dtd html 3 1995-03-24//',
      '-//w3c//dtd html 3.2 draft//',
      '-//w3c//dtd html 3.2 final//',
      '-//w3c//dtd html 3.2//',
      '-//w3c//dtd html 3.2s draft//',
      '-//w3c//dtd html 4.0 frameset//',
      '-//w3c//dtd html 4.0 transitional//',
      '-//w3c//dtd html experimental 19960712//',
      '-//w3c//dtd html experimental 970421//',
      '-//w3c//dtd w3 html//',
      '-//w3o//dtd w3 html 3.0//',
      '-//webtechs//dtd mozilla html 2.0//',
      '-//webtechs//dtd mozilla html//',
  ];
  const QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
      ...QUIRKS_MODE_PUBLIC_ID_PREFIXES,
      '-//w3c//dtd html 4.01 frameset//',
      '-//w3c//dtd html 4.01 transitional//',
  ];
  const QUIRKS_MODE_PUBLIC_IDS = new Set([
      '-//w3o//dtd w3 html strict 3.0//en//',
      '-/w3c/dtd html 4.0 transitional/en',
      'html',
  ]);
  const LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ['-//w3c//dtd xhtml 1.0 frameset//', '-//w3c//dtd xhtml 1.0 transitional//'];
  const LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
      ...LIMITED_QUIRKS_PUBLIC_ID_PREFIXES,
      '-//w3c//dtd html 4.01 frameset//',
      '-//w3c//dtd html 4.01 transitional//',
  ];
  //Utils
  function hasPrefix(publicId, prefixes) {
      return prefixes.some((prefix) => publicId.startsWith(prefix));
  }
  //API
  function isConforming(token) {
      return (token.name === VALID_DOCTYPE_NAME &&
          token.publicId === null &&
          (token.systemId === null || token.systemId === VALID_SYSTEM_ID));
  }
  function getDocumentMode(token) {
      if (token.name !== VALID_DOCTYPE_NAME) {
          return DOCUMENT_MODE.QUIRKS;
      }
      const { systemId } = token;
      if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID) {
          return DOCUMENT_MODE.QUIRKS;
      }
      let { publicId } = token;
      if (publicId !== null) {
          publicId = publicId.toLowerCase();
          if (QUIRKS_MODE_PUBLIC_IDS.has(publicId)) {
              return DOCUMENT_MODE.QUIRKS;
          }
          let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
          if (hasPrefix(publicId, prefixes)) {
              return DOCUMENT_MODE.QUIRKS;
          }
          prefixes =
              systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
          if (hasPrefix(publicId, prefixes)) {
              return DOCUMENT_MODE.LIMITED_QUIRKS;
          }
      }
      return DOCUMENT_MODE.NO_QUIRKS;
  }

  //MIME types
  const MIME_TYPES = {
      TEXT_HTML: 'text/html',
      APPLICATION_XML: 'application/xhtml+xml',
  };
  //Attributes
  const DEFINITION_URL_ATTR = 'definitionurl';
  const ADJUSTED_DEFINITION_URL_ATTR = 'definitionURL';
  const SVG_ATTRS_ADJUSTMENT_MAP = new Map([
      'attributeName',
      'attributeType',
      'baseFrequency',
      'baseProfile',
      'calcMode',
      'clipPathUnits',
      'diffuseConstant',
      'edgeMode',
      'filterUnits',
      'glyphRef',
      'gradientTransform',
      'gradientUnits',
      'kernelMatrix',
      'kernelUnitLength',
      'keyPoints',
      'keySplines',
      'keyTimes',
      'lengthAdjust',
      'limitingConeAngle',
      'markerHeight',
      'markerUnits',
      'markerWidth',
      'maskContentUnits',
      'maskUnits',
      'numOctaves',
      'pathLength',
      'patternContentUnits',
      'patternTransform',
      'patternUnits',
      'pointsAtX',
      'pointsAtY',
      'pointsAtZ',
      'preserveAlpha',
      'preserveAspectRatio',
      'primitiveUnits',
      'refX',
      'refY',
      'repeatCount',
      'repeatDur',
      'requiredExtensions',
      'requiredFeatures',
      'specularConstant',
      'specularExponent',
      'spreadMethod',
      'startOffset',
      'stdDeviation',
      'stitchTiles',
      'surfaceScale',
      'systemLanguage',
      'tableValues',
      'targetX',
      'targetY',
      'textLength',
      'viewBox',
      'viewTarget',
      'xChannelSelector',
      'yChannelSelector',
      'zoomAndPan',
  ].map((attr) => [attr.toLowerCase(), attr]));
  const XML_ATTRS_ADJUSTMENT_MAP = new Map([
      ['xlink:actuate', { prefix: 'xlink', name: 'actuate', namespace: NS.XLINK }],
      ['xlink:arcrole', { prefix: 'xlink', name: 'arcrole', namespace: NS.XLINK }],
      ['xlink:href', { prefix: 'xlink', name: 'href', namespace: NS.XLINK }],
      ['xlink:role', { prefix: 'xlink', name: 'role', namespace: NS.XLINK }],
      ['xlink:show', { prefix: 'xlink', name: 'show', namespace: NS.XLINK }],
      ['xlink:title', { prefix: 'xlink', name: 'title', namespace: NS.XLINK }],
      ['xlink:type', { prefix: 'xlink', name: 'type', namespace: NS.XLINK }],
      ['xml:lang', { prefix: 'xml', name: 'lang', namespace: NS.XML }],
      ['xml:space', { prefix: 'xml', name: 'space', namespace: NS.XML }],
      ['xmlns', { prefix: '', name: 'xmlns', namespace: NS.XMLNS }],
      ['xmlns:xlink', { prefix: 'xmlns', name: 'xlink', namespace: NS.XMLNS }],
  ]);
  //SVG tag names adjustment map
  const SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
      'altGlyph',
      'altGlyphDef',
      'altGlyphItem',
      'animateColor',
      'animateMotion',
      'animateTransform',
      'clipPath',
      'feBlend',
      'feColorMatrix',
      'feComponentTransfer',
      'feComposite',
      'feConvolveMatrix',
      'feDiffuseLighting',
      'feDisplacementMap',
      'feDistantLight',
      'feFlood',
      'feFuncA',
      'feFuncB',
      'feFuncG',
      'feFuncR',
      'feGaussianBlur',
      'feImage',
      'feMerge',
      'feMergeNode',
      'feMorphology',
      'feOffset',
      'fePointLight',
      'feSpecularLighting',
      'feSpotLight',
      'feTile',
      'feTurbulence',
      'foreignObject',
      'glyphRef',
      'linearGradient',
      'radialGradient',
      'textPath',
  ].map((tn) => [tn.toLowerCase(), tn]));
  //Tags that causes exit from foreign content
  const EXITS_FOREIGN_CONTENT = new Set([
      TAG_ID.B,
      TAG_ID.BIG,
      TAG_ID.BLOCKQUOTE,
      TAG_ID.BODY,
      TAG_ID.BR,
      TAG_ID.CENTER,
      TAG_ID.CODE,
      TAG_ID.DD,
      TAG_ID.DIV,
      TAG_ID.DL,
      TAG_ID.DT,
      TAG_ID.EM,
      TAG_ID.EMBED,
      TAG_ID.H1,
      TAG_ID.H2,
      TAG_ID.H3,
      TAG_ID.H4,
      TAG_ID.H5,
      TAG_ID.H6,
      TAG_ID.HEAD,
      TAG_ID.HR,
      TAG_ID.I,
      TAG_ID.IMG,
      TAG_ID.LI,
      TAG_ID.LISTING,
      TAG_ID.MENU,
      TAG_ID.META,
      TAG_ID.NOBR,
      TAG_ID.OL,
      TAG_ID.P,
      TAG_ID.PRE,
      TAG_ID.RUBY,
      TAG_ID.S,
      TAG_ID.SMALL,
      TAG_ID.SPAN,
      TAG_ID.STRONG,
      TAG_ID.STRIKE,
      TAG_ID.SUB,
      TAG_ID.SUP,
      TAG_ID.TABLE,
      TAG_ID.TT,
      TAG_ID.U,
      TAG_ID.UL,
      TAG_ID.VAR,
  ]);
  //Check exit from foreign content
  function causesExit(startTagToken) {
      const tn = startTagToken.tagID;
      const isFontWithAttrs = tn === TAG_ID.FONT &&
          startTagToken.attrs.some(({ name }) => name === ATTRS.COLOR || name === ATTRS.SIZE || name === ATTRS.FACE);
      return isFontWithAttrs || EXITS_FOREIGN_CONTENT.has(tn);
  }
  //Token adjustments
  function adjustTokenMathMLAttrs(token) {
      for (let i = 0; i < token.attrs.length; i++) {
          if (token.attrs[i].name === DEFINITION_URL_ATTR) {
              token.attrs[i].name = ADJUSTED_DEFINITION_URL_ATTR;
              break;
          }
      }
  }
  function adjustTokenSVGAttrs(token) {
      for (let i = 0; i < token.attrs.length; i++) {
          const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
          if (adjustedAttrName != null) {
              token.attrs[i].name = adjustedAttrName;
          }
      }
  }
  function adjustTokenXMLAttrs(token) {
      for (let i = 0; i < token.attrs.length; i++) {
          const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
          if (adjustedAttrEntry) {
              token.attrs[i].prefix = adjustedAttrEntry.prefix;
              token.attrs[i].name = adjustedAttrEntry.name;
              token.attrs[i].namespace = adjustedAttrEntry.namespace;
          }
      }
  }
  function adjustTokenSVGTagName(token) {
      const adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP.get(token.tagName);
      if (adjustedTagName != null) {
          token.tagName = adjustedTagName;
          token.tagID = getTagID(token.tagName);
      }
  }
  //Integration points
  function isMathMLTextIntegrationPoint(tn, ns) {
      return ns === NS.MATHML && (tn === TAG_ID.MI || tn === TAG_ID.MO || tn === TAG_ID.MN || tn === TAG_ID.MS || tn === TAG_ID.MTEXT);
  }
  function isHtmlIntegrationPoint(tn, ns, attrs) {
      if (ns === NS.MATHML && tn === TAG_ID.ANNOTATION_XML) {
          for (let i = 0; i < attrs.length; i++) {
              if (attrs[i].name === ATTRS.ENCODING) {
                  const value = attrs[i].value.toLowerCase();
                  return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
              }
          }
      }
      return ns === NS.SVG && (tn === TAG_ID.FOREIGN_OBJECT || tn === TAG_ID.DESC || tn === TAG_ID.TITLE);
  }
  function isIntegrationPoint(tn, ns, attrs, foreignNS) {
      return (((!foreignNS || foreignNS === NS.HTML) && isHtmlIntegrationPoint(tn, ns, attrs)) ||
          ((!foreignNS || foreignNS === NS.MATHML) && isMathMLTextIntegrationPoint(tn, ns)));
  }

  //Misc constants
  const HIDDEN_INPUT_TYPE = 'hidden';
  //Adoption agency loops iteration count
  const AA_OUTER_LOOP_ITER = 8;
  const AA_INNER_LOOP_ITER = 3;
  //Insertion modes
  var InsertionMode;
  (function (InsertionMode) {
      InsertionMode[InsertionMode["INITIAL"] = 0] = "INITIAL";
      InsertionMode[InsertionMode["BEFORE_HTML"] = 1] = "BEFORE_HTML";
      InsertionMode[InsertionMode["BEFORE_HEAD"] = 2] = "BEFORE_HEAD";
      InsertionMode[InsertionMode["IN_HEAD"] = 3] = "IN_HEAD";
      InsertionMode[InsertionMode["IN_HEAD_NO_SCRIPT"] = 4] = "IN_HEAD_NO_SCRIPT";
      InsertionMode[InsertionMode["AFTER_HEAD"] = 5] = "AFTER_HEAD";
      InsertionMode[InsertionMode["IN_BODY"] = 6] = "IN_BODY";
      InsertionMode[InsertionMode["TEXT"] = 7] = "TEXT";
      InsertionMode[InsertionMode["IN_TABLE"] = 8] = "IN_TABLE";
      InsertionMode[InsertionMode["IN_TABLE_TEXT"] = 9] = "IN_TABLE_TEXT";
      InsertionMode[InsertionMode["IN_CAPTION"] = 10] = "IN_CAPTION";
      InsertionMode[InsertionMode["IN_COLUMN_GROUP"] = 11] = "IN_COLUMN_GROUP";
      InsertionMode[InsertionMode["IN_TABLE_BODY"] = 12] = "IN_TABLE_BODY";
      InsertionMode[InsertionMode["IN_ROW"] = 13] = "IN_ROW";
      InsertionMode[InsertionMode["IN_CELL"] = 14] = "IN_CELL";
      InsertionMode[InsertionMode["IN_SELECT"] = 15] = "IN_SELECT";
      InsertionMode[InsertionMode["IN_SELECT_IN_TABLE"] = 16] = "IN_SELECT_IN_TABLE";
      InsertionMode[InsertionMode["IN_TEMPLATE"] = 17] = "IN_TEMPLATE";
      InsertionMode[InsertionMode["AFTER_BODY"] = 18] = "AFTER_BODY";
      InsertionMode[InsertionMode["IN_FRAMESET"] = 19] = "IN_FRAMESET";
      InsertionMode[InsertionMode["AFTER_FRAMESET"] = 20] = "AFTER_FRAMESET";
      InsertionMode[InsertionMode["AFTER_AFTER_BODY"] = 21] = "AFTER_AFTER_BODY";
      InsertionMode[InsertionMode["AFTER_AFTER_FRAMESET"] = 22] = "AFTER_AFTER_FRAMESET";
  })(InsertionMode || (InsertionMode = {}));
  const BASE_LOC = {
      startLine: -1,
      startCol: -1,
      startOffset: -1,
      endLine: -1,
      endCol: -1,
      endOffset: -1,
  };
  const TABLE_STRUCTURE_TAGS = new Set([TAG_ID.TABLE, TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TR]);
  const defaultParserOptions = {
      scriptingEnabled: true,
      sourceCodeLocationInfo: false,
      treeAdapter: defaultTreeAdapter,
      onParseError: null,
  };
  //Parser
  class Parser {
      constructor(options, document, 
      /** @internal */
      fragmentContext = null, 
      /** @internal */
      scriptHandler = null) {
          this.fragmentContext = fragmentContext;
          this.scriptHandler = scriptHandler;
          this.currentToken = null;
          this.stopped = false;
          /** @internal */
          this.insertionMode = InsertionMode.INITIAL;
          /** @internal */
          this.originalInsertionMode = InsertionMode.INITIAL;
          /** @internal */
          this.headElement = null;
          /** @internal */
          this.formElement = null;
          /** Indicates that the current node is not an element in the HTML namespace */
          this.currentNotInHTML = false;
          /**
           * The template insertion mode stack is maintained from the left.
           * Ie. the topmost element will always have index 0.
           *
           * @internal
           */
          this.tmplInsertionModeStack = [];
          /** @internal */
          this.pendingCharacterTokens = [];
          /** @internal */
          this.hasNonWhitespacePendingCharacterToken = false;
          /** @internal */
          this.framesetOk = true;
          /** @internal */
          this.skipNextNewLine = false;
          /** @internal */
          this.fosterParentingEnabled = false;
          this.options = {
              ...defaultParserOptions,
              ...options,
          };
          this.treeAdapter = this.options.treeAdapter;
          this.onParseError = this.options.onParseError;
          // Always enable location info if we report parse errors.
          if (this.onParseError) {
              this.options.sourceCodeLocationInfo = true;
          }
          this.document = document !== null && document !== void 0 ? document : this.treeAdapter.createDocument();
          this.tokenizer = new Tokenizer(this.options, this);
          this.activeFormattingElements = new FormattingElementList(this.treeAdapter);
          this.fragmentContextID = fragmentContext ? getTagID(this.treeAdapter.getTagName(fragmentContext)) : TAG_ID.UNKNOWN;
          this._setContextModes(fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : this.document, this.fragmentContextID);
          this.openElements = new OpenElementStack(this.document, this.treeAdapter, this);
      }
      // API
      static parse(html, options) {
          const parser = new this(options);
          parser.tokenizer.write(html, true);
          return parser.document;
      }
      static getFragmentParser(fragmentContext, options) {
          const opts = {
              ...defaultParserOptions,
              ...options,
          };
          //NOTE: use a <template> element as the fragment context if no context element was provided,
          //so we will parse in a "forgiving" manner
          fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : (fragmentContext = opts.treeAdapter.createElement(TAG_NAMES.TEMPLATE, NS.HTML, []));
          //NOTE: create a fake element which will be used as the `document` for fragment parsing.
          //This is important for jsdom, where a new `document` cannot be created. This led to
          //fragment parsing messing with the main `document`.
          const documentMock = opts.treeAdapter.createElement('documentmock', NS.HTML, []);
          const parser = new this(opts, documentMock, fragmentContext);
          if (parser.fragmentContextID === TAG_ID.TEMPLATE) {
              parser.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
          }
          parser._initTokenizerForFragmentParsing();
          parser._insertFakeRootElement();
          parser._resetInsertionMode();
          parser._findFormInFragmentContext();
          return parser;
      }
      getFragment() {
          const rootElement = this.treeAdapter.getFirstChild(this.document);
          const fragment = this.treeAdapter.createDocumentFragment();
          this._adoptNodes(rootElement, fragment);
          return fragment;
      }
      //Errors
      /** @internal */
      _err(token, code, beforeToken) {
          var _a;
          if (!this.onParseError)
              return;
          const loc = (_a = token.location) !== null && _a !== void 0 ? _a : BASE_LOC;
          const err = {
              code,
              startLine: loc.startLine,
              startCol: loc.startCol,
              startOffset: loc.startOffset,
              endLine: beforeToken ? loc.startLine : loc.endLine,
              endCol: beforeToken ? loc.startCol : loc.endCol,
              endOffset: beforeToken ? loc.startOffset : loc.endOffset,
          };
          this.onParseError(err);
      }
      //Stack events
      /** @internal */
      onItemPush(node, tid, isTop) {
          var _a, _b;
          (_b = (_a = this.treeAdapter).onItemPush) === null || _b === void 0 ? void 0 : _b.call(_a, node);
          if (isTop && this.openElements.stackTop > 0)
              this._setContextModes(node, tid);
      }
      /** @internal */
      onItemPop(node, isTop) {
          var _a, _b;
          if (this.options.sourceCodeLocationInfo) {
              this._setEndLocation(node, this.currentToken);
          }
          (_b = (_a = this.treeAdapter).onItemPop) === null || _b === void 0 ? void 0 : _b.call(_a, node, this.openElements.current);
          if (isTop) {
              let current;
              let currentTagId;
              if (this.openElements.stackTop === 0 && this.fragmentContext) {
                  current = this.fragmentContext;
                  currentTagId = this.fragmentContextID;
              }
              else {
                  ({ current, currentTagId } = this.openElements);
              }
              this._setContextModes(current, currentTagId);
          }
      }
      _setContextModes(current, tid) {
          const isHTML = current === this.document || (current && this.treeAdapter.getNamespaceURI(current) === NS.HTML);
          this.currentNotInHTML = !isHTML;
          this.tokenizer.inForeignNode =
              !isHTML && current !== undefined && tid !== undefined && !this._isIntegrationPoint(tid, current);
      }
      /** @protected */
      _switchToTextParsing(currentToken, nextTokenizerState) {
          this._insertElement(currentToken, NS.HTML);
          this.tokenizer.state = nextTokenizerState;
          this.originalInsertionMode = this.insertionMode;
          this.insertionMode = InsertionMode.TEXT;
      }
      switchToPlaintextParsing() {
          this.insertionMode = InsertionMode.TEXT;
          this.originalInsertionMode = InsertionMode.IN_BODY;
          this.tokenizer.state = TokenizerMode.PLAINTEXT;
      }
      //Fragment parsing
      /** @protected */
      _getAdjustedCurrentElement() {
          return this.openElements.stackTop === 0 && this.fragmentContext
              ? this.fragmentContext
              : this.openElements.current;
      }
      /** @protected */
      _findFormInFragmentContext() {
          let node = this.fragmentContext;
          while (node) {
              if (this.treeAdapter.getTagName(node) === TAG_NAMES.FORM) {
                  this.formElement = node;
                  break;
              }
              node = this.treeAdapter.getParentNode(node);
          }
      }
      _initTokenizerForFragmentParsing() {
          if (!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== NS.HTML) {
              return;
          }
          switch (this.fragmentContextID) {
              case TAG_ID.TITLE:
              case TAG_ID.TEXTAREA: {
                  this.tokenizer.state = TokenizerMode.RCDATA;
                  break;
              }
              case TAG_ID.STYLE:
              case TAG_ID.XMP:
              case TAG_ID.IFRAME:
              case TAG_ID.NOEMBED:
              case TAG_ID.NOFRAMES:
              case TAG_ID.NOSCRIPT: {
                  this.tokenizer.state = TokenizerMode.RAWTEXT;
                  break;
              }
              case TAG_ID.SCRIPT: {
                  this.tokenizer.state = TokenizerMode.SCRIPT_DATA;
                  break;
              }
              case TAG_ID.PLAINTEXT: {
                  this.tokenizer.state = TokenizerMode.PLAINTEXT;
                  break;
              }
              // Do nothing
          }
      }
      //Tree mutation
      /** @protected */
      _setDocumentType(token) {
          const name = token.name || '';
          const publicId = token.publicId || '';
          const systemId = token.systemId || '';
          this.treeAdapter.setDocumentType(this.document, name, publicId, systemId);
          if (token.location) {
              const documentChildren = this.treeAdapter.getChildNodes(this.document);
              const docTypeNode = documentChildren.find((node) => this.treeAdapter.isDocumentTypeNode(node));
              if (docTypeNode) {
                  this.treeAdapter.setNodeSourceCodeLocation(docTypeNode, token.location);
              }
          }
      }
      /** @protected */
      _attachElementToTree(element, location, insertionLocation) {
          if (this.options.sourceCodeLocationInfo) {
              const loc = location && {
                  ...location,
                  startTag: location,
              };
              this.treeAdapter.setNodeSourceCodeLocation(element, loc);
          }
          if (insertionLocation.beforeElement) {
              this.treeAdapter.insertBefore(insertionLocation.parent, element, insertionLocation.beforeElement);
          }
          else {
              this.treeAdapter.appendChild(insertionLocation.parent, element);
          }
      }
      /** @protected */
      _getInsertionLocation() {
          var _a;
          if (this._shouldFosterParentOnInsertion()) {
              return this._findFosterParentingLocation();
          }
          return {
              parent: (_a = this.openElements.currentTmplContentOrNode) !== null && _a !== void 0 ? _a : this.document,
              beforeElement: null,
          };
      }
      /** @protected */
      _createElement(tagName, namespaceURI, attrs, intendedParent) {
          var _a, _b;
          const element = this.treeAdapter.createElement(tagName, namespaceURI, attrs);
          (_b = (_a = this.treeAdapter).onElementCreated) === null || _b === void 0 ? void 0 : _b.call(_a, element, {
              intendedParent,
              formElement: this.formElement,
              isInTemplate: this.openElements.tmplCount > 0,
          });
          return element;
      }
      /**
       * For self-closing tags. Add an element to the tree, but skip adding it
       * to the stack.
       */
      /** @protected */
      _appendElement(token, namespaceURI) {
          const insertionLocation = this._getInsertionLocation();
          const element = this._createElement(token.tagName, namespaceURI, token.attrs, insertionLocation.parent);
          this._attachElementToTree(element, token.location, insertionLocation);
      }
      /** @protected */
      _insertElement(token, namespaceURI) {
          const insertionLocation = this._getInsertionLocation();
          const element = this._createElement(token.tagName, namespaceURI, token.attrs, insertionLocation.parent);
          this._attachElementToTree(element, token.location, insertionLocation);
          this.openElements.push(element, token.tagID);
      }
      /** @protected */
      _insertFakeElement(tagName, tagID) {
          const insertionLocation = this._getInsertionLocation();
          const element = this._createElement(tagName, NS.HTML, [], insertionLocation.parent);
          this._attachElementToTree(element, null, insertionLocation);
          this.openElements.push(element, tagID);
      }
      /** @protected */
      _insertTemplate(token) {
          const insertionLocation = this._getInsertionLocation();
          const tmpl = this._createElement(token.tagName, NS.HTML, token.attrs, insertionLocation.parent);
          const content = this.treeAdapter.createDocumentFragment();
          this.treeAdapter.setTemplateContent(tmpl, content);
          this._attachElementToTree(tmpl, token.location, insertionLocation);
          this.openElements.push(tmpl, token.tagID);
          if (this.options.sourceCodeLocationInfo)
              this.treeAdapter.setNodeSourceCodeLocation(content, null);
      }
      /** @protected */
      _insertFakeRootElement() {
          const element = this._createElement(TAG_NAMES.HTML, NS.HTML, [], this.document);
          if (this.options.sourceCodeLocationInfo)
              this.treeAdapter.setNodeSourceCodeLocation(element, null);
          this.treeAdapter.appendChild(this.document, element);
          this.openElements.push(element, TAG_ID.HTML);
      }
      /** @protected */
      _appendCommentNode(token, parent) {
          const commentNode = this.treeAdapter.createCommentNode(token.data);
          this.treeAdapter.appendChild(parent, commentNode);
          if (this.options.sourceCodeLocationInfo) {
              this.treeAdapter.setNodeSourceCodeLocation(commentNode, token.location);
          }
      }
      /** @protected */
      _insertCharacters(token) {
          let parent;
          let beforeElement;
          if (this._shouldFosterParentOnInsertion()) {
              ({ parent, beforeElement } = this._findFosterParentingLocation());
              if (beforeElement) {
                  this.treeAdapter.insertTextBefore(parent, token.chars, beforeElement);
              }
              else {
                  this.treeAdapter.insertText(parent, token.chars);
              }
          }
          else {
              parent = this.openElements.currentTmplContentOrNode;
              this.treeAdapter.insertText(parent, token.chars);
          }
          if (!token.location)
              return;
          const siblings = this.treeAdapter.getChildNodes(parent);
          const textNodeIdx = beforeElement ? siblings.lastIndexOf(beforeElement) : siblings.length;
          const textNode = siblings[textNodeIdx - 1];
          //NOTE: if we have a location assigned by another token, then just update the end position
          const tnLoc = this.treeAdapter.getNodeSourceCodeLocation(textNode);
          if (tnLoc) {
              const { endLine, endCol, endOffset } = token.location;
              this.treeAdapter.updateNodeSourceCodeLocation(textNode, { endLine, endCol, endOffset });
          }
          else if (this.options.sourceCodeLocationInfo) {
              this.treeAdapter.setNodeSourceCodeLocation(textNode, token.location);
          }
      }
      /** @protected */
      _adoptNodes(donor, recipient) {
          for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor)) {
              this.treeAdapter.detachNode(child);
              this.treeAdapter.appendChild(recipient, child);
          }
      }
      /** @protected */
      _setEndLocation(element, closingToken) {
          if (this.treeAdapter.getNodeSourceCodeLocation(element) && closingToken.location) {
              const ctLoc = closingToken.location;
              const tn = this.treeAdapter.getTagName(element);
              const endLoc = 
              // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
              // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
              closingToken.type === TokenType.END_TAG && tn === closingToken.tagName
                  ? {
                      endTag: { ...ctLoc },
                      endLine: ctLoc.endLine,
                      endCol: ctLoc.endCol,
                      endOffset: ctLoc.endOffset,
                  }
                  : {
                      endLine: ctLoc.startLine,
                      endCol: ctLoc.startCol,
                      endOffset: ctLoc.startOffset,
                  };
              this.treeAdapter.updateNodeSourceCodeLocation(element, endLoc);
          }
      }
      //Token processing
      shouldProcessStartTagTokenInForeignContent(token) {
          // Check that neither current === document, or ns === NS.HTML
          if (!this.currentNotInHTML)
              return false;
          let current;
          let currentTagId;
          if (this.openElements.stackTop === 0 && this.fragmentContext) {
              current = this.fragmentContext;
              currentTagId = this.fragmentContextID;
          }
          else {
              ({ current, currentTagId } = this.openElements);
          }
          if (token.tagID === TAG_ID.SVG &&
              this.treeAdapter.getTagName(current) === TAG_NAMES.ANNOTATION_XML &&
              this.treeAdapter.getNamespaceURI(current) === NS.MATHML) {
              return false;
          }
          return (
          // Check that `current` is not an integration point for HTML or MathML elements.
          this.tokenizer.inForeignNode ||
              // If it _is_ an integration point, then we might have to check that it is not an HTML
              // integration point.
              ((token.tagID === TAG_ID.MGLYPH || token.tagID === TAG_ID.MALIGNMARK) &&
                  currentTagId !== undefined &&
                  !this._isIntegrationPoint(currentTagId, current, NS.HTML)));
      }
      /** @protected */
      _processToken(token) {
          switch (token.type) {
              case TokenType.CHARACTER: {
                  this.onCharacter(token);
                  break;
              }
              case TokenType.NULL_CHARACTER: {
                  this.onNullCharacter(token);
                  break;
              }
              case TokenType.COMMENT: {
                  this.onComment(token);
                  break;
              }
              case TokenType.DOCTYPE: {
                  this.onDoctype(token);
                  break;
              }
              case TokenType.START_TAG: {
                  this._processStartTag(token);
                  break;
              }
              case TokenType.END_TAG: {
                  this.onEndTag(token);
                  break;
              }
              case TokenType.EOF: {
                  this.onEof(token);
                  break;
              }
              case TokenType.WHITESPACE_CHARACTER: {
                  this.onWhitespaceCharacter(token);
                  break;
              }
          }
      }
      //Integration points
      /** @protected */
      _isIntegrationPoint(tid, element, foreignNS) {
          const ns = this.treeAdapter.getNamespaceURI(element);
          const attrs = this.treeAdapter.getAttrList(element);
          return isIntegrationPoint(tid, ns, attrs, foreignNS);
      }
      //Active formatting elements reconstruction
      /** @protected */
      _reconstructActiveFormattingElements() {
          const listLength = this.activeFormattingElements.entries.length;
          if (listLength) {
              const endIndex = this.activeFormattingElements.entries.findIndex((entry) => entry.type === EntryType.Marker || this.openElements.contains(entry.element));
              const unopenIdx = endIndex === -1 ? listLength - 1 : endIndex - 1;
              for (let i = unopenIdx; i >= 0; i--) {
                  const entry = this.activeFormattingElements.entries[i];
                  this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
                  entry.element = this.openElements.current;
              }
          }
      }
      //Close elements
      /** @protected */
      _closeTableCell() {
          this.openElements.generateImpliedEndTags();
          this.openElements.popUntilTableCellPopped();
          this.activeFormattingElements.clearToLastMarker();
          this.insertionMode = InsertionMode.IN_ROW;
      }
      /** @protected */
      _closePElement() {
          this.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.P);
          this.openElements.popUntilTagNamePopped(TAG_ID.P);
      }
      //Insertion modes
      /** @protected */
      _resetInsertionMode() {
          for (let i = this.openElements.stackTop; i >= 0; i--) {
              //Insertion mode reset map
              switch (i === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[i]) {
                  case TAG_ID.TR: {
                      this.insertionMode = InsertionMode.IN_ROW;
                      return;
                  }
                  case TAG_ID.TBODY:
                  case TAG_ID.THEAD:
                  case TAG_ID.TFOOT: {
                      this.insertionMode = InsertionMode.IN_TABLE_BODY;
                      return;
                  }
                  case TAG_ID.CAPTION: {
                      this.insertionMode = InsertionMode.IN_CAPTION;
                      return;
                  }
                  case TAG_ID.COLGROUP: {
                      this.insertionMode = InsertionMode.IN_COLUMN_GROUP;
                      return;
                  }
                  case TAG_ID.TABLE: {
                      this.insertionMode = InsertionMode.IN_TABLE;
                      return;
                  }
                  case TAG_ID.BODY: {
                      this.insertionMode = InsertionMode.IN_BODY;
                      return;
                  }
                  case TAG_ID.FRAMESET: {
                      this.insertionMode = InsertionMode.IN_FRAMESET;
                      return;
                  }
                  case TAG_ID.SELECT: {
                      this._resetInsertionModeForSelect(i);
                      return;
                  }
                  case TAG_ID.TEMPLATE: {
                      this.insertionMode = this.tmplInsertionModeStack[0];
                      return;
                  }
                  case TAG_ID.HTML: {
                      this.insertionMode = this.headElement ? InsertionMode.AFTER_HEAD : InsertionMode.BEFORE_HEAD;
                      return;
                  }
                  case TAG_ID.TD:
                  case TAG_ID.TH: {
                      if (i > 0) {
                          this.insertionMode = InsertionMode.IN_CELL;
                          return;
                      }
                      break;
                  }
                  case TAG_ID.HEAD: {
                      if (i > 0) {
                          this.insertionMode = InsertionMode.IN_HEAD;
                          return;
                      }
                      break;
                  }
              }
          }
          this.insertionMode = InsertionMode.IN_BODY;
      }
      /** @protected */
      _resetInsertionModeForSelect(selectIdx) {
          if (selectIdx > 0) {
              for (let i = selectIdx - 1; i > 0; i--) {
                  const tn = this.openElements.tagIDs[i];
                  if (tn === TAG_ID.TEMPLATE) {
                      break;
                  }
                  else if (tn === TAG_ID.TABLE) {
                      this.insertionMode = InsertionMode.IN_SELECT_IN_TABLE;
                      return;
                  }
              }
          }
          this.insertionMode = InsertionMode.IN_SELECT;
      }
      //Foster parenting
      /** @protected */
      _isElementCausesFosterParenting(tn) {
          return TABLE_STRUCTURE_TAGS.has(tn);
      }
      /** @protected */
      _shouldFosterParentOnInsertion() {
          return (this.fosterParentingEnabled &&
              this.openElements.currentTagId !== undefined &&
              this._isElementCausesFosterParenting(this.openElements.currentTagId));
      }
      /** @protected */
      _findFosterParentingLocation() {
          for (let i = this.openElements.stackTop; i >= 0; i--) {
              const openElement = this.openElements.items[i];
              switch (this.openElements.tagIDs[i]) {
                  case TAG_ID.TEMPLATE: {
                      if (this.treeAdapter.getNamespaceURI(openElement) === NS.HTML) {
                          return { parent: this.treeAdapter.getTemplateContent(openElement), beforeElement: null };
                      }
                      break;
                  }
                  case TAG_ID.TABLE: {
                      const parent = this.treeAdapter.getParentNode(openElement);
                      if (parent) {
                          return { parent, beforeElement: openElement };
                      }
                      return { parent: this.openElements.items[i - 1], beforeElement: null };
                  }
                  // Do nothing
              }
          }
          return { parent: this.openElements.items[0], beforeElement: null };
      }
      /** @protected */
      _fosterParentElement(element) {
          const location = this._findFosterParentingLocation();
          if (location.beforeElement) {
              this.treeAdapter.insertBefore(location.parent, element, location.beforeElement);
          }
          else {
              this.treeAdapter.appendChild(location.parent, element);
          }
      }
      //Special elements
      /** @protected */
      _isSpecialElement(element, id) {
          const ns = this.treeAdapter.getNamespaceURI(element);
          return SPECIAL_ELEMENTS[ns].has(id);
      }
      /** @internal */
      onCharacter(token) {
          this.skipNextNewLine = false;
          if (this.tokenizer.inForeignNode) {
              characterInForeignContent(this, token);
              return;
          }
          switch (this.insertionMode) {
              case InsertionMode.INITIAL: {
                  tokenInInitialMode(this, token);
                  break;
              }
              case InsertionMode.BEFORE_HTML: {
                  tokenBeforeHtml(this, token);
                  break;
              }
              case InsertionMode.BEFORE_HEAD: {
                  tokenBeforeHead(this, token);
                  break;
              }
              case InsertionMode.IN_HEAD: {
                  tokenInHead(this, token);
                  break;
              }
              case InsertionMode.IN_HEAD_NO_SCRIPT: {
                  tokenInHeadNoScript(this, token);
                  break;
              }
              case InsertionMode.AFTER_HEAD: {
                  tokenAfterHead(this, token);
                  break;
              }
              case InsertionMode.IN_BODY:
              case InsertionMode.IN_CAPTION:
              case InsertionMode.IN_CELL:
              case InsertionMode.IN_TEMPLATE: {
                  characterInBody(this, token);
                  break;
              }
              case InsertionMode.TEXT:
              case InsertionMode.IN_SELECT:
              case InsertionMode.IN_SELECT_IN_TABLE: {
                  this._insertCharacters(token);
                  break;
              }
              case InsertionMode.IN_TABLE:
              case InsertionMode.IN_TABLE_BODY:
              case InsertionMode.IN_ROW: {
                  characterInTable(this, token);
                  break;
              }
              case InsertionMode.IN_TABLE_TEXT: {
                  characterInTableText(this, token);
                  break;
              }
              case InsertionMode.IN_COLUMN_GROUP: {
                  tokenInColumnGroup(this, token);
                  break;
              }
              case InsertionMode.AFTER_BODY: {
                  tokenAfterBody(this, token);
                  break;
              }
              case InsertionMode.AFTER_AFTER_BODY: {
                  tokenAfterAfterBody(this, token);
                  break;
              }
              // Do nothing
          }
      }
      /** @internal */
      onNullCharacter(token) {
          this.skipNextNewLine = false;
          if (this.tokenizer.inForeignNode) {
              nullCharacterInForeignContent(this, token);
              return;
          }
          switch (this.insertionMode) {
              case InsertionMode.INITIAL: {
                  tokenInInitialMode(this, token);
                  break;
              }
              case InsertionMode.BEFORE_HTML: {
                  tokenBeforeHtml(this, token);
                  break;
              }
              case InsertionMode.BEFORE_HEAD: {
                  tokenBeforeHead(this, token);
                  break;
              }
              case InsertionMode.IN_HEAD: {
                  tokenInHead(this, token);
                  break;
              }
              case InsertionMode.IN_HEAD_NO_SCRIPT: {
                  tokenInHeadNoScript(this, token);
                  break;
              }
              case InsertionMode.AFTER_HEAD: {
                  tokenAfterHead(this, token);
                  break;
              }
              case InsertionMode.TEXT: {
                  this._insertCharacters(token);
                  break;
              }
              case InsertionMode.IN_TABLE:
              case InsertionMode.IN_TABLE_BODY:
              case InsertionMode.IN_ROW: {
                  characterInTable(this, token);
                  break;
              }
              case InsertionMode.IN_COLUMN_GROUP: {
                  tokenInColumnGroup(this, token);
                  break;
              }
              case InsertionMode.AFTER_BODY: {
                  tokenAfterBody(this, token);
                  break;
              }
              case InsertionMode.AFTER_AFTER_BODY: {
                  tokenAfterAfterBody(this, token);
                  break;
              }
              // Do nothing
          }
      }
      /** @internal */
      onComment(token) {
          this.skipNextNewLine = false;
          if (this.currentNotInHTML) {
              appendComment(this, token);
              return;
          }
          switch (this.insertionMode) {
              case InsertionMode.INITIAL:
              case InsertionMode.BEFORE_HTML:
              case InsertionMode.BEFORE_HEAD:
              case InsertionMode.IN_HEAD:
              case InsertionMode.IN_HEAD_NO_SCRIPT:
              case InsertionMode.AFTER_HEAD:
              case InsertionMode.IN_BODY:
              case InsertionMode.IN_TABLE:
              case InsertionMode.IN_CAPTION:
              case InsertionMode.IN_COLUMN_GROUP:
              case InsertionMode.IN_TABLE_BODY:
              case InsertionMode.IN_ROW:
              case InsertionMode.IN_CELL:
              case InsertionMode.IN_SELECT:
              case InsertionMode.IN_SELECT_IN_TABLE:
              case InsertionMode.IN_TEMPLATE:
              case InsertionMode.IN_FRAMESET:
              case InsertionMode.AFTER_FRAMESET: {
                  appendComment(this, token);
                  break;
              }
              case InsertionMode.IN_TABLE_TEXT: {
                  tokenInTableText(this, token);
                  break;
              }
              case InsertionMode.AFTER_BODY: {
                  appendCommentToRootHtmlElement(this, token);
                  break;
              }
              case InsertionMode.AFTER_AFTER_BODY:
              case InsertionMode.AFTER_AFTER_FRAMESET: {
                  appendCommentToDocument(this, token);
                  break;
              }
              // Do nothing
          }
      }
      /** @internal */
      onDoctype(token) {
          this.skipNextNewLine = false;
          switch (this.insertionMode) {
              case InsertionMode.INITIAL: {
                  doctypeInInitialMode(this, token);
                  break;
              }
              case InsertionMode.BEFORE_HEAD:
              case InsertionMode.IN_HEAD:
              case InsertionMode.IN_HEAD_NO_SCRIPT:
              case InsertionMode.AFTER_HEAD: {
                  this._err(token, ERR.misplacedDoctype);
                  break;
              }
              case InsertionMode.IN_TABLE_TEXT: {
                  tokenInTableText(this, token);
                  break;
              }
              // Do nothing
          }
      }
      /** @internal */
      onStartTag(token) {
          this.skipNextNewLine = false;
          this.currentToken = token;
          this._processStartTag(token);
          if (token.selfClosing && !token.ackSelfClosing) {
              this._err(token, ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
          }
      }
      /**
       * Processes a given start tag.
       *
       * `onStartTag` checks if a self-closing tag was recognized. When a token
       * is moved inbetween multiple insertion modes, this check for self-closing
       * could lead to false positives. To avoid this, `_processStartTag` is used
       * for nested calls.
       *
       * @param token The token to process.
       * @protected
       */
      _processStartTag(token) {
          if (this.shouldProcessStartTagTokenInForeignContent(token)) {
              startTagInForeignContent(this, token);
          }
          else {
              this._startTagOutsideForeignContent(token);
          }
      }
      /** @protected */
      _startTagOutsideForeignContent(token) {
          switch (this.insertionMode) {
              case InsertionMode.INITIAL: {
                  tokenInInitialMode(this, token);
                  break;
              }
              case InsertionMode.BEFORE_HTML: {
                  startTagBeforeHtml(this, token);
                  break;
              }
              case InsertionMode.BEFORE_HEAD: {
                  startTagBeforeHead(this, token);
                  break;
              }
              case InsertionMode.IN_HEAD: {
                  startTagInHead(this, token);
                  break;
              }
              case InsertionMode.IN_HEAD_NO_SCRIPT: {
                  startTagInHeadNoScript(this, token);
                  break;
              }
              case InsertionMode.AFTER_HEAD: {
                  startTagAfterHead(this, token);
                  break;
              }
              case InsertionMode.IN_BODY: {
                  startTagInBody(this, token);
                  break;
              }
              case InsertionMode.IN_TABLE: {
                  startTagInTable(this, token);
                  break;
              }
              case InsertionMode.IN_TABLE_TEXT: {
                  tokenInTableText(this, token);
                  break;
              }
              case InsertionMode.IN_CAPTION: {
                  startTagInCaption(this, token);
                  break;
              }
              case InsertionMode.IN_COLUMN_GROUP: {
                  startTagInColumnGroup(this, token);
                  break;
              }
              case InsertionMode.IN_TABLE_BODY: {
                  startTagInTableBody(this, token);
                  break;
              }
              case InsertionMode.IN_ROW: {
                  startTagInRow(this, token);
                  break;
              }
              case InsertionMode.IN_CELL: {
                  startTagInCell(this, token);
                  break;
              }
              case InsertionMode.IN_SELECT: {
                  startTagInSelect(this, token);
                  break;
              }
              case InsertionMode.IN_SELECT_IN_TABLE: {
                  startTagInSelectInTable(this, token);
                  break;
              }
              case InsertionMode.IN_TEMPLATE: {
                  startTagInTemplate(this, token);
                  break;
              }
              case InsertionMode.AFTER_BODY: {
                  startTagAfterBody(this, token);
                  break;
              }
              case InsertionMode.IN_FRAMESET: {
                  startTagInFrameset(this, token);
                  break;
              }
              case InsertionMode.AFTER_FRAMESET: {
                  startTagAfterFrameset(this, token);
                  break;
              }
              case InsertionMode.AFTER_AFTER_BODY: {
                  startTagAfterAfterBody(this, token);
                  break;
              }
              case InsertionMode.AFTER_AFTER_FRAMESET: {
                  startTagAfterAfterFrameset(this, token);
                  break;
              }
              // Do nothing
          }
      }
      /** @internal */
      onEndTag(token) {
          this.skipNextNewLine = false;
          this.currentToken = token;
          if (this.currentNotInHTML) {
              endTagInForeignContent(this, token);
          }
          else {
              this._endTagOutsideForeignContent(token);
          }
      }
      /** @protected */
      _endTagOutsideForeignContent(token) {
          switch (this.insertionMode) {
              case InsertionMode.INITIAL: {
                  tokenInInitialMode(this, token);
                  break;
              }
              case InsertionMode.BEFORE_HTML: {
                  endTagBeforeHtml(this, token);
                  break;
              }
              case InsertionMode.BEFORE_HEAD: {
                  endTagBeforeHead(this, token);
                  break;
              }
              case InsertionMode.IN_HEAD: {
                  endTagInHead(this, token);
                  break;
              }
              case InsertionMode.IN_HEAD_NO_SCRIPT: {
                  endTagInHeadNoScript(this, token);
                  break;
              }
              case InsertionMode.AFTER_HEAD: {
                  endTagAfterHead(this, token);
                  break;
              }
              case InsertionMode.IN_BODY: {
                  endTagInBody(this, token);
                  break;
              }
              case InsertionMode.TEXT: {
                  endTagInText(this, token);
                  break;
              }
              case InsertionMode.IN_TABLE: {
                  endTagInTable(this, token);
                  break;
              }
              case InsertionMode.IN_TABLE_TEXT: {
                  tokenInTableText(this, token);
                  break;
              }
              case InsertionMode.IN_CAPTION: {
                  endTagInCaption(this, token);
                  break;
              }
              case InsertionMode.IN_COLUMN_GROUP: {
                  endTagInColumnGroup(this, token);
                  break;
              }
              case InsertionMode.IN_TABLE_BODY: {
                  endTagInTableBody(this, token);
                  break;
              }
              case InsertionMode.IN_ROW: {
                  endTagInRow(this, token);
                  break;
              }
              case InsertionMode.IN_CELL: {
                  endTagInCell(this, token);
                  break;
              }
              case InsertionMode.IN_SELECT: {
                  endTagInSelect(this, token);
                  break;
              }
              case InsertionMode.IN_SELECT_IN_TABLE: {
                  endTagInSelectInTable(this, token);
                  break;
              }
              case InsertionMode.IN_TEMPLATE: {
                  endTagInTemplate(this, token);
                  break;
              }
              case InsertionMode.AFTER_BODY: {
                  endTagAfterBody(this, token);
                  break;
              }
              case InsertionMode.IN_FRAMESET: {
                  endTagInFrameset(this, token);
                  break;
              }
              case InsertionMode.AFTER_FRAMESET: {
                  endTagAfterFrameset(this, token);
                  break;
              }
              case InsertionMode.AFTER_AFTER_BODY: {
                  tokenAfterAfterBody(this, token);
                  break;
              }
              // Do nothing
          }
      }
      /** @internal */
      onEof(token) {
          switch (this.insertionMode) {
              case InsertionMode.INITIAL: {
                  tokenInInitialMode(this, token);
                  break;
              }
              case InsertionMode.BEFORE_HTML: {
                  tokenBeforeHtml(this, token);
                  break;
              }
              case InsertionMode.BEFORE_HEAD: {
                  tokenBeforeHead(this, token);
                  break;
              }
              case InsertionMode.IN_HEAD: {
                  tokenInHead(this, token);
                  break;
              }
              case InsertionMode.IN_HEAD_NO_SCRIPT: {
                  tokenInHeadNoScript(this, token);
                  break;
              }
              case InsertionMode.AFTER_HEAD: {
                  tokenAfterHead(this, token);
                  break;
              }
              case InsertionMode.IN_BODY:
              case InsertionMode.IN_TABLE:
              case InsertionMode.IN_CAPTION:
              case InsertionMode.IN_COLUMN_GROUP:
              case InsertionMode.IN_TABLE_BODY:
              case InsertionMode.IN_ROW:
              case InsertionMode.IN_CELL:
              case InsertionMode.IN_SELECT:
              case InsertionMode.IN_SELECT_IN_TABLE: {
                  eofInBody(this, token);
                  break;
              }
              case InsertionMode.TEXT: {
                  eofInText(this, token);
                  break;
              }
              case InsertionMode.IN_TABLE_TEXT: {
                  tokenInTableText(this, token);
                  break;
              }
              case InsertionMode.IN_TEMPLATE: {
                  eofInTemplate(this, token);
                  break;
              }
              case InsertionMode.AFTER_BODY:
              case InsertionMode.IN_FRAMESET:
              case InsertionMode.AFTER_FRAMESET:
              case InsertionMode.AFTER_AFTER_BODY:
              case InsertionMode.AFTER_AFTER_FRAMESET: {
                  stopParsing(this, token);
                  break;
              }
              // Do nothing
          }
      }
      /** @internal */
      onWhitespaceCharacter(token) {
          if (this.skipNextNewLine) {
              this.skipNextNewLine = false;
              if (token.chars.charCodeAt(0) === CODE_POINTS.LINE_FEED) {
                  if (token.chars.length === 1) {
                      return;
                  }
                  token.chars = token.chars.substr(1);
              }
          }
          if (this.tokenizer.inForeignNode) {
              this._insertCharacters(token);
              return;
          }
          switch (this.insertionMode) {
              case InsertionMode.IN_HEAD:
              case InsertionMode.IN_HEAD_NO_SCRIPT:
              case InsertionMode.AFTER_HEAD:
              case InsertionMode.TEXT:
              case InsertionMode.IN_COLUMN_GROUP:
              case InsertionMode.IN_SELECT:
              case InsertionMode.IN_SELECT_IN_TABLE:
              case InsertionMode.IN_FRAMESET:
              case InsertionMode.AFTER_FRAMESET: {
                  this._insertCharacters(token);
                  break;
              }
              case InsertionMode.IN_BODY:
              case InsertionMode.IN_CAPTION:
              case InsertionMode.IN_CELL:
              case InsertionMode.IN_TEMPLATE:
              case InsertionMode.AFTER_BODY:
              case InsertionMode.AFTER_AFTER_BODY:
              case InsertionMode.AFTER_AFTER_FRAMESET: {
                  whitespaceCharacterInBody(this, token);
                  break;
              }
              case InsertionMode.IN_TABLE:
              case InsertionMode.IN_TABLE_BODY:
              case InsertionMode.IN_ROW: {
                  characterInTable(this, token);
                  break;
              }
              case InsertionMode.IN_TABLE_TEXT: {
                  whitespaceCharacterInTableText(this, token);
                  break;
              }
              // Do nothing
          }
      }
  }
  //Adoption agency algorithm
  //(see: http://www.whatwg.org/specs/web-apps/current-work/multipage/tree-construction.html#adoptionAgency)
  //------------------------------------------------------------------
  //Steps 5-8 of the algorithm
  function aaObtainFormattingElementEntry(p, token) {
      let formattingElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);
      if (formattingElementEntry) {
          if (!p.openElements.contains(formattingElementEntry.element)) {
              p.activeFormattingElements.removeEntry(formattingElementEntry);
              formattingElementEntry = null;
          }
          else if (!p.openElements.hasInScope(token.tagID)) {
              formattingElementEntry = null;
          }
      }
      else {
          genericEndTagInBody(p, token);
      }
      return formattingElementEntry;
  }
  //Steps 9 and 10 of the algorithm
  function aaObtainFurthestBlock(p, formattingElementEntry) {
      let furthestBlock = null;
      let idx = p.openElements.stackTop;
      for (; idx >= 0; idx--) {
          const element = p.openElements.items[idx];
          if (element === formattingElementEntry.element) {
              break;
          }
          if (p._isSpecialElement(element, p.openElements.tagIDs[idx])) {
              furthestBlock = element;
          }
      }
      if (!furthestBlock) {
          p.openElements.shortenToLength(Math.max(idx, 0));
          p.activeFormattingElements.removeEntry(formattingElementEntry);
      }
      return furthestBlock;
  }
  //Step 13 of the algorithm
  function aaInnerLoop(p, furthestBlock, formattingElement) {
      let lastElement = furthestBlock;
      let nextElement = p.openElements.getCommonAncestor(furthestBlock);
      const intendedParent = p.openElements.getCommonAncestor(formattingElement);
      for (let i = 0, element = nextElement; element !== formattingElement; i++, element = nextElement) {
          //NOTE: store the next element for the next loop iteration (it may be deleted from the stack by step 9.5)
          nextElement = p.openElements.getCommonAncestor(element);
          const elementEntry = p.activeFormattingElements.getElementEntry(element);
          const counterOverflow = elementEntry && i >= AA_INNER_LOOP_ITER;
          const shouldRemoveFromOpenElements = !elementEntry || counterOverflow;
          if (shouldRemoveFromOpenElements) {
              if (counterOverflow) {
                  p.activeFormattingElements.removeEntry(elementEntry);
              }
              p.openElements.remove(element);
          }
          else {
              element = aaRecreateElementFromEntry(p, elementEntry, intendedParent);
              if (lastElement === furthestBlock) {
                  p.activeFormattingElements.bookmark = elementEntry;
              }
              p.treeAdapter.detachNode(lastElement);
              p.treeAdapter.appendChild(element, lastElement);
              lastElement = element;
          }
      }
      return lastElement;
  }
  //Step 13.7 of the algorithm
  function aaRecreateElementFromEntry(p, elementEntry, intendedParent) {
      const ns = p.treeAdapter.getNamespaceURI(elementEntry.element);
      const newElement = p._createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs, intendedParent);
      p.openElements.replace(elementEntry.element, newElement);
      elementEntry.element = newElement;
      return newElement;
  }
  //Step 14 of the algorithm
  function aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement) {
      const tn = p.treeAdapter.getTagName(commonAncestor);
      const tid = getTagID(tn);
      if (p._isElementCausesFosterParenting(tid)) {
          p._fosterParentElement(lastElement);
      }
      else {
          const ns = p.treeAdapter.getNamespaceURI(commonAncestor);
          if (tid === TAG_ID.TEMPLATE && ns === NS.HTML) {
              commonAncestor = p.treeAdapter.getTemplateContent(commonAncestor);
          }
          p.treeAdapter.appendChild(commonAncestor, lastElement);
      }
  }
  //Steps 15-19 of the algorithm
  function aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry) {
      const ns = p.treeAdapter.getNamespaceURI(formattingElementEntry.element);
      const { token } = formattingElementEntry;
      const newElement = p._createElement(token.tagName, ns, token.attrs, furthestBlock);
      p._adoptNodes(furthestBlock, newElement);
      p.treeAdapter.appendChild(furthestBlock, newElement);
      p.activeFormattingElements.insertElementAfterBookmark(newElement, token);
      p.activeFormattingElements.removeEntry(formattingElementEntry);
      p.openElements.remove(formattingElementEntry.element);
      p.openElements.insertAfter(furthestBlock, newElement, token.tagID);
  }
  //Algorithm entry point
  function callAdoptionAgency(p, token) {
      for (let i = 0; i < AA_OUTER_LOOP_ITER; i++) {
          const formattingElementEntry = aaObtainFormattingElementEntry(p, token);
          if (!formattingElementEntry) {
              break;
          }
          const furthestBlock = aaObtainFurthestBlock(p, formattingElementEntry);
          if (!furthestBlock) {
              break;
          }
          p.activeFormattingElements.bookmark = formattingElementEntry;
          const lastElement = aaInnerLoop(p, furthestBlock, formattingElementEntry.element);
          const commonAncestor = p.openElements.getCommonAncestor(formattingElementEntry.element);
          p.treeAdapter.detachNode(lastElement);
          if (commonAncestor)
              aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement);
          aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry);
      }
  }
  //Generic token handlers
  //------------------------------------------------------------------
  function appendComment(p, token) {
      p._appendCommentNode(token, p.openElements.currentTmplContentOrNode);
  }
  function appendCommentToRootHtmlElement(p, token) {
      p._appendCommentNode(token, p.openElements.items[0]);
  }
  function appendCommentToDocument(p, token) {
      p._appendCommentNode(token, p.document);
  }
  function stopParsing(p, token) {
      p.stopped = true;
      // NOTE: Set end locations for elements that remain on the open element stack.
      if (token.location) {
          // NOTE: If we are not in a fragment, `html` and `body` will stay on the stack.
          // This is a problem, as we might overwrite their end position here.
          const target = p.fragmentContext ? 0 : 2;
          for (let i = p.openElements.stackTop; i >= target; i--) {
              p._setEndLocation(p.openElements.items[i], token);
          }
          // Handle `html` and `body`
          if (!p.fragmentContext && p.openElements.stackTop >= 0) {
              const htmlElement = p.openElements.items[0];
              const htmlLocation = p.treeAdapter.getNodeSourceCodeLocation(htmlElement);
              if (htmlLocation && !htmlLocation.endTag) {
                  p._setEndLocation(htmlElement, token);
                  if (p.openElements.stackTop >= 1) {
                      const bodyElement = p.openElements.items[1];
                      const bodyLocation = p.treeAdapter.getNodeSourceCodeLocation(bodyElement);
                      if (bodyLocation && !bodyLocation.endTag) {
                          p._setEndLocation(bodyElement, token);
                      }
                  }
              }
          }
      }
  }
  // The "initial" insertion mode
  //------------------------------------------------------------------
  function doctypeInInitialMode(p, token) {
      p._setDocumentType(token);
      const mode = token.forceQuirks ? DOCUMENT_MODE.QUIRKS : getDocumentMode(token);
      if (!isConforming(token)) {
          p._err(token, ERR.nonConformingDoctype);
      }
      p.treeAdapter.setDocumentMode(p.document, mode);
      p.insertionMode = InsertionMode.BEFORE_HTML;
  }
  function tokenInInitialMode(p, token) {
      p._err(token, ERR.missingDoctype, true);
      p.treeAdapter.setDocumentMode(p.document, DOCUMENT_MODE.QUIRKS);
      p.insertionMode = InsertionMode.BEFORE_HTML;
      p._processToken(token);
  }
  // The "before html" insertion mode
  //------------------------------------------------------------------
  function startTagBeforeHtml(p, token) {
      if (token.tagID === TAG_ID.HTML) {
          p._insertElement(token, NS.HTML);
          p.insertionMode = InsertionMode.BEFORE_HEAD;
      }
      else {
          tokenBeforeHtml(p, token);
      }
  }
  function endTagBeforeHtml(p, token) {
      const tn = token.tagID;
      if (tn === TAG_ID.HTML || tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.BR) {
          tokenBeforeHtml(p, token);
      }
  }
  function tokenBeforeHtml(p, token) {
      p._insertFakeRootElement();
      p.insertionMode = InsertionMode.BEFORE_HEAD;
      p._processToken(token);
  }
  // The "before head" insertion mode
  //------------------------------------------------------------------
  function startTagBeforeHead(p, token) {
      switch (token.tagID) {
          case TAG_ID.HTML: {
              startTagInBody(p, token);
              break;
          }
          case TAG_ID.HEAD: {
              p._insertElement(token, NS.HTML);
              p.headElement = p.openElements.current;
              p.insertionMode = InsertionMode.IN_HEAD;
              break;
          }
          default: {
              tokenBeforeHead(p, token);
          }
      }
  }
  function endTagBeforeHead(p, token) {
      const tn = token.tagID;
      if (tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.HTML || tn === TAG_ID.BR) {
          tokenBeforeHead(p, token);
      }
      else {
          p._err(token, ERR.endTagWithoutMatchingOpenElement);
      }
  }
  function tokenBeforeHead(p, token) {
      p._insertFakeElement(TAG_NAMES.HEAD, TAG_ID.HEAD);
      p.headElement = p.openElements.current;
      p.insertionMode = InsertionMode.IN_HEAD;
      p._processToken(token);
  }
  // The "in head" insertion mode
  //------------------------------------------------------------------
  function startTagInHead(p, token) {
      switch (token.tagID) {
          case TAG_ID.HTML: {
              startTagInBody(p, token);
              break;
          }
          case TAG_ID.BASE:
          case TAG_ID.BASEFONT:
          case TAG_ID.BGSOUND:
          case TAG_ID.LINK:
          case TAG_ID.META: {
              p._appendElement(token, NS.HTML);
              token.ackSelfClosing = true;
              break;
          }
          case TAG_ID.TITLE: {
              p._switchToTextParsing(token, TokenizerMode.RCDATA);
              break;
          }
          case TAG_ID.NOSCRIPT: {
              if (p.options.scriptingEnabled) {
                  p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
              }
              else {
                  p._insertElement(token, NS.HTML);
                  p.insertionMode = InsertionMode.IN_HEAD_NO_SCRIPT;
              }
              break;
          }
          case TAG_ID.NOFRAMES:
          case TAG_ID.STYLE: {
              p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
              break;
          }
          case TAG_ID.SCRIPT: {
              p._switchToTextParsing(token, TokenizerMode.SCRIPT_DATA);
              break;
          }
          case TAG_ID.TEMPLATE: {
              p._insertTemplate(token);
              p.activeFormattingElements.insertMarker();
              p.framesetOk = false;
              p.insertionMode = InsertionMode.IN_TEMPLATE;
              p.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
              break;
          }
          case TAG_ID.HEAD: {
              p._err(token, ERR.misplacedStartTagForHeadElement);
              break;
          }
          default: {
              tokenInHead(p, token);
          }
      }
  }
  function endTagInHead(p, token) {
      switch (token.tagID) {
          case TAG_ID.HEAD: {
              p.openElements.pop();
              p.insertionMode = InsertionMode.AFTER_HEAD;
              break;
          }
          case TAG_ID.BODY:
          case TAG_ID.BR:
          case TAG_ID.HTML: {
              tokenInHead(p, token);
              break;
          }
          case TAG_ID.TEMPLATE: {
              templateEndTagInHead(p, token);
              break;
          }
          default: {
              p._err(token, ERR.endTagWithoutMatchingOpenElement);
          }
      }
  }
  function templateEndTagInHead(p, token) {
      if (p.openElements.tmplCount > 0) {
          p.openElements.generateImpliedEndTagsThoroughly();
          if (p.openElements.currentTagId !== TAG_ID.TEMPLATE) {
              p._err(token, ERR.closingOfElementWithOpenChildElements);
          }
          p.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
          p.activeFormattingElements.clearToLastMarker();
          p.tmplInsertionModeStack.shift();
          p._resetInsertionMode();
      }
      else {
          p._err(token, ERR.endTagWithoutMatchingOpenElement);
      }
  }
  function tokenInHead(p, token) {
      p.openElements.pop();
      p.insertionMode = InsertionMode.AFTER_HEAD;
      p._processToken(token);
  }
  // The "in head no script" insertion mode
  //------------------------------------------------------------------
  function startTagInHeadNoScript(p, token) {
      switch (token.tagID) {
          case TAG_ID.HTML: {
              startTagInBody(p, token);
              break;
          }
          case TAG_ID.BASEFONT:
          case TAG_ID.BGSOUND:
          case TAG_ID.HEAD:
          case TAG_ID.LINK:
          case TAG_ID.META:
          case TAG_ID.NOFRAMES:
          case TAG_ID.STYLE: {
              startTagInHead(p, token);
              break;
          }
          case TAG_ID.NOSCRIPT: {
              p._err(token, ERR.nestedNoscriptInHead);
              break;
          }
          default: {
              tokenInHeadNoScript(p, token);
          }
      }
  }
  function endTagInHeadNoScript(p, token) {
      switch (token.tagID) {
          case TAG_ID.NOSCRIPT: {
              p.openElements.pop();
              p.insertionMode = InsertionMode.IN_HEAD;
              break;
          }
          case TAG_ID.BR: {
              tokenInHeadNoScript(p, token);
              break;
          }
          default: {
              p._err(token, ERR.endTagWithoutMatchingOpenElement);
          }
      }
  }
  function tokenInHeadNoScript(p, token) {
      const errCode = token.type === TokenType.EOF ? ERR.openElementsLeftAfterEof : ERR.disallowedContentInNoscriptInHead;
      p._err(token, errCode);
      p.openElements.pop();
      p.insertionMode = InsertionMode.IN_HEAD;
      p._processToken(token);
  }
  // The "after head" insertion mode
  //------------------------------------------------------------------
  function startTagAfterHead(p, token) {
      switch (token.tagID) {
          case TAG_ID.HTML: {
              startTagInBody(p, token);
              break;
          }
          case TAG_ID.BODY: {
              p._insertElement(token, NS.HTML);
              p.framesetOk = false;
              p.insertionMode = InsertionMode.IN_BODY;
              break;
          }
          case TAG_ID.FRAMESET: {
              p._insertElement(token, NS.HTML);
              p.insertionMode = InsertionMode.IN_FRAMESET;
              break;
          }
          case TAG_ID.BASE:
          case TAG_ID.BASEFONT:
          case TAG_ID.BGSOUND:
          case TAG_ID.LINK:
          case TAG_ID.META:
          case TAG_ID.NOFRAMES:
          case TAG_ID.SCRIPT:
          case TAG_ID.STYLE:
          case TAG_ID.TEMPLATE:
          case TAG_ID.TITLE: {
              p._err(token, ERR.abandonedHeadElementChild);
              p.openElements.push(p.headElement, TAG_ID.HEAD);
              startTagInHead(p, token);
              p.openElements.remove(p.headElement);
              break;
          }
          case TAG_ID.HEAD: {
              p._err(token, ERR.misplacedStartTagForHeadElement);
              break;
          }
          default: {
              tokenAfterHead(p, token);
          }
      }
  }
  function endTagAfterHead(p, token) {
      switch (token.tagID) {
          case TAG_ID.BODY:
          case TAG_ID.HTML:
          case TAG_ID.BR: {
              tokenAfterHead(p, token);
              break;
          }
          case TAG_ID.TEMPLATE: {
              templateEndTagInHead(p, token);
              break;
          }
          default: {
              p._err(token, ERR.endTagWithoutMatchingOpenElement);
          }
      }
  }
  function tokenAfterHead(p, token) {
      p._insertFakeElement(TAG_NAMES.BODY, TAG_ID.BODY);
      p.insertionMode = InsertionMode.IN_BODY;
      modeInBody(p, token);
  }
  // The "in body" insertion mode
  //------------------------------------------------------------------
  function modeInBody(p, token) {
      switch (token.type) {
          case TokenType.CHARACTER: {
              characterInBody(p, token);
              break;
          }
          case TokenType.WHITESPACE_CHARACTER: {
              whitespaceCharacterInBody(p, token);
              break;
          }
          case TokenType.COMMENT: {
              appendComment(p, token);
              break;
          }
          case TokenType.START_TAG: {
              startTagInBody(p, token);
              break;
          }
          case TokenType.END_TAG: {
              endTagInBody(p, token);
              break;
          }
          case TokenType.EOF: {
              eofInBody(p, token);
              break;
          }
          // Do nothing
      }
  }
  function whitespaceCharacterInBody(p, token) {
      p._reconstructActiveFormattingElements();
      p._insertCharacters(token);
  }
  function characterInBody(p, token) {
      p._reconstructActiveFormattingElements();
      p._insertCharacters(token);
      p.framesetOk = false;
  }
  function htmlStartTagInBody(p, token) {
      if (p.openElements.tmplCount === 0) {
          p.treeAdapter.adoptAttributes(p.openElements.items[0], token.attrs);
      }
  }
  function bodyStartTagInBody(p, token) {
      const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
      if (bodyElement && p.openElements.tmplCount === 0) {
          p.framesetOk = false;
          p.treeAdapter.adoptAttributes(bodyElement, token.attrs);
      }
  }
  function framesetStartTagInBody(p, token) {
      const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
      if (p.framesetOk && bodyElement) {
          p.treeAdapter.detachNode(bodyElement);
          p.openElements.popAllUpToHtmlElement();
          p._insertElement(token, NS.HTML);
          p.insertionMode = InsertionMode.IN_FRAMESET;
      }
  }
  function addressStartTagInBody(p, token) {
      if (p.openElements.hasInButtonScope(TAG_ID.P)) {
          p._closePElement();
      }
      p._insertElement(token, NS.HTML);
  }
  function numberedHeaderStartTagInBody(p, token) {
      if (p.openElements.hasInButtonScope(TAG_ID.P)) {
          p._closePElement();
      }
      if (p.openElements.currentTagId !== undefined && NUMBERED_HEADERS.has(p.openElements.currentTagId)) {
          p.openElements.pop();
      }
      p._insertElement(token, NS.HTML);
  }
  function preStartTagInBody(p, token) {
      if (p.openElements.hasInButtonScope(TAG_ID.P)) {
          p._closePElement();
      }
      p._insertElement(token, NS.HTML);
      //NOTE: If the next token is a U+000A LINE FEED (LF) character token, then ignore that token and move
      //on to the next one. (Newlines at the start of pre blocks are ignored as an authoring convenience.)
      p.skipNextNewLine = true;
      p.framesetOk = false;
  }
  function formStartTagInBody(p, token) {
      const inTemplate = p.openElements.tmplCount > 0;
      if (!p.formElement || inTemplate) {
          if (p.openElements.hasInButtonScope(TAG_ID.P)) {
              p._closePElement();
          }
          p._insertElement(token, NS.HTML);
          if (!inTemplate) {
              p.formElement = p.openElements.current;
          }
      }
  }
  function listItemStartTagInBody(p, token) {
      p.framesetOk = false;
      const tn = token.tagID;
      for (let i = p.openElements.stackTop; i >= 0; i--) {
          const elementId = p.openElements.tagIDs[i];
          if ((tn === TAG_ID.LI && elementId === TAG_ID.LI) ||
              ((tn === TAG_ID.DD || tn === TAG_ID.DT) && (elementId === TAG_ID.DD || elementId === TAG_ID.DT))) {
              p.openElements.generateImpliedEndTagsWithExclusion(elementId);
              p.openElements.popUntilTagNamePopped(elementId);
              break;
          }
          if (elementId !== TAG_ID.ADDRESS &&
              elementId !== TAG_ID.DIV &&
              elementId !== TAG_ID.P &&
              p._isSpecialElement(p.openElements.items[i], elementId)) {
              break;
          }
      }
      if (p.openElements.hasInButtonScope(TAG_ID.P)) {
          p._closePElement();
      }
      p._insertElement(token, NS.HTML);
  }
  function plaintextStartTagInBody(p, token) {
      if (p.openElements.hasInButtonScope(TAG_ID.P)) {
          p._closePElement();
      }
      p._insertElement(token, NS.HTML);
      p.tokenizer.state = TokenizerMode.PLAINTEXT;
  }
  function buttonStartTagInBody(p, token) {
      if (p.openElements.hasInScope(TAG_ID.BUTTON)) {
          p.openElements.generateImpliedEndTags();
          p.openElements.popUntilTagNamePopped(TAG_ID.BUTTON);
      }
      p._reconstructActiveFormattingElements();
      p._insertElement(token, NS.HTML);
      p.framesetOk = false;
  }
  function aStartTagInBody(p, token) {
      const activeElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(TAG_NAMES.A);
      if (activeElementEntry) {
          callAdoptionAgency(p, token);
          p.openElements.remove(activeElementEntry.element);
          p.activeFormattingElements.removeEntry(activeElementEntry);
      }
      p._reconstructActiveFormattingElements();
      p._insertElement(token, NS.HTML);
      p.activeFormattingElements.pushElement(p.openElements.current, token);
  }
  function bStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      p._insertElement(token, NS.HTML);
      p.activeFormattingElements.pushElement(p.openElements.current, token);
  }
  function nobrStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      if (p.openElements.hasInScope(TAG_ID.NOBR)) {
          callAdoptionAgency(p, token);
          p._reconstructActiveFormattingElements();
      }
      p._insertElement(token, NS.HTML);
      p.activeFormattingElements.pushElement(p.openElements.current, token);
  }
  function appletStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      p._insertElement(token, NS.HTML);
      p.activeFormattingElements.insertMarker();
      p.framesetOk = false;
  }
  function tableStartTagInBody(p, token) {
      if (p.treeAdapter.getDocumentMode(p.document) !== DOCUMENT_MODE.QUIRKS && p.openElements.hasInButtonScope(TAG_ID.P)) {
          p._closePElement();
      }
      p._insertElement(token, NS.HTML);
      p.framesetOk = false;
      p.insertionMode = InsertionMode.IN_TABLE;
  }
  function areaStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      p._appendElement(token, NS.HTML);
      p.framesetOk = false;
      token.ackSelfClosing = true;
  }
  function isHiddenInput(token) {
      const inputType = getTokenAttr(token, ATTRS.TYPE);
      return inputType != null && inputType.toLowerCase() === HIDDEN_INPUT_TYPE;
  }
  function inputStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      p._appendElement(token, NS.HTML);
      if (!isHiddenInput(token)) {
          p.framesetOk = false;
      }
      token.ackSelfClosing = true;
  }
  function paramStartTagInBody(p, token) {
      p._appendElement(token, NS.HTML);
      token.ackSelfClosing = true;
  }
  function hrStartTagInBody(p, token) {
      if (p.openElements.hasInButtonScope(TAG_ID.P)) {
          p._closePElement();
      }
      p._appendElement(token, NS.HTML);
      p.framesetOk = false;
      token.ackSelfClosing = true;
  }
  function imageStartTagInBody(p, token) {
      token.tagName = TAG_NAMES.IMG;
      token.tagID = TAG_ID.IMG;
      areaStartTagInBody(p, token);
  }
  function textareaStartTagInBody(p, token) {
      p._insertElement(token, NS.HTML);
      //NOTE: If the next token is a U+000A LINE FEED (LF) character token, then ignore that token and move
      //on to the next one. (Newlines at the start of textarea elements are ignored as an authoring convenience.)
      p.skipNextNewLine = true;
      p.tokenizer.state = TokenizerMode.RCDATA;
      p.originalInsertionMode = p.insertionMode;
      p.framesetOk = false;
      p.insertionMode = InsertionMode.TEXT;
  }
  function xmpStartTagInBody(p, token) {
      if (p.openElements.hasInButtonScope(TAG_ID.P)) {
          p._closePElement();
      }
      p._reconstructActiveFormattingElements();
      p.framesetOk = false;
      p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  }
  function iframeStartTagInBody(p, token) {
      p.framesetOk = false;
      p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  }
  //NOTE: here we assume that we always act as a user agent with enabled plugins/frames, so we parse
  //<noembed>/<noframes> as rawtext.
  function rawTextStartTagInBody(p, token) {
      p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  }
  function selectStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      p._insertElement(token, NS.HTML);
      p.framesetOk = false;
      p.insertionMode =
          p.insertionMode === InsertionMode.IN_TABLE ||
              p.insertionMode === InsertionMode.IN_CAPTION ||
              p.insertionMode === InsertionMode.IN_TABLE_BODY ||
              p.insertionMode === InsertionMode.IN_ROW ||
              p.insertionMode === InsertionMode.IN_CELL
              ? InsertionMode.IN_SELECT_IN_TABLE
              : InsertionMode.IN_SELECT;
  }
  function optgroupStartTagInBody(p, token) {
      if (p.openElements.currentTagId === TAG_ID.OPTION) {
          p.openElements.pop();
      }
      p._reconstructActiveFormattingElements();
      p._insertElement(token, NS.HTML);
  }
  function rbStartTagInBody(p, token) {
      if (p.openElements.hasInScope(TAG_ID.RUBY)) {
          p.openElements.generateImpliedEndTags();
      }
      p._insertElement(token, NS.HTML);
  }
  function rtStartTagInBody(p, token) {
      if (p.openElements.hasInScope(TAG_ID.RUBY)) {
          p.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.RTC);
      }
      p._insertElement(token, NS.HTML);
  }
  function mathStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      adjustTokenMathMLAttrs(token);
      adjustTokenXMLAttrs(token);
      if (token.selfClosing) {
          p._appendElement(token, NS.MATHML);
      }
      else {
          p._insertElement(token, NS.MATHML);
      }
      token.ackSelfClosing = true;
  }
  function svgStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      adjustTokenSVGAttrs(token);
      adjustTokenXMLAttrs(token);
      if (token.selfClosing) {
          p._appendElement(token, NS.SVG);
      }
      else {
          p._insertElement(token, NS.SVG);
      }
      token.ackSelfClosing = true;
  }
  function genericStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      p._insertElement(token, NS.HTML);
  }
  function startTagInBody(p, token) {
      switch (token.tagID) {
          case TAG_ID.I:
          case TAG_ID.S:
          case TAG_ID.B:
          case TAG_ID.U:
          case TAG_ID.EM:
          case TAG_ID.TT:
          case TAG_ID.BIG:
          case TAG_ID.CODE:
          case TAG_ID.FONT:
          case TAG_ID.SMALL:
          case TAG_ID.STRIKE:
          case TAG_ID.STRONG: {
              bStartTagInBody(p, token);
              break;
          }
          case TAG_ID.A: {
              aStartTagInBody(p, token);
              break;
          }
          case TAG_ID.H1:
          case TAG_ID.H2:
          case TAG_ID.H3:
          case TAG_ID.H4:
          case TAG_ID.H5:
          case TAG_ID.H6: {
              numberedHeaderStartTagInBody(p, token);
              break;
          }
          case TAG_ID.P:
          case TAG_ID.DL:
          case TAG_ID.OL:
          case TAG_ID.UL:
          case TAG_ID.DIV:
          case TAG_ID.DIR:
          case TAG_ID.NAV:
          case TAG_ID.MAIN:
          case TAG_ID.MENU:
          case TAG_ID.ASIDE:
          case TAG_ID.CENTER:
          case TAG_ID.FIGURE:
          case TAG_ID.FOOTER:
          case TAG_ID.HEADER:
          case TAG_ID.HGROUP:
          case TAG_ID.DIALOG:
          case TAG_ID.DETAILS:
          case TAG_ID.ADDRESS:
          case TAG_ID.ARTICLE:
          case TAG_ID.SEARCH:
          case TAG_ID.SECTION:
          case TAG_ID.SUMMARY:
          case TAG_ID.FIELDSET:
          case TAG_ID.BLOCKQUOTE:
          case TAG_ID.FIGCAPTION: {
              addressStartTagInBody(p, token);
              break;
          }
          case TAG_ID.LI:
          case TAG_ID.DD:
          case TAG_ID.DT: {
              listItemStartTagInBody(p, token);
              break;
          }
          case TAG_ID.BR:
          case TAG_ID.IMG:
          case TAG_ID.WBR:
          case TAG_ID.AREA:
          case TAG_ID.EMBED:
          case TAG_ID.KEYGEN: {
              areaStartTagInBody(p, token);
              break;
          }
          case TAG_ID.HR: {
              hrStartTagInBody(p, token);
              break;
          }
          case TAG_ID.RB:
          case TAG_ID.RTC: {
              rbStartTagInBody(p, token);
              break;
          }
          case TAG_ID.RT:
          case TAG_ID.RP: {
              rtStartTagInBody(p, token);
              break;
          }
          case TAG_ID.PRE:
          case TAG_ID.LISTING: {
              preStartTagInBody(p, token);
              break;
          }
          case TAG_ID.XMP: {
              xmpStartTagInBody(p, token);
              break;
          }
          case TAG_ID.SVG: {
              svgStartTagInBody(p, token);
              break;
          }
          case TAG_ID.HTML: {
              htmlStartTagInBody(p, token);
              break;
          }
          case TAG_ID.BASE:
          case TAG_ID.LINK:
          case TAG_ID.META:
          case TAG_ID.STYLE:
          case TAG_ID.TITLE:
          case TAG_ID.SCRIPT:
          case TAG_ID.BGSOUND:
          case TAG_ID.BASEFONT:
          case TAG_ID.TEMPLATE: {
              startTagInHead(p, token);
              break;
          }
          case TAG_ID.BODY: {
              bodyStartTagInBody(p, token);
              break;
          }
          case TAG_ID.FORM: {
              formStartTagInBody(p, token);
              break;
          }
          case TAG_ID.NOBR: {
              nobrStartTagInBody(p, token);
              break;
          }
          case TAG_ID.MATH: {
              mathStartTagInBody(p, token);
              break;
          }
          case TAG_ID.TABLE: {
              tableStartTagInBody(p, token);
              break;
          }
          case TAG_ID.INPUT: {
              inputStartTagInBody(p, token);
              break;
          }
          case TAG_ID.PARAM:
          case TAG_ID.TRACK:
          case TAG_ID.SOURCE: {
              paramStartTagInBody(p, token);
              break;
          }
          case TAG_ID.IMAGE: {
              imageStartTagInBody(p, token);
              break;
          }
          case TAG_ID.BUTTON: {
              buttonStartTagInBody(p, token);
              break;
          }
          case TAG_ID.APPLET:
          case TAG_ID.OBJECT:
          case TAG_ID.MARQUEE: {
              appletStartTagInBody(p, token);
              break;
          }
          case TAG_ID.IFRAME: {
              iframeStartTagInBody(p, token);
              break;
          }
          case TAG_ID.SELECT: {
              selectStartTagInBody(p, token);
              break;
          }
          case TAG_ID.OPTION:
          case TAG_ID.OPTGROUP: {
              optgroupStartTagInBody(p, token);
              break;
          }
          case TAG_ID.NOEMBED:
          case TAG_ID.NOFRAMES: {
              rawTextStartTagInBody(p, token);
              break;
          }
          case TAG_ID.FRAMESET: {
              framesetStartTagInBody(p, token);
              break;
          }
          case TAG_ID.TEXTAREA: {
              textareaStartTagInBody(p, token);
              break;
          }
          case TAG_ID.NOSCRIPT: {
              if (p.options.scriptingEnabled) {
                  rawTextStartTagInBody(p, token);
              }
              else {
                  genericStartTagInBody(p, token);
              }
              break;
          }
          case TAG_ID.PLAINTEXT: {
              plaintextStartTagInBody(p, token);
              break;
          }
          case TAG_ID.COL:
          case TAG_ID.TH:
          case TAG_ID.TD:
          case TAG_ID.TR:
          case TAG_ID.HEAD:
          case TAG_ID.FRAME:
          case TAG_ID.TBODY:
          case TAG_ID.TFOOT:
          case TAG_ID.THEAD:
          case TAG_ID.CAPTION:
          case TAG_ID.COLGROUP: {
              // Ignore token
              break;
          }
          default: {
              genericStartTagInBody(p, token);
          }
      }
  }
  function bodyEndTagInBody(p, token) {
      if (p.openElements.hasInScope(TAG_ID.BODY)) {
          p.insertionMode = InsertionMode.AFTER_BODY;
          //NOTE: <body> is never popped from the stack, so we need to updated
          //the end location explicitly.
          if (p.options.sourceCodeLocationInfo) {
              const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
              if (bodyElement) {
                  p._setEndLocation(bodyElement, token);
              }
          }
      }
  }
  function htmlEndTagInBody(p, token) {
      if (p.openElements.hasInScope(TAG_ID.BODY)) {
          p.insertionMode = InsertionMode.AFTER_BODY;
          endTagAfterBody(p, token);
      }
  }
  function addressEndTagInBody(p, token) {
      const tn = token.tagID;
      if (p.openElements.hasInScope(tn)) {
          p.openElements.generateImpliedEndTags();
          p.openElements.popUntilTagNamePopped(tn);
      }
  }
  function formEndTagInBody(p) {
      const inTemplate = p.openElements.tmplCount > 0;
      const { formElement } = p;
      if (!inTemplate) {
          p.formElement = null;
      }
      if ((formElement || inTemplate) && p.openElements.hasInScope(TAG_ID.FORM)) {
          p.openElements.generateImpliedEndTags();
          if (inTemplate) {
              p.openElements.popUntilTagNamePopped(TAG_ID.FORM);
          }
          else if (formElement) {
              p.openElements.remove(formElement);
          }
      }
  }
  function pEndTagInBody(p) {
      if (!p.openElements.hasInButtonScope(TAG_ID.P)) {
          p._insertFakeElement(TAG_NAMES.P, TAG_ID.P);
      }
      p._closePElement();
  }
  function liEndTagInBody(p) {
      if (p.openElements.hasInListItemScope(TAG_ID.LI)) {
          p.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.LI);
          p.openElements.popUntilTagNamePopped(TAG_ID.LI);
      }
  }
  function ddEndTagInBody(p, token) {
      const tn = token.tagID;
      if (p.openElements.hasInScope(tn)) {
          p.openElements.generateImpliedEndTagsWithExclusion(tn);
          p.openElements.popUntilTagNamePopped(tn);
      }
  }
  function numberedHeaderEndTagInBody(p) {
      if (p.openElements.hasNumberedHeaderInScope()) {
          p.openElements.generateImpliedEndTags();
          p.openElements.popUntilNumberedHeaderPopped();
      }
  }
  function appletEndTagInBody(p, token) {
      const tn = token.tagID;
      if (p.openElements.hasInScope(tn)) {
          p.openElements.generateImpliedEndTags();
          p.openElements.popUntilTagNamePopped(tn);
          p.activeFormattingElements.clearToLastMarker();
      }
  }
  function brEndTagInBody(p) {
      p._reconstructActiveFormattingElements();
      p._insertFakeElement(TAG_NAMES.BR, TAG_ID.BR);
      p.openElements.pop();
      p.framesetOk = false;
  }
  function genericEndTagInBody(p, token) {
      const tn = token.tagName;
      const tid = token.tagID;
      for (let i = p.openElements.stackTop; i > 0; i--) {
          const element = p.openElements.items[i];
          const elementId = p.openElements.tagIDs[i];
          // Compare the tag name here, as the tag might not be a known tag with an ID.
          // Only HTML elements match; a foreign element falls through to the special-element check.
          if (tid === elementId &&
              p.treeAdapter.getNamespaceURI(element) === NS.HTML &&
              (tid !== TAG_ID.UNKNOWN || p.treeAdapter.getTagName(element) === tn)) {
              p.openElements.generateImpliedEndTagsWithExclusion(tid);
              if (p.openElements.stackTop >= i)
                  p.openElements.shortenToLength(i);
              break;
          }
          if (p._isSpecialElement(element, elementId)) {
              break;
          }
      }
  }
  function endTagInBody(p, token) {
      switch (token.tagID) {
          case TAG_ID.A:
          case TAG_ID.B:
          case TAG_ID.I:
          case TAG_ID.S:
          case TAG_ID.U:
          case TAG_ID.EM:
          case TAG_ID.TT:
          case TAG_ID.BIG:
          case TAG_ID.CODE:
          case TAG_ID.FONT:
          case TAG_ID.NOBR:
          case TAG_ID.SMALL:
          case TAG_ID.STRIKE:
          case TAG_ID.STRONG: {
              callAdoptionAgency(p, token);
              break;
          }
          case TAG_ID.P: {
              pEndTagInBody(p);
              break;
          }
          case TAG_ID.DL:
          case TAG_ID.UL:
          case TAG_ID.OL:
          case TAG_ID.DIR:
          case TAG_ID.DIV:
          case TAG_ID.NAV:
          case TAG_ID.PRE:
          case TAG_ID.MAIN:
          case TAG_ID.MENU:
          case TAG_ID.ASIDE:
          case TAG_ID.BUTTON:
          case TAG_ID.CENTER:
          case TAG_ID.FIGURE:
          case TAG_ID.FOOTER:
          case TAG_ID.HEADER:
          case TAG_ID.HGROUP:
          case TAG_ID.DIALOG:
          case TAG_ID.ADDRESS:
          case TAG_ID.ARTICLE:
          case TAG_ID.DETAILS:
          case TAG_ID.SEARCH:
          case TAG_ID.SECTION:
          case TAG_ID.SUMMARY:
          case TAG_ID.LISTING:
          case TAG_ID.FIELDSET:
          case TAG_ID.BLOCKQUOTE:
          case TAG_ID.FIGCAPTION: {
              addressEndTagInBody(p, token);
              break;
          }
          case TAG_ID.LI: {
              liEndTagInBody(p);
              break;
          }
          case TAG_ID.DD:
          case TAG_ID.DT: {
              ddEndTagInBody(p, token);
              break;
          }
          case TAG_ID.H1:
          case TAG_ID.H2:
          case TAG_ID.H3:
          case TAG_ID.H4:
          case TAG_ID.H5:
          case TAG_ID.H6: {
              numberedHeaderEndTagInBody(p);
              break;
          }
          case TAG_ID.BR: {
              brEndTagInBody(p);
              break;
          }
          case TAG_ID.BODY: {
              bodyEndTagInBody(p, token);
              break;
          }
          case TAG_ID.HTML: {
              htmlEndTagInBody(p, token);
              break;
          }
          case TAG_ID.FORM: {
              formEndTagInBody(p);
              break;
          }
          case TAG_ID.APPLET:
          case TAG_ID.OBJECT:
          case TAG_ID.MARQUEE: {
              appletEndTagInBody(p, token);
              break;
          }
          case TAG_ID.TEMPLATE: {
              templateEndTagInHead(p, token);
              break;
          }
          default: {
              genericEndTagInBody(p, token);
          }
      }
  }
  function eofInBody(p, token) {
      if (p.tmplInsertionModeStack.length > 0) {
          eofInTemplate(p, token);
      }
      else {
          stopParsing(p, token);
      }
  }
  // The "text" insertion mode
  //------------------------------------------------------------------
  function endTagInText(p, token) {
      var _a;
      if (token.tagID === TAG_ID.SCRIPT) {
          (_a = p.scriptHandler) === null || _a === void 0 ? void 0 : _a.call(p, p.openElements.current);
      }
      p.openElements.pop();
      p.insertionMode = p.originalInsertionMode;
  }
  function eofInText(p, token) {
      p._err(token, ERR.eofInElementThatCanContainOnlyText);
      p.openElements.pop();
      p.insertionMode = p.originalInsertionMode;
      p.onEof(token);
  }
  // The "in table" insertion mode
  //------------------------------------------------------------------
  function characterInTable(p, token) {
      if (p.openElements.currentTagId !== undefined && TABLE_STRUCTURE_TAGS.has(p.openElements.currentTagId)) {
          p.pendingCharacterTokens.length = 0;
          p.hasNonWhitespacePendingCharacterToken = false;
          p.originalInsertionMode = p.insertionMode;
          p.insertionMode = InsertionMode.IN_TABLE_TEXT;
          switch (token.type) {
              case TokenType.CHARACTER: {
                  characterInTableText(p, token);
                  break;
              }
              case TokenType.WHITESPACE_CHARACTER: {
                  whitespaceCharacterInTableText(p, token);
                  break;
              }
              // Ignore null
          }
      }
      else {
          tokenInTable(p, token);
      }
  }
  function captionStartTagInTable(p, token) {
      p.openElements.clearBackToTableContext();
      p.activeFormattingElements.insertMarker();
      p._insertElement(token, NS.HTML);
      p.insertionMode = InsertionMode.IN_CAPTION;
  }
  function colgroupStartTagInTable(p, token) {
      p.openElements.clearBackToTableContext();
      p._insertElement(token, NS.HTML);
      p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
  }
  function colStartTagInTable(p, token) {
      p.openElements.clearBackToTableContext();
      p._insertFakeElement(TAG_NAMES.COLGROUP, TAG_ID.COLGROUP);
      p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
      startTagInColumnGroup(p, token);
  }
  function tbodyStartTagInTable(p, token) {
      p.openElements.clearBackToTableContext();
      p._insertElement(token, NS.HTML);
      p.insertionMode = InsertionMode.IN_TABLE_BODY;
  }
  function tdStartTagInTable(p, token) {
      p.openElements.clearBackToTableContext();
      p._insertFakeElement(TAG_NAMES.TBODY, TAG_ID.TBODY);
      p.insertionMode = InsertionMode.IN_TABLE_BODY;
      startTagInTableBody(p, token);
  }
  function tableStartTagInTable(p, token) {
      if (p.openElements.hasInTableScope(TAG_ID.TABLE)) {
          p.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
          p._resetInsertionMode();
          p._processStartTag(token);
      }
  }
  function inputStartTagInTable(p, token) {
      if (isHiddenInput(token)) {
          p._appendElement(token, NS.HTML);
      }
      else {
          tokenInTable(p, token);
      }
      token.ackSelfClosing = true;
  }
  function formStartTagInTable(p, token) {
      if (!p.formElement && p.openElements.tmplCount === 0) {
          p._insertElement(token, NS.HTML);
          p.formElement = p.openElements.current;
          p.openElements.pop();
      }
  }
  function startTagInTable(p, token) {
      switch (token.tagID) {
          case TAG_ID.TD:
          case TAG_ID.TH:
          case TAG_ID.TR: {
              tdStartTagInTable(p, token);
              break;
          }
          case TAG_ID.STYLE:
          case TAG_ID.SCRIPT:
          case TAG_ID.TEMPLATE: {
              startTagInHead(p, token);
              break;
          }
          case TAG_ID.COL: {
              colStartTagInTable(p, token);
              break;
          }
          case TAG_ID.FORM: {
              formStartTagInTable(p, token);
              break;
          }
          case TAG_ID.TABLE: {
              tableStartTagInTable(p, token);
              break;
          }
          case TAG_ID.TBODY:
          case TAG_ID.TFOOT:
          case TAG_ID.THEAD: {
              tbodyStartTagInTable(p, token);
              break;
          }
          case TAG_ID.INPUT: {
              inputStartTagInTable(p, token);
              break;
          }
          case TAG_ID.CAPTION: {
              captionStartTagInTable(p, token);
              break;
          }
          case TAG_ID.COLGROUP: {
              colgroupStartTagInTable(p, token);
              break;
          }
          default: {
              tokenInTable(p, token);
          }
      }
  }
  function endTagInTable(p, token) {
      switch (token.tagID) {
          case TAG_ID.TABLE: {
              if (p.openElements.hasInTableScope(TAG_ID.TABLE)) {
                  p.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
                  p._resetInsertionMode();
              }
              break;
          }
          case TAG_ID.TEMPLATE: {
              templateEndTagInHead(p, token);
              break;
          }
          case TAG_ID.BODY:
          case TAG_ID.CAPTION:
          case TAG_ID.COL:
          case TAG_ID.COLGROUP:
          case TAG_ID.HTML:
          case TAG_ID.TBODY:
          case TAG_ID.TD:
          case TAG_ID.TFOOT:
          case TAG_ID.TH:
          case TAG_ID.THEAD:
          case TAG_ID.TR: {
              // Ignore token
              break;
          }
          default: {
              tokenInTable(p, token);
          }
      }
  }
  function tokenInTable(p, token) {
      const savedFosterParentingState = p.fosterParentingEnabled;
      p.fosterParentingEnabled = true;
      // Process token in `In Body` mode
      modeInBody(p, token);
      p.fosterParentingEnabled = savedFosterParentingState;
  }
  // The "in table text" insertion mode
  //------------------------------------------------------------------
  function whitespaceCharacterInTableText(p, token) {
      p.pendingCharacterTokens.push(token);
  }
  function characterInTableText(p, token) {
      p.pendingCharacterTokens.push(token);
      p.hasNonWhitespacePendingCharacterToken = true;
  }
  function tokenInTableText(p, token) {
      let i = 0;
      if (p.hasNonWhitespacePendingCharacterToken) {
          for (; i < p.pendingCharacterTokens.length; i++) {
              tokenInTable(p, p.pendingCharacterTokens[i]);
          }
      }
      else {
          for (; i < p.pendingCharacterTokens.length; i++) {
              p._insertCharacters(p.pendingCharacterTokens[i]);
          }
      }
      p.insertionMode = p.originalInsertionMode;
      p._processToken(token);
  }
  // The "in caption" insertion mode
  //------------------------------------------------------------------
  const TABLE_VOID_ELEMENTS = new Set([TAG_ID.CAPTION, TAG_ID.COL, TAG_ID.COLGROUP, TAG_ID.TBODY, TAG_ID.TD, TAG_ID.TFOOT, TAG_ID.TH, TAG_ID.THEAD, TAG_ID.TR]);
  function startTagInCaption(p, token) {
      const tn = token.tagID;
      if (TABLE_VOID_ELEMENTS.has(tn)) {
          if (p.openElements.hasInTableScope(TAG_ID.CAPTION)) {
              p.openElements.generateImpliedEndTags();
              p.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
              p.activeFormattingElements.clearToLastMarker();
              p.insertionMode = InsertionMode.IN_TABLE;
              startTagInTable(p, token);
          }
      }
      else {
          startTagInBody(p, token);
      }
  }
  function endTagInCaption(p, token) {
      const tn = token.tagID;
      switch (tn) {
          case TAG_ID.CAPTION:
          case TAG_ID.TABLE: {
              if (p.openElements.hasInTableScope(TAG_ID.CAPTION)) {
                  p.openElements.generateImpliedEndTags();
                  p.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
                  p.activeFormattingElements.clearToLastMarker();
                  p.insertionMode = InsertionMode.IN_TABLE;
                  if (tn === TAG_ID.TABLE) {
                      endTagInTable(p, token);
                  }
              }
              break;
          }
          case TAG_ID.BODY:
          case TAG_ID.COL:
          case TAG_ID.COLGROUP:
          case TAG_ID.HTML:
          case TAG_ID.TBODY:
          case TAG_ID.TD:
          case TAG_ID.TFOOT:
          case TAG_ID.TH:
          case TAG_ID.THEAD:
          case TAG_ID.TR: {
              // Ignore token
              break;
          }
          default: {
              endTagInBody(p, token);
          }
      }
  }
  // The "in column group" insertion mode
  //------------------------------------------------------------------
  function startTagInColumnGroup(p, token) {
      switch (token.tagID) {
          case TAG_ID.HTML: {
              startTagInBody(p, token);
              break;
          }
          case TAG_ID.COL: {
              p._appendElement(token, NS.HTML);
              token.ackSelfClosing = true;
              break;
          }
          case TAG_ID.TEMPLATE: {
              startTagInHead(p, token);
              break;
          }
          default: {
              tokenInColumnGroup(p, token);
          }
      }
  }
  function endTagInColumnGroup(p, token) {
      switch (token.tagID) {
          case TAG_ID.COLGROUP: {
              if (p.openElements.currentTagId === TAG_ID.COLGROUP) {
                  p.openElements.pop();
                  p.insertionMode = InsertionMode.IN_TABLE;
              }
              break;
          }
          case TAG_ID.TEMPLATE: {
              templateEndTagInHead(p, token);
              break;
          }
          case TAG_ID.COL: {
              // Ignore token
              break;
          }
          default: {
              tokenInColumnGroup(p, token);
          }
      }
  }
  function tokenInColumnGroup(p, token) {
      if (p.openElements.currentTagId === TAG_ID.COLGROUP) {
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE;
          p._processToken(token);
      }
  }
  // The "in table body" insertion mode
  //------------------------------------------------------------------
  function startTagInTableBody(p, token) {
      switch (token.tagID) {
          case TAG_ID.TR: {
              p.openElements.clearBackToTableBodyContext();
              p._insertElement(token, NS.HTML);
              p.insertionMode = InsertionMode.IN_ROW;
              break;
          }
          case TAG_ID.TH:
          case TAG_ID.TD: {
              p.openElements.clearBackToTableBodyContext();
              p._insertFakeElement(TAG_NAMES.TR, TAG_ID.TR);
              p.insertionMode = InsertionMode.IN_ROW;
              startTagInRow(p, token);
              break;
          }
          case TAG_ID.CAPTION:
          case TAG_ID.COL:
          case TAG_ID.COLGROUP:
          case TAG_ID.TBODY:
          case TAG_ID.TFOOT:
          case TAG_ID.THEAD: {
              if (p.openElements.hasTableBodyContextInTableScope()) {
                  p.openElements.clearBackToTableBodyContext();
                  p.openElements.pop();
                  p.insertionMode = InsertionMode.IN_TABLE;
                  startTagInTable(p, token);
              }
              break;
          }
          default: {
              startTagInTable(p, token);
          }
      }
  }
  function endTagInTableBody(p, token) {
      const tn = token.tagID;
      switch (token.tagID) {
          case TAG_ID.TBODY:
          case TAG_ID.TFOOT:
          case TAG_ID.THEAD: {
              if (p.openElements.hasInTableScope(tn)) {
                  p.openElements.clearBackToTableBodyContext();
                  p.openElements.pop();
                  p.insertionMode = InsertionMode.IN_TABLE;
              }
              break;
          }
          case TAG_ID.TABLE: {
              if (p.openElements.hasTableBodyContextInTableScope()) {
                  p.openElements.clearBackToTableBodyContext();
                  p.openElements.pop();
                  p.insertionMode = InsertionMode.IN_TABLE;
                  endTagInTable(p, token);
              }
              break;
          }
          case TAG_ID.BODY:
          case TAG_ID.CAPTION:
          case TAG_ID.COL:
          case TAG_ID.COLGROUP:
          case TAG_ID.HTML:
          case TAG_ID.TD:
          case TAG_ID.TH:
          case TAG_ID.TR: {
              // Ignore token
              break;
          }
          default: {
              endTagInTable(p, token);
          }
      }
  }
  // The "in row" insertion mode
  //------------------------------------------------------------------
  function startTagInRow(p, token) {
      switch (token.tagID) {
          case TAG_ID.TH:
          case TAG_ID.TD: {
              p.openElements.clearBackToTableRowContext();
              p._insertElement(token, NS.HTML);
              p.insertionMode = InsertionMode.IN_CELL;
              p.activeFormattingElements.insertMarker();
              break;
          }
          case TAG_ID.CAPTION:
          case TAG_ID.COL:
          case TAG_ID.COLGROUP:
          case TAG_ID.TBODY:
          case TAG_ID.TFOOT:
          case TAG_ID.THEAD:
          case TAG_ID.TR: {
              if (p.openElements.hasInTableScope(TAG_ID.TR)) {
                  p.openElements.clearBackToTableRowContext();
                  p.openElements.pop();
                  p.insertionMode = InsertionMode.IN_TABLE_BODY;
                  startTagInTableBody(p, token);
              }
              break;
          }
          default: {
              startTagInTable(p, token);
          }
      }
  }
  function endTagInRow(p, token) {
      switch (token.tagID) {
          case TAG_ID.TR: {
              if (p.openElements.hasInTableScope(TAG_ID.TR)) {
                  p.openElements.clearBackToTableRowContext();
                  p.openElements.pop();
                  p.insertionMode = InsertionMode.IN_TABLE_BODY;
              }
              break;
          }
          case TAG_ID.TABLE: {
              if (p.openElements.hasInTableScope(TAG_ID.TR)) {
                  p.openElements.clearBackToTableRowContext();
                  p.openElements.pop();
                  p.insertionMode = InsertionMode.IN_TABLE_BODY;
                  endTagInTableBody(p, token);
              }
              break;
          }
          case TAG_ID.TBODY:
          case TAG_ID.TFOOT:
          case TAG_ID.THEAD: {
              if (p.openElements.hasInTableScope(token.tagID) || p.openElements.hasInTableScope(TAG_ID.TR)) {
                  p.openElements.clearBackToTableRowContext();
                  p.openElements.pop();
                  p.insertionMode = InsertionMode.IN_TABLE_BODY;
                  endTagInTableBody(p, token);
              }
              break;
          }
          case TAG_ID.BODY:
          case TAG_ID.CAPTION:
          case TAG_ID.COL:
          case TAG_ID.COLGROUP:
          case TAG_ID.HTML:
          case TAG_ID.TD:
          case TAG_ID.TH: {
              // Ignore end tag
              break;
          }
          default: {
              endTagInTable(p, token);
          }
      }
  }
  // The "in cell" insertion mode
  //------------------------------------------------------------------
  function startTagInCell(p, token) {
      const tn = token.tagID;
      if (TABLE_VOID_ELEMENTS.has(tn)) {
          if (p.openElements.hasInTableScope(TAG_ID.TD) || p.openElements.hasInTableScope(TAG_ID.TH)) {
              p._closeTableCell();
              startTagInRow(p, token);
          }
      }
      else {
          startTagInBody(p, token);
      }
  }
  function endTagInCell(p, token) {
      const tn = token.tagID;
      switch (tn) {
          case TAG_ID.TD:
          case TAG_ID.TH: {
              if (p.openElements.hasInTableScope(tn)) {
                  p.openElements.generateImpliedEndTags();
                  p.openElements.popUntilTagNamePopped(tn);
                  p.activeFormattingElements.clearToLastMarker();
                  p.insertionMode = InsertionMode.IN_ROW;
              }
              break;
          }
          case TAG_ID.TABLE:
          case TAG_ID.TBODY:
          case TAG_ID.TFOOT:
          case TAG_ID.THEAD:
          case TAG_ID.TR: {
              if (p.openElements.hasInTableScope(tn)) {
                  p._closeTableCell();
                  endTagInRow(p, token);
              }
              break;
          }
          case TAG_ID.BODY:
          case TAG_ID.CAPTION:
          case TAG_ID.COL:
          case TAG_ID.COLGROUP:
          case TAG_ID.HTML: {
              // Ignore token
              break;
          }
          default: {
              endTagInBody(p, token);
          }
      }
  }
  // The "in select" insertion mode
  //------------------------------------------------------------------
  function startTagInSelect(p, token) {
      switch (token.tagID) {
          case TAG_ID.HTML: {
              startTagInBody(p, token);
              break;
          }
          case TAG_ID.OPTION: {
              if (p.openElements.currentTagId === TAG_ID.OPTION) {
                  p.openElements.pop();
              }
              p._insertElement(token, NS.HTML);
              break;
          }
          case TAG_ID.OPTGROUP: {
              if (p.openElements.currentTagId === TAG_ID.OPTION) {
                  p.openElements.pop();
              }
              if (p.openElements.currentTagId === TAG_ID.OPTGROUP) {
                  p.openElements.pop();
              }
              p._insertElement(token, NS.HTML);
              break;
          }
          case TAG_ID.HR: {
              if (p.openElements.currentTagId === TAG_ID.OPTION) {
                  p.openElements.pop();
              }
              if (p.openElements.currentTagId === TAG_ID.OPTGROUP) {
                  p.openElements.pop();
              }
              p._appendElement(token, NS.HTML);
              token.ackSelfClosing = true;
              break;
          }
          case TAG_ID.INPUT:
          case TAG_ID.KEYGEN:
          case TAG_ID.TEXTAREA:
          case TAG_ID.SELECT: {
              if (p.openElements.hasInSelectScope(TAG_ID.SELECT)) {
                  p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
                  p._resetInsertionMode();
                  if (token.tagID !== TAG_ID.SELECT) {
                      p._processStartTag(token);
                  }
              }
              break;
          }
          case TAG_ID.SCRIPT:
          case TAG_ID.TEMPLATE: {
              startTagInHead(p, token);
              break;
          }
          // Do nothing
      }
  }
  function endTagInSelect(p, token) {
      switch (token.tagID) {
          case TAG_ID.OPTGROUP: {
              if (p.openElements.stackTop > 0 &&
                  p.openElements.currentTagId === TAG_ID.OPTION &&
                  p.openElements.tagIDs[p.openElements.stackTop - 1] === TAG_ID.OPTGROUP) {
                  p.openElements.pop();
              }
              if (p.openElements.currentTagId === TAG_ID.OPTGROUP) {
                  p.openElements.pop();
              }
              break;
          }
          case TAG_ID.OPTION: {
              if (p.openElements.currentTagId === TAG_ID.OPTION) {
                  p.openElements.pop();
              }
              break;
          }
          case TAG_ID.SELECT: {
              if (p.openElements.hasInSelectScope(TAG_ID.SELECT)) {
                  p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
                  p._resetInsertionMode();
              }
              break;
          }
          case TAG_ID.TEMPLATE: {
              templateEndTagInHead(p, token);
              break;
          }
          // Do nothing
      }
  }
  // The "in select in table" insertion mode
  //------------------------------------------------------------------
  function startTagInSelectInTable(p, token) {
      const tn = token.tagID;
      if (tn === TAG_ID.CAPTION ||
          tn === TAG_ID.TABLE ||
          tn === TAG_ID.TBODY ||
          tn === TAG_ID.TFOOT ||
          tn === TAG_ID.THEAD ||
          tn === TAG_ID.TR ||
          tn === TAG_ID.TD ||
          tn === TAG_ID.TH) {
          p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
          p._resetInsertionMode();
          p._processStartTag(token);
      }
      else {
          startTagInSelect(p, token);
      }
  }
  function endTagInSelectInTable(p, token) {
      const tn = token.tagID;
      if (tn === TAG_ID.CAPTION ||
          tn === TAG_ID.TABLE ||
          tn === TAG_ID.TBODY ||
          tn === TAG_ID.TFOOT ||
          tn === TAG_ID.THEAD ||
          tn === TAG_ID.TR ||
          tn === TAG_ID.TD ||
          tn === TAG_ID.TH) {
          if (p.openElements.hasInTableScope(tn)) {
              p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
              p._resetInsertionMode();
              p.onEndTag(token);
          }
      }
      else {
          endTagInSelect(p, token);
      }
  }
  // The "in template" insertion mode
  //------------------------------------------------------------------
  function startTagInTemplate(p, token) {
      switch (token.tagID) {
          // First, handle tags that can start without a mode change
          case TAG_ID.BASE:
          case TAG_ID.BASEFONT:
          case TAG_ID.BGSOUND:
          case TAG_ID.LINK:
          case TAG_ID.META:
          case TAG_ID.NOFRAMES:
          case TAG_ID.SCRIPT:
          case TAG_ID.STYLE:
          case TAG_ID.TEMPLATE:
          case TAG_ID.TITLE: {
              startTagInHead(p, token);
              break;
          }
          // Re-process the token in the appropriate mode
          case TAG_ID.CAPTION:
          case TAG_ID.COLGROUP:
          case TAG_ID.TBODY:
          case TAG_ID.TFOOT:
          case TAG_ID.THEAD: {
              p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE;
              p.insertionMode = InsertionMode.IN_TABLE;
              startTagInTable(p, token);
              break;
          }
          case TAG_ID.COL: {
              p.tmplInsertionModeStack[0] = InsertionMode.IN_COLUMN_GROUP;
              p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
              startTagInColumnGroup(p, token);
              break;
          }
          case TAG_ID.TR: {
              p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE_BODY;
              p.insertionMode = InsertionMode.IN_TABLE_BODY;
              startTagInTableBody(p, token);
              break;
          }
          case TAG_ID.TD:
          case TAG_ID.TH: {
              p.tmplInsertionModeStack[0] = InsertionMode.IN_ROW;
              p.insertionMode = InsertionMode.IN_ROW;
              startTagInRow(p, token);
              break;
          }
          default: {
              p.tmplInsertionModeStack[0] = InsertionMode.IN_BODY;
              p.insertionMode = InsertionMode.IN_BODY;
              startTagInBody(p, token);
          }
      }
  }
  function endTagInTemplate(p, token) {
      if (token.tagID === TAG_ID.TEMPLATE) {
          templateEndTagInHead(p, token);
      }
  }
  function eofInTemplate(p, token) {
      if (p.openElements.tmplCount > 0) {
          p.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
          p.activeFormattingElements.clearToLastMarker();
          p.tmplInsertionModeStack.shift();
          p._resetInsertionMode();
          p.onEof(token);
      }
      else {
          stopParsing(p, token);
      }
  }
  // The "after body" insertion mode
  //------------------------------------------------------------------
  function startTagAfterBody(p, token) {
      if (token.tagID === TAG_ID.HTML) {
          startTagInBody(p, token);
      }
      else {
          tokenAfterBody(p, token);
      }
  }
  function endTagAfterBody(p, token) {
      var _a;
      if (token.tagID === TAG_ID.HTML) {
          if (!p.fragmentContext) {
              p.insertionMode = InsertionMode.AFTER_AFTER_BODY;
          }
          //NOTE: <html> is never popped from the stack, so we need to updated
          //the end location explicitly.
          if (p.options.sourceCodeLocationInfo && p.openElements.tagIDs[0] === TAG_ID.HTML) {
              p._setEndLocation(p.openElements.items[0], token);
              // Update the body element, if it doesn't have an end tag
              const bodyElement = p.openElements.items[1];
              if (bodyElement && !((_a = p.treeAdapter.getNodeSourceCodeLocation(bodyElement)) === null || _a === void 0 ? void 0 : _a.endTag)) {
                  p._setEndLocation(bodyElement, token);
              }
          }
      }
      else {
          tokenAfterBody(p, token);
      }
  }
  function tokenAfterBody(p, token) {
      p.insertionMode = InsertionMode.IN_BODY;
      modeInBody(p, token);
  }
  // The "in frameset" insertion mode
  //------------------------------------------------------------------
  function startTagInFrameset(p, token) {
      switch (token.tagID) {
          case TAG_ID.HTML: {
              startTagInBody(p, token);
              break;
          }
          case TAG_ID.FRAMESET: {
              p._insertElement(token, NS.HTML);
              break;
          }
          case TAG_ID.FRAME: {
              p._appendElement(token, NS.HTML);
              token.ackSelfClosing = true;
              break;
          }
          case TAG_ID.NOFRAMES: {
              startTagInHead(p, token);
              break;
          }
          // Do nothing
      }
  }
  function endTagInFrameset(p, token) {
      if (token.tagID === TAG_ID.FRAMESET && !p.openElements.isRootHtmlElementCurrent()) {
          p.openElements.pop();
          if (!p.fragmentContext && p.openElements.currentTagId !== TAG_ID.FRAMESET) {
              p.insertionMode = InsertionMode.AFTER_FRAMESET;
          }
      }
  }
  // The "after frameset" insertion mode
  //------------------------------------------------------------------
  function startTagAfterFrameset(p, token) {
      switch (token.tagID) {
          case TAG_ID.HTML: {
              startTagInBody(p, token);
              break;
          }
          case TAG_ID.NOFRAMES: {
              startTagInHead(p, token);
              break;
          }
          // Do nothing
      }
  }
  function endTagAfterFrameset(p, token) {
      if (token.tagID === TAG_ID.HTML) {
          p.insertionMode = InsertionMode.AFTER_AFTER_FRAMESET;
      }
  }
  // The "after after body" insertion mode
  //------------------------------------------------------------------
  function startTagAfterAfterBody(p, token) {
      if (token.tagID === TAG_ID.HTML) {
          startTagInBody(p, token);
      }
      else {
          tokenAfterAfterBody(p, token);
      }
  }
  function tokenAfterAfterBody(p, token) {
      p.insertionMode = InsertionMode.IN_BODY;
      modeInBody(p, token);
  }
  // The "after after frameset" insertion mode
  //------------------------------------------------------------------
  function startTagAfterAfterFrameset(p, token) {
      switch (token.tagID) {
          case TAG_ID.HTML: {
              startTagInBody(p, token);
              break;
          }
          case TAG_ID.NOFRAMES: {
              startTagInHead(p, token);
              break;
          }
          // Do nothing
      }
  }
  // The rules for parsing tokens in foreign content
  //------------------------------------------------------------------
  function nullCharacterInForeignContent(p, token) {
      token.chars = REPLACEMENT_CHARACTER;
      p._insertCharacters(token);
  }
  function characterInForeignContent(p, token) {
      p._insertCharacters(token);
      p.framesetOk = false;
  }
  function popUntilHtmlOrIntegrationPoint(p) {
      while (p.treeAdapter.getNamespaceURI(p.openElements.current) !== NS.HTML &&
          p.openElements.currentTagId !== undefined &&
          !p._isIntegrationPoint(p.openElements.currentTagId, p.openElements.current)) {
          p.openElements.pop();
      }
  }
  function startTagInForeignContent(p, token) {
      if (causesExit(token)) {
          popUntilHtmlOrIntegrationPoint(p);
          p._startTagOutsideForeignContent(token);
      }
      else {
          const current = p._getAdjustedCurrentElement();
          const currentNs = p.treeAdapter.getNamespaceURI(current);
          if (currentNs === NS.MATHML) {
              adjustTokenMathMLAttrs(token);
          }
          else if (currentNs === NS.SVG) {
              adjustTokenSVGTagName(token);
              adjustTokenSVGAttrs(token);
          }
          adjustTokenXMLAttrs(token);
          if (token.selfClosing) {
              p._appendElement(token, currentNs);
          }
          else {
              p._insertElement(token, currentNs);
          }
          token.ackSelfClosing = true;
      }
  }
  function endTagInForeignContent(p, token) {
      if (token.tagID === TAG_ID.P || token.tagID === TAG_ID.BR) {
          popUntilHtmlOrIntegrationPoint(p);
          p._endTagOutsideForeignContent(token);
          return;
      }
      for (let i = p.openElements.stackTop; i > 0; i--) {
          const element = p.openElements.items[i];
          if (p.treeAdapter.getNamespaceURI(element) === NS.HTML) {
              p._endTagOutsideForeignContent(token);
              break;
          }
          const tagName = p.treeAdapter.getTagName(element);
          if (tagName.toLowerCase() === token.tagName) {
              //NOTE: update the token tag name for `_setEndLocation`.
              token.tagName = tagName;
              p.openElements.shortenToLength(i);
              break;
          }
      }
  }

  // Sets
  new Set([
      TAG_NAMES.AREA,
      TAG_NAMES.BASE,
      TAG_NAMES.BASEFONT,
      TAG_NAMES.BGSOUND,
      TAG_NAMES.BR,
      TAG_NAMES.COL,
      TAG_NAMES.EMBED,
      TAG_NAMES.FRAME,
      TAG_NAMES.HR,
      TAG_NAMES.IMG,
      TAG_NAMES.INPUT,
      TAG_NAMES.KEYGEN,
      TAG_NAMES.LINK,
      TAG_NAMES.META,
      TAG_NAMES.PARAM,
      TAG_NAMES.SOURCE,
      TAG_NAMES.TRACK,
      TAG_NAMES.WBR,
  ]);

  // Shorthands
  /**
   * Parses an HTML string.
   *
   * @param html Input HTML string.
   * @param options Parsing options.
   * @returns Document
   *
   * @example
   *
   * ```js
   * const parse5 = require('parse5');
   *
   * const document = parse5.parse('<!DOCTYPE html><html><head></head><body>Hi there!</body></html>');
   *
   * console.log(document.childNodes[1].tagName); //> 'html'
   *```
   */
  function parse(html, options) {
      return Parser.parse(html, options);
  }
  function parseFragment(fragmentContext, html, options) {
      if (typeof fragmentContext === 'string') {
          options = html;
          html = fragmentContext;
          fragmentContext = null;
      }
      const parser = Parser.getFragmentParser(fragmentContext, options);
      parser.tokenizer.write(html, true);
      return parser.getFragment();
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
      return point(value)
    }

    // ?
    return ''
  }

  /**
   * @param {Point | PointLike | null | undefined} point
   * @returns {string}
   */
  function point(point) {
    return index(point && point.line) + ':' + index(point && point.column)
  }

  /**
   * @param {Position | PositionLike | null | undefined} pos
   * @returns {string}
   */
  function position(pos) {
    return point(pos && pos.start) + '-' + point(pos && pos.end)
  }

  /**
   * @param {number | null | undefined} value
   * @returns {number}
   */
  function index(value) {
    return value && typeof value === 'number' ? value : 1
  }

  /**
   * @import {Node, Point, Position} from 'unist'
   */


  /**
   * Message.
   */
  class VFileMessage extends Error {
    /**
     * Create a message for `reason`.
     *
     * > 🪦 **Note**: also has obsolete signatures.
     *
     * @overload
     * @param {string} reason
     * @param {Options | null | undefined} [options]
     * @returns
     *
     * @overload
     * @param {string} reason
     * @param {Node | NodeLike | null | undefined} parent
     * @param {string | null | undefined} [origin]
     * @returns
     *
     * @overload
     * @param {string} reason
     * @param {Point | Position | null | undefined} place
     * @param {string | null | undefined} [origin]
     * @returns
     *
     * @overload
     * @param {string} reason
     * @param {string | null | undefined} [origin]
     * @returns
     *
     * @overload
     * @param {Error | VFileMessage} cause
     * @param {Node | NodeLike | null | undefined} parent
     * @param {string | null | undefined} [origin]
     * @returns
     *
     * @overload
     * @param {Error | VFileMessage} cause
     * @param {Point | Position | null | undefined} place
     * @param {string | null | undefined} [origin]
     * @returns
     *
     * @overload
     * @param {Error | VFileMessage} cause
     * @param {string | null | undefined} [origin]
     * @returns
     *
     * @param {Error | VFileMessage | string} causeOrReason
     *   Reason for message, should use markdown.
     * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
     *   Configuration (optional).
     * @param {string | null | undefined} [origin]
     *   Place in code where the message originates (example:
     *   `'my-package:my-rule'` or `'my-rule'`).
     * @returns
     *   Instance of `VFileMessage`.
     */
    // eslint-disable-next-line complexity
    constructor(causeOrReason, optionsOrParentOrPlace, origin) {
      super();

      if (typeof optionsOrParentOrPlace === 'string') {
        origin = optionsOrParentOrPlace;
        optionsOrParentOrPlace = undefined;
      }

      /** @type {string} */
      let reason = '';
      /** @type {Options} */
      let options = {};
      let legacyCause = false;

      if (optionsOrParentOrPlace) {
        // Point.
        if (
          'line' in optionsOrParentOrPlace &&
          'column' in optionsOrParentOrPlace
        ) {
          options = {place: optionsOrParentOrPlace};
        }
        // Position.
        else if (
          'start' in optionsOrParentOrPlace &&
          'end' in optionsOrParentOrPlace
        ) {
          options = {place: optionsOrParentOrPlace};
        }
        // Node.
        else if ('type' in optionsOrParentOrPlace) {
          options = {
            ancestors: [optionsOrParentOrPlace],
            place: optionsOrParentOrPlace.position
          };
        }
        // Options.
        else {
          options = {...optionsOrParentOrPlace};
        }
      }

      if (typeof causeOrReason === 'string') {
        reason = causeOrReason;
      }
      // Error.
      else if (!options.cause && causeOrReason) {
        legacyCause = true;
        reason = causeOrReason.message;
        options.cause = causeOrReason;
      }

      if (!options.ruleId && !options.source && typeof origin === 'string') {
        const index = origin.indexOf(':');

        if (index === -1) {
          options.ruleId = origin;
        } else {
          options.source = origin.slice(0, index);
          options.ruleId = origin.slice(index + 1);
        }
      }

      if (!options.place && options.ancestors && options.ancestors) {
        const parent = options.ancestors[options.ancestors.length - 1];

        if (parent) {
          options.place = parent.position;
        }
      }

      const start =
        options.place && 'start' in options.place
          ? options.place.start
          : options.place;

      /**
       * Stack of ancestor nodes surrounding the message.
       *
       * @type {Array<Node> | undefined}
       */
      this.ancestors = options.ancestors || undefined;

      /**
       * Original error cause of the message.
       *
       * @type {Error | undefined}
       */
      this.cause = options.cause || undefined;

      /**
       * Starting column of message.
       *
       * @type {number | undefined}
       */
      this.column = start ? start.column : undefined;

      /**
       * State of problem.
       *
       * * `true` — error, file not usable
       * * `false` — warning, change may be needed
       * * `undefined` — change likely not needed
       *
       * @type {boolean | null | undefined}
       */
      this.fatal = undefined;

      /**
       * Path of a file (used throughout the `VFile` ecosystem).
       *
       * @type {string | undefined}
       */
      this.file = '';

      // Field from `Error`.
      /**
       * Reason for message.
       *
       * @type {string}
       */
      this.message = reason;

      /**
       * Starting line of error.
       *
       * @type {number | undefined}
       */
      this.line = start ? start.line : undefined;

      // Field from `Error`.
      /**
       * Serialized positional info of message.
       *
       * On normal errors, this would be something like `ParseError`, buit in
       * `VFile` messages we use this space to show where an error happened.
       */
      this.name = stringifyPosition(options.place) || '1:1';

      /**
       * Place of message.
       *
       * @type {Point | Position | undefined}
       */
      this.place = options.place || undefined;

      /**
       * Reason for message, should use markdown.
       *
       * @type {string}
       */
      this.reason = this.message;

      /**
       * Category of message (example: `'my-rule'`).
       *
       * @type {string | undefined}
       */
      this.ruleId = options.ruleId || undefined;

      /**
       * Namespace of message (example: `'my-package'`).
       *
       * @type {string | undefined}
       */
      this.source = options.source || undefined;

      // Field from `Error`.
      /**
       * Stack of message.
       *
       * This is used by normal errors to show where something happened in
       * programming code, irrelevant for `VFile` messages,
       *
       * @type {string}
       */
      this.stack =
        legacyCause && options.cause && typeof options.cause.stack === 'string'
          ? options.cause.stack
          : '';

      // The following fields are “well known”.
      // Not standard.
      // Feel free to add other non-standard fields to your messages.

      /**
       * Specify the source value that’s being reported, which is deemed
       * incorrect.
       *
       * @type {string | undefined}
       */
      this.actual = undefined;

      /**
       * Suggest acceptable values that can be used instead of `actual`.
       *
       * @type {Array<string> | undefined}
       */
      this.expected = undefined;

      /**
       * Long form description of the message (you should use markdown).
       *
       * @type {string | undefined}
       */
      this.note = undefined;

      /**
       * Link to docs for the message.
       *
       * > 👉 **Note**: this must be an absolute URL that can be passed as `x`
       * > to `new URL(x)`.
       *
       * @type {string | undefined}
       */
      this.url = undefined;
    }
  }

  VFileMessage.prototype.file = '';
  VFileMessage.prototype.name = '';
  VFileMessage.prototype.reason = '';
  VFileMessage.prototype.message = '';
  VFileMessage.prototype.stack = '';
  VFileMessage.prototype.column = undefined;
  VFileMessage.prototype.line = undefined;
  VFileMessage.prototype.ancestors = undefined;
  VFileMessage.prototype.cause = undefined;
  VFileMessage.prototype.fatal = undefined;
  VFileMessage.prototype.place = undefined;
  VFileMessage.prototype.ruleId = undefined;
  VFileMessage.prototype.source = undefined;

  // A derivative work based on:
  // <https://github.com/browserify/path-browserify>.
  // Which is licensed:
  //
  // MIT License
  //
  // Copyright (c) 2013 James Halliday
  //
  // Permission is hereby granted, free of charge, to any person obtaining a copy of
  // this software and associated documentation files (the "Software"), to deal in
  // the Software without restriction, including without limitation the rights to
  // use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
  // the Software, and to permit persons to whom the Software is furnished to do so,
  // subject to the following conditions:
  //
  // The above copyright notice and this permission notice shall be included in all
  // copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
  // FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
  // COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
  // IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  // CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  // A derivative work based on:
  //
  // Parts of that are extracted from Node’s internal `path` module:
  // <https://github.com/nodejs/node/blob/master/lib/path.js>.
  // Which is licensed:
  //
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  const minpath = {basename, dirname, extname, join, sep: '/'};

  /* eslint-disable max-depth, complexity */

  /**
   * Get the basename from a path.
   *
   * @param {string} path
   *   File path.
   * @param {string | null | undefined} [extname]
   *   Extension to strip.
   * @returns {string}
   *   Stem or basename.
   */
  function basename(path, extname) {
    if (extname !== undefined && typeof extname !== 'string') {
      throw new TypeError('"ext" argument must be a string')
    }

    assertPath$1(path);
    let start = 0;
    let end = -1;
    let index = path.length;
    /** @type {boolean | undefined} */
    let seenNonSlash;

    if (
      extname === undefined ||
      extname.length === 0 ||
      extname.length > path.length
    ) {
      while (index--) {
        if (path.codePointAt(index) === 47 /* `/` */) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now.
          if (seenNonSlash) {
            start = index + 1;
            break
          }
        } else if (end < 0) {
          // We saw the first non-path separator, mark this as the end of our
          // path component.
          seenNonSlash = true;
          end = index + 1;
        }
      }

      return end < 0 ? '' : path.slice(start, end)
    }

    if (extname === path) {
      return ''
    }

    let firstNonSlashEnd = -1;
    let extnameIndex = extname.length - 1;

    while (index--) {
      if (path.codePointAt(index) === 47 /* `/` */) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now.
        if (seenNonSlash) {
          start = index + 1;
          break
        }
      } else {
        if (firstNonSlashEnd < 0) {
          // We saw the first non-path separator, remember this index in case
          // we need it if the extension ends up not matching.
          seenNonSlash = true;
          firstNonSlashEnd = index + 1;
        }

        if (extnameIndex > -1) {
          // Try to match the explicit extension.
          if (path.codePointAt(index) === extname.codePointAt(extnameIndex--)) {
            if (extnameIndex < 0) {
              // We matched the extension, so mark this as the end of our path
              // component
              end = index;
            }
          } else {
            // Extension does not match, so our result is the entire path
            // component
            extnameIndex = -1;
            end = firstNonSlashEnd;
          }
        }
      }
    }

    if (start === end) {
      end = firstNonSlashEnd;
    } else if (end < 0) {
      end = path.length;
    }

    return path.slice(start, end)
  }

  /**
   * Get the dirname from a path.
   *
   * @param {string} path
   *   File path.
   * @returns {string}
   *   File path.
   */
  function dirname(path) {
    assertPath$1(path);

    if (path.length === 0) {
      return '.'
    }

    let end = -1;
    let index = path.length;
    /** @type {boolean | undefined} */
    let unmatchedSlash;

    // Prefix `--` is important to not run on `0`.
    while (--index) {
      if (path.codePointAt(index) === 47 /* `/` */) {
        if (unmatchedSlash) {
          end = index;
          break
        }
      } else if (!unmatchedSlash) {
        // We saw the first non-path separator
        unmatchedSlash = true;
      }
    }

    return end < 0
      ? path.codePointAt(0) === 47 /* `/` */
        ? '/'
        : '.'
      : end === 1 && path.codePointAt(0) === 47 /* `/` */
        ? '//'
        : path.slice(0, end)
  }

  /**
   * Get an extname from a path.
   *
   * @param {string} path
   *   File path.
   * @returns {string}
   *   Extname.
   */
  function extname(path) {
    assertPath$1(path);

    let index = path.length;

    let end = -1;
    let startPart = 0;
    let startDot = -1;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find.
    let preDotState = 0;
    /** @type {boolean | undefined} */
    let unmatchedSlash;

    while (index--) {
      const code = path.codePointAt(index);

      if (code === 47 /* `/` */) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now.
        if (unmatchedSlash) {
          startPart = index + 1;
          break
        }

        continue
      }

      if (end < 0) {
        // We saw the first non-path separator, mark this as the end of our
        // extension.
        unmatchedSlash = true;
        end = index + 1;
      }

      if (code === 46 /* `.` */) {
        // If this is our first dot, mark it as the start of our extension.
        if (startDot < 0) {
          startDot = index;
        } else if (preDotState !== 1) {
          preDotState = 1;
        }
      } else if (startDot > -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension.
        preDotState = -1;
      }
    }

    if (
      startDot < 0 ||
      end < 0 ||
      // We saw a non-dot character immediately before the dot.
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly `..`.
      (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
    ) {
      return ''
    }

    return path.slice(startDot, end)
  }

  /**
   * Join segments from a path.
   *
   * @param {Array<string>} segments
   *   Path segments.
   * @returns {string}
   *   File path.
   */
  function join(...segments) {
    let index = -1;
    /** @type {string | undefined} */
    let joined;

    while (++index < segments.length) {
      assertPath$1(segments[index]);

      if (segments[index]) {
        joined =
          joined === undefined ? segments[index] : joined + '/' + segments[index];
      }
    }

    return joined === undefined ? '.' : normalize(joined)
  }

  /**
   * Normalize a basic file path.
   *
   * @param {string} path
   *   File path.
   * @returns {string}
   *   File path.
   */
  // Note: `normalize` is not exposed as `path.normalize`, so some code is
  // manually removed from it.
  function normalize(path) {
    assertPath$1(path);

    const absolute = path.codePointAt(0) === 47; /* `/` */

    // Normalize the path according to POSIX rules.
    let value = normalizeString(path, !absolute);

    if (value.length === 0 && !absolute) {
      value = '.';
    }

    if (value.length > 0 && path.codePointAt(path.length - 1) === 47 /* / */) {
      value += '/';
    }

    return absolute ? '/' + value : value
  }

  /**
   * Resolve `.` and `..` elements in a path with directory names.
   *
   * @param {string} path
   *   File path.
   * @param {boolean} allowAboveRoot
   *   Whether `..` can move above root.
   * @returns {string}
   *   File path.
   */
  function normalizeString(path, allowAboveRoot) {
    let result = '';
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let index = -1;
    /** @type {number | undefined} */
    let code;
    /** @type {number} */
    let lastSlashIndex;

    while (++index <= path.length) {
      if (index < path.length) {
        code = path.codePointAt(index);
      } else if (code === 47 /* `/` */) {
        break
      } else {
        code = 47; /* `/` */
      }

      if (code === 47 /* `/` */) {
        if (lastSlash === index - 1 || dots === 1) ; else if (lastSlash !== index - 1 && dots === 2) {
          if (
            result.length < 2 ||
            lastSegmentLength !== 2 ||
            result.codePointAt(result.length - 1) !== 46 /* `.` */ ||
            result.codePointAt(result.length - 2) !== 46 /* `.` */
          ) {
            if (result.length > 2) {
              lastSlashIndex = result.lastIndexOf('/');

              if (lastSlashIndex !== result.length - 1) {
                if (lastSlashIndex < 0) {
                  result = '';
                  lastSegmentLength = 0;
                } else {
                  result = result.slice(0, lastSlashIndex);
                  lastSegmentLength = result.length - 1 - result.lastIndexOf('/');
                }

                lastSlash = index;
                dots = 0;
                continue
              }
            } else if (result.length > 0) {
              result = '';
              lastSegmentLength = 0;
              lastSlash = index;
              dots = 0;
              continue
            }
          }

          if (allowAboveRoot) {
            result = result.length > 0 ? result + '/..' : '..';
            lastSegmentLength = 2;
          }
        } else {
          if (result.length > 0) {
            result += '/' + path.slice(lastSlash + 1, index);
          } else {
            result = path.slice(lastSlash + 1, index);
          }

          lastSegmentLength = index - lastSlash - 1;
        }

        lastSlash = index;
        dots = 0;
      } else if (code === 46 /* `.` */ && dots > -1) {
        dots++;
      } else {
        dots = -1;
      }
    }

    return result
  }

  /**
   * Make sure `path` is a string.
   *
   * @param {string} path
   *   File path.
   * @returns {asserts path is string}
   *   Nothing.
   */
  function assertPath$1(path) {
    if (typeof path !== 'string') {
      throw new TypeError(
        'Path must be a string. Received ' + JSON.stringify(path)
      )
    }
  }

  /* eslint-enable max-depth, complexity */

  // Somewhat based on:
  // <https://github.com/defunctzombie/node-process/blob/master/browser.js>.
  // But I don’t think one tiny line of code can be copyrighted. 😅
  const minproc = {cwd};

  function cwd() {
    return '/'
  }

  /**
   * Checks if a value has the shape of a WHATWG URL object.
   *
   * Using a symbol or instanceof would not be able to recognize URL objects
   * coming from other implementations (e.g. in Electron), so instead we are
   * checking some well known properties for a lack of a better test.
   *
   * We use `href` and `protocol` as they are the only properties that are
   * easy to retrieve and calculate due to the lazy nature of the getters.
   *
   * We check for auth attribute to distinguish legacy url instance with
   * WHATWG URL instance.
   *
   * @param {unknown} fileUrlOrPath
   *   File path or URL.
   * @returns {fileUrlOrPath is URL}
   *   Whether it’s a URL.
   */
  // From: <https://github.com/nodejs/node/blob/6a3403c/lib/internal/url.js#L720>
  function isUrl(fileUrlOrPath) {
    return Boolean(
      fileUrlOrPath !== null &&
        typeof fileUrlOrPath === 'object' &&
        'href' in fileUrlOrPath &&
        fileUrlOrPath.href &&
        'protocol' in fileUrlOrPath &&
        fileUrlOrPath.protocol &&
        // @ts-expect-error: indexing is fine.
        fileUrlOrPath.auth === undefined
    )
  }

  // See: <https://github.com/nodejs/node/blob/6a3403c/lib/internal/url.js>

  /**
   * @param {URL | string} path
   *   File URL.
   * @returns {string}
   *   File URL.
   */
  function urlToPath(path) {
    if (typeof path === 'string') {
      path = new URL(path);
    } else if (!isUrl(path)) {
      /** @type {NodeJS.ErrnoException} */
      const error = new TypeError(
        'The "path" argument must be of type string or an instance of URL. Received `' +
          path +
          '`'
      );
      error.code = 'ERR_INVALID_ARG_TYPE';
      throw error
    }

    if (path.protocol !== 'file:') {
      /** @type {NodeJS.ErrnoException} */
      const error = new TypeError('The URL must be of scheme file');
      error.code = 'ERR_INVALID_URL_SCHEME';
      throw error
    }

    return getPathFromURLPosix(path)
  }

  /**
   * Get a path from a POSIX URL.
   *
   * @param {URL} url
   *   URL.
   * @returns {string}
   *   File path.
   */
  function getPathFromURLPosix(url) {
    if (url.hostname !== '') {
      /** @type {NodeJS.ErrnoException} */
      const error = new TypeError(
        'File URL host must be "localhost" or empty on darwin'
      );
      error.code = 'ERR_INVALID_FILE_URL_HOST';
      throw error
    }

    const pathname = url.pathname;
    let index = -1;

    while (++index < pathname.length) {
      if (
        pathname.codePointAt(index) === 37 /* `%` */ &&
        pathname.codePointAt(index + 1) === 50 /* `2` */
      ) {
        const third = pathname.codePointAt(index + 2);
        if (third === 70 /* `F` */ || third === 102 /* `f` */) {
          /** @type {NodeJS.ErrnoException} */
          const error = new TypeError(
            'File URL path must not include encoded / characters'
          );
          error.code = 'ERR_INVALID_FILE_URL_PATH';
          throw error
        }
      }
    }

    return decodeURIComponent(pathname)
  }

  /**
   * @import {Node, Point, Position} from 'unist'
   * @import {Options as MessageOptions} from 'vfile-message'
   * @import {Compatible, Data, Map, Options, Value} from 'vfile'
   */


  /**
   * Order of setting (least specific to most), we need this because otherwise
   * `{stem: 'a', path: '~/b.js'}` would throw, as a path is needed before a
   * stem can be set.
   */
  const order = /** @type {const} */ ([
    'history',
    'path',
    'basename',
    'stem',
    'extname',
    'dirname'
  ]);

  class VFile {
    /**
     * Create a new virtual file.
     *
     * `options` is treated as:
     *
     * *   `string` or `Uint8Array` — `{value: options}`
     * *   `URL` — `{path: options}`
     * *   `VFile` — shallow copies its data over to the new file
     * *   `object` — all fields are shallow copied over to the new file
     *
     * Path related fields are set in the following order (least specific to
     * most specific): `history`, `path`, `basename`, `stem`, `extname`,
     * `dirname`.
     *
     * You cannot set `dirname` or `extname` without setting either `history`,
     * `path`, `basename`, or `stem` too.
     *
     * @param {Compatible | null | undefined} [value]
     *   File value.
     * @returns
     *   New instance.
     */
    constructor(value) {
      /** @type {Options | VFile} */
      let options;

      if (!value) {
        options = {};
      } else if (isUrl(value)) {
        options = {path: value};
      } else if (typeof value === 'string' || isUint8Array(value)) {
        options = {value};
      } else {
        options = value;
      }

      /* eslint-disable no-unused-expressions */

      /**
       * Base of `path` (default: `process.cwd()` or `'/'` in browsers).
       *
       * @type {string}
       */
      // Prevent calling `cwd` (which could be expensive) if it’s not needed;
      // the empty string will be overridden in the next block.
      this.cwd = 'cwd' in options ? '' : minproc.cwd();

      /**
       * Place to store custom info (default: `{}`).
       *
       * It’s OK to store custom data directly on the file but moving it to
       * `data` is recommended.
       *
       * @type {Data}
       */
      this.data = {};

      /**
       * List of file paths the file moved between.
       *
       * The first is the original path and the last is the current path.
       *
       * @type {Array<string>}
       */
      this.history = [];

      /**
       * List of messages associated with the file.
       *
       * @type {Array<VFileMessage>}
       */
      this.messages = [];

      /**
       * Raw value.
       *
       * @type {Value}
       */
      this.value;

      // The below are non-standard, they are “well-known”.
      // As in, used in several tools.
      /**
       * Source map.
       *
       * This type is equivalent to the `RawSourceMap` type from the `source-map`
       * module.
       *
       * @type {Map | null | undefined}
       */
      this.map;

      /**
       * Custom, non-string, compiled, representation.
       *
       * This is used by unified to store non-string results.
       * One example is when turning markdown into React nodes.
       *
       * @type {unknown}
       */
      this.result;

      /**
       * Whether a file was saved to disk.
       *
       * This is used by vfile reporters.
       *
       * @type {boolean}
       */
      this.stored;
      /* eslint-enable no-unused-expressions */

      // Set path related properties in the correct order.
      let index = -1;

      while (++index < order.length) {
        const field = order[index];

        // Note: we specifically use `in` instead of `hasOwnProperty` to accept
        // `vfile`s too.
        if (
          field in options &&
          options[field] !== undefined &&
          options[field] !== null
        ) {
          // @ts-expect-error: TS doesn’t understand basic reality.
          this[field] = field === 'history' ? [...options[field]] : options[field];
        }
      }

      /** @type {string} */
      let field;

      // Set non-path related properties.
      for (field in options) {
        // @ts-expect-error: fine to set other things.
        if (!order.includes(field)) {
          // @ts-expect-error: fine to set other things.
          this[field] = options[field];
        }
      }
    }

    /**
     * Get the basename (including extname) (example: `'index.min.js'`).
     *
     * @returns {string | undefined}
     *   Basename.
     */
    get basename() {
      return typeof this.path === 'string'
        ? minpath.basename(this.path)
        : undefined
    }

    /**
     * Set basename (including extname) (`'index.min.js'`).
     *
     * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
     * on windows).
     * Cannot be nullified (use `file.path = file.dirname` instead).
     *
     * @param {string} basename
     *   Basename.
     * @returns {undefined}
     *   Nothing.
     */
    set basename(basename) {
      assertNonEmpty(basename, 'basename');
      assertPart(basename, 'basename');
      this.path = minpath.join(this.dirname || '', basename);
    }

    /**
     * Get the parent path (example: `'~'`).
     *
     * @returns {string | undefined}
     *   Dirname.
     */
    get dirname() {
      return typeof this.path === 'string'
        ? minpath.dirname(this.path)
        : undefined
    }

    /**
     * Set the parent path (example: `'~'`).
     *
     * Cannot be set if there’s no `path` yet.
     *
     * @param {string | undefined} dirname
     *   Dirname.
     * @returns {undefined}
     *   Nothing.
     */
    set dirname(dirname) {
      assertPath(this.basename, 'dirname');
      this.path = minpath.join(dirname || '', this.basename);
    }

    /**
     * Get the extname (including dot) (example: `'.js'`).
     *
     * @returns {string | undefined}
     *   Extname.
     */
    get extname() {
      return typeof this.path === 'string'
        ? minpath.extname(this.path)
        : undefined
    }

    /**
     * Set the extname (including dot) (example: `'.js'`).
     *
     * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
     * on windows).
     * Cannot be set if there’s no `path` yet.
     *
     * @param {string | undefined} extname
     *   Extname.
     * @returns {undefined}
     *   Nothing.
     */
    set extname(extname) {
      assertPart(extname, 'extname');
      assertPath(this.dirname, 'extname');

      if (extname) {
        if (extname.codePointAt(0) !== 46 /* `.` */) {
          throw new Error('`extname` must start with `.`')
        }

        if (extname.includes('.', 1)) {
          throw new Error('`extname` cannot contain multiple dots')
        }
      }

      this.path = minpath.join(this.dirname, this.stem + (extname || ''));
    }

    /**
     * Get the full path (example: `'~/index.min.js'`).
     *
     * @returns {string}
     *   Path.
     */
    get path() {
      return this.history[this.history.length - 1]
    }

    /**
     * Set the full path (example: `'~/index.min.js'`).
     *
     * Cannot be nullified.
     * You can set a file URL (a `URL` object with a `file:` protocol) which will
     * be turned into a path with `url.fileURLToPath`.
     *
     * @param {URL | string} path
     *   Path.
     * @returns {undefined}
     *   Nothing.
     */
    set path(path) {
      if (isUrl(path)) {
        path = urlToPath(path);
      }

      assertNonEmpty(path, 'path');

      if (this.path !== path) {
        this.history.push(path);
      }
    }

    /**
     * Get the stem (basename w/o extname) (example: `'index.min'`).
     *
     * @returns {string | undefined}
     *   Stem.
     */
    get stem() {
      return typeof this.path === 'string'
        ? minpath.basename(this.path, this.extname)
        : undefined
    }

    /**
     * Set the stem (basename w/o extname) (example: `'index.min'`).
     *
     * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
     * on windows).
     * Cannot be nullified (use `file.path = file.dirname` instead).
     *
     * @param {string} stem
     *   Stem.
     * @returns {undefined}
     *   Nothing.
     */
    set stem(stem) {
      assertNonEmpty(stem, 'stem');
      assertPart(stem, 'stem');
      this.path = minpath.join(this.dirname || '', stem + (this.extname || ''));
    }

    // Normal prototypal methods.
    /**
     * Create a fatal message for `reason` associated with the file.
     *
     * The `fatal` field of the message is set to `true` (error; file not usable)
     * and the `file` field is set to the current file path.
     * The message is added to the `messages` field on `file`.
     *
     * > 🪦 **Note**: also has obsolete signatures.
     *
     * @overload
     * @param {string} reason
     * @param {MessageOptions | null | undefined} [options]
     * @returns {never}
     *
     * @overload
     * @param {string} reason
     * @param {Node | NodeLike | null | undefined} parent
     * @param {string | null | undefined} [origin]
     * @returns {never}
     *
     * @overload
     * @param {string} reason
     * @param {Point | Position | null | undefined} place
     * @param {string | null | undefined} [origin]
     * @returns {never}
     *
     * @overload
     * @param {string} reason
     * @param {string | null | undefined} [origin]
     * @returns {never}
     *
     * @overload
     * @param {Error | VFileMessage} cause
     * @param {Node | NodeLike | null | undefined} parent
     * @param {string | null | undefined} [origin]
     * @returns {never}
     *
     * @overload
     * @param {Error | VFileMessage} cause
     * @param {Point | Position | null | undefined} place
     * @param {string | null | undefined} [origin]
     * @returns {never}
     *
     * @overload
     * @param {Error | VFileMessage} cause
     * @param {string | null | undefined} [origin]
     * @returns {never}
     *
     * @param {Error | VFileMessage | string} causeOrReason
     *   Reason for message, should use markdown.
     * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
     *   Configuration (optional).
     * @param {string | null | undefined} [origin]
     *   Place in code where the message originates (example:
     *   `'my-package:my-rule'` or `'my-rule'`).
     * @returns {never}
     *   Never.
     * @throws {VFileMessage}
     *   Message.
     */
    fail(causeOrReason, optionsOrParentOrPlace, origin) {
      // @ts-expect-error: the overloads are fine.
      const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);

      message.fatal = true;

      throw message
    }

    /**
     * Create an info message for `reason` associated with the file.
     *
     * The `fatal` field of the message is set to `undefined` (info; change
     * likely not needed) and the `file` field is set to the current file path.
     * The message is added to the `messages` field on `file`.
     *
     * > 🪦 **Note**: also has obsolete signatures.
     *
     * @overload
     * @param {string} reason
     * @param {MessageOptions | null | undefined} [options]
     * @returns {VFileMessage}
     *
     * @overload
     * @param {string} reason
     * @param {Node | NodeLike | null | undefined} parent
     * @param {string | null | undefined} [origin]
     * @returns {VFileMessage}
     *
     * @overload
     * @param {string} reason
     * @param {Point | Position | null | undefined} place
     * @param {string | null | undefined} [origin]
     * @returns {VFileMessage}
     *
     * @overload
     * @param {string} reason
     * @param {string | null | undefined} [origin]
     * @returns {VFileMessage}
     *
     * @overload
     * @param {Error | VFileMessage} cause
     * @param {Node | NodeLike | null | undefined} parent
     * @param {string | null | undefined} [origin]
     * @returns {VFileMessage}
     *
     * @overload
     * @param {Error | VFileMessage} cause
     * @param {Point | Position | null | undefined} place
     * @param {string | null | undefined} [origin]
     * @returns {VFileMessage}
     *
     * @overload
     * @param {Error | VFileMessage} cause
     * @param {string | null | undefined} [origin]
     * @returns {VFileMessage}
     *
     * @param {Error | VFileMessage | string} causeOrReason
     *   Reason for message, should use markdown.
     * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
     *   Configuration (optional).
     * @param {string | null | undefined} [origin]
     *   Place in code where the message originates (example:
     *   `'my-package:my-rule'` or `'my-rule'`).
     * @returns {VFileMessage}
     *   Message.
     */
    info(causeOrReason, optionsOrParentOrPlace, origin) {
      // @ts-expect-error: the overloads are fine.
      const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);

      message.fatal = undefined;

      return message
    }

    /**
     * Create a message for `reason` associated with the file.
     *
     * The `fatal` field of the message is set to `false` (warning; change may be
     * needed) and the `file` field is set to the current file path.
     * The message is added to the `messages` field on `file`.
     *
     * > 🪦 **Note**: also has obsolete signatures.
     *
     * @overload
     * @param {string} reason
     * @param {MessageOptions | null | undefined} [options]
     * @returns {VFileMessage}
     *
     * @overload
     * @param {string} reason
     * @param {Node | NodeLike | null | undefined} parent
     * @param {string | null | undefined} [origin]
     * @returns {VFileMessage}
     *
     * @overload
     * @param {string} reason
     * @param {Point | Position | null | undefined} place
     * @param {string | null | undefined} [origin]
     * @returns {VFileMessage}
     *
     * @overload
     * @param {string} reason
     * @param {string | null | undefined} [origin]
     * @returns {VFileMessage}
     *
     * @overload
     * @param {Error | VFileMessage} cause
     * @param {Node | NodeLike | null | undefined} parent
     * @param {string | null | undefined} [origin]
     * @returns {VFileMessage}
     *
     * @overload
     * @param {Error | VFileMessage} cause
     * @param {Point | Position | null | undefined} place
     * @param {string | null | undefined} [origin]
     * @returns {VFileMessage}
     *
     * @overload
     * @param {Error | VFileMessage} cause
     * @param {string | null | undefined} [origin]
     * @returns {VFileMessage}
     *
     * @param {Error | VFileMessage | string} causeOrReason
     *   Reason for message, should use markdown.
     * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
     *   Configuration (optional).
     * @param {string | null | undefined} [origin]
     *   Place in code where the message originates (example:
     *   `'my-package:my-rule'` or `'my-rule'`).
     * @returns {VFileMessage}
     *   Message.
     */
    message(causeOrReason, optionsOrParentOrPlace, origin) {
      const message = new VFileMessage(
        // @ts-expect-error: the overloads are fine.
        causeOrReason,
        optionsOrParentOrPlace,
        origin
      );

      if (this.path) {
        message.name = this.path + ':' + message.name;
        message.file = this.path;
      }

      message.fatal = false;

      this.messages.push(message);

      return message
    }

    /**
     * Serialize the file.
     *
     * > **Note**: which encodings are supported depends on the engine.
     * > For info on Node.js, see:
     * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
     *
     * @param {string | null | undefined} [encoding='utf8']
     *   Character encoding to understand `value` as when it’s a `Uint8Array`
     *   (default: `'utf-8'`).
     * @returns {string}
     *   Serialized file.
     */
    toString(encoding) {
      if (this.value === undefined) {
        return ''
      }

      if (typeof this.value === 'string') {
        return this.value
      }

      const decoder = new TextDecoder(encoding || undefined);
      return decoder.decode(this.value)
    }
  }

  /**
   * Assert that `part` is not a path (as in, does not contain `path.sep`).
   *
   * @param {string | null | undefined} part
   *   File path part.
   * @param {string} name
   *   Part name.
   * @returns {undefined}
   *   Nothing.
   */
  function assertPart(part, name) {
    if (part && part.includes(minpath.sep)) {
      throw new Error(
        '`' + name + '` cannot be a path: did not expect `' + minpath.sep + '`'
      )
    }
  }

  /**
   * Assert that `part` is not empty.
   *
   * @param {string | undefined} part
   *   Thing.
   * @param {string} name
   *   Part name.
   * @returns {asserts part is string}
   *   Nothing.
   */
  function assertNonEmpty(part, name) {
    if (!part) {
      throw new Error('`' + name + '` cannot be empty')
    }
  }

  /**
   * Assert `path` exists.
   *
   * @param {string | undefined} path
   *   Path.
   * @param {string} name
   *   Dependency name.
   * @returns {asserts path is string}
   *   Nothing.
   */
  function assertPath(path, name) {
    if (!path) {
      throw new Error('Setting `' + name + '` requires `path` to be set too')
    }
  }

  /**
   * Assert `value` is an `Uint8Array`.
   *
   * @param {unknown} value
   *   thing.
   * @returns {value is Uint8Array}
   *   Whether `value` is an `Uint8Array`.
   */
  function isUint8Array(value) {
    return Boolean(
      value &&
        typeof value === 'object' &&
        'byteLength' in value &&
        'byteOffset' in value
    )
  }

  /**
   * @typedef ErrorInfo
   *   Info on a `parse5` error.
   * @property {string} reason
   *   Reason of error.
   * @property {string} description
   *   More info on error.
   * @property {false} [url]
   *   Turn off if this is not documented in the html5 spec (optional).
   */

  const errors = {
    /** @type {ErrorInfo} */
    abandonedHeadElementChild: {
      reason: 'Unexpected metadata element after head',
      description:
        'Unexpected element after head. Expected the element before `</head>`',
      url: false
    },
    /** @type {ErrorInfo} */
    abruptClosingOfEmptyComment: {
      reason: 'Unexpected abruptly closed empty comment',
      description: 'Unexpected `>` or `->`. Expected `-->` to close comments'
    },
    /** @type {ErrorInfo} */
    abruptDoctypePublicIdentifier: {
      reason: 'Unexpected abruptly closed public identifier',
      description:
        'Unexpected `>`. Expected a closing `"` or `\'` after the public identifier'
    },
    /** @type {ErrorInfo} */
    abruptDoctypeSystemIdentifier: {
      reason: 'Unexpected abruptly closed system identifier',
      description:
        'Unexpected `>`. Expected a closing `"` or `\'` after the identifier identifier'
    },
    /** @type {ErrorInfo} */
    absenceOfDigitsInNumericCharacterReference: {
      reason: 'Unexpected non-digit at start of numeric character reference',
      description:
        'Unexpected `%c`. Expected `[0-9]` for decimal references or `[0-9a-fA-F]` for hexadecimal references'
    },
    /** @type {ErrorInfo} */
    cdataInHtmlContent: {
      reason: 'Unexpected CDATA section in HTML',
      description:
        'Unexpected `<![CDATA[` in HTML. Remove it, use a comment, or encode special characters instead'
    },
    /** @type {ErrorInfo} */
    characterReferenceOutsideUnicodeRange: {
      reason: 'Unexpected too big numeric character reference',
      description:
        'Unexpectedly high character reference. Expected character references to be at most hexadecimal 10ffff (or decimal 1114111)'
    },
    /** @type {ErrorInfo} */
    closingOfElementWithOpenChildElements: {
      reason: 'Unexpected closing tag with open child elements',
      description:
        'Unexpectedly closing tag. Expected other tags to be closed first',
      url: false
    },
    /** @type {ErrorInfo} */
    controlCharacterInInputStream: {
      reason: 'Unexpected control character',
      description:
        'Unexpected control character `%x`. Expected a non-control code point, 0x00, or ASCII whitespace'
    },
    /** @type {ErrorInfo} */
    controlCharacterReference: {
      reason: 'Unexpected control character reference',
      description:
        'Unexpectedly control character in reference. Expected a non-control code point, 0x00, or ASCII whitespace'
    },
    /** @type {ErrorInfo} */
    disallowedContentInNoscriptInHead: {
      reason: 'Disallowed content inside `<noscript>` in `<head>`',
      description:
        'Unexpected text character `%c`. Only use text in `<noscript>`s in `<body>`',
      url: false
    },
    /** @type {ErrorInfo} */
    duplicateAttribute: {
      reason: 'Unexpected duplicate attribute',
      description:
        'Unexpectedly double attribute. Expected attributes to occur only once'
    },
    /** @type {ErrorInfo} */
    endTagWithAttributes: {
      reason: 'Unexpected attribute on closing tag',
      description: 'Unexpected attribute. Expected `>` instead'
    },
    /** @type {ErrorInfo} */
    endTagWithTrailingSolidus: {
      reason: 'Unexpected slash at end of closing tag',
      description: 'Unexpected `%c-1`. Expected `>` instead'
    },
    /** @type {ErrorInfo} */
    endTagWithoutMatchingOpenElement: {
      reason: 'Unexpected unopened end tag',
      description: 'Unexpected end tag. Expected no end tag or another end tag',
      url: false
    },
    /** @type {ErrorInfo} */
    eofBeforeTagName: {
      reason: 'Unexpected end of file',
      description: 'Unexpected end of file. Expected tag name instead'
    },
    /** @type {ErrorInfo} */
    eofInCdata: {
      reason: 'Unexpected end of file in CDATA',
      description: 'Unexpected end of file. Expected `]]>` to close the CDATA'
    },
    /** @type {ErrorInfo} */
    eofInComment: {
      reason: 'Unexpected end of file in comment',
      description: 'Unexpected end of file. Expected `-->` to close the comment'
    },
    /** @type {ErrorInfo} */
    eofInDoctype: {
      reason: 'Unexpected end of file in doctype',
      description:
        'Unexpected end of file. Expected a valid doctype (such as `<!doctype html>`)'
    },
    /** @type {ErrorInfo} */
    eofInElementThatCanContainOnlyText: {
      reason: 'Unexpected end of file in element that can only contain text',
      description: 'Unexpected end of file. Expected text or a closing tag',
      url: false
    },
    /** @type {ErrorInfo} */
    eofInScriptHtmlCommentLikeText: {
      reason: 'Unexpected end of file in comment inside script',
      description: 'Unexpected end of file. Expected `-->` to close the comment'
    },
    /** @type {ErrorInfo} */
    eofInTag: {
      reason: 'Unexpected end of file in tag',
      description: 'Unexpected end of file. Expected `>` to close the tag'
    },
    /** @type {ErrorInfo} */
    incorrectlyClosedComment: {
      reason: 'Incorrectly closed comment',
      description: 'Unexpected `%c-1`. Expected `-->` to close the comment'
    },
    /** @type {ErrorInfo} */
    incorrectlyOpenedComment: {
      reason: 'Incorrectly opened comment',
      description: 'Unexpected `%c`. Expected `<!--` to open the comment'
    },
    /** @type {ErrorInfo} */
    invalidCharacterSequenceAfterDoctypeName: {
      reason: 'Invalid sequence after doctype name',
      description: 'Unexpected sequence at `%c`. Expected `public` or `system`'
    },
    /** @type {ErrorInfo} */
    invalidFirstCharacterOfTagName: {
      reason: 'Invalid first character in tag name',
      description: 'Unexpected `%c`. Expected an ASCII letter instead'
    },
    /** @type {ErrorInfo} */
    misplacedDoctype: {
      reason: 'Misplaced doctype',
      description: 'Unexpected doctype. Expected doctype before head',
      url: false
    },
    /** @type {ErrorInfo} */
    misplacedStartTagForHeadElement: {
      reason: 'Misplaced `<head>` start tag',
      description:
        'Unexpected start tag `<head>`. Expected `<head>` directly after doctype',
      url: false
    },
    /** @type {ErrorInfo} */
    missingAttributeValue: {
      reason: 'Missing attribute value',
      description:
        'Unexpected `%c-1`. Expected an attribute value or no `%c-1` instead'
    },
    /** @type {ErrorInfo} */
    missingDoctype: {
      reason: 'Missing doctype before other content',
      description: 'Expected a `<!doctype html>` before anything else',
      url: false
    },
    /** @type {ErrorInfo} */
    missingDoctypeName: {
      reason: 'Missing doctype name',
      description: 'Unexpected doctype end at `%c`. Expected `html` instead'
    },
    /** @type {ErrorInfo} */
    missingDoctypePublicIdentifier: {
      reason: 'Missing public identifier in doctype',
      description: 'Unexpected `%c`. Expected identifier for `public` instead'
    },
    /** @type {ErrorInfo} */
    missingDoctypeSystemIdentifier: {
      reason: 'Missing system identifier in doctype',
      description:
        'Unexpected `%c`. Expected identifier for `system` instead (suggested: `"about:legacy-compat"`)'
    },
    /** @type {ErrorInfo} */
    missingEndTagName: {
      reason: 'Missing name in end tag',
      description: 'Unexpected `%c`. Expected an ASCII letter instead'
    },
    /** @type {ErrorInfo} */
    missingQuoteBeforeDoctypePublicIdentifier: {
      reason: 'Missing quote before public identifier in doctype',
      description: 'Unexpected `%c`. Expected `"` or `\'` instead'
    },
    /** @type {ErrorInfo} */
    missingQuoteBeforeDoctypeSystemIdentifier: {
      reason: 'Missing quote before system identifier in doctype',
      description: 'Unexpected `%c`. Expected `"` or `\'` instead'
    },
    /** @type {ErrorInfo} */
    missingSemicolonAfterCharacterReference: {
      reason: 'Missing semicolon after character reference',
      description: 'Unexpected `%c`. Expected `;` instead'
    },
    /** @type {ErrorInfo} */
    missingWhitespaceAfterDoctypePublicKeyword: {
      reason: 'Missing whitespace after public identifier in doctype',
      description: 'Unexpected `%c`. Expected ASCII whitespace instead'
    },
    /** @type {ErrorInfo} */
    missingWhitespaceAfterDoctypeSystemKeyword: {
      reason: 'Missing whitespace after system identifier in doctype',
      description: 'Unexpected `%c`. Expected ASCII whitespace instead'
    },
    /** @type {ErrorInfo} */
    missingWhitespaceBeforeDoctypeName: {
      reason: 'Missing whitespace before doctype name',
      description: 'Unexpected `%c`. Expected ASCII whitespace instead'
    },
    /** @type {ErrorInfo} */
    missingWhitespaceBetweenAttributes: {
      reason: 'Missing whitespace between attributes',
      description: 'Unexpected `%c`. Expected ASCII whitespace instead'
    },
    /** @type {ErrorInfo} */
    missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers: {
      reason:
        'Missing whitespace between public and system identifiers in doctype',
      description: 'Unexpected `%c`. Expected ASCII whitespace instead'
    },
    /** @type {ErrorInfo} */
    nestedComment: {
      reason: 'Unexpected nested comment',
      description: 'Unexpected `<!--`. Expected `-->`'
    },
    /** @type {ErrorInfo} */
    nestedNoscriptInHead: {
      reason: 'Unexpected nested `<noscript>` in `<head>`',
      description:
        'Unexpected `<noscript>`. Expected a closing tag or a meta element',
      url: false
    },
    /** @type {ErrorInfo} */
    nonConformingDoctype: {
      reason: 'Unexpected non-conforming doctype declaration',
      description:
        'Expected `<!doctype html>` or `<!doctype html system "about:legacy-compat">`',
      url: false
    },
    /** @type {ErrorInfo} */
    nonVoidHtmlElementStartTagWithTrailingSolidus: {
      reason: 'Unexpected trailing slash on start tag of non-void element',
      description: 'Unexpected `/`. Expected `>` instead'
    },
    /** @type {ErrorInfo} */
    noncharacterCharacterReference: {
      reason:
        'Unexpected noncharacter code point referenced by character reference',
      description: 'Unexpected code point. Do not use noncharacters in HTML'
    },
    /** @type {ErrorInfo} */
    noncharacterInInputStream: {
      reason: 'Unexpected noncharacter character',
      description: 'Unexpected code point `%x`. Do not use noncharacters in HTML'
    },
    /** @type {ErrorInfo} */
    nullCharacterReference: {
      reason: 'Unexpected NULL character referenced by character reference',
      description: 'Unexpected code point. Do not use NULL characters in HTML'
    },
    /** @type {ErrorInfo} */
    openElementsLeftAfterEof: {
      reason: 'Unexpected end of file',
      description: 'Unexpected end of file. Expected closing tag instead',
      url: false
    },
    /** @type {ErrorInfo} */
    surrogateCharacterReference: {
      reason: 'Unexpected surrogate character referenced by character reference',
      description:
        'Unexpected code point. Do not use lone surrogate characters in HTML'
    },
    /** @type {ErrorInfo} */
    surrogateInInputStream: {
      reason: 'Unexpected surrogate character',
      description:
        'Unexpected code point `%x`. Do not use lone surrogate characters in HTML'
    },
    /** @type {ErrorInfo} */
    unexpectedCharacterAfterDoctypeSystemIdentifier: {
      reason: 'Invalid character after system identifier in doctype',
      description: 'Unexpected character at `%c`. Expected `>`'
    },
    /** @type {ErrorInfo} */
    unexpectedCharacterInAttributeName: {
      reason: 'Unexpected character in attribute name',
      description:
        'Unexpected `%c`. Expected whitespace, `/`, `>`, `=`, or probably an ASCII letter'
    },
    /** @type {ErrorInfo} */
    unexpectedCharacterInUnquotedAttributeValue: {
      reason: 'Unexpected character in unquoted attribute value',
      description: 'Unexpected `%c`. Quote the attribute value to include it'
    },
    /** @type {ErrorInfo} */
    unexpectedEqualsSignBeforeAttributeName: {
      reason: 'Unexpected equals sign before attribute name',
      description: 'Unexpected `%c`. Add an attribute name before it'
    },
    /** @type {ErrorInfo} */
    unexpectedNullCharacter: {
      reason: 'Unexpected NULL character',
      description:
        'Unexpected code point `%x`. Do not use NULL characters in HTML'
    },
    /** @type {ErrorInfo} */
    unexpectedQuestionMarkInsteadOfTagName: {
      reason: 'Unexpected question mark instead of tag name',
      description: 'Unexpected `%c`. Expected an ASCII letter instead'
    },
    /** @type {ErrorInfo} */
    unexpectedSolidusInTag: {
      reason: 'Unexpected slash in tag',
      description:
        'Unexpected `%c-1`. Expected it followed by `>` or in a quoted attribute value'
    },
    /** @type {ErrorInfo} */
    unknownNamedCharacterReference: {
      reason: 'Unexpected unknown named character reference',
      description:
        'Unexpected character reference. Expected known named character references'
    }
  };

  /**
   * @import {Root} from 'hast'
   * @import {ParserError} from 'parse5'
   * @import {Value} from 'vfile'
   * @import {ErrorCode, Options} from './types.js'
   */


  const base = 'https://html.spec.whatwg.org/multipage/parsing.html#parse-error-';

  const dashToCamelRe = /-[a-z]/g;
  const formatCRe = /%c(?:([+-])(\d+))?/g;
  const formatXRe = /%x/g;

  const fatalities = {2: true, 1: false, 0: null};

  /** @type {Readonly<Options>} */
  const emptyOptions$3 = {};

  /**
   * Turn serialized HTML into a hast tree.
   *
   * @param {VFile | Value} value
   *   Serialized HTML to parse.
   * @param {Readonly<Options> | null | undefined} [options]
   *   Configuration (optional).
   * @returns {Root}
   *   Tree.
   */
  function fromHtml(value, options) {
    const settings = options || emptyOptions$3;
    const {onerror} = settings;
    const file = value instanceof VFile ? value : new VFile(value);
    const parseFunction = settings.fragment ? parseFragment : parse;
    const document = String(file);
    const p5Document = parseFunction(document, {
      sourceCodeLocationInfo: true,
      // Note `parse5` types currently do not allow `undefined`.
      onParseError: settings.onerror ? internalOnerror : null,
      scriptingEnabled: false
    });

    // `parse5` returns document which are always mapped to roots.
    return /** @type {Root} */ (
      fromParse5(p5Document, {
        file,
        space: settings.space,
        verbose: settings.verbose
      })
    )

    /**
     * Handle a parse error.
     *
     * @param {ParserError} error
     *   Parse5 error.
     * @returns {undefined}
     *   Nothing.
     */
    function internalOnerror(error) {
      const {code} = error;
      const name = camelcase(code);
      const setting = settings[name];
      const config = setting ?? true;
      const level = typeof config === 'number' ? config : config ? 1 : 0;

      if (level) {
        const info = errors[name];

        const message = new VFileMessage(format(info.reason), {
          place: {
            start: {
              line: error.startLine,
              column: error.startCol,
              offset: error.startOffset
            },
            end: {
              line: error.endLine,
              column: error.endCol,
              offset: error.endOffset
            }
          },
          ruleId: code,
          source: 'hast-util-from-html'
        });

        if (file.path) {
          message.file = file.path;
          message.name = file.path + ':' + message.name;
        }

        message.fatal = fatalities[level];
        message.note = format(info.description);
        message.url = info.url === false ? undefined : base + code;
        onerror(message);
      }

      /**
       * Format a human readable string about an error.
       *
       * @param {string} value
       *   Value to format.
       * @returns {string}
       *   Formatted.
       */
      function format(value) {
        return value.replace(formatCRe, formatC).replace(formatXRe, formatX)

        /**
         * Format the character.
         *
         * @param {string} _
         *   Match.
         * @param {string} $1
         *   Sign (`-` or `+`, optional).
         * @param {string} $2
         *   Offset.
         * @returns {string}
         *   Formatted.
         */
        function formatC(_, $1, $2) {
          const offset = ($2 ? Number($2) : 0) * ($1 === '-' ? -1 : 1);
          const char = document.charAt(error.startOffset + offset);
          return visualizeCharacter(char)
        }

        /**
         * Format the character code.
         *
         * @returns {string}
         *   Formatted.
         */
        function formatX() {
          return visualizeCharacterCode(document.charCodeAt(error.startOffset))
        }
      }
    }
  }

  /**
   * Turn an error code from dash case into camelcase.
   *
   * @param {string} value
   *   Error code in dash case.
   * @returns {ErrorCode}
   *   Error code in camelcase.
   */
  function camelcase(value) {
    // This should match an error code.
    return /** @type {ErrorCode} */ (value.replace(dashToCamelRe, dashToCamel))
  }

  /**
   * Turn a dash and a letter into an uppercase letter.
   *
   * @param {string} $0
   *   Match.
   * @returns {string}
   *   Camelcased.
   */
  function dashToCamel($0) {
    return $0.charAt(1).toUpperCase()
  }

  /**
   * Show a character in a message.
   *
   * @param {string} char
   *   Character.
   * @returns {string}
   *   Formatted.
   */
  function visualizeCharacter(char) {
    return char === '`' ? '` ` `' : char
  }

  /**
   * Show a character code in a message.
   *
   * @param {number} charCode
   *   Character code.
   * @returns {string}
   *   Formatted.
   */
  function visualizeCharacterCode(charCode) {
    return '0x' + charCode.toString(16).toUpperCase()
  }

  /**
   * List of HTML void tag names.
   *
   * @type {Array<string>}
   */
  const htmlVoidElements = [
    'area',
    'base',
    'basefont',
    'bgsound',
    'br',
    'col',
    'command',
    'embed',
    'frame',
    'hr',
    'image',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ];

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
   * @typedef CoreOptions
   * @property {ReadonlyArray<string>} [subset=[]]
   *   Whether to only escape the given subset of characters.
   * @property {boolean} [escapeOnly=false]
   *   Whether to only escape possibly dangerous characters.
   *   Those characters are `"`, `&`, `'`, `<`, `>`, and `` ` ``.
   *
   * @typedef FormatOptions
   * @property {(code: number, next: number, options: CoreWithFormatOptions) => string} format
   *   Format strategy.
   *
   * @typedef {CoreOptions & FormatOptions & import('./util/format-smart.js').FormatSmartOptions} CoreWithFormatOptions
   */

  const defaultSubsetRegex = /["&'<>`]/g;
  const surrogatePairsRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  const controlCharactersRegex =
    // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
    /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
  const regexEscapeRegex = /[|\\{}()[\]^$+*?.]/g;

  /** @type {WeakMap<ReadonlyArray<string>, RegExp>} */
  const subsetToRegexCache = new WeakMap();

  /**
   * Encode certain characters in `value`.
   *
   * @param {string} value
   * @param {CoreWithFormatOptions} options
   * @returns {string}
   */
  function core(value, options) {
    value = value.replace(
      options.subset
        ? charactersToExpressionCached(options.subset)
        : defaultSubsetRegex,
      basic
    );

    if (options.subset || options.escapeOnly) {
      return value
    }

    return (
      value
        // Surrogate pairs.
        .replace(surrogatePairsRegex, surrogate)
        // BMP control characters (C0 except for LF, CR, SP; DEL; and some more
        // non-ASCII ones).
        .replace(controlCharactersRegex, basic)
    )

    /**
     * @param {string} pair
     * @param {number} index
     * @param {string} all
     */
    function surrogate(pair, index, all) {
      return options.format(
        (pair.charCodeAt(0) - 0xd800) * 0x400 +
          pair.charCodeAt(1) -
          0xdc00 +
          0x10000,
        all.charCodeAt(index + 2),
        options
      )
    }

    /**
     * @param {string} character
     * @param {number} index
     * @param {string} all
     */
    function basic(character, index, all) {
      return options.format(
        character.charCodeAt(0),
        all.charCodeAt(index + 1),
        options
      )
    }
  }

  /**
   * A wrapper function that caches the result of `charactersToExpression` with a WeakMap.
   * This can improve performance when tooling calls `charactersToExpression` repeatedly
   * with the same subset.
   *
   * @param {ReadonlyArray<string>} subset
   * @returns {RegExp}
   */
  function charactersToExpressionCached(subset) {
    let cached = subsetToRegexCache.get(subset);

    if (!cached) {
      cached = charactersToExpression(subset);
      subsetToRegexCache.set(subset, cached);
    }

    return cached
  }

  /**
   * @param {ReadonlyArray<string>} subset
   * @returns {RegExp}
   */
  function charactersToExpression(subset) {
    /** @type {Array<string>} */
    const groups = [];
    let index = -1;

    while (++index < subset.length) {
      groups.push(subset[index].replace(regexEscapeRegex, '\\$&'));
    }

    return new RegExp('(?:' + groups.join('|') + ')', 'g')
  }

  const hexadecimalRegex = /[\dA-Fa-f]/;

  /**
   * Configurable ways to encode characters as hexadecimal references.
   *
   * @param {number} code
   * @param {number} next
   * @param {boolean|undefined} omit
   * @returns {string}
   */
  function toHexadecimal(code, next, omit) {
    const value = '&#x' + code.toString(16).toUpperCase();
    return omit && next && !hexadecimalRegex.test(String.fromCharCode(next))
      ? value
      : value + ';'
  }

  const decimalRegex = /\d/;

  /**
   * Configurable ways to encode characters as decimal references.
   *
   * @param {number} code
   * @param {number} next
   * @param {boolean|undefined} omit
   * @returns {string}
   */
  function toDecimal(code, next, omit) {
    const value = '&#' + String(code);
    return omit && next && !decimalRegex.test(String.fromCharCode(next))
      ? value
      : value + ';'
  }

  /**
   * List of legacy HTML named character references that don’t need a trailing semicolon.
   *
   * @type {Array<string>}
   */
  const characterEntitiesLegacy = [
    'AElig',
    'AMP',
    'Aacute',
    'Acirc',
    'Agrave',
    'Aring',
    'Atilde',
    'Auml',
    'COPY',
    'Ccedil',
    'ETH',
    'Eacute',
    'Ecirc',
    'Egrave',
    'Euml',
    'GT',
    'Iacute',
    'Icirc',
    'Igrave',
    'Iuml',
    'LT',
    'Ntilde',
    'Oacute',
    'Ocirc',
    'Ograve',
    'Oslash',
    'Otilde',
    'Ouml',
    'QUOT',
    'REG',
    'THORN',
    'Uacute',
    'Ucirc',
    'Ugrave',
    'Uuml',
    'Yacute',
    'aacute',
    'acirc',
    'acute',
    'aelig',
    'agrave',
    'amp',
    'aring',
    'atilde',
    'auml',
    'brvbar',
    'ccedil',
    'cedil',
    'cent',
    'copy',
    'curren',
    'deg',
    'divide',
    'eacute',
    'ecirc',
    'egrave',
    'eth',
    'euml',
    'frac12',
    'frac14',
    'frac34',
    'gt',
    'iacute',
    'icirc',
    'iexcl',
    'igrave',
    'iquest',
    'iuml',
    'laquo',
    'lt',
    'macr',
    'micro',
    'middot',
    'nbsp',
    'not',
    'ntilde',
    'oacute',
    'ocirc',
    'ograve',
    'ordf',
    'ordm',
    'oslash',
    'otilde',
    'ouml',
    'para',
    'plusmn',
    'pound',
    'quot',
    'raquo',
    'reg',
    'sect',
    'shy',
    'sup1',
    'sup2',
    'sup3',
    'szlig',
    'thorn',
    'times',
    'uacute',
    'ucirc',
    'ugrave',
    'uml',
    'uuml',
    'yacute',
    'yen',
    'yuml'
  ];

  /**
   * Map of named character references from HTML 4.
   *
   * @type {Record<string, string>}
   */
  const characterEntitiesHtml4 = {
    nbsp: ' ',
    iexcl: '¡',
    cent: '¢',
    pound: '£',
    curren: '¤',
    yen: '¥',
    brvbar: '¦',
    sect: '§',
    uml: '¨',
    copy: '©',
    ordf: 'ª',
    laquo: '«',
    not: '¬',
    shy: '­',
    reg: '®',
    macr: '¯',
    deg: '°',
    plusmn: '±',
    sup2: '²',
    sup3: '³',
    acute: '´',
    micro: 'µ',
    para: '¶',
    middot: '·',
    cedil: '¸',
    sup1: '¹',
    ordm: 'º',
    raquo: '»',
    frac14: '¼',
    frac12: '½',
    frac34: '¾',
    iquest: '¿',
    Agrave: 'À',
    Aacute: 'Á',
    Acirc: 'Â',
    Atilde: 'Ã',
    Auml: 'Ä',
    Aring: 'Å',
    AElig: 'Æ',
    Ccedil: 'Ç',
    Egrave: 'È',
    Eacute: 'É',
    Ecirc: 'Ê',
    Euml: 'Ë',
    Igrave: 'Ì',
    Iacute: 'Í',
    Icirc: 'Î',
    Iuml: 'Ï',
    ETH: 'Ð',
    Ntilde: 'Ñ',
    Ograve: 'Ò',
    Oacute: 'Ó',
    Ocirc: 'Ô',
    Otilde: 'Õ',
    Ouml: 'Ö',
    times: '×',
    Oslash: 'Ø',
    Ugrave: 'Ù',
    Uacute: 'Ú',
    Ucirc: 'Û',
    Uuml: 'Ü',
    Yacute: 'Ý',
    THORN: 'Þ',
    szlig: 'ß',
    agrave: 'à',
    aacute: 'á',
    acirc: 'â',
    atilde: 'ã',
    auml: 'ä',
    aring: 'å',
    aelig: 'æ',
    ccedil: 'ç',
    egrave: 'è',
    eacute: 'é',
    ecirc: 'ê',
    euml: 'ë',
    igrave: 'ì',
    iacute: 'í',
    icirc: 'î',
    iuml: 'ï',
    eth: 'ð',
    ntilde: 'ñ',
    ograve: 'ò',
    oacute: 'ó',
    ocirc: 'ô',
    otilde: 'õ',
    ouml: 'ö',
    divide: '÷',
    oslash: 'ø',
    ugrave: 'ù',
    uacute: 'ú',
    ucirc: 'û',
    uuml: 'ü',
    yacute: 'ý',
    thorn: 'þ',
    yuml: 'ÿ',
    fnof: 'ƒ',
    Alpha: 'Α',
    Beta: 'Β',
    Gamma: 'Γ',
    Delta: 'Δ',
    Epsilon: 'Ε',
    Zeta: 'Ζ',
    Eta: 'Η',
    Theta: 'Θ',
    Iota: 'Ι',
    Kappa: 'Κ',
    Lambda: 'Λ',
    Mu: 'Μ',
    Nu: 'Ν',
    Xi: 'Ξ',
    Omicron: 'Ο',
    Pi: 'Π',
    Rho: 'Ρ',
    Sigma: 'Σ',
    Tau: 'Τ',
    Upsilon: 'Υ',
    Phi: 'Φ',
    Chi: 'Χ',
    Psi: 'Ψ',
    Omega: 'Ω',
    alpha: 'α',
    beta: 'β',
    gamma: 'γ',
    delta: 'δ',
    epsilon: 'ε',
    zeta: 'ζ',
    eta: 'η',
    theta: 'θ',
    iota: 'ι',
    kappa: 'κ',
    lambda: 'λ',
    mu: 'μ',
    nu: 'ν',
    xi: 'ξ',
    omicron: 'ο',
    pi: 'π',
    rho: 'ρ',
    sigmaf: 'ς',
    sigma: 'σ',
    tau: 'τ',
    upsilon: 'υ',
    phi: 'φ',
    chi: 'χ',
    psi: 'ψ',
    omega: 'ω',
    thetasym: 'ϑ',
    upsih: 'ϒ',
    piv: 'ϖ',
    bull: '•',
    hellip: '…',
    prime: '′',
    Prime: '″',
    oline: '‾',
    frasl: '⁄',
    weierp: '℘',
    image: 'ℑ',
    real: 'ℜ',
    trade: '™',
    alefsym: 'ℵ',
    larr: '←',
    uarr: '↑',
    rarr: '→',
    darr: '↓',
    harr: '↔',
    crarr: '↵',
    lArr: '⇐',
    uArr: '⇑',
    rArr: '⇒',
    dArr: '⇓',
    hArr: '⇔',
    forall: '∀',
    part: '∂',
    exist: '∃',
    empty: '∅',
    nabla: '∇',
    isin: '∈',
    notin: '∉',
    ni: '∋',
    prod: '∏',
    sum: '∑',
    minus: '−',
    lowast: '∗',
    radic: '√',
    prop: '∝',
    infin: '∞',
    ang: '∠',
    and: '∧',
    or: '∨',
    cap: '∩',
    cup: '∪',
    int: '∫',
    there4: '∴',
    sim: '∼',
    cong: '≅',
    asymp: '≈',
    ne: '≠',
    equiv: '≡',
    le: '≤',
    ge: '≥',
    sub: '⊂',
    sup: '⊃',
    nsub: '⊄',
    sube: '⊆',
    supe: '⊇',
    oplus: '⊕',
    otimes: '⊗',
    perp: '⊥',
    sdot: '⋅',
    lceil: '⌈',
    rceil: '⌉',
    lfloor: '⌊',
    rfloor: '⌋',
    lang: '〈',
    rang: '〉',
    loz: '◊',
    spades: '♠',
    clubs: '♣',
    hearts: '♥',
    diams: '♦',
    quot: '"',
    amp: '&',
    lt: '<',
    gt: '>',
    OElig: 'Œ',
    oelig: 'œ',
    Scaron: 'Š',
    scaron: 'š',
    Yuml: 'Ÿ',
    circ: 'ˆ',
    tilde: '˜',
    ensp: ' ',
    emsp: ' ',
    thinsp: ' ',
    zwnj: '‌',
    zwj: '‍',
    lrm: '‎',
    rlm: '‏',
    ndash: '–',
    mdash: '—',
    lsquo: '‘',
    rsquo: '’',
    sbquo: '‚',
    ldquo: '“',
    rdquo: '”',
    bdquo: '„',
    dagger: '†',
    Dagger: '‡',
    permil: '‰',
    lsaquo: '‹',
    rsaquo: '›',
    euro: '€'
  };

  /**
   * List of legacy (that don’t need a trailing `;`) named references which could,
   * depending on what follows them, turn into a different meaning
   *
   * @type {Array<string>}
   */
  const dangerous = [
    'cent',
    'copy',
    'divide',
    'gt',
    'lt',
    'not',
    'para',
    'times'
  ];

  const own$2 = {}.hasOwnProperty;

  /**
   * `characterEntitiesHtml4` but inverted.
   *
   * @type {Record<string, string>}
   */
  const characters = {};

  /** @type {string} */
  let key;

  for (key in characterEntitiesHtml4) {
    if (own$2.call(characterEntitiesHtml4, key)) {
      characters[characterEntitiesHtml4[key]] = key;
    }
  }

  const notAlphanumericRegex = /[^\dA-Za-z]/;

  /**
   * Configurable ways to encode characters as named references.
   *
   * @param {number} code
   * @param {number} next
   * @param {boolean|undefined} omit
   * @param {boolean|undefined} attribute
   * @returns {string}
   */
  function toNamed(code, next, omit, attribute) {
    const character = String.fromCharCode(code);

    if (own$2.call(characters, character)) {
      const name = characters[character];
      const value = '&' + name;

      if (
        omit &&
        characterEntitiesLegacy.includes(name) &&
        !dangerous.includes(name) &&
        (!attribute ||
          (next &&
            next !== 61 /* `=` */ &&
            notAlphanumericRegex.test(String.fromCharCode(next))))
      ) {
        return value
      }

      return value + ';'
    }

    return ''
  }

  /**
   * @typedef FormatSmartOptions
   * @property {boolean} [useNamedReferences=false]
   *   Prefer named character references (`&amp;`) where possible.
   * @property {boolean} [useShortestReferences=false]
   *   Prefer the shortest possible reference, if that results in less bytes.
   *   **Note**: `useNamedReferences` can be omitted when using `useShortestReferences`.
   * @property {boolean} [omitOptionalSemicolons=false]
   *   Whether to omit semicolons when possible.
   *   **Note**: This creates what HTML calls “parse errors” but is otherwise still valid HTML — don’t use this except when building a minifier.
   *   Omitting semicolons is possible for certain named and numeric references in some cases.
   * @property {boolean} [attribute=false]
   *   Create character references which don’t fail in attributes.
   *   **Note**: `attribute` only applies when operating dangerously with
   *   `omitOptionalSemicolons: true`.
   */


  /**
   * Configurable ways to encode a character yielding pretty or small results.
   *
   * @param {number} code
   * @param {number} next
   * @param {FormatSmartOptions} options
   * @returns {string}
   */
  function formatSmart(code, next, options) {
    let numeric = toHexadecimal(code, next, options.omitOptionalSemicolons);
    /** @type {string|undefined} */
    let named;

    if (options.useNamedReferences || options.useShortestReferences) {
      named = toNamed(
        code,
        next,
        options.omitOptionalSemicolons,
        options.attribute
      );
    }

    // Use the shortest numeric reference when requested.
    // A simple algorithm would use decimal for all code points under 100, as
    // those are shorter than hexadecimal:
    //
    // * `&#99;` vs `&#x63;` (decimal shorter)
    // * `&#100;` vs `&#x64;` (equal)
    //
    // However, because we take `next` into consideration when `omit` is used,
    // And it would be possible that decimals are shorter on bigger values as
    // well if `next` is hexadecimal but not decimal, we instead compare both.
    if (
      (options.useShortestReferences || !named) &&
      options.useShortestReferences
    ) {
      const decimal = toDecimal(code, next, options.omitOptionalSemicolons);

      if (decimal.length < numeric.length) {
        numeric = decimal;
      }
    }

    return named &&
      (!options.useShortestReferences || named.length < numeric.length)
      ? named
      : numeric
  }

  /**
   * @typedef {import('./core.js').CoreOptions & import('./util/format-smart.js').FormatSmartOptions} Options
   * @typedef {import('./core.js').CoreOptions} LightOptions
   */


  /**
   * Encode special characters in `value`.
   *
   * @param {string} value
   *   Value to encode.
   * @param {Options} [options]
   *   Configuration.
   * @returns {string}
   *   Encoded value.
   */
  function stringifyEntities(value, options) {
    return core(value, Object.assign({format: formatSmart}, options))
  }

  /**
   * @import {Comment, Parents} from 'hast'
   * @import {State} from '../index.js'
   */


  const htmlCommentRegex = /^>|^->|<!--|-->|--!>|<!-$/g;

  // Declare arrays as variables so it can be cached by `stringifyEntities`
  const bogusCommentEntitySubset = ['>'];
  const commentEntitySubset = ['<', '>'];

  /**
   * Serialize a comment.
   *
   * @param {Comment} node
   *   Node to handle.
   * @param {number | undefined} _1
   *   Index of `node` in `parent`.
   * @param {Parents | undefined} _2
   *   Parent of `node`.
   * @param {State} state
   *   Info passed around about the current state.
   * @returns {string}
   *   Serialized node.
   */
  function comment(node, _1, _2, state) {
    // See: <https://html.spec.whatwg.org/multipage/syntax.html#comments>
    return state.settings.bogusComments
      ? '<?' +
          stringifyEntities(
            node.value,
            Object.assign({}, state.settings.characterReferences, {
              subset: bogusCommentEntitySubset
            })
          ) +
          '>'
      : '<!--' + node.value.replace(htmlCommentRegex, encode) + '-->'

    /**
     * Encode a dangerous character.
     *
     * @param {string} $0
     *   Character.
     * @returns {string}
     *   Encoded character.
     */
    function encode($0) {
      return stringifyEntities(
        $0,
        Object.assign({}, state.settings.characterReferences, {
          subset: commentEntitySubset
        })
      )
    }
  }

  /**
   * @import {Doctype, Parents} from 'hast'
   * @import {State} from '../index.js'
   */

  /**
   * Serialize a doctype.
   *
   * @param {Doctype} _1
   *   Node to handle.
   * @param {number | undefined} _2
   *   Index of `node` in `parent`.
   * @param {Parents | undefined} _3
   *   Parent of `node`.
   * @param {State} state
   *   Info passed around about the current state.
   * @returns {string}
   *   Serialized node.
   */
  function doctype(_1, _2, _3, state) {
    return (
      '<!' +
      (state.settings.upperDoctype ? 'DOCTYPE' : 'doctype') +
      (state.settings.tightDoctype ? '' : ' ') +
      'html>'
    )
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

  /**
   * @typedef {import('hast').Nodes} Nodes
   */

  // HTML whitespace expression.
  // See <https://infra.spec.whatwg.org/#ascii-whitespace>.
  const re = /[ \t\n\f\r]/g;

  /**
   * Check if the given value is *inter-element whitespace*.
   *
   * @param {Nodes | string} thing
   *   Thing to check (`Node` or `string`).
   * @returns {boolean}
   *   Whether the `value` is inter-element whitespace (`boolean`): consisting of
   *   zero or more of space, tab (`\t`), line feed (`\n`), carriage return
   *   (`\r`), or form feed (`\f`); if a node is passed it must be a `Text` node,
   *   whose `value` field is checked.
   */
  function whitespace(thing) {
    return typeof thing === 'object'
      ? thing.type === 'text'
        ? empty$1(thing.value)
        : false
      : empty$1(thing)
  }

  /**
   * @param {string} value
   * @returns {boolean}
   */
  function empty$1(value) {
    return value.replace(re, '') === ''
  }

  /**
   * @import {Parents, RootContent} from 'hast'
   */


  const siblingAfter = siblings(1);
  const siblingBefore = siblings(-1);

  /** @type {Array<RootContent>} */
  const emptyChildren$1 = [];

  /**
   * Factory to check siblings in a direction.
   *
   * @param {number} increment
   *   Direction.
   * @returns {typeof sibling}
   *   Check.
   */
  function siblings(increment) {
    return sibling

    /**
     * Find applicable siblings in a direction.
     *
     * @template {Parents} Parent
     *   Parent type.
     * @param {Parent | undefined} parent
     *   Parent.
     * @param {number | undefined} index
     *   Index of child in `parent`.
     * @param {boolean | undefined} [includeWhitespace=false]
     *   Whether to include whitespace (default: `false`).
     * @returns {Parent extends {children: Array<infer Child>} ? Child | undefined : never}
     *   Child of parent.
     */
    function sibling(parent, index, includeWhitespace) {
      const siblings = parent ? parent.children : emptyChildren$1;
      let offset = (index || 0) + increment;
      let next = siblings[offset];

      if (!includeWhitespace) {
        while (next && whitespace(next)) {
          offset += increment;
          next = siblings[offset];
        }
      }

      // @ts-expect-error: it’s a correct child.
      return next
    }
  }

  /**
   * @import {Element, Parents} from 'hast'
   */

  /**
   * @callback OmitHandle
   *   Check if a tag can be omitted.
   * @param {Element} element
   *   Element to check.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether to omit a tag.
   */

  const own$1 = {}.hasOwnProperty;

  /**
   * Factory to check if a given node can have a tag omitted.
   *
   * @param {Record<string, OmitHandle>} handlers
   *   Omission handlers, where each key is a tag name, and each value is the
   *   corresponding handler.
   * @returns {OmitHandle}
   *   Whether to omit a tag of an element.
   */
  function omission(handlers) {
    return omit

    /**
     * Check if a given node can have a tag omitted.
     *
     * @type {OmitHandle}
     */
    function omit(node, index, parent) {
      return (
        own$1.call(handlers, node.tagName) &&
        handlers[node.tagName](node, index, parent)
      )
    }
  }

  /**
   * @import {Element, Parents} from 'hast'
   */


  const closing = omission({
    body: body$1,
    caption: headOrColgroupOrCaption,
    colgroup: headOrColgroupOrCaption,
    dd,
    dt,
    head: headOrColgroupOrCaption,
    html: html$1,
    li,
    optgroup,
    option,
    p,
    rp: rubyElement,
    rt: rubyElement,
    tbody: tbody$1,
    td: cells,
    tfoot,
    th: cells,
    thead,
    tr
  });

  /**
   * Macro for `</head>`, `</colgroup>`, and `</caption>`.
   *
   * @param {Element} _
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the closing tag can be omitted.
   */
  function headOrColgroupOrCaption(_, index, parent) {
    const next = siblingAfter(parent, index, true);
    return (
      !next ||
      (next.type !== 'comment' &&
        !(next.type === 'text' && whitespace(next.value.charAt(0))))
    )
  }

  /**
   * Whether to omit `</html>`.
   *
   * @param {Element} _
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the closing tag can be omitted.
   */
  function html$1(_, index, parent) {
    const next = siblingAfter(parent, index);
    return !next || next.type !== 'comment'
  }

  /**
   * Whether to omit `</body>`.
   *
   * @param {Element} _
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the closing tag can be omitted.
   */
  function body$1(_, index, parent) {
    const next = siblingAfter(parent, index);
    return !next || next.type !== 'comment'
  }

  /**
   * Whether to omit `</p>`.
   *
   * @param {Element} _
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the closing tag can be omitted.
   */
  function p(_, index, parent) {
    const next = siblingAfter(parent, index);
    return next
      ? next.type === 'element' &&
          (next.tagName === 'address' ||
            next.tagName === 'article' ||
            next.tagName === 'aside' ||
            next.tagName === 'blockquote' ||
            next.tagName === 'details' ||
            next.tagName === 'div' ||
            next.tagName === 'dl' ||
            next.tagName === 'fieldset' ||
            next.tagName === 'figcaption' ||
            next.tagName === 'figure' ||
            next.tagName === 'footer' ||
            next.tagName === 'form' ||
            next.tagName === 'h1' ||
            next.tagName === 'h2' ||
            next.tagName === 'h3' ||
            next.tagName === 'h4' ||
            next.tagName === 'h5' ||
            next.tagName === 'h6' ||
            next.tagName === 'header' ||
            next.tagName === 'hgroup' ||
            next.tagName === 'hr' ||
            next.tagName === 'main' ||
            next.tagName === 'menu' ||
            next.tagName === 'nav' ||
            next.tagName === 'ol' ||
            next.tagName === 'p' ||
            next.tagName === 'pre' ||
            next.tagName === 'section' ||
            next.tagName === 'table' ||
            next.tagName === 'ul')
      : !parent ||
          // Confusing parent.
          !(
            parent.type === 'element' &&
            (parent.tagName === 'a' ||
              parent.tagName === 'audio' ||
              parent.tagName === 'del' ||
              parent.tagName === 'ins' ||
              parent.tagName === 'map' ||
              parent.tagName === 'noscript' ||
              parent.tagName === 'video' ||
              // Custom element.
              parent.tagName.includes('-'))
          )
  }

  /**
   * Whether to omit `</li>`.
   *
   * @param {Element} _
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the closing tag can be omitted.
   */
  function li(_, index, parent) {
    const next = siblingAfter(parent, index);
    return !next || (next.type === 'element' && next.tagName === 'li')
  }

  /**
   * Whether to omit `</dt>`.
   *
   * @param {Element} _
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the closing tag can be omitted.
   */
  function dt(_, index, parent) {
    const next = siblingAfter(parent, index);
    return Boolean(
      next &&
      next.type === 'element' &&
      (next.tagName === 'dt' || next.tagName === 'dd')
    )
  }

  /**
   * Whether to omit `</dd>`.
   *
   * @param {Element} _
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the closing tag can be omitted.
   */
  function dd(_, index, parent) {
    const next = siblingAfter(parent, index);
    return (
      !next ||
      (next.type === 'element' &&
        (next.tagName === 'dt' || next.tagName === 'dd'))
    )
  }

  /**
   * Whether to omit `</rt>` or `</rp>`.
   *
   * @param {Element} _
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the closing tag can be omitted.
   */
  function rubyElement(_, index, parent) {
    const next = siblingAfter(parent, index);
    return (
      !next ||
      (next.type === 'element' &&
        (next.tagName === 'rp' || next.tagName === 'rt'))
    )
  }

  /**
   * Whether to omit `</optgroup>`.
   *
   * @param {Element} _
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the closing tag can be omitted.
   */
  function optgroup(_, index, parent) {
    const next = siblingAfter(parent, index);
    return !next || (next.type === 'element' && next.tagName === 'optgroup')
  }

  /**
   * Whether to omit `</option>`.
   *
   * @param {Element} _
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the closing tag can be omitted.
   */
  function option(_, index, parent) {
    const next = siblingAfter(parent, index);
    return (
      !next ||
      (next.type === 'element' &&
        (next.tagName === 'option' || next.tagName === 'optgroup'))
    )
  }

  /**
   * Whether to omit `</thead>`.
   *
   * @param {Element} _
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the closing tag can be omitted.
   */
  function thead(_, index, parent) {
    const next = siblingAfter(parent, index);
    return Boolean(
      next &&
      next.type === 'element' &&
      (next.tagName === 'tbody' || next.tagName === 'tfoot')
    )
  }

  /**
   * Whether to omit `</tbody>`.
   *
   * @param {Element} _
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the closing tag can be omitted.
   */
  function tbody$1(_, index, parent) {
    const next = siblingAfter(parent, index);
    return (
      !next ||
      (next.type === 'element' &&
        (next.tagName === 'tbody' || next.tagName === 'tfoot'))
    )
  }

  /**
   * Whether to omit `</tfoot>`.
   *
   * @param {Element} _
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the closing tag can be omitted.
   */
  function tfoot(_, index, parent) {
    return !siblingAfter(parent, index)
  }

  /**
   * Whether to omit `</tr>`.
   *
   * @param {Element} _
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the closing tag can be omitted.
   */
  function tr(_, index, parent) {
    const next = siblingAfter(parent, index);
    return !next || (next.type === 'element' && next.tagName === 'tr')
  }

  /**
   * Whether to omit `</td>` or `</th>`.
   *
   * @param {Element} _
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the closing tag can be omitted.
   */
  function cells(_, index, parent) {
    const next = siblingAfter(parent, index);
    return (
      !next ||
      (next.type === 'element' &&
        (next.tagName === 'td' || next.tagName === 'th'))
    )
  }

  /**
   * @import {Element, Parents} from 'hast'
   */


  const opening = omission({
    body,
    colgroup,
    head,
    html,
    tbody
  });

  /**
   * Whether to omit `<html>`.
   *
   * @param {Element} node
   *   Element.
   * @returns {boolean}
   *   Whether the opening tag can be omitted.
   */
  function html(node) {
    const head = siblingAfter(node, -1);
    return !head || head.type !== 'comment'
  }

  /**
   * Whether to omit `<head>`.
   *
   * @param {Element} node
   *   Element.
   * @returns {boolean}
   *   Whether the opening tag can be omitted.
   */
  function head(node) {
    /** @type {Set<string>} */
    const seen = new Set();

    // Whether `srcdoc` or not,
    // make sure the content model at least doesn’t have too many `base`s/`title`s.
    for (const child of node.children) {
      if (
        child.type === 'element' &&
        (child.tagName === 'base' || child.tagName === 'title')
      ) {
        if (seen.has(child.tagName)) return false
        seen.add(child.tagName);
      }
    }

    // “May be omitted if the element is empty,
    // or if the first thing inside the head element is an element.”
    const child = node.children[0];
    return !child || child.type === 'element'
  }

  /**
   * Whether to omit `<body>`.
   *
   * @param {Element} node
   *   Element.
   * @returns {boolean}
   *   Whether the opening tag can be omitted.
   */
  function body(node) {
    const head = siblingAfter(node, -1, true);

    return (
      !head ||
      (head.type !== 'comment' &&
        !(head.type === 'text' && whitespace(head.value.charAt(0))) &&
        !(
          head.type === 'element' &&
          (head.tagName === 'meta' ||
            head.tagName === 'link' ||
            head.tagName === 'script' ||
            head.tagName === 'style' ||
            head.tagName === 'template')
        ))
    )
  }

  /**
   * Whether to omit `<colgroup>`.
   * The spec describes some logic for the opening tag, but it’s easier to
   * implement in the closing tag, to the same effect, so we handle it there
   * instead.
   *
   * @param {Element} node
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the opening tag can be omitted.
   */
  function colgroup(node, index, parent) {
    const previous = siblingBefore(parent, index);

    // Previous colgroup was already omitted.
    if (
      parent &&
      previous &&
      previous.type === 'element' &&
      previous.tagName === 'colgroup' &&
      closing(previous, parent.children.indexOf(previous), parent)
    ) {
      return false
    }

    const head = siblingAfter(node, -1, true);

    return Boolean(head && head.type === 'element' && head.tagName === 'col')
  }

  /**
   * Whether to omit `<tbody>`.
   *
   * @param {Element} node
   *   Element.
   * @param {number | undefined} index
   *   Index of element in parent.
   * @param {Parents | undefined} parent
   *   Parent of element.
   * @returns {boolean}
   *   Whether the opening tag can be omitted.
   */
  function tbody(node, index, parent) {
    const previous = siblingBefore(parent, index);

    // Previous table section was already omitted.
    if (
      parent &&
      previous &&
      previous.type === 'element' &&
      (previous.tagName === 'thead' || previous.tagName === 'tbody') &&
      closing(previous, parent.children.indexOf(previous), parent)
    ) {
      return false
    }

    const head = siblingAfter(node, -1);

    return Boolean(head && head.type === 'element' && head.tagName === 'tr')
  }

  /**
   * @import {Element, Parents, Properties} from 'hast'
   * @import {State} from '../index.js'
   */


  /**
   * Maps of subsets.
   *
   * Each value is a matrix of tuples.
   * The value at `0` causes parse errors, the value at `1` is valid.
   * Of both, the value at `0` is unsafe, and the value at `1` is safe.
   *
   * @type {Record<'double' | 'name' | 'single' | 'unquoted', Array<[Array<string>, Array<string>]>>}
   */
  const constants = {
    // See: <https://html.spec.whatwg.org/#attribute-name-state>.
    name: [
      ['\t\n\f\r &/=>'.split(''), '\t\n\f\r "&\'/=>`'.split('')],
      ['\0\t\n\f\r "&\'/<=>'.split(''), '\0\t\n\f\r "&\'/<=>`'.split('')]
    ],
    // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
    unquoted: [
      ['\t\n\f\r &>'.split(''), '\0\t\n\f\r "&\'<=>`'.split('')],
      ['\0\t\n\f\r "&\'<=>`'.split(''), '\0\t\n\f\r "&\'<=>`'.split('')]
    ],
    // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
    single: [
      ["&'".split(''), '"&\'`'.split('')],
      ["\0&'".split(''), '\0"&\'`'.split('')]
    ],
    // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
    double: [
      ['"&'.split(''), '"&\'`'.split('')],
      ['\0"&'.split(''), '\0"&\'`'.split('')]
    ]
  };

  /**
   * SVG elements whose content is HTML.
   *
   * @type {ReadonlySet<string>}
   */
  const htmlIntegrationPoints = new Set(['desc', 'foreignObject', 'title']);

  /**
   * Serialize an element node.
   *
   * @param {Element} node
   *   Node to handle.
   * @param {number | undefined} index
   *   Index of `node` in `parent`.
   * @param {Parents | undefined} parent
   *   Parent of `node`.
   * @param {State} state
   *   Info passed around about the current state.
   * @returns {string}
   *   Serialized node.
   */
  function element$1(node, index, parent, state) {
    const {schema} = state;
    const omit = schema.space === 'svg' ? false : state.settings.omitOptionalTags;
    let selfClosing =
      schema.space === 'svg'
        ? state.settings.closeEmptyElements
        : state.settings.voids.includes(node.tagName.toLowerCase());
    /** @type {Array<string>} */
    const parts = [];

    if (schema.space === 'html' && node.tagName === 'svg') {
      state.schema = svg;
    }

    const attributes = serializeAttributes(state, node.properties);

    // HTML integration points is HTML.
    // See: <https://html.spec.whatwg.org/#html-integration-point>.
    if (state.schema.space === 'svg' && htmlIntegrationPoints.has(node.tagName)) {
      state.schema = html$2;
    }

    const content = state.all(
      schema.space === 'html' && node.tagName === 'template' ? node.content : node
    );

    state.schema = schema;

    // If the node is categorised as void, but it has children, remove the
    // categorisation.
    // This enables for example `menuitem`s, which are void in W3C HTML but not
    // void in WHATWG HTML, to be stringified properly.
    // Note: `menuitem` has since been removed from the HTML spec, and so is no
    // longer void.
    if (content) selfClosing = false;

    if (attributes || !omit || !opening(node, index, parent)) {
      parts.push('<', node.tagName, attributes ? ' ' + attributes : '');

      if (
        selfClosing &&
        (schema.space === 'svg' || state.settings.closeSelfClosing)
      ) {
        const last = attributes.charAt(attributes.length - 1);
        if (
          !state.settings.tightSelfClosing ||
          last === '/' ||
          (last && last !== '"' && last !== "'")
        ) {
          parts.push(' ');
        }

        parts.push('/');
      }

      parts.push('>');
    }

    parts.push(content);

    if (!selfClosing && (!omit || !closing(node, index, parent))) {
      parts.push('</' + node.tagName + '>');
    }

    return parts.join('')
  }

  /**
   * Serialize all attributes.
   *
   * @param {State} state
   *   Info passed around about the current state.
   * @param {Properties | null | undefined} properties
   *   Properties.
   * @returns {string}
   *   Serialized attributes.
   */
  function serializeAttributes(state, properties) {
    /** @type {Array<string>} */
    const values = [];
    let index = -1;
    /** @type {string} */
    let key;

    if (properties) {
      for (key in properties) {
        if (properties[key] !== null && properties[key] !== undefined) {
          const value = serializeAttribute(state, key, properties[key]);
          if (value) values.push(value);
        }
      }
    }

    while (++index < values.length) {
      const last = state.settings.tightAttributes
        ? values[index].charAt(values[index].length - 1)
        : undefined;

      // In tight mode, don’t add a space after quoted attributes.
      if (index !== values.length - 1 && last !== '"' && last !== "'") {
        values[index] += ' ';
      }
    }

    return values.join('')
  }

  /**
   * Serialize an attribute.
   *
   * @param {State} state
   *   Info passed around about the current state.
   * @param {string} key
   *   Property name.
   * @param {Properties[keyof Properties]} value
   *   Property value.
   * @returns {string}
   *   Serialized attribute.
   */
  function serializeAttribute(state, key, value) {
    const info = find(state.schema, key);
    const x =
      state.settings.allowParseErrors && state.schema.space === 'html' ? 0 : 1;
    const y = state.settings.allowDangerousCharacters ? 0 : 1;

    if (info.overloadedBoolean && (value === info.attribute || value === '')) {
      value = true;
    } else if (
      (info.boolean || info.overloadedBoolean) &&
      (typeof value !== 'string' || value === info.attribute || value === '')
    ) {
      value = Boolean(value);
    }

    if (
      value === null ||
      value === undefined ||
      value === false ||
      (typeof value === 'number' && Number.isNaN(value))
    ) {
      return ''
    }

    const name = stringifyEntities(
      info.attribute,
      Object.assign({}, state.settings.characterReferences, {
        // Always encode without parse errors in non-HTML.
        subset: constants.name[x][y]
      })
    );

    // No value.
    // There is currently only one boolean property in SVG: `[download]` on
    // `<a>`.
    // This property does not seem to work in browsers (Firefox, Safari, Chrome),
    // so I can’t test if dropping the value works.
    // But I assume that it should:
    //
    // ```html
    // <!doctype html>
    // <svg viewBox="0 0 100 100">
    //   <a href=https://example.com download>
    //     <circle cx=50 cy=40 r=35 />
    //   </a>
    // </svg>
    // ```
    //
    // See: <https://github.com/wooorm/property-information/blob/main/lib/svg.js>
    if (value === true) return name

    // `spaces` doesn’t accept a second argument, but it’s given here just to
    // keep the code cleaner.
    value = Array.isArray(value)
      ? (info.commaSeparated ? stringify$1 : stringify)(value, {
          padLeft: !state.settings.tightCommaSeparatedLists
        })
      : String(value);

    if (state.settings.collapseEmptyAttributes && !value) return name

    /** @type {string | undefined} */
    let result;

    // Check unquoted value.
    if (state.settings.preferUnquoted) {
      result = stringifyEntities(
        value,
        Object.assign({}, state.settings.characterReferences, {
          attribute: true,
          subset: constants.unquoted[x][y]
        })
      );
    }

    // If we don’t want unquoted, or if `value` contains character references when
    // unquoted…
    if (result !== value) {
      let {quote} = state;

      // If the alternative is less common than `quote`, switch.
      if (
        state.settings.quoteSmart &&
        ccount(value, quote) > ccount(value, state.alternative)
      ) {
        quote = state.alternative;
      }

      result =
        quote +
        stringifyEntities(
          value,
          Object.assign({}, state.settings.characterReferences, {
            // Always encode without parse errors in non-HTML.
            subset: (quote === "'" ? constants.single : constants.double)[x][y],
            attribute: true
          })
        ) +
        quote;
    }

    // Don’t add a `=` for unquoted empties.
    return name + (result ? '=' + result : result)
  }

  /**
   * @import {Parents, Text} from 'hast'
   * @import {Raw} from 'mdast-util-to-hast'
   * @import {State} from '../index.js'
   */


  // Declare array as variable so it can be cached by `stringifyEntities`
  const textEntitySubset = ['<', '&'];

  /**
   * Serialize a text node.
   *
   * @param {Raw | Text} node
   *   Node to handle.
   * @param {number | undefined} _
   *   Index of `node` in `parent`.
   * @param {Parents | undefined} parent
   *   Parent of `node`.
   * @param {State} state
   *   Info passed around about the current state.
   * @returns {string}
   *   Serialized node.
   */
  function text(node, _, parent, state) {
    // Check if content of `node` should be escaped.
    return parent &&
      parent.type === 'element' &&
      (parent.tagName === 'script' || parent.tagName === 'style')
      ? node.value
      : stringifyEntities(
          node.value,
          Object.assign({}, state.settings.characterReferences, {
            subset: textEntitySubset
          })
        )
  }

  /**
   * @import {Parents} from 'hast'
   * @import {Raw} from 'mdast-util-to-hast'
   * @import {State} from '../index.js'
   */


  /**
   * Serialize a raw node.
   *
   * @param {Raw} node
   *   Node to handle.
   * @param {number | undefined} index
   *   Index of `node` in `parent`.
   * @param {Parents | undefined} parent
   *   Parent of `node`.
   * @param {State} state
   *   Info passed around about the current state.
   * @returns {string}
   *   Serialized node.
   */
  function raw(node, index, parent, state) {
    return state.settings.allowDangerousHtml
      ? node.value
      : text(node, index, parent, state)
  }

  /**
   * @import {Parents, Root} from 'hast'
   * @import {State} from '../index.js'
   */

  /**
   * Serialize a root.
   *
   * @param {Root} node
   *   Node to handle.
   * @param {number | undefined} _1
   *   Index of `node` in `parent`.
   * @param {Parents | undefined} _2
   *   Parent of `node`.
   * @param {State} state
   *   Info passed around about the current state.
   * @returns {string}
   *   Serialized node.
   */
  function root(node, _1, _2, state) {
    return state.all(node)
  }

  /**
   * @import {Nodes, Parents} from 'hast'
   * @import {State} from '../index.js'
   */


  /**
   * @type {(node: Nodes, index: number | undefined, parent: Parents | undefined, state: State) => string}
   */
  const handle = zwitch('type', {
    invalid,
    unknown,
    handlers: {comment, doctype, element: element$1, raw, root, text}
  });

  /**
   * Fail when a non-node is found in the tree.
   *
   * @param {unknown} node
   *   Unknown value.
   * @returns {never}
   *   Never.
   */
  function invalid(node) {
    throw new Error('Expected node, not `' + node + '`')
  }

  /**
   * Fail when a node with an unknown type is found in the tree.
   *
   * @param {unknown} node_
   *   Unknown node.
   * @returns {never}
   *   Never.
   */
  function unknown(node_) {
    // `type` is guaranteed by runtime JS.
    const node = /** @type {Nodes} */ (node_);
    throw new Error('Cannot compile unknown node `' + node.type + '`')
  }

  /**
   * @import {Nodes, Parents, RootContent} from 'hast'
   * @import {Schema} from 'property-information'
   * @import {Options as StringifyEntitiesOptions} from 'stringify-entities'
   */


  /** @type {Options} */
  const emptyOptions$2 = {};

  /** @type {CharacterReferences} */
  const emptyCharacterReferences = {};

  /** @type {Array<never>} */
  const emptyChildren = [];

  /**
   * Serialize hast as HTML.
   *
   * @param {Array<RootContent> | Nodes} tree
   *   Tree to serialize.
   * @param {Options | null | undefined} [options]
   *   Configuration (optional).
   * @returns {string}
   *   Serialized HTML.
   */
  function toHtml(tree, options) {
    const options_ = emptyOptions$2;
    const quote = options_.quote || '"';

    if (quote !== '"' && quote !== "'") {
      throw new Error('Invalid quote `' + quote + '`, expected `\'` or `"`')
    }

    const alternative = quote === '"' ? "'" : '"';

    /** @type {State} */
    const state = {
      one,
      all: all$1,
      settings: {
        omitOptionalTags: options_.omitOptionalTags || false,
        allowParseErrors: options_.allowParseErrors || false,
        allowDangerousCharacters: options_.allowDangerousCharacters || false,
        quoteSmart: options_.quoteSmart || false,
        preferUnquoted: options_.preferUnquoted || false,
        tightAttributes: options_.tightAttributes || false,
        upperDoctype: options_.upperDoctype || false,
        tightDoctype: options_.tightDoctype || false,
        bogusComments: options_.bogusComments || false,
        tightCommaSeparatedLists: options_.tightCommaSeparatedLists || false,
        tightSelfClosing: options_.tightSelfClosing || false,
        collapseEmptyAttributes: options_.collapseEmptyAttributes || false,
        allowDangerousHtml: options_.allowDangerousHtml || false,
        voids: options_.voids || htmlVoidElements,
        characterReferences:
          options_.characterReferences || emptyCharacterReferences,
        closeSelfClosing: options_.closeSelfClosing || false,
        closeEmptyElements: options_.closeEmptyElements || false
      },
      schema: options_.space === 'svg' ? svg : html$2,
      quote,
      alternative
    };

    return state.one(
      Array.isArray(tree) ? {type: 'root', children: tree} : tree,
      undefined,
      undefined
    )
  }

  /**
   * Serialize a node.
   *
   * @this {State}
   *   Info passed around about the current state.
   * @param {Nodes} node
   *   Node to handle.
   * @param {number | undefined} index
   *   Index of `node` in `parent`.
   * @param {Parents | undefined} parent
   *   Parent of `node`.
   * @returns {string}
   *   Serialized node.
   */
  function one(node, index, parent) {
    return handle(node, index, parent, this)
  }

  /**
   * Serialize all children of `parent`.
   *
   * @this {State}
   *   Info passed around about the current state.
   * @param {Parents | undefined} parent
   *   Parent whose children to serialize.
   * @returns {string}
   *   Serialized children.
   */
  function all$1(parent) {
    /** @type {Array<string>} */
    const results = [];
    const children = (parent && parent.children) || emptyChildren;
    let index = -1;

    while (++index < children.length) {
      results[index] = this.one(children[index], index, parent);
    }

    return results.join('')
  }

  /**
   * @typedef {import('hast').Element} Element
   * @typedef {import('hast').Parents} Parents
   */

  /**
   * @template Fn
   * @template Fallback
   * @typedef {Fn extends (value: any) => value is infer Thing ? Thing : Fallback} Predicate
   */

  /**
   * @callback Check
   *   Check that an arbitrary value is an element.
   * @param {unknown} this
   *   Context object (`this`) to call `test` with
   * @param {unknown} [element]
   *   Anything (typically a node).
   * @param {number | null | undefined} [index]
   *   Position of `element` in its parent.
   * @param {Parents | null | undefined} [parent]
   *   Parent of `element`.
   * @returns {boolean}
   *   Whether this is an element and passes a test.
   *
   * @typedef {Array<TestFunction | string> | TestFunction | string | null | undefined} Test
   *   Check for an arbitrary element.
   *
   *   * when `string`, checks that the element has that tag name
   *   * when `function`, see `TestFunction`
   *   * when `Array`, checks if one of the subtests pass
   *
   * @callback TestFunction
   *   Check if an element passes a test.
   * @param {unknown} this
   *   The given context.
   * @param {Element} element
   *   An element.
   * @param {number | undefined} [index]
   *   Position of `element` in its parent.
   * @param {Parents | undefined} [parent]
   *   Parent of `element`.
   * @returns {boolean | undefined | void}
   *   Whether this element passes the test.
   *
   *   Note: `void` is included until TS sees no return as `undefined`.
   */

  /**
   * Check if `element` is an `Element` and whether it passes the given test.
   *
   * @param element
   *   Thing to check, typically `element`.
   * @param test
   *   Check for a specific element.
   * @param index
   *   Position of `element` in its parent.
   * @param parent
   *   Parent of `element`.
   * @param context
   *   Context object (`this`) to call `test` with.
   * @returns
   *   Whether `element` is an `Element` and passes a test.
   * @throws
   *   When an incorrect `test`, `index`, or `parent` is given; there is no error
   *   thrown when `element` is not a node or not an element.
   */
  const isElement =
    // Note: overloads in JSDoc can’t yet use different `@template`s.
    /**
     * @type {(
     *   (<Condition extends TestFunction>(element: unknown, test: Condition, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element & Predicate<Condition, Element>) &
     *   (<Condition extends string>(element: unknown, test: Condition, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element & {tagName: Condition}) &
     *   ((element?: null | undefined) => false) &
     *   ((element: unknown, test?: null | undefined, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element) &
     *   ((element: unknown, test?: Test, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => boolean)
     * )}
     */
    (
      /**
       * @param {unknown} [element]
       * @param {Test | undefined} [test]
       * @param {number | null | undefined} [index]
       * @param {Parents | null | undefined} [parent]
       * @param {unknown} [context]
       * @returns {boolean}
       */
      // eslint-disable-next-line max-params
      function (element, test, index, parent, context) {
        const check = convertElement(test);

        return looksLikeAnElement(element)
          ? check.call(context, element, index, parent)
          : false
      }
    );

  /**
   * Generate a check from a test.
   *
   * Useful if you’re going to test many nodes, for example when creating a
   * utility where something else passes a compatible test.
   *
   * The created function is a bit faster because it expects valid input only:
   * an `element`, `index`, and `parent`.
   *
   * @param test
   *   A test for a specific element.
   * @returns
   *   A check.
   */
  const convertElement =
    // Note: overloads in JSDoc can’t yet use different `@template`s.
    /**
     * @type {(
     *   (<Condition extends TestFunction>(test: Condition) => (element: unknown, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element & Predicate<Condition, Element>) &
     *   (<Condition extends string>(test: Condition) => (element: unknown, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element & {tagName: Condition}) &
     *   ((test?: null | undefined) => (element?: unknown, index?: number | null | undefined, parent?: Parents | null | undefined, context?: unknown) => element is Element) &
     *   ((test?: Test) => Check)
     * )}
     */
    (
      /**
       * @param {Test | null | undefined} [test]
       * @returns {Check}
       */
      function (test) {
        if (test === null || test === undefined) {
          return element
        }

        if (typeof test === 'string') {
          return tagNameFactory(test)
        }

        // Assume array.
        if (typeof test === 'object') {
          return anyFactory$1(test)
        }

        if (typeof test === 'function') {
          return castFactory$1(test)
        }

        throw new Error('Expected function, string, or array as `test`')
      }
    );

  /**
   * Handle multiple tests.
   *
   * @param {Array<TestFunction | string>} tests
   * @returns {Check}
   */
  function anyFactory$1(tests) {
    /** @type {Array<Check>} */
    const checks = [];
    let index = -1;

    while (++index < tests.length) {
      checks[index] = convertElement(tests[index]);
    }

    return castFactory$1(any)

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
   * Turn a string into a test for an element with a certain type.
   *
   * @param {string} check
   * @returns {Check}
   */
  function tagNameFactory(check) {
    return castFactory$1(tagName)

    /**
     * @param {Element} element
     * @returns {boolean}
     */
    function tagName(element) {
      return element.tagName === check
    }
  }

  /**
   * Turn a custom test into a test for an element that passes that test.
   *
   * @param {TestFunction} testFunction
   * @returns {Check}
   */
  function castFactory$1(testFunction) {
    return check

    /**
     * @this {unknown}
     * @type {Check}
     */
    function check(value, index, parent) {
      return Boolean(
        looksLikeAnElement(value) &&
          testFunction.call(
            this,
            value,
            typeof index === 'number' ? index : undefined,
            parent || undefined
          )
      )
    }
  }

  /**
   * Make sure something is an element.
   *
   * @param {unknown} element
   * @returns {element is Element}
   */
  function element(element) {
    return Boolean(
      element &&
        typeof element === 'object' &&
        'type' in element &&
        element.type === 'element' &&
        'tagName' in element &&
        typeof element.tagName === 'string'
    )
  }

  /**
   * @param {unknown} value
   * @returns {value is Element}
   */
  function looksLikeAnElement(value) {
    return (
      value !== null &&
      typeof value === 'object' &&
      'type' in value &&
      'tagName' in value
    )
  }

  /**
   * Check if a node is a *embedded content*.
   *
   * @param value
   *   Thing to check (typically `Node`).
   * @returns
   *   Whether `value` is an element considered embedded content.
   *
   *   The elements `audio`, `canvas`, `embed`, `iframe`, `img`, `math`,
   *   `object`, `picture`, `svg`, and `video` are embedded content.
   */
  const embedded = convertElement(
    /**
     * @param element
     * @returns {element is {tagName: 'audio' | 'canvas' | 'embed' | 'iframe' | 'img' | 'math' | 'object' | 'picture' | 'svg' | 'video'}}
     */
    function (element) {
      return (
        element.tagName === 'audio' ||
        element.tagName === 'canvas' ||
        element.tagName === 'embed' ||
        element.tagName === 'iframe' ||
        element.tagName === 'img' ||
        element.tagName === 'math' ||
        element.tagName === 'object' ||
        element.tagName === 'picture' ||
        element.tagName === 'svg' ||
        element.tagName === 'video'
      )
    }
  );

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
          return ok
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

  function ok() {
    return true
  }

  /**
   * @param {unknown} value
   * @returns {value is Node}
   */
  function looksLikeANode(value) {
    return value !== null && typeof value === 'object' && 'type' in value
  }

  // See: <https://html.spec.whatwg.org/#the-css-user-agent-style-sheet-and-presentational-hints>
  const blocks$1 = [
    'address', // Flow content.
    'article', // Sections and headings.
    'aside', // Sections and headings.
    'blockquote', // Flow content.
    'body', // Page.
    'br', // Contribute whitespace intrinsically.
    'caption', // Similar to block.
    'center', // Flow content, legacy.
    'col', // Similar to block.
    'colgroup', // Similar to block.
    'dd', // Lists.
    'dialog', // Flow content.
    'dir', // Lists, legacy.
    'div', // Flow content.
    'dl', // Lists.
    'dt', // Lists.
    'figcaption', // Flow content.
    'figure', // Flow content.
    'footer', // Flow content.
    'form', // Flow content.
    'h1', // Sections and headings.
    'h2', // Sections and headings.
    'h3', // Sections and headings.
    'h4', // Sections and headings.
    'h5', // Sections and headings.
    'h6', // Sections and headings.
    'head', // Page.
    'header', // Flow content.
    'hgroup', // Sections and headings.
    'hr', // Flow content.
    'html', // Page.
    'legend', // Flow content.
    'li', // Block-like.
    'li', // Similar to block.
    'listing', // Flow content, legacy
    'main', // Flow content.
    'menu', // Lists.
    'nav', // Sections and headings.
    'ol', // Lists.
    'optgroup', // Similar to block.
    'option', // Similar to block.
    'p', // Flow content.
    'plaintext', // Flow content, legacy
    'pre', // Flow content.
    'section', // Sections and headings.
    'summary', // Similar to block.
    'table', // Similar to block.
    'tbody', // Similar to block.
    'td', // Block-like.
    'td', // Similar to block.
    'tfoot', // Similar to block.
    'th', // Block-like.
    'th', // Similar to block.
    'thead', // Similar to block.
    'tr', // Similar to block.
    'ul', // Lists.
    'wbr', // Contribute whitespace intrinsically.
    'xmp' // Flow content, legacy
  ];

  const content$1 = [
    // Form.
    'button',
    'input',
    'select',
    'textarea'
  ];

  const skippable$1 = [
    'area',
    'base',
    'basefont',
    'dialog',
    'datalist',
    'head',
    'link',
    'meta',
    'noembed',
    'noframes',
    'param',
    'rp',
    'script',
    'source',
    'style',
    'template',
    'track',
    'title'
  ];

  /**
   * @import {Nodes, Parents, Text} from 'hast'
   */


  /** @type {Options} */
  const emptyOptions$1 = {};
  const ignorableNode = convert(['comment', 'doctype']);

  /**
   * Minify whitespace.
   *
   * @param {Nodes} tree
   *   Tree.
   * @param {Options | null | undefined} [options]
   *   Configuration (optional).
   * @returns {undefined}
   *   Nothing.
   */
  function minifyWhitespace(tree, options) {
    const settings = options || emptyOptions$1;

    minify(tree, {
      collapse: collapseFactory(
        settings.newlines ? replaceNewlines : replaceWhitespace
      ),
      whitespace: 'normal'
    });
  }

  /**
   * @param {Nodes} node
   *   Node.
   * @param {State} state
   *   Info passed around.
   * @returns {Result}
   *   Result.
   */
  function minify(node, state) {
    if ('children' in node) {
      const settings = {...state};

      if (node.type === 'root' || blocklike(node)) {
        settings.before = true;
        settings.after = true;
      }

      settings.whitespace = inferWhiteSpace(node, state);

      return all(node, settings)
    }

    if (node.type === 'text') {
      if (state.whitespace === 'normal') {
        return minifyText(node, state)
      }

      // Naïve collapse, but no trimming:
      if (state.whitespace === 'nowrap') {
        node.value = state.collapse(node.value);
      }

      // The `pre-wrap` or `pre` whitespace settings are neither collapsed nor
      // trimmed.
    }

    return {ignore: ignorableNode(node), stripAtStart: false, remove: false}
  }

  /**
   * @param {Text} node
   *   Node.
   * @param {State} state
   *   Info passed around.
   * @returns {Result}
   *   Result.
   */
  function minifyText(node, state) {
    const value = state.collapse(node.value);
    const result = {ignore: false, stripAtStart: false, remove: false};
    let start = 0;
    let end = value.length;

    if (state.before && removable(value.charAt(0))) {
      start++;
    }

    if (start !== end && removable(value.charAt(end - 1))) {
      if (state.after) {
        end--;
      } else {
        result.stripAtStart = true;
      }
    }

    if (start === end) {
      result.remove = true;
    } else {
      node.value = value.slice(start, end);
    }

    return result
  }

  /**
   * @param {Parents} parent
   *   Node.
   * @param {State} state
   *   Info passed around.
   * @returns {Result}
   *   Result.
   */
  function all(parent, state) {
    let before = state.before;
    const after = state.after;
    const children = parent.children;
    let length = children.length;
    let index = -1;

    while (++index < length) {
      const result = minify(children[index], {
        ...state,
        after: collapsableAfter(children, index, after),
        before
      });

      if (result.remove) {
        children.splice(index, 1);
        index--;
        length--;
      } else if (!result.ignore) {
        before = result.stripAtStart;
      }

      // If this element, such as a `<select>` or `<img>`, contributes content
      // somehow, allow whitespace again.
      if (content(children[index])) {
        before = false;
      }
    }

    return {ignore: false, stripAtStart: Boolean(before || after), remove: false}
  }

  /**
   * @param {Array<Nodes>} nodes
   *   Nodes.
   * @param {number} index
   *   Index.
   * @param {boolean | undefined} [after]
   *   Whether there is a break after `nodes` (default: `false`).
   * @returns {boolean | undefined}
   *   Whether there is a break after the node at `index`.
   */
  function collapsableAfter(nodes, index, after) {
    while (++index < nodes.length) {
      const node = nodes[index];
      let result = inferBoundary(node);

      if (result === undefined && 'children' in node && !skippable(node)) {
        result = collapsableAfter(node.children, -1);
      }

      if (typeof result === 'boolean') {
        return result
      }
    }

    return after
  }

  /**
   * Infer two types of boundaries:
   *
   * 1. `true` — boundary for which whitespace around it does not contribute
   *    anything
   * 2. `false` — boundary for which whitespace around it *does* contribute
   *
   * No result (`undefined`) is returned if it is unknown.
   *
   * @param {Nodes} node
   *   Node.
   * @returns {boolean | undefined}
   *   Boundary.
   */
  function inferBoundary(node) {
    if (node.type === 'element') {
      if (content(node)) {
        return false
      }

      if (blocklike(node)) {
        return true
      }

      // Unknown: either depends on siblings if embedded or metadata, or on
      // children.
    } else if (node.type === 'text') {
      if (!whitespace(node)) {
        return false
      }
    } else if (!ignorableNode(node)) {
      return false
    }
  }

  /**
   * Infer whether a node is skippable.
   *
   * @param {Nodes} node
   *   Node.
   * @returns {boolean}
   *   Whether `node` is skippable.
   */
  function content(node) {
    return embedded(node) || isElement(node, content$1)
  }

  /**
   * See: <https://html.spec.whatwg.org/#the-css-user-agent-style-sheet-and-presentational-hints>
   *
   * @param {Nodes} node
   *   Node.
   * @returns {boolean}
   *   Whether `node` is block-like.
   */
  function blocklike(node) {
    return isElement(node, blocks$1)
  }

  /**
   * @param {Parents} node
   *   Node.
   * @returns {boolean}
   *   Whether `node` is skippable.
   */
  function skippable(node) {
    return (
      Boolean(node.type === 'element' && node.properties.hidden) ||
      ignorableNode(node) ||
      isElement(node, skippable$1)
    )
  }

  /**
   * @param {string} character
   *   Character.
   * @returns {boolean}
   *   Whether `character` is removable.
   */
  function removable(character) {
    return character === ' ' || character === '\n'
  }

  /**
   * @type {Collapse}
   */
  function replaceNewlines(value) {
    const match = /\r?\n|\r/.exec(value);
    return match ? match[0] : ' '
  }

  /**
   * @type {Collapse}
   */
  function replaceWhitespace() {
    return ' '
  }

  /**
   * @param {Collapse} replace
   * @returns {Collapse}
   *   Collapse.
   */
  function collapseFactory(replace) {
    return collapse

    /**
     * @type {Collapse}
     */
    function collapse(value) {
      return String(value).replace(/[\t\n\v\f\r ]+/g, replace)
    }
  }

  /**
   * We don’t need to support void elements here (so `nobr wbr` -> `normal` is
   * ignored).
   *
   * @param {Parents} node
   *   Node.
   * @param {State} state
   *   Info passed around.
   * @returns {Whitespace}
   *   Whitespace.
   */
  function inferWhiteSpace(node, state) {
    if ('tagName' in node && node.properties) {
      switch (node.tagName) {
        // Whitespace in script/style, while not displayed by CSS as significant,
        // could have some meaning in JS/CSS, so we can’t touch them.
        case 'listing':
        case 'plaintext':
        case 'script':
        case 'style':
        case 'xmp': {
          return 'pre'
        }

        case 'nobr': {
          return 'nowrap'
        }

        case 'pre': {
          return node.properties.wrap ? 'pre-wrap' : 'pre'
        }

        case 'td':
        case 'th': {
          return node.properties.noWrap ? 'nowrap' : state.whitespace
        }

        case 'textarea': {
          return 'pre-wrap'
        }
      }
    }

    return state.whitespace
  }

  /**
   * @typedef {import('hast').Element} Element
   * @typedef {import('hast').Nodes} Nodes
   */

  const own = {}.hasOwnProperty;

  /**
   * Check if `node` is an element and has a `name` property.
   *
   * @template {string} Key
   *   Type of key.
   * @param {Nodes} node
   *   Node to check (typically `Element`).
   * @param {Key} name
   *   Property name to check.
   * @returns {node is Element & {properties: Record<Key, Array<number | string> | number | string | true>}}}
   *   Whether `node` is an element that has a `name` property.
   *
   *   Note: see <https://github.com/DefinitelyTyped/DefinitelyTyped/blob/27c9274/types/hast/index.d.ts#L37C29-L37C98>.
   */
  function hasProperty(node, name) {
    const value =
      node.type === 'element' &&
      own.call(node.properties, name) &&
      node.properties[name];

    return value !== null && value !== undefined && value !== false
  }

  /**
   * @import {Nodes} from 'hast'
   */

  const list = new Set(['pingback', 'prefetch', 'stylesheet']);

  /**
   * Checks whether a node is a “body OK” link.
   *
   * @param {Nodes} node
   *   Node to check.
   * @returns {boolean}
   *   Whether `node` is a “body OK” link.
   */
  function isBodyOkLink(node) {
    if (node.type !== 'element' || node.tagName !== 'link') {
      return false
    }

    if (node.properties.itemProp) {
      return true
    }

    const value = node.properties.rel;
    let index = -1;

    if (!Array.isArray(value) || value.length === 0) {
      return false
    }

    while (++index < value.length) {
      if (!list.has(String(value[index]))) {
        return false
      }
    }

    return true
  }

  /**
   * @typedef {import('hast').Nodes} Nodes
   */


  const basic = convertElement([
    'a',
    'abbr',
    // `area` is in fact only phrasing if it is inside a `map` element.
    // However, since `area`s are required to be inside a `map` element, and it’s
    // a rather involved check, it’s ignored here for now.
    'area',
    'b',
    'bdi',
    'bdo',
    'br',
    'button',
    'cite',
    'code',
    'data',
    'datalist',
    'del',
    'dfn',
    'em',
    'i',
    'input',
    'ins',
    'kbd',
    'keygen',
    'label',
    'map',
    'mark',
    'meter',
    'noscript',
    'output',
    'progress',
    'q',
    'ruby',
    's',
    'samp',
    'script',
    'select',
    'small',
    'span',
    'strong',
    'sub',
    'sup',
    'template',
    'textarea',
    'time',
    'u',
    'var',
    'wbr'
  ]);

  const meta = convertElement('meta');

  /**
   * Check if the given value is *phrasing* content.
   *
   * @param {Nodes} value
   *   Node to check.
   * @returns {boolean}
   *   Whether `value` is phrasing content.
   */
  function phrasing(value) {
    return Boolean(
      value.type === 'text' ||
        basic(value) ||
        embedded(value) ||
        isBodyOkLink(value) ||
        (meta(value) && hasProperty(value, 'itemProp'))
    )
  }

  /**
   * List of HTML tag names that are whitespace sensitive.
   */
  const whitespaceSensitiveTagNames = [
    'pre',
    'script',
    'style',
    'textarea'
  ];

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
   * @import {Nodes, RootContent, Root} from 'hast'
   * @import {BuildVisitor} from 'unist-util-visit-parents'
   * @import {Options, State} from './types.js'
   */


  /** @type {Options} */
  const emptyOptions = {};

  /**
   * Format whitespace in HTML.
   *
   * @param {Root} tree
   *   Tree.
   * @param {Options | null | undefined} [options]
   *   Configuration (optional).
   * @returns {undefined}
   *   Nothing.
   */
  function format(tree, options) {
    const settings = emptyOptions;

    /** @type {State} */
    const state = {
      blanks: settings.blanks || [],
      head: false,
      indentInitial: settings.indentInitial !== false,
      indent:
        typeof settings.indent === 'number'
          ? ' '.repeat(settings.indent)
          : typeof settings.indent === 'string'
            ? settings.indent
            : '  '
    };

    minifyWhitespace(tree, {newlines: true});

    visitParents(tree, visitor);

    /**
     * @type {BuildVisitor<Root>}
     */
    function visitor(node, parents) {
      if (!('children' in node)) {
        return
      }

      if (node.type === 'element' && node.tagName === 'head') {
        state.head = true;
      }

      if (state.head && node.type === 'element' && node.tagName === 'body') {
        state.head = false;
      }

      if (
        node.type === 'element' &&
        whitespaceSensitiveTagNames.includes(node.tagName)
      ) {
        return SKIP
      }

      // Don’t indent content of whitespace-sensitive nodes / inlines.
      if (node.children.length === 0 || !padding(state, node)) {
        return
      }

      let level = parents.length;

      if (!state.indentInitial) {
        level--;
      }

      let eol = false;

      // Indent newlines in `text`.
      for (const child of node.children) {
        if (child.type === 'comment' || child.type === 'text') {
          if (child.value.includes('\n')) {
            eol = true;
          }

          child.value = child.value.replace(
            / *\n/g,
            '$&' + state.indent.repeat(level)
          );
        }
      }

      /** @type {Array<RootContent>} */
      const result = [];
      /** @type {RootContent | undefined} */
      let previous;

      for (const child of node.children) {
        if (padding(state, child) || (eol && !previous)) {
          addBreak(result, level, child);
          eol = true;
        }

        previous = child;
        result.push(child);
      }

      if (previous && (eol || padding(state, previous))) {
        // Ignore trailing whitespace (if that already existed), as we’ll add
        // properly indented whitespace.
        if (whitespace(previous)) {
          result.pop();
          previous = result[result.length - 1];
        }

        addBreak(result, level - 1);
      }

      node.children = result;
    }

    /**
     * @param {Array<RootContent>} list
     *   Nodes.
     * @param {number} level
     *   Indentation level.
     * @param {RootContent | undefined} [next]
     *   Next node.
     * @returns {undefined}
     *   Nothing.
     */
    function addBreak(list, level, next) {
      const tail = list[list.length - 1];
      const previous = tail && whitespace(tail) ? list[list.length - 2] : tail;
      const replace =
        (blank(state, previous) && blank(state, next) ? '\n\n' : '\n') +
        state.indent.repeat(Math.max(level, 0));

      if (tail && tail.type === 'text') {
        tail.value = whitespace(tail) ? replace : tail.value + replace;
      } else {
        list.push({type: 'text', value: replace});
      }
    }
  }

  /**
   * @param {State} state
   *   Info passed around.
   * @param {Nodes | undefined} node
   *   Node.
   * @returns {boolean}
   *   Whether `node` is a blank.
   */
  function blank(state, node) {
    return Boolean(
      node &&
        node.type === 'element' &&
        state.blanks.length > 0 &&
        state.blanks.includes(node.tagName)
    )
  }

  /**
   * @param {State} state
   *   Info passed around.
   * @param {Nodes} node
   *   Node.
   * @returns {boolean}
   *   Whether `node` should be padded.
   */
  function padding(state, node) {
    return (
      node.type === 'root' ||
      (node.type === 'element'
        ? state.head ||
          node.tagName === 'script' ||
          embedded(node) ||
          !phrasing(node)
        : false)
    )
  }

  var version = '0.0.5';

  // Structural HTML boundaries, independent of CSS or browser layout.
  const blocks = new Set([
    'address', 'article', 'aside', 'blockquote', 'body', 'caption', 'dd', 'details',
    'dialog', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'li', 'main',
    'nav', 'ol', 'p', 'pre', 'section', 'summary', 'table', 'tbody', 'td', 'tfoot',
    'th', 'thead', 'tr', 'ul', 'br',
  ]);

  // Present an attribute as a text source without adding nodes to the HAST tree.
  const attributeSource = (node, property, sources) => {
    if (!sources.has(node)) {
      sources.set(node, new Map());
    }
    const attributes = sources.get(node);
    if (!attributes.has(property)) {
      attributes.set(property, {
        type: 'attribute',
        node,
        property,
        get value() {
          return node.properties[property]
        },
        set value(text) {
          node.properties[property] = text;
        },
      });
    }
    return attributes.get(property)
  };

  // HAST uses camelCase property names for HTML attributes such as aria-label.
  const textAttributes = [
    ['altText', 'alt'],
    ['titleAttribute', 'title'],
    ['ariaLabel', 'ariaLabel'],
    ['placeholder', 'placeholder'],
  ];

  const walk = (tree, options = {}, attributes = new WeakMap()) => {
    const nodes = [];
    const groups = [];
    let group = [];
    const flush = () => {
      if (group.length) {
        groups.push(group);
        group = [];
      }
    };
    const separate = node => {
      flush();
      nodes.push(node);
      groups.push([node]);
    };
    // Iterative traversal avoids growing the call stack for deeply nested markup.
    const stack = [{ node: tree }];
    for (; stack.length;) {
      const { node, exit } = stack.pop();
      if (exit) {
        flush();
        continue
      }
      if (node.type === 'text') {
        nodes.push(node);
        group.push(node);
        continue
      }
      // Disabled comments stay transparent so walk<!-- note -->ed remains one word.
      if (node.type === 'comment' || node.type === 'doctype') {
        if (node.type === 'comment' && options.comments) {
          separate(node);
        }
        continue
      }
      if (node.type !== 'root' && node.type !== 'element') {
        throw new Error(`Unsupported HTML node: ${node.type}`)
      }
      const hidden = node.properties?.hidden;
      const excluded = Object.hasOwn(options, node.tagName) && options[node.tagName] === false;
      if (excluded || (hidden != null && hidden !== false)) {
        // Omitted subtrees are barriers, so their neighbours cannot form one word.
        flush();
        continue
      }
      if (node.type === 'element') {
        textAttributes.forEach(([option, property]) => {
          if (options[option] && typeof node.properties?.[property] === 'string') {
            separate(attributeSource(node, property, attributes));
          }
        });
      }
      if (blocks.has(node.tagName)) {
        flush();
        stack.push({ exit: true });
      }
      // HAST stores template descendants in a separate root, not in children.
      const children = node.tagName === 'template' ? node.content?.children : node.children;
      if (!Array.isArray(children)) {
        throw new Error(`Expected children for HTML node: ${node.tagName || node.type}`)
      }
      for (let i = children.length - 1; i >= 0; i -= 1) {
        stack.push({ node: children[i] });
      }
    }
    flush();
    return { nodes, groups }
  };

  const connectNodes = (doc, nodes, binding) => {
    const { terms, layout, protectedTerms } = binding;
    const allTerms = doc.termList();
    nodes.forEach(node => layout.set(node, []));
    let index = 0;
    let cursor = 0;
    // Temporary source cursors align normalized text without changing AST values.
    const current = () => {
      for (; index < nodes.length && cursor === nodes[index].value.length; index += 1) {
        cursor = 0;
      }
      return nodes[index]
    };
    const append = (node, text, source) => {
      const entries = layout.get(node);
      const last = entries.at(-1);
      if (source) {
        // One word owns one part per contributing node, not one part per character.
        if (last && typeof last !== 'string' && last.source === source) {
          last.text += text;
        } else {
          const part = { node, text, source };
          source.parts.push(part);
          entries.push(part);
        }
      } else if (typeof last === 'string') {
        entries[entries.length - 1] += text;
      } else {
        entries.push(text);
      }
      cursor += text.length;
    };
    const consume = (value, source, whitespace = false) => {
      for (let i = 0; i < value.length; i += 1) {
        let node = current();
        // Some tokenizer paths invent trailing whitespace (for example, <3).
        if (!node && whitespace && !value.slice(i).trim()) {
          return true
        }
        if (!node) {
          return false
        }
        if (whitespace && value[i] === ' ' && /[\t\n\f\r ]/.test(node.value[cursor])) {
          // A single NLP space can cover a source run spanning several text nodes.
          for (; node && /[\t\n\f\r ]/.test(node.value[cursor]); node = current()) {
            const text = node.value.slice(cursor).match(/^[\t\n\f\r ]+/)[0];
            append(node, text, null);
          }
        } else {
          if (node.value[cursor] !== value[i]) {
            return false
          }
          append(node, value[i], source);
        }
      }
      return true
    };
    const protect = term => {
      protectedTerms.set(term, { text: term.text, implicit: term.implicit });
    };
    const aligned = allTerms.every(term => {
      const source = { parts: [], readOnly: Boolean(term.implicit) };
      if (!consume(term.pre, null, true) || !consume(term.text, source) || !consume(term.post, null, true)) {
        return false
      }
      terms.set(term, source);
      // Implicit terms have no independent source spelling; leave them untouched.
      if (term.implicit || !source.parts.length) {
        protect(term);
      }
      return true
    });
    const remaining = nodes.slice(index).some((node, i) => node.value.length > (i === 0 ? cursor : 0));
    if (!aligned || remaining) {
      // No guessing/searching: preserve an unalignable run verbatim and allow reading.
      // Other prose runs remain editable; edits to this run fail during write-back.
      nodes.forEach(node => layout.set(node, [node.value]));
      allTerms.forEach(term => {
        terms.set(term, { parts: [], readOnly: true });
        protect(term);
      });
    }
  };

  // Tag names map to inclusion in NLP text. Unlisted tags default to true.
  // Skipped elements remain in the source tree and serialized HTML.
  const defaults = {
    fragment: true, // Parser option: false parses a complete document.
    altText: false, // Include alt attributes as separate prose blocks.
    titleAttribute: false,
    ariaLabel: false,
    placeholder: false,
    comments: false, // Include comment values as separate prose blocks.
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
    p: true,
    div: true,
    span: true,
    a: true,
    strong: true,
    em: true,
    nav: true,
    header: true,
    footer: true,
    blockquote: true,
    ul: true,
    ol: true,
    li: true,
    head: false,
    script: false,
    style: false,
    template: false,
    table: false,
    pre: false,
    code: false,
    select: false,
    textarea: false,
    svg: false,
    math: false,
    audio: false,
    video: false,
    button: false,
  };

  const readTree = function (tree, nlp, options = {}) {
    // Snapshot read options so later caller changes cannot alter write-back traversal.
    const readOptions = { ...defaults, ...options };
    // Attribute sources keep stable identities for validation on subsequent updates.
    const attributes = new WeakMap();
    const { nodes, groups } = walk(tree, readOptions, attributes);
    const doc = nlp.tokenize('');
    const binding = {
      tree,
      readOptions,
      attributes,
      nodes,
      groups,
      layout: new Map(),
      terms: new WeakMap(),
      protectedTerms: new Map(),
      values: nodes.map(node => node.value),
    };
    groups.forEach(group => {
      // Finish parsing before binding: contraction processing may replace Term objects.
      // Collapse HTML source whitespace across inline nodes, leaving NBSP intact.
      const text = group.map(node => node.value).join('').replace(/[\t\n\f\r ]+/g, ' ');
      const part = nlp(text);
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
    Object.defineProperty(doc.document, 'htmlAst', { value: binding });
    // Parsing already ran once per prose run; only repair combined sentence indexes.
    doc.compute('index');
    return doc
  };

  // called every doc.replace() so we can shuffle our metadata around
  const onTransfer = ({ oldTerms, newTerms, document }) => {
    const binding = document.htmlAst;
    if (!binding) {
      return // Ordinary compromise documents have no AST connection.
    }
    const { terms } = binding;
    const sources = oldTerms.map(term => terms.get(term));
    if (!sources.length || !newTerms.length || sources.some(source => !source || source.readOnly)) {
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
    const unist = doc.document.htmlAst;
    if (!unist) {
      throw new Error('This document is not connected to an HTML tree')
    }
    const { tree, nodes, values, layout, terms } = unist;
    const { nodes: current, groups } = walk(tree, unist.readOptions, unist.attributes);
    // Moving text across block boundaries also invalidates the imported structure.
    const sameGroups = groups.length === unist.groups.length && groups.every((group, i) =>
      group.length === unist.groups[i].length && group.every((node, j) => node === unist.groups[i][j]));
    if (!sameGroups || current.length !== nodes.length || current.some((node, i) => node !== nodes[i] || node.value !== values[i])) {
      throw new Error('HTML tree changed since import or last update')
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
    const present = new Set(allTerms);
    // Internal and unalignable terms may pass through, but must remain untouched.
    unist.protectedTerms.forEach((original, term) => {
      if (!present.has(term) || term.text !== original.text || term.implicit !== original.implicit) {
        throw new Error('Cannot update tree: an implicit or unalignable term was edited')
      }
    });
    const visible = allTerms.filter(term => !unist.protectedTerms.has(term) || terms.get(term)?.parts.length);
    const words = new Map();
    visible.forEach((term, i) => {
      const source = terms.get(term);
      if (!source) {
        throw new Error('Cannot update tree: inserted or replaced text has ambiguous ownership')
      }
      if (source !== expected[i]) {
        throw new Error('Cannot update tree: deleted or reordered words require structural editing')
      }
      const original = source.parts.map(part => part.text).join('');
      if (source.parts.length > 1 && term.text !== original) {
        throw new Error('Cannot update tree: edited text crosses HTML nodes')
      }
      words.set(source, term.text);
    });
    if (visible.length !== expected.length) {
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
    // No AST mutation happens until every word has passed validation.
    nodes.forEach((node, i) => {
      node.value = output[i];
    });
    unist.values = output;
    return doc
  };

  /* eslint-disable no-console */

  const debug = view => {
    const binding = view.document.htmlAst;
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

  const plugin = {
    version,
    onReplace: onTransfer,
    mutate: world => {
      world.methods.one.debug ||= {};
      const previous = world.methods.one.debug.ast;
      world.methods.one.debug.ast = view => {
        if (view.document.htmlAst || !previous) {
          return debug(view)
        }
        return previous(view)
      };
    },
    lib: {
      fromHast: function (tree, options = {}) {
        return readTree(tree, this, options)
      },
      fromHtml: function (input, options = {}) {
        // Fragment mode avoids adding html/head/body wrappers to snippets.
        const tree = fromHtml(input, { fragment: options.fragment ?? defaults.fragment });
        return readTree(tree, this, options)
      },
    },
    api: View => {
      View.prototype.toHtml = function (options = {}) {
        const binding = this.document.htmlAst;
        if (!binding) {
          throw new Error('This document is not connected to an HTML tree')
        }
        if (options.format) {
          // Formatting changes whitespace nodes; keep those changes out of our bindings.
          const tree = globalThis.structuredClone(binding.tree);
          format(tree);
          return toHtml(tree)
        }
        return toHtml(binding.tree)
      };
      View.prototype.updateHast = function () {
        return update(this)
      };
    },
  };

  return plugin;

}));
