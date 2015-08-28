"use strict";
let Term = require("../term.js");
let conjugate = require("./conjugate/conjugate.js");
let predict_form = require("./conjugate/predict_form.js");

let allowed_forms = {
  infinitive: 1,
  present: 1,
  past: 1,
  gerund: 1,
  doer: 1,
  future: 1
};

class Verb extends Term {
  constructor(str, form) {
    super(str);
    this.parent = "verb";
    this.conjugations = {}; //cached conjugations
    //if we've been told which
    if (form && allowed_forms[form]) {
      this._form = form;
      this.conjugations[form] = this.normal;
    }
  }

  //which current conjugation form it is
  form() {
    //if we haven't been told
    if (!this._form) {
      this._form = predict_form(this.normal);
    }
    //else, predict it
    return this._form;
  }

  //retrieve a specific form
  conjugation(type) {
    type = type || "infinitive";
    //check cached conjugations
    if (this.conjugations[type] === undefined) {
      this.conjugate();
    }
  }

  //is this verb negative already?
  isNegative() {
    let str = this.normal;
    if (str.match(/n't$/)) {
      return true;
    }
    if (str.match(/ not$/)) {
      return true;
    }
    return false;
  }

  conjugate() {
    this.conjugations = conjugate(this.normal);
    return this.conjugations;
  }
}

// let v = new Verb("walk", "asdf")
// console.log(v.form())

module.exports = Verb;
