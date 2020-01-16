import Controller from '@ember/controller';

export default class SharedController extends Controller {
  onAdd() {
    console.log('*** Action *** - onAdd');
  }

  onRemove() {
    console.log('*** Action *** - onRemove');
  }
}
