module.exports = {
  tag: function(tag, why) {
    this.list.forEach((p) => {
      p.terms().forEach((t) => t.tag(tag, why));
    });
  },
  untag: function(tag, why) {
    this.list.forEach((p) => {
      p.terms().forEach((t) => t.untag(tag, why));
    });
  },
};
