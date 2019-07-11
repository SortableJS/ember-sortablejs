import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onAdd(evt) {
      console.log('*** Action *** - onAdd');
    },
    onRemove(evt) {
      console.log('*** Action *** - onRemove');
    },
  }
});
