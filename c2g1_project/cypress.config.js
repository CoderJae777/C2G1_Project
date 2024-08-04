const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    // all URL will start with this, so when you use cy.visit just type the route page
    baseUrl: "http://localhost:3000",
    viewportWidth: 1600,
    viewportHeight: 1000,
  },
});
