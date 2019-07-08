import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { simulateDrag } from 'ember-sortablejs/test-support/dndsimulator';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | sortable-js', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3)
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    // await render(hbs`{{sortable-js}}`);
    // assert.equal(this.element.textContent.trim(), '');

    const onChoose = () => assert.ok(true, 'onChosse was called');
    const onStart = () => assert.ok(true, 'onStart was called');
    const onMove = () => assert.ok(true, 'onMove was called');
    // const onEnd = () => assert.ok(true, 'onEnd was called');
    const onUnchoose = () => assert.ok(true, 'unChosse was called');


    this.set('onChoose', onChoose);
    this.set('onStart', onStart);
    this.set('onMove', onMove);
    this.set('onUnchoose', onUnchoose);
    // this.set('onEnd', onEnd);

    // Template block usage:
    await render(hbs`
      <SortableJs
        @options={{hash animation=150 ghostClass="ghost-class"}}
        @onChoose={{action onChoose}}
        @onStart={{action onStart}}
        @onMove={{action onMove}}
        @onUnchoose={{action onUnchoose}}
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

    // const draggableGroup = find('.list-group');
    /**
     * @type HTMLElement
     */
    const elToBeDragged = find('li[data-testid="one"]');
    const targetEl = find('li[data-testid="four"]');

    simulateDrag(elToBeDragged, targetEl);

    // const mouseEvent = (type) => new MouseEvent(type, { bubbles: true, cancelable: true });
    // const pointerEvent = (type, options) => new PointerEvent(type, Object.assign({ bubbles: true, cancelable: true }, options));

    // elToBeDragged.dispatchEvent(pointerEvent('pointerdown'))
    // elToBeDragged.dispatchEvent(mouseEvent('mouseup'));

    // assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
