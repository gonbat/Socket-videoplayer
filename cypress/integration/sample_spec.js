describe("The Home Page", function() {
  it("successfully loads", function() {
    cy.visit("/");
  });
});

describe("Found Play button", function() {
  it("finds it", function() {
    cy.visit("/");
    cy.get("button").should("contain", "Play");
  });
});

describe("Found Pause button", function() {
  it("finds it", function() {
    cy.visit("/");
    cy.get("button").should("contain", "Pause");
  });
});

describe("Found h1 tag and describe content", function() {
  it("finds it", function() {
    cy.visit("/");
    cy.get("h1").should("contain", "Socket Video-player");
  });
});

describe("buttons length", function() {
  it("should be two", function() {
    cy.visit("/");
    cy.get("button").should($b => {
      let buttons = $b.map((el, i) => {
        return Cypress.$(el);
      });
      buttons = buttons.get();
      expect(buttons).to.have.length(2);
    });
  });
  it("should not be five", function() {
    cy.visit("/");
    cy.get("button").should($b => {
      let buttons = $b.map((el, i) => {
        return Cypress.$(el);
      });
      buttons = buttons.get();
      expect(buttons).not.to.have.length(5);
    });
  });
});
