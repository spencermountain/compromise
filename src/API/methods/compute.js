const isArray = input => Object.prototype.toString.call(input) === '[object Array]'

const fns = {
  /** add metadata to term objects */
  compute: function (input) {
    const { docs, world } = this
    const compute = world.compute
    // do one method
    if (typeof input === 'string' && compute.hasOwnProperty(input)) {
      compute[input](docs, world, this)
    }
    // allow a list of methods
    else if (isArray(input)) {
      input.forEach(name => world.compute.hasOwnProperty(name) && compute[name](docs, world, this))
    }
    // allow a custom compute function
    else if (typeof input === 'function') {
      input(this.docs, world, this)
    } else {
      console.warn('no compute:', input) // eslint-disable-line
    }
    return this
  },
}
export default fns
