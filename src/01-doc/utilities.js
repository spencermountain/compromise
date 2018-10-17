module.exports = {
  tag: function(tag, why) {
    let tags = this.world.tags;
    this.list.forEach((p) => {
      p.terms().forEach((t) => t.tag(tag, tags, why));
    });
  },
  untag: function(tag, why) {
    this.list.forEach((p) => {
      p.terms().forEach((t) => t.untag(tag, why));
    });
  },
};
