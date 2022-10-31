(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseParagraphs = factory());
})(this, (function () { 'use strict';

  const concatArr = function (views, fn) {
    let arr = [];
    views.forEach(m => {
      arr.push(m[fn]());
    });
    return arr
  };

  const concatStr = function (views, cb) {
    let str = [];
    views.forEach(m => {
      str += cb(m);
    });
    return str
  };

  const concatDoc = function (views, cb) {
    let ptrs = [];
    views.forEach(m => {
      let res = cb(m);
      if (res.found) {
        ptrs = ptrs.concat(res.ptrs);
      }
    });
    return views[0].update(ptrs)
  };


  const api = function (View) {



    class Paragraphs {
      constructor(views) {
        this.viewType = 'Paragraphs';
        this.views = views;
      }
      // is the view not-empty?
      get found() {
        return this.views.length > 0
      }
      // how many matches we have
      get length() {
        return this.views.length
      }
      json() {
        return concatArr(this.views, 'json')
      }
      text(fmt) {
        return concatStr(this.views, (m) => m.text(fmt))
      }
      match(reg) {
        return concatDoc(this.views, (view) => view.match(reg))
      }
      // boolean
      has(reg) {
        return this.views.some(view => view.has(reg))
      }
      if(reg) {
        let views = this.views.filter(view => view.has(reg));
        return this.update(views)
      }

      // overloaded - keep Paragraphs class
      update(views) {
        let m = new Paragraphs(views);
        return m
      }
    }

    /** */
    View.prototype.paragraphs = function () {
      const hasTwoNewline = /\n\n/;
      let all = [];
      let run = [];
      this.all().forEach(s => {
        let end = s.lastTerm();
        run.push(s.ptrs[0]);
        if (hasTwoNewline.test(end.post())) {
          all.push(run);
          run = [];
        }
      });
      if (run.length) {
        all.push(run);
      }
      let views = all.map(ptr => {
        return this.update(ptr)
      });
      return new Paragraphs(views)
    };
  };
  var api$1 = api;

  var plugin = {
    api: api$1,
  };

  return plugin;

}));
