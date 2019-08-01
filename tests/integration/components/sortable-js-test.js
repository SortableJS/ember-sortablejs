import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { simulateDrag } from 'ember-sortablejs/test-support/dndsimulator';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | sortable-js', function(hooks) {
  setupRenderingTest(hooks);

  test('it reorders a list', async function(assert) {
    const done = assert.async();
    const onChoose = () => assert.ok(true, 'onChosse was called');
    const onStart = () => assert.ok(true, 'onStart was called');
    const onMove = () => assert.ok(true, 'onMove was called');
    const onEnd = () => {
      assert.ok(true, 'onEnd was called');
      done();
    }

    this.set('onChoose', onChoose);
    this.set('onStart', onStart);
    this.set('onMove', onMove);
    this.set('onEnd', onEnd);

    // Template block usage:
    await render(hbs`
      <SortableJs
        @options={{hash animation=150 ghostClass="ghost-class"}}
        @onChoose={{action onChoose}}
        @onStart={{action onStart}}
        @onMove={{action onMove}}
        @onEnd={{action onEnd}}
      >
        <ul class="list-group">
          <li data-testid="one" class="list-group-item">Item 1</li>
          <li data-testid="two" class="list-group-item">Item 2</li>
          <li data-testid="three" class="list-group-item">Item 3</li>
          <li data-testid="four" class="list-group-item">Item 4</li>
          <li data-testid="five" class="list-group-item">Item 5</li>
        </ul>
      </SortableJs>
    `);

    const listItemOne = find('li[data-testid="one"]');
    const listItemFour = find('li[data-testid="four"]');

    await simulateDrag(listItemOne, listItemFour);

    const listItems = document.querySelector('.list-group').children;
    assert.equal(listItemOne, listItems[3]);
  });

  test('it moves and element from one list to another', async function (assert) {
    const onAdd = () => assert.ok(true, 'onAdd was called');
    const onRemove = () => assert.ok(true, 'onRemove was called');

    this.set('onAdd', onAdd);
    this.set('onRemove', onRemove);

    await render(hbs`
      <SortableJs
        @options={{hash animation=150 ghostClass="ghost-class" group="test-group"}}
        @onRemove={{action this.onRemove}}
      >
        <ul class="list-group-a">
          <li data-testid="one-a" class="list-group-item">Item 1</li>
          <li data-testid="two-a" class="list-group-item">Item 2</li>
          <li data-testid="three-a" class="list-group-item">Item 3</li>
          <li data-testid="four-a" class="list-group-item">Item 4</li>
          <li data-testid="five-a" class="list-group-item">Item 5</li>
        </ul>
      </SortableJs>

      <SortableJs
        @options={{hash animation=150 ghostClass="ghost-class" group="test-group"}}
        @onAdd={{action this.onAdd}}
      >
        <ul class="list-group-b">
          <li data-testid="one-b" class="list-group-item">Item 1</li>
          <li data-testid="two-b" class="list-group-item">Item 2</li>
          <li data-testid="three-b" class="list-group-item">Item 3</li>
          <li data-testid="four-b" class="list-group-item">Item 4</li>
          <li data-testid="five-b" class="list-group-item">Item 5</li>
        </ul>
      </SortableJs>
    `);

    const itemA = find('li[data-testid="one-a"]');
    const itemB = find('li[data-testid="four-b"]');

    await simulateDrag(itemA, itemB);

    const aItems = document.querySelector('.list-group-a');
    const bItems = document.querySelector('.list-group-b');

    assert.equal(aItems.children.length, 4, 'list a has one less item');
    assert.equal(bItems.children.length, 6, 'list b has one less item');
  });

  test('it clones an element from one list to another', async function (assert) {
    const onClone = () => assert.ok(true, 'onClone was called');

    this.set('onClone', onClone);

    await render(hbs`
      <SortableJs
        @options={{hash
          animation=150
          ghostClass="ghost-class"
          group=(hash name="shared" pull="clone")
        }}
      >
        <ul class="list-group-a">
          <li data-testid="one-a" class="list-group-item">Item 1</li>
          <li data-testid="two-a" class="list-group-item">Item 2</li>
          <li data-testid="three-a" class="list-group-item">Item 3</li>
          <li data-testid="four-a" class="list-group-item">Item 4</li>
          <li data-testid="five-a" class="list-group-item">Item 5</li>
        </ul>
      </SortableJs>

      <SortableJs
        @options={{hash
          animation=150
          ghostClass="ghost-class"
          group=(hash name="shared" pull="clone")
        }}
        @onClone={{action this.onClone}}
      >
        <ul class="list-group-b">
          <li data-testid="one-b" class="list-group-item">Item 1</li>
          <li data-testid="two-b" class="list-group-item">Item 2</li>
          <li data-testid="three-b" class="list-group-item">Item 3</li>
          <li data-testid="four-b" class="list-group-item">Item 4</li>
          <li data-testid="five-b" class="list-group-item">Item 5</li>
        </ul>
      </SortableJs>
    `);

    const itemA = find('li[data-testid="one-a"]');
    const itemB = find('li[data-testid="four-b"]');

    await simulateDrag(itemA, itemB);

    const aItems = document.querySelector('.list-group-a');
    const bItems = document.querySelector('.list-group-b');

    assert.equal(aItems.children.length, 5, 'list a has all its elements');
    assert.equal(bItems.children.length, 6, 'list b has a cloned item');
  });

  test('it dynamically sets options', async function(assert) {
    let count = 0;
    const done = assert.async();
    const onChoose = () => assert.ok(true, 'onChosse was called');
    const onStart = () => assert.ok(true, 'onStart was called');
    const onMove = () => assert.ok(true, 'onMove was called');
    const onEnd = (event, sortableInstance) => {
      assert.ok(true, 'onEnd was called');
      count += 1;
      if (count === 2) {
        assert.equal(sortableInstance.option('animation'), 100, 'Animation was changed to 100');
        assert.equal(sortableInstance.option('ghostClass'), 'foo', 'Ghost class was changed to foo');
        done();
      }
    }

    let options = {
      animation: 150,
      ghostClass: 'ghost-class',
    };

    this.set('onChoose', onChoose);
    this.set('onStart', onStart);
    this.set('onMove', onMove);
    this.set('onEnd', onEnd);
    this.set('options', options);

    // Template block usage:
    await render(hbs`
      <SortableJs
        @options={{options}}
        @onChoose={{action onChoose}}
        @onStart={{action onStart}}
        @onMove={{action onMove}}
        @onEnd={{action onEnd}}
      >
        <ul class="list-group">
          <li data-testid="one" class="list-group-item">Item 1</li>
          <li data-testid="two" class="list-group-item">Item 2</li>
          <li data-testid="three" class="list-group-item">Item 3</li>
          <li data-testid="four" class="list-group-item">Item 4</li>
          <li data-testid="five" class="list-group-item">Item 5</li>
        </ul>
      </SortableJs>
    `);

    const listItemOne = find('li[data-testid="one"]');
    const listItemFour = find('li[data-testid="four"]');
    const listItemTwo = find('li[data-testid="two"]');

    await simulateDrag(listItemOne, listItemFour);

    const listItems = document.querySelector('.list-group').children;
    assert.equal(listItemOne, listItems[3]);

    options = {
      animation: 100,
      ghostClass: 'foo',
    };

    this.set('options', options);

    await simulateDrag(listItemTwo, listItemOne);
  });
});
