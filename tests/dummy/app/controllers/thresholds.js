import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ThresholdsController extends Controller {
  @tracked rangeValue = 0.25;

  get thresholdHeight() {
    return this.rangeValue * 100;
  }

  @action
  setRange(sortable, evt) {
    this.set('rangeValue', evt.target.value);
    sortable.option('swapThreshold', evt.target.value);
  }
}
