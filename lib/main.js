exports = module.exports = {}
exports.activate = function(state){
  console.log("Javascript 2 Text activate")
  atom.workspaceView.command("text-to-javascript:action", require('./textToJavascript'))
  atom.workspaceView.command("javascript-to-text:action", require('./javascriptToText'))
  atom.workspaceView.command("javascript-to-text:toggle", require('./toggle'))
}
exports.deactivate = function(){

}
exports.serialize = function(){

}
