import Component from '@glimmer/component';
import Sortable from 'sortablejs';
import { bind, next } from '@ember/runloop';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { move, insertAt, removeFrom } from 'ember-sortablejs/utils/array-utils';
import { inject as service } from '@ember/service';

export default class SortableJsComponent extends Component {
  @service dragStore;

  @tracked list = [];

  cachedIdentity = new WeakMap();

  cachedList = null;
  hasUpdatedList = false; // Used to prevent unwanted renders. Probably there's a better way to do this.
  #sortableContainer = null;
  sortableInstance = null;
  internalEvents = [
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

  // get internalList() {
  //   return [...this.list];
  // }

  get mappedList() {
    console.log('running mappedList')
    // fix identity diffing for non object primiives
    return this.list.map((item, i) => ({ id: i + 1, value: item }));
    // return this.list.map((item) => {
    //   if (this.cachedIdentity.has(item)) {
    //     return this.cachedIdentity.get(item);
    //   }

    //   throw new Error('Identify not present');
    // });
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
      this.sortableInstance = Sortable.create(element, options);
      this.setupEventHandlers();
      this.setupInternalEventHandlers();
      this.setList();
    });
  }

  @action
  setList() {
    this.args.items?.forEach((item, i) => {
      if (!this.cachedIdentity.has(item)) {
        this.cachedIdentity.set(item, { id: i+1, value: item});
      }
    });
    this.list = [...(this.args.items || [])];
  }

  @action
  cancelDnD() {
    if (this.cachedList) {
      this.list = [...this.cachedList];
      this.cachedList = null;
      this.dragStore.dragAddInstance?.cancelDnD();
    }
    this.dragStore.reset();
  }

  willDestroy() {
    this.sortableInstance.destroy();
    this.dragStore.reset();
  }

  onUpdate(evt) {
    console.log('onUpdate');
    const {
      newDraggableIndex,
      oldDraggableIndex,
    } = evt;

    this.sync(evt, move(this.list, oldDraggableIndex, newDraggableIndex));
    this.hasUpdatedList = true;
    this.args?.onUpdate?.(evt);
  }

  onRemove(evt) {
    console.log('onRemove');
    const {
      oldDraggableIndex,
    } = evt;

    if (evt.pullMode !== 'clone') {
      this.sync(evt, removeFrom(this.list, oldDraggableIndex));
      this.hasUpdatedList = true;
    }

    this.args?.onRemove?.(evt);
  }

  onAdd(evt) {
    console.log('onAdd');
    // evt.item.remove();
    this.cachedList = [...this.list];
    this.dragStore.dragAddInstance = this;
    const {
      oldDraggableIndex,
      newDraggableIndex,
    } = evt;
    const oldItem = this.dragStore.dragStartInstance.list[oldDraggableIndex];

    this.sync(evt, insertAt(this.list, newDraggableIndex, oldItem));
    this.args?.onAdd?.(evt);
  }

  onStart(evt) {
    console.log('onStart');
    this.cachedList = [...this.list];
    this.dragStore.dragStartInstance = this;
    this.args?.onStart?.(evt);
  }

  onEnd(evt) {
    console.log('onEnd');
    if (!this.hasUpdatedList) {
      evt.item.remove();
      this.list = this.list.map((item, i) => {
        const newIdentity = { id: i +1, value: item };
        this.cachedIdentity.set(item, newIdentity);
        return newIdentity;
      });
      console.log('on end new list')

      // this.sync(evt, this.list);
    }

    this.args?.onEnd?.(evt, this.cancelDnD);
    this.hasUpdatedList = false;
  }

  sync({ item }, changedArray) {
    item.remove();
    this.list = [...changedArray];
  }

  setupEventHandlers() {
    this.#events.forEach(eventName => {
      const action = this.args[eventName];
      if (typeof action === 'function') {
        this.sortableInstance.option(eventName, bind(this, 'performExternalAction', eventName));
      }
    });
  }

  setupInternalEventHandlers() {
    this.internalEvents.forEach(eventName => {
      this.sortableInstance.option(eventName, bind(this, this[eventName]));
    });
  }

  performExternalAction(actionName, ...args) {
    this.args[actionName]?.(...args)
  }

  setOption(option, value) {
    this.sortableInstance.option(option, value);
  }
}
