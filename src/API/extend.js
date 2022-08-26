const isObject = function (item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

// recursive merge of objects
function mergeDeep(model, plugin) {
  if (isObject(plugin)) {
    for (const key in plugin) {
      if (isObject(plugin[key])) {
        if (!model[key]) Object.assign(model, { [key]: {} })
        mergeDeep(model[key], plugin[key]) //recursion
        // } else if (isArray(plugin[key])) {
        // console.log(key)
        // console.log(model)
      } else {
        Object.assign(model, { [key]: plugin[key] })
      }
    }
  }
  return model
}
// const merged = mergeDeep({ a: 1 }, { b: { c: { d: { e: 12345 } } } })
// console.dir(merged, { depth: 5 })

// vroom
function mergeQuick(model, plugin) {
  for (const key in plugin) {
    model[key] = model[key] || {}
    Object.assign(model[key], plugin[key])
  }
  return model
}

const addIrregulars = function (model, conj) {
  let m = model.two.models || {}
  Object.keys(conj).forEach(k => {
    if (conj[k].pastTense && m.toPast) {
      m.toPast.exceptions[k] = conj[k].pastTense
    }
    if (conj[k].presentTense && m.toPresent) {
      m.toPresent.exceptions[k] = conj[k].presentTense
    }
    if (conj[k].gerund && m.toGerund) {
      m.toGerund.exceptions[k] = conj[k].gerund
    }
    if (conj[k].comparative && m.toComparative) {
      m.toComparative.exceptions[k] = conj[k].comparative
    }
    if (conj[k].superlative && m.toSuperlative) {
      m.toSuperlative.exceptions[k] = conj[k].superlative
    }
  })
}

const extend = function (plugin, world, View, nlp) {
  const { methods, model, compute, hooks } = world
  if (plugin.methods) {
    mergeQuick(methods, plugin.methods)
  }
  if (plugin.model) {
    mergeDeep(model, plugin.model)
  }
  if (plugin.irregulars) {
    addIrregulars(model, plugin.irregulars)
  }
  // shallow-merge compute
  if (plugin.compute) {
    Object.assign(compute, plugin.compute)
  }
  // append new hooks
  if (hooks) {
    world.hooks = hooks.concat(plugin.hooks || [])
  }
  // assign new class methods
  if (plugin.api) {
    plugin.api(View)
  }
  if (plugin.lib) {
    Object.keys(plugin.lib).forEach(k => nlp[k] = plugin.lib[k])
  }
  if (plugin.tags) {
    nlp.addTags(plugin.tags)
  }
  if (plugin.words) {
    nlp.addWords(plugin.words)
  }
  if (plugin.mutate) {
    plugin.mutate(world)
  }
}
export default extend
