# converts cucumber feature specs to jasmine templates [or specs]
# Usage: convert [-s] input.feature output.js

if [ "$1" == "-s" ] 
  then
  addSteps=$1
  shift
fi
export jsengine_home="/c/vinod/installed/rhino1_7R2/rhino1_7R2"
export jsengine_cmd="java -jar $jsengine_home/js.jar"
export jsengine_script="convert.js"
$jsengine_cmd $jsengine_script $addSteps $1 > $2 