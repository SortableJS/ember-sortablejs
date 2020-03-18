describe('Ember SortableJS ', function() {
  it('renders a list', function() {
    const initial = ['one', 'two', 'three', 'four', 'five'];

    cy.visit('http://localhost:4200/simple');

    cy
      .get('div[data-list-item]')
      .should(($divs) => {
        expect($divs).to.have.length(5);

        const renderedList = $divs.map((i, el) => el.innerText);

        expect(renderedList.get()).to.deep.eq(initial);
      });
  });

  it('reorders as list from top to bottom', function() {
    const sorted = ['two', 'three', 'four', 'five', 'one'];

    cy.visit('http://localhost:4200/simple');
    cy.get('div[data-list-item="0"').drag('div[data-list-item="4"', { force: true, position: 'bottom' })

    cy
      .get('div[data-list-item]')
      .should(($divs) => {
        expect($divs).to.have.length(5);

        const renderedList = $divs.map((i, el) => el.innerText);

        expect(renderedList.get()).to.deep.eq(sorted);
      });
  });

  it('reorders a list bottom to top', function() {
    const sorted = ['five', 'one', 'two', 'three', 'four'];

    cy.visit('http://localhost:4200/simple');
    cy.get('div[data-list-item="4"').drag('div[data-list-item="0"', { force: true, position: 'center' })

    cy
      .get('div[data-list-item]')
      .should(($divs) => {
        expect($divs).to.have.length(5);

        const renderedList = $divs.map((i, el) => el.innerText);

        expect(renderedList.get()).to.deep.eq(sorted);
      });
  });

  it('adds an item from one list to another', function() {
    cy.visit('http://localhost:4200/shared');
    cy.get('.list-a > div[data-list-item="0"').drag('.list-b > div[data-list-item="1"', { force: true, position: 'top' });

    const listA = ['Jaden', 'Gustavo'];
    const listB = ['Lance', 'Luis', 'Britni', 'Kelly'];

    cy
      .get('.list-a > div[data-list-item]')
      .should(($divs) => {
        expect($divs).to.have.length(2);

        const renderedList = $divs.map((i, el) => el.innerText);

        expect(renderedList.get()).to.deep.eq(listA);
      });

      cy
      .get('.list-b > div[data-list-item]')
      .should(($divs) => {
        expect($divs).to.have.length(4);

        const renderedList = $divs.map((i, el) => el.innerText);

        expect(renderedList.get()).to.deep.eq(listB);
      });
  });
});
