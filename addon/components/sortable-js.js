import Component from '@glimmer/component';
import Sortable from 'sortablejs';
import { bind } from '@ember/runloop';
import { action } from '@ember/object';

const { freeze } = Object;

export default class SortableJsComponent extends Component {
  sortable = null;

  events = freeze([
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
  ]);

  get wraps() {
    return this.args.wraps || false;
  }

  @action
  setOptions() {
    for (let [key, value] of Object.entries(this.args.options)) {
      this.setOption(key, value);
    }
  }

  @action
  didInsert(element) {
    const el = this.wraps ? element : element.firstElementChild;
    const defaults = {};
    const options = Object.assign({}, defaults, this.args.options);

    this.sortable = Sortable.create(el, options);
    this.setupEventHandlers();
    this.setOptions();
  }

  willDestroy() {
    this.sortable.destroy();
  }

  setupEventHandlers() {
    this.events.forEach(eventName => {
      const action = this.args[eventName];
      if (typeof action === 'function') {
        this.sortable.option(eventName, bind(this, 'performExternalAction', eventName));
      }
    });
  }

  performExternalAction(actionName, ...args) {
    let action = this.args[actionName];

    action = (action === 'onSetData') ? 'setData' : action;

    if (typeof action === 'function') {
      action(...args, this.sortable);
    }
  }

  setOption(option, value) {
    console.log('setting option: ', option, value);
    this.sortable.option(option, value);
  }
}
