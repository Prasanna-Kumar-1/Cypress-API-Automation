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

    cy.fixture("testdata").then((data) => {
      cy.request({
        method: "POST",
        url: "https://gorest.co.in/public/v1/users",
        headers: {
          authorization: "Bearer " + accessToken,
        },
        body: {
          name: data.name,
          email: testMail,
          gender: data.gender,
          status: data.status,
        },
      })
        .then((response) => {
          cy.log(JSON.stringify(response));
          expect(response.status).to.eq(201);
          expect(response.body.data).has.property("email", testMail);
          expect(response.body.data).has.property("name", data.name);
          expect(response.body.data).has.property("gender", data.gender);
          expect(response.body.data).has.property("status", data.status);
        })
        .then((response) => {
          const userId = response.body.data.id;
          cy.log("User Id is: " + userId);

          cy.request({
            method: "GET",
            url: "https://gorest.co.in/public/v1/users/" + userId,
            headers: {
              authorization: "Bearer " + accessToken,
            },
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).has.property("id", userId);
            expect(response.body.data).has.property("email", testMail);
            expect(response.body.data).has.property("name", data.name);
            expect(response.body.data).has.property("gender", data.gender);
            expect(response.body.data).has.property("status", data.status);
          });
        });
    });
  });
});
