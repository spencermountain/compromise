module.exports = {
  text: {
    desc:
      'render parsed data as an output. supports `text`, `normal`, `array`, `html`, `grid`, `color`, `debug`, `csv`',
    returns: 'Doc',
    example: `nlp('you might say there’s a little Uter in all of us').match('#Adjective uter').out('html')\n//<span><span class=\`nl-Adjective\`>little</span>&nbsp;<span class=\`nl-Person nl-FirstName\`>Uter</span></span>`,
  },
  json: {
    desc: 'return a handy array of meta-data for this subset. Default subset is sentences, but it can be anything.',
    example: `nlp('The stage was set for the Alan Parsons Project! Which I believe was some sort of hovercraft.').data()\n//[{normal:'the stage was set...'}]`,
    returns: 'Array',
    aliases: ['json'],
  },
}
