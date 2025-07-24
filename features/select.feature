Feature: Product selection functionality

  Scenario: Select specific fields from products
    When I request products with select parameter "title,price"
    Then the response should contain only "title" and "price" fields

  Scenario: Select single field
    When I request products with select parameter "brand"
    Then the response should contain only "brand" field

  Scenario: Invalid select parameter
    When I request products with select parameter "invalid_field"
    Then the response should return standard product structure

  Scenario: Empty select parameter
    When I request products with select parameter ""
    Then the response should return all product fields