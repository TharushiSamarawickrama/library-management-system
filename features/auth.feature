Feature: Authentication

  Scenario: Login page opens successfully
    When I visit "/login"
    Then the response status should be 200

  Scenario: Student login succeeds with correct credentials
    Given a student account exists with email "student@example.com" and password "password"
    When I login as "student@example.com" with password "password"
    Then the response status should be 302

  Scenario: Admin login succeeds with correct credentials
    Given an admin account exists with email "admin@example.com" and password "password"
    When I login as "admin@example.com" with password "password"
    Then the response status should be 302

  Scenario: Login fails with incorrect password
    Given a student account exists with email "student@example.com" and password "password"
    When I login as "student@example.com" with password "wrongpassword"
    Then I should see "These credentials do not match our records"

  Scenario: Guest cannot access dashboard
    When I visit "/dashboard"
    Then the response status should be 302