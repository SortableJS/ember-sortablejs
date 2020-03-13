import Component from '@glimmer/component';
import Sortable from 'sortablejs';
import { bind, scheduleOnce } from '@ember/runloop';
import { action } from '@ember/object';
import { next } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import { move, insertAt, removeFrom } from 'ember-sortablejs/utils/array-utils';
import { inject as service } from '@ember/service';

export default class SortableJsComponent extends Component {
  @service dragStore;

  @tracked list = [];

  #sortableContainer = null;
  #sortableInstance = null;
  #internalEvents = [
    'onStart',
    'onAdd',
    'onUpdate',
    'onRemove',
    'onEnd',
  ];
  #events = [
    'onMove',
    'onChange',
    'onChoose',
    'onUnchoose',
    'onSort',
    'onClone',
    'scrollFn',
    'setData',
    'onFilter',
    'onSpill',
  ];

  get element() {
    return this.args.tag || 'div';
  }

  get internalList() {
    return [...this.list];
  }

  get mappedList() {
    // fix identity diffing
    return this.internalList.map((item, i) => ({ id: i += 1, value: item }))
  }

  @action
  setOptions() {
    for (let [key, value] of Object.entries(this.args.options)) {
      this.setOption(key, value);
    }
  }

  /**
   *
   * @param {HTMLElement} element
   */
  @action
  didInsert(element) {
    const defaults = {};
    const options = Object.assign({}, defaults, this.args.options);

    this.#sortableContainer = element;

    next(this, () => {
      this.#sortableInstance = Sortable.create(element, options);
      this.setupEventHandlers();
      this.setupInternalEventHandlers();
      this.setList();
    });
  }

  @action
  setList() {
    this.list = [...(this.args.items || [])];
  }

  willDestroy() {
    this.#sortableInstance.destroy();
  }

  onUpdate(evt) {
    const {
      newDraggableIndex,
      oldDraggableIndex,
    } = evt;

    this.list = move(this.list, oldDraggableIndex, newDraggableIndex);
    this.args?.onUpdate?.(evt);
  }

  onRemove(evt) {
    const {
      oldDraggableIndex,
    } = evt;

    if (evt.pullMode !== 'clone') {
      this.list = removeFrom(this.list, oldDraggableIndex);
    }

    this.args?.onRemove?.(evt);
  }

  onAdd(evt) {
    evt.item.remove(); // without this DOM is wrong
    const {
      oldDraggableIndex,
      newDraggableIndex,
    } = evt;
    const oldItem = this.dragStore.dragging.list[oldDraggableIndex];
    this.list = insertAt(this.list, newDraggableIndex, oldItem)
    this.args?.onAdd?.(evt);
  }

  onStart(evt) {
    this.dragStore.dragging = this;
    this.args?.onStart?.(evt);
  }

  onEnd(evt) {
    this.args?.onEnd?.(evt);
    this.dragStore.dragging = null;
  }

  setupEventHandlers() {
    this.#events.forEach(eventName => {
      const action = this.args[eventName];
      if (typeof action === 'function') {
        this.#sortableInstance.option(eventName, bind(this, 'performExternalAction', eventName));
      }
    });
  }

  setupInternalEventHandlers() {
    this.#internalEvents.forEach(eventName => {
      this.#sortableInstance.option(eventName, bind(this, this[eventName]));
    });
  }

  performExternalAction(actionName, ...args) {
    let action = this.args[actionName];

    if (typeof action === 'function') {
      action(...args, this.sortable);
    }
  }

  setOption(option, value) {
    this.#sortableInstance.option(option, value);
  }
}
