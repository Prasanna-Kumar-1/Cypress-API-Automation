/// <reference types="cypress" />

describe("Implementation of GET API Test", () => {
  let accessToken =
    "0fda4235bd43cd201b75ab4cbd6fbf4ea6bf73b890ebd038bbebec3de79d34ac";
  it("Get all the Users Test", () => {
    cy.request({
      method: "GET",
      url: "https://gorest.co.in/public/v1/users",
      headers: {
        authorization: "Bearer " + accessToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.meta.pagination.limit).to.eq(20);
    });
  });

  it("Get the User by Id Test", () => {
    cy.request({
      method: "GET",
      url: "https://gorest.co.in/public/v1/users/33",
      headers: {
        authorization: "Bearer " + accessToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.name).to.eq("Prof. Anjushri Iyer");
      expect(response.body.data.gender).to.eq("female");
    });
  });
});
