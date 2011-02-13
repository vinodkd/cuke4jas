feature('Convert cuke spec to jasmine template', function(){
  var cukescript1, expected_jasscript1, actual_jasscript1;
    beforeEach(function() {
      this.addMatchers({
        toHaveItems: function() { 
            this.message = function() {
              return [
                "Expected \"" + this.actual.description + "\" to have at least 1 validation. Add validations using matchers",
              ];
            };
            return this.actual.getItems().length > 0 ; 
        }
      });
    });

    scenario('Test basic cuke spec', function(){
        given('basic cuke spec', function(){
          cukescript1='Feature: Convert cuke spec to jasmine template \r\n  Scenario: Test basic cuke spec \r\n    Given basic cuke spec\r\n    When I convert it using cuke4jas\r\n    Then I should see jasmine template 1\r\n';	
        });
        when('I convert it using cuke4jas', function(){
          actual_jasscript1=toJasmine(cukescript1);
        });
        then('I should see jasmine template 1', function(){
          expected_jasscript1="feature('Convert cuke spec to jasmine template', function(){\n	scenario('Test basic cuke spec', function(){\n		given('basic cuke spec', function(){\n		});\n		when('I convert it using cuke4jas', function(){\n		});\n		then('I should see jasmine template 1', function(){\n		});\n		\n	});\n});"
          expect(actual_jasscript1).toEqual(expected_jasscript1);
        });
        
    });

	scenario('Test cuke spec with step definitions', function(){
		given('A cuke spec with step definitions', function(){
          cukescript1='Feature: Convert cuke spec to jasmine template \n Scenario: Test cuke spec with step definitions\n    Given A cuke spec with step definitions\n    When I convert it using cuke4jas\n    Then I should see a jasmine template with step definitions\n';	
		});
		when('I convert it using cuke4jas', function(){
          actual_jasscript1=toJasmine(cukescript1,true);
          // not the best possible way, but the easiest to debug string output similarity.
          //alert(actual_jasscript1);
		});
		then('I should see a jasmine template with step definitions', function(){
          expected_jasscript1="feature('Convert cuke spec to jasmine template', function(){\n\tscenario('Test cuke spec with step definitions', function(){\n\t\tgiven('A cuke spec with step definitions', a_cuke_spec_with_step_definitions);\n\t\twhen('I convert it using cuke4jas', i_convert_it_using_cuke4jas);\n\t\tthen('I should see a jasmine template with step definitions', i_should_see_a_jasmine_template_with_step_definitions);\n\t\t\n\t});\n});";
          expect(actual_jasscript1).toEqual(expected_jasscript1);
		});
        
    });

    afterEach(function(){
        expect(this.results()).toHaveItems();
    });

});

