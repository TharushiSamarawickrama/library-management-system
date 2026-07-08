Feature: Student access control for admin book routes

  Scenario: Student cannot open create book page
    Given I am logged in as a student
    When I visit "/books/create"
    Then I should not be allowed to access the page

  Scenario: Student cannot open edit book page
    Given a book "Clean Code" exists with 2 available copies
    And I am logged in as a student
    When I edit the book "Clean Code"
    Then I should not be allowed to access the page

  Scenario: Student cannot delete a book
    Given a book "Clean Code" exists with 2 available copies
    And I am logged in as a student
    When I delete the book "Clean Code"
    Then I should not be allowed to access the page
    And a book "Clean Code" should exist