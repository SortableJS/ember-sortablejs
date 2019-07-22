import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  rangeValue: 0.25,

  thresholdHeight: computed('rangeValue', function () {
    return this.rangeValue * 100;
  }),

  actions: {
    setRange(sortable, evt) {
      this.set('rangeValue', evt.target.value);
      sortable.option('swapThreshold', evt.target.value);
    }
  },
});
