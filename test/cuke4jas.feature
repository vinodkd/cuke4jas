Feature: Convert cuke spec to jasmine template 
  Scenario: Test basic cuke spec 
    Given basic cuke spec
    #TODO: HACK TO AVOID NAME CLASH IN GENERATED STEP DEFN CALL. REMOVE ASAP
    When I convert it using cuke4jas1 
    Then I should see jasmine template 1

  Scenario: Test cuke spec with step definitions
    Given A cuke spec with step definitions
    #TODO: HACK TO AVOID NAME CLASH IN GENERATED STEP DEFN CALL. REMOVE ASAP
    When I convert it using cuke4jas2 
    Then I should see a jasmine template with step definitions
