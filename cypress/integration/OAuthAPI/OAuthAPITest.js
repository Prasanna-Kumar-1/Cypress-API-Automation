/// <reference types="Cypress" />

describe("OAuth API Test", () => {
  let access_token = "";
  let userId = "";

  before("Generate refresh token", () => {
    // (1) First hit the API using POST call to get the Oauth Token
    cy.request({
      method: "POST",
      url: "/token",
      form: true, //this is form based API Request hence setting it to true
      body: {
        client_id: "CypressOAuthTest",
        client_secret: "f16c1f4b1917226c952f9b8efa9edce0",
        grant_type: "client_credentials",
      },
    }).then((Response) => {
      cy.log(JSON.stringify(Response));
      cy.log(Response.body.access_token);
      access_token = Response.body.access_token;

      //(2) Grab the User Id using GET call

      cy.request({
        method: "GET",
        url: "/api/me",
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }).then((Response) => {
        userId = Response.body.id;
        cy.log("User ID is : " + userId);
      });
    });
  });

  it("Unlock the Barn Test", () => {
    cy.request({
      method: "POST",
      url: "/api/" + userId + "/barn-unlock",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }).then((response) => {
      cy.log(JSON.stringify(response));
      expect(response.status).to.equal(200);
    });
  });

  it("Put the Toilet Seat Down Test", () => {
    cy.request({
      method: "POST",
      url: "/api/" + userId + "/toiletseat-down",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }).then((response) => {
      cy.log(JSON.stringify(response));
      expect(response.status).to.equal(200);
    });

    it("Chicekn Feed Test", () => {
      cy.request({
        method: "POST",
        url: "/api/" + userId + "/chickens-feed",
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }).then((response) => {
        cy.log(JSON.stringify(response));
        expect(response.status).to.equal(200);
      });
    });
  });
});
