cuke4jas
=========
cuke4jas enhances [jasmine - the javascript bdd framework](http://pivotal.github.com/jasmine/) - to support cucumber-style plain text feature specifications. It should be used along with [the jasmine-species add-on to jasmine](http://rudylattae.github.com/jasmine-species/).

It can be used in two modes:

- As a tool to convert a cucumber style feature specification into a blank jasmine template
- As an addon that dynamically converts a cuke-style specification into a jasmine-style one, given cuke-style step definitions written in javascript

Using cuke4jas as a tool to start off your cuke-jasmine bdd spec
---------------------------------------------------------------
    convert[.bat] [-s] input.feature output.js
      -s outputs a jasmine spec that uses step definitions for the GWT steps
    
the .bat is if you want to run the converter in windows. I've found, however, that Portable Git provides a sufficiently capable bash under Windows to negate need for this.
    
Using cuke4jas directly in jasmine with step definitions
----------------------------------------------------------
* copy the entire contents of cuke4jas/test into your project's test folder. This will bring in jasmine, namespace and jasmine-species.
* write your cucumber spec into test/features
* create step definitions as javascript functions. put them in js files under test/steps.
* use the cuke4jas specrunner.html. This does the following:
  * import jasmine
  * import namespace required by jasmine-species
  * import jasmine-species
  * import cuke4jas
  * wire up onload() so jasmine.execute() is called
* import the step definitions file into the cuke4jas specrunner.html.
* load up the feature file, and pass it to cuke4jas by defining a link element with the location of the feature spec as its href. 
  * it now creates a jasmine spec on the fly and maps text to functions in the steps directory similar to cucumber and executes the spec

Current Status
--------------
- 1/26/2011: Rudimentary Tool implemented, seems to parse sample cuke specs just fine.
- 2/14/2011: Converter working, basic spec-based definitions tested. Major issue is that step definitions and their variables are globals. This will be the next order of things to be fixed.
- 2/16/2011: Fixed issues with step definitions. Steps are now scoped by their scenario name, so are no longer have the global name conflict problem.

Todos
-----
* write specs/tests for cuke4jas itself! - DONE
* move the code into its own namespace/class - PARTIALLY DONE
* rewrite parse logic to use an AST.
* change toJasmine() so that it expects calls generated to step definitions to be from a namespace bound by the feature's name (or in general with the enclosing container)
  currently two steps with the same name in 2 features or scenarios will clash with each other. - DONE
* check jasmine code for style and idioms
* check how plugins/addons work in jasmine, and change code accordingly if required
* create the cuke mode  - VERSION 1 DONE
* create github project - DONE
* contact jasmine devs and ask opinion
* add mode to converter to output blank step definition file. This should be real easy once the AST is in place.