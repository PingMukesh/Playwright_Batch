Feature: Saucedemo Login
I want to login to Saucedemo application so that i can access the product page.

  Scenario: Login with Valid Credentials
    Given I am on the Saucedemo login page
    When I enter the username as "standard_user"
    And I enter the password as "secret_sauce"
    And I click on the login button
    Then I should be redirected to the product page
    And I should see the text "Products" on the page
