load('../lib/cuke4jas.js');
var text,addSteps;
if(arguments[0]=='-s'){
  addSteps=true;
  text= readFile(arguments[1]);   //load the src file
}else{
  text= readFile(arguments[0]);   //load the src file
}

var jastext = cuke4jas.toJasmine(text,addSteps);
print(jastext);