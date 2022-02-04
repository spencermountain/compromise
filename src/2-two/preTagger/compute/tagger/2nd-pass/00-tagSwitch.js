const tagSwitch = function (terms, i, model) {
  const switches = model.two.switches
  if (switches.hasOwnProperty(terms[i].normal)) {
    terms[i].switch = switches[terms[i].normal]
  }
}
export default tagSwitch