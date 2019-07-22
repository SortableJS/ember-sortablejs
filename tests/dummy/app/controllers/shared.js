import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onAdd() {
      console.log('*** Action *** - onAdd');
    },
    onRemove() {
      console.log('*** Action *** - onRemove');
    },
  }
});
