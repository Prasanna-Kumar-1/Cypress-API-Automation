/// <reference types="cypress" />

describe("Check Weather Information", () => {
  it("Pass JSON Value from one request to another", () => {
    cy.request({
      method: "GET",
      url: "https://www.metaweather.com/api/location/search/?query=san",
    })
      .then((response) => {
        const city = response.body[0].title;
        return city;
      })
      .then((city) => {
        cy.request({
          method: "GET",
          url: "https://www.metaweather.com/api/location/search/?query=" + city,
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body[0]).to.have.property("title", city);
        });
      });
  });

  it("Pass JSON Array from one request to another", () => {
    cy.request({
      method: "GET",
      url: "https://www.metaweather.com/api/location/search/?query=am",
    })
      .then((response) => {
        const location = response.body;
        return location;
      })
      .then((location) => {
        for (let i = 0; i < location.length; i++) {
          cy.request({
            method: "GET",
            url:
              "https://www.metaweather.com/api/location/search/?query=" +
              location[i].title,
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0]).to.have.property(
              "title",
              location[i].title
            );
          });
        }
      });
  });
});
