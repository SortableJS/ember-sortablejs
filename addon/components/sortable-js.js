import Component from '@ember/component';
import Sortable from 'sortablejs';
import { bind } from '@ember/runloop';
import layout from '../templates/components/sortable-js';

const { freeze } = Object;

export default Component.extend({
  layout,

  classNames: ['ember-sortable-js'],

  // 'onSetData',
  // 'scrollFn',
  options: null,
  events: freeze([
    'onChoose',
    'onUnchoose',
    'onStart',
    'onEnd',
    'onAdd',
    'onUpdate',
    'onSort',
    'onRemove',
    'onMove',
    'onClone',
    'onChange',
  ]),

  didInsertElement() {
    this._super(...arguments);

    const el = this.element.firstElementChild;
    const defaults = {};
    const options = Object.assign({}, defaults, this.options);

    this.sortable = Sortable.create(el, options);
    this.setupEventHandlers();
  },

  setupEventHandlers() {
    this.events.forEach(eventName => this.sortable.option(eventName, bind(this, 'performExternalAction', eventName)));
  },

  performExternalAction(actionName, ...args) {
    const action = this[this.events[actionName]];

    if (typeof action === 'function') {
      action(...args);
    }
  }
});
