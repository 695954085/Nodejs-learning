/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function(J, S) {
  const jA = J.split('')
  const SA = S.split('').reduce(function(pre, curr, index) {
    if(jA.includes(curr))
      pre.push(curr)
    return pre
  }, [])
  return SA.length
}


console.log(numJewelsInStones('z', 'ZZ'))