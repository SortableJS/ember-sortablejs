import { move, insertAt, removeFrom } from 'ember-sortablejs/utils/array-utils';
import { module, test } from 'qunit';

module('Unit | Utility | array-utils', function() {

  // Replace this with your real tests.
  module('#move', function() {
    test('it moves an array element from one position to another ', function(assert) {
      const testArray = ['a', 'b', 'c', 'd', 'e'];
      const expected = ['b', 'c', 'd', 'a', 'e'];
      const actual = move(testArray, 0, 3);

      assert.ok(actual !== testArray);
      assert.deepEqual(actual, expected);
    });
  });

  module('#insertAt', function () {
    test('it inserts an element to an array in specified index', function(assert) {
      const testArray = ['a', 'b', 'c', 'd', 'e'];
      const expected = ['a', 'b', 'f', 'c', 'd', 'e'];
      const actual = insertAt(testArray, 2, 'f');

      assert.ok(actual !== testArray);
      assert.deepEqual(actual, expected);
    });
  });

  module('#removeFrom', function () {
    test('it removes an array element from a specified index', function(assert) {
      const testArray = ['a', 'b', 'c', 'd', 'e'];
      const expected = ['a', 'b', 'c', 'e'];
      const actual = removeFrom(testArray, 3);

      assert.ok(actual !== testArray);
      assert.deepEqual(actual, expected);
    });
  });
});
