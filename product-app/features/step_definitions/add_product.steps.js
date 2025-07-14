const { Given, When, Then } = require('@cucumber/cucumber');
const chai = require('chai');
const expect = chai.expect;

let productForm;
let productsList;

Given('пользователь находится на странице добавления продукта', async function() {
  // Здесь код для перехода на страницу добавления продукта
  productForm = await page.getProductForm();
});

When('он заполняет форму следующими данными:', async function(table) {
  const data = table.hashes()[0];
  await productForm.fillForm(data.название, data.цена, data.категория);
});

When('он пытается добавить продукт без заполнения формы', async function() {
  await productForm.submit();
});

Then('продукт должен быть успешно добавлен', async function() {
  const successMessage = await productForm.getSuccessMessage();
  expect(successMessage).to.contain('Продукт успешно добавлен');
});

Then('в списке продуктов должен появиться новый продукт', async function() {
  productsList = await page.getProductsList();
  const newProduct = await productsList.getLastProduct();
  expect(newProduct.name).to.exist;
});

Then('должно появиться сообщение об ошибке', async function() {
  const errorMessage = await productForm.getErrorMessage();
  expect(errorMessage).to.exist;
});

Then('продукт не должен быть добавлен', async function() {
  const productsCount = await productsList.getProductsCount();
  expect(productsCount).to.equal(initialProductsCount);
});