import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import { simulateDrag } from 'ember-sortablejs/test-support/dndsimulator';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | sortable-js', function(hooks) {
  setupRenderingTest(hooks);

  hooks.before(function() {
    this.list = [
      'item one',
      'item two',
      'item three',
      'item four',
      'item five',
    ];
  });

  test('it renders with a dynamic tag supplied', async function(assert) {
    await render(hbs`
      <SortableJs class="rendered-list"></SortableJs>
    `);

    const list = find('.rendered-list');
    assert.equal(list.nodeName, 'DIV')


    await render(hbs`
      <SortableJs @tag="ul" class="another-list"></SortableJs>
    `);

    const anotherList = find('.another-list');
    assert.equal(anotherList.nodeName, 'UL')
  });

  test('it renders a list', async function(assert) {
    await render(hbs`
      <SortableJs
        class="rendered-list"
        @items={{this.list}}
        as |list|
      >
        {{#each list as |item| }}
          <div class="list-item">{{item}}</div>
        {{/each}}
      </SortableJs>
    `);

    const listItem = findAll('.list-item');
    assert.equal(listItem.length, 5);
  });

  test('it reorders a list', async function(assert) {
    assert.expect(9);
    const done = assert.async();

    this.onChoose = (event) => {
      assert.ok(event);
    };
    this.onStart = (event) => {
      assert.ok(event);
    };
    this.onClone = (event) => {
      assert.ok(event);
    };
    this.onMove = (event) => {
      assert.ok(event);
    };
    this.onChange = (event) => {
      assert.ok(event);
    };
    this.onUnchoose = (event) => {
      assert.ok(event);
    };
    this.onUpdate = (event) => {
      assert.ok(event);
    };
    this.onEnd = (event) => {
      assert.ok(event);
      done();
    };

    await render(hbs`
      <SortableJs
        class="rendered-list"
        @items={{this.list}}
        @onChoose={{this.onChoose}}
        @onClone={{this.onClone}}
        @onMove={{this.onMove}}
        @onChange={{this.onChange}}
        @onUnchoose={{this.onUnchoose}}
        @onUpdate={{this.onUpdate}}
        @onEnd={{this.onEnd}}
        @onStart={{this.onStart}}
        as |list|
      >
        {{#each list as |item index| }}
          <div data-list-item={{index}} class="list-item">{{item.value}}</div>
        {{/each}}
      </SortableJs>
    `);

    const listItemZero = find('div[data-list-item="0"]');
    const listItemThree = find('div[data-list-item="3"]');

    const expectedOrder = [
      'item two',
      'item three',
      'item four',
      'item one',
      'item five',
    ];

    await simulateDrag(listItemZero, listItemThree);

    const actualOrder = Array.from(findAll('div[data-list-item]')).map(node => node.innerText);

    assert.deepEqual(actualOrder, expectedOrder);
  });

  test('it moves and element from one list to another', async function (assert) {
    const done = assert.async();
    this.onChoose = (event) => assert.ok(event, 'onChoose');
    this.onStart = (event) => assert.ok(event, 'onStart');
    this.onClone = (event) => assert.ok(event, 'onClone');
    this.onMove = (event) => assert.ok(event, 'onMove');
    this.onChange = (event) => assert.ok(event, 'onChange');
    this.onUnchoose = (event) => assert.ok(event, 'onUnchoose');
    this.onUpdate = (event) => assert.ok(event, 'onUpdate');
    this.onRemove = (event) => assert.ok(event, 'onRemove');
    this.onAdd = (event) => assert.ok(event, 'onAdd');
    this.onEnd = (event) => {
      assert.ok(event, 'onEnd');
      done();
    };

    await render(hbs`
      <SortableJs
        class="list-a"
        @items={{this.list}}
        @onChoose={{this.onChoose}}
        @onClone={{this.onClone}}
        @onMove={{this.onMove}}
        @onUnchoose={{this.onUnchoose}}
        @onRemove={{this.onRemove}}
        @onEnd={{this.onEnd}}
        as |list|
      >
        {{#each list as |item index| }}
          <div data-list-item={{index}} class="list-item">{{item.value}}</div>
        {{/each}}
      </SortableJs>
      <br>
      <SortableJs
        class="list-b"
        @items={{this.list}}
        @onChange={{this.onChange}}
        @onAdd={{this.onAdd}}
        as |list|
      >
        {{#each list as |item index| }}
          <div data-list-item={{index}} class="list-item">{{item.value}}</div>
        {{/each}}
      </SortableJs>
    `);

    const listAItemFive = find('.list-a > div[data-list-item="2"]');
    const listBItemOne = find('.list-b > div[data-list-item="2"]');

    await simulateDrag(listAItemFive, listBItemOne);

    const listAOrder = Array.from(findAll('.list-a > div[data-list-item]')).map(node => node.innerText);
    const listBOrder = Array.from(findAll('.list-b > div[data-list-item]')).map(node => node.innerText);

    const expectedListAOrder = [
      'item one',
      'item two',
      'item three',
      'item four',
    ];
    const expectedListBOrder = [
      'item five',
      'item one',
      'item two',
      'item three',
      'item four',
      'item five',
    ];

    assert.deepEqual(listAOrder, expectedListAOrder);
    assert.deepEqual(listBOrder, expectedListBOrder);
  });

  // test('it reorders a list', async function(assert) {
  //   const done = assert.async();
  //   const onChoose = () => assert.ok(true, 'onChosse was called');
  //   const onStart = () => assert.ok(true, 'onStart was called');
  //   const onMove = () => assert.ok(true, 'onMove was called');
  //   const onEnd = () => {
  //     assert.ok(true, 'onEnd was called');
  //     done();
  //   }

  //   this.set('onChoose', onChoose);
  //   this.set('onStart', onStart);
  //   this.set('onMove', onMove);
  //   this.set('onEnd', onEnd);

  //   // Template block usage:
  //   await render(hbs`
  //     <SortableJs
  //       class="list-group"
  //       @options={{hash animation=150 ghostClass="ghost-class"}}
  //       @onChoose={{action this.onChoose}}
  //       @onStart={{action this.onStart}}
  //       @onMove={{action this.onMove}}
  //       @onEnd={{action this.onEnd}}
  //     >
  //       <div data-testid="one" class="list-group-item">Item 1</div>
  //       <div data-testid="two" class="list-group-item">Item 2</div>
  //       <div data-testid="three" class="list-group-item">Item 3</div>
  //       <div data-testid="four" class="list-group-item">Item 4</div>
  //       <div data-testid="five" class="list-group-item">Item 5</div>
  //     </SortableJs>
  //   `);

  //   const listItemOne = find('div[data-testid="one"]');
  //   const listItemFour = find('div[data-testid="four"]');

  //   await simulateDrag(listItemOne, listItemFour);

  //   const listItems = document.querySelector('.list-group').children;
  //   assert.equal(listItemOne, listItems[3], 'list item was moved');
  // });

  // test('it moves and element from one list to another', async function (assert) {
  //   const onAdd = () => assert.ok(true, 'onAdd was called');
  //   const onRemove = () => assert.ok(true, 'onRemove was called');

  //   this.set('onAdd', onAdd);
  //   this.set('onRemove', onRemove);

  //   await render(hbs`
  //     <SortableJs
  //       class="list-group-a"
  //       @options={{hash animation=150 ghostClass="ghost-class" group="test-group"}}
  //       @onRemove={{action this.onRemove}}
  //     >
  //       <div data-testid="one-a" class="list-group-item">Item 1</div>
  //       <div data-testid="two-a" class="list-group-item">Item 2</div>
  //       <div data-testid="three-a" class="list-group-item">Item 3</div>
  //       <div data-testid="four-a" class="list-group-item">Item 4</div>
  //       <div data-testid="five-a" class="list-group-item">Item 5</div>
  //     </SortableJs>

  //     <SortableJs
  //       class="list-group-b"
  //       @options={{hash animation=150 ghostClass="ghost-class" group="test-group"}}
  //       @onAdd={{action this.onAdd}}
  //     >
  //       <div data-testid="one-b" class="list-group-item">Item 1</div>
  //       <div data-testid="two-b" class="list-group-item">Item 2</div>
  //       <div data-testid="three-b" class="list-group-item">Item 3</div>
  //       <div data-testid="four-b" class="list-group-item">Item 4</div>
  //       <div data-testid="five-b" class="list-group-item">Item 5</div>
  //     </SortableJs>
  //   `);

  //   const itemA = find('div[data-testid="one-a"]');
  //   const itemB = find('div[data-testid="four-b"]');

  //   await simulateDrag(itemA, itemB);

  //   const aItems = document.querySelector('.list-group-a');
  //   const bItems = document.querySelector('.list-group-b');

  //   assert.equal(aItems.children.length, 4, 'list a has one less item');
  //   assert.equal(bItems.children.length, 6, 'list b has one less item');
  // });

  // test('it clones an element from one list to another', async function (assert) {
  //   const onClone = () => assert.ok(true, 'onClone was called');

  //   this.set('onClone', onClone);

  //   await render(hbs`
  //     <SortableJs
  //       class="list-group-a"
  //       @options={{hash
  //         animation=150
  //         ghostClass="ghost-class"
  //         group=(hash name="shared" pull="clone")
  //       }}
  //     >
  //       <div data-testid="one-a" class="list-group-item">Item 1</div>
  //       <div data-testid="two-a" class="list-group-item">Item 2</div>
  //       <div data-testid="three-a" class="list-group-item">Item 3</div>
  //       <div data-testid="four-a" class="list-group-item">Item 4</div>
  //       <div data-testid="five-a" class="list-group-item">Item 5</div>
  //     </SortableJs>

  //     <SortableJs
  //       class="list-group-b"
  //       @options={{hash
  //         animation=150
  //         ghostClass="ghost-class"
  //         group=(hash name="shared" pull="clone")
  //       }}
  //       @onClone={{action this.onClone}}
  //     >
  //       <div data-testid="one-b" class="list-group-item">Item 1</div>
  //       <div data-testid="two-b" class="list-group-item">Item 2</div>
  //       <div data-testid="three-b" class="list-group-item">Item 3</div>
  //       <div data-testid="four-b" class="list-group-item">Item 4</div>
  //       <div data-testid="five-b" class="list-group-item">Item 5</div>
  //     </SortableJs>
  //   `);

  //   const itemA = find('div[data-testid="one-a"]');
  //   const itemB = find('div[data-testid="four-b"]');

  //   await simulateDrag(itemA, itemB);

  //   const aItems = document.querySelector('.list-group-a');
  //   const bItems = document.querySelector('.list-group-b');

  //   assert.equal(aItems.children.length, 5, 'list a has all its elements');
  //   assert.equal(bItems.children.length, 6, 'list b has a cloned item');
  // });

  // test('it dynamically sets options', async function(assert) {
  //   let count = 0;
  //   const done = assert.async();
  //   const onChoose = () => assert.ok(true, 'onChosse was called');
  //   const onStart = () => assert.ok(true, 'onStart was called');
  //   const onMove = () => assert.ok(true, 'onMove was called');
  //   const onEnd = (event, sortableInstance) => {
  //     assert.ok(true, 'onEnd was called');
  //     count += 1;
  //     if (count === 2) {
  //       assert.equal(sortableInstance.option('animation'), 100, 'Animation was changed to 100');
  //       assert.equal(sortableInstance.option('ghostClass'), 'foo', 'Ghost class was changed to foo');
  //       done();
  //     }
  //   }

  //   let options = {
  //     animation: 150,
  //     ghostClass: 'ghost-class',
  //   };

  //   this.set('onChoose', onChoose);
  //   this.set('onStart', onStart);
  //   this.set('onMove', onMove);
  //   this.set('onEnd', onEnd);
  //   this.set('options', options);

  //   // Template block usage:
  //   await render(hbs`
  //     <SortableJs
  //       class="list-group"
  //       @options={{options}}
  //       @onChoose={{action onChoose}}
  //       @onStart={{action onStart}}
  //       @onMove={{action onMove}}
  //       @onEnd={{action onEnd}}
  //     >
  //       <div data-testid="one" class="list-group-item">Item 1</div>
  //       <div data-testid="two" class="list-group-item">Item 2</div>
  //       <div data-testid="three" class="list-group-item">Item 3</div>
  //       <div data-testid="four" class="list-group-item">Item 4</div>
  //       <div data-testid="five" class="list-group-item">Item 5</div>
  //     </SortableJs>
  //   `);

  //   const listItemOne = find('div[data-testid="one"]');
  //   const listItemFour = find('div[data-testid="four"]');
  //   const listItemTwo = find('div[data-testid="two"]');

  //   await simulateDrag(listItemOne, listItemFour);

  //   const listItems = document.querySelector('.list-group').children;
  //   assert.equal(listItemOne, listItems[3], 'dragged successful');

  //   options = {
  //     animation: 100,
  //     ghostClass: 'foo',
  //   };

  //   this.set('options', options);

  //   await new Promise((resolve) => setTimeout(() => resolve(), 1000));

  //   await simulateDrag(listItemTwo, listItemOne)
  // });

  // test('calls onSpill when dropped outside the sortable regioin', async function(assert) {
  //   this.onSpill = function() {
  //     assert.ok(true, 'onSpill was invoked');
  //     done();
  //   };
  //   this.options = {
  //     animation: 100,
  //     ghostClass: 'foo',
  //     revertOnSpill: true,
  //   };

  //   const done = assert.async();

  //   await render(hbs`
  //     <div class="spill-element"></div>
  //     <br>
  //     <SortableJs
  //       class="list-group"
  //       @options={{this.options}}
  //       @onSpill={{this.onSpill}}
  //     >
  //       <div data-testid="one" class="list-group-item">Item 1</div>
  //       <div data-testid="two" class="list-group-item">Item 2</div>
  //       <div data-testid="three" class="list-group-item">Item 3</div>
  //       <div data-testid="four" class="list-group-item">Item 4</div>
  //       <div data-testid="five" class="list-group-item">Item 5</div>
  //     </SortableJs>
  //   `);

  //   const draggableElement = find('div[data-testid="four"]');
  //   const spillElement = find('.spill-element');

  //   await simulateDrag(draggableElement, spillElement);
  // });
});
