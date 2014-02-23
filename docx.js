var fs = require('fs');
var obj = JSON.parse(fs.readFileSync("./document.json", 'utf8'));

var par = obj["w:document"]["w:body"]["w:p"];

for (var key in par) {
  if ('w:r' in par[key]) {
    //console.log(par[key]['w:r']);
    if (Object.prototype.toString.call(par[key]['w:r']) === '[object Array]') {
      for (var k in par[key]['w:r']) {
        if (typeof(par[key]['w:r'][k]['w:t']) === "string") {
          console.log(par[key]['w:r'][k]['w:t']);
        } 
        else {
          console.log(par[key]['w:r'][k]['w:t']);//["#text"]);
        }
      }
    }
    else if ('w:t' in par[key]['w:r']) {
      //console.log(typeof(par[key]['w:r']['w:t']));
      if (typeof(par[key]['w:r']['w:t']) === "string") {
        console.log(par[key]['w:r']['w:t']);
      }
      else {
        console.log(par[key]['w:r']['w:t']['#text']);
      }
    }
  }
//  else {
//    console.log("NO MATCH!\n" + par[key] + "\n");
//  }
}
