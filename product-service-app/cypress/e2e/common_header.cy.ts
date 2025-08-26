describe('Common Header', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the header with logo and navigation', () => {
    cy.get('header').should('be.visible');
    cy.contains('Product Donor').should('be.visible');
    cy.get('button[aria-label="Open search"]').should('be.visible');
    cy.get('a[aria-label="Home"]').should('be.visible');
  });

  it('opens search sidebar when search icon is clicked', () => {
    cy.get('button[aria-label="Open search"]').click();
    cy.get('[data-testid="search-sidebar"]', { timeout: 10000 }).should('be.visible');
    cy.contains('Search Products').should('be.visible');
  });

  it('closes search sidebar when close button is clicked', () => {
    cy.get('button[aria-label="Open search"]').click();
    cy.get('[data-testid="search-sidebar"]').should('be.visible');
    cy.get('button[aria-label="Close search"]').click();
    cy.get('[data-testid="search-sidebar"]').should('not.be.visible');
  });
});