const serializeNet = function (net) {
  Object.keys(net.hooks).forEach(k => {
    net.hooks[k].forEach(obj => {
      obj.regs.forEach(reg => {
        if (reg.fastOr) {
          reg.fastOr = Array.from(reg.fastOr)
        }
      })
    })
  })
  return net
}

const parseNet = function (net) {
  Object.keys(net.hooks).forEach(k => {
    net.hooks[k].forEach(obj => {
      obj.regs.forEach(reg => {
        if (reg.fastOr) {
          reg.fastOr = new Set(reg.fastOr)
        }
      })
    })
  })
  return net
}
// export { serializeNet, parseNet }



let matches = [
  { match: 'spencer and yaniv', tag: 'Frens' },
]
let net = nlp.buildNet(matches)
net = serializeNet(net)
net = parseNet(net)
console.dir(net, { depth: 6 })
nlp('before spencer and yaniv after').match(net).debug()
