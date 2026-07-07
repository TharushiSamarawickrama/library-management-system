Feature: Borrow a book

  Scenario: Student successfully borrows an available book
    Given a book "Clean Code" exists with 2 available copies
    And I am logged in as a student
    When I visit "/books"
    And I click "Clean Code"
    And I press "Borrow"
    Then a borrow request should exist for me and book "Clean Code"

  Scenario: Student cannot borrow a book with no available copies
    Given a book "Clean Code" exists with 0 available copies
    And I am logged in as a student
    When I visit "/books"
    And I click "Clean Code"
    And I press "Borrow"
    Then no borrow request should exist for me and book "Clean Code"

  Scenario: Student can view borrow request status
    Given a book "Clean Code" exists with 2 available copies
    And I am logged in as a student
    And I have submitted a borrow request for "Clean Code"
    When I visit "/borrow-requests"
    Then I should see "Clean Code"
    And I should see "Pending"