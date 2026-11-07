// small helpers shared by the View class and its methods

// the pointer, or one per sentence for a full document
export const rawPointer = view => view.pointer || view.docs.map((_d, n) => [n])

// tag new terms, if the tagger is loaded
export const retag = function (view, computes) {
  view.compute([...computes, 'freeze', 'lexicon'])
  if (view.world.compute.preTagger) {
    view.compute('preTagger')
  }
  view.compute('unfreeze')
  return view
}
