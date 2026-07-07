Feature: Admin borrow request management

  Scenario: Admin can view pending borrow requests
    Given a student account exists with email "student@example.com" and password "password"
    And a book "Clean Code" exists with 2 available copies
    And the student has a pending borrow request for "Clean Code"
    And I am logged in as an admin
    When I visit "/borrow-requests"
    Then I should see "Clean Code"
    And I should see "Pending"

  Scenario: Admin can approve a borrow request
    Given a student account exists with email "student@example.com" and password "password"
    And a book "Clean Code" exists with 2 available copies
    And the student has a pending borrow request for "Clean Code"
    And I am logged in as an admin
    When I approve the borrow request for "Clean Code"
    Then the borrow request for "Clean Code" should have status "approved"
    And a borrowing record should exist for "Clean Code"
    And the available copies of "Clean Code" should be 1

  Scenario: Admin can reject a borrow request
    Given a student account exists with email "student@example.com" and password "password"
    And a book "Clean Code" exists with 2 available copies
    And the student has a pending borrow request for "Clean Code"
    And I am logged in as an admin
    When I reject the borrow request for "Clean Code"
    Then the borrow request for "Clean Code" should have status "rejected"
    And no borrowing record should exist for "Clean Code"