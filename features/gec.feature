
Feature: Open URL and Wait

    @gec_url
    Scenario: Different URL example
        Given I open the URL "https://gecgudlavalleruonlinepayments.com/"
        Then I wait for 5 seconds
        When I click the submit button using the locator "searchInput2"
        When I wait for 5 seconds
        When I enter "Hello, World!" into the input field with locator "searchInput2"
        When I wait for 5 seconds
        Then the input field with locator "searchInput2" should contain the text "Hello, World!"
        When I wait for 5 seconds
     