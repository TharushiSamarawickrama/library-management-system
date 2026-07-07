Feature: Access control

  Scenario: Guest cannot access books page
    Given I am a guest
    When I visit "/books"
    Then I should be redirected to "/login"

  Scenario: Guest cannot access borrow requests page
    Given I am a guest
    When I visit "/borrow-requests"
    Then I should be redirected to "/login"

  Scenario: Student cannot open create book page
    Given I am logged in as a student
    When I visit "/books/create"
    Then I should not be allowed to access the page

  Scenario: Student cannot access admin borrowings page
    Given I am logged in as a student
    When I visit "/borrowings"
    Then I should not be allowed to access the page

  Scenario: Admin can access admin pages
    Given I am logged in as an admin
    When I visit "/borrowings"
    Then the response status should be 200
    