class Stack {
  constructor() {
    this.views = [];
  }
  add(view) {
    this.views.push(view);
    return this;
  }
  pop() {
    this.views.pop();
    return this;
  }
  current() {
    return this.views[this.views.length - 1];
  }
}
module.exports = Stack;
