Feature: Book management

  Scenario: Admin can open books page
    Given I am logged in as an admin
    When I visit "/books"
    Then the response status should be 200
    And I should see "Books"

  Scenario: Admin can create a new book
    Given I am logged in as an admin
    When I visit "/books/create"
    And I fill in "Title" with "Clean Code"
    And I fill in "Author" with "Robert C. Martin"
    And I fill in "ISBN" with "9780132350884"
    And I fill in "Category" with "Programming"
    And I fill in "Available Copies" with "2"
    And I press "Save Book"
    Then a book "Clean Code" should exist
    And the available copies of "Clean Code" should be 2

  Scenario: Admin can update a book
    Given I am logged in as an admin
    And a book "Clean Code" exists with 2 available copies
    When I edit the book "Clean Code"
    And I fill in "Title" with "Clean Code Second Edition"
    And I press "Update Book"
    Then a book "Clean Code Second Edition" should exist

  Scenario: Admin can delete a book
    Given I am logged in as an admin
    And a book "Clean Code" exists with 2 available copies
    When I delete the book "Clean Code"
    Then a book "Clean Code" should not exist