/**
 * Top level namespace for cuke4jas, an addon to Jasmine that allows cucumber-style feature specs.
 *
 * @namespace
 */
var cuke4jas = {}

cuke4jas.CONTEXT=[];    // a stack to hold the nested contexts as we parse. Each keyword that can have child elements is a context.

// TODO: This conversion and the associated parse function do not create an AST. This causes kludge-y conditionals in the code. Move to an AST model for v2. This will enable the two modes - with and without step definitions to be generate in a cleaner fashion
cuke4jas.toJasmine =function(text,addSteps){
    addSteps = addSteps || false;
    cuke4jas.CONTEXT = [];
    var jastext='';
    
    // split text by newline. doesnt handle return(\r) at this point to avoid os detection etc. 
    // in windows a new line is a combo of \r\n, while on unix its just one of them.
    // todo: there should be a better way. find it.
    // todo: check on unix and change to \r here if required.
    var lines = text.split('\n'); 
    for(var line in lines){
        var ret = cuke4jas.parse(lines[line],addSteps);
        jastext+=ret;
    }
    // now close out any remaining contexts
    // TODO: remove kludgey conditional below when moving to AST model
    for(var i=cuke4jas.CONTEXT.length;i>0;i--){
      var closeFnDef = (addSteps && !(cuke4jas.CONTEXT[i-1] in {'feature':'','scenario':''})? '':'}');
       var closeFnCall='\n' + cuke4jas.repeat('\t',i-1) + closeFnDef + ');';
       jastext += closeFnCall;
    }
    return jastext;
}

// parse a line and output the jasmine equivalent
cuke4jas.parse = function(rawline,addSteps){
    var onlytext = rawline.replace(/^([ \t]*)/,''); // clear out whitespace in the front
    var commentPos=onlytext.indexOf('#');
    var hasComment= (commentPos != -1);
    var hasOnlyComment = (commentPos == 0);
    
    if(hasOnlyComment){
        return '';
    }
    var line;
    if(hasComment){
       line = onlytext.substring(0,commentPos); 
    }else{
        line = onlytext;
    }
    
    var wordPos = line.indexOf(' ');
    var hasWord = (wordPos != -1);
    
    var word,keyword,text;
    if(hasWord){
        word = line.substring(0,wordPos);
        word = cuke4jas.toKeyword(word);
        
        var isKeyword = (word in cuke4jas.KEYWORDS);
        if(isKeyword){
            keyword = word;
            text = line.substring(wordPos+1).replace(/([ \t\r]*)$/,''); // return handled here. this is a kludge.TODO: figure out a better way of doing this.
            return cuke4jas.KEYWORDS[keyword](keyword,text,addSteps);
        }
    }
    // now handle lines that dont have keywords beginning them, or are blank
    var context = cuke4jas.getCurrentContext();
    switch(context){
        case 'feature': //this is the summary line immediately after a Feature line
                        cuke4jas.CONTEXT.push('summary');
                        return 'summary(\n\t\t\'' + line + '\'';

        case 'summary': // this is any summary line after the first
                        return ',\n\t\t\'' + line + '\'';
    }
    // if no space, dunno what this line is! assume to be blank for now.
    return '';
}

cuke4jas.repeat = function(chr,times){
    return new Array(times+1).join(chr).toString();
}

cuke4jas.toKeyword = function(word){
    return word.toLowerCase().replace(':','');
}

cuke4jas.getCurrentContext = function()
{
    return cuke4jas.CONTEXT[cuke4jas.CONTEXT.length-1];
}

// use map so that i can use the in operator to check for valid keywords
// the map also stores the emit() functions for each keyword
cuke4jas.KEYWORDS = {
    'feature'   : function(keyword,text,addSteps){ 
                        cuke4jas.CONTEXT.push(keyword);        
                        return keyword + '(\'' + text + '\', ' + ('function(){\n\t');
                  }, 
    'scenario'  : function(keyword,text,addSteps,addSteps){
                    var emitStr = keyword + '(\'' + text + '\', ' + ('function(){\n\t\t');
                    var ctx = cuke4jas.getCurrentContext();
                    var closeCtxStr='';
                    
                    if(ctx=='summary'){
                        cuke4jas.CONTEXT.pop();  //remove this from the stack of contexts to be handled
                        closeCtxStr ='\n\t);\n\t';
                    }
                    if(ctx=='scenario'){
                        cuke4jas.CONTEXT.pop();  //remove this from the stack of contexts to be handled
                        closeCtxStr = '\n\t});\n\t';
                    }
                    cuke4jas.CONTEXT.push(keyword)   // now add self to context
                    return closeCtxStr + emitStr;
                  }, 
    'given'     : function(keyword,text,addSteps){ return keyword + '(\'' + text + '\', ' + (addSteps? cuke4jas.toFunctionName(text):'function(){\n\t\t}')+');\n\t\t';}, 
    'and'       : function(keyword,text,addSteps){ return keyword + '(\'' + text + '\', ' + (addSteps? cuke4jas.toFunctionName(text):'function(){\n\t\t}')+');\n\t\t';}, 
    'when'      : function(keyword,text,addSteps){ return keyword + '(\'' + text + '\', ' + (addSteps? cuke4jas.toFunctionName(text):'function(){\n\t\t}')+');\n\t\t';}, 
    'then'      : function(keyword,text,addSteps){ return keyword + '(\'' + text + '\', ' + (addSteps? cuke4jas.toFunctionName(text):'function(){\n\t\t}')+');\n\t\t';}, 
};

cuke4jas.toFunctionName = function(text){
  return text.toLowerCase().replace(/ /g,'_');
}
