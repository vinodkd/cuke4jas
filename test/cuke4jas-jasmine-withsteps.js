feature('Convert cuke spec to jasmine template', function(){
	scenario('Test basic cuke spec', function(){
		given('basic cuke spec', test_basic_cuke_spec.basic_cuke_spec);
		when('I convert it using cuke4jas', test_basic_cuke_spec.i_convert_it_using_cuke4jas);
		then('I should see jasmine template 1', test_basic_cuke_spec.i_should_see_jasmine_template_1);
		
	});
	scenario('Test cuke spec with step definitions', function(){
		given('A cuke spec with step definitions', test_cuke_spec_with_step_definitions.a_cuke_spec_with_step_definitions);
		when('I convert it using cuke4jas', test_cuke_spec_with_step_definitions.i_convert_it_using_cuke4jas);
		then('I should see a jasmine template with step definitions', test_cuke_spec_with_step_definitions.i_should_see_a_jasmine_template_with_step_definitions);
		
	});
});
