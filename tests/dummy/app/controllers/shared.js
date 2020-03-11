import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class SharedController extends Controller {
  @tracked listA = [];

  onAdd() {
    console.log('*** Action *** - onAdd');
  }

  onRemove() {
    console.log('*** Action *** - onRemove');
  }

  onEnd(evt) {
    console.log('*** Action *** - onEnd', evt);
  }
}
