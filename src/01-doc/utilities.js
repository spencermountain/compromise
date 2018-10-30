module.exports = {
  tag: function(tag, why) {
    this.list.forEach((p) => {
      p.terms().forEach((t) => t.tag(tag, why, this.world));
    });
    return this;
  },
  untag: function(tag, why) {
    this.list.forEach((p) => {
      p.terms().forEach((t) => t.unTag(tag, why, this.world));
    });
    return this;
  },
};
