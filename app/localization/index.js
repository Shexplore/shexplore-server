var fs = require('fs');

function Localization(language){
  fs.readFile(__dirname+'/languages/'+language,'utf8',function(err,data){
    if(err)throw(err);
    this.locArr = {};
    data.split('\n').forEach(function(line){
      var res = line.split('=');
      if(res.length == 2)
        this.locArr[res[0]] = res[1];
    }.bind(this));
  }.bind(this));
}
Localization.prototype.localize = function(stri){
  return this.locArr ? (this.locArr[stri] || stri) : stri;
}

module.exports = Localization;
