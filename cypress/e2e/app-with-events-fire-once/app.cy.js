/* global describe cy before it  */
describe('App with event bus - fire once', () => {
  before(() => {
    cy.visit('app-with-event-bus-fire-once')
  })

  it('has an increment button', () => {
    cy.get('publish-button')
      .should('exist')
  })

  it('has an output count', () => {
    cy.get('subscribe-button')
      .should('have.text', 'You have clicked 0 times!')
  })

  function incrementing (expecting) {
    describe('incrementing', () => {
      before(() => {
        cy.get('publish-button button').click()
      })

      it(`increments the output count to ${expecting}`, () => {
        cy.get('subscribe-button')
          .should('have.text', 'You have clicked 1 times!')
      })
    })
  }

  [1, 2, 3, 4, 5].forEach(e => incrementing(e))
})
