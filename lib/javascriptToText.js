function singleOrDouble(text){
  var quote
  var single = text.indexOf("'")
  var double = text.indexOf('"')
  if(double == -1){
    quote = "'"
  }else if(single == -1){
    quote = "\""
  }else if(double < single){
    quote = "\""
  }else{
    quote = "'"
  }
  return quote
}
function splitLine(text){
  var regex = /[\r\n\f]+/g
  return text.split(regex)
}
function formatLine(line, ruleStack, isFirst){
  var regex = new RegExp(ruleStack.quoteToUse + ".*?" + ruleStack.quoteToUse, "g")
////cutOut\n
//  if(line.indexOf("\\n") != -1){
//    var index = line.lastIndexOf("\\n")
//    line = line.substring(0, index) + line.substring(index + 2)
//  }
  line = line.trim()
  var token = line.match(regex)
  var text = line.split(regex)
  var ret = ""
  var i
  for(i = 0; i < text.length; i++){
    var tt = text[i].match(/\+.+\+/)
    if(tt){
      tt = tt[0]
      tt = tt.substring(1, tt.length - 1)
      tt = ":" + tt.trim()
    }else{
      tt = ""
    }
    ret += tt
    if(i < text.length - 1){
      var tokenWOP = token[i].substring(1, token[i].length - 1)
      ret += tokenWOP
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
  var ruleStack = {quoteToUse: singleOrDouble(selectedText)}
  for(i = 0; i < lines.length; i++){
    var line = lines[i]
    var formated = formatLine(line, ruleStack)
    ruleStack = formated.ruleStack
    textToInsert += formated.text
    if(i < lines.length -1){
      textToInsert += "\n"
    }
  }
  textEditor.insertText(textToInsert, {select: true, autoIndent: true, autoIndentNewline: true, autoDecreaseIndent: true})
}
