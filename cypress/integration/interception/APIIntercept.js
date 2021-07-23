/// <reference types="Cypress" />

describe("Implementation of Intercept concept", () => {
  it("Test API with Intercept Stubbing", () => {
    cy.visit("https://jsonplaceholder.typicode.com/");

    cy.intercept({
      path: "/posts",
    }).as("posts");

    cy.get("table:nth-of-type(1) a[href='/posts']").click();
    cy.wait("@posts").then((inter) => {
      cy.log(JSON.stringify(inter));
      console.log(JSON.stringify(inter));
      expect(inter.response.body).to.have.length(100);
    });
  });

  it("Mock the Intercept using Static response", () => {
    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.intercept("GET", "/posts", {
      totalpost: 5,
      name: "Prasanna Mallisetty",
    }).as("posts");
    cy.get("table:nth-of-type(1) a[href='/posts']").click();
    cy.wait("@posts");
  });

  it("Mock the Intercept using Dynamic fixture", () => {
    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.intercept("GET", "/posts", { fixture: "testdata.json" }).as("posts");
    cy.get("table:nth-of-type(1) a[href='/posts']").click();
    cy.wait("@posts");
  });

  it("Mock the Intercept using Dynamic fixture json", () => {
    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.intercept("GET", "/posts", (req) => {
      req.reply((res) => {
        res.send({ fixture: "testdata.json" });
      });
    });
  });
});
