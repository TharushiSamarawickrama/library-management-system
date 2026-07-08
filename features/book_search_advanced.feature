Feature: Book search

  Scenario: Student can search books by title
    Given a book "Clean Code" exists with author "Robert C. Martin" and category "Programming" and 2 available copies
    And a book "Design Patterns" exists with author "Erich Gamma" and category "Software Engineering" and 1 available copies
    And I am logged in as a student
    When I visit "/books?search=Clean"
    Then I should see "Clean Code"
    And I should not see "Design Patterns"

  Scenario: Student can search books by author
    Given a book "Clean Code" exists with author "Robert C. Martin" and category "Programming" and 2 available copies
    And a book "Design Patterns" exists with author "Erich Gamma" and category "Software Engineering" and 1 available copies
    And I am logged in as a student
    When I visit "/books?search=Robert"
    Then I should see "Clean Code"
    And I should not see "Design Patterns"

  Scenario: Student can search books by category
    Given a book "Clean Code" exists with author "Robert C. Martin" and category "Programming" and 2 available copies
    And a book "Atomic Habits" exists with author "James Clear" and category "Self Development" and 1 available copies
    And I am logged in as a student
    When I visit "/books?search=Programming"
    Then I should see "Clean Code"
    And I should not see "Atomic Habits"