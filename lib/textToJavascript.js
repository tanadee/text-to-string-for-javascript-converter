function singleOrDouble(text){
  var quote
  var single = text.indexOf("'")
  var double = text.indexOf('"')
  if(double == -1){
    quote = "\""
  }else if(single == -1){
    quote = "'"
  }else{
    return
  }
  return quote
}
function splitLine(text){
  var regex = /[\r\n\f]+/g
  return text.split(regex)
}
function formatLine(line, ruleStack, isFirst){
  var regex = /:[a-zA-Z_$][0-9a-zA-Z_$]*/g
  line = line.trim()
  var token = line.match(regex)
  var text = line.split(regex)
  var ret = ""
  var i
  for(i = 0; i < text.length; i++){
    var tex
    if(text[i].charAt(0) == " "){
      tex = text[i].substring(1)//cut off the 1 leading space
    }else{
      tex = text[i]
    }
    if(i == text.length - 1){
      ret += ruleStack.quoteToUse + tex + " " + ruleStack.quoteToUse
    }else{
      ret += ruleStack.quoteToUse + tex + ruleStack.quoteToUse
    }
    if(i < text.length - 1){
      var tokenWOP = token[i].substring(1, token[i].length).trim()
      ret += " + " + tokenWOP + " + "
    }
  }
  return {text: ret, ruleStack: ruleStack}
}
module.exports = function(){
  var textEditor = atom.workspace.getActiveTextEditor()
  if(textEditor == ''){
    return
  }
  var selectedText = textEditor.getSelectedText()
  var textToInsert = ""
  var lines = splitLine(selectedText)
  var i
  var quote = singleOrDouble(selectedText)
  if(!quote){
    console.log("detect 2 type of quote can't generate")
    return
  }
  var ruleStack = {quoteToUse: singleOrDouble(selectedText)}
  for(i = 0; i < lines.length; i++){
    var line = lines[i]
    var formated = formatLine(line, ruleStack)
    ruleStack = formated.ruleStack
    textToInsert += formated.text
    if(i < lines.length -1){
      textToInsert += " +\n"
    }
  }
  textEditor.insertText(textToInsert, {select: true, autoIndent: true, autoIndentNewline: true, autoDecreaseIndent: true})
}
