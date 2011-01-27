/**
 * Top level namespace for cuke4jas, an addon to Jasmine that allows cucumber-style feature specs.
 *
 * @namespace
 */
var cuke4jas = {}

var 
var CONTEXT;    // a stack to hold the nested contexts as we parse. Each keyword that can have child elements is a context.

function toJasmine(text){
    CONTEXT = [];
    var jastext='';
    var lines = text.split('\n');
    for(var line in lines){
        var ret = parse(lines[line]);
        jastext+=ret;
    }
    // now close out any remaining contexts
    for(var i=CONTEXT.length;i>0;i--){
       jastext += '\n' + repeat('\t',i-1) + '});';
    }
    return jastext;
}

function repeat(chr,times){
    return new Array(times+1).join(chr).toString();
}

// use map so that i can use the in operator to check for valid keywords
// the map also stores the emit() functions for each keyword
KEYWORDS = {
    'feature'   : function(keyword,text){ 
                        CONTEXT.push(keyword);        
                        return keyword + '(\'' + text + '\', function(){\n\t';
                  }, 
    'scenario'  : function(keyword,text){
                    var emitStr = keyword + '(\'' + text + '\', function(){\n\t\t';
                    var ctx = getCurrentContext();
                    var closeCtxStr='';
                    
                    if(ctx=='summary'){
                        CONTEXT.pop();  //remove this from the stack of contexts to be handled
                        closeCtxStr ='\n\t);\n\t';
                    }
                    if(ctx=='scenario'){
                        CONTEXT.pop();  //remove this from the stack of contexts to be handled
                        closeCtxStr = '\n\t});\n\t';
                    }
                    CONTEXT.push(keyword)   // now add self to context
                    return closeCtxStr + emitStr;
                  }, 
    'given'     : function(keyword,text){ return keyword + '(\'' + text + '\', function(){\n\t\t});\n\t\t';}, 
    'and'       : function(keyword,text){ return keyword + '(\'' + text + '\', function(){\n\t\t});\n\t\t';}, 
    'when'      : function(keyword,text){ return keyword + '(\'' + text + '\', function(){\n\t\t});\n\t\t';}, 
    'then'      : function(keyword,text){ return keyword + '(\'' + text + '\', function(){\n\t\t});\n\t\t';}, 
};

function toKeyword(word){
    return word.toLowerCase().replace(':','');
}

function getCurrentContext()
{
    return CONTEXT[CONTEXT.length-1];
}

// parse a line and output the jasmine equivalent
function parse(rawline){
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
        word = toKeyword(word);
        
        var isKeyword = (word in KEYWORDS);
        if(isKeyword){
            keyword = word;
            text = line.substring(wordPos+1)
            return KEYWORDS[keyword](keyword,text);
        }
    }
    // now handle lines that dont have keywords beginning them, or are blank
    var context = getCurrentContext();
    switch(context){
        case 'feature': //this is the summary line immediately after a Feature line
                        CONTEXT.push('summary');
                        return 'summary(\n\t\t\'' + line + '\'';
        case 'summary': // this is any summary line after the first
                        return ',\n\t\t\'' + line + '\'';
    }
    // if no space, dunno what this line is! assume to be blank for now.
    return '';
}