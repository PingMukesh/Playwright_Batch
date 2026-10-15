@Products
Feature: Saucedemo Product Page

  Background:
    Given I am on the Saucedemo login page
    When I enter the username as "standard_user"
    And I enter the password as "secret_sauce"
    And I click on the login button

  @ProductsTest
  Scenario: sort Products and add a product to High to Low
    When I sort the products by price high to low
    Then products should be sorted by price high to low
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should be shown as "1"

  @Checkout
  Scenario: Purchase bac from Saucedemo app successfully
    When I add "Sauce Labs Backpack" to the cart
    And I open the shopping cart
    Then I should see "Sauce Labs Backpack" in the shopping cart
    When I click on the checkout button
    And I enter the first name as "Mukesh" last name as "M" and zip code as "123456"
    And I click on checkout overview
    Then I should see the "Sauce Labs Backpack" in the checkout overview
    And the subtotal tax and total should be correct
    When I click on finish button
    Then I should see the order confirmation "Thank you for your order!"
