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

  get mappedList() {
    return this.list.map((item) => this.cachedIdentity.get(item));
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
    this.args.items?.forEach((item) => {
      const isObject = item && (typeof item === 'object');

      if (!isObject) throw new TypeError('Item is not an Object');

      if (!this.cachedIdentity.has(item)) {
        this.setIdentity(item);
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
    if (this.isDestroying || this.isDestroyed) return;
    this.sortableInstance.destroy();
    this.dragStore.reset();
  }

  onUpdate(evt) {
    const {
      newIndex,
      oldIndex,
    } = evt;

    [this.list[oldIndex], this.list[newIndex]].forEach((item) => this.setIdentity(item));

    this.sync(evt, move(this.list, oldIndex, newIndex));
    this.hasUpdatedList = true;
    this.args?.onUpdate?.(evt);
  }

  onRemove(evt) {
    const {
      oldIndex,
    } = evt;

    if (evt.pullMode !== 'clone') {
      this.sync(evt, removeFrom(this.list, oldIndex));
      this.hasUpdatedList = true;
    }

    this.args?.onRemove?.(evt);
  }

  onAdd(evt) {
    evt.item.remove();
    this.cachedList = [...this.list];
    this.dragStore.dragAddInstance = this;
    const {
      oldIndex,
      newIndex,
    } = evt;

    const oldItem = this.dragStore.dragStartInstance.list[oldIndex];

    this.setIdentity(oldItem);

    this.sync(evt, insertAt(this.list, newIndex, oldItem));
    this.args?.onAdd?.(evt);
  }

  onStart(evt) {
    this.cachedList = [...this.list];
    this.dragStore.dragStartInstance = this;
    this.args?.onStart?.(evt);
  }

  onEnd(evt) {
    if (!this.hasUpdatedList) {
      evt.item.remove();
      this.list = this.list.map((item) => {
        this.setIdentity(item);
        return item;
      });

      this.sync(evt, this.list);
    }

    this.args?.onEnd?.(evt, this.cancelDnD);
    this.hasUpdatedList = false;
  }

  setIdentity(obj) {
    if (obj && (typeof obj === 'object')) {
      this.cachedIdentity.set(obj, { value: obj });
    }
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
