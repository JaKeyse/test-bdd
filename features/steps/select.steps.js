const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const apiClient = require('../../support/api-client');

When('I request products with select parameter {string}', async function (selectParam) {
  this.response = await apiClient.getProducts({ select: selectParam });
});

Then('the response should contain only {string} fields', function (fields) {
  const expectedFields = fields.split(',').map(f => f.trim());
  const products = this.response.data.products;

  products.forEach(product => {
    expect(product).to.include.all.keys(...expectedFields);
    expect(Object.keys(product)).to.have.lengthOf(expectedFields.length);
  });
});

Then('the response should return standard product structure', function () {
  const product = this.response.data.products[0];
  const expectedFields = [
    'id', 'title', 'description', 'price', 'discountPercentage',
    'rating', 'stock', 'brand', 'category', 'thumbnail', 'images'
  ];
  
  expect(product).to.include.all.keys(...expectedFields);
});

Then('the response should return all product fields', function () {
  const product = this.response.data.products[0];
  expect(Object.keys(product)).to.have.lengthOf.at.least(10);
});