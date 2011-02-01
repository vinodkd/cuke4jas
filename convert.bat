@echo off
rem converts Cucumber feature specs to jasmine templates [or specs - tbd]
rem Usage: convert input.feature output.js

set jsengine_home=C:\vinod\installed\rhino1_7R2\rhino1_7R2
set jsengine_cmd=java -jar "%jsengine_home%\js.jar"
set jsengine_script=convert.js
%jsengine_cmd% %jsengine_script% %1 > %2 