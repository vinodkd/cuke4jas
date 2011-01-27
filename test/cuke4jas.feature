Feature: Convert cuke spec to jasmine template 
  Scenario: Test basic cuke spec 
    Given basic cuke spec
    When I convert it using cuke4jas
    Then I should see jasmine template 1
