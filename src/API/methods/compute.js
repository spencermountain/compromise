const fns = {
  /** add metadata to term objects */
  compute: function (input, options) {
    const { world } = this
    const compute = world.compute
    // do one method
    if (typeof input === 'string' && Object.hasOwn(compute, input)) {
      compute[input](this, options)
    }
    // allow a list of methods
    else if (Array.isArray(input)) {
      input.forEach(name => {
        if (Object.hasOwn(world.compute, name)) {
          compute[name](this, options)
        } else {
          console.warn('no compute:', input) // eslint-disable-line
        }
      })
    }
    // allow a custom compute function
    else if (typeof input === 'function') {
      input(this, options)
    } else {
      console.warn('no compute:', input) // eslint-disable-line
    }
    return this
  },
}
export default fns
