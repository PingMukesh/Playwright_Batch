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



    @alerts
    Scenario: Handle JavaScript alerts
        Given I open the DemoQA alerts page
        When I click the alert button
        And I  accept the confirmation alert
        And I enter "Mukesh" into the prompt alert
        Then the prompt result should contain "Mukesh"

    @windows
    Scenario: open and Verify a new browser tab
        Given I open the DemoQA Browser windows page
        When I open a New browser tab
        Then the new tab should display the sample page

    @frames
    Scenario: Verify tge content inside an iframe
        Given I open the DemoQA iframe page
        Then the frame should display the sample heading


    @accordion
    Scenario: Expand the accodion section
        Given I open the accordian page
        When I expand the second section
        Then the second section should be expanded