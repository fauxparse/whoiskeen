export default (...classNames) =>
  _.uniq(_.filter(_.flattenDeep(classNames))).join(' ')
