cuke4jas
============

cuke4jas enhances jasmine - the javascript bdd framework - to support cucumber-style plain text feature specifications. It should be used along with the jasmine-species add-on to jasmine.
It can be used in two modes:
* As a tool to convert a cucumber style feature specification into a blank jasmine template
* As an addon that dynamically converts a cuke-style specification into a jasmine-style one, given cuke-style step definitions

Using cuke4jas as a tool to start off your jasmine bdd spec
---------------------------------------------------------------
    rhino cuke4jas.js input.feature output.js
    
Using cuke4jas directly in jasmine
--------------------------------------
# create step definitions as javascript functions. put them in step-definitions directory
# import jasmine
# import jasmine-species
# import cuke4jas
# load up the feature file, and pass it to cuke4jas.
## it now creates a jasmine spec on the fly and maps text to functions in the step definitions directory similar to cucumber and executes the spec

Current Status
--------------
1/26/2011: Rudimentary Tool implemented, seems to parse sample cuke specs just fine.


Todos
-----
# write specs/tests for cuke4jas itself!
# move the code into its own namespace/class
# check jasmine code for style and idioms
# check how plugins/addons work in jasmine, and change code accordingly if required
# create the cuke mode
# create github project
# contact jasmine devs and ask opinion
