Feature: Borrowings

  Scenario: Admin can view current borrowings
    Given a student account exists with email "student@example.com" and password "password"
    And a book "Clean Code" exists with 1 available copies
    And the student has borrowed "Clean Code"
    And I am logged in as an admin
    When I visit "/borrowings"
    Then I should see "Clean Code"
    And I should see "Borrowed"

  Scenario: Admin can mark a borrowed book as returned
    Given a student account exists with email "student@example.com" and password "password"
    And a book "Clean Code" exists with 1 available copies
    And the student has borrowed "Clean Code"
    And I am logged in as an admin
    When I mark the borrowing for "Clean Code" as returned
    Then the borrowing for "Clean Code" should have status "returned"
    And the available copies of "Clean Code" should be 2