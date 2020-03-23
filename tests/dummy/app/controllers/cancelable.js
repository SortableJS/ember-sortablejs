import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

class Employee {
  @tracked sort;
  @tracked name;
  @tracked type;
  @tracked img;
  id;

  constructor(sort, { name, type, id, img}) {
    this.id = id;
    this.sort = sort;
    this.name = name;
    this.type = type;
    this.img = img;
  }
}

export default class CancelableController extends Controller {
  @tracked list = [];
  @tracked devSort = [1, 2, 3];
  @tracked pmSort = [1, 2, 3];
  @tracked cancelCB = null;

  constructor() {
    super(...arguments);
    setTimeout(() => {
      const all = [
        { id: 1, name: 'Luis', type: 'dev', img: 'https://api.adorable.io/avatars/25/luis' },
        { id: 2, name: 'Jaden', type: 'dev', img: 'https://api.adorable.io/avatars/25/jaden' },
        { id: 3, name: 'Gustavo', type: 'dev', img: 'https://api.adorable.io/avatars/25/gustavo' },
        { id: 4 ,name: 'Lance', type: 'pm', img: 'https://api.adorable.io/avatars/25/lance' },
        { id: 5, name: 'Britni', type: 'pm', img: 'https://api.adorable.io/avatars/25/britni' },
        { id: 6, name: 'Kelly', type: 'pm', img: 'https://api.adorable.io/avatars/25/kelly' }
      ];
      this.list = all.map((person, i) => new Employee(i += 1, person));
    }, 5000);
  }

  get devList() {
    return this.list.filter(employee => employee.type === 'dev');
  }

  get sortedDevList() {
    return [...this.devList].sort((a, b) => a.id - b.id);
  }

  get pmList() {
    return this.list.filter(employee => employee.type === 'pm');
  }

  get sortedPmList() {
    return [...this.pmList].sort((a, b) => a.id - b.id);
  }

  onSort(list, evt) {
    console.log(`*** Action *** - onSort list ${list}`, evt);
  }

  onAdd(list, evt) {
    console.log(`*** Action *** - onAdd list ${list}`, evt);
  }

  onRemove(list, evt) {
    console.log(`*** Action *** - onRemove list ${list}`, evt);
  }

  @action
  onEnd(list, evt, cancelCB) {
    console.log('args log', arguments[0]);
    console.log('args log', arguments[1]);
    console.log('args log', arguments[2]);
    this.cancelCB = cancelCB;
    console.log(`*** Action *** - onEnd list ${list}`, evt);
  }

  @action
  cancelDrag() {
    this.cancelCB?.();
    this.cancelCB = null;
  }
}
