function objectWithValues(object: object) {
  return Object.fromEntries(Object.entries(object).filter(([_, v]) => v !== ''))
}

export default objectWithValues
