Feature: Book search

  Scenario: Student can search books by title
    Given a book "Clean Code" exists with 2 available copies
    And a book "Design Patterns" exists with 1 available copies
    And I am logged in as a student
    When I visit "/books?search=Clean"
    Then I should see "Clean Code"
    And I should not see "Design Patterns"

  Scenario: Student can view book details
    Given a book "Clean Code" exists with 2 available copies
    And I am logged in as a student
    When I visit "/books"
    And I click "Clean Code"
    Then I should see "Clean Code"
    And I should see "Robert"