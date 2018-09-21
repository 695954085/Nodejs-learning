/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  if (s.length % 2 !== 0) return false
  let array = Array.from(s)
  let nArray = array.reduce(function(pre, curr) {
    if (curr === '[' || curr === '{' || curr === '(') {
      pre.push(curr)
    } else {
      if (curr === '}' && pre[pre.length - 1] === '{') {
        pre.pop()
      } else if (curr === ']' && pre[pre.length - 1] === '[') {
        pre.pop()
      } else if (curr === ')' && pre[pre.length - 1] === '(') {
        pre.pop()
      }
    }
    return pre
  }, [])
  if (nArray.length !== 0) return false
  return true
}

console.log(isValid('()'))
