import Service from '@ember/service';

export default class DragStoreService extends Service {
  dragStartInstance = null;
  dragAddInstance = null;

  reset() {
    this.dragStartInstance = null;
    this.dragAddInstance = null;
  }

}
