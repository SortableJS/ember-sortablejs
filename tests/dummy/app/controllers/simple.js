import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class SimpleController extends Controller {
  @tracked list = [
    { title: 'one' },
    { title: 'two' },
    { title: 'three' },
    { title: 'four' },
    { title: 'five' },
  ];
  onChoose() {
    console.log('*** Action *** - onChoose');
  }
  onUnchoose() {
    console.log('*** Action *** - onUnchoose');
  }
  onStart() {
    console.log('*** Action *** - onStart');
  }
  onEnd() {
    console.log('*** Action *** - onEnd');
  }
  onMove() {
    console.log('*** Action *** - onMove');
  }
  onUpdate() {
    console.log('*** Action *** - onUpdate');
  }
  onAdd() {
    console.log('*** Action *** - onAdd');
  }
  onRemove() {
    console.log('*** Action *** - onAdd');
  }
  onClone() {
    //_onDragStart
    console.log('*** Action *** - onClone');
  }
  onChange() {
    console.log('*** Action *** - onChange');
  }
}
