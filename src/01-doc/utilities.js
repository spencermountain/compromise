module.exports = {
  tag: function(tag, why) {
    this.list.forEach((p) => {
      p.terms().forEach((t) => t.tag(tag, this.world, why));
    });
    return this;
  },
  untag: function(tag, why) {
    this.list.forEach((p) => {
      p.terms().forEach((t) => t.untag(tag, this.world, why));
    });
    return this;
  },
};
