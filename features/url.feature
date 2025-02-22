
Feature: Open URL and Wait

    Scenario: Different URL example
        Given I open the URL "https://www.ebay.com/"
        Then I wait for 5 seconds

    @test_1
    Scenario: Open URL
        Given I open the URL "https://www.ebay.com/"
     #   Then I take a screenshot and add it to the report as "homepage_screenshot"

        When I wait for 5 seconds
    #    Then I take a screenshot and add it to the report as "homepage_screenshot"

        When I click the submit button using the locator "searchInput"
        When I wait for 5 seconds
        When I enter "Hello, World!" into the input field with locator "searchInput"
        When I wait for 5 seconds
        Then the input field with locator "searchInput" should contain the text "Hello, World!"
        When I wait for 5 seconds
        Then the element with locator "searchButton" should contain the text "Search"
        When I wait for 5 seconds
        Then the element with locator "searchButton" should not contain the text "Submit"

        When I click the submit button using the locator "searchButton"
        When I wait for 5 seconds
        When I scroll until the element with locator "previousPageButton" is visible
        When I wait for 5 seconds
        Then the element with locator "previousPageButton" should be visible
        When I wait for 5 seconds

#Then I should see a success message