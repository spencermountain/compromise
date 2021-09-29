export default {
  plug: {
    sell: { words: ['book', 'biography', 'album'] },
    stop: { fallback: true, words: ['drain', 'sink', 'pipe'] },
  },
  strike: {
    hit: { fallback: true },
    protest: { words: ['job', 'union', 'worker'] },
  },
  charge: {
    money: { words: ['fee', 'bank', 'price', 'service'] },
    run: { words: ['toward', 'run', 'flee'] },
  },
  fire: {
    job: { words: ['job', 'boss', 'contract'] },
    gun: { words: ['gun', 'weapon', 'bullet', 'away'] },
  },
}
