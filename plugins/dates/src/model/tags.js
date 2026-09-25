export default {
  // Calendar tags and their exclusions are supplied by core.
  // 'two weeks before'
  DateShift: {
    is: 'Date',
    not: ['Timezone', 'Holiday'],
  },
}
