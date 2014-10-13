module.exports = function(){
  var textEditor = atom.workspace.getActiveTextEditor()
  if(textEditor == ''){
    return
  }
  var selectedText = textEditor.getSelectedText()
  if(selectedText.trim().indexOf("\'") == 0){
    require('./JavascriptToText')()
  }else if(selectedText.trim().indexOf("\"") == 0){
    require('./JavascriptToText')()
  }else{
    require('./TextToJavascript')()
  }
}
