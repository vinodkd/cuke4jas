//#TODO: MOVE ALL STEP FUNCTIONS INTO THEIR OWN NAMESPACE. NAME CLASH IN GENERATED STEP DEFN CALL CURRENTLY WORKED AROUND BY HARD CODING A UNIQUE SUFFIX.
function basic_cuke_spec(){
  cukescript1='Feature: Convert cuke spec to jasmine template \r\n  Scenario: Test basic cuke spec \r\nGiven basic cuke spec\r\nWhen I convert it using cuke4jas\r\nThen I should see jasmine template 1\r\n';	
}

function i_convert_it_using_cuke4jas1(){
  actual_jasscript1=cuke4jas.toJasmine(cukescript1);
  // not the best possible way, but the easiest to debug string output similarity.
  //alert(actual_jasscript1);
}


function i_should_see_jasmine_template_1(){
  expected_jasscript1="feature('Convert cuke spec to jasmine template', function(){\n	scenario('Test basic cuke spec', function(){\n		given('basic cuke spec', function(){\n		});\n		when('I convert it using cuke4jas', function(){\n		});\n		then('I should see jasmine template 1', function(){\n		});\n		\n	});\n});"
  expect(actual_jasscript1).toEqual(expected_jasscript1);
}

// i had to build this after string comparisons took a lot of time
function printChars(str){
  var outp=str.length + ':';
  for(var i=0;i<str.length;i++){
outp += str.charAt(i) + ',';
  }
}

function a_cuke_spec_with_step_definitions(){
  cukescript2='Feature: Convert cuke spec to jasmine template \n Scenario: Test cuke spec with step definitions\nGiven A cuke spec with step definitions\nWhen I convert it using cuke4jas\nThen I should see a jasmine template with step definitions\n';	
}
function i_convert_it_using_cuke4jas2(){
  actual_jasscript2=cuke4jas.toJasmine(cukescript1,true);
  // not the best possible way, but the easiest to debug string output similarity.
  // alert(actual_jasscript1);
}
function i_should_see_a_jasmine_template_with_step_definitions(){
  // had to go through a lot of trouble to get this string to work. key point: converter adds a new line with 2 tabs at the of the feature close brace
  expected_jasscript2="feature('Convert cuke spec to jasmine template', function(){\n\tscenario('Test cuke spec with step definitions', function(){\n\t\tgiven('A cuke spec with step definitions', a_cuke_spec_with_step_definitions);\n\t\twhen('I convert it using cuke4jas', i_convert_it_using_cuke4jas);\n\t\tthen('I should see a jasmine template with step definitions', i_should_see_a_jasmine_template_with_step_definitions);\n\t\t\n\t});\n});";
  //console.log((expected_jasscript2));
  //console.log((actual_jasscript2));
  expect(printChars(actual_jasscript2)).toEqual(printChars(expected_jasscript2));
}
