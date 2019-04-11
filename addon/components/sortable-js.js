import Component from '@ember/component';
import layout from '../templates/components/sortable-js';
import Sortable from 'sortablejs';

export default Component.extend({
  layout,

  classNames: ['ember-sortable-js'],

  options: null,
  events: Object.freeze([
    'onSetData',
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

  init() {
    this._super(...arguments);

    const el = this.element.firstChild;
    const defaults = {};
    const options = Object.assign({}, defaults, this.options);

    this.sortable = new Sortable(el, options);
  },
});
