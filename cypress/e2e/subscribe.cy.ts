describe("Newsletter Subscribe Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("allows users to subscribe to the email list", () => {
    cy.getByData("email-input").should("be.visible").type("tom@aol.com")
    cy.getByData("submit-button").should("be.visible").click()
    cy.getByData("success-message")
      .should("be.visible")
      .should("exist")
      .contains("tom@aol.com")
  })

  it("does NOT allow an invalid email address", () => {
    cy.getByData("email-input").should("be.visible").type("tom")
    cy.getByData("submit-button").should("be.visible").click()
    cy.getByData("success-message").should("not.exist")
  })

  it("does NOT allow previously subscribed email addresses to sign up again", () => {
    cy.getByData("email-input").should("be.visible").type("john@example.com")
    cy.getByData("submit-button").should("be.visible").click()
    cy.getByData("server-error-message")
      .should("be.visible")
      .should("exist")
      .contains(
        "Error: john@example.com already exists. Please use a different email address."
      )
  })
})
