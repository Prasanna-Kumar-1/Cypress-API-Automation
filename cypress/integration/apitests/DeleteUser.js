/// <reference types="cypress" />

describe("Implementation of POST API Test", () => {
  let accessToken =
    "0fda4235bd43cd201b75ab4cbd6fbf4ea6bf73b890ebd038bbebec3de79d34ac";
  it("Delete User Request", () => {
    // (1) first create the user using POST call
    cy.request({
      method: "POST",
      url: "https://gorest.co.in/public/v1/users",
      headers: {
        authorization: "Bearer " + accessToken,
      },
      body: {
        name: "PM Cypress",
        email: "pm.cypress@test.com",
        gender: "male",
        status: "active",
      },
    })
      .then((response) => {
        cy.log(JSON.stringify(response));
        expect(response.status).to.eq(201);
        expect(response.body.data).has.property("name", "PM Cypress");
        expect(response.body.data).has.property("email", "pm.cypress@test.com");
        expect(response.body.data).has.property("gender", "male");
        expect(response.body.data).has.property("status", "active");
      })
      .then((response) => {
        const userId = response.body.data.id;
        cy.log("User Id is: " + userId);
        // (2) Grab the user id and use it in DELETE call
        cy.request({
          method: "DELETE",
          url: "https://gorest.co.in/public/v1/users/" + userId,
          headers: {
            authorization: "Bearer " + accessToken,
          },
        }).then((response) => {
          expect(response.status).to.eq(204);
        });
      });
  });
});
