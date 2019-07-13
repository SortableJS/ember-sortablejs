import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onClone(evt) {
      console.log('*** Action *** - onClone');
    },
  }
});
