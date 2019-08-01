import Component from '@ember/component';
import Sortable from 'sortablejs';
import { bind } from '@ember/runloop';
import diffAttrs from 'ember-diff-attrs';
import layout from '../templates/components/sortable-js';

const { freeze } = Object;

export default Component.extend({
  layout,

  classNames: ['ember-sortable-js'],

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
    'scrollFn',
    'onSetData',
    'setData',
    'onFilter',
  ]),

  didReceiveAttrs: diffAttrs('options', function(changedAttrs, ...args) {
    this._super(...args);
    if(changedAttrs && changedAttrs.options) {
      const options = changedAttrs.options.pop();
      for (let [key, value] of Object.entries(options)) {
        console.log('setting options', key, value);
        this.setOptions(key, value);
      }
    }
  }),

  didInsertElement() {
    this._super(...arguments);

    const el = this.element.firstElementChild;
    const defaults = {};
    const options = Object.assign({}, defaults, this.options);

    this.sortable = Sortable.create(el, options);
    this.setupEventHandlers();
  },

  willDestroyElement() {
    this.sortable.destroy();
    this._super(...arguments);
  },

  setupEventHandlers() {
    this.events.forEach(eventName => {
      const action = this[eventName];
      if (typeof action === 'function') {
        this.sortable.option(eventName, bind(this, 'performExternalAction', eventName));
      }
    });
  },

  performExternalAction(actionName, ...args) {
    let action = this[actionName];

    action = (action === 'onSetData') ? 'setData' : action;

    if (typeof action === 'function') {
      action(...args, this.sortable);
    }
  },

  setOptions(option, value) {
    this.sortable.option(option, value);
  },
});
