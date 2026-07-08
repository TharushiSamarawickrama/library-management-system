Feature: Prevent duplicate borrow requests

  Scenario: Student cannot submit duplicate borrow request for the same book
    Given a book "Clean Code" exists with 2 available copies
    And I am logged in as a student
    And I have submitted a borrow request for "Clean Code"
    When I submit a borrow request for "Clean Code"
    Then only one borrow request should exist for me and book "Clean Code"