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
      get offset() {
          return this.droppedBufferSize + this.pos;
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
              this.html = this.html.substring(this.pos);
              this.lineStartPos -= this.pos;
              this.droppedBufferSize += this.pos;
              this.pos = 0;
              this.lastGapPos = -2;
              this.gapStack.length = 0;
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

  // Generated using scripts/write-decode-map.ts
  const htmlDecodeTree = /* #__PURE__ */ new Uint16Array(
  // prettier-ignore
  /* #__PURE__ */ "\u1d41<\xd5\u0131\u028a\u049d\u057b\u05d0\u0675\u06de\u07a2\u07d6\u080f\u0a4a\u0a91\u0da1\u0e6d\u0f09\u0f26\u10ca\u1228\u12e1\u1415\u149d\u14c3\u14df\u1525\0\0\0\0\0\0\u156b\u16cd\u198d\u1c12\u1ddd\u1f7e\u2060\u21b0\u228d\u23c0\u23fb\u2442\u2824\u2912\u2d08\u2e48\u2fce\u3016\u32ba\u3639\u37ac\u38fe\u3a28\u3a71\u3ae0\u3b2e\u0800EMabcfglmnoprstu\\bfms\x7f\x84\x8b\x90\x95\x98\xa6\xb3\xb9\xc8\xcflig\u803b\xc6\u40c6P\u803b&\u4026cute\u803b\xc1\u40c1reve;\u4102\u0100iyx}rc\u803b\xc2\u40c2;\u4410r;\uc000\ud835\udd04rave\u803b\xc0\u40c0pha;\u4391acr;\u4100d;\u6a53\u0100gp\x9d\xa1on;\u4104f;\uc000\ud835\udd38plyFunction;\u6061ing\u803b\xc5\u40c5\u0100cs\xbe\xc3r;\uc000\ud835\udc9cign;\u6254ilde\u803b\xc3\u40c3ml\u803b\xc4\u40c4\u0400aceforsu\xe5\xfb\xfe\u0117\u011c\u0122\u0127\u012a\u0100cr\xea\xf2kslash;\u6216\u0176\xf6\xf8;\u6ae7ed;\u6306y;\u4411\u0180crt\u0105\u010b\u0114ause;\u6235noullis;\u612ca;\u4392r;\uc000\ud835\udd05pf;\uc000\ud835\udd39eve;\u42d8c\xf2\u0113mpeq;\u624e\u0700HOacdefhilorsu\u014d\u0151\u0156\u0180\u019e\u01a2\u01b5\u01b7\u01ba\u01dc\u0215\u0273\u0278\u027ecy;\u4427PY\u803b\xa9\u40a9\u0180cpy\u015d\u0162\u017aute;\u4106\u0100;i\u0167\u0168\u62d2talDifferentialD;\u6145leys;\u612d\u0200aeio\u0189\u018e\u0194\u0198ron;\u410cdil\u803b\xc7\u40c7rc;\u4108nint;\u6230ot;\u410a\u0100dn\u01a7\u01adilla;\u40b8terDot;\u40b7\xf2\u017fi;\u43a7rcle\u0200DMPT\u01c7\u01cb\u01d1\u01d6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01e2\u01f8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020foubleQuote;\u601duote;\u6019\u0200lnpu\u021e\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6a74\u0180git\u022f\u0236\u023aruent;\u6261nt;\u622fourIntegral;\u622e\u0100fr\u024c\u024e;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6a2fcr;\uc000\ud835\udc9ep\u0100;C\u0284\u0285\u62d3ap;\u624d\u0580DJSZacefios\u02a0\u02ac\u02b0\u02b4\u02b8\u02cb\u02d7\u02e1\u02e6\u0333\u048d\u0100;o\u0179\u02a5trahd;\u6911cy;\u4402cy;\u4405cy;\u440f\u0180grs\u02bf\u02c4\u02c7ger;\u6021r;\u61a1hv;\u6ae4\u0100ay\u02d0\u02d5ron;\u410e;\u4414l\u0100;t\u02dd\u02de\u6207a;\u4394r;\uc000\ud835\udd07\u0100af\u02eb\u0327\u0100cm\u02f0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031ccute;\u40b4o\u0174\u030b\u030d;\u42d9bleAcute;\u42ddrave;\u4060ilde;\u42dcond;\u62c4ferentialD;\u6146\u0470\u033d\0\0\0\u0342\u0354\0\u0405f;\uc000\ud835\udd3b\u0180;DE\u0348\u0349\u034d\u40a8ot;\u60dcqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03cf\u03e2\u03f8ontourIntegra\xec\u0239o\u0274\u0379\0\0\u037b\xbb\u0349nArrow;\u61d3\u0100eo\u0387\u03a4ft\u0180ART\u0390\u0396\u03a1rrow;\u61d0ightArrow;\u61d4e\xe5\u02cang\u0100LR\u03ab\u03c4eft\u0100AR\u03b3\u03b9rrow;\u67f8ightArrow;\u67faightArrow;\u67f9ight\u0100AT\u03d8\u03derrow;\u61d2ee;\u62a8p\u0241\u03e9\0\0\u03efrrow;\u61d1ownArrow;\u61d5erticalBar;\u6225n\u0300ABLRTa\u0412\u042a\u0430\u045e\u047f\u037crrow\u0180;BU\u041d\u041e\u0422\u6193ar;\u6913pArrow;\u61f5reve;\u4311eft\u02d2\u043a\0\u0446\0\u0450ightVector;\u6950eeVector;\u695eector\u0100;B\u0459\u045a\u61bdar;\u6956ight\u01d4\u0467\0\u0471eeVector;\u695fector\u0100;B\u047a\u047b\u61c1ar;\u6957ee\u0100;A\u0486\u0487\u62a4rrow;\u61a7\u0100ct\u0492\u0497r;\uc000\ud835\udc9frok;\u4110\u0800NTacdfglmopqstux\u04bd\u04c0\u04c4\u04cb\u04de\u04e2\u04e7\u04ee\u04f5\u0521\u052f\u0536\u0552\u055d\u0560\u0565G;\u414aH\u803b\xd0\u40d0cute\u803b\xc9\u40c9\u0180aiy\u04d2\u04d7\u04dcron;\u411arc\u803b\xca\u40ca;\u442dot;\u4116r;\uc000\ud835\udd08rave\u803b\xc8\u40c8ement;\u6208\u0100ap\u04fa\u04fecr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65fberySmallSquare;\u65ab\u0100gp\u0526\u052aon;\u4118f;\uc000\ud835\udd3csilon;\u4395u\u0100ai\u053c\u0549l\u0100;T\u0542\u0543\u6a75ilde;\u6242librium;\u61cc\u0100ci\u0557\u055ar;\u6130m;\u6a73a;\u4397ml\u803b\xcb\u40cb\u0100ip\u056a\u056fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058d\u05b2\u05ccy;\u4424r;\uc000\ud835\udd09lled\u0253\u0597\0\0\u05a3mallSquare;\u65fcerySmallSquare;\u65aa\u0370\u05ba\0\u05bf\0\0\u05c4f;\uc000\ud835\udd3dAll;\u6200riertrf;\u6131c\xf2\u05cb\u0600JTabcdfgorst\u05e8\u05ec\u05ef\u05fa\u0600\u0612\u0616\u061b\u061d\u0623\u066c\u0672cy;\u4403\u803b>\u403emma\u0100;d\u05f7\u05f8\u4393;\u43dcreve;\u411e\u0180eiy\u0607\u060c\u0610dil;\u4122rc;\u411c;\u4413ot;\u4120r;\uc000\ud835\udd0a;\u62d9pf;\uc000\ud835\udd3eeater\u0300EFGLST\u0635\u0644\u064e\u0656\u065b\u0666qual\u0100;L\u063e\u063f\u6265ess;\u62dbullEqual;\u6267reater;\u6aa2ess;\u6277lantEqual;\u6a7eilde;\u6273cr;\uc000\ud835\udca2;\u626b\u0400Aacfiosu\u0685\u068b\u0696\u069b\u069e\u06aa\u06be\u06caRDcy;\u442a\u0100ct\u0690\u0694ek;\u42c7;\u405eirc;\u4124r;\u610clbertSpace;\u610b\u01f0\u06af\0\u06b2f;\u610dizontalLine;\u6500\u0100ct\u06c3\u06c5\xf2\u06a9rok;\u4126mp\u0144\u06d0\u06d8ownHum\xf0\u012fqual;\u624f\u0700EJOacdfgmnostu\u06fa\u06fe\u0703\u0707\u070e\u071a\u071e\u0721\u0728\u0744\u0778\u078b\u078f\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803b\xcd\u40cd\u0100iy\u0713\u0718rc\u803b\xce\u40ce;\u4418ot;\u4130r;\u6111rave\u803b\xcc\u40cc\u0180;ap\u0720\u072f\u073f\u0100cg\u0734\u0737r;\u412ainaryI;\u6148lie\xf3\u03dd\u01f4\u0749\0\u0762\u0100;e\u074d\u074e\u622c\u0100gr\u0753\u0758ral;\u622bsection;\u62c2isible\u0100CT\u076c\u0772omma;\u6063imes;\u6062\u0180gpt\u077f\u0783\u0788on;\u412ef;\uc000\ud835\udd40a;\u4399cr;\u6110ilde;\u4128\u01eb\u079a\0\u079ecy;\u4406l\u803b\xcf\u40cf\u0280cfosu\u07ac\u07b7\u07bc\u07c2\u07d0\u0100iy\u07b1\u07b5rc;\u4134;\u4419r;\uc000\ud835\udd0dpf;\uc000\ud835\udd41\u01e3\u07c7\0\u07ccr;\uc000\ud835\udca5rcy;\u4408kcy;\u4404\u0380HJacfos\u07e4\u07e8\u07ec\u07f1\u07fd\u0802\u0808cy;\u4425cy;\u440cppa;\u439a\u0100ey\u07f6\u07fbdil;\u4136;\u441ar;\uc000\ud835\udd0epf;\uc000\ud835\udd42cr;\uc000\ud835\udca6\u0580JTaceflmost\u0825\u0829\u082c\u0850\u0863\u09b3\u09b8\u09c7\u09cd\u0a37\u0a47cy;\u4409\u803b<\u403c\u0280cmnpr\u0837\u083c\u0841\u0844\u084dute;\u4139bda;\u439bg;\u67ealacetrf;\u6112r;\u619e\u0180aey\u0857\u085c\u0861ron;\u413ddil;\u413b;\u441b\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087e\u08a9\u08b1\u08e0\u08e6\u08fc\u092f\u095b\u0390\u096a\u0100nr\u0883\u088fgleBracket;\u67e8row\u0180;BR\u0899\u089a\u089e\u6190ar;\u61e4ightArrow;\u61c6eiling;\u6308o\u01f5\u08b7\0\u08c3bleBracket;\u67e6n\u01d4\u08c8\0\u08d2eeVector;\u6961ector\u0100;B\u08db\u08dc\u61c3ar;\u6959loor;\u630aight\u0100AV\u08ef\u08f5rrow;\u6194ector;\u694e\u0100er\u0901\u0917e\u0180;AV\u0909\u090a\u0910\u62a3rrow;\u61a4ector;\u695aiangle\u0180;BE\u0924\u0925\u0929\u62b2ar;\u69cfqual;\u62b4p\u0180DTV\u0937\u0942\u094cownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61bfar;\u6958ector\u0100;B\u0965\u0966\u61bcar;\u6952ight\xe1\u039cs\u0300EFGLST\u097e\u098b\u0995\u099d\u09a2\u09adqualGreater;\u62daullEqual;\u6266reater;\u6276ess;\u6aa1lantEqual;\u6a7dilde;\u6272r;\uc000\ud835\udd0f\u0100;e\u09bd\u09be\u62d8ftarrow;\u61daidot;\u413f\u0180npw\u09d4\u0a16\u0a1bg\u0200LRlr\u09de\u09f7\u0a02\u0a10eft\u0100AR\u09e6\u09ecrrow;\u67f5ightArrow;\u67f7ightArrow;\u67f6eft\u0100ar\u03b3\u0a0aight\xe1\u03bfight\xe1\u03caf;\uc000\ud835\udd43er\u0100LR\u0a22\u0a2ceftArrow;\u6199ightArrow;\u6198\u0180cht\u0a3e\u0a40\u0a42\xf2\u084c;\u61b0rok;\u4141;\u626a\u0400acefiosu\u0a5a\u0a5d\u0a60\u0a77\u0a7c\u0a85\u0a8b\u0a8ep;\u6905y;\u441c\u0100dl\u0a65\u0a6fiumSpace;\u605flintrf;\u6133r;\uc000\ud835\udd10nusPlus;\u6213pf;\uc000\ud835\udd44c\xf2\u0a76;\u439c\u0480Jacefostu\u0aa3\u0aa7\u0aad\u0ac0\u0b14\u0b19\u0d91\u0d97\u0d9ecy;\u440acute;\u4143\u0180aey\u0ab4\u0ab9\u0aberon;\u4147dil;\u4145;\u441d\u0180gsw\u0ac7\u0af0\u0b0eative\u0180MTV\u0ad3\u0adf\u0ae8ediumSpace;\u600bhi\u0100cn\u0ae6\u0ad8\xeb\u0ad9eryThi\xee\u0ad9ted\u0100GL\u0af8\u0b06reaterGreate\xf2\u0673essLes\xf3\u0a48Line;\u400ar;\uc000\ud835\udd11\u0200Bnpt\u0b22\u0b28\u0b37\u0b3areak;\u6060BreakingSpace;\u40a0f;\u6115\u0680;CDEGHLNPRSTV\u0b55\u0b56\u0b6a\u0b7c\u0ba1\u0beb\u0c04\u0c5e\u0c84\u0ca6\u0cd8\u0d61\u0d85\u6aec\u0100ou\u0b5b\u0b64ngruent;\u6262pCap;\u626doubleVerticalBar;\u6226\u0180lqx\u0b83\u0b8a\u0b9bement;\u6209ual\u0100;T\u0b92\u0b93\u6260ilde;\uc000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0bb6\u0bb7\u0bbd\u0bc9\u0bd3\u0bd8\u0be5\u626fqual;\u6271ullEqual;\uc000\u2267\u0338reater;\uc000\u226b\u0338ess;\u6279lantEqual;\uc000\u2a7e\u0338ilde;\u6275ump\u0144\u0bf2\u0bfdownHump;\uc000\u224e\u0338qual;\uc000\u224f\u0338e\u0100fs\u0c0a\u0c27tTriangle\u0180;BE\u0c1a\u0c1b\u0c21\u62eaar;\uc000\u29cf\u0338qual;\u62ecs\u0300;EGLST\u0c35\u0c36\u0c3c\u0c44\u0c4b\u0c58\u626equal;\u6270reater;\u6278ess;\uc000\u226a\u0338lantEqual;\uc000\u2a7d\u0338ilde;\u6274ested\u0100GL\u0c68\u0c79reaterGreater;\uc000\u2aa2\u0338essLess;\uc000\u2aa1\u0338recedes\u0180;ES\u0c92\u0c93\u0c9b\u6280qual;\uc000\u2aaf\u0338lantEqual;\u62e0\u0100ei\u0cab\u0cb9verseElement;\u620cghtTriangle\u0180;BE\u0ccb\u0ccc\u0cd2\u62ebar;\uc000\u29d0\u0338qual;\u62ed\u0100qu\u0cdd\u0d0cuareSu\u0100bp\u0ce8\u0cf9set\u0100;E\u0cf0\u0cf3\uc000\u228f\u0338qual;\u62e2erset\u0100;E\u0d03\u0d06\uc000\u2290\u0338qual;\u62e3\u0180bcp\u0d13\u0d24\u0d4eset\u0100;E\u0d1b\u0d1e\uc000\u2282\u20d2qual;\u6288ceeds\u0200;EST\u0d32\u0d33\u0d3b\u0d46\u6281qual;\uc000\u2ab0\u0338lantEqual;\u62e1ilde;\uc000\u227f\u0338erset\u0100;E\u0d58\u0d5b\uc000\u2283\u20d2qual;\u6289ilde\u0200;EFT\u0d6e\u0d6f\u0d75\u0d7f\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uc000\ud835\udca9ilde\u803b\xd1\u40d1;\u439d\u0700Eacdfgmoprstuv\u0dbd\u0dc2\u0dc9\u0dd5\u0ddb\u0de0\u0de7\u0dfc\u0e02\u0e20\u0e22\u0e32\u0e3f\u0e44lig;\u4152cute\u803b\xd3\u40d3\u0100iy\u0dce\u0dd3rc\u803b\xd4\u40d4;\u441eblac;\u4150r;\uc000\ud835\udd12rave\u803b\xd2\u40d2\u0180aei\u0dee\u0df2\u0df6cr;\u414cga;\u43a9cron;\u439fpf;\uc000\ud835\udd46enCurly\u0100DQ\u0e0e\u0e1aoubleQuote;\u601cuote;\u6018;\u6a54\u0100cl\u0e27\u0e2cr;\uc000\ud835\udcaaash\u803b\xd8\u40d8i\u016c\u0e37\u0e3cde\u803b\xd5\u40d5es;\u6a37ml\u803b\xd6\u40d6er\u0100BP\u0e4b\u0e60\u0100ar\u0e50\u0e53r;\u603eac\u0100ek\u0e5a\u0e5c;\u63deet;\u63b4arenthesis;\u63dc\u0480acfhilors\u0e7f\u0e87\u0e8a\u0e8f\u0e92\u0e94\u0e9d\u0eb0\u0efcrtialD;\u6202y;\u441fr;\uc000\ud835\udd13i;\u43a6;\u43a0usMinus;\u40b1\u0100ip\u0ea2\u0eadncareplan\xe5\u069df;\u6119\u0200;eio\u0eb9\u0eba\u0ee0\u0ee4\u6abbcedes\u0200;EST\u0ec8\u0ec9\u0ecf\u0eda\u627aqual;\u6aaflantEqual;\u627cilde;\u627eme;\u6033\u0100dp\u0ee9\u0eeeuct;\u620fortion\u0100;a\u0225\u0ef9l;\u621d\u0100ci\u0f01\u0f06r;\uc000\ud835\udcab;\u43a8\u0200Ufos\u0f11\u0f16\u0f1b\u0f1fOT\u803b\"\u4022r;\uc000\ud835\udd14pf;\u611acr;\uc000\ud835\udcac\u0600BEacefhiorsu\u0f3e\u0f43\u0f47\u0f60\u0f73\u0fa7\u0faa\u0fad\u1096\u10a9\u10b4\u10bearr;\u6910G\u803b\xae\u40ae\u0180cnr\u0f4e\u0f53\u0f56ute;\u4154g;\u67ebr\u0100;t\u0f5c\u0f5d\u61a0l;\u6916\u0180aey\u0f67\u0f6c\u0f71ron;\u4158dil;\u4156;\u4420\u0100;v\u0f78\u0f79\u611cerse\u0100EU\u0f82\u0f99\u0100lq\u0f87\u0f8eement;\u620builibrium;\u61cbpEquilibrium;\u696fr\xbb\u0f79o;\u43a1ght\u0400ACDFTUVa\u0fc1\u0feb\u0ff3\u1022\u1028\u105b\u1087\u03d8\u0100nr\u0fc6\u0fd2gleBracket;\u67e9row\u0180;BL\u0fdc\u0fdd\u0fe1\u6192ar;\u61e5eftArrow;\u61c4eiling;\u6309o\u01f5\u0ff9\0\u1005bleBracket;\u67e7n\u01d4\u100a\0\u1014eeVector;\u695dector\u0100;B\u101d\u101e\u61c2ar;\u6955loor;\u630b\u0100er\u102d\u1043e\u0180;AV\u1035\u1036\u103c\u62a2rrow;\u61a6ector;\u695biangle\u0180;BE\u1050\u1051\u1055\u62b3ar;\u69d0qual;\u62b5p\u0180DTV\u1063\u106e\u1078ownVector;\u694feeVector;\u695cector\u0100;B\u1082\u1083\u61bear;\u6954ector\u0100;B\u1091\u1092\u61c0ar;\u6953\u0100pu\u109b\u109ef;\u611dndImplies;\u6970ightarrow;\u61db\u0100ch\u10b9\u10bcr;\u611b;\u61b1leDelayed;\u69f4\u0680HOacfhimoqstu\u10e4\u10f1\u10f7\u10fd\u1119\u111e\u1151\u1156\u1161\u1167\u11b5\u11bb\u11bf\u0100Cc\u10e9\u10eeHcy;\u4429y;\u4428FTcy;\u442ccute;\u415a\u0280;aeiy\u1108\u1109\u110e\u1113\u1117\u6abcron;\u4160dil;\u415erc;\u415c;\u4421r;\uc000\ud835\udd16ort\u0200DLRU\u112a\u1134\u113e\u1149ownArrow\xbb\u041eeftArrow\xbb\u089aightArrow\xbb\u0fddpArrow;\u6191gma;\u43a3allCircle;\u6218pf;\uc000\ud835\udd4a\u0272\u116d\0\0\u1170t;\u621aare\u0200;ISU\u117b\u117c\u1189\u11af\u65a1ntersection;\u6293u\u0100bp\u118f\u119eset\u0100;E\u1197\u1198\u628fqual;\u6291erset\u0100;E\u11a8\u11a9\u6290qual;\u6292nion;\u6294cr;\uc000\ud835\udcaear;\u62c6\u0200bcmp\u11c8\u11db\u1209\u120b\u0100;s\u11cd\u11ce\u62d0et\u0100;E\u11cd\u11d5qual;\u6286\u0100ch\u11e0\u1205eeds\u0200;EST\u11ed\u11ee\u11f4\u11ff\u627bqual;\u6ab0lantEqual;\u627dilde;\u627fTh\xe1\u0f8c;\u6211\u0180;es\u1212\u1213\u1223\u62d1rset\u0100;E\u121c\u121d\u6283qual;\u6287et\xbb\u1213\u0580HRSacfhiors\u123e\u1244\u1249\u1255\u125e\u1271\u1276\u129f\u12c2\u12c8\u12d1ORN\u803b\xde\u40deADE;\u6122\u0100Hc\u124e\u1252cy;\u440by;\u4426\u0100bu\u125a\u125c;\u4009;\u43a4\u0180aey\u1265\u126a\u126fron;\u4164dil;\u4162;\u4422r;\uc000\ud835\udd17\u0100ei\u127b\u1289\u01f2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128e\u1298kSpace;\uc000\u205f\u200aSpace;\u6009lde\u0200;EFT\u12ab\u12ac\u12b2\u12bc\u623cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uc000\ud835\udd4bipleDot;\u60db\u0100ct\u12d6\u12dbr;\uc000\ud835\udcafrok;\u4166\u0ae1\u12f7\u130e\u131a\u1326\0\u132c\u1331\0\0\0\0\0\u1338\u133d\u1377\u1385\0\u13ff\u1404\u140a\u1410\u0100cr\u12fb\u1301ute\u803b\xda\u40dar\u0100;o\u1307\u1308\u619fcir;\u6949r\u01e3\u1313\0\u1316y;\u440eve;\u416c\u0100iy\u131e\u1323rc\u803b\xdb\u40db;\u4423blac;\u4170r;\uc000\ud835\udd18rave\u803b\xd9\u40d9acr;\u416a\u0100di\u1341\u1369er\u0100BP\u1348\u135d\u0100ar\u134d\u1350r;\u405fac\u0100ek\u1357\u1359;\u63dfet;\u63b5arenthesis;\u63ddon\u0100;P\u1370\u1371\u62c3lus;\u628e\u0100gp\u137b\u137fon;\u4172f;\uc000\ud835\udd4c\u0400ADETadps\u1395\u13ae\u13b8\u13c4\u03e8\u13d2\u13d7\u13f3rrow\u0180;BD\u1150\u13a0\u13a4ar;\u6912ownArrow;\u61c5ownArrow;\u6195quilibrium;\u696eee\u0100;A\u13cb\u13cc\u62a5rrow;\u61a5own\xe1\u03f3er\u0100LR\u13de\u13e8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13f9\u13fa\u43d2on;\u43a5ing;\u416ecr;\uc000\ud835\udcb0ilde;\u4168ml\u803b\xdc\u40dc\u0480Dbcdefosv\u1427\u142c\u1430\u1433\u143e\u1485\u148a\u1490\u1496ash;\u62abar;\u6aeby;\u4412ash\u0100;l\u143b\u143c\u62a9;\u6ae6\u0100er\u1443\u1445;\u62c1\u0180bty\u144c\u1450\u147aar;\u6016\u0100;i\u144f\u1455cal\u0200BLST\u1461\u1465\u146a\u1474ar;\u6223ine;\u407ceparator;\u6758ilde;\u6240ThinSpace;\u600ar;\uc000\ud835\udd19pf;\uc000\ud835\udd4dcr;\uc000\ud835\udcb1dash;\u62aa\u0280cefos\u14a7\u14ac\u14b1\u14b6\u14bcirc;\u4174dge;\u62c0r;\uc000\ud835\udd1apf;\uc000\ud835\udd4ecr;\uc000\ud835\udcb2\u0200fios\u14cb\u14d0\u14d2\u14d8r;\uc000\ud835\udd1b;\u439epf;\uc000\ud835\udd4fcr;\uc000\ud835\udcb3\u0480AIUacfosu\u14f1\u14f5\u14f9\u14fd\u1504\u150f\u1514\u151a\u1520cy;\u442fcy;\u4407cy;\u442ecute\u803b\xdd\u40dd\u0100iy\u1509\u150drc;\u4176;\u442br;\uc000\ud835\udd1cpf;\uc000\ud835\udd50cr;\uc000\ud835\udcb4ml;\u4178\u0400Hacdefos\u1535\u1539\u153f\u154b\u154f\u155d\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417d;\u4417ot;\u417b\u01f2\u1554\0\u155boWidt\xe8\u0ad9a;\u4396r;\u6128pf;\u6124cr;\uc000\ud835\udcb5\u0be1\u1583\u158a\u1590\0\u15b0\u15b6\u15bf\0\0\0\0\u15c6\u15db\u15eb\u165f\u166d\0\u1695\u169b\u16b2\u16b9\0\u16becute\u803b\xe1\u40e1reve;\u4103\u0300;Ediuy\u159c\u159d\u15a1\u15a3\u15a8\u15ad\u623e;\uc000\u223e\u0333;\u623frc\u803b\xe2\u40e2te\u80bb\xb4\u0306;\u4430lig\u803b\xe6\u40e6\u0100;r\xb2\u15ba;\uc000\ud835\udd1erave\u803b\xe0\u40e0\u0100ep\u15ca\u15d6\u0100fp\u15cf\u15d4sym;\u6135\xe8\u15d3ha;\u43b1\u0100ap\u15dfc\u0100cl\u15e4\u15e7r;\u4101g;\u6a3f\u0264\u15f0\0\0\u160a\u0280;adsv\u15fa\u15fb\u15ff\u1601\u1607\u6227nd;\u6a55;\u6a5clope;\u6a58;\u6a5a\u0380;elmrsz\u1618\u1619\u161b\u161e\u163f\u164f\u1659\u6220;\u69a4e\xbb\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163a\u163c\u163e;\u69a8;\u69a9;\u69aa;\u69ab;\u69ac;\u69ad;\u69ae;\u69aft\u0100;v\u1645\u1646\u621fb\u0100;d\u164c\u164d\u62be;\u699d\u0100pt\u1654\u1657h;\u6222\xbb\xb9arr;\u637c\u0100gp\u1663\u1667on;\u4105f;\uc000\ud835\udd52\u0380;Eaeiop\u12c1\u167b\u167d\u1682\u1684\u1687\u168a;\u6a70cir;\u6a6f;\u624ad;\u624bs;\u4027rox\u0100;e\u12c1\u1692\xf1\u1683ing\u803b\xe5\u40e5\u0180cty\u16a1\u16a6\u16a8r;\uc000\ud835\udcb6;\u402amp\u0100;e\u12c1\u16af\xf1\u0288ilde\u803b\xe3\u40e3ml\u803b\xe4\u40e4\u0100ci\u16c2\u16c8onin\xf4\u0272nt;\u6a11\u0800Nabcdefiklnoprsu\u16ed\u16f1\u1730\u173c\u1743\u1748\u1778\u177d\u17e0\u17e6\u1839\u1850\u170d\u193d\u1948\u1970ot;\u6aed\u0100cr\u16f6\u171ek\u0200ceps\u1700\u1705\u170d\u1713ong;\u624cpsilon;\u43f6rime;\u6035im\u0100;e\u171a\u171b\u623dq;\u62cd\u0176\u1722\u1726ee;\u62bded\u0100;g\u172c\u172d\u6305e\xbb\u172drk\u0100;t\u135c\u1737brk;\u63b6\u0100oy\u1701\u1741;\u4431quo;\u601e\u0280cmprt\u1753\u175b\u1761\u1764\u1768aus\u0100;e\u010a\u0109ptyv;\u69b0s\xe9\u170cno\xf5\u0113\u0180ahw\u176f\u1771\u1773;\u43b2;\u6136een;\u626cr;\uc000\ud835\udd1fg\u0380costuvw\u178d\u179d\u17b3\u17c1\u17d5\u17db\u17de\u0180aiu\u1794\u1796\u179a\xf0\u0760rc;\u65efp\xbb\u1371\u0180dpt\u17a4\u17a8\u17adot;\u6a00lus;\u6a01imes;\u6a02\u0271\u17b9\0\0\u17becup;\u6a06ar;\u6605riangle\u0100du\u17cd\u17d2own;\u65bdp;\u65b3plus;\u6a04e\xe5\u1444\xe5\u14adarow;\u690d\u0180ako\u17ed\u1826\u1835\u0100cn\u17f2\u1823k\u0180lst\u17fa\u05ab\u1802ozenge;\u69ebriangle\u0200;dlr\u1812\u1813\u1818\u181d\u65b4own;\u65beeft;\u65c2ight;\u65b8k;\u6423\u01b1\u182b\0\u1833\u01b2\u182f\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183e\u184d\u0100;q\u1843\u1846\uc000=\u20e5uiv;\uc000\u2261\u20e5t;\u6310\u0200ptwx\u1859\u185e\u1867\u186cf;\uc000\ud835\udd53\u0100;t\u13cb\u1863om\xbb\u13cctie;\u62c8\u0600DHUVbdhmptuv\u1885\u1896\u18aa\u18bb\u18d7\u18db\u18ec\u18ff\u1905\u190a\u1910\u1921\u0200LRlr\u188e\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18a1\u18a2\u18a4\u18a6\u18a8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18b3\u18b5\u18b7\u18b9;\u655d;\u655a;\u655c;\u6559\u0380;HLRhlr\u18ca\u18cb\u18cd\u18cf\u18d1\u18d3\u18d5\u6551;\u656c;\u6563;\u6560;\u656b;\u6562;\u655fox;\u69c9\u0200LRlr\u18e4\u18e6\u18e8\u18ea;\u6555;\u6552;\u6510;\u650c\u0280;DUdu\u06bd\u18f7\u18f9\u18fb\u18fd;\u6565;\u6568;\u652c;\u6534inus;\u629flus;\u629eimes;\u62a0\u0200LRlr\u1919\u191b\u191d\u191f;\u655b;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193b\u6502;\u656a;\u6561;\u655e;\u653c;\u6524;\u651c\u0100ev\u0123\u1942bar\u803b\xa6\u40a6\u0200ceio\u1951\u1956\u195a\u1960r;\uc000\ud835\udcb7mi;\u604fm\u0100;e\u171a\u171cl\u0180;bh\u1968\u1969\u196b\u405c;\u69c5sub;\u67c8\u016c\u1974\u197el\u0100;e\u1979\u197a\u6022t\xbb\u197ap\u0180;Ee\u012f\u1985\u1987;\u6aae\u0100;q\u06dc\u06db\u0ce1\u19a7\0\u19e8\u1a11\u1a15\u1a32\0\u1a37\u1a50\0\0\u1ab4\0\0\u1ac1\0\0\u1b21\u1b2e\u1b4d\u1b52\0\u1bfd\0\u1c0c\u0180cpr\u19ad\u19b2\u19ddute;\u4107\u0300;abcds\u19bf\u19c0\u19c4\u19ca\u19d5\u19d9\u6229nd;\u6a44rcup;\u6a49\u0100au\u19cf\u19d2p;\u6a4bp;\u6a47ot;\u6a40;\uc000\u2229\ufe00\u0100eo\u19e2\u19e5t;\u6041\xee\u0693\u0200aeiu\u19f0\u19fb\u1a01\u1a05\u01f0\u19f5\0\u19f8s;\u6a4don;\u410ddil\u803b\xe7\u40e7rc;\u4109ps\u0100;s\u1a0c\u1a0d\u6a4cm;\u6a50ot;\u410b\u0180dmn\u1a1b\u1a20\u1a26il\u80bb\xb8\u01adptyv;\u69b2t\u8100\xa2;e\u1a2d\u1a2e\u40a2r\xe4\u01b2r;\uc000\ud835\udd20\u0180cei\u1a3d\u1a40\u1a4dy;\u4447ck\u0100;m\u1a47\u1a48\u6713ark\xbb\u1a48;\u43c7r\u0380;Ecefms\u1a5f\u1a60\u1a62\u1a6b\u1aa4\u1aaa\u1aae\u65cb;\u69c3\u0180;el\u1a69\u1a6a\u1a6d\u42c6q;\u6257e\u0261\u1a74\0\0\u1a88rrow\u0100lr\u1a7c\u1a81eft;\u61baight;\u61bb\u0280RSacd\u1a92\u1a94\u1a96\u1a9a\u1a9f\xbb\u0f47;\u64c8st;\u629birc;\u629aash;\u629dnint;\u6a10id;\u6aefcir;\u69c2ubs\u0100;u\u1abb\u1abc\u6663it\xbb\u1abc\u02ec\u1ac7\u1ad4\u1afa\0\u1b0aon\u0100;e\u1acd\u1ace\u403a\u0100;q\xc7\xc6\u026d\u1ad9\0\0\u1ae2a\u0100;t\u1ade\u1adf\u402c;\u4040\u0180;fl\u1ae8\u1ae9\u1aeb\u6201\xee\u1160e\u0100mx\u1af1\u1af6ent\xbb\u1ae9e\xf3\u024d\u01e7\u1afe\0\u1b07\u0100;d\u12bb\u1b02ot;\u6a6dn\xf4\u0246\u0180fry\u1b10\u1b14\u1b17;\uc000\ud835\udd54o\xe4\u0254\u8100\xa9;s\u0155\u1b1dr;\u6117\u0100ao\u1b25\u1b29rr;\u61b5ss;\u6717\u0100cu\u1b32\u1b37r;\uc000\ud835\udcb8\u0100bp\u1b3c\u1b44\u0100;e\u1b41\u1b42\u6acf;\u6ad1\u0100;e\u1b49\u1b4a\u6ad0;\u6ad2dot;\u62ef\u0380delprvw\u1b60\u1b6c\u1b77\u1b82\u1bac\u1bd4\u1bf9arr\u0100lr\u1b68\u1b6a;\u6938;\u6935\u0270\u1b72\0\0\u1b75r;\u62dec;\u62dfarr\u0100;p\u1b7f\u1b80\u61b6;\u693d\u0300;bcdos\u1b8f\u1b90\u1b96\u1ba1\u1ba5\u1ba8\u622arcap;\u6a48\u0100au\u1b9b\u1b9ep;\u6a46p;\u6a4aot;\u628dr;\u6a45;\uc000\u222a\ufe00\u0200alrv\u1bb5\u1bbf\u1bde\u1be3rr\u0100;m\u1bbc\u1bbd\u61b7;\u693cy\u0180evw\u1bc7\u1bd4\u1bd8q\u0270\u1bce\0\0\u1bd2re\xe3\u1b73u\xe3\u1b75ee;\u62ceedge;\u62cfen\u803b\xa4\u40a4earrow\u0100lr\u1bee\u1bf3eft\xbb\u1b80ight\xbb\u1bbde\xe4\u1bdd\u0100ci\u1c01\u1c07onin\xf4\u01f7nt;\u6231lcty;\u632d\u0980AHabcdefhijlorstuwz\u1c38\u1c3b\u1c3f\u1c5d\u1c69\u1c75\u1c8a\u1c9e\u1cac\u1cb7\u1cfb\u1cff\u1d0d\u1d7b\u1d91\u1dab\u1dbb\u1dc6\u1dcdr\xf2\u0381ar;\u6965\u0200glrs\u1c48\u1c4d\u1c52\u1c54ger;\u6020eth;\u6138\xf2\u1133h\u0100;v\u1c5a\u1c5b\u6010\xbb\u090a\u016b\u1c61\u1c67arow;\u690fa\xe3\u0315\u0100ay\u1c6e\u1c73ron;\u410f;\u4434\u0180;ao\u0332\u1c7c\u1c84\u0100gr\u02bf\u1c81r;\u61catseq;\u6a77\u0180glm\u1c91\u1c94\u1c98\u803b\xb0\u40b0ta;\u43b4ptyv;\u69b1\u0100ir\u1ca3\u1ca8sht;\u697f;\uc000\ud835\udd21ar\u0100lr\u1cb3\u1cb5\xbb\u08dc\xbb\u101e\u0280aegsv\u1cc2\u0378\u1cd6\u1cdc\u1ce0m\u0180;os\u0326\u1cca\u1cd4nd\u0100;s\u0326\u1cd1uit;\u6666amma;\u43ddin;\u62f2\u0180;io\u1ce7\u1ce8\u1cf8\u40f7de\u8100\xf7;o\u1ce7\u1cf0ntimes;\u62c7n\xf8\u1cf7cy;\u4452c\u026f\u1d06\0\0\u1d0arn;\u631eop;\u630d\u0280lptuw\u1d18\u1d1d\u1d22\u1d49\u1d55lar;\u4024f;\uc000\ud835\udd55\u0280;emps\u030b\u1d2d\u1d37\u1d3d\u1d42q\u0100;d\u0352\u1d33ot;\u6251inus;\u6238lus;\u6214quare;\u62a1blebarwedg\xe5\xfan\u0180adh\u112e\u1d5d\u1d67ownarrow\xf3\u1c83arpoon\u0100lr\u1d72\u1d76ef\xf4\u1cb4igh\xf4\u1cb6\u0162\u1d7f\u1d85karo\xf7\u0f42\u026f\u1d8a\0\0\u1d8ern;\u631fop;\u630c\u0180cot\u1d98\u1da3\u1da6\u0100ry\u1d9d\u1da1;\uc000\ud835\udcb9;\u4455l;\u69f6rok;\u4111\u0100dr\u1db0\u1db4ot;\u62f1i\u0100;f\u1dba\u1816\u65bf\u0100ah\u1dc0\u1dc3r\xf2\u0429a\xf2\u0fa6angle;\u69a6\u0100ci\u1dd2\u1dd5y;\u445fgrarr;\u67ff\u0900Dacdefglmnopqrstux\u1e01\u1e09\u1e19\u1e38\u0578\u1e3c\u1e49\u1e61\u1e7e\u1ea5\u1eaf\u1ebd\u1ee1\u1f2a\u1f37\u1f44\u1f4e\u1f5a\u0100Do\u1e06\u1d34o\xf4\u1c89\u0100cs\u1e0e\u1e14ute\u803b\xe9\u40e9ter;\u6a6e\u0200aioy\u1e22\u1e27\u1e31\u1e36ron;\u411br\u0100;c\u1e2d\u1e2e\u6256\u803b\xea\u40ealon;\u6255;\u444dot;\u4117\u0100Dr\u1e41\u1e45ot;\u6252;\uc000\ud835\udd22\u0180;rs\u1e50\u1e51\u1e57\u6a9aave\u803b\xe8\u40e8\u0100;d\u1e5c\u1e5d\u6a96ot;\u6a98\u0200;ils\u1e6a\u1e6b\u1e72\u1e74\u6a99nters;\u63e7;\u6113\u0100;d\u1e79\u1e7a\u6a95ot;\u6a97\u0180aps\u1e85\u1e89\u1e97cr;\u4113ty\u0180;sv\u1e92\u1e93\u1e95\u6205et\xbb\u1e93p\u01001;\u1e9d\u1ea4\u0133\u1ea1\u1ea3;\u6004;\u6005\u6003\u0100gs\u1eaa\u1eac;\u414bp;\u6002\u0100gp\u1eb4\u1eb8on;\u4119f;\uc000\ud835\udd56\u0180als\u1ec4\u1ece\u1ed2r\u0100;s\u1eca\u1ecb\u62d5l;\u69e3us;\u6a71i\u0180;lv\u1eda\u1edb\u1edf\u43b5on\xbb\u1edb;\u43f5\u0200csuv\u1eea\u1ef3\u1f0b\u1f23\u0100io\u1eef\u1e31rc\xbb\u1e2e\u0269\u1ef9\0\0\u1efb\xed\u0548ant\u0100gl\u1f02\u1f06tr\xbb\u1e5dess\xbb\u1e7a\u0180aei\u1f12\u1f16\u1f1als;\u403dst;\u625fv\u0100;D\u0235\u1f20D;\u6a78parsl;\u69e5\u0100Da\u1f2f\u1f33ot;\u6253rr;\u6971\u0180cdi\u1f3e\u1f41\u1ef8r;\u612fo\xf4\u0352\u0100ah\u1f49\u1f4b;\u43b7\u803b\xf0\u40f0\u0100mr\u1f53\u1f57l\u803b\xeb\u40ebo;\u60ac\u0180cip\u1f61\u1f64\u1f67l;\u4021s\xf4\u056e\u0100eo\u1f6c\u1f74ctatio\xee\u0559nential\xe5\u0579\u09e1\u1f92\0\u1f9e\0\u1fa1\u1fa7\0\0\u1fc6\u1fcc\0\u1fd3\0\u1fe6\u1fea\u2000\0\u2008\u205allingdotse\xf1\u1e44y;\u4444male;\u6640\u0180ilr\u1fad\u1fb3\u1fc1lig;\u8000\ufb03\u0269\u1fb9\0\0\u1fbdg;\u8000\ufb00ig;\u8000\ufb04;\uc000\ud835\udd23lig;\u8000\ufb01lig;\uc000fj\u0180alt\u1fd9\u1fdc\u1fe1t;\u666dig;\u8000\ufb02ns;\u65b1of;\u4192\u01f0\u1fee\0\u1ff3f;\uc000\ud835\udd57\u0100ak\u05bf\u1ff7\u0100;v\u1ffc\u1ffd\u62d4;\u6ad9artint;\u6a0d\u0100ao\u200c\u2055\u0100cs\u2011\u2052\u03b1\u201a\u2030\u2038\u2045\u2048\0\u2050\u03b2\u2022\u2025\u2027\u202a\u202c\0\u202e\u803b\xbd\u40bd;\u6153\u803b\xbc\u40bc;\u6155;\u6159;\u615b\u01b3\u2034\0\u2036;\u6154;\u6156\u02b4\u203e\u2041\0\0\u2043\u803b\xbe\u40be;\u6157;\u615c5;\u6158\u01b6\u204c\0\u204e;\u615a;\u615d8;\u615el;\u6044wn;\u6322cr;\uc000\ud835\udcbb\u0880Eabcdefgijlnorstv\u2082\u2089\u209f\u20a5\u20b0\u20b4\u20f0\u20f5\u20fa\u20ff\u2103\u2112\u2138\u0317\u213e\u2152\u219e\u0100;l\u064d\u2087;\u6a8c\u0180cmp\u2090\u2095\u209dute;\u41f5ma\u0100;d\u209c\u1cda\u43b3;\u6a86reve;\u411f\u0100iy\u20aa\u20aerc;\u411d;\u4433ot;\u4121\u0200;lqs\u063e\u0642\u20bd\u20c9\u0180;qs\u063e\u064c\u20c4lan\xf4\u0665\u0200;cdl\u0665\u20d2\u20d5\u20e5c;\u6aa9ot\u0100;o\u20dc\u20dd\u6a80\u0100;l\u20e2\u20e3\u6a82;\u6a84\u0100;e\u20ea\u20ed\uc000\u22db\ufe00s;\u6a94r;\uc000\ud835\udd24\u0100;g\u0673\u061bmel;\u6137cy;\u4453\u0200;Eaj\u065a\u210c\u210e\u2110;\u6a92;\u6aa5;\u6aa4\u0200Eaes\u211b\u211d\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6a8arox\xbb\u2124\u0100;q\u212e\u212f\u6a88\u0100;q\u212e\u211bim;\u62e7pf;\uc000\ud835\udd58\u0100ci\u2143\u2146r;\u610am\u0180;el\u066b\u214e\u2150;\u6a8e;\u6a90\u8300>;cdlqr\u05ee\u2160\u216a\u216e\u2173\u2179\u0100ci\u2165\u2167;\u6aa7r;\u6a7aot;\u62d7Par;\u6995uest;\u6a7c\u0280adels\u2184\u216a\u2190\u0656\u219b\u01f0\u2189\0\u218epro\xf8\u209er;\u6978q\u0100lq\u063f\u2196les\xf3\u2088i\xed\u066b\u0100en\u21a3\u21adrtneqq;\uc000\u2269\ufe00\xc5\u21aa\u0500Aabcefkosy\u21c4\u21c7\u21f1\u21f5\u21fa\u2218\u221d\u222f\u2268\u227dr\xf2\u03a0\u0200ilmr\u21d0\u21d4\u21d7\u21dbrs\xf0\u1484f\xbb\u2024il\xf4\u06a9\u0100dr\u21e0\u21e4cy;\u444a\u0180;cw\u08f4\u21eb\u21efir;\u6948;\u61adar;\u610firc;\u4125\u0180alr\u2201\u220e\u2213rts\u0100;u\u2209\u220a\u6665it\xbb\u220alip;\u6026con;\u62b9r;\uc000\ud835\udd25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223a\u223e\u2243\u225e\u2263rr;\u61fftht;\u623bk\u0100lr\u2249\u2253eftarrow;\u61a9ightarrow;\u61aaf;\uc000\ud835\udd59bar;\u6015\u0180clt\u226f\u2274\u2278r;\uc000\ud835\udcbdas\xe8\u21f4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xbb\u1c5b\u0ae1\u22a3\0\u22aa\0\u22b8\u22c5\u22ce\0\u22d5\u22f3\0\0\u22f8\u2322\u2367\u2362\u237f\0\u2386\u23aa\u23b4cute\u803b\xed\u40ed\u0180;iy\u0771\u22b0\u22b5rc\u803b\xee\u40ee;\u4438\u0100cx\u22bc\u22bfy;\u4435cl\u803b\xa1\u40a1\u0100fr\u039f\u22c9;\uc000\ud835\udd26rave\u803b\xec\u40ec\u0200;ino\u073e\u22dd\u22e9\u22ee\u0100in\u22e2\u22e6nt;\u6a0ct;\u622dfin;\u69dcta;\u6129lig;\u4133\u0180aop\u22fe\u231a\u231d\u0180cgt\u2305\u2308\u2317r;\u412b\u0180elp\u071f\u230f\u2313in\xe5\u078ear\xf4\u0720h;\u4131f;\u62b7ed;\u41b5\u0280;cfot\u04f4\u232c\u2331\u233d\u2341are;\u6105in\u0100;t\u2338\u2339\u621eie;\u69dddo\xf4\u2319\u0280;celp\u0757\u234c\u2350\u235b\u2361al;\u62ba\u0100gr\u2355\u2359er\xf3\u1563\xe3\u234darhk;\u6a17rod;\u6a3c\u0200cgpt\u236f\u2372\u2376\u237by;\u4451on;\u412ff;\uc000\ud835\udd5aa;\u43b9uest\u803b\xbf\u40bf\u0100ci\u238a\u238fr;\uc000\ud835\udcben\u0280;Edsv\u04f4\u239b\u239d\u23a1\u04f3;\u62f9ot;\u62f5\u0100;v\u23a6\u23a7\u62f4;\u62f3\u0100;i\u0777\u23aelde;\u4129\u01eb\u23b8\0\u23bccy;\u4456l\u803b\xef\u40ef\u0300cfmosu\u23cc\u23d7\u23dc\u23e1\u23e7\u23f5\u0100iy\u23d1\u23d5rc;\u4135;\u4439r;\uc000\ud835\udd27ath;\u4237pf;\uc000\ud835\udd5b\u01e3\u23ec\0\u23f1r;\uc000\ud835\udcbfrcy;\u4458kcy;\u4454\u0400acfghjos\u240b\u2416\u2422\u2427\u242d\u2431\u2435\u243bppa\u0100;v\u2413\u2414\u43ba;\u43f0\u0100ey\u241b\u2420dil;\u4137;\u443ar;\uc000\ud835\udd28reen;\u4138cy;\u4445cy;\u445cpf;\uc000\ud835\udd5ccr;\uc000\ud835\udcc0\u0b80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248d\u2491\u250e\u253d\u255a\u2580\u264e\u265e\u2665\u2679\u267d\u269a\u26b2\u26d8\u275d\u2768\u278b\u27c0\u2801\u2812\u0180art\u2477\u247a\u247cr\xf2\u09c6\xf2\u0395ail;\u691barr;\u690e\u0100;g\u0994\u248b;\u6a8bar;\u6962\u0963\u24a5\0\u24aa\0\u24b1\0\0\0\0\0\u24b5\u24ba\0\u24c6\u24c8\u24cd\0\u24f9ute;\u413amptyv;\u69b4ra\xee\u084cbda;\u43bbg\u0180;dl\u088e\u24c1\u24c3;\u6991\xe5\u088e;\u6a85uo\u803b\xab\u40abr\u0400;bfhlpst\u0899\u24de\u24e6\u24e9\u24eb\u24ee\u24f1\u24f5\u0100;f\u089d\u24e3s;\u691fs;\u691d\xeb\u2252p;\u61abl;\u6939im;\u6973l;\u61a2\u0180;ae\u24ff\u2500\u2504\u6aabil;\u6919\u0100;s\u2509\u250a\u6aad;\uc000\u2aad\ufe00\u0180abr\u2515\u2519\u251drr;\u690crk;\u6772\u0100ak\u2522\u252cc\u0100ek\u2528\u252a;\u407b;\u405b\u0100es\u2531\u2533;\u698bl\u0100du\u2539\u253b;\u698f;\u698d\u0200aeuy\u2546\u254b\u2556\u2558ron;\u413e\u0100di\u2550\u2554il;\u413c\xec\u08b0\xe2\u2529;\u443b\u0200cqrs\u2563\u2566\u256d\u257da;\u6936uo\u0100;r\u0e19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694bh;\u61b2\u0280;fgqs\u258b\u258c\u0989\u25f3\u25ff\u6264t\u0280ahlrt\u2598\u25a4\u25b7\u25c2\u25e8rrow\u0100;t\u0899\u25a1a\xe9\u24f6arpoon\u0100du\u25af\u25b4own\xbb\u045ap\xbb\u0966eftarrows;\u61c7ight\u0180ahs\u25cd\u25d6\u25derrow\u0100;s\u08f4\u08a7arpoon\xf3\u0f98quigarro\xf7\u21f0hreetimes;\u62cb\u0180;qs\u258b\u0993\u25falan\xf4\u09ac\u0280;cdgs\u09ac\u260a\u260d\u261d\u2628c;\u6aa8ot\u0100;o\u2614\u2615\u6a7f\u0100;r\u261a\u261b\u6a81;\u6a83\u0100;e\u2622\u2625\uc000\u22da\ufe00s;\u6a93\u0280adegs\u2633\u2639\u263d\u2649\u264bppro\xf8\u24c6ot;\u62d6q\u0100gq\u2643\u2645\xf4\u0989gt\xf2\u248c\xf4\u099bi\xed\u09b2\u0180ilr\u2655\u08e1\u265asht;\u697c;\uc000\ud835\udd29\u0100;E\u099c\u2663;\u6a91\u0161\u2669\u2676r\u0100du\u25b2\u266e\u0100;l\u0965\u2673;\u696alk;\u6584cy;\u4459\u0280;acht\u0a48\u2688\u268b\u2691\u2696r\xf2\u25c1orne\xf2\u1d08ard;\u696bri;\u65fa\u0100io\u269f\u26a4dot;\u4140ust\u0100;a\u26ac\u26ad\u63b0che\xbb\u26ad\u0200Eaes\u26bb\u26bd\u26c9\u26d4;\u6268p\u0100;p\u26c3\u26c4\u6a89rox\xbb\u26c4\u0100;q\u26ce\u26cf\u6a87\u0100;q\u26ce\u26bbim;\u62e6\u0400abnoptwz\u26e9\u26f4\u26f7\u271a\u272f\u2741\u2747\u2750\u0100nr\u26ee\u26f1g;\u67ecr;\u61fdr\xeb\u08c1g\u0180lmr\u26ff\u270d\u2714eft\u0100ar\u09e6\u2707ight\xe1\u09f2apsto;\u67fcight\xe1\u09fdparrow\u0100lr\u2725\u2729ef\xf4\u24edight;\u61ac\u0180afl\u2736\u2739\u273dr;\u6985;\uc000\ud835\udd5dus;\u6a2dimes;\u6a34\u0161\u274b\u274fst;\u6217\xe1\u134e\u0180;ef\u2757\u2758\u1800\u65cange\xbb\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277c\u2785\u2787r\xf2\u08a8orne\xf2\u1d8car\u0100;d\u0f98\u2783;\u696d;\u600eri;\u62bf\u0300achiqt\u2798\u279d\u0a40\u27a2\u27ae\u27bbquo;\u6039r;\uc000\ud835\udcc1m\u0180;eg\u09b2\u27aa\u27ac;\u6a8d;\u6a8f\u0100bu\u252a\u27b3o\u0100;r\u0e1f\u27b9;\u601arok;\u4142\u8400<;cdhilqr\u082b\u27d2\u2639\u27dc\u27e0\u27e5\u27ea\u27f0\u0100ci\u27d7\u27d9;\u6aa6r;\u6a79re\xe5\u25f2mes;\u62c9arr;\u6976uest;\u6a7b\u0100Pi\u27f5\u27f9ar;\u6996\u0180;ef\u2800\u092d\u181b\u65c3r\u0100du\u2807\u280dshar;\u694ahar;\u6966\u0100en\u2817\u2821rtneqq;\uc000\u2268\ufe00\xc5\u281e\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288e\u2893\u28a0\u28a5\u28a8\u28da\u28e2\u28e4\u0a83\u28f3\u2902Dot;\u623a\u0200clpr\u284e\u2852\u2863\u287dr\u803b\xaf\u40af\u0100et\u2857\u2859;\u6642\u0100;e\u285e\u285f\u6720se\xbb\u285f\u0100;s\u103b\u2868to\u0200;dlu\u103b\u2873\u2877\u287bow\xee\u048cef\xf4\u090f\xf0\u13d1ker;\u65ae\u0100oy\u2887\u288cmma;\u6a29;\u443cash;\u6014asuredangle\xbb\u1626r;\uc000\ud835\udd2ao;\u6127\u0180cdn\u28af\u28b4\u28c9ro\u803b\xb5\u40b5\u0200;acd\u1464\u28bd\u28c0\u28c4s\xf4\u16a7ir;\u6af0ot\u80bb\xb7\u01b5us\u0180;bd\u28d2\u1903\u28d3\u6212\u0100;u\u1d3c\u28d8;\u6a2a\u0163\u28de\u28e1p;\u6adb\xf2\u2212\xf0\u0a81\u0100dp\u28e9\u28eeels;\u62a7f;\uc000\ud835\udd5e\u0100ct\u28f8\u28fdr;\uc000\ud835\udcc2pos\xbb\u159d\u0180;lm\u2909\u290a\u290d\u43bctimap;\u62b8\u0c00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297e\u2989\u2998\u29da\u29e9\u2a15\u2a1a\u2a58\u2a5d\u2a83\u2a95\u2aa4\u2aa8\u2b04\u2b07\u2b44\u2b7f\u2bae\u2c34\u2c67\u2c7c\u2ce9\u0100gt\u2947\u294b;\uc000\u22d9\u0338\u0100;v\u2950\u0bcf\uc000\u226b\u20d2\u0180elt\u295a\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61cdightarrow;\u61ce;\uc000\u22d8\u0338\u0100;v\u297b\u0c47\uc000\u226a\u20d2ightarrow;\u61cf\u0100Dd\u298e\u2993ash;\u62afash;\u62ae\u0280bcnpt\u29a3\u29a7\u29ac\u29b1\u29ccla\xbb\u02deute;\u4144g;\uc000\u2220\u20d2\u0280;Eiop\u0d84\u29bc\u29c0\u29c5\u29c8;\uc000\u2a70\u0338d;\uc000\u224b\u0338s;\u4149ro\xf8\u0d84ur\u0100;a\u29d3\u29d4\u666el\u0100;s\u29d3\u0b38\u01f3\u29df\0\u29e3p\u80bb\xa0\u0b37mp\u0100;e\u0bf9\u0c00\u0280aeouy\u29f4\u29fe\u2a03\u2a10\u2a13\u01f0\u29f9\0\u29fb;\u6a43on;\u4148dil;\u4146ng\u0100;d\u0d7e\u2a0aot;\uc000\u2a6d\u0338p;\u6a42;\u443dash;\u6013\u0380;Aadqsx\u0b92\u2a29\u2a2d\u2a3b\u2a41\u2a45\u2a50rr;\u61d7r\u0100hr\u2a33\u2a36k;\u6924\u0100;o\u13f2\u13f0ot;\uc000\u2250\u0338ui\xf6\u0b63\u0100ei\u2a4a\u2a4ear;\u6928\xed\u0b98ist\u0100;s\u0ba0\u0b9fr;\uc000\ud835\udd2b\u0200Eest\u0bc5\u2a66\u2a79\u2a7c\u0180;qs\u0bbc\u2a6d\u0be1\u0180;qs\u0bbc\u0bc5\u2a74lan\xf4\u0be2i\xed\u0bea\u0100;r\u0bb6\u2a81\xbb\u0bb7\u0180Aap\u2a8a\u2a8d\u2a91r\xf2\u2971rr;\u61aear;\u6af2\u0180;sv\u0f8d\u2a9c\u0f8c\u0100;d\u2aa1\u2aa2\u62fc;\u62facy;\u445a\u0380AEadest\u2ab7\u2aba\u2abe\u2ac2\u2ac5\u2af6\u2af9r\xf2\u2966;\uc000\u2266\u0338rr;\u619ar;\u6025\u0200;fqs\u0c3b\u2ace\u2ae3\u2aeft\u0100ar\u2ad4\u2ad9rro\xf7\u2ac1ightarro\xf7\u2a90\u0180;qs\u0c3b\u2aba\u2aealan\xf4\u0c55\u0100;s\u0c55\u2af4\xbb\u0c36i\xed\u0c5d\u0100;r\u0c35\u2afei\u0100;e\u0c1a\u0c25i\xe4\u0d90\u0100pt\u2b0c\u2b11f;\uc000\ud835\udd5f\u8180\xac;in\u2b19\u2b1a\u2b36\u40acn\u0200;Edv\u0b89\u2b24\u2b28\u2b2e;\uc000\u22f9\u0338ot;\uc000\u22f5\u0338\u01e1\u0b89\u2b33\u2b35;\u62f7;\u62f6i\u0100;v\u0cb8\u2b3c\u01e1\u0cb8\u2b41\u2b43;\u62fe;\u62fd\u0180aor\u2b4b\u2b63\u2b69r\u0200;ast\u0b7b\u2b55\u2b5a\u2b5flle\xec\u0b7bl;\uc000\u2afd\u20e5;\uc000\u2202\u0338lint;\u6a14\u0180;ce\u0c92\u2b70\u2b73u\xe5\u0ca5\u0100;c\u0c98\u2b78\u0100;e\u0c92\u2b7d\xf1\u0c98\u0200Aait\u2b88\u2b8b\u2b9d\u2ba7r\xf2\u2988rr\u0180;cw\u2b94\u2b95\u2b99\u619b;\uc000\u2933\u0338;\uc000\u219d\u0338ghtarrow\xbb\u2b95ri\u0100;e\u0ccb\u0cd6\u0380chimpqu\u2bbd\u2bcd\u2bd9\u2b04\u0b78\u2be4\u2bef\u0200;cer\u0d32\u2bc6\u0d37\u2bc9u\xe5\u0d45;\uc000\ud835\udcc3ort\u026d\u2b05\0\0\u2bd6ar\xe1\u2b56m\u0100;e\u0d6e\u2bdf\u0100;q\u0d74\u0d73su\u0100bp\u2beb\u2bed\xe5\u0cf8\xe5\u0d0b\u0180bcp\u2bf6\u2c11\u2c19\u0200;Ees\u2bff\u2c00\u0d22\u2c04\u6284;\uc000\u2ac5\u0338et\u0100;e\u0d1b\u2c0bq\u0100;q\u0d23\u2c00c\u0100;e\u0d32\u2c17\xf1\u0d38\u0200;Ees\u2c22\u2c23\u0d5f\u2c27\u6285;\uc000\u2ac6\u0338et\u0100;e\u0d58\u2c2eq\u0100;q\u0d60\u2c23\u0200gilr\u2c3d\u2c3f\u2c45\u2c47\xec\u0bd7lde\u803b\xf1\u40f1\xe7\u0c43iangle\u0100lr\u2c52\u2c5ceft\u0100;e\u0c1a\u2c5a\xf1\u0c26ight\u0100;e\u0ccb\u2c65\xf1\u0cd7\u0100;m\u2c6c\u2c6d\u43bd\u0180;es\u2c74\u2c75\u2c79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2c8f\u2c94\u2c99\u2c9e\u2ca3\u2cb0\u2cb6\u2cd3\u2ce3ash;\u62adarr;\u6904p;\uc000\u224d\u20d2ash;\u62ac\u0100et\u2ca8\u2cac;\uc000\u2265\u20d2;\uc000>\u20d2nfin;\u69de\u0180Aet\u2cbd\u2cc1\u2cc5rr;\u6902;\uc000\u2264\u20d2\u0100;r\u2cca\u2ccd\uc000<\u20d2ie;\uc000\u22b4\u20d2\u0100At\u2cd8\u2cdcrr;\u6903rie;\uc000\u22b5\u20d2im;\uc000\u223c\u20d2\u0180Aan\u2cf0\u2cf4\u2d02rr;\u61d6r\u0100hr\u2cfa\u2cfdk;\u6923\u0100;o\u13e7\u13e5ear;\u6927\u1253\u1a95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2d2d\0\u2d38\u2d48\u2d60\u2d65\u2d72\u2d84\u1b07\0\0\u2d8d\u2dab\0\u2dc8\u2dce\0\u2ddc\u2e19\u2e2b\u2e3e\u2e43\u0100cs\u2d31\u1a97ute\u803b\xf3\u40f3\u0100iy\u2d3c\u2d45r\u0100;c\u1a9e\u2d42\u803b\xf4\u40f4;\u443e\u0280abios\u1aa0\u2d52\u2d57\u01c8\u2d5alac;\u4151v;\u6a38old;\u69bclig;\u4153\u0100cr\u2d69\u2d6dir;\u69bf;\uc000\ud835\udd2c\u036f\u2d79\0\0\u2d7c\0\u2d82n;\u42dbave\u803b\xf2\u40f2;\u69c1\u0100bm\u2d88\u0df4ar;\u69b5\u0200acit\u2d95\u2d98\u2da5\u2da8r\xf2\u1a80\u0100ir\u2d9d\u2da0r;\u69beoss;\u69bbn\xe5\u0e52;\u69c0\u0180aei\u2db1\u2db5\u2db9cr;\u414dga;\u43c9\u0180cdn\u2dc0\u2dc5\u01cdron;\u43bf;\u69b6pf;\uc000\ud835\udd60\u0180ael\u2dd4\u2dd7\u01d2r;\u69b7rp;\u69b9\u0380;adiosv\u2dea\u2deb\u2dee\u2e08\u2e0d\u2e10\u2e16\u6228r\xf2\u1a86\u0200;efm\u2df7\u2df8\u2e02\u2e05\u6a5dr\u0100;o\u2dfe\u2dff\u6134f\xbb\u2dff\u803b\xaa\u40aa\u803b\xba\u40bagof;\u62b6r;\u6a56lope;\u6a57;\u6a5b\u0180clo\u2e1f\u2e21\u2e27\xf2\u2e01ash\u803b\xf8\u40f8l;\u6298i\u016c\u2e2f\u2e34de\u803b\xf5\u40f5es\u0100;a\u01db\u2e3as;\u6a36ml\u803b\xf6\u40f6bar;\u633d\u0ae1\u2e5e\0\u2e7d\0\u2e80\u2e9d\0\u2ea2\u2eb9\0\0\u2ecb\u0e9c\0\u2f13\0\0\u2f2b\u2fbc\0\u2fc8r\u0200;ast\u0403\u2e67\u2e72\u0e85\u8100\xb6;l\u2e6d\u2e6e\u40b6le\xec\u0403\u0269\u2e78\0\0\u2e7bm;\u6af3;\u6afdy;\u443fr\u0280cimpt\u2e8b\u2e8f\u2e93\u1865\u2e97nt;\u4025od;\u402eil;\u6030enk;\u6031r;\uc000\ud835\udd2d\u0180imo\u2ea8\u2eb0\u2eb4\u0100;v\u2ead\u2eae\u43c6;\u43d5ma\xf4\u0a76ne;\u660e\u0180;tv\u2ebf\u2ec0\u2ec8\u43c0chfork\xbb\u1ffd;\u43d6\u0100au\u2ecf\u2edfn\u0100ck\u2ed5\u2eddk\u0100;h\u21f4\u2edb;\u610e\xf6\u21f4s\u0480;abcdemst\u2ef3\u2ef4\u1908\u2ef9\u2efd\u2f04\u2f06\u2f0a\u2f0e\u402bcir;\u6a23ir;\u6a22\u0100ou\u1d40\u2f02;\u6a25;\u6a72n\u80bb\xb1\u0e9dim;\u6a26wo;\u6a27\u0180ipu\u2f19\u2f20\u2f25ntint;\u6a15f;\uc000\ud835\udd61nd\u803b\xa3\u40a3\u0500;Eaceinosu\u0ec8\u2f3f\u2f41\u2f44\u2f47\u2f81\u2f89\u2f92\u2f7e\u2fb6;\u6ab3p;\u6ab7u\xe5\u0ed9\u0100;c\u0ece\u2f4c\u0300;acens\u0ec8\u2f59\u2f5f\u2f66\u2f68\u2f7eppro\xf8\u2f43urlye\xf1\u0ed9\xf1\u0ece\u0180aes\u2f6f\u2f76\u2f7approx;\u6ab9qq;\u6ab5im;\u62e8i\xed\u0edfme\u0100;s\u2f88\u0eae\u6032\u0180Eas\u2f78\u2f90\u2f7a\xf0\u2f75\u0180dfp\u0eec\u2f99\u2faf\u0180als\u2fa0\u2fa5\u2faalar;\u632eine;\u6312urf;\u6313\u0100;t\u0efb\u2fb4\xef\u0efbrel;\u62b0\u0100ci\u2fc0\u2fc5r;\uc000\ud835\udcc5;\u43c8ncsp;\u6008\u0300fiopsu\u2fda\u22e2\u2fdf\u2fe5\u2feb\u2ff1r;\uc000\ud835\udd2epf;\uc000\ud835\udd62rime;\u6057cr;\uc000\ud835\udcc6\u0180aeo\u2ff8\u3009\u3013t\u0100ei\u2ffe\u3005rnion\xf3\u06b0nt;\u6a16st\u0100;e\u3010\u3011\u403f\xf1\u1f19\xf4\u0f14\u0a80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30e0\u310e\u312b\u3147\u3162\u3172\u318e\u3206\u3215\u3224\u3229\u3258\u326e\u3272\u3290\u32b0\u32b7\u0180art\u3047\u304a\u304cr\xf2\u10b3\xf2\u03ddail;\u691car\xf2\u1c65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307f\u308f\u3094\u30cc\u0100eu\u306d\u3071;\uc000\u223d\u0331te;\u4155i\xe3\u116emptyv;\u69b3g\u0200;del\u0fd1\u3089\u308b\u308d;\u6992;\u69a5\xe5\u0fd1uo\u803b\xbb\u40bbr\u0580;abcfhlpstw\u0fdc\u30ac\u30af\u30b7\u30b9\u30bc\u30be\u30c0\u30c3\u30c7\u30cap;\u6975\u0100;f\u0fe0\u30b4s;\u6920;\u6933s;\u691e\xeb\u225d\xf0\u272el;\u6945im;\u6974l;\u61a3;\u619d\u0100ai\u30d1\u30d5il;\u691ao\u0100;n\u30db\u30dc\u6236al\xf3\u0f1e\u0180abr\u30e7\u30ea\u30eer\xf2\u17e5rk;\u6773\u0100ak\u30f3\u30fdc\u0100ek\u30f9\u30fb;\u407d;\u405d\u0100es\u3102\u3104;\u698cl\u0100du\u310a\u310c;\u698e;\u6990\u0200aeuy\u3117\u311c\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xec\u0ff2\xe2\u30fa;\u4440\u0200clqs\u3134\u3137\u313d\u3144a;\u6937dhar;\u6969uo\u0100;r\u020e\u020dh;\u61b3\u0180acg\u314e\u315f\u0f44l\u0200;ips\u0f78\u3158\u315b\u109cn\xe5\u10bbar\xf4\u0fa9t;\u65ad\u0180ilr\u3169\u1023\u316esht;\u697d;\uc000\ud835\udd2f\u0100ao\u3177\u3186r\u0100du\u317d\u317f\xbb\u047b\u0100;l\u1091\u3184;\u696c\u0100;v\u318b\u318c\u43c1;\u43f1\u0180gns\u3195\u31f9\u31fcht\u0300ahlrst\u31a4\u31b0\u31c2\u31d8\u31e4\u31eerrow\u0100;t\u0fdc\u31ada\xe9\u30c8arpoon\u0100du\u31bb\u31bfow\xee\u317ep\xbb\u1092eft\u0100ah\u31ca\u31d0rrow\xf3\u0feaarpoon\xf3\u0551ightarrows;\u61c9quigarro\xf7\u30cbhreetimes;\u62ccg;\u42daingdotse\xf1\u1f32\u0180ahm\u320d\u3210\u3213r\xf2\u0feaa\xf2\u0551;\u600foust\u0100;a\u321e\u321f\u63b1che\xbb\u321fmid;\u6aee\u0200abpt\u3232\u323d\u3240\u3252\u0100nr\u3237\u323ag;\u67edr;\u61fer\xeb\u1003\u0180afl\u3247\u324a\u324er;\u6986;\uc000\ud835\udd63us;\u6a2eimes;\u6a35\u0100ap\u325d\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6a12ar\xf2\u31e3\u0200achq\u327b\u3280\u10bc\u3285quo;\u603ar;\uc000\ud835\udcc7\u0100bu\u30fb\u328ao\u0100;r\u0214\u0213\u0180hir\u3297\u329b\u32a0re\xe5\u31f8mes;\u62cai\u0200;efl\u32aa\u1059\u1821\u32ab\u65b9tri;\u69celuhar;\u6968;\u611e\u0d61\u32d5\u32db\u32df\u332c\u3338\u3371\0\u337a\u33a4\0\0\u33ec\u33f0\0\u3428\u3448\u345a\u34ad\u34b1\u34ca\u34f1\0\u3616\0\0\u3633cute;\u415bqu\xef\u27ba\u0500;Eaceinpsy\u11ed\u32f3\u32f5\u32ff\u3302\u330b\u330f\u331f\u3326\u3329;\u6ab4\u01f0\u32fa\0\u32fc;\u6ab8on;\u4161u\xe5\u11fe\u0100;d\u11f3\u3307il;\u415frc;\u415d\u0180Eas\u3316\u3318\u331b;\u6ab6p;\u6abaim;\u62e9olint;\u6a13i\xed\u1204;\u4441ot\u0180;be\u3334\u1d47\u3335\u62c5;\u6a66\u0380Aacmstx\u3346\u334a\u3357\u335b\u335e\u3363\u336drr;\u61d8r\u0100hr\u3350\u3352\xeb\u2228\u0100;o\u0a36\u0a34t\u803b\xa7\u40a7i;\u403bwar;\u6929m\u0100in\u3369\xf0nu\xf3\xf1t;\u6736r\u0100;o\u3376\u2055\uc000\ud835\udd30\u0200acoy\u3382\u3386\u3391\u33a0rp;\u666f\u0100hy\u338b\u338fcy;\u4449;\u4448rt\u026d\u3399\0\0\u339ci\xe4\u1464ara\xec\u2e6f\u803b\xad\u40ad\u0100gm\u33a8\u33b4ma\u0180;fv\u33b1\u33b2\u33b2\u43c3;\u43c2\u0400;deglnpr\u12ab\u33c5\u33c9\u33ce\u33d6\u33de\u33e1\u33e6ot;\u6a6a\u0100;q\u12b1\u12b0\u0100;E\u33d3\u33d4\u6a9e;\u6aa0\u0100;E\u33db\u33dc\u6a9d;\u6a9fe;\u6246lus;\u6a24arr;\u6972ar\xf2\u113d\u0200aeit\u33f8\u3408\u340f\u3417\u0100ls\u33fd\u3404lsetm\xe9\u336ahp;\u6a33parsl;\u69e4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341c\u341d\u6aaa\u0100;s\u3422\u3423\u6aac;\uc000\u2aac\ufe00\u0180flp\u342e\u3433\u3442tcy;\u444c\u0100;b\u3438\u3439\u402f\u0100;a\u343e\u343f\u69c4r;\u633ff;\uc000\ud835\udd64a\u0100dr\u344d\u0402es\u0100;u\u3454\u3455\u6660it\xbb\u3455\u0180csu\u3460\u3479\u349f\u0100au\u3465\u346fp\u0100;s\u1188\u346b;\uc000\u2293\ufe00p\u0100;s\u11b4\u3475;\uc000\u2294\ufe00u\u0100bp\u347f\u348f\u0180;es\u1197\u119c\u3486et\u0100;e\u1197\u348d\xf1\u119d\u0180;es\u11a8\u11ad\u3496et\u0100;e\u11a8\u349d\xf1\u11ae\u0180;af\u117b\u34a6\u05b0r\u0165\u34ab\u05b1\xbb\u117car\xf2\u1148\u0200cemt\u34b9\u34be\u34c2\u34c5r;\uc000\ud835\udcc8tm\xee\xf1i\xec\u3415ar\xe6\u11be\u0100ar\u34ce\u34d5r\u0100;f\u34d4\u17bf\u6606\u0100an\u34da\u34edight\u0100ep\u34e3\u34eapsilo\xee\u1ee0h\xe9\u2eafs\xbb\u2852\u0280bcmnp\u34fb\u355e\u1209\u358b\u358e\u0480;Edemnprs\u350e\u350f\u3511\u3515\u351e\u3523\u352c\u3531\u3536\u6282;\u6ac5ot;\u6abd\u0100;d\u11da\u351aot;\u6ac3ult;\u6ac1\u0100Ee\u3528\u352a;\u6acb;\u628alus;\u6abfarr;\u6979\u0180eiu\u353d\u3552\u3555t\u0180;en\u350e\u3545\u354bq\u0100;q\u11da\u350feq\u0100;q\u352b\u3528m;\u6ac7\u0100bp\u355a\u355c;\u6ad5;\u6ad3c\u0300;acens\u11ed\u356c\u3572\u3579\u357b\u3326ppro\xf8\u32faurlye\xf1\u11fe\xf1\u11f3\u0180aes\u3582\u3588\u331bppro\xf8\u331aq\xf1\u3317g;\u666a\u0680123;Edehlmnps\u35a9\u35ac\u35af\u121c\u35b2\u35b4\u35c0\u35c9\u35d5\u35da\u35df\u35e8\u35ed\u803b\xb9\u40b9\u803b\xb2\u40b2\u803b\xb3\u40b3;\u6ac6\u0100os\u35b9\u35bct;\u6abeub;\u6ad8\u0100;d\u1222\u35c5ot;\u6ac4s\u0100ou\u35cf\u35d2l;\u67c9b;\u6ad7arr;\u697bult;\u6ac2\u0100Ee\u35e4\u35e6;\u6acc;\u628blus;\u6ac0\u0180eiu\u35f4\u3609\u360ct\u0180;en\u121c\u35fc\u3602q\u0100;q\u1222\u35b2eq\u0100;q\u35e7\u35e4m;\u6ac8\u0100bp\u3611\u3613;\u6ad4;\u6ad6\u0180Aan\u361c\u3620\u362drr;\u61d9r\u0100hr\u3626\u3628\xeb\u222e\u0100;o\u0a2b\u0a29war;\u692alig\u803b\xdf\u40df\u0be1\u3651\u365d\u3660\u12ce\u3673\u3679\0\u367e\u36c2\0\0\0\0\0\u36db\u3703\0\u3709\u376c\0\0\0\u3787\u0272\u3656\0\0\u365bget;\u6316;\u43c4r\xeb\u0e5f\u0180aey\u3666\u366b\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uc000\ud835\udd31\u0200eiko\u3686\u369d\u36b5\u36bc\u01f2\u368b\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369b\u43b8ym;\u43d1\u0100cn\u36a2\u36b2k\u0100as\u36a8\u36aeppro\xf8\u12c1im\xbb\u12acs\xf0\u129e\u0100as\u36ba\u36ae\xf0\u12c1rn\u803b\xfe\u40fe\u01ec\u031f\u36c6\u22e7es\u8180\xd7;bd\u36cf\u36d0\u36d8\u40d7\u0100;a\u190f\u36d5r;\u6a31;\u6a30\u0180eps\u36e1\u36e3\u3700\xe1\u2a4d\u0200;bcf\u0486\u36ec\u36f0\u36f4ot;\u6336ir;\u6af1\u0100;o\u36f9\u36fc\uc000\ud835\udd65rk;\u6ada\xe1\u3362rime;\u6034\u0180aip\u370f\u3712\u3764d\xe5\u1248\u0380adempst\u3721\u374d\u3740\u3751\u3757\u375c\u375fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65b5own\xbb\u1dbbeft\u0100;e\u2800\u373e\xf1\u092e;\u625cight\u0100;e\u32aa\u374b\xf1\u105aot;\u65ecinus;\u6a3alus;\u6a39b;\u69cdime;\u6a3bezium;\u63e2\u0180cht\u3772\u377d\u3781\u0100ry\u3777\u377b;\uc000\ud835\udcc9;\u4446cy;\u445brok;\u4167\u0100io\u378b\u378ex\xf4\u1777head\u0100lr\u3797\u37a0eftarro\xf7\u084fightarrow\xbb\u0f5d\u0900AHabcdfghlmoprstuw\u37d0\u37d3\u37d7\u37e4\u37f0\u37fc\u380e\u381c\u3823\u3834\u3851\u385d\u386b\u38a9\u38cc\u38d2\u38ea\u38f6r\xf2\u03edar;\u6963\u0100cr\u37dc\u37e2ute\u803b\xfa\u40fa\xf2\u1150r\u01e3\u37ea\0\u37edy;\u445eve;\u416d\u0100iy\u37f5\u37farc\u803b\xfb\u40fb;\u4443\u0180abh\u3803\u3806\u380br\xf2\u13adlac;\u4171a\xf2\u13c3\u0100ir\u3813\u3818sht;\u697e;\uc000\ud835\udd32rave\u803b\xf9\u40f9\u0161\u3827\u3831r\u0100lr\u382c\u382e\xbb\u0957\xbb\u1083lk;\u6580\u0100ct\u3839\u384d\u026f\u383f\0\0\u384arn\u0100;e\u3845\u3846\u631cr\xbb\u3846op;\u630fri;\u65f8\u0100al\u3856\u385acr;\u416b\u80bb\xa8\u0349\u0100gp\u3862\u3866on;\u4173f;\uc000\ud835\udd66\u0300adhlsu\u114b\u3878\u387d\u1372\u3891\u38a0own\xe1\u13b3arpoon\u0100lr\u3888\u388cef\xf4\u382digh\xf4\u382fi\u0180;hl\u3899\u389a\u389c\u43c5\xbb\u13faon\xbb\u389aparrows;\u61c8\u0180cit\u38b0\u38c4\u38c8\u026f\u38b6\0\0\u38c1rn\u0100;e\u38bc\u38bd\u631dr\xbb\u38bdop;\u630eng;\u416fri;\u65f9cr;\uc000\ud835\udcca\u0180dir\u38d9\u38dd\u38e2ot;\u62f0lde;\u4169i\u0100;f\u3730\u38e8\xbb\u1813\u0100am\u38ef\u38f2r\xf2\u38a8l\u803b\xfc\u40fcangle;\u69a7\u0780ABDacdeflnoprsz\u391c\u391f\u3929\u392d\u39b5\u39b8\u39bd\u39df\u39e4\u39e8\u39f3\u39f9\u39fd\u3a01\u3a20r\xf2\u03f7ar\u0100;v\u3926\u3927\u6ae8;\u6ae9as\xe8\u03e1\u0100nr\u3932\u3937grt;\u699c\u0380eknprst\u34e3\u3946\u394b\u3952\u395d\u3964\u3996app\xe1\u2415othin\xe7\u1e96\u0180hir\u34eb\u2ec8\u3959op\xf4\u2fb5\u0100;h\u13b7\u3962\xef\u318d\u0100iu\u3969\u396dgm\xe1\u33b3\u0100bp\u3972\u3984setneq\u0100;q\u397d\u3980\uc000\u228a\ufe00;\uc000\u2acb\ufe00setneq\u0100;q\u398f\u3992\uc000\u228b\ufe00;\uc000\u2acc\ufe00\u0100hr\u399b\u399fet\xe1\u369ciangle\u0100lr\u39aa\u39afeft\xbb\u0925ight\xbb\u1051y;\u4432ash\xbb\u1036\u0180elr\u39c4\u39d2\u39d7\u0180;be\u2dea\u39cb\u39cfar;\u62bbq;\u625alip;\u62ee\u0100bt\u39dc\u1468a\xf2\u1469r;\uc000\ud835\udd33tr\xe9\u39aesu\u0100bp\u39ef\u39f1\xbb\u0d1c\xbb\u0d59pf;\uc000\ud835\udd67ro\xf0\u0efbtr\xe9\u39b4\u0100cu\u3a06\u3a0br;\uc000\ud835\udccb\u0100bp\u3a10\u3a18n\u0100Ee\u3980\u3a16\xbb\u397en\u0100Ee\u3992\u3a1e\xbb\u3990igzag;\u699a\u0380cefoprs\u3a36\u3a3b\u3a56\u3a5b\u3a54\u3a61\u3a6airc;\u4175\u0100di\u3a40\u3a51\u0100bg\u3a45\u3a49ar;\u6a5fe\u0100;q\u15fa\u3a4f;\u6259erp;\u6118r;\uc000\ud835\udd34pf;\uc000\ud835\udd68\u0100;e\u1479\u3a66at\xe8\u1479cr;\uc000\ud835\udccc\u0ae3\u178e\u3a87\0\u3a8b\0\u3a90\u3a9b\0\0\u3a9d\u3aa8\u3aab\u3aaf\0\0\u3ac3\u3ace\0\u3ad8\u17dc\u17dftr\xe9\u17d1r;\uc000\ud835\udd35\u0100Aa\u3a94\u3a97r\xf2\u03c3r\xf2\u09f6;\u43be\u0100Aa\u3aa1\u3aa4r\xf2\u03b8r\xf2\u09eba\xf0\u2713is;\u62fb\u0180dpt\u17a4\u3ab5\u3abe\u0100fl\u3aba\u17a9;\uc000\ud835\udd69im\xe5\u17b2\u0100Aa\u3ac7\u3acar\xf2\u03cer\xf2\u0a01\u0100cq\u3ad2\u17b8r;\uc000\ud835\udccd\u0100pt\u17d6\u3adcr\xe9\u17d4\u0400acefiosu\u3af0\u3afd\u3b08\u3b0c\u3b11\u3b15\u3b1b\u3b21c\u0100uy\u3af6\u3afbte\u803b\xfd\u40fd;\u444f\u0100iy\u3b02\u3b06rc;\u4177;\u444bn\u803b\xa5\u40a5r;\uc000\ud835\udd36cy;\u4457pf;\uc000\ud835\udd6acr;\uc000\ud835\udcce\u0100cm\u3b26\u3b29y;\u444el\u803b\xff\u40ff\u0500acdefhiosw\u3b42\u3b48\u3b54\u3b58\u3b64\u3b69\u3b6d\u3b74\u3b7a\u3b80cute;\u417a\u0100ay\u3b4d\u3b52ron;\u417e;\u4437ot;\u417c\u0100et\u3b5d\u3b61tr\xe6\u155fa;\u43b6r;\uc000\ud835\udd37cy;\u4436grarr;\u61ddpf;\uc000\ud835\udd6bcr;\uc000\ud835\udccf\u0100jn\u3b85\u3b87;\u600dj;\u600c"
      .split("")
      .map((c) => c.charCodeAt(0)));

  // Adapted from https://github.com/mathiasbynens/he/blob/36afe179392226cf1b6ccdb16ebbb7a5a844d93a/src/he.js#L106-L134
  const decodeMap = new Map([
      [0, 65533],
      // C1 Unicode control character reference replacements
      [128, 8364],
      [130, 8218],
      [131, 402],
      [132, 8222],
      [133, 8230],
      [134, 8224],
      [135, 8225],
      [136, 710],
      [137, 8240],
      [138, 352],
      [139, 8249],
      [140, 338],
      [142, 381],
      [145, 8216],
      [146, 8217],
      [147, 8220],
      [148, 8221],
      [149, 8226],
      [150, 8211],
      [151, 8212],
      [152, 732],
      [153, 8482],
      [154, 353],
      [155, 8250],
      [156, 339],
      [158, 382],
      [159, 376],
  ]);
  /**
   * Replace the given code point with a replacement character if it is a
   * surrogate or is outside the valid range. Otherwise return the code
   * point unchanged.
   */
  function replaceCodePoint(codePoint) {
      var _a;
      if ((codePoint >= 55296 && codePoint <= 57343) ||
          codePoint > 1114111) {
          return 65533;
      }
      return (_a = decodeMap.get(codePoint)) !== null && _a !== void 0 ? _a : codePoint;
  }

  var CharCodes;
  (function (CharCodes) {
      CharCodes[CharCodes["NUM"] = 35] = "NUM";
      CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
      CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
      CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
      CharCodes[CharCodes["NINE"] = 57] = "NINE";
      CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
      CharCodes[CharCodes["LOWER_F"] = 102] = "LOWER_F";
      CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
      CharCodes[CharCodes["LOWER_Z"] = 122] = "LOWER_Z";
      CharCodes[CharCodes["UPPER_A"] = 65] = "UPPER_A";
      CharCodes[CharCodes["UPPER_F"] = 70] = "UPPER_F";
      CharCodes[CharCodes["UPPER_Z"] = 90] = "UPPER_Z";
  })(CharCodes || (CharCodes = {}));
  /** Bit that needs to be set to convert an upper case ASCII character to lower case */
  const TO_LOWER_BIT = 32;
  var BinTrieFlags;
  (function (BinTrieFlags) {
      BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
      BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
      BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
  })(BinTrieFlags || (BinTrieFlags = {}));
  function isNumber(code) {
      return code >= CharCodes.ZERO && code <= CharCodes.NINE;
  }
  function isHexadecimalCharacter(code) {
      return ((code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F) ||
          (code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F));
  }
  function isAsciiAlphaNumeric$1(code) {
      return ((code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z) ||
          (code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z) ||
          isNumber(code));
  }
  /**
   * Checks if the given character is a valid end character for an entity in an attribute.
   *
   * Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
   * See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
   */
  function isEntityInAttributeInvalidEnd(code) {
      return code === CharCodes.EQUALS || isAsciiAlphaNumeric$1(code);
  }
  var EntityDecoderState;
  (function (EntityDecoderState) {
      EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
      EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
      EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
      EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
      EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
  })(EntityDecoderState || (EntityDecoderState = {}));
  var DecodingMode;
  (function (DecodingMode) {
      /** Entities in text nodes that can end with any character. */
      DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
      /** Only allow entities terminated with a semicolon. */
      DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
      /** Entities in attributes have limitations on ending characters. */
      DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
  })(DecodingMode || (DecodingMode = {}));
  /**
   * Token decoder with support of writing partial entities.
   */
  class EntityDecoder {
      constructor(
      /** The tree used to decode entities. */
      decodeTree, 
      /**
       * The function that is called when a codepoint is decoded.
       *
       * For multi-byte named entities, this will be called multiple times,
       * with the second codepoint, and the same `consumed` value.
       *
       * @param codepoint The decoded codepoint.
       * @param consumed The number of bytes consumed by the decoder.
       */
      emitCodePoint, 
      /** An object that is used to produce errors. */
      errors) {
          this.decodeTree = decodeTree;
          this.emitCodePoint = emitCodePoint;
          this.errors = errors;
          /** The current state of the decoder. */
          this.state = EntityDecoderState.EntityStart;
          /** Characters that were consumed while parsing an entity. */
          this.consumed = 1;
          /**
           * The result of the entity.
           *
           * Either the result index of a numeric entity, or the codepoint of a
           * numeric entity.
           */
          this.result = 0;
          /** The current index in the decode tree. */
          this.treeIndex = 0;
          /** The number of characters that were consumed in excess. */
          this.excess = 1;
          /** The mode in which the decoder is operating. */
          this.decodeMode = DecodingMode.Strict;
      }
      /** Resets the instance to make it reusable. */
      startEntity(decodeMode) {
          this.decodeMode = decodeMode;
          this.state = EntityDecoderState.EntityStart;
          this.result = 0;
          this.treeIndex = 0;
          this.excess = 1;
          this.consumed = 1;
      }
      /**
       * Write an entity to the decoder. This can be called multiple times with partial entities.
       * If the entity is incomplete, the decoder will return -1.
       *
       * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
       * entity is incomplete, and resume when the next string is written.
       *
       * @param input The string containing the entity (or a continuation of the entity).
       * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
       * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
       */
      write(input, offset) {
          switch (this.state) {
              case EntityDecoderState.EntityStart: {
                  if (input.charCodeAt(offset) === CharCodes.NUM) {
                      this.state = EntityDecoderState.NumericStart;
                      this.consumed += 1;
                      return this.stateNumericStart(input, offset + 1);
                  }
                  this.state = EntityDecoderState.NamedEntity;
                  return this.stateNamedEntity(input, offset);
              }
              case EntityDecoderState.NumericStart: {
                  return this.stateNumericStart(input, offset);
              }
              case EntityDecoderState.NumericDecimal: {
                  return this.stateNumericDecimal(input, offset);
              }
              case EntityDecoderState.NumericHex: {
                  return this.stateNumericHex(input, offset);
              }
              case EntityDecoderState.NamedEntity: {
                  return this.stateNamedEntity(input, offset);
              }
          }
      }
      /**
       * Switches between the numeric decimal and hexadecimal states.
       *
       * Equivalent to the `Numeric character reference state` in the HTML spec.
       *
       * @param input The string containing the entity (or a continuation of the entity).
       * @param offset The current offset.
       * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
       */
      stateNumericStart(input, offset) {
          if (offset >= input.length) {
              return -1;
          }
          if ((input.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
              this.state = EntityDecoderState.NumericHex;
              this.consumed += 1;
              return this.stateNumericHex(input, offset + 1);
          }
          this.state = EntityDecoderState.NumericDecimal;
          return this.stateNumericDecimal(input, offset);
      }
      addToNumericResult(input, start, end, base) {
          if (start !== end) {
              const digitCount = end - start;
              this.result =
                  this.result * Math.pow(base, digitCount) +
                      Number.parseInt(input.substr(start, digitCount), base);
              this.consumed += digitCount;
          }
      }
      /**
       * Parses a hexadecimal numeric entity.
       *
       * Equivalent to the `Hexademical character reference state` in the HTML spec.
       *
       * @param input The string containing the entity (or a continuation of the entity).
       * @param offset The current offset.
       * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
       */
      stateNumericHex(input, offset) {
          const startIndex = offset;
          while (offset < input.length) {
              const char = input.charCodeAt(offset);
              if (isNumber(char) || isHexadecimalCharacter(char)) {
                  offset += 1;
              }
              else {
                  this.addToNumericResult(input, startIndex, offset, 16);
                  return this.emitNumericEntity(char, 3);
              }
          }
          this.addToNumericResult(input, startIndex, offset, 16);
          return -1;
      }
      /**
       * Parses a decimal numeric entity.
       *
       * Equivalent to the `Decimal character reference state` in the HTML spec.
       *
       * @param input The string containing the entity (or a continuation of the entity).
       * @param offset The current offset.
       * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
       */
      stateNumericDecimal(input, offset) {
          const startIndex = offset;
          while (offset < input.length) {
              const char = input.charCodeAt(offset);
              if (isNumber(char)) {
                  offset += 1;
              }
              else {
                  this.addToNumericResult(input, startIndex, offset, 10);
                  return this.emitNumericEntity(char, 2);
              }
          }
          this.addToNumericResult(input, startIndex, offset, 10);
          return -1;
      }
      /**
       * Validate and emit a numeric entity.
       *
       * Implements the logic from the `Hexademical character reference start
       * state` and `Numeric character reference end state` in the HTML spec.
       *
       * @param lastCp The last code point of the entity. Used to see if the
       *               entity was terminated with a semicolon.
       * @param expectedLength The minimum number of characters that should be
       *                       consumed. Used to validate that at least one digit
       *                       was consumed.
       * @returns The number of characters that were consumed.
       */
      emitNumericEntity(lastCp, expectedLength) {
          var _a;
          // Ensure we consumed at least one digit.
          if (this.consumed <= expectedLength) {
              (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
              return 0;
          }
          // Figure out if this is a legit end of the entity
          if (lastCp === CharCodes.SEMI) {
              this.consumed += 1;
          }
          else if (this.decodeMode === DecodingMode.Strict) {
              return 0;
          }
          this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
          if (this.errors) {
              if (lastCp !== CharCodes.SEMI) {
                  this.errors.missingSemicolonAfterCharacterReference();
              }
              this.errors.validateNumericCharacterReference(this.result);
          }
          return this.consumed;
      }
      /**
       * Parses a named entity.
       *
       * Equivalent to the `Named character reference state` in the HTML spec.
       *
       * @param input The string containing the entity (or a continuation of the entity).
       * @param offset The current offset.
       * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
       */
      stateNamedEntity(input, offset) {
          const { decodeTree } = this;
          let current = decodeTree[this.treeIndex];
          // The mask is the number of bytes of the value, including the current byte.
          let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
          for (; offset < input.length; offset++, this.excess++) {
              const char = input.charCodeAt(offset);
              this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
              if (this.treeIndex < 0) {
                  return this.result === 0 ||
                      // If we are parsing an attribute
                      (this.decodeMode === DecodingMode.Attribute &&
                          // We shouldn't have consumed any characters after the entity,
                          (valueLength === 0 ||
                              // And there should be no invalid characters.
                              isEntityInAttributeInvalidEnd(char)))
                      ? 0
                      : this.emitNotTerminatedNamedEntity();
              }
              current = decodeTree[this.treeIndex];
              valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
              // If the branch is a value, store it and continue
              if (valueLength !== 0) {
                  // If the entity is terminated by a semicolon, we are done.
                  if (char === CharCodes.SEMI) {
                      return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
                  }
                  // If we encounter a non-terminated (legacy) entity while parsing strictly, then ignore it.
                  if (this.decodeMode !== DecodingMode.Strict) {
                      this.result = this.treeIndex;
                      this.consumed += this.excess;
                      this.excess = 0;
                  }
              }
          }
          return -1;
      }
      /**
       * Emit a named entity that was not terminated with a semicolon.
       *
       * @returns The number of characters consumed.
       */
      emitNotTerminatedNamedEntity() {
          var _a;
          const { result, decodeTree } = this;
          const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
          this.emitNamedEntityData(result, valueLength, this.consumed);
          (_a = this.errors) === null || _a === void 0 ? void 0 : _a.missingSemicolonAfterCharacterReference();
          return this.consumed;
      }
      /**
       * Emit a named entity.
       *
       * @param result The index of the entity in the decode tree.
       * @param valueLength The number of bytes in the entity.
       * @param consumed The number of characters consumed.
       *
       * @returns The number of characters consumed.
       */
      emitNamedEntityData(result, valueLength, consumed) {
          const { decodeTree } = this;
          this.emitCodePoint(valueLength === 1
              ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH
              : decodeTree[result + 1], consumed);
          if (valueLength === 3) {
              // For multi-byte values, we need to emit the second byte.
              this.emitCodePoint(decodeTree[result + 2], consumed);
          }
          return consumed;
      }
      /**
       * Signal to the parser that the end of the input was reached.
       *
       * Remaining data will be emitted and relevant errors will be produced.
       *
       * @returns The number of characters consumed.
       */
      end() {
          var _a;
          switch (this.state) {
              case EntityDecoderState.NamedEntity: {
                  // Emit a named entity if we have one.
                  return this.result !== 0 &&
                      (this.decodeMode !== DecodingMode.Attribute ||
                          this.result === this.treeIndex)
                      ? this.emitNotTerminatedNamedEntity()
                      : 0;
              }
              // Otherwise, emit a numeric entity if we have one.
              case EntityDecoderState.NumericDecimal: {
                  return this.emitNumericEntity(0, 2);
              }
              case EntityDecoderState.NumericHex: {
                  return this.emitNumericEntity(0, 3);
              }
              case EntityDecoderState.NumericStart: {
                  (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
                  return 0;
              }
              case EntityDecoderState.EntityStart: {
                  // Return 0 if we have no entity.
                  return 0;
              }
          }
      }
  }
  /**
   * Determines the branch of the current node that is taken given the current
   * character. This function is used to traverse the trie.
   *
   * @param decodeTree The trie.
   * @param current The current node.
   * @param nodeIdx The index right after the current node and its value.
   * @param char The current character.
   * @returns The index of the next node, or -1 if no branch is taken.
   */
  function determineBranch(decodeTree, current, nodeIndex, char) {
      const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
      const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
      // Case 1: Single branch encoded in jump offset
      if (branchCount === 0) {
          return jumpOffset !== 0 && char === jumpOffset ? nodeIndex : -1;
      }
      // Case 2: Multiple branches encoded in jump table
      if (jumpOffset) {
          const value = char - jumpOffset;
          return value < 0 || value >= branchCount
              ? -1
              : decodeTree[nodeIndex + value] - 1;
      }
      // Case 3: Multiple branches encoded in dictionary
      // Binary search for the character.
      let lo = nodeIndex;
      let hi = lo + branchCount - 1;
      while (lo <= hi) {
          const mid = (lo + hi) >>> 1;
          const midValue = decodeTree[mid];
          if (midValue < char) {
              lo = mid + 1;
          }
          else if (midValue > char) {
              hi = mid - 1;
          }
          else {
              return decodeTree[mid + branchCount];
          }
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
      return cp === CODE_POINTS.SPACE || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.TABULATION || cp === CODE_POINTS.FORM_FEED;
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
          this.preprocessor = new Preprocessor(handler);
          this.currentLocation = this.getCurrentLocation(-1);
          this.entityDecoder = new EntityDecoder(htmlDecodeTree, (cp, consumed) => {
              // Note: Set `pos` _before_ flushing, as flushing might drop
              // the current chunk and invalidate `entityStartPos`.
              this.preprocessor.pos = this.entityStartPos + consumed - 1;
              this._flushCodePointConsumedAsCharacterReference(cp);
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
          this.currentToken = {
              type: TokenType.COMMENT,
              data: '',
              location: this.getCurrentLocation(offset),
          };
      }
      _createDoctypeToken(initialName) {
          this.currentToken = {
              type: TokenType.DOCTYPE,
              name: initialName,
              forceQuirks: false,
              publicId: null,
              systemId: null,
              location: this.currentLocation,
          };
      }
      _createCharacterToken(type, chars) {
          this.currentCharacterToken = {
              type,
              chars,
              location: this.currentLocation,
          };
      }
      //Tag attributes
      _createAttr(attrNameFirstCh) {
          this.currentAttr = {
              name: attrNameFirstCh,
              value: '',
          };
          this.currentLocation = this.getCurrentLocation(0);
      }
      _leaveAttrName() {
          var _a;
          var _b;
          const token = this.currentToken;
          if (getTokenAttr(token, this.currentAttr.name) === null) {
              token.attrs.push(this.currentAttr);
              if (token.location && this.currentLocation) {
                  const attrLocations = ((_a = (_b = token.location).attrs) !== null && _a !== void 0 ? _a : (_b.attrs = Object.create(null)));
                  attrLocations[this.currentAttr.name] = this.currentLocation;
                  // Set end location
                  this._leaveAttrValue();
              }
          }
          else {
              this._err(ERR.duplicateAttribute);
          }
      }
      _leaveAttrValue() {
          if (this.currentLocation) {
              this.currentLocation.endLine = this.preprocessor.line;
              this.currentLocation.endCol = this.preprocessor.col;
              this.currentLocation.endOffset = this.preprocessor.offset;
          }
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
      _appendCharToCurrentCharacterToken(type, ch) {
          if (this.currentCharacterToken) {
              if (this.currentCharacterToken.type === type) {
                  this.currentCharacterToken.chars += ch;
                  return;
              }
              else {
                  this.currentLocation = this.getCurrentLocation(0);
                  this._emitCurrentCharacterToken(this.currentLocation);
                  this.preprocessor.dropParsedChunk();
              }
          }
          this._createCharacterToken(type, ch);
      }
      _emitCodePoint(cp) {
          const type = isWhitespace(cp)
              ? TokenType.WHITESPACE_CHARACTER
              : cp === CODE_POINTS.NULL
                  ? TokenType.NULL_CHARACTER
                  : TokenType.CHARACTER;
          this._appendCharToCurrentCharacterToken(type, String.fromCodePoint(cp));
      }
      //NOTE: used when we emit characters explicitly.
      //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
      _emitChars(ch) {
          this._appendCharToCurrentCharacterToken(TokenType.CHARACTER, ch);
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
              this.currentAttr.value += String.fromCodePoint(cp);
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
                      this._emitChars('<');
                      this._emitEOFToken();
                      break;
                  }
                  default: {
                      this._err(ERR.invalidFirstCharacterOfTagName);
                      this._emitChars('<');
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
                      this._emitChars('</');
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
              this._emitChars('<');
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
              this._emitChars('</');
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
                  return !this._ensureHibernation();
              }
          }
      }
      // RCDATA end tag name state
      //------------------------------------------------------------------
      _stateRcdataEndTagName(cp) {
          if (this.handleSpecialEndTag(cp)) {
              this._emitChars('</');
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
              this._emitChars('<');
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
              this._emitChars('</');
              this.state = State.RAWTEXT;
              this._stateRawtext(cp);
          }
      }
      // RAWTEXT end tag name state
      //------------------------------------------------------------------
      _stateRawtextEndTagName(cp) {
          if (this.handleSpecialEndTag(cp)) {
              this._emitChars('</');
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
                  this._emitChars('<');
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
              this._emitChars('</');
              this.state = State.SCRIPT_DATA;
              this._stateScriptData(cp);
          }
      }
      // Script data end tag name state
      //------------------------------------------------------------------
      _stateScriptDataEndTagName(cp) {
          if (this.handleSpecialEndTag(cp)) {
              this._emitChars('</');
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
              this._emitChars('<');
              this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_START;
              this._stateScriptDataDoubleEscapeStart(cp);
          }
          else {
              this._emitChars('<');
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
              this._emitChars('</');
              this.state = State.SCRIPT_DATA_ESCAPED;
              this._stateScriptDataEscaped(cp);
          }
      }
      // Script data escaped end tag name state
      //------------------------------------------------------------------
      _stateScriptDataEscapedEndTagName(cp) {
          if (this.handleSpecialEndTag(cp)) {
              this._emitChars('</');
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
                  this.currentAttr.value += REPLACEMENT_CHARACTER;
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInTag);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this.currentAttr.value += String.fromCodePoint(cp);
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
                  this.currentAttr.value += REPLACEMENT_CHARACTER;
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInTag);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this.currentAttr.value += String.fromCodePoint(cp);
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
                  this.currentAttr.value += REPLACEMENT_CHARACTER;
                  break;
              }
              case CODE_POINTS.QUOTATION_MARK:
              case CODE_POINTS.APOSTROPHE:
              case CODE_POINTS.LESS_THAN_SIGN:
              case CODE_POINTS.EQUALS_SIGN:
              case CODE_POINTS.GRAVE_ACCENT: {
                  this._err(ERR.unexpectedCharacterInUnquotedAttributeValue);
                  this.currentAttr.value += String.fromCodePoint(cp);
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInTag);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  this.currentAttr.value += String.fromCodePoint(cp);
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
                  token.data += REPLACEMENT_CHARACTER;
                  break;
              }
              default: {
                  token.data += String.fromCodePoint(cp);
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
                  token.data += '-';
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
                  token.data += '<';
                  this.state = State.COMMENT_LESS_THAN_SIGN;
                  break;
              }
              case CODE_POINTS.NULL: {
                  this._err(ERR.unexpectedNullCharacter);
                  token.data += REPLACEMENT_CHARACTER;
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInComment);
                  this.emitCurrentComment(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  token.data += String.fromCodePoint(cp);
              }
          }
      }
      // Comment less-than sign state
      //------------------------------------------------------------------
      _stateCommentLessThanSign(cp) {
          const token = this.currentToken;
          switch (cp) {
              case CODE_POINTS.EXCLAMATION_MARK: {
                  token.data += '!';
                  this.state = State.COMMENT_LESS_THAN_SIGN_BANG;
                  break;
              }
              case CODE_POINTS.LESS_THAN_SIGN: {
                  token.data += '<';
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
                  token.data += '-';
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
                  token.data += '-';
                  break;
              }
              case CODE_POINTS.EOF: {
                  this._err(ERR.eofInComment);
                  this.emitCurrentComment(token);
                  this._emitEOFToken();
                  break;
              }
              default: {
                  token.data += '--';
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
                  token.data += '--!';
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
                  token.data += '--!';
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
              this._emitChars(']');
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
                  this._emitChars(']');
                  break;
              }
              default: {
                  this._emitChars(']]');
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
      _attachElementToTree(element, location) {
          if (this.options.sourceCodeLocationInfo) {
              const loc = location && {
                  ...location,
                  startTag: location,
              };
              this.treeAdapter.setNodeSourceCodeLocation(element, loc);
          }
          if (this._shouldFosterParentOnInsertion()) {
              this._fosterParentElement(element);
          }
          else {
              const parent = this.openElements.currentTmplContentOrNode;
              this.treeAdapter.appendChild(parent !== null && parent !== void 0 ? parent : this.document, element);
          }
      }
      /**
       * For self-closing tags. Add an element to the tree, but skip adding it
       * to the stack.
       */
      /** @protected */
      _appendElement(token, namespaceURI) {
          const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
          this._attachElementToTree(element, token.location);
      }
      /** @protected */
      _insertElement(token, namespaceURI) {
          const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
          this._attachElementToTree(element, token.location);
          this.openElements.push(element, token.tagID);
      }
      /** @protected */
      _insertFakeElement(tagName, tagID) {
          const element = this.treeAdapter.createElement(tagName, NS.HTML, []);
          this._attachElementToTree(element, null);
          this.openElements.push(element, tagID);
      }
      /** @protected */
      _insertTemplate(token) {
          const tmpl = this.treeAdapter.createElement(token.tagName, NS.HTML, token.attrs);
          const content = this.treeAdapter.createDocumentFragment();
          this.treeAdapter.setTemplateContent(tmpl, content);
          this._attachElementToTree(tmpl, token.location);
          this.openElements.push(tmpl, token.tagID);
          if (this.options.sourceCodeLocationInfo)
              this.treeAdapter.setNodeSourceCodeLocation(content, null);
      }
      /** @protected */
      _insertFakeRootElement() {
          const element = this.treeAdapter.createElement(TAG_NAMES.HTML, NS.HTML, []);
          if (this.options.sourceCodeLocationInfo)
              this.treeAdapter.setNodeSourceCodeLocation(element, null);
          this.treeAdapter.appendChild(this.openElements.current, element);
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
              element = aaRecreateElementFromEntry(p, elementEntry);
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
  function aaRecreateElementFromEntry(p, elementEntry) {
      const ns = p.treeAdapter.getNamespaceURI(elementEntry.element);
      const newElement = p.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs);
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
      const newElement = p.treeAdapter.createElement(token.tagName, ns, token.attrs);
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
          if (tid === elementId && (tid !== TAG_ID.UNKNOWN || p.treeAdapter.getTagName(element) === tn)) {
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
  const formatCRe = /%c(?:([-+])(\d+))?/g;
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
    const onerror = settings.onerror;
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
      const code = error.code;
      const name = camelcase(code);
      const setting = settings[name];
      const config = setting === null || setting === undefined ? true : setting;
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
          const offset =
            ($2 ? Number.parseInt($2, 10) : 0) * ($1 === '-' ? -1 : 1);
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
   * @param {string} $0
   *   Match.
   * @returns {string}
   *   Camelcased.
   */
  function dashToCamel($0) {
    return $0.charAt(1).toUpperCase()
  }

  /**
   * @param {string} char
   *   Character.
   * @returns {string}
   *   Formatted.
   */
  function visualizeCharacter(char) {
    return char === '`' ? '` ` `' : char
  }

  /**
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
   *   Index of `node` in `parent.
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
     * @param {string} $0
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
   *   Index of `node` in `parent.
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
   *
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
              parent.tagName === 'video')
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
    const head = siblingAfter(node, -1, true);

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
    const head = siblingAfter(node, -1);

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
   * Serialize an element node.
   *
   * @param {Element} node
   *   Node to handle.
   * @param {number | undefined} index
   *   Index of `node` in `parent.
   * @param {Parents | undefined} parent
   *   Parent of `node`.
   * @param {State} state
   *   Info passed around about the current state.
   * @returns {string}
   *   Serialized node.
   */
  function element$1(node, index, parent, state) {
    const schema = state.schema;
    const omit = schema.space === 'svg' ? false : state.settings.omitOptionalTags;
    let selfClosing =
      schema.space === 'svg'
        ? state.settings.closeEmptyElements
        : state.settings.voids.includes(node.tagName.toLowerCase());
    /** @type {Array<string>} */
    const parts = [];
    /** @type {string} */
    let last;

    if (schema.space === 'html' && node.tagName === 'svg') {
      state.schema = svg;
    }

    const attributes = serializeAttributes(state, node.properties);

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
        last = attributes.charAt(attributes.length - 1);
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
   * @param {State} state
   * @param {Properties | null | undefined} properties
   * @returns {string}
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
   * @param {State} state
   * @param {string} key
   * @param {Properties[keyof Properties]} value
   * @returns {string}
   */
  function serializeAttribute(state, key, value) {
    const info = find(state.schema, key);
    const x =
      state.settings.allowParseErrors && state.schema.space === 'html' ? 0 : 1;
    const y = state.settings.allowDangerousCharacters ? 0 : 1;
    let quote = state.quote;
    /** @type {string | undefined} */
    let result;

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
   *   Index of `node` in `parent.
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
   *   Index of `node` in `parent.
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
   *   Index of `node` in `parent.
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
   *  Unknown node.
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
    const alternative = quote === '"' ? "'" : '"';

    if (quote !== '"' && quote !== "'") {
      throw new Error('Invalid quote `' + quote + '`, expected `\'` or `"`')
    }

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
   *   Index of `node` in `parent.
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

  var version = '0.0.1';

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
