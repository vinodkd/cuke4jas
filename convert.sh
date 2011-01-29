# converts cucumber feature specs to jasmine templates [or specs - tbd]
# Usage: convert input.feature output.js

export jsengine_home="/c/vinod/installed/rhino1_7R2/rhino1_7R2"
export jsengine_cmd="java -jar $jsengine_home/js.jar"
export jsengine_script="convert.js"
$jsengine_cmd $jsengine_script $1 > $2 