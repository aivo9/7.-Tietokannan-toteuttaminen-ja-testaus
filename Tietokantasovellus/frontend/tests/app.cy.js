describe('Tietokantasovellus E2E-testi', () => {
  it('näyttää otsikon ja lisää uuden tietueen oletusarvolla 1', () => {
    cy.visit('http://localhost:5173');
    cy.contains('SQLite CRUD -sovellus');

    cy.get('input[placeholder="Nimi"]').type('Testituote');
    cy.get('input[placeholder="Kuvaus"]').type('Testikappale');

    cy.get('button').contains('Lisää').should('be.visible').click();

    cy.wait(1000);

    cy.contains('Testituote (1) - Testikappale').should('exist');
  });
});