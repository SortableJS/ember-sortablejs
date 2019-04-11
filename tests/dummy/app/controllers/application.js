import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
  actionStack: null,

  init() {
    this._super(...arguments);
    this.set('actionStack', A([]));
  },

  actions: {
    trigger(actionName) {

      if (actionName === 'onChoose') {
        this.set('actionStack', A([]));
      }

      this.get('actionStack').pushObject(actionName);
    }
  }
});
