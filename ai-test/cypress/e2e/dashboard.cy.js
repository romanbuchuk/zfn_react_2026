describe('starter dashboard', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(window) {
        window.localStorage.setItem('react-starter-theme', 'light');
      },
    });
  });

  it('shows the dashboard and passes automated accessibility checks', () => {
    cy.findByRole('heading', { name: /good morning/i }).should('be.visible');
    cy.injectAxe();
    cy.checkA11y(null, null, (violations) => {
      cy.task(
        'log',
        JSON.stringify(
          violations.map(({ id, impact, help, nodes }) => ({
            id,
            impact,
            help,
            nodes: nodes.map(({ target, failureSummary }) => ({
              target,
              failureSummary,
            })),
          })),
          null,
          2,
        ),
      );
    });
  });

  it('filters projects and navigates between pages', () => {
    cy.findByRole('link', { name: /projects/i }).click();
    cy.findByRole('heading', { name: 'Projects' }).should('be.visible');
    cy.findByRole('searchbox', { name: /search projects/i }).type('atlas');
    cy.findByText('Atlas redesign').should('be.visible');
    cy.findByText('Mobile launch').should('not.exist');

    cy.findByRole('link', { name: /activity/i }).click();
    cy.findByRole('heading', { name: 'Activity' }).should('be.visible');
  });

  it('creates a project and persists the selected color theme', () => {
    cy.findByRole('link', { name: /projects/i }).click();
    cy.findByRole('button', { name: /new project/i }).click();
    cy.findByLabelText(/project name/i).type('Accessibility review');
    cy.findByLabelText(/project owner/i).type('Alex Morgan');
    cy.findByRole('button', { name: /create project/i }).click();
    cy.findByText('Accessibility review').should('be.visible');

    cy.findByRole('button', { name: /switch to dark theme/i }).click();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
    cy.reload();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
  });
});
