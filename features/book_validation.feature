Feature: Book validation

  Scenario: Admin cannot create a book without title
    Given I am logged in as an admin
    When I visit "/books/create"
    And I fill in "Title" with ""
    And I fill in "Author" with "Robert C. Martin"
    And I fill in "ISBN" with "9780132350884"
    And I fill in "Category" with "Programming"
    And I fill in "Available Copies" with "2"
    And I press "Save Book"
    Then I should see "The title field is required"
    And a book "" should not exist

  Scenario: Admin cannot create a book with invalid ISBN
    Given I am logged in as an admin
    When I visit "/books/create"
    And I fill in "Title" with "Clean Code"
    And I fill in "Author" with "Robert C. Martin"
    And I fill in "ISBN" with "abc"
    And I fill in "Category" with "Programming"
    And I fill in "Available Copies" with "2"
    And I press "Save Book"
    Then I should see "The ISBN format is invalid"
    And a book "Clean Code" should not exist

  Scenario: Admin cannot create a book with negative available copies
    Given I am logged in as an admin
    When I visit "/books/create"
    And I fill in "Title" with "Clean Code"
    And I fill in "Author" with "Robert C. Martin"
    And I fill in "ISBN" with "9780132350884"
    And I fill in "Category" with "Programming"
    And I fill in "Available Copies" with "-1"
    And I press "Save Book"
    Then I should see "The available copies must be at least 0"
    And a book "Clean Code" should not exist