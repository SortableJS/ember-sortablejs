import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { simulateDrag } from 'ember-sortablejs/test-support/dndsimulator';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | sortable-js', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    // await render(hbs`{{sortable-js}}`);
    // assert.equal(this.element.textContent.trim(), '');

    const onChoose = () => assert.ok(true, 'onChosse was called');
    const unChoose = () => assert.ok(true, 'unChosse was called');

    this.set('onChoose', onChoose);
    this.set('unChoose', unChoose);

    // Template block usage:
    await render(hbs`
      <SortableJs
        @options={{hash animation=150 ghostClass="ghost-class"}}
        @onChoose={{action onChoose}}
        @unChoose={{action unChoose}}
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
    const targetEl = find('li[data-testid="two"]');

    simulateDrag(elToBeDragged, targetEl);

    // const mouseEvent = (type) => new MouseEvent(type, { bubbles: true, cancelable: true });
    // const pointerEvent = (type, options) => new PointerEvent(type, Object.assign({ bubbles: true, cancelable: true }, options));

    // elToBeDragged.dispatchEvent(pointerEvent('pointerdown'))
    // elToBeDragged.dispatchEvent(mouseEvent('mouseup'));

    // assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
