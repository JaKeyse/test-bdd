const { setWorldConstructor } = require('@cucumber/cucumber');

function World() {
  this.initialProductsCount = 0;
}

setWorldConstructor(World);