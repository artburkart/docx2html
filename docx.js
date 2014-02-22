var docx = require('./DOCX.js/docx.js'),
fs = require('fs');

// Read docx file
docxFile = fs.readFileSync('./ALIT216-ID860074MN.docx');

console.log(docxFile); 
	
var html = docx.convertContent(docxFile);

console.log(html);



