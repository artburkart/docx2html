var unzip = require('./unzipDocx');
var body;

unzip.getBody('./nom.docx', function(data, err) {
  if (err) {
    console.dir(err);
  }
  else {
    body = data;
  }
});

//var body = obj["w:document"]["w:body"]["w:p"];

getParagraphs = function(data) {
  pars = []
  for (var key in data) {
    if ('w:r' in data[key]) {
      pars.push(data[key]['w:r']);
    }
  }
  return pars;
}

exports.getParagraphs = getParagraphs;

//var paragraphs = getParagraphs(body);
//console.log(paragraphs);

//for (var key in body) {
//  console.log(JSON.stringify(body[key]));
//  console.log("\n");
//  //if ('w:r' in body[key] && 'w:t' in body[key]['w:r'][0]) {
//  //  txt = body[key]['w:r'][0]['w:t'][0];
//  //  console.log(txt);
//  //  //if (txt === 'string') {
//  //  //  console.log(txt);
//  //  //}
//  //  //else {
//  //  //  console.log(txt['$']);
//  //  //}
//  //  //else {
//  //  //  console.log(body[key]['w:r']);
//  //  //}
//  //}
//  //else {
//  //  console.log("w:r not a key!\t" + body[key] + "\n");
//  //}
//    //console.log(body[key]['w:r']);
//  //  if (Object.prototype.toString.call(body[key]['w:r']) === '[object Array]') {
//  //    for (var k in body[key]['w:r']) {
//  //      if (typeof(body[key]['w:r'][k]['w:t']) === "string") {
//  //        console.log(body[key]['w:r'][k]['w:t']);
//  //      } 
//  //      else {
//  //        console.log(body[key]['w:r'][k]['w:t']);//["#text"]);
//  //      }
//  //    }
//  //  }
//  //  else if ('w:t' in body[key]['w:r']) {
//  //    //console.log(typeof(body[key]['w:r']['w:t']));
//  //    if (typeof(body[key]['w:r']['w:t']) === "string") {
//  //      console.log(body[key]['w:r']['w:t']);
//  //    }
//  //    else {
//  //      console.log(body[key]['w:r']['w:t']['#text']);
//  //    }
//  //  }
//  //}
////  else {
////    console.log("NO MATCH!\n" + body[key] + "\n");
////  }
//}
