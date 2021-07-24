const { createYield } = require("typescript")

describe ("Home page test" , ()=> {
    beforeEach( () => {
        cy.fixture('courses.json').as("coursesJSON");
        cy.server();
        cy.route('/api/courses','@coursesJSON').as("rcourses");
        cy.visit('/');
    })
    it ("Should have list of courses", ()=> {

        cy.contains("All Courses");
        cy.wait('@rcourses');
        cy.get("mat-card").should("have.length",9)
    })
    it ("Should have courses under the advanced tab" ,()=> {
        cy.get('.mat-tab-label').should("have.length",2);
        cy.get('.mat-tab-label').last().click();
        cy.get('.mat-tab-body-active .mat-card-title').its('length').should('be.gt',1);
        cy.get('.mat-tab-body-active .mat-card-title').first()
        .should('contain','Angular Security Course');

    })
})