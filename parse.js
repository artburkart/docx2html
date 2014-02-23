var fs = require('fs'),
parser = require('xml2js').Parser(),
et = require('elementtree');

var dom = fs.readFileSync('./nom.docx');
var newDom = {};


// // parse the body xml and return the blob of interest
// parser.parseString(entry.getData(), function(err, result) {
// 	if (err) return callback(undefined, err);
// 	else {
// 		var body = result['w:document']['w:body'][0]['w:p'];
// 		return callback(body, undefined);
// 	}
// });