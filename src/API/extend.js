const isObject = function (item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

const isUnsafeKey = key => key === '__proto__' || key === 'constructor' || key === 'prototype'

// recursive merge of objects
function mergeDeep(model, plugin) {
  if (isObject(plugin)) {
    for (const key in plugin) {
      // prevent prototype pollution
      if (isUnsafeKey(key)) {
        continue
      }
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

// vroom
function mergeQuick(model, plugin) {
  for (const key in plugin) {
    if (isUnsafeKey(key)) continue
    model[key] ||= {}
    Object.assign(model[key], plugin[key])
  }
  return model
}

// verb forms, then adjective forms
const irregularForms = [
  ['pastTense', 'Past'],
  ['presentTense', 'Present'],
  ['gerund', 'Gerund'],
  ['comparative', 'Comparative'],
  ['superlative', 'Superlative'],
]

const addIrregulars = function (model, conj) {
  const m = model.two.models || {}
  Object.keys(conj).forEach(k => {
    irregularForms.forEach(([prop, name]) => {
      const form = conj[k][prop]
      if (!form) {
        return
      }
      if (m['to' + name]) {
        m['to' + name].ex[k] = form
      }
      if (m['from' + name]) {
        m['from' + name].ex[form] = k
      }
    })
  })
}

const extend = function (plugin, world, View, nlp) {
  // support array of plugins
  if (Array.isArray(plugin)) {
    plugin.forEach(p => extend(p, world, View, nlp))
    return
  }
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
  // Notify plugins when replacement creates new terms.
  if (plugin.onReplace) {
    methods.one.onReplace = (methods.one.onReplace || []).concat(plugin.onReplace)
  }
  // assign new class methods
  if (plugin.api) {
    plugin.api(View)
  }
  if (plugin.lib) {
    Object.keys(plugin.lib).forEach(k => (nlp[k] = plugin.lib[k]))
  }
  if (plugin.tags) {
    nlp.addTags(plugin.tags)
  }
  if (plugin.words) {
    nlp.addWords(plugin.words)
  }
  if (plugin.frozen) {
    nlp.addWords(plugin.frozen, true)
  }
  if (plugin.mutate) {
    plugin.mutate(world, nlp)
  }
}
export default extend
