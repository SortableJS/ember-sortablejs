import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

class Employee {
  @tracked id;
  @tracked name;
  @tracked type;

  constructor(id, { name, type }) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}

export default class SharedController extends Controller {
  @tracked list = [];
  @tracked devSort = [1, 2, 3];
  @tracked pmSort = [1, 2, 3];

  constructor() {
    super(...arguments);
    const all = [
      { name: 'Luis', type: 'dev' },
      { name: 'Jaden', type: 'dev' },
      { name: 'Gustavo', type: 'dev' },
      { name: 'Lance', type: 'pm' },
      { name: 'Britni', type: 'pm' },
      { name: 'Kelly', type: 'pm' }
    ];
    this.list = all.map((person, i) => new Employee(i += 1, person));
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

  onSort(evt, list) {
    console.log(`*** Action *** - onSort list ${list}`, evt);
  }

  onAdd(evt, list) {
    console.log(`*** Action *** - onAdd list ${list}`, evt);
  }

  onRemove(evt, list) {
    console.log(`*** Action *** - onRemove list ${list}`, evt);
  }

  onEnd(evt, list) {
    console.log(`*** Action *** - onEnd list ${list}`, evt);
  }
}
