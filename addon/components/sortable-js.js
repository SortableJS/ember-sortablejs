import Component from '@ember/component';
import Sortable from 'sortablejs';
import { bind } from '@ember/runloop';
import layout from '../templates/components/sortable-js';
import { inject as service } from '@ember/service';

const { freeze } = Object;

export default Component.extend({
  sim: service(),
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

  init(...args) {
    this._super(...args);
    // window.addEventListener('mousemove', (evt) => {
    //   console.log('pageX', evt.pageX);
    //   console.log('pageY', evt.pageY);
    //   console.log('screenX', evt.screenX);
    //   console.log('screenY', evt.screenY);
    //   console.log('x', evt.x);
    //   console.log('y', evt.y)
    //   console.log('*****************************')
    // });
  },

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
      action(...args);
    }
  }
});
