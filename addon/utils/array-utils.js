/**
 * Moves an array element from one index to another
 * @param {Array} arr
 * @param {Number} from
 * @param {Number} to
 * @returns {Array} [ ]
 */
export function move(arr, from, to) {
  const clone = [...arr];
  clone.splice(to, 0, clone.splice(from, 1)[0]);
  return clone;
}

/**
 * Insert an item to an array in the specified index
 * @param {Array} arr
 * @param {Number} index
 * @param {any} item
 * @returns {Array} [ ]
 */
export function insertAt(arr, index, item) {
  const clone = [...arr];
  clone.splice(index, 0, item)
  return clone;
}

/**
 * Insert an item to an array in the specified index
 * @param {Array} arr
 * @param {Number} index
 * @returns {Array} [ ]
 */
export function removeFrom(arr, index) {
  const clone = [...arr];
  clone.splice(index, 1);
  return clone;
}
