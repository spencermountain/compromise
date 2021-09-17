const isObject = function (item) {
  // let isSet = item instanceof Set
  return item && typeof item === 'object' && !Array.isArray(item)
}

// recursive merge of objects
function mergeDeep(model, plugin) {
  if (isObject(plugin)) {
    for (const key in plugin) {
      if (isObject(plugin[key])) {
        if (!model[key]) Object.assign(model, { [key]: {} })
        mergeDeep(model[key], plugin[key]) //recursion
      } else {
        Object.assign(model, { [key]: plugin[key] })
      }
    }
  }
  return model
}

// const merged = mergeDeep({ a: 1 }, { b: { c: { d: { e: 12345 } } } })
// console.dir(merged, { depth: 5 })

const extend = function (plugin, world, View) {
  const { methods, model, compute, hooks } = world
  mergeDeep(compute, plugin.compute)
  mergeDeep(methods, plugin.methods)
  mergeDeep(model, plugin.model)

  if (hooks) {
    world.hooks = hooks.concat(plugin.hooks || [])
  }
  if (plugin.api) {
    plugin.api(View)
  }
  // console.log(world)
}
export default extend
