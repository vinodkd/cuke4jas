Feature: Convert cuke spec to jasmine template 
  Scenario: Test basic cuke spec 
    Given basic cuke spec
    When I convert it using cuke4jas 
    Then I should see jasmine template 1

  Scenario: Test cuke spec with step definitions
    Given A cuke spec with step definitions
    When I convert it using cuke4jas 
    Then I should see a jasmine template with step definitions
