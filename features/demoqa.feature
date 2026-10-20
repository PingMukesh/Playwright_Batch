@demoqa
Feature: DemoQA Browser Interactions

    @mouse
    Scenario: Handle double-click and right-click
        Given I open the DemoQA buttons page
        When I double-click the button
        Then the double-click message should be displayed
        When I right-click the button
        Then the right-click message should be displayed

    @keyboard
    Scenario: Enter and replace text using keyboard actions
        Given I open the DemoQA text box page
        When I enter "Playwright Candidate" using the keyboard
        And I replace the name with "Automation Engineer"
        And I submit the text box
        Then the submitted name should be "Automation Engineer"