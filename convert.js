load('lib/cuke4jas.js');
var text= readFile(arguments[0]);   //load the src file
var jastext = toJasmine(text);
print(jastext);