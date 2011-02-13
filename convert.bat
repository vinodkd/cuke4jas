@echo off
rem converts Cucumber feature specs to jasmine templates [or specs]
rem Usage: convert [-s] input.feature output.js

if "%1" == "-s" (
  set addSteps=%1
  shift 
)else (
  set addSteps=
)
set jsengine_home=C:\vinod\installed\rhino1_7R2\rhino1_7R2
set jsengine_cmd=java -jar "%jsengine_home%\js.jar"
set jsengine_script=convert.js
%jsengine_cmd% %jsengine_script% %addSteps% %1 > %2 