/// <reference types="cypress" />

describe("Implementation of POST API Test", () => {
  let accessToken =
    "0fda4235bd43cd201b75ab4cbd6fbf4ea6bf73b890ebd038bbebec3de79d34ac";
  let randomText = "";
  let testMail = "";
  it("Post User Request", () => {
    var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 10; i++) {
      randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
      testMail = randomText + "@gmail.com";
    }
    // (1) Create User
    cy.request({
      method: "POST",
      url: "https://gorest.co.in/public/v1/users",
      headers: {
        authorization: "Bearer " + accessToken,
      },
      body: {
        name: "Prasanna Mallisetty4",
        email: "prasanna.mallisetty4@test.com",
        gender: "female",
        status: "inactive",
      },
    })
      .then((response) => {
        cy.log(JSON.stringify(response));
        expect(response.status).to.eq(201);
        expect(response.body.data).has.property(
          "email",
          "prasanna.mallisetty4@test.com"
        );
        expect(response.body.data).has.property("name", "Prasanna Mallisetty4");
        expect(response.body.data).has.property("gender", "female");
        expect(response.body.data).has.property("status", "inactive");
      })
      .then((response) => {
        const userId = response.body.data.id;
        cy.log("User Id is: " + userId);
        // (2) Post(Update) User
        cy.request({
          method: "PUT",
          url: "https://gorest.co.in/public/v1/users/" + userId,
          headers: {
            authorization: "Bearer " + accessToken,
          },
          // Updated Body
          body: {
            name: "Prasanna Mallisetty New4",
            email: "prasanna.mallisettyNew4@test.com",
            gender: "male",
            status: "active",
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data).has.property(
            "email",
            "prasanna.mallisettyNew4@test.com"
          );
          expect(response.body.data).has.property(
            "name",
            "Prasanna Mallisetty New4"
          );
          expect(response.body.data).has.property("gender", "male");
          expect(response.body.data).has.property("status", "active");
        });
      });
  });
});
